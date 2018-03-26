import $ from 'jquery'
// eslint-disable-next-line
import slick from 'slick-carousel'
import './speakerForm'
import './sponsorForm'

const showMenu = (menu, button) => {
  menu.classList.remove('u-hidden')
  button.classList.add('c-navbar__toggle_close')
  button.classList.remove('c-navbar__toggle_hamburger')
  document.getElementById('socialMediaNav').style.display = 'flex'
}

const hideMenu = (menu, button) => {
  menu.classList.add('u-hidden')
  button.classList.add('c-navbar__toggle_hamburger')
  button.classList.remove('c-navbar__toggle_close')
  document.getElementById('socialMediaNav').style.display = 'none'
}

const toggleMenu = () => {
  const menu = document.getElementById('menu')
  const button = document.getElementById('menuToggle')
  menu.classList.contains('u-hidden')
    ? showMenu(menu, button)
    : hideMenu(menu, button)
  document.body.classList.toggle('u-no-scroll')
}

const addToggleMenuListener = () => {
  const button = document.getElementById('menuToggle')
  button.addEventListener('click', toggleMenu)
}

const toggleLanguage = () => {
  const path = window.location.pathname
  const isChinese = path.slice(1, 3) === 'cn'
  const newPath = isChinese ? path.slice(3) : `/cn${path}`
  window.location.pathname = newPath
}

const addToggleLanguageListener = () => {
  const button = document.getElementById('langToggle')
  button.addEventListener('click', toggleLanguage)
}

const initializePartnersCarousel = () => {
  $('#partners').slick({
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 8,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 767,
        settings: 'unslick'
      }
    ]
  })
}

const mediaQueryList = window.matchMedia('(min-width: 787px)')

const checkResolution = (e) => {
  e.matches ? initializePartnersCarousel() : null
}

const init = () => {
  addToggleMenuListener()
  addToggleLanguageListener()
  initializePartnersCarousel()
  mediaQueryList.addListener(checkResolution)
}

init()
