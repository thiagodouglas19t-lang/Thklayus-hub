import { useEffect, useMemo, useState } from "react";
import ArenaBoost from "./components/ArenaBoost";

type Color = "red" | "blue" | "yellow" | "green";
type CardType = "number" | "skip" | "draw2" | "reverse" | "wild";
type Card = { id: number; color: Color; value: string; type: CardType };
type PlayerId = "you" | "bot1" | "bot2";
type Player = { id: PlayerId; name: string; hand: Card[] };

type UnoGameProps = {
  onBack?: () => void;
};

const colors: Color[] = ["red", "blue", "yellow", "green"];
const playerOrder: PlayerId[] = ["you", "bot1", "bot2"];
const colorNames: Record<Color, string> = { red: "vermelho", blue: "azul", yellow: "amarelo", green: "verde" };
const colorClass: Record<Color, string> = {
  red: "from-red-500 to-red-900 border-red-200/30",
  blue: "from-blue-500 to-blue-900 border-blue-200/30",
  yellow: "from-yellow-300 to-amber-600 border-yellow-100/40 text-black",
  green: "from-emerald-400 to-emerald-900 border-emerald-100/30",
};
const store = "thklayus-color-clash";

function readNumber(key: string) {
  return Number(localStorage.getItem(`${store}:${key}`) || 0);
}

function writeNumber(key: string, value: number) {
  localStorage.setItem(`${store}:${key}`, String(value));
}

function makeDeck() {
  let id = 1;
  const deck: Card[] = [];
  colors.forEach((color) => {
    for (let n = 0; n <= 9; n++) deck.push({ id: id++, color, value: String(n), type: "number" });
    deck.push({ id: id++, color, value: "BLOQ", type: "skip" });
    deck.push({ id: id++, color, value: "+2", type: "draw2" });
    deck.push({ id: id++, color, value: "REV", type: "reverse" });
  });
  for (let i = 0; i < 4; i++) deck.push({ id: id++, color: colors[i], value: "WILD", type: "wild" });
  return deck.sort(() => Math.random() - 0.5);
}

function draw(cards: Card[], amount: number) {
  return { taken: cards.slice(0, amount), rest: cards.slice(amount) };
}

function canPlay(card: Card, top: Card) {
  return card.type === "wild" || card.color === top.color || card.value === top.value;
}

function nextPlayer(current: PlayerId, direction: 1 | -1) {
  const index = playerOrder.indexOf(current);
  return playerOrder[(index + direction + playerOrder.length) % playerOrder.length];
}

function playerName(id: PlayerId) {
  if (id === "you") return "Você";
  return id === "bot1" ? "Bot Shadow" : "Bot Rimuru";
}

function chooseBotColor(hand: Card[]) {
  return colors
    .map((color) => ({ color, total: hand.filter((card) => card.color === color).length }))
    .sort((a, b) => b.total - a.total)[0]?.color || "red";
}

function CardView({ card, onClick, playable, small = false }: { card: Card; onClick?: () => void; playable?: boolean; small?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`${small ? "h-24 w-16" : "h-32 w-24"} shrink-0 rounded-2xl border bg-gradient-to-br p-2 text-left shadow-2xl transition ${card.type === "wild" ? "border-white/30 from-zinc-950 via-violet-700 to-white text-white" : colorClass[card.color]} ${playable ? "-translate-y-2 ring-2 ring-white/70" : "opacity-80"}`}
    >
      <div className="flex h-full flex-col justify-between rounded-xl border border-white/20 bg-black/15 p-2">
        <span className="text-xs font-black uppercase tracking-widest">{card.type === "wild" ? "Coringa" : colorNames[card.color]}</span>
        <strong className="text-center text-2xl font-black">{card.value}</strong>
        <span className="text-right text-xs font-black">CC</span>
      </div>
    </button>
  );
}

