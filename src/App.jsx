import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronRight, Crown, Heart, Home, Layers3, MousePointer2, Sparkles, Zap } from 'lucide-react'
import { supabase } from './lib/supabase'

const spring = { type: 'spring', stiffness: 350, damping: 28 }
const glass = 'bg-white/[0.01] border border-white/[0.05] backdrop-blur-xl rounded-3xl p-6'

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
    const classes = ['rounded-2xl px-7 py-4 font-extrabold tracking-tight bg-white text-black']
    if (states.hover) classes.push('shadow-[0_0_60px_rgba(168,85,247,0.40)] ring-1 ring-purple-300/40 -translate-y-1')
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
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_24%,rgba(0,0,0,0.65))]" />

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col px-4 pb-28 pt-6">
        <header className="mb-7 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/35">CodeBloom</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tighter">Visual Academy</h1>
          </div>
          <div className="flex items-center gap-2">
            <StatusPill icon={<Heart size={15} className="text-rose-300" />} value={vidas} />
            <StatusPill icon={<Zap size={15} className="text-cyan-300" />} value={xp} />
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

        <nav className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-24px)] max-w-md -translate-x-1/2 items-center justify-between rounded-3xl border border-white/[0.06] bg-black/60 p-2 backdrop-blur-2xl">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const active = abaAtiva === tab.id
            return <motion.button key={tab.id} whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} onClick={() => setAbaAtiva(tab.id)} className="relative flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-white/70">{active && <motion.span layoutId="activeTabBackground" transition={spring} className="absolute inset-0 rounded-2xl bg-purple-600/20" />}<Icon size={17} className="relative" /><span className="relative tracking-tight">{tab.label}</span></motion.button>
          })}
        </nav>
      </div>
    </main>
  )
}

function StatusPill({ icon, value }) {
  return <motion.div whileHover={{ y: -2 }} transition={spring} className="rounded-2xl border border-white/[0.06] bg-white/[0.015] px-3 py-2 backdrop-blur-xl"><div className="flex items-center gap-1.5 text-sm font-bold">{icon}{value}</div></motion.div>
}

function HomeScreen({ xp, vidas, streak, openLesson }) {
  return <div className="space-y-5"><HeroCard openLesson={openLesson} /><div className="grid grid-cols-3 gap-3"><Metric label="Streak" value={streak} /><Metric label="XP" value={xp} /><Metric label="Vidas" value={vidas} /></div><InterfacePreview /><SectionTitle title="Trilha de hoje" subtitle="Aulas curtas com resultado visual" /> <div className="space-y-3">{lessons.map((lesson, index) => <motion.button key={lesson.title} whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} onClick={index === 0 ? openLesson : undefined} className={`${glass} flex w-full items-center justify-between text-left`}><div><div className="flex items-center gap-2"><span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[10px] font-bold text-white/45">{lesson.tag}</span><span className="text-xs text-white/30">{lesson.time}</span></div><h3 className="mt-3 text-xl font-extrabold tracking-tighter">{lesson.title}</h3></div><ChevronRight className="text-white/35" /></motion.button>)}</div><SectionTitle title="Renda digital" subtitle="Transforme aula em proposta" /><div className="grid gap-3">{projects.map((project) => <motion.article key={project.title} whileHover={{ y: -2 }} transition={spring} className={`${glass}`}><div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.24em] text-purple-200/45">Projeto</p><h3 className="mt-2 text-2xl font-extrabold tracking-tighter">{project.title}</h3><p className="mt-2 text-sm leading-6 text-white/42">{project.desc}</p></div><div className="rounded-2xl border border-emerald-300/10 bg-emerald-300/[0.06] px-3 py-2 text-sm font-extrabold text-emerald-200">{project.value}</div></div></motion.article>)}</div></div>
}

