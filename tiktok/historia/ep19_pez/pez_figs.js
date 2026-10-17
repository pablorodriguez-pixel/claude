/* Ep. 19 · Tu pez no tiene memoria de 3 segundos — tiempos + figuras nuevas en estilo grabado recortado */

/* ---------- tiempos clave (todo por texto, nunca absolutos) ---------- */
const fw = (ph, from = 0) => { const i = find(ph, from); if (i == null || i < 0) console.error('NO ENCONTRADO: ' + ph); return i; };
const ws = i => W[i].s, wE = i => W[i].e;
const K = {};
{
  K.tu = ws(0); K.pez = ws(1); K.no0 = ws(2); K.memoria = ws(4); K.tres = ws(6); K.seg = ws(7);
  const ia = fw('se acuerda de ti'); K.se = ws(ia); K.acuerda = ws(ia + 1); K.ti = ws(ia + 3); K.L0e = wE(ia + 3);
  const iy = fw('y lo han demostrado'); K.L1 = ws(iy); K.demostrado = ws(iy + 3); K.experimentos = ws(iy + 5); K.L1e = wE(iy + 5);
  const ih = fw('hay estudios'); K.L2 = ws(ih); K.estudios = ws(ih + 1);
  const ip = fw('los peces aprenden'); K.peces = ws(ip + 1); K.aprenden = ws(ip + 2);
  const ie = fw('empujar una palanca'); K.empujar = ws(ie); K.palanca = ws(ie + 2);
  const ic = fw('les caiga comida'); K.caiga = ws(ic + 1); K.comida = ws(ic + 2); K.comidaE = wE(ic + 2);
  const is = fw('y semanas despues'); K.ys = ws(is); K.semanas = ws(is + 1); K.despues = ws(is + 2);
  const isg = fw('se siguen acordando'); K.siguen = ws(isg + 1); K.acordando = ws(isg + 2); K.L2e = wE(isg + 2);
  const io = fw('otros aprenden'); K.L3 = ws(io);
  const isn = fw('un sonido significa comida'); K.sonido = ws(isn + 1); K.significa = ws(isn + 2); K.comida2 = ws(isn + 3); K.comida2e = wE(isn + 3);
  const iv = fw('y vuelven a acudir'); K.yv = ws(iv); K.vuelven = ws(iv + 1); K.acudir = ws(iv + 3);
  const ioi = fw('al oirlo'); K.oirlo = ws(ioi + 1);
  const im = fw('mucho tiempo despues'); K.mucho = ws(im); K.tiempo = ws(im + 1); K.L3e = wE(im + 2);
  const ic2 = fw('y si tienes uno en casa'); K.L4 = ws(ic2); K.tienes = ws(ic2 + 2); K.casa = ws(ic2 + 5);
  const iv2 = fw('lo has visto'); K.visto = ws(iv2 + 2);
  const ia2 = fw('se acerca al cristal'); K.acerca = ws(ia2 + 1); K.cristal = ws(ia2 + 3);
  const il = fw('cuando llegas'); K.llegas = ws(il + 1);
  const ihc = fw('hora de comer'); K.hora = ws(ihc); K.comer = ws(ihc + 2); K.comerE = wE(ihc + 2);
  const iem = fw('eso es memoria'); K.eso = ws(iem); K.memoria2 = ws(iem + 2); K.L4e = wE(iem + 2);
  const iojo = fw('ojo nadie sabe'); K.ojo = ws(iojo); K.nadie = ws(iojo + 1); K.sabe = ws(iojo + 2);
  const idd = fw('de donde salio'); K.donde = ws(idd + 1); K.salio = ws(idd + 2);
  const it3 = fw('los tres segundos', idd); K.tres2 = ws(it3 + 1); K.seg2 = ws(it3 + 2);
  const isi = fw('simplemente se repitio'); K.simple = ws(isi); K.repitio = ws(isi + 2);
  const ita = fw('tanto que parecia verdad'); K.tanto = ws(ita); K.parecia = ws(ita + 2); K.verdad = ws(ita + 3); K.L5e = wE(ita + 3);
  const ios = fw('o sea tu pez sabe'); K.L6 = ws(ios); K.osea = ws(ios + 1); K.tu6 = ws(ios + 2); K.pez6 = ws(ios + 3); K.sabe6 = ws(ios + 4); K.quien = ws(ios + 5);
  const ic6 = fw('da de comer', ios); K.comer6 = ws(ic6 + 2); K.comer6e = wE(ic6 + 2);
  const itc = fw('te lo creias'); K.te = ws(itc); K.creias = ws(itc + 2);
  const isn2 = fw('si o no', itc); K.si = ws(isn2); K.noB = ws(isn2 + 2); K.L6e = wE(isn2 + 2);
  const isoy = fw('soy tu vecino'); K.isoy = isoy; K.soy = ws(isoy); K.vecino = ws(isoy + 2);
  const iye = fw('y esto no venia en el libro', isoy); K.iye = iye; K.esto = ws(iye + 1); K.enL = ws(iye + 4); K.libro = ws(iye + 6); K.END = wE(iye + 6);
}
/* cortes de escena */
const S = {
  A: [-1, (K.L0e + K.L1) / 2], B: [(K.L0e + K.L1) / 2, K.L2 - 0.12],
  C1: [K.L2 - 0.12, K.ys - 0.12], C2: [K.ys - 0.12, K.L3 - 0.12],
  D1: [K.L3 - 0.12, K.yv - 0.12], D2: [K.yv - 0.12, K.L4 - 0.1],
  E: [K.L4 - 0.1, K.eso - 0.1], HIT1: [K.eso - 0.1, K.ojo - 0.06],
  F1: [K.ojo - 0.06, K.simple - 0.1], F2: [K.simple - 0.1, K.L6 - 0.1],
  HIT2: [K.L6 - 0.1, K.soy - 0.1],
  C: [K.soy - 0.1, K.enL - 0.04], L2: [K.enL - 0.04, 999],
};
const DUR = K.END + 0.6, LOOP = DUR - 0.4;

