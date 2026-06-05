import { useEffect, useRef, useState } from 'react'

const CHANNEL_NAME = 'GLOBAL'
const BASE_USERS = 7

export default function App() {
  const [joined, setJoined] = useState(() => localStorage.getItem('radio-joined') !== 'false')
  const [muted, setMuted] = useState(() => localStorage.getItem('radio-muted') === 'true')
  const [tx, setTx] = useState(false)
  const [micStatus, setMicStatus] = useState('toque no PTT para abrir o microfone ao vivo')
  const [channelCode, setChannelCode] = useState(() => localStorage.getItem('radio-channel') || '00001')
  const streamRef = useRef(null)

  useEffect(() => localStorage.setItem('radio-joined', String(joined)), [joined])
  useEffect(() => localStorage.setItem('radio-muted', String(muted)), [muted])
  useEffect(() => localStorage.setItem('radio-channel', channelCode), [channelCode])

  const peopleInChannel = joined ? BASE_USERS + 1 : BASE_USERS
  const status = !joined ? 'FORA DO CANAL' : muted ? 'MUDO' : tx ? 'AO VIVO' : 'ESCUTANDO'

  async function ensureMic() {
    if (streamRef.current) return streamRef.current
    try {
      setMicStatus('pedindo permissão do microfone...')
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } })
      stream.getAudioTracks().forEach((track) => { track.enabled = false })
      streamRef.current = stream
      setMicStatus('microfone pronto para tempo real')
      return stream
    } catch {
      setMicStatus('microfone bloqueado no navegador')
      throw new Error('microfone bloqueado')
    }
  }

  function setMicLive(value) {
    if (!streamRef.current) return
    streamRef.current.getAudioTracks().forEach((track) => { track.enabled = value })
  }

  function joinChannel() {
    setJoined(true)
    setMuted(false)
    setMicStatus('canal aberto; segure PTT para falar ao vivo')
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
      setMicStatus('transmitindo ao vivo')
      if ('vibrate' in navigator) navigator.vibrate(25)
    } catch {
      setTx(false)
    }
  }

  function stopTalk() {
    setMicLive(false)
    setTx(false)
    if (joined) setMicStatus('escutando em tempo real')
  }

  return (
    <main className="app voice-app">
      <section className={`phone-radio ${tx ? 'talking' : ''} ${muted ? 'muted' : ''} ${!joined ? 'left' : ''}`}>
        <header className="top-panel">
          <div>
            <span className="eyebrow">WALKIE TALKIE LIVE</span>
            <h1>{CHANNEL_NAME}</h1>
          </div>
          <button className="mini-button" onClick={joined ? leaveChannel : joinChannel}>{joined ? 'Sair' : 'Entrar'}</button>
        </header>

        <div className="display-card">
          <div className="status-dot" />
          <p>{status}</p>
          <strong>{peopleInChannel} pessoas no canal</strong>
          <small>{joined ? micStatus : 'Entre para escutar o canal'}</small>
        </div>

        <label className="channel-box">
          <span>Código do canal</span>
          <input value={channelCode} onChange={(event) => setChannelCode(event.target.value.replace(/\D/g, '').slice(0, 20))} />
        </label>

        <div className="meter">
          {Array.from({ length: 18 }).map((_, index) => <span key={index} className={tx && index < 15 ? 'active' : ''} />)}
        </div>

        <button className="ptt-voice" onPointerDown={startTalk} onPointerUp={stopTalk} onPointerLeave={stopTalk}>
          <span>{!joined ? 'ENTRAR' : muted ? 'MUDO' : tx ? 'AO VIVO...' : 'SEGURE PARA FALAR'}</span>
        </button>

        <div className="action-row">
          <button onClick={() => setMuted((value) => !value)} disabled={!joined}>{muted ? 'Ativar som' : 'Mute'}</button>
          <button onClick={joined ? leaveChannel : joinChannel}>{joined ? 'Sair do canal' : 'Entrar no canal'}</button>
        </div>

        <footer className="radio-footer">
          <span>WebRTC pronto</span>
          <span>Canal {channelCode || '00001'}</span>
        </footer>
      </section>
    </main>
  )
}
