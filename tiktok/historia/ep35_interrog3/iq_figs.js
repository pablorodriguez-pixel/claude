/* Ep. 35 (rehecho del Ep. 29) · «¿» — tiempos clave (todo por TEXTO con find()) + figuras de grabado recortado */
const ws = i => W[i].s, wE = i => W[i].e;
const K = {};
{
  K.cerv0 = ws(0); K.nunca = ws(1); K.escribio = ws(2); K.signo0 = ws(4); K.y0 = ws(5); K.tu0 = ws(6); K.usas = ws(8); K.todos = ws(9); K.dias = ws(11);
  const i1 = find('en todo el quijote'); K.en1 = ws(i1); K.quijote = ws(i1 + 3); K.ni = ws(i1 + 6); K.solo = ws(i1 + 8); K.abrir1 = ws(i1 + 11); K.preg1 = ws(i1 + 12); K.ni2 = ws(i1 + 13); K.uno = ws(i1 + 14);
  const is = find('soy tu vecino', i1); K.isoy = is; K.soy = ws(is); K.vecino = ws(is + 2); K.iye2 = is + 3; K.esto2 = ws(is + 4); K.libro2 = ws(is + 9);
  const i3 = find('entonces por que lo usamos', is); K.entonces = ws(i3); K.usamos = ws(i3 + 4); K.nosotros = ws(i3 + 5); K.casi = ws(i3 + 7); K.nadie = ws(i3 + 8); K.mas3 = ws(i3 + 9); K.por3 = ws(i3 + 10); K.tres3 = ws(i3 + 11); K.cosas = ws(i3 + 12);
  const i4 = find('una en tiempos de cervantes', i3); K.una = ws(i4); K.tiempos = ws(i4 + 2); K.cerv4 = ws(i4 + 4); K.no4 = ws(i4 + 5); K.existia = ws(i4 + 6); K.existiaE = wE(i4 + 6); K.invento = ws(i4 + 8);
  K.real = ws(i4 + 10); K.academia = ws(i4 + 11); K.mil = ws(i4 + 13); K.cuatro = ws(i4 + 17); K.cuando = ws(i4 + 18); K.mas4 = ws(i4 + 21); K.cien = ws(i4 + 23); K.muerto = ws(i4 + 25);
  const i5 = find('dos en espanol la pregunta', i4); K.dos = ws(i5); K.espanol = ws(i5 + 2); K.preg5 = ws(i5 + 4); K.tono = ws(i5 + 8); K.tonoE = wE(i5 + 8);
  K.tienes1 = ws(i5 + 9); K.hambre1E = wE(i5 + 10); K.y5 = ws(i5 + 11); K.tienes2 = ws(i5 + 12); K.hambre2 = ws(i5 + 13); K.hambre2E = wE(i5 + 13); K.son = ws(i5 + 14); K.mismas = ws(i5 + 16); K.palabras = ws(i5 + 17);
  K.sin5 = ws(i5 + 18); K.abrir5 = ws(i5 + 22); K.en5 = ws(i5 + 23); K.frase = ws(i5 + 25); K.larga = ws(i5 + 26); K.sabias = ws(i5 + 28); K.preg5b = ws(i5 + 32); K.final = ws(i5 + 35);
  const i6 = find('y tres costo muchisimo', i5); K.y6 = ws(i6); K.costo = ws(i6 + 2); K.muchisimo = ws(i6 + 3); K.gente = ws(i6 + 6); K.usara = ws(i6 + 8); K.todavia = ws(i6 + 9); K.siglo = ws(i6 + 12); K.xix = ws(i6 + 13);
  K.imprimian = ws(i6 + 15); K.libros = ws(i6 + 16); K.sin6 = ws(i6 + 17);
  const i7 = find('ojo el quijote que leiste', i6); K.ojo = ws(i7); K.quijote7 = ws(i7 + 2); K.cole = ws(i7 + 7); K.si7 = ws(i7 + 8); K.lleva = ws(i7 + 10); K.se7 = ws(i7 + 11); K.pusieron = ws(i7 + 13); K.despues = ws(i7 + 14); K.despuesE = wE(i7 + 14);
  const i8 = find('o sea cervantes tenia excusa', i7); K.osea = ws(i8); K.cerv8 = ws(i8 + 2); K.tenia = ws(i8 + 3); K.excusa = ws(i8 + 4); K.ponerlo = ws(i8 + 7); K.tu8 = ws(i8 + 8); K.whats = ws(i8 + 11); K.no8 = ws(i8 + 12);
  const i9 = find('tu lo pones cuando escribes', i8); K.i9 = i9; K.tu9 = ws(i9); K.pones = ws(i9 + 2); K.escribes = ws(i9 + 4); K.eres = ws(i9 + 6); K.no9 = ws(i9 + 10); K.os = ws(i9 + 11); K.leo = ws(i9 + 12);
  const iye = find('y esto no venia en el libro', i9); K.iye = iye; K.ye = ws(iye); K.esto = ws(iye + 1); K.enL = ws(iye + 4); K.libro = ws(iye + 6); K.END = wE(iye + 6);
}
/* cortes de escena: un plano nuevo cada 1,5–2,5 s; ningún dato menos de 1,5 s en pantalla */
const S = {
  A0: [-1, K.y0 - 0.06], A1: [K.y0 - 0.06, K.en1 - 0.06], B1: [K.en1 - 0.06, K.soy - 0.08],
  BAL: [K.soy - 0.08, K.entonces - 0.08], C1: [K.entonces - 0.08, K.por3 - 0.08], C2: [K.por3 - 0.08, K.una - 0.06],
  D1: [K.una - 0.06, K.invento - 0.08], D2: [K.invento - 0.08, K.cuando - 0.06], D3: [K.cuando - 0.06, K.dos - 0.08],
  E1: [K.dos - 0.08, K.tienes1 - 0.1], E2: [K.tienes1 - 0.1, K.en5 - 0.06], E4: [K.en5 - 0.06, K.y6 - 0.08],
  G1: [K.y6 - 0.08, K.todavia - 0.06], G2: [K.todavia - 0.06, K.ojo - 0.08],
  H1: [K.ojo - 0.08, K.si7 - 0.08], H2: [K.si7 - 0.08, K.osea - 0.06],
  K1: [K.osea - 0.06, K.tu8 - 0.08], K3: [K.tu8 - 0.08, K.tu9 + 0.45], K4: [K.tu9 + 0.45, K.ye - 0.1], BK: [K.ye - 0.1, 999],
};
const DUR = K.END + 0.6, LOOP = DUR - 0.4;
const SEPIA = '#5a3d28', CREAM = '#FBF6EA', LAV = '#E4DCF0';

