/* LA LATA DE LA ABUELA — Ep. 5 «El número del huevo»: ilustraciones nuevas */
const GRASS = '#7BC96F', GRASS2 = '#4d9a45', HEN = '#C9733A', HEN2 = '#9a4f22', COMB = '#D7263D', BEAK = '#F2B035';

A.defs5 = `<svg width="0" height="0" style="position:absolute"><defs>
<radialGradient id="shellG" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#FBE9D0"/><stop offset=".55" stop-color="#EBC9A0"/><stop offset="1" stop-color="#C99868"/></radialGradient>
<linearGradient id="sky5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7FB6EE"/><stop offset="1" stop-color="#FDF0CF"/></linearGradient>
<linearGradient id="barnW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5a34"/><stop offset="1" stop-color="#5e3a1f"/></linearGradient>
<linearGradient id="beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF1C4" stop-opacity=".55"/><stop offset="1" stop-color="#FFF1C4" stop-opacity="0"/></linearGradient>
<linearGradient id="cageBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3f4f"/><stop offset="1" stop-color="#1c2030"/></linearGradient>
<pattern id="straw" patternUnits="userSpaceOnUse" width="60" height="30"><rect width="60" height="30" fill="#E2B85C"/><path d="M4 22 L22 12 M30 26 L52 18 M14 8 L30 4 M40 10 L58 6" stroke="#b98a2e" stroke-width="3" stroke-linecap="round"/></pattern>
</defs></svg>`;

/* huevo grande, sin cara (el código va encima en HTML) */
A.bigEgg = () => `<svg viewBox="0 0 520 640" width="520" height="640" style="overflow:visible">
  <ellipse cx="268" cy="628" rx="200" ry="22" fill="rgba(5,12,40,.35)"/>
  <path d="M260 14 C416 14 504 262 504 392 C504 532 404 616 260 616 C116 616 16 532 16 392 C16 262 104 14 260 14 Z" fill="url(#shellG)" stroke="${INK}" stroke-width="8"/>
  <path d="M120 170 Q160 82 236 62" stroke="#fff" stroke-width="22" opacity=".55" fill="none" stroke-linecap="round"/>
  <path d="M96 236 Q102 214 112 200" stroke="#fff" stroke-width="14" opacity=".45" fill="none" stroke-linecap="round"/>
  ${[[370, 500, 5], [140, 470, 4], [400, 250, 4], [330, 120, 3], [190, 560, 3.5], [440, 380, 3]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#b98a5a" opacity=".7"/>`).join('')}
</svg>`;

/* gallina (mood: happy | sad | walk) */
A.hen = (mood = 'happy', body = HEN, body2 = HEN2) => `<svg viewBox="0 0 260 250" width="260" height="250" style="overflow:visible">
  <ellipse cx="128" cy="236" rx="86" ry="12" fill="rgba(5,12,40,.28)"/>
  <g stroke="#E08A1E" stroke-width="7" stroke-linecap="round" fill="none"><path d="M106 196 L102 232 M102 232 L88 238 M102 232 L112 240"/><path d="M146 196 L150 232 M150 232 L138 240 M150 232 L162 238"/></g>
  <path d="M40 120 Q8 70 34 44 Q44 86 66 96 Z" fill="${body2}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M36 128 Q18 92 46 66 Q52 100 72 108 Z" fill="${body}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M50 140 C50 92 96 80 150 86 C186 52 230 60 230 104 C230 128 214 140 204 150 C204 196 170 210 128 210 C80 210 50 186 50 140 Z" fill="${body}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M86 140 Q120 120 156 142 Q132 176 92 166 Z" fill="${body2}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M100 150 Q120 146 138 152 M98 160 Q116 158 130 162" stroke="${INK}" stroke-width="3" fill="none" opacity=".5"/>
  <path d="M172 62 Q174 40 190 46 Q196 28 210 38 Q222 30 226 48 Q236 52 228 68 Z" fill="${COMB}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M226 96 L254 106 L226 116 Z" fill="${BEAK}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M222 118 Q234 140 220 146 Q208 140 214 120 Z" fill="${COMB}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <g class="eye"><circle cx="204" cy="92" r="9" fill="#1a1414"/><circle cx="207" cy="89" r="3.2" fill="#fff"/></g>
  <circle cx="192" cy="114" r="9" fill="#F08A8A" opacity=".55"/>
  ${mood === 'sad' ? `<path d="M190 72 L216 80" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M206 104 Q210 118 204 124 Q198 118 206 104 Z" fill="#9CCBF5" stroke="#3f7fd0" stroke-width="2"/>` : `<path d="M192 74 Q204 68 216 74" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`}
