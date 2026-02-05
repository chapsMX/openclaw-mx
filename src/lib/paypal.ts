// PayPal API client for server-side operations

const PAYPAL_API_BASE = process.env.PAYPAL_MODE === 'live' 
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

interface PayPalTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials not configured');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error('Failed to get PayPal access token');
  }

  const data: PayPalTokenResponse = await response.json();
  return data.access_token;
}

// Create a one-time payment order
export async function createOrder(amount: string, description: string) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'MXN',
          value: amount,
        },
        description,
      }],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create PayPal order');
  }

  return response.json();
}

// Capture an approved order
export async function captureOrder(orderId: string) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to capture PayPal order');
  }

  return response.json();
}

// Create a subscription product (run once during setup)
export async function createProduct(name: string, description: string) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_API_BASE}/v1/catalogs/products`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      type: 'SERVICE',
      category: 'SOFTWARE',
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create product');
  }

  return response.json();
}

// Create a billing plan with setup fee
export async function createPlan(productId: string, setupFee: string, monthlyPrice: string) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_API_BASE}/v1/billing/plans`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product_id: productId,
      name: 'OpenClaw Managed Hosting - Administrado',
      description: 'Instalación y administración mensual de OpenClaw',
      billing_cycles: [
        {
          frequency: {
            interval_unit: 'MONTH',
            interval_count: 1,
          },
          tenure_type: 'REGULAR',
          sequence: 1,
          total_cycles: 0, // infinite
          pricing_scheme: {
            fixed_price: {
              value: monthlyPrice,
              currency_code: 'MXN',
            },
          },
        },
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee: {
          value: setupFee,
          currency_code: 'MXN',
        },
        setup_fee_failure_action: 'CANCEL',
        payment_failure_threshold: 3,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create plan');
  }

  return response.json();
}

// Create a subscription for a user
export async function createSubscription(planId: string, subscriberEmail: string, subscriberName: string) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_API_BASE}/v1/billing/subscriptions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      plan_id: planId,
      subscriber: {
        name: {
          given_name: subscriberName.split(' ')[0],
          surname: subscriberName.split(' ').slice(1).join(' ') || '',
        },
        email_address: subscriberEmail,
      },
      application_context: {
        brand_name: 'OpenClaw México',
        locale: 'es-MX',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'SUBSCRIBE_NOW',
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/cancel`,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create subscription');
  }

  return response.json();
}

// Verify webhook signature
export async function verifyWebhookSignature(
  webhookId: string,
  headers: Record<string, string>,
  body: string
) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      auth_algo: headers['paypal-auth-algo'],
      cert_url: headers['paypal-cert-url'],
      transmission_id: headers['paypal-transmission-id'],
      transmission_sig: headers['paypal-transmission-sig'],
      transmission_time: headers['paypal-transmission-time'],
      webhook_id: webhookId,
      webhook_event: JSON.parse(body),
    }),
  });

  if (!response.ok) {
    return false;
  }

  const result = await response.json();
  return result.verification_status === 'SUCCESS';
}
