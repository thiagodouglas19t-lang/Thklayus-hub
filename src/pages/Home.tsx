export default function Home() {
  const destaques = [
    { titulo: "Cursos profissionais", texto: "Informática, Office, segurança digital, Canva, finanças e ferramentas online." },
    { titulo: "Pagamento simples", texto: "Cliente paga no Pix, envia comprovante e acompanha tudo no chat interno." },
    { titulo: "Suporte organizado", texto: "Tickets viram conversas dentro do app e podem ser fechados pelo ADM/DEV." },
  ];

  const servicos = ["Slides", "Trabalhos", "Artes", "Resumos", "Suporte", "Cursos"];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 p-6 shadow-2xl md:p-10">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

        <div className="relative">
          <span className="inline-flex rounded-full border border-zinc-800 bg-black/60 px-4 py-2 text-xs font-black uppercase tracking-widest text-zinc-400">
            THKLAYUS HUB
          </span>

          <h2 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Cursos úteis, serviços rápidos e atendimento dentro do app.
          </h2>

          <p className="mt-5 max-w-2xl text-base text-zinc-400 md:text-lg">
            Um hub profissional para vender cursos de informática, receber pedidos, analisar comprovantes e conversar com clientes sem depender de bagunça no WhatsApp.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["9+", "Cursos úteis"],
              ["Pix", "Pagamento manual"],
              ["Chat", "Suporte interno"],
            ].map(([valor, label]) => (
              <div key={label} className="rounded-3xl border border-zinc-800 bg-black/70 p-5">
                <p className="text-3xl font-black">{valor}</p>
                <p className="mt-1 text-sm text-zinc-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {destaques.map((item) => (
          <div key={item.titulo} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition hover:-translate-y-1 hover:border-zinc-600">
            <h3 className="text-xl font-black">{item.titulo}</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{item.texto}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6">
        <h3 className="text-2xl font-black">O que tem no app</h3>
        <div className="mt-5 flex flex-wrap gap-3">
          {servicos.map((item) => (
            <span key={item} className="rounded-full border border-zinc-800 bg-black px-4 py-2 text-sm font-bold text-zinc-300">
              {item}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