</svg>`;

/* fondos de tarjeta 900x700 */
const CW = 900, CH = 700;
const hills = (y, c, c2) => `<path d="M0 ${y} Q180 ${y - 80} 380 ${y - 20} T900 ${y - 40} V700 H0 Z" fill="${c}" stroke="${INK}" stroke-width="5"/><path d="M0 ${y + 90} Q240 ${y + 20} 520 ${y + 70} T900 ${y + 60} V700 H0 Z" fill="${c2}" stroke="${INK}" stroke-width="5"/>`;
const flowers = (pts) => pts.map(([x, y, c]) => `<g transform="translate(${x} ${y})"><path d="M0 0 V26" stroke="${GRASS2}" stroke-width="4"/>${[0, 72, 144, 216, 288].map(a => `<circle cx="${f1(9 * Math.cos(a * Math.PI / 180))}" cy="${f1(9 * Math.sin(a * Math.PI / 180))}" r="7" fill="${c}"/>`).join('')}<circle r="5" fill="#F2B035"/></g>`).join('');
const cloud = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 40 Q0 10 32 14 Q44 -10 74 4 Q104 -6 112 24 Q140 26 136 48 Q132 60 112 60 H18 Q0 60 0 40 Z" fill="#fff" stroke="${INK}" stroke-width="4" opacity=".95"/></g>`;
A.field = (opt = {}) => `<svg viewBox="0 0 ${CW} ${CH}" width="${CW}" height="${CH}" style="overflow:visible">
  <rect width="${CW}" height="${CH}" fill="url(#sky5)"/>
  <g class="sun"><circle cx="740" cy="130" r="64" fill="#FFD25A" stroke="${INK}" stroke-width="5"/>${Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2; return `<path d="M${f1(740 + 82 * Math.cos(a))} ${f1(130 + 82 * Math.sin(a))} L${f1(740 + 104 * Math.cos(a))} ${f1(130 + 104 * Math.sin(a))}" stroke="#F2B035" stroke-width="9" stroke-linecap="round"/>`; }).join('')}</g>
  ${cloud(90, 90, 1.1)}${cloud(420, 150, 0.8)}
  ${opt.house ? `<g transform="translate(70 250)"><path d="M0 120 L90 40 L180 120 Z" fill="${RED}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><rect x="18" y="118" width="144" height="130" fill="#F4E1BE" stroke="${INK}" stroke-width="6"/><path d="M66 248 V180 Q90 160 114 180 V248 Z" fill="#5e3a1f" stroke="${INK}" stroke-width="5"/><path d="M60 248 L40 300 H140 L120 248" fill="#d9c08a" opacity=".7"/></g>` : ''}
  ${hills(430, '#9DD88F', GRASS)}
  ${opt.fence ? `<g>${Array.from({ length: 10 }, (_, i) => `<rect x="${20 + i * 96}" y="${560 - (i % 2) * 6}" width="22" height="110" rx="6" fill="#E9D3A6" stroke="${INK}" stroke-width="4"/>`).join('')}<rect x="0" y="584" width="900" height="16" fill="#E9D3A6" stroke="${INK}" stroke-width="4"/><rect x="0" y="630" width="900" height="16" fill="#E9D3A6" stroke="${INK}" stroke-width="4"/></g>` : ''}
  ${flowers([[120, 520, '#fff'], [300, 600, '#F08A8A'], [560, 540, '#fff'], [800, 590, '#D08EEB'], [660, 640, '#fff'], [40, 640, '#F08A8A']])}
