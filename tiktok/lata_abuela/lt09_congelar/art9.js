/* Ep. 9 — congelar bien: ilustraciones nuevas */
const FOOD = '#C8602B', FOOD2 = '#9A4318';
const stew = (cx, cy, s = 1) => `<g transform="translate(${cx} ${cy}) scale(${s})"><path d="M-190 10 Q-200 -60 -120 -80 Q-60 -130 20 -90 Q110 -110 170 -50 Q214 -4 170 56 Q130 100 40 92 Q-40 120 -130 86 Q-200 66 -190 10 Z" fill="${FOOD}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
<g fill="${FOOD2}"><circle cx="-110" cy="-10" r="12"/><circle cx="-30" cy="-50" r="10"/><circle cx="60" cy="-20" r="13"/><circle cx="120" cy="30" r="9"/><circle cx="-60" cy="50" r="11"/><circle cx="20" cy="40" r="8"/></g>
<g fill="#F2B035"><circle cx="-80" cy="30" r="9"/><circle cx="40" cy="-60" r="8"/><circle cx="100" cy="-6" r="8"/></g><path d="M-140 -34 Q-100 -64 -50 -64" stroke="#fff" stroke-width="9" opacity=".4" fill="none" stroke-linecap="round"/></g>`;
A.bag = () => `<svg viewBox="0 0 620 420" width="620" height="420" style="overflow:visible">
<path d="M34 64 H586 Q604 64 604 82 V380 Q604 406 578 406 H42 Q16 406 16 380 V82 Q16 64 34 64 Z" fill="rgba(228,242,255,.82)" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
<rect x="16" y="64" width="588" height="40" rx="14" fill="#7FC0F5" stroke="${INK}" stroke-width="6"/>
<path d="M60 84 H560" stroke="#fff" stroke-width="7" stroke-dasharray="3 20" stroke-linecap="round" opacity=".85"/>
${stew(310, 250, 1)}
<path d="M54 130 Q44 200 58 300" stroke="#fff" stroke-width="10" opacity=".7" fill="none" stroke-linecap="round"/></svg>`;
A.flatBag = () => `<svg viewBox="0 0 640 120" width="640" height="120" style="overflow:visible">
<rect x="8" y="14" width="624" height="96" rx="24" fill="rgba(228,242,255,.9)" stroke="${INK}" stroke-width="6"/>
<rect x="8" y="14" width="624" height="26" rx="12" fill="#7FC0F5" stroke="${INK}" stroke-width="5"/>
<path d="M30 70 Q70 50 130 58 Q200 44 270 60 Q360 46 430 62 Q520 50 606 70 Q590 100 500 100 Q320 108 140 100 Q50 98 30 70 Z" fill="${FOOD}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
<g fill="${FOOD2}"><circle cx="120" cy="78" r="7"/><circle cx="230" cy="74" r="6"/><circle cx="340" cy="80" r="7"/><circle cx="450" cy="76" r="6"/><circle cx="540" cy="82" r="6"/></g></svg>`;
/* bloque congelado, feo y abultado */
A.blockBag = () => `<svg viewBox="0 0 620 460" width="620" height="460" style="overflow:visible">
<path d="M70 90 Q40 40 130 36 Q200 8 260 40 Q340 6 410 36 Q520 20 550 96 Q600 150 560 230 Q604 310 546 380 Q500 440 400 420 Q320 456 230 420 Q110 446 70 370 Q20 300 62 230 Q24 150 70 90 Z" fill="#DDEFFF" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
<path d="M120 130 Q200 90 290 110 Q380 84 470 140 Q520 200 480 280 Q440 360 330 350 Q220 380 150 320 Q90 240 120 130 Z" fill="${FOOD}" stroke="${INK}" stroke-width="6" stroke-linejoin="round" opacity=".92"/>
<g fill="#fff" opacity=".85"><path d="M150 150 l30 -10 l-8 30 Z"/><path d="M400 130 l34 -6 l-14 26 Z"/><path d="M330 300 l30 8 l-26 18 Z"/><circle cx="190" cy="270" r="14"/><circle cx="440" cy="250" r="10"/><circle cx="262" cy="170" r="9"/></g>
<path d="M92 120 Q70 200 96 300" stroke="#fff" stroke-width="12" opacity=".8" fill="none" stroke-linecap="round"/>
<g stroke="${INK}" stroke-width="5" stroke-linecap="round" fill="none" opacity=".55"><path d="M60 60 l-30 -20"/><path d="M570 70 l36 -22"/><path d="M590 360 l30 22"/></g></svg>`;
A.moon = () => `<svg viewBox="0 0 120 120" width="120" height="120" style="overflow:visible"><path d="M78 8 A54 54 0 1 0 112 84 A42 42 0 1 1 78 8 Z" fill="#FFE9A8" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><circle cx="52" cy="72" r="7" fill="#F1D17E"/><circle cx="68" cy="94" r="5" fill="#F1D17E"/></svg>`;
A.sun = () => `<svg viewBox="-70 -70 140 140" width="140" height="140" style="overflow:visible">${[0,1,2,3,4,5,6,7].map(i => `<path d="M0 -58 L0 -44" stroke="${INK}" stroke-width="8" stroke-linecap="round" transform="rotate(${i * 45})"/>`).join('')}<circle r="34" fill="#FFD66B" stroke="${INK}" stroke-width="6"/></svg>`;
A.pen = () => `<svg viewBox="0 0 120 380" width="120" height="380" style="overflow:visible"><rect x="26" y="70" width="68" height="290" rx="22" fill="#2f2f48" stroke="${INK}" stroke-width="6"/><rect x="26" y="70" width="68" height="60" rx="14" fill="#FFD66B" stroke="${INK}" stroke-width="6"/><path d="M36 70 L48 8 H72 L84 70 Z" fill="#E5533D" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/></svg>`;
A.cross2 = A.cross;
