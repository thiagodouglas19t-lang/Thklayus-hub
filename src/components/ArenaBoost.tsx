type ArenaBoostProps = {
  level: number;
  xp: number;
  coins: number;
  wins: number;
  losses: number;
  combo: number;
  deckCount: number;
  handCount: number;
  playableCount: number;
  started: boolean;
};

const missions = [
  { title: "Primeira partida", goal: "Inicie uma rodada", reward: "+10 XP" },
  { title: "Mão certeira", goal: "Jogue 3 cartas em sequência", reward: "+25 moedas" },
  { title: "Caçador de bots", goal: "Vença uma partida", reward: "+70 XP" },
  { title: "Controle de mesa", goal: "Use bloqueio, reverse ou +2", reward: "+15 XP" },
];

function StatCard({ label, value, hint }: { label: string; value: string | number; hint: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/30">
      <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{label}</p>
      <strong className="mt-2 block text-2xl text-white">{value}</strong>
      <span className="text-xs text-zinc-400">{hint}</span>
    </div>
  );
}

export default function ArenaBoost({ level, xp, coins, wins, losses, combo, deckCount, handCount, playableCount, started }: ArenaBoostProps) {
  const total = wins + losses;
  const winRate = total ? Math.round((wins / total) * 100) : 0;
  const nextLevelProgress = xp % 100;
  const danger = started && playableCount === 0;
  const chartBars = [
    { label: "Vitórias", value: wins, max: Math.max(wins, losses, 1) },
    { label: "Derrotas", value: losses, max: Math.max(wins, losses, 1) },
    { label: "Combo", value: combo, max: Math.max(combo, 5) },
    { label: "Cartas", value: handCount, max: Math.max(handCount, 10) },
  ];

  return (
    <aside className="space-y-4">
      <section className="pro-card rounded-3xl p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-violet-300">Painel Arena</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-white">Seu progresso</h2>
          </div>
          <div className="rounded-2xl border border-violet-300/30 bg-violet-500/10 px-4 py-2 text-right">
            <p className="text-xs text-violet-200">Nível</p>
            <strong className="text-2xl text-white">{level}</strong>
          </div>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-white" style={{ width: `${nextLevelProgress}%` }} />
        </div>
        <p className="mt-2 text-sm text-zinc-400">{nextLevelProgress}/100 XP para o próximo nível</p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <StatCard label="Moedas" value={coins} hint="use em upgrades futuros" />
        <StatCard label="Win rate" value={`${winRate}%`} hint={`${wins}V / ${losses}D`} />
        <StatCard label="Deck" value={deckCount} hint="cartas restantes" />
        <StatCard label="Jogáveis" value={playableCount} hint={danger ? "compre uma carta" : "opções agora"} />
      </section>

      <section className="pro-card rounded-3xl p-5">
        <h3 className="text-lg font-bold text-white">Gráfico rápido</h3>
        <div className="mt-4 space-y-3">
          {chartBars.map((bar) => (
            <div key={bar.label}>
              <div className="mb-1 flex justify-between text-xs text-zinc-400">
                <span>{bar.label}</span>
                <span>{bar.value}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-300" style={{ width: `${Math.min(100, (bar.value / bar.max) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pro-card rounded-3xl p-5">
        <h3 className="text-lg font-bold text-white">Missões</h3>
        <div className="mt-4 space-y-3">
          {missions.map((mission, index) => (
            <div key={mission.title} className="rounded-2xl border border-white/10 bg-black/30 p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{index + 1}. {mission.title}</p>
                  <p className="text-sm text-zinc-400">{mission.goal}</p>
                </div>
                <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs text-violet-200">{mission.reward}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-emerald-300/20 bg-emerald-500/10 p-5">
        <h3 className="text-lg font-bold text-white">Mecânica nova</h3>
        <p className="mt-2 text-sm text-emerald-100/80">
          Combo alto aumenta recompensa. Quanto mais cartas você joga sem comprar, mais moedas e XP ganha.
        </p>
      </section>
    </aside>
  );
}
