import { auras, masks, outfits, readCharacter } from "../../lib/characterCosmetics";

type Props = {
  avatarEmoji: string;
  playerName: string;
  size?: "normal" | "large";
};

export default function LobbyCharacter({ avatarEmoji, playerName, size = "normal" }: Props) {
  const character = readCharacter();
  const outfit = outfits.find((item) => item.id === character.outfit) || outfits[0];
  const mask = masks.find((item) => item.id === character.mask) || masks[0];
  const aura = auras.find((item) => item.id === character.aura) || auras[0];
  const scale = size === "large" ? "h-[330px] w-[210px]" : "h-[280px] w-[178px]";

  return (
    <div className={`relative mx-auto ${scale}`} aria-label={`${playerName} character`}>
      {aura.id !== "none" && <div className="absolute left-1/2 top-[54%] h-[86%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ background: aura.color || "rgba(168,85,247,.35)" }} />}
      <div className="absolute bottom-0 left-1/2 h-12 w-44 -translate-x-1/2 rounded-[50%] bg-black/65 shadow-[0_0_55px_rgba(34,211,238,.25)] ring-1 ring-cyan-200/15" />

      <div className="absolute left-1/2 top-3 h-16 w-14 -translate-x-1/2 rounded-[45%] bg-gradient-to-br from-zinc-100 via-zinc-300 to-zinc-500 shadow-[inset_-8px_-10px_16px_rgba(0,0,0,.22)]" />
      {character.useAvatarFace && <div className="absolute left-1/2 top-7 z-20 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full bg-black/80 text-lg ring-2 ring-white/15">{avatarEmoji}</div>}
      {mask.id !== "none" && <div className={`absolute left-1/2 top-6 z-30 h-10 w-12 -translate-x-1/2 ${mask.id === "hood" ? "rounded-t-full bg-black" : mask.id === "skull" ? "rounded-xl bg-zinc-100" : "rounded-2xl bg-black"} shadow-[0_0_24px_rgba(168,85,247,.35)]`}>{mask.id === "visor" && <span className="absolute left-2 top-4 h-2 w-8 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,.8)]" />}{mask.id === "skull" && <><span className="absolute left-2 top-3 h-2 w-2 rounded-full bg-black" /><span className="absolute right-2 top-3 h-2 w-2 rounded-full bg-black" /></>}</div>}

      <div className={`absolute left-1/2 top-[72px] h-32 w-24 -translate-x-1/2 rounded-[28px] bg-gradient-to-b ${outfit.accent} shadow-[inset_0_0_18px_rgba(255,255,255,.12),0_0_32px_${outfit.glow}] ring-1 ring-white/15`} />
      <div className="absolute left-[34px] top-[86px] h-30 w-8 rotate-[14deg] rounded-full bg-gradient-to-b from-zinc-300 to-zinc-700" />
      <div className="absolute right-[34px] top-[86px] h-30 w-8 -rotate-[14deg] rounded-full bg-gradient-to-b from-zinc-300 to-zinc-700" />
      <div className={`absolute left-1/2 top-[162px] h-24 w-9 -translate-x-[32px] rotate-[3deg] rounded-full bg-gradient-to-b ${outfit.accent} ring-1 ring-white/10`} />
      <div className={`absolute left-1/2 top-[162px] h-24 w-9 translate-x-[2px] -rotate-[3deg] rounded-full bg-gradient-to-b ${outfit.accent} ring-1 ring-white/10`} />
      <div className="absolute left-1/2 top-[250px] h-7 w-12 -translate-x-[38px] rounded-xl bg-zinc-100 shadow-[0_8px_18px_rgba(0,0,0,.35)]" />
      <div className="absolute left-1/2 top-[250px] h-7 w-12 -translate-x-[-2px] rounded-xl bg-zinc-100 shadow-[0_8px_18px_rgba(0,0,0,.35)]" />

      {outfit.id === "neon" && <><span className="absolute left-[66px] top-[96px] h-24 w-1 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(168,85,247,.9)]" /><span className="absolute right-[66px] top-[96px] h-24 w-1 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,.9)]" /><span className="absolute bottom-8 left-1/2 h-2 w-24 -translate-x-1/2 rounded-full bg-violet-500/70 blur-sm" /></>}
      {outfit.id === "armor" && <><span className="absolute left-1/2 top-[94px] h-16 w-28 -translate-x-1/2 rounded-2xl border border-cyan-200/35 bg-white/10" /><span className="absolute left-1/2 top-[112px] h-6 w-6 -translate-x-1/2 rotate-45 rounded bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,.85)]" /></>}

      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 rounded-full bg-black/90 px-5 py-2 text-xs font-black ring-1 ring-white/10">{playerName}</div>
    </div>
  );
}
