export type OutfitId = "none" | "basic" | "neon" | "armor";
export type MaskId = "none" | "visor" | "skull" | "hood";
export type AuraId = "none" | "purple" | "blue" | "shadow";
export type CharacterView = "front" | "back" | "side" | "top";

export const characterStorage = "thklayus-character";
export const characterAssetBase = "/assets/characters";

export type SkinItem<T extends string> = {
  id: T;
  name: string;
  rarity: "Livre" | "Comum" | "Raro" | "Épico" | "Lendário";
  price: number;
  accent?: string;
  glow?: string;
  color?: string;
  assets?: Partial<Record<CharacterView, string>>;
};

export const mannequinAssets: Partial<Record<CharacterView, string>> = {
  front: `${characterAssetBase}/mannequin-front.png`,
  back: `${characterAssetBase}/mannequin-back.png`,
  side: `${characterAssetBase}/mannequin-side.png`,
  top: `${characterAssetBase}/mannequin-top.png`,
};

export const outfits: SkinItem<OutfitId>[] = [
  { id: "none", name: "Manequim Branco", rarity: "Livre", price: 0, accent: "from-white via-zinc-200 to-zinc-500", glow: "rgba(255,255,255,.18)" },
  { id: "basic", name: "Roupa Básica", rarity: "Comum", price: 0, accent: "from-zinc-800 via-zinc-950 to-black", glow: "rgba(255,255,255,.12)", assets: { front: `${characterAssetBase}/outfit-basic-front.png`, back: `${characterAssetBase}/outfit-basic-back.png`, side: `${characterAssetBase}/outfit-basic-side.png`, top: `${characterAssetBase}/outfit-basic-top.png` } },
  { id: "neon", name: "Jaqueta Neon", rarity: "Épico", price: 240, accent: "from-violet-500 via-black to-cyan-500", glow: "rgba(168,85,247,.45)", assets: { front: `${characterAssetBase}/outfit-neon-front.png`, back: `${characterAssetBase}/outfit-neon-back.png`, side: `${characterAssetBase}/outfit-neon-side.png`, top: `${characterAssetBase}/outfit-neon-top.png` } },
  { id: "armor", name: "Armadura Leve", rarity: "Lendário", price: 420, accent: "from-slate-200 via-slate-700 to-cyan-500", glow: "rgba(34,211,238,.38)", assets: { front: `${characterAssetBase}/outfit-armor-front.png`, back: `${characterAssetBase}/outfit-armor-back.png`, side: `${characterAssetBase}/outfit-armor-side.png`, top: `${characterAssetBase}/outfit-armor-top.png` } },
];

export const masks: SkinItem<MaskId>[] = [
  { id: "none", name: "Sem Máscara", rarity: "Livre", price: 0 },
  { id: "visor", name: "Capacete Neon", rarity: "Épico", price: 180, assets: { front: `${characterAssetBase}/mask-visor.png` } },
  { id: "skull", name: "Máscara Skull", rarity: "Raro", price: 150, assets: { front: `${characterAssetBase}/mask-skull.png` } },
  { id: "hood", name: "Capuz Sombrio", rarity: "Épico", price: 220, assets: { front: `${characterAssetBase}/mask-hood.png` } },
];

export const auras: SkinItem<AuraId>[] = [
  { id: "none", name: "Sem Aura", rarity: "Livre", price: 0 },
  { id: "purple", name: "Aura Roxa", rarity: "Épico", price: 220, color: "rgba(168,85,247,.5)", assets: { front: `${characterAssetBase}/aura-purple.png` } },
  { id: "blue", name: "Aura Azul", rarity: "Raro", price: 180, color: "rgba(14,165,233,.45)", assets: { front: `${characterAssetBase}/aura-blue.png` } },
  { id: "shadow", name: "Fumaça Sombria", rarity: "Lendário", price: 360, color: "rgba(24,24,27,.75)", assets: { front: `${characterAssetBase}/aura-shadow.png` } },
];

export function readCharacter() {
  return {
    outfit: (localStorage.getItem(`${characterStorage}:outfit`) || "none") as OutfitId,
    mask: (localStorage.getItem(`${characterStorage}:mask`) || "none") as MaskId,
    aura: (localStorage.getItem(`${characterStorage}:aura`) || "none") as AuraId,
    view: (localStorage.getItem(`${characterStorage}:view`) || "front") as CharacterView,
    useAvatarFace: localStorage.getItem(`${characterStorage}:useAvatarFace`) === "true",
  };
}

export function saveCharacter(next: Partial<ReturnType<typeof readCharacter>>) {
  if (next.outfit) localStorage.setItem(`${characterStorage}:outfit`, next.outfit);
  if (next.mask) localStorage.setItem(`${characterStorage}:mask`, next.mask);
  if (next.aura) localStorage.setItem(`${characterStorage}:aura`, next.aura);
  if (next.view) localStorage.setItem(`${characterStorage}:view`, next.view);
  if (typeof next.useAvatarFace === "boolean") localStorage.setItem(`${characterStorage}:useAvatarFace`, String(next.useAvatarFace));
}
