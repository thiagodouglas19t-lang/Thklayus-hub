const offers = [
  { title: "Pack Começar", price: "R$5", tag: "Entrada", desc: "1 arte simples, legenda ou texto curto para resolver algo rápido.", items: ["Entrega simples", "Ideal para testar", "Pedido pelo app"] },
  { title: "Pack Escola", price: "R$10", tag: "Popular", desc: "Slides curtos, resumo organizado, mapa mental ou apresentação básica.", items: ["Até 6 slides", "Texto organizado", "Visual limpo"] },
  { title: "Pack Divulgação", price: "R$15", tag: "Venda", desc: "Card + texto para divulgar produto, serviço, evento ou ideia no WhatsApp.", items: ["Arte chamativa", "Texto de venda", "Pronto para postar"] },
  { title: "Pack Premium Simples", price: "R$25", tag: "Melhor valor", desc: "Combo com arte, texto, variação e suporte básico para ajustar o pedido.", items: ["2 variações", "Ajuste simples", "Acompanhamento"] },
];

const freeLead = ["Mini curso grátis", "Ideias de renda digital", "Checklist para vender serviço", "Modelos de pedido pronto"];
const proof = ["Pedido registrado no app", "Acompanhamento por chat", "Serviços baratos", "Cursos e materiais internos"];

export default function Home({ setPage }: { setPage: (page: any) => void }) {
  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2.7rem] border border-white/10 bg-[#020203] p-6 shadow-2xl shadow-black/70 md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(124,58,237,0.32),transparent_36%),radial-gradient(circle_at_85%_10%,rgba(245,158,11,0.18),transparent_30%),radial-gradient(circle_at_65%_100%,rgba(34,197,94,0.12),transparent_34%)]" />
        <div className="relative grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">AprendaJá by THKLAYUS</span>
              <span className="rounded-full border border-emerald-300/25 bg-emerald-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-100">Serviços + cursos</span>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.06em] md:text-7xl">Resolva trabalhos, artes e ideias digitais sem enrolação.</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300">Um app simples para vender serviços digitais baratos, materiais e cursos. A pessoa entra grátis, vê valor, faz pedido e acompanha tudo dentro do app.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setPage("gratis")} className="rounded-2xl bg-white px-6 py-4 font-black text-black shadow-lg shadow-violet-500/25 transition hover:scale-[1.03] active:scale-95">Começar grátis</button>
              <button onClick={() => setPage("pedidos")} className="rounded-2xl border border-emerald-300/20 bg-emerald-500/10 px-6 py-4 font-black text-emerald-100 transition hover:bg-emerald-500/15 active:scale-95">Pedir serviço</button>
              <button onClick={() => setPage("cursos")} className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 font-black text-zinc-200 transition hover:bg-white/[0.08] active:scale-95">Ver cursos</button>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-4">
              {proof.map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-xs font-black text-zinc-300">✓ {item}</div>)}
            </div>
          </div>
          <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/50 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-200">Funil de dinheiro</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">Grátis → pedido barato → cliente recorrente</h2>
            <div className="mt-5 space-y-3">
              {[["1", "Conteúdo grátis", "Atrai gente sem pedir dinheiro primeiro."], ["2", "Oferta barata", "R$5 a R$15 para a pessoa testar."], ["3", "Entrega pelo app", "Pedido fica salvo e vira confiança."], ["4", "Upsell", "Curso, pack ou serviço maior depois."]].map(([n,t,d]) => <div key={n} className="flex gap-3 rounded-2xl border border-white/10 bg-black/40 p-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white font-black text-black">{n}</div><div><h3 className="font-black text-white">{t}</h3><p className="mt-1 text-sm leading-6 text-zinc-500">{d}</p></div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {freeLead.map((item) => <button key={item} onClick={() => setPage("gratis")} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 text-left font-black text-white transition hover:-translate-y-1 hover:border-violet-300/40 hover:bg-violet-500/10">{item}<p className="mt-2 text-sm font-semibold leading-6 text-zinc-500">Entrada grátis para gerar cadastro e confiança.</p></button>)}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Ofertas prontas</p><h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">Serviços fáceis de vender no grupo da família</h2></div>
          <button onClick={() => setPage("pedidos")} className="rounded-2xl bg-white px-5 py-3 font-black text-black">Criar pedido</button>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {offers.map((offer) => <article key={offer.title} className="rounded-[2rem] border border-white/10 bg-black/45 p-5 transition hover:-translate-y-1 hover:border-amber-300/35"><span className="rounded-full border border-amber-300/20 bg-amber-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-amber-100">{offer.tag}</span><h3 className="mt-4 text-2xl font-black text-white">{offer.title}</h3><p className="mt-2 text-4xl font-black text-white">{offer.price}</p><p className="mt-3 min-h-20 text-sm leading-6 text-zinc-400">{offer.desc}</p><div className="mt-4 space-y-2">{offer.items.map((i) => <p key={i} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-bold text-zinc-300">✓ {i}</p>)}</div><button onClick={() => setPage("pedidos")} className="mt-5 w-full rounded-2xl bg-white px-4 py-3 font-black text-black">Quero esse</button></article>)}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-emerald-300/20 bg-emerald-500/10 p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-100">Estratégia</p><h2 className="mt-2 text-3xl font-black text-white">O app precisa vender confiança antes de vender caro.</h2><p className="mt-3 text-sm leading-7 text-emerald-50/80">Por isso a primeira venda deve ser pequena. Depois que a pessoa recebe algo bom, fica mais fácil vender curso, pack, apresentação maior ou suporte personalizado.</p></div>
        <div className="rounded-[2rem] border border-red-300/20 bg-red-500/10 p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-red-100">Limites</p><h2 className="mt-2 text-3xl font-black text-white">Sem promessa impossível.</h2><p className="mt-3 text-sm leading-7 text-red-50/80">Não promete nota, dinheiro fácil, diploma oficial, documento falso ou resultado garantido. O app vende material digital simples, curso livre e serviço sob pedido.</p></div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white p-6 text-black">
        <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-3xl font-black tracking-[-0.04em]">Pronto para divulgar?</h2><p className="mt-2 text-sm leading-6 text-zinc-700">Manda o link dizendo: “Criei um app com materiais grátis e serviços digitais baratos. Testa e me fala o que achou.”</p></div><button onClick={() => setPage("gratis")} className="rounded-2xl bg-black px-6 py-4 font-black text-white">Abrir entrada grátis</button></div>
      </section>
    </div>
  );
}
