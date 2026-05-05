type GameEnhancementsProps = {
  coins: number;
  xp: number;
  wins: number;
  losses: number;
  combo: number;
  stackMode: boolean;
  soundOn: boolean;
  onToggleStack: () => void;
  onToggleSound: () => void;
  onClaimDaily: () => void;
  dailyClaimed: boolean;
};

const achievements = [
  { title: "Primeira vitória", check: (wins: number, _losses: number, _combo: number) => wins >= 1 },
  { title: "Combo 5x", check: (_wins: number, _losses: number, combo: number) => combo >= 5 },
  { title: "Persistente", check: (_wins: number, losses: number, _combo: number) => losses >= 3 },
  { title: "Invicto", check: (wins: number, losses: number, _combo: number) => wins >= 3 && losses === 0 },
];

export default function GameEnhancements({ coins, xp, wins, losses, combo, stackMode, soundOn, onToggleStack, onToggleSound, onClaimDaily, dailyClaimed }: GameEnhancementsProps) {
  const total = Math.max(1, wins + losses);
  const winRate = Math.round((wins / total) * 100);

  return (
    <section className="pro-card rounded-3xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-violet-300">ABC Pack</p>
          <h3 className="mt-1 text-xl font-black text-white">Regras, efeitos e retenção</h3>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">WR {winRate}%</span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button onClick={onToggleStack} className={`rounded-2xl border p-3 text-left ${stackMode ? "border-emerald-300/40 bg-emerald-400/10" : "border-white/10 bg-black/30"}`}>
          <strong className="block text-white">Stack +2/+4</strong>
          <span className="text-xs text-zinc-400">{stackMode ? "ativado" : "desativado"}</span>
        </button>
        <button onClick={onToggleSound} className={`rounded-2xl border p-3 text-left ${soundOn ? "border-violet-300/40 bg-violet-500/10" : "border-white/10 bg-black/30"}`}>
          <strong className="block text-white">Som e feedback</strong>
          <span className="text-xs text-zinc-400">{soundOn ? "ligado" : "mudo"}</span>
        </button>
      </div>

      <button onClick={onClaimDaily} disabled={dailyClaimed} className="mt-3 w-full rounded-2xl border border-yellow-200/20 bg-yellow-400/10 p-3 text-left disabled:opacity-50">
        <strong className="block text-white">Recompensa diária</strong>
        <span className="text-xs text-yellow-100/80">{dailyClaimed ? "coletada hoje" : "+30 moedas e +25 XP"}</span>
      </button>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-2xl bg-white/[0.04] p-3"><strong className="block text-white">{coins}</strong><span className="text-xs text-zinc-500">moedas</span></div>
        <div className="rounded-2xl bg-white/[0.04] p-3"><strong className="block text-white">{xp}</strong><span className="text-xs text-zinc-500">xp</span></div>
        <div className="rounded-2xl bg-white/[0.04] p-3"><strong className="block text-white">{combo}x</strong><span className="text-xs text-zinc-500">combo</span></div>
      </div>

      <div className="mt-4 space-y-2">
        <h4 className="font-black text-white">Conquistas</h4>
        {achievements.map((item) => {
          const done = item.check(wins, losses, combo);
          return (
            <div key={item.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-3 py-2">
              <span className="text-sm text-zinc-300">{item.title}</span>
              <span className={`rounded-full px-2 py-1 text-xs font-bold ${done ? "bg-emerald-400/15 text-emerald-200" : "bg-white/10 text-zinc-400"}`}>{done ? "ok" : "pendente"}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
