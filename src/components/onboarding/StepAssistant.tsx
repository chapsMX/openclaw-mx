'use client';

import { useState } from 'react';
import type { AssistantConfig } from '@/lib/types';

interface StepAssistantProps {
  data: AssistantConfig;
  onChange: (data: AssistantConfig) => void;
  onNext: () => void;
  onBack: () => void;
}

const PERSONALITIES = [
  { id: 'professional', name: 'Profesional', emoji: '👔', description: 'Formal y ejecutivo' },
  { id: 'friendly', name: 'Amigable', emoji: '😊', description: 'Cálido y cercano' },
  { id: 'casual', name: 'Casual', emoji: '😎', description: 'Relajado y divertido' },
] as const;

const LANGUAGES = [
  { id: 'es', name: 'Español', flag: '🇲🇽' },
  { id: 'en', name: 'English', flag: '🇺🇸' },
  { id: 'both', name: 'Ambos', flag: '🌎' },
] as const;

export function StepAssistant({ data, onChange, onNext, onBack }: StepAssistantProps) {
  const [errors, setErrors] = useState<{ assistantName?: string }>({});

  const validate = () => {
    if (!data.assistantName.trim()) {
      setErrors({ assistantName: 'Dale un nombre a tu asistente' });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        <h2 className="text-display text-2xl text-text-primary mb-2">
          Configura tu Asistente
        </h2>
        <p className="text-text-secondary">
          Personaliza la identidad de tu asistente
        </p>
      </div>

      <div className="space-y-8">
        {/* Assistant Name */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Nombre del asistente *
          </label>
          <input
            type="text"
            value={data.assistantName}
            onChange={(e) => {
              onChange({ ...data, assistantName: e.target.value });
              if (errors.assistantName) setErrors({});
            }}
            className={`w-full px-4 py-3 border rounded-lg bg-bg-primary text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary ${
              errors.assistantName ? 'border-status-error' : 'border-border'
            }`}
            placeholder="Ej: Max, Luna, Atlas..."
          />
          {errors.assistantName && (
            <p className="text-status-error text-sm mt-1">{errors.assistantName}</p>
          )}
          <p className="text-text-muted text-xs mt-2">
            Este será el nombre con el que te comunicarás con tu asistente
          </p>
        </div>

        {/* Personality */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Personalidad
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PERSONALITIES.map((personality) => (
              <button
                key={personality.id}
                type="button"
                onClick={() => onChange({ ...data, personality: personality.id })}
                className={`p-4 border rounded-lg text-left transition-all ${
                  data.personality === personality.id
                    ? 'border-accent-primary bg-accent-primary/10'
                    : 'border-border hover:border-accent-secondary bg-bg-primary'
                }`}
              >
                <div className="text-2xl mb-2">{personality.emoji}</div>
                <div className="font-bold text-text-primary">{personality.name}</div>
                <div className="text-sm text-text-secondary">{personality.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Idioma
          </label>
          <div className="flex gap-4 flex-wrap">
            {LANGUAGES.map((language) => (
              <button
                key={language.id}
                type="button"
                onClick={() => onChange({ ...data, language: language.id })}
                className={`px-5 py-3 border rounded-lg flex items-center gap-2 transition-all ${
                  data.language === language.id
                    ? 'border-accent-primary bg-accent-primary/10'
                    : 'border-border hover:border-accent-secondary bg-bg-primary'
                }`}
              >
                <span className="text-xl">{language.flag}</span>
                <span className="font-medium text-text-primary">{language.name}</span>
              </button>
            ))}
          </div>
        </div>
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
