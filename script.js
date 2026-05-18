const projectCards = [
  { title: 'Página Bio', level: 'HTML + CSS', time: '2 dias', value: 'Pode virar serviço' },
  { title: 'Lista de Tarefas', level: 'JavaScript', time: '4 dias', value: 'Treina lógica' },
  { title: 'App de Metas', level: 'JavaScript', time: '7 dias', value: 'Útil para portfólio' }
]

const dashboard = document.querySelector('.dashboard')

if (dashboard) {
  const list = document.createElement('div')
  list.className = 'mini-projects'
  list.innerHTML = projectCards.map(project => `
    <button class="mini-project" type="button">
      <strong>${project.title}</strong>
      <span>${project.level} • ${project.time}</span>
      <small>${project.value}</small>
    </button>
  `).join('')
  dashboard.appendChild(list)
}

document.querySelectorAll('.feature, .lab-card, .final-card').forEach((item, index) => {
  item.animate(
    [
      { opacity: 0, transform: 'translateY(18px)' },
      { opacity: 1, transform: 'translateY(0px)' }
    ],
    {
      duration: 700,
      delay: index * 100,
      fill: 'forwards',
      easing: 'cubic-bezier(.2,.8,.2,1)'
    }
  )
})
