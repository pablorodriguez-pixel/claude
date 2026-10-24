/* LA LATA DE LA ABUELA — Ep. 3 «Lo que haces mal en la cocina»: ilustraciones nuevas */
const RAW = '#F6BFB3', RAW2 = '#E9A497', COOK = '#D98A3D', COOK2 = '#B5652A';
const WATER = '#9CCBF5', WATER2 = '#3f7fd0';

A.defs3 = `<svg width="0" height="0" style="position:absolute"><defs>
<pattern id="ging" patternUnits="userSpaceOnUse" width="28" height="28"><rect width="28" height="28" fill="#FFFDF6"/><rect width="14" height="28" fill="rgba(200,16,46,.45)"/><rect width="28" height="14" fill="rgba(200,16,46,.45)"/></pattern>
<pattern id="tiles" patternUnits="userSpaceOnUse" width="72" height="72"><rect width="72" height="72" fill="#EAF1FA"/><path d="M0 0.5 H72 M0.5 0 V72" stroke="#cfdcee" stroke-width="3"/><circle cx="36" cy="36" r="5" fill="#d6e3f4"/></pattern>
<pattern id="hex" patternUnits="userSpaceOnUse" width="30" height="26"><path d="M7.5 1 L22.5 1 L30 13 L22.5 25 L7.5 25 L0 13 Z" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="2"/></pattern>
<linearGradient id="shieldG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7FE3FF"/><stop offset=".45" stop-color="#FFFFFF"/><stop offset=".6" stop-color="#9BE7FF"/><stop offset="1" stop-color="#3FA9E8"/></linearGradient>
<linearGradient id="fridgeIn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4FBFF"/><stop offset="1" stop-color="#BFDDF5"/></linearGradient>
<radialGradient id="flameG" cx=".5" cy=".75" r=".7"><stop offset="0" stop-color="#FFF1A8"/><stop offset=".45" stop-color="#F2983E"/><stop offset="1" stop-color="#F25244"/></radialGradient>
</defs></svg>`;

