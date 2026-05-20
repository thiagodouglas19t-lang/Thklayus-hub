import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronRight, Crown, Heart, Home, Layers3, MousePointer2, Sparkles, Zap } from 'lucide-react'
import { supabase } from './lib/supabase'

const spring = { type: 'spring', stiffness: 350, damping: 28 }
const liquid = { type: 'spring', stiffness: 260, damping: 20, mass: 0.8 }
const glass = 'bg-white/[0.08] border border-white/[0.16] backdrop-blur-2xl rounded-3xl p-6 shadow-[0_24px_90px_rgba(0,0,0,0.18)]'

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'licao', label: 'Lição', icon: Layers3 },
]

const lessons = [
  { title: 'Contraste que vende', tag: 'UI', time: '4 min' },
  { title: 'Estados táteis', tag: 'Motion', time: '6 min' },
  { title: 'Toque mobile 44px', tag: 'UX', time: '5 min' },
]

const projects = [
  { title: 'Landing premium', value: 'R$ 1.200', desc: 'Hero, CTA e oferta para cliente local.' },
  { title: 'Página Bio Pro', value: 'R$ 450', desc: 'Cartão digital com visual de produto caro.' },
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
    const classes = ['rounded-2xl px-7 py-4 font-extrabold tracking-tight bg-white text-black shadow-[0_20px_60px_rgba(255,255,255,0.22)]']
    if (states.hover) classes.push('shadow-[0_0_60px_rgba(20,184,166,0.40)] ring-1 ring-cyan-100/60 -translate-y-1')
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
      if (!auth?.user) return
      setUser(auth.user)
      const { data } = await supabase.from('profiles').select('xp, vidas, streak').eq('id', auth.user.id).maybeSingle()
      if (!data) return
      setXp(Number(data.xp || 0))
      setVidas(Number(data.vidas ?? 5))
      setStreak(Number(data.streak || 0))
    } catch (error) {
      console.error('Erro ao carregar perfil:', error)
    }
  }

  async function atualizarPerfil(payload) {
    try {
      const nextXp = payload.xp ?? xp
      const nextVidas = payload.vidas ?? vidas
      setXp(nextXp)
      setVidas(nextVidas)
      if (!user) return
      await supabase.from('profiles').update({ xp: nextXp, vidas: nextVidas }).eq('id', user.id)
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
    <main className="relative min-h-screen overflow-hidden bg-[#edf8f1] text-[#071011]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(45,212,191,0.45),transparent_34%),radial-gradient(circle_at_100%_10%,rgba(168,85,247,0.22),transparent_26%),linear-gradient(180deg,#f8fff9_0%,#d7f8e9_38%,#050507_100%)]" />
      <div className="pointer-events-none absolute left-[-90px] top-[-110px] h-96 w-96 rounded-full bg-cyan-300/30 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-32 right-[-120px] h-96 w-96 rounded-full bg-purple-500/25 blur-[140px]" />

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col px-4 pb-28 pt-6">
        <header className="mb-7 flex items-center justify-between text-white mix-blend-difference">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] opacity-60">CodeBloom</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tighter">Visual Academy</h1>
          </div>
          <div className="flex items-center gap-2">
            <StatusPill icon={<Heart size={15} />} value={vidas} />
            <StatusPill icon={<Zap size={15} />} value={xp} />
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.section key={abaAtiva} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={spring} className="flex-1">
            {abaAtiva === 'home' ? (
              <HomeScreen xp={xp} vidas={vidas} streak={streak} openLesson={() => setAbaAtiva('licao')} />
            ) : (
              <LessonScreen fase={fase} setFase={setFase} progresso={progresso} contrasteOk={contrasteOk} setContrasteOk={setContrasteOk} states={states} setStates={setStates} buttonPreviewClass={buttonPreviewClass} erroToque={erroToque} tocarMicroBotao={tocarMicroBotao} finalizarAula={finalizarAula} />
            )}
          </motion.section>
        </AnimatePresence>

        <nav className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-24px)] max-w-md -translate-x-1/2 items-center justify-between rounded-[2rem] border border-white/30 bg-white/20 p-2 text-white shadow-[0_22px_80px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const active = abaAtiva === tab.id
            return <motion.button key={tab.id} whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} onClick={() => setAbaAtiva(tab.id)} className="relative flex flex-1 items-center justify-center gap-2 rounded-3xl px-4 py-3 text-sm font-black text-black/70">{active && <motion.span layoutId="activeTabBackground" transition={liquid} className="absolute inset-0 rounded-3xl bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_16px_50px_rgba(0,0,0,0.16)]" />}<Icon size={17} className="relative" /><span className="relative tracking-tight">{tab.label}</span></motion.button>
          })}
        </nav>
      </div>
    </main>
  )
}

