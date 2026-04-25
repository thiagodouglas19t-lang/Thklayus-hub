import { useState } from "react";

type Pedido = {
  id: number;
  nome: string;
  servico: string;
  detalhes: string;
  status: "pendente" | "em produção" | "entregue";
};

const servicos = [
  "Slide escolar simples",
  "Trabalho escolar completo",
  "Arte simples",
  "Resumo escolar",
];

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [nome, setNome] = useState("");
  const [servico, setServico] = useState(servicos[0]);
  const [detalhes, setDetalhes] = useState("");

  function criarPedido() {
    if (!nome.trim() || !detalhes.trim()) {
      alert("Preencha seu nome e os detalhes do pedido.");
      return;
    }

    setPedidos([
      {
        id: Date.now(),
        nome,
        servico,
        detalhes,
        status: "pendente",
      },
      ...pedidos,
    ]);

    setNome("");
    setServico(servicos[0]);
    setDetalhes("");
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="text-3xl font-black">Criar pedido</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Pedido é para trabalho pago: slides, artes, resumos e trabalhos.
        </p>

        <div className="mt-5 space-y-3">
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none"
          />

          <select
            value={servico}
            onChange={(e) => setServico(e.target.value)}
            className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none"
          >
            {servicos.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <textarea
            value={detalhes}
            onChange={(e) => setDetalhes(e.target.value)}
            placeholder="Explique o que você precisa..."
            className="min-h-32 w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none"
          />

          <button
            onClick={criarPedido}
            className="w-full rounded-2xl bg-white py-3 font-black text-black"
          >
            Enviar pedido
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="text-3xl font-black">Meus pedidos</h2>

        <div className="mt-5 space-y-3">
          {pedidos.length === 0 ? (
            <p className="text-zinc-500">Nenhum pedido criado.</p>
          ) : (
            pedidos.map((pedido) => (
              <div
                key={pedido.id}
                className="rounded-2xl border border-zinc-800 bg-black p-4"
              >
                <p className="font-black">{pedido.servico}</p>
                <p className="text-sm text-zinc-500">Cliente: {pedido.nome}</p>
                <p className="mt-2 text-sm text-zinc-300">{pedido.detalhes}</p>
                <p className="mt-3 text-xs font-black uppercase text-zinc-500">
                  {pedido.status}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
                }
