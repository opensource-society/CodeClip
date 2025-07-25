// ===== Owl Crousel with error handling 
$(document).ready(function () {
    try {
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            autoplay: true,
            autoplayTimeout: 2500,
            autoplayHoverPause: true,
            responsive: {
                0: { items: 1 },
                768: { items: 1 },
                1000: { items: 2 },
                1400: { items: 3 }
            }
        });
    } catch (error) {
        console.error('Owl Carousel initialization failed:', error);
    }
});


// =============== DARK MODE 
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

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
