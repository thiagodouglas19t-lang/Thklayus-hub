export default function Home({ setPage }: any) {
  const ofertas = [
    { titulo: "Pacote Escola", preco: "a partir de R$ 8,90", texto: "Slides, resumos, apresentações e trabalhos organizados." },
    { titulo: "Pacote Digital", preco: "a partir de R$ 9,90", texto: "Informática, segurança digital, Canva, Drive e produtividade." },
    { titulo: "Pacote Criador", preco: "sob orçamento", texto: "Artes, posts, cartazes, apresentações premium e identidade simples." },
  ];

  const servicos = [
    "Slides escolares",
    "Trabalhos completos",
    "Resumo inteligente",
    "Artes no Canva",
    "Cartaz escolar",
    "Mapa mental",
    "Suporte digital",
    "Organização de arquivos",
    "Curso rápido",
    "Apresentação premium",
  ];

  const depoimentos = [
    ["Ana", "Consegui montar minha apresentação bem mais rápido."],
    ["Lucas", "O app ajuda porque junta pedido, curso e suporte no mesmo lugar."],
    ["Mari", "A parte grátis já resolve muita coisa."],
  ];

  const passos = [
    ["1", "Use grátis", "Teste gerador de apresentação e materiais."],
    ["2", "Escolha curso ou pedido", "Compre um curso ou peça algo personalizado."],
    ["3", "Acompanhe no chat", "Tudo fica registrado no app."],
  ];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-gradient-to-br from-zinc-950 via-black to-emerald-950/20 p-6 shadow-2xl md:p-10">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative">
          <span className="rounded-full border border-emerald-900 bg-emerald-950/30 px-4 py-2 text-xs font-black uppercase text-emerald-300">
            Plataforma de estudo + serviços digitais
          </span>

          <h2 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Estude grátis, compre cursos e peça trabalhos em um só lugar.
          </h2>

          <p className="mt-4 max-w-2xl text-zinc-400 md:text-lg">
            O THKLAYUS junta gerador de apresentação, cursos baratos, pedidos personalizados, chat interno, suporte e painel de acompanhamento.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => setPage("gratis")} className="rounded-2xl bg-white px-6 py-3 font-black text-black transition hover:scale-[1.03]">
              Começar grátis
            </button>
            <button onClick={() => setPage("pedidos")} className="rounded-2xl border border-emerald-700 bg-emerald-950/40 px-6 py-3 font-black text-emerald-200 transition hover:scale-[1.03]">
              Pedir serviço
            </button>
            <button onClick={() => setPage("cursos")} className="rounded-2xl border border-zinc-700 px-6 py-3 font-black transition hover:scale-[1.03]">
              Ver cursos
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-zinc-800 bg-black/70 p-5"><p className="text-3xl font-black">27+</p><p className="text-sm text-zinc-500">Cursos e trilhas</p></div>
            <div className="rounded-3xl border border-zinc-800 bg-black/70 p-5"><p className="text-3xl font-black">24h</p><p className="text-sm text-zinc-500">Pedidos organizados</p></div>
            <div className="rounded-3xl border border-zinc-800 bg-black/70 p-5"><p className="text-3xl font-black">100%</p><p className="text-sm text-zinc-500">Chat interno</p></div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {ofertas.map((item) => (
          <div key={item.titulo} className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6 transition hover:-translate-y-1 hover:border-emerald-800">
            <p className="text-xs font-black uppercase text-emerald-300">Oferta</p>
            <h3 className="mt-2 text-2xl font-black">{item.titulo}</h3>
            <p className="mt-2 text-3xl font-black">{item.preco}</p>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{item.texto}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-3xl font-black">O que dá pra fazer aqui?</h3>
            <p className="mt-2 text-sm text-zinc-400">Mais opções, mais vida, mais chance de venda.</p>
          </div>
          <button onClick={() => setPage("pedidos")} className="rounded-2xl bg-white px-5 py-3 font-black text-black">Criar pedido</button>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {servicos.map((item) => (
            <span key={item} className="rounded-full border border-zinc-800 bg-black px-4 py-2 text-sm font-bold text-zinc-300">{item}</span>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {passos.map(([num, titulo, texto]) => (
          <div key={num} className="rounded-[2rem] border border-zinc-800 bg-black p-6">
            <p className="text-4xl font-black text-emerald-300">{num}</p>
            <h3 className="mt-3 text-xl font-black">{titulo}</h3>
            <p className="mt-2 text-sm text-zinc-400">{texto}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-emerald-900 bg-emerald-950/20 p-6">
          <h3 className="text-3xl font-black">Desafio grátis da semana</h3>
          <p className="mt-2 text-zinc-400">Crie uma apresentação de 6 slides usando o gerador grátis e depois peça uma versão premium se quiser deixar mais bonita.</p>
          <button onClick={() => setPage("gratis")} className="mt-5 rounded-2xl bg-emerald-400 px-5 py-3 font-black text-black">Fazer desafio</button>
        </div>

        <div className="rounded-[2rem] border border-amber-900 bg-amber-950/20 p-6">
          <h3 className="text-2xl font-black">🛡️ Compra segura</h3>
          <p className="mt-2 text-sm leading-6 text-amber-100">Curso só libera depois da confirmação real do Pix. Isso protege você e mantém o app confiável.</p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6">
        <h3 className="text-3xl font-black">Clientes falando</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {depoimentos.map(([nome, texto]) => (
            <div key={nome} className="rounded-3xl border border-zinc-800 bg-black p-5">
              <p className="text-lg">⭐⭐⭐⭐⭐</p>
              <p className="mt-3 text-sm text-zinc-300">“{texto}”</p>
              <p className="mt-3 text-xs font-black uppercase text-zinc-500">{nome}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-zinc-800 bg-white p-6 text-black">
        <h3 className="text-3xl font-black">Quer resolver algo agora?</h3>
        <p className="mt-2 text-sm text-zinc-700">Use o grátis, compre um curso ou abra um pedido personalizado. O app te guia pelo chat.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button onClick={() => setPage("gratis")} className="rounded-2xl bg-black px-5 py-3 font-black text-white">Usar grátis</button>
          <button onClick={() => setPage("pedidos")} className="rounded-2xl border border-zinc-300 px-5 py-3 font-black">Pedir serviço</button>
          <button onClick={() => setPage("cursos")} className="rounded-2xl border border-zinc-300 px-5 py-3 font-black">Cursos</button>
        </div>
      </section>
    </div>
  );
}
