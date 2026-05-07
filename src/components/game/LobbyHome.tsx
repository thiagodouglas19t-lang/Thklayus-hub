import { gameIdentity } from "../../lib/gameIdentity";
import { partySlots } from "../../lib/cosmetics";

type Mode = (typeof gameIdentity.modes)[number];
type Avatar = { id: string; name: string; emoji: string; gradient: string; rarity: string; price: number };

type LobbyHomeProps = {
  playerName: string;
  equipped?: Avatar;
  stats: {
    coins: number;
    wins: number;
    winRate: number;
    level: number;
    currentLevelXp: number;
  };
  daily: {
    streak: number;
    todayReward: number;
    canClaim: boolean;
    nextChestWins: number;
  };
  roomCode: string;
  lobbyMessage: string;
  selectedMode: Mode;
  onPlay: () => void;
  onClaimDaily: () => void;
  onCopyRoomCode: () => void;
  onSelectMode: (mode: Mode) => void;
  onLobbyMessage: (message: string) => void;
};

function MiniStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/35 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
      <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">{label}</p>
      <strong className="mt-2 block text-2xl text-white">{value}</strong>
    </div>
  );
}

export default function LobbyHome({ playerName, equipped, stats, daily, roomCode, lobbyMessage, selectedMode, onPlay, onClaimDaily, onCopyRoomCode, onSelectMode, onLobbyMessage }: LobbyHomeProps) {
  const avatarEmoji = equipped?.emoji || "⚡";
  const avatarGradient = equipped?.gradient || "from-violet-700 via-fuchsia-600 to-black";

  return (
    <section className="relative min-h-[720px] overflow-hidden rounded-[2.8rem] border border-white/10 bg-[radial-gradient(circle_at_50%_12%,rgba(139,92,246,.5),transparent_25rem),radial-gradient(circle_at_50%_78%,rgba(250,204,21,.14),transparent_22rem),linear-gradient(180deg,#090014,#000)] p-4 shadow-[0_35px_120px_rgba(0,0,0,.8)] sm:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />
      <div className="pointer-events-none absolute left-1/2 top-[49%] h-64 w-[74%] -translate-x-1/2 rounded-[50%] bg-violet-500/16 blur-3xl" />
      <div className="pointer-events-none absolute bottom-24 left-1/2 h-28 w-[62%] -translate-x-1/2 rounded-[50%] border border-violet-300/20 bg-black/65 shadow-[0_0_90px_rgba(139,92,246,.25)]" />

      <div className="relative z-10 grid h-full gap-5 lg:grid-cols-[0.72fr_1.42fr_0.78fr]">
        <aside className="space-y-4">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-yellow-300">Perfil</p>
            <div className="mt-4 flex items-center gap-3">
              <div className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${avatarGradient} text-3xl shadow-[0_0_35px_rgba(139,92,246,.35)]`}>
                {avatarEmoji}
              </div>
              <div className="min-w-0">
                <strong className="block truncate text-xl">{playerName}</strong>
                <p className="text-sm text-zinc-400">Nv. {stats.level} · {stats.currentLevelXp}/100 XP</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-yellow-300/15 bg-yellow-300/[0.07] p-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-yellow-300">Daily</p>
            <strong className="mt-3 block text-3xl">🔥 {daily.streak} dias</strong>
            <p className="mt-1 text-sm text-zinc-400">Hoje: +{daily.todayReward} moedas</p>
            <button onClick={onClaimDaily} className={`mt-4 w-full rounded-2xl px-4 py-3 font-black transition active:scale-[.98] ${daily.canClaim ? "bg-yellow-300 text-black shadow-[0_0_35px_rgba(250,204,21,.35)]" : "bg-white/10 text-white/50"}`}>
              {daily.canClaim ? "Coletar recompensa" : "Já coletado"}
            </button>
            <p className="mt-3 text-xs text-zinc-500">{lobbyMessage}</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-yellow-300">Sala</p>
            <button onClick={onCopyRoomCode} className="mt-3 w-full rounded-2xl border border-yellow-300/20 bg-yellow-300/10 p-4 text-left transition hover:bg-yellow-300/15 active:scale-[.99]">
              <p className="text-xs text-zinc-400">Código privado</p>
              <strong className="text-2xl tracking-widest text-yellow-100">{roomCode}</strong>
            </button>
          </div>
        </aside>

        <section className="relative min-h-[580px]">
          <div className="absolute left-1/2 top-5 z-10 -translate-x-1/2 text-center">
            <span className="rounded-full bg-yellow-300 px-4 py-1 text-xs font-black text-black shadow-[0_0_30px_rgba(250,204,21,.35)]">CLASH CARDS</span>
            <h2 className="mt-3 text-5xl font-black leading-none sm:text-6xl">Arena Lobby</h2>
            <p className="mt-2 text-xs uppercase tracking-[0.28em] text-zinc-400">{gameIdentity.version}</p>
          </div>

          <div className="absolute left-1/2 top-[45%] z-20 -translate-x-1/2 -translate-y-1/2">
            <div className={`relative grid h-80 w-52 place-items-center rounded-[2.6rem] bg-gradient-to-br ${avatarGradient} text-8xl shadow-[0_40px_100px_rgba(0,0,0,.75),0_0_95px_rgba(139,92,246,.34)] ring-2 ring-white/15`}>
              <div className="absolute inset-3 rounded-[2.1rem] border border-white/15" />
              <div className="absolute -inset-5 rounded-[3rem] border border-violet-300/10 blur-sm" />
              <span className="drop-shadow-2xl">{avatarEmoji}</span>
              <div className="absolute -bottom-6 rounded-full bg-black/85 px-5 py-2 text-sm font-black ring-1 ring-white/10">{playerName}</div>
            </div>
          </div>

          <div className="absolute bottom-28 left-1/2 z-30 grid w-full max-w-3xl -translate-x-1/2 grid-cols-4 gap-3 px-1">
            {partySlots.map((member, index) => (
              <button key={`${member.name}-${index}`} onClick={() => index > 0 && onLobbyMessage(member.ready ? `${member.name} já está pronto.` : "Convite real entra na fase online.")} className={`rounded-[1.55rem] border p-3 text-center transition active:scale-[.98] ${index === 0 ? "border-yellow-300/50 bg-yellow-300/12" : member.ready ? "border-violet-300/30 bg-violet-400/10" : "border-dashed border-white/15 bg-black/45 hover:border-yellow-300/35"}`}>
                <div className={`mx-auto grid h-16 w-16 place-items-center rounded-2xl ${index === 0 ? `bg-gradient-to-br ${avatarGradient}` : "bg-white/5"} text-3xl`}>
                  {index === 0 ? avatarEmoji : member.emoji}
                </div>
                <strong className="mt-2 block truncate text-sm">{index === 0 ? "Você" : member.name}</strong>
                <p className="text-[11px] text-zinc-400">{index === 0 ? "Pronto" : member.status}</p>
              </button>
            ))}
          </div>

          <button onClick={onPlay} className="absolute bottom-4 left-1/2 z-40 w-[min(460px,88vw)] -translate-x-1/2 rounded-[1.8rem] bg-gradient-to-b from-yellow-200 to-yellow-500 px-8 py-5 text-2xl font-black text-black shadow-[0_10px_0_#8a4d00,0_32px_78px_rgba(0,0,0,.65)] transition hover:brightness-110 active:translate-y-1 active:shadow-[0_5px_0_#8a4d00,0_22px_55px_rgba(0,0,0,.6)]">
            JOGAR AGORA
          </button>
        </section>

        <aside className="space-y-4">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-yellow-300">Modo</p>
            <div className="mt-4 grid gap-2">
              {gameIdentity.modes.map((mode) => (
                <button key={mode.id} onClick={() => onSelectMode(mode)} className={`rounded-2xl border p-4 text-left transition active:scale-[.99] ${selectedMode.id === mode.id ? "border-yellow-300 bg-yellow-300/15 shadow-[0_0_30px_rgba(250,204,21,.12)]" : "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"}`}>
                  <strong>{mode.title}</strong>
                  <p className="text-xs text-zinc-400">{mode.status}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-violet-300/15 bg-violet-400/[0.07] p-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-yellow-300">Selecionado</p>
            <strong className="mt-2 block text-3xl">{selectedMode.title}</strong>
            <p className="mt-2 text-sm text-zinc-400">Clash Cards · local</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-yellow-300">Baú grátis</p>
            <strong className="mt-2 block text-3xl">🎁 {daily.nextChestWins === 0 ? "Pronto" : `${daily.nextChestWins} vitórias`}</strong>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <MiniStat label="Vitórias" value={stats.wins} />
            <MiniStat label="Win rate" value={`${stats.winRate}%`} />
          </div>
        </aside>
      </div>
    </section>
  );
}
