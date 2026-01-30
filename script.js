// ==========================================
// Enhanced Smooth Scroll
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;

      // Custom smooth scroll with easing
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let start = null;

      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
    }
  });
});

// ==========================================
// Header Scroll Effect
// ==========================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.boxShadow = '0 4px 20px rgba(26, 31, 54, 0.1)';
    header.style.background = 'rgba(255, 255, 255, 0.98)';
  } else {
    header.style.boxShadow = '0 1px 0 rgba(26, 31, 54, 0.05)';
    header.style.background = 'rgba(255, 255, 255, 0.95)';
  }

  lastScroll = currentScroll;
});

// ==========================================
// Mobile Menu
// ==========================================
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const body = document.body;

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.contains('nav--mobile');

    if (isOpen) {
      nav.classList.remove('nav--mobile');
      menuBtn.classList.remove('menu-btn--active');
      body.style.overflow = '';
    } else {
      nav.classList.add('nav--mobile');
      menuBtn.classList.add('menu-btn--active');
      body.style.overflow = 'hidden';
    }
  });

  // Close menu when clicking nav links
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav--mobile');
      menuBtn.classList.remove('menu-btn--active');
      body.style.overflow = '';
    });
  });
}

// ==========================================
// Intersection Observer for Animations
// ==========================================
const observerOptions = {
  threshold: 0.05,
  rootMargin: '0px 0px -80px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add stagger delay for elements
      setTimeout(() => {
        entry.target.classList.add('fade-in-up');
      }, index * 50);
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Elements to animate
const animateElements = [
  '.feature',
  '.plan',
  '.plan-detail',
  '.facility-row',
  '.usecase-card',
  '.faq-item',
  '.comparison-table',
  '.recommend-box',
  '.nearby-item',
  '.access-grid > *',
  '.overview-image',
  '.section-title',
  '.hero-content > *'
];

// Apply initial styles and observe
animateElements.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`;
    fadeInObserver.observe(el);
  });
});

// Add fade-in class styles
const style = document.createElement('style');
style.textContent = `
  .fade-in-up {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }

  .fade-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }

  .nav--mobile {
    display: flex !important;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.98);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    animation: slideDown 0.3s ease;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .menu-btn--active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .menu-btn--active span:nth-child(2) {
    opacity: 0;
  }

  .menu-btn--active span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
`;
document.head.appendChild(style);

// ==========================================
// Smooth Parallax Effect on Hero
// ==========================================
const heroImage = document.querySelector('.hero-bg img');
let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const parallax = scrolled * 0.3; // Reduced for smoother effect

  if (heroImage && scrolled < window.innerHeight) {
    heroImage.style.transform = `translateY(${parallax}px) scale(1.05)`;
    heroImage.style.willChange = 'transform';
  }

  ticking = false;
}

function requestTick() {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

window.addEventListener('scroll', requestTick, { passive: true });

// ==========================================
// FAQ Smooth Toggle
// ==========================================
document.querySelectorAll('.faq-item').forEach(item => {
  const summary = item.querySelector('summary');
  const content = item.querySelector('p');

  summary.addEventListener('click', (e) => {
    e.preventDefault();

    if (item.hasAttribute('open')) {
      item.removeAttribute('open');
    } else {
      // Close other FAQs
      document.querySelectorAll('.faq-item[open]').forEach(openItem => {
        if (openItem !== item) {
          openItem.removeAttribute('open');
        }
      });
      item.setAttribute('open', '');
    }
  });
});

// ==========================================
// Smooth Loading Animation
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');

  // Animate hero content with better timing
  const heroTitle = document.querySelector('.hero-title');
  const heroLead = document.querySelector('.hero-lead');
  const heroCta = document.querySelector('.hero-cta');

  if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(40px)';

    setTimeout(() => {
      heroTitle.style.transition = 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 200);
  }

  if (heroLead) {
    heroLead.style.opacity = '0';
    heroLead.style.transform = 'translateY(30px)';

    setTimeout(() => {
      heroLead.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
      heroLead.style.opacity = '1';
      heroLead.style.transform = 'translateY(0)';
    }, 400);
  }

  if (heroCta) {
    heroCta.style.opacity = '0';
    heroCta.style.transform = 'translateY(20px)';

    setTimeout(() => {
      heroCta.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      heroCta.style.opacity = '1';
      heroCta.style.transform = 'translateY(0)';
    }, 600);
  }
});

// ==========================================
// Performance: Lazy Loading Images
// ==========================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });
}

console.log('LLACハウス - 瀬戸内のコワーキングスペース');
