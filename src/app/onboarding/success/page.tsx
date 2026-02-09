import Link from 'next/link';

interface SuccessPageProps {
  searchParams: Promise<{ orderId?: string; subscriptionId?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const { orderId, subscriptionId } = params;
  const isSubscription = !!subscriptionId;

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center py-12 px-4">
      <div className="bg-bg-surface border border-border rounded-xl p-10 max-w-lg w-full text-center shadow-xl">
        {/* Success Icon */}
        <div className="text-6xl mb-6">🎉</div>

        <h1 className="text-display text-3xl text-text-primary mb-4">
          ¡Pago Exitoso!
        </h1>

        <p className="text-text-secondary mb-6">
          {isSubscription 
            ? 'Tu suscripción ha sido activada correctamente.'
            : 'Tu pago ha sido procesado correctamente.'
          }
        </p>

        <div className="bg-accent-primary/10 border border-accent-primary/30 rounded-lg p-4 mb-8">
          <p className="text-sm text-text-secondary">
            <strong className="text-text-primary">ID de {isSubscription ? 'Suscripción' : 'Orden'}:</strong>
          </p>
          <p className="font-mono text-sm text-accent-secondary break-all">
            {subscriptionId || orderId}
          </p>
        </div>

        <div className="space-y-4 text-left mb-8">
          <h2 className="font-bold text-text-primary">📋 Próximos pasos:</h2>
          <ol className="space-y-3 text-sm text-text-secondary">
            <li className="flex gap-3">
              <span className="bg-accent-primary text-cta-text w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
              <span>Recibirás un email de confirmación con los detalles</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-accent-primary text-cta-text w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
              <span>Nuestro equipo te contactará en las próximas 24-48 horas</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-accent-primary text-cta-text w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span>
              <span>Configuraremos tu asistente y la integración seleccionada</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-accent-primary text-cta-text w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">4</span>
              <span>¡Empezarás a usar tu asistente personal!</span>
            </li>
          </ol>
        </div>

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full py-3 bg-cta-bg text-cta-text font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-cta-bg-hover transition-colors text-center shadow-lg"
          >
            Volver al Inicio
          </Link>
          
          <a
            href="mailto:soporte@openclaw.mx"
            className="block text-sm text-text-muted hover:text-text-primary transition-colors"
          >
            ¿Tienes dudas? Contáctanos
          </a>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Pago Exitoso | OpenClaw México',
  description: 'Tu pago ha sido procesado correctamente',
};
