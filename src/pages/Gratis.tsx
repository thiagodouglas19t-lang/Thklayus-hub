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

type Intent = "mensagem" | "checklist" | "estrutura" | "rascunho";

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
];

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getInitialStats() {
  const saved = localStorage.getItem("thklayus-viral-stats");
  if (!saved) return { opens: 0, lastOpen: "", streak: 0, shares: 0 };
  try {
    return JSON.parse(saved);
  } catch {
    return { opens: 0, lastOpen: "", streak: 0, shares: 0 };
  }
}

function renderTemplate(template: string, topic: string) {
  return template.replaceAll("{topic}", topic);
}

function cleanTopic(input: string) {
  return input
    .toLowerCase()
    .replace(/mensagem|checklist|lista|estrutura|ideia|rascunho|roteiro|de|do|da|para|sobre/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function detectIntent(input: string): Intent {
  const text = input.toLowerCase();

  if (text.includes("checklist") || text.includes("lista")) return "checklist";
  if (text.includes("apresentação") || text.includes("estrutura") || text.includes("roteiro") || text.includes("trabalho")) return "estrutura";
  if (text.includes("mensagem") || text.includes("desculpa") || text.includes("cobrar") || text.includes("cobrança") || text.includes("aniversário") || text.includes("chefe") || text.includes("professor")) return "mensagem";

  return "rascunho";
}

function buildSmartResult(rawInput: string): SmartResult {
  const input = rawInput.trim() || "mensagem rápida";
  const intent = detectIntent(input);
  const topic = cleanTopic(input) || input;

  if (intent === "checklist") {
    return {
      intent,
      title: `Checklist rápido: ${topic}`,
      text: `Checklist rápido: ${topic}\n\n1. Definir o objetivo principal\n2. Separar o que é obrigatório\n3. Remover o que não ajuda agora\n4. Fazer a primeira ação pequena\n5. Revisar antes de finalizar\n6. Salvar ou enviar o resultado`,
      suggestions: ["checklist de viagem", "checklist de estudo", "checklist de compras"],
    };
  }

  if (intent === "estrutura") {
    return {
      intent,
      title: `Estrutura pronta: ${topic}`,
      text: `Estrutura pronta: ${topic}\n\n1. Abertura: apresente o tema de forma simples.\n2. Contexto: explique por que isso importa.\n3. Parte principal: mostre 3 pontos importantes.\n4. Exemplo: use uma situação do dia a dia.\n5. Fechamento: conclua com uma frase clara.\n\nFrase inicial:\nHoje vou falar sobre ${topic}. Esse tema é importante porque aparece em situações reais e ajuda a entender melhor o assunto.`,
      suggestions: ["estrutura de apresentação", "roteiro de reunião", "ideia de trabalho escolar"],
    };
  }

  if (intent === "mensagem") {
    return {
      intent,
      title: `Mensagem pronta: ${topic}`,
      text: `Oi! Passando para falar sobre ${topic}.\n\nQueria explicar de forma simples e direta: estou tentando resolver isso da melhor maneira possível e preferi falar com clareza.\n\nSe puder, me responde quando tiver um tempo. Obrigado!`,
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
    if (!value) return quickExamples.slice(0, 3);
    return quickExamples.filter((item) => item.toLowerCase().includes(value) || item.toLowerCase().startsWith(value.split(" ")[0])).slice(0, 3);
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

  async function copyText(text: string, onDone?: () => void) {
    await navigator.clipboard.writeText(text);
    onDone?.();
    setToast("Copiado!");
  }

  async function shareText(text: string) {
    const shareData = { title: appConfig.brand.company, text, url: window.location.origin };
    if (navigator.share) {
      await navigator.share(shareData);
      markShare();
      setToast("Compartilhamento aberto!");
      return;
    }
    await copyText(`${text}\n${window.location.origin}`, markShare);
  }

  function generateFromPrompt(value?: string) {
    const prompt = (value || tema || cfg.generator.defaultTopic).trim();
    const nextResult = buildSmartResult(prompt);
    setTema(prompt);
    setResult(nextResult);
    setHistory(saveHistory(prompt, nextResult));
    try {
      localStorage.setItem("aprendaja_quick_prompt", prompt);
    } catch {
      // ignore
    }
  }

  function gerarIdeias() {
    const assunto = tema.trim() || cfg.generator.defaultTopic;
    return cfg.generator.resultTemplates.map((template) => renderTemplate(template, assunto));
  }

  return (
    <div className={`space-y-6 ${appConfig.bottomNav.safeBottomPadding}`}>
      {toast && <div className="fixed bottom-24 left-1/2 z-[90] -translate-x-1/2 rounded-2xl border border-violet-300/25 bg-violet-300 px-5 py-3 text-sm font-black text-black shadow-2xl shadow-violet-500/20">{toast}</div>}

      <section className="rounded-[2.4rem] border border-violet-300/20 bg-[#030006] p-5 shadow-2xl shadow-violet-950/20 md:p-7">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Saída do zero</p>
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
      </section>

      {result && <section className="rounded-[2.4rem] border border-white/10 bg-white p-5 text-black shadow-2xl shadow-black/40 md:p-7"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">Resultado pronto</p><h3 className="mt-2 text-3xl font-black tracking-[-0.04em]">{result.title}</h3></div><span className="rounded-full bg-black px-3 py-1 text-xs font-black text-white">{result.intent}</span></div><button onClick={() => copyText(result.text)} className="mt-5 w-full rounded-[2rem] border border-zinc-200 bg-zinc-50 p-5 text-left transition active:scale-[0.99]"><pre className="whitespace-pre-wrap font-sans text-base font-semibold leading-8 text-zinc-800">{result.text}</pre></button><div className="sticky bottom-24 mt-5"><button onClick={() => copyText(result.text)} className="w-full rounded-3xl bg-black px-6 py-5 text-lg font-black text-white shadow-2xl shadow-violet-500/20 active:scale-95">Copiar agora</button></div><div className="mt-4 flex flex-wrap gap-2">{result.suggestions.map((item) => <button key={item} onClick={() => generateFromPrompt(item)} className="rounded-full border border-zinc-200 px-4 py-2 text-xs font-black text-zinc-700">{item}</button>)}</div></section>}

      {history.length > 0 && <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5"><p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">Últimos usados</p><div className="mt-4 grid gap-3 md:grid-cols-3">{history.map((item) => <button key={item.date} onClick={() => { setTema(item.prompt); setResult({ intent: detectIntent(item.prompt), title: item.title, text: item.text, suggestions: [] }); }} className="rounded-2xl border border-white/10 bg-black/45 p-4 text-left"><p className="text-sm font-black text-white">{item.prompt}</p><p className="mt-2 line-clamp-2 text-xs font-semibold leading-5 text-zinc-500">{item.title}</p></button>)}</div></section>}

      {showShareInvite && <section className="rounded-[2rem] border border-violet-300/25 bg-violet-500/10 p-5 md:p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-200">{cfg.sharing.eyebrow}</p><h3 className="mt-2 text-3xl font-black text-white">{cfg.sharing.title}</h3><p className="mt-2 max-w-3xl text-sm leading-7 text-violet-50/80">Isso ajuda o {appConfig.brand.company} a crescer sem precisar cobrar de todo mundo.</p><div className="mt-5 flex flex-wrap gap-3"><button onClick={() => shareText(cfg.sharing.messages[0].text)} className="rounded-2xl bg-white px-5 py-3 font-black text-black">Compartilhar direto</button><button onClick={() => copyText(`${cfg.sharing.messages[0].text} ${window.location.origin}`, markShare)} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 font-black text-white">Copiar mensagem</button></div></section>}

      <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <article className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 md:p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">{cfg.daily.eyebrow}</p><h3 className="mt-3 text-3xl font-black text-white">{contentOfDay.title}</h3><span className="mt-3 inline-flex rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-1 text-xs font-black text-violet-100">{contentOfDay.type || cfg.daily.category}</span></div><button title="Copiar" onClick={() => copyText(contentOfDay.text)} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-lg font-black text-white transition hover:bg-white hover:text-black">⧉</button></div><p className="mt-5 whitespace-pre-wrap rounded-3xl border border-white/10 bg-black/45 p-5 text-base leading-8 text-zinc-200">{contentOfDay.text}</p><div className="mt-4 flex flex-wrap gap-3"><button onClick={() => copyText(contentOfDay.text)} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-black text-zinc-200">{cfg.daily.copyLabel}</button><button onClick={() => shareText(contentOfDay.text)} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-black">{cfg.daily.shareLabel}</button></div></article>
        {cfg.streak.enabled && <article className="rounded-[2rem] border border-white/10 bg-black/45 p-5 md:p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">{cfg.streak.eyebrow}</p><h3 className="mt-3 text-3xl font-black text-white">🔥 {cfg.streak.title}</h3><p className="mt-3 text-sm leading-7 text-zinc-400">{cfg.streak.text}</p><div className="mt-5 space-y-3">{cfg.streak.items.map((tip) => <p key={tip} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm font-bold leading-6 text-zinc-300">✓ {tip}</p>)}</div></article>}
      </section>

      {cfg.sharing.enabled && <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 md:p-6"><div><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">{cfg.sharing.eyebrow}</p><h3 className="mt-2 text-3xl font-black text-white">{cfg.sharing.title}</h3></div><div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{cfg.sharing.messages.map((card) => <article key={card.title} className="relative rounded-[2rem] border border-white/10 bg-black/45 p-5 pr-14"><button title="Copiar" onClick={() => copyText(card.text, markShare)} className="absolute right-4 top-4 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-black text-white hover:bg-white hover:text-black">⧉</button><h4 className="text-xl font-black text-white">{card.title}</h4><p className="mt-3 min-h-28 text-sm leading-6 text-zinc-400">{card.text}</p><button onClick={() => shareText(card.text)} className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-black text-black">Compartilhar</button></article>)}</div></section>}

      <section className="rounded-[2rem] border border-white/10 bg-zinc-950 p-5 md:p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">{cfg.generator.eyebrow}</p><h3 className="mt-2 text-3xl font-black text-white">{cfg.generator.title}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{cfg.generator.helper}</p><div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]"><input value={tema} onChange={(e) => setTema(e.target.value)} placeholder={cfg.generator.inputPlaceholder} className="rounded-3xl border border-zinc-800 bg-black px-5 py-4 text-base font-bold text-white outline-none focus:border-violet-300/40" /><button onClick={() => copyText(gerarIdeias().join("\n"))} className="rounded-2xl bg-white px-5 py-3 font-black text-black">{cfg.generator.actionLabel}</button></div><div className="mt-4 flex flex-wrap gap-2">{cfg.generator.tags.map((tag) => <button key={tag} onClick={() => setTema(tag)} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black text-zinc-300 hover:border-violet-300/40 hover:text-white">{tag}</button>)}</div><div className="mt-5 grid gap-3 md:grid-cols-2">{gerarIdeias().map((idea) => <div key={idea} className="rounded-2xl border border-zinc-800 bg-black p-4 text-sm font-bold text-zinc-300">{idea}</div>)}</div></section>

      {cfg.ads.enabled && <section className="rounded-[2rem] border border-white/10 bg-black/45 p-5 md:p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">{cfg.ads.eyebrow}</p><div className="mx-auto mt-3 grid h-[90px] max-w-[728px] place-items-center rounded-xl border border-dashed border-white/15 bg-white/[0.025] text-center"><div><p className="font-black text-zinc-300">{cfg.ads.title}</p><p className="mt-1 text-sm text-zinc-600">{cfg.ads.description}</p></div></div></section>}
    </div>
  );
}
