import { useEffect, useMemo, useState } from "react";
import { appConfig } from "../config/appConfig";

type Tipo = "apresentacao" | "resumo" | "ideias" | "roteiro" | "mensagem" | "checklist" | "divulgacao" | "pedido";
type Tom = "simples" | "caprichado" | "direto";
type Modo = "normal" | "melhorado" | "formal" | "simples" | "alternativo";

type TipoCard = { id: Tipo; nome: string; icon: string; desc: string };
type ResolverSeed = { tipo?: Tipo; tema?: string; base?: string };
type QuickPrompt = { title: string; tema: string; tipo: Tipo; icon: string };

const tiposExtra: TipoCard[] = [
  { id: "ideias", nome: "Ideias", icon: "💡", desc: "Opções rápidas" },
  { id: "roteiro", nome: "Roteiro", icon: "🧭", desc: "Fala guiada" },
  { id: "divulgacao", nome: "Divulgação", icon: "📣", desc: "Post ou status" },
  { id: "pedido", nome: "Pedido", icon: "📦", desc: "Solicitação clara" },
];

const tons = [
  { id: "simples", label: "Simples" },
  { id: "caprichado", label: "Caprichado" },
  { id: "direto", label: "Direto" },
] as const;

const quickPrompts: QuickPrompt[] = [
  { title: "Resumo escolar", tema: "resumo escolar sobre tecnologia", tipo: "resumo", icon: "📝" },
  { title: "Apresentação", tema: "apresentação escolar de 6 slides", tipo: "apresentacao", icon: "🎤" },
  { title: "Mensagem", tema: "mensagem educada para professor", tipo: "mensagem", icon: "💬" },
  { title: "Checklist", tema: "organizar uma tarefa importante", tipo: "checklist", icon: "✅" },
  { title: "Pedido", tema: "pedir orçamento com prazo e valor", tipo: "pedido", icon: "📦" },
  { title: "Divulgação", tema: "divulgar um serviço simples", tipo: "divulgacao", icon: "📣" },
];

function introPorTom(tom: Tom) {
  if (tom === "direto") return "Base direta e objetiva:";
  if (tom === "caprichado") return "Base mais organizada e bem apresentada:";
  return "Base simples para adaptar:";
}

