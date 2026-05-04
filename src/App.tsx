import { useEffect, useMemo, useRef, useState } from "react";

type Bot = { id: number; x: number; y: number; hp: number };
type Bullet = { id: number; x: number; y: number; vx: number; vy: number };
type Player = { x: number; y: number; hp: number };

const W = 900;
const H = 560;
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);

export default function App() {
  const keys = useRef<Record<string, boolean>>({});
  const [started, setStarted] = useState(false);
  const [player, setPlayer] = useState<Player>({ x: W / 2, y: H / 2, hp: 100 });
  const [bots, setBots] = useState<Bot[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [best, setBest] = useState(() => Number(localStorage.getItem("arena:best") || 0));
  const [aim, setAim] = useState({ x: 1, y: 0 });

  const gameOver = started && (player.hp <= 0 || time <= 0);
  const hpPercent = useMemo(() => clamp(player.hp, 0, 100), [player.hp]);

  function resetGame() {
    setStarted(true);
    setPlayer({ x: W / 2, y: H / 2, hp: 100 });
    setBots([
      { id: 1, x: 90, y: 90, hp: 2 },
      { id: 2, x: 810, y: 90, hp: 2 },
      { id: 3, x: 120, y: 470, hp: 2 },
    ]);
    setBullets([]);
    setScore(0);
    setTime(60);
    setAim({ x: 1, y: 0 });
  }

  function shoot() {
    if (!started || gameOver) return;
    const length = Math.hypot(aim.x, aim.y) || 1;
    setBullets((current) => [
      ...current.slice(-18),
      { id: Date.now() + Math.random(), x: player.x, y: player.y, vx: (aim.x / length) * 12, vy: (aim.y / length) * 12 },
    ]);
  }

  function touchMove(dx: number, dy: number) {
    if (!started || gameOver) return;
    setAim({ x: dx, y: dy });
    setPlayer((p) => {
      const len = Math.hypot(dx, dy) || 1;
      return { ...p, x: clamp(p.x + (dx / len) * 18, 24, W - 24), y: clamp(p.y + (dy / len) * 18, 24, H - 24) };
    });
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = true;
      if (e.key === " ") shoot();
    };
    const up = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  });

  useEffect(() => {
    if (!started || gameOver) return;
    const timer = window.setInterval(() => setTime((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [started, gameOver]);

  useEffect(() => {
    if (!started || gameOver) return;
    const loop = window.setInterval(() => {
      setPlayer((p) => {
        let dx = 0;
        let dy = 0;
        if (keys.current.w || keys.current.arrowup) dy -= 1;
        if (keys.current.s || keys.current.arrowdown) dy += 1;
        if (keys.current.a || keys.current.arrowleft) dx -= 1;
        if (keys.current.d || keys.current.arrowright) dx += 1;
        if (dx || dy) setAim({ x: dx, y: dy });
        const len = Math.hypot(dx, dy) || 1;
        return { ...p, x: clamp(p.x + (dx / len) * 6, 24, W - 24), y: clamp(p.y + (dy / len) * 6, 24, H - 24) };
      });

      setBullets((list) => list.map((b) => ({ ...b, x: b.x + b.vx, y: b.y + b.vy })).filter((b) => b.x > 0 && b.x < W && b.y > 0 && b.y < H));

      setBots((currentBots) => {
        let next = currentBots.map((bot) => {
          const angle = Math.atan2(player.y - bot.y, player.x - bot.x);
          return { ...bot, x: bot.x + Math.cos(angle) * 2.2, y: bot.y + Math.sin(angle) * 2.2 };
        });

        setBullets((currentBullets) => {
          const remainingBullets: Bullet[] = [];
          next = next.map((bot) => {
            const hit = currentBullets.find((bullet) => dist(bot, bullet) < 28);
            if (hit) return { ...bot, hp: bot.hp - 1 };
            return bot;
          });
          currentBullets.forEach((bullet) => {
            const touched = next.some((bot) => dist(bot, bullet) < 28);
            if (!touched) remainingBullets.push(bullet);
          });
          return remainingBullets;
        });

        const killed = next.filter((bot) => bot.hp <= 0).length;
        if (killed) setScore((value) => value + killed * 10);
        next = next.filter((bot) => bot.hp > 0);
        while (next.length < 5) {
          const side = Math.floor(Math.random() * 4);
          next.push({
            id: Date.now() + Math.random(),
            x: side === 0 ? 40 : side === 1 ? W - 40 : Math.random() * W,
            y: side === 2 ? 40 : side === 3 ? H - 40 : Math.random() * H,
            hp: 2,
          });
        }
        return next;
      });

      setPlayer((p) => {
        const touching = bots.some((bot) => dist(bot, p) < 32);
        return touching ? { ...p, hp: Math.max(0, p.hp - 3) } : p;
      });
    }, 33);
    return () => window.clearInterval(loop);
  }, [started, gameOver, player.x, player.y, bots]);

  useEffect(() => {
    if (!gameOver) return;
    if (score > best) {
      setBest(score);
      localStorage.setItem("arena:best", String(score));
    }
  }, [gameOver, score, best]);

  return (
    <main className="min-h-screen touch-none bg-[#050505] p-4 text-white">
      <section className="mx-auto max-w-6xl">
        <header className="mb-4 flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.06] p-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-200">Clash Arena</p>
            <h1 className="text-3xl font-black tracking-[-0.06em]">Survival Arena</h1>
          </div>
          <button onClick={resetGame} className="rounded-2xl bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-black">
            {started ? "Recomeçar" : "Jogar"}
          </button>
        </header>

        <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111]" style={{ aspectRatio: `${W}/${H}` }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,.20),transparent_35%),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px]" />

            {!started && <div className="absolute inset-0 grid place-items-center bg-black/60 text-center"><div><h2 className="text-5xl font-black tracking-[-0.08em]">Entre na arena.</h2><p className="mt-3 text-zinc-400">WASD/setas move • espaço atira • celular tem botões</p></div></div>}

            {started && <>
              <div className="absolute rounded-full bg-cyan-300 shadow-[0_0_28px_rgba(103,232,249,.9)]" style={{ width: 34, height: 34, left: `${(player.x / W) * 100}%`, top: `${(player.y / H) * 100}%`, transform: "translate(-50%, -50%)" }} />
              {bots.map((bot) => <div key={bot.id} className="absolute rounded-full bg-red-500 shadow-[0_0_22px_rgba(239,68,68,.8)]" style={{ width: 30, height: 30, left: `${(bot.x / W) * 100}%`, top: `${(bot.y / H) * 100}%`, transform: "translate(-50%, -50%)" }} />)}
              {bullets.map((bullet) => <div key={bullet.id} className="absolute rounded-full bg-white" style={{ width: 9, height: 9, left: `${(bullet.x / W) * 100}%`, top: `${(bullet.y / H) * 100}%`, transform: "translate(-50%, -50%)" }} />)}
              {gameOver && <div className="absolute inset-0 grid place-items-center bg-black/70 text-center"><div><p className="text-xs font-black uppercase tracking-[0.22em] text-red-200">Fim da partida</p><h2 className="mt-2 text-6xl font-black tracking-[-0.09em]">{score} pts</h2><button onClick={resetGame} className="mt-5 rounded-2xl bg-white px-6 py-4 font-black text-black">Jogar de novo</button></div></div>}
            </>}
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">Status</p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl bg-black/35 p-4"><p className="text-zinc-500">Tempo</p><p className="text-4xl font-black">{time}s</p></div>
              <div className="rounded-2xl bg-black/35 p-4"><p className="text-zinc-500">Pontos</p><p className="text-4xl font-black">{score}</p></div>
              <div className="rounded-2xl bg-black/35 p-4"><p className="text-zinc-500">Recorde</p><p className="text-4xl font-black">{best}</p></div>
              <div className="rounded-2xl bg-black/35 p-4"><p className="text-zinc-500">Vida</p><div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-white" style={{ width: `${hpPercent}%` }} /></div></div>
            </div>
          </aside>
        </div>

        <div className="fixed bottom-4 left-4 z-20 grid grid-cols-3 gap-2 md:hidden">
          <span />
          <button onClick={() => touchMove(0, -1)} className="rounded-2xl bg-white/90 px-5 py-4 font-black text-black">↑</button>
          <span />
          <button onClick={() => touchMove(-1, 0)} className="rounded-2xl bg-white/90 px-5 py-4 font-black text-black">←</button>
          <button onClick={() => touchMove(0, 1)} className="rounded-2xl bg-white/90 px-5 py-4 font-black text-black">↓</button>
          <button onClick={() => touchMove(1, 0)} className="rounded-2xl bg-white/90 px-5 py-4 font-black text-black">→</button>
        </div>
        <button onClick={shoot} className="fixed bottom-5 right-5 z-20 rounded-full bg-violet-300 px-7 py-7 text-sm font-black uppercase tracking-[0.12em] text-black shadow-2xl md:hidden">Atirar</button>
      </section>
    </main>
  );
}
