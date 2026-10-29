/* Ep. 82 · ¿Por qué las camisas de mujer se abrochan al revés? — la culpa es de la criada (y de la espada) · pícaro y cercano */
Story.prepara();
const T = {
  rev0: Q('al revés'),
  liado: Q('te has liado'), pareja: Q('tu pareja'), torpeza: Q('no es torpeza'), culpa1: Q('es culpa'), siglos1: Q('cuatro siglos'),
  caros: Q('carísimos'), ricos: Q('los ricos'),
  truco: Q('el truco'), solos: Q('se vestían solos'), senoras: Q('las señoras no'), criada: Q('la criada'), frente: Q('de frente'),
  reves4: Q('al revés'), comodo: Q('cómodo para la criada'), senora: Q('para la señora'),
  hombres: Q('los hombres'), lado: Q('al otro lado'), mano: Q('la mano derecha'), espada: Q('la espada'), engancharse: Q('sin engancharse'),
  siglos7: Q('los siglos'), criadas7: Q('las criadas desaparecieron'), espadas7: Q('las espadas también'),
  igual: Q('exactamente igual'), nadie: Q('nadie se atrevió'),
  manana: Q('cada mañana'), millones: Q('millones de mujeres'), comodidad: Q('la comodidad'), criada9: Q('una criada'), hace9: Q('hace siglos'),
  ojo: Q('ojo'), teorias: Q('más teorías'),
  osea: Q('o sea'), camisa11: Q('su camisa'), culpa11: Q('la culpa'), criada11: Q('de la criada'),
};
const AZUL_C = '#9cc3e6', ROSA_C = '#f4b6c8', GRIS = '#8d8a96';
/* camisa (vb 0 0 300 360). lado 'H' = botones a la izquierda de quien mira (hombre), 'M' = a la derecha (mujer) */
const CAMISA = (c, x, y, w, lado = 'H', col = AZUL_C, z = 8) => { const bx = lado === 'H' ? 132 : 168;
  const d = box(c, x, y, w, w * 1.2, { zIndex: z, transformOrigin: '50% 10%' }, `<svg viewBox="0 0 300 360" width="${w}" height="${w * 1.2}"><path d="M90,20 L130,10 L150,40 L170,10 L210,20 L290,80 L260,140 L235,115 V350 H65 V115 L40,140 L10,80 Z" fill="${col}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
  <path d="M150,40 V350" stroke="${INK}" stroke-width="4" opacity=".5"/><rect x="${bx - 14}" y="40" width="28" height="310" fill="rgba(255,255,255,.35)" stroke="${INK}" stroke-width="4"/>
  <path d="M130,10 L150,40 L118,62 Z M170,10 L150,40 L182,62 Z" fill="#fff" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  ${[90, 145, 200, 255, 310].map(by => `<g class="bt"><circle cx="${bx}" cy="${by}" r="13" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="${bx - 4}" cy="${by}" r="2.5" fill="${INK}"/><circle cx="${bx + 4}" cy="${by}" r="2.5" fill="${INK}"/></g>`).join('')}</svg>`);
  d.bts = [...d.querySelectorAll('.bt')]; d.bx = bx; return d; };
const latido = (cam, t, t0) => cam.bts.forEach((b, i) => { const k = 1 + 0.35 * Math.max(0, Math.sin((t - t0) * 7 - i * 0.6)) * (t > t0 ? 1 : 0); b.setAttribute('transform', `translate(${cam.bx} ${90 + i * 55}) scale(${f1(k)}) translate(${-cam.bx} ${-(90 + i * 55)})`); });
const MANO = (c, x, y, sz = 170, rot = -40, z = 18) => box(c, x, y, sz, sz, { zIndex: z }, `<svg viewBox="-60 -70 120 120" width="${sz}" height="${sz}" style="overflow:visible">${gloveHand(0, 0, rot, 1.1)}</svg>`);
const ESPADA = (c, x, y, h = 520, z = 12) => box(c, x, y, 80, h, { zIndex: z, transformOrigin: '50% 85%' }, `<svg viewBox="0 0 80 520" width="80" height="${h}"><path d="M40,0 L54,30 V400 H26 V30 Z" fill="#dfe6ec" stroke="${INK}" stroke-width="6"/><path d="M40,30 V390" stroke="#fff" stroke-width="5"/><rect x="0" y="400" width="80" height="22" rx="8" fill="${GOLD}" stroke="${INK}" stroke-width="6"/><rect x="30" y="422" width="20" height="70" fill="#6b4a2a" stroke="${INK}" stroke-width="5"/><circle cx="40" cy="500" r="16" fill="${GOLD}" stroke="${INK}" stroke-width="5"/></svg>`);
const MARCO = (c, x, y, w, h, z = 6) => box(c, x, y, w, h, { zIndex: z, background: '#d9c9a3', border: `22px solid ${GOLD}`, outline: `6px solid ${INK}`, boxShadow: `14px 14px 0 ${INK}, inset 0 0 0 6px ${INK}`, overflow: 'hidden' });
const fantasma = g => { g.style.filter = 'grayscale(1) brightness(1.5) drop-shadow(0 0 18px #bfe4ff)'; return g; };
const puf = (c, n = 6) => [...Array(n)].map(() => ESTRELLA(c, 70, '#ffffff'));
const pufA = (bs, t, t0, cx, cy) => bs.forEach((b, i) => { const k = p(t, t0, 0.5, E.outCubic), a = i * 6.28 / bs.length; set(b, { o: t > t0 && k < 1 ? 1 - k : 0, x: cx + Math.cos(a) * 160 * k - 35, y: cy + Math.sin(a) * 160 * k - 35, s: 0.5 + k }); });
const SALA = { background: '#e9d3b4', backgroundImage: 'repeating-linear-gradient(90deg, rgba(122,31,58,.10) 0 40px, transparent 40px 80px)' };

