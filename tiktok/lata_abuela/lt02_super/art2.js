/* Ep. 2 — Trucos del súper: ilustraciones nuevas */
const WR = '#F25244', GREEN = '#2f9e5b';
const metal = (d, w = 12) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + 8}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="url(#silverG)" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

A.cart = (items = '') => {
  const bx = t => 170 + (t - 110) * (370 / 490);
  let mesh = '';
  for (let x = 160; x <= 560; x += 50) mesh += `M${x} 110 L${f1(bx(x))} 330 `;
  [165, 220, 275].forEach(y => { const k = (y - 110) / 220; mesh += `M${f1(110 + 60 * k)} ${y} L${f1(600 - 60 * k)} ${y} `; });
  return `<svg viewBox="0 0 640 520" width="640" height="520" style="overflow:visible">
  <ellipse cx="370" cy="500" rx="260" ry="18" fill="rgba(5,12,40,.35)"/>
  <path d="M110 110 L600 110 L540 330 L170 330 Z" fill="rgba(220,232,250,.18)"/>
  <g class="items">${items}</g>
  ${metal(mesh, 5)}
  ${metal('M110 110 L600 110 L540 330 L170 330 Z', 12)}
  ${metal('M170 330 L196 424 L566 424 M540 330 L566 424 M110 110 L46 62', 12)}
  <rect x="2" y="34" width="70" height="34" rx="16" transform="rotate(36 37 51)" fill="${RED}" stroke="${INK}" stroke-width="5"/>
  ${[[214, 466], [524, 466]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="32" fill="#2b2f3a" stroke="${INK}" stroke-width="5"/><circle cx="${x}" cy="${y}" r="12" fill="url(#silverG)"/>`).join('')}
  <path d="M130 116 L590 116" stroke="#fff" stroke-width="4" opacity=".7"/>
</svg>`;
};
A.milk = () => `<svg viewBox="0 0 120 170" width="120" height="170" style="overflow:visible"><path d="M20 50 L60 18 L100 50 L100 160 L20 160 Z" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M20 50 L100 50" stroke="${INK}" stroke-width="4"/><rect x="44" y="4" width="32" height="20" rx="4" fill="#2E64D8" stroke="${INK}" stroke-width="4"/><rect x="20" y="78" width="80" height="50" fill="#2E64D8"/><text x="60" y="112" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="22" fill="#fff">LECHE</text><path d="M20 160 L100 160 L100 50" fill="none" stroke="${INK}" stroke-width="5"/></svg>`;
A.eggs = () => `<svg viewBox="0 0 180 110" width="180" height="110" style="overflow:visible">${[30, 70, 110, 150].map(x => `<ellipse cx="${x}" cy="40" rx="18" ry="24" fill="#F7E7CF" stroke="${INK}" stroke-width="4"/>`).join('')}<path d="M6 50 L174 50 L162 104 L18 104 Z" fill="#D9C2A0" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>${[50, 90, 130].map(x => `<path d="M${x} 56 v40" stroke="#b79e78" stroke-width="4"/>`).join('')}</svg>`;
A.bread = () => `<svg viewBox="0 0 220 100" width="220" height="100" style="overflow:visible"><path d="M14 64 Q8 22 60 18 L170 14 Q214 16 208 54 Q204 86 160 88 L50 92 Q16 92 14 64 Z" fill="#D99A4E" stroke="${INK}" stroke-width="5"/>${[60, 100, 140, 176].map(x => `<path d="M${x} 30 q10 18 4 38" stroke="#a8692a" stroke-width="5" fill="none" stroke-linecap="round"/>`).join('')}<path d="M40 30 q40 -12 120 -12" stroke="#f3c890" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`;

