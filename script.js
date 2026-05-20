import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = window.CODEBLOOM_SUPABASE_URL || localStorage.getItem('VITE_SUPABASE_URL') || ''
const SUPABASE_ANON_KEY = window.CODEBLOOM_SUPABASE_ANON_KEY || localStorage.getItem('VITE_SUPABASE_ANON_KEY') || ''
const supabase = SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null

const state = {
  abaAtiva: 'home',
  passoAtual: 0,
  xp: 0,
  vidas: 5,
  streak: 0,
  userId: null,
  contrasteOk: false,
  accessFixed: false,
  lifeLost: false,
  sandbox: { hover: false, active: false, disabled: false }
}

const screens = document.querySelectorAll('[data-screen]')
const navButtons = document.querySelectorAll('[data-tab]')
const startLessonButtons = document.querySelectorAll('[data-start-lesson]')
const backButtons = document.querySelectorAll('[data-back]')
const nextButtons = document.querySelectorAll('[data-next]')
const prevButtons = document.querySelectorAll('[data-prev]')

function setAbaAtiva(aba) {
  state.abaAtiva = aba
  screens.forEach((screen) => screen.classList.toggle('active', screen.dataset.screen === aba))
  navButtons.forEach((button) => button.classList.toggle('active', button.dataset.tab === aba))
  if (aba === 'lesson') renderLesson()
}

async function getCurrentUser() {
  if (!supabase) return null
  const { data } = await supabase.auth.getUser()
  return data.user || null
}

async function loadProfile() {
  const user = await getCurrentUser()
  if (!user || !supabase) return renderStats()
  state.userId = user.id

  let { data: profile } = await supabase
    .from('profiles')
    .select('id,username,xp,vidas,streak,meta_semanal')
    .eq('id', user.id)
    .maybeSingle()

  if (!profile) {
    const username = user.user_metadata?.username || user.email?.split('@')[0] || 'bloom_user'
    const inserted = await supabase
      .from('profiles')
      .insert({ id: user.id, username, xp: 0, vidas: 5, streak: 0, meta_semanal: 150 })
      .select('id,username,xp,vidas,streak,meta_semanal')
      .single()
    profile = inserted.data
  }

  state.xp = Number(profile?.xp || 0)
  state.vidas = Number(profile?.vidas ?? 5)
  state.streak = Number(profile?.streak || 0)
  renderStats()
}

function renderStats() {
  document.querySelectorAll('[data-xp]').forEach((el) => { el.textContent = `${state.xp} XP` })
  document.querySelectorAll('[data-vidas]').forEach((el) => { el.textContent = `❤️ ${state.vidas}` })
  document.querySelectorAll('[data-streak]').forEach((el) => { el.textContent = `🔥 ${state.streak}` })
}

async function loseLife() {
  state.vidas = Math.max(0, state.vidas - 1)
  renderStats()
  if (supabase && state.userId) await supabase.from('profiles').update({ vidas: state.vidas }).eq('id', state.userId)
}

async function addXpAndFinish() {
  state.xp += 15
  renderStats()
  if (supabase && state.userId) {
    await supabase.from('profiles').update({ xp: state.xp }).eq('id', state.userId)
    await supabase.from('user_progress').upsert(
      { user_id: state.userId, trilha: 'Visual', licao_id: 'design-system-botoes', concluida: true },
      { onConflict: 'user_id,trilha,licao_id' }
    )
  }
  resetLesson()
  setAbaAtiva('home')
}

function resetLesson() {
  state.passoAtual = 0
  state.contrasteOk = false
  state.accessFixed = false
  state.lifeLost = false
  state.sandbox = { hover: false, active: false, disabled: false }
}

function sandboxClass() {
  const classes = ['demo-button']
  if (state.sandbox.hover) classes.push('is-hover')
  if (state.sandbox.active) classes.push('is-active')
  if (state.sandbox.disabled) classes.push('is-disabled')
  return classes.join(' ')
}

