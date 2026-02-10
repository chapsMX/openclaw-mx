import { redirect } from 'next/navigation';

export default function OnboardingPage() {
  // Redirect old /onboarding URLs to /onboarding/self-hosted
  redirect('/onboarding/self-hosted');
}