function StatusPill({ icon, value }) {
  return <motion.div whileHover={{ y: -2 }} transition={spring} className="rounded-2xl border border-white/30 bg-white/20 px-3 py-2 text-white shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl"><div className="flex items-center gap-1.5 text-sm font-black">{icon}{value}</div></motion.div>
}

function HomeScreen({ xp, vidas, streak, openLesson }) {
  return <div className="space-y-5"><HeroCard openLesson={openLesson} /><div className="grid grid-cols-3 gap-3"><Metric label="Streak" value={streak} /><Metric label="XP" value={xp} /><Metric label="Vidas" value={vidas} /></div><InterfacePreview /><SectionTitle title="Trilha de hoje" subtitle="Aulas curtas com resultado visual" /> <div className="space-y-3">{lessons.map((lesson, index) => <motion.button key={lesson.title} whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} onClick={index === 0 ? openLesson : undefined} className={`${glass} flex w-full items-center justify-between text-left`}><div><div className="flex items-center gap-2"><span className="rounded-full border border-black/10 bg-white/40 px-2 py-1 text-[10px] font-black text-black/45">{lesson.tag}</span><span className="text-xs text-black/35">{lesson.time}</span></div><h3 className="mt-3 text-xl font-extrabold tracking-tighter">{lesson.title}</h3></div><ChevronRight className="text-black/35" /></motion.button>)}</div><SectionTitle title="Renda digital" subtitle="Transforme aula em proposta" /><div className="grid gap-3">{projects.map((project) => <motion.article key={project.title} whileHover={{ y: -2 }} transition={spring} className={`${glass}`}><div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.24em] text-black/35">Projeto</p><h3 className="mt-2 text-2xl font-extrabold tracking-tighter">{project.title}</h3><p className="mt-2 text-sm leading-6 text-black/45">{project.desc}</p></div><div className="rounded-2xl border border-emerald-600/10 bg-emerald-300/30 px-3 py-2 text-sm font-extrabold text-emerald-950">{project.value}</div></div></motion.article>)}</div></div>
}

function HeroCard({ openLesson }) {
  return <motion.button whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} onClick={openLesson} className="relative w-full overflow-hidden rounded-[2.4rem] border border-white/40 bg-white/25 p-6 text-left shadow-[0_30px_120px_rgba(0,0,0,0.18)] backdrop-blur-2xl"><div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-300/30 blur-[80px]" /><div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/55 to-transparent" /><div className="relative min-h-[360px]"><div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/30 px-3 py-1.5 text-xs font-bold text-black/55 backdrop-blur-xl"><Crown size={13} /> Signature Series</div><h2 className="max-w-xs text-6xl font-extrabold leading-[0.82] tracking-tighter text-black">Botões que parecem produto caro.</h2><div className="absolute bottom-0 left-0 right-0 text-white"><p className="max-w-xs text-sm leading-7 text-white/70">Aprenda a criar CTA com presença, contraste, estados e toque mobile.</p><div className="mt-5 flex items-center gap-3"><span className="rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-black shadow-[0_18px_50px_rgba(255,255,255,0.24)]">Começar aula</span><span className="text-sm font-bold text-white/55">+15 XP</span></div></div></div></motion.button>
}

