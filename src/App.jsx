import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ChevronRight, Crown, Heart, Home, Layers3, MousePointer2, Play, Sparkles, Trophy, Wand2, Zap } from 'lucide-react'
import { supabase } from './lib/supabase'

const spring = { type: 'spring', stiffness: 320, damping: 32 }
const liquid = { type: 'spring', stiffness: 240, damping: 24 }
const glass = 'bg-white/[0.16] border border-white/[0.28] backdrop-blur-xl rounded-3xl p-6 shadow-[0_22px_70px_rgba(0,0,0,0.14)]'

const lessons = [
  { title: 'Contraste que vende', tag: 'UI', time: '4 min', desc: 'Escolha entre CTA fraco e CTA vendável.' },
  { title: 'Estados táteis', tag: 'Motion', time: '6 min', desc: 'Monte hover, active e disabled ao vivo.' },
  { title: 'Toque mobile 44px', tag: 'UX', time: '5 min', desc: 'Sinta o erro de um alvo pequeno e corrija.' },
  { title: 'Proposta de R$ 1.200', tag: 'Money', time: '8 min', desc: 'Transforme detalhe visual em argumento comercial.' },
]

const projects = [
  { title: 'Landing premium', value: 'R$ 1.200', desc: 'Hero, CTA, prova social e oferta para cliente local.' },
  { title: 'Página Bio Pro', value: 'R$ 450', desc: 'Cartão digital, links, oferta e captura de contato.' },
  { title: 'Mini app visual', value: 'R$ 2.500', desc: 'Dashboard mobile-first com experiência de produto real.' },
]

