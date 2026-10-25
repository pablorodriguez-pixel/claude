/* Ep. 106 · «Te reto: no bosteces hasta el final» — reto + historia (el alma y el demonio por la boca abierta) + ciencia (contagio, perros, cerebro frío)
   + el truco prometido (respirar por la nariz: 0 % en el estudio de Gallup 2007). Cronómetro fijo arriba todo el vídeo (retención).
   Cámara siempre en movimiento lento; cortes solo entre escenas. */
Story.prepara();
const T = {
  reto: Q('te reto'), final0: Q('hasta el final'),
  spoiler: Q('spoiler'), nadie1: Q('casi nadie'), truco1: Q('un truco'), alfinal: Q('pero al final'),
  siglos: Q('hace siglos'), miedo2: Q('miedo bostezar'),
  abierta: Q('la boca abierta'), alma: Q('el alma'), demonio: Q('un demonio'),
  tapamos: Q('nos tapamos'), miedo4: Q('fue miedo'), educacion: Q('educación'),
  raro: Q('lo raro'), contagia: Q('se contagia'), ver5: Q('ver bostezar'), tehace: Q('te hace bostezar'),
  perros: Q('los perros'), veintiuno: Q('veintiuno de veintinueve'), persona: Q('una persona'),
  sirve: Q('para qué sirve'), enfria: Q('enfría el cerebro'), aire: Q('aire fresco'), calor: Q('el calor'),
  fria: Q('bolsa fría'), nueve: Q('nueve por ciento'), caliente: Q('una caliente'), cuarentayuno: Q('cuarenta y uno'),
  truco9: Q('el truco'), nariz: Q('por la nariz'), nadie9: Q('no bostezó nadie'),
  aguantado: Q('has aguantado'), pensandolo: Q('pensándolo'), bostezas: Q('sí bostezas'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const AZUL = '#2b8ad6', VERDE = '#2e6b3a';
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
/* bostezo: abre la boca despacio, ojos cerrados, y cierra (t0 = inicio, d = duración) */
/* boca de bostezo grande encima de una PERS(c, x, y, w) */
const BOCA = (c, x, y, w) => { const b = box(c, x + w * 0.5 - w * 0.13, y + w * 0.77, w * 0.26, w * 0.3, { zIndex: 9, background: '#5a1a14', border: `${Math.max(4, w / 60)}px solid ${INK}`, borderRadius: '50%', transformOrigin: '50% 0' }); return b; };
const abre = (b, a) => set(b, { o: a > 0.05 ? 1 : 0, sy: Math.max(0.05, a), sx: 0.7 + 0.3 * a });
const bosteza = (f, t, t0, d = 1.6, seed = 0, base = {}) => { const k = clamp((t - t0) / d), a = Math.sin(k * Math.PI); pFace(f, t, Object.assign({}, base, k > 0 && k < 1 ? { jaw: a * 1.0, closed: a > 0.35, ceja: 14 * a, feliz: 0 } : {}, { seed })); return a; };

/* cronómetro del reto, fijo arriba a la derecha durante todo el vídeo */
const crono = box(world, 770, 190, 270, 100, { zIndex: 880, background: '#1d1a22', border: `6px solid ${INK}`, borderRadius: '20px', fontFamily: 'SpaceMono', fontWeight: 700, fontSize: '58px', color: '#ff7a3a', textAlign: 'center', lineHeight: '88px' }, '00:00');
FX.fns.push(t => { const vis = t < L(11) - 0.1; crono.style.visibility = vis ? 'visible' : 'hidden'; if (!vis) return; const s = Math.max(0, Math.floor(t)); crono.textContent = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; set(crono, { r: Math.sin(t * 2) * 1.5 }); });

/* PORTADA + L1 (sin cortar): una cara enorme a punto de bostezar; «TE RETO: NO BOSTECES» → «casi nadie lo consigue» · «truco: al final» */
plano(-1, L(2) - 0.1, { background: YEL }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: YEL, backgroundImage: 'repeating-conic-gradient(from 0deg at 50% 55%, rgba(255,255,255,.28) 0 9deg, transparent 9deg 18deg)' });
  const cara = PERS(cam, 190, 560, 700, { ropa: '#e8507a', pelo: 'largo', pcol: '#3a2a1e' }); const bc = BOCA(cam, 190, 560, 700);
  const t1 = texto(c, 300, 'TE RETO:', { size: 96, color: '#fff', z: 40, shadow: OUT });
  const t2 = texto(c, 410, hlSpan('NO BOSTECES', 'phl', RED), { size: 118, color: '#fff', z: 40, shadow: OUT });
  const n = chip(c, 300, 1150, 'casi nadie lo consigue', { size: 58, bg: INK, color: YEL, z: 41 });
  const tr = chip(c, 330, 1260, 'el truco: al final', { size: 54, bg: RED, z: 41 });
  sfx('swoosh_up', 0.05, 0.5); sp(T.reto, 'stamp', 0.8); sp(T.nadie1, 'pop', 0.5); sp(T.truco1, 'ding', 0.6);
  return t => {
    deriva(cam, t, -0.2, L(2), [540, 1060, 1.0], [540, 1000, 1.15]);
    abre(bc, bosteza(cara, t, 0.4, 3.8, 1, { feliz: 0.2, look: [0, -4] }));
    paint(c.querySelector('.phl'), t, 0.25, 0.4); set(t2, { r: -2 + wobble(t, 0.5, 0.8) });
    set(n, { o: t > T.nadie1 - 0.1 ? 1 : 0, s: pop(t, T.nadie1 - 0.1, 0.3), r: -3 }); set(tr, { o: t > T.truco1 ? 1 : 0, s: pop(t, T.truco1, 0.3), r: 3 });
  };
}, { sfx: false });

