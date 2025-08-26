// Sacred Journeys India - JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupSmoothScrolling();
    setupHeaderScrollEffect();
    setupMobileMenu();
    setupIntersectionObserver();
    setupButtonInteractions();
    setupTestimonialSlider();
    setupLazyLoading();
    setupFormValidation();
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header background change on scroll
function setupHeaderScrollEffect() {
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(139, 69, 19, 0.98)';
            header.classList.add('scrolled');
        } else {
            header.style.background = 'rgba(139, 69, 19, 0.95)';
            header.classList.remove('scrolled');
        }
    });
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (mobileMenuBtn.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(6px, 6px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(6px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
        
        // Close mobile menu when clicking on links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            });
        });
    }
}

// Intersection Observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .experience-item, .destination-card, .testimonial, .pricing-card, .team-member');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Button interactions and feedback
function setupButtonInteractions() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            createRippleEffect(this, e);
        });
    });
}

// Create ripple effect on button click
function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation styles
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Testimonial slider functionality
function setupTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    if (testimonials.length > 1) {
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Auto-rotate testimonials
        setInterval(() => {
            testimonials[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].style.display = 'block';
        }, 5000);
    }
}

// Lazy loading for images
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Form validation (if contact forms are added)
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formEntries = Object.fromEntries(formData);
            
            // Basic validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                this.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });
}

// Show notification messages
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const notificationStyles = document.createElement('style');
        notificationStyles.id = 'notification-styles';
        notificationStyles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 600;
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            .notification.success { background: #28a745; }
            .notification.error { background: #dc3545; }
            .notification.info { background: #17a2b8; }
            .notification button {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(notificationStyles);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Parallax effect for hero section
function setupParallax() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// Search functionality (if search feature is added)
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (searchInput && searchResults) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim().toLowerCase();
            
            if (query.length < 3) {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });
    }
}

// Perform search functionality
function performSearch(query) {
    const searchableContent = [
        { title: 'Varanasi Experience', content: 'Ganga aarti temple darshan spiritual', url: '#destinations' },
        { title: 'Rishikesh Yoga', content: 'yoga meditation himalayan ashram', url: '#destinations' },
        { title: 'Temple Rituals', content: 'puja ceremonies authentic spiritual', url: '#experiences' },
        { title: 'Pricing Packages', content: 'premium essential bespoke journey', url: '#pricing' }
    ];
    
    const results = searchableContent.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.content.toLowerCase().includes(query)
    );
    
    displaySearchResults(results);
}

// Display search results
function displaySearchResults(results) {
    const searchResults = document.querySelector('.search-results');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No results found</div>';
    } else {
        searchResults.innerHTML = results.map(result => `
            <div class="search-result" onclick="location.href='${result.url}'">
                <h4>${result.title}</h4>
                <p>${result.content}</p>
            </div>
        `).join('');
    }
    
    searchResults.style.display = 'block';
}

// Cookie consent functionality
function setupCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
        const cookieConsent = document.createElement('div');
        cookieConsent.className = 'cookie-consent';
        cookieConsent.innerHTML = `
            <div class="cookie-content">
                <p>We use cookies to enhance your experience on our website. By continuing to use this site, you consent to our use of cookies.</p>
                <div class="cookie-buttons">
                    <button onclick="acceptCookies()" class="btn-primary">Accept</button>
                    <button onclick="declineCookies()" class="btn-secondary">Decline</button>
                </div>
            </div>
        `;
        
        // Add cookie consent styles
        const cookieStyles = document.createElement('style');
        cookieStyles.textContent = `
            .cookie-consent {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(139, 69, 19, 0.98);
                color: white;
                padding: 1rem;
                z-index: 10000;
                animation: slideInUp 0.3s ease;
            }
            .cookie-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 2rem;
            }
            .cookie-buttons {
                display: flex;
                gap: 1rem;
            }
            .cookie-buttons button {
                padding: 0.5rem 1rem;
                font-size: 0.9rem;
            }
            @keyframes slideInUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
            }
            @media (max-width: 768px) {
                .cookie-content {
                    flex-direction: column;
                    text-align: center;
                }
            }
        `;
        document.head.appendChild(cookieStyles);
        document.body.appendChild(cookieConsent);
    }
}

// Accept cookies
window.acceptCookies = function() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.querySelector('.cookie-consent').remove();
    showNotification('Cookie preferences saved.', 'success');
};

// Decline cookies
window.declineCookies = function() {
    localStorage.setItem('cookieConsent', 'declined');
    document.querySelector('.cookie-consent').remove();
    showNotification('Cookie preferences saved.', 'info');
};

// Loading animation
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading your spiritual journey...</p>
        </div>
    `;
    
    const loaderStyles = document.createElement('style');
    loaderStyles.textContent = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(139, 69, 19, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            color: white;
        }
        .loader-content {
            text-align: center;
        }
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid #ffd700;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(loaderStyles);
    document.body.appendChild(loader);
    
    // Remove loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader.parentElement) {
                loader.remove();
            }
        }, 1000);
    });
}

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            // Log performance data (in production, send to analytics)
            console.log(`Page load time: ${pageLoadTime}ms`);
            
            // Show warning if page loads slowly
            if (pageLoadTime > 3000) {
                console.warn('Page load time is slow. Consider optimizing images and scripts.');
            }
        });
    }
}

// Accessibility improvements
function setupAccessibility() {
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('using-keyboard');
    });
    
    // Add focus styles for keyboard navigation
    const focusStyles = document.createElement('style');
    focusStyles.textContent = `
        .using-keyboard *:focus {
            outline: 2px solid #ffd700 !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(focusStyles);
}

// Initialize additional features on page load
window.addEventListener('load', () => {
    setupParallax();
    setupSearch();
    setupCookieConsent();
    monitorPerformance();
    setupAccessibility();
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // In production, send error to logging service
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics tracking (replace with actual analytics code)
function trackEvent(category, action, label) {
    // Example: Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // Console log for development
    console.log(`Analytics: ${category} - ${action} - ${label}`);
}

// Track user interactions
document.addEventListener('click', (e) => {
    const target = e.target;
    
    if (target.classList.contains('btn-primary')) {
        trackEvent('Button', 'Click', 'Primary CTA');
    } else if (target.classList.contains('btn-secondary')) {
        trackEvent('Button', 'Click', 'Secondary CTA');
    } else if (target.closest('.pricing-card')) {
        trackEvent('Pricing', 'Card Click', target.closest('.pricing-card').querySelector('h3').textContent);
    } else if (target.closest('.destination-card')) {
        trackEvent('Destination', 'Card Click', target.closest('.destination-card').querySelector('h3').textContent);
    }
});

// Export functions for use in other scripts
window.SacredJourneys = {
    showNotification,
    trackEvent,
    createRippleEffect
};