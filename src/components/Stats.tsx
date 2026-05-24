export function Stats() {
  const stats = [
    {
      value: "50+",
      label: "Integraciones disponibles",
      icon: "⚡",
    },
    {
      value: "24/7",
      label: "Disponibilidad garantizada",
      icon: "🟢",
    },
    {
      value: "< 24h",
      label: "Tiempo de instalación",
      icon: "🚀",
    },
  ];

  return (
    <section className="bg-bg-primary relative overflow-hidden py-20 border-y border-white/[0.05]">
      {/* Subtle background glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(34,211,238,0.06), transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 flex flex-col items-center text-center card-glow transition-all duration-300 group"
            >
              {/* Icon */}
              <span className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </span>

              {/* Value */}
              <span className="text-display text-5xl md:text-6xl lg:text-7xl gradient-text mb-2 leading-none">
                {stat.value}
              </span>

              {/* Label */}
              <span className="text-xs uppercase tracking-[0.2em] text-text-muted font-medium mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
