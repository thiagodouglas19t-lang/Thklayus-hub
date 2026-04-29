const features = [
  { title: "Ideias rápidas", desc: "Conteúdos curtos, úteis e fáceis de compartilhar.", icon: "⚡" },
  { title: "Ferramentas simples", desc: "Modelos, listas, checklists e geradores manuais sem complicar.", icon: "🧰" },
  { title: "Materiais grátis", desc: "Coisas que ajudam no dia a dia e fazem a pessoa voltar.", icon: "🎁" },
  { title: "Comunidade", desc: "Botão de apoiar para quem quiser fortalecer o projeto.", icon: "🤝" },
];

const moneyModel = [
  ["1", "Atrair usuário", "Conteúdo grátis, útil e compartilhável."],
  ["2", "Reter", "Sempre ter algo novo para abrir, salvar ou mandar para alguém."],
  ["3", "Monetizar", "Espaços preparados para anúncios quando o app tiver tráfego."],
  ["4", "Apoio", "Botão para quem quiser ajudar voluntariamente via Pix."],
];

const contentIdeas = ["Frases prontas", "Ideias de renda", "Modelos de apresentação", "Checklists úteis", "Templates de mensagem", "Ferramentas escolares", "Dicas de organização", "Conteúdo para WhatsApp"];

export default function Home({ setPage }: { setPage: (page: any) => void }) {
  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2.7rem] border border-white/10 bg-[#020203] p-6 shadow-2xl shadow-black/70 md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(124,58,237,0.34),transparent_36%),radial-gradient(circle_at_85%_10%,rgba(245,158,11,0.16),transparent_30%),radial-gradient(circle_at_65%_100%,rgba(34,197,94,0.12),transparent_34%)]" />
        <div className="relative grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">THKLAYUS Hub</span>
              <span className="rounded-full border border-emerald-300/25 bg-emerald-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-100">Grátis • anúncios • apoio</span>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.06em] md:text-7xl">Um app grátis com coisas úteis para abrir todo dia.</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300">O foco não é vender curso. O foco é atrair usuários com conteúdo grátis, ferramentas simples e materiais úteis. Com tráfego, o app pode ganhar com anúncios e apoio voluntário.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setPage("gratis")} className="rounded-2xl bg-white px-6 py-4 font-black text-black shadow-lg shadow-violet-500/25 transition hover:scale-[1.03] active:scale-95">Explorar grátis</button>
              <button onClick={() => setPage("ajuda")} className="rounded-2xl border border-emerald-300/20 bg-emerald-500/10 px-6 py-4 font-black text-emerald-100 transition hover:bg-emerald-500/15 active:scale-95">Apoiar projeto</button>
              <button onClick={() => setPage("pedidos")} className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 font-black text-zinc-200 transition hover:bg-white/[0.08] active:scale-95">Pedir algo</button>
            </div>
          </div>
          <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/50 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-200">Modelo do app</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">Usuário primeiro. Dinheiro depois.</h2>
            <div className="mt-5 space-y-3">
              {moneyModel.map(([n,t,d]) => <div key={n} className="flex gap-3 rounded-2xl border border-white/10 bg-black/40 p-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white font-black text-black">{n}</div><div><h3 className="font-black text-white">{t}</h3><p className="mt-1 text-sm leading-6 text-zinc-500">{d}</p></div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {features.map((item) => <article key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5"><p className="text-3xl">{item.icon}</p><h3 className="mt-3 text-xl font-black text-white">{item.title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-zinc-500">{item.desc}</p></article>)}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Conteúdo que atrai</p><h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">Coisas que dão motivo para abrir o app</h2></div>
          <button onClick={() => setPage("gratis")} className="rounded-2xl bg-white px-5 py-3 font-black text-black">Ver área grátis</button>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contentIdeas.map((item) => <button key={item} onClick={() => setPage("gratis")} className="rounded-2xl border border-white/10 bg-black/45 p-4 text-left font-black text-zinc-200 transition hover:-translate-y-1 hover:border-violet-300/40 hover:bg-violet-500/10">{item}<p className="mt-2 text-xs font-semibold leading-5 text-zinc-500">Conteúdo simples, útil e compartilhável.</p></button>)}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-amber-300/20 bg-amber-500/10 p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-amber-100">Espaço para anúncios</p><h2 className="mt-2 text-3xl font-black text-white">O app já pode nascer com áreas reservadas para ads.</h2><p className="mt-3 text-sm leading-7 text-amber-50/80">Quando tiver tráfego suficiente, você troca esses blocos por AdSense/AdMob ou outro parceiro. Antes disso, usa como aviso, destaque ou chamada interna.</p></div>
        <div className="rounded-[2rem] border border-emerald-300/20 bg-emerald-500/10 p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-100">Botão de apoio</p><h2 className="mt-2 text-3xl font-black text-white">Quem gostar pode ajudar.</h2><p className="mt-3 text-sm leading-7 text-emerald-50/80">Além dos anúncios, o app pode ter um botão “Apoiar projeto” com Pix. Não força ninguém, só deixa claro que ajuda mantém o app no ar.</p><button onClick={() => setPage("ajuda")} className="mt-5 rounded-2xl bg-white px-5 py-3 font-black text-black">Quero apoiar</button></div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-black/45 p-5 md:p-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">Publicidade</p>
        <div className="mt-3 grid min-h-28 place-items-center rounded-[1.5rem] border border-dashed border-white/15 bg-white/[0.025] text-center">
          <div><p className="font-black text-zinc-300">Espaço reservado para anúncio</p><p className="mt-1 text-sm text-zinc-600">Aqui entra banner quando o app tiver monetização ativa.</p></div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white p-6 text-black">
        <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-3xl font-black tracking-[-0.04em]">Meta real: fazer as pessoas voltarem.</h2><p className="mt-2 text-sm leading-6 text-zinc-700">Anúncio só dá dinheiro com tráfego. Então o app precisa ser grátis, útil, leve e compartilhável.</p></div><button onClick={() => setPage("gratis")} className="rounded-2xl bg-black px-6 py-4 font-black text-white">Abrir conteúdo grátis</button></div>
      </section>
    </div>
  );
}