/* plano cenital del súper */
A.store = (id) => {
  const shelves = [150, 330, 510, 690], tempt = ['🍫', '🍪', '🍷', '🧀', '🍿', '🥤', '🍬', '🍦'];
  let sh = '';
  shelves.forEach((x, i) => {
    sh += `<rect x="${x - 34}" y="200" width="68" height="300" rx="12" fill="#c9d3e6" stroke="${INK}" stroke-width="5"/>`;
    for (let k = 0; k < 4; k++) sh += `<text x="${x}" y="${250 + k * 70}" text-anchor="middle" font-size="44" class="tp" data-i="${i * 4 + k}">${tempt[(i * 4 + k) % 8]}</text>`;
  });
  return `<svg viewBox="0 0 840 640" width="840" height="640" style="overflow:visible">
  <defs><mask id="${id}m" maskUnits="userSpaceOnUse" x="-50" y="-50" width="940" height="740"><path class="rmask" d="M60 600 L60 560 L240 560 L240 160 L420 160 L420 540 L600 540 L600 160 L780 160 L780 120" fill="none" stroke="#fff" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/></mask>
  <pattern id="${id}tile" patternUnits="userSpaceOnUse" width="60" height="60"><rect width="60" height="60" fill="#FFF8EA"/><rect width="30" height="30" fill="#F4EAD4"/><rect x="30" y="30" width="30" height="30" fill="#F4EAD4"/></pattern></defs>
  <rect x="12" y="16" width="840" height="640" rx="30" fill="rgba(5,12,40,.4)"/>
  <rect x="0" y="0" width="840" height="640" rx="30" fill="url(#${id}tile)" stroke="${INK}" stroke-width="7"/>
  <rect x="0" y="0" width="840" height="120" rx="30" fill="#DCE8FA" stroke="${INK}" stroke-width="6"/>
  <rect x="30" y="20" width="780" height="70" rx="14" fill="#86B8F2" stroke="${INK}" stroke-width="5"/>
  <path d="M290 20 V90 M550 20 V90" stroke="${INK}" stroke-width="4"/>
  <text x="420" y="112" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="22" fill="${BLUE}" letter-spacing="3">EL FONDO</text>
  ${sh}
  <rect x="10" y="575" width="110" height="56" rx="10" fill="${GREEN}" stroke="${INK}" stroke-width="5"/>
  <text x="65" y="611" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="21" fill="#fff">ENTRADA</text>
  <path class="route" d="M60 600 L60 560 L240 560 L240 160 L420 160 L420 540 L600 540 L600 160 L780 160 L780 120" fill="none" stroke="${RED}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 22" mask="url(#${id}m)"/>
</svg>`;
};

