/* Ep. 6 — figuras nuevas en estilo grabado: los 7 astros, calendario, astrónomo, astrolabio,
   trabajadores (gorro frigio), Napoleón (bicornio), hamaca, gorro frigio grande, compás. */
const NIGHT = '#221C2C', SUNC = '#F7C948', MOONC = '#EFE8D2';

/* ---------- rasgos de cara comunes (viewBox 300x300, ojos en y≈150) ---------- */
function astroFeatures(o = {}) {
  const ey = o.ey || 150, ex = o.ex || 26, cx = 150, my = o.my || 205;
  let s = '';
  s += `<ellipse cx="${cx - ex}" cy="${ey}" rx="15" ry="12" fill="#fff" stroke="${INK}" stroke-width="3"/><ellipse cx="${cx + ex}" cy="${ey}" rx="15" ry="12" fill="#fff" stroke="${INK}" stroke-width="3"/>`;
  s += `<g class="pup"><circle cx="${cx - ex + 1}" cy="${ey + 1}" r="6.5" fill="${INK}"/><circle cx="${cx + ex + 1}" cy="${ey + 1}" r="6.5" fill="${INK}"/><circle cx="${cx - ex - 1}" cy="${ey - 2}" r="2" fill="#fff"/><circle cx="${cx + ex - 1}" cy="${ey - 2}" r="2" fill="#fff"/></g>`;
  const fc = o.skin || FIG;
  s += `<g class="lidC" style="opacity:0"><ellipse cx="${cx - ex}" cy="${ey}" rx="16" ry="13" fill="${fc}" stroke="${INK}" stroke-width="3"/><ellipse cx="${cx + ex}" cy="${ey}" rx="16" ry="13" fill="${fc}" stroke="${INK}" stroke-width="3"/><path d="M${cx - ex - 13},${ey + 2} q13,8 26,0 M${cx + ex - 13},${ey + 2} q13,8 26,0" stroke="${INK}" stroke-width="3" fill="none"/></g>`;
  s += `<g class="wink" style="opacity:0"><ellipse cx="${cx + ex}" cy="${ey}" rx="17" ry="14" fill="${fc}"/><path d="M${cx + ex - 15},${ey + 3} q15,-12 30,0" stroke="${INK}" stroke-width="4.5" fill="none" stroke-linecap="round"/></g>`;
  s += `<path class="brow" d="M${cx - ex - 16},${ey - 22} q16,-10 32,-2 M${cx + ex - 16},${ey - 24} q16,-8 32,2" stroke="${INK}" stroke-width="${o.bw || 5}" stroke-linecap="round" fill="none"/>`;
  if (!o.noNose) s += `<path d="M${cx + 2},${ey + 10} C${cx - 4},${ey + 30} ${cx - 12},${ey + 38} ${cx - 6},${ey + 43} C${cx},${ey + 46} ${cx + 8},${ey + 45} ${cx + 12},${ey + 40}" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  s += `<g class="mN"><path d="M${cx - 20},${my} q20,9 40,0" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>`;
  s += `<g class="mS" style="opacity:0"><path d="M${cx - 30},${my - 6} Q${cx},${my + 40} ${cx + 30},${my - 6} Z" fill="#160f0a" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><path d="M${cx - 24},${my - 3} L${cx + 24},${my - 3} L${cx + 20},${my + 5} L${cx - 20},${my + 5} Z" fill="#fff"/><path d="M${cx - 12},${my + 18} q12,-8 24,0 q-12,10 -24,0" fill="#B23A48"/><circle cx="${cx - 52}" cy="${my - 12}" r="13" fill="${PINK}" opacity=".35"/><circle cx="${cx + 52}" cy="${my - 12}" r="13" fill="${PINK}" opacity=".35"/></g>`;
  s += `<g class="mO" style="opacity:0"><ellipse cx="${cx}" cy="${my + 4}" rx="12" ry="15" fill="#160f0a" stroke="${INK}" stroke-width="3"/></g>`;
  return s;
}
/* busto clásico de base (hombros + cuello + cara) */
function bustBase(id, o = {}) {
  const sh = 'M48,300 C52,250 96,226 150,226 C204,226 248,250 252,300 Z';
  const neck = 'M124,200 L176,200 L180,246 L120,246 Z';
  const face = 'M84,150 C84,92 112,66 150,66 C188,66 216,92 216,150 C216,208 190,246 150,246 C110,246 84,208 84,150 Z';
  const sil = P(sh) + P(neck) + P(face) + '<circle cx="84" cy="156" r="14"/><circle cx="216" cy="156" r="14"/>';
  let s = D(sh, o.cloth || '#E6DCC6') + clipG(id + 's', sh, `<rect x="40" y="220" width="230" height="90" fill="url(#hB)" opacity=".7"/><path d="M70,300 Q110,250 150,244 M230,300 Q190,252 150,244 M96,300 Q130,262 150,258" stroke="${INK}" stroke-width="2.4" fill="none"/>`);
  s += D(neck) + HF('M160,200 L176,200 L180,246 L162,246 Z', 'hF');
  s += `<circle cx="84" cy="156" r="14" fill="${FIG}" stroke="${INK}" stroke-width="3"/><circle cx="216" cy="156" r="14" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`;
  s += D(face) + clipG(id + 'f', face, `<ellipse cx="214" cy="160" rx="34" ry="96" fill="url(#hA)"/>`);
  return { sil, s, face };
}
/* los 7 astros personificados — viewBox 0 0 300 300 */
function astroInner(kind) {
  const id = uid('as');
  let sil = '', s = '', top = '', feat = astroFeatures();
  if (kind === 'sol') {
    let rays = '', rsil = '';
    for (let i = 0; i < 14; i++) {
      const a = i / 14 * Math.PI * 2, b = a + 0.16, c = a - 0.16, R1 = 96, R2 = i % 2 ? 140 : 150;
      const d = `M${f1(150 + Math.cos(c) * R1)},${f1(150 + Math.sin(c) * R1)} L${f1(150 + Math.cos(a) * R2)},${f1(150 + Math.sin(a) * R2)} L${f1(150 + Math.cos(b) * R1)},${f1(150 + Math.sin(b) * R1)} Z`;
      rsil += P(d); rays += D(d, i % 2 ? SUNC : '#F2983E', 3) + `<path d="${d}" fill="url(#hA)" opacity=".35"/>`;
    }
    sil = rsil + '<circle cx="150" cy="150" r="102"/>';
    s = rays + `<circle cx="150" cy="150" r="102" fill="${SUNC}" stroke="${INK}" stroke-width="4"/>` + clipG(id + 'c', 'M48,150a102,102 0 1,0 204,0a102,102 0 1,0 -204,0', `<ellipse cx="236" cy="190" rx="70" ry="120" fill="url(#hA)" opacity=".6"/>`);
    feat = astroFeatures({ skin: SUNC, my: 200 });
  } else if (kind === 'luna') {
    sil = '<circle cx="150" cy="150" r="108"/>';
    s = `<circle cx="150" cy="150" r="108" fill="${MOONC}" stroke="${INK}" stroke-width="4"/>` + clipG(id + 'c', 'M42,150a108,108 0 1,0 216,0a108,108 0 1,0 -216,0', `<path d="M150,30 C250,60 260,240 150,270 L280,280 L280,20 Z" fill="url(#hD)" opacity=".55"/><circle cx="96" cy="96" r="16" fill="none" stroke="${INK}" stroke-width="2.5"/><circle cx="210" cy="232" r="20" fill="none" stroke="${INK}" stroke-width="2.5"/><circle cx="84" cy="214" r="10" fill="none" stroke="${INK}" stroke-width="2.5"/><circle cx="200" cy="80" r="9" fill="none" stroke="${INK}" stroke-width="2.5"/>`);
    feat = astroFeatures({ skin: MOONC, my: 206 });
  } else {
    const b = bustBase(id, { cloth: { marte: '#E2C9B0', mercurio: '#E6DCC6', jupiter: '#DCCBA8', venus: '#F2D5E2', saturno: '#D6CDBB' }[kind] });
    sil = b.sil; s = b.s;
    if (kind === 'marte') {
      const dome = 'M78,150 C70,66 112,40 150,40 C188,40 230,66 222,150 L206,150 C204,112 186,98 150,98 C114,98 96,112 94,150 Z';
      const crest = 'M92,58 C110,0 196,-4 214,52 C196,40 170,30 150,34 C126,34 106,44 92,58 Z';
      const gL = 'M80,140 L102,140 L104,200 L86,190 Z', gR = 'M220,140 L198,140 L196,200 L214,190 Z';
      sil += P(dome) + P(crest) + P(gL) + P(gR);
      top = D(crest, RED) + clipG(id + 'k', crest, `<rect x="90" y="0" width="130" height="60" fill="url(#hW)" opacity=".7"/>`) + D(dome, BRASS) + HF(dome, 'hA') + D(gL, BRASS) + D(gR, BRASS) + `<path d="M98,120 Q150,104 202,120" stroke="${INK}" stroke-width="3" fill="none"/>`;
    } else if (kind === 'mercurio') {
      const brim = 'M58,104 Q150,76 242,104 Q150,128 58,104 Z', dome = 'M96,100 C96,52 204,52 204,100 Z';
      const wL = 'M96,88 C60,60 30,64 18,44 C44,48 50,40 40,26 C70,36 92,56 104,76 Z', wR = 'M204,88 C240,60 270,64 282,44 C256,48 250,40 260,26 C230,36 208,56 196,76 Z';
      sil += P(brim) + P(dome) + P(wL) + P(wR);
      top = D(wL, '#fff') + `<path d="M40,40 Q70,54 96,82 M30,50 Q66,62 92,86" stroke="${INK}" stroke-width="2" fill="none"/>` + D(wR, '#fff') + `<path d="M260,40 Q230,54 204,82 M270,50 Q234,62 208,86" stroke="${INK}" stroke-width="2" fill="none"/>` + D(dome, '#cdbf9e') + HF(dome, 'hA') + D(brim, '#cdbf9e') + HF(brim, 'hB');
    } else if (kind === 'jupiter') {
      const hair = 'M80,142 C64,80 104,48 150,48 C196,48 236,80 220,142 C210,110 196,96 150,94 C104,96 90,110 80,142 Z';
      const beard = 'M86,170 C86,240 116,282 150,286 C184,282 214,240 214,170 C200,196 180,206 150,206 C120,206 100,196 86,170 Z';
      sil += P(hair) + P(beard);
      let curls = ''; for (let i = 0; i < 9; i++) { const x = 98 + i * 13, y = 214 + (i % 2) * 22; curls += `M${x},${y} q8,-10 14,0 q-2,12 -12,8`; }
      for (let i = 0; i < 6; i++) { const x = 112 + i * 15, y = 252 + (i % 2) * 10; curls += `M${x},${y} q8,-10 14,0 q-2,12 -12,8`; }
      top = D(hair, '#efe7d5') + HF(hair, 'hD') + D(beard, '#efe7d5') + clipG(id + 'b', beard, `<rect x="150" y="160" width="80" height="140" fill="url(#hA)"/>`) + `<path d="${curls}" stroke="${INK}" stroke-width="2.4" fill="none"/>`;
      const bolt = 'M250,40 L214,128 L240,126 L216,214 L282,104 L254,108 L276,40 Z';
      sil += P(bolt); top += D(bolt, YEL, 3.5);
      feat = astroFeatures({ my: 198 });
    } else if (kind === 'venus') {
      const hair = 'M78,170 C58,84 100,52 150,52 C200,52 242,84 222,170 C214,128 198,104 150,102 C102,104 86,128 78,170 Z';
      const bun = 'M118,58 C112,20 188,20 182,58 Z';
      const lockL = 'M80,150 C64,190 74,230 92,252 C90,220 96,190 96,160 Z', lockR = 'M220,150 C236,190 226,230 208,252 C210,220 204,190 204,160 Z';
      sil += P(hair) + P(bun) + P(lockL) + P(lockR);
      top = D(bun, '#8a5a30') + HF(bun, 'hA') + D(hair, '#8a5a30') + HF(hair, 'hD') + D(lockL, '#8a5a30') + D(lockR, '#8a5a30') + `<path d="M98,120 Q120,96 150,104 M202,120 Q180,96 150,104" stroke="${FIG}" stroke-width="2.4" fill="none" opacity=".7"/>`;
      let fl = ''; for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; fl += `<circle cx="${f1(206 + Math.cos(a) * 12)}" cy="${f1(80 + Math.sin(a) * 12)}" r="9" fill="${PINK}" stroke="${INK}" stroke-width="2.4"/>`; }
      top += fl + `<circle cx="206" cy="80" r="7" fill="${YEL}" stroke="${INK}" stroke-width="2.4"/>`;
      let pr = ''; for (let k = 0; k < 9; k++) pr += `<circle cx="${112 + k * 9.5}" cy="${f1(256 + Math.sin(k / 8 * Math.PI) * 12)}" r="5.5" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
      top += pr;
      feat = astroFeatures().replace('class="mN"><path d="M130,205 q20,9 40,0" stroke="#2B2118"', 'class="mN"><path d="M130,205 q20,9 40,0" stroke="#B23A48"');
    } else if (kind === 'saturno') {
      const hood = 'M70,190 C56,90 100,44 150,44 C200,44 244,90 230,190 L214,190 C214,120 190,96 150,96 C110,96 86,120 86,190 Z';
      const beard = 'M90,176 C90,252 124,292 150,298 C176,292 210,252 210,176 C196,200 176,208 150,208 C124,208 104,200 90,176 Z';
      sil += P(hood) + P(beard);
      let st = ''; for (let i = 0; i < 16; i++) { const x = 98 + i * 7; st += `M${x},${f1(204 + Math.abs(i - 8) * 1.5)} q${(i % 3) - 1},40 ${(i % 2 ? 3 : -3)},${70 - Math.abs(i - 8) * 5}`; }
      top = D(hood, '#7d6f5e') + HF(hood, 'hD') + D(beard, '#e9e4da') + `<path d="${st}" stroke="${INK}" stroke-width="2" fill="none"/>`;
      const handle = limb(262, 300, 246, 120, 6, 5), blade = 'M246,124 C200,60 210,10 268,6 C240,30 236,70 262,118 Z';
      sil += P(handle) + P(blade);
      top += D(handle, WOOD) + HF(handle, 'hA') + D(blade, '#d9d4c6') + HF(blade, 'hB');
      feat = astroFeatures({ my: 198 });
    }
  }
  return `${cut(sil, 7, 9)}${s}${top + feat}`;
}
const ASTRO_NAMES = { sol: 'Sol', luna: 'Luna', marte: 'Marte', mercurio: 'Mercurio', jupiter: 'Júpiter', venus: 'Venus', saturno: 'Saturno' };
const WEEK = ['luna', 'marte', 'mercurio', 'jupiter', 'venus', 'saturno', 'sol'];
const ABBR = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];
function mkAstro(parent, x, y, sz, kind) {
  const a = mk(parent, [x, y, sz, sz], astroInner(kind), '0 0 300 300', 'astro');
  const q = s => a.d.querySelector(s);
  a.mN = q('.mN'); a.mS = q('.mS'); a.mO = q('.mO'); a.wink = q('.wink'); a.kind = kind;
  return a;
}
function astroFace(a, t, o = {}) {
  const lk = o.look || [0, 0]; a.pup.forEach(q => q.setAttribute('transform', `translate(${f1(lk[0])} ${f1(lk[1])})`));
  const bl = o.blink !== false && (((t + (o.seed || 0)) % 3.1) < 0.12);
  a.lidC.style.opacity = (o.closed || (bl && !o.wink)) ? 1 : 0;
  a.wink.style.opacity = o.wink ? 1 : 0;
  a.brow.setAttribute('transform', `translate(0 ${f1(-(o.brow || 0))})`);
  const m = o.smile ? 'S' : o.oh ? 'O' : 'N';
  a.mS.style.opacity = m === 'S' ? 1 : 0; a.mO.style.opacity = m === 'O' ? 1 : 0; a.mN.style.opacity = m === 'N' ? 1 : 0;
}

