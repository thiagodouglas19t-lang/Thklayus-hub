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
  if (!clean) return "";
  const payload = clean.startsWith("THK") ? clean.slice(3, 7) : clean.slice(0, 4);
  if (payload.length < 4) return "";
  return `THK-${payload}`;
}

export function createLocalMember(name: string, avatar: string, isHost = false): OnlineMember {
  return {
    id: getLocalPlayerId(),
    name: name?.trim().slice(0, 18) || "Jogador",
    avatar: avatar || "⚡",
    ready: isHost,
    isHost,
    joinedAt: Date.now(),
  };
}

export function upsertMember(room: OnlineRoomState, member: OnlineMember): OnlineRoomState {
  const existing = room.members.find((item) => item.id === member.id);
  const normalizedMember = { ...member, isHost: member.id === room.hostId, joinedAt: existing?.joinedAt || member.joinedAt };
  const withoutMe = room.members.filter((item) => item.id !== member.id);
  const members = [...withoutMe, normalizedMember].sort((a, b) => a.joinedAt - b.joinedAt).slice(0, 4);
  return { ...room, members, updatedAt: Date.now() };
}

export function updateMyReady(room: OnlineRoomState, playerId: string, ready: boolean): OnlineRoomState {
  return {
    ...room,
    members: room.members.map((member) => member.id === playerId ? { ...member, ready } : member),
    updatedAt: Date.now(),
  };
}

export function canUseOnlineRooms() {
  return true;
}

function localRoomKey(code: string) {
  return `${localKey}:room:${normalizeRoomCode(code)}`;
}

function saveLocalRoom(room: OnlineRoomState) {
  localStorage.setItem(localRoomKey(room.roomCode), JSON.stringify(room));
  localStorage.setItem(`${localKey}:lastRoom`, room.roomCode);
  window.dispatchEvent(new StorageEvent("storage", { key: localRoomKey(room.roomCode), newValue: JSON.stringify(room) }));
}

function loadLocalRoom(code: string) {
  const normalized = normalizeRoomCode(code);
  if (!normalized) return null;
  try {
    const raw = localStorage.getItem(localRoomKey(normalized));
    return raw ? JSON.parse(raw) as OnlineRoomState : null;
  } catch {
    return null;
  }
}

export async function saveOnlineRoom(room: OnlineRoomState) {
  if (!room.roomCode) return { ok: false, message: "Código da sala inválido." };
  if (!supabaseConfigOk) {
    saveLocalRoom(room);
    return { ok: true, message: "Sala salva no modo local." };
  }
  const { error } = await supabase.from("game_rooms").upsert({
    code: room.roomCode,
    state: room,
    status: room.status,
    updated_at: new Date().toISOString(),
  });
  if (error) {
    saveLocalRoom(room);
    return { ok: true, message: `Servidor indisponível. Usando modo local: ${error.message}` };
  }
  return { ok: true, message: "Sala atualizada." };
}

export async function loadOnlineRoom(code: string) {
  const normalized = normalizeRoomCode(code);
  if (!normalized) return { room: null, message: "Código inválido. Use algo tipo THK-ABCD." };
  if (!supabaseConfigOk) {
    const room = loadLocalRoom(normalized);
    return { room, message: room ? "Sala local encontrada." : "Sala local não encontrada neste aparelho." };
  }
  const { data, error } = await supabase.from("game_rooms").select("state").eq("code", normalized).maybeSingle();
  if (error) {
    const room = loadLocalRoom(normalized);
    return { room, message: room ? "Servidor falhou, mas sala local foi carregada." : error.message };
  }
  return { room: (data?.state as OnlineRoomState | undefined) || loadLocalRoom(normalized), message: data ? "Sala encontrada." : "Sala não encontrada." };
}

export function subscribeOnlineRoom(code: string, onRoom: (room: OnlineRoomState) => void) {
  const normalized = normalizeRoomCode(code);
  if (!normalized) return () => undefined;
  const key = localRoomKey(normalized);
  const localListener = (event: StorageEvent) => {
    if (event.key !== key || !event.newValue) return;
    try { onRoom(JSON.parse(event.newValue) as OnlineRoomState); } catch {}
  };
  window.addEventListener("storage", localListener);
  if (!supabaseConfigOk) return () => window.removeEventListener("storage", localListener);
  const channel = supabase.channel(`game-room-${normalized}`).on("postgres_changes", { event: "*", schema: "public", table: "game_rooms", filter: `code=eq.${normalized}` }, (payload) => {
    const next = (payload.new as { state?: OnlineRoomState } | null)?.state;
    if (next) onRoom(next);
  }).subscribe();
  return () => { window.removeEventListener("storage", localListener); supabase.removeChannel(channel); };
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