/* muslo de pollo con carita (c = color carne) */
A.chicken = (c = RAW, c2 = RAW2, face = 'worry') => {
  const dots = [[110, 120], [140, 92], [178, 80], [96, 168], [130, 205], [176, 226], [220, 214], [250, 104], [270, 150], [210, 100]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.5" fill="${c2}"/>`).join('');
  const mouth = face === 'happy' ? `<path d="M158 188 Q181 212 204 188" stroke="${INK}" stroke-width="6" fill="#B5122C" stroke-linejoin="round"/>`
    : `<path d="M162 196 Q181 184 200 196" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  return `<svg viewBox="0 0 440 300" width="440" height="300" style="overflow:visible">
  <ellipse cx="200" cy="282" rx="170" ry="18" fill="rgba(5,12,40,.25)"/>
  <path d="M300 122 L392 128 L396 170 L306 184 Z" fill="#FFF7EA" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  <circle cx="400" cy="122" r="24" fill="#FFF7EA" stroke="${INK}" stroke-width="6"/><circle cx="404" cy="174" r="24" fill="#FFF7EA" stroke="${INK}" stroke-width="6"/>
  <path d="M384 132 L388 166" stroke="#FFF7EA" stroke-width="16"/>
  <path d="M48 160 C44 70 140 30 226 54 C276 68 300 100 318 124 L322 182 C296 212 262 238 214 254 C128 282 52 246 48 160 Z" fill="${c}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M84 120 C100 80 150 62 196 66" stroke="#fff" stroke-width="12" opacity=".45" fill="none" stroke-linecap="round"/>
  ${dots}
  <g class="face">
   <ellipse cx="156" cy="150" rx="10" ry="13" fill="#2a1d1a"/><ellipse cx="206" cy="150" rx="10" ry="13" fill="#2a1d1a"/>
   <circle cx="160" cy="145" r="3.5" fill="#fff"/><circle cx="210" cy="145" r="3.5" fill="#fff"/>
   ${face === 'worry' ? `<path d="M140 124 Q152 116 166 122 M196 122 Q210 116 222 124" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>` : ''}
   <circle cx="132" cy="182" r="11" fill="#F08A8A" opacity=".55"/><circle cx="232" cy="182" r="11" fill="#F08A8A" opacity=".55"/>
   ${mouth}
  </g>
</svg>`;
};

/* bacteria-personajito (simpática) */
A.bact = (c = '#7BC96F', c2 = '#4d9a45', mood = 'grin') => {
  let d = ''; const n = 11;
  for (let i = 0; i <= n; i++) { const a = i / n * Math.PI * 2; const r = 40; const x = r * Math.cos(a), y = r * Math.sin(a) * 0.92; d += (i ? ' Q' + f1(46 * Math.cos(a - Math.PI / n)) + ' ' + f1(46 * 0.92 * Math.sin(a - Math.PI / n)) + ' ' : 'M') + f1(x) + ' ' + f1(y); }
  let cil = ''; for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2 + 0.3; cil += `<path d="M${f1(44 * Math.cos(a))} ${f1(42 * Math.sin(a))} L${f1(56 * Math.cos(a))} ${f1(54 * Math.sin(a))}" />`; }
  const m = mood === 'grin' ? `<path d="M-17 10 Q0 30 17 10 Z" fill="#5a1520" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><path d="M-8 11 h7 v6 h-7 Z" fill="#fff"/>`
    : mood === 'scared' ? `<ellipse cx="0" cy="17" rx="9" ry="11" fill="#5a1520" stroke="${INK}" stroke-width="4"/>`
      : `<path d="M-12 18 Q0 8 12 18" stroke="${INK}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
  return `<svg viewBox="-64 -64 128 128" width="128" height="128" style="overflow:visible">
  <g stroke="${INK}" stroke-width="4.5" stroke-linecap="round">${cil}</g>
  <path d="${d} Z" fill="${c}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <circle cx="-22" cy="-22" r="6" fill="${c2}"/><circle cx="24" cy="20" r="5" fill="${c2}"/><circle cx="-26" cy="18" r="4" fill="${c2}"/>
  <path d="M-24 -30 q10 -10 22 -8" stroke="#fff" stroke-width="5" opacity=".5" fill="none" stroke-linecap="round"/>
  ${mood === 'scared' ? `<path d="M-24 -20 l12 6 M24 -20 l-12 6" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>` : `<path d="M-22 -18 l12 -4 M22 -18 l-12 -4" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`}
  <circle cx="-12" cy="-4" r="10" fill="#fff" stroke="${INK}" stroke-width="3.5"/><circle cx="12" cy="-4" r="10" fill="#fff" stroke="${INK}" stroke-width="3.5"/>
  <circle cx="${mood === 'scared' ? -12 : -10}" cy="-3" r="4.8" fill="${INK}"/><circle cx="${mood === 'scared' ? 12 : 14}" cy="-3" r="4.8" fill="${INK}"/>
  ${m}
</svg>`;
};
/* fantasmita de bacteria (se muere: con aureola) */
A.ghost = () => `<svg viewBox="-60 -80 120 150" width="120" height="150" style="overflow:visible">
  <ellipse cx="0" cy="-62" rx="26" ry="8" fill="none" stroke="url(#goldG)" stroke-width="7"/>
  <path d="M-34 40 L-34 -10 A34 34 0 0 1 34 -10 L34 40 L22 30 L11 40 L0 30 L-11 40 L-22 30 Z" fill="#FFFFFF" fill-opacity=".9" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>
  <path d="M-20 -8 q6 -6 12 0 M8 -8 q6 -6 12 0" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M-8 10 q8 6 16 0" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>
</svg>`;

/* cocina: pared de azulejos, encimera, fregadero, grifo, trapo (860x620) */
A.kitchen = () => `<svg viewBox="0 0 860 620" width="860" height="620" style="overflow:visible">
  <defs><clipPath id="kClip"><rect x="0" y="0" width="860" height="620" rx="40"/></clipPath></defs>
  <rect x="10" y="14" width="860" height="620" rx="40" fill="rgba(5,12,40,.35)"/>
  <g clip-path="url(#kClip)">
   <rect width="860" height="620" fill="url(#tiles)"/>
   <rect x="560" y="150" width="250" height="14" rx="6" fill="#B07B45" stroke="${INK}" stroke-width="4"/>
   ${[[590, '#C8102E'], [660, '#2A4FA8'], [730, '#2f9e5b']].map(([x, c]) => `<rect x="${x}" y="78" width="54" height="72" rx="12" fill="#FFFDF6" stroke="${INK}" stroke-width="4"/><rect x="${x - 3}" y="68" width="60" height="18" rx="6" fill="${c}" stroke="${INK}" stroke-width="4"/><rect x="${x + 10}" y="100" width="34" height="26" rx="4" fill="#F2D28B" opacity=".8"/>`).join('')}
   <rect x="-10" y="398" width="880" height="60" fill="#F4E3C3" stroke="${INK}" stroke-width="5"/>
   <path d="M0 412 H860" stroke="#fff" stroke-width="5" opacity=".5"/>
   <rect x="-10" y="456" width="880" height="20" fill="#D9BE8E" stroke="${INK}" stroke-width="5"/>
   <rect x="-10" y="474" width="880" height="160" fill="${BLUE2}" stroke="${INK}" stroke-width="5"/>
   ${[20, 300, 580].map(x => `<rect x="${x}" y="496" width="260" height="140" rx="16" fill="none" stroke="#F2D28B" stroke-width="4" opacity=".75"/><circle cx="${x + 130}" cy="520" r="9" fill="url(#goldG)" stroke="${INK}" stroke-width="3"/>`).join('')}
   <rect x="90" y="394" width="390" height="46" rx="18" fill="url(#silverG)" stroke="${INK}" stroke-width="5"/>
   <rect x="110" y="403" width="350" height="26" rx="12" fill="#4b5263" stroke="${INK}" stroke-width="3"/>
   <path d="M120 409 H450" stroke="#7d8698" stroke-width="4"/>
   <rect x="600" y="490" width="230" height="14" rx="7" fill="url(#silverG)" stroke="${INK}" stroke-width="4"/>
   <g class="towel"><path d="M640 494 L790 494 L792 610 Q716 624 640 612 Z" fill="url(#ging)" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><rect x="636" y="490" width="158" height="26" rx="8" fill="#FFFDF6" stroke="${INK}" stroke-width="4"/></g>
  </g>
  <rect x="0" y="0" width="860" height="620" rx="40" fill="none" stroke="${INK}" stroke-width="6"/>
  <rect x="10" y="10" width="840" height="600" rx="32" fill="none" stroke="#D4A74A" stroke-width="3" opacity=".6"/>
  <g>
   <rect x="250" y="384" width="70" height="20" rx="8" fill="url(#silverG)" stroke="${INK}" stroke-width="4"/>
   <path d="M285 390 L285 190 Q285 140 335 140 Q385 140 385 190 L385 210" fill="none" stroke="${INK}" stroke-width="38" stroke-linecap="round"/>
   <path d="M285 390 L285 190 Q285 140 335 140 Q385 140 385 190 L385 210" fill="none" stroke="url(#silverG)" stroke-width="26" stroke-linecap="round"/>
   <path d="M277 360 L277 200" stroke="#fff" stroke-width="5" opacity=".6" stroke-linecap="round"/>
   <rect x="368" y="204" width="34" height="18" rx="5" fill="#7d8698" stroke="${INK}" stroke-width="4"/>
   <path d="M285 300 L230 282" stroke="${INK}" stroke-width="22" stroke-linecap="round"/><path d="M285 300 L230 282" stroke="${RED}" stroke-width="12" stroke-linecap="round"/>
  </g>
</svg>`;

/* sartén (3/4) + fogón */
A.pan = () => `<svg viewBox="0 0 700 300" width="700" height="300" style="overflow:visible">
  <ellipse cx="270" cy="250" rx="250" ry="40" fill="rgba(5,12,40,.35)"/>
  <path d="M470 118 L680 92 Q696 92 696 106 L696 124 Q696 136 682 138 L476 150 Z" fill="#7a4f2a" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  <circle cx="668" cy="114" r="8" fill="${INK}"/>
  <path d="M30 124 L46 190 Q60 240 270 244 Q480 240 494 190 L510 124 Z" fill="#2b2f3a" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M60 196 Q160 226 280 226" stroke="#555c6c" stroke-width="7" fill="none" stroke-linecap="round"/>
  <ellipse cx="270" cy="124" rx="240" ry="78" fill="#3c4250" stroke="${INK}" stroke-width="6"/>
  <ellipse cx="270" cy="128" rx="208" ry="62" fill="#23262f"/>
  <path d="M110 100 Q170 76 250 72" stroke="#6f7787" stroke-width="7" fill="none" stroke-linecap="round" opacity=".7"/>
</svg>`;
A.flameOne = () => `<svg viewBox="-40 -100 80 110" width="80" height="110" style="overflow:visible"><path d="M0 8 Q-34 4 -32 -26 Q-30 -50 -8 -92 Q-4 -60 10 -54 Q8 -76 20 -84 Q36 -50 32 -24 Q30 6 0 8 Z" fill="url(#flameG)" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/><path d="M0 2 Q-14 0 -12 -16 Q-10 -28 0 -42 Q4 -26 12 -22 Q14 0 0 2 Z" fill="#FFF1A8"/></svg>`;
A.burner = () => `<svg viewBox="0 0 560 70" width="560" height="70" style="overflow:visible"><rect x="0" y="16" width="560" height="54" rx="20" fill="#2b2f3a" stroke="${INK}" stroke-width="6"/><rect x="120" y="4" width="320" height="22" rx="10" fill="#5d6474" stroke="${INK}" stroke-width="5"/>${[60, 500].map(x => `<circle cx="${x}" cy="44" r="14" fill="url(#silverG)" stroke="${INK}" stroke-width="4"/>`).join('')}</svg>`;

/* huevo con carita (mH feliz / mS triste) */
A.egg = () => `<svg viewBox="0 0 240 300" width="240" height="300" style="overflow:visible">
  <ellipse cx="124" cy="290" rx="92" ry="12" fill="rgba(5,12,40,.3)"/>
  <path d="M120 12 C192 12 228 128 228 188 C228 252 182 290 120 290 C58 290 12 252 12 188 C12 128 48 12 120 12 Z" fill="#EDC9A0" stroke="${INK}" stroke-width="6"/>
  <path d="M70 80 Q90 40 120 34" stroke="#fff" stroke-width="12" opacity=".5" fill="none" stroke-linecap="round"/>
  <circle cx="160" cy="236" r="4" fill="#d1a879"/><circle cx="62" cy="214" r="3.5" fill="#d1a879"/><circle cx="176" cy="120" r="3" fill="#d1a879"/>
  <ellipse cx="92" cy="170" rx="10" ry="13" fill="#2a1d1a"/><ellipse cx="148" cy="170" rx="10" ry="13" fill="#2a1d1a"/>
  <circle cx="96" cy="165" r="3.5" fill="#fff"/><circle cx="152" cy="165" r="3.5" fill="#fff"/>
  <circle cx="70" cy="200" r="12" fill="#F08A8A" opacity=".5"/><circle cx="170" cy="200" r="12" fill="#F08A8A" opacity=".5"/>
  <g class="mH"><path d="M98 202 Q120 226 142 202" stroke="${INK}" stroke-width="6" fill="#B5122C" stroke-linejoin="round"/></g>
  <g class="mS" opacity="0"><path d="M100 216 Q120 198 140 216" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M74 146 L100 152 M166 146 L140 152" stroke="${INK}" stroke-width="5" stroke-linecap="round"/></g>
</svg>`;
/* escudo brillante alrededor del huevo */
A.shield = () => `<svg viewBox="0 0 300 360" width="300" height="360" style="overflow:visible">
  <path d="M150 8 C240 8 286 150 286 222 C286 300 228 348 150 348 C72 348 14 300 14 222 C14 150 60 8 150 8 Z" fill="rgba(127,227,255,.22)" stroke="url(#shieldG)" stroke-width="12"/>
  <path d="M150 8 C240 8 286 150 286 222 C286 300 228 348 150 348 C72 348 14 300 14 222 C14 150 60 8 150 8 Z" fill="url(#hex)" opacity=".7"/>
  <path d="M150 8 C240 8 286 150 286 222 C286 300 228 348 150 348 C72 348 14 300 14 222 C14 150 60 8 150 8 Z" fill="none" stroke="#1b6fa8" stroke-width="3" opacity=".6"/>
  <path d="M60 110 Q90 40 150 26" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".8"/>
</svg>`;
/* esponja */
A.sponge = () => `<svg viewBox="0 0 240 150" width="240" height="150" style="overflow:visible">
  <rect x="10" y="44" width="220" height="96" rx="22" fill="#FFD84D" stroke="${INK}" stroke-width="6"/>
  <rect x="10" y="16" width="220" height="40" rx="16" fill="#3E9B4F" stroke="${INK}" stroke-width="6"/>
  ${[[50, 86], [90, 110], [140, 80], [186, 112], [120, 120], [70, 120], [200, 80]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${5 + (i % 3) * 2}" fill="#e3b524"/>`).join('')}
  <circle cx="96" cy="90" r="6" fill="${INK}"/><circle cx="144" cy="90" r="6" fill="${INK}"/><path d="M104 108 Q120 120 136 108" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>