function renderLesson() {
  const lesson = document.querySelector('[data-screen="lesson"]')
  if (!lesson) return
  const progress = ((state.passoAtual + 1) / 4) * 100

  const steps = [
    `<section class="slide active premium-slide"><p class="pill">Contraste</p><h2>Qual botão parece mais profissional?</h2><p>Escolha o CTA com melhor legibilidade para liberar o avanço.</p><div class="choice-grid premium-choices"><button data-contrast="bad" class="ghost-choice ${state.contrasteOk === false ? '' : ''}">Continuar proposta</button><button data-contrast="good" class="premium-choice ${state.contrasteOk ? 'correct' : ''}">Continuar proposta</button></div></section>`,
    `<section class="slide active premium-slide"><p class="pill">Sandbox</p><h2>Estados táteis</h2><p>Ative hover, active e disabled para ver o botão mudando em tempo real.</p><div class="sandbox-stage"><button class="${sandboxClass()}" ${state.sandbox.disabled ? 'disabled' : ''}>Botão Premium</button></div><div class="switch-list"><button data-switch="hover">Hover <span>${state.sandbox.hover ? 'ON' : 'OFF'}</span></button><button data-switch="active">Active <span>${state.sandbox.active ? 'ON' : 'OFF'}</span></button><button data-switch="disabled">Disabled <span>${state.sandbox.disabled ? 'ON' : 'OFF'}</span></button></div></section>`,
    `<section class="slide active premium-slide"><p class="pill">Mobile</p><h2>Área de toque vende confiança</h2><p>Toque nos botões pequenos. O app corrige para 44px e registra o erro.</p><div class="tiny-zone ${state.accessFixed ? 'fixed' : ''}">${['A','B','C','D'].map((x) => `<button data-tiny>${x}</button>`).join('')}</div>${state.accessFixed ? '<p class="success-note">Corrigido: 44px, espaçamento e feedback tátil.</p>' : ''}</section>`,
    `<section class="slide active premium-slide reward"><p class="pill">Recompensa</p><h2>Entrega pronta</h2><p>Você aprendeu contraste, estados e toque mobile. Isso vira proposta real para clientes.</p><div class="reward-grid"><article><b>+15</b><span>XP</span></article><article><b>44px</b><span>Toque</span></article></div><button class="btn primary finish-btn" data-finish>Finalizar</button></section>`
  ]

  lesson.innerHTML = `
    <header class="lesson-top"><button data-back>←</button><div><span>Lição ${state.passoAtual + 1} de 4</span><b>Design System: botões</b></div><strong data-vidas>❤️ ${state.vidas}</strong></header>
    <div class="lesson-progress"><i style="width:${progress}%"></i></div>
    ${steps[state.passoAtual]}
    ${state.passoAtual < 3 ? `<footer class="lesson-actions"><button class="btn ghost" data-prev>Voltar</button><button class="btn primary" data-next ${state.passoAtual === 0 && !state.contrasteOk ? 'disabled' : ''}>Avançar</button></footer>` : ''}
  `

  lesson.querySelector('[data-back]')?.addEventListener('click', () => setAbaAtiva('home'))
  lesson.querySelector('[data-prev]')?.addEventListener('click', () => { state.passoAtual = Math.max(0, state.passoAtual - 1); renderLesson() })
  lesson.querySelector('[data-next]')?.addEventListener('click', () => { state.passoAtual = Math.min(3, state.passoAtual + 1); renderLesson() })
  lesson.querySelector('[data-finish]')?.addEventListener('click', addXpAndFinish)
  lesson.querySelector('[data-contrast="good"]')?.addEventListener('click', () => { state.contrasteOk = true; renderLesson() })
  lesson.querySelector('[data-contrast="bad"]')?.addEventListener('click', () => { state.contrasteOk = false; renderLesson() })
  lesson.querySelectorAll('[data-switch]').forEach((button) => button.addEventListener('click', () => { const key = button.dataset.switch; state.sandbox[key] = !state.sandbox[key]; renderLesson() }))
  lesson.querySelectorAll('[data-tiny]').forEach((button) => button.addEventListener('click', async () => { if (!state.accessFixed) { state.accessFixed = true; if (!state.lifeLost) { state.lifeLost = true; await loseLife() } } renderLesson() }))
}

navButtons.forEach((button) => button.addEventListener('click', () => setAbaAtiva(button.dataset.tab)))
startLessonButtons.forEach((button) => button.addEventListener('click', () => { resetLesson(); setAbaAtiva('lesson') }))
backButtons.forEach((button) => button.addEventListener('click', () => setAbaAtiva('home')))
nextButtons.forEach((button) => button.addEventListener('click', () => { state.passoAtual = Math.min(3, state.passoAtual + 1); renderLesson() }))
prevButtons.forEach((button) => button.addEventListener('click', () => { state.passoAtual = Math.max(0, state.passoAtual - 1); renderLesson() }))

setAbaAtiva('home')
loadProfile()
