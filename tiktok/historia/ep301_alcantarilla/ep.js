/* Ep. 301 · «La tapa de alcantarilla que pisas lleva escrito cuánto peso aguanta». Norma UNE-EN 124: B125 = aceras y zonas peatonales,
   D400 = calzadas; el número son kN de carga de ensayo (125 kN ≈ 12,5 t; 400 kN ≈ 40 t). Redonda: no se cuela (la cuadrada, de canto y en
   diagonal, sí) y se mueve rodando. Plantilla: ep40_hora (tres pasos + marca) con el index.html vigente de ep112/ep104. */
Story.prepara();
const T = {
  pisas: Q('pisas'), peso: Q('peso aguanta'),
  nadie: Q('nadie'), nunca: Q('nunca'), antes: Q('pero antes'), porque: Q('por qué'), redondas: Q('redondas'),
  cuento: Q('te lo cuento'), tres: Q('tres pasos'),
  uno: Q('uno'), cuadrada: Q('cuadrada'), girarla: Q('girarla'), diagonal: Q('diagonal'), colaria: Q('colaría'), agujero: Q('agujero'),
  redonda: Q('redonda'), cabe: Q('cabe'),
  dos: Q('dos'), pesa: Q('pesa muchísimo'), comoR: Q('como es redonda'), operario: Q('operario'), rodando: Q('rodando'),
  tres3: Q('y tres'), grabado: Q('grabado'), letra: Q('una letra'), numero: Q('un número'), carga: Q('la carga'),
  b125: Q('b'), aceras: Q('aceras'), doce: Q('doce toneladas'), d400: Q('d cuatrocientos'), calzada: Q('calzada'), cuarenta: Q('cuarenta toneladas'), camion: Q('camión'),
  ojo: Q('ojo'), noTodas: Q('no todas'), cuadradas: Q('las cuadradas'), arquetas: Q('arquetas'), profundas: Q('poco profundas'), pozo: Q('pozo'),
  osea: Q('o sea'), unaB: Q('una b'), carretera: Q('carretera'), equivocado: Q('equivocado'), tapaR: Q('de tapa'),
};
const HIE = '#6a6e76', HIE2 = '#474a51', HIEL = '#a3a7ae', AGUJ = '#141519', MARCO = '#8a8e96', ASF = '#3d4048';
const ADOQ = { background: '#b8b1a5', backgroundImage: 'linear-gradient(rgba(43,33,24,.18) 4px, transparent 4px), linear-gradient(90deg, rgba(43,33,24,.18) 4px, transparent 4px)', backgroundSize: '120px 60px' };
/* cámara por fotogramas clave [t, cx, cy, s]: el punto (cx,cy) del mundo queda en el centro de la pantalla */
const camK = (cam, t, K) => {
  let a = K[0], b = K[0];
  for (let i = 0; i < K.length - 1; i++) if (t >= K[i][0]) { a = K[i]; b = K[i + 1]; }
  if (t >= K[K.length - 1][0]) a = b = K[K.length - 1];
  const k = a === b ? 1 : E.inOutCubic(clamp((t - a[0]) / (b[0] - a[0])));
  const s = lerp(a[3], b[3], k); cam.style.transformOrigin = '0 0';
  set(cam, { x: 540 - lerp(a[1], b[1], k) * s, y: 960 - lerp(a[2], b[2], k) * s, s });
};
/* TAPA de alcantarilla vista desde arriba (vb 400×400). o: sq (cuadrada), code ['D','400'], num ('1'), ojos, plain */
let TID = 0;
function tapaInner(o = {}) {
  const id = 'tp' + (TID++), sq = !!o.sq;
  const sh = a => sq ? `<rect x="10" y="10" width="380" height="380" rx="22" ${a}/>` : `<circle cx="200" cy="200" r="190" ${a}/>`;
  const emb = (x, y, s, txt) => `<text x="${x + 3}" y="${y + 3}" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="${s}" fill="${HIEL}" opacity=".85">${txt}</text><text x="${x}" y="${y}" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="${s}" fill="#24262b">${txt}</text>`;
  const anillo = sq ? `<rect x="56" y="56" width="288" height="288" rx="14" fill="none" stroke="${HIE2}" stroke-width="9"/>` : `<circle cx="200" cy="200" r="146" fill="none" stroke="${HIE2}" stroke-width="9"/><circle cx="200" cy="200" r="156" fill="none" stroke="${HIEL}" stroke-width="3" opacity=".6"/>`;
  let centro = '';
  if (o.num) centro = emb(200, 266, 200, o.num);
  else if (!o.plain) {
    const [l, n] = o.code || ['D', '400'];
    centro = `<rect x="66" y="140" width="268" height="122" rx="22" fill="${HIE}" stroke="${HIE2}" stroke-width="6"/>${emb(118, 232, 88, l)}${emb(250, 232, 88, n)}
      <rect class="rL" x="80" y="152" width="78" height="98" rx="16" fill="none" stroke="${YEL}" stroke-width="10" opacity="0"/><rect class="rN" x="168" y="152" width="164" height="98" rx="16" fill="none" stroke="${YEL}" stroke-width="10" opacity="0"/>`
      + (o.ojos ? '' : emb(200, 318, 34, 'EN 124'));
  }
  const ojos = o.ojos ? `<g><ellipse cx="148" cy="92" rx="34" ry="38" fill="#fff" stroke="${INK}" stroke-width="6"/><ellipse cx="252" cy="92" rx="34" ry="38" fill="#fff" stroke="${INK}" stroke-width="6"/><g class="pup"><circle cx="148" cy="98" r="14" fill="${INK}"/><circle cx="252" cy="98" r="14" fill="${INK}"/></g>
    <path d="M110,46 L180,62 M290,46 L220,62" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path class="boca" d="M150,330 Q200,300 250,330" stroke="${INK}" stroke-width="9" fill="none" stroke-linecap="round"/></g>` : '';
  return `<defs><pattern id="${id}" width="24" height="24" patternUnits="userSpaceOnUse"><rect x="4" y="4" width="15" height="15" rx="3" fill="${HIEL}" opacity=".45"/><rect x="6" y="6" width="15" height="15" rx="3" fill="${HIE2}" opacity=".6"/></pattern><clipPath id="c${id}">${sh('')}</clipPath></defs>
  ${sh(`fill="${HIE}" stroke="${INK}" stroke-width="10"`)}<g clip-path="url(#c${id})"><rect width="400" height="400" fill="url(#${id})"/></g>${anillo}${centro}${ojos}`;
}
const TAPA = (c, cx, cy, d, o = {}) => figura(c, cx - d / 2, cy - d / 2, d, d, tapaInner(o), '0 0 400 400', { z: o.z || 8, origin: '50% 50%' });
const anillos = (tp, kL, kN) => { const a = tp.querySelector('.rL'), b = tp.querySelector('.rN'); if (a) a.setAttribute('opacity', f1(kL)); if (b) b.setAttribute('opacity', f1(kN)); };
/* agujero con su marco (vista desde arriba): s = lado o diámetro del hueco */
const HUECO = (c, cx, cy, s, sq, z = 3) => { const m = s + 72; return figura(c, cx - m / 2, cy - m / 2, m, m, sq
  ? `<rect x="0" y="0" width="${m}" height="${m}" rx="10" fill="${MARCO}" stroke="${INK}" stroke-width="8"/><rect x="36" y="36" width="${s}" height="${s}" fill="${AGUJ}"/><rect x="36" y="36" width="${s}" height="40" fill="#2b2d33"/>`
  : `<circle cx="${m / 2}" cy="${m / 2}" r="${m / 2 - 4}" fill="${MARCO}" stroke="${INK}" stroke-width="8"/><circle cx="${m / 2}" cy="${m / 2}" r="${s / 2}" fill="${AGUJ}"/><path d="M${36},${m / 2} A${s / 2},${s / 2} 0 0 1 ${m - 36},${m / 2}" stroke="#2b2d33" stroke-width="30" fill="none"/>`, `0 0 ${m} ${m}`, { z, origin: '50% 50%' }); };
