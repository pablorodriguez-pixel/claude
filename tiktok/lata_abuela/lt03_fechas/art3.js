/* Ep. 3 — La fecha que te hace tirar comida: ilustraciones nuevas */
const AMBER = '#F2A516', AMBER2 = '#D9800B', CRUST = '#B8732F', CRUMB = '#F6DDA8';
const face = (cx, cy, o = {}) => {
  const s = o.s || 1, e = o.eye || 'dot';
  const ex = 34 * s, ey = cy;
  let eyes = e === 'dot'
    ? `<g class="eyes"><ellipse cx="${cx - ex}" cy="${ey}" rx="${8 * s}" ry="${11 * s}" fill="${INK}"/><ellipse cx="${cx + ex}" cy="${ey}" rx="${8 * s}" ry="${11 * s}" fill="${INK}"/><circle cx="${cx - ex + 3 * s}" cy="${ey - 4 * s}" r="${3 * s}" fill="#fff"/><circle cx="${cx + ex + 3 * s}" cy="${ey - 4 * s}" r="${3 * s}" fill="#fff"/></g>`
    : e === 'happy'
      ? `<g class="eyes" stroke="${INK}" stroke-width="${6 * s}" fill="none" stroke-linecap="round"><path d="M${cx - ex - 11 * s} ${ey + 4 * s} q${11 * s} ${-14 * s} ${22 * s} 0"/><path d="M${cx + ex - 11 * s} ${ey + 4 * s} q${11 * s} ${-14 * s} ${22 * s} 0"/></g>`
      : `<g class="eyes" stroke="${INK}" stroke-width="${6 * s}" stroke-linecap="round"><path d="M${cx - ex - 12 * s} ${ey} h${24 * s}"/><path d="M${cx + ex - 12 * s} ${ey} h${24 * s}"/></g>`;
  const brows = o.brow === 'worry' ? `<g stroke="${INK}" stroke-width="${5 * s}" stroke-linecap="round"><path d="M${cx - ex - 12 * s} ${ey - 26 * s} L${cx - ex + 10 * s} ${ey - 32 * s}"/><path d="M${cx + ex + 12 * s} ${ey - 26 * s} L${cx + ex - 10 * s} ${ey - 32 * s}"/></g>`
    : o.brow === 'grump' ? `<g stroke="${INK}" stroke-width="${6 * s}" stroke-linecap="round"><path d="M${cx - ex - 14 * s} ${ey - 30 * s} L${cx - ex + 10 * s} ${ey - 20 * s}"/><path d="M${cx + ex + 14 * s} ${ey - 30 * s} L${cx + ex - 10 * s} ${ey - 20 * s}"/></g>` : '';
  const m = o.mouth === 'o' ? `<ellipse class="mouth" cx="${cx}" cy="${cy + 40 * s}" rx="${11 * s}" ry="${14 * s}" fill="#7A1F2B" stroke="${INK}" stroke-width="${4 * s}"/>`
    : o.mouth === 'flat' ? `<path class="mouth" d="M${cx - 18 * s} ${cy + 42 * s} q${18 * s} ${-8 * s} ${36 * s} 0" stroke="${INK}" stroke-width="${6 * s}" fill="none" stroke-linecap="round"/>`
      : `<path class="mouth" d="M${cx - 24 * s} ${cy + 32 * s} q${24 * s} ${26 * s} ${48 * s} 0 Z" fill="#B5122C" stroke="${INK}" stroke-width="${5 * s}" stroke-linejoin="round"/>`;
  const ck = `<circle cx="${cx - ex - 18 * s}" cy="${cy + 26 * s}" r="${11 * s}" fill="#F08A8A" opacity=".5"/><circle cx="${cx + ex + 18 * s}" cy="${cy + 26 * s}" r="${11 * s}" fill="#F08A8A" opacity=".5"/>`;
  return `<g class="face">${ck}${brows}${eyes}${m}</g>`;
};

