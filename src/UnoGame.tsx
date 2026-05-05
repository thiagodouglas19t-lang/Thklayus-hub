import { useEffect, useMemo, useState } from "react";
import ArenaBoost from "./components/ArenaBoost";

type Color = "red" | "blue" | "yellow" | "green";
type CardType = "number" | "skip" | "draw2" | "reverse" | "wild" | "wild4";
type Card = { id: number; color: Color | "black"; value: string; type: CardType };
type PlayerId = "you" | "bot1" | "bot2" | "bot3";
type Player = { id: PlayerId; name: string; hand: Card[] };

type UnoGameProps = { onBack?: () => void };

const colors: Color[] = ["red", "blue", "yellow", "green"];
const order: PlayerId[] = ["you", "bot1", "bot2", "bot3"];
const names: Record<PlayerId, string> = { you: "Você", bot1: "Shadow", bot2: "Rimuru", bot3: "Jin-Woo" };
const colorName: Record<Color | "black", string> = { red: "vermelho", blue: "azul", yellow: "amarelo", green: "verde", black: "livre" };
const colorStyle: Record<Color | "black", string> = {
  red: "from-red-500 to-red-900 border-red-200/40",
  blue: "from-blue-500 to-blue-900 border-blue-200/40",
  yellow: "from-yellow-300 to-amber-600 border-yellow-100/50 text-black",
  green: "from-emerald-400 to-emerald-900 border-emerald-100/40",
  black: "from-zinc-950 via-violet-800 to-white border-white/30 text-white",
};
const store = "thklayus-classic-clash";

function readNumber(key: string) { return Number(localStorage.getItem(`${store}:${key}`) || 0); }
function writeNumber(key: string, value: number) { localStorage.setItem(`${store}:${key}`, String(value)); }
function shuffle<T>(list: T[]) { return [...list].sort(() => Math.random() - 0.5); }

function createDeck() {
  let id = 1;
  const deck: Card[] = [];
  colors.forEach((color) => {
    deck.push({ id: id++, color, value: "0", type: "number" });
    for (let copy = 0; copy < 2; copy++) {
      for (let n = 1; n <= 9; n++) deck.push({ id: id++, color, value: String(n), type: "number" });
      deck.push({ id: id++, color, value: "BLOQ", type: "skip" });
      deck.push({ id: id++, color, value: "REV", type: "reverse" });
      deck.push({ id: id++, color, value: "+2", type: "draw2" });
    }
  });
  for (let i = 0; i < 4; i++) {
    deck.push({ id: id++, color: "black", value: "COR", type: "wild" });
    deck.push({ id: id++, color: "black", value: "+4", type: "wild4" });
  }
  return shuffle(deck);
}

function next(id: PlayerId, direction: 1 | -1) {
  const index = order.indexOf(id);
  return order[(index + direction + order.length) % order.length];
}

function canPlay(card: Card, top: Card, activeColor: Color) {
  return card.color === "black" || card.color === activeColor || card.value === top.value;
}

function bestBotColor(hand: Card[]) {
  return colors.map((color) => ({ color, total: hand.filter((card) => card.color === color).length })).sort((a, b) => b.total - a.total)[0]?.color || "red";
}

