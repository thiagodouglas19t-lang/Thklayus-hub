import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Heart, Home, Layers3, MousePointer2, Sparkles, Zap } from 'lucide-react'
import { supabase } from './lib/supabase'

const spring = { type: 'spring', stiffness: 350, damping: 28 }
const glass = 'bg-white/[0.01] border border-white/[0.05] backdrop-blur-xl rounded-3xl p-6'

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'licao', label: 'Lição', icon: Layers3 },
]

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('home')
  const [user, setUser] = useState(null)
  const [xp, setXp] = useState(0)
  const [vidas, setVidas] = useState(5)
  const [streak, setStreak] = useState(0)
  const [fase, setFase] = useState(0)
  const [contrasteOk, setContrasteOk] = useState(false)
  const [erroToque, setErroToque] = useState(false)
  const [states, setStates] = useState({ hover: false, active: false, disabled: false })

  const progresso = ((fase + 1) / 3) * 100

  const buttonPreviewClass = useMemo(() => {
    const classes = ['rounded-2xl px-7 py-4 font-extrabold tracking-tight transition-all bg-white text-black']
    if (states.hover) classes.push('shadow-[0_0_50px_rgba(168,85,247,0.35)] ring-1 ring-purple-300/30 -translate-y-0.5')
    if (states.active) classes.push('scale-95 translate-y-1')
    if (states.disabled) classes.push('opacity-40 grayscale pointer-events-none')
    return classes.join(' ')
  }, [states])

  useEffect(() => {
    carregarPerfil()
  }, [])

  async function carregarPerfil() {
    try {
      const { data: auth } = await supabase.auth.getUser()
      if (!auth.user) return
      setUser(auth.user)

      const { data, error } = await supabase
        .from('profiles')
        .select('xp, vidas, streak')
        .eq('id', auth.user.id)
        .maybeSingle()

      if (error || !data) return
      setXp(Number(data.xp || 0))
      setVidas(Number(data.vidas ?? 5))
      setStreak(Number(data.streak || 0))
    } catch (error) {
      console.error('Erro ao carregar perfil:', error)
    }
  }

  async function atualizarPerfil(payload) {
    try {
      if (!user) return
      const nextXp = payload.xp ?? xp
      const nextVidas = payload.vidas ?? vidas

      setXp(nextXp)
      setVidas(nextVidas)

      const { error } = await supabase
        .from('profiles')
        .update({ xp: nextXp, vidas: nextVidas })
        .eq('id', user.id)

      if (error) throw error
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
    }
  }

  async function perderVida() {
    await atualizarPerfil({ vidas: Math.max(0, vidas - 1) })
  }

  async function finalizarAula() {
    try {
      await atualizarPerfil({ xp: xp + 15 })
      if (user) {
        await supabase.from('user_progress').upsert(
          { user_id: user.id, trilha: 'Visual', licao_id: 'design-system-botoes', concluida: true },
          { onConflict: 'user_id,trilha,licao_id' },
        )
      }
      setFase(0)
      setContrasteOk(false)
      setErroToque(false)
      setAbaAtiva('home')
    } catch (error) {
      console.error('Erro ao finalizar aula:', error)
    }
  }

  async function tocarMicroBotao() {
    if (!erroToque) {
      setErroToque(true)
      await perderVida()
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050507] text-white">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col px-4 pb-28 pt-6">
        <header className="mb-7 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/35">CodeBloom</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tighter">Design Lab</h1>
          </div>

          <div className="flex items-center gap-2">
            <motion.div whileHover={{ y: -2 }} transition={spring} className="rounded-2xl border border-white/[0.05] bg-white/[0.01] px-3 py-2 backdrop-blur-xl">
              <div className="flex items-center gap-1.5 text-sm font-bold"><Heart size={15} className="text-rose-300" />{vidas}</div>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={spring} className="rounded-2xl border border-white/[0.05] bg-white/[0.01] px-3 py-2 backdrop-blur-xl">
              <div className="flex items-center gap-1.5 text-sm font-bold"><Zap size={15} className="text-cyan-300" />{xp}</div>
            </motion.div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.section
            key={abaAtiva}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={spring}
            className="flex-1"
          >
            {abaAtiva === 'home' ? (
              <HomeScreen xp={xp} vidas={vidas} streak={streak} openLesson={() => setAbaAtiva('licao')} />
            ) : (
              <LessonScreen
                fase={fase}
                setFase={setFase}
                progresso={progresso}
                contrasteOk={contrasteOk}
                setContrasteOk={setContrasteOk}
                states={states}
                setStates={setStates}
                buttonPreviewClass={buttonPreviewClass}
                erroToque={erroToque}
                tocarMicroBotao={tocarMicroBotao}
                finalizarAula={finalizarAula}
              />
            )}
          </motion.section>
        </AnimatePresence>

        <nav className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-24px)] max-w-md -translate-x-1/2 items-center justify-between rounded-3xl border border-white/[0.05] bg-black/50 p-2 backdrop-blur-2xl">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const active = abaAtiva === tab.id
            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.95 }}
                whileHover={{ y: -2 }}
                transition={spring}
                onClick={() => setAbaAtiva(tab.id)}
                className="relative flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-white/70"
              >
                {active && <motion.span layoutId="activeTabBackground" transition={spring} className="absolute inset-0 rounded-2xl bg-purple-600/20" />}
                <Icon size={17} className="relative" />
                <span className="relative tracking-tight">{tab.label}</span>
              </motion.button>
            )
          })}
        </nav>
      </div>
    </main>
  )
}

