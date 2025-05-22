//WEBSITE THEME SCRIPT 
const toggle = document.getElementById('theme-toggle');
const body = document.body;
const logo = document.querySelector('header.desktop img');

// Apply saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
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

  // Switch logo
  logo.src = theme === 'light'
    ? './assets/img/logo-black.svg'
    : './assets/img/logo.svg';

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