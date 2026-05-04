import { useMemo, useState } from "react";

type Screen = "home" | "create" | "room" | "history";
type Mode = "battle" | "ranking";

type Option = { id: number; text: string; votes: number };
type Room = { id: number; title: string; category: string; mode: Mode; options: Option[]; finished: boolean };
type WinnerRecord = { id: number; roomTitle: string; winner: string; votes: number };

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

  const totalVotes = useMemo(() => rooms.reduce((sum, room) => sum + room.options.reduce((votes, opt) => votes + opt.votes, 0), 0), [rooms]);
  const winner = useMemo(() => currentRoom ? [...currentRoom.options].sort((a, b) => b.votes - a.votes)[0] : null, [currentRoom]);
  const roomVotes = currentRoom?.options.reduce((sum, opt) => sum + opt.votes, 0) ?? 0;

  function addOption() {
    if (!optionText.trim()) return;
    if (mode === "battle" && options.length >= 2) return;
    setOptions((current) => [...current, { id: Date.now(), text: optionText.trim(), votes: 0 }]);
    setOptionText("");
  }

  function createRoom() {
    if (!title.trim() || options.length < 2) return;
    const room: Room = { id: Date.now(), title: title.trim(), category, mode, options, finished: false };
    setRooms((current) => [room, ...current]);
    setCurrentRoom(room);
    setTitle("");
    setCategory("Geral");
    setOptions([]);
    setMode("ranking");
    setScreen("room");
  }

  function vote(optionId: number) {
    if (!currentRoom || currentRoom.finished) return;
    const updated: Room = { ...currentRoom, options: currentRoom.options.map((opt) => opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt) };
    setCurrentRoom(updated);
    setRooms((current) => current.map((room) => room.id === updated.id ? updated : room));
  }

  function resetVotes() {
    if (!currentRoom) return;
    const updated = { ...currentRoom, finished: false, options: currentRoom.options.map((opt) => ({ ...opt, votes: 0 })) };
    setCurrentRoom(updated);
    setRooms((current) => current.map((room) => room.id === updated.id ? updated : room));
  }

  function finishRoom() {
    if (!currentRoom || !winner) return;
    const finishedRoom = { ...currentRoom, finished: true };
    setCurrentRoom(finishedRoom);
    setRooms((current) => current.map((room) => room.id === finishedRoom.id ? finishedRoom : room));
    setHistory((current) => [{ id: Date.now(), roomTitle: currentRoom.title, winner: winner.text, votes: winner.votes }, ...current]);
    setScreen("history");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(168,85,247,0.32),transparent_32%),radial-gradient(circle_at_90%_18%,rgba(59,130,246,0.20),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(236,72,153,0.14),transparent_30%)]" />
      <section className="relative mx-auto min-h-screen max-w-7xl px-5 py-5 md:px-8">
        <header className="flex items-center justify-between rounded-[1.7rem] border border-white/10 bg-white/[0.055] p-3 backdrop-blur-2xl">
          <button onClick={() => setScreen("home")} className="flex items-center gap-3 rounded-2xl px-2 py-2 text-left">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-lg font-black text-black">C</div>
            <div><p className="text-sm font-black tracking-tight">ClashRoom</p><p className="text-xs font-bold text-zinc-500">Arena social de votos</p></div>
          </button>
          <nav className="hidden gap-2 md:flex">{([['home','Início'],['create','Criar'],['room','Arena'],['history','Histórico']] as [Screen,string][]).map(([id,label]) => <button key={id} onClick={() => setScreen(id)} className={`rounded-2xl px-4 py-3 text-xs font-black uppercase tracking-[0.16em] transition ${screen === id ? 'bg-white text-black' : 'text-zinc-400 hover:bg-white/10 hover:text-white'}`}>{label}</button>)}</nav>
          <button onClick={() => setScreen("create")} className="rounded-2xl bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-black">+ Sala</button>
        </header>

        {screen === "home" && <div className="grid gap-6 py-6 lg:grid-cols-[1fr_390px]"><section className="rounded-[2.8rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl md:p-9"><p className="text-xs font-black uppercase tracking-[0.24em] text-violet-200">Arena social</p><h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.08em] md:text-7xl">Disputas rápidas com placar vivo.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">Crie duelos 1x1 ou rankings com várias opções. Vote, acompanhe porcentagens, finalize rodadas e salve vencedores.</p><div className="mt-9 grid gap-4 md:grid-cols-3"><div className="rounded-[2rem] border border-white/10 bg-black/35 p-5"><p className="text-sm text-zinc-500">Salas</p><p className="mt-3 text-4xl font-black">{rooms.length}</p></div><div className="rounded-[2rem] border border-white/10 bg-black/35 p-5"><p className="text-sm text-zinc-500">Votos</p><p className="mt-3 text-4xl font-black">{totalVotes}</p></div><div className="rounded-[2rem] border border-white/10 bg-black/35 p-5"><p className="text-sm text-zinc-500">Campeões</p><p className="mt-3 text-4xl font-black">{history.length}</p></div></div><div className="mt-9 flex flex-wrap gap-3"><button onClick={() => setScreen('create')} className="rounded-2xl bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-black">Criar disputa</button><button onClick={() => setScreen('room')} className="rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-white">Entrar na arena</button></div></section><aside className="rounded-[2.8rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Salas ativas</p><div className="mt-5 grid gap-3">{rooms.map((room) => <button key={room.id} onClick={() => { setCurrentRoom(room); setScreen('room'); }} className="rounded-3xl border border-white/10 bg-black/35 p-4 text-left transition hover:bg-white/10"><p className="font-black">{room.title}</p><p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">{room.category} • {room.mode === 'battle' ? 'Duelo' : 'Ranking'} • {room.options.length} opções</p></button>)}</div></aside></div>}

        {screen === "create" && <div className="grid min-h-[calc(100vh-120px)] place-items-center py-8"><section className="w-full max-w-2xl rounded-[2.8rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl md:p-8"><p className="text-xs font-black uppercase tracking-[0.24em] text-violet-200">Nova sala</p><h2 className="mt-3 text-4xl font-black tracking-[-0.07em] md:text-6xl">Monte a disputa.</h2><div className="mt-8 grid gap-4"><input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Ex: Melhor personagem?" className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-zinc-600 focus:border-white/30" /><input value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Categoria" className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-zinc-600 focus:border-white/30" /><div className="grid grid-cols-2 gap-2"><button onClick={()=>{setMode('ranking'); setOptions([])}} className={`rounded-2xl px-5 py-4 text-sm font-black uppercase tracking-[0.14em] ${mode === 'ranking' ? 'bg-white text-black' : 'bg-black/40 text-zinc-400'}`}>Ranking</button><button onClick={()=>{setMode('battle'); setOptions([])}} className={`rounded-2xl px-5 py-4 text-sm font-black uppercase tracking-[0.14em] ${mode === 'battle' ? 'bg-white text-black' : 'bg-black/40 text-zinc-400'}`}>Duelo</button></div><div className="flex gap-2"><input value={optionText} onChange={(e)=>setOptionText(e.target.value)} onKeyDown={(e)=>{ if(e.key === 'Enter') addOption(); }} placeholder={mode === 'battle' ? 'Adicionar lutador (máx. 2)' : 'Adicionar opção'} className="flex-1 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-zinc-600 focus:border-white/30" /><button onClick={addOption} className="rounded-2xl bg-white px-5 font-black text-black">+</button></div><div className="grid gap-2">{options.map((option, index)=><div key={option.id} className="rounded-2xl border border-white/10 bg-black/35 p-3 text-sm font-bold text-zinc-300">{index + 1}. {option.text}</div>)}</div><button onClick={createRoom} className="rounded-2xl bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-black">Criar sala</button></div></section></div>}

        {screen === "room" && currentRoom && <div className="grid gap-6 py-6 lg:grid-cols-[1fr_360px]"><section className="rounded-[2.8rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl md:p-8"><p className="text-xs font-black uppercase tracking-[0.24em] text-violet-200">Arena • {currentRoom.category} • {currentRoom.mode === 'battle' ? 'Duelo' : 'Ranking'}</p><h1 className="mt-3 text-4xl font-black tracking-[-0.07em] md:text-6xl">{currentRoom.title}</h1><div className={`mt-8 grid gap-4 ${currentRoom.mode === 'battle' ? 'md:grid-cols-2' : ''}`}>{currentRoom.options.map((option) => { const percent = roomVotes ? Math.round((option.votes / roomVotes) * 100) : 0; return <button key={option.id} onClick={()=>vote(option.id)} className="rounded-[2rem] border border-white/10 bg-black/35 p-5 text-left transition hover:-translate-y-1 hover:bg-white/10"><div className="flex items-center justify-between gap-4"><p className="text-2xl font-black tracking-[-0.05em]">{option.text}</p><p className="text-3xl font-black">{option.votes}</p></div><div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-white transition-all" style={{ width: `${percent}%` }} /></div><p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-zinc-500">{percent}% dos votos</p></button> })}</div></section><aside className="rounded-[2.8rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Placar</p><h2 className="mt-3 text-4xl font-black tracking-[-0.07em]">{winner?.text ?? 'Sem líder'}</h2><p className="mt-3 text-sm text-zinc-400">Líder atual da sala.</p><div className="mt-6 rounded-3xl bg-black/35 p-5"><p className="text-sm text-zinc-500">Total de votos</p><p className="mt-2 text-4xl font-black">{roomVotes}</p></div><button onClick={finishRoom} className="mt-6 w-full rounded-2xl bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-black">Finalizar rodada</button><button onClick={resetVotes} className="mt-3 w-full rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-zinc-300">Resetar votos</button></aside></div>}

        {screen === "history" && <div className="py-8"><p className="text-xs font-black uppercase tracking-[0.24em] text-violet-200">Histórico</p><h2 className="mt-3 text-5xl font-black tracking-[-0.08em] md:text-7xl">Campeões.</h2><div className="mt-8 grid gap-4">{history.length ? history.map((record)=><div key={record.id} className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5"><p className="text-sm font-bold text-zinc-500">{record.roomTitle}</p><h3 className="mt-2 text-3xl font-black tracking-[-0.06em]">{record.winner}</h3><p className="mt-2 text-sm text-zinc-500">{record.votes} votos</p></div>) : <p className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 text-zinc-400">Nenhuma rodada finalizada ainda.</p>}</div></div>}

        <nav className="fixed bottom-4 left-1/2 z-20 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 justify-between rounded-[1.5rem] border border-white/10 bg-black/85 p-2 backdrop-blur-2xl md:hidden">{([['home','Home'],['create','Criar'],['room','Arena'],['history','Hist']] as [Screen,string][]).map(([id,label]) => <button key={id} onClick={() => setScreen(id)} className={`rounded-2xl px-3 py-3 text-[11px] font-black ${screen === id ? 'bg-white text-black' : 'text-zinc-500'}`}>{label}</button>)}</nav>
      </section>
    </main>
  );
}