/* ---------- calendario de pared (HTML) ---------- */
function mkCal(parent, x, y, w, n, o = {}) {
  const pad = 20, gap = o.gap || (n > 7 ? 8 : 12), hh = o.hh || 96, ch = o.ch || 300;
  const H = hh + ch + pad * 2 + 10;
  const wrap = box(parent, x, y, w, H, { zIndex: o.z || 5 });
  const sh = box(wrap, 10, 12, w, H, { background: SH, borderRadius: '18px' });
  const paperB = box(wrap, 0, 0, w, H, { background: '#FBF6EA', border: `5px solid ${INK}`, borderRadius: '18px', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.05) 0 2px, transparent 2px 22px)' });
  const hdr = box(wrap, 12, 12, w - 24, hh, { background: INK, borderRadius: '10px', color: YEL, fontFamily: 'Rye', fontSize: px(o.titleSize || 54), textAlign: 'center', lineHeight: px(hh), whiteSpace: 'nowrap', letterSpacing: '0.06em' }, o.title || 'SEMANA');
  [0.2, 0.8].forEach(fx => { box(wrap, w * fx - 16, -34, 32, 60, { border: `7px solid ${BRASS}`, borderRadius: '16px', boxShadow: `0 0 0 3px ${INK}` }); });
  const cw = (w - pad * 2 - gap * (n - 1)) / n, cells = [];
  for (let i = 0; i < n; i++) {
    const cx = pad + i * (cw + gap), cy = hh + pad + 10;
    const e = box(wrap, cx, cy, cw, ch, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '10px', overflow: 'hidden' });
    const fill = box(e, 0, 0, cw - 8, ch - 8, { background: 'transparent' });
    const lab = el('div', e, { left: 0, top: '6px', width: px(cw - 8), textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: px(o.labSize || Math.min(34, cw * 0.3)), color: INK, whiteSpace: 'nowrap' }, (o.labels || [])[i] || '');
    box(e, 0, (o.labSize || Math.min(34, cw * 0.3)) * 1.35 + 8, cw - 8, 3, { background: INK });
    const num = el('div', e, { left: 0, top: px(o.numTop != null ? o.numTop : ch * 0.42), width: px(cw - 8), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(o.numSize || Math.min(90, cw * 0.62)), lineHeight: 1, color: INK }, o.nums === false ? '' : String(i + 1));
    cells.push({ e, fill, lab, num, cx: x + cx + cw / 2, cy: y + cy + ch / 2, w: cw, h: ch, lx: cx, ly: cy });
  }
  return { wrap, cells, hdr, H, w };
}

