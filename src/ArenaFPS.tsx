import { useEffect, useMemo, useState } from "react";

type Props = { onBack: () => void };
type Target = { x: number; y: number; hp: number; maxHp: number; size: number };

function beep(type: "shot" | "hit" | "reload" | "wave" = "shot") {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = type === "hit" ? 180 : type === "reload" ? 420 : type === "wave" ? 620 : 820;
    osc.type = type === "hit" ? "square" : "sine";
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.13);
    osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.14);
  } catch {}
}

function makeTarget(wave: number): Target {
  return { x: 28 + Math.random() * 44, y: 30 + Math.random() * 24, hp: 80 + wave * 12, maxHp: 80 + wave * 12, size: Math.max(78, 126 - wave * 3) };
}

export default function ArenaFPS({ onBack }: Props) {
  const [target, setTarget] = useState<Target>(() => makeTarget(1));
  const [ammo, setAmmo] = useState(18);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [wave, setWave] = useState(1);
  const [time, setTime] = useState(45);
  const [flash, setFlash] = useState(false);
  const [hit, setHit] = useState(false);
  const [floating, setFloating] = useState<string | null>(null);
  const particles = useMemo(() => Array.from({ length: 24 }, (_, index) => index), []);
  const targetAlive = target.hp > 0;

  useEffect(() => {
    const timer = window.setInterval(() => setTime((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, []);

  function nextWave() {
    const next = wave + 1;
    setWave(next);
    setTarget(makeTarget(next));
    setCombo(0);
    setTime(45);
    beep("wave");
  }

  function shoot() {
    if (time <= 0) return;
    if (ammo <= 0) { beep("reload"); return; }
    setAmmo((value) => value - 1);
    setFlash(true);
    window.setTimeout(() => setFlash(false), 70);
    beep("shot");
    if (!targetAlive) return;
    const damage = 18 + Math.floor(Math.random() * 14) + Math.min(combo, 10);
    const nextHp = Math.max(0, target.hp - damage);
    setTarget((current) => ({ ...current, hp: nextHp }));
    setScore((value) => value + damage * 10 + combo * 25);
    setCombo((value) => value + 1);
    setHit(true);
    setFloating(`-${damage}`);
    beep("hit");
    window.setTimeout(() => setHit(false), 100);
    window.setTimeout(() => setFloating(null), 450);
    if (nextHp <= 0) window.setTimeout(nextWave, 520);
  }

  function reload() { setAmmo(18); setCombo(0); beep("reload"); }
  function restart() { setWave(1); setTarget(makeTarget(1)); setAmmo(18); setScore(0); setCombo(0); setTime(45); }

  return (
    <main className="relative h-screen min-h-[520px] overflow-hidden bg-black text-white select-none">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#7dd3fc_0%,#2563eb_15%,#111827_42%,#030008_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(168,85,247,.46),transparent_22rem),radial-gradient(circle_at_50%_85%,rgba(14,165,233,.24),transparent_18rem)]" />
      <div className="absolute left-1/2 top-[19%] h-44 w-32 -translate-x-1/2 rounded-t-3xl border border-violet-300/40 bg-black/50 shadow-[0_0_90px_rgba(168,85,247,.55)]" />
      <div className="absolute left-0 top-[30%] h-32 w-[28%] skew-x-[-22deg] bg-black/45 ring-1 ring-violet-300/20" />
      <div className="absolute right-0 top-[30%] h-32 w-[28%] skew-x-[22deg] bg-black/45 ring-1 ring-cyan-300/20" />
      <div className="absolute inset-x-0 bottom-0 h-[48%] bg-[linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(rgba(250,204,21,.1)_1px,transparent_1px)] bg-[size:90px_48px] opacity-45" />
      {particles.map((dot) => <span key={dot} className="absolute h-1 w-1 animate-pulse rounded-full bg-violet-100/75 shadow-[0_0_15px_rgba(196,181,253,.9)]" style={{ left: `${5 + ((dot * 31) % 90)}%`, top: `${11 + ((dot * 37) % 58)}%`, animationDelay: `${dot * 0.1}s` }} />)}

      <header className="absolute left-0 right-0 top-0 z-40 flex items-center justify-between p-3">
        <button onClick={onBack} className="rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm font-black backdrop-blur">← Lobby</button>
        <div className="rounded-2xl border border-white/10 bg-black/50 px-4 py-2 text-center backdrop-blur"><p className="text-[9px] font-black uppercase tracking-[0.3em] text-yellow-300">THKLAYUS</p><strong className="text-xl">Arena FPS</strong></div>
        <div className="flex gap-2"><div className="rounded-2xl bg-yellow-300 px-4 py-3 text-sm font-black text-black">Score {score}</div><div className="rounded-2xl bg-black/60 px-4 py-3 text-sm font-black backdrop-blur">⏱ {time}s</div></div>
      </header>

      <section className="absolute inset-0 z-10" onClick={shoot}>
        <button onClick={(event) => { event.stopPropagation(); shoot(); }} className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 transition ${hit ? "scale-95 brightness-150" : "scale-100"}`} style={{ left: `${target.x}%`, top: `${target.y}%` }}>
          <div className="relative" style={{ width: target.size, height: target.size * 1.55 }}>
            <div className="absolute left-1/2 top-0 h-[28%] w-[36%] -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-400 via-zinc-950 to-black ring-2 ring-violet-200/40" />
            <div className="absolute left-1/2 top-[24%] h-[46%] w-[68%] -translate-x-1/2 rounded-2xl border border-violet-300/40 bg-gradient-to-b from-zinc-950 to-black shadow-[0_0_35px_rgba(168,85,247,.55)]" />
            <div className="absolute left-[12%] top-[35%] h-[42%] w-[18%] rotate-12 rounded-full bg-zinc-900 ring-1 ring-violet-400/30" />
            <div className="absolute right-[12%] top-[35%] h-[42%] w-[18%] -rotate-12 rounded-full bg-zinc-900 ring-1 ring-violet-400/30" />
            <div className="absolute bottom-0 left-[24%] h-[32%] w-[18%] rounded-full bg-zinc-950 ring-1 ring-violet-400/30" />
            <div className="absolute bottom-0 right-[24%] h-[32%] w-[18%] rounded-full bg-zinc-950 ring-1 ring-violet-400/30" />
            <div className="absolute left-1/2 top-[48%] h-8 w-8 -translate-x-1/2 rounded bg-violet-500 shadow-[0_0_22px_rgba(168,85,247,.9)]" />
            {!targetAlive && <div className="absolute inset-0 grid place-items-center rounded-3xl bg-black/80 text-2xl font-black text-yellow-300">DOWN</div>}
          </div>
        </button>

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-40 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-violet-300 shadow-[0_0_25px_rgba(168,85,247,.85)]">
          <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white" />
          <span className="absolute left-1/2 top-0 h-8 w-1 -translate-x-1/2 bg-violet-300" />
          <span className="absolute bottom-0 left-1/2 h-8 w-1 -translate-x-1/2 bg-violet-300" />
          <span className="absolute left-0 top-1/2 h-1 w-8 -translate-y-1/2 bg-violet-300" />
          <span className="absolute right-0 top-1/2 h-1 w-8 -translate-y-1/2 bg-violet-300" />
        </div>

        {floating && <div className="pointer-events-none absolute z-50 text-3xl font-black text-yellow-300 drop-shadow" style={{ left: `${target.x + 5}%`, top: `${target.y - 12}%` }}>{floating}</div>}
        {flash && <div className="pointer-events-none absolute bottom-[18%] right-[24%] z-50 h-7 w-64 -rotate-12 bg-gradient-to-r from-white via-fuchsia-300 to-transparent blur-[1px]" />}
        {flash && <div className="pointer-events-none absolute bottom-[16%] right-[20%] z-40 h-24 w-44 rounded-full bg-fuchsia-500/70 blur-2xl" />}
      </section>

      <div className="absolute left-3 top-24 z-50 w-56 rounded-2xl border border-white/10 bg-black/60 p-3 backdrop-blur">
        <div className="flex items-center justify-between"><p className="text-[10px] font-black uppercase tracking-[0.22em] text-red-200">Alvo</p><strong>Wave {wave}</strong></div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-gradient-to-r from-red-500 to-yellow-300" style={{ width: `${(target.hp / target.maxHp) * 100}%` }} /></div>
        <p className="mt-1 text-xs text-zinc-400">HP {target.hp}/{target.maxHp}</p>
      </div>

      <div className="absolute bottom-4 left-4 z-50 flex items-end gap-3">
        <div className="rounded-2xl border border-white/10 bg-black/65 px-4 py-3 backdrop-blur"><p className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">Munição</p><strong className="text-2xl">{ammo}/18</strong></div>
        <button onClick={reload} className="rounded-2xl border border-white/10 bg-white/[0.08] px-5 py-4 font-black backdrop-blur">RELOAD</button>
      </div>

      <div className="absolute bottom-4 right-4 z-50 flex items-end gap-3">
        <button onClick={restart} className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-4 font-black text-cyan-100 backdrop-blur">RESET</button>
        <button onClick={shoot} className="rounded-[1.4rem] bg-gradient-to-b from-yellow-200 to-yellow-500 px-10 py-5 text-2xl font-black text-black shadow-[0_7px_0_#8a4d00] active:translate-y-1 active:shadow-[0_3px_0_#8a4d00]">ATIRAR</button>
      </div>

      <div className="absolute bottom-8 left-1/2 z-30 h-24 w-[34rem] max-w-[48vw] -translate-x-1/2 rounded-[1.2rem] border border-violet-300/20 bg-gradient-to-r from-zinc-950 via-zinc-700 to-violet-900 shadow-[0_0_42px_rgba(168,85,247,.32)]" />
      {time <= 0 && <div className="absolute inset-0 z-[80] grid place-items-center bg-black/75 p-5 backdrop-blur"><div className="rounded-[2rem] border border-yellow-300/20 bg-[#08020f] p-7 text-center"><h2 className="text-4xl font-black">FIM DO TREINO</h2><p className="mt-2 text-zinc-400">Score final: {score}</p><button onClick={restart} className="mt-5 rounded-2xl bg-yellow-300 px-6 py-3 font-black text-black">Jogar de novo</button></div></div>}
    </main>
  );
}