const prompts = [
  'Crie um botão CTA premium com estado hover, active e disabled.',
  'Transforme esta landing em uma proposta de R$ 1.200 para cliente local.',
  'Liste 5 melhorias de UX para aumentar cliques no botão principal.',
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
  const [promptAtivo, setPromptAtivo] = useState(0)

  const progresso = ((fase + 1) / 4) * 100

  const buttonPreviewClass = useMemo(() => {
    const classes = ['rounded-[1.35rem] px-8 py-4 font-extrabold tracking-tight bg-white text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-14px_28px_rgba(0,0,0,0.10),0_18px_45px_rgba(255,255,255,0.20)]']
    if (states.hover) classes.push('shadow-[0_0_45px_rgba(20,184,166,0.42)] ring-1 ring-cyan-100/70 -translate-y-1')
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
    <main className="relative min-h-screen overflow-hidden bg-[#eafff4] text-[#071011]">
      <CinematicBackground />
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
        <section className="flex-1">
          <motion.div key={abaAtiva} initial={{ opacity: 0.8, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={spring} className="w-full">
            {abaAtiva === 'home' ? <HomeScreen xp={xp} vidas={vidas} streak={streak} openLesson={() => setAbaAtiva('licao')} promptAtivo={promptAtivo} setPromptAtivo={setPromptAtivo} /> : <LessonScreen fase={fase} setFase={setFase} progresso={progresso} contrasteOk={contrasteOk} setContrasteOk={setContrasteOk} states={states} setStates={setStates} buttonPreviewClass={buttonPreviewClass} erroToque={erroToque} tocarMicroBotao={tocarMicroBotao} finalizarAula={finalizarAula} />}
          </motion.div>
        </section>
        <nav className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-24px)] max-w-md -translate-x-1/2 items-center justify-between rounded-[2rem] border border-white/35 bg-white/25 p-2 shadow-[0_18px_55px_rgba(0,0,0,0.18)] backdrop-blur-xl">
          <TabButton active={abaAtiva === 'home'} icon={<Home size={17} />} label="Home" onClick={() => setAbaAtiva('home')} />
          <TabButton active={abaAtiva === 'licao'} icon={<Layers3 size={17} />} label="Aula" onClick={() => setAbaAtiva('licao')} />
        </nav>
      </div>
    </main>
  )
}

function CinematicBackground() {
  return <><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(45,212,191,0.48),transparent_34%),radial-gradient(circle_at_100%_8%,rgba(168,85,247,0.28),transparent_27%),linear-gradient(180deg,#fffefa_0%,#c8f8e5_34%,#f4fff7_60%,#111414_100%)]" /><div className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-multiply bg-[repeating-linear-gradient(0deg,#000_0px,#000_1px,transparent_1px,transparent_4px)]" /><div className="pointer-events-none absolute left-[-80px] top-[-90px] h-72 w-72 rounded-full bg-cyan-300/28 blur-[95px]" /><div className="pointer-events-none absolute bottom-40 right-[-110px] h-72 w-72 rounded-full bg-purple-500/25 blur-[95px]" /><div className="pointer-events-none absolute right-4 top-32 h-24 w-24 rounded-[2rem] border border-white/30 bg-white/16 backdrop-blur-xl" /><div className="pointer-events-none absolute left-5 top-[38rem] h-16 w-16 rounded-full border border-cyan-200/35 bg-cyan-200/16" /></>
}

function TabButton({ active, icon, label, onClick }) {
  return <motion.button whileTap={{ scale: 0.95 }} transition={spring} onClick={onClick} className="relative flex flex-1 items-center justify-center gap-2 rounded-3xl px-4 py-3 text-sm font-black text-black/70">{active && <motion.span layoutId="activeTabBackground" transition={liquid} className="absolute inset-0 rounded-3xl bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_14px_38px_rgba(0,0,0,0.15)]" />}<span className="relative">{icon}</span><span className="relative tracking-tight">{label}</span></motion.button>
}

function StatusPill({ icon, value }) {
  return <div className="rounded-2xl border border-white/35 bg-white/25 px-3 py-2 text-white shadow-[0_10px_30px_rgba(0,0,0,0.14)] backdrop-blur-xl"><div className="flex items-center gap-1.5 text-sm font-black">{icon}{value}</div></div>
}

function HomeScreen({ xp, vidas, streak, openLesson, promptAtivo, setPromptAtivo }) {
  return <div className="space-y-5"><HeroCard openLesson={openLesson} /><div className="grid grid-cols-3 gap-3"><Metric label="Streak" value={streak} /><Metric label="XP" value={xp} /><Metric label="Vidas" value={vidas} /></div><InterfacePreview /><MiniVideoCard /><PromptMachine promptAtivo={promptAtivo} setPromptAtivo={setPromptAtivo} /><SectionTitle title="Trilha de hoje" subtitle="Aulas curtas com resultado visual" /> <div className="space-y-3">{lessons.map((lesson, index) => <motion.button key={lesson.title} whileTap={{ scale: 0.97 }} transition={spring} onClick={index === 0 ? openLesson : undefined} className={`${glass} flex w-full items-center justify-between text-left`}><div><div className="flex items-center gap-2"><span className="rounded-full border border-black/10 bg-white/45 px-2 py-1 text-[10px] font-black text-black/45">{lesson.tag}</span><span className="text-xs text-black/35">{lesson.time}</span></div><h3 className="mt-3 text-xl font-extrabold tracking-tighter">{lesson.title}</h3><p className="mt-1 text-sm text-black/42">{lesson.desc}</p></div><ChevronRight className="text-black/35" /></motion.button>)}</div><SectionTitle title="Renda digital" subtitle="Transforme aula em proposta" /><div className="grid gap-3">{projects.map((project) => <article key={project.title} className={`${glass}`}><div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.24em] text-black/35">Projeto</p><h3 className="mt-2 text-2xl font-extrabold tracking-tighter">{project.title}</h3><p className="mt-2 text-sm leading-6 text-black/45">{project.desc}</p></div><div className="rounded-2xl border border-emerald-600/10 bg-emerald-300/30 px-3 py-2 text-sm font-extrabold text-emerald-950">{project.value}</div></div></article>)}</div><AchievementStrip /></div>
}

function HeroCard({ openLesson }) {
  return <motion.button whileTap={{ scale: 0.97 }} transition={spring} onClick={openLesson} className="relative w-full overflow-hidden rounded-[2.6rem] border border-white/50 bg-white/32 p-6 text-left shadow-[0_30px_95px_rgba(0,0,0,0.18)] backdrop-blur-xl"><div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-300/35 blur-[65px]" /><div className="absolute left-8 top-36 h-32 w-32 rounded-full bg-purple-400/18 blur-[55px]" /><div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-black/70 via-black/18 to-transparent" /><div className="relative min-h-[430px]"><div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/35 px-3 py-1.5 text-xs font-bold text-black/55 backdrop-blur-xl"><Crown size={13} /> Signature Series</div><h2 className="max-w-xs text-6xl font-extrabold leading-[0.82] tracking-tighter text-black">Botões que parecem produto caro.</h2><PremiumKeys /><div className="absolute right-3 top-10 h-12 w-12 rounded-full bg-cyan-300/80 shadow-[0_0_45px_rgba(34,211,238,0.55)]" /><div className="absolute bottom-0 left-0 right-0 text-white"><p className="max-w-xs text-sm leading-7 text-white/72">Aprenda a criar CTA com presença, contraste, estados e toque mobile.</p><div className="mt-5 flex items-center gap-3"><span className="rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-black shadow-[0_14px_36px_rgba(255,255,255,0.22)]">Começar aula</span><span className="text-sm font-bold text-white/55">+15 XP</span></div></div></div></motion.button>
}

function PremiumKeys() {
  return <div className="absolute right-0 top-28 grid rotate-[-8deg] grid-cols-2 gap-2"><div className="h-20 w-20 rounded-[1.4rem] border border-white/50 bg-black/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-16px_28px_rgba(0,0,0,0.46),0_18px_42px_rgba(0,0,0,0.25)]" /><div className="h-20 w-20 rounded-[1.4rem] border border-orange-200/30 bg-orange-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-16px_30px_rgba(120,0,0,0.38),0_18px_45px_rgba(249,115,22,0.28)]" /><div className="h-20 w-20 rounded-[1.4rem] border border-white/50 bg-black/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-16px_28px_rgba(0,0,0,0.46),0_18px_42px_rgba(0,0,0,0.25)]" /><div className="h-20 w-20 rounded-[1.4rem] border border-cyan-200/30 bg-cyan-500/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-16px_30px_rgba(0,50,70,0.38),0_18px_45px_rgba(34,211,238,0.28)]" /></div>
}

function InterfacePreview() {
  return <article className="relative overflow-hidden rounded-[2rem] border border-white/45 bg-white/30 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.14)] backdrop-blur-xl"><div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.24),transparent_30%),radial-gradient(circle_at_20%_0%,rgba(147,51,234,0.13),transparent_34%)]" /><div className="relative rounded-[1.5rem] border border-white/20 bg-black/72 p-4 text-white"><div className="mb-8 flex items-center justify-between"><div className="h-8 w-8 rounded-xl bg-white/10" /><div className="flex gap-2 text-[10px] text-white/35"><span>Design</span><span>Code</span><span>Sell</span></div></div><p className="text-xs uppercase tracking-[0.24em] text-cyan-100/45">Portfolio UI</p><h3 className="mt-2 text-4xl font-extrabold leading-[0.9] tracking-tighter">From lesson to client-ready interface.</h3><div className="mt-7 grid grid-cols-2 gap-3"><div className="h-20 rounded-2xl border border-white/[0.08] bg-white/[0.05]" /><div className="h-20 rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.10]" /></div></div></article>
}

