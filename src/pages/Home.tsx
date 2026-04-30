import type { Page } from "../App";
import { appConfig } from "../config/appConfig";

type HomeProps = { setPage: (page: Page) => void };

const actions: { title: string; desc: string; icon: string; page: Page; primary?: boolean }[] = [
  { title: "Ver modelos", desc: "Copie mensagens, resumos, propostas e cobranças.", icon: "◇", page: "cursos", primary: true },
  { title: "Draftar do zero", desc: "Digite um tema e gere uma base rápida.", icon: "✦", page: "resolver" },
  { title: "Pedir pronto", desc: "Resumo, slide ou arte simples quando quiser economizar tempo.", icon: "⚡", page: "pedidos" },
];

const steps = ["Escolha uma base", "Copie em segundos", "Adapte e envie"];

export default function Home({ setPage }: HomeProps) {
  const { brand, home } = appConfig;

  async function shareApp() {
    const text = `Achei o ${brand.name}, um app simples para copiar bases prontas de mensagem, resumo, proposta e cobrança: ${window.location.href}`;
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
            <button onClick={() => setPage("cursos")} className="rounded-2xl bg-white px-7 py-4 text-sm font-black text-black shadow-[0_0_38px_rgba(124,58,237,0.28)] transition hover:scale-[1.02] active:scale-95">
              Ver modelos agora
            </button>
            <button onClick={() => setPage("resolver")} className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-sm font-black text-zinc-200 transition hover:border-violet-300/40 hover:bg-violet-500/10 hover:text-white active:scale-95">
              Draftar do zero
            </button>
          </div>
          <p className="mt-4 text-sm font-bold text-zinc-500">{home.helper}</p>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {actions.map((action) => (
          <button key={action.title} onClick={() => setPage(action.page)} className={`rounded-[1.8rem] border p-5 text-left transition active:scale-[0.99] ${action.primary ? "border-violet-300 bg-violet-300 text-black shadow-2xl shadow-violet-500/20" : "border-white/10 bg-white/[0.035] text-white hover:border-violet-300/35"}`}>
            <div className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${action.primary ? "bg-black/10" : "bg-violet-500/10 ring-1 ring-violet-300/15"}`}>{action.icon}</div>
            <h3 className="mt-4 text-xl font-black tracking-[-0.03em]">{action.title}</h3>
            <p className={`mt-2 text-sm font-semibold leading-6 ${action.primary ? "text-black/65" : "text-zinc-500"}`}>{action.desc}</p>
          </button>
        ))}
      </section>

      <section className="rounded-[2.2rem] border border-white/10 bg-white/[0.035] p-6">
        <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Como funciona</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white">Sem curso. Sem enrolação.</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-zinc-400">O Drafta é para copiar uma base pronta, adaptar e seguir.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {steps.map((step, index) => <div key={step} className="rounded-2xl border border-white/10 bg-black/40 p-4"><p className="text-2xl font-black text-violet-300">0{index + 1}</p><p className="mt-2 text-sm font-black text-zinc-200">{step}</p></div>)}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-[2.2rem] border border-white/10 bg-white/[0.035] p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Comece pelo mais útil</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white">Cobrança, professor, proposta e resumo.</h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-zinc-400">Esses são os modelos principais do Beta. A meta é copiar rápido, não navegar muito.</p>
          <button onClick={() => setPage("cursos")} className="mt-5 rounded-2xl bg-violet-300 px-5 py-3 text-sm font-black text-black active:scale-95">Ver modelos</button>
        </article>

        <article className="rounded-[2.2rem] border border-violet-300/15 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.2),transparent_38%),rgba(255,255,255,0.035)] p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Teste com alguém</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white">Se ajudou, compartilhe.</h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-zinc-400">Manda para uma pessoa e pergunta: “dá pra entender em 5 segundos?”</p>
          <button onClick={shareApp} className="mt-5 rounded-2xl border border-white/10 bg-white px-5 py-3 text-sm font-black text-black active:scale-95">Compartilhar</button>
        </article>
      </section>
    </div>
  );
}