/* yogur gigante con etiqueta */
A.yog = () => `<svg viewBox="0 0 420 520" width="420" height="520" style="overflow:visible">
 <defs><clipPath id="yogC"><path d="M30 96 L65 478 Q68 496 90 496 L330 496 Q352 496 355 478 L390 96 Z"/></clipPath></defs>
 <ellipse cx="215" cy="506" rx="180" ry="18" fill="rgba(5,12,40,.35)"/>
 <path d="M30 96 L65 478 Q68 496 90 496 L330 496 Q352 496 355 478 L390 96 Z" fill="#FFFDF6"/>
 <g clip-path="url(#yogC)">
  <path d="M0 318 Q105 290 210 318 T420 318 V520 H0 Z" fill="#E8486A"/>
  <path d="M0 340 Q105 312 210 340 T420 340" stroke="#fff" stroke-width="6" fill="none" opacity=".6"/>
  ${[[70, 430], [150, 470], [290, 460], [350, 410], [215, 440]].map(([x, y]) => `<g transform="translate(${x} ${y})"><path d="M0 -22 Q22 -20 18 2 Q10 22 0 26 Q-10 22 -18 2 Q-22 -20 0 -22 Z" fill="#C8102E" stroke="${INK}" stroke-width="3"/><path d="M-10 -22 L0 -30 L10 -22 L0 -18 Z" fill="#2f9e5b"/><circle cx="-6" cy="-4" r="2" fill="#FFE14A"/><circle cx="6" cy="4" r="2" fill="#FFE14A"/><circle cx="-2" cy="12" r="2" fill="#FFE14A"/></g>`).join('')}
  <rect x="52" y="100" width="22" height="380" fill="#fff" opacity=".5"/>
 </g>
 <path d="M30 96 L65 478 Q68 496 90 496 L330 496 Q352 496 355 478 L390 96 Z" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
 <rect x="16" y="70" width="388" height="36" rx="14" fill="url(#silverG)" stroke="${INK}" stroke-width="5"/>
 <path d="M370 74 Q420 40 440 62 Q446 80 400 92 Z" fill="url(#silverG)" stroke="${INK}" stroke-width="4" stroke-linejoin="round" class="tab"/>
 ${face(210, 172, { brow: 'worry', mouth: 'o' })}
 <path class="sweat" d="M330 132 Q342 152 342 160 A12 12 0 0 1 318 160 Q318 152 330 132 Z" fill="#86B8F2" stroke="${INK}" stroke-width="3"/>
 <rect x="92" y="252" width="236" height="148" rx="12" fill="#fff" stroke="${INK}" stroke-width="4"/>
 <text x="210" y="284" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="20" fill="${INK}" letter-spacing="1">CONSUMIR PREF.</text>
 <text x="210" y="308" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="20" fill="${INK}" letter-spacing="1">ANTES DE:</text>
 <rect x="108" y="320" width="204" height="62" rx="8" fill="#FFF6DE" stroke="${INK}" stroke-width="3" stroke-dasharray="7 5"/>
 <text x="210" y="362" text-anchor="middle" font-family="SpaceMono" font-weight="700" font-size="26" fill="${INK}">dd/mm/aaaa</text>
</svg>`;

/* cubo de basura con comida asomando */
A.binFull = () => `<svg viewBox="0 0 260 330" width="260" height="330" style="overflow:visible">
 <ellipse cx="135" cy="318" rx="110" ry="14" fill="rgba(5,12,40,.35)"/>
 <g class="stuff">
  <path d="M60 92 Q50 40 92 36 L150 30 Q176 34 172 70 Z" fill="#D99A4E" stroke="${INK}" stroke-width="5"/>
  <path d="M84 52 q8 12 4 26 M114 46 q8 12 4 26 M140 44 q8 12 4 26" stroke="#a8692a" stroke-width="4" fill="none" stroke-linecap="round"/>
  <circle cx="190" cy="72" r="28" fill="#E23D3D" stroke="${INK}" stroke-width="5"/><path d="M190 44 q4 -14 14 -16" stroke="${INK}" stroke-width="4" fill="none"/><path d="M196 34 q16 -10 22 2 q-12 8 -22 -2 Z" fill="#2f9e5b" stroke="${INK}" stroke-width="3"/>
  <path d="M40 90 Q58 30 100 44 Q74 60 70 92 Z" fill="#7CC36A" stroke="${INK}" stroke-width="4"/>
 </g>
 <path d="M34 86 L226 86 L204 312 L56 312 Z" fill="url(#silverG)" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
 <path d="M80 110 L88 292 M130 110 V292 M180 110 L172 292" stroke="#7d8698" stroke-width="7" stroke-linecap="round"/>
 <g class="binlid"><rect x="20" y="64" width="220" height="26" rx="12" fill="url(#silverG)" stroke="${INK}" stroke-width="6"/><rect x="108" y="44" width="44" height="24" rx="10" fill="url(#silverG)" stroke="${INK}" stroke-width="5"/></g>
</svg>`;

