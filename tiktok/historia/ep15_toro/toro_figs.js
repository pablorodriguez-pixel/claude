/* Ep. 15 · Al toro le da igual el rojo — tiempos (por texto) + figuras nuevas en estilo grabado recortado */

/* ---------- tiempos clave (todo por texto, nunca absolutos) ---------- */
const fw = (ph, from = 0) => find(ph, from);
const ws = i => W[i].s, wE = i => W[i].e;
const K = {};
{
  const i0 = fw('al toro le da igual el rojo'); K.toro0 = ws(i0 + 1); K.le = ws(i0 + 2); K.igual = ws(i0 + 4); K.rojo0 = ws(i0 + 6);
  K.no0 = ws(i0 + 7); K.disting = ws(i0 + 9); K.L0e = wE(i0 + 9);
  const i1 = fw('y la prueba la has visto'); K.L1 = ws(i1); K.prueba1 = ws(i1 + 2); K.visto = ws(i1 + 5); K.mil = ws(i1 + 6); K.sin = ws(i1 + 8); K.cuenta = ws(i1 + 10); K.L1e = wE(i1 + 10);
  const i2 = fw('los toros ven pocos colores'); K.L2 = ws(i2); K.ven = ws(i2 + 2); K.pocos = ws(i2 + 3); K.colores = ws(i2 + 4);
  const i2b = fw('no tienen receptores para el rojo'); K.no2 = ws(i2b); K.recep = ws(i2b + 2); K.rojo2 = ws(i2b + 5);
  const i2c = fw('como algunas personas daltonicas'); K.como = ws(i2c); K.personas = ws(i2c + 2); K.dalt = ws(i2c + 3);
  const i2d = fw('para ellos el rojo es un gris mas'); K.para = ws(i2d); K.rojo3 = ws(i2d + 3); K.gris = ws(i2d + 6); K.L2e = wE(i2d + 7);
  const i3 = fw('entonces por que embisten'); K.L3 = ws(i3); K.embisten = ws(i3 + 3);
  const i3b = fw('por el movimiento'); K.por = ws(i3b); K.movim = ws(i3b + 2);
  const i3c = fw('van a por lo que se mueve'); K.van = ws(i3c); K.mueve = ws(i3c + 6); K.L3e = wE(i3c + 6);
  const i4 = fw('y aqui esta la prueba'); K.L4 = ws(i4); K.prueba2 = ws(i4 + 4);
  const i4b = fw('el capote', i4); K.capote = ws(i4b + 1);
  const i4c = fw('primera parte de la corrida'); K.primera = ws(i4c); K.corrida = ws(i4c + 4);
  const i4d = fw('es rosa y amarillo'); K.es4 = ws(i4d); K.rosa = ws(i4d + 1); K.amarillo = ws(i4d + 3);
  const i4e = fw('y el toro embiste igual'); K.y4 = ws(i4e); K.embiste = ws(i4e + 3); K.igual4 = ws(i4e + 4); K.L4e = wE(i4e + 4);
  const i5 = fw('lo han probado con trapos'); K.L5 = ws(i5); K.probado = ws(i5 + 2); K.trapos = ws(i5 + 4); K.varios = ws(i5 + 6); K.colores5 = ws(i5 + 7);
  const i5b = fw('el toro va a por el que se mueve'); K.el5 = ws(i5b); K.va = ws(i5b + 2); K.que5 = ws(i5b + 6); K.mueve5 = ws(i5b + 8);
  const i5c = fw('sea del color que sea'); K.sea = ws(i5c); K.color5 = ws(i5c + 2); K.sea2 = ws(i5c + 4); K.L5e = wE(i5c + 4);
  const i6 = fw('y por que la muleta es roja'); K.L6 = ws(i6); K.muleta = ws(i6 + 4); K.roja = ws(i6 + 6);
  const i6b = fw('por tradicion'); K.por6 = ws(i6b); K.trad = ws(i6b + 1);
  const i6c = fw('y porque dicen'); K.y6 = ws(i6c); K.dicen = ws(i6c + 2);
  const i6d = fw('se nota menos la sangre'); K.nota = ws(i6d + 1); K.menos = ws(i6d + 2); K.sangre = ws(i6d + 4); K.L6e = wE(i6d + 4);
  const i7 = fw('ojo el toro no es ciego'); K.ojo = ws(i7); K.el7 = ws(i7 + 1); K.noes = ws(i7 + 3); K.ciego = ws(i7 + 5);
  const i7b = fw('ve y el movimiento'); K.ve = ws(i7b); K.movim7 = ws(i7b + 3); K.muy = ws(i7b + 6); K.bien = ws(i7b + 7);
  const i7c = fw('lo que no ve es el rojo'); K.loque = ws(i7c); K.nove = ws(i7c + 2); K.es7 = ws(i7c + 4); K.rojo7 = ws(i7c + 6); K.L7e = wE(i7c + 6);
  const i8 = fw('o sea el trapo rojo es para el publico'); K.L8 = ws(i8); K.trapo8 = ws(i8 + 3); K.para8 = ws(i8 + 6); K.publico = ws(i8 + 8);
  const i8b = fw('no para el toro', i8); K.no8 = ws(i8b); K.toro8 = ws(i8b + 3);
  const i8c = fw('te lo creias'); K.te = ws(i8c); K.creias = ws(i8c + 2);
  const i8d = fw('si o no', i8c); K.si = ws(i8d); K.noB = ws(i8d + 2); K.L8e = wE(i8d + 2);
  const is = fw('soy tu vecino'); K.soy = ws(is); K.vecino = ws(is + 2); K.isoy = is;
  const iye = fw('y esto no venia en el libro', is); K.iye = iye; K.ye = ws(iye); K.libro = ws(iye + 6); K.END = wE(iye + 6);
}
/* cortes de escena */
const S = {
  A: [-1, (K.L0e + K.L1) / 2], B: [(K.L0e + K.L1) / 2, K.L2 - 0.12],
  C1: [K.L2 - 0.12, K.no2 - 0.08], C2: [K.no2 - 0.08, K.para - 0.1], C3: [K.para - 0.1, K.L3 - 0.12],
  D1: [K.L3 - 0.12, K.por - 0.1], D2: [K.por - 0.1, K.L4 - 0.1],
  E1: [K.L4 - 0.1, K.capote - 0.14], E2: [K.capote - 0.14, K.y4 - 0.1], E3: [K.y4 - 0.1, K.L5 - 0.1],
  F: [K.L5 - 0.1, K.L6 - 0.1],
  G1: [K.L6 - 0.1, K.por6 - 0.1], G2: [K.por6 - 0.1, K.y6 - 0.05], G3: [K.y6 - 0.05, K.ojo - 0.06],
  H1: [K.ojo - 0.06, K.ve - 0.1], H2: [K.ve - 0.1, K.L8 - 0.08],
  HIT: [K.L8 - 0.08, K.soy - 0.1],
  C: [K.soy - 0.1, K.ye - 0.06], L2: [K.ye - 0.06, 999],
};
const DUR = K.END + 0.6, LOOP = DUR - 0.4;

