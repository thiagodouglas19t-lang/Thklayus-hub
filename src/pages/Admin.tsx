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

const tabs = ["todos", "compras", "pedidos", "tickets", "pendentes", "finalizados"];
const finalizados = ["compra finalizada", "pedido finalizado", "fechado", "entregue", "compra recusada"];
const CLOSED_STATUSES = ["fechado", "closed", "encerrado", "resolvido", "deleted", "oculto"];

function isClosedStatus(status: string) {
  return CLOSED_STATUSES.includes(String(status).toLowerCase().trim());
}

function statusStyle(status: string) {
  const value = String(status).toLowerCase().trim();
  if (["fechado", "closed", "encerrado", "resolvido"].includes(value)) return "border-zinc-500/30 bg-zinc-500/10 text-zinc-300";
  if (["compra aprovada", "pedido finalizado", "compra finalizada", "entregue"].includes(value)) return "border-emerald-400/30 bg-emerald-500/10 text-emerald-200";
  if (["compra recusada", "recusado"].includes(value)) return "border-red-400/30 bg-red-500/10 text-red-200";
  if (["em análise", "pendente"].includes(value)) return "border-amber-400/30 bg-amber-500/10 text-amber-200";
  if (["em produção"].includes(value)) return "border-violet-400/30 bg-violet-500/10 text-violet-200";
  return "border-blue-400/30 bg-blue-500/10 text-blue-200";
}

function formatDate(value?: string) {
  if (!value) return "Sem data";
  try {
    return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
  } catch {
    return "Sem data";
  }
}

