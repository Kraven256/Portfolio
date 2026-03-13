/* ========================================
   KRAVEN Portfolio - JavaScript
   ======================================== */

// Initialize Lucide icons
lucide.createIcons();

// ========================================
// Particle Background
// ========================================
class ParticleCanvas {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numParticles = 80;
        this.mouseX = 0;
        this.mouseY = 0;
        this.connectedDistance = 120;
        
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                color: this.getRandomColor(),
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    getRandomColor() {
        const colors = ['#00ffaa', '#7b68ee', '#ff6b35'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    update() {
        this.particles.forEach(particle => {
            // Mouse interaction - particles flee from cursor
            const dx = particle.x - this.mouseX;
            const dy = particle.y - this.mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                const force = (100 - distance) / 100;
                particle.vx += Math.cos(angle) * force * 0.5;
                particle.vy += Math.sin(angle) * force * 0.5;
            }

            // Apply velocity
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;

            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
                particle.x = Math.max(0, Math.min(particle.x, this.canvas.width));
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
                particle.y = Math.max(0, Math.min(particle.y, this.canvas.height));
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectedDistance) {
                    const opacity = (1 - distance / this.connectedDistance) * 0.3;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(0, 255, 170, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }

        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
        });
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// ========================================
// Typing Effect
// ========================================
class TypingEffect {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = texts;
        this.typeSpeed = options.typeSpeed || 100;
        this.deleteSpeed = options.deleteSpeed || 50;
        this.delay = options.delay || 2000;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeDelay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeDelay = this.delay;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeDelay = 500;
        }

        setTimeout(() => this.type(), typeDelay);
    }
}

// ========================================
// Counter Animation
// ========================================
class CounterAnimation {
    constructor(elements) {
        this.elements = elements;
        this.animated = false;
        
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animated = true;
                    this.animateCounters();
                }
            });
        }, { threshold: 0.5 });

        this.elements.forEach(el => observer.observe(el));
    }

    animateCounters() {
        this.elements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }
}

// ========================================
// Scroll Animations
// ========================================
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.animate-on-scroll');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger skill bars animation
                    if (entry.target.closest('.skill-card')) {
                        entry.target.classList.add('visible');
                    }
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

        this.elements.forEach(el => observer.observe(el));
    }
}

// ========================================
// Navigation
// ========================================
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section');
        this.mobileToggle = document.getElementById('mobile-toggle');
        this.navLinksContainer = document.getElementById('nav-links');
        
        this.init();
    }

    init() {
        // Scroll effect
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Smooth scroll
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Mobile toggle
        this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());

        // Active section highlighting
        this.highlightActiveSection();
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            
            // Close mobile menu
            this.navLinksContainer.classList.remove('active');
            this.mobileToggle.classList.remove('active');
        }
    }

    toggleMobileMenu() {
        this.navLinksContainer.classList.toggle('active');
        this.mobileToggle.classList.toggle('active');
    }

    highlightActiveSection() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.3 });

        this.sections.forEach(section => observer.observe(section));
    }
}

// ========================================
// Form Handling
// ========================================
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const btn = this.form.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        
        // Loading state
        btn.innerHTML = '<span>Sending...</span>';
        btn.disabled = true;
        
        // Simulate sending (replace with actual endpoint)
        setTimeout(() => {
            btn.innerHTML = '<span>Message Sent!</span><i data-lucide="check"></i>';
            lucide.createIcons();
            this.form.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                lucide.createIcons();
            }, 3000);
        }, 1500);
    }
}

// ========================================
// Skill Progress Animation
// ========================================
class SkillProgress {
    constructor() {
        this.skillCards = document.querySelectorAll('.skill-card');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });

        this.skillCards.forEach(card => observer.observe(card));
    }
}

// ========================================
// Initialize Everything
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Particle background
    new ParticleCanvas();
    
    // Typing effect
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        new TypingEffect(typingElement, [
            'Frontend Developer',
            'UI/UX Designer',
            'React Specialist',
            'Creative Coder'
        ]);
    }
    
    // Counter animations
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length > 0) {
        new CounterAnimation(counters);
    }
    
    // Scroll animations
    new ScrollAnimations();
    
    // Navigation
    new Navigation();
    
    // Contact form
    new ContactForm();
    
    // Skill progress
    new SkillProgress();
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add parallax effect to floating shapes
window.addEventListener('scroll', () => {
    const shapes = document.querySelectorAll('.shape');
    const scrolled = window.pageYOffset;
    
    shapes.forEach((shape, index) => {
        const speed = 0.05 + (index * 0.02);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});