function MiniVideoCard() {
  return <article className="relative overflow-hidden rounded-[2rem] border border-white/45 bg-black p-4 text-white shadow-[0_24px_75px_rgba(0,0,0,0.20)]"><div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.22),transparent_24%),radial-gradient(circle_at_90%_20%,rgba(249,115,22,0.18),transparent_22%),linear-gradient(135deg,#050505,#132927,#0b0b0d)]" /><div className="relative min-h-[190px] rounded-[1.5rem] border border-white/10 p-5"><div className="flex items-center justify-between"><p className="text-xs uppercase tracking-[0.24em] text-white/45">Mini vídeo</p><div className="grid h-10 w-10 place-items-center rounded-full bg-white text-black"><Play size={16} fill="currentColor" /></div></div><div className="mt-10 h-16 w-28 rounded-3xl bg-white/12 backdrop-blur-xl" /><h3 className="mt-5 text-3xl font-extrabold tracking-tighter">Veja o antes e depois do CTA.</h3></div></article>
}

function PromptMachine({ promptAtivo, setPromptAtivo }) {
  return <article className={`${glass}`}><div className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-[0.24em] text-black/35">Prompt Lab</p><h3 className="mt-2 text-2xl font-extrabold tracking-tighter">Copie, pratique, venda.</h3></div><Wand2 className="text-black/45" /></div><div className="relative mt-5 rounded-[1.4rem] border border-white/45 bg-white/30 p-4 backdrop-blur-xl"><p className="text-sm font-bold leading-7 text-black/60">{prompts[promptAtivo]}</p></div><div className="mt-4 grid grid-cols-3 gap-2">{prompts.map((_, index) => <motion.button key={index} whileTap={{ scale: 0.95 }} transition={liquid} onClick={() => setPromptAtivo(index)} className="relative h-10 rounded-2xl border border-white/40 bg-white/30">{promptAtivo === index && <motion.span layoutId="promptLiquid" transition={liquid} className="absolute inset-1 rounded-2xl bg-cyan-300/80 shadow-[0_0_26px_rgba(34,211,238,0.45)]" />}</motion.button>)}</div></article>
}

