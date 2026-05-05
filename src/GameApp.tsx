import { useEffect, useMemo, useState } from "react";
import ArenaBoost from "./components/ArenaBoost";

type Lane = 0 | 1 | 2;
type Enemy = { id: number; lane: Lane; y: number; speed: number; value: number };
type PowerUp = { id: number; lane: Lane; y: number; type: "coin" | "shield" | "boost" };
type GameStatus = "menu" | "playing" | "paused" | "over";

const lanes: Lane[] = [0, 1, 2];
const laneLabels = ["esquerda", "meio", "direita"];
const storageKey = "thklayus-arena-runner";

function readNumber(key: string, fallback = 0) {
  return Number(localStorage.getItem(`${storageKey}:${key}`) || fallback);
}

function writeNumber(key: string, value: number) {
  localStorage.setItem(`${storageKey}:${key}`, String(value));
}

function clampLane(value: number): Lane {
  return Math.max(0, Math.min(2, value)) as Lane;
}

function Metric({ label, value, detail }: { label: string; value: string | number; detail: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{label}</p>
      <strong className="mt-2 block text-2xl text-white">{value}</strong>
      <span className="text-xs text-zinc-400">{detail}</span>
    </div>
  );
}

export default function GameApp() {
  const [status, setStatus] = useState<GameStatus>("menu");
  const [lane, setLane] = useState<Lane>(1);
  const [tick, setTick] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [shield, setShield] = useState(0);
  const [boost, setBoost] = useState(0);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [coins, setCoins] = useState(() => readNumber("coins"));
  const [xp, setXp] = useState(() => readNumber("xp"));
  const [wins, setWins] = useState(() => readNumber("wins"));
  const [losses, setLosses] = useState(() => readNumber("losses"));
  const [bestScore, setBestScore] = useState(() => readNumber("best"));
  const [message, setMessage] = useState("Entre na arena e desvie dos blocos.");

  const level = Math.floor(xp / 100) + 1;
  const speed = 5 + Math.min(8, Math.floor(score / 250)) + (boost > 0 ? 2 : 0);
  const playableCount = status === "playing" ? 3 : 0;

  const missions = useMemo(() => [
    { name: "Sobreviva 30s", done: score >= 300, reward: "+20 XP" },
    { name: "Pegue 10 moedas", done: coins >= 10, reward: "+1 skin futura" },
    { name: "Combo 5x", done: combo >= 5, reward: "+30 moedas" },
    { name: "Bata seu recorde", done: score > 0 && score >= bestScore, reward: "+50 XP" },
  ], [score, coins, combo, bestScore]);

  function persist(nextCoins = coins, nextXp = xp, nextWins = wins, nextLosses = losses, nextBest = bestScore) {
    writeNumber("coins", nextCoins);
    writeNumber("xp", nextXp);
    writeNumber("wins", nextWins);
    writeNumber("losses", nextLosses);
    writeNumber("best", nextBest);
  }

  function startGame() {
    setStatus("playing");
    setLane(1);
    setTick(0);
    setScore(0);
    setCombo(0);
    setShield(0);
    setBoost(0);
    setEnemies([]);
    setPowerUps([]);
    setMessage("Desvie, colete e faça combo.");
  }

  function endGame(finalScore: number) {
    const nextLosses = losses + 1;
    const nextBest = Math.max(bestScore, finalScore);
    const earnedXp = Math.max(10, Math.floor(finalScore / 12));
    const nextXp = xp + earnedXp;
    setLosses(nextLosses);
    setBestScore(nextBest);
    setXp(nextXp);
    persist(coins, nextXp, wins, nextLosses, nextBest);
    setStatus("over");
    setMessage(`Fim de partida. Você ganhou ${earnedXp} XP.`);
  }

  function move(direction: -1 | 1) {
    if (status !== "playing") return;
    setLane((current) => clampLane(current + direction));
  }

  function collectPower(type: PowerUp["type"]) {
    if (type === "coin") {
      const nextCoins = coins + 3 + Math.floor(combo / 3);
      setCoins(nextCoins);
      persist(nextCoins);
      setMessage("Moedas coletadas.");
    }
    if (type === "shield") {
      setShield((current) => Math.min(3, current + 1));
      setMessage("Escudo ativado.");
    }
    if (type === "boost") {
      setBoost(35);
      setMessage("Boost de velocidade ativo.");
    }
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") move(-1);
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") move(1);
      if (event.key === " " && status === "playing") setStatus("paused");
      else if (event.key === " " && status === "paused") setStatus("playing");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status]);

  useEffect(() => {
    if (status !== "playing") return;
    const timer = window.setInterval(() => {
      setTick((current) => current + 1);
      setScore((current) => current + 5 + Math.floor(combo / 2));
      setCombo((current) => current + 1);
      setBoost((current) => Math.max(0, current - 1));

      setEnemies((current) => {
        const moved = current.map((enemy) => ({ ...enemy, y: enemy.y + enemy.speed + speed })).filter((enemy) => enemy.y < 112);
        const shouldSpawn = Math.random() < 0.34;
        const next = shouldSpawn
          ? [...moved, { id: Date.now() + Math.random(), lane: lanes[Math.floor(Math.random() * lanes.length)], y: -8, speed: 1 + Math.random() * 2, value: 1 }]
          : moved;
        return next;
      });

      setPowerUps((current) => {
        const moved = current.map((power) => ({ ...power, y: power.y + 4 + speed / 2 })).filter((power) => power.y < 112);
        const shouldSpawn = Math.random() < 0.11;
        const types: PowerUp["type"][] = ["coin", "shield", "boost"];
        return shouldSpawn
          ? [...moved, { id: Date.now() + Math.random(), lane: lanes[Math.floor(Math.random() * lanes.length)], y: -8, type: types[Math.floor(Math.random() * types.length)] }]
          : moved;
      });
    }, 180);
    return () => window.clearInterval(timer);
  }, [status, combo, speed]);

  useEffect(() => {
    if (status !== "playing") return;
    const hit = enemies.find((enemy) => enemy.lane === lane && enemy.y > 78 && enemy.y < 94);
    if (!hit) return;
    setEnemies((current) => current.filter((enemy) => enemy.id !== hit.id));
    setCombo(0);
    if (shield > 0) {
      setShield((current) => current - 1);
      setMessage("Escudo segurou a batida.");
      return;
    }
    endGame(score);
  }, [enemies, lane, shield, status, score]);

  useEffect(() => {
    if (status !== "playing") return;
    const collected = powerUps.find((power) => power.lane === lane && power.y > 78 && power.y < 94);
    if (!collected) return;
    setPowerUps((current) => current.filter((power) => power.id !== collected.id));
    collectPower(collected.type);
  }, [powerUps, lane, status]);

  function claimVictory() {
    if (score < 500) {
      setMessage("Faça pelo menos 500 pontos para extrair vitória.");
      return;
    }
    const nextWins = wins + 1;
    const nextCoins = coins + 25;
    const nextXp = xp + 70;
    const nextBest = Math.max(bestScore, score);
    setWins(nextWins);
    setCoins(nextCoins);
    setXp(nextXp);
    setBestScore(nextBest);
    persist(nextCoins, nextXp, nextWins, losses, nextBest);
    setStatus("over");
    setMessage("Vitória extraída. +25 moedas e +70 XP.");
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-5 text-white sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-black/45 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-violet-300">THKLAYUS Arena</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Neon Runner</h1>
          <p className="mt-2 max-w-2xl text-zinc-400">Um jogo rápido: desvie dos blocos, colete power-ups, aumente combo, ganhe XP e bata recordes.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={startGame} className="pro-button rounded-2xl px-5 py-3 font-black">{status === "playing" ? "Reiniciar" : "Jogar agora"}</button>
          <button onClick={() => setStatus(status === "paused" ? "playing" : "paused")} disabled={status !== "playing" && status !== "paused"} className="rounded-2xl border border-white/15 px-5 py-3 font-bold text-white">{status === "paused" ? "Continuar" : "Pausar"}</button>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        <Metric label="Pontuação" value={score} detail="subindo em tempo real" />
        <Metric label="Recorde" value={bestScore} detail="salvo no celular" />
        <Metric label="Combo" value={`${combo}x`} detail="aumenta recompensa" />
        <Metric label="Escudo" value={shield} detail="proteção contra batida" />
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="glass-card overflow-hidden rounded-[2rem] p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-zinc-400">Status: <span className="text-white">{status}</span></p>
              <h2 className="text-2xl font-black">Pista Neon</h2>
            </div>
            <button onClick={claimVictory} className="rounded-2xl border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-100">Extrair vitória</button>
          </div>

          <div className="relative h-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(139,92,246,.22),transparent_26rem),linear-gradient(180deg,#08020f,#000)]">
            <div className="absolute inset-y-0 left-1/3 w-px bg-white/10" />
            <div className="absolute inset-y-0 left-2/3 w-px bg-white/10" />
            <div className="absolute left-0 right-0 top-8 h-px bg-violet-300/20" />
            <div className="absolute bottom-20 left-0 right-0 h-px bg-emerald-300/25" />

            {enemies.map((enemy) => (
              <div key={enemy.id} className="absolute h-12 w-[28%] rounded-2xl border border-red-300/30 bg-gradient-to-br from-red-500 to-red-900 shadow-xl shadow-red-950/50" style={{ left: `${enemy.lane * 33.333 + 2.5}%`, top: `${enemy.y}%` }}>
                <span className="flex h-full items-center justify-center text-xs font-black uppercase tracking-widest">BLOCO</span>
              </div>
            ))}

            {powerUps.map((power) => (
              <div key={power.id} className="absolute flex h-10 w-[20%] items-center justify-center rounded-full border border-white/20 bg-gradient-to-r from-violet-500 to-fuchsia-400 text-xs font-black text-white shadow-xl shadow-violet-950/50" style={{ left: `${power.lane * 33.333 + 6.5}%`, top: `${power.y}%` }}>
                {power.type === "coin" ? "+COIN" : power.type === "shield" ? "SHIELD" : "BOOST"}
              </div>
            ))}

            <div className="absolute bottom-10 h-16 w-[26%] rounded-[1.5rem] border border-white/30 bg-gradient-to-br from-white via-violet-100 to-violet-500 text-black shadow-2xl shadow-violet-500/30 transition-all duration-150" style={{ left: `${lane * 33.333 + 3.5}%` }}>
              <span className="flex h-full items-center justify-center text-lg font-black">VOCÊ</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button onClick={() => move(-1)} disabled={status !== "playing"} className="rounded-3xl border border-white/15 bg-white/[0.04] py-4 text-xl font-black">←</button>
            <button onClick={() => move(1)} disabled={status !== "playing"} className="rounded-3xl border border-white/15 bg-white/[0.04] py-4 text-xl font-black">→</button>
          </div>
          <p className="mt-3 rounded-2xl border border-violet-300/20 bg-violet-500/10 p-4 text-sm text-violet-100">{message}</p>
          <p className="mt-2 text-xs text-zinc-500">Teclado: A/← e D/→. Espaço pausa. Celular: botões grandes.</p>
        </section>

        <div className="space-y-6">
          <ArenaBoost level={level} xp={xp} coins={coins} wins={wins} losses={losses} combo={combo} deckCount={Math.max(0, 80 - tick)} handCount={lane + 1} playableCount={playableCount} started={status === "playing"} />

          <section className="pro-card rounded-3xl p-5">
            <h3 className="text-xl font-black">Missões do Runner</h3>
            <div className="mt-4 space-y-3">
              {missions.map((mission) => (
                <div key={mission.name} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/30 p-3">
                  <div>
                    <p className="font-bold text-white">{mission.name}</p>
                    <p className="text-xs text-zinc-400">{mission.reward}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${mission.done ? "bg-emerald-400/15 text-emerald-200" : "bg-white/10 text-zinc-300"}`}>{mission.done ? "feito" : "pendente"}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="pro-card rounded-3xl p-5">
            <h3 className="text-xl font-black">Mecânicas adicionadas</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              <li>• Runner com 3 pistas</li>
              <li>• Obstáculos dinâmicos</li>
              <li>• Power-up de moeda</li>
              <li>• Power-up de escudo</li>
              <li>• Power-up de boost</li>
              <li>• Combo e pontuação progressiva</li>
              <li>• Vitória manual por meta</li>
              <li>• Recorde salvo no navegador</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
