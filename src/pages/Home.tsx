import type { Page } from "../App";
import { appConfig } from "../config/appConfig";

type HomeProps = { setPage: (page: Page) => void };

const actions: { title: string; desc: string; icon: string; page: Page; primary?: boolean }[] = [
  { title: "Abrir painel", desc: "Checklist, foco, notas, decisões e metas.", icon: "◈", page: "hub", primary: true },
  { title: "Resolver tarefa", desc: "Crie base para mensagem, resumo ou apresentação.", icon: "✦", page: "resolver" },
  { title: "Pedir pronto", desc: "Resumo, slide ou arte simples quando quiser economizar tempo.", icon: "⚡", page: "pedidos" },
];

const steps = ["Escolha uma ferramenta", "Use em segundos", "Copie, salve ou marque como feito"];

export default function Home({ setPage }: HomeProps) {
  const { brand, home } = appConfig;

  async function shareApp() {
    const text = `Achei um app simples pra organizar tarefa, criar checklist e resolver coisas rápidas: ${window.location.href}`;
    if (navigator.share) return navigator.share({ title: brand.name, text, url: window.location.href });
    await navigator.clipboard.writeText(text);
    alert("Texto copiado!");
  }

  return (
    <div className="space-y-6 pb-4">
      <section className="relative overflow-hidden rounded-[3rem] border border-violet-300/15 bg-[#020003] p-6 shadow-2xl shadow-violet-950/30 md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(168,85,247,0.34),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(124,58,237,0.16),transparent_32%)]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <span className="inline-flex rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">
            {home.eyebrow}
          </span>
          <h1 className="mt-6 text-5xl font-black leading-[0.92] tracking-[-0.08em] text-white md:text-7xl">
            {home.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-8 text-zinc-400 md:text-lg">
            {home.subtitle}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={() => setPage("hub")} className="rounded-2xl bg-white px-7 py-4 text-sm font-black text-black shadow-[0_0_38px_rgba(124,58,237,0.28)] transition hover:scale-[1.02] active:scale-95">
              Abrir painel agora
            </button>
            <button onClick={() => setPage("resolver")} className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-sm font-black text-zinc-200 transition hover:border-violet-300/40 hover:bg-violet-500/10 hover:text-white active:scale-95">
              Resolver tarefa
            </button>
          </div>
          <p className="mt-4 text-sm font-bold text-zinc-500">{home.helper}</p>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {actions.map((action) => (
          <button key={action.title} onClick={() => setPage(action.page)} className={`rounded-[2rem] border p-5 text-left transition active:scale-[0.99] ${action.primary ? "border-violet-300 bg-violet-300 text-black shadow-2xl shadow-violet-500/20" : "border-white/10 bg-white/[0.035] text-white hover:border-violet-300/35"}`}>
            <div className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${action.primary ? "bg-black/10" : "bg-violet-500/10 ring-1 ring-violet-300/15"}`}>{action.icon}</div>
            <h3 className="mt-4 text-xl font-black tracking-[-0.03em]">{action.title}</h3>
            <p className={`mt-2 text-sm font-semibold leading-6 ${action.primary ? "text-black/65" : "text-zinc-500"}`}>{action.desc}</p>
          </button>
        ))}
      </section>

      <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-6">
        <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Como funciona</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white">Sem curso. Sem certificado. Sem confusão.</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-zinc-400">É só um painel de utilidades para resolver coisas pequenas do dia a dia.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {steps.map((step, index) => <div key={step} className="rounded-2xl border border-white/10 bg-black/40 p-4"><p className="text-2xl font-black text-violet-300">0{index + 1}</p><p className="mt-2 text-sm font-black text-zinc-200">{step}</p></div>)}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Para voltar todo dia</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white">Checklist, foco e histórico.</h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-zinc-400">O app guarda suas tarefas e salvos no próprio aparelho, sem precisar de IA.</p>
          <button onClick={() => setPage("hub")} className="mt-5 rounded-2xl bg-violet-300 px-5 py-3 text-sm font-black text-black active:scale-95">Ir para o painel</button>
        </article>

        <article className="rounded-[2.5rem] border border-violet-300/15 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.2),transparent_38%),rgba(255,255,255,0.035)] p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Teste com alguém</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white">Se ajudou, compartilhe.</h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-zinc-400">Manda para uma pessoa e pergunta: “dá pra entender em 5 segundos?”</p>
          <button onClick={shareApp} className="mt-5 rounded-2xl border border-white/10 bg-white px-5 py-3 text-sm font-black text-black active:scale-95">Compartilhar</button>
        </article>
      </section>
    </div>
  );
}
