import { supabase, supabaseConfigOk } from "./supabase";

export type OnlineCardColor = "red" | "blue" | "green" | "yellow" | "wild";
export type OnlineCardKind = "number" | "skip" | "reverse" | "draw2" | "wild" | "wild4";
export type OnlineCard = { id: number; color: OnlineCardColor; value: string; kind: OnlineCardKind; power?: number };
export type OnlinePlayer = { id: string; name: string; avatar: string; hand: OnlineCard[]; uno: boolean; connected?: boolean; lastSeen?: number };
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
  revision: number;
  lastActionBy?: string;
};

const colors: Exclude<OnlineCardColor, "wild">[] = ["red", "blue", "green", "yellow"];

export function shuffle<T>(items: T[]) { return [...items].sort(() => Math.random() - 0.5); }

export function makeOnlineDeck() {
  let id = 1;
  const deck: OnlineCard[] = [];
  for (const color of colors) {
    deck.push({ id: id++, color, value: "0", kind: "number" });
    for (let n = 1; n <= 9; n++) {
      deck.push({ id: id++, color, value: String(n), kind: "number" });
      deck.push({ id: id++, color, value: String(n), kind: "number" });
    }
    for (let i = 0; i < 2; i++) {
      deck.push({ id: id++, color, value: "BLOQ", kind: "skip" });
      deck.push({ id: id++, color, value: "REV", kind: "reverse" });
      deck.push({ id: id++, color, value: "+2", kind: "draw2", power: 2 });
    }
  }
  for (let i = 0; i < 4; i++) {
    deck.push({ id: id++, color: "wild", value: "COR", kind: "wild" });
    deck.push({ id: id++, color: "wild", value: "+4", kind: "wild4", power: 4 });
  }
  return shuffle(deck);
}

export function canPlayOnline(card: OnlineCard, top: OnlineCard, activeColor: Exclude<OnlineCardColor, "wild">) {
  return card.color === "wild" || card.color === activeColor || card.value === top.value || card.kind === top.kind;
}

export function nextTurnIndex(game: OnlineGameState, steps = 1) {
  const total = game.players.length;
  return ((game.turnIndex + steps * game.direction) % total + total) % total;
}

function drawCards(game: OnlineGameState, playerIndex: number, amount: number) {
  let deck = [...game.deck];
  let discard = [...game.discard];
  const drawn: OnlineCard[] = [];
  if (deck.length < amount && discard.length > 1) {
    const top = discard[discard.length - 1];
    deck = shuffle(discard.slice(0, -1));
    discard = [top];
  }
  for (let i = 0; i < amount; i++) {
    const card = deck.shift();
    if (card) drawn.push(card);
  }
  const players = game.players.map((player, index) => index === playerIndex ? { ...player, hand: [...player.hand, ...drawn], uno: false } : player);
  return { ...game, deck, discard, players };
}

export function makeInitialOnlineGame(roomCode: string, members: { id: string; name: string; avatar: string }[]): OnlineGameState {
  let deck = makeOnlineDeck();
  const players = members.slice(0, 4).map((member) => {
    const hand = deck.slice(0, 7);
    deck = deck.slice(7);
    return { ...member, hand, uno: false, connected: true, lastSeen: Date.now() };
  });
  let first = deck.find((card) => card.color !== "wild" && card.kind === "number") || deck.find((card) => card.color !== "wild") || deck[0];
  deck = deck.filter((card) => card.id !== first.id);
  return { roomCode, players, deck, discard: [first], turnIndex: 0, direction: 1, activeColor: first.color === "wild" ? "red" : first.color, status: "playing", message: "Partida online iniciada.", updatedAt: Date.now(), revision: 1 };
}

export function markPlayerSeen(game: OnlineGameState, playerId: string) {
  return { ...game, players: game.players.map((player) => player.id === playerId ? { ...player, connected: true, lastSeen: Date.now() } : player), updatedAt: Date.now(), revision: game.revision + 1 };
}