/* estantería */
A.shelf = () => {
  const cols = [['#C8102E', '#F2D28B'], ['#2E64D8', '#FBF3E2'], ['#2f9e5b', '#FBF3E2'], ['#F2983E', '#1F3C88'], ['#7A1F2B', '#F2D28B']];
  let s = '';
  [0, 1, 2, 3].forEach(r => {
    const by = 200 + r * 210;
    for (let c = 0; c < 4; c++) {
      const [a, b] = cols[(r + c) % 5], x = 46 + c * 132, h = 150 - (c % 2) * 18, prem = r === 1;
      s += `<g><rect x="${x}" y="${by - h}" width="110" height="${h}" rx="8" fill="${a}" stroke="${INK}" stroke-width="5"/><rect x="${x + 12}" y="${by - h + 30}" width="86" height="54" rx="8" fill="${prem ? 'url(#goldG)' : b}" stroke="${INK}" stroke-width="3"/><circle cx="${x + 55}" cy="${by - h + 57}" r="14" fill="${prem ? RED : a}" opacity=".85"/><rect x="${x + 8}" y="${by - h + 8}" width="14" height="${h - 20}" rx="7" fill="#fff" opacity=".22"/></g>`;
    }
  });
  return `<svg viewBox="0 0 600 860" width="600" height="860" style="overflow:visible">
  <rect x="14" y="18" width="600" height="860" rx="18" fill="rgba(5,12,40,.4)"/>
  <rect x="0" y="0" width="600" height="860" rx="18" fill="#EDE3CC" stroke="${INK}" stroke-width="6"/>
  <rect class="eyeglow" x="10" y="216" width="580" height="196" rx="14" fill="#FFE9A6" opacity="0"/>
  ${s}
  ${[200, 410, 620, 830].map(y => `<rect x="10" y="${y}" width="580" height="22" rx="6" fill="url(#silverG)" stroke="${INK}" stroke-width="4"/>`).join('')}
  <rect x="0" y="0" width="22" height="860" rx="8" fill="#9aa3b2" stroke="${INK}" stroke-width="5"/><rect x="578" y="0" width="22" height="860" rx="8" fill="#9aa3b2" stroke="${INK}" stroke-width="5"/>
</svg>`;
};
A.eye = () => `<svg viewBox="0 0 140 90" width="140" height="90" style="overflow:visible"><path d="M6 45 Q70 -14 134 45 Q70 104 6 45 Z" fill="#fff" stroke="${INK}" stroke-width="6"/><circle class="iris" cx="70" cy="45" r="24" fill="#2E64D8" stroke="${INK}" stroke-width="4"/><circle class="iris" cx="70" cy="45" r="11" fill="${INK}"/><circle cx="78" cy="37" r="6" fill="#fff"/></svg>`;
A.angry = () => `<svg viewBox="0 0 120 120" width="120" height="120" style="overflow:visible"><circle cx="60" cy="60" r="50" fill="${WR}" stroke="${INK}" stroke-width="6"/><path d="M28 40 L52 52 M92 40 L68 52" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><circle cx="44" cy="62" r="6" fill="${INK}"/><circle cx="76" cy="62" r="6" fill="${INK}"/><path d="M38 92 Q60 76 82 92" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/></svg>`;
A.lockAngry = () => `<svg viewBox="0 0 240 280" width="240" height="280" style="overflow:visible"><g class="shackle"><path d="M60 128 V80 a60 60 0 0 1 120 0 V128" fill="none" stroke="${INK}" stroke-width="40" stroke-linecap="round"/><path d="M60 128 V80 a60 60 0 0 1 120 0 V128" fill="none" stroke="url(#silverG)" stroke-width="26" stroke-linecap="round"/></g>
 <rect x="18" y="118" width="204" height="152" rx="30" fill="url(#goldG)" stroke="${INK}" stroke-width="8"/><rect x="34" y="132" width="20" height="120" rx="10" fill="#fff" opacity=".35"/>
 <path d="M70 168 L106 186 M170 168 L134 186" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><circle cx="92" cy="196" r="9" fill="${INK}"/><circle cx="148" cy="196" r="9" fill="${INK}"/><path d="M84 242 Q120 218 156 242" stroke="${INK}" stroke-width="9" fill="none" stroke-linecap="round"/>
 <circle cx="60" cy="226" r="12" fill="${WR}" opacity=".5"/><circle cx="180" cy="226" r="12" fill="${WR}" opacity=".5"/></svg>`;
A.bottle = (lab = 'ZUMO') => `<svg viewBox="0 0 110 300" width="110" height="300" style="overflow:visible"><rect x="38" y="0" width="34" height="26" rx="6" fill="${WR}" stroke="${INK}" stroke-width="4"/><path d="M40 26 L70 26 L74 64 Q102 84 102 118 L102 282 Q102 296 88 296 L22 296 Q8 296 8 282 L8 118 Q8 84 36 64 Z" fill="#FFD27A" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><rect x="8" y="150" width="94" height="86" fill="${CREAM}" stroke="${INK}" stroke-width="4"/><circle cx="55" cy="178" r="16" fill="${WR}"/><text x="55" y="224" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="20" fill="${BLUE}">${lab}</text><text x="55" y="140" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="20" fill="#8a6420">1 L</text><rect x="16" y="90" width="12" height="190" rx="6" fill="#fff" opacity=".45"/></svg>`;
A.pack = () => `<svg viewBox="0 0 330 320" width="330" height="320" style="overflow:visible">${[0, 1, 2].map(i => `<g transform="translate(${i * 108} 10)"><g transform="scale(1 1.02)">${A.bottle().replace(/<svg[^>]*>|<\/svg>/g, '')}</g></g>`).join('')}
 <rect x="0" y="60" width="326" height="250" rx="22" fill="rgba(220,235,255,.28)" stroke="#9fb3d9" stroke-width="4"/>
 <rect x="-8" y="246" width="342" height="54" rx="10" fill="${RED}" stroke="${INK}" stroke-width="5"/><text x="163" y="284" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="32" fill="#fff" letter-spacing="2">PACK AHORRO 3x</text></svg>`;
A.burstStar = (txt) => { let d = ''; for (let i = 0; i < 28; i++) { const a = i / 28 * Math.PI * 2, r = i % 2 ? 78 : 104; d += (i ? 'L' : 'M') + f1(110 + r * Math.cos(a)) + ' ' + f1(110 + r * Math.sin(a)); }
  return `<svg viewBox="0 0 220 220" width="220" height="220" style="overflow:visible"><path d="${d}Z" fill="#FFE14A" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><text x="110" y="124" text-anchor="middle" font-family="DMSerif" font-size="40" fill="${RED}">${txt}</text></svg>`; };
