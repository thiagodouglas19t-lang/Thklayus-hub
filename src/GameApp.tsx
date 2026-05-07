import { useEffect, useMemo, useState } from "react";
import ClashCardsV2 from "./ClashCardsV2";
import AuthGate from "./components/AuthGate";
import LobbyHome from "./components/game/LobbyHome";
import { adminCoins, isAdminEmail } from "./lib/admin";
import { avatarItems } from "./lib/cosmetics";
import { claimDailyReward, getDailyRewardState } from "./lib/dailyRewards";
import { gameIdentity } from "./lib/gameIdentity";
import { useAuthUser } from "./lib/useAuthUser";

type Screen = "home" | "play" | "profile" | "shop" | "modes";

const storage = gameIdentity.storage;
function readNumber(key: string) { return Number(localStorage.getItem(`${storage}:${key}`) || 0); }
function writeNumber(key: string, value: number) { localStorage.setItem(`${storage}:${key}`, String(value)); }
function readText(key: string, fallback = "") { return localStorage.getItem(`${storage}:${key}`) || fallback; }
function writeText(key: string, value: string) { localStorage.setItem(`${storage}:${key}`, value); }
function ownedAvatars() { return new Set((localStorage.getItem(`${storage}:ownedAvatars`) || "default").split(",").filter(Boolean)); }
function saveOwned(set: Set<string>) { localStorage.setItem(`${storage}:ownedAvatars`, Array.from(set).join(",")); }

function NavButton({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return <button onClick={onClick} className={`shrink-0 rounded-2xl px-4 py-3 text-sm font-black transition active:scale-[.98] ${active ? "bg-yellow-300 text-black shadow-[0_0_26px_rgba(250,204,21,.45)]" : "bg-white/[0.06] text-white/75 hover:bg-white/10"}`}>{children}</button>;
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]"><p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{label}</p><strong className="mt-2 block text-2xl text-white">{value}</strong></div>;
}