/* lupa con la fecha aumentada */
A.lupaDate = () => A.lupa('lupaC', `<rect x="0" y="0" width="640" height="640" fill="#FFF6DE"/><rect x="40" y="250" width="560" height="150" rx="16" fill="none" stroke="${INK}" stroke-width="8" stroke-dasharray="22 14"/><text x="320" y="356" text-anchor="middle" font-family="SpaceMono" font-weight="700" font-size="88" fill="${INK}">dd/mm/aaaa</text><text x="320" y="200" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="54" fill="#8a8f9c" letter-spacing="3">ANTES DE:</text>`);

/* monedas */
A.coin = () => `<svg viewBox="-60 -60 120 120" width="120" height="120" style="overflow:visible"><circle cx="4" cy="6" r="52" fill="rgba(5,12,40,.35)"/><circle r="52" fill="url(#goldG)" stroke="${INK}" stroke-width="5"/><circle r="40" fill="none" stroke="#8a6420" stroke-width="4"/><text y="22" text-anchor="middle" font-family="DMSerif" font-size="62" fill="#7a5418">€</text><path d="M-34 -18 a38 38 0 0 1 22 -22" stroke="#fff" stroke-width="6" opacity=".6" fill="none" stroke-linecap="round"/></svg>`;
A.piggy = () => `<svg viewBox="0 0 300 240" width="300" height="240" style="overflow:visible">
 <ellipse cx="150" cy="228" rx="110" ry="12" fill="rgba(5,12,40,.35)"/>
 <rect x="70" y="170" width="36" height="56" rx="14" fill="#F4A3B5" stroke="${INK}" stroke-width="5"/><rect x="190" y="170" width="36" height="56" rx="14" fill="#F4A3B5" stroke="${INK}" stroke-width="5"/>
 <ellipse cx="150" cy="130" rx="124" ry="92" fill="#F7B7C5" stroke="${INK}" stroke-width="6"/>
 <path d="M84 50 L70 6 L120 40 Z" fill="#F4A3B5" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
 <rect x="122" y="40" width="60" height="12" rx="6" fill="${INK}"/>
 <ellipse cx="34" cy="132" rx="26" ry="32" fill="#F4A3B5" stroke="${INK}" stroke-width="5"/><ellipse cx="26" cy="124" rx="5" ry="8" fill="${INK}"/><ellipse cx="42" cy="140" rx="5" ry="8" fill="${INK}"/>
 <circle cx="88" cy="100" r="9" fill="${INK}"/><circle cx="91" cy="96" r="3" fill="#fff"/>
 <circle cx="70" cy="150" r="13" fill="#F08A8A" opacity=".6"/>
 <path d="M272 120 q20 -10 12 -26 q-14 -6 -10 12" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>
 <path d="M110 70 q40 -22 90 -10" stroke="#fff" stroke-width="8" fill="none" opacity=".55" stroke-linecap="round"/>
</svg>`;

