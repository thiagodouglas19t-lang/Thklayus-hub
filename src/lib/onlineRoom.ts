import { supabase, supabaseConfigOk } from "./supabase";

export type OnlineMember = {
  id: string;
  name: string;
  avatar: string;
  ready: boolean;
  isHost: boolean;
  joinedAt: number;
};

export type OnlineRoomState = {
  roomCode: string;
  members: OnlineMember[];
  hostId: string;
  status: "waiting" | "starting" | "playing";
  updatedAt: number;
};

const localKey = "thklayus-online-room";

export function makeRoomCode() {
  return `THK-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export function getLocalPlayerId() {
  let id = localStorage.getItem(`${localKey}:playerId`);
  if (!id) {
    id = crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
    localStorage.setItem(`${localKey}:playerId`, id);
  }
  return id;
}

export function normalizeRoomCode(code: string) {
  const clean = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (clean.startsWith("THK")) return `THK-${clean.slice(3, 7)}`;
  return `THK-${clean.slice(0, 4)}`;
}

export function createLocalMember(name: string, avatar: string, isHost = false): OnlineMember {
  return {
    id: getLocalPlayerId(),
    name: name || "Jogador",
    avatar: avatar || "⚡",
    ready: isHost,
    isHost,
    joinedAt: Date.now(),
  };
}

export function upsertMember(room: OnlineRoomState, member: OnlineMember): OnlineRoomState {
  const withoutMe = room.members.filter((item) => item.id !== member.id);
  return {
    ...room,
    members: [...withoutMe, member].slice(0, 4),
    updatedAt: Date.now(),
  };
}

export function updateMyReady(room: OnlineRoomState, playerId: string, ready: boolean): OnlineRoomState {
  return {
    ...room,
    members: room.members.map((member) => member.id === playerId ? { ...member, ready } : member),
    updatedAt: Date.now(),
  };
}

export function canUseOnlineRooms() {
  return supabaseConfigOk;
}

export async function saveOnlineRoom(room: OnlineRoomState) {
  if (!supabaseConfigOk) return { ok: false, message: "Supabase não configurado." };
  const { error } = await supabase.from("game_rooms").upsert({
    code: room.roomCode,
    state: room,
    status: room.status,
    updated_at: new Date().toISOString(),
  });
  if (error) return { ok: false, message: error.message };
  return { ok: true, message: "Sala atualizada." };
}

export async function loadOnlineRoom(code: string) {
  if (!supabaseConfigOk) return { room: null, message: "Supabase não configurado." };
  const { data, error } = await supabase.from("game_rooms").select("state").eq("code", normalizeRoomCode(code)).maybeSingle();
  if (error) return { room: null, message: error.message };
  return { room: (data?.state as OnlineRoomState | undefined) || null, message: data ? "Sala encontrada." : "Sala não encontrada." };
}

export function subscribeOnlineRoom(code: string, onRoom: (room: OnlineRoomState) => void) {
  if (!supabaseConfigOk) return () => undefined;
  const channel = supabase
    .channel(`game-room-${normalizeRoomCode(code)}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "game_rooms", filter: `code=eq.${normalizeRoomCode(code)}` }, (payload) => {
      const next = (payload.new as { state?: OnlineRoomState } | null)?.state;
      if (next) onRoom(next);
    })
    .subscribe();
  return () => {
    supabase.removeChannel(channel);
  };
}

export const gameRoomsSql = `
create table if not exists public.game_rooms (
  code text primary key,
  state jsonb not null,
  status text not null default 'waiting',
  updated_at timestamptz not null default now()
);

alter table public.game_rooms enable row level security;

drop policy if exists "game_rooms_select_all" on public.game_rooms;
drop policy if exists "game_rooms_insert_all" on public.game_rooms;
drop policy if exists "game_rooms_update_all" on public.game_rooms;

create policy "game_rooms_select_all" on public.game_rooms for select using (true);
create policy "game_rooms_insert_all" on public.game_rooms for insert with check (true);
create policy "game_rooms_update_all" on public.game_rooms for update using (true);
`;
