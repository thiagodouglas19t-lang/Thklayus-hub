import { useState } from "react";
import { auras, masks, outfits, saveCharacter } from "../../lib/characterCosmetics";
import LobbyCharacter from "./LobbyCharacter";

type Props = {
  coins: number;
  avatarEmoji: string;
  playerName: string;
  isAdmin?: boolean;
  onMessage: (message: string) => void;
  onRefresh: () => void;
};

type Category = "outfit" | "mask" | "aura";

export default function SkinStore({ coins, avatarEmoji, playerName, isAdmin, onMessage, onRefresh }: Props) {
  const [category, setCategory] = useState<Category>("outfit");
  const items = category === "outfit" ? outfits : category === "mask" ? masks : auras;

  function equip(item: { id: string; name: string; price: number }) {
    if (!isAdmin && item.price > coins) {
      onMessage(`Moedas insuficientes para ${item.name}.`);
      return;
    }
    if (category === "outfit") saveCharacter({ outfit: item.id as never });
    if (category === "mask") saveCharacter({ mask: item.id as never });
    if (category === "aura") saveCharacter({ aura: item.id as never });
    onMessage(`${item.name} equipado.`);
    onRefresh();
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(168,85,247,.38),transparent_18rem),linear-gradient(180deg,#080012,#000)] p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.32em] text-yellow-300">Cofre / Loja</p>
        <h2 className="mt-1 text-3xl font-black">Skins do personagem</h2>
        <p className="mt-2 text-sm text-zinc-400">Equipe roupa, máscara e aura. Nada de pay-to-win.</p>
        <div className="mt-6 rounded-[1.8rem] border border-white/10 bg-black/40 p-5">
          <LobbyCharacter avatarEmoji={avatarEmoji} playerName={playerName} size="large" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            ["outfit", "Roupas"],
            ["mask", "Máscaras"],
            ["aura", "Auras"],
          ].map(([id, label]) => <button key={id} onClick={() => setCategory(id as Category)} className={`rounded-2xl px-3 py-3 text-xs font-black ${category === id ? "bg-yellow-300 text-black" : "bg-white/10 text-white"}`}>{label}</button>)}
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-yellow-300">Catálogo</p>
            <h3 className="text-2xl font-black">{category === "outfit" ? "Roupas" : category === "mask" ? "Máscaras" : "Auras"}</h3>
          </div>
          <span className="rounded-full border border-yellow-300/25 bg-yellow-300/10 px-4 py-2 text-sm font-black">🪙 {coins}</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => <button key={item.id} onClick={() => equip(item)} className="group rounded-[1.6rem] border border-white/10 bg-black/35 p-4 text-left transition hover:border-yellow-300/35 active:scale-[.98]">
            <div className="mb-3 grid h-24 place-items-center rounded-[1.2rem] border border-white/10 bg-[radial-gradient(circle,rgba(168,85,247,.18),rgba(0,0,0,.4))] text-4xl">
              {category === "outfit" ? "🧍" : category === "mask" ? "🎭" : "✨"}
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
