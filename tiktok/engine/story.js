/* story.js — piezas fijas de la serie (plantilla Napoleón v3) para no reescribirlas en cada episodio.
   Requiere: words.js, engine.js, kit/figs_v1.js, kit/figs_v2.js, kit/base_v2.js, ../ep39_siesta3/si_figs.js y si_lib.js.
   El episodio solo define sus escenas con plano()/portada()/golpe() y llama a Story.run({...}).
   Tiempos: L(n) inicio de la línea n, LE(n) final; Q('frase') inicio de la frase (búsqueda hacia delante), QE('frase') su final. */

/* ---------- tiempos ---------- */
const LS = {}, LEn = {};
W.forEach(x => { if (LS[x.line] == null) LS[x.line] = x.s; LEn[x.line] = x.e; });
const NL = Math.max(...W.map(x => x.line)) + 1;
const L = n => LS[n < 0 ? NL + n : n], LE = n => LEn[n < 0 ? NL + n : n];
let _qc = 0;
function _q(phrase, from) {
  const toks = phrase.split(/\s+/).map(normW).filter(Boolean);
  for (let i = from; i < W.length; i++) {
    let ok = true; for (let j = 0; j < toks.length; j++) if (!W[i + j] || normW(W[i + j].w) !== toks[j]) { ok = false; break; }
    if (ok) return [i, i + toks.length - 1];
  }
  throw new Error('Q: no encuentro «' + phrase + '» desde la palabra ' + from);
}
// Q('frase') = inicio; QE('frase') = final. Avanzan un cursor: llama en el orden del guion. Q('frase', n) busca desde la línea n.
function Q(phrase, line) { const from = line == null ? _qc : W.findIndex(x => x.line === line); const r = _q(phrase, from); _qc = r[0] + 1; return W[r[0]].s; }
function QE(phrase, line) { const from = line == null ? Math.max(0, _qc - 1) : W.findIndex(x => x.line === line); const r = _q(phrase, from); _qc = r[1] + 1; return W[r[1]].e; }

/* ---------- registros que anima el bucle ---------- */
const FX = { stamps: [], pops: [], paints: [], fns: [] };
// sello rojo centrado que cae cuando lo dice la voz
function sello(pa, y, html, t0, o = {}) {
  const w = el('div', pa, { left: '0', top: px(y), width: '1080px', textAlign: 'center', zIndex: o.z || 60 });
  w.innerHTML = `<span style="display:inline-block;border:${o.bw || 12}px solid ${o.col || RED};color:${o.col || RED};font-family:Rye;font-size:${o.size || 110}px;padding:4px 30px 10px;border-radius:16px;white-space:nowrap;line-height:1.05;letter-spacing:0.04em;background:${o.bg || 'rgba(255,255,255,.55)'}">${html}</span>`;
  FX.stamps.push({ e: w, t: t0, r: o.r == null ? -6 : o.r }); shakeAt(t0, 0.3, o.shake || 12); sfx('stamp', t0, o.gain || 1.0);
  return w;
}
// aparece con rebote en t0 (chips, figuras, textos)
function aparece(e, t0, o = {}) { FX.pops.push({ e, t: t0, o }); if (o.sfx !== false) sfx(o.sfx || 'pop', t0, o.gain || 0.5); return e; }
// subrayado amarillo que se pinta (hlSpan con clase cls dentro de pa)
function pinta(pa, cls, t0) { FX.paints.push({ e: pa.querySelector('.' + cls), t: t0 }); }
// texto grande centrado
function texto(pa, y, html, o = {}) { return el('div', pa, { left: px(o.x || 40), top: px(y), width: px(o.w || 1000), textAlign: 'center', fontFamily: 'Playfair', fontWeight: o.weight || 900, fontStyle: o.italic ? 'italic' : 'normal', fontSize: px(o.size || 92), lineHeight: 1.06, color: o.color || INK, zIndex: o.z || 20, textShadow: o.shadow || '' }, html); }
// figura SVG suelta (inner en coordenadas de vb)
function figura(pa, x, y, w, h, inner, vb, o = {}) { const d = box(pa, x, y, w, h, { zIndex: o.z || 8, transformOrigin: o.origin || '50% 100%' }); d.innerHTML = `<svg viewBox="${vb}" width="100%" height="100%" style="overflow:visible">${inner}</svg>`; return d; }

