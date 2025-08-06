/**
 * Modern Login Form JavaScript
 * CodeClip Project - Login/Signup Form Component
 */

// DOM Elements
let toggleOptions, formTitle, formSubtitle, signupFields, forgotPassword;
let submitBtn, btnText, authForm, passwordToggles;
let currentMode = 'login';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    setupPasswordToggles();
    setupFormValidation();
    setupAccessibility();
});

/**
 * Initialize DOM elements
 */
function initializeElements() {
    toggleOptions = document.querySelectorAll('.toggle-option');
    formTitle = document.querySelector('.form-title');
    formSubtitle = document.querySelector('.form-subtitle');
    signupFields = document.querySelectorAll('.signup-fields');
    forgotPassword = document.getElementById('forgotPassword');
    submitBtn = document.getElementById('submitBtn');
    btnText = document.querySelector('.btn-text');
    authForm = document.getElementById('authForm');
    passwordToggles = document.querySelectorAll('.password-toggle');
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Mode toggle listeners
    toggleOptions.forEach(option => {
        option.addEventListener('click', handleModeToggle);
    });

    // Form submission
    authForm.addEventListener('submit', handleFormSubmit);

    // Social login buttons
    const googleBtn = document.getElementById('googleBtn');
    const githubBtn = document.getElementById('githubBtn');
    
    if (googleBtn) googleBtn.addEventListener('click', handleSocialLogin);
    if (githubBtn) githubBtn.addEventListener('click', handleSocialLogin);

    // Forgot password link
    const forgotLink = document.getElementById('forgotLink');
    if (forgotLink) forgotLink.addEventListener('click', handleForgotPassword);

    // Real-time validation
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('input', handleInputChange);
        input.addEventListener('blur', handleInputBlur);
    });
}

/**
 * Handle mode toggle between login/signup
 */
function handleModeToggle(e) {
    const mode = e.target.dataset.mode;
    if (mode === currentMode) return;

    currentMode = mode;
    updateFormMode(mode, e.target);
}

/**
 * Update form appearance based on mode
 */
function updateFormMode(mode, activeElement) {
    // Update active toggle
    toggleOptions.forEach(opt => opt.classList.remove('active'));
    activeElement.classList.add('active');

    // Update form content with smooth transitions
    if (mode === 'signup') {
        formTitle.style.opacity = '0';
        formSubtitle.style.opacity = '0';
        
        setTimeout(() => {
            formTitle.textContent = 'Create Account';
            formSubtitle.textContent = 'Sign up to get started with CodeClip';
            btnText.textContent = 'Create Account';
            formTitle.style.opacity = '1';
            formSubtitle.style.opacity = '1';
        }, 150);

        signupFields.forEach(field => field.classList.add('show'));
        forgotPassword.style.display = 'none';
    } else {
        formTitle.style.opacity = '0';
        formSubtitle.style.opacity = '0';
        
        setTimeout(() => {
            formTitle.textContent = 'Welcome Back';
            formSubtitle.textContent = 'Sign in to your account to continue';
            btnText.textContent = 'Sign In';
            formTitle.style.opacity = '1';
            formSubtitle.style.opacity = '1';
        }, 150);

        signupFields.forEach(field => field.classList.remove('show'));
        forgotPassword.style.display = 'block';
    }

    // Clear form validation states
    clearAllValidationStates();
}

/**
 * Setup password toggle functionality
 */
function setupPasswordToggles() {
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.form-input');
            const isPassword = input.type === 'password';
            
            input.type = isPassword ? 'text' : 'password';
            this.classList.toggle('fa-eye', !isPassword);
            this.classList.toggle('fa-eye-slash', isPassword);
        });
    });
}

/**
 * Setup form validation
 */
function setupFormValidation() {
    const form = document.getElementById('authForm');
    if (form) {
        form.setAttribute('novalidate', 'true');
    }
}

/**
 * Handle input changes for real-time feedback
 */
function handleInputChange(e) {
    const field = e.target;
    clearFieldError(field);
    
    // Provide real-time validation feedback for certain fields
    if (field.name === 'email' && field.value.length > 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(field.value)) {
            field.classList.add('success');
        } else {
            field.classList.remove('success');
        }
    }

    // Password confirmation real-time check
    if (field.name === 'confirmPassword' && currentMode === 'signup') {
        const password = document.getElementById('password').value;
        if (field.value && field.value === password) {
            field.classList.add('success');
        } else {
            field.classList.remove('success');
        }
    }
}

/**
 * Handle input blur for validation
 */
function handleInputBlur(e) {
    validateField(e.target);
}

