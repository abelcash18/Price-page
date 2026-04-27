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
    
    const annualPrices = { basic: 150000, standard: 370000, premium: 750000 };
    const monthlyPrices = { basic: Math.round(annualPrices.basic / 12), standard: Math.round(annualPrices.standard / 12), premium: Math.round(annualPrices.premium / 12) };
    const savingsPercent = 5; 
    
    function formatPrice(price) {
        return '₦' + price.toLocaleString();
    }
    
    function updatePricing(isAnnual) {
        const prices = isAnnual ? annualPrices : monthlyPrices;
        const period = isAnnual ? '/year' : '/month';
        const savingsText = isAnnual ? ` <small class="badge bg-success ms-2">Save ${savingsPercent}%</small>` : '';
        
        priceToggleText.innerHTML = isAnnual ? 'Annual' + savingsText : 'Monthly';
        
        document.getElementById('basic-price').innerHTML = formatPrice(prices.basic) + (isAnnual ? '<small class="text-muted d-block">/year</small>' : '<small class="text-muted d-block">/month</small>');
        document.getElementById('basic-period').textContent = period;
        
        document.getElementById('standard-price').innerHTML = formatPrice(prices.standard) + (isAnnual ? '<small class="text-muted d-block">/year</small>' : '<small class="text-muted d-block">/month</small>');
        document.getElementById('standard-period').textContent = period;
        
        document.getElementById('premium-price').innerHTML = formatPrice(prices.premium) + (isAnnual ? '<small class="text-muted d-block">/year</small>' : '<small class="text-muted d-block">/month</small>');
        document.getElementById('premium-period').textContent = isAnnual ? '/year (custom quote available)' : '/month';
    }
    
    updatePricing(true);
    
    priceToggle.addEventListener('change', function() {
        updatePricing(this.checked);
        
        document.querySelectorAll('.price-section h2').forEach(h2 => {
            h2.style.transition = 'opacity 0.3s ease';
            h2.style.opacity = '0.5';
            setTimeout(() => h2.style.opacity = '1', 150);
        });
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

            if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW registered'))
            .catch(err => console.log('SW registration failed'));
    }
    
    console.log('AbelTech Solutions modern pricing page loaded! 🌟 Dark mode & PWA ready.');
});