/* alacena con puertas */
A.cupboard = () => `<svg viewBox="0 0 420 330" width="420" height="330" style="overflow:visible">
 <rect x="14" y="18" width="420" height="320" rx="20" fill="rgba(5,12,40,.35)"/>
 <rect x="0" y="0" width="420" height="320" rx="20" fill="#B5733A" stroke="${INK}" stroke-width="6"/>
 <rect x="22" y="22" width="376" height="276" rx="8" fill="#5a3418" stroke="${INK}" stroke-width="4"/>
 <rect x="22" y="150" width="376" height="12" fill="#8a5428" stroke="${INK}" stroke-width="3"/>
 <g stroke="${INK}" stroke-width="4" stroke-linejoin="round">
  <rect x="44" y="60" width="64" height="90" rx="6" fill="#F2D28B"/><rect x="50" y="84" width="52" height="30" fill="${RED}"/>
  <rect x="122" y="80" width="80" height="70" rx="10" fill="#2E64D8"/><circle cx="162" cy="115" r="18" fill="#FFF1C4"/>
  <rect x="218" y="48" width="56" height="102" rx="6" fill="#F25244"/><rect x="224" y="70" width="44" height="40" fill="#FBF3E2"/>
  <path d="M290 150 L296 84 Q330 70 364 84 L370 150 Z" fill="#E9DCC0"/>
  <rect x="48" y="206" width="70" height="92" rx="34" fill="#9fb3d9"/><rect x="48" y="226" width="70" height="40" fill="#FBF3E2"/>
  <rect x="140" y="196" width="110" height="102" rx="8" fill="#F2983E"/><rect x="152" y="214" width="86" height="40" rx="6" fill="#FBF3E2"/>
  <rect x="270" y="222" width="100" height="76" rx="12" fill="#2f9e5b"/>
 </g>
 <g class="dL"><rect x="22" y="22" width="188" height="276" rx="8" fill="#D08A4A" stroke="${INK}" stroke-width="5"/><rect x="44" y="44" width="144" height="232" rx="10" fill="none" stroke="#8a5428" stroke-width="5"/><circle cx="186" cy="160" r="10" fill="url(#goldG)" stroke="${INK}" stroke-width="3"/></g>
 <g class="dR"><rect x="210" y="22" width="188" height="276" rx="8" fill="#D08A4A" stroke="${INK}" stroke-width="5"/><rect x="232" y="44" width="144" height="232" rx="10" fill="none" stroke="#8a5428" stroke-width="5"/><circle cx="234" cy="160" r="10" fill="url(#goldG)" stroke="${INK}" stroke-width="3"/></g>
</svg>`;

/* roseta de calidad */
A.rosette = (txt) => {
  let d = ''; for (let i = 0; i < 40; i++) { const a = i / 40 * Math.PI * 2, r = i % 2 ? 96 : 110; d += (i ? 'L' : 'M') + f1(120 + r * Math.cos(a)) + ' ' + f1(120 + r * Math.sin(a)); }
  return `<svg viewBox="0 0 240 300" width="240" height="300" style="overflow:visible">
 <path d="M80 170 L48 290 L84 268 L104 298 L124 190 Z" fill="${RED}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
 <path d="M160 170 L192 290 L156 268 L136 298 L116 190 Z" fill="#a50d26" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
 <path d="${d}Z" fill="url(#goldG)" stroke="#5a3d0c" stroke-width="5"/>
 <circle cx="120" cy="120" r="80" fill="url(#lidField)" stroke="url(#goldBand)" stroke-width="8"/>
 <path transform="translate(120 92)" d="M0 -24 L7 -8 L24 -7 L11 4 L15 21 L0 12 L-15 21 L-11 4 L-24 -7 L-7 -8 Z" fill="url(#goldG)" stroke="#5a3d0c" stroke-width="2"/>
 <text x="120" y="152" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="34" fill="${CREAM}" letter-spacing="2">${txt}</text>
</svg>`;
};

/* hoja de calendario (sin cifras) */
A.cal = () => `<svg viewBox="0 0 140 150" width="140" height="150" style="overflow:visible"><rect x="6" y="14" width="128" height="132" rx="14" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M6 28 Q6 14 20 14 L120 14 Q134 14 134 28 L134 48 L6 48 Z" fill="${RED}" stroke="${INK}" stroke-width="5"/><rect x="34" y="2" width="12" height="26" rx="6" fill="url(#silverG)" stroke="${INK}" stroke-width="3"/><rect x="94" y="2" width="12" height="26" rx="6" fill="url(#silverG)" stroke="${INK}" stroke-width="3"/>${[0, 1, 2, 3].map(r => [0, 1, 2, 3, 4].map(c => `<rect x="${18 + c * 22}" y="${60 + r * 20}" width="14" height="12" rx="3" fill="${r === 2 && c === 3 ? RED : '#d6dbe5'}"/>`).join('')).join('')}</svg>`;

