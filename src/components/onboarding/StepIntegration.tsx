'use client';

import type { IntegrationConfig } from '@/lib/types';
import { INTEGRATIONS } from '@/lib/types';

interface StepIntegrationProps {
  data: IntegrationConfig;
  onChange: (data: IntegrationConfig) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepIntegration({ data, onChange, onNext, onBack }: StepIntegrationProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        <h2 className="text-display text-2xl text-claw-black mb-2">
          Elige tu Integración
        </h2>
        <p className="text-claw-black/60">
          Selecciona cómo te comunicarás con tu asistente
        </p>
        <p className="text-claw-black/40 text-sm mt-2">
          💡 Podrás agregar más integraciones después
        </p>
      </div>

      <div className="space-y-4">
        {INTEGRATIONS.map((integration) => (
          <button
            key={integration.id}
            type="button"
            onClick={() => onChange({ type: integration.id })}
            className={`w-full p-5 border-2 text-left transition-all flex items-center gap-4 ${
              data.type === integration.id
                ? 'border-claw-green bg-claw-green/10'
                : 'border-claw-black/20 hover:border-claw-black/40'
            }`}
          >
            <div className="text-3xl">{integration.icon}</div>
            <div className="flex-1">
              <div className="font-bold text-claw-black text-lg">
                {integration.name}
              </div>
              <div className="text-sm text-claw-black/60">
                {integration.description}
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              data.type === integration.id
                ? 'border-claw-green bg-claw-green'
                : 'border-claw-black/30'
            }`}>
              {data.type === integration.id && (
                <span className="text-white text-sm">✓</span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-claw-black/5 border-l-4 border-claw-blue">
        <p className="text-sm text-claw-black/70">
          <strong>Nota:</strong> La configuración detallada de la integración 
          (como vincular tu cuenta de WhatsApp o crear el bot de Telegram) 
          se realizará después de completar el pago.
        </p>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 text-claw-black font-bold uppercase tracking-wider text-sm border-2 border-claw-black/20 hover:border-claw-black hover:bg-claw-black/5 transition-all"
        >
          ← Atrás
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-claw-black text-white font-bold uppercase tracking-wider text-sm border-2 border-claw-black hover:bg-claw-green hover:text-claw-black transition-colors"
          style={{ boxShadow: '4px 4px 0px #0a0a0a' }}
        >
          Siguiente →
        </button>
      </div>
    </form>
  );
}
