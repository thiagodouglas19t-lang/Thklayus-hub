import { useEffect, useMemo, useState } from "react";
import { appConfig } from "../config/appConfig";
import { supabase } from "../lib/supabase";
import { formatBrasiliaDateTime } from "../lib/date";

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

const pacotes = [
  { title: "Resumo simples", price: "R$ 5", desc: "Texto organizado para copiar e adaptar.", detail: "Quero um resumo simples. Tema: " },
  { title: "Slides simples", price: "R$ 10", desc: "Estrutura de slides com tópicos e conclusão.", detail: "Quero slides simples. Tema, quantidade e prazo: " },
  { title: "Apresentação caprichada", price: "R$ 15", desc: "Texto + roteiro de fala + organização visual.", detail: "Quero uma apresentação caprichada. Tema, estilo e prazo: " },
  { title: "Arte simples", price: "R$ 10", desc: "Post ou imagem simples para divulgação.", detail: "Quero uma arte simples. Texto, cores e prazo: " },
];

function normalize(value?: string | null) {
  return String(value ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function formatDate(value?: string) {
  return formatBrasiliaDateTime(value);
}

function statusInfo(pedido: Pedido) {
  const status = normalize(pedido.status);
  if (["compra aprovada", "compra finalizada", "pedido finalizado", "entregue", "resolvido", "respondido", "fechado"].includes(status)) {
    return { icon: "✓", label: "Finalizado", text: "Seu pedido foi finalizado ou respondido.", className: "border-violet-300/25 bg-violet-500/10 text-violet-100", action: "Ver suporte", page: "chat" };
  }
  if (["compra recusada", "recusado"].includes(status)) {
    return { icon: "!", label: "Atenção", text: "Não conseguimos confirmar esse pedido. Confira as informações ou abra suporte.", className: "border-red-400/25 bg-red-500/10 text-red-100", action: "Abrir suporte", page: "chat" };
  }
  if (["em analise", "pendente", "aberto", "em producao"].includes(status)) {
    return { icon: "•", label: "Em análise", text: "Pedido recebido. O ADM analisa e responde pelo app antes de começar.", className: "border-white/10 bg-white/[0.04] text-zinc-300", action: "Abrir suporte", page: "chat" };
  }
  return { icon: "◇", label: pedido.status || "Registrado", text: "Este registro está salvo dentro do app.", className: "border-white/10 bg-white/[0.04] text-zinc-300", action: "Ver ajuda", page: "ajuda" };
}

function openPage(page: string) {
  window.dispatchEvent(new CustomEvent("thklayus-open-page", { detail: page }));
}

export default function Pedidos() {
  const { tickets } = appConfig;
  const servicos = tickets.types;

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [nome, setNome] = useState("");
  const [servico, setServico] = useState(pacotes[0].title);
  const [detalhes, setDetalhes] = useState(pacotes[0].detail);
  const [prazo, setPrazo] = useState("");
  const [loading, setLoading] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => { carregarPedidos(); }, []);

  async function carregarPedidos() {
    setCarregando(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) { setCarregando(false); return; }
    const { data } = await supabase
      .from("chat_threads")
      .select("id,title,status,type,course_id,course_title,total_price,price,comprovante_url,created_at")
      .eq("user_id", userData.user.id)
      .in("type", ["order", "purchase", "ticket"])
      .order("created_at", { ascending: false });
    setPedidos((data ?? []) as Pedido[]);
    setCarregando(false);
  }

  function escolherPacote(pacote: (typeof pacotes)[number]) {
    setServico(pacote.title);
    setDetalhes(pacote.detail);
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

    const pacote = pacotes.find((item) => item.title === servico);
    const title = pacote ? `${pacote.title} • ${pacote.price}` : `Pedido: ${servico}`;

    const { data: thread, error } = await supabase
      .from("chat_threads")
      .insert({ user_id: userData.user.id, type: "order", title, status: "aberto", price: pacote?.price ?? null })
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
      content: `📦 Novo pedido no AprendaJá\n\nCliente: ${nome.trim()}\nPacote: ${servico}${pacote ? ` (${pacote.price})` : ""}\nPrazo desejado: ${prazo.trim() || "não informado"}\n\nDetalhes:\n${detalhes.trim()}\n\nImportante: combine valor, prazo e formato antes de começar.`,
    });

    setNome("");
    setServico(pacotes[0].title);
    setDetalhes(pacotes[0].detail);
    setPrazo("");
    setLoading(false);
    await carregarPedidos();
    alert("Pedido enviado! O ADM responde pelo app antes de começar.");
  }

  const personalizados = useMemo(() => pedidos.filter((item) => item.type === "order" || item.type === "ticket"), [pedidos]);
  const pendentes = pedidos.filter((i) => ["em analise", "pendente", "aberto", "em producao"].includes(normalize(i.status))).length;

  return (
    <div className="space-y-7">
      <section className="relative min-w-0 overflow-hidden rounded-[3rem] border border-violet-300/15 bg-[#030006] px-6 py-10 shadow-2xl shadow-violet-950/25 md:px-10 md:py-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.32),transparent_34%),radial-gradient(circle_at_12%_18%,rgba(124,58,237,0.20),transparent_30%),radial-gradient(circle_at_85%_45%,rgba(255,255,255,0.07),transparent_26%)]" />
        <div className="relative max-w-4xl">
          <span className="rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">Extra opcional • combinado antes</span>
          <h1 className="mt-7 text-5xl font-black leading-[0.95] tracking-[-0.08em] text-white md:text-7xl">Peça pronto quando quiser economizar tempo.</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300">Os modelos continuam grátis. Aqui é só para quem quer resumo, slide, arte ou apresentação feita com mais cuidado.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"><p className="text-sm text-zinc-500">Pendentes</p><p className="mt-1 text-3xl font-black text-white">{pendentes}</p></div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"><p className="text-sm text-zinc-500">A partir de</p><p className="mt-1 text-3xl font-black text-white">R$ 5</p></div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"><p className="text-sm text-zinc-500">Pedidos</p><p className="mt-1 text-3xl font-black text-white">{personalizados.length}</p></div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {pacotes.map((pacote) => (
          <button key={pacote.title} onClick={() => escolherPacote(pacote)} className={`rounded-[2rem] border p-5 text-left transition active:scale-95 ${servico === pacote.title ? "border-violet-300 bg-violet-300 text-black" : "border-white/10 bg-white/[0.035] text-white hover:border-violet-300/35"}`}>
            <p className="text-3xl font-black">{pacote.price}</p>
            <h2 className="mt-3 text-lg font-black">{pacote.title}</h2>
            <p className={`mt-2 text-sm leading-6 ${servico === pacote.title ? "text-black/65" : "text-zinc-500"}`}>{pacote.desc}</p>
          </button>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-[2.2rem] border border-violet-300/15 bg-violet-500/10 p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-200">Como funciona</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {["Você envia o pedido pelo app.", "O ADM confirma valor e prazo.", "Nada começa sem combinar antes.", "Você acompanha tudo pelo app."].map((item, index) => <div key={item} className="rounded-2xl border border-violet-300/15 bg-black/35 p-4"><p className="text-xl font-black text-violet-200">0{index + 1}</p><p className="mt-2 text-sm font-bold leading-6 text-zinc-300">{item}</p></div>)}
          </div>
        </section>

        <section className="rounded-[2.2rem] border border-white/10 bg-white/[0.035] p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">Exemplos rápidos</p>
          <div className="mt-4 grid gap-2">
            {tickets.examples.map((example) => <button key={example} onClick={() => setDetalhes(example)} className="rounded-2xl border border-white/10 bg-black/35 p-4 text-left text-sm font-bold leading-6 text-zinc-300 transition hover:border-violet-300/30 hover:bg-violet-500/10 active:scale-[0.99]">{example}</button>)}
          </div>
        </section>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-5 md:p-6">
          <span className="rounded-full border border-white/10 bg-black/35 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-zinc-400">Novo pedido</span>
          <h2 className="mt-5 text-3xl font-black text-white">Explique o que precisa.</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-500">Quanto mais claro você explicar, mais fácil fica confirmar preço, prazo e entrega.</p>

          <div className="mt-5 space-y-3">
            <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" className="w-full rounded-2xl border border-white/10 bg-black/45 px-4 py-4 text-sm font-bold text-white outline-none focus:border-violet-300/40" />
            <select value={servico} onChange={(e) => setServico(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/45 px-4 py-4 text-sm font-bold text-white outline-none focus:border-violet-300/40">{[...pacotes.map((p) => p.title), ...servicos].map((item) => <option key={item}>{item}</option>)}</select>
            <input value={prazo} onChange={(e) => setPrazo(e.target.value)} placeholder="Prazo desejado: ex. até sexta" className="w-full rounded-2xl border border-white/10 bg-black/45 px-4 py-4 text-sm font-bold text-white outline-none focus:border-violet-300/40" />
            <textarea value={detalhes} onChange={(e) => setDetalhes(e.target.value)} placeholder="Tema, quantidade, estilo, prazo, escola/trabalho e detalhes importantes..." className="min-h-36 w-full resize-none rounded-2xl border border-white/10 bg-black/45 px-4 py-4 text-sm font-bold text-white outline-none focus:border-violet-300/40" />
            <button onClick={criarPedido} disabled={loading} className="w-full rounded-3xl bg-white py-4 text-lg font-black text-black shadow-2xl shadow-violet-500/20 transition active:scale-95 disabled:opacity-60">{loading ? "Enviando..." : "Enviar pedido para análise"}</button>
            <p className="text-center text-xs font-semibold text-zinc-600">Você recebe resposta pelo app. Valor e prazo são combinados antes.</p>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-5 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <div><h2 className="text-3xl font-black text-white">Acompanhamento</h2><p className="mt-2 text-sm leading-6 text-zinc-500">Veja o que está aberto, em análise ou finalizado.</p></div>
            <button onClick={carregarPedidos} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-black">Atualizar</button>
          </div>

          <div className="mt-5 space-y-3">
            {carregando ? <div className="rounded-3xl border border-white/10 bg-black/35 p-6 text-zinc-400">Carregando...</div> : pedidos.length === 0 ? <div className="rounded-3xl border border-white/10 bg-black/35 p-6 text-zinc-500">Nenhum pedido registrado ainda.</div> : pedidos.map((pedido) => {
              const info = statusInfo(pedido);
              return <article key={pedido.id} className="rounded-[2rem] border border-white/10 bg-black/35 p-4"><div className="flex items-start gap-4"><div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border text-xl font-black ${info.className}`}>{info.icon}</div><div className="min-w-0 flex-1"><p className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-600">{formatDate(pedido.created_at)} BRT • Pedido</p><h3 className="mt-1 text-lg font-black text-white">{pedido.course_title || pedido.title}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{info.text}</p>{(pedido.total_price || pedido.price) && <p className="mt-2 text-xs font-bold text-zinc-500">Valor: <span className="text-zinc-300">{pedido.total_price || pedido.price}</span></p>}<button onClick={() => openPage(info.page)} className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black text-zinc-300">{info.action}</button></div></div></article>;
            })}
          </div>
        </section>
      </section>
    </div>
  );
}
