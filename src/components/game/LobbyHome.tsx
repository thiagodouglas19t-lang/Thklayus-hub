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

function FloatingButton({ icon, label, hint, onClick, side = "left", tone = "default" }: { icon: string; label: string; hint?: string; onClick: () => void; side?: "left" | "right"; tone?: "default" | "online" | "reward" | "danger" }) {
  const toneClass = tone === "online" ? "from-cyan-300/90 to-violet-400/90 text-slate-950" : tone === "reward" ? "from-yellow-200 to-yellow-400 text-slate-950" : tone === "danger" ? "from-fuchsia-400 to-violet-500 text-white" : "from-white/70 to-white/35 text-slate-950";
  return <button onClick={() => { playUiSound("click"); onClick(); }} className={`group flex items-center gap-2 rounded-[1.25rem] border-2 border-white/70 bg-gradient-to-br ${toneClass} px-3 py-3 shadow-[0_10px_0_rgba(15,23,42,.18),0_22px_38px_rgba(15,23,42,.22)] backdrop-blur-xl transition hover:scale-[1.02] active:translate-y-1 active:shadow-[0_4px_0_rgba(15,23,42,.18)] ${side === "right" ? "justify-end text-right" : "justify-start text-left"}`}><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-950/12 text-2xl shadow-inner">{icon}</span><span className="min-w-0"><strong className="block text-sm font-black uppercase tracking-[.08em]">{label}</strong>{hint && <small className="mt-0.5 block truncate text-[10px] font-black opacity-65">{hint}</small>}</span></button>;
}

