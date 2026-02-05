import Image from "next/image";

export function FinalLogo() {
  return (
    <section className="py-20 bg-claw-green">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Image
          src="/openclaw_logo.png"
          alt="OpenClaw"
          width={500}
          height={150}
          className="mx-auto mb-8"
        />
        <p className="text-claw-black/70 text-lg md:text-xl max-w-2xl mx-auto">
          Tu asistente personal IA, disponible 24/7.
        </p>
      </div>
    </section>
  );
}
