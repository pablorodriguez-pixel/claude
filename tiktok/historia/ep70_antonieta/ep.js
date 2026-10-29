/* Ep. 70 · María Antonieta nunca dijo «que coman pasteles» — edición estilo ep07 OK / ep64 (Vecino fijo, escenarios llenos, caras, cero emojis) */
Story.prepara();
const T = {
  nunca: Q('nunca dijo'), pasteles0: Q('que coman pasteles'),
  escribio: Q('lo escribió'), filosofo: Q('un filósofo'), famoso: Q('bastante famoso'),
  memorias: Q('las memorias'), rousseau2: Q('de rousseau'), princesa: Q('una gran princesa'), pueblo: Q('el pueblo'), noPan: Q('no tenía pan'), brioche2: Q('que coman brioche'),
  escribe3: Q('lo escribe'), y1765: Q('mil setecientos sesenta y cinco'), maria3: Q('maría antonieta tenía'), nueve: Q('nueve años'), austria: Q('en austria'),
  pisado: Q('había pisado'), francia4: Q('francia'), casaria: Q('no se casaría'), cinco: Q('cinco años después'),
  cuento: Q('el cuento'), circulaba: Q('circulaba antes'), otras: Q('otras princesas'),
  cuelgan: Q('se la cuelgan'), revolucion: Q('en la revolución'), odiada: Q('más odiada'), villana: Q('hacerla villana'),
  panfletos: Q('panfletos'), caricaturas: Q('caricaturas'), rumores: Q('rumores'), todo: Q('todo valía'), cayo: Q('le cayó'),
  ironico: Q('lo irónico'), cartas: Q('sus cartas'), hambriento: Q('pueblo hambriento'),
  encima: Q('y encima'), pasteles10: Q('pasteles'), mala: Q('mala traducción'), original: Q('la frase original'), brioche10: Q('de brioche'), dulce: Q('un pan dulce'),
  ojo: Q('ojo'), quien: Q('quién era'), inventada: Q('pudo ser inventada'),
  famosa12: Q('la frase más famosa'), nina12: Q('una niña'),
};
const ROJO = '#c8102e', AZULR = '#2b4a8c', CREMA = '#FBF6EA', PIEL = '#f6d7c3', PELUCA = '#eef0f6', ORO = '#e2b33c';
const CAM = c => box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 960px' });
const zoom = (cam, t, t0, d, a = 0.06) => set(cam, { s: 1.02 + a * p(t, t0, d, E.linear) });

/* ---------- cara genérica (clases con prefijo k) → caraK(fig, t, opts, k, cx, cy) ---------- */
const CARA = (k, cx, cy, s = 1, lab = '#b0303a') => `<g class="${k}c"><path d="M${cx - 36 * s},${cy - 24 * s} q${14 * s},${-9 * s} ${28 * s},0 M${cx + 8 * s},${cy - 24 * s} q${14 * s},${-9 * s} ${28 * s},0" stroke="${INK}" stroke-width="${4 * s}" fill="none" stroke-linecap="round"/></g>
  <g class="${k}e"><ellipse cx="${cx - 21 * s}" cy="${cy}" rx="${13 * s}" ry="${15 * s}" fill="#fff" stroke="${INK}" stroke-width="${3.5 * s}"/><ellipse cx="${cx + 21 * s}" cy="${cy}" rx="${13 * s}" ry="${15 * s}" fill="#fff" stroke="${INK}" stroke-width="${3.5 * s}"/></g>
  <g class="${k}p"><circle cx="${cx - 20 * s}" cy="${cy + 2 * s}" r="${6 * s}" fill="${INK}"/><circle cx="${cx + 22 * s}" cy="${cy + 2 * s}" r="${6 * s}" fill="${INK}"/></g>
  <path class="${k}m" d="" fill="${lab}" stroke="${INK}" stroke-width="${3.5 * s}" stroke-linejoin="round"/>`;
const caraK = (f, t, o, k, cx, cy, s = 1) => caraF(f, t, o, cy, [cx, cy + 38 * s, 15 * s, '.' + k + 'm', '.' + k + 'p', '.' + k + 'e', '.' + k + 'c']);

/* ---------- figuras ---------- */
/* reina con peluca enorme (vb 0 0 400 600): cara en (200,360) */
const reinaInner = (o = {}) => { const pel = o.pel || PELUCA, ves = o.ves || '#8fb3de';
  let rizos = ''; [[120, 300], [280, 300], [100, 240], [300, 240], [110, 180], [290, 180], [140, 120], [260, 120], [170, 70], [230, 70], [200, 30], [200, 150], [150, 220], [250, 220]].forEach(([x, y]) => rizos += `<circle cx="${x}" cy="${y}" r="52" fill="${pel}" stroke="${INK}" stroke-width="5"/>`);
  return `<path d="M30,600 C40,500 110,460 200,460 C290,460 360,500 370,600 Z" fill="${ves}" stroke="${INK}" stroke-width="6"/><path d="M110,480 Q200,560 290,480" fill="#fff" stroke="${INK}" stroke-width="5"/>${[130, 165, 200, 235, 270].map(x => `<circle cx="${x}" cy="${510 + Math.abs(x - 200) * -0.3}" r="9" fill="#fff" stroke="${INK}" stroke-width="3"/>`).join('')}
  <rect x="172" y="410" width="56" height="60" fill="${PIEL}" stroke="${INK}" stroke-width="5"/>
  ${rizos}
  <ellipse cx="200" cy="350" rx="92" ry="108" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
  <circle cx="150" cy="390" r="16" fill="#f29aa6" opacity=".7"/><circle cx="250" cy="390" r="16" fill="#f29aa6" opacity=".7"/>
  ${o.lunar !== false ? '<circle cx="246" cy="420" r="4" fill="' + INK + '"/>' : ''}
  <path d="M250,60 C290,20 320,10 340,-30 C320,30 300,60 262,90" fill="#f2a2c0" stroke="${INK}" stroke-width="4"/><path d="M160,250 l-30,-26 l0,52 Z M160,250 l30,-26 l0,52 Z" fill="${o.lazo || '#f2a2c0'}" stroke="${INK}" stroke-width="4"/>
  ${o.corona ? `<path d="M140,20 L160,-30 L180,10 L200,-40 L220,10 L240,-30 L260,20 Z" fill="${ORO}" stroke="${INK}" stroke-width="5"/>` : ''}
  <g class="villa" style="opacity:0"><path d="M150,404 C170,390 190,396 200,402 C210,396 230,390 250,404 C236,398 214,404 200,412 C186,404 164,398 150,404 Z" fill="${INK}"/><path d="M120,200 C100,160 110,130 130,110 C126,140 136,170 150,190 Z M280,200 C300,160 290,130 270,110 C274,140 264,170 250,190 Z" fill="${ROJO}" stroke="${INK}" stroke-width="4"/></g>
  ${CARA('r', 200, 345, 1.2, '#c0283a')}`; };