function InterfacePreview() {
  return <motion.article whileHover={{ y: -2 }} transition={spring} className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/25 p-4 shadow-[0_28px_100px_rgba(0,0,0,0.16)] backdrop-blur-2xl"><div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.28),transparent_30%),radial-gradient(circle_at_20%_0%,rgba(147,51,234,0.16),transparent_34%)]" /><div className="relative rounded-[1.5rem] border border-white/20 bg-black/70 p-4 text-white"><div className="mb-8 flex items-center justify-between"><div className="h-8 w-8 rounded-xl bg-white/10" /><div className="flex gap-2 text-[10px] text-white/35"><span>Design</span><span>Code</span><span>Sell</span></div></div><p className="text-xs uppercase tracking-[0.24em] text-cyan-100/45">Portfolio UI</p><h3 className="mt-2 text-4xl font-extrabold leading-[0.9] tracking-tighter">From lesson to client-ready interface.</h3><div className="mt-7 grid grid-cols-2 gap-3"><div className="h-20 rounded-2xl border border-white/[0.08] bg-white/[0.05]" /><div className="h-20 rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.10]" /></div></div></motion.article>
}

function SectionTitle({ title, subtitle }) {
  return <div className="pt-1"><h2 className="text-2xl font-extrabold tracking-tighter text-black">{title}</h2><p className="mt-1 text-sm text-black/45">{subtitle}</p></div>
}

function Metric({ label, value }) {
  return <motion.article whileHover={{ y: -2 }} transition={spring} className="rounded-3xl border border-white/40 bg-white/25 p-4 shadow-[0_18px_70px_rgba(0,0,0,0.12)] backdrop-blur-2xl"><p className="text-xs text-black/45">{label}</p><h3 className="mt-2 text-3xl font-extrabold tracking-tighter text-black">{value}</h3></motion.article>
}

function LessonScreen({ fase, setFase, progresso, contrasteOk, setContrasteOk, states, setStates, buttonPreviewClass, erroToque, tocarMicroBotao, finalizarAula }) {
  const podeAvancar = fase !== 0 || contrasteOk
  return <div className="space-y-4 text-black"><div className="h-1.5 overflow-hidden rounded-full bg-black/10"><motion.div animate={{ width: `${progresso}%` }} transition={liquid} className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-400" /></div><motion.section layout transition={spring} className="min-h-[560px] rounded-[2rem] border border-white/40 bg-white/30 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.16)] backdrop-blur-2xl"><AnimatePresence mode="wait"><motion.div key={fase} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={spring}>{fase === 0 && <FaseContraste contrasteOk={contrasteOk} setContrasteOk={setContrasteOk} />}{fase === 1 && <FaseSandbox states={states} setStates={setStates} buttonPreviewClass={buttonPreviewClass} />}{fase === 2 && <FaseAcessibilidade erroToque={erroToque} tocarMicroBotao={tocarMicroBotao} />}</motion.div></AnimatePresence></motion.section><div className="grid grid-cols-2 gap-3"><motion.button whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} onClick={() => setFase(Math.max(0, fase - 1))} className="rounded-3xl border border-white/40 bg-white/25 px-6 py-4 font-bold backdrop-blur-2xl">Voltar</motion.button><motion.button whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} disabled={!podeAvancar} onClick={fase === 2 ? finalizarAula : () => setFase(Math.min(2, fase + 1))} className={`rounded-3xl px-6 py-4 font-extrabold tracking-tight ${podeAvancar ? 'bg-black text-white shadow-[0_22px_70px_rgba(0,0,0,0.25)]' : 'bg-white/25 text-black/25'}`}>{fase === 2 ? 'Finalizar' : 'Avançar'}</motion.button></div></div>
}

