import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

// 1. Initialize Smooth Scroll (Lenis)
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// 2. Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.setAttribute('data-theme', 'dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// 4. Scroll Triggered Animations (Fade Up)
const fadeUpElements = document.querySelectorAll('.service-card, .process > div > div, .hero h1, .hero p, .hero .btn');

fadeUpElements.forEach((el, index) => {
  gsap.fromTo(el,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      delay: index % 3 * 0.1 // Slight stagger for grid items
    }
  );
});

// 5. Parallax Hero Background Element
gsap.to('.hero-bg-text', {
  yPercent: -20,
  ease: "none",
  scrollTrigger: {
    trigger: '.hero',
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

// 6. Marquee/Ticker Animation
gsap.to('.ticker-content', {
  x: "-50%",
  repeat: -1,
  duration: 15,
  ease: "none"
});

// 7. Reveal Hero Headline
gsap.to('.hero h1, .hero p, .hero .btn', {
  opacity: 1,
  y: 0,
  duration: 1.2,
  ease: "expo.out",
  stagger: 0.2,
  delay: 0.5
});

// 8. Logo Scroll to Top
document.querySelector('.logo').addEventListener('click', (e) => {
  e.preventDefault();
  lenis.scrollTo(0);
});

// 9. Sticky Nav Aesthetic on Scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
    nav.style.padding = "1rem 4rem";
  } else {
    nav.classList.remove('scrolled');
    nav.style.padding = "2rem 4rem";
  }
});

console.log('Origo Brand Story Studio - Interactions Loaded');
