/**
 * Responsive Navbar JavaScript
 * CodeClip Project - Navigation Bar Component
 */

// DOM Elements
let navbar, mobileMenuToggle, mobileMenu, mobileServicesToggle;
let mobileServicesDropdown, navLinks, demoSections;

// State
let isMenuOpen = false;
let isDropdownOpen = false;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    setupScrollAnimations();
    setupAccessibility();
});

/**
 * Initialize DOM elements
 */
function initializeElements() {
    navbar = document.getElementById('navbar');
    mobileMenuToggle = document.getElementById('mobileMenuToggle');
    mobileMenu = document.getElementById('mobileMenu');
    mobileServicesToggle = document.getElementById('mobileServicesToggle');
    mobileServicesDropdown = document.getElementById('mobileServicesDropdown');
    navLinks = document.querySelectorAll('.navbar-link, .mobile-menu-link');
    demoSections = document.querySelectorAll('.demo-section');
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Mobile dropdown toggle
    if (mobileServicesToggle) {
        mobileServicesToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMobileDropdown();
        });
    }

    // Close mobile menu when clicking on links
    document.querySelectorAll('.mobile-menu-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                closeMobileMenu();
                updateActiveLink(this);
            }
        });
    });

    // Update active links for desktop menu
    document.querySelectorAll('.navbar-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                updateActiveLink(this);
            }
        });
    });

    // Scroll event for navbar styling
    window.addEventListener('scroll', throttle(handleScroll, 16));

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navbar && !navbar.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // Smooth scrolling for anchor links
    setupSmoothScrolling();
}

/**
 * Toggle mobile menu state
 */
function toggleMobileMenu() {
    if (isMenuOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

/**
 * Open mobile menu
 */
function openMobileMenu() {
    if (!mobileMenuToggle || !mobileMenu) return;
    
    isMenuOpen = true;
    mobileMenuToggle.classList.add('active');
    mobileMenu.classList.add('active');
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    
    // Focus first menu item for accessibility
    const firstMenuItem = mobileMenu.querySelector('.mobile-menu-link');
    if (firstMenuItem) {
        setTimeout(() => firstMenuItem.focus(), 100);
    }
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    if (!mobileMenuToggle || !mobileMenu) return;
    
    isMenuOpen = false;
    mobileMenuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    
    // Close any open dropdowns
    closeMobileDropdown();
}

/**
 * Toggle mobile dropdown
 */
function toggleMobileDropdown() {
    if (!mobileServicesDropdown) return;
    
    isDropdownOpen = !isDropdownOpen;
    const toggle = document.querySelector('.mobile-dropdown-toggle');
    
    if (isDropdownOpen) {
        mobileServicesDropdown.classList.add('active');
        if (toggle) toggle.classList.add('active');
    } else {
        mobileServicesDropdown.classList.remove('active');
        if (toggle) toggle.classList.remove('active');
    }
}

/**
 * Close mobile dropdown
 */
function closeMobileDropdown() {
    if (!mobileServicesDropdown) return;
    
    isDropdownOpen = false;
    mobileServicesDropdown.classList.remove('active');
    const toggle = document.querySelector('.mobile-dropdown-toggle');
    if (toggle) toggle.classList.remove('active');
}

/**
 * Handle scroll events with navbar styling changes
 */
function handleScroll() {
    if (!navbar) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

/**
 * Update active link highlighting
 */
function updateActiveLink(activeLink) {
    // Remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to clicked link
    activeLink.classList.add('active');
    
    // Also update corresponding link in other menu
    const href = activeLink.getAttribute('href');
    const correspondingLink = document.querySelector(
        activeLink.classList.contains('navbar-link') ? 
        `.mobile-menu-link[href="${href}"]` : 
        `.navbar-link[href="${href}"]`
    );
    
    if (correspondingLink) {
        correspondingLink.classList.add('active');
    }
}

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                e.preventDefault();
                const navbarHeight = navbar ? navbar.offsetHeight : 70;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Setup scroll animations for demo sections
 */
function setupScrollAnimations() {
    if (!demoSections.length) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    demoSections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Setup accessibility features
 */
function setupAccessibility() {
    // Mobile menu toggle keyboard support
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMobileMenu();
            }
        });

        // Set initial ARIA attributes
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.setAttribute('aria-controls', 'mobileMenu');
    }

    // Escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    // Arrow key navigation for menu items
    setupArrowKeyNavigation();

    // Focus management for dropdowns
    setupDropdownFocusManagement();
}

/**
 * Setup arrow key navigation
 */
function setupArrowKeyNavigation() {
    const menuItems = document.querySelectorAll('.navbar-link, .mobile-menu-link');
    
    menuItems.forEach((item, index) => {
        item.addEventListener('keydown', function(e) {
            let targetIndex;
            
            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    targetIndex = (index + 1) % menuItems.length;
                    menuItems[targetIndex].focus();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    targetIndex = (index - 1 + menuItems.length) % menuItems.length;
                    menuItems[targetIndex].focus();
                    break;
                case 'Home':
                    e.preventDefault();
                    menuItems[0].focus();
                    break;
                case 'End':
                    e.preventDefault();
                    menuItems[menuItems.length - 1].focus();
                    break;
            }
        });
    });
}

/**
 * Setup dropdown focus management
 */
function setupDropdownFocusManagement() {
    const dropdownTriggers = document.querySelectorAll('.dropdown .navbar-link');
    
    dropdownTriggers.forEach(trigger => {
        const dropdown = trigger.parentElement;
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        const dropdownItems = dropdownContent ? dropdownContent.querySelectorAll('.dropdown-item') : [];
        
        trigger.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown' && dropdownItems.length > 0) {
                e.preventDefault();
                dropdownItems[0].focus();
            }
        });

        dropdownItems.forEach((item, index) => {
            item.addEventListener('keydown', function(e) {
                switch(e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        const nextIndex = (index + 1) % dropdownItems.length;
                        dropdownItems[nextIndex].focus();
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        if (index === 0) {
                            trigger.focus();
                        } else {
                            dropdownItems[index - 1].focus();
                        }
                        break;
                    case 'Escape':
                        e.preventDefault();
                        trigger.focus();
                        break;
                }
            });
        });
    });
}

/**
 * Throttle function to limit event frequency
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

/**
 * Debounce function for resize events
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Get current active section based on scroll position
 */
function getCurrentSection() {
    const sections = document.querySelectorAll('section[id], div[id]');
    const scrollPos = window.pageYOffset + 100;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.offsetTop <= scrollPos) {
            return section.id;
        }
    }
    return null;
}

/**
 * Highlight active section in navigation
 */
function highlightActiveSection() {
    const currentSection = getCurrentSection();
    if (!currentSection) return;
    
    const activeLink = document.querySelector(`a[href="#${currentSection}"]`);
    if (activeLink) {
        updateActiveLink(activeLink);
    }
}

/**
 * Handle focus trap for mobile menu
 */
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select, details, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Export functions for external use
window.ResponsiveNavbar = {
    toggleMobileMenu,
    openMobileMenu,
    closeMobileMenu,
    updateActiveLink,
    highlightActiveSection,
    getCurrentSection
};