/* tarro de miel */
A.honey = () => {
  const R = rng(31); let cr = '';
  for (let i = 0; i < 90; i++) { const x = 50 + R() * 320, y = 200 + R() * 330, r = 5 + R() * 11, a = R() * 60; cr += `<path transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)})" d="M0 ${f1(-r)} L${f1(r * .87)} ${f1(-r / 2)} L${f1(r * .87)} ${f1(r / 2)} L0 ${f1(r)} L${f1(-r * .87)} ${f1(r / 2)} L${f1(-r * .87)} ${f1(-r / 2)} Z" fill="${i % 3 ? '#FFF4D2' : '#FFFFFF'}" stroke="#E2B65A" stroke-width="2" opacity="${f1(.6 + R() * .4)}"/>`; }
  const body = 'M84 150 Q40 160 40 214 L40 486 Q40 534 96 536 L324 536 Q380 534 380 486 L380 214 Q380 160 336 150 Z';
  return `<svg viewBox="0 0 420 560" width="420" height="560" style="overflow:visible">
 <defs><clipPath id="honC"><path d="${body}"/></clipPath><linearGradient id="honG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFC93C"/><stop offset=".55" stop-color="${AMBER}"/><stop offset="1" stop-color="${AMBER2}"/></linearGradient></defs>
 <ellipse cx="215" cy="546" rx="180" ry="16" fill="rgba(5,12,40,.35)"/>
 <path d="${body}" fill="rgba(255,255,255,.4)"/>
 <g clip-path="url(#honC)">
  <path class="hon" d="M0 196 Q100 182 210 196 T420 196 V560 H0 Z" fill="url(#honG)"/>
  <g class="cry" opacity="0">${cr}</g>
  <path d="M70 230 Q60 380 74 500" stroke="#fff" stroke-width="16" fill="none" opacity=".45" stroke-linecap="round"/>
 </g>
 <path d="${body}" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
 <rect x="96" y="112" width="228" height="46" rx="10" fill="rgba(255,255,255,.5)" stroke="${INK}" stroke-width="5"/>
 <g class="lid">
  <rect x="70" y="58" width="280" height="64" rx="16" fill="url(#goldG)" stroke="${INK}" stroke-width="6"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M${94 + i * 21} 64 V116" stroke="#8a6420" stroke-width="4"/>`).join('')}
  <path d="M60 64 Q210 -14 360 64 Q350 86 330 80 Q300 100 270 82 Q240 100 210 82 Q180 100 150 82 Q120 100 90 80 Q70 86 60 64 Z" fill="${RED}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  ${[[120, 50], [170, 36], [220, 32], [270, 38], [310, 54], [150, 66], [250, 66], [200, 60]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#fff"/>`).join('')}
 </g>
 ${face(210, 250, { mouth: 'smile' })}
 <path transform="translate(210 418)" d="M0 -86 L74 -43 L74 43 L0 86 L-74 43 L-74 -43 Z" fill="${CREAM}" stroke="url(#goldBand)" stroke-width="8"/>
 <path transform="translate(210 418)" d="M0 -86 L74 -43 L74 43 L0 86 L-74 43 L-74 -43 Z" fill="none" stroke="${INK}" stroke-width="3"/>
 <text x="210" y="438" text-anchor="middle" font-family="DMSerif" font-size="56" fill="${BLUE}">Miel</text>
 <g transform="translate(250 372) scale(.8)"><ellipse cx="0" cy="0" rx="16" ry="11" fill="#FFE14A" stroke="${INK}" stroke-width="3"/><path d="M-4 -10 V10 M5 -9 V9" stroke="${INK}" stroke-width="4"/><ellipse cx="-4" cy="-16" rx="8" ry="6" fill="#fff" stroke="${INK}" stroke-width="2" opacity=".9"/><ellipse cx="7" cy="-16" rx="8" ry="6" fill="#fff" stroke="${INK}" stroke-width="2" opacity=".9"/></g>
</svg>`;
};

/* cazo al baño maría (detrás / delante del tarro) */
A.potBack = () => `<svg viewBox="0 0 640 420" width="640" height="420" style="overflow:visible">
 <ellipse cx="300" cy="120" rx="252" ry="52" fill="#3f4656" stroke="${INK}" stroke-width="6"/>
 <ellipse class="water" cx="300" cy="150" rx="236" ry="40" fill="#86B8F2"/>
 <g class="bub" fill="#DCEBFF" stroke="#3f7fd0" stroke-width="2">${[[120, 150, 9], [180, 162, 7], [420, 158, 10], [480, 146, 7], [300, 170, 6], [360, 140, 8]].map(([x, y, r], i) => `<circle class="b${i}" cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>
</svg>`;
A.potFront = () => `<svg viewBox="0 0 640 420" width="640" height="420" style="overflow:visible">
 <path d="M548 128 L636 104 Q648 104 646 118 L640 136 Q636 146 624 148 L548 166 Z" fill="#2b2f3a" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
 <path d="M48 120 A252 52 0 0 0 552 120 L522 360 Q512 404 462 404 L138 404 Q88 404 78 360 Z" fill="url(#silverG)" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
 <path d="M48 120 A252 52 0 0 0 552 120" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/>
 <path d="M110 200 L126 370" stroke="#fff" stroke-width="14" opacity=".4" stroke-linecap="round"/>
