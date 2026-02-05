import { redirect } from 'next/navigation';
import { OnboardingWizard } from '@/components/onboarding';
import type { PlanType } from '@/lib/types';

interface OnboardingPageProps {
  searchParams: Promise<{ plan?: string }>;
}

const VALID_PLANS: PlanType[] = ['self-hosted', 'managed-admin', 'managed-vps'];

export default async function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const params = await searchParams;
  const plan = params.plan as PlanType | undefined;

  // Redirect to home if no valid plan
  if (!plan || !VALID_PLANS.includes(plan)) {
    redirect('/#plans');
  }

  return <OnboardingWizard plan={plan} />;
}

export const metadata = {
  title: 'Configurar OpenClaw | OpenClaw México',
  description: 'Configura tu asistente de IA personal con OpenClaw',
};
