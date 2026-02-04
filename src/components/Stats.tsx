export function Stats() {
  const stats = [
    {
      value: "50+",
      label: "Integraciones",
      color: "#ff3b3b",
    },
    {
      value: "24/7",
      label: "Disponibilidad",
      color: "#3b82f6",
    },
    {
      value: "∞",
      label: "Posibilidades",
      color: "#00ff9d",
    },
  ];

  return (
    <section className="bg-claw-black py-16 border-y-4 border-claw-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              {/* Decorative dot */}
              <div 
                className="w-3 h-3 rounded-full mb-4"
                style={{ backgroundColor: stat.color }}
              />
              
              {/* Value */}
              <span 
                className="text-display text-6xl md:text-7xl lg:text-8xl text-white mb-2"
                style={{ textShadow: `0 0 30px ${stat.color}40` }}
              >
                {stat.value}
              </span>
              
              {/* Label */}
              <span className="text-sm uppercase tracking-[0.2em] text-white/50 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
