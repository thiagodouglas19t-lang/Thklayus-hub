import { useEffect, useMemo, useState } from "react";
import { canUseOnlineRooms, createLocalMember, loadOnlineRoom, makeRoomCode, normalizeRoomCode, OnlineRoomState, saveOnlineRoom, subscribeOnlineRoom, updateMyReady, upsertMember } from "../../lib/onlineRoom";

type Props = { playerName: string; avatar: string; onMessage: (message: string) => void; onStart: () => void };

function emptyRoom(code: string, name: string, avatar: string): OnlineRoomState {
  const host = createLocalMember(name, avatar, true);
  return { roomCode: code, members: [host], hostId: host.id, status: "waiting", updatedAt: Date.now() };
}

function connectionLabel(updatedAt?: number) {
  if (!updatedAt) return "offline";
  const age = Date.now() - updatedAt;
  if (age < 4000) return "ao vivo";
  if (age < 15000) return "instável";
  return "offline";
}

export default function OnlineRoomPanel({ playerName, avatar, onMessage, onStart }: Props) {
  const [input, setInput] = useState("");
  const [room, setRoom] = useState<OnlineRoomState | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const ok = canUseOnlineRooms();
  const me = useMemo(() => createLocalMember(playerName, avatar, false), [playerName, avatar]);
  const mine = room?.members.find((member) => member.id === me.id);
  const isHost = room?.hostId === me.id;
  const allReady = Boolean(room && room.members.length >= 2 && room.members.every((member) => member.ready));
  const roomHealth = connectionLabel(room?.updatedAt);

  useEffect(() => {
    if (!room?.roomCode) return;
    return subscribeOnlineRoom(room.roomCode, setRoom);
  }, [room?.roomCode]);

  useEffect(() => {
    if (!room) return;
    const ticker = window.setInterval(async () => {
      const next = upsertMember(room, { ...me, ready: mine?.ready || false, isHost: isHost || false });
      await saveOnlineRoom(next);
    }, 8000);
    return () => window.clearInterval(ticker);
  }, [room?.roomCode, mine?.ready, isHost, me.id]);

  async function createRoom() {
    setBusy(true);
    const code = makeRoomCode();
    const next = emptyRoom(code, playerName, avatar);
    const result = await saveOnlineRoom(next);
    setBusy(false);
    if (!result.ok) return onMessage(result.message);
    setRoom(next); setInput(code); onMessage(`Sala criada: ${code}`);
  }

  async function joinRoom() {
    const code = normalizeRoomCode(input);
    setBusy(true);
    const loaded = await loadOnlineRoom(code);
    if (!loaded.room) { setBusy(false); return onMessage(loaded.message); }
    const next = upsertMember(loaded.room, { ...me, ready: false, isHost: false });
    const result = await saveOnlineRoom(next);
    setBusy(false);
    if (!result.ok) return onMessage(result.message);
    setRoom(next); setInput(code); onMessage(`Entrou na sala ${code}`);
  }

  async function ready() {
    if (!room) return;
    const next = updateMyReady(room, me.id, !mine?.ready);
    setRoom(next);
    const result = await saveOnlineRoom(next);
    if (!result.ok) onMessage(result.message);
  }

  async function copyCode() {
    if (!room) return;
    await navigator.clipboard?.writeText(room.roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1100);
  }

  async function start() {
    if (!room) return;
    if (!isHost) return onMessage("Só o host inicia a sala.");
    if (!allReady) return onMessage("Todos precisam estar prontos.");
    const next = { ...room, status: "starting" as const, updatedAt: Date.now() };
    await saveOnlineRoom(next);
    setRoom(next);
    onMessage("Sala iniciando.");
    setTimeout(onStart, 550);
  }

  return (
    <section className="overflow-hidden rounded-[1.6rem] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(8,17,32,.96),rgba(3,7,18,.96))] p-4 shadow-[0_0_80px_rgba(14,165,233,.12)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div><p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-200">Clash Online</p><strong className="text-2xl">Sala real</strong><p className="mt-1 text-xs text-zinc-400">Crie uma sala, mande o código e jogue com amigos.</p></div>
        <div className="text-right"><span className={`rounded-full px-3 py-1 text-[10px] font-black ${ok ? "bg-emerald-400/15 text-emerald-200" : "bg-red-400/15 text-red-200"}`}>{ok ? "SERVIDOR ON" : "OFF"}</span><p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-zinc-500">{roomHealth}</p></div>
      </div>
      {!ok && <p className="mb-3 rounded-2xl border border-red-300/15 bg-red-500/10 p-3 text-xs text-red-100">Configure Supabase e crie as tabelas game_rooms e game_matches.</p>}

      <div className="grid grid-cols-[1fr_auto] gap-2"><input value={input} onChange={(e) => setInput(e.target.value.toUpperCase())} className="min-w-0 rounded-2xl border border-white/10 bg-black/45 px-4 py-3 text-sm font-black tracking-widest text-white outline-none focus:border-cyan-200" placeholder="THK-0000" /><button disabled={busy || !ok} onClick={joinRoom} className="rounded-2xl bg-white/10 px-4 py-3 text-xs font-black text-white disabled:opacity-40">Entrar</button></div>
      <button disabled={busy || !ok} onClick={createRoom} className="mt-2 w-full rounded-2xl bg-gradient-to-b from-cyan-100 to-cyan-300 px-4 py-3 text-sm font-black text-black shadow-[0_5px_0_#0e7490] disabled:opacity-40 active:translate-y-1 active:shadow-none">Criar sala</button>

      {room && <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between rounded-2xl border border-yellow-300/15 bg-yellow-300/10 p-3"><div><p className="text-[10px] uppercase tracking-[0.22em] text-yellow-200">Código da sala</p><strong className="text-2xl tracking-widest text-yellow-100">{room.roomCode}</strong></div><button onClick={copyCode} className="rounded-xl bg-yellow-300 px-4 py-2 text-xs font-black text-black">{copied ? "Copiado" : "Copiar"}</button></div>
        <div className="grid gap-2">{Array.from({ length: 4 }).map((_, index) => { const member = room.members[index]; const online = member && Date.now() - member.joinedAt < 1000 * 60 * 60; return <div key={index} className={`flex items-center justify-between rounded-2xl border p-3 transition ${member ? "border-white/10 bg-white/[0.055]" : "border-dashed border-white/15 bg-black/25"}`}><div className="flex items-center gap-3"><div className="relative grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-xl">{member?.avatar || "＋"}{member && <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#07111f]" />}</div><div><strong className="block text-sm">{member?.name || "Slot livre"}</strong><p className="text-[11px] text-zinc-500">{member ? member.isHost ? "Host da sala" : "Convidado" : "Convide pelo código"}</p></div></div><span className={`rounded-full px-3 py-1 text-[10px] font-black ${member?.ready ? "bg-emerald-300 text-black" : member ? "bg-yellow-300/15 text-yellow-100" : "bg-white/10 text-white/40"}`}>{member ? member.ready ? "PRONTO" : "AGUARDANDO" : "VAZIO"}</span></div>; })}</div>
        <div className="grid grid-cols-2 gap-2"><button onClick={ready} className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-black text-white">{mine?.ready ? "Cancelar pronto" : "Estou pronto"}</button><button disabled={!isHost || !allReady} onClick={start} className="rounded-2xl bg-yellow-300 px-4 py-3 text-sm font-black text-black disabled:opacity-40">Iniciar</button></div>
        <p className="rounded-2xl bg-black/30 p-3 text-xs text-zinc-400">Dica: a sala inicia com 2 a 4 jogadores. Quem não estiver pronto bloqueia o start.</p>
      </div>}
    </section>
  );
}
