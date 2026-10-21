/* Ep. 66 · Los vikingos nunca llevaron cuernos — edición estilo ep07 OK / ep64 kétchup (Vecino fijo, escenarios llenos, caras, cero emojis) */
Story.prepara();
const T = {
  cuernos0: Q('llevaron cuernos'),
  culpable: Q('el culpable'), creas: Q('lo creas'), senor: Q('un señor'), operas: Q('hacía óperas'),
  excav: Q('las excavaciones'), solo: Q('solo ha aparecido'), casco2: Q('un casco completo'), redondo: Q('es redondo'), hierro: Q('de hierro'), sinC: Q('sin cuernos'),
  logico: Q('lógico'), pelea: Q('una pelea'), cuerno3: Q('un cuerno'), asa: Q('un asa'), agarren: Q('te agarren'), cabeza3: Q('la cabeza'),
  donde: Q('de dónde salen'), viaja: Q('viaja'), alemania: Q('alemania'), m1876: Q('mil ochocientos setenta y seis'),
  wagner: Q('wagner'), opera5: Q('su ópera'), dioses: Q('dioses nórdicos'), disen: Q('el diseñador'), pone: Q('le pone cuernos'), todos: Q('a todos'),
  exitazo: Q('un exitazo'), saltan: Q('los cuernos saltan'), cuadros: Q('cuadros'), libros: Q('libros'), comics: Q('cómics'),
  hoy: Q('hasta que hoy'), vikingo8: Q('decir vikingo'), cuernos8: Q('decir cuernos'), equipo: Q('un equipo'), futbol: Q('fútbol americano'), casco8: Q('el casco'),
  gracioso: Q('lo más gracioso'), existian: Q('sí existían'), dosmil: Q('casi dos mil años'), antes9: Q('antes'), ceremonias: Q('ceremonias'),
  ojo: Q('ojo'), ritual: Q('algún ritual'), batalla: Q('en batalla'), broma: Q('ni de broma'),
  vikingo11: Q('el vikingo'), inventa: Q('lo inventó'), sastre: Q('un sastre'),
};
const ROJO = '#c8102e', CREMA = '#FBF6EA', HIERRO = '#8d96a0', BRONCE = '#c08a3e', CUERNO = '#f1e6c8', MAR1 = '#5c87b5', MAR2 = '#3f6d9e';
const CAM = c => box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 960px' });
const zoom = (cam, t, t0, d, a = 0.06) => set(cam, { s: 1.02 + a * p(t, t0, d, E.linear) });

/* ---------- figuras ---------- */
const HORN_L = 'M110,152 C66,140 40,96 50,34 C64,78 88,108 124,128 Z', HORN_R = 'M250,152 C294,140 320,96 310,34 C296,78 272,108 236,128 Z';
const cascoSvg = (o = {}) => `<g class="casco"><path d="M102,178 C94,110 136,84 180,84 C224,84 266,110 258,178 Z" fill="${o.col || HIERRO}" stroke="${INK}" stroke-width="6"/><path d="M102,178 C94,110 136,84 180,84 C224,84 266,110 258,178 Z" fill="url(#hA)" opacity=".45"/>
  <path d="M180,86 V176 M104,132 H256" stroke="${INK}" stroke-width="5" opacity=".7"/>${[118, 150, 210, 242].map(x => `<circle cx="${x}" cy="168" r="5" fill="${INK}"/>`).join('')}
  <rect x="96" y="160" width="168" height="22" rx="6" fill="${o.col || HIERRO}" stroke="${INK}" stroke-width="5"/>
  ${o.gafas ? `<path d="M126,182 C116,204 128,226 150,226 C166,226 174,208 180,194 C186,208 194,226 210,226 C232,226 244,204 234,182" stroke="${INK}" stroke-width="13" fill="none"/><path d="M126,182 C116,204 128,226 150,226 C166,226 174,208 180,194 C186,208 194,226 210,226 C232,226 244,204 234,182" stroke="${o.col || HIERRO}" stroke-width="7" fill="none"/>` : ''}</g>
  <g class="cuernos" style="opacity:${o.cuernos ? 1 : 0}"><path d="${HORN_L}" fill="${CUERNO}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="${HORN_R}" fill="${CUERNO}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M70,90 q14,6 22,16 M290,90 q-14,6 -22,16" stroke="${INK}" stroke-width="4" fill="none" opacity=".5"/></g>`;
/* vikingo = busto con barba + casco (con o sin cuernos) */
const VIK = (c, b, o = {}) => { const v = mkBust(c, b, { beard: true, moustache: o.moustache !== false, uniform: 'farmer', seed: o.seed || 9 }); v.d.insertAdjacentHTML('beforeend', `<svg viewBox="0 0 360 460" style="position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible">${cascoSvg(o)}</svg>`); v.cn = v.d.querySelector('.cuernos'); return v; };
const cascoSolo = (c, x, y, w, o = {}) => figura(c, x, y, w, w * 200 / 240, `<g transform="translate(-60 -40)">${cascoSvg(o)}</g>`, '0 0 240 200', Object.assign({ z: 9, origin: '50% 60%' }, o));
const NOTA = (c, sz, col) => box(c, 0, 0, sz, sz, { zIndex: 14 }, `<svg viewBox="0 0 60 60" width="${sz}" height="${sz}"><path d="M22,48 V8 L50,2 V40" stroke="${INK}" stroke-width="6" fill="none"/><ellipse cx="15" cy="48" rx="11" ry="8" fill="${col}" stroke="${INK}" stroke-width="4"/><ellipse cx="43" cy="42" rx="11" ry="8" fill="${col}" stroke="${INK}" stroke-width="4"/></svg>`);
const notas = (c, n, cx, cy) => [...Array(n)].map((_, i) => ({ e: NOTA(c, 70, [GOLD, PINK, '#fff'][i % 3]), i, cx, cy }));
const vuelaNotas = (ns, t, t0) => ns.forEach(({ e, i, cx, cy }) => { const k = ((t - t0) * 0.7 + i / ns.length) % 1; set(e, { o: t > t0 ? Math.sin(k * Math.PI) : 0, x: cx + Math.sin(k * 6 + i) * 120 + (i % 2 ? 1 : -1) * k * 200, y: cy - k * 420, r: Math.sin(t * 4 + i) * 20 }); });
const DRAKKAR = (c, x, y, w) => figura(c, x, y, w, w * 360 / 700, `<path d="M40,220 Q350,330 660,220 L620,290 Q350,360 80,290 Z" fill="${WOOD}" stroke="${INK}" stroke-width="7"/><path d="M40,220 C10,180 20,120 60,110 C50,150 60,190 80,210" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><circle cx="58" cy="120" r="10" fill="${INK}"/><path d="M660,220 C690,180 680,130 650,120 C660,160 650,190 630,210" fill="${WOOD}" stroke="${INK}" stroke-width="6"/>
  <path d="M350,240 V20" stroke="${INK}" stroke-width="12"/><path d="M230,40 H470 L450,200 H250 Z" fill="${CREMA}" stroke="${INK}" stroke-width="6"/>${[0, 1, 2, 3].map(k => `<path d="M${250 + k * 50},40 L${262 + k * 50},200" stroke="${ROJO}" stroke-width="22"/>`).join('')}${[0, 1, 2, 3, 4, 5].map(k => `<circle cx="${140 + k * 84}" cy="256" r="22" fill="${[ROJO, GOLD, '#2b4a8c'][k % 3]}" stroke="${INK}" stroke-width="5"/>`).join('')}`, '0 0 700 360', { z: 5, origin: '50% 80%' });
