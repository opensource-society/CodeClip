document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
  }

  // Tab switching
  const pageTabs = document.querySelectorAll('.page-tab');
  const pageViews = document.querySelectorAll('.page-view');
  pageTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      pageTabs.forEach(t => t.classList.remove('active'));
      pageViews.forEach(v => v.classList.remove('active'));
      tab.classList.add('active');
      const targetPage = tab.getAttribute('data-page');
      document.getElementById(targetPage).classList.add('active');
    });
  });

  // Animate features on load
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = 'translateY(20px)';
    hero.style.opacity = '0';
    setTimeout(() => {
      hero.style.transition = 'all 0.8s ease';
      hero.style.transform = 'translateY(0)';
      hero.style.opacity = '1';
    }, 100);
  }

  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    card.style.transform = 'translateY(30px)';
    card.style.opacity = '0';
    setTimeout(() => {
      card.style.transition = 'all 0.6s ease';
      card.style.transform = 'translateY(0)';
      card.style.opacity = '1';
    }, 200 + index * 100);
  });
});