</svg>`;
A.barn = () => `<svg viewBox="0 0 ${CW} ${CH}" width="${CW}" height="${CH}" style="overflow:visible">
  <rect width="${CW}" height="${CH}" fill="url(#barnW)"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M${i * 80 + 40} 0 V480" stroke="#4a2c15" stroke-width="5" opacity=".6"/>`).join('')}
  <path d="M0 70 H900" stroke="#4a2c15" stroke-width="18"/><path d="M0 70 H900" stroke="#9b6a40" stroke-width="6"/>
  ${[180, 450, 720].map(x => `<g><rect x="${x - 60}" y="120" width="120" height="90" rx="10" fill="#FFE9A8" stroke="${INK}" stroke-width="6"/><path d="M${x} 120 V210 M${x - 60} 165 H${x + 60}" stroke="${INK}" stroke-width="5"/><path d="M${x - 60} 210 L${x - 130} 560 H${x + 110} L${x + 60} 210 Z" fill="url(#beam)"/></g>`).join('')}
  <rect x="0" y="470" width="${CW}" height="230" fill="url(#straw)" stroke="${INK}" stroke-width="5"/>
</svg>`;
A.cageBars = () => `<svg viewBox="0 0 ${CW} ${CH}" width="${CW}" height="${CH}" style="overflow:visible">
  ${Array.from({ length: 12 }, (_, i) => `<rect x="${30 + i * 76}" y="0" width="16" height="${CH}" rx="8" fill="url(#silverG)" stroke="${INK}" stroke-width="4"/>`).join('')}
  ${[0, 230, 470, 684].map(y => `<rect x="0" y="${y}" width="${CW}" height="18" rx="9" fill="url(#silverG)" stroke="${INK}" stroke-width="4"/>`).join('')}
</svg>`;
A.cageBg = () => `<svg viewBox="0 0 ${CW} ${CH}" width="${CW}" height="${CH}"><rect width="${CW}" height="${CH}" fill="url(#cageBg)"/>${Array.from({ length: 30 }, (_, i) => `<path d="M${i * 32} 560 L${i * 32 + 60} 700" stroke="#59607a" stroke-width="3"/>`).join('')}<path d="M0 560 H900" stroke="#6c748c" stroke-width="6"/></svg>`;

/* saco de pienso ecológico */
A.sack = () => `<svg viewBox="0 0 200 230" width="200" height="230" style="overflow:visible">
  <path d="M40 30 Q100 6 160 30 L176 200 Q100 226 24 200 Z" fill="#E7D3A8" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M40 30 Q70 46 100 38 Q130 46 160 30" fill="none" stroke="${INK}" stroke-width="5"/>
  <circle cx="100" cy="120" r="46" fill="${GRASS}" stroke="${INK}" stroke-width="5"/>
  <path d="M80 140 Q76 100 120 96 Q124 136 80 140 Z M82 138 Q98 120 112 106" fill="#fff" stroke="${GRASS2}" stroke-width="4"/>
  <text x="100" y="196" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="30" fill="${INK}">PIENSO</text>
</svg>`;
/* hoja «eco» */
A.leaf = () => `<svg viewBox="-60 -60 120 120" width="120" height="120"><circle r="54" fill="${GRASS}" stroke="${INK}" stroke-width="6"/><path d="M-26 26 Q-30 -26 30 -30 Q32 24 -26 26 Z" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M-22 22 Q2 -2 20 -20" stroke="${GRASS2}" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`;
/* granjita para «la granja» */
A.farm = () => `<svg viewBox="0 0 160 130" width="160" height="130" style="overflow:visible"><path d="M10 60 L80 10 L150 60 Z" fill="${RED}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><rect x="22" y="58" width="116" height="66" fill="#F4E1BE" stroke="${INK}" stroke-width="5"/><path d="M62 124 V88 H98 V124" fill="#5e3a1f" stroke="${INK}" stroke-width="5"/><path d="M62 88 L98 124 M98 88 L62 124" stroke="#F4E1BE" stroke-width="3"/></svg>`;
/* marcador de mapa */
A.pin = (c = RED) => `<svg viewBox="0 0 100 130" width="100" height="130" style="overflow:visible"><path d="M50 126 C20 84 6 64 6 46 A44 44 0 0 1 94 46 C94 64 80 84 50 126 Z" fill="${c}" stroke="${INK}" stroke-width="6"/><circle cx="50" cy="46" r="16" fill="${CREAM}" stroke="${INK}" stroke-width="4"/></svg>`;
/* bandera de España simplificada */
A.flagES = () => `<svg viewBox="0 0 150 100" width="150" height="100" style="overflow:visible"><rect x="4" y="4" width="142" height="92" rx="10" fill="${RED}" stroke="${INK}" stroke-width="6"/><rect x="7" y="28" width="136" height="44" fill="#F6C141"/></svg>`;
