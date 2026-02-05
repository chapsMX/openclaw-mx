export function Features() {
  const features = [
    {
      icon: "💬",
      title: "INTEGRACIONES",
      description:
        "WhatsApp, Telegram, iMessage, Discord, Slack. Conéctate donde prefieras.",
    },
    {
      icon: "🧠",
      title: "MEMORIA PERSISTENTE",
      description:
        "Recuerda tus preferencias, contexto, y conversaciones pasadas. Aprende de ti.",
    },
    {
      icon: "⚡",
      title: "AUTOMATIZACIONES",
      description:
        "Alarmas, recordatorios, tareas programadas. Tu asistente trabaja mientras duermes.",
    },
    {
      icon: "🎨",
      title: "PERSONALIZACIÓN",
      description:
        "Define su personalidad, nombre, y comportamiento. Es TU asistente.",
    },
    {
      icon: "🔒",
      title: "TUS DATOS",
      description:
        "Corre en tu infraestructura. Nada pasa por terceros. Control total.",
    },
    {
      icon: "🚀",
      title: "SETUP RÁPIDO",
      description:
        "Desplegamos todo en 5 minutos. Sin conocimientos técnicos necesarios.",
    },
    {
      icon: "🔧",
      title: "SKILLS",
      description:
        "Agrega capacidades: email, calendario, web search, y más. Paquetes de 5 skills.",
    },
    {
      icon: "📱",
      title: "SIEMPRE CONTIGO",
      description:
        "Accede desde cualquier dispositivo. Tu asistente va donde tú vas.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-claw-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-display text-4xl md:text-5xl text-white mb-4">
            Open <span className="text-claw-red">Claw</span>
          </h2>
          <p className="text-claw-red text-xl md:text-2xl font-semibold mb-4">
            El Asistente Personal IA que realmente trabaja por ti!
          </p>
          <p className="text-white/70 max-w-2xl mx-auto">
            Revisa y responde emails en tu nombre, administra tu calendario, te
            notifica sobre lo importante, planea vuelos, etc. Todo desde
            WhatsApp, Telegram o Discord.
          </p>
          <div className="w-24 h-1 bg-claw-green mx-auto mt-6" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-claw-white border-3 border-claw-black p-6 relative brutal-border-hover transition-all duration-200"
            >
              {/* Icon */}
              <div className="w-12 h-12 border-2 border-claw-black flex items-center justify-center mb-4">
                <span className="text-2xl">{feature.icon}</span>
              </div>

              {/* Content */}
              <h3 className="font-bold text-xl mb-3 uppercase tracking-wide">
                {feature.title}
              </h3>
              <p className="text-claw-black/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
