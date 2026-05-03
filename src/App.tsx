import { useMemo, useState } from "react";

type Screen = "home" | "catalog" | "details" | "player" | "profile";
type Title = {
  id: number;
  name: string;
  type: string;
  year: string;
  age: string;
  duration: string;
  match: string;
  genre: string;
  progress: number;
  description: string;
  gradient: string;
};

const titles: Title[] = [
  {
    id: 1,
    name: "Eclipse 9",
    type: "Série original",
    year: "2026",
    age: "14+",
    duration: "8 episódios",
    match: "98%",
    genre: "Sci-fi • Mistério",
    progress: 64,
    description: "Quando uma cidade inteira perde a memória por nove minutos, uma equipe tenta descobrir o que apareceu no céu antes do apagão.",
    gradient: "bg-[radial-gradient(circle_at_25%_15%,rgba(59,130,246,0.55),transparent_30%),radial-gradient(circle_at_80%_75%,rgba(147,51,234,0.42),transparent_35%),linear-gradient(135deg,#020617,#111827)]",
  },
  {
    id: 2,
    name: "Rua Zero",
    type: "Filme",
    year: "2025",
    age: "12+",
    duration: "1h 48min",
    match: "94%",
    genre: "Ação • Suspense",
    progress: 28,
    description: "Um entregador encontra uma rota que não existe no mapa e acaba preso em uma operação secreta dentro da própria cidade.",
    gradient: "bg-[radial-gradient(circle_at_20%_20%,rgba(239,68,68,0.50),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(245,158,11,0.35),transparent_35%),linear-gradient(135deg,#1c1917,#020617)]",
  },
  {
    id: 3,
    name: "O Último Sinal",
    type: "Minissérie",
    year: "2024",
    age: "16+",
    duration: "5 episódios",
    match: "91%",
    genre: "Drama • Tecnologia",
    progress: 82,
    description: "Depois que uma transmissão aparece em todos os dispositivos do planeta, uma jornalista tenta encontrar a origem do sinal.",
    gradient: "bg-[radial-gradient(circle_at_30%_10%,rgba(20,184,166,0.48),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(14,165,233,0.35),transparent_35%),linear-gradient(135deg,#042f2e,#020617)]",
  },
  {
    id: 4,
    name: "Noite Prisma",
    type: "Anime original",
    year: "2026",
    age: "10+",
    duration: "12 episódios",
    match: "96%",
    genre: "Fantasia • Aventura",
    progress: 12,
    description: "Um garoto encontra uma biblioteca viva onde cada livro abre uma dimensão com regras próprias.",
    gradient: "bg-[radial-gradient(circle_at_24%_18%,rgba(236,72,153,0.55),transparent_30%),radial-gradient(circle_at_76%_80%,rgba(168,85,247,0.42),transparent_35%),linear-gradient(135deg,#111827,#2e1065)]",
  },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selected, setSelected] = useState<Title>(titles[0]);
  const [myList, setMyList] = useState<number[]>([1, 3]);

  const savedTitles = useMemo(() => titles.filter((title) => myList.includes(title.id)), [myList]);

  function openTitle(title: Title) {
    setSelected(title);
    setScreen("details");
  }

  function toggleList(title: Title) {
    setMyList((current) => current.includes(title.id) ? current.filter((id) => id !== title.id) : [...current, title.id]);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(124,58,237,0.20),transparent_30%),linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_22%)]" />
      <section className="relative mx-auto min-h-screen max-w-7xl px-5 py-5 md:px-8">
        <header className="flex items-center justify-between rounded-[1.7rem] border border-white/10 bg-black/55 p-3 backdrop-blur-2xl">
          <button onClick={() => setScreen("home")} className="flex items-center gap-3 rounded-2xl px-2 py-2 text-left">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-lg font-black text-black">V</div>
            <div>
              <p className="text-sm font-black tracking-tight">Vanta+</p>
              <p className="text-xs font-bold text-zinc-500">Original streaming</p>
            </div>
          </button>
          <nav className="hidden gap-2 md:flex">
            {([['home','Início'],['catalog','Catálogo'],['profile','Perfil']] as [Screen,string][]).map(([id,label]) => (
              <button key={id} onClick={() => setScreen(id)} className={`rounded-2xl px-4 py-3 text-xs font-black uppercase tracking-[0.16em] transition ${screen === id ? 'bg-white text-black' : 'text-zinc-400 hover:bg-white/10 hover:text-white'}`}>{label}</button>
            ))}
          </nav>
          <button onClick={() => setScreen("profile")} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-white">Minha lista {myList.length}</button>
        </header>

        {screen === "home" && (
          <div className="py-6">
            <section className={`min-h-[620px] rounded-[3rem] border border-white/10 ${selected.gradient} p-6 shadow-2xl shadow-black/70 md:p-10`}>
              <div className="flex min-h-[560px] flex-col justify-between">
                <div className="flex flex-wrap justify-between gap-3"><span className="rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] backdrop-blur-xl">Destaque de hoje</span><span className="rounded-full bg-black/35 px-4 py-2 text-xs font-black backdrop-blur-xl">{selected.match} compatível</span></div>
                <div className="max-w-3xl">
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-white/70">{selected.type}</p>
                  <h1 className="mt-4 text-6xl font-black leading-[0.86] tracking-[-0.09em] md:text-8xl">{selected.name}</h1>
                  <p className="mt-5 text-sm font-bold text-white/70">{selected.year} • {selected.age} • {selected.duration} • {selected.genre}</p>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{selected.description}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button onClick={() => setScreen("player")} className="rounded-2xl bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:scale-[1.02] active:scale-[0.98]">▶ Assistir</button>
                    <button onClick={() => toggleList(selected)} className="rounded-2xl border border-white/15 bg-black/30 px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-white backdrop-blur-xl">{myList.includes(selected.id) ? '✓ Na lista' : '+ Minha lista'}</button>
                    <button onClick={() => setScreen("catalog")} className="rounded-2xl border border-white/15 bg-white/10 px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-white backdrop-blur-xl">Catálogo</button>
                  </div>
                </div>
              </div>
            </section>
            <section className="mt-8"><div className="flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Continue assistindo</p><h2 className="mt-2 text-3xl font-black tracking-[-0.06em]">Sua sessão</h2></div></div><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{titles.map((title) => <button key={title.id} onClick={() => openTitle(title)} className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-3 text-left transition hover:-translate-y-1 hover:bg-white/10"><div className={`h-40 rounded-[1.5rem] ${title.gradient}`} /><h3 className="mt-4 text-lg font-black tracking-[-0.04em]">{title.name}</h3><p className="mt-1 text-xs font-bold text-zinc-500">{title.genre}</p><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-white" style={{ width: `${title.progress}%` }} /></div></button>)}</div></section>
          </div>
        )}

        {screen === "catalog" && (
          <div className="py-8"><p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Catálogo Vanta+</p><h2 className="mt-3 text-5xl font-black tracking-[-0.08em] md:text-7xl">Originais para explorar.</h2><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{titles.map((title) => <button key={title.id} onClick={() => openTitle(title)} className="rounded-[2.3rem] border border-white/10 bg-white/[0.05] p-3 text-left transition hover:-translate-y-1 hover:border-white/25"><div className={`h-72 rounded-[1.8rem] ${title.gradient}`} /><div className="p-3"><p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">{title.type}</p><h3 className="mt-3 text-2xl font-black tracking-[-0.05em]">{title.name}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{title.genre}</p></div></button>)}</div></div>
        )}

        {screen === "details" && (
          <div className="grid gap-6 py-8 lg:grid-cols-[1fr_380px]"><section className={`min-h-[620px] rounded-[3rem] border border-white/10 ${selected.gradient} p-8`}><button onClick={() => setScreen('catalog')} className="rounded-full bg-black/30 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] backdrop-blur-xl">← Voltar</button><div className="mt-44 max-w-3xl"><p className="text-sm font-black uppercase tracking-[0.25em] text-white/70">{selected.type}</p><h1 className="mt-4 text-6xl font-black tracking-[-0.09em] md:text-8xl">{selected.name}</h1><p className="mt-5 text-white/70">{selected.year} • {selected.age} • {selected.duration}</p><p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{selected.description}</p><div className="mt-8 flex flex-wrap gap-3"><button onClick={() => setScreen('player')} className="rounded-2xl bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-black">▶ Assistir agora</button><button onClick={() => toggleList(selected)} className="rounded-2xl border border-white/15 bg-black/30 px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-white">{myList.includes(selected.id) ? '✓ Na lista' : '+ Minha lista'}</button></div></div></section><aside className="rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Detalhes</p><div className="mt-6 grid gap-4"><div className="rounded-3xl bg-black/35 p-5"><p className="text-sm text-zinc-500">Compatibilidade</p><p className="mt-2 text-3xl font-black">{selected.match}</p></div><div className="rounded-3xl bg-black/35 p-5"><p className="text-sm text-zinc-500">Gênero</p><p className="mt-2 text-xl font-black">{selected.genre}</p></div><div className="rounded-3xl bg-black/35 p-5"><p className="text-sm text-zinc-500">Progresso</p><div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-white" style={{ width: `${selected.progress}%` }} /></div></div></div></aside></div>
        )}

        {screen === "player" && (
          <div className="grid min-h-[calc(100vh-120px)] place-items-center py-8"><section className="w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-black shadow-2xl shadow-black/80"><div className={`grid aspect-video place-items-center ${selected.gradient}`}><div className="text-center"><div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-white text-4xl text-black">▶</div><h1 className="mt-8 text-5xl font-black tracking-[-0.08em]">{selected.name}</h1><p className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-white/60">Player demonstrativo</p></div></div><div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 p-5"><button onClick={() => setScreen('details')} className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white">Voltar</button><div className="h-2 min-w-56 flex-1 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-white" style={{ width: `${selected.progress}%` }} /></div><span className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">{selected.progress}%</span></div></section></div>
        )}

        {screen === "profile" && (
          <div className="py-8"><p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Perfil</p><h2 className="mt-3 text-5xl font-black tracking-[-0.08em] md:text-7xl">Minha lista.</h2><div className="mt-8 grid gap-4 md:grid-cols-2">{savedTitles.map((title) => <button key={title.id} onClick={() => openTitle(title)} className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-4 text-left transition hover:bg-white/10"><div className={`h-44 rounded-[1.5rem] ${title.gradient}`} /><h3 className="mt-4 text-2xl font-black tracking-[-0.05em]">{title.name}</h3><p className="mt-2 text-sm text-zinc-500">{title.genre}</p></button>)}</div></div>
        )}

        <nav className="fixed bottom-4 left-1/2 z-20 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 justify-between rounded-[1.5rem] border border-white/10 bg-black/85 p-2 backdrop-blur-2xl md:hidden">
          {([['home','Início'],['catalog','Catálogo'],['profile','Lista']] as [Screen,string][]).map(([id,label]) => <button key={id} onClick={() => setScreen(id)} className={`rounded-2xl px-4 py-3 text-[11px] font-black ${screen === id ? 'bg-white text-black' : 'text-zinc-500'}`}>{label}</button>)}
        </nav>
      </section>
    </main>
  );
}
