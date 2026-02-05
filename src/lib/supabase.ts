import { createClient } from '@supabase/supabase-js';

// Client for browser (limited permissions)
export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Supabase credentials not configured');
  }

  return createClient(url, anonKey);
}

// Admin client for server-side (full permissions)
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error('Supabase admin credentials not configured');
  }

  return createClient(url, serviceKey);
}

// Types
export interface Order {
  id?: string;
  created_at?: string;
  payment_id: string;
  payment_type: 'order' | 'subscription';
  status: string;
  amount: number;
  plan: 'self-hosted' | 'managed-admin' | 'managed-vps';
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_company?: string;
  assistant_name: string;
  assistant_personality?: string;
  assistant_language?: string;
  integration?: string;
  model?: string;
  skills?: string[];
}

export interface Inventory {
  id: string;
  plan_type: string;
  total: number;
  sold: number;
  available: number;
}

// Save order to database
export async function saveOrder(order: Order) {
  const supabase = getSupabaseAdmin();
  
  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single();

  if (error) {
    console.error('Error saving order:', error);
    throw error;
  }

  return data;
}

// Update inventory (decrement available by incrementing sold)
export async function decrementInventory(planType: string) {
  const supabase = getSupabaseAdmin();

  // First check current inventory
  const { data: inventory, error: fetchError } = await supabase
    .from('inventory')
    .select('sold, available')
    .eq('plan_type', planType)
    .single();

  if (fetchError) {
    console.error('Error fetching inventory:', fetchError);
    throw fetchError;
  }

  if (inventory.available <= 0) {
    throw new Error('No inventory available for this plan');
  }

  // Increment sold count
  const { error: updateError } = await supabase
    .from('inventory')
    .update({ sold: inventory.sold + 1 })
    .eq('plan_type', planType);

  if (updateError) {
    console.error('Error updating inventory:', updateError);
    throw updateError;
  }

  return true;
}

// Get inventory for a plan
export async function getInventory(planType?: string) {
  const supabase = getSupabaseClient();

  let query = supabase.from('inventory').select('*');
  
  if (planType) {
    query = query.eq('plan_type', planType);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }

  return planType ? data?.[0] : data;
}
