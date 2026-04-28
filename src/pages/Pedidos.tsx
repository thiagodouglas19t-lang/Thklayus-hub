import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type Pedido = {
  id: string;
  title: string;
  status: string;
  type: "order" | "purchase" | "ticket";
  course_id?: string | null;
  course_title?: string | null;
  total_price?: string | null;
  price?: string | null;
  comprovante_url?: string | null;
  created_at?: string;
};

const servicos = [
  "Slide escolar simples",
  "Trabalho escolar completo",
  "Arte simples",
  "Resumo escolar",
  "Apresentação premium",
  "Mapa mental",
  "Cartaz escolar",
  "Correção e organização de trabalho",
];

function normalize(value?: string | null) {
  return String(value ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function formatDate(value?: string) {
  if (!value) return "Sem data";
  try {
    return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
  } catch {
    return "Sem data";
  }
}

function statusInfo(pedido: Pedido) {
  const status = normalize(pedido.status);

  if (["compra aprovada", "compra finalizada", "pedido finalizado", "entregue", "resolvido"].includes(status)) {
    return {
      icon: "✅",
      label: pedido.type === "purchase" ? "Aprovado" : "Finalizado",
      text: pedido.type === "purchase" ? "Pagamento confirmado. O curso deve aparecer em Meus Cursos." : "Seu pedido foi finalizado.",
      className: "border-emerald-400/25 bg-emerald-500/10 text-emerald-100",
      action: pedido.type === "purchase" ? "Ir para Meus Cursos" : "Ver suporte",
      page: pedido.type === "purchase" ? "estudo" : "suporte",
    };
  }

  if (["compra recusada", "recusado"].includes(status)) {
    return {
      icon: "⚠️",
      label: "Precisa de atenção",
      text: "Não conseguimos confirmar esse pagamento. Confira o comprovante ou abra suporte pelo app.",
      className: "border-red-400/25 bg-red-500/10 text-red-100",
      action: "Abrir suporte",
      page: "suporte",
    };
  }

  if (["em analise", "pendente", "aberto", "em producao"].includes(status)) {
    return {
      icon: "🟡",
      label: "Em análise",
      text: pedido.type === "purchase" ? "Comprovante recebido. Aguarde a conferência pelo ADM. Não precisa chamar no WhatsApp." : "Pedido recebido. Acompanhe por aqui e pelo suporte do app.",
      className: "border-amber-400/25 bg-amber-500/10 text-amber-100",
      action: pedido.type === "purchase" ? "Atualizar status" : "Abrir suporte",
      page: pedido.type === "purchase" ? "pedidos" : "suporte",
    };
  }

  return {
    icon: "📦",
    label: pedido.status || "Registrado",
    text: "Este registro está salvo dentro do app.",
    className: "border-white/10 bg-white/[0.04] text-zinc-300",
    action: "Ver ajuda",
    page: "ajuda",
  };
}

function openPage(page: string) {
  window.dispatchEvent(new CustomEvent("thklayus-open-page", { detail: page }));
}

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [nome, setNome] = useState("");
  const [servico, setServico] = useState(servicos[0]);
  const [detalhes, setDetalhes] = useState("");
  const [prazo, setPrazo] = useState("");
  const [loading, setLoading] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarPedidos();
  }, []);

  async function carregarPedidos() {
    setCarregando(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      setCarregando(false);
      return;
    }

    const { data } = await supabase
      .from("chat_threads")
      .select("id,title,status,type,course_id,course_title,total_price,price,comprovante_url,created_at")
      .eq("user_id", userData.user.id)
      .in("type", ["order", "purchase"])
      .order("created_at", { ascending: false });

    setPedidos((data ?? []) as Pedido[]);
    setCarregando(false);
  }

  async function criarPedido() {
    if (!nome.trim() || !detalhes.trim()) {
      alert("Preencha seu nome e os detalhes do pedido.");
      return;
    }

    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      alert("Entre na sua conta para criar um pedido.");
      setLoading(false);
      return;
    }

    const { data: thread, error } = await supabase
      .from("chat_threads")
      .insert({
        user_id: userData.user.id,
        type: "order",
        title: `Pedido: ${servico}`,
        status: "pendente",
      })
      .select()
      .single();

    if (error) {
      alert("Erro ao criar pedido: " + error.message);
      setLoading(false);
      return;
    }

    await supabase.from("chat_messages").insert({
      thread_id: thread.id,
      user_id: userData.user.id,
      content: `📦 Novo pedido\n\nCliente: ${nome.trim()}\nServiço: ${servico}\nPrazo desejado: ${prazo.trim() || "não informado"}\n\nDetalhes:\n${detalhes.trim()}\n\nAcompanhe tudo dentro do app. Não é necessário chamar no WhatsApp.`,
    });

    setNome("");
    setServico(servicos[0]);
    setDetalhes("");
    setPrazo("");
    setLoading(false);
    await carregarPedidos();
    alert("Pedido criado! Acompanhe pelo suporte do app.");
  }

  const compras = useMemo(() => pedidos.filter((item) => item.type === "purchase"), [pedidos]);
  const personalizados = useMemo(() => pedidos.filter((item) => item.type === "order"), [pedidos]);

  return (
    <div className="space-y-6">
      <section className="rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.16),transparent_34%),rgba(255,255,255,0.035)] p-6 md:p-9">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-200">Pedidos e compras</p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">Acompanhe tudo aqui.</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300">Compras, comprovantes, aprovações e pedidos personalizados ficam salvos no app. Não precisa chamar no WhatsApp.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-amber-400/20 bg-amber-500/10 p-5"><p className="text-sm text-amber-100/70">Compras em análise</p><p className="mt-1 text-3xl font-black text-amber-100">{compras.filter((i) => ["em analise", "pendente"].includes(normalize(i.status))).length}</p></div>
        <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-5"><p className="text-sm text-emerald-100/70">Cursos aprovados</p><p className="mt-1 text-3xl font-black text-emerald-100">{compras.filter((i) => ["compra aprovada", "compra finalizada"].includes(normalize(i.status))).length}</p></div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5"><p className="text-sm text-zinc-500">Pedidos personalizados</p><p className="mt-1 text-3xl font-black">{personalizados.length}</p></div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-zinc-950 p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-black text-white">Minhas compras</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-500">Veja se o pagamento está em análise, aprovado ou se precisa de atenção.</p>
          </div>
          <button onClick={carregarPedidos} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-black">Atualizar</button>
        </div>

        <div className="mt-5 grid gap-4">
          {carregando ? <div className="rounded-3xl border border-white/10 bg-black/35 p-6 text-zinc-400">Carregando...</div> : compras.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-black/35 p-6 text-zinc-500">Nenhuma compra registrada ainda.</div>
          ) : compras.map((pedido) => {
            const info = statusInfo(pedido);
            return (
              <article key={pedido.id} className="rounded-[2rem] border border-white/10 bg-black/35 p-5">
                <div className="grid gap-4 md:grid-cols-[1fr_240px] md:items-center">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">{formatDate(pedido.created_at)} • Compra</p>
                    <h3 className="mt-2 text-2xl font-black text-white">{pedido.course_title || pedido.title}</h3>
                    <p className="mt-2 text-sm text-zinc-400">Valor: <span className="font-black text-white">{pedido.total_price || pedido.price || "não informado"}</span></p>
                    {pedido.comprovante_url && <a href={pedido.comprovante_url} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-sm font-black text-amber-200 underline">Ver comprovante enviado</a>}
                  </div>
                  <div className={`rounded-[1.5rem] border p-4 ${info.className}`}>
                    <p className="text-3xl">{info.icon}</p>
                    <h4 className="mt-2 text-xl font-black">{info.label}</h4>
                    <p className="mt-2 text-sm leading-6 opacity-80">{info.text}</p>
                    <button onClick={() => info.page === "pedidos" ? carregarPedidos() : openPage(info.page)} className="mt-4 w-full rounded-2xl bg-white px-4 py-3 text-sm font-black text-black">{info.action}</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <section className="rounded-[2rem] border border-zinc-800 bg-gradient-to-br from-zinc-950 to-black p-6">
          <span className="rounded-full border border-zinc-800 px-4 py-2 text-xs font-black uppercase text-zinc-500">Pedidos personalizados</span>
          <h2 className="mt-5 text-3xl font-black">Criar pedido</h2>
          <p className="mt-2 text-sm text-zinc-400">Peça slides, artes, resumos e trabalhos. Tudo fica registrado no app.</p>

          <div className="mt-5 space-y-3">
            <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none" />
            <select value={servico} onChange={(e) => setServico(e.target.value)} className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none">
              {servicos.map((item) => <option key={item}>{item}</option>)}
            </select>
            <input value={prazo} onChange={(e) => setPrazo(e.target.value)} placeholder="Prazo desejado: ex. até sexta" className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none" />
            <textarea value={detalhes} onChange={(e) => setDetalhes(e.target.value)} placeholder="Explique o que você precisa..." className="min-h-32 w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none" />
            <button onClick={criarPedido} disabled={loading} className="w-full rounded-2xl bg-white py-3 font-black text-black disabled:opacity-60">{loading ? "Criando..." : "Enviar pedido pelo app"}</button>
          </div>
        </section>

        <section className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-3xl font-black">Meus pedidos</h2>
            <button onClick={carregarPedidos} className="rounded-xl border border-zinc-800 px-3 py-2 text-xs font-black text-zinc-400">Atualizar</button>
          </div>

          <div className="mt-5 space-y-3">
            {personalizados.length === 0 ? (
              <p className="text-zinc-500">Nenhum pedido personalizado criado.</p>
            ) : (
              personalizados.map((pedido) => {
                const info = statusInfo(pedido);
                return (
                  <div key={pedido.id} className="rounded-2xl border border-zinc-800 bg-black p-4">
                    <p className="font-black">{pedido.title}</p>
                    <p className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase ${info.className}`}>{info.label}</p>
                    <p className="mt-3 text-xs leading-5 text-zinc-500">{info.text}</p>
                    <button onClick={() => openPage("suporte")} className="mt-3 rounded-xl border border-white/10 px-4 py-2 text-xs font-black text-zinc-300">Abrir suporte</button>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </section>
    </div>
  );
}