/* ---------- paleta propia del episodio ---------- */
const ORA = '#EE7A2B', ORA2 = '#F7B260', ORA3 = '#C9561A', WATER = '#BFDCD2', WATER2 = '#9CC7BA', GLASS = 'rgba(255,255,255,.22)';

/* ==================================================================
   PEZ DE COLORES — perfil (viewBox 0 0 400 280), mira a la derecha
   ================================================================== */
function fishSideInner(o = {}) {
  const id = uid('fs');
  const body = 'M112,140 C128,80 206,52 280,58 C342,64 380,104 384,140 C380,178 342,214 280,220 C206,228 128,200 112,140 Z';
  const tail = 'M122,140 C96,108 62,62 14,44 C34,92 40,118 30,140 C40,162 34,188 14,236 C62,218 96,172 122,140 Z';
  const dors = 'M176,74 C180,28 232,6 288,26 C278,42 270,52 268,62 Z';
  const vent = 'M206,212 C206,244 236,264 262,256 C256,240 254,228 252,218 Z';
  const anal = 'M150,196 C142,222 154,240 170,244 C170,230 172,216 176,206 Z';
  const pect = 'M262,152 C244,170 226,196 234,212 C252,204 268,180 272,158 Z';
  let rays = '';
  for (let k = 0; k < 7; k++) { const a = -0.9 + k * 0.3; rays += `M120,140 Q${f1(80 + Math.cos(a) * 20)},${f1(140 + Math.sin(a) * 50)} ${f1(120 - Math.cos(a) * 96)},${f1(140 + Math.sin(a) * 92)} `; }
  let drays = ''; for (let k = 0; k < 6; k++) drays += `M${186 + k * 16},${66 - k} Q${200 + k * 14},${40 - k * 3} ${206 + k * 15},${20 - k * 1.5} `;
  let scales = '';
  for (let r = 0; r < 6; r++) for (let c = 0; c < 8; c++) { const x = 150 + c * 20 + (r % 2) * 10, y = 78 + r * 24; scales += `M${x},${y} q12,12 0,24 `; }
  let s = '';
  // aleta caudal (se mueve aparte)
  s += `<g class="tail">${cut(P(tail), 6, 8)}${D(tail, ORA2, 3.5)}<path d="${rays}" stroke="${INK}" stroke-width="2" fill="none" opacity=".75"/>${HF(tail, 'hB')}</g>`;
  s += cut(P(body) + P(dors) + P(vent) + P(anal), 6, 8);
  s += D(dors, ORA2, 3.5) + `<path d="${drays}" stroke="${INK}" stroke-width="2" fill="none" opacity=".7"/>` + D(vent, ORA2, 3) + D(anal, ORA2, 3);
  s += D(body, ORA, 4);
  s += clipG(id + 'b', body, `<path d="M100,170 C180,230 320,230 400,160 L400,260 L100,260 Z" fill="${ORA2}"/><path d="M100,170 C180,230 320,230 400,160 L400,260 L100,260 Z" fill="url(#hA)" opacity=".35"/><path d="M110,40 C200,90 300,80 400,60 L400,30 L110,30 Z" fill="${ORA3}" opacity=".55"/><path d="M110,40 C200,96 300,86 400,70 L400,30 L110,30 Z" fill="url(#hB)" opacity=".55"/><path d="${scales}" stroke="${INK}" stroke-width="1.8" fill="none" opacity=".55"/><ellipse cx="200" cy="120" rx="34" ry="18" fill="#fff" opacity=".85"/><ellipse cx="236" cy="168" rx="22" ry="12" fill="#fff" opacity=".8"/>`);
  s += D(body, 'none', 4);
  s += `<path d="M298,80 C278,110 278,172 300,202" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M306,92 C292,116 292,164 306,188" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".7"/>`;
  s += `<g class="finP">${D(pect, ORA2, 3)}<path d="M262,158 L240,204 M266,160 L252,206" stroke="${INK}" stroke-width="1.5"/></g>`;
  // mejilla
  s += `<ellipse cx="338" cy="164" rx="18" ry="10" fill="${PINK}" opacity=".45"/>`;
  // ojo grande
  s += `<circle cx="330" cy="116" r="30" fill="#fff" stroke="${INK}" stroke-width="4.5"/><g class="pup"><circle cx="334" cy="117" r="15" fill="${INK}"/><circle cx="340" cy="111" r="5" fill="#fff"/></g>`;
  s += `<g class="lidH" style="opacity:0"><path d="M299,116 A31,31 0 0 1 361,116 Z" fill="${ORA}" stroke="${INK}" stroke-width="4"/></g>`;
  s += `<g class="lidC" style="opacity:0"><circle cx="330" cy="116" r="31" fill="${ORA}" stroke="${INK}" stroke-width="4"/><path d="M304,120 Q330,134 356,120" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;
  s += `<g class="browL"><path d="M300,74 Q328,60 360,76" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/></g>`;
  // boca
  s += `<g class="mouthO"><ellipse cx="382" cy="150" rx="9" ry="11" fill="${LIP}" stroke="${INK}" stroke-width="3.5"/><ellipse cx="383" cy="150" rx="3.5" ry="5" fill="${INK}"/></g>`;
  s += `<g class="mouthS" style="opacity:0"><path d="M362,158 Q376,170 388,152" stroke="${INK}" stroke-width="4.5" fill="none" stroke-linecap="round"/></g>`;
  return s;
}
function mkFish(pa, b) {
  const f = mk(pa, b, fishSideInner(), '0 0 400 280', 'fish'); const q = s => f.d.querySelector(s);
  f.tail = q('.tail'); f.finP = q('.finP'); f.mO = q('.mouthO'); f.mS = q('.mouthS'); f.browL = q('.browL'); return f;
}
function fishFace(f, t, o = {}) {
  f.pup.forEach(q => q.setAttribute('transform', `translate(${f1((o.look || [0, 0])[0])} ${f1((o.look || [0, 0])[1])})`));
  const bl = o.blink !== false && (((t + (o.seed || 0)) % 2.9) < 0.12);
  if (f.lidC) f.lidC.style.opacity = (bl || o.closed) ? 1 : 0;
  if (f.lidH) f.lidH.style.opacity = (!bl && !o.closed && o.half) ? 1 : 0;
  const wag = o.wag != null ? o.wag : 1;
  const ta = Math.sin(t * (o.tf || 9) + (o.seed || 0)) * 16 * wag;
  f.tail.setAttribute('transform', `rotate(${f1(ta)} 122 140)`);
  f.finP.setAttribute('transform', `rotate(${f1(Math.sin(t * 7 + 1) * 14 * Math.max(0.4, wag))} 266 154)`);
  f.browL.setAttribute('transform', `translate(0 ${f1(-(o.brow || 0))}) rotate(${f1(o.browR || 0)} 330 70)`);
  const m = o.mouth != null ? o.mouth : 0.6 + 0.4 * Math.abs(Math.sin(t * 5 + (o.seed || 0)));
  f.mO.setAttribute('transform', `translate(382 150) scale(${f1(Math.max(0.2, m) * 100) / 100}) translate(-382 -150)`);
  f.mO.style.opacity = o.smile ? 0 : 1; f.mS.style.opacity = o.smile ? 1 : 0;
}

/* ==================================================================
   PEZ DE FRENTE (viewBox 0 0 320 320) — mira a cámara / pegado al cristal
   ================================================================== */
function fishFrontInner() {
  const id = uid('ff');
  const body = 'M160,52 C246,52 292,118 290,182 C288,250 232,292 160,292 C88,292 32,250 30,182 C28,118 74,52 160,52 Z';
  const dors = 'M120,64 C124,20 168,-6 206,10 C196,30 190,48 196,62 Z';
  const finL = 'M44,196 C10,186 -16,212 -10,244 C18,240 40,226 52,214 Z';
  const finR = 'M276,196 C310,186 336,212 330,244 C302,240 280,226 268,214 Z';
  const tailL = 'M70,250 C40,270 26,300 30,318 C56,306 80,288 96,270 Z', tailR = 'M250,250 C280,270 294,300 290,318 C264,306 240,288 224,270 Z';
  let s = cut(P(body) + P(dors) + P(tailL) + P(tailR), 6, 8);
  s += D(tailL, ORA2, 3) + D(tailR, ORA2, 3) + HF(tailL, 'hB') + HF(tailR, 'hA');
  s += D(dors, ORA2, 3.5) + `<path d="M140,60 Q150,30 170,14 M156,60 Q166,34 186,18 M172,60 Q180,40 196,30" stroke="${INK}" stroke-width="2" fill="none" opacity=".7"/>`;
  s += `<g class="finL">${cut(P(finL), 4, 6)}${D(finL, ORA2, 3)}<path d="M40,206 L4,232 M44,212 L16,240" stroke="${INK}" stroke-width="1.6"/></g>`;
  s += `<g class="finR">${cut(P(finR), 4, 6)}${D(finR, ORA2, 3)}<path d="M280,206 L316,232 M276,212 L304,240" stroke="${INK}" stroke-width="1.6"/></g>`;
  s += D(body, ORA, 4);
  s += clipG(id + 'b', body, `<ellipse cx="160" cy="250" rx="110" ry="60" fill="${ORA2}"/><ellipse cx="160" cy="250" rx="110" ry="60" fill="url(#hA)" opacity=".3"/><path d="M200,40 C300,80 310,220 230,300 L330,300 L330,40 Z" fill="${ORA3}" opacity=".5"/><path d="M210,40 C310,80 320,220 240,300 L330,300 L330,40 Z" fill="url(#hB)" opacity=".5"/><ellipse cx="96" cy="96" rx="30" ry="16" fill="#fff" opacity=".8" transform="rotate(-30 96 96)"/>`);
  s += D(body, 'none', 4);
  // mejillas
  s += `<ellipse cx="78" cy="200" rx="22" ry="12" fill="${PINK}" opacity=".5"/><ellipse cx="242" cy="200" rx="22" ry="12" fill="${PINK}" opacity=".5"/>`;
  // ojos saltones
  for (const ex of [104, 216]) s += `<circle cx="${ex}" cy="140" r="44" fill="#fff" stroke="${INK}" stroke-width="5"/>`;
  s += `<g class="pup"><circle cx="108" cy="146" r="22" fill="${INK}"/><circle cx="116" cy="138" r="7" fill="#fff"/></g><g class="pup"><circle cx="212" cy="146" r="22" fill="${INK}"/><circle cx="220" cy="138" r="7" fill="#fff"/></g>`;
  s += `<g class="lidC" style="opacity:0"><circle cx="104" cy="140" r="45" fill="${ORA}" stroke="${INK}" stroke-width="5"/><circle cx="216" cy="140" r="45" fill="${ORA}" stroke="${INK}" stroke-width="5"/><path d="M68,146 Q104,166 140,146 M180,146 Q216,166 252,146" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
  s += `<g class="lidH" style="opacity:0"><path d="M59,140 A45,45 0 0 1 149,140 Z M171,140 A45,45 0 0 1 261,140 Z" fill="${ORA}" stroke="${INK}" stroke-width="5"/></g>`;
  s += `<g class="browL"><path d="M66,86 Q100,64 136,84" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/></g><g class="browR"><path d="M184,84 Q220,64 254,86" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/></g>`;
  // boca: «o» / sonrisa / morros pegados al cristal
  s += `<g class="mouthO"><ellipse cx="160" cy="226" rx="20" ry="24" fill="${LIP}" stroke="${INK}" stroke-width="4.5"/><ellipse cx="160" cy="228" rx="9" ry="12" fill="${INK}"/></g>`;
  s += `<g class="mouthS" style="opacity:0"><path d="M120,214 Q160,262 200,214 Q160,236 120,214 Z" fill="${LIP}" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/></g>`;
  s += `<g class="press" style="opacity:0"><ellipse cx="160" cy="228" rx="54" ry="30" fill="${LIP}" stroke="${INK}" stroke-width="5"/><ellipse cx="160" cy="228" rx="38" ry="10" fill="#7a1f2b"/><path d="M118,220 Q160,210 202,220" stroke="#fff" stroke-width="4" fill="none" opacity=".6"/></g>`;
  return s;
}
function mkFishF(pa, b) {
  const f = mk(pa, b, fishFrontInner(), '0 0 320 320', 'fishF'); const q = s => f.d.querySelector(s);
  f.finL = q('.finL'); f.finR = q('.finR'); f.mO = q('.mouthO'); f.mS = q('.mouthS'); f.press = q('.press'); return f;
}
function fishFFace(f, t, o = {}) {
  face(f, t, { look: o.look, closed: o.closed, half: o.half, blink: o.blink, seed: o.seed, bL: o.bL, bR: o.bR });
  const fl = Math.sin(t * (o.ff || 8)) * 18;
  f.finL.setAttribute('transform', `rotate(${f1(fl)} 48 204)`); f.finR.setAttribute('transform', `rotate(${f1(-fl)} 272 204)`);
  const m = o.mouth != null ? o.mouth : 0.7 + 0.3 * Math.abs(Math.sin(t * 5));
  f.mO.setAttribute('transform', `translate(160 226) scale(${f1(Math.max(0.2, m) * 100) / 100}) translate(-160 -226)`);
  f.mO.style.opacity = (o.smile || o.press) ? 0 : 1; f.mS.style.opacity = o.smile && !o.press ? 1 : 0; f.press.style.opacity = o.press ? 1 : 0;
}

