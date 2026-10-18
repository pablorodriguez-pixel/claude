/* Especial 1.000: sello en la portada y «¡Mil gracias!» en el cierre (capa encima de todo) */
{
  const chip1 = el('div', null, { left: '0', top: '196px', width: '1080px', textAlign: 'center', zIndex: 9000 },
    `<span style="display:inline-block;font-family:Bricolage;font-weight:800;font-size:40px;letter-spacing:.04em;color:#111;background:#FFE600;border:5px solid #111;border-radius:40px;padding:8px 28px;box-shadow:6px 6px 0 rgba(0,0,0,.35);transform:rotate(-3deg)">★ ESPECIAL 1.000 ★</span>`);
  const chip2 = el('div', null, { left: '0', top: '1010px', width: '1080px', textAlign: 'center', zIndex: 9000 },
    `<span style="display:inline-block;font-family:Playfair;font-weight:900;font-size:54px;color:#fff;background:#FF3EA5;border:6px solid #111;border-radius:24px;padding:10px 34px;box-shadow:8px 8px 0 #111;transform:rotate(-2deg)">¡Mil gracias, vecinos! 🎉</span>`);
  const TEND = W[W.length - 1].e;            // fin de «libro.»
  const T2 = find('y esto no venia en el libro') >= 0 ? w(find('y esto no venia en el libro')) : TEND - 1.5;
  const _f = window.frame;
  window.frame = t => {
    _f(t);
    // portada: visible en el fotograma 0 y hasta el s 2,6; vuelve en el bucle final
    const o1 = (t < 2.6 ? 1 - p(t, 2.3, 0.3) : 0) || (t > TEND + 0.2 ? 1 : 0);
    set(chip1, { o: o1, s: t < 0.05 ? 1 : 1 + 0.03 * Math.sin(t * 6) });
    const on2 = t >= T2 && t <= TEND + 0.2;
    set(chip2, { o: on2 ? 1 : 0, s: on2 ? pop(t, T2, 0.4) : 1, y: on2 ? Math.sin(t * 5) * 6 : 0 });
  };
}
