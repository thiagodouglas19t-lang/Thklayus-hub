import { useMemo, useState } from "react";

type Tribe = "estudante" | "freelancer";
type Vibe = "simples" | "formal" | "direto";

type Template = {
  id: string;
  tribe: Tribe;
  title: string;
  description: string;
  tag: string;
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
    variants: {
      simples: "Bom dia/boa tarde. Hoje vou apresentar sobre [tema]. Primeiro, vou explicar o que é. Depois, vou mostrar os pontos principais e um exemplo. Para finalizar, vou fazer uma conclusão rápida. Obrigado pela atenção.",
      formal: "Cumprimento a todos. Nesta apresentação, abordarei o tema [tema], explicando seu conceito, sua importância e seus principais impactos. Ao final, apresentarei uma breve conclusão com os pontos mais relevantes.",
      direto: "Tema: [tema].\nVou explicar: 1) o que é, 2) por que importa, 3) exemplo, 4) conclusão. Vamos começar.",
    },
  },
  {
    id: "introducao-trabalho",
    tribe: "estudante",
    title: "Introdução de trabalho",
    description: "Começo pronto para trabalho escolar ficar mais organizado.",
    tag: "Trabalho",
    variants: {
      simples: "Este trabalho fala sobre [tema]. O objetivo é explicar de forma simples o que é, por que é importante e como aparece no dia a dia. Também serão apresentados exemplos para facilitar o entendimento.",
      formal: "O presente trabalho tem como objetivo analisar [tema], destacando seus principais aspectos, sua relevância e suas aplicações. A proposta é apresentar uma visão clara e organizada sobre o assunto.",
      direto: "Neste trabalho, vou explicar [tema], mostrar os pontos principais e apresentar exemplos para deixar o assunto mais fácil de entender.",
    },
  },
  {
    id: "plano-estudo",
    tribe: "estudante",
    title: "Plano de estudo rápido",
    description: "Organiza uma matéria em blocos pequenos.",
    tag: "Estudo",
    variants: {
      simples: "Plano para estudar [tema]\n\n1. Ler o conteúdo por 10 minutos\n2. Anotar 5 pontos importantes\n3. Fazer um resumo curto\n4. Resolver 3 perguntas\n5. Revisar antes de dormir",
      formal: "Plano de estudo para [tema]\n\nEtapa 1: leitura inicial\nEtapa 2: identificação dos conceitos principais\nEtapa 3: resumo e fixação\nEtapa 4: exercícios práticos\nEtapa 5: revisão final",
      direto: "Estude [tema] assim:\nLer → resumir → praticar → revisar.\nTempo mínimo: 25 minutos.",
    },
  },
  {
    id: "proposta-servico",
    tribe: "freelancer",
    title: "Proposta de serviço premium",
    description: "Esqueleto para responder cliente com segurança e parecer profissional.",
    tag: "Venda",
    variants: {
      simples: "Oi! Posso fazer [serviço] para você.\n\nO que está incluso:\n• [entrega 1]\n• [entrega 2]\n• Ajuste simples se precisar\n\nPrazo: [prazo]\nValor: R$ [valor]\n\nSe estiver tudo certo, posso começar hoje.",
      formal: "Olá, [nome]. Tudo bem?\n\nSegue minha proposta para [serviço]:\n\nEscopo:\n• [entrega principal]\n• [detalhe importante]\n• [formato de entrega]\n\nPrazo estimado: [prazo]\nInvestimento: R$ [valor]\n\nApós confirmação, inicio a produção e mantenho você informado sobre o andamento.",
      direto: "Faço [serviço].\nValor: R$ [valor].\nPrazo: [prazo].\nInclui: [entrega].\nSe confirmar agora, começo hoje.",
    },
  },
  {
    id: "cobrar-cliente",
    tribe: "freelancer",
    title: "Cobrar cliente sem vergonha",
    description: "Mensagem para cobrar pagamento ou resposta sem parecer chato.",
    tag: "Cliente",
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
    variants: {
      simples: "Preço sugerido:\n\n(Horas de trabalho × valor da hora) + complexidade + urgência\n\nExemplo:\n2h × R$10 = R$20\nComplexidade: +R$5\nUrgência: +R$5\nTotal: R$30",
      formal: "Fórmula de precificação:\n\nValor base = horas estimadas × valor/hora\nAdicional de complexidade = 20% do valor base\nTaxa de urgência = valor extra definido conforme prazo\n\nPreço final = base + complexidade + urgência.",
      direto: "Cobrança rápida:\nPouco trabalho: R$5 a R$10\nMédio: R$15 a R$25\nUrgente ou caprichado: R$30+\n\nNunca cobre menos que seu tempo vale.",
    },
  },
  {
    id: "divulgar-servico",
    tribe: "freelancer",
    title: "Divulgação de serviço",
    description: "Texto para status ou grupo sem parecer spam.",
    tag: "Divulgação",
    variants: {
      simples: "Estou fazendo [serviço] por um valor acessível. Se alguém precisar de [exemplo], pode me chamar que eu faço com cuidado e entrego rápido.",
      formal: "Estou disponível para realizar [serviço], com foco em organização, qualidade e entrega dentro do prazo. Caso precise ou conheça alguém que precise, estou à disposição.",
      direto: "Faço [serviço]. Entrega rápida e preço acessível. Quem precisar, me chama.",
    },
  },
  {
    id: "pedir-indicacao",
    tribe: "freelancer",
    title: "Pedir indicação",
    description: "Mensagem curta para conseguir cliente por indicação.",
    tag: "Crescimento",
    variants: {
      simples: "Oi! Se você conhecer alguém precisando de [serviço], pode me indicar? Estou pegando alguns trabalhos e isso me ajudaria bastante.",
      formal: "Olá! Estou divulgando meu serviço de [serviço]. Caso conheça alguém que precise, ficarei muito grato pela indicação.",
      direto: "Se souber de alguém precisando de [serviço], me indica lá. Estou fazendo por preço acessível.",
    },
  },
];