function HeroCard({ openLesson }) {
  return <motion.button whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} onClick={openLesson} className={`${glass} relative w-full overflow-hidden text-left`}><div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-600/10 blur-[80px]" /><div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-purple-600/10 to-transparent" /><div className="relative"><div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs text-white/55"><Crown size={13} /> Design System Lab</div><h2 className="text-6xl font-extrabold leading-[0.82] tracking-tighter">Botões que parecem caros.</h2><p className="mt-5 max-w-xs text-sm leading-7 text-white/48">Aprenda a criar CTA com presença, contraste, estados e toque mobile.</p><div className="mt-7 flex items-center gap-3"><span className="rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-black">Começar aula</span><span className="text-sm font-bold text-white/35">+15 XP</span></div></div></motion.button>
}

function InterfacePreview() {
  return <motion.article whileHover={{ y: -2 }} transition={spring} className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.015] p-4 backdrop-blur-xl"><div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.13),transparent_30%),radial-gradient(circle_at_20%_0%,rgba(147,51,234,0.12),transparent_34%)]" /><div className="relative rounded-[1.5rem] border border-white/[0.06] bg-black/45 p-4"><div className="mb-8 flex items-center justify-between"><div className="h-8 w-8 rounded-xl bg-white/10" /><div className="flex gap-2 text-[10px] text-white/35"><span>Design</span><span>Code</span><span>Sell</span></div></div><p className="text-xs uppercase tracking-[0.24em] text-cyan-100/45">Portfolio UI</p><h3 className="mt-2 text-4xl font-extrabold leading-[0.9] tracking-tighter">From lesson to client-ready interface.</h3><div className="mt-7 grid grid-cols-2 gap-3"><div className="h-20 rounded-2xl border border-white/[0.06] bg-white/[0.03]" /><div className="h-20 rounded-2xl border border-purple-300/10 bg-purple-300/[0.06]" /></div></div></motion.article>
}

function SectionTitle({ title, subtitle }) {
  return <div className="pt-1"><h2 className="text-2xl font-extrabold tracking-tighter">{title}</h2><p className="mt-1 text-sm text-white/35">{subtitle}</p></div>
}

function Metric({ label, value }) {
  return <motion.article whileHover={{ y: -2 }} transition={spring} className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-4 backdrop-blur-xl"><p className="text-xs text-white/35">{label}</p><h3 className="mt-2 text-3xl font-extrabold tracking-tighter">{value}</h3></motion.article>
}

function LessonScreen({ fase, setFase, progresso, contrasteOk, setContrasteOk, states, setStates, buttonPreviewClass, erroToque, tocarMicroBotao, finalizarAula }) {
  const podeAvancar = fase !== 0 || contrasteOk
  return <div className="space-y-4"><div className="h-1.5 overflow-hidden rounded-full bg-white/[0.04]"><motion.div animate={{ width: `${progresso}%` }} transition={spring} className="h-full rounded-full bg-gradient-to-r from-purple-400 to-cyan-300" /></div><motion.section layout transition={spring} className={`${glass} min-h-[560px]`}><AnimatePresence mode="wait"><motion.div key={fase} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={spring}>{fase === 0 && <FaseContraste contrasteOk={contrasteOk} setContrasteOk={setContrasteOk} />}{fase === 1 && <FaseSandbox states={states} setStates={setStates} buttonPreviewClass={buttonPreviewClass} />}{fase === 2 && <FaseAcessibilidade erroToque={erroToque} tocarMicroBotao={tocarMicroBotao} />}</motion.div></AnimatePresence></motion.section><div className="grid grid-cols-2 gap-3"><motion.button whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} onClick={() => setFase(Math.max(0, fase - 1))} className={`${glass} py-4 font-bold`}>Voltar</motion.button><motion.button whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} disabled={!podeAvancar} onClick={fase === 2 ? finalizarAula : () => setFase(Math.min(2, fase + 1))} className={`rounded-3xl px-6 py-4 font-extrabold tracking-tight ${podeAvancar ? 'bg-white text-black' : 'bg-white/[0.04] text-white/25'}`}>{fase === 2 ? 'Finalizar' : 'Avançar'}</motion.button></div></div>
}

