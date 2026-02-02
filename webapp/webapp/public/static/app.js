/**
 * ==========================================
 * YOUSSEF KHAMIS AL-ASSIUTY PORTFOLIO
 * Interactive JavaScript - Full Upgrade v2.0
 * ==========================================
 */

(function() {
    'use strict';

    // ==========================================
    // CONFIGURATION
    // ==========================================
    const CONFIG = {
        // Social links - update these when available
        socialLinks: {
            github: '',  // e.g., 'https://github.com/youssefkhamis'
            linkedin: '', // e.g., 'https://linkedin.com/in/youssefkhamis'
            twitter: '', // e.g., 'https://twitter.com/youssefkhamis'
            dribbble: '', // e.g., 'https://dribbble.com/youssefkhamis'
        },
        // Calendly link - update when available
        calendlyLink: '', // e.g., 'https://calendly.com/youssefkhamis'
        // CV download links - update when available
        cvLinks: {
            en: '', // e.g., '/static/cv-en.pdf'
            ar: '', // e.g., '/static/cv-ar.pdf'
        }
    };

    // ==========================================
    // DOM ELEMENTS
    // ==========================================
    const elements = {
        loadingScreen: document.getElementById('loading-screen'),
        cursorDot: document.getElementById('cursor-dot'),
        cursorOutline: document.getElementById('cursor-outline'),
        navbar: document.getElementById('navbar'),
        navToggle: document.getElementById('nav-toggle'),
        mobileNav: document.getElementById('mobile-nav'),
        themeToggle: document.getElementById('theme-toggle'),
        particlesCanvas: document.getElementById('particles-canvas'),
        quoteForm: document.getElementById('quote-form'),
        newsletterForm: document.getElementById('newsletter-form'),
        toastContainer: document.getElementById('toast-container'),
        easterEgg: document.getElementById('easter-egg'),
        bottomNav: document.getElementById('bottom-nav'),
        testimonialsContainer: document.getElementById('testimonials-container'),
    };

    // ==========================================
    // LOADING SCREEN
    // ==========================================
    function initLoadingScreen() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (elements.loadingScreen) {
                    elements.loadingScreen.classList.add('hidden');
                }
                document.body.style.overflow = 'visible';
                initAnimationsOnLoad();
            }, 1500);
        });
    }

    // ==========================================
    // CUSTOM CURSOR
    // ==========================================
    function initCustomCursor() {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        if (!elements.cursorDot || !elements.cursorOutline) return;

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.15;
            cursorY += dy * 0.15;

            elements.cursorDot.style.left = `${mouseX}px`;
            elements.cursorDot.style.top = `${mouseY}px`;
            elements.cursorOutline.style.left = `${cursorX}px`;
            elements.cursorOutline.style.top = `${cursorY}px`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .magnetic-btn');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                elements.cursorOutline.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                elements.cursorOutline.classList.remove('hover');
            });
        });

        // Click effects
        document.addEventListener('mousedown', () => {
            elements.cursorOutline.classList.add('click');
        });
        document.addEventListener('mouseup', () => {
            elements.cursorOutline.classList.remove('click');
        });
    }

    // ==========================================
    // MAGNETIC BUTTONS
    // ==========================================
    function initMagneticButtons() {
        const magneticBtns = document.querySelectorAll('.magnetic-btn');
        
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ==========================================
    // NAVBAR
    // ==========================================
    function initNavbar() {
        // Scroll effect
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                elements.navbar?.classList.add('scrolled');
            } else {
                elements.navbar?.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });

        // Mobile menu toggle
        elements.navToggle?.addEventListener('click', () => {
            elements.navToggle.classList.toggle('active');
            elements.mobileNav?.classList.toggle('active');
            document.body.style.overflow = elements.mobileNav?.classList.contains('active') ? 'hidden' : 'visible';
        });

        // Close mobile menu on link click
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                elements.navToggle?.classList.remove('active');
                elements.mobileNav?.classList.remove('active');
                document.body.style.overflow = 'visible';
            });
        });

        // Active nav link on scroll
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    document.querySelector(`.nav-link[data-section="${sectionId}"]`)?.classList.add('active');
                    
                    // Update bottom nav
                    document.querySelectorAll('.bottom-nav-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    document.querySelector(`.bottom-nav-item[data-section="${sectionId}"]`)?.classList.add('active');
                }
            });
        });
    }

    // ==========================================
    // THEME TOGGLE
    // ==========================================
    function initThemeToggle() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme);
        } else if (prefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            updateThemeIcon('dark');
        }

        elements.themeToggle?.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        const icon = elements.themeToggle?.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // ==========================================
    // PARTICLES ANIMATION
    // ==========================================
    function initParticles() {
        const canvas = elements.particlesCanvas;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            particles = [];
            const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            particles.forEach((a, indexA) => {
                particles.slice(indexA + 1).forEach(b => {
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                });
            });

            animationId = requestAnimationFrame(animate);
        }

        init();
        animate();

        // Pause animation when not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(animationId);
            } else {
                animate();
            }
        });
    }

    // ==========================================
    // COUNTER ANIMATION
    // ==========================================
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    function animateCounter(element, target) {
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    // ==========================================
    // SKILL LEVEL ANIMATION - FIXED
    // ==========================================
    function initSkillAnimations() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Animate the level fill
                    const levelFill = entry.target.querySelector('.level-fill');
                    if (levelFill) {
                        const level = levelFill.getAttribute('data-level');
                        if (level) {
                            levelFill.style.setProperty('--skill-level', level + '%');
                            // Trigger animation
                            setTimeout(() => {
                                levelFill.style.width = level + '%';
                            }, 100);
                        }
                    }
                }
            });
        }, { threshold: 0.3 });

        skillCards.forEach(card => {
            // Ensure icons stay visible
            const icon = card.querySelector('.skill-icon');
            if (icon) {
                icon.style.opacity = '1';
                icon.style.visibility = 'visible';
            }
            observer.observe(card);
        });
    }

    // ==========================================
    // PROJECT FILTERS
    // ==========================================
    function initProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card-container');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                // Filter projects
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ==========================================
    // PROJECT FLIP CARDS
    // ==========================================
    function initProjectFlipCards() {
        // Flip buttons (front to back)
        const flipBtns = document.querySelectorAll('.project-flip-btn');
        flipBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = btn.getAttribute('data-project');
                const container = document.querySelector(`#project-flipper-${projectId}`)?.closest('.project-card-container');
                
                if (container) {
                    // Close any other open cards
                    document.querySelectorAll('.project-card-container.flipped').forEach(card => {
                        if (card !== container) {
                            card.classList.remove('flipped');
                        }
                    });
                    
                    container.classList.add('flipped');
                }
            });
        });

        // Close buttons (back to front)
        const closeBtns = document.querySelectorAll('.project-close-btn');
        closeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = btn.getAttribute('data-project');
                const container = document.querySelector(`#project-flipper-${projectId}`)?.closest('.project-card-container');
                
                if (container) {
                    container.classList.remove('flipped');
                }
            });
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.project-card-container')) {
                document.querySelectorAll('.project-card-container.flipped').forEach(card => {
                    card.classList.remove('flipped');
                });
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.project-card-container.flipped').forEach(card => {
                    card.classList.remove('flipped');
                });
            }
        });
    }

    // ==========================================
    // TESTIMONIALS CAROUSEL
    // ==========================================
    function initTestimonialsCarousel() {
        const container = elements.testimonialsContainer;
        if (!container) return;

        const cards = container.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.carousel-dots .dot');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        let currentIndex = 0;
        let autoRotateInterval;

        function showCard(index) {
            cards.forEach((card, i) => {
                card.classList.remove('active');
                dots[i]?.classList.remove('active');
            });
            
            cards[index]?.classList.add('active');
            dots[index]?.classList.add('active');
        }

        function startAutoRotate() {
            autoRotateInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % cards.length;
                showCard(currentIndex);
            }, 5000);
        }

        function stopAutoRotate() {
            clearInterval(autoRotateInterval);
        }

        prevBtn?.addEventListener('click', () => {
            stopAutoRotate();
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            showCard(currentIndex);
            startAutoRotate();
        });

        nextBtn?.addEventListener('click', () => {
            stopAutoRotate();
            currentIndex = (currentIndex + 1) % cards.length;
            showCard(currentIndex);
            startAutoRotate();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoRotate();
                currentIndex = index;
                showCard(currentIndex);
                startAutoRotate();
            });
        });

        startAutoRotate();
    }

    // ==========================================
    // FORM HANDLING
    // ==========================================
    function initForms() {
        // Quote Form
        const quoteForm = elements.quoteForm;
        if (quoteForm) {
            quoteForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                if (!validateForm(quoteForm)) return;

                const submitBtn = quoteForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                const formData = new FormData(quoteForm);
                const data = Object.fromEntries(formData.entries());

                try {
                    const response = await fetch('/api/quote', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });

                    const result = await response.json();

                    if (result.success) {
                        showToast(result.message, 'success');
                        quoteForm.reset();
                    } else {
                        showToast(result.message || 'Something went wrong', 'error');
                    }
                } catch (error) {
                    showToast('Failed to send request. Please try again.', 'error');
                }

                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        }

        // Newsletter Form
        const newsletterForm = elements.newsletterForm;
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                const email = emailInput.value;

                if (!email || !isValidEmail(email)) {
                    showToast('Please enter a valid email address', 'error');
                    return;
                }

                const submitBtn = newsletterForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;

                try {
                    const response = await fetch('/api/newsletter', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email })
                    });

                    const result = await response.json();

                    if (result.success) {
                        showToast(result.message, 'success');
                        newsletterForm.reset();
                    } else {
                        showToast(result.message || 'Something went wrong', 'error');
                    }
                } catch (error) {
                    showToast('Failed to subscribe. Please try again.', 'error');
                }

                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        }
    }

    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            const formGroup = field.closest('.form-group');
            const errorMessage = formGroup?.querySelector('.error-message');

            if (!field.value.trim()) {
                formGroup?.classList.add('error');
                if (errorMessage) errorMessage.textContent = 'This field is required';
                isValid = false;
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                formGroup?.classList.add('error');
                if (errorMessage) errorMessage.textContent = 'Please enter a valid email';
                isValid = false;
            } else {
                formGroup?.classList.remove('error');
            }
        });

        return isValid;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ==========================================
    // TOAST NOTIFICATIONS
    // ==========================================
    function showToast(message, type = 'success') {
        const iconMap = {
            success: 'check',
            error: 'exclamation',
            info: 'info'
        };
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-${iconMap[type] || 'info'}"></i>
            </div>
            <span class="toast-message">${escapeHtml(message)}</span>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;

        elements.toastContainer?.appendChild(toast);

        const closeBtn = toast.querySelector('.toast-close');
        closeBtn?.addEventListener('click', () => removeToast(toast));

        setTimeout(() => removeToast(toast), 5000);
    }

    function removeToast(toast) {
        toast.style.animation = 'toastOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }

    // ==========================================
    // HELPER FUNCTIONS
    // ==========================================
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ==========================================
    // SOCIAL LINKS HANDLING
    // ==========================================
    function initSocialLinks() {
        const socialLinks = document.querySelectorAll('[data-social]');
        
        socialLinks.forEach(link => {
            const platform = link.getAttribute('data-social');
            const url = CONFIG.socialLinks[platform];

            if (url) {
                link.href = url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            } else {
                // Visual indicator for placeholder links
                link.style.opacity = '0.5';
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    showToast('Social link coming soon!', 'info');
                });
            }
        });
    }

    // ==========================================
    // CV DOWNLOAD HANDLING
    // ==========================================
    function initCVDownload() {
        const cvBtns = document.querySelectorAll('.cv-download');
        
        cvBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = btn.getAttribute('data-lang');
                const url = CONFIG.cvLinks[lang];

                if (url) {
                    window.open(url, '_blank');
                } else {
                    e.preventDefault();
                    showToast('CV will be available for download soon!', 'info');
                }
            });
        });
    }

    // ==========================================
    // CALENDLY INTEGRATION
    // ==========================================
    function initCalendly() {
        const calendlyBtns = document.querySelectorAll('.calendly-btn');
        
        calendlyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (CONFIG.calendlyLink) {
                    window.open(CONFIG.calendlyLink, '_blank');
                } else {
                    showToast('Booking calendar coming soon!', 'info');
                }
            });
        });
    }

    // ==========================================
    // EASTER EGG - KONAMI CODE
    // ==========================================
    function initEasterEgg() {
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;

        document.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    triggerEasterEgg();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }

    function triggerEasterEgg() {
        elements.easterEgg?.classList.add('active');
        
        // Add confetti effect
        createConfetti();
    }

    window.closeEasterEgg = function() {
        elements.easterEgg?.classList.remove('active');
    };

    function createConfetti() {
        const colors = ['#6366f1', '#8b5cf6', '#a855f7', '#22c55e', '#eab308'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                z-index: 10001;
                animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }

        // Add confetti animation style
        if (!document.getElementById('confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.textContent = `
                @keyframes confettiFall {
                    to {
                        top: 100vh;
                        transform: rotate(720deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ==========================================
    // SMOOTH SCROLL
    // ==========================================
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.section-header, .about-grid, .project-card-container, .process-step, .testimonial-card, .blog-card, .contact-grid');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ==========================================
    // MORPHING TEXT
    // ==========================================
    function initMorphingText() {
        const texts = ['Youssef Khamis', 'Creative Dev', 'Vibe Coder'];
        let currentIndex = 0;
        const morphingText = document.getElementById('morphing-name');
        
        if (!morphingText) return;

        setInterval(() => {
            morphingText.style.opacity = '0';
            morphingText.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % texts.length;
                morphingText.textContent = texts[currentIndex];
                morphingText.style.opacity = '1';
                morphingText.style.transform = 'translateY(0)';
            }, 300);
        }, 3000);

        morphingText.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }

    // ==========================================
    // ANIMATIONS ON LOAD
    // ==========================================
    function initAnimationsOnLoad() {
        // Trigger title animations
        document.querySelectorAll('.title-word').forEach(word => {
            word.style.animationPlayState = 'running';
        });
    }

    // ==========================================
    // TOUCH GESTURES FOR MOBILE
    // ==========================================
    function initTouchGestures() {
        let touchStartX = 0;
        let touchEndX = 0;

        const sections = ['home', 'about', 'skills', 'projects', 'process', 'testimonials', 'blog', 'contact'];
        let currentSectionIndex = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 100;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                // Determine current section
                const scrollPosition = window.scrollY;
                sections.forEach((section, index) => {
                    const el = document.getElementById(section);
                    if (el && scrollPosition >= el.offsetTop - 100) {
                        currentSectionIndex = index;
                    }
                });

                if (diff > 0 && currentSectionIndex < sections.length - 1) {
                    // Swipe left - go to next section
                    const nextSection = document.getElementById(sections[currentSectionIndex + 1]);
                    nextSection?.scrollIntoView({ behavior: 'smooth' });
                } else if (diff < 0 && currentSectionIndex > 0) {
                    // Swipe right - go to previous section
                    const prevSection = document.getElementById(sections[currentSectionIndex - 1]);
                    prevSection?.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }

    // ==========================================
    // PROFILE IMAGE VERIFICATION
    // ==========================================
    function verifyProfileImages() {
        const profileImages = document.querySelectorAll('.profile-img, .about-profile-img, .nav-profile-img, .mobile-profile-img');
        
        profileImages.forEach(img => {
            // Ensure image is visible
            img.style.display = 'block';
            img.style.visibility = 'visible';
            img.style.opacity = '1';
            
            // Handle load errors
            img.onerror = function() {
                // Fallback to a gradient placeholder
                this.style.display = 'none';
                const parent = this.parentElement;
                if (parent) {
                    parent.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)';
                }
            };
        });
    }

    // ==========================================
    // INITIALIZE ALL
    // ==========================================
    function init() {
        initLoadingScreen();
        initCustomCursor();
        initMagneticButtons();
        initNavbar();
        initThemeToggle();
        initParticles();
        initCounters();
        initSkillAnimations();
        initProjectFilters();
        initProjectFlipCards();
        initTestimonialsCarousel();
        initForms();
        initSocialLinks();
        initCVDownload();
        initCalendly();
        initEasterEgg();
        initSmoothScroll();
        initScrollAnimations();
        initMorphingText();
        initTouchGestures();
        verifyProfileImages();
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
