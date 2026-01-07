// Animations JavaScript file for YoSummarize landing page

document.addEventListener('DOMContentLoaded', function() {
    console.log('Animations module loaded');
    
    // Initialize animations
    initScrollAnimations();
    initPhoneMockupAnimation();
    initHoverEffects();
    initMessageAnimation();
});

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length === 0) return;
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.classList.add('animated');
                
                // Apply specific animation based on data attribute
                const animation = entry.target.getAttribute('data-animation');
                const delay = entry.target.getAttribute('data-delay') || 0;
                
                // Set animation delay if specified
                if (delay) {
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe each animated element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== PHONE MOCKUP ANIMATION =====
function initPhoneMockupAnimation() {
    const phoneMockup = document.querySelector('.phone-mockup');
    const typingElement = document.querySelector('.typing');
    
    if (!phoneMockup || !typingElement) return;
    
    // Add floating animation to phone mockup
    phoneMockup.classList.add('float');
    
    // Typing animation simulation
    let messageIndex = 0;
    const messages = [
        "YoSummarize печатает...",
        "Анализирую голосовое сообщение...",
        "Создаю структурированный протокол...",
        "Готово! Отправляю результат."
    ];
    
    function simulateTyping() {
        // Clear current text
        typingElement.textContent = '';
        typingElement.classList.add('typing-animation');
        
        // Set new text
        setTimeout(() => {
            typingElement.textContent = messages[messageIndex];
            typingElement.classList.remove('typing-animation');
            
            // Move to next message
            messageIndex = (messageIndex + 1) % messages.length;
            
            // Repeat after delay
            setTimeout(simulateTyping, 3000);
        }, 2000);
    }
    
    // Start typing animation after a delay
    setTimeout(simulateTyping, 1000);
}

// ===== HOVER EFFECTS =====
function initHoverEffects() {
    // Add hover-lift class to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.classList.add('hover-lift');
    });
    
    // Add hover-grow class to CTA button
    const ctaButton = document.querySelector('.telegram-btn');
    if (ctaButton) {
        ctaButton.classList.add('hover-grow');
    }
    
    // Add hover effect to benefit items
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.benefit-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.backgroundColor = 'rgba(0, 136, 204, 0.2)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.benefit-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
                icon.style.backgroundColor = 'rgba(0, 136, 204, 0.1)';
            }
        });
    });
}

// ===== MESSAGE ANIMATION =====
function initMessageAnimation() {
    const messages = document.querySelectorAll('.message');
    
    if (messages.length === 0) return;
    
    // Animate messages with staggered delay
    messages.forEach((message, index) => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            message.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, 500 + (index * 300));
    });
    
    // Animate protocol sections
    const protocolSections = document.querySelectorAll('.protocol-section');
    protocolSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateX(-10px)';
        
        setTimeout(() => {
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateX(0)';
        }, 1500 + (index * 300));
    });
}

// ===== PARALLAX EFFECT =====
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = element.getAttribute('data-rate') || 0.5;
            const offset = scrolled * rate;
            
            element.style.transform = `translateY(${offset}px)`;
        });
    });
}

// ===== RIPPLE EFFECT FOR BUTTONS =====
function initRippleEffect() {
    const buttons = document.querySelectorAll('.cta-button, .telegram-btn, .secondary-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            
            // Calculate position
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Style ripple
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
            `;
            
            // Add to button
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize additional animations when page is fully loaded
window.addEventListener('load', function() {
    initParallaxEffect();
    initRippleEffect();
});