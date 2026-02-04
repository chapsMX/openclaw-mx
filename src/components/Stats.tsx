export function Stats() {
  const stats = [
    {
      icon: "🔴",
      value: "50+",
      label: "INTEGRACIONES",
    },
    {
      icon: "🔷",
      value: "24/7",
      label: "DISPONIBILIDAD",
    },
    {
      icon: "🔺",
      value: "∞",
      label: "POSIBILIDADES",
    },
  ];

  return (
    <section className="bg-claw-black py-12 border-y-3 border-claw-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center text-white"
            >
              <span className="text-2xl mb-2">{stat.icon}</span>
              <span className="text-display text-5xl md:text-6xl mb-2">
                {stat.value}
              </span>
              <span className="text-sm uppercase tracking-widest text-white/60">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
