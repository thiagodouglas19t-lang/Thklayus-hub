document.querySelectorAll('.card').forEach((card, index) => {
  card.animate(
    [
      { opacity: 0, transform: 'translateY(18px)' },
      { opacity: 1, transform: 'translateY(0px)' }
    ],
    {
      duration: 700,
      delay: index * 120,
      fill: 'forwards',
      easing: 'cubic-bezier(.2,.8,.2,1)'
    }
  )
})
