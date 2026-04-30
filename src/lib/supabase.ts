import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = String(import.meta.env.VITE_SUPABASE_URL ?? "").trim();
export const supabaseAnonKey = String(import.meta.env.VITE_SUPABASE_ANON_KEY ?? "").trim();

export const supabaseConfigOk = Boolean(
  supabaseUrl.startsWith("https://") &&
    supabaseUrl.includes(".supabase.co") &&
    supabaseAnonKey.length > 20,
);

export const supabaseConfigMessage = supabaseConfigOk
  ? "Supabase configurado."
  : "Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY nas variáveis de ambiente da Vercel.";

export const supabase = createClient(
  supabaseConfigOk ? supabaseUrl : "https://missing-project.supabase.co",
  supabaseConfigOk ? supabaseAnonKey : "missing-anon-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    global: {
      headers: {
        "x-application-name": "aprendaja-web",
      },
    },
  },
);

export function requireSupabaseConfig() {
  if (!supabaseConfigOk) {
    throw new Error(supabaseConfigMessage);
  }
}