export function playOnlineCard(game: OnlineGameState, playerId: string, cardId: number, chosenColor?: Exclude<OnlineCardColor, "wild">) {
  if (game.status !== "playing") return { ok: false, game, message: "Partida não está ativa." };
  const playerIndex = game.players.findIndex((player) => player.id === playerId);
  if (playerIndex < 0) return { ok: false, game, message: "Jogador não encontrado." };
  if (playerIndex !== game.turnIndex) return { ok: false, game, message: "Não é sua vez." };
  const player = game.players[playerIndex];
  const card = player.hand.find((item) => item.id === cardId);
  const top = game.discard[game.discard.length - 1];
  if (!card || !top) return { ok: false, game, message: "Carta inválida." };
  if (!canPlayOnline(card, top, game.activeColor)) return { ok: false, game, message: "Essa carta não pode ser jogada agora." };

  let next: OnlineGameState = {
    ...game,
    players: game.players.map((item, index) => index === playerIndex ? { ...item, hand: item.hand.filter((handCard) => handCard.id !== cardId), uno: false } : item),
    discard: [...game.discard, card],
    activeColor: card.color === "wild" ? (chosenColor || game.activeColor) : card.color,
    message: `${player.name} jogou ${card.value}.`,
    updatedAt: Date.now(),
    revision: game.revision + 1,
    lastActionBy: playerId,
  };

  const cardsLeft = next.players[playerIndex].hand.length;
  if (cardsLeft === 0) return { ok: true, game: { ...next, status: "finished", winnerId: playerId, message: `${player.name} venceu a partida!` }, message: "Vitória!" };

  if (card.kind === "skip") next = { ...next, turnIndex: nextTurnIndex(next, 2), message: `${player.name} bloqueou o próximo jogador.` };
  else if (card.kind === "reverse") {
    const direction = next.direction === 1 ? -1 : 1;
    next = { ...next, direction, turnIndex: next.players.length === 2 ? nextTurnIndex({ ...next, direction }, 2) : nextTurnIndex({ ...next, direction }, 1), message: `${player.name} inverteu o sentido.` };
  } else if (card.kind === "draw2" || card.kind === "wild4") {
    const victimIndex = nextTurnIndex(next, 1);
    next = drawCards(next, victimIndex, card.power || 2);
    next = { ...next, turnIndex: nextTurnIndex(next, 2), message: `${next.players[victimIndex].name} comprou ${card.power || 2} cartas.` };
  } else next = { ...next, turnIndex: nextTurnIndex(next, 1) };

  return { ok: true, game: next, message: next.message };
}

export function drawOnlineCard(game: OnlineGameState, playerId: string) {
  if (game.status !== "playing") return { ok: false, game, message: "Partida não está ativa." };
  const playerIndex = game.players.findIndex((player) => player.id === playerId);
  if (playerIndex < 0) return { ok: false, game, message: "Jogador não encontrado." };
  if (playerIndex !== game.turnIndex) return { ok: false, game, message: "Não é sua vez." };
  let next = drawCards(game, playerIndex, 1);
  next = { ...next, turnIndex: nextTurnIndex(next, 1), message: `${game.players[playerIndex].name} comprou uma carta.`, updatedAt: Date.now(), revision: game.revision + 1, lastActionBy: playerId };
  return { ok: true, game: next, message: next.message };
}

export function callUnoOnline(game: OnlineGameState, playerId: string) {
  const playerIndex = game.players.findIndex((player) => player.id === playerId);
  if (playerIndex < 0) return { ok: false, game, message: "Jogador não encontrado." };
  if (game.players[playerIndex].hand.length !== 1) return { ok: false, game, message: "UNO só pode ser chamado com 1 carta." };
  return { ok: true, game: { ...game, players: game.players.map((player, index) => index === playerIndex ? { ...player, uno: true } : player), message: `${game.players[playerIndex].name} chamou UNO!`, updatedAt: Date.now(), revision: game.revision + 1 }, message: "UNO!" };
}

export async function saveOnlineGame(game: OnlineGameState) {
  if (!supabaseConfigOk) return { ok: false, message: "Supabase não configurado." };
  const { error } = await supabase.from("game_matches").upsert({ room_code: game.roomCode, state: game, status: game.status, updated_at: new Date().toISOString() });
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
