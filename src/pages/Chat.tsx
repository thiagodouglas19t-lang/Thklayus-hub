import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { canAccessInternalPanel } from "../lib/roles";
import { formatBrasiliaDateTime } from "../lib/date";

type ChatType = "ticket" | "purchase";

type Thread = {
  id: string;
  user_id: string;
  type: ChatType;
  title: string;
  status: string;
  course_id?: string | null;
  course_title?: string | null;
  price?: string | null;
  total_price?: string | null;
  comprovante_url?: string | null;
  created_at?: string;
};

type Message = {
  id: string;
  thread_id: string;
  user_id: string;
  content: string;
  file_url?: string | null;
  created_at?: string;
};

const CLOSED_STATUSES = ["fechado", "closed", "encerrado", "resolvido", "deleted", "oculto"];

function isClosedThread(thread: Thread) {
  return CLOSED_STATUSES.includes(String(thread.status).toLowerCase().trim());
}

function statusStyle(status: string) {
  const value = String(status).toLowerCase().trim();
  if (["fechado", "closed", "encerrado", "resolvido"].includes(value)) return "border-zinc-600/40 bg-zinc-500/10 text-zinc-300";
  if (["compra aprovada", "aprovado"].includes(value)) return "border-emerald-400/30 bg-emerald-500/10 text-emerald-200";
  if (["compra recusada", "recusado"].includes(value)) return "border-red-400/30 bg-red-500/10 text-red-200";
  if (["em análise", "em analise", "pendente"].includes(value)) return "border-amber-400/30 bg-amber-500/10 text-amber-200";
  return "border-blue-400/30 bg-blue-500/10 text-blue-200";
}

function formatTime(value?: string) {
  return value ? `${formatBrasiliaDateTime(value)} BRT` : "";
}