function HomeScreen({ xp, vidas, streak, openLesson }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Metric label="Streak" value={streak} />
        <Metric label="XP" value={xp} />
        <Metric label="Vidas" value={vidas} />
      </div>

      <motion.button whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} onClick={openLesson} className={`${glass} relative w-full overflow-hidden text-left`}>
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple-600/10 blur-[70px]" />
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-purple-200/55">Continue</p>
        <h2 className="mt-4 text-5xl font-extrabold leading-[0.9] tracking-tighter">Design System: Botões</h2>
        <p className="mt-4 text-sm leading-7 text-white/48">Treine contraste, estados e toque mobile com interações reais.</p>
      </motion.button>

      <div className="space-y-3">
        {['Code', 'Visual', 'Business'].map((item) => (
          <motion.article key={item} whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} className={`${glass} flex items-center justify-between`}>
            <div>
              <h3 className="text-xl font-extrabold tracking-tighter">{item}</h3>
              <p className="mt-1 text-sm text-white/40">Trilha premium em construção guiada.</p>
            </div>
            <Sparkles className="text-purple-200/70" />
          </motion.article>
        ))}
      </div>
    </div>
  )
}

function Metric({ label, value }) {
  return (
    <motion.article whileHover={{ y: -2 }} transition={spring} className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-4 backdrop-blur-xl">
      <p className="text-xs text-white/35">{label}</p>
      <h3 className="mt-2 text-3xl font-extrabold tracking-tighter">{value}</h3>
    </motion.article>
  )
}

function LessonScreen({ fase, setFase, progresso, contrasteOk, setContrasteOk, states, setStates, buttonPreviewClass, erroToque, tocarMicroBotao, finalizarAula }) {
  const podeAvancar = fase !== 0 || contrasteOk

  return (
    <div className="space-y-4">
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
        <motion.div animate={{ width: `${progresso}%` }} transition={spring} className="h-full rounded-full bg-gradient-to-r from-purple-400 to-cyan-300" />
      </div>

      <motion.section layout transition={spring} className={`${glass} min-h-[560px]`}>
        <AnimatePresence mode="wait">
          <motion.div key={fase} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={spring}>
            {fase === 0 && <FaseContraste contrasteOk={contrasteOk} setContrasteOk={setContrasteOk} />}
            {fase === 1 && <FaseSandbox states={states} setStates={setStates} buttonPreviewClass={buttonPreviewClass} />}
            {fase === 2 && <FaseAcessibilidade erroToque={erroToque} tocarMicroBotao={tocarMicroBotao} />}
          </motion.div>
        </AnimatePresence>
      </motion.section>

      <div className="grid grid-cols-2 gap-3">
        <motion.button whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} onClick={() => setFase(Math.max(0, fase - 1))} className={`${glass} py-4 font-bold`}>
          Voltar
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ y: -2 }}
          transition={spring}
          disabled={!podeAvancar}
          onClick={fase === 2 ? finalizarAula : () => setFase(Math.min(2, fase + 1))}
          className={`rounded-3xl px-6 py-4 font-extrabold tracking-tight ${podeAvancar ? 'bg-white text-black' : 'bg-white/[0.04] text-white/25'}`}
        >
          {fase === 2 ? 'Finalizar' : 'Avançar'}
        </motion.button>
      </div>
    </div>
  )
}

