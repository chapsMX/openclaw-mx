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
        <h2 className="text-display text-2xl text-claw-black mb-2">
          Configura tu Asistente
        </h2>
        <p className="text-claw-black/60">
          Personaliza la identidad de tu asistente
        </p>
      </div>

      <div className="space-y-8">
        {/* Assistant Name */}
        <div>
          <label className="block text-sm font-medium text-claw-black mb-2">
            Nombre del asistente *
          </label>
          <input
            type="text"
            value={data.assistantName}
            onChange={(e) => {
              onChange({ ...data, assistantName: e.target.value });
              if (errors.assistantName) setErrors({});
            }}
            className={`w-full px-4 py-3 border-2 ${
              errors.assistantName ? 'border-red-500' : 'border-claw-black'
            } bg-white focus:outline-none focus:ring-2 focus:ring-claw-green`}
            placeholder="Ej: Max, Luna, Atlas..."
          />
          {errors.assistantName && (
            <p className="text-red-500 text-sm mt-1">{errors.assistantName}</p>
          )}
          <p className="text-claw-black/50 text-xs mt-2">
            Este será el nombre con el que te comunicarás con tu asistente
          </p>
        </div>

        {/* Personality */}
        <div>
          <label className="block text-sm font-medium text-claw-black mb-3">
            Personalidad
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PERSONALITIES.map((personality) => (
              <button
                key={personality.id}
                type="button"
                onClick={() => onChange({ ...data, personality: personality.id })}
                className={`p-4 border-2 text-left transition-all ${
                  data.personality === personality.id
                    ? 'border-claw-green bg-claw-green/10'
                    : 'border-claw-black/20 hover:border-claw-black/40'
                }`}
              >
                <div className="text-2xl mb-2">{personality.emoji}</div>
                <div className="font-bold text-claw-black">{personality.name}</div>
                <div className="text-sm text-claw-black/60">{personality.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-claw-black mb-3">
            Idioma
          </label>
          <div className="flex gap-4 flex-wrap">
            {LANGUAGES.map((language) => (
              <button
                key={language.id}
                type="button"
                onClick={() => onChange({ ...data, language: language.id })}
                className={`px-5 py-3 border-2 flex items-center gap-2 transition-all ${
                  data.language === language.id
                    ? 'border-claw-green bg-claw-green/10'
                    : 'border-claw-black/20 hover:border-claw-black/40'
                }`}
              >
                <span className="text-xl">{language.flag}</span>
                <span className="font-medium text-claw-black">{language.name}</span>
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
