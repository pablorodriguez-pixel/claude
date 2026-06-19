/* Founderz — Global Nav JS */

/* ---- Sticky shadow ---- */
const nav = document.getElementById('fz-nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 4);
window.addEventListener('scroll', onScroll, { passive: true });

/* ---- Dropdowns (hover + click híbrido) ---- */
const dropdownItems = document.querySelectorAll('.fz-nav__item--dropdown');

function closeAllDropdowns(except) {
  dropdownItems.forEach(item => {
    if (item !== except) {
      item.classList.remove('is-open');
      item.querySelector('.fz-nav__trigger').setAttribute('aria-expanded', 'false');
    }
  });
}

dropdownItems.forEach(item => {
  const trigger = item.querySelector('.fz-nav__trigger');

  // Click toggle
  trigger.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = item.classList.contains('is-open');
    closeAllDropdowns(item);
    item.classList.toggle('is-open', !isOpen);
    trigger.setAttribute('aria-expanded', String(!isOpen));
  });

  // Keyboard: escape
  item.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      item.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    }
  });
});

// Click outside cierra dropdowns
document.addEventListener('click', () => closeAllDropdowns(null));

// Overlay transparente activa cuando hay dropdown abierto (cierra al hacer click)
const navOverlay = document.querySelector('[data-overlay]');
const mutObs = new MutationObserver(() => {
  const anyOpen = [...dropdownItems].some(i => i.classList.contains('is-open'));
  navOverlay.classList.toggle('is-visible', anyOpen);
});
dropdownItems.forEach(i => mutObs.observe(i, { attributes: true, attributeFilter: ['class'] }));
navOverlay.addEventListener('click', () => closeAllDropdowns(null));

/* ---- Mobile drawer ---- */
const drawer = document.getElementById('fz-nav-mobile');
const burgerBtns = document.querySelectorAll('[data-burger]');

function openDrawer() {
  drawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  navOverlay.classList.add('is-visible');
}
function closeDrawer() {
  drawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  navOverlay.classList.remove('is-visible');
}

burgerBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = drawer.getAttribute('aria-hidden') === 'false';
    isOpen ? closeDrawer() : openDrawer();
  });
});

navOverlay.addEventListener('click', closeDrawer);

/* ---- Modal asesor ---- */
const advisorModal   = document.getElementById('fz-advisor-modal');
const advisorOverlay = document.querySelector('[data-advisor-overlay]');

function openAdvisor() {
  advisorModal.setAttribute('aria-hidden', 'false');
  advisorOverlay.classList.add('is-visible');
  document.body.style.overflow = 'hidden';
  closeDrawer();
  closeAllDropdowns(null);
  // Focus al primer input
  setTimeout(() => {
    const first = advisorModal.querySelector('input, select, button');
    if (first) first.focus();
  }, 200);
}
function closeAdvisor() {
  advisorModal.setAttribute('aria-hidden', 'true');
  advisorOverlay.classList.remove('is-visible');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-open-advisor]').forEach(el => {
  el.addEventListener('click', openAdvisor);
});
document.querySelectorAll('[data-close-advisor]').forEach(el => {
  el.addEventListener('click', closeAdvisor);
});
advisorOverlay.addEventListener('click', closeAdvisor);

// Escape key cierra modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (advisorModal.getAttribute('aria-hidden') === 'false') closeAdvisor();
    else closeAllDropdowns(null);
  }
});

/* ---- Form asesor: success state ---- */
const advisorForm = document.querySelector('[data-advisor-form]');
if (advisorForm) {
  advisorForm.addEventListener('submit', e => {
    e.preventDefault();
    advisorForm.hidden = true;
    const success = document.querySelector('.fz-advisor-form__success');
    if (success) success.hidden = false;
  });
}