/* barra de medida (lado / diagonal) */
const MEDIDA = (c, x, y, w, col, txt) => box(c, x, y, w, 64, { zIndex: 30, background: col, border: `6px solid ${INK}`, borderRadius: '14px', boxSizing: 'border-box', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '38px', lineHeight: '52px', textAlign: 'center', color: INK, transformOrigin: '0 50%', boxShadow: `6px 6px 0 ${INK}` }, txt);
/* pesa de gimnasio-fábrica con texto (vb 300×240) */
const PESA = (c, x, y, w, txt) => figura(c, x, y, w, w * 0.8, `<path d="M95,70 C95,10 205,10 205,70" stroke="${INK}" stroke-width="22" fill="none"/><path d="M95,70 C95,10 205,10 205,70" stroke="#55585f" stroke-width="10" fill="none"/>
  <path d="M40,64 L260,64 L292,232 L8,232 Z" fill="#33353b" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/><path d="M52,80 L248,80" stroke="#5a5d64" stroke-width="6"/>
  <text x="150" y="190" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="76" fill="#fff">${txt}</text>`, '0 0 300 240', { z: 14, origin: '50% 100%' });
/* camión de lado (vb 800×360), ruedas con clase .rd */
const camionInner = txt => `<rect x="10" y="20" width="540" height="250" rx="12" fill="${YEL}" stroke="${INK}" stroke-width="9"/>
  <text x="280" y="180" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="110" fill="${INK}">${txt}</text>
  <path d="M560,270 L560,110 Q560,90 580,90 L690,90 Q715,90 730,120 L775,200 Q785,215 785,235 L785,270 Z" fill="${RED}" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
  <path d="M600,110 L680,110 Q698,110 708,130 L740,190 L600,190 Z" fill="#9fc6dc" stroke="${INK}" stroke-width="7"/><rect x="0" y="262" width="790" height="26" rx="10" fill="#2b2d33"/>
  ${[100, 210, 440, 660].map(x => `<g class="rd" data-x="${x}"><circle cx="${x}" cy="300" r="50" fill="#1d1e22" stroke="${INK}" stroke-width="7"/><circle cx="${x}" cy="300" r="20" fill="#9a9da4"/><path d="M${x},262 V338 M${x - 38},300 H${x + 38}" stroke="#9a9da4" stroke-width="7"/></g>`).join('')}`;
const ruedas = (tr, a) => tr.querySelectorAll('.rd').forEach(g => g.setAttribute('transform', `rotate(${f1(a)} ${g.dataset.x} 300)`));
/* camión visto desde arriba (vb 260×620), avanza hacia abajo */
const CAMION_ARRIBA = (c, x, y, z = 12) => figura(c, x, y, 260, 620, `<rect x="20" y="10" width="220" height="430" rx="10" fill="${YEL}" stroke="${INK}" stroke-width="9"/><path d="M40,40 H220 M40,120 H220 M40,200 H220 M40,280 H220 M40,360 H220" stroke="rgba(43,33,24,.25)" stroke-width="8"/>
  <rect x="30" y="450" width="200" height="160" rx="26" fill="${RED}" stroke="${INK}" stroke-width="9"/><rect x="50" y="540" width="160" height="50" rx="10" fill="#9fc6dc" stroke="${INK}" stroke-width="6"/><rect x="0" y="500" width="30" height="20" rx="4" fill="${INK}"/><rect x="230" y="500" width="30" height="20" rx="4" fill="${INK}"/>`, '0 0 260 620', { z, origin: '50% 50%' });