const MARCO = (c, x, y, w, h, inner, o = {}) => box(c, x, y, w, h, Object.assign({ zIndex: 9, background: CREMA, border: `14px solid ${GOLD}`, outline: `5px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}` }, o.css || {}), inner);

/* L0 · PORTADA (fotograma 0 completo): el vikingo de siempre, en su drakkar, habla con la voz; sello ¡FALSO! sobre los cuernos */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  texto(c, 250, 'Los vikingos nunca…', { size: 86 });
  const t2 = texto(c, 345, '…llevaron ' + hlSpan('CUERNOS', 'phl'), { size: 112, italic: true });
  const bk = DRAKKAR(c, 60, 1000, 960);
  const o1 = OLAS(c, 1330, MAR1, 6), o2 = OLAS(c, 1420, MAR2, 7); box(c, 0, 1540, 1080, 400, { zIndex: 7, background: MAR2 });
  const v = VIK(c, [270, 520, 540, 690], { cuernos: true, seed: 11 }); v.d.style.zIndex = 4;
  const x = box(c, 300, 470, 480, 300, { zIndex: 25 }, `<svg viewBox="0 0 480 300" width="480" height="300"><path d="M30,30 L130,150 M130,30 L30,150 M350,30 L450,150 M450,30 L350,150" stroke="${ROJO}" stroke-width="30" stroke-linecap="round"/><path d="M30,30 L130,150 M130,30 L30,150 M350,30 L450,150 M450,30 L350,150" stroke="${INK}" stroke-width="5" stroke-linecap="round" fill="none"/></svg>`);
  const fal = stamp(c, 340, 820, '¡FALSO!', { size: 120, z: 30, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  sfx('swoosh_up', 0.05, 0.6); sp(T.cuernos0 + 0.35, 'stamp', 1); sp(T.cuernos0 + 0.2, 'glitch', 0.5);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
    const bob = Math.sin(t * 3) * 14; set(bk, { y: bob, r: Math.sin(t * 2.2) * 2.5 }); set(v.d, { y: bob * 0.6, r: Math.sin(t * 2.2) * 2 });
    face(v, t, { jaw: talkW(t, 'VECINO'), look: [Math.sin(t * 2) * 5, -2], bL: t > T.cuernos0 ? 12 : 0, bR: t > T.cuernos0 ? 12 : 0, seed: 0.4 });
    set(o1, { x: (t * 90) % 80 }); set(o2, { x: -((t * 130) % 80) });
    set(x, { s: 1 + 0.05 * Math.sin(t * 7), r: -4 });
    stampA(fal, t, T.cuernos0 + 0.35, -8);
  };
}, { sfx: false });
shakeAt(T.cuernos0 + 0.35, 0.3, 12);