export default function Chat() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [setupError, setSetupError] = useState("");
  const [sending, setSending] = useState(false);
  const [showClosed, setShowClosed] = useState(false);
  const [notificationsOn, setNotificationsOn] = useState(false);
  const [closingTicket, setClosingTicket] = useState(false);

  const internal = canAccessInternalPanel(userEmail);

  const visibleThreads = useMemo(() => {
    return threads.filter((thread) => {
      if (!internal && isClosedThread(thread)) return false;
      if (internal && showClosed) return true;
      return !isClosedThread(thread);
    });
  }, [threads, showClosed, internal]);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedThread) loadMessages(selectedThread.id);
  }, [selectedThread]);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("thklayus-chat-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages" }, (payload) => {
        const msg = payload.new as Message;
        if (msg.thread_id === selectedThread?.id) loadMessages(msg.thread_id);
        if (msg.user_id !== userId) notifyUser("Nova mensagem no AprendaJá", msg.content || "Você recebeu uma nova mensagem.");
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "chat_threads" }, () => {
        loadThreads(userId, userEmail);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, userEmail, selectedThread?.id]);

  function notifyUser(title: string, body: string) {
    if (!notificationsOn) return;
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") return;
    new Notification(title, { body: body.slice(0, 90) });
  }

  async function enableNotifications() {
    if (!("Notification" in window)) {
      alert("Seu navegador não suporta notificação.");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      setNotificationsOn(true);
      new Notification("AprendaJá ativado", { body: "Você receberá alertas de novas mensagens." });
    } else {
      alert("Notificação não foi permitida.");
    }
  }

  function isSetupError(message: string) {
    return message.includes("chat_threads") || message.includes("chat_messages") || message.includes("schema cache") || message.includes("chat-files");
  }

  async function loadInitialData() {
    setLoading(true);
    setSetupError("");
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      setLoading(false);
      return;
    }

    setUserId(data.user.id);
    setUserEmail(data.user.email ?? null);
    await loadThreads(data.user.id, data.user.email ?? null);
    setLoading(false);
  }

  async function loadThreads(currentUserId: string, currentEmail: string | null) {
    const isInternal = canAccessInternalPanel(currentEmail);
    let query = supabase.from("chat_threads").select("*").order("created_at", { ascending: false });

    if (!isInternal) query = query.eq("user_id", currentUserId);

    const { data, error } = await query;

    if (error) {
      setSetupError(isSetupError(error.message) ? "Falta criar as tabelas chat_threads/chat_messages no Supabase ou atualizar o cache do schema." : error.message);
      return;
    }

    setThreads((data ?? []) as Thread[]);
  }

  async function loadMessages(threadId: string) {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("thread_id", threadId)
      .order("created_at", { ascending: true });

    if (error) {
      setSetupError(isSetupError(error.message) ? "Falta criar a tabela chat_messages no Supabase." : error.message);
      return;
    }

    setMessages((data ?? []) as Message[]);
  }

  async function sendMessage() {
    if (!selectedThread) return;
    if (isClosedThread(selectedThread)) {
      alert("Esse ticket já foi fechado. Abra um novo ticket se precisar de ajuda.");
      return;
    }
    if (!text.trim() && !file) return;
    setSending(true);

    let fileUrl = "";

    if (file) {
      const path = `${userId}/${selectedThread.id}/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("chat-files").upload(path, file);

      if (error) {
        setSetupError("Erro ao enviar arquivo. Crie o bucket público chat-files no Supabase Storage.");
        setSending(false);
        return;
      }

      const { data } = supabase.storage.from("chat-files").getPublicUrl(path);
      fileUrl = data.publicUrl;
    }

    const { error } = await supabase.from("chat_messages").insert({
      thread_id: selectedThread.id,
      user_id: userId,
      content: text.trim(),
      file_url: fileUrl,
    });

    if (error) {
      setSetupError("Erro ao enviar mensagem: " + error.message);
      setSending(false);
      return;
    }

    setText("");
    setFile(null);
    await loadMessages(selectedThread.id);
    setSending(false);
  }

  async function updateThreadStatus(status: string) {
    if (!selectedThread) return false;

    const { error } = await supabase.from("chat_threads").update({ status }).eq("id", selectedThread.id);

    if (error) {
      setSetupError("Erro ao atualizar status: " + error.message);
      return false;
    }

    const updated = { ...selectedThread, status };
    setSelectedThread(updated);
    setThreads((current) => current.map((thread) => (thread.id === updated.id ? updated : thread)));
    return true;
  }

  async function approvePurchaseSafely() {
    if (!selectedThread || selectedThread.type !== "purchase") return;

    const ok = confirm("ANTI-GOLPE: aprove somente se o dinheiro caiu na sua conta/banco. Não confie só no print do comprovante. Confirmar liberação do curso?");
    if (!ok) return;

    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/liberar-curso-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ thread_id: selectedThread.id }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Erro ao liberar curso.");

      await loadThreads(userId, userEmail);
      await loadMessages(selectedThread.id);
      setSelectedThread({ ...selectedThread, status: "compra aprovada" });
    } catch (err) {
      alert((err as Error).message);
    }
  }

  async function rejectPurchase() {
    if (!selectedThread || selectedThread.type !== "purchase") return;

    const ok = confirm("Recusar compra? Use isso se o Pix não caiu, comprovante parece falso ou pagamento está incorreto.");
    if (!ok) return;

    const updated = await updateThreadStatus("compra recusada");
    if (!updated) return;

    await supabase.from("chat_messages").insert({
      thread_id: selectedThread.id,
      user_id: userId,
      content: "❌ Compra recusada. O pagamento não foi confirmado. Envie um comprovante válido ou fale com o suporte.",
    });
  }

  async function closeTicket() {
    if (!selectedThread || selectedThread.type !== "ticket") return;
    if (closingTicket) return;

    const ok = confirm("Fechar esse ticket? O cliente não poderá enviar novas mensagens nele.");
    if (!ok) return;

    setClosingTicket(true);
    const ticketId = selectedThread.id;

    const { error } = await supabase.from("chat_threads").update({ status: "fechado" }).eq("id", ticketId);

    if (error) {
      setClosingTicket(false);
      alert("Erro ao fechar ticket: " + error.message);
      return;
    }

    await supabase.from("chat_messages").insert({
      thread_id: ticketId,
      user_id: userId,
      content: "✅ Ticket fechado pelo suporte. Se precisar de mais ajuda, abra um novo ticket.",
    });

    const updated = { ...selectedThread, status: "fechado" };
    setSelectedThread(updated);
    setThreads((current) => current.map((thread) => (thread.id === ticketId ? updated : thread)));
    await loadThreads(userId, userEmail);
    await loadMessages(ticketId);
    setClosingTicket(false);
    alert("Ticket fechado com sucesso.");
  }

  if (loading) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <p className="text-sm font-bold text-zinc-400">Carregando chats...</p>
      </div>
    );
  }

  if (setupError) {
    return (
      <div className="space-y-5">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-red-200">Configuração</p>
          <h2 className="mt-2 text-3xl font-black">Chat interno</h2>
          <p className="mt-2 text-zinc-400">Falta configurar uma parte do Supabase.</p>
        </div>
        <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-6">
          <h3 className="text-xl font-black text-red-200">Configuração necessária</h3>
          <p className="mt-3 text-sm text-red-100">{setupError}</p>
          <p className="mt-4 text-sm text-zinc-300">Crie as tabelas chat_threads e chat_messages no SQL Editor e o bucket público chat-files no Storage.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.20),transparent_34%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_34%)]" />
        <div className="relative flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-blue-200">Atendimento seguro</span>
            <h2 className="mt-5 text-3xl font-black leading-tight tracking-[-0.03em] md:text-5xl">Chat interno</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">Compras, comprovantes, pedidos e tickets organizados dentro do AprendaJá.</p>
          </div>
          <button onClick={enableNotifications} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-black text-zinc-300 transition hover:border-blue-400/40 hover:bg-blue-500/10 md:text-sm">🔔 {notificationsOn ? "Ativas" : "Ativar"}</button>
        </div>
      </div>

      <div className="rounded-3xl border border-amber-400/20 bg-amber-500/10 p-4 text-xs leading-6 text-amber-100/90 md:text-sm">
        <strong>🛡️ Anti-golpe:</strong> libere curso só depois que o Pix aparecer na sua conta. Print sozinho não confirma pagamento.
      </div>

      <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 px-1">
            <div>
              <h3 className="text-xl font-black">Conversas</h3>
              <p className="text-xs text-zinc-500">Tickets e compras em andamento</p>
            </div>
            <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-200">{visibleThreads.length}</span>
          </div>

          {internal && <button onClick={() => setShowClosed((value) => !value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-xs font-black text-zinc-400 transition hover:border-blue-400/40 hover:text-white">{showClosed ? "Ocultar fechados" : "Mostrar fechados"}</button>}

          <div className="mt-4 max-h-[560px] space-y-3 overflow-y-auto pr-1">
            {visibleThreads.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5 text-sm text-zinc-500">
                <p className="text-2xl">◇</p>
                <p className="mt-2 font-bold text-zinc-400">Nenhum atendimento aberto.</p>
                <p className="mt-1 text-xs leading-5">Quando houver ticket, pedido ou compra, vai aparecer aqui.</p>
              </div>
            ) : (
              visibleThreads.map((thread) => {
                const active = selectedThread?.id === thread.id;
                return (
                  <button key={thread.id} onClick={() => setSelectedThread(thread)} className={`group w-full rounded-[1.5rem] border p-4 text-left shadow-lg shadow-black/20 transition hover:-translate-y-0.5 active:scale-[0.99] ${active ? "border-blue-300/50 bg-white text-black" : "border-white/10 bg-black/35 text-white hover:border-blue-400/40 hover:bg-blue-500/10"}`}>
                    <div className="flex items-start gap-3">
                      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-lg font-black ${active ? "bg-black text-white" : "border border-white/10 bg-white/[0.04] text-blue-200"}`}>
                        {thread.type === "purchase" ? "◈" : "◇"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-black uppercase opacity-70">{thread.type === "purchase" ? "Compra" : "Ticket"}</p>
                        <p className="mt-1 truncate text-base font-black">{thread.title}</p>
                        {thread.type === "purchase" && <p className="mt-1 truncate text-xs opacity-70">{thread.course_title} • Total {thread.total_price || thread.price}</p>}
                        <p className="mt-1 text-[10px] font-bold opacity-60">{formatTime(thread.created_at)}</p>
                        <p className={`mt-3 inline-flex rounded-full border px-3 py-1 text-[11px] font-black ${active ? "border-black/20 bg-black/10 text-black" : statusStyle(thread.status)}`}>{thread.status}</p>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </section>

        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/30 backdrop-blur-xl">
          {!selectedThread ? (
            <div className="flex min-h-[560px] flex-col items-center justify-center p-8 text-center text-zinc-500">
              <div className="grid h-20 w-20 place-items-center rounded-[2rem] border border-white/10 bg-black/40 text-4xl text-blue-200 shadow-xl shadow-black/30">●</div>
              <p className="mt-5 text-xl font-black text-zinc-300">Selecione uma conversa</p>
              <p className="mt-2 max-w-sm text-sm leading-6">Aqui você acompanha compras, comprovantes, suporte e mensagens do ADM.</p>
            </div>
          ) : (
            <div className="flex min-h-[560px] flex-col">
              <div className="border-b border-white/10 bg-black/30 p-4 md:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">{selectedThread.type === "purchase" ? "Compra" : "Ticket"} • {formatTime(selectedThread.created_at)}</p>
                    <h3 className="mt-1 text-2xl font-black tracking-[-0.03em]">{selectedThread.title}</h3>
                    <p className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-black ${statusStyle(selectedThread.status)}`}>Status: {selectedThread.status}</p>
                  </div>

                  {internal && (
                    <div className="flex flex-wrap gap-2">
                      {selectedThread.type === "purchase" && <><button onClick={approvePurchaseSafely} className="rounded-xl bg-white px-4 py-2 text-sm font-black text-black shadow-lg shadow-blue-500/20 transition active:scale-95">Aprovar seguro</button><button onClick={rejectPurchase} className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-black text-red-200 transition active:scale-95">Recusar</button></>}
                      {selectedThread.type === "ticket" && !isClosedThread(selectedThread) && <button onClick={closeTicket} disabled={closingTicket} className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-black text-red-200 transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">{closingTicket ? "Fechando..." : "Fechar ticket"}</button>}
                    </div>
                  )}
                </div>

                {selectedThread.type === "purchase" && (
                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/35 p-4 text-sm text-zinc-300">
                    <p><strong className="text-white">Curso comprado:</strong> {selectedThread.course_title}</p>
                    <p><strong className="text-white">Valor total:</strong> {selectedThread.total_price || selectedThread.price}</p>
                    <p className="mt-2 rounded-xl border border-amber-400/20 bg-amber-500/10 p-3 text-amber-100"><strong>Antes de aprovar:</strong> confira se o Pix caiu na conta.</p>
                    {selectedThread.comprovante_url && <a href={selectedThread.comprovante_url} target="_blank" rel="noreferrer" className="mt-2 block font-black text-blue-200 underline">Abrir comprovante</a>}
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.06),transparent_35%)] p-4 md:max-h-[480px] md:p-5">
                {messages.length === 0 ? (
                  <div className="mx-auto mt-10 max-w-sm rounded-3xl border border-white/10 bg-black/35 p-5 text-center text-sm text-zinc-500">
                    <p className="text-3xl">✦</p>
                    <p className="mt-2 font-bold text-zinc-400">Nenhuma mensagem ainda.</p>
                    <p className="mt-1 text-xs leading-5">Envie a primeira mensagem para iniciar o atendimento.</p>
                  </div>
                ) : (
                  messages.map((message) => {
                    const mine = message.user_id === userId;
                    return (
                      <div key={message.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[88%] rounded-[1.35rem] border px-4 py-3 shadow-lg shadow-black/20 ${mine ? "rounded-br-md border-blue-300/30 bg-gradient-to-br from-white to-blue-100 text-black" : "rounded-bl-md border-white/10 bg-black/55 text-white"}`}>
                          {message.content && <p className="whitespace-pre-wrap text-sm leading-6">{message.content}</p>}
                          {message.file_url && <a href={message.file_url} target="_blank" rel="noreferrer" className={`mt-2 block text-sm font-black underline ${mine ? "text-black" : "text-blue-200"}`}>Abrir arquivo</a>}
                          <p className={`mt-2 text-right text-[10px] font-bold ${mine ? "text-black/45" : "text-zinc-600"}`}>{formatTime(message.created_at)}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {isClosedThread(selectedThread) ? <div className="border-t border-white/10 bg-black/35 p-4 text-center text-sm font-bold text-zinc-400">Esse ticket foi fechado. Abra um novo ticket se precisar continuar.</div> : (
                <div className="border-t border-white/10 bg-black/35 p-4">
                  {file && <div className="mb-3 rounded-2xl border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-bold text-blue-100">Arquivo selecionado: {file.name}</div>}
                  <div className="flex flex-col gap-3 md:flex-row md:items-end">
                    <label className="flex cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-black text-zinc-300 transition hover:border-blue-400/40 hover:text-white">
                      Anexar
                      <input type="file" onChange={(event) => setFile(event.target.files?.[0] ?? null)} className="hidden" />
                    </label>
                    <textarea value={text} onChange={(event) => setText(event.target.value)} placeholder="Escreva sua mensagem para o suporte..." className="min-h-14 flex-1 resize-none rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-400/50 focus:bg-black/70" />
                    <button onClick={sendMessage} disabled={sending} className="rounded-2xl bg-white px-6 py-3 font-black text-black shadow-lg shadow-blue-500/20 transition hover:scale-[1.03] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60">{sending ? "Enviando..." : "Enviar"}</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
