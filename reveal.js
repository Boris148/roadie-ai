/* ============================================
   ROADIE AI — Scroll Reveal System
   Adds smooth fade-in animations on scroll
   ============================================ */
(function() {
    'use strict';

    // Elements that get the .reveal class automatically
    var revealSelectors = [
        '.section-tag',
        '.section h2',
        '.section-subtitle',
        '.section p:not(.section-subtitle)',
        '.steps',
        '.features',
        '.pain-list',
        '.stack-items',
        '.stack-total',
        '.faq-accordion',
        '.proof-bar',
        '.two-col',
        '.price-card',
        '.about-grid',
        '.artist-pill',
        '.flow-steps',
        '.cta-content',
        '.page-hero-content',
        '[style*="addon"]',
        'form'
    ];

    // Auto-add .reveal class to matching elements
    function initReveals() {
        revealSelectors.forEach(function(sel) {
            document.querySelectorAll(sel).forEach(function(el) {
                // Don't double-add, and skip elements inside hero (they're already visible)
                if (!el.classList.contains('reveal') && !el.closest('.hero')) {
                    el.classList.add('reveal');
                }
            });
        });
    }

    // Intersection Observer for scroll reveals
    function setupObserver() {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });

        document.querySelectorAll('.reveal, .features, .pain-list, .stack-items, .steps, .faq-accordion').forEach(function(el) {
            observer.observe(el);
        });
    }

    // Hero entrance animation
    function animateHero() {
        var hero = document.querySelector('.hero-content') || document.querySelector('.page-hero-content');
        if (hero) {
            hero.style.opacity = '0';
            hero.style.transform = 'translateY(30px)';
            hero.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
            setTimeout(function() {
                hero.style.opacity = '1';
                hero.style.transform = 'translateY(0)';
            }, 150);
        }
    }

    // Smooth scroll for anchor links
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(a) {
            a.addEventListener('click', function(e) {
                var target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // Nav background on scroll
    function setupNavScroll() {
        var nav = document.querySelector('nav');
        if (!nav) return;
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                nav.style.borderBottomColor = 'rgba(180,0,0,0.08)';
            } else {
                nav.style.borderBottomColor = 'rgba(255,255,255,0.04)';
            }
        }, { passive: true });
    }

    // Init everything
    function init() {
        initReveals();
        setupObserver();
        animateHero();
        setupSmoothScroll();
        setupNavScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
