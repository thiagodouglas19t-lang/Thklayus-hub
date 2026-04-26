const modelos = [
  {
    titulo: "Roteiro rápido para apresentação",
    texto: "1. Apresente o tema. 2. Explique o problema. 3. Mostre os pontos principais. 4. Dê um exemplo. 5. Finalize com conclusão curta.",
  },
  {
    titulo: "Modelo de fala inicial",
    texto: "Bom dia/boa tarde. Hoje eu vou apresentar sobre [tema]. A ideia principal é explicar [objetivo] de um jeito simples e direto.",
  },
  {
    titulo: "Modelo de conclusão",
    texto: "Concluindo, esse tema é importante porque [motivo]. Com isso, entendemos que [resumo final]. Obrigado pela atenção.",
  },
];

const dicas = [
  "Use letras grandes no slide, sem encher de texto.",
  "Treine a fala pelo menos 2 vezes antes de apresentar.",
  "Coloque imagem só quando ela ajudar a explicar.",
  "Não leia tudo do slide. Use o slide como guia.",
  "Separe a apresentação em começo, meio e fim.",
  "Finalize olhando para a turma e agradecendo.",
];

const ideias = [
  "Resumo pronto de trabalho escolar",
  "Slide sobre tecnologia",
  "Apresentação sobre meio ambiente",
  "Trabalho sobre profissões do futuro",
  "Seminário sobre inteligência artificial",
  "Cartaz escolar simples e bonito",
];

export default function Gratis() {
  return (
    <div className="space-y-6">
      <section className="glass-card rounded-[2rem] p-6 md:p-8">
        <span className="rounded-full border border-emerald-900 bg-emerald-950/40 px-4 py-2 text-xs font-black uppercase text-emerald-300">
          100% grátis
        </span>
        <h2 className="mt-5 text-4xl font-black md:text-5xl">Coisas grátis</h2>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Um canto livre do THKLAYUS para estudar, montar apresentação, pegar modelos de fala e ideias de trabalhos sem pagar nada.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="pro-card rounded-3xl p-6">
          <p className="text-4xl">📚</p>
          <h3 className="mt-3 text-xl font-black">Estudo livre</h3>
          <p className="mt-2 text-sm text-zinc-400">Dicas rápidas para organizar matéria, resumo e explicação.</p>
        </div>
        <div className="pro-card rounded-3xl p-6">
          <p className="text-4xl">🎤</p>
          <h3 className="mt-3 text-xl font-black">Apresentação</h3>
          <p className="mt-2 text-sm text-zinc-400">Modelos de começo, meio e fim para falar melhor na frente da turma.</p>
        </div>
        <div className="pro-card rounded-3xl p-6">
          <p className="text-4xl">🎁</p>
          <h3 className="mt-3 text-xl font-black">Materiais grátis</h3>
          <p className="mt-2 text-sm text-zinc-400">Ideias, checklists e estruturas para usar nos trabalhos.</p>
        </div>
      </section>

      <section className="pro-card rounded-3xl p-6">
        <h3 className="text-2xl font-black">Modelos prontos para apresentação</h3>
        <div className="mt-5 grid gap-4">
          {modelos.map((item) => (
            <div key={item.titulo} className="rounded-2xl border border-zinc-800 bg-black p-5">
              <h4 className="font-black">{item.titulo}</h4>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-zinc-400">{item.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="text-2xl font-black">Checklist antes de apresentar</h3>
          <div className="mt-5 space-y-3">
            {dicas.map((dica) => (
              <div key={dica} className="rounded-2xl border border-zinc-800 bg-black p-4 text-sm text-zinc-300">
                ✅ {dica}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="text-2xl font-black">Ideias grátis de trabalho</h3>
          <div className="mt-5 grid gap-3">
            {ideias.map((ideia) => (
              <div key={ideia} className="rounded-2xl border border-zinc-800 bg-black p-4 text-sm font-bold text-zinc-300">
                {ideia}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white p-6 text-black">
        <h3 className="text-2xl font-black">Como usar isso?</h3>
        <p className="mt-2 text-sm text-zinc-700">
          Copie um modelo, troque as partes entre colchetes pelo seu tema e transforme em slide. Essa área fica grátis para ajudar quem ainda não quer comprar curso ou serviço.
        </p>
      </section>
    </div>
  );
}