</svg>`;
A.flames = () => `<svg viewBox="0 0 520 140" width="520" height="140" style="overflow:visible">
 <rect x="10" y="96" width="500" height="40" rx="14" fill="#2b2f3a" stroke="${INK}" stroke-width="5"/>
 ${[70, 150, 230, 310, 390, 450].map((x, i) => `<g class="fl" transform="translate(${x} 98)"><path d="M0 0 Q-22 -6 -18 -30 Q-14 -48 0 -70 Q14 -48 18 -30 Q22 -6 0 0 Z" fill="#3E7BFA" stroke="${INK}" stroke-width="3"/><path d="M0 -4 Q-10 -8 -8 -22 Q-4 -34 0 -44 Q4 -34 8 -22 Q10 -8 0 -4 Z" fill="#9ED0FF"/></g>`).join('')}
</svg>`;
A.steam = () => `<svg viewBox="0 0 300 220" width="300" height="220" style="overflow:visible"><g stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" opacity=".85">${[40, 150, 260].map((x, i) => `<path class="st${i}" d="M${x} 210 q-30 -40 0 -80 q30 -40 0 -80"/>`).join('')}</g></svg>`;

/* pan */
A.loaf = (id) => `<svg viewBox="0 0 640 260" width="640" height="260" style="overflow:visible">
 <ellipse cx="330" cy="236" rx="290" ry="18" fill="rgba(5,12,40,.35)"/>
 <path d="M40 150 Q20 70 120 58 L520 40 Q624 40 618 128 Q612 210 520 214 L120 224 Q48 226 40 150 Z" fill="#C98536" stroke="${INK}" stroke-width="7"/>
 ${[150, 250, 350, 450].map(x => `<path d="M${x} 64 q34 36 22 96" stroke="#8a5420" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M${x + 6} 66 q30 34 20 88" stroke="#F0C48A" stroke-width="4" fill="none" stroke-linecap="round"/>`).join('')}
 <path d="M90 92 q140 -40 400 -40" stroke="#F0C48A" stroke-width="8" fill="none" stroke-linecap="round" opacity=".7"/>
 <g class="crack" opacity="0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M120 120 l20 18 l-10 16 l22 20"/><path d="M540 80 l-16 22 l14 12 l-12 24"/><path d="M330 190 l10 -20 l-14 -10"/></g>
 ${face(330, 132, { eye: 'dot', brow: 'grump', mouth: 'flat', s: 0.95 })}
