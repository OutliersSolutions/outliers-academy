// ========================================
// Outliers Academy Theme - JavaScript
// ========================================

(function() {
    'use strict';

    // Theme initialization
    function initTheme() {
        console.log('Outliers Academy Theme loaded');
        
        // Initialize components
        initSmoothScroll();
        initProgressBars();
        initTooltips();
        initMobileMenu();
        initCourseCards();
        initSearchEnhancements();
    }

    // Smooth scrolling for anchor links
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Animate progress bars when they come into view
    function initProgressBars() {
        const progressBars = document.querySelectorAll('.oa-progress-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const progress = bar.getAttribute('data-progress') || 0;
                    const fill = bar.querySelector('.oa-progress-fill');
                    
                    if (fill) {
                        setTimeout(() => {
                            fill.style.width = progress + '%';
                        }, 200);
                    }
                }
            });
        });

        progressBars.forEach(bar => observer.observe(bar));
    }

    // Initialize tooltips
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', showTooltip);
            element.addEventListener('mouseleave', hideTooltip);
        });
    }

    function showTooltip(e) {
        const tooltip = document.createElement('div');
        tooltip.className = 'oa-tooltip';
        tooltip.textContent = e.target.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);

        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
        
        e.target._tooltip = tooltip;
    }

    function hideTooltip(e) {
        if (e.target._tooltip) {
            e.target._tooltip.remove();
            delete e.target._tooltip;
        }
    }

    // Mobile menu functionality
    function initMobileMenu() {
        const menuToggle = document.querySelector('.oa-menu-toggle');
        const mobileMenu = document.querySelector('.oa-mobile-menu');
        
        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', function() {
                mobileMenu.classList.toggle('oa-mobile-menu-open');
                this.setAttribute('aria-expanded', 
                    this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
                );
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                    mobileMenu.classList.remove('oa-mobile-menu-open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    // Course card enhancements
    function initCourseCards() {
        const courseCards = document.querySelectorAll('.oa-course-card');
        
        courseCards.forEach(card => {
            // Add hover effects
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
            
            // Handle favorite button
            const favoriteBtn = card.querySelector('.oa-favorite-btn');
            if (favoriteBtn) {
                favoriteBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.classList.toggle('oa-favorited');
                });
            }
        });
    }

    // Search enhancements
    function initSearchEnhancements() {
        const searchInput = document.querySelector('.oa-search-input');
        const searchResults = document.querySelector('.oa-search-results');
        
        if (searchInput) {
            let searchTimeout;
            
            searchInput.addEventListener('input', function() {
                clearTimeout(searchTimeout);
                const query = this.value.trim();
                
                if (query.length >= 2) {
                    searchTimeout = setTimeout(() => {
                        performSearch(query);
                    }, 300);
                } else if (searchResults) {
                    searchResults.innerHTML = '';
                    searchResults.classList.remove('oa-search-results-visible');
                }
            });
            
            // Hide results when clicking outside
            document.addEventListener('click', function(e) {
                if (!searchInput.contains(e.target) && searchResults) {
                    searchResults.classList.remove('oa-search-results-visible');
                }
            });
        }
    }

    function performSearch(query) {
        // This would integrate with Odoo's search functionality
        console.log('Searching for:', query);
        // Implementation would depend on your specific search requirements
    }

    // Utility functions
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

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

    // Initialize theme when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

    // Scroll to top functionality
    function initScrollToTop() {
        const scrollButton = document.querySelector('.oa-scroll-top');
        
        if (scrollButton) {
            window.addEventListener('scroll', throttle(() => {
                if (window.pageYOffset > 300) {
                    scrollButton.classList.add('oa-scroll-top-visible');
                } else {
                    scrollButton.classList.remove('oa-scroll-top-visible');
                }
            }, 100));
            
            scrollButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Initialize scroll to top
    initScrollToTop();

})();
