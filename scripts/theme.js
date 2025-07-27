
// =============== DARK MODE 
try {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (!themeToggle) {
        throw new Error('Theme toggle button not found');
    }

    // Check and apply saved theme on page load
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
    }

    // Toggle dark mode on icon click
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // Switch icon between moon and sun
        if (isDark) {
            themeToggle.classList.remove('fa-moon');
            themeToggle.classList.add('fa-sun');
        } else {
            themeToggle.classList.remove('fa-sun');
            themeToggle.classList.add('fa-moon');
        }
    });
} catch (error) {
    console.error('Dark mode toggle failed:', error);
}

