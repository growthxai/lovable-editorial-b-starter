import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client — STUB-tolerant.
 *
 * In a generated app Lovable injects the real `VITE_SUPABASE_URL` /
 * `VITE_SUPABASE_PUBLISHABLE_KEY` and (re)generates this file. It's committed here so
 * the base starter + forks type-check and RUN without a provisioned backend: the
 * placeholders keep `createClient` from throwing "supabaseUrl is required" when env is
 * absent; auth calls simply fail gracefully until real values are present.
 */
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ?? "https://placeholder.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "public-anon-key-placeholder";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
