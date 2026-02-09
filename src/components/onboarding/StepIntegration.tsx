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
        <h2 className="text-display text-2xl text-text-primary mb-2">
          Elige tu Integración
        </h2>
        <p className="text-text-secondary">
          Selecciona cómo te comunicarás con tu asistente
        </p>
        <p className="text-text-muted text-sm mt-2">
          💡 Podrás agregar más integraciones después
        </p>
      </div>

      <div className="space-y-4">
        {INTEGRATIONS.map((integration) => (
          <button
            key={integration.id}
            type="button"
            onClick={() => onChange({ type: integration.id })}
            className={`w-full p-5 border rounded-lg text-left transition-all flex items-center gap-4 ${
              data.type === integration.id
                ? 'border-accent-primary bg-accent-primary/10'
                : 'border-border hover:border-accent-secondary bg-bg-primary'
            }`}
          >
            <div className="text-3xl">{integration.icon}</div>
            <div className="flex-1">
              <div className="font-bold text-text-primary text-lg">
                {integration.name}
              </div>
              <div className="text-sm text-text-secondary">
                {integration.description}
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              data.type === integration.id
                ? 'border-accent-primary bg-accent-primary'
                : 'border-border'
            }`}>
              {data.type === integration.id && (
                <span className="text-cta-text text-sm">✓</span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-bg-primary border-l-4 border-accent-secondary rounded-r-lg">
        <p className="text-sm text-text-secondary">
          <strong className="text-text-primary">Nota:</strong> La configuración detallada de la integración 
          (como vincular tu cuenta de WhatsApp o crear el bot de Telegram) 
          se realizará después de completar el pago.
        </p>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 text-text-primary font-bold uppercase tracking-wider text-sm border border-border rounded-lg hover:border-accent-secondary hover:bg-bg-surface-hover transition-all"
        >
          ← Atrás
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-cta-bg text-cta-text font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-cta-bg-hover transition-colors shadow-lg"
        >
          Siguiente →
        </button>
      </div>
    </form>
  );
}