A.speaker = () => `<svg viewBox="0 0 220 260" width="220" height="260" style="overflow:visible"><rect x="20" y="10" width="180" height="240" rx="28" fill="#2b2f3a" stroke="${INK}" stroke-width="6"/><circle cx="110" cy="80" r="38" fill="#4a4f5c" stroke="#9aa3b2" stroke-width="5"/><circle cx="110" cy="80" r="14" fill="url(#silverG)"/><circle class="cone" cx="110" cy="176" r="56" fill="#4a4f5c" stroke="#9aa3b2" stroke-width="6"/><circle cx="110" cy="176" r="22" fill="url(#silverG)"/><rect x="36" y="22" width="12" height="216" rx="6" fill="#fff" opacity=".15"/></svg>`;
A.person = (c, hair) => `<svg viewBox="0 0 300 330" width="300" height="330" style="overflow:visible">
 <g class="legB"><rect x="66" y="210" width="24" height="96" rx="12" fill="#3a3f55" stroke="${INK}" stroke-width="5"/></g>
 <g class="legF"><rect x="92" y="210" width="24" height="96" rx="12" fill="#4b516b" stroke="${INK}" stroke-width="5"/></g>
 <rect x="50" y="96" width="84" height="130" rx="34" fill="${c}" stroke="${INK}" stroke-width="5"/>
 <path d="M126 130 L188 150" stroke="${INK}" stroke-width="22" stroke-linecap="round"/><path d="M126 130 L188 150" stroke="${c}" stroke-width="12" stroke-linecap="round"/>
 <circle cx="92" cy="58" r="40" fill="${SKIN}" stroke="${INK}" stroke-width="5"/><path d="M52 52 Q60 10 100 16 Q134 22 132 54 Q114 36 84 40 Q64 42 52 52 Z" fill="${hair}" stroke="${INK}" stroke-width="4"/>
 <circle cx="104" cy="62" r="5" fill="${INK}"/><path d="M98 82 q10 6 18 0" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>
 <g transform="translate(176 120) scale(.32)">${A.cart('').replace(/<svg[^>]*>|<\/svg>/g, '')}</g>
 <g class="it" font-size="40"><text x="208" y="150" class="i0" opacity="0">🍫</text><text x="244" y="146" class="i1" opacity="0">🧀</text><text x="226" y="128" class="i2" opacity="0">🍷</text><text x="262" y="126" class="i3" opacity="0">🍪</text></g>
</svg>`;
A.gift = () => `<svg viewBox="0 0 200 210" width="200" height="210" style="overflow:visible"><rect x="22" y="86" width="156" height="118" rx="10" fill="${RED}" stroke="${INK}" stroke-width="6"/><rect x="86" y="86" width="28" height="118" fill="url(#goldG)" stroke="${INK}" stroke-width="4"/>
 <g class="glid"><rect x="10" y="60" width="180" height="36" rx="10" fill="#e0213f" stroke="${INK}" stroke-width="6"/><rect x="86" y="60" width="28" height="36" fill="url(#goldG)" stroke="${INK}" stroke-width="4"/>
 <path d="M100 60 Q60 10 50 34 Q44 56 100 60 Q140 10 150 34 Q156 56 100 60 Z" fill="url(#goldG)" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><circle cx="100" cy="58" r="10" fill="url(#goldG)" stroke="${INK}" stroke-width="4"/></g></svg>`;
A.chart = () => `<svg viewBox="0 0 200 160" width="200" height="160" style="overflow:visible"><rect x="0" y="0" width="200" height="160" rx="16" fill="#fff" stroke="${INK}" stroke-width="5"/><rect x="30" y="90" width="34" height="50" fill="#9fb3d9" stroke="${INK}" stroke-width="4"/><rect x="84" y="60" width="34" height="80" fill="#F2D28B" stroke="${INK}" stroke-width="4"/><rect x="138" y="26" width="34" height="114" fill="${RED}" stroke="${INK}" stroke-width="4"/></svg>`;
