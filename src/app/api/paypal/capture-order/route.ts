import { NextRequest, NextResponse } from 'next/server';
import { captureOrder } from '@/lib/paypal';
import { sendAdminNotification, sendCustomerConfirmation } from '@/lib/email';
import type { OnboardingData } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, onboardingData } = body as {
      orderId: string;
      onboardingData: OnboardingData;
    };

    if (!orderId) {
      return NextResponse.json(
        { error: 'Missing order ID' },
        { status: 400 }
      );
    }

    const captureResult = await captureOrder(orderId);

    if (captureResult.status === 'COMPLETED') {
      // Send email notifications
      try {
        await Promise.all([
          sendAdminNotification(onboardingData, orderId, 'order'),
          sendCustomerConfirmation(onboardingData, orderId, 'order'),
        ]);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the payment if email fails
      }

      console.log('Payment captured:', orderId, 'for:', onboardingData.contact.email);

      return NextResponse.json({
        success: true,
        orderId,
        status: captureResult.status,
      });
    } else {
      return NextResponse.json(
        { error: 'Payment not completed', status: captureResult.status },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error capturing order:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error capturing order' },
      { status: 500 }
    );
  }
}
