// Profile Card UI JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Layout Toggle Functionality
    function toggleLayout() {
        const container = document.querySelector('.cards-container');
        const icon = document.querySelector('.layout-toggle i');
        
        container.classList.toggle('compact-layout');
        
        if (container.classList.contains('compact-layout')) {
            icon.className = 'fas fa-th';
        } else {
            icon.className = 'fas fa-th-large';
        }
    }

    // Make toggleLayout function globally available
    window.toggleLayout = toggleLayout;

    // Scroll behavior for back button
    let lastScrollY = window.scrollY;
    const backButton = document.querySelector('.back-home');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            backButton.classList.add('hidden-on-scroll');
        } else {
            // Scrolling up
            backButton.classList.remove('hidden-on-scroll');
        }
        
        lastScrollY = currentScrollY;
    });

    // Add intersection observer for smooth animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all profile cards
    document.querySelectorAll('.profile-card').forEach(card => {
        observer.observe(card);
    });

    // Add click ripple effect
    document.querySelectorAll('.contact-btn, .social-link').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Keyboard navigation for accessibility
    document.querySelectorAll('.social-link, .contact-btn').forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Add focus management for layout toggle
    const layoutToggle = document.querySelector('.layout-toggle');
    if (layoutToggle) {
        layoutToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleLayout();
            }
        });
    }

    // Smooth scrolling for back to home button
    const backHomeButton = document.querySelector('.back-home');
    if (backHomeButton) {
        backHomeButton.addEventListener('click', function(e) {
            // If it's a same-page link, add smooth scrolling
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }

    // Add hover sound effect simulation (visual feedback)
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add loading animation for profile images
    document.querySelectorAll('.profile-image img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        });

        // Handle image load errors
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iI0Q2REFERiIvPgo8cGF0aCBkPSJNNTAgMTQwQzUwIDEyMC45IDY1LjkgMTA1IDg1IDEwNUgxMTVDMTM0LjEgMTA1IDE1MCAxMjAuOSAxNTAgMTQwVjE2MEg1MFYxNDBaIiBmaWxsPSIjRDZEQURGIi8+Cjwvc3ZnPgo=';
            this.alt = 'Profile image not available';
        });
    });

    // Add copy-to-clipboard functionality for contact info (demo)
    document.querySelectorAll('.contact-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simulate copying email to clipboard
            const email = `contact@${this.closest('.profile-card').querySelector('.profile-name').textContent.toLowerCase().replace(' ', '.')}.com`;
            
            // Show toast notification
            showToast(`Email copied: ${email}`);
        });
    });

    // Toast notification function
    function showToast(message) {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-size: 0.9rem;
            backdrop-filter: blur(10px);
            transform: translateX(300px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // Show toast
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
        });
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(300px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Add parallax effect to background
    let ticking = false;
    
    function updateBackground() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        document.body.style.backgroundPosition = `center ${rate}px`;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateBackground);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    // Initialize AOS-like animation system
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.profile-card');
        
        function checkScroll() {
            elements.forEach((element, index) => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }
        
        // Set initial state
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
        });
        
        // Check on scroll
        window.addEventListener('scroll', checkScroll);
        
        // Check on load
        checkScroll();
    }
    
    initScrollAnimations();

    console.log('Profile Card UI initialized successfully!');
});
