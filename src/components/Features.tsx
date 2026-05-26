import { FadeIn } from '@/components/FadeIn';

export function Features() {
  const features = [
    { icon: "💬", title: "INTEGRACIONES",       description: "WhatsApp, Telegram, iMessage, Discord, Slack. Conéctate donde prefieras." },
    { icon: "🧠", title: "MEMORIA PERSISTENTE", description: "Recuerda tus preferencias, contexto y conversaciones pasadas. Aprende de ti." },
    { icon: "⚡", title: "AUTOMATIZACIONES",    description: "Alarmas, recordatorios, tareas programadas. Tu agente trabaja mientras duermes." },
    { icon: "🎨", title: "PERSONALIZACIÓN",     description: "Define su personalidad, nombre y comportamiento. Es TU asistente." },
    { icon: "🔒", title: "TUS DATOS",           description: "Corre en tu infraestructura. Nada pasa por terceros. Control total." },
    { icon: "🚀", title: "SETUP RÁPIDO",        description: "Instalación completa en menos de 24 horas. Sin conocimientos técnicos." },
    { icon: "🔧", title: "SKILLS",              description: "Agrega capacidades: email, calendario, web search y más. Paquetes de 5 skills." },
    { icon: "📱", title: "SIEMPRE CONTIGO",     description: "Accede desde cualquier dispositivo. Tu asistente va donde tú vas." },
  ];

  return (
    <section id="features" className="py-24 bg-bg-surface relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 40% at 50% 100%, rgba(37,99,235,0.07), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <FadeIn direction="up" className="text-center mb-16">
          <p className="text-accent-secondary font-mono text-sm tracking-wider mb-4 opacity-70">// CAPACIDADES</p>
          <h2 className="text-display text-4xl md:text-5xl text-text-primary mb-4">
            Open<span className="gradient-text">Claw</span>
          </h2>
          <p className="text-accent-secondary text-xl md:text-2xl font-semibold mb-4">
            El Agente IA Personal que realmente trabaja por ti
          </p>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Revisa y responde emails en tu nombre, administra tu calendario, te notifica sobre lo
            importante, planea viajes y mucho más — todo desde WhatsApp, Telegram o Discord.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent mx-auto mt-8" />
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 60} direction="up">
              <div className="glass rounded-xl p-6 h-full relative transition-all duration-300 card-glow group hover:bg-white/[0.06] cursor-default">
                <div className="relative w-12 h-12 mb-5">
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.2), rgba(37,99,235,0.2))", filter: "blur(8px)" }}
                  />
                  <div className="relative w-full h-full glass rounded-xl flex items-center justify-center group-hover:border-white/[0.15] transition-colors">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                </div>
                <h3 className="font-bold text-sm mb-3 uppercase tracking-widest text-text-primary">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent-secondary/0 to-transparent group-hover:via-accent-secondary/30 transition-all duration-500" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
