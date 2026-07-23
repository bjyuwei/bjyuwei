/**
 * Beijing Threshold Microbial Technology Co., Ltd
 * Main JavaScript File
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize all components
        initLoadingScreen();
        initNavigation();
        initScrollEffects();
        initCounters();
        initScrollToTop();
        initSmoothScroll();
        initAnimations();
        initFormValidation();
    });

    /**
     * Loading Screen
     */
    function initLoadingScreen() {
        const loadingScreen = document.querySelector('.loading');
        if (loadingScreen) {
            window.addEventListener('load', function() {
                setTimeout(function() {
                    loadingScreen.classList.add('hidden');
                }, 500);
            });
        }
    }

    /**
     * Navigation
     */
    function initNavigation() {
        const header = document.querySelector('.header');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileNavClose = document.querySelector('.mobile-nav-close');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

        // Header scroll effect
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }

        // Mobile menu toggle
        if (mobileMenuBtn && mobileNav) {
            mobileMenuBtn.addEventListener('click', function() {
                mobileNav.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        // Mobile menu close
        if (mobileNavClose && mobileNav) {
            mobileNavClose.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close mobile menu when clicking links
        mobileNavLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileNav && mobileNav.classList.contains('active')) {
                if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    mobileNav.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });

        // Active navigation link
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Scroll Effects
     */
    function initScrollEffects() {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        
        function checkReveal() {
            const windowHeight = window.innerHeight;
            const triggerPoint = windowHeight * 0.85;
            
            reveals.forEach(function(element) {
                const elementTop = element.getBoundingClientRect().top;
                
                if (elementTop < triggerPoint) {
                    element.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', checkReveal);
        checkReveal(); // Initial check
    }

    /**
     * Counter Animation
     */
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        let counted = false;
        
        function animateCounter(counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            function updateCounter() {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }
            
            updateCounter();
        }
        
        function checkCounters() {
            if (counted) return;
            
            const statsSection = document.querySelector('.stats');
            if (!statsSection) return;
            
            const rect = statsSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                counted = true;
                counters.forEach(function(counter) {
                    animateCounter(counter);
                });
            }
        }
        
        window.addEventListener('scroll', checkCounters);
        checkCounters(); // Initial check
    }

    /**
     * Scroll to Top Button
     */
    function initScrollToTop() {
        const scrollTopBtn = document.querySelector('.scroll-top');
        
        if (scrollTopBtn) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 500) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            });
            
            scrollTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    /**
     * Smooth Scroll for Anchor Links
     */
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Animations
     */
    function initAnimations() {
        // Parallax effect for hero section
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                heroBackground.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
            });
        }

        // Card hover effects
        const cards = document.querySelectorAll('.card');
        cards.forEach(function(card) {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });

        // Stagger animation for grid items
        const staggerItems = document.querySelectorAll('.stagger-item');
        staggerItems.forEach(function(item, index) {
            item.style.animationDelay = (index * 0.1) + 's';
        });
    }

    /**
     * Form Validation
     */
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(function(form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
                
                inputs.forEach(function(input) {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.classList.add('error');
                    } else {
                        input.classList.remove('error');
                    }
                    
                    // Email validation
                    if (input.type === 'email' && input.value) {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(input.value)) {
                            isValid = false;
                            input.classList.add('error');
                        }
                    }
                });
                
                if (isValid) {
                    // Show success message
                    showNotification('Thank you! Your message has been sent successfully.', 'success');
                    form.reset();
                } else {
                    showNotification('Please fill in all required fields correctly.', 'error');
                }
            });
            
            // Remove error class on input
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(function(input) {
                input.addEventListener('input', function() {
                    this.classList.remove('error');
                });
            });
        });
    }

    /**
     * Notification System
     */
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'notification notification-' + type;
        notification.innerHTML = '<p>' + message + '</p><button class="notification-close">&times;</button>';
        
        // Add styles
        notification.style.cssText = 'position:fixed;top:100px;right:20px;padding:20px 30px;background:var(--light-bg);border-radius:var(--radius-lg);box-shadow:var(--shadow-xl);z-index:9999;max-width:400px;animation:slideInRight 0.3s ease;';
        
        // Add to page
        document.body.appendChild(notification);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = 'position:absolute;top:10px;right:10px;background:none;border:none;color:var(--text-secondary);font-size:24px;cursor:pointer;';
        
        closeBtn.addEventListener('click', function() {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(function() {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    /**
     * Utility Functions
     */
    window.utils = {
        debounce: function(func, wait) {
            let timeout;
            return function() {
                const context = this;
                const args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    func.apply(context, args);
                }, wait);
            };
        },
        
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(function() {
                        inThrottle = false;
                    }, limit);
                }
            };
        }
    };

})();
