import { useState } from "react";
import { auras, masks, outfits, readCharacter, saveCharacter } from "../../lib/characterCosmetics";
import LobbyCharacter from "./LobbyCharacter";

type Props = {
  avatarEmoji: string;
  playerName: string;
  onMessage: (message: string) => void;
  onRefresh: () => void;
};

type Tab = "outfit" | "mask" | "aura" | "face";

export default function VaultScreen({ avatarEmoji, playerName, onMessage, onRefresh }: Props) {
  const [tab, setTab] = useState<Tab>("outfit");
  const [refresh, setRefresh] = useState(0);
  const character = readCharacter();

  function equip(type: Tab, id?: string) {
    if (type === "outfit" && id) saveCharacter({ outfit: id as never });
    if (type === "mask" && id) saveCharacter({ mask: id as never });
    if (type === "aura" && id) saveCharacter({ aura: id as never });
    if (type === "face") saveCharacter({ useAvatarFace: !character.useAvatarFace });
    setRefresh((value) => value + 1);
    onRefresh();
    onMessage("Cofre atualizado.");
  }

  const current = readCharacter();

  return (
    <section className="grid gap-4 lg:grid-cols-[360px_1fr]" key={refresh}>
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(14,165,233,.22),transparent_18rem),linear-gradient(180deg,#07111c,#000)] p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.34em] text-cyan-200">Vault</p>
        <h2 className="text-3xl font-black">Cofre</h2>
        <p className="mt-2 text-sm text-zinc-400">Aqui você equipa o visual do personagem do lobby.</p>
        <div className="mt-5 rounded-[1.8rem] border border-white/10 bg-black/45 p-5">
          <LobbyCharacter avatarEmoji={avatarEmoji} playerName={playerName} size="large" />
        </div>
        <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-black/35 p-4 text-xs text-zinc-300">
          <p><strong>Roupa:</strong> {outfits.find((item) => item.id === current.outfit)?.name}</p>
          <p><strong>Máscara:</strong> {masks.find((item) => item.id === current.mask)?.name}</p>
          <p><strong>Aura:</strong> {auras.find((item) => item.id === current.aura)?.name}</p>
          <p><strong>Rosto:</strong> {current.useAvatarFace ? "Avatar comprado" : "Rosto oculto"}</p>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
        <div className="mb-4 grid grid-cols-4 gap-2">
          {[
            ["outfit", "Roupas"],
            ["mask", "Máscaras"],
            ["aura", "Auras"],
            ["face", "Rosto"],
          ].map(([id, label]) => <button key={id} onClick={() => setTab(id as Tab)} className={`rounded-2xl px-2 py-3 text-xs font-black ${tab === id ? "bg-yellow-300 text-black" : "bg-white/10 text-white"}`}>{label}</button>)}
        </div>

        {tab === "outfit" && <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{outfits.map((item) => <button key={item.id} onClick={() => equip("outfit", item.id)} className={`rounded-[1.6rem] border p-4 text-left ${current.outfit === item.id ? "border-yellow-300 bg-yellow-300/15" : "border-white/10 bg-black/35"}`}><div className={`mb-3 h-24 rounded-[1.2rem] bg-gradient-to-br ${item.accent}`} /><strong>{item.name}</strong><p className="text-xs text-zinc-500">{item.rarity}</p></button>)}</div>}
        {tab === "mask" && <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{masks.map((item) => <button key={item.id} onClick={() => equip("mask", item.id)} className={`rounded-[1.6rem] border p-4 text-left ${current.mask === item.id ? "border-yellow-300 bg-yellow-300/15" : "border-white/10 bg-black/35"}`}><div className="mb-3 grid h-24 place-items-center rounded-[1.2rem] bg-white/10 text-4xl">🎭</div><strong>{item.name}</strong><p className="text-xs text-zinc-500">{item.rarity}</p></button>)}</div>}
        {tab === "aura" && <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{auras.map((item) => <button key={item.id} onClick={() => equip("aura", item.id)} className={`rounded-[1.6rem] border p-4 text-left ${current.aura === item.id ? "border-yellow-300 bg-yellow-300/15" : "border-white/10 bg-black/35"}`}><div className="mb-3 h-24 rounded-[1.2rem]" style={{ background: item.color || "rgba(255,255,255,.08)" }} /><strong>{item.name}</strong><p className="text-xs text-zinc-500">{item.rarity}</p></button>)}</div>}
        {tab === "face" && <div className="rounded-[1.6rem] border border-white/10 bg-black/35 p-5"><h3 className="text-2xl font-black">Rosto do personagem</h3><p className="mt-2 text-sm text-zinc-400">Escolha se o personagem usa o avatar comprado como rosto ou fica oculto pela máscara.</p><button onClick={() => equip("face")} className="mt-5 rounded-2xl bg-yellow-300 px-5 py-3 font-black text-black">Alternar rosto/avatar</button></div>}
      </div>
    </section>
  );
}
