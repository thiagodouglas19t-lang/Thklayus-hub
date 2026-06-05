import { useEffect, useMemo, useRef, useState } from 'react'

const STORAGE_KEY = 'thklayus-radio-log'
const CHANNELS = ['GLOBAL', 'EQUIPE', 'BASE', 'EMERGÊNCIA']

export default function App() {
  const [channelIndex, setChannelIndex] = useState(0)
  const [users, setUsers] = useState(4)
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

  const channel = CHANNELS[channelIndex]
  const clock = useMemo(() => new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), [log, tx])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(log.slice(-30)))
  }, [log])

  useEffect(() => {
    const id = setInterval(() => setUsers((n) => (n >= 9 ? 4 : n + 1)), 6000)
    return () => clearInterval(id)
  }, [])

  function beep(freq = 720, duration = 120) {
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

  function nextChannel() {
    beep(520, 80)
    setChannelIndex((current) => (current + 1) % CHANNELS.length)
  }

  function transmit() {
    const text = message.trim() || 'Sinal enviado pelo rádio.'
    beep(880, 140)
    setTx(true)
    setLog((current) => [...current, { id: crypto.randomUUID(), channel, text, at: new Date().toISOString() }])
    setMessage('')
    setTimeout(() => setTx(false), 900)
  }

  return (
    <main className="app">
      <section className="station">
        <p className="online">receiver able to hide yt • Online Users={users}</p>
        <div className={`radio ${tx ? 'is-tx' : ''}`}>
          <div className="antenna" />
          <div className="knob" />
          <button className="power" onClick={() => beep(440, 120)}>⏻</button>
          <button className="sos" onClick={() => setMessage('SOS: preciso de comunicação agora.')}>SOS</button>

          <div className="brand">{channel}</div>

          <div className="screen">
            <div className="mini">{clock}</div>
            <div className="channel">{String(channelIndex + 7).padStart(2, '0')}</div>
            <div className="bars"><i /><i /><i /><i /></div>
          </div>

          <div className="controls">
            <button onClick={nextChannel}>▲</button>
            <button onClick={() => beep()}>M</button>
            <button onClick={nextChannel}>▼</button>
          </div>

          <div className="scan-row">
            <button onClick={nextChannel}>UP</button>
            <button className="scan" onClick={nextChannel}>SCAN</button>
            <button onClick={nextChannel}>DN</button>
          </div>

          <div className="speaker">
            {Array.from({ length: 21 }).map((_, index) => <span key={index} />)}
            <b>PTT</b>
          </div>
        </div>

        <div className="console">
          <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Digite uma mensagem..." maxLength={120} />
          <button className="ptt" onClick={transmit}>{tx ? 'TRANSMITINDO' : 'SEGURAR PTT'}</button>
          <div className="log">
            {log.length === 0 ? <p>Nenhuma transmissão ainda.</p> : log.slice().reverse().map((item) => (
              <article key={item.id}>
                <strong>{item.channel}</strong>
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
