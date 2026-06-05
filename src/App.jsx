import { useEffect, useRef, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const APP_NAME = 'WalkTok'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const hasSupabase = Boolean(supabaseUrl && supabaseAnonKey)
const supabase = hasSupabase ? createClient(supabaseUrl, supabaseAnonKey) : null
const PROFILE_KEY = 'walktok-profile-id'
const NAME_KEY = 'walktok-name'
const ROOM_KEY = 'walktok-private-room'
const RTC_CONFIG = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }

function getProfileId() {
  let id = localStorage.getItem(PROFILE_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(PROFILE_KEY, id)
  }
  return id
}

function roomTopic(code) {
  return `walktok-private-${String(code || '00001').replace(/\D/g, '').slice(0, 20) || '00001'}`
}

export default function App() {
  const [joined, setJoined] = useState(() => localStorage.getItem('walktok-joined') !== 'false')
  const [muted, setMuted] = useState(() => localStorage.getItem('walktok-muted') === 'true')
  const [tx, setTx] = useState(false)
  const [micStatus, setMicStatus] = useState('entre na sala privada e segure PTT')
  const [roomCode, setRoomCode] = useState(() => localStorage.getItem(ROOM_KEY) || '00001')
  const [name, setName] = useState(() => localStorage.getItem(NAME_KEY) || `Tok ${Math.floor(100 + Math.random() * 900)}`)
  const [peopleOnline, setPeopleOnline] = useState(1)
  const [participants, setParticipants] = useState([])
  const [speaker, setSpeaker] = useState('ninguém falando')
  const streamRef = useRef(null)
  const realtimeRef = useRef(null)
  const peersRef = useRef(new Map())
  const politeRef = useRef(new Map())
  const audiosRef = useRef(new Map())
  const profileIdRef = useRef(getProfileId())
  const makingOfferRef = useRef(false)

  useEffect(() => { if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {}) }, [])
  useEffect(() => localStorage.setItem('walktok-joined', String(joined)), [joined])
  useEffect(() => localStorage.setItem('walktok-muted', String(muted)), [muted])
  useEffect(() => localStorage.setItem(ROOM_KEY, roomCode), [roomCode])
  useEffect(() => localStorage.setItem(NAME_KEY, name), [name])

  useEffect(() => {
    let lock
    async function keepAwake() {
      try { if (joined && 'wakeLock' in navigator) lock = await navigator.wakeLock.request('screen') } catch {}
    }
    keepAwake()
    return () => lock?.release?.()
  }, [joined])

  useEffect(() => {
    if (!joined || !supabase) {
      setPeopleOnline(joined ? 1 : 0)
      setParticipants(joined ? [{ id: profileIdRef.current, name, self: true }] : [])
      return
    }

    closeAllPeers()
    const channel = supabase.channel(roomTopic(roomCode), { config: { presence: { key: profileIdRef.current } } })
    realtimeRef.current = channel

    channel.on('presence', { event: 'sync' }, async () => {
      const state = channel.presenceState()
      const ids = Object.keys(state)
      const list = ids.map((id) => ({ id, name: state[id]?.[0]?.name || 'Tok', self: id === profileIdRef.current }))
      setParticipants(list)
      setPeopleOnline(ids.length || 1)
      for (const id of ids) {
        if (id !== profileIdRef.current) {
          politeRef.current.set(id, profileIdRef.current > id)
          await ensurePeer(id)
        }
      }
    })

    channel.on('broadcast', { event: 'ptt' }, ({ payload }) => {
      if (!payload || payload.from === profileIdRef.current) return
      setSpeaker(payload.live ? payload.name || 'alguém' : 'ninguém falando')
      setMicStatus(payload.live ? `${payload.name || 'alguém'} está falando` : 'ouvindo sala privada')
    })

    channel.on('broadcast', { event: 'rtc' }, async ({ payload }) => {
      if (!payload || payload.to !== profileIdRef.current || payload.from === profileIdRef.current) return
      await handleSignal(payload)
    })

    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({ id: profileIdRef.current, name, roomCode, onlineAt: Date.now() })
        setMicStatus('sala privada conectada')
      }
    })

    return () => {
      channel.untrack()
      supabase.removeChannel(channel)
      realtimeRef.current = null
      closeAllPeers()
    }
  }, [joined, roomCode, name])

  const peopleInChannel = hasSupabase ? peopleOnline : joined ? 1 : 0
  const status = !joined ? 'FORA' : muted ? 'MUDO' : tx ? 'AO VIVO' : 'OUVINDO'
  const initials = name.trim().slice(0, 2).toUpperCase() || 'TK'

  function closeAllPeers() {
    peersRef.current.forEach((peer) => peer.close())
    peersRef.current.clear()
    politeRef.current.clear()
    audiosRef.current.forEach((audio) => audio.remove())
    audiosRef.current.clear()
  }

  async function ensureMic() {
    if (streamRef.current) return streamRef.current
    setMicStatus('liberando microfone...')
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } })
    stream.getAudioTracks().forEach((track) => { track.enabled = false })
    streamRef.current = stream
    peersRef.current.forEach((peer) => addLocalTracks(peer, stream))
    setMicStatus('microfone pronto')
    return stream
  }

  function addLocalTracks(peer, stream) {
    const senders = peer.getSenders()
    stream.getTracks().forEach((track) => {
      if (!senders.some((sender) => sender.track?.id === track.id)) peer.addTrack(track, stream)
    })
  }

  async function sendSignal(to, payload) {
    if (!realtimeRef.current) return
    await realtimeRef.current.send({ type: 'broadcast', event: 'rtc', payload: { from: profileIdRef.current, to, ...payload } })
  }

  async function ensurePeer(peerId) {
    if (peersRef.current.has(peerId)) return peersRef.current.get(peerId)
    const peer = new RTCPeerConnection(RTC_CONFIG)
    peersRef.current.set(peerId, peer)

    peer.onicecandidate = (event) => { if (event.candidate) sendSignal(peerId, { type: 'ice', candidate: event.candidate }) }
    peer.onconnectionstatechange = () => {
      if (['failed', 'disconnected', 'closed'].includes(peer.connectionState)) setMicStatus('reconectando áudio...')
      if (peer.connectionState === 'connected') setMicStatus('áudio ao vivo conectado')
    }
    peer.ontrack = (event) => {
      let audio = audiosRef.current.get(peerId)
      if (!audio) {
        audio = new Audio()
        audio.autoplay = true
        audio.playsInline = true
        audio.controls = false
        audio.style.display = 'none'
        document.body.appendChild(audio)
        audiosRef.current.set(peerId, audio)
      }
      audio.muted = muted
      audio.srcObject = event.streams[0]
      audio.play().catch(() => setMicStatus('toque no PTT uma vez para liberar áudio'))
    }
    if (streamRef.current) addLocalTracks(peer, streamRef.current)

    peer.onnegotiationneeded = async () => {
      try {
        makingOfferRef.current = true
        await peer.setLocalDescription(await peer.createOffer())
        await sendSignal(peerId, { type: 'description', description: peer.localDescription })
      } finally {
        makingOfferRef.current = false
      }
    }
    return peer
  }

  async function handleSignal(payload) {
    const peer = await ensurePeer(payload.from)
    const polite = politeRef.current.get(payload.from) ?? true
    if (payload.type === 'description') {
      const description = payload.description
      const offerCollision = description.type === 'offer' && (makingOfferRef.current || peer.signalingState !== 'stable')
      if (offerCollision && !polite) return
      if (streamRef.current) addLocalTracks(peer, streamRef.current)
      await peer.setRemoteDescription(description)
      if (description.type === 'offer') {
        await peer.setLocalDescription(await peer.createAnswer())
        await sendSignal(payload.from, { type: 'description', description: peer.localDescription })
      }
    }
    if (payload.type === 'ice') {
      try { await peer.addIceCandidate(payload.candidate) } catch {}
    }
  }

  function setMicLive(value) {
    if (!streamRef.current) return
    streamRef.current.getAudioTracks().forEach((track) => { track.enabled = value })
  }

  function joinRoom() {
    setJoined(true)
    setMuted(false)
    setMicStatus('entrando na sala privada')
  }

  function leaveRoom() {
    setMicLive(false)
    setTx(false)
    setJoined(false)
    setSpeaker('ninguém falando')
    setMicStatus('fora da sala')
    closeAllPeers()
  }

  async function startTalk() {
    if (!joined) return joinRoom()
    if (muted) return
    try {
      const stream = await ensureMic()
      for (const peer of peersRef.current.values()) addLocalTracks(peer, stream)
      setMicLive(true)
      setTx(true)
      setSpeaker('você')
      setMicStatus('você está falando')
      if (realtimeRef.current) await realtimeRef.current.send({ type: 'broadcast', event: 'ptt', payload: { from: profileIdRef.current, name, live: true, roomCode, at: Date.now() } })
      if ('vibrate' in navigator) navigator.vibrate(25)
    } catch {
      setMicStatus('microfone bloqueado')
      setTx(false)
    }
  }

  async function stopTalk() {
    setMicLive(false)
    setTx(false)
    setSpeaker('ninguém falando')
    if (realtimeRef.current) await realtimeRef.current.send({ type: 'broadcast', event: 'ptt', payload: { from: profileIdRef.current, name, live: false, roomCode, at: Date.now() } })
    if (joined) setMicStatus('ouvindo sala privada')
  }

  function toggleMute() {
    const next = !muted
    setMuted(next)
    audiosRef.current.forEach((audio) => { audio.muted = next })
  }

  return (
    <main className="app voice-app">
      <section className={`phone-radio ${tx ? 'talking' : ''} ${muted ? 'muted' : ''} ${!joined ? 'left' : ''}`}>
        <header className="top-panel">
          <div>
            <span className="eyebrow">{APP_NAME}</span>
            <h1>Privada</h1>
          </div>
          <button className="mini-button" onClick={joined ? leaveRoom : joinRoom}>{joined ? 'Sair' : 'Entrar'}</button>
        </header>

        <div className="profile-card">
          <div className="avatar">{initials}</div>
          <input value={name} onChange={(event) => setName(event.target.value.slice(0, 18))} />
        </div>

        <div className="display-card">
          <div className="status-dot" />
          <p>{status}</p>
          <strong>{peopleInChannel} {peopleInChannel === 1 ? 'pessoa' : 'pessoas'} na sala</strong>
          <small>{joined ? micStatus : 'entre para escutar'}</small>
        </div>

        <label className="channel-box">
          <span>Código da sala privada</span>
          <input value={roomCode} onChange={(event) => setRoomCode(event.target.value.replace(/\D/g, '').slice(0, 20))} />
        </label>

        <div className="speaker-now">Falando agora: <strong>{speaker}</strong></div>

        <div className="meter">
          {Array.from({ length: 18 }).map((_, index) => <span key={index} className={tx && index < 15 ? 'active' : ''} />)}
        </div>

        <button className="ptt-voice" onPointerDown={startTalk} onPointerUp={stopTalk} onPointerLeave={stopTalk}>
          <span>{!joined ? 'ENTRAR' : muted ? 'MUDO' : tx ? 'FALANDO...' : 'SEGURE PARA FALAR'}</span>
        </button>

        <div className="people-row">
          {(participants.length ? participants : [{ id: 'self', name, self: true }]).slice(0, 5).map((person) => (
            <span key={person.id} title={person.name}>{person.self ? 'Você' : person.name}</span>
          ))}
        </div>

        <div className="action-row">
          <button onClick={toggleMute} disabled={!joined}>{muted ? 'Ouvir' : 'Mute'}</button>
          <button onClick={joined ? leaveRoom : joinRoom}>{joined ? 'Sair da sala' : 'Entrar na sala'}</button>
        </div>

        <footer className="radio-footer">
          <span>{hasSupabase ? 'sala privada' : 'configure Supabase'}</span>
          <span>código {roomCode || '00001'}</span>
        </footer>
      </section>
    </main>
  )
}
