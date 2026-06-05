import { useEffect, useMemo, useRef, useState } from 'react'

const CHANNEL_KEY = 'thklayus-radio-messages'

export default function App() {
  const [online, setOnline] = useState(true)
  const [transmitting, setTransmitting] = useState(false)
  const [name, setName] = useState(() => localStorage.getItem('radio-name') || 'Operador')
  const [text, setText] = useState('')
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CHANNEL_KEY) || '[]')
    } catch {
      return []
    }
  })
  const audioRef = useRef(null)

  const time = useMemo(() => new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(new Date()), [])

  useEffect(() => {
    localStorage.setItem('radio-name', name)
  }, [name])

  useEffect(() => {
    localStorage.setItem(CHANNEL_KEY, JSON.stringify(messages.slice(-40)))
  }, [messages])

  useEffect(() => {
    const id = setInterval(() => setOnline(true), 15000)
    return () => clearInterval(id)
  }, [])

  function beep() {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const ctx = audioRef.current || new AudioContext()
    audioRef.current = ctx
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()
    oscillator.frequency.value = 760
    gain.gain.value = 0.04
    oscillator.connect(gain)
    gain.connect(ctx.destination)
    oscillator.start()
    setTimeout(() => oscillator.stop(), 140)
  }

  function sendMessage(event) {
    event.preventDefault()
    const clean = text.trim()
    if (!clean) return
    beep()
    setTransmitting(true)
    setMessages((current) => [...current, { id: crypto.randomUUID(), name, text: clean, at: new Date().toISOString() }])
    setText('')
    setTimeout(() => setTransmitting(false), 900)
  }

  return (
    <main className="shell">
      <section className="radio-card">
        <div className="topbar">
          <span className="live-dot" />
          <strong>Rádio 24h ligado</strong>
          <small>{online ? 'ONLINE' : 'RECONECTANDO'}</small>
        </div>

        <div className="display">
          <p>THKLAYUS HUB</p>
          <h1>Canal de comunicação</h1>
          <div className="frequency">88.7 FM</div>
          <div className="signal"><span /><span /><span /><span /></div>
        </div>

        <form className="panel" onSubmit={sendMessage}>
          <label>
            Nome do operador
            <input value={name} onChange={(e) => setName(e.target.value)} maxLength={24} />
          </label>
          <label>
            Mensagem rápida
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Digite e transmita..." maxLength={180} />
          </label>
          <button className={transmitting ? 'transmitting' : ''} type="submit">
            {transmitting ? 'Transmitindo...' : 'Transmitir no rádio'}
          </button>
        </form>

        <div className="log">
          <div className="log-title"><span>Histórico local</span><span>{time}</span></div>
          {messages.length === 0 ? <p className="empty">Nenhuma transmissão ainda.</p> : messages.slice().reverse().map((msg) => (
            <article key={msg.id}>
              <strong>{msg.name}</strong>
              <p>{msg.text}</p>
              <time>{new Date(msg.at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</time>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
