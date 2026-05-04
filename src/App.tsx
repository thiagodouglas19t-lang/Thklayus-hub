import { useEffect, useMemo, useRef, useState } from "react";
import { supabase, supabaseConfigOk } from "./lib/supabase";

type Color = "red" | "blue" | "yellow" | "green";
type CardType = "number" | "skip" | "draw2" | "wild";
type Card = { id: number; color: Color; value: string; type: CardType };
type Profile = { email: string; id: string } | null;

const colors: Color[] = ["red", "blue", "yellow", "green"];
const colorName: Record<Color, string> = { red: "vermelho", blue: "azul", yellow: "amarelo", green: "verde" };
const cardColor: Record<Color, string> = {
  red: "from-red-500 to-red-700",
  blue: "from-blue-500 to-blue-700",
  yellow: "from-yellow-300 to-yellow-500 text-black",
  green: "from-emerald-500 to-emerald-700",
};

function makeDeck() {
  let id = 1;
  const deck: Card[] = [];
  colors.forEach((color) => {
    for (let n = 1; n <= 9; n++) {
      deck.push({ id: id++, color, value: String(n), type: "number" });
      deck.push({ id: id++, color, value: String(n), type: "number" });
    }
    deck.push({ id: id++, color, value: "BLOQ", type: "skip" });
    deck.push({ id: id++, color, value: "+2", type: "draw2" });
  });
  colors.forEach((color) => deck.push({ id: id++, color, value: "WILD", type: "wild" }));
  return deck.sort(() => Math.random() - 0.5);
}

const draw = (deck: Card[], amount: number) => ({ taken: deck.slice(0, amount), rest: deck.slice(amount) });
const canPlay = (card: Card, top: Card) => card.type === "wild" || card.color === top.color || card.value === top.value;

