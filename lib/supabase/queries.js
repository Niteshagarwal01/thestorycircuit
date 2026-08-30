import { createClient } from './server';

export async function getTestimonials() {
  const supabase = await createClient();
  const { data } = await supabase.from('testimonials').select('*').order('order_index');
  return data || [];
}

export async function getPortfolio() {
  const supabase = await createClient();
  const { data } = await supabase.from('portfolio').select('*').order('order_index');
  return data || [];
}

export async function getFounders() {
  const supabase = await createClient();
  const { data } = await supabase.from('founders').select('*').order('order_index');
  return data || [];
}

export async function getStats() {
  const supabase = await createClient();
  const { data } = await supabase.from('stats').select('*').order('order_index');
  return data || [];
}

export async function getAgencyInfo() {
  const supabase = await createClient();
  const { data } = await supabase.from('agency_info').select('*').single();
  return data || {};
}
