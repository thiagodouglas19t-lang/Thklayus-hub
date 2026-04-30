import { useMemo, useState } from "react";
import { feedCategories, feedItems, getTodayItems, type FeedCategory, type FeedItem } from "../lib/feedItems";

export default function Home({ setPage }: { setPage: (page: any) => void }) {
  const [active, setActive] = useState<FeedCategory>("Hoje");
  const [toast, setToast] = useState("");

  const items = useMemo(() => {
    if (active === "Hoje") return getTodayItems();
    return feedItems.filter((item) => item.category === active);
  }, [active]);

  async function copyItem(item: FeedItem) {
    await navigator.clipboard.writeText(item.content);
    setToast("Copiado. Agora é só colar onde quiser.");
    window.setTimeout(() => setToast(""), 1600);
  }

  function openResolver(item: FeedItem) {
    try {
      localStorage.setItem("aprendaja_quick_prompt", item.title);
    } catch {
      // ignore
    }
    setPage("gratis");
  }

  return (
    <div className="space-y-6 pb-4">
      {toast && (
        <div className="fixed bottom-24 left-1/2 z-[90] w-[calc(100%-32px)] max-w-sm -translate-x-1/2 rounded-2xl bg-violet-300 px-5 py-3 text-center text-sm font-black text-black shadow-2xl shadow-violet-500/20">
          {toast}
        </div>
      )}

      <section className="relative overflow-hidden rounded-[2.6rem] border border-violet-300/15 bg-[#030006] p-5 shadow-2xl shadow-violet-950/30 md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(168,85,247,0.36),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(124,58,237,0.18),transparent_28%)]" />
        <div className="relative">
          <span className="inline-flex rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">
            Novo formato
          </span>

          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.92] tracking-[-0.08em] text-white md:text-7xl">
            Mural rápido de coisas prontas.
          </h1>

          <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-zinc-400 md:text-lg">
            Abra, escolha um card útil, copie e use. Sem IA, sem API, sem erro.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => setActive("Hoje")} className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-black active:scale-95">
              Ver cards de hoje
            </button>
            <button onClick={() => setPage("gratis")} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-black text-white active:scale-95">
              Abrir ferramenta antiga
            </button>
          </div>
        </div>
      </section>

      <section className="flex gap-2 overflow-x-auto pb-1">
        {feedCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={`shrink-0 rounded-2xl px-4 py-3 text-sm font-black transition active:scale-95 ${
              active === category ? "bg-violet-300 text-black" : "border border-white/10 bg-white/[0.04] text-zinc-400"
            }`}
          >
            {category}
          </button>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-xl shadow-black/20">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-violet-200">
                  {item.category}
                </span>
                <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-white">{item.title}</h2>
              </div>
              <button onClick={() => copyItem(item)} className="rounded-2xl bg-white px-3 py-2 text-sm font-black text-black active:scale-95">
                Copiar
              </button>
            </div>

            <p className="mt-3 text-sm font-semibold leading-6 text-zinc-500">{item.description}</p>

            <button onClick={() => copyItem(item)} className="mt-5 w-full rounded-3xl border border-white/10 bg-black/45 p-4 text-left active:scale-[0.99]">
              <pre className="line-clamp-6 whitespace-pre-wrap font-sans text-sm font-bold leading-6 text-zinc-300">{item.content}</pre>
            </button>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-bold text-zinc-500">
                  #{tag}
                </span>
              ))}
            </div>

            <button onClick={() => openResolver(item)} className="mt-4 w-full rounded-2xl border border-violet-300/20 bg-violet-500/10 px-4 py-3 text-sm font-black text-violet-100 active:scale-95">
              Adaptar esse modelo
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}
