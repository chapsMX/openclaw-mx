import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/lib/paypal';
import type { OnboardingData } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, amount, onboardingData } = body as {
      plan: string;
      amount: string;
      onboardingData: OnboardingData;
    };

    if (!amount || !onboardingData) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const description = `OpenClaw - ${plan} - Instalación para ${onboardingData.contact.name}`;
    
    const order = await createOrder(amount, description);

    // TODO: Save order to database with onboardingData
    // await db.orders.create({
    //   orderId: order.id,
    //   status: 'CREATED',
    //   onboardingData,
    //   createdAt: new Date(),
    // });

    console.log('Order created:', order.id, 'for:', onboardingData.contact.email);

    return NextResponse.json({ id: order.id });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error creating order' },
      { status: 500 }
    );
  }
}
