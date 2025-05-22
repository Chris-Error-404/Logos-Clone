//WEBSITE THEME SCRIPT 
const toggle = document.querySelector('header.desktop i');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
  updateIcon('light');
}

toggle.addEventListener('click', () => {
  const isLight = body.classList.toggle('light-mode');
  const theme = isLight ? 'light' : 'dark';
  updateIcon(theme);
  localStorage.setItem('theme', theme);
});

function updateIcon(theme) {
  toggle.classList.remove('bx-sun', 'bx-moon');
  toggle.classList.add(theme === 'light' ? 'bx-sun' : 'bx-moon');

  // Add rotation animation
  toggle.classList.add('theme-rotate');

  // Remove animation class after it ends so it can replay next time
  toggle.addEventListener('animationend', () => {
    toggle.classList.remove('theme-rotate');
  }, { once: true });
}
