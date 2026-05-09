export type MatchModeId =
  | "solo_ai"
  | "duel_ai"
  | "table_3"
  | "table_4"
  | "online_duel"
  | "online_duo_ai"
  | "online_fill_bots"
  | "online_full";

export type MatchMode = {
  id: MatchModeId;
  title: string;
  shortTitle: string;
  description: string;
  kind: "offline" | "online";
  totalPlayers: 2 | 3 | 4;
  humanPlayers: 1 | 2 | 3 | 4;
  botPlayers: 0 | 1 | 2 | 3;
  recommended?: boolean;
  badge: string;
};

export const matchModes: MatchMode[] = [
  {
    id: "solo_ai",
    title: "1v1 Contra IA",
    shortTitle: "1v1 IA",
    description: "Você contra um bot. Melhor modo para testar jogadas rápidas.",
    kind: "offline",
    totalPlayers: 2,
    humanPlayers: 1,
    botPlayers: 1,
    recommended: true,
    badge: "Rápido",
  },
  {
    id: "duel_ai",
    title: "Mesa 2 Jogadores",
    shortTitle: "Mesa 2",
    description: "Partida curta com você e 1 IA.",
    kind: "offline",
    totalPlayers: 2,
    humanPlayers: 1,
    botPlayers: 1,
    badge: "Curta",
  },
  {
    id: "table_3",
    title: "Mesa 3 Jogadores",
    shortTitle: "Mesa 3",
    description: "Você contra 2 IAs. Mais caos e mais chance de combo.",
    kind: "offline",
    totalPlayers: 3,
    humanPlayers: 1,
    botPlayers: 2,
    badge: "Média",
  },
  {
    id: "table_4",
    title: "Mesa 4 Jogadores",
    shortTitle: "Mesa 4",
    description: "Modo clássico de mesa cheia contra 3 IAs.",
    kind: "offline",
    totalPlayers: 4,
    humanPlayers: 1,
    botPlayers: 3,
    badge: "Completa",
  },
  {
    id: "online_duel",
    title: "Online 1v1",
    shortTitle: "1v1 Online",
    description: "Você contra outro jogador, sem bots.",
    kind: "online",
    totalPlayers: 2,
    humanPlayers: 2,
    botPlayers: 0,
    badge: "PvP",
  },
  {
    id: "online_duo_ai",
    title: "Dupla Contra IA",
    shortTitle: "Dupla IA",
    description: "Você e um amigo na mesma mesa contra bots.",
    kind: "online",
    totalPlayers: 4,
    humanPlayers: 2,
    botPlayers: 2,
    badge: "Coop",
  },
  {
    id: "online_fill_bots",
    title: "Online com Bots",
    shortTitle: "Com Bots",
    description: "Entra quem tiver online e o jogo completa a mesa com IA.",
    kind: "online",
    totalPlayers: 4,
    humanPlayers: 2,
    botPlayers: 2,
    badge: "Flex",
  },
  {
    id: "online_full",
    title: "Sala Cheia",
    shortTitle: "4 Online",
    description: "Até 4 jogadores reais na mesma mesa.",
    kind: "online",
    totalPlayers: 4,
    humanPlayers: 4,
    botPlayers: 0,
    badge: "Party",
  },
];

export function getMatchMode(id?: string | null) {
  return matchModes.find((mode) => mode.id === id) || matchModes[0];
}

export function saveSelectedMatchMode(id: MatchModeId) {
  localStorage.setItem("thklayus:selectedMatchMode", id);
}

export function loadSelectedMatchMode() {
  return getMatchMode(localStorage.getItem("thklayus:selectedMatchMode"));
}