/* ==================================================================
   PECERA REDONDA — capas: fondo (agua), contenido, frente (cristal)
   viewBox 0 0 800 760
   ================================================================== */
const BOWL = 'M236,92 C40,176 16,520 170,662 C262,744 538,744 630,662 C784,520 760,176 564,92 Z';
function bowlBackSvg(o = {}) {
  const id = uid('bw');
  let gravel = ''; const r = rng(o.seed || 19);
  for (let k = 0; k < 70; k++) { const x = 150 + r() * 500, y = 640 + r() * 70, rr = 9 + r() * 12; gravel += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rr)}" ry="${f1(rr * 0.7)}" fill="${['#d9c7a6', '#bfa47a', '#e9dcc0', '#a88b62', '#FF9DCB'][k % 5]}" stroke="${INK}" stroke-width="2.4"/>`; }
  const water = `<rect x="0" y="${o.wl || 176}" width="800" height="700" fill="${WATER}"/><rect x="0" y="${o.wl || 176}" width="800" height="700" fill="url(#hW)" opacity=".18"/><path d="M500,${(o.wl || 176)} C700,260 700,560 560,720 L800,720 L800,${o.wl || 176} Z" fill="${WATER2}" opacity=".7"/><path d="M520,${(o.wl || 176)} C720,260 720,560 580,720 L800,720 L800,${o.wl || 176} Z" fill="url(#hB)" opacity=".3"/>`;
  let s = cut(P(BOWL), 10, 12);
  s += `<path d="${BOWL}" fill="rgba(255,255,255,.55)"/>`;
  s += clipG(id, BOWL, water + `<ellipse cx="400" cy="${o.wl || 176}" rx="330" ry="26" fill="#d9eee6" stroke="${INK}" stroke-width="3"/>` + gravel +
    `<g class="weed"><path d="M250,690 C230,600 280,560 250,480 C226,420 270,380 256,330" stroke="#4f7a3a" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M250,690 C230,600 280,560 250,480 C226,420 270,380 256,330" stroke="${INK}" stroke-width="3" fill="none" stroke-dasharray="2 14"/><path d="M290,690 C310,620 270,580 300,520 C320,480 290,450 304,420" stroke="#6b9a4a" stroke-width="14" fill="none" stroke-linecap="round"/></g>` +
    `<g class="weed2"><path d="M560,700 C580,620 530,580 560,500 C580,450 548,420 560,380" stroke="#4f7a3a" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M600,700 C590,640 620,610 600,560" stroke="#6b9a4a" stroke-width="12" fill="none" stroke-linecap="round"/></g>` +
    `<path d="M380,700 C370,660 420,640 450,660 C470,640 520,650 510,700 Z" fill="#8d7a66" stroke="${INK}" stroke-width="3"/><path d="M400,690 q20,-20 40,-6" stroke="${INK}" stroke-width="2" fill="none"/>`);
  return s;
}
function bowlFrontSvg() {
  return `<path d="${BOWL}" fill="${GLASS}" stroke="${INK}" stroke-width="7"/>` +
    `<path d="M150,250 C110,340 110,460 160,560" stroke="#fff" stroke-width="18" fill="none" stroke-linecap="round" opacity=".75"/><path d="M190,200 C176,214 168,226 160,240" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" opacity=".7"/><path d="M640,560 C670,500 680,440 676,380" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity=".5"/>` +
    `<ellipse cx="400" cy="92" rx="170" ry="28" fill="none" stroke="#fff" stroke-width="22"/><ellipse cx="400" cy="92" rx="170" ry="28" fill="rgba(255,255,255,.25)" stroke="${INK}" stroke-width="6"/><path d="M262,100 Q400,130 538,100" stroke="${INK}" stroke-width="2" fill="none" opacity=".5"/>`;
}
function mkBowl(pa, x, y, w, o = {}) {
  const h = w * 760 / 800, k = w / 800;
  const wrap = box(pa, x, y, w, h, { zIndex: o.z || 4 });
  const back = box(wrap, 0, 0, w, h, { zIndex: 1 }); back.innerHTML = `<svg viewBox="0 0 800 760" width="${w}" height="${h}" style="overflow:visible">${bowlBackSvg(o)}</svg>`;
  const mid = box(wrap, 0, 0, w, h, { zIndex: 2 });
  const front = box(wrap, 0, 0, w, h, { zIndex: 3 }); front.innerHTML = `<svg viewBox="0 0 800 760" width="${w}" height="${h}" style="overflow:visible">${bowlFrontSvg()}</svg>`;
  const weeds = [...back.querySelectorAll('.weed,.weed2')];
  // burbujas (deterministas)
  const BUB = []; const r = rng(o.seed || 7);
  for (let i = 0; i < (o.nb || 9); i++) { const sz = (10 + r() * 22) * k * 1.6; const d = box(mid, 0, 0, sz, sz, { borderRadius: '50%', border: `${Math.max(2, 3 * k * 1.4)}px solid ${INK}`, background: 'rgba(255,255,255,.6)', zIndex: 4 }); BUB.push({ d, x0: (180 + r() * 440) * k, ph: r(), sp: 0.35 + r() * 0.3, sz }); }
  const yTop = 190 * k, yBot = 680 * k;
  return { wrap, back, mid, front, w, h, k, weeds, BUB, upd(t) {
    weeds.forEach((wd, i) => wd.setAttribute('transform', `rotate(${f1(Math.sin(t * 1.6 + i) * 3)} ${i ? 560 : 260} 700)`));
    BUB.forEach(b => { const ph = (t * b.sp + b.ph) % 1; set(b.d, { x: b.x0 + Math.sin(t * 3 + b.ph * 9) * 10 * k, y: lerp(yBot, yTop, ph), s: 0.6 + ph * 0.6, o: ph > 0.92 ? (1 - ph) / 0.08 : 1 }); });
  } };
}