export default function GameApp() {
  const { user, setUser, loading } = useAuthUser();
  const isAdmin = isAdminEmail(user?.email);
  const [screen, setScreen] = useState<Screen>("home");
  const [shopMessage, setShopMessage] = useState("Cosméticos apenas. Nada de pay-to-win.");
  const [refresh, setRefresh] = useState(0);
  const [playerName, setPlayerName] = useState(readText("playerName", "Kairós"));
  const [selectedMode, setSelectedMode] = useState(gameIdentity.modes[0]);
  const [daily, setDaily] = useState(getDailyRewardState());
  const [lobbyMessage, setLobbyMessage] = useState("Lobby pronto. Clash Cards está disponível.");

  useEffect(() => {
    document.documentElement.style.background = "#000";
    document.body.style.background = "#000";
    document.body.style.overflowX = "hidden";
    document.body.style.margin = "0";
    try {
      const orientation = screen.orientation as ScreenOrientation & { lock?: (orientation: string) => Promise<void> };
      orientation.lock?.("portrait").catch(() => undefined);
    } catch {}
  }, []);

  const roomCode = readText("roomCode", "THK-742");
  const stats = useMemo(() => { const rawCoins = readNumber("coins"); const coins = adminCoins(rawCoins, user?.email); const xp = readNumber("xp"); const wins = readNumber("wins"); const losses = readNumber("losses"); const level = Math.floor(xp / 100) + 1; const total = Math.max(1, wins + losses); const winRate = Math.round((wins / total) * 100); const currentLevelXp = xp % 100; return { coins, xp, wins, losses, level, winRate, currentLevelXp }; }, [screen, refresh, user?.email]);
  const equippedId = readText("equippedAvatar", "default");
  const owned = ownedAvatars();
  const equipped = avatarItems.find((item) => item.id === equippedId) || avatarItems[0];
  function forceRefresh() { setRefresh((value) => value + 1); }
  function saveName() { const clean = playerName.trim().slice(0, 18) || "Jogador THK"; setPlayerName(clean); writeText("playerName", clean); setLobbyMessage("Nome atualizado."); forceRefresh(); }
  function copyRoomCode() { navigator.clipboard?.writeText(roomCode); setLobbyMessage("Código da sala copiado."); }
  function claimDaily() { const result = claimDailyReward(); setDaily(getDailyRewardState()); setLobbyMessage(result.claimed ? `Recompensa diária coletada: +${result.reward} moedas.` : "Você já coletou a recompensa de hoje."); forceRefresh(); }
  function buyOrEquip(id: string, price: number) { const currentOwned = ownedAvatars(); if (currentOwned.has(id)) { writeText("equippedAvatar", id); setShopMessage("Avatar equipado."); forceRefresh(); return; } if (!isAdmin) { const coins = readNumber("coins"); if (coins < price) { setShopMessage(`Moedas insuficientes. Faltam ${price - coins} moedas.`); return; } writeNumber("coins", coins - price); } currentOwned.add(id); saveOwned(currentOwned); writeText("equippedAvatar", id); setShopMessage(isAdmin ? "ADM: avatar liberado e equipado." : "Avatar comprado e equipado."); forceRefresh(); }

  if (screen === "play") return <ClashCardsV2 onBack={() => setScreen("home")} />;

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <div className="mx-auto min-h-screen w-full max-w-[430px] bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,.38),transparent_22rem),linear-gradient(180deg,#050008,#000)] px-3 py-4 shadow-[0_0_80px_rgba(0,0,0,.85)] sm:max-w-[460px]">
        <header className="mb-4 flex items-center justify-between gap-3">
          <div className="min-w-0"><p className="text-[10px] uppercase tracking-[0.34em] text-yellow-300">{gameIdentity.brand}</p><h1 className="truncate text-3xl font-black tracking-tight">{gameIdentity.appName}</h1><p className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">{loading ? "Carregando conta..." : isAdmin ? "ADM Alpha Arena" : gameIdentity.version}</p></div>
          <div className="flex shrink-0 flex-col items-end gap-2"><div className="rounded-full border border-yellow-300/25 bg-yellow-300/10 px-3 py-2 text-xs font-black shadow-[0_0_30px_rgba(250,204,21,.22)]">🪙 {stats.coins}</div><div className="rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-2 text-xs font-black">Nv. {stats.level}</div></div>
        </header>
        <nav className="mb-4 flex gap-2 overflow-x-auto pb-2"><NavButton active={screen === "home"} onClick={() => setScreen("home")}>Lobby</NavButton><NavButton active={screen === "modes"} onClick={() => setScreen("modes")}>Jogos</NavButton><NavButton active={screen === "profile"} onClick={() => setScreen("profile")}>Perfil</NavButton><NavButton active={screen === "shop"} onClick={() => setScreen("shop")}>Loja</NavButton></nav>
        {screen === "home" && <LobbyHome playerName={readText("playerName", user?.email?.split("@")[0] || "Kairós")} equipped={equipped} stats={stats} daily={daily} roomCode={roomCode} lobbyMessage={isAdmin ? "ADM ativo: economia liberada para testes." : lobbyMessage} selectedMode={selectedMode} onPlay={() => setScreen("play")} onClaimDaily={claimDaily} onCopyRoomCode={copyRoomCode} onSelectMode={setSelectedMode} onLobbyMessage={setLobbyMessage} />}
        {screen === "modes" && <section className="grid gap-4">{gameIdentity.modes.map((mode, index) => <button key={mode.id} onClick={() => index === 0 ? setScreen("play") : setSelectedMode(mode)} className={`rounded-[2rem] border p-6 text-left transition active:scale-[.99] ${index === 0 ? "border-violet-300/30 bg-violet-500/10 shadow-[0_0_55px_rgba(139,92,246,.14)]" : "border-white/10 bg-white/[0.045] opacity-85"}`}><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-zinc-200">{mode.status}</span><h2 className="mt-4 text-3xl font-black">{mode.title}</h2><p className="mt-2 text-sm text-zinc-400">{mode.description}</p></button>)}</section>}
        {screen === "profile" && <section className="grid gap-5"><div className="space-y-5"><div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl"><div className="flex items-center gap-4"><div className={`grid h-24 w-24 place-items-center rounded-[1.7rem] bg-gradient-to-br ${equipped?.gradient || "from-violet-700 to-cyan-400"} text-5xl shadow-2xl`}>{equipped?.emoji || "⚡"}</div><div><p className="text-xs uppercase tracking-[0.28em] text-violet-300">Perfil</p><h2 className="text-3xl font-black">{readText("playerName", user?.email?.split("@")[0] || "Kairós")}</h2><p className="text-zinc-400">Avatar: {equipped?.name || "Padrão"}</p>{isAdmin && <p className="mt-2 inline-flex rounded-full bg-amber-300 px-3 py-1 text-xs font-black text-black">ADM · teste ilimitado</p>}</div></div><div className="mt-5 flex gap-2"><input value={playerName} onChange={(event) => setPlayerName(event.target.value)} className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 font-bold outline-none focus:border-violet-300" placeholder="Nome do jogador" /><button onClick={saveName} className="rounded-2xl bg-violet-300 px-5 py-3 font-black text-black">Salvar</button></div></div><AuthGate user={user} onUserChange={setUser} /></div><div className="grid gap-4 sm:grid-cols-2"><Stat label="Moedas" value={stats.coins} /><Stat label="XP total" value={stats.xp} /><Stat label="Vitórias" value={stats.wins} /><Stat label="Derrotas" value={stats.losses} /><Stat label="Win rate" value={`${stats.winRate}%`} /><Stat label="Nível" value={stats.level} /></div></section>}
        {screen === "shop" && <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl"><div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-xs uppercase tracking-[0.28em] text-yellow-300">Loja</p><h2 className="text-3xl font-black">Avatares Neon</h2><p className="mt-1 text-sm text-zinc-400">{isAdmin ? "ADM ativo: todos os cosméticos podem ser liberados para teste." : shopMessage}</p></div><div className="rounded-full border border-yellow-300/25 bg-yellow-300/10 px-4 py-2 text-sm font-black">🪙 {stats.coins}</div></div><div className="grid gap-4 sm:grid-cols-2">{avatarItems.map((item) => { const isOwned = owned.has(item.id); const isEquipped = equipped?.id === item.id; return <button key={item.id} onClick={() => buyOrEquip(item.id, item.price)} className={`rounded-[2rem] border p-4 text-left transition active:scale-[.99] ${isEquipped ? "border-yellow-300 bg-yellow-300/15" : "border-white/10 bg-black/35 hover:bg-white/[0.06]"}`}><div className={`grid h-24 place-items-center rounded-[1.5rem] bg-gradient-to-br ${item.gradient} text-5xl shadow-[0_20px_55px_rgba(0,0,0,.42)]`}>{item.emoji}</div><div className="mt-4 flex items-start justify-between gap-2"><div><strong className="block text-lg">{item.name}</strong><p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{item.rarity}</p></div><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black">{isEquipped ? "Usando" : isOwned ? "Equipar" : isAdmin ? "ADM" : `🪙 ${item.price}`}</span></div></button>; })}</div></section>}
      </div>
    </main>
  );
}
