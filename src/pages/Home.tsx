const services = [
  { title: "Apresentação pronta", price: "a partir de R$10", desc: "Slides organizados, roteiro de fala e estrutura limpa para apresentar sem travar.", tag: "Escola / trabalho" },
  { title: "Texto sob medida", price: "a partir de R$5", desc: "Introdução, conclusão, resumo, mensagem, descrição ou texto de venda feito para o seu caso.", tag: "Texto" },
  { title: "Arte simples", price: "a partir de R$10", desc: "Post, aviso, capa, divulgação ou peça simples para usar no WhatsApp e redes sociais.", tag: "Design" },
  { title: "Currículo simples", price: "a partir de R$15", desc: "Currículo organizado, direto e apresentável para enviar em vaga ou oportunidade.", tag: "Profissional" },
  { title: "Pedido personalizado", price: "sob orçamento", desc: "Explique o que precisa. Se for possível fazer, você recebe prazo e valor antes.", tag: "Sob medida" },
  { title: "Modelos gratuitos", price: "grátis", desc: "Use textos, checklists e estruturas prontas quando não quiser pedir um serviço.", tag: "Entrada grátis" },
];

const steps = [
  "Escolha o serviço",
  "Explique o que precisa",
  "Receba prazo e valor",
  "Acompanhe pelo app",
];

const proof = [
  "Pedidos simples",
  "Entrega manual",
  "Status no app",
  "Suporte por ticket",
];

export default function Home({ setPage }: { setPage: (page: any) => void }) {
  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[3rem] border border-violet-300/15 bg-[#020003] px-5 py-9 shadow-2xl shadow-violet-950/30 md:px-10 md:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.34),transparent_34%),radial-gradient(circle_at_15%_15%,rgba(124,58,237,0.22),transparent_30%),radial-gradient(circle_at_85%_40%,rgba(255,255,255,0.08),transparent_26%)]" />
        <div className="pointer-events-none absolute left-1/2 top-20 h-52 w-96 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">
              THKLAYUS • Serviços digitais
            </span>

            <h1 className="mt-7 text-5xl font-black leading-[0.92] tracking-[-0.08em] text-white md:text-7xl">
              Peça pronto. Receba organizado.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
              Apresentações, textos, artes simples, currículos e pedidos personalizados. O AprendaJá agora é uma central séria para transformar pedidos pequenos em entregas prontas.
            </p>

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              <button onClick={() => setPage("pedidos")} className="min-h-14 rounded-[1.35rem] bg-white px-6 text-sm font-black text-black shadow-xl shadow-violet-500/25 transition hover:scale-[1.02] active:scale-95">
                Fazer um pedido
              </button>
              <button onClick={() => setPage("cursos")} className="min-h-14 rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-6 text-sm font-black text-white transition hover:border-violet-300/40 hover:bg-violet-500/10 active:scale-95">
                Ver modelos grátis
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {proof.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-black/35 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-zinc-400">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Pedido destaque</p>
            <h2 className="mt-3 text-3xl font-black text-white">Apresentação escolar completa</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">Você envia o tema, quantidade de slides e prazo. A entrega pode incluir capa, tópicos, roteiro e conclusão.</p>
            <div className="mt-5 rounded-[1.6rem] border border-violet-300/20 bg-violet-500/10 p-4">
              <p className="text-sm font-black text-violet-100">Exemplo de pacote</p>
              <p className="mt-2 text-4xl font-black text-white">R$10+</p>
              <p className="mt-1 text-xs font-bold text-zinc-500">valor muda conforme tamanho e urgência</p>
            </div>
            <button onClick={() => setPage("pedidos")} className="mt-5 w-full rounded-2xl bg-violet-300 px-5 py-4 font-black text-black transition active:scale-95">
              Solicitar agora
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-300">Catálogo</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white">Serviços que o app pode vender</h2>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-violet-300/35 hover:bg-violet-500/10">
              <p className="inline-flex rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-violet-200">{service.tag}</p>
              <h3 className="mt-4 text-2xl font-black text-white">{service.title}</h3>
              <p className="mt-2 text-sm font-black text-violet-200">{service.price}</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-zinc-500">{service.desc}</p>
              <button onClick={() => service.title === "Modelos gratuitos" ? setPage("cursos") : setPage("pedidos")} className="mt-5 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 font-black text-white transition hover:bg-white hover:text-black active:scale-95">
                {service.title === "Modelos gratuitos" ? "Abrir grátis" : "Pedir este serviço"}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2.5rem] border border-violet-300/20 bg-violet-500/10 p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-100">Fluxo sério</p>
          <h2 className="mt-2 text-3xl font-black text-white">Não é app de brincadeira. É pedido, entrega e acompanhamento.</h2>
          <p className="mt-3 text-sm leading-7 text-violet-50/80">O foco é vender serviços digitais pequenos, com preço claro e entrega manual. Modelos gratuitos servem como porta de entrada, não como produto principal.</p>
        </div>

        <div className="rounded-[2.5rem] border border-white/10 bg-white p-6 text-black">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">Como funciona</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {steps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-black/10 bg-zinc-100 p-4">
                <p className="text-xs font-black text-zinc-500">PASSO {index + 1}</p>
                <p className="mt-1 text-lg font-black">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
