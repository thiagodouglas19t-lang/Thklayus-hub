import { useEffect, useMemo, useState } from "react";
import { canPlayOnline, loadOnlineGame, OnlineCard, OnlineGameState, saveOnlineGame, subscribeOnlineGame } from "./lib/onlineGame";
import { getLocalPlayerId } from "./lib/onlineRoom";

type Props = { roomCode: string; onBack: () => void };
const colorClass: Record<string, string> = { red: "bg-red-500", blue: "bg-blue-500", green: "bg-emerald-500", yellow: "bg-yellow-300 text-black", wild: "bg-zinc-950" };
const colorName: Record<string, string> = { red: "Vermelho", blue: "Azul", green: "Verde", yellow: "Amarelo", wild: "Livre" };

function nextIndex(game: OnlineGameState, steps = 1) {
  return (game.turnIndex + game.direction * steps + game.players.length * 4) % game.players.length;
}

function CardView({ card, playable, onClick }: { card: OnlineCard; playable?: boolean; onClick?: () => void }) {
  return <button onClick={onClick} disabled={!onClick} className={`relative h-28 w-20 shrink-0 rounded-2xl border border-white/20 ${colorClass[card.color]} p-2 text-white shadow-[0_16px_32px_rgba(0,0,0,.45)] transition active:scale-95 ${playable ? "ring-4 ring-yellow-300" : "opacity-75"}`}><span className="absolute left-2 top-2 text-xs font-black">{card.value}</span><span className="grid h-full place-items-center text-2xl font-black">{card.kind === "block" ? "⊘" : card.kind === "swap" ? "↺" : card.value}</span><span className="absolute bottom-2 right-2 text-[10px] font-black uppercase">{card.color === "wild" ? "THK" : colorName[card.color]}</span></button>;
}

