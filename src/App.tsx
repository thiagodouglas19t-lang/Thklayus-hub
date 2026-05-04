import { useEffect, useMemo, useState } from "react";
import { useTimer } from "./clash/useTimer";
import { Room, WinnerRecord, Mode, Option } from "./clash/types";

const starterRooms: Room[] = [
  { id: 1, title: "Melhor universo de anime?", category: "Anime", mode: "ranking", finished: false, votedBy: [], options: [{ id: 11, text: "Solo Leveling", votes: 7 }, { id: 12, text: "Tensei Slime", votes: 5 }, { id: 13, text: "Shadow Garden", votes: 9 }] },
  { id: 2, title: "Duelo supremo", category: "Personagens", mode: "battle", finished: false, votedBy: [], options: [{ id: 21, text: "Sung Jin-Woo", votes: 10 }, { id: 22, text: "Rimuru", votes: 8 }] }
];

const botNames = ["Nova", "Kai", "Zero", "Luna", "Rex", "Mika"];

export default function App() {
  const [player, setPlayer] = useState(() => localStorage.getItem("player") || "");
  const [rooms, setRooms] = useState<Room[]>(() => JSON.parse(localStorage.getItem("rooms") || "null") || starterRooms);
  const [history, setHistory] = useState<WinnerRecord[]>(() => JSON.parse(localStorage.getItem("history") || "[]"));
  const [currentRoom, setCurrentRoom] = useState<Room | null>(rooms[0]);
  const [showHistory, setShowHistory] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [liveLog, setLiveLog] = useState<string[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Geral");
  const [newMode, setNewMode] = useState<Mode>("ranking");
  const [newOption, setNewOption] = useState("");
  const [newOptions, setNewOptions] = useState<Option[]>([]);
  const timer = useTimer(30);

  useEffect(() => { localStorage.setItem("rooms", JSON.stringify(rooms)); }, [rooms]);
  useEffect(() => { localStorage.setItem("history", JSON.stringify(history)); }, [history]);
  useEffect(() => { localStorage.setItem("player", player); }, [player]);

  const winner = useMemo(() => currentRoom ? [...currentRoom.options].sort((a, b) => b.votes - a.votes)[0] : null, [currentRoom]);
  const totalVotes = currentRoom?.options.reduce((sum, opt) => sum + opt.votes, 0) || 0;
  const alreadyVoted = currentRoom?.votedBy.includes(player) || false;
  const playerWins = history.filter(item => item.player === player).length;

  useEffect(() => {
    if (!timer.running || !currentRoom || timer.time <= 0) return;
    const id = window.setInterval(() => {
      setCurrentRoom(room => {
        if (!room || room.id !== currentRoom.id) return room;
        const option = room.options[Math.floor(Math.random() * room.options.length)];
        const bot = botNames[Math.floor(Math.random() * botNames.length)];
        setLiveLog(log => [`${bot} votou em ${option.text}`, ...log].slice(0, 6));
        const updated = { ...room, options: room.options.map(opt => opt.id === option.id ? { ...opt, votes: opt.votes + 1 } : opt) };
        setRooms(prev => prev.map(r => r.id === updated.id ? updated : r));
        return updated;
      });
    }, 3500);
    return () => window.clearInterval(id);
  }, [timer.running, timer.time, currentRoom?.id]);

  function addOption() {
    if (!newOption.trim()) return;
    if (newMode === "battle" && newOptions.length >= 2) return;
    setNewOptions(prev => [...prev, { id: Date.now(), text: newOption.trim(), votes: 0 }]);
    setNewOption("");
  }

  function createRoom() {
    if (!newTitle.trim() || newOptions.length < 2) return;
    const room: Room = { id: Date.now(), title: newTitle.trim(), category: newCategory.trim() || "Geral", mode: newMode, finished: false, votedBy: [], options: newOptions };
    setRooms(prev => [room, ...prev]);
    setCurrentRoom(room);
    setNewTitle(""); setNewCategory("Geral"); setNewMode("ranking"); setNewOptions([]); setShowCreate(false); timer.reset(); setLiveLog([]);
  }

  function selectRoom(room: Room) { setCurrentRoom(room); timer.reset(); setShowHistory(false); setShowCreate(false); setLiveLog([]); }

  function vote(optionId: number) {
    if (!currentRoom || timer.time <= 0 || alreadyVoted) return;
    const updated: Room = { ...currentRoom, votedBy: [...currentRoom.votedBy, player], options: currentRoom.options.map(opt => opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt) };
    setCurrentRoom(updated); setRooms(prev => prev.map(r => r.id === updated.id ? updated : r)); setLiveLog(log => [`${player} votou`, ...log].slice(0, 6));
  }

  function resetRound() {
    if (!currentRoom) return;
    const updated: Room = { ...currentRoom, votedBy: [], options: currentRoom.options.map(opt => ({ ...opt, votes: 0 })) };
    setCurrentRoom(updated); setRooms(prev => prev.map(r => r.id === updated.id ? updated : r)); timer.reset(); setLiveLog([]);
  }

  function saveWinner() { if (!currentRoom || !winner) return; setHistory(prev => [{ id: Date.now(), roomTitle: currentRoom.title, winner: winner.text, votes: winner.votes, player }, ...prev]); setShowHistory(true); }

  if (!player) return <main className="grid min-h-screen place-items-center bg-[#050505] px-5 text-white"><section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[0.24em] text-violet-200">ClashRoom</p><h1 className="mt-3 text-4xl font-black tracking-[-0.07em]">Escolha seu nome.</h1><input value={player} onChange={e => setPlayer(e.target.value)} placeholder="Seu nome" className="mt-6 w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none" /></section></main>;

  return <main className="min-h-screen overflow-hidden bg-[#050505] text-white"><div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(168,85,247,.32),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(59,130,246,.18),transparent_30%)]" /><section className="relative mx-auto grid min-h-screen max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[300px_1fr_360px]"><aside className="rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Jogador</p><h2 className="mt-2 text-3xl font-black tracking-[-0.06em]">{player}</h2><div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-black/35 p-4"><p className="text-2xl font-black">{playerWins}</p><p className="text-xs text-zinc-500">wins</p></div><div className="rounded-2xl bg-black/35 p-4"><p className="text-2xl font-black">{rooms.length}</p><p className="text-xs text-zinc-500">salas</p></div></div><button onClick={() => setShowCreate(!showCreate)} className="mt-5 w-full rounded-2xl bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-black">+ Criar sala</button>{showCreate && <div className="mt-4 grid gap-2"><input value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="Título" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none" /><input value={newCategory} onChange={e=>setNewCategory(e.target.value)} placeholder="Categoria" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none" /><div className="grid grid-cols-2 gap-2"><button onClick={()=>{setNewMode('ranking'); setNewOptions([])}} className={`rounded-xl px-3 py-2 text-xs font-black ${newMode === 'ranking' ? 'bg-white text-black' : 'bg-black/40 text-zinc-400'}`}>Ranking</button><button onClick={()=>{setNewMode('battle'); setNewOptions([])}} className={`rounded-xl px-3 py-2 text-xs font-black ${newMode === 'battle' ? 'bg-white text-black' : 'bg-black/40 text-zinc-400'}`}>Duelo</button></div><div className="flex gap-2"><input value={newOption} onChange={e=>setNewOption(e.target.value)} onKeyDown={e=>{if(e.key==='Enter') addOption()}} placeholder="Opção" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none" /><button onClick={addOption} className="rounded-xl bg-white px-3 text-black">+</button></div>{newOptions.map((opt, i)=><p key={opt.id} className="rounded-xl bg-black/35 px-3 py-2 text-xs text-zinc-300">{i+1}. {opt.text}</p>)}<button onClick={createRoom} className="rounded-2xl bg-violet-200 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-black">Salvar sala</button></div>}<p className="mt-6 text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Salas</p><div className="mt-3 grid gap-3">{rooms.map(room => <button key={room.id} onClick={() => selectRoom(room)} className={`rounded-2xl border p-4 text-left transition ${currentRoom?.id === room.id ? 'border-white/40 bg-white/10' : 'border-white/10 bg-black/35 hover:bg-white/10'}`}><p className="font-black">{room.title}</p><p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">{room.category} • {room.mode}</p></button>)}</div></aside><div className="rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[0.24em] text-violet-200">Arena ativa</p><h1 className="mt-3 text-4xl font-black tracking-[-0.07em] md:text-6xl">{currentRoom?.title}</h1><p className="mt-3 text-sm text-zinc-500">{alreadyVoted ? "voto registrado" : "você ainda não votou"}</p>{timer.time === 0 && winner && <div className="mt-6 rounded-[2rem] bg-white p-5 text-black"><p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">Campeão</p><h2 className="mt-2 text-4xl font-black tracking-[-0.06em]">🏆 {winner.text}</h2></div>}<div className={`mt-8 grid gap-4 ${currentRoom?.mode === 'battle' ? 'md:grid-cols-2' : ''}`}>{currentRoom?.options.map(opt => { const percent = totalVotes ? Math.round((opt.votes / totalVotes) * 100) : 0; return <button key={opt.id} onClick={() => vote(opt.id)} className="rounded-[2rem] border border-white/10 bg-black/35 p-5 text-left transition hover:-translate-y-1 hover:bg-white/10 disabled:opacity-50" disabled={alreadyVoted || timer.time <= 0}><div className="flex items-center justify-between gap-4"><p className="text-2xl font-black tracking-[-0.05em]">{opt.text}</p><p className="text-3xl font-black">{opt.votes}</p></div><div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-white" style={{ width: `${percent}%` }} /></div><p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-zinc-500">{percent}% dos votos</p></button>})}</div></div><aside className="rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Painel ao vivo</p><h2 className="mt-3 text-7xl font-black tracking-[-0.09em]">{timer.time}s</h2><p className="mt-2 text-sm text-zinc-400">{timer.running ? "Rodada ativa" : timer.time === 0 ? "Encerrada" : "Pronto"}</p><div className="mt-6 rounded-3xl bg-black/35 p-5"><p className="text-sm text-zinc-500">Líder</p><p className="mt-2 text-3xl font-black tracking-[-0.06em]">{winner?.text}</p><p className="mt-2 text-sm text-zinc-500">{totalVotes} votos</p></div><button onClick={timer.start} className="mt-6 w-full rounded-2xl bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-black">Iniciar bots</button><button onClick={saveWinner} className="mt-3 w-full rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-zinc-300">Salvar campeão</button><button onClick={resetRound} className="mt-3 w-full rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-zinc-300">Nova rodada</button><button onClick={() => setShowHistory(!showHistory)} className="mt-3 w-full rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-zinc-300">Histórico</button><div className="mt-4 rounded-3xl bg-black/35 p-4"><p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Ao vivo</p><div className="mt-3 grid gap-2">{liveLog.length ? liveLog.map((log, i) => <p key={i} className="text-sm text-zinc-300">• {log}</p>) : <p className="text-sm text-zinc-500">Inicie a rodada para ver atividade.</p>}</div></div>{showHistory && <div className="mt-4 grid gap-3">{history.slice(0, 5).map(item => <div key={item.id} className="rounded-2xl bg-black/35 p-4"><p className="text-xs text-zinc-500">{item.roomTitle}</p><p className="font-black">🏆 {item.winner}</p></div>)}</div>}</aside></section></main>;
}
