import { useEffect, useMemo, useState } from "react";
import { canUseOnlineRooms, createLocalMember, loadOnlineRoom, makeRoomCode, normalizeRoomCode, OnlineRoomState, saveOnlineRoom, subscribeOnlineRoom, updateMyReady, upsertMember } from "../../lib/onlineRoom";

type Props = {
  playerName: string;
  avatar: string;
  onMessage: (message: string) => void;
  onStart: () => void;
};

function emptyRoom(code: string, name: string, avatar: string): OnlineRoomState {
  const host = createLocalMember(name, avatar, true);
  return { roomCode: code, members: [host], hostId: host.id, status: "waiting", updatedAt: Date.now() };
}

export default function OnlineRoomPanel({ playerName, avatar, onMessage, onStart }: Props) {
  const [input, setInput] = useState("");
  const [room, setRoom] = useState<OnlineRoomState | null>(null);
  const [busy, setBusy] = useState(false);
  const ok = canUseOnlineRooms();
  const me = useMemo(() => createLocalMember(playerName, avatar, false), [playerName, avatar]);
  const mine = room?.members.find((member) => member.id === me.id);
  const isHost = room?.hostId === me.id;
  const allReady = Boolean(room && room.members.length >= 2 && room.members.every((member) => member.ready));

  useEffect(() => {
    if (!room?.roomCode) return;
    return subscribeOnlineRoom(room.roomCode, setRoom);
  }, [room?.roomCode]);

  async function createRoom() {
    setBusy(true);
    const code = makeRoomCode();
    const next = emptyRoom(code, playerName, avatar);
    const result = await saveOnlineRoom(next);
    setBusy(false);
    if (!result.ok) return onMessage(result.message);
    setRoom(next);
    setInput(code);
    onMessage(`Sala criada: ${code}`);
  }

  async function joinRoom() {
    const code = normalizeRoomCode(input);
    setBusy(true);
    const loaded = await loadOnlineRoom(code);
    if (!loaded.room) {
      setBusy(false);
      return onMessage(loaded.message);
    }
    const next = upsertMember(loaded.room, { ...me, ready: false, isHost: false });
    const result = await saveOnlineRoom(next);
    setBusy(false);
    if (!result.ok) return onMessage(result.message);
    setRoom(next);
    setInput(code);
    onMessage(`Entrou na sala ${code}`);
  }

  async function ready() {
    if (!room) return;
    const next = updateMyReady(room, me.id, !mine?.ready);
    const result = await saveOnlineRoom(next);
    if (!result.ok) onMessage(result.message);
  }

  async function start() {
    if (!room) return;
    const next = { ...room, status: "starting" as const, updatedAt: Date.now() };
    await saveOnlineRoom(next);
    setRoom(next);
    onMessage("Sala iniciando.");
    setTimeout(onStart, 700);
  }

  return (
    <section className="rounded-[1.45rem] border border-cyan-300/15 bg-cyan-400/[0.055] p-4 backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div><p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-200">Online</p><strong className="text-xl">Sala real</strong></div>
        <span className={`rounded-full px-3 py-1 text-[10px] font-black ${ok ? "bg-emerald-400/15 text-emerald-200" : "bg-red-400/15 text-red-200"}`}>{ok ? "ON" : "OFF"}</span>
      </div>
      {!ok && <p className="mb-3 rounded-2xl border border-red-300/15 bg-red-500/10 p-3 text-xs text-red-100">Configure Supabase e crie a tabela game_rooms.</p>}
      <div className="flex gap-2"><input value={input} onChange={(e) => setInput(e.target.value.toUpperCase())} className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-black/45 px-4 py-3 text-sm font-black tracking-widest text-white outline-none focus:border-cyan-200" placeholder="THK-0000" /><button disabled={busy || !ok} onClick={joinRoom} className="rounded-2xl bg-white/10 px-4 py-3 text-xs font-black text-white disabled:opacity-40">Entrar</button></div>
      <button disabled={busy || !ok} onClick={createRoom} className="mt-2 w-full rounded-2xl bg-cyan-200 px-4 py-3 text-sm font-black text-black disabled:opacity-40">Criar sala</button>
      {room && <div className="mt-4 space-y-3"><div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 p-3"><div><p className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">Código</p><strong className="text-lg tracking-widest text-yellow-100">{room.roomCode}</strong></div><button onClick={() => navigator.clipboard?.writeText(room.roomCode)} className="rounded-xl bg-yellow-300 px-3 py-2 text-xs font-black text-black">Copiar</button></div><div className="grid gap-2">{Array.from({ length: 4 }).map((_, index) => { const member = room.members[index]; return <div key={index} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 p-3"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-xl">{member?.avatar || "＋"}</div><div><strong className="block text-sm">{member?.name || "Slot livre"}</strong><p className="text-[11px] text-zinc-500">{member ? member.isHost ? "Host" : "Convidado" : "Convide pelo código"}</p></div></div><span className={`rounded-full px-3 py-1 text-[10px] font-black ${member?.ready ? "bg-emerald-300 text-black" : "bg-white/10 text-white/50"}`}>{member ? member.ready ? "PRONTO" : "AGUARDANDO" : "VAZIO"}</span></div>; })}</div><div className="grid grid-cols-2 gap-2"><button onClick={ready} className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-black text-white">{mine?.ready ? "Cancelar" : "Pronto"}</button><button disabled={!isHost || !allReady} onClick={start} className="rounded-2xl bg-yellow-300 px-4 py-3 text-sm font-black text-black disabled:opacity-40">Iniciar</button></div></div>}
    </section>
  );
}
