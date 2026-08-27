import { createClient } from '@supabase/supabase-js';

let client = null;

// Returns null when Supabase env vars aren't set, so callers can fall back
// to mock content instead of the site breaking with no backend configured.
export function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !key) return null;
  if (!client) client = createClient(url, key);
  return client;
}
