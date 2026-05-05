import { useMemo, useState } from "react";
import UnoGame from "./UnoGame";

type Screen = "home" | "play" | "profile" | "shop" | "modes";

const storage = "thklayus-classic-clash";
function readNumber(key: string) {
  return Number(localStorage.getItem(`${storage}:${key}`) || 0);
}

function NavButton({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`rounded-2xl px-4 py-3 text-sm font-black transition ${active ? "bg-white text-black" : "bg-white/10 text-white"}`}>
      {children}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{label}</p>
      <strong className="mt-2 block text-2xl text-white">{value}</strong>
    </div>
  );
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
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">THKLAYUS</p>
          <h1 className="text-3xl font-black tracking-tight">Arena Clash</h1>
        </div>
        <div className="rounded-full bg-black/40 px-4 py-2 text-sm font-black">🪙 {stats.coins}</div>
      </header>

      <nav className="mb-6 flex gap-2 overflow-x-auto pb-2">
        <NavButton active={screen === "home"} onClick={() => setScreen("home")}>Início</NavButton>
        <NavButton active={screen === "modes"} onClick={() => setScreen("modes")}>Modos</NavButton>
        <NavButton active={screen === "profile"} onClick={() => setScreen("profile")}>Perfil</NavButton>
        <NavButton active={screen === "shop"} onClick={() => setScreen("shop")}>Loja</NavButton>
      </nav>

      {screen === "home" && (
        <section className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <div className="arena-mobile rounded-[2rem] p-6">
            <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-black text-emerald-100">Jogo principal</span>
            <h2 className="mt-5 text-5xl font-black leading-none">Arena Clash</h2>
            <p className="mt-4 max-w-xl text-emerald-50/80">Um jogo de cartas rápido com bots, poderes, combos, progressão e identidade própria da THKLAYUS.</p>
            <button onClick={() => setScreen("play")} className="pro-button mt-8 rounded-3xl px-6 py-4 text-lg font-black">Jogar agora</button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Stat label="Nível" value={stats.level} />
            <Stat label="XP" value={stats.xp} />
            <Stat label="Vitórias" value={stats.wins} />
            <Stat label="Win rate" value={`${stats.winRate}%`} />
          </div>
        </section>
      )}

      {screen === "modes" && (
        <section className="grid gap-4 md:grid-cols-2">
          <button onClick={() => setScreen("play")} className="pro-card rounded-3xl p-6 text-left">
            <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-black text-emerald-200">Disponível</span>
            <h2 className="mt-4 text-3xl font-black">Clash Cards</h2>
            <p className="mt-2 text-zinc-400">Cartas, coringas, bloqueios, reverso, stack e bots estratégicos.</p>
          </button>
          <div className="pro-card rounded-3xl p-6 opacity-70">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-zinc-300">Em breve</span>
            <h2 className="mt-4 text-3xl font-black">Rush Mode</h2>
            <p className="mt-2 text-zinc-400">Modo rápido com tempo, pontuação e recompensas maiores.</p>
          </div>
          <div className="pro-card rounded-3xl p-6 opacity-70">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-zinc-300">Em breve</span>
            <h2 className="mt-4 text-3xl font-black">Boss Table</h2>
            <p className="mt-2 text-zinc-400">Partidas contra bot chefe com regras especiais.</p>
          </div>
        </section>
      )}

      {screen === "profile" && (
        <section className="glass-card rounded-[2rem] p-6">
          <div className="flex items-center gap-4">
            <div className="arena-avatar">EU</div>
            <div>
              <h2 className="text-3xl font-black">Jogador THK</h2>
              <p className="text-zinc-400">Nível {stats.level} · {stats.xp} XP</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            <Stat label="Moedas" value={stats.coins} />
            <Stat label="Vitórias" value={stats.wins} />
            <Stat label="Derrotas" value={stats.losses} />
            <Stat label="Win rate" value={`${stats.winRate}%`} />
          </div>
        </section>
      )}

      {screen === "shop" && (
        <section className="grid gap-4 md:grid-cols-3">
          {["Mesa Esmeralda", "Cartas Neon", "Avatar Shadow", "Efeito Fogo", "Tema Gelo", "Trilha Arcade"].map((item, index) => (
            <div key={item} className="pro-card rounded-3xl p-5">
              <div className="h-24 rounded-2xl bg-gradient-to-br from-emerald-400/40 via-violet-500/30 to-black" />
              <h3 className="mt-4 text-xl font-black">{item}</h3>
              <p className="mt-1 text-sm text-zinc-400">Cosmético para deixar sua arena diferente.</p>
              <button className="mt-4 rounded-2xl border border-white/15 px-4 py-2 text-sm font-black">{80 + index * 25} moedas</button>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
