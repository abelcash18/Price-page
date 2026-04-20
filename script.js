document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const priceToggle = document.getElementById('priceToggle');
    const priceToggleText = document.getElementById('priceToggleText');
    
    priceToggle.addEventListener('change', function() {
        const isMonthly = this.checked;
        
        priceToggleText.textContent = isMonthly ? 'One-time' : 'Custom';
        
        document.getElementById('basic-price').textContent = isMonthly ? '#150k' : '#50k';
        document.getElementById('basic-period').textContent = isMonthly ? 'one-time' : '/wk';
        
        document.getElementById('standard-price').textContent = isMonthly ? '#370k' : '#75k';
        document.getElementById('standard-period').textContent = isMonthly ? 'one-time' : '/mo';
        
        document.getElementById('premium-price').textContent = isMonthly ? '#750k' : '#165k';
        document.getElementById('premium-period').textContent = isMonthly ? 'custom quote' : '/mo';
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

document.querySelectorAll('.pricing-card, .testimonial-card, .form-switch').forEach(el => {
        observer.observe(el);
    });


    const heroMockup = document.querySelector('.hero-mockup');
    heroMockup.addEventListener('mouseenter', function() {
        this.style.transform = 'perspective(1000px) rotateY(0deg) translateY(-10px) scale(1.05)';
    });

    heroMockup.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateY(-10deg)';
    });

    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                start = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(start) + '+';
        }, 16);
    }

    document.querySelectorAll('.btn[href="#contact"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            setTimeout(() => {
                const successMsg = document.createElement('div');
                successMsg.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3 z-3';
                successMsg.style.maxWidth = '400px';
                successMsg.innerHTML = `
                    <i class="fas fa-check-circle me-2"></i>
                    Thanks for your interest! We'll contact you within 24 hours.
                `;
                document.body.appendChild(successMsg);
                
                setTimeout(() => {
                    successMsg.remove();
                }, 4000);
            }, 1000);
        });
    });

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const speed = scrolled * 0.5;
        hero.style.transform = `translateY(${speed}px)`;
    });

    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    console.log('Abeltech Solutions landing page loaded successfully! 🚀');
});