/* ---------- astrónomo antiguo (busto con barba y gorro) viewBox 0 0 360 460 ---------- */
function astronomerInner() {
  let s = bustInner({ uniform: 'farmer', seed: 9 });
  const robe = 'M28,460 C32,384 80,338 140,328 L220,328 C280,338 328,384 332,460 Z';
  let dots = ''; [[80, 420], [120, 380], [270, 400], [300, 440], [230, 440], [96, 448]].forEach(q => dots += `<path d="M${q[0]},${q[1] - 9} l3,6 7,1 -5,5 1,7 -6,-3 -6,3 1,-7 -5,-5 7,-1 Z" fill="${YEL}" stroke="${INK}" stroke-width="1.5"/>`);
  s += `<path d="${robe}" fill="#4B3E5E" stroke="${INK}" stroke-width="3"/><path d="${robe}" fill="url(#hA)" opacity=".5"/>${dots}`;
  const beard = 'M128,262 C118,330 150,392 180,418 C210,392 242,330 232,262 C214,290 198,300 180,300 C162,300 146,290 128,262 Z';
  let st = ''; for (let i = 0; i < 14; i++) { const x = 136 + i * 7.5; st += `M${x},${290 + Math.abs(i - 7) * 2} q${(i % 3) - 1},50 ${(i % 2 ? 4 : -4)},${110 - Math.abs(i - 7) * 9}`; }
  s += cut(P(beard), 4, 6) + D(beard, '#F1ECE2') + `<path d="${st}" stroke="${INK}" stroke-width="2" fill="none"/>`;
  s += `<path d="M150,270 q30,-14 60,0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  const hat = 'M104,166 L188,-40 L262,166 Z', brim = 'M80,166 Q180,142 280,166 Q180,192 80,166 Z';
  let hs = ''; [[170, 40], [200, 90], [150, 120], [226, 140], [184, 10]].forEach(q => hs += `<path d="M${q[0]},${q[1] - 10} l3,7 8,1 -6,5 2,8 -7,-4 -7,4 2,-8 -6,-5 8,-1 Z" fill="${YEL}" stroke="${INK}" stroke-width="1.6"/>`);
  s += cut(P(hat) + P(brim)) + D(hat, '#4B3E5E') + HF(hat, 'hA') + hs + `<path d="M176,60 a14,14 0 1,0 18,18 a12,12 0 1,1 -18,-18 Z" fill="#fff" stroke="${INK}" stroke-width="2"/>` + D(brim, '#3a3049') + HF(brim, 'hB');
  return s;
}
/* astrolabio viewBox 0 0 260 300 */
function astrolabeInner() {
  let s = cut('<circle cx="130" cy="170" r="118"/><circle cx="130" cy="40" r="24"/>');
  s += `<circle cx="130" cy="40" r="22" fill="none" stroke="${INK}" stroke-width="12"/><circle cx="130" cy="40" r="22" fill="none" stroke="${BRASS}" stroke-width="7"/>`;
  s += `<circle cx="130" cy="170" r="116" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><circle cx="130" cy="170" r="116" fill="url(#hA)" opacity=".35"/><circle cx="130" cy="170" r="96" fill="#E8D7A8" stroke="${INK}" stroke-width="3"/>`;
  let tk = ''; for (let k = 0; k < 48; k++) { const a = k / 48 * Math.PI * 2, r1 = k % 4 ? 104 : 98; tk += `M${f1(130 + Math.cos(a) * r1)},${f1(170 + Math.sin(a) * r1)}L${f1(130 + Math.cos(a) * 114)},${f1(170 + Math.sin(a) * 114)}`; }
  s += `<path d="${tk}" stroke="${INK}" stroke-width="2"/>`;
  s += `<circle cx="130" cy="170" r="60" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="4 5"/><path d="M34,170 H226 M130,74 V266" stroke="${INK}" stroke-width="1.6"/>`;
  s += `<g class="rete"><circle cx="130" cy="150" r="70" fill="none" stroke="${INK}" stroke-width="5"/><circle cx="130" cy="150" r="70" fill="none" stroke="${BRASS}" stroke-width="2.5"/>`;
  [[0, 70], [70, 60], [150, 74], [220, 66], [290, 58]].forEach(q => { const a = q[0] * Math.PI / 180; s += `<path d="M130,170 L${f1(130 + Math.cos(a) * q[1])},${f1(170 + Math.sin(a) * q[1])}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><circle cx="${f1(130 + Math.cos(a) * q[1])}" cy="${f1(170 + Math.sin(a) * q[1])}" r="6" fill="${PINK}" stroke="${INK}" stroke-width="2"/>`; });
  s += `</g><g class="alid"><rect x="20" y="164" width="220" height="12" rx="4" fill="${INK}"/><rect x="40" y="152" width="10" height="34" fill="${BRASS}" stroke="${INK}" stroke-width="2"/><rect x="210" y="152" width="10" height="34" fill="${BRASS}" stroke="${INK}" stroke-width="2"/></g><circle cx="130" cy="170" r="9" fill="${INK}"/>`;
  return s;
}
/* trabajador con gorro frigio (busto) viewBox 0 0 360 460 */
function workerInner(seed = 31, o = {}) {
  let s = bustInner({ uniform: 'farmer', beard: !!o.beard, moustache: !!o.moustache, seed });
  const cap = 'M108,176 C92,96 140,56 200,64 C252,70 286,110 270,150 C262,128 246,118 232,126 C246,140 254,160 252,176 Z';
  s += cut(P(cap), 5, 6) + D(cap, RED) + clipG(uid('cp'), cap, `<rect x="90" y="40" width="200" height="140" fill="url(#hA)" opacity=".55"/>`) + `<path d="M110,170 Q180,150 252,170" stroke="${INK}" stroke-width="3" fill="none"/>`;
  s += `<circle cx="128" cy="150" r="17" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="128" cy="150" r="10" fill="${INK}"/><circle cx="128" cy="150" r="5" fill="${RED}"/>`;
  // cansancio: párpados a media asta + ojeras + gota
  s += `<g class="tired"><path d="M142,204 A14,11 0 0,1 170,204 Z" fill="${FIG}" stroke="${INK}" stroke-width="2.6"/><path d="M190,204 A14,11 0 0,1 218,204 Z" fill="${FIG}" stroke="${INK}" stroke-width="2.6"/><path d="M144,220 q12,7 24,0 M192,220 q12,7 24,0" stroke="#6b4a6a" stroke-width="3" fill="none"/></g>`;
  s += `<g class="drop"><path d="M246,150 q10,16 0,24 q-10,-8 0,-24 Z" fill="#BFE3F5" stroke="${INK}" stroke-width="2.4"/></g>`;
  s += `<g class="tears" style="opacity:0"><path d="M150,212 C142,250 146,300 140,340 L156,340 C158,300 160,250 160,212 Z M210,212 C218,250 214,300 220,340 L204,340 C202,300 200,250 200,212 Z" fill="#BFE3F5" stroke="${INK}" stroke-width="2.4"/></g>`;
  s += `<g class="sadM" style="opacity:0"><path d="M152,256 Q180,236 208,256 Q180,250 152,256 Z" fill="#160f0a" stroke="${INK}" stroke-width="3"/><rect x="128" y="236" width="104" height="70" fill="${FIG}"/><path d="M150,282 Q180,252 210,282" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M158,280 Q180,262 202,280 Q180,292 158,280 Z" fill="#160f0a"/></g>`;
  s += `<g class="fakeM" style="opacity:0"><rect x="128" y="236" width="104" height="70" fill="${FIG}"/><path d="M146,264 Q180,286 214,264" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M150,268 h60" stroke="#fff" stroke-width="5"/><path d="M146,264 l-6,-6 M214,264 l6,-6" stroke="${INK}" stroke-width="3"/></g>`;
  return s;
}
function mkWorker(parent, b, seed, o) {
  const f = mk(parent, b, workerInner(seed, o), '0 0 360 460', 'bust');
  const q = s => f.d.querySelector(s); f.tired = q('.tired'); f.drop = q('.drop'); f.tears = q('.tears'); f.sadM = q('.sadM'); f.fakeM = q('.fakeM');
  return f;
}
/* Napoleón (bicornio) viewBox 0 0 360 460 */
function napoleonInner() {
  let s = bustInner({ uniform: 'officer', seed: 12 });
  s += `<path d="M150,228 q30,10 60,0" stroke="${INK}" stroke-width="0" fill="none"/>`;
  s += `<path d="M168,150 q-6,24 8,30" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  const bic = 'M20,170 C56,82 120,58 180,58 C240,58 304,82 340,170 C282,140 230,132 180,132 C130,132 78,140 20,170 Z';
  s += cut(P(bic)) + D(bic, '#1e1712') + clipG(uid('bc'), bic, `<rect x="0" y="40" width="360" height="140" fill="url(#hW)" opacity=".25"/>`);
  s += `<path d="M24,166 C80,138 130,128 180,128 C230,128 280,138 336,166" stroke="${BRASS}" stroke-width="6" fill="none"/>`;
  s += `<circle cx="180" cy="98" r="24" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="180" cy="98" r="16" fill="${RED}" stroke="${INK}" stroke-width="2"/><circle cx="180" cy="98" r="7" fill="#fff"/>`;
  s += `<path class="angry" d="M136,182 L174,194 M224,182 L186,194" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
  return s;
}
/* hamaca entre dos postes viewBox 0 0 640 400 */
function hammockBack() {
  return `${cut('<rect x="20" y="40" width="26" height="360" rx="6"/><rect x="594" y="40" width="26" height="360" rx="6"/>', 6, 7)}<rect x="20" y="40" width="26" height="360" rx="6" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><rect x="20" y="40" width="26" height="360" fill="url(#hA)" opacity=".5"/><rect x="594" y="40" width="26" height="360" rx="6" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><rect x="594" y="40" width="26" height="360" fill="url(#hA)" opacity=".5"/>
  <path d="M46,90 L120,170 M46,90 L130,190 M594,90 L520,170 M594,90 L510,190" stroke="${INK}" stroke-width="3"/>`;
}
function hammockFront() {
  const hm = 'M110,170 C200,330 440,330 530,170 L530,196 C440,360 200,360 110,196 Z';
  let net = ''; for (let k = 0; k < 12; k++) { const x = 130 + k * 34; net += `M${x},${f1(196 + Math.sin(k / 11 * Math.PI) * 140)}l14,14`; }
  return `${cut(P(hm), 5, 7)}<path d="${hm}" fill="${PINK}" stroke="${INK}" stroke-width="4"/><path d="${hm}" fill="url(#hB)" opacity=".35"/><path d="M110,182 C200,344 440,344 530,182" stroke="#fff" stroke-width="5" fill="none" stroke-dasharray="14 10"/>`;
}
/* gorro frigio grande viewBox 0 0 420 380 */
function phrygianBig() {
  const cap = 'M40,330 C20,180 110,60 240,60 C340,60 400,140 380,220 C360,180 320,160 290,180 C320,220 340,280 340,330 Z';
  const band = 'M30,310 Q190,280 350,310 L350,360 Q190,330 30,360 Z';
  let s = cut(P(cap) + P(band)) + D(cap, RED) + clipG(uid('pc'), cap, `<rect x="0" y="40" width="420" height="320" fill="url(#hA)" opacity=".55"/><path d="M60,300 C80,180 160,100 260,90 M120,320 C130,220 200,150 300,140" stroke="${INK}" stroke-width="3" fill="none"/>`);
  s += D(band, '#F7F0E0') + HF(band, 'hB');
  s += `<circle cx="96" cy="250" r="48" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="96" cy="250" r="34" fill="${RED}" stroke="${INK}" stroke-width="3"/><circle cx="96" cy="250" r="18" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="96" cy="250" r="7" fill="${INK}"/>`;
  return s;
}
/* compás + regla viewBox 0 0 300 360 */
function compassInner() {
  const l1 = limb(150, 40, 70, 330, 12, 6), l2 = limb(150, 40, 230, 330, 12, 6);
  let s = cut(P(l1) + P(l2) + '<circle cx="150" cy="40" r="26"/>');
  s += D(l1, BRASS) + HF(l1, 'hA') + D(l2, BRASS) + HF(l2, 'hD') + `<circle cx="150" cy="40" r="24" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><circle cx="150" cy="40" r="8" fill="${INK}"/><path d="M150,16 v-16" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`;
  return s;
}
