import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type Thread = {
  id: string;
  user_id: string;
  type: "ticket" | "purchase" | "order";
  title: string;
  status: string;
  course_id?: string | null;
  course_title?: string | null;
  total_price?: string | null;
  price?: string | null;
  comprovante_url?: string | null;
  created_at?: string;
};

const tabs = ["todos", "compras", "pedidos", "tickets", "críticos", "urgentes", "pendentes", "finalizados"];
const pendingStatuses = ["em análise", "aberto", "pendente", "em produção"];
const finalizados = ["compra finalizada", "pedido finalizado", "fechado", "entregue", "compra recusada", "resolvido", "encerrado"];
const CLOSED_STATUSES = ["fechado", "closed", "encerrado", "resolvido", "deleted", "oculto"];

function normalize(value?: string | null) {
  return String(value ?? "").toLowerCase().trim();
}

function isClosedStatus(status: string) {
  return CLOSED_STATUSES.includes(normalize(status));
}

function isPendingStatus(status: string) {
  return pendingStatuses.includes(normalize(status));
}

function isFinishedStatus(status: string) {
  return finalizados.includes(normalize(status));
}

function parseMoney(value?: string | null) {
  if (!value) return 0;
  const clean = String(value).replace(/[^0-9,.-]/g, "").replace(".", "").replace(",", ".");
  const parsed = Number(clean);
  return Number.isFinite(parsed) ? parsed : 0;
}

