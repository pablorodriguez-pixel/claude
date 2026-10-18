/* Ep. 36 · figuras nuevas: billete genérico, tecla, lupa, fichas de letras, titular numerado de los pasos */

// billete genérico de «dólar» (grabado, sin reproducir ninguno real) viewBox 0 0 760 360
function billSvg() {
  let gu = ''; for (let k = 0; k < 26; k++) gu += `<path d="M${40 + k * 26},34 q13,14 0,28" stroke="${GREEN}" stroke-width="2.4" fill="none" opacity=".6"/><path d="M${40 + k * 26},298 q13,14 0,28" stroke="${GREEN}" stroke-width="2.4" fill="none" opacity=".6"/>`;
  const corner = (x, y) => `<circle cx="${x}" cy="${y}" r="40" fill="#E4EEDC" stroke="${INK}" stroke-width="4"/><text x="${x}" y="${y + 20}" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="58" fill="${GREEN}">$</text>`;
  return `<svg viewBox="0 0 760 360" width="100%" height="100%" style="overflow:visible">
  ${cut('<rect x="0" y="0" width="760" height="360" rx="18"/>', 10, 12)}
  <rect x="0" y="0" width="760" height="360" rx="18" fill="#CFE0C3" stroke="${INK}" stroke-width="7"/>
  <rect x="0" y="0" width="760" height="360" rx="18" fill="url(#hA)" opacity=".18"/>
  <rect x="22" y="22" width="716" height="316" rx="10" fill="none" stroke="${GREEN}" stroke-width="5"/>${gu}
  <ellipse cx="380" cy="180" rx="150" ry="120" fill="#E4EEDC" stroke="${INK}" stroke-width="5"/>
  <ellipse cx="380" cy="180" rx="132" ry="102" fill="none" stroke="${GREEN}" stroke-width="3" stroke-dasharray="6 6"/>
  ${corner(96, 96)}${corner(664, 96)}${corner(96, 264)}${corner(664, 264)}
  <text x="200" y="196" text-anchor="middle" font-family="Rye" font-size="34" fill="${GREEN}">DÓLAR</text><text x="560" y="196" text-anchor="middle" font-family="Rye" font-size="34" fill="${GREEN}">DÓLAR</text></svg>`;
}
// el «$» de tinta (la S + una raya), viewBox 0 0 600 900
function inkDollarSvg(col = INK) {
  return `<svg viewBox="0 0 600 900" width="100%" height="100%" style="overflow:visible"><g transform="translate(300 450) scale(1.05)">
  <path d="M0,-350 V352" stroke="${col}" stroke-width="58" fill="none" stroke-linecap="round"/><path d="${S_PATH}" stroke="${col}" stroke-width="58" fill="none" stroke-linecap="round"/></g>
  <path d="M120,820 q60,30 140,6" stroke="${col}" stroke-width="10" fill="none" opacity=".35" stroke-linecap="round"/></svg>`;
}
// lupa (viewBox 0 0 300 420)
const lupaSvg = () => `<svg viewBox="0 0 300 420" width="100%" height="100%" style="overflow:visible">
  ${cut('<circle cx="150" cy="150" r="130"/><rect x="128" y="270" width="44" height="150" rx="16"/>', 7, 9)}
  <rect x="128" y="276" width="44" height="144" rx="16" fill="${LEATHER}" stroke="${INK}" stroke-width="6"/>
  <circle cx="150" cy="150" r="118" fill="rgba(255,255,255,.28)" stroke="${INK}" stroke-width="10"/><circle cx="150" cy="150" r="106" fill="none" stroke="${BRASS}" stroke-width="10"/>
  <path d="M84,104 q30,-40 80,-44" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" opacity=".8"/></svg>`;
// tecla de teclado: «$» arriba, «4» abajo (viewBox 0 0 220 220)
const keySvg = () => `<svg viewBox="0 0 220 220" width="100%" height="100%" style="overflow:visible">
  ${cut('<rect x="0" y="0" width="220" height="220" rx="30"/>', 8, 10)}
  <rect x="0" y="0" width="220" height="220" rx="30" fill="#E9E4D8" stroke="${INK}" stroke-width="7"/><rect x="18" y="14" width="184" height="170" rx="22" fill="#FBF8F0" stroke="${INK}" stroke-width="3"/>
  <text x="62" y="104" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="84" fill="${INK}">$</text><text x="62" y="170" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="56" fill="${INK}">4</text></svg>`;

// fichas de letras (taco blanco) — devuelve [{e, tx}]
function letterTiles(pa, x0, y, n, w, gap, o = {}) {
  const T = [];
  for (let i = 0; i < n; i++) {
    const e = el('div', pa, { left: px(x0 + i * (w + gap)), top: px(y), width: px(w), height: px(w * 1.18), lineHeight: px(w * 1.18), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(w * 0.82), color: INK, background: '#fff', border: `7px solid ${INK}`, borderRadius: '22px', boxShadow: `8px 9px 0 ${SH}`, zIndex: o.z || 14 }, '');
    T.push({ e });
  }
  return T;
}

/* ---------- TITULAR NUMERADO DE CADA PASO («1 · P + S = pesos»): aguanta el paso entero ---------- */
const STEPB = [];
STEPS.forEach(([n, t0, t1, str, hlT]) => {
  const b = box(world, 40, 176, 1000, 150, { zIndex: 560 });
  const strip = box(b, 70, 10, 930, 130, { background: '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '26px', boxShadow: `8px 9px 0 ${SH}` });
  const tx = el('div', strip, { left: '110px', top: '0', width: '800px', height: '118px', lineHeight: '118px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '80px', color: INK, whiteSpace: 'nowrap' });
  const toks = []; const re = /\*([^*]+)\*|([^*]+)/g; let m;
  while ((m = re.exec(str))) toks.push(m[1] ? { t: m[1], k: 1 } : { t: m[2], k: 0 });
  tx.innerHTML = toks.map(q => q.k ? `<i>${hlSpan(q.t, 'shl')}</i>` : q.t.replace(/ /g, '&nbsp;')).join('');
  const badge = el('div', b, { left: '0', top: '-4px', width: '158px', height: '158px', lineHeight: '146px', textAlign: 'center', borderRadius: '50%', background: PINK, border: `7px solid ${INK}`, boxShadow: `7px 8px 0 ${INK}`, fontFamily: 'Playfair', fontWeight: 900, fontSize: '112px', color: '#fff', textShadow: `4px 4px 0 ${INK}` }, String(n));
  STEPB.push({ b, strip, badge, tx, hl: tx.querySelector('.shl'), t0, t1, hlT });
});
function updSteps(t) {
  STEPB.forEach(s => {
    const vis = t >= s.t0 && t < s.t1; s.b.style.display = vis ? '' : 'none'; if (!vis) return;
    const ks = p(t, s.t0, 0.3, E.outBack);
    set(s.strip, { x: (1 - ks) * 700, o: clamp(ks * 2) * (1 - p(t, s.t1 - 0.14, 0.14)) });
    set(s.badge, { s: pop(t, s.t0 + 0.04, 0.4) * (1 + 0.03 * Math.sin(t * 3)), r: -8 + Math.sin(t * 2) * 3, o: 1 - p(t, s.t1 - 0.14, 0.14) });
    paint(s.hl, t, s.hlT, 0.4);
  });
}
