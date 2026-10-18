/* Ep. 38 · Petrov v3 (plantilla Napoleón) — tiempos clave (todo por TEXTO) + figuras de grabado (reutilizadas de Ep. 31) */
const ws = i => W[i].s, wE = i => W[i].e;
const K = {};
{
  K.estas = ws(0); K.gracias = ws(2); K.senor0 = ws(5); K.nunca = ws(find('nunca has oido'));
  const i1 = find('se llamaba stanislav'); K.se1 = ws(i1); K.stanislav = ws(i1 + 2); K.petrov = ws(i1 + 3); K.y1 = ws(i1 + 4); K.en1 = ws(i1 + 5);
  K.mil = ws(i1 + 6); K.ochenta = ws(i1 + 8); K.tres1 = ws(i1 + 10); K.paro = ws(i1 + 11); K.guerra = ws(i1 + 13); K.nuclear1 = ws(i1 + 14); K.sin1 = ws(i1 + 15); K.silla1 = ws(i1 + 19);
  const is = find('soy tu vecino', i1); K.soy = ws(is); K.vecino = ws(is + 2); K.isoy = is; K.esto2 = ws(is + 4); K.libro2 = ws(is + 9); K.libro2e = wE(is + 9);
  const i3 = find('que paso esa noche', is); K.que3 = ws(i3); K.noche3 = ws(i3 + 3); K.te3 = ws(i3 + 4); K.tres3 = ws(i3 + 8); K.momentos = ws(i3 + 9);
  const i4 = find('uno la alarma', i3); K.uno = ws(i4); K.alarma4 = ws(i4 + 2); K.petrov4 = ws(i4 + 3); K.militar = ws(i4 + 5); K.sovietico = ws(i4 + 6);
  K.y4 = ws(i4 + 7); K.vigilaba = ws(i4 + 8); K.satelites = ws(i4 + 10); K.avisaban = ws(i4 + 12); K.estados4 = ws(i4 + 14); K.lanzaba = ws(i4 + 16); K.misiles4 = ws(i4 + 17); K.nucleares = ws(i4 + 18);
  const i4b = find('y a medianoche', i4); K.y4b = ws(i4b); K.medianoche = ws(i4b + 2); K.pantalla4 = ws(i4b + 4); K.dijo4 = ws(i4b + 5); K.misil = ws(i4b + 6);
  K.luego = ws(i4b + 7); K.otro = ws(i4b + 8); K.hasta4 = ws(i4b + 9); K.cinco4 = ws(i4b + 10);
  const i5 = find('dos la decision', i4b); K.dos = ws(i5); K.decision = ws(i5 + 2); K.si5 = ws(i5 + 3); K.avisaba = ws(i5 + 4); K.alarma5 = ws(i5 + 6); K.jefes = ws(i5 + 8);
  K.podian = ws(i5 + 9); K.responder = ws(i5 + 10); K.ataque5 = ws(i5 + 13); K.nuclear5 = ws(i5 + 14);
  K.y5 = ws(i5 + 15); K.penso = ws(i5 + 16); K.si5b = ws(i5 + 17); K.estados5 = ws(i5 + 18); K.ataca = ws(i5 + 20); K.verdad5 = ws(i5 + 22);
  K.no5 = ws(i5 + 23); K.manda5 = ws(i5 + 24); K.cinco5 = ws(i5 + 25); K.misiles5 = ws(i5 + 26); K.manda5b = ws(i5 + 27); K.cientos = ws(i5 + 28);
  const i6 = find('asi que cogio', i5); K.asi = ws(i6); K.cogio = ws(i6 + 2); K.telefono = ws(i6 + 4); K.dijo6 = ws(i6 + 7); K.jefes6 = ws(i6 + 10); K.es6 = ws(i6 + 11); K.una6 = ws(i6 + 12); K.falsa = ws(i6 + 13); K.alarma6 = ws(i6 + 14);
  const i7 = find('y tres tenia razon', i6); K.y7 = ws(i7); K.tres7 = ws(i7 + 1); K.tenia = ws(i7 + 2); K.razon = ws(i7 + 3);
  K.era7 = ws(i7 + 4); K.sol = ws(i7 + 6); K.reflejado = ws(i7 + 7); K.nubes = ws(i7 + 10); K.y7b = ws(i7 + 11); K.satelite7 = ws(i7 + 13); K.habia = ws(i7 + 15); K.confundido = ws(i7 + 16); K.misiles7 = ws(i7 + 18);
  const i8 = find('ojo no le dieron', i7); K.ojo = ws(i8); K.no8 = ws(i8 + 1); K.ninguna = ws(i8 + 4); K.medalla = ws(i8 + 5); K.segun = ws(i8 + 6); K.conto = ws(i8 + 7); K.el8 = ws(i8 + 8);
  K.echaron = ws(i8 + 10); K.bronca = ws(i8 + 12); K.rellenar = ws(i8 + 15); K.papeleo = ws(i8 + 18); K.noche8e = wE(i8 + 21);
  const i9 = find('o sea ese senor', i8); K.osea = ws(i9); K.ese9 = ws(i9 + 2); K.te9 = ws(i9 + 4); K.salvo = ws(i9 + 5); K.vida = ws(i9 + 7); K.y9 = ws(i9 + 8);
  K.mundo9 = ws(i9 + 10); K.entero = ws(i9 + 13); K.hasta9 = ws(i9 + 14); K.quince = ws(i9 + 15); K.anos9 = ws(i9 + 16); K.despues9 = ws(i9 + 17);
  const i10 = find('tu que habrias', i9); K.tu10 = ws(i10); K.habrias = ws(i10 + 2); K.silla = ws(i10 + 6); K.avisar = ws(i10 + 7); K.o10 = ws(i10 + 10); K.no10 = ws(i10 + 11); K.os = ws(i10 + 12); K.leo = ws(i10 + 13);
  const iye = find('y esto no venia en el libro', i10); K.iye = iye; K.y11 = ws(iye); K.esto = ws(iye + 1); K.no11 = ws(iye + 2); K.enL = ws(iye + 4); K.libro = ws(iye + 6); K.END = wE(iye + 6);
}
/* cortes: un plano nuevo cada 1,5–2,5 s; ningún dato en pantalla < 1,5 s */
const S = {
  A: [-1, K.nunca - 0.1], A2: [K.nunca - 0.1, K.se1 - 0.08],
  B2: [K.se1 - 0.08, K.y1 - 0.06], N1: [K.y1 - 0.06, K.paro - 0.1], N2: [K.paro - 0.1, K.sin1 - 0.08], N3: [K.sin1 - 0.08, K.soy - 0.25],
  BAL: [K.soy - 0.25, K.que3 - 0.1],
  Q1: [K.que3 - 0.1, K.te3 - 0.08], Q2: [K.te3 - 0.08, K.uno - 0.1],
  CH1: [K.uno - 0.1, K.petrov4 - 0.08],
  U1: [K.petrov4 - 0.08, K.y4 - 0.06], U2: [K.y4 - 0.06, K.estados4 - 0.1], U3: [K.estados4 - 0.1, K.y4b - 0.08],
  U4: [K.y4b - 0.08, K.misil - 0.2], U5: [K.misil - 0.2, K.luego + 0.45], U6: [K.luego + 0.45, K.dos - 0.1],
  CH2: [K.dos - 0.1, K.si5 - 0.08],
  D1: [K.si5 - 0.08, K.podian - 0.08], D2: [K.podian - 0.08, K.y5 - 0.08], D3: [K.y5 - 0.08, K.no5 - 0.08],
  D4a: [K.no5 - 0.08, K.manda5b - 0.08], D4b: [K.manda5b - 0.08, K.cogio - 0.1],
  F2a: [K.cogio - 0.1, K.es6 - 0.1], F2b: [K.es6 - 0.1, K.y7 - 0.1],
  CH3: [K.y7 - 0.1, K.era7 - 0.08],
  T1: [K.era7 - 0.08, K.y7b - 0.08], T2: [K.y7b - 0.08, K.ojo - 0.1],
  O1: [K.ojo - 0.1, K.segun - 0.08], O2: [K.segun - 0.08, K.bronca - 0.08], O3: [K.bronca - 0.08, K.osea - 0.08],
  R1: [K.osea - 0.08, K.mundo9 - 0.1], R2: [K.mundo9 - 0.1, K.hasta9 - 0.08 + 0.55], R3: [K.hasta9 - 0.08 + 0.55, K.tu10 - 0.1],
  M1: [K.tu10 - 0.1, K.avisar - 0.08], M2: [K.avisar - 0.08, K.y11 - 0.1],
  BK: [K.y11 - 0.1, 999],
};
const DUR = K.END + 0.6, LOOP = DUR - 0.4;