/* ==================================================================
   CRONÓMETRO «3 s» (viewBox 0 0 300 340)
   ================================================================== */
function stopwatchSvg(label = '3 s', q = false) {
  let ticks = ''; for (let k = 0; k < 60; k++) { const a = k / 60 * Math.PI * 2, r0 = k % 5 ? 108 : 98; ticks += `M${f1(150 + Math.sin(a) * r0)},${f1(196 - Math.cos(a) * r0)}L${f1(150 + Math.sin(a) * 116)},${f1(196 - Math.cos(a) * 116)}`; }
  return `<svg viewBox="0 0 300 340" width="100%" height="100%" style="overflow:visible">${cut('<circle cx="150" cy="196" r="140"/><rect x="122" y="18" width="56" height="44" rx="8"/>')}
  <rect x="126" y="40" width="48" height="26" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><rect x="112" y="16" width="76" height="30" rx="10" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><rect x="112" y="16" width="76" height="30" rx="10" fill="url(#hA)" opacity=".4"/>
  <path d="M236,72 l26,-24 l16,16 l-24,26 Z" fill="${BRASS}" stroke="${INK}" stroke-width="4"/>
  <circle cx="150" cy="196" r="140" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><circle cx="150" cy="196" r="140" fill="url(#hB)" opacity=".35"/>
  <circle cx="150" cy="196" r="122" fill="#FBF6EA" stroke="${INK}" stroke-width="5"/><path d="${ticks}" stroke="${INK}" stroke-width="3"/>
  <g class="hand"><path d="M150,196 L150,94" stroke="${RED}" stroke-width="8" stroke-linecap="round"/><path d="M150,196 L150,226" stroke="${RED}" stroke-width="8" stroke-linecap="round"/></g><circle cx="150" cy="196" r="13" fill="${INK}"/>
  <text x="150" y="${q ? 186 : 236}" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="${q ? 104 : 92}" fill="${INK}" stroke="#FBF6EA" stroke-width="10" paint-order="stroke">${label}</text>${q ? `<text x="150" y="282" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="84" fill="${PINK}" stroke="${INK}" stroke-width="3">¿?</text>` : ''}</svg>`;
}
function mkWatch(pa, x, y, w, label, q) { const d = box(pa, x, y, w, w * 340 / 300); d.innerHTML = stopwatchSvg(label, q); return { d, hand: d.querySelector('.hand') }; }
function watchHand(wt, t, sp = 120) { wt.hand.setAttribute('transform', `rotate(${f1((t * sp) % 360)} 150 196)`); }

