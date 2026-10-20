/* Ep. 62 · «Desde que llegué al Gobierno, el principal problema es la vivienda» — escenas con gráficos animados (librería: engine/story.js) */
Story.prepara();
const T = {
  solita: Q('ella solita'), desde: Q('desde que he llegado'), principal: Q('el principal problema'), viv1: Q('la vivienda'),
  tecn: Q('técnicamente'), verdad: Q('es verdad'),
  llego: Q('enero de dos mil veinte'), dic: Q('diciembre de dos mil veinticuatro'), primera: Q('por primera vez'), uno3: Q('número uno'), cis: Q('cis'),
  culpa: Q('la culpa es suya'), datos4: Q('vienen los datos'),
  d1: Q('dato uno'), m2006: Q('dos mil seis'), quin: Q('quinientas mil'), m2024: Q('en dos mil veinticuatro'), cien: Q('unas cien mil'), cinco: Q('cinco veces menos'),
  d2: Q('dato dos'), europa: Q('en europa'), nueve: Q('nueve por ciento'), espana7: Q('en españa'), dos7: Q('el dos y medio'),
  d3: Q('dato tres'), portales: Q('según los portales'), doblado: Q('casi se ha doblado'), sueldos: Q('los sueldos'), lejos: Q('ni de lejos'),
  incomodo: Q('lo incómodo'), colores: Q('todos los colores'), gestionan: Q('la gestionan'), comunidades: Q('comunidades'), ayto: Q('ayuntamientos'),
  ojo: Q('ojo'), oficiales: Q('las cifras oficiales'), portales10: Q('las de los portales'),
  causo: Q('no lo causó'), arreglado: Q('tampoco lo ha arreglado'), nadie: Q('ni nadie en veinte años'),
};
const AZ = '#2b4a8c', VERDE = '#2e7a4a', GRIS = '#8a7a66';
const fmt = n => Math.round(n).toLocaleString('es-ES');
/* casa con etiqueta de precio */
const casaInner = () => `${FIGP('M40,200 L200,60 L360,200 L360,400 L40,400 Z', '#f3efe6', 6, .18)}<path d="M20,210 L200,40 L380,210" fill="none" stroke="${RED}" stroke-width="22" stroke-linejoin="round"/>
  <rect x="80" y="240" width="80" height="70" fill="#9fd3e0" stroke="${INK}" stroke-width="5"/><rect x="240" y="240" width="80" height="70" fill="#9fd3e0" stroke="${INK}" stroke-width="5"/><path d="M165,400 V320 Q200,290 235,320 V400" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>`;
