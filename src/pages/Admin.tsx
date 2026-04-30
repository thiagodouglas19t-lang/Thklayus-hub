import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { formatBrasiliaDateTime } from "../lib/date";

type Thread = { id: string; user_id: string; type: "ticket" | "purchase" | "order"; title: string; status: string; course_id?: string | null; course_title?: string | null; total_price?: string | null; price?: string | null; comprovante_url?: string | null; created_at?: string };
const tabs = ["todos", "compras", "pedidos", "tickets", "pendentes", "finalizados", "ocultos"];
const finalizados = ["compra finalizada", "pedido finalizado", "fechado", "entregue", "compra recusada", "resolvido", "encerrado"];
const aprovados = ["compra aprovada", "compra finalizada"];
function normalize(value?: string | null) { return String(value ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim(); }
function parseMoney(value?: string | null) { if (!value) return 0; const clean = String(value).replace(/[^0-9,.-]/g, "").replace(".", "").replace(",", "."); const parsed = Number(clean); return Number.isFinite(parsed) ? parsed : 0; }
function money(value: number) { return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value); }
function formatDate(value?: string) { return formatBrasiliaDateTime(value); }
function shortId(value?: string) { if (!value) return "-"; return value.length > 12 ? `${value.slice(0, 8)}...${value.slice(-6)}` : value; }
function statusStyle(status: string) { const value = normalize(status); if (value === "oculto") return "border-zinc-500/30 bg-zinc-500/10 text-zinc-400"; if (["compra aprovada", "compra finalizada", "pedido finalizado", "entregue"].includes(value)) return "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"; if (["compra recusada", "recusado"].includes(value)) return "border-red-400/30 bg-red-500/10 text-red-200"; if (["em analise", "pendente", "aberto", "em producao"].includes(value)) return "border-amber-400/30 bg-amber-500/10 text-amber-200"; return "border-zinc-500/30 bg-zinc-500/10 text-zinc-300"; }
function typeLabel(type: Thread["type"]) { if (type === "purchase") return "Compra"; if (type === "order") return "Pedido"; return "Ticket"; }