/* corazón de grabado */
const HEART = (col = PINK) => `<svg viewBox="0 0 120 110" width="100%" height="100%" style="overflow:visible"><path d="M60,104 C20,74 2,52 6,30 C10,8 40,0 60,24 C80,0 110,8 114,30 C118,52 100,74 60,104 Z" fill="#fff" stroke="#fff" stroke-width="14" stroke-linejoin="round"/><path d="M60,104 C20,74 2,52 6,30 C10,8 40,0 60,24 C80,0 110,8 114,30 C118,52 100,74 60,104 Z" fill="${col}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M60,104 C20,74 2,52 6,30 C10,8 40,0 60,24 Z" fill="url(#hA)" opacity=".35"/><ellipse cx="34" cy="30" rx="12" ry="8" fill="#fff" opacity=".7" transform="rotate(-30 34 30)"/></svg>`;
const NOTE = (ch = '♪') => `<div style="font-family:Playfair;font-weight:900;font-size:100%;color:${INK};text-shadow:3px 3px 0 #fff,-3px -3px 0 #fff,3px -3px 0 #fff,-3px 3px 0 #fff">${ch}</div>`;

/* ==================================================================
   TIMBRE DE MOSTRADOR (campanita) viewBox 0 0 300 240
   ================================================================== */
