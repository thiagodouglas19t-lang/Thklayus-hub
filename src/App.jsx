import { useEffect, useState } from 'react'

const CHANNEL_NAME = 'GLOBAL'
const BASE_USERS = 7

export default function App() {
  const [joined, setJoined] = useState(() => localStorage.getItem('radio-joined') !== 'false')
  const [muted, setMuted] = useState(() => localStorage.getItem('radio-muted') === 'true')
  const [tx, setTx] = useState(false)
  const [channelCode, setChannelCode] = useState(() => localStorage.getItem('radio-channel') || '00001')

  useEffect(() => localStorage.setItem('radio-joined', String(joined)), [joined])
  useEffect(() => localStorage.setItem('radio-muted', String(muted)), [muted])
  useEffect(() => localStorage.setItem('radio-channel', channelCode), [channelCode])

  const peopleInChannel = joined ? BASE_USERS + 1 : BASE_USERS
  const status = !joined ? 'FORA DO CANAL' : muted ? 'MUDO' : tx ? 'FALANDO' : 'ESCUTANDO'

  function joinChannel() {
    setJoined(true)
    setMuted(false)
  }

  function leaveChannel() {
    setTx(false)
    setJoined(false)
  }

  function startTalk() {
    if (!joined) return joinChannel()
    if (muted) return
    setTx(true)
    if ('vibrate' in navigator) navigator.vibrate(25)
  }

  function stopTalk() {
    setTx(false)
  }

  return (
    <main className="app voice-app">
      <section className={`phone-radio ${tx ? 'talking' : ''} ${muted ? 'muted' : ''} ${!joined ? 'left' : ''}`}>
        <header className="top-panel">
          <div>
            <span className="eyebrow">WALKIE TALKIE</span>
            <h1>{CHANNEL_NAME}</h1>
          </div>
          <button className="mini-button" onClick={joined ? leaveChannel : joinChannel}>{joined ? 'Sair' : 'Entrar'}</button>
        </header>

        <div className="display-card">
          <div className="status-dot" />
          <p>{status}</p>
          <strong>{peopleInChannel} pessoas no canal</strong>
          <small>{joined ? 'Segure PTT para falar' : 'Entre para escutar o canal'}</small>
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
          <button onClick={() => setMuted((value) => !value)} disabled={!joined}>{muted ? 'Ativar som' : 'Mute'}</button>
          <button onClick={joined ? leaveChannel : joinChannel}>{joined ? 'Sair do canal' : 'Entrar no canal'}</button>
        </div>

        <footer className="radio-footer">
          <span>Sem conta</span>
          <span>Canal {channelCode || '00001'}</span>
        </footer>
      </section>
    </main>
  )
}
