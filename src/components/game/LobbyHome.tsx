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

function MiniCard({ icon, title, text, onClick }: { icon: string; title: string; text: string; onClick: () => void }) {
  return <button onClick={onClick} className="rounded-[1.4rem] border border-white/45 bg-white/35 p-4 text-left text-slate-950 shadow-[0_12px_28px_rgba(15,23,42,.16)] backdrop-blur-xl transition active:scale-[.98]"><span className="text-2xl">{icon}</span><h3 className="mt-2 text-lg font-black">{title}</h3><p className="mt-1 text-xs font-bold text-slate-700">{text}</p></button>;
}

export default function LobbyHome({ playerName, equipped, stats, daily, roomCode, lobbyMessage, onPlay, onClaimDaily, onCopyRoomCode, onLobbyMessage }: LobbyHomeProps) {
  const [matching, setMatching] = useState(false);
  const [matchStep, setMatchStep] = useState(0);
  const [onlineOpen, setOnlineOpen] = useState(false);
  const avatarEmoji = equipped?.emoji || "⚡";
  const bubbles = useMemo(() => Array.from({ length: 12 }, (_, index) => index), []);
  const xpPercent = Math.min(100, Math.max(6, stats.currentLevelXp));

  useEffect(() => {
    if (!matching) return;
    setMatchStep(0);
    const stepTimer = window.setInterval(() => setMatchStep((step) => Math.min(3, step + 1)), 420);
    const startTimer = window.setTimeout(() => { playUiSound("start"); onPlay(); }, 1150);
    return () => { window.clearInterval(stepTimer); window.clearTimeout(startTimer); };
  }, [matching, onPlay]);

  function startMatchmaking() {
    playUiSound("confirm");
    setMatching(true);
    onLobbyMessage("Abrindo seletor de modos...");
  }

  return (
    <section className="relative mx-auto min-h-[calc(100vh-118px)] w-full overflow-hidden rounded-[1.8rem] border border-white/45 bg-[linear-gradient(180deg,#7dd3fc_0%,#60a5fa_34%,#a78bfa_68%,#facc15_100%)] p-3 shadow-[0_24px_90px_rgba(2,6,23,.32)] md:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,.62),transparent_13rem),radial-gradient(circle_at_18%_68%,rgba(34,211,238,.28),transparent_15rem),radial-gradient(circle_at_86%_58%,rgba(250,204,21,.34),transparent_15rem)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] bg-[linear-gradient(90deg,rgba(255,255,255,.24)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px)] bg-[size:68px_40px] opacity-45 [transform:perspective(540px)_rotateX(58deg)_scaleY(1.6)]" />
      {bubbles.map((dot) => <span key={dot} className="pointer-events-none absolute h-2 w-2 rounded-full bg-white/70 shadow-[0_0_18px_rgba(255,255,255,.8)]" style={{ left: `${6 + ((dot * 31) % 88)}%`, top: `${9 + ((dot * 43) % 78)}%` }} />)}

      <div className="relative z-10 grid gap-4 lg:grid-cols-[300px_1fr]">
        <aside className="grid gap-4 rounded-[1.8rem] border border-white/55 bg-white/32 p-4 text-slate-950 shadow-[0_18px_55px_rgba(15,23,42,.18)] backdrop-blur-2xl">
          <div className="flex items-center gap-3 rounded-[1.5rem] border border-white/60 bg-white/45 p-3 shadow-[0_12px_28px_rgba(15,23,42,.12)]">
            <div className={`grid h-16 w-16 place-items-center rounded-[1.2rem] border-4 border-white/70 bg-gradient-to-br ${equipped?.gradient || "from-violet-600 to-cyan-300"} text-3xl`}>{avatarEmoji}</div>
            <div className="min-w-0">
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-violet-800">Jogador</p>
              <h3 className="truncate text-2xl font-black">{playerName}</h3>
              <p className="text-xs font-bold text-slate-600">Nv. {stats.level} · {stats.winRate}% WR</p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/55 bg-white/35 p-4">
            <div className="flex items-center justify-between"><span className="text-xs font-black uppercase tracking-[.2em] text-slate-600">Progresso</span><strong>{stats.currentLevelXp}/100</strong></div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-950/20"><div className="h-full rounded-full bg-gradient-to-r from-violet-700 via-fuchsia-500 to-yellow-300" style={{ width: `${xpPercent}%` }} /></div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-white/40 p-3"><p className="text-[9px] font-black uppercase tracking-[.2em] text-slate-600">Moedas</p><strong className="text-xl">🪙 {stats.coins}</strong></div>
            <div className="rounded-2xl bg-white/40 p-3"><p className="text-[9px] font-black uppercase tracking-[.2em] text-slate-600">Vitórias</p><strong className="text-xl">{stats.wins}</strong></div>
            <div className="rounded-2xl bg-white/40 p-3"><p className="text-[9px] font-black uppercase tracking-[.2em] text-slate-600">Streak</p><strong className="text-xl">{daily.streak}d</strong></div>
            <div className="rounded-2xl bg-white/40 p-3"><p className="text-[9px] font-black uppercase tracking-[.2em] text-slate-600">Baú</p><strong className="text-xl">{daily.nextChestWins}</strong></div>
          </div>
        </aside>

        <main className="relative overflow-hidden rounded-[2rem] border border-white/55 bg-white/26 p-4 text-slate-950 shadow-[0_22px_70px_rgba(15,23,42,.2)] backdrop-blur-2xl md:p-6">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/40 blur-3xl" />
          <div className="absolute bottom-16 left-1/2 h-28 w-[70%] -translate-x-1/2 rounded-[50%] bg-slate-950/16 blur-xl" />

          <div className="relative z-10 grid min-h-[560px] content-between gap-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.34em] text-violet-900">{gameIdentity.brand}</p>
                <h1 className="mt-1 text-4xl font-black leading-none text-white drop-shadow-[0_7px_16px_rgba(30,41,59,.35)] md:text-6xl">Clash Cards</h1>
                <p className="mt-2 max-w-md text-sm font-bold text-white/90 drop-shadow">Escolha um modo, entre na mesa e vença com estratégia.</p>
              </div>
              <button onClick={onClaimDaily} className="rounded-2xl bg-yellow-300 px-4 py-3 text-xs font-black text-slate-950 shadow-[0_5px_0_#b45309] active:translate-y-1 active:shadow-none">{daily.canClaim ? `Diária +${daily.todayReward}` : "Diária OK"}</button>
            </div>

            <div className="mx-auto grid w-full max-w-[620px] gap-4 rounded-[2rem] border border-white/60 bg-white/38 p-4 text-center shadow-[0_22px_55px_rgba(15,23,42,.18)] backdrop-blur-xl">
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-violet-800">Modo atual</p>
              <div className="mx-auto flex items-end justify-center gap-[-8px]">
                {["+2", "THK", "↺"].map((text, index) => <div key={text} className="mx-[-5px] h-36 w-24 rounded-[1.2rem] border-[4px] border-white/85 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-yellow-300 p-2 shadow-[0_18px_38px_rgba(30,41,59,.24)]" style={{ transform: `rotate(${(index - 1) * 7}deg) translateY(${index === 1 ? -10 : 0}px)` }}><div className="grid h-full place-items-center rounded-[.85rem] bg-white/20 text-3xl font-black text-white drop-shadow">{text}</div></div>)}
              </div>
              <button onClick={startMatchmaking} className="mx-auto w-full max-w-[420px] rounded-[1.35rem] bg-gradient-to-b from-yellow-100 to-yellow-400 px-6 py-4 text-4xl font-black text-slate-950 shadow-[0_8px_0_#b45309,0_22px_50px_rgba(245,158,11,.28)] active:translate-y-1 active:shadow-[0_3px_0_#b45309]">JOGAR</button>
              <p className="text-sm font-bold text-slate-700">{lobbyMessage}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <MiniCard icon="🎮" title="Modos" text="1v1, mesa 3, mesa 4 e mais." onClick={onPlay} />
              <MiniCard icon="🌐" title="Online" text="Crie sala ou entre por código." onClick={() => setOnlineOpen(true)} />
              <MiniCard icon="🎁" title="Recompensa" text={daily.canClaim ? "Coleta diária disponível." : "Você já coletou hoje."} onClick={onClaimDaily} />
              <MiniCard icon="🔗" title="Código" text={roomCode} onClick={() => { playUiSound("click"); onCopyRoomCode(); }} />
            </div>
          </div>
        </main>
      </div>

      {onlineOpen && <div className="fixed inset-0 z-[70] grid place-items-end bg-slate-950/50 p-3 backdrop-blur-md"><div className="max-h-[88vh] w-full max-w-[460px] overflow-y-auto rounded-[2rem] border border-white/45 bg-white/30 p-3 shadow-[0_0_80px_rgba(14,165,233,.24)] backdrop-blur-2xl"><div className="mb-3 flex items-center justify-between text-white"><div><p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-100">Multiplayer</p><h3 className="text-2xl font-black">Sala online</h3></div><button onClick={() => setOnlineOpen(false)} className="rounded-2xl bg-white/20 px-4 py-3 text-sm font-black">Fechar</button></div><OnlineRoomPanel playerName={playerName} avatar={avatarEmoji} onMessage={onLobbyMessage} onStart={onPlay} /></div></div>}
      {matching && <div className="absolute inset-0 z-50 grid place-items-center bg-slate-950/35 p-5 backdrop-blur-md"><div className="w-[min(380px,92vw)] rounded-[2rem] border border-white/45 bg-white/55 p-6 text-center text-slate-950 shadow-[0_0_80px_rgba(255,255,255,.28)] backdrop-blur-2xl"><div className="mx-auto mb-5 h-16 w-16 animate-spin rounded-full border-4 border-slate-950/10 border-t-yellow-300" /><p className="text-xs font-black uppercase tracking-[0.3em] text-violet-900">Clash Room</p><h3 className="mt-2 text-3xl font-black">Preparando</h3><p className="mt-2 text-sm font-bold text-slate-700">{["Abrindo modos...", "Organizando mesa...", "Carregando cartas...", "Entrando..."][matchStep]}</p></div></div>}
    </section>
  );
}