const COCHE_ARRIBA = (c, col) => figura(c, 0, 0, 170, 300, `<rect x="10" y="10" width="150" height="280" rx="40" fill="${col}" stroke="${INK}" stroke-width="8"/><rect x="28" y="190" width="114" height="60" rx="14" fill="#9fc6dc" stroke="${INK}" stroke-width="6"/><rect x="28" y="50" width="114" height="44" rx="12" fill="#9fc6dc" stroke="${INK}" stroke-width="6"/>`, '0 0 170 300', { z: 6, origin: '50% 50%' });
const ZAPATO = `<rect x="40" y="-520" width="130" height="540" fill="#2f4a6a" stroke="${INK}" stroke-width="7"/><path d="M20,40 Q20,10 60,10 L150,10 Q170,10 175,40 L180,70 Q260,80 285,110 Q295,140 260,145 L30,145 Q10,145 12,120 Z" fill="#3a2a1e" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><path d="M14,130 H284" stroke="${INK}" stroke-width="12"/>`;
const flecha = (c, x, y, z = 20) => figura(c, x, y, 120, 170, `<path d="M40,0 H80 V90 H115 L60,165 L5,90 H40 Z" fill="${RED}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>`, '0 0 120 170', { z });
const check = (c, x, y, sz = 150) => figura(c, x, y, sz, sz, `<circle cx="50" cy="50" r="44" fill="#2e9e6b" stroke="${INK}" stroke-width="6"/><path d="M28,52 L44,68 L74,34" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`, '0 0 100 100', { z: 30, origin: '50% 50%' });
const fachada = (c, y0, h, col = '#e9b98f', z = 1) => { const f = box(c, -200, y0, 1480, h, { zIndex: z, background: col, backgroundImage: 'linear-gradient(rgba(0,0,0,.06) 3px, transparent 3px)', backgroundSize: '100% 56px' });
  [0, 1, 2, 3, 4].forEach(i => box(f, 150 + i * 300, 80, 170, 230, { background: '#7fa9c4', border: `7px solid ${INK}`, borderRadius: '10px 10px 0 0', boxShadow: `inset 0 -40px 0 rgba(255,255,255,.25)` })); return f; };

/* PORTADA + L0: tapa redonda gigante «D 400» sobre los rayos amarillos; a «pisas» baja un zapato; a «peso aguanta» se enmarca el código */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  const sombra = box(c, 210, 1300, 660, 70, { zIndex: 3, borderRadius: '50%', background: 'rgba(43,33,24,.22)' });
  const tp = TAPA(c, 540, 1000, 700, { code: ['D', '400'], z: 6 });
  const t1 = texto(c, 300, '¿QUÉ PONE EN', { size: 104, z: 30 });
  const t2 = texto(c, 420, 'TU ' + hlSpan('ALCANTARILLA?', 'phl'), { size: 86, z: 30 });
  const zap = figura(c, 560, 0, 340, 181, ZAPATO, '0 0 300 160', { z: 12 });
  sfx('swoosh_up', 0.05, 0.6); sp(T.pisas - 0.05, 'whoosh', 0.5); sp(T.pisas + 0.12, 'thud', 1.0); shakeAt(T.pisas + 0.12, 0.3, 14); sp(T.peso, 'ding', 0.6);
  return t => {
    set(ry, { r: t * 6 });
    const kz = p(t, T.pisas - 0.15, 0.27, E.inCubic), up = p(t, T.pisas + 0.75, 0.4, E.inCubic);
    set(zap, { y: lerp(-760, 800, kz) - up * 1600, r: -4 + 4 * kz });
    const golpeT = t > T.pisas + 0.12 ? Math.max(0, 1 - (t - T.pisas - 0.12) / 0.3) : 0;
    set(tp, { r: -3 + wobble(t, 0.35, 3), s: 1 - 0.035 * golpeT + 0.01 * Math.sin(t * 2.4) });
    set(sombra, { s: 1 + 0.03 * Math.sin(t * 2.4) });
    anillos(tp, t > T.peso - 0.05 ? 0.6 + 0.4 * Math.abs(Math.sin(t * 6)) : 0, t > T.peso + 0.15 ? 0.6 + 0.4 * Math.abs(Math.sin(t * 6 + 1)) : 0);
    paint(c.querySelector('.phl'), t, 0.25, 0.4); set(t1, { r: -2 + wobble(t, 0.5, 0.8) }); set(t2, { r: 2 + wobble(t, 0.45, 0.8, 1) });
  };
}, { sfx: false });

/* L1a: la acera; la gente pasa por encima sin mirar; a «nunca» una señora se para y mira abajo */
plano(L(1) - 0.1, T.antes - 0.06, { background: '#cfe3ee' }, c => {
  const cam = CAM(c);
  fachada(cam, 330, 900);
  box(cam, -200, 1180, 1480, 900, Object.assign({ zIndex: 2 }, ADOQ));
  box(cam, -200, 1170, 1480, 18, { zIndex: 3, background: INK });
  const tp = TAPA(cam, 690, 1250, 330, { code: ['D', '400'], z: 4 }); set(tp, { sy: 0.34 });
  const g = [['#2e9e6b', 'corto'], ['#e8507a', 'largo'], ['#1f3fa0', 'calvo']].map(([ropa, pelo], i) => PERS(cam, 0, 0, 200, { ropa, pelo, pcol: i === 1 ? '#6b4a2a' : '#3a2a1e', piernas: true, z: 6 + i }));
  const q = qMark(c, 640, 640, 140, YEL);
  headline(T.nadie - 0.1, T.antes - 0.1, 'Casi *nadie* la ha leído', { y: 320 });
  sp(T.nunca + 0.1, 'boing', 0.5);
  const T0 = L(1) - 0.1;
  return t => {
    zoom(cam, t, T0, T.antes - T0, 0.06);
    // 0 y 2 cruzan sin mirar; 1 viene de la derecha y se para encima de la tapa
    const x0 = lerp(-260, 1160, (t - T0) / 2.6), x2 = lerp(1250, -300, (t - T0 - 0.5) / 2.4), k1 = p(t, T0, T.nunca - T0, E.outCubic);
    set(g[0], { x: x0, y: 945 + Math.abs(Math.sin(t * 11)) * -10, r: Math.sin(t * 11) * 3 });
    set(g[2], { x: x2, y: 935 + Math.abs(Math.sin(t * 10 + 1)) * -10, r: Math.sin(t * 10) * 3 });
    set(g[1], { x: lerp(1100, 590, k1), y: 925 + (k1 < 1 ? Math.abs(Math.sin(t * 10)) * -10 : 0) });
    pFace(g[0], t, { look: [14, 0], jaw: 0.1, seed: 1 }); pFace(g[2], t, { look: [-14, -4], jaw: 0.1, seed: 2 });
    const mira = t > T.nunca; pFace(g[1], t, { look: mira ? [0, 12] : [-12, 0], ceja: mira ? 8 : 0, jaw: mira ? 0.4 : 0.1, seed: 3 });
    set(q, { o: mira ? 1 : 0, s: pop(t, T.nunca, 0.35), r: Math.sin(t * 5) * 10 });
  };
});