/* L1 · «el culpable de que lo creas… es un señor que hacía óperas»: cartel de SE BUSCA con silueta → notas musicales */
headline(L(1) - 0.1, L(2) - 0.1, 'El *culpable*', { size: 100, hlT: T.culpable + 0.1 });
plano(L(1) - 0.1, L(2) - 0.1, { background: '#d8c3a0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.12) 0 6px, transparent 6px 110px)' }, c => {
  const cam = CAM(c);
  const cart = box(cam, 230, 420, 620, 820, { zIndex: 6, background: '#efe1c6', border: `8px solid ${INK}`, boxShadow: `14px 14px 0 ${INK}`, transformOrigin: '50% 0%' });
  el('div', cart, { left: '0', top: '30px', width: '604px', textAlign: 'center', fontFamily: 'Rye', fontSize: '96px', color: INK }, 'SE BUSCA');
  const sil = mkBust(cart, [130, 170, 340, 435], { beard: true, hat: 'slouch', seed: 21 }); sil.d.style.filter = 'brightness(0)';
  const q = el('div', cart, { left: '0', top: '300px', width: '604px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '200px', color: '#fff', zIndex: 3 }, '?');
  el('div', cart, { left: '0', top: '640px', width: '604px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '40px', color: INK }, 'por inventar cuernos');
  const chinch = [[250, 430], [830, 430]].map(([x, y]) => box(cam, x - 20, y - 20, 40, 40, { zIndex: 8, background: ROJO, border: `5px solid ${INK}`, borderRadius: '50%' }));
  const ns = notas(cam, 6, 500, 900);
  const op = stamp(cam, 330, 1190 - 40, '¿UN OPERISTA?', { size: 76, z: 30 });
  sp(L(1), 'paper', 0.7); sp(T.senor, 'pop', 0.6); sp(T.operas, 'sparkle', 0.8); sp(T.operas + 0.3, 'stamp', 0.9);
  return t => {
    zoom(cam, t, L(1), 4, 0.08);
    set(cart, { r: Math.sin(t * 2.4) * 2, s: pop(t, L(1), 0.45) });
    set(q, { o: t < T.senor ? 1 : 0, s: 1 + 0.08 * Math.sin(t * 6) });
    sil.d.style.filter = t > T.operas ? 'none' : 'brightness(0)';
    face(sil, t, { look: [0, 0], jaw: t > T.operas ? 0.6 + 0.3 * Math.sin(t * 9) : 0, bL: t > T.operas ? 10 : 0, bR: t > T.operas ? 10 : 0 });
    vuelaNotas(ns, t, T.operas);
    stampA(op, t, T.operas + 0.3, -6);
  };
});

/* L2 · excavación: capas de tierra, la pala, sale UN casco: redondo, de hierro… sin cuernos */
headline(L(2) - 0.1, L(3) - 0.1, 'Solo *un* casco', { size: 100, hlT: T.casco2 });
plano(L(2) - 0.1, L(3) - 0.1, { background: '#bcd3ea' }, c => {
  const cam = CAM(c);
  box(cam, 0, 640, 1080, 1300, { zIndex: 2, background: '#8a5a32', borderTop: `8px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,.14) 0 30px, rgba(255,255,255,.06) 30px 90px)' });
  box(cam, 0, 600, 1080, 60, { zIndex: 3, background: '#6f9a45', borderTop: `8px solid ${INK}` });
  const piedras = [...Array(9)].map((_, i) => box(cam, 40 + (i * 131) % 1000, 760 + (i * 97) % 520, 60 + (i % 3) * 20, 40 + (i % 2) * 14, { zIndex: 3, background: '#b59a78', border: `4px solid ${INK}`, borderRadius: '45%' }));
  const hueso = box(cam, 760, 1150, 200, 60, { zIndex: 4 }, `<svg viewBox="0 0 200 60" width="200" height="60"><path d="M30,30 H170 M20,12 a14,14 0 1 0 0,36 M180,12 a14,14 0 1 1 0,36" stroke="${CREMA}" stroke-width="22" stroke-linecap="round" fill="none"/></svg>`);
  const arq = mkBust(cam, [60, 300, 300, 384], { hat: 'slouch', moustache: true, seed: 33 }); arq.d.style.zIndex = 1;
  const pala = box(cam, 340, 460, 120, 360, { zIndex: 6, transformOrigin: '50% 0%' }, `<svg viewBox="0 0 120 360" width="120" height="360"><path d="M60,0 V250" stroke="${WOOD}" stroke-width="18"/><path d="M60,0 V250" stroke="${INK}" stroke-width="4"/><path d="M20,240 H100 L90,330 Q60,360 30,330 Z" fill="${HIERRO}" stroke="${INK}" stroke-width="6"/></svg>`);
  const cs = cascoSolo(cam, 300, 900, 480, { gafas: true });
  const brillo = [0, 1, 2, 3].map(i => ESTRELLA(cam, 60, GOLD));
  const aro = box(cam, 270, 860, 540, 470, { zIndex: 10, borderRadius: '50%', border: `10px dashed ${PINK}` });
  const fantas = box(cam, 300, 900, 480, 400, { zIndex: 11 }, `<svg viewBox="0 0 240 200" width="480" height="400" style="overflow:visible"><g transform="translate(-60 -40)"><path d="${HORN_L}" fill="none" stroke="${INK}" stroke-width="5" stroke-dasharray="14 10"/><path d="${HORN_R}" fill="none" stroke="${INK}" stroke-width="5" stroke-dasharray="14 10"/></g></svg>`);
  const xx = box(cam, 230, 820, 620, 320, { zIndex: 12 }, `<svg viewBox="0 0 620 320" width="620" height="320"><path d="M40,40 L180,200 M180,40 L40,200 M440,40 L580,200 M580,40 L440,200" stroke="${ROJO}" stroke-width="24" stroke-linecap="round"/></svg>`);
  const lab = chip(cam, 330, 1300 - 70, 'Gjermundbu · Noruega', { size: 46, bg: '#fff', color: INK });
  const ch = [['REDONDO', T.redondo], ['DE HIERRO', T.hierro]].map(([s, t0], i) => [chip(cam, i ? 640 : 330, 690 + i * 0, s, { size: 50, bg: i ? HIERRO : YEL, color: INK }), t0]);
  sp(L(2), 'whoosh', 0.5); [0, 1, 2].forEach(i => sp(T.excav + 0.3 + i * 0.45, 'thud', 0.5)); sp(T.casco2 - 0.1, 'swoosh_up', 0.8); sp(T.casco2 + 0.2, 'sparkle', 0.8);
  sp(T.redondo, 'pop', 0.6); sp(T.hierro, 'ding', 0.7); sp(T.sinC, 'scratch', 0.7); sp(T.sinC + 0.4, 'stamp', 0.9);
  return t => {
    zoom(cam, t, L(2), 8, 0.06);
    const dig = t < T.casco2 ? Math.abs(Math.sin((t - T.excav) * 7)) : 0; set(pala, { r: -20 + dig * 30, y: dig * 60, o: t < T.casco2 + 0.3 ? 1 : 0 });
    face(arq, t, { look: [8, 6], bL: t > T.casco2 ? 14 : 0, bR: t > T.casco2 ? 14 : 0, jaw: t > T.casco2 && t < T.casco2 + 0.8 ? 0.7 : 0 });
    const kup = p(t, T.casco2 - 0.1, 0.6, E.outBack); set(cs, { y: (1 - kup) * 400, o: t > T.casco2 - 0.1 ? 1 : 0, r: Math.sin(t * 2) * 3 });
    brillo.forEach((b, i) => { const a = t * 1.5 + i * 1.57; set(b, { x: 540 + Math.cos(a) * 300 - 30, y: 1080 + Math.sin(a) * 220 - 30, o: t > T.casco2 + 0.2 ? 1 : 0, s: 0.6 + 0.4 * Math.sin(t * 8 + i) }); });
    set(aro, { o: t > T.redondo && t < T.sinC ? 1 : 0, r: t * 40, s: pop(t, T.redondo, 0.35) });
    ch.forEach(([e, t0]) => popA(e, t, t0, { r: -3 }));
    set(fantas, { o: t > T.sinC - 0.1 && t < T.sinC + 0.4 ? 1 : 0, r: Math.sin(t * 3) * 2 });
    set(xx, { o: t > T.sinC + 0.4 ? 1 : 0, s: pop(t, T.sinC + 0.4, 0.3) });
    popA(lab, t, T.hierro + 0.4, { r: 2 });
    piedras.forEach((pq, i) => set(pq, { y: t > T.excav + 0.3 + (i % 3) * 0.45 ? -Math.abs(Math.sin(t * 6 + i)) * 6 : 0 }));
    set(hueso, { r: Math.sin(t * 1.5) * 4 });
  };
});
shakeAt(T.casco2 + 0.2, 0.3, 12); shakeAt(T.sinC + 0.4, 0.25, 10);

/* L3 · «un cuerno es un asa»: pelea; una mano agarra el cuerno y le tuerce la cabeza */
headline(L(3) - 0.1, L(4) - 0.1, 'Un cuerno = *un asa*', { size: 92, hlT: T.asa });
plano(L(3) - 0.1, L(4) - 0.1, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 40px, transparent 40px 80px)' }, c => {
  const cam = CAM(c);
  box(cam, 0, 1300, 1080, 640, { zIndex: 2, background: '#b98c5a', borderTop: `8px solid ${INK}` });
  const a = VIK(cam, [80, 600, 460, 588], { cuernos: true, seed: 12 }), b = VIK(cam, [560, 620, 440, 563], { gafas: true, seed: 14 });
  b.d.style.transform = 'scaleX(-1)';
  const mano = box(cam, 620, 420, 200, 200, { zIndex: 20 }, `<svg viewBox="-60 -70 120 120" width="200" height="200" style="overflow:visible">${gloveHand(0, 0, 200, 1.4)}</svg>`);
  const asa = box(cam, 0, 0, 1080, 1920, { zIndex: 19 }, `<svg width="1080" height="1920" style="overflow:visible"><path class="asaP" d="M380,560 Q560,420 640,520" stroke="${PINK}" stroke-width="12" stroke-dasharray="20 14" fill="none"/></svg>`);
  const ay = BOCADILLO(cam, 120, 470, '¡AY!', { size: 76 });
  const pum = texto(cam, 900, '¡PUM!', { size: 110, italic: true, color: ROJO, x: 380, w: 420, z: 22, shadow: `5px 5px 0 ${INK}` });
  sp(T.pelea, 'whoosh', 0.7); sp(T.pelea + 0.25, 'thud', 0.7); sp(T.asa, 'pop2', 0.7); sp(T.agarren, 'scratch', 0.8); sp(T.cabeza3, 'boing', 1);
  return t => {
    zoom(cam, t, L(3), 4, 0.06);
    const fight = t > T.pelea && t < T.agarren ? Math.sin(t * 16) : 0;
    set(a.d, { x: fight * 20, r: fight * 3 }); set(b.d, { x: -fight * 20, r: 0 });
    set(pum, { o: t > T.pelea + 0.2 && t < T.cuerno3 ? 1 : 0, s: pop(t, T.pelea + 0.2, 0.25), r: -8 });
    set(asa, { o: t > T.asa && t < T.agarren ? 1 : 0 });
    const kg = p(t, T.agarren - 0.15, 0.3, E.outBack), yank = p(t, T.cabeza3, 0.35, E.outCubic);
    set(mano, { o: t > T.agarren - 0.15 ? 1 : 0, x: lerp(300, -350, kg) - yank * 60, y: lerp(-200, 120, kg) + yank * 80 });
    if (t > T.cabeza3) set(a.d, { r: -18 * yank + Math.sin(t * 30) * 2, x: -yank * 50 });
    face(a, t, { look: t > T.agarren ? [-6, -8] : [8, 0], bL: t > T.agarren ? 16 : 0, bR: t > T.agarren ? 16 : 0, jaw: t > T.cabeza3 ? 0.9 : talkW(t, 'VECINO') * 0.4, seed: 0.1 });
    face(b, t, { look: [-8, 0], jaw: t > T.cabeza3 ? 0.5 : 0, bL: 6, bR: 6, seed: 0.7 });
    popA(ay, t, T.cabeza3 + 0.1, { r: -6 });
  };
});
shakeAt(T.cabeza3, 0.35, 16);

/* L4 · «¿de dónde salen?» → viaja a Alemania, 1876: el teatro de Bayreuth en postal */
headline(L(4) - 0.1, L(5) - 0.1, '¿De dónde *salen*?', { size: 96, hlT: T.donde + 0.1 });
plano(L(4) - 0.1, L(5) - 0.1, { background: '#C9D3E6' }, c => {
  const cam = CAM(c);
  const qs = [0, 1, 2, 3].map(i => texto(cam, 0, '?', { size: 150, color: [ROJO, PINK, '#2b4a8c', INK][i], x: 0, w: 160, z: 12 }));
  const post = box(cam, 140, 500, 800, 640, { zIndex: 8, background: CREMA, border: `8px solid ${INK}`, boxShadow: `14px 14px 0 ${INK}`, transformOrigin: '50% 50%' });
  post.innerHTML = `<svg viewBox="0 0 784 624" width="784" height="624"><rect x="30" y="30" width="724" height="470" fill="#e7c98e" stroke="${INK}" stroke-width="5"/><path d="M30,500 H754" stroke="${INK}" stroke-width="5"/><rect x="200" y="230" width="380" height="270" fill="#d77e5a" stroke="${INK}" stroke-width="6"/><path d="M180,240 L390,120 L600,240 Z" fill="#a9573a" stroke="${INK}" stroke-width="6"/><rect x="330" y="150" width="120" height="90" fill="#d77e5a" stroke="${INK}" stroke-width="5"/>${[0, 1, 2, 3, 4].map(k => `<rect x="${230 + k * 70}" y="300" width="36" height="70" rx="16" fill="${CREMA}" stroke="${INK}" stroke-width="4"/>`).join('')}<rect x="360" y="400" width="60" height="100" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><path d="M60,480 q40,-60 80,0 M640,480 q40,-70 90,0" fill="#6f9a45" stroke="${INK}" stroke-width="4"/><text x="392" y="580" text-anchor="middle" font-family="Rye" font-size="54" fill="${INK}">BAYREUTH · ALEMANIA</text></svg>`;
  const s76 = stamp(cam, 640, 1040, '1876', { size: 110, col: INK, z: 20 });
  const avion = box(cam, 0, 0, 160, 90, { zIndex: 14 }, `<svg viewBox="0 0 160 90" width="160" height="90"><path d="M10,50 Q80,20 150,45 L150,55 Q80,70 10,60 Z" fill="${CREMA}" stroke="${INK}" stroke-width="5"/><path d="M70,40 L50,5 L95,40 M70,60 L50,88 L95,60" fill="${ROJO}" stroke="${INK}" stroke-width="4"/></svg>`);
  const traz = box(cam, 0, 0, 1080, 1920, { zIndex: 13 }, `<svg width="1080" height="1920"><path d="M80,1300 Q400,1150 600,520" stroke="${INK}" stroke-width="6" stroke-dasharray="18 14" fill="none"/></svg>`);
  sp(T.donde, 'boing', 0.6); sp(T.viaja, 'whoosh', 0.8); sp(T.alemania, 'paper', 0.7); sp(T.m1876, 'stamp', 1);
  return t => {
    zoom(cam, t, L(4), 5, 0.08);
    qs.forEach((q, i) => { const a = t * 1.8 + i * 1.57; set(q, { x: 460 + Math.cos(a) * 380, y: 760 + Math.sin(a) * 300, o: t < T.alemania ? 1 : 0, r: Math.sin(t * 5 + i) * 15, s: 0.8 + 0.2 * Math.sin(t * 6 + i) }); });
    const kv = p(t, T.viaja, 0.9, E.inOutCubic); set(avion, { o: t > T.viaja && kv < 1 ? 1 : 0, x: lerp(40, 560, kv), y: lerp(1260, 480, kv) - Math.sin(kv * Math.PI) * 120, r: -40 }); set(traz, { o: t > T.viaja ? clamp(kv * 2) : 0 });
    set(post, { o: t > T.alemania - 0.1 ? 1 : 0, s: pop(t, T.alemania - 0.1, 0.45), r: -3 + Math.sin(t * 2) * 1.5 });
    stampA(s76, t, T.m1876, -10);
  };
});
shakeAt(T.m1876, 0.3, 14);

/* L5 · Wagner estrena: se abre el telón, cantantes sin cuernos… el diseñador les pone cuernos a TODOS */
headline(L(5) - 0.1, L(6) - 0.1, '*Wagner*, 1876', { size: 100, hlT: T.wagner });
plano(L(5) - 0.1, L(6) - 0.1, { background: '#3a1f2a' }, c => {
  const cam = CAM(c);
  const foco = rays(cam, -160, 300, 1400, 18, 'rgba(255,240,170,.35)', 'rgba(0,0,0,0)', 1);
  const fondo = box(cam, 60, 420, 960, 820, { zIndex: 2, background: '#e7c98e', border: `8px solid ${INK}` }, `<svg viewBox="0 0 960 820" width="960" height="820"><path d="M0,620 Q240,420 480,560 T960,500 V820 H0 Z" fill="#6f9a45" stroke="${INK}" stroke-width="5"/><circle cx="760" cy="200" r="90" fill="#fff6c8" stroke="${INK}" stroke-width="5"/><path d="M120,620 L240,320 L360,620 Z" fill="#9aa4ad" stroke="${INK}" stroke-width="5"/></svg>`);
  const can = [[110, 13], [420, 15], [730, 17]].map(([x, s]) => VIK(cam, [x, 700, 300, 384], { seed: s, gafas: false }));
  const ns = notas(cam, 7, 520, 760);
  box(cam, 0, 1060, 1080, 300, { zIndex: 9, background: WOOD, borderTop: `10px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.18) 0 5px, transparent 5px 120px)' });
  const telL = box(cam, 0, 360, 560, 1000, { zIndex: 10, background: `repeating-linear-gradient(90deg, #a3122b 0 50px, #7d0d20 50px 100px)`, borderRight: `8px solid ${INK}`, transformOrigin: '0% 50%' });
  const telR = box(cam, 520, 360, 560, 1000, { zIndex: 10, background: `repeating-linear-gradient(90deg, #a3122b 0 50px, #7d0d20 50px 100px)`, borderLeft: `8px solid ${INK}`, transformOrigin: '100% 50%' });
  box(cam, 0, 330, 1080, 110, { zIndex: 11, background: '#7d0d20', borderBottom: `8px solid ${INK}`, backgroundImage: `repeating-linear-gradient(90deg, ${GOLD} 0 8px, transparent 8px 60px)` });
  const dis = mkBust(cam, [620, 760, 420, 537], { moustache: true, hat: 'slouch', seed: 51 }); dis.d.style.zIndex = 12;
  const tij = box(cam, 560, 980, 160, 160, { zIndex: 13 }, `<svg viewBox="0 0 160 160" width="160" height="160"><circle cx="40" cy="120" r="24" fill="none" stroke="${INK}" stroke-width="10"/><circle cx="100" cy="130" r="24" fill="none" stroke="${INK}" stroke-width="10"/><path d="M52,100 L140,10 M88,108 L120,20" stroke="${HIERRO}" stroke-width="14" stroke-linecap="round"/></svg>`);
  const plaf = can.map((_, i) => texto(cam, 600, '¡plaf!', { size: 60, italic: true, color: GOLD, x: 110 + i * 310, w: 300, z: 15, shadow: `3px 3px 0 ${INK}` }));
  const todos = stamp(cam, 300, 1180, '¡A TODOS!', { size: 96, z: 30 });
  sp(T.wagner, 'whoosh', 0.8); sp(T.opera5, 'sparkle', 0.7); sp(T.dioses, 'bell', 0.6); sp(T.disen, 'pop', 0.7); can.forEach((_, i) => sp(T.pone + 0.15 + i * 0.25, 'pop2', 0.7)); sp(T.todos, 'stamp', 1);
  return t => {
    zoom(cam, t, L(5), 6, 0.06); set(foco, { r: t * 6 });
    const ko = p(t, T.wagner + 0.1, 0.8, E.inOutCubic); set(telL, { sx: 1 - 0.85 * ko }); set(telR, { sx: 1 - 0.85 * ko });
    can.forEach((v, i) => { const tc = T.pone + 0.15 + i * 0.25; v.cn.style.opacity = t > tc ? 1 : 0; v.cn.setAttribute('transform', t > tc ? `translate(180 120) scale(${f1(pop(t, tc, 0.3))}) translate(-180 -120)` : ''); set(v.d, { y: -Math.abs(Math.sin(t * 4 + i)) * 16 }); face(v, t, { jaw: t > T.opera5 ? 0.5 + 0.4 * Math.sin(t * 7 + i) : 0, look: t > tc ? [0, -8] : [0, 0], bL: t > tc ? 14 : 0, bR: t > tc ? 14 : 0, closed: t < tc && t > T.opera5, seed: i }); set(plaf[i], { o: t > tc && t < tc + 0.5 ? 1 : 0, y: -40 * p(t, tc, 0.5) }); });
    vuelaNotas(ns, t, T.opera5);
    const kd = p(t, T.disen - 0.2, 0.4, E.outBack); set(dis.d, { y: (1 - kd) * 700 }); face(dis, t, { look: [-10, -4], jaw: t > T.pone && t < T.todos ? 0.4 : 0, bL: 8, bR: 4, seed: 0.5 });
    set(tij, { o: t > T.disen ? 1 : 0, y: (1 - kd) * 700, r: Math.sin(t * 14) * 12 });
    stampA(todos, t, T.todos, -6);
  };
});
shakeAt(T.todos, 0.35, 14);

/* L6 · CTA (clip reutilizado del ep55) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L7 · exitazo: el público aplaude «¡BRAVO!» → los cuernos saltan a cuadros, libros y cómics */
headline(L(7) - 0.1, L(8) - 0.1, 'Un *exitazo*', { size: 100, hlT: T.exitazo });
plano(L(7) - 0.1, T.saltan - 0.1, { background: '#3a1f2a' }, c => {
  const cam = CAM(c);
  const foco = rays(cam, -160, 300, 1400, 18, 'rgba(255,240,170,.35)', 'rgba(0,0,0,0)', 1);
  const pub = [...Array(8)].map((_, i) => { const b = mkBust(cam, [-40 + (i % 4) * 290, 820 + Math.floor(i / 4) * 260, 300, 384], { hat: ['slouch', 'cap', 'brodie'][i % 3], moustache: i % 2 === 0, beard: i % 3 === 1, seed: 60 + i }); b.d.style.zIndex = 4 + Math.floor(i / 4); return b; });
  const bra = [BOCADILLO(cam, 160, 560, '¡BRAVO!', { size: 70 }), BOCADILLO(cam, 620, 650, '¡OTRA!', { size: 60 })];
  const flores = [0, 1, 2, 3, 4].map(i => ESTRELLA(cam, 70, [PINK, YEL, '#fff'][i % 3]));
  sp(T.exitazo, 'tada', 0.8); sp(T.exitazo + 0.3, 'pop', 0.6); sp(T.exitazo + 0.6, 'pop', 0.6);
  return t => {
    zoom(cam, t, L(7), 2, 0.08); set(foco, { r: t * 8 });
    pub.forEach((b, i) => { set(b.d, { y: -Math.abs(Math.sin(t * 9 + i)) * 24 }); face(b, t, { jaw: 0.4 + 0.4 * Math.abs(Math.sin(t * 8 + i)), look: [0, -6], bL: 10, bR: 10, seed: i }); });
    bra.forEach((e, i) => popA(e, t, T.exitazo + 0.3 * i, { r: i ? 5 : -5 }));
    flores.forEach((f, i) => { const k = ((t - L(7)) * 0.9 + i * 0.2) % 1; set(f, { x: 100 + i * 200, y: 300 + k * 600, r: k * 360, o: 1 - k }); });
  };
});
plano(T.saltan - 0.1, L(8) - 0.1, { background: '#efe1c6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.08) 0 3px, transparent 3px 60px)' }, c => {
  const cam = CAM(c);
  const cuadro = MARCO(cam, 90, 450, 470, 560, '', {}); const vc = VIK(cuadro, [40, 70, 360, 460], { cuernos: true, seed: 18 });
  const libro = figura(cam, 600, 470, 400, 520, `${FIGP('M20,20 L380,20 L380,500 L20,500 Z', '#2b4a8c', 7, .2)}<rect x="20" y="20" width="40" height="480" fill="#1f3766" stroke="${INK}" stroke-width="5"/><text x="220" y="120" text-anchor="middle" font-family="Rye" font-size="44" fill="${GOLD}">SAGAS</text><text x="220" y="170" text-anchor="middle" font-family="Rye" font-size="30" fill="${GOLD}">NÓRDICAS</text><g transform="translate(100 200) scale(.65)">${cascoSvg({ cuernos: true, col: GOLD })}</g>`, '0 0 400 520', { z: 9, origin: '50% 100%' });
  const comic = box(cam, 300, 960, 560, 360, { zIndex: 11, background: '#fff', border: `8px solid ${INK}`, boxShadow: `12px 12px 0 ${INK}`, backgroundImage: 'radial-gradient(rgba(255,62,165,.35) 3px, transparent 3px)', backgroundSize: '18px 18px' });
  const vk = VIK(comic, [20, 30, 260, 333], { cuernos: true, seed: 19 });
  el('div', comic, { left: '280px', top: '60px', fontFamily: 'Rye', fontSize: '96px', color: ROJO, transform: 'rotate(-10deg)', textShadow: `4px 4px 0 ${INK}` }, '¡POW!');
  sp(T.cuadros, 'pop2', 0.7); sp(T.libros, 'paper', 0.7); sp(T.comics, 'burst', 0.8);
  return t => {
    zoom(cam, t, T.saltan, 4, 0.05);
    set(cuadro, { s: pop(t, T.cuadros - 0.1, 0.35), o: t > T.cuadros - 0.1 ? 1 : 0, r: -3 + Math.sin(t * 2) });
    set(libro, { s: pop(t, T.libros - 0.1, 0.35), o: t > T.libros - 0.1 ? 1 : 0, r: 4 + Math.sin(t * 2.4) });
    set(comic, { s: pop(t, T.comics - 0.1, 0.35), o: t > T.comics - 0.1 ? 1 : 0, r: -2 });
    face(vc, t, { jaw: 0.3, look: [4, 0], seed: 0.2 }); face(vk, t, { jaw: Math.abs(Math.sin(t * 10)) * 0.8, bL: 14, bR: 14, seed: 0.5 });
  };
});
shakeAt(T.comics, 0.25, 10);

/* L8 · hoy: VIKINGO = CUERNOS → y un equipo de fútbol americano los lleva en el casco */
headline(L(8) - 0.1, L(9) - 0.1, 'Vikingo = *cuernos*', { size: 96, hlT: T.cuernos8 });
plano(L(8) - 0.1, T.equipo - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  const v = VIK(cam, [80, 560, 420, 537], { cuernos: true, seed: 20 });
  const ig = texto(cam, 760, '=', { size: 260, x: 440, w: 200, color: INK });
  const cu = figura(cam, 640, 600, 360, 420, `<path d="${HORN_L}" transform="translate(-40 0) scale(2.2)" fill="${CUERNO}" stroke="${INK}" stroke-width="3"/>`, '0 0 360 420', { z: 9, origin: '50% 50%' });
  sp(T.vikingo8, 'pop', 0.6); sp(T.cuernos8, 'ding', 0.8);
  return t => { set(ry, { r: t * 6 }); zoom(cam, t, L(8), 3, 0.06); set(ig, { o: t > T.vikingo8 + 0.3 ? 1 : 0, s: pop(t, T.vikingo8 + 0.3, 0.3) }); set(cu, { o: t > T.cuernos8 ? 1 : 0, s: pop(t, T.cuernos8, 0.4), r: Math.sin(t * 4) * 6 }); face(v, t, { jaw: talkW(t, 'VECINO') * 0.6, look: [8, 0], bL: 6, bR: 6 }); set(v.d, { y: -Math.abs(Math.sin(t * 4)) * 14 }); };
});
plano(T.equipo - 0.1, L(9) - 0.1, { background: '#4f2683', backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,.06) 0 80px, transparent 80px 160px)' }, c => {
  const cam = CAM(c);
  box(cam, 0, 1180, 1080, 760, { zIndex: 2, background: '#4c8a3a', borderTop: `8px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, #fff 0 8px, transparent 8px 180px)' });
  const fb = figura(cam, 220, 420, 640, 560, `<path d="M90,380 C40,200 160,60 330,60 C500,60 600,180 580,330 L560,420 L330,440 L140,460 Z" fill="#4f2683" stroke="${INK}" stroke-width="10"/><path d="M90,380 C40,200 160,60 330,60 C500,60 600,180 580,330" fill="url(#hA)" opacity=".4"/>
    <path d="M140,260 C120,200 150,150 210,140 C180,190 200,230 250,240 C210,250 170,258 140,260 Z" fill="#fff" stroke="${INK}" stroke-width="7"/><path d="M140,260 C110,230 90,180 100,130 C130,170 160,200 200,214" fill="${GOLD}" stroke="${INK}" stroke-width="6"/>
    <path d="M480,330 H640 M500,390 H630 M560,320 V450" stroke="#9aa4ad" stroke-width="22" stroke-linecap="round"/><path d="M480,330 H640 M500,390 H630 M560,320 V450" stroke="${INK}" stroke-width="5" fill="none"/>`, '0 0 660 480', { z: 8, origin: '50% 80%' });
  const lb = chip(cam, 270, 1060, 'fútbol americano', { size: 56, bg: GOLD, color: INK });
  const ff = [0, 1, 2, 3, 4, 5].map(i => ESTRELLA(cam, 50, i % 2 ? GOLD : '#fff'));
  sp(T.equipo, 'whoosh', 0.7); sp(T.futbol, 'burst', 0.8); sp(T.casco8, 'stamp', 0.8);
  return t => { zoom(cam, t, T.equipo, 3, 0.06); set(fb, { s: pop(t, T.equipo, 0.45), r: Math.sin(t * 3) * 4, y: -Math.abs(Math.sin(t * 5)) * 20 }); popA(lb, t, T.futbol, { r: -3 }); ff.forEach((f, i) => { const a = t * 2 + i * 1.05; set(f, { x: 540 + Math.cos(a) * 420 - 25, y: 700 + Math.sin(a) * 320 - 25, o: 1, s: 0.6 + 0.4 * Math.sin(t * 7 + i) }); }); };
});
shakeAt(T.futbol, 0.3, 12);

/* L9 · lo más gracioso: sí existían… casi 2.000 años antes (Veksø, Edad del Bronce), y eran para ceremonias */
headline(L(9) - 0.1, L(10) - 0.1, 'Sí *existían*…', { size: 100, hlT: T.existian });
plano(L(9) - 0.1, T.dosmil - 0.1, { background: '#efe1c6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 6px, transparent 6px 140px)' }, c => {
  const cam = CAM(c);
  box(cam, 0, 1240, 1080, 700, { zIndex: 2, background: '#b98c5a', borderTop: `8px solid ${INK}` });
  const ped = box(cam, 330, 1020, 420, 240, { zIndex: 4, background: '#f4efe2', border: `7px solid ${INK}` });
  const vit = box(cam, 260, 420, 560, 620, { zIndex: 7, background: 'rgba(200,235,250,.35)', border: `8px solid ${INK}`, boxShadow: `inset 0 0 0 8px rgba(255,255,255,.4)` });
  const vx = figura(cam, 300, 560, 480, 400, `<path d="M120,330 C60,320 10,250 40,170 C60,230 100,260 150,270 Z M360,330 C420,320 470,250 440,170 C420,230 380,260 330,270 Z" fill="${BRONCE}" stroke="${INK}" stroke-width="7"/><path d="M40,170 C30,100 60,40 110,30 C90,80 90,130 110,170 M440,170 C450,100 420,40 370,30 C390,80 390,130 370,170" fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round"/><path d="M40,170 C30,100 60,40 110,30 C90,80 90,130 110,170 M440,170 C450,100 420,40 370,30 C390,80 390,130 370,170" fill="none" stroke="${BRONCE}" stroke-width="9" stroke-linecap="round"/>
    <path d="M110,360 C100,240 170,190 240,190 C310,190 380,240 370,360 Z" fill="${BRONCE}" stroke="${INK}" stroke-width="8"/><path d="M110,360 C100,240 170,190 240,190 C310,190 380,240 370,360 Z" fill="url(#hA)" opacity=".5"/><circle cx="190" cy="270" r="18" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="290" cy="270" r="18" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M240,200 C230,180 250,160 240,140" stroke="${INK}" stroke-width="6" fill="none"/>`, '0 0 480 400', { z: 6, origin: '50% 100%' });
  const et = chip(cam, 360, 1080, 'Veksø · Dinamarca', { size: 48, bg: '#fff', color: INK });
  const br = [0, 1, 2, 3].map(i => ESTRELLA(cam, 56, GOLD));
  sp(T.gracioso, 'pop', 0.5); sp(T.existian, 'sparkle', 0.9); sp(T.existian + 0.2, 'ding', 0.7);
  return t => { zoom(cam, t, L(9), 4, 0.07); set(vx, { s: pop(t, T.existian - 0.1, 0.5), o: t > T.existian - 0.1 ? 1 : 0, y: -Math.abs(Math.sin(t * 2)) * 10 }); popA(et, t, T.existian + 0.4, { r: -2 }); br.forEach((b, i) => { const a = t * 1.4 + i * 1.57; set(b, { x: 540 + Math.cos(a) * 280 - 28, y: 760 + Math.sin(a) * 230 - 28, o: t > T.existian ? 1 : 0, s: 0.6 + 0.4 * Math.sin(t * 9 + i) }); }); set(vit, { o: 1 }); set(ped, {}); };
});
plano(T.dosmil - 0.1, L(10) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const linea = box(cam, 80, 800, 920, 14, { zIndex: 5, background: INK, borderRadius: '8px' });
  const m1 = [['900 a. C.', 120, BRONCE], ['800 d. C.', 780, '#2b4a8c']].map(([s, x, col]) => { const d = box(cam, x - 20, 760, 40, 90, { zIndex: 6, background: col, border: `5px solid ${INK}`, borderRadius: '10px' }); const lb = chip(cam, x - 80, 870, s, { size: 46, bg: '#fff', color: INK }); return [d, lb]; });
  const cnt = texto(cam, 560, '0 años', { size: 120, color: ROJO, z: 20 });
  const vx = figura(cam, 40, 500, 260, 220, `<path d="M60,180 C40,120 60,70 120,60 C180,70 200,120 180,180 Z" fill="${BRONCE}" stroke="${INK}" stroke-width="7"/><path d="M60,120 C20,80 30,30 60,10 M180,120 C220,80 210,30 180,10" stroke="${BRONCE}" stroke-width="16" fill="none" stroke-linecap="round"/>`, '0 0 240 200', { z: 8, origin: '50% 100%' });
  const vk = VIK(cam, [660, 380, 300, 384], { gafas: true, seed: 22 });
  const cer = box(cam, 0, 0, 1080, 1920, { zIndex: 4 });
  const vela = [200, 880].map(x => box(cam, x, 1000, 60, 200, { zIndex: 9 }, `<svg viewBox="0 0 60 200" width="60" height="200" style="overflow:visible"><rect x="12" y="50" width="36" height="150" fill="${CREMA}" stroke="${INK}" stroke-width="5"/><path class="ll" d="M30,48 C14,30 24,10 30,0 C36,10 46,30 30,48 Z" fill="${GOLD}" stroke="${INK}" stroke-width="4"/></svg>`));
  const cerSt = stamp(cam, 280, 1080, 'CEREMONIAS', { size: 86, col: '#2b4a8c', z: 30 });
  sp(T.dosmil, 'whoosh', 0.7); [0, 1, 2, 3, 4, 5].forEach(i => sp(T.dosmil + 0.1 + i * 0.18, 'tick', 0.4)); sp(T.ceremonias, 'bell', 0.8); sp(T.ceremonias + 0.2, 'stamp', 0.9);
  return t => {
    zoom(cam, t, T.dosmil, 3, 0.05);
    const k = p(t, T.dosmil, 1.2, E.outCubic); cnt.textContent = `${Math.round(k * 1700)} años`; set(cnt, { s: 1 + 0.1 * (k < 1 ? Math.sin(t * 20) : 0) });
    m1.forEach(([d, lb], i) => { set(d, { s: pop(t, T.dosmil + i * 0.4, 0.3) }); popA(lb, t, T.dosmil + i * 0.4, { r: i ? 3 : -3 }); });
    set(vx, { y: -Math.abs(Math.sin(t * 3)) * 12 }); face(vk, t, { look: [-10, 0], bL: t > T.dosmil + 1 ? 14 : 0, bR: 14, jaw: t > T.dosmil + 1 ? 0.6 : 0, seed: 0.3 });
    vela.forEach((v, i) => { set(v, { o: t > T.ceremonias ? 1 : 0, s: pop(t, T.ceremonias + i * 0.1, 0.35) }); v.querySelector('.ll').setAttribute('transform', `translate(30 48) scale(${f1(1 + 0.15 * Math.sin(t * 14 + i))}) translate(-30 -48)`); });
    stampA(cerSt, t, T.ceremonias + 0.2, -6);
  };
});
shakeAt(T.ceremonias + 0.2, 0.25, 10);

/* L10 · OJO: en algún ritual, quizá (vela + casco) · en batalla, ni de broma (espadas + X) */
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const izq = box(c, 340, 520, 330, 440, { zIndex: 6, background: CREMA, border: `7px solid ${INK}`, borderRadius: '24px', boxShadow: `10px 10px 0 ${INK}` });
  el('div', izq, { left: 0, top: '20px', width: '316px', textAlign: 'center', fontFamily: 'Rye', fontSize: '44px', color: INK }, 'RITUAL');
  const ci = cascoSolo(izq, 30, 110, 260, { cuernos: true });
  el('div', izq, { left: 0, top: '340px', width: '316px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '56px', color: '#2b4a8c' }, 'quizá');
  const der = box(c, 700, 520, 330, 440, { zIndex: 6, background: CREMA, border: `7px solid ${INK}`, borderRadius: '24px', boxShadow: `10px 10px 0 ${INK}` });
  el('div', der, { left: 0, top: '20px', width: '316px', textAlign: 'center', fontFamily: 'Rye', fontSize: '44px', color: INK }, 'BATALLA');
  der.insertAdjacentHTML('beforeend', `<svg viewBox="0 0 260 220" width="260" height="220" style="position:absolute;left:30px;top:100px"><path d="M30,200 L220,20 M230,200 L40,20" stroke="${HIERRO}" stroke-width="18" stroke-linecap="round"/><path d="M30,200 L220,20 M230,200 L40,20" stroke="${INK}" stroke-width="4" fill="none"/><path d="M60,140 L110,190 M200,140 L150,190" stroke="${WOOD}" stroke-width="20" stroke-linecap="round"/></svg>`);
  const xd = box(c, 720, 560, 290, 290, { zIndex: 9 }, XSVG);
  el('div', der, { left: 0, top: '340px', width: '316px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '48px', color: ROJO }, 'ni de broma');
  sp(T.ritual, 'pop', 0.6); sp(T.batalla, 'pop', 0.6); sp(T.broma, 'stamp', 0.9);
  return t => { set(izq, { s: pop(t, T.ritual - 0.1, 0.35), r: -3 }); set(der, { s: pop(t, T.batalla - 0.1, 0.35), r: 3 }); set(ci, { r: Math.sin(t * 3) * 5 }); set(xd, { o: t > T.broma ? 1 : 0, s: pop(t, T.broma, 0.3) }); };
});

/* L11 · O sea: el vikingo de tu cabeza… lo inventó un sastre de ópera (cinta métrica + tijeras) */
colorHit(L(11) - 0.1, L(12) - 0.1, YEL, c => {
  const a = texto(c, 280, 'El vikingo de tu cabeza…', { size: 92 });
  const b = texto(c, 400, '…lo inventó un sastre', { size: 96, italic: true, color: ROJO });
  const v = VIK(c, [300, 560, 480, 614], { cuernos: true, seed: 11 });
  const cinta = box(c, 230, 1000, 640, 60, { zIndex: 12, background: `repeating-linear-gradient(90deg, ${GOLD} 0 30px, #f3d27a 30px 60px)`, border: `5px solid ${INK}`, borderRadius: '10px', transform: 'rotate(-12deg)' });
  const tij = box(c, 760, 560, 200, 200, { zIndex: 13 }, `<svg viewBox="0 0 160 160" width="200" height="200"><circle cx="40" cy="120" r="24" fill="none" stroke="${INK}" stroke-width="10"/><circle cx="100" cy="130" r="24" fill="none" stroke="${INK}" stroke-width="10"/><path d="M52,100 L140,10 M88,108 L120,20" stroke="${HIERRO}" stroke-width="14" stroke-linecap="round"/></svg>`);
  return t => { set(a, { s: pop(t, L(11), 0.35) }); set(b, { o: t > T.inventa - 0.2 ? 1 : 0, s: pop(t, T.inventa - 0.2, 0.35) }); face(v, t, { jaw: 0.2, look: [6, -6], bL: 10, bR: 10 }); set(v.d, { r: Math.sin(t * 3) * 3 }); set(cinta, { o: t > T.sastre ? 1 : 0, s: pop(t, T.sastre, 0.35) }); set(tij, { o: t > T.sastre ? 1 : 0, r: Math.sin(t * 16) * 14 }); };
});
sfx('swoosh_up', L(11), 0.6); shakeAt(L(11) + 0.05, 0.3, 14); sp(T.sastre, 'stamp', 0.8);

/* L12 · pregunta final */
preguntaFinal('¿Qué otro disfraz', 'de la historia es mentira?', { size: 86, draw: c => [['piratas con parche', YEL], ['romanos con toga', PINK], ['¿y tú?', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 340 + i * 40, 620 + i * 160, s, { size: 60, bg: col, color: INK }), L(12) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L13 · cierre (clip reutilizado del ep55) */
cierre(66, 'Vikingos sin cuernos', ['VIKINGOS', 'sin cuernos']);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(12) - 0.15]],
  vecino: { risa: [[T.cabeza3, T.cabeza3 + 1.0], [T.gracioso, T.gracioso + 0.9], [T.broma, T.broma + 0.8]], sorpresa: [[T.sinC, T.sinC + 0.8], [T.pone, T.pone + 0.9], [T.futbol, T.futbol + 0.8]], golpes: [T.operas + 0.3, T.casco2 + 0.2, T.cabeza3, T.m1876, T.todos, T.comics, T.ceremonias + 0.2] },
});
