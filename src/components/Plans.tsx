import Link from "next/link";

export function Plans() {
  const plans = [
    {
      name: "Self Hosted",
      price: "2,500",
      priceType: "pago único",
      features: [
        "Equipo a elección del cliente, recomendamos Mac Mini",
        "Instalación de OpenClaw",
        "Control total",
        "Guía de uso y personalización",
        "Seguridad",
        "Skills adicionales disponibles",
      ],
      color: "claw-blue",
      popular: false,
    },
    {
      name: "Managed Hosting",
      subtitle: "Administrado",
      price: "2,500",
      priceType: "instalación",
      monthlyFee: "+ $300/mes administración VPS",
      features: [
        "Instalación de OpenClaw",
        "Administración VPS incluida",
        "Guía de uso y personalización",
        "Seguridad",
        "Skills adicionales disponibles",
        "Soporte prioritario",
      ],
      color: "claw-green",
      popular: true,
    },
    {
      name: "Managed Hosting",
      subtitle: "Propio",
      price: "2,500",
      priceType: "instalación",
      features: [
        "Instalación de OpenClaw",
        "En VPS proporcionada por cliente",
        "Se recomienda AWS",
        "Guía de uso y personalización",
        "Seguridad",
        "Skills adicionales disponibles",
      ],
      color: "claw-purple",
      popular: false,
    },
  ];

  return (
    <section id="plans" className="py-20 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-display text-4xl md:text-5xl text-claw-black mb-2">
            Instalación <span className="text-claw-red">OpenClaw</span>
          </h2>
          <div className="w-24 h-1 bg-claw-black mx-auto" />
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-claw-white border-3 border-claw-black p-6 relative ${
                plan.popular ? "brutal-border-green" : "brutal-border"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-claw-green text-claw-black text-xs font-bold px-4 py-1 uppercase">
                  Recomendado
                </div>
              )}

              {/* Plan Name */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                {plan.subtitle && (
                  <p className="text-sm text-claw-black/60 font-medium">
                    {plan.subtitle}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-claw-red text-4xl font-bold">
                    ${plan.price}
                  </span>
                  <span className="text-claw-black/60 text-sm">
                    {plan.priceType}
                  </span>
                </div>
                {plan.monthlyFee && (
                  <p className="text-sm text-claw-black/80 mt-1">
                    {plan.monthlyFee}
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-2 text-sm">
                    <span className="text-claw-green mt-0.5">✓</span>
                    <span className="text-claw-black/80">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="#contact"
                className={`block w-full text-center font-bold py-3 uppercase tracking-wide brutal-btn ${
                  plan.popular
                    ? "bg-claw-green text-claw-black"
                    : "bg-claw-white text-claw-black border-3 border-claw-black"
                }`}
              >
                Contratar
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
