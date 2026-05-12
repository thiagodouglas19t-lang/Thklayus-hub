export type ClashCardsImprovement = {
  id: string;
  area: "rules" | "gameplay" | "ai" | "visual" | "online" | "progression" | "quality";
  priority: 1 | 2 | 3;
  title: string;
  problem: string;
  solution: string[];
};

export const clashCardsImprovements: ClashCardsImprovement[] = [
  {
    id: "rules-stack-plus",
    area: "rules",
    priority: 1,
    title: "Sistema de compra acumulada",
    problem: "+2 hoje só compra e pula. Falta tensão de empilhar resposta.",
    solution: ["permitir responder +2 com +2", "acumular penalidade", "mostrar contador de ameaça", "bot decidir se empilha ou compra"],
  },
  {
    id: "rules-challenge-uno",
    area: "rules",
    priority: 1,
    title: "UNO com desafio",
    problem: "O UNO existe, mas ainda não tem punição/desafio completo contra outros jogadores.",
    solution: ["botões chamar UNO", "detectar jogador com 1 carta sem UNO", "permitir desafiar", "aplicar +2 se válido"],
  },
  {
    id: "ai-memory",
    area: "ai",
    priority: 1,
    title: "IA com memória básica",
    problem: "Bots jogam melhor que antes, mas ainda não lembram padrões da mesa.",
    solution: ["registrar cores compradas", "lembrar quem está perto de vencer", "priorizar bloquear líder", "evitar trocar para cor ruim"],
  },
  {
    id: "game-state-machine",
    area: "quality",
    priority: 1,
    title: "Máquina de estados da partida",
    problem: "Muita regra está no componente visual. Isso dificulta online real e correção de bug.",
    solution: ["separar engine de regras", "criar game reducer", "registrar action log", "preparar replay e sync online"],
  },
  {
    id: "real-online-sync",
    area: "online",
    priority: 1,
    title: "Sincronização real de cartas",
    problem: "O online tem sala, mas a partida ainda roda local.",
    solution: ["criar gameId", "seed de baralho", "turno compartilhado", "validar jogadas", "salvar action log no Supabase"],
  },
  {
    id: "card-animations",
    area: "visual",
    priority: 2,
    title: "Animações premium de cartas",
    problem: "O jogo já tem efeitos, mas pode ficar mais próximo de jogo mobile grande.",
    solution: ["carta voando da mão para mesa", "draw saindo do monte", "impacto em +2/bloqueio", "shake suave no alvo"],
  },
  {
    id: "bot-personality",
    area: "ai",
    priority: 2,
    title: "Personalidade real dos bots",
    problem: "Os bots têm estilos, mas poderiam parecer personagens vivos.",
    solution: ["frases curtas", "emoji por ação", "agressividade variável", "erro humano leve", "rivalidade com jogador"],
  },
  {
    id: "tutorial-coach",
    area: "gameplay",
    priority: 2,
    title: "Tutor automático na partida",
    problem: "Jogador novo pode não entender coringa, UNO e cartas especiais.",
    solution: ["dicas contextuais", "explicar carta inválida", "mostrar por que puxar", "ensinar UNO no momento certo"],
  },
  {
    id: "ranked-rewards",
    area: "progression",
    priority: 2,
    title: "Ranked e recompensas por partida",
    problem: "Vitória dá moeda/XP, mas ainda não tem sensação de temporada.",
    solution: ["rank points", "missões de partida", "baú de vitória", "histórico", "streak"],
  },
  {
    id: "spectator-replay",
    area: "online",
    priority: 3,
    title: "Spectate e replay",
    problem: "Ainda não dá para assistir ou rever jogadas.",
    solution: ["action log", "modo espectador", "ocultar mãos", "replay de últimos turnos"],
  },
];

export function nextClashCardsImprovements() {
  return clashCardsImprovements
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 5);
}
