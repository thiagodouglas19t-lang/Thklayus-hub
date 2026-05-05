export type AvatarItem = {
  id: string;
  name: string;
  rarity: string;
  price: number;
  emoji: string;
  gradient: string;
};

export const avatarItems: AvatarItem[] = [
  { id: "shadow", name: "Shadow Roxo", rarity: "Raro", price: 120, emoji: "🌑", gradient: "from-violet-900 via-fuchsia-700 to-black" },
  { id: "samurai", name: "Samurai Neon", rarity: "Épico", price: 220, emoji: "⚔️", gradient: "from-cyan-400 via-blue-700 to-black" },
  { id: "dragon", name: "Dragão Verde", rarity: "Épico", price: 260, emoji: "🐉", gradient: "from-emerald-400 via-green-800 to-black" },
  { id: "king", name: "Rei Dourado", rarity: "Lendário", price: 420, emoji: "👑", gradient: "from-yellow-200 via-amber-500 to-black" },
  { id: "glitch", name: "Fantasma Glitch", rarity: "Raro", price: 180, emoji: "👾", gradient: "from-zinc-200 via-purple-600 to-black" },
  { id: "kairos", name: "Kairós Prime", rarity: "Lendário", price: 500, emoji: "⏳", gradient: "from-white via-violet-400 to-black" },
];

export function getAvatarById(id?: string | null) {
  return avatarItems.find((avatar) => avatar.id === id) || null;
}
