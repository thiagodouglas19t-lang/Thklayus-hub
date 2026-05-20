import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, Brain, Flame, Heart, Home, Sparkles, Target, User2, Zap } from 'lucide-react'
import { supabase } from './lib/supabase'

const glass = 'bg-white/[0.02] border border-white/[0.06] backdrop-blur-md rounded-3xl'
const spring = { type: 'spring', stiffness: 300, damping: 30 }

function NavButton({ icon, label, active, onClick }) {
  return (
    <motion.button whileTap={{ scale: 0.92 }} transition={spring} onClick={onClick} className={`flex flex-col items-center gap-1 rounded-2xl px-4 py-2 ${active ? 'bg-white/[0.06]' : ''}`}>
      {icon}
      <span className="text-[10px] font-bold tracking-tight">{label}</span>
    </motion.button>
  )
}

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('home')
  const [xp, setXp] = useState(0)
  const [vidas, setVidas] = useState(5)
  const [streak, setStreak] = useState(0)
  const [meta, setMeta] = useState(150)
  const [user, setUser] = useState(null)
  const [revelado, setRevelado] = useState(false)

  useEffect(() => {
    carregarPerfil()
  }, [])

  async function carregarPerfil() {
    const { data: auth } = await supabase.auth.getUser()
    if (!auth.user) return

    setUser(auth.user)

    const { data } = await supabase.from('profiles').select('xp, vidas, streak, meta_semanal').eq('id', auth.user.id).maybeSingle()
    if (!data) return

    setXp(Number(data.xp || 0))
    setVidas(Number(data.vidas ?? 5))
    setStreak(Number(data.streak || 0))
    setMeta(Number(data.meta_semanal || 150))
  }

  async function atualizarPerfil(payload) {
    if (!user) return

    const nextXp = payload.xp ?? xp
    const nextLives = payload.vidas ?? vidas

    setXp(nextXp)
    setVidas(nextLives)

    await supabase.from('profiles').update({ xp: nextXp, vidas: nextLives }).eq('id', user.id)
  }

  async function ganharXp(valor) {
    await atualizarPerfil({ xp: xp + valor })
  }

  async function perderVida() {
    await atualizarPerfil({ vidas: Math.max(0, vidas - 1) })
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08080a] text-white">
      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#a370f7] opacity-20 blur-[120px]" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-300 opacity-20 blur-[120px]" />

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col px-4 pb-28 pt-6">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-white/35">CodeBloom</p>
            <h1 className="text-3xl font-black tracking-tighter">Minimal Premium UI</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className={`${glass} flex items-center gap-2 px-4 py-3`}><Heart size={16} className="text-rose-300" /><span className="text-sm font-black">{vidas}</span></div>
            <div className={`${glass} flex items-center gap-2 px-4 py-3`}><Zap size={16} className="text-cyan-300" /><span className="text-sm font-black">{xp}</span></div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.section key={abaAtiva} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={spring} className="flex-1">
            {abaAtiva === 'home' && <div className="space-y-4"><div className="grid grid-cols-3 gap-3"><article className={`${glass} p-4`}><div className="flex items-center gap-2 text-orange-300"><Flame size={16} /><span className="text-xs text-white/45">Ofensiva</span></div><h2 className="mt-3 text-3xl font-black tracking-tighter">{streak}</h2></article><article className={`${glass} p-4`}><div className="flex items-center gap-2 text-cyan-300"><Zap size={16} /><span className="text-xs text-white/45">XP</span></div><h2 className="mt-3 text-3xl font-black tracking-tighter">{xp}</h2></article><article className={`${glass} p-4`}><div className="flex items-center gap-2 text-emerald-300"><Target size={16} /><span className="text-xs text-white/45">Meta</span></div><h2 className="mt-3 text-3xl font-black tracking-tighter">{meta}</h2></article></div><motion.button whileTap={{ scale: 0.95 }} transition={spring} onClick={() => setAbaAtiva('licao')} className={`${glass} relative overflow-hidden p-6 text-left`}><div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#a370f7]/20 blur-3xl" /><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c7b4ff]">Continuar lição</p><h1 className="mt-4 text-4xl font-black tracking-tighter">Design System: Botões</h1><p className="mt-3 text-sm leading-7 text-white/55">Aprenda contraste, estados táteis e acessibilidade premium.</p></motion.button></div>}

            {abaAtiva === 'revisao' && <div className="flex min-h-[72vh] flex-col items-center justify-center"><motion.div whileTap={{ scale: 0.98 }} transition={spring} onClick={() => setRevelado(true)} className={`${glass} flex min-h-[260px] w-full flex-col items-center justify-center p-8 text-center`}><p className="text-xs uppercase tracking-[0.2em] text-[#a370f7]">Flashcard</p><h1 className="mt-5 text-4xl font-black tracking-tighter">{revelado ? '44px é o tamanho ideal para toque mobile.' : 'Qual o tamanho mínimo ideal para área de toque?'}</h1></motion.div>{revelado && <div className="mt-5 grid w-full grid-cols-3 gap-3"><motion.button whileTap={{ scale: 0.95 }} transition={spring} onClick={() => ganharXp(5)} className={`${glass} p-4 font-black text-emerald-300`}>Fácil +5</motion.button><motion.button whileTap={{ scale: 0.95 }} transition={spring} onClick={() => ganharXp(3)} className={`${glass} p-4 font-black text-yellow-300`}>Médio</motion.button><motion.button whileTap={{ scale: 0.95 }} transition={spring} onClick={() => ganharXp(1)} className={`${glass} p-4 font-black text-rose-300`}>Difícil</motion.button></div>}</div>}

            {abaAtiva === 'pratica' && <div className="space-y-3">{['Criar um CTA premium.', 'Refazer um card com glassmorphism.', 'Criar uma mini landing premium.'].map((item, index) => <article key={item} className={`${glass} flex items-center justify-between p-5`}><div><p className="text-xs uppercase tracking-[0.2em] text-white/30">Missão {index + 1}</p><h2 className="mt-2 text-lg font-black tracking-tighter">{item}</h2></div><Sparkles className="text-[#a370f7]" /></article>)}</div>}

            {abaAtiva === 'perfil' && <div className="space-y-4"><section className={`${glass} p-5`}><div className="flex items-center justify-between"><div><p className="text-sm text-white/35">Conta conectada</p><h1 className="mt-2 text-2xl font-black tracking-tighter">{user?.email || 'Usuário offline'}</h1></div><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04]"><User2 /></div></div></section></div>}

            {abaAtiva === 'licao' && <div className="space-y-4"><motion.button whileTap={{ scale: 0.95 }} transition={spring} onClick={() => setAbaAtiva('home')} className={`${glass} px-5 py-4 font-black`}>Voltar</motion.button><section className={`${glass} p-5`}><div className="mb-5 h-2 overflow-hidden rounded-full bg-white/[0.04]"><motion.div layout transition={spring} className="h-full w-1/2 rounded-full bg-gradient-to-r from-[#a370f7] to-cyan-300" /></div><p className="text-xs uppercase tracking-[0.2em] text-[#a370f7]">Contraste</p><h1 className="mt-4 text-4xl font-black tracking-tighter">Qual botão tem melhor legibilidade?</h1><div className="mt-8 grid gap-3"><motion.button whileTap={{ scale: 0.95 }} transition={spring} onClick={perderVida} className="rounded-2xl bg-[#17111d] px-5 py-4 font-black text-[#2c2040]">Continuar</motion.button><motion.button whileTap={{ scale: 0.95 }} transition={spring} onClick={async () => { await ganharXp(15); setAbaAtiva('home') }} className="rounded-2xl bg-white px-5 py-4 font-black text-black">Continuar</motion.button></div></section></div>}
          </motion.section>
        </AnimatePresence>

        <nav className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-24px)] max-w-md -translate-x-1/2 items-center justify-between rounded-3xl border border-white/[0.06] bg-black/40 p-3 backdrop-blur-xl">
          <NavButton icon={<Home size={18} />} label="Home" active={abaAtiva === 'home'} onClick={() => setAbaAtiva('home')} />
          <NavButton icon={<BookOpen size={18} />} label="Revisão" active={abaAtiva === 'revisao'} onClick={() => setAbaAtiva('revisao')} />
          <NavButton icon={<Brain size={18} />} label="Prática" active={abaAtiva === 'pratica'} onClick={() => setAbaAtiva('pratica')} />
          <NavButton icon={<User2 size={18} />} label="Perfil" active={abaAtiva === 'perfil'} onClick={() => setAbaAtiva('perfil')} />
        </nav>
      </div>
    </main>
  )
}