</svg>`;
A.bubble = (r = 22) => `<svg viewBox="-30 -30 60 60" width="60" height="60" style="overflow:visible"><circle r="${r}" fill="rgba(255,255,255,.35)" stroke="#fff" stroke-width="4"/><path d="M${-r * 0.5} ${-r * 0.3} q4 -8 12 -9" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`;

/* nevera abierta */
A.fridge = () => `<svg viewBox="0 0 380 560" width="380" height="560" style="overflow:visible">
  <rect x="30" y="20" width="350" height="540" rx="34" fill="rgba(5,12,40,.35)"/>
  <rect x="20" y="10" width="340" height="530" rx="34" fill="#F4F7FB" stroke="${INK}" stroke-width="6"/>
  <rect x="44" y="34" width="292" height="482" rx="20" fill="url(#fridgeIn)" stroke="${INK}" stroke-width="4"/>
  <path d="M44 210 H336 M44 370 H336" stroke="#9cc2e4" stroke-width="10"/><path d="M44 205 H336 M44 365 H336" stroke="#fff" stroke-width="3"/>
  <rect x="70" y="110" width="40" height="96" rx="10" fill="#FFFDF6" stroke="${INK}" stroke-width="4"/><rect x="74" y="96" width="32" height="18" rx="5" fill="${BLUE2}" stroke="${INK}" stroke-width="4"/>
  <rect x="250" y="148" width="64" height="58" rx="10" fill="#F2D28B" stroke="${INK}" stroke-width="4"/>
  <rect x="90" y="300" width="70" height="64" rx="12" fill="#C9E7C0" stroke="${INK}" stroke-width="4"/>
  <rect x="70" y="440" width="240" height="70" rx="14" fill="rgba(255,255,255,.6)" stroke="#9cc2e4" stroke-width="4"/>
  <circle cx="190" cy="60" r="10" fill="#FFF7C4" stroke="#e8d27a" stroke-width="3"/>
  <path d="M-80 20 L20 10 L20 540 L-80 520 Z" fill="#E6ECF4" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-62 120 L6 116 M-62 300 L6 300 M-62 460 L6 462" stroke="#9cc2e4" stroke-width="8"/>
  <rect x="-40" y="230" width="14" height="80" rx="7" fill="url(#silverG)" stroke="${INK}" stroke-width="3"/>
