import { useEffect, useMemo, useState } from "react";
import { useTimer } from "./clash/useTimer";
import { Room, WinnerRecord } from "./clash/types";

const starterRooms: Room[] = [
  { id: 1, title: "Melhor universo de anime?", category: "Anime", mode: "ranking", finished: false, votedBy: [], options: [{ id: 11, text: "Solo Leveling", votes: 7 }, { id: 12, text: "Tensei Slime", votes: 5 }, { id: 13, text: "Shadow Garden", votes: 9 }] },
  { id: 2, title: "Duelo supremo", category: "Personagens", mode: "battle", finished: false, votedBy: [], options: [{ id: 21, text: "Sung Jin-Woo", votes: 10 }, { id: 22, text: "Rimuru", votes: 8 }] }
];

export default function App() {
  const [player, setPlayer] = useState(() => localStorage.getItem("player") || "");
  const [rooms, setRooms] = useState<Room[]>(() => JSON.parse(localStorage.getItem("rooms") || "null") || starterRooms);
  const [history, setHistory] = useState<WinnerRecord[]>(() => JSON.parse(localStorage.getItem("history") || "[]"));
  const [currentRoom, setCurrentRoom] = useState<Room | null>(rooms[0]);
  const [showHistory, setShowHistory] = useState(false);
  const timer = useTimer(30);

  useEffect(() => { localStorage.setItem("rooms", JSON.stringify(rooms)); }, [rooms]);
  useEffect(() => { localStorage.setItem("history", JSON.stringify(history)); }, [history]);
  useEffect(() => { localStorage.setItem("player", player); }, [player]);

  const winner = useMemo(() => currentRoom ? [...currentRoom.options].sort((a, b) => b.votes - a.votes)[0] : null, [currentRoom]);
  const totalVotes = currentRoom?.options.reduce((sum, opt) => sum + opt.votes, 0) || 0;
  const alreadyVoted = currentRoom?.votedBy.includes(player) || false;
  const playerWins = history.filter(item => item.player === player).length;

  function selectRoom(room: Room) {
    setCurrentRoom(room);
    timer.reset();
    setShowHistory(false);
  }

  function vote(optionId: number) {
    if (!currentRoom || timer.time <= 0 || alreadyVoted) return;
    const updated: Room = {
      ...currentRoom,
      votedBy: [...currentRoom.votedBy, player],
      options: currentRoom.options.map(opt => opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt)
    };
    setCurrentRoom(updated);
    setRooms(prev => prev.map(r => r.id === updated.id ? updated : r));
  }

  function resetRound() {
    if (!currentRoom) return;
    const updated: Room = { ...currentRoom, votedBy: [], options: currentRoom.options.map(opt => ({ ...opt, votes: 0 })) };
    setCurrentRoom(updated);
    setRooms(prev => prev.map(r => r.id === updated.id ? updated : r));
    timer.reset();
  }

  function saveWinner() {
    if (!currentRoom || !winner) return;
    setHistory(prev => [{ id: Date.now(), roomTitle: currentRoom.title, winner: winner.text, votes: winner.votes, player }, ...prev]);
    setShowHistory(true);
  }

  if (!player) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#050505] px-5 text-white">
        <section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-violet-200">ClashRoom</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.07em]">Escolha seu nome.</h1>
          <input value={player} onChange={e => setPlayer(e.target.value)} placeholder="Seu nome" className="mt-6 w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none" />
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(168,85,247,.32),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(59,130,246,.18),transparent_30%)]" />
      <section className="relative mx-auto grid min-h-screen max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[300px_1fr_360px]">
        <aside className="rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Jogador</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.06em]">{player}</h2>
          <div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-black/35 p-4"><p className="text-2xl font-black">{playerWins}</p><p className="text-xs text-zinc-500">wins</p></div><div className="rounded-2xl bg-black/35 p-4"><p className="text-2xl font-black">{rooms.length}</p><p className="text-xs text-zinc-500">salas</p></div></div>
          <p className="mt-6 text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Salas</p>
          <div className="mt-3 grid gap-3">{rooms.map(room => <button key={room.id} onClick={() => selectRoom(room)} className={`rounded-2xl border p-4 text-left transition ${currentRoom?.id === room.id ? 'border-white/40 bg-white/10' : 'border-white/10 bg-black/35 hover:bg-white/10'}`}><p className="font-black">{room.title}</p><p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">{room.category} • {room.mode}</p></button>)}</div>
        </aside>

        <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-violet-200">Arena ativa</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.07em] md:text-6xl">{currentRoom?.title}</h1>
          <p className="mt-3 text-sm text-zinc-500">{alreadyVoted ? "voto registrado" : "você ainda não votou"}</p>

          {timer.time === 0 && winner && <div className="mt-6 rounded-[2rem] bg-white p-5 text-black"><p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">Campeão</p><h2 className="mt-2 text-4xl font-black tracking-[-0.06em]">🏆 {winner.text}</h2></div>}

          <div className={`mt-8 grid gap-4 ${currentRoom?.mode === 'battle' ? 'md:grid-cols-2' : ''}`}>
            {currentRoom?.options.map(opt => {
              const percent = totalVotes ? Math.round((opt.votes / totalVotes) * 100) : 0;
              return (
                <button key={opt.id} onClick={() => vote(opt.id)} className="rounded-[2rem] border border-white/10 bg-black/35 p-5 text-left transition hover:-translate-y-1 hover:bg-white/10 disabled:opacity-50" disabled={alreadyVoted || timer.time <= 0}>
                  <div className="flex items-center justify-between gap-4"><p className="text-2xl font-black tracking-[-0.05em]">{opt.text}</p><p className="text-3xl font-black">{opt.votes}</p></div>
                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-white" style={{ width: `${percent}%` }} /></div>
                  <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-zinc-500">{percent}% dos votos</p>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Painel</p>
          <h2 className="mt-3 text-7xl font-black tracking-[-0.09em]">{timer.time}s</h2>
          <p className="mt-2 text-sm text-zinc-400">{timer.running ? "Rodada ativa" : timer.time === 0 ? "Encerrada" : "Pronto"}</p>
          <div className="mt-6 rounded-3xl bg-black/35 p-5"><p className="text-sm text-zinc-500">Líder</p><p className="mt-2 text-3xl font-black tracking-[-0.06em]">{winner?.text}</p><p className="mt-2 text-sm text-zinc-500">{totalVotes} votos</p></div>
          <button onClick={timer.start} className="mt-6 w-full rounded-2xl bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-black">Iniciar</button>
          <button onClick={saveWinner} className="mt-3 w-full rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-zinc-300">Salvar campeão</button>
          <button onClick={resetRound} className="mt-3 w-full rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-zinc-300">Nova rodada</button>
          <button onClick={() => setShowHistory(!showHistory)} className="mt-3 w-full rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-zinc-300">Histórico</button>
          {showHistory && <div className="mt-4 grid gap-3">{history.slice(0, 5).map(item => <div key={item.id} className="rounded-2xl bg-black/35 p-4"><p className="text-xs text-zinc-500">{item.roomTitle}</p><p className="font-black">🏆 {item.winner}</p></div>)}</div>}
        </aside>
      </section>
    </main>
  );
}
