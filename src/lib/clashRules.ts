export type ClashColor = "red" | "blue" | "green" | "yellow";
export type ClashKind = "number" | "block" | "swap" | "plus" | "wild";

export type ClashCard = {
  id: number;
  color: ClashColor | "wild";
  value: string;
  kind: ClashKind;
  power?: number;
};

export type ClashPlayerId = "you" | "nova" | "zero" | "kira";

export type ClashMoveValidation = {
  ok: boolean;
  reason?: string;
};

export const clashColors: ClashColor[] = ["red", "blue", "green", "yellow"];

export const clashColorLabel: Record<ClashColor | "wild", string> = {
  red: "vermelho",
  blue: "azul",
  green: "verde",
  yellow: "amarelo",
  wild: "livre",
};

export function canPlayCard(card: ClashCard, top: ClashCard, activeColor: ClashColor): boolean {
  if (card.color === "wild") return true;
  if (card.color === activeColor) return true;
  if (card.value === top.value) return true;
  if (card.kind !== "number" && card.kind === top.kind) return true;
  return false;
}

export function validateMove(card: ClashCard, top: ClashCard | undefined, activeColor: ClashColor, isPlayerTurn: boolean): ClashMoveValidation {
  if (!isPlayerTurn) return { ok: false, reason: "Ainda não é sua vez." };
  if (!top) return { ok: false, reason: "Mesa ainda não foi iniciada." };
  if (canPlayCard(card, top, activeColor)) return { ok: true };
  return {
    ok: false,
    reason: `Carta inválida. Jogue ${clashColorLabel[activeColor]}, mesmo número/símbolo ou coringa.`,
  };
}

export function getNextTurn<T extends string>(order: T[], current: T, direction: 1 | -1, steps = 1): T {
  if (!order.length) return current;
  const index = Math.max(0, order.indexOf(current));
  return order[(index + direction * steps + order.length * 4) % order.length];
}

export function chooseBestColor(hand: ClashCard[]): ClashColor {
  const score = clashColors
    .map((color) => ({ color, count: hand.filter((card) => card.color === color).length }))
    .sort((a, b) => b.count - a.count);
  return score[0]?.color || clashColors[Math.floor(Math.random() * clashColors.length)];
}

export function chooseBotMove<T extends { hand: ClashCard[]; style: "aggressive" | "smart" | "chaos" | "you" }>(bot: T, top: ClashCard, activeColor: ClashColor) {
  const options = bot.hand.filter((card) => canPlayCard(card, top, activeColor));
  if (!options.length) return null;
  const countColor = (color: ClashColor) => bot.hand.filter((card) => card.color === color).length;
  if (bot.hand.length === 1) return options[0];
  if (bot.style === "aggressive") return options.find((card) => card.kind === "plus") || options.find((card) => card.kind === "block") || options.find((card) => card.kind === "swap") || options[0];
  if (bot.style === "smart") {
    return [...options].sort((a, b) => {
      const score = (card: ClashCard) => (card.kind !== "number" ? 2 : 0) + (card.color !== "wild" ? countColor(card.color) : 1);
      return score(b) - score(a);
    })[0];
  }
  if (bot.style === "chaos") return options.find((card) => card.color === "wild") || options[Math.floor(Math.random() * options.length)];
  return options.find((card) => card.color === activeColor) || options[0];
}

export function explainPlayableCards(hand: ClashCard[], top: ClashCard | undefined, activeColor: ClashColor) {
  if (!top) return [];
  return hand.filter((card) => canPlayCard(card, top, activeColor));
}

export function createRuleDebug(top: ClashCard | undefined, activeColor: ClashColor) {
  if (!top) return "Sem carta na mesa.";
  return `Topo: ${top.value} / cor ativa: ${clashColorLabel[activeColor]}.`;
}
