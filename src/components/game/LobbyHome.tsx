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
    const ctx = new Ctx(); const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.frequency.value = type === "start" ? 780 : type === "confirm" ? 560 : 360;
    gain.gain.setValueAtTime(0.001, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + 0.015); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
    osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.16);
  } catch {}
}

function StatChip({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-2xl border border-white/45 bg-white/45 px-3 py-2 text-slate-950 shadow-[0_12px_28px_rgba(15,23,42,.16)] backdrop-blur-xl"><p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">{label}</p><strong className="block text-lg">{value}</strong></div>;
}

export default function LobbyHome({ playerName, equipped, stats, daily, roomCode, lobbyMessage, selectedMode, onPlay, onClaimDaily, onCopyRoomCode, onSelectMode, onLobbyMessage }: LobbyHomeProps) {
  const [matching, setMatching] = useState(false);
  const [matchStep, setMatchStep] = useState(0);
  const [onlineOpen, setOnlineOpen] = useState(false);
  const avatarEmoji = equipped?.emoji || "⚡";
  const particles = useMemo(() => Array.from({ length: 26 }, (_, index) => index), []);
  const xpPercent = Math.min(100, Math.max(6, stats.currentLevelXp));

  useEffect(() => {
    if (!matching) return;
    setMatchStep(0);
    const stepTimer = window.setInterval(() => setMatchStep((step) => Math.min(3, step + 1)), 430);
    const startTimer = window.setTimeout(() => { playUiSound("start"); onPlay(); }, 1250);
    return () => { window.clearInterval(stepTimer); window.clearTimeout(startTimer); };
  }, [matching, onPlay]);

  function startMatchmaking() {
    playUiSound("confirm");
    setMatching(true);
    onLobbyMessage("Preparando partida...");
  }

  return (
    <section className="relative mx-auto min-h-[calc(100vh-118px)] w-full overflow-hidden rounded-[1.6rem] border border-white/50 bg-[linear-gradient(180deg,#8ee7ff_0%,#43b5ff_22%,#8b5cf6_56%,#f59e0b_100%)] p-3 shadow-[0_24px_90px_rgba(2,6,23,.38)] md:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,.72),transparent_14rem),radial-gradient(circle_at_18%_70%,rgba(34,211,238,.34),transparent_16rem),radial-gradient(circle_at_86%_48%,rgba(250,204,21,.42),transparent_16rem)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] origin-bottom bg-[linear-gradient(90deg,rgba(255,255,255,.28)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.22)_1px,transparent_1px)] bg-[size:78px_42px] opacity-60 [transform:perspective(520px)_rotateX(58deg)_scaleY(1.7)]" />
      <div className="pointer-events-none absolute -left-20 top-12 h-64 w-64 rounded-full bg-cyan-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-28 h-72 w-72 rounded-full bg-yellow-200/45 blur-3xl" />
      {particles.map((dot) => <span key={dot} className="pointer-events-none absolute h-1.5 w-1.5 animate-pulse rounded-full bg-white/90 shadow-[0_0_18px_rgba(255,255,255,.95)]" style={{ left: `${4 + ((dot * 29) % 92)}%`, top: `${7 + ((dot * 37) % 78)}%`, animationDelay: `${dot * 0.1}s` }} />)}

      <div className="relative z-10 grid min-h-[calc(100vh-158px)] gap-4 lg:grid-cols-[290px_1fr_320px]">
        <aside className="grid content-between gap-4 rounded-[1.8rem] border border-white/55 bg-white/28 p-4 text-slate-950 shadow-[0_18px_55px_rgba(15,23,42,.2)] backdrop-blur-2xl">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.34em] text-violet-900">{gameIdentity.brand}</p>
            <h2 className="mt-1 text-3xl font-black leading-none">Clash Room</h2>
            <p className="mt-2 text-sm font-bold text-slate-700">Lobby vivo, competitivo e focado em cartas.</p>
          </div>
          <div className="rounded-[1.6rem] border border-white/60 bg-white/45 p-4 shadow-[0_18px_40px_rgba(15,23,42,.16)] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className={`grid h-20 w-20 place-items-center rounded-[1.5rem] border-4 border-white/70 bg-gradient-to-br ${equipped?.gradient || "from-violet-600 to-cyan-300"} text-4xl shadow-[0_0_45px_rgba(255,255,255,.45)]`}>{avatarEmoji}</div>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-violet-800">Perfil</p>
                <h3 className="truncate text-2xl font-black">{playerName}</h3>
                <p className="text-xs font-bold text-slate-600">Nv. {stats.level} · {stats.winRate}% WR</p>
              </div>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-900/20"><div className="h-full rounded-full bg-gradient-to-r from-violet-700 via-fuchsia-500 to-yellow-300" style={{ width: `${xpPercent}%` }} /></div>
            <p className="mt-2 text-[11px] font-bold text-slate-600">XP do nível: {stats.currentLevelXp}/100</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <StatChip label="Moedas" value={`🪙 ${stats.coins}`} />
            <StatChip label="Vitórias" value={stats.wins} />
            <StatChip label="Streak" value={`${daily.streak}d`} />
            <StatChip label="Baú" value={`${daily.nextChestWins} vit.`} />
          </div>
        </aside>

        <main className="relative overflow-hidden rounded-[2rem] border border-white/55 bg-white/24 p-4 text-slate-950 shadow-[0_22px_70px_rgba(15,23,42,.22)] backdrop-blur-2xl">
          <div className="absolute left-1/2 top-8 h-52 w-52 -translate-x-1/2 rounded-full bg-white/35 blur-3xl" />
          <div className="absolute bottom-20 left-1/2 h-28 w-[72%] -translate-x-1/2 rounded-[50%] bg-slate-950/20 blur-xl" />
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-yellow-200 drop-shadow">Mesa Principal</p>
            <h1 className="mt-2 text-5xl font-black leading-none text-white drop-shadow-[0_8px_18px_rgba(30,41,59,.38)] md:text-7xl">UNO Clash</h1>
            <p className="mx-auto mt-3 max-w-md text-sm font-bold text-white/90 drop-shadow">Jogue rápido contra IA ou crie uma sala por código para chamar amigos.</p>
          </div>

          <div className="relative z-10 mx-auto mt-8 flex max-w-[560px] items-end justify-center gap-[-12px]">
            {["+2", "THK", "UNO"].map((text, index) => <div key={text} className="mx-[-6px] h-48 w-32 rounded-[1.55rem] border-[5px] border-white/80 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-yellow-300 p-3 shadow-[0_28px_70px_rgba(30,41,59,.32)]" style={{ transform: `rotate(${(index - 1) * 8}deg) translateY(${index === 1 ? -16 : 0}px)` }}><div className="grid h-full place-items-center rounded-[1.05rem] border border-white/55 bg-white/20 text-4xl font-black text-white drop-shadow">{text}</div></div>)}
          </div>

          <div className="relative z-10 mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
            {gameIdentity.modes.map((mode) => <button key={mode.id} onClick={() => { playUiSound("click"); onSelectMode(mode); if (mode.id === "online") setOnlineOpen(true); }} className={`rounded-[1.5rem] border p-4 text-left shadow-[0_14px_35px_rgba(15,23,42,.16)] transition active:scale-[.98] ${selectedMode.id === mode.id ? "border-yellow-200 bg-yellow-300 text-slate-950" : "border-white/60 bg-white/35 text-slate-950 backdrop-blur-xl"}`}><span className="rounded-full bg-slate-950/12 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]">{mode.status}</span><h3 className="mt-3 text-2xl font-black">{mode.title}</h3><p className="mt-1 text-xs font-bold text-slate-700">{mode.description}</p></button>)}
          </div>

          <div className="relative z-10 mx-auto mt-6 grid max-w-2xl gap-3 sm:grid-cols-[1fr_1.6fr]">
            <button onClick={() => setOnlineOpen(true)} className="rounded-[1.35rem] border border-white/65 bg-white/40 px-5 py-4 text-sm font-black text-slate-950 shadow-[0_12px_28px_rgba(15,23,42,.16)] backdrop-blur-xl active:scale-[.98]">Criar / Entrar em sala</button>
            <button onClick={startMatchmaking} className="rounded-[1.35rem] bg-gradient-to-b from-yellow-100 to-yellow-400 px-6 py-4 text-4xl font-black text-slate-950 shadow-[0_8px_0_#b45309,0_26px_65px_rgba(245,158,11,.34)] active:translate-y-1 active:shadow-[0_3px_0_#b45309]">START</button>
          </div>

          <div className="relative z-10 mx-auto mt-4 max-w-2xl rounded-[1.2rem] border border-white/55 bg-white/35 px-4 py-3 text-sm font-bold text-slate-800 shadow-[0_12px_28px_rgba(15,23,42,.12)] backdrop-blur-xl"><strong className="text-violet-900">{selectedMode.title}</strong> · {lobbyMessage}</div>
        </main>

        <aside className="grid content-between gap-4 rounded-[1.8rem] border border-white/55 bg-white/28 p-4 text-slate-950 shadow-[0_18px_55px_rgba(15,23,42,.2)] backdrop-blur-2xl">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-cyan-900">Online</p>
            <h3 className="mt-1 text-2xl font-black">Sala por código</h3>
            <p className="mt-2 text-sm font-bold text-slate-700">Copie o código, mande para um amigo e inicie quando todos estiverem prontos.</p>
          </div>
          <button onClick={() => { playUiSound("click"); onCopyRoomCode(); }} className="rounded-[1.5rem] border border-yellow-100/80 bg-yellow-200/70 p-4 text-left shadow-[0_16px_36px_rgba(146,64,14,.18)] active:scale-[.98]"><p className="text-[10px] font-black uppercase tracking-[0.25em] text-yellow-900">Código rápido</p><strong className="mt-2 block text-3xl tracking-widest text-slate-950">{roomCode}</strong></button>
          <div className="grid gap-2">
            <button onClick={() => setOnlineOpen(true)} className="rounded-[1.35rem] bg-cyan-300 px-5 py-4 text-sm font-black text-slate-950 shadow-[0_6px_0_#0e7490] active:translate-y-1 active:shadow-none">Abrir sala online</button>
            <button onClick={onClaimDaily} className="rounded-[1.35rem] border border-white/60 bg-white/35 px-5 py-4 text-sm font-black text-slate-950 shadow-[0_12px_28px_rgba(15,23,42,.12)] backdrop-blur active:scale-[.98]">{daily.canClaim ? `Coletar diária +${daily.todayReward}` : "Diária coletada"}</button>
          </div>
          <div className="rounded-[1.35rem] border border-white/55 bg-white/35 p-4 shadow-[0_12px_28px_rgba(15,23,42,.12)] backdrop-blur"><p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">Perfil personalizado</p><p className="mt-2 text-sm font-bold text-slate-700">Sem personagem 3D: personalização será por avatar, moldura, banner, título e tema de perfil.</p></div>
        </aside>
      </div>

      {onlineOpen && <div className="fixed inset-0 z-[70] grid place-items-end bg-slate-950/50 p-3 backdrop-blur-md"><div className="max-h-[88vh] w-full max-w-[460px] overflow-y-auto rounded-[2rem] border border-white/45 bg-white/30 p-3 shadow-[0_0_80px_rgba(14,165,233,.24)] backdrop-blur-2xl"><div className="mb-3 flex items-center justify-between text-white"><div><p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-100">Multiplayer</p><h3 className="text-2xl font-black">Sala online</h3></div><button onClick={() => setOnlineOpen(false)} className="rounded-2xl bg-white/20 px-4 py-3 text-sm font-black">Fechar</button></div><OnlineRoomPanel playerName={playerName} avatar={avatarEmoji} onMessage={onLobbyMessage} onStart={onPlay} /></div></div>}
      {matching && <div className="absolute inset-0 z-50 grid place-items-center bg-slate-950/35 p-5 backdrop-blur-md"><div className="w-[min(380px,92vw)] rounded-[2rem] border border-white/45 bg-white/40 p-6 text-center text-slate-950 shadow-[0_0_80px_rgba(255,255,255,.28)] backdrop-blur-2xl"><div className="mx-auto mb-5 h-16 w-16 animate-spin rounded-full border-4 border-slate-950/10 border-t-yellow-300" /><p className="text-xs font-black uppercase tracking-[0.3em] text-violet-900">Clash Room</p><h3 className="mt-2 text-3xl font-black">Preparando</h3><p className="mt-2 text-sm font-bold text-slate-700">{["Embaralhando cartas...", "Montando mesa...", "Sincronizando HUD...", "Entrando..."][matchStep]}</p></div></div>}
    </section>
  );
}
