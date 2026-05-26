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
            OpenClaw - El Agente IA Personal que realmente trabaja por ti
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

            {/* Integrations */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-text-muted text-xs font-mono uppercase tracking-widest shrink-0">
                OpenClaw funciona con:
              </span>

              {/* WhatsApp */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="#ffffff" aria-label="WhatsApp">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>

              {/* Discord */}
              <svg viewBox="0 0 127.14 96.36" className="w-5 h-4 shrink-0" fill="#fff" aria-label="Discord">
                <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0 105.89 105.89 0 0 0 19.39 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2.04a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2.04a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.45 65.69C36.18 65.69 31 60 31 53.05s5-12.68 11.45-12.68S54 46.07 53.89 53.05c0 6.95-5.11 12.64-11.44 12.64Zm42.24 0C78.41 65.69 73.25 60 73.25 53.05s5-12.68 11.44-12.68S96.23 46.07 96.12 53.05c0 6.95-5.08 12.64-11.43 12.64Z"/>
              </svg>

              {/* Telegram */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="#ffffff" aria-label="Telegram">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>

              {/* Gmail */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="#fff" aria-label="Gmail">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
              </svg>

              {/* Notion */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="#fff" aria-label="Notion">
                <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L2.84 2.298c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.934-.56.934-1.166V6.354c0-.606-.233-.933-.747-.886l-15.177.886c-.56.047-.747.327-.747.934zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.747 0-.934-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.886.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.933.653.933 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.046-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.448-1.632z"/>
              </svg>

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
