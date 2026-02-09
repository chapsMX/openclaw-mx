import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center py-12 px-4">
      <div className="bg-bg-surface border border-border rounded-xl p-10 max-w-lg w-full text-center shadow-xl">
        {/* Cancel Icon */}
        <div className="text-6xl mb-6">😔</div>

        <h1 className="text-display text-3xl text-text-primary mb-4">
          Pago Cancelado
        </h1>

        <p className="text-text-secondary mb-8">
          No te preocupes, no se realizó ningún cargo a tu cuenta.
          Puedes intentar de nuevo cuando quieras.
        </p>

        <div className="space-y-3">
          <Link
            href="/#plans"
            className="block w-full py-3 bg-cta-bg text-cta-text font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-cta-bg-hover transition-colors text-center shadow-lg"
          >
            Ver Planes
          </Link>
          
          <Link
            href="/"
            className="block text-sm text-text-muted hover:text-text-primary transition-colors"
          >
            Volver al Inicio
          </Link>
        </div>

        <div className="mt-8 p-4 bg-bg-primary border-l-4 border-accent-secondary rounded-r-lg text-left">
          <p className="text-sm text-text-secondary">
            <strong className="text-text-primary">¿Tuviste algún problema?</strong><br />
            Si encontraste algún error durante el proceso de pago, 
            contáctanos en <a href="mailto:soporte@openclaw.mx" className="text-accent-secondary hover:underline">soporte@openclaw.mx</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Pago Cancelado | OpenClaw México',
  description: 'El proceso de pago fue cancelado',
};
