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

  // Hero entrance — clip reveal plays once on load
  window.addEventListener('load', () => {
    document.body.classList.add('is-loaded');
  });
  // Fallback in case 'load' already fired
  if (document.readyState === 'complete') {
    document.body.classList.add('is-loaded');
  }

  // Role-based scroll reveals: default / slide / clip
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-slide, .reveal-clip, .fade-in')
    .forEach(el => revealObserver.observe(el));

  // Fallback: force-reveal everything after 1.5s in case observer doesn't fire
  setTimeout(() => {
    document.querySelectorAll('.reveal, .reveal-slide, .reveal-clip, .fade-in')
      .forEach(el => el.classList.add('visible'));
  }, 1500);

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
    const duration = 1100;
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

  // Smooth reveal stagger for legacy team cards (sub pages)
  document.querySelectorAll('.team-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });

  // Timeline + Projects scroll arrows (sub pages)
  document.querySelectorAll('.timeline-wrapper').forEach(wrapper => {
    const scroll = wrapper.querySelector('.timeline-scroll') || wrapper.querySelector('.projects-scroll');
    const leftBtn = wrapper.querySelector('.timeline-arrow--left');
    const rightBtn = wrapper.querySelector('.timeline-arrow--right');

    leftBtn?.addEventListener('click', () => {
      scroll.scrollBy({ left: -260, behavior: 'smooth' });
    });

    rightBtn?.addEventListener('click', () => {
      scroll.scrollBy({ left: 260, behavior: 'smooth' });
    });
  });

  // Project modal — triggers on cards and editorial rows
  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.getAttribute('data-modal');
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
      closeLightbox();
    }
  });
});

function openLightbox(el) {
  const img = el.querySelector('img');
  if (!img) return;
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox').classList.add('active');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
}

async function shareNews(title) {
  const url = window.location.href;
  if (navigator.share) {
    try {
      await navigator.share({ title, text: title, url });
    } catch (e) { /* user cancelled */ }
  } else {
    try {
      await navigator.clipboard.writeText(url);
      alert('Bağlantı kopyalandı!');
    } catch (e) {
      window.open('https://wa.me/?text=' + encodeURIComponent(title + ' ' + url), '_blank');
    }
  }
}