/* Founderz MAIC Landing — interactividad mínima */

/* ---- Rotador de palabras en el hero ---- */
document.querySelectorAll('.maic-rotator').forEach(el => {
  const words = el.dataset.words.split(',');
  let i = 0;
  setInterval(() => {
    i = (i + 1) % words.length;
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = words[i];
      el.style.opacity = '1';
    }, 200);
  }, 2400);
});

/* ---- Formularios: submit simulado + success state ---- */
document.querySelectorAll('[data-maic-form]').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const card = form.closest('.maic-form-card');
    form.hidden = true;
    const success = card.querySelector('.maic-form__success');
    if (success) success.hidden = false;
    const pills = card.querySelector('.maic-form__trust-pills');
    if (pills) pills.hidden = true;
  });
});
