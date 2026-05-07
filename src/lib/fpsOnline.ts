import { supabase, supabaseConfigOk } from "./supabase";
import { getLocalPlayerId, normalizeRoomCode } from "./onlineRoom";

export type FPSPlayer = {
  id: string;
  name: string;
  avatar: string;
  x: number;
  y: number;
  hp: number;
  score: number;
  alive: boolean;
  lastShotAt: number;
};

export type FPSMatchState = {
  roomCode: string;
  players: FPSPlayer[];
  status: "waiting" | "playing" | "finished";
  startedAt: number;
  updatedAt: number;
  message: string;
};

export function makeFPSRoomCode() {
  return `FPS-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export function normalizeFPSCode(code: string) {
  const clean = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!clean) return "";
  if (clean.startsWith("FPS")) {
    const payload = clean.slice(3, 7);
    return payload.length >= 4 ? `FPS-${payload}` : "";
  }
  const thk = normalizeRoomCode(clean);
  if (thk) return thk.replace("THK", "FPS");
  const payload = clean.slice(0, 4);
  return payload.length >= 4 ? `FPS-${payload}` : "";
}

export function createFPSPlayer(name: string, avatar: string): FPSPlayer {
  return {
    id: getLocalPlayerId(),
    name: name?.trim().slice(0, 16) || "Player",
    avatar: avatar || "⚡",
    x: 22 + Math.random() * 56,
    y: 34 + Math.random() * 18,
    hp: 100,
    score: 0,
    alive: true,
    lastShotAt: 0,
  };
}

export function upsertFPSPlayer(match: FPSMatchState, player: FPSPlayer): FPSMatchState {
  const old = match.players.find((item) => item.id === player.id);
  const merged = old ? { ...old, name: player.name, avatar: player.avatar } : player;
  return { ...match, players: [...match.players.filter((item) => item.id !== player.id), merged].slice(0, 8), updatedAt: Date.now() };
}

export function hitFPSPlayer(match: FPSMatchState, shooterId: string, targetId: string, damage = 24): FPSMatchState {
  const shooter = match.players.find((item) => item.id === shooterId);
  const target = match.players.find((item) => item.id === targetId);
  if (!shooter || !target || !target.alive || shooterId === targetId) return match;
  const nextHp = Math.max(0, target.hp - damage);
  const eliminated = nextHp <= 0;
  return {
    ...match,
    players: match.players.map((player) => {
      if (player.id === targetId) return { ...player, hp: nextHp, alive: !eliminated };
      if (player.id === shooterId) return { ...player, score: player.score + (eliminated ? 100 : 25), lastShotAt: Date.now() };
      return player;
    }),
    message: eliminated ? `${shooter.name} eliminou ${target.name}.` : `${shooter.name} acertou ${target.name}.`,
    updatedAt: Date.now(),
  };
}

export function respawnFPSPlayer(match: FPSMatchState, playerId: string): FPSMatchState {
  return {
    ...match,
    players: match.players.map((player) => player.id === playerId ? { ...player, hp: 100, alive: true, x: 22 + Math.random() * 56, y: 34 + Math.random() * 18 } : player),
    updatedAt: Date.now(),
  };
}

export async function saveFPSMatch(match: FPSMatchState) {
  if (!supabaseConfigOk) return { ok: false, message: "Supabase não configurado." };
  const { error } = await supabase.from("fps_matches").upsert({
    room_code: match.roomCode,
    state: match,
    status: match.status,
    updated_at: new Date().toISOString(),
  });
  if (error) return { ok: false, message: error.message };
  return { ok: true, message: "FPS sincronizado." };
}

export async function loadFPSMatch(roomCode: string) {
  if (!supabaseConfigOk) return { match: null, message: "Supabase não configurado." };
  const normalized = normalizeFPSCode(roomCode);
  if (!normalized) return { match: null, message: "Código inválido." };
  const { data, error } = await supabase.from("fps_matches").select("state").eq("room_code", normalized).maybeSingle();
  if (error) return { match: null, message: error.message };
  return { match: (data?.state as FPSMatchState | undefined) || null, message: data ? "Sala FPS encontrada." : "Sala FPS não encontrada." };
}

export function subscribeFPSMatch(roomCode: string, onMatch: (match: FPSMatchState) => void) {
  const normalized = normalizeFPSCode(roomCode);
  if (!supabaseConfigOk || !normalized) return () => undefined;
  const channel = supabase.channel(`fps-match-${normalized}`).on("postgres_changes", { event: "*", schema: "public", table: "fps_matches", filter: `room_code=eq.${normalized}` }, (payload) => {
    const state = (payload.new as { state?: FPSMatchState } | null)?.state;
    if (state) onMatch(state);
  }).subscribe();
  return () => { supabase.removeChannel(channel); };
}

export const fpsMatchesSql = `
create table if not exists public.fps_matches (
  room_code text primary key,
  state jsonb not null,
  status text not null default 'playing',
  updated_at timestamptz not null default now()
);

alter table public.fps_matches enable row level security;

drop policy if exists "fps_matches_select_all" on public.fps_matches;
drop policy if exists "fps_matches_insert_all" on public.fps_matches;
drop policy if exists "fps_matches_update_all" on public.fps_matches;

create policy "fps_matches_select_all" on public.fps_matches for select using (true);
create policy "fps_matches_insert_all" on public.fps_matches for insert with check (true);
create policy "fps_matches_update_all" on public.fps_matches for update using (true);

alter publication supabase_realtime add table public.fps_matches;
`;
