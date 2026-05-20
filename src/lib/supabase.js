import { createClient } from '@supabase/supabase-js'

const supabaseUrl = String(import.meta.env.VITE_SUPABASE_URL || '').trim()
const supabaseAnonKey = String(import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim()

export const supabaseReady = supabaseUrl.startsWith('https://') && supabaseAnonKey.length > 20

const safeAuth = {
  async getUser() {
    return { data: { user: null }, error: null }
  },
}

function safeQuery() {
  const chain = {
    select: () => chain,
    update: () => chain,
    insert: () => chain,
    upsert: async () => ({ data: null, error: null }),
    eq: () => chain,
    maybeSingle: async () => ({ data: null, error: null }),
    single: async () => ({ data: null, error: null }),
  }
  return chain
}

export const supabase = supabaseReady
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : {
      auth: safeAuth,
      from: () => safeQuery(),
    }
