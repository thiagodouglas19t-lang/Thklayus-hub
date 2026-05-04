import { useMemo, useState } from "react";

type Color = "red" | "blue" | "yellow" | "green";
type CardType = "number" | "skip" | "draw2" | "wild";

type Card = {
  id: number;
  color: Color;
  value: string;
  type: CardType;
};

const colors: Color[] = ["red", "blue", "yellow", "green"];

const colorStyle: Record<Color, string> = {
  red: "from-red-500 to-red-700",
  blue: "from-blue-500 to-blue-700",
  yellow: "from-yellow-300 to-yellow-500 text-black",
  green: "from-emerald-500 to-emerald-700",
};

function makeDeck() {
  let id = 1;
  const deck: Card[] = [];

  colors.forEach((color) => {
    for (let value = 1; value <= 9; value++) {
      deck.push({ id: id++, color, value: String(value), type: "number" });
      deck.push({ id: id++, color, value: String(value), type: "number" });
    }

    deck.push({ id: id++, color, value: "BLOQ", type: "skip" });
    deck.push({ id: id++, color, value: "+2", type: "draw2" });
  });

  colors.forEach((color) => {
    deck.push({ id: id++, color, value: "WILD", type: "wild" });
  });

  return deck.sort(() => Math.random() - 0.5);
}

function drawCards(deck: Card[], amount: number) {
  return {
    taken: deck.slice(0, amount),
    rest: deck.slice(amount),
  };
}

function canPlay(card: Card, top: Card) {
  return card.type === "wild" || card.color === top.color || card.value === top.value;
}

