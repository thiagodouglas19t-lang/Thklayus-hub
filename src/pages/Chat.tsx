import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { canAccessInternalPanel } from "../lib/roles";

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

const CLOSED_STATUSES = ["fechado", "closed", "encerrado", "resolvido"];

function isClosedThread(thread: Thread) {
  return CLOSED_STATUSES.includes(String(thread.status).toLowerCase().trim());
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

  const internal = canAccessInternalPanel(userEmail);

  const visibleThreads = useMemo(() => {
    if (showClosed && internal) return threads;
    return threads.filter((thread) => !isClosedThread(thread));
  }, [threads, showClosed, internal]);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedThread) loadMessages(selectedThread.id);
  }, [selectedThread]);

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

    if (!isInternal) {
      query = query.eq("user_id", currentUserId).not("status", "in", "(fechado,closed,encerrado,resolvido)");
    }

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
    if (!selectedThread) return;

    const { error } = await supabase.from("chat_threads").update({ status }).eq("id", selectedThread.id);

    if (error) {
      setSetupError("Erro ao atualizar status: " + error.message);
      return;
    }

    const updated = { ...selectedThread, status };
    setSelectedThread(updated);
    setThreads((current) => current.map((thread) => (thread.id === updated.id ? updated : thread)));
  }

  async function closeTicket() {
    if (!selectedThread || selectedThread.type !== "ticket") return;

    const ok = confirm("Fechar esse ticket? Ele vai sumir da lista do usuário e o chat ficará bloqueado.");
    if (!ok) return;

    const closedStatus = "fechado";
    const { error } = await supabase.from("chat_threads").update({ status: closedStatus }).eq("id", selectedThread.id);

    if (error) {
      setSetupError("Erro ao fechar ticket: " + error.message);
      return;
    }

    await supabase.from("chat_messages").insert({
      thread_id: selectedThread.id,
      user_id: userId,
      content: "✅ Ticket fechado pelo suporte. Se precisar de mais ajuda, abra um novo ticket.",
    });

    const closedThread = { ...selectedThread, status: closedStatus };
    setThreads((current) => current.map((thread) => (thread.id === closedThread.id ? closedThread : thread)));
    setSelectedThread(null);
    setMessages([]);
  }

  if (loading) {
    return (
      <div className="pro-card rounded-[2rem] p-6">
        <p className="text-zinc-500">Carregando chats...</p>
      </div>
    );
  }

  if (setupError) {
    return (
      <div className="space-y-5">
        <div className="glass-card rounded-[2rem] p-6">
          <h2 className="text-3xl font-black">Chat interno</h2>
          <p className="mt-2 text-zinc-400">Falta configurar uma parte do Supabase.</p>
        </div>

        <div className="rounded-3xl border border-red-900 bg-red-950/30 p-6">
          <h3 className="text-xl font-black text-red-200">Configuração necessária</h3>
          <p className="mt-3 text-sm text-red-100">{setupError}</p>
          <p className="mt-4 text-sm text-zinc-300">Crie as tabelas chat_threads e chat_messages no SQL Editor e o bucket público chat-files no Storage.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-[2rem] p-6">
        <span className="rounded-full border border-zinc-800 px-4 py-2 text-xs font-black uppercase text-zinc-500">Atendimento interno</span>
        <h2 className="mt-5 text-4xl font-black">Chat interno</h2>
        <p className="mt-2 text-zinc-400">Compras, comprovantes, pedidos e tickets ficam organizados dentro do THKLAYUS.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <section className="pro-card rounded-3xl p-4">
          <div className="flex items-center justify-between gap-3 px-2">
            <h3 className="text-xl font-black">Conversas</h3>
            <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-500">{visibleThreads.length}</span>
          </div>

          {internal && (
            <button
              onClick={() => setShowClosed((value) => !value)}
              className="mt-3 w-full rounded-2xl border border-zinc-800 bg-black px-4 py-2 text-xs font-black text-zinc-400 hover:border-zinc-600"
            >
              {showClosed ? "Ocultar fechados" : "Mostrar fechados"}
            </button>
          )}

          <div className="mt-4 max-h-[620px] space-y-2 overflow-y-auto pr-1">
            {visibleThreads.length === 0 ? (
              <div className="rounded-2xl border border-zinc-800 bg-black p-4 text-sm text-zinc-500">Nenhuma conversa aberta.</div>
            ) : (
              visibleThreads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => setSelectedThread(thread)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    selectedThread?.id === thread.id ? "border-white bg-white text-black" : "border-zinc-800 bg-black text-white hover:border-zinc-600"
                  } ${isClosedThread(thread) ? "opacity-55" : ""}`}
                >
                  <p className="text-xs font-black uppercase opacity-70">{thread.type === "purchase" ? "Compra" : "Ticket"}</p>
                  <p className="mt-1 font-black">{thread.title}</p>
                  {thread.type === "purchase" && <p className="mt-1 text-xs opacity-70">{thread.course_title} • Total {thread.total_price || thread.price}</p>}
                  <p className="mt-2 inline-flex rounded-full border border-current px-3 py-1 text-xs font-black opacity-70">{thread.status}</p>
                </button>
              ))
            )}
          </div>
        </section>

        <section className="pro-card rounded-3xl p-4">
          {!selectedThread ? (
            <div className="flex min-h-96 flex-col items-center justify-center text-center text-zinc-500">
              <p className="text-4xl">💬</p>
              <p className="mt-3 font-bold">Selecione uma conversa</p>
              <p className="mt-1 text-sm">Aqui você acompanha compras, comprovantes e suporte.</p>
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-800 pb-4">
                <div>
                  <p className="text-xs font-black uppercase text-zinc-500">{selectedThread.type === "purchase" ? "Compra" : "Ticket"}</p>
                  <h3 className="text-2xl font-black">{selectedThread.title}</h3>
                  {selectedThread.type === "purchase" && (
                    <div className="mt-3 rounded-2xl border border-zinc-800 bg-black p-4 text-sm">
                      <p><strong>Curso comprado:</strong> {selectedThread.course_title}</p>
                      <p><strong>Valor total:</strong> {selectedThread.total_price || selectedThread.price}</p>
                      {selectedThread.comprovante_url && <a href={selectedThread.comprovante_url} target="_blank" rel="noreferrer" className="mt-2 block font-black underline">Abrir comprovante</a>}
                    </div>
                  )}
                  <p className="mt-2 text-sm text-zinc-400">Status: {selectedThread.status}</p>
                </div>

                {internal && (
                  <div className="flex flex-wrap gap-2">
                    {selectedThread.type === "purchase" && (
                      <>
                        <button onClick={() => updateThreadStatus("compra aprovada")} className="pro-button rounded-xl px-4 py-2 text-sm font-black">Aprovar</button>
                        <button onClick={() => updateThreadStatus("compra recusada")} className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-black">Recusar</button>
                      </>
                    )}
                    {selectedThread.type === "ticket" && !isClosedThread(selectedThread) && (
                      <button onClick={closeTicket} className="rounded-xl border border-red-900 bg-red-950 px-4 py-2 text-sm font-black text-red-200">Fechar ticket</button>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4 max-h-[420px] space-y-3 overflow-y-auto pr-2">
                {messages.map((message) => {
                  const mine = message.user_id === userId;
                  return (
                    <div key={message.id} className={`rounded-2xl border p-4 ${mine ? "ml-auto max-w-[85%] border-white bg-white text-black" : "mr-auto max-w-[85%] border-zinc-800 bg-black text-white"}`}>
                      {message.content && <p className="whitespace-pre-wrap text-sm leading-6">{message.content}</p>}
                      {message.file_url && <a href={message.file_url} target="_blank" rel="noreferrer" className="mt-2 block text-sm font-black underline">Abrir arquivo</a>}
                    </div>
                  );
                })}
              </div>

              {isClosedThread(selectedThread) ? (
                <div className="mt-4 rounded-2xl border border-zinc-800 bg-black p-4 text-center text-sm font-bold text-zinc-400">
                  Esse ticket foi fechado. Para continuar, abra um novo ticket no suporte.
                </div>
              ) : (
                <div className="mt-4 grid gap-3">
                  <textarea value={text} onChange={(event) => setText(event.target.value)} placeholder="Digite uma mensagem..." className="min-h-24 rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none" />
                  <input type="file" onChange={(event) => setFile(event.target.files?.[0] ?? null)} className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm" />
                  <button onClick={sendMessage} disabled={sending} className="pro-button rounded-2xl py-3 font-black disabled:opacity-60">{sending ? "Enviando..." : "Enviar mensagem"}</button>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
