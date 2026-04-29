import { useEffect, useMemo, useState } from "react";

const dailyContents = [
  { type: "Frase pronta", title: "Mensagem para divulgar algo", text: "Oi, pessoal! Estou testando um projeto novo com conteúdos úteis e ferramentas grátis. Quem puder entrar, testar e me dar feedback já ajuda muito 🙏" },
  { type: "Ideia rápida", title: "Coisa simples para postar", text: "Faça um antes/depois: antes eu fazia tudo bagunçado, agora uso modelos prontos para organizar ideias, trabalhos e mensagens." },
  { type: "WhatsApp", title: "Pedido de ajuda sem parecer chato", text: "Se esse app te ajudou em alguma coisa, compartilha com uma pessoa. Isso ajuda o projeto a crescer sem precisar cobrar de todo mundo." },
  { type: "Escola", title: "Começo de apresentação", text: "Bom dia, hoje eu vou apresentar sobre [tema]. Escolhi esse assunto porque ele aparece no nosso dia a dia e ajuda a entender melhor o mundo atual." },
  { type: "Organização", title: "Checklist de tarefa", text: "1. Entender o pedido\n2. Separar o tema\n3. Criar começo, meio e fim\n4. Revisar\n5. Entregar sem enrolar" },
  { type: "Criatividade", title: "Ideia de conteúdo", text: "Poste uma lista com 5 coisas que você faria diferente se começasse seu projeto hoje." },
];

const viralCards = [
  { title: "Manda para alguém que precisa", text: "Achei um app grátis com modelos, ideias e ferramentas simples. Testa aí e me fala se presta 😄" },
  { title: "Divulgação leve", text: "Tô apoiando um projeto pequeno. Se puder, entra e compartilha com alguém. Isso ajuda demais." },
  { title: "Status pronto", text: "Projeto novo no ar 🚀 tem ferramentas grátis, modelos e ideias rápidas. Link no app." },
  { title: "Grupo da família", text: "Fiz/achei um app com coisinhas úteis grátis. Quem puder testar e falar o que achou ajuda muito 🙏" },
];

const tips = ["Abra todo dia para pegar uma ideia nova.", "Copie modelos e adapte com suas palavras.", "Compartilhe só se o app realmente te ajudou.", "Conteúdo simples ganha quando é útil e rápido."];

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getInitialStats() {
  const saved = localStorage.getItem("thklayus-viral-stats");
  if (!saved) return { opens: 0, lastOpen: "", streak: 0, shares: 0 };
  try { return JSON.parse(saved); } catch { return { opens: 0, lastOpen: "", streak: 0, shares: 0 }; }
}

async function copyText(text: string, onDone?: () => void) {
  await navigator.clipboard.writeText(text);
  onDone?.();
  alert("Copiado! Agora é só colar onde quiser.");
}

