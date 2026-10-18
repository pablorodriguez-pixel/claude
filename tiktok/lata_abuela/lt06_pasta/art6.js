/* LA LATA DE LA ABUELA — Ep. 6 «La rayita de la pasta de dientes»: ilustraciones nuevas */
const MINT = '#3FB6A8', MINT2 = '#1f8a7e', GREENM = '#2f9e5b';

A.defs6 = `<svg width="0" height="0" style="position:absolute"><defs>
<linearGradient id="tubeG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#F3F6FA"/><stop offset="1" stop-color="#C9D3E2"/></linearGradient>
<linearGradient id="tubeBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a62bf"/><stop offset="1" stop-color="#16306e"/></linearGradient>
<linearGradient id="capG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#AFC0D6"/></linearGradient>
<linearGradient id="beamR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF5A4E" stop-opacity=".85"/><stop offset="1" stop-color="#FFD25A" stop-opacity=".15"/></linearGradient>
</defs></svg>`;

/* tubo de pasta horizontal 700x220. opt: mark (color rayita), body ('white'|'blue'|'red'), back (ingredientes) */
A.tube = (opt = {}) => {
  const mark = opt.mark || GREENM, dark = opt.body === 'blue' || opt.body === 'red';
  const fill = opt.body === 'blue' ? 'url(#tubeBlue)' : opt.body === 'red' ? '#C8102E' : 'url(#tubeG)';
  const txt = dark ? '#fff' : BLUE;
  const front = `<path d="M150 70 C330 72 430 112 560 140" stroke="${dark ? 'rgba(255,255,255,.35)' : MINT}" stroke-width="26" fill="none" stroke-linecap="round"/>
    <path d="M150 112 C320 110 430 150 556 168" stroke="${dark ? 'rgba(255,255,255,.2)' : '#9fdcd3'}" stroke-width="14" fill="none" stroke-linecap="round"/>
    <text x="330" y="138" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="58" fill="${txt}" letter-spacing="2">DENTAL</text>
    <text x="330" y="172" text-anchor="middle" font-family="Fredoka" font-weight="500" font-size="24" fill="${txt}" opacity=".8">sabor menta</text>`;
  const back = `<rect x="170" y="54" width="380" height="132" rx="10" fill="#fff" stroke="#b9c4d6" stroke-width="3"/>
    <text x="186" y="80" font-family="Fredoka" font-weight="700" font-size="20" fill="${INK}">INGREDIENTES:</text>
    ${[0, 1, 2, 3, 4].map(i => `<rect x="186" y="${94 + i * 18}" width="${[340, 300, 330, 260, 180][i]}" height="8" rx="4" fill="#aab4c6"/>`).join('')}`;
  return `<svg viewBox="0 0 700 240" width="700" height="240" style="overflow:visible">
  <ellipse cx="370" cy="226" rx="300" ry="14" fill="rgba(5,12,40,.3)"/>
  <rect x="6" y="80" width="80" height="80" rx="16" fill="url(#capG)" stroke="${INK}" stroke-width="6"/>
  ${[24, 42, 60].map(x => `<path d="M${x} 86 V154" stroke="#9fb0c8" stroke-width="5"/>`).join('')}
  <path d="M86 92 L120 70 L120 170 L86 148 Z" fill="url(#capG)" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M120 70 C260 60 520 28 620 18 L620 222 C520 212 260 180 120 170 Z" fill="${fill}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
  <g class="face">${opt.back ? back : front}</g>
  <path d="M140 84 C280 74 480 48 600 36" stroke="#fff" stroke-width="10" opacity="${dark ? 0.25 : 0.8}" fill="none" stroke-linecap="round"/>
  <g class="crimp"><rect x="616" y="12" width="${opt.open ? 20 : 70}" height="216" rx="6" fill="${fill}" stroke="${INK}" stroke-width="6"/>
  ${opt.open ? '' : [632, 648, 664, 676].map(x => `<path d="M${x} 20 V220" stroke="${dark ? 'rgba(255,255,255,.35)' : '#b9c4d6'}" stroke-width="4"/>`).join('')}</g>
  <rect class="mark" x="${opt.open ? 584 : 586}" y="22" width="30" height="58" rx="3" fill="${mark}" stroke="${INK}" stroke-width="3"/>
</svg>`;
};
/* sensor de luz colgante */
A.sensor = () => `<svg viewBox="0 0 220 300" width="220" height="300" style="overflow:visible">
  <rect x="98" y="-400" width="24" height="420" fill="#59607a" stroke="${INK}" stroke-width="5"/>
  <rect x="20" y="10" width="180" height="150" rx="26" fill="url(#silverG)" stroke="${INK}" stroke-width="7"/>
  <rect x="44" y="34" width="132" height="34" rx="10" fill="#2b2f3a"/><circle cx="64" cy="51" r="7" fill="#7BC96F" class="led"/>
  <text x="140" y="58" text-anchor="middle" font-family="SpaceMono" font-weight="700" font-size="18" fill="#9cf">SCAN</text>
  <circle cx="110" cy="122" r="26" fill="#2b2f3a" stroke="${INK}" stroke-width="5"/><circle cx="110" cy="122" r="14" fill="#FF5A4E" class="lens"/><circle cx="104" cy="116" r="5" fill="#fff" opacity=".8"/>
</svg>`;
A.beam = () => `<svg viewBox="0 0 220 360" width="220" height="360"><path d="M96 0 L124 0 L200 360 L20 360 Z" fill="url(#beamR)"/></svg>`;
/* cinta transportadora 1000 de ancho */
A.belt = () => `<svg viewBox="0 0 1000 120" width="1000" height="120" style="overflow:visible">
  <rect x="0" y="10" width="1000" height="90" rx="45" fill="#3a3f4f" stroke="${INK}" stroke-width="7"/>
  ${[45, 205, 365, 525, 685, 845, 955].map(x => `<circle cx="${x}" cy="55" r="32" fill="url(#silverG)" stroke="${INK}" stroke-width="5"/><circle cx="${x}" cy="55" r="7" fill="${INK}"/>`).join('')}
  <rect x="0" y="0" width="1000" height="22" rx="11" fill="#59607a" stroke="${INK}" stroke-width="5"/>
</svg>`;
/* mordaza de la prensa (arriba) */
A.jaw = (down = true) => `<svg viewBox="0 0 160 360" width="160" height="360" style="overflow:visible">
  ${down ? `<rect x="64" y="-400" width="32" height="560" fill="#59607a" stroke="${INK}" stroke-width="5"/><rect x="10" y="150" width="140" height="200" rx="16" fill="url(#silverG)" stroke="${INK}" stroke-width="7"/>${[180, 220, 260, 300].map(y => `<path d="M24 ${y} H136" stroke="#7d8698" stroke-width="5"/>`).join('')}<path d="M10 330 H150" stroke="${RED}" stroke-width="10"/>`
    : `<rect x="10" y="10" width="140" height="200" rx="16" fill="url(#silverG)" stroke="${INK}" stroke-width="7"/>${[60, 100, 140, 180].map(y => `<path d="M24 ${y} H136" stroke="#7d8698" stroke-width="5"/>`).join('')}<rect x="64" y="200" width="32" height="560" fill="#59607a" stroke="${INK}" stroke-width="5"/>`}
</svg>`;
/* tarjeta de cadena reenviada (bulo) */
A.chainRow = (c, label, icon) => `<div style="display:flex;align-items:center;gap:24px;padding:10px 0"><div style="width:120px;height:60px;border-radius:8px;background:${c};border:5px solid ${INK}"></div><div style="font-family:Fredoka;font-weight:700;font-size:50px;color:${INK}">${label} ${icon}</div></div>`;
