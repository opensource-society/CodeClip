// Dark Mode Toggle JavaScript
class DarkModeToggle {
    constructor() {
        this.toggleSwitch = document.querySelector('#checkbox');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.particles = [];
        this.init();
    }

    init() {
        // Set initial theme
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        if (this.toggleSwitch) {
            this.toggleSwitch.checked = this.currentTheme === 'dark';
            
            // Add event listeners
            this.toggleSwitch.addEventListener('change', () => this.switchTheme());
        }
        
        // Initialize particles
        this.createParticles();
        
        // Detect system theme preference
        this.detectSystemTheme();
        
        // Initialize scroll behavior
        this.initScrollBehavior();
        
        // Initialize other interactive features
        this.initRippleEffects();
        this.initKeyboardNavigation();
        this.initIntersectionObserver();
        
        console.log('Dark Mode Toggle initialized!');
    }

    switchTheme() {
        const isChecked = this.toggleSwitch.checked;
        const newTheme = isChecked ? 'dark' : 'light';
        
        this.showTransitionEffect(newTheme);
        
        setTimeout(() => {
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.currentTheme = newTheme;
            
            // Update particles color
            this.updateParticles();
            
            // Show completion feedback
            this.showToggleProgress();
            
            // Emit custom event for other components
            document.dispatchEvent(new CustomEvent('themeChanged', { 
                detail: { theme: newTheme } 
            }));
            
        }, 200);
    }

    showTransitionEffect(theme) {
        const transition = document.getElementById('themeTransition');
        if (transition) {
            transition.classList.add('active');
            
            setTimeout(() => {
                transition.classList.remove('active');
            }, 600);
        }
    }

    showToggleProgress() {
        const progress = document.getElementById('toggleProgress');
        if (progress) {
            progress.innerHTML = this.currentTheme === 'dark' ? '🌙' : '☀️';
            progress.classList.add('show');
            
            setTimeout(() => {
                progress.classList.remove('show');
            }, 1000);
        }
    }

    createParticles() {
        const particleContainer = document.getElementById('particles');
        if (!particleContainer) return;
        
        const particleCount = window.innerWidth < 768 ? 10 : 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random positioning and size
            const size = Math.random() * 4 + 2;
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            const animationDelay = Math.random() * 6;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${startX}px`;
            particle.style.top = `${startY}px`;
            particle.style.animationDelay = `${animationDelay}s`;
            
            particleContainer.appendChild(particle);
            this.particles.push(particle);
        }
    }

    updateParticles() {
        this.particles.forEach(particle => {
            particle.style.opacity = this.currentTheme === 'dark' ? '0.3' : '0.6';
        });
    }

    detectSystemTheme() {
        // Set initial theme based on system preference if no saved preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme')) {
            this.currentTheme = 'dark';
            document.documentElement.setAttribute('data-theme', 'dark');
            if (this.toggleSwitch) {
                this.toggleSwitch.checked = true;
            }
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem('theme')) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    this.currentTheme = newTheme;
                    document.documentElement.setAttribute('data-theme', newTheme);
                    if (this.toggleSwitch) {
                        this.toggleSwitch.checked = e.matches;
                    }
                    this.updateParticles();
                }
            });
        }
    }

    initScrollBehavior() {
        let lastScrollY = window.scrollY;
        const backButton = document.querySelector('.back-home');

        if (backButton) {
            window.addEventListener('scroll', () => {
                const currentScrollY = window.scrollY;
                
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    backButton.classList.add('hidden-on-scroll');
                } else {
                    backButton.classList.remove('hidden-on-scroll');
                }
                
                lastScrollY = currentScrollY;
            });
        }
    }

    initRippleEffects() {
        // Add ripple effects to buttons
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('card-button')) {
                const ripple = document.createElement('span');
                const rect = e.target.getBoundingClientRect();
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
                
                e.target.style.position = 'relative';
                e.target.style.overflow = 'hidden';
                e.target.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });

        // Add CSS for ripple animation if not already present
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initKeyboardNavigation() {
        // Keyboard navigation for toggle switch
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === ' ') && e.target.id === 'checkbox') {
                e.preventDefault();
                e.target.checked = !e.target.checked;
                e.target.dispatchEvent(new Event('change'));
            }
        });

        // Enhanced focus management
        const focusableElements = document.querySelectorAll(
            'a, button, input, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--accent-color)';
                this.style.outlineOffset = '2px';
            });

            element.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
            });
        });
    }

    initIntersectionObserver() {
        // Add intersection observer for animations
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

        // Observe all demo cards
        document.querySelectorAll('.demo-card').forEach(card => {
            observer.observe(card);
        });
    }

    // Public method to get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Public method to set theme programmatically
    setTheme(theme) {
        if (theme === 'dark' || theme === 'light') {
            this.currentTheme = theme;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            if (this.toggleSwitch) {
                this.toggleSwitch.checked = theme === 'dark';
            }
            
            this.updateParticles();
            this.showToggleProgress();
        }
    }

    // Public method to toggle theme programmatically
    toggle() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    // Cleanup method
    destroy() {
        // Remove event listeners and clean up
        this.particles.forEach(particle => particle.remove());
        this.particles = [];
        
        // Remove other event listeners if needed
        console.log('Dark Mode Toggle destroyed');
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Make DarkModeToggle globally available
    window.darkModeToggle = new DarkModeToggle();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkModeToggle;
}

// Additional utility functions
const ThemeUtils = {
    // Get system preference
    getSystemTheme: () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    },

    // Check if dark mode is supported
    isDarkModeSupported: () => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme)').media !== 'not all';
    },

    // Apply theme to specific element
    applyThemeToElement: (element, theme) => {
        if (element) {
            element.setAttribute('data-theme', theme);
        }
    },

    // Get contrast ratio (simplified)
    getContrastColor: (theme) => {
        return theme === 'dark' ? '#e2e8f0' : '#2d3748';
    }
};

// Make utilities globally available
window.ThemeUtils = ThemeUtils;

// Handle page visibility changes (pause animations when not visible)
document.addEventListener('visibilitychange', () => {
    const particles = document.querySelectorAll('.particle');
    if (document.hidden) {
        particles.forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });
    } else {
        particles.forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
    }
});

// Handle window resize for particles
window.addEventListener('resize', () => {
    if (window.darkModeToggle) {
        // Recreate particles on resize for better distribution
        window.darkModeToggle.particles.forEach(particle => particle.remove());
        window.darkModeToggle.particles = [];
        window.darkModeToggle.createParticles();
    }
});

console.log('Dark Mode Toggle script loaded successfully!');