/* L0 · PORTADA (fotograma 0 completo): camisa de él y de ella, botones en lados opuestos, flecha ⇄ y sello */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  texto(c, 210, '¿Por qué se abrochan…', { size: 88 });
  const t2 = texto(c, 320, '…al ' + hlSpan('REVÉS', 'phl') + '?', { size: 130, italic: true });
  const h = CAMISA(c, 90, 620, 400, 'H', AZUL_C), m = CAMISA(c, 590, 620, 400, 'M', ROSA_C);
  const ch = chip(c, 210, 540, 'ÉL', { size: 64, bg: '#2b8ad6' }), cm = chip(c, 700, 540, 'ELLA', { size: 64, bg: '#e8507a' });
  const fl = box(c, 400, 900, 280, 140, { zIndex: 14 }, `<svg viewBox="0 0 280 140" width="280" height="140"><path d="M20,50 H250 M210,15 L255,50 L210,85" stroke="${RED}" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M260,100 H30 M70,65 L25,100 L70,135" stroke="${INK}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
  const sel = stamp(c, 300, 1230, '¡AL REVÉS!', { size: 100, z: 30 });
  sfx('swoosh_up', 0.05, 0.6); sp(T.rev0, 'stamp', 0.9); sp(T.rev0 + 0.1, 'boing', 0.6);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
    set(h, { r: -4 + Math.sin(t * 3) * 3 }); set(m, { r: 4 - Math.sin(t * 3) * 3 }); latido(h, t, 0); latido(m, t, 0);
    set(fl, { s: 1 + 0.08 * Math.sin(t * 8), r: Math.sin(t * 2) * 4 }); set(ch, { r: -6 }); set(cm, { r: 6 });
    stampA(sel, t, t < T.rev0 ? -1 : T.rev0, -6);
  };
}, { sfx: false });
shakeAt(T.rev0, 0.3, 12);

/* L1a · tú peleándote con la camisa de tu pareja (sudor, «¿pero esto cómo va?») → NO ES TORPEZA */
headline(L(1) - 0.1, T.culpa1 - 0.1, 'No es *torpeza*', { size: 100, hlT: T.torpeza });
plano(L(1) - 0.1, T.culpa1 - 0.1, { background: '#f6d6c8', backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,.5), transparent 60%)' }, c => {
  const cam = CAM(c);
  const tu = PERS(cam, 330, 560, 380, { ropa: '#2b8ad6', pelo: 'corto' });
  const cam2 = CAMISA(cam, 600, 640, 400, 'M', ROSA_C, 12);
  const mi = MANO(cam, 700, 760, 170, -30), md = MANO(cam, 820, 860, 150, 30);
  const su = [sudor(cam, 360, 460), sudor(cam, 640, 500)];
  const boc = BOCADILLO(cam, 60, 400, '¿pero esto<br>cómo va?', { size: 54 });
  const tor = stamp(cam, 330, 1180, 'NO ES TORPEZA', { size: 70, col: VERDEI, z: 30, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  sp(T.liado, 'scratch', 0.6); sp(T.liado + 0.5, 'scratch', 0.5); sp(T.pareja, 'boing', 0.6); sp(T.torpeza, 'stamp', 1);
  return t => {
    zoom(cam, t, L(1), 4, 0.07);
    pFace(tu, t, { feliz: t > T.torpeza ? 1 : -1, ceja: t > T.torpeza ? 4 : 16, look: [10, 8], jaw: t > T.torpeza ? 0.4 : 0.15 });
    set(cam2, { r: Math.sin(t * 9) * (t < T.torpeza ? 4 : 0) }); latido(cam2, t, T.liado);
    set(mi, { x: Math.sin(t * 14) * 14, y: Math.cos(t * 11) * 10 }); set(md, { x: Math.sin(t * 12 + 1) * 14 });
    su.forEach((s, i) => { const k = ((t + i * 0.5) * 0.9) % 1; set(s, { o: t < T.torpeza ? 1 - k : 0, y: k * 120 }); });
    popA(boc, t, T.liado + 0.2, { r: -4 }); stampA(tor, t, T.torpeza, -6);
  };
});
shakeAt(T.torpeza, 0.3, 10);

/* L1b · es culpa de alguien de hace cuatro siglos: retrato al óleo con la señora y su criada → CULPABLE */
headline(T.culpa1 - 0.1, L(2) - 0.1, 'Hace *4 siglos*', Object.assign({ size: 100, hlT: T.siglos1 }, BL));
plano(T.culpa1 - 0.1, L(2) - 0.1, { background: '#3d2230', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.18) 0 30px, transparent 30px 60px)' }, c => {
  const cam = CAM(c);
  const mar = MARCO(cam, 300, 400, 640, 700);
  const se = PERS(mar, 260, 230, 300, { ropa: '#b02e5a', pelo: 'moño', cuello: true });
  const cr = PERS(mar, 20, 300, 260, { ropa: GRIS, pelo: 'corto', gorro: 'cofia' });
  const cul = stamp(cam, 380, 1120, 'CULPABLE', { size: 96, z: 30 });
  const lupa = box(cam, 120, 560, 200, 200, { zIndex: 20 }, `<svg viewBox="0 0 200 200" width="200" height="200"><circle cx="80" cy="80" r="62" fill="rgba(200,230,255,.35)" stroke="${INK}" stroke-width="14"/><path d="M126,126 L190,190" stroke="${INK}" stroke-width="22" stroke-linecap="round"/></svg>`);
  sp(T.culpa1, 'whoosh', 0.6); sp(T.siglos1, 'tada', 0.7); sp(T.siglos1 + 0.5, 'stamp', 1);
  return t => {
    zoom(cam, t, T.culpa1, 2.5, 0.1); set(mar, { s: pop(t, T.culpa1 - 0.1, 0.4), r: -2 });
    pFace(se, t, { feliz: 1, look: [-8, 0], ceja: 6 }); pFace(cr, t, { feliz: 0.3, look: [10, 0], seed: 1 });
    set(lupa, { x: Math.sin(t * 2) * 40 + 200 * p(t, T.culpa1, 1, E.inOutCubic), y: Math.cos(t * 2) * 20 }); stampA(cul, t, T.siglos1 + 0.5, -8);
  };
});
shakeAt(T.siglos1 + 0.5, 0.3, 12);

/* L2 · los botones eran carísimos: botón de oro girando con brillos → solo los ricos (señor con chaleco de botones de oro) */
headline(L(2) - 0.1, L(3) - 0.1, 'Botón = *lujo*', { size: 104, hlT: T.caros });
plano(L(2) - 0.1, L(3) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  const bot = box(cam, 340, 400, 400, 400, { zIndex: 8 }, `<svg viewBox="0 0 200 200" width="400" height="400"><circle cx="100" cy="100" r="92" fill="${GOLD}" stroke="${INK}" stroke-width="8"/><circle cx="100" cy="100" r="70" fill="none" stroke="#fff3b0" stroke-width="6"/>${[[78, 78], [122, 78], [78, 122], [122, 122]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="11" fill="${INK}"/>`).join('')}</svg>`);
  const pr = PRECIO(cam, 700, 380, '¡CARÍSIMO!');
  const bs = estrellas(cam, 5);
  const rico = PERS(cam, 330, 900, 400, { ropa: '#7a1f3a', gorro: 'tricornio', cuello: true });
  const bOro = [0, 1, 2].map(i => box(rico, 186, 440 + i * 60, 28, 28, { zIndex: 9, background: GOLD, border: `4px solid ${INK}`, borderRadius: '50%' }));
  const din = [0, 1, 2, 3].map(() => texto(cam, 0, '$', { size: 100, color: '#2e7a4a', x: 0, w: 100, z: 14, shadow: `4px 4px 0 ${INK}` }));
  sp(T.caros, 'cash', 0.9); sp(T.caros + 0.2, 'sparkle', 0.6); sp(T.ricos, 'tada', 0.7);
  return t => {
    set(ry, { r: t * 8 }); zoom(cam, t, L(2), 3, 0.06);
    set(bot, { s: pop(t, L(2) - 0.1, 0.4) * (t > T.ricos ? 0.6 : 1), sx: Math.cos(t * 3), y: t > T.ricos ? -160 : 0 }); orb(bs, t, 540, 600, 300, 260);
    set(pr, { o: t > T.caros ? 1 : 0, s: pop(t, T.caros, 0.35), r: 8 + Math.sin(t * 4) * 6 });
    set(rico, { o: t > T.ricos - 0.2 ? 1 : 0, y: (1 - p(t, T.ricos - 0.2, 0.4, E.outBack)) * 600 }); pFace(rico, t, { feliz: 1, closed: true, ceja: 10, look: [0, -6] });
    din.forEach((d, i) => { const k = ((t - T.ricos) * 0.8 + i * 0.25) % 1; set(d, { o: t > T.ricos ? 1 - k : 0, x: 700 + (i % 2) * 180, y: 1100 - k * 300 }); });
  };
});