export default function App() {
  const audioRef = useRef<AudioContext | null>(null);
  const lastSoundRef = useRef(0);
  const [muted, setMuted] = useState(() => localStorage.getItem("colorclash:muted") === "1");
  const [profile, setProfile] = useState<Profile>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
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
  const [name, setName] = useState(() => localStorage.getItem("colorclash:name") || "Jogador");
  const [started, setStarted] = useState(false);
  const [combo, setCombo] = useState(0);
  const [result, setResult] = useState<"win" | "loss" | null>(null);
  const [pulse, setPulse] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [lastPlayed, setLastPlayed] = useState<Card | null>(null);

  const topCard = discard[discard.length - 1];
  const playableCards = useMemo(() => (topCard ? playerHand.filter((c) => canPlay(c, topCard)) : []), [playerHand, topCard]);
  const recommended = playableCards.find((c) => c.type === "draw2") || playableCards.find((c) => c.type === "skip") || playableCards[0];
  const gameOver = started && (playerHand.length === 0 || botHand.length === 0 || result !== null);
  const level = Math.floor(xp / 100) + 1;
  const displayName = profile?.email?.split("@")[0] || name;
  const canDraw = started && turn === "player" && !gameOver && playableCards.length === 0 && deck.length > 0;
  const tip = !started ? "Clique em Jogar para iniciar." : turn === "bot" ? "Aguarde o rival." : playableCards.length ? `Você tem ${playableCards.length} carta(s) jogável(eis). Melhor: ${recommended?.value}.` : "Nenhuma carta jogável. Agora pode comprar.";

  useEffect(() => {
    if (!supabaseConfigOk) return;
    supabase.auth.getUser().then(({ data }) => data.user?.email && setProfile({ email: data.user.email, id: data.user.id }));
    const { data } = supabase.auth.onAuthStateChange((_e, session) => {
      const user = session?.user;
      setProfile(user?.email ? { email: user.email, id: user.id } : null);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  function sound(type: "card" | "win" | "bad") {
    if (muted) return;
    if (Date.now() - lastSoundRef.current < 90) return;
    lastSoundRef.current = Date.now();
    try {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioRef.current) audioRef.current = new AC();
      const ctx = audioRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = type === "win" ? 660 : type === "bad" ? 160 : 360;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.02, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.09);
    } catch {}
  }

  function saveProgress(nextCoins: number, nextXp: number) {
    setCoins(nextCoins); setXp(nextXp);
    localStorage.setItem("colorclash:coins", String(nextCoins));
    localStorage.setItem("colorclash:xp", String(nextXp));
  }
  function reward(c: number, x: number) { saveProgress(coins + c, xp + x); }
  function saveName(value: string) { setName(value || "Jogador"); localStorage.setItem("colorclash:name", value || "Jogador"); }
  function animate(card: Card) { setLastPlayed(card); setPulse(true); setTimeout(() => setPulse(false), 240); }

  async function signIn() {
    if (!supabaseConfigOk) return setAuthMessage("Supabase não configurado.");
    const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
    setAuthMessage(error ? error.message : "Login feito.");
  }
  async function signUp() {
    if (!supabaseConfigOk) return setAuthMessage("Supabase não configurado.");
    const { error } = await supabase.auth.signUp({ email: authEmail, password: authPassword });
    setAuthMessage(error ? error.message : "Conta criada. Confirme o email se pedir.");
  }
  async function signOut() { await supabase.auth.signOut(); setProfile(null); }

  function startGame() {
    const fresh = makeDeck();
    const p = draw(fresh, 7);
    const b = draw(p.rest, 7);
    const first = b.rest.find((c) => c.type === "number") || b.rest[0];
    setDeck(b.rest.filter((c) => c.id !== first.id));
    setPlayerHand(p.taken); setBotHand(b.taken); setDiscard([first]);
    setTurn("player"); setStarted(true); setCombo(0); setResult(null); setLastPlayed(null);
    setMessage("Sua vez. Jogue uma carta da mesma cor ou valor.");
  }

  function drawPlayer() {
    if (!canDraw) {
      if (playableCards.length) setMessage("Você ainda tem carta jogável. Jogue antes de comprar.");
      sound("bad"); return;
    }
    const d = draw(deck, 1);
    setDeck(d.rest); setPlayerHand((h) => [...h, ...d.taken]); setCombo(0); setTurn("bot");
    setMessage("Você comprou. Vez do rival."); sound("card"); setTimeout(botMove, 700);
  }

  function win(nextHand: Card[]) {
    const nextWins = wins + 1;
    setWins(nextWins); localStorage.setItem("colorclash:wins", String(nextWins));
    reward(35 + combo * 3, 60 + combo * 5); setResult("win"); setPlayerHand(nextHand);
    setMessage("Você venceu!"); sound("win");
  }

  function playCard(card: Card) {
    if (!started || turn !== "player" || gameOver || !topCard) return;
    if (!canPlay(card, topCard)) { setMessage("Essa carta não combina com a mesa."); sound("bad"); return; }
    animate(card); sound("card");
    const nextCombo = combo + 1;
    const nextHand = playerHand.filter((c) => c.id !== card.id);
    setCombo(nextCombo); setPlayerHand(nextHand); setDiscard((d) => [...d, card]); reward(1 + Math.floor(nextCombo / 3), 4 + nextCombo);
    if (nextHand.length === 0) return win(nextHand);
    if (nextHand.length === 1) setMessage("COLOR! Você ficou com uma carta.");
    if (card.type === "draw2") { const d = draw(deck, 2); setDeck(d.rest); setBotHand((h) => [...h, ...d.taken]); setMessage("+2! Rival comprou. Jogue de novo."); return; }
    if (card.type === "skip") { setMessage("BLOQ! Rival perdeu a vez. Jogue de novo."); return; }
    setTurn("bot"); setMessage("Vez do rival."); setTimeout(botMove, 800);
  }

  function botMove() {
    setBotHand((hand) => {
      const top = discard[discard.length - 1];
      if (!top || result) return hand;
      const card = hand.find((c) => canPlay(c, top));
      if (!card) {
        setDeck((d) => { const buy = draw(d, 1); setBotHand((h) => [...h, ...buy.taken]); return buy.rest; });
        setTurn("player"); setMessage("Rival comprou. Sua vez."); return hand;
      }
      animate(card); sound("card");
      const next = hand.filter((c) => c.id !== card.id);
      setDiscard((d) => [...d, card]);
      if (next.length === 0) { const l = losses + 1; setLosses(l); localStorage.setItem("colorclash:losses", String(l)); setResult("loss"); setMessage("Rival venceu."); sound("bad"); return next; }
      if (next.length === 1) setMessage("Rival está com uma carta!");
      if (card.type === "draw2") { setDeck((d) => { const buy = draw(d, 2); setPlayerHand((h) => [...h, ...buy.taken]); return buy.rest; }); setCombo(0); setTurn("bot"); setMessage("Rival jogou +2."); setTimeout(botMove, 900); return next; }
      if (card.type === "skip") { setCombo(0); setTurn("bot"); setMessage("Rival te bloqueou."); setTimeout(botMove, 900); return next; }
      setTurn("player"); setMessage("Sua vez."); return next;
    });
  }

  function CardView({ card, hidden, onClick, playable = true, best = false }: { card?: Card; hidden?: boolean; onClick?: () => void; playable?: boolean; best?: boolean }) {
    if (hidden) return <div className="grid h-28 w-20 shrink-0 place-items-center rounded-2xl border-4 border-white/80 bg-gradient-to-br from-[#1c140d] to-[#5a3318] shadow-xl md:h-32"><span className="text-2xl font-black text-amber-200">CC</span></div>;
    if (!card) return null;
    return <button onClick={onClick} className={`relative grid h-28 w-20 shrink-0 place-items-center rounded-2xl border-4 border-white bg-gradient-to-br ${cardColor[card.color]} p-2 text-white shadow-xl transition md:h-32 ${playable ? "active:scale-95 hover:-translate-y-2" : "opacity-40 grayscale"} ${best ? "ring-4 ring-amber-300" : ""}`}>{best && <span className="absolute -top-3 rounded-full bg-amber-300 px-2 py-1 text-[10px] font-black text-black">MELHOR</span>}<div className="grid h-full w-full place-items-center rounded-xl border border-white/40 bg-black/10"><span className="text-2xl font-black">{card.value}</span></div></button>;
  }

  return <main className="min-h-screen bg-[#130c06] p-3 text-white md:p-4"><section className="mx-auto max-w-6xl">
    <header className="mb-4 flex flex-col gap-3 rounded-[2rem] border border-amber-900/40 bg-[#2a190d] p-4 shadow-2xl md:flex-row md:items-center md:justify-between"><div><p className="text-xs font-black uppercase tracking-[0.22em] text-amber-300">Color Clash</p><h1 className="text-3xl font-black tracking-[-0.06em]">Mesa de Cartas</h1></div><div className="flex flex-wrap gap-2"><button onClick={() => setHelpOpen(!helpOpen)} className="rounded-2xl border border-amber-200/20 px-4 py-3 text-xs font-black uppercase text-amber-100">Ajuda</button><button onClick={() => setAuthOpen(!authOpen)} className="rounded-2xl border border-amber-200/20 px-4 py-3 text-xs font-black uppercase text-amber-100">{profile ? "Perfil" : "Entrar"}</button><button onClick={() => { const next = !muted; setMuted(next); localStorage.setItem("colorclash:muted", next ? "1" : "0"); }} className="rounded-2xl border border-amber-200/20 px-4 py-3 text-xs font-black uppercase text-amber-100">{muted ? "Som off" : "Som on"}</button><button onClick={startGame} className="rounded-2xl bg-amber-300 px-5 py-3 text-sm font-black uppercase text-black">{started ? "Nova partida" : "Jogar"}</button></div></header>
    {helpOpen && <div className="mb-4 rounded-[2rem] bg-amber-300 p-4 text-black"><p className="font-black">Como jogar</p><p className="mt-2 text-sm">Jogue carta da mesma cor ou valor. Se tiver carta jogável, não pode comprar. BLOQ bloqueia o rival. +2 faz o rival comprar. WILD joga em qualquer carta.</p></div>}
    {authOpen && <div className="mb-4 rounded-[2rem] border border-amber-900/40 bg-[#2a190d] p-4"><p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">Perfil</p>{profile ? <div className="mt-3 flex flex-wrap items-center justify-between gap-3"><p className="font-black">Logado como {profile.email}</p><button onClick={signOut} className="rounded-2xl bg-white px-4 py-3 text-xs font-black uppercase text-black">Sair</button></div> : <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1fr_auto_auto]"><input value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="Email" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" /><input value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="Senha" type="password" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" /><button onClick={signIn} className="rounded-2xl bg-white px-4 py-3 text-xs font-black uppercase text-black">Entrar</button><button onClick={signUp} className="rounded-2xl bg-amber-300 px-4 py-3 text-xs font-black uppercase text-black">Criar</button></div>}{authMessage && <p className="mt-3 text-sm text-amber-100/80">{authMessage}</p>}</div>}
    <div className="mb-4 rounded-[2rem] border border-amber-300/20 bg-[#2a190d] p-4"><p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">Dica da rodada</p><p className="mt-1 text-sm text-amber-100/80">{tip}</p></div>
    <div className="mb-4 grid gap-3 md:grid-cols-5"><div className="rounded-3xl bg-[#2a190d] p-4"><p className="text-xs text-amber-200/60">Nome</p>{profile ? <p className="mt-1 truncate text-xl font-black">{displayName}</p> : <input value={name} onChange={(e) => saveName(e.target.value)} className="mt-1 w-full bg-transparent text-xl font-black outline-none" />}</div><Info label="Level" value={String(level)} bar={xp % 100} /><Info label="Moedas" value={`🪙 ${coins}`} /><Info label="Placar" value={`${wins}W / ${losses}L`} /><Info label="Combo" value={`x${combo}`} /></div>
    <div className="rounded-[2.5rem] border-[10px] border-[#4b2b13] bg-[radial-gradient(circle_at_center,#2f8a4b,#0e4828)] p-3 shadow-2xl md:p-6"><div className="mb-4 flex items-center justify-between gap-3 rounded-3xl bg-black/20 p-3"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-white/50">Rival</p><p className="text-lg font-black">Bot</p></div><div className="flex -space-x-12 overflow-hidden pr-10">{botHand.slice(0, 7).map((c) => <CardView key={c.id} hidden />)}</div><p className="rounded-2xl bg-white px-4 py-2 font-black text-black">{botHand.length}</p></div><div className="grid min-h-56 place-items-center py-6"><div className="grid grid-cols-3 items-center gap-3 md:gap-5"><Center title="Monte"><div className="grid h-28 w-20 place-items-center rounded-2xl border-4 border-white/80 bg-gradient-to-br from-[#1c140d] to-[#5a3318] shadow-xl md:h-32"><span className="text-2xl font-black">{deck.length}</span></div></Center><div className={`grid place-items-center rounded-3xl bg-black/25 p-3 transition md:p-4 ${pulse ? "scale-110" : "scale-100"}`}><p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-white/50">Mesa</p><CardView card={topCard} /></div><div className="rounded-3xl bg-black/20 p-3 text-center md:p-4"><p className="text-xs font-black uppercase tracking-[0.2em] text-white/50">Turno</p><p className="mt-2 text-xl font-black md:text-2xl">{turn === "player" ? displayName : "Rival"}</p><p className="mt-2 text-sm text-white/70">Jogáveis: {playableCards.length}</p><p className="mt-1 text-xs text-white/50">Mesa: {topCard ? `${colorName[topCard.color]} ${topCard.value}` : "-"}</p></div></div></div><div className="rounded-3xl bg-black/25 p-4"><div className="mb-3 flex items-center justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-white/50">{displayName}</p><p className="text-sm text-white/70">{message}</p>{lastPlayed && <p className="mt-1 text-xs text-amber-200">Última carta: {lastPlayed.value}</p>}</div><button onClick={drawPlayer} disabled={!canDraw} className="rounded-2xl bg-white px-4 py-3 text-xs font-black uppercase text-black disabled:opacity-40">Comprar</button></div><div className="flex gap-3 overflow-x-auto pb-3 pt-3">{playerHand.map((card) => <CardView key={card.id} card={card} playable={topCard ? canPlay(card, topCard) : true} best={recommended?.id === card.id} onClick={() => playCard(card)} />)}</div></div></div>
    {gameOver && <div className="fixed inset-0 z-30 grid place-items-center bg-black/70 p-5"><div className="w-full max-w-md rounded-[2rem] bg-white p-6 text-center text-black"><p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Partida encerrada</p><h2 className="mt-2 text-4xl font-black tracking-[-0.06em]">{result === "win" ? "Você venceu" : "Bot venceu"}</h2><p className="mt-3 text-zinc-500">{result === "win" ? `+${35 + combo * 3} moedas / +${60 + combo * 5} XP` : "Tente a revanche"}</p><button onClick={startGame} className="mt-6 rounded-2xl bg-black px-6 py-4 font-black text-white">Jogar de novo</button></div></div>}
  </section></main>;
}

function Info({ label, value, bar }: { label: string; value: string; bar?: number }) { return <div className="rounded-3xl bg-[#2a190d] p-4"><p className="text-xs text-amber-200/60">{label}</p><p className="text-2xl font-black">{value}</p>{typeof bar === "number" && <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-amber-300" style={{ width: `${bar}%` }} /></div>}</div>; }
function Center({ title, children }: { title: string; children: React.ReactNode }) { return <div className="grid place-items-center rounded-3xl bg-black/20 p-3 md:p-4"><p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-white/50">{title}</p>{children}</div>; }
