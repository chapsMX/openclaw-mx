import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-claw-black border-t-3 border-claw-green py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <div className="flex items-center gap-4">
            <span>© 2026 OpenClaw</span>
            <span className="text-claw-green/50">|</span>
            <span className="font-mono text-claw-green">v2026.1.30</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="hover:text-white transition">
              Blog
            </Link>
            <Link href="#" className="hover:text-white transition">
              Términos
            </Link>
            <Link href="#" className="hover:text-white transition">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
