import '../css/style.css'

$(document).ready(function() {
  $('.tlt').textillate()
  
  ScrollReveal({ 
    reset: true,
    origin: 'left',
    viewOffset: {
      top: 100,
    },
    beforeReveal: function beforeReveal(el) {
      el.children[0].classList.add('animate__animated', 'animate__fadeInLeft')
    },
    afterReveal: function beforeReveal(el) {
      el.classList.remove('animate__animated, animate__fadeInLeft')
    },
  }).reveal('.reveal-left')

  ScrollReveal({ 
    reset: true,
    origin: 'right',
    viewOffset: {
      top: 100,
    },
    beforeReveal: function beforeReveal(el) {
      el.classList.add('animate__animated', 'animate__fadeInRight')
    },
    afterReveal: function beforeReveal(el) {
      el.classList.remove('animate__animated','animate__fadeInRight')
    },
  }).reveal('.reveal-right')

  particlesJS.load('hero', './src/js/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });

  // get a random quote
  fetch('https://dummyjson.com/quotes/random')
    .then(res => res.json())
    .then(json => {
      const { quote, author } = json
      $('#quote').text(`"${quote}" - ${author}`)
    })
})