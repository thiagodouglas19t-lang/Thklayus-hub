import { supabase, supabaseConfigOk } from "./supabase";

const storage = "thklayus-classic-clash";

export type AvatarItem = {
  id: string;
  name: string;
  rarity: string;
  price: number;
  emoji: string;
  gradient: string;
};

export type GameProfile = {
  id?: string;
  username?: string;
  coins: number;
  xp: number;
  wins: number;
  losses: number;
  equipped_avatar_id?: string | null;
};

export function readLocalNumber(key: string) {
  return Number(localStorage.getItem(`${storage}:${key}`) || 0);
}

export function writeLocalNumber(key: string, value: number) {
  localStorage.setItem(`${storage}:${key}`, String(value));
}

export function readLocalText(key: string, fallback = "") {
  return localStorage.getItem(`${storage}:${key}`) || fallback;
}

export function writeLocalText(key: string, value: string) {
  localStorage.setItem(`${storage}:${key}`, value);
}

export async function getCurrentUserId() {
  if (!supabaseConfigOk) return null;
  const { data } = await supabase.auth.getUser();
  return data.user?.id || null;
}

export async function loadProfile(): Promise<GameProfile> {
  const fallback = {
    coins: readLocalNumber("coins"),
    xp: readLocalNumber("xp"),
    wins: readLocalNumber("wins"),
    losses: readLocalNumber("losses"),
    equipped_avatar_id: readLocalText("equippedAvatar", "default"),
  };
  const userId = await getCurrentUserId();
  if (!userId) return fallback;
  const { data, error } = await supabase.from("profiles").select("id, username, coins, xp, wins, losses, equipped_avatar_id").eq("id", userId).maybeSingle();
  if (error || !data) return fallback;
  return {
    id: data.id,
    username: data.username || "Jogador THK",
    coins: data.coins || 0,
    xp: data.xp || 0,
    wins: data.wins || 0,
    losses: data.losses || 0,
    equipped_avatar_id: data.equipped_avatar_id || "default",
  };
}

export async function saveMatchResult(result: "win" | "loss", coinsEarned: number, xpEarned: number) {
  writeLocalNumber("coins", readLocalNumber("coins") + coinsEarned);
  writeLocalNumber("xp", readLocalNumber("xp") + xpEarned);
  writeLocalNumber(result === "win" ? "wins" : "losses", readLocalNumber(result === "win" ? "wins" : "losses") + 1);
  const userId = await getCurrentUserId();
  if (!userId) return;
  const profile = await loadProfile();
  await supabase.from("profiles").update({
    coins: profile.coins + coinsEarned,
    xp: profile.xp + xpEarned,
    wins: profile.wins + (result === "win" ? 1 : 0),
    losses: profile.losses + (result === "loss" ? 1 : 0),
    updated_at: new Date().toISOString(),
  }).eq("id", userId);
  await supabase.from("matches").insert({ user_id: userId, result, coins_earned: coinsEarned, xp_earned: xpEarned });
}

export async function buyAvatarWithCoins(avatar: AvatarItem) {
  const userId = await getCurrentUserId();
  if (!userId) {
    const coins = readLocalNumber("coins");
    if (coins < avatar.price) return { ok: false, message: `Moedas insuficientes. Faltam ${avatar.price - coins} moedas.` };
    writeLocalNumber("coins", coins - avatar.price);
    const owned = new Set((readLocalText("ownedAvatars", "default") || "default").split(","));
    owned.add(avatar.id);
    writeLocalText("ownedAvatars", Array.from(owned).join(","));
    writeLocalText("equippedAvatar", avatar.id);
    return { ok: true, message: "Avatar comprado e equipado." };
  }
  const profile = await loadProfile();
  if (profile.coins < avatar.price) return { ok: false, message: `Moedas insuficientes. Faltam ${avatar.price - profile.coins} moedas.` };
  await supabase.from("profiles").update({ coins: profile.coins - avatar.price, equipped_avatar_id: avatar.id, updated_at: new Date().toISOString() }).eq("id", userId);
  await supabase.from("user_avatars").upsert({ user_id: userId, avatar_id: avatar.id }, { onConflict: "user_id,avatar_id" });
  return { ok: true, message: "Avatar comprado e equipado." };
}

export async function equipAvatar(avatarId: string) {
  writeLocalText("equippedAvatar", avatarId);
  const userId = await getCurrentUserId();
  if (!userId) return;
  await supabase.from("profiles").update({ equipped_avatar_id: avatarId, updated_at: new Date().toISOString() }).eq("id", userId);
}
