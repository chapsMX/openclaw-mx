'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";

interface Inventory {
  plan_type: string;
  total: number;
  sold: number;
  available: number;
}

export function Plans() {
  const [inventory, setInventory] = useState<Inventory[]>([]);

  useEffect(() => {
    fetch('/api/inventory')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setInventory(data);
        }
      })
      .catch(err => console.error('Error fetching inventory:', err));
  }, []);

  const getAvailable = (planId: string) => {
    const inv = inventory.find(i => i.plan_type === planId);
    return inv ? inv.available : null;
  };

  const plans = [
    {
      id: "self-hosted",
      name: "Self Hosted",
      price: "2,500",
      currency: "MXN",
      priceType: "pago único",
      features: [
        "Equipo a elección del cliente",
        "Recomendamos Mac Mini",
        "Instalación de OpenClaw",
        "Control total sobre tu servidor",
        "Guía de uso y personalización",
        "Seguridad y privacidad",
        "Skills adicionales disponibles",
      ],
      accentColor: "claw-blue",
      shadowColor: "#3b82f6",
      popular: false,
      showInventory: true,
    },
    {
      id: "managed-admin",
      name: "Managed Hosting",
      subtitle: "Administrado",
      price: "2,500",
      currency: "MXN",
      priceType: "instalación",
      monthlyFee: "$300 MXN/mes",
      monthlyLabel: "administración VPS",
      features: [
        "Instalación completa de OpenClaw",
        "VPS administrada por nosotros",
        "Backups automáticos",
        "Guía de uso y personalización",
        "Soporte prioritario",
        "Actualizaciones incluidas",
        "Skills adicionales disponibles",
      ],
      accentColor: "claw-green",
      shadowColor: "#00ff9d",
      popular: true,
      showInventory: false,
    },
    {
      id: "managed-vps",
      name: "Managed Hosting",
      subtitle: "VPS Propia",
      price: "2,500",
      currency: "MXN",
      priceType: "instalación",
      features: [
        "Instalación de OpenClaw",
        "En VPS proporcionada por ti",
        "Se recomienda AWS o DigitalOcean",
        "Guía de uso y personalización",
        "Configuración optimizada",
        "Seguridad configurada",
        "Skills adicionales disponibles",
      ],
      accentColor: "claw-purple",
      shadowColor: "#a855f7",
      popular: false,
      showInventory: false,
    },
  ];

  return (
    <section id="plans" className="py-24 bg-bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-claw-red font-mono text-sm tracking-wider mb-4">
            // PLANES DE INSTALACIÓN
          </p>
          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-claw-black mb-3">
            Instalación <span className="text-claw-red">OpenClaw</span>
          </h2>
          <div className="w-20 h-1 bg-claw-black mx-auto mt-4" />
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {plans.map((plan, index) => {
            const available = getAvailable(plan.id);
            const soldOut = plan.showInventory && available !== null && available <= 0;

            return (
              <div
                key={index}
                className={`bg-claw-white border-3 border-claw-black p-8 relative transition-all duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px] ${
                  soldOut ? 'opacity-75' : ''
                }`}
                style={{
                  boxShadow: plan.popular 
                    ? `8px 8px 0px ${plan.shadowColor}` 
                    : `6px 6px 0px #0a0a0a`,
                }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-claw-green text-claw-black text-xs font-bold px-5 py-1.5 uppercase tracking-wider border-2 border-claw-black">
                    ⭐ Recomendado
                  </div>
                )}

                {/* Sold Out Badge */}
                {soldOut && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-claw-red text-white text-xs font-bold px-5 py-1.5 uppercase tracking-wider border-2 border-claw-black">
                    Agotado
                  </div>
                )}

                {/* Colored accent bar */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-${plan.accentColor}`}
                  style={{ backgroundColor: plan.shadowColor }}
                />

                {/* Plan Name */}
                <div className="mb-6 pt-2">
                  <h3 className="text-display text-2xl lg:text-3xl text-claw-black">
                    {plan.name}
                  </h3>
                  {plan.subtitle && (
                    <p className="text-base text-claw-black/60 font-medium mt-1">
                      {plan.subtitle}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl lg:text-6xl font-bold text-claw-black">
                      ${plan.price}
                    </span>
                    <span className="text-claw-black/50 text-sm font-medium">
                      {plan.currency}
                    </span>
                  </div>
                  <p className="text-claw-black/60 text-sm mt-1">
                    {plan.priceType}
                  </p>
                  {plan.monthlyFee && (
                    <div className="mt-3 pt-3 border-t border-claw-black/10">
                      <p className="text-claw-red font-bold text-lg">
                        + {plan.monthlyFee}
                      </p>
                      <p className="text-claw-black/50 text-xs">
                        {plan.monthlyLabel}
                      </p>
                    </div>
                  )}
                </div>

                {/* Inventory Badge */}
                {plan.showInventory && available !== null && available > 0 && (
                  <div className="mb-6 p-3 bg-claw-red/10 border-2 border-claw-red/30 text-center">
                    <p className="text-claw-red font-bold text-sm">
                      🔥 ¡Solo quedan {available} de 10!
                    </p>
                  </div>
                )}

                {/* Features */}
                <ul className="space-y-3.5 mb-10">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3 text-sm">
                      <span 
                        className="mt-0.5 text-base"
                        style={{ color: plan.shadowColor }}
                      >
                        ✓
                      </span>
                      <span className="text-claw-black/75 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                {soldOut ? (
                  <button
                    disabled
                    className="block w-full text-center font-bold py-4 uppercase tracking-wider text-sm border-3 border-claw-black/30 bg-claw-black/10 text-claw-black/40 cursor-not-allowed"
                  >
                    Agotado
                  </button>
                ) : (
                  <Link
                    href={`/onboarding?plan=${plan.id}`}
                    className={`block w-full text-center font-bold py-4 uppercase tracking-wider text-sm border-3 border-claw-black transition-all duration-100 ${
                      plan.popular
                        ? "bg-claw-green text-claw-black hover:bg-claw-green-dark"
                        : "bg-claw-white text-claw-black hover:bg-claw-black hover:text-white"
                    }`}
                    style={{
                      boxShadow: "4px 4px 0px #0a0a0a",
                    }}
                  >
                    Contratar Ahora
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="text-center text-claw-black/50 text-sm mt-12">
          Todos los precios en pesos mexicanos (MXN). IVA incluido.
        </p>
      </div>
    </section>
  );
}