/* L1b: «¿por qué son redondas?» — la tapa gira y alrededor asoman la cuadrada y el triángulo en fantasma */
plano(T.antes - 0.06, L(2) - 0.08, PAPEL, c => {
  rays(c, -160, 300, 1400, 24, 'rgba(255,230,0,.22)', 'rgba(0,0,0,0)', 0);
  const tit = texto(c, 320, 'Pero antes,<br>una pregunta…', { size: 84, italic: true });
  const tp = TAPA(c, 540, 840, 520, { code: ['D', '400'], z: 6 });
  const fant = [`<rect x="10" y="10" width="180" height="180" rx="10" fill="none" stroke="${INK}" stroke-width="8" stroke-dasharray="20 14"/>`, `<path d="M100,10 L190,180 L10,180 Z" fill="none" stroke="${INK}" stroke-width="8" stroke-dasharray="20 14" stroke-linejoin="round"/>`]
    .map((s, i) => figura(c, i ? 740 : 80, 1080, 190, 190, s, '0 0 200 200', { z: 5, origin: '50% 50%' }));
  const qs = [[90, 560], [820, 560]].map(([x, y], i) => qMark(c, x, y, 130, i ? PINK : YEL));
  sello(c, 1150, '¿REDONDAS?', T.redondas, { size: 120, r: -6 });
  sp(T.porque, 'pop2', 0.5); sp(T.porque + 0.2, 'pop', 0.5);
  return t => {
    set(tp, { r: t * 30, s: 1 + 0.02 * Math.sin(t * 3) });
    set(tit, { o: t < T.porque - 0.1 ? 1 : 0, r: wobble(t, 0.5, 0.8) });
    fant.forEach((f, i) => set(f, { o: t > T.porque ? 0.8 : 0, s: pop(t, T.porque + i * 0.2, 0.35), r: Math.sin(t * 2 + i) * 8 }));
    qs.forEach((q, i) => set(q, { o: t > T.porque ? 1 : 0, s: pop(t, T.porque + i * 0.15, 0.3), r: Math.sin(t * 5 + i) * 12 }));
  };
});

/* L2 · marca en el balcón */
marca(2);

