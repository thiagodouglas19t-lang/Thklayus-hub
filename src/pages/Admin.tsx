import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type Thread = {
  id: string;
  user_id: string;
  type: "ticket" | "purchase" | "order";
  title: string;
  status: string;
  course_title?: string | null;
  total_price?: string | null;
  price?: string | null;
  comprovante_url?: string | null;
  created_at?: string;
};

const tabs = ["todos", "compras", "pedidos", "tickets", "pendentes", "aprovados"];

export default function Admin() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("todos");
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    setLoading(true);
    setErro("");
    const { data, error } = await supabase.from("chat_threads").select("*").order("created_at", { ascending: false });

    if (error) {
      setErro(error.message);
      setLoading(false);
      return;
    }

    setThreads((data ?? []) as Thread[]);
    setLoading(false);
  }

  async function atualizarStatus(id: string, status: string) {
    const ok = status === "compra aprovada" ? confirm("Confirma que o Pix caiu na conta? Só aprove depois de conferir no banco.") : true;
    if (!ok) return;

    const { error } = await supabase.from("chat_threads").update({ status }).eq("id", id);
    if (error) {
      alert("Erro ao atualizar: " + error.message);
      return;
    }

    setThreads((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));

    await supabase.from("chat_messages").insert({
      thread_id: id,
      user_id: "00000000-0000-0000-0000-000000000000",
      content: status === "compra aprovada" ? "✅ Compra aprovada. Acesso liberado." : `Status atualizado para: ${status}`,
    });
  }

  const filtrados = useMemo(() => {
    return threads.filter((item) => {
      if (tab === "compras") return item.type === "purchase";
      if (tab === "pedidos") return item.type === "order";
      if (tab === "tickets") return item.type === "ticket";
      if (tab === "pendentes") return ["em análise", "aberto", "pendente"].includes(item.status);
      if (tab === "aprovados") return item.status === "compra aprovada";
      return true;
    });
  }, [threads, tab]);

  const metricas = {
    compras: threads.filter((item) => item.type === "purchase").length,
    pedidos: threads.filter((item) => item.type === "order").length,
    tickets: threads.filter((item) => item.type === "ticket").length,
    pendentes: threads.filter((item) => ["em análise", "aberto", "pendente"].includes(item.status)).length,
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-zinc-800 bg-gradient-to-br from-zinc-950 to-black p-6">
        <span className="rounded-full border border-zinc-800 px-4 py-2 text-xs font-black uppercase text-zinc-500">Painel real</span>
        <h2 className="mt-5 text-4xl font-black">Painel ADM</h2>
        <p className="mt-2 text-zinc-400">Controle compras, pedidos e tickets reais vindos do Supabase.</p>
        <button onClick={carregar} className="mt-4 rounded-2xl bg-white px-5 py-3 font-black text-black">Atualizar painel</button>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5"><p className="text-3xl font-black">{metricas.compras}</p><p className="text-sm text-zinc-500">Compras</p></div>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5"><p className="text-3xl font-black">{metricas.pedidos}</p><p className="text-sm text-zinc-500">Pedidos</p></div>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5"><p className="text-3xl font-black">{metricas.tickets}</p><p className="text-sm text-zinc-500">Tickets</p></div>
        <div className="rounded-3xl border border-amber-900 bg-amber-950/20 p-5"><p className="text-3xl font-black">{metricas.pendentes}</p><p className="text-sm text-amber-100">Pendentes</p></div>
      </section>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((item) => (
          <button key={item} onClick={() => setTab(item)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-black ${tab === item ? "bg-white text-black" : "border border-zinc-800 bg-zinc-950 text-zinc-400"}`}>{item}</button>
        ))}
      </div>

      {erro && <div className="rounded-3xl border border-red-900 bg-red-950/30 p-5 text-red-100">Erro: {erro}</div>}
      {loading && <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-500">Carregando dados reais...</div>}

      <section className="grid gap-4">
        {!loading && filtrados.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-500">Nada encontrado nessa categoria.</div>
        ) : (
          filtrados.map((item) => (
            <div key={item.id} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase text-zinc-500">{item.type}</p>
                  <h3 className="mt-1 text-xl font-black">{item.title}</h3>
                  {item.course_title && <p className="mt-1 text-sm text-zinc-400">Curso: {item.course_title}</p>}
                  {(item.total_price || item.price) && <p className="mt-1 text-sm text-zinc-400">Valor: {item.total_price || item.price}</p>}
                  <p className="mt-2 inline-flex rounded-full border border-zinc-700 px-3 py-1 text-xs font-black text-zinc-300">{item.status}</p>
                  {item.comprovante_url && <a href={item.comprovante_url} target="_blank" rel="noreferrer" className="mt-3 block text-sm font-black underline">Abrir comprovante</a>}
                </div>

                <div className="grid min-w-48 gap-2">
                  {item.type === "purchase" && <button onClick={() => atualizarStatus(item.id, "compra aprovada")} className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-black text-black">Aprovar compra</button>}
                  {item.type === "purchase" && <button onClick={() => atualizarStatus(item.id, "compra recusada")} className="rounded-xl border border-red-900 bg-red-950 px-4 py-2 text-sm font-black text-red-200">Recusar compra</button>}
                  {item.type === "order" && <button onClick={() => atualizarStatus(item.id, "em produção")} className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-black">Em produção</button>}
                  {item.type === "order" && <button onClick={() => atualizarStatus(item.id, "entregue")} className="rounded-xl bg-white px-4 py-2 text-sm font-black text-black">Entregue</button>}
                  {item.type === "ticket" && <button onClick={() => atualizarStatus(item.id, "fechado")} className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-black">Fechar ticket</button>}
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
