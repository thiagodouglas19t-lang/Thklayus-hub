import { useMemo, useState } from "react";

type Screen = "home" | "create" | "room" | "history";

type Option = {
  id: number;
  text: string;
  votes: number;
};

type Room = {
  id: number;
  title: string;
  options: Option[];
  finished: boolean;
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

  const [title, setTitle] = useState("");
  const [optionText, setOptionText] = useState("");
  const [options, setOptions] = useState<Option[]>([]);

  function addOption() {
    if (!optionText.trim()) return;
    setOptions([...options, { id: Date.now(), text: optionText, votes: 0 }]);
    setOptionText("");
  }

  function createRoom() {
    if (!title.trim() || options.length < 2) return;
    const room: Room = {
      id: Date.now(),
      title,
      options,
      finished: false,
    };
    setRooms([room, ...rooms]);
    setCurrentRoom(room);
    setScreen("room");
    setTitle("");
    setOptions([]);
  }

  function vote(optionId: number) {
    if (!currentRoom) return;
    const updated = {
      ...currentRoom,
      options: currentRoom.options.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      ),
    };
    setCurrentRoom(updated);
    setRooms((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  }

  const winner = useMemo(() => {
    if (!currentRoom) return null;
    return [...currentRoom.options].sort((a, b) => b.votes - a.votes)[0];
  }, [currentRoom]);

  return (
    <main className="min-h-screen bg-black text-white p-5">
      {screen === "home" && (
        <div>
          <h1 className="text-4xl font-black">ClashRoom</h1>
          <p className="text-zinc-400 mt-2">Crie salas e veja quem vence.</p>

          <button
            onClick={() => setScreen("create")}
            className="mt-5 bg-white text-black px-5 py-3 rounded-xl font-bold"
          >
            Criar sala
          </button>

          <div className="mt-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => {
                  setCurrentRoom(room);
                  setScreen("room");
                }}
                className="border border-white/10 p-4 rounded-xl mt-2 cursor-pointer"
              >
                <h2 className="font-bold">{room.title}</h2>
                <p className="text-sm text-zinc-500">
                  {room.options.length} opções
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {screen === "create" && (
        <div>
          <h1 className="text-3xl font-black">Nova sala</h1>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            className="mt-4 w-full p-3 bg-black border border-white/10 rounded-xl"
          />

          <div className="mt-4 flex gap-2">
            <input
              value={optionText}
              onChange={(e) => setOptionText(e.target.value)}
              placeholder="Opção"
              className="flex-1 p-3 bg-black border border-white/10 rounded-xl"
            />
            <button
              onClick={addOption}
              className="bg-white text-black px-4 rounded-xl"
            >
              +
            </button>
          </div>

          <div className="mt-4">
            {options.map((opt) => (
              <p key={opt.id} className="text-sm text-zinc-400">
                {opt.text}
              </p>
            ))}
          </div>

          <button
            onClick={createRoom}
            className="mt-6 bg-white text-black px-5 py-3 rounded-xl font-bold"
          >
            Criar
          </button>
        </div>
      )}

      {screen === "room" && currentRoom && (
        <div>
          <button onClick={() => setScreen("home")} className="mb-4">
            ← voltar
          </button>

          <h1 className="text-3xl font-black">{currentRoom.title}</h1>

          <div className="mt-6">
            {currentRoom.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => vote(opt.id)}
                className="w-full border border-white/10 p-4 rounded-xl mt-2"
              >
                {opt.text} ({opt.votes})
              </button>
            ))}
          </div>

          {winner && (
            <div className="mt-6 p-4 border border-white/10 rounded-xl">
              <p className="text-zinc-400">Líder:</p>
              <h2 className="text-xl font-black">{winner.text}</h2>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
