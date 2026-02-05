import { Resend } from 'resend';
import type { OnboardingData } from './types';
import { PLAN_PRICING } from './types';

// Lazy initialization to avoid build errors when API key is not set
let resend: Resend | null = null;

function getResendClient(): Resend {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'carlos@alcocersola.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'OpenClaw <noreply@openclaw.mx>';

const PLAN_NAMES: Record<string, string> = {
  'self-hosted': 'Self Hosted',
  'managed-admin': 'Managed Hosting (Administrado)',
  'managed-vps': 'Managed Hosting (VPS Propia)',
};

const INTEGRATION_NAMES: Record<string, string> = {
  'whatsapp': 'WhatsApp',
  'telegram': 'Telegram',
  'discord': 'Discord',
  'slack': 'Slack',
  'webchat': 'Web Chat',
};

const MODEL_NAMES: Record<string, string> = {
  'claude-sonnet': 'Claude Sonnet',
  'claude-opus': 'Claude Opus',
  'gpt-4o': 'GPT-4o',
  'gpt-4o-mini': 'GPT-4o Mini',
};

// Email to admin when a new order is placed
export async function sendAdminNotification(
  data: OnboardingData,
  paymentId: string,
  paymentType: 'order' | 'subscription'
) {
  const pricing = PLAN_PRICING[data.plan];
  const totalToday = pricing.setupFee + (pricing.isSubscription ? (pricing.monthlyFee || 0) : 0);

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0a0a0a; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">🎉 Nueva Venta - OpenClaw</h1>
      </div>
      
      <div style="padding: 30px; background: #f9f9f9;">
        <div style="background: white; border: 2px solid #0a0a0a; padding: 20px; margin-bottom: 20px;">
          <h2 style="margin-top: 0; color: #0a0a0a;">💰 Detalles del Pago</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Tipo:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${paymentType === 'subscription' ? 'Suscripción' : 'Pago único'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>ID:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-family: monospace;">${paymentId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Plan:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${PLAN_NAMES[data.plan]}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Total cobrado:</strong></td>
              <td style="padding: 8px 0; font-size: 1.2em; color: #00aa6d;"><strong>$${totalToday.toLocaleString()} MXN</strong></td>
            </tr>
            ${pricing.isSubscription ? `
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Recurrente:</strong></td>
              <td style="padding: 8px 0; color: #666;">$${pricing.monthlyFee?.toLocaleString()} MXN/mes</td>
            </tr>
            ` : ''}
          </table>
        </div>

        <div style="background: white; border: 2px solid #0a0a0a; padding: 20px; margin-bottom: 20px;">
          <h2 style="margin-top: 0; color: #0a0a0a;">👤 Datos del Cliente</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Nombre:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.contact.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">
                <a href="mailto:${data.contact.email}">${data.contact.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Teléfono:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">
                <a href="https://wa.me/${data.contact.phone.replace(/\D/g, '')}">${data.contact.phone}</a>
              </td>
            </tr>
            ${data.contact.company ? `
            <tr>
              <td style="padding: 8px 0;"><strong>Empresa:</strong></td>
              <td style="padding: 8px 0;">${data.contact.company}</td>
            </tr>
            ` : ''}
          </table>
        </div>

        <div style="background: white; border: 2px solid #0a0a0a; padding: 20px;">
          <h2 style="margin-top: 0; color: #0a0a0a;">🤖 Configuración del Asistente</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Nombre:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.assistant.assistantName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Personalidad:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-transform: capitalize;">${data.assistant.personality}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Idioma:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.assistant.language === 'es' ? 'Español' : data.assistant.language === 'en' ? 'English' : 'Ambos'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Integración:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${INTEGRATION_NAMES[data.integration.type]}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Modelo IA:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${MODEL_NAMES[data.model.model]}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Skills:</strong></td>
              <td style="padding: 8px 0;">${data.skills.selectedSkills.join(', ')}</td>
            </tr>
          </table>
        </div>
      </div>

      <div style="background: #0a0a0a; color: white; padding: 15px; text-align: center; font-size: 0.9em;">
        <p style="margin: 0;">Siguiente paso: contactar al cliente para iniciar la instalación</p>
      </div>
    </div>
  `;

  try {
    const client = getResendClient();
    const result = await client.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `🎉 Nueva venta: ${PLAN_NAMES[data.plan]} - ${data.contact.name}`,
      html,
    });

    console.log('Admin notification sent:', result);
    return result;
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    throw error;
  }
}

// Email to customer confirming their purchase
export async function sendCustomerConfirmation(
  data: OnboardingData,
  paymentId: string,
  paymentType: 'order' | 'subscription'
) {
  const pricing = PLAN_PRICING[data.plan];

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0a0a0a; color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0 0 10px 0;">¡Bienvenido a OpenClaw! 🎉</h1>
        <p style="margin: 0; opacity: 0.8;">Tu asistente de IA personal está en camino</p>
      </div>
      
      <div style="padding: 30px; background: #f9f9f9;">
        <p style="font-size: 1.1em;">Hola <strong>${data.contact.name.split(' ')[0]}</strong>,</p>
        
        <p>¡Gracias por confiar en OpenClaw! Hemos recibido tu pago correctamente.</p>

        <div style="background: #00ff9d; border: 2px solid #0a0a0a; padding: 20px; margin: 20px 0;">
          <h2 style="margin: 0 0 15px 0; color: #0a0a0a;">📋 Tu pedido</h2>
          <p style="margin: 5px 0;"><strong>Plan:</strong> ${PLAN_NAMES[data.plan]}</p>
          <p style="margin: 5px 0;"><strong>Asistente:</strong> ${data.assistant.assistantName}</p>
          <p style="margin: 5px 0;"><strong>Integración:</strong> ${INTEGRATION_NAMES[data.integration.type]}</p>
          <p style="margin: 5px 0; font-family: monospace; font-size: 0.85em; color: #666;">ID: ${paymentId}</p>
        </div>

        <h3>📅 ¿Qué sigue?</h3>
        <ol style="line-height: 1.8;">
          <li>Nuestro equipo revisará tu pedido</li>
          <li>Te contactaremos en las próximas <strong>24-48 horas</strong> por WhatsApp o email</li>
          <li>Coordinaremos la instalación y configuración de tu asistente</li>
          <li>Te daremos una guía personalizada para sacarle el máximo provecho</li>
        </ol>

        ${pricing.isSubscription ? `
        <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0; font-size: 0.9em;">
            <strong>💳 Suscripción activa:</strong> Se cobrarán $${pricing.monthlyFee?.toLocaleString()} MXN mensuales 
            por la administración de tu VPS. Puedes cancelar en cualquier momento.
          </p>
        </div>
        ` : ''}

        <p>Si tienes alguna pregunta, no dudes en responder a este correo o escribirnos por WhatsApp.</p>

        <p style="margin-top: 30px;">
          ¡Nos vemos pronto!<br>
          <strong>El equipo de OpenClaw México</strong>
        </p>
      </div>

      <div style="background: #0a0a0a; color: white; padding: 20px; text-align: center; font-size: 0.85em;">
        <p style="margin: 0 0 10px 0;">OpenClaw México</p>
        <p style="margin: 0; opacity: 0.7;">
          <a href="https://openclaw.mx" style="color: #00ff9d;">openclaw.mx</a>
        </p>
      </div>
    </div>
  `;

  try {
    const client = getResendClient();
    const result = await client.emails.send({
      from: FROM_EMAIL,
      to: data.contact.email,
      subject: `¡Bienvenido a OpenClaw! Tu asistente ${data.assistant.assistantName} está en camino 🤖`,
      html,
    });

    console.log('Customer confirmation sent:', result);
    return result;
  } catch (error) {
    console.error('Failed to send customer confirmation:', error);
    // Don't throw - we don't want to fail the order if email fails
  }
}
