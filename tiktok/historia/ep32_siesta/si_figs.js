/* Ep. 32 · ¡Siesta es un número! — tiempos clave (todo por TEXTO) + figuras nuevas (grabado recortado) */
const ws = i => W[i].s, wE = i => W[i].e;
const K = {};
{
  K.siesta0 = ws(0); K.numero0 = ws(3); K.duermes0 = ws(6);
  const i1 = find('y no no son'); K.L1s = ws(i1); K.no1 = ws(i1 + 1); K.minutos = ws(i1 + 5); K.duermes1 = ws(i1 + 7); K.ojala = ws(i1 + 8);
  const iv = find('viene del latin', i1); K.viene = ws(iv); K.latin2 = ws(iv + 2); K.sexta2 = ws(iv + 3); K.hora2 = ws(iv + 5); K.sexta2b = ws(iv + 6); K.lo2 = ws(iv + 7); K.rae = ws(iv + 10); K.L2e = wE(iv + 10);
  const ir = find('los romanos contaban', iv); K.romanos = ws(ir); K.desde = ws(ir + 5); K.horas3 = ws(ir + 4); K.amanecer = ws(ir + 7); K.primera = ws(ir + 8); K.segunda = ws(ir + 9); K.L3e = wE(ir + 9);
  const i4 = find('si amanece a las seis', ir); K.si4 = ws(i4); K.amanece4 = ws(i4 + 1); K.seis = ws(i4 + 4); K.la4 = ws(i4 + 5); K.sexta4 = ws(i4 + 6); K.cae4 = ws(i4 + 7); K.mediodia4 = ws(i4 + 9);
  const i5 = find('y descansar a la sexta', i4); K.y5 = ws(i5); K.descansar = ws(i5 + 1); K.sexta5 = ws(i5 + 4); K.acabo = ws(i5 + 5); K.echar = ws(i5 + 7); K.siesta5 = ws(i5 + 9);
  const i6 = find('ahora lo bueno', i5); K.ahora = ws(i6); K.bueno = ws(i6 + 2); K.mediodia6 = ws(i6 + 3); K.ingles = ws(i6 + 5); K.es6 = ws(i6 + 6); K.nun6 = ws(i6 + 7); K.y6 = ws(i6 + 8); K.viene6 = ws(i6 + 9); K.nona6 = ws(i6 + 11); K.la6 = ws(i6 + 12); K.novena = ws(i6 + 14);
  const i7 = find('mas o menos', i6); K.mas = ws(i7); K.menos = ws(i7 + 2); K.las7 = ws(i7 + 3); K.tres7 = ws(i7 + 4); K.tarde7 = ws(i7 + 7);
  const i8 = find('ojo parece', i7); K.ojo = ws(i8); K.parece = ws(i8 + 1); K.monjes = ws(i8 + 4); K.ayunaban = ws(i8 + 5); K.hasta8 = ws(i8 + 6); K.nona8 = ws(i8 + 8); K.y8 = ws(i8 + 9); K.fueron = ws(i8 + 11); K.adelantando = ws(i8 + 12);
  const i9 = find('lo que hace el hambre', i8); K.loque = ws(i9); K.hace = ws(i9 + 2); K.hambre = ws(i9 + 4); K.L9e = wE(i9 + 4);
  const i10 = find('o sea tu siesta', i9); K.osea = ws(i10); K.siesta10 = ws(i10 + 3); K.doce10 = ws(i10 + 7); K.y10 = ws(i10 + 8); K.echas10 = ws(i10 + 11); K.tres10 = ws(i10 + 14);
  const i11 = find('y el nun de los ingleses', i10); K.y11 = ws(i11); K.nun11 = ws(i11 + 2); K.ingleses = ws(i11 + 5); K.era11 = ws(i11 + 6); K.tres11 = ws(i11 + 9); K.y11b = ws(i11 + 10); K.dicen = ws(i11 + 12); K.doce11 = ws(i11 + 15);
  const i12 = find('se cambiaron la hora', i11); K.se12 = ws(i12); K.cambiaron = ws(i12 + 1); K.hora12 = ws(i12 + 3); K.y12 = ws(i12 + 4); K.adivina = ws(i12 + 5); K.quien = ws(i12 + 6); K.llega = ws(i12 + 7); K.tarde12 = ws(i12 + 8); K.hasta = ws(i12 + 9); K.siesta12 = ws(i12 + 12);
  const i13 = find('a que hora te la echas tu', i12); K.aq = ws(i13); K.i13 = i13; K.echas13 = ws(i13 + 5); K.tu13 = ws(i13 + 6); K.os = ws(i13 + 7); K.leo = ws(i13 + 8);
  const is = find('soy tu vecino', i13); K.soy = ws(is); K.vecino = ws(is + 2); K.isoy = is;
  const iye = find('y esto no venia en el libro', is); K.iye = iye; K.esto = ws(iye + 1); K.enL = ws(iye + 4); K.libro = ws(iye + 6); K.END = wE(iye + 6);
}
/* cortes de escena (una frase = un plano; un plano nuevo cada 1–2,5 s) */
const S = {
  A: [-1, K.L1s - 0.06], B1: [K.L1s - 0.06, K.ojala - 0.08], B2: [K.ojala - 0.08, K.viene - 0.08],
  C: [K.viene - 0.08, K.romanos - 0.08], D1: [K.romanos - 0.08, K.primera - 0.12], D2: [K.primera - 0.12, K.si4 - 0.08],
  E1: [K.si4 - 0.08, K.la4 - 0.08], E2: [K.la4 - 0.08, K.y5 - 0.08], F1: [K.y5 - 0.08, K.acabo - 0.08], F2: [K.acabo - 0.08, K.ahora - 0.06],
  G0: [K.ahora - 0.06, K.mediodia6 - 0.06], G1: [K.mediodia6 - 0.06, K.nona6 - 0.12], G2: [K.nona6 - 0.12, K.la6 - 0.06], G3: [K.la6 - 0.06, K.mas - 0.08],
  H1: [K.mas - 0.08, K.las7 - 0.06], H2: [K.las7 - 0.06, K.ojo - 0.08],
  O1: [K.ojo - 0.08, K.ayunaban - 0.08], O2: [K.ayunaban - 0.08, K.y8 - 0.06], O3: [K.y8 - 0.06, K.loque - 0.08], P: [K.loque - 0.08, K.osea - 0.08],
  Q: [K.osea - 0.08, K.se12 - 0.08], R1: [K.se12 - 0.08, K.y12 - 0.08], R2: [K.y12 - 0.08, K.hasta - 0.08], R3: [K.hasta - 0.08, K.aq - 0.08],
  T: [K.aq - 0.08, K.soy - 0.1], BAL: [K.soy - 0.1, K.enL - 0.04], BK: [K.enL - 0.04, 999],
};
const DUR = K.END + 0.6, LOOP = DUR - 0.4;

