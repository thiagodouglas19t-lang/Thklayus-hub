export const gameIdentity = {
  appName: "Clash Room",
  brand: "THKLAYUS",
  storage: "thklayus-classic-clash",
  version: "Alpha Arena",
  vibe: "AMOLED Neon Gaming",
  palette: {
    background: "#000000",
    primary: "#8b5cf6",
    primarySoft: "#c4b5fd",
    accent: "#facc15",
    danger: "#ef4444",
    text: "#ffffff",
  },
  lobby: {
    style: "stage",
    atmosphere: "competitive",
    focus: "mobile-first",
    camera: "center-character",
  },
  modes: [
    {
      id: "ai",
      title: "Contra IA",
      status: "Disponível",
      description: "Modo principal atual com bots, missões, recompensas e Clash Cards.",
    },
    {
      id: "casual",
      title: "Casual",
      status: "Em preparação",
      description: "Modo rápido usando a mesma base do jogo sem duplicar sistemas.",
    },
    {
      id: "ranked",
      title: "Ranqueada",
      status: "Futuro real",
      description: "Entrará depois do login, matchmaking e partidas online.",
    },
    {
      id: "party",
      title: "Squad Room",
      status: "Visual ativo",
      description: "Lobby estilo sala gamer com amigos, prontos e códigos de convite.",
    },
  ],
  futureSystems: {
    auth: ["login", "registro", "perfil", "nome único", "avatar/foto"],
    social: ["amigos", "convite por código", "salas privadas", "chat rápido"],
    online: ["multiplayer", "reconexão", "anti-AFK", "histórico de partidas"],
    retention: ["login diário", "ranking", "elo", "conquistas", "baú grátis"],
    monetization: ["skins", "temas AMOLED", "emojis", "molduras", "passe premium", "efeitos visuais"],
    immersion: ["animações 3D", "entrada de lobby", "sons premium", "reações em tempo real"],
  },
};

export const cosmeticRules = {
  noPayToWin: true,
  noSpamAds: true,
  noCasinoHeavy: true,
  premiumFeelFirst: true,
  mobilePerformancePriority: true,
};