function FaseContraste({ contrasteOk, setContrasteOk }) {
  return <div><p className="text-xs font-medium uppercase tracking-[0.24em] text-purple-200/55">Fase 0</p><h2 className="mt-4 text-5xl font-extrabold leading-[0.9] tracking-tighter">Contraste que parece caro.</h2><p className="mt-4 text-sm leading-7 text-white/45">Cliente não compra botão bonito. Compra clareza, confiança e ação sem dúvida.</p><div className="mt-8 grid gap-3"><motion.button whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} onClick={() => setContrasteOk(false)} className="rounded-3xl bg-[#120f18] px-5 py-4 font-extrabold text-[#2b2237]">Get Early Access</motion.button><motion.button whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} onClick={() => setContrasteOk(true)} className={`rounded-3xl bg-white px-5 py-4 font-extrabold text-black ${contrasteOk ? 'shadow-[0_0_60px_rgba(168,85,247,0.32)] ring-1 ring-purple-300/40' : ''}`}>Get Early Access</motion.button></div>{contrasteOk && <p className="mt-5 flex items-center gap-2 text-sm text-cyan-100/70"><Check size={16} /> Legibilidade aprovada.</p>}</div>
}

function FaseSandbox({ states, setStates, buttonPreviewClass }) {
  return <div><p className="text-xs font-medium uppercase tracking-[0.24em] text-purple-200/55">Fase 1</p><h2 className="mt-4 text-5xl font-extrabold leading-[0.9] tracking-tighter">Estados com peso físico.</h2><p className="mt-4 text-sm leading-7 text-white/45">Um app premium responde como objeto real: acende, pressiona e silencia.</p><div className="my-10 grid place-items-center rounded-3xl border border-white/[0.05] bg-black/30 p-8"><motion.button layout transition={spring} className={buttonPreviewClass}>Botão Premium</motion.button></div><div className="space-y-3">{['hover', 'active', 'disabled'].map((key) => <Switch key={key} label={key} value={states[key]} onClick={() => setStates({ ...states, [key]: !states[key] })} />)}</div></div>
}

function Switch({ label, value, onClick }) {
  return <motion.button whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} onClick={onClick} className="flex w-full items-center justify-between rounded-3xl border border-white/[0.05] bg-white/[0.01] p-4 backdrop-blur-xl"><span className="font-bold capitalize tracking-tight">{label}</span><span className={`relative h-7 w-12 rounded-full ${value ? 'bg-purple-500/50' : 'bg-white/[0.06]'}`}><motion.span layout transition={spring} className={`absolute top-1 h-5 w-5 rounded-full bg-white ${value ? 'left-6' : 'left-1'}`} /></span></motion.button>
}

function FaseAcessibilidade({ erroToque, tocarMicroBotao }) {
  return <div><p className="text-xs font-medium uppercase tracking-[0.24em] text-purple-200/55">Fase 2</p><h2 className="mt-4 text-5xl font-extrabold leading-[0.9] tracking-tighter">Toque mobile sem fricção.</h2><p className="mt-4 text-sm leading-7 text-white/45">Bonito não basta. O polegar precisa acertar sem pensar.</p><div className="mt-10 grid place-items-center rounded-3xl border border-white/[0.05] bg-black/30 p-10"><motion.button layout whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} transition={spring} onClick={tocarMicroBotao} className={`grid place-items-center font-extrabold ${erroToque ? 'h-11 w-11 rounded-2xl bg-white text-black' : 'h-5 w-5 rounded-lg bg-white/[0.05] text-[10px] text-white/35'}`}><MousePointer2 size={erroToque ? 18 : 10} /></motion.button></div>{erroToque && <p className="mt-5 text-sm leading-6 text-cyan-100/70">Corrigido para 44x44px com transição elástica.</p>}</div>
}
