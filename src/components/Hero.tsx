import Link from "next/link";

export function Hero() {
  return (
    <section className="pt-24 bg-bg-primary relative overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        {/* Main Title - Centered */}
        <div className="text-center mb-10">
          <h1 className="text-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary leading-none">
            TU ASISTENTE PERSONAL IA
            <br />
            DISPONIBLE <span className="text-accent-primary">24/7</span>
          </h1>
        </div>

        {/* Two Columns */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left Column - Text */}
          <div className="space-y-5">
            <p className="text-accent-secondary font-mono text-lg md:text-xl lg:text-2xl tracking-wider">
              // Instalación y configuración de OpenClaw.
            </p>
            
            <div className="space-y-4 text-text-secondary text-lg leading-relaxed">
              <p>
                Nos encargamos de la instalación y configuración personalizada de OpenClaw, el agente autónomo, en un ambiente personalizado y de acuerdo a tus necesidades.
              </p>
              <p>
                Ofrecemos 2 opciones de Instalación:{" "}
                <strong className="text-text-primary">Self Hosted</strong> (Equipo propio) y{" "}
                <strong className="text-text-primary">Managed Hosting</strong> (Virtual Private Server), optimizados
                para trabajo de alto rendimiento y realización autónoma de tareas.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="#plans"
                className="bg-cta-bg text-cta-text font-bold px-8 py-4 text-base uppercase tracking-wider rounded-lg text-center hover:bg-cta-bg-hover transition-all shadow-lg hover:shadow-xl"
              >
                Contratar
              </Link>
              <Link
                href="#features"
                className="bg-bg-surface text-text-primary font-bold px-8 py-4 text-base uppercase tracking-wider rounded-lg text-center border border-border hover:border-accent-primary transition-all"
              >
                Características
              </Link>
            </div>
          </div>

          {/* Right Column - Terminal */}
          <div className="relative">
            {/* Terminal Window */}
            <div className="bg-bg-surface border border-border shadow-2xl rounded-xl overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg-surface-hover">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-status-error/60"></span>
                  <span className="w-3 h-3 rounded-full bg-status-warning/60"></span>
                  <span className="w-3 h-3 rounded-full bg-status-success/60"></span>
                </div>
                <span className="text-text-muted text-sm font-mono ml-2">
                  openclaw@vps:~
                </span>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm leading-loose bg-bg-primary">
                <p className="text-text-muted">
                  <span className="text-accent-secondary">$</span> curl -fsSL https://openclaw.mx/install.sh | bash
                </p>
                <p className="text-text-secondary mt-4">
                  [INFO] Initializing OpenClaw...
                </p>
                <p className="text-status-success mt-1.5">[OK] Node.js 22.x detected</p>
                <p className="text-status-success mt-1.5">
                  [OK] Dependencies installed
                </p>
                <p className="text-accent-primary mt-1.5">
                  [DOWNLOAD] Fetching OpenClaw core...
                </p>
                <p className="text-status-success mt-1.5">[OK] Installation complete</p>
                <p className="text-accent-secondary mt-1.5">
                  [CONFIG] Configuring service...
                </p>
                <p className="text-status-success mt-4 text-base font-bold animate-pulse-glow">
                  SYSTEM_READY ✓
                </p>
                <p className="text-text-muted mt-4">
                  <span className="text-accent-secondary">user@vps:~$</span> <span className="animate-blink">▋</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
