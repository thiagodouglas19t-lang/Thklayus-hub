type UpgradeCenterProps = {
  coins: number;
  skin: string;
  magnet: number;
  extraShield: number;
  onBuySkin: (skin: string, price: number) => void;
  onBuyMagnet: () => void;
  onBuyShield: () => void;
  onDailyReward: () => void;
  dailyClaimed: boolean;
};

const skins = [
  { id: "neon", name: "Neon Branco", price: 0, className: "from-white via-violet-100 to-violet-500" },
  { id: "shadow", name: "Shadow Roxo", price: 45, className: "from-violet-950 via-fuchsia-700 to-white" },
  { id: "ice", name: "Gelo Azul", price: 65, className: "from-cyan-200 via-blue-500 to-violet-900" },
  { id: "gold", name: "Ouro Preto", price: 90, className: "from-yellow-200 via-amber-500 to-black" },
];

export function getSkinClass(skin: string) {
  return skins.find((item) => item.id === skin)?.className || skins[0].className;
}

export default function UpgradeCenter({ coins, skin, magnet, extraShield, onBuySkin, onBuyMagnet, onBuyShield, onDailyReward, dailyClaimed }: UpgradeCenterProps) {
  return (
    <section className="pro-card rounded-3xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-violet-300">Loja / upgrades</p>
          <h3 className="mt-1 text-xl font-black text-white">Centro de evolução</h3>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-white">{coins} moedas</span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {skins.map((item) => (
          <button key={item.id} onClick={() => onBuySkin(item.id, item.price)} className={`rounded-2xl border p-3 text-left transition ${skin === item.id ? "border-violet-200 bg-violet-500/15" : "border-white/10 bg-black/30 hover:border-violet-300/40"}`}>
            <div className={`mb-3 h-10 rounded-xl bg-gradient-to-r ${item.className}`} />
            <strong className="block text-white">{item.name}</strong>
            <span className="text-xs text-zinc-400">{skin === item.id ? "equipada" : item.price === 0 ? "grátis" : `${item.price} moedas`}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <button onClick={onBuyMagnet} className="rounded-2xl border border-white/10 bg-black/30 p-3 text-left hover:border-violet-300/40">
          <strong className="block text-white">Ímã</strong>
          <span className="text-xs text-zinc-400">nível {magnet} · 35 moedas</span>
        </button>
        <button onClick={onBuyShield} className="rounded-2xl border border-white/10 bg-black/30 p-3 text-left hover:border-violet-300/40">
          <strong className="block text-white">Escudo inicial</strong>
          <span className="text-xs text-zinc-400">nível {extraShield} · 40 moedas</span>
        </button>
        <button onClick={onDailyReward} disabled={dailyClaimed} className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-3 text-left disabled:opacity-50">
          <strong className="block text-white">Recompensa diária</strong>
          <span className="text-xs text-emerald-100/80">{dailyClaimed ? "já coletada" : "+25 moedas"}</span>
        </button>
      </div>
    </section>
  );
}
