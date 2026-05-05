import { useMemo, useState } from "react";

type Color = "red" | "blue" | "green" | "yellow";
type Kind = "number" | "block" | "swap" | "plus" | "wild";
type Card = { id: number; color: Color | "wild"; value: string; kind: Kind; power?: number };
type PlayerId = "you" | "nova" | "zero" | "kira";
type Player = { id: PlayerId; name: string; avatar: string; hand: Card[] };

type Props = { onBack?: () => void };

const colors: Color[] = ["red", "blue", "green", "yellow"];
const turnOrder: PlayerId[] = ["you", "nova", "zero", "kira"];
const colorLabel: Record<Color | "wild", string> = { red: "vermelho", blue: "azul", green: "verde", yellow: "amarelo", wild: "livre" };
const colorClass: Record<Color | "wild", string> = {
  red: "card-red",
  blue: "card-blue",
  green: "card-green",
  yellow: "card-yellow",
  wild: "card-black",
};

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeDeck() {
  let id = 1;
  const deck: Card[] = [];
  for (const color of colors) {
    for (let n = 0; n <= 9; n++) deck.push({ id: id++, color, value: String(n), kind: "number" });
    deck.push({ id: id++, color, value: "BLOQ", kind: "block" });
    deck.push({ id: id++, color, value: "+2", kind: "plus", power: 2 });
    deck.push({ id: id++, color, value: "TROCA", kind: "swap" });
  }
  for (let i = 0; i < 4; i++) deck.push({ id: id++, color: "wild", value: "COR", kind: "wild" });
  return shuffle(deck);
}

function nextPlayer(current: PlayerId) {
  const index = turnOrder.indexOf(current);
  return turnOrder[(index + 1) % turnOrder.length];
}

function canPlay(card: Card, top: Card, activeColor: Color) {
  return card.color === "wild" || card.color === activeColor || card.value === top.value;
}

function label(card: Card) {
  if (card.kind === "block") return "⊘";
  if (card.kind === "swap") return "↺";
  return card.value;
}

function GameCard({ card, activeColor, playable, onClick, small }: { card: Card; activeColor: Color; playable?: boolean; onClick?: () => void; small?: boolean }) {
  const tone = card.color === "wild" ? colorClass[activeColor] : colorClass[card.color];
  return (
    <button onClick={onClick} disabled={!onClick} className={`real-card ${small ? "real-card-small" : ""} ${tone} ${playable ? "playable-card" : ""}`}>
      <span className="card-corner card-corner-top">{label(card)}</span>
      <span className="card-center">{label(card)}</span>
      <span className="card-subtitle">{card.color === "wild" ? "CLASH" : colorLabel[card.color]}</span>
      <span className="card-corner card-corner-bottom">{label(card)}</span>
    </button>
  );
}

function Rival({ player, active }: { player?: Player; active: boolean }) {
  return (
    <div className={`rounded-3xl bg-black/35 p-2 text-center shadow-xl ${active ? "ring-2 ring-white" : ""}`}>
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-emerald-400 text-2xl shadow-xl">{player?.avatar || "?"}</div>
      <p className="mt-1 text-xs font-black text-white">{player?.name || "Bot"}</p>
      <div className="mt-1 flex justify-center">
        {Array.from({ length: Math.min(5, player?.hand.length || 5) }).map((_, index) => <span key={index} className="bot-card-back" />)}
      </div>
    </div>
  );
}

