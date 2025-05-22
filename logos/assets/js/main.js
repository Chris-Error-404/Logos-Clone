//WESITE THEME SCRIPT 
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Restore saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      body.classList.add('light-mode');
      updateIcon('light');
    }

    // Toggle on click
    toggle.addEventListener('click', () => {
      const isLight = body.classList.toggle('light-mode');
      const theme = isLight ? 'light' : 'dark';
      localStorage.setItem('theme', theme);
      updateIcon(theme);
    });

    // Optional: Keyboard toggle
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') toggle.click();
    });

    function updateIcon(theme) {
      toggle.classList.remove('bx-sun', 'bx-moon');
      toggle.classList.add(theme === 'light' ? 'bx-sun' : 'bx-moon');
    }
  });
