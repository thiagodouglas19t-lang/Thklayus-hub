import { useMemo, useState } from "react";

type Props = { onBack: () => void };

function beep(type: "shot" | "hit" | "reload" = "shot") {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = type === "hit" ? 180 : type === "reload" ? 420 : 760;
    osc.type = type === "hit" ? "square" : "sine";
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(type === "shot" ? 0.08 : 0.055, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.13);
  } catch {}
}

export default function ArenaFPS({ onBack }: Props) {
  const [targetHp, setTargetHp] = useState(100);
  const [ammo, setAmmo] = useState(18);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [flash, setFlash] = useState(false);
  const [hit, setHit] = useState(false);
  const targetAlive = targetHp > 0;
  const particles = useMemo(() => Array.from({ length: 18 }, (_, index) => index), []);

  function shoot() {
    if (ammo <= 0) {
      beep("reload");
      return;
    }
    beep("shot");
    setAmmo((value) => value - 1);
    setFlash(true);
    window.setTimeout(() => setFlash(false), 90);
    if (!targetAlive) return;
    const damage = 12 + Math.floor(Math.random() * 8);
    setTargetHp((hp) => Math.max(0, hp - damage));
    setScore((value) => value + damage * 10);
    setCombo((value) => value + 1);
    setHit(true);
    beep("hit");
    window.setTimeout(() => setHit(false), 130);
  }

  function reload() {
    beep("reload");
    setAmmo(18);
    setCombo(0);
  }

  function resetTarget() {
    setTargetHp(100);
    setCombo(0);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(124,58,237,.22),transparent_20rem),linear-gradient(180deg,#4fb7ff_0%,#17213b_30%,#080914_62%,#020003_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[55%] bg-[linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30" />
      <div className="absolute left-1/2 top-[22%] h-40 w-32 -translate-x-1/2 rounded-t-[2rem] border border-violet-300/40 bg-black/55 shadow-[0_0_80px_rgba(168,85,247,.45)]" />
      <div className="absolute left-0 top-[38%] h-32 w-64 skew-x-[-18deg] bg-black/45 ring-1 ring-violet-300/20" />
      <div className="absolute right-0 top-[38%] h-32 w-64 skew-x-[18deg] bg-black/45 ring-1 ring-cyan-300/20" />
      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(90deg,rgba(250,204,21,.16)_2px,transparent_2px),linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:90px_42px] opacity-35" />
      {particles.map((dot) => <span key={dot} className="absolute h-1 w-1 animate-pulse rounded-full bg-violet-200/75 shadow-[0_0_16px_rgba(196,181,253,.9)]" style={{ left: `${6 + ((dot * 37) % 88)}%`, top: `${12 + ((dot * 41) % 55)}%`, animationDelay: `${dot * 0.12}s` }} />)}

      <header className="relative z-20 flex items-center justify-between gap-3 p-3">
        <button onClick={onBack} className="rounded-2xl border border-white/10 bg-black/55 px-4 py-3 text-sm font-black backdrop-blur">← Lobby</button>
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-yellow-300">THKLAYUS</p>
          <h1 className="text-2xl font-black leading-none md:text-4xl">Arena FPS</h1>
        </div>
        <div className="rounded-2xl border border-yellow-300/20 bg-yellow-300/10 px-4 py-3 text-sm font-black text-yellow-100">Score {score}</div>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-90px)] max-w-[1180px] grid-cols-[220px_1fr_240px] gap-3 p-3 max-md:grid-cols-1">
        <aside className="hidden rounded-[1.6rem] border border-white/10 bg-black/45 p-4 backdrop-blur-xl md:block">
          <p className="text-[10px] font-black uppercase tracking-[0.26em] text-cyan-200">Operador</p>
          <div className="mt-4 rounded-[1.5rem] border border-violet-300/20 bg-violet-500/10 p-4 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-black text-4xl">⚡</div>
            <strong className="mt-3 block">Treino</strong>
            <p className="text-xs text-zinc-400">Modo visual seguro</p>
          </div>
          <div className="mt-4 grid gap-2 text-sm">
            <div className="rounded-2xl bg-white/[0.06] p-3">Escudo <strong className="float-right text-cyan-200">100</strong></div>
            <div className="rounded-2xl bg-white/[0.06] p-3">Vida <strong className="float-right text-emerald-200">100</strong></div>
            <div className="rounded-2xl bg-white/[0.06] p-3">Combo <strong className="float-right text-yellow-200">x{combo}</strong></div>
          </div>
        </aside>

        <div className="relative min-h-[430px] overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/20 shadow-[inset_0_0_80px_rgba(0,0,0,.45)]">
          <div className="absolute left-1/2 top-[52%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/15 blur-2xl" />
          <button onClick={shoot} className={`absolute left-1/2 top-[50%] z-20 -translate-x-1/2 -translate-y-1/2 transition ${hit ? "scale-95 brightness-150" : "scale-100"}`}>
            <div className="relative h-56 w-36 rounded-[2rem] border border-violet-300/50 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black shadow-[0_0_55px_rgba(168,85,247,.45)]">
              <div className="absolute left-1/2 top-4 h-14 w-14 -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-400 to-black ring-2 ring-violet-200/30" />
              <div className="absolute left-1/2 top-24 h-20 w-24 -translate-x-1/2 rounded-2xl border border-white/10 bg-white/[0.06]" />
              <div className="absolute bottom-4 left-1/2 h-14 w-24 -translate-x-1/2 rounded-xl bg-violet-500/20" />
              {!targetAlive && <div className="absolute inset-0 grid place-items-center rounded-[2rem] bg-black/75 text-xl font-black text-yellow-300">DOWN</div>}
            </div>
          </button>

          <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-violet-300 shadow-[0_0_26px_rgba(168,85,247,.8)]">
            <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-100" />
            <span className="absolute left-1/2 top-0 h-9 w-1 -translate-x-1/2 bg-violet-300" />
            <span className="absolute bottom-0 left-1/2 h-9 w-1 -translate-x-1/2 bg-violet-300" />
            <span className="absolute left-0 top-1/2 h-1 w-9 -translate-y-1/2 bg-violet-300" />
            <span className="absolute right-0 top-1/2 h-1 w-9 -translate-y-1/2 bg-violet-300" />
          </div>

          {flash && <div className="pointer-events-none absolute bottom-20 right-24 z-40 h-20 w-40 rounded-full bg-fuchsia-400 blur-xl" />}
          {flash && <div className="pointer-events-none absolute bottom-28 right-28 z-40 h-6 w-52 -rotate-12 bg-gradient-to-r from-white via-fuchsia-300 to-transparent" />}

          <div className="absolute left-4 top-4 z-30 w-48 rounded-2xl border border-white/10 bg-black/55 p-3 backdrop-blur">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-red-200">Alvo</p>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-gradient-to-r from-red-500 to-yellow-300" style={{ width: `${targetHp}%` }} /></div>
            <p className="mt-1 text-xs text-zinc-400">HP {targetHp}/100</p>
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-30 flex items-end justify-between gap-3">
            <div className="rounded-2xl border border-white/10 bg-black/55 px-4 py-3 backdrop-blur"><p className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">Munição</p><strong className="text-2xl">{ammo}/18</strong></div>
            <div className="h-28 w-64 rounded-[1.2rem] border border-violet-300/20 bg-gradient-to-r from-zinc-900 via-zinc-700 to-violet-900 shadow-[0_0_38px_rgba(168,85,247,.26)] max-sm:w-40" />
          </div>
        </div>

        <aside className="rounded-[1.6rem] border border-white/10 bg-black/45 p-4 backdrop-blur-xl">
          <p className="text-[10px] font-black uppercase tracking-[0.26em] text-yellow-300">Controles</p>
          <button onClick={shoot} className="mt-4 w-full rounded-[1.3rem] bg-gradient-to-b from-yellow-200 to-yellow-500 px-5 py-5 text-2xl font-black text-black shadow-[0_7px_0_#8a4d00] active:translate-y-1 active:shadow-[0_3px_0_#8a4d00]">ATIRAR</button>
          <button onClick={reload} className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 font-black">RECARREGAR</button>
          <button onClick={resetTarget} className="mt-3 w-full rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 font-black text-cyan-100">NOVO ALVO</button>
          <div className="mt-4 rounded-2xl bg-white/[0.04] p-3 text-xs text-zinc-400">Protótipo de treino. Sem violência gráfica, sem sangue e sem sistema competitivo ainda.</div>
        </aside>
      </section>
    </main>
  );
}
