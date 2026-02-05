import { NextRequest, NextResponse } from 'next/server';
import { createProduct, createPlan } from '@/lib/paypal';
import type { OnboardingData } from '@/lib/types';

// Cache for the plan ID (in production, store this in database or env)
let cachedPlanId: string | null = null;

async function getOrCreatePlan(): Promise<string> {
  // In production, store this in database or environment variable
  // For now, we'll check if we have a cached plan ID
  if (cachedPlanId) {
    return cachedPlanId;
  }

  // Check if plan ID is in environment
  if (process.env.PAYPAL_MANAGED_PLAN_ID) {
    cachedPlanId = process.env.PAYPAL_MANAGED_PLAN_ID;
    return cachedPlanId;
  }

  // Create new product and plan
  console.log('Creating new PayPal product and plan...');

  // Create product first
  const product = await createProduct(
    'OpenClaw Managed Hosting',
    'Servicio de hosting administrado de OpenClaw con instalación y soporte mensual'
  );

  console.log('Product created:', product.id);

  // Create plan with setup fee
  const plan = await createPlan(
    product.id,
    '2500', // Setup fee
    '300'   // Monthly price
  );

  console.log('Plan created:', plan.id);

  // IMPORTANT: In production, save this plan ID to your database
  // or add it as PAYPAL_MANAGED_PLAN_ID in your environment variables
  cachedPlanId = plan.id;

  return plan.id;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { onboardingData } = body as {
      onboardingData: OnboardingData;
    };

    if (!onboardingData) {
      return NextResponse.json(
        { error: 'Missing onboarding data' },
        { status: 400 }
      );
    }

    const planId = await getOrCreatePlan();

    // TODO: Save subscription intent to database
    // await db.subscriptionIntents.create({
    //   planId,
    //   onboardingData,
    //   status: 'PENDING',
    //   createdAt: new Date(),
    // });

    console.log('Subscription plan ready:', planId, 'for:', onboardingData.contact.email);

    return NextResponse.json({ planId });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error creating subscription' },
      { status: 500 }
    );
  }
}
