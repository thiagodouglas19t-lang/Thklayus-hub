import { useMemo, useState } from "react";

type Tipo = "apresentacao" | "resumo" | "ideias" | "roteiro";

const tipos = [
  { id: "apresentacao", nome: "Apresentação", icon: "🎤" },
  { id: "resumo", nome: "Resumo", icon: "📝" },
  { id: "ideias", nome: "Ideias", icon: "💡" },
  { id: "roteiro", nome: "Roteiro", icon: "🧭" },
] as const;

function gerar(tipo: Tipo, tema: string) {
  const t = tema.trim() || "meu tema";
  if (tipo === "resumo") return `Resumo sobre ${t}\n\n${t} é um tema importante porque ajuda a entender melhor situações do dia a dia, da escola ou do mundo digital. Para explicar bem, comece pelo conceito principal, depois mostre exemplos e finalize com uma conclusão curta.\n\nPontos-chave:\n• O que é ${t}\n• Por que importa\n• Onde aparece\n• Exemplo simples\n• Conclusão`;
  if (tipo === "ideias") return `Ideias para ${t}\n\n1. Apresentação simples com 6 slides\n2. Mapa mental com os pontos principais\n3. Cartaz visual com exemplos\n4. Resumo de uma página\n5. Seminário com pergunta final\n6. Comparação: antes e depois\n7. Lista de curiosidades\n8. Projeto prático pequeno`;
  if (tipo === "roteiro") return `Roteiro de fala sobre ${t}\n\nAbertura:\nBom dia/boa tarde. Hoje eu vou apresentar sobre ${t}.\n\nDesenvolvimento:\nPrimeiro, vou explicar o que é. Depois, vou mostrar por que isso é importante e dar um exemplo simples.\n\nConclusão:\nConcluindo, ${t} é importante porque ajuda a entender melhor o assunto e aplicar esse conhecimento na prática. Obrigado pela atenção.`;
  return `Apresentação sobre ${t}\n\nSlide 1: Capa\nTema: ${t}\nNome e turma\n\nSlide 2: Introdução\nExplique o que será apresentado.\n\nSlide 3: O que é?\nDefinição simples do tema.\n\nSlide 4: Pontos principais\nListe 3 a 5 ideias importantes.\n\nSlide 5: Exemplo\nMostre uma situação real.\n\nSlide 6: Conclusão\nResumo final + agradecimento.`;
}

export default function Resolver() {
  const [tipo, setTipo] = useState<Tipo>("apresentacao");
  const [tema, setTema] = useState("");
  const resultado = useMemo(() => gerar(tipo, tema), [tipo, tema]);

  async function copiar() {
    await navigator.clipboard.writeText(resultado);
    alert("Copiado!");
  }

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.28),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.22),transparent_35%),#050505] p-6 md:p-8">
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-cyan-200">Resolver agora</span>
        <h2 className="mt-5 text-4xl font-black md:text-6xl">Crie uma base pronta em segundos.</h2>
        <p className="mt-3 max-w-2xl text-zinc-400">Apresentação, resumo, ideias e roteiro sem API externa. Ideal para escola, trabalho e organização rápida.</p>
      </section>

      <section className="grid gap-3 md:grid-cols-4">
        {tipos.map((item) => (
          <button key={item.id} onClick={() => setTipo(item.id)} className={`rounded-[1.5rem] border p-5 text-left transition ${tipo === item.id ? "border-cyan-300 bg-cyan-300 text-black" : "border-white/10 bg-white/5 text-white"}`}>
            <p className="text-4xl">{item.icon}</p>
            <p className="mt-3 font-black">{item.nome}</p>
          </button>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[2rem] border border-white/10 bg-zinc-950 p-5">
          <h3 className="text-2xl font-black">Digite o tema</h3>
          <input value={tema} onChange={(e) => setTema(e.target.value)} placeholder="Ex: inteligência artificial" className="mt-4 w-full rounded-2xl border border-white/10 bg-black px-4 py-4 outline-none" />
          <button onClick={copiar} className="mt-4 w-full rounded-2xl bg-gradient-to-r from-cyan-300 to-violet-300 py-4 font-black text-black">Copiar resultado</button>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-black p-5">
          <h3 className="text-2xl font-black">Resultado</h3>
          <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-zinc-950 p-4 text-sm leading-7 text-zinc-300">{resultado}</pre>
        </div>
      </section>
    </div>
  );
}