/* L3 · «Te lo cuento en tres pasos»: tres tapas con 1, 2, 3 entran rodando */
plano(L(3) - 0.1, L(4) - 0.12, PAPEL, c => {
  rays(c, -160, 340, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const h = texto(c, 330, 'En tres ' + hlSpan('pasos', 'mhl'), { size: 110 });
  const ts = [1, 2, 3].map((n, i) => TAPA(c, 235 + i * 285, 760, 240, { num: String(n), z: 6 + i }));
  pinta(c, 'mhl', T.tres + 0.2);
  ts.forEach((_, i) => sp(T.tres - 0.3 + i * 0.15, i === 2 ? 'pop2' : 'pop', 0.5));
  return t => {
    set(h, { r: -2 + wobble(t, 0.5, 0.8) });
    ts.forEach((e, i) => { const k = p(t, T.tres - 0.75 + i * 0.15, 0.55, E.outCubic), dx = (1 - k) * 1100; set(e, { x: dx, r: -dx / 120 * 57.3 * 0.5 + Math.sin(t * 3 + i) * 4, y: Math.sin(t * 4 + i) * 6 }); });
  };
});

/* PASO 1 · la cuadrada se cuela (L4) */
paso(L(4) - 0.1, L(5) - 0.1, 1, 'Si fuera ' + hlSpan('cuadrada…', 'shl'), T.cuadrada);
plano(L(4) - 0.1, T.redonda - 0.08, ADOQ, c => {
  const CX = 540, CY = 960, S = 400;
  HUECO(c, CX, CY, S, true);
  const diag = figura(c, CX - 200, CY - 200, 400, 400, `<path d="M0,0 L400,400" stroke="${YEL}" stroke-width="12" stroke-dasharray="26 16" stroke-linecap="round"/>`, '0 0 400 400', { z: 4, origin: '50% 50%' });
  const tp = TAPA(c, CX, CY, 440, { sq: true, plain: true, z: 8 });
  const mL = MEDIDA(c, 320, 1210, 440, PINK, 'lado'), mD = MEDIDA(c, 247, 1288, 566, YEL, 'diagonal del agujero');
  const clonc = texto(c, 900, '¡CLONC!', { size: 120, color: YEL, shadow: OUTL(INK, 8), z: 40 });
  sello(c, 548, '¡SE CUELA!', T.agujero, { size: 110, r: -5 });
  sp(T.girarla - 0.1, 'swoosh_up', 0.5); sp(T.diagonal - 0.1, 'click', 0.5); sp(T.girarla, 'pop', 0.5); sp(T.girarla + 0.2, 'pop2', 0.5);
  sp(T.colaria + 0.05, 'whoosh', 0.6); sp(T.colaria + 0.6, 'thud', 1.0); shakeAt(T.colaria + 0.6, 0.35, 18);
  return t => {
    const kT = p(t, T.girarla - 0.1, 0.6, E.inOutCubic), kR = p(t, T.diagonal - 0.1, 0.75, E.inOutCubic), kF = p(t, T.colaria + 0.05, 0.6, E.inCubic);
    set(tp, { r: 45 * kR + (kT < 0.01 ? wobble(t, 0.4, 1.2) : 0), sx: 1 - 0.45 * kF, sy: lerp(1, 0.1, kT) * (1 - 0.45 * kF), o: 1 - p(t, T.colaria + 0.45, 0.2) });
    tp.style.filter = `brightness(${f1(1 - 0.7 * kF)})`;
    set(diag, { o: t > T.diagonal - 0.3 && t < T.agujero + 0.3 ? 0.6 + 0.4 * Math.abs(Math.sin(t * 6)) : 0 });
    set(mL, { o: t > T.girarla ? 1 : 0, sx: p(t, T.girarla, 0.4) }); set(mD, { o: t > T.girarla + 0.2 ? 1 : 0, sx: p(t, T.girarla + 0.2, 0.4) });
    set(clonc, { o: t > T.colaria + 0.6 && t < T.agujero + 0.5 ? 1 : 0, s: pop(t, T.colaria + 0.6, 0.3), r: -6 });
  };
});
/* la redonda: de canto y girando, siempre es más ancha que el agujero */
plano(T.redonda - 0.08, L(5) - 0.1, ADOQ, c => {
  const CX = 540, CY = 960;
  HUECO(c, CX, CY, 400, false);
  const tp = TAPA(c, CX, CY, 440, { code: ['D', '400'], z: 8 });
  const barra = box(c, CX - 220, CY - 22, 440, 44, { zIndex: 9, background: HIE2, border: `6px solid ${INK}`, borderRadius: '10px', boxSizing: 'border-box', transformOrigin: '50% 50%' },
    `<div style="position:absolute;left:-14px;top:-14px;width:44px;height:44px;border-radius:50%;background:${RED};border:6px solid ${INK}"></div><div style="position:absolute;right:-14px;top:-14px;width:44px;height:44px;border-radius:50%;background:${RED};border:6px solid ${INK}"></div>`);
  const mT = MEDIDA(c, 320, 1210, 440, PINK, 'tapa'), mA = MEDIDA(c, 340, 1288, 400, YEL, 'agujero');
  sello(c, 548, '¡NO CABE!', T.cabe, { size: 110, r: -5 });
  const T1 = T.redonda + 0.35, T2 = T1 + 0.5;
  sp(T.redonda, 'pop', 0.5); sp(T1, 'swoosh_up', 0.5); [0, 1, 2].forEach(i => sp(T2 + 0.3 + i * 0.55, 'click', 0.4)); sp(T.cabe + 0.25, 'boing', 0.6);
  return t => {
    const kT = p(t, T1, 0.5, E.inOutCubic), ang = Math.max(0, t - T2) * 70;
    set(tp, { s: pop(t, T.redonda - 0.08, 0.35), sy: lerp(1, 0.1, kT), r: wobble(t, 0.4, 1.5), o: kT < 0.98 ? 1 : 0 });
    set(barra, { o: kT >= 0.98 ? 1 : 0, r: ang, s: 1 + 0.03 * Math.sin(t * 9) });
    set(mT, { o: t > T1 ? 1 : 0, sx: p(t, T1, 0.4) }); set(mA, { o: t > T1 + 0.2 ? 1 : 0, sx: p(t, T1 + 0.2, 0.4) });
  };
});

/* PASO 2 · un solo operario la mueve rodando (L5) */
paso(L(5) - 0.1, L(6) - 0.1, 2, 'Se mueve ' + hlSpan('rodando', 'shl'), T.rodando);
plano(L(5) - 0.1, L(6) - 0.1, { background: '#cfe3ee' }, c => {
  const mundo = box(c, 0, 0, 1080, 1920, { zIndex: 1 });
  fachada(mundo, 520, 700, '#e3c69a');
  const suelo = box(mundo, -200, 1210, 4000, 900, Object.assign({ zIndex: 2 }, ADOQ));
  box(mundo, -200, 1200, 4000, 16, { zIndex: 3, background: INK });
  const op = PERS(c, 160, 868, 220, { ropa: '#f28c28', gorro: 'gorra', gcol: '#f2c230', piernas: true, pcol: '#3a2a1e', z: 8 });
  const tp = TAPA(c, 640, 1150, 320, { code: ['D', '400'], z: 7 });
  const uf = BOCADILLO(c, 120, 640, '¡UF!', { size: 60 });
  const gotas = [0, 1, 2].map(() => sudor(c, 0, 0));
  const uno = chip(c, 560, 600, '1 operario', { size: 56, bg: '#f28c28', color: INK, z: 30 });
  sp(T.pesa, 'squish', 0.6); sp(T.pesa + 0.3, 'pop', 0.5); sp(T.comoR + 0.3, 'swoosh_up', 0.6); sp(T.operario, 'pop2', 0.5); sp(T.rodando, 'sparkle', 0.5);
  const TR = T.operario - 0.25;
  return t => {
    const kU = p(t, T.comoR + 0.3, 0.45, E.outBack), dist = 900 * p(t, TR, L(6) - 0.1 - TR, E.inOutCubic);
    set(mundo, { x: -dist });
    // la tapa: tumbada (elipse) → de pie sobre el canto → rueda
    const tira = t < T.comoR + 0.3 ? Math.abs(Math.sin(t * 14)) * 8 * (t > T.pesa ? 1 : 0) : 0;
    set(tp, { y: lerp(0, -110, clamp(kU)) - tira, sy: lerp(0.3, 1, clamp(kU)), r: dist / 160 * 57.3 });
    // el operario: tira con todas sus fuerzas, luego empuja caminando
    const empuja = t > T.comoR + 0.3, xo = empuja ? lerp(0, 120, p(t, T.comoR + 0.3, 0.5)) : 0;
    set(op, { x: xo, r: empuja ? 8 : 12 + Math.sin(t * 20) * 3 * (t > T.pesa ? 1 : 0), y: empuja ? Math.abs(Math.sin(t * 10)) * -10 : 0 });
    pFace(op, t, empuja ? { feliz: 1, jaw: 0.3, look: [12, 0], seed: 4 } : { feliz: -1, jaw: 0.6, ceja: 8, closed: t > T.pesa, seed: 4 });
    set(uf, { o: t > T.pesa + 0.3 && t < T.comoR + 0.3 ? 1 : 0, s: pop(t, T.pesa + 0.3, 0.3), r: -6 + Math.sin(t * 12) * 3 });
    gotas.forEach((g, i) => { const k = ((t * 1.3 + i * 0.33) % 1); set(g, { o: t > T.pesa && t < T.comoR + 0.3 ? 1 - k : 0, x: 230 + i * 60 + k * (i - 1) * 40, y: 900 + k * 120 }); });
    set(uno, { o: t > T.operario - 0.1 ? 1 : 0, s: pop(t, T.operario - 0.1, 0.3), r: -4 + Math.sin(t * 3) * 2 });
  };
});

/* PASO 3 · lo que lleva grabado (L6): zoom a la letra y al número; flechas = carga */
paso(L(6) - 0.1, L(7) - 0.1, 3, 'Mira lo que lleva ' + hlSpan('grabado', 'shl'), T.grabado);
plano(L(6) - 0.1, L(7) - 0.1, { background: ASF }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: `radial-gradient(circle at 540px 980px, #555963, ${ASF} 55%)` });
  const tp = TAPA(cam, 540, 980, 760, { code: ['D', '400'], z: 4 });
  const fl = [300, 480, 660].map(x => flecha(cam, x, 380, 10));
  const cL = chip(c, 120, 1200, 'LETRA', { size: 60, bg: YEL, color: INK, z: 30 }), cN = chip(c, 560, 1200, 'NÚMERO', { size: 60, bg: YEL, color: INK, z: 30 });
  const cC = chip(c, 230, 1200, '= la carga que aguanta', { size: 56, bg: RED, z: 31 });
  const K = [[T.grabado - 0.6, 540, 980, 1.0], [T.letra - 0.1, 540, 980, 1.2], [T.letra + 0.35, 388, 984, 1.6], [T.numero - 0.1, 388, 984, 1.6], [T.numero + 0.35, 630, 984, 1.45], [T.carga - 0.15, 630, 984, 1.45], [T.carga + 0.4, 540, 900, 0.95]];
  sp(T.grabado, 'swoosh_up', 0.5); sp(T.letra + 0.1, 'ding', 0.6); sp(T.numero + 0.1, 'ding', 0.6); fl.forEach((_, i) => sp(T.carga + 0.4 + i * 0.12, 'thud', 0.6)); shakeAt(T.carga + 0.5, 0.3, 12);
  return t => {
    camK(cam, t, K);
    set(tp, { r: lerp(-20, 0, p(t, L(6) - 0.1, 1.2, E.outCubic)) });
    anillos(tp, t > T.letra ? 0.7 + 0.3 * Math.abs(Math.sin(t * 6)) : 0, t > T.numero ? 0.7 + 0.3 * Math.abs(Math.sin(t * 6)) : 0);
    const enC = t > T.carga - 0.1;
    set(cL, { o: t > T.letra && !enC ? 1 : 0, s: pop(t, T.letra, 0.3), r: -4 }); set(cN, { o: t > T.numero && !enC ? 1 : 0, s: pop(t, T.numero, 0.3), r: 4 });
    set(cC, { o: enC ? 1 : 0, s: pop(t, T.carga - 0.1, 0.3), r: -3 });
    fl.forEach((f, i) => { const k = p(t, T.carga + 0.25 + i * 0.12, 0.3, E.outBack); set(f, { o: t > T.carga + 0.25 + i * 0.12 ? 1 : 0, y: (1 - k) * -300 + Math.abs(Math.sin(t * 8 + i)) * 20 }); });
  };
});

