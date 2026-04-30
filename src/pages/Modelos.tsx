import { useMemo, useRef, useState } from "react";

type Tribe = "estudante" | "freelancer";
type Vibe = "simples" | "formal" | "direto";

type Template = {
  id: string;
  tribe: Tribe;
  title: string;
  description: string;
  tag: string;
  paidHint?: string;
  variants: Record<Vibe, string>;
};

const vibes: { id: Vibe; label: string }[] = [
  { id: "simples", label: "Simples" },
  { id: "formal", label: "Formal" },
  { id: "direto", label: "Direto" },
];

const templates: Template[] = [
  {
    id: "professor-entrega",
    tribe: "estudante",
    title: "Mensagem para professor",
    description: "Entregar trabalho, explicar atraso ou pedir consideração sem parecer bagunçado.",
    tag: "Escola",
    paidHint: "Sem tempo para arrumar o trabalho? Peça pronto.",
    variants: {
      simples: "Oi, professor! Estou enviando meu trabalho sobre [tema]. Tive um pouco de dificuldade com [motivo], mas organizei o melhor que consegui. Obrigado pela atenção.",
      formal: "Prezado professor, segue em anexo meu trabalho sobre [tema]. Agradeço pelas aulas e fico à disposição caso seja necessário corrigir ou complementar alguma parte.",
      direto: "Professor, segue meu trabalho de [tema]. Consegui finalizar e estou enviando para avaliação. Obrigado.",
    },
  },
  {
    id: "resumo-escolar",
    tribe: "estudante",
    title: "Resumo com cara de trabalho",
    description: "Estrutura curta para começar um resumo sem ficar genérico.",
    tag: "Resumo",
    paidHint: "Quer o resumo completo? Peça pronto.",
    variants: {
      simples: "Resumo sobre [tema]\n\n[tema] é importante porque ajuda a entender melhor [contexto]. Os pontos principais são: [ponto 1], [ponto 2] e [ponto 3]. Concluindo, esse assunto mostra que [conclusão simples].",
      formal: "O presente resumo aborda [tema], destacando seus principais conceitos, aplicações e relevância. Inicialmente, observa-se que [explicação]. Em seguida, percebe-se a importância de [ponto central]. Portanto, [tema] contribui para uma compreensão mais ampla de [contexto].",
      direto: "Tema: [tema]\n\nO que é: [definição]\nPor que importa: [motivo]\nExemplo: [exemplo]\nConclusão: [fechamento].",
    },
  },
  {
    id: "roteiro-slide",
    tribe: "estudante",
    title: "Roteiro de apresentação",
    description: "Base para falar na frente da turma sem travar.",
    tag: "Apresentação",
    paidHint: "Quer o slide montado? Peça pronto.",
    variants: {
      simples: "Bom dia/boa tarde. Hoje vou apresentar sobre [tema]. Primeiro, vou explicar o que é. Depois, vou mostrar os pontos principais e um exemplo. Para finalizar, vou fazer uma conclusão rápida. Obrigado pela atenção.",
      formal: "Cumprimento a todos. Nesta apresentação, abordarei o tema [tema], explicando seu conceito, sua importância e seus principais impactos. Ao final, apresentarei uma breve conclusão com os pontos mais relevantes.",
      direto: "Tema: [tema].\nVou explicar: 1) o que é, 2) por que importa, 3) exemplo, 4) conclusão. Vamos começar.",
    },
  },
  {
    id: "proposta-servico",
    tribe: "freelancer",
    title: "Proposta de serviço premium",
    description: "Responder cliente com segurança e parecer profissional.",
    tag: "Venda",
    paidHint: "Quer ajuda para fechar o valor? Peça uma revisão rápida.",
    variants: {
      simples: "Oi, [nome]! Vi que você precisa de [serviço].\n\nMinha entrega foca em resolver [problema] de forma prática, organizada e sem enrolação.\n\nIncluso: [entrega 1], [entrega 2] e ajuste simples.\nPrazo: [prazo]\nInvestimento: R$ [valor]\n\nSe estiver tudo certo, posso começar hoje.",
      formal: "Prezado(a) [nome], tudo bem?\n\nProponho uma solução de [serviço] para otimizar [problema] com uma entrega clara e profissional.\n\nEscopo: [entrega principal], [detalhe importante] e [formato de entrega].\nPrazo: [prazo]\nInvestimento: R$ [valor]\n\nApós sua confirmação, inicio a produção e mantenho você informado(a).",
      direto: "Olá, [nome]. Vi que você precisa de [serviço].\n\nEu resolvo [problema] com uma entrega direta e pronta para uso.\n\nValor: R$ [valor]\nPrazo: [prazo]\nInclui: [entrega]\n\nPosso começar na [data]. Podemos fechar?",
    },
  },
  {
    id: "cobrar-cliente",
    tribe: "freelancer",
    title: "Cobrar cliente sem vergonha",
    description: "Cobrar pagamento ou resposta sem parecer chato.",
    tag: "Cliente",
    paidHint: "Ainda com medo de cobrar? Peça uma mensagem personalizada.",
    variants: {
      simples: "Oi! Passando só para lembrar sobre [pagamento/resposta] do serviço de [serviço]. Quando puder, me dá um retorno para eu organizar por aqui. Obrigado!",
      formal: "Olá, [nome]. Tudo bem? Gostaria de confirmar o andamento referente a [pagamento/resposta] do serviço de [serviço]. Fico no aguardo para dar continuidade da melhor forma.",
      direto: "Oi, [nome]. Consegue me dar retorno sobre [pagamento/resposta] hoje? Preciso confirmar para finalizar a organização do serviço.",
    },
  },
  {
    id: "preco-servico",
    tribe: "freelancer",
    title: "Calcular preço de serviço",
    description: "Fórmula simples para não cobrar baixo demais.",
    tag: "Preço",
    paidHint: "Na dúvida do valor? Peça uma precificação rápida.",
    variants: {
      simples: "Preço sugerido:\n\n(Horas × valor da hora) + complexidade + urgência\n\nExemplo:\n2h × R$10 = R$20\nComplexidade: +R$5\nUrgência: +R$5\nTotal: R$30",
      formal: "Fórmula de precificação:\n\nValor base = horas estimadas × valor/hora\nComplexidade = 20% do valor base\nUrgência = adicional conforme prazo\n\nPreço final = base + complexidade + urgência.",
      direto: "Cobrança rápida:\nPouco trabalho: R$5 a R$10\nMédio: R$15 a R$25\nUrgente ou caprichado: R$30+\n\nNunca cobre menos que seu tempo vale.",
    },
  },
];

