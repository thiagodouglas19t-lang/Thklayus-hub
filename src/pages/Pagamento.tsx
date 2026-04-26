import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type Produto = {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  tipo: "purchase" | "order";
};

const produtos: Produto[] = [
  {
    id: "curso-basico",
    nome: "Curso Básico",
    descricao: "Acesso inicial aos conteúdos do AprendaJá.",
    preco: "R$ 19,90",
    tipo: "purchase",
  },
  {
    id: "suporte-premium",
    nome: "Suporte Premium",
    descricao: "Atendimento prioritário para dúvidas e pedidos.",
    preco: "R$ 9,90",
    tipo: "purchase",
  },
  {
    id: "servico-escolar",
    nome: "Serviço Escolar",
    descricao: "Pedido de apresentação, resumo ou material de estudo.",
    preco: "A combinar",
    tipo: "order",
  },
];

const whatsapp = "5585992686478";
const chavePix = "85 99268-6478";

function gerarMensagem(produto: Produto, compraId?: string, userId?: string) {
  return encodeURIComponent(
    `Olá! Quero comprar pelo AprendaJá.\n\nProduto: ${produto.nome}\nValor: ${produto.preco}\nID do usuário: ${userId || "preciso entrar na conta"}\nID da compra: ${compraId || "ainda não gerado"}\n\nJá vou mandar o comprovante por aqui.`
  );
}

