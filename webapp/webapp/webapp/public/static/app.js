/**
 * ==========================================
 * YOUSSEF KHAMIS AL-ASSIUTY PORTFOLIO
 * Interactive JavaScript v2.0 - Enhanced
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
        },
        // Typing effect roles
        typingRoles: [
            'Software Engineer',
            'Frontend Developer',
            'UI Designer',
            'Creative Coder',
            'Problem Solver'
        ]
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
        projectModal: document.getElementById('project-modal'),
        easterEgg: document.getElementById('easter-egg'),
        bottomNav: document.getElementById('bottom-nav'),
        testimonialsContainer: document.getElementById('testimonials-container'),
        scrollProgress: document.getElementById('scroll-progress'),
        backToTop: document.getElementById('back-to-top'),
    };

    // ==========================================
    // LOADING SCREEN - ENHANCED
    // ==========================================
    function initLoadingScreen() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                elements.loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'visible';
                initAnimationsOnLoad();
            }, 1500);
        });
    }

    // ==========================================
    // SCROLL PROGRESS BAR
    // ==========================================
    function initScrollProgress() {
        if (!elements.scrollProgress) return;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            elements.scrollProgress.style.width = scrollPercent + '%';
        });
    }

    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    function initBackToTop() {
        if (!elements.backToTop) return;
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                elements.backToTop.classList.add('visible');
            } else {
                elements.backToTop.classList.remove('visible');
            }
        });
        
        elements.backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // CUSTOM CURSOR - SMOOTH & IMPROVED
    // ==========================================
    function initCustomCursor() {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;
        let isMoving = false;
        let rafId = null;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Update dot position immediately (no lag)
            elements.cursorDot.style.left = `${mouseX}px`;
            elements.cursorDot.style.top = `${mouseY}px`;
            
            if (!isMoving) {
                isMoving = true;
                animateCursor();
            }
        });

        function animateCursor() {
            // Smooth easing for outline - follows with slight delay
            const ease = 0.15;
            const dx = mouseX - outlineX;
            const dy = mouseY - outlineY;
            
            outlineX += dx * ease;
            outlineY += dy * ease;

            elements.cursorOutline.style.left = `${outlineX}px`;
            elements.cursorOutline.style.top = `${outlineY}px`;

            // Continue animation if still moving
            if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                rafId = requestAnimationFrame(animateCursor);
            } else {
                isMoving = false;
            }
        }

        // Hover effects for interactive elements
        const hoverElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .magnetic-btn, .project-card, .skill-card');
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

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            elements.cursorDot.style.opacity = '0';
            elements.cursorOutline.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            elements.cursorDot.style.opacity = '1';
            elements.cursorOutline.style.opacity = '0.6';
        });
    }

    // ==========================================
    // MAGNETIC BUTTONS - ENHANCED
    // ==========================================
    function initMagneticButtons() {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        
        const magneticBtns = document.querySelectorAll('.magnetic-btn');
        
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Smoother magnetic effect
                const moveX = x * 0.2;
                const moveY = y * 0.2;
                
                btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
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
                elements.navbar.classList.add('scrolled');
            } else {
                elements.navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });

        // Mobile menu toggle
        elements.navToggle.addEventListener('click', () => {
            elements.navToggle.classList.toggle('active');
            elements.mobileNav.classList.toggle('active');
            document.body.style.overflow = elements.mobileNav.classList.contains('active') ? 'hidden' : 'visible';
        });

        // Close mobile menu on link click
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                elements.navToggle.classList.remove('active');
                elements.mobileNav.classList.remove('active');
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
    // THEME TOGGLE - ENHANCED WITH ANIMATION
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

        elements.themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Add transition class
            document.documentElement.classList.add('theme-transition');
            elements.themeToggle.classList.add('animating');
            
            // Change theme
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Remove transition class after animation
            setTimeout(() => {
                document.documentElement.classList.remove('theme-transition');
                elements.themeToggle.classList.remove('animating');
            }, 500);
        });
    }

    function updateThemeIcon(theme) {
        const icon = elements.themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // ==========================================
    // TYPING EFFECT
    // ==========================================
    function initTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;
        
        const roles = CONFIG.typingRoles;
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentRole.length) {
                // Pause at end
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        type();
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
        let mouseX = 0;
        let mouseY = 0;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resize();
        window.addEventListener('resize', resize);

        // Track mouse for interactive particles
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.originalX = this.x;
                this.originalY = this.y;
            }

            update() {
                // Mouse interaction - particles move away from cursor
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 100;
                
                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    this.x -= (dx / distance) * force * 2;
                    this.y -= (dy / distance) * force * 2;
                }

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
            const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 20000));
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

                    if (distance < 120) {
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - distance / 120)})`;
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
    // SKILL LEVEL ANIMATION - INTERACTIVE
    // ==========================================
    function initSkillAnimations() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, index * 100);
                }
            });
        }, { threshold: 0.3 });

        skillCards.forEach(card => observer.observe(card));
    }

    // ==========================================
    // PROJECT FILTERS
    // ==========================================
    function initProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                // Filter projects with animation
                projectCards.forEach((card, index) => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        setTimeout(() => {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0) scale(1)';
                            }, 50);
                        }, index * 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ==========================================
    // 3D TILT EFFECT - ENHANCED
    // ==========================================
    function initTiltEffect() {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        
        const tiltCards = document.querySelectorAll('[data-tilt]');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                
                // Add shine effect
                const shine = card.querySelector('.project-overlay');
                if (shine) {
                    shine.style.background = `linear-gradient(${Math.atan2(y - centerY, x - centerX) * 180 / Math.PI + 90}deg, 
                        rgba(255,255,255,0.1) 0%, 
                        transparent 50%, 
                        rgba(0,0,0,0.5) 100%)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
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

        function showCard(index) {
            cards.forEach((card, i) => {
                card.classList.remove('active');
                dots[i]?.classList.remove('active');
            });
            
            cards[index]?.classList.add('active');
            dots[index]?.classList.add('active');
        }

        prevBtn?.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            showCard(currentIndex);
        });

        nextBtn?.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            showCard(currentIndex);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showCard(currentIndex);
            });
        });

        // Auto-rotate
        setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            showCard(currentIndex);
        }, 5000);
    }

    // ==========================================
    // PROJECT MODAL - ENHANCED WITH MEDIA
    // ==========================================
    function initProjectModal() {
        const quickViewBtns = document.querySelectorAll('.project-quick-view');
        const modal = elements.projectModal;
        const modalBody = document.getElementById('modal-body');
        const closeBtn = modal?.querySelector('.modal-close');
        const overlay = modal?.querySelector('.modal-overlay');

        const projectData = {
            1: {
                title: 'Modern Dashboard UI',
                description: 'A comprehensive admin dashboard featuring real-time data visualization, dark/light mode, and fully responsive design. Built with React, TypeScript, and Tailwind CSS.',
                features: ['Real-time charts', 'Dark mode support', 'Responsive design', 'Data export'],
                tech: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
                github: 'https://github.com',
                live: '#',
                images: [],
                video: ''
            },
            2: {
                title: 'E-Commerce Platform',
                description: 'A full-stack e-commerce solution with product management, shopping cart, secure payments, and order tracking.',
                features: ['Product catalog', 'Shopping cart', 'Payment integration', 'Order management'],
                tech: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
                github: 'https://github.com',
                live: '#',
                images: [],
                video: ''
            },
            3: {
                title: 'Mobile App Concept',
                description: 'A fitness tracking app design featuring gamification elements, social features, and personalized workout plans.',
                features: ['Activity tracking', 'Social challenges', 'Progress analytics', 'Custom workouts'],
                tech: ['Figma', 'UI Design', 'Prototyping', 'User Research'],
                github: '',
                live: '#',
                images: [],
                video: ''
            },
            4: {
                title: '3D Interactive Experience',
                description: 'An immersive 3D web experience showcasing product visualization with smooth animations and user interactions.',
                features: ['3D models', 'Smooth animations', 'Interactive controls', 'Performance optimized'],
                tech: ['Three.js', 'WebGL', 'GSAP', 'React'],
                github: 'https://github.com',
                live: '#',
                images: [],
                video: ''
            },
            5: {
                title: 'Real-time Chat App',
                description: 'A modern chat application with real-time messaging, file sharing, and group conversations.',
                features: ['Real-time messaging', 'File sharing', 'Group chats', 'Message search'],
                tech: ['React', 'Socket.io', 'Express', 'MongoDB'],
                github: 'https://github.com',
                live: '#',
                images: [],
                video: ''
            },
            6: {
                title: 'Component Library',
                description: 'A comprehensive React component library with documentation, theming support, and accessibility features.',
                features: ['50+ components', 'Theme customization', 'Accessibility', 'Full documentation'],
                tech: ['React', 'Storybook', 'TypeScript', 'CSS Modules'],
                github: 'https://github.com',
                live: '#',
                images: [],
                video: ''
            }
        };

        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const projectId = btn.getAttribute('data-project');
                const project = projectData[projectId];

                if (project) {
                    modalBody.innerHTML = `
                        <div class="modal-project">
                            <h2>${project.title}</h2>
                            <p class="modal-description">${project.description}</p>
                            
                            ${project.images.length > 0 || project.video ? `
                            <div class="modal-media-gallery">
                                ${project.video ? `
                                    <div class="media-item">
                                        <video controls>
                                            <source src="${project.video}" type="video/mp4">
                                        </video>
                                    </div>
                                ` : ''}
                                ${project.images.map(img => `
                                    <div class="media-item">
                                        <img src="${img}" alt="${project.title}">
                                    </div>
                                `).join('')}
                            </div>
                            ` : ''}
                            
                            <div class="modal-features">
                                <h4>Key Features</h4>
                                <ul>
                                    ${project.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="modal-tech">
                                <h4>Technologies</h4>
                                <div class="tech-tags">
                                    ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
                                </div>
                            </div>
                            
                            <div class="modal-links">
                                ${project.github ? `
                                    <a href="${project.github}" target="_blank" rel="noopener" class="btn btn-secondary">
                                        <i class="fab fa-github"></i>
                                        <span>View Source</span>
                                    </a>
                                ` : ''}
                                ${project.live && project.live !== '#' ? `
                                    <a href="${project.live}" target="_blank" rel="noopener" class="btn btn-primary">
                                        <i class="fas fa-external-link-alt"></i>
                                        <span>Live Demo</span>
                                    </a>
                                ` : ''}
                            </div>
                            
                            <div class="modal-note">
                                <i class="fas fa-info-circle"></i>
                                <p>This is a demo project. Links will be updated with real projects soon.</p>
                            </div>
                        </div>
                    `;
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        function closeModal() {
            modal?.classList.remove('active');
            document.body.style.overflow = 'visible';
        }

        closeBtn?.addEventListener('click', closeModal);
        overlay?.addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    // ==========================================
    // CONFETTI EFFECT
    // ==========================================
    function createConfetti() {
        const colors = ['#6366f1', '#8b5cf6', '#a855f7', '#22c55e', '#eab308', '#ef4444'];
        
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: fixed;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -20px;
                z-index: 10001;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }

        // Add confetti animation style if not exists
        if (!document.getElementById('confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.textContent = `
                @keyframes confettiFall {
                    0% { 
                        transform: translateY(0) rotate(0deg); 
                        opacity: 1;
                    }
                    100% { 
                        transform: translateY(100vh) rotate(720deg); 
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ==========================================
    // FORM HANDLING - WITH CONFETTI
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
                        createConfetti(); // Celebrate!
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
                        createConfetti(); // Celebrate!
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
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
            </div>
            <span class="toast-message">${message}</span>
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
                // Hide or disable link if URL not set
                link.style.opacity = '0.5';
                link.style.pointerEvents = 'none';
                link.title = 'Coming soon';
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
        createConfetti();
    }

    window.closeEasterEgg = function() {
        elements.easterEgg?.classList.remove('active');
    };

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
        const animatedElements = document.querySelectorAll('.section-header, .about-grid, .skill-card, .project-card, .process-step, .testimonial-card, .blog-card, .contact-grid');
        
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
    // PWA SERVICE WORKER
    // ==========================================
    function initServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/static/sw.js')
                    .then(registration => {
                        console.log('ServiceWorker registered:', registration.scope);
                    })
                    .catch(err => {
                        console.log('ServiceWorker registration failed:', err);
                    });
            });
        }
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
    // INITIALIZE ALL
    // ==========================================
    function init() {
        initLoadingScreen();
        initScrollProgress();
        initBackToTop();
        initCustomCursor();
        initMagneticButtons();
        initNavbar();
        initThemeToggle();
        initTypingEffect();
        initParticles();
        initCounters();
        initSkillAnimations();
        initProjectFilters();
        initTiltEffect();
        initTestimonialsCarousel();
        initProjectModal();
        initForms();
        initSocialLinks();
        initCVDownload();
        initCalendly();
        initEasterEgg();
        initSmoothScroll();
        initScrollAnimations();
        initMorphingText();
        initTouchGestures();
        // initServiceWorker(); // Uncomment when SW is ready
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
