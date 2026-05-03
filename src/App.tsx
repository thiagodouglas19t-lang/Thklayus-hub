import { useMemo, useState } from "react";

type Screen = "home" | "explore" | "bag" | "pass";
type Destination = {
  id: number;
  city: string;
  country: string;
  vibe: string;
  price: number;
  temp: string;
  rating: string;
  image: string;
};

const destinations: Destination[] = [
  { id: 1, city: "Neo Tokyo", country: "Japão", vibe: "Noite neon", price: 1290, temp: "18°C", rating: "4.9", image: "bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.45),transparent_30%),radial-gradient(circle_at_80%_75%,rgba(59,130,246,0.40),transparent_35%),linear-gradient(135deg,#111827,#020617)]" },
  { id: 2, city: "Aurora Bay", country: "Islândia", vibe: "Céu polar", price: 980, temp: "-2°C", rating: "4.8", image: "bg-[radial-gradient(circle_at_25%_15%,rgba(45,212,191,0.45),transparent_32%),radial-gradient(circle_at_75%_70%,rgba(168,85,247,0.35),transparent_34%),linear-gradient(135deg,#020617,#082f49)]" },
  { id: 3, city: "Solara", country: "Marrocos", vibe: "Deserto premium", price: 740, temp: "31°C", rating: "4.7", image: "bg-[radial-gradient(circle_at_22%_20%,rgba(251,191,36,0.48),transparent_33%),radial-gradient(circle_at_78%_72%,rgba(249,115,22,0.36),transparent_35%),linear-gradient(135deg,#1c1917,#431407)]" },
  { id: 4, city: "Glass Coast", country: "Grécia", vibe: "Mar cristalino", price: 860, temp: "24°C", rating: "4.9", image: "bg-[radial-gradient(circle_at_28%_22%,rgba(14,165,233,0.50),transparent_33%),radial-gradient(circle_at_78%_78%,rgba(255,255,255,0.22),transparent_31%),linear-gradient(135deg,#0f172a,#075985)]" },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selected, setSelected] = useState<Destination>(destinations[0]);
  const [saved, setSaved] = useState<number[]>([]);

  const savedTrips = useMemo(() => destinations.filter((item) => saved.includes(item.id)), [saved]);
  const total = savedTrips.reduce((sum, item) => sum + item.price, 0);

  function toggleSave(item: Destination) {
    setSelected(item);
    setSaved((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id]);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_5%,rgba(14,165,233,0.24),transparent_28%),radial-gradient(circle_at_85%_0%,rgba(236,72,153,0.18),transparent_26%),radial-gradient(circle_at_55%_100%,rgba(255,255,255,0.08),transparent_30%)]" />
      <section className="relative mx-auto min-h-screen max-w-7xl px-5 py-5 md:px-8">
        <header className="flex items-center justify-between rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 backdrop-blur-2xl">
          <button onClick={() => setScreen("home")} className="flex items-center gap-3 rounded-[1.4rem] px-2 py-2 text-left">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-lg font-black text-black">A</div>
            <div>
              <p className="text-sm font-black tracking-tight">Astra</p>
              <p className="text-xs font-bold text-zinc-500">Travel intelligence</p>
            </div>
          </button>
          <nav className="hidden gap-2 md:flex">
            {([['home','Home'],['explore','Explorar'],['bag','Viagens'],['pass','Pass']] as [Screen,string][]).map(([id,label]) => (
              <button key={id} onClick={() => setScreen(id)} className={`rounded-2xl px-4 py-3 text-xs font-black uppercase tracking-[0.16em] transition ${screen === id ? 'bg-white text-black' : 'text-zinc-400 hover:bg-white/10 hover:text-white'}`}>{label}</button>
            ))}
          </nav>
          <button onClick={() => setScreen("bag")} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-white">{saved.length} salvas</button>
        </header>

        {screen === "home" && (
          <div className="grid min-h-[calc(100vh-120px)] items-center gap-8 py-8 lg:grid-cols-[1fr_450px]">
            <div>
              <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100">Novo jeito de escolher viagens</p>
              <h1 className="mt-7 max-w-4xl text-6xl font-black leading-[0.86] tracking-[-0.09em] md:text-8xl">Escolha o clima. O app acha o destino.</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">Um app premium de descoberta de viagens: visual forte, cards rápidos, lista salva e um pass digital bonito para testar como produto real.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <button onClick={() => setScreen("explore")} className="rounded-2xl bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:scale-[1.02] active:scale-[0.98]">Explorar destinos</button>
                <button onClick={() => setScreen("pass")} className="rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-white">Ver pass</button>
              </div>
            </div>
            <div className={`min-h-[560px] rounded-[3rem] border border-white/10 ${selected.image} p-6 shadow-2xl shadow-black/60`}>
              <div className="flex h-full flex-col justify-between">
                <div className="flex justify-between"><span className="rounded-full bg-white/15 px-4 py-2 text-xs font-black backdrop-blur-xl">{selected.vibe}</span><span className="rounded-full bg-black/30 px-4 py-2 text-xs font-black backdrop-blur-xl">★ {selected.rating}</span></div>
                <div><p className="text-sm font-black uppercase tracking-[0.24em] text-white/70">Destino destacado</p><h2 className="mt-3 text-6xl font-black tracking-[-0.08em]">{selected.city}</h2><p className="mt-3 text-xl font-bold text-white/70">{selected.country}</p></div>
              </div>
            </div>
          </div>
        )}

        {screen === "explore" && (
          <div className="py-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Explorar</p><h2 className="mt-3 text-5xl font-black tracking-[-0.08em] md:text-7xl">Destinos vivos.</h2></div><p className="max-w-md text-sm leading-6 text-zinc-500">Clique em um card para destacar. Salve para montar sua lista.</p></div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {destinations.map((item) => (
                <button key={item.id} onClick={() => setSelected(item)} className={`min-h-[420px] rounded-[2.4rem] border p-5 text-left transition hover:-translate-y-1 ${selected.id === item.id ? 'border-white/40' : 'border-white/10'} ${item.image}`}>
                  <div className="flex h-full flex-col justify-between"><div className="flex justify-between"><span className="rounded-full bg-white/15 px-3 py-2 text-xs font-black backdrop-blur-xl">{item.temp}</span><span className="rounded-full bg-black/30 px-3 py-2 text-xs font-black backdrop-blur-xl">★ {item.rating}</span></div><div><p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">{item.vibe}</p><h3 className="mt-3 text-4xl font-black tracking-[-0.07em]">{item.city}</h3><p className="mt-2 text-sm font-bold text-white/70">{item.country}</p><button onClick={(event) => { event.stopPropagation(); toggleSave(item); }} className="mt-5 w-full rounded-2xl bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-black">{saved.includes(item.id) ? 'Remover' : 'Salvar'} • R${item.price}</button></div></div>
                </button>
              ))}
            </div>
          </div>
        )}

        {screen === "bag" && (
          <div className="grid gap-6 py-8 lg:grid-cols-[1fr_360px]"><section className="rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Viagens salvas</p><h2 className="mt-3 text-5xl font-black tracking-[-0.08em]">Sua lista.</h2><div className="mt-8 grid gap-4">{savedTrips.length ? savedTrips.map((item)=><div key={item.id} className="flex items-center justify-between gap-4 rounded-[2rem] border border-white/10 bg-black/35 p-4"><div><h3 className="text-2xl font-black tracking-[-0.05em]">{item.city}</h3><p className="mt-1 text-sm text-zinc-500">{item.country} • {item.vibe}</p></div><p className="text-lg font-black">R${item.price}</p></div>) : <p className="rounded-[2rem] border border-white/10 bg-black/35 p-6 text-zinc-400">Nenhuma viagem salva ainda.</p>}</div></section><aside className="rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Resumo</p><p className="mt-5 text-6xl font-black tracking-[-0.08em]">R${total}</p><p className="mt-3 text-sm leading-6 text-zinc-500">Total estimado das experiências salvas.</p><button onClick={() => setScreen('explore')} className="mt-6 w-full rounded-2xl bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-black">Adicionar destino</button></aside></div>
        )}

        {screen === "pass" && (
          <div className="grid min-h-[calc(100vh-120px)] place-items-center py-8"><div className="w-full max-w-xl rounded-[3rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/60 backdrop-blur-2xl"><div className="rounded-[2.4rem] border border-white/10 bg-[radial-gradient(circle_at_20%_15%,rgba(14,165,233,0.35),transparent_32%),radial-gradient(circle_at_85%_85%,rgba(236,72,153,0.28),transparent_35%),linear-gradient(135deg,#020617,#030712)] p-6"><div className="flex justify-between"><p className="text-xs font-black uppercase tracking-[0.25em] text-white/60">Astra Pass</p><p className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Beta</p></div><h2 className="mt-20 text-5xl font-black tracking-[-0.08em]">Thiago Douglas</h2><p className="mt-3 text-sm font-bold text-white/60">Explorer account • 2026</p><div className="mt-16 grid grid-cols-3 gap-3 text-center"><div className="rounded-2xl bg-white/10 p-4"><p className="text-2xl font-black">{saved.length}</p><p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/50">salvas</p></div><div className="rounded-2xl bg-white/10 p-4"><p className="text-2xl font-black">4.9</p><p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/50">rating</p></div><div className="rounded-2xl bg-white/10 p-4"><p className="text-2xl font-black">VIP</p><p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/50">status</p></div></div></div></div></div>
        )}

        <nav className="fixed bottom-4 left-1/2 z-20 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 justify-between rounded-[1.5rem] border border-white/10 bg-black/85 p-2 backdrop-blur-2xl md:hidden">
          {([['home','Home'],['explore','Explorar'],['bag','Lista'],['pass','Pass']] as [Screen,string][]).map(([id,label]) => <button key={id} onClick={() => setScreen(id)} className={`rounded-2xl px-3 py-3 text-[11px] font-black ${screen === id ? 'bg-white text-black' : 'text-zinc-500'}`}>{label}</button>)}
        </nav>
      </section>
    </main>
  );
}