/* HACE SIGLOS (L2 → L5, corte): un campesino junto a la vela bosteza; se le escapa el alma (un fantasmita) y se acerca un diablillo → se tapa la boca */
plano(L(2) - 0.1, L(5) - 0.1, { background: '#3d3a44' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#5d5a63', backgroundImage: 'linear-gradient(rgba(0,0,0,.25) 4px, transparent 4px), linear-gradient(90deg, rgba(0,0,0,.25) 4px, transparent 4px)', backgroundSize: '180px 90px' });
  const luz = box(cam, 0, 300, 1080, 1300, { zIndex: 1, background: 'radial-gradient(circle at 70% 55%, rgba(255,210,120,.45), transparent 55%)' });
  const vela = box(cam, 800, 1040, 60, 220, { zIndex: 4, background: '#f4efe2', border: `5px solid ${INK}` }); const llama_ = box(cam, 806, 990, 48, 60, { zIndex: 5, background: '#ffd977', border: `4px solid ${INK}`, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', transformOrigin: '50% 100%' });
  const camp = PERS(cam, 160, 640, 500, { ropa: '#8a6a3a', gorro: 'capucha', pelo: 'corto', pcol: '#3a2a1e' }); const bcp = BOCA(cam, 160, 640, 500);
  const mano = box(cam, 0, 0, 200, 150, { zIndex: 12, background: '#f2c9a0', border: `6px solid ${INK}`, borderRadius: '70px 70px 50px 50px' });
  const alma = box(cam, 0, 0, 160, 200, { zIndex: 11, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 160 200" width="160" height="200"><path d="M20,180 C10,90 30,20 80,20 C130,20 150,90 140,180 L120,160 L100,185 L80,160 L60,185 L40,160 Z" fill="rgba(255,255,255,.9)" stroke="${INK}" stroke-width="6"/><circle cx="60" cy="80" r="10" fill="${INK}"/><circle cx="100" cy="80" r="10" fill="${INK}"/><ellipse cx="80" cy="120" rx="12" ry="16" fill="${INK}"/></svg>`);
  const diablo = box(cam, 0, 0, 170, 200, { zIndex: 11 }, `<svg viewBox="0 0 170 200" width="170" height="200"><path d="M40,60 L30,10 L65,45 M130,60 L140,10 L105,45" stroke="${INK}" stroke-width="10" fill="#c8102e"/><circle cx="85" cy="90" r="60" fill="#c8102e" stroke="${INK}" stroke-width="7"/><circle cx="65" cy="80" r="9" fill="#fff6c8"/><circle cx="105" cy="80" r="9" fill="#fff6c8"/><path d="M60,115 Q85,135 110,115" stroke="${INK}" stroke-width="6" fill="none"/><path d="M85,150 V190 M85,190 l-12,-8 M85,190 l12,-8" stroke="${INK}" stroke-width="7"/></svg>`);
  const ed = texto(c, 1150, 'miedo… luego educación', { size: 82, color: '#fff', z: 40, shadow: OUT });
  const ch = chip(c, 380, 420, 'hace siglos', { size: 60, bg: '#6b4a2a', z: 40 });
  sp(T.siglos, 'whoosh', 0.4); sp(T.alma, 'harpa', 0.7); sp(T.demonio, 'boing', 0.7); sp(T.tapamos, 'thud', 0.8); sp(T.educacion, 'ding', 0.6);
  return t => {
    deriva(cam, t, L(2) - 0.1, L(5) - 0.1, [480, 1000, 1.0], [460, 960, 1.15]);
    rotuloA(ch, t, T.siglos, T.abierta);
    set(llama_, { sx: 1 + 0.12 * Math.sin(t * 13), sy: 1 + 0.18 * Math.sin(t * 9) });
    const tap = t > T.tapamos - 0.2;
    abre(bcp, tap ? 0 : bosteza(camp, t, T.abierta - 0.6, T.tapamos - T.abierta + 1.2, 2, { feliz: 0.1, look: [6, 0] }));
    if (tap) pFace(camp, t, { feliz: 0.3, ceja: 12, look: [14, -4], jaw: 0.3, seed: 2 });
    const kt = p(t, T.tapamos - 0.2, 0.3, E.outBack); set(mano, { o: tap ? 1 : 0, x: 300, y: lerp(1300, 1015, kt), r: -6 });
    const ka = p(t, T.alma - 0.2, 1.4, E.outCubic); set(alma, { o: t > T.alma - 0.2 && t < T.tapamos ? 1 - p(t, T.tapamos - 0.4, 0.4) : 0, x: 340 + ka * 260, y: 900 - ka * 420 + Math.sin(t * 4) * 15, s: 0.5 + ka * 0.6 });
    const kd = p(t, T.demonio - 0.3, 1.0, E.inOutCubic), rebota = p(t, T.tapamos, 0.6, E.outCubic);
    set(diablo, { o: t > T.demonio - 0.3 ? 1 : 0, x: lerp(900, 430, kd) + rebota * 500, y: lerp(560, 920, kd) - rebota * 400 + Math.sin(t * 6) * 10, r: rebota * 200 });
    set(ed, { o: t > T.miedo4 - 0.1 ? 1 : 0, s: pop(t, T.miedo4 - 0.1, 0.35), r: -3 });
  };
});

/* SE CONTAGIA (L5 → L7, corte): fila del autobús: uno bosteza y la ola recorre la fila → un perro mira a una persona bostezar… y bosteza */
plano(L(5) - 0.1, L(7) - 0.1, { background: '#9fd3c0' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#9fd3c0' });
  const ventanas = box(cam, -200, 500, 1480, 320, { zIndex: 1, background: '#bfe3f5', border: `10px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 260px, #3d3a44 260px 280px)' });
  box(cam, -200, 1260, 1480, 700, { zIndex: 1, background: '#6b4a2a', borderTop: `10px solid ${INK}` });
  const fila = [0, 1, 2, 3].map(i => PERS(cam, -40 + i * 270, 820, 300, { ropa: ['#e8507a', AZUL, '#7a5aa8', '#f2c230'][i], pelo: i % 2 ? 'corto' : 'largo', pcol: '#3a2a1e', gorro: i === 2 ? 'gorro' : undefined })); const bf = fila.map((_, i) => BOCA(cam, -40 + i * 270, 820, 300));
  const perro = box(cam, 0, 0, 360, 330, { zIndex: 9, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 360 330" width="360" height="330" style="overflow:visible"><path d="M80,90 C40,60 30,180 70,200 Z M280,90 C320,60 330,180 290,200 Z" fill="#6b4a2a" stroke="${INK}" stroke-width="7"/><circle cx="180" cy="150" r="115" fill="#c8a06a" stroke="${INK}" stroke-width="8"/><g class="oj"><circle cx="135" cy="120" r="14" fill="${INK}"/><circle cx="225" cy="120" r="14" fill="${INK}"/></g><path class="oc" d="M120,120 h30 M210,120 h30" stroke="${INK}" stroke-width="8" opacity="0"/><ellipse cx="180" cy="200" rx="60" ry="44" fill="#f4e6c8" stroke="${INK}" stroke-width="6"/><ellipse cx="180" cy="178" rx="20" ry="14" fill="${INK}"/><ellipse class="boca" cx="180" cy="232" rx="34" ry="4" fill="#7a2a20" stroke="${INK}" stroke-width="5"/></svg>`);
  const boca = perro.querySelector('.boca'), oj = perro.querySelector('.oj'), oc = perro.querySelector('.oc');
  const n29 = texto(c, 1150, '21 de 29 perros', { size: 92, color: '#fff', z: 40, shadow: OUT });
  sp(T.contagia, 'pop', 0.5); [0, 1, 2, 3].forEach(i => sp(T.ver5 + i * 0.45, 'pop2', 0.35)); sp(T.perros, 'boing', 0.6); sp(T.persona, 'ding', 0.6);
  return t => {
    const k = clamp((t - L(5) + 0.1) / (L(7) - L(5))); const enPerro = t > T.perros - 0.3;
    deriva(cam, t, L(5) - 0.1, L(7) - 0.1, [540, 1000, 1.0], [560, 1040, 1.12]);
    fila.forEach((f, i) => { f.style.opacity = enPerro ? 0.25 : 1; const a = bosteza(f, t, T.ver5 + i * 0.45, 1.5, i, { feliz: 0.2, look: [10, 0] }); abre(bf[i], enPerro ? 0 : a); });
    const kp = p(t, T.perros - 0.3, 0.5, E.outBack); set(perro, { o: enPerro ? 1 : 0, x: 360, y: 900 + (1 - kp) * 300, s: 1.2 });
    const a = Math.sin(clamp((t - T.persona - 0.2) / 1.6) * Math.PI); boca.setAttribute('ry', f1(4 + a * 50)); oj.setAttribute('opacity', a > 0.3 ? 0 : 1); oc.setAttribute('opacity', a > 0.3 ? 1 : 0);
    set(n29, { o: t > T.veintiuno - 0.1 ? 1 : 0, s: pop(t, T.veintiuno - 0.1, 0.35), r: -3 });
  };
});

/* ¿PARA QUÉ? (L7 → L9, corte): la cabeza de perfil con el cerebro rojo de calor → entra aire fresco (azul) → se enfría. Luego, las barras: bolsa fría 9 % vs caliente 41 % */
plano(L(7) - 0.1, L(9) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#efe1c6' });
  const cab = box(cam, 220, 560, 640, 640, { zIndex: 2 }, `<svg viewBox="0 0 640 640" width="640" height="640"><path d="M180,600 C140,520 80,470 90,330 C100,150 240,60 380,70 C530,80 600,200 580,330 L630,420 L580,430 C590,500 560,540 500,540 L470,600 Z" fill="#f2c9a0" stroke="${INK}" stroke-width="10"/><path class="cer" d="M200,300 C180,200 280,130 360,150 C450,130 520,200 500,280 C520,340 460,380 400,360 C360,400 260,400 240,360 C190,360 170,330 200,300 Z" fill="#e8507a" stroke="${INK}" stroke-width="7"/><path d="M280,200 C300,240 340,240 350,280 M420,200 C410,250 450,270 440,320" stroke="${INK}" stroke-width="6" fill="none"/></svg>`);
  const cer = cab.querySelector('.cer');
  const aire = [0, 1, 2].map(() => box(cam, 0, 0, 120, 30, { zIndex: 4, background: '#9fd3ee', border: `4px solid ${INK}`, borderRadius: '20px' }));
  const term = texto(cam, 520, '', { size: 90, color: RED, x: 640, w: 400, z: 5, shadow: `4px 4px 0 #fff` });
  const barras = box(c, 140, 520, 800, 640, { zIndex: 40, background: '#fbf6ea', border: `8px solid ${INK}`, borderRadius: '30px', boxShadow: '12px 12px 0 rgba(0,0,0,.2)' });
  const bF = box(barras, 140, 0, 180, 0, { background: AZUL, border: `6px solid ${INK}`, borderRadius: '14px 14px 0 0' }), bC = box(barras, 480, 0, 180, 0, { background: RED, border: `6px solid ${INK}`, borderRadius: '14px 14px 0 0' });
  const lF = texto(barras, 520, 'bolsa FRÍA', { size: 44, color: AZUL, x: 80, w: 300 }), lC = texto(barras, 520, 'CALIENTE', { size: 44, color: RED, x: 420, w: 300 });
  const nF = texto(barras, 0, '9%', { size: 80, color: INK, x: 80, w: 300 }), nC = texto(barras, 0, '41%', { size: 80, color: INK, x: 420, w: 300 });
  sp(T.enfria, 'sparkle', 0.6); sp(T.aire, 'swoosh_up', 0.6); sp(T.fria, 'pop', 0.6); sp(T.nueve, 'ding', 0.7); sp(T.cuarentayuno, 'ding', 0.7);
  const H = 360;
  return t => {
    deriva(cam, t, L(7) - 0.1, L(9) - 0.1, [540, 940, 0.95], [500, 860, 1.3]); set(cab, { x: 220, y: 560 + Math.sin(t * 2) * 10, r: Math.sin(t * 1.3) * 2 });
    const kf = p(t, T.aire, 2.0); cer.setAttribute('fill', mixC('#e8507a', '#9fd3ee', kf)); term.textContent = t > T.enfria ? (kf > 0.6 ? '❄' : '🌡') : ''; term.style.opacity = 0;
    aire.forEach((a, i) => { const k = ((t * 0.8 + i / 3) % 1); set(a, { o: t > T.aire - 0.2 && t < T.fria ? 1 - k : 0, x: 860 - k * 300, y: 900 + i * 40 - k * 120, r: -15 }); });
    const vb = t > T.fria - 0.3; set(barras, { o: vb ? 1 : 0, s: pop(t, T.fria - 0.3, 0.4) * (1 + 0.015 * Math.sin(t * 3)), r: Math.sin(t * 1.7) * 1.5 });
    const hF = H * 0.09 / 0.41 * p(t, T.nueve - 0.2, 0.5, E.outCubic), hC = H * p(t, T.cuarentayuno - 0.3, 0.6, E.outCubic);
    set(bF, { y: 490 - hF }); bF.style.height = px(f1(hF)); set(bC, { y: 490 - hC }); bC.style.height = px(f1(hC));
    set(nF, { o: t > T.nueve ? 1 : 0, y: 400 - hF }); set(nC, { o: t > T.cuarentayuno ? 1 : 0, y: 400 - hC });
  };
});

/* EL TRUCO (L9 → L11, corte): boca cerrada, aire entrando por la nariz → «0 %» → remate: la cara del principio… y bosteza otra vez («seguro que ahora sí») */
plano(L(9) - 0.1, L(11) - 0.1, { background: VERDE }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#9fd3c0', backgroundImage: 'repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,.22) 0 9deg, transparent 9deg 18deg)' });
  const cara = PERS(cam, 190, 560, 700, { ropa: '#e8507a', pelo: 'largo', pcol: '#3a2a1e' }); const bc = BOCA(cam, 190, 560, 700);
  const aire = [0, 1, 2].map(() => box(cam, 0, 0, 90, 26, { zIndex: 12, background: '#fff', border: `4px solid ${INK}`, borderRadius: '20px' }));
  const cero = texto(c, 300, '0%', { size: 220, color: '#fff', z: 40, shadow: OUT });
  const nar = chip(c, 300, 1150, 'respira por la NARIZ', { size: 62, bg: INK, color: YEL, z: 41 });
  sp(T.nariz, 'swoosh_up', 0.6); sp(T.nadie9, 'tada', 0.9); sp(T.pensandolo, 'boing', 0.6);
  return t => {
    deriva(cam, t, L(9) - 0.1, L(11) - 0.1, [540, 1060, 1.05], [540, 1000, 1.2]);
    const remate = t > T.pensandolo - 0.3;
    if (remate) abre(bc, bosteza(cara, t, T.pensandolo - 0.3, 2.4, 1, { feliz: 0.2 })); else { abre(bc, 0); pFace(cara, t, { feliz: 0.6, jaw: 0, ceja: -4, look: [0, -4], seed: 1 }); }
    aire.forEach((a, i) => { const k = ((t * 0.9 + i / 3) % 1); set(a, { o: t > T.nariz - 0.2 && !remate ? 1 - k : 0, x: 860 - k * 260, y: 1000 + i * 30 - k * 10, r: -6 }); });
    set(cero, { o: t > T.nadie9 - 0.1 && !remate ? 1 : 0, s: pop(t, T.nadie9 - 0.1, 0.4), r: -4 });
    set(nar, { o: t > T.nariz - 0.1 && !remate ? 1 : 0, s: pop(t, T.nariz - 0.1, 0.3), r: -2 });
  };
});

/* L11 · pregunta final (+ «Os leo») */
preguntaFinal('¿En qué segundo', 'has caído?', { size: 92, draw: c => [['en el 5', YEL], ['en el 30', PINK], ['no he bostezado', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 300 + i * 30, 640 + i * 160, s, { size: 54, bg: col, color: INK }), L(11) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L12 · cierre */
cierre(106, 'El bostezo', ['BOSTEZOS', 'y demonios']);

Story.run({
  textura: true,
  ovalo: [[T.pensandolo, L(11) - 0.15]],
  vecino: { risa: [[T.bostezas, T.bostezas + 1.2]], sorpresa: [], golpes: [] },
});