function FaseContraste({ contrasteOk, setContrasteOk }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-purple-200/55">Fase 0</p>
      <h2 className="mt-4 text-5xl font-extrabold leading-[0.9] tracking-tighter">Contraste que parece caro.</h2>
      <div className="mt-8 grid gap-3">
        <motion.button whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} onClick={() => setContrasteOk(false)} className="rounded-3xl bg-[#120f18] px-5 py-4 font-extrabold text-[#2b2237]">Continuar</motion.button>
        <motion.button whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} onClick={() => setContrasteOk(true)} className={`rounded-3xl bg-white px-5 py-4 font-extrabold text-black ${contrasteOk ? 'shadow-[0_0_60px_rgba(168,85,247,0.32)] ring-1 ring-purple-300/40' : ''}`}>Continuar</motion.button>
      </div>
      {contrasteOk && <p className="mt-5 flex items-center gap-2 text-sm text-cyan-100/70"><Check size={16} /> Legibilidade aprovada.</p>}
    </div>
  )
}

function FaseSandbox({ states, setStates, buttonPreviewClass }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-purple-200/55">Fase 1</p>
      <h2 className="mt-4 text-5xl font-extrabold leading-[0.9] tracking-tighter">Estados com peso físico.</h2>
      <div className="my-10 grid place-items-center rounded-3xl border border-white/[0.05] bg-black/30 p-8">
        <motion.button layout transition={spring} className={buttonPreviewClass}>Botão Premium</motion.button>
      </div>
      <div className="space-y-3">
        {['hover', 'active', 'disabled'].map((key) => <Switch key={key} label={key} value={states[key]} onClick={() => setStates({ ...states, [key]: !states[key] })} />)}
      </div>
    </div>
  )
}

function Switch({ label, value, onClick }) {
  return (
    <motion.button whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} onClick={onClick} className="flex w-full items-center justify-between rounded-3xl border border-white/[0.05] bg-white/[0.01] p-4 backdrop-blur-xl">
      <span className="font-bold capitalize tracking-tight">{label}</span>
      <span className={`relative h-7 w-12 rounded-full ${value ? 'bg-purple-500/50' : 'bg-white/[0.06]'}`}>
        <motion.span layout transition={spring} className={`absolute top-1 h-5 w-5 rounded-full bg-white ${value ? 'left-6' : 'left-1'}`} />
      </span>
    </motion.button>
  )
}

function FaseAcessibilidade({ erroToque, tocarMicroBotao }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-purple-200/55">Fase 2</p>
      <h2 className="mt-4 text-5xl font-extrabold leading-[0.9] tracking-tighter">Toque mobile sem fricção.</h2>
      <div className="mt-10 grid place-items-center rounded-3xl border border-white/[0.05] bg-black/30 p-10">
        <motion.button
          layout
          whileTap={{ scale: 0.95 }}
          whileHover={{ y: -2 }}
          transition={spring}
          onClick={tocarMicroBotao}
          className={`grid place-items-center font-extrabold ${erroToque ? 'h-11 w-11 rounded-2xl bg-white text-black' : 'h-5 w-5 rounded-lg bg-white/[0.05] text-[10px] text-white/35'}`}
        >
          <MousePointer2 size={erroToque ? 18 : 10} />
        </motion.button>
      </div>
      {erroToque && <p className="mt-5 text-sm leading-6 text-cyan-100/70">Corrigido para 44x44px com transição elástica.</p>}
    </div>
  )
}
