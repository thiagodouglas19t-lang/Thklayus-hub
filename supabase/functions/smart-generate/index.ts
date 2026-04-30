const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type RequestBody = {
  prompt?: string;
  tone?: "simples" | "formal" | "whatsapp";
  mode?: "mensagem" | "checklist" | "estrutura" | "ideia" | "auto";
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("GROQ_API_KEY");

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GROQ_API_KEY não configurada no Supabase." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = (await req.json()) as RequestBody;
    const prompt = String(body.prompt || "").trim();
    const tone = body.tone || "simples";
    const mode = body.mode || "auto";

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Digite algo para gerar." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const systemPrompt = `Você é o motor inteligente do app AprendaJá.
Seu trabalho é transformar o pedido do usuário em um texto pronto para copiar.
Responda em português do Brasil.
Seja direto, útil, natural e curto.
Não explique o que está fazendo.
Não use markdown pesado.
Não invente dados sensíveis.
Não faça conteúdo perigoso, sexual ou ilegal.
Modo solicitado: ${mode}.
Tom solicitado: ${tone}.
Formato ideal:
Título curto
Texto pronto
Se fizer sentido, uma versão alternativa curta.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.6,
        max_tokens: 420,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Erro ao gerar com IA.", detail: data }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const text = data?.choices?.[0]?.message?.content?.trim() || "Não consegui gerar agora. Tente novamente.";

    return new Response(
      JSON.stringify({ text }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro interno.", detail: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