/* ---------- constantes y helpers ---------- */
const USA = [[-124.7, 48.4], [-123, 49], [-95.2, 49], [-94.8, 49.4], [-89.6, 48], [-84.8, 46.5], [-82.5, 45.3], [-82.4, 43], [-79, 43.3], [-76.5, 44.2], [-75, 45], [-71.5, 45], [-70, 46.7], [-68, 47.4], [-67, 45], [-70.2, 43.6], [-70.6, 42.7], [-70, 41.8], [-71.5, 41.4], [-73.9, 40.6], [-74, 39.7], [-75.5, 38.5], [-76.3, 37.2], [-75.7, 35.5], [-77, 34.6], [-79, 33.5], [-81, 31.8], [-81.4, 30.4], [-80.1, 26.8], [-80.4, 25.2], [-81.2, 25.4], [-82.6, 27.8], [-82.8, 29.2], [-84.3, 30], [-86.5, 30.4], [-88.5, 30.4], [-89.6, 30.2], [-89.4, 29.2], [-90.4, 29.1], [-92.3, 29.6], [-94, 29.7], [-95, 29.2], [-97.2, 27.7], [-97.4, 26], [-99.1, 26.5], [-100.4, 28.3], [-101.4, 29.8], [-103, 29], [-104.5, 29.6], [-106.5, 31.8], [-108.2, 31.8], [-108.2, 31.3], [-111, 31.3], [-114.8, 32.5], [-117.1, 32.5], [-118.5, 34], [-120.6, 34.6], [-121.9, 36.6], [-122.5, 37.8], [-123.7, 39], [-124.2, 40.4], [-124.2, 42], [-124, 46.2]];
const GOLD = '#E9C75C', STEEL = '#8E8A80', STEEL2 = '#5E5A52', BUNK = '#2B2118', BUNK2 = '#3a2c20', CRTOFF = '#2f3a33', SKY = '#CBD6D2';
const BIGT = (pa, x, y, w, html, css = {}) => el('div', pa, Object.assign({ left: px(x), top: px(y), width: px(w), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, color: INK, lineHeight: 1, zIndex: 20 }, css), html);
const OUTL = (c = INK, d = 10) => `${d}px ${d}px 0 ${c}, -4px -4px 0 ${c}, 4px -4px 0 ${c}, -4px 4px 0 ${c}`;
const qMark = (pa, x, y, sz = 110, col = PINK) => el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz), lineHeight: 1, color: col, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}`, zIndex: 30 }, '?');
function bubble(pa, x, y, html, o = {}) {
  const b = el('div', pa, { left: px(x), top: px(y), background: o.bg || '#fff', border: `${o.bw || 6}px solid ${INK}`, borderRadius: o.rad || '46px', padding: o.pad || '10px 34px 16px', fontFamily: o.font || 'Playfair', fontWeight: o.fw || 900, fontStyle: o.it ? 'italic' : 'normal', fontSize: px(o.size || 70), color: o.color || INK, whiteSpace: 'nowrap', lineHeight: 1.05, boxShadow: `8px 9px 0 ${SH}`, zIndex: o.z || 30 }, html);
  const tl = o.tail || 'bl';
  const pos = { bl: 'left:44px;bottom:-46px', br: 'right:44px;bottom:-46px', b: 'left:calc(50% - 28px);bottom:-46px', l: 'left:-50px;top:calc(50% - 26px)', r: 'right:-50px;top:calc(50% - 26px)' }[tl];
  const pth = { bl: 'M4,0 L56,0 L10,48 Z', br: 'M4,0 L56,0 L50,48 Z', b: 'M4,0 L56,0 L30,48 Z', l: 'M60,4 L60,52 L0,40 Z', r: 'M0,4 L0,52 L60,40 Z' }[tl];
  const tw = document.createElement('div'); tw.style.cssText = `position:absolute;${pos};width:60px;height:56px;`;
  tw.innerHTML = `<svg width="60" height="56" style="overflow:visible"><path d="${pth}" fill="${o.bg || '#fff'}" stroke="${INK}" stroke-width="${o.bw || 6}" stroke-linejoin="round"/><path d="${tl === 'l' ? 'M62,8 L62,48' : tl === 'r' ? 'M-2,8 L-2,48' : 'M8,-4 L52,-4'}" stroke="${o.bg || '#fff'}" stroke-width="${(o.bw || 6) + 3}"/></svg>`;
  b.appendChild(tw);
  return b;
}
function jagPath(pts, seed = 1, amp = 12, n = 4) {
  const r = rng(seed), out = [];
  for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; for (let k = 0; k < n; k++) { const u = k / n; const nx = -(b[1] - a[1]), ny = b[0] - a[0], L = Math.hypot(nx, ny) || 1; const o = k ? (r() - 0.5) * 2 * amp : 0; out.push([a[0] + (b[0] - a[0]) * u + nx / L * o, a[1] + (b[1] - a[1]) * u + ny / L * o]); } }
  return 'M' + out.map(q => f1(q[0]) + ',' + f1(q[1])).join('L') + 'Z';
}
const vignette = (pa, z = 50, a = 0.7) => box(pa, 0, 0, 1080, 1920, { zIndex: z, background: `radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(10,6,4,${a}) 100%)` });
const blink2 = t => (Math.floor(t * 4) % 2 === 0); // parpadeo a 2 Hz

/* ---------- PANTALLA CRT de grabado (la pantalla del búnker) ---------- */
function crtCase(w, h) {
  const r = 34, sx = w * 0.08, sy = h * 0.08, sw = w * 0.84, sh = h * 0.68;
  let vents = ''; for (let i = 0; i < 9; i++) vents += `<rect x="${f1(w * 0.56 + i * w * 0.036)}" y="${f1(h * 0.83)}" width="${f1(w * 0.016)}" height="${f1(h * 0.09)}" rx="4" fill="${INK}"/>`;
  return `<svg width="${w}" height="${h}" style="overflow:visible;position:absolute;left:0;top:0">${cut(`<rect x="0" y="0" width="${w}" height="${h}" rx="${r}"/>`)}
  <rect x="0" y="0" width="${w}" height="${h}" rx="${r}" fill="#CFC8B8" stroke="${INK}" stroke-width="7"/><rect x="0" y="0" width="${w}" height="${h}" rx="${r}" fill="url(#hA)" opacity=".35"/>
  <rect x="${f1(sx - 14)}" y="${f1(sy - 14)}" width="${f1(sw + 28)}" height="${f1(sh + 28)}" rx="26" fill="${INK}"/>
  <circle cx="${f1(w * 0.14)}" cy="${f1(h * 0.875)}" r="${f1(h * 0.055)}" fill="#A39A88" stroke="${INK}" stroke-width="5"/><path d="M${f1(w * 0.14)},${f1(h * 0.83)} v${f1(h * 0.04)}" stroke="${INK}" stroke-width="5"/>
  <circle cx="${f1(w * 0.27)}" cy="${f1(h * 0.875)}" r="${f1(h * 0.055)}" fill="#A39A88" stroke="${INK}" stroke-width="5"/><path d="M${f1(w * 0.27)},${f1(h * 0.83)} l${f1(h * 0.03)},${f1(h * 0.03)}" stroke="${INK}" stroke-width="5"/>
  <circle class="led" cx="${f1(w * 0.42)}" cy="${f1(h * 0.875)}" r="${f1(h * 0.025)}" fill="${RED}" stroke="${INK}" stroke-width="4"/>${vents}</svg>`;
}
function mkCRT(pa, x, y, w, h, o = {}) {
  const d = box(pa, x, y, w, h, { zIndex: o.z || 10 });
  d.innerHTML = crtCase(w, h);
  const sx = w * 0.08, sy = h * 0.08, sw = w * 0.84, shh = h * 0.68;
  const scr = box(d, sx, sy, sw, shh, { borderRadius: '22px', overflow: 'hidden', background: RED, zIndex: 2 });
  const glow = box(scr, 0, 0, sw, shh, { background: 'radial-gradient(ellipse at 50% 45%, rgba(255,120,90,.85), rgba(200,16,46,0) 70%)' });
  box(scr, 0, 0, sw, shh, { backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,.18) 0 3px, transparent 3px 8px)', zIndex: 3 });
  const txt = el('div', scr, { left: 0, top: px(shh * (o.num ? 0.12 : 0.24)), width: px(sw), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(o.size || sw * 0.25), lineHeight: 1, color: '#fff', letterSpacing: '0.04em', textShadow: '0 0 18px rgba(255,255,255,.7), 5px 5px 0 rgba(43,33,24,.55)', zIndex: 4 }, o.text || 'MISIL');
  let num = null;
  if (o.num) num = el('div', scr, { left: 0, top: px(shh * 0.5), width: px(sw), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sw * 0.3), lineHeight: 1, color: YEL, textShadow: `0 0 16px rgba(255,230,0,.6), 5px 5px 0 ${INK}`, zIndex: 4 }, '×1');
  const sweep = box(scr, 0, 0, sw, 60, { background: 'linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,.22), rgba(255,255,255,0))', zIndex: 5 });
  const led = d.querySelector('.led');
  return { d, scr, glow, txt, num, sweep, led, sh: shh, sw };
}
// estado de la pantalla: 'red' (alarma, parpadea), 'off' (apagada), 'dim'
function crtState(c, t, mode = 'red') {
  const on = blink2(t);
  if (mode === 'red') { c.scr.style.background = on ? '#E0202F' : '#5E0712'; c.glow.style.opacity = on ? 1 : 0.1; c.txt.style.opacity = on ? 1 : 0.3; }
  else if (mode === 'off') { c.scr.style.background = CRTOFF; c.glow.style.opacity = 0; c.txt.style.opacity = 0; }
  else { c.scr.style.background = '#5a1a20'; c.glow.style.opacity = 0.15; c.txt.style.opacity = 0.35; }
  set(c.sweep, { y: ((t * 260) % (c.sh + 80)) - 60 });
  if (c.led) c.led.setAttribute('fill', mode === 'red' && on ? '#ff4040' : '#5a1a20');
}

/* ---------- PERSONAJES ---------- */
const greyHair = () => { const h = 'M116,206 C104,140 140,112 184,112 C232,112 260,142 246,206 C238,170 214,150 182,150 C150,150 126,168 116,206 Z'; return D(h, '#D8D2C4') + HF(h, 'hF'); };
const specsOver = () => `<circle cx="156" cy="204" r="22" fill="rgba(255,255,255,.3)" stroke="${INK}" stroke-width="5"/><circle cx="204" cy="204" r="22" fill="rgba(255,255,255,.3)" stroke="${INK}" stroke-width="5"/><path d="M178,202 q2,-6 4,0 M134,200 L118,196 M226,200 L242,196" stroke="${INK}" stroke-width="4" fill="none"/>`;
const coatOver = (col = '#3a2a1e') => {
  const coat = 'M28,460 C32,384 80,338 140,328 L220,328 C280,338 328,384 332,460 Z';
  return `<path d="${coat}" fill="${col}" stroke="${INK}" stroke-width="3"/><path d="${coat}" fill="url(#hW)" opacity=".18"/><path d="M146,330 L180,430 L214,330 Z" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M146,330 L118,460 M214,330 L242,460" stroke="${FIG}" stroke-width="2.5" opacity=".55"/><path d="M146,330 L112,392 L136,400 L160,340 M214,330 L248,392 L224,400 L200,340" fill="${col}" stroke="${INK}" stroke-width="3"/><path d="M164,338 l16,40 l16,-40" fill="#4a3a32" stroke="${INK}" stroke-width="2.5"/>`;
};
// Petrov joven: oficial con gorra (sin rótulo de rango)
function petrovInner() { return bustInner({ hat: 'cap', uniform: 'officer', seed: 12 }); }
// Petrov mayor: traje, pelo cano y gafas
function petrovOldInner() { return bustInner({ uniform: 'soldier', seed: 33 }) + coatOver('#3d3a36') + greyHair() + specsOver(); }
// el superior que echa la bronca
function bossInner() { return bustInner({ hat: 'cap', uniform: 'officer', moustache: true, seed: 3 }); }
// auricular de teléfono (viewBox local ~ 0 0 120 220)
const RECEIVER = (x, y, r = 0, s = 1, col = '#1e1a17') => `<g transform="translate(${x},${y}) rotate(${r}) scale(${s})"><path d="M10,10 C-6,10 -8,40 10,46 L22,46 C30,90 30,130 22,174 L10,174 C-8,180 -6,210 10,210 L52,210 C62,210 66,196 62,186 C50,140 50,80 62,34 C66,24 62,10 52,10 Z" fill="${col}" stroke="${INK}" stroke-width="5"/><path d="M14,22 h36 M14,198 h36" stroke="#5a5048" stroke-width="3"/></g>`;
// silueta de la portada: oficial con el auricular en la oreja (se pinta en negro con filtro)
function silPhoneInner() {
  const arm = limb(86, 400, 70, 262, 34, 26);
  return bustInner({ hat: 'cap', uniform: 'officer', seed: 12 }) + D(arm, '#1e1a17') + `<ellipse cx="80" cy="250" rx="30" ry="34" fill="#1e1a17"/>` + RECEIVER(56, 136, -8, 0.62);
}
// tú, mirando el móvil (silueta)
function youInner() {
  const arm = limb(100, 420, 168, 352, 30, 24), arm2 = limb(262, 420, 196, 352, 30, 24);
  return bustInner({ uniform: 'soldier', seed: 50 }) + `<path d="M116,206 C104,140 140,112 184,112 C232,112 260,142 246,206 C238,170 214,150 182,150 C150,150 126,168 116,206 Z" fill="#1e1a17"/>` + D(arm, '#1e1a17') + D(arm2, '#1e1a17');
}

