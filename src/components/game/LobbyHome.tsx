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
    osc.type = "sine";
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  } catch {}
}

export default function LobbyHome({ playerName, equipped, stats, daily, roomCode, lobbyMessage, selectedMode, onPlay, onClaimDaily, onCopyRoomCode, onSelectMode, onLobbyMessage }: LobbyHomeProps) {
  const [matching, setMatching] = useState(false);
  const [matchStep, setMatchStep] = useState(0);
  const avatarEmoji = equipped?.emoji || "⚡";
  const avatarGradient = equipped?.gradient || "from-violet-700 via-fuchsia-600 to-black";
  const particles = useMemo(() => Array.from({ length: 14 }, (_, index) => index), []);

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
    <section className="relative mx-auto h-[560px] max-h-[72vh] min-h-[520px] max-w-[1120px] overflow-hidden rounded-[1.2rem] border border-white/10 bg-[radial-gradient(circle_at_52%_42%,rgba(14,165,233,.32),transparent_18rem),radial-gradient(circle_at_48%_22%,rgba(168,85,247,.45),transparent_18rem),linear-gradient(135deg,#09001a,#00131f_48%,#030006)] shadow-[0_24px_90px_rgba(0,0,0,.78)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:52px_52px] opacity-35" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/60 to-transparent" />
      {particles.map((dot) => <span key={dot} className="pointer-events-none absolute h-1 w-1 animate-pulse rounded-full bg-cyan-200/75 shadow-[0_0_18px_rgba(125,211,252,.8)]" style={{ left: `${7 + ((dot * 31) % 86)}%`, top: `${9 + ((dot * 43) % 70)}%`, animationDelay: `${dot * 0.15}s` }} />)}

      <div className="absolute left-3 top-3 z-20 flex flex-col gap-2">
        {["STORE", "LUCK", "PASS", "MISSIONS", "EVENTS"].map((item) => (
          <button key={item} onClick={() => { playUiSound("click"); onLobbyMessage(`${item} entra nas próximas atualizações.`); }} className="w-28 rounded-lg border border-cyan-200/15 bg-black/55 px-3 py-2 text-left text-[11px] font-black text-white shadow-[0_0_22px_rgba(0,0,0,.35)] backdrop-blur hover:border-yellow-300/50">
            <span className="text-yellow-300">▸</span> {item}
          </button>
        ))}
      </div>

      <div className="absolute left-4 top-4 z-30 hidden translate-x-32 items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-3 py-2 backdrop-blur sm:flex">
        <div className={`grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br ${avatarGradient} text-xl`}>{avatarEmoji}</div>
        <div>
          <strong className="block text-sm leading-none">{playerName}</strong>
          <span className="text-[10px] text-zinc-400">Lv. {stats.level} · {stats.wins} wins</span>
        </div>
      </div>

      <div className="absolute right-3 top-3 z-30 flex items-center gap-2">
        <button onClick={() => { playUiSound("click"); onCopyRoomCode(); }} className="rounded-full border border-yellow-300/25 bg-black/45 px-3 py-2 text-xs font-black text-yellow-100 backdrop-blur">{roomCode}</button>
        <div className="rounded-full border border-yellow-300/25 bg-yellow-300/10 px-3 py-2 text-xs font-black">🪙 {stats.coins}</div>
        <div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-2 text-xs font-black">Nv. {stats.level}</div>
      </div>

      <div className="absolute left-1/2 top-5 z-20 -translate-x-1/2 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-yellow-300">THKLAYUS</p>
        <h2 className="text-3xl font-black leading-none sm:text-4xl">Arena</h2>
      </div>

      <div className="absolute left-1/2 top-[46%] z-10 h-52 w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-cyan-400/12 blur-3xl" />
      <div className="absolute left-1/2 top-[49%] z-10 h-20 w-72 -translate-x-1/2 rounded-[50%] border border-cyan-200/20 bg-black/55 shadow-[0_0_65px_rgba(34,211,238,.18)]" />

      <div className="absolute left-1/2 top-[43%] z-20 -translate-x-1/2 -translate-y-1/2">
        <div className={`relative grid h-64 w-44 place-items-center rounded-[2rem] bg-gradient-to-br ${avatarGradient} text-7xl shadow-[0_38px_90px_rgba(0,0,0,.75),0_0_90px_rgba(139,92,246,.35)] ring-2 ring-white/15 sm:h-72 sm:w-48`}>
          <div className="absolute inset-3 rounded-[1.55rem] border border-white/15" />
          <div className="absolute -inset-5 rounded-[2.4rem] border border-cyan-200/10 blur-sm" />
          <span className="drop-shadow-2xl">{avatarEmoji}</span>
          <div className="absolute -bottom-5 rounded-full bg-black/90 px-5 py-2 text-xs font-black ring-1 ring-white/10">{playerName}</div>
        </div>
      </div>

      <div className="absolute right-3 top-20 z-30 flex w-24 flex-col gap-2 sm:w-32">
        {partySlots.map((member, index) => (
          <button key={`${member.name}-${index}`} onClick={() => index > 0 && onLobbyMessage(member.ready ? `${member.name} está pronto.` : "Slot reservado para multiplayer online.")} className={`flex items-center gap-2 rounded-xl border p-2 text-left backdrop-blur transition active:scale-[.97] ${index === 0 ? "border-yellow-300/45 bg-yellow-300/12" : member.ready ? "border-cyan-300/25 bg-black/45" : "border-dashed border-white/15 bg-black/35"}`}>
            <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${index === 0 ? `bg-gradient-to-br ${avatarGradient}` : "bg-white/8"} text-lg`}>{index === 0 ? avatarEmoji : member.emoji}</div>
            <div className="min-w-0 hidden sm:block">
              <strong className="block truncate text-xs">{index === 0 ? "Você" : member.name}</strong>
              <p className="truncate text-[10px] text-zinc-500">{index === 0 ? "Líder" : member.status}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="absolute bottom-3 left-3 z-30 hidden w-[min(520px,58%)] items-end gap-2 md:flex">
        {["VAULT", "WEAPON", "CHARACTER", "LAB"].map((item) => (
          <button key={item} onClick={() => { playUiSound("click"); onLobbyMessage(`${item} entra na próxima fase.`); }} className="rounded-lg border border-white/10 bg-black/55 px-4 py-3 text-xs font-black text-white backdrop-blur hover:border-cyan-300/40">{item}</button>
        ))}
      </div>

      <div className="absolute bottom-3 right-3 z-40 w-[min(330px,52%)]">
        <div className="mb-2 rounded-xl border border-cyan-300/20 bg-black/60 p-3 backdrop-blur">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">{selectedMode.title}</p>
              <p className="text-[11px] text-zinc-400">{selectedMode.status}</p>
            </div>
            <button onClick={() => { playUiSound("click"); onClaimDaily(); }} className="rounded-lg bg-white/10 px-3 py-2 text-xs font-black">🎁 {daily.nextChestWins === 0 ? "OK" : daily.nextChestWins}</button>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={startMatchmaking} className="flex-1 rounded-xl bg-gradient-to-b from-yellow-200 to-yellow-500 px-5 py-4 text-2xl font-black text-black shadow-[0_7px_0_#8a4d00,0_24px_55px_rgba(0,0,0,.58)] transition hover:brightness-110 active:translate-y-1 active:shadow-[0_3px_0_#8a4d00]">START</button>
          <button onClick={() => { playUiSound("click"); onLobbyMessage("Treino local selecionado."); }} className="rounded-xl border border-white/10 bg-black/60 px-4 py-4 text-xs font-black text-white backdrop-blur">TREINO</button>
        </div>
      </div>

      <div className="absolute bottom-3 left-3 z-40 rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-[11px] text-zinc-300 backdrop-blur md:hidden">{lobbyMessage}</div>

      <div className="absolute bottom-24 left-3 z-30 w-36 rounded-xl border border-white/10 bg-black/45 p-3 text-xs text-zinc-300 backdrop-blur sm:w-44">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-yellow-300">Status</p>
        <p className="mt-1 line-clamp-2">{lobbyMessage}</p>
      </div>

      <div className="absolute bottom-24 right-[9.5rem] z-30 hidden w-44 rounded-xl border border-white/10 bg-black/45 p-3 backdrop-blur lg:block">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-yellow-300">Modo</p>
        <div className="mt-2 grid gap-1">
          {gameIdentity.modes.slice(0, 3).map((mode) => (
            <button key={mode.id} onClick={() => { playUiSound("click"); onSelectMode(mode); }} className={`rounded-lg px-3 py-2 text-left text-[11px] font-black ${selectedMode.id === mode.id ? "bg-yellow-300 text-black" : "bg-white/8 text-white"}`}>{mode.title}</button>
          ))}
        </div>
      </div>

      {matching && (
        <div className="absolute inset-0 z-50 grid place-items-center bg-black/70 p-5 backdrop-blur-md">
          <div className="w-[min(420px,92vw)] rounded-[2rem] border border-yellow-300/20 bg-[#08020f] p-6 text-center shadow-[0_0_80px_rgba(139,92,246,.28)]">
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
