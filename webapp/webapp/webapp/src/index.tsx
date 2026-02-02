import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-pages'
import { cors } from 'hono/cors'

const app = new Hono()

// Enable CORS
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './' }))

// Security headers middleware
app.use('*', async (c, next) => {
  await next()
  c.header('X-Content-Type-Options', 'nosniff')
  c.header('X-Frame-Options', 'DENY')
  c.header('X-XSS-Protection', '1; mode=block')
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
  c.header('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
})

// Input validation helper
const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return ''
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
    .slice(0, 1000)
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

// API Routes with validation
app.post('/api/quote', async (c) => {
  try {
    const body = await c.req.json()
    
    // Validate required fields
    const name = sanitizeInput(body.name || '')
    const email = sanitizeInput(body.email || '')
    const service = sanitizeInput(body.service || '')
    const budget = sanitizeInput(body.budget || '')
    const timeline = sanitizeInput(body.timeline || '')
    const message = sanitizeInput(body.message || '')
    
    if (!name || !email || !service || !budget || !timeline || !message) {
      return c.json({ success: false, message: 'All fields are required' }, 400)
    }
    
    if (!isValidEmail(email)) {
      return c.json({ success: false, message: 'Invalid email address' }, 400)
    }
    
    console.log('Quote request:', { name, email, service, budget, timeline, message })
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
    const sanitizedEmail = sanitizeInput(email || '')
    
    if (!sanitizedEmail || !isValidEmail(sanitizedEmail)) {
      return c.json({ success: false, message: 'Please provide a valid email address' }, 400)
    }
    
    console.log('Newsletter subscription:', sanitizedEmail)
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
    const name = sanitizeInput(body.name || '')
    const email = sanitizeInput(body.email || '')
    const message = sanitizeInput(body.message || '')
    
    if (!name || !email || !message) {
      return c.json({ success: false, message: 'All fields are required' }, 400)
    }
    
    if (!isValidEmail(email)) {
      return c.json({ success: false, message: 'Invalid email address' }, 400)
    }
    
    console.log('Contact form:', { name, email, message })
    return c.json({ 
      success: true, 
      message: 'Message sent successfully! I\'ll respond within 24 hours.' 
    })
  } catch (error) {
    return c.json({ success: false, message: 'Error sending message' }, 400)
  }
})

// YK Favicon SVG (inline data URI)
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1"/>
      <stop offset="50%" style="stop-color:#8b5cf6"/>
      <stop offset="100%" style="stop-color:#a855f7"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#grad)"/>
  <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" 
        font-family="Arial Black, sans-serif" font-size="28" font-weight="900" fill="white">YK</text>
</svg>`

const faviconDataUri = `data:image/svg+xml,${encodeURIComponent(faviconSvg)}`

// Profile image placeholder (professional gradient avatar)
const profileImageSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1"/>
      <stop offset="50%" style="stop-color:#8b5cf6"/>
      <stop offset="100%" style="stop-color:#a855f7"/>
    </linearGradient>
    <linearGradient id="faceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ffecd2"/>
      <stop offset="100%" style="stop-color:#fcb69f"/>
    </linearGradient>
  </defs>
  <rect width="400" height="500" fill="url(#bgGrad)"/>
  <circle cx="200" cy="180" r="80" fill="url(#faceGrad)"/>
  <ellipse cx="200" cy="420" rx="120" ry="150" fill="rgba(255,255,255,0.2)"/>
  <text x="200" y="480" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="rgba(255,255,255,0.9)">Youssef Khamis</text>
</svg>`

const profileImageDataUri = `data:image/svg+xml,${encodeURIComponent(profileImageSvg)}`

// Main page
app.get('/', (c) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Youssef Khamis Al-Assiuty | Software Engineer</title>
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="${faviconDataUri}">
    <link rel="shortcut icon" type="image/svg+xml" href="${faviconDataUri}">
    <link rel="apple-touch-icon" href="${faviconDataUri}">
    
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
    <!-- Custom Cursor -->
    <div class="cursor-dot" id="cursor-dot"></div>
    <div class="cursor-outline" id="cursor-outline"></div>
    
    <!-- Loading Screen -->
    <div class="loading-screen" id="loading-screen">
        <div class="loader">
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
                <div class="logo-avatar">
                    <img src="${profileImageDataUri}" alt="YK" class="nav-profile-img">
                </div>
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
            <div class="mobile-nav-profile">
                <img src="${profileImageDataUri}" alt="Youssef Khamis" class="mobile-profile-img">
                <span class="mobile-profile-name">Youssef Khamis</span>
            </div>
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
                    <a href="https://www.facebook.com/yousef.khames.mohamed" class="social-link" aria-label="Facebook" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com/yousef_khames_mohamed/" class="social-link" aria-label="Instagram" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.tiktok.com/@yousef_khames_elasuoty" class="social-link" aria-label="TikTok" target="_blank"><i class="fab fa-tiktok"></i></a>
                    <a href="https://x.com" class="social-link" aria-label="X" target="_blank"><i class="fab fa-x-twitter"></i></a>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="hero-bg">
            <canvas id="particles-canvas"></canvas>
            <div class="gradient-orb orb-1"></div>
            <div class="gradient-orb orb-2"></div>
            <div class="gradient-orb orb-3"></div>
            <div class="noise-overlay"></div>
        </div>
        
        <div class="hero-content">
            <div class="hero-profile-container">
                <div class="hero-profile-image glass-card">
                    <img src="${profileImageDataUri}" alt="Youssef Khamis Al-Assiuty" class="profile-img" id="hero-profile-img">
                    <div class="profile-glow"></div>
                    <div class="profile-ring"></div>
                </div>
            </div>
            
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
                    <span class="title-word gradient-text">Software Engineer</span>
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
        
        <!-- Scroll Indicator removed as requested -->
        
        <div class="hero-social">
            <a href="https://www.facebook.com/yousef.khames.mohamed" class="social-link magnetic-btn" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/yousef_khames_mohamed/" class="social-link magnetic-btn" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/@yousef_khames_elasuoty" class="social-link magnetic-btn" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-tiktok"></i>
            </a>
            <a href="https://x.com" class="social-link magnetic-btn" aria-label="X" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-x-twitter"></i>
            </a>
            <a href="mailto:Yousef.Khames.Elasuoty@gmail.com" class="social-link magnetic-btn" aria-label="Gmail">
                <i class="fab fa-google"></i>
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
                    <div class="image-wrapper glass-card interactive-image" id="about-image-wrapper">
                        <img src="${profileImageDataUri}" alt="Youssef Khamis Al-Assiuty" class="about-profile-img" id="about-profile-img">
                        <div class="image-decoration"></div>
                        <div class="image-glow-effect"></div>
                        <div class="image-particles"></div>
                        <div class="image-border-anim"></div>
                    </div>
                    <div class="experience-badge glass-card floating-badge">
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
                                    <div class="level-fill" data-level="95"></div>
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
                                    <div class="level-fill" data-level="90"></div>
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
                                    <div class="level-fill" data-level="88"></div>
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
                                    <div class="level-fill" data-level="95"></div>
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
                                    <div class="level-fill" data-level="95"></div>
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
                                    <div class="level-fill" data-level="98"></div>
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
            
            <div class="projects-grid-new">
                <!-- Project 1 -->
                <div class="project-card-new glass-card" data-category="frontend" data-project-id="1">
                    <div class="project-card-inner">
                        <div class="project-card-shine"></div>
                        <div class="project-image-new">
                            <div class="project-placeholder gradient-bg-1">
                                <i class="fas fa-palette"></i>
                            </div>
                            <div class="project-overlay-new">
                                <button class="view-project-btn magnetic-btn" data-project="1">
                                    <i class="fas fa-expand"></i>
                                    <span>View Details</span>
                                </button>
                            </div>
                        </div>
                        <div class="project-content-new">
                            <div class="project-tags-new">
                                <span class="tag-new">React</span>
                                <span class="tag-new">TypeScript</span>
                                <span class="tag-new">Tailwind</span>
                            </div>
                            <h3 class="project-title-new">Modern Dashboard UI</h3>
                            <p class="project-desc-new">A sleek admin dashboard with data visualization and dark mode.</p>
                            <div class="project-links-new">
                                <a href="#" class="project-link-new"><i class="fab fa-github"></i></a>
                                <a href="#" class="project-link-new"><i class="fas fa-external-link-alt"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Project 2 -->
                <div class="project-card-new glass-card" data-category="fullstack" data-project-id="2">
                    <div class="project-card-inner">
                        <div class="project-card-shine"></div>
                        <div class="project-image-new">
                            <div class="project-placeholder gradient-bg-2">
                                <i class="fas fa-shopping-cart"></i>
                            </div>
                            <div class="project-overlay-new">
                                <button class="view-project-btn magnetic-btn" data-project="2">
                                    <i class="fas fa-expand"></i>
                                    <span>View Details</span>
                                </button>
                            </div>
                        </div>
                        <div class="project-content-new">
                            <div class="project-tags-new">
                                <span class="tag-new">Next.js</span>
                                <span class="tag-new">Node.js</span>
                                <span class="tag-new">MongoDB</span>
                            </div>
                            <h3 class="project-title-new">E-Commerce Platform</h3>
                            <p class="project-desc-new">Full-stack e-commerce with cart, payments & inventory.</p>
                            <div class="project-links-new">
                                <a href="#" class="project-link-new"><i class="fab fa-github"></i></a>
                                <a href="#" class="project-link-new"><i class="fas fa-external-link-alt"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Project 3 -->
                <div class="project-card-new glass-card" data-category="ui" data-project-id="3">
                    <div class="project-card-inner">
                        <div class="project-card-shine"></div>
                        <div class="project-image-new">
                            <div class="project-placeholder gradient-bg-3">
                                <i class="fas fa-mobile-alt"></i>
                            </div>
                            <div class="project-overlay-new">
                                <button class="view-project-btn magnetic-btn" data-project="3">
                                    <i class="fas fa-expand"></i>
                                    <span>View Details</span>
                                </button>
                            </div>
                        </div>
                        <div class="project-content-new">
                            <div class="project-tags-new">
                                <span class="tag-new">Figma</span>
                                <span class="tag-new">UI Design</span>
                                <span class="tag-new">Prototyping</span>
                            </div>
                            <h3 class="project-title-new">Mobile App Concept</h3>
                            <p class="project-desc-new">Fitness tracking app with gamification features.</p>
                            <div class="project-links-new">
                                <a href="#" class="project-link-new"><i class="fab fa-figma"></i></a>
                                <a href="#" class="project-link-new"><i class="fas fa-external-link-alt"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Project 4 -->
                <div class="project-card-new glass-card" data-category="frontend" data-project-id="4">
                    <div class="project-card-inner">
                        <div class="project-card-shine"></div>
                        <div class="project-image-new">
                            <div class="project-placeholder gradient-bg-4">
                                <i class="fas fa-cube"></i>
                            </div>
                            <div class="project-overlay-new">
                                <button class="view-project-btn magnetic-btn" data-project="4">
                                    <i class="fas fa-expand"></i>
                                    <span>View Details</span>
                                </button>
                            </div>
                        </div>
                        <div class="project-content-new">
                            <div class="project-tags-new">
                                <span class="tag-new">Three.js</span>
                                <span class="tag-new">WebGL</span>
                                <span class="tag-new">GSAP</span>
                            </div>
                            <h3 class="project-title-new">3D Interactive Experience</h3>
                            <p class="project-desc-new">Immersive 3D web experience with smooth animations.</p>
                            <div class="project-links-new">
                                <a href="#" class="project-link-new"><i class="fab fa-github"></i></a>
                                <a href="#" class="project-link-new"><i class="fas fa-external-link-alt"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Project 5 -->
                <div class="project-card-new glass-card" data-category="fullstack" data-project-id="5">
                    <div class="project-card-inner">
                        <div class="project-card-shine"></div>
                        <div class="project-image-new">
                            <div class="project-placeholder gradient-bg-5">
                                <i class="fas fa-comments"></i>
                            </div>
                            <div class="project-overlay-new">
                                <button class="view-project-btn magnetic-btn" data-project="5">
                                    <i class="fas fa-expand"></i>
                                    <span>View Details</span>
                                </button>
                            </div>
                        </div>
                        <div class="project-content-new">
                            <div class="project-tags-new">
                                <span class="tag-new">React</span>
                                <span class="tag-new">Socket.io</span>
                                <span class="tag-new">Express</span>
                            </div>
                            <h3 class="project-title-new">Real-time Chat App</h3>
                            <p class="project-desc-new">Modern chat with real-time messaging & file sharing.</p>
                            <div class="project-links-new">
                                <a href="#" class="project-link-new"><i class="fab fa-github"></i></a>
                                <a href="#" class="project-link-new"><i class="fas fa-external-link-alt"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Project 6 -->
                <div class="project-card-new glass-card" data-category="ui" data-project-id="6">
                    <div class="project-card-inner">
                        <div class="project-card-shine"></div>
                        <div class="project-image-new">
                            <div class="project-placeholder gradient-bg-6">
                                <i class="fas fa-layer-group"></i>
                            </div>
                            <div class="project-overlay-new">
                                <button class="view-project-btn magnetic-btn" data-project="6">
                                    <i class="fas fa-expand"></i>
                                    <span>View Details</span>
                                </button>
                            </div>
                        </div>
                        <div class="project-content-new">
                            <div class="project-tags-new">
                                <span class="tag-new">Design System</span>
                                <span class="tag-new">Components</span>
                                <span class="tag-new">Storybook</span>
                            </div>
                            <h3 class="project-title-new">Component Library</h3>
                            <p class="project-desc-new">React component library with full documentation.</p>
                            <div class="project-links-new">
                                <a href="#" class="project-link-new"><i class="fab fa-github"></i></a>
                                <a href="#" class="project-link-new"><i class="fas fa-external-link-alt"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Project Modal -->
    <div class="project-modal" id="project-modal">
        <div class="modal-overlay"></div>
        <div class="modal-content glass-card">
            <button class="modal-close-btn" id="modal-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-body">
                <div class="modal-media">
                    <div class="modal-video-placeholder">
                        <i class="fas fa-play-circle"></i>
                        <span>Project Demo</span>
                    </div>
                    <div class="modal-gallery">
                        <div class="modal-gallery-item gradient-bg-1"><i class="fas fa-image"></i></div>
                        <div class="modal-gallery-item gradient-bg-2"><i class="fas fa-image"></i></div>
                        <div class="modal-gallery-item gradient-bg-3"><i class="fas fa-image"></i></div>
                    </div>
                </div>
                <div class="modal-info">
                    <h2 class="modal-title" id="modal-title">Project Title</h2>
                    <div class="modal-tags" id="modal-tags"></div>
                    <p class="modal-description" id="modal-description">Project description goes here.</p>
                    <div class="modal-features" id="modal-features">
                        <h4><i class="fas fa-star"></i> Key Features</h4>
                        <ul>
                            <li><i class="fas fa-check-circle"></i> Feature 1</li>
                            <li><i class="fas fa-check-circle"></i> Feature 2</li>
                            <li><i class="fas fa-check-circle"></i> Feature 3</li>
                        </ul>
                    </div>
                    <div class="modal-actions">
                        <a href="#" class="btn btn-primary magnetic-btn modal-link-live">
                            <i class="fas fa-external-link-alt"></i>
                            <span>Live Demo</span>
                        </a>
                        <a href="#" class="btn btn-secondary magnetic-btn modal-link-code">
                            <i class="fab fa-github"></i>
                            <span>View Code</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
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
    
    <!-- Social Media Section -->
    <section class="section social-media" id="blog">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">Follow Me</span>
                <h2 class="section-title">
                    Connect on <span class="gradient-text">Social Media</span>
                </h2>
                <p class="section-description">
                    Stay updated with my latest projects and insights
                </p>
            </div>
            
            <div class="social-media-grid">
                <!-- Facebook -->
                <a href="https://www.facebook.com/yousef.khames.mohamed" target="_blank" rel="noopener noreferrer" class="social-media-card glass-card facebook-card">
                    <div class="social-card-inner">
                        <div class="social-icon-large">
                            <i class="fab fa-facebook-f"></i>
                        </div>
                        <div class="social-card-content">
                            <h3>Facebook</h3>
                            <p>@yousef.khames.mohamed</p>
                            <span class="social-follow-btn">
                                <i class="fas fa-plus"></i> Follow
                            </span>
                        </div>
                        <div class="social-card-glow"></div>
                    </div>
                </a>
                
                <!-- Instagram -->
                <a href="https://www.instagram.com/yousef_khames_mohamed/" target="_blank" rel="noopener noreferrer" class="social-media-card glass-card instagram-card">
                    <div class="social-card-inner">
                        <div class="social-icon-large">
                            <i class="fab fa-instagram"></i>
                        </div>
                        <div class="social-card-content">
                            <h3>Instagram</h3>
                            <p>@yousef_khames_mohamed</p>
                            <span class="social-follow-btn">
                                <i class="fas fa-plus"></i> Follow
                            </span>
                        </div>
                        <div class="social-card-glow"></div>
                    </div>
                </a>
                
                <!-- TikTok -->
                <a href="https://www.tiktok.com/@yousef_khames_elasuoty" target="_blank" rel="noopener noreferrer" class="social-media-card glass-card tiktok-card">
                    <div class="social-card-inner">
                        <div class="social-icon-large">
                            <i class="fab fa-tiktok"></i>
                        </div>
                        <div class="social-card-content">
                            <h3>TikTok</h3>
                            <p>@yousef_khames_elasuoty</p>
                            <span class="social-follow-btn">
                                <i class="fas fa-plus"></i> Follow
                            </span>
                        </div>
                        <div class="social-card-glow"></div>
                    </div>
                </a>
                
                <!-- X (Twitter) -->
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" class="social-media-card glass-card x-card">
                    <div class="social-card-inner">
                        <div class="social-icon-large">
                            <i class="fab fa-x-twitter"></i>
                        </div>
                        <div class="social-card-content">
                            <h3>X</h3>
                            <p>@youssefkhamis</p>
                            <span class="social-follow-btn">
                                <i class="fas fa-plus"></i> Follow
                            </span>
                        </div>
                        <div class="social-card-glow"></div>
                    </div>
                </a>
                
                <!-- Gmail -->
                <a href="mailto:Yousef.Khames.Elasuoty@gmail.com" class="social-media-card glass-card gmail-card">
                    <div class="social-card-inner">
                        <div class="social-icon-large">
                            <i class="fab fa-google"></i>
                        </div>
                        <div class="social-card-content">
                            <h3>Gmail</h3>
                            <p>Yousef.Khames.Elasuoty</p>
                            <span class="social-follow-btn">
                                <i class="fas fa-envelope"></i> Contact
                            </span>
                        </div>
                        <div class="social-card-glow"></div>
                    </div>
                </a>
                
                <!-- GitHub -->
                <a href="#" class="social-media-card glass-card github-card">
                    <div class="social-card-inner">
                        <div class="social-icon-large">
                            <i class="fab fa-github"></i>
                        </div>
                        <div class="social-card-content">
                            <h3>GitHub</h3>
                            <p>Coming Soon</p>
                            <span class="social-follow-btn">
                                <i class="fas fa-code"></i> Follow
                            </span>
                        </div>
                        <div class="social-card-glow"></div>
                    </div>
                </a>
            </div>
            
            <div class="social-cta glass-card">
                <div class="social-cta-content">
                    <i class="fas fa-heart"></i>
                    <p>Let's connect and create something amazing together!</p>
                </div>
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
                            <i class="fab fa-google"></i>
                        </div>
                        <div class="info-content">
                            <h4>Gmail</h4>
                            <a href="mailto:Yousef.Khames.Elasuoty@gmail.com">Yousef.Khames.Elasuoty@gmail.com</a>
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
                            <a href="https://www.facebook.com/yousef.khames.mohamed" class="social-icon magnetic-btn" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://www.instagram.com/yousef_khames_mohamed/" class="social-icon magnetic-btn" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a href="https://www.tiktok.com/@yousef_khames_elasuoty" class="social-icon magnetic-btn" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-tiktok"></i>
                            </a>
                            <a href="https://x.com" class="social-icon magnetic-btn" aria-label="X" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-x-twitter"></i>
                            </a>
                            <a href="mailto:Yousef.Khames.Elasuoty@gmail.com" class="social-icon magnetic-btn" aria-label="Gmail">
                                <i class="fab fa-google"></i>
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
                    <form class="quote-form" id="quote-form" novalidate>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="name">Your Name *</label>
                                <input type="text" id="name" name="name" required placeholder="John Doe" autocomplete="name" maxlength="100">
                                <span class="error-message"></span>
                            </div>
                            <div class="form-group">
                                <label for="email">Email Address *</label>
                                <input type="email" id="email" name="email" required placeholder="john@example.com" autocomplete="email" maxlength="254">
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
                            <textarea id="message" name="message" required rows="5" placeholder="Tell me about your project, goals, and any specific requirements..." maxlength="2000"></textarea>
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
                <form class="newsletter-form" id="newsletter-form" novalidate>
                    <input type="email" placeholder="Enter your email" required autocomplete="email" maxlength="254">
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
                        <a href="https://www.facebook.com/yousef.khames.mohamed" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://www.instagram.com/yousef_khames_mohamed/" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://www.tiktok.com/@yousef_khames_elasuoty" target="_blank" rel="noopener noreferrer">TikTok</a>
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer">X</a>
                        <a href="mailto:Yousef.Khames.Elasuoty@gmail.com">Gmail</a>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2024 Youssef Khamis Al-Assiuty. All rights reserved.</p>
                <p class="easter-egg-hint">Try the Konami code</p>
            </div>
        </div>
    </footer>
    
    <!-- Toast Notifications -->
    <div class="toast-container" id="toast-container"></div>
    
    <!-- Easter Egg Overlay -->
    <div class="easter-egg-overlay" id="easter-egg">
        <div class="easter-egg-content">
            <h2>You Found It!</h2>
            <p>Thanks for exploring! You're awesome.</p>
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