/* ---------- constantes ---------- */
const STONE = '#D8D1C2', STONE2 = '#BDB4A2', BRONZE = '#B07A3A', ROBE = '#6B4A2E', ROBE2 = '#7E5A38', FOG = '#C9CCC6', GREEN = '#2F5A43';

/* ---------- RELOJ DE SOL ROMANO (viewBox 0 0 800 520; centro 400,440) ---------- */
// número de hora h (0 = amanecer, izquierda; 6 = mediodía, arriba; 12 = puesta, derecha)
const ROM = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
const dialAng = h => 180 - 15 * h; // grados, sentido antihorario desde +x
function mkDial(pa, x, y, w, o = {}) {
  const h = w * 520 / 800;
  const d = box(pa, x, y, w, h, { zIndex: o.z || 5 });
  const C = [400, 440], disc = 'M24,440 A376,376 0 0 1 776,440 Z';
  let lines = '', nums = '';
  for (let k = 0; k <= 12; k++) {
    const a = dialAng(k) * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    lines += `<path d="M${f1(C[0] + c * 70)},${f1(C[1] - s * 70)} L${f1(C[0] + c * 250)},${f1(C[1] - s * 250)}" stroke="${INK}" stroke-width="${k === 6 ? 5 : 3.5}"/>`;
    if (k >= 1) {
      const rr = 308, nx = C[0] + c * rr, ny = C[1] - s * rr + (k === 12 ? -26 : 14);
      nums += `<g class="dn dn${k}"><circle class="dg" cx="${f1(nx)}" cy="${f1(ny - 15)}" r="40" fill="${YEL}" stroke="${INK}" stroke-width="4" style="opacity:0"/><text x="${f1(nx)}" y="${f1(ny)}" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="${k === 6 || k === 9 ? 50 : 42}" fill="${INK}">${ROM[k]}</text></g>`;
    }
  }
  d.innerHTML = `<svg viewBox="0 0 800 520" width="100%" height="100%" style="overflow:visible">
   ${cut(`<path d="${disc}"/><rect x="0" y="436" width="800" height="80" rx="10"/>`, 8, 10)}
   <path d="${disc}" fill="${STONE}" stroke="${INK}" stroke-width="7"/><path d="${disc}" fill="url(#hP)" opacity=".8"/>
   <path d="M120,440 A280,280 0 0 1 680,440" fill="none" stroke="${INK}" stroke-width="3" opacity=".55"/>
   <path d="M58,440 A342,342 0 0 1 742,440" fill="none" stroke="#fff" stroke-width="4" opacity=".7"/>
   <path d="M480,80 A376,376 0 0 1 776,440 L700,440 A300,300 0 0 0 470,150 Z" fill="url(#hA)" opacity=".45"/>
   ${lines}${nums}
   <g class="shd" transform="translate(400 440) rotate(-90)"><path d="M0,-14 L262,-4 L262,4 L0,14 Z" fill="${INK}" opacity=".62"/></g>
   <path d="M376,440 L400,330 L424,440 Z" fill="${BRONZE}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M400,336 L412,440" stroke="#fff" stroke-width="3" opacity=".5"/>
   <rect x="0" y="436" width="800" height="80" rx="10" fill="${STONE2}" stroke="${INK}" stroke-width="7"/><rect x="0" y="436" width="800" height="80" rx="10" fill="url(#hB)" opacity=".5"/>
   <path d="M30,470 H770" stroke="${INK}" stroke-width="2" opacity=".5"/>
   ${o.label ? `<text x="400" y="494" text-anchor="middle" font-family="Rye" font-size="40" fill="${INK}">${o.label}</text>` : ''}</svg>`;
  const sh = d.querySelector('.shd'), nm = [null, ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(k => d.querySelector('.dn' + k))];
  return {
    d, sh, nm,
    setH(hh) { sh.setAttribute('transform', `translate(400 440) rotate(${f1(-dialAng(hh))})`); },
    lit(k, on, col) { const g = nm[k]; g.querySelector('.dg').style.opacity = on ? 1 : 0; g.querySelector('.dg').setAttribute('fill', col || YEL); g.querySelector('text').setAttribute('fill', on ? (col === RED ? '#fff' : RED) : INK); },
    dim(k, on) { nm[k].style.opacity = on ? 0.25 : 1; },
  };
}

