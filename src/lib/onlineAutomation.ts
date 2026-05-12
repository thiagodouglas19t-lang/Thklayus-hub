import { OnlineRoomState, startSynchronizedLoading, systemMessage, upsertMember } from "./onlineRoom";

export type AutomationAction =
  | "idle"
  | "auto_message"
  | "auto_fill_bot"
  | "auto_ready"
  | "auto_start"
  | "host_transfer"
  | "reconnect";

export type AutomationResult = {
  room: OnlineRoomState;
  actions: AutomationAction[];
};

const BOT_NAMES = ["Shadow Bot", "Rimuru Bot", "Jin-Woo Bot"];
const BOT_AVATARS = ["🌑", "💠", "🗡️"];

function makeBot(index: number) {
  const now = Date.now();
  return {
    id: `bot-${index + 1}`,
    name: BOT_NAMES[index] || `Bot ${index + 1}`,
    avatar: BOT_AVATARS[index] || "🤖",
    ready: true,
    isHost: false,
    joinedAt: now + index,
    lastSeenAt: now,
    rankPoints: 980 + index * 40,
    profileLevel: 1 + index,
  };
}

function uniqueChat(room: OnlineRoomState, text: string) {
  const alreadySent = (room.chat || []).some((message) => message.system && message.text === text);
  if (alreadySent) return room.chat || [];
  return [...(room.chat || []), systemMessage(text)].slice(-30);
}

export function runOnlineAutomation(room: OnlineRoomState): AutomationResult {
  const now = Date.now();
  let next = { ...room, chat: room.chat || [] };
  const actions: AutomationAction[] = [];

  const hostStillHere = next.members.some((member) => member.id === next.hostId);
  if (!hostStillHere && next.members[0]) {
    next = {
      ...next,
      hostId: next.members[0].id,
      members: next.members.map((member, index) => ({ ...member, isHost: index === 0 })),
      chat: uniqueChat(next, "Novo host definido automaticamente."),
      updatedAt: now,
    };
    actions.push("host_transfer");
  }

  if (next.status === "searching" && next.matchmakingStartedAt) {
    const searchingFor = now - next.matchmakingStartedAt;
    if (searchingFor > 2500 && next.members.length < 2) {
      const bot = makeBot(next.members.length);
      next = upsertMember(next, bot);
      next.chat = uniqueChat(next, "Matchmaking completou a sala com um bot temporário.");
      actions.push("auto_fill_bot");
    }
    if (searchingFor > 4200 && next.members.length >= 2) {
      next = startSynchronizedLoading({ ...next, members: next.members.map((member) => ({ ...member, ready: true })) });
      actions.push("auto_start");
    }
  }

  if (next.status === "waiting" && next.members.length >= 2 && next.members.every((member) => member.ready)) {
    next.chat = uniqueChat(next, "Todos estão prontos. O host já pode iniciar.");
    actions.push("auto_message");
  }

  if (next.status === "starting" && next.loadingStartedAt && now - next.loadingStartedAt > 3200) {
    next = { ...next, status: "playing", updatedAt: now };
    next.chat = uniqueChat(next, "Partida liberada automaticamente.");
    actions.push("auto_start");
  }

  if (!actions.length) actions.push("idle");
  return { room: next, actions };
}
