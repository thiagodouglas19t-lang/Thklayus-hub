export const gameIdentity = {
  appName: "Clash Room",
  brand: "THKLAYUS",
  storage: "thklayus-classic-clash",
  version: "Alpha Cards",
  vibe: "AMOLED Neon Card Game",
  palette: {
    background: "#000000",
    primary: "#8b5cf6",
    primarySoft: "#c4b5fd",
    accent: "#facc15",
    danger: "#ef4444",
    text: "#ffffff",
  },
  lobby: {
    style: "card-stage",
    atmosphere: "competitive",
    focus: "mobile-first-online-cards",
    camera: "center-character",
  },
  modes: [
    {
      id: "ai",
      title: "Contra IA",
      status: "Disponível",
      description: "Modo principal atual com bots, UNO, recompensas e partidas rápidas.",
    },
    {
      id: "online",
      title: "Sala Online",
      status: "Teste",
      description: "Crie uma sala por código, chame amigos e inicie quando todos estiverem prontos.",
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
