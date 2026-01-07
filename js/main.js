// Main JavaScript file for YoSummarize landing page

document.addEventListener('DOMContentLoaded', function() {
    console.log('YoSummarize landing page loaded');
    
    // Initialize all modules
    initPreloader();
    initMobileMenu();
    initSmoothScrolling();
    initScrollTopButton();
    initCounters();
    initNewsletterForm();
    initTelegramLink();
    initVideoDemo();
});

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        // Hide preloader after page loads
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.classList.add('fade-out');
                
                // Remove preloader from DOM after animation completes
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target) && navMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
                const navMenu = document.getElementById('nav-menu');
                
                if (mobileMenuToggle && navMenu && navMenu.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                // Calculate header height for offset
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 80;
                
                // Scroll to element with offset
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL TOP BUTTON =====
function initScrollTopButton() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// ===== COUNTER ANIMATION =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number, .cta-stat-number');
    
    if (counters.length > 0) {
        // Check if counter is in viewport
        function checkCounterInView(counter) {
            const rect = counter.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        }
        
        // Animate counter
        function animateCounter(counter) {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target.toLocaleString() + (counter.classList.contains('cta-stat-number') ? '+' : '');
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
            
            counter.classList.add('counting');
        }
        
        // Check on scroll
        let animated = false;
        
        function handleScroll() {
            if (!animated) {
                counters.forEach(counter => {
                    if (checkCounterInView(counter) && !counter.classList.contains('counting')) {
                        animateCounter(counter);
                    }
                });
                
                // Check if all counters are done
                const allCounted = Array.from(counters).every(c => c.classList.contains('counting'));
                if (allCounted) {
                    animated = true;
                    window.removeEventListener('scroll', handleScroll);
                }
            }
        }
        
        // Initial check
        handleScroll();
        window.addEventListener('scroll', handleScroll);
    }
}

// ===== NEWSLETTER FORM =====
function initNewsletterForm() {
    const newsletterEmail = document.getElementById('newsletterEmail');
    const newsletterSubmit = document.getElementById('newsletterSubmit');
    
    if (newsletterEmail && newsletterSubmit) {
        newsletterSubmit.addEventListener('click', function() {
            const email = newsletterEmail.value.trim();
            
            if (!email) {
                showNotification('Пожалуйста, введите ваш email', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Пожалуйста, введите корректный email', 'error');
                return;
            }
            
            // Simulate submission
            newsletterSubmit.disabled = true;
            newsletterSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            setTimeout(function() {
                showNotification('Спасибо за подписку! Проверьте ваш email для подтверждения.', 'success');
                newsletterEmail.value = '';
                newsletterSubmit.disabled = false;
                newsletterSubmit.innerHTML = '<i class="fas fa-paper-plane"></i>';
            }, 1500);
        });
        
        // Submit on Enter
        newsletterEmail.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                newsletterSubmit.click();
            }
        });
    }
}

// ===== TELEGRAM LINK =====
function initTelegramLink() {
    const telegramLink = document.getElementById('telegramLink');
    
    if (telegramLink) {
        // Add click tracking (simulated)
        telegramLink.addEventListener('click', function() {
            // In a real implementation, you would send this to analytics
            console.log('Telegram link clicked');
            
            // You could also use something like:
            // gtag('event', 'telegram_click', {
            //     'event_category': 'CTA',
            //     'event_label': 'Telegram Button'
            // });
        });
    }
}

// ===== VIDEO DEMO =====
function initVideoDemo() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // In a real implementation, this would open a modal with a video
            showNotification('Демонстрационное видео откроется в модальном окне', 'info');
            
            // Example of what could be done:
            // openVideoModal('https://www.youtube.com/embed/dQw4w9WgXcQ');
        });
    }
}

// ===== HELPER FUNCTIONS =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'error' ? '#ff6b6b' : type === 'success' ? '#4cd964' : '#0088cc'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Example function to open a video modal (commented out for reference)
/*
function openVideoModal(videoUrl) {
    // Create modal elements
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        width: 90%;
        max-width: 800px;
        background-color: white;
        border-radius: 12px;
        overflow: hidden;
        position: relative;
    `;
    
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        width: 40px;
        height: 40px;
        background-color: rgba(0,0,0,0.5);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        z-index: 10001;
    `;
    
    const iframe = document.createElement('iframe');
    iframe.src = videoUrl;
    iframe.style.cssText = `
        width: 100%;
        height: 450px;
        border: none;
    `;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    
    // Assemble modal
    modalContent.appendChild(closeButton);
    modalContent.appendChild(iframe);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Close modal functions
    function closeModal() {
        document.body.removeChild(modalOverlay);
        document.body.style.overflow = 'auto';
    }
    
    closeButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}
*/