/* ---------- paleta propia ---------- */
const BULL = '#4b382b', HORN = '#F1E7CF', MUZ = '#CDB4A0', GREY = '#8d8780', GREY2 = '#6f6a64';
const CAPP = '#E8559A', CAPY = '#F7C531', BLUE = '#2F6DB5', GREEN = '#3E9A5A';

/* ---------- TORO DE FRENTE (busto de grabado, viewBox 0 0 600 640) ---------- */
function bullFrontInner(o = {}) {
  const id = uid('bf'), r = rng(o.seed || 1515);
  const body = 'M30,640 C34,500 120,398 300,386 C480,398 566,500 570,640 Z';
  const earL = 'M200,252 C150,226 92,226 58,258 C92,288 152,294 204,278 Z', earLi = 'M182,258 C150,246 110,246 88,260 C116,276 150,278 184,270 Z';
  const hornL = 'M216,198 C158,198 104,176 82,94 C78,72 94,64 102,82 C124,140 168,160 224,160 Z';
  const head = 'M182,176 C184,138 240,124 300,124 C360,124 416,138 418,176 C426,250 412,322 390,394 C376,442 346,470 300,470 C254,470 224,442 210,394 C188,322 174,250 182,176 Z';
  const muz = 'M222,392 C222,354 258,344 300,344 C342,344 378,354 378,392 C382,442 350,472 300,472 C250,472 218,442 222,392 Z';
  const chin = 'M238,446 C252,490 348,490 362,446 C360,486 340,512 300,514 C260,512 240,486 238,446 Z';
  const mir = s => `<g transform="translate(600,0) scale(-1,1)">${s}</g>`;
  let s = '';
  // hombros / morrillo
  let curls = ''; for (let k = 0; k < 26; k++) { const x = 70 + r() * 460, y = 430 + r() * 190; if (Math.abs(x - 300) < 90 && y < 520) continue; curls += `M${f1(x)},${f1(y)}q8,-10 16,0 q-5,8 -10,3`; }
  s += `<g class="shoul">${cut(P(body), 8, 10)}${D(body, BULL, 4)}${clipG(id + 'b', body, `<rect x="330" y="380" width="260" height="270" fill="url(#hA)" opacity=".9"/><rect x="20" y="560" width="580" height="90" fill="url(#hB)" opacity=".7"/>`)}<path d="${curls}" stroke="${FIG}" stroke-width="2.4" fill="none" opacity=".55"/></g>`;
  // cabeza (orejas y cuernos detrás)
  let hg = cut(P(earL) + P(hornL) + `<g transform="translate(600,0) scale(-1,1)">${P(earL)}${P(hornL)}</g>` + P(head), 7, 9);
  const earS = D(earL, BULL, 3.5) + D(earLi, '#c99a86', 2.5) + HF(earLi, 'hA');
  const hornS = D(hornL, HORN, 3.5) + clipG(uid('hn'), hornL, `<rect x="60" y="60" width="180" height="60" fill="${GREY2}"/><rect x="150" y="140" width="90" height="70" fill="url(#hA)"/>`) + `<path d="M118,128 q10,-10 22,-6 M134,144 q12,-8 24,-2 M156,154 q12,-6 22,0" stroke="${INK}" stroke-width="2.2" fill="none"/>` + D(hornL, 'none', 3.5);
  hg += earS + mir(earS) + hornS + mir(hornS);
  hg += D(head, BULL, 4) + clipG(id + 'h', head, `<ellipse cx="400" cy="300" rx="60" ry="200" fill="url(#hA)"/><ellipse cx="300" cy="460" rx="140" ry="40" fill="url(#hB)"/>`);
  // flequillo rizado
  let fr = ''; for (let k = 0; k < 9; k++) { const x = 236 + k * 16 + (k % 2) * 4, y = 150 + (k % 3) * 12; fr += `M${x},${y}q9,-12 18,0 q-6,9 -11,3`; }
  hg += `<path d="${fr}" stroke="${FIG}" stroke-width="3" fill="none" opacity=".75" stroke-linecap="round"/><path d="M206,200 q-6,60 6,120 M394,200 q6,60 -6,120" stroke="${FIG}" stroke-width="2" fill="none" opacity=".35"/>`;
  // ojos
  const EY = [[242, 262], [358, 262]];
  hg += EY.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="36" ry="30" fill="#fff" stroke="${INK}" stroke-width="4.5"/>`).join('');
  hg += `<g class="pup">${EY.map(([x, y]) => `<circle cx="${x}" cy="${y + 2}" r="15" fill="${INK}"/><circle cx="${x - 5}" cy="${y - 4}" r="5" fill="#fff"/>`).join('')}</g>`;
  hg += `<g class="lidH" style="opacity:0">${EY.map(([x, y]) => `<path d="M${x - 37},${y} A37,31 0 0,1 ${x + 37},${y} Z" fill="${BULL}" stroke="${INK}" stroke-width="4.5"/><path d="M${x - 34},${y} H${x + 34}" stroke="${FIG}" stroke-width="2" opacity=".6"/>`).join('')}</g>`;
  hg += `<g class="lidC" style="opacity:0">${EY.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="38" ry="32" fill="${BULL}" stroke="${INK}" stroke-width="4.5"/><path d="M${x - 30},${y + 2} q30,16 60,0" stroke="${FIG}" stroke-width="4" fill="none" stroke-linecap="round"/>`).join('')}</g>`;
  const brow = (d) => `<path d="${d}" stroke="${INK}" stroke-width="17" stroke-linecap="round" fill="none"/><path d="${d}" stroke="${FIG}" stroke-width="9" stroke-linecap="round" fill="none"/>`;
  hg += `<g class="browL">${brow('M206,222 Q238,204 272,218')}</g><g class="browR">${brow('M328,218 Q362,204 394,222')}</g>`;
  // boca (bostezo) + barbilla + hocico
  hg += `<g class="yawn" style="opacity:0"><ellipse cx="300" cy="474" rx="60" ry="50" fill="#2a0f0f" stroke="${INK}" stroke-width="4"/><ellipse cx="300" cy="502" rx="38" ry="16" fill="#d2667a"/></g>`;
  hg += `<g class="jaw">${D(chin, BULL, 4)}${HF(chin, 'hA')}</g>`;
  hg += D(muz, MUZ, 4) + clipG(id + 'm', muz, `<ellipse cx="300" cy="470" rx="110" ry="34" fill="url(#hA)" opacity=".7"/>`) + `<ellipse cx="266" cy="408" rx="13" ry="19" fill="#2a1a12" transform="rotate(-18 266 408)"/><ellipse cx="334" cy="408" rx="13" ry="19" fill="#2a1a12" transform="rotate(18 334 408)"/><path d="M262,452 Q300,464 338,452" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  // gafas (gag)
  hg += `<g class="specs" style="opacity:0"><circle cx="242" cy="262" r="50" fill="rgba(255,255,255,.22)" stroke="${INK}" stroke-width="9"/><circle cx="358" cy="262" r="50" fill="rgba(255,255,255,.22)" stroke="${INK}" stroke-width="9"/><path d="M292,258 q8,-12 16,0" stroke="${INK}" stroke-width="8" fill="none"/><path d="M192,252 L150,238 M408,252 L450,238" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M214,236 q12,-12 26,-10 M330,236 q12,-12 26,-10" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".8"/></g>`;
  s += `<g class="headg">${hg}</g>`;
  return s;
}
function mkBull(pa, b, o = {}) {
  const f = mk(pa, b, bullFrontInner(o), '0 0 600 640', 'bull'); const q = s => f.d.querySelector(s);
  f.yawn = q('.yawn'); f.shoul = q('.shoul'); f.headg = q('.headg'); f.specs = q('.specs'); return f;
}
function bullFace(f, t, o = {}) {
  face(f, t, o);
  const a = o.ang || 0;
  f.browL.setAttribute('transform', `translate(0 ${f1(-(o.bL || 0))}) rotate(${f1(a)} 238 214)`);
  f.browR.setAttribute('transform', `translate(0 ${f1(-(o.bR || 0))}) rotate(${f1(-a)} 362 214)`);
  f.yawn.style.opacity = (o.jaw || 0) > 0.05 ? 1 : 0;
  f.shoul.setAttribute('transform', `translate(0 ${f1(-(o.shrug || 0))})`);
  f.headg.setAttribute('transform', `rotate(${f1(o.tilt || 0)} 300 470) translate(0 ${f1(-(o.shrug || 0) * 0.4)})`);
  f.specs.style.opacity = o.specs ? 1 : 0;
}

/* ---------- TORO DE PERFIL (embistiendo hacia la izquierda, viewBox 0 0 900 560) ---------- */
function bullSideInner(o = {}) {
  const id = uid('bs');
  const body = 'M250,200 C270,128 340,94 420,102 C500,110 560,150 640,160 C740,170 802,200 814,270 C824,340 792,392 730,398 L360,404 C300,404 254,370 244,320 Z';
  const head = 'M306,168 C252,158 202,188 172,238 C142,288 114,350 100,400 C94,428 112,452 142,450 C178,448 198,422 216,392 C242,348 282,302 322,272 Z';
  const muz = 'M100,400 C94,428 112,452 142,450 C162,448 178,438 190,420 C162,410 122,398 100,400 Z';
  const hornN = 'M224,236 C192,198 150,184 106,188 C94,190 94,204 106,204 C146,204 180,224 202,258 Z';
  const hornF = 'M250,222 C230,180 200,158 162,150 C152,150 150,162 158,164 C190,176 214,198 228,236 Z';
  const ear = 'M246,236 C272,214 304,210 322,222 C304,242 272,250 246,252 Z';
  const leg = (x, cls, col) => { const l = limb(x, 330, x - 6, 520, 30, 14); const hf = `M${x - 26},512 L${x + 12},512 L${x + 16},540 L${x - 30},540 Z`; return `<g class="${cls}">${cut(P(l) + P(hf), 5, 7)}${D(l, col, 3.5)}${HF(l, 'hA')}${D(hf, '#1f1610', 3)}</g>`; };
  let s = '';
  s += leg(400, 'lgF2', '#3a2a1e') + leg(760, 'lgB2', '#3a2a1e');
  s += `<g class="tail"><path d="M808,222 C858,250 870,320 856,384" stroke="${INK}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M808,222 C858,250 870,320 856,384" stroke="${BULL}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M856,376 C836,400 846,436 860,448 C872,430 884,404 856,376 Z" fill="${INK}"/></g>`;
  s += cut(P(body) + P(head) + P(hornF) + P(hornN) + P(ear), 8, 10);
  s += D(hornF, '#d9ccae', 3.5) + `<path d="M162,150 q-6,4 -4,14" stroke="${GREY2}" stroke-width="8"/>`;
  s += D(body, BULL, 4) + clipG(id + 'b', body, `<rect x="240" y="300" width="600" height="120" fill="url(#hA)"/><ellipse cx="380" cy="150" rx="120" ry="60" fill="url(#hB)" opacity=".7"/><rect x="700" y="160" width="140" height="260" fill="url(#hD)" opacity=".6"/>`);
  let curls = ''; const r = rng(77); for (let k = 0; k < 18; k++) { const x = 300 + r() * 220, y = 120 + r() * 120; curls += `M${f1(x)},${f1(y)}q8,-10 16,0 q-5,8 -10,3`; }
  s += `<path d="${curls}" stroke="${FIG}" stroke-width="2.4" fill="none" opacity=".5"/>`;
  s += leg(330, 'lgF1', BULL) + leg(690, 'lgB1', BULL);
  s += D(head, BULL, 4) + clipG(id + 'h', head, `<ellipse cx="260" cy="360" rx="80" ry="90" fill="url(#hA)"/>`);
  s += D(ear, BULL, 3) + D(hornN, HORN, 3.5) + `<path d="M108,190 q-8,6 -2,14" stroke="${GREY2}" stroke-width="9"/><path d="M150,196 q6,6 4,12 M172,206 q6,6 2,12" stroke="${INK}" stroke-width="2" fill="none"/>`;
  s += D(muz, MUZ, 3.5) + `<ellipse cx="114" cy="420" rx="9" ry="13" fill="#2a1a12" transform="rotate(-30 114 420)"/><path d="M128,446 q20,-4 34,-16" stroke="${INK}" stroke-width="3" fill="none"/>`;
  s += `<ellipse cx="212" cy="290" rx="24" ry="20" fill="#fff" stroke="${INK}" stroke-width="4"/><g class="pup"><circle cx="204" cy="292" r="10" fill="${INK}"/><circle cx="200" cy="288" r="3.5" fill="#fff"/></g>`;
  s += `<g class="lidC" style="opacity:0"><ellipse cx="212" cy="290" rx="26" ry="22" fill="${BULL}" stroke="${INK}" stroke-width="4"/></g>`;
  s += `<g class="browL"><path d="M186,258 Q210,246 236,258" stroke="${INK}" stroke-width="14" stroke-linecap="round" fill="none"/><path d="M186,258 Q210,246 236,258" stroke="${FIG}" stroke-width="7" stroke-linecap="round" fill="none"/></g>`;
  return s;
}
function mkBullS(pa, b) {
  const f = mk(pa, b, bullSideInner(), '0 0 900 560', 'bullS'); const q = s => f.d.querySelector(s);
  f.L = ['.lgF1', '.lgF2', '.lgB1', '.lgB2'].map(q); f.tail = q('.tail'); return f;
}
function bullRun(f, t, o = {}) {
  const sp = o.sp == null ? 14 : o.sp, a = o.amp == null ? 26 : o.amp;
  const ang = [Math.sin(t * sp) * a, Math.sin(t * sp + 1.6) * a, Math.sin(t * sp + 3.1) * a, Math.sin(t * sp + 4.7) * a];
  const px0 = [330, 400, 690, 760];
  f.L.forEach((g, i) => g.setAttribute('transform', `rotate(${f1(ang[i])} ${px0[i]} 330)`));
  f.tail.setAttribute('transform', `rotate(${f1(Math.sin(t * 9) * 12 + (o.tailUp || 0))} 808 222)`);
  face(f, t, { look: o.look || [-4, 0], blink: o.blink, seed: 0.7 });
}

/* ---------- TRAPO que ondea (path regenerado cada fotograma) ---------- */
function mkCloth(pa, x, y, w, h, o = {}) {
  const pad = 140, W2 = w + pad * 2, H2 = h + pad * 2;
  const d = box(pa, x - pad, y - pad, W2, H2, { zIndex: o.z || 8 });
  const nTr = o.trails || 0;
  let tr = ''; for (let k = 0; k < nTr; k++) tr += `<path class="tr" fill="none" stroke="${INK}" stroke-width="4" stroke-dasharray="${k ? '10 12' : '18 10'}" opacity="${f1(0.5 - k * 0.12)}"/>`;
  d.innerHTML = `<svg width="${W2}" height="${H2}" style="overflow:visible"><g transform="translate(${pad},${pad})">${tr}
   <path class="sh" fill="${SH}"/><path class="wb" fill="#fff" stroke="#fff" stroke-width="14" stroke-linejoin="round"/>
   ${o.lining ? `<path class="ln" fill="${o.lining}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><path class="lnh" fill="url(#hA)" opacity=".25"/>` : ''}
   <path class="cl" fill="${o.col || RED}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path class="hh" fill="url(#hA)" opacity=".28"/>
   <path class="fd" fill="none" stroke="${INK}" stroke-width="3" opacity=".55" stroke-linecap="round"/>
   ${o.stick === false ? '' : `<rect x="-26" y="-14" width="${w + 52}" height="18" rx="9" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><rect x="-26" y="-14" width="${w + 52}" height="18" rx="9" fill="url(#hW)" opacity=".35"/>`}
   ${o.label ? `<text class="lb" x="${w / 2}" y="${h * 0.52}" text-anchor="middle" font-family="Playfair" font-weight="900" font-style="italic" font-size="${o.lsz || 96}" fill="#fff" stroke="${INK}" stroke-width="5" paint-order="stroke">${o.label}</text>` : ''}
  </g></svg>`;
  const q = s => d.querySelector(s);
  const c = { d, w, h, cl: q('.cl'), hh: q('.hh'), sh: q('.sh'), wb: q('.wb'), fd: q('.fd'), ln: q('.ln'), lnh: q('.lnh'), lb: q('.lb'), trs: [...d.querySelectorAll('.tr')], amp: o.amp || 40, sp: o.sp || 3.2, ph: o.ph || 0 };
  return c;
}
function clothPath(w, h, t, amp, sp, ph, sway = 0) {
  const N = 7, pts = [];
  const sw = amp * 0.6 * Math.sin(t * sp + ph) + sway;
  // borde derecho
  const rx = w + sw * 0.9, ry = h + amp * 0.25 * Math.sin(t * sp * 1.3 + ph + 1);
  let s = `M0,0 L${w},0 Q${f1(w + sw * 0.3 + amp * 0.3 * Math.sin(t * sp * 1.7 + ph))},${f1(h * 0.5)} ${f1(rx)},${f1(ry)}`;
  for (let i = N - 1; i >= 0; i--) {
    const fx = i / N, xx = fx * w + sw * (0.4 + 0.5 * fx) + amp * 0.12 * Math.sin(t * sp * 2 + i * 1.7 + ph);
    const yy = h + amp * 0.32 * Math.sin(t * sp * 1.5 + i * 1.25 + ph) + (i % 2 ? amp * 0.18 : 0);
    s += ` L${f1(xx)},${f1(yy)}`;
  }
  s += ` Q${f1(sw * 0.2 - amp * 0.2 * Math.sin(t * sp * 1.4 + ph + 2))},${f1(h * 0.5)} 0,0 Z`;
  let fd = '';
  for (let k = 1; k <= 4; k++) { const fx = k / 5, x0 = fx * w, x1 = x0 + sw * (0.4 + 0.5 * fx), xm = x0 + amp * 0.35 * Math.sin(t * sp * 1.6 + k * 2 + ph); fd += `M${f1(x0)},10 Q${f1(xm)},${f1(h * 0.5)} ${f1(x1)},${f1(h - 6 + amp * 0.2 * Math.sin(t * sp * 1.5 + k + ph))}`; }
  return { s, fd };
}
function updCloth(c, t, o = {}) {
  const amp = o.amp == null ? c.amp : o.amp, sp = o.sp || c.sp;
  const { s, fd } = clothPath(c.w, c.h, t, amp, sp, c.ph, o.sway || 0);
  c.cl.setAttribute('d', s); c.hh.setAttribute('d', s); c.wb.setAttribute('d', s); c.fd.setAttribute('d', fd);
  c.sh.setAttribute('d', s); c.sh.setAttribute('transform', 'translate(10,12)');
  if (c.ln) { c.ln.setAttribute('d', s); c.ln.setAttribute('transform', `translate(${f1(18 + 10 * Math.sin(t * sp + 1))},${f1(16)})`); c.lnh.setAttribute('d', s); c.lnh.setAttribute('transform', c.ln.getAttribute('transform')); }
  if (o.col) c.cl.setAttribute('fill', o.col);
  c.trs.forEach((e, k) => { const r = clothPath(c.w, c.h, t - 0.09 * (k + 1), amp, sp, c.ph, o.sway || 0); e.setAttribute('d', r.s); e.setAttribute('transform', `translate(${f1(-(o.trailDx || 0) * (k + 1))},0)`); });
}

/* ---------- CANDADO (viewBox 0 0 200 250) ---------- */
function padlockSvg() {
  return `<svg viewBox="0 0 200 250" width="100%" height="100%" style="overflow:visible">
   <g class="shk"><path d="M50,120 V74 a50,50 0 0,1 100,0 V120" stroke="${INK}" stroke-width="34" fill="none"/><path d="M50,120 V74 a50,50 0 0,1 100,0 V120" stroke="#b9b2a4" stroke-width="20" fill="none"/><path d="M58,110 V76 a42,42 0 0,1 40,-42" stroke="#fff" stroke-width="5" fill="none" opacity=".7"/></g>
   ${cut('<rect x="14" y="108" width="172" height="136" rx="20"/>', 6, 8)}<rect x="14" y="108" width="172" height="136" rx="20" fill="${BRASS}" stroke="${INK}" stroke-width="6"/><rect x="14" y="108" width="172" height="136" rx="20" fill="url(#hA)" opacity=".45"/>
   <path d="M100,152 a18,18 0 1,1 -0.1,0 Z" fill="${INK}"/><path d="M92,170 L108,170 L114,212 L86,212 Z" fill="${INK}"/><rect x="28" y="120" width="144" height="8" rx="4" fill="#fff" opacity=".45"/></svg>`;
}
function setLock(lk, k) { const sh = lk.querySelector('.shk'); sh.setAttribute('transform', `translate(0 ${f1(-36 * Math.min(1, k * 1.6))}) rotate(${f1(-32 * clamp(k * 1.6 - 0.6))} 150 120)`); }

/* ---------- GRADAS en silueta (fila de cabezas) ---------- */
function crowdSvg(y0, rows, seed, col = INK) {
  const r = rng(seed); let s = '';
  for (let row = 0; row < rows; row++) {
    const y = y0 + row * 120, n = 8 + (row % 2), off = row % 2 ? 0 : 60;
    s += `<rect x="-20" y="${y + 50}" width="1120" height="200" fill="${col}"/>`;
    for (let k = 0; k < n; k++) {
      const x = off + k * 130 + (r() - .5) * 30, hr = 30 + r() * 10, hy = y - r() * 14;
      s += `<path d="M${f1(x - 56)},${y + 60} C${f1(x - 54)},${f1(hy + 40)} ${f1(x + 54)},${f1(hy + 40)} ${f1(x + 56)},${y + 60} Z" fill="${col}"/><circle cx="${f1(x)}" cy="${f1(hy)}" r="${f1(hr)}" fill="${col}"/>`;
      const hat = r(); if (hat < 0.3) s += `<ellipse cx="${f1(x)}" cy="${f1(hy - hr * 0.55)}" rx="${f1(hr * 1.6)}" ry="7" fill="${col}"/><rect x="${f1(x - hr * 0.8)}" y="${f1(hy - hr * 1.4)}" width="${f1(hr * 1.6)}" height="${f1(hr * 0.9)}" rx="8" fill="${col}"/>`;
      else if (hat < 0.45) s += `<path d="M${f1(x + 40)},${f1(hy + 40)} L${f1(x + 64)},${f1(hy - 40)}" stroke="${col}" stroke-width="18" stroke-linecap="round"/><circle cx="${f1(x + 66)}" cy="${f1(hy - 48)}" r="13" fill="${col}"/>`;
    }
  }
  return s;
}

/* ---------- muestrario de color (pastilla) ---------- */
const swatch = (pa, x, y, sz, col, z = 10) => box(pa, x, y, sz, sz, { background: col, border: `6px solid ${INK}`, borderRadius: '22px', boxShadow: `7px 8px 0 ${SH}`, zIndex: z });
const qMark = (pa, x, y, sz = 120, col = PINK) => el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz), color: col, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 40 }, '?');
const BIGT = (pa, x, y, w, html, css = {}) => el('div', pa, Object.assign({ left: px(x), top: px(y), width: px(w), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, color: INK, lineHeight: 1, zIndex: 20 }, css), html);
const bigOut = (col = '#fff', sz = 10) => `${sz}px ${sz}px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}`;
// mano enguantada sujetando el palo (desde el borde)
const gripSvg = (rot = 0) => `<svg viewBox="-70 -80 140 140" width="100%" height="100%" style="overflow:visible">${gloveHand(0, 0, rot, 1.3)}</svg>`;
