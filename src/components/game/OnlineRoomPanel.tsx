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
  const readyCount = room?.members.filter((member) => member.ready).length || 0;
  const playerCount = room?.members.length || 0;

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
    <section className="overflow-hidden rounded-[1.7rem] border border-white/45 bg-[linear-gradient(180deg,rgba(255,255,255,.42),rgba(125,211,252,.22),rgba(15,23,42,.86))] p-4 text-white shadow-[0_0_80px_rgba(14,165,233,.16)] backdrop-blur-2xl">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div><p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-100">Clash Online</p><strong className="text-2xl">Sala por código</strong><p className="mt-1 text-xs text-white/75">Crie, compartilhe e jogue quando todos estiverem prontos.</p></div>
        <div className="text-right"><span className={`rounded-full px-3 py-1 text-[10px] font-black ${ok ? "bg-emerald-300 text-slate-950" : "bg-red-400 text-white"}`}>{ok ? "SERVIDOR ON" : "OFF"}</span><p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/55">{roomHealth}</p></div>
      </div>
      {!ok && <p className="mb-3 rounded-2xl border border-red-300/30 bg-red-500/20 p-3 text-xs text-red-50">Configure Supabase e crie a tabela game_rooms para ativar salas online.</p>}

      <div className="grid grid-cols-[1fr_auto] gap-2"><input value={input} onChange={(e) => setInput(e.target.value.toUpperCase())} className="min-w-0 rounded-2xl border border-white/30 bg-black/35 px-4 py-3 text-sm font-black tracking-widest text-white outline-none placeholder:text-white/35 focus:border-cyan-200" placeholder="THK-0000" /><button disabled={busy || !ok} onClick={joinRoom} className="rounded-2xl bg-white/20 px-4 py-3 text-xs font-black text-white disabled:opacity-40">Entrar</button></div>
      <button disabled={busy || !ok} onClick={createRoom} className="mt-2 w-full rounded-2xl bg-gradient-to-b from-yellow-100 to-yellow-400 px-4 py-3 text-sm font-black text-black shadow-[0_5px_0_#b45309] disabled:opacity-40 active:translate-y-1 active:shadow-none">Criar nova sala</button>

      {room && <div className="mt-4 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-black/25 p-3 text-center"><p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/55">Jogadores</p><strong className="text-xl">{playerCount}/4</strong></div>
          <div className="rounded-2xl bg-black/25 p-3 text-center"><p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/55">Prontos</p><strong className="text-xl">{readyCount}/{playerCount}</strong></div>
          <div className="rounded-2xl bg-black/25 p-3 text-center"><p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/55">Você</p><strong className="text-xl">{isHost ? "Host" : "Player"}</strong></div>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-yellow-200/50 bg-yellow-200/60 p-3 text-slate-950"><div><p className="text-[10px] font-black uppercase tracking-[0.22em] text-yellow-900">Código da sala</p><strong className="text-2xl tracking-widest">{room.roomCode}</strong></div><button onClick={copyCode} className="rounded-xl bg-slate-950 px-4 py-2 text-xs font-black text-yellow-200">{copied ? "Copiado" : "Copiar"}</button></div>
        <div className="grid gap-2">{Array.from({ length: 4 }).map((_, index) => { const member = room.members[index]; return <div key={index} className={`flex items-center justify-between rounded-2xl border p-3 transition ${member ? "border-white/20 bg-white/14" : "border-dashed border-white/20 bg-black/20"}`}><div className="flex items-center gap-3"><div className="relative grid h-12 w-12 place-items-center rounded-xl bg-white/18 text-2xl shadow-[0_10px_24px_rgba(0,0,0,.18)]">{member?.avatar || "＋"}{member && <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-300 ring-2 ring-slate-900" />}</div><div><strong className="block text-sm">{member?.name || "Slot livre"}</strong><p className="text-[11px] text-white/55">{member ? member.isHost ? "Dono da sala" : "Convidado" : "Aguardando jogador"}</p></div></div><span className={`rounded-full px-3 py-1 text-[10px] font-black ${member?.ready ? "bg-emerald-300 text-black" : member ? "bg-yellow-300/25 text-yellow-50" : "bg-white/10 text-white/45"}`}>{member ? member.ready ? "PRONTO" : "AGUARDANDO" : "VAZIO"}</span></div>; })}</div>
        <div className="grid grid-cols-2 gap-2"><button onClick={ready} className="rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-sm font-black text-white">{mine?.ready ? "Cancelar pronto" : "Estou pronto"}</button><button disabled={!isHost || !allReady} onClick={start} className="rounded-2xl bg-yellow-300 px-4 py-3 text-sm font-black text-black shadow-[0_5px_0_#b45309] disabled:opacity-40 active:translate-y-1 active:shadow-none">Iniciar</button></div>
        <p className="rounded-2xl bg-black/25 p-3 text-xs text-white/65">A sala inicia com pelo menos 2 jogadores. Todos precisam marcar pronto.</p>
      </div>}
    </section>
  );
}