/**
 * Validate individual field
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Clear previous states
    field.classList.remove('error', 'success');

    // Skip validation for hidden fields
    if (field.offsetParent === null) return true;

    switch(fieldName) {
        case 'fullName':
            if (currentMode === 'signup') {
                if (value.length < 2) {
                    errorMessage = 'Please enter your full name (at least 2 characters)';
                    isValid = false;
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    errorMessage = 'Name should only contain letters and spaces';
                    isValid = false;
                }
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                errorMessage = 'Email address is required';
                isValid = false;
            } else if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
            
        case 'password':
            if (!value) {
                errorMessage = 'Password is required';
                isValid = false;
            } else if (value.length < 8) {
                errorMessage = 'Password must be at least 8 characters long';
                isValid = false;
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                errorMessage = 'Password should contain uppercase, lowercase, and number';
                isValid = false;
            }
            break;
            
        case 'confirmPassword':
            if (currentMode === 'signup') {
                const password = document.getElementById('password').value;
                if (!value) {
                    errorMessage = 'Please confirm your password';
                    isValid = false;
                } else if (value !== password) {
                    errorMessage = 'Passwords do not match';
                    isValid = false;
                }
            }
            break;
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    } else if (value) {
        field.classList.add('success');
    }

    return isValid;
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    field.classList.add('error');
    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

/**
 * Clear field error
 */
function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

/**
 * Clear all validation states
 */
function clearAllValidationStates() {
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.classList.remove('error', 'success');
        input.value = '';
        clearFieldError(input);
    });
}

/**
 * Handle form submission
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate all visible fields
    const inputs = document.querySelectorAll('.form-input');
    let isFormValid = true;
    
    inputs.forEach(input => {
        if (input.offsetParent !== null) { // Only validate visible fields
            if (!validateField(input)) {
                isFormValid = false;
            }
        }
    });

    if (!isFormValid) {
        // Focus on first error field
        const firstError = document.querySelector('.form-input.error');
        if (firstError) {
            firstError.focus();
        }
        return;
    }

    // Show loading state
    setLoadingState(true);

    // Simulate API call
    setTimeout(() => {
        setLoadingState(false);
        showSuccessMessage();
    }, 2000);
}

/**
 * Set loading state for submit button
 */
function setLoadingState(isLoading) {
    if (isLoading) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
    } else {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

/**
 * Show success message
 */
function showSuccessMessage() {
    const successMessage = currentMode === 'login' ? 
        'Successfully signed in!' : 
        'Account created successfully!';
    
    // Create success indicator
    const checkmark = document.createElement('div');
    checkmark.className = 'success-checkmark';
    checkmark.innerHTML = '<i class="fas fa-check"></i>';
    
    const container = document.querySelector('.form-container');
    container.insertBefore(checkmark, container.firstChild);
    
    // Animate success indicator
    setTimeout(() => {
        checkmark.classList.add('show');
    }, 100);

    // Show success message
    setTimeout(() => {
        showNotification(
            `🎉 ${successMessage}`,
            'This would normally redirect you to the dashboard.',
            'success'
        );
        checkmark.remove();
        
        // Reset form after success
        setTimeout(() => {
            clearAllValidationStates();
        }, 2000);
    }, 1500);
}

/**
 * Handle social login
 */
function handleSocialLogin(e) {
    e.preventDefault();
    const provider = e.currentTarget.id === 'googleBtn' ? 'Google' : 'GitHub';
    
    // Add loading state to social button
    const button = e.currentTarget;
    button.style.pointerEvents = 'none';
    button.style.opacity = '0.7';
    
    setTimeout(() => {
        showNotification(
            `Redirecting to ${provider} authentication...`,
            `This would normally open ${provider}'s OAuth flow.`,
            'info'
        );
        
        button.style.pointerEvents = 'auto';
        button.style.opacity = '1';
    }, 1000);
}

/**
 * Handle forgot password
 */
function handleForgotPassword(e) {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification(
            'Email Required',
            'Please enter your email address first.',
            'warning'
        );
        emailInput.focus();
        return;
    }
    
    if (!validateField(emailInput)) {
        showNotification(
            'Invalid Email',
            'Please enter a valid email address.',
            'error'
        );
        return;
    }
    
    showNotification(
        'Password Reset Sent!',
        `Password reset link sent to ${email}. This would normally send a real email.`,
        'success'
    );
}

/**
 * Setup accessibility features
 */
function setupAccessibility() {
    // Add proper ARIA labels
    const form = document.getElementById('authForm');
    if (form) {
        form.setAttribute('aria-label', 'Authentication form');
    }

    // Add keyboard navigation for toggles
    toggleOptions.forEach((option, index) => {
        option.setAttribute('tabindex', '0');
        option.setAttribute('role', 'button');
        option.setAttribute('aria-pressed', option.classList.contains('active'));
        
        option.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Update ARIA attributes when mode changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const element = mutation.target;
                if (element.classList.contains('toggle-option')) {
                    element.setAttribute('aria-pressed', element.classList.contains('active'));
                }
            }
        });
    });

    toggleOptions.forEach(option => {
        observer.observe(option, { attributes: true });
    });
}

/**
 * Show notification (alternative to alert)
 */
function showNotification(title, message, type = 'info') {
    // For now, use alert, but this could be replaced with a custom notification system
    alert(`${title}\n\n${message}`);
}

/**
 * Utility function to get form data
 */
function getFormData() {
    const formData = new FormData(authForm);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}

/**
 * Utility function to reset form
 */
function resetForm() {
    authForm.reset();
    clearAllValidationStates();
}

// Export functions for potential external use
window.LoginForm = {
    validateField,
    resetForm,
    getFormData,
    setLoadingState,
    showNotification
};