export default function App() {
  const [deck, setDeck] = useState<Card[]>(() => makeDeck());
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [botHand, setBotHand] = useState<Card[]>([]);
  const [discard, setDiscard] = useState<Card[]>([]);
  const [turn, setTurn] = useState<"player" | "bot">("player");
  const [message, setMessage] = useState("Toque em Jogar para começar.");
  const [wins, setWins] = useState(() => Number(localStorage.getItem("colorclash:wins") || 0));
  const [losses, setLosses] = useState(() => Number(localStorage.getItem("colorclash:losses") || 0));
  const [started, setStarted] = useState(false);

  const topCard = discard[discard.length - 1];
  const playableCount = useMemo(() => topCard ? playerHand.filter((card) => canPlay(card, topCard)).length : 0, [playerHand, topCard]);
  const gameOver = started && (playerHand.length === 0 || botHand.length === 0);

  function startGame() {
    const fresh = makeDeck();
    const playerDraw = drawCards(fresh, 7);
    const botDraw = drawCards(playerDraw.rest, 7);
    const first = botDraw.rest.find((card) => card.type === "number") || botDraw.rest[0];
    const rest = botDraw.rest.filter((card) => card.id !== first.id);

    setDeck(rest);
    setPlayerHand(playerDraw.taken);
    setBotHand(botDraw.taken);
    setDiscard([first]);
    setTurn("player");
    setStarted(true);
    setMessage("Sua vez. Jogue uma carta da mesma cor ou número.");
  }

  function drawPlayer() {
    if (!started || turn !== "player" || gameOver || deck.length === 0) return;
    const draw = drawCards(deck, 1);
    setDeck(draw.rest);
    setPlayerHand((hand) => [...hand, ...draw.taken]);
    setTurn("bot");
    setMessage("Você comprou uma carta. Vez do bot.");
    setTimeout(botMove, 700);
  }

  function playCard(card: Card) {
    if (!started || turn !== "player" || gameOver || !topCard) return;
    if (!canPlay(card, topCard)) {
      setMessage("Essa carta não combina com a mesa.");
      return;
    }

    const nextHand = playerHand.filter((item) => item.id !== card.id);
    setPlayerHand(nextHand);
    setDiscard((cards) => [...cards, card]);

    if (nextHand.length === 0) {
      const newWins = wins + 1;
      setWins(newWins);
      localStorage.setItem("colorclash:wins", String(newWins));
      setMessage("Você venceu a partida!");
      return;
    }

    if (card.type === "draw2") {
      const draw = drawCards(deck, 2);
      setDeck(draw.rest);
      setBotHand((hand) => [...hand, ...draw.taken]);
      setMessage("Você jogou +2. Bot comprou cartas. Sua vez continua.");
      return;
    }

    if (card.type === "skip") {
      setMessage("Você bloqueou o bot. Jogue de novo.");
      return;
    }

    setTurn("bot");
    setMessage("Vez do bot.");
    setTimeout(botMove, 800);
  }

  function botMove() {
    setBotHand((currentBotHand) => {
      const currentTop = discard[discard.length - 1];
      if (!currentTop) return currentBotHand;

      const card = currentBotHand.find((item) => canPlay(item, currentTop));

      if (!card) {
        setDeck((currentDeck) => {
          const draw = drawCards(currentDeck, 1);
          setBotHand((hand) => [...hand, ...draw.taken]);
          return draw.rest;
        });
        setTurn("player");
        setMessage("Bot comprou. Sua vez.");
        return currentBotHand;
      }

      const nextBotHand = currentBotHand.filter((item) => item.id !== card.id);
      setDiscard((cards) => [...cards, card]);

      if (nextBotHand.length === 0) {
        const newLosses = losses + 1;
        setLosses(newLosses);
        localStorage.setItem("colorclash:losses", String(newLosses));
        setMessage("Bot venceu a partida.");
        return nextBotHand;
      }

      if (card.type === "draw2") {
        setDeck((currentDeck) => {
          const draw = drawCards(currentDeck, 2);
          setPlayerHand((hand) => [...hand, ...draw.taken]);
          return draw.rest;
        });
        setTurn("bot");
        setMessage("Bot jogou +2. Você comprou cartas.");
        setTimeout(botMove, 900);
        return nextBotHand;
      }

      if (card.type === "skip") {
        setTurn("bot");
        setMessage("Bot te bloqueou.");
        setTimeout(botMove, 900);
        return nextBotHand;
      }

      setTurn("player");
      setMessage("Sua vez.");
      return nextBotHand;
    });
  }

  function CardView({ card, hidden = false, onClick }: { card?: Card; hidden?: boolean; onClick?: () => void }) {
    if (hidden) {
      return <div className="grid h-32 w-20 shrink-0 place-items-center rounded-2xl border-4 border-white/80 bg-gradient-to-br from-zinc-900 to-zinc-700 shadow-xl"><span className="text-2xl font-black text-white">CC</span></div>;
    }

    if (!card) return null;

    return (
      <button onClick={onClick} className={`grid h-32 w-20 shrink-0 place-items-center rounded-2xl border-4 border-white bg-gradient-to-br ${colorStyle[card.color]} p-2 text-white shadow-xl transition active:scale-95`}>
        <div className="grid h-full w-full place-items-center rounded-xl border border-white/40 bg-black/10">
          <span className="text-2xl font-black">{card.value}</span>
        </div>
      </button>
    );
  }

  return (
    <main className="min-h-screen bg-[#1b1209] p-4 text-white">
      <section className="mx-auto max-w-6xl">
        <header className="mb-4 flex items-center justify-between rounded-[2rem] border border-amber-900/40 bg-[#2a190d] p-4 shadow-2xl">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-300">Color Clash</p>
            <h1 className="text-3xl font-black tracking-[-0.06em]">Mesa de Cartas</h1>
          </div>
          <button onClick={startGame} className="rounded-2xl bg-amber-300 px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-black">
            {started ? "Nova partida" : "Jogar"}
          </button>
        </header>

        <div className="rounded-[2.5rem] border-[10px] border-[#4b2b13] bg-[radial-gradient(circle_at_center,#237a3f,#0f4d2b)] p-4 shadow-2xl md:p-6">
          <div className="mb-4 flex items-center justify-between gap-3 rounded-3xl bg-black/20 p-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50">Bot</p>
              <p className="text-lg font-black">Rival</p>
            </div>
            <div className="flex -space-x-12 overflow-hidden pr-10">
              {botHand.slice(0, 7).map((card) => <CardView key={card.id} hidden />)}
            </div>
            <p className="rounded-2xl bg-white px-4 py-2 font-black text-black">{botHand.length}</p>
          </div>

          <div className="grid min-h-56 place-items-center py-6">
            <div className="grid grid-cols-3 items-center gap-5">
              <div className="grid place-items-center rounded-3xl bg-black/20 p-4">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-white/50">Monte</p>
                <div className="grid h-32 w-20 place-items-center rounded-2xl border-4 border-white/80 bg-gradient-to-br from-zinc-900 to-zinc-700 shadow-xl"><span className="text-2xl font-black">{deck.length}</span></div>
              </div>

              <div className="grid place-items-center rounded-3xl bg-black/25 p-4">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-white/50">Mesa</p>
                <CardView card={topCard} />
              </div>

              <div className="rounded-3xl bg-black/20 p-4 text-center">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50">Placar</p>
                <p className="mt-2 text-2xl font-black">{wins}W / {losses}L</p>
                <p className="mt-2 text-sm text-white/70">{turn === "player" ? "Sua vez" : "Vez do bot"}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-black/25 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50">Você</p>
                <p className="text-sm text-white/70">{message}</p>
              </div>
              <button onClick={drawPlayer} disabled={!started || turn !== "player" || gameOver} className="rounded-2xl bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-black disabled:opacity-40">
                Comprar
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {playerHand.map((card) => <CardView key={card.id} card={card} onClick={() => playCard(card)} />)}
            </div>
          </div>
        </div>

        {gameOver && (
          <div className="fixed inset-0 z-30 grid place-items-center bg-black/70 p-5">
            <div className="w-full max-w-md rounded-[2rem] bg-white p-6 text-center text-black">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Partida encerrada</p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.06em]">{playerHand.length === 0 ? "Você venceu" : "Bot venceu"}</h2>
              <button onClick={startGame} className="mt-6 rounded-2xl bg-black px-6 py-4 font-black text-white">Jogar de novo</button>
            </div>
          </div>
        )}

        <div className="mt-4 rounded-3xl border border-amber-900/40 bg-[#2a190d] p-4 text-sm text-amber-100/80">
          Regras: jogue carta da mesma cor ou valor. BLOQ bloqueia o rival. +2 faz o rival comprar. WILD pode ser jogada em qualquer carta.
        </div>
      </section>
    </main>
  );
}
