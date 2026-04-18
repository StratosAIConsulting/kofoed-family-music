/* =============================================================
   KOFOED FAMILY MUSIC — script.js
   ============================================================= */

'use strict';

/* ---- Footer year ---- */
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---- Sticky nav: transparent → solid on scroll ---- */
(function initStickyNav() {
  const header = document.getElementById('site-header');
  if (!header) return;

  function updateNav() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Run once on load in case page is already scrolled
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });
})();

/* ---- Mobile menu toggle ---- */
(function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  function openMenu() {
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function () {
    if (menu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when a link is clicked
  menu.querySelectorAll('.mobile-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
      toggle.focus();
    }
  });
})();

/* ---- Smooth-scroll nav links (offset for fixed header) ---- */
(function initSmoothScroll() {
  const NAV_HEIGHT = 64;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();

/* ---- Scroll reveal with IntersectionObserver ---- */
(function initReveal() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: just show everything
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();

/* ---- Staggered discog grid tiles ---- */
(function initDiscogStagger() {
  var tiles = document.querySelectorAll('.discog-tile');
  if (!tiles.length) return;

  tiles.forEach(function (tile, i) {
    tile.style.transitionDelay = (i * 45) + 'ms';
  });

  if (!('IntersectionObserver' in window)) {
    tiles.forEach(function (tile) { tile.style.opacity = '1'; });
    return;
  }

  // Add initial hidden state
  tiles.forEach(function (tile) {
    tile.style.opacity = '0';
    tile.style.transform = 'translateY(20px)';
    tile.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.25s ease, outline 0.25s ease';
  });

  var gridObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Animate all tiles once the grid scrolls into view
          tiles.forEach(function (tile) {
            tile.style.opacity = '1';
            tile.style.transform = 'translateY(0)';
          });
          gridObserver.disconnect();
        }
      });
    },
    { threshold: 0.05 }
  );

  var grid = document.querySelector('.discog-grid');
  if (grid) gridObserver.observe(grid);
})();

/* ---- Keyboard: activate discog tiles with Enter/Space ---- */
(function initTileKeyboard() {
  document.querySelectorAll('.discog-tile').forEach(function (tile) {
    tile.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // Simulate click — in production this would navigate to the song page
        tile.click();
      }
    });
  });
})();

/* ---- Email form: basic client-side validation feedback ---- */
(function initEmailForm() {
  var form  = document.querySelector('.email-form');
  var input = document.getElementById('email-input');
  if (!form || !input) return;

  form.addEventListener('submit', function (e) {
    var email = input.value.trim();
    // Very basic RFC-5322-ish check before submitting
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.preventDefault();
      input.focus();
      input.style.borderColor = '#e05252';
      input.setAttribute('aria-invalid', 'true');
      return;
    }
    input.style.borderColor = '';
    input.setAttribute('aria-invalid', 'false');
    /*
      REPLACE: When connected to Mailchimp/ConvertKit, remove the mailto action
      and instead use fetch() to POST to the API endpoint, then show a success
      message in the DOM rather than navigating away.
    */
  });

  input.addEventListener('input', function () {
    input.style.borderColor = '';
    input.removeAttribute('aria-invalid');
  });
})();

/* ---- Video carousel ---- */
(function initVideoCarousel() {
  var iframe   = document.getElementById('video-main-iframe');
  var caption  = document.getElementById('video-main-caption');
  var thumbs   = Array.from(document.querySelectorAll('.video-thumb-btn'));
  var prevBtn  = document.querySelector('.video-arrow-prev');
  var nextBtn  = document.querySelector('.video-arrow-next');
  if (!iframe || !thumbs.length) return;

  var current = 0;

  function goTo(index) {
    current = (index + thumbs.length) % thumbs.length;
    var btn = thumbs[current];
    iframe.src = 'https://www.youtube.com/embed/' + btn.dataset.videoId;
    if (caption) caption.innerHTML = btn.dataset.caption;
    thumbs.forEach(function(t) { t.classList.remove('is-active'); });
    btn.classList.add('is-active');

  }

  thumbs.forEach(function(btn, i) {
    btn.addEventListener('click', function() { goTo(i); });
  });

  if (prevBtn) prevBtn.addEventListener('click', function() { goTo(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function() { goTo(current + 1); });
})();
