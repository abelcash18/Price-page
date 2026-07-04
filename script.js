document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM Elements for better performance
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const heroMockup = document.querySelector('.hero-mockup');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // 1. Combined & Throttled Scroll Listener (Handles Navbar, Active State, and Parallax)
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Navbar scroll styling
        if (scrollPos > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Section Highlighting (Active states)
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Safe Parallax Effect (Moves mockup image subtly, instead of shifting the whole container layout)
        if (heroMockup && scrollPos < window.innerHeight) {
            heroMockup.style.transform = `perspective(1000px) rotateY(-10deg) translateY(${scrollPos * 0.1}px)`;
        }
    }, { passive: true });

    // 2. Smooth Navigation and Auto-Collapse Mobile Menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Collapse Bootstrap Mobile Menu if it's open
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }

                // Smooth Scroll to Target
                const offsetTop = targetElement.offsetTop - 75;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Performance-First Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-running'); // Triggers keyframes inside CSS cleanly
                animationObserver.unobserve(entry.target); // Unobserves element once animated
            }
        });
    }, observerOptions);

    document.querySelectorAll('.pricing-card, .testimonial-card').forEach(el => {
        animationObserver.observe(el);
    });

    // 4. Enhanced 3D Mockup Hover Treatment
    if (heroMockup) {
        heroMockup.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateY(0deg) translateY(-10px) scale(1.03)';
            this.style.transition = 'transform 0.4s ease-out';
        });

        heroMockup.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(-10deg)';
        });
    }

    // 5. Service Worker Registration (PWA Ready)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(() => console.log('SW Registered Successfully'))
            .catch(err => console.error('SW Registration Failed:', err));
    }

    console.log('AbelTech Solutions script optimized & active! 🌟');
});