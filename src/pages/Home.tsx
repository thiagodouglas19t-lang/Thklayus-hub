import { useEffect, useState } from "react";
import type { Page } from "../App";
import { appConfig } from "../config/appConfig";

type HomeProps = { setPage: (page: Page) => void };
type LastAction = { title: string; description: string; page: Page; createdAt: string };
type SmartNudge = { title: string; description: string; page: Page; label: string };
type QuickReady = { title: string; description: string; page: Page; icon: string };

const steps = ["Escolha o modelo", "Copie a base", "Adapte e entregue"];
const LAST_ACTION_KEY = "aprendaja_last_action_v1";

const quickReady: QuickReady[] = [
  { title: "Currículo primeiro emprego", description: "Base pronta para quem ainda não tem experiência.", page: "modelos", icon: "📄" },
  { title: "Resumo escolar", description: "Estrutura simples para explicar qualquer tema.", page: "modelos", icon: "📝" },
  { title: "Mensagem para professor", description: "Texto educado para atraso, entrega ou dúvida.", page: "modelos", icon: "💬" },
  { title: "Pedido de orçamento", description: "Mensagem rápida para perguntar preço e prazo.", page: "modelos", icon: "⚡" },
];

function readLastAction(): LastAction | null {
  try { const saved = localStorage.getItem(LAST_ACTION_KEY); return saved ? JSON.parse(saved) : null; } catch { return null; }
}

function saveLastAction(action: LastAction) {
  try { localStorage.setItem(LAST_ACTION_KEY, JSON.stringify(action)); } catch { return; }
}

function getSmartNudge(action: LastAction | null): SmartNudge {
  if (!action) return { title: "Comece com uma tarefa pequena", description: "Abra um modelo pronto, copie a base e adapte em poucos minutos.", page: "modelos", label: "Ver modelos" };
  if (action.page === "modelos") return { title: "Transforme um modelo em entrega pronta", description: "Pegue a base que você viu e use o Resolver para adaptar do seu jeito.", page: "resolver", label: "Adaptar no Resolver" };
  if (action.page === "resolver") return { title: "Quer uma versão mais caprichada?", description: "Depois de gerar a base, você pode pedir uma entrega pronta pelo suporte.", page: "pedidos", label: "Pedir pronto" };
  if (action.page === "pedidos") return { title: "Enquanto espera, use um modelo grátis", description: "Você pode continuar resolvendo outras tarefas com modelos rápidos.", page: "modelos", label: "Abrir modelos" };
  return { title: "Faça a próxima tarefa em menos tempo", description: "Use uma base pronta e evite começar do zero de novo.", page: "resolver", label: "Resolver agora" };
}

