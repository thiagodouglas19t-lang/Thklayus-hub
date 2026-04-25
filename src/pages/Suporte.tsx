import { useState } from "react";

type Ticket = {
  id: number;
  nome: string;
  titulo: string;
  mensagem: string;
  status: "aberto" | "em andamento" | "concluído";
};

export default function Suporte() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [nome, setNome] = useState("");
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");

  function criarTicket() {
    if (!nome.trim() || !titulo.trim() || !mensagem.trim()) {
      alert("Preencha todos os campos.");
      return;
    }

    setTickets([
      {
        id: Date.now(),
        nome,
        titulo,
        mensagem,
        status: "aberto",
      },
      ...tickets,
    ]);

    setNome("");
    setTitulo("");
    setMensagem("");
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="text-3xl font-black">Abrir ticket</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Use isso para dúvidas ou suporte.
        </p>

        <div className="mt-5 space-y-3">
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none"
          />

          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título do problema"
            className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none"
          />

          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Explique sua dúvida..."
            className="min-h-32 w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none"
          />

          <button
            onClick={criarTicket}
            className="w-full rounded-2xl bg-white py-3 font-black text-black"
          >
            Abrir ticket
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="text-3xl font-black">Tickets</h2>

        <div className="mt-5 space-y-3">
          {tickets.length === 0 ? (
            <p className="text-zinc-500">Nenhum ticket aberto.</p>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="rounded-2xl border border-zinc-800 bg-black p-4"
              >
                <p className="font-black">{ticket.titulo}</p>
                <p className="text-sm text-zinc-500">Cliente: {ticket.nome}</p>
                <p className="mt-2 text-sm text-zinc-300">
                  {ticket.mensagem}
                </p>
                <p className="mt-3 text-xs font-black uppercase text-zinc-500">
                  {ticket.status}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
