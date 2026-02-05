import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-bg-cream flex items-center justify-center py-12 px-4">
      <div 
        className="bg-white border-3 border-claw-black p-10 max-w-lg w-full text-center"
        style={{ boxShadow: '8px 8px 0px #ef4444' }}
      >
        {/* Cancel Icon */}
        <div className="text-6xl mb-6">😔</div>

        <h1 className="text-display text-3xl text-claw-black mb-4">
          Pago Cancelado
        </h1>

        <p className="text-claw-black/70 mb-8">
          No te preocupes, no se realizó ningún cargo a tu cuenta.
          Puedes intentar de nuevo cuando quieras.
        </p>

        <div className="space-y-3">
          <Link
            href="/#plans"
            className="block w-full py-3 bg-claw-black text-white font-bold uppercase tracking-wider text-sm border-2 border-claw-black hover:bg-claw-green hover:text-claw-black transition-colors text-center"
            style={{ boxShadow: '4px 4px 0px #0a0a0a' }}
          >
            Ver Planes
          </Link>
          
          <Link
            href="/"
            className="block text-sm text-claw-black/60 hover:text-claw-black transition-colors"
          >
            Volver al Inicio
          </Link>
        </div>

        <div className="mt-8 p-4 bg-claw-black/5 border-l-4 border-claw-blue text-left">
          <p className="text-sm text-claw-black/70">
            <strong>¿Tuviste algún problema?</strong><br />
            Si encontraste algún error durante el proceso de pago, 
            contáctanos en <a href="mailto:soporte@openclaw.mx" className="text-claw-blue hover:underline">soporte@openclaw.mx</a>
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