const tribeCopy: Record<Tribe, { title: string; desc: string; icon: string }> = {
  estudante: { title: "Estudante", desc: "Resumo, apresentação, professor e plano de estudo.", icon: "🎓" },
  freelancer: { title: "Freelancer", desc: "Proposta, preço, cliente, divulgação e meta.", icon: "💼" },
};

export default function Cursos() {
  const [tribe, setTribe] = useState<Tribe>("estudante");
  const [vibe, setVibe] = useState<Vibe>("simples");
  const [busca, setBusca] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const filtrados = useMemo(() => {
    const termo = busca.toLowerCase().trim();
    return templates.filter((item) => {
      const matchTribe = item.tribe === tribe;
      const matchBusca = !termo || `${item.title} ${item.description} ${item.tag} ${item.variants.simples} ${item.variants.formal} ${item.variants.direto}`.toLowerCase().includes(termo);
      return matchTribe && matchBusca;
    });
  }, [tribe, busca]);

  async function copiar(id: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1400);
  }

  function pedirPronto() {
    window.dispatchEvent(new CustomEvent("thklayus-open-page", { detail: "pedidos" }));
  }

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[3rem] border border-violet-300/15 bg-[#030006] px-6 py-10 text-center shadow-2xl shadow-violet-950/30 md:px-10 md:py-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.34),transparent_34%),radial-gradient(circle_at_12%_18%,rgba(124,58,237,0.22),transparent_30%)]" />
        <div className="relative mx-auto max-w-4xl">
          <span className="rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">Beta • Estudante & Freelancer</span>
          <h1 className="mt-7 text-5xl font-black leading-[0.95] tracking-[-0.08em] text-white md:text-7xl">Templates com borogodó.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">Escolha sua tribo, escolha a vibe e copie um modelo com personalidade. Nada de curso. Nada de texto genérico.</p>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        {(["estudante", "freelancer"] as Tribe[]).map((item) => (
          <button key={item} onClick={() => setTribe(item)} className={`rounded-[2rem] border p-5 text-left transition active:scale-[0.99] ${tribe === item ? "border-violet-300 bg-violet-300 text-black shadow-2xl shadow-violet-500/20" : "border-white/10 bg-white/[0.035] text-white hover:border-violet-300/35"}`}>
            <p className="text-4xl">{tribeCopy[item].icon}</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.06em]">{tribeCopy[item].title}</h2>
            <p className={`mt-2 text-sm font-semibold leading-6 ${tribe === item ? "text-black/65" : "text-zinc-500"}`}>{tribeCopy[item].desc}</p>
          </button>
        ))}
      </section>

      <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-4 md:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar modelo..." className="min-h-12 rounded-2xl border border-white/10 bg-black/45 px-4 text-sm font-bold text-white outline-none placeholder:text-zinc-600 focus:border-violet-300/40" />
          <div className="flex gap-2 overflow-x-auto pb-1">
            {vibes.map((item) => <button key={item.id} onClick={() => setVibe(item.id)} className={`whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-black transition active:scale-95 ${vibe === item.id ? "bg-white text-black" : "border border-white/10 bg-black/35 text-zinc-400 hover:text-white"}`}>{item.label}</button>)}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtrados.map((item) => {
          const text = item.variants[vibe];
          return (
            <article key={item.id} className="group rounded-[2rem] border border-white/10 bg-black/45 p-5 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-violet-300/35">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">{item.tag} • {vibes.find((v) => v.id === vibe)?.label}</p>
                  <h3 className="mt-2 text-2xl font-black leading-tight text-white">{item.title}</h3>
                </div>
                <button onClick={() => copiar(item.id, text)} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-black active:scale-95">{copied === item.id ? "Copiado" : "Copiar"}</button>
              </div>
              <p className="mt-3 text-sm font-semibold text-zinc-500">{item.description}</p>
              <p className="mt-4 whitespace-pre-line rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-4 text-sm font-semibold leading-7 text-zinc-200">{text}</p>
              <div className="mt-4 rounded-2xl border border-violet-300/15 bg-violet-500/10 p-4">
                <p className="text-sm font-black text-violet-100">Sem tempo para preencher?</p>
                <p className="mt-1 text-xs font-semibold leading-5 text-violet-100/70">Peça pronto e economize tempo.</p>
                <button onClick={pedirPronto} className="mt-3 rounded-xl bg-violet-300 px-4 py-2 text-xs font-black text-black active:scale-95">Pedir pronto</button>
              </div>
            </article>
          );
        })}
      </section>

      {filtrados.length === 0 && <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center text-zinc-500">Nenhum modelo encontrado.</div>}
    </div>
  );
}
