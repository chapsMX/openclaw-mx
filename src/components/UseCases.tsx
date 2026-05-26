import { FadeIn } from '@/components/FadeIn';

export function UseCases() {
  const useCases = [
    {
      emoji: "💻",
      title: "Desarrolladores",
      description: "Automatiza deploys, monitorea servers, debugea más rápido.",
      category: "TECH",
      color: "from-cyan-500/20 to-blue-600/20",
    },
    {
      emoji: "🏠",
      title: "Trabajo Remoto",
      description: "Productividad desde cualquier lugar. Organiza tu día.",
      category: "NEGOCIO",
      color: "from-violet-500/20 to-indigo-600/20",
    },
    {
      emoji: "🎬",
      title: "Creadores",
      description: "Crea más, administra menos. DMs, analytics, scheduling.",
      category: "NEGOCIO",
      color: "from-pink-500/20 to-rose-600/20",
    },
    {
      emoji: "🏢",
      title: "Real Estate",
      description: "Nunca pierdas un lead. Follow-ups automáticos 24/7.",
      category: "SERVICIOS",
      color: "from-amber-500/20 to-orange-600/20",
    },
    {
      emoji: "🎯",
      title: "Freelancers",
      description: "Tu back office automatizado. Facturación y clientes.",
      category: "SERVICIOS",
      color: "from-emerald-500/20 to-teal-600/20",
    },
    {
      emoji: "📈",
      title: "Ventas",
      description: "Cierra más deals, actualiza menos CRM. Enfócate.",
      category: "SERVICIOS",
      color: "from-cyan-500/20 to-sky-600/20",
    },
    {
      emoji: "⚖️",
      title: "Legal",
      description: "Horas facturables, no papeleo. Gestiona casos.",
      category: "SERVICIOS",
      color: "from-blue-500/20 to-indigo-600/20",
    },
    {
      emoji: "🧩",
      title: "Consultoría",
      description: "Escala tu impacto sin quemarte. Más clientes.",
      category: "NEGOCIO",
      color: "from-purple-500/20 to-violet-600/20",
    },
    {
      emoji: "📣",
      title: "Marketing",
      description: "Campañas 2x más rápido. Análisis y reportes.",
      category: "NEGOCIO",
      color: "from-rose-500/20 to-pink-600/20",
    },
  ];

  return (
    <section id="usecases" className="py-24 bg-bg-surface relative overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(34,211,238,0.05), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <FadeIn direction="up" className="text-center mb-16">
          <p className="text-accent-secondary font-mono text-sm tracking-wider mb-4 opacity-70">
            // CASOS DE USO
          </p>
          <h2 className="text-display text-4xl md:text-5xl text-text-primary mb-4">
            ¿QUÉ PUEDE <span className="gradient-text">HACER POR TI</span>?
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent mx-auto mb-5" />
          <p className="text-text-secondary max-w-xl mx-auto leading-relaxed">
            Diferente trabajo, diferentes necesidades. Encuentra tu perfil.
          </p>
        </FadeIn>

        {/* Use cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map((useCase, index) => (
            <FadeIn key={index} delay={index * 70} direction="up">
            <div
              className="glass rounded-xl p-6 transition-all duration-300 card-glow hover:bg-white/[0.06] group cursor-default relative overflow-hidden h-full"
            >
              {/* Subtle gradient bg on hover */}
              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-100 transition-opacity duration-400`}
              />

              <div className="relative z-10">
                {/* Emoji */}
                <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform duration-300 origin-left">
                  {useCase.emoji}
                </span>

                {/* Title */}
                <h3 className="font-bold text-lg mb-2 uppercase tracking-wide text-text-primary">
                  {useCase.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm mb-5 leading-relaxed">
                  {useCase.description}
                </p>

                {/* Category badge */}
                <span className="inline-flex items-center px-3 py-1 text-xs font-bold uppercase tracking-wider glass rounded-full text-accent-secondary border-0">
                  {useCase.category}
                </span>
              </div>
            </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