/* L7 · B 125 = acera ≈ 12,5 t · D 400 = calzada ≈ 40 t (tarjetas fijas arriba); abajo: acera con pesa → calzada → el camión pasa por encima */
plano(L(7) - 0.1, L(8) - 0.1, { background: '#cfe3ee' }, c => {
  const tarjeta = (y, l, n, sitio, peso, z) => box(c, 60, y, 876, 116, { zIndex: z, background: '#FBF6EA', border: `7px solid ${INK}`, borderRadius: '26px', boxSizing: 'border-box', boxShadow: `8px 8px 0 ${INK}`, transformOrigin: '10% 50%', fontFamily: 'Playfair', fontWeight: 900, fontSize: '58px', lineHeight: '102px', color: INK, whiteSpace: 'nowrap', paddingLeft: '14px' },
    `<span style="display:inline-block;background:${HIE};color:#fff;font-family:Bricolage;font-weight:800;border-radius:16px;padding:0 18px;line-height:80px;border:5px solid ${INK}">${l} ${n}</span><span class="s1"> = ${sitio}</span><span class="s2"> ≈ <span style="background:${YEL};padding:0 10px;border-radius:10px">${peso}</span></span>`);
  const cA = tarjeta(310, 'B', '125', 'acera', '12,5 t', 40), cB = tarjeta(446, 'D', '400', 'calzada', '40 t', 41);
  // A · acera
  const A = box(c, 0, 0, 1080, 1920, { zIndex: 2 });
  fachada(A, 580, 620, '#e9b98f');
  box(A, -200, 1200, 1480, 800, Object.assign({}, ADOQ)); box(A, -200, 1190, 1480, 16, { background: INK });
  const tA = TAPA(A, 600, 1262, 340, { code: ['B', '125'], z: 4 }); set(tA, { sy: 0.32 });
  const pA = PERS(A, 0, 0, 190, { ropa: '#e8507a', pelo: 'largo', pcol: '#6b4a2a', piernas: true, z: 6 });
  const pesaA = PESA(A, 450, 940, 300, '12,5 t');
  // B · calzada (y el camión)
  const B = box(c, 0, 0, 1080, 1920, { zIndex: 3 });
  const camB = CAM(B);
  box(camB, -400, -200, 1880, 1400, { background: 'linear-gradient(#a9cbe0, #e7eef2)' });
  fachada(camB, 640, 560, '#c9b59a');
  const via = box(camB, -400, 1160, 1880, 900, { background: ASF });
  box(camB, -400, 1150, 1880, 16, { background: INK });
  box(camB, -400, 1440, 1880, 24, { background: 'repeating-linear-gradient(90deg, #f4efe2 0 110px, transparent 110px 220px)' });
  const tB = TAPA(camB, 560, 1300, 340, { code: ['D', '400'], z: 4 }); set(tB, { sy: 0.3 });
  const coche = figura(camB, 0, 1060, 360, 190, `<path d="M20,140 L20,90 Q20,70 50,66 L110,60 L160,14 L270,14 L320,60 L340,66 Q352,72 352,96 L352,140 Z" fill="#2b8ad6" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/><path d="M128,60 L168,24 L210,24 L210,60 Z M222,60 L222,24 L262,24 L298,60 Z" fill="#9fc6dc" stroke="${INK}" stroke-width="6"/><circle cx="90" cy="146" r="34" fill="#1d1e22" stroke="${INK}" stroke-width="7"/><circle cx="280" cy="146" r="34" fill="#1d1e22" stroke="${INK}" stroke-width="7"/>`, '0 0 370 190', { z: 6 });
  const cam_ = figura(camB, 0, 1010, 720, 324, camionInner('40 t'), '0 0 800 360', { z: 7 });
  const ok = check(camB, 760, 1000, 150);
  sp(T.b125, 'stamp', 0.7); sp(T.aceras, 'pop', 0.4); sp(T.doce - 0.3, 'whoosh', 0.5); sp(T.doce + 0.1, 'thud', 1.0); shakeAt(T.doce + 0.1, 0.35, 16);
  sp(T.d400 - 0.1, 'stamp', 0.7); sp(T.calzada, 'whoosh', 0.6); sp(T.cuarenta, 'pop', 0.4); sp(T.cuarenta + 0.2, 'drumroll', 0.4); sp(T.camion + 0.25, 'thud', 1.0); shakeAt(T.camion + 0.25, 0.4, 18); sp(T.camion + 0.55, 'tada', 0.6);
  const TB = T.d400 - 0.1, TC = T.cuarenta - 0.35;
  return t => {
    const ka = pop(t, T.b125 - 0.05, 0.4), kb = pop(t, T.d400 - 0.05, 0.4);
    set(cA, { s: ka, o: t > T.b125 - 0.05 ? 1 : 0, r: -1 + wobble(t, 0.3, 0.4) }); set(cB, { s: kb, o: t > T.d400 - 0.05 ? 1 : 0, r: 1 + wobble(t, 0.3, 0.4, 1) });
    cA.querySelector('.s1').style.opacity = t > T.aceras - 0.1 ? 1 : 0; cA.querySelector('.s2').style.opacity = t > T.doce - 0.1 ? 1 : 0;
    cB.querySelector('.s1').style.opacity = t > T.calzada - 0.1 ? 1 : 0; cB.querySelector('.s2').style.opacity = t > T.cuarenta - 0.1 ? 1 : 0;
    // A
    set(A, { o: t < TB ? 1 : 0 });
    set(pA, { x: lerp(980, -260, (t - L(7)) / 3.6), y: 955 + Math.abs(Math.sin(t * 10)) * -10 }); pFace(pA, t, { look: [-14, 0], jaw: 0.1, seed: 5, ceja: t > T.doce ? 10 : 0 });
    const kp = p(t, T.doce - 0.3, 0.4, E.inCubic), aplasta = t > T.doce + 0.1 ? Math.max(0, 1 - (t - T.doce - 0.1) / 0.3) : 0;
    set(pesaA, { y: lerp(-1300, 0, kp), sy: 1 - 0.08 * aplasta, o: t > T.doce - 0.3 ? 1 : 0 });
    set(tA, { sy: 0.32 * (1 - 0.1 * aplasta) });
    // B
    set(B, { o: t >= TB ? 1 : 0 });
    camK(camB, t, [[TB, 560, 1250, 1.25], [TC - 0.2, 600, 1240, 1.3], [TC + 0.4, 560, 1100, 1.0]]);
    set(coche, { x: lerp(-500, 1500, (t - T.calzada + 0.2) / 1.1), o: t > T.calzada - 0.2 && t < TC ? 1 : 0 }); coche.style.filter = 'blur(1.5px)';
    const kc = p(t, TC, T.camion + 0.25 - TC, E.outCubic), xc = lerp(-900, 120, kc);
    set(cam_, { x: xc, y: Math.sin(t * 14) * 2 * (kc < 1 ? 1 : 0), o: t > TC ? 1 : 0 }); ruedas(cam_, xc / 50 * 57.3);
    const peso = t > T.camion + 0.25 ? Math.max(0, 1 - (t - T.camion - 0.25) / 0.35) : 0; set(tB, { sy: 0.3 * (1 - 0.12 * peso) });
    set(ok, { o: t > T.camion + 0.55 ? 1 : 0, s: pop(t, T.camion + 0.55, 0.35) });
  };
});

