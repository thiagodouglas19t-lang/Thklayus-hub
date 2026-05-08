import { useEffect, useMemo, useState } from "react";
import { partySlots } from "../../lib/cosmetics";
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
    osc.frequency.value = type === "start" ? 720 : type === "confirm" ? 520 : 340;
    gain.gain.setValueAtTime(0.001, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.015); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
    osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.16);
  } catch {}
}

function MenuButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return <button onClick={onClick} className="rounded-xl border border-white/15 bg-slate-950/55 px-3 py-2 text-left text-[10px] font-black text-white shadow-[0_8px_22px_rgba(0,0,0,.22)] backdrop-blur transition hover:border-yellow-300/50 active:scale-[.97]"><span className="mr-1 text-yellow-300">▸</span>{children}</button>;
}

export default function LobbyHome({ playerName, equipped, stats, daily, roomCode, lobbyMessage, selectedMode, onPlay, onClaimDaily, onCopyRoomCode, onSelectMode, onLobbyMessage }: LobbyHomeProps) {
  const [matching, setMatching] = useState(false);
  const [matchStep, setMatchStep] = useState(0);
  const [onlineOpen, setOnlineOpen] = useState(false);
  const avatarEmoji = equipped?.emoji || "⚡";
  const particles = useMemo(() => Array.from({ length: 16 }, (_, index) => index), []);

  useEffect(() => {
    if (!matching) return;
    setMatchStep(0);
    const stepTimer = window.setInterval(() => setMatchStep((step) => Math.min(3, step + 1)), 520);
    const startTimer = window.setTimeout(() => { playUiSound("start"); onPlay(); }, 1550);
    return () => { window.clearInterval(stepTimer); window.clearTimeout(startTimer); };
  }, [matching, onPlay]);

  function startMatchmaking() {
    playUiSound("confirm");
    setMatching(true);
    onLobbyMessage("Entrando na sala...");
  }

  return (
    <section className="relative mx-auto h-[min(700px,calc(100vh-118px))] min-h-[510px] w-full overflow-hidden rounded-[1.4rem] border border-white/15 bg-[linear-gradient(180deg,#7ed9ff_0%,#3aa7e8_24%,#1e3352_52%,#07111f_100%)] shadow-[0_24px_90px_rgba(0,0,0,.55)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,.55),transparent_13rem),radial-gradient(circle_at_54%_60%,rgba(56,189,248,.28),transparent_18rem),radial-gradient(circle_at_50%_65%,rgba(168,85,247,.22),transparent_20rem)]" />
      <div className="absolute left-1/2 top-[18%] h-48 w-32 -translate-x-1/2 rounded-t-3xl border border-white/20 bg-white/10 shadow-[0_0_80px_rgba(255,255,255,.22)]" />
      <div className="absolute left-0 top-[32%] h-28 w-[34%] -skew-x-12 bg-cyan-200/24 ring-1 ring-white/10" />
      <div className="absolute right-0 top-[30%] h-28 w-[34%] skew-x-12 bg-fuchsia-300/18 ring-1 ring-white/10" />
      <div className="absolute inset-x-0 bottom-0 h-[48%] origin-bottom bg-[linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(rgba(0,0,0,.22)_1px,transparent_1px)] bg-[size:86px_48px] opacity-55 [transform:perspective(520px)_rotateX(58deg)_scaleY(1.8)]" />
      {particles.map((dot) => <span key={dot} className="absolute h-1 w-1 animate-pulse rounded-full bg-white/80 shadow-[0_0_14px_rgba(255,255,255,.9)]" style={{ left: `${7 + ((dot * 29) % 86)}%`, top: `${10 + ((dot * 37) % 58)}%`, animationDelay: `${dot * 0.14}s` }} />)}

      <div className="absolute left-3 top-3 z-30 flex w-32 flex-col gap-2">
        <MenuButton onClick={() => onLobbyMessage("Loja entra depois. Agora foco: salas e jogo.")}>STORE</MenuButton>
        <MenuButton onClick={() => onLobbyMessage("Cofre removido do lobby por enquanto.")}>VAULT</MenuButton>
        <MenuButton onClick={() => onLobbyMessage("Missões entram depois.")}>MISSIONS</MenuButton>
        <MenuButton onClick={() => onLobbyMessage("Eventos entram depois.")}>EVENTS</MenuButton>
      </div>

      <div className="absolute right-3 top-3 z-30 flex items-center gap-2">
        <button onClick={() => { playUiSound("click"); onCopyRoomCode(); }} className="rounded-xl border border-yellow-300/30 bg-slate-950/45 px-4 py-2 text-xs font-black text-yellow-100 backdrop-blur">{roomCode}</button>
        <button onClick={() => setOnlineOpen(true)} className="rounded-xl border border-cyan-300/25 bg-cyan-400/25 px-4 py-2 text-xs font-black text-cyan-50 backdrop-blur">CRIAR SALA</button>
      </div>

      <div className="absolute left-1/2 top-4 z-20 -translate-x-1/2 text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.34em] text-yellow-200 drop-shadow">THKLAYUS</p>
        <h2 className="text-4xl font-black leading-none drop-shadow md:text-5xl">Arena Room</h2>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/80">{selectedMode.title}</p>
      </div>

      <div className="absolute left-1/2 top-[48%] z-20 w-[260px] -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="mx-auto grid h-40 w-40 place-items-center rounded-[2.2rem] border border-white/20 bg-slate-950/35 text-6xl shadow-[0_0_70px_rgba(34,211,238,.26)] backdrop-blur-md">{avatarEmoji}</div>
        <h3 className="mt-3 text-3xl font-black drop-shadow">{playerName}</h3>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">Nv. {stats.level} · {stats.winRate}% WR</p>
      </div>

      <div className="absolute right-3 top-[27%] z-30 grid w-36 gap-2">
        <button onClick={() => setOnlineOpen(true)} className="rounded-xl border border-yellow-300/30 bg-yellow-300/20 px-3 py-3 text-xs font-black text-yellow-50 backdrop-blur">+ Convidar</button>
        {partySlots.slice(1, 4).map((member) => <button key={member.name} onClick={() => setOnlineOpen(true)} className="flex items-center justify-between rounded-xl border border-white/15 bg-slate-950/45 px-2 py-2 text-[10px] font-black backdrop-blur"><span>{member.emoji}</span><span className="truncate">Slot livre</span><span>＋</span></button>)}
      </div>

      <div className="absolute bottom-4 left-3 z-40 flex gap-2">
        {gameIdentity.modes.slice(0, 4).map((mode) => <button key={mode.id} onClick={() => { playUiSound("click"); onSelectMode(mode); }} className={`rounded-xl border px-4 py-3 text-[10px] font-black backdrop-blur active:scale-[.97] ${selectedMode.id === mode.id ? "border-yellow-300 bg-yellow-300 text-black" : "border-white/15 bg-slate-950/55 text-white"}`}>{mode.title}</button>)}
      </div>

      <div className="absolute bottom-4 right-3 z-40 grid w-[330px] grid-cols-[100px_1fr] gap-2">
        <button onClick={() => setOnlineOpen(true)} className="rounded-xl border border-white/15 bg-slate-950/65 px-3 py-3 text-xs font-black text-white backdrop-blur">SALA</button>
        <button onClick={startMatchmaking} className="rounded-xl bg-gradient-to-b from-yellow-200 to-yellow-500 px-6 py-3 text-3xl font-black text-black shadow-[0_7px_0_#8a4d00,0_20px_50px_rgba(0,0,0,.36)] active:translate-y-1 active:shadow-[0_3px_0_#8a4d00]">START</button>
        <div className="col-span-2 rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2 text-xs text-white/80 backdrop-blur"><strong className="text-yellow-200">{selectedMode.title}</strong> · {lobbyMessage}</div>
      </div>

      {onlineOpen && <div className="fixed inset-0 z-[70] grid place-items-end bg-black/55 p-3 backdrop-blur-md"><div className="max-h-[88vh] w-full max-w-[430px] overflow-y-auto rounded-[2rem] border border-cyan-300/15 bg-[#030712] p-3 shadow-[0_0_80px_rgba(14,165,233,.18)]"><div className="mb-3 flex items-center justify-between"><div><p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-200">Multiplayer</p><h3 className="text-2xl font-black">Sala online</h3></div><button onClick={() => setOnlineOpen(false)} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-black">Fechar</button></div><OnlineRoomPanel playerName={playerName} avatar={avatarEmoji} onMessage={onLobbyMessage} onStart={onPlay} /></div></div>}
      {matching && <div className="absolute inset-0 z-50 grid place-items-center bg-black/45 p-5 backdrop-blur-md"><div className="w-[min(380px,92vw)] rounded-[2rem] border border-yellow-300/20 bg-[#08020f] p-6 text-center shadow-[0_0_80px_rgba(139,92,246,.28)]"><div className="mx-auto mb-5 h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-yellow-300" /><p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-300">Arena</p><h3 className="mt-2 text-3xl font-black">Preparando</h3><p className="mt-2 text-sm text-zinc-400">{["Criando sala...", "Chamando jogadores...", "Sincronizando HUD...", "Entrando..."][matchStep]}</p></div></div>}
    </section>
  );
}
