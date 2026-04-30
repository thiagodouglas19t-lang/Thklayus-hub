import { useEffect, useMemo, useState } from "react";
import { appConfig } from "../config/appConfig";

const dailyContents = [
  { type: "Frase pronta", title: "Mensagem para divulgar algo", text: "Oi, pessoal! Estou testando um projeto novo com conteúdos úteis e ferramentas grátis. Quem puder entrar, testar e me dar feedback já ajuda muito 🙏" },
  { type: "Ideia rápida", title: "Coisa simples para postar", text: "Faça um antes/depois: antes eu fazia tudo bagunçado, agora uso modelos prontos para organizar ideias, trabalhos e mensagens." },
  { type: "WhatsApp", title: "Pedido de ajuda sem parecer chato", text: "Se esse app te ajudou em alguma coisa, compartilha com uma pessoa. Isso ajuda o projeto a crescer sem precisar cobrar de todo mundo." },
  { type: "Escola", title: "Começo de apresentação", text: "Bom dia, hoje eu vou apresentar sobre [tema]. Escolhi esse assunto porque ele aparece no nosso dia a dia e ajuda a entender melhor o mundo atual." },
  { type: "Organização", title: "Checklist de tarefa", text: "1. Entender o pedido\n2. Separar o tema\n3. Criar começo, meio e fim\n4. Revisar\n5. Entregar sem enrolar" },
  appConfig.freeArea.daily,
];

type Intent = "mensagem" | "checklist" | "estrutura" | "ideia" | "rascunho";
type Tone = "simples" | "formal" | "whatsapp";

type SmartResult = {
  intent: Intent;
  title: string;
  text: string;
  suggestions: string[];
};

const quickExamples = [
  "mensagem pedindo desculpa",
  "checklist de viagem",
  "estrutura de apresentação",
  "mensagem cobrando dívida",
  "roteiro de reunião",
  "ideia de trabalho escolar",
  "mensagem para professor",
  "checklist de estudos",
  "ideias de status",
];

const viralExamples = ["mensagem pedindo desculpa", "checklist de viagem", "mensagem para professor"];

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getInitialStats() {
  const saved = localStorage.getItem("thklayus-viral-stats");
  if (!saved) return { opens: 0, lastOpen: "", streak: 0, shares: 0, copies: 0 };
  try {
    return JSON.parse(saved);
  } catch {
    return { opens: 0, lastOpen: "", streak: 0, shares: 0, copies: 0 };
  }
}

function renderTemplate(template: string, topic: string) {
  return template.replaceAll("{topic}", topic);
}