</svg>`;

/* tomate con carita: opt.scarf, opt.ripe */
A.tomato = (opt = {}) => {
  const c = opt.ripe ? '#A8101C' : '#E8382E', c2 = opt.ripe ? '#7d0b15' : '#c42a22';
  return `<svg viewBox="-120 -120 240 240" width="240" height="240" style="overflow:visible">
  <ellipse cx="4" cy="96" rx="86" ry="12" fill="rgba(5,12,40,.3)"/>
  <path d="M0 -70 C40 -84 96 -60 98 -2 C100 54 56 90 0 90 C-56 90 -100 54 -98 -2 C-96 -60 -40 -84 0 -70 Z" fill="${c}" stroke="${INK}" stroke-width="6"/>
  <path d="M-40 -64 Q-30 0 -36 70 M40 -64 Q30 0 36 70" stroke="${c2}" stroke-width="4" fill="none" opacity=".6"/>
  <ellipse cx="-50" cy="-30" rx="16" ry="24" fill="#fff" opacity=".35" transform="rotate(25 -50 -30)"/>
  ${opt.ripe ? `<circle cx="56" cy="30" r="9" fill="#6b0a12" opacity=".6"/><circle cx="-62" cy="40" r="6" fill="#6b0a12" opacity=".6"/>` : ''}
  <path d="M0 -70 L-14 -94 L-4 -76 L-40 -86 L-10 -66 L-34 -50 L0 -60 L34 -50 L10 -66 L40 -86 L4 -76 L14 -94 Z" fill="#3E9B4F" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>
  <path d="M0 -76 Q2 -96 12 -104" stroke="#2e7a3c" stroke-width="8" fill="none" stroke-linecap="round"/>
  <ellipse cx="-28" cy="0" rx="9" ry="12" fill="#2a1d1a"/><ellipse cx="28" cy="0" rx="9" ry="12" fill="#2a1d1a"/>
  <circle cx="-25" cy="-5" r="3.5" fill="#fff"/><circle cx="31" cy="-5" r="3.5" fill="#fff"/>
  <circle cx="-52" cy="26" r="11" fill="#FFB3B3" opacity=".55"/><circle cx="52" cy="26" r="11" fill="#FFB3B3" opacity=".55"/>
  <g class="mH"><path d="M-22 26 Q0 50 22 26" stroke="${INK}" stroke-width="6" fill="#5a1520" stroke-linejoin="round"/></g>
  <g class="mS" opacity="0"><path d="M-20 40 Q0 24 20 40" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M-46 -26 L-16 -16 M46 -26 L16 -16" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M-40 14 q-6 14 0 20 q6 -6 0 -20 Z" fill="#9CCBF5" stroke="${INK}" stroke-width="3"/></g>
  ${opt.scarf ? `<g class="scarf"><path d="M-92 34 Q0 70 92 34 L96 58 Q0 98 -96 58 Z" fill="${BLUE2}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
   <path d="M-60 54 L-56 72 M-20 64 L-18 82 M20 64 L18 82 M60 54 L56 72" stroke="#FBF3E2" stroke-width="7"/>
   <path d="M50 60 L76 128 L52 132 L36 66 Z" fill="${BLUE2}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M58 92 L72 90 M64 110 L76 108" stroke="#FBF3E2" stroke-width="6"/>
   <path d="M-30 -96 Q0 -132 30 -96 Z" fill="${RED}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><circle cx="0" cy="-124" r="12" fill="#FBF3E2" stroke="${INK}" stroke-width="4"/><rect x="-36" y="-102" width="72" height="16" rx="8" fill="#FBF3E2" stroke="${INK}" stroke-width="4"/></g>` : ''}
