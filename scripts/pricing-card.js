/**
 * Modern Pricing Cards JavaScript
 * CodeClip Project - Pricing Card Component
 */

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    initializePricingCards();
});

/**
 * Initialize all pricing card functionality
 */
function initializePricingCards() {
    setupLayoutToggle();
    setupButtonHandlers();
    setupAnimations();
    setupKeyboardNavigation();
    setupBackButtonScroll();
}

/**
 * Setup the layout toggle functionality
 */
function setupLayoutToggle() {
    const layoutToggle = document.getElementById('layoutToggle');
    const flexLayout = document.getElementById('flexLayout');
    const gridLayout = document.getElementById('gridLayout');

    if (!layoutToggle || !flexLayout || !gridLayout) return;

    layoutToggle.addEventListener('change', function() {
        const isGridLayout = this.checked;
        
        // Add transition class for smooth switching
        flexLayout.style.transition = 'opacity 0.3s ease';
        gridLayout.style.transition = 'opacity 0.3s ease';

        if (isGridLayout) {
            flexLayout.style.opacity = '0';
            setTimeout(() => {
                flexLayout.classList.add('hidden');
                gridLayout.classList.remove('hidden');
                gridLayout.style.opacity = '0';
                
                // Force reflow
                gridLayout.offsetHeight;
                
                gridLayout.style.opacity = '1';
            }, 150);
        } else {
            gridLayout.style.opacity = '0';
            setTimeout(() => {
                gridLayout.classList.add('hidden');
                flexLayout.classList.remove('hidden');
                flexLayout.style.opacity = '0';
                
                // Force reflow
                flexLayout.offsetHeight;
                
                flexLayout.style.opacity = '1';
            }, 150);
        }

        // Track layout change for analytics (if implemented)
        trackLayoutChange(isGridLayout ? 'grid' : 'flexbox');
    });
}

/**
 * Setup button click handlers
 */
function setupButtonHandlers() {
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const planCard = this.closest('.pricing-card');
            const planName = planCard.querySelector('.plan-name').textContent;
            const planPrice = planCard.querySelector('.price-amount').textContent;
            
            handlePlanSelection(planName, planPrice, this);
        });

        // Add ripple effect on click
        button.addEventListener('click', createRippleEffect);
    });
}

/**
 * Handle plan selection
 * @param {string} planName - Name of the selected plan
 * @param {string} planPrice - Price of the selected plan
 * @param {HTMLElement} button - Clicked button element
 */
function handlePlanSelection(planName, planPrice, button) {
    // Show loading state
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;

    // Simulate API call or processing
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;

        // Show success message or redirect
        showPlanSelectionModal(planName, planPrice);
    }, 1500);

    // Track plan selection for analytics
    trackPlanSelection(planName, planPrice);
}

/**
 * Show plan selection modal/alert
 * @param {string} planName - Selected plan name
 * @param {string} planPrice - Selected plan price
 */
function showPlanSelectionModal(planName, planPrice) {
    // For demo purposes, show an alert
    // In a real application, this would show a proper modal
    const message = `🎉 Great choice!\n\nYou selected: ${planName} Plan\nPrice: ${planPrice}/month\n\nThis would normally redirect you to the signup process.`;
    
    if (confirm(message + '\n\nWould you like to continue to signup? (Demo)')) {
        // Simulate redirect to signup
        console.log(`Redirecting to signup for ${planName} plan...`);
        // window.location.href = `/signup?plan=${encodeURIComponent(planName.toLowerCase())}`;
    }
}

/**
 * Create ripple effect on button click
 * @param {Event} e - Click event
 */
function createRippleEffect(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = ripple.style.height = '20px';
    ripple.style.marginLeft = ripple.style.marginTop = '-10px';

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Setup scroll animations
 */
function setupAnimations() {
    const cards = document.querySelectorAll('.pricing-card');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        },
        { threshold: 0.1 }
    );

    cards.forEach(card => observer.observe(card));

    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .pricing-card {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.6s ease-out;
        }
        
        .pricing-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

/**
 * Setup keyboard navigation
 */
function setupKeyboardNavigation() {
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Add keyboard navigation between cards
    const cards = document.querySelectorAll('.pricing-card');
    cards.forEach((card, index) => {
        card.tabIndex = 0;
        card.addEventListener('keydown', function(e) {
            let targetIndex;
            
            switch(e.key) {
                case 'ArrowRight':
                    targetIndex = (index + 1) % cards.length;
                    cards[targetIndex].focus();
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                    targetIndex = (index - 1 + cards.length) % cards.length;
                    cards[targetIndex].focus();
                    e.preventDefault();
                    break;
            }
        });
    });
}

/**
 * Setup back button scroll behavior
 */
function setupBackButtonScroll() {
    let lastScrollTop = 0;
    const backButton = document.querySelector('.back-button');
    
    if (!backButton) return;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) { // Hide after scrolling 100px
            if (scrollTop > lastScrollTop) {
                // Scrolling down - hide button
                backButton.classList.add('hidden-on-scroll');
            } else {
                // Scrolling up - show button
                backButton.classList.remove('hidden-on-scroll');
            }
        } else {
            // At top of page - always show
            backButton.classList.remove('hidden-on-scroll');
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Track layout change for analytics
 * @param {string} layout - Layout type ('grid' or 'flexbox')
 */
function trackLayoutChange(layout) {
    // Placeholder for analytics tracking
    console.log(`Layout changed to: ${layout}`);
    
    // Example: Send to analytics service
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'layout_change', {
    //         layout_type: layout,
    //         page_title: document.title
    //     });
    // }
}

/**
 * Track plan selection for analytics
 * @param {string} planName - Selected plan name
 * @param {string} planPrice - Selected plan price
 */
function trackPlanSelection(planName, planPrice) {
    // Placeholder for analytics tracking
    console.log(`Plan selected: ${planName} - ${planPrice}`);
    
    // Example: Send to analytics service
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'plan_selection', {
    //         plan_name: planName,
    //         plan_price: planPrice,
    //         page_title: document.title
    //     });
    // }
}

/**
 * Utility function to format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0
    }).format(amount);
}

/**
 * Utility function to validate plan data
 * @param {Object} planData - Plan data object
 * @returns {boolean} True if valid
 */
function validatePlanData(planData) {
    const required = ['name', 'price', 'features'];
    return required.every(field => planData.hasOwnProperty(field));
}

// Export functions for potential use in other modules
window.PricingCards = {
    initializePricingCards,
    trackLayoutChange,
    trackPlanSelection,
    formatCurrency,
    validatePlanData
};