export default function ClashCardsV2({ onBack }: Props) {
  const [deck, setDeck] = useState<Card[]>([]);
  const [discard, setDiscard] = useState<Card[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [turn, setTurn] = useState<PlayerId>("you");
  const [activeColor, setActiveColor] = useState<Color>("red");
  const [message, setMessage] = useState("Toque em Jogar para começar.");
  const [winner, setWinner] = useState<Player | null>(null);
  const [choosingColor, setChoosingColor] = useState<Card | null>(null);

  const you = players.find((p) => p.id === "you");
  const top = discard[discard.length - 1];
  const playable = useMemo(() => you && top ? you.hand.filter((card) => canPlay(card, top, activeColor)) : [], [you, top, activeColor]);

  function start() {
    const fresh = makeDeck();
    let rest = fresh;
    const ids: PlayerId[] = ["you", "nova", "zero", "kira"];
    const names: Record<PlayerId, string> = { you: "Você", nova: "Nova", zero: "Zero", kira: "Kira" };
    const avatars: Record<PlayerId, string> = { you: "⚡", nova: "🦊", zero: "🤖", kira: "🐺" };
    const dealt = ids.map((id) => {
      const hand = rest.slice(0, 7);
      rest = rest.slice(7);
      return { id, name: names[id], avatar: avatars[id], hand };
    });
    const first = rest.find((card) => card.color !== "wild") || rest[0];
    setDeck(rest.filter((card) => card.id !== first.id));
    setDiscard([first]);
    setPlayers(dealt);
    setActiveColor(first.color === "wild" ? "red" : first.color);
    setTurn("you");
    setWinner(null);
    setChoosingColor(null);
    setMessage("Sua vez. Jogue uma carta combinando cor ou símbolo.");
  }

  function updateHand(id: PlayerId, hand: Card[]) {
    setPlayers((list) => list.map((p) => p.id === id ? { ...p, hand } : p));
  }

  function draw(id: PlayerId, amount = 1) {
    let taken: Card[] = [];
    setDeck((current) => {
      taken = current.slice(0, amount);
      return current.slice(amount);
    });
    setPlayers((list) => list.map((p) => p.id === id ? { ...p, hand: [...p.hand, ...taken] } : p));
  }

  function finishMove(playerId: PlayerId, card: Card, nextHand: Card[], color: Color) {
    if (nextHand.length === 0) {
      const found = players.find((p) => p.id === playerId) || null;
      setWinner(found);
      setMessage(`${found?.name || "Jogador"} venceu!`);
      return;
    }
    setActiveColor(color);
    const target = nextPlayer(playerId);
    if (card.kind === "block") {
      const skipped = nextPlayer(target);
      setTurn(skipped);
      setMessage(`${target === "you" ? "Você" : target} foi bloqueado.`);
      return;
    }
    if (card.kind === "plus") {
      draw(target, card.power || 2);
      setTurn(nextPlayer(target));
      setMessage(`${target === "you" ? "Você" : target} comprou +${card.power || 2}.`);
      return;
    }
    setTurn(target);
    setMessage(target === "you" ? "Sua vez." : "Bot pensando...");
  }

  function play(card: Card) {
    if (!you || !top || turn !== "you" || winner) return;
    if (!canPlay(card, top, activeColor)) {
      setMessage("Essa carta não combina. Escolha outra ou compre.");
      return;
    }
    const nextHand = you.hand.filter((item) => item.id !== card.id);
    updateHand("you", nextHand);
    if (card.color === "wild") {
      setChoosingColor(card);
      setMessage("Escolha a nova cor.");
      return;
    }
    setDiscard((list) => [...list, card]);
    finishMove("you", card, nextHand, card.color);
  }

  function chooseColor(color: Color) {
    if (!choosingColor || !you) return;
    setDiscard((list) => [...list, choosingColor]);
    setChoosingColor(null);
    finishMove("you", choosingColor, you.hand, color);
  }

  function botPlay(id: PlayerId) {
    const bot = players.find((p) => p.id === id);
    const table = discard[discard.length - 1];
    if (!bot || !table || winner) return;
    const options = bot.hand.filter((card) => canPlay(card, table, activeColor));
    if (!options.length) {
      draw(id);
      setTurn(nextPlayer(id));
      setMessage(`${bot.name} comprou uma carta.`);
      return;
    }
    const chosen = options.find((card) => card.kind === "plus") || options.find((card) => card.kind === "block") || options[0];
    const nextHand = bot.hand.filter((card) => card.id !== chosen.id);
    updateHand(id, nextHand);
    setDiscard((list) => [...list, chosen]);
    finishMove(id, chosen, nextHand, chosen.color === "wild" ? "red" : chosen.color);
  }

  if (turn !== "you" && players.length && !winner) {
    window.setTimeout(() => botPlay(turn), 550);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-md flex-col overflow-hidden bg-gradient-to-b from-[#201008] via-[#08633b] to-[#111] px-3 py-4">
        <header className="flex items-center justify-between">
          <div className="flex gap-2">
            {onBack && <button onClick={onBack} className="rounded-full bg-black/40 px-3 py-2">←</button>}
            <button onClick={start} className="rounded-full bg-white px-4 py-2 font-black text-black">{players.length ? "Nova" : "Jogar"}</button>
          </div>
          <div className="rounded-full bg-black/40 px-3 py-2 text-xs font-black">Arena Clash</div>
        </header>

        <div className="mt-3 grid grid-cols-3 items-start gap-2">
          <Rival player={players.find((p) => p.id === "nova")} active={turn === "nova"} />
          <Rival player={players.find((p) => p.id === "zero")} active={turn === "zero"} />
          <Rival player={players.find((p) => p.id === "kira")} active={turn === "kira"} />
        </div>

        <div className="relative mt-5 flex flex-1 items-center justify-center rounded-[2rem] border border-white/10 bg-black/20 shadow-2xl">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 rounded-3xl bg-black/40 px-4 py-3 text-center">
            <p className="text-[10px] text-white/60">MONTE</p>
            <strong className="text-2xl">{deck.length}</strong>
          </div>
          <div className="scale-110">{top && <GameCard card={top} activeColor={activeColor} small />}</div>
          <button onClick={() => draw("you")} disabled={turn !== "you" || !players.length} className="absolute right-4 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full border-4 border-white bg-gradient-to-br from-orange-300 to-red-700 font-black shadow-2xl">Puxar</button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-2xl bg-white px-4 py-2 text-center text-xs font-black text-black">{winner ? `${winner.name} venceu` : message}</div>
        </div>

        {choosingColor && <div className="mt-3 rounded-3xl bg-black/70 p-4"><p className="mb-3 text-center font-black">Escolha uma cor</p><div className="grid grid-cols-4 gap-2">{colors.map((color) => <button key={color} onClick={() => chooseColor(color)} className={`h-12 rounded-2xl ${colorClass[color]}`} />)}</div></div>}

        <div className="mt-3 rounded-[2rem] bg-black/35 p-3">
          <div className="mb-2 flex items-center justify-center gap-2"><div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-emerald-400">⚡</div><strong>Você</strong><span className="text-xs text-white/50">{you?.hand.length || 0} cartas</span></div>
          <div className="flex gap-2 overflow-x-auto pb-2 pt-4">
            {you?.hand.map((card) => <GameCard key={card.id} card={card} activeColor={activeColor} playable={top ? canPlay(card, top, activeColor) : false} onClick={() => play(card)} />)}
            {!you && <p className="w-full py-10 text-center text-sm text-white/70">Toque em Jogar para começar.</p>}
          </div>
        </div>
      </section>
    </main>
  );
}
