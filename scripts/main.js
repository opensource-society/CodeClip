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

