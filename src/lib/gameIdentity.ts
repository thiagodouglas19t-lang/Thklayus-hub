export const gameIdentity = {
  appName: "Clash Room",
  brand: "THKLAYUS",
  storage: "thklayus-classic-clash",
  palette: {
    background: "#000000",
    primary: "#8b5cf6",
    primarySoft: "#c4b5fd",
    text: "#ffffff",
  },
  modes: [
    { id: "ai", title: "Contra IA", status: "Disponível", description: "Modo principal atual com bots, missões e recompensas." },
    { id: "casual", title: "Casual", status: "Preparado", description: "Usará a mesma base do jogo, sem duplicar telas." },
    { id: "ranked", title: "Ranqueada", status: "Futuro real", description: "Entra depois de login, perfil e multiplayer." },
  ],
  futureSystems: {
    auth: ["login", "registro", "perfil", "nome único", "avatar/foto"],
    social: ["amigos", "convite por código", "salas privadas", "chat rápido"],
    online: ["multiplayer", "reconexão", "anti-AFK", "histórico de partidas"],
    retention: ["login diário", "ranking", "elo", "conquistas", "baú grátis"],
    monetization: ["skins", "temas AMOLED", "emojis", "molduras", "passe premium", "efeitos visuais"],
  },
};

export const cosmeticRules = {
  noPayToWin: true,
  noSpamAds: true,
  noCasinoHeavy: true,
};
