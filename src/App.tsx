import { useEffect, useState } from "react";
import { Ticket, UserRole } from "./types";
import { addTicket, getTickets, saveTickets } from "./utils/storage";

export default function App() {
  const [role, setRole] = useState<UserRole>("user");
  const [userName, setUserName] = useState("Cliente");
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [replyText, setReplyText] = useState<Record<string, string>>({});

  useEffect(() => {
    setTickets(getTickets());
  }, []);

  function refreshTickets() {
    setTickets(getTickets());
  }

  function handleCreateTicket() {
    if (!title.trim() || !message.trim()) return;

    const newTicket: Ticket = {
      id: crypto.randomUUID(),
      title,
      message,
      status: "aberto",
      createdAt: new Date().toISOString(),
      userName
    };

    addTicket(newTicket);
    refreshTickets();
    setTitle("");
    setMessage("");
  }

  function replyTicket(id: string) {
    const text = replyText[id]?.trim();
    if (!text) return;

    const updated = tickets.map(ticket =>
      ticket.id === id
        ? { ...ticket, adminReply: text, status: "respondido" as const }
        : ticket
    );

    saveTickets(updated);
    setTickets(updated);
    setReplyText({ ...replyText, [id]: "" });
  }

  function closeTicket(id: string) {
    const updated = tickets.map(ticket =>
      ticket.id === id ? { ...ticket, status: "fechado" as const } : ticket
    );

    saveTickets(updated);
    setTickets(updated);
  }

  const visibleTickets =
    role === "admin"
      ? tickets
      : tickets.filter(ticket => ticket.userName === userName);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="mx-auto max-w-3xl">
        <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
          <div>
            <h1 className="text-3xl font-bold tracking-widest">THKLAYUS</h1>
            <p className="text-zinc-400">Serviços • Suporte • Tickets</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder="Seu nome"
              className="flex-1 rounded-lg border border-zinc-700 bg-black p-3 outline-none focus:border-blue-500"
            />

            <button
              onClick={() => setRole("user")}
              className={`rounded-lg px-4 py-3 ${
                role === "user" ? "bg-blue-600" : "bg-zinc-800"
              }`}
            >
              Cliente
            </button>

            <button
              onClick={() => setRole("admin")}
              className={`rounded-lg px-4 py-3 ${
                role === "admin" ? "bg-purple-600" : "bg-zinc-800"
              }`}
            >
              ADM
            </button>
          </div>
        </header>

        {role === "user" && (
          <section className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
            <h2 className="mb-4 text-xl font-semibold">Abrir ticket</h2>

            <div className="flex flex-col gap-3">
              <input
                placeholder="Título do problema"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="rounded-lg border border-zinc-700 bg-black p-3 outline-none focus:border-blue-500"
              />

              <textarea
                placeholder="Explique o que aconteceu"
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="min-h-28 rounded-lg border border-zinc-700 bg-black p-3 outline-none focus:border-blue-500"
              />

              <button
                onClick={handleCreateTicket}
                className="rounded-lg bg-blue-600 p-3 font-semibold hover:bg-blue-700"
              >
                Criar ticket
              </button>
            </div>
          </section>
        )}

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">
            {role === "admin" ? "Painel ADM" : "Meus tickets"}
          </h2>

          {visibleTickets.length === 0 && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-zinc-400">
              Nenhum ticket encontrado.
            </div>
          )}

          {visibleTickets.map(ticket => (
            <div
              key={ticket.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold">{ticket.title}</h3>
                  <p className="text-sm text-zinc-500">
                    Cliente: {ticket.userName}
                  </p>
                </div>

                <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm">
                  {ticket.status}
                </span>
              </div>

              <p className="text-zinc-300">{ticket.message}</p>

              {ticket.adminReply && (
                <div className="mt-4 rounded-xl border border-purple-800 bg-purple-950/40 p-3">
                  <p className="text-sm text-purple-300">Resposta do ADM:</p>
                  <p>{ticket.adminReply}</p>
                </div>
              )}

              {role === "admin" && ticket.status !== "fechado" && (
                <div className="mt-4 flex flex-col gap-3">
                  <textarea
                    placeholder="Responder ticket"
                    value={replyText[ticket.id] || ""}
                    onChange={e =>
                      setReplyText({
                        ...replyText,
                        [ticket.id]: e.target.value
                      })
                    }
                    className="min-h-20 rounded-lg border border-zinc-700 bg-black p-3 outline-none focus:border-purple-500"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={() => replyTicket(ticket.id)}
                      className="rounded-lg bg-purple-600 px-4 py-2 font-semibold"
                    >
                      Responder
                    </button>

                    <button
                      onClick={() => closeTicket(ticket.id)}
                      className="rounded-lg bg-red-600 px-4 py-2 font-semibold"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
