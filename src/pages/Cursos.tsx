import { useMemo, useState } from "react";
import { quickCategories, quickKits } from "../data/quickKits";

export default function Cursos() {
  const [categoria, setCategoria] = useState("Hoje");
  const [busca, setBusca] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const filtrados = useMemo(() => {
    const termo = busca.toLowerCase().trim();
    return quickKits.filter((item) => {
      const matchCategoria = categoria === "Hoje" || item.category === categoria;
      const matchBusca = !termo || `${item.title} ${item.description} ${item.category} ${item.text}`.toLowerCase().includes(termo);
      return matchCategoria && matchBusca;
    });
  }, [categoria, busca]);

  async function copiar(id: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1400);
  }

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[3rem] border border-violet-300/15 bg-[#030006] px-6 py-10 text-center shadow-2xl shadow-violet-950/30 md:px-10 md:py-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.34),transparent_34%),radial-gradient(circle_at_12%_18%,rgba(124,58,237,0.22),transparent_30%)]" />
        <div className="relative mx-auto max-w-4xl">
          <span className="rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">Modelos prontos</span>
          <h1 className="mt-7 text-5xl font-black leading-[0.95] tracking-[-0.08em] text-white md:text-7xl">Copie uma base e adapte.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">Nada de curso. Nada de certificado. Só modelos rápidos para mensagem, escola, divulgação, organização e ideias.</p>
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-4 md:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar modelo..." className="min-h-12 rounded-2xl border border-white/10 bg-black/45 px-4 text-sm font-bold text-white outline-none placeholder:text-zinc-600 focus:border-violet-300/40" />
          <div className="flex gap-2 overflow-x-auto pb-1">
            {quickCategories.map((cat) => <button key={cat} onClick={() => setCategoria(cat)} className={`whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-black transition active:scale-95 ${categoria === cat ? "bg-white text-black" : "border border-white/10 bg-black/35 text-zinc-400 hover:text-white"}`}>{cat}</button>)}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtrados.slice(0, 36).map((item) => (
          <article key={item.id} className="group rounded-[2rem] border border-white/10 bg-black/45 p-5 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-violet-300/35">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">{item.category}</p>
                <h3 className="mt-2 text-2xl font-black leading-tight text-white">{item.title}</h3>
              </div>
              <button onClick={() => copiar(item.id, item.text)} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-black active:scale-95">{copied === item.id ? "Copiado" : "Copiar"}</button>
            </div>
            <p className="mt-3 text-sm font-semibold text-zinc-500">{item.description}</p>
            <p className="mt-4 whitespace-pre-line rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-4 text-sm font-semibold leading-7 text-zinc-200">{item.text}</p>
          </article>
        ))}
      </section>

      {filtrados.length === 0 && <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center text-zinc-500">Nenhum modelo encontrado.</div>}
    </div>
  );
}