export default function Gratis() {
  const [stats, setStats] = useState(getInitialStats);
  const [tema, setTema] = useState("");
  const today = todayKey();
  const contentOfDay = useMemo(() => dailyContents[new Date().getDate() % dailyContents.length], []);
  const showShareInvite = stats.opens >= 3 || stats.shares >= 1;

  useEffect(() => {
    setStats((current: any) => {
      if (current.lastOpen === today) return current;
      const next = { ...current, opens: Number(current.opens || 0) + 1, lastOpen: today, streak: Number(current.streak || 0) + 1 };
      localStorage.setItem("thklayus-viral-stats", JSON.stringify(next));
      return next;
    });
  }, [today]);

  function markShare() {
    const next = { ...stats, shares: Number(stats.shares || 0) + 1 };
    setStats(next);
    localStorage.setItem("thklayus-viral-stats", JSON.stringify(next));
  }

  function gerarIdeias() {
    const assunto = tema.trim() || "meu projeto";
    return [
      `3 ideias de post sobre ${assunto}`,
      `Uma frase curta para divulgar ${assunto}`,
      `Um checklist simples para organizar ${assunto}`,
      `Uma mensagem de WhatsApp explicando ${assunto}`,
    ];
  }

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-emerald-900 bg-gradient-to-br from-emerald-950/40 via-black to-zinc-950 p-6 md:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="rounded-full border border-emerald-900 bg-emerald-950/40 px-4 py-2 text-xs font-black uppercase text-emerald-300">Área grátis • abre todo dia</span>
            <h2 className="mt-5 text-4xl font-black md:text-6xl">Feed de ideias úteis</h2>
            <p className="mt-3 max-w-2xl text-zinc-400">Conteúdo rápido para copiar, adaptar e compartilhar. A ideia é fazer o usuário voltar sempre, sem depender de curso.</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-3xl border border-white/10 bg-black/35 p-4 text-center"><p className="text-3xl font-black text-white">{stats.opens}</p><p className="mt-1 text-xs font-bold uppercase text-zinc-500">visitas</p></div>
            <div className="rounded-3xl border border-white/10 bg-black/35 p-4 text-center"><p className="text-3xl font-black text-white">{stats.streak}</p><p className="mt-1 text-xs font-bold uppercase text-zinc-500">dias</p></div>
            <div className="rounded-3xl border border-white/10 bg-black/35 p-4 text-center"><p className="text-3xl font-black text-white">{stats.shares}</p><p className="mt-1 text-xs font-bold uppercase text-zinc-500">shares</p></div>
          </div>
        </div>
      </section>

      {showShareInvite && (
        <section className="rounded-[2rem] border border-violet-300/25 bg-violet-500/10 p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-200">Ajude o projeto</p>
          <h3 className="mt-2 text-3xl font-black text-white">Se você gostou, compartilha com alguém.</h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-violet-50/80">Isso ajuda o THKLAYUS Hub a crescer sem precisar cobrar de todo mundo. Manda para uma pessoa que pode usar as ideias grátis.</p>
          <button onClick={() => copyText("Achei um app grátis com ideias, modelos e ferramentas simples. Testa aí: " + window.location.href, markShare)} className="mt-5 rounded-2xl bg-white px-5 py-3 font-black text-black">Copiar mensagem de compartilhamento</button>
        </section>
      )}

      <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <article className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-200">Conteúdo do dia</p>
          <h3 className="mt-3 text-3xl font-black text-white">{contentOfDay.title}</h3>
          <span className="mt-3 inline-flex rounded-full border border-amber-300/20 bg-amber-500/10 px-3 py-1 text-xs font-black text-amber-100">{contentOfDay.type}</span>
          <p className="mt-5 whitespace-pre-wrap rounded-3xl border border-white/10 bg-black/45 p-5 text-base leading-8 text-zinc-200">{contentOfDay.text}</p>
          <button onClick={() => copyText(contentOfDay.text)} className="mt-5 rounded-2xl bg-white px-5 py-3 font-black text-black">Copiar conteúdo</button>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-black/45 p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">Voltar todo dia</p>
          <h3 className="mt-3 text-3xl font-black text-white">Sequência diária</h3>
          <p className="mt-3 text-sm leading-7 text-zinc-400">Cada visita conta no seu aparelho. Depois de algumas aberturas, o app pede compartilhamento de forma leve.</p>
          <div className="mt-5 space-y-2">{tips.map((tip) => <p key={tip} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm font-bold text-zinc-300">✓ {tip}</p>)}</div>
        </article>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Tela viral</p><h3 className="mt-2 text-3xl font-black text-white">Mensagens prontas para espalhar o app</h3></div></div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {viralCards.map((card) => <article key={card.title} className="rounded-[2rem] border border-white/10 bg-black/45 p-5"><h4 className="text-xl font-black text-white">{card.title}</h4><p className="mt-3 min-h-28 text-sm leading-6 text-zinc-400">{card.text}</p><button onClick={() => copyText(card.text, markShare)} className="mt-4 w-full rounded-2xl bg-white px-4 py-3 font-black text-black">Copiar</button></article>)}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-zinc-950 p-5 md:p-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">Gerador simples</p>
        <h3 className="mt-2 text-3xl font-black text-white">Gerar ideias para qualquer tema</h3>
        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]"><input value={tema} onChange={(e) => setTema(e.target.value)} placeholder="Tema: exemplo escola, dinheiro, treino, estudos..." className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none" /><button onClick={() => copyText(gerarIdeias().join("\n"))} className="rounded-2xl bg-white px-5 py-3 font-black text-black">Copiar ideias</button></div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">{gerarIdeias().map((idea) => <div key={idea} className="rounded-2xl border border-zinc-800 bg-black p-4 text-sm font-bold text-zinc-300">{idea}</div>)}</div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-black/45 p-5 md:p-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">Publicidade futura</p>
        <div className="mt-3 grid min-h-28 place-items-center rounded-[1.5rem] border border-dashed border-white/15 bg-white/[0.025] text-center"><div><p className="font-black text-zinc-300">Espaço reservado para anúncio</p><p className="mt-1 text-sm text-zinc-600">Só ativar quando o app tiver usuários suficientes.</p></div></div>
      </section>
    </div>
  );
}