/* L8 · OJO: no todas son redondas — la cuadrada se convierte en el corte de una arqueta poco profunda; el pozo hondo, tachado */
plano(L(8) - 0.1, L(9) - 0.1, PAPEL, c => {
  sello(c, 320, '¡OJO!', T.ojo, { size: 130, r: -6 });
  const tr = TAPA(c, 300, 700, 260, { code: ['D', '400'], z: 6 });
  const tc = TAPA(c, 700, 700, 260, { sq: true, plain: true, z: 7 });
  // corte del terreno (a la derecha del óvalo del Vecino)
  const corte = box(c, 400, 940, 560, 440, { zIndex: 3 });
  corte.innerHTML = `<svg width="560" height="440" style="overflow:visible"><rect x="0" y="20" width="540" height="420" fill="#8a6a48" stroke="${INK}" stroke-width="6"/>
    ${[...Array(40)].map((_, i) => `<circle cx="${(i * 97) % 520 + 10}" cy="${60 + (i * 53) % 370}" r="5" fill="#6d5236"/>`).join('')}
    <rect x="0" y="10" width="540" height="20" fill="#cfc8bb" stroke="${INK}" stroke-width="5"/>
    <rect x="100" y="22" width="340" height="170" fill="#4b4e55" stroke="${INK}" stroke-width="7"/><rect x="120" y="22" width="300" height="150" fill="#2b2d33"/>
    <path d="M120,120 C200,100 300,140 420,110" stroke="#e8507a" stroke-width="12" fill="none"/><path d="M120,145 C220,130 320,160 420,140" stroke="#2e9e6b" stroke-width="12" fill="none"/></svg>`;
  const prof = box(c, 410, 966, 80, 150, { zIndex: 9 }, `<svg width="80" height="150"><path d="M40,6 V144 M20,26 L40,6 L60,26 M20,124 L40,144 L60,124" stroke="${YEL}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M40,6 V144 M20,26 L40,6 L60,26 M20,124 L40,144 L60,124" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`);
  const cProf = chip(c, 470, 1150, 'poco profunda', { size: 50, bg: YEL, color: INK, z: 30 });
  const cArq = chip(c, 600, 830, 'arqueta', { size: 50, bg: PINK, z: 30 });
  const pozo = box(c, 560, 1130, 240, 240, { zIndex: 8 }, `<svg width="240" height="240" style="overflow:visible"><rect x="20" y="0" width="200" height="400" fill="none" stroke="#fff" stroke-width="7" stroke-dasharray="18 12"/><path d="M40,40 L200,200 M200,40 L40,200" stroke="${RED}" stroke-width="22" stroke-linecap="round"/></svg>`);
  sp(T.noTodas + 0.2, 'pop2', 0.5); sp(T.cuadradas, 'swoosh_up', 0.6); sp(T.arquetas, 'pop', 0.5); sp(T.profundas, 'click', 0.5); sp(T.pozo + 0.1, 'error', 0.6);
  return t => {
    const kq = p(t, T.cuadradas - 0.1, 0.6, E.inOutCubic);
    set(tr, { o: 1 - kq, x: -400 * kq, r: t * 20, s: pop(t, L(8) - 0.1, 0.3) });
    // la cuadrada baja y se aplasta hasta ser la tapa del corte (y 960, ancho 340)
    set(tc, { o: t > T.noTodas ? 1 : 0, s: pop(t, T.noTodas + 0.2, 0.35) * lerp(1, 1.31, kq), sy: lerp(1, 0.07, kq), x: lerp(0, -30, kq), y: lerp(0, 245, kq), r: (1 - kq) * wobble(t, 0.4, 4) });
    set(corte, { o: t > T.cuadradas - 0.1 ? 1 : 0, y: (1 - p(t, T.cuadradas - 0.1, 0.5, E.outCubic)) * 300 });
    set(cArq, { o: t > T.arquetas ? 1 : 0, s: pop(t, T.arquetas, 0.3), r: -4 });
    set(prof, { o: t > T.profundas ? 1 : 0, sy: p(t, T.profundas, 0.3) }); set(cProf, { o: t > T.profundas ? 1 : 0, s: pop(t, T.profundas + 0.1, 0.3), r: 3 });
    set(pozo, { o: t > T.pozo - 0.2 ? 1 : 0, s: pop(t, T.pozo - 0.2, 0.3) });
  };
});

