/* Ep. 2 · Colón — símbolos, óvalo del Vecino, utilidades propias */
{
  const extra = `<symbol id="colS" viewBox="0 0 360 460" overflow="visible">${figBust(COLON)}</symbol>
  <symbol id="sabS0" viewBox="0 0 360 460" overflow="visible">${figBust(SAB[0])}</symbol>
  <symbol id="sabS1" viewBox="0 0 360 460" overflow="visible">${figBust(SAB[1])}</symbol>
  <symbol id="sabS2" viewBox="0 0 360 460" overflow="visible">${figBust(SAB[2])}</symbol>
  <symbol id="eraS" viewBox="0 0 360 460" overflow="visible">${figBust(ERA)}</symbol>
  <symbol id="shipS" viewBox="0 0 540 560" overflow="visible">${shipInner()}</symbol>
  <symbol id="globeS" viewBox="0 0 320 400" overflow="visible">${globeInner()}</symbol>
  <symbol id="barS" viewBox="0 0 100 120" overflow="visible">${barrelInner()}</symbol>`;
  const d = defsSvg.querySelector('defs'); d.insertAdjacentHTML('beforeend', extra);
}
Object.assign(AV, { COL: ['colS', '70 70 220 220', 360, 460], SAB: ['sabS1', '70 60 220 220', 360, 460], SAB0: ['sabS0', '70 60 220 220', 360, 460], ERA: ['eraS', '70 80 220 220', 360, 460], VEC: ['vecS', '100 30 220 260', 420, 520] });
const mkCol = (pa, b) => mk(pa, b, figBust(COLON), '0 0 360 460', 'bust');
const mkSab = (pa, b, i) => mk(pa, b, figBust(SAB[i]), '0 0 360 460', 'bust');
const mkShip = (pa, b, flip) => { const m = mk(pa, b, flip ? `<g transform="translate(540,0) scale(-1,1)">${shipInner()}</g>` : shipInner(), '0 0 540 560', 'ship'); m.sails = m.d.querySelector('.sails'); m.flag = m.d.querySelector('.flag'); return m; };
const mkGlobe = (pa, b) => { const m = mk(pa, b, globeInner(), '0 0 320 400', 'globe'); m.cont = m.d.querySelector('.cont'); return m; };
const spinGlobe = (g, t, sp = 40) => g.cont.setAttribute('transform', `translate(${f1(-((t * sp) % 280))},0)`);
const svgBox = (pa, x, y, w, h, inner, vb, css = {}) => { const d = box(pa, x, y, w, h, css); d.innerHTML = svgW(inner, vb); return d; };
const bigText = (pa, x, y, w, html, o = {}) => el('div', pa, Object.assign({ left: px(x), top: px(y), width: px(w), textAlign: o.align || 'center', fontFamily: o.font || 'Playfair', fontWeight: o.weight || 900, fontStyle: o.italic ? 'italic' : 'normal', fontSize: px(o.size || 120), lineHeight: o.lh || 1, color: o.color || INK, whiteSpace: o.nowrap === false ? 'normal' : 'nowrap', zIndex: o.z || 10, letterSpacing: o.ls || '0' }, o.css || {}), html);
function sweatDrop(pa, x, y, sz = 40) { return svgBox(pa, x, y, sz, sz * 1.4, `<path d="M20,2 Q36,30 34,40 A14,14 0 0,1 6,40 Q4,30 20,2 Z" fill="#9fd3ff" stroke="${INK}" stroke-width="3.5"/><path d="M14,36 q0,-6 4,-10" stroke="#fff" stroke-width="3" fill="none"/>`, '0 0 40 56', { zIndex: 30 }); }
const GCHECK = `<svg viewBox="0 0 100 100" width="100%" height="100%" style="overflow:visible"><path d="M12,54 L40,82 L92,14" stroke="#fff" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M12,54 L40,82 L92,14" stroke="${INK}" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M12,54 L40,82 L92,14" stroke="${GREEN}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
function badge(pa, x, y, sz, inner, bg = YEL) { const d = box(pa, x, y, sz, sz, { zIndex: 40 }); d.innerHTML = `<div style="position:absolute;inset:0;background:${bg};border:5px solid ${INK};border-radius:50%;box-shadow:5px 5px 0 ${SH}"></div><div style="position:absolute;left:18%;top:18%;width:64%;height:64%">${inner}</div>`; return d; }
function wavesSvg(w, y0, rows, col, hatch = true, seed = 1) {
  const r = rng(seed); let s = `<rect x="0" y="${y0}" width="${w}" height="3000" fill="${col}"/>` + (hatch ? `<rect x="0" y="${y0}" width="${w}" height="3000" fill="url(#hP)"/>` : '');
  for (let k = 0; k < rows; k++) { const y = y0 + 20 + k * 48 + k * k * 4; let d = ''; for (let x = -40; x < w + 40; x += 70 + k * 8) d += `M${f1(x + r() * 20)},${y} q${18 + k * 2},-${12 + k} ${36 + k * 4},0`; s += `<path d="${d}" stroke="${INK}" stroke-width="${2.5 + k * 0.4}" fill="none" stroke-linecap="round"/>`; }
  return s;
}

/* =================== EL VECINO en su marco ovalado (abajo-izquierda) =================== */
const OV = { x: 36, y: 924, w: 300, h: 330 };
const ovalW = box(world, OV.x, OV.y, OV.w, OV.h, { zIndex: 850 }); ovalW.style.transformOrigin = '0% 100%';
const ovIn = box(ovalW, 15, 15, OV.w - 30, OV.h - 30, { borderRadius: '50%', overflow: 'hidden', background: `repeating-linear-gradient(90deg, #F4CFDA 0 15px, #F9E3EA 15px 30px)` });
box(ovIn, 0, 0, OV.w - 30, OV.h - 30, { background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,.5), rgba(120,40,60,.25) 90%)' });
const vecO = mkVec(ovIn, [-44, -16, 360, 446]);
const ovFrame = box(ovalW, -20, -36, OV.w + 40, OV.h + 80);
{
  const cx = (OV.w + 40) / 2, cy = 36 + OV.h / 2, rx = OV.w / 2 - 4, ry = OV.h / 2 - 4;
  let beads = ''; for (let k = 0; k < 38; k++) { const a = k / 38 * Math.PI * 2; beads += `<circle cx="${f1(cx + Math.cos(a) * (rx + 2))}" cy="${f1(cy + Math.sin(a) * (ry + 2))}" r="4.2" fill="#f3d27a" stroke="${INK}" stroke-width="1.5"/>`; }
  ovFrame.innerHTML = `<svg width="${OV.w + 40}" height="${OV.h + 80}" style="overflow:visible">
  <ellipse cx="${cx + 8}" cy="${cy + 10}" rx="${rx + 13}" ry="${ry + 13}" fill="none" stroke="${SH}" stroke-width="24"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 13}" ry="${ry + 13}" fill="none" stroke="#fff" stroke-width="32"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="${INK}" stroke-width="22"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="${BRASS}" stroke-width="15"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="url(#hA)" stroke-width="15" opacity=".6"/>${beads}
  <ellipse cx="${cx}" cy="${cy}" rx="${rx - 8}" ry="${ry - 8}" fill="none" stroke="${INK}" stroke-width="3"/>
  <g transform="translate(${cx},24)"><path d="M-42,22 C-36,-6 -12,-12 0,-22 C12,-12 36,-6 42,22 Z" fill="${BRASS}" stroke="${INK}" stroke-width="3.5"/><circle cx="0" cy="2" r="8" fill="${PINK}" stroke="${INK}" stroke-width="3"/></g>
  <g transform="translate(${cx},${OV.h + 52})"><rect x="-96" y="-24" width="192" height="42" rx="10" fill="${INK}" stroke="${BRASS}" stroke-width="4"/><text x="0" y="8" text-anchor="middle" font-family="Rye" font-size="23" fill="${YEL}">EL VECINO</text></g></svg>`;
}
