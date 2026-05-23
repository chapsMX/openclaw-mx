'use client';

import { useEffect } from 'react';
import { trackPurchase } from '@/lib/analytics';

const PLAN_DISPLAY_NAMES: Record<string, string> = {
  'self-hosted': 'Self Hosted',
  'managed-admin': 'Managed Hosting (Administrado)',
  'managed-vps': 'Managed Hosting (VPS Propia)',
};

interface PurchaseTrackerProps {
  transactionId: string;
  planId: string;
  value: number;
}

export function PurchaseTracker({ transactionId, planId, value }: PurchaseTrackerProps) {
  useEffect(() => {
    trackPurchase(transactionId, planId, PLAN_DISPLAY_NAMES[planId] ?? planId, value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