const REINA = (c, x, y, w, o = {}) => figura(c, x, y, w, w * 1.5, reinaInner(o), '0 -50 400 650', Object.assign({ z: 8, origin: '50% 100%' }, o));
const reina = (f, t, o) => caraK(f, t, o, 'r', 200, 345, 1.2);
/* niña de 9 años con trenzas (vb 0 0 300 420): cara en (150,170) */
const ninaInner = () => `<path d="M40,420 C50,330 100,300 150,300 C200,300 250,330 260,420 Z" fill="#9fd3c0" stroke="${INK}" stroke-width="6"/><rect x="130" y="250" width="40" height="60" fill="${PIEL}" stroke="${INK}" stroke-width="5"/>
  <path d="M70,160 C60,260 40,300 50,330 L80,330 C80,290 90,250 96,200 Z M230,160 C240,260 260,300 250,330 L220,330 C220,290 210,250 204,200 Z" fill="#e0b25a" stroke="${INK}" stroke-width="5"/><circle cx="62" cy="330" r="16" fill="#f2a2c0" stroke="${INK}" stroke-width="4"/><circle cx="238" cy="330" r="16" fill="#f2a2c0" stroke="${INK}" stroke-width="4"/>
  <ellipse cx="150" cy="170" rx="86" ry="96" fill="${PIEL}" stroke="${INK}" stroke-width="6"/><path d="M64,150 C70,70 230,70 236,150 C200,110 110,110 64,150 Z" fill="#e0b25a" stroke="${INK}" stroke-width="5"/>
  <circle cx="104" cy="210" r="13" fill="#f29aa6" opacity=".7"/><circle cx="196" cy="210" r="13" fill="#f29aa6" opacity=".7"/>${CARA('n', 150, 170, 1.05)}`;
const NINA = (c, x, y, w) => figura(c, x, y, w, w * 1.4, ninaInner(), '0 0 300 420', { z: 9, origin: '50% 100%' });
const nina = (f, t, o) => caraK(f, t, o, 'n', 150, 170, 1.05);
/* pastel con cara (vb 0 0 300 260) y brioche con cara (vb 0 0 300 280) */
const pastelInner = () => `${cut('<path d="M20,120 L280,120 L280,240 L20,240 Z"/>', 6, 8)}<path d="M20,120 L280,120 L280,240 L20,240 Z" fill="#f6e2b8" stroke="${INK}" stroke-width="6"/><path d="M20,170 H280" stroke="#e87aa0" stroke-width="14"/><path d="M14,120 C40,90 70,130 100,100 C130,130 160,90 190,110 C220,130 250,90 286,120 Z" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="150" cy="70" r="26" fill="${ROJO}" stroke="${INK}" stroke-width="5"/><path d="M150,46 q8,-20 20,-26" stroke="${INK}" stroke-width="4" fill="none"/>${CARA('p', 150, 196, 0.95)}`;
const PASTEL = (c, x, y, w) => figura(c, x, y, w, w * 260 / 300, pastelInner(), '0 0 300 260', { z: 9, origin: '50% 100%' });
const pastel = (f, t, o) => caraK(f, t, o, 'p', 150, 196, 0.95);
const briocheInner = () => `${cut('<path d="M30,250 C10,180 50,120 150,120 C250,120 290,180 270,250 Z"/>', 6, 8)}<path d="M30,250 C10,180 50,120 150,120 C250,120 290,180 270,250 Z" fill="#d9902e" stroke="${INK}" stroke-width="6"/><path d="M60,200 Q80,140 110,190 M130,190 Q150,130 170,190 M190,190 Q220,140 240,200" stroke="#a86418" stroke-width="5" fill="none"/><circle cx="150" cy="96" r="44" fill="#e09e3c" stroke="${INK}" stroke-width="6"/><ellipse cx="120" cy="150" rx="40" ry="12" fill="#fff" opacity=".35"/>${CARA('b', 150, 204, 0.95)}`;
const BRIOCHE = (c, x, y, w) => figura(c, x, y, w, w * 280 / 300, briocheInner(), '0 0 300 280', { z: 9, origin: '50% 100%' });
const brioche = (f, t, o) => caraK(f, t, o, 'b', 150, 204, 0.95);
/* libro abierto (vb 0 0 700 460) con líneas que se escriben (.ln) */
const libroInner = (tit, sub) => `${FIGP('M20,40 L350,20 L680,40 L680,440 L350,420 L20,440 Z', CREMA, 7, .1)}<path d="M350,20 V420" stroke="${INK}" stroke-width="5"/>
  <text x="185" y="120" text-anchor="middle" font-family="Rye" font-size="40" fill="${INK}">${tit}</text><text x="185" y="170" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="800" font-size="34" fill="${ROJO}">${sub}</text>
  ${[...Array(6)].map((_, k) => `<path class="ln" d="M390,${90 + k * 52} H${640 - (k % 3) * 40}" stroke="${INK}" stroke-width="6" stroke-linecap="round" opacity=".55"/>`).join('')}
  ${[...Array(4)].map((_, k) => `<path d="M60,${240 + k * 46} H310" stroke="${INK}" stroke-width="5" opacity=".25"/>`).join('')}`;
