const features = [
  { title: "Textos prontos", desc: "Mensagens curtas para copiar e adaptar.", icon: "✍️" },
  { title: "Ideias do dia", desc: "Sugestões rápidas para quando bater branco.", icon: "⚡" },
  { title: "Modelos rápidos", desc: "Estruturas simples para escola, posts e organização.", icon: "◈" },
];

const contentIdeas = ["Frases prontas", "Legendas prontas", "Modelos de apresentação", "Checklists úteis", "Ideias de renda", "Mensagens para WhatsApp"];

export default function Home({ setPage }: { setPage: (page: any) => void }) {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[3rem] border border-violet-300/15 bg-[#030006] px-6 py-10 text-center shadow-2xl shadow-violet-950/30 md:px-10 md:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.38),transparent_34%),radial-gradient(circle_at_15%_15%,rgba(124,58,237,0.22),transparent_30%),radial-gradient(circle_at_85%_40%,rgba(255,255,255,0.08),transparent_26%)]" />
        <div className="pointer-events-none absolute left-1/2 top-20 h-40 w-72 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl">
          <div className="flex justify-center"><span className="rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">THKLAYUS Hub • grátis</span></div>
          <h1 className="mt-7 text-5xl font-black leading-[0.95] tracking-[-0.08em] text-white md:text-7xl">Copie modelos úteis em segundos.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">Textos, ideias e checklists prontos para usar no WhatsApp, escola, organização e pequenos projetos.</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={() => setPage("gratis")} className="w-full rounded-3xl bg-white px-8 py-5 text-lg font-black text-black shadow-2xl shadow-violet-500/30 transition hover:scale-[1.03] active:scale-95 sm:w-auto">Abrir feed grátis</button>
            <button onClick={() => setPage("cursos")} className="w-full rounded-3xl border border-white/10 bg-white/[0.04] px-8 py-5 text-lg font-black text-zinc-200 transition hover:border-violet-300/35 hover:bg-violet-500/10 active:scale-95 sm:w-auto">Ver modelos</button>
          </div>
          <p className="mt-5 text-sm font-semibold text-zinc-500">Sem enrolação: abra, copie, adapte e use.</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {features.map((item) => <article key={item.title} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-xl shadow-black/20"><p className="text-3xl">{item.icon}</p><h3 className="mt-4 text-2xl font-black text-white">{item.title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-zinc-500">{item.desc}</p></article>)}
      </section>

      <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-5 md:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Comece por aqui</p><h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white">Escolha uma categoria</h2></div>
          <button onClick={() => setPage("gratis")} className="rounded-2xl bg-white px-5 py-3 font-black text-black">Abrir tudo</button>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {contentIdeas.map((item) => <button key={item} onClick={() => setPage("gratis")} className="rounded-3xl border border-white/10 bg-black/45 p-5 text-left font-black text-zinc-100 transition hover:-translate-y-1 hover:border-violet-300/40 hover:bg-violet-500/10">{item}<p className="mt-2 text-xs font-semibold leading-5 text-zinc-500">Abrir ideias e modelos grátis.</p></button>)}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2.5rem] border border-violet-300/20 bg-violet-500/10 p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-100">Retenção</p><h2 className="mt-2 text-3xl font-black text-white">Volte quando precisar de uma ideia.</h2><p className="mt-3 text-sm leading-7 text-violet-50/80">O app foi feito para resolver pequenas travas do dia: o que escrever, como começar e qual modelo usar.</p></div>
        <div className="rounded-[2.5rem] border border-white/10 bg-white p-6 text-black"><p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">Ação rápida</p><h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">Pegue algo útil agora.</h2><p className="mt-3 text-sm leading-7 text-zinc-700">Escolha uma categoria, copie um modelo e adapte para sua situação.</p><button onClick={() => setPage("gratis")} className="mt-5 rounded-2xl bg-black px-5 py-3 font-black text-white">Abrir feed grátis</button></div>
      </section>
    </div>
  );
}
