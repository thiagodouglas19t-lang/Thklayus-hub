export default function Home({ setPage }: any) {
  const destaques = [
    { titulo: "Cursos profissionais", texto: "Informática, Office, segurança digital, Canva e mais." },
    { titulo: "Área grátis", texto: "Modelos de apresentação e materiais sem pagar." },
    { titulo: "Suporte organizado", texto: "Tickets e chat dentro do app, sem bagunça." },
  ];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 p-6 shadow-2xl md:p-10">
        <div className="relative">
          <h2 className="text-4xl font-black md:text-6xl">
            Aprenda, crie e resolva tudo em um só app.
          </h2>

          <p className="mt-4 max-w-xl text-zinc-400">
            Use materiais grátis ou compre cursos e serviços. Tudo organizado dentro do THKLAYUS.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => setPage("gratis")} className="rounded-2xl bg-white px-6 py-3 font-black text-black">
              Usar grátis
            </button>
            <button onClick={() => setPage("cursos")} className="rounded-2xl border border-zinc-700 px-6 py-3 font-black">
              Ver cursos
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {destaques.map((item) => (
          <div key={item.titulo} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="text-xl font-black">{item.titulo}</h3>
            <p className="mt-2 text-sm text-zinc-400">{item.texto}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-emerald-900 bg-emerald-950/20 p-6">
        <h3 className="text-2xl font-black">Área grátis liberada</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Você pode usar modelos de apresentação e ideias sem pagar nada.
        </p>
        <button onClick={() => setPage("gratis")} className="mt-4 rounded-xl bg-emerald-400 px-5 py-2 font-black text-black">
          Entrar agora
        </button>
      </section>
    </div>
  );
}
