import { useEffect, useMemo, useState } from 'react'
import { BookOpen, Brain, Flame, Heart, Home, Layers3, Sparkles, Target, User, Zap } from 'lucide-react'
import { supabase } from './lib/supabase'

const glass = 'bg-white/[0.02] border border-white/[0.05] backdrop-blur-md rounded-2xl p-5'
const tap = 'transition-all duration-150 active:scale-95 cursor-pointer'

const trilhas = [
  { nome: 'Code', desc: 'React, lógica e frontend', icon: '💻' },
  { nome: 'Visual', desc: 'UI premium e design systems', icon: '🎨' },
  { nome: 'Business', desc: 'Propostas e clientes', icon: '💼' },
  { nome: 'IA', desc: 'Prompts e automações', icon: '🤖' },
]

const flashcards = [
  {
    pergunta: 'O que é um Design System?',
    resposta: 'Um conjunto de padrões reutilizáveis para interfaces consistentes.',
  },
  {
    pergunta: 'Qual tamanho mínimo recomendado para toque?',
    resposta: '44px é o padrão seguro para mobile.',
  },
  {
    pergunta: 'Por que contraste importa?',
    resposta: 'Melhora legibilidade e reduz esforço cognitivo.',
  },
]

const missoes = [
  'Criar um botão premium com hover e active.',
  'Refazer um card usando glassmorphism.',
  'Montar uma landing simples para portfólio.',
]

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('home')
  const [xp, setXp] = useState(0)
  const [vidas, setVidas] = useState(5)
  const [streak, setStreak] = useState(0)
  const [meta, setMeta] = useState(150)
  const [user, setUser] = useState(null)
  const [flashIndex, setFlashIndex] = useState(0)
  const [revelado, setRevelado] = useState(false)

  const cardAtual = useMemo(() => flashcards[flashIndex % flashcards.length], [flashIndex])

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    try {
      const { data: auth } = await supabase.auth.getUser()
      if (!auth.user) return

      setUser(auth.user)

      const { data, error } = await supabase
        .from('profiles')
        .select('xp, vidas, streak, meta_semanal')
        .eq('id', auth.user.id)
        .single()

      if (error || !data) return

      setXp(Number(data.xp || 0))
      setVidas(Number(data.vidas ?? 5))
      setStreak(Number(data.streak || 0))
      setMeta(Number(data.meta_semanal || 150))
    } catch (err) {
      console.error(err)
    }
  }

  async function updateProfile(payload) {
    if (!user) return

    const nextXp = payload.xp ?? xp
    const nextLives = payload.vidas ?? vidas
    const nextStreak = payload.streak ?? streak

    setXp(nextXp)
    setVidas(nextLives)
    setStreak(nextStreak)

    await supabase
      .from('profiles')
      .update({
        xp: nextXp,
        vidas: nextLives,
        streak: nextStreak,
      })
      .eq('id', user.id)
  }

  async function responderFlashcard(dificuldade) {
    const ganho = dificuldade === 'facil' ? 5 : dificuldade === 'medio' ? 3 : 1

    await updateProfile({ xp: xp + ganho })

    setRevelado(false)
    setFlashIndex((old) => old + 1)
  }

  function renderHome() {
    return (
      <div className="space-y-5">
        <section className="grid grid-cols-3 gap-3">
          <article className={glass}>
            <div className="flex items-center gap-2 text-orange-300"><Flame size={16} /><span className="text-xs text-white/60">Ofensiva</span></div>
            <h2 className="mt-3 text-2xl font-black">{streak}</h2>
          </article>

          <article className={glass}>
            <div className="flex items-center gap-2 text-cyan-300"><Zap size={16} /><span className="text-xs text-white/60">XP</span></div>
            <h2 className="mt-3 text-2xl font-black">{xp}</h2>
          </article>

          <article className={glass}>
            <div className="flex items-center gap-2 text-emerald-300"><Target size={16} /><span className="text-xs text-white/60">Meta</span></div>
            <h2 className="mt-3 text-2xl font-black">{meta}</h2>
          </article>
        </section>

        <section
          onClick={() => setAbaAtiva('licao')}
          className={`${glass} ${tap} relative overflow-hidden border-[#a370f7]/20 bg-gradient-to-br from-[#a370f7]/15 to-cyan-300/[0.04]`}
        >
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#a370f7]/20 blur-3xl" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c6b0ff]">Continuar jornada</p>
          <h1 className="mt-4 text-3xl font-black tracking-[-0.08em]">Design System: Botões</h1>
          <p className="mt-3 text-sm leading-7 text-white/60">Aprenda contraste, estados, acessibilidade e UI premium.</p>
          <button className={`mt-5 rounded-xl bg-white px-5 py-3 font-black text-black ${tap}`}>Continuar lição</button>
        </section>

        <section className="space-y-3">
          {trilhas.map((trilha) => (
            <article key={trilha.nome} className={`${glass} ${tap} flex items-center justify-between`}>
              <div>
                <h3 className="text-lg font-black">{trilha.nome}</h3>
                <p className="mt-1 text-sm text-white/50">{trilha.desc}</p>
              </div>
              <span className="text-3xl">{trilha.icon}</span>
            </article>
          ))}
        </section>
      </div>
    )
  }

  function renderRevisao() {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <div
          onClick={() => setRevelado(true)}
          className={`${glass} ${tap} flex min-h-[260px] w-full flex-col items-center justify-center text-center`}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a370f7]">Flashcard</p>
          <h2 className="mt-6 text-3xl font-black tracking-[-0.08em]">
            {revelado ? cardAtual.resposta : cardAtual.pergunta}
          </h2>
          <p className="mt-4 text-sm text-white/40">
            {revelado ? 'Escolha a dificuldade.' : 'Toque para revelar.'}
          </p>
        </div>

        {revelado && (
          <div className="mt-5 grid w-full grid-cols-3 gap-3">
            <button onClick={() => responderFlashcard('facil')} className={`${glass} ${tap} font-black text-emerald-300`}>
              Fácil +5 XP
            </button>

            <button onClick={() => responderFlashcard('medio')} className={`${glass} ${tap} font-black text-yellow-300`}>
              Médio
            </button>

            <button onClick={() => responderFlashcard('dificil')} className={`${glass} ${tap} font-black text-rose-300`}>
              Difícil
            </button>
          </div>
        )}
      </div>
    )
  }

  function renderPratica() {
    return (
      <div className="space-y-3">
        {missoes.map((missao, index) => (
          <article key={missao} className={`${glass} flex items-center justify-between`}>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/30">Missão {index + 1}</p>
              <h2 className="mt-2 text-lg font-black">{missao}</h2>
            </div>
            <Sparkles className="text-[#a370f7]" />
          </article>
        ))}
      </div>
    )
  }

  function renderPerfil() {
    return (
      <div className="space-y-4">
        <section className={glass}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/40">Usuário</p>
              <h2 className="mt-1 text-2xl font-black">{user?.email || 'Conecte sua conta'}</h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04]">
              <User />
            </div>
          </div>
        </section>

        <section className={glass}>
          <p className="text-xs uppercase tracking-[0.2em] text-[#a370f7]">Renda digital</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.08em]">Simulador de proposta</h2>
          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-white/[0.05] bg-black/20 p-4">
              <p className="text-sm text-white/40">Projeto</p>
              <h3 className="mt-1 font-black">Landing page premium</h3>
            </div>

            <div className="rounded-xl border border-white/[0.05] bg-black/20 p-4">
              <p className="text-sm text-white/40">Preço sugerido</p>
              <h3 className="mt-1 font-black text-emerald-300">R$ 1.200</h3>
            </div>
          </div>
        </section>
      </div>
    )
  }

  function renderLicao() {
    return (
      <div className="space-y-5">
        <button onClick={() => setAbaAtiva('home')} className={`${glass} ${tap} w-fit px-5 py-3 font-black`}>
          Voltar
        </button>

        <section className={`${glass} border-[#a370f7]/15`}>
          <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/[0.04]">
            <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-[#a370f7] to-cyan-300" />
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-[#a370f7]">Passo 1</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.08em]">Contraste premium</h1>
          <p className="mt-4 text-sm leading-7 text-white/55">Botões claros sobre fundo escuro criam hierarquia e foco visual.</p>

          <div className="mt-8 grid gap-3">
            <button className={`${tap} rounded-2xl bg-[#16111d] px-5 py-4 font-black text-[#2f2240]`}>
              Continuar
            </button>

            <button
              onClick={async () => {
                await updateProfile({ xp: xp + 15 })
                setAbaAtiva('home')
              }}
              className={`${tap} rounded-2xl bg-white px-5 py-4 font-black text-black`}
            >
              Continuar
            </button>
          </div>
        </section>
      </div>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08080a] text-white">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#a370f7] opacity-20 blur-[120px]" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-300 opacity-20 blur-[120px]" />

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col px-4 pb-28 pt-6">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-white/40">CodeBloom</p>
            <h1 className="text-3xl font-black tracking-[-0.08em]">Dark Premium UI</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className={`${glass} flex items-center gap-2 px-4 py-3`}>
              <Heart size={16} className="text-rose-300" />
              <span className="text-sm font-black">{vidas}</span>
            </div>

            <div className={`${glass} flex items-center gap-2 px-4 py-3`}>
              <Zap size={16} className="text-cyan-300" />
              <span className="text-sm font-black">{xp}</span>
            </div>
          </div>
        </header>

        <section className="flex-1">
          {abaAtiva === 'home' && renderHome()}
          {abaAtiva === 'revisao' && renderRevisao()}
          {abaAtiva === 'pratica' && renderPratica()}
          {abaAtiva === 'perfil' && renderPerfil()}
          {abaAtiva === 'licao' && renderLicao()}
        </section>

        <nav className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-24px)] max-w-md -translate-x-1/2 items-center justify-between rounded-2xl border border-white/[0.05] bg-black/40 p-3 backdrop-blur-xl">
          <button onClick={() => setAbaAtiva('home')} className={`${tap} flex flex-col items-center gap-1 rounded-xl px-4 py-2 ${abaAtiva === 'home' ? 'bg-white/[0.06]' : ''}`}><Home size={18} /><span className="text-[10px] font-bold">Home</span></button>
          <button onClick={() => setAbaAtiva('revisao')} className={`${tap} flex flex-col items-center gap-1 rounded-xl px-4 py-2 ${abaAtiva === 'revisao' ? 'bg-white/[0.06]' : ''}`}><BookOpen size={18} /><span className="text-[10px] font-bold">Revisão</span></button>
          <button onClick={() => setAbaAtiva('pratica')} className={`${tap} flex flex-col items-center gap-1 rounded-xl px-4 py-2 ${abaAtiva === 'pratica' ? 'bg-white/[0.06]' : ''}`}><Brain size={18} /><span className="text-[10px] font-bold">Prática</span></button>
          <button onClick={() => setAbaAtiva('perfil')} className={`${tap} flex flex-col items-center gap-1 rounded-xl px-4 py-2 ${abaAtiva === 'perfil' ? 'bg-white/[0.06]' : ''}`}><Layers3 size={18} /><span className="text-[10px] font-bold">Perfil</span></button>
        </nav>
      </div>
    </main>
  )
}
