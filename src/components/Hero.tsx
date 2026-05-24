import Link from "next/link";

export function Hero() {
  return (
    <section className="pt-24 bg-bg-primary relative overflow-hidden min-h-screen flex flex-col justify-center">

      {/* ── Background layer: dot grid ── */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* ── Ambient gradient orbs ── */}
      <div
        aria-hidden
        className="animate-orb absolute -top-24 -left-40 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <div
        aria-hidden
        className="animate-orb-alt absolute bottom-0 -right-40 w-[440px] h-[440px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 70%)", filter: "blur(70px)" }}
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 65%)", filter: "blur(80px)" }}
      />

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 relative z-10">

        {/* Status badge */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass text-accent-secondary text-sm font-mono tracking-wider">
            <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
            Claude AI · Self-Hosted · 100% Privado
          </span>
        </div>

        {/* Main headline */}
        <div className="text-center mb-12">
          <h1 className="text-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-text-primary leading-none tracking-tight">
            TU AGENTE IA PERSONAL
            <br />
            <span className="gradient-text">TRABAJA MIENTRAS DUERMES</span>
          </h1>
        </div>

        {/* Two columns */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: copy + CTA ── */}
          <div className="space-y-6">
            <p className="text-accent-secondary font-mono text-base md:text-lg tracking-wider opacity-80">
              // Instalación y configuración de OpenClaw en tu propia infraestructura.
            </p>

            <div className="space-y-4 text-text-secondary text-lg leading-relaxed">
              <p>
                OpenClaw es tu asistente IA personal con memoria persistente que vive en
                tu propio servidor.{" "}
                <strong className="text-text-primary">
                  Responde mensajes, administra emails, agenda reuniones
                </strong>{" "}
                — de forma autónoma, sin que tengas que intervenir.
              </p>
              <p>
                Nosotros instalamos y configuramos todo en menos de 24&nbsp;horas. Elige{" "}
                <strong className="text-text-primary">Self Hosted</strong> (tu propio equipo) o{" "}
                <strong className="text-text-primary">Managed Hosting</strong> (VPS dedicado). Tus
                datos, tu control, siempre.
              </p>
            </div>

            {/* Trust micro-signals */}
            <div className="flex flex-wrap gap-4 text-sm text-text-muted font-mono">
              <span className="flex items-center gap-1.5">
                <span className="text-status-success">✓</span> Setup en &lt; 24h
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-status-success">✓</span> Sin suscripciones extra
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-status-success">✓</span> 50+ integraciones
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="#plans"
                className="btn-gradient font-bold px-9 py-4 text-base uppercase tracking-wider rounded-xl text-center shadow-lg"
              >
                Contratar Ahora
              </Link>
              <Link
                href="#features"
                className="glass text-text-primary font-bold px-9 py-4 text-base uppercase tracking-wider rounded-xl text-center hover:bg-white/[0.06] transition-all duration-300"
              >
                Características
              </Link>
            </div>
          </div>

          {/* ── Right: glass terminal ── */}
          <div className="relative">
            {/* Glow behind terminal */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.15) 0%, transparent 70%)", filter: "blur(30px)" }}
            />

            {/* Terminal window */}
            <div className="relative glass rounded-2xl overflow-hidden shadow-2xl">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-status-error/50" />
                  <span className="w-3 h-3 rounded-full bg-status-warning/50" />
                  <span className="w-3 h-3 rounded-full bg-status-success/50" />
                </div>
                <span className="text-text-muted text-xs font-mono ml-2 tracking-wide">
                  openclaw@vps:~
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-6 font-mono text-sm leading-loose bg-bg-primary/60">
                <p className="text-text-muted">
                  <span className="text-accent-secondary">$</span>{" "}
                  curl -fsSL https://openclaw.mx/install.sh | bash
                </p>
                <p className="text-text-secondary mt-4 opacity-70">
                  [INFO] Initializing OpenClaw...
                </p>
                <p className="text-status-success mt-1.5">[OK] Node.js 22.x detected</p>
                <p className="text-status-success mt-1.5">[OK] Dependencies installed</p>
                <p className="text-accent-primary mt-1.5">
                  [DOWNLOAD] Fetching OpenClaw core...
                </p>
                <p className="text-status-success mt-1.5">[OK] Claude API connected</p>
                <p className="text-accent-secondary mt-1.5">[CONFIG] Configuring service...</p>
                <p className="gradient-text mt-4 text-base font-bold animate-pulse-glow">
                  SYSTEM_READY ✓
                </p>
                <p className="text-text-muted mt-4">
                  <span className="text-accent-secondary">user@vps:~$</span>{" "}
                  <span className="animate-blink">▋</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
