import { useMemo, useState } from "react";

type ToolId = "calculadora" | "decisao" | "habitos" | "planner" | "preco" | "bio";

const tools = [
  { id: "planner", title: "Plano rápido", icon: "🗓️", desc: "Transforme uma tarefa em passos." },
  { id: "decisao", title: "Decidir agora", icon: "⚖️", desc: "Compare opções sem travar." },
  { id: "habitos", title: "Checklist do dia", icon: "✅", desc: "Monte uma rotina simples." },
  { id: "preco", title: "Preço de serviço", icon: "💰", desc: "Calcule valor básico." },
  { id: "bio", title: "Bio / status", icon: "✨", desc: "Frases rápidas pra perfil." },
  { id: "calculadora", title: "Mini calculadora", icon: "🧮", desc: "Conta rápida de meta." },
] as const;

function gerar(tool: ToolId, input: string) {
  const t = input.trim() || "minha tarefa";

  if (tool === "planner") return `Plano rápido para: ${t}\n\n1. Definir o resultado final\n2. Separar em 3 partes pequenas\n3. Fazer a parte mais fácil primeiro\n4. Revisar o que ficou ruim\n5. Entregar ou enviar\n\nComece agora por: abrir uma nota e escrever o primeiro passo.`;
  if (tool === "decisao") return `Decisão sobre: ${t}\n\nOpção A:\n• Vantagem: pode ser mais rápida\n• Risco: talvez fique simples demais\n\nOpção B:\n• Vantagem: pode ficar melhor\n• Risco: pode demorar mais\n\nEscolha prática:\nFaça a opção que resolve hoje. Melhore depois.`;
  if (tool === "habitos") return `Checklist do dia\n\n□ Resolver uma tarefa pequena\n□ Organizar uma coisa pendente\n□ Mandar uma mensagem importante\n□ Aprender algo por 10 minutos\n□ Fazer uma entrega simples\n□ Revisar o que deu certo\n\nFoco: ${t}`;
  if (tool === "preco") return `Preço sugerido para: ${t}\n\nSimples: R$ 5 a R$ 10\nCaprichado: R$ 15 a R$ 25\nUrgente: adicionar R$ 5 a R$ 10\n\nRegra rápida:\nSe demora menos de 30 min, cobre barato.\nSe exige capricho, cobre mais.\nSe é urgente, cobre extra.`;
  if (tool === "bio") return `Ideias de bio/status sobre ${t}\n\n1. Fazendo o simples bem feito.\n2. Criando soluções rápidas para o dia a dia.\n3. Menos enrolação, mais resultado.\n4. Ideias, tarefas e projetos em movimento.\n5. Se dá pra melhorar, eu vou tentar.`;
  return `Meta rápida: ${t}\n\nPara bater R$ 1.000:\n• 100 vendas de R$ 10\n• 50 vendas de R$ 20\n• 25 vendas de R$ 40\n\nAção de hoje:\nFale com 10 pessoas e ofereça uma entrega simples.`;
}

export default function Hub() {
  const [active, setActive] = useState<ToolId>("planner");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const result = useMemo(() => gerar(active, input), [active, input]);
  const current = tools.find((tool) => tool.id === active) ?? tools[0];

  async function copy() {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[3rem] border border-violet-300/15 bg-[#030006] p-6 shadow-2xl shadow-violet-950/25 md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(168,85,247,0.32),transparent_34%),radial-gradient(circle_at_90%_20%,rgba(255,255,255,0.08),transparent_30%)]" />
        <div className="relative max-w-4xl">
          <span className="rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">Hub grátis</span>
          <h1 className="mt-6 text-5xl font-black leading-[0.92] tracking-[-0.08em] text-white md:text-7xl">Ferramentas rápidas para usar todo dia.</h1>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-zinc-400 md:text-lg">Não é só gerador de texto. É um painel de atalhos para decidir, planejar, calcular, organizar e criar rápido.</p>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <button key={tool.id} onClick={() => setActive(tool.id)} className={`rounded-[1.6rem] border p-5 text-left transition active:scale-[0.98] ${active === tool.id ? "border-violet-300 bg-violet-300 text-black" : "border-white/10 bg-white/[0.04] text-white hover:border-violet-300/35"}`}>
            <p className="text-3xl">{tool.icon}</p>
            <p className="mt-3 font-black">{tool.title}</p>
            <p className={`mt-1 text-sm font-semibold ${active === tool.id ? "text-black/60" : "text-zinc-500"}`}>{tool.desc}</p>
          </button>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">{current.icon} {current.title}</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-white">Digite o contexto.</h2>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ex: trabalho de geografia, vender slide, organizar meu dia..." className="mt-5 w-full rounded-2xl border border-white/10 bg-black/55 px-4 py-4 text-sm font-bold text-white outline-none placeholder:text-zinc-600 focus:border-violet-300/45" />
          <button onClick={copy} className="mt-5 w-full rounded-3xl bg-white py-4 text-base font-black text-black shadow-2xl shadow-violet-500/20 active:scale-95">{copied ? "Copiado!" : "Copiar resultado"}</button>
        </div>

        <div className="rounded-[2.5rem] border border-white/10 bg-black p-5 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">Resultado</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-white">Pronto pra usar</h2>
            </div>
            <button onClick={copy} className="rounded-2xl bg-violet-300 px-4 py-3 text-sm font-black text-black active:scale-95">Copiar</button>
          </div>
          <pre className="mt-5 min-h-[330px] whitespace-pre-wrap rounded-[2rem] border border-white/10 bg-zinc-950/80 p-5 text-sm font-semibold leading-7 text-zinc-300">{result}</pre>
        </div>
      </section>
    </div>
  );
}