export default function Admin() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("todos");
  const [erro, setErro] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

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
    const threadAtual = threads.find((item) => item.id === id);
    if (!threadAtual) return;

    if (threadAtual.status === status) {
      alert("Esse item já está com esse status.");
      return;
    }

    if (threadAtual.type === "ticket" && isClosedStatus(threadAtual.status)) {
      alert("Esse ticket já foi fechado.");
      return;
    }

    if (updatingId === id) return;

    const ok = status === "compra aprovada" ? confirm("Confirma que o Pix caiu na conta? Só aprove depois de conferir no banco.") : true;
    if (!ok) return;

    setUpdatingId(id);

    const { error } = await supabase.from("chat_threads").update({ status }).eq("id", id);
    if (error) {
      setUpdatingId(null);
      alert("Erro ao atualizar: " + error.message);
      return;
    }

    setThreads((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));

    const mensagens: Record<string, string> = {
      "compra aprovada": "✅ Compra aprovada. Acesso liberado na Área de Estudo.",
      "compra finalizada": "✅ Compra finalizada pelo ADM. Obrigado por comprar no THKLAYUS.",
      "compra recusada": "❌ Compra recusada. O pagamento não foi confirmado.",
      "em produção": "🛠️ Pedido em produção. O ADM/DEV começou a trabalhar nele.",
      "pedido finalizado": "✅ Pedido finalizado pelo ADM. Confira a entrega no chat.",
      fechado: "✅ Ticket fechado pelo suporte. Se precisar de mais ajuda, abra um novo ticket.",
    };

    await supabase.from("chat_messages").insert({
      thread_id: id,
      user_id: "00000000-0000-0000-0000-000000000000",
      content: mensagens[status] || `Status atualizado para: ${status}`,
    });

    setUpdatingId(null);
  }

  const filtrados = useMemo(() => {
    return threads.filter((item) => {
      if (tab === "compras") return item.type === "purchase";
      if (tab === "pedidos") return item.type === "order";
      if (tab === "tickets") return item.type === "ticket";
      if (tab === "pendentes") return ["em análise", "aberto", "pendente", "em produção"].includes(item.status);
      if (tab === "finalizados") return finalizados.includes(item.status);
      return true;
    });
  }, [threads, tab]);

  const metricas = [
    { label: "Compras", value: threads.filter((item) => item.type === "purchase").length, icon: "◈", tone: "from-blue-500/20 to-sky-500/5" },
    { label: "Pedidos", value: threads.filter((item) => item.type === "order").length, icon: "✦", tone: "from-violet-500/20 to-fuchsia-500/5" },
    { label: "Tickets", value: threads.filter((item) => item.type === "ticket").length, icon: "◇", tone: "from-cyan-500/20 to-blue-500/5" },
    { label: "Pendentes", value: threads.filter((item) => ["em análise", "aberto", "pendente", "em produção"].includes(item.status)).length, icon: "!", tone: "from-amber-500/20 to-orange-500/5" },
    { label: "Finalizados", value: threads.filter((item) => finalizados.includes(item.status)).length, icon: "✓", tone: "from-emerald-500/20 to-green-500/5" },
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.24),transparent_34%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_34%)]" />
        <div className="relative flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-blue-200">Central ADM</span>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-6xl">Painel de controle</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">Controle compras, pedidos, tickets, comprovantes e encerramentos reais vindos do Supabase.</p>
          </div>
          <button onClick={carregar} className="rounded-2xl bg-white px-5 py-3 font-black text-black shadow-lg shadow-blue-500/20 transition hover:scale-[1.03] active:scale-95">Atualizar painel</button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {metricas.map((item) => (
          <div key={item.label} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.tone}`} />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p className="text-4xl font-black tracking-[-0.04em]">{item.value}</p>
                <p className="mt-1 text-sm font-bold text-zinc-400">{item.label}</p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-black/35 text-lg font-black text-blue-200">{item.icon}</span>
            </div>
          </div>
        ))}
      </section>

      <div className="flex gap-2 overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.025] p-1.5 backdrop-blur-xl">
        {tabs.map((item) => (
          <button key={item} onClick={() => setTab(item)} className={`whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-black transition active:scale-95 ${tab === item ? "bg-white text-black shadow-lg shadow-blue-500/20" : "text-zinc-400 hover:bg-white/[0.05] hover:text-white"}`}>{item}</button>
        ))}
      </div>

      {erro && <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-5 text-red-100">Erro: {erro}</div>}
      {loading && <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-zinc-400">Carregando dados reais...</div>}

      <section className="grid gap-4">
        {!loading && filtrados.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center text-zinc-500">
            <p className="text-4xl">◇</p>
            <p className="mt-3 text-lg font-black text-zinc-300">Nada encontrado nessa categoria.</p>
            <p className="mt-1 text-sm">Quando aparecer algo novo, ele entra nessa lista automaticamente.</p>
          </div>
        ) : (
          filtrados.map((item) => {
            const isUpdating = updatingId === item.id;
            const isClosedTicket = item.type === "ticket" && isClosedStatus(item.status);
            const typeLabel = item.type === "purchase" ? "Compra" : item.type === "order" ? "Pedido" : "Ticket";
            const typeIcon = item.type === "purchase" ? "◈" : item.type === "order" ? "✦" : "◇";

            return (
              <div key={item.id} className="group rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-xl shadow-black/25 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-blue-400/30">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex min-w-0 gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-black/35 text-xl font-black text-blue-200">{typeIcon}</div>
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">{typeLabel} • {formatDate(item.created_at)}</p>
                      <h3 className="mt-1 truncate text-xl font-black tracking-[-0.02em]">{item.title}</h3>
                      {item.course_title && <p className="mt-1 text-sm text-zinc-400">Curso: {item.course_title}</p>}
                      {(item.total_price || item.price) && <p className="mt-1 text-sm text-zinc-400">Valor: {item.total_price || item.price}</p>}
                      <p className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-black ${statusStyle(item.status)}`}>{item.status}</p>
                      {item.comprovante_url && <a href={item.comprovante_url} target="_blank" rel="noreferrer" className="mt-3 block text-sm font-black text-blue-200 underline">Abrir comprovante</a>}
                    </div>
                  </div>

                  <div className="grid min-w-52 gap-2">
                    {item.type === "purchase" && <button disabled={isUpdating || item.status === "compra aprovada"} onClick={() => atualizarStatus(item.id, "compra aprovada")} className="rounded-xl bg-white px-4 py-2 text-sm font-black text-black shadow-lg shadow-blue-500/10 transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">Aprovar compra</button>}
                    {item.type === "purchase" && <button disabled={isUpdating || item.status === "compra finalizada"} onClick={() => atualizarStatus(item.id, "compra finalizada")} className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-black text-emerald-200 transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">Fechar compra</button>}
                    {item.type === "purchase" && <button disabled={isUpdating || item.status === "compra recusada"} onClick={() => atualizarStatus(item.id, "compra recusada")} className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-black text-red-200 transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">Recusar compra</button>}
                    {item.type === "order" && <button disabled={isUpdating || item.status === "em produção"} onClick={() => atualizarStatus(item.id, "em produção")} className="rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-black text-violet-200 transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">Em produção</button>}
                    {item.type === "order" && <button disabled={isUpdating || item.status === "pedido finalizado"} onClick={() => atualizarStatus(item.id, "pedido finalizado")} className="rounded-xl bg-white px-4 py-2 text-sm font-black text-black transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">Finalizar pedido</button>}
                    {item.type === "ticket" && <button disabled={isUpdating || isClosedTicket} onClick={() => atualizarStatus(item.id, "fechado")} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-black text-zinc-200 transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">{isClosedTicket ? "Ticket fechado" : isUpdating ? "Fechando..." : "Fechar ticket"}</button>}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}