const tribeCopy: Record<Tribe, { title: string; desc: string; icon: string }> = {
  estudante: { title: "Estudante", desc: "Professor, resumo e apresentação.", icon: "🎓" },
  freelancer: { title: "Freelancer", desc: "Cobrança, proposta e preço.", icon: "💼" },
};

const priorityIds = ["cobrar-cliente", "professor-entrega", "proposta-servico", "resumo-escolar", "preco-servico"];
const toastMessages = ["Pronto para colar!", "Copiado. Agora é só colar e enviar.", "Sucesso! Resolveu rápido."];

function safeReadNumber(key: string) {
  try {
    return Number(localStorage.getItem(key) || 0);
  } catch {
    return 0;
  }
}

export default function Modelos() {
  const [tribe, setTribe] = useState<Tribe>("freelancer");
  const [vibe, setVibe] = useState<Vibe>("simples");
  const [busca, setBusca] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>("cobrar-cliente");
  const [toast, setToast] = useState("");
  const [copyCount, setCopyCount] = useState(() => safeReadNumber("drafta_copy_count"));
  const resultRef = useRef<HTMLDivElement | null>(null);

  const filtrados = useMemo(() => {
    const termo = busca.toLowerCase().trim();
    return templates.filter((item) => {
      const matchTribe = item.tribe === tribe;
      const matchBusca = !termo || `${item.title} ${item.description} ${item.tag} ${item.variants.simples} ${item.variants.formal} ${item.variants.direto}`.toLowerCase().includes(termo);
      return matchTribe && matchBusca;
    });
  }, [tribe, busca]);

  const selected = templates.find((item) => item.id === selectedId && item.tribe === tribe) ?? filtrados[0] ?? templates[0];
  const selectedText = selected.variants[vibe];

  function showToast(message?: string) {
    const next = message ?? toastMessages[Math.floor(Math.random() * toastMessages.length)];
    setToast(next);
    window.setTimeout(() => setToast(""), 1800);
  }

  async function copiar(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      const nextCount = copyCount + 1;
      setCopyCount(nextCount);
      localStorage.setItem("drafta_copy_count", String(nextCount));
      showToast();
      setTimeout(() => setCopied(null), 1400);
    } catch {
      showToast("Seu navegador bloqueou a cópia. Segure o texto e copie manualmente.");
    }
  }

  function pedirPronto() {
    window.dispatchEvent(new CustomEvent("thklayus-open-page", { detail: "pedidos" }));
  }

  function escolherPraMim() {
    const pool = templates.filter((item) => priorityIds.includes(item.id));
    const pick = pool[Math.floor(Math.random() * pool.length)];
    const vibePick = vibes[Math.floor(Math.random() * vibes.length)].id;
    setTribe(pick.tribe);
    setSelectedId(pick.id);
    setVibe(vibePick);
    setBusca("");
    showToast("Escolhi uma base pra você.");
    window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }

  return (
    <div className="space-y-5">
      {toast && <div className="fixed bottom-24 left-1/2 z-[80] w-[calc(100%-32px)] max-w-md -translate-x-1/2 rounded-2xl border border-violet-300/20 bg-violet-500 px-4 py-3 text-center text-sm font-black text-white shadow-2xl shadow-violet-500/30">{toast}</div>}

      <section className="relative overflow-hidden rounded-[2.5rem] border border-violet-300/15 bg-[#030006] px-6 py-8 text-center shadow-2xl shadow-violet-950/30 md:px-10 md:py-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.32),transparent_34%),radial-gradient(circle_at_12%_18%,rgba(124,58,237,0.20),transparent_30%)]" />
        <div className="relative mx-auto max-w-4xl">
          <span className="rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-violet-100">Drafta • pronto para usar</span>
          <h1 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.07em] text-white md:text-6xl">Copie sem começar do zero.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-7 text-zinc-400 md:text-base">Clique no botão, copie uma base pronta e cole onde precisar.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={escolherPraMim} className="rounded-2xl bg-white px-7 py-4 text-sm font-black text-black shadow-[0_0_38px_rgba(124,58,237,0.28)] transition hover:scale-[1.02] active:scale-95">Escolhe pra mim ✦</button>
            <button onClick={() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })} className="rounded-2xl border border-white/10 bg-white/[0.035] px-7 py-4 text-sm font-black text-zinc-300 transition hover:border-violet-300/35 active:scale-95">Ver sugestão</button>
          </div>
          <p className="mt-4 text-xs font-bold text-zinc-500">Você já economizou tempo em {copyCount} {copyCount === 1 ? "modelo" : "modelos"}.</p>
        </div>
      </section>

      <section ref={resultRef} className="rounded-[2rem] border border-violet-300/25 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.22),transparent_35%),rgba(255,255,255,0.04)] p-4 md:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-violet-300">Sugestão agora • {selected.tag} • {vibes.find((v) => v.id === vibe)?.label}</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-white">{selected.title}</h2>
            <p className="mt-1 text-sm font-semibold text-zinc-500">{selected.description}</p>
          </div>
          <button onClick={() => copiar(selected.id, selectedText)} className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-black active:scale-95">{copied === selected.id ? "Copiado" : "Copiar e usar"}</button>
        </div>
        <p className="mt-4 whitespace-pre-line rounded-[1.4rem] border border-white/10 bg-black/45 p-4 text-sm font-semibold leading-7 text-zinc-200">{selectedText}</p>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        {(["freelancer", "estudante"] as Tribe[]).map((item) => (
          <button key={item} onClick={() => { setTribe(item); setSelectedId(item === "freelancer" ? "cobrar-cliente" : "professor-entrega"); }} className={`rounded-[1.7rem] border p-4 text-left transition active:scale-[0.99] ${tribe === item ? "border-violet-300 bg-violet-300 text-black shadow-2xl shadow-violet-500/20" : "border-white/10 bg-white/[0.035] text-white hover:border-violet-300/35"}`}>
            <p className="text-3xl">{tribeCopy[item].icon}</p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.05em]">{tribeCopy[item].title}</h2>
            <p className={`mt-1 text-sm font-semibold leading-5 ${tribe === item ? "text-black/65" : "text-zinc-500"}`}>{tribeCopy[item].desc}</p>
          </button>
        ))}
      </section>

      <section className="sticky top-[74px] z-20 rounded-[2rem] border border-white/10 bg-black/75 p-3 backdrop-blur-2xl md:top-[86px]">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar modelo..." className="min-h-12 min-w-0 rounded-2xl border border-white/10 bg-black/55 px-4 text-sm font-bold text-white outline-none placeholder:text-zinc-600 focus:border-violet-300/40" />
          <div className="grid min-w-0 grid-cols-3 gap-2">
            {vibes.map((item) => <button key={item.id} onClick={() => setVibe(item.id)} className={`min-w-0 rounded-2xl px-3 py-3 text-sm font-black transition active:scale-95 ${vibe === item.id ? "bg-white text-black" : "border border-white/10 bg-black/35 text-zinc-400 hover:text-white"}`}>{item.label}</button>)}
          </div>
        </div>
      </section>

      <section className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtrados.map((item) => {
          const text = item.variants[vibe];
          const isPriority = priorityIds.includes(item.id);
          const isSelected = selected.id === item.id;
          return (
            <article key={item.id} onClick={() => setSelectedId(item.id)} className={`group min-w-0 cursor-pointer rounded-[1.8rem] border bg-black/45 p-4 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-violet-300/35 ${isSelected ? "border-violet-300 bg-violet-500/10" : isPriority ? "border-violet-300/30" : "border-white/10"}`}>
              <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-violet-300">{item.tag} • {vibes.find((v) => v.id === vibe)?.label}</p>
                  <h3 className="mt-2 text-xl font-black leading-tight text-white md:text-2xl">{item.title}</h3>
                </div>
                <button onClick={(e) => { e.stopPropagation(); copiar(item.id, text); }} className="shrink-0 rounded-2xl bg-white px-4 py-3 text-sm font-black text-black active:scale-95">{copied === item.id ? "Copiado" : "Copiar"}</button>
              </div>
              <p className="mt-2 text-sm font-semibold text-zinc-500">{item.description}</p>
              <p className="mt-3 max-h-[190px] overflow-auto whitespace-pre-line rounded-[1.3rem] border border-white/10 bg-white/[0.035] p-4 text-sm font-semibold leading-7 text-zinc-200">{text}</p>
              {item.paidHint && (
                <button onClick={(e) => { e.stopPropagation(); pedirPronto(); }} className="mt-3 w-full rounded-2xl border border-violet-300/20 bg-violet-500/10 px-4 py-3 text-left text-xs font-black text-violet-100 transition hover:bg-violet-500/15 active:scale-[0.99]">
                  {item.paidHint} <span className="text-violet-300">Pedir agora →</span>
                </button>
              )}
            </article>
          );
        })}
      </section>

      {filtrados.length === 0 && <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center text-zinc-500">Nenhum modelo encontrado.</div>}
    </div>
  );
}
