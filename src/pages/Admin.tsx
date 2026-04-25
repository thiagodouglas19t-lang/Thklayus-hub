import { useState } from "react";

type Pedido = {
  id: number;
  cliente: string;
  servico: string;
  status: "pendente" | "em produção" | "entregue";
};

type Ticket = {
  id: number;
  cliente: string;
  titulo: string;
  status: "aberto" | "em andamento" | "concluído";
};

type Compra = {
  id: number;
  cliente: string;
  curso: string;
  status: "aguardando pagamento" | "comprovante enviado" | "liberado";
};

export default function Admin() {
  const [compras, setCompras] = useState<Compra[]>([
    {
      id: 1,
      cliente: "Cliente teste",
      curso: "Curso de Slides",
      status: "comprovante enviado",
    },
  ]);

  const [pedidos, setPedidos] = useState<Pedido[]>([
    {
      id: 1,
      cliente: "Cliente teste",
      servico: "Slide escolar simples",
      status: "pendente",
    },
  ]);

  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      cliente: "Cliente teste",
      titulo: "Dúvida sobre curso",
      status: "aberto",
    },
  ]);

  function atualizarCompra(id: number, status: Compra["status"]) {
    setCompras(
      compras.map((compra) =>
        compra.id === id ? { ...compra, status } : compra
      )
    );
  }

  function atualizarPedido(id: number, status: Pedido["status"]) {
    setPedidos(
      pedidos.map((pedido) =>
        pedido.id === id ? { ...pedido, status } : pedido
      )
    );
  }

  function atualizarTicket(id: number, status: Ticket["status"]) {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status } : ticket
      )
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-black">Painel ADM</h2>
      <p className="mt-2 text-zinc-400">
        Controle compras, pedidos e tickets do THKLAYUS.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="text-2xl font-black">Compras</h3>

          <div className="mt-5 space-y-3">
            {compras.map((compra) => (
              <div
                key={compra.id}
                className="rounded-2xl border border-zinc-800 bg-black p-4"
              >
                <p className="font-black">{compra.curso}</p>
                <p className="text-sm text-zinc-500">{compra.cliente}</p>

                <select
                  value={compra.status}
                  onChange={(e) =>
                    atualizarCompra(compra.id, e.target.value as Compra["status"])
                  }
                  className="mt-3 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 outline-none"
                >
                  <option value="aguardando pagamento">
                    aguardando pagamento
                  </option>
                  <option value="comprovante enviado">
                    comprovante enviado
                  </option>
                  <option value="liberado">liberado</option>
                </select>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="text-2xl font-black">Pedidos</h3>

          <div className="mt-5 space-y-3">
            {pedidos.map((pedido) => (
              <div
                key={pedido.id}
                className="rounded-2xl border border-zinc-800 bg-black p-4"
              >
                <p className="font-black">{pedido.servico}</p>
                <p className="text-sm text-zinc-500">{pedido.cliente}</p>

                <select
                  value={pedido.status}
                  onChange={(e) =>
                    atualizarPedido(pedido.id, e.target.value as Pedido["status"])
                  }
                  className="mt-3 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 outline-none"
                >
                  <option value="pendente">pendente</option>
                  <option value="em produção">em produção</option>
                  <option value="entregue">entregue</option>
                </select>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="text-2xl font-black">Tickets</h3>

          <div className="mt-5 space-y-3">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="rounded-2xl border border-zinc-800 bg-black p-4"
              >
                <p className="font-black">{ticket.titulo}</p>
                <p className="text-sm text-zinc-500">{ticket.cliente}</p>

                <select
                  value={ticket.status}
                  onChange={(e) =>
                    atualizarTicket(ticket.id, e.target.value as Ticket["status"])
                  }
                  className="mt-3 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 outline-none"
                >
                  <option value="aberto">aberto</option>
                  <option value="em andamento">em andamento</option>
                  <option value="concluído">concluído</option>
                </select>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
                }
