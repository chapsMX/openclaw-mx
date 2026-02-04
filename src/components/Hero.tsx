import Link from "next/link";

export function Hero() {
  return (
    <section className="pt-24 pb-16 bg-claw-green relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-32 right-20 w-24 h-24 bg-claw-blue rounded-full hidden lg:block" />
      <div className="absolute bottom-20 right-40 w-16 h-16 bg-claw-red transform rotate-45 hidden lg:block" />
      <div className="absolute top-48 right-1/3 w-8 h-8 bg-claw-red rounded-full hidden lg:block" />
      <div className="absolute bottom-32 left-20 shape-diamond bg-claw-purple hidden lg:block" style={{ width: 40, height: 40 }} />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div>
            <h1 className="text-display text-5xl md:text-6xl lg:text-7xl text-claw-black mb-6">
              TU ASISTENTE
              <br />
              IA PERSONAL
              <br />
              <span className="text-claw-red">24/7</span>
            </h1>
            <p className="text-lg md:text-xl text-claw-black/80 mb-8 max-w-lg">
              Desplegamos y configuramos tu Asistente Virtual en{" "}
              <strong>5 minutos</strong>. Self Hosted (Mac Mini) o Managed
              Hosting (VPS). ❤️
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#plans"
                className="bg-claw-red text-white font-bold px-8 py-4 text-lg uppercase tracking-wide brutal-btn text-center"
              >
                Ver Planes
              </Link>
              <Link
                href="#features"
                className="bg-claw-white text-claw-black font-bold px-8 py-4 text-lg uppercase tracking-wide brutal-btn text-center"
              >
                Ver Features
              </Link>
            </div>
            <p className="mt-6 text-sm text-claw-black/60 uppercase tracking-wide">
              Funciona con: WhatsApp · Telegram · Discord · iMessage
            </p>
          </div>

          {/* Right Column - Terminal/Robot */}
          <div className="relative">
            {/* Badge */}
            <div className="absolute -top-4 right-4 bg-claw-white border-3 border-claw-black px-4 py-2 brutal-border z-10">
              <span className="text-sm font-bold">OPEN SOURCE 🔥</span>
            </div>

            {/* Terminal Window */}
            <div className="bg-claw-black border-3 border-claw-black brutal-border-green">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b-3 border-claw-black bg-claw-black">
                <div className="w-4 h-4 rounded-full bg-claw-red" />
                <div className="w-4 h-4 rounded-full bg-claw-yellow" />
                <div className="w-4 h-4 rounded-full bg-claw-green" />
                <span className="text-white/60 text-sm ml-2 font-mono">
                  openclaw@vps:~
                </span>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm leading-relaxed">
                <p className="text-white/60">
                  $ curl -fsSL https://openclaw.mx/install.sh | bash
                </p>
                <p className="text-white/80 mt-3">
                  [INFO] Initializing OpenClaw...
                </p>
                <p className="text-claw-green mt-1">[OK] Node.js 22.x detected</p>
                <p className="text-claw-green mt-1">
                  [OK] Dependencies installed
                </p>
                <p className="text-claw-blue mt-1">
                  [DOWNLOAD] Fetching OpenClaw core...
                </p>
                <p className="text-claw-green mt-1">[OK] Installation complete</p>
                <p className="text-claw-purple mt-1">
                  [CONFIG] Configuring service...
                </p>
                <p className="text-claw-green mt-3 text-lg font-bold animate-pulse">
                  SYSTEM_READY ✓
                </p>
                <p className="text-white/60 mt-3">
                  user@vps:~$ <span className="animate-pulse">▋</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
