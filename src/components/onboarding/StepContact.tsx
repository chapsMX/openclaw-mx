'use client';

import { useState } from 'react';
import type { ContactData } from '@/lib/types';

interface StepContactProps {
  data: ContactData;
  onChange: (data: ContactData) => void;
  onNext: () => void;
}

export function StepContact({ data, onChange, onNext }: StepContactProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof ContactData, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof ContactData, string>> = {};
    
    if (!data.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!data.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!data.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\+?[\d\s-]{10,}$/.test(data.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Teléfono inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  const updateField = (field: keyof ContactData, value: string) => {
    onChange({ ...data, [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        <h2 className="text-display text-2xl text-claw-black mb-2">
          Datos de Contacto
        </h2>
        <p className="text-claw-black/60">
          Necesitamos tus datos para configurar tu cuenta
        </p>
      </div>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-claw-black mb-2">
            Nombre completo *
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateField('name', e.target.value)}
            className={`w-full px-4 py-3 border-2 ${
              errors.name ? 'border-red-500' : 'border-claw-black'
            } bg-white focus:outline-none focus:ring-2 focus:ring-claw-green`}
            placeholder="Tu nombre"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-claw-black mb-2">
            Email *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateField('email', e.target.value)}
            className={`w-full px-4 py-3 border-2 ${
              errors.email ? 'border-red-500' : 'border-claw-black'
            } bg-white focus:outline-none focus:ring-2 focus:ring-claw-green`}
            placeholder="tu@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-claw-black mb-2">
            Teléfono *
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className={`w-full px-4 py-3 border-2 ${
              errors.phone ? 'border-red-500' : 'border-claw-black'
            } bg-white focus:outline-none focus:ring-2 focus:ring-claw-green`}
            placeholder="+52 55 1234 5678"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Company (optional) */}
        <div>
          <label className="block text-sm font-medium text-claw-black mb-2">
            Empresa <span className="text-claw-black/40">(opcional)</span>
          </label>
          <input
            type="text"
            value={data.company || ''}
            onChange={(e) => updateField('company', e.target.value)}
            className="w-full px-4 py-3 border-2 border-claw-black bg-white focus:outline-none focus:ring-2 focus:ring-claw-green"
            placeholder="Nombre de tu empresa"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex justify-end">
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
