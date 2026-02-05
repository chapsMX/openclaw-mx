'use client';

import { useState } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { StepContact } from './StepContact';
import { StepAssistant } from './StepAssistant';
import { StepIntegration } from './StepIntegration';
import { StepModel } from './StepModel';
import { StepSkills } from './StepSkills';
import { StepPayment } from './StepPayment';
import { 
  type OnboardingData, 
  type PlanType,
  PLAN_PRICING,
} from '@/lib/types';

interface OnboardingWizardProps {
  plan: PlanType;
}

const STEPS = [
  { id: 1, name: 'Contacto', icon: '👤' },
  { id: 2, name: 'Asistente', icon: '🤖' },
  { id: 3, name: 'Integración', icon: '🔗' },
  { id: 4, name: 'Modelo IA', icon: '🧠' },
  { id: 5, name: 'Skills', icon: '⚡' },
  { id: 6, name: 'Pago', icon: '💳' },
];

const PLAN_NAMES: Record<PlanType, string> = {
  'self-hosted': 'Self Hosted',
  'managed-admin': 'Managed Hosting (Administrado)',
  'managed-vps': 'Managed Hosting (VPS Propia)',
};

export function OnboardingWizard({ plan }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    plan,
    contact: { name: '', email: '', phone: '' },
    assistant: { assistantName: '', personality: 'friendly', language: 'es' },
    integration: { type: 'whatsapp' },
    model: { model: 'claude-sonnet' },
    skills: { selectedSkills: ['weather', 'calendar', 'reminders'] },
  });

  const pricing = PLAN_PRICING[plan];

  const updateData = <K extends keyof OnboardingData>(
    key: K, 
    value: OnboardingData[K]
  ) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  return (
    <PayPalScriptProvider options={{ 
      clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
      currency: 'MXN',
      intent: pricing.isSubscription ? 'subscription' : 'capture',
      vault: pricing.isSubscription,
    }}>
      <div className="min-h-screen bg-bg-cream py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-claw-red font-mono text-sm tracking-wider mb-2">
              // CONFIGURACIÓN
            </p>
            <h1 className="text-display text-3xl md:text-4xl text-claw-black mb-2">
              {PLAN_NAMES[plan]}
            </h1>
            <p className="text-claw-black/60">
              Configura tu asistente en pocos pasos
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-10">
            <div className="flex justify-between items-center relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-claw-black/10" />
              <div 
                className="absolute top-5 left-0 h-0.5 bg-claw-green transition-all duration-300"
                style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
              />
              
              {STEPS.map((step) => (
                <div 
                  key={step.id} 
                  className="flex flex-col items-center relative z-10"
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all ${
                      step.id < currentStep 
                        ? 'bg-claw-green border-claw-green text-claw-black' 
                        : step.id === currentStep
                          ? 'bg-claw-black border-claw-black text-white'
                          : 'bg-white border-claw-black/20 text-claw-black/40'
                    }`}
                  >
                    {step.id < currentStep ? '✓' : step.icon}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    step.id <= currentStep ? 'text-claw-black' : 'text-claw-black/40'
                  }`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div 
            className="bg-white border-3 border-claw-black p-8 md:p-10"
            style={{ boxShadow: '6px 6px 0px #0a0a0a' }}
          >
            {currentStep === 1 && (
              <StepContact 
                data={data.contact} 
                onChange={(contact) => updateData('contact', contact)}
                onNext={nextStep}
              />
            )}
            {currentStep === 2 && (
              <StepAssistant 
                data={data.assistant} 
                onChange={(assistant) => updateData('assistant', assistant)}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {currentStep === 3 && (
              <StepIntegration 
                data={data.integration} 
                onChange={(integration) => updateData('integration', integration)}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {currentStep === 4 && (
              <StepModel 
                data={data.model} 
                onChange={(model) => updateData('model', model)}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {currentStep === 5 && (
              <StepSkills 
                data={data.skills} 
                onChange={(skills) => updateData('skills', skills)}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {currentStep === 6 && (
              <StepPayment 
                data={data}
                pricing={pricing}
                onBack={prevStep}
              />
            )}
          </div>

          {/* Pricing Summary */}
          <div className="mt-6 text-center text-sm text-claw-black/60">
            <span className="font-mono">
              {pricing.isSubscription 
                ? `$${pricing.setupFee.toLocaleString()} MXN instalación + $${pricing.monthlyFee?.toLocaleString()} MXN/mes`
                : `$${pricing.setupFee.toLocaleString()} MXN pago único`
              }
            </span>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
