export function UseCases() {
  const useCases = [
    {
      emoji: "💻",
      title: "Desarrolladores",
      description: "Automatiza deploys, monitorea servers, debugea más rápido.",
      category: "TECH",
    },
    {
      emoji: "🏠",
      title: "Trabajo Remoto",
      description: "Productividad desde cualquier lugar. Organiza tu día.",
      category: "NEGOCIO",
    },
    {
      emoji: "🎬",
      title: "Creadores",
      description: "Crea más, administra menos. DMs, analytics, scheduling.",
      category: "NEGOCIO",
    },
    {
      emoji: "🏢",
      title: "Real Estate",
      description: "Nunca pierdas un lead. Follow-ups automáticos 24/7.",
      category: "SERVICIOS",
    },
    {
      emoji: "🎯",
      title: "Freelancers",
      description: "Tu back office automatizado. Facturación y clientes.",
      category: "SERVICIOS",
    },
    {
      emoji: "📈",
      title: "Ventas",
      description: "Cierra más deals, actualiza menos CRM. Enfócate.",
      category: "SERVICIOS",
    },
    {
      emoji: "⚖️",
      title: "Legal",
      description: "Horas facturables, no papeleo. Gestiona casos.",
      category: "SERVICIOS",
    },
    {
      emoji: "🧩",
      title: "Consultoría",
      description: "Escala tu impacto sin quemarte. Más clientes.",
      category: "NEGOCIO",
    },
    {
      emoji: "📣",
      title: "Marketing",
      description: "Campañas 2x más rápido. Análisis y reportes.",
      category: "NEGOCIO",
    },
  ];

  return (
    <section id="usecases" className="py-20 bg-bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-display text-4xl md:text-5xl text-text-primary mb-4">
            ¿QUÉ PUEDE HACER POR TI?
          </h2>
          <div className="w-24 h-1 bg-accent-primary mx-auto mb-4 rounded-full" />
          <p className="text-text-secondary max-w-xl mx-auto">
            Diferente trabajo, diferentes necesidades. Encuentra tu perfil.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-bg-primary border border-border rounded-xl p-6 transition-all duration-200 cursor-pointer hover:border-accent-primary hover:shadow-lg group"
            >
              {/* Emoji */}
              <span className="text-5xl block mb-4">{useCase.emoji}</span>

              {/* Title */}
              <h3 className="font-bold text-xl mb-2 uppercase tracking-wide text-text-primary">
                {useCase.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary text-sm mb-4">
                {useCase.description}
              </p>

              {/* Category Badge */}
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent-primary text-cta-text rounded-full">
                {useCase.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