export default function LobbyHome({ playerName, equipped, stats, daily, roomCode, lobbyMessage, onPlay, onClaimDaily, onCopyRoomCode, onLobbyMessage }: LobbyHomeProps) {
  const [matching, setMatching] = useState(false);
  const [matchStep, setMatchStep] = useState(0);
  const [onlineOpen, setOnlineOpen] = useState(false);
  const [roomMode, setRoomMode] = useState<"quick" | "online" | "ranked">("quick");
  const avatarEmoji = equipped?.emoji || "⚡";
  const fx = useMemo(() => Array.from({ length: 28 }, (_, index) => index), []);
  const xpPercent = Math.min(100, Math.max(6, stats.currentLevelXp));

  useEffect(() => {
    if (!matching) return;
    setMatchStep(0);
    const stepTimer = window.setInterval(() => setMatchStep((step) => Math.min(3, step + 1)), 330);
    const startTimer = window.setTimeout(() => { playUiSound("start"); onPlay(); setMatching(false); }, 900);
    return () => { window.clearInterval(stepTimer); window.clearTimeout(startTimer); };
  }, [matching, onPlay]);

  function startMatchmaking() {
    playUiSound("confirm");
    setMatching(true);
    onLobbyMessage("Abrindo seleção de modo...");
  }

  function openOnline(mode: "online" | "ranked" = "online") {
    setRoomMode(mode);
    setOnlineOpen(true);
    onLobbyMessage(mode === "ranked" ? "Sala ranked aberta." : "Sala online aberta.");
  }

  return (
    <section className="relative mx-auto min-h-[calc(100vh-118px)] w-full overflow-hidden rounded-[2rem] border border-violet-200/45 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,.24),transparent_15rem),linear-gradient(180deg,#080014_0%,#190a45_42%,#3b136d_72%,#050008_100%)] shadow-[0_24px_90px_rgba(2,6,23,.42)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(124,58,237,.55),transparent_17rem),radial-gradient(circle_at_15%_60%,rgba(34,211,238,.18),transparent_18rem),radial-gradient(circle_at_88%_58%,rgba(250,204,21,.20),transparent_16rem)]" />
      <div className="pointer-events-none absolute inset-x-[-8%] bottom-[-10%] h-[42%] rounded-[50%_50%_0_0] bg-[linear-gradient(180deg,rgba(255,255,255,.14),rgba(255,255,255,.04)),linear-gradient(90deg,#12051f,#211047,#3b0764)] shadow-[inset_0_18px_45px_rgba(255,255,255,.08)]" />
      <div className="pointer-events-none absolute bottom-[11%] left-1/2 h-[16%] w-[58%] -translate-x-1/2 rounded-[50%] bg-violet-400/25 blur-2xl" />
      {fx.map((dot) => <span key={dot} className="pointer-events-none absolute rounded-full bg-white/70 shadow-[0_0_16px_rgba(255,255,255,.75)]" style={{ width: `${3 + (dot % 4) * 2}px`, height: `${3 + (dot % 4) * 2}px`, left: `${3 + ((dot * 23) % 94)}%`, top: `${6 + ((dot * 31) % 76)}%`, opacity: 0.35 + (dot % 5) * 0.1 }} />)}

      <div className="relative z-10 flex min-h-[calc(100vh-118px)] flex-col p-3 md:p-5">
        <header className="flex items-center justify-between gap-3 rounded-[1.6rem] border border-white/15 bg-black/24 p-2 backdrop-blur-xl">
          <button className="flex min-w-0 items-center gap-3 rounded-[1.35rem] border border-white/20 bg-white/10 p-2 pr-4 text-left text-white shadow-[0_18px_35px_rgba(0,0,0,.20)] active:scale-[.99]">
            <div className={`grid h-14 w-14 place-items-center rounded-[1rem] border-[3px] border-white/35 bg-gradient-to-br ${equipped?.gradient || "from-violet-600 to-cyan-300"} text-3xl shadow-[0_0_28px_rgba(124,58,237,.45)]`}>{avatarEmoji}</div>
            <div className="min-w-0"><h3 className="truncate text-xl font-black">{playerName}</h3><div className="mt-1 h-2 w-32 overflow-hidden rounded-full bg-white/14"><div className="h-full rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-yellow-300" style={{ width: `${xpPercent}%` }} /></div><p className="mt-1 text-[10px] font-black uppercase tracking-[.18em] text-white/45">Lobby Alpha</p></div>
          </button>

          <div className="flex items-center gap-2">
            <div className="rounded-full border border-yellow-200/60 bg-yellow-300 px-4 py-2 text-sm font-black text-slate-950 shadow-[0_6px_0_#b45309]">🪙 {stats.coins}</div>
            <div className="rounded-full border border-violet-200/30 bg-white/12 px-4 py-2 text-sm font-black text-white">Nv. {stats.level}</div>
          </div>
        </header>

        <div className="grid flex-1 grid-cols-[96px_1fr_96px] items-center gap-2 py-3 md:grid-cols-[170px_1fr_170px] md:gap-5">
          <aside className="grid gap-3">
            <FloatingButton icon="🎮" label="Modos" hint="Escolher" onClick={onPlay} tone="danger" />
            <FloatingButton icon="🌐" label="Online" hint="Sala" onClick={() => openOnline("online")} tone="online" />
            <FloatingButton icon="🎁" label="Diária" hint={daily.canClaim ? `+${daily.todayReward}` : "coletada"} onClick={onClaimDaily} tone="reward" />
          </aside>

          <main className="relative grid min-h-[540px] place-items-center text-center">
            <div className="absolute top-2 max-w-[84vw] rounded-full border border-white/20 bg-black/35 px-5 py-2 text-sm font-black text-white shadow-[0_10px_28px_rgba(0,0,0,.22)] backdrop-blur-xl">{lobbyMessage}</div>

            <div className="absolute top-16 grid w-[min(520px,92%)] grid-cols-3 gap-2 rounded-[1.5rem] border border-white/10 bg-black/25 p-2 backdrop-blur-xl">
              {[{ id: "quick", label: "Rápida", icon: "⚡" }, { id: "online", label: "Sala", icon: "🌐" }, { id: "ranked", label: "Ranked", icon: "🏆" }].map((item) => <button key={item.id} onClick={() => { const mode = item.id as typeof roomMode; setRoomMode(mode); if (mode !== "quick") openOnline(mode); else onLobbyMessage("Partida rápida selecionada."); }} className={`rounded-[1rem] px-2 py-2 text-xs font-black transition active:scale-[.97] ${roomMode === item.id ? "bg-yellow-300 text-black shadow-[0_0_22px_rgba(250,204,21,.35)]" : "bg-white/10 text-white/75"}`}><span className="block text-lg">{item.icon}</span>{item.label}</button>)}
            </div>

            <div className="relative mt-16 grid place-items-center">
              <div className="absolute h-64 w-64 rounded-full bg-violet-500/30 blur-3xl" />
              <div className="absolute top-[205px] h-16 w-96 rounded-[50%] bg-black/35 blur-xl" />
              <div className="relative z-10 rounded-[2rem] border border-white/10 bg-white/[0.055] px-7 py-5 backdrop-blur-sm"><p className="text-[10px] font-black uppercase tracking-[.45em] text-yellow-200">THKLAYUS</p><h1 className="mt-1 text-5xl font-black leading-none text-white drop-shadow-[0_8px_18px_rgba(0,0,0,.42)] md:text-7xl">Clash<br />Cards</h1><p className="mt-3 rounded-full bg-black/25 px-4 py-2 text-xs font-black uppercase tracking-[.22em] text-white/80 backdrop-blur">Mesa rápida · estratégia · caos</p></div>

              <div className="relative z-10 mt-7 flex items-end justify-center">
                {["+2", "THK", "↺"].map((text, index) => <div key={text} className="mx-[-10px] h-44 rounded-[1.5rem] border-[5px] border-white/85 bg-gradient-to-br from-violet-700 via-fuchsia-600 to-yellow-300 p-2 shadow-[0_24px_48px_rgba(0,0,0,.36)]" style={{ width: "7.4rem", transform: `rotate(${(index - 1) * 9}deg) translateY(${index === 1 ? -18 : 0}px)` }}><div className="grid h-full place-items-center rounded-[1rem] bg-white/18 text-4xl font-black text-white drop-shadow">{text}</div></div>)}
              </div>
            </div>

            <div className="absolute bottom-5 left-1/2 grid w-[min(470px,88vw)] -translate-x-1/2 gap-2">
              <button onClick={startMatchmaking} className="rounded-[1.6rem] border-4 border-yellow-100 bg-gradient-to-b from-yellow-100 to-yellow-400 px-6 py-4 text-5xl font-black text-slate-950 shadow-[0_10px_0_#a8550d,0_28px_58px_rgba(245,158,11,.35)] active:translate-y-1 active:shadow-[0_4px_0_#a8550d]">JOGAR</button>
              <button onClick={() => openOnline("online")} className="rounded-[1.25rem] border border-cyan-200/40 bg-cyan-300/15 px-5 py-3 text-sm font-black uppercase tracking-[.18em] text-cyan-100 backdrop-blur-xl active:scale-[.98]">Criar / Entrar em sala</button>
            </div>
          </main>

          <aside className="grid gap-3">
            <FloatingButton icon="🛒" label="Loja" hint="skins" side="right" onClick={() => onLobbyMessage("Abra a aba Loja para personalizar.")} />
            <FloatingButton icon="🏆" label="Rank" hint={`${stats.winRate}% WR`} side="right" onClick={() => onLobbyMessage(`Vitórias: ${stats.wins} · WR ${stats.winRate}%`)} tone="reward" />
            <FloatingButton icon="🔗" label="Código" hint={roomCode} side="right" onClick={() => { playUiSound("click"); onCopyRoomCode(); }} tone="online" />
          </aside>
        </div>
      </div>

      {onlineOpen && <div className="fixed inset-0 z-[70] grid place-items-end bg-black/65 p-3 backdrop-blur-md"><div className="max-h-[90vh] w-full max-w-[500px] overflow-y-auto rounded-[2rem] border border-cyan-200/35 bg-[linear-gradient(180deg,rgba(10,20,40,.92),rgba(15,23,42,.96))] p-3 shadow-[0_0_90px_rgba(14,165,233,.25)] backdrop-blur-2xl"><div className="mb-3 flex items-center justify-between text-white"><div><p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-100">{roomMode === "ranked" ? "Fila Ranqueada" : "Multiplayer"}</p><h3 className="text-2xl font-black">Escolha sua sala</h3><p className="text-xs text-white/55">Crie uma party, entre por código ou chame amigos.</p></div><button onClick={() => setOnlineOpen(false)} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-black">Fechar</button></div><OnlineRoomPanel playerName={playerName} avatar={avatarEmoji} onMessage={onLobbyMessage} onStart={onPlay} /></div></div>}
      {matching && <div className="absolute inset-0 z-50 grid place-items-center bg-black/50 p-5 backdrop-blur-md"><div className="w-[min(380px,92vw)] rounded-[2rem] border border-white/20 bg-slate-950/86 p-6 text-center text-white shadow-[0_0_80px_rgba(124,58,237,.28)] backdrop-blur-2xl"><div className="mx-auto mb-5 h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-yellow-300" /><p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-300">Clash Room</p><h3 className="mt-2 text-3xl font-black">Preparando</h3><p className="mt-2 text-sm font-bold text-white/65">{["Abrindo modos...", "Organizando mesa...", "Carregando cartas...", "Entrando..."][matchStep]}</p></div></div>}
    </section>
  );
}
