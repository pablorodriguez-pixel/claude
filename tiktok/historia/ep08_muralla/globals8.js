/* ======== Ep. 8 · v2 — TODO clavado por TEXTO a words.js ========
   T(x): las escenas conservan como referencia los tiempos de la locución v1; cada línea del guion se
   localiza en la voz nueva con find() y x se desplaza con ella (dentro de una línea, el ritmo es el mismo). */
const RMAP = [
  [0.16, 'la gran muralla china no se ve'], [5.50, 'ese dato que te'], [12.06, 'la muralla es larguisima'],
  [19.49, 'y ademas es del mismo color'], [23.88, 'en dos mil tres yang'], [31.89, 'lo curioso es que el mito'],
  [40.07, 'desde la luna por cierto'], [46.66, 'ojo con camaras'], [55.51, 'o sea una de las mayores'],
].map(([v1, ph]) => [v1, w(ph)]);
function T(x) { let a = RMAP[0]; for (const r of RMAP) if (r[0] <= x + 0.5) a = r; return a[1] + (x - a[0]); }
/* anclas del tramo nuevo (pregunta SÍ/NO, firma en el balcón, libro, bucle) */
const K = {};
{
  const iq = find('te lo creias'); K.te = w(iq); K.creias = w(iq + 2);
  const is = find('si o no', iq); K.si = w(is); K.noB = w(is + 2); K.qEnd = we(is + 2);
  const iv = find('soy tu vecino'); K.isoy = iv; K.soy = w(iv); K.vecino = w(iv + 2); K.vecE = we(iv + 2);
  const ie = find('y esto no venia en el libro', iv); K.iye = ie; K.y = w(ie); K.esto = w(ie + 1); K.noV = w(ie + 2); K.libro = w(ie + 6); K.END = we(ie + 6);
}
const DUR = K.END + 0.6, LOOP = DUR - 0.4;
/* ======== Ep. 8 · globales: Vecino en su óvalo + utilidades ======== */
const DARK = { color: PAPER, keyColor: YEL, hlc: 'rgba(0,0,0,0)', shadow: `4px 4px 0 ${INK}` };
function pathLen(pe) { return pe.getTotalLength(); }
function reveal(pe, L, k) { pe.setAttribute('stroke-dasharray', `${f1(L)} ${f1(L + 20)}`); pe.setAttribute('stroke-dashoffset', f1(L * (1 - clamp(k)))); }
function bubble(parent, x, y, w, html, o = {}) {
  const b = el('div', parent, { left: px(x), top: px(y), width: w ? px(w) : 'auto', background: o.bg || '#fff', border: `5px solid ${INK}`, borderRadius: o.rad || '40px', padding: o.pad || '16px 30px 20px', fontFamily: o.font || 'Playfair', fontStyle: o.italic ? 'italic' : 'normal', fontWeight: o.weight || 800, fontSize: px(o.size || 50), lineHeight: 1.1, color: o.color || INK, boxShadow: `7px 8px 0 ${SH}`, textAlign: 'center', whiteSpace: o.wrap ? 'normal' : 'nowrap', zIndex: o.z || 40 }, html);
  // cola
  const tl = el('div', b, { left: px(o.tailX == null ? 60 : o.tailX), top: o.tailUp ? '-40px' : 'calc(100% - 2px)', width: '50px', height: '44px' });
  tl.innerHTML = `<svg width="50" height="44" style="overflow:visible"><path d="${o.tailUp ? 'M6,44 L20,0 L40,44' : 'M6,0 L20,40 L40,0'}" fill="${o.bg || '#fff'}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="${o.tailUp ? 'M2,46 H46' : 'M2,-3 H46'}" stroke="${o.bg || '#fff'}" stroke-width="8"/></svg>`;
  return b;
}
function checkRow(parent, x, y, txt, ok, o = {}) {
  const r = box(parent, x, y, o.w || 340, 64, { zIndex: 5 });
  const ic = box(r, 0, 4, 54, 54, { borderRadius: '50%', background: ok ? YEL : '#fff', border: `4px solid ${INK}` }); ic.innerHTML = ok ? `<div style="position:absolute;left:8px;top:8px;width:30px;height:30px">${CHECK}</div>` : `<div style="position:absolute;left:4px;top:4px;width:38px;height:38px">${XSVG}</div>`;
  el('div', r, { left: '72px', top: '2px', fontFamily: 'Playfair', fontWeight: 800, fontSize: px(o.size || 44), color: INK, whiteSpace: 'nowrap', textDecoration: ok ? 'none' : 'line-through', textDecorationColor: RED, textDecorationThickness: '5px' }, txt);
  return r;
}