function AchievementStrip() {
  return <div className="grid grid-cols-2 gap-3 pb-3"><article className={`${glass}`}><Trophy className="text-orange-500" /><h3 className="mt-4 text-2xl font-extrabold tracking-tighter">Level 01</h3><p className="mt-1 text-sm text-black/45">Designer que entrega.</p></article><article className={`${glass}`}><Sparkles className="text-cyan-600" /><h3 className="mt-4 text-2xl font-extrabold tracking-tighter">3 assets</h3><p className="mt-1 text-sm text-black/45">Para portfólio.</p></article></div>
}

function SectionTitle({ title, subtitle }) {
  return <div className="pt-1"><h2 className="text-2xl font-extrabold tracking-tighter text-black">{title}</h2><p className="mt-1 text-sm text-black/45">{subtitle}</p></div>
}

function Metric({ label, value }) {
  return <article className="rounded-3xl border border-white/45 bg-white/30 p-4 shadow-[0_14px_45px_rgba(0,0,0,0.10)] backdrop-blur-xl"><p className="text-xs text-black/45">{label}</p><h3 className="mt-2 text-3xl font-extrabold tracking-tighter text-black">{value}</h3></article>
}

function LessonScreen({ fase, setFase, progresso, contrasteOk, setContrasteOk, states, setStates, buttonPreviewClass, erroToque, tocarMicroBotao, finalizarAula }) {
  const podeAvancar = fase !== 0 || contrasteOk
  return <div className="space-y-4 text-black"><div className="h-1.5 overflow-hidden rounded-full bg-black/10"><motion.div animate={{ width: `${progresso}%` }} transition={liquid} className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-400" /></div><section className="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-white/45 bg-white/34 p-6 shadow-[0_24px_85px_rgba(0,0,0,0.15)] backdrop-blur-xl"><div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-300/18 blur-[55px]" /><motion.div key={fase} initial={{ opacity: 0.7, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={spring}>{fase === 0 && <FaseContraste contrasteOk={contrasteOk} setContrasteOk={setContrasteOk} />}{fase === 1 && <FaseSandbox states={states} setStates={setStates} buttonPreviewClass={buttonPreviewClass} />}{fase === 2 && <FaseAcessibilidade erroToque={erroToque} tocarMicroBotao={tocarMicroBotao} />}{fase === 3 && <FaseEntrega />}</motion.div></section><div className="grid grid-cols-2 gap-3"><motion.button whileTap={{ scale: 0.95 }} transition={spring} onClick={() => setFase(Math.max(0, fase - 1))} className="rounded-3xl border border-white/45 bg-white/30 px-6 py-4 font-bold backdrop-blur-xl">Voltar</motion.button><motion.button whileTap={{ scale: 0.95 }} transition={spring} disabled={!podeAvancar} onClick={fase === 3 ? finalizarAula : () => setFase(Math.min(3, fase + 1))} className={`rounded-3xl px-6 py-4 font-extrabold tracking-tight ${podeAvancar ? 'bg-black text-white shadow-[0_18px_48px_rgba(0,0,0,0.22)]' : 'bg-white/25 text-black/25'}`}>{fase === 3 ? 'Finalizar' : 'Avançar'}</motion.button></div></div>
}

function LiquidChoice({ selected, children, onClick, dark }) {
  return <motion.button whileTap={{ scale: 0.95 }} transition={spring} onClick={onClick} className={`relative overflow-hidden rounded-3xl px-5 py-4 text-left font-extrabold ${dark ? 'bg-black text-white' : 'bg-white/40 text-black'} border border-white/45 backdrop-blur-xl`}>{selected && <motion.span layoutId="liquidChoiceBubble" transition={liquid} className="absolute right-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-cyan-300/90 shadow-[0_0_32px_rgba(34,211,238,0.52)]" />}<span className="relative">{children}</span></motion.button>
}

function FaseContraste({ contrasteOk, setContrasteOk }) {
  return <div><p className="text-xs font-black uppercase tracking-[0.24em] text-black/35">Fase 0</p><h2 className="mt-4 text-5xl font-extrabold leading-[0.9] tracking-tighter">Contraste que parece caro.</h2><p className="mt-4 text-sm leading-7 text-black/50">Escolha a opção legível. A bolha líquida acompanha sua escolha.</p><div className="mt-8 grid gap-3"><LiquidChoice selected={!contrasteOk} onClick={() => setContrasteOk(false)}>Get Early Access</LiquidChoice><LiquidChoice selected={contrasteOk} onClick={() => setContrasteOk(true)} dark>Get Early Access</LiquidChoice></div>{contrasteOk && <p className="mt-5 flex items-center gap-2 text-sm font-bold text-cyan-950/70"><Check size={16} /> Legibilidade aprovada.</p>}<MicroLesson title="Por que isso importa?" text="O cliente não compra decoração: ele compra clareza para o usuário clicar sem pensar." /></div>
}

function FaseSandbox({ states, setStates, buttonPreviewClass }) {
  return <div><p className="text-xs font-black uppercase tracking-[0.24em] text-black/35">Fase 1</p><h2 className="mt-4 text-5xl font-extrabold leading-[0.9] tracking-tighter">Estados com peso físico.</h2><p className="mt-4 text-sm leading-7 text-black/50">A bolha desliza nos switches como água dentro de vidro.</p><div className="my-10 grid place-items-center rounded-3xl border border-white/45 bg-white/30 p-8 backdrop-blur-xl"><motion.button layout transition={spring} className={buttonPreviewClass}>Botão Premium</motion.button></div><div className="space-y-3">{['hover', 'active', 'disabled'].map((key) => <Switch key={key} label={key} value={states[key]} onClick={() => setStates({ ...states, [key]: !states[key] })} />)}</div><MicroLesson title="Regra de produto" text="Todo clique precisa responder. Sem resposta visual, o usuário acha que o app travou." /></div>
}

function Switch({ label, value, onClick }) {
  return <motion.button whileTap={{ scale: 0.95 }} transition={spring} onClick={onClick} className="flex w-full items-center justify-between rounded-3xl border border-white/45 bg-white/30 p-4 backdrop-blur-xl"><span className="font-extrabold capitalize tracking-tight">{label}</span><span className="relative h-8 w-14 overflow-hidden rounded-full border border-white/45 bg-white/35"><motion.span layout transition={liquid} className={`absolute top-1 h-6 w-6 rounded-full bg-cyan-300 shadow-[0_0_26px_rgba(34,211,238,0.52)] ${value ? 'left-7' : 'left-1'}`} /></span></motion.button>
}

function FaseAcessibilidade({ erroToque, tocarMicroBotao }) {
  return <div><p className="text-xs font-black uppercase tracking-[0.24em] text-black/35">Fase 2</p><h2 className="mt-4 text-5xl font-extrabold leading-[0.9] tracking-tighter">Toque mobile sem fricção.</h2><p className="mt-4 text-sm leading-7 text-black/50">O micro botão vira uma bolha acessível de 44px.</p><div className="mt-10 grid place-items-center rounded-3xl border border-white/45 bg-white/30 p-10 backdrop-blur-xl"><motion.button layout whileTap={{ scale: 0.95 }} transition={liquid} onClick={tocarMicroBotao} className={`grid place-items-center font-extrabold ${erroToque ? 'h-11 w-11 rounded-full bg-cyan-300 text-black shadow-[0_0_38px_rgba(34,211,238,0.55)]' : 'h-5 w-5 rounded-full bg-black/20 text-[10px] text-black/35'}`}><MousePointer2 size={erroToque ? 18 : 10} /></motion.button></div>{erroToque && <p className="mt-5 text-sm font-bold leading-6 text-cyan-950/70">Corrigido para 44x44px com transição elástica.</p>}<MicroLesson title="Venda isso no projeto" text="Acessibilidade vira argumento comercial: menos erro, mais confiança e experiência mais profissional." /></div>
}

function FaseEntrega() {
  return <div><p className="text-xs font-black uppercase tracking-[0.24em] text-black/35">Fase 3</p><h2 className="mt-4 text-5xl font-extrabold leading-[0.9] tracking-tighter">Agora isso vira dinheiro.</h2><p className="mt-4 text-sm leading-7 text-black/50">Você acabou de transformar detalhes visuais em argumento de proposta: clareza, confiança e menos fricção.</p><div className="mt-8 grid gap-3"><div className="rounded-3xl border border-white/45 bg-white/35 p-5 backdrop-blur-xl"><p className="text-xs uppercase tracking-[0.24em] text-black/35">Oferta</p><h3 className="mt-2 text-3xl font-extrabold tracking-tighter">Landing premium</h3><p className="mt-2 text-sm text-black/45">Valor sugerido: R$ 1.200</p></div><div className="rounded-3xl bg-black p-5 text-white"><p className="text-xs uppercase tracking-[0.24em] text-white/35">Recompensa</p><h3 className="mt-2 text-3xl font-extrabold tracking-tighter">+15 XP</h3></div></div></div>
}

function MicroLesson({ title, text }) {
  return <div className="mt-6 rounded-3xl border border-white/45 bg-white/30 p-4 backdrop-blur-xl"><p className="text-xs font-black uppercase tracking-[0.22em] text-black/35">{title}</p><p className="mt-2 text-sm font-semibold leading-6 text-black/55">{text}</p></div>
}
