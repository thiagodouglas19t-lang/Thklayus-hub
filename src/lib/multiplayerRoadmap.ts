export type MultiplayerSystemStatus = "planned" | "prototype" | "ready";

export type MultiplayerSystemPlan = {
  id: string;
  title: string;
  status: MultiplayerSystemStatus;
  priority: 1 | 2 | 3;
  goal: string;
  firstVersion: string[];
  laterVersion: string[];
  risks: string[];
};

export const multiplayerSystemsRoadmap: MultiplayerSystemPlan[] = [
  {
    id: "friends",
    title: "Amigos / Friends",
    status: "planned",
    priority: 1,
    goal: "Permitir adicionar, aceitar, remover e convidar amigos para party.",
    firstVersion: ["ID público do jogador", "lista local/supabase de amigos", "botão convidar para sala"],
    laterVersion: ["status online", "última vez online", "bloquear usuário", "pedidos pendentes"],
    risks: ["precisa de autenticação estável", "precisa evitar spam de convite"],
  },
  {
    id: "invite_by_id",
    title: "Convite por ID",
    status: "planned",
    priority: 1,
    goal: "Convidar jogador usando ID curto, sem depender só de link.",
    firstVersion: ["gerar THK ID", "buscar jogador", "mandar convite para sala"],
    laterVersion: ["convite push", "histórico de convites", "expiração automática"],
    risks: ["ID precisa ser único", "precisa proteger privacidade"],
  },
  {
    id: "persistent_party",
    title: "Party persistente",
    status: "planned",
    priority: 1,
    goal: "Manter grupo mesmo após sair da partida ou trocar modo.",
    firstVersion: ["partyId", "host da party", "membros persistentes", "rejoin automático"],
    laterVersion: ["party voice", "chat da party", "sincronização de modo"],
    risks: ["estado pode ficar velho", "precisa limpar party abandonada"],
  },
  {
    id: "global_matchmaking",
    title: "Matchmaking global",
    status: "planned",
    priority: 2,
    goal: "Procurar jogadores fora da sala atual e formar partida automaticamente.",
    firstVersion: ["fila casual", "fila ranked", "janela de busca", "preencher com bot se demorar"],
    laterVersion: ["MMR real", "região/latência", "balanceamento por nível"],
    risks: ["precisa de servidor confiável", "fila vazia pode frustrar jogador"],
  },
  {
    id: "real_card_sync",
    title: "Sincronização de cartas real",
    status: "planned",
    priority: 2,
    goal: "Garantir que todos vejam a mesma mesa, mão, turno e jogadas.",
    firstVersion: ["gameId", "seed do baralho", "turnIndex", "action log", "validação de jogada"],
    laterVersion: ["rollback", "replay", "reconnect em partida", "spectate"],
    risks: ["cliente não deve decidir tudo sozinho", "precisa validar ação no servidor"],
  },
  {
    id: "match_reconnect",
    title: "Reconnect em partida",
    status: "planned",
    priority: 2,
    goal: "Permitir voltar para a partida depois de queda de internet ou recarregar app.",
    firstVersion: ["salvar lastGameId", "recarregar estado", "voltar como jogador"],
    laterVersion: ["bot assume temporariamente", "timeout de derrota", "troca de host segura"],
    risks: ["estado precisa ser consistente", "não pode duplicar jogador"],
  },
  {
    id: "spectate",
    title: "Spectate",
    status: "planned",
    priority: 3,
    goal: "Permitir assistir partida sem interferir.",
    firstVersion: ["entrar como espectador", "ver mesa", "chat separado"],
    laterVersion: ["modo streamer", "ocultar cartas privadas", "replay"],
    risks: ["não pode revelar mão de jogador", "precisa separar permissões"],
  },
  {
    id: "guilds",
    title: "Clan / Guild System",
    status: "planned",
    priority: 3,
    goal: "Criar grupos permanentes com membros, ranking e identidade própria.",
    firstVersion: ["criar clan", "entrar/sair", "cargo líder/membro", "tag do clan"],
    laterVersion: ["missões de clan", "ranking", "loja do clan", "chat do clan"],
    risks: ["moderação", "nomes ofensivos", "spam"],
  },
  {
    id: "voice_chat",
    title: "Voice Chat",
    status: "planned",
    priority: 3,
    goal: "Permitir voz em party usando provedor adequado ou WebRTC.",
    firstVersion: ["push-to-talk", "mutar/desmutar", "indicador falando", "somente amigos/party"],
    laterVersion: ["salas de voz", "controle de volume", "moderação", "denúncia"],
    risks: ["privacidade", "moderação", "custo/servidor", "permissão de microfone"],
  },
  {
    id: "basic_anti_cheat",
    title: "Anti-cheat básico",
    status: "planned",
    priority: 2,
    goal: "Detectar ações impossíveis e reduzir trapaça casual.",
    firstVersion: ["validar turno", "validar carta jogada", "limitar ações por segundo", "registrar ações suspeitas"],
    laterVersion: ["server-authoritative", "replay auditável", "ban temporário", "score de confiança"],
    risks: ["anti-cheat perfeito não existe", "não pode punir falso positivo"],
  },
];

export function nextMultiplayerPriorities() {
  return multiplayerSystemsRoadmap
    .filter((item) => item.status !== "ready")
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 5);
}