function CardView({ card, active, playable, onClick, small = false }: { card: Card; active?: Color; playable?: boolean; onClick?: () => void; small?: boolean }) {
  const visualColor = card.color === "black" && active ? active : card.color;
  return (
    <button onClick={onClick} disabled={!onClick} className={`${small ? "h-28 w-20" : "h-36 w-24 sm:h-40 sm:w-28"} shrink-0 rounded-[1.4rem] border bg-gradient-to-br p-2 shadow-2xl transition ${colorStyle[visualColor]} ${playable ? "-translate-y-3 ring-2 ring-white" : "opacity-90"}`}>
      <div className="flex h-full flex-col justify-between rounded-2xl border border-white/25 bg-black/20 p-2">
        <span className="text-xs font-black uppercase tracking-widest">{card.color === "black" ? "coringa" : colorName[card.color]}</span>
        <strong className="text-center text-3xl font-black">{card.value}</strong>
        <span className="text-right text-xs font-black">CLASH</span>
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
  const [activeColor, setActiveColor] = useState<Color>("red");
  const [pendingWild, setPendingWild] = useState<Card | null>(null);
  const [winner, setWinner] = useState<PlayerId | null>(null);
  const [message, setMessage] = useState("Jogo clássico de cartas: combine cor, número ou símbolo.");
  const [log, setLog] = useState<string[]>([]);
  const [unoAlert, setUnoAlert] = useState<string | null>(null);
  const [combo, setCombo] = useState(0);
  const [coins, setCoins] = useState(() => readNumber("coins"));
  const [xp, setXp] = useState(() => readNumber("xp"));
  const [wins, setWins] = useState(() => readNumber("wins"));
  const [losses, setLosses] = useState(() => readNumber("losses"));
  const started = players.length > 0;
  const you = players.find((player) => player.id === "you");
  const top = discard[discard.length - 1];
  const playable = useMemo(() => you && top ? you.hand.filter((card) => canPlay(card, top, activeColor)) : [], [you, top, activeColor]);
  const level = Math.floor(xp / 100) + 1;

  function addLog(text: string) { setLog((current) => [text, ...current].slice(0, 7)); }
  function save(c = coins, x = xp, w = wins, l = losses) { writeNumber("coins", c); writeNumber("xp", x); writeNumber("wins", w); writeNumber("losses", l); }
  function setHand(id: PlayerId, hand: Card[]) { setPlayers((list) => list.map((player) => player.id === id ? { ...player, hand } : player)); }
  function addCards(id: PlayerId, cards: Card[]) { setPlayers((list) => list.map((player) => player.id === id ? { ...player, hand: [...player.hand, ...cards] } : player)); }

  function start() {
    const fresh = createDeck();
    let rest = fresh;
    const dealt = order.map((id) => {
      const take = rest.slice(0, 7);
      rest = rest.slice(7);
      return { id, name: names[id], hand: take };
    });
    const firstIndex = rest.findIndex((card) => card.color !== "black");
    const first = rest[firstIndex >= 0 ? firstIndex : 0];
    setDeck(rest.filter((card) => card.id !== first.id));
    setDiscard([first]);
    setActiveColor(first.color === "black" ? "red" : first.color);
    setPlayers(dealt);
    setTurn("you");
    setDirection(1);
    setPendingWild(null);
    setWinner(null);
    setCombo(0);
    setUnoAlert(null);
    setMessage("Sua vez. Combine cor, número ou símbolo.");
    setLog([`Carta inicial: ${first.value} ${colorName[first.color]}`]);
  }

  function drawCards(id: PlayerId, amount: number) {
    let taken: Card[] = [];
    setDeck((current) => {
      taken = current.slice(0, amount);
      return current.slice(amount);
    });
    if (taken.length) addCards(id, taken);
    addLog(`${names[id]} comprou ${taken.length} carta(s).`);
    return taken;
  }

  function endGame(id: PlayerId) {
    setWinner(id);
    if (id === "you") {
      const nextWins = wins + 1;
      const nextCoins = coins + 50 + combo * 3;
      const nextXp = xp + 90 + combo * 4;
      setWins(nextWins); setCoins(nextCoins); setXp(nextXp); save(nextCoins, nextXp, nextWins, losses);
      setMessage("Você venceu! Recompensa liberada.");
    } else {
      const nextLosses = losses + 1;
      const nextXp = xp + 15;
      setLosses(nextLosses); setXp(nextXp); save(coins, nextXp, wins, nextLosses);
      setMessage(`${names[id]} venceu a partida.`);
    }
  }

  function resolveSpecial(playerId: PlayerId, card: Card, finalDirection: 1 | -1) {
    const target = next(playerId, finalDirection);
    if (card.type === "skip") {
      const afterSkip = next(target, finalDirection);
      setTurn(afterSkip);
      setMessage(`${names[target]} foi bloqueado.`);
      return;
    }
    if (card.type === "draw2") {
      drawCards(target, 2);
      const afterDraw = next(target, finalDirection);
      setTurn(afterDraw);
      setMessage(`${names[target]} comprou +2 e perdeu a vez.`);
      return;
    }
    if (card.type === "wild4") {
      drawCards(target, 4);
      const afterDraw = next(target, finalDirection);
      setTurn(afterDraw);
      setMessage(`${names[target]} comprou +4 e perdeu a vez.`);
      return;
    }
    setTurn(target);
    setMessage(target === "you" ? "Sua vez." : `Vez de ${names[target]}.`);
  }

  function afterPlay(playerId: PlayerId, card: Card, handAfter: Card[], chosenColor: Color) {
    if (handAfter.length === 1) {
      setUnoAlert(`${names[playerId]} está com 1 carta!`);
      addLog(`${names[playerId]} gritou CLASH!`);
    }
    if (handAfter.length === 0) return endGame(playerId);
    let finalDirection = direction;
    if (card.type === "reverse") {
      finalDirection = direction === 1 ? -1 : 1;
      setDirection(finalDirection);
      addLog("Sentido invertido.");
    }
    setActiveColor(chosenColor);
    resolveSpecial(playerId, card, finalDirection);
  }

  function play(card: Card) {
    if (!you || !top || turn !== "you" || winner || pendingWild) return;
    if (!canPlay(card, top, activeColor)) return setMessage("Essa carta não combina com a mesa.");
    const handAfter = you.hand.filter((item) => item.id !== card.id);
    setHand("you", handAfter);
    setCombo((value) => value + 1);
    if (card.color === "black") {
      setPendingWild(card);
      setMessage("Escolha a nova cor.");
      return;
    }
    setDiscard((list) => [...list, card]);
    addLog(`Você jogou ${card.value} ${colorName[card.color]}.`);
    afterPlay("you", card, handAfter, card.color);
  }

  function chooseWild(color: Color) {
    if (!pendingWild || !you) return;
    const handAfter = you.hand;
    const card = { ...pendingWild, color: "black" as const };
    setDiscard((list) => [...list, card]);
    setPendingWild(null);
    addLog(`Você escolheu ${colorName[color]}.`);
    afterPlay("you", card, handAfter, color);
  }

  function drawOne() {
    if (!started || turn !== "you" || winner || pendingWild) return;
    const taken = drawCards("you", 1);
    setCombo(0);
    if (taken[0] && top && canPlay(taken[0], top, activeColor)) setMessage("Você comprou uma carta jogável. Pode jogar depois.");
    setTurn(next("you", direction));
  }

  function botMove(id: PlayerId) {
    const bot = players.find((player) => player.id === id);
    const topCard = discard[discard.length - 1];
    if (!bot || !topCard || winner || pendingWild) return;
    const options = bot.hand.filter((card) => canPlay(card, topCard, activeColor));
    if (!options.length) {
      drawCards(id, 1);
      setTurn(next(id, direction));
      setMessage(`${names[id]} comprou carta.`);
      return;
    }
    const selected = options.find((card) => card.type === "wild4") || options.find((card) => card.type === "draw2") || options.find((card) => card.type === "skip") || options.find((card) => card.type === "wild") || options[0];
    const handAfter = bot.hand.filter((card) => card.id !== selected.id);
    const chosenColor = selected.color === "black" ? bestBotColor(handAfter) : selected.color;
    setHand(id, handAfter);
    setDiscard((list) => [...list, selected]);
    addLog(`${names[id]} jogou ${selected.value}.`);
    afterPlay(id, selected, handAfter, chosenColor);
  }

  useEffect(() => {
    if (!started || winner || pendingWild || turn === "you") return;
    const timer = window.setTimeout(() => botMove(turn), 750);
    return () => window.clearTimeout(timer);
  }, [turn, players, discard, activeColor, started, winner, pendingWild]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-5 text-white sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-black/45 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-violet-300">THKLAYUS Arena</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Classic Clash</h1>
          <p className="mt-2 max-w-2xl text-zinc-400">Quase o clássico: 108 cartas, 4 jogadores, compra, bloqueio, reverso, +2, coringa e +4.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {onBack && <button onClick={onBack} className="rounded-2xl border border-white/15 px-5 py-3 font-bold text-white">Hub</button>}
          <button onClick={start} className="pro-button rounded-2xl px-5 py-3 font-black">{started ? "Reiniciar" : "Jogar"}</button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="glass-card rounded-[2rem] p-5">
          <div className="grid gap-3 md:grid-cols-4">
            {order.map((id) => {
              const player = players.find((item) => item.id === id);
              return <div key={id} className={`rounded-3xl border p-4 ${turn === id ? "border-violet-300/60 bg-violet-500/15" : "border-white/10 bg-white/[0.03]"}`}><p className="text-sm text-zinc-400">{names[id]}</p><strong className="text-2xl text-white">{player?.hand.length ?? 0}</strong><p className="text-xs text-zinc-500">cartas</p></div>;
            })}
          </div>

          <div className="my-6 grid items-center gap-5 md:grid-cols-[1fr_180px_1fr]">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-5 text-center"><p className="text-sm text-zinc-400">Compra</p><strong className="text-5xl text-white">{deck.length}</strong></div>
            <div className="flex justify-center">{top ? <CardView card={top} active={activeColor} small /> : <div className="h-28 w-20 rounded-2xl border border-white/10 bg-white/5" />}</div>
            <div className={`rounded-3xl border bg-gradient-to-br p-5 ${colorStyle[activeColor]}`}><p className="text-sm font-bold opacity-80">Cor atual</p><strong className="text-3xl font-black">{colorName[activeColor]}</strong><p className="mt-2 text-sm">{message}</p>{unoAlert && <p className="mt-2 rounded-full bg-black/25 px-3 py-1 text-sm font-black">{unoAlert}</p>}</div>
          </div>

          {pendingWild && <div className="mb-5 rounded-3xl border border-violet-300/30 bg-violet-500/10 p-4"><p className="mb-3 font-bold">Escolha a cor:</p><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{colors.map((color) => <button key={color} onClick={() => chooseWild(color)} className={`rounded-2xl bg-gradient-to-br px-4 py-3 font-black ${colorStyle[color]}`}>{colorName[color]}</button>)}</div></div>}

          <div className="mb-3 flex items-center justify-between gap-3"><h2 className="text-2xl font-black">Sua mão</h2><button onClick={drawOne} disabled={!started || turn !== "you" || Boolean(winner)} className="rounded-2xl border border-white/15 px-4 py-2 font-bold disabled:opacity-40">Comprar</button></div>
          <div className="flex gap-3 overflow-x-auto px-1 pb-6 pt-4">{you?.hand.map((card) => <CardView key={card.id} card={card} active={activeColor} playable={top ? canPlay(card, top, activeColor) : false} onClick={() => play(card)} />)}{!you && <p className="text-zinc-400">Clique em Jogar para começar.</p>}</div>

          <section className="rounded-3xl border border-white/10 bg-black/30 p-4"><h3 className="font-black">Histórico</h3><div className="mt-3 space-y-2 text-sm text-zinc-400">{log.map((item) => <p key={item}>• {item}</p>)}</div></section>
        </section>

        <ArenaBoost level={level} xp={xp} coins={coins} wins={wins} losses={losses} combo={combo} deckCount={deck.length} handCount={you?.hand.length || 0} playableCount={playable.length} started={started} />
      </div>
    </main>
  );
}