function money(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function ageHours(value?: string) {
  if (!value) return 0;
  const created = new Date(value).getTime();
  if (Number.isNaN(created)) return 0;
  return Math.max(0, Math.floor((Date.now() - created) / 36e5));
}

function priorityScore(item: Thread) {
  let score = 0;
  const status = normalize(item.status);
  const hours = ageHours(item.created_at);
  if (item.type === "purchase" && status === "em análise") score += 55;
  if (item.type === "ticket" && status === "aberto") score += 35;
  if (item.type === "order" && ["pendente", "em produção"].includes(status)) score += 30;
  if (item.comprovante_url && status === "em análise") score += 15;
  if (hours >= 24) score += 20;
  if (hours >= 72) score += 25;
  if (isFinishedStatus(item.status)) score -= 100;
  return Math.max(0, score);
}

function priorityLabel(score: number) {
  if (score >= 80) return "Crítico";
  if (score >= 50) return "Alto";
  if (score >= 25) return "Médio";
  return "Normal";
}

function priorityStyle(score: number) {
  if (score >= 80) return "border-red-400/30 bg-red-500/10 text-red-200";
  if (score >= 50) return "border-amber-400/30 bg-amber-500/10 text-amber-100";
  if (score >= 25) return "border-blue-400/30 bg-blue-500/10 text-blue-200";
  return "border-zinc-500/30 bg-zinc-500/10 text-zinc-300";
}

function statusStyle(status: string) {
  const value = normalize(status);
  if (["fechado", "closed", "encerrado", "resolvido"].includes(value)) return "border-zinc-500/30 bg-zinc-500/10 text-zinc-300";
  if (["compra aprovada", "pedido finalizado", "compra finalizada", "entregue"].includes(value)) return "border-emerald-400/30 bg-emerald-500/10 text-emerald-200";
  if (["compra recusada", "recusado"].includes(value)) return "border-red-400/30 bg-red-500/10 text-red-200";
  if (["em análise", "pendente", "aberto"].includes(value)) return "border-amber-400/30 bg-amber-500/10 text-amber-200";
  if (["em produção"].includes(value)) return "border-violet-400/30 bg-violet-500/10 text-violet-200";
  return "border-blue-400/30 bg-blue-500/10 text-blue-200";
}

function typeLabel(type: Thread["type"]) {
  if (type === "purchase") return "Compra";
  if (type === "order") return "Pedido";
  return "Ticket";
}

function typeIcon(type: Thread["type"]) {
  if (type === "purchase") return "◈";
  if (type === "order") return "✦";
  return "◇";
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
  const [busca, setBusca] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [manualUserId, setManualUserId] = useState("");
  const [manualCourseId, setManualCourseId] = useState("");
  const [manualCourseTitle, setManualCourseTitle] = useState("");
  const [manualLoading, setManualLoading] = useState(false);

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

  async function copiar(texto: string) {
    try {
      await navigator.clipboard.writeText(texto);
      alert("Copiado!");
    } catch {
      alert("Não foi possível copiar nesse navegador.");
    }
  }

  async function liberarCursoManual() {
    const userId = manualUserId.trim();
    const courseId = manualCourseId.trim();
    const courseTitle = manualCourseTitle.trim() || courseId;

    if (!userId || !courseId) {
      alert("Preencha o ID do usuário e o ID do curso.");
      return;
    }

    const ok = confirm(`Liberar acesso manual?\n\nUsuário: ${userId}\nCurso: ${courseTitle}\nID do curso: ${courseId}`);
    if (!ok) return;

    setManualLoading(true);

    const { error } = await supabase.from("acessos_cursos").upsert(
      {
        user_id: userId,
        produto_id: courseId,
        course_title: courseTitle,
        liberado_em: new Date().toISOString(),
        origem: "manual_admin",
      },
      { onConflict: "user_id,produto_id" }
    );

    setManualLoading(false);

    if (error) {
      alert("Erro ao liberar curso: " + error.message);
      return;
    }

    setManualUserId("");
    setManualCourseId("");
    setManualCourseTitle("");
    alert("Curso liberado manualmente para esse usuário.");
  }

  async function registrarMensagem(id: string, status: string) {
    const mensagens: Record<string, string> = {
      "compra aprovada": "✅ Compra aprovada. Acesso liberado na Área de Estudo.",
      "compra finalizada": "✅ Compra finalizada pelo ADM. Obrigado por comprar no AprendaJá.",
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
  }

  async function aprovarCompraSegura(item: Thread) {
    if (item.type !== "purchase") return;
    if (updatingId === item.id) return;

    if (normalize(item.status) === "compra aprovada") {
      alert("Essa compra já está aprovada.");
      return;
    }

    const ok = confirm("ANTI-GOLPE: confirme somente se o Pix caiu na conta/banco. Isso vai liberar o curso para o cliente.");
    if (!ok) return;

    setUpdatingId(item.id);

    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      if (!token) throw new Error("Sessão expirada. Saia e entre novamente.");

      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/liberar-curso-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ thread_id: item.id }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Erro ao liberar curso.");

      setThreads((current) => current.map((thread) => (thread.id === item.id ? { ...thread, status: "compra aprovada" } : thread)));
      alert("Compra aprovada e curso liberado.");
      await carregar();
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setUpdatingId(null);
    }
  }

  async function atualizarStatus(id: string, status: string) {
    const threadAtual = threads.find((item) => item.id === id);
    if (!threadAtual) return;

    if (status === "compra aprovada" && threadAtual.type === "purchase") {
      await aprovarCompraSegura(threadAtual);
      return;
    }

    if (threadAtual.status === status) {
      alert("Esse item já está com esse status.");
      return;
    }

    if (threadAtual.type === "ticket" && isClosedStatus(threadAtual.status)) {
      alert("Esse ticket já foi fechado.");
      return;
    }

    if (updatingId === id) return;

    setUpdatingId(id);

    const { error } = await supabase.from("chat_threads").update({ status }).eq("id", id);
    if (error) {
      setUpdatingId(null);
      alert("Erro ao atualizar: " + error.message);
      return;
    }

    setThreads((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
    await registrarMensagem(id, status);
    setUpdatingId(null);
  }

  const enrichedThreads = useMemo(() => threads.map((item) => ({ ...item, priority: priorityScore(item), value: parseMoney(item.total_price || item.price) })), [threads]);

  const filtrados = useMemo(() => {
    const termo = normalize(busca);
    return enrichedThreads
      .filter((item) => {
        const matchTab = (() => {
          if (tab === "compras") return item.type === "purchase";
          if (tab === "pedidos") return item.type === "order";
          if (tab === "tickets") return item.type === "ticket";
          if (tab === "críticos") return item.priority >= 80;
          if (tab === "urgentes") return item.priority >= 50;
          if (tab === "pendentes") return isPendingStatus(item.status);
          if (tab === "finalizados") return isFinishedStatus(item.status);
          return true;
        })();

        if (!matchTab) return false;
        if (!termo) return true;
        const texto = `${item.title} ${item.status} ${item.type} ${item.course_title ?? ""} ${item.total_price ?? ""} ${item.price ?? ""} ${item.id} ${item.user_id}`.toLowerCase();
        return texto.includes(termo);
      })
      .sort((a, b) => b.priority - a.priority);
  }, [enrichedThreads, tab, busca]);

  const receitaAprovada = enrichedThreads.filter((item) => ["compra aprovada", "compra finalizada"].includes(normalize(item.status))).reduce((sum, item) => sum + item.value, 0);
  const receitaPendente = enrichedThreads.filter((item) => item.type === "purchase" && ["em análise", "pendente"].includes(normalize(item.status))).reduce((sum, item) => sum + item.value, 0);
  const criticos = enrichedThreads.filter((item) => item.priority >= 80).length;

  const metricas = [
    { label: "Receita confirmada", value: money(receitaAprovada), icon: "R$", tone: "from-emerald-500/20 to-green-500/5", small: true },
    { label: "Aguardando Pix", value: money(receitaPendente), icon: "◈", tone: "from-amber-500/20 to-orange-500/5", small: true },
    { label: "Críticos", value: criticos, icon: "!", tone: "from-red-500/20 to-orange-500/5" },
    { label: "Tickets abertos", value: enrichedThreads.filter((item) => item.type === "ticket" && !isClosedStatus(item.status)).length, icon: "◇", tone: "from-cyan-500/20 to-blue-500/5" },
    { label: "Finalizados", value: enrichedThreads.filter((item) => isFinishedStatus(item.status)).length, icon: "✓", tone: "from-emerald-500/20 to-green-500/5" },
  ];

  const filaRapida = enrichedThreads.filter((item) => item.priority >= 25).sort((a, b) => b.priority - a.priority).slice(0, 3);

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8">
        <div className="relative flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="rounded-full border border-amber-400/25 bg-amber-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-amber-100">Modo absurdo • Dono</span>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-6xl">Central de comando</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">Prioridade automática, receita estimada, fila crítica, comprovantes e ações rápidas do AprendaJá.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setTab("críticos")} className="rounded-2xl border border-red-400/25 bg-red-500/10 px-5 py-3 font-black text-red-100 transition active:scale-95">Ver críticos</button>
            <button onClick={carregar} className="rounded-2xl bg-white px-5 py-3 font-black text-black shadow-lg shadow-amber-500/20 transition active:scale-95">Atualizar</button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {metricas.map((item) => (
          <div key={item.label} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.tone}`} />
            <div className="relative flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className={`${item.small ? "text-2xl" : "text-4xl"} truncate font-black tracking-[-0.04em]`}>{item.value}</p>
                <p className="mt-1 text-sm font-bold text-zinc-400">{item.label}</p>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-black/35 text-sm font-black text-amber-100">{item.icon}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-emerald-400/20 bg-emerald-500/10 p-5">
        <h3 className="text-2xl font-black text-emerald-100">Liberar curso manualmente</h3>
        <p className="mt-1 max-w-2xl text-sm text-emerald-100/75">Use para brinde, teste, cortesia, parceria ou quando precisar liberar um curso pago de graça.</p>
        <div className="mt-5 grid gap-3 lg:grid-cols-[1.2fr_0.8fr_1fr_auto]">
          <input value={manualUserId} onChange={(e) => setManualUserId(e.target.value)} placeholder="ID do usuário" className="min-h-12 rounded-2xl border border-emerald-300/20 bg-black/35 px-4 text-sm font-bold text-white outline-none placeholder:text-emerald-100/35" />
          <input value={manualCourseId} onChange={(e) => setManualCourseId(e.target.value)} placeholder="ID do curso ex: 7" className="min-h-12 rounded-2xl border border-emerald-300/20 bg-black/35 px-4 text-sm font-bold text-white outline-none placeholder:text-emerald-100/35" />
          <input value={manualCourseTitle} onChange={(e) => setManualCourseTitle(e.target.value)} placeholder="Nome do curso opcional" className="min-h-12 rounded-2xl border border-emerald-300/20 bg-black/35 px-4 text-sm font-bold text-white outline-none placeholder:text-emerald-100/35" />
          <button onClick={liberarCursoManual} disabled={manualLoading} className="rounded-2xl bg-white px-5 py-3 font-black text-black transition active:scale-95 disabled:opacity-60">{manualLoading ? "Liberando..." : "Liberar"}</button>
        </div>
      </section>

      {filaRapida.length > 0 && (
        <section className="rounded-[2rem] border border-red-400/20 bg-red-500/10 p-5">
          <h3 className="text-xl font-black text-red-100">Fila de prioridade</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {filaRapida.map((item) => (
              <button key={item.id} onClick={() => setBusca(item.title)} className="rounded-2xl border border-red-300/15 bg-black/30 p-4 text-left transition active:scale-[0.99]">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-red-100/60">{typeLabel(item.type)} • {formatDate(item.created_at)} • {ageHours(item.created_at)}h</p>
                <p className="mt-2 truncate font-black text-white">{item.title}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <p className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-black ${priorityStyle(item.priority)}`}>{priorityLabel(item.priority)}</p>
                  <p className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-black ${statusStyle(item.status)}`}>{item.status}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="grid gap-3 rounded-[2rem] border border-white/10 bg-white/[0.025] p-3 backdrop-blur-xl lg:grid-cols-[1fr_auto]">
        <input value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Buscar por título, curso, status, valor, ID da compra ou ID do usuário..." className="min-h-12 rounded-2xl border border-white/10 bg-black/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-300/40" />
        <div className="flex gap-2 overflow-x-auto">{tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-black transition active:scale-95 ${tab === item ? "bg-white text-black shadow-lg shadow-amber-500/20" : "text-zinc-400 hover:bg-white/[0.05] hover:text-white"}`}>{item}</button>)}</div>
      </section>

      {erro && <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-5 text-red-100">Erro: {erro}</div>}
      {loading && <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-zinc-400">Carregando dados reais...</div>}

      <section className="grid gap-4">
        {!loading && filtrados.length === 0 ? <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center text-zinc-500"><p className="text-4xl">◇</p><p className="mt-3 text-lg font-black text-zinc-300">Nada encontrado.</p><p className="mt-1 text-sm">Tente limpar a busca ou mudar o filtro.</p></div> : filtrados.map((item) => {
          const isUpdating = updatingId === item.id;
          const isClosedTicket = item.type === "ticket" && isClosedStatus(item.status);
          return (
            <div key={item.id} className={`group rounded-[2rem] border p-5 shadow-xl shadow-black/25 backdrop-blur-xl transition ${item.priority >= 80 ? "border-red-400/25 bg-red-500/[0.06]" : item.priority >= 50 ? "border-amber-400/25 bg-amber-500/[0.05]" : "border-white/10 bg-white/[0.035]"}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-black/35 text-xl font-black text-amber-100">{typeIcon(item.type)}</div>
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">{typeLabel(item.type)} • {formatDate(item.created_at)} • {ageHours(item.created_at)}h aberto</p>
                    <h3 className="mt-1 truncate text-xl font-black tracking-[-0.02em]">{item.title}</h3>
                    <button onClick={() => copiar(item.id)} className="mt-1 block text-left text-xs text-zinc-600 underline decoration-zinc-800 underline-offset-4 hover:text-zinc-300">ID da compra/ticket: {item.id}</button>
                    <button onClick={() => copiar(item.user_id)} className="mt-1 block text-left text-xs text-blue-300/70 underline decoration-blue-900 underline-offset-4 hover:text-blue-200">ID do usuário: {item.user_id}</button>
                    {item.course_title && <p className="mt-2 text-sm text-zinc-400">Curso: <span className="text-zinc-200">{item.course_title}</span></p>}
                    {item.course_id && <button onClick={() => copiar(String(item.course_id))} className="mt-1 text-left text-xs text-emerald-300/70 underline decoration-emerald-900 underline-offset-4 hover:text-emerald-200">ID do curso: {item.course_id}</button>}
                    {(item.total_price || item.price) && <p className="mt-1 text-sm text-zinc-400">Valor: <span className="text-zinc-200">{item.total_price || item.price}</span></p>}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <p className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${priorityStyle(item.priority)}`}>{priorityLabel(item.priority)} • {item.priority}</p>
                      <p className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${statusStyle(item.status)}`}>{item.status}</p>
                      {isPendingStatus(item.status) && <p className="inline-flex rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-xs font-black text-amber-100">Precisa atenção</p>}
                    </div>
                    {item.comprovante_url && <a href={item.comprovante_url} target="_blank" rel="noreferrer" className="mt-3 block text-sm font-black text-amber-100 underline">Abrir comprovante</a>}
                  </div>
                </div>
                <div className="grid min-w-52 gap-2">
                  {item.type === "purchase" && <button disabled={isUpdating || normalize(item.status) === "compra aprovada"} onClick={() => aprovarCompraSegura(item)} className="rounded-xl bg-white px-4 py-2 text-sm font-black text-black transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">{isUpdating ? "Aprovando..." : "Aprovar e liberar"}</button>}
                  {item.type === "purchase" && <button disabled={isUpdating || item.status === "compra finalizada"} onClick={() => atualizarStatus(item.id, "compra finalizada")} className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-black text-emerald-200 transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">Fechar compra</button>}
                  {item.type === "purchase" && <button disabled={isUpdating || item.status === "compra recusada"} onClick={() => atualizarStatus(item.id, "compra recusada")} className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-black text-red-200 transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">Recusar compra</button>}
                  {item.type === "order" && <button disabled={isUpdating || item.status === "em produção"} onClick={() => atualizarStatus(item.id, "em produção")} className="rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-black text-violet-200 transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">Em produção</button>}
                  {item.type === "order" && <button disabled={isUpdating || item.status === "pedido finalizado"} onClick={() => atualizarStatus(item.id, "pedido finalizado")} className="rounded-xl bg-white px-4 py-2 text-sm font-black text-black transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">Finalizar pedido</button>}
                  {item.type === "ticket" && <button disabled={isUpdating || isClosedTicket} onClick={() => atualizarStatus(item.id, "fechado")} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-black text-zinc-200 transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">{isClosedTicket ? "Ticket fechado" : isUpdating ? "Fechando..." : "Fechar ticket"}</button>}
                  <button onClick={() => copiar(`${typeLabel(item.type)}: ${item.title}\nStatus: ${item.status}\nID: ${item.id}\nUsuário: ${item.user_id}\nCurso: ${item.course_title ?? "-"}\nID curso: ${item.course_id ?? "-"}`)} className="rounded-xl border border-white/10 bg-black/35 px-4 py-2 text-sm font-black text-zinc-300 transition active:scale-95">Copiar resumo</button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
