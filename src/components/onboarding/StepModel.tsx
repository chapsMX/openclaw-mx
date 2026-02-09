'use client';

import type { ModelConfig } from '@/lib/types';
import { AI_MODELS } from '@/lib/types';

interface StepModelProps {
  data: ModelConfig;
  onChange: (data: ModelConfig) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepModel({ data, onChange, onNext, onBack }: StepModelProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        <h2 className="text-display text-2xl text-text-primary mb-2">
          Modelo de IA
        </h2>
        <p className="text-text-secondary">
          Elige el cerebro de tu asistente
        </p>
      </div>

      <div className="space-y-4">
        {AI_MODELS.map((model) => (
          <button
            key={model.id}
            type="button"
            onClick={() => onChange({ model: model.id })}
            className={`w-full p-5 border rounded-lg text-left transition-all ${
              data.model === model.id
                ? 'border-accent-primary bg-accent-primary/10'
                : 'border-border hover:border-accent-secondary bg-bg-primary'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-text-primary text-lg">
                    {model.name}
                  </span>
                  {model.recommended && (
                    <span className="text-xs bg-accent-primary text-cta-text px-2 py-0.5 font-bold uppercase rounded">
                      Recomendado
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-secondary mt-1">
                  {model.description}
                </p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-4 ${
                data.model === model.id
                  ? 'border-accent-primary bg-accent-primary'
                  : 'border-border'
              }`}>
                {data.model === model.id && (
                  <span className="text-cta-text text-sm">✓</span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-bg-primary border-l-4 border-accent-secondary rounded-r-lg">
        <p className="text-sm text-text-secondary">
          <strong className="text-text-primary">💡 Tip:</strong> Puedes cambiar el modelo en cualquier momento 
          desde la configuración de tu asistente. El costo del modelo de IA 
          es adicional según tu uso.
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
