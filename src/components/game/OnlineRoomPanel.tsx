import { useEffect, useMemo, useRef, useState } from "react";
import { addChatMessage, canUseOnlineRooms, createLocalMember, getInviteCodeFromUrl, isRoomStartLocked, loadOnlineRoom, makeInviteUrl, makeRoomCode, normalizeRoomCode, onlineRoomModeLabel, OnlineMember, OnlineRoomState, saveOnlineRoom, startMatchmaking, startSynchronizedLoading, subscribeOnlineRoom, updateMyReady, upsertMember } from "../../lib/onlineRoom";

type Props = { playerName: string; avatar: string; onMessage: (message: string) => void; onStart: () => void };

function emptyRoom(code: string, name: string, avatar: string): OnlineRoomState {
  const host = createLocalMember(name, avatar, true);
  return { roomCode: code, members: [host], hostId: host.id, status: "waiting", queueType: "casual", chat: [], updatedAt: Date.now() };
}

function connectionLabel(updatedAt?: number) {
  if (!updatedAt) return "offline";
  const age = Date.now() - updatedAt;
  if (age < 4000) return "ao vivo";
  if (age < 15000) return "instável";
  return "offline";
}

function roomInviteText(roomCode: string) {
  const url = makeInviteUrl(roomCode);
  return `Entra na minha sala do Clash Cards: ${roomCode}${url ? `\n${url}` : ""}`;
}

function ProfileMiniCard({ member, onClose }: { member: OnlineMember; onClose: () => void }) {
  return <div className="fixed inset-0 z-[90] grid place-items-center bg-black/60 p-4 backdrop-blur-md" onClick={onClose}><div onClick={(event) => event.stopPropagation()} className="w-full max-w-[320px] rounded-[2rem] border border-white/20 bg-slate-950 p-5 text-white shadow-[0_0_80px_rgba(124,58,237,.35)]"><div className="mx-auto grid h-24 w-24 place-items-center rounded-[1.7rem] bg-white/10 text-6xl">{member.avatar}</div><h3 className="mt-4 text-center text-3xl font-black">{member.name}</h3><p className="mt-1 text-center text-xs uppercase tracking-[.24em] text-violet-200">{member.isHost ? "Host da sala" : "Player online"}</p><div className="mt-5 grid grid-cols-2 gap-2"><div className="rounded-2xl bg-white/10 p-3 text-center"><p className="text-[9px] uppercase tracking-[.18em] text-white/45">Nível</p><strong className="text-2xl">{member.profileLevel}</strong></div><div className="rounded-2xl bg-white/10 p-3 text-center"><p className="text-[9px] uppercase tracking-[.18em] text-white/45">Rank pts</p><strong className="text-2xl">{member.rankPoints}</strong></div></div><button onClick={onClose} className="mt-4 w-full rounded-2xl bg-yellow-300 px-4 py-3 font-black text-black">Fechar</button></div></div>;
}

