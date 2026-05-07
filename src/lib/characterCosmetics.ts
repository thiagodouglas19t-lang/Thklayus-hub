export type OutfitId = "basic" | "neon" | "armor";
export type MaskId = "none" | "visor" | "skull" | "hood";
export type AuraId = "none" | "purple" | "blue" | "shadow";

export const characterStorage = "thklayus-character";

export const outfits = [
  { id: "basic" as OutfitId, name: "Roupa Básica", rarity: "Comum", price: 0, accent: "from-zinc-700 via-zinc-950 to-black", glow: "rgba(255,255,255,.12)" },
  { id: "neon" as OutfitId, name: "Jaqueta Neon", rarity: "Épico", price: 240, accent: "from-violet-500 via-black to-cyan-500", glow: "rgba(168,85,247,.45)" },
  { id: "armor" as OutfitId, name: "Armadura Leve", rarity: "Lendário", price: 420, accent: "from-slate-200 via-slate-700 to-cyan-500", glow: "rgba(34,211,238,.38)" },
];

export const masks = [
  { id: "none" as MaskId, name: "Sem Máscara", rarity: "Livre", price: 0 },
  { id: "visor" as MaskId, name: "Capacete Neon", rarity: "Épico", price: 180 },
  { id: "skull" as MaskId, name: "Máscara Skull", rarity: "Raro", price: 150 },
  { id: "hood" as MaskId, name: "Capuz Sombrio", rarity: "Épico", price: 220 },
];

export const auras = [
  { id: "none" as AuraId, name: "Sem Aura", rarity: "Livre", price: 0 },
  { id: "purple" as AuraId, name: "Aura Roxa", rarity: "Épico", price: 220, color: "rgba(168,85,247,.5)" },
  { id: "blue" as AuraId, name: "Aura Azul", rarity: "Raro", price: 180, color: "rgba(14,165,233,.45)" },
  { id: "shadow" as AuraId, name: "Fumaça Sombria", rarity: "Lendário", price: 360, color: "rgba(24,24,27,.75)" },
];

export function readCharacter() {
  return {
    outfit: (localStorage.getItem(`${characterStorage}:outfit`) || "neon") as OutfitId,
    mask: (localStorage.getItem(`${characterStorage}:mask`) || "visor") as MaskId,
    aura: (localStorage.getItem(`${characterStorage}:aura`) || "purple") as AuraId,
    useAvatarFace: localStorage.getItem(`${characterStorage}:useAvatarFace`) !== "false",
  };
}

export function saveCharacter(next: Partial<ReturnType<typeof readCharacter>>) {
  if (next.outfit) localStorage.setItem(`${characterStorage}:outfit`, next.outfit);
  if (next.mask) localStorage.setItem(`${characterStorage}:mask`, next.mask);
  if (next.aura) localStorage.setItem(`${characterStorage}:aura`, next.aura);
  if (typeof next.useAvatarFace === "boolean") localStorage.setItem(`${characterStorage}:useAvatarFace`, String(next.useAvatarFace));
}