export default function Pagamento() {
  const [produto, setProduto] = useState<Produto>(produtos[0]);
  const [loading, setLoading] = useState(false);
  const [compraId, setCompraId] = useState("");
  const [userId, setUserId] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const mensagem = useMemo(() => gerarMensagem(produto, compraId, userId), [produto, compraId, userId]);

  useEffect(() => {
    carregarUsuario();
  }, []);

  async function carregarUsuario() {
    const { data } = await supabase.auth.getUser();
    setUserId(data.user?.id ?? "");
  }

  async function copiar(texto: string, mensagemOk: string) {
    try {
      await navigator.clipboard.writeText(texto);
      setSucesso(mensagemOk);
    } catch {
      setErro("Não consegui copiar nesse navegador. Copie manualmente: " + texto);
    }
  }

  async function copiarPix() {
    await copiar(chavePix, "Chave Pix copiada. Depois do pagamento, clique em Registrar compra.");
  }

  async function copiarUserId() {
    if (!userId) {
      setErro("Entre na sua conta para gerar seu ID de usuário.");
      return;
    }

    await copiar(userId, "ID do usuário copiado. Envie esse ID junto com o comprovante no WhatsApp.");
  }

  async function registrarCompra() {
    setErro("");
    setSucesso("");
    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      setLoading(false);
      setErro("Entre na sua conta antes de registrar uma compra.");
      return;
    }

    setUserId(userData.user.id);

    const { data: thread, error: threadError } = await supabase
      .from("chat_threads")
      .insert({
        user_id: userData.user.id,
        type: produto.tipo,
        title: produto.tipo === "purchase" ? `Compra - ${produto.nome}` : `Pedido - ${produto.nome}`,
        status: produto.tipo === "purchase" ? "em análise" : "pendente",
        course_id: produto.id,
        course_title: produto.nome,
        price: produto.preco,
        total_price: produto.preco,
      })
      .select("id")
      .single();

    if (threadError) {
      setLoading(false);
      setErro("Erro ao registrar compra: " + threadError.message);
      return;
    }

    const { error: messageError } = await supabase.from("chat_messages").insert({
      thread_id: thread.id,
      user_id: userData.user.id,
      content:
        produto.tipo === "purchase"
          ? `🛒 Compra registrada\n\nProduto: ${produto.nome}\nValor: ${produto.preco}\nID do usuário: ${userData.user.id}\nID da compra: ${thread.id}\nStatus: aguardando confirmação do Pix.\n\nEnvie o comprovante pelo WhatsApp informando o ID do usuário e o ID da compra para o ADM liberar o acesso.`
          : `📦 Pedido registrado\n\nProduto: ${produto.nome}\nValor: ${produto.preco}\nID do usuário: ${userData.user.id}\nID do pedido: ${thread.id}\nStatus: pendente.\n\nO ADM/DEV vai combinar os detalhes pelo chat ou WhatsApp.`,
    });

    if (messageError) {
      setLoading(false);
      setErro("A compra foi criada, mas deu erro ao salvar a mensagem: " + messageError.message);
      setCompraId(thread.id);
      return;
    }

    setCompraId(thread.id);
    setLoading(false);
    setSucesso("Compra registrada. Agora envie o comprovante no WhatsApp com seu ID de usuário e o ID da compra.");
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-blue-500/10 backdrop-blur-2xl md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-300">Pagamento manual seguro</p>
        <h1 className="mt-3 text-3xl font-black text-white md:text-5xl">Comprar no AprendaJá</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Escolha o produto, pague no Pix, registre a compra e envie o comprovante com seu ID de usuário. O ADM confere e libera seu acesso pelo painel.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {produtos.map((item) => {
          const ativo = item.id === produto.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setProduto(item);
                setCompraId("");
                setErro("");
                setSucesso("");
              }}
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

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-black/50 p-6 backdrop-blur-xl">
          <h2 className="text-2xl font-black text-white">Resumo da compra</h2>
          <p className="mt-2 text-zinc-400">Produto escolhido: <span className="font-bold text-white">{produto.nome}</span></p>
          <p className="text-zinc-400">Valor: <span className="font-bold text-blue-300">{produto.preco}</span></p>
          <p className="mt-4 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4 text-sm text-blue-100">
            Chave Pix: <span className="font-black">{chavePix}</span>
          </p>

          <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-amber-100">
            <p className="font-black">Aviso importante</p>
            <p className="mt-1 text-amber-100/80">Ao enviar o comprovante no WhatsApp, informe também seu ID de usuário. Sem esse ID, o ADM pode demorar mais para liberar seu curso.</p>
            <p className="mt-3 break-all text-xs">Seu ID de usuário: <span className="font-black">{userId || "entre na conta para aparecer"}</span></p>
            <button onClick={copiarUserId} className="mt-3 rounded-xl bg-white px-4 py-2 text-xs font-black text-black transition active:scale-95">Copiar meu ID</button>
          </div>

          {compraId && (
            <p className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
              ID da compra: <span className="font-black">{compraId}</span>
            </p>
          )}

          {erro && <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-100">{erro}</p>}
          {sucesso && <p className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">{sucesso}</p>}

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <button onClick={copiarPix} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-center font-black text-white transition hover:bg-white/[0.08] active:scale-95">Copiar chave Pix</button>
            <button onClick={registrarCompra} disabled={loading} className="rounded-2xl bg-white px-5 py-4 text-center font-black text-black shadow-lg shadow-blue-500/20 transition hover:scale-[1.01] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Registrando..." : compraId ? "Registrar outra compra" : "Registrar compra"}</button>
          </div>

          <a href={`https://wa.me/${whatsapp}?text=${mensagem}`} target="_blank" rel="noreferrer" className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-4 text-center font-black text-emerald-100 transition hover:bg-emerald-500/15 active:scale-95">Enviar comprovante no WhatsApp</a>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
          <h3 className="text-2xl font-black text-white">Como funciona</h3>
          <div className="mt-5 space-y-3">
            {[
              ["1", "Escolha o produto."],
              ["2", "Copie a chave Pix e pague."],
              ["3", "Clique em Registrar compra."],
              ["4", "Envie o comprovante com seu ID de usuário."],
              ["5", "O ADM usa seu ID para liberar o curso certo."],
            ].map(([num, text]) => (
              <div key={num} className="flex gap-3 rounded-2xl border border-white/10 bg-black/35 p-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white font-black text-black">{num}</span>
                <p className="text-sm font-bold text-zinc-300">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-5 text-zinc-500">Anti-golpe: o acesso só é liberado depois do ADM conferir o Pix no banco. Nunca envie acesso antes de confirmar o pagamento.</p>
        </div>
      </div>
    </div>
  );
}
