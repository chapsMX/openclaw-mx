import { NextRequest, NextResponse } from 'next/server';
import { captureOrder } from '@/lib/paypal';
import { sendAdminNotification, sendCustomerConfirmation } from '@/lib/email';
import { saveOrder, decrementInventory } from '@/lib/supabase';
import type { OnboardingData } from '@/lib/types';
import { PLAN_PRICING } from '@/lib/types';

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
      const pricing = PLAN_PRICING[onboardingData.plan];

      // Save to database
      try {
        await saveOrder({
          payment_id: orderId,
          payment_type: 'order',
          status: 'completed',
          amount: pricing.setupFee,
          plan: onboardingData.plan,
          contact_name: onboardingData.contact.name,
          contact_email: onboardingData.contact.email,
          contact_phone: onboardingData.contact.phone,
          contact_company: onboardingData.contact.company,
          assistant_name: onboardingData.assistant.assistantName,
          assistant_personality: onboardingData.assistant.personality,
          assistant_language: onboardingData.assistant.language,
          integration: onboardingData.integration.type,
          model: onboardingData.model.model,
          skills: onboardingData.skills.selectedSkills,
        });

        // Decrement inventory for self-hosted plan
        if (onboardingData.plan === 'self-hosted') {
          await decrementInventory('self-hosted');
        }
      } catch (dbError) {
        console.error('Database save failed:', dbError);
        // Don't fail the payment if DB fails
      }

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
