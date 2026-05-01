import type { Page } from "../App";
import { appConfig } from "../config/appConfig";

type HomeProps = { setPage: (page: Page) => void };

const steps = ["Escolha uma situação", "Copie uma base", "Adapte e use"];

export default function Home({ setPage }: HomeProps) {
  const { brand, home, product, navigation, services } = appConfig;

  const actions: { title: string; desc: string; icon: string; page: Page; primary?: boolean }[] = [
    {
      title: navigation.modelsAction,
      desc: "Mensagens, resumos, propostas, checklists e roteiros prontos.",
      icon: "◇",
      page: "modelos",
      primary: true,
    },
    {
      title: "Resolver tarefa",
      desc: "Digite uma situação e crie uma base rápida para adaptar.",
      icon: "✦",
      page: "resolver",
    },
    {
      title: "Pedidos e suporte",
      desc: "Peça ajuda, resumo, slide, arte simples ou apresentação pronta.",
      icon: "⚡",
      page: "pedidos",
    },
  ];

  async function shareApp() {
    const text = `Achei o ${brand.name}, um app simples para resolver tarefas rápidas com modelos prontos: ${window.location.href}`;
    if (navigator.share) return navigator.share({ title: brand.name, text, url: window.location.href });
    await navigator.clipboard.writeText(text);
    alert("Texto copiado!");
  }

  return (
    <div className="space-y-5 pb-4">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-violet-300/15 bg-[#020003] p-6 shadow-2xl shadow-violet-950/30 md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(168,85,247,0.34),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(124,58,237,0.16),transparent_32%)]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <span className="inline-flex rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-violet-100">
            {home.eyebrow}
          </span>

          <h1 className="mt-6 text-4xl font-black leading-[0.95] tracking-[-0.08em] text-white md:text-7xl">
            {home.title}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm font-semibold leading-7 text-zinc-400 md:text-lg md:leading-8">
            {home.subtitle}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => setPage("modelos")}
              className="rounded-2xl bg-white px-7 py-4 text-sm font-black text-black shadow-[0_0_38px_rgba(124,58,237,0.28)] transition hover:scale-[1.02] active:scale-95"
            >
              {home.primaryAction}
            </button>
            <button
              onClick={() => setPage("pedidos")}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-sm font-black text-zinc-200 transition hover:border-violet-300/40 hover:bg-violet-500/10 hover:text-white active:scale-95"
            >
              {navigation.helpAction}
            </button>
          </div>

          <p className="mt-4 text-sm font-bold text-zinc-500">{home.helper}</p>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={() => setPage(action.page)}
            className={`rounded-[1.8rem] border p-5 text-left transition active:scale-[0.99] ${
              action.primary
                ? "border-violet-300 bg-violet-300 text-black shadow-2xl shadow-violet-500/20"
                : "border-white/10 bg-white/[0.035] text-white hover:border-violet-300/35"
            }`}
          >
            <div className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${action.primary ? "bg-black/10" : "bg-violet-500/10 ring-1 ring-violet-300/15"}`}>
              {action.icon}
            </div>
            <h3 className="mt-4 text-xl font-black tracking-[-0.03em]">{action.title}</h3>
            <p className={`mt-2 text-sm font-semibold leading-6 ${action.primary ? "text-black/65" : "text-zinc-500"}`}>{action.desc}</p>
          </button>
        ))}
      </section>

      <section className="rounded-[2.2rem] border border-white/10 bg-white/[0.035] p-6">
        <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Como funciona</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white">{home.feelingTitle}</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-zinc-400">{home.feelingText}</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <p className="text-2xl font-black text-violet-300">0{index + 1}</p>
                <p className="mt-2 text-sm font-black text-zinc-200">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {home.features.map((feature) => (
          <article key={feature.title} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-500/10 text-2xl ring-1 ring-violet-300/15">{feature.icon}</div>
            <h2 className="mt-4 text-2xl font-black tracking-[-0.05em] text-white">{feature.title}</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-zinc-500">{feature.desc}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-[2.2rem] border border-white/10 bg-white/[0.035] p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">{home.powerTitle}</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white">Categorias rápidas</h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-zinc-400">{home.powerText}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {home.categories.map((category) => (
              <button
                key={category}
                onClick={() => setPage("modelos")}
                className="rounded-full border border-violet-300/15 bg-violet-500/10 px-4 py-2 text-xs font-black text-violet-100 transition hover:border-violet-300/40 hover:bg-violet-500/20 active:scale-95"
              >
                {category}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs font-bold text-zinc-600">{home.categoryHint}</p>
        </article>

        <article className="rounded-[2.2rem] border border-violet-300/15 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.2),transparent_38%),rgba(255,255,255,0.035)] p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Extra opcional</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white">{services.title}</h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-zinc-400">{services.subtitle}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => setPage("pedidos")} className="rounded-2xl bg-violet-300 px-5 py-3 text-sm font-black text-black active:scale-95">
              {services.primaryAction}
            </button>
            <button onClick={shareApp} className="rounded-2xl border border-white/10 bg-white px-5 py-3 text-sm font-black text-black active:scale-95">
              Compartilhar
            </button>
          </div>
        </article>
      </section>

      <section className="rounded-[2.2rem] border border-white/10 bg-black/50 p-5 text-center">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-600">{brand.company}</p>
        <p className="mt-2 text-sm font-bold text-zinc-500">{brand.name} — {product.promise}</p>
      </section>
    </div>
  );
}
