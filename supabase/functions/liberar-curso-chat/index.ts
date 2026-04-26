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
      return new Response(JSON.stringify({ error: "Sem permissão de ADM." }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { thread_id } = await req.json();
    if (!thread_id) throw new Error("thread_id é obrigatório.");

    const { data: thread, error: threadError } = await supabase
      .from("chat_threads")
      .select("id, user_id, type, course_id, title")
      .eq("id", thread_id)
      .single();

    if (threadError || !thread) throw new Error("Compra não encontrada no chat.");
    if (thread.type !== "purchase") throw new Error("Esse chat não é uma compra.");
    if (!thread.user_id) throw new Error("Compra sem usuário.");
    if (!thread.course_id) throw new Error("Compra sem curso vinculado.");

    const { error: acessoError } = await supabase
      .from("acessos_cursos")
      .insert({ user_id: thread.user_id, produto_id: thread.course_id })
      .select("id")
      .single();

    if (acessoError && !String(acessoError.message).toLowerCase().includes("duplicate")) {
      throw acessoError;
    }

    await supabase
      .from("chat_threads")
      .update({ status: "compra aprovada" })
      .eq("id", thread.id);

    await supabase.from("chat_messages").insert({
      thread_id: thread.id,
      user_id: userData.user.id,
      content: "✅ Pagamento aprovado pelo ADM. Curso liberado na Área de Estudo.",
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
