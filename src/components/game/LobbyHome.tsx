import { useEffect, useMemo, useState } from "react";
import { partySlots } from "../../lib/cosmetics";
import { gameIdentity } from "../../lib/gameIdentity";

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
    osc.frequency.value = type === "start" ? 720 : type === "confirm" ? 520 : 340;
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  } catch {}
}

function CardPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[1.45rem] border border-white/10 bg-black/45 p-4 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,.055)] ${className}`}>{children}</div>;
}

export default function LobbyHome({ playerName, equipped, stats, daily, roomCode, lobbyMessage, selectedMode, onPlay, onClaimDaily, onCopyRoomCode, onSelectMode, onLobbyMessage }: LobbyHomeProps) {
  const [matching, setMatching] = useState(false);
  const [matchStep, setMatchStep] = useState(0);
  const avatarEmoji = equipped?.emoji || "⚡";
  const avatarGradient = equipped?.gradient || "from-violet-700 via-fuchsia-600 to-black";
  const particles = useMemo(() => Array.from({ length: 16 }, (_, index) => index), []);

  useEffect(() => {
    if (!matching) return;
    setMatchStep(0);
    const stepTimer = window.setInterval(() => setMatchStep((step) => Math.min(3, step + 1)), 620);
    const startTimer = window.setTimeout(() => {
      playUiSound("start");
      onPlay();
    }, 2300);
    return () => {
      window.clearInterval(stepTimer);
      window.clearTimeout(startTimer);
    };
  }, [matching, onPlay]);

  function startMatchmaking() {
    playUiSound("confirm");
    setMatching(true);
    onLobbyMessage("Procurando sala local...");
  }

  return (
    <section className="relative mx-auto max-w-[430px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_12%,rgba(139,92,246,.42),transparent_18rem),radial-gradient(circle_at_50%_42%,rgba(14,165,233,.18),transparent_15rem),linear-gradient(180deg,#090014,#000)] p-3 shadow-[0_24px_90px_rgba(0,0,0,.78)] sm:max-w-[480px]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:42px_42px] opacity-30" />
      {particles.map((dot) => <span key={dot} className="pointer-events-none absolute h-1 w-1 animate-pulse rounded-full bg-cyan-200/70 shadow-[0_0_18px_rgba(125,211,252,.8)]" style={{ left: `${7 + ((dot * 29) % 86)}%`, top: `${7 + ((dot * 41) % 86)}%`, animationDelay: `${dot * 0.15}s` }} />)}

      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between gap-2 rounded-[1.4rem] border border-white/10 bg-black/45 p-3 backdrop-blur-xl">
          <div className="flex min-w-0 items-center gap-3">
            <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${avatarGradient} text-2xl shadow-[0_0_24px_rgba(139,92,246,.35)]`}>{avatarEmoji}</div>
            <div className="min-w-0">
              <strong className="block truncate text-base leading-tight">{playerName}</strong>
              <p className="text-[11px] text-zinc-400">Nv. {stats.level} · {stats.currentLevelXp}/100 XP</p>
            </div>
          </div>
          <div className="text-right">
            <p className="rounded-full border border-yellow-300/25 bg-yellow-300/10 px-3 py-1 text-xs font-black">🪙 {stats.coins}</p>
            <p className="mt-1 text-[10px] text-zinc-500">{stats.wins}W · {stats.winRate}%</p>
          </div>
        </div>

        <div className="relative min-h-[380px] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(168,85,247,.42),transparent_12rem),linear-gradient(180deg,rgba(255,255,255,.045),rgba(0,0,0,.45))] p-4">
          <div className="absolute left-1/2 top-4 z-20 -translate-x-1/2 text-center">
            <span className="rounded-full bg-yellow-300 px-4 py-1 text-[10px] font-black tracking-[0.18em] text-black shadow-[0_0_28px_rgba(250,204,21,.35)]">CLASH CARDS</span>
            <h2 className="mt-2 text-4xl font-black leading-none">Arena</h2>
            <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-zinc-400">Lobby vertical</p>
          </div>

          <div className="absolute left-1/2 top-[48%] h-20 w-64 -translate-x-1/2 rounded-[50%] border border-cyan-200/20 bg-black/55 shadow-[0_0_65px_rgba(34,211,238,.18)]" />
          <div className="absolute left-1/2 top-[45%] z-20 -translate-x-1/2 -translate-y-1/2">
            <div className={`relative grid h-56 w-40 place-items-center rounded-[2rem] bg-gradient-to-br ${avatarGradient} text-7xl shadow-[0_34px_85px_rgba(0,0,0,.75),0_0_80px_rgba(139,92,246,.35)] ring-2 ring-white/15`}>
              <div className="absolute inset-3 rounded-[1.55rem] border border-white/15" />
              <div className="absolute -inset-5 rounded-[2.4rem] border border-cyan-200/10 blur-sm" />
              <span className="drop-shadow-2xl">{avatarEmoji}</span>
              <div className="absolute -bottom-5 rounded-full bg-black/90 px-5 py-2 text-xs font-black ring-1 ring-white/10">{playerName}</div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-30 grid grid-cols-4 gap-2">
            {partySlots.map((member, index) => (
              <button key={`${member.name}-${index}`} onClick={() => index > 0 && onLobbyMessage(member.ready ? `${member.name} está pronto.` : "Slot reservado para multiplayer online.")} className={`rounded-2xl border p-2 text-center backdrop-blur transition active:scale-[.97] ${index === 0 ? "border-yellow-300/45 bg-yellow-300/12" : member.ready ? "border-cyan-300/25 bg-black/45" : "border-dashed border-white/15 bg-black/35"}`}>
                <div className={`mx-auto grid h-10 w-10 place-items-center rounded-xl ${index === 0 ? `bg-gradient-to-br ${avatarGradient}` : "bg-white/8"} text-xl`}>{index === 0 ? avatarEmoji : member.emoji}</div>
                <strong className="mt-1 block truncate text-[10px]">{index === 0 ? "Você" : member.name}</strong>
                <p className="truncate text-[9px] text-zinc-500">{index === 0 ? "Líder" : member.status}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-2">
          <button onClick={startMatchmaking} className="rounded-[1.4rem] bg-gradient-to-b from-yellow-200 to-yellow-500 px-5 py-4 text-2xl font-black text-black shadow-[0_7px_0_#8a4d00,0_24px_55px_rgba(0,0,0,.58)] transition hover:brightness-110 active:translate-y-1 active:shadow-[0_3px_0_#8a4d00]">START</button>
          <button onClick={() => { playUiSound("click"); onLobbyMessage("Treino local selecionado."); }} className="rounded-[1.4rem] border border-white/10 bg-black/60 px-4 py-4 text-xs font-black text-white backdrop-blur">TREINO</button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {["Loja", "Passe", "Missões", "Eventos"].map((item) => (
            <button key={item} onClick={() => { playUiSound("click"); onLobbyMessage(`${item} entra nas próximas atualizações.`); }} className="rounded-2xl border border-white/10 bg-black/45 px-2 py-3 text-[10px] font-black text-white backdrop-blur active:scale-[.97]">{item}</button>
          ))}
        </div>

        <CardPanel>
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-yellow-300">Modo</p>
              <strong className="text-xl">{selectedMode.title}</strong>
            </div>
            <button onClick={() => { playUiSound("click"); onCopyRoomCode(); }} className="rounded-xl border border-yellow-300/20 bg-yellow-300/10 px-3 py-2 text-xs font-black text-yellow-100">{roomCode}</button>
          </div>
          <div className="grid gap-2">
            {gameIdentity.modes.slice(0, 4).map((mode) => (
              <button key={mode.id} onClick={() => { playUiSound("click"); onSelectMode(mode); }} className={`rounded-2xl border px-3 py-3 text-left transition active:scale-[.98] ${selectedMode.id === mode.id ? "border-yellow-300 bg-yellow-300/15" : "border-white/10 bg-white/[0.045]"}`}>
                <strong className="block text-sm">{mode.title}</strong>
                <p className="text-[11px] text-zinc-500">{mode.status}</p>
              </button>
            ))}
          </div>
        </CardPanel>

        <div className="grid grid-cols-2 gap-2">
          <CardPanel className="border-yellow-300/15 bg-yellow-300/[0.07]">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-yellow-300">Login diário</p>
            <strong className="mt-1 block text-2xl">🔥 {daily.streak}</strong>
            <p className="text-[11px] text-zinc-400">+{daily.todayReward} moedas</p>
            <button onClick={() => { playUiSound("confirm"); onClaimDaily(); }} className={`mt-3 w-full rounded-xl px-3 py-2 text-xs font-black ${daily.canClaim ? "bg-yellow-300 text-black" : "bg-white/10 text-white/45"}`}>{daily.canClaim ? "Coletar" : "OK"}</button>
          </CardPanel>

          <CardPanel>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-yellow-300">Status</p>
            <p className="mt-2 min-h-12 text-xs text-zinc-300">{lobbyMessage}</p>
            <p className="mt-2 text-[11px] text-zinc-500">Baú: 🎁 {daily.nextChestWins === 0 ? "Pronto" : `${daily.nextChestWins} vitórias`}</p>
          </CardPanel>
        </div>
      </div>

      {matching && (
        <div className="absolute inset-0 z-50 grid place-items-center bg-black/70 p-5 backdrop-blur-md">
          <div className="w-[min(380px,92vw)] rounded-[2rem] border border-yellow-300/20 bg-[#08020f] p-6 text-center shadow-[0_0_80px_rgba(139,92,246,.28)]">
            <div className="mx-auto mb-5 h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-yellow-300" />
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-300">Matchmaking</p>
            <h3 className="mt-2 text-3xl font-black">Preparando sala</h3>
            <p className="mt-2 text-sm text-zinc-400">{["Buscando jogadores...", "Sincronizando squad...", "Carregando arena...", "Entrando na partida..."][matchStep]}</p>
            <button onClick={() => setMatching(false)} className="mt-5 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-black text-white">Cancelar</button>
          </div>
        </div>
      )}
    </section>
  );
}
