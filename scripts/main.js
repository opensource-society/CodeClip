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

const toggler = document.querySelector('.navbar-toggler');
const hamburgerIcon = toggler.querySelector('.hamburger-icon');
const closeIcon = toggler.querySelector('.close-icon');
const navbarCollapse = document.getElementById('navbarSupportedContent');

    // Toggle icons on click
toggler.addEventListener('click', () => {
        const isCollapsed = navbarCollapse.classList.contains('show');
        hamburgerIcon.classList.toggle('d-none', isCollapsed);
        closeIcon.classList.toggle('d-none', !isCollapsed);
    });

    // Hide cross icon when menu closes (on clicking nav-link or outside)
navbarCollapse.addEventListener('hidden.bs.collapse', () => {
        hamburgerIcon.classList.remove('d-none');
        closeIcon.classList.add('d-none');
    });

navbarCollapse.addEventListener('shown.bs.collapse', () => {
        hamburgerIcon.classList.add('d-none');
        closeIcon.classList.remove('d-none');
    });
