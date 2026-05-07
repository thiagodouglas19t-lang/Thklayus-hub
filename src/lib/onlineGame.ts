import { supabase, supabaseConfigOk } from "./supabase";

export type OnlineCardColor = "red" | "blue" | "green" | "yellow" | "wild";
export type OnlineCardKind = "number" | "block" | "swap" | "plus" | "wild";
export type OnlineCard = { id: number; color: OnlineCardColor; value: string; kind: OnlineCardKind; power?: number };
export type OnlinePlayer = { id: string; name: string; avatar: string; hand: OnlineCard[]; uno: boolean };
export type OnlineGameState = {
  roomCode: string;
  players: OnlinePlayer[];
  deck: OnlineCard[];
  discard: OnlineCard[];
  turnIndex: number;
  direction: 1 | -1;
  activeColor: Exclude<OnlineCardColor, "wild">;
  status: "waiting" | "playing" | "finished";
  winnerId?: string;
  message: string;
  updatedAt: number;
};

const colors: Exclude<OnlineCardColor, "wild">[] = ["red", "blue", "green", "yellow"];

export function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function makeOnlineDeck() {
  let id = 1;
  const deck: OnlineCard[] = [];
  for (const color of colors) {
    for (let n = 0; n <= 9; n++) deck.push({ id: id++, color, value: String(n), kind: "number" });
    deck.push({ id: id++, color, value: "BLOQ", kind: "block" });
    deck.push({ id: id++, color, value: "+2", kind: "plus", power: 2 });
    deck.push({ id: id++, color, value: "TROCA", kind: "swap" });
  }
  for (let i = 0; i < 4; i++) deck.push({ id: id++, color: "wild", value: "COR", kind: "wild" });
  return shuffle(deck);
}

export function canPlayOnline(card: OnlineCard, top: OnlineCard, activeColor: Exclude<OnlineCardColor, "wild">) {
  return card.color === "wild" || card.color === activeColor || card.value === top.value;
}

export function makeInitialOnlineGame(roomCode: string, members: { id: string; name: string; avatar: string }[]): OnlineGameState {
  let deck = makeOnlineDeck();
  const players = members.slice(0, 4).map((member) => {
    const hand = deck.slice(0, 7);
    deck = deck.slice(7);
    return { ...member, hand, uno: false };
  });
  const first = deck.find((card) => card.color !== "wild") || deck[0];
  deck = deck.filter((card) => card.id !== first.id);
  return {
    roomCode,
    players,
    deck,
    discard: [first],
    turnIndex: 0,
    direction: 1,
    activeColor: first.color === "wild" ? "red" : first.color,
    status: "playing",
    message: "Partida online iniciada.",
    updatedAt: Date.now(),
  };
}

export async function saveOnlineGame(game: OnlineGameState) {
  if (!supabaseConfigOk) return { ok: false, message: "Supabase não configurado." };
  const { error } = await supabase.from("game_matches").upsert({
    room_code: game.roomCode,
    state: game,
    status: game.status,
    updated_at: new Date().toISOString(),
  });
  if (error) return { ok: false, message: error.message };
  return { ok: true, message: "Partida sincronizada." };
}

export async function loadOnlineGame(roomCode: string) {
  if (!supabaseConfigOk) return { game: null, message: "Supabase não configurado." };
  const { data, error } = await supabase.from("game_matches").select("state").eq("room_code", roomCode).maybeSingle();
  if (error) return { game: null, message: error.message };
  return { game: (data?.state as OnlineGameState | undefined) || null, message: data ? "Partida encontrada." : "Partida não encontrada." };
}

export function subscribeOnlineGame(roomCode: string, onGame: (game: OnlineGameState) => void) {
  if (!supabaseConfigOk) return () => undefined;
  const channel = supabase.channel(`game-match-${roomCode}`).on("postgres_changes", { event: "*", schema: "public", table: "game_matches", filter: `room_code=eq.${roomCode}` }, (payload) => {
    const state = (payload.new as { state?: OnlineGameState } | null)?.state;
    if (state) onGame(state);
  }).subscribe();
  return () => { supabase.removeChannel(channel); };
}

export const gameMatchesSql = `
create table if not exists public.game_matches (
  room_code text primary key,
  state jsonb not null,
  status text not null default 'playing',
  updated_at timestamptz not null default now()
);

alter table public.game_matches enable row level security;

drop policy if exists "game_matches_select_all" on public.game_matches;
drop policy if exists "game_matches_insert_all" on public.game_matches;
drop policy if exists "game_matches_update_all" on public.game_matches;

create policy "game_matches_select_all" on public.game_matches for select using (true);
create policy "game_matches_insert_all" on public.game_matches for insert with check (true);
create policy "game_matches_update_all" on public.game_matches for update using (true);

alter publication supabase_realtime add table public.game_matches;
`;
