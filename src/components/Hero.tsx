import Link from "next/link";

export function Hero() {
  return (
    <section className="pt-16 bg-claw-green relative overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        {/* Main Title - Centered */}
        <div className="text-center mb-10">
          <h1 className="text-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-claw-black leading-none">
            TU ASISTENTE PERSONAL IA
            <br />
            DISPONIBLE <span className="text-claw-red">24/7</span>
          </h1>
        </div>

        {/* Two Columns */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left Column - Text */}
          <div className="space-y-5">
            <p className="text-claw-red font-mono text-lg md:text-xl lg:text-2xl tracking-wider">
              // Instalación y configuración de OpenClaw
            </p>
            
            <div className="space-y-4 text-claw-black/85 text-lg leading-relaxed">
              <p>
                Instalamos y configuramos tu asistente virtual OpenClaw en 5 minutos en un
                ambiente personalizado.
              </p>
              <p>
                Ofrecemos 2 opciones de Instalación:{" "}
                <strong>Self Hosted</strong> (Equipo propio) y{" "}
                <strong>Managed Hosting</strong> (Virtual Private Server), optimizados
                para trabajo de alto rendimiento y realización autónoma de tareas.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="#plans"
                className="bg-claw-red text-white font-bold px-8 py-4 text-base uppercase tracking-wider brutal-btn text-center hover:bg-claw-red-dark"
              >
                Ver Planes
              </Link>
              <Link
                href="#features"
                className="bg-claw-white text-claw-black font-bold px-8 py-4 text-base uppercase tracking-wider brutal-btn text-center"
              >
                Características
              </Link>
            </div>
          </div>

          {/* Right Column - Terminal */}
          <div className="relative">
            {/* Terminal Window */}
            <div className="bg-claw-black border-3 border-claw-black shadow-[6px_6px_0px_#00ff9d] rounded-sm">
              {/* Terminal Header - sin dots */}
              <div className="flex items-center gap-2 px-4 py-3 border-b-3 border-claw-green/30">
                <span className="text-white/50 text-sm font-mono">
                  openclaw@vps:~
                </span>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm leading-loose">
                <p className="text-white/50">
                  <span className="text-claw-green">$</span> curl -fsSL https://openclaw.mx/install.sh | bash
                </p>
                <p className="text-white/70 mt-4">
                  [INFO] Initializing OpenClaw...
                </p>
                <p className="text-claw-green mt-1.5">[OK] Node.js 22.x detected</p>
                <p className="text-claw-green mt-1.5">
                  [OK] Dependencies installed
                </p>
                <p className="text-claw-blue mt-1.5">
                  [DOWNLOAD] Fetching OpenClaw core...
                </p>
                <p className="text-claw-green mt-1.5">[OK] Installation complete</p>
                <p className="text-claw-purple mt-1.5">
                  [CONFIG] Configuring service...
                </p>
                <p className="text-claw-green mt-4 text-base font-bold animate-pulse-glow">
                  SYSTEM_READY ✓
                </p>
                <p className="text-white/50 mt-4">
                  <span className="text-claw-green">user@vps:~$</span> <span className="animate-blink">▋</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
