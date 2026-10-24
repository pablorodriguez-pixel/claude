/* Ep. 8 — cajetín de la lavadora: ilustraciones nuevas */
A.tshirt = () => `<svg viewBox="0 0 220 200" width="220" height="200" style="overflow:visible">
<path d="M62 22 L16 62 L46 96 L70 78 L70 186 H150 V78 L174 96 L204 62 L158 22 Q110 52 62 22 Z" fill="#FFFFFF" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
<path d="M62 22 Q110 52 158 22" fill="none" stroke="${INK}" stroke-width="5"/>
<path d="M92 92 q-6 -22 14 -22 q10 -14 24 -2 q20 4 12 24 q10 16 -8 22 q-8 14 -24 6 q-22 0 -18 -28 Z" fill="#8A5A2B"/>
<circle cx="128" cy="140" r="9" fill="#8A5A2B"/><circle cx="92" cy="146" r="6" fill="#B07A44"/>
<circle cx="102" cy="88" r="3.5" fill="#fff" opacity=".5"/></svg>`;
A.flowerI = (c = '#E86FA8') => `<svg viewBox="-60 -60 120 120" width="120" height="120" style="overflow:visible">
${[0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-30" rx="19" ry="26" fill="${c}" stroke="${INK}" stroke-width="5" transform="rotate(${a})"/>`).join('')}
<circle r="15" fill="#FFD66B" stroke="${INK}" stroke-width="5"/></svg>`;
A.jug = (c = '#F08FBD', lab = '') => `<svg viewBox="0 0 120 200" width="120" height="200" style="overflow:visible">
<path d="M44 0 H76 V22 Q116 34 116 80 V184 Q116 198 102 198 H18 Q4 198 4 184 V80 Q4 34 44 22 Z" fill="${c}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
<rect x="40" y="-8" width="40" height="16" rx="6" fill="#fff" stroke="${INK}" stroke-width="5"/>
<rect x="22" y="84" width="76" height="70" rx="12" fill="#FFF7EA" stroke="${INK}" stroke-width="4"/>
<g transform="translate(60 119) scale(.42)">${[0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-30" rx="19" ry="26" fill="#E86FA8" stroke="${INK}" stroke-width="8" transform="rotate(${a})"/>`).join('')}<circle r="15" fill="#FFD66B" stroke="${INK}" stroke-width="8"/></g>
<path d="M20 70 Q18 50 34 40" stroke="#fff" stroke-width="8" opacity=".5" fill="none" stroke-linecap="round"/></svg>`;
