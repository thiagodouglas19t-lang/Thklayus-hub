import { useState } from "react";

type Props = {
  coins: number;
  avatarEmoji: string;
  playerName: string;
  isAdmin?: boolean;
  onMessage: (message: string) => void;
  onRefresh: () => void;
};

type Category = "avatar" | "frame" | "banner" | "title";
type ProfileItem = { id: string; name: string; rarity: string; price: number; preview: string; gradient?: string };

const profileItems: Record<Category, ProfileItem[]> = {
  avatar: [
    { id: "bolt", name: "Raio THK", rarity: "Livre", price: 0, preview: "⚡", gradient: "from-violet-600 to-cyan-300" },
    { id: "crown", name: "Coroa Clash", rarity: "Épico", price: 180, preview: "👑", gradient: "from-yellow-300 to-orange-500" },
    { id: "dragon", name: "Dragão Neon", rarity: "Lendário", price: 360, preview: "🐉", gradient: "from-emerald-300 to-violet-600" },
    { id: "joker", name: "Carta Caos", rarity: "Raro", price: 220, preview: "🃏", gradient: "from-fuchsia-500 to-yellow-300" },
  ],
  frame: [
    { id: "clean", name: "Moldura Clean", rarity: "Livre", price: 0, preview: "▢" },
    { id: "gold", name: "Moldura Ouro", rarity: "Épico", price: 240, preview: "◎" },
    { id: "neon", name: "Moldura Neon", rarity: "Raro", price: 190, preview: "◇" },
    { id: "champion", name: "Moldura Campeão", rarity: "Lendário", price: 420, preview: "✦" },
  ],
  banner: [
    { id: "sky", name: "Arena Céu", rarity: "Livre", price: 0, preview: "🌤️", gradient: "from-cyan-300 to-blue-500" },
    { id: "sunset", name: "Pôr do Sol", rarity: "Raro", price: 160, preview: "🌅", gradient: "from-yellow-300 to-fuchsia-500" },
    { id: "royal", name: "Royal Clash", rarity: "Épico", price: 280, preview: "🏆", gradient: "from-violet-600 to-yellow-300" },
    { id: "storm", name: "Tempestade", rarity: "Lendário", price: 390, preview: "🌩️", gradient: "from-slate-800 to-cyan-300" },
  ],
  title: [
    { id: "rookie", name: "Novato THK", rarity: "Livre", price: 0, preview: "NOVATO" },
    { id: "winner", name: "Vencedor", rarity: "Raro", price: 140, preview: "WINNER" },
    { id: "uno_master", name: "Mestre UNO", rarity: "Épico", price: 260, preview: "UNO MASTER" },
    { id: "legend", name: "Lenda da Mesa", rarity: "Lendário", price: 440, preview: "LEGEND" },
  ],
};

const categoryLabels: Record<Category, string> = {
  avatar: "Avatares",
  frame: "Molduras",
  banner: "Banners",
  title: "Títulos",
};

function saveProfilePart(category: Category, id: string) {
  localStorage.setItem(`thklayus-profile:${category}`, id);
}

export default function SkinStore({ coins, avatarEmoji, playerName, isAdmin, onMessage, onRefresh }: Props) {
  const [category, setCategory] = useState<Category>("avatar");
  const items = profileItems[category];

  function equip(item: ProfileItem) {
    if (!isAdmin && item.price > coins) {
      onMessage(`Moedas insuficientes para ${item.name}.`);
      return;
    }
    saveProfilePart(category, item.id);
    onMessage(`${item.name} equipado no perfil.`);
    onRefresh();
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/45 bg-[linear-gradient(180deg,#7dd3fc,#a78bfa_55%,#facc15)] p-5 text-slate-950 shadow-[0_24px_70px_rgba(15,23,42,.22)]">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/40 blur-3xl" />
        <p className="relative text-[10px] font-black uppercase tracking-[0.32em] text-violet-900">Perfil / Loja</p>
        <h2 className="relative mt-1 text-3xl font-black">Perfil personalizado</h2>
        <p className="relative mt-2 text-sm font-bold text-slate-700">Sem personagem 3D. Personalize avatar, moldura, banner e título.</p>

        <div className="relative mt-6 overflow-hidden rounded-[1.8rem] border border-white/60 bg-white/42 p-4 shadow-[0_18px_45px_rgba(15,23,42,.2)] backdrop-blur-xl">
          <div className="h-28 rounded-[1.4rem] bg-gradient-to-br from-cyan-300 via-violet-400 to-yellow-300" />
          <div className="-mt-10 flex items-end gap-3 px-3">
            <div className="grid h-24 w-24 place-items-center rounded-[1.6rem] border-[5px] border-white bg-gradient-to-br from-violet-600 to-cyan-300 text-5xl shadow-[0_0_40px_rgba(255,255,255,.55)]">{avatarEmoji}</div>
            <div className="pb-2">
              <p className="rounded-full bg-yellow-300 px-3 py-1 text-[10px] font-black tracking-[0.18em]">UNO MASTER</p>
              <h3 className="mt-2 text-2xl font-black">{playerName}</h3>
            </div>
          </div>
        </div>

        <div className="relative mt-4 grid grid-cols-4 gap-2">
          {(Object.keys(categoryLabels) as Category[]).map((id) => <button key={id} onClick={() => setCategory(id)} className={`rounded-2xl px-2 py-3 text-[11px] font-black ${category === id ? "bg-yellow-300 text-slate-950" : "bg-white/35 text-slate-800"}`}>{categoryLabels[id]}</button>)}
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-yellow-300">Catálogo</p>
            <h3 className="text-2xl font-black">{categoryLabels[category]}</h3>
          </div>
          <span className="rounded-full border border-yellow-300/25 bg-yellow-300/10 px-4 py-2 text-sm font-black">🪙 {coins}</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => <button key={item.id} onClick={() => equip(item)} className="group rounded-[1.6rem] border border-white/10 bg-black/35 p-4 text-left transition hover:border-yellow-300/35 active:scale-[.98]">
            <div className={`mb-3 grid h-24 place-items-center rounded-[1.2rem] border border-white/10 ${item.gradient ? `bg-gradient-to-br ${item.gradient}` : "bg-[radial-gradient(circle,rgba(168,85,247,.18),rgba(0,0,0,.4))]"} text-4xl font-black text-white`}>
              {item.preview}
            </div>
            <strong className="block text-lg">{item.name}</strong>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">{item.rarity}</p>
            <div className="mt-4 flex items-center justify-between gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black">{isAdmin ? "ADM" : item.price === 0 ? "FREE" : `🪙 ${item.price}`}</span>
              <span className="rounded-full bg-yellow-300 px-3 py-1 text-xs font-black text-black">Equipar</span>
            </div>
          </button>)}
        </div>
      </div>
    </section>
  );
}