function LiquidChoice({ selected, children, onClick, dark }) {
  return <motion.button whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} onClick={onClick} className={`relative overflow-hidden rounded-3xl px-5 py-4 text-left font-extrabold ${dark ? 'bg-black text-white' : 'bg-white/35 text-black'} border border-white/40 backdrop-blur-xl`}>{selected && <motion.span layoutId="liquidChoiceBubble" transition={liquid} className="absolute right-3 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-cyan-300/80 shadow-[0_0_40px_rgba(34,211,238,0.5)]" />}<span className="relative">{children}</span></motion.button>
}

function FaseContraste({ contrasteOk, setContrasteOk }) {
  return <div><p className="text-xs font-black uppercase tracking-[0.24em] text-black/35">Fase 0</p><h2 className="mt-4 text-5xl font-extrabold leading-[0.9] tracking-tighter">Contraste que parece caro.</h2><p className="mt-4 text-sm leading-7 text-black/50">Escolha a opção legível. A bolha líquida acompanha sua escolha.</p><div className="mt-8 grid gap-3"><LiquidChoice selected={!contrasteOk} onClick={() => setContrasteOk(false)}>Get Early Access</LiquidChoice><LiquidChoice selected={contrasteOk} onClick={() => setContrasteOk(true)} dark>Get Early Access</LiquidChoice></div>{contrasteOk && <p className="mt-5 flex items-center gap-2 text-sm font-bold text-cyan-950/70"><Check size={16} /> Legibilidade aprovada.</p>}</div>
}

function FaseSandbox({ states, setStates, buttonPreviewClass }) {
  return <div><p className="text-xs font-black uppercase tracking-[0.24em] text-black/35">Fase 1</p><h2 className="mt-4 text-5xl font-extrabold leading-[0.9] tracking-tighter">Estados com peso físico.</h2><p className="mt-4 text-sm leading-7 text-black/50">A bolha desliza nos switches como água dentro de vidro.</p><div className="my-10 grid place-items-center rounded-3xl border border-white/40 bg-white/25 p-8 backdrop-blur-xl"><motion.button layout transition={spring} className={buttonPreviewClass}>Botão Premium</motion.button></div><div className="space-y-3">{['hover', 'active', 'disabled'].map((key) => <Switch key={key} label={key} value={states[key]} onClick={() => setStates({ ...states, [key]: !states[key] })} />)}</div></div>
}

function Switch({ label, value, onClick }) {
  return <motion.button whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} onClick={onClick} className="flex w-full items-center justify-between rounded-3xl border border-white/40 bg-white/25 p-4 backdrop-blur-xl"><span className="font-extrabold capitalize tracking-tight">{label}</span><span className="relative h-8 w-14 overflow-hidden rounded-full border border-white/40 bg-white/30"><motion.span layout transition={liquid} className={`absolute top-1 h-6 w-6 rounded-full bg-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.55)] ${value ? 'left-7' : 'left-1'}`} /></span></motion.button>
}

function FaseAcessibilidade({ erroToque, tocarMicroBotao }) {
  return <div><p className="text-xs font-black uppercase tracking-[0.24em] text-black/35">Fase 2</p><h2 className="mt-4 text-5xl font-extrabold leading-[0.9] tracking-tighter">Toque mobile sem fricção.</h2><p className="mt-4 text-sm leading-7 text-black/50">O micro botão vira uma bolha acessível de 44px.</p><div className="mt-10 grid place-items-center rounded-3xl border border-white/40 bg-white/25 p-10 backdrop-blur-xl"><motion.button layout whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={liquid} onClick={tocarMicroBotao} className={`grid place-items-center font-extrabold ${erroToque ? 'h-11 w-11 rounded-full bg-cyan-300 text-black shadow-[0_0_50px_rgba(34,211,238,0.55)]' : 'h-5 w-5 rounded-full bg-black/20 text-[10px] text-black/35'}`}><MousePointer2 size={erroToque ? 18 : 10} /></motion.button></div>{erroToque && <p className="mt-5 text-sm font-bold leading-6 text-cyan-950/70">Corrigido para 44x44px com transição elástica.</p>}</div>
}
