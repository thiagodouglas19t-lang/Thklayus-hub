import { useEffect, useState } from "react";
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

export default function Chat() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const internal = canAccessInternalPanel(userEmail);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedThread) loadMessages(selectedThread.id);
  }, [selectedThread]);

  async function loadInitialData() {
    setLoading(true);
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
      alert("Erro ao carregar chats: " + error.message);
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
      alert("Erro ao carregar mensagens: " + error.message);
      return;
    }

    setMessages((data ?? []) as Message[]);
  }

  async function sendMessage() {
    if (!selectedThread) return;
    if (!text.trim() && !file) return;

    let fileUrl = "";

    if (file) {
      const path = `${userId}/${selectedThread.id}/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("chat-files").upload(path, file);

      if (error) {
        alert("Erro ao enviar arquivo: " + error.message);
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
      alert("Erro ao enviar mensagem: " + error.message);
      return;
    }

    setText("");
    setFile(null);
    await loadMessages(selectedThread.id);
  }

  async function updateThreadStatus(status: string) {
    if (!selectedThread) return;

    const { error } = await supabase.from("chat_threads").update({ status }).eq("id", selectedThread.id);

    if (error) {
      alert("Erro ao atualizar status: " + error.message);
      return;
    }

    const updated = { ...selectedThread, status };
    setSelectedThread(updated);
    setThreads(threads.map((thread) => (thread.id === updated.id ? updated : thread)));
  }

  async function closeAndDeleteTicket() {
    if (!selectedThread || selectedThread.type !== "ticket") return;

    const ok = confirm("Fechar esse ticket vai apagar ele e as mensagens para sempre. Continuar?");
    if (!ok) return;

    await supabase.from("chat_messages").delete().eq("thread_id", selectedThread.id);
    const { error } = await supabase.from("chat_threads").delete().eq("id", selectedThread.id);

    if (error) {
      alert("Erro ao apagar ticket: " + error.message);
      return;
    }

    setSelectedThread(null);
    setMessages([]);
    setThreads(threads.filter((thread) => thread.id !== selectedThread.id));
  }

  if (loading) return <p className="text-zinc-500">Carregando chats...</p>;

  return (
    <div>
      <h2 className="text-3xl font-black">Chat interno</h2>
      <p className="mt-2 text-zinc-400">Compras, comprovantes e tickets ficam organizados dentro do app.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
        <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4">
          <h3 className="px-2 text-xl font-black">Conversas</h3>

          <div className="mt-4 space-y-2">
            {threads.length === 0 ? (
              <p className="px-2 text-sm text-zinc-500">Nenhuma conversa ainda.</p>
            ) : (
              threads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => setSelectedThread(thread)}
                  className={`w-full rounded-2xl border p-4 text-left ${
                    selectedThread?.id === thread.id ? "border-white bg-white text-black" : "border-zinc-800 bg-black text-white"
                  }`}
                >
                  <p className="text-xs font-black uppercase opacity-70">{thread.type === "purchase" ? "Compra" : "Ticket"}</p>
                  <p className="mt-1 font-black">{thread.title}</p>
                  {thread.type === "purchase" && (
                    <p className="mt-1 text-xs opacity-70">{thread.course_title} • Total {thread.total_price || thread.price}</p>
                  )}
                  <p className="mt-1 text-xs opacity-70">Status: {thread.status}</p>
                </button>
              ))
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4">
          {!selectedThread ? (
            <div className="flex min-h-96 items-center justify-center text-zinc-500">Selecione uma conversa.</div>
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
                      {selectedThread.comprovante_url && (
                        <a href={selectedThread.comprovante_url} target="_blank" rel="noreferrer" className="mt-2 block font-black underline">
                          Abrir comprovante
                        </a>
                      )}
                    </div>
                  )}
                  <p className="mt-2 text-sm text-zinc-400">Status: {selectedThread.status}</p>
                </div>

                {internal && (
                  <div className="flex flex-wrap gap-2">
                    {selectedThread.type === "purchase" && (
                      <>
                        <button onClick={() => updateThreadStatus("compra aprovada")} className="rounded-xl bg-white px-4 py-2 text-sm font-black text-black">
                          Aprovar compra
                        </button>
                        <button onClick={() => updateThreadStatus("compra recusada")} className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-black">
                          Recusar
                        </button>
                      </>
                    )}

                    {selectedThread.type === "ticket" && (
                      <button onClick={closeAndDeleteTicket} className="rounded-xl border border-red-900 bg-red-950 px-4 py-2 text-sm font-black text-red-200">
                        Fechar e apagar
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4 max-h-[420px] space-y-3 overflow-y-auto pr-2">
                {messages.map((message) => {
                  const mine = message.user_id === userId;
                  return (
                    <div key={message.id} className={`rounded-2xl border border-zinc-800 p-4 ${mine ? "ml-auto max-w-[85%] bg-white text-black" : "mr-auto max-w-[85%] bg-black text-white"}`}>
                      {message.content && <p className="text-sm whitespace-pre-wrap">{message.content}</p>}
                      {message.file_url && (
                        <a href={message.file_url} target="_blank" rel="noreferrer" className="mt-2 block text-sm font-black underline">
                          Abrir arquivo
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 grid gap-3">
                <textarea value={text} onChange={(event) => setText(event.target.value)} placeholder="Digite uma mensagem..." className="min-h-24 rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none" />
                <input type="file" onChange={(event) => setFile(event.target.files?.[0] ?? null)} className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm" />
                <button onClick={sendMessage} className="rounded-2xl bg-white py-3 font-black text-black">Enviar mensagem</button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
