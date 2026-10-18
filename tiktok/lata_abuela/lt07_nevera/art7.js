/* LA LATA DE LA ABUELA — Ep. 7 «Tu nevera, bien puesta»: ilustraciones nuevas */
A.defs7 = `<svg width="0" height="0" style="position:absolute"><defs>
<linearGradient id="cav7" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4FBFF"/><stop offset="1" stop-color="#CFE4F5"/></linearGradient>
<linearGradient id="glass7" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff" stop-opacity=".85"/><stop offset=".5" stop-color="#d8ecfb" stop-opacity=".5"/><stop offset="1" stop-color="#ffffff" stop-opacity=".85"/></linearGradient>
<linearGradient id="merc" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b80d26"/><stop offset=".5" stop-color="#ff5a4e"/><stop offset="1" stop-color="#b80d26"/></linearGradient>
</defs></svg>`;

/* cuerpo de la nevera abierta, sin puerta: 540x780 */
A.fridgeBody = () => `<svg viewBox="0 0 540 780" width="540" height="780" style="overflow:visible">
  <rect x="14" y="14" width="540" height="780" rx="40" fill="rgba(5,12,40,.35)"/>
  <rect x="0" y="0" width="540" height="780" rx="40" fill="#F4F7FB" stroke="${INK}" stroke-width="8"/>
  <rect x="24" y="24" width="492" height="732" rx="22" fill="url(#cav7)" stroke="${INK}" stroke-width="5"/>
  <rect x="200" y="34" width="140" height="18" rx="9" fill="#FFF7C4" stroke="#e8d27a" stroke-width="3"/>
  ${[200, 380, 560].map(y => `<rect x="24" y="${y}" width="492" height="16" fill="#bfe0f7" stroke="#7fb3d9" stroke-width="3"/><path d="M30 ${y + 4} H510" stroke="#fff" stroke-width="3"/>`).join('')}
  <rect x="44" y="590" width="452" height="150" rx="20" fill="rgba(255,255,255,.55)" stroke="#7fb3d9" stroke-width="5"/>
  <rect x="200" y="606" width="140" height="18" rx="9" fill="#d5e9f8" stroke="#7fb3d9" stroke-width="3"/>
  <circle cx="120" cy="690" r="38" fill="#E5533D" stroke="${INK}" stroke-width="4"/><path d="M110 656 q10 -10 20 0" stroke="#2f9e5b" stroke-width="6" fill="none"/>
  <path d="M200 720 Q190 650 250 640 Q320 630 330 700 Q336 730 300 734 L230 734 Q204 734 200 720 Z" fill="#7BC96F" stroke="${INK}" stroke-width="4"/><path d="M230 700 Q260 660 300 690" stroke="#4d9a45" stroke-width="4" fill="none"/>
  <path d="M370 730 L440 650 L460 668 L392 744 Z" fill="#F2983E" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><path d="M440 650 l14 -24 M450 656 l22 -14" stroke="#2f9e5b" stroke-width="5" stroke-linecap="round"/>
</svg>`;
/* tinte del interior (cálido = mal, frío = bien) */
A.cavTint = c => `<div style="position:absolute;left:24px;top:24px;width:492px;height:732px;border-radius:22px;background:${c}"></div>`;
/* puerta abierta con baldas: 150x780 */
A.door = () => `<svg viewBox="0 0 150 780" width="150" height="780" style="overflow:visible">
  <path d="M0 10 L140 60 L140 720 L0 770 Z" fill="#E6ECF4" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
  ${[250, 480, 690].map(y => `<path d="M8 ${y} L134 ${y - 10} L134 ${y + 24} L8 ${y + 34} Z" fill="#bfe0f7" stroke="#7fb3d9" stroke-width="4"/>`).join('')}
</svg>`;
/* bandeja de carne cruda / pescado */
A.meat = () => `<svg viewBox="0 0 180 90" width="180" height="90" style="overflow:visible">
  <path d="M6 40 L174 40 L162 86 L18 86 Z" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M30 44 Q30 10 70 12 Q100 2 130 14 Q160 18 152 44 Z" fill="${RAW}" stroke="${INK}" stroke-width="5"/>
  <path d="M60 26 Q80 18 100 26 M100 34 Q120 28 136 34" stroke="${RAW2}" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M10 38 Q90 0 170 38" stroke="#cfe7ff" stroke-width="4" fill="none" opacity=".9"/>
  <text x="90" y="74" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="20" fill="${RED}">CRUDO</text>
</svg>`;
A.fish = () => `<svg viewBox="0 0 180 90" width="180" height="90" style="overflow:visible">
  <path d="M6 40 L174 40 L162 86 L18 86 Z" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M30 34 Q70 0 120 24 L150 10 L146 40 L150 56 L120 42 Q70 62 30 34 Z" fill="#9db6cc" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <circle cx="48" cy="30" r="5" fill="${INK}"/><path d="M72 22 Q78 32 72 42" stroke="${INK}" stroke-width="3" fill="none"/>
  <text x="90" y="76" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="20" fill="${RED}">CRUDO</text>
</svg>`;
/* tarta (lista para comer) */
A.cake = () => `<svg viewBox="0 0 170 120" width="170" height="120" style="overflow:visible">
  <ellipse cx="85" cy="110" rx="80" ry="10" fill="#fff" stroke="${INK}" stroke-width="4"/>
  <path d="M20 50 L150 50 L150 104 L20 104 Z" fill="#F7E1B5" stroke="${INK}" stroke-width="5"/>
  <path d="M20 74 H150" stroke="#E8A0B4" stroke-width="10"/>
  <path d="M14 52 Q20 30 50 32 Q85 22 120 32 Q150 30 156 52 Q140 62 124 52 Q108 64 92 52 Q76 64 60 52 Q44 64 30 52 Q22 60 14 52 Z" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M84 30 Q70 10 84 4 Q98 10 84 30 Z" fill="${RED}" stroke="${INK}" stroke-width="4"/>
</svg>`;
/* vaso de agua con termómetro; la lectura va en HTML encima */
A.glass = () => `<svg viewBox="0 0 110 160" width="110" height="160" style="overflow:visible">
  <rect x="62" y="0" width="16" height="120" rx="8" fill="#fff" stroke="${INK}" stroke-width="4"/><rect x="66" y="40" width="8" height="74" rx="4" fill="url(#merc)"/>
  <path d="M10 50 L100 50 L92 156 L18 156 Z" fill="url(#glass7)" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M14 84 L96 84 L92 152 L18 152 Z" fill="#9CCBF5" opacity=".7"/>
</svg>`;
/* termómetro grande 0–10 °C: 150x700; el mercurio es un div aparte */
A.bigThermo = () => {
  let ticks = ''; for (let i = 0; i <= 10; i++) { const y = 600 - i * 52; ticks += `<path d="M96 ${y} H${i % 5 ? 112 : 124}" stroke="${INK}" stroke-width="4"/>${i % 5 === 0 || i === 4 ? `<text x="130" y="${y + 9}" font-family="Fredoka" font-weight="700" font-size="34" fill="${CREAM}">${i}°</text>` : ''}`; }
  return `<svg viewBox="0 0 170 700" width="170" height="700" style="overflow:visible">
  <rect x="44" y="40" width="54" height="600" rx="27" fill="#fff" stroke="${INK}" stroke-width="7"/>
  <rect x="50" y="${600 - 5 * 52}" width="42" height="${5 * 52}" fill="rgba(47,158,91,.28)"/>
  <circle cx="71" cy="640" r="52" fill="url(#merc)" stroke="${INK}" stroke-width="7"/>
  ${ticks}</svg>`;
};
/* mando de temperatura */
A.knob = () => `<svg viewBox="-110 -110 220 220" width="220" height="220" style="overflow:visible">
  <circle r="100" fill="url(#silverG)" stroke="${INK}" stroke-width="8"/>
  ${Array.from({ length: 7 }, (_, i) => { const a = (-210 + i * 40) * Math.PI / 180; return `<circle cx="${f1(80 * Math.cos(a))}" cy="${f1(80 * Math.sin(a))}" r="${4 + i}" fill="#2E64D8"/>`; }).join('')}
  <g class="ptr"><circle r="56" fill="#e9eef6" stroke="${INK}" stroke-width="6"/><rect x="-9" y="-58" width="18" height="50" rx="9" fill="${RED}" stroke="${INK}" stroke-width="4"/></g>
</svg>`;
/* tarro de salsa */
A.sauce = (c = '#E5533D') => `<svg viewBox="0 0 90 130" width="90" height="130" style="overflow:visible"><rect x="16" y="0" width="58" height="22" rx="6" fill="${INK}"/><path d="M10 26 H80 L84 120 Q84 128 76 128 H14 Q6 128 6 120 Z" fill="${c}" stroke="${INK}" stroke-width="5"/><rect x="14" y="60" width="62" height="34" rx="6" fill="${CREAM}"/></svg>`;
/* icono «guardar» y botón «seguir» */
A.bookmark = () => `<svg viewBox="0 0 160 200" width="160" height="200" style="overflow:visible"><path class="bm" d="M20 10 H140 Q150 10 150 20 V190 L80 140 L10 190 V20 Q10 10 20 10 Z" fill="${CREAM}" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/></svg>`;
