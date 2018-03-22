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

const init = () => {
  addToggleMenuListener()
  addToggleLanguageListener()
}

init()
