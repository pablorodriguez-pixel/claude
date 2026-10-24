/* Ep. 92 · «Estar como una cabra» — FORMATO NUEVO (cuento continuo): un solo mundo (presa del Cingino + valle de los pastores) que la cámara recorre sin cortar;
   cortes secos solo en el giro y al saltar al presente; poco texto; el Vecino solo en el remate. */
Story.prepara();
const T = {
  piropo0: Q('piropo'), trepan: Q('trepan por una pared'), cincuenta: Q('cincuenta metros'),
  alpes: Q('alpes italianos'), presa: Q('una presa de piedra'), edificio: Q('quince pisos'),
  excursionista: Q('un excursionista'), arriba: Q('mira hacia arriba'), camara3: Q('se le cae la cámara'),
  hay: Q('hay cabras'), colgadas: Q('colgadas'), vacio: Q('sobre el vacío'), cuerda: Q('sin cuerda'),
  foto: Q('la foto'), montaje: Q('eso es un montaje'), no5: Q('pero no'),
  buscan: Q('qué buscan'), cuello: Q('jugándose el cuello'), sal: Q('sal'), lamen: Q('lamen la sal'),
  pastores: Q('los pastores'), crias: Q('las crías'), saltan: Q('saltan por donde'),
  escrito: Q('por escrito'), locuras: Q('hacía locuras'), cabra8: Q('como una cabra'),
  ati: Q('te lo dicen a ti'), piropo9: Q('como un piropo'),
};
const SUELO = 2000, MX0 = 1500, MX1 = 2500, MTOP = 520;
/* cabra de perfil (vb 0 0 300 260) con patas y ojo animables */
const CABRA = (c, w = 200, col = '#d9c9a8', z = 8) => { const d = box(c, 0, 0, w, w * 260 / 300, { zIndex: z, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 300 260" width="${w}" height="${w * 260 / 300}" style="overflow:visible">
  ${[[80, 0], [110, 1], [190, 2], [220, 3]].map(([x]) => `<g class="pa" data-x="${x}"><path d="M${x},150 V240" stroke="${INK}" stroke-width="20" stroke-linecap="round"/><path d="M${x},150 V236" stroke="${col}" stroke-width="10" stroke-linecap="round"/></g>`).join('')}
  <ellipse cx="150" cy="130" rx="110" ry="50" fill="${col}" stroke="${INK}" stroke-width="7"/>
  <path d="M230,110 C240,70 250,50 270,40 L296,74 C290,90 274,96 262,100 C256,112 250,124 246,134 Z" fill="${col}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
  <path d="M262,44 C240,0 200,-10 176,10 M272,40 C262,0 236,-14 212,-6" stroke="#8a7a5a" stroke-width="10" fill="none" stroke-linecap="round"/>
  <path d="M286,82 C290,100 284,116 276,124" stroke="${INK}" stroke-width="7" fill="none"/><path class="le" d="M290,84 q14,6 8,18" stroke="#e8507a" stroke-width="9" fill="none" stroke-linecap="round" opacity="0"/>
  <g class="oj"><circle cx="270" cy="62" r="10" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="272" cy="62" r="5" fill="${INK}"/></g></svg>`);
  d.pas = [...d.querySelectorAll('.pa')]; d.le = d.querySelector('.le'); return d; };
const brinca = (g, t, on, i = 0) => g.pas.forEach((q, j) => { const x = +q.dataset.x, a = on ? Math.sin(t * 14 + j * 1.7 + i) * 26 : Math.sin(t * 2 + j) * 3; q.setAttribute('transform', `rotate(${f1(a)} ${x} 150)`); });
const lame = (g, t, on) => { g.le.style.opacity = on ? 1 : 0; g.le.setAttribute('transform', `translate(0 ${f1(on ? Math.abs(Math.sin(t * 9)) * 6 : 0)})`); };
const CAMARA_F = c => box(c, 0, 0, 110, 80, { zIndex: 12, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 110 80" width="110" height="80"><rect x="5" y="16" width="100" height="60" rx="12" fill="#3d3a44" stroke="${INK}" stroke-width="6"/><rect x="34" y="4" width="40" height="18" rx="5" fill="#3d3a44" stroke="${INK}" stroke-width="5"/><circle cx="55" cy="46" r="20" fill="#1d1a22" stroke="#f4efe2" stroke-width="5"/></svg>`);

function alpes(c) {
  const M = MUNDO(c, 2900, 2700);
  M.far.innerHTML = `<svg viewBox="0 0 2900 2700" width="2900" height="2700"><path d="M0,1500 L300,700 L560,1150 L880,420 L1200,1100 L1500,380 L1850,1000 L2200,300 L2550,950 L2900,560 V2700 H0 Z" fill="#8a96a8" stroke="${INK}" stroke-width="6"/><path d="M820,560 L880,420 L950,560 L900,540 Z M1440,520 L1500,380 L1570,520 L1520,500 Z M2140,440 L2200,300 L2270,440 L2220,420 Z" fill="#f4f7fb" stroke="${INK}" stroke-width="5"/><path d="M0,1700 C600,1500 1200,1640 1800,1560 C2300,1500 2600,1600 2900,1560 V2700 H0 Z" fill="#7d9a62" stroke="${INK}" stroke-width="6"/></svg>`;
  // la presa: muro vertical de piedra con el lago arriba
  const lago = box(M.w, MX0 - 40, MTOP - 70, MX1 - MX0 + 80, 80, { zIndex: 2, background: '#5aa7d6', border: `6px solid ${INK}`, borderRadius: '40px 40px 0 0' });
  const muro = box(M.w, MX0, MTOP, MX1 - MX0, SUELO - MTOP, { zIndex: 3, background: '#a39a8a', border: `8px solid ${INK}`, backgroundImage: 'linear-gradient(rgba(43,33,24,.28) 5px, transparent 5px), linear-gradient(90deg, rgba(43,33,24,.22) 5px, transparent 5px)', backgroundSize: '160px 80px, 160px 160px' });
  const salitre = box(M.w, MX0 + 360, 820, 300, 200, { zIndex: 4, background: 'radial-gradient(circle, rgba(255,255,255,.75), transparent 65%)', opacity: 0 });
  const suelo = box(M.w, 0, SUELO, 2900, 700, { zIndex: 5, background: '#8a7a5a', borderTop: `10px solid #6f8a42` });
  // valle de los pastores: rocas
  const rocas = [[250, 1880, 260], [600, 1820, 320], [980, 1870, 240]].map(([x, y, w]) => box(M.w, x, y, w, SUELO - y + 10, { zIndex: 4, background: '#9aa4ad', border: `7px solid ${INK}`, borderRadius: '50% 50% 10px 10px' }));
  const cabras = [[MX0 + 260, 860], [MX0 + 560, 1180], [MX0 + 760, 760], [MX0 + 420, 1500]].map(([x, y], i) => { const g = CABRA(M.w, 190, ['#d9c9a8', '#c8b48a', '#e6d8bc', '#b8a27a'][i], 7); const rep = box(M.w, x - 30, y - 6, 160, 14, { zIndex: 6, background: '#8a8274', border: `4px solid ${INK}`, borderRadius: '6px' }); return [g, x, y, i]; });
  const crias = [0, 1, 2].map(i => CABRA(M.w, 140, ['#f4efe2', '#d9c9a8', '#e6d8bc'][i], 7));
  const excur = PERSm(M.w, 230, { ropa: '#e8507a', pelo: 'corto', pcol: '#3a2a1e', z: 8, piernas: true, calzas: '#2b3550' }); const cam = CAMARA_F(M.w);
  const pastor = PERSm(M.w, 250, { ropa: '#6b4a2a', pelo: 'calvo', barba: true, pcol: '#9a9a9a', z: 8, piernas: true, calzas: '#3d3a44' });
  const nino = PERSm(M.w, 170, { ropa: '#2b8ad6', pelo: 'corto', pcol: '#3a2a1e', z: 8, piernas: true, calzas: '#3d3a44' });
  const sol = SOL(c, 1); M.vp.appendChild(sol);
  return { M, cabras, crias, excur, cam, pastor, nino, salitre, sol, rocas };
}
const CIELO = () => [[-1, '#9fd0ee', '#eaf2f6', '#ffffff', 0], [999, '#9fd0ee', '#eaf2f6', '#ffffff', 0]];
const pintaA = (W, t) => { cielo(W.M, t, CIELO()); set(W.sol, { x: 780, y: 220 }); };
const cabrasPared = (W, t, k = {}) => W.cabras.forEach(([g, x, y, i]) => { set(g, { x: x + Math.sin(t * 0.7 + i) * 18, y: y - 165, r: Math.sin(t * 1.5 + i) * 3 }); brinca(g, t, false, i); lame(g, t, k.lamen && i === 2); });

/* L0 · PORTADA (fotograma 0, ya en marcha): la cámara sube por el muro con las cabras colgadas; título «ESTAR COMO UNA CABRA» + «…es un piropo» */
plano(-1, L(1) - 0.1, { background: '#9fd0ee' }, c => {
  const W = alpes(c);
  const t1 = texto(c, 200, 'ESTAR COMO', { size: 120, color: '#fff', shadow: `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}` });
  const t2 = texto(c, 330, 'UNA ' + hlSpan('CABRA', 'phl'), { size: 150, color: '#fff', shadow: `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}` });
  const t3 = texto(c, 520, '…es un piropo', { size: 80, italic: true, color: GOLD, shadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}` });
  sfx('swoosh_up', 0.05, 0.5); sp(T.piropo0, 'ding', 0.7);
  return t => {
    camara(W.M, t, [[-1, 2000, 1250, 1.05], [L(1), 2000, 1120, 1.12]]); pintaA(W, t); cabrasPared(W, t);
    set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); set(t3, { o: t > T.piropo0 - 0.2 ? 1 : 0.9, s: pop(t, 0.2, 0.4) });
    pies(W.excur, 230, 1700, SUELO); pFace(W.excur, t, { feliz: -0.3, ceja: 18, look: [6, -16], jaw: 0.6 }); set(W.cam, { x: 1740, y: SUELO - 330 });
    W.crias.forEach((g, i) => set(g, { o: 0 })); W.pastor.style.visibility = W.nino.style.visibility = 'hidden';
  };
}, { sfx: false });

/* ACTO 1 (L1 → L7): el mismo mundo, sin cortar: la cámara sube por la pared → se abre a la presa entera (Alpes) → baja al excursionista →
   sube con su mirada → primer plano de la cabra sobre el vacío (susurro) → su móvil: «¡montaje!» → la cabra lame la sal */
plano(L(1) - 0.1, L(7) - 0.1, { background: '#9fd0ee' }, c => {
  const W = alpes(c);
  const chip_ = chip(c, 380, 420, 'Alpes · Italia', { size: 52, bg: '#2b3550' });
  const metro = box(W.M.w, MX1 + 60, MTOP, 70, SUELO - MTOP, { zIndex: 6 }, `<svg viewBox="0 0 70 1480" width="70" height="${SUELO - MTOP}" preserveAspectRatio="none"><path d="M35,0 V1480 M10,0 H60 M10,1480 H60" stroke="${RED}" stroke-width="8"/></svg>`);
  const m50 = texto(W.M.w, 1180, '50 m', { size: 90, color: RED, x: MX1 + 100, w: 300, z: 7, shadow: `4px 4px 0 #fff` });
  const movil = box(c, 300, 600, 480, 820, { zIndex: 40, background: '#1d1a22', border: `10px solid ${INK}`, borderRadius: '60px' });
  const pant = box(movil, 24, 70, 412, 600, { background: '#9fd0ee', borderRadius: '16px', overflow: 'hidden' }); const fotoC = CABRA(pant, 220, '#d9c9a8', 2); set(fotoC, { x: 100, y: 180 }); box(pant, 0, 380, 412, 220, { background: '#a39a8a', border: `5px solid ${INK}` });
  const coms = ['«¡montaje!»', '«photoshop 100%»', '«eso es IA»'].map((s, i) => BOCADILLO(c, 0, 0, s, { size: 40, z: 45 }));
  const no = texto(c, 1180, '¡ES REAL!', { size: 110, color: RED, z: 46, shadow: `5px 5px 0 ${INK}` });
  sp(T.trepan, 'swoosh_up', 0.5); sp(T.alpes, 'whoosh', 0.4); sp(T.excursionista, 'pop', 0.4); sp(T.camara3, 'thud', 0.7); sp(T.hay, 'mus_baja', 1);
  sp(T.foto, 'click', 0.7); coms.forEach((_, i) => sp(T.montaje - 0.3 + i * 0.35, 'pop2', 0.5)); sp(T.no5, 'stamp', 0.9); sp(T.buscan, 'mus_sube', 1); sp(T.lamen, 'squish', 0.6);
  return t => {
    const enMovil = t > T.foto - 0.15 && t < L(6) - 0.1;
    camara(W.M, t, [
      [L(1) - 0.1, 2000, 1120, 1.12], [T.cincuenta + 0.4, 2000, 760, 0.95],
      [L(2), 2050, 1320, 0.62], [L(3) - 0.15, 2050, 1340, 0.6],
      [L(3), 1720, 1860, 1.25], [T.arriba + 0.2, 1760, 1800, 1.25], [T.camara3 + 0.6, 2000, 1050, 0.95],
      [L(4) + 0.3, 2100, 920, 1.7], [L(5) - 0.15, 2120, 900, 1.9],
      [L(6) - 0.1, 2180, 860, 1.9, 'corte'], [T.lamen + 1.0, 2190, 860, 2.2]]);
    pintaA(W, t); cabrasPared(W, t, { lamen: t > T.lamen - 0.3 });
    W.salitre.style.opacity = t > T.lamen - 0.3 ? 0.8 + 0.2 * Math.sin(t * 6) : 0;
    rotuloA(chip_, t, T.alpes, L(3) - 0.2);
    set(metro, { o: t > T.edificio - 0.3 && t < L(3) ? 1 : 0, sy: p(t, T.edificio - 0.3, 0.6, E.outCubic) }); metro.style.transformOrigin = '50% 100%'; set(m50, { o: t > T.edificio && t < L(3) ? 1 : 0 });
    // excursionista: mira arriba, la cámara se le cae
    pies(W.excur, 230, 1700, SUELO); pFace(W.excur, t, { feliz: t > T.camara3 ? -1 : 0.4, ceja: t > T.arriba ? 20 : 4, look: [6, t > T.arriba ? -16 : 0], jaw: t > T.camara3 ? 0.9 : 0 });
    const kc = p(t, T.camara3, 0.5, E.inCubic); set(W.cam, { x: 1740 + kc * 60, y: SUELO - 330 + kc * 300, r: kc * 260 });
    W.crias.forEach(g => set(g, { o: 0 })); W.pastor.style.visibility = W.nino.style.visibility = 'hidden';
    // el móvil con la foto y los comentarios
    set(movil, { o: enMovil ? 1 : 0, y: enMovil ? (1 - p(t, T.foto - 0.15, 0.35, E.outBack)) * 900 : 900 });
    coms.forEach((b, i) => { const t0 = T.montaje - 0.3 + i * 0.35; set(b, { o: enMovil && t > t0 ? 1 : 0, x: [120, 560, 200][i], y: [620, 900, 1180][i], s: pop(t, t0, 0.3), r: i % 2 ? 5 : -5 }); });
    set(no, { o: enMovil && t > T.no5 ? 1 : 0, s: t > T.no5 ? lerp(2, 1, p(t, T.no5, 0.2)) : 0, r: -6 });
  };
}, { sfx: false });
shakeAt(T.camara3 + 0.3, 0.25, 10); shakeAt(T.no5, 0.3, 12);

/* golpe único de color: SAL */
colorHit(T.sal - 0.05, T.sal + 0.9, YEL, c => { const a = texto(c, 760, 'SAL', { size: 300, color: INK }); return t => set(a, { s: 1 + 0.06 * Math.sin(t * 9), r: -4 }); });
sp(T.sal, 'stamp', 1); shakeAt(T.sal, 0.25, 12);

/* ACTO 2 (L7 → L9): sin cortar, la cámara baja de la presa al valle: los pastores, las crías saltando por las rocas… y un niño que las imita: «¡estás como una cabra!» */
plano(L(7) - 0.1, L(9) - 0.1, { background: '#9fd0ee' }, c => {
  const W = alpes(c);
  const grito = BOCADILLO(W.M.w, 0, 0, '¡Estás como una cabra!', { size: 52 });
  sp(T.crias, 'boing', 0.5); sp(T.saltan, 'boing', 0.5); sp(T.cabra8, 'tada', 0.7);
  return t => {
    camara(W.M, t, [[L(7) - 0.1, 1900, 1400, 0.75], [T.crias, 900, 1650, 0.9], [L(8), 760, 1650, 1.05], [T.cabra8 + 0.6, 700, 1580, 1.15], [L(9), 700, 1570, 1.18]]);
    pintaA(W, t); cabrasPared(W, t, { lamen: true });
    W.excur.style.visibility = 'hidden'; set(W.cam, { o: 0 });
    // crías saltando de roca en roca
    W.crias.forEach((g, i) => { const k = ((t * 0.55 + i * 0.33) % 1), xs = [330, 690, 1060], x = xs[i] + Math.sin(t + i) * 30, top = [1880, 1820, 1870][i];
      g.style.opacity = 1; set(g, { x: x - 70, y: top - 120 - Math.abs(Math.sin(t * 4 + i * 2)) * 160, r: Math.sin(t * 4 + i * 2) * 14 }); brinca(g, t, true, i); });
    // pastor y niño que salta como ellas
    W.pastor.style.visibility = W.nino.style.visibility = 'visible';
    pies(W.pastor, 250, 470, SUELO); pFace(W.pastor, t, { feliz: t > T.cabra8 ? 1 : 0.2, ceja: 10, look: [14, -6], jaw: t > T.cabra8 && t < T.cabra8 + 1 ? 0.7 : 0 });
    const salta = t > T.escrito; pies(W.nino, 170, 760, 1820 - (salta ? Math.abs(Math.sin(t * 5)) * 150 : 0), { r: salta ? Math.sin(t * 5) * 12 : 0 }); pFace(W.nino, t, { feliz: 1, closed: salta, seed: 3 });
    set(grito, { o: t > T.cabra8 - 0.4 ? 1 : 0, x: 300, y: 1420, s: pop(t, T.cabra8 - 0.4, 0.3), r: -4 });
  };
}, { sfx: false });

/* ACTO 3 (L9 → L11): corte al presente: tu salón; alguien te lo dice… y te lo tomas como un piropo (el Vecino, asomado, se ríe) */
plano(L(9) - 0.1, L(10) - 0.1, { background: '#f6d6c8', backgroundImage: 'linear-gradient(#f6d6c8 0 70%, #c87a3a 70%)' }, c => {
  const sofa = box(c, 160, 1080, 760, 240, { zIndex: 3, background: '#2b8ad6', border: `9px solid ${INK}`, borderRadius: '40px 40px 20px 20px' });
  const tu = PERS(c, 380, 640, 330, { ropa: '#e8507a', pelo: 'largo', pcol: '#3a2a1e' });
  const bo = BOCADILLO(c, 520, 460, '¡gracias!', { size: 56 });
  const cor = [0, 1, 2].map(() => box(c, 0, 0, 70, 64, { zIndex: 20 }, `<svg viewBox="0 0 240 220" width="70" height="64"><path d="M120,210 C20,140 0,90 20,50 C40,10 100,10 120,60 C140,10 200,10 220,50 C240,90 220,140 120,210 Z" fill="${PINK}" stroke="${INK}" stroke-width="12"/></svg>`));
  sp(L(9) - 0.1, 'whoosh', 0.5); sp(T.piropo9, 'sparkle', 0.8);
  return t => { set(tu, { y: -Math.abs(Math.sin(t * 5)) * 70, r: Math.sin(t * 5) * 6 }); pFace(tu, t, { feliz: 1, closed: t > T.piropo9, ceja: 8 }); popA(bo, t, T.piropo9, { r: 5 }); cor.forEach((h, i) => { const k = ((t * 0.6 + i / 3) % 1); set(h, { o: t > T.piropo9 ? 1 - k : 0, x: 320 + i * 180, y: 760 - k * 260 }); }); };
});
sfx('mus_silencio', L(9) - 0.4); sfx('mus_sube', L(9) + 0.2);

/* L10 · pregunta final (+ «Os leo», pegado) */
preguntaFinal('¿Qué locura harías tú', 'por algo que te gusta tanto?', { size: 74, draw: c => [['subir una presa', YEL], ['ir a un concierto en otra ciudad', PINK], ['de todo por un jamón', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 280 + i * 30, 640 + i * 160, s, { size: 46, bg: col, color: INK }), L(10) + 0.6 + i * 0.4, { sfx: 'pop' })) });

/* L11 · cierre */
cierre(92, 'Como una cabra', ['CABRAS', 'y piropos']);

Story.run({
  textura: true,
  ovalo: [[L(9) - 0.05, L(10) - 0.15]],
  vecino: { risa: [[T.piropo9, T.piropo9 + 1.2]], sorpresa: [], golpes: [] },
});