export default function UnoGame({ onBack }: UnoGameProps) {
  const [deck, setDeck] = useState<Card[]>([]);
  const [discard, setDiscard] = useState<Card[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [turn, setTurn] = useState<PlayerId>("you");
  const [direction, setDirection] = useState<1 | -1>(1);
  const [message, setMessage] = useState("Toque em Jogar para começar o Color Clash.");
  const [started, setStarted] = useState(false);
  const [winner, setWinner] = useState<PlayerId | null>(null);
  const [pendingWild, setPendingWild] = useState<Card | null>(null);
  const [combo, setCombo] = useState(0);
  const [coins, setCoins] = useState(() => readNumber("coins"));
  const [xp, setXp] = useState(() => readNumber("xp"));
  const [wins, setWins] = useState(() => readNumber("wins"));
  const [losses, setLosses] = useState(() => readNumber("losses"));
  const [log, setLog] = useState<string[]>([]);

  const you = players.find((player) => player.id === "you");
  const topCard = discard[discard.length - 1];
  const playable = useMemo(() => (you && topCard ? you.hand.filter((card) => canPlay(card, topCard)) : []), [you, topCard]);
  const level = Math.floor(xp / 100) + 1;
  const gameOver = Boolean(winner);

  function addLog(text: string) {
    setLog((current) => [text, ...current].slice(0, 6));
  }

  function saveProgress(nextCoins = coins, nextXp = xp, nextWins = wins, nextLosses = losses) {
    writeNumber("coins", nextCoins);
    writeNumber("xp", nextXp);
    writeNumber("wins", nextWins);
    writeNumber("losses", nextLosses);
  }

  function reward(c: number, x: number) {
    const nextCoins = coins + c;
    const nextXp = xp + x;
    setCoins(nextCoins);
    setXp(nextXp);
    saveProgress(nextCoins, nextXp);
  }

  function startGame() {
    const fresh = makeDeck();
    const p1 = draw(fresh, 7);
    const p2 = draw(p1.rest, 7);
    const p3 = draw(p2.rest, 7);
    const first = p3.rest.find((card) => card.type === "number") || p3.rest[0];
    setDeck(p3.rest.filter((card) => card.id !== first.id));
    setDiscard([first]);
    setPlayers([
      { id: "you", name: "Você", hand: p1.taken },
      { id: "bot1", name: "Bot Shadow", hand: p2.taken },
      { id: "bot2", name: "Bot Rimuru", hand: p3.taken },
    ]);
    setTurn("you");
    setDirection(1);
    setMessage("Sua vez. Jogue uma carta da mesma cor ou valor.");
    setStarted(true);
    setWinner(null);
    setPendingWild(null);
    setCombo(0);
    setLog([`Mesa começou com ${first.value} ${colorNames[first.color]}`]);
  }

  function setHand(id: PlayerId, hand: Card[]) {
    setPlayers((current) => current.map((player) => (player.id === id ? { ...player, hand } : player)));
  }

  function addCards(id: PlayerId, cards: Card[]) {
    setPlayers((current) => current.map((player) => (player.id === id ? { ...player, hand: [...player.hand, ...cards] } : player)));
  }

  function drawFromDeck(id: PlayerId, amount: number) {
    let taken: Card[] = [];
    setDeck((current) => {
      const result = draw(current, amount);
      taken = result.taken;
      return result.rest;
    });
    if (taken.length) {
      addCards(id, taken);
      addLog(`${playerName(id)} comprou ${taken.length} carta(s).`);
    }
    return taken;
  }

  function finishGame(id: PlayerId) {
    setWinner(id);
    if (id === "you") {
      const nextWins = wins + 1;
      const nextCoins = coins + 35 + combo * 2;
      const nextXp = xp + 80 + combo * 3;
      setWins(nextWins);
      setCoins(nextCoins);
      setXp(nextXp);
      saveProgress(nextCoins, nextXp, nextWins, losses);
      setMessage("Você venceu o Color Clash! +moedas e +XP.");
    } else {
      const nextLosses = losses + 1;
      const nextXp = xp + 12;
      setLosses(nextLosses);
      setXp(nextXp);
      saveProgress(coins, nextXp, wins, nextLosses);
      setMessage(`${playerName(id)} venceu. Tenta de novo.`);
    }
  }

  function advanceAfterCard(playerId: PlayerId, card: Card, nextHand: Card[]) {
    if (nextHand.length === 0) return finishGame(playerId);
    let activeDirection = direction;
    if (card.type === "reverse") {
      activeDirection = direction === 1 ? -1 : 1;
      setDirection(activeDirection);
      addLog(`${playerName(playerId)} inverteu o sentido.`);
    }
    const target = nextPlayer(playerId, activeDirection);
    if (card.type === "draw2") {
      drawFromDeck(target, 2);
      const skipped = nextPlayer(target, activeDirection);
      setTurn(skipped);
      setMessage(`${playerName(target)} comprou +2 e perdeu a vez.`);
      return;
    }
    if (card.type === "skip") {
      const skipped = nextPlayer(target, activeDirection);
      setTurn(skipped);
      setMessage(`${playerName(target)} foi bloqueado.`);
      return;
    }
    setTurn(target);
    setMessage(target === "you" ? "Sua vez." : `Vez de ${playerName(target)}.`);
  }

  function playCard(card: Card) {
    if (!started || gameOver || pendingWild || turn !== "you" || !you || !topCard) return;
    if (!canPlay(card, topCard)) {
      setMessage("Essa carta não combina com a mesa.");
      return;
    }
    const nextHand = you.hand.filter((item) => item.id !== card.id);
    setHand("you", nextHand);
    setCombo((current) => current + 1);
    reward(1 + Math.floor(combo / 3), 4 + combo);
    if (card.type === "wild") {
      setPendingWild(card);
      setMessage("Escolha uma cor para o coringa.");
      return;
    }
    setDiscard((current) => [...current, card]);
    addLog(`Você jogou ${card.value} ${colorNames[card.color]}.`);
    advanceAfterCard("you", card, nextHand);
  }

  function chooseWild(color: Color) {
    if (!pendingWild || !you) return;
    const chosen = { ...pendingWild, color };
    setDiscard((current) => [...current, chosen]);
    setPendingWild(null);
    addLog(`Você escolheu ${colorNames[color]}.`);
    advanceAfterCard("you", chosen, you.hand);
  }

  function drawPlayer() {
    if (!started || gameOver || turn !== "you" || pendingWild) return;
    if (playable.length > 0) {
      setMessage("Você ainda tem carta jogável. Jogue antes de comprar.");
      return;
    }
    drawFromDeck("you", 1);
    setCombo(0);
    setTurn(nextPlayer("you", direction));
    setMessage("Você comprou uma carta.");
  }

  function botMove(id: PlayerId) {
    const bot = players.find((player) => player.id === id);
    const top = discard[discard.length - 1];
    if (!bot || !top || winner || pendingWild) return;
    const options = bot.hand.filter((card) => canPlay(card, top));
    if (!options.length) {
      drawFromDeck(id, 1);
      setTurn(nextPlayer(id, direction));
      setMessage(`${playerName(id)} comprou carta.`);
      return;
    }
    const chosen = options.find((card) => card.type === "draw2") || options.find((card) => card.type === "skip") || options[0];
    const nextHand = bot.hand.filter((card) => card.id !== chosen.id);
    const finalCard = chosen.type === "wild" ? { ...chosen, color: chooseBotColor(nextHand) } : chosen;
    setHand(id, nextHand);
    setDiscard((current) => [...current, finalCard]);
    addLog(`${playerName(id)} jogou ${finalCard.value}.`);
    advanceAfterCard(id, finalCard, nextHand);
  }

  useEffect(() => {
    if (!started || gameOver || pendingWild || turn === "you") return;
    const timer = window.setTimeout(() => botMove(turn), 850);
    return () => window.clearTimeout(timer);
  }, [turn, started, gameOver, pendingWild, players, discard]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-5 text-white sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-black/45 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-violet-300">THKLAYUS Arena</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Color Clash</h1>
          <p className="mt-2 max-w-2xl text-zinc-400">Modo principal estilo UNO: combine cor ou valor, use cartas especiais e vença os bots.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {onBack && <button onClick={onBack} className="rounded-2xl border border-white/15 px-5 py-3 font-bold text-white">Hub</button>}
          <button onClick={startGame} className="pro-button rounded-2xl px-5 py-3 font-black">{started ? "Reiniciar" : "Jogar Color Clash"}</button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="glass-card rounded-[2rem] p-5">
          <div className="grid gap-4 md:grid-cols-3">
            {players.filter((player) => player.id !== "you").map((player) => (
              <div key={player.id} className={`rounded-3xl border p-4 ${turn === player.id ? "border-violet-300/50 bg-violet-500/10" : "border-white/10 bg-white/[0.03]"}`}>
                <p className="text-sm text-zinc-400">{player.name}</p>
                <strong className="text-2xl text-white">{player.hand.length} cartas</strong>
              </div>
            ))}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-zinc-400">Sentido</p>
              <strong className="text-2xl text-white">{direction === 1 ? "↻" : "↺"}</strong>
            </div>
          </div>

          <div className="my-6 grid items-center gap-5 md:grid-cols-[1fr_160px_1fr]">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-5 text-center">
              <p className="text-sm text-zinc-400">Monte</p>
              <strong className="text-4xl text-white">{deck.length}</strong>
              <p className="text-xs text-zinc-500">cartas</p>
            </div>
            <div className="flex justify-center">{topCard ? <CardView card={topCard} small /> : <div className="h-24 w-16 rounded-2xl border border-white/10 bg-white/5" />}</div>
            <div className={`rounded-3xl border p-5 ${turn === "you" ? "border-emerald-300/40 bg-emerald-400/10" : "border-white/10 bg-black/30"}`}>
              <p className="text-sm text-zinc-400">Turno atual</p>
              <strong className="text-2xl text-white">{playerName(turn)}</strong>
              <p className="mt-2 text-sm text-zinc-300">{message}</p>
            </div>
          </div>

          {pendingWild && (
            <div className="mb-5 rounded-3xl border border-violet-300/30 bg-violet-500/10 p-4">
              <p className="mb-3 font-bold text-white">Escolha a cor do coringa:</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {colors.map((color) => <button key={color} onClick={() => chooseWild(color)} className={`rounded-2xl bg-gradient-to-br px-4 py-3 font-black ${colorClass[color]}`}>{colorNames[color]}</button>)}
              </div>
            </div>
          )}

          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-black">Sua mão</h2>
              <button onClick={drawPlayer} disabled={!started || turn !== "you" || playable.length > 0 || gameOver} className="rounded-2xl border border-white/15 px-4 py-2 font-bold text-white disabled:opacity-40">Comprar carta</button>
            </div>
            <div className="flex gap-3 overflow-x-auto px-1 pb-5 pt-3">
              {you?.hand.map((card) => <CardView key={card.id} card={card} onClick={() => playCard(card)} playable={topCard ? canPlay(card, topCard) : false} />)}
              {!you?.hand.length && <p className="text-zinc-400">Inicie uma partida.</p>}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-4">
            <h3 className="font-black text-white">Log da partida</h3>
            <div className="mt-3 space-y-2 text-sm text-zinc-400">
              {log.map((item) => <p key={item}>• {item}</p>)}
            </div>
          </div>
        </section>

        <ArenaBoost level={level} xp={xp} coins={coins} wins={wins} losses={losses} combo={combo} deckCount={deck.length} handCount={you?.hand.length || 0} playableCount={playable.length} started={started} />
      </div>
    </main>
  );
}