/* ---------- RELOJ DE PARED (viewBox 0 0 300 300; centro 150,150) ---------- */
function mkClock(pa, x, y, sz, o = {}) {
  const d = box(pa, x, y, sz, sz, { zIndex: o.z || 6 });
  let tk = '', nums = '';
  for (let k = 0; k < 60; k++) { const a = k * 6 * Math.PI / 180, big = k % 5 === 0; tk += `<path d="M${f1(150 + Math.sin(a) * (big ? 108 : 116))},${f1(150 - Math.cos(a) * (big ? 108 : 116))} L${f1(150 + Math.sin(a) * 124)},${f1(150 - Math.cos(a) * 124)}" stroke="${INK}" stroke-width="${big ? 5 : 2}"/>`; }
  if (!o.blank) {
    const lab = o.roman ? ['XII', 'III', 'VI', 'IX'] : ['12', '3', '6', '9'];
    [[150, 72], [226, 162], [150, 246], [74, 162]].forEach((q, i) => nums += `<text x="${q[0]}" y="${q[1]}" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="${o.roman ? 34 : 46}" fill="${INK}">${lab[i]}</text>`);
  }
  const face = o.face || '#FBF6EA';
  d.innerHTML = `<svg viewBox="0 0 300 300" width="100%" height="100%" style="overflow:visible">${cut('<circle cx="150" cy="150" r="146"/>', 6, 8)}
   <circle cx="150" cy="150" r="146" fill="${o.rim || BRASS}" stroke="${INK}" stroke-width="6"/><circle cx="150" cy="150" r="146" fill="url(#hA)" opacity=".35"/>
   <circle cx="150" cy="150" r="128" fill="${face}" stroke="${INK}" stroke-width="5"/><circle cx="150" cy="150" r="128" fill="url(#hP)" opacity=".4"/>
   ${tk}${nums}
   <g class="hh"><path d="M142,166 L146,86 L150,74 L154,86 L158,166 Z" fill="${INK}"/></g>
   <g class="mh"><path d="M146,170 L148,40 L150,30 L152,40 L154,170 Z" fill="${INK}"/></g>
   <circle cx="150" cy="150" r="12" fill="${RED}" stroke="${INK}" stroke-width="4"/></svg>`;
  const hh = d.querySelector('.hh'), mh = d.querySelector('.mh');
  return { d, hh, mh, setH(h) { hh.setAttribute('transform', `rotate(${f1(h * 30)} 150 150)`); mh.setAttribute('transform', `rotate(${f1((h * 360) % 360)} 150 150)`); } };
}

