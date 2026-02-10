import { notFound } from 'next/navigation';
import { OnboardingWizard } from '@/components/onboarding';
import type { PlanType } from '@/lib/types';

interface OnboardingPageProps {
  params: Promise<{ plan: string }>;
}

const VALID_PLANS: PlanType[] = ['self-hosted', 'managed-admin', 'managed-vps'];

export async function generateStaticParams() {
  return VALID_PLANS.map((plan) => ({
    plan,
  }));
}

export async function generateMetadata({ params }: OnboardingPageProps) {
  const { plan } = await params;
  
  if (!VALID_PLANS.includes(plan as PlanType)) {
    return {
      title: 'No encontrado | OpenClaw México',
    };
  }

  const planNames: Record<PlanType, string> = {
    'self-hosted': 'Self-Hosted',
    'managed-admin': 'Managed (Admin)',
    'managed-vps': 'Managed (VPS)',
  };

  return {
    title: `Configurar ${planNames[plan as PlanType]} | OpenClaw México`,
    description: 'Configura tu asistente de IA personal con OpenClaw',
  };
}

export default async function OnboardingPage({ params }: OnboardingPageProps) {
  const { plan } = await params;

  if (!VALID_PLANS.includes(plan as PlanType)) {
    notFound();
  }

  return <OnboardingWizard plan={plan as PlanType} />;
}
