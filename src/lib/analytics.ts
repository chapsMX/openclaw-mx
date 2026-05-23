interface WindowWithGtag extends Window {
  gtag?: (command: string, ...args: unknown[]) => void;
}

function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  (window as WindowWithGtag).gtag?.('event', name, params);
}

export function trackPageView(path: string) {
  trackEvent('page_view', {
    page_path: path,
    page_location: window.location.href,
  });
}

export function trackBeginCheckout(planId: string, planName: string, value: number) {
  trackEvent('begin_checkout', {
    currency: 'MXN',
    value,
    items: [{ item_id: planId, item_name: planName, price: value, quantity: 1 }],
  });
}

export function trackPurchase(transactionId: string, planId: string, planName: string, value: number) {
  trackEvent('purchase', {
    transaction_id: transactionId,
    currency: 'MXN',
    value,
    items: [{ item_id: planId, item_name: planName, price: value, quantity: 1 }],
  });
}

export function trackPaymentError(planId: string, errorType: 'paypal_error' | 'cancel' | 'api_error', message?: string) {
  trackEvent('payment_error', {
    plan: planId,
    error_type: errorType,
    error_message: message,
  });
}

export function trackOnboardingStep(step: number, stepName: string, plan: string) {
  trackEvent('onboarding_step_complete', {
    step_number: step,
    step_name: stepName,
    plan,
  });
}

export function trackScrollDepth(percent: number) {
  trackEvent('scroll_depth', { percent_scrolled: percent });
}
