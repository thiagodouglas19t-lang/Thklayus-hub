import { useMemo, useState } from "react";

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

function gerarApresentacao(tema: string, materia: string) {
  const assunto = tema.trim() || "meu tema";
  const area = materia.trim() || "trabalho escolar";

  return [
    {
      titulo: `1. Capa — ${assunto}`,
      texto: `Tema: ${assunto}\nMatéria: ${area}\nNome: [seu nome]\nTurma: [sua turma]`,
    },
    {
      titulo: "2. Introdução",
      texto: `Hoje eu vou apresentar sobre ${assunto}. Esse tema é importante porque ajuda a entender melhor um assunto ligado a ${area}.`,
    },
    {
      titulo: "3. O que é?",
      texto: `${assunto} pode ser explicado de forma simples como um tema que envolve ideias, exemplos e impactos no dia a dia.`,
    },
    {
      titulo: "4. Pontos principais",
      texto: `• Conceito principal de ${assunto}\n• Onde aparece na prática\n• Por que isso importa\n• Exemplo fácil de entender`,
    },
    {
      titulo: "5. Exemplo prático",
      texto: `Um exemplo de ${assunto} no cotidiano é quando conseguimos perceber esse tema em situações reais, na escola, na internet ou na sociedade.`,
    },
    {
      titulo: "6. Conclusão",
      texto: `Concluindo, ${assunto} é importante porque mostra como o conhecimento pode ser usado para entender melhor o mundo. Obrigado pela atenção.`,
    },
  ];
}

export default function Gratis() {
  const [tema, setTema] = useState("");
  const [materia, setMateria] = useState("");
  const slides = useMemo(() => gerarApresentacao(tema, materia), [tema, materia]);

  function copiarTudo() {
    const texto = slides.map((slide) => `${slide.titulo}\n${slide.texto}`).join("\n\n");
    navigator.clipboard.writeText(texto);
    alert("Apresentação copiada!");
  }

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-emerald-900 bg-gradient-to-br from-emerald-950/40 via-black to-zinc-950 p-6 md:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative">
          <span className="rounded-full border border-emerald-900 bg-emerald-950/40 px-4 py-2 text-xs font-black uppercase text-emerald-300">
            100% grátis • sem API externa
          </span>
          <h2 className="mt-5 text-4xl font-black md:text-5xl">Gerador de apresentação</h2>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Digite um tema e o THKLAYUS monta uma estrutura pronta de slides, fala inicial e conclusão. Funciona sem chave de IA.
          </p>
        </div>
      </section>

      <section className="pro-card rounded-3xl p-6">
        <h3 className="text-2xl font-black">Criar apresentação grátis</h3>
        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <input
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            placeholder="Tema: ex. Inteligência artificial"
            className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none"
          />
          <input
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
            placeholder="Matéria: ex. Tecnologia"
            className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none"
          />
          <button onClick={copiarTudo} className="rounded-2xl bg-white px-5 py-3 font-black text-black">
            Copiar
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {slides.map((slide) => (
          <div key={slide.titulo} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-zinc-600">
            <h4 className="text-xl font-black">{slide.titulo}</h4>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-zinc-400">{slide.texto}</p>
          </div>
        ))}
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
        <h3 className="text-2xl font-black">Quer algo mais bonito?</h3>
        <p className="mt-2 text-sm text-zinc-700">
          A parte grátis cria a base. Se precisar de slide completo, arte ou trabalho personalizado, abra um ticket no suporte.
        </p>
      </section>
    </div>
  );
}
