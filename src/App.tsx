import { useEffect, useState } from "react";
import { Ticket } from "./types";
import { addTicket, getTickets, saveTickets } from "./utils/storage";

export default function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTickets(getTickets());
  }, []);

  function handleCreateTicket() {
    if (!title || !message) return;

    const newTicket: Ticket = {
      id: Date.now().toString(),
      title,
      message,
      status: "aberto",
      createdAt: new Date().toISOString()
    };

    addTicket(newTicket);
    setTickets(getTickets());
    setTitle("");
    setMessage("");
  }

  function closeTicket(id: string) {
    const updated = tickets.map(t =>
      t.id === id ? { ...t, status: "fechado" } : t
    );
    setTickets(updated);
    saveTickets(updated);
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">

      <h1 className="text-3xl mb-6">THKLAYUS 🎫</h1>

      {/* Criar ticket */}
      <div className="bg-zinc-900 p-4 rounded-xl mb-6 flex flex-col gap-3">
        <input
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="p-2 bg-black border border-zinc-700 rounded"
        />

        <textarea
          placeholder="Mensagem"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="p-2 bg-black border border-zinc-700 rounded"
        />

        <button
          onClick={handleCreateTicket}
          className="bg-blue-600 p-2 rounded"
        >
          Criar Ticket
        </button>
      </div>

      {/* Lista */}
      <div className="flex flex-col gap-4">
        {tickets.map(ticket => (
          <div
            key={ticket.id}
            className="bg-zinc-900 p-4 rounded-xl border border-zinc-800"
          >
            <h2 className="text-lg font-bold">{ticket.title}</h2>
            <p className="text-gray-400">{ticket.message}</p>
            <p className="text-sm mt-2">
              Status: {ticket.status}
            </p>

            {ticket.status !== "fechado" && (
              <button
                onClick={() => closeTicket(ticket.id)}
                className="mt-2 text-red-400"
              >
                Fechar
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
