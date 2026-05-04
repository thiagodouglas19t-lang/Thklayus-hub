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
  category: string;
  options: Option[];
  finished: boolean;
};

type WinnerRecord = {
  id: number;
  roomTitle: string;
  winner: string;
  votes: number;
};

const starterRooms: Room[] = [
  {
    id: 1,
    title: "Melhor universo de anime?",
    category: "Anime",
    finished: false,
    options: [
      { id: 11, text: "Solo Leveling", votes: 7 },
      { id: 12, text: "Tensei Slime", votes: 5 },
      { id: 13, text: "Shadow Garden", votes: 9 },
    ],
  },
  {
    id: 2,
    title: "Qual ideia parece mais forte?",
    category: "Startups",
    finished: false,
    options: [
      { id: 21, text: "App social de disputa", votes: 4 },
      { id: 22, text: "App de comunidade local", votes: 2 },
      { id: 23, text: "App de desafios criativos", votes: 3 },
    ],
  },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [rooms, setRooms] = useState<Room[]>(starterRooms);
  const [history, setHistory] = useState<WinnerRecord[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(starterRooms[0]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Geral");
  const [optionText, setOptionText] = useState("");
  const [options, setOptions] = useState<Option[]>([]);

  const totalVotes = useMemo(() => rooms.reduce((sum, room) => sum + room.options.reduce((votes, opt) => votes + opt.votes, 0), 0), [rooms]);

  function addOption() {
    if (!optionText.trim()) return;
    setOptions((current) => [...current, { id: Date.now(), text: optionText.trim(), votes: 0 }]);
    setOptionText("");
  }

  function createRoom() {
    if (!title.trim() || options.length < 2) return;
    const room: Room = { id: Date.now(), title: title.trim(), category, options, finished: false };
    setRooms((current) => [room, ...current]);
    setCurrentRoom(room);
    setTitle("");
    setCategory("Geral");
    setOptions([]);
    setScreen("room");
  }

  function vote(optionId: number) {
    if (!currentRoom || currentRoom.finished) return;
    const updated: Room = {
      ...currentRoom,
      options: currentRoom.options.map((opt) => opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt),
    };
    setCurrentRoom(updated);
    setRooms((current) => current.map((room) => room.id === updated.id ? updated : room));
  }

  function finishRoom() {
    if (!currentRoom) return;
    const winner = [...currentRoom.options].sort((a, b) => b.votes - a.votes)[0];
    const finishedRoom = { ...currentRoom, finished: true };
    setCurrentRoom(finishedRoom);
    setRooms((current) => current.map((room) => room.id === finishedRoom.id ? finishedRoom : room));
    setHistory((current) => [{ id: Date.now(), roomTitle: currentRoom.title, winner: winner.text, votes: winner.votes }, ...current]);
    setScreen("history");
  }

  const winner = useMemo(() => {
    if (!currentRoom) return null;
    return [...currentRoom.options].sort((a, b) => b.votes - a.votes)[0];
  }, [currentRoom]);

  const roomVotes = currentRoom?.options.reduce((sum, opt) => sum + opt.votes, 0) ?? 0;

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(168,85,247,0.28),transparent_32%),radial-gradient(circle_at_90%_18%,rgba(59,130,246,0.18),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_24%)]" />
      <section className="relative mx-auto min-h-screen max-w-7xl px-5 py-5 md:px-8">
        <header className="flex items-center justify-between rounded-[1.7rem] border border-white/10 bg-white/[0.055] p-3 backdrop-blur-2xl">
          <button onClick={() => setScreen("home")} className="flex items-center gap-3 rounded-2xl px-2 py-2 text-left">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-lg font-black text-black">C</div>
            <div>
              <p className="text-sm font-black tracking-tight">ClashRoom</p>
              <p className="text-xs font-bold text-zinc-500">Salas de disputa social</p>
            </div>
          </button>
          <nav className="hidden gap-2 md:flex">
            {([['home','Início'],['create','Criar'],['room','Arena'],['history','Histórico']] as [Screen,string][]).map(([id,label]) => (
              <button key={id} onClick={() => setScreen(id)} className={`rounded-2xl px-4 py-3 text-xs font-black uppercase tracking-[0.16em] transition ${screen === id ? 'bg-white text-black' : 'text-zinc-400 hover:bg-white/10 hover:text-white'}`}>{label}</button>
            ))}
          </nav>
          <button onClick={() => setScreen("create")} className="rounded-2xl bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-black">+ Sala</button>
        </header>

        {screen === "home" && (
          <div className="grid gap-6 py-6 lg:grid-cols-[1fr_390px]">
            <section className="rounded-[2.8rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl md:p-9">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-violet-200">Arena social</p>
              <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.08em] md:text-7xl">Crie uma disputa. Deixe a galera decidir.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">ClashRoom é um app de salas rápidas com opções, votos, ranking e vencedores. Uma ideia simples com energia social.</p>
              <div className="mt-9 grid gap-4 md:grid-cols-3">
                <div className="rounded-[2rem] border border-white/10 bg-black/35 p-5"><p className="text-sm text-zinc-500">Salas</p><p className="mt-3 text-4xl font-black">{rooms.length}</p></div>
                <div className="rounded-[2rem] border border-white/10 bg-black/35 p-5"><p className="text-sm text-zinc-500">Votos</p><p className="mt-3 text-4xl font-black">{totalVotes}</p></div>
                <div className="rounded-[2rem] border border-white/10 bg-black/35 p-5"><p className="text-sm text-zinc-500">Vencedores</p><p className="mt-3 text-4xl font-black">{history.length}</p></div>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <button onClick={() => setScreen('create')} className="rounded-2xl bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-black">Criar disputa</button>
                <button onClick={() => setScreen('room')} className="rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-white">Entrar na arena</button>
              </div>
            </section>
            <aside className="rounded-[2.8rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Salas ativas</p>
              <div className="mt-5 grid gap-3">{rooms.map((room) => <button key={room.id} onClick={() => { setCurrentRoom(room); setScreen('room'); }} className="rounded-3xl border border-white/10 bg-black/35 p-4 text-left transition hover:bg-white/10"><p className="font-black">{room.title}</p><p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">{room.category} • {room.options.length} opções</p></button>)}</div>
            </aside>
          </div>
        )}

        {screen === "create" && (
          <div className="grid min-h-[calc(100vh-120px)] place-items-center py-8">
            <section className="w-full max-w-2xl rounded-[2.8rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-violet-200">Nova disputa</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.07em] md:text-6xl">Monte a sala.</h2>
              <div className="mt-8 grid gap-4">
                <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Ex: Melhor personagem?" className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-zinc-600 focus:border-white/30" />
                <input value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Categoria" className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-zinc-600 focus:border-white/30" />
                <div className="flex gap-2"><input value={optionText} onChange={(e)=>setOptionText(e.target.value)} onKeyDown={(e)=>{ if(e.key === 'Enter') addOption(); }} placeholder="Adicionar opção" className="flex-1 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-zinc-600 focus:border-white/30" /><button onClick={addOption} className="rounded-2xl bg-white px-5 font-black text-black">+</button></div>
                <div className="grid gap-2">{options.map((option, index)=><div key={option.id} className="rounded-2xl border border-white/10 bg-black/35 p-3 text-sm font-bold text-zinc-300">{index + 1}. {option.text}</div>)}</div>
                <button onClick={createRoom} className="rounded-2xl bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-black">Criar sala</button>
              </div>
            </section>
          </div>
        )}

        {screen === "room" && currentRoom && (
          <div className="grid gap-6 py-6 lg:grid-cols-[1fr_360px]">
            <section className="rounded-[2.8rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-violet-200">Arena • {currentRoom.category}</p>
              <h1 className="mt-3 text-4xl font-black tracking-[-0.07em] md:text-6xl">{currentRoom.title}</h1>
              <div className="mt-8 grid gap-4">
                {currentRoom.options.map((option) => {
                  const percent = roomVotes ? Math.round((option.votes / roomVotes) * 100) : 0;
                  return (
                    <button key={option.id} onClick={()=>vote(option.id)} className="rounded-[2rem] border border-white/10 bg-black/35 p-5 text-left transition hover:bg-white/10">
                      <div className="flex items-center justify-between gap-4"><p className="text-xl font-black tracking-[-0.04em]">{option.text}</p><p className="text-2xl font-black">{option.votes}</p></div>
                      <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-white transition-all" style={{ width: `${percent}%` }} /></div>
                      <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-zinc-500">{percent}% dos votos</p>
                    </button>
                  );
                })}
              </div>
            </section>
            <aside className="rounded-[2.8rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Placar</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.07em]">{winner?.text ?? 'Sem líder'}</h2>
              <p className="mt-3 text-sm text-zinc-400">Líder atual da sala.</p>
              <div className="mt-6 rounded-3xl bg-black/35 p-5"><p className="text-sm text-zinc-500">Total de votos</p><p className="mt-2 text-4xl font-black">{roomVotes}</p></div>
              <button onClick={finishRoom} className="mt-6 w-full rounded-2xl bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-black">Finalizar rodada</button>
            </aside>
          </div>
        )}

        {screen === "history" && (
          <div className="py-8"><p className="text-xs font-black uppercase tracking-[0.24em] text-violet-200">Histórico</p><h2 className="mt-3 text-5xl font-black tracking-[-0.08em] md:text-7xl">Vencedores.</h2><div className="mt-8 grid gap-4">{history.length ? history.map((record)=><div key={record.id} className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5"><p className="text-sm text-zinc-500">{record.roomTitle}</p><h3 className="mt-2 text-3xl font-black tracking-[-0.06em]">{record.winner}</h3><p className="mt-2 text-sm text-zinc-500">{record.votes} votos</p></div>) : <p className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 text-zinc-400">Nenhuma rodada finalizada ainda.</p>}</div></div>
        )}

        <nav className="fixed bottom-4 left-1/2 z-20 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 justify-between rounded-[1.5rem] border border-white/10 bg-black/85 p-2 backdrop-blur-2xl md:hidden">
          {([['home','Home'],['create','Criar'],['room','Arena'],['history','Venced.']] as [Screen,string][]).map(([id,label]) => <button key={id} onClick={() => setScreen(id)} className={`rounded-2xl px-3 py-3 text-[11px] font-black ${screen === id ? 'bg-white text-black' : 'text-zinc-500'}`}>{label}</button>)}
        </nav>
      </section>
    </main>
  );
}
