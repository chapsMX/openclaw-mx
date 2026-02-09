import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-bg-surface border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-secondary">
          <div className="flex items-center gap-4">
            <span>© 2026 OpenClaw</span>
            <span className="text-text-muted">|</span>
            <span className="font-mono text-accent-secondary">v2026.1.30</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="hover:text-text-primary transition">
              Blog
            </Link>
            <Link href="#" className="hover:text-text-primary transition">
              Términos
            </Link>
            <Link href="#" className="hover:text-text-primary transition">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
