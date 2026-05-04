import { useMemo, useState } from "react";

type Color = "red" | "blue" | "yellow" | "green";
type CardType = "number" | "skip" | "draw2" | "wild";

type Card = { id: number; color: Color; value: string; type: CardType };

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
  colors.forEach((color) => deck.push({ id: id++, color, value: "WILD", type: "wild" }));
  return deck.sort(() => Math.random() - 0.5);
}

function drawCards(deck: Card[], amount: number) {
  return { taken: deck.slice(0, amount), rest: deck.slice(amount) };
}

function canPlay(card: Card, top: Card) {
  return card.type === "wild" || card.color === top.color || card.value === top.value;
}

function playSound(type: "card" | "win" | "bad") {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const audio = new AudioContextClass();
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.frequency.value = type === "win" ? 720 : type === "bad" ? 160 : 420;
    gain.gain.value = 0.035;
    osc.start();
    osc.stop(audio.currentTime + 0.08);
  } catch {
    // Som é opcional. Se o navegador bloquear, o jogo continua normal.
  }
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
  const [coins, setCoins] = useState(() => Number(localStorage.getItem("colorclash:coins") || 0));
  const [xp, setXp] = useState(() => Number(localStorage.getItem("colorclash:xp") || 0));
  const [playerName, setPlayerName] = useState(() => localStorage.getItem("colorclash:name") || "Jogador");
  const [started, setStarted] = useState(false);
  const [lastPlayed, setLastPlayed] = useState<Card | null>(null);
  const [pulse, setPulse] = useState(false);

  const topCard = discard[discard.length - 1];
  const playableCount = useMemo(() => topCard ? playerHand.filter((card) => canPlay(card, topCard)).length : 0, [playerHand, topCard]);
  const gameOver = started && (playerHand.length === 0 || botHand.length === 0);
  const level = Math.floor(xp / 100) + 1;
  const levelProgress = xp % 100;

  function reward(addCoins: number, addXp: number) {
    const nextCoins = coins + addCoins;
    const nextXp = xp + addXp;
    setCoins(nextCoins);
    setXp(nextXp);
    localStorage.setItem("colorclash:coins", String(nextCoins));
    localStorage.setItem("colorclash:xp", String(nextXp));
  }

  function saveName(name: string) {
    setPlayerName(name || "Jogador");
    localStorage.setItem("colorclash:name", name || "Jogador");
  }

  function animateCard(card: Card) {
    setLastPlayed(card);
    setPulse(true);
    window.setTimeout(() => setPulse(false), 260);
  }

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
    setLastPlayed(null);
    setMessage("Sua vez. Jogue uma carta da mesma cor ou número.");
  }

  function drawPlayer() {
    if (!started || turn !== "player" || gameOver || deck.length === 0) return;
    const draw = drawCards(deck, 1);
    setDeck(draw.rest);
    setPlayerHand((hand) => [...hand, ...draw.taken]);
    setTurn("bot");
    setMessage("Você comprou uma carta. Vez do bot.");
    playSound("card");
    setTimeout(botMove, 700);
  }

  function playCard(card: Card) {
    if (!started || turn !== "player" || gameOver || !topCard) return;
    if (!canPlay(card, topCard)) {
      setMessage("Essa carta não combina com a mesa.");
      playSound("bad");
      return;
    }
    playSound("card");
    animateCard(card);

    const nextHand = playerHand.filter((item) => item.id !== card.id);
    setPlayerHand(nextHand);
    setDiscard((cards) => [...cards, card]);
    reward(1, 4);

    if (nextHand.length === 0) {
      const newWins = wins + 1;
      setWins(newWins);
      localStorage.setItem("colorclash:wins", String(newWins));
      reward(35, 60);
      setMessage("Você venceu a partida!");
      playSound("win");
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

      playSound("card");
      animateCard(card);
      const nextBotHand = currentBotHand.filter((item) => item.id !== card.id);
      setDiscard((cards) => [...cards, card]);

      if (nextBotHand.length === 0) {
        const newLosses = losses + 1;
        setLosses(newLosses);
        localStorage.setItem("colorclash:losses", String(newLosses));
        setMessage("Bot venceu a partida.");
        playSound("bad");
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

  function CardView({ card, hidden = false, onClick, playable = true }: { card?: Card; hidden?: boolean; onClick?: () => void; playable?: boolean }) {
    if (hidden) {
      return <div className="grid h-32 w-20 shrink-0 place-items-center rounded-2xl border-4 border-white/80 bg-gradient-to-br from-[#1c140d] to-[#5a3318] shadow-xl"><span className="text-2xl font-black text-amber-200">CC</span></div>;
    }
    if (!card) return null;
    return (
      <button onClick={onClick} className={`grid h-32 w-20 shrink-0 place-items-center rounded-2xl border-4 border-white bg-gradient-to-br ${colorStyle[card.color]} p-2 text-white shadow-xl transition ${playable ? "active:scale-95 hover:-translate-y-2" : "opacity-45 grayscale"}`}>
        <div className="grid h-full w-full place-items-center rounded-xl border border-white/40 bg-black/10">
          <span className="text-2xl font-black">{card.value}</span>
        </div>
      </button>
    );
  }

  return (
    <main className="min-h-screen bg-[#130c06] p-4 text-white">
      <section className="mx-auto max-w-6xl">
        <header className="mb-4 flex items-center justify-between rounded-[2rem] border border-amber-900/40 bg-[#2a190d] p-4 shadow-2xl">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-300">Color Clash</p>
            <h1 className="text-3xl font-black tracking-[-0.06em]">Mesa de Cartas</h1>
          </div>
          <button onClick={startGame} className="rounded-2xl bg-amber-300 px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-black">{started ? "Nova partida" : "Jogar"}</button>
        </header>

        <div className="mb-4 grid gap-3 md:grid-cols-4">
          <div className="rounded-3xl bg-[#2a190d] p-4"><p className="text-xs text-amber-200/60">Nome</p><input value={playerName} onChange={(e) => saveName(e.target.value)} className="mt-1 w-full bg-transparent text-xl font-black outline-none" /></div>
          <div className="rounded-3xl bg-[#2a190d] p-4"><p className="text-xs text-amber-200/60">Level</p><p className="text-2xl font-black">{level}</p><div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-amber-300" style={{ width: `${levelProgress}%` }} /></div></div>
          <div className="rounded-3xl bg-[#2a190d] p-4"><p className="text-xs text-amber-200/60">Moedas</p><p className="text-2xl font-black">🪙 {coins}</p></div>
          <div className="rounded-3xl bg-[#2a190d] p-4"><p className="text-xs text-amber-200/60">Placar</p><p className="text-2xl font-black">{wins}W / {losses}L</p></div>
        </div>

        <div className="rounded-[2.5rem] border-[10px] border-[#4b2b13] bg-[radial-gradient(circle_at_center,#2f8a4b,#0e4828)] p-4 shadow-2xl md:p-6">
          <div className="mb-4 flex items-center justify-between gap-3 rounded-3xl bg-black/20 p-3">
            <div><p className="text-xs font-black uppercase tracking-[0.2em] text-white/50">Bot</p><p className="text-lg font-black">Rival</p></div>
            <div className="flex -space-x-12 overflow-hidden pr-10">{botHand.slice(0, 7).map((card) => <CardView key={card.id} hidden />)}</div>
            <p className="rounded-2xl bg-white px-4 py-2 font-black text-black">{botHand.length}</p>
          </div>

          <div className="grid min-h-56 place-items-center py-6">
            <div className="grid grid-cols-3 items-center gap-5">
              <div className="grid place-items-center rounded-3xl bg-black/20 p-4"><p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-white/50">Monte</p><div className="grid h-32 w-20 place-items-center rounded-2xl border-4 border-white/80 bg-gradient-to-br from-[#1c140d] to-[#5a3318] shadow-xl"><span className="text-2xl font-black">{deck.length}</span></div></div>
              <div className={`grid place-items-center rounded-3xl bg-black/25 p-4 transition ${pulse ? "scale-110" : "scale-100"}`}><p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-white/50">Mesa</p><CardView card={topCard} /></div>
              <div className="rounded-3xl bg-black/20 p-4 text-center"><p className="text-xs font-black uppercase tracking-[0.2em] text-white/50">Turno</p><p className="mt-2 text-2xl font-black">{turn === "player" ? playerName : "Rival"}</p><p className="mt-2 text-sm text-white/70">Jogáveis: {playableCount}</p></div>
            </div>
          </div>

          <div className="rounded-3xl bg-black/25 p-4">
            <div className="mb-3 flex items-center justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-white/50">{playerName}</p><p className="text-sm text-white/70">{message}</p>{lastPlayed && <p className="mt-1 text-xs text-amber-200">Última carta: {lastPlayed.value}</p>}</div><button onClick={drawPlayer} disabled={!started || turn !== "player" || gameOver} className="rounded-2xl bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-black disabled:opacity-40">Comprar</button></div>
            <div className="flex gap-3 overflow-x-auto pb-3 pt-3">{playerHand.map((card) => <CardView key={card.id} card={card} playable={topCard ? canPlay(card, topCard) : true} onClick={() => playCard(card)} />)}</div>
          </div>
        </div>

        {gameOver && <div className="fixed inset-0 z-30 grid place-items-center bg-black/70 p-5"><div className="w-full max-w-md rounded-[2rem] bg-white p-6 text-center text-black"><p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Partida encerrada</p><h2 className="mt-2 text-4xl font-black tracking-[-0.06em]">{playerHand.length === 0 ? "Você venceu" : "Bot venceu"}</h2><p className="mt-3 text-zinc-500">{playerHand.length === 0 ? "+35 moedas / +60 XP" : "Tente a revanche"}</p><button onClick={startGame} className="mt-6 rounded-2xl bg-black px-6 py-4 font-black text-white">Jogar de novo</button></div></div>}

        <div className="mt-4 rounded-3xl border border-amber-900/40 bg-[#2a190d] p-4 text-sm text-amber-100/80">Regras: jogue carta da mesma cor ou valor. BLOQ bloqueia o rival. +2 faz o rival comprar. WILD pode ser jogada em qualquer carta.</div>
      </section>
    </main>
  );
}