function cleanTopic(input: string) {
  return input
    .toLowerCase()
    .replace(/mensagem|checklist|lista|estrutura|ideia|ideias|rascunho|roteiro|texto|de|do|da|para|sobre|um|uma/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function detectIntent(input: string): Intent {
  const text = input.toLowerCase();

  if (text.includes("checklist") || text.includes("lista")) return "checklist";
  if (text.includes("apresentação") || text.includes("estrutura") || text.includes("roteiro") || text.includes("reunião") || text.includes("trabalho")) return "estrutura";
  if (text.includes("ideia") || text.includes("ideias") || text.includes("status") || text.includes("post")) return "ideia";
  if (text.includes("mensagem") || text.includes("desculpa") || text.includes("cobrar") || text.includes("cobrança") || text.includes("aniversário") || text.includes("chefe") || text.includes("professor") || text.includes("cliente")) return "mensagem";

  return "rascunho";
}

function messageByTopic(topic: string, tone: Tone) {
  const t = topic.toLowerCase();

  if (t.includes("desculpa") || t.includes("atraso")) {
    if (tone === "formal") return `Olá! Quero pedir desculpas pelo ocorrido. Reconheço que poderia ter me organizado melhor e estou ajustando isso para não acontecer novamente.\n\nObrigado pela compreensão.`;
    if (tone === "whatsapp") return `Oi! Desculpa mesmo por isso. Me atrapalhei, mas já estou resolvendo para não repetir. Obrigado por entender 🙏`;
    return `Oi! Desculpa pelo ocorrido. Eu reconheço o erro e vou me organizar melhor para isso não acontecer de novo.`;
  }

  if (t.includes("cobran") || t.includes("dívida") || t.includes("divida")) {
    if (tone === "formal") return `Olá! Tudo bem? Estou entrando em contato para lembrar sobre o valor pendente. Quando puder, me informe uma previsão de pagamento para eu me organizar também.`;
    if (tone === "whatsapp") return `Oi! Tudo bem? Passando só para lembrar daquele valor pendente. Consegue me dizer quando vai conseguir acertar?`;
    return `Oi! Passando para lembrar do valor pendente. Me avisa quando puder pagar ou combinar uma previsão.`;
  }

  if (t.includes("professor")) {
    return `Olá, professor(a). Tudo bem? Estou entrando em contato para tirar uma dúvida sobre ${topic}. Poderia me orientar quando tiver um tempo? Obrigado(a).`;
  }

  if (t.includes("chefe") || t.includes("trabalho")) {
    return `Olá! Queria alinhar sobre ${topic}. Minha ideia é resolver isso com clareza e rapidez. Pode me confirmar qual caminho prefere seguir?`;
  }

  return `Oi! Passando para falar sobre ${topic}.\n\nQueria explicar de forma simples e direta: estou tentando resolver isso da melhor maneira possível e preferi falar com clareza.\n\nSe puder, me responde quando tiver um tempo. Obrigado!`;
}

function buildSmartResult(rawInput: string, tone: Tone = "simples"): SmartResult {
  const input = rawInput.trim() || "mensagem rápida";
  const intent = detectIntent(input);
  const topic = cleanTopic(input) || input;

  if (intent === "checklist") {
    return {
      intent,
      title: `Checklist rápido: ${topic}`,
      text: `Checklist rápido: ${topic}\n\n□ Separar o que é obrigatório\n□ Definir a primeira ação\n□ Remover o que não ajuda agora\n□ Conferir prazo ou limite\n□ Finalizar a parte principal\n□ Revisar antes de enviar\n□ Salvar, copiar ou compartilhar`,
      suggestions: ["checklist de viagem", "checklist de estudo", "checklist de compras"],
    };
  }

  if (intent === "estrutura") {
    return {
      intent,
      title: `Estrutura pronta: ${topic}`,
      text: `Estrutura pronta: ${topic}\n\n1. Abertura\nApresente o tema em uma frase simples.\n\n2. Contexto\nExplique por que isso importa na vida real.\n\n3. Pontos principais\nMostre 3 ideias importantes sobre o tema.\n\n4. Exemplo\nUse uma situação fácil de entender.\n\n5. Fechamento\nTermine com uma conclusão curta.\n\nFrase inicial:\nHoje vou falar sobre ${topic}. Esse tema é importante porque aparece em situações reais e ajuda a entender melhor o assunto.`,
      suggestions: ["estrutura de apresentação", "roteiro de reunião", "ideia de trabalho escolar"],
    };
  }

  if (intent === "ideia") {
    return {
      intent,
      title: `Ideias rápidas: ${topic}`,
      text: `Ideias rápidas sobre ${topic}\n\n1. Faça uma lista com 3 pontos principais.\n2. Crie um antes e depois.\n3. Conte um exemplo real simples.\n4. Transforme em checklist.\n5. Escreva uma frase curta para postar.\n\nComeço pronto:\nHoje eu estava pensando sobre ${topic} e percebi uma coisa simples: quando a gente organiza a ideia, fica muito mais fácil começar.`,
      suggestions: ["ideias de status", "ideia de apresentação", "ideias para divulgar algo"],
    };
  }

  if (intent === "mensagem") {
    return {
      intent,
      title: `Mensagem pronta: ${topic}`,
      text: messageByTopic(topic, tone),
      suggestions: ["mensagem pedindo desculpa", "mensagem cobrando dívida", "mensagem para professor"],
    };
  }

  return {
    intent,
    title: `Rascunho rápido: ${topic}`,
    text: `Ainda não faço isso perfeitamente, mas criei um rascunho para você começar:\n\nTema: ${topic}\n\n1. O que precisa ser resolvido?\n2. Qual é a informação principal?\n3. O que a outra pessoa precisa entender?\n4. Qual é a próxima ação?\n\nRascunho:\nPreciso resolver ${topic}. A ideia principal é organizar isso de forma simples, direta e fácil de entender.`,
    suggestions: ["mensagem rápida", "checklist simples", "estrutura curta"],
  };
}

function getInitialPrompt() {
  try {
    const saved = localStorage.getItem("aprendaja_quick_prompt");
    return saved || "";
  } catch {
    return "";
  }
}

function saveHistory(prompt: string, result: SmartResult) {
  try {
    const saved = localStorage.getItem("aprendaja_history");
    const current = saved ? JSON.parse(saved) : [];
    const next = [{ prompt, title: result.title, text: result.text, date: Date.now() }, ...current]
      .filter((item, index, array) => array.findIndex((entry) => entry.prompt === item.prompt) === index)
      .slice(0, 3);
    localStorage.setItem("aprendaja_history", JSON.stringify(next));
    return next;
  } catch {
    return [];
  }
}

function getHistory() {
  try {
    const saved = localStorage.getItem("aprendaja_history");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function Gratis() {
  const cfg = appConfig.freeArea;
  const [stats, setStats] = useState(getInitialStats);
  const [tema, setTema] = useState(getInitialPrompt);
  const [tone, setTone] = useState<Tone>("simples");
  const [toast, setToast] = useState("");
  const [result, setResult] = useState<SmartResult | null>(() => {
    const initial = getInitialPrompt();
    return initial ? buildSmartResult(initial) : null;
  });
  const [history, setHistory] = useState<any[]>(getHistory);
  const today = todayKey();
  const contentOfDay = useMemo(() => dailyContents[new Date().getDate() % dailyContents.length], []);
  const showShareInvite = cfg.sharing.enabled && (stats.opens >= cfg.sharing.showAfterVisits || stats.shares >= 1);
  const liveSuggestions = useMemo(() => {
    const value = tema.toLowerCase().trim();
    if (!value) return quickExamples.slice(0, 4);
    return quickExamples.filter((item) => item.toLowerCase().includes(value) || item.toLowerCase().startsWith(value.split(" ")[0])).slice(0, 4);
  }, [tema]);

  useEffect(() => {
    setStats((current: any) => {
      if (current.lastOpen === today) return current;
      const next = { ...current, opens: Number(current.opens || 0) + 1, lastOpen: today, streak: Number(current.streak || 0) + 1 };
      localStorage.setItem("thklayus-viral-stats", JSON.stringify(next));
      return next;
    });
  }, [today]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function markShare() {
    const next = { ...stats, shares: Number(stats.shares || 0) + 1 };
    setStats(next);
    localStorage.setItem("thklayus-viral-stats", JSON.stringify(next));
  }

  function markCopy() {
    const next = { ...stats, copies: Number(stats.copies || 0) + 1 };
    setStats(next);
    localStorage.setItem("thklayus-viral-stats", JSON.stringify(next));
  }

  async function copyText(text: string, onDone?: () => void) {
    await navigator.clipboard.writeText(text);
    markCopy();
    onDone?.();
    setToast("Copiado! Agora é só colar onde quiser.");
  }

  async function shareText(text: string) {
    const shareData = { title: appConfig.brand.name, text, url: window.location.origin };
    if (navigator.share) {
      await navigator.share(shareData);
      markShare();
      setToast("Compartilhamento aberto!");
      return;
    }
    await copyText(`${text}\n${window.location.origin}`, markShare);
  }

  function generateFromPrompt(value?: string, nextTone = tone) {
    const prompt = (value || tema || cfg.generator.defaultTopic).trim();
    const nextResult = buildSmartResult(prompt, nextTone);
    setTema(prompt);
    setResult(nextResult);
    setHistory(saveHistory(prompt, nextResult));
    try {
      localStorage.setItem("aprendaja_quick_prompt", prompt);
    } catch {
      // ignore
    }
  }

  function changeTone(nextTone: Tone) {
    setTone(nextTone);
    if (tema.trim()) generateFromPrompt(tema, nextTone);
  }

  function gerarIdeias() {
    const assunto = tema.trim() || cfg.generator.defaultTopic;
    return cfg.generator.resultTemplates.map((template) => renderTemplate(template, assunto));
  }

  return (
    <div className={`space-y-6 ${appConfig.bottomNav.safeBottomPadding}`}>
      {toast && <div className="fixed bottom-24 left-1/2 z-[90] w-[calc(100%-32px)] max-w-sm -translate-x-1/2 rounded-2xl border border-violet-300/25 bg-violet-300 px-5 py-3 text-center text-sm font-black text-black shadow-2xl shadow-violet-500/20">{toast}</div>}

      <section className="rounded-[2.4rem] border border-violet-300/20 bg-[#030006] p-5 shadow-2xl shadow-violet-950/20 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Saída do zero</p>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-black text-zinc-400">{Number(stats.copies || 0)} cópias neste aparelho</span>
        </div>
        <h2 className="mt-2 text-4xl font-black tracking-[-0.06em] text-white md:text-5xl">Digite qualquer situação.</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-zinc-500">O app entrega uma mensagem, checklist ou estrutura pronta para copiar.</p>

        <div className="mt-5 rounded-[2rem] border border-white/10 bg-black/70 p-2">
          <div className="grid gap-2 md:grid-cols-[1fr_auto]">
            <input
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") generateFromPrompt();
              }}
              placeholder="Digite: mensagem para chefe, checklist churrasco..."
              className="min-h-14 rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-5 text-base font-bold text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-300/60"
              autoFocus
            />
            <button onClick={() => generateFromPrompt()} className="min-h-14 rounded-[1.35rem] bg-white px-6 text-sm font-black text-black shadow-xl shadow-violet-500/25 active:scale-95">Gerar resposta</button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {liveSuggestions.map((item) => <button key={item} onClick={() => generateFromPrompt(item)} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black text-zinc-300 hover:border-violet-300/40 hover:text-white">{item}</button>)}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(["simples", "formal", "whatsapp"] as Tone[]).map((item) => <button key={item} onClick={() => changeTone(item)} className={`rounded-full px-4 py-2 text-xs font-black capitalize transition ${tone === item ? "bg-violet-300 text-black" : "border border-white/10 bg-white/[0.04] text-zinc-400"}`}>{item}</button>)}
        </div>
      </section>

      {result && <section className="rounded-[2.4rem] border border-white/10 bg-white p-5 text-black shadow-2xl shadow-black/40 md:p-7"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">Resultado pronto</p><h3 className="mt-2 text-3xl font-black tracking-[-0.04em]">{result.title}</h3></div><span className="rounded-full bg-black px-3 py-1 text-xs font-black text-white">{result.intent}</span></div><button onClick={() => copyText(result.text)} className="mt-5 w-full rounded-[2rem] border border-zinc-200 bg-zinc-50 p-5 text-left transition active:scale-[0.99]"><pre className="whitespace-pre-wrap font-sans text-base font-semibold leading-8 text-zinc-800">{result.text}</pre></button><div className="sticky bottom-24 mt-5"><button onClick={() => copyText(result.text)} className="w-full rounded-3xl bg-black px-6 py-5 text-lg font-black text-white shadow-2xl shadow-violet-500/20 active:scale-95">Copiar agora</button></div><button onClick={() => shareText(`Usei o AprendaJá e gerei isso em segundos:\n\n${result.text}`)} className="mt-3 w-full rounded-3xl border border-zinc-200 bg-white px-6 py-4 text-sm font-black text-black active:scale-95">Compartilhar resultado</button><div className="mt-4 flex flex-wrap gap-2">{result.suggestions.map((item) => <button key={item} onClick={() => generateFromPrompt(item)} className="rounded-full border border-zinc-200 px-4 py-2 text-xs font-black text-zinc-700">{item}</button>)}</div></section>}

      <section className="rounded-[2rem] border border-violet-300/20 bg-violet-500/10 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-200">Teste rápido</p>
            <h3 className="mt-2 text-2xl font-black text-white">Mostre para alguém em 10 segundos.</h3>
          </div>
          <button onClick={() => shareText(`Testa esse app grátis: digita uma situação e ele cria uma mensagem, checklist ou estrutura pronta. ${window.location.origin}`)} className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-black">Compartilhar app</button>
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-3">
          {viralExamples.map((item) => <button key={item} onClick={() => generateFromPrompt(item)} className="rounded-2xl border border-white/10 bg-black/35 p-4 text-left text-sm font-black text-white">{item}</button>)}
        </div>
      </section>

      {history.length > 0 && <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5"><p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">Últimos usados</p><div className="mt-4 grid gap-3 md:grid-cols-3">{history.map((item) => <button key={item.date} onClick={() => { setTema(item.prompt); setResult({ intent: detectIntent(item.prompt), title: item.title, text: item.text, suggestions: [] }); }} className="rounded-2xl border border-white/10 bg-black/45 p-4 text-left"><p className="text-sm font-black text-white">{item.prompt}</p><p className="mt-2 line-clamp-2 text-xs font-semibold leading-5 text-zinc-500">{item.title}</p></button>)}</div></section>}

      {showShareInvite && <section className="rounded-[2rem] border border-violet-300/25 bg-violet-500/10 p-5 md:p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-200">{cfg.sharing.eyebrow}</p><h3 className="mt-2 text-3xl font-black text-white">{cfg.sharing.title}</h3><p className="mt-2 max-w-3xl text-sm leading-7 text-violet-50/80">Isso ajuda o {appConfig.brand.company} a crescer sem precisar cobrar de todo mundo.</p><div className="mt-5 flex flex-wrap gap-3"><button onClick={() => shareText(cfg.sharing.messages[0].text)} className="rounded-2xl bg-white px-5 py-3 font-black text-black">Compartilhar direto</button><button onClick={() => copyText(`${cfg.sharing.messages[0].text} ${window.location.origin}`, markShare)} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 font-black text-white">Copiar mensagem</button></div></section>}

      <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <article className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 md:p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">{cfg.daily.eyebrow}</p><h3 className="mt-3 text-3xl font-black text-white">{contentOfDay.title}</h3><span className="mt-3 inline-flex rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-1 text-xs font-black text-violet-100">{contentOfDay.type || cfg.daily.category}</span></div><button title="Copiar" onClick={() => copyText(contentOfDay.text)} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-lg font-black text-white transition hover:bg-white hover:text-black">⧉</button></div><p className="mt-5 whitespace-pre-wrap rounded-3xl border border-white/10 bg-black/45 p-5 text-base leading-8 text-zinc-200">{contentOfDay.text}</p><div className="mt-4 flex flex-wrap gap-3"><button onClick={() => copyText(contentOfDay.text)} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-black text-zinc-200">{cfg.daily.copyLabel}</button><button onClick={() => shareText(contentOfDay.text)} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-black">{cfg.daily.shareLabel}</button></div></article>
        {cfg.streak.enabled && <article className="rounded-[2rem] border border-white/10 bg-black/45 p-5 md:p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">{cfg.streak.eyebrow}</p><h3 className="mt-3 text-3xl font-black text-white">🔥 {cfg.streak.title}</h3><p className="mt-3 text-sm leading-7 text-zinc-400">{cfg.streak.text}</p><div className="mt-5 space-y-3">{cfg.streak.items.map((tip) => <p key={tip} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm font-bold leading-6 text-zinc-300">✓ {tip}</p>)}</div></article>}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-zinc-950 p-5 md:p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">{cfg.generator.eyebrow}</p><h3 className="mt-2 text-3xl font-black text-white">{cfg.generator.title}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{cfg.generator.helper}</p><div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]"><input value={tema} onChange={(e) => setTema(e.target.value)} placeholder={cfg.generator.inputPlaceholder} className="rounded-3xl border border-zinc-800 bg-black px-5 py-4 text-base font-bold text-white outline-none focus:border-violet-300/40" /><button onClick={() => copyText(gerarIdeias().join("\n"))} className="rounded-2xl bg-white px-5 py-3 font-black text-black">{cfg.generator.actionLabel}</button></div><div className="mt-4 flex flex-wrap gap-2">{cfg.generator.tags.map((tag) => <button key={tag} onClick={() => setTema(tag)} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black text-zinc-300 hover:border-violet-300/40 hover:text-white">{tag}</button>)}</div><div className="mt-5 grid gap-3 md:grid-cols-2">{gerarIdeias().map((idea) => <div key={idea} className="rounded-2xl border border-zinc-800 bg-black p-4 text-sm font-bold text-zinc-300">{idea}</div>)}</div></section>

      {cfg.ads.enabled && <section className="rounded-[2rem] border border-white/10 bg-black/45 p-5 md:p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">{cfg.ads.eyebrow}</p><div className="mx-auto mt-3 grid h-[90px] max-w-[728px] place-items-center rounded-xl border border-dashed border-white/15 bg-white/[0.025] text-center"><div><p className="font-black text-zinc-300">{cfg.ads.title}</p><p className="mt-1 text-sm text-zinc-600">{cfg.ads.description}</p></div></div></section>}
    </div>
  );
}
