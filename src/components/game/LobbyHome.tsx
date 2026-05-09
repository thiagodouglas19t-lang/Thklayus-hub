import { useEffect, useMemo, useState } from "react";
import { gameIdentity } from "../../lib/gameIdentity";
import OnlineRoomPanel from "./OnlineRoomPanel";

type Mode = (typeof gameIdentity.modes)[number];
type Avatar = { id: string; name: string; emoji: string; gradient: string; rarity: string; price: number };

type LobbyHomeProps = {
  playerName: string;
  equipped?: Avatar;
  stats: { coins: number; wins: number; winRate: number; level: number; currentLevelXp: number };
  daily: { streak: number; todayReward: number; canClaim: boolean; nextChestWins: number };
  roomCode: string;
  lobbyMessage: string;
  selectedMode: Mode;
  onPlay: () => void;
  onClaimDaily: () => void;
  onCopyRoomCode: () => void;
  onSelectMode: (mode: Mode) => void;
  onLobbyMessage: (message: string) => void;
};

function playUiSound(type: "click" | "start" | "confirm" = "click") {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = type === "start" ? 820 : type === "confirm" ? 620 : 380;
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
    osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.16);
  } catch {}
}

function FloatingButton({ icon, label, onClick, side = "left" }: { icon: string; label: string; onClick: () => void; side?: "left" | "right" }) {
  return <button onClick={onClick} className={`group flex items-center gap-2 rounded-[1.2rem] border-2 border-white/70 bg-white/45 px-3 py-3 text-slate-950 shadow-[0_10px_0_rgba(15,23,42,.18),0_22px_38px_rgba(15,23,42,.22)] backdrop-blur-xl transition active:translate-y-1 active:shadow-[0_4px_0_rgba(15,23,42,.18)] ${side === "right" ? "justify-end" : "justify-start"}`}><span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950/10 text-2xl">{icon}</span><strong className="text-sm font-black uppercase tracking-[.08em]">{label}</strong></button>;
}

