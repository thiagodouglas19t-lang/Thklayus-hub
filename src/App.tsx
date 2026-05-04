import { useMemo, useState } from "react";
import { useTimer } from "./clash/useTimer";
import { Room, Screen, Mode, Option, WinnerRecord } from "./clash/types";

const starterRooms: Room[] = [
  { id: 1, title: "Melhor universo de anime?", category: "Anime", mode: "ranking", finished: false, options: [{ id: 11, text: "Solo Leveling", votes: 7 }, { id: 12, text: "Tensei Slime", votes: 5 }, { id: 13, text: "Shadow Garden", votes: 9 }] },
  { id: 2, title: "Duelo supremo", category: "Personagens", mode: "battle", finished: false, options: [{ id: 21, text: "Sung Jin-Woo", votes: 10 }, { id: 22, text: "Rimuru", votes: 8 }] },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [rooms, setRooms] = useState<Room[]>(starterRooms);
  const [history, setHistory] = useState<WinnerRecord[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(starterRooms[0]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Geral");
  const [mode, setMode] = useState<Mode>("ranking");
  const [optionText, setOptionText] = useState("");
  const [options, setOptions] = useState<Option[]>([]);

  const timer = useTimer(30);

  const totalVotes = useMemo(() => rooms.reduce((sum, room) => sum + room.options.reduce((votes, opt) => votes + opt.votes, 0), 0), [rooms]);
  const winner = useMemo(() => currentRoom ? [...currentRoom.options].sort((a, b) => b.votes - a.votes)[0] : null, [currentRoom]);

  function vote(optionId: number) {
    if (!currentRoom || timer.time <= 0) return;
    const updated: Room = { ...currentRoom, options: currentRoom.options.map((opt) => opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt) };
    setCurrentRoom(updated);
    setRooms((current) => current.map((room) => room.id === updated.id ? updated : room));
  }

  return (
    <main className="min-h-screen bg-black text-white p-5">
      <h1 className="text-3xl font-black">ClashRoom Clean</h1>

      <button onClick={timer.start} className="mt-4 bg-white text-black px-4 py-2">Start</button>
      <button onClick={timer.reset} className="mt-2 border px-4 py-2">Reset</button>

      <p className="mt-4 text-xl">Timer: {timer.time}</p>

      {currentRoom && currentRoom.options.map((opt) => (
        <button key={opt.id} onClick={() => vote(opt.id)} className="block mt-2 border p-3 w-full">
          {opt.text} ({opt.votes})
        </button>
      ))}

      {timer.time === 0 && winner && (
        <div className="mt-6">
          <h2>🏆 {winner.text}</h2>
        </div>
      )}
    </main>
  );
}