const LIBRO = (c, x, y, w, tit, sub) => { const f = figura(c, x, y, w, w * 460 / 700, libroInner(tit, sub), '0 0 700 460', { z: 7, origin: '50% 50%' }); f.ln = [...f.querySelectorAll('.ln')]; return f; };
const escribe = (f, t, t0, dur = 2) => f.ln.forEach((l, i) => { const k = clamp((t - t0) / dur * f.ln.length - i); l.style.strokeDasharray = '400'; l.style.strokeDashoffset = f1(400 * (1 - k)); });
const PLUMA = (c, x, y) => box(c, x, y, 160, 300, { zIndex: 14, transformOrigin: '20% 95%' }, `<svg viewBox="0 0 160 300" width="160" height="300" style="overflow:visible"><path d="M30,290 C40,200 90,90 150,10 C120,110 90,200 40,292 Z" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M34,286 C70,190 110,100 146,16" stroke="${INK}" stroke-width="3" fill="none"/><path d="M30,290 L22,300" stroke="${INK}" stroke-width="6"/></svg>`);
const CALENDARIO = (c, x, y, w) => { const d = box(c, x, y, w, w * 1.1, { zIndex: 8, background: CREMA, border: `7px solid ${INK}`, borderRadius: '18px', boxShadow: `12px 12px 0 ${INK}`, overflow: 'hidden' }); box(d, 0, 0, w, w * 0.26, { background: ROJO, borderBottom: `6px solid ${INK}` }); [0.25, 0.75].forEach(k => box(d, w * k - 12, -6, 24, 50, { background: '#9aa4ad', border: `4px solid ${INK}`, borderRadius: '10px' })); d.num = el('div', d, { left: '0', top: px(w * 0.34), width: px(w), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(w * 0.38), color: INK }, '1700'); return d; };
const DIARIO = (c, x, y, tit, l1, l2) => box(c, x, y, 760, 540, { zIndex: 30, background: '#f4efe2', border: `7px solid ${INK}`, boxShadow: `14px 14px 0 ${INK}` }, `<div style="font-family:Rye;font-size:54px;text-align:center;border-bottom:6px double ${INK};padding:14px 0 8px;color:${INK}">${tit}</div><div style="font-family:Playfair;font-weight:900;font-size:76px;line-height:1;text-align:center;color:${INK};padding:24px 20px 10px">${l1}</div><div style="font-family:Playfair;font-style:italic;font-weight:800;font-size:50px;text-align:center;color:${ROJO}">${l2}</div><div style="margin:18px 40px;height:90px;background:repeating-linear-gradient(0deg,rgba(43,33,24,.35) 0 4px,transparent 4px 18px)"></div>`);
const giraD = (e, t, t0) => { const k = p(t, t0, 0.55, E.outCubic); set(e, { o: t > t0 ? 1 : 0, s: lerp(0.05, 1, k), r: lerp(720, -4, k) }); };
const PARIS = (c, y, col = '#6b7fa8') => box(c, 0, y, 1080, 420, { zIndex: 3 }, `<svg viewBox="0 0 1080 420" width="1080" height="420"><path d="M0,420 V200 H80 V150 H140 V220 H200 V120 L230,80 L260,120 V230 H330 V170 H400 V60 H420 V20 H440 V60 H470 V60 H490 V20 H510 V60 H530 V200 H600 V140 H680 V230 H740 V110 L780,60 L820,110 V220 H900 V160 H980 V210 H1080 V420 Z" fill="${col}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>${[[100, 240], [220, 160], [350, 210], [620, 180], [760, 150], [920, 200]].map(([x, yy]) => `<rect x="${x}" y="${yy}" width="26" height="34" fill="#f2d65c" stroke="${INK}" stroke-width="3"/>`).join('')}</svg>`);
const tachon = (c, x, y, w) => box(c, x, y, w, 26, { zIndex: 40, background: ROJO, border: `4px solid ${INK}`, borderRadius: '14px', transformOrigin: '0% 50%' });
const ciudadano = (c, x, y, w, i) => { const b = mkBust(c, [x, y, w, w * 1.28], { uniform: 'farmer', hat: ['cap', 'slouch', 'brodie'][i % 3], moustache: i % 2 === 0, beard: i % 3 === 1, seed: 120 + i }); return b; };
const PANFLETO = (c, i) => box(c, 0, 0, 170, 220, { zIndex: 20, background: i % 2 ? '#f4efe2' : '#efe3c0', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, fontFamily: 'Rye', fontSize: '26px', textAlign: 'center', color: INK, padding: '10px 6px', lineHeight: 1.1 }, i % 3 === 0 ? '¡ABAJO<br>LA REINA!' : i % 3 === 1 ? `<svg viewBox="0 0 100 120" width="120" height="140"><circle cx="50" cy="44" r="30" fill="${PIEL}" stroke="${INK}" stroke-width="4"/><circle cx="40" cy="40" r="5"/><circle cx="60" cy="40" r="5"/><path d="M36,60 Q50,50 64,60" stroke="${INK}" stroke-width="4" fill="none"/><path d="M20,30 C10,-10 90,-10 80,30" fill="${PELUCA}" stroke="${INK}" stroke-width="4"/><path d="M30,10 L22,-10 M70,10 L78,-10" stroke="${ROJO}" stroke-width="6"/></svg>` : 'MADAME<br>DÉFICIT');

/* L0 · PORTADA (fotograma 0 completo): la reina dice la frase… y la frase queda tachada */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  texto(c, 230, 'María Antonieta nunca dijo…', { size: 64 });
  const t2 = texto(c, 320, '«que coman ' + hlSpan('pasteles', 'phl') + '»', { size: 96, italic: true });
  const q = REINA(c, 90, 560, 470, { corona: true });
  const pa = PASTEL(c, 610, 930, 400);
  const ests = [0, 1, 2, 3].map(i => ESTRELLA(c, 54, ORO));
  const bub = BOCADILLO(c, 560, 720, '¿pasteles?', { size: 50 });
  const tch = tachon(c, 90, 370, 900);
  const fal = stamp(c, 330, 560, '¡FALSO!', { size: 110, z: 50, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  sfx('swoosh_up', 0.05, 0.6); sp(T.pasteles0 + 0.6, 'scratch', 0.9); sp(T.pasteles0 + 0.9, 'stamp', 1);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
    set(q, { r: Math.sin(t * 2.4) * 3, y: -Math.abs(Math.sin(t * 4)) * 10 }); reina(q, t, { jaw: talkW(t, 'VECINO'), look: [8, -2], feliz: 1, ceja: t > T.pasteles0 + 0.9 ? 14 : 4 });
    const hop = Math.abs(Math.sin(t * 5)); set(pa, { y: -hop * 30, sy: 1 - 0.06 * (1 - hop), r: Math.sin(t * 3) * 5 }); pastel(pa, t, { feliz: t > T.pasteles0 + 0.9 ? -1 : 1, jaw: 0.3, look: [-6, -4], ceja: t > T.pasteles0 + 0.9 ? 12 : 0 });
    ests.forEach((e, i) => { const a = t * 2 + i * 1.57; set(e, { x: 800 + Math.cos(a) * 190, y: 1080 + Math.sin(a) * 120 - 120, s: 0.7 + 0.4 * Math.sin(t * 7 + i) }); });
    set(bub, { o: 1, r: 4 + Math.sin(t * 3) * 2 });
    set(tch, { sx: p(t, T.pasteles0 + 0.6, 0.3, E.outCubic), r: -2 });
    stampA(fal, t, T.pasteles0 + 0.9, -10);
  };
}, { sfx: false });
shakeAt(T.pasteles0 + 0.95, 0.3, 14);

