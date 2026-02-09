export function Stats() {
  const stats = [
    {
      value: "50+",
      label: "Integraciones",
    },
    {
      value: "24/7",
      label: "Disponibilidad",
    },
    {
      value: "∞",
      label: "Posibilidades",
    },
  ];

  return (
    <section className="bg-bg-surface py-16 border-y border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              {/* Decorative dot */}
              <div className="w-3 h-3 rounded-full mb-4 bg-accent-secondary" />
              
              {/* Value */}
              <span className="text-display text-6xl md:text-7xl lg:text-8xl text-text-primary mb-2">
                {stat.value}
              </span>
              
              {/* Label */}
              <span className="text-sm uppercase tracking-[0.2em] text-text-muted font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
