# Portfolio Website Specification

## 1. Project Overview

- **Project Name**: KRAVEN Portfolio
- **Type**: Single-page animated portfolio website
- **Core Functionality**: A visually stunning portfolio showcasing frontend development skills with premium animations and modern aesthetics
- **Target Users**: Potential employers, clients, and collaborators in the tech industry

---

## 2. UI/UX Specification

### Layout Structure

**Sections (in order):**
1. **Hero Section** - Full viewport with animated introduction
2. **About Section** - Personal info with animated counters
3. **Skills Section** - Interactive skill cards with hover effects
4. **Projects Section** - Showcase of work with hover reveal
5. **Contact Section** - Contact form with animated inputs
6. **Footer** - Social links and copyright

**Responsive Breakpoints:**
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

### Visual Design

**Color Palette:**
- Background Primary: `#0a0a0f` (Deep black)
- Background Secondary: `#12121a` (Dark charcoal)
- Accent Primary: `#00ffaa` (Electric mint)
- Accent Secondary: `#ff6b35` (Vibrant coral)
- Accent Tertiary: `#7b68ee` (Medium slate blue)
- Text Primary: `#ffffff` (White)
- Text Secondary: `#8a8a9a` (Muted gray)
- Gradient: `linear-gradient(135deg, #00ffaa 0%, #7b68ee 100%)`

**Typography:**
- Headings: 'Clash Display', sans-serif (from CDN)
- Body: 'Satoshi', sans-serif (from CDN)
- Code/Mono: 'JetBrains Mono', monospace (from Google Fonts)
- Hero Title: 80px (desktop), 48px (mobile)
- Section Titles: 48px (desktop), 32px (mobile)
- Body Text: 18px
- Small Text: 14px

**Spacing System:**
- Section Padding: 120px vertical (desktop), 80px (mobile)
- Container Max Width: 1200px
- Card Padding: 32px
- Element Gap: 24px

**Visual Effects:**
- Glassmorphism cards with `backdrop-filter: blur(10px)`
- Glow effects on hover using box-shadow with accent colors
- Gradient borders on cards
- Noise texture overlay for depth

### Components

**1. Navigation Bar:**
- Fixed position with glassmorphism effect
- Logo/Name on left
- Navigation links on right
- Hamburger menu on mobile
- Smooth scroll to sections

**2. Hero Section:**
- Canvas particle background animation
- Animated typing text for role
- Staggered reveal animation for name
- Floating geometric shapes
- Scroll indicator at bottom

**3. About Section:**
- Animated profile image with glow
- Stats counters (years exp, projects, clients)
- Fade-up scroll animations

**4. Skills Section:**
- Grid of skill cards
- Progress bars with fill animation
- Hover: scale + glow effect
- Categories: Frontend, Tools, Other

**5. Projects Section:**
- Masonry-style grid
- Project cards with image overlay
- Hover: reveal project details + links
- Filter by category (optional)

**6. Contact Section:**
- Animated input fields
- Submit button with ripple effect
- Social media icons with hover animations
- Email copy functionality

### Animations Specification

**1. Page Load:**
- Staggered fade-in for hero elements (delay: 0.1s increments)
- Logo slide-in from top
- Navigation fade-in (delay: 0.5s)

**2. Scroll Animations:**
- Intersection Observer based
- Fade-up: translateY(50px) → translateY(0), opacity 0 → 1
- Duration: 0.8s, easing: cubic-bezier(0.4, 0, 0.2, 1)
- Threshold: 0.2

**3. Hover Effects:**
- Scale: 1.02 - 1.05
- Box-shadow glow with accent color
- Transition duration: 0.3s

**4. Particle Background:**
- Canvas-based floating particles
- Connect lines when close
- Mouse interaction (particles flee cursor)
- Color: accent primary with varying opacity

**5. Typing Animation:**
- For hero role text
- Cursor blink effect
- Type speed: 100ms per character

**6. Counter Animation:**
- Count from 0 to target value
- Duration: 2s
- Easing: ease-out

---

## 3. Functionality Specification

### Core Features

1. **Smooth Scrolling**: Native CSS scroll-behavior + JS enhancement
2. **Navigation**: Click to scroll to sections, active state highlighting
3. **Particle Background**: Interactive canvas animation
4. **Scroll Animations**: Elements animate on scroll into view
5. **Typing Effect**: Animated text in hero section
6. **Counter Animation**: Stats count up when visible
7. **Form Handling**: Client-side validation (visual only)
8. **Mobile Menu**: Slide-in navigation for mobile
9. **Theme Toggle**: Optional (default dark)

### User Interactions

- Hover on cards: Scale + glow
- Click navigation: Smooth scroll
- Scroll: Trigger section animations
- Mobile: Tap menu icon for navigation
- Form: Focus effects on inputs

### Data Handling

- Static content (no backend)
- Form submission: Visual feedback only (can integrate later)
- Project data: Hardcoded array

### Edge Cases

- Graceful degradation if JS disabled
- Fallback fonts if CDN fails
- Reduced motion support via prefers-reduced-motion

---

## 4. Acceptance Criteria

### Visual Checkpoints

- [ ] Dark theme with mint/coral accents visible
- [ ] Particle background animating in hero
- [ ] Navigation fixed and glassmorphic
- [ ] All sections have scroll animations
- [ ] Hover effects work on all interactive elements
- [ ] Responsive on mobile/tablet/desktop
- [ ] Typography matches spec (Clash Display, Satoshi)

### Functional Checkpoints

- [ ] Smooth scroll to sections works
- [ ] Navigation highlights active section
- [ ] Mobile menu opens/closes
- [ ] Counters animate when scrolled into view
- [ ] No console errors
- [ ] All fonts load correctly

---

## 5. Technical Stack

- **HTML5**: Semantic structure
- **CSS3**: Custom properties, animations, flexbox/grid
- **JavaScript**: Vanilla JS (no frameworks)
- **External Resources**:
  - Fonts: Clash Display, Satoshi (Fontshare CDN)
  - Icons: Lucide Icons (CDN)
  - No external JS libraries (pure canvas for particles)

---

## 6. File Structure

```
Portfolio/
├── index.html      (Main HTML file)
├── style.css       (All styles)
├── script.js       (All JavaScript)
└── SPEC.md         (This file)