/* L1 · el que sí lo escribió… un filósofo famoso: silueta bajo el foco → se enciende la luz, flashes */
headline(L(1) - 0.1, L(2) - 0.1, '¿Quién lo *escribió*?', { size: 92, hlT: T.escribio, color: '#fff' });
plano(L(1) - 0.1, L(2) - 0.1, { background: '#2e2640', backgroundImage: 'repeating-linear-gradient(90deg, rgba(160,30,60,.35) 0 60px, rgba(120,20,45,.35) 60px 120px)' }, c => {
  const cam = CAM(c);
  box(cam, 0, 1250, 1080, 700, { zIndex: 2, background: '#6b4a2a', borderTop: `8px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.18) 0 5px, transparent 5px 160px)' });
  const foco = box(cam, 140, 360, 800, 1000, { zIndex: 3, background: 'radial-gradient(ellipse at 50% 70%, rgba(255,240,170,.75), rgba(255,240,170,0) 65%)' });
  const ro = mkBust(cam, [320, 640, 440, 563], { uniform: 'farmer', seed: 61 });
  const q = texto(cam, 640, '?', { size: 260, color: ORO, x: 380, w: 320, z: 20, shadow: `6px 6px 0 ${INK}` });
  const pl = PLUMA(cam, 700, 840);
  const fl = box(c, 0, 0, 1080, 1920, { zIndex: 600, background: '#fff' });
  const ests = [0, 1, 2, 3, 4].map(i => ESTRELLA(cam, 70, ORO));
  const fam = stamp(cam, 260, 1110, 'FILÓSOFO', { size: 84, col: ORO, z: 30, bg: 'rgba(43,33,24,.85)', blend: 'normal' });
  sp(L(1) + 0.1, 'whoosh', 0.6); sp(T.escribio, 'drumroll', 0.6); sp(T.filosofo, 'sparkle', 0.9); sp(T.famoso, 'click', 0.8); sp(T.famoso + 0.3, 'click', 0.8); sp(T.filosofo + 0.3, 'stamp', 0.8);
  return t => {
    zoom(cam, t, L(1), 4.5, 0.1);
    const lit = p(t, T.filosofo, 0.3, E.outCubic); ro.d.style.filter = lit < 1 ? `brightness(${f1(lit)})` : '';
    face(ro, t, { look: [0, 0], bL: lit > 0.5 ? 10 : 0, bR: lit > 0.5 ? 10 : 0, jaw: lit > 0.5 ? talkW(t, 'VECINO') * 0.4 : 0, seed: 0.3 });
    set(foco, { x: Math.sin(t * 1.7) * 60 * (1 - lit), o: 0.6 + 0.4 * lit });
    set(q, { o: t < T.filosofo ? 1 : 0, r: Math.sin(t * 4) * 10, s: 1 + 0.06 * Math.sin(t * 8) });
    set(pl, { o: lit, r: Math.sin(t * 9) * 8 });
    const fk = [T.famoso, T.famoso + 0.3].reduce((m, t0) => Math.max(m, t > t0 && t < t0 + 0.12 ? 1 - (t - t0) / 0.12 : 0), 0); set(fl, { o: fk * 0.8 });
    ests.forEach((e, i) => { const a = t * 1.5 + i * 1.26; set(e, { x: 540 + Math.cos(a) * 340 - 35, y: 880 + Math.sin(a) * 300, o: lit, s: 0.6 + 0.4 * Math.sin(t * 6 + i) }); });
    stampA(fam, t, T.filosofo + 0.3, -6);
  };
});

/* L2a · las memorias de Rousseau: el libro se abre y la pluma escribe sola */
headline(L(2) - 0.1, L(3) - 0.1, 'Las memorias de *Rousseau*', { size: 82, hlT: T.rousseau2 });
plano(L(2) - 0.1, T.princesa - 0.1, { background: '#d8c3a0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.12) 0 6px, transparent 6px 110px)' }, c => {
  const cam = CAM(c);
  box(cam, 0, 1150, 1080, 800, { zIndex: 2, background: '#7a4a24', borderTop: `8px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,.15) 0 4px, transparent 4px 60px)' });
  const vela = box(cam, 860, 760, 90, 400, { zIndex: 6 }, `<svg viewBox="0 0 90 400" width="90" height="400" style="overflow:visible"><rect x="25" y="120" width="40" height="230" fill="#f4efe2" stroke="${INK}" stroke-width="5"/><path class="llama" d="M45,40 C70,80 64,110 45,118 C26,110 20,80 45,40 Z" fill="${ORO}" stroke="${INK}" stroke-width="4"/><rect x="5" y="340" width="80" height="40" rx="10" fill="${ORO}" stroke="${INK}" stroke-width="5"/></svg>`);
  const lb = LIBRO(cam, 90, 640, 760, 'CONFESIONES', 'J.-J. Rousseau');
  const pl = PLUMA(cam, 560, 600);
  const ro = mkBust(cam, [40, 300, 300, 384], { uniform: 'farmer', seed: 61 });
  sp(T.memorias - 0.1, 'paper', 0.8); sp(T.rousseau2, 'typing', 0.6);
  return t => {
    zoom(cam, t, L(2), 3);
    set(lb, { sx: Math.max(0.05, p(t, T.memorias - 0.2, 0.5, E.outBack)), r: -2 });
    escribe(lb, t, T.rousseau2, 1.8);
    const k = clamp((t - T.rousseau2) / 1.8 * 6); const li = Math.min(5, Math.floor(k)), fr = k - li;
    set(pl, { o: t > T.memorias + 0.2 ? 1 : 0, x: (li < 6 ? fr * 220 : 0) - 120, y: li * 34, r: Math.sin(t * 20) * 6 });
    face(ro, t, { look: [8, 6], bL: 4, bR: 8, seed: 0.3 });
    vela.querySelector('.llama').setAttribute('transform', `translate(45 118) scale(${f1(1 + 0.1 * Math.sin(t * 13))} ${f1(1 + 0.15 * Math.sin(t * 9))}) translate(-45 -118)`);
  };
});
/* L2b · la gran princesa en su balcón; abajo el pueblo sin pan → «¡que coman brioche!» */
plano(T.princesa - 0.1, L(3) - 0.1, { background: '#bcd3ea' }, c => {
  const cam = CAM(c);
  const pal = box(cam, 520, 330, 560, 1000, { zIndex: 3, background: '#efe1c6', border: `7px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.12) 0 4px, transparent 4px 70px)' });
  [0, 1].forEach(i => box(pal, 60 + i * 240, 100, 140, 220, { background: '#8fb3de', border: `6px solid ${INK}`, borderRadius: '70px 70px 0 0' }));
  const prin = REINA(cam, 600, 560, 300, { corona: true, ves: '#c9a0dc', pel: '#f3e6a8', lunar: false });
  box(cam, 540, 990, 520, 50, { zIndex: 12, background: '#efe1c6', border: `6px solid ${INK}`, backgroundImage: `repeating-linear-gradient(90deg, ${INK} 0 6px, transparent 6px 50px)` });
  box(cam, 0, 1180, 1080, 800, { zIndex: 4, background: '#a0794a', borderTop: `8px solid ${INK}` });
  const gente = [0, 1, 2].map(i => ciudadano(cam, 40 + i * 170, 900, 240, i));
  const ces = box(cam, 300, 1160, 220, 110, { zIndex: 14 }, `<svg viewBox="0 0 220 110" width="220" height="110"><path d="M10,20 L210,20 L190,100 L30,100 Z" fill="#c9a06a" stroke="${INK}" stroke-width="6"/><path d="M30,40 H190 M40,60 H180 M50,80 H170" stroke="${INK}" stroke-width="3" opacity=".5"/></svg>`);
  const sinPan = BOCADILLO(cam, 40, 760, '¡NO HAY PAN!', { size: 50 });
  const dice = BOCADILLO(cam, 260, 460, '«¡Que coman brioche!»', { size: 50 });
  const br = BRIOCHE(cam, 360, 560, 220);
  sp(T.princesa, 'pop', 0.6); sp(T.noPan, 'sad', 0.7); sp(T.brioche2, 'ding', 0.8); sp(T.brioche2 + 0.3, 'boing', 0.7);
  return t => {
    zoom(cam, t, T.princesa, 3);
    set(prin, { s: pop(t, T.princesa, 0.4), r: Math.sin(t * 2) * 3 }); reina(prin, t, { look: [-8, 6], feliz: 1, jaw: t > T.brioche2 ? talkW(t, 'VECINO') : 0, ceja: 4, seed: 0.5 });
    gente.forEach((g, i) => { set(g.d, { o: t > T.pueblo + i * 0.1 ? 1 : 0, y: (1 - p(t, T.pueblo + i * 0.1, 0.35, E.outBack)) * 300 - Math.abs(Math.sin(t * 8 + i)) * 12 }); face(g, t, { look: [8, -6], bL: 12, bR: 12, jaw: t > T.noPan ? Math.abs(Math.sin(t * 9 + i)) * 0.6 : 0, seed: i }); });
    popA(sinPan, t, T.noPan, { r: -4 }); set(ces, { o: t > T.noPan ? 1 : 0, r: Math.sin(t * 6) * 4 });
    popA(dice, t, T.brioche2 - 0.1, { r: 3 });
    set(br, { o: t > T.brioche2 + 0.3 ? 1 : 0, s: pop(t, T.brioche2 + 0.3, 0.4), y: -Math.abs(Math.sin(t * 6)) * 16 }); brioche(br, t, { feliz: 1, jaw: 0.5, look: [6, 4] });
  };
});

/* L3 · 1765: el calendario corre… María Antonieta tenía 9 años y vivía en Austria (mapa con pin) */
headline(L(3) - 0.1, L(4) - 0.1, 'Hacia *1765*', { size: 96, hlT: T.y1765 });
plano(L(3) - 0.1, T.maria3 - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 400, 1400, 20, 'rgba(255,230,0,.3)', 'rgba(0,0,0,0)', 1);
  const cal = CALENDARIO(cam, 300, 470, 480);
  const lb = LIBRO(cam, 640, 1010, 380, 'CONFESIONES', 'Rousseau');
  const pl = PLUMA(cam, 900, 900);
  sp(T.escribe3, 'paper', 0.6); sp(T.y1765, 'tick', 0.5); sp(T.y1765 + 0.4, 'tick', 0.5); sp(T.y1765 + 1.2, 'ding', 0.8);
  return t => {
    zoom(cam, t, L(3), 3); set(ry, { r: t * 6 });
    const k = p(t, T.y1765 - 0.2, 1.4, E.outCubic); cal.num.textContent = String(Math.round(1700 + 65 * k)); set(cal, { r: Math.sin(t * 3) * 2, s: t > T.y1765 + 1.2 ? 1 + 0.08 * (1 - p(t, T.y1765 + 1.2, 0.3)) : 1 });
    escribe(lb, t, T.escribe3, 1.4); set(pl, { r: Math.sin(t * 18) * 8, x: Math.sin(t * 6) * 30 });
  };
});
shakeAt(T.y1765 + 1.2, 0.25, 10);
/* L3b–L4 · mapa: Austria con la niña de 9 años; Francia al lado, todavía sin pisar; boda 5 años después */
const MAPA = (cam) => box(cam, 0, 300, 1080, 1200, { zIndex: 2 }, `<svg viewBox="0 0 1080 1200" width="1080" height="1200"><rect width="1080" height="1200" fill="#9cc3e4"/><path d="M-20,120 C120,60 260,140 330,110 C420,180 400,300 470,360 C430,470 470,600 420,700 C330,760 260,820 150,800 C60,760 0,700 -20,640 Z" fill="#e9d7b0" stroke="${INK}" stroke-width="7"/><path d="M520,320 C620,260 760,300 860,280 C980,320 1060,300 1100,340 L1100,620 C1000,660 880,600 780,640 C680,660 590,600 540,560 C500,480 500,400 520,320 Z" fill="#e2c8a0" stroke="${INK}" stroke-width="7"/><path d="M470,360 C500,380 510,340 520,320 M420,700 C470,640 500,600 540,560" stroke="${INK}" stroke-width="5" stroke-dasharray="14 10" fill="none"/><text x="200" y="460" text-anchor="middle" font-family="Rye" font-size="62" fill="${INK}">FRANCIA</text><text x="840" y="770" text-anchor="middle" font-family="Rye" font-size="62" fill="${INK}">AUSTRIA</text></svg>`);
const PIN = c => box(c, 0, 0, 120, 170, { zIndex: 20, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 120 170" width="120" height="170"><path d="M60,166 C30,110 6,86 6,58 A54,54 0 0 1 114,58 C114,86 90,110 60,166 Z" fill="${ROJO}" stroke="${INK}" stroke-width="6"/><circle cx="60" cy="58" r="22" fill="#fff" stroke="${INK}" stroke-width="5"/></svg>`);
plano(T.maria3 - 0.1, L(5) - 0.1, { background: '#9cc3e4' }, c => {
  const cam = CAM(c);
  MAPA(cam);
  const pin = PIN(cam);
  const ni = NINA(cam, 640, 560, 300);
  const nueve = stamp(cam, 560, 1180, '9 AÑOS', { size: 80, z: 30, col: AZULR, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  const ruta = box(cam, 340, 760, 330, 14, { zIndex: 15, backgroundImage: `repeating-linear-gradient(90deg, ${ROJO} 0 26px, transparent 26px 44px)`, transformOrigin: '100% 50%' });
  const xx = box(cam, 300, 650, 230, 230, { zIndex: 22 }, XSVG);
  const cal = CALENDARIO(cam, 360, 380, 260);
  const anillos = box(cam, 400, 1120, 280, 160, { zIndex: 25 }, `<svg viewBox="0 0 280 160" width="280" height="160"><circle cx="100" cy="90" r="56" fill="none" stroke="${INK}" stroke-width="22"/><circle cx="100" cy="90" r="56" fill="none" stroke="${ORO}" stroke-width="13"/><circle cx="180" cy="90" r="56" fill="none" stroke="${INK}" stroke-width="22"/><circle cx="180" cy="90" r="56" fill="none" stroke="${ORO}" stroke-width="13"/></svg>`);
  sp(T.maria3, 'pop', 0.6); sp(T.nueve, 'stamp', 0.9); sp(T.austria, 'thud', 0.9); sp(T.pisado, 'whoosh', 0.5); sp(T.francia4 + 0.2, 'glitch', 0.6);
  [0, 1, 2, 3, 4].forEach(i => sp(T.cinco + i * 0.16, 'tick', 0.5)); sp(T.cinco + 0.9, 'ding', 0.8);
  return t => {
    zoom(cam, t, T.maria3, 5, 0.05);
    set(ni, { s: pop(t, T.maria3, 0.4), y: -Math.abs(Math.sin(t * 5)) * 18, x: t > T.pisado ? -40 * p(t, T.pisado, 0.5, E.inOutCubic) * (1 - p(t, T.francia4 + 0.3, 0.3)) : 0 });
    nina(ni, t, { feliz: t > T.francia4 + 0.3 && t < T.casaria ? -1 : 1, jaw: talkW(t, 'VECINO') * 0.4, look: t > T.pisado ? [-8, 0] : [0, 4], ceja: t > T.francia4 + 0.3 ? 10 : 2 });
    stampA(nueve, t, T.nueve, -8);
    const kp = p(t, T.austria - 0.1, 0.4, E.outBack); set(pin, { x: 850, y: lerp(-300, 640, Math.min(kp, 1)), s: kp > 0.9 ? 1 + 0.08 * Math.sin(t * 6) : 1, o: t > T.austria - 0.1 ? 1 : 0 });
    set(ruta, { sx: p(t, T.pisado, 0.5, E.outCubic), o: t > T.pisado ? 1 : 0 });
    set(xx, { o: t > T.francia4 + 0.2 ? 1 : 0, s: pop(t, T.francia4 + 0.2, 0.3) });
    set(cal, { o: t > T.casaria - 0.1 ? 1 : 0, s: pop(t, T.casaria - 0.1, 0.35), r: -4 }); cal.num.textContent = String(1765 + Math.round(5 * p(t, T.cinco, 0.8)));
    set(anillos, { o: t > T.cinco + 0.9 ? 1 : 0, s: pop(t, T.cinco + 0.9, 0.4), r: Math.sin(t * 4) * 6 });
  };
});
shakeAt(T.austria + 0.25, 0.25, 12);

/* L5 · el cuento ya circulaba antes: desfile de princesas diciendo lo mismo */
headline(L(5) - 0.1, L(6) - 0.1, 'Un cuento *viejo*', { size: 92, hlT: T.circulaba });
plano(L(5) - 0.1, L(6) - 0.1, { background: '#e9c6be', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 40px, transparent 40px 80px)' }, c => {
  const cam = CAM(c);
  const tel = box(cam, 0, 0, 1080, 180, { zIndex: 4, background: `repeating-linear-gradient(90deg, ${ROJO} 0 90px, #a00d26 90px 180px)`, borderBottom: `8px solid ${INK}`, borderRadius: '0 0 60px 60px' });
  box(cam, 0, 1200, 1080, 760, { zIndex: 2, background: '#7a4a24', borderTop: `8px solid ${INK}` });
  const P = [['#c9a0dc', '#f3e6a8'], ['#9fd3c0', '#d9b07a'], ['#f2c14e', PELUCA]].map(([v, pl], i) => REINA(cam, 330 + i * 250, 640 + (i % 2) * 40, 250, { corona: true, ves: v, pel: pl, lunar: false }));
  const bubs = P.map((_, i) => BOCADILLO(cam, [40, 330, 600][i], [420, 520, 420][i], '«¡que coman…!»', { size: 40 }));
  const rollo = figura(cam, 380, 1060, 420, 200, `${FIGP('M20,20 L400,20 L400,180 L20,180 Z', '#e9d9a6', 6, .2)}<rect x="0" y="0" width="40" height="200" rx="16" fill="#c9a86a" stroke="${INK}" stroke-width="5"/><rect x="380" y="0" width="40" height="200" rx="16" fill="#c9a86a" stroke="${INK}" stroke-width="5"/><text x="210" y="115" text-anchor="middle" font-family="Rye" font-size="40" fill="${INK}">CUENTO POPULAR</text>`, '0 0 420 200', { z: 12, origin: '50% 50%' });
  P.forEach((_, i) => sp(T.otras + i * 0.3, 'pop', 0.5)); sp(T.cuento, 'paper', 0.7);
  return t => {
    zoom(cam, t, L(5), 3.5);
    P.forEach((q, i) => { const t0 = T.otras - 0.4 + i * 0.3; set(q, { o: t > t0 ? 1 : 0, x: (1 - p(t, t0, 0.4, E.outBack)) * 900, r: Math.sin(t * 3 + i) * 3 }); reina(q, t, { feliz: 1, jaw: Math.abs(Math.sin(t * 8 + i)) * 0.5, look: [-6, 0], seed: i }); popA(bubs[i], t, t0 + 0.3, { r: i % 2 ? 4 : -4 }); });
    set(rollo, { sx: Math.max(0.05, p(t, T.cuento, 0.5, E.outBack)), r: -3 }); set(tel, { y: Math.sin(t * 2) * 6 });
  };
});

/* L6 · CTA (clip reutilizado del ep55) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L7a · ¿por qué se la cuelgan a ella? el cartel con la frase le cae colgado del cuello */
headline(L(7) - 0.1, L(8) - 0.1, '¿Por qué *ella*?', { size: 96, hlT: T.cuelgan });
plano(L(7) - 0.1, T.revolucion - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 400, 1400, 20, 'rgba(255,230,0,.3)', 'rgba(0,0,0,0)', 1);
  const q = REINA(cam, 300, 470, 480, { corona: true });
  const cartel = box(cam, 300, 980, 480, 160, { zIndex: 20, background: CREMA, border: `7px solid ${INK}`, borderRadius: '14px', boxShadow: `8px 8px 0 ${INK}`, fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '46px', textAlign: 'center', lineHeight: '146px', color: INK, transformOrigin: '50% 0%' }, '«que coman pasteles»');
  const cuer = box(cam, 0, 0, 1080, 1920, { zIndex: 19 }, `<svg width="1080" height="1920"><path d="M380,985 L500,860 M700,985 L580,860" stroke="${INK}" stroke-width="7"/></svg>`);
  sp(T.cuelgan, 'whoosh', 0.7); sp(T.cuelgan + 0.5, 'thud', 0.9);
  return t => {
    zoom(cam, t, L(7), 3); set(ry, { r: t * 6 });
    const k = p(t, T.cuelgan, 0.5, E.outBack); set(cartel, { y: (1 - k) * -900, r: Math.sin((t - T.cuelgan) * 6) * 8 * (1 - p(t, T.cuelgan + 0.5, 1.2)), o: t > T.cuelgan ? 1 : 0 }); set(cuer, { o: k > 0.9 ? 1 : 0 });
    reina(q, t, { look: [0, 8], feliz: t > T.cuelgan + 0.5 ? -1 : 0.6, ceja: t > T.cuelgan + 0.5 ? 14 : 0, jaw: t > T.cuelgan + 0.5 ? 0.6 : 0 }); set(q, { x: t > T.cuelgan + 0.5 ? Math.sin(t * 40) * 3 : 0 });
  };
});
shakeAt(T.cuelgan + 0.5, 0.25, 12);
/* L7b · la Revolución: multitud con banderas; «la más odiada» → le pintan bigote y cuernos: VILLANA */
plano(T.revolucion - 0.1, L(8) - 0.1, { background: '#d9d2c4' }, c => {
  const cam = CAM(c);
  PARIS(cam, 820, '#8a93a8');
  const bands = [0, 1, 2].map(i => box(cam, 120 + i * 340, 480, 200, 130, { zIndex: 5, transformOrigin: '0% 50%', background: `linear-gradient(90deg, #2b4a8c 0 33%, #fff 33% 66%, ${ROJO} 66%)`, border: `5px solid ${INK}` }));
  [0, 1, 2].forEach(i => box(cam, 112 + i * 340, 470, 12, 700, { zIndex: 4, background: '#6b4a2a', border: `3px solid ${INK}` }));
  const q = REINA(cam, 330, 720, 420, { corona: true });
  const gente = [0, 1, 2, 3, 4].map(i => ciudadano(cam, -40 + i * 230, 1100, 260, i + 3));
  const odi = stamp(cam, 300, 560, 'LA MÁS ODIADA', { size: 70, z: 40 });
  const vil = stamp(cam, 320, 1000, 'VILLANA', { size: 110, z: 45, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  const pin = PLUMA(cam, 600, 780);
  sp(T.revolucion, 'burst', 0.8); sp(T.odiada, 'stamp', 0.9); sp(T.villana - 0.2, 'scratch', 0.8); sp(T.villana + 0.3, 'stamp', 1);
  return t => {
    zoom(cam, t, T.revolucion, 4);
    bands.forEach((b, i) => set(b, { sx: 0.85 + 0.15 * Math.sin(t * 6 + i), r: Math.sin(t * 4 + i) * 4 }));
    gente.forEach((g, i) => { set(g.d, { y: -Math.abs(Math.sin(t * 7 + i)) * 26 }); face(g, t, { look: [0, -8], bL: 14, bR: 14, jaw: Math.abs(Math.sin(t * 9 + i)) * 0.7, seed: i }); });
    const vk = t > T.villana - 0.2; q.querySelector('.villa').style.opacity = vk ? 1 : 0;
    reina(q, t, { feliz: vk ? 1 : -1, ceja: vk ? -6 : 14, look: vk ? [0, 0] : [0, 6], jaw: vk ? 0.3 : 0.5 }); set(q, { x: Math.sin(t * 30) * (t > T.odiada && !vk ? 3 : 0) });
    set(pin, { o: t > T.villana - 0.4 && t < T.villana + 0.2 ? 1 : 0, x: Math.sin(t * 30) * 40, r: -30 });
    stampA(odi, t, T.odiada, -6); stampA(vil, t, T.villana + 0.3, -10);
  };
});
shakeAt(T.villana + 0.3, 0.35, 16);

/* L8 · panfletos, caricaturas y rumores vuelan por París; «la frase le cayó a ella» (le cae encima) */
headline(L(8) - 0.1, L(9) - 0.1, 'Todo *valía*', { size: 96, hlT: T.todo });
plano(L(8) - 0.1, L(9) - 0.1, { background: '#bcc6da' }, c => {
  const cam = CAM(c);
  const luna = box(cam, 800, 380, 160, 160, { zIndex: 2, background: '#f4efe2', border: `6px solid ${INK}`, borderRadius: '50%' });
  PARIS(cam, 980, '#56658a');
  box(cam, 0, 1390, 1080, 600, { zIndex: 3, background: '#3e4a66' });
  const pf = [...Array(9)].map((_, i) => PANFLETO(cam, i));
  const rum = [0, 1, 2].map(i => BOCADILLO(cam, 0, 0, 'psss… psss…', { size: 38 }));
  const q = REINA(cam, 640, 860, 300, { corona: true });
  const fr = box(cam, 520, 0, 540, 110, { zIndex: 35, background: CREMA, border: `6px solid ${INK}`, borderRadius: '14px', boxShadow: `8px 8px 0 ${INK}`, fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '42px', textAlign: 'center', lineHeight: '98px', color: INK }, '«que coman pasteles»');
  const tP = [T.panfletos, T.caricaturas, T.rumores];
  pf.forEach((_, i) => sp(tP[i % 3] + Math.floor(i / 3) * 0.15, 'paper', 0.45)); sp(T.rumores, 'msg_in', 0.6); sp(T.cayo + 0.3, 'thud', 1.1); sp(T.cayo + 0.5, 'boing', 0.7);
  return t => {
    zoom(cam, t, L(8), 5);
    pf.forEach((e, i) => { const t0 = tP[i % 3] - 0.2 + Math.floor(i / 3) * 0.15, k = (t - t0) * 0.45; set(e, { o: t > t0 ? 1 : 0, x: -200 + ((k * 900 + i * 130) % 1400), y: 420 + (i % 3) * 170 + Math.sin(t * 3 + i) * 50, r: t * 120 + i * 40 }); });
    rum.forEach((b, i) => { const t0 = T.rumores + i * 0.25; set(b, { o: t > t0 && t < T.cayo ? 1 : 0, x: 60 + i * 230, y: 860 + Math.sin(t * 5 + i) * 30 - i * 90, s: pop(t, t0, 0.3) }); });
    const kf = p(t, T.cayo, 0.32, E.inCubic); set(fr, { y: lerp(-200, 790, kf), r: kf >= 1 ? Math.sin((t - T.cayo) * 10) * 6 * (1 - p(t, T.cayo + 0.4, 1)) : 8 });
    const hit = t > T.cayo + 0.3; reina(q, t, { closed: hit, feliz: hit ? -1 : 0.5, ceja: hit ? 14 : 0, look: [-6, -6] }); set(q, { sy: hit ? 1 - 0.1 * (1 - p(t, T.cayo + 0.3, 0.4)) : 1, r: hit ? Math.sin(t * 10) * 4 : 0 });
    set(luna, { s: 1 + 0.03 * Math.sin(t * 2) });
  };
});
shakeAt(T.cayo + 0.3, 0.3, 16);

/* L9 · lo irónico: en sus cartas se preocupa por el pueblo hambriento (escribe, llora, el sobre vuela) */
headline(L(9) - 0.1, L(10) - 0.1, 'Lo *irónico*', { size: 96, hlT: T.ironico });
plano(L(9) - 0.1, L(10) - 0.1, { background: '#e9d7b0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.10) 0 4px, transparent 4px 100px)' }, c => {
  const cam = CAM(c);
  box(cam, 0, 1100, 1080, 860, { zIndex: 5, background: '#7a4a24', borderTop: `8px solid ${INK}` });
  const q = REINA(cam, 60, 440, 420, { corona: true });
  const carta = box(cam, 480, 640, 520, 560, { zIndex: 9, background: CREMA, border: `6px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}`, transform: 'rotate(4deg)' });
  el('div', carta, { left: '30px', top: '30px', width: '460px', fontFamily: 'SpecialElite', fontSize: '38px', lineHeight: 1.35, color: INK }, 'Querida madre:<br>me duele ver<br>al pueblo<br>pasar hambre…');
  const cor = [0, 1, 2].map(i => box(cam, 0, 0, 60, 54, { zIndex: 12 }, `<svg viewBox="0 0 60 54" width="60" height="54"><path d="M30,52 C-10,24 4,-6 30,14 C56,-6 70,24 30,52 Z" fill="#e87aa0" stroke="${INK}" stroke-width="4"/></svg>`));
  const pl = PLUMA(cam, 760, 820);
  const lg = [lagrima(cam, 200, 690), lagrima(cam, 330, 690)];
  const sob = box(cam, 600, 1220, 260, 170, { zIndex: 14 }, `<svg viewBox="0 0 260 170" width="260" height="170"><rect x="5" y="5" width="250" height="160" fill="#f4efe2" stroke="${INK}" stroke-width="6"/><path d="M5,5 L130,100 L255,5" stroke="${INK}" stroke-width="6" fill="none"/><circle cx="130" cy="100" r="26" fill="${ROJO}" stroke="${INK}" stroke-width="5"/></svg>`);
  sp(T.cartas, 'paper', 0.7); sp(T.hambriento, 'sad', 0.7); sp(T.hambriento + 0.8, 'whoosh', 0.6);
  return t => {
    zoom(cam, t, L(9), 3.5);
    set(carta, { s: pop(t, T.cartas - 0.1, 0.4), r: 4 }); set(pl, { o: t > T.cartas ? 1 : 0, x: Math.sin(t * 7) * 60, y: Math.sin(t * 3) * 30, r: Math.sin(t * 14) * 8 });
    reina(q, t, { look: [10, 6], feliz: -1, ceja: 12, closed: t > T.hambriento && t < T.hambriento + 0.4, seed: 0.2 });
    lg.forEach((l, i) => set(l, { o: t > T.hambriento - 0.2 ? 1 : 0, y: ((t * 150 + i * 60) % 140) }));
    cor.forEach((h, i) => { const k = ((t - T.cartas) * 0.8 + i * 0.33) % 1; set(h, { o: t > T.cartas ? 1 - k : 0, x: 600 + i * 120, y: 640 - k * 220, s: 0.8 + 0.4 * k }); });
    const ks = p(t, T.hambriento + 0.8, 0.6, E.inCubic); set(sob, { o: t > T.hambriento + 0.6 ? 1 : 0, x: ks * 800, y: -ks * 500, r: ks * 30 });
  };
});

/* L10 · encima, mala traducción: diccionario «pasteles ≠ brioche»; el pastel tachado, el brioche coronado */
headline(L(10) - 0.1, L(11) - 0.1, 'Mala *traducción*', { size: 92, hlT: T.mala });
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 400, 1400, 20, 'rgba(255,230,0,.3)', 'rgba(0,0,0,0)', 1);
  const dic = box(cam, 140, 380, 800, 220, { zIndex: 6, background: CREMA, border: `7px solid ${INK}`, borderRadius: '16px', boxShadow: `10px 10px 0 ${INK}` });
  el('div', dic, { left: '30px', top: '20px', fontFamily: 'Rye', fontSize: '50px', color: INK }, 'BRIOCHE <span style="font-family:Playfair;font-style:italic;font-size:36px">(fr.)</span>');
  const def = el('div', dic, { left: '30px', top: '100px', fontFamily: 'SpecialElite', fontSize: '44px', color: INK }, '= pan dulce, no pastel');
  const pa = PASTEL(cam, 120, 760, 340), br = BRIOCHE(cam, 620, 740, 340);
  const ne = texto(cam, 820, '≠', { size: 220, x: 440, w: 200, color: ROJO, z: 15, shadow: `5px 5px 0 ${INK}` });
  const xx = box(cam, 130, 700, 330, 330, { zIndex: 20 }, XSVG);
  const cor = box(cam, 700, 610, 180, 110, { zIndex: 16 }, `<svg viewBox="0 0 180 110" width="180" height="110"><path d="M10,100 L20,20 L60,60 L90,10 L120,60 L160,20 L170,100 Z" fill="${ORO}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/></svg>`);
  sp(T.pasteles10, 'pop', 0.6); sp(T.mala, 'glitch', 0.6); sp(T.original, 'paper', 0.7); sp(T.brioche10, 'pop2', 0.8); sp(T.dulce, 'tada', 0.7); sp(T.mala + 0.4, 'stamp', 0.9);
  return t => {
    zoom(cam, t, L(10), 5); set(ry, { r: t * 6 });
    set(pa, { o: t > T.pasteles10 - 0.2 ? 1 : 0, s: pop(t, T.pasteles10 - 0.2, 0.4), r: Math.sin(t * 4) * 3 }); pastel(pa, t, { feliz: t > T.mala ? -1 : 1, ceja: t > T.mala ? 12 : 0, jaw: 0.3, look: [6, 0] });
    set(xx, { o: t > T.mala + 0.4 ? 1 : 0, s: pop(t, T.mala + 0.4, 0.3) });
    set(dic, { o: t > T.original - 0.1 ? 1 : 0, y: (1 - p(t, T.original - 0.1, 0.4, E.outBack)) * -600 }); set(def, { o: t > T.dulce - 0.2 ? 1 : 0 });
    set(br, { o: t > T.brioche10 - 0.1 ? 1 : 0, s: pop(t, T.brioche10 - 0.1, 0.4), y: -Math.abs(Math.sin(t * 6)) * 18 }); brioche(br, t, { feliz: 1, jaw: talkW(t, 'VECINO') * 0.5, look: [-6, -4], ceja: 8 });
    set(ne, { o: t > T.brioche10 ? 1 : 0, s: pop(t, T.brioche10, 0.3) });
    set(cor, { o: t > T.dulce ? 1 : 0, y: (1 - p(t, T.dulce, 0.4, E.outBack)) * -400, r: Math.sin(t * 3) * 6 });
  };
});
shakeAt(T.mala + 0.4, 0.25, 12);

/* L11 · OJO: Rousseau no dice quién era la princesa → silueta con antifaz y «?» */
plano(L(11) - 0.1, L(12) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const lb = LIBRO(c, 190, 520, 700, 'CONFESIONES', 'Rousseau'); escribe(lb, 99, 0, 1);
  const pr = REINA(c, 640, 560, 220, { corona: true, ves: '#c9a0dc', pel: '#f3e6a8', lunar: false }); pr.style.filter = 'brightness(0)';
  const qs = [0, 1, 2].map(i => texto(c, 520 + i * 90, '?', { size: 110, color: ROJO, x: 860, w: 120, z: 20 }));
  aparece(chip(c, 360, 1060, '¿quién era?', { size: 60, bg: YEL, color: INK }), T.quien);
  aparece(chip(c, 440, 1190, '¿inventada?', { size: 60, bg: PINK }), T.inventada);
  return t => { set(lb, { r: -2 + Math.sin(t * 2) * 1.5 }); set(pr, { y: -Math.abs(Math.sin(t * 3)) * 14 }); qs.forEach((q, i) => set(q, { o: t > T.quien + i * 0.15 ? 1 : 0, r: Math.sin(t * 5 + i) * 12, y: Math.sin(t * 4 + i) * 10 })); };
});

