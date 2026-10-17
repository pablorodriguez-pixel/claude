/* Einstein de grabado (copiado de ep10_einstein/ein_figs.js) */
/* ---------- EINSTEIN (busto de grabado, viewBox 0 0 360 460) ---------- */
function einsteinInner(o = {}) {
  const young = !!o.young, r = rng(o.seed || 1905), id = uid('ei');
  const HAIR = young ? '#3a2a1e' : '#F4F0E6', HAIRL = young ? '#6b5a4a' : INK;
  // melena alocada (detrás de la cabeza)
  const N = young ? 40 : 54, pts = [];
  const cx = 180, cy = young ? 182 : 186, rx = young ? 86 : 124, ry = young ? 72 : 108;
  for (let i = 0; i < N; i++) {
    const a = Math.PI * 2 * i / N, up = Math.max(0, -Math.sin(a));
    const sp = i % 2 ? 1 + (young ? 0.05 : 0.12 + 0.12 * up) + r() * (young ? 0.04 : 0.12) : 0.9 + r() * 0.05;
    pts.push([cx + Math.cos(a + (r() - .5) * 0.05) * rx * sp, cy + Math.sin(a) * ry * sp]);
  }
  const mane = 'M' + pts.map(q => f1(q[0]) + ',' + f1(q[1])).join('L') + 'Z';
  let st = '';
  for (let k = 0; k < (young ? 26 : 70); k++) {
    const a = r() * Math.PI * 2, r0 = 0.62 + r() * 0.2, r1 = 0.92 + r() * 0.16, bend = (r() - .5) * 0.5;
    const x0 = cx + Math.cos(a) * rx * r0, y0 = cy + Math.sin(a) * ry * r0, x1 = cx + Math.cos(a + bend * 0.3) * rx * r1, y1 = cy + Math.sin(a + bend * 0.3) * ry * r1;
    const xm = cx + Math.cos(a + bend) * rx * (r0 + r1) / 2, ym = cy + Math.sin(a + bend) * ry * (r0 + r1) / 2;
    st += `M${f1(x0)},${f1(y0)}Q${f1(xm)},${f1(ym)} ${f1(x1)},${f1(y1)}`;
  }
  let s = cut(P(mane), 6, 8) + D(mane, HAIR, 3.5) + clipG(id + 'm', mane, `<ellipse cx="${cx + 60}" cy="${cy + 40}" rx="${rx * 0.8}" ry="${ry * 0.9}" fill="url(#hA)" opacity="${young ? 0.5 : 0.75}"/>`);
  s += `<path d="${st}" stroke="${HAIRL}" stroke-width="${young ? 1.8 : 2.2}" fill="none" stroke-linecap="round" opacity="${young ? .6 : .85}"/>`;
  // busto base (sin las cejas finas del kit)
  s += bustInner({ uniform: 'soldier', seed: young ? 61 : 62 }).replace(/<path class="brow"[^>]*\/>/, '');
  s += coatOver(young ? '#3a2f26' : '#6b5a4a');
  s += `<path d="M172,336 L188,336 L194,420 L180,438 L166,420 Z" fill="${young ? RED : INK}" stroke="${INK}" stroke-width="2.5"/>`;
  // flequillo / línea del pelo
  const cap = young ? 'M124,184 C116,140 146,120 180,120 C214,120 244,140 236,184 C228,164 212,152 196,156 C186,146 172,146 162,158 C148,154 132,164 124,184 Z'
    : 'M122,178 C116,138 142,118 180,118 C218,118 244,138 238,178 C232,160 220,150 206,152 C196,140 166,140 154,152 C142,150 128,162 122,178 Z';
  s += D(cap, HAIR, 3) + `<path d="M140,150 q-6,-26 -24,-38 M160,140 q-2,-28 -14,-44 M184,136 q4,-30 -2,-52 M206,140 q12,-26 10,-48 M226,152 q18,-20 26,-40" stroke="${INK}" stroke-width="${young ? 0 : 2.4}" fill="none" stroke-linecap="round"/>`;
  // arrugas y ojeras
  if (!young) s += `<path d="M142,218 q14,8 28,0 M190,218 q14,8 28,0 M146,226 q-10,14 -6,30 M214,226 q10,14 6,30" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>`;
  // cejas pobladas (móviles)
  const brow = `<path d="M132,192 Q138,170 158,170 Q176,172 180,188 Q162,180 132,192 Z" fill="${HAIR}" stroke="${INK}" stroke-width="2.6"/><path d="M140,184 l6,-8 M150,180 l4,-9 M160,179 l3,-8 M170,181 l2,-7" stroke="${INK}" stroke-width="1.6"/>`;
  s += `<g class="browL">${brow}</g><g class="browR"><g transform="translate(360,0) scale(-1,1)">${brow}</g></g>`;
  // bigote
  if (!young) {
    const m = 'M180,232 C166,224 144,224 132,236 C122,246 122,260 132,266 C142,258 156,254 168,256 C174,257 178,258 180,258 Z';
    const ms = `<path d="${m}" fill="${HAIR}" stroke="${INK}" stroke-width="2.8"/><path d="M134,250 l-2,12 M142,246 l-1,13 M150,244 l0,12 M158,243 l1,12 M166,244 l1,11 M174,246 l0,10" stroke="${INK}" stroke-width="1.7"/>`;
    s += ms + `<g transform="translate(360,0) scale(-1,1)">${ms}</g>`;
  }
  // rubor de enfado + gota de sudor
  s += `<g class="mad" style="opacity:0"><ellipse cx="136" cy="232" rx="16" ry="9" fill="${RED}" opacity=".35"/><ellipse cx="224" cy="232" rx="16" ry="9" fill="${RED}" opacity=".35"/><path d="M248,128 l14,-14 M262,140 l18,-6 M252,112 l4,-18" stroke="${RED}" stroke-width="6" stroke-linecap="round"/></g>`;
  s += `<g class="sweat" style="opacity:0"><path d="M246,150 Q232,174 246,184 Q260,174 246,150 Z" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M242,172 q2,6 6,6" stroke="${INK}" stroke-width="1.5" fill="none"/></g>`;
  // dedo levantado
  const sl = limb(318, 470, 306, 300, 30, 24), fg = limb(306, 262, 304, 186, 10, 9);
  s += `<g class="fing" style="opacity:0">${cut(P(sl) + `<circle cx="306" cy="276" r="26"/>` + P(fg) + `<circle cx="304" cy="186" r="9"/>`, 5, 7)}${D(sl, young ? '#3a2f26' : '#6b5a4a')}${HF(sl, 'hD')}<path d="M282,312 L332,312" stroke="#fff" stroke-width="10"/><path d="M282,312 L332,312" stroke="${INK}" stroke-width="2"/>${D(fg, FIG, 3)}<circle cx="304" cy="186" r="9" fill="${FIG}" stroke="${INK}" stroke-width="3"/><circle cx="306" cy="276" r="26" fill="${FIG}" stroke="${INK}" stroke-width="3"/><path d="M286,270 q20,-6 40,0 M288,284 q18,-6 36,0" stroke="${INK}" stroke-width="2" fill="none"/></g>`;
  return s;
}
function mkEin(pa, b, o = {}) {
  const f = mk(pa, b, einsteinInner(o), '0 0 360 460', 'bust'); const q = s => f.d.querySelector(s);
  f.fing = q('.fing'); f.mad = q('.mad'); f.sweat = q('.sweat'); return f;
}
function einFace(f, t, o = {}) {
  face(f, t, o);
  const a = o.ang || 0;
  f.browL.setAttribute('transform', `translate(0 ${f1(-(o.bL || 0))}) rotate(${f1(a)} 156 182)`);
  f.browR.setAttribute('transform', `translate(0 ${f1(-(o.bR || 0))}) rotate(${f1(-a)} 204 182)`);
  f.fing.style.opacity = o.finger ? 1 : 0; f.mad.style.opacity = o.mad ? 1 : 0; f.sweat.style.opacity = o.sweat ? 1 : 0;
}