/* ---------- el signo de grabado gigante («¿» o «?») como SVG de texto con trama ---------- */
// caja 600x900; el glifo se dibuja centrado. col: relleno; o.white: recorte blanco
function glyphSvg(ch, o = {}) {
  const fs = o.fs || 820, col = o.col || SEPIA, id = uid('gl');
  const T = (extra) => `<text x="300" y="${o.base || 700}" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="${fs}" ${extra}>${ch}</text>`;
  return `<svg viewBox="0 0 600 900" width="100%" height="100%" style="overflow:visible">
  ${T(`fill="${SH}" stroke="${SH}" stroke-width="26" stroke-linejoin="round" transform="translate(14,18)"`)}
  ${T(`fill="#fff" stroke="#fff" stroke-width="30" stroke-linejoin="round"`)}
  ${T(`fill="${col}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"`)}
  ${T(`fill="url(#hA)" opacity=".55"`)}
  ${o.hl === false ? '' : T(`fill="none" stroke="#fff" stroke-width="5" opacity=".35" transform="translate(-9,-7)"`)}</svg>`;
}

/* ---------- CERVANTES (busto 360x460): gola, perilla, entradas, jubón negro ---------- */
function cervInner(seed = 29) {
  let s = bustInner({ uniform: 'soldier', moustache: true, seed });
  const doublet = `<path d="M28,460 C32,384 80,338 140,328 L220,328 C280,338 328,384 332,460 Z" fill="#221a16" stroke="${INK}" stroke-width="3"/><path d="M28,460 C32,384 80,338 140,328 L220,328 C280,338 328,384 332,460 Z" fill="url(#hW)" opacity=".2"/>`
    + `<path d="M180,370 V460" stroke="${BRASS}" stroke-width="3" stroke-dasharray="2 16"/>` + [380, 404, 428, 452].map(y => `<circle cx="180" cy="${y}" r="5" fill="${BRASS}" stroke="${INK}" stroke-width="2"/>`).join('');
  let ruff = ''; const N = 22;
  for (let k = 0; k < N; k++) { const a = Math.PI * (0.02 + 0.96 * k / (N - 1)); const x = 180 - Math.cos(a) * 104, y = 334 + Math.sin(a) * 30; ruff += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="16" ry="24" fill="#fff" stroke="${INK}" stroke-width="2.6"/>`; }
  ruff = `<ellipse cx="180" cy="330" rx="112" ry="38" fill="#fff" stroke="${INK}" stroke-width="3.5"/>` + ruff + `<ellipse cx="180" cy="322" rx="70" ry="18" fill="#efe7d6" stroke="${INK}" stroke-width="2.5"/>`;
  s = s.replace('<g class="jaw">', doublet + ruff + '<g class="jaw">');
  const goatee = `<path d="M152,298 C164,312 196,312 208,298 C206,326 194,352 180,372 C166,352 154,326 152,298 Z" fill="#3a2e28" stroke="${INK}" stroke-width="3"/><path d="M160,310 q20,40 20,58 M200,310 q-20,40 -20,58 M180,312 v54" stroke="#8a7a6a" stroke-width="1.6" fill="none"/>`;
  s = s.replace(/(<g class="jaw">[\s\S]*?)(<\/g><g class="headg">)/, `$1${goatee}$2`);
  const hairL = 'M112,236 C98,196 104,164 126,150 C124,180 130,206 140,232 Z', hairR = 'M248,236 C262,196 256,164 234,150 C236,180 230,206 220,232 Z';
  s += D(hairL, '#4a3a30') + HF(hairL, 'hD') + D(hairR, '#4a3a30') + HF(hairR, 'hD');
  s += `<path d="M150,150 q30,-8 60,0" stroke="${INK}" stroke-width="2" fill="none" opacity=".5"/>`;
  return s;
}
const mkCerv = (pa, b, seed) => mk(pa, b, cervInner(seed), '0 0 360 460', 'bust');

/* ---------- impresor (gorra + delantal) ---------- */
function printerInner() {
  let s = bustInner({ uniform: 'farmer', moustache: true, seed: 33 });
  const apron = 'M96,380 L264,380 L280,470 L80,470 Z';
  s += D(apron, '#e8dcc2', 3) + HF(apron, 'hP') + `<path d="M96,380 L140,330 M264,380 L220,330" stroke="${INK}" stroke-width="4"/>`;
  s += `<path d="M120,420 q12,-6 22,4 M210,440 q16,-8 26,2" stroke="${INK}" stroke-width="5" fill="none" opacity=".55"/>`;
  return s + capOver();
}
/* ---------- lector (para la frase larga) ---------- */
function readerInner() { return bustInner({ uniform: 'soldier', seed: 52 }) + coatOver('#3a3048') + specsOver() + hairOverN(); }
const hairOverN = () => { const h = 'M116,206 C104,140 140,112 184,112 C232,112 260,142 246,206 C238,170 214,150 182,150 C150,150 126,168 116,206 Z'; return D(h, '#3a2a1e') + HF(h, 'hF'); };

/* ---------- objetos ---------- */
// lupa (0 0 300 300; lente centrada en 110,110 r 90)
const lupaSvg = () => `<svg viewBox="0 0 300 300" width="100%" height="100%" style="overflow:visible">${cut('<circle cx="110" cy="110" r="104"/><path d="M180,180 L290,290 L270,300 L170,196 Z"/>', 6, 8)}
  <path d="M184,176 L292,284 Q296,296 284,296 L176,188 Z" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><path d="M184,176 L292,284 Q296,296 284,296 L176,188 Z" fill="url(#hA)" opacity=".5"/>
  <circle cx="110" cy="110" r="100" fill="none" stroke="${INK}" stroke-width="22"/><circle cx="110" cy="110" r="100" fill="none" stroke="${BRASS}" stroke-width="13"/>
  <circle cx="110" cy="110" r="88" fill="rgba(255,255,255,.18)"/><path d="M52,70 Q70,40 104,34" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" opacity=".8"/></svg>`;
// móvil moderno de grabado (0 0 440 860)
function phoneSvg(inner = '', o = {}) {
  const body = 'M40,0 H400 Q440,0 440,40 V820 Q440,860 400,860 H40 Q0,860 0,820 V40 Q0,0 40,0 Z';
  return `<svg viewBox="0 0 440 860" width="100%" height="100%" style="overflow:visible">${cut(P(body), 10, 12)}${D(body, '#1f1a17', 6)}<path d="${body}" fill="url(#hW)" opacity=".25"/>
  <rect x="22" y="44" width="396" height="772" rx="18" fill="${o.screen || CREAM}" stroke="${INK}" stroke-width="4"/><rect x="170" y="18" width="100" height="12" rx="6" fill="#3a3330"/>${inner}</svg>`;
}
// emblema académico de grabado: crisol sobre el fuego + cinta (0 0 600 640)
function emblemSvg() {
  const rid = uid('ribP');
  const pot = 'M170,250 Q166,410 300,430 Q434,410 430,250 Z', rim = 'M150,236 H450 V262 H150 Z';
  let fl = ''; [[210, 0], [250, 1], [300, 0], [350, 1], [390, 0]].forEach(([x, k]) => { const h = k ? 120 : 90; fl += `<path d="M${x - 30},530 Q${x - 34},${530 - h * 0.6} ${x},${530 - h} Q${x + 34},${530 - h * 0.6} ${x + 30},530 Z" fill="${k ? '#F2983E' : RED}" stroke="${INK}" stroke-width="4"/>`; });
  let wood = ''; [[150, 540, 450, 520], [160, 520, 440, 545]].forEach(q => wood += `<path d="M${q[0]},${q[1]} L${q[2]},${q[3]}" stroke="${INK}" stroke-width="26" stroke-linecap="round"/><path d="M${q[0]},${q[1]} L${q[2]},${q[3]}" stroke="${WOOD}" stroke-width="16" stroke-linecap="round"/>`);
  let s = cut(P(pot) + P(rim) + '<path d="M120,470 Q300,560 480,470 L470,520 Q300,610 130,520 Z"/>', 8, 10);
  s += fl + wood + D(pot, '#9a8a70', 5) + clipG(uid('pot'), pot, `<rect x="330" y="240" width="120" height="200" fill="url(#hD)"/><rect x="160" y="240" width="300" height="200" fill="url(#hA)" opacity=".4"/>`) + D(rim, '#b8a888', 5);
  s += `<path d="M200,236 Q300,200 400,236" fill="#E9C75C" stroke="${INK}" stroke-width="4"/>`;
  for (let k = 0; k < 7; k++) s += `<circle cx="${220 + k * 26}" cy="${222 - Math.sin(k / 6 * Math.PI) * 14}" r="6" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
  s += `<path d="M300,190 L300,120 M260,196 L240,140 M340,196 L360,140" stroke="${YEL}" stroke-width="8" stroke-linecap="round"/><path d="M300,190 L300,120 M260,196 L240,140 M340,196 L360,140" stroke="${INK}" stroke-width="2" stroke-linecap="round" fill="none" opacity=".6"/>`;
  // cinta con el lema
  const rib = 'M60,470 Q300,560 540,470 L530,530 Q300,620 70,530 Z';
  s += D(rib, CREAM, 5) + `<path d="M60,470 L20,520 L70,530 M540,470 L580,520 L530,530" fill="${CREAM}" stroke="${INK}" stroke-width="5"/>`;
  s += `<path id="${rid}" d="M80,512 Q300,600 520,512" fill="none"/><text font-family="Playfair" font-weight="900" font-size="27" fill="${INK}" letter-spacing="1"><textPath href="#${rid}" startOffset="50%" text-anchor="middle">LIMPIA, FIJA Y DA ESPLENDOR</textPath></text>`;
  return `<svg viewBox="0 0 600 640" width="100%" height="100%" style="overflow:visible">${s}</svg>`;
}
// libro antiguo de pie (0 0 360 480) con título
function oldBookSvg(t1, t2, col = LEATHER) {
  const b = 'M20,10 H330 Q350,10 350,30 V460 Q350,476 330,476 H20 Z';
  return `<svg viewBox="0 0 360 480" width="100%" height="100%" style="overflow:visible">${cut(P(b))}${D(b, col, 5)}<path d="${b}" fill="url(#hW)" opacity=".25"/><rect x="20" y="10" width="40" height="466" fill="rgba(0,0,0,.25)"/>
  <rect x="80" y="60" width="240" height="360" rx="6" fill="none" stroke="${GOLD}" stroke-width="4"/><path d="M80,120 H320 M80,360 H320" stroke="${GOLD}" stroke-width="2"/>
  <text x="200" y="230" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="40" fill="${GOLD}">${t1}</text><text x="200" y="290" text-anchor="middle" font-family="Rye" font-size="28" fill="${GOLD}">${t2}</text></svg>`;
}
// caja de tipos (0 0 560 240)
function typeCaseSvg() {
  let s = cut('<rect x="0" y="0" width="560" height="240" rx="10"/>', 6, 8) + `<rect x="0" y="0" width="560" height="240" rx="10" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="0" y="0" width="560" height="240" fill="url(#hW)" opacity=".3"/>`;
  const L = 'abcdefghijlmnñopqrstuvxyz.,;!?'; let k = 0;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 7; c++) { const x = 16 + c * 77, y = 16 + r * 72; s += `<rect x="${x}" y="${y}" width="70" height="64" fill="#7a5232" stroke="${INK}" stroke-width="3"/><text x="${x + 35}" y="${y + 46}" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="38" fill="#e8dcc2">${L[(k++ * 7) % L.length]}</text>`; }
  return `<svg viewBox="0 0 560 240" width="100%" height="100%" style="overflow:visible">${s}</svg>`;
}
// tipo móvil de plomo con un signo (0 0 120 150)
const typeBlockSvg = (ch = '¿', col = '#9a9a90') => `<svg viewBox="0 0 120 150" width="100%" height="100%" style="overflow:visible">${cut('<rect x="10" y="10" width="100" height="130" rx="6"/>', 4, 6)}<rect x="10" y="10" width="100" height="130" rx="6" fill="${col}" stroke="${INK}" stroke-width="5"/><rect x="10" y="10" width="100" height="130" fill="url(#hA)" opacity=".4"/><rect x="18" y="18" width="84" height="84" fill="#5E5A52" stroke="${INK}" stroke-width="3"/><text x="60" y="88" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="80" fill="#fff" stroke="${INK}" stroke-width="2">${ch}</text><path d="M30,120 h60" stroke="${INK}" stroke-width="4"/></svg>`;
// prensa de imprenta de grabado (0 0 520 760)
function pressSvg() {
  const frame = 'M60,40 H460 V120 H400 V700 H460 V740 H60 V700 H120 V120 H60 Z';
  let s = cut(P(frame), 8, 10) + D(frame, WOOD, 6) + `<path d="${frame}" fill="url(#hW)" opacity=".35"/>`;
  s += `<rect x="236" y="120" width="48" height="200" fill="#8E8A80" stroke="${INK}" stroke-width="5"/>`;
  for (let y = 130; y < 320; y += 18) s += `<path d="M236,${y} L284,${y + 10}" stroke="${INK}" stroke-width="3"/>`;
  s += `<g class="plat"><rect x="150" y="320" width="220" height="60" fill="#5E5A52" stroke="${INK}" stroke-width="5"/><rect x="150" y="320" width="220" height="60" fill="url(#hD)" opacity=".5"/></g>`;
  s += `<g class="bar"><path d="M260,180 L470,140" stroke="${INK}" stroke-width="18" stroke-linecap="round"/><path d="M260,180 L470,140" stroke="#8E8A80" stroke-width="8" stroke-linecap="round"/><circle cx="472" cy="140" r="20" fill="${WOOD}" stroke="${INK}" stroke-width="5"/></g>`;
  s += `<rect x="110" y="560" width="300" height="40" fill="#3a2a1e" stroke="${INK}" stroke-width="5"/><rect x="140" y="520" width="240" height="40" fill="${CREAM}" stroke="${INK}" stroke-width="4"/>`;
  return `<svg viewBox="0 0 520 760" width="100%" height="100%" style="overflow:visible">${s}</svg>`;
}
// hoja impresa (0 0 220 290) con renglones que acaban en «?»
const sheetSvg = (seed = 1) => { const r = rng(seed); let l = ''; for (let i = 0; i < 7; i++) { const w = 120 + r() * 50; l += `<path d="M24,${50 + i * 30} H${f1(24 + w)}" stroke="${INK}" stroke-width="7" opacity=".5"/>`; if (i % 3 === 1) l += `<text x="${f1(34 + w)}" y="${62 + i * 30}" font-family="Playfair" font-weight="900" font-size="34" fill="${INK}">?</text>`; } return `<svg viewBox="0 0 220 290" width="100%" height="100%" style="overflow:visible">${cut('<rect x="0" y="0" width="220" height="290"/>', 5, 7)}<rect x="0" y="0" width="220" height="290" fill="${CREAM}" stroke="${INK}" stroke-width="4"/>${l}</svg>`; };
// papelera de mimbre (0 0 220 220)
const binSvg = () => { let w = ''; for (let x = 30; x < 200; x += 22) w += `<path d="M${x},40 L${x + 6},210" stroke="${INK}" stroke-width="2.5"/>`; for (let y = 60; y < 210; y += 24) w += `<path d="M24,${y} H196" stroke="${INK}" stroke-width="2" opacity=".6"/>`; const b = 'M14,30 H206 L188,214 H32 Z'; return `<svg viewBox="0 0 220 220" width="100%" height="100%" style="overflow:visible">${cut(P(b), 5, 7)}${D(b, '#C9A46A', 5)}${clipG(uid('bn'), b, w)}<rect x="6" y="20" width="208" height="22" rx="8" fill="#B8874F" stroke="${INK}" stroke-width="5"/></svg>`; };
// tijeras (0 0 320 160), apuntando a la izquierda
const scissorsSvg = () => `<svg viewBox="0 0 320 160" width="100%" height="100%" style="overflow:visible">${cut('<path d="M10,70 L200,60 L200,82 Z M10,90 L200,100 L200,78 Z"/><circle cx="250" cy="44" r="38"/><circle cx="250" cy="116" r="38"/>', 5, 7)}
  <path d="M10,72 L210,58 L214,80 Z" fill="#cfc8b8" stroke="${INK}" stroke-width="4"/><path d="M10,88 L210,102 L214,80 Z" fill="#e8e2d4" stroke="${INK}" stroke-width="4"/>
  <circle cx="250" cy="44" r="34" fill="none" stroke="${INK}" stroke-width="18"/><circle cx="250" cy="44" r="34" fill="none" stroke="${RED}" stroke-width="10"/><circle cx="250" cy="116" r="34" fill="none" stroke="${INK}" stroke-width="18"/><circle cx="250" cy="116" r="34" fill="none" stroke="${RED}" stroke-width="10"/><circle cx="206" cy="80" r="8" fill="${INK}"/></svg>`;
// Quijote escolar moderno (genérico), abierto (0 0 900 600)
function schoolBookSvg() {
  let l1 = '', l2 = ''; for (let i = 0; i < 11; i++) { l1 += `<path d="M70,${120 + i * 38} H${i % 4 === 3 ? 300 : 400}" stroke="${INK}" stroke-width="7" opacity=".45"/>`; l2 += `<path d="M500,${120 + i * 38} H${i % 5 === 2 ? 700 : 830}" stroke="${INK}" stroke-width="7" opacity=".45"/>`; }
  return `<svg viewBox="0 0 900 600" width="100%" height="100%" style="overflow:visible">${cut('<path d="M10,40 Q230,0 450,40 Q670,0 890,40 V580 Q670,540 450,580 Q230,540 10,580 Z"/>', 8, 10)}
  <path d="M10,40 Q230,0 450,40 Q670,0 890,40 V580 Q670,540 450,580 Q230,540 10,580 Z" fill="#2f6fb0" stroke="${INK}" stroke-width="6"/>
  <path d="M30,50 Q230,16 450,56 V560 Q230,524 30,560 Z" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M870,50 Q670,16 450,56 V560 Q670,524 870,560 Z" fill="#fff" stroke="${INK}" stroke-width="4"/>
  <path d="M450,56 V560" stroke="${INK}" stroke-width="5"/><rect x="430" y="50" width="40" height="514" fill="url(#hA)" opacity=".35"/>${l1}${l2}</svg>`;
}
/* ---------- mapa de España (noroeste) ---------- */
const ESP = [[-9.3, 43.0], [-8.2, 43.7], [-7.0, 43.55], [-5.7, 43.6], [-4.5, 43.4], [-3.0, 43.45], [-1.8, 43.4], [-1.4, 43.05], [-0.7, 42.85], [0.7, 42.85], [1.7, 42.5], [3.2, 42.4], [3.2, 41.9], [2.2, 41.3], [0.9, 41.0], [0.5, 40.6], [-0.3, 39.5], [0.2, 38.8], [-0.5, 38.3], [-0.8, 37.6], [-1.6, 37.3], [-2.1, 36.7], [-3.5, 36.75], [-4.4, 36.7], [-5.3, 36.1], [-6.0, 36.3], [-6.4, 36.8], [-7.4, 37.2], [-7.5, 37.6], [-7.0, 38.2], [-7.3, 38.5], [-7.0, 39.0], [-7.5, 39.6], [-6.9, 40.2], [-6.8, 41.0], [-6.2, 41.6], [-6.6, 41.95], [-8.1, 41.8], [-8.9, 41.9], [-8.8, 42.5]];
const GAL = [[-9.3, 43.0], [-8.2, 43.7], [-7.05, 43.55], [-6.85, 43.15], [-6.85, 42.45], [-7.0, 41.95], [-8.1, 41.8], [-8.9, 41.9], [-8.8, 42.5]];
const AST = [[-7.05, 43.55], [-5.7, 43.6], [-4.5, 43.4], [-4.55, 43.17], [-5.3, 43.02], [-6.2, 42.98], [-6.85, 43.15]];
const POR = [[-8.9, 41.9], [-8.1, 41.8], [-6.6, 41.95], [-6.2, 41.6], [-6.8, 41.0], [-6.9, 40.2], [-7.5, 39.6], [-7.0, 39.0], [-7.3, 38.5], [-7.0, 38.2], [-7.5, 37.6], [-7.4, 37.2], [-8.9, 37.0], [-8.8, 38.5], [-9.5, 38.8], [-8.9, 40.2]];
const mPj = (lo, la) => [f1(80 + (lo + 9.8) * 68), f1(430 + (44 - la) * 84)];
const mPath = a => 'M' + a.map(q => mPj(q[0], q[1]).join(',')).join('L') + 'Z';
function spainMapSvg() {
  const es = mPath(ESP), id = uid('mp');
  let s = `<path d="${mPath(POR)}" fill="#d9cfb8" stroke="${INK}" stroke-width="3" opacity=".7"/>`;
  s += cut(P(es), 8, 10) + D(es, FIG, 5) + `<path d="${es}" fill="url(#hP)"/>`;
  s += `<path class="rGAL" d="${mPath(GAL)}" fill="${PINK}" stroke="${INK}" stroke-width="4" opacity="0"/><path class="rAST" d="${mPath(AST)}" fill="${YEL}" stroke="${INK}" stroke-width="4" opacity="0"/>`;
  let wv = ''; for (let y = 300; y < 1150; y += 34) wv += `M${(y * 7) % 60},${y} q16,-8 32,0 m60,0 q16,-8 32,0 m80,0 q16,-8 32,0 `;
  return `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0"><path d="${wv}" stroke="${INK}" stroke-width="2" fill="none" opacity=".25"/>${s}</svg>`;
}

/* ---------- TITULAR DE PASO numerado («1 · No existía»): aguanta TODO el paso ---------- */
// lines: ['No *existía*'] o ['La pregunta', 'va en el *tono*']. El número entra en t0; cada palabra, cuando la dice la voz.
function stepHead(t0, t1, n, lines, o = {}) {
  const y = o.y || 178, size = o.size || 96;
  const b = el('div', world, { left: '60px', top: px(y), width: '880px', height: px(o.h || 200), zIndex: 520 });
  const badge = el('div', b, { left: '0px', top: px(o.by || 10), width: '170px', height: '170px', borderRadius: '50%', background: YEL, border: `9px solid ${INK}`, boxShadow: `9px 10px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '128px', lineHeight: '150px', color: INK }, String(n));
  const tx = el('div', b, { left: '205px', top: px(o.ty || 0), width: '690px', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(size), lineHeight: 1.02, color: INK, textAlign: 'left' });
  let cur = 0; while (cur < W.length && W[cur].e < t0 - 0.05) cur++;
  let prevT = t0 + 0.12; const spans = [{ e: badge, t: t0 }], hls = [];
  lines.forEach(str => {
    const row = document.createElement('div'); row.style.whiteSpace = 'nowrap'; tx.appendChild(row);
    const re = /\*([^*]+)\*|(\S+)/g; let m;
    while ((m = re.exec(str))) {
      const tk = m[1] ? { txt: m[1], key: true } : { txt: m[2], key: false };
      let tt = null;
      for (const wd of tk.txt.split(' ')) { const nw = normW(wd); if (!nw) continue; for (let j = cur; j < Math.min(W.length, cur + 14); j++) if (normW(W[j].w) === nw) { if (tt == null) tt = W[j].s; cur = j + 1; break; } }
      tt = prevT + 0.09; prevT = tt; // el titular del paso entra entero al decir el número
      const sp = document.createElement('span'); sp.style.display = 'inline-block'; sp.style.margin = '0 0.18em 0 0'; sp.style.position = 'relative';
      if (tk.key) { sp.style.fontStyle = 'italic'; sp.style.zIndex = 0; sp.innerHTML = `<span style="position:absolute;left:-10px;right:-10px;bottom:6%;height:42%;background:${o.hlc || PINK};z-index:-1;transform-origin:left center;border-radius:4px 12px 6px 14px"></span>${tk.txt}`; hls.push({ e: sp.firstChild, t: tt + 0.1 }); }
      else sp.textContent = tk.txt;
      row.appendChild(sp); spans.push({ e: sp, t: tt });
    }
  });
  HLS.push({ b, t0, t1, spans, hls });
  return b;
}

/* ---------- lápida de grabado (0 0 460 560) ---------- */
function tombSvg() {
  const st = 'M40,560 V200 Q40,30 230,30 Q420,30 420,200 V560 Z';
  let s = cut(P(st), 8, 10) + D(st, '#bdb6a6', 6) + `<path d="${st}" fill="url(#hA)" opacity=".45"/>`;
  s += `<path d="M70,540 V210 Q70,64 230,64 Q390,64 390,210 V540" fill="none" stroke="${INK}" stroke-width="3" opacity=".5"/>`;
  s += `<path d="M230,96 V196 M190,132 H270" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>`;
  s += `<text x="230" y="280" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="54" fill="${INK}">CERVANTES</text>`;
  s += `<text x="230" y="336" text-anchor="middle" font-family="SpecialElite" font-size="34" fill="${INK}">aquí descansa</text>`;
  s += `<path d="M110,380 Q160,400 230,384 Q300,368 350,392" stroke="${INK}" stroke-width="3" fill="none" opacity=".45"/><path d="M120,430 l40,-14 M300,450 l40,10 M180,500 l30,-8" stroke="${INK}" stroke-width="3" opacity=".4"/>`;
  s += `<path d="M0,560 Q230,520 460,560 L460,600 L0,600 Z" fill="#7a9a52" stroke="${INK}" stroke-width="5"/>`;
  for (let x = 14; x < 450; x += 26) s += `<path d="M${x},560 l6,-26 l6,26" fill="#5f7f3e" stroke="${INK}" stroke-width="2"/>`;
  return `<svg viewBox="0 0 460 600" width="100%" height="100%" style="overflow:visible">${s}</svg>`;
}
/* ---------- portada de Quijote escolar (genérica, sin editorial) (0 0 520 700) ---------- */
function schoolCoverSvg() {
  const b = 'M20,10 H480 Q500,10 500,30 V680 Q500,696 480,696 H20 Z';
  let s = cut(P(b)) + D(b, '#2f6fb0', 6) + `<rect x="20" y="10" width="46" height="686" fill="rgba(0,0,0,.22)"/>`;
  s += `<rect x="96" y="70" width="350" height="250" rx="12" fill="#FBF6EA" stroke="${INK}" stroke-width="5"/>`;
  s += `<text x="271" y="160" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="58" fill="${INK}">DON</text><text x="271" y="226" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="58" fill="${INK}">QUIJOTE</text><text x="271" y="284" text-anchor="middle" font-family="Bricolage" font-weight="700" font-size="30" fill="${INK}">edición escolar</text>`;
  // molino + lanza
  s += `<g transform="translate(271,500)"><path d="M-40,140 L-24,-20 L24,-20 L40,140 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="5"/><path d="M0,-30 L-110,-130 M0,-30 L110,-130 M0,-30 L-100,70 M0,-30 L100,70" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M0,-30 L-110,-130 M0,-30 L110,-130 M0,-30 L-100,70 M0,-30 L100,70" stroke="${YEL}" stroke-width="5" stroke-linecap="round"/><circle cx="0" cy="-30" r="14" fill="${RED}" stroke="${INK}" stroke-width="4"/></g>`;
  return `<svg viewBox="0 0 520 700" width="100%" height="100%" style="overflow:visible">${s}</svg>`;
}
