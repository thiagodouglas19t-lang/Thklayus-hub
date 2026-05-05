import { useMemo, useState } from "react";
import UnoGame from "./UnoGame";

type Screen = "home" | "play" | "profile" | "shop" | "modes";

const storage = "thklayus-classic-clash";
const avatarItems = [
  { name: "Shadow Roxo", rarity: "Raro", price: 120, emoji: "🌑", gradient: "from-violet-900 via-fuchsia-700 to-black" },
  { name: "Samurai Neon", rarity: "Épico", price: 220, emoji: "⚔️", gradient: "from-cyan-400 via-blue-700 to-black" },
  { name: "Dragão Verde", rarity: "Épico", price: 260, emoji: "🐉", gradient: "from-emerald-400 via-green-800 to-black" },
  { name: "Rei Dourado", rarity: "Lendário", price: 420, emoji: "👑", gradient: "from-yellow-200 via-amber-500 to-black" },
  { name: "Fantasma Glitch", rarity: "Raro", price: 180, emoji: "👾", gradient: "from-zinc-200 via-purple-600 to-black" },
  { name: "Kairós Prime", rarity: "Lendário", price: 500, emoji: "⏳", gradient: "from-white via-violet-400 to-black" },
];

function readNumber(key: string) {
  return Number(localStorage.getItem(`${storage}:${key}`) || 0);
}

function NavButton({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return <button onClick={onClick} className={`rounded-2xl px-4 py-3 text-sm font-black transition ${active ? "bg-white text-black" : "bg-white/10 text-white"}`}>{children}</button>;
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-4"><p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{label}</p><strong className="mt-2 block text-2xl text-white">{value}</strong></div>;
}

export default function GameApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const stats = useMemo(() => {
    const coins = readNumber("coins");
    const xp = readNumber("xp");
    const wins = readNumber("wins");
    const losses = readNumber("losses");
    const level = Math.floor(xp / 100) + 1;
    const total = Math.max(1, wins + losses);
    const winRate = Math.round((wins / total) * 100);
    return { coins, xp, wins, losses, level, winRate };
  }, [screen]);

  if (screen === "play") return <UnoGame onBack={() => setScreen("home")} />;

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-6 text-white sm:px-6 lg:px-8">
      <header className="mb-5 flex items-center justify-between gap-3">
        <div><p className="text-xs uppercase tracking-[0.3em] text-emerald-300">THKLAYUS</p><h1 className="text-3xl font-black tracking-tight">Arena Clash</h1></div>
        <div className="rounded-full bg-black/40 px-4 py-2 text-sm font-black">🪙 {stats.coins}</div>
      </header>

      <nav className="mb-6 flex gap-2 overflow-x-auto pb-2">
        <NavButton active={screen === "home"} onClick={() => setScreen("home")}>Início</NavButton>
        <NavButton active={screen === "modes"} onClick={() => setScreen("modes")}>Modos</NavButton>
        <NavButton active={screen === "profile"} onClick={() => setScreen("profile")}>Perfil</NavButton>
        <NavButton active={screen === "shop"} onClick={() => setScreen("shop")}>Loja</NavButton>
      </nav>

      {screen === "home" && <section className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><div className="arena-mobile rounded-[2rem] p-6"><span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-black text-emerald-100">Jogo principal</span><h2 className="mt-5 text-5xl font-black leading-none">Arena Clash</h2><p className="mt-4 max-w-xl text-emerald-50/80">Um jogo de cartas rápido com bots, poderes, combos, progressão e identidade própria da THKLAYUS.</p><button onClick={() => setScreen("play")} className="pro-button mt-8 rounded-3xl px-6 py-4 text-lg font-black">Jogar agora</button></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"><Stat label="Nível" value={stats.level} /><Stat label="XP" value={stats.xp} /><Stat label="Vitórias" value={stats.wins} /><Stat label="Win rate" value={`${stats.winRate}%`} /></div></section>}

      {screen === "modes" && <section className="grid gap-4 md:grid-cols-2"><button onClick={() => setScreen("play")} className="pro-card rounded-3xl p-6 text-left"><span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-black text-emerald-200">Disponível</span><h2 className="mt-4 text-3xl font-black">Clash Cards</h2><p className="mt-2 text-zinc-400">Cartas, coringas, bloqueios, reverso, stack e bots estratégicos.</p></button><div className="pro-card rounded-3xl p-6 opacity-70"><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-zinc-300">Em breve</span><h2 className="mt-4 text-3xl font-black">Rush Mode</h2><p className="mt-2 text-zinc-400">Modo rápido com tempo, pontuação e recompensas maiores.</p></div><div className="pro-card rounded-3xl p-6 opacity-70"><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-zinc-300">Em breve</span><h2 className="mt-4 text-3xl font-black">Boss Table</h2><p className="mt-2 text-zinc-400">Partidas contra bot chefe com regras especiais.</p></div></section>}

      {screen === "profile" && <section className="glass-card rounded-[2rem] p-6"><div className="flex items-center gap-4"><div className="arena-avatar">EU</div><div><h2 className="text-3xl font-black">Jogador THK</h2><p className="text-zinc-400">Nível {stats.level} · {stats.xp} XP</p></div></div><div className="mt-6 grid gap-3 sm:grid-cols-4"><Stat label="Moedas" value={stats.coins} /><Stat label="Vitórias" value={stats.wins} /><Stat label="Derrotas" value={stats.losses} /><Stat label="Win rate" value={`${stats.winRate}%`} /></div></section>}

      {screen === "shop" && <section className="space-y-5"><div className="glass-card rounded-[2rem] p-6"><p className="text-xs uppercase tracking-[0.3em] text-violet-300">Loja</p><h2 className="mt-2 text-4xl font-black">Avatares personalizados</h2><p className="mt-2 max-w-2xl text-zinc-400">Venda avatares prontos e pedidos personalizados. Depois a gente liga compra real, entrega e edição de perfil.</p></div><div className="grid gap-4 md:grid-cols-3">{avatarItems.map((item) => <div key={item.name} className="pro-card rounded-3xl p-5"><div className={`grid h-32 place-items-center rounded-3xl bg-gradient-to-br ${item.gradient} text-5xl shadow-2xl shadow-black/40`}><span>{item.emoji}</span></div><div className="mt-4 flex items-start justify-between gap-3"><div><h3 className="text-xl font-black">{item.name}</h3><p className="text-sm text-zinc-400">{item.rarity}</p></div><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black">🪙 {item.price}</span></div><button className="mt-4 w-full rounded-2xl border border-white/15 px-4 py-3 text-sm font-black">Comprar avatar</button></div>)}</div><div className="rounded-[2rem] border border-yellow-300/20 bg-yellow-400/10 p-5"><h3 className="text-2xl font-black">Pedido personalizado</h3><p className="mt-2 text-yellow-100/80">O usuário poderá pedir um avatar exclusivo feito pelo ADM/dev. Ideal pra vender por dinheiro real depois.</p><button className="mt-4 rounded-2xl bg-white px-5 py-3 font-black text-black">Solicitar personalizado</button></div></section>}
    </main>
  );
}
