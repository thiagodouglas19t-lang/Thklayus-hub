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

function ActionCard({ icon, title, text, color, onClick }: { icon: string; title: string; text: string; color: string; onClick: () => void }) {
  return <button onClick={onClick} className={`relative overflow-hidden rounded-[1.55rem] border border-white/65 ${color} p-4 text-left text-slate-950 shadow-[0_12px_30px_rgba(15,23,42,.18)] transition active:scale-[.98]`}><div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/35 blur-2xl" /><span className="relative text-3xl">{icon}</span><h3 className="relative mt-2 text-xl font-black">{title}</h3><p className="relative mt-1 text-xs font-bold text-slate-700">{text}</p></button>;
}

export default function LobbyHome({ playerName, equipped, stats, daily, roomCode, lobbyMessage, onPlay, onClaimDaily, onCopyRoomCode, onLobbyMessage }: LobbyHomeProps) {
  const [matching, setMatching] = useState(false);
  const [matchStep, setMatchStep] = useState(0);
  const [onlineOpen, setOnlineOpen] = useState(false);
  const avatarEmoji = equipped?.emoji || "⚡";
  const confetti = useMemo(() => Array.from({ length: 18 }, (_, index) => index), []);
  const xpPercent = Math.min(100, Math.max(6, stats.currentLevelXp));

  useEffect(() => {
    if (!matching) return;
    setMatchStep(0);
    const stepTimer = window.setInterval(() => setMatchStep((step) => Math.min(3, step + 1)), 360);
    const startTimer = window.setTimeout(() => { playUiSound("start"); onPlay(); }, 980);
    return () => { window.clearInterval(stepTimer); window.clearTimeout(startTimer); };
  }, [matching, onPlay]);

  function startMatchmaking() {
    playUiSound("confirm");
    setMatching(true);
    onLobbyMessage("Abrindo modos...");
  }

  return (
    <section className="relative mx-auto min-h-[calc(100vh-118px)] w-full overflow-hidden rounded-[1.8rem] border border-white/50 bg-[linear-gradient(180deg,#74d8ff_0%,#7c83ff_46%,#b86bff_72%,#ffd54a_100%)] p-3 shadow-[0_24px_90px_rgba(2,6,23,.3)] md:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_45%_8%,rgba(255,255,255,.7),transparent_13rem),radial-gradient(circle_at_10%_70%,rgba(34,211,238,.3),transparent_15rem),radial-gradient(circle_at_92%_48%,rgba(250,204,21,.42),transparent_15rem)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(90deg,rgba(255,255,255,.26)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.22)_1px,transparent_1px)] bg-[size:70px_42px] opacity-55 [transform:perspective(540px)_rotateX(58deg)_scaleY(1.6)]" />
      {confetti.map((dot) => <span key={dot} className="pointer-events-none absolute rounded-full bg-white/75 shadow-[0_0_16px_rgba(255,255,255,.8)]" style={{ width: `${4 + (dot % 3) * 2}px`, height: `${4 + (dot % 3) * 2}px`, left: `${4 + ((dot * 29) % 92)}%`, top: `${8 + ((dot * 37) % 72)}%` }} />)}

      <div className="relative z-10 grid min-h-[calc(100vh-158px)] gap-4 lg:grid-cols-[280px_1fr_260px]">
        <aside className="grid content-start gap-3">
          <button className="flex items-center gap-3 rounded-[1.55rem] border border-white/65 bg-white/45 p-3 text-left text-slate-950 shadow-[0_14px_35px_rgba(15,23,42,.16)] backdrop-blur-xl active:scale-[.98]">
            <div className={`grid h-16 w-16 place-items-center rounded-[1.2rem] border-4 border-white/80 bg-gradient-to-br ${equipped?.gradient || "from-violet-600 to-cyan-300"} text-3xl shadow-[0_0_28px_rgba(255,255,255,.36)]`}>{avatarEmoji}</div>
            <div className="min-w-0"><p className="text-[9px] font-black uppercase tracking-[0.22em] text-violet-900">Perfil</p><h3 className="truncate text-2xl font-black">{playerName}</h3><p className="text-xs font-bold text-slate-700">Nv. {stats.level} · {stats.winRate}% WR</p></div>
          </button>
          <div className="rounded-[1.45rem] border border-white/60 bg-white/38 p-4 text-slate-950 shadow-[0_12px_30px_rgba(15,23,42,.14)] backdrop-blur-xl"><div className="flex justify-between text-xs font-black uppercase tracking-[.18em] text-slate-600"><span>XP</span><span>{stats.currentLevelXp}/100</span></div><div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-950/20"><div className="h-full rounded-full bg-gradient-to-r from-violet-700 via-fuchsia-500 to-yellow-300" style={{ width: `${xpPercent}%` }} /></div></div>
          <div className="grid grid-cols-2 gap-2 text-slate-950"><div className="rounded-2xl bg-white/42 p-3"><p className="text-[9px] font-black uppercase tracking-[.18em] text-slate-600">Moedas</p><strong>🪙 {stats.coins}</strong></div><div className="rounded-2xl bg-white/42 p-3"><p className="text-[9px] font-black uppercase tracking-[.18em] text-slate-600">Vitórias</p><strong>{stats.wins}</strong></div></div>
        </aside>

        <main className="relative grid content-between gap-4 overflow-hidden rounded-[2rem] border border-white/60 bg-white/25 p-4 text-slate-950 shadow-[0_22px_70px_rgba(15,23,42,.2)] backdrop-blur-2xl md:p-6">
          <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-white/45 blur-3xl" />
          <div className="absolute bottom-20 left-1/2 h-24 w-[70%] -translate-x-1/2 rounded-[50%] bg-slate-950/18 blur-xl" />
          <div className="relative z-10 flex items-start justify-between gap-3"><div><p className="text-[10px] font-black uppercase tracking-[0.34em] text-violet-950">Clash Room</p><h1 className="mt-1 text-5xl font-black leading-none text-white drop-shadow-[0_7px_18px_rgba(30,41,59,.36)] md:text-7xl">Clash Cards</h1><p className="mt-2 max-w-md text-sm font-bold text-white/90 drop-shadow">Escolha o modo, entre na mesa e vença com estratégia.</p></div><button onClick={onClaimDaily} className="rounded-2xl bg-yellow-300 px-4 py-3 text-xs font-black text-slate-950 shadow-[0_5px_0_#b45309] active:translate-y-1 active:shadow-none">{daily.canClaim ? `+${daily.todayReward}` : "OK"}</button></div>

          <div className="relative z-10 mx-auto grid w-full max-w-[560px] gap-4 text-center">
            <div className="mx-auto flex items-end justify-center">
              {["+2", "THK", "↺"].map((text, index) => <div key={text} className="mx-[-8px] h-40 w-28 rounded-[1.3rem] border-[5px] border-white/90 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-yellow-300 p-2 shadow-[0_22px_45px_rgba(30,41,59,.26)]" style={{ transform: `rotate(${(index - 1) * 8}deg) translateY(${index === 1 ? -14 : 0}px)` }}><div className="grid h-full place-items-center rounded-[.9rem] bg-white/22 text-3xl font-black text-white drop-shadow">{text}</div></div>)}
            </div>
            <button onClick={startMatchmaking} className="mx-auto w-full max-w-[430px] rounded-[1.45rem] bg-gradient-to-b from-yellow-100 to-yellow-400 px-6 py-4 text-5xl font-black text-slate-950 shadow-[0_9px_0_#b45309,0_24px_55px_rgba(245,158,11,.32)] active:translate-y-1 active:shadow-[0_4px_0_#b45309]">JOGAR</button>
            <p className="rounded-full bg-white/42 px-4 py-2 text-sm font-bold text-slate-800 shadow-[0_10px_22px_rgba(15,23,42,.12)]">{lobbyMessage}</p>
          </div>

          <div className="relative z-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ActionCard icon="🎮" title="Modos" text="1v1, mesa 3 e mesa 4." color="bg-cyan-200/70" onClick={onPlay} />
            <ActionCard icon="🌐" title="Online" text="Sala por código." color="bg-violet-200/75" onClick={() => setOnlineOpen(true)} />
            <ActionCard icon="🎁" title="Diária" text={daily.canClaim ? "Disponível agora." : "Coletada hoje."} color="bg-yellow-200/80" onClick={onClaimDaily} />
            <ActionCard icon="🔗" title="Código" text={roomCode} color="bg-white/70" onClick={() => { playUiSound("click"); onCopyRoomCode(); }} />
          </div>
        </main>

        <aside className="grid content-start gap-3">
          <ActionCard icon="🏆" title="Temporada" text="Rank e recompensas em breve." color="bg-orange-200/75" onClick={() => onLobbyMessage("Temporada será liberada depois.")} />
          <ActionCard icon="🛒" title="Loja" text="Avatar, moldura e banners." color="bg-emerald-200/70" onClick={() => onLobbyMessage("Use a aba Loja para personalizar o perfil.")} />
          <ActionCard icon="🔥" title="Streak" text={`${daily.streak} dias seguidos.`} color="bg-rose-200/70" onClick={onClaimDaily} />
        </aside>
      </div>

      {onlineOpen && <div className="fixed inset-0 z-[70] grid place-items-end bg-slate-950/50 p-3 backdrop-blur-md"><div className="max-h-[88vh] w-full max-w-[460px] overflow-y-auto rounded-[2rem] border border-white/45 bg-white/30 p-3 shadow-[0_0_80px_rgba(14,165,233,.24)] backdrop-blur-2xl"><div className="mb-3 flex items-center justify-between text-white"><div><p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-100">Multiplayer</p><h3 className="text-2xl font-black">Sala online</h3></div><button onClick={() => setOnlineOpen(false)} className="rounded-2xl bg-white/20 px-4 py-3 text-sm font-black">Fechar</button></div><OnlineRoomPanel playerName={playerName} avatar={avatarEmoji} onMessage={onLobbyMessage} onStart={onPlay} /></div></div>}
      {matching && <div className="absolute inset-0 z-50 grid place-items-center bg-slate-950/35 p-5 backdrop-blur-md"><div className="w-[min(380px,92vw)] rounded-[2rem] border border-white/45 bg-white/60 p-6 text-center text-slate-950 shadow-[0_0_80px_rgba(255,255,255,.28)] backdrop-blur-2xl"><div className="mx-auto mb-5 h-16 w-16 animate-spin rounded-full border-4 border-slate-950/10 border-t-yellow-300" /><p className="text-xs font-black uppercase tracking-[0.3em] text-violet-900">Clash Room</p><h3 className="mt-2 text-3xl font-black">Preparando</h3><p className="mt-2 text-sm font-bold text-slate-700">{["Abrindo modos...", "Organizando mesa...", "Carregando cartas...", "Entrando..."][matchStep]}</p></div></div>}
    </section>
  );
}
