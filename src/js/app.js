// JS Goes here - ES6 supported
import $ from "jquery";
import slick from 'slick-carousel'

const toggleMenu = () => {
  const menu = document.getElementById('menu')
  const button = document.getElementById('menuToggle')
  menu.classList.contains('u-hidden')
  ? (menu.classList.remove('u-hidden'), button.classList.add('c-navbar__toggle_close'), button.classList.remove('c-navbar__toggle_hamburger'))
  : (menu.classList.add('u-hidden'), button.classList.add('c-navbar__toggle_hamburger'), button.classList.remove('c-navbar__toggle_close'))
}

const addToggleMenuListener = () => {
  const button = document.getElementById('menuToggle')
  button.addEventListener('click', toggleMenu)
}

const toggleLanguage = () => {
  const path = window.location.pathname
  const isChinese = path.slice(1,3) === 'cn'
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

const init = () => {
  addToggleMenuListener()
  addToggleLanguageListener()
  initializePartnersCarousel()
}

init()
