export type ThkEventType =
  | "screen_view"
  | "button_click"
  | "match_started"
  | "match_finished"
  | "shop_opened"
  | "online_opened"
  | "room_created"
  | "room_joined"
  | "error"
  | "performance";

export type ThkEvent = {
  id: string;
  type: ThkEventType;
  label: string;
  createdAt: number;
  value?: number;
  meta?: Record<string, string | number | boolean | null>;
};

export type ThkInsight = {
  id: string;
  level: "info" | "warning" | "success" | "danger";
  title: string;
  message: string;
  actionLabel?: string;
};

const STORAGE_KEY = "thklayus:thkCore:events";
const MAX_EVENTS = 160;

function uid() {
  return crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function loadThkEvents(): ThkEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as ThkEvent[] : [];
  } catch {
    return [];
  }
}

export function saveThkEvents(events: ThkEvent[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-MAX_EVENTS)));
}

export function trackThkEvent(type: ThkEventType, label: string, options?: { value?: number; meta?: ThkEvent["meta"] }) {
  const event: ThkEvent = {
    id: uid(),
    type,
    label,
    value: options?.value,
    meta: options?.meta,
    createdAt: Date.now(),
  };
  saveThkEvents([...loadThkEvents(), event]);
  return event;
}

function count(events: ThkEvent[], type: ThkEventType, label?: string) {
  return events.filter((event) => event.type === type && (!label || event.label === label)).length;
}

function recent(events: ThkEvent[], minutes: number) {
  const since = Date.now() - minutes * 60 * 1000;
  return events.filter((event) => event.createdAt >= since);
}

export function analyzeThkCore(events = loadThkEvents()): ThkInsight[] {
  const insights: ThkInsight[] = [];
  const last30 = recent(events, 30);
  const errors = last30.filter((event) => event.type === "error");
  const onlineViews = count(events, "online_opened");
  const shopViews = count(events, "shop_opened");
  const matchesStarted = count(events, "match_started");
  const matchesFinished = count(events, "match_finished");
  const roomsCreated = count(events, "room_created");
  const roomsJoined = count(events, "room_joined");
  const slowPerf = last30.filter((event) => event.type === "performance" && Number(event.value || 0) > 1800);

  if (events.length < 8) {
    insights.push({
      id: "learning",
      level: "info",
      title: "THK Core aprendendo",
      message: "Ainda preciso de mais ações para analisar o jogador com precisão.",
    });
  }

  if (errors.length >= 2) {
    insights.push({
      id: "errors",
      level: "danger",
      title: "Erros recentes detectados",
      message: `${errors.length} erros apareceram nos últimos 30 minutos. Ative modo seguro e revise logs.`,
      actionLabel: "Ver erros",
    });
  }

  if (slowPerf.length >= 2) {
    insights.push({
      id: "performance",
      level: "warning",
      title: "Possível lentidão",
      message: "O app detectou carregamentos lentos. Reduza efeitos pesados ou use modo desempenho.",
      actionLabel: "Ativar modo leve",
    });
  }

  if (onlineViews >= 3 && roomsCreated + roomsJoined === 0) {
    insights.push({
      id: "online-friction",
      level: "warning",
      title: "Online com atrito",
      message: "O jogador abre o online, mas não entra em sala. O botão de criar sala precisa ficar mais chamativo.",
      actionLabel: "Melhorar online",
    });
  }

  if (shopViews >= 3) {
    insights.push({
      id: "shop-interest",
      level: "success",
      title: "Interesse na loja",
      message: "A loja está chamando atenção. Vale testar oferta diária, item raro ou desconto temporário.",
      actionLabel: "Criar oferta",
    });
  }

  if (matchesStarted >= 3 && matchesFinished === 0) {
    insights.push({
      id: "match-abandon",
      level: "warning",
      title: "Partidas não finalizadas",
      message: "O jogador inicia partidas mas não termina. Pode existir confusão, bug ou partida longa demais.",
      actionLabel: "Ajustar partida",
    });
  }

  if (matchesFinished >= 3) {
    insights.push({
      id: "mission-ready",
      level: "success",
      title: "Missão automática disponível",
      message: "O jogador já tem atividade suficiente para receber missões diárias personalizadas.",
      actionLabel: "Gerar missão",
    });
  }

  if (!insights.length) {
    insights.push({
      id: "healthy",
      level: "success",
      title: "App saudável",
      message: "Nenhum problema forte detectado agora. Continue coletando dados.",
    });
  }

  return insights.slice(0, 5);
}

export function installThkCoreErrorTracker() {
  if (typeof window === "undefined") return;
  if ((window as unknown as { __thkCoreInstalled?: boolean }).__thkCoreInstalled) return;
  (window as unknown as { __thkCoreInstalled?: boolean }).__thkCoreInstalled = true;

  window.addEventListener("error", (event) => {
    trackThkEvent("error", event.message || "Erro desconhecido", { meta: { source: event.filename || null } });
  });

  window.addEventListener("unhandledrejection", (event) => {
    trackThkEvent("error", "Promise rejeitada", { meta: { reason: String(event.reason || "sem motivo") } });
  });
}

export function measureThkLoad(label: string, startedAt: number) {
  trackThkEvent("performance", label, { value: Date.now() - startedAt });
}