/* ---------- planos ---------- */
const SCENES = [];
// plano(t0, t1, fondo, build): build(c) crea elementos y devuelve opcionalmente fn(t) por fotograma
function plano(t0, t1, fondo, build, o = {}) {
  const c = scene(t0, t1, null, { clip: true, cut: o.cut !== false, z: o.z });
  sceneBg(c, typeof fondo === 'string' ? { background: fondo } : fondo);
  const fn = build(c); SC[SC.length - 1].fn = fn || null; SCENES.push(t0);
  if (o.sfx !== false) sfx(o.sfx || 'whoosh', t0 + 0.03, 0.5);
  return c;
}
const PAPEL = { background: '#EADFC8' }, ROSA = { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.13) 0 3px, transparent 3px 58px)' };
// golpe de color a página completa con texto enorme
function golpe(t0, t1, col, l1, l2, o = {}) {
  colorHit(t0, t1, col, c => {
    const a = texto(c, o.y || 640, l1, { size: o.size || 150, color: INK });
    const b = l2 ? texto(c, (o.y || 640) + (o.size || 150) * 1.15, l2, { size: o.size2 || 120, color: o.col2 || '#fff', shadow: OUTL(INK, 8) }) : null;
    if (o.draw) o.draw(c);
    return t => { set(a, { s: 1 + 0.03 * Math.sin(t * 6), r: -2 }); if (b) set(b, { s: pop(t, o.t2 || t0 + 0.25, 0.35), r: 2, o: t < (o.t2 || t0 + 0.25) ? 0 : 1 }); };
  });
  sfx('swoosh_up', t0 + 0.02, 0.6); shakeAt(t0 + 0.05, 0.35, 16); SCENES.push(t0);
}