/* L9 · REMATE: una B en mitad de la carretera; llega un camión, la tapa suda… ¡ERROR! */
plano(L(9) - 0.1, L(10) - 0.1, { background: ASF }, c => {
  const cam = CAM(c);
  box(cam, -800, -1200, 2680, 4200, { zIndex: 0, background: ASF, backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 2px, transparent 2px)', backgroundSize: '22px 22px' });
  box(cam, 80, -1200, 14, 4200, { zIndex: 1, background: '#f4efe2' }); box(cam, 986, -1200, 14, 4200, { zIndex: 1, background: '#f4efe2' });
  const raya = box(cam, 470, -1400, 18, 4600, { zIndex: 1, background: 'repeating-linear-gradient(#f4efe2 0 110px, transparent 110px 220px)' });
  const tp = TAPA(cam, 730, 890, 300, { code: ['B', '125'], ojos: true, z: 4 });
  const coches = ['#2b8ad6', '#e8507a', '#2e9e6b'].map(col => COCHE_ARRIBA(cam, col));
  const cm = CAMION_ARRIBA(cam, 600, -800, 6);
  const gotas = [0, 1].map(() => sudor(cam, 0, 0));
  const s = sello(c, 830, '¡ERROR!', T.equivocado, { size: 124, r: -8 }); s.style.left = '100px';
  sp(T.unaB, 'ding', 0.6); sp(T.carretera + 0.6, 'whoosh', 0.5); sp(T.equivocado - 0.35, 'scratch', 0.8);
  emu(T.carretera + 0.7);
  const K = [[L(9) - 0.1, 600, 900, 1.0], [T.unaB - 0.1, 600, 900, 1.0], [T.unaB + 0.35, 707, 874, 1.7], [T.carretera + 0.3, 707, 874, 1.7], [T.carretera + 1.1, 600, 800, 0.9], [T.equivocado, 640, 820, 1.0]];
  return t => {
    camK(cam, t, K);
    set(raya, { y: (t * 300) % 220 });
    coches.forEach((e, i) => { const k = ((t - L(9)) * 0.55 + i * 0.36) % 1; set(e, { x: 190, y: lerp(-500, 2200, k) }); });
    const kc = p(t, T.carretera + 0.4, T.equivocado - 0.3 - T.carretera - 0.4, E.outCubic);
    set(cm, { y: lerp(-300, 760, kc) + (t > T.equivocado - 0.3 ? Math.sin(t * 40) * 4 * Math.max(0, 1 - (t - T.equivocado + 0.3) / 0.4) : 0) });
    const miedo = t > T.carretera + 0.6;
    const pu = tp.querySelector('.pup'); if (pu) pu.setAttribute('transform', `translate(0 ${miedo ? -14 : 0})`);
    const bo = tp.querySelector('.boca'); if (bo) bo.setAttribute('d', miedo ? `M150,330 Q200,${f1(290 + 10 * Math.sin(t * 30))} 250,330` : 'M150,320 Q200,345 250,320');
    set(tp, { r: miedo ? Math.sin(t * 30) * 2 : wobble(t, 0.3, 2), s: 1 + (t > T.unaB && t < T.unaB + 0.4 ? 0.06 : 0) });
    anillos(tp, t > T.unaB ? 0.7 + 0.3 * Math.abs(Math.sin(t * 6)) : 0, 0);
    gotas.forEach((g, i) => { const k = ((t * 1.4 + i * 0.5) % 1); set(g, { o: miedo ? 1 - k : 0, x: 600 + i * 240, y: 760 + k * 90 }); });
  };
});

/* L10 · CTA de seguir */
sigueme(10, 'Esto en clase…', '¡no te lo cuentan!', 'sígueme');

/* L11 · pregunta final (+ «Os leo») */
preguntaFinal('¿Qué letra pone', 'en la tuya?', { size: 96, draw: c => [['B', '125'], ['D', '400'], null].forEach((code, i) => aparece(TAPA(c, 250 + i * 290, 680, 230, code ? { code } : { num: '?' }), L(11) + 0.4 + i * 0.3, { sfx: 'pop' })) });

/* L12 · cierre */
cierre(301, 'La alcantarilla', ['TU CALLE', 'de verdad']);

Story.run({
  textura: true,
  ovalo: [[L(1) + 0.1, T.antes - 0.15], [L(3) - 0.05, L(4) - 0.15], [L(8), L(10) - 0.15]],
  vecino: { risa: [[T.tapaR, L(10) - 0.2]], sorpresa: [[T.nunca, T.nunca + 0.8], [T.ojo, T.ojo + 0.9]], golpes: [T.equivocado] },
});
