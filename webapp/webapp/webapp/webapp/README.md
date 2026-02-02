# Youssef Khamis Al-Assiuty - Portfolio

## 🎯 Project Overview

A **high-end, modern, interactive personal portfolio website** for Youssef Khamis Al-Assiuty, Software Engineer. Built for part-time job opportunities and freelance work, targeting local, Arab, and international companies.

**Live Preview:** [View Portfolio](https://3000-i65dyaxng1uds7yo7gntg-b237eb32.sandbox.novita.ai)

## ✨ Features

### 🎨 Design & UI
- **Glassmorphism UI** - Advanced blur, soft transparency, animated gradient borders
- **Custom Cursor** - Unique cursor design with hover effects and magnetic buttons
- **Animated Background** - Particle canvas with gradient orbs and noise texture
- **Morphing Text** - Dynamic text animation in hero section
- **Micro-interactions** - Hover animations, click feedback, smooth loading states
- **Dark/Light Mode** - Full theme support with system preference detection
- **Aurora/Glow Effects** - Subtle accent effects throughout

### 📱 Responsive Design
- Fully responsive across all devices
- Mobile bottom navigation
- Touch gesture support (swipe between sections)
- Safe area support for modern devices

### 🧩 Sections

1. **Hero Section**
   - Animated particle background
   - Morphing headline text (English/Arabic)
   - Stats counters with animations
   - Social links sidebar
   - Scroll indicator

2. **About Section**
   - Bio with animated highlights
   - Experience badge
   - CV download (EN/AR ready)
   - "Currently" section (Focus, Learning, Building)

3. **Skills Section**
   - Primary skills with level indicators
   - Supporting skills with badges
   - Tools marquee animation

4. **Projects Section**
   - Filter by category
   - 3D tilt effect on hover
   - Quick view modal
   - Demo project placeholders (easily replaceable)

5. **Process Section**
   - Timeline layout
   - 5-step workflow visualization

6. **Fun Facts Section**
   - Animated counters
   - Engagement metrics

7. **Testimonials Section**
   - Carousel with dots navigation
   - Auto-rotation
   - Star ratings

8. **Blog Section**
   - Placeholder articles
   - Ready for content integration

9. **Contact Section**
   - Quote request form with validation
   - Contact information
   - Calendly integration ready
   - Newsletter subscription
   - Social links

### 🎮 Interactive Extras
- **Easter Egg** - Konami code (↑↑↓↓←→←→BA) triggers confetti
- **Magnetic Buttons** - Buttons follow cursor movement
- **3D Tilt** - Project cards respond to mouse position
- **Scroll Animations** - Elements animate on scroll

### ⚡ Performance & SEO
- SEO optimized with meta tags, Open Graph, Twitter Cards
- Structured data (Schema.org)
- PWA support with manifest and service worker
- Optimized loading with preconnects

### ♿ Accessibility
- ARIA labels throughout
- Keyboard navigation support
- Proper contrast ratios
- Focus visible states
- Reduced motion support

## 🛠️ Tech Stack

- **Framework:** Hono (Lightweight TypeScript framework)
- **Platform:** Cloudflare Pages/Workers
- **Build Tool:** Vite
- **Styling:** Custom CSS with CSS Variables
- **Fonts:** Inter, Space Grotesk, JetBrains Mono
- **Icons:** Font Awesome 6

## 📁 Project Structure

```
webapp/
├── src/
│   └── index.tsx          # Main Hono application
├── public/
│   └── static/
│       ├── styles.css     # All styles (52KB)
│       ├── app.js         # All JavaScript (40KB)
│       ├── manifest.json  # PWA manifest
│       └── sw.js          # Service worker
├── dist/                  # Build output
├── ecosystem.config.cjs   # PM2 configuration
├── wrangler.jsonc         # Cloudflare configuration
├── vite.config.ts         # Vite configuration
└── package.json
```

## 🚀 Getting Started

### Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start development server
npm run dev:sandbox  # or: pm2 start ecosystem.config.cjs

# View at http://localhost:3000
```

### Deployment to Cloudflare

```bash
# Build and deploy
npm run deploy

# Or manually:
npm run build
npx wrangler pages deploy dist
```

## ⚙️ Configuration

### Social Links
Edit `public/static/app.js` to add your social links:

```javascript
const CONFIG = {
    socialLinks: {
        github: 'https://github.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourusername',
        twitter: 'https://twitter.com/yourusername',
        dribbble: 'https://dribbble.com/yourusername',
    },
    calendlyLink: 'https://calendly.com/yourusername',
    cvLinks: {
        en: '/static/cv-en.pdf',
        ar: '/static/cv-ar.pdf',
    }
};
```

### Adding Real Projects
Replace the demo projects in `src/index.tsx` and update the `projectData` object in `public/static/app.js`.

### Adding Real Photo
Replace the photo placeholder in the About section with an actual `<img>` tag.

### Adding CV Files
Place CV files in `public/static/` directory:
- `cv-en.pdf` - English version
- `cv-ar.pdf` - Arabic version

## 📋 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Main portfolio page |
| `/api/quote` | POST | Submit quote request |
| `/api/newsletter` | POST | Newsletter subscription |
| `/api/contact` | POST | Contact form submission |

## 🎯 Target Audience

- Local companies
- Arab companies
- International companies
- Freelance clients

## 🔧 Not Yet Implemented

- [ ] Backend email integration (currently logs to console)
- [ ] Actual CV files
- [ ] Real project content
- [ ] Personal photo
- [ ] GitHub stats integration
- [ ] Spotify "Now Playing" integration
- [ ] Analytics integration
- [ ] Calendly widget integration

## 📊 Personal Brand Focus

- Modern technologies
- Clean & scalable code
- Creative engineering mindset
- Vibe Coding & Vibe Engineering

## 🌐 Deployment Status

- **Platform:** Cloudflare Pages
- **Status:** ✅ Ready for Production
- **Tech Stack:** Hono + TypeScript + Custom CSS

## 📝 License

Personal portfolio - All rights reserved.

---

Built with ❤️ by Youssef Khamis Al-Assiuty