export default function Home({ setPage }: HomeProps) {
  const { brand, home, product, services } = appConfig;
  const [lastAction, setLastAction] = useState<LastAction | null>(null);

  useEffect(() => { setLastAction(readLastAction()); }, []);

  const smartNudge = getSmartNudge(lastAction);

  function go(page: Page, title: string, description: string) {
    const action = { title, description, page, createdAt: new Date().toISOString() };
    saveLastAction(action);
    setLastAction(action);
    setPage(page);
  }

  const actions: { title: string; desc: string; icon: string; page: Page; primary?: boolean }[] = [
    { title: "Usar modelos", desc: "Currículo, apresentação, mensagem, checklist e bases prontas.", icon: "◇", page: "modelos", primary: true },
    { title: "Resolver tarefa", desc: "Digite uma situação e receba uma base rápida para adaptar.", icon: "✦", page: "resolver" },
    { title: "Pedir pronto", desc: "Peça resumo, slide, arte simples ou apresentação feita.", icon: "⚡", page: "pedidos" },
  ];

  async function shareApp() {
    const text = `Achei o ${brand.name}, um app simples para resolver tarefas rápidas com modelos prontos: ${window.location.href}`;
    if (navigator.share) return navigator.share({ title: brand.name, text, url: window.location.href });
    await navigator.clipboard.writeText(text);
    alert("Texto copiado!");
  }

  return (
    <div className="space-y-5 pb-4">
      <section className="relative min-w-0 overflow-hidden rounded-[2.5rem] border border-violet-300/15 bg-[#020003] p-6 shadow-2xl shadow-violet-950/30 md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(168,85,247,0.34),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(124,58,237,0.16),transparent_32%)]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <span className="inline-flex rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-violet-100">{home.eyebrow}</span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-[0.96] tracking-[-0.07em] text-white md:text-7xl">Resolva tarefas com modelos prontos.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm font-semibold leading-7 text-zinc-400 md:text-lg md:leading-8">Escolha uma base pronta para currículo, apresentação, mensagem, resumo ou checklist. Copie, adapte e use em minutos.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={() => go("modelos", "Usar modelos", "Voltar para a biblioteca de modelos prontos.")} className="w-full rounded-2xl bg-white px-7 py-4 text-sm font-black text-black shadow-[0_0_38px_rgba(124,58,237,0.28)] transition hover:scale-[1.02] active:scale-95 sm:w-auto">Começar pelos modelos</button>
            <button onClick={() => go("resolver", "Resolver tarefa", "Gerar uma base rápida para copiar e adaptar.")} className="w-full rounded-2xl border border-white/10 bg-transparent px-7 py-4 text-sm font-black text-zinc-300 transition hover:border-violet-300/40 hover:bg-violet-500/10 hover:text-white active:scale-95 sm:w-auto">Resolver uma tarefa</button>
          </div>
          <p className="mt-4 text-sm font-bold text-zinc-500">Ao clicar em começar, você entra na biblioteca de modelos prontos.</p>
        </div>
      </section>

      <section className="rounded-[2.2rem] border border-white/10 bg-white/[0.035] p-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Prontos do dia</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-white">Comece por algo útil agora.</h2>
          </div>
          <button onClick={() => go("modelos", "Prontos do dia", "Abrir modelos mais úteis para hoje.")} className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-black">Ver todos</button>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickReady.map((item) => (
            <button key={item.title} onClick={() => go(item.page, item.title, item.description)} className="rounded-[1.7rem] border border-white/10 bg-black/35 p-4 text-left transition hover:border-violet-300/35 hover:bg-violet-500/10 active:scale-[0.99]">
              <p className="text-3xl">{item.icon}</p>
              <h3 className="mt-3 text-lg font-black leading-tight text-white">{item.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-zinc-500">{item.description}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {lastAction && <article className="rounded-[2rem] border border-violet-300/20 bg-violet-500/10 p-5"><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-200">Continuar de onde parou</p><h2 className="mt-2 text-2xl font-black text-white">{lastAction.title}</h2><p className="mt-1 text-sm font-semibold text-zinc-400">{lastAction.description}</p></div><button onClick={() => setPage(lastAction.page)} className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-black">Continuar agora</button></div></article>}
        <article className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5"><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Próxima melhor ação</p><h2 className="mt-2 text-2xl font-black text-white">{smartNudge.title}</h2><p className="mt-1 text-sm font-semibold text-zinc-400">{smartNudge.description}</p><button onClick={() => go(smartNudge.page, smartNudge.title, smartNudge.description)} className="mt-4 rounded-2xl bg-violet-300 px-5 py-3 text-sm font-black text-black">{smartNudge.label}</button></article>
      </section>

      <section className="grid min-w-0 gap-3 md:grid-cols-3">{actions.map((action) => <button key={action.title} onClick={() => go(action.page, action.title, action.desc)} className={`min-w-0 rounded-[1.8rem] border p-5 text-left transition active:scale-[0.99] ${action.primary ? "border-violet-300 bg-violet-300 text-black shadow-2xl shadow-violet-500/20" : "border-white/10 bg-white/[0.035] text-white hover:border-violet-300/35"}`}><div className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${action.primary ? "bg-black/10" : "bg-violet-500/10 ring-1 ring-violet-300/15"}`}>{action.icon}</div><h3 className="mt-4 text-xl font-black tracking-[-0.03em]">{action.title}</h3><p className={`mt-2 text-sm font-semibold leading-6 ${action.primary ? "text-black/65" : "text-zinc-500"}`}>{action.desc}</p></button>)}</section>

      <section className="min-w-0 rounded-[2.2rem] border border-white/10 bg-white/[0.035] p-6"><div className="grid min-w-0 gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-center"><div className="min-w-0"><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Como funciona</p><h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white">Você não precisa começar do zero.</h2><p className="mt-3 text-sm font-semibold leading-7 text-zinc-400">O AprendaJá te entrega uma base pronta para adaptar com suas palavras.</p></div><div className="grid min-w-0 gap-2 sm:grid-cols-3">{steps.map((step, index) => <div key={step} className="min-w-0 rounded-2xl border border-white/10 bg-black/40 p-4"><p className="text-2xl font-black text-violet-300">0{index + 1}</p><p className="mt-2 text-sm font-black text-zinc-200">{step}</p></div>)}</div></div></section>

      <section className="grid min-w-0 gap-4 lg:grid-cols-3">{home.features.map((feature) => <article key={feature.title} className="min-w-0 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-500/10 text-2xl ring-1 ring-violet-300/15">{feature.icon}</div><h2 className="mt-4 text-2xl font-black tracking-[-0.05em] text-white">{feature.title}</h2><p className="mt-2 text-sm font-semibold leading-6 text-zinc-500">{feature.desc}</p></article>)}</section>

      <section className="grid min-w-0 gap-4 lg:grid-cols-2"><article className="min-w-0 rounded-[2.2rem] border border-white/10 bg-white/[0.035] p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Mais usados</p><h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white">Categorias rápidas</h2><p className="mt-3 text-sm font-semibold leading-7 text-zinc-400">Escolha uma categoria e vá direto para modelos prontos de uso.</p><div className="mt-5 flex min-w-0 flex-wrap gap-2">{home.categories.map((category) => <button key={category} onClick={() => go("modelos", category, "Abrir modelos dessa categoria.")} className="rounded-full border border-violet-300/15 bg-violet-500/10 px-4 py-2 text-xs font-black text-violet-100 transition hover:border-violet-300/40 hover:bg-violet-500/20 active:scale-95">{category}</button>)}</div><p className="mt-4 text-xs font-bold text-zinc-600">Toque em uma categoria para abrir a biblioteca.</p></article><article className="min-w-0 rounded-[2.2rem] border border-violet-300/15 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.2),transparent_38%),rgba(255,255,255,0.035)] p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Extra opcional</p><h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white">{services.title}</h2><p className="mt-3 text-sm font-semibold leading-7 text-zinc-400">{services.subtitle}</p><div className="mt-5 flex flex-col gap-3 sm:flex-row"><button onClick={() => go("pedidos", "Pedir pronto", "Abrir pedidos para solicitar ajuda pronta.")} className="rounded-2xl bg-violet-300 px-5 py-3 text-sm font-black text-black active:scale-95">{services.primaryAction}</button><button onClick={shareApp} className="rounded-2xl border border-white/10 bg-transparent px-5 py-3 text-sm font-black text-zinc-300 active:scale-95">Compartilhar app</button></div></article></section>

      <section className="min-w-0 rounded-[2.2rem] border border-white/10 bg-black/50 p-5 text-center"><p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-600">{brand.company}</p><p className="mt-2 text-sm font-bold text-zinc-500">{brand.name} — {product.promise}</p></section>
    </div>
  );
}
