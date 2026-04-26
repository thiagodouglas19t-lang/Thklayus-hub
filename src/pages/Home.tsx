export default function Home({ setPage }: any) {
  const cards = [
    { icon: "◈", title: "Cursos privados", text: "Acesse trilhas, aulas e materiais organizados dentro da sua área de estudo.", action: "Ver cursos", page: "cursos", glow: "from-violet-500/20 to-blue-500/10" },
    { icon: "⚡", title: "Ferramentas grátis", text: "Teste recursos rápidos antes de comprar: gerador, curso teste e utilidades.", action: "Começar grátis", page: "gratis", glow: "from-blue-500/20 to-sky-500/10" },
    { icon: "✦", title: "Pedidos sob medida", text: "Peça slides, artes, resumos e trabalhos com acompanhamento pelo chat interno.", action: "Criar pedido", page: "pedidos", glow: "from-fuchsia-500/20 to-violet-500/10" },
  ];

  const destaques = [
    ["27+", "Trilhas e conteúdos"],
    ["24h", "Fluxo pelo chat"],
    ["100%", "Centralizado no app"],
  ];

  const servicos = ["Slides", "Trabalhos", "Resumo", "Canva", "Cartaz", "Mapa mental", "Suporte", "Curso rápido"];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(124,58,237,0.34),transparent_34%),radial-gradient(circle_at_100%_20%,rgba(56,189,248,0.22),transparent_32%)]" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-blue-200">
              THKLAYUS HUB
            </span>

            <h2 className="mt-5 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.04em] md:text-7xl">
              Cursos, pedidos e suporte em um hub digital premium.
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 md:text-lg">
              Uma central para comprar cursos, pedir serviços digitais e acompanhar tudo pelo chat interno, sem bagunça no WhatsApp.
            </p>

            <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
              <button onClick={() => setPage("gratis")} className="rounded-2xl bg-white px-6 py-4 font-black text-black shadow-lg shadow-blue-500/20 transition hover:scale-[1.03] active:scale-95">
                Começar grátis
              </button>
              <button onClick={() => setPage("cursos")} className="rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-4 font-black text-white transition hover:border-blue-400/40 hover:bg-blue-500/10 active:scale-95">
                Ver cursos
              </button>
              <button onClick={() => setPage("pedidos")} className="rounded-2xl border border-violet-400/30 bg-violet-500/10 px-6 py-4 font-black text-violet-100 transition hover:bg-violet-500/20 active:scale-95">
                Pedir serviço
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-3 lg:grid-cols-1">
            {destaques.map(([valor, label]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-black/45 p-4 shadow-xl shadow-black/30 backdrop-blur-xl md:p-5">
                <p className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-2xl font-black text-transparent md:text-4xl">{valor}</p>
                <p className="mt-1 text-[11px] leading-4 text-zinc-500 md:text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {cards.map((item) => (
          <button key={item.title} onClick={() => setPage(item.page)} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 text-left shadow-2xl shadow-black/30 backdrop-blur-xl transition hover:-translate-y-1 hover:border-blue-400/40 active:scale-[0.99]">
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.glow} opacity-80 transition group-hover:opacity-100`} />
            <div className="relative">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-black/50 text-2xl font-black text-blue-200 shadow-lg shadow-black/30">{item.icon}</div>
              <h3 className="mt-5 text-2xl font-black tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-2 min-h-16 text-sm leading-6 text-zinc-400">{item.text}</p>
              <p className="mt-5 inline-flex rounded-2xl bg-white px-4 py-2 text-sm font-black text-black transition group-hover:scale-[1.03]">{item.action}</p>
            </div>
          </button>
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-300">Serviços rápidos</p>
            <h3 className="mt-2 text-3xl font-black tracking-[-0.03em]">O que você pode pedir?</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">Escolha um tipo de entrega, envie detalhes e acompanhe o andamento pelo app.</p>
          </div>
          <button onClick={() => setPage("pedidos")} className="rounded-2xl bg-white px-5 py-3 font-black text-black shadow-lg shadow-blue-500/20 transition hover:scale-[1.03] active:scale-95">Criar pedido</button>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {servicos.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-black/45 px-4 py-2 text-sm font-bold text-zinc-300">{item}</span>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative overflow-hidden rounded-[2rem] border border-blue-400/20 bg-blue-500/10 p-5 shadow-2xl shadow-black/30 md:p-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.20),transparent_40%)]" />
          <div className="relative">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-200">Missão grátis</p>
            <h3 className="mt-2 text-3xl font-black tracking-[-0.03em]">Teste o app agora</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">Use o gerador grátis e abra o curso teste para ver como a sala premium funciona.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button onClick={() => setPage("gratis")} className="rounded-2xl bg-white px-5 py-3 font-black text-black">Gerador grátis</button>
              <button onClick={() => setPage("estudo")} className="rounded-2xl border border-blue-400/30 bg-black/30 px-5 py-3 font-black text-blue-100">Curso teste</button>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-amber-400/20 bg-amber-500/10 p-5 shadow-2xl shadow-black/30 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-200">Segurança</p>
          <h3 className="mt-2 text-2xl font-black tracking-[-0.02em]">Compra protegida</h3>
          <p className="mt-2 text-sm leading-6 text-amber-100/80">Curso pago só libera depois que o ADM confirma o Pix. Se encontrar problema, abra um ticket.</p>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white p-5 text-black shadow-2xl shadow-blue-500/10 md:p-6">
        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-200 blur-3xl" />
        <div className="relative">
          <h3 className="text-3xl font-black tracking-[-0.03em]">Encontrou problema?</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-700">Se algo falhar em curso, compra, pedido, chat ou login, abra um ticket explicando o que aconteceu.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={() => setPage("suporte")} className="rounded-2xl bg-black px-5 py-3 font-black text-white">Abrir ticket</button>
            <button onClick={() => setPage("chat")} className="rounded-2xl border border-zinc-300 px-5 py-3 font-black">Ver chat</button>
          </div>
        </div>
      </section>
    </div>
  );
}
