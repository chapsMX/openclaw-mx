import { NextRequest, NextResponse } from 'next/server';
import { getPayPalAccessToken } from '@/lib/paypal';
import { sendAdminNotification, sendCustomerConfirmation } from '@/lib/email';
import type { OnboardingData } from '@/lib/types';

const PAYPAL_API_BASE = process.env.PAYPAL_MODE === 'live' 
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getSubscriptionDetails(subscriptionId: string) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_API_BASE}/v1/billing/subscriptions/${subscriptionId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get subscription details');
  }

  return response.json();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subscriptionId, onboardingData } = body as {
      subscriptionId: string;
      onboardingData: OnboardingData;
    };

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Missing subscription ID' },
        { status: 400 }
      );
    }

    // Get subscription details from PayPal
    const subscription = await getSubscriptionDetails(subscriptionId);

    if (subscription.status === 'ACTIVE' || subscription.status === 'APPROVED') {
      // Send email notifications
      try {
        await Promise.all([
          sendAdminNotification(onboardingData, subscriptionId, 'subscription'),
          sendCustomerConfirmation(onboardingData, subscriptionId, 'subscription'),
        ]);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the subscription if email fails
      }

      console.log('Subscription activated:', subscriptionId, 'for:', onboardingData.contact.email);

      return NextResponse.json({
        success: true,
        subscriptionId,
        status: subscription.status,
      });
    } else {
      return NextResponse.json(
        { error: 'Subscription not active', status: subscription.status },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error activating subscription:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error activating subscription' },
      { status: 500 }
    );
  }
}