/* L12 · O sea: la frase más famosa… se escribió cuando ella era una niña */
colorHit(L(12) - 0.1, L(13) - 0.1, YEL, c => {
  const a = texto(c, 280, 'La frase más famosa…', { size: 100 });
  const b = texto(c, 410, '…cuando era una <span style="color:' + ROJO + '">niña</span>', { size: 92, italic: true });
  const q = REINA(c, 300, 620, 300, { corona: true }), ni = NINA(c, 640, 760, 230);
  const tch = tachon(c, 340, 1010, 300);
  return t => {
    set(a, { s: pop(t, L(12), 0.35) }); set(b, { o: t > T.nina12 - 0.3 ? 1 : 0, s: pop(t, T.nina12 - 0.3, 0.35) });
    reina(q, t, { feliz: 1, look: [6, 0], jaw: 0.2 }); set(q, { r: Math.sin(t * 3) * 3 });
    set(ni, { o: t > T.nina12 - 0.3 ? 1 : 0, s: pop(t, T.nina12 - 0.3, 0.4), y: -Math.abs(Math.sin(t * 5)) * 14 }); nina(ni, t, { feliz: 1, jaw: 0.4, look: [-6, -2], ceja: 8 });
    set(tch, { o: 0 });
  };
});
sfx('swoosh_up', L(12), 0.6); shakeAt(L(12) + 0.05, 0.3, 14); sp(T.nina12 - 0.3, 'stamp', 0.8);

/* L13 · pregunta final */
preguntaFinal('¿Qué frase famosa crees', 'que tampoco dijo nadie?', { size: 82, draw: c => [['«Elemental, querido…»', YEL], ['«Solo sé que…»', PINK], ['¿y tú?', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 330 + i * 40, 620 + i * 160, s, { size: 58, bg: col, color: INK }), L(13) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L14 · cierre (clip reutilizado del ep55) */
cierre(70, 'María Antonieta', ['FRASE', 'falsa']);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(13) - 0.15]],
  vecino: { risa: [[T.villana + 0.3, T.villana + 1.2], [T.cayo + 0.3, T.cayo + 1.2]], sorpresa: [[T.nueve, T.nueve + 0.8], [T.ironico, T.ironico + 0.8], [T.mala, T.mala + 0.7]], golpes: [T.filosofo + 0.3, T.austria + 0.25, T.odiada, T.villana + 0.3, T.cayo + 0.3, T.mala + 0.4] },
});
