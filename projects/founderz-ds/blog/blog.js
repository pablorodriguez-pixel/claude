/* ============================================================
   Founderz Blog — blog.js
   Vanilla JS. No dependencies. defer-loaded.
   ============================================================ */

(function () {
  'use strict';

  /* ---- Smooth scroll for anchor links ---- */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      var id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Move focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  }

  /* ---- Accordion (data-open pattern) ---- */
  function initAccordions() {
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-acc-trigger]');
      if (!trigger) return;
      var item = trigger.closest('[data-acc-item]');
      if (!item) return;
      var parent = item.parentElement;
      var isSingle = parent && parent.hasAttribute('data-acc-single');

      if (isSingle) {
        // Close all siblings first
        var siblings = parent.querySelectorAll('[data-acc-item]');
        siblings.forEach(function (sib) {
          if (sib !== item) {
            sib.removeAttribute('data-open');
            var panel = sib.querySelector('[data-acc-panel]');
            if (panel) panel.setAttribute('aria-hidden', 'true');
            var chevron = sib.querySelector('[data-acc-chevron]');
            if (chevron) chevron.style.transform = '';
          }
        });
      }

      var isOpen = item.hasAttribute('data-open');
      if (isOpen) {
        item.removeAttribute('data-open');
        trigger.setAttribute('aria-expanded', 'false');
        var panel = item.querySelector('[data-acc-panel]');
        if (panel) panel.setAttribute('aria-hidden', 'true');
        var chevron = item.querySelector('[data-acc-chevron]');
        if (chevron) chevron.style.transform = '';
      } else {
        item.setAttribute('data-open', 'true');
        trigger.setAttribute('aria-expanded', 'true');
        var panel = item.querySelector('[data-acc-panel]');
        if (panel) panel.setAttribute('aria-hidden', 'false');
        var chevron = item.querySelector('[data-acc-chevron]');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      }
    });
  }

  /* ---- Newsletter forms ---- */
  function markSubmitted() {
    document.body.setAttribute('data-submitted', 'true');
    // Hide sticky bar
    var stickyBar = document.getElementById('sticky-bar');
    if (stickyBar) {
      stickyBar.classList.add('is-hidden');
      stickyBar.setAttribute('aria-hidden', 'true');
    }
    // Show "Ya estás suscrito" in all forms not yet showing success
    showAlreadySubscribed();
  }

  function showAlreadySubscribed() {
    // Sidebar newsletter card — inject message if needed
    var sidebarCard = document.querySelector('.sidebar-card--newsletter');
    if (sidebarCard) {
      var existing = sidebarCard.querySelector('.already-subscribed');
      if (!existing) {
        var msg = document.createElement('p');
        msg.className = 'already-subscribed';
        msg.innerHTML =
          '<svg width="15" height="15" aria-hidden="true"><use href="#i-check"/></svg> Ya estás suscrito';
        sidebarCard.appendChild(msg);
      }
    }
  }

  function showFormSuccess(form) {
    // Find nearest success element
    var parent = form.parentElement;
    var successEl =
      parent.querySelector('.inline-form__success') ||
      parent.querySelector('.sidebar-form__success') ||
      parent.querySelector('.newsletter-section__success');

    form.setAttribute('hidden', '');

    if (successEl) {
      successEl.removeAttribute('hidden');
    }

    markSubmitted();
  }

  function validateEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  function initNewsletterForms() {
    document.addEventListener('submit', function (e) {
      var form = e.target.closest('[data-newsletter-form]');
      if (!form) return;
      e.preventDefault();

      var emailInput = form.querySelector('[type="email"]');
      if (!emailInput) {
        showFormSuccess(form);
        return;
      }

      var val = emailInput.value || '';
      if (!validateEmail(val)) {
        emailInput.setAttribute('aria-invalid', 'true');
        emailInput.classList.add('is-invalid');
        emailInput.focus();
        return;
      }

      emailInput.removeAttribute('aria-invalid');
      emailInput.classList.remove('is-invalid');

      // Simulate async submit
      var btn = form.querySelector('[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Un momento...';
      }

      setTimeout(function () {
        showFormSuccess(form);
      }, 600);
    });

    // Clear invalid state on input
    document.addEventListener('input', function (e) {
      if (e.target.closest('[data-newsletter-form]')) {
        e.target.removeAttribute('aria-invalid');
        e.target.classList.remove('is-invalid');
      }
    });
  }

  /* ---- Sticky bar: clicking the button scrolls to first inline newsletter magnet ---- */
  function initStickyBar() {
    var bar = document.getElementById('sticky-bar');
    var btn = document.getElementById('sticky-bar-btn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var target = document.querySelector('.inline-magnet--newsletter');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        var input = target.querySelector('[type="email"]');
        if (input) {
          setTimeout(function () {
            input.focus();
          }, 400);
        }
      }
    });

    // Hide sticky bar once user has already submitted
    if (document.body.hasAttribute('data-submitted')) {
      if (bar) {
        bar.classList.add('is-hidden');
        bar.setAttribute('aria-hidden', 'true');
      }
    }
  }

  /* ---- Run ---- */
  function init() {
    initSmoothScroll();
    initAccordions();
    initNewsletterForms();
    initStickyBar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
