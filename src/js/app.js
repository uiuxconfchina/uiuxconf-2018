// JS Goes here - ES6 supported

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

const toggleLanguage = (lang) => {
  const button = document.getElementById('langToggle')
  const path = window.location.pathname
  const newPath = `/${lang}${path}`
  window.location.pathname = newPath
  lang === 'cn' ? button.setAttribute('data-lang', 'en') : button.setAttribute('data-lang', 'cn')
}

const addToggleLanguageListener = () => {
  const button = document.getElementById('langToggle')
  const lang = button.getAttribute('data-lang')
  button.addEventListener('click', () => toggleLanguage(lang))
}

const init = () => {
  addToggleMenuListener()
  addToggleLanguageListener()
}

init()