function gerarBase(tipo: Tipo, tema: string, tom: Tom) {
  const t = tema.trim() || "meu tema";
  const intro = introPorTom(tom);

  if (tipo === "resumo") return `${intro}\n\nResumo sobre ${t}\n\n${t} é um tema importante porque ajuda a entender melhor uma situação, uma ideia ou um problema. Para explicar bem, comece dizendo o que é, depois mostre por que importa e finalize com um exemplo simples.\n\nPontos principais:\n1. O que é ${t}\n2. Por que esse tema importa\n3. Onde aparece na prática\n4. Exemplo simples\n5. Conclusão curta\n\nConclusão:\n${t} pode ser entendido de forma mais fácil quando é explicado com exemplos e palavras simples.`;

  if (tipo === "ideias") return `${intro}\n\nIdeias para ${t}\n\n1. Fazer uma apresentação simples com 6 slides\n2. Criar um resumo de uma página\n3. Montar um mapa mental com os pontos principais\n4. Criar um cartaz visual com exemplos\n5. Fazer uma lista de curiosidades\n6. Comparar o antes e depois\n7. Criar um roteiro de fala curto\n8. Transformar o tema em checklist\n9. Fazer uma publicação para divulgar\n10. Criar perguntas e respostas sobre o assunto`;

  if (tipo === "roteiro") return `${intro}\n\nRoteiro de fala sobre ${t}\n\nAbertura:\nBom dia/boa tarde. Hoje eu vou falar sobre ${t}.\n\nParte 1:\nPrimeiro, vou explicar o que é esse tema de forma simples.\n\nParte 2:\nDepois, vou mostrar por que isso é importante e onde aparece na prática.\n\nParte 3:\nTambém vou dar um exemplo para facilitar o entendimento.\n\nConclusão:\nConcluindo, ${t} é importante porque ajuda a entender melhor o assunto e aplicar esse conhecimento no dia a dia. Obrigado pela atenção.`;

  if (tipo === "mensagem") return `${intro}\n\nMensagem sobre ${t}\n\nOi! Passando aqui para falar sobre ${t}.\n\nA ideia é simples: preciso explicar melhor essa situação e organizar tudo de um jeito claro.\n\nResumo do que preciso:\n• Tema: ${t}\n• Objetivo: deixar a mensagem mais entendível\n• Próximo passo: confirmar se está tudo certo\n\nMe avisa o que você acha.`;

  if (tipo === "checklist") return `${intro}\n\nChecklist para ${t}\n\n□ Entender exatamente o que precisa ser feito\n□ Separar as informações principais\n□ Criar uma primeira versão simples\n□ Revisar se está claro\n□ Melhorar a apresentação\n□ Conferir erros\n□ Finalizar\n□ Enviar ou apresentar\n\nDica:\nComece pelo básico. Depois deixe mais bonito.`;

  if (tipo === "divulgacao") return `${intro}\n\nTexto de divulgação sobre ${t}\n\n🚀 ${t}\n\nPreparei algo simples, útil e direto para quem precisa resolver isso sem complicação.\n\nO objetivo é ajudar de forma prática, com uma base pronta para adaptar e usar.\n\nSe fizer sentido para você, chama ou dá uma olhada. Pode ajudar bastante.`;

  if (tipo === "pedido") return `${intro}\n\nPedido sobre ${t}\n\nOlá! Preciso de ajuda com ${t}.\n\nO que eu preciso:\n• Uma solução clara e organizada\n• Algo fácil de entender\n• Entrega bem feita e sem enrolação\n\nDetalhes importantes:\n[Explique aqui prazo, formato, tema, tamanho ou exemplo]\n\nPode me dizer se consegue fazer e qual seria o valor?`;

  return `${intro}\n\nApresentação sobre ${t}\n\nSlide 1: Capa\nTema: ${t}\nNome e turma\n\nSlide 2: Introdução\nExplique rapidamente o que será apresentado.\n\nSlide 3: O que é?\nDefinição simples do tema.\n\nSlide 4: Pontos principais\nListe 3 a 5 ideias importantes.\n\nSlide 5: Exemplo\nMostre uma situação real ou fácil de entender.\n\nSlide 6: Conclusão\nResumo final + agradecimento.\n\nDica final:\nUse poucas palavras no slide e explique com sua fala.`;
}

function aplicarModo(texto: string, modo: Modo, tema: string) {
  const t = tema.trim() || "meu tema";
  if (modo === "melhorado") return `${texto}\n\nVERSÃO MELHORADA\n\nPara deixar isso mais forte:\n• Comece com uma frase de impacto sobre ${t}\n• Use exemplos simples\n• Corte frases repetidas\n• Termine com uma conclusão clara\n\nFrase final sugerida:\nCom isso, fica claro que ${t} pode ser entendido melhor quando a explicação é simples, organizada e ligada à realidade.`;
  if (modo === "formal") return `${texto}\n\nVERSÃO MAIS FORMAL\n\nPrezados,\n\nSegue uma proposta organizada sobre ${t}, com foco em clareza, objetividade e boa apresentação. O conteúdo pode ser adaptado conforme o público, prazo e formato necessário.\n\nAtenciosamente.`;
  if (modo === "simples") return `VERSÃO MAIS SIMPLES\n\nTema: ${t}\n\n1. Explique o que é.\n2. Mostre por que importa.\n3. Dê um exemplo fácil.\n4. Termine com uma conclusão curta.\n\nTexto base:\n${t} é um assunto importante. Ele aparece em várias situações e pode ser entendido melhor com exemplos simples.`;
  if (modo === "alternativo") return `OUTRA VERSÃO\n\n${gerarBase("ideias", t, "direto")}\n\nModelo alternativo rápido:\n• Comece pelo problema\n• Explique a ideia principal\n• Mostre uma solução\n• Finalize com uma frase forte`;
  return texto;
}

function gerar(tipo: Tipo, tema: string, tom: Tom, modo: Modo, baseManual: string) {
  if (baseManual.trim() && modo === "normal") return baseManual;
  const texto = baseManual.trim() ? `${baseManual}\n\n---\n\nAdaptação para: ${tema || "minha tarefa"}` : gerarBase(tipo, tema, tom);
  return aplicarModo(texto, modo, tema);
}

