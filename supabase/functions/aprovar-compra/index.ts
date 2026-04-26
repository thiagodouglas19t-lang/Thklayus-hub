import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const adminEmails = (Deno.env.get("ADMIN_EMAILS") ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) throw new Error("Servidor não configurado.");

    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace("Bearer ", "");

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { data: userData, error: userError } = await supabase.auth.getUser(token);

    if (userError || !userData.user?.email) {
      return new Response(JSON.stringify({ error: "Faça login." }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const email = userData.user.email.toLowerCase();
    if (!adminEmails.includes(email)) {
      return new Response(JSON.stringify({ error: "Você não tem permissão para aprovar compras." }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { compra_id } = await req.json();
    if (!compra_id) throw new Error("compra_id é obrigatório.");

    const { data, error } = await supabase
      .from("compras")
      .update({ status: "aprovado", approved_at: new Date().toISOString() })
      .eq("id", compra_id)
      .select("id, status, produto_id, user_id")
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ compra: data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
