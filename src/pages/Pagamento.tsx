import { useState } from "react";

const produtos = [
  {
    id: "curso-basico",
    nome: "Curso Básico",
    descricao: "Acesso inicial aos conteúdos do AprendaJá.",
    preco: "R$ 19,90",
  },
  {
    id: "suporte-premium",
    nome: "Suporte Premium",
    descricao: "Atendimento prioritário para dúvidas e pedidos.",
    preco: "R$ 9,90",
  },
  {
    id: "servico-escolar",
    nome: "Serviço Escolar",
    descricao: "Pedido de apresentação, resumo ou material de estudo.",
    preco: "A combinar",
  },
];

export default function Pagamento() {
  const [produto, setProduto] = useState(produtos[0]);
  const whatsapp = "5585992686478";
  const mensagem = encodeURIComponent(`Olá! Quero comprar: ${produto.nome} (${produto.preco}) pelo AprendaJá.`);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-blue-500/10 backdrop-blur-2xl md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-300">Pagamento</p>
        <h1 className="mt-3 text-3xl font-black text-white md:text-5xl">Comprar no AprendaJá</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Escolha um produto e finalize pelo WhatsApp. Por enquanto o pagamento é manual para evitar colocar chaves secretas no front-end.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {produtos.map((item) => {
          const ativo = item.id === produto.id;
          return (
            <button
              key={item.id}
              onClick={() => setProduto(item)}
              className={`rounded-3xl border p-5 text-left transition active:scale-95 ${
                ativo
                  ? "border-blue-400 bg-blue-500/15 shadow-xl shadow-blue-500/10"
                  : "border-white/10 bg-white/[0.04] hover:border-blue-400/40 hover:bg-white/[0.06]"
              }`}
            >
              <h2 className="text-xl font-black text-white">{item.nome}</h2>
              <p className="mt-2 text-sm text-zinc-400">{item.descricao}</p>
              <p className="mt-4 text-2xl font-black text-blue-300">{item.preco}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-[2rem] border border-white/10 bg-black/50 p-6 backdrop-blur-xl">
        <h2 className="text-2xl font-black text-white">Resumo</h2>
        <p className="mt-2 text-zinc-400">Produto escolhido: <span className="font-bold text-white">{produto.nome}</span></p>
        <p className="text-zinc-400">Valor: <span className="font-bold text-blue-300">{produto.preco}</span></p>

        <a
          href={`https://wa.me/${whatsapp}?text=${mensagem}`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-4 text-center font-black text-black shadow-lg shadow-blue-500/20 transition hover:scale-[1.01] active:scale-95 md:w-auto"
        >
          Finalizar pelo WhatsApp
        </a>

        <p className="mt-4 text-xs text-zinc-500">
          Próximo passo: trocar esse botão por checkout automático com Mercado Pago ou Stripe usando uma função segura no backend.
        </p>
      </div>
    </div>
  );
}