/* ---------- personajes ---------- */
// sombrero de paja ancho (sobre el busto 0 0 360 460)
const STRAW = (col = '#E2C27A') => {
  const crown = 'M120,150 C116,104 142,84 180,84 C220,84 246,104 240,150 Z', brim = 'M26,156 Q180,112 334,156 Q300,184 180,180 Q60,184 26,156 Z';
  let st = ''; for (let k = 0; k < 7; k++) st += `<path d="M${40 + k * 46},${160 - Math.abs(3 - k) * 4} q24,-10 46,0" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".45"/>`;
  return cut(P(crown) + P(brim), 4, 6) + D(brim, col, 4) + st + D(crown, col, 4) + `<path d="${crown}" fill="url(#hA)" opacity=".3"/><path d="M121,128 L239,128 L240,148 L120,148 Z" fill="${RED}" stroke="${INK}" stroke-width="3"/>`;
};
// ojos dormidos que se leen a 150 px: párpados tapados + arcos «‿» gruesos
const SLEEPEYES = () => `<ellipse cx="156" cy="204" rx="16" ry="13" fill="${FIG}"/><ellipse cx="204" cy="204" rx="16" ry="13" fill="${FIG}"/><path d="M138,198 Q156,220 174,198 M186,198 Q204,220 222,198" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
function sleeperInner(sleep = false) { return bustInner({ uniform: 'farmer', moustache: true, seed: 33 }) + (sleep ? SLEEPEYES() : '') + STRAW(); }
// romano: toga + corona de laurel
const TOGA = () => {
  const tg = 'M28,460 C32,384 80,338 140,328 L220,328 C280,338 328,384 332,460 Z', sash = 'M210,330 C250,360 270,420 262,460 L200,460 C210,420 196,370 160,334 Z';
  let fold = ''; for (let k = 0; k < 5; k++) fold += `<path d="M${80 + k * 34},${380 + k * 6} q20,40 6,80" stroke="${INK}" stroke-width="2.4" fill="none" opacity=".55"/>`;
  return D(tg, '#F4ECDB', 3) + `<path d="${tg}" fill="url(#hF)" opacity=".25"/>` + fold + D(sash, '#9B2F3A', 3) + HF(sash, 'hA');
};
const LAUREL = () => { let l = ''; for (let k = 0; k < 7; k++) { const a = Math.PI * (0.92 - k * 0.14), x = 180 + Math.cos(a) * 74, y = 168 - Math.sin(a) * 40; l += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="20" ry="9" fill="#6E8A3A" stroke="${INK}" stroke-width="2.5" transform="rotate(${f1(-a * 180 / Math.PI + 90)} ${f1(x)} ${f1(y)})"/>`; } return l; };
const hairRoman = () => { const h = 'M116,200 C108,140 142,118 182,118 C226,118 254,142 246,200 C236,166 214,156 182,156 C150,156 128,168 116,200 Z'; return D(h, '#4a3426') + HF(h, 'hD'); };
function romanInner() { return bustInner({ uniform: 'farmer', seed: 52 }) + TOGA() + hairRoman() + LAUREL(); }
// monje: hábito + capucha (con hueco para la cara)
function monkInner(seed = 61, beard = false) {
  const robe = 'M28,460 C32,384 80,338 140,328 L220,328 C280,338 328,384 332,460 Z';
  const hood = 'M70,350 C46,250 80,96 180,92 C280,96 314,250 290,350 C250,330 230,330 180,334 C130,330 110,330 70,350 Z M180,140 C126,140 112,200 116,250 C120,300 150,322 180,322 C210,322 240,300 244,250 C248,200 234,140 180,140 Z';
  let s = bustInner({ uniform: 'farmer', beard, seed });
  s += D(robe, ROBE, 3) + `<path d="${robe}" fill="url(#hW)" opacity=".25"/><path d="M180,340 V460" stroke="${INK}" stroke-width="3"/><path d="M150,400 Q180,412 210,400" stroke="#E8D9B0" stroke-width="7" fill="none"/>`;
  s += `<path d="${hood}" fill="${ROBE2}" fill-rule="evenodd" stroke="${INK}" stroke-width="4"/><path d="${hood}" fill="url(#hA)" fill-rule="evenodd" opacity=".4"/>`;
  return s;
}
// inglés: bombín + levita + pajarita
const BOWLER = (col = '#1e1a17') => {
  const crown = 'M126,152 C120,96 146,74 180,74 C216,74 242,96 236,152 Z', brim = 'M86,156 Q180,132 276,156 Q262,176 180,172 Q100,176 86,156 Z';
  return cut(P(crown) + P(brim), 4, 6) + D(crown, col, 4) + `<path d="${crown}" fill="url(#hA)" opacity=".35"/><path d="M126,132 L236,132 L236,150 L126,150 Z" fill="#3a3330" stroke="${INK}" stroke-width="3"/>` + D(brim, col, 4) + `<path d="M150,88 Q140,110 142,140" stroke="#fff" stroke-width="4" opacity=".3" fill="none"/>`;
};
function englishInner() { return bustInner({ uniform: 'soldier', moustache: true, seed: 81 }) + coatOver('#2f3a4a') + BOWTIE(RED) + BOWLER(); }
const teaSvg = () => `<svg viewBox="0 0 160 130" width="100%" height="100%" style="overflow:visible">${cut('<path d="M20,40 H120 C120,100 100,120 70,120 C40,120 20,100 20,40 Z"/>', 4, 5)}<path d="M120,56 C150,56 150,96 116,96" fill="none" stroke="${INK}" stroke-width="9"/><path d="M120,56 C150,56 150,96 116,96" fill="none" stroke="#fff" stroke-width="4"/><path d="M20,40 H120 C120,100 100,120 70,120 C40,120 20,100 20,40 Z" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M30,60 Q70,70 112,60" stroke="${PINK}" stroke-width="6" fill="none"/><ellipse cx="70" cy="126" rx="62" ry="8" fill="#fff" stroke="${INK}" stroke-width="4"/><g class="steam"><path d="M50,30 q-10,-14 0,-26 M80,30 q-10,-14 0,-26" stroke="${INK}" stroke-width="3" fill="none" opacity=".5"/></g></svg>`;
// lengua fuera (sobre la boca del busto)
const TONGUE = () => `<path d="M168,296 C166,330 194,330 192,296 Z" fill="${PINK}" stroke="${INK}" stroke-width="3"/><path d="M180,300 V318" stroke="${INK}" stroke-width="2"/>`;
const SWEAT = () => `<path d="M262,150 C252,170 256,184 266,184 C276,184 280,170 262,150 Z" fill="#9FD3E6" stroke="${INK}" stroke-width="3"/><path d="M96,170 C88,186 92,198 100,198 C108,198 112,186 96,170 Z" fill="#9FD3E6" stroke="${INK}" stroke-width="3"/>`;

