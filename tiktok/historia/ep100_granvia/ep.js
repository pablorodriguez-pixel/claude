/* Ep. 100 · «La Gran Vía se llamó Avenida de Rusia» — FORMATO NUEVO. Un solo mundo: la Gran Vía de lado, que la cámara recorre en UNA dirección como si fuera el tiempo
   (obras → guerra → franquismo → 1981). Arriba, la placa de azulejo de la calle va cambiando de nombre con un contador «nombre n.º X de 8». */
Story.prepara();
const T = {
  rusia0: Q('avenida de rusia'),
  ocho: Q('ocho nombres'),
  construyen: Q('la construyen'), tramos: Q('por tramos'), penalver: Q('conde de peñalver'), pimargall: Q('pi y margall'), dato: Q('eduardo dato'),
  treintayseis: Q('treinta y seis'), guerra: Q('la guerra'), cnt: Q('la cnt'),
  siguiente: Q('al año siguiente'), rusia4: Q('avenida de rusia'), union: Q('unión soviética'),
  madrilenos: Q('los madrileños'), bombas: Q('tantas bombas'), obuses: Q('los obuses'),
  franco: Q('gana franco'), joseantonio: Q('josé antonio'), cuarenta: Q('cuarenta años'),
  ochentayuno: Q('ochenta y uno'), porfin: Q('por fin'), granvia7: Q('gran vía'),
  setenta: Q('setenta años'), nosellamo: Q('no se llamó'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const SUELO = 1800, AZ = '#1f4fa0';
/* edificios de la Gran Vía (de lado) */
const METROPOLIS = `<svg viewBox="0 0 520 1000" width="520" height="1000" style="overflow:visible"><path d="M260,0 V60" stroke="${INK}" stroke-width="8"/><path d="M240,40 L260,0 L280,40 Z" fill="${GOLD}" stroke="${INK}" stroke-width="5"/>
  <path d="M110,260 C110,90 410,90 410,260 Z" fill="#2a2530" stroke="${INK}" stroke-width="8"/><path d="M150,180 H370 M130,220 H390" stroke="${GOLD}" stroke-width="10"/>
  <rect x="60" y="260" width="400" height="740" rx="20" fill="#f4efe2" stroke="${INK}" stroke-width="8"/>${[0, 1, 2, 3, 4].map(r => [0, 1, 2].map(i => `<rect x="${110 + i * 110}" y="${320 + r * 130}" width="70" height="90" rx="30" fill="#3d3a44" stroke="${INK}" stroke-width="5"/>`).join('')).join('')}</svg>`;
const TELEFONICA = `<svg viewBox="0 0 420 1400" width="420" height="1400" style="overflow:visible"><rect x="150" y="0" width="120" height="200" fill="#e9dcc2" stroke="${INK}" stroke-width="7"/><rect x="100" y="180" width="220" height="300" fill="#e9dcc2" stroke="${INK}" stroke-width="7"/>
  <rect x="20" y="460" width="380" height="940" fill="#e9dcc2" stroke="${INK}" stroke-width="8"/>${[...Array(7)].map((_, r) => [0, 1, 2, 3].map(i => `<rect x="${55 + i * 85}" y="${510 + r * 125}" width="50" height="80" fill="#3d3a44" stroke="${INK}" stroke-width="4"/>`).join('')).join('')}</svg>`;
const CAPITOL = `<svg viewBox="0 0 600 1000" width="600" height="1000" style="overflow:visible"><path d="M60,160 H540 V1000 H60 Z" fill="#f4efe2" stroke="${INK}" stroke-width="8"/><path d="M200,160 C200,60 400,60 400,160" fill="#f4efe2" stroke="${INK}" stroke-width="8"/>
  <rect x="160" y="230" width="280" height="90" rx="10" fill="#c8102e" stroke="${INK}" stroke-width="6"/><text x="300" y="295" text-anchor="middle" font-family="Rye" font-size="60" fill="#fff6c8">CAPITOL</text>
  ${[0, 1, 2, 3, 4].map(r => [0, 1, 2, 3].map(i => `<rect x="${110 + i * 100}" y="${380 + r * 120}" width="60" height="80" fill="#3d3a44" stroke="${INK}" stroke-width="4"/>`).join('')).join('')}</svg>`;
const CASA_GV = (w, h, col) => `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><rect x="0" y="0" width="${w}" height="${h}" fill="${col}" stroke="${INK}" stroke-width="8"/>${[...Array(Math.floor((h - 120) / 130))].map((_, r) => [...Array(Math.floor(w / 110))].map((_, i) => `<rect x="${30 + i * 110}" y="${60 + r * 130}" width="60" height="85" fill="#3d3a44" stroke="${INK}" stroke-width="4"/>`).join('')).join('')}</svg>`;
const GRUA = `<svg viewBox="0 0 500 900" width="500" height="900" style="overflow:visible"><path d="M100,900 V60 M140,900 V60 M100,60 H480 M100,200 L480,60 M100,60 L60,60" stroke="${GOLD}" stroke-width="16" fill="none"/><path d="M100,900 V60 M140,900 V60 M100,60 H480" stroke="${INK}" stroke-width="4" fill="none"/><path d="M420,60 V360" stroke="${INK}" stroke-width="5"/><rect x="390" y="360" width="60" height="50" fill="#8a5a32" stroke="${INK}" stroke-width="4"/></svg>`;
function granvia(c) {
  const M = MUNDO(c, 5400, 3000);
  const edif = [[0, 'casa', 520, 760, '#e9c79a'], [560, 'met'], [1120, 'casa', 480, 820, '#d8cdb8'], [1640, 'casa', 520, 700, '#e9dcc2'], [2200, 'tel'], [2660, 'casa', 500, 760, '#e9c79a'], [3200, 'casa', 480, 860, '#d8cdb8'], [3720, 'cap'], [4360, 'casa', 520, 740, '#e9dcc2'], [4920, 'casa', 480, 820, '#e9c79a']];
  edif.forEach(([x, k, w, h, col]) => {
    if (k === 'met') box(M.w, x, SUELO - 1000, 520, 1000, { zIndex: 3 }, METROPOLIS);
    else if (k === 'tel') box(M.w, x, SUELO - 1400, 420, 1400, { zIndex: 3 }, TELEFONICA);
    else if (k === 'cap') box(M.w, x, SUELO - 1000, 600, 1000, { zIndex: 3 }, CAPITOL);
    else box(M.w, x, SUELO - h, w, h, { zIndex: 3 }, CASA_GV(w, h, col));
  });
  const gruas = [[150, SUELO - 1150], [1300, SUELO - 1180]].map(([x, y]) => box(M.w, x, y, 500, 900, { zIndex: 2 }, GRUA));
  box(M.w, 0, SUELO, 5400, 60, { zIndex: 5, background: '#c9b48a', borderTop: `8px solid ${INK}` });
  box(M.w, 0, SUELO + 60, 5400, 1200, { zIndex: 5, background: '#6d6a72', borderTop: `6px solid ${INK}` });
  box(M.w, 0, SUELO + 200, 5400, 10, { zIndex: 6, backgroundImage: 'repeating-linear-gradient(90deg, #f4efe2 0 80px, transparent 80px 160px)' });
  const humo = [...Array(6)].map(() => box(M.w, 0, 0, 200, 200, { zIndex: 4, borderRadius: '50%', background: 'rgba(120,110,100,.55)', border: `5px solid rgba(43,33,24,.5)` }));
  const obuses = [...Array(4)].map(() => box(M.w, 0, 0, 50, 90, { zIndex: 7, background: '#2a2530', border: `4px solid ${INK}`, borderRadius: '50% 50% 40% 40%' }));
  const bum = [...Array(4)].map(() => box(M.w, 0, 0, 240, 240, { zIndex: 8, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 240 240" width="240" height="240"><path d="M120,10 L145,80 L220,60 L165,115 L230,170 L150,160 L120,230 L95,160 L15,175 L75,115 L20,55 L95,80 Z" fill="${YEL}" stroke="${INK}" stroke-width="7"/><circle cx="120" cy="120" r="36" fill="${RED}"/></svg>`));
  return { M, gruas, humo, obuses, bum };
}
/* la placa de azulejo (en pantalla) */
function placa(c) {
  const d = box(c, 110, 380, 860, 250, { zIndex: 50, background: '#fbf6ea', border: `10px solid ${AZ}`, outline: `5px solid ${INK}`, borderRadius: '16px', boxShadow: `0 0 0 14px #fbf6ea, 0 0 0 19px ${INK}`, textAlign: 'center', color: AZ, transformOrigin: '50% 50%' },
    `<div class="an" style="font-family:SpecialElite;font-size:34px;margin-top:22px;color:${INK}"></div><div class="nm" style="font-family:Playfair;font-weight:900;font-size:66px;line-height:1.05;margin:6px 20px 0"></div>`);
  d.an = d.querySelector('.an'); d.nm = d.querySelector('.nm');
  const n = chip(c, 380, 680, '', { size: 46, bg: INK, color: YEL, z: 51 });
  return { d, n };
}
const NOMBRES = () => [[-9, 'AVENIDA DE RUSIA', '1937', 5], [T.penalver, 'CALLE DEL CONDE DE PEÑALVER', 'tramo 1', 1], [T.pimargall, 'AVENIDA DE PI Y MARGALL', 'tramo 2', 2], [T.dato, 'CALLE DE EDUARDO DATO', 'tramo 3', 3],
  [T.cnt, 'AVENIDA DE LA CNT', '1936', 4], [T.rusia4, 'AVENIDA DE RUSIA', '1937', 5], [T.union, 'AVENIDA DE LA UNIÓN SOVIÉTICA', 'en la guerra', 6], [T.joseantonio, 'AVENIDA DE JOSÉ ANTONIO', '1939 – 1981', 7], [T.granvia7, 'GRAN VÍA', '1981', 8]];
const ponPlaca = (P, t, lista, desde = -99) => { let cur = lista[0], t0 = -99; lista.forEach(q => { if (t > q[0] - 0.15 && q[0] >= desde) { cur = q; t0 = q[0] - 0.15; } });
  const k = p(t, t0, 0.35, E.outBack); P.d.style.transform = `scaleY(${f1(Math.max(0.05, Math.abs(Math.cos(Math.min(1, (t - t0) / 0.3) * Math.PI))) * 100) / 100}) rotate(-1.5deg)`;
  const sw = (t - t0) > 0.15 || t0 < -50; const q = sw ? cur : lista[Math.max(0, lista.indexOf(cur) - 1)];
  P.d.nm.textContent = q[1]; P.d.nm.style.fontSize = q[1].length > 22 ? '54px' : '72px'; P.d.an.textContent = q[2]; P.n.textContent = `nombre n.º ${q[3]} de 8`;
  P.d.style.transform = t0 < -50 ? 'rotate(-1.5deg)' : P.d.style.transform; };

/* PORTADA + L1 (sin cortar): la Gran Vía en guerra (humo), la placa «AVENIDA DE RUSIA» y el título → «ocho nombres» */
plano(-1, L(2) - 0.1, { background: '#c9b8a0' }, c => {
  const W = granvia(c); const P = placa(c);
  const t1 = texto(c, 160, 'LA GRAN VÍA SE LLAMÓ…', { size: 74, color: '#fff', z: 60, shadow: OUT });
  const ocho = texto(c, 1150, '8 NOMBRES', { size: 130, color: YEL, z: 60, shadow: OUT });
  sfx('swoosh_up', 0.05, 0.5); sp(T.rusia0, 'stamp', 0.8); sp(T.ocho, 'tada', 0.6);
  return t => {
    camara(W.M, t, [[-1, 2350, 1380, 0.62], [L(2), 2600, 1380, 0.66]]);
    cielo(W.M, t, [[-1, '#c9b8a0', '#e9dcc2', '#8a7a6a', 0.25], [999, '#c9b8a0', '#e9dcc2', '#8a7a6a', 0.25]]);
    W.humo.forEach((h, i) => { const k = ((t * 0.15 + i / 6) % 1); set(h, { x: 1800 + i * 220, y: SUELO - 400 - k * 700, s: 0.6 + k, o: 1 - k }); });
    W.obuses.forEach(o => set(o, { o: 0 })); W.bum.forEach(b => set(b, { o: 0 })); W.gruas.forEach(g => set(g, { o: 0 }));
    ponPlaca(P, t, [[-9, 'AVENIDA DE RUSIA', '1937', 5]]); P.n.style.opacity = 0;
    set(t1, { r: -2 + wobble(t, 0.5, 0.6) }); set(ocho, { o: t > T.ocho - 0.1 ? 1 : 0, s: pop(t, T.ocho - 0.1, 0.35), r: -4 });
  };
}, { sfx: false });

/* ACTOS 1-4 (L2 → L9), sin cortar: la cámara recorre la Gran Vía de izquierda a derecha mientras pasa el tiempo; la placa cambia de nombre a cada momento */
plano(L(2) - 0.1, L(9) - 0.1, { background: '#9fd0ee' }, c => {
  const W = granvia(c); const P = placa(c);
  const obu = chip(c, 300, 760, '«la avenida de los obuses»', { size: 50, bg: '#2a2530', color: '#fff', z: 55 });
  const cuarenta = chip(c, 380, 760, '40 años', { size: 60, bg: '#5e5a52', z: 55 });
  const setenta = texto(c, 780, '1910 → 1981', { size: 110, color: YEL, z: 55, shadow: OUT });
  const conf = [...Array(16)].map((_, i) => box(c, 0, 0, 18, 30, { zIndex: 54, background: [YEL, PINK, '#9fd3c0', '#fff'][i % 4], border: `3px solid ${INK}` }));
  const nl = NOMBRES().slice(1);
  sp(T.penalver, 'click', 0.6); sp(T.pimargall, 'click', 0.6); sp(T.dato, 'click', 0.6); sp(T.guerra, 'mus_baja', 1); sp(T.cnt, 'stamp', 0.7); sp(T.rusia4, 'stamp', 0.7); sp(T.union, 'stamp', 0.7);
  [0, 1, 2, 3].forEach(i => sp(T.bombas + 0.3 + i * 0.5, 'burst', 0.45)); sp(T.joseantonio, 'stamp', 0.7); sp(T.ochentayuno - 0.3, 'mus_sube', 1); sp(T.granvia7, 'tada', 0.8); sp(T.nosellamo, 'boing', 0.7);
  return t => {
    // la cámara avanza siempre a la derecha (el tiempo), con un zoom que respira poco
    const cx = lerp(380, 4900, clamp((t - L(2)) / (L(9) - L(2)))) + 0;
    camara(W.M, t, [[L(2) - 0.1, 850, 1380, 0.68], [T.treintayseis, 1600, 1380, 0.7], [T.franco, 3050, 1380, 0.68], [T.ochentayuno, 4050, 1380, 0.7], [L(9) - 0.1, 4750, 1350, 0.76]]);
    // ambiente por época: obras (grúas) → guerra (humo, obuses) → gris → color
    const guerra = t > T.treintayseis && t < T.franco, gris = t > T.franco && t < T.ochentayuno;
    cielo(W.M, t, [[-1, '#9fd0ee', '#eaf2f6', '#ffffff', 0], [T.treintayseis, '#9fd0ee', '#eaf2f6', '#ffffff', 0], [T.treintayseis + 1, '#c9b8a0', '#e9dcc2', '#8a7a6a', 0.25],
      [T.franco, '#c9b8a0', '#e9dcc2', '#8a7a6a', 0.25], [T.franco + 1, '#b8b8b8', '#d8d8d8', '#7a7a7a', 0.45], [T.ochentayuno, '#b8b8b8', '#d8d8d8', '#7a7a7a', 0.45], [T.ochentayuno + 1.2, '#9fd0ee', '#eaf2f6', '#ffffff', 0], [999, '#9fd0ee', '#eaf2f6', '#ffffff', 0]]);
    W.gruas.forEach(g => set(g, { o: t < T.treintayseis ? 1 : 0 }));
    W.humo.forEach((h, i) => { const k = ((t * 0.15 + i / 6) % 1); set(h, { o: guerra ? 1 - k : 0, x: 1500 + i * 260, y: SUELO - 400 - k * 700, s: 0.6 + k }); });
    W.obuses.forEach((o, i) => { const t0 = T.bombas + i * 0.5, k = p(t, t0 - 0.4, 0.4, E.inCubic); set(o, { o: t > t0 - 0.4 && t < t0 ? 1 : 0, x: 2000 + i * 260, y: lerp(400, SUELO - 120, k), r: 180 }); });
    W.bum.forEach((b, i) => { const t0 = T.bombas + i * 0.5; set(b, { o: t > t0 && t < t0 + 0.5 ? 1 - p(t, t0 + 0.2, 0.3) : 0, x: 1900 + i * 260, y: SUELO - 220, s: pop(t, t0, 0.25) }); });
    ponPlaca(P, t, nl, -1);
    set(obu, { o: t > T.obuses - 0.2 && t < T.franco ? 1 : 0, s: pop(t, T.obuses - 0.2, 0.3), r: -3 });
    set(cuarenta, { o: t > T.cuarenta - 0.1 && t < T.ochentayuno ? 1 : 0, s: pop(t, T.cuarenta - 0.1, 0.3), r: 3 });
    set(setenta, { o: t > T.setenta - 0.2 ? 1 : 0, s: pop(t, T.setenta - 0.2, 0.35), r: -3 });
    conf.forEach((f, i) => { const k = ((t * 0.3 + i * 0.137) % 1); set(f, { o: t > T.granvia7 ? 1 : 0, x: (i * 137) % 1080, y: 200 + k * 1300, r: t * 200 + i * 40 }); });
  };
}, { sfx: false });

/* L9 · pregunta final (+ «Os leo») */
preguntaFinal('¿Qué calle de tu ciudad', 'ha cambiado de nombre?', { size: 76, draw: c => [['la de mi casa', YEL], ['la calle mayor', PINK], ['mil, en mi pueblo', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 300 + i * 30, 640 + i * 160, s, { size: 54, bg: col, color: INK }), L(9) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L10 · cierre */
cierre(100, 'La Gran Vía', ['CALLES', 'con historia']);

Story.run({
  textura: true,
  ovalo: [[T.setenta - 0.2, L(9) - 0.15]],
  vecino: { risa: [[T.nosellamo, T.nosellamo + 1.2]], sorpresa: [], golpes: [] },
});
