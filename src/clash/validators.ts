import { Mode, Room, WinnerRecord } from "./types";

const validModes: Mode[] = ["battle", "ranking"];

export function isValidMode(value: unknown): value is Mode {
  return typeof value === "string" && validModes.includes(value as Mode);
}

export function normalizeRoom(room: Partial<Room> | null | undefined, fallback: Room): Room {
  const safeOptions = Array.isArray(room?.options)
    ? room.options
        .filter((option) => typeof option?.text === "string" && option.text.trim().length > 0)
        .map((option, index) => ({
          id: typeof option.id === "number" ? option.id : Date.now() + index,
          text: option.text.trim(),
          votes: typeof option.votes === "number" && Number.isFinite(option.votes) ? Math.max(0, option.votes) : 0,
        }))
    : fallback.options;

  return {
    id: typeof room?.id === "number" ? room.id : fallback.id,
    title: typeof room?.title === "string" && room.title.trim() ? room.title.trim() : fallback.title,
    category: typeof room?.category === "string" && room.category.trim() ? room.category.trim() : fallback.category,
    mode: isValidMode(room?.mode) ? room.mode : fallback.mode,
    finished: typeof room?.finished === "boolean" ? room.finished : false,
    votedBy: Array.isArray(room?.votedBy) ? room.votedBy.filter((name) => typeof name === "string") : [],
    options: safeOptions.length >= 2 ? safeOptions : fallback.options,
  };
}

export function normalizeRooms(value: unknown, fallback: Room[]): Room[] {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const normalized = value.map((room, index) => normalizeRoom(room, fallback[index] ?? fallback[0]));
  return normalized.length > 0 ? normalized : fallback;
}

export function normalizeHistory(value: unknown): WinnerRecord[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((record) => record && typeof record === "object")
    .map((record: Partial<WinnerRecord>, index) => ({
      id: typeof record.id === "number" ? record.id : Date.now() + index,
      roomTitle: typeof record.roomTitle === "string" ? record.roomTitle : "Sala sem nome",
      winner: typeof record.winner === "string" ? record.winner : "Campeão",
      votes: typeof record.votes === "number" && Number.isFinite(record.votes) ? Math.max(0, record.votes) : 0,
      player: typeof record.player === "string" ? record.player : "Jogador",
    }));
}
