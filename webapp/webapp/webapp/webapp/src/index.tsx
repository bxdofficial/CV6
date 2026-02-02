import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-pages'
import { cors } from 'hono/cors'

const app = new Hono()

// Enable CORS
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './' }))

// API Routes
app.post('/api/quote', async (c) => {
  try {
    const body = await c.req.json()
    // In production, this would send to email/database
    console.log('Quote request:', body)
    return c.json({ 
      success: true, 
      message: 'Thank you! Your quote request has been received. I\'ll get back to you within 24 hours.' 
    })
  } catch (error) {
    return c.json({ success: false, message: 'Error processing request' }, 400)
  }
})

app.post('/api/newsletter', async (c) => {
  try {
    const { email } = await c.req.json()
    // In production, this would add to newsletter service
    console.log('Newsletter subscription:', email)
    return c.json({ 
      success: true, 
      message: 'Successfully subscribed! You\'ll receive updates on my latest work.' 
    })
  } catch (error) {
    return c.json({ success: false, message: 'Error processing subscription' }, 400)
  }
})

app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json()
    console.log('Contact form:', body)
    return c.json({ 
      success: true, 
      message: 'Message sent successfully! I\'ll respond within 24 hours.' 
    })
  } catch (error) {
    return c.json({ success: false, message: 'Error sending message' }, 400)
  }
})

// Main page
app.get('/', (c) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Youssef Khamis Al-Assiuty | Software Engineer</title>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="Software Engineer passionate about building modern, scalable, and interactive digital experiences. Specializing in Frontend Development with a vibe-coding mindset.">
    <meta name="keywords" content="Software Engineer, Frontend Developer, Web Development, React, JavaScript, TypeScript, UI/UX, Freelance Developer">
    <meta name="author" content="Youssef Khamis Al-Assiuty">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph -->
    <meta property="og:title" content="Youssef Khamis Al-Assiuty | Software Engineer">
    <meta property="og:description" content="Building modern, scalable, and interactive digital experiences with a creative engineering mindset.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://youssefkhamis.dev">
    <meta property="og:image" content="/static/og-image.png">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Youssef Khamis Al-Assiuty | Software Engineer">
    <meta name="twitter:description" content="Building modern, scalable, and interactive digital experiences.">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Youssef Khamis Al-Assiuty",
        "jobTitle": "Software Engineer",
        "description": "Software Engineer passionate about building modern, scalable, and interactive digital experiences.",
        "url": "https://youssefkhamis.dev",
        "sameAs": [
            "https://github.com/youssefkhamis",
            "https://linkedin.com/in/youssefkhamis"
        ]
    }
    </script>
    
    <!-- PWA Manifest -->
    <link rel="manifest" href="/static/manifest.json">
    <meta name="theme-color" content="#6366f1">
    <link rel="apple-touch-icon" href="/static/icon-192.png">
    
    <!-- Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    
    <!-- Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css">
    
    <!-- Styles -->
    <link rel="stylesheet" href="/static/styles.css">
