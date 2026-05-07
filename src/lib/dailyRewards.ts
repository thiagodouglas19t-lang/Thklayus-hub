import { gameIdentity } from "./gameIdentity";

const storage = gameIdentity.storage;
const dayMs = 24 * 60 * 60 * 1000;

export type DailyRewardState = {
  canClaim: boolean;
  streak: number;
  lastClaim: string;
  todayReward: number;
  nextChestWins: number;
};

function key(name: string) {
  return `${storage}:${name}`;
}

function dateId(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function readNumber(name: string) {
  return Number(localStorage.getItem(key(name)) || 0);
}

function writeNumber(name: string, value: number) {
  localStorage.setItem(key(name), String(value));
}

export function getDailyRewardState(): DailyRewardState {
  const today = dateId();
  const lastClaim = localStorage.getItem(key("daily:lastClaim")) || "";
  const streak = readNumber("daily:streak");
  const wins = readNumber("wins");
  return {
    canClaim: lastClaim !== today,
    streak,
    lastClaim,
    todayReward: 20 + Math.min(streak, 7) * 5,
    nextChestWins: Math.max(0, 3 - (wins % 3)),
  };
}

export function claimDailyReward() {
  const state = getDailyRewardState();
  if (!state.canClaim) return { claimed: false, ...state };

  const lastDate = state.lastClaim ? new Date(`${state.lastClaim}T00:00:00`) : null;
  const yesterday = new Date(Date.now() - dayMs).toISOString().slice(0, 10);
  const newStreak = lastDate && state.lastClaim === yesterday ? state.streak + 1 : 1;
  const reward = 20 + Math.min(newStreak, 7) * 5;

  writeNumber("coins", readNumber("coins") + reward);
  writeNumber("daily:streak", newStreak);
  localStorage.setItem(key("daily:lastClaim"), dateId());

  return { claimed: true, reward, canClaim: false, streak: newStreak, lastClaim: dateId(), todayReward: reward, nextChestWins: state.nextChestWins };
}