function openPage(page: string) {
  window.dispatchEvent(new CustomEvent("thklayus-open-page", { detail: page }));
}

export default function Resolver() {
  const resolverConfig = appConfig.resolver;
  const tipos: TipoCard[] = [
    ...resolverConfig.types.map((item) => ({ id: item.id as Tipo, nome: item.name, icon: item.icon, desc: item.name === "Apresentação" ? "Slides prontos" : item.name === "Resumo" ? "Texto organizado" : item.name === "Mensagem" ? "WhatsApp melhor" : "Passo a passo" })),
    ...tiposExtra,
  ];

  const [tipo, setTipo] = useState<Tipo>("apresentacao");
  const [tema, setTema] = useState("");
  const [tom, setTom] = useState<Tom>("simples");
  const [modo, setModo] = useState<Modo>("normal");
  const [baseManual, setBaseManual] = useState("");
  const [copied, setCopied] = useState(false);
  const resultado = useMemo(() => gerar(tipo, tema, tom, modo, baseManual), [tipo, tema, tom, modo, baseManual]);
  const tipoAtual = tipos.find((item) => item.id === tipo) ?? tipos[0];

  useEffect(() => {
    function receiveSeed(event: Event) {
      const detail = (event as CustomEvent<ResolverSeed>).detail;
      if (!detail) return;
      if (detail.tipo) setTipo(detail.tipo);
      if (detail.tema) setTema(detail.tema);
      if (detail.base) setBaseManual(detail.base);
      setModo("normal");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.addEventListener("aprendaja-resolver-seed", receiveSeed);
    return () => window.removeEventListener("aprendaja-resolver-seed", receiveSeed);
  }, []);

  async function copiar() {
    await navigator.clipboard.writeText(resultado);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  function pedirAjuda() { openPage("pedidos"); }
  function limparBase() { setBaseManual(""); setModo("normal"); }
  function usarAtalho(prompt: QuickPrompt) { setTipo(prompt.tipo); setTema(prompt.tema); setModo("normal"); setBaseManual(""); }

  return (
    <div className="space-y-6">
      <section className="relative min-w-0 overflow-hidden rounded-[3rem] border border-violet-300/15 bg-[#030006] p-6 shadow-2xl shadow-violet-950/25 md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(168,85,247,0.34),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(124,58,237,0.18),transparent_30%)]" />
        <div className="relative grid min-w-0 gap-7 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div className="min-w-0">
            <span className="rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">{resolverConfig.title}</span>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.08em] text-white md:text-7xl">Gere uma base. Copie. Ou peça pronto.</h1>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-zinc-400 md:text-lg">{resolverConfig.subtitle} Se quiser algo mais caprichado, transforme em pedido direto no app.</p>
          </div>
          <div className="min-w-0 rounded-[2rem] border border-white/10 bg-black/45 p-5"><p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">Fluxo rápido</p><div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-black text-zinc-400"><div className="rounded-2xl bg-white/[0.04] p-3">Gerar</div><div className="rounded-2xl bg-white/[0.04] p-3">Copiar</div><div className="rounded-2xl bg-violet-500/10 p-3 text-violet-200">Pedir</div></div></div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-4">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">Atalhos rápidos</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
          {quickPrompts.map((prompt) => <button key={prompt.title} onClick={() => usarAtalho(prompt)} className="rounded-2xl border border-white/10 bg-black/35 p-3 text-left transition hover:border-violet-300/35 hover:bg-violet-500/10 active:scale-95"><p className="text-2xl">{prompt.icon}</p><p className="mt-2 text-sm font-black text-white">{prompt.title}</p><p className="mt-1 line-clamp-2 text-xs font-semibold text-zinc-500">{prompt.tema}</p></button>)}
        </div>
      </section>

      {baseManual && <section className="rounded-[2rem] border border-violet-300/20 bg-violet-500/10 p-5"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-violet-200">Base do kit aplicada</p><p className="mt-1 text-sm font-semibold text-violet-100/80">Você pode copiar como está ou usar os botões para melhorar, simplificar ou criar outra versão.</p></div><button onClick={limparBase} className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-black text-violet-100">Limpar base</button></div></section>}

      <section className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-4">{tipos.map((item) => <button key={item.id} onClick={() => { setTipo(item.id); setModo("normal"); }} className={`min-w-0 rounded-[1.5rem] border p-5 text-left transition active:scale-[0.98] ${tipo === item.id ? "border-violet-300 bg-violet-300 text-black shadow-2xl shadow-violet-500/20" : "border-white/10 bg-white/[0.04] text-white hover:border-violet-300/35 hover:bg-violet-500/10"}`}><p className="text-3xl">{item.icon}</p><p className="mt-3 font-black">{item.nome}</p><p className={`mt-1 text-xs font-bold ${tipo === item.id ? "text-black/60" : "text-zinc-500"}`}>{item.desc}</p></button>)}</section>

      <section className="grid min-w-0 gap-5 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="min-w-0 rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">Configurar</p><h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-white">{tipoAtual.icon} {tipoAtual.nome}</h2>
          <label className="mt-5 block text-sm font-black text-zinc-300">{resolverConfig.inputLabel}</label>
          <input value={tema} onChange={(e) => { setTema(e.target.value); setModo("normal"); }} placeholder="Ex: currículo para primeiro emprego" className="mt-2 w-full rounded-2xl border border-white/10 bg-black/55 px-4 py-4 text-sm font-bold text-white outline-none placeholder:text-zinc-600 focus:border-violet-300/45" />
          <div className="mt-5"><p className="text-sm font-black text-zinc-300">Tom</p><div className="mt-2 grid grid-cols-3 gap-2">{tons.map((item) => <button key={item.id} onClick={() => setTom(item.id)} className={`rounded-2xl px-3 py-3 text-xs font-black transition ${tom === item.id ? "bg-white text-black" : "border border-white/10 bg-black/35 text-zinc-400"}`}>{item.label}</button>)}</div></div>
          <div className="mt-5 grid grid-cols-2 gap-2"><button onClick={() => setModo("melhorado")} className="rounded-2xl border border-white/10 bg-violet-500/10 px-3 py-3 text-xs font-black text-violet-100 active:scale-95">Melhorar</button><button onClick={() => setModo("alternativo")} className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-xs font-black text-zinc-200 active:scale-95">Outra versão</button><button onClick={() => setModo("formal")} className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-xs font-black text-zinc-200 active:scale-95">Mais formal</button><button onClick={() => setModo("simples")} className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-xs font-black text-zinc-200 active:scale-95">Mais simples</button></div>
          <button onClick={copiar} className="mt-5 w-full rounded-3xl bg-white py-4 text-base font-black text-black shadow-2xl shadow-violet-500/20 transition hover:scale-[1.01] active:scale-95">{copied ? resolverConfig.copiedLabel : resolverConfig.copyLabel}</button><button onClick={pedirAjuda} className="mt-3 w-full rounded-3xl border border-violet-300/20 bg-violet-500/10 py-4 text-sm font-black text-violet-100 transition hover:border-violet-300/35 hover:bg-violet-500/15 active:scale-95">{resolverConfig.helpCta}</button><p className="mt-3 text-center text-xs font-semibold text-zinc-600">Use grátis. Peça pronto só quando quiser economizar tempo.</p>
        </div>
        <div className="min-w-0 rounded-[2.5rem] border border-white/10 bg-black p-5 md:p-6"><div className="flex items-center justify-between gap-3"><div className="min-w-0"><p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">Resultado</p><h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-white">Base pronta</h2></div><button onClick={copiar} className="rounded-2xl bg-violet-300 px-4 py-3 text-sm font-black text-black active:scale-95">Copiar</button></div><pre className="mt-5 min-h-[380px] overflow-x-auto whitespace-pre-wrap rounded-[2rem] border border-white/10 bg-zinc-950/80 p-5 text-sm font-semibold leading-7 text-zinc-300">{resultado}</pre><button onClick={pedirAjuda} className="mt-4 w-full rounded-2xl border border-violet-300/20 bg-violet-500/10 px-4 py-4 text-sm font-black text-violet-100 transition hover:bg-violet-500/15 active:scale-[0.99]">Quero que façam isso pronto pra mim →</button></div>
      </section>
    </div>
  );
}
