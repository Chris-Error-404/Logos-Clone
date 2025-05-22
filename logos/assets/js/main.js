// WEBSITE THEME SCRIPT 
const body = document.body;

// Logos
const desktopLogo = document.querySelector('header.desktop img');
const mobileLogo = document.querySelector('header.mobile img');
const overlayLogo = document.querySelector('.overlay-menu img');

// Theme toggle icons
const desktopToggle = document.getElementById('desktop-theme-toggle');
const mobileToggle = document.getElementById('mobile-theme-toggle');
const overlayToggle = document.querySelector('#overlayMenu #theme-toggle');

// Detect and apply saved or system theme
const savedTheme = localStorage.getItem('theme');
const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
const defaultTheme = savedTheme || (prefersLight ? 'light' : 'dark');

if (defaultTheme === 'light') {
  body.classList.add('light-mode');
  updateThemeUI('light');
}

function addToggleListener(toggleBtn) {
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const isLight = body.classList.toggle('light-mode');
    const theme = isLight ? 'light' : 'dark';
    updateThemeUI(theme);
    localStorage.setItem('theme', theme);
  });
}

// Attach to all toggle buttons
addToggleListener(desktopToggle);
addToggleListener(mobileToggle);
addToggleListener(overlayToggle);

function updateThemeUI(theme) {
  const logoSrc = theme === 'light'
    ? './assets/img/logo-black.svg'
    : './assets/img/logo.svg';

  if (desktopLogo) desktopLogo.src = logoSrc;
  if (mobileLogo) mobileLogo.src = logoSrc;
  if (overlayLogo) overlayLogo.src = logoSrc;

  // Update all toggles
  [desktopToggle, mobileToggle, overlayToggle].forEach(toggle => {
    if (toggle) {
      toggle.classList.remove('bx-sun', 'bx-moon');
      toggle.classList.add(theme === 'light' ? 'bx-sun' : 'bx-moon');

      // Animate icon
      toggle.classList.add('theme-rotate');
      toggle.addEventListener('animationend', () => {
        toggle.classList.remove('theme-rotate');
      }, { once: true });
    }
  });
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
