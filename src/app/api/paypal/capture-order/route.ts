import { NextRequest, NextResponse } from 'next/server';
import { captureOrder } from '@/lib/paypal';
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
      // TODO: Save successful payment to database
      // await db.orders.update({
      //   where: { orderId },
      //   data: {
      //     status: 'COMPLETED',
      //     captureId: captureResult.purchase_units[0].payments.captures[0].id,
      //     completedAt: new Date(),
      //   },
      // });

      // TODO: Send confirmation email
      // await sendEmail({
      //   to: onboardingData.contact.email,
      //   subject: '¡Bienvenido a OpenClaw!',
      //   template: 'welcome',
      //   data: onboardingData,
      // });

      // TODO: Create ticket/task for setup
      // await createSetupTask(onboardingData);

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
