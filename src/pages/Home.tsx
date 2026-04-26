export default function Home({ setPage }: any) {
  const cards = [
    { icon: "🎓", title: "Cursos", text: "Salas privadas, materiais e aulas organizadas.", action: "Ver cursos", page: "cursos" },
    { icon: "🎁", title: "Grátis", text: "Gerador de apresentação e curso teste liberado.", action: "Começar", page: "gratis" },
    { icon: "📦", title: "Serviços", text: "Slides, artes, resumos e trabalhos por pedido.", action: "Pedir", page: "pedidos" },
  ];

  const destaques = [
    ["27+", "Cursos e trilhas"],
    ["3", "Formas de ganhar valor"],
    ["100%", "Chat interno"],
  ];

  const servicos = ["Slides", "Trabalhos", "Resumo", "Canva", "Cartaz", "Mapa mental", "Suporte", "Curso rápido"];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.22),transparent_35%),linear-gradient(135deg,#09090b,#000)] p-5 shadow-2xl md:p-10">
        <div className="relative">
          <span className="inline-flex rounded-full border border-emerald-900 bg-emerald-950/30 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-emerald-300">
            THKLAYUS HUB
          </span>

          <h2 className="mt-5 max-w-3xl text-4xl font-black leading-[1.05] md:text-6xl">
            Estudo, cursos e serviços digitais no mesmo lugar.
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400 md:text-lg">
            Comece grátis, compre cursos privados ou peça um trabalho personalizado com acompanhamento pelo chat.
          </p>

          <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
            <button onClick={() => setPage("gratis")} className="rounded-2xl bg-white px-6 py-4 font-black text-black transition active:scale-95">
              Começar grátis
            </button>
            <button onClick={() => setPage("cursos")} className="rounded-2xl border border-zinc-700 bg-black/40 px-6 py-4 font-black text-white transition active:scale-95">
              Ver cursos
            </button>
            <button onClick={() => setPage("pedidos")} className="rounded-2xl border border-emerald-800 bg-emerald-950/30 px-6 py-4 font-black text-emerald-200 transition active:scale-95">
              Pedir serviço
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 md:gap-3">
            {destaques.map(([valor, label]) => (
              <div key={label} className="rounded-2xl border border-zinc-800 bg-black/65 p-3 md:p-5">
                <p className="text-2xl font-black md:text-3xl">{valor}</p>
                <p className="mt-1 text-[11px] leading-4 text-zinc-500 md:text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {cards.map((item) => (
          <button key={item.title} onClick={() => setPage(item.page)} className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-5 text-left transition hover:-translate-y-1 hover:border-zinc-600 active:scale-[0.99]">
            <p className="text-4xl">{item.icon}</p>
            <h3 className="mt-4 text-2xl font-black">{item.title}</h3>
            <p className="mt-2 min-h-12 text-sm leading-6 text-zinc-400">{item.text}</p>
            <p className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-black">{item.action}</p>
          </button>
        ))}
      </section>

      <section className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-emerald-300">Serviços rápidos</p>
            <h3 className="mt-2 text-3xl font-black">O que você pode pedir?</h3>
          </div>
          <button onClick={() => setPage("pedidos")} className="rounded-2xl bg-white px-5 py-3 font-black text-black">Criar pedido</button>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {servicos.map((item) => (
            <span key={item} className="rounded-full border border-zinc-800 bg-black px-4 py-2 text-sm font-bold text-zinc-300">{item}</span>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-emerald-900 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_40%),#020617] p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-widest text-emerald-300">Missão grátis</p>
          <h3 className="mt-2 text-3xl font-black">Teste o app agora</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-400">Use o gerador grátis e abra o curso teste para ver como a sala premium funciona.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={() => setPage("gratis")} className="rounded-2xl bg-emerald-400 px-5 py-3 font-black text-black">Gerador grátis</button>
            <button onClick={() => setPage("estudo")} className="rounded-2xl border border-emerald-800 px-5 py-3 font-black text-emerald-200">Curso teste</button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-amber-900 bg-amber-950/15 p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-widest text-amber-300">Segurança</p>
          <h3 className="mt-2 text-2xl font-black">Compra protegida</h3>
          <p className="mt-2 text-sm leading-6 text-amber-100">Curso pago só libera depois que o ADM confirma o Pix. Se encontrar problema, abra um ticket.</p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-zinc-800 bg-white p-5 text-black md:p-6">
        <h3 className="text-3xl font-black">Encontrou problema?</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-700">Se algo falhar em curso, compra, pedido, chat ou login, abra um ticket explicando o que aconteceu.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button onClick={() => setPage("suporte")} className="rounded-2xl bg-black px-5 py-3 font-black text-white">Abrir ticket</button>
          <button onClick={() => setPage("chat")} className="rounded-2xl border border-zinc-300 px-5 py-3 font-black">Ver chat</button>
        </div>
      </section>
    </div>
  );
}