export default function OnlineRoomPanel({ playerName, avatar, onMessage, onStart }: Props) {
  const [input, setInput] = useState("");
  const [room, setRoom] = useState<OnlineRoomState | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [chatText, setChatText] = useState("");
  const [selectedMember, setSelectedMember] = useState<OnlineMember | null>(null);
  const [visualTick, setVisualTick] = useState(0);
  const startedRef = useRef(false);
  const ok = canUseOnlineRooms();
  const serverLabel = onlineRoomModeLabel();
  const me = useMemo(() => createLocalMember(playerName, avatar, false), [playerName, avatar]);
  const mine = room?.members.find((member) => member.id === me.id);
  const isHost = room?.hostId === me.id;
  const roomLocked = room ? isRoomStartLocked(room) : false;
  const allReady = Boolean(room && room.members.length >= 2 && room.members.every((member) => member.ready));
  const roomHealth = connectionLabel(room?.updatedAt);
  const readyCount = room?.members.filter((member) => member.ready).length || 0;
  const playerCount = room?.members.length || 0;
  const roomFull = playerCount >= 4;
  const searchingSeconds = room?.matchmakingStartedAt ? Math.max(0, Math.floor((Date.now() - room.matchmakingStartedAt) / 1000)) : 0;
  const loadingProgress = room?.loadingStartedAt ? Math.min(100, Math.floor(((Date.now() - room.loadingStartedAt) / 2600) * 100)) : 0;

  useEffect(() => {
    const timer = window.setInterval(() => setVisualTick((tick) => tick + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const inviteCode = getInviteCodeFromUrl();
    if (inviteCode) setInput(inviteCode);
  }, []);

  useEffect(() => {
    if (!room?.roomCode) return;
    return subscribeOnlineRoom(room.roomCode, setRoom);
  }, [room?.roomCode]);

  useEffect(() => {
    if (!room) return;
    const ticker = window.setInterval(async () => {
      if (room.status === "playing") return;
      const next = upsertMember(room, { ...me, ready: mine?.ready || false, isHost: isHost || false });
      await saveOnlineRoom(next);
    }, 3500);
    return () => window.clearInterval(ticker);
  }, [room?.roomCode, room?.status, mine?.ready, isHost, me.id]);

  useEffect(() => {
    if (!room || room.status !== "searching" || !isHost) return;
    if (room.members.length >= 2 && room.matchmakingStartedAt && Date.now() - room.matchmakingStartedAt > 3200) {
      const next = startSynchronizedLoading({ ...room, members: room.members.map((member) => ({ ...member, ready: true })) });
      setRoom(next);
      saveOnlineRoom(next);
    }
  }, [room?.status, room?.members.length, room?.matchmakingStartedAt, isHost, visualTick]);

  useEffect(() => {
    if (!room || room.status !== "starting" || startedRef.current) return;
    if (room.loadingStartedAt && Date.now() - room.loadingStartedAt < 2400) return;
    startedRef.current = true;
    onMessage("Partida sincronizada. Entrando...");
    window.setTimeout(onStart, 350);
  }, [room?.status, room?.updatedAt, visualTick]);

  async function createRoom() {
    startedRef.current = false;
    setBusy(true);
    const code = makeRoomCode();
    const next = emptyRoom(code, playerName, avatar);
    const result = await saveOnlineRoom(next);
    setBusy(false);
    if (!result.ok) return onMessage(result.message);
    setRoom(next); setInput(code); onMessage(`Sala criada: ${code}. Compartilha o código com teu amigo.`);
  }

  async function joinRoom() {
    startedRef.current = false;
    const code = normalizeRoomCode(input);
    if (!code) return onMessage("Digite um código tipo THK-ABCD.");
    setBusy(true);
    const loaded = await loadOnlineRoom(code);
    if (!loaded.room) { setBusy(false); return onMessage(loaded.message); }
    if (isRoomStartLocked(loaded.room)) { setBusy(false); return onMessage("Essa sala já está iniciando. Crie outra ou espere a partida acabar."); }
    const alreadyInside = loaded.room.members.some((member) => member.id === me.id);
    if (!alreadyInside && loaded.room.members.length >= 4) { setBusy(false); return onMessage("Sala cheia. Só cabem 4 jogadores."); }
    const next = upsertMember({ ...loaded.room, status: loaded.room.status === "playing" ? "waiting" : loaded.room.status }, { ...me, ready: false, isHost: false });
    const result = await saveOnlineRoom(next);
    setBusy(false);
    if (!result.ok) return onMessage(result.message);
    setRoom(next); setInput(code); onMessage(`Entrou na sala ${code}. Marca pronto quando estiver preparado.`);
  }

  async function ready() {
    if (!room || room.status !== "waiting") return;
    const next = updateMyReady(room, me.id, !mine?.ready);
    setRoom(next);
    const result = await saveOnlineRoom(next);
    if (!result.ok) onMessage(result.message); else onMessage(!mine?.ready ? "Você está pronto." : "Você saiu do pronto.");
  }

  async function copyCode() {
    if (!room) return;
    await navigator.clipboard?.writeText(room.roomCode);
    setCopied(true);
    onMessage("Código copiado.");
    setTimeout(() => setCopied(false), 1100);
  }

  async function shareRoom() {
    if (!room) return;
    const text = roomInviteText(room.roomCode);
    try {
      if (navigator.share) await navigator.share({ title: "Clash Cards", text, url: makeInviteUrl(room.roomCode) });
      else await navigator.clipboard?.writeText(text);
      onMessage("Convite da sala pronto para enviar.");
    } catch {
      await navigator.clipboard?.writeText(text);
      onMessage("Convite copiado.");
    }
  }

  async function sendChat() {
    if (!room || !mine) return;
    const next = addChatMessage(room, mine, chatText);
    setChatText("");
    setRoom(next);
    await saveOnlineRoom(next);
  }

  async function queue(ranked = false) {
    if (!room || !isHost) return onMessage("Só o host inicia a fila.");
    const next = startMatchmaking(room, ranked);
    setRoom(next);
    await saveOnlineRoom(next);
    onMessage(ranked ? "Fila ranqueada iniciada." : "Procurando partida casual...");
  }

  async function start() {
    if (!room) return;
    if (!isHost) return onMessage("Só o host inicia a sala.");
    if (roomLocked) return onMessage("A sala já está iniciando.");
    if (!allReady) return onMessage("Todos precisam estar prontos.");
    const next = startSynchronizedLoading(room);
    startedRef.current = false;
    setRoom(next);
    await saveOnlineRoom(next);
    onMessage("Loading sincronizado para todos...");
  }

  return (
    <section className="overflow-hidden rounded-[1.7rem] border border-white/45 bg-[linear-gradient(180deg,rgba(255,255,255,.42),rgba(125,211,252,.22),rgba(15,23,42,.86))] p-4 text-white shadow-[0_0_80px_rgba(14,165,233,.16)] backdrop-blur-2xl">
      {selectedMember && <ProfileMiniCard member={selectedMember} onClose={() => setSelectedMember(null)} />}
      <div className="mb-4 flex items-center justify-between gap-2"><div><p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-100">Clash Online</p><strong className="text-2xl">Sala por código</strong><p className="mt-1 text-xs text-white/75">Chat, convite, ranked e loading sincronizado.</p></div><div className="text-right"><span className={`rounded-full px-3 py-1 text-[10px] font-black ${serverLabel === "SERVIDOR ON" ? "bg-emerald-300 text-slate-950" : "bg-yellow-300 text-slate-950"}`}>{serverLabel}</span><p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/55">{room?.status === "searching" ? `procurando ${searchingSeconds}s` : roomHealth}</p></div></div>
      <div className="grid grid-cols-[1fr_auto] gap-2"><input value={input} onChange={(e) => setInput(e.target.value.toUpperCase())} className="min-w-0 rounded-2xl border border-white/30 bg-black/35 px-4 py-3 text-sm font-black tracking-widest text-white outline-none placeholder:text-white/35 focus:border-cyan-200" placeholder="THK-0000" /><button disabled={busy || !ok} onClick={joinRoom} className="rounded-2xl bg-white/20 px-4 py-3 text-xs font-black text-white disabled:opacity-40">Entrar</button></div>
      <button disabled={busy || !ok} onClick={createRoom} className="mt-2 w-full rounded-2xl bg-gradient-to-b from-yellow-100 to-yellow-400 px-4 py-3 text-sm font-black text-black shadow-[0_5px_0_#b45309] disabled:opacity-40 active:translate-y-1 active:shadow-none">Criar nova sala</button>
      {room && <div className="mt-4 space-y-3">
        {(room.status === "searching" || room.status === "starting") && <div className="rounded-2xl border border-cyan-200/40 bg-cyan-300/15 p-3"><div className="flex items-center justify-between"><strong>{room.status === "searching" ? `Procurando partida ${room.queueType === "ranked" ? "ranqueada" : "casual"}` : "Loading sincronizado"}</strong><span className="text-xs font-black">{room.status === "starting" ? `${loadingProgress}%` : `${searchingSeconds}s`}</span></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-black/30"><div className="h-full rounded-full bg-gradient-to-r from-cyan-200 via-violet-300 to-yellow-300 transition-all" style={{ width: `${room.status === "starting" ? loadingProgress : Math.min(95, 18 + searchingSeconds * 12)}%` }} /></div></div>}
        <div className="grid grid-cols-4 gap-2"><div className="rounded-2xl bg-black/25 p-3 text-center"><p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/55">Jogadores</p><strong className="text-xl">{playerCount}/4</strong></div><div className="rounded-2xl bg-black/25 p-3 text-center"><p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/55">Prontos</p><strong className="text-xl">{readyCount}/{playerCount}</strong></div><div className="rounded-2xl bg-black/25 p-3 text-center"><p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/55">Fila</p><strong className="text-xl">{room.queueType === "ranked" ? "Rank" : "Casual"}</strong></div><div className="rounded-2xl bg-black/25 p-3 text-center"><p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/55">Você</p><strong className="text-xl">{isHost ? "Host" : "Player"}</strong></div></div>
        <div className="flex items-center justify-between rounded-2xl border border-yellow-200/50 bg-yellow-200/60 p-3 text-slate-950"><div><p className="text-[10px] font-black uppercase tracking-[0.22em] text-yellow-900">Código da sala</p><strong className="text-2xl tracking-widest">{room.roomCode}</strong></div><div className="grid gap-2"><button onClick={copyCode} className="rounded-xl bg-slate-950 px-4 py-2 text-xs font-black text-yellow-200">{copied ? "Copiado" : "Copiar"}</button><button onClick={shareRoom} className="rounded-xl bg-violet-700 px-4 py-2 text-xs font-black text-white">Enviar</button></div></div>
        <div className="grid gap-2">{Array.from({ length: 4 }).map((_, index) => { const member = room.members[index]; const seenAge = member ? Date.now() - (member.lastSeenAt || member.joinedAt) : 0; const live = member && seenAge < 7000; return <button key={index} onClick={() => member && setSelectedMember(member)} className={`flex items-center justify-between rounded-2xl border p-3 text-left transition ${member ? "animate-[pulse_.35s_ease-out_1] border-white/20 bg-white/14" : "border-dashed border-white/20 bg-black/20"}`}><div className="flex items-center gap-3"><div className="relative grid h-12 w-12 place-items-center rounded-xl bg-white/18 text-2xl shadow-[0_10px_24px_rgba(0,0,0,.18)]">{member?.avatar || "＋"}{member && <span className={`absolute -right-1 -top-1 h-3 w-3 rounded-full ring-2 ring-slate-900 ${live ? "bg-emerald-300" : "bg-yellow-300"}`} />}</div><div><strong className="block text-sm">{member?.name || "Slot livre"}</strong><p className="text-[11px] text-white/55">{member ? `${member.isHost ? "Host" : live ? "Online" : "Instável"} · Nv ${member.profileLevel} · ${member.rankPoints} pts` : roomFull ? "Sala cheia" : "Aguardando jogador"}</p></div></div><span className={`rounded-full px-3 py-1 text-[10px] font-black ${member?.ready ? "bg-emerald-300 text-black" : member ? "bg-yellow-300/25 text-yellow-50" : "bg-white/10 text-white/45"}`}>{member ? member.ready ? "PRONTO" : "AGUARDANDO" : "VAZIO"}</span></button>; })}</div>
        <div className="grid grid-cols-2 gap-2"><button disabled={room.status !== "waiting"} onClick={ready} className="rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-sm font-black text-white disabled:opacity-40">{mine?.ready ? "Cancelar pronto" : "Estou pronto"}</button><button disabled={!isHost || !allReady || room.status !== "waiting" || roomLocked} onClick={start} className="rounded-2xl bg-yellow-300 px-4 py-3 text-sm font-black text-black shadow-[0_5px_0_#b45309] disabled:opacity-40 active:translate-y-1 active:shadow-none">Iniciar todos</button><button disabled={!isHost || room.status !== "waiting"} onClick={() => queue(false)} className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-black text-black disabled:opacity-40">Fila casual</button><button disabled={!isHost || room.status !== "waiting"} onClick={() => queue(true)} className="rounded-2xl bg-violet-400 px-4 py-3 text-sm font-black text-white disabled:opacity-40">Ranked</button></div>
        <div className="rounded-2xl border border-white/10 bg-black/25 p-3"><div className="mb-2 flex items-center justify-between"><strong className="text-sm">Chat da sala</strong><span className="text-[10px] uppercase tracking-[.2em] text-white/40">tempo real</span></div><div className="max-h-36 space-y-2 overflow-y-auto pr-1">{(room.chat || []).slice(-8).map((msg) => <div key={msg.id} className={`rounded-xl px-3 py-2 text-xs ${msg.system ? "bg-yellow-300/15 text-yellow-100" : "bg-white/10 text-white"}`}><strong>{msg.system ? "Sistema" : `${msg.avatar} ${msg.playerName}`}: </strong>{msg.text}</div>)}{(!room.chat || room.chat.length === 0) && <p className="text-xs text-white/45">Nenhuma mensagem ainda.</p>}</div><div className="mt-2 grid grid-cols-[1fr_auto] gap-2"><input value={chatText} onChange={(event) => setChatText(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") sendChat(); }} className="min-w-0 rounded-xl border border-white/15 bg-black/35 px-3 py-2 text-sm outline-none" placeholder="Mensagem rápida..." /><button onClick={sendChat} className="rounded-xl bg-white/15 px-4 py-2 text-xs font-black">Enviar</button></div></div>
        <p className="rounded-2xl bg-black/25 p-3 text-xs text-white/65">{serverLabel === "LOCAL" ? "Modo local serve para teste neste aparelho; para jogar com amigo real, configure o Supabase." : "Servidor online ativo para sincronizar jogadores."}</p>
      </div>}
    </section>
  );
}