</svg>`;
};

/* frutero (cerámica con franja azul) con fruta detrás */
A.bowl = () => `<svg viewBox="0 0 400 240" width="400" height="240" style="overflow:visible">
  <ellipse cx="204" cy="226" rx="150" ry="14" fill="rgba(5,12,40,.3)"/>
  <path d="M70 92 Q110 12 190 34 Q160 60 150 96 Z" fill="#FFD84D" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <circle cx="290" cy="70" r="40" fill="#F2983E" stroke="${INK}" stroke-width="5"/><circle cx="278" cy="58" r="8" fill="#fff" opacity=".4"/>
  <circle cx="226" cy="60" r="36" fill="#9BCB5A" stroke="${INK}" stroke-width="5"/><path d="M226 26 q4 -14 14 -18" stroke="#6b4a2a" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M14 96 L386 96 Q376 214 200 218 Q24 214 14 96 Z" fill="#FBF3E2" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M26 128 Q200 150 374 128" stroke="${BLUE2}" stroke-width="14" fill="none"/>
  ${[60, 110, 160, 210, 260, 310].map(x => `<circle cx="${x + 20}" cy="${f1(178 - Math.abs(x + 20 - 200) * 0.08)}" r="7" fill="#F2D28B" stroke="${INK}" stroke-width="2.5"/>`).join('')}
  <rect x="6" y="88" width="388" height="16" rx="8" fill="#FBF3E2" stroke="${INK}" stroke-width="5"/>