/* L3a · los señores se vestían solos (espejo, se abrocha él mismo, ✔) */
headline(L(3) - 0.1, T.senoras - 0.1, 'Ellos: *solos*', { size: 104, hlT: T.solos });
plano(L(3) - 0.1, T.senoras - 0.1, SALA, c => {
  const cam = CAM(c);
  const esp = box(cam, 620, 420, 360, 620, { zIndex: 3, background: 'linear-gradient(135deg,#dff1fb,#9cc6dc)', border: `18px solid ${GOLD}`, outline: `6px solid ${INK}`, borderRadius: '180px 180px 20px 20px', overflow: 'hidden' });
  const ref = PERS(esp, 40, 200, 280, { ropa: '#7a1f3a', gorro: 'tricornio', cuello: true }); ref.style.opacity = 0.75;
  const se = PERS(cam, 300, 600, 420, { ropa: '#7a1f3a', gorro: 'tricornio', cuello: true });
  const ma = MANO(cam, 470, 900, 150, -20);
  const ok = box(cam, 760, 1080, 180, 180, { zIndex: 20 }, CHECK);
  sp(T.truco, 'click', 0.7); sp(T.solos, 'pop2', 0.7); sp(T.solos + 0.5, 'ding', 0.7);
  return t => {
    zoom(cam, t, L(3), 3, 0.07);
    pFace(se, t, { feliz: 1, look: [12, 0], ceja: 8 }); pFace(ref, t, { feliz: 1, look: [-12, 0], ceja: 8 });
    set(ma, { y: -Math.abs(Math.sin(t * 6)) * 60, x: Math.sin(t * 3) * 6 }); stampA(ok, t, T.solos + 0.5, -8);
  };
});

