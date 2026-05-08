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
    osc.frequency.value = type === "start" ? 760 : type === "confirm" ? 540 : 340;
    gain.gain.setValueAtTime(0.001, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.015); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
    osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.16);
  } catch {}
}

function QuickCard({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.055] px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,.28)] backdrop-blur"><p className="text-[9px] font-black uppercase tracking-[0.24em] text-zinc-500">{label}</p><strong className="mt-1 block text-xl text-white">{value}</strong></div>;
}

export default function LobbyHome({ playerName, equipped, stats, daily, roomCode, lobbyMessage, selectedMode, onPlay, onClaimDaily, onCopyRoomCode, onSelectMode, onLobbyMessage }: LobbyHomeProps) {
  const [matching, setMatching] = useState(false);
  const [matchStep, setMatchStep] = useState(0);
  const [onlineOpen, setOnlineOpen] = useState(false);
  const avatarEmoji = equipped?.emoji || "⚡";
  const particles = useMemo(() => Array.from({ length: 22 }, (_, index) => index), []);
  const xpPercent = Math.min(100, Math.max(4, stats.currentLevelXp));

  useEffect(() => {
    if (!matching) return;
    setMatchStep(0);
    const stepTimer = window.setInterval(() => setMatchStep((step) => Math.min(3, step + 1)), 460);
    const startTimer = window.setTimeout(() => { playUiSound("start"); onPlay(); }, 1250);
    return () => { window.clearInterval(stepTimer); window.clearTimeout(startTimer); };
  }, [matching, onPlay]);

  function startMatchmaking() {
    playUiSound("confirm");
    setMatching(true);
    onLobbyMessage("Preparando mesa de cartas...");
  }

  return (
    <section className="relative mx-auto min-h-[calc(100vh-118px)] w-full overflow-hidden rounded-[1.6rem] border border-violet-300/15 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,.34),transparent_24rem),radial-gradient(circle_at_100%_20%,rgba(250,204,21,.12),transparent_18rem),linear-gradient(180deg,#050008,#000)] p-3 shadow-[0_24px_100px_rgba(0,0,0,.74)] md:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:54px_54px] opacity-35" />
      <div className="pointer-events-none absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />
      {particles.map((dot) => <span key={dot} className="pointer-events-none absolute h-1 w-1 animate-pulse rounded-full bg-violet-200/70 shadow-[0_0_16px_rgba(196,181,253,.9)]" style={{ left: `${5 + ((dot * 31) % 90)}%`, top: `${7 + ((dot * 41) % 82)}%`, animationDelay: `${dot * 0.11}s` }} />)}

      <div className="relative z-10 grid min-h-[calc(100vh-158px)] gap-4 lg:grid-cols-[320px_1fr_330px]">
        <aside className="grid content-between gap-4 rounded-[1.8rem] border border-white/10 bg-black/42 p-4 backdrop-blur-xl">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.34em] text-yellow-300">{gameIdentity.brand}</p>
            <h2 className="mt-1 text-3xl font-black leading-none">Clash Room</h2>
            <p className="mt-2 text-sm text-zinc-400">Lobby focado em UNO, cartas rápidas e sala online.</p>
          </div>
          <div className="rounded-[1.6rem] border border-violet-300/15 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,.22),rgba(0,0,0,.42))] p-4">
            <div className="flex items-center gap-3">
              <div className={`grid h-20 w-20 place-items-center rounded-[1.5rem] border border-white/15 bg-gradient-to-br ${equipped?.gradient || "from-violet-700 to-cyan-400"} text-4xl shadow-[0_0_45px_rgba(139,92,246,.28)]`}>{avatarEmoji}</div>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-violet-200">Perfil</p>
                <h3 className="truncate text-2xl font-black">{playerName}</h3>
                <p className="text-xs text-zinc-400">Nv. {stats.level} · {stats.winRate}% WR</p>
              </div>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-yellow-300" style={{ width: `${xpPercent}%` }} /></div>
            <p className="mt-2 text-[11px] text-zinc-500">XP do nível: {stats.currentLevelXp}/100</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <QuickCard label="Moedas" value={`🪙 ${stats.coins}`} />
            <QuickCard label="Vitórias" value={stats.wins} />
            <QuickCard label="Streak" value={`${daily.streak}d`} />
            <QuickCard label="Baú" value={`${daily.nextChestWins} vit.`} />
          </div>
        </aside>

        <main className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_18%,rgba(139,92,246,.22),transparent_22rem),linear-gradient(180deg,rgba(12,6,24,.82),rgba(0,0,0,.72))] p-4 backdrop-blur-xl">
          <div className="absolute inset-x-10 top-20 h-44 rounded-full bg-violet-600/10 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-yellow-300">Mesa Principal</p>
            <h1 className="mt-2 text-4xl font-black leading-none md:text-6xl">UNO Clash</h1>
            <p className="mx-auto mt-3 max-w-md text-sm text-zinc-400">Entre rápido contra IA ou abra uma sala para jogar com amigos por código.</p>
          </div>

          <div className="relative z-10 mx-auto mt-8 grid max-w-[560px] gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => <div key={index} className={`mx-auto h-40 w-28 rotate-[${index === 0 ? "-8" : index === 1 ? "0" : "8"}deg] rounded-[1.4rem] border border-white/15 bg-[linear-gradient(145deg,rgba(139,92,246,.72),rgba(0,0,0,.88))] p-3 shadow-[0_25px_65px_rgba(0,0,0,.5)]`}><div className="grid h-full place-items-center rounded-[1rem] border border-white/10 bg-black/35 text-4xl font-black text-yellow-300">THK</div></div>)}
          </div>

          <div className="relative z-10 mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
            {gameIdentity.modes.map((mode) => <button key={mode.id} onClick={() => { playUiSound("click"); onSelectMode(mode); if (mode.id === "online") setOnlineOpen(true); }} className={`rounded-[1.5rem] border p-4 text-left transition active:scale-[.98] ${selectedMode.id === mode.id ? "border-yellow-300 bg-yellow-300 text-black shadow-[0_0_45px_rgba(250,204,21,.18)]" : "border-white/10 bg-white/[0.055] text-white"}`}><span className="rounded-full bg-black/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]">{mode.status}</span><h3 className="mt-3 text-2xl font-black">{mode.title}</h3><p className={`mt-1 text-xs ${selectedMode.id === mode.id ? "text-black/65" : "text-zinc-400"}`}>{mode.description}</p></button>)}
          </div>

          <div className="relative z-10 mx-auto mt-6 grid max-w-2xl gap-3 sm:grid-cols-[1fr_1.5fr]">
            <button onClick={() => setOnlineOpen(true)} className="rounded-[1.35rem] border border-violet-300/20 bg-violet-400/10 px-5 py-4 text-sm font-black text-violet-100 backdrop-blur active:scale-[.98]">Criar / Entrar em sala</button>
            <button onClick={startMatchmaking} className="rounded-[1.35rem] bg-gradient-to-b from-yellow-200 to-yellow-500 px-6 py-4 text-3xl font-black text-black shadow-[0_8px_0_#8a4d00,0_24px_65px_rgba(250,204,21,.22)] active:translate-y-1 active:shadow-[0_3px_0_#8a4d00]">START</button>
          </div>

          <div className="relative z-10 mx-auto mt-4 max-w-2xl rounded-[1.2rem] border border-white/10 bg-black/35 px-4 py-3 text-sm text-zinc-300"><strong className="text-yellow-300">{selectedMode.title}</strong> · {lobbyMessage}</div>
        </main>

        <aside className="grid content-between gap-4 rounded-[1.8rem] border border-white/10 bg-black/42 p-4 backdrop-blur-xl">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-cyan-200">Online</p>
            <h3 className="mt-1 text-2xl font-black">Sala por código</h3>
            <p className="mt-2 text-sm text-zinc-400">Copie o código, mande para um amigo e inicie quando todos estiverem prontos.</p>
          </div>
          <button onClick={() => { playUiSound("click"); onCopyRoomCode(); }} className="rounded-[1.5rem] border border-yellow-300/25 bg-yellow-300/10 p-4 text-left active:scale-[.98]"><p className="text-[10px] font-black uppercase tracking-[0.25em] text-yellow-200">Código rápido</p><strong className="mt-2 block text-3xl tracking-widest text-yellow-100">{roomCode}</strong></button>
          <div className="grid gap-2">
            <button onClick={() => setOnlineOpen(true)} className="rounded-[1.35rem] bg-cyan-300 px-5 py-4 text-sm font-black text-black shadow-[0_6px_0_#0e7490] active:translate-y-1 active:shadow-none">Abrir sala online</button>
            <button onClick={onClaimDaily} className="rounded-[1.35rem] border border-white/10 bg-white/[0.07] px-5 py-4 text-sm font-black text-white active:scale-[.98]">{daily.canClaim ? `Coletar diária +${daily.todayReward}` : "Diária coletada"}</button>
          </div>
          <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4"><p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">Status</p><p className="mt-2 text-sm text-zinc-300">Perfil personalizado, moedas e progresso ficam no seu aparelho por enquanto.</p></div>
        </aside>
      </div>

      {onlineOpen && <div className="fixed inset-0 z-[70] grid place-items-end bg-black/70 p-3 backdrop-blur-md"><div className="max-h-[88vh] w-full max-w-[460px] overflow-y-auto rounded-[2rem] border border-cyan-300/15 bg-[#030712] p-3 shadow-[0_0_80px_rgba(14,165,233,.18)]"><div className="mb-3 flex items-center justify-between"><div><p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-200">Multiplayer</p><h3 className="text-2xl font-black">Sala online</h3></div><button onClick={() => setOnlineOpen(false)} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-black">Fechar</button></div><OnlineRoomPanel playerName={playerName} avatar={avatarEmoji} onMessage={onLobbyMessage} onStart={onPlay} /></div></div>}
      {matching && <div className="absolute inset-0 z-50 grid place-items-center bg-black/60 p-5 backdrop-blur-md"><div className="w-[min(380px,92vw)] rounded-[2rem] border border-yellow-300/20 bg-[#08020f] p-6 text-center shadow-[0_0_80px_rgba(139,92,246,.28)]"><div className="mx-auto mb-5 h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-yellow-300" /><p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-300">Clash Room</p><h3 className="mt-2 text-3xl font-black">Preparando</h3><p className="mt-2 text-sm text-zinc-400">{["Embaralhando cartas...", "Montando mesa...", "Sincronizando HUD...", "Entrando..."][matchStep]}</p></div></div>}
    </section>
  );
}