</svg>`;

/* tabla de cortar */
A.cutBoard = (c, c2) => `<svg viewBox="0 0 420 290" width="420" height="290" style="overflow:visible">
  <rect x="14" y="30" width="360" height="256" rx="34" fill="rgba(5,12,40,.35)"/>
  <rect x="334" y="104" width="80" height="80" rx="28" fill="${c}" stroke="${INK}" stroke-width="6"/><circle cx="384" cy="144" r="13" fill="#0f1d48" stroke="${INK}" stroke-width="4"/>
  <rect x="4" y="18" width="360" height="256" rx="34" fill="${c}" stroke="${INK}" stroke-width="6"/>
  <rect x="22" y="36" width="324" height="220" rx="24" fill="none" stroke="${c2}" stroke-width="5"/>
  <path d="M50 60 Q90 52 140 62 M210 230 Q260 222 320 232" stroke="#fff" stroke-width="7" opacity=".35" fill="none" stroke-linecap="round"/>
</svg>`;
A.salad = () => `<svg viewBox="0 0 280 190" width="280" height="190" style="overflow:visible">
  ${[[60, 70, '#6FBF4A'], [110, 46, '#8fd35f'], [170, 50, '#6FBF4A'], [220, 72, '#8fd35f'], [140, 70, '#5aa83b']].map(([x, y, c]) => `<path d="M${x - 42} ${y + 40} Q${x - 46} ${y - 10} ${x} ${y - 24} Q${x + 46} ${y - 10} ${x + 42} ${y + 40} Z" fill="${c}" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>`).join('')}
  <circle cx="96" cy="88" r="22" fill="#E8382E" stroke="${INK}" stroke-width="4"/><circle cx="96" cy="88" r="12" fill="#ff7b6b"/>
  <circle cx="186" cy="84" r="20" fill="#d8f0a8" stroke="${INK}" stroke-width="4"/><circle cx="186" cy="84" r="9" fill="#b9dd7c"/>
  <path d="M10 98 L270 98 Q262 182 140 186 Q18 182 10 98 Z" fill="#FFFFFF" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M24 122 Q140 140 256 122" stroke="#2f9e5b" stroke-width="10" fill="none"/>
  <rect x="2" y="90" width="276" height="16" rx="8" fill="#FFFFFF" stroke="${INK}" stroke-width="5"/>
