import Image from "next/image";
import Link from "next/link";

export function FinalLogo() {
  return (
    <section className="py-24 bg-bg-surface relative overflow-hidden border-t border-white/[0.05]">
      {/* Orbs */}
      <div
        aria-hidden
        className="animate-orb absolute -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <div
        aria-hidden
        className="animate-orb-alt absolute -bottom-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <Image
          src="/openclaw_logo.png"
          alt="OpenClaw"
          width={500}
          height={150}
          className="mx-auto mb-8 opacity-90"
        />

        <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Tu agente IA personal, trabajando por ti{" "}
          <span className="gradient-text font-semibold">24/7</span>.
        </p>

        <Link
          href="#plans"
          className="btn-gradient inline-block font-bold px-10 py-4 text-base uppercase tracking-wider rounded-xl shadow-lg"
        >
          Contratar Ahora
        </Link>
      </div>
    </section>
  );
}