function deskBellSvg() {
  const dome = 'M40,180 C40,90 90,52 150,52 C210,52 260,90 260,180 Z';
  return `<svg viewBox="0 0 300 240" width="100%" height="100%" style="overflow:visible">${cut(P(dome) + '<rect x="16" y="176" width="268" height="44" rx="12"/><rect x="138" y="10" width="24" height="48"/>')}
  <g class="plunger"><rect x="138" y="12" width="24" height="46" fill="${INK}"/><ellipse cx="150" cy="12" rx="26" ry="10" fill="${BRASS}" stroke="${INK}" stroke-width="4"/></g>
  ${D(dome, BRASS, 5)}${HF(dome, 'hB')}<path d="M70,150 C74,104 104,78 140,72" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" opacity=".7"/>
  <rect x="16" y="176" width="268" height="44" rx="12" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="16" y="176" width="268" height="44" rx="12" fill="url(#hW)" opacity=".35"/></svg>`;
}
/* lata de comida para peces (viewBox 0 0 240 320) */
function foodCanSvg() {
  const can = 'M30,60 H210 V300 Q120,322 30,300 Z';
  let fl = ''; const r = rng(5); for (let k = 0; k < 14; k++) fl += `<path d="M${f1(40 + r() * 160)},${f1(20 + r() * 30)} l${f1(8 + r() * 6)},${f1(-4 + r() * 8)} l${f1(-4)},${f1(8)} Z" fill="${['#C8102E', '#EE7A2B', '#7a9a52', '#FFE600'][k % 4]}" stroke="${INK}" stroke-width="2"/>`;
  return `<svg viewBox="0 0 240 320" width="100%" height="100%" style="overflow:visible">${cut(P(can) + '<ellipse cx="120" cy="60" rx="96" ry="22"/>')}${D(can, '#E9DCC0', 5)}<path d="M150,60 H210 V300 Q180,310 150,312 Z" fill="url(#hA)" opacity=".45"/>
  <rect x="30" y="110" width="180" height="130" fill="${RED}" stroke="${INK}" stroke-width="4"/><text x="120" y="160" text-anchor="middle" font-family="Rye" font-size="34" fill="${YEL}">COMIDA</text><text x="120" y="200" text-anchor="middle" font-family="SpecialElite" font-size="26" fill="#fff">para peces</text>
  <path d="M60,214 q20,-16 40,0 q-20,16 -40,0 Z M100,214 l12,-10 v20 Z" fill="${ORA}" stroke="${INK}" stroke-width="2.5"/>
  <ellipse cx="120" cy="60" rx="96" ry="22" fill="#cfc2a6" stroke="${INK}" stroke-width="5"/><ellipse cx="120" cy="60" rx="74" ry="14" fill="#8d6a3a" stroke="${INK}" stroke-width="3"/>${fl}</svg>`;
}
/* escamita de comida */
const FLAKE = (c) => `<svg viewBox="0 0 30 30" width="100%" height="100%" style="overflow:visible"><path d="M4,10 L20,4 L26,18 L10,26 Z" fill="${c}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/></svg>`;

