import { FadeIn } from '@/components/FadeIn';

const features = [
  { label: "Memoria persistente",          openclaw: true,  chatgpt: false, claude: false },
  { label: "Self-hosted / tus servidores", openclaw: true,  chatgpt: false, claude: false },
  { label: "Privacidad total de datos",    openclaw: true,  chatgpt: false, claude: false },
  { label: "Disponible 24/7 sin abrir app",openclaw: true,  chatgpt: false, claude: false },
  { label: "Integración con WhatsApp",     openclaw: true,  chatgpt: false, claude: false },
  { label: "Automatiza tareas sin pedirlo",openclaw: true,  chatgpt: false, claude: false },
  { label: "Skills personalizables",       openclaw: true,  chatgpt: false, claude: false },
  { label: "Sin suscripción mensual *",    openclaw: true,  chatgpt: false, claude: false },
  { label: "IA de última generación",      openclaw: true,  chatgpt: true,  claude: true  },
];

const Check = () => (
  <svg viewBox="0 0 20 20" className="w-5 h-5 mx-auto" fill="none" aria-hidden>
    <circle cx="10" cy="10" r="10" fill="rgba(34,211,238,0.15)" />
    <path d="M5.5 10.5l3 3 6-6" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Cross = () => (
  <svg viewBox="0 0 20 20" className="w-5 h-5 mx-auto" fill="none" aria-hidden>
    <circle cx="10" cy="10" r="10" fill="rgba(255,255,255,0.04)" />
    <path d="M7 7l6 6M13 7l-6 6" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export function Comparison() {
  return (
    <section className="py-24 bg-bg-surface relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(37,99,235,0.06), transparent)" }}
      />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Header */}
        <FadeIn direction="up" className="text-center mb-14">
          <p className="text-accent-secondary font-mono text-sm tracking-wider mb-4 opacity-70">
            // ¿POR QUÉ OPENCLAW?
          </p>
          <h2 className="text-display text-4xl md:text-5xl text-text-primary mb-4">
            No es un chatbot.<br />
            Es tu <span className="gradient-text">agente personal</span>.
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto leading-relaxed">
            ChatGPT y Claude son herramientas reactivas — responden cuando preguntas.
            OpenClaw actúa de forma autónoma, recuerda todo y vive en tu propia infraestructura.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent mx-auto mt-8" />
        </FadeIn>

        {/* Table */}
        <FadeIn direction="up" delay={150}>
          <div className="glass rounded-2xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-4 border-b border-white/[0.07]">
              <div className="p-5 col-span-1" />
              {/* OpenClaw — highlighted */}
              <div className="p-5 text-center border-l border-white/[0.07] bg-accent-primary/10 relative">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-secondary to-transparent" />
                <p className="font-bold text-text-primary text-sm">OpenClaw</p>
                <p className="text-accent-secondary text-xs font-mono mt-0.5">Self-hosted</p>
              </div>
              <div className="p-5 text-center border-l border-white/[0.07]">
                <p className="font-bold text-text-muted text-sm">ChatGPT</p>
                <p className="text-text-muted text-xs font-mono mt-0.5">OpenAI</p>
              </div>
              <div className="p-5 text-center border-l border-white/[0.07]">
                <p className="font-bold text-text-muted text-sm">Claude</p>
                <p className="text-text-muted text-xs font-mono mt-0.5">Anthropic</p>
              </div>
            </div>

            {/* Rows */}
            {features.map((feat, index) => (
              <div
                key={index}
                className={`grid grid-cols-4 border-b border-white/[0.04] last:border-0 transition-colors hover:bg-white/[0.02] ${
                  index % 2 === 0 ? '' : 'bg-white/[0.01]'
                }`}
              >
                <div className="p-4 pl-5 flex items-center">
                  <span className="text-text-secondary text-sm leading-snug">{feat.label}</span>
                </div>
                <div className="p-4 flex items-center justify-center border-l border-white/[0.07] bg-accent-primary/5">
                  {feat.openclaw ? <Check /> : <Cross />}
                </div>
                <div className="p-4 flex items-center justify-center border-l border-white/[0.07]">
                  {feat.chatgpt ? <Check /> : <Cross />}
                </div>
                <div className="p-4 flex items-center justify-center border-l border-white/[0.07]">
                  {feat.claude ? <Check /> : <Cross />}
                </div>
              </div>
            ))}
          </div>

          <p className="text-text-muted text-xs font-mono mt-4 text-center">
            * Pago único de instalación. Sin cuota mensual en planes Self Hosted y Managed VPS.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
