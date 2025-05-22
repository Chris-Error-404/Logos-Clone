// WEBSITE THEME SCRIPT 
const toggle = document.getElementById('theme-toggle');
const body = document.body;
const desktopLogo = document.querySelector('header.desktop img');
const mobileLogo = document.querySelector('header.mobile img');

// Detect and apply saved or system theme
const savedTheme = localStorage.getItem('theme');
const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
const defaultTheme = savedTheme || (prefersLight ? 'light' : 'dark');

if (defaultTheme === 'light') {
  body.classList.add('light-mode');
  updateThemeUI('light');
}

toggle.addEventListener('click', () => {
  const isLight = body.classList.toggle('light-mode');
  const theme = isLight ? 'light' : 'dark';
  updateThemeUI(theme);
  localStorage.setItem('theme', theme);
});

function updateThemeUI(theme) {
  // Switch icon
  toggle.classList.remove('bx-sun', 'bx-moon');
  toggle.classList.add(theme === 'light' ? 'bx-sun' : 'bx-moon');

  // Switch both logos
  const logoSrc = theme === 'light'
    ? './assets/img/logo-black.svg'
    : './assets/img/logo.svg';

  if (desktopLogo) desktopLogo.src = logoSrc;
  if (mobileLogo) mobileLogo.src = logoSrc;

  // Add rotation animation
  toggle.classList.add('theme-rotate');
  toggle.addEventListener('animationend', () => {
    toggle.classList.remove('theme-rotate');
  }, { once: true });
}


//BACKT TO TOP SCRIPT
document.querySelector('.back-to-top').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


//MOBILE MENU OVERLAY SCRIPT
const menuIcon = document.querySelector('header.mobile .bx-menu');
const overlayMenu = document.getElementById('overlayMenu');
const closeMenu = document.getElementById('closeMenu');

menuIcon.addEventListener('click', () => {
  overlayMenu.classList.add('active');
  document.body.classList.add('lock-scroll');
});

closeMenu.addEventListener('click', () => {
  overlayMenu.classList.remove('active');
  document.body.classList.remove('lock-scroll');
});
