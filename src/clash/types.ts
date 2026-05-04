export type Screen = "home" | "create" | "room" | "history";
export type Mode = "battle" | "ranking";

export type Option = {
  id: number;
  text: string;
  votes: number;
};

export type Room = {
  id: number;
  title: string;
  category: string;
  mode: Mode;
  options: Option[];
  finished: boolean;
  votedBy: string[];
};

export type WinnerRecord = {
  id: number;
  roomTitle: string;
  winner: string;
  votes: number;
  player: string;
};
