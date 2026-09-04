document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Mobile nav toggle
  navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Scroll fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Counter animation
  const counters = document.querySelectorAll('.stat-number[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  function animateCounter(el, target) {
    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString('tr-TR');

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString('tr-TR');
      }
    }

    requestAnimationFrame(update);
  }

  // Smooth reveal for team cards stagger
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });

  // Timeline scroll arrows
  const timelineWrappers = document.querySelectorAll('.timeline-wrapper');
  timelineWrappers.forEach(wrapper => {
    const scroll = wrapper.querySelector('.timeline-scroll');
    const leftBtn = wrapper.querySelector('.timeline-arrow--left');
    const rightBtn = wrapper.querySelector('.timeline-arrow--right');

    leftBtn?.addEventListener('click', () => {
      scroll.scrollBy({ left: -260, behavior: 'smooth' });
    });

    rightBtn?.addEventListener('click', () => {
      scroll.scrollBy({ left: 260, behavior: 'smooth' });
    });
  });

  // Project modal
  document.querySelectorAll('.project-card[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
      const modalId = card.getAttribute('data-modal');
      const overlay = document.getElementById(modalId);
      if (overlay) overlay.classList.add('active');
    });
  });

  document.querySelectorAll('.project-modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  document.querySelectorAll('.project-modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.project-modal-overlay').classList.remove('active');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.project-modal-overlay.active').forEach(o => o.classList.remove('active'));
    }
  });
});