/* ---------- OBJETOS ---------- */
function phoneInner() { // teléfono de baquelita, viewBox 0 0 420 300 (sin auricular)
  const base = 'M40,280 L80,110 Q90,80 130,80 L290,80 Q330,80 340,110 L380,280 Z';
  let holes = ''; for (let k = 0; k < 10; k++) { const a = -Math.PI * 0.15 + k / 10 * Math.PI * 1.55; holes += `<circle cx="${f1(210 + Math.cos(a) * 52)}" cy="${f1(190 + Math.sin(a) * 52)}" r="12" fill="#F4ECDB" stroke="${INK}" stroke-width="3"/>`; }
  return cut(P(base)) + D(base, '#1e1a17', 5) + `<path d="${base}" fill="url(#hW)" opacity=".25"/><circle cx="210" cy="190" r="78" fill="#3a332c" stroke="${INK}" stroke-width="5"/>${holes}<circle cx="210" cy="190" r="26" fill="#F4ECDB" stroke="${INK}" stroke-width="4"/>
  <path d="M110,80 L120,52 L150,52 L160,80 M260,80 L270,52 L300,52 L310,80" fill="#1e1a17" stroke="${INK}" stroke-width="5"/><path d="M380,250 C430,250 440,300 420,320" stroke="${INK}" stroke-width="6" fill="none"/>`;
}
const receiverSvg = () => `<svg viewBox="-10 0 300 120" width="100%" height="100%" style="overflow:visible">${cut('<path d="M10,20 C10,0 50,-4 60,20 L70,40 L210,40 L220,20 C230,-4 270,0 270,20 L268,70 C268,96 222,100 214,80 L206,64 L74,64 L66,80 C58,100 12,96 12,70 Z"/>', 4, 6)}<path d="M10,20 C10,0 50,-4 60,20 L70,40 L210,40 L220,20 C230,-4 270,0 270,20 L268,70 C268,96 222,100 214,80 L206,64 L74,64 L66,80 C58,100 12,96 12,70 Z" fill="#1e1a17" stroke="${INK}" stroke-width="5"/><path d="M80,48 H200" stroke="#5a5048" stroke-width="3"/></svg>`;
function buttonInner() { // botón rojo en pedestal, viewBox 0 0 360 360
  const ped = 'M60,360 L90,200 L270,200 L300,360 Z', top = 'M50,170 L310,170 L310,210 L50,210 Z', dome = 'M90,172 C90,90 270,90 270,172 Z';
  return cut(P(ped) + P(top) + P(dome)) + D(ped, '#CFC8B8', 5) + HF(ped, 'hA') + D(top, '#A39A88', 5) + HF(top, 'hD') + D(dome, RED, 6) +
    `<path d="M120,140 C130,112 170,104 196,106" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".7"/><path d="M90,172 C90,90 270,90 270,172" fill="url(#hA)" opacity=".25"/><rect x="130" y="250" width="100" height="44" rx="8" fill="${FIG}" stroke="${INK}" stroke-width="4"/>`;
}
function sleeveHand() { // manga de uniforme con galones + guante blanco que apunta abajo, viewBox 0 0 200 560
  const sl = 'M50,0 L150,0 L146,380 L54,380 Z';
  return cut(P(sl)) + D(sl, '#3d4a3a', 5) + HF(sl, 'hW') + `<rect x="50" y="330" width="98" height="16" fill="${GOLD}" stroke="${INK}" stroke-width="3"/><rect x="50" y="352" width="98" height="10" fill="${GOLD}" stroke="${INK}" stroke-width="3"/>` + gloveHand(100, 430, 180, 1.9);
}
function planeInner() { // avión de pasajeros de perfil, viewBox 0 0 640 220
  const fus = 'M40,120 C40,90 80,82 120,82 L520,82 C580,82 620,100 630,118 C620,136 580,150 520,150 L120,150 C70,150 40,140 40,120 Z';
  const wing = 'M260,130 L360,130 L250,214 L210,214 Z', tail = 'M60,100 L20,10 L70,10 L140,86 Z', stab = 'M60,126 L10,150 L60,150 L110,132 Z', wingT = 'M270,92 L350,92 L280,40 L250,40 Z';
  let win = ''; for (let x = 160; x < 520; x += 30) win += `<rect x="${x}" y="100" width="14" height="18" rx="5" fill="#FBF6EA" stroke="${INK}" stroke-width="2.5"/>`;
  return cut(P(fus) + P(wing) + P(tail) + P(stab)) + D(wingT, '#CFC8B8', 4) + D(tail, '#E7E0D0', 5) + HF(tail, 'hA') + D(fus, '#F4ECDB', 5) + clipG(uid('pf'), fus, `<rect x="0" y="128" width="660" height="40" fill="url(#hA)"/>`) + `<path d="M40,124 H600" stroke="${RED}" stroke-width="7"/>` + win +
    `<path d="M560,98 L600,104 L604,114 L566,112 Z" fill="${INK}"/>` + D(wing, '#CFC8B8', 5) + HF(wing, 'hD') + D(stab, '#E7E0D0', 4);
}
function rocketSvg(col = '#F4ECDB', flame = true) { // viewBox 0 0 60 160, punta hacia arriba
  return `<svg viewBox="0 0 60 160" width="100%" height="100%" style="overflow:visible">${flame ? `<path d="M18,120 Q30,170 42,120 Z" fill="${YEL}" stroke="${INK}" stroke-width="3"/><path d="M24,120 Q30,150 36,120 Z" fill="#F2983E"/>` : ''}<path d="M30,0 C46,20 48,60 46,120 L14,120 C12,60 14,20 30,0 Z" fill="${col}" stroke="${INK}" stroke-width="4"/><path d="M14,96 L0,126 L14,120 Z M46,96 L60,126 L46,120 Z" fill="${RED}" stroke="${INK}" stroke-width="3.5"/><path d="M30,0 C40,14 44,28 45,40 L15,40 C16,28 20,14 30,0 Z" fill="${RED}" stroke="${INK}" stroke-width="3.5"/><path d="M38,50 V114" stroke="${INK}" stroke-width="2" opacity=".5"/></svg>`;
}
function sunInner() { // sol de grabado con cara, viewBox 0 0 360 360 (cara en 180,180)
  let rays = ''; for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2, a1 = a - 0.09, a2 = a + 0.09; rays += `<path d="M${f1(180 + Math.cos(a1) * 110)},${f1(180 + Math.sin(a1) * 110)} L${f1(180 + Math.cos(a) * (k % 2 ? 160 : 178))},${f1(180 + Math.sin(a) * (k % 2 ? 160 : 178))} L${f1(180 + Math.cos(a2) * 110)},${f1(180 + Math.sin(a2) * 110)} Z" fill="${YEL}" stroke="${INK}" stroke-width="4"/>`; }
  return `<g class="rays">${rays}</g>` + cut('<circle cx="180" cy="180" r="112"/>', 4, 6) + `<circle cx="180" cy="180" r="112" fill="${YEL}" stroke="${INK}" stroke-width="6"/><ellipse cx="216" cy="196" rx="80" ry="96" fill="url(#hA)" opacity=".35"/>
   <circle cx="140" cy="210" r="16" fill="${ROUGE}"/><circle cx="224" cy="210" r="16" fill="${ROUGE}"/>
   <g class="eyeL"><ellipse cx="146" cy="166" rx="13" ry="16" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="150" cy="168" r="7" fill="${INK}"/></g>
   <g class="eyeR"><ellipse cx="214" cy="166" rx="13" ry="16" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="218" cy="168" r="7" fill="${INK}"/></g>
   <path class="wink" d="M200,168 q14,-10 28,0" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round" style="opacity:0"/>
   <path d="M136,138 q12,-8 24,-2 M204,136 q12,-6 24,2" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>
   <path d="M144,226 Q180,262 220,224" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
}
function cloudPath(x, y, s = 1) { return `M${x},${y} c${-40 * s},0 ${-60 * s},${-40 * s} ${-20 * s},${-60 * s} c${0},${-50 * s} ${70 * s},${-60 * s} ${90 * s},${-24 * s} c${20 * s},${-50 * s} ${110 * s},${-40 * s} ${110 * s},${10 * s} c${50 * s},${-10 * s} ${80 * s},${50 * s} ${30 * s},${74 * s} Z`; }
function cloudSvg(w, h, x, y, s, o = {}) {
  const d = cloudPath(x, y, s);
  return `<svg width="${w}" height="${h}" style="overflow:visible;position:absolute;left:0;top:0">${o.nocut ? '' : cut(P(d), 5, 7)}<path d="${d}" fill="${o.fill || '#FBF6EA'}" stroke="${INK}" stroke-width="5"/><path d="${d}" fill="url(#hF)" opacity=".22"/></svg>`;
}
function satInner() { // satélite con cara, viewBox 0 0 520 300 (cuerpo 190–330)
  let grid = '';
  [[10, 100], [340, 100]].forEach(([x0, y0]) => { for (let i = 1; i < 6; i++) grid += `<path d="M${x0 + i * 28},${y0} V${y0 + 100}" stroke="${INK}" stroke-width="2.5"/>`; grid += `<path d="M${x0},${y0 + 50} H${x0 + 170}" stroke="${INK}" stroke-width="2.5"/>`; });
  const body = 'M190,60 L330,60 L330,240 L190,240 Z';
  return cut(P(body) + '<rect x="10" y="100" width="170" height="100"/><rect x="340" y="100" width="170" height="100"/>') +
    `<path d="M180,150 H190 M330,150 H340" stroke="${INK}" stroke-width="8"/><rect x="10" y="100" width="170" height="100" fill="#4a5a7a" stroke="${INK}" stroke-width="5"/><rect x="340" y="100" width="170" height="100" fill="#4a5a7a" stroke="${INK}" stroke-width="5"/>${grid}
    <rect x="10" y="100" width="170" height="100" fill="url(#hA)" opacity=".35"/><rect x="340" y="100" width="170" height="100" fill="url(#hA)" opacity=".35"/>` +
    D(body, GOLD, 6) + HF(body, 'hB') + `<path d="M260,60 L260,10 M240,10 H280" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    <g class="eyes"><ellipse cx="232" cy="122" rx="22" ry="26" fill="#fff" stroke="${INK}" stroke-width="4.5"/><ellipse cx="288" cy="122" rx="22" ry="26" fill="#fff" stroke="${INK}" stroke-width="4.5"/>
    <g class="pup"><circle cx="234" cy="128" r="10" fill="${INK}"/><circle cx="290" cy="128" r="10" fill="${INK}"/></g></g>
    <path class="brow" d="M210,86 q22,-12 44,-2 M266,84 q22,-10 44,2" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <circle cx="260" cy="196" r="30" fill="#2B2118" stroke="${INK}" stroke-width="5"/><circle cx="260" cy="196" r="18" fill="#5a7a9a"/><circle class="glint" cx="252" cy="188" r="7" fill="#fff"/>`;
}
function medalInner() { // viewBox 0 0 200 300
  return cut('<path d="M60,0 L140,0 L120,120 L80,120 Z"/><circle cx="100" cy="200" r="80"/>') + `<path d="M60,0 L100,0 L100,130 L80,120 Z" fill="${RED}" stroke="${INK}" stroke-width="4"/><path d="M100,0 L140,0 L120,120 L100,130 Z" fill="#E9C75C" stroke="${INK}" stroke-width="4"/>
   <circle cx="100" cy="200" r="80" fill="${GOLD}" stroke="${INK}" stroke-width="6"/><circle cx="100" cy="200" r="60" fill="none" stroke="${INK}" stroke-width="3"/><circle cx="100" cy="200" r="34" fill="#F7E08a" stroke="${INK}" stroke-width="4"/><path d="M84,200 l12,12 l20,-24" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/><ellipse cx="128" cy="214" rx="40" ry="56" fill="url(#hA)" opacity=".3"/>`;
}
function papersSvg(n, seed = 5) { // pila de papeles (HTML/SVG 520x560), cada hoja una <g class="pp">
  const r = rng(seed); let s = '';
  for (let i = 0; i < n; i++) { const y = 520 - i * 22, x = 40 + (r() - 0.5) * 40, rot = (r() - 0.5) * 8; s += `<g class="pp" transform="rotate(${f1(rot)} ${f1(x + 220)} ${y})"><rect x="${f1(x)}" y="${y - 30}" width="440" height="40" rx="3" fill="${i % 3 ? '#FBF6EA' : '#F1E6CC'}" stroke="${INK}" stroke-width="3.5"/><path d="M${f1(x + 20)},${y - 12} h${f1(200 + r() * 160)}" stroke="${INK}" stroke-width="2" opacity=".5"/></g>`; }
  return `<svg width="520" height="560" style="overflow:visible">${s}</svg>`;
}
const glassesOver = () => `<g><circle cx="152" cy="214" r="40" fill="rgba(255,255,255,.18)" stroke="${INK}" stroke-width="7"/><circle cx="248" cy="214" r="40" fill="rgba(255,255,255,.18)" stroke="${INK}" stroke-width="7"/><path d="M192,210 q8,-8 16,0 M112,208 L84,198 M288,208 L316,198" stroke="${INK}" stroke-width="6" fill="none"/></g>`;
function stampToolSvg() { // sello de goma, viewBox 0 0 160 240
  return `<svg viewBox="0 0 160 240" width="100%" height="100%" style="overflow:visible">${cut('<ellipse cx="80" cy="40" rx="40" ry="38"/><rect x="60" y="70" width="40" height="110"/><rect x="10" y="170" width="140" height="60" rx="10"/>', 4, 6)}<rect x="60" y="70" width="40" height="110" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><ellipse cx="80" cy="40" rx="40" ry="38" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><ellipse cx="92" cy="48" rx="24" ry="26" fill="url(#hA)" opacity=".4"/><rect x="10" y="170" width="140" height="44" rx="10" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="16" y="212" width="128" height="18" fill="${RED}" stroke="${INK}" stroke-width="4"/></svg>`;
}
function globeSvg() { // planeta dormido, viewBox 0 0 460 460
  const id = uid('gl');
  return `<svg viewBox="0 0 460 460" width="100%" height="100%" style="overflow:visible">${cut('<circle cx="230" cy="230" r="200"/>')}<circle cx="230" cy="230" r="200" fill="#AFC6CF" stroke="${INK}" stroke-width="7"/>
  ${clipG(id, 'M30,230 a200,200 0 1,0 400,0 a200,200 0 1,0 -400,0', `<path d="M60,120 C120,80 180,110 190,150 C200,200 150,210 140,260 C130,300 90,300 70,260 Z M250,70 C320,60 400,110 410,170 C380,180 340,160 320,200 C300,240 330,290 300,330 C270,350 240,300 250,250 C255,210 220,190 230,150 Z M150,340 C190,330 230,360 220,400 C190,420 150,400 150,340 Z" fill="#B9C79A" stroke="${INK}" stroke-width="4"/><rect x="0" y="0" width="460" height="460" fill="url(#hA)" opacity=".18"/><ellipse cx="300" cy="280" rx="170" ry="190" fill="url(#hB)" opacity=".3"/>`)}
  <path d="M150,220 q26,20 52,0 M258,220 q26,20 52,0" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M196,300 q34,18 68,0" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M110,200 q10,-12 22,0 M330,200 q10,-12 22,0" stroke="${INK}" stroke-width="0"/></svg>`;
}
function calPage(w, h, top, big, o = {}) { // hoja de calendario de grabado (HTML)
  const d = el('div', null, { left: 0, top: 0, width: px(w), height: px(h) });
  d.innerHTML = `<svg width="${w}" height="${h}" style="position:absolute;left:0;top:0;overflow:visible">${cut(`<rect x="0" y="20" width="${w}" height="${h - 20}" rx="18"/>`)}<rect x="0" y="20" width="${w}" height="${h - 20}" rx="18" fill="#FBF6EA" stroke="${INK}" stroke-width="7"/><rect x="0" y="20" width="${w}" height="${f1(h * 0.26)}" rx="18" fill="${o.band || RED}" stroke="${INK}" stroke-width="7"/><rect x="0" y="20" width="${w}" height="${h - 20}" rx="18" fill="url(#hP)" opacity=".45"/>
   ${[0.2, 0.4, 0.6, 0.8].map(k => `<rect x="${f1(w * k - 12)}" y="0" width="24" height="56" rx="10" fill="${STEEL}" stroke="${INK}" stroke-width="5"/>`).join('')}</svg>
   <div style="position:absolute;left:0;top:${f1(20 + h * 0.04)}px;width:${w}px;text-align:center;font-family:Rye;font-size:${f1(h * 0.13)}px;color:#fff;text-shadow:3px 3px 0 ${INK}">${top}</div>
   <div class="big" style="position:absolute;left:0;top:${f1(h * 0.38)}px;width:${w}px;text-align:center;font-family:Playfair;font-weight:900;font-size:${f1(o.bigSize || h * 0.4)}px;line-height:1;color:${INK}">${big}</div>`;
  return d;
}
function newsInner(w = 620, h = 760) {
  let lines = ''; for (let i = 0; i < 9; i++) lines += `<path d="M${i % 2 ? 330 : 40},${520 + Math.floor(i / 2) * 44} h${i % 2 ? 250 : 260}" stroke="${INK}" stroke-width="5" opacity=".5"/>`;
  return `<svg width="${w}" height="${h}" style="position:absolute;left:0;top:0;overflow:visible">${cut(`<rect x="0" y="0" width="${w}" height="${h}" rx="6"/>`)}<rect x="0" y="0" width="${w}" height="${h}" rx="6" fill="#F4ECDB" stroke="${INK}" stroke-width="6"/><rect x="0" y="0" width="${w}" height="${h}" fill="url(#hP)" opacity=".5"/>
  <text x="${w / 2}" y="86" text-anchor="middle" font-family="Rye" font-size="70" fill="${INK}">EL DIARIO</text><path d="M30,112 H${w - 30} M30,124 H${w - 30}" stroke="${INK}" stroke-width="4"/>
  <rect x="40" y="290" width="240" height="200" fill="#d6ccb4" stroke="${INK}" stroke-width="4"/><rect x="40" y="290" width="240" height="200" fill="url(#hA)" opacity=".6"/>${lines}</svg>`;
}
function STARS(c) { const r = rng(7); let s = ''; for (let i = 0; i < 40; i++) s += `<circle cx="${f1(r() * 1080)}" cy="${f1(180 + r() * 520)}" r="${f1(1.5 + r() * 2.5)}" fill="#fff" opacity="${f1(0.4 + r() * 0.5)}"/>`; box(c, 0, 0, 1080, 1920, { zIndex: 1 }).innerHTML = `<svg width="1080" height="1920">${s}</svg>`; }
