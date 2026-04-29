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
const topicTags = ["escola", "dinheiro", "status", "WhatsApp", "apresentação", "arte", "organização", "família"];

function todayKey() { return new Date().toISOString().slice(0, 10); }
function getInitialStats() { const saved = localStorage.getItem("thklayus-viral-stats"); if (!saved) return { opens: 0, lastOpen: "", streak: 0, shares: 0 }; try { return JSON.parse(saved); } catch { return { opens: 0, lastOpen: "", streak: 0, shares: 0 }; } }

export default function Gratis() {
  const [stats, setStats] = useState(getInitialStats);
  const [tema, setTema] = useState("");
  const [toast, setToast] = useState("");
  const today = todayKey();
  const contentOfDay = useMemo(() => dailyContents[new Date().getDate() % dailyContents.length], []);
  const showShareInvite = stats.opens >= 3 || stats.shares >= 1;

  useEffect(() => { setStats((current: any) => { if (current.lastOpen === today) return current; const next = { ...current, opens: Number(current.opens || 0) + 1, lastOpen: today, streak: Number(current.streak || 0) + 1 }; localStorage.setItem("thklayus-viral-stats", JSON.stringify(next)); return next; }); }, [today]);
  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(""), 2200); return () => window.clearTimeout(timer); }, [toast]);

  function markShare() { const next = { ...stats, shares: Number(stats.shares || 0) + 1 }; setStats(next); localStorage.setItem("thklayus-viral-stats", JSON.stringify(next)); }
  async function copyText(text: string, onDone?: () => void) { await navigator.clipboard.writeText(text); onDone?.(); setToast("Copiado para a área de transferência!"); }
  async function shareText(text: string) { const shareData = { title: "THKLAYUS Hub", text, url: window.location.origin }; if (navigator.share) { await navigator.share(shareData); markShare(); setToast("Compartilhamento aberto!"); return; } await copyText(`${text}\n${window.location.origin}`, markShare); }
  function gerarIdeias() { const assunto = tema.trim() || "meu projeto"; return [`3 ideias de post sobre ${assunto}`, `Uma frase curta para divulgar ${assunto}`, `Um checklist simples para organizar ${assunto}`, `Uma mensagem de WhatsApp explicando ${assunto}`]; }

  return (
    <div className="space-y-6">
      {toast && <div className="fixed bottom-24 left-1/2 z-[90] -translate-x-1/2 rounded-2xl border border-emerald-300/25 bg-emerald-500/95 px-5 py-3 text-sm font-black text-black shadow-2xl shadow-emerald-500/20">{toast}</div>}

      <section className="relative overflow-hidden rounded-[2.5rem] border border-emerald-900 bg-gradient-to-br from-emerald-950/40 via-black to-zinc-950 p-6 md:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="rounded-full border border-emerald-900 bg-emerald-950/40 px-4 py-2 text-xs font-black uppercase text-emerald-300">Área grátis • abre todo dia</span>
            <h2 className="mt-5 text-4xl font-black md:text-6xl">Feed de ideias úteis</h2>
            <p className="mt-3 max-w-2xl text-zinc-400">Conteúdo rápido para copiar, adaptar e compartilhar. Sempre gratuito, mantido por anúncios discretos e apoio da comunidade no futuro.</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-3xl border border-white/10 bg-black/35 p-4 text-center"><p className="text-3xl font-black text-white">{stats.opens}</p><p className="mt-1 text-xs font-bold uppercase text-zinc-500">visitas</p></div>
            <div className="rounded-3xl border border-orange-300/20 bg-orange-500/10 p-4 text-center"><p className="text-3xl font-black text-white">🔥 {stats.streak}</p><p className="mt-1 text-xs font-bold uppercase text-orange-200/70">sequência</p></div>
            <div className="rounded-3xl border border-white/10 bg-black/35 p-4 text-center"><p className="text-3xl font-black text-white">{stats.shares}</p><p className="mt-1 text-xs font-bold uppercase text-zinc-500">shares</p></div>
          </div>
        </div>
      </section>

      {showShareInvite && <section className="rounded-[2rem] border border-violet-300/25 bg-violet-500/10 p-5 md:p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-200">Ajude o projeto</p><h3 className="mt-2 text-3xl font-black text-white">Se você gostou, compartilha com alguém.</h3><p className="mt-2 max-w-3xl text-sm leading-7 text-violet-50/80">Isso ajuda o THKLAYUS Hub a crescer sem precisar cobrar de todo mundo.</p><div className="mt-5 flex flex-wrap gap-3"><button onClick={() => shareText("Achei um app grátis com ideias, modelos e ferramentas simples. Testa aí:")} className="rounded-2xl bg-white px-5 py-3 font-black text-black">Compartilhar direto</button><button onClick={() => copyText("Achei um app grátis com ideias, modelos e ferramentas simples. Testa aí: " + window.location.origin, markShare)} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 font-black text-white">Copiar mensagem</button></div></section>}

      <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <article className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 md:p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.22em] text-amber-200">Conteúdo do dia</p><h3 className="mt-3 text-3xl font-black text-white">{contentOfDay.title}</h3><span className="mt-3 inline-flex rounded-full border border-amber-300/20 bg-amber-500/10 px-3 py-1 text-xs font-black text-amber-100">{contentOfDay.type}</span></div><button title="Copiar" onClick={() => copyText(contentOfDay.text)} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-lg font-black text-white transition hover:bg-white hover:text-black">⧉</button></div><p className="mt-5 whitespace-pre-wrap rounded-3xl border border-white/10 bg-black/45 p-5 text-base leading-8 text-zinc-200">{contentOfDay.text}</p><div className="mt-4 flex flex-wrap gap-3"><button onClick={() => copyText(contentOfDay.text)} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-black text-zinc-200">Copiar</button><button onClick={() => shareText(contentOfDay.text)} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-black">Compartilhar</button></div></article>
        <article className="rounded-[2rem] border border-white/10 bg-black/45 p-5 md:p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">Voltar todo dia</p><h3 className="mt-3 text-3xl font-black text-white">🔥 Sequência diária</h3><p className="mt-3 text-sm leading-7 text-zinc-400">Cada visita conta no seu aparelho. Depois de algumas aberturas, o app pede compartilhamento de forma leve.</p><div className="mt-5 space-y-3">{tips.map((tip) => <p key={tip} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm font-bold leading-6 text-zinc-300">✓ {tip}</p>)}</div></article>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 md:p-6"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Tela viral</p><h3 className="mt-2 text-3xl font-black text-white">Mensagens prontas para espalhar o app</h3></div></div><div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{viralCards.map((card) => <article key={card.title} className="relative rounded-[2rem] border border-white/10 bg-black/45 p-5 pr-14"><button title="Copiar" onClick={() => copyText(card.text, markShare)} className="absolute right-4 top-4 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-black text-white hover:bg-white hover:text-black">⧉</button><h4 className="text-xl font-black text-white">{card.title}</h4><p className="mt-3 min-h-28 text-sm leading-6 text-zinc-400">{card.text}</p><button onClick={() => shareText(card.text)} className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-black text-black">Compartilhar</button></article>)}</div></section>

      <section className="rounded-[2rem] border border-white/10 bg-zinc-950 p-5 md:p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">Gerador simples</p><h3 className="mt-2 text-3xl font-black text-white">Gerar ideias para qualquer tema</h3><div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]"><input value={tema} onChange={(e) => setTema(e.target.value)} placeholder="Digite um tema..." className="rounded-3xl border border-zinc-800 bg-black px-5 py-4 text-base font-bold outline-none focus:border-emerald-300/40" /><button onClick={() => copyText(gerarIdeias().join("\n"))} className="rounded-2xl bg-white px-5 py-3 font-black text-black">Copiar ideias</button></div><div className="mt-4 flex flex-wrap gap-2">{topicTags.map((tag) => <button key={tag} onClick={() => setTema(tag)} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black text-zinc-300 hover:border-emerald-300/40 hover:text-white">{tag}</button>)}</div><div className="mt-5 grid gap-3 md:grid-cols-2">{gerarIdeias().map((idea) => <div key={idea} className="rounded-2xl border border-zinc-800 bg-black p-4 text-sm font-bold text-zinc-300">{idea}</div>)}</div></section>

      <section className="rounded-[2rem] border border-white/10 bg-black/45 p-5 md:p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">Publicidade futura</p><div className="mx-auto mt-3 grid h-[90px] max-w-[728px] place-items-center rounded-xl border border-dashed border-white/15 bg-white/[0.025] text-center"><div><p className="font-black text-zinc-300">Banner 728×90 / responsivo</p><p className="mt-1 text-sm text-zinc-600">Placeholder para testar o layout antes dos anúncios reais.</p></div></div></section>
    </div>
  );
}