/* L3b · las señoras no: las vestía la criada… DE FRENTE (cara a cara, flechas) */
headline(T.senoras - 0.1, L(4) - 0.1, 'Ellas: *la criada*', { size: 100, hlT: T.criada });
plano(T.senoras - 0.1, L(4) - 0.1, SALA, c => {
  const cam = CAM(c);
  const se = PERS(cam, 520, 520, 440, { ropa: '#b02e5a', pelo: 'moño', cuello: true });
  const cr = PERS(cam, 300, 760, 340, { ropa: GRIS, pelo: 'corto', gorro: 'cofia' });
  const ma = MANO(cam, 610, 980, 150, 40);
  const fr = box(cam, 330, 440, 420, 130, { zIndex: 20 }, `<svg viewBox="0 0 420 130" width="420" height="130"><path d="M30,65 H390 M60,25 L20,65 L60,105 M360,25 L400,65 L360,105" stroke="${RED}" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
  const ch = chip(cam, 380, 380, 'DE FRENTE', { size: 60, bg: RED });
  sp(T.senoras, 'boing', 0.6); sp(T.criada, 'pop2', 0.8); sp(T.frente, 'stamp', 0.9);
  return t => {
    zoom(cam, t, T.senoras, 3, 0.08);
    set(se, { r: Math.sin(t * 2) * 2 }); pFace(se, t, { feliz: 0.6, closed: t < T.criada, ceja: 12, look: [-10, 6] });
    set(cr, { o: t > T.criada - 0.2 ? 1 : 0, x: (1 - p(t, T.criada - 0.2, 0.4, E.outBack)) * -500 }); pFace(cr, t, { feliz: 0.2, look: [14, -6], seed: 2 });
    set(ma, { o: t > T.criada + 0.2 ? 1 : 0, x: Math.sin(t * 9) * 8 });
    set(fr, { o: t > T.frente ? 1 : 0, sx: p(t, T.frente, 0.3, E.outBack) }); popA(ch, t, T.frente, { r: -4 });
  };
});
shakeAt(T.frente, 0.3, 12);

/* L4 · primer plano: los botones, puestos para la mano DERECHA de la criada → CÓMODO… PARA LA CRIADA; la señora: «¿y yo qué?» */
headline(L(4) - 0.1, L(5) - 0.1, 'Puestos al *revés*', { size: 100, hlT: T.reves4 });
plano(L(4) - 0.1, L(5) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const cm = CAMISA(cam, 300, 390, 560, 'M', ROSA_C, 6);
  const ma = MANO(cam, 640, 600, 220, 50);
  const et = chip(cam, 640, 860, 'mano derecha<br>de la criada', { size: 46, bg: GRIS });
  const ok = stamp(cam, 330, 1080, 'CÓMODO ✔', { size: 72, col: VERDEI, z: 30, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
  const se = PERS(cam, 760, 1120, 230, { ropa: '#b02e5a', pelo: 'moño', cuello: true });
  const boc = BOCADILLO(cam, 470, 1250, '¿y yo qué?', { size: 50 });
  sp(T.reves4, 'whoosh', 0.7); sp(T.comodo, 'stamp', 0.9); sp(T.senora, 'boing', 0.8);
  return t => {
    zoom(cam, t, L(4), 4, 0.06); set(ry, { r: t * 6 }); latido(cm, t, T.reves4);
    set(cm, { s: pop(t, L(4) - 0.1, 0.4), r: -2 }); set(ma, { y: Math.sin(t * 7) * 30, o: t > T.reves4 ? 1 : 0 }); popA(et, t, T.reves4 + 0.4, { r: 5 });
    stampA(ok, t, T.comodo, -5);
    set(se, { o: t > T.senora - 0.2 ? 1 : 0, s: pop(t, T.senora - 0.2, 0.35) }); pFace(se, t, { feliz: -1, ceja: 16, look: [-12, -6], jaw: 0.5 }); popA(boc, t, T.senora + 0.1, { r: -6 });
  };
});

/* L5 · los hombres: abrochados al otro lado → mano derecha dentro de la chaqueta → ¡ESPADA fuera sin engancharse! */
headline(L(5) - 0.1, L(6) - 0.1, '¡En *guardia*!', Object.assign({ size: 104, hlT: T.espada }, BL));
plano(L(5) - 0.1, L(6) - 0.1, { background: '#7a1f1f', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.16) 0 34px, transparent 34px 68px)' }, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,220,120,.18)', 'rgba(0,0,0,0)', 0);
  const ho = PERS(cam, 330, 540, 460, { ropa: '#2b3550', gorro: 'tricornio', barba: true, cuello: true });
  const cm = CAMISA(cam, 420, 940, 280, 'H', '#2b3550', 10);
  const ma = MANO(cam, 560, 1000, 150, -60);
  const es = ESPADA(cam, 760, 420, 560);
  const ok = stamp(cam, 330, 1170, 'SIN ENGANCHARSE', { size: 66, col: VERDEI, z: 30, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
  const bs = estrellas(cam, 4);
  sp(T.hombres, 'pop', 0.6); sp(T.lado, 'click', 0.6); sp(T.mano, 'scratch', 0.6); sp(T.espada, 'whoosh', 1); sp(T.espada + 0.2, 'sparkle', 0.7); sp(T.engancharse, 'stamp', 0.9);
  return t => {
    zoom(cam, t, L(5), 5, 0.07); set(ry, { r: t * 5 }); latido(cm, t, T.lado);
    pFace(ho, t, { feliz: t > T.espada ? 1 : 0.3, ceja: t > T.espada ? -4 : 8, look: [12, 4], jaw: talkW(t, 'VECINO') * 0.3 });
    const km = p(t, T.mano, 0.35, E.outCubic), ke = p(t, T.espada, 0.45, E.outBack);
    set(ma, { o: t > T.mano - 0.1 ? 1 : 0, x: -120 * km, y: -40 * km });
    set(es, { o: t > T.espada - 0.1 ? 1 : 0, r: lerp(160, 18, ke), y: lerp(300, 0, ke) }); orb(bs, t, 800, 600, 120, 220); bs.forEach(b => b.style.opacity = t > T.espada ? b.style.opacity : 0);
    stampA(ok, t, T.engancharse, -6);
  };
});
shakeAt(T.espada + 0.1, 0.3, 14);

/* L6 · CTA (clip reutilizado) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L7 · pasaron los siglos: contador 1600→2025; la criada se esfuma (¡puf!) y la espada también */
headline(L(7) - 0.1, L(8) - 0.1, 'Pasaron los *siglos*', { size: 96, hlT: T.siglos7 });
plano(L(7) - 0.1, L(8) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.28)', 'rgba(0,0,0,0)', 0);
  const cnt = texto(cam, 380, '1600', { size: 190, z: 10 });
  const rel = box(cam, 420, 620, 240, 240, { zIndex: 8 }, `<svg viewBox="0 0 240 240" width="240" height="240"><circle cx="120" cy="120" r="104" fill="#fff" stroke="${INK}" stroke-width="10"/><path class="ag" d="M120,120 V40" stroke="${RED}" stroke-width="10" stroke-linecap="round"/><path class="ac" d="M120,120 H170" stroke="${INK}" stroke-width="12" stroke-linecap="round"/></svg>`);
  const cr = PERS(cam, 330, 900, 300, { ropa: GRIS, pelo: 'corto', gorro: 'cofia' });
  const es = ESPADA(cam, 780, 860, 420);
  const p1 = puf(cam), p2 = puf(cam);
  const cr1 = chip(cam, 320, 1150, 'adiós, criadas', { size: 44, bg: GRIS }), cr2 = chip(cam, 600, 1250, 'adiós, espadas', { size: 44, bg: '#2b3550' });
  [...Array(10)].forEach((_, i) => sp(T.siglos7 + i * 0.1, 'tick', 0.35)); sp(T.criadas7 + 0.4, 'pop2', 0.9); sp(T.espadas7 + 0.3, 'pop2', 0.9);
  return t => {
    set(ry, { r: t * 8 }); zoom(cam, t, L(7), 4, 0.06);
    cnt.textContent = String(Math.round(lerp(1600, 2025, p(t, T.siglos7 - 0.2, 1.4, E.inOutCubic))));
    const ag = rel.querySelector('.ag'), ac = rel.querySelector('.ac'); ag.setAttribute('transform', `rotate(${f1(t * 900)} 120 120)`); ac.setAttribute('transform', `rotate(${f1(t * 75)} 120 120)`);
    const kc = p(t, T.criadas7 + 0.4, 0.3), ke = p(t, T.espadas7 + 0.3, 0.3);
    set(cr, { o: 1 - kc, s: 1 - kc * 0.6 }); pFace(cr, t, { feliz: 0, look: [0, 4], seed: 3 }); pufA(p1, t, T.criadas7 + 0.4, 480, 1060);
    set(es, { o: 1 - ke, s: 1 - ke * 0.6, r: Math.sin(t * 3) * 6 }); pufA(p2, t, T.espadas7 + 0.3, 820, 1060);
    popA(cr1, t, T.criadas7 + 0.5, { r: -5 }); popA(cr2, t, T.espadas7 + 0.4, { r: 5 });
  };
});

/* L8 · pero los botones siguen exactamente igual: tienda de hoy, perchas H/M alternas → NADIE LO CAMBIÓ */
headline(L(8) - 0.1, L(9) - 0.1, 'Siguen *igual*', { size: 104, hlT: T.igual });
plano(L(8) - 0.1, L(9) - 0.1, { background: '#f2f2ee', backgroundImage: 'linear-gradient(#fff 0 60%, #d8d4cc 60%)' }, c => {
  const cam = CAM(c);
  const rot = box(cam, 300, 440, 480, 110, { zIndex: 4, background: INK, color: '#fff', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '64px', textAlign: 'center', lineHeight: '110px', borderRadius: '14px' }, 'MODA 2025');
  const barra = box(cam, 60, 640, 960, 20, { zIndex: 5, background: '#9aa4ad', border: `5px solid ${INK}`, borderRadius: '10px' });
  const cms = [0, 1, 2, 3].map(i => CAMISA(cam, 70 + i * 240, 650, 220, i % 2 ? 'M' : 'H', [AZUL_C, ROSA_C, '#bfe3c8', '#f6e08a'][i], 6));
  const no = stamp(cam, 310, 1110, 'NADIE LO CAMBIÓ', { size: 60, z: 30 });
  const lupa = box(cam, 400, 760, 220, 220, { zIndex: 20 }, `<svg viewBox="0 0 200 200" width="220" height="220"><circle cx="80" cy="80" r="62" fill="rgba(200,230,255,.35)" stroke="${INK}" stroke-width="14"/><path d="M126,126 L190,190" stroke="${INK}" stroke-width="22" stroke-linecap="round"/></svg>`);
  sp(L(8), 'click', 0.6); sp(T.igual, 'ding', 0.8); sp(T.nadie + 0.4, 'stamp', 1);
  return t => {
    zoom(cam, t, L(8), 4, 0.06); set(rot, { s: pop(t, L(8) - 0.1, 0.35) });
    cms.forEach((m, i) => { set(m, { o: t > L(8) + i * 0.15 ? 1 : 0, r: Math.sin(t * 3 + i) * 4, y: (1 - p(t, L(8) + i * 0.15, 0.3, E.outBack)) * -200 }); latido(m, t, T.igual); });
    set(lupa, { x: lerp(-260, 480, (Math.sin(t * 1.4) + 1) / 2), o: t > T.igual - 0.2 ? 1 : 0 }); stampA(no, t, T.nadie + 0.4, -6);
  };
});
shakeAt(T.nadie + 0.4, 0.3, 12);

/* L9a · [susurro] cada mañana, millones de mujeres se abrochan la camisa (despertador → rejilla de mujeres abrochándose) */
headline(L(9) - 0.1, T.comodidad - 0.1, 'Cada *mañana*', Object.assign({ size: 104, hlT: T.manana }, BL));
plano(L(9) - 0.1, T.comodidad - 0.1, { background: '#2b3550', backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(255,220,150,.35), transparent 60%)' }, c => {
  const cam = CAM(c);
  const desp = box(cam, 400, 420, 280, 280, { zIndex: 8 }, `<svg viewBox="0 0 280 280" width="280" height="280"><circle cx="70" cy="50" r="40" fill="${GOLD}" stroke="${INK}" stroke-width="8"/><circle cx="210" cy="50" r="40" fill="${GOLD}" stroke="${INK}" stroke-width="8"/><circle cx="140" cy="150" r="110" fill="#fff" stroke="${INK}" stroke-width="10"/><text x="140" y="175" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="70" fill="${RED}">7:00</text></svg>`);
  const muj = [...Array(6)].map((_, i) => { const x = 320 + (i % 3) * 230, y = 420 + Math.floor(i / 3) * 380; return [PERS(cam, x, y + 140, 210, { ropa: [ROSA_C, '#bfe3c8', '#f6e08a', AZUL_C, '#e8b4f0', '#f4c79a'][i], pelo: i % 2 ? 'largo' : 'moño', pcol: ['#3a2a1e', '#c87a3a', '#8a5a32', '#1d1a22', '#c8a050', '#5a3a1e'][i] }), MANO(cam, x + 70, y + 330, 90, -20, 12), i]; });
  sp(L(9), 'bell', 0.7); sp(T.millones, 'whoosh', 0.6); muj.forEach(([, , i]) => sp(T.millones + 0.1 + i * 0.12, 'pop', 0.4));
  return t => {
    zoom(cam, t, L(9), 4, 0.05);
    set(desp, { o: t < T.millones ? 1 : 0, r: t < T.manana + 0.8 ? Math.sin(t * 60) * 6 : 0 });
    muj.forEach(([m, h, i]) => { const t0 = T.millones + 0.1 + i * 0.12; set(m, { o: t > t0 ? 1 : 0, s: pop(t, t0, 0.3) }); pFace(m, t, { feliz: 0, closed: true, seed: i }); set(h, { o: t > t0 ? 1 : 0, y: -Math.abs(Math.sin(t * 6 + i)) * 40 }); });
  };
});

/* L9b · …pensando en la comodidad de una criada de hace siglos (detrás de ella, la criada fantasma sonríe) */
headline(T.comodidad - 0.1, L(10) - 0.1, 'La criada *fantasma*', Object.assign({ size: 92, hlT: T.criada9 }, BL));
plano(T.comodidad - 0.1, L(10) - 0.1, { background: '#1f2a44', backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(190,228,255,.25), transparent 55%)' }, c => {
  const cam = CAM(c);
  const gh = fantasma(PERS(cam, 420, 440, 460, { ropa: GRIS, pelo: 'corto', gorro: 'cofia' })); gh.style.zIndex = 4;
  const mu = PERS(cam, 330, 720, 400, { ropa: ROSA_C, pelo: 'largo', pcol: '#3a2a1e' }); mu.style.zIndex = 8;
  const ma = MANO(cam, 470, 1060, 130, -20);
  const bo = BOCADILLO(cam, 600, 600, 'de nada, guapa', { size: 42 });
  const ss = texto(cam, 1250, 'uuuuh…', { size: 70, italic: true, color: '#bfe4ff', x: 380, w: 500, z: 12 });
  sp(T.comodidad, 'swoosh_up', 0.6); sp(T.criada9, 'glitch', 0.7); sp(T.hace9, 'boing', 0.6);
  return t => {
    zoom(cam, t, T.comodidad, 3, 0.08);
    const k = p(t, T.criada9 - 0.2, 0.6); set(gh, { o: 0.55 * k, y: -20 * Math.sin(t * 2) - (1 - k) * 80 }); pFace(gh, t, { feliz: 1, look: [6, 10], ceja: 10, seed: 2 });
    pFace(mu, t, { feliz: -0.4, closed: t < T.criada9, look: [0, 8], ceja: 6 }); set(ma, { y: -Math.abs(Math.sin(t * 6)) * 40 });
    popA(bo, t, T.hace9, { r: 5 }); set(ss, { o: k * (0.6 + 0.4 * Math.sin(t * 5)) });
  };
});

/* L10 · OJO: no está demostrado del todo, hay más teorías (chips alrededor de una interrogación) */
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const q = texto(c, 560, '?', { size: 420, color: RED, z: 6, shadow: `10px 10px 0 ${INK}` });
  const th = [['la criada', GRIS, 330, 620], ['la espada', '#2b3550', 680, 640], ['dar el pecho', '#e8507a', 340, 1000], ['montar a caballo', '#6b4a2a', 600, 1180]].map(([s, col, x, y], i) => [chip(c, x, y, s, { size: 52, bg: col }), i]);
  return t => { set(q, { r: Math.sin(t * 3) * 8, s: 1 + 0.05 * Math.sin(t * 6) }); th.forEach(([e, i]) => popA(e, t, T.teorias - 0.6 + i * 0.25, { r: i % 2 ? 6 : -6 })); };
});
sp(T.teorias - 0.6, 'pop', 0.5); sp(T.teorias - 0.35, 'pop', 0.5); sp(T.teorias - 0.1, 'pop', 0.5); sp(T.teorias + 0.15, 'pop', 0.5);

/* L11 · O sea: la próxima vez que te pelees con su camisa… «¡la culpa es de la criada!» (y la criada fantasma: «¿yo?») */
colorHit(L(11) - 0.1, L(12) - 0.1, YEL, c => {
  const tu = PERS(c, 300, 640, 360, { ropa: '#2b8ad6', pelo: 'corto' });
  const ella = PERS(c, 640, 640, 360, { ropa: ROSA_C, pelo: 'largo', pcol: '#c87a3a' });
  const cm = CAMISA(c, 600, 980, 260, 'M', ROSA_C, 12);
  const s1 = sudor(c, 330, 560);
  const b1 = BOCADILLO(c, 120, 380, '¡la culpa es<br>de la criada!', { size: 54 });
  const gh = fantasma(PERS(c, 760, 300, 220, { ropa: GRIS, pelo: 'corto', gorro: 'cofia' })); gh.style.zIndex = 4;
  const b2 = BOCADILLO(c, 700, 260, '¿yo?', { size: 50 });
  return t => {
    pFace(tu, t, { feliz: t > T.culpa11 ? 1 : -0.6, ceja: 14, look: [12, 4], jaw: t > T.culpa11 ? 0.5 : 0.1 }); pFace(ella, t, { feliz: t > T.criada11 ? 1 : -0.5, ceja: t > T.criada11 ? 6 : -6, look: [-12, 4], seed: 1 });
    set(cm, { r: Math.sin(t * 8) * 6 }); set(s1, { o: t < T.culpa11 ? 1 : 0, y: ((t * 0.9) % 1) * 100 });
    popA(b1, t, T.culpa11, { r: -4 }); set(gh, { o: t > T.criada11 ? 0.6 : 0, y: Math.sin(t * 2) * 14 }); pFace(gh, t, { feliz: 0, ceja: 18, look: [-10, 6], jaw: 0.6, seed: 2 }); popA(b2, t, T.criada11 + 0.3, { r: 6 });
  };
});
sfx('swoosh_up', L(11), 0.6); shakeAt(T.culpa11 + 0.05, 0.3, 12); sp(T.criada11 + 0.3, 'boing', 0.8);

/* L12 · pregunta final (pícara) */
preguntaFinal('¿A quién le has desabrochado', 'tú una camisa?', { size: 72, draw: c => [['a mi pareja', YEL], ['eso no se pregunta', PINK], ['a mí mismo… y fatal', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 320 + i * 30, 660 + i * 160, s, { size: 56, bg: col, color: INK }), L(12) + 0.6 + i * 0.4, { sfx: 'pop' })) });

/* L13 · cierre */
cierre(82, 'Los botones al revés', ['BOTONES', '1600']);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(12) - 0.15]],
  vecino: { risa: [[T.torpeza, T.torpeza + 1.0], [T.senora, T.senora + 1.0], [T.igual, T.igual + 1.0]], sorpresa: [[T.frente, T.frente + 0.8], [T.espada, T.espada + 0.8], [T.criada9, T.criada9 + 0.8]], golpes: [T.torpeza, T.siglos1 + 0.5, T.frente, T.comodo, T.espada, T.nadie + 0.4, T.culpa11] },
});
