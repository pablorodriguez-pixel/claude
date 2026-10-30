/* Ep. 309 · «Cuenta las fotos» — el experimento del periódico de Richard Wiseman (Univ. de Hertfordshire).
   Fuente: Wiseman, «The Luck Factor», Skeptical Inquirer 27(3), 2003. 400 personas, 10 años. Contar las fotos de un periódico:
   gafados ≈ 2 min, con suerte, segundos. En la pág. 2, media hoja con letras de más de 2 pulgadas (5 cm): «Stop counting — There are
   43 photographs in this newspaper». A mitad: «Stop counting, tell the experimenter you have seen this and win £250». Los gafados, más tensos.
   GANCHO = el espectador JUEGA: periódico EL DIARIO, pág. 1 → pág. 2 con el mensaje gigante a la vista, 3-2-1 y una mano que cuenta. */
Story.prepara();
const T = {
  cuenta0: Q('cuenta las fotos'), tienes: Q('tienes'), uno: Q('uno'), dos: Q('dos'), tres1: Q('tres'), cuantas: Q('cuántas'),
  psico: Q('psicólogo', 3), richard: Q('richard'), diez: Q('diez años'), c400: Q('cuatrocientas'), unas: Q('unas que'), suerte3: Q('con suerte'), otras: Q('y otras'), gafadas: Q('gafadas'),
  todos: Q('a todos'), mismo: Q('lo mismo'), cuenta4: Q('cuenta las fotos'),
  gaf5: Q('los gafados'), min5: Q('dos minutos'), suerte5: Q('los de la suerte'), seg5: Q('unos segundos'),
  porque: Q('por qué'), segunda: Q('segunda página'), mensaje: Q('mensaje'), media: Q('media hoja'), letras: Q('letras'), cinco: Q('cinco centímetros'),
  deja6: Q('deja de contar'), hay: Q('hay'), c43: Q('cuarenta y tres'), fotos6: Q('fotos'),
  vuelve: Q('vuelve'), antes: Q('antes'), estaba: Q('estaba ahí'),
  mitad: Q('mitad'), otro: Q('otro'), deja8: Q('deja de contar'), diselo: Q('díselo'), ganas: Q('ganas'), d250: Q('doscientos cincuenta'),
  gaf8: Q('los gafados'), tampoco: Q('tampoco'), ocupados: Q('ocupados'), contando: Q('contando'),
  ojo: Q('ojo'), wise9: Q('wiseman'), solian: Q('solían'), tensos: Q('tensos'), cuando: Q('y cuando'), nervios: Q('nervios'), solo: Q('solo ves'), buscando: Q('buscando'),
  osea: Q('o sea'), nosiempre: Q('no siempre'), cielo: Q('cielo'), aveces: Q('a veces'), delante: Q('delante'), ocupado: Q('ocupado'), verla: Q('verla'),
};
const VERDE = '#2e9e6b', TREB = '#3fa34d', AZUL = '#2b6fd6', GRIS = '#7d8290', PIEL = '#e7b48c', CRE = '#fbf6ea', PAP = '#f1e7cf';
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const vis = (e, t, t0, t1 = 1e9, o = {}) => set(e, Object.assign({ o: t > t0 && t < t1 ? 1 : 0, s: pop(t, t0, 0.35) }, o));
const golpeS = (e, t, t0, r = -5) => set(e, { o: t > t0 ? 1 : 0, s: t < t0 ? 0 : lerp(2, 1, E.outCubic(clamp((t - t0) / 0.22))), r });
const camTo = (cam, cx, cy, s) => { cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 820 - cy * s, s }); };
const ease3 = k => k * k * (3 - 2 * k);
const TIT = (c, y, html, size, z = 40, col = '#fff') => el('div', c, { left: '20px', top: px(y), width: '1040px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: px(size), lineHeight: 1, color: col, textShadow: OUT, zIndex: z, whiteSpace: 'nowrap', transformOrigin: '50% 50%' }, html);
const SELLO = (c, x, y, w, txt, col, z = 60, fs = 92) => box(c, x, y, w, fs * 1.6, { zIndex: z, border: `12px solid ${col}`, color: col, borderRadius: '20px', fontFamily: 'Rye', fontSize: `${fs}px`, lineHeight: `${f1(fs * 1.38)}px`, textAlign: 'center', background: 'rgba(255,255,255,.88)', transformOrigin: '50% 50%', boxSizing: 'border-box', whiteSpace: 'nowrap' }, txt);

/* ---------- cronómetro (de ep308) ---------- */
const pt = (a, r) => [Math.sin(a * Math.PI / 180) * r, -Math.cos(a * Math.PI / 180) * r];
const CRONO = (c, w, z = 20) => { let tk = ''; for (let i = 0; i < 12; i++) { const [x0, y0] = pt(i * 30, 100), [x1, y1] = pt(i * 30, i % 3 ? 90 : 80); tk += `<path d="M${f1(x0)},${f1(y0)} L${f1(x1)},${f1(y1)}" stroke="${INK}" stroke-width="${i % 3 ? 4 : 8}" stroke-linecap="round"/>`; }
  const d = box(c, 0, 0, w, w * 1.1, { zIndex: z, transformOrigin: '50% 55%' }, `<svg viewBox="-130 -160 260 286" width="${w}" height="${f1(w * 1.1)}" style="overflow:visible">
   <path d="M70,-94 l24,-24" stroke="${INK}" stroke-width="18" stroke-linecap="round"/><rect x="-24" y="-156" width="48" height="32" rx="9" fill="${GOLD}" stroke="${INK}" stroke-width="7"/><rect x="-11" y="-128" width="22" height="20" fill="${INK}"/>
   <circle cx="9" cy="11" r="120" fill="${SH}"/><circle r="120" fill="#2a2630" stroke="${INK}" stroke-width="8"/><circle class="cara" r="104" fill="${CRE}"/>${tk}
   <circle class="rg" r="112" fill="none" stroke="${YEL}" stroke-width="18" pathLength="1" stroke-dasharray="1 1" transform="rotate(-90)" opacity="0"/>
   <g class="ag"><path d="M0,16 L0,-88" stroke="${RED}" stroke-width="9" stroke-linecap="round"/></g><circle r="13" fill="${INK}"/>
   <text class="num" x="0" y="40" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="110" fill="${INK}" opacity="0"></text></svg>`);
  d.ag = d.querySelector('.ag'); d.rg = d.querySelector('.rg'); d.num = d.querySelector('.num'); d.cara = d.querySelector('.cara'); return d; };
const aguja = (cr, a) => cr.ag.setAttribute('transform', `rotate(${f1(a)})`);
const numC = (cr, txt, fs = 110) => { cr.num.textContent = txt; cr.num.setAttribute('opacity', txt ? 1 : 0); cr.num.setAttribute('font-size', fs); cr.ag.setAttribute('opacity', txt ? 0 : 1); };

/* ---------- el periódico EL DIARIO (860×940; interior 844×924) ---------- */
const SEP = ['#b9a27c', '#a58e6a', '#c8b48f', '#9c8862'];
const fotoSvg = (k, w, h) => { const ty = k % 4; let s = `<rect width="${w}" height="${h}" fill="${SEP[(k * 3 + 1) % 4]}"/>`;
  if (ty === 0) s += `<circle cx="${w / 2}" cy="${h * 0.42}" r="${h * 0.2}" fill="#5c4a35"/><path d="M${w * 0.22},${h} Q${w / 2},${h * 0.5} ${w * 0.78},${h} Z" fill="#5c4a35"/>`;
  else if (ty === 1) s += `<circle cx="${w * 0.76}" cy="${h * 0.3}" r="${h * 0.12}" fill="#efe4c8"/><path d="M0,${h} L${w * 0.3},${h * 0.42} L${w * 0.55},${h * 0.8} L${w * 0.75},${h * 0.52} L${w},${h} Z" fill="#6d5a40"/>`;
  else if (ty === 2) s += `<rect x="${w * 0.14}" y="${h * 0.36}" width="${w * 0.3}" height="${h * 0.64}" fill="#6d5a40"/><rect x="${w * 0.5}" y="${h * 0.18}" width="${w * 0.34}" height="${h * 0.82}" fill="#5c4a35"/><path d="M${w * 0.2},${h * 0.52} h${w * 0.18} M${w * 0.56},${h * 0.36} h${w * 0.22} M${w * 0.56},${h * 0.58} h${w * 0.22}" stroke="#efe4c8" stroke-width="6"/>`;
  else s += `<circle cx="${w * 0.35}" cy="${h * 0.42}" r="${h * 0.15}" fill="#5c4a35"/><circle cx="${w * 0.65}" cy="${h * 0.42}" r="${h * 0.15}" fill="#5c4a35"/><path d="M${w * 0.08},${h} Q${w * 0.35},${h * 0.55} ${w * 0.5},${h} Q${w * 0.65},${h * 0.55} ${w * 0.92},${h} Z" fill="#5c4a35"/>`;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block">${s}<rect x="2" y="2" width="${w - 4}" height="${h - 4}" fill="none" stroke="${INK}" stroke-width="4"/></svg>`; };
const LINEAS = 'repeating-linear-gradient(180deg, rgba(43,33,24,.34) 0 6px, transparent 6px 15px)';
function DIARIO(c, x, y, page, z = 10, num = 2) {
  const d = box(c, x, y, 860, 940, { zIndex: z, background: PAP, border: `8px solid ${INK}`, boxShadow: `16px 18px 0 ${SH}`, boxSizing: 'border-box', transformOrigin: '50% 50%', overflow: 'hidden' });
  const fotos = [];
  const F = (fx, fy, fw, fh, k) => { box(d, fx, fy, fw, fh, {}, fotoSvg(k, fw, fh)); fotos.push([fx + fw / 2, fy + fh / 2]); };
  const TX = (tx, ty, tw, th) => box(d, tx, ty, tw, th, { backgroundImage: LINEAS });
  const grid = (y0, skip) => { for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) { const i = r * 4 + k, fx = 16 + k * 206, fy = y0 + r * 176; if (skip.includes(i)) TX(fx, fy + 6, 194, 150); else { F(fx, fy, 194, 128, i + num); TX(fx, fy + 138, 194, 22); } } };
  const cab = (n) => { el('div', d, { left: '16px', top: '8px', fontFamily: 'Rye', fontSize: '46px', lineHeight: '56px', color: INK }, 'EL DIARIO');
    el('div', d, { right: '18px', top: '20px', fontFamily: 'SpecialElite', fontSize: '28px', color: INK }, `PÁGINA ${n}`); box(d, 0, 66, 844, 8, { borderTop: `3px solid ${INK}`, borderBottom: `3px solid ${INK}`, boxSizing: 'border-box' }); };
  if (page === 1) {
    el('div', d, { left: '0', top: '6px', width: '844px', textAlign: 'center', fontFamily: 'Rye', fontSize: '104px', lineHeight: '112px', color: INK }, 'EL DIARIO');
    el('div', d, { left: '16px', top: '122px', width: '812px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '24px', lineHeight: '30px', color: INK, borderTop: `4px double ${INK}`, borderBottom: `4px double ${INK}` }, 'MADRID · AÑO XLIII · NÚM. 12.408 · 10 CÉNTIMOS');
    el('div', d, { left: '0', top: '166px', width: '844px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '36px', lineHeight: '40px', color: INK }, 'GRAN FIESTA EN LA PLAZA MAYOR');
    grid(214, [1, 6, 11, 12]);
  } else if (page === 2) {
    cab(2);
    for (let k = 0; k < 4; k++) { F(16 + k * 206, 86, 194, 108, k + 5); TX(16 + k * 206, 200, 194, 22); }
    d.msg = box(d, 16, 236, 812, 408, { border: `6px double ${INK}`, boxSizing: 'border-box', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, color: INK, lineHeight: 1 },
      `<div style="font-size:64px;margin-top:22px;letter-spacing:-1px"><span class="m0" style="padding:0 8px;border-radius:8px">DEJA DE CONTAR:</span></div>
       <div style="font-size:150px;margin-top:6px;letter-spacing:-2px"><span class="m1" style="padding:0 6px;border-radius:10px">HAY</span> <span class="m2" style="padding:0 6px;border-radius:10px">43</span></div>
       <div style="font-size:140px;margin-top:-6px;letter-spacing:-2px"><span class="m3" style="padding:0 8px;border-radius:10px">FOTOS</span></div>`);
    for (let k = 0; k < 4; k++) { F(16 + k * 206, 662, 194, 104, k + 9); TX(16 + k * 206, 772, 194, 18); F(16 + k * 206, 800, 194, 104, k + 14); }
    d.ms = [0, 1, 2, 3].map(i => d.msg.querySelector('.m' + i));
  } else if (page === 6) {
    cab(6);
    for (let k = 0; k < 4; k++) { F(16 + k * 206, 86, 194, 108, k + 2); TX(16 + k * 206, 200, 194, 22); }
    d.msg = box(d, 16, 236, 812, 420, { border: `6px double ${INK}`, boxSizing: 'border-box', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, color: INK, lineHeight: 1.05, fontSize: '66px', paddingTop: '30px' },
      `<span class="n0" style="padding:0 8px;border-radius:8px">DEJA DE CONTAR,</span><br><span class="n1" style="padding:0 8px;border-radius:8px">DÍSELO AL<br>INVESTIGADOR</span><br><span class="n2" style="font-size:92px;padding:0 8px;border-radius:8px">Y GANAS 250</span>`);
    for (let k = 0; k < 4; k++) { F(16 + k * 206, 672, 194, 110, k + 7); TX(16 + k * 206, 792, 194, 18); TX(16 + k * 206, 822, 194, 80); }
    d.ms = [0, 1, 2].map(i => d.msg.querySelector('.n' + i));
  } else { cab(num); grid(86, [2, 5, 15]); TX(16, 790, 812, 120); }
  d.fotos = fotos; return d;
}
const luz = (sp, k, col = '255,230,0') => { sp.style.background = k > 0.01 ? `rgba(${col},${f1(k * 0.95)})` : 'transparent'; };
const TICK = (d, f, n, col = YEL) => box(d, f[0] - 34, f[1] - 34, 68, 68, { zIndex: 20, borderRadius: '50%', background: col, border: `5px solid ${INK}`, boxShadow: `4px 4px 0 ${INK}`, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '36px', lineHeight: '56px', textAlign: 'center', color: INK, boxSizing: 'border-box', transformOrigin: '50% 50%' }, String(n));
const MANO = (c, z = 40) => box(c, 0, 0, 150, 150, { zIndex: z }, `<svg viewBox="-60 -70 120 120" width="150" height="150" style="overflow:visible">${gloveHand(0, 0, -25, 1.1)}</svg>`);
/* periódico pequeño en las manos (vb 0 0 300 230) */
const MINI = (c, w, z = 14) => figura(c, 0, 0, w, w * 230 / 300, `<rect x="4" y="4" width="292" height="222" rx="6" fill="${PAP}" stroke="${INK}" stroke-width="7"/><text x="150" y="44" text-anchor="middle" font-family="Rye" font-size="34" fill="${INK}">EL DIARIO</text><path d="M16,56 H284" stroke="${INK}" stroke-width="4"/>
  ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${18 + (i % 3) * 92}" y="${66 + Math.floor(i / 3) * 78}" width="80" height="54" fill="${SEP[i % 4]}" stroke="${INK}" stroke-width="3"/><path d="M${18 + (i % 3) * 92},${128 + Math.floor(i / 3) * 78} h80" stroke="rgba(43,33,24,.4)" stroke-width="5"/>`).join('')}`, '0 0 300 230', { z, origin: '50% 50%' });

/* ---------- figuras: trébol, gato negro, nube con lluvia, saco de dinero, regla, caritas ---------- */
const HOJA = 'M0,0 C-10,-18 -50,-28 -44,-60 C-38,-80 -10,-80 0,-58 C10,-80 38,-80 44,-60 C50,-28 10,-18 0,0 Z';
const TREBOL = (c, w, z = 12) => figura(c, 0, 0, w, w, `<path d="M0,6 Q22,56 48,92" stroke="${INK}" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M0,6 Q22,56 48,92" stroke="${TREB}" stroke-width="9" fill="none" stroke-linecap="round"/>
  ${[0, 90, 180, 270].map(a => `<path d="${HOJA}" transform="rotate(${a})" fill="${TREB}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M0,-8 L0,-50" transform="rotate(${a})" stroke="#8fd39a" stroke-width="5" stroke-linecap="round"/>`).join('')}<circle r="9" fill="#2c7a37" stroke="${INK}" stroke-width="4"/>`, '-100 -100 200 200', { z, origin: '50% 50%' });
const GATO = (c, w, z = 12) => { const d = figura(c, 0, 0, w, w * 1.1, `<path class="cola" d="M150,200 C205,190 205,120 172,108" stroke="#1d1a22" stroke-width="16" fill="none" stroke-linecap="round"/>
  <ellipse cx="100" cy="162" rx="62" ry="54" fill="#1d1a22" stroke="${INK}" stroke-width="6"/><path d="M52,72 L58,16 L88,48 Z M148,72 L142,16 L112,48 Z" fill="#1d1a22" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  <circle cx="100" cy="84" r="50" fill="#1d1a22" stroke="${INK}" stroke-width="6"/><ellipse cx="80" cy="80" rx="14" ry="16" fill="#f2d33a"/><ellipse cx="120" cy="80" rx="14" ry="16" fill="#f2d33a"/>
  <g class="pu"><ellipse cx="80" cy="80" rx="4" ry="13" fill="#111"/><ellipse cx="120" cy="80" rx="4" ry="13" fill="#111"/></g><path d="M94,100 L106,100 L100,107 Z" fill="#e88"/>
  <path d="M62,104 H28 M62,110 L30,120 M138,104 H172 M138,110 L170,120" stroke="#ccc" stroke-width="3"/>`, '0 0 210 220', { z, origin: '50% 100%' }); d.pu = d.querySelector('.pu'); return d; };
const NUBE = (c, w, z = 12) => { const d = figura(c, 0, 0, w, w * 200 / 260, `<g class="ll"><path d="M60,130 l-10,34 M100,150 l-10,34 M140,130 l-10,34 M180,150 l-10,34 M215,130 l-10,34" stroke="#4f97d6" stroke-width="9" stroke-linecap="round"/></g>
  <path d="M50,124 C8,124 8,72 50,68 C52,30 100,20 122,46 C142,10 204,20 202,62 C244,62 252,124 210,124 Z" fill="#8a8f99" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
  <path d="M90,96 q8,-8 16,0 M150,96 q8,-8 16,0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M112,112 q16,-10 32,0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>`, '0 0 260 200', { z, origin: '50% 50%' }); d.ll = d.querySelector('.ll'); return d; };
const lluvia = (n, t) => n.ll.setAttribute('transform', `translate(${f1(-((t * 90) % 30) / 3)} ${f1((t * 120) % 34 - 10)})`);
const SACO = (c, w, z = 30) => figura(c, 0, 0, w, w * 1.1, `<path d="M100,56 C22,74 10,212 100,212 C190,212 178,74 100,56 Z" fill="#d9b25a" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
  <path d="M66,52 C48,18 152,18 134,52 Z" fill="#c9a24a" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><path d="M64,56 H136" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
  <text x="100" y="168" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="56" fill="${INK}">250</text>`, '0 0 200 220', { z, origin: '50% 100%' });
const REGLA = (c, h, z = 30) => { let tk = ''; for (let i = 0; i <= 10; i++) tk += `<path d="M0,${f1(i * h / 10)} H${i % 5 ? 18 : 32}" stroke="${INK}" stroke-width="${i % 5 ? 3 : 5}"/>`;
  return box(c, 0, 0, 56, h, { zIndex: z, transformOrigin: '50% 0%' }, `<svg width="56" height="${h}" style="overflow:visible"><rect x="0" y="-6" width="56" height="${h + 12}" rx="6" fill="${YEL}" stroke="${INK}" stroke-width="5"/>${tk}</svg>`); };
const SKIN = ['#f2c9a0', PIEL, '#c98d63', '#8d5a3b'], PELO = ['#3a2a1e', '#6b4a2a', '#111', '#c46a2a', '#9a9a9a'], COLS = ['#F2983E', AZUL, PINK, VERDE, '#8a4fd0', '#d8402f'];
const CARITA = (c, i, w = 120, z = 14) => { const d = box(c, 0, 0, w, w * 1.25, { zIndex: z, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 120 150" width="${w}" height="${f1(w * 1.25)}" style="overflow:visible">
  <path d="M14,150 Q14,98 60,98 Q106,98 106,150 Z" fill="${COLS[i % COLS.length]}" stroke="${INK}" stroke-width="6"/><circle cx="60" cy="60" r="38" fill="${SKIN[i % 4]}" stroke="${INK}" stroke-width="6"/>
  <path d="M24,52 Q26,18 60,20 Q94,18 96,52 Q80,34 60,36 Q40,34 24,52 Z" fill="${PELO[i % 5]}" stroke="${INK}" stroke-width="4"/><circle cx="46" cy="62" r="5" fill="${INK}"/><circle cx="74" cy="62" r="5" fill="${INK}"/>
  <path class="m" d="M48,80 Q60,88 72,80" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`); d.m = d.querySelector('.m'); return d; };
const GAFAS = `<g><circle cx="114" cy="168" r="28" fill="rgba(255,255,255,.18)" stroke="${INK}" stroke-width="8"/><circle cx="186" cy="168" r="28" fill="rgba(255,255,255,.18)" stroke="${INK}" stroke-width="8"/><path d="M142,166 Q150,158 158,166 M86,164 L58,154 M214,164 L242,154" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/></g>`;
const CORBATA = `<path d="M140,262 L160,262 L168,300 L150,360 L132,300 Z" fill="#8a1c2b" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M110,262 L150,300 L190,262" stroke="#fff" stroke-width="9" fill="none"/>`;
const addSvg = (f, html) => f.querySelector('svg').insertAdjacentHTML('beforeend', html);
const PROFE = (c, x, y, w, z = 8) => { const f = PERS(c, x, y, w, { ropa: '#7b6a4c', pelo: 'corto', pcol: '#8a7a6a', z }); addSvg(f, CORBATA + GAFAS); return f; };
const GAFADO = (c, x, y, w, o = {}) => PERS(c, x, y, w, Object.assign({ ropa: GRIS, pelo: 'corto', pcol: '#3a2a1e', severo: true }, o));
const SUERTUDO = (c, x, y, w, o = {}) => PERS(c, x, y, w, Object.assign({ ropa: VERDE, pelo: 'largo', pcol: '#c46a2a', piel: '#e9b98f' }, o));
const GOTA = (c) => sudor(c, 0, 0);

/* ===================== PORTADA (fotograma 0) + L0–L1 · EL JUEGO: cuenta las fotos en 3 s (pág. 1 → pág. 2 con el mensaje a la vista) ===================== */
const TFLIP = T.tienes - 0.12, TFIN = T.cuantas - 0.15, NT = 10, TTK = i => T.uno + 0.05 + i * (TFIN - T.uno - 0.05) / NT;
function juegoBase(c, cam) {
  const ry = rays(c, -160, 380, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  cam.style.zIndex = 2;
  const p2 = DIARIO(cam, 30, 380, 2, 10);
  const ticks = p2.fotos.slice(0, NT).map((f, i) => TICK(p2, f, i + 1));
  const mano = MANO(cam, 40);
  const tit = TIT(c, 258, `CUENTA LAS <span style="color:${YEL}">FOTOS</span>`, 96, 45);
  const cr = CRONO(c, 170, 46);
  return { ry, p2, ticks, mano, tit, cr };
}
const manoEn = (J, k) => { // k = posición continua en la lista de fotos (0..NT-1)
  const i = clamp(Math.floor(k), 0, NT - 1), j = clamp(i + 1, 0, NT - 1), f = k - Math.floor(k), a = J.p2.fotos[i], b = J.p2.fotos[j], e = ease3(clamp(f * 1.6));
  const x = 38 + lerp(a[0], b[0], e), y = 388 + lerp(a[1], b[1], e) - Math.sin(e * Math.PI) * 30;
  set(J.mano, { x: x - 70, y: y - 10, r: -10 }); };
plano(-1, L(2) - 0.08, PAPEL, c => {
  const cam = CAM(c), J = juegoBase(c, cam);
  const p1 = DIARIO(cam, 30, 380, 1, 12); p1.style.transformOrigin = '0% 50%';
  const cu = SELLO(cam, 150, 1150, 620, '¿CUÁNTAS?', RED, 60, 100);
  sfx('swoosh_up', 0.05, 0.4); sp(TFLIP, 'paper', 0.9); sp(TFLIP + 0.05, 'whoosh', 0.4);
  [T.uno, T.dos, T.tres1].forEach(tt => sp(tt, 'tick', 0.9));
  for (let i = 0; i < NT; i++) sp(TTK(i), 'pop', 0.3);
  sp(T.cuantas, 'stamp', 1.0); shakeAt(T.cuantas, 0.35, 14);
  return t => {
    set(J.ry, { r: t * 6 });
    camTo(cam, 540, 820 + Math.sin(t * 0.8) * 4, 1 + 0.03 * clamp(t / 9));
    set(J.tit, { r: -1.5 + wobble(t, 0.5, 0.8), s: 1 + 0.025 * Math.sin(t * 3) });
    const kf = p(t, TFLIP, 0.45, E.inOutCubic);
    set(p1, { sx: Math.max(0.001, 1 - 2 * kf * (kf < 0.5 ? 1 : 1)), o: kf >= 0.5 ? 0 : 1, r: wobble(t, 0.4, 0.5) });
    set(J.p2, { r: wobble(t, 0.4, 0.5) });
    J.ticks.forEach((tk, i) => popA(tk, t, TTK(i), { r: -6 + (i % 3) * 5 }));
    const kh = t < T.uno ? -1 : (t - T.uno - 0.05) / ((TFIN - T.uno - 0.05) / NT);
    set(J.mano, { o: t > T.uno - 0.2 && t < TFIN + 0.6 ? 1 : 0 }); if (kh >= -0.2) manoEn(J, clamp(kh, 0, NT - 1)); else set(J.mano, { o: 0 });
    // cronómetro: «3 s» en la portada, luego 3 · 2 · 1 · 0
    const n = t < T.uno - 0.05 ? '3 s' : t < T.dos - 0.05 ? '3' : t < T.tres1 - 0.05 ? '2' : t < T.cuantas - 0.1 ? '1' : '0';
    numC(J.cr, n, n === '3 s' ? 92 : 120);
    J.cr.rg.setAttribute('opacity', t > T.uno - 0.05 ? 1 : 0); J.cr.rg.setAttribute('stroke-dashoffset', f1(p(t, T.uno - 0.05, T.cuantas - T.uno, E.linear) * 1000) / 1000);
    J.cr.cara.setAttribute('fill', n === '0' && Math.sin(t * 16) > 0 ? '#ffb3b3' : CRE);
    const beat = [T.uno, T.dos, T.tres1].reduce((m, tt) => Math.max(m, t > tt - 0.05 && t < tt + 0.3 ? 1 - (t - tt + 0.05) / 0.35 : 0), 0);
    set(J.cr, { x: 860, y: 372 + Math.sin(t * 4) * 6, r: wobble(t, 0.5, 4), s: 1 + 0.15 * beat });
    golpeS(cu, t, T.cuantas, -6);
  };
}, { sfx: false });

/* L2 · marca en el balcón */
marca(2);

/* ===================== L3a · un psicólogo inglés, Richard Wiseman, en su despacho ===================== */
plano(L(3) - 0.1, T.diez - 0.1, { background: '#d9cdb0' }, c => {
  const cam = CAM(c);
  for (let r = 0; r < 3; r++) { box(cam, 60, 520 + r * 230, 960, 26, { zIndex: 2, background: WOOD, border: `6px solid ${INK}`, borderRadius: '6px' });
    for (let k = 0; k < 22; k++) box(cam, 74 + k * 42, 520 + r * 230 - 150 + (k * 37) % 40, 36, 150 - (k * 37) % 40, { zIndex: 1, background: ['#8a1c2b', '#2b6f4a', '#2b4f8a', '#b5873a', '#5a3a6a'][(k + r) % 5], border: `4px solid ${INK}`, boxSizing: 'border-box' }); }
  const mesa = box(cam, 0, 1150, 1080, 300, { zIndex: 9, background: WOOD, borderTop: `8px solid ${INK}` });
  const pr = PROFE(cam, 470, 640, 420, 8);
  const mini = MINI(cam, 260, 12);
  const card = box(c, 40, 560, 470, 200, { zIndex: 30, background: CRE, border: `8px solid ${INK}`, borderRadius: '24px', boxShadow: `10px 12px 0 ${SH}`, boxSizing: 'border-box', textAlign: 'center', transformOrigin: '50% 50%' },
    `<div style="font-family:Playfair;font-weight:900;font-size:54px;line-height:70px;margin-top:20px;color:${INK}">Richard Wiseman</div><div style="font-family:Bricolage;font-weight:800;font-size:28px;color:${INK}">psicólogo · Univ. de Hertfordshire</div>`);
  const tt = texto(c, 268, 'un psicólogo ' + hlSpan('inglés', 'ihl'), { size: 92, z: 30 });
  const ver = chip(c, 600, 430, '¡de verdad!', { size: 46, bg: RED, z: 32 });
  sp(T.psico, 'pop', 0.6); sp(T.richard, 'ding', 0.7); sp(L(3) + 0.3, 'pop2', 0.5);
  return t => {
    zoom(cam, t, L(3) - 0.1, T.diez - L(3), 0.06);
    set(pr, { y: wobble(t, 0.5, 4), r: wobble(t, 0.3, 1.5) }); pFace(pr, t, { jaw: talkW(t, 'VECINO') * 0.6, look: t > T.richard ? [-6, 0] : [0, 2], feliz: 0.6, seed: 0.4 });
    set(mini, { x: 590, y: 1000 + Math.sin(t * 3) * 8, r: -6 + Math.sin(t * 2) * 4 });
    set(tt, { o: t > T.psico - 0.15 ? 1 : 0, s: pop(t, T.psico - 0.15, 0.3), r: -2 }); paint(c.querySelector('.ihl'), t, T.psico + 0.4, 0.35);
    vis(ver, t, L(3) + 0.3, 99, { r: 5 + wobble(t, 0.6, 2) });
    set(card, { o: t > T.richard - 0.1 ? 1 : 0, s: pop(t, T.richard - 0.1, 0.4), r: -3 + wobble(t, 0.4, 1) });
  };
});

/* ===================== L3b · 10 años · 400 personas → CON SUERTE (trébol) | GAFADOS (gato negro + nube) ===================== */
plano(T.diez - 0.1, L(4) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const a10 = TIT(c, 262, `<span style="color:${YEL}">10 AÑOS</span> · <span class="n400">0</span> PERSONAS`, 72, 40);
  const n400 = a10.querySelector('.n400');
  const cal = box(c, 60, 380, 200, 200, { zIndex: 30, background: '#fff', border: `8px solid ${INK}`, borderRadius: '18px', boxShadow: `8px 9px 0 ${SH}`, boxSizing: 'border-box', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, color: INK, overflow: 'hidden', transformOrigin: '50% 50%' },
    `<div style="background:${RED};color:#fff;font-size:32px;line-height:50px">AÑO</div><div class="ny" style="font-size:110px;line-height:130px">1</div>`);
  const ny = cal.querySelector('.ny');
  const N = 40, gente = [...Array(N)].map((_, i) => CARITA(c, i, 92, 14));
  const lab1 = chip(c, 70, 640, 'CON SUERTE', { size: 50, bg: VERDE, z: 30 }), lab2 = chip(c, 560, 640, 'GAFADOS', { size: 50, bg: INK, z: 30 });
  const tr = TREBOL(c, 190, 20), ga = GATO(c, 150, 20), nu = NUBE(c, 210, 22);
  const TS = T.unas - 0.1, TG = T.otras;
  sp(T.diez, 'pop2', 0.6); for (let k = 0; k < 9; k++) sp(T.diez + 0.15 + k * 0.12, 'paper', 0.25); sp(T.c400, 'swoosh_up', 0.5);
  sp(T.suerte3, 'sparkle', 0.8); sp(T.gafadas, 'sad', 0.8); sp(TS, 'whoosh', 0.5);
  return t => {
    set(ry, { r: t * 5 });
    set(a10, { s: pop(t, T.diez - 0.1, 0.35) * (1 + 0.02 * Math.sin(t * 4)), r: -1 });
    ny.textContent = String(Math.max(1, Math.min(10, 1 + Math.floor((t - T.diez - 0.1) / 0.12))));
    set(cal, { o: t < TS + 0.2 ? 1 : 0, r: -5 + wobble(t, 0.5, 2), s: 1 + (Math.floor((t - T.diez) / 0.12) < 10 && t > T.diez ? 0.04 * Math.sin(t * 50) : 0) });
    n400.textContent = String(Math.round(400 * p(t, T.diez + 0.25, T.c400 + 0.6 - T.diez, E.linear)));
    gente.forEach((g, i) => {
      const t0 = T.diez + 0.25 + i * (T.c400 + 0.3 - T.diez - 0.25) / N, row = Math.floor(i / 8), col = i % 8;
      const gx = 330 + col * 70 - (row % 2) * 30, gy = 620 + row * 105;
      const lucky = i % 2 === 0, j = Math.floor(i / 2), side = lucky ? 0 : 1;
      const kS = p(t, TS + (i % 7) * 0.04, 0.6, E.inOutCubic);
      const sx = (side ? 520 : 40) + (j % 5) * 74, sy = 800 + Math.floor(j / 5) * 108;
      const bob = lucky ? Math.abs(Math.sin(t * 6 + i)) * -10 * (t > T.suerte3 ? 1 : 0) : 0;
      set(g, { x: lerp(gx, sx, kS), y: lerp(gy, sy, kS) + bob, s: pop(t, t0, 0.3) * 0.95, o: t > t0 ? 1 : 0, r: !lucky && t > T.gafadas ? -6 : wobble(t, 0.7, 3, i * 0.1) });
      g.m.setAttribute('d', t > TS + 0.6 ? (lucky ? 'M46,78 Q60,92 74,78' : 'M48,84 Q60,74 72,84') : 'M48,80 Q60,88 72,80');
    });
    set(lab1, { o: t > T.suerte3 - 0.1 ? 1 : 0, s: pop(t, T.suerte3 - 0.1, 0.35), r: -4 }); set(lab2, { o: t > T.gafadas - 0.15 ? 1 : 0, s: pop(t, T.gafadas - 0.15, 0.35), r: 4 });
    set(tr, { x: 240, y: 380 + Math.sin(t * 3) * 10, o: t > T.suerte3 - 0.1 ? 1 : 0, s: pop(t, T.suerte3 - 0.1, 0.4), r: t * 40 });
    set(ga, { x: 800 - 75, y: 390, o: t > T.gafadas - 0.15 ? 1 : 0, s: pop(t, T.gafadas - 0.15, 0.4), r: wobble(t, 0.5, 3) }); ga.pu.setAttribute('transform', `translate(${f1(Math.sin(t * 2) * 3)} 0)`);
    set(nu, { x: 560, y: 360 + Math.sin(t * 2) * 6, o: t > TG ? 1 : 0, s: pop(t, TG, 0.4) }); lluvia(nu, t);
  };
});

/* ===================== L4–L5 · los dos grupos cuentan · dos cronos: gafados ≈ 2 min, con suerte unos segundos ===================== */
plano(L(4) - 0.1, L(6) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  box(cam, 0, 1180, 1080, 800, { zIndex: 9, background: WOOD, borderTop: `8px solid ${INK}` });
  const su = SUERTUDO(cam, 60, 780, 360, { z: 8 }), ga = GAFADO(cam, 540, 780, 360, { z: 8 });
  const mS = MINI(cam, 300, 12), mG = MINI(cam, 300, 12);
  const tr = TREBOL(cam, 110, 13), nu = NUBE(cam, 170, 13);
  const l1 = chip(cam, 90, 700, 'CON SUERTE', { size: 40, bg: VERDE, z: 20 }), l2 = chip(cam, 610, 700, 'GAFADOS', { size: 40, bg: INK, z: 20 });
  const tA = texto(c, 268, 'lo mismo ' + hlSpan('que a ti', 'qhl'), { size: 92, z: 30 });
  const tB = TIT(c, 268, `CUENTA LAS <span style="color:${YEL}">FOTOS</span>`, 88, 40);
  const crS = CRONO(c, 210, 30), crG = CRONO(c, 210, 30);
  const rS = chip(c, 70, 560, 'unos segundos', { size: 46, bg: VERDE, z: 35 }), rG = chip(c, 640, 560, '≈ 2 min', { size: 58, bg: RED, z: 35 });
  const v43 = chip(c, 330, 860, '¡43!', { size: 58, bg: YEL, color: INK, z: 36 });
  const kS = [0, 1, 2].map(i => TICK(c, [0, 0], i + 1)), kG = [0, 1, 2, 3, 4].map(i => TICK(c, [0, 0], i + 1));
  const gotas = [0, 1].map(() => GOTA(cam));
  const TC = T.cuenta4, TGs = T.gaf5, TGe = T.min5 + 0.3, TSs = T.suerte5, TSe = T.seg5 + 0.35;
  sp(T.todos, 'pop', 0.5); sp(T.mismo, 'pop2', 0.5); sp(TC, 'ding', 0.6); kS.forEach((_, i) => sp(TC + 0.3 + i * 0.3, 'pop', 0.3));
  sp(TGs, 'clockfast', 0.6); sp(TGe, 'error', 0.6); sp(TSs, 'tick', 0.6); sp(TSe, 'tada', 0.7);
  return t => {
    zoom(cam, t, L(4) - 0.1, L(6) - L(4), 0.05);
    const ph = t >= TC - 0.15;
    set(tA, { o: ph ? 0 : 1, s: pop(t, L(4) - 0.1, 0.3), r: -2 }); paint(c.querySelector('.qhl'), t, T.mismo + 0.3, 0.35);
    set(tB, { o: ph && t < TGs - 0.1 ? 1 : 0, s: pop(t, TC - 0.15, 0.3), r: -1.5 });
    set(su, { y: wobble(t, 0.5, 3) }); set(ga, { y: wobble(t, 0.5, 3, 0.3) + (t > TGs && t < TGe ? Math.sin(t * 30) * 2 : 0) });
    const lookS = t > TSe - 0.2 ? [0, 0] : [6, 8], lookG = [-6, 8];
    pFace(su, t, { look: lookS, feliz: t > TSe ? 1 : 0.5, jaw: t > TSe && t < TSe + 1 ? 0.6 : 0, seed: 0.2 }); pFace(ga, t, { look: lookG, feliz: t > TGs ? -0.8 : 0, ceja: t > TGs ? -4 : 0, seed: 0.9 });
    set(mS, { x: 90, y: 1010 + Math.sin(t * 3) * 4, r: -4 }); set(mG, { x: 570, y: 1010 + Math.sin(t * 3.4) * 4, r: 4 + (t > TGs ? Math.sin(t * 22) * 1.5 : 0) });
    set(tr, { x: 300, y: 790, r: t * 30, s: 1 + 0.06 * Math.sin(t * 5) }); set(nu, { x: 760, y: 720 + Math.sin(t * 2) * 5 }); lluvia(nu, t);
    set(l1, { r: -4 }); set(l2, { r: 4 });
    kS.forEach((k, i) => { const t0 = TC + 0.3 + i * 0.3; popA(k, t, t0, { x: 130 + i * 80, y: 1050, r: -6 }); k.style.display = t < TSs - 0.1 ? '' : 'none'; });
    kG.forEach((k, i) => { const t0 = TC + 0.3 + i * 0.28; popA(k, t, t0, { x: 600 + (i % 3) * 80, y: 1040 + Math.floor(i / 3) * 70, r: 6 }); k.textContent = String(t > TGs ? Math.min(42, i + 1 + Math.floor((t - TGs) * 6) * 5) : i + 1); });
    gotas.forEach((g, i) => { const k = (t * 1.3 + i * 0.5) % 1; set(g, { x: 640 + i * 150, y: 900 + k * 70, o: t > TGs ? 1 - k : 0 }); });
    // cronos
    set(crS, { x: 130, y: 300 + Math.sin(t * 4) * 5, o: t > TGs - 0.1 ? 1 : 0, s: pop(t, TGs - 0.1, 0.35) * (t > TSe && t < TSe + 0.3 ? 1.12 : 1), r: wobble(t, 0.4, 3) });
    set(crG, { x: 640, y: 300 + Math.sin(t * 4.3) * 5, o: t > TGs - 0.1 ? 1 : 0, s: pop(t, TGs - 0.1, 0.35), r: wobble(t, 0.4, 3, 0.5) + (t > TGs ? Math.sin(t * 25) * 3 : 0) });
    aguja(crG, t > TGs ? Math.min(t, TGe) * 0 + (Math.min(t, TGe) - TGs) * 720 : 0);
    aguja(crS, t > TSs ? (Math.min(t, TSe) - TSs) * 140 : 0);
    crG.cara.setAttribute('fill', t > TGe && Math.sin(t * 12) > 0 ? '#ffb3b3' : CRE); crS.cara.setAttribute('fill', t > TSe ? '#c9f0d3' : CRE);
    vis(rG, t, TGe - 0.2, 99, { r: 5 }); vis(rS, t, TSe - 0.1, 99, { r: -4 }); vis(v43, t, TSe, 99, { r: -8 + wobble(t, 0.7, 3) });
  };
});

/* ===================== L6a · ¿POR QUÉ? ===================== */
plano(L(6) - 0.1, T.segunda - 0.15, { background: '#E9C6BE' }, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,255,255,.25)', 'rgba(0,0,0,0)', 0);
  const pq = TIT(c, 360, `¿POR <span style="color:${YEL}">QUÉ</span>?`, 170, 40);
  const ga = GAFADO(c, 330, 700, 420, { z: 10 });
  const qs = [[200, 640], [800, 620], [240, 980], [800, 960]].map((q, i) => qMark(c, q[0], q[1], 130, i % 2 ? PINK : YEL));
  sp(T.porque, 'boing', 0.6);
  return t => {
    set(ry, { r: t * 6 });
    set(pq, { s: pop(t, L(6) - 0.05, 0.35) * (1 + 0.04 * Math.sin(t * 7)), r: -3 + wobble(t, 0.8, 2) });
    set(ga, { y: wobble(t, 0.6, 4), r: Math.sin(t * 5) * 4 }); pFace(ga, t, { look: [Math.sin(t * 4) * 6, -4], feliz: -0.5, ceja: 6, jaw: 0.3 });
    qs.forEach((q, i) => set(q, { s: pop(t, L(6) + i * 0.1, 0.3), r: Math.sin(t * 5 + i) * 12, o: t > L(6) + i * 0.1 ? 1 : 0 }));
  };
});

/* ===================== L6b · pág. 2: el mensaje se ilumina · ½ hoja · regla +5 cm · «DEJA DE CONTAR: HAY 43 FOTOS» ===================== */
plano(T.segunda - 0.15, L(7) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 380, 1400, 24, 'rgba(255,230,0,.22)', 'rgba(0,0,0,0)', 0);
  const cam = CAM(c);
  const d = DIARIO(cam, 30, 380, 2, 10);
  const pg = chip(cam, 640, 352, 'PÁGINA 2', { size: 44, bg: RED, z: 30 });
  // ½ hoja: corchete a la derecha del mensaje
  const brk = box(cam, 846, 624, 40, 408, { zIndex: 25, borderTop: `8px solid ${RED}`, borderBottom: `8px solid ${RED}`, borderRight: `8px solid ${RED}`, boxSizing: 'border-box', transformOrigin: '0 50%' });
  const med = chip(cam, 560, 1052, '½ HOJA', { size: 52, bg: RED, z: 30 });
  const reg = REGLA(d.msg, 112, 30); reg.style.left = '40px'; reg.style.top = '122px';
  const cm = chip(d.msg, 0, 140, '+5 cm', { size: 30, bg: RED, z: 32 }); cm.style.left = '4px'; cm.style.top = '250px';
  const tA = texto(c, 262, 'en la ' + hlSpan('página 2', 'p2h'), { size: 92, z: 40 });
  const tB = TIT(c, 262, `letras de <span style="color:${YEL}">+5 cm</span>`, 92, 40);
  const tC = texto(c, 262, 'y decía…', { size: 92, z: 40 });
  const TZ = T.letras - 0.15, TO = T.deja6 - 0.35;
  sp(T.segunda, 'paper', 0.8); sp(T.mensaje, 'sparkle', 0.8); sp(T.media, 'pop2', 0.6); sp(TZ, 'whoosh', 0.6); sp(T.cinco, 'ding', 0.7); sp(TO, 'whoosh', 0.5);
  [T.deja6, T.hay, T.c43, T.fotos6].forEach(tt => sp(tt, 'stamp', 0.5)); shakeAt(T.c43, 0.3, 10);
  return t => {
    set(ry, { r: t * 5 });
    const kz = p(t, TZ, 0.6, E.inOutCubic) * (1 - p(t, TO, 0.5, E.inOutCubic));
    const kin = p(t, T.segunda - 0.15, 0.4, E.outCubic);
    camTo(cam, lerp(540, 250, kz), lerp(820, 790, kz), lerp(0.96 + 0.04 * p(t, T.segunda, 3, E.linear), 2.1, kz));
    set(d, { y: (1 - kin) * 300, r: (1 - kin) * 8 });
    vis(pg, t, T.segunda, 99, { r: 5 });
    const glow = t > T.mensaje - 0.1 ? 0.5 + 0.5 * Math.abs(Math.sin((t - T.mensaje) * 4)) : 0;
    d.msg.style.boxShadow = glow && t < T.deja6 - 0.2 ? `0 0 0 ${f1(6 + glow * 14)}px rgba(255,230,0,${f1(0.55 + glow * 0.4)})` : 'none';
    d.msg.style.background = t > T.mensaje - 0.1 && t < T.deja6 - 0.2 ? `rgba(255,240,140,${f1(glow * 0.45)})` : 'transparent';
    set(brk, { o: t > T.media - 0.1 && t < TZ ? 1 : 0, sx: p(t, T.media - 0.1, 0.3) }); vis(med, t, T.media - 0.05, TZ, { r: -4 });
    set(reg, { o: t > T.cinco - 0.35 && t < TO + 0.3 ? 1 : 0, sy: p(t, T.cinco - 0.35, 0.35, E.outCubic) }); vis(cm, t, T.cinco, TO + 0.3, { r: -6 });
    set(tA, { o: t < TZ ? 1 : 0, r: -2 }); paint(c.querySelector('.p2h'), t, T.segunda + 0.2, 0.35);
    set(tB, { o: t >= TZ && t < TO ? 1 : 0, s: pop(t, T.cinco - 0.1, 0.3), r: -2 });
    set(tC, { o: t >= TO ? 1 : 0, s: pop(t, TO, 0.3), r: -2 });
    [T.deja6, T.hay, T.c43, T.fotos6].forEach((tt, i) => luz(d.ms[i], p(t, tt - 0.05, 0.2)));
    set(d.ms[2], { s: t > T.c43 - 0.05 ? 1 + 0.06 * Math.abs(Math.sin((t - T.c43) * 5)) : 1 });
  };
});

/* ===================== L7 · REBOBINAR al periódico del principio → círculo rojo → «ESTABA AHÍ» ===================== */
plano(L(7) - 0.1, T.mitad - 0.15, PAPEL, c => {
  const cam = CAM(c), J = juegoBase(c, cam);
  const vhs = box(c, 0, 0, 1080, 1920, { zIndex: 70, backgroundImage: 'repeating-linear-gradient(180deg, rgba(0,0,0,.16) 0 3px, transparent 3px 7px)' });
  const bar = box(c, 0, 0, 1080, 90, { zIndex: 71, background: 'rgba(255,255,255,.35)' });
  const rw = box(c, 230, 1190, 620, 100, { zIndex: 72 }, `<svg width="520" height="100" style="overflow:visible"><path d="M70,10 L10,50 L70,90 Z M140,10 L80,50 L140,90 Z" fill="#fff" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    <text x="164" y="70" font-family="PlexMono" font-weight="700" font-size="52" fill="#fff" stroke="${INK}" stroke-width="3" paint-order="stroke">REBOBINANDO</text></svg>`);
  const ring = box(cam, 0, 0, 1080, 1920, { zIndex: 50 }, `<svg width="1080" height="1920" style="overflow:visible"><ellipse class="el" cx="478" cy="822" rx="470" ry="250" fill="none" stroke="${RED}" stroke-width="16" pathLength="1" stroke-dasharray="1 1" transform="rotate(-3 478 822)" stroke-linecap="round"/></svg>`);
  const elp = ring.querySelector('.el');
  const st = SELLO(c, 170, 1080, 740, 'ESTABA AHÍ', RED, 75, 104);
  const TR0 = L(7) - 0.1, TR1 = T.antes - 0.05, TCIR = T.antes - 0.05, TST = T.antes + 0.45;
  sp(TR0, 'scratch', 0.8); sp(TR0 + 0.4, 'scratch', 0.5); sp(TR1, 'click', 0.8); sp(TCIR + 0.05, 'swoosh_up', 0.6); sp(TST, 'stamp', 1.1); shakeAt(TST, 0.4, 18);
  return t => {
    const kr = p(t, TR0, TR1 - TR0, E.linear), rew = t < TR1;
    set(J.ry, { r: -t * 30 });
    camTo(cam, 540, 820, 1 + 0.02 * p(t, TR1, 2, E.linear));
    set(J.tit, { r: -1.5 + (rew ? Math.sin(t * 60) * 1.5 : 0) });
    J.ticks.forEach((tk, i) => { const on = i < Math.round(NT * (1 - kr)); set(tk, { o: on ? 1 : 0, s: on ? 1 : 0, r: -6 + (i % 3) * 5 }); });
    set(J.mano, { o: rew ? 1 : 0 }); if (rew) manoEn(J, (NT - 1) * (1 - kr));
    const n = kr < 0.33 ? '1' : kr < 0.66 ? '2' : '3 s'; numC(J.cr, n, n === '3 s' ? 92 : 120); J.cr.rg.setAttribute('opacity', 0);
    set(J.cr, { x: 860, y: 372, r: rew ? -t * 400 % 360 : 0 });
    const glitchY = rew ? Math.sin(t * 47) * 8 : 0;
    set(J.p2, { y: glitchY, x: rew ? Math.sin(t * 31) * 6 : 0 });
    c.style.filter = rew ? 'saturate(.55) contrast(1.15) hue-rotate(-12deg)' : 'none';
    set(vhs, { o: rew ? 1 : 0 }); set(bar, { o: rew ? 1 : 0, y: (t * 1400) % 1920 }); set(rw, { o: rew && Math.sin(t * 14) > -0.3 ? 1 : 0 });
    elp.setAttribute('stroke-dashoffset', f1(1 - p(t, TCIR, 0.45, E.inOutCubic)) * 1);
    set(ring, { o: t > TCIR ? 1 : 0 });
    J.ms = J.p2.ms; J.ms.forEach(sp_ => luz(sp_, t > TCIR + 0.3 ? 0.55 + 0.25 * Math.sin(t * 6) : 0));
    golpeS(st, t, TST, -6);
  };
});

/* ===================== L8 · a mitad del periódico, el segundo mensaje: «díselo al investigador y ganas 250» ===================== */
plano(T.mitad - 0.15, T.gaf8 - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 380, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const cam = CAM(c);
  const p6 = DIARIO(cam, 30, 380, 6, 9);
  const pila = [2, 3, 4, 5].map((n, i) => { const d = n === 2 ? DIARIO(cam, 30, 380, 2, 14 - i) : DIARIO(cam, 30, 380, 'g', 14 - i, n); d.style.transformOrigin = '0% 50%'; return d; });
  const tA = texto(c, 262, 'a ' + hlSpan('mitad', 'mhl') + ' del periódico…', { size: 84, z: 40 });
  const tB = texto(c, 262, '…puso ' + hlSpan('otro', 'ohl'), { size: 92, z: 40 });
  const saco = SACO(c, 230, 50);
  const brillos = [0, 1, 2, 3].map(i => ESTRELLA(c, 60, i % 2 ? YEL : '#fff'));
  const TF0 = T.mitad - 0.05, DF = Math.max(0.22, (T.otro - 0.1 - TF0) / 4);
  pila.forEach((_, i) => sp(TF0 + i * DF, 'paper', 0.5));
  sp(T.deja8, 'pop', 0.5); sp(T.diselo, 'pop', 0.5); sp(T.ganas, 'cash', 0.9); sp(T.d250, 'sparkle', 0.7); shakeAt(T.d250, 0.3, 10);
  return t => {
    set(ry, { r: t * 6 });
    camTo(cam, 540, 820, 1 + 0.03 * p(t, T.deja8, 4, E.linear));
    pila.forEach((d, i) => { const k = p(t, TF0 + i * DF, DF * 0.95, E.inOutCubic); set(d, { sx: Math.max(0.001, 1 - 2 * k), o: k >= 0.5 ? 0 : 1 }); });
    set(tA, { o: t < T.otro - 0.1 ? 1 : 0, r: -2 }); paint(c.querySelector('.mhl'), t, T.mitad + 0.1, 0.3);
    set(tB, { o: t >= T.otro - 0.1 ? 1 : 0, s: pop(t, T.otro - 0.1, 0.3), r: -2 }); paint(c.querySelector('.ohl'), t, T.otro + 0.1, 0.3);
    [T.deja8, T.diselo, T.ganas].forEach((tt, i) => luz(p6.ms[i], p(t, tt - 0.05, 0.2)));
    const kb = p(t, T.ganas - 0.1, 0.5, E.outBounce || E.outBack);
    set(saco, { x: 700, y: lerp(-300, 900, kb) + (t > T.ganas + 0.5 ? Math.sin(t * 5) * 6 : 0), o: t > T.ganas - 0.1 ? 1 : 0, r: wobble(t, 0.6, 4) });
    brillos.forEach((b, i) => { const a = t * 3 + i * 1.6; set(b, { x: 785 + Math.cos(a) * 150, y: 1000 + Math.sin(a) * 120, o: t > T.d250 ? 1 : 0, s: 0.6 + 0.4 * Math.abs(Math.sin(t * 6 + i)), r: t * 120 }); });
  };
});

/* ===================== L8c · los gafados ni lo vieron: siguen contando, sudando, con el saco al lado ===================== */
plano(T.gaf8 - 0.1, L(9) - 0.1, { background: '#E9C6BE' }, c => {
  const cam = CAM(c);
  box(cam, 0, 1150, 1080, 800, { zIndex: 9, background: WOOD, borderTop: `8px solid ${INK}` });
  const ga = GAFADO(cam, 120, 590, 460, { z: 8 });
  const mini = MINI(cam, 380, 12);
  const saco = SACO(cam, 220, 13);
  const nu = NUBE(cam, 230, 14);
  const nums = [...Array(6)].map((_, i) => TICK(c, [0, 0], 37 + i));
  const gotas = [0, 1, 2].map(() => GOTA(cam));
  const st = SELLO(c, 100, 420, 880, 'NO LO VIERON', RED, 60, 92);
  const tt = texto(c, 262, 'ocupados ' + hlSpan('contando', 'chl'), { size: 96, z: 40 });
  sp(T.gaf8, 'pop', 0.5); sp(T.tampoco, 'stamp', 1.0); shakeAt(T.tampoco, 0.3, 12); nums.forEach((_, i) => sp(T.gaf8 + 0.5 + i * 0.55, 'tick', 0.35)); sp(T.contando, 'sad', 0.6);
  return t => {
    zoom(cam, t, T.gaf8 - 0.1, L(9) - T.gaf8, 0.06);
    set(ga, { y: wobble(t, 0.6, 3) + Math.sin(t * 28) * 1.5 }); pFace(ga, t, { look: [4, 9], feliz: -0.8, ceja: -5, jaw: Math.abs(Math.sin(t * 9)) * 0.35, seed: 0.6 });
    set(mini, { x: 160, y: 1050 + Math.sin(t * 9) * 3, r: Math.sin(t * 7) * 2 });
    set(saco, { x: 690, y: 960, r: wobble(t, 0.7, 4), s: 1 + 0.04 * Math.sin(t * 6) });
    set(nu, { x: 230, y: 420 + Math.sin(t * 2) * 6, o: t < T.tampoco - 0.1 || t > T.tampoco + 1.6 ? 1 : 0 }); lluvia(nu, t);
    nums.forEach((n, i) => { const t0 = T.gaf8 + 0.5 + i * 0.55, k = clamp((t - t0) / 1.4); set(n, { x: 250 + (i % 3) * 110, y: 940 - k * 160, o: t > t0 ? 1 - k : 0, s: pop(t, t0, 0.3), r: (i % 2 ? 8 : -8) }); });
    gotas.forEach((g, i) => { const k = (t * 1.4 + i * 0.33) % 1; set(g, { x: [210, 520, 470][i], y: 760 + k * 90, o: 1 - k }); });
    golpeS(st, t, T.tampoco, -5); st.style.display = t > T.ocupados - 0.1 ? 'none' : '';
    set(tt, { o: t > T.ocupados - 0.1 ? 1 : 0, s: pop(t, T.ocupados - 0.1, 0.3), r: -2 }); paint(c.querySelector('.chl'), t, T.contando, 0.35);
  };
});

/* ===================== L9a · OJO: según Wiseman, los gafados solían estar más tensos (tensiómetro) ===================== */
plano(L(9) - 0.1, T.cuando - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const ojo = SELLO(c, 300, 270, 480, '¡OJO!', RED, 40, 100);
  const sw = chip(c, 340, 450, 'según Wiseman', { size: 44, bg: INK, z: 40 });
  const ga = GAFADO(c, 270, 600, 440, { z: 10 });
  const met = box(c, 790, 560, 110, 560, { zIndex: 20 }, `<svg width="110" height="560" style="overflow:visible"><rect x="25" y="0" width="60" height="470" rx="30" fill="#fff" stroke="${INK}" stroke-width="7"/><rect class="lq" x="37" y="12" width="36" height="450" rx="18" fill="${RED}"/><circle cx="55" cy="490" r="55" fill="${RED}" stroke="${INK}" stroke-width="7"/>
    ${[0, 1, 2, 3, 4].map(i => `<path d="M85,${60 + i * 90} h18" stroke="${INK}" stroke-width="5"/>`).join('')}</svg>`);
  const lq = met.querySelector('.lq');
  const lab = chip(c, 690, 1150, 'TENSIÓN', { size: 44, bg: RED, z: 30 });
  const gotas = [0, 1].map(() => GOTA(c));
  sp(T.ojo, 'stamp', 0.9); sp(T.wise9, 'pop', 0.5); sp(T.solian, 'swoosh_up', 0.6); sp(T.tensos, 'boing', 0.7); shakeAt(T.tensos, 0.3, 10);
  return t => {
    set(ry, { r: t * 6 });
    golpeS(ojo, t, T.ojo - 0.05, -5); vis(sw, t, T.wise9 - 0.1, 99, { r: 3 });
    const kt = p(t, T.solian - 0.1, T.tensos + 0.2 - T.solian, E.inCubic);
    lq.setAttribute('y', f1(12 + 450 * (1 - Math.max(0.1, kt))) ); lq.setAttribute('height', f1(450 * Math.max(0.1, kt)));
    set(met, { r: kt > 0.95 ? Math.sin(t * 30) * 3 : 0 });
    set(ga, { y: wobble(t, 0.5, 3) + (kt > 0.5 ? Math.sin(t * 35) * 2 * kt : 0) }); pFace(ga, t, { look: [-3, 0], feliz: -kt, ceja: -6 * kt, jaw: kt > 0.9 ? 0.2 : 0, seed: 0.3 });
    vis(lab, t, T.solian, 99, { r: -4 });
    gotas.forEach((g, i) => { const k = (t * 1.2 + i * 0.5) % 1; set(g, { x: [330, 640][i], y: 720 + k * 80, o: kt > 0.4 ? 1 - k : 0 }); });
  };
});

/* ===================== L9b · visión de túnel: tenso = cono estrecho (una foto) · tranquilo = cono ancho (ve el mensaje) ===================== */
plano(T.cuando - 0.1, L(10) - 0.1, { background: '#2b2630' }, c => {
  const d = DIARIO(c, 110, 300, 2, 10); d.style.transformOrigin = '50% 0%'; set(d, { s: 0.5 });
  const te = GAFADO(c, 70, 960, 300, { z: 12 }), re = SUERTUDO(c, 600, 960, 300, { z: 12 });
  const conos = box(c, 0, 0, 1080, 1920, { zIndex: 20 }, `<svg width="1080" height="1920" style="overflow:visible">
    <path class="cr" d="M220,1130 L362,348 L414,348 Z" fill="rgba(200,16,46,.42)" stroke="${RED}" stroke-width="5"/>
    <path class="cv" d="M750,1130 L320,788 L320,296 L762,296 L762,788 Z" fill="rgba(120,230,150,.28)" stroke="#7ee08f" stroke-width="5"/></svg>`);
  const cr = conos.querySelector('.cr'), cv = conos.querySelector('.cv');
  const l1 = chip(c, 50, 870, 'CON NERVIOS', { size: 40, bg: RED, z: 30 }), l2 = chip(c, 590, 870, 'TRANQUILO', { size: 40, bg: VERDE, z: 30 });
  const tk = TICK(d, d.fotos[0], 1, YEL);
  const TV = T.solo - 0.25;
  sp(T.cuando, 'whoosh', 0.5); sp(T.nervios, 'error', 0.5); sp(TV, 'sparkle', 0.8);
  return t => {
    const kn = p(t, T.cuando, 0.5, E.outCubic), kw = p(t, TV, 0.5, E.outCubic);
    set(conos, { o: 1 }); cr.style.opacity = kn; cv.style.opacity = kw;
    const w = lerp(60, 26, p(t, T.nervios - 0.1, 0.5, E.inOutCubic));
    cr.setAttribute('d', `M220,1130 L${f1(388 - w)},348 L${f1(388 + w)},348 Z`);
    set(te, { y: wobble(t, 0.5, 3) + Math.sin(t * 30) * 1.5 }); pFace(te, t, { look: [3, -9], feliz: -0.8, ceja: -6, seed: 0.2 });
    set(re, { y: wobble(t, 0.4, 4), o: 1 }); pFace(re, t, { look: [-4, -9], feliz: 1, seed: 0.8 });
    vis(l1, t, T.cuando, 99, { r: -4 }); vis(l2, t, TV, 99, { r: 4 });
    popA(tk, t, T.nervios, { r: -6 });
    d.ms.forEach(s => luz(s, kw * (0.55 + 0.3 * Math.sin(t * 5))));
    d.style.filter = `brightness(${f1(0.55 + 0.45 * Math.max(kw, 0))})`;
  };
});

/* ===================== L10a · O SEA: «la suerte cae del cielo» — tachado: no siempre ===================== */
plano(L(10) - 0.1, T.aveces - 0.1, { background: '#a9d8f2' }, c => {
  const cam = CAM(c);
  box(cam, 0, 1180, 1080, 800, { zIndex: 2, background: '#8fb46a', borderTop: `8px solid ${INK}` });
  const nu = NUBE(cam, 300, 6);
  const tr = TREBOL(cam, 150, 8);
  const pe = SUERTUDO(cam, 330, 760, 420, { z: 5 });
  const tt = texto(c, 262, 'la suerte cae del cielo', { size: 84, z: 40 });
  const tach = box(c, 60, 312, 960, 26, { zIndex: 42, background: RED, border: `5px solid ${INK}`, borderRadius: '13px', transformOrigin: '0 50%' });
  const ns = SELLO(c, 230, 400, 620, 'NO SIEMPRE', RED, 45, 84);
  sp(L(10), 'pop', 0.4); sp(T.nosiempre, 'scratch', 0.8); sp(T.nosiempre + 0.3, 'stamp', 0.9); shakeAt(T.nosiempre + 0.3, 0.3, 10);
  return t => {
    zoom(cam, t, L(10) - 0.1, T.aveces - L(10), 0.05);
    set(nu, { x: 400, y: 520 + Math.sin(t * 2) * 6 }); lluvia(nu, 0);
    const kf = p(t, L(10), T.nosiempre - L(10) + 0.2, E.inCubic), parado = t > T.nosiempre + 0.2;
    set(tr, { x: 470 + Math.sin(t * 4) * 50 * (parado ? 0 : 1), y: parado ? 640 + Math.sin(t * 3) * 8 : lerp(560, 640, kf), r: t * 90, o: 1 });
    set(pe, { y: wobble(t, 0.5, 3) }); pFace(pe, t, { look: [0, -9], feliz: parado ? -0.5 : 0.8, jaw: 0.3, seed: 0.5 });
    set(tt, { r: -1.5 }); set(tach, { o: t > T.nosiempre - 0.05 ? 1 : 0, sx: p(t, T.nosiempre - 0.05, 0.3), r: -2 });
    golpeS(ns, t, T.nosiempre + 0.3, -5);
  };
});

/* ===================== L10b · la suerte la tienes DELANTE (trébol en el suelo) y estás demasiado ocupado mirando el móvil ===================== */
plano(T.aveces - 0.1, L(11) - 0.1, { background: '#a9d8f2' }, c => {
  const cam = CAM(c);
  box(cam, 0, 1060, 1080, 900, { zIndex: 2, background: '#8fb46a', borderTop: `8px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 4px, transparent 4px 60px)' });
  const pe = PERS(cam, 140, 520, 320, { ropa: GRIS, pelo: 'corto', pcol: '#3a2a1e', piernas: true, z: 6 });
  const mov = box(cam, 0, 0, 90, 150, { zIndex: 9, background: '#1d1a22', border: `6px solid ${INK}`, borderRadius: '16px', boxSizing: 'border-box', transformOrigin: '50% 50%' }, `<div class="pan" style="position:absolute;left:6px;top:8px;width:66px;height:118px;border-radius:8px;background:#7fd3ff"></div>`);
  const pan = mov.querySelector('.pan');
  const halo = box(cam, 470, 930, 360, 200, { zIndex: 3, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,240,120,.95) 0%, rgba(255,240,120,0) 70%)' });
  const tr = TREBOL(cam, 300, 4);
  const brillos = [0, 1, 2].map(i => ESTRELLA(cam, 56, i % 2 ? YEL : '#fff'));
  const fl = box(cam, 700, 760, 220, 200, { zIndex: 10 }, arrowSvg('M190,10 Q150,140 30,170', YEL, 14));
  const ahi = chip(cam, 690, 690, '¡AHÍ!', { size: 64, bg: RED, z: 12 });
  const tA = texto(c, 262, 'la tienes ' + hlSpan('delante', 'dhl'), { size: 96, z: 40 });
  const tB = texto(c, 262, 'y no la ' + hlSpan('ves', 'vhl', '#ffb3b3'), { size: 110, z: 40 });
  const bub = BOCADILLO(c, 120, 400, 'scroll, scroll…', { size: 44, z: 30 });
  sp(T.delante, 'sparkle', 0.9); sp(T.delante + 0.1, 'pop2', 0.6); sp(T.ocupado, 'type', 0.6); sp(T.verla, 'thud', 1.2); shakeAt(T.verla, 0.45, 20);
  return t => {
    const kz = p(t, T.verla - 0.1, 0.6, E.inOutCubic);
    camTo(cam, lerp(540, 640, kz), lerp(820, 1000, kz), lerp(1 + 0.03 * p(t, T.aveces, 3, E.linear), 1.5, kz));
    set(pe, { y: wobble(t, 0.5, 2) }); pFace(pe, t, { look: [2, 10], feliz: 0.1, jaw: 0, seed: 0.3 });
    set(mov, { x: 260, y: 790 + Math.sin(t * 2) * 3, r: -12 }); pan.style.background = t > T.ocupado - 0.1 && Math.sin(t * 10) > 0 ? '#ffd27f' : '#7fd3ff';
    set(halo, { o: t > T.delante - 0.2 ? 0.7 + 0.3 * Math.sin(t * 5) : 0.25, s: 1 + 0.08 * Math.sin(t * 4) });
    set(tr, { x: 500, y: 880, r: 20 + Math.sin(t * 2) * 6, s: t > T.delante - 0.2 ? 1 + 0.08 * Math.abs(Math.sin(t * 4)) : 1, sy: 0.55 });
    brillos.forEach((b, i) => { const a = t * 2.4 + i * 2.1; set(b, { x: 620 + Math.cos(a) * 170, y: 1000 + Math.sin(a) * 70, o: t > T.delante - 0.2 ? 1 : 0, s: 0.6 + 0.4 * Math.abs(Math.sin(t * 6 + i)), r: t * 100 }); });
    set(fl, { o: t > T.delante - 0.1 ? 1 : 0, sx: p(t, T.delante - 0.1, 0.3) }); vis(ahi, t, T.delante, 99, { r: 6 + wobble(t, 0.8, 3) });
    set(tA, { o: t < T.ocupado - 0.1 ? 1 : 0, r: -2 }); paint(c.querySelector('.dhl'), t, T.delante, 0.35);
    set(tB, { o: t >= T.ocupado - 0.1 ? 1 : 0, s: pop(t, T.ocupado - 0.1, 0.3), r: -2 }); paint(c.querySelector('.vhl'), t, T.verla, 0.35);
    vis(bub, t, T.ocupado - 0.1, T.verla, { r: -3 });
  };
});

/* L11 · CTA de seguir */
sigueme(11, 'Esto en clase…', '…no te lo cuentan', 'sígueme');

/* L12 · pregunta final (+ «Os leo») */
preguntaFinal('¿Tú lo viste', 'a la primera?', { size: 92, draw: c => [['lo vi a la primera', YEL], ['conté 12 fotos', '#9fd3c0'], ['¿qué mensaje?', PINK]].map(([s, col], i) => aparece(chip(c, 170 + i * 50, 640 + i * 160, s, { size: 54, bg: col, color: INK }), L(12) + 0.5 + i * 0.45, { sfx: 'pop' })) });

/* L13 · cierre */
cierre(309, 'Cuenta las fotos', ['PSICOLOGÍA', 'de verdad']);

Story.run({
  textura: true,
  ovalo: [[L(3) + 0.3, T.diez - 0.2], [L(9) + 0.2, T.cuando - 0.25]],
  vecino: { sorpresa: [[T.richard, T.richard + 0.9]], golpes: [T.tensos + 0.1] },
});
