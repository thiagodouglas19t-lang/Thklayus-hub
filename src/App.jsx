import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'thklayus-radio-log'
const CHANNEL_NAME = 'GLOBAL'
const BASE_USERS = 7

export default function App() {
  const [joined, setJoined] = useState(() => localStorage.getItem('radio-joined') !== 'false')
  const [muted, setMuted] = useState(() => localStorage.getItem('radio-muted') === 'true')
  const [tx, setTx] = useState(false)
  const [message, setMessage] = useState('')
  const [log, setLog] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  })
  const audioRef = useRef(null)

  const peopleInChannel = joined ? BASE_USERS + 1 : BASE_USERS

  useEffect(() => {
    localStorage.setItem('radio-joined', String(joined))
  }, [joined])

  useEffect(() => {
    localStorage.setItem('radio-muted', String(muted))
  }, [muted])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(log.slice(-30)))
  }, [log])

  function beep(freq = 720, duration = 120) {
    if (muted || !joined) return
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const ctx = audioRef.current || new AudioContext()
    audioRef.current = ctx
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()
    oscillator.type = 'square'
    oscillator.frequency.value = freq
    gain.gain.value = 0.035
    oscillator.connect(gain)
    gain.connect(ctx.destination)
    oscillator.start()
    setTimeout(() => oscillator.stop(), duration)
  }

  function addSystem(text) {
    setLog((current) => [...current, { id: crypto.randomUUID(), type: 'system', text, at: new Date().toISOString() }])
  }

  function joinChannel() {
    setJoined(true)
    setMuted(false)
    addSystem('Você entrou no canal GLOBAL.')
    setTimeout(() => beep(640, 90), 50)
  }

  function leaveChannel() {
    setJoined(false)
    setTx(false)
    addSystem('Você saiu do canal. O rádio ficou em silêncio.')
  }

  function toggleMute() {
    const next = !muted
    setMuted(next)
    addSystem(next ? 'Você silenciou o canal.' : 'Você voltou a escutar o canal.')
    if (!next) setTimeout(() => beep(760, 90), 50)
  }

  function transmit() {
    if (!joined) return joinChannel()
    const text = message.trim() || 'Sinal enviado pelo rádio.'
    beep(880, 140)
    setTx(true)
    setLog((current) => [...current, { id: crypto.randomUUID(), type: 'message', text, at: new Date().toISOString() }])
    setMessage('')
    setTimeout(() => setTx(false), 900)
  }

  return (
    <main className="app">
      <section className="station mobile-station">
        <p className="online">CANAL {CHANNEL_NAME} • {peopleInChannel} pessoas no canal</p>

        <div className={`radio mobile-radio ${tx ? 'is-tx' : ''} ${!joined ? 'is-off' : ''} ${muted ? 'is-muted' : ''}`}>
          <div className="antenna" />
          <div className="phone-notch" />
          <button className="power" onClick={joined ? leaveChannel : joinChannel}>{joined ? '⏻' : '▶'}</button>
          <button className="sos" onClick={toggleMute}>{muted ? 'ON' : 'MUTE'}</button>

          <div className="brand">{joined ? CHANNEL_NAME : 'FORA'}</div>

          <div className="screen">
            <div className="mini">{joined ? (muted ? 'MUDO' : 'ESCUTANDO') : 'DESCONECTADO'}</div>
            <div className="channel">01</div>
            <div className="bars"><i /><i /><i /><i /></div>
          </div>

          <div className="status-card">
            <strong>{joined ? 'Você está no canal' : 'Você saiu do canal'}</strong>
            <span>{joined ? `${peopleInChannel} pessoas conectadas` : 'Toque em ENTRAR para escutar'}</span>
          </div>

          <div className="controls channel-actions">
            <button onClick={toggleMute} disabled={!joined}>{muted ? 'OUVIR' : 'MUTE'}</button>
            <button onClick={joined ? leaveChannel : joinChannel}>{joined ? 'SAIR' : 'ENTRAR'}</button>
          </div>

          <div className="speaker">
            {Array.from({ length: 21 }).map((_, index) => <span key={index} />)}
            <b>{muted || !joined ? 'OFF' : 'PTT'}</b>
          </div>
        </div>

        <div className="console">
          <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder={joined ? 'Mensagem rápida...' : 'Entre no canal para transmitir'} maxLength={120} disabled={!joined} />
          <button className="ptt" onClick={transmit}>{!joined ? 'ENTRAR NO CANAL' : tx ? 'TRANSMITINDO' : 'SEGURAR PTT'}</button>
          <div className="log">
            {log.length === 0 ? <p>Nenhuma atividade no canal.</p> : log.slice().reverse().map((item) => (
              <article key={item.id} className={item.type === 'system' ? 'system-log' : ''}>
                <strong>{item.type === 'system' ? 'SISTEMA' : CHANNEL_NAME}</strong>
                <span>{new Date(item.at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
