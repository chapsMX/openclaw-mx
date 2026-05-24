'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import { PLAN_PRICING, type PlanType } from '@/lib/types';
import { trackBeginCheckout } from '@/lib/analytics';

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
      description: "Instala OpenClaw en tu propio equipo. Control y privacidad absolutos.",
      features: [
        "Equipo a elección del cliente",
        "Recomendamos Mac Mini",
        "Instalación completa de OpenClaw",
        "Control total sobre tu servidor",
        "Guía de uso y personalización",
        "Seguridad y privacidad",
        "Skills adicionales disponibles",
      ],
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
      monthlyLabel: "administración VPS incluida",
      description: "Nosotros administramos todo. Tú solo usas tu asistente.",
      features: [
        "Instalación completa de OpenClaw",
        "VPS administrada por nosotros",
        "Backups automáticos",
        "Guía de uso y personalización",
        "Soporte prioritario",
        "Actualizaciones incluidas",
        "Skills adicionales disponibles",
      ],
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
      description: "Instalamos OpenClaw en tu VPS existente. Tú administras el servidor.",
      features: [
        "Instalación de OpenClaw",
        "En VPS proporcionada por ti",
        "Recomendamos AWS o DigitalOcean",
        "Guía de uso y personalización",
        "Configuración optimizada",
        "Seguridad configurada",
        "Skills adicionales disponibles",
      ],
      popular: false,
      showInventory: false,
    },
  ];

  return (
    <section id="plans" className="py-28 bg-bg-primary relative overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(37,99,235,0.07), transparent)" }}
      />
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-accent-secondary font-mono text-sm tracking-wider mb-4 opacity-70">
            // PLANES DE INSTALACIÓN
          </p>
          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-text-primary mb-3">
            Instalación <span className="gradient-text">OpenClaw</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl mx-auto">
            Tres opciones adaptadas a tus necesidades. Todos incluyen configuración personalizada y guía de uso.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent mx-auto mt-8" />
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {plans.map((plan, index) => {
            const available = getAvailable(plan.id);
            const soldOut = plan.showInventory && available !== null && available <= 0;

            return (
              <div
                key={index}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  plan.popular
                    ? 'card-glow'
                    : 'card-glow'
                } ${soldOut ? 'opacity-60' : ''}`}
              >
                {/* Gradient border wrapper for popular plan */}
                {plan.popular ? (
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(34,211,238,0.4) 0%, rgba(37,99,235,0.4) 100%)",
                      padding: "1px",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 rounded-2xl border border-white/[0.07] pointer-events-none" />
                )}

                {/* Glass background */}
                <div
                  className={`absolute inset-0 rounded-2xl ${
                    plan.popular
                      ? 'bg-white/[0.05]'
                      : 'bg-white/[0.025]'
                  }`}
                  style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
                />

                {/* Popular ambient glow */}
                {plan.popular && (
                  <div
                    aria-hidden
                    className="absolute -inset-4 rounded-3xl pointer-events-none"
                    style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.15) 0%, transparent 70%)", filter: "blur(20px)" }}
                  />
                )}

                {/* Content (relative z-10) */}
                <div className="relative z-10">
                  {/* Badges */}
                  {plan.popular && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 btn-gradient text-xs font-bold px-5 py-1.5 uppercase tracking-wider rounded-full shadow-lg whitespace-nowrap">
                      ⭐ Más Popular
                    </div>
                  )}
                  {soldOut && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-status-error text-white text-xs font-bold px-5 py-1.5 uppercase tracking-wider rounded-full whitespace-nowrap">
                      Agotado
                    </div>
                  )}

                  {/* Plan name */}
                  <div className="mb-2">
                    <h3 className="text-display text-2xl lg:text-3xl text-text-primary">
                      {plan.name}
                    </h3>
                    {plan.subtitle && (
                      <p className="text-sm text-accent-secondary font-mono mt-1 tracking-wide">
                        — {plan.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-text-muted text-sm leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-5xl lg:text-6xl font-bold ${plan.popular ? 'gradient-text' : 'text-text-primary'}`}>
                        ${plan.price}
                      </span>
                      <span className="text-text-muted text-sm font-mono">
                        {plan.currency}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm mt-1">
                      {plan.priceType}
                    </p>
                    {plan.monthlyFee && (
                      <div className="mt-3 pt-3 border-t border-white/[0.07]">
                        <p className="gradient-text font-bold text-lg">
                          + {plan.monthlyFee}
                        </p>
                        <p className="text-text-muted text-xs mt-0.5">
                          {plan.monthlyLabel}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Inventory badge */}
                  {plan.showInventory && available !== null && available > 0 && (
                    <div className="mb-6 p-3 rounded-xl border border-accent-primary/20 bg-accent-primary/5 text-center">
                      <p className="text-accent-secondary font-bold text-sm">
                        🔥 ¡Solo quedan {available} de 10!
                      </p>
                    </div>
                  )}

                  {/* Features */}
                  <ul className="space-y-3 mb-10">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5 text-accent-secondary shrink-0">✓</span>
                        <span className="text-text-secondary leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {soldOut ? (
                    <button
                      disabled
                      className="block w-full text-center font-bold py-4 uppercase tracking-wider text-sm bg-bg-surface-hover text-text-muted rounded-xl cursor-not-allowed opacity-60"
                    >
                      Agotado
                    </button>
                  ) : (
                    <Link
                      href={`/onboarding?plan=${plan.id}`}
                      onClick={() => {
                        const pricing = PLAN_PRICING[plan.id as PlanType];
                        trackBeginCheckout(
                          plan.id,
                          plan.subtitle ? `${plan.name} (${plan.subtitle})` : plan.name,
                          pricing.setupFee + (pricing.hardwareFee ?? 0),
                        );
                      }}
                      className={`block w-full text-center font-bold py-4 uppercase tracking-wider text-sm rounded-xl transition-all duration-200 ${
                        plan.popular
                          ? "btn-gradient shadow-lg"
                          : "glass text-text-primary hover:bg-white/[0.06] hover:text-accent-secondary border-0"
                      }`}
                    >
                      Contratar Ahora
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="text-center text-text-muted text-sm mt-14 font-mono">
          // Todos los precios en pesos mexicanos (MXN). IVA incluido.
        </p>
      </div>
    </section>
  );
}