const CASA = (c, x, y, w, o = {}) => figura(c, x, y, w, w, casaInner(), '0 0 400 420', Object.assign({ z: 6, origin: '50% 100%' }, o));
/* tarjeta-cita que se escribe sola */
function cita(c, y, txt, t0, t1) {
  const card = box(c, 70, y, 940, 520, { zIndex: 8, background: '#FBF6EA', border: `7px solid ${INK}`, borderRadius: '28px', boxShadow: `14px 14px 0 ${INK}` });
  el('div', card, { left: '40px', top: '-40px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '220px', color: RED, lineHeight: 1 }, '“');
  const tx = el('div', card, { left: '60px', top: '90px', width: '820px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '62px', lineHeight: 1.18, color: INK });
  el('div', card, { left: '60px', top: '430px', width: '820px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '36px', color: GRIS }, '— Yolanda Díaz, vicepresidenta (oct. 2026)');
  return t => { const k = clamp(p(t, t0, t1 - t0, E.linear)); tx.textContent = txt.slice(0, Math.round(k * txt.length)); };
}
/* barra vertical animada */
function barra(c, x, base, w, hMax, col, lbl, t0) {
  const b = box(c, x, base, w, 10, { zIndex: 7, background: col, border: `6px solid ${INK}`, borderRadius: '14px 14px 0 0', boxShadow: `8px 0 0 ${INK}` });
  const l = texto(c, base + 20, lbl, { size: 60, x: x - 60, w: w + 120 });
  return (t, f = 1) => { const k = p(t, t0, 0.9, E.outCubic) * f; b.style.height = px(Math.max(10, hMax * k)); b.style.top = px(base - hMax * k); set(l, { o: t > t0 ? 1 : 0 }); return k; };
}
/* donut animado (pct de 100) */
function donut(c, x, y, r, pct, col, lbl, t0) {
  const d = box(c, x, y, r * 2 + 40, r * 2 + 40, { zIndex: 7 });
  const C = 2 * Math.PI * r;
  d.innerHTML = `<svg width="${r * 2 + 40}" height="${r * 2 + 40}" style="overflow:visible"><circle cx="${r + 20}" cy="${r + 20}" r="${r}" fill="none" stroke="#e7dcc4" stroke-width="56"/><circle class="arc" cx="${r + 20}" cy="${r + 20}" r="${r}" fill="none" stroke="${col}" stroke-width="56" stroke-dasharray="0 ${C}" transform="rotate(-90 ${r + 20} ${r + 20})"/><circle cx="${r + 20}" cy="${r + 20}" r="${r + 28}" fill="none" stroke="${INK}" stroke-width="5"/><circle cx="${r + 20}" cy="${r + 20}" r="${r - 28}" fill="none" stroke="${INK}" stroke-width="5"/></svg>`;
  const arc = d.querySelector('.arc'), n = texto(c, y + r - 30, '0 %', { size: 80, x, w: r * 2 + 40 }), l = texto(c, y + r * 2 + 70, lbl, { size: 58, x: x - 40, w: r * 2 + 120 });
  return t => { const k = p(t, t0, 1.0, E.outCubic); arc.setAttribute('stroke-dasharray', `${f1(C * pct / 100 * k)} ${C}`); n.innerHTML = (pct * k).toFixed(1).replace('.', ',') + ' %'; set(d, { o: t > t0 - 0.2 ? 1 : 0 }); set(n, { o: t > t0 - 0.2 ? 1 : 0 }); set(l, { o: t > t0 ? 1 : 0 }); };
}

/* L0 · PORTADA: la cita y la pregunta */
plano(-1, L(1) - 0.1, PAPEL, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  texto(c, 290, '«Desde que llegué…', { size: 84, italic: true });
  const t2 = texto(c, 390, '…el problema es<br>la ' + hlSpan('vivienda', 'phl') + '»', { size: 104, italic: true });
  const k = CASA(c, 330, 690, 420);
  const tag = chip(c, 640, 760, '💶 €€€', { size: 70, bg: RED });
  const st = stamp(c, 120, 1170, '¿ELLA TIENE LA CULPA?', { size: 58, bg: 'rgba(255,255,255,.85)', blend: 'normal' });
  sfx('swoosh_up', 0.05, 0.6);
  return t => { set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); set(k, { r: Math.sin(t * 2) * 2 }); set(tag, { r: 8 + Math.sin(t * 5) * 6, y: -Math.abs(Math.sin(t * 4)) * 20 }); set(st, { r: -6, s: 1 + 0.04 * Math.sin(t * 6) }); };
}, { sfx: false });

/* L1 · la cita, escribiéndose */
plano(L(1) - 0.1, L(2) - 0.1, { background: '#C9D3E6' }, c => {
  const mic = box(c, 470, 330, 140, 200, { zIndex: 6 }, `<svg viewBox="0 0 140 200" width="140" height="200" style="overflow:visible"><rect x="40" y="0" width="60" height="110" rx="30" fill="${GRIS}" stroke="${INK}" stroke-width="6"/><path d="M20,80 Q20,140 70,140 Q120,140 120,80 M70,140 V190 M35,192 H105" fill="none" stroke="${INK}" stroke-width="8"/></svg>`);
  const f = cita(c, 600, 'Desde que he llegado al Gobierno, el principal problema de los españoles es la vivienda.', T.desde, T.viv1 + 0.6);
  return t => { set(mic, { r: Math.sin(t * 3) * 3 }); f(t); };
});

/* L2 · técnicamente… es verdad */
plano(L(2) - 0.1, L(3) - 0.1, PAPEL, c => {
  const s = texto(c, 520, 'Técnicamente…', { size: 120, italic: true });
  sello(c, 800, '✔ ES VERDAD', T.verdad, { size: 130, r: -6, col: VERDE });
  return t => set(s, { r: wobble(t, 0.5, 3), s: pop(t, T.tecn, 0.4) });
});

/* L3 · línea de tiempo 2020 → dic. 2024 (CIS) */
plano(L(3) - 0.1, L(4) - 0.1, { background: '#EFE1C6' }, c => {
  const line = box(c, 140, 760, 800, 14, { zIndex: 5, background: INK, borderRadius: '7px', transformOrigin: '0 50%' });
  const pt = (x, lbl, sub, col) => { const d = box(c, x - 40, 727, 80, 80, { zIndex: 7, borderRadius: '50%', background: col, border: `7px solid ${INK}` }); const l = texto(c, 560, lbl, { size: 90, x: x - 200, w: 400 }); const s = texto(c, 860, sub, { size: 46, x: x - 220, w: 440 }); return [d, l, s]; };
  const a = pt(240, '2020', 'llega al Gobierno', YEL), b = pt(840, '2024', 'diciembre', RED);
  const cis = box(c, 210, 1000, 660, 190, { zIndex: 8, background: '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '20px', boxShadow: `10px 10px 0 ${INK}` });
  el('div', cis, { left: '0', top: '18px', width: '660px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '40px', color: GRIS }, 'Barómetro del CIS · problema nº 1');
  el('div', cis, { left: '0', top: '76px', width: '660px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '84px', color: RED }, '🏠 LA VIVIENDA');
  return t => { set(line, { sx: p(t, T.llego, T.dic - T.llego, E.inOutCubic) }); a.forEach(e => set(e, { o: t > T.llego - 0.2 ? 1 : 0, s: pop(t, T.llego - 0.2, 0.35) })); b.forEach(e => set(e, { o: t > T.dic ? 1 : 0, s: pop(t, T.dic, 0.35) })); set(cis, { o: t > T.uno3 - 0.3 ? 1 : 0, s: pop(t, T.uno3 - 0.3, 0.4), r: -2 }); };
});

/* L4 · ¿la culpa es suya? → vienen los datos */
plano(L(4) - 0.1, L(5) - 0.1, PAPEL, c => {
  const q = texto(c, 420, '¿La culpa<br>es suya?', { size: 140, italic: true });
  const fs = [0, 1, 2].map(i => box(c, 160 + i * 270, 900, 220, 280, { zIndex: 7, background: [YEL, PINK, '#9fd3c0'][i], border: `6px solid ${INK}`, borderRadius: '16px', boxShadow: `8px 8px 0 ${INK}`, fontFamily: 'Rye', fontSize: '110px', textAlign: 'center', lineHeight: '280px', color: INK }, String(i + 1)));
  return t => { set(q, { r: wobble(t, 0.5, 2) }); fs.forEach((f, i) => set(f, { y: (1 - p(t, T.datos4 + i * 0.15, 0.4, E.outBack)) * 900, r: -6 + i * 6 })); };
});

/* L5 · CTA (clip reutilizado del ep55) */
sigueme(5, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L6 · DATO 1: viviendas terminadas, 2006 vs 2024 */
plano(L(6) - 0.1, L(7) - 0.1, PAPEL, c => {
  texto(c, 300, '① Viviendas terminadas', { size: 76 });
  const base = 1240;
  const b1 = barra(c, 220, base, 240, 760, AZ, '2006', T.m2006), b2 = barra(c, 620, base, 240, 760 * 101 / 585, RED, '2024', T.m2024);
  const n1 = texto(c, 0, '', { size: 70, x: 160, w: 360 }), n2 = texto(c, 0, '', { size: 70, x: 560, w: 360 });
  sello(c, 600, '÷ 5', T.cinco, { size: 160, r: -8 });
  return t => { const k1 = b1(t), k2 = b2(t); n1.textContent = fmt(585000 * k1); set(n1, { y: base - 760 * k1 - 100, o: k1 > 0.02 ? 1 : 0 }); n2.textContent = fmt(101000 * k2); set(n2, { y: base - 760 * 101 / 585 * k2 - 100, o: k2 > 0.02 ? 1 : 0 }); };
});

/* L7 · DATO 2: vivienda social, Europa 9,3 % vs España 2,5 % */
plano(L(7) - 0.1, L(8) - 0.1, { background: '#EFE1C6' }, c => {
  texto(c, 300, '② Vivienda social', { size: 80 });
  const a = donut(c, 80, 520, 190, 9.3, AZ, '🇪🇺 media UE', T.nueve - 0.6), b = donut(c, 560, 520, 190, 2.5, RED, '🇪🇸 España', T.dos7 - 0.3);
  aparece(chip(c, 300, 1150, 'fuente: Ministerio de Vivienda', { size: 44, bg: '#fff', color: INK }), T.dos7 + 0.6, { sfx: false });
  return t => { a(t); b(t); };
});

/* L8 · DATO 3: alquiler vs sueldos (línea que se dibuja) */
plano(L(8) - 0.1, L(9) - 0.1, PAPEL, c => {
  texto(c, 300, '③ 2015 → 2025', { size: 80 });
  const g = box(c, 100, 440, 880, 760, { zIndex: 6 });
  const X0 = 60, X1 = 840, Y0 = 700, sc = 620 / 100;  // 100 % de subida = 620 px
  const pAlq = [0, 6, 14, 22, 30, 36, 40, 50, 66, 82, 93].map((v, i) => `${X0 + i * (X1 - X0) / 10},${Y0 - v * sc}`).join(' ');
  const pSue = [0, 1, 3, 5, 7, 7, 10, 13, 17, 20, 21].map((v, i) => `${X0 + i * (X1 - X0) / 10},${Y0 - v * sc}`).join(' ');
  g.innerHTML = `<svg width="880" height="760" style="overflow:visible"><path d="M${X0},40 V${Y0} H${X1}" fill="none" stroke="${INK}" stroke-width="6"/>${[25, 50, 75, 100].map(v => `<path d="M${X0},${Y0 - v * sc} H${X1}" stroke="${INK}" stroke-width="2" opacity=".18"/><text x="${X0 - 12}" y="${Y0 - v * sc + 10}" text-anchor="end" font-family="Bricolage" font-weight="800" font-size="28" fill="${GRIS}">+${v}%</text>`).join('')}
   <polyline class="la" points="${pAlq}" fill="none" stroke="${RED}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="0 1"/>
   <polyline class="ls" points="${pSue}" fill="none" stroke="${AZ}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="0 1"/></svg>`;
  const la = g.querySelector('.la'), ls = g.querySelector('.ls');
  const ca = chip(c, 470, 470, '🏠 alquiler ≈ +93 %', { size: 46, bg: RED }), cs = chip(c, 470, 990, '💼 sueldos ≈ +21 %', { size: 46, bg: AZ });
  aparece(chip(c, 180, 1240, 'alquiler: Fotocasa · sueldos: INE 2015–23', { size: 40, bg: '#fff', color: INK }), T.lejos, { sfx: false });
  return t => { la.setAttribute('stroke-dasharray', `${f1(p(t, T.portales, 1.6, E.inOutCubic) * 1000) / 1000} 1`); ls.setAttribute('stroke-dasharray', `${f1(p(t, T.sueldos, 1.2, E.inOutCubic) * 1000) / 1000} 1`); popA(ca, t, T.doblado, { r: -3 }); popA(cs, t, T.lejos, { r: 3 }); };
});

/* L9 · gobiernos de todos los colores + comunidades y ayuntamientos */
plano(L(9) - 0.1, L(10) - 0.1, { background: '#E9C6BE' }, c => {
  sello(c, 300, 'LO INCÓMODO', T.incomodo, { size: 110, r: -5 });
  const cols = ['#d6302f', '#2b6cc4', '#7a3a8a', '#f08a24', '#2e9e5b'].map((col, i) => box(c, 130 + i * 170, 560, 130, 130, { zIndex: 7, borderRadius: '50%', background: col, border: `7px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}` }));
  const lb = texto(c, 720, 'gobiernos de todos los colores', { size: 56 });
  const edif = (x, lbl, t0) => { const e = figura(c, x, 860, 300, 300, `${FIGP('M20,280 L20,90 L150,20 L280,90 L280,280 Z', '#f3efe6', 6, .2)}${[0, 1, 2].map(r => [0, 1, 2].map(k => `<rect x="${60 + k * 70}" y="${110 + r * 55}" width="40" height="34" fill="#9fd3e0" stroke="${INK}" stroke-width="3"/>`).join('')).join('')}`, '0 0 300 300', { z: 7 }); const ch = chip(c, x + 10, 1180, lbl, { size: 52, bg: YEL, color: INK }); return t => { set(e, { o: t > t0 ? 1 : 0, s: pop(t, t0, 0.4) }); popA(ch, t, t0 + 0.2); }; };
  const e1 = edif(150, 'comunidades', T.comunidades), e2 = edif(620, 'ayuntamientos', T.ayto);
  return t => { cols.forEach((b, i) => set(b, { s: pop(t, T.colores - 0.3 + i * 0.1, 0.3), o: t > T.colores - 0.3 + i * 0.1 ? 1 : 0, y: -Math.abs(Math.sin(t * 4 + i)) * 14 })); set(lb, { o: t > T.colores ? 1 : 0 }); e1(t); e2(t); };
});
emu(L(10) - 1.0);

/* L10 · OJO: oficial vs portales */
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  sello(c, 330, '¡OJO!', T.ojo, { size: 140 });
  const base = 1150;
  const a = barra(c, 400, base, 180, 260, AZ, 'INE', T.oficiales), b = barra(c, 700, base, 180, 520, RED, 'portales', T.portales10);
  aparece(chip(c, 360, 1290 - 40, 'pero todos suben ↗', { size: 52, bg: YEL, color: INK }), T.portales10 + 0.6, { sfx: false });
  return t => { a(t); b(t); };
});

/* L11 · O sea */
golpe(L(11) - 0.1, L(12) - 0.1, YEL, 'No lo causó…', '…ni lo arregló.<br>Ni ella, ni nadie', { y: 470, size: 140, size2: 96, t2: T.arreglado - 0.1 });

/* L12 · pregunta final */
preguntaFinal('¿Cuánto de tu sueldo', 'se va en el piso?', { size: 88, draw: c => [['un 30 %', '#9fd3c0'], ['la mitad', YEL], ['👇 tu caso', PINK]].map(([s, col], i) => aparece(chip(c, 160 + i * 60, 620 + i * 160, s, { size: 64, bg: col, color: INK }), L(12) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L13 · cierre (clip reutilizado del ep55) */
cierre(62, 'La vivienda', ['VIVIENDA', '2006 → 2026']);

Story.run({ ovalo: [[L(10), L(11) - 0.15]] });
