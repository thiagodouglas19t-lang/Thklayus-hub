const offers = [
  { title: "Arte rápida", price: "R$5", tag: "Mais fácil", desc: "Foto de perfil, status, convite simples, wallpaper ou card básico.", items: ["1 imagem", "Tema escolhido", "Entrega simples"] },
  { title: "Slide escolar", price: "R$10", tag: "Vende bem", desc: "Apresentação curta para escola, igreja, reunião ou projeto pessoal.", items: ["Até 6 slides", "Texto organizado", "Visual limpo"] },
  { title: "Divulgação", price: "R$15", tag: "Negócio", desc: "Card + texto para divulgar bolo, lanche, serviço, evento ou promoção.", items: ["Arte chamativa", "Legenda pronta", "Pronto para WhatsApp"] },
  { title: "Pedido personalizado", price: "A combinar", tag: "Maior lucro", desc: "Quando a pessoa precisa de algo diferente e você calcula pelo tamanho.", items: ["Orçamento pelo app", "Chat de suporte", "Acompanhamento"] },
];

const freeLead = ["Modelos grátis", "Ideias de artes", "Checklist de apresentação", "Exemplos de pedidos"];
const proof = ["Sem curso mal feito", "Pedido registrado no app", "Preço baixo de entrada", "Suporte por chat"];

export default function Home({ setPage }: { setPage: (page: any) => void }) {
  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2.7rem] border border-white/10 bg-[#020203] p-6 shadow-2xl shadow-black/70 md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(124,58,237,0.32),transparent_36%),radial-gradient(circle_at_85%_10%,rgba(245,158,11,0.18),transparent_30%),radial-gradient(circle_at_65%_100%,rgba(34,197,94,0.12),transparent_34%)]" />
        <div className="relative grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">THKLAYUS Serviços</span>
              <span className="rounded-full border border-emerald-300/25 bg-emerald-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-100">Pedidos digitais baratos</span>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.06em] md:text-7xl">Peça artes, slides e divulgações sem complicação.</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300">Cursos não são o foco. Aqui o usuário entra para resolver uma necessidade real: uma apresentação, uma arte, um convite, um texto ou uma divulgação simples.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setPage("pedidos")} className="rounded-2xl bg-white px-6 py-4 font-black text-black shadow-lg shadow-violet-500/25 transition hover:scale-[1.03] active:scale-95">Fazer pedido</button>
              <button onClick={() => setPage("gratis")} className="rounded-2xl border border-emerald-300/20 bg-emerald-500/10 px-6 py-4 font-black text-emerald-100 transition hover:bg-emerald-500/15 active:scale-95">Ver grátis</button>
              <button onClick={() => setPage("chat")} className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 font-black text-zinc-200 transition hover:bg-white/[0.08] active:scale-95">Tirar dúvida</button>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-4">
              {proof.map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-xs font-black text-zinc-300">✓ {item}</div>)}
            </div>
          </div>
          <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/50 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-200">Novo foco do app</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">Serviço prático vende mais que curso genérico.</h2>
            <div className="mt-5 space-y-3">
              {[["1", "Dor real", "A pessoa precisa entregar algo hoje ou essa semana."], ["2", "Preço baixo", "R$5, R$10 e R$15 fazem a pessoa testar."], ["3", "Pedido pelo app", "Tudo fica salvo e você parece mais profissional."], ["4", "Cliente volta", "Quem gostou pede outra arte, outro slide ou algo maior."]].map(([n,t,d]) => <div key={n} className="flex gap-3 rounded-2xl border border-white/10 bg-black/40 p-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white font-black text-black">{n}</div><div><h3 className="font-black text-white">{t}</h3><p className="mt-1 text-sm leading-6 text-zinc-500">{d}</p></div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {freeLead.map((item) => <button key={item} onClick={() => setPage("gratis")} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 text-left font-black text-white transition hover:-translate-y-1 hover:border-violet-300/40 hover:bg-violet-500/10">{item}<p className="mt-2 text-sm font-semibold leading-6 text-zinc-500">Conteúdo gratuito só para gerar confiança e cadastro.</p></button>)}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">O que realmente vende</p><h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">Serviços simples que as pessoas entendem rápido</h2></div>
          <button onClick={() => setPage("pedidos")} className="rounded-2xl bg-white px-5 py-3 font-black text-black">Criar pedido</button>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {offers.map((offer) => <article key={offer.title} className="rounded-[2rem] border border-white/10 bg-black/45 p-5 transition hover:-translate-y-1 hover:border-amber-300/35"><span className="rounded-full border border-amber-300/20 bg-amber-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-amber-100">{offer.tag}</span><h3 className="mt-4 text-2xl font-black text-white">{offer.title}</h3><p className="mt-2 text-4xl font-black text-white">{offer.price}</p><p className="mt-3 min-h-20 text-sm leading-6 text-zinc-400">{offer.desc}</p><div className="mt-4 space-y-2">{offer.items.map((i) => <p key={i} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-bold text-zinc-300">✓ {i}</p>)}</div><button onClick={() => setPage("pedidos")} className="mt-5 w-full rounded-2xl bg-white px-4 py-3 font-black text-black">Pedir agora</button></article>)}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-emerald-300/20 bg-emerald-500/10 p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-100">Estratégia realista</p><h2 className="mt-2 text-3xl font-black text-white">Curso vira bônus, não produto principal.</h2><p className="mt-3 text-sm leading-7 text-emerald-50/80">Materiais e cursos podem ficar no app para parecer completo e ajudar usuários, mas o dinheiro mais provável vem dos pedidos personalizados.</p></div>
        <div className="rounded-[2rem] border border-red-300/20 bg-red-500/10 p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-red-100">Sem enganar ninguém</p><h2 className="mt-2 text-3xl font-black text-white">Não venda curso ruim como se fosse profissional.</h2><p className="mt-3 text-sm leading-7 text-red-50/80">Melhor prometer pouco e entregar bem. Um slide simples bem feito vende mais confiança do que um curso grande mal acabado.</p></div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white p-6 text-black">
        <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-3xl font-black tracking-[-0.04em]">Divulgação simples para hoje</h2><p className="mt-2 text-sm leading-6 text-zinc-700">“Fiz um app pra pedir artes, slides, convites e divulgações simples. Tem preço baixo e dá pra acompanhar pelo app.”</p></div><button onClick={() => setPage("pedidos")} className="rounded-2xl bg-black px-6 py-4 font-black text-white">Abrir pedidos</button></div>
      </section>
    </div>
  );
}
