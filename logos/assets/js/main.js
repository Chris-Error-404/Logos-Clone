// Wrap everything so missing elements never kill the whole file
window.addEventListener('DOMContentLoaded', () => {
  // WEBSITE THEME SCRIPT
  const body = document.body;

  // Logos
  const desktopLogo = document.querySelector('header.desktop img');
  const mobileLogo  = document.querySelector('header.mobile img');
  const overlayLogo = document.querySelector('.overlay-menu img');

  // All theme-toggle icons (i-tags with id="theme-toggle")
  const toggles = document.querySelectorAll('#theme-toggle');

  // Detect and apply saved or system theme
  const savedTheme   = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const defaultTheme = savedTheme || (prefersLight ? 'light' : 'dark');

  // 1) set body class
  body.classList.toggle('light-mode', defaultTheme === 'light');
  // 2) update everything else
  updateThemeUI(defaultTheme);

  // add listeners to every toggle icon
  toggles.forEach(toggle => addToggleListener(toggle));

  function addToggleListener(btn) {
    // on click
    btn.addEventListener('click', toggleTheme);
    // on keypress (Enter or Space)
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme.call(btn, e);
      }
    });
  }

  function toggleTheme() {
    const isLight = body.classList.toggle('light-mode');
    const theme   = isLight ? 'light' : 'dark';
    updateThemeUI(theme);
    localStorage.setItem('theme', theme);
  }

  function updateThemeUI(theme) {
    // pick logo
    const logoSrc = theme === 'light'
      ? './assets/img/logo-black.svg'
      : './assets/img/logo.svg';

    if (desktopLogo) desktopLogo.src = logoSrc;
    if (mobileLogo)  mobileLogo.src = logoSrc;
    if (overlayLogo) overlayLogo.src = logoSrc;

    // update each icon
    toggles.forEach(toggle => {
      toggle.classList.remove('bx-sun', 'bx-moon');
      toggle.classList.add(theme === 'light' ? 'bx-sun' : 'bx-moon');

      // animate
      toggle.classList.add('theme-rotate');
      toggle.addEventListener('animationend', () => {
        toggle.classList.remove('theme-rotate');
      }, { once: true });
    });
  }

  // BACK TO TOP SCRIPT
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // MOBILE MENU OVERLAY SCRIPT
  const menuIcon    = document.querySelector('header.mobile .bx-menu');
  const overlayMenu = document.getElementById('overlayMenu');
  const closeMenu   = document.getElementById('closeMenu');

  if (menuIcon && overlayMenu && closeMenu) {
    menuIcon.addEventListener('click', () => {
      overlayMenu.classList.add('active');
      document.body.classList.add('lock-scroll');
    });

    closeMenu.addEventListener('click', () => {
      overlayMenu.classList.remove('active');
      document.body.classList.remove('lock-scroll');
    });
  }
});
