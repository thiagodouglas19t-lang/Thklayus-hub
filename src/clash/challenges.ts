export type ChallengeMode = "solo" | "x1" | "duo";

export type ChallengeGame = {
  id: string;
  mode: ChallengeMode;
  title: string;
  description: string;
  duration: string;
  difficulty: "fácil" | "médio" | "difícil";
  reward: number;
  playersLabel: string;
};

export const challengeGames: ChallengeGame[] = [
  {
    id: "solo-reflexo",
    mode: "solo",
    title: "Reflexo Rápido",
    description: "Clique no momento certo e tente bater sua própria pontuação.",
    duration: "30s",
    difficulty: "fácil",
    reward: 10,
    playersLabel: "Solo",
  },
  {
    id: "solo-mira",
    mode: "solo",
    title: "Mira Fria",
    description: "Treino rápido de precisão visual com pontuação por acerto.",
    duration: "45s",
    difficulty: "médio",
    reward: 15,
    playersLabel: "Solo",
  },
  {
    id: "x1-clash",
    mode: "x1",
    title: "Clash X1",
    description: "Duelo direto: dois lados, votos rápidos, vencedor no fim do tempo.",
    duration: "30s",
    difficulty: "médio",
    reward: 25,
    playersLabel: "1v1",
  },
  {
    id: "x1-comeback",
    mode: "x1",
    title: "Virada Impossível",
    description: "Um jogador começa atrás e precisa virar antes do timer acabar.",
    duration: "40s",
    difficulty: "difícil",
    reward: 35,
    playersLabel: "1v1",
  },
  {
    id: "duo-sync",
    mode: "duo",
    title: "Dupla Sync",
    description: "Dois jogadores somam pontos juntos para superar a meta da rodada.",
    duration: "60s",
    difficulty: "médio",
    reward: 40,
    playersLabel: "Dupla",
  },
  {
    id: "duo-defesa",
    mode: "duo",
    title: "Defesa Final",
    description: "Uma dupla segura a liderança contra bots até o tempo acabar.",
    duration: "60s",
    difficulty: "difícil",
    reward: 50,
    playersLabel: "Dupla",
  },
];

export const modeLabels: Record<ChallengeMode, string> = {
  solo: "Solo",
  x1: "X1",
  duo: "Dupla",
};

export function getChallengesByMode(mode: ChallengeMode) {
  return challengeGames.filter((game) => game.mode === mode);
}