</svg>`;
A.slice = (kind = 'plain') => {
  const crumb = kind === 'toast' ? '#E8A447' : CRUMB, crust = kind === 'toast' ? '#9A5A1E' : CRUST;
  return `<svg viewBox="0 0 150 170" width="150" height="170" style="overflow:visible">
 <path d="M24 74 Q8 22 56 14 Q75 2 96 14 Q144 22 126 74 L122 158 Q122 164 114 164 L36 164 Q28 164 28 158 Z" fill="${crumb}" stroke="${crust}" stroke-width="12" stroke-linejoin="round"/>
 <path d="M24 74 Q8 22 56 14 Q75 2 96 14 Q144 22 126 74 L122 158 Q122 164 114 164 L36 164 Q28 164 28 158 Z" fill="none" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
 ${kind === 'toast' ? `<path d="M40 60 Q60 40 100 50 Q116 80 104 120 Q80 140 50 126 Q34 96 40 60 Z" fill="#F2BC6A" opacity=".7"/>` : [[52, 60], [92, 54], [70, 96], [100, 116], [48, 128]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="4" fill="#d9b87a"/>`).join('')}
 ${kind === 'frozen' ? `<path d="M24 74 Q8 22 56 14 Q75 2 96 14 Q144 22 126 74 L122 158 Q122 164 114 164 L36 164 Q28 164 28 158 Z" fill="#BFE0FF" opacity=".55"/><g stroke="#fff" stroke-width="5" stroke-linecap="round"><path d="M75 70 v40 M57 80 l36 20 M93 80 l-36 20"/></g>${[[40, 40], [110, 44], [40, 140], [112, 138]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#fff"/>`).join('')}` : ''}
 ${kind === 'toast' ? face(75, 86, { eye: 'happy', s: 0.6 }) : ''}
</svg>`;
};
A.knife = () => `<svg viewBox="0 0 420 90" width="420" height="90" style="overflow:visible"><path d="M120 20 L400 30 Q414 44 400 60 L120 64 Z" fill="url(#silverG)" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>${Array.from({ length: 12 }, (_, i) => `<path d="M${140 + i * 22} 64 l11 -7 l11 7" stroke="${INK}" stroke-width="3" fill="none"/>`).join('')}<rect x="10" y="18" width="116" height="50" rx="18" fill="#7a4a22" stroke="${INK}" stroke-width="5"/><circle cx="44" cy="43" r="6" fill="url(#goldG)"/><circle cx="90" cy="43" r="6" fill="url(#goldG)"/></svg>`;
A.freezer = () => `<svg viewBox="0 0 340 400" width="340" height="400" style="overflow:visible">
 <rect x="14" y="18" width="340" height="390" rx="28" fill="rgba(5,12,40,.35)"/>
 <rect x="0" y="0" width="340" height="390" rx="28" fill="#EAF3FF" stroke="${INK}" stroke-width="6"/>
 <rect x="24" y="24" width="292" height="342" rx="14" fill="#1d3570" stroke="${INK}" stroke-width="4"/>
 <path d="M24 140 H316 M24 256 H316" stroke="#9fc4f5" stroke-width="6"/>
 ${[[60, 60], [280, 110], [90, 300], [250, 330], [170, 200]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#DCEBFF" opacity=".8"/>`).join('')}
 <g class="door"><rect x="24" y="24" width="292" height="342" rx="14" fill="#F4F9FF" stroke="${INK}" stroke-width="5"/>
  <rect x="270" y="120" width="22" height="150" rx="11" fill="url(#silverG)" stroke="${INK}" stroke-width="4"/>
  <g transform="translate(150 190)" stroke="#2E64D8" stroke-width="12" stroke-linecap="round">${[0, 60, 120].map(a => `<g transform="rotate(${a})"><path d="M0 -70 V70 M-20 -52 L0 -34 L20 -52 M-20 52 L0 34 L20 52"/></g>`).join('')}</g>
  <path d="M24 70 Q60 60 70 24 M316 330 Q280 340 270 366" stroke="#cfe3ff" stroke-width="10" fill="none" stroke-linecap="round"/>
 </g>
</svg>`;
A.toaster = () => `<svg viewBox="0 0 400 320" width="400" height="320" style="overflow:visible">
 <ellipse cx="205" cy="308" rx="170" ry="14" fill="rgba(5,12,40,.35)"/>
 <rect x="20" y="70" width="360" height="226" rx="60" fill="url(#silverG)" stroke="${INK}" stroke-width="6"/>
 <rect x="70" y="62" width="110" height="28" rx="14" fill="#1b1b22" stroke="${INK}" stroke-width="5"/><rect x="220" y="62" width="110" height="28" rx="14" fill="#1b1b22" stroke="${INK}" stroke-width="5"/>
 <g class="glow" opacity="0"><rect x="78" y="68" width="94" height="16" rx="8" fill="#FF7A1A"/><rect x="228" y="68" width="94" height="16" rx="8" fill="#FF7A1A"/></g>
 <rect x="20" y="226" width="360" height="22" fill="#9aa3b2" opacity=".5"/>
 <rect class="lever" x="372" y="110" width="26" height="40" rx="8" fill="${RED}" stroke="${INK}" stroke-width="5"/>
 <path d="M50 110 q10 -20 30 -26" stroke="#fff" stroke-width="10" fill="none" opacity=".6" stroke-linecap="round"/>
 ${face(200, 170, { eye: 'dot', mouth: 'smile', s: 0.9 })}
</svg>`;

/* despensa */
A.pjar = (kind) => {
  const R = rng(kind.length * 7 + 3); let fill = '';
  if (kind === 'ARROZ') { for (let i = 0; i < 70; i++) fill += `<ellipse transform="rotate(${f1(R() * 180)} ${f1(30 + R() * 140)} ${f1(100 + R() * 165)})" cx="${f1(30 + R() * 140)}" cy="${f1(100 + R() * 165)}" rx="7" ry="3.2" fill="#fff" stroke="#d8cfb8" stroke-width="1.5"/>`; }
  if (kind === 'LEGUMBRES') { for (let i = 0; i < 46; i++) { const c = ['#8B3A2A', '#C26A3D', '#E8C27A', '#6b2a1e'][i % 4]; fill += `<ellipse transform="rotate(${f1(R() * 180)} ${f1(32 + R() * 136)} ${f1(104 + R() * 160)})" cx="${f1(32 + R() * 136)}" cy="${f1(104 + R() * 160)}" rx="13" ry="8" fill="${c}" stroke="${INK}" stroke-width="2"/>`; } }
  if (kind === 'SAL') { for (let i = 0; i < 80; i++) fill += `<rect x="${f1(28 + R() * 144)}" y="${f1(100 + R() * 165)}" width="6" height="6" transform="rotate(${f1(R() * 90)} ${f1(31 + R() * 144)} ${f1(103 + R() * 165)})" fill="${i % 3 ? '#fff' : '#cfe3ff'}"/>`; }
  const bg = kind === 'ARROZ' ? '#F6F0E2' : kind === 'LEGUMBRES' ? '#E9C9A0' : '#FFFFFF';
  return `<svg viewBox="0 0 200 290" width="200" height="290" style="overflow:visible">
 <defs><clipPath id="pj${kind}"><rect x="22" y="70" width="156" height="206" rx="22"/></clipPath></defs>
 <rect x="22" y="70" width="156" height="206" rx="22" fill="rgba(255,255,255,.35)"/>
 <g clip-path="url(#pj${kind})"><rect x="0" y="94" width="200" height="200" fill="${bg}"/>${fill}<rect x="34" y="80" width="14" height="180" rx="7" fill="#fff" opacity=".5"/></g>
 <rect x="22" y="70" width="156" height="206" rx="22" fill="none" stroke="${INK}" stroke-width="5"/>
 <rect x="40" y="58" width="120" height="20" rx="6" fill="rgba(255,255,255,.6)" stroke="${INK}" stroke-width="4"/>
 <rect x="30" y="160" width="140" height="54" rx="10" fill="${CREAM}" stroke="#D4A74A" stroke-width="4"/>

 <g class="plid"><rect x="26" y="26" width="148" height="40" rx="12" fill="${kind === 'SAL' ? '#2E64D8' : kind === 'ARROZ' ? RED : '#2f9e5b'}" stroke="${INK}" stroke-width="5"/>${[50, 75, 100, 125, 150].map(x => `<path d="M${x} 30 V62" stroke="rgba(0,0,0,.25)" stroke-width="4"/>`).join('')}<path d="M38 36 h40" stroke="#fff" stroke-width="5" opacity=".5" stroke-linecap="round"/></g>
</svg>`;
};
A.plank = () => `<svg viewBox="0 0 760 70" width="760" height="70" style="overflow:visible"><rect x="8" y="12" width="760" height="56" rx="10" fill="rgba(5,12,40,.35)"/><rect x="0" y="0" width="760" height="40" rx="10" fill="#C98A4A" stroke="${INK}" stroke-width="5"/><path d="M20 14 h300 M380 24 h340" stroke="#a86a30" stroke-width="4" stroke-linecap="round"/><rect x="40" y="38" width="30" height="30" fill="#8a5428" stroke="${INK}" stroke-width="4"/><rect x="690" y="38" width="30" height="30" fill="#8a5428" stroke="${INK}" stroke-width="4"/></svg>`;
A.noDrop = () => `<svg viewBox="-60 -60 120 120" width="120" height="120" style="overflow:visible"><circle r="54" fill="${CREAM}" stroke="${INK}" stroke-width="5"/><path d="M0 -36 Q26 0 26 14 A26 26 0 0 1 -26 14 Q-26 0 0 -36 Z" fill="#86B8F2" stroke="${INK}" stroke-width="4"/><path d="M-38 -38 L38 38" stroke="${RED}" stroke-width="11" stroke-linecap="round"/></svg>`;
A.tile = (emoji, sub, c = BLUE) => `<div style="width:200px;height:200px;border-radius:36px;background:${CREAM};border:5px solid #D4A74A;box-shadow:0 8px 0 rgba(8,16,48,.4);display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="font-size:96px;line-height:1">${emoji}</div><div style="font-family:Fredoka;font-weight:700;font-size:32px;color:${c};margin-top:6px">${sub}</div></div>`;
