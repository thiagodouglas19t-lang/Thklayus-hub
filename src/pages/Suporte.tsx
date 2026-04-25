import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Suporte() {
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  async function criarTicket() {
    if (!titulo.trim() || !mensagem.trim()) {
      alert("Preencha o título e a mensagem do ticket.");
      return;
    }

    setLoading(true);

    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      alert("Entre na sua conta para abrir um ticket.");
      setLoading(false);
      return;
    }

    const { data: thread, error: threadError } = await supabase
      .from("chat_threads")
      .insert({
        user_id: data.user.id,
        type: "ticket",
        title: titulo.trim(),
        status: "aberto",
      })
      .select()
      .single();

    if (threadError) {
      alert("Erro ao criar ticket: " + threadError.message);
      setLoading(false);
      return;
    }

    const { error: messageError } = await supabase.from("chat_messages").insert({
      thread_id: thread.id,
      user_id: data.user.id,
      content: `Ticket aberto\n\nAssunto: ${titulo.trim()}\n\nMensagem:\n${mensagem.trim()}`,
    });

    if (messageError) {
      alert("Ticket criado, mas deu erro ao salvar a mensagem: " + messageError.message);
      setLoading(false);
      return;
    }

    setTitulo("");
    setMensagem("");
    setLoading(false);
    alert("Ticket criado! Vá para a aba Chat para acompanhar.");
  }

  return (
    <div className="space-y-6">
      <section className="glass-card rounded-[2rem] p-6 md:p-8">
        <span className="rounded-full border border-zinc-800 px-4 py-2 text-xs font-black uppercase text-zinc-500">
          Suporte interno
        </span>
        <h2 className="mt-5 text-4xl font-black">Abrir ticket</h2>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Abra um ticket para dúvidas, problemas com compras, acesso aos cursos ou suporte geral. O atendimento acontece dentro da aba Chat.
        </p>
      </section>

      <section className="pro-card rounded-3xl p-6">
        <div className="grid gap-4">
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título do ticket"
            className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none"
          />

          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Explique sua dúvida ou problema..."
            className="min-h-40 w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none"
          />

          <button
            onClick={criarTicket}
            disabled={loading}
            className="pro-button rounded-2xl py-3 font-black disabled:opacity-60"
          >
            {loading ? "Criando ticket..." : "Criar ticket no chat"}
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <h3 className="text-2xl font-black">Como funciona</h3>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            ["1", "Você abre o ticket"],
            ["2", "O chat é criado automaticamente"],
            ["3", "ADM/DEV responde e fecha quando resolver"],
          ].map(([num, text]) => (
            <div key={num} className="rounded-2xl border border-zinc-800 bg-black p-4">
              <p className="text-3xl font-black">{num}</p>
              <p className="mt-2 text-sm text-zinc-400">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