/* ---------- objetos ---------- */
function stopwatchSvg() {
  return `<svg viewBox="0 0 400 460" width="100%" height="100%" style="overflow:visible">${cut('<circle cx="200" cy="260" r="180"/><rect x="170" y="30" width="60" height="70" rx="10"/>', 8, 10)}
   <rect x="160" y="40" width="80" height="44" rx="12" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><rect x="186" y="80" width="28" height="30" fill="${BRASS}" stroke="${INK}" stroke-width="5"/>
   <path d="M300,110 L330,80" stroke="${INK}" stroke-width="14" stroke-linecap="round"/><path d="M300,110 L330,80" stroke="${BRASS}" stroke-width="7" stroke-linecap="round"/>
   <circle cx="200" cy="260" r="180" fill="${BRASS}" stroke="${INK}" stroke-width="6"/><circle cx="200" cy="260" r="180" fill="url(#hA)" opacity=".35"/>
   <circle cx="200" cy="260" r="156" fill="#FBF6EA" stroke="${INK}" stroke-width="5"/>
   ${[...Array(12)].map((_, k) => { const a = k * 30 * Math.PI / 180; return `<path d="M${f1(200 + Math.sin(a) * 132)},${f1(260 - Math.cos(a) * 132)} L${f1(200 + Math.sin(a) * 150)},${f1(260 - Math.cos(a) * 150)}" stroke="${INK}" stroke-width="5"/>`; }).join('')}
   <g class="swh"><path d="M196,280 L200,128 L204,280 Z" fill="${RED}" stroke="${INK}" stroke-width="2"/></g><circle cx="200" cy="260" r="12" fill="${INK}"/>
   <text x="200" y="350" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="${INK}">20 MIN</text></svg>`;
}
function hammockSvg() {
  return `<svg viewBox="0 0 900 520" width="100%" height="100%" style="overflow:visible">
   ${cut('<rect x="20" y="40" width="40" height="470" rx="10"/><rect x="840" y="40" width="40" height="470" rx="10"/>', 6, 8)}
   <rect x="20" y="40" width="40" height="470" rx="10" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="840" y="40" width="40" height="470" rx="10" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>
   <path d="M60,120 L150,250 M840,120 L750,250" stroke="${INK}" stroke-width="5"/>
   <g class="hmk"><path d="M140,240 C260,470 640,470 760,240 C640,380 260,380 140,240 Z" fill="#F2C230" stroke="${INK}" stroke-width="6"/>
   ${[0, 1, 2, 3, 4, 5].map(k => `<path d="M${200 + k * 100},${300 + Math.sin(k / 5 * Math.PI) * 80} q10,60 0,110" stroke="${RED}" stroke-width="16" opacity=".75" fill="none"/>`).join('')}
   <path d="M140,240 C260,470 640,470 760,240" fill="none" stroke="${INK}" stroke-width="6"/></g></svg>`;
}
const breadSvg = () => `<svg viewBox="0 0 260 140" width="100%" height="100%" style="overflow:visible">${cut('<path d="M10,100 C10,30 250,30 250,100 C250,130 10,130 10,100 Z"/>', 5, 6)}<path d="M10,100 C10,30 250,30 250,100 C250,130 10,130 10,100 Z" fill="#D9A25A" stroke="${INK}" stroke-width="5"/><path d="M10,100 C10,30 250,30 250,100" fill="url(#hA)" opacity=".35"/><path d="M70,60 l20,30 M120,52 l20,34 M170,56 l20,32" stroke="${INK}" stroke-width="5" stroke-linecap="round"/></svg>`;
const plateSvg = () => `<svg viewBox="0 0 220 70" width="100%" height="100%" style="overflow:visible"><ellipse cx="110" cy="40" rx="106" ry="28" fill="#fff" stroke="${INK}" stroke-width="5"/><ellipse cx="110" cy="38" rx="66" ry="15" fill="none" stroke="${INK}" stroke-width="3" opacity=".6"/></svg>`;
function tableSvg(w = 1080, h = 260) { return `<svg width="${w}" height="${h}" style="overflow:visible"><rect x="0" y="0" width="${w}" height="${h}" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><rect x="0" y="0" width="${w}" height="${h}" fill="url(#hW)" opacity=".3"/><rect x="0" y="0" width="${w}" height="30" fill="#8b5a3a" stroke="${INK}" stroke-width="5"/></svg>`; }
// colina al amanecer (paisaje para el romano)
function hillSvg() {
  return `<svg width="1080" height="1920" style="overflow:visible">
   <path d="M-20,1060 C200,900 420,880 620,960 C800,1030 940,980 1100,930 L1100,1920 L-20,1920 Z" fill="#B9A27E" stroke="${INK}" stroke-width="6"/>
   <path d="M-20,1060 C200,900 420,880 620,960 C800,1030 940,980 1100,930 L1100,1100 L-20,1100 Z" fill="url(#hB)" opacity=".35"/>
   <path d="M-20,1200 C300,1110 700,1150 1100,1100 L1100,1920 L-20,1920 Z" fill="#9C8562" stroke="${INK}" stroke-width="5"/>
   ${[[90, 1030], [240, 960], [880, 960], [980, 940]].map(q => `<path d="M${q[0]},${q[1]} l-30,40 h60 Z M${q[0]},${q[1] - 30} l-24,36 h48 Z" fill="#6E8A3A" stroke="${INK}" stroke-width="3"/><rect x="${q[0] - 5}" y="${q[1] + 40}" width="10" height="24" fill="${WOOD}" stroke="${INK}" stroke-width="2"/>`).join('')}
   <g transform="translate(700 860)"><rect x="0" y="-130" width="26" height="140" fill="${STONE}" stroke="${INK}" stroke-width="4"/><rect x="60" y="-130" width="26" height="140" fill="${STONE}" stroke="${INK}" stroke-width="4"/><rect x="120" y="-130" width="26" height="140" fill="${STONE}" stroke="${INK}" stroke-width="4"/><path d="M-14,-130 L160,-130 L140,-170 L6,-170 Z" fill="${STONE}" stroke="${INK}" stroke-width="4"/></g></svg>`;
}
const sunSvg = () => { let r = ''; for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; r += `<path d="M${f1(100 + Math.cos(a) * 70)},${f1(100 + Math.sin(a) * 70)} L${f1(100 + Math.cos(a + 0.12) * 98)},${f1(100 + Math.sin(a + 0.12) * 98)} L${f1(100 + Math.cos(a - 0.12) * 98)},${f1(100 + Math.sin(a - 0.12) * 98)} Z" fill="${YEL}" stroke="${INK}" stroke-width="3"/>`; } return `<svg viewBox="0 0 200 200" width="100%" height="100%" style="overflow:visible">${r}<circle cx="100" cy="100" r="62" fill="${YEL}" stroke="${INK}" stroke-width="5"/><circle cx="100" cy="100" r="62" fill="url(#hA)" opacity=".2"/><circle cx="80" cy="92" r="6" fill="${INK}"/><circle cx="120" cy="92" r="6" fill="${INK}"/><path d="M78,116 q22,16 44,0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`; };
// Londres: Big Ben en grabado con niebla
function londonSvg() {
  let fogL = ''; for (let k = 0; k < 7; k++) fogL += `<path d="M${-60 + k * 180},${1000 + (k % 2) * 40} q90,-50 180,0 q90,-50 180,0" stroke="#fff" stroke-width="40" fill="none" opacity=".35" stroke-linecap="round"/>`;
  return `<svg width="1080" height="1920" style="overflow:visible">
   <g transform="translate(700 0)">
    ${cut('<rect x="40" y="560" width="220" height="900"/><path d="M30,560 L150,250 L270,560 Z"/>', 8, 10)}
    <path d="M150,170 L162,250 L138,250 Z" fill="${STONE2}" stroke="${INK}" stroke-width="4"/>
    <path d="M30,560 L150,250 L270,560 Z" fill="${STONE2}" stroke="${INK}" stroke-width="6"/><path d="M150,250 L270,560 L150,560 Z" fill="url(#hA)" opacity=".5"/>
    <rect x="40" y="560" width="220" height="900" fill="#D6C9AC" stroke="${INK}" stroke-width="6"/><rect x="150" y="560" width="110" height="900" fill="url(#hA)" opacity=".45"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(k => `<rect x="${70 + (k % 3) * 60}" y="${900 + Math.floor(k / 3) * 150}" width="30" height="90" rx="14" fill="#3a2a1e" stroke="${INK}" stroke-width="3"/>`).join('')}
    <circle cx="150" cy="700" r="96" fill="${BRASS}" stroke="${INK}" stroke-width="6"/><circle cx="150" cy="700" r="80" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>
    <path d="M150,700 L150,640 M150,700 L150,632" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
   </g>
   ${fogL}<rect x="0" y="1180" width="1080" height="740" fill="#A9ADA6" stroke="${INK}" stroke-width="5"/><rect x="0" y="1180" width="1080" height="740" fill="url(#hW)" opacity=".2"/></svg>`;
}
// letrero de pub colgante (viewBox 0 0 560 520): soporte arriba, tablero 60..480 x 120..440
function pubSignSvg() {
  return `<svg viewBox="0 0 560 520" width="100%" height="100%" style="overflow:visible">
   <path d="M0,40 H520" stroke="${INK}" stroke-width="18" stroke-linecap="round"/><path d="M0,40 H520" stroke="#3a3330" stroke-width="9" stroke-linecap="round"/>
   <path d="M40,40 Q120,100 200,40" stroke="${INK}" stroke-width="6" fill="none"/>
   <path d="M120,40 V120 M440,40 V120" stroke="${INK}" stroke-width="6"/>
   ${cut('<rect x="60" y="120" width="440" height="320" rx="20"/>', 8, 10)}
   <rect x="60" y="120" width="440" height="320" rx="20" fill="${GREEN}" stroke="${INK}" stroke-width="7"/>
   <rect x="82" y="142" width="396" height="276" rx="12" fill="none" stroke="${GOLD}" stroke-width="5"/><rect x="60" y="120" width="440" height="320" rx="20" fill="url(#hA)" opacity=".25"/></svg>`;
}