export default function ClashCardsOnline({ roomCode, onBack }: Props) {
  const [game, setGame] = useState<OnlineGameState | null>(null);
  const [status, setStatus] = useState("Conectando...");
  const [choosingColor, setChoosingColor] = useState<OnlineCard | null>(null);
  const meId = getLocalPlayerId();

  useEffect(() => {
    let alive = true;
    loadOnlineGame(roomCode).then((result) => {
      if (!alive) return;
      if (result.game) setGame(result.game);
      setStatus(result.game ? "Online sincronizado." : "Partida ainda não foi criada pelo host.");
    });
    const unsubscribe = subscribeOnlineGame(roomCode, (next) => {
      setGame(next);
      setStatus("Sincronizado agora.");
    });
    return () => { alive = false; unsubscribe(); };
  }, [roomCode]);

  const me = game?.players.find((player) => player.id === meId);
  const turnPlayer = game ? game.players[game.turnIndex] : null;
  const isMyTurn = Boolean(game && turnPlayer?.id === meId && game.status === "playing");
  const top = game?.discard[game.discard.length - 1];
  const playable = useMemo(() => me && top && game ? me.hand.filter((card) => canPlayOnline(card, top, game.activeColor)) : [], [me, top, game]);

  async function sync(next: OnlineGameState) {
    setGame(next);
    const result = await saveOnlineGame(next);
    if (!result.ok) setStatus(result.message);
  }

  function recycleDeck(current: OnlineGameState) {
    if (current.deck.length) return current;
    const topCard = current.discard[current.discard.length - 1];
    const recycled = current.discard.slice(0, -1).sort(() => Math.random() - 0.5);
    return { ...current, deck: recycled, discard: [topCard] };
  }

  async function drawCard() {
    if (!game || !isMyTurn) return;
    let next = recycleDeck(game);
    const card = next.deck[0];
    if (!card) {
      setStatus("Sem cartas no monte.");
      return;
    }
    next = {
      ...next,
      deck: next.deck.slice(1),
      players: next.players.map((player) => player.id === meId ? { ...player, hand: [...player.hand, card], uno: false } : player),
      turnIndex: nextIndex(next),
      message: `${me?.name || "Jogador"} comprou uma carta.`,
      updatedAt: Date.now(),
    };
    await sync(next);
  }

  async function callUno() {
    if (!game || !me || me.hand.length !== 1) {
      setStatus("UNO só fica disponível com 1 carta.");
      return;
    }
    await sync({ ...game, players: game.players.map((player) => player.id === meId ? { ...player, uno: true } : player), message: `${me.name} gritou UNO!`, updatedAt: Date.now() });
  }

  async function playCard(card: OnlineCard, forcedColor?: OnlineGameState["activeColor"]) {
    if (!game || !me || !top || !isMyTurn) return;
    if (!canPlayOnline(card, top, game.activeColor)) {
      setStatus("Essa carta não combina.");
      return;
    }
    if (card.color === "wild" && !forcedColor) {
      setChoosingColor(card);
      return;
    }
    const nextHand = me.hand.filter((item) => item.id !== card.id);
    let next: OnlineGameState = {
      ...game,
      discard: [...game.discard, card],
      activeColor: forcedColor || (card.color === "wild" ? game.activeColor : card.color),
      players: game.players.map((player) => player.id === meId ? { ...player, hand: nextHand, uno: nextHand.length === 1 ? player.uno : false } : player),
      message: `${me.name} jogou ${card.value}.`,
      updatedAt: Date.now(),
    };
    if (nextHand.length === 0) {
      if (!me.uno) {
        const penalty = next.deck.slice(0, 2);
        next = { ...next, deck: next.deck.slice(2), players: next.players.map((player) => player.id === meId ? { ...player, hand: penalty, uno: false } : player), turnIndex: nextIndex(next), message: `${me.name} esqueceu UNO e comprou +2.` };
      } else {
        next = { ...next, status: "finished", winnerId: meId, message: `${me.name} venceu a partida!` };
      }
    } else if (card.kind === "block") {
      next = { ...next, turnIndex: nextIndex(next, 2), message: "Jogador bloqueado." };
    } else if (card.kind === "plus") {
      let decked = recycleDeck(next);
      const targetIndex = nextIndex(decked);
      const amount = card.power || 2;
      const penalty = decked.deck.slice(0, amount);
      decked = { ...decked, deck: decked.deck.slice(amount), players: decked.players.map((player, index) => index === targetIndex ? { ...player, hand: [...player.hand, ...penalty], uno: false } : player) };
      next = { ...decked, turnIndex: (targetIndex + decked.direction + decked.players.length) % decked.players.length, message: `${decked.players[targetIndex].name} comprou +${amount}.` };
    } else if (card.kind === "swap") {
      const direction = next.direction === 1 ? -1 : 1;
      next = { ...next, direction, turnIndex: (next.turnIndex + direction + next.players.length) % next.players.length, message: "Direção invertida." };
    } else {
      next = { ...next, turnIndex: nextIndex(next) };
    }
    setChoosingColor(null);
    await sync(next);
  }

  if (!game) return <main className="grid min-h-screen place-items-center bg-black p-5 text-white"><div className="max-w-sm rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 text-center"><h1 className="text-3xl font-black">Online</h1><p className="mt-2 text-sm text-zinc-400">{status}</p><button onClick={onBack} className="mt-5 rounded-2xl bg-yellow-300 px-5 py-3 font-black text-black">Voltar</button></div></main>;

  return <main className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,.35),transparent_24rem),linear-gradient(180deg,#050008,#000)] p-3 text-white"><section className="mx-auto max-w-[460px] space-y-3"><header className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-black/55 p-3"><button onClick={onBack} className="rounded-xl bg-white/10 px-3 py-2 font-black">←</button><div className="text-center"><p className="text-[10px] uppercase tracking-[0.28em] text-yellow-300">Sala {roomCode}</p><strong>{isMyTurn ? "Sua vez" : `Vez de ${turnPlayer?.name}`}</strong></div><span className="rounded-xl bg-white/10 px-3 py-2 text-xs font-black">{game.direction === 1 ? "↻" : "↺"}</span></header><div className="grid grid-cols-2 gap-2">{game.players.map((player) => <div key={player.id} className={`rounded-2xl border p-3 ${player.id === turnPlayer?.id ? "border-yellow-300 bg-yellow-300/10" : "border-white/10 bg-white/[0.045]"}`}><div className="flex items-center gap-2"><span className="text-2xl">{player.avatar}</span><div><strong className="block text-sm">{player.name}</strong><p className="text-xs text-zinc-400">{player.hand.length} cartas {player.uno ? "· UNO" : ""}</p></div></div></div>)}</div><section className="relative min-h-[310px] rounded-[2rem] border border-white/10 bg-black/45 p-4"><p className="text-center text-sm text-zinc-400">{game.message}</p><div className="mt-8 flex justify-center">{top && <CardView card={top} playable />}</div><p className="mt-5 text-center text-sm">Cor ativa: <strong>{colorName[game.activeColor]}</strong></p>{game.status === "finished" && <div className="absolute inset-0 grid place-items-center rounded-[2rem] bg-black/75"><div className="text-center"><h2 className="text-4xl font-black">WIN</h2><p>{game.players.find((p) => p.id === game.winnerId)?.name} venceu!</p></div></div>}</section><div className="flex gap-2"><button disabled={!isMyTurn} onClick={drawCard} className="flex-1 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 font-black disabled:opacity-40">Comprar</button><button onClick={callUno} className="rounded-2xl bg-yellow-300 px-5 py-3 font-black text-black">UNO</button></div><div className="overflow-x-auto pb-4"><div className="flex gap-2">{me?.hand.map((card) => <CardView key={card.id} card={card} playable={Boolean(top && canPlayOnline(card, top, game.activeColor) && isMyTurn)} onClick={isMyTurn ? () => playCard(card) : undefined} />)}</div></div><p className="text-center text-xs text-zinc-500">{status}</p></section>{choosingColor && <div className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-5"><div className="w-full max-w-sm rounded-[2rem] border border-white/10 bg-[#08020f] p-5"><h2 className="text-center text-2xl font-black">Escolha a cor</h2><div className="mt-4 grid grid-cols-2 gap-3">{["red", "blue", "green", "yellow"].map((color) => <button key={color} onClick={() => playCard(choosingColor, color as OnlineGameState["activeColor"])} className={`h-20 rounded-2xl ${colorClass[color]} font-black`}>{colorName[color]}</button>)}</div></div></div>}</main>;
}
