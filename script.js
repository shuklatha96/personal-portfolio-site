/**
 * Shuklatha Emmadi — Portfolio Scripts
 */

(function () {
  'use strict';

  /* ── Typing Animation ── */
  const roles = [
    'Full Stack Developer',
    'IoT Engineer',
    'AI/ML Enthusiast',
    'MERN Stack Developer',
  ];
  const typingEl = document.getElementById('typing-text');
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function type() {
    const current = roles[roleIndex];

    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 50;
    } else {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 100;
    }

    if (!isDeleting && charIndex === current.length) {
      typingDelay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingDelay = 500;
    }

    setTimeout(type, typingDelay);
  }

  if (typingEl) type();

  /* ── Particle Network ── */
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticles() {
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 0.5,
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(124, 58, 237, 0.5)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(drawParticles);
      }
    }

    resizeCanvas();
    createParticles();
    if (!prefersReducedMotion) {
      drawParticles();
    } else {
      drawParticles();
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        cancelAnimationFrame(animationId);
        resizeCanvas();
        createParticles();
        if (!prefersReducedMotion) drawParticles();
      }, 200);
    });
  }

  /* ── Sticky Header ── */
  const header = document.getElementById('header');
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ── Mobile Navigation ── */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  function closeMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── Active Nav on Scroll ── */
  const sections = document.querySelectorAll('section[id]');

  function setActiveNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach((section) => {
      const id = section.getAttribute('id');
      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();

  /* ── Intersection Observer — Reveal ── */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ── Skill Bars ── */
  const skillContainers = document.querySelectorAll('.skill-bars');

  skillContainers.forEach((container) => {
    const skills = JSON.parse(container.dataset.skills);
    const levels = JSON.parse(container.dataset.levels);

    skills.forEach((name, i) => {
      const bar = document.createElement('div');
      bar.className = 'skill-bar';
      bar.innerHTML = `
        <div class="skill-bar__header">
          <span class="skill-bar__name">${name}</span>
          <span class="skill-bar__percent">${levels[i]}%</span>
        </div>
        <div class="skill-bar__track">
          <div class="skill-bar__fill" data-level="${levels[i]}"></div>
        </div>
      `;
      container.appendChild(bar);
    });
  });

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-bar__fill').forEach((fill) => {
            fill.style.width = `${fill.dataset.level}%`;
          });
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillContainers.forEach((container) => skillObserver.observe(container));

  /* ── Contact Form ── */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
      const actionUrl = contactForm.getAttribute('action');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      formStatus.className = 'form-status';
      formStatus.textContent = '';

      if (!name || !email || !message) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fill in all fields.';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please enter a valid email address.';
        return;
      }

      if (!actionUrl || actionUrl.includes('your_form_id')) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Formspree is not configured yet. Replace your_form_id in index.html.';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.querySelector('span').textContent = 'Sending...';

      try {
        const response = await fetch(actionUrl, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Form submission failed');
        }

        formStatus.className = 'form-status success';
        formStatus.textContent =
          'Thank you! Your message has been sent successfully.';
        contactForm.reset();
      } catch (error) {
        formStatus.className = 'form-status error';
        formStatus.textContent =
          'Unable to send message right now. Please email shuklathaemmadi@gmail.com.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = 'Send Message';
      }
    });
  }

  /* ── Smooth anchor offset for fixed header ── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