</svg>`;

/* candado con cara de sorpresa */
A.lockWow = () => `<svg viewBox="0 0 240 280" width="240" height="280" style="overflow:visible"><g class="shackle"><path d="M60 128 V80 a60 60 0 0 1 120 0 V128" fill="none" stroke="${INK}" stroke-width="40" stroke-linecap="round"/><path d="M60 128 V80 a60 60 0 0 1 120 0 V128" fill="none" stroke="url(#silverG)" stroke-width="26" stroke-linecap="round"/></g>
 <rect x="18" y="118" width="204" height="152" rx="30" fill="url(#goldG)" stroke="${INK}" stroke-width="8"/><rect x="34" y="132" width="20" height="120" rx="10" fill="#fff" opacity=".35"/>
 <path d="M70 160 Q88 146 106 156 M170 160 Q152 146 134 156" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/>
 <circle cx="90" cy="190" r="14" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="150" cy="190" r="14" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="90" cy="192" r="7" fill="${INK}"/><circle cx="150" cy="192" r="7" fill="${INK}"/>
 <ellipse cx="120" cy="236" rx="16" ry="20" fill="#5a1520" stroke="${INK}" stroke-width="6"/>
 <circle cx="58" cy="226" r="12" fill="${WR}" opacity=".5"/><circle cx="182" cy="226" r="12" fill="${WR}" opacity=".5"/></svg>`;
A.wow = () => `<svg viewBox="0 0 120 120" width="120" height="120" style="overflow:visible"><circle cx="60" cy="60" r="50" fill="#F2D28B" stroke="${INK}" stroke-width="6"/><path d="M30 36 Q42 28 54 34 M90 36 Q78 28 66 34" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="44" cy="56" r="8" fill="${INK}"/><circle cx="76" cy="56" r="8" fill="${INK}"/><ellipse cx="60" cy="88" rx="11" ry="14" fill="#5a1520" stroke="${INK}" stroke-width="5"/></svg>`;
/* copo de nieve simple */
A.flake = () => `<svg viewBox="-30 -30 60 60" width="60" height="60"><g stroke="#FFFFFF" stroke-width="5" stroke-linecap="round">${[0, 60, 120].map(a => `<g transform="rotate(${a})"><path d="M0 -24 V24 M-7 -17 L0 -11 L7 -17 M-7 17 L0 11 L7 17"/></g>`).join('')}</g></svg>`;
A.sparkle = (c = '#FFF1C4') => `<svg viewBox="-30 -30 60 60" width="60" height="60"><path d="M0 -28 Q4 -4 28 0 Q4 4 0 28 Q-4 4 -28 0 Q-4 -4 0 -28 Z" fill="${c}" stroke="#8a6420" stroke-width="3"/></svg>`;
A.arrow = () => `<svg viewBox="0 0 520 200" width="520" height="200" style="overflow:visible">
  <path class="arr" d="M20 150 Q260 -40 470 130" fill="none" stroke="${CREAM}" stroke-width="14" stroke-dasharray="30 20" stroke-linecap="round"/>
  <path d="M430 90 L486 142 L414 160" fill="none" stroke="${CREAM}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
