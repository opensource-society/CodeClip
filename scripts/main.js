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

// Enhanced navbar functionality with active page highlighting
document.addEventListener('DOMContentLoaded', function() {
  // Select all nav links
  const navLinks = document.querySelectorAll('.navbar-nav .nav-item a');
  const navToggle = document.getElementById('nav-toggle');

  // Function to set active nav link based on current section
  function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to corresponding nav link
        const activeLink = document.querySelector(`.navbar-nav .nav-item a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }

  // Set active link on scroll
  window.addEventListener('scroll', setActiveNavLink);
  
  // Set active link on page load
  setActiveNavLink();

  // Handle mobile nav link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Close mobile menu if open
      if (navToggle && navToggle.checked) {
        navToggle.checked = false;
      }
      
      // Smooth scroll to section
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Enhanced navbar scroll effect
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = '#ffffff';
      navbar.style.backdropFilter = 'none';
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
  });
});


