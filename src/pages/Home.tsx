const services = [
  {
    title: "Apresentação com IA",
    price: "R$10",
    tag: "Mais pedido",
    icon: "▣",
    description: "Até 6 slides com texto organizado, estrutura bonita e imagens ilustrativas.",
    details: ["Capa + tópicos", "Design simples", "Entrega pelo chat"],
  },
  {
    title: "Arte com IA",
    price: "R$5",
    tag: "Rápido",
    icon: "✦",
    description: "Imagem personalizada estilo anime, dark, perfil, wallpaper ou ideia visual.",
    details: ["1 imagem", "Estilo escolhido", "Ajuste simples"],
  },
  {
    title: "Pack digital",
    price: "R$10",
    tag: "Combo",
    icon: "◈",
    description: "Pacote com imagens, wallpapers, frases ou ideias para usar no celular/rede social.",
    details: ["10 a 30 itens", "Tema escolhido", "Entrega organizada"],
  },
];

const steps = [
  ["1", "Escolha", "Veja o serviço que combina com o que você precisa."],
  ["2", "Peça", "Abra o pedido e explique o tema, estilo ou ideia."],
  ["3", "Acompanhe", "Use o chat para enviar detalhes e receber atualizações."],
  ["4", "Receba", "O material é entregue pelo próprio app ou suporte."],
];

export default function Home({ setPage }: any) {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.7rem] border border-white/10 bg-[#030305] p-6 shadow-2xl shadow-black/60 md:p-9">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(124,58,237,0.26),transparent_34%),radial-gradient(circle_at_90%_10%,rgba(245,158,11,0.14),transparent_30%),radial-gradient(circle_at_70%_100%,rgba(59,130,246,0.12),transparent_36%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent" />

        <div className="relative grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">THKLAYUS Hub</span>
              <span className="rounded-full border border-amber-300/25 bg-amber-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-amber-100">Serviços com IA</span>
            </div>

            <h2 className="mt-5 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.06em] md:text-6xl">
              Peça artes, slides e packs digitais sem complicação.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300 md:text-base">
              Serviços simples feitos com ajuda de IA e revisão manual. Ideal para quem quer algo rápido, bonito e barato sem precisar mexer em ferramenta nenhuma.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => setPage("pedidos")} className="rounded-2xl bg-white px-6 py-4 font-black text-black shadow-lg shadow-violet-500/25 transition hover:scale-[1.03] active:scale-95">
                Pedir serviço
              </button>
              <button onClick={() => setPage("chat")} className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 font-black text-white transition hover:border-violet-400/40 hover:bg-violet-500/10 active:scale-95">
                Falar no suporte
              </button>
              <button onClick={() => setPage("cursos")} className="rounded-2xl border border-white/10 bg-black/35 px-6 py-4 font-black text-zinc-300 transition hover:border-amber-400/40 hover:bg-amber-500/10 active:scale-95">
                Ver materiais
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="rounded-[1.6rem] border border-violet-300/20 bg-violet-500/10 p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-100">Serviço principal</p>
              <h3 className="mt-3 text-2xl font-black text-white">Apresentação simples com IA</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">Até 6 slides com estrutura, capa, tópicos e imagens ilustrativas.</p>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">A partir de</p>
                  <p className="text-4xl font-black text-white">R$10</p>
                </div>
                <button onClick={() => setPage("pedidos")} className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-black">Pedir</button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {[["3", "serviços"], ["R$5", "entrada"], ["IA+", "manual"]].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-black/45 p-4 text-center">
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-xl shadow-black/25 transition hover:-translate-y-1 hover:border-violet-300/35">
            <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.18),transparent_35%)]" />
            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-black/45 text-2xl font-black text-violet-200">{service.icon}</div>
                <span className="rounded-full border border-amber-300/20 bg-amber-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-amber-100">{service.tag}</span>
              </div>

              <h3 className="mt-5 text-2xl font-black tracking-[-0.03em] text-white">{service.title}</h3>
              <p className="mt-2 min-h-16 text-sm leading-6 text-zinc-400">{service.description}</p>

              <div className="mt-4 space-y-2">
                {service.details.map((item) => (
                  <p key={item} className="rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-xs font-bold text-zinc-300">✓ {item}</p>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="text-3xl font-black text-white">{service.price}</p>
                <button onClick={() => setPage("pedidos")} className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-black shadow-lg shadow-violet-500/20 transition active:scale-95">
                  Pedir esse
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/25 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Como funciona</p>
            <h3 className="mt-2 text-3xl font-black tracking-[-0.03em]">Pedido simples, acompanhamento pelo app</h3>
          </div>
          <button onClick={() => setPage("chat")} className="rounded-2xl border border-white/10 bg-black/40 px-5 py-3 text-sm font-black text-zinc-200 transition hover:border-violet-400/40 hover:bg-violet-500/10">Abrir chat</button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {steps.map(([number, title, text]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-black/45 p-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-sm font-black text-black">{number}</div>
              <h4 className="mt-4 text-lg font-black text-white">{title}</h4>
              <p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-amber-300/20 bg-amber-500/10 p-5 md:p-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-100">Transparência</p>
        <h3 className="mt-2 text-2xl font-black text-white">Sem promessa falsa</h3>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-amber-50/80">
          Os serviços utilizam IA + revisão manual. Algumas imagens podem ser ilustrativas ou geradas por IA. Quando fizer sentido, podem ser trocadas por fotos reais de bancos gratuitos, mas não prometemos imagem real perfeita em todos os casos.
        </p>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white p-5 text-black shadow-2xl shadow-violet-500/10 md:p-6">
        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-violet-200 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-3xl font-black tracking-[-0.03em]">Quer testar com um pedido pequeno?</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-700">Comece por uma arte de R$5 ou uma apresentação simples de R$10 e acompanhe tudo pelo app.</p>
          </div>
          <button onClick={() => setPage("pedidos")} className="rounded-2xl bg-black px-6 py-3 font-black text-white">Começar pedido</button>
        </div>
      </section>
    </div>
  );
}
