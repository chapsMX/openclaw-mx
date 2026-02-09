'use client';

import type { SkillConfig } from '@/lib/types';
import { AVAILABLE_SKILLS } from '@/lib/types';

interface StepSkillsProps {
  data: SkillConfig;
  onChange: (data: SkillConfig) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepSkills({ data, onChange, onNext, onBack }: StepSkillsProps) {
  const toggleSkill = (skillId: string) => {
    const isSelected = data.selectedSkills.includes(skillId);
    const newSkills = isSelected
      ? data.selectedSkills.filter(id => id !== skillId)
      : [...data.selectedSkills, skillId];
    onChange({ selectedSkills: newSkills });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const freeSkills = AVAILABLE_SKILLS.filter(s => s.free);
  const premiumSkills = AVAILABLE_SKILLS.filter(s => !s.free);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        <h2 className="text-display text-2xl text-text-primary mb-2">
          Skills Adicionales
        </h2>
        <p className="text-text-secondary">
          Habilidades extra para tu asistente
        </p>
      </div>

      {/* Free Skills */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">
          ⚡ Incluidos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {freeSkills.map((skill) => (
            <button
              key={skill.id}
              type="button"
              onClick={() => toggleSkill(skill.id)}
              className={`p-4 border rounded-lg text-left transition-all flex items-center gap-3 ${
                data.selectedSkills.includes(skill.id)
                  ? 'border-accent-primary bg-accent-primary/10'
                  : 'border-border hover:border-accent-secondary bg-bg-primary'
              }`}
            >
              <div className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                data.selectedSkills.includes(skill.id)
                  ? 'border-accent-primary bg-accent-primary'
                  : 'border-border'
              }`}>
                {data.selectedSkills.includes(skill.id) && (
                  <span className="text-cta-text text-xs">✓</span>
                )}
              </div>
              <div>
                <div className="font-medium text-text-primary">{skill.name}</div>
                <div className="text-xs text-text-secondary">{skill.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Premium Skills */}
      <div>
        <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">
          ✨ Premium <span className="text-text-muted font-normal">(próximamente)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {premiumSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-4 border border-border rounded-lg bg-bg-primary/50 flex items-center gap-3 opacity-60 cursor-not-allowed"
            >
              <div className="w-5 h-5 border-2 border-border rounded flex-shrink-0" />
              <div>
                <div className="font-medium text-text-secondary">{skill.name}</div>
                <div className="text-xs text-text-muted">{skill.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-bg-primary border-l-4 border-accent-primary rounded-r-lg">
        <p className="text-sm text-text-secondary">
          <strong className="text-text-primary">✓ {data.selectedSkills.length} skills seleccionados.</strong>{' '}
          Podrás agregar o quitar skills después desde la configuración.
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
          Continuar al Pago →
        </button>
      </div>
    </form>
  );
}