/* =================== EL VECINO en su marco ovalado =================== */
const OV = { x: 40, y: 962, w: 330, h: 362 };
const ovalW = box(world, OV.x, OV.y, OV.w, OV.h, { zIndex: 850 });
const ovIn = box(ovalW, 16, 16, OV.w - 32, OV.h - 32, { borderRadius: '50%', overflow: 'hidden', background: `repeating-linear-gradient(90deg, #F4CFDA 0 16px, #F9E3EA 16px 32px)` });
box(ovIn, 0, 0, OV.w - 32, OV.h - 32, { background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,.5), rgba(120,40,60,.25) 90%)' });
const vecO = mkVec(ovIn, [-48, -18, 396, 490]);
const ovFrame = box(ovalW, -20, -36, OV.w + 40, OV.h + 80);
{
  const cx = (OV.w + 40) / 2, cy = 36 + OV.h / 2, rx = OV.w / 2 - 4, ry = OV.h / 2 - 4;
  let beads = ''; for (let k = 0; k < 40; k++) { const a = k / 40 * Math.PI * 2; beads += `<circle cx="${f1(cx + Math.cos(a) * (rx + 2))}" cy="${f1(cy + Math.sin(a) * (ry + 2))}" r="4.5" fill="#f3d27a" stroke="${INK}" stroke-width="1.5"/>`; }
  ovFrame.innerHTML = `<svg width="${OV.w + 40}" height="${OV.h + 80}" style="overflow:visible">
  <ellipse cx="${cx + 8}" cy="${cy + 10}" rx="${rx + 14}" ry="${ry + 14}" fill="none" stroke="${SH}" stroke-width="26"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 14}" ry="${ry + 14}" fill="none" stroke="#fff" stroke-width="34"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="${INK}" stroke-width="24"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="${BRASS}" stroke-width="17"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="url(#hA)" stroke-width="17" opacity=".6"/>${beads}
  <ellipse cx="${cx}" cy="${cy}" rx="${rx - 8}" ry="${ry - 8}" fill="none" stroke="${INK}" stroke-width="3"/>
  <g transform="translate(${cx},24)"><path d="M-46,22 C-40,-6 -14,-12 0,-24 C14,-12 40,-6 46,22 Z" fill="${BRASS}" stroke="${INK}" stroke-width="3.5"/><circle cx="0" cy="2" r="9" fill="${PINK}" stroke="${INK}" stroke-width="3"/><path d="M-30,16 q30,-14 60,0" stroke="${INK}" stroke-width="2" fill="none"/></g>
  <g transform="translate(${cx},${OV.h + 60})"><rect x="-104" y="-26" width="208" height="46" rx="10" fill="${INK}" stroke="${BRASS}" stroke-width="4"/><text x="0" y="8" text-anchor="middle" font-family="Rye" font-size="25" fill="${YEL}">EL VECINO</text></g></svg>`;
}
const CX = -41, CY = 45;
// [t, x, y, s, r, o]
const OVK = [
  [0, CX, CY, 0.75, 0, 1],
  [T(30.54), CX, CY, 0.75, 0, 1], [T(30.55), CX, CY, 0.75, 0, 0], [T(31.85), CX, CY, 0.75, 0, 0], [T(31.86), CX, CY, 0.45, 0, 1], [T(32.2), CX, CY, 0.75, 0, 1],
  [T(46.5), CX, CY, 0.75, 0, 1], [T(46.75), 10, -30, 0.95, -3, 1], [T(47.6), 10, -30, 0.95, -3, 1], [T(47.85), CX, CY, 0.75, 0, 1],
  [T(60.49), CX, CY, 0.75, 0, 1], [T(60.5), CX, CY, 0.75, 0, 0],
];
function ovalState(t) {
  if (t <= OVK[0][0]) return OVK[0];
  for (let i = 0; i < OVK.length - 1; i++) {
    const a = OVK[i], b = OVK[i + 1];
    if (t >= a[0] && t < b[0]) { const k = (b[0] - a[0]) < 0.02 ? 0 : (b[2] !== a[2] || b[1] !== a[1] || b[3] !== a[3] ? E.inOutCubic(clamp((t - a[0]) / (b[0] - a[0]))) : 0); const pk = b[3] > a[3] && a[3] < 0.7 ? E.outBack(clamp((t - a[0]) / (b[0] - a[0]))) : k; return [t, lerp(a[1], b[1], k), lerp(a[2], b[2], k), lerp(a[3], b[3], pk), lerp(a[4], b[4], k), a[5]]; }
  }
  return OVK[OVK.length - 1];
}
const LAUGH = [[T(23.0), T(23.75)], [T(60.0), T(60.45)]];
function updOval(t) {
  const st = ovalState(t);
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st[1], y: st[2] + shk + wobble(t, 0.5, 2), s: st[3], r: st[4] + (inL ? Math.sin(t * 20) * 2 : 0), o: st[5] });
  if (st[5] === 0) return;
  const o = { jaw: talkW(t, 'VECINO'), look: [0, 0], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (t < T(2.9)) { o.look = [5, -4]; o.bL = 8; o.bR = 12; }
  else if (t < T(5.3)) { o.look = [4, -3]; o.bR = 14; }
  if (t > T(7.8) && t < T(8.4)) { o.fan = Math.sin(t * 26) * 22 - 10; o.bL = 16; o.bR = 16; }
  if (t > T(13.8) && t < T(15.4)) { o.look = [5, -3]; o.bL = 10; o.bR = 10; }
  if (t > T(15.4) && t < T(19.3)) { o.look = [5, -1]; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  if (t > T(31.9) && t < T(33.2)) { o.bR = 16; o.bL = 0; o.look = [3, -2]; }
  if (t > T(38.0) && t < T(39.9)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 12; o.bR = 12; }
  if (t > T(41.3) && t < T(43.6)) { o.look = [5, -4]; o.half = true; }
  if (t > T(46.6) && t < T(47.8)) { o.bL = 16; o.bR = 16; o.fan = Math.sin(t * 26) * 22 - 10; }
  if (t > T(52.0) && t < T(55.4)) { o.look = [5, -2]; }
  vecFace(vecO, t, o);
}
