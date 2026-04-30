import { useState } from "react";
import { appConfig } from "../config/appConfig";

export default function Home({ setPage }: { setPage: (page: any) => void }) {
  const [quickPrompt, setQuickPrompt] = useState("");
  const home = appConfig.home;

  function startSolving(value?: string) {
    const prompt = value?.trim() || quickPrompt.trim();

    if (prompt) {
      try {
        localStorage.setItem("aprendaja_quick_prompt", prompt);
      } catch {
        // localStorage can fail in private mode. The app still opens the resolver.
      }
    }

    setPage("gratis");
  }

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[3rem] border border-violet-300/15 bg-[#020003] px-5 py-8 text-center shadow-2xl shadow-violet-950/30 md:px-10 md:py-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.38),transparent_34%),radial-gradient(circle_at_15%_15%,rgba(124,58,237,0.22),transparent_30%),radial-gradient(circle_at_85%_40%,rgba(255,255,255,0.08),transparent_26%)]" />
        <div className="pointer-events-none absolute left-1/2 top-24 h-44 w-80 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <div className="flex justify-center">
            <span className="rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">
              {home.eyebrow}
            </span>
          </div>

          <h1 className="mt-7 text-5xl font-black leading-[0.92] tracking-[-0.08em] text-white md:text-7xl">
            {home.title}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
            {home.subtitle}
          </p>

          <div className="mx-auto mt-8 max-w-2xl rounded-[2rem] border border-white/10 bg-black/55 p-2 shadow-2xl shadow-black/50 backdrop-blur">
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                value={quickPrompt}
                onChange={(event) => setQuickPrompt(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") startSolving();
                }}
                placeholder="Ex: mensagem pedindo desculpa, checklist de viagem..."
                className="min-h-14 flex-1 rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-5 text-sm font-bold text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-300/60 focus:bg-white/[0.07]"
              />

              <button
                onClick={() => startSolving()}
                className="min-h-14 rounded-[1.35rem] bg-white px-6 text-sm font-black text-black shadow-xl shadow-violet-500/25 transition hover:scale-[1.02] active:scale-95 sm:min-w-40"
              >
                {home.primaryAction}
              </button>
            </div>
          </div>

          <p className="mt-4 text-sm font-semibold text-zinc-500">{home.helper}</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {home.features.map((item) => (
          <article
            key={item.title}
            className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-xl shadow-black/20"
          >
            <p className="text-3xl">{item.icon}</p>
            <h3 className="mt-4 text-2xl font-black text-white">{item.title}</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-zinc-500">{item.desc}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-5 md:p-7">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Atalhos de 1 toque</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white">
            Sem pensar. Só escolha uma situação.
          </h2>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {home.categories.map((item) => (
            <button
              key={item}
              onClick={() => startSolving(item)}
              className="rounded-3xl border border-white/10 bg-black/45 p-5 text-left font-black text-zinc-100 transition hover:-translate-y-1 hover:border-violet-300/40 hover:bg-violet-500/10 active:scale-[0.98]"
            >
              {item}
              <p className="mt-2 text-xs font-semibold leading-5 text-zinc-500">
                {home.categoryHint}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2.5rem] border border-violet-300/20 bg-violet-500/10 p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-100">{home.powerTitle}</p>
          <h2 className="mt-2 text-3xl font-black text-white">Para quando você trava.</h2>
          <p className="mt-3 text-sm leading-7 text-violet-50/80">{home.powerText}</p>
        </div>

        <div className="rounded-[2.5rem] border border-white/10 bg-white p-6 text-black">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">Sensação final</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">{home.feelingTitle}</h2>
          <p className="mt-3 text-sm leading-7 text-zinc-700">{home.feelingText}</p>
        </div>
      </section>
    </div>
  );
}
