import { useEffect, useMemo, useState } from "react";
import { useTimer } from "./clash/useTimer";
import { Room, Screen, Mode, Option, WinnerRecord } from "./clash/types";

const starterRooms: Room[] = [
  { id: 1, title: "Melhor universo de anime?", category: "Anime", mode: "ranking", finished: false, votedBy: [], options: [{ id: 11, text: "Solo Leveling", votes: 7 }, { id: 12, text: "Tensei Slime", votes: 5 }, { id: 13, text: "Shadow Garden", votes: 9 }] }
];

export default function App() {
  const [player, setPlayer] = useState(() => localStorage.getItem("player") || "");
  const [rooms, setRooms] = useState<Room[]>(() => JSON.parse(localStorage.getItem("rooms") || "null") || starterRooms);
  const [history, setHistory] = useState<WinnerRecord[]>(() => JSON.parse(localStorage.getItem("history") || "[]"));
  const [currentRoom, setCurrentRoom] = useState<Room | null>(rooms[0]);

  const timer = useTimer(30);

  useEffect(() => { localStorage.setItem("rooms", JSON.stringify(rooms)); }, [rooms]);
  useEffect(() => { localStorage.setItem("history", JSON.stringify(history)); }, [history]);
  useEffect(() => { localStorage.setItem("player", player); }, [player]);

  const winner = useMemo(() => currentRoom ? [...currentRoom.options].sort((a, b) => b.votes - a.votes)[0] : null, [currentRoom]);

  function vote(optionId: number) {
    if (!currentRoom || timer.time <= 0 || currentRoom.votedBy.includes(player)) return;
    const updated: Room = {
      ...currentRoom,
      votedBy: [...currentRoom.votedBy, player],
      options: currentRoom.options.map(opt => opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt)
    };
    setCurrentRoom(updated);
    setRooms(prev => prev.map(r => r.id === updated.id ? updated : r));
  }

  function saveWinner() {
    if (!currentRoom || !winner) return;
    setHistory(prev => [{ id: Date.now(), roomTitle: currentRoom.title, winner: winner.text, votes: winner.votes, player }, ...prev]);
  }

  if (!player) {
    return (
      <main className="min-h-screen bg-black text-white p-5">
        <h1>Seu nome</h1>
        <input value={player} onChange={e => setPlayer(e.target.value)} className="border p-2" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-5">
      <h1>{currentRoom?.title}</h1>
      <p>Jogador: {player}</p>
      <p>Tempo: {timer.time}</p>

      <button onClick={timer.start}>Iniciar</button>

      {currentRoom?.options.map(opt => (
        <button key={opt.id} onClick={() => vote(opt.id)}>
          {opt.text} ({opt.votes})
        </button>
      ))}

      {timer.time === 0 && winner && (
        <div>
          <h2>🏆 {winner.text}</h2>
          <button onClick={saveWinner}>Salvar</button>
        </div>
      )}
    </main>
  );
}