/* ---------- cabecera de paso «1 · …» (aguanta todo el paso) ---------- */
const STEPHDR = [];
function paso(t0, t1, n, html, hlT) {
  const b = box(world, 50, 300, 980, 222, { zIndex: 520, transformOrigin: '120px 110px' });
  box(b, 0, 0, 980, 222, { background: '#FBF6EA', border: `7px solid ${INK}`, borderRadius: '30px', boxShadow: `10px 12px 0 ${SH}` });
  box(b, 14, 14, 952, 194, { border: `3px dashed rgba(43,33,24,.35)`, borderRadius: '22px' });
  const badge = box(b, 24, 22, 178, 178, { borderRadius: '50%', background: YEL, border: `8px solid ${INK}`, boxShadow: `7px 7px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '138px', lineHeight: '156px', color: INK, zIndex: 2 }, String(n));
  el('div', b, { left: '232px', top: '26px', width: '730px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '70px', lineHeight: 1.1, color: INK, zIndex: 2 }, html);
  STEPHDR.push({ b, badge, t0, t1, hl: b.querySelector('.shl'), hlT });
  sfx('thud', t0 + 0.1, 0.8); sfx('ding', t0 + 0.2, 0.6); shakeAt(t0 + 0.12, 0.3, 12);
}

/* ---------- el Vecino en su óvalo (abajo-izquierda) ---------- */
const OV = { x: 40, y: 962, w: 330, h: 362 };
const ovalW = box(world, OV.x, OV.y, OV.w, OV.h, { zIndex: 850 });
const ovIn = box(ovalW, 16, 16, OV.w - 32, OV.h - 32, { borderRadius: '50%', overflow: 'hidden', background: `repeating-linear-gradient(90deg, #F4CFDA 0 16px, #F9E3EA 16px 32px)` });
const vecO = mkVec(ovIn, [-48, -18, 396, 490]);
{
  const ovFrame = box(ovalW, -20, -36, OV.w + 40, OV.h + 80);
  const cx = (OV.w + 40) / 2, cy = 36 + OV.h / 2, rx = OV.w / 2 - 4, ry = OV.h / 2 - 4;
  let beads = ''; for (let k = 0; k < 40; k++) { const a = k / 40 * Math.PI * 2; beads += `<circle cx="${f1(cx + Math.cos(a) * (rx + 2))}" cy="${f1(cy + Math.sin(a) * (ry + 2))}" r="4.5" fill="#f3d27a" stroke="${INK}" stroke-width="1.5"/>`; }
  ovFrame.innerHTML = `<svg width="${OV.w + 40}" height="${OV.h + 80}" style="overflow:visible">
  <ellipse cx="${cx + 8}" cy="${cy + 10}" rx="${rx + 14}" ry="${ry + 14}" fill="none" stroke="${SH}" stroke-width="26"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 14}" ry="${ry + 14}" fill="none" stroke="#fff" stroke-width="34"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="${INK}" stroke-width="24"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="${BRASS}" stroke-width="17"/>${beads}
  <g transform="translate(${cx},${OV.h + 60})"><rect x="-104" y="-26" width="208" height="46" rx="10" fill="${INK}" stroke="${BRASS}" stroke-width="4"/><text x="0" y="8" text-anchor="middle" font-family="Rye" font-size="25" fill="${YEL}">EL VECINO</text></g></svg>`;
}
let OV_VIS = [], OV_CFG = {};
/* Vecino fijo (estilo ep07 OK): Story.run({ ovalo:[[a,b]], vecino:{ risa:[[a,b]], sorpresa:[[a,b]], golpes:[t,…] } })
   risa = se parte (ojos cerrados, tiembla) · sorpresa = cejas arriba · golpes = el óvalo crece y salta en el remate */
function updOval(t) {
  let st = null;
  for (const [a, b] of OV_VIS) if (t >= a && t < b) st = { s: 0.75 * pop(t, a, 0.4), x: -41 - p(t, b - 0.14, 0.14, E.inCubic) * 300 };
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  ovalW.style.visibility = 'visible';
  const C = OV_CFG, inR = (C.risa || []).find(r => t >= r[0] && t < r[1]), inS = (C.sorpresa || []).find(r => t >= r[0] && t < r[1]);
  let g = 0; (C.golpes || []).forEach(t0 => { if (t >= t0 && t < t0 + 0.8) g = Math.max(g, Math.sin(p(t, t0, 0.8) * Math.PI)); });
  const shk = inR ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x + g * 50, y: 45 + shk + wobble(t, 0.5, 2) - g * 70, s: st.s * (1 + 0.3 * g), r: (inR ? Math.sin(t * 20) * 2.5 : 0) - g * 5 });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (inS || g > 0.15) { o.look = [0, 0]; o.bL = 14; o.bR = 14; o.jaw = Math.max(o.jaw, 0.5); o.fan = Math.sin(t * 22) * 16; }
  if (inR) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  vecFace(vecO, t, o);
}
/* Papel con fibras + viñeta + borde quemado por encima de todas las escenas (como el ep07) */
function textura() {
  const r = rng(1932), d = box(world, 0, 0, 1080, 1920, { zIndex: 800, pointerEvents: 'none' });
  let fb = ''; for (let k = 0; k < 500; k++) fb += `M${f1(r() * 1080)},${f1(r() * 1920)}l${f1(r() * 14 - 7)},${f1(r() * 6 - 3)}`;
  let dots = ''; for (let k = 0; k < 300; k++) dots += `M${f1(r() * 1080)},${f1(r() * 1920)}h1.6`;
  const edge = (depth, seed) => { const q = rng(seed); const pts = []; const st = 24;
    for (let x = 0; x <= 1080; x += st) pts.push([x, depth * (0.3 + q())]);
    for (let y = st; y <= 1920; y += st) pts.push([1080 - depth * (0.3 + q()), y]);
    for (let x = 1080 - st; x >= 0; x -= st) pts.push([x, 1920 - depth * (0.3 + q())]);
    for (let y = 1920 - st; y > 0; y -= st) pts.push([depth * (0.3 + q()), y]);
    return 'M-20,-20H1100V1940H-20Z M' + pts.map(p => f1(p[0]) + ',' + f1(p[1])).join('L') + 'Z'; };
  d.innerHTML = `<svg width="1080" height="1920" viewBox="0 0 1080 1920"><defs><radialGradient id="vigT" cx="50%" cy="50%" r="75%"><stop offset=".55" stop-color="#5a3510" stop-opacity="0"/><stop offset="1" stop-color="#5a3510" stop-opacity=".5"/></radialGradient></defs>
  <path d="${fb}" stroke="rgba(43,33,24,.10)" stroke-width="1.2"/><path d="${dots}" stroke="rgba(43,33,24,.18)" stroke-width="1.6"/><rect width="1080" height="1920" fill="url(#vigT)"/>
  <path d="${edge(46, 3)}" fill="#7a4a1c" fill-rule="evenodd" opacity=".35"/><path d="${edge(26, 4)}" fill="#3a2210" fill-rule="evenodd" opacity=".85"/></svg>`;
  return d;
}

/* ---------- MARCA: el Vecino en su balcón («Soy tu vecino, y esto no venía en el libro.») ---------- */
function marca(line) {
  const T0 = L(line) - 0.08, T1 = L(line + 1) - 0.12, i0 = W.findIndex(x => x.line === line);
  const tEsto = W[i0 + 4].s, tSoy = W[i0].s, tVec = W[i0 + 2].s, tLib = W[i0 + 9].s;
  let cam, vec, tag, sign, sw = [], sHL;
  plano(T0, T1, ROSA, c => {
    cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
    const win = box(cam, 0, 0, 1080, 1920);
    const arch = 'M160,1300 L160,640 Q160,450 540,440 Q920,450 920,640 L920,1300 Z';
    win.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">
    <rect x="12" y="520" width="140" height="760" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="928" y="520" width="140" height="760" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>
    ${[...Array(14)].map((_, k) => `<path d="M24,${560 + k * 50} h116 M940,${560 + k * 50} h116" stroke="${INK}" stroke-width="3"/>`).join('')}
    <path d="${arch}" fill="#fff" stroke="#fff" stroke-width="40"/><path d="${arch}" fill="#3a2a1e" stroke="${INK}" stroke-width="8"/>
    <path d="M168,600 C230,700 230,1100 200,1290 L168,1290 Z M912,600 C850,700 850,1100 880,1290 L912,1290 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="3"/></svg>`;
    vec = mkVec(cam, [190, 430, 700, 867]);
    const rail = box(cam, 0, 0, 1080, 1920); let bars = '';
    for (let x = 140; x <= 940; x += 40) bars += `<path d="M${x},1206 V1330" stroke="${INK}" stroke-width="9"/><circle cx="${x}" cy="1268" r="9" fill="none" stroke="${INK}" stroke-width="4"/>`;
    rail.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><rect x="110" y="1180" width="860" height="30" rx="8" fill="${INK}"/>${bars}<rect x="110" y="1322" width="860" height="40" fill="${INK}"/></svg>`;
    tag = chip(cam, 640, 610, 'tu vecino', { size: 44, bg: PINK });
    sign = box(cam, 120, 260, 840, 270, { zIndex: 40 });
    sign.innerHTML = `<svg width="840" height="270" style="position:absolute;left:0;top:0;overflow:visible"><path d="M160,0 L200,40 M680,0 L640,40" stroke="${INK}" stroke-width="5"/>${cut('<rect x="20" y="40" width="800" height="226" rx="22"/>')}<rect x="20" y="40" width="800" height="226" rx="22" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/></svg>`;
    const sl1 = el('div', sign, { left: '0', top: '64px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '80px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
    const sl2 = el('div', sign, { left: '0', top: '160px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '62px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
    ['Soy', 'tu', 'vecino,', 'y', 'esto', 'no', 'venía', 'en', 'el', 'libro.'].forEach((wd, k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.style.position = 'relative'; s.innerHTML = wd === 'libro.' ? hlSpan('libro.', 'shl') : wd; (k < 3 ? sl1 : sl2).appendChild(s); sw.push({ e: s, t: W[i0 + k].s }); });
    sHL = sign.querySelector('.shl');
    return t => {
      set(cam, { s: 1.04 + 0.04 * p(t, T0, T1 - T0, E.linear) });
      const lean = p(t, tEsto - 0.3, 0.4, E.inOutCubic);
      set(vec.d, { s: 1 + lean * 0.07, y: wobble(t, 0.5, 3) - lean * 20 });
      vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > tEsto ? [-4, 3] : [0, 0], bL: t > tEsto ? 6 : 0, bR: t > tEsto ? 12 : 0, fan: Math.sin(t * 2 * Math.PI * 0.6) * 14, seed: 0.3 });
      popA(tag, t, tVec, { r: -5 });
      const ks = p(t, tSoy - 0.05, 0.55, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: (1 - ks) * 8, o: t < tSoy - 0.07 ? 0 : 1 });
      sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
      paint(sHL, t, tLib, 0.3);
    };
  }, { sfx: 'whoosh' });
  sfx('swoosh_up', tSoy, 0.6); sfx('pop', tVec, 0.6);
}

/* ---------- PREGUNTA FINAL + «Os leo» (penúltima línea) ---------- */
function preguntaFinal(l1, l2, o = {}) {
  const line = NL - 2, T0 = L(line) - 0.08, T1 = L(line + 1) - 0.08, i0 = W.findIndex(x => x.line === line);
  const iOs = W.findIndex((x, i) => i > i0 && normW(x.w) === 'os'), tOs = W[iOs].s;
  plano(T0, T1, { background: '#EFE1C6' }, c => {
    rays(c, -160, 340, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
    const a = texto(c, 300, l1, { size: o.size || 84 }), b = texto(c, 300 + (o.size || 84) * 1.1 * (o.rows1 || 1), l2, { size: o.size || 84 });
    if (o.draw) o.draw(c);
    const QM = [[120, 860], [840, 840], [160, 1180], [800, 1160]].map((q, i) => qMark(c, q[0], q[1], 120, i % 2 ? PINK : YEL));
    const ol = chip(c, 560, 1110, 'Os leo 👇', { size: 64, bg: PINK, z: 40 });
    return t => {
      set(a, { r: wobble(t, 0.5, 0.6) }); set(b, { r: wobble(t, 0.45, 0.6, 1) });
      QM.forEach((q, i) => set(q, { s: pop(t, T0 + 0.3 + i * 0.12, 0.3), r: Math.sin(t * 5 + i) * 10, o: t < T0 + 0.3 + i * 0.12 ? 0 : 1 }));
      popA(ol, t, tOs, { r: -4 });
    };
  });
  sfx('ding', tOs, 0.7);
}

/* ---------- CIERRE: «Y esto... no venía en el libro.» y el libro HISTORIA se cierra ---------- */
function cierre(ep, titulo, izq = ['HISTORIA', 'de verdad']) {
  const line = NL - 1, i0 = W.findIndex(x => x.line === line), T0 = L(line) - 0.08;
  const tNo = W[i0 + 2].s, tLib = W[i0 + 6].s, TC = tLib - 0.05, SCB = 1.1;
  headline(T0, tNo - 0.06, 'Y esto…', { size: 120, color: YEL, y: 150, shadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}` });
  headline(tNo - 0.06, LOOP, '…no venía en el *libro.*', { size: 92, hlT: tLib, y: 170 });
  plano(T0, LOOP, ROSA, c => {
    rays(c, -160, 360, 1400, 24, 'rgba(255,255,255,.18)', 'rgba(0,0,0,0)', 1);
    const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px', zIndex: 2 });
    const vb = mk(bookW, [150, 360, 380, 470], vecinaInner({ seed: 4 }), '0 0 420 520', 'vec'); vb.d.style.zIndex = 0;
    const bs = svgLayer(bookW, 1);
    let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
    let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
    bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
     <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/>
     <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="52" fill="${INK}">${izq[0]}</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="36" fill="${INK}">${izq[1]}</text>${lines}
     <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
      <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
      <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
    const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
    const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '1200px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
    const epl = el('div', c, { left: '0', top: '1270px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:40px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. ${ep} · ${titulo}</span>`);
    return t => {
      const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
      flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
      pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
      const closed = t > TC + 0.3;
      set(bookW, { x: 210 * SCB * p(t, TC + 0.2, 0.25, E.outCubic), s: SCB * pop(t, T0 + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
      stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
      const kv = p(t, T0 + 0.05, 0.35, E.outBack);
      set(vb.d, { y: (1 - kv) * 200 + wobble(t, 0.6, 3), o: t < T0 + 0.05 ? 0 : 1 });
      vecFace(vb, t, { jaw: talkW(t, 'VECINO'), look: [0, 2], bL: 8, bR: 8, fan: closed ? Math.sin(t * 2 * Math.PI * 1.2) * 18 : wobble(t, 0.9, 6), seed: 0.7 });
      popA(epl, t, TC + 0.3, { r: -1 });
    };
  });
  shakeAt(tLib + 0.25, 0.5, 22); sfx('thud', tLib + 0.25, 1.4);
}

/* ---------- cameo del emú (una vez por vídeo): asoma por la derecha y mira a cámara ---------- */
let EMU_T = null; const emuW = box(world, 820, 980, 300, 450, { zIndex: 840 });
emuW.innerHTML = `<svg viewBox="0 0 400 600" width="100%" height="100%" style="overflow:visible"><use href="#emuS" width="400" height="600"/></svg>`;
function emu(t0) { EMU_T = t0; sfx('emu', t0 + 0.1, 0.9); }
function updEmu(t) { if (EMU_T == null || t < EMU_T || t > EMU_T + 1.2) { emuW.style.visibility = 'hidden'; return; } emuW.style.visibility = 'visible'; const k = Math.min(p(t, EMU_T, 0.25, E.outBack), 1 - p(t, EMU_T + 0.95, 0.25, E.inCubic)); set(emuW, { x: (1 - k) * 320, r: -8 + Math.sin(t * 9) * 3 }); }

/* ---------- arranque ---------- */
let LOOP = 0;
const Story = {
  prepara() { LOOP = LE(NL - 1) + 0.2; window.LOOP = LOOP; },
  run(o = {}) {
    OV_VIS = o.ovalo || []; OV_CFG = o.vecino || {}; if (o.textura) textura();
    window.frame = t => {
      if (t >= LOOP) { window.frame0(0); const k = p(t, LOOP, 0.22, E.outCubic); set(world, { x: (1 - k) * 1080 }); return; }
      window.frame0(t);
    };
    window.frame0 = t => {
      SC.forEach(s => {
        const vis = t >= s.t0 && t < s.t1 + (s.t1 < 900 && !s.cut ? 0.25 : 0); s.c.style.display = vis ? '' : 'none'; if (!vis) return;
        if (s.cut) set(s.c, { o: 1 }); else { const kin = p(t, s.t0, 0.22, E.outCubic); set(s.c, { x: (1 - kin) * 160 * s.dir, o: clamp(kin * 1.8) }); }
        if (s.fn) s.fn(t);
      });
      HLS.forEach(h => {
        const vis = t >= h.t0 - 0.02 && t < h.t1; h.b.style.display = vis ? '' : 'none'; if (!vis) return;
        h.b.style.opacity = 1 - p(t, h.t1 - 0.12, 0.12, E.inCubic);
        h.spans.forEach(s => { const k = p(t, s.t - 0.14, 0.26, E.outBack); set(s.e, { y: (1 - k) * 42, o: clamp(k * 1.5) }); });
        h.hls.forEach(s => { s.e.style.transform = `scaleX(${f1(p(t, s.t, 0.36, E.outCubic) * 1000) / 1000}) rotate(-1.2deg)`; });
      });
      STEPHDR.forEach(h => {
        const vis = t >= h.t0 && t < h.t1; h.b.style.display = vis ? '' : 'none'; if (!vis) return;
        const k = p(t, h.t0, 0.32, E.outBack);
        set(h.b, { y: (1 - k) * -330, r: wobble(t, 0.35, 0.4), o: 1 - p(t, h.t1 - 0.1, 0.1, E.inCubic) });
        const kb = p(t, h.t0 + 0.12, 0.22, E.outCubic); set(h.badge, { s: lerp(2.0, 1, kb), r: lerp(-30, -6, kb) });
        if (h.hl) paint(h.hl, t, h.hlT, 0.35);
      });
      FX.stamps.forEach(s => stampA(s.e, t, s.t, s.r));
      FX.pops.forEach(s => popA(s.e, t, s.t, s.o));
      FX.paints.forEach(s => paint(s.e, t, s.t, 0.35));
      FX.fns.forEach(f => f(t));
      updOval(t); updEmu(t);
      let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
      set(world, { x: sh, y: sh * 0.6 });
    };
    sfx('whoosh', LOOP, 0.6);
    // precarga de fuentes
    ['900 40px Playfair', 'italic 800 40px Playfair', '800 40px Playfair', '40px Rye', '40px SpecialElite', '800 40px Bricolage'].forEach(f => { try { document.fonts.load(f); } catch (e) { } });
    Engine.start({ captions: { y: 1380, font: 'Bricolage', size: 50, weight: 800, bg: '#111', color: '#fff', hi: '#FFE600', radius: 40, pad: '12px 30px 14px', maxWords: 3 }, duration: LOOP + 0.6 });
    const capBox = [...document.getElementById('stage').children].find(e => e.style.zIndex === '900');
    const r0 = window.render; window.render = t => { r0(t); if (capBox && t >= LOOP) capBox.style.visibility = 'hidden'; };
  },
};

/* ---------- CTA de SEGUIR (una línea entera): el Vecino señala el botón «+» real de TikTok (barra derecha, avatar ≈ y 1040)
   y una tarjeta adelanta el próximo episodio. Uso: sigueme(n, 'Próximo:', '¿Por qué Pepe?', 'sígueme') */
function sigueme(line, l1, l2, palabra = 'sígueme') {
  const T0 = L(line) - 0.1, T1 = L(line + 1) - 0.08, i0 = W.findIndex(x => x.line === line);
  const iS = W.findIndex((x, i) => i >= i0 && x.line === line && normW(x.w).startsWith(normW(palabra))), tS = iS >= 0 ? W[iS].s : T0 + 1.5;
  plano(T0, T1, { background: '#F4CFDA', backgroundImage: 'repeating-linear-gradient(90deg, #F4CFDA 0 40px, #F9E3EA 40px 80px)' }, c => {
    const card = figura(c, 90, 300, 660, 380, `${FIGP('M0,0 L660,0 L660,380 L0,380 Z', '#FBF6EA', 6, .2)}<rect x="18" y="18" width="624" height="344" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="10 8"/>`, '0 0 660 380', { z: 4, origin: '50% 50%' });
    const c1 = texto(c, 340, l1, { size: 64, x: 90, w: 660, z: 6, italic: true }), c2 = texto(c, 440, l2, { size: 96, x: 90, w: 660, z: 6 });
    const v = mk(c, [60, 760, 560, 693], vecinaInner({ seed: 4 }), '0 0 420 520', 'vec');
    const arrow = box(c, 520, 860, 420, 220, { zIndex: 12 }, arrowSvg('M10,190 Q200,40 400,170', PINK, 14));
    const plus = box(c, 930, 990, 120, 120, { zIndex: 20, borderRadius: '50%', background: '#FE2C55', border: `8px solid #fff`, boxShadow: `0 0 0 6px ${INK}`, textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '96px', lineHeight: '100px', color: '#fff' }, '+');
    const hand = box(c, 840, 1060, 150, 150, { zIndex: 22 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="150" height="150" style="overflow:visible">${gloveHand(0, 0, -40, 1.1)}</svg>`;
    const ch = chip(c, 560, 1180, '¡SÍGUEME!', { size: 72, bg: '#FE2C55', z: 30 });
    sfx('ding', tS, 0.8); sfx('pop2', tS + 0.15, 0.6);
    return t => {
      set(card, { r: -2 + wobble(t, 0.4, 1), s: pop(t, T0 + 0.05, 0.35) }); set(c1, { o: t > T0 + 0.15 ? 1 : 0 }); set(c2, { s: pop(t, T0 + 0.3, 0.35), o: t > T0 + 0.3 ? 1 : 0 });
      vecFace(v, t, { jaw: talkW(t, 'VECINO'), look: [6, 2], bL: 4, bR: 10, fan: wobble(t, 0.9, 6), seed: 0.5 });
      set(arrow, { o: t > tS - 0.3 ? 1 : 0, sx: p(t, tS - 0.3, 0.3) });
      const beat = 1 + 0.12 * Math.abs(Math.sin((t - tS) * 6));
      set(plus, { s: t > tS - 0.2 ? beat : 0.001, o: t > tS - 0.2 ? 1 : 0 });
      set(hand, { o: t > tS ? 1 : 0, x: Math.sin(t * 8) * 10, y: Math.abs(Math.sin(t * 8)) * -16 });
      popA(ch, t, tS, { r: -5 });
    };
  });
}
