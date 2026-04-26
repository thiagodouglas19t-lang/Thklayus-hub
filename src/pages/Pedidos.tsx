import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Pedido = {
  id: string;
  title: string;
  status: string;
  created_at?: string;
};

const servicos = [
  "Slide escolar simples",
  "Trabalho escolar completo",
  "Arte simples",
  "Resumo escolar",
  "Apresentação premium",
  "Mapa mental",
  "Cartaz escolar",
  "Correção e organização de trabalho",
];

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [nome, setNome] = useState("");
  const [servico, setServico] = useState(servicos[0]);
  const [detalhes, setDetalhes] = useState("");
  const [prazo, setPrazo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarPedidos();
  }, []);

  async function carregarPedidos() {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    const { data } = await supabase
      .from("chat_threads")
      .select("id,title,status,created_at")
      .eq("user_id", userData.user.id)
      .eq("type", "order")
      .order("created_at", { ascending: false });

    setPedidos((data ?? []) as Pedido[]);
  }

  async function criarPedido() {
    if (!nome.trim() || !detalhes.trim()) {
      alert("Preencha seu nome e os detalhes do pedido.");
      return;
    }

    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      alert("Entre na sua conta para criar um pedido.");
      setLoading(false);
      return;
    }

    const { data: thread, error } = await supabase
      .from("chat_threads")
      .insert({
        user_id: userData.user.id,
        type: "order",
        title: `Pedido: ${servico}`,
        status: "pendente",
      })
      .select()
      .single();

    if (error) {
      alert("Erro ao criar pedido: " + error.message);
      setLoading(false);
      return;
    }

    await supabase.from("chat_messages").insert({
      thread_id: thread.id,
      user_id: userData.user.id,
      content: `📦 Novo pedido\n\nCliente: ${nome.trim()}\nServiço: ${servico}\nPrazo desejado: ${prazo.trim() || "não informado"}\n\nDetalhes:\n${detalhes.trim()}\n\nO ADM/DEV vai responder por este chat.`,
    });

    setNome("");
    setServico(servicos[0]);
    setDetalhes("");
    setPrazo("");
    setLoading(false);
    await carregarPedidos();
    alert("Pedido criado! Acompanhe pelo Chat.");
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="rounded-[2rem] border border-zinc-800 bg-gradient-to-br from-zinc-950 to-black p-6">
        <span className="rounded-full border border-zinc-800 px-4 py-2 text-xs font-black uppercase text-zinc-500">Serviços pagos</span>
        <h2 className="mt-5 text-3xl font-black">Criar pedido</h2>
        <p className="mt-2 text-sm text-zinc-400">Peça slides, artes, resumos e trabalhos. O pedido vira chat automático.</p>

        <div className="mt-5 space-y-3">
          <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none" />
          <select value={servico} onChange={(e) => setServico(e.target.value)} className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none">
            {servicos.map((item) => <option key={item}>{item}</option>)}
          </select>
          <input value={prazo} onChange={(e) => setPrazo(e.target.value)} placeholder="Prazo desejado: ex. até sexta" className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none" />
          <textarea value={detalhes} onChange={(e) => setDetalhes(e.target.value)} placeholder="Explique o que você precisa..." className="min-h-32 w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none" />
          <button onClick={criarPedido} disabled={loading} className="w-full rounded-2xl bg-white py-3 font-black text-black disabled:opacity-60">{loading ? "Criando..." : "Enviar pedido e abrir chat"}</button>
        </div>
      </section>

      <section className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-3xl font-black">Meus pedidos</h2>
          <button onClick={carregarPedidos} className="rounded-xl border border-zinc-800 px-3 py-2 text-xs font-black text-zinc-400">Atualizar</button>
        </div>

        <div className="mt-5 space-y-3">
          {pedidos.length === 0 ? (
            <p className="text-zinc-500">Nenhum pedido criado.</p>
          ) : (
            pedidos.map((pedido) => (
              <div key={pedido.id} className="rounded-2xl border border-zinc-800 bg-black p-4">
                <p className="font-black">{pedido.title}</p>
                <p className="mt-2 inline-flex rounded-full border border-zinc-700 px-3 py-1 text-xs font-black uppercase text-zinc-400">{pedido.status}</p>
                <p className="mt-3 text-xs text-zinc-500">Acompanhe e envie arquivos pela aba Chat.</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