export default function Admin() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("pendentes");
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    setLoading(true);
    setErro("");
    const { data, error } = await supabase.from("chat_threads").select("*").order("created_at", { ascending: false });
    if (error) { setErro(error.message); setLoading(false); return; }
    setThreads((data ?? []) as Thread[]);
    setLoading(false);
  }

  async function copiar(texto: string) { try { await navigator.clipboard.writeText(texto); alert("Copiado!"); } catch { alert("Não foi possível copiar nesse navegador."); } }

  async function atualizarStatus(id: string, status: string) {
    if (updatingId === id) return;
    setUpdatingId(id);
    const { error } = await supabase.from("chat_threads").update({ status }).eq("id", id);
    if (error) { alert("Erro: " + error.message); setUpdatingId(null); return; }
    setThreads((current) => current.map((item) => item.id === id ? { ...item, status } : item));
    setUpdatingId(null);
  }

  async function ocultarItem(item: Thread) {
    if (updatingId === item.id) return;
    const ok = confirm(`Ocultar ${typeLabel(item.type).toLowerCase()}?`);
    if (!ok) return;
    await atualizarStatus(item.id, "oculto");
  }

  const filtrados = useMemo(() => {
    const termo = normalize(busca);
    return threads.filter((item) => {
      const status = normalize(item.status);
      if (tab !== "ocultos" && status === "oculto") return false;
      if (tab === "ocultos" && status !== "oculto") return false;
      if (tab === "compras" && item.type !== "purchase") return false;
      if (tab === "pedidos" && item.type !== "order") return false;
      if (tab === "tickets" && item.type !== "ticket") return false;
      if (tab === "pendentes" && !["em analise", "pendente", "aberto", "em producao"].includes(status)) return false;
      if (tab === "finalizados" && !finalizados.includes(status)) return false;
      if (!termo) return true;
      return normalize(`${item.title} ${item.status} ${item.course_title ?? ""} ${item.course_id ?? ""} ${item.id} ${item.user_id}`).includes(termo);
    });
  }, [threads, tab, busca]);

  const receitaAprovada = threads.filter((item) => normalize(item.status) !== "oculto" && aprovados.includes(normalize(item.status))).reduce((sum, item) => sum + parseMoney(item.total_price || item.price), 0);
  const receitaPendente = threads.filter((item) => normalize(item.status) !== "oculto" && item.type === "purchase" && ["em analise", "pendente"].includes(normalize(item.status))).reduce((sum, item) => sum + parseMoney(item.total_price || item.price), 0);
  const pendentes = threads.filter((i) => normalize(i.status) !== "oculto" && ["em analise", "pendente", "aberto", "em producao"].includes(normalize(i.status))).length;
  const pedidos = threads.filter((i) => normalize(i.status) !== "oculto" && i.type === "order").length;

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[3rem] border border-violet-300/15 bg-[#030006] p-6 shadow-2xl shadow-violet-950/25 md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(168,85,247,0.3),transparent_34%),radial-gradient(circle_at_90%_20%,rgba(255,255,255,0.08),transparent_30%)]" />
        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-violet-100">Dono • privado</span>
            <h1 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.08em] text-white md:text-7xl">Controle do app.</h1>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-zinc-400">Veja pedidos, compras, valores e atendimentos. Sem auditoria de curso, sem poluição visual.</p>
          </div>
          <button onClick={carregar} className="rounded-2xl bg-white px-5 py-3 font-black text-black active:scale-95">Atualizar</button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-5"><p className="text-sm text-emerald-100/70">Receita confirmada</p><p className="mt-1 text-3xl font-black text-emerald-100">{money(receitaAprovada)}</p></div>
        <div className="rounded-3xl border border-amber-400/20 bg-amber-500/10 p-5"><p className="text-sm text-amber-100/70">Aguardando</p><p className="mt-1 text-3xl font-black text-amber-100">{money(receitaPendente)}</p></div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5"><p className="text-sm text-zinc-500">Pendentes</p><p className="mt-1 text-3xl font-black text-white">{pendentes}</p></div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5"><p className="text-sm text-zinc-500">Pedidos</p><p className="mt-1 text-3xl font-black text-white">{pedidos}</p></div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-2xl font-black">Fila de atendimento</h2><p className="mt-1 text-sm text-zinc-500">Pedidos, tickets e compras registrados no app.</p></div><span className="rounded-full border border-white/10 bg-black/35 px-4 py-2 text-xs font-black text-zinc-400">{filtrados.length} itens</span></div>
        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_auto]"><input value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Buscar por pedido, usuário, compra ou status..." className="min-h-12 rounded-2xl border border-white/10 bg-black/45 px-4 text-sm font-bold text-white outline-none" /><div className="flex gap-2 overflow-x-auto pb-1">{tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-black ${tab === item ? "bg-white text-black" : "border border-white/10 text-zinc-400 hover:bg-white/[0.05]"}`}>{item}</button>)}</div></div>
      </section>

      {erro && <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-5 text-red-100">Erro: {erro}</div>}
      {loading && <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-zinc-400">Carregando...</div>}

      <section className="grid gap-4">
        {!loading && filtrados.length === 0 ? <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center text-zinc-500">Nada encontrado.</div> : filtrados.map((item) => (
          <div key={item.id} className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.045] to-white/[0.015] p-5 shadow-xl shadow-black/25">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2"><span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">{typeLabel(item.type)}</span><span className="text-xs font-bold text-zinc-500">{formatDate(item.created_at)} BRT</span></div>
                <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] text-white">{item.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2 text-xs"><button onClick={() => copiar(item.user_id)} className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 font-bold text-blue-200">Usuário: {shortId(item.user_id)}</button><button onClick={() => copiar(item.id)} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-bold text-zinc-400">ID: {shortId(item.id)}</button></div>
                {item.course_title && <p className="mt-3 text-sm text-zinc-400">Item: <span className="font-bold text-zinc-200">{item.course_title}</span></p>}
                {(item.total_price || item.price) && <p className="mt-2 text-sm text-zinc-400">Valor: <span className="font-black text-white">{item.total_price || item.price}</span></p>}
                {item.comprovante_url && <a href={item.comprovante_url} target="_blank" rel="noreferrer" className="mt-3 inline-flex rounded-xl border border-violet-300/20 bg-violet-500/10 px-3 py-2 text-xs font-black text-violet-100">Ver comprovante</a>}
              </div>
              <div className="flex min-w-[180px] flex-col gap-2">
                <p className={`inline-flex justify-center rounded-full border px-3 py-2 text-xs font-black ${statusStyle(item.status)}`}>{item.status}</p>
                {item.type === "purchase" && <button disabled={updatingId === item.id || aprovados.includes(normalize(item.status))} onClick={() => atualizarStatus(item.id, "compra aprovada")} className="rounded-xl bg-white px-4 py-3 text-sm font-black text-black disabled:opacity-50">Aprovar compra</button>}
                {item.type === "purchase" && <button disabled={updatingId === item.id || aprovados.includes(normalize(item.status))} onClick={() => atualizarStatus(item.id, "compra recusada")} className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-black text-red-200 disabled:opacity-50">Recusar</button>}
                {item.type === "order" && <button disabled={updatingId === item.id || ["pedido finalizado", "oculto"].includes(normalize(item.status))} onClick={() => atualizarStatus(item.id, "pedido finalizado")} className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-black text-emerald-200 disabled:opacity-50">Finalizar pedido</button>}
                {item.type === "ticket" && <button disabled={updatingId === item.id || ["fechado", "oculto"].includes(normalize(item.status))} onClick={() => atualizarStatus(item.id, "fechado")} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-black text-zinc-200 disabled:opacity-50">Fechar ticket</button>}
                {normalize(item.status) === "oculto" ? <button onClick={() => atualizarStatus(item.id, item.type === "purchase" ? "compra finalizada" : item.type === "order" ? "pedido finalizado" : "fechado")} className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-black text-emerald-200">Restaurar</button> : <button onClick={() => ocultarItem(item)} disabled={updatingId === item.id} className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-black text-red-200 disabled:opacity-50">Ocultar</button>}
                <button onClick={() => copiar(`${typeLabel(item.type)}: ${item.title}\nStatus: ${item.status}\nID: ${item.id}\nUsuário: ${item.user_id}\nItem: ${item.course_title ?? "-"}`)} className="rounded-xl border border-white/10 bg-black/35 px-4 py-2 text-sm font-black text-zinc-300">Copiar resumo</button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
