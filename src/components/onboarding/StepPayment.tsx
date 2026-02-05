'use client';

import { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import type { CreateOrderActions, OnApproveData, OnApproveActions, CreateSubscriptionActions } from '@paypal/paypal-js';
import type { OnboardingData, PlanPricing } from '@/lib/types';
import { INTEGRATIONS, AI_MODELS, AVAILABLE_SKILLS } from '@/lib/types';

interface StepPaymentProps {
  data: OnboardingData;
  pricing: PlanPricing;
  onBack: () => void;
}

const PLAN_NAMES = {
  'self-hosted': 'Self Hosted',
  'managed-admin': 'Managed Hosting (Administrado)',
  'managed-vps': 'Managed Hosting (VPS Propia)',
};

export function StepPayment({ data, pricing, onBack }: StepPaymentProps) {
  const [{ isPending }] = usePayPalScriptReducer();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const integration = INTEGRATIONS.find(i => i.id === data.integration.type);
  const model = AI_MODELS.find(m => m.id === data.model.model);
  const selectedSkillNames = data.skills.selectedSkills
    .map(id => AVAILABLE_SKILLS.find(s => s.id === id)?.name)
    .filter(Boolean);

  // For one-time payments (self-hosted and managed-vps)
  const handleCreateOrder = async (_data: Record<string, unknown>, _actions: CreateOrderActions): Promise<string> => {
    try {
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: data.plan,
          amount: pricing.setupFee.toString(),
          onboardingData: data,
        }),
      });

      const orderData = await response.json();
      
      if (!response.ok) {
        throw new Error(orderData.error || 'Error al crear la orden');
      }

      return orderData.id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    }
  };

  const handleApprove = async (approveData: OnApproveData, _actions: OnApproveActions): Promise<void> => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: approveData.orderID,
          onboardingData: data,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al procesar el pago');
      }

      // Redirect to success page
      window.location.href = `/onboarding/success?orderId=${approveData.orderID}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el pago');
    } finally {
      setIsProcessing(false);
    }
  };

  // For subscriptions (managed-admin)
  const handleCreateSubscription = async (_data: Record<string, unknown>, actions: CreateSubscriptionActions): Promise<string> => {
    try {
      // First, get or create the plan
      const response = await fetch('/api/paypal/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          onboardingData: data,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al crear la suscripción');
      }

      // Use the plan ID from our backend
      return actions.subscription.create({
        plan_id: result.planId,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    }
  };

  const handleSubscriptionApprove = async (approveData: OnApproveData, _actions: OnApproveActions): Promise<void> => {
    setIsProcessing(true);
    try {
      const subscriptionID = approveData.subscriptionID;
      if (!subscriptionID) {
        throw new Error('No subscription ID received');
      }

      // Save subscription info
      const response = await fetch('/api/paypal/activate-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscriptionId: subscriptionID,
          onboardingData: data,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al activar la suscripción');
      }

      // Redirect to success page
      window.location.href = `/onboarding/success?subscriptionId=${subscriptionID}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al activar la suscripción');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-display text-2xl text-claw-black mb-2">
          Resumen y Pago
        </h2>
        <p className="text-claw-black/60">
          Revisa tu configuración y completa el pago
        </p>
      </div>

      {/* Order Summary */}
      <div className="bg-claw-black/5 p-6 mb-8 space-y-4">
        <h3 className="font-bold text-claw-black uppercase text-sm tracking-wider mb-4">
          📋 Resumen de tu pedido
        </h3>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-claw-black/60">Plan:</span>
            <p className="font-medium text-claw-black">{PLAN_NAMES[data.plan]}</p>
          </div>
          <div>
            <span className="text-claw-black/60">Contacto:</span>
            <p className="font-medium text-claw-black">{data.contact.name}</p>
            <p className="text-claw-black/70 text-xs">{data.contact.email}</p>
          </div>
          <div>
            <span className="text-claw-black/60">Asistente:</span>
            <p className="font-medium text-claw-black">{data.assistant.assistantName}</p>
            <p className="text-claw-black/70 text-xs capitalize">{data.assistant.personality}</p>
          </div>
          <div>
            <span className="text-claw-black/60">Integración:</span>
            <p className="font-medium text-claw-black">{integration?.icon} {integration?.name}</p>
          </div>
          <div>
            <span className="text-claw-black/60">Modelo IA:</span>
            <p className="font-medium text-claw-black">{model?.name}</p>
          </div>
          <div>
            <span className="text-claw-black/60">Skills:</span>
            <p className="font-medium text-claw-black">{selectedSkillNames.length} seleccionados</p>
          </div>
        </div>

        <hr className="border-claw-black/10" />

        {/* Pricing */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-claw-black/70">Instalación:</span>
            <span className="font-bold text-claw-black">
              ${pricing.setupFee.toLocaleString()} MXN
            </span>
          </div>
          {pricing.isSubscription && (
            <div className="flex justify-between text-sm">
              <span className="text-claw-black/70">Mensualidad:</span>
              <span className="font-bold text-claw-red">
                +${pricing.monthlyFee?.toLocaleString()} MXN/mes
              </span>
            </div>
          )}
        </div>

        <hr className="border-claw-black/10" />

        <div className="flex justify-between items-center">
          <span className="font-bold text-claw-black">Total hoy:</span>
          <span className="text-2xl font-bold text-claw-black">
            ${(pricing.setupFee + (pricing.isSubscription ? (pricing.monthlyFee || 0) : 0)).toLocaleString()} MXN
          </span>
        </div>

        {pricing.isSubscription && (
          <p className="text-xs text-claw-black/50 text-center">
            Se cobrarán ${pricing.setupFee.toLocaleString()} de instalación + primer mes de ${pricing.monthlyFee?.toLocaleString()}
          </p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 text-red-700">
          <p className="font-bold">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* PayPal Buttons */}
      <div className="mb-8">
        {isPending || isProcessing ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-claw-black border-t-transparent rounded-full" />
            <span className="ml-3 text-claw-black/70">
              {isProcessing ? 'Procesando pago...' : 'Cargando PayPal...'}
            </span>
          </div>
        ) : (
          <PayPalButtons
            style={{
              layout: 'vertical',
              color: 'black',
              shape: 'rect',
              label: 'pay',
            }}
            createOrder={pricing.isSubscription ? undefined : handleCreateOrder}
            onApprove={pricing.isSubscription ? handleSubscriptionApprove : handleApprove}
            createSubscription={pricing.isSubscription ? handleCreateSubscription : undefined}
            onError={(err) => {
              console.error('PayPal error:', err);
              setError('Error con PayPal. Por favor intenta de nuevo.');
            }}
            onCancel={() => {
              setError('Pago cancelado. Puedes intentar de nuevo cuando quieras.');
            }}
          />
        )}
      </div>

      {/* Security Note */}
      <div className="text-center text-sm text-claw-black/50 mb-8">
        <p>🔒 Pago seguro procesado por PayPal</p>
        <p className="text-xs mt-1">No almacenamos datos de tu tarjeta</p>
      </div>

      {/* Navigation */}
      <div className="flex justify-start">
        <button
          type="button"
          onClick={onBack}
          disabled={isProcessing}
          className="px-6 py-3 text-claw-black font-bold uppercase tracking-wider text-sm border-2 border-claw-black/20 hover:border-claw-black hover:bg-claw-black/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Atrás
        </button>
      </div>
    </div>
  );
}
