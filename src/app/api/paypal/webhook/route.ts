import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/paypal';

// PayPal Webhook Events we care about
type PayPalEventType = 
  | 'CHECKOUT.ORDER.APPROVED'
  | 'PAYMENT.CAPTURE.COMPLETED'
  | 'PAYMENT.CAPTURE.DENIED'
  | 'BILLING.SUBSCRIPTION.ACTIVATED'
  | 'BILLING.SUBSCRIPTION.CANCELLED'
  | 'BILLING.SUBSCRIPTION.SUSPENDED'
  | 'PAYMENT.SALE.COMPLETED';

interface WebhookEvent {
  id: string;
  event_type: PayPalEventType;
  resource: Record<string, unknown>;
  create_time: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    
    // Get webhook ID from environment
    const webhookId = process.env.PAYPAL_WEBHOOK_ID;
    
    if (!webhookId) {
      console.error('PAYPAL_WEBHOOK_ID not configured');
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
    }

    // Get headers for signature verification
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });

    // Verify webhook signature
    const isValid = await verifyWebhookSignature(webhookId, headers, body);
    
    if (!isValid) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event: WebhookEvent = JSON.parse(body);
    
    console.log('Webhook received:', event.event_type, event.id);

    // Handle different event types
    switch (event.event_type) {
      case 'CHECKOUT.ORDER.APPROVED':
        // Order was approved but not yet captured
        console.log('Order approved:', event.resource);
        break;

      case 'PAYMENT.CAPTURE.COMPLETED':
        // One-time payment completed
        console.log('Payment captured:', event.resource);
        // TODO: Update order status in database
        // TODO: Trigger fulfillment process
        break;

      case 'PAYMENT.CAPTURE.DENIED':
        // Payment was denied
        console.log('Payment denied:', event.resource);
        // TODO: Update order status and notify
        break;

      case 'BILLING.SUBSCRIPTION.ACTIVATED':
        // Subscription is now active
        console.log('Subscription activated:', event.resource);
        // TODO: Update subscription status
        // TODO: Start fulfillment
        break;

      case 'BILLING.SUBSCRIPTION.CANCELLED':
        // Subscription was cancelled
        console.log('Subscription cancelled:', event.resource);
        // TODO: Update subscription status
        // TODO: Handle cancellation (e.g., end of service)
        break;

      case 'BILLING.SUBSCRIPTION.SUSPENDED':
        // Subscription was suspended (payment failed)
        console.log('Subscription suspended:', event.resource);
        // TODO: Notify user about payment issue
        break;

      case 'PAYMENT.SALE.COMPLETED':
        // Recurring payment completed
        console.log('Recurring payment completed:', event.resource);
        // TODO: Log payment and update subscription
        break;

      default:
        console.log('Unhandled event type:', event.event_type);
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    // Still return 200 to prevent PayPal from retrying
    return NextResponse.json({ received: true, error: 'Processing failed' });
  }
}