function chalkboard(pa, x, y, w, h, z = 3) {
  const d = box(pa, x, y, w, h, { zIndex: z });
  d.innerHTML = `<svg width="${w}" height="${h}" style="overflow:visible">${cut(`<rect x="0" y="0" width="${w}" height="${h}" rx="18"/>`)}<rect x="0" y="0" width="${w}" height="${h}" rx="18" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><rect x="0" y="0" width="${w}" height="${h}" rx="18" fill="url(#hW)" opacity=".3"/><rect x="26" y="26" width="${w - 52}" height="${h - 52}" rx="8" fill="#2f3530" stroke="${INK}" stroke-width="5"/><path d="M60,${h - 70} q120,-20 240,4 M${w - 340},80 q100,10 260,-6" stroke="#fff" stroke-width="3" opacity=".12" fill="none"/><rect x="${w * 0.6}" y="${h - 12}" width="70" height="16" rx="4" fill="#fff" stroke="${INK}" stroke-width="3"/></svg>`;
  return d;
}
const chalk = (pa, x, y, html, sz = 90, css = {}) => el('div', pa, Object.assign({ left: px(x), top: px(y), fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 700, fontSize: px(sz), lineHeight: 1, color: '#F4F1E8', whiteSpace: 'nowrap', zIndex: 6, textShadow: '2px 2px 0 rgba(255,255,255,.18)' }, css), html);
const SCRIB = `<svg viewBox="0 0 300 300" width="100%" height="100%" style="overflow:visible"><path class="sc" pathLength="1000" d="M30,80 L270,60 L40,140 L280,120 L30,200 L260,190 L50,250 L250,250" stroke="${INK}" stroke-width="30" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1000" stroke-dashoffset="1000"/></svg>`;
