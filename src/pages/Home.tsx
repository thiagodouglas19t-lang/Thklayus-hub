import type { Page } from "../App";
import { appConfig } from "../config/appConfig";

type HomeProps = {
  setPage: (page: Page) => void;
};

export default function Home({ setPage }: HomeProps) {
  const { brand, home, navigation, services, models } = appConfig;

  return (
    <div className="space-y-6 pb-4">
      <section className="relative overflow-hidden rounded-[3rem] border border-violet-300/15 bg-[#020003] p-6 shadow-2xl shadow-violet-950/30 md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(168,85,247,0.34),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(124,58,237,0.16),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%)]" />

        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">
              {home.eyebrow}
            </span>

            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.08em] text-white md:text-7xl">
              {home.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-zinc-400 md:text-lg">
              {home.subtitle}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setPage("resolver")}
                className="rounded-2xl bg-white px-6 py-4 text-sm font-black text-black shadow-[0_0_38px_rgba(124,58,237,0.28)] transition hover:scale-[1.02] active:scale-95"
              >
                {home.primaryAction || navigation.primaryAction}
              </button>

              <button
                onClick={() => setPage("cursos")}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-sm font-black text-zinc-200 transition hover:border-violet-300/40 hover:bg-violet-500/10 hover:text-white active:scale-95"
              >
                {navigation.modelsAction}
              </button>
            </div>

            <p className="mt-4 text-sm font-bold text-zinc-500">{home.helper}</p>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-black/45 p-5 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">{brand.company}</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-white">{brand.name}</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-zinc-400">{brand.tagline}</p>

            <div className="mt-5 grid grid-cols-2 gap-2">
              {home.categories.slice(0, 4).map((category) => (
                <button
                  key={category}
                  onClick={() => setPage("resolver")}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-left text-xs font-black leading-5 text-zinc-200 transition hover:border-violet-300/40 hover:bg-violet-500/10"
                >
                  {category}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {home.features.map((feature) => (
          <article key={feature.title} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-500/10 text-2xl ring-1 ring-violet-300/15">
              {feature.icon}
            </div>
            <h3 className="mt-4 text-xl font-black tracking-[-0.03em] text-white">{feature.title}</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-zinc-500">{feature.desc}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Foco</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white">{home.powerTitle}</h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-zinc-400">{home.powerText}</p>
        </article>

        <article className="rounded-[2.5rem] border border-violet-300/15 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.2),transparent_38%),rgba(255,255,255,0.035)] p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Experiência</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white">{home.feelingTitle}</h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-zinc-400">{home.feelingText}</p>
        </article>
      </section>

      <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Ações rápidas</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-white">Escolha uma tarefa.</h2>
          </div>
          <p className="max-w-md text-sm font-semibold leading-6 text-zinc-500">{home.categoryHint}</p>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {home.categories.map((category) => (
            <button
              key={category}
              onClick={() => setPage("resolver")}
              className="rounded-2xl border border-white/10 bg-black/40 p-4 text-left text-sm font-black text-zinc-200 transition hover:border-violet-300/40 hover:bg-violet-500/10 hover:text-white active:scale-[0.99]"
            >
              <span className="text-violet-300">✦</span> {category}
            </button>
          ))}
        </div>
      </section>

      {services.enabled && (
        <section className="rounded-[2.5rem] border border-white/10 bg-black/50 p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Extra opcional</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white">{services.title}</h2>
          <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-zinc-400">{services.subtitle}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => setPage("pedidos")} className="rounded-2xl bg-violet-300 px-6 py-4 text-sm font-black text-black active:scale-95">
              {services.primaryAction}
            </button>
            <button onClick={() => setPage("cursos")} className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-sm font-black text-zinc-200 active:scale-95">
              {models.title}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
