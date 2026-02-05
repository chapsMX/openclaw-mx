import Link from 'next/link';

interface SuccessPageProps {
  searchParams: Promise<{ orderId?: string; subscriptionId?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const { orderId, subscriptionId } = params;
  const isSubscription = !!subscriptionId;

  return (
    <div className="min-h-screen bg-bg-cream flex items-center justify-center py-12 px-4">
      <div 
        className="bg-white border-3 border-claw-black p-10 max-w-lg w-full text-center"
        style={{ boxShadow: '8px 8px 0px #00ff9d' }}
      >
        {/* Success Icon */}
        <div className="text-6xl mb-6">🎉</div>

        <h1 className="text-display text-3xl text-claw-black mb-4">
          ¡Pago Exitoso!
        </h1>

        <p className="text-claw-black/70 mb-6">
          {isSubscription 
            ? 'Tu suscripción ha sido activada correctamente.'
            : 'Tu pago ha sido procesado correctamente.'
          }
        </p>

        <div className="bg-claw-green/20 border-2 border-claw-green p-4 mb-8">
          <p className="text-sm text-claw-black/80">
            <strong>ID de {isSubscription ? 'Suscripción' : 'Orden'}:</strong>
          </p>
          <p className="font-mono text-sm text-claw-black break-all">
            {subscriptionId || orderId}
          </p>
        </div>

        <div className="space-y-4 text-left mb-8">
          <h2 className="font-bold text-claw-black">📋 Próximos pasos:</h2>
          <ol className="space-y-3 text-sm text-claw-black/70">
            <li className="flex gap-3">
              <span className="bg-claw-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
              <span>Recibirás un email de confirmación con los detalles</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-claw-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
              <span>Nuestro equipo te contactará en las próximas 24-48 horas</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-claw-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span>
              <span>Configuraremos tu asistente y la integración seleccionada</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-claw-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">4</span>
              <span>¡Empezarás a usar tu asistente personal!</span>
            </li>
          </ol>
        </div>

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full py-3 bg-claw-black text-white font-bold uppercase tracking-wider text-sm border-2 border-claw-black hover:bg-claw-green hover:text-claw-black transition-colors text-center"
            style={{ boxShadow: '4px 4px 0px #0a0a0a' }}
          >
            Volver al Inicio
          </Link>
          
          <a
            href="mailto:soporte@openclaw.mx"
            className="block text-sm text-claw-black/60 hover:text-claw-black transition-colors"
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
