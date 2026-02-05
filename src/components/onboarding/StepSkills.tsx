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
        <h2 className="text-display text-2xl text-claw-black mb-2">
          Skills Adicionales
        </h2>
        <p className="text-claw-black/60">
          Habilidades extra para tu asistente
        </p>
      </div>

      {/* Free Skills */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-claw-black uppercase tracking-wider mb-4">
          ⚡ Incluidos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {freeSkills.map((skill) => (
            <button
              key={skill.id}
              type="button"
              onClick={() => toggleSkill(skill.id)}
              className={`p-4 border-2 text-left transition-all flex items-center gap-3 ${
                data.selectedSkills.includes(skill.id)
                  ? 'border-claw-green bg-claw-green/10'
                  : 'border-claw-black/20 hover:border-claw-black/40'
              }`}
            >
              <div className={`w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 ${
                data.selectedSkills.includes(skill.id)
                  ? 'border-claw-green bg-claw-green'
                  : 'border-claw-black/30'
              }`}>
                {data.selectedSkills.includes(skill.id) && (
                  <span className="text-white text-xs">✓</span>
                )}
              </div>
              <div>
                <div className="font-medium text-claw-black">{skill.name}</div>
                <div className="text-xs text-claw-black/60">{skill.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Premium Skills */}
      <div>
        <h3 className="text-sm font-bold text-claw-black uppercase tracking-wider mb-4">
          ✨ Premium <span className="text-claw-black/40 font-normal">(próximamente)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {premiumSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-4 border-2 border-claw-black/10 bg-claw-black/5 flex items-center gap-3 opacity-60 cursor-not-allowed"
            >
              <div className="w-5 h-5 border-2 border-claw-black/20 flex-shrink-0" />
              <div>
                <div className="font-medium text-claw-black">{skill.name}</div>
                <div className="text-xs text-claw-black/60">{skill.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-claw-black/5 border-l-4 border-claw-green">
        <p className="text-sm text-claw-black/70">
          <strong>✓ {data.selectedSkills.length} skills seleccionados.</strong>{' '}
          Podrás agregar o quitar skills después desde la configuración.
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
          Continuar al Pago →
        </button>
      </div>
    </form>
  );
}
