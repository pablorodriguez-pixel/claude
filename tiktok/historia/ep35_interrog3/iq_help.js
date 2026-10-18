/* Ep. 29 · helpers copiados de Ep. 25 (BIGT, OUTL, qMark, bubble, quill, pin) */
const GOLD = '#E9C75C', IRON = '#8E8A80', IRON2 = '#5E5A52', SEA = '#AFC0B6', SEA2 = '#C9D3C6', LAGOON = '#9DB7AE', STRIPE = '#2f4a6a';
const BIGT = (pa, x, y, w, html, css = {}) => el('div', pa, Object.assign({ left: px(x), top: px(y), width: px(w), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, color: INK, lineHeight: 1, zIndex: 20 }, css), html);
const OUTL = (c = INK, d = 10) => `${d}px ${d}px 0 ${c}, -4px -4px 0 ${c}, 4px -4px 0 ${c}, -4px 4px 0 ${c}`;
const qMark = (pa, x, y, sz = 110, col = PINK) => el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz), lineHeight: 1, color: col, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}`, zIndex: 30 }, '?');
// bocadillo de cómic (HTML). tail: 'bl' | 'br' | 'b' | 'l' | 'r'
function bubble(pa, x, y, html, o = {}) {
  const b = el('div', pa, { left: px(x), top: px(y), background: o.bg || '#fff', border: `${o.bw || 6}px solid ${INK}`, borderRadius: o.rad || '46px', padding: o.pad || '10px 34px 16px', fontFamily: o.font || 'Playfair', fontWeight: o.fw || 900, fontStyle: o.it ? 'italic' : 'normal', fontSize: px(o.size || 70), color: o.color || INK, whiteSpace: 'nowrap', lineHeight: 1.05, boxShadow: `8px 9px 0 ${SH}`, zIndex: o.z || 30, letterSpacing: o.ls || '0' }, html);
  const tl = o.tail || 'bl';
  const pos = { bl: 'left:44px;bottom:-46px', br: 'right:44px;bottom:-46px', b: 'left:calc(50% - 28px);bottom:-46px', l: 'left:-50px;top:calc(50% - 26px)', r: 'right:-50px;top:calc(50% - 26px)' }[tl];
  const pth = { bl: 'M4,0 L56,0 L10,48 Z', br: 'M4,0 L56,0 L50,48 Z', b: 'M4,0 L56,0 L30,48 Z', l: 'M60,4 L60,52 L0,40 Z', r: 'M0,4 L0,52 L60,40 Z' }[tl];
  const tw = document.createElement('div'); tw.style.cssText = `position:absolute;${pos};width:60px;height:56px;`;
  tw.innerHTML = `<svg width="60" height="56" style="overflow:visible"><path d="${pth}" fill="${o.bg || '#fff'}" stroke="${INK}" stroke-width="${o.bw || 6}" stroke-linejoin="round"/><path d="${tl === 'l' ? 'M62,8 L62,48' : tl === 'r' ? 'M-2,8 L-2,48' : 'M8,-4 L52,-4'}" stroke="${o.bg || '#fff'}" stroke-width="${(o.bw || 6) + 3}"/></svg>`;
  b.appendChild(tw);
  return b;
}

/* ---------- LA MANO QUE DICE ADIÓS (viewBox 0 0 400 760; muñeca en 200,520) ---------- */
const quillSvg = () => `<svg viewBox="0 0 120 240" width="100%" height="100%" style="overflow:visible">${cut('<path d="M60,236 L52,150 C10,110 20,30 100,4 C96,60 90,120 68,150 Z"/>', 4, 6)}<path d="M60,236 L52,150 C10,110 20,30 100,4 C96,60 90,120 68,150 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/><path d="M60,232 C64,150 80,70 98,8" stroke="${INK}" stroke-width="3" fill="none"/><path d="M40,120 l20,-8 M36,90 l26,-10 M44,60 l24,-12" stroke="${INK}" stroke-width="2" opacity=".6"/></svg>`;
const pinSvg = (col = RED) => `<svg viewBox="0 0 60 80" width="100%" height="100%" style="overflow:visible"><path d="M30,78 L22,40 L38,40 Z" fill="${INK}"/><circle cx="33" cy="27" r="22" fill="${SH}"/><circle cx="30" cy="24" r="22" fill="${col}" stroke="${INK}" stroke-width="4"/><circle cx="23" cy="17" r="7" fill="#fff" opacity=".6"/></svg>`;
