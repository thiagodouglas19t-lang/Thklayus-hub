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
    osc.frequency.value = type === "start" ? 680 : type === "confirm" ? 520 : 340;
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

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[1.4rem] border border-white/10 bg-black/45 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-xl ${className}`}>{children}</div>;
}

export default function LobbyHome({ playerName, equipped, stats, daily, roomCode, lobbyMessage, selectedMode, onPlay, onClaimDaily, onCopyRoomCode, onSelectMode, onLobbyMessage }: LobbyHomeProps) {
  const [matching, setMatching] = useState(false);
  const [matchStep, setMatchStep] = useState(0);
  const avatarEmoji = equipped?.emoji || "⚡";
  const avatarGradient = equipped?.gradient || "from-violet-700 via-fuchsia-600 to-black";
  const particles = useMemo(() => Array.from({ length: 18 }, (_, index) => index), []);

  useEffect(() => {
    if (!matching) return;
    setMatchStep(0);
    const stepTimer = window.setInterval(() => setMatchStep((step) => Math.min(3, step + 1)), 650);
    const startTimer = window.setTimeout(() => {
      playUiSound("start");
      onPlay();
    }, 2450);
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

  function clickRoomCode() {
    playUiSound("click");
    onCopyRoomCode();
  }

  function claim() {
    playUiSound("confirm");
    onClaimDaily();
  }

  return (
    <section className="relative mx-auto min-h-[600px] max-w-[1180px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_10%,rgba(139,92,246,.48),transparent_18rem),radial-gradient(circle_at_50%_100%,rgba(250,204,21,.16),transparent_18rem),linear-gradient(180deg,#07000f,#000)] p-3 shadow-[0_24px_90px_rgba(0,0,0,.78)] sm:min-h-[620px] sm:p-4 lg:h-[calc(100vh-128px)] lg:max-h-[720px] lg:min-h-[560px]">
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:42px_42px]" />
      {particles.map((dot) => (
        <span key={dot} className="pointer-events-none absolute h-1 w-1 animate-pulse rounded-full bg-violet-200/70 shadow-[0_0_18px_rgba(196,181,253,.8)]" style={{ left: `${8 + ((dot * 29) % 86)}%`, top: `${10 + ((dot * 47) % 74)}%`, animationDelay: `${dot * 0.16}s` }} />
      ))}

      <div className="relative z-10 grid h-full gap-3 lg:grid-cols-[236px_1fr_264px]">
        <aside className="order-2 grid grid-cols-2 gap-3 lg:order-1 lg:block lg:space-y-3">
          <Panel className="col-span-2 lg:col-span-1">
            <p className="text-[10px] font-black uppercase tracking-[0.26em] text-yellow-300">Jogador</p>
            <div className="mt-3 flex items-center gap-3">
              <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${avatarGradient} text-3xl shadow-[0_0_30px_rgba(139,92,246,.35)]`}>{avatarEmoji}</div>
              <div className="min-w-0">
                <strong className="block truncate text-lg">{playerName}</strong>
                <p className="text-xs text-zinc-400">Nv. {stats.level} · {stats.currentLevelXp}/100 XP</p>
              </div>
            </div>
          </Panel>

          <Panel>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-500">Vitórias</p>
            <strong className="mt-1 block text-2xl">{stats.wins}</strong>
          </Panel>

          <Panel>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-500">Win rate</p>
            <strong className="mt-1 block text-2xl">{stats.winRate}%</strong>
          </Panel>

          <Panel className="col-span-2 border-yellow-300/15 bg-yellow-300/[0.07] lg:col-span-1">
            <p className="text-[10px] font-black uppercase tracking-[0.26em] text-yellow-300">Login diário</p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <div>
                <strong className="block text-2xl">🔥 {daily.streak}</strong>
                <p className="text-xs text-zinc-400">+{daily.todayReward} moedas hoje</p>
              </div>
              <button onClick={claim} className={`rounded-2xl px-4 py-3 text-sm font-black transition active:scale-[.97] ${daily.canClaim ? "bg-yellow-300 text-black shadow-[0_0_25px_rgba(250,204,21,.3)]" : "bg-white/10 text-white/45"}`}>{daily.canClaim ? "Pegar" : "OK"}</button>
            </div>
          </Panel>

          <Panel className="col-span-2 lg:col-span-1">
            <p className="text-[10px] font-black uppercase tracking-[0.26em] text-yellow-300">Código</p>
            <button onClick={clickRoomCode} className="mt-2 w-full rounded-2xl border border-yellow-300/20 bg-yellow-300/10 px-4 py-3 text-left transition active:scale-[.98]">
              <strong className="text-xl tracking-widest text-yellow-100">{roomCode}</strong>
              <p className="text-[11px] text-zinc-500">toque para copiar</p>
            </button>
          </Panel>
        </aside>

        <main className="relative order-1 min-h-[430px] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(124,58,237,.32),transparent_16rem),linear-gradient(180deg,rgba(255,255,255,.04),rgba(0,0,0,.4))] lg:order-2 lg:min-h-0">
          <div className="absolute left-1/2 top-5 z-20 -translate-x-1/2 text-center">
            <span className="rounded-full bg-yellow-300 px-4 py-1 text-[10px] font-black tracking-[0.18em] text-black shadow-[0_0_28px_rgba(250,204,21,.35)]">CLASH CARDS</span>
            <h2 className="mt-2 text-4xl font-black leading-none sm:text-5xl">Lobby</h2>
            <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-zinc-400">sala local · squad visual</p>
          </div>

          <div className="absolute left-1/2 top-[43%] z-20 -translate-x-1/2 -translate-y-1/2">
            <div className={`relative grid h-56 w-40 place-items-center rounded-[2.2rem] bg-gradient-to-br ${avatarGradient} text-7xl shadow-[0_35px_90px_rgba(0,0,0,.75),0_0_85px_rgba(139,92,246,.35)] ring-2 ring-white/15 sm:h-64 sm:w-44`}>
              <div className="absolute -inset-6 rounded-[3rem] border border-violet-300/10 blur-sm" />
              <div className="absolute inset-3 rounded-[1.8rem] border border-white/15" />
              <span className="drop-shadow-2xl">{avatarEmoji}</span>
              <div className="absolute -bottom-5 rounded-full bg-black/90 px-5 py-2 text-xs font-black ring-1 ring-white/10">{playerName}</div>
            </div>
          </div>

          <div className="absolute bottom-[104px] left-1/2 z-30 grid w-[min(760px,96%)] -translate-x-1/2 grid-cols-4 gap-2 sm:gap-3">
            {partySlots.map((member, index) => (
              <button key={`${member.name}-${index}`} onClick={() => index > 0 && onLobbyMessage(member.ready ? `${member.name} está pronto.` : "Slot reservado para multiplayer online.")} className={`rounded-[1.2rem] border px-2 py-3 text-center transition active:scale-[.97] ${index === 0 ? "border-yellow-300/50 bg-yellow-300/12" : member.ready ? "border-violet-300/30 bg-violet-400/10" : "border-dashed border-white/15 bg-black/45"}`}>
                <div className={`mx-auto grid h-12 w-12 place-items-center rounded-2xl ${index === 0 ? `bg-gradient-to-br ${avatarGradient}` : "bg-white/5"} text-2xl`}>{index === 0 ? avatarEmoji : member.emoji}</div>
                <strong className="mt-2 block truncate text-xs">{index === 0 ? "Você" : member.name}</strong>
                <p className="truncate text-[10px] text-zinc-500">{index === 0 ? "Líder" : member.status}</p>
              </button>
            ))}
          </div>

          <div className="absolute bottom-4 left-1/2 z-40 flex w-[min(720px,94%)] -translate-x-1/2 gap-3">
            <button onClick={startMatchmaking} className="flex-1 rounded-[1.5rem] bg-gradient-to-b from-yellow-200 to-yellow-500 px-6 py-4 text-xl font-black text-black shadow-[0_8px_0_#8a4d00,0_24px_60px_rgba(0,0,0,.58)] transition hover:brightness-110 active:translate-y-1 active:shadow-[0_4px_0_#8a4d00,0_18px_46px_rgba(0,0,0,.54)]">JOGAR</button>
            <button onClick={() => { playUiSound("click"); onLobbyMessage("Treino local selecionado."); }} className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] px-5 py-4 text-sm font-black text-white backdrop-blur-xl active:scale-[.98]">TREINO</button>
          </div>
        </main>

        <aside className="order-3 grid grid-cols-2 gap-3 lg:block lg:space-y-3">
          <Panel className="col-span-2 lg:col-span-1">
            <p className="text-[10px] font-black uppercase tracking-[0.26em] text-yellow-300">Modo</p>
            <div className="mt-3 grid gap-2">
              {gameIdentity.modes.map((mode) => (
                <button key={mode.id} onClick={() => { playUiSound("click"); onSelectMode(mode); }} className={`rounded-2xl border px-3 py-3 text-left transition active:scale-[.98] ${selectedMode.id === mode.id ? "border-yellow-300 bg-yellow-300/15" : "border-white/10 bg-white/[0.045]"}`}>
                  <strong className="block text-sm">{mode.title}</strong>
                  <p className="text-[11px] text-zinc-500">{mode.status}</p>
                </button>
              ))}
            </div>
          </Panel>

          <Panel>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-500">Selecionado</p>
            <strong className="mt-1 block text-xl">{selectedMode.title}</strong>
            <p className="mt-1 text-[11px] text-zinc-500">Clash Cards · local</p>
          </Panel>

          <Panel>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-500">Baú</p>
            <strong className="mt-1 block text-xl">🎁 {daily.nextChestWins === 0 ? "Pronto" : daily.nextChestWins}</strong>
          </Panel>

          <Panel className="col-span-2 lg:col-span-1">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-500">Status</p>
            <p className="mt-2 text-xs text-zinc-300">{lobbyMessage}</p>
          </Panel>
        </aside>
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