export default function LobbyHome({ playerName, equipped, stats, daily, roomCode, lobbyMessage, onPlay, onClaimDaily, onCopyRoomCode, onLobbyMessage }: LobbyHomeProps) {
  const [matching, setMatching] = useState(false);
  const [matchStep, setMatchStep] = useState(0);
  const [onlineOpen, setOnlineOpen] = useState(false);
  const avatarEmoji = equipped?.emoji || "⚡";
  const fx = useMemo(() => Array.from({ length: 22 }, (_, index) => index), []);
  const xpPercent = Math.min(100, Math.max(6, stats.currentLevelXp));

  useEffect(() => {
    if (!matching) return;
    setMatchStep(0);
    const stepTimer = window.setInterval(() => setMatchStep((step) => Math.min(3, step + 1)), 330);
    const startTimer = window.setTimeout(() => { playUiSound("start"); onPlay(); }, 900);
    return () => { window.clearInterval(stepTimer); window.clearTimeout(startTimer); };
  }, [matching, onPlay]);

  function startMatchmaking() {
    playUiSound("confirm");
    setMatching(true);
    onLobbyMessage("Abrindo modos...");
  }

  return (
    <section className="relative mx-auto min-h-[calc(100vh-118px)] w-full overflow-hidden rounded-[1.8rem] border-4 border-white/45 bg-[linear-gradient(180deg,#57cfff_0%,#6d7cff_42%,#ab62ff_68%,#ffcc31_100%)] shadow-[0_24px_90px_rgba(2,6,23,.32)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_5%,rgba(255,255,255,.78),transparent_13rem),radial-gradient(circle_at_15%_63%,rgba(34,211,238,.35),transparent_16rem),radial-gradient(circle_at_88%_58%,rgba(250,204,21,.46),transparent_16rem)]" />
      <div className="pointer-events-none absolute inset-x-[-8%] bottom-[-7%] h-[42%] rounded-[50%_50%_0_0] bg-[linear-gradient(180deg,rgba(255,255,255,.4),rgba(255,255,255,.16)),linear-gradient(90deg,#22c55e,#84cc16)] shadow-[inset_0_18px_45px_rgba(255,255,255,.25)]" />
      <div className="pointer-events-none absolute bottom-[11%] left-1/2 h-[16%] w-[58%] -translate-x-1/2 rounded-[50%] bg-slate-950/25 blur-xl" />
      {fx.map((dot) => <span key={dot} className="pointer-events-none absolute rounded-full bg-white/80 shadow-[0_0_16px_rgba(255,255,255,.85)]" style={{ width: `${4 + (dot % 4) * 2}px`, height: `${4 + (dot % 4) * 2}px`, left: `${3 + ((dot * 23) % 94)}%`, top: `${6 + ((dot * 31) % 76)}%` }} />)}

      <div className="relative z-10 flex min-h-[calc(100vh-118px)] flex-col p-3 md:p-5">
        <header className="flex items-center justify-between gap-3">
          <button className="flex min-w-0 items-center gap-3 rounded-[1.4rem] border-2 border-white/70 bg-white/46 p-2 pr-4 text-left text-slate-950 shadow-[0_9px_0_rgba(15,23,42,.16),0_18px_35px_rgba(15,23,42,.18)] backdrop-blur-xl active:translate-y-1">
            <div className={`grid h-14 w-14 place-items-center rounded-[1rem] border-[3px] border-white/85 bg-gradient-to-br ${equipped?.gradient || "from-violet-600 to-cyan-300"} text-3xl`}>{avatarEmoji}</div>
            <div className="min-w-0"><h3 className="truncate text-xl font-black">{playerName}</h3><div className="mt-1 h-2 w-32 overflow-hidden rounded-full bg-slate-950/18"><div className="h-full rounded-full bg-gradient-to-r from-violet-700 via-fuchsia-500 to-yellow-300" style={{ width: `${xpPercent}%` }} /></div></div>
          </button>

          <div className="flex items-center gap-2">
            <div className="rounded-full border-2 border-yellow-100/80 bg-yellow-300 px-4 py-2 text-sm font-black text-slate-950 shadow-[0_6px_0_#b45309]">🪙 {stats.coins}</div>
            <div className="rounded-full border-2 border-white/70 bg-white/42 px-4 py-2 text-sm font-black text-slate-950 shadow-[0_6px_0_rgba(15,23,42,.16)]">Nv. {stats.level}</div>
          </div>
        </header>

        <div className="grid flex-1 grid-cols-[92px_1fr_92px] items-center gap-2 py-3 md:grid-cols-[150px_1fr_150px] md:gap-5">
          <aside className="grid gap-3">
            <FloatingButton icon="🎮" label="Modos" onClick={onPlay} />
            <FloatingButton icon="🌐" label="Online" onClick={() => setOnlineOpen(true)} />
            <FloatingButton icon="🎁" label="Diária" onClick={onClaimDaily} />
          </aside>

          <main className="relative grid min-h-[520px] place-items-center text-center">
            <div className="absolute top-2 rounded-full border-2 border-white/55 bg-white/28 px-5 py-2 text-sm font-black text-slate-950 shadow-[0_10px_28px_rgba(15,23,42,.18)] backdrop-blur-xl">{lobbyMessage}</div>

            <div className="relative mt-10 grid place-items-center">
              <div className="absolute h-52 w-52 rounded-full bg-white/30 blur-3xl" />
              <div className="absolute top-[185px] h-14 w-80 rounded-[50%] bg-slate-950/25 blur-xl" />
              <h1 className="relative z-10 text-5xl font-black leading-none text-white drop-shadow-[0_8px_18px_rgba(30,41,59,.42)] md:text-7xl">Clash<br />Cards</h1>
              <p className="relative z-10 mt-2 rounded-full bg-slate-950/20 px-4 py-2 text-xs font-black uppercase tracking-[.22em] text-white backdrop-blur">Mesa rápida · estratégia · caos</p>

              <div className="relative z-10 mt-7 flex items-end justify-center">
                {["+2", "THK", "↺"].map((text, index) => <div key={text} className="mx-[-10px] h-44 w-30 rounded-[1.5rem] border-[5px] border-white/90 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-yellow-300 p-2 shadow-[0_24px_48px_rgba(30,41,59,.3)]" style={{ width: "7.4rem", transform: `rotate(${(index - 1) * 9}deg) translateY(${index === 1 ? -18 : 0}px)` }}><div className="grid h-full place-items-center rounded-[1rem] bg-white/22 text-4xl font-black text-white drop-shadow">{text}</div></div>)}
              </div>
            </div>

            <button onClick={startMatchmaking} className="absolute bottom-5 left-1/2 w-[min(420px,86vw)] -translate-x-1/2 rounded-[1.6rem] border-4 border-yellow-100 bg-gradient-to-b from-yellow-100 to-yellow-400 px-6 py-4 text-5xl font-black text-slate-950 shadow-[0_10px_0_#a8550d,0_28px_58px_rgba(245,158,11,.35)] active:translate-y-1 active:shadow-[0_4px_0_#a8550d]">JOGAR</button>
          </main>

          <aside className="grid gap-3">
            <FloatingButton icon="🛒" label="Loja" side="right" onClick={() => onLobbyMessage("Abra a aba Loja para personalizar.")} />
            <FloatingButton icon="🏆" label="Rank" side="right" onClick={() => onLobbyMessage(`Vitórias: ${stats.wins} · WR ${stats.winRate}%`)} />
            <FloatingButton icon="🔗" label="Código" side="right" onClick={() => { playUiSound("click"); onCopyRoomCode(); }} />
          </aside>
        </div>
      </div>

      {onlineOpen && <div className="fixed inset-0 z-[70] grid place-items-end bg-slate-950/50 p-3 backdrop-blur-md"><div className="max-h-[88vh] w-full max-w-[460px] overflow-y-auto rounded-[2rem] border border-white/45 bg-white/30 p-3 shadow-[0_0_80px_rgba(14,165,233,.24)] backdrop-blur-2xl"><div className="mb-3 flex items-center justify-between text-white"><div><p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-100">Multiplayer</p><h3 className="text-2xl font-black">Sala online</h3></div><button onClick={() => setOnlineOpen(false)} className="rounded-2xl bg-white/20 px-4 py-3 text-sm font-black">Fechar</button></div><OnlineRoomPanel playerName={playerName} avatar={avatarEmoji} onMessage={onLobbyMessage} onStart={onPlay} /></div></div>}
      {matching && <div className="absolute inset-0 z-50 grid place-items-center bg-slate-950/35 p-5 backdrop-blur-md"><div className="w-[min(380px,92vw)] rounded-[2rem] border border-white/45 bg-white/70 p-6 text-center text-slate-950 shadow-[0_0_80px_rgba(255,255,255,.28)] backdrop-blur-2xl"><div className="mx-auto mb-5 h-16 w-16 animate-spin rounded-full border-4 border-slate-950/10 border-t-yellow-300" /><p className="text-xs font-black uppercase tracking-[0.3em] text-violet-900">Clash Room</p><h3 className="mt-2 text-3xl font-black">Preparando</h3><p className="mt-2 text-sm font-bold text-slate-700">{["Abrindo modos...", "Organizando mesa...", "Carregando cartas...", "Entrando..."][matchStep]}</p></div></div>}
    </section>
  );
}
