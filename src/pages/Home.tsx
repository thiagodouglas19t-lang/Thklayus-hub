const features = [
  { title: "Ideias rápidas", desc: "Sugestões curtas para usar quando bater branco.", icon: "⚡" },
  { title: "Textos copiáveis", desc: "Mensagens prontas para adaptar e mandar em segundos.", icon: "✍️" },
  { title: "Modelos prontos", desc: "Checklists, apresentações e estruturas simples para copiar.", icon: "◈" },
  { title: "Compartilhe fácil", desc: "Se algo ajudar, mande para alguém com um toque.", icon: "🤝" },
];

const userFlow = [
  ["1", "Escolha", "Abra uma categoria ou pegue a ideia do dia."],
  ["2", "Copie", "Use o texto, modelo ou checklist como base."],
  ["3", "Adapte", "Troque o tema, nome ou detalhes do seu jeito."],
  ["4", "Volte", "Novas ideias e modelos ajudam no próximo dia."],
];

const contentIdeas = ["Frases prontas", "Ideias de renda", "Modelos de apresentação", "Checklists úteis", "Legendas prontas", "Apresentações e escola", "Dicas de organização", "Mensagens para WhatsApp"];

export default function Home({ setPage }: { setPage: (page: any) => void }) {
  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2.7rem] border border-white/10 bg-[#020203] p-6 shadow-2xl shadow-black/70 md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(124,58,237,0.34),transparent_36%),radial-gradient(circle_at_85%_10%,rgba(245,158,11,0.16),transparent_30%),radial-gradient(circle_at_65%_100%,rgba(34,197,94,0.12),transparent_34%)]" />
        <div className="relative grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">THKLAYUS Hub</span>
              <span className="rounded-full border border-emerald-300/25 bg-emerald-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-100">Grátis e rápido</span>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.06em] md:text-7xl">Copie ideias, textos e modelos prontos em segundos.</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300">Use frases, checklists, modelos e ideias rápidas para escola, WhatsApp, organização e pequenos projetos. Abra, copie, adapte e pronto.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setPage("gratis")} className="rounded-2xl bg-white px-6 py-4 font-black text-black shadow-lg shadow-violet-500/25 transition hover:scale-[1.03] active:scale-95">Explorar grátis</button>
              <button onClick={() => setPage("cursos")} className="rounded-2xl border border-violet-300/20 bg-violet-500/10 px-6 py-4 font-black text-violet-100 transition hover:bg-violet-500/15 active:scale-95">Ver modelos</button>
              <button onClick={() => setPage("gratis")} className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 font-black text-zinc-200 transition hover:bg-white/[0.08] active:scale-95">Compartilhar</button>
            </div>
          </div>
          <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/50 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-200">Como usar</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">Escolha, copie, adapte e volte depois.</h2>
            <div className="mt-5 space-y-3">
              {userFlow.map(([n,t,d]) => <div key={n} className="flex gap-3 rounded-2xl border border-white/10 bg-black/40 p-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white font-black text-black">{n}</div><div><h3 className="font-black text-white">{t}</h3><p className="mt-1 text-sm leading-6 text-zinc-500">{d}</p></div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {features.map((item) => <article key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5"><p className="text-3xl">{item.icon}</p><h3 className="mt-3 text-xl font-black text-white">{item.title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-zinc-500">{item.desc}</p></article>)}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Conteúdo útil</p><h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">Coisas rápidas para copiar e usar</h2></div>
          <button onClick={() => setPage("gratis")} className="rounded-2xl bg-white px-5 py-3 font-black text-black">Abrir feed grátis</button>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contentIdeas.map((item) => <button key={item} onClick={() => setPage("gratis")} className="rounded-2xl border border-white/10 bg-black/45 p-4 text-left font-black text-zinc-200 transition hover:-translate-y-1 hover:border-violet-300/40 hover:bg-violet-500/10">{item}<p className="mt-2 text-xs font-semibold leading-5 text-zinc-500">Toque para abrir modelos e ideias grátis.</p></button>)}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-emerald-300/20 bg-emerald-500/10 p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-100">Sempre gratuito</p><h2 className="mt-2 text-3xl font-black text-white">Use primeiro. Apoie só se gostar.</h2><p className="mt-3 text-sm leading-7 text-emerald-50/80">O conteúdo principal é grátis. Primeiro você usa, testa e vê se ajuda. Depois, se quiser fortalecer o projeto, a ajuda fica na aba Ajuda.</p></div>
        <div className="rounded-[2rem] border border-violet-300/20 bg-violet-500/10 p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-100">Modelos</p><h2 className="mt-2 text-3xl font-black text-white">Precisa de base pronta?</h2><p className="mt-3 text-sm leading-7 text-violet-50/80">Abra a área de modelos para encontrar estruturas, ideias e materiais extras. Cursos ficam como bônus secundário, não como foco do app.</p><button onClick={() => setPage("cursos")} className="mt-5 rounded-2xl bg-white px-5 py-3 font-black text-black">Ver modelos</button></div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white p-6 text-black">
        <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-3xl font-black tracking-[-0.04em]">Pegue uma ideia em 10 segundos.</h2><p className="mt-2 text-sm leading-6 text-zinc-700">Abra o feed grátis, copie algo útil e adapte para o que você precisa agora.</p></div><button onClick={() => setPage("gratis")} className="rounded-2xl bg-black px-6 py-4 font-black text-white">Abrir agora</button></div>
      </section>
    </div>
  );
}