/* ==================================================================
   CALENDARIO DE HOJAS (sin números) — viewBox 0 0 300 360
   ================================================================== */
function calPageSvg(nx) {
  let g = ''; for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) { const x = 30 + c * 34, y = 140 + r * 46; const idx = r * 7 + c; g += `<rect x="${x}" y="${y}" width="28" height="38" rx="3" fill="none" stroke="${INK}" stroke-width="2" opacity=".5"/>`; if (idx < nx) g += `<path d="M${x + 4},${y + 6} L${x + 24},${y + 32} M${x + 24},${y + 6} L${x + 4},${y + 32}" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>`; }
  return `<svg viewBox="0 0 300 360" width="100%" height="100%" style="overflow:visible"><rect x="10" y="40" width="280" height="310" rx="6" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/><rect x="10" y="40" width="280" height="76" fill="${RED}" stroke="${INK}" stroke-width="4"/><text x="150" y="94" text-anchor="middle" font-family="Rye" font-size="40" fill="#fff">SEMANA</text>${g}</svg>`;
}
function calBackSvg() {
  let rings = ''; for (let k = 0; k < 6; k++) rings += `<rect x="${44 + k * 44}" y="20" width="14" height="40" rx="7" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>`;
  return `<svg viewBox="0 0 300 360" width="100%" height="100%" style="overflow:visible">${cut('<rect x="0" y="30" width="300" height="330" rx="10"/>')}<rect x="0" y="30" width="300" height="330" rx="10" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="0" y="30" width="300" height="330" rx="10" fill="url(#hA)" opacity=".4"/>${rings}</svg>`;
}

/* ==================================================================
   ACUARIO DEL EXPERIMENTO (palanca + dispensador) — viewBox 0 0 840 620
   ================================================================== */
function tankBackSvg() {
  return `${cut('<rect x="20" y="70" width="800" height="530" rx="14"/>', 10, 12)}<rect x="20" y="70" width="800" height="530" rx="14" fill="rgba(255,255,255,.5)" stroke="${INK}" stroke-width="6"/>
  <rect x="32" y="130" width="776" height="458" fill="${WATER}"/><rect x="32" y="130" width="776" height="458" fill="url(#hW)" opacity=".16"/><path d="M560,130 C700,240 740,420 700,588 L808,588 L808,130 Z" fill="${WATER2}" opacity=".7"/>
  <path d="M32,130 H808" stroke="${INK}" stroke-width="3"/>
  <path d="M32,560 Q200,530 420,556 T808,548 V588 H32 Z" fill="#d9c7a6" stroke="${INK}" stroke-width="3"/><path d="M32,560 Q200,530 420,556 T808,548 V588 H32 Z" fill="url(#hP)"/>
  <path d="M110,588 C90,500 140,460 110,380 M150,588 C170,520 130,480 160,420" stroke="#4f7a3a" stroke-width="14" fill="none" stroke-linecap="round"/>`;
}
function tankFrontSvg() {
  return `<rect x="20" y="70" width="800" height="530" rx="14" fill="none" stroke="${INK}" stroke-width="7"/><path d="M60,170 V420" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".7"/><path d="M84,170 V250" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".6"/>
  <rect x="6" y="590" width="828" height="30" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="6" y="590" width="828" height="30" rx="8" fill="url(#hW)" opacity=".35"/><rect x="6" y="56" width="828" height="22" rx="6" fill="${INK}"/>`;
}
/* palanca: base + brazo (rota en 0,0) */
function leverSvg() {
  return `<svg viewBox="-60 -200 120 260" width="100%" height="100%" style="overflow:visible"><g class="arm"><path d="M-7,0 L-7,-150" stroke="${INK}" stroke-width="22" stroke-linecap="round"/><path d="M-7,0 L-7,-150" stroke="${METAL}" stroke-width="12" stroke-linecap="round"/><rect x="-46" y="-196" width="78" height="64" rx="16" fill="${RED}" stroke="${INK}" stroke-width="5"/><rect x="-46" y="-196" width="78" height="64" rx="16" fill="url(#hA)" opacity=".35"/></g><path d="M-44,40 Q-44,-14 0,-14 Q44,-14 44,40 Z" fill="${METAL2}" stroke="${INK}" stroke-width="5"/><circle cx="0" cy="0" r="10" fill="${INK}"/></svg>`;
}
/* dispensador (tolva) — viewBox 0 0 220 220 */
function hopperSvg() {
  let fl = ''; const r = rng(9); for (let k = 0; k < 16; k++) fl += `<path d="M${f1(40 + r() * 140)},${f1(30 + r() * 60)} l${f1(10)},${f1(-4 + r() * 8)} l-4,9 Z" fill="${['#C8102E', '#EE7A2B', '#7a9a52', '#FFE600'][k % 4]}" stroke="${INK}" stroke-width="2"/>`;
  return `<svg viewBox="0 0 220 220" width="100%" height="100%" style="overflow:visible">${cut('<path d="M10,10 H210 L140,140 V200 H80 V140 Z"/>')}<path d="M10,10 H210 L140,140 V200 H80 V140 Z" fill="${METAL3}" stroke="${INK}" stroke-width="5"/><path d="M150,10 H210 L140,140 V200 H120 V140 Z" fill="url(#hA)" opacity=".5"/>${fl}<rect x="74" y="190" width="72" height="18" fill="${INK}"/><g class="gate"><rect x="78" y="196" width="64" height="12" fill="${RED}" stroke="${INK}" stroke-width="3"/></g></svg>`;
}

