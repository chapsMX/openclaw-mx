import { FadeIn } from '@/components/FadeIn';

const testimonials = [
  {
    quote:
      "Literalmente cambió cómo trabajo. Le digo por WhatsApp qué emails revisar y los resume en segundos. Nunca pensé que tendría algo así corriendo en mi Mac Mini.",
    name: "Carlos M.",
    role: "Consultor independiente",
    avatar: "CM",
    color: "from-cyan-500 to-blue-600",
  },
  {
    quote:
      "Como agente de bienes raíces, el seguimiento a leads era mi cuello de botella. Ahora OpenClaw manda los follow-ups automáticos y yo solo cierro deals. 100% recomendado.",
    name: "Sofía R.",
    role: "Agente inmobiliaria, CDMX",
    avatar: "SR",
    color: "from-violet-500 to-purple-600",
  },
  {
    quote:
      "El equipo de OpenClaw me lo dejó corriendo en menos de una hora. Conecté mi Telegram y mi calendario — ahora el asistente agenda mis reuniones solo. Increíble.",
    name: "Rodrigo V.",
    role: "Desarrollador freelance",
    avatar: "RV",
    color: "from-emerald-500 to-teal-600",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 40% at 50% 50%, rgba(34,211,238,0.05), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <FadeIn direction="up" className="text-center mb-16">
          <p className="text-accent-secondary font-mono text-sm tracking-wider mb-4 opacity-70">
            // LO QUE DICEN NUESTROS USUARIOS
          </p>
          <h2 className="text-display text-4xl md:text-5xl text-text-primary">
            Resultados <span className="gradient-text">Reales</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent mx-auto mt-8" />
        </FadeIn>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <FadeIn key={index} delay={index * 130} direction="up">
              <div className="glass rounded-2xl p-7 flex flex-col gap-5 card-glow h-full relative overflow-hidden group hover:bg-white/[0.05] transition-all duration-300">

                {/* Subtle top gradient accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${t.color} opacity-40 group-hover:opacity-70 transition-opacity duration-300`}
                />

                {/* Quote mark */}
                <span
                  className={`text-5xl font-serif leading-none bg-gradient-to-br ${t.color} bg-clip-text text-transparent select-none`}
                  aria-hidden
                >
                  &ldquo;
                </span>

                {/* Quote text */}
                <p className="text-text-secondary leading-relaxed text-sm flex-1">
                  {t.quote}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center shrink-0`}>
                    <span className="text-white text-xs font-bold tracking-wide">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-text-primary font-semibold text-sm">{t.name}</p>
                    <p className="text-text-muted text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom trust signal */}
        <FadeIn direction="up" delay={400} className="text-center mt-12">
          <p className="text-text-muted text-sm font-mono">
            // Más de{" "}
            <span className="text-accent-secondary font-semibold">50 instalaciones</span>
            {" "}completadas en México
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
