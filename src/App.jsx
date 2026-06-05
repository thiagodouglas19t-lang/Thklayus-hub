import { useEffect, useRef, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const APP_NAME = 'WalkTok'
const CHANNEL_NAME = 'GLOBAL'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const hasSupabase = Boolean(supabaseUrl && supabaseAnonKey)
const supabase = hasSupabase ? createClient(supabaseUrl, supabaseAnonKey) : null
const PROFILE_KEY = 'walktok-profile-id'
const RTC_CONFIG = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }

function getProfileId() {
  let id = localStorage.getItem(PROFILE_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(PROFILE_KEY, id)
  }
  return id
}

export default function App() {
  const [joined, setJoined] = useState(() => localStorage.getItem('walktok-joined') !== 'false')
  const [muted, setMuted] = useState(() => localStorage.getItem('walktok-muted') === 'true')
  const [tx, setTx] = useState(false)
  const [micStatus, setMicStatus] = useState('toque no PTT para abrir o microfone ao vivo')
  const [channelCode, setChannelCode] = useState(() => localStorage.getItem('walktok-channel') || '00001')
  const [peopleOnline, setPeopleOnline] = useState(1)
  const streamRef = useRef(null)
  const realtimeRef = useRef(null)
  const peersRef = useRef(new Map())
  const profileIdRef = useRef(getProfileId())

  useEffect(() => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {})
  }, [])

  useEffect(() => localStorage.setItem('walktok-joined', String(joined)), [joined])
  useEffect(() => localStorage.setItem('walktok-muted', String(muted)), [muted])
  useEffect(() => localStorage.setItem('walktok-channel', channelCode), [channelCode])

  useEffect(() => {
    let lock
    async function keepAwake() {
      try {
        if (joined && 'wakeLock' in navigator) lock = await navigator.wakeLock.request('screen')
      } catch {}
    }
    keepAwake()
    return () => lock?.release?.()
  }, [joined])

  useEffect(() => {
    if (!joined || !supabase) {
      setPeopleOnline(joined ? 1 : 0)
      return
    }

    const room = `walktok-${channelCode || '00001'}`
    const channel = supabase.channel(room, { config: { presence: { key: profileIdRef.current } } })
    realtimeRef.current = channel

    channel.on('presence', { event: 'sync' }, async () => {
      const state = channel.presenceState()
      const ids = Object.keys(state)
      setPeopleOnline(ids.length || 1)
      for (const id of ids) {
        if (id !== profileIdRef.current && profileIdRef.current > id) await makeOffer(id)
      }
    })

    channel.on('broadcast', { event: 'ptt' }, ({ payload }) => {
      if (!payload || payload.from === profileIdRef.current) return
      setMicStatus(payload.live ? 'alguém está falando no WalkTok' : 'escutando no WalkTok')
    })

    channel.on('broadcast', { event: 'rtc' }, async ({ payload }) => {
      if (!payload || payload.to !== profileIdRef.current || payload.from === profileIdRef.current) return
      await handleSignal(payload)
    })

    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({ id: profileIdRef.current, channel: channelCode, onlineAt: Date.now() })
        setMicStatus('WalkTok conectado ao canal')
      }
    })

    return () => {
      channel.untrack()
      supabase.removeChannel(channel)
      realtimeRef.current = null
      peersRef.current.forEach((peer) => peer.close())
      peersRef.current.clear()
    }
  }, [joined, channelCode])

  const peopleInChannel = hasSupabase ? peopleOnline : joined ? 1 : 0
  const status = !joined ? 'FORA' : muted ? 'MUDO' : tx ? 'AO VIVO' : 'OUVINDO'

  async function ensureMic() {
    if (streamRef.current) return streamRef.current
    try {
      setMicStatus('liberando microfone...')
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } })
      stream.getAudioTracks().forEach((track) => { track.enabled = false })
      streamRef.current = stream
      peersRef.current.forEach((peer) => stream.getTracks().forEach((track) => peer.addTrack(track, stream)))
      setMicStatus('microfone pronto')
      return stream
    } catch {
      setMicStatus('microfone bloqueado')
      throw new Error('microfone bloqueado')
    }
  }

  function getPeer(peerId) {
    if (peersRef.current.has(peerId)) return peersRef.current.get(peerId)
    const peer = new RTCPeerConnection(RTC_CONFIG)
    peer.onicecandidate = (event) => {
      if (event.candidate && realtimeRef.current) realtimeRef.current.send({ type: 'broadcast', event: 'rtc', payload: { from: profileIdRef.current, to: peerId, type: 'ice', candidate: event.candidate } })
    }
    peer.ontrack = (event) => {
      if (muted) return
      const audio = new Audio()
      audio.srcObject = event.streams[0]
      audio.play().catch(() => setMicStatus('toque na tela para liberar áudio'))
    }
    if (streamRef.current) streamRef.current.getTracks().forEach((track) => peer.addTrack(track, streamRef.current))
    peersRef.current.set(peerId, peer)
    return peer
  }

  async function makeOffer(peerId) {
    if (!realtimeRef.current) return
    const peer = getPeer(peerId)
    const offer = await peer.createOffer()
    await peer.setLocalDescription(offer)
    await realtimeRef.current.send({ type: 'broadcast', event: 'rtc', payload: { from: profileIdRef.current, to: peerId, type: 'offer', description: offer } })
  }

  async function handleSignal(payload) {
    const peer = getPeer(payload.from)
    if (payload.type === 'offer') {
      await peer.setRemoteDescription(payload.description)
      const answer = await peer.createAnswer()
      await peer.setLocalDescription(answer)
      await realtimeRef.current.send({ type: 'broadcast', event: 'rtc', payload: { from: profileIdRef.current, to: payload.from, type: 'answer', description: answer } })
    }
    if (payload.type === 'answer') await peer.setRemoteDescription(payload.description)
    if (payload.type === 'ice') await peer.addIceCandidate(payload.candidate)
  }

  function setMicLive(value) {
    if (!streamRef.current) return
    streamRef.current.getAudioTracks().forEach((track) => { track.enabled = value })
  }

  function joinChannel() {
    setJoined(true)
    setMuted(false)
    setMicStatus('entrando no WalkTok')
  }

  function leaveChannel() {
    setMicLive(false)
    setTx(false)
    setJoined(false)
    setMicStatus('fora do canal')
  }

  async function startTalk() {
    if (!joined) return joinChannel()
    if (muted) return
    try {
      await ensureMic()
      setMicLive(true)
      setTx(true)
      setMicStatus('você está falando')
      if (realtimeRef.current) await realtimeRef.current.send({ type: 'broadcast', event: 'ptt', payload: { from: profileIdRef.current, live: true, channel: channelCode, at: Date.now() } })
      if ('vibrate' in navigator) navigator.vibrate(25)
    } catch {
      setTx(false)
    }
  }

  async function stopTalk() {
    setMicLive(false)
    setTx(false)
    if (realtimeRef.current) await realtimeRef.current.send({ type: 'broadcast', event: 'ptt', payload: { from: profileIdRef.current, live: false, channel: channelCode, at: Date.now() } })
    if (joined) setMicStatus('ouvindo canal')
  }

  return (
    <main className="app voice-app">
      <section className={`phone-radio ${tx ? 'talking' : ''} ${muted ? 'muted' : ''} ${!joined ? 'left' : ''}`}>
        <header className="top-panel">
          <div>
            <span className="eyebrow">{APP_NAME}</span>
            <h1>{CHANNEL_NAME}</h1>
          </div>
          <button className="mini-button" onClick={joined ? leaveChannel : joinChannel}>{joined ? 'Sair' : 'Entrar'}</button>
        </header>

        <div className="display-card">
          <div className="status-dot" />
          <p>{status}</p>
          <strong>{peopleInChannel} {peopleInChannel === 1 ? 'pessoa' : 'pessoas'} no canal</strong>
          <small>{joined ? micStatus : 'entre para escutar'}</small>
        </div>

        <label className="channel-box">
          <span>Código do canal</span>
          <input value={channelCode} onChange={(event) => setChannelCode(event.target.value.replace(/\D/g, '').slice(0, 20))} />
        </label>

        <div className="meter">
          {Array.from({ length: 18 }).map((_, index) => <span key={index} className={tx && index < 15 ? 'active' : ''} />)}
        </div>

        <button className="ptt-voice" onPointerDown={startTalk} onPointerUp={stopTalk} onPointerLeave={stopTalk}>
          <span>{!joined ? 'ENTRAR' : muted ? 'MUDO' : tx ? 'FALANDO...' : 'SEGURE PARA FALAR'}</span>
        </button>

        <div className="action-row">
          <button onClick={() => setMuted((value) => !value)} disabled={!joined}>{muted ? 'Ouvir' : 'Mute'}</button>
          <button onClick={joined ? leaveChannel : joinChannel}>{joined ? 'Sair do canal' : 'Entrar no canal'}</button>
        </div>

        <footer className="radio-footer">
          <span>{hasSupabase ? 'live ligado' : 'configure Supabase'}</span>
          <span>canal {channelCode || '00001'}</span>
        </footer>
      </section>
    </main>
  )
}
