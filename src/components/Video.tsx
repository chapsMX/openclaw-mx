export function Video() {
  return (
    <section id="video" className="py-20 bg-bg-surface relative overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.08), transparent)" }}
      />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <p className="text-accent-secondary font-mono text-sm tracking-wider mb-4 opacity-70">
            // DEMO
          </p>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl text-text-primary">
            Mira <span className="gradient-text">OpenClaw</span> en Acción
          </h2>
        </div>

        {/* Video container with glass frame */}
        <div className="relative">
          {/* Glow behind video */}
          <div
            aria-hidden
            className="absolute -inset-4 rounded-3xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.15) 0%, transparent 70%)", filter: "blur(30px)" }}
          />
          <div className="relative glass rounded-2xl overflow-hidden shadow-2xl aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/8kNv3rjQaVA"
              title="OpenClaw Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