</head>
<body>
    <!-- Scroll Progress Bar -->
    <div class="scroll-progress" id="scroll-progress"></div>
    
    <!-- Floating Elements -->
    <div class="floating-elements">
        <div class="floating-shape shape-1"></div>
        <div class="floating-shape shape-2"></div>
        <div class="floating-shape shape-3"></div>
        <div class="floating-shape shape-4"></div>
        <div class="floating-shape shape-5"></div>
    </div>
    
    <!-- Custom Cursor -->
    <div class="cursor-dot" id="cursor-dot"></div>
    <div class="cursor-outline" id="cursor-outline"></div>
    
    <!-- Back to Top Button -->
    <button class="back-to-top" id="back-to-top" aria-label="Back to top">
        <i class="fas fa-arrow-up"></i>
    </button>
    
    <!-- Loading Screen -->
    <div class="loading-screen" id="loading-screen">
        <div class="loader">
            <div class="loader-logo">
                <span>YK</span>
            </div>
            <div class="loader-text">
                <span>Y</span><span>O</span><span>U</span><span>S</span><span>S</span><span>E</span><span>F</span>
            </div>
            <div class="loader-bar">
                <div class="loader-progress"></div>
            </div>
        </div>
    </div>
    
    <!-- Navigation -->
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="#home" class="nav-logo magnetic-btn">
                <span class="logo-text">YK</span>
                <span class="logo-dot"></span>
            </a>
            
            <div class="nav-links" id="nav-links">
                <a href="#home" class="nav-link active" data-section="home">Home</a>
                <a href="#about" class="nav-link" data-section="about">About</a>
                <a href="#skills" class="nav-link" data-section="skills">Skills</a>
                <a href="#projects" class="nav-link" data-section="projects">Projects</a>
                <a href="#process" class="nav-link" data-section="process">Process</a>
                <a href="#testimonials" class="nav-link" data-section="testimonials">Testimonials</a>
                <a href="#blog" class="nav-link" data-section="blog">Blog</a>
                <a href="#contact" class="nav-link" data-section="contact">Contact</a>
            </div>
            
            <div class="nav-actions">
                <button class="theme-toggle magnetic-btn" id="theme-toggle" aria-label="Toggle theme">
                    <i class="fas fa-moon"></i>
                </button>
                <a href="#contact" class="nav-cta magnetic-btn">
                    <span>Hire Me</span>
                    <i class="fas fa-arrow-right"></i>
                </a>
                <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </nav>
    
    <!-- Mobile Navigation -->
    <div class="mobile-nav" id="mobile-nav">
        <div class="mobile-nav-content">
            <div class="mobile-nav-links">
                <a href="#home" class="mobile-nav-link">Home</a>
                <a href="#about" class="mobile-nav-link">About</a>
                <a href="#skills" class="mobile-nav-link">Skills</a>
                <a href="#projects" class="mobile-nav-link">Projects</a>
                <a href="#process" class="mobile-nav-link">Process</a>
                <a href="#testimonials" class="mobile-nav-link">Testimonials</a>
                <a href="#blog" class="mobile-nav-link">Blog</a>
                <a href="#contact" class="mobile-nav-link">Contact</a>
            </div>
            <div class="mobile-nav-footer">
                <div class="mobile-social-links">
                    <a href="#" class="social-link" aria-label="GitHub"><i class="fab fa-github"></i></a>
                    <a href="#" class="social-link" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                    <a href="#" class="social-link" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="hero-bg">
            <div class="animated-bg"></div>
            <canvas id="particles-canvas"></canvas>
            <div class="gradient-orb orb-1"></div>
            <div class="gradient-orb orb-2"></div>
            <div class="gradient-orb orb-3"></div>
            <div class="noise-overlay"></div>
        </div>
        
        <div class="hero-content">
            <div class="hero-badge glass-card">
                <span class="badge-dot"></span>
                <span>Available for opportunities</span>
            </div>
            
            <h1 class="hero-title">
                <span class="title-line">
                    <span class="title-word" data-text="Hi, I'm">Hi, I'm</span>
                </span>
                <span class="title-line title-name">
                    <span class="title-word morphing-text" id="morphing-name">Youssef Khamis</span>
                </span>
                <span class="title-line">
                    <span class="title-word gradient-text typing-text">Software Engineer</span>
                </span>
            </h1>
            
            <p class="hero-description">
                Building <span class="highlight">modern</span>, <span class="highlight">scalable</span>, and <span class="highlight">interactive</span> digital experiences with a vibe-coding mindset and creative engineering approach.
            </p>
            
            <div class="hero-cta">
                <a href="#contact" class="btn btn-primary magnetic-btn">
                    <span>Work With Me</span>
                    <i class="fas fa-arrow-right"></i>
                </a>
                <a href="#projects" class="btn btn-secondary magnetic-btn">
                    <span>View Projects</span>
                    <i class="fas fa-folder-open"></i>
                </a>
            </div>
            
            <div class="hero-stats">
                <div class="stat-item glass-card">
                    <span class="stat-number counter" data-target="3">0</span>
                    <span class="stat-plus">+</span>
                    <span class="stat-label">Years Experience</span>
                </div>
                <div class="stat-item glass-card">
                    <span class="stat-number counter" data-target="25">0</span>
                    <span class="stat-plus">+</span>
                    <span class="stat-label">Projects Completed</span>
                </div>
                <div class="stat-item glass-card">
                    <span class="stat-number counter" data-target="15">0</span>
                    <span class="stat-plus">+</span>
                    <span class="stat-label">Happy Clients</span>
                </div>
            </div>
        </div>
        
        <div class="scroll-indicator">
            <div class="mouse">
                <div class="wheel"></div>
            </div>
            <span>Scroll Down</span>
        </div>
        
        <div class="hero-social">
            <a href="#" class="social-link magnetic-btn" aria-label="GitHub" data-social="github">
                <i class="fab fa-github"></i>
            </a>
            <a href="#" class="social-link magnetic-btn" aria-label="LinkedIn" data-social="linkedin">
                <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="#" class="social-link magnetic-btn" aria-label="Twitter" data-social="twitter">
                <i class="fab fa-twitter"></i>
            </a>
            <a href="mailto:hello@youssefkhamis.dev" class="social-link magnetic-btn" aria-label="Email">
                <i class="fas fa-envelope"></i>
            </a>
        </div>
    </section>
    
    <!-- About Section -->
    <section class="section about" id="about">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">About Me</span>
                <h2 class="section-title">
                    Crafting Digital <span class="gradient-text">Experiences</span>
                </h2>
            </div>
            
            <div class="about-grid">
                <div class="about-image">
                    <div class="image-wrapper glass-card">
                        <div class="image-placeholder">
                            <i class="fas fa-user"></i>
                            <span>Photo Coming Soon</span>
                        </div>
                        <div class="image-decoration"></div>
                    </div>
                    <div class="experience-badge glass-card">
                        <span class="exp-number">3+</span>
                        <span class="exp-text">Years of Experience</span>
                    </div>
                </div>
                
                <div class="about-content">
                    <div class="about-text">
                        <p class="lead">
                            Software Engineer passionate about building modern, scalable, and interactive digital experiences using the latest technologies.
                        </p>
                        <p>
                            Driven by a <strong>vibe-coding mindset</strong> and <strong>creative engineering approach</strong>, I specialize in crafting elegant solutions that not only work flawlessly but also delight users with their design and interactivity.
                        </p>
                        <p>
                            My focus lies in frontend development, where I bring designs to life with clean, scalable code. I believe in the power of modern technologies to create exceptional user experiences that stand out in today's digital landscape.
                        </p>
                    </div>
                    
                    <div class="about-highlights">
                        <div class="highlight-item glass-card">
                            <div class="highlight-icon">
                                <i class="fas fa-code"></i>
                            </div>
                            <div class="highlight-content">
                                <h4>Clean Code</h4>
                                <p>Writing maintainable, scalable, and well-documented code</p>
                            </div>
                        </div>
                        <div class="highlight-item glass-card">
                            <div class="highlight-icon">
                                <i class="fas fa-lightbulb"></i>
                            </div>
                            <div class="highlight-content">
                                <h4>Creative Solutions</h4>
                                <p>Innovative approaches to complex problems</p>
                            </div>
                        </div>
                        <div class="highlight-item glass-card">
                            <div class="highlight-icon">
                                <i class="fas fa-rocket"></i>
                            </div>
                            <div class="highlight-content">
                                <h4>Modern Tech</h4>
                                <p>Staying current with latest technologies</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="about-actions">
                        <a href="#" class="btn btn-primary magnetic-btn cv-download" data-lang="en">
                            <i class="fas fa-download"></i>
                            <span>Download CV (EN)</span>
                        </a>
                        <a href="#" class="btn btn-outline magnetic-btn cv-download" data-lang="ar">
                            <i class="fas fa-download"></i>
                            <span>Download CV (AR)</span>
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- Currently Section -->
            <div class="currently-section">
                <h3 class="currently-title">Currently</h3>
                <div class="currently-grid">
                    <div class="currently-item glass-card">
                        <div class="currently-icon">
                            <i class="fas fa-bullseye"></i>
                        </div>
                        <div class="currently-content">
                            <span class="currently-label">Focused On</span>
                            <p>Building scalable web applications & improving UX patterns</p>
                        </div>
                    </div>
                    <div class="currently-item glass-card">
                        <div class="currently-icon">
                            <i class="fas fa-book-open"></i>
                        </div>
                        <div class="currently-content">
                            <span class="currently-label">Learning</span>
                            <p>Advanced React patterns, Web3 technologies & AI integration</p>
                        </div>
                    </div>
                    <div class="currently-item glass-card">
                        <div class="currently-icon">
                            <i class="fas fa-hammer"></i>
                        </div>
                        <div class="currently-content">
                            <span class="currently-label">Building</span>
                            <p>An innovative SaaS product (coming soon!)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Skills Section -->
    <section class="section skills" id="skills">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">Expertise</span>
                <h2 class="section-title">
                    Skills & <span class="gradient-text">Technologies</span>
                </h2>
                <p class="section-description">
                    A comprehensive toolkit for building exceptional digital products
                </p>
            </div>
            
            <div class="skills-container">
                <!-- Primary Skills -->
                <div class="skills-category">
                    <h3 class="category-title">
                        <i class="fas fa-star"></i>
                        Primary Focus
                    </h3>
                    <div class="skills-grid primary-skills">
                        <div class="skill-card glass-card" data-skill="react">
                            <div class="skill-icon">
                                <i class="fab fa-react"></i>
                            </div>
                            <h4 class="skill-name">React</h4>
                            <div class="skill-level">
                                <div class="level-bar">
                                    <div class="level-fill" style="--level: 95%"></div>
                                </div>
                                <span class="level-text">Expert</span>
                            </div>
                        </div>
                        
                        <div class="skill-card glass-card" data-skill="typescript">
                            <div class="skill-icon">
                                <i class="fab fa-js-square"></i>
                            </div>
                            <h4 class="skill-name">TypeScript</h4>
                            <div class="skill-level">
                                <div class="level-bar">
                                    <div class="level-fill" style="--level: 90%"></div>
                                </div>
                                <span class="level-text">Expert</span>
                            </div>
                        </div>
                        
                        <div class="skill-card glass-card" data-skill="nextjs">
                            <div class="skill-icon">
                                <i class="fab fa-react"></i>
                            </div>
                            <h4 class="skill-name">Next.js</h4>
                            <div class="skill-level">
                                <div class="level-bar">
                                    <div class="level-fill" style="--level: 88%"></div>
                                </div>
                                <span class="level-text">Advanced</span>
                            </div>
                        </div>
                        
                        <div class="skill-card glass-card" data-skill="css">
                            <div class="skill-icon">
                                <i class="fab fa-css3-alt"></i>
                            </div>
                            <h4 class="skill-name">CSS/Tailwind</h4>
                            <div class="skill-level">
                                <div class="level-bar">
                                    <div class="level-fill" style="--level: 95%"></div>
                                </div>
                                <span class="level-text">Expert</span>
                            </div>
                        </div>
                        
                        <div class="skill-card glass-card" data-skill="javascript">
                            <div class="skill-icon">
                                <i class="fab fa-js"></i>
                            </div>
                            <h4 class="skill-name">JavaScript</h4>
                            <div class="skill-level">
                                <div class="level-bar">
                                    <div class="level-fill" style="--level: 95%"></div>
                                </div>
                                <span class="level-text">Expert</span>
                            </div>
                        </div>
                        
                        <div class="skill-card glass-card" data-skill="html">
                            <div class="skill-icon">
                                <i class="fab fa-html5"></i>
                            </div>
                            <h4 class="skill-name">HTML5</h4>
                            <div class="skill-level">
                                <div class="level-bar">
                                    <div class="level-fill" style="--level: 98%"></div>
                                </div>
                                <span class="level-text">Expert</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Supporting Skills -->
                <div class="skills-category">
                    <h3 class="category-title">
                        <i class="fas fa-layer-group"></i>
                        Supporting Skills
                    </h3>
                    <div class="skills-grid supporting-skills">
                        <div class="skill-card glass-card small">
                            <div class="skill-icon">
                                <i class="fab fa-node-js"></i>
                            </div>
                            <h4 class="skill-name">Node.js</h4>
                            <span class="skill-badge">Backend</span>
                        </div>
                        
                        <div class="skill-card glass-card small">
                            <div class="skill-icon">
                                <i class="fas fa-database"></i>
                            </div>
                            <h4 class="skill-name">APIs & REST</h4>
                            <span class="skill-badge">Integration</span>
                        </div>
                        
                        <div class="skill-card glass-card small">
                            <div class="skill-icon">
                                <i class="fab fa-figma"></i>
                            </div>
                            <h4 class="skill-name">UI/UX Design</h4>
                            <span class="skill-badge">Design</span>
                        </div>
                        
                        <div class="skill-card glass-card small">
                            <div class="skill-icon">
                                <i class="fab fa-git-alt"></i>
                            </div>
                            <h4 class="skill-name">Git</h4>
                            <span class="skill-badge">Version Control</span>
                        </div>
                        
                        <div class="skill-card glass-card small">
                            <div class="skill-icon">
                                <i class="fas fa-cloud"></i>
                            </div>
                            <h4 class="skill-name">Cloud Services</h4>
                            <span class="skill-badge">DevOps</span>
                        </div>
                        
                        <div class="skill-card glass-card small">
                            <div class="skill-icon">
                                <i class="fas fa-mobile-alt"></i>
                            </div>
                            <h4 class="skill-name">Responsive Design</h4>
                            <span class="skill-badge">Mobile-First</span>
                        </div>
                    </div>
                </div>
                
                <!-- Tools -->
                <div class="skills-category">
                    <h3 class="category-title">
                        <i class="fas fa-tools"></i>
                        Tools & Platforms
                    </h3>
                    <div class="tools-marquee">
                        <div class="marquee-content">
                            <span class="tool-item"><i class="fab fa-github"></i> GitHub</span>
                            <span class="tool-item"><i class="fab fa-figma"></i> Figma</span>
                            <span class="tool-item"><i class="fas fa-code"></i> VS Code</span>
                            <span class="tool-item"><i class="fab fa-npm"></i> npm</span>
                            <span class="tool-item"><i class="fas fa-terminal"></i> Terminal</span>
                            <span class="tool-item"><i class="fab fa-docker"></i> Docker</span>
                            <span class="tool-item"><i class="fas fa-cloud"></i> Vercel</span>
                            <span class="tool-item"><i class="fas fa-bolt"></i> Vite</span>
                            <span class="tool-item"><i class="fab fa-github"></i> GitHub</span>
                            <span class="tool-item"><i class="fab fa-figma"></i> Figma</span>
                            <span class="tool-item"><i class="fas fa-code"></i> VS Code</span>
                            <span class="tool-item"><i class="fab fa-npm"></i> npm</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Projects Section -->
    <section class="section projects" id="projects">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">Portfolio</span>
                <h2 class="section-title">
                    Featured <span class="gradient-text">Projects</span>
                </h2>
                <p class="section-description">
                    A showcase of my recent work and experiments
                </p>
                <div class="demo-notice glass-card">
                    <i class="fas fa-info-circle"></i>
                    <span>These are demo projects showcasing my skills. Real projects coming soon!</span>
                </div>
            </div>
            
            <div class="projects-filter">
                <button class="filter-btn active" data-filter="all">All</button>
                <button class="filter-btn" data-filter="frontend">Frontend</button>
                <button class="filter-btn" data-filter="fullstack">Full Stack</button>
                <button class="filter-btn" data-filter="ui">UI/UX</button>
            </div>
            
            <div class="projects-grid">
                <!-- Project 1 -->
                <div class="project-card glass-card" data-category="frontend" data-tilt>
                    <div class="project-image">
                        <div class="project-placeholder gradient-bg-1">
                            <i class="fas fa-palette"></i>
                        </div>
                        <div class="project-overlay">
                            <button class="project-quick-view" data-project="1">
                                <i class="fas fa-expand"></i>
                                Quick View
                            </button>
                        </div>
                    </div>
                    <div class="project-content">
                        <div class="project-tags">
                            <span class="tag">React</span>
                            <span class="tag">TypeScript</span>
                            <span class="tag">Tailwind</span>
                        </div>
                        <h3 class="project-title">Modern Dashboard UI</h3>
                        <p class="project-description">
                            A sleek admin dashboard with data visualization, dark mode, and responsive design.
                        </p>
                        <div class="project-links">
                            <a href="#" class="project-link magnetic-btn">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="#" class="project-link magnetic-btn">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Project 2 -->
                <div class="project-card glass-card" data-category="fullstack" data-tilt>
                    <div class="project-image">
                        <div class="project-placeholder gradient-bg-2">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                        <div class="project-overlay">
                            <button class="project-quick-view" data-project="2">
                                <i class="fas fa-expand"></i>
                                Quick View
                            </button>
                        </div>
                    </div>
                    <div class="project-content">
                        <div class="project-tags">
                            <span class="tag">Next.js</span>
                            <span class="tag">Node.js</span>
                            <span class="tag">MongoDB</span>
                        </div>
                        <h3 class="project-title">E-Commerce Platform</h3>
                        <p class="project-description">
                            Full-stack e-commerce solution with cart, payments, and inventory management.
                        </p>
                        <div class="project-links">
                            <a href="#" class="project-link magnetic-btn">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="#" class="project-link magnetic-btn">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Project 3 -->
                <div class="project-card glass-card" data-category="ui" data-tilt>
                    <div class="project-image">
                        <div class="project-placeholder gradient-bg-3">
                            <i class="fas fa-mobile-alt"></i>
                        </div>
                        <div class="project-overlay">
                            <button class="project-quick-view" data-project="3">
                                <i class="fas fa-expand"></i>
                                Quick View
                            </button>
                        </div>
                    </div>
                    <div class="project-content">
                        <div class="project-tags">
                            <span class="tag">Figma</span>
                            <span class="tag">UI Design</span>
                            <span class="tag">Prototyping</span>
                        </div>
                        <h3 class="project-title">Mobile App Concept</h3>
                        <p class="project-description">
                            A fitness tracking app design with gamification and social features.
                        </p>
                        <div class="project-links">
                            <a href="#" class="project-link magnetic-btn">
                                <i class="fab fa-figma"></i>
                            </a>
                            <a href="#" class="project-link magnetic-btn">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Project 4 -->
                <div class="project-card glass-card" data-category="frontend" data-tilt>
                    <div class="project-image">
                        <div class="project-placeholder gradient-bg-4">
                            <i class="fas fa-cube"></i>
                        </div>
                        <div class="project-overlay">
                            <button class="project-quick-view" data-project="4">
                                <i class="fas fa-expand"></i>
                                Quick View
                            </button>
                        </div>
                    </div>
                    <div class="project-content">
                        <div class="project-tags">
                            <span class="tag">Three.js</span>
                            <span class="tag">WebGL</span>
                            <span class="tag">GSAP</span>
                        </div>
                        <h3 class="project-title">3D Interactive Experience</h3>
                        <p class="project-description">
                            An immersive 3D web experience with smooth animations and interactions.
                        </p>
                        <div class="project-links">
                            <a href="#" class="project-link magnetic-btn">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="#" class="project-link magnetic-btn">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Project 5 -->
                <div class="project-card glass-card" data-category="fullstack" data-tilt>
                    <div class="project-image">
                        <div class="project-placeholder gradient-bg-5">
                            <i class="fas fa-comments"></i>
                        </div>
                        <div class="project-overlay">
                            <button class="project-quick-view" data-project="5">
                                <i class="fas fa-expand"></i>
                                Quick View
                            </button>
                        </div>
                    </div>
                    <div class="project-content">
                        <div class="project-tags">
                            <span class="tag">React</span>
                            <span class="tag">Socket.io</span>
                            <span class="tag">Express</span>
                        </div>
                        <h3 class="project-title">Real-time Chat App</h3>
                        <p class="project-description">
                            A modern chat application with real-time messaging and file sharing.
                        </p>
                        <div class="project-links">
                            <a href="#" class="project-link magnetic-btn">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="#" class="project-link magnetic-btn">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Project 6 -->
                <div class="project-card glass-card" data-category="ui" data-tilt>
                    <div class="project-image">
                        <div class="project-placeholder gradient-bg-6">
                            <i class="fas fa-layer-group"></i>
                        </div>
                        <div class="project-overlay">
                            <button class="project-quick-view" data-project="6">
                                <i class="fas fa-expand"></i>
                                Quick View
                            </button>
                        </div>
                    </div>
                    <div class="project-content">
                        <div class="project-tags">
                            <span class="tag">Design System</span>
                            <span class="tag">Components</span>
                            <span class="tag">Storybook</span>
                        </div>
                        <h3 class="project-title">Component Library</h3>
                        <p class="project-description">
                            A comprehensive React component library with documentation.
                        </p>
                        <div class="project-links">
                            <a href="#" class="project-link magnetic-btn">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="#" class="project-link magnetic-btn">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Process Section -->
    <section class="section process" id="process">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">How I Work</span>
                <h2 class="section-title">
                    My <span class="gradient-text">Process</span>
                </h2>
                <p class="section-description">
                    A structured approach to delivering exceptional results
                </p>
            </div>
            
            <div class="process-timeline">
                <div class="timeline-line"></div>
                
                <div class="process-step" data-step="1">
                    <div class="step-marker">
                        <div class="marker-inner">
                            <i class="fas fa-lightbulb"></i>
                        </div>
                    </div>
                    <div class="step-content glass-card">
                        <span class="step-number">01</span>
                        <h3>Idea & Discovery</h3>
                        <p>Understanding your vision, goals, and requirements through detailed discussions and research.</p>
                    </div>
                </div>
                
                <div class="process-step" data-step="2">
                    <div class="step-marker">
                        <div class="marker-inner">
                            <i class="fas fa-pencil-ruler"></i>
                        </div>
                    </div>
                    <div class="step-content glass-card">
                        <span class="step-number">02</span>
                        <h3>Design</h3>
                        <p>Creating wireframes, prototypes, and visual designs that align with your brand and user needs.</p>
                    </div>
                </div>
                
                <div class="process-step" data-step="3">
                    <div class="step-marker">
                        <div class="marker-inner">
                            <i class="fas fa-code"></i>
                        </div>
                    </div>
                    <div class="step-content glass-card">
                        <span class="step-number">03</span>
                        <h3>Development</h3>
                        <p>Building your project with clean, scalable code using modern technologies and best practices.</p>
                    </div>
                </div>
                
                <div class="process-step" data-step="4">
                    <div class="step-marker">
                        <div class="marker-inner">
                            <i class="fas fa-flask"></i>
                        </div>
                    </div>
                    <div class="step-content glass-card">
                        <span class="step-number">04</span>
                        <h3>Testing</h3>
                        <p>Rigorous testing across devices and browsers to ensure quality and performance.</p>
                    </div>
                </div>
                
                <div class="process-step" data-step="5">
                    <div class="step-marker">
                        <div class="marker-inner">
                            <i class="fas fa-rocket"></i>
                        </div>
                    </div>
                    <div class="step-content glass-card">
                        <span class="step-number">05</span>
                        <h3>Delivery</h3>
                        <p>Launching your project with documentation, training, and ongoing support as needed.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Fun Facts Section -->
    <section class="section fun-facts">
        <div class="container">
            <div class="fun-facts-grid">
                <div class="fun-fact-card glass-card">
                    <div class="fun-fact-icon">
                        <i class="fas fa-coffee"></i>
                    </div>
                    <div class="fun-fact-number counter" data-target="1247">0</div>
                    <div class="fun-fact-label">Cups of Coffee</div>
                </div>
                
                <div class="fun-fact-card glass-card">
                    <div class="fun-fact-icon">
                        <i class="fas fa-code-branch"></i>
                    </div>
                    <div class="fun-fact-number counter" data-target="523">0</div>
                    <div class="fun-fact-label">Git Commits</div>
                </div>
                
                <div class="fun-fact-card glass-card">
                    <div class="fun-fact-icon">
                        <i class="fas fa-headphones"></i>
                    </div>
                    <div class="fun-fact-number counter" data-target="2840">0</div>
                    <div class="fun-fact-label">Hours of Music</div>
                </div>
                
                <div class="fun-fact-card glass-card">
                    <div class="fun-fact-icon">
                        <i class="fas fa-bug"></i>
                    </div>
                    <div class="fun-fact-number counter" data-target="847">0</div>
                    <div class="fun-fact-label">Bugs Squashed</div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Testimonials Section -->
    <section class="section testimonials" id="testimonials">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">Testimonials</span>
                <h2 class="section-title">
                    What Clients <span class="gradient-text">Say</span>
                </h2>
                <p class="section-description">
                    Feedback from people I've had the pleasure to work with
                </p>
            </div>
            
            <div class="testimonials-carousel">
                <div class="carousel-container" id="testimonials-container">
                    <div class="testimonial-card glass-card active">
                        <div class="testimonial-content">
                            <div class="quote-icon">
                                <i class="fas fa-quote-left"></i>
                            </div>
                            <p class="testimonial-text">
                                "Youssef delivered an exceptional website that exceeded our expectations. His attention to detail and creative approach made our project stand out. Highly recommend!"
                            </p>
                            <div class="testimonial-rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                        </div>
                        <div class="testimonial-author">
                            <div class="author-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="author-info">
                                <h4>Ahmed Hassan</h4>
                                <span>CEO, TechStart Inc.</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="testimonial-card glass-card">
                        <div class="testimonial-content">
                            <div class="quote-icon">
                                <i class="fas fa-quote-left"></i>
                            </div>
                            <p class="testimonial-text">
                                "Working with Youssef was a fantastic experience. He understood our requirements perfectly and delivered a beautiful, functional application on time."
                            </p>
                            <div class="testimonial-rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                        </div>
                        <div class="testimonial-author">
                            <div class="author-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="author-info">
                                <h4>Sarah Johnson</h4>
                                <span>Product Manager, DesignCo</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="testimonial-card glass-card">
                        <div class="testimonial-content">
                            <div class="quote-icon">
                                <i class="fas fa-quote-left"></i>
                            </div>
                            <p class="testimonial-text">
                                "Youssef's technical skills combined with his creative vision made our project a success. His communication and professionalism are top-notch."
                            </p>
                            <div class="testimonial-rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                        </div>
                        <div class="testimonial-author">
                            <div class="author-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="author-info">
                                <h4>Mohammed Ali</h4>
                                <span>Founder, CreativeHub</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="carousel-controls">
                    <button class="carousel-btn prev magnetic-btn" aria-label="Previous testimonial">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                    <div class="carousel-dots">
                        <span class="dot active"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                    <button class="carousel-btn next magnetic-btn" aria-label="Next testimonial">
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Blog Section -->
    <section class="section blog" id="blog">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">Blog</span>
                <h2 class="section-title">
                    Latest <span class="gradient-text">Articles</span>
                </h2>
                <p class="section-description">
                    Thoughts, tutorials, and insights from my journey
                </p>
            </div>
            
            <div class="blog-grid">
                <article class="blog-card glass-card">
                    <div class="blog-image">
                        <div class="blog-placeholder gradient-bg-1">
                            <i class="fas fa-code"></i>
                        </div>
                        <span class="blog-category">Development</span>
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span><i class="fas fa-calendar"></i> Jan 15, 2024</span>
                            <span><i class="fas fa-clock"></i> 5 min read</span>
                        </div>
                        <h3 class="blog-title">Building Scalable React Applications</h3>
                        <p class="blog-excerpt">Learn the best practices for structuring large React applications...</p>
                        <a href="#" class="blog-link magnetic-btn">
                            Read More <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </article>
                
                <article class="blog-card glass-card">
                    <div class="blog-image">
                        <div class="blog-placeholder gradient-bg-2">
                            <i class="fas fa-palette"></i>
                        </div>
                        <span class="blog-category">Design</span>
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span><i class="fas fa-calendar"></i> Jan 10, 2024</span>
                            <span><i class="fas fa-clock"></i> 4 min read</span>
                        </div>
                        <h3 class="blog-title">The Art of Micro-interactions</h3>
                        <p class="blog-excerpt">How small animations can dramatically improve user experience...</p>
                        <a href="#" class="blog-link magnetic-btn">
                            Read More <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </article>
                
                <article class="blog-card glass-card">
                    <div class="blog-image">
                        <div class="blog-placeholder gradient-bg-3">
                            <i class="fas fa-lightbulb"></i>
                        </div>
                        <span class="blog-category">Tips</span>
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span><i class="fas fa-calendar"></i> Jan 5, 2024</span>
                            <span><i class="fas fa-clock"></i> 3 min read</span>
                        </div>
                        <h3 class="blog-title">Vibe Coding: My Approach to Development</h3>
                        <p class="blog-excerpt">Discover how embracing creativity can transform your coding...</p>
                        <a href="#" class="blog-link magnetic-btn">
                            Read More <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </article>
            </div>
            
            <div class="blog-cta">
                <p>More articles coming soon! Subscribe to get notified.</p>
            </div>
        </div>
    </section>
    
    <!-- Contact Section -->
    <section class="section contact" id="contact">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">Get In Touch</span>
                <h2 class="section-title">
                    Let's <span class="gradient-text">Work Together</span>
                </h2>
                <p class="section-description">
                    Ready to bring your ideas to life? Let's discuss your project.
                </p>
            </div>
            
            <div class="contact-grid">
                <div class="contact-info">
                    <div class="info-card glass-card">
                        <div class="info-icon">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div class="info-content">
                            <h4>Email</h4>
                            <a href="mailto:hello@youssefkhamis.dev">hello@youssefkhamis.dev</a>
                        </div>
                    </div>
                    
                    <div class="info-card glass-card">
                        <div class="info-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div class="info-content">
                            <h4>Location</h4>
                            <p>Available Worldwide (Remote)</p>
                        </div>
                    </div>
                    
                    <div class="info-card glass-card">
                        <div class="info-icon">
                            <i class="fas fa-calendar-check"></i>
                        </div>
                        <div class="info-content">
                            <h4>Availability</h4>
                            <p>Open for freelance & part-time</p>
                        </div>
                    </div>
                    
                    <div class="social-links-contact">
                        <h4>Connect With Me</h4>
                        <div class="social-icons">
                            <a href="#" class="social-icon magnetic-btn" data-social="github" aria-label="GitHub">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="#" class="social-icon magnetic-btn" data-social="linkedin" aria-label="LinkedIn">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                            <a href="#" class="social-icon magnetic-btn" data-social="twitter" aria-label="Twitter">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="social-icon magnetic-btn" data-social="dribbble" aria-label="Dribbble">
                                <i class="fab fa-dribbble"></i>
                            </a>
                        </div>
                    </div>
                    
                    <!-- Calendly Integration Ready -->
                    <div class="calendly-section glass-card">
                        <div class="calendly-icon">
                            <i class="fas fa-calendar-alt"></i>
                        </div>
                        <h4>Schedule a Call</h4>
                        <p>Book a 30-minute discovery call to discuss your project.</p>
                        <button class="btn btn-outline magnetic-btn calendly-btn">
                            <span>Book a Call</span>
                            <i class="fas fa-external-link-alt"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Quote Request Form -->
                <div class="contact-form-container glass-card">
                    <h3>Request a Quote</h3>
                    <form class="quote-form" id="quote-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="name">Your Name *</label>
                                <input type="text" id="name" name="name" required placeholder="John Doe">
                                <span class="error-message"></span>
                            </div>
                            <div class="form-group">
                                <label for="email">Email Address *</label>
                                <input type="email" id="email" name="email" required placeholder="john@example.com">
                                <span class="error-message"></span>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="service">Service Type *</label>
                            <select id="service" name="service" required>
                                <option value="">Select a service</option>
                                <option value="web-development">Web Development</option>
                                <option value="frontend">Frontend Development</option>
                                <option value="ui-ux">UI/UX Design</option>
                                <option value="fullstack">Full Stack Project</option>
                                <option value="consulting">Technical Consulting</option>
                                <option value="other">Other</option>
                            </select>
                            <span class="error-message"></span>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="budget">Budget Range *</label>
                                <select id="budget" name="budget" required>
                                    <option value="">Select budget</option>
                                    <option value="500-1000">$500 - $1,000</option>
                                    <option value="1000-2500">$1,000 - $2,500</option>
                                    <option value="2500-5000">$2,500 - $5,000</option>
                                    <option value="5000-10000">$5,000 - $10,000</option>
                                    <option value="10000+">$10,000+</option>
                                </select>
                                <span class="error-message"></span>
                            </div>
                            <div class="form-group">
                                <label for="timeline">Timeline *</label>
                                <select id="timeline" name="timeline" required>
                                    <option value="">Select timeline</option>
                                    <option value="1-2-weeks">1-2 weeks</option>
                                    <option value="2-4-weeks">2-4 weeks</option>
                                    <option value="1-2-months">1-2 months</option>
                                    <option value="2-3-months">2-3 months</option>
                                    <option value="3-months+">3+ months</option>
                                </select>
                                <span class="error-message"></span>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="message">Project Details *</label>
                            <textarea id="message" name="message" required rows="5" placeholder="Tell me about your project, goals, and any specific requirements..."></textarea>
                            <span class="error-message"></span>
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-full magnetic-btn">
                            <span>Send Request</span>
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
            
            <!-- Newsletter -->
            <div class="newsletter-section glass-card">
                <div class="newsletter-content">
                    <div class="newsletter-icon">
                        <i class="fas fa-paper-plane"></i>
                    </div>
                    <div class="newsletter-text">
                        <h3>Stay Updated</h3>
                        <p>Subscribe to my newsletter for tips, articles, and project updates.</p>
                    </div>
                </div>
                <form class="newsletter-form" id="newsletter-form">
                    <input type="email" placeholder="Enter your email" required>
                    <button type="submit" class="btn btn-primary magnetic-btn">
                        <span>Subscribe</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </form>
            </div>
        </div>
    </section>
    
    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <a href="#home" class="footer-logo">
                        <span class="logo-text">YK</span>
                        <span class="logo-dot"></span>
                    </a>
                    <p>Building exceptional digital experiences with passion and precision.</p>
                </div>
                
                <div class="footer-links">
                    <div class="footer-column">
                        <h4>Navigation</h4>
                        <a href="#home">Home</a>
                        <a href="#about">About</a>
                        <a href="#projects">Projects</a>
                        <a href="#contact">Contact</a>
                    </div>
                    <div class="footer-column">
                        <h4>Services</h4>
                        <a href="#contact">Web Development</a>
                        <a href="#contact">Frontend Dev</a>
                        <a href="#contact">UI/UX Design</a>
                        <a href="#contact">Consulting</a>
                    </div>
                    <div class="footer-column">
                        <h4>Connect</h4>
                        <a href="#" data-social="github">GitHub</a>
                        <a href="#" data-social="linkedin">LinkedIn</a>
                        <a href="#" data-social="twitter">Twitter</a>
                        <a href="mailto:hello@youssefkhamis.dev">Email</a>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2024 Youssef Khamis Al-Assiuty. All rights reserved.</p>
                <p class="easter-egg-hint">Try the Konami code 🎮</p>
            </div>
        </div>
    </footer>
    
    <!-- Quick View Modal -->
    <div class="modal" id="project-modal">
        <div class="modal-overlay"></div>
        <div class="modal-content glass-card">
            <button class="modal-close magnetic-btn" aria-label="Close modal">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-body" id="modal-body">
                <!-- Content loaded dynamically -->
            </div>
        </div>
    </div>
    
    <!-- Toast Notifications -->
    <div class="toast-container" id="toast-container"></div>
    
    <!-- Easter Egg Overlay -->
    <div class="easter-egg-overlay" id="easter-egg">
        <div class="easter-egg-content">
            <h2>🎉 You Found It!</h2>
            <p>Thanks for exploring! You're awesome. 🚀</p>
            <button class="btn btn-primary" onclick="closeEasterEgg()">
                Continue
            </button>
        </div>
    </div>
    
    <!-- Bottom Mobile Navigation -->
    <nav class="bottom-nav" id="bottom-nav">
        <a href="#home" class="bottom-nav-item active" data-section="home">
            <i class="fas fa-home"></i>
            <span>Home</span>
        </a>
        <a href="#about" class="bottom-nav-item" data-section="about">
            <i class="fas fa-user"></i>
            <span>About</span>
        </a>
        <a href="#projects" class="bottom-nav-item" data-section="projects">
            <i class="fas fa-folder"></i>
            <span>Work</span>
        </a>
        <a href="#contact" class="bottom-nav-item" data-section="contact">
            <i class="fas fa-envelope"></i>
            <span>Contact</span>
        </a>
    </nav>
    
    <!-- Scripts -->
    <script src="/static/app.js"></script>
</body>
</html>`
  
  return c.html(html)
})

export default app
