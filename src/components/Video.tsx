export function Video() {
  return (
    <section id="video" className="py-16 bg-claw-green">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl text-claw-black mb-4">
            Mira OpenClaw en Acción
          </h2>
        </div>
        
        {/* Video Container */}
        <div className="aspect-video bg-claw-black border-3 border-claw-black shadow-[8px_8px_0px_#0a0a0a] overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="OpenClaw Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
