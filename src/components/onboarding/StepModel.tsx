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
        <h2 className="text-display text-2xl text-claw-black mb-2">
          Modelo de IA
        </h2>
        <p className="text-claw-black/60">
          Elige el cerebro de tu asistente
        </p>
      </div>

      <div className="space-y-4">
        {AI_MODELS.map((model) => (
          <button
            key={model.id}
            type="button"
            onClick={() => onChange({ model: model.id })}
            className={`w-full p-5 border-2 text-left transition-all ${
              data.model === model.id
                ? 'border-claw-green bg-claw-green/10'
                : 'border-claw-black/20 hover:border-claw-black/40'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-claw-black text-lg">
                    {model.name}
                  </span>
                  {model.recommended && (
                    <span className="text-xs bg-claw-green text-claw-black px-2 py-0.5 font-bold uppercase">
                      Recomendado
                    </span>
                  )}
                </div>
                <p className="text-sm text-claw-black/60 mt-1">
                  {model.description}
                </p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-4 ${
                data.model === model.id
                  ? 'border-claw-green bg-claw-green'
                  : 'border-claw-black/30'
              }`}>
                {data.model === model.id && (
                  <span className="text-white text-sm">✓</span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-claw-black/5 border-l-4 border-claw-purple">
        <p className="text-sm text-claw-black/70">
          <strong>💡 Tip:</strong> Puedes cambiar el modelo en cualquier momento 
          desde la configuración de tu asistente. El costo del modelo de IA 
          es adicional según tu uso.
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