/* ==================================================================
   RELOJ DE PARED sin números (marca de cubiertos arriba) viewBox 0 0 260 300
   ================================================================== */
function wallClockSvg() {
  let ticks = ''; for (let k = 0; k < 12; k++) { if (k === 0) continue; const a = k / 12 * Math.PI * 2; ticks += `M${f1(130 + Math.sin(a) * 86)},${f1(150 - Math.cos(a) * 86)}L${f1(130 + Math.sin(a) * 100)},${f1(150 - Math.cos(a) * 100)}`; }
  const fork = `<g transform="translate(130,72)"><path d="M-14,-16 V2 M-8,-16 V2 M-2,-16 V2 M-14,2 Q-8,10 -2,2 M-8,6 V22" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M10,-16 Q20,-2 12,8 V22" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;
  return `<svg viewBox="0 0 260 300" width="100%" height="100%" style="overflow:visible">${cut('<circle cx="130" cy="150" r="124"/>')}<circle cx="130" cy="150" r="124" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><circle cx="130" cy="150" r="124" fill="url(#hW)" opacity=".3"/><circle cx="130" cy="150" r="106" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>
  <path d="${ticks}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><circle class="tgt" cx="130" cy="72" r="26" fill="${YEL}" stroke="${INK}" stroke-width="3" opacity="0"/>${fork}
  <g class="hh"><path d="M130,150 L130,96" stroke="${INK}" stroke-width="10" stroke-linecap="round"/></g><g class="mh"><path d="M130,150 L130,74" stroke="${RED}" stroke-width="6" stroke-linecap="round"/></g><circle cx="130" cy="150" r="10" fill="${INK}"/></svg>`;
}
/* puerta de casa (viewBox 0 0 320 600): marco fijo + hoja que se abre */
function doorFrameSvg() {
  return `<svg viewBox="0 0 320 600" width="100%" height="100%" style="overflow:visible">${cut('<rect x="0" y="0" width="320" height="600" rx="8"/>')}<rect x="0" y="0" width="320" height="600" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><rect x="24" y="24" width="272" height="576" fill="#3a2a1e" stroke="${INK}" stroke-width="4"/><path d="M24,24 L296,24 L296,600 L24,600 Z" fill="url(#hD)" opacity=".4"/></svg>`;
}
function doorLeafSvg() {
  return `<svg viewBox="0 0 272 576" width="100%" height="100%" style="overflow:visible"><rect x="0" y="0" width="272" height="576" fill="#A5713F" stroke="${INK}" stroke-width="5"/><rect x="0" y="0" width="272" height="576" fill="url(#hW)" opacity=".3"/><rect x="30" y="30" width="212" height="220" rx="8" fill="none" stroke="${INK}" stroke-width="4"/><rect x="30" y="290" width="212" height="250" rx="8" fill="none" stroke="${INK}" stroke-width="4"/><circle cx="232" cy="290" r="14" fill="${BRASS}" stroke="${INK}" stroke-width="4"/></svg>`;
}
/* mesita (viewBox 0 0 520 260) */
function tableSvg() {
  return `<svg viewBox="0 0 520 260" width="100%" height="100%" style="overflow:visible">${cut('<rect x="0" y="0" width="520" height="40" rx="8"/><rect x="40" y="36" width="30" height="220"/><rect x="450" y="36" width="30" height="220"/>')}<rect x="40" y="36" width="30" height="220" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><rect x="450" y="36" width="30" height="220" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><rect x="0" y="0" width="520" height="40" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="0" y="0" width="520" height="40" rx="8" fill="url(#hW)" opacity=".35"/><path d="M20,40 Q100,70 180,40 Q260,70 340,40 Q420,70 500,40" stroke="${INK}" stroke-width="3" fill="#FBF6EA"/></svg>`;
}
/* expediente (viewBox 0 0 560 420) */
function folderSvg() {
  return `<svg viewBox="0 0 560 420" width="100%" height="100%" style="overflow:visible">${cut('<path d="M0,40 H200 L230,0 H560 V420 H0 Z"/>')}<path d="M0,40 H200 L230,0 H560 V420 H0 Z" fill="#D9B77A" stroke="${INK}" stroke-width="5"/><path d="M0,40 H200 L230,0 H560 V420 H0 Z" fill="url(#hP)"/>
  <rect x="30" y="70" width="500" height="320" fill="#FBF6EA" stroke="${INK}" stroke-width="4" transform="rotate(-2 280 230)"/>
  <text x="70" y="140" font-family="Rye" font-size="46" fill="${INK}">EXPEDIENTE</text><path d="M70,160 H480" stroke="${INK}" stroke-width="4"/>
  <text x="70" y="226" font-family="SpecialElite" font-size="40" fill="${INK}">Origen:</text><text x="280" y="232" font-family="Playfair" font-weight="900" font-size="64" fill="${PINK}" stroke="${INK}" stroke-width="2">¿ ? ?</text>
  <path d="M70,290 H460 M70,330 H380" stroke="${INK}" stroke-width="5" opacity=".25"/></svg>`;
}
