/* LA LATA DE LA ABUELA — biblioteca de ilustraciones (SVG strings) */
const INK = '#1B2340', SKIN = '#F3CBA6', SKIN2 = '#E3AE8A', BLUE = '#1F3C88', BLUE2 = '#2A4FA8', CREAM = '#FBF3E2', RED = '#C8102E';
const A = {};
const f1 = v => (+v).toFixed(1);

A.defs = `<svg width="0" height="0" style="position:absolute"><defs>
<linearGradient id="goldG" x1="0" y1="0" x2="1" y2="1" spreadMethod="reflect"><stop offset="0" stop-color="#8A6420"/><stop offset=".26" stop-color="#D4A74A"/><stop offset=".44" stop-color="#FFF1C4"/><stop offset=".54" stop-color="#F2D28B"/><stop offset=".78" stop-color="#C08F35"/><stop offset="1" stop-color="#8A6420"/></linearGradient>
<linearGradient id="goldBand" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a5418"/><stop offset=".22" stop-color="#C79A3E"/><stop offset=".4" stop-color="#FFF1C4"/><stop offset=".55" stop-color="#E2BC63"/><stop offset=".8" stop-color="#B0812F"/><stop offset="1" stop-color="#6e4b12"/></linearGradient>
<linearGradient id="tinBody" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#10245a"/><stop offset=".22" stop-color="#2A4FA8"/><stop offset=".38" stop-color="#5a7fd2"/><stop offset=".5" stop-color="#2E55B0"/><stop offset=".8" stop-color="#1F3C88"/><stop offset="1" stop-color="#10245a"/></linearGradient>
<radialGradient id="lidField" cx=".42" cy=".38" r=".75"><stop offset="0" stop-color="#3a62bf"/><stop offset=".6" stop-color="#1F3C88"/><stop offset="1" stop-color="#132a66"/></radialGradient>
<radialGradient id="medBg" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#FFFCF3"/><stop offset="1" stop-color="#F1DDB3"/></radialGradient>
<linearGradient id="silverG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7d8698"/><stop offset=".4" stop-color="#F2F5FA"/><stop offset=".6" stop-color="#BCC4D2"/><stop offset="1" stop-color="#6f788a"/></linearGradient>
<linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fb8ea"/><stop offset="1" stop-color="#F6E2B8"/></linearGradient>
<pattern id="blouse" patternUnits="userSpaceOnUse" width="34" height="34"><rect width="34" height="34" fill="#B42840"/>
<g fill="${CREAM}"><circle cx="10" cy="6.5" r="3"/><circle cx="13.5" cy="10" r="3"/><circle cx="10" cy="13.5" r="3"/><circle cx="6.5" cy="10" r="3"/></g><circle cx="10" cy="10" r="2.4" fill="#F2D28B"/>
<g fill="#F7C9D0"><circle cx="27" cy="25" r="2"/><circle cx="29.5" cy="27.5" r="2"/><circle cx="27" cy="30" r="2"/><circle cx="24.5" cy="27.5" r="2"/></g></pattern>
<pattern id="weave" patternUnits="userSpaceOnUse" width="16" height="16"><rect width="16" height="16" fill="#FFFFFF"/><path d="M0 8h16M8 0v16" stroke="#E8ECF4" stroke-width="2"/></pattern>
</defs></svg>`;

/* ---------- Abuela Carmen: medallón dorado ---------- */
A.granny = () => {
  let beads = '';
  for (let i = 0; i < 48; i++) { const a = i / 48 * Math.PI * 2; beads += `<circle cx="${f1(200 + 183 * Math.cos(a))}" cy="${f1(228 + 214 * Math.sin(a))}" r="5.5" fill="#F7DFA0" stroke="#7a5418" stroke-width="2"/>`; }
  let pearls = '';
  for (let i = 0; i < 11; i++) { const a = Math.PI * (0.13 + 0.74 * i / 10); const x = 200 - 46 * Math.cos(a), y = 326 + 30 * Math.sin(a); pearls += `<circle cx="${f1(x)}" cy="${f1(y)}" r="7.5" fill="#FFF9EF" stroke="#a8977a" stroke-width="2"/><circle cx="${f1(x - 2)}" cy="${f1(y - 3)}" r="2.2" fill="#fff"/>`; }
  return `<svg viewBox="0 0 400 480" width="400" height="480" style="overflow:visible">
  <defs><clipPath id="medClip"><ellipse cx="200" cy="228" rx="165" ry="196"/></clipPath></defs>
  <ellipse cx="206" cy="240" rx="192" ry="222" fill="rgba(5,12,40,.35)"/>
  <ellipse cx="200" cy="228" rx="192" ry="222" fill="url(#goldG)" stroke="#5a3d0c" stroke-width="5"/>
  ${beads}
  <ellipse cx="200" cy="228" rx="172" ry="203" fill="none" stroke="#8a6420" stroke-width="3"/>
  <ellipse cx="200" cy="228" rx="165" ry="196" fill="url(#medBg)" stroke="#5a3d0c" stroke-width="4"/>
  <g clip-path="url(#medClip)">
    <g opacity=".22" stroke="${BLUE2}" stroke-width="10">${Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2; return `<line x1="200" y1="210" x2="${f1(200 + 300 * Math.cos(a))}" y2="${f1(210 + 300 * Math.sin(a))}"/>`; }).join('')}</g>
    <g id="gBody">
    <path d="M40 480 C50 410 100 368 166 352 Q200 372 234 352 C300 368 350 410 360 480 Z" fill="url(#blouse)" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M174 286 L172 350 Q200 368 228 350 L226 286 Z" fill="${SKIN}" stroke="${INK}" stroke-width="5"/>
    <path d="M176 298 Q200 318 224 298 L224 290 L176 290 Z" fill="${SKIN2}"/>
    <path d="M166 352 Q140 372 150 404 Q180 400 200 372 Q186 366 166 352 Z" fill="#FFFDF6" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M234 352 Q260 372 250 404 Q220 400 200 372 Q214 366 234 352 Z" fill="#FFFDF6" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="200" cy="414" r="6" fill="#F2D28B" stroke="${INK}" stroke-width="3"/><circle cx="200" cy="448" r="6" fill="#F2D28B" stroke="${INK}" stroke-width="3"/>
    ${pearls}
    </g>
    <g id="gHead">
      <ellipse cx="200" cy="182" rx="104" ry="90" fill="#BFC5D2" stroke="${INK}" stroke-width="5"/>
      <ellipse cx="124" cy="234" rx="13" ry="19" fill="${SKIN}" stroke="${INK}" stroke-width="4.5"/>
      <ellipse cx="276" cy="234" rx="13" ry="19" fill="${SKIN}" stroke="${INK}" stroke-width="4.5"/>
      <circle cx="122" cy="256" r="6.5" fill="#FFF9EF" stroke="#a8977a" stroke-width="2"/><circle cx="278" cy="256" r="6.5" fill="#FFF9EF" stroke="#a8977a" stroke-width="2"/>
      <ellipse cx="200" cy="224" rx="78" ry="90" fill="${SKIN}" stroke="${INK}" stroke-width="5"/>
      <g fill="#D6DBE5" stroke="${INK}" stroke-width="4.5">
        <circle cx="120" cy="198" r="21"/><circle cx="280" cy="198" r="21"/>
        <circle cx="128" cy="168" r="28"/><circle cx="272" cy="168" r="28"/>
        <circle cx="152" cy="138" r="30"/><circle cx="248" cy="138" r="30"/>
        <circle cx="183" cy="122" r="31"/><circle cx="217" cy="122" r="31"/>
        <circle cx="200" cy="100" r="24"/>
      </g>
      <g stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none" opacity=".85">
        <path d="M170 106 q10 -9 22 -3"/><path d="M232 112 q10 -6 20 2"/><path d="M118 160 q6 -10 16 -10"/><path d="M190 86 q8 -6 18 -2"/><path d="M140 126 q8 -9 18 -6"/>
      </g>
      <g id="gTint" opacity="0"><ellipse cx="200" cy="232" rx="74" ry="80" fill="#8fd19e"/></g>
      <circle cx="156" cy="254" r="14" fill="#F08A8A" opacity=".45"/><circle cx="244" cy="254" r="14" fill="#F08A8A" opacity=".45"/>
      <path d="M166 262 q-6 10 0 18" stroke="#c98d6d" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M236 260 q6 10 0 18" stroke="#c98d6d" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path id="gBrowL" d="M150 177 Q166 167 184 173" stroke="#7E8596" stroke-width="7.5" fill="none" stroke-linecap="round"/>
      <path id="gBrowR" d="M216 173 Q234 167 250 177" stroke="#7E8596" stroke-width="7.5" fill="none" stroke-linecap="round"/>
      <g id="gEyeL"><ellipse cx="167" cy="211" rx="8" ry="10.5" fill="#2a1d1a"/><circle cx="170" cy="207" r="3" fill="#fff"/></g>
      <g id="gEyeR"><ellipse cx="233" cy="211" rx="8" ry="10.5" fill="#2a1d1a"/><circle cx="236" cy="207" r="3" fill="#fff"/></g>
      <path id="gWinkR" d="M222 214 q11 -10 22 0" stroke="#2a1d1a" stroke-width="5" fill="none" stroke-linecap="round" opacity="0"/>
      <path id="gWinkL" d="M156 214 q11 -10 22 0" stroke="#2a1d1a" stroke-width="5" fill="none" stroke-linecap="round" opacity="0"/>
      <g stroke="#7A1F2B" stroke-width="6.5" fill="rgba(255,255,255,.22)" stroke-linejoin="round">
        <path d="M136 197 Q136 188 147 188 L189 188 Q198 188 197 198 L194 221 Q192 232 180 232 L153 232 Q141 232 139 221 Z"/>
        <path d="M264 197 Q264 188 253 188 L211 188 Q202 188 203 198 L206 221 Q208 232 220 232 L247 232 Q259 232 261 221 Z"/>
      </g>
      <path d="M137 196 L127 182 L148 189 Z M263 196 L273 182 L252 189 Z" fill="#7A1F2B" stroke="#7A1F2B" stroke-width="3" stroke-linejoin="round"/>
      <path d="M197 203 Q200 196 203 203" stroke="#7A1F2B" stroke-width="5" fill="none"/>
      <path d="M137 201 L125 222 M263 201 L275 222" stroke="#7A1F2B" stroke-width="5" stroke-linecap="round"/>
      <path d="M183 194 l-9 28 M249 194 l-9 28" stroke="#fff" stroke-width="3.5" opacity=".6" stroke-linecap="round"/>
      <path d="M200 224 Q191 246 199 251 Q206 253 211 248" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <g id="gMouthC"><path d="M176 268 Q203 295 231 262 Q205 279 176 268 Z" fill="#B5122C" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><path d="M233 257 q5 4 2 10" stroke="#c98d6d" stroke-width="3" fill="none" stroke-linecap="round"/></g>
      <g id="gMouthO"><ellipse cx="0" cy="0" rx="20" ry="15" fill="#5a1520" stroke="#9b1428" stroke-width="5"/><path d="M-12 -11 h24 v5 q-12 3 -24 0 Z" fill="#fff"/><ellipse cx="0" cy="7" rx="11" ry="5.5" fill="#E0566A"/></g>
      <g id="gMouthD" opacity="0"><path d="M206 279 q0 20 10 20 q10 0 10 -20 Z" fill="#E0566A" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><path d="M174 276 q7 -9 13 0 q7 9 13 0 q7 -9 13 0 q7 9 13 0 q7 -9 13 0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/></g>
      <path d="M125 210 C104 268 116 326 160 342 M275 210 C296 268 284 326 240 342" stroke="#D4A74A" stroke-width="5" fill="none" stroke-dasharray="0.1 7.5" stroke-linecap="round"/>
    </g>
  </g>
  <ellipse cx="200" cy="228" rx="165" ry="196" fill="none" stroke="rgba(90,61,12,.35)" stroke-width="10"/>
  <path d="M92 428 L308 428 L324 449 L308 470 L92 470 L76 449 Z" fill="${RED}" stroke="#5a0a14" stroke-width="4" stroke-linejoin="round"/>
  <path d="M100 435 L300 435 M100 463 L300 463" stroke="#F2D28B" stroke-width="2.5" stroke-dasharray="6 5"/>
  <text x="200" y="460" text-anchor="middle" font-family="DMSerif" font-size="31" letter-spacing="5" fill="${CREAM}">CARMEN</text>
</svg>`;
};

/* manos */
A.handStop = () => `<svg viewBox="0 0 170 230" width="170" height="230" style="overflow:visible">
 <g fill="${SKIN}" stroke="${INK}" stroke-width="5" stroke-linejoin="round">
  <rect x="38" y="28" width="23" height="92" rx="11.5"/><rect x="63" y="12" width="23" height="100" rx="11.5"/><rect x="88" y="16" width="23" height="98" rx="11.5"/><rect x="113" y="34" width="22" height="86" rx="11"/>
  <path d="M36 96 Q34 176 86 182 Q138 182 136 100 Z"/>
  <path d="M42 128 Q14 112 10 128 Q8 142 40 166 Z"/>
 </g>
 <path d="M60 110 v-8 M86 106 v-8 M110 108 v-8" stroke="${SKIN2}" stroke-width="4" stroke-linecap="round"/>
 <rect x="44" y="170" width="86" height="56" rx="12" fill="url(#blouse)" stroke="${INK}" stroke-width="5"/>
 <rect x="40" y="166" width="94" height="16" rx="8" fill="#FFFDF6" stroke="${INK}" stroke-width="4"/>
</svg>`;
A.handPoint = () => `<svg viewBox="0 0 240 150" width="240" height="150" style="overflow:visible">
 <rect x="0" y="38" width="62" height="76" rx="12" fill="url(#blouse)" stroke="${INK}" stroke-width="5"/>
 <rect x="50" y="34" width="16" height="84" rx="8" fill="#FFFDF6" stroke="${INK}" stroke-width="4"/>
 <g fill="${SKIN}" stroke="${INK}" stroke-width="5" stroke-linejoin="round">
  <rect x="64" y="40" width="86" height="80" rx="32"/>
  <rect x="112" y="40" width="118" height="28" rx="14"/>
  <path d="M96 62 Q100 36 130 44 Q142 52 128 64 Z"/>
 </g>
 <path d="M206 47 q10 0 14 7" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>
 <path d="M120 80 q14 2 22 -2 M120 98 q14 2 22 -2" stroke="${SKIN2}" stroke-width="4" fill="none" stroke-linecap="round"/>
</svg>`;

/* ---------- La lata ---------- */
A.tin = () => {
  let fl = '';
  for (let x = 92; x <= 508; x += 32) { const y = 268 + 70 * Math.sqrt(Math.max(0, 1 - ((x - 300) / 240) ** 2)); fl += `<g transform="translate(${x} ${f1(y)})"><circle r="6" fill="#F2D28B" stroke="#8a6420" stroke-width="1.5"/><circle r="2" fill="#8a6420"/></g>`; }
  let fl2 = '';
  for (let x = 108; x <= 492; x += 32) { const y = 350 + 70 * Math.sqrt(Math.max(0, 1 - ((x - 300) / 240) ** 2)); fl2 += `<circle cx="${x}" cy="${f1(y)}" r="3.5" fill="#FFFDF7" opacity=".8"/>`; }
  return `<svg viewBox="0 0 600 520" width="600" height="520" style="overflow:visible">
  <ellipse cx="305" cy="430" rx="250" ry="76" fill="rgba(5,12,40,.35)"/>
  <path d="M60 170 L60 420 A240 70 0 0 0 540 420 L540 170 Z" fill="url(#tinBody)" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M60 176 A240 70 0 0 0 540 176 L540 212 A240 70 0 0 1 60 212 Z" fill="url(#goldBand)" stroke="${INK}" stroke-width="4"/>
  <path d="M60 380 A240 70 0 0 0 540 380 L540 414 A240 70 0 0 1 60 414 Z" fill="url(#goldBand)" stroke="${INK}" stroke-width="4"/>
  ${fl}${fl2}
  <ellipse cx="300" cy="322" rx="98" ry="58" fill="${CREAM}" stroke="url(#goldBand)" stroke-width="8"/>
  <ellipse cx="300" cy="322" rx="98" ry="58" fill="none" stroke="${INK}" stroke-width="3"/>
  <text x="300" y="320" text-anchor="middle" font-family="DMSerif" font-size="34" fill="${BLUE}">TRUCOS</text>
  <text x="300" y="350" text-anchor="middle" font-family="Fredoka" font-weight="600" font-size="20" fill="${RED}">de la abuela</text>
  <path class="spec" d="M112 214 L146 222 L146 428 L112 418 Z" fill="#fff" opacity=".22"/>
  <ellipse cx="300" cy="170" rx="240" ry="70" fill="#0d1840" stroke="url(#goldBand)" stroke-width="10"/>
  <ellipse cx="300" cy="170" rx="240" ry="70" fill="none" stroke="${INK}" stroke-width="3"/>
  <ellipse cx="300" cy="182" rx="216" ry="52" fill="#081030"/>
</svg>`;
};
A.lid34 = () => `<svg viewBox="0 0 600 260" width="600" height="260" style="overflow:visible">
  <path d="M48 100 A252 74 0 0 0 552 100 L552 140 A252 74 0 0 1 48 140 Z" fill="url(#goldBand)" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  <ellipse cx="300" cy="100" rx="252" ry="74" fill="url(#lidField)" stroke="${INK}" stroke-width="6"/>
  <ellipse cx="300" cy="100" rx="206" ry="58" fill="none" stroke="url(#goldG)" stroke-width="7"/>
  <ellipse cx="300" cy="100" rx="228" ry="66" fill="none" stroke="#F2D28B" stroke-width="6" stroke-dasharray="0.1 14" stroke-linecap="round"/>
  <ellipse cx="300" cy="98" rx="62" ry="32" fill="${CREAM}" stroke="url(#goldG)" stroke-width="6"/>
  <ellipse cx="300" cy="88" rx="22" ry="12" fill="#D6DBE5" stroke="${INK}" stroke-width="2"/><ellipse cx="300" cy="100" rx="14" ry="10" fill="${SKIN}" stroke="${INK}" stroke-width="2"/><ellipse cx="300" cy="120" rx="26" ry="8" fill="#B42840"/>
  <path d="M120 70 q60 -24 120 -30" stroke="#fff" stroke-width="6" opacity=".25" fill="none" stroke-linecap="round"/>
</svg>`;

/* tapa de frente (logo) */
A.lidFace = (opt = {}) => {
  let beads = ''; for (let i = 0; i < 64; i++) { const a = i / 64 * Math.PI * 2; beads += `<circle cx="${f1(450 + 429 * Math.cos(a))}" cy="${f1(450 + 429 * Math.sin(a))}" r="5.5" fill="#F7DFA0" stroke="#7a5418" stroke-width="1.8"/>`; }
  let stars = ''; [[90, 450], [810, 450]].forEach(([x, y]) => { stars += `<path transform="translate(${x} ${y})" d="M0 -22 L6 -6 L22 0 L6 6 L0 22 L-6 6 L-22 0 L-6 -6 Z" fill="url(#goldG)" stroke="#5a3d0c" stroke-width="2"/>`; });
  let fl = ''; for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; fl += `<circle cx="${f1(450 + 318 * Math.cos(a))}" cy="${f1(450 + 318 * Math.sin(a))}" r="4" fill="#F2D28B"/>`; }
  return `<svg viewBox="0 0 900 900" width="900" height="900" style="overflow:visible">
  <circle cx="462" cy="470" r="442" fill="rgba(5,12,40,.4)"/>
  <circle cx="450" cy="450" r="442" fill="url(#goldG)" stroke="#5a3d0c" stroke-width="6"/>
  ${beads}
  <circle cx="450" cy="450" r="414" fill="none" stroke="#8a6420" stroke-width="3"/>
  <circle cx="450" cy="450" r="405" fill="url(#lidField)" stroke="#5a3d0c" stroke-width="4"/>
  <path class="lidspec" d="M150 260 A330 330 0 0 1 380 110" stroke="#fff" stroke-width="18" opacity=".18" fill="none" stroke-linecap="round"/>
  ${fl}
  <circle cx="450" cy="450" r="300" fill="none" stroke="url(#goldG)" stroke-width="12"/>
  <circle cx="450" cy="450" r="300" fill="none" stroke="#5a3d0c" stroke-width="2"/>
  <circle cx="450" cy="450" r="286" fill="#152e70" opacity=".55"/>
  <path id="${opt.id || 'lf'}T" d="M108 450 A342 342 0 0 1 792 450" fill="none"/>
  <path id="${opt.id || 'lf'}B" d="M84 450 A366 366 0 0 0 816 450" fill="none"/>
  <text font-family="DMSerif" font-size="66" letter-spacing="6" fill="#F7DFA0" stroke="#8a6420" stroke-width="1.2"><textPath href="#${opt.id || 'lf'}T" startOffset="50%" text-anchor="middle">LA LATA DE LA ABUELA</textPath></text>
  <text font-family="Fredoka" font-weight="600" font-size="38" letter-spacing="5" fill="${CREAM}"><textPath href="#${opt.id || 'lf'}B" startOffset="50%" text-anchor="middle">· TRUCOS DE CASA ·</textPath></text>
  ${stars}
</svg>`;
};

/* sello dorado con número */
A.seal = (n, cls = '') => {
  let pts = ''; for (let i = 0; i < 64; i++) { const a = i / 64 * Math.PI * 2 - Math.PI / 2, r = i % 2 ? 126 : 142; pts += (i ? 'L' : 'M') + f1(150 + r * Math.cos(a)) + ' ' + f1(150 + r * Math.sin(a)); }
  return `<svg viewBox="0 0 300 370" width="300" height="370" style="overflow:visible" class="${cls}">
  <path d="M96 196 L58 352 L100 326 L124 360 L150 232 Z" fill="${RED}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M204 196 L242 352 L200 326 L176 360 L150 232 Z" fill="#a50d26" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <circle cx="156" cy="158" r="140" fill="rgba(5,12,40,.35)"/>
  <path d="${pts}Z" fill="url(#goldG)" stroke="#5a3d0c" stroke-width="5" stroke-linejoin="round"/>
  <circle cx="150" cy="150" r="106" fill="url(#lidField)" stroke="url(#goldBand)" stroke-width="9"/>
  <circle cx="150" cy="150" r="93" fill="none" stroke="#F2D28B" stroke-width="5" stroke-dasharray="0.1 12" stroke-linecap="round"/>
  <text x="150" y="98" text-anchor="middle" font-family="Fredoka" font-weight="600" font-size="24" letter-spacing="5" fill="#F2D28B">TRUCO</text>
  <g class="num"><text x="150" y="214" text-anchor="middle" font-family="DMSerif" font-size="142" fill="url(#goldG)" stroke="#5a3d0c" stroke-width="3">${n}</text></g>
  <g class="qm" opacity="0"><text x="150" y="214" text-anchor="middle" font-family="DMSerif" font-size="142" fill="${CREAM}" stroke="#5a3d0c" stroke-width="3">?</text></g>
</svg>`;
};
/* carita de asco */
A.yuck = () => `<svg viewBox="0 0 160 160" width="160" height="160" style="overflow:visible">
 <circle cx="80" cy="80" r="66" fill="#B9E3C2" stroke="${INK}" stroke-width="6"/>
 <path d="M44 62 l22 8 M116 62 l-22 8" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
 <path d="M50 78 q10 -8 20 0 M90 78 q10 -8 20 0" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>
 <path d="M84 106 q0 26 14 26 q14 0 14 -26 Z" fill="#E0566A" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
 <path d="M42 106 q9 -10 17 0 q9 10 17 0 q9 -10 17 0 q9 10 17 0 q9 -10 15 0" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>
</svg>`;
/* blonda de puntilla */
A.doily = (r = 200, n = 36) => {
  const R = r + 14; let sc = '', holes = '', holes2 = '';
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; sc += `<circle cx="${f1(R + r * Math.cos(a))}" cy="${f1(R + r * Math.sin(a))}" r="${f1(r * Math.sin(Math.PI / n) * 1.25)}"/>`; holes += `<circle cx="${f1(R + (r - 16) * Math.cos(a))}" cy="${f1(R + (r - 16) * Math.sin(a))}" r="5"/>`; const b = a + Math.PI / n; holes2 += `<ellipse transform="rotate(${f1(b * 180 / Math.PI)} ${f1(R + (r - 40) * Math.cos(b))} ${f1(R + (r - 40) * Math.sin(b))})" cx="${f1(R + (r - 40) * Math.cos(b))}" cy="${f1(R + (r - 40) * Math.sin(b))}" rx="9" ry="4"/>`; }
  return `<svg viewBox="0 0 ${2 * R} ${2 * R}" width="${2 * R}" height="${2 * R}"><g fill="#FFFDF7" stroke="#d9cdb4" stroke-width="2">${sc}<circle cx="${R}" cy="${R}" r="${r}"/></g><g fill="#dfe5f2">${holes}${holes2}</g><circle cx="${R}" cy="${R}" r="${r - 60}" fill="none" stroke="#e5dcc8" stroke-width="3" stroke-dasharray="2 8"/></svg>`;
};
A.rays = (n = 16, R = 600) => {
  let s = ''; for (let i = 0; i < n; i++) { const a0 = i / n * Math.PI * 2, a1 = a0 + Math.PI / n; s += `<path d="M${R} ${R} L${f1(R + R * Math.cos(a0))} ${f1(R + R * Math.sin(a0))} L${f1(R + R * Math.cos(a1))} ${f1(R + R * Math.sin(a1))} Z"/>`; }
  return `<svg viewBox="0 0 ${2 * R} ${2 * R}" width="${2 * R}" height="${2 * R}"><defs><radialGradient id="rayFade${R}"><stop offset="0" stop-color="#FFF1C4" stop-opacity=".55"/><stop offset="1" stop-color="#FFF1C4" stop-opacity="0"/></radialGradient></defs><g fill="url(#rayFade${R})">${s}</g></svg>`;
};
A.star = (c = '#FFF1C4') => `<svg viewBox="-30 -30 60 60" width="60" height="60"><path d="M0 -28 Q4 -4 28 0 Q4 4 0 28 Q-4 4 -28 0 Q-4 -4 0 -28 Z" fill="${c}" stroke="#8a6420" stroke-width="1.5"/></svg>`;

/* ---------- objetos ---------- */
A.board = (id) => `<svg viewBox="0 0 760 540" width="760" height="540" style="overflow:visible">
 <defs><clipPath id="${id}clip" clipPathUnits="userSpaceOnUse"><rect id="${id}er" x="-100" y="-50" width="1000" height="640"/></clipPath>
 <clipPath id="${id}in"><rect x="22" y="22" width="716" height="476" rx="10"/></clipPath></defs>
 <rect x="10" y="16" width="760" height="520" rx="22" fill="rgba(5,12,40,.35)"/>
 <rect x="0" y="0" width="760" height="520" rx="22" fill="url(#silverG)" stroke="${INK}" stroke-width="6"/>
 <rect x="22" y="22" width="716" height="476" rx="10" fill="#FFFFFF" stroke="${INK}" stroke-width="4"/>
 <path d="M420 22 L520 22 L330 498 L230 498 Z" fill="#EEF3FF" opacity=".8"/>
 <path d="M560 22 L590 22 L400 498 L370 498 Z" fill="#EEF3FF" opacity=".8"/>
 <g clip-path="url(#${id}in)"><g clip-path="url(#${id}clip)">
  <g class="perm" fill="#121216" stroke="#121216">
   <text x="380" y="250" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="124" stroke-width="5" stroke-linejoin="round" transform="rotate(-5 380 250)">NO TOCAR</text>
   <path d="M120 304 Q300 336 470 300 T650 292" fill="none" stroke-width="13" stroke-linecap="round"/>
   <g fill="none" stroke-width="9" stroke-linecap="round"><circle cx="150" cy="412" r="44"/><path d="M128 400 v2 M170 400 v2 M126 424 q24 22 48 0"/>
   <path d="M600 372 L614 404 L648 408 L622 430 L630 464 L600 446 L570 464 L578 430 L552 408 L586 404 Z" stroke-linejoin="round"/>
   <path d="M300 420 q30 -40 60 0 t60 0 t60 0"/></g>
  </g>
  <path class="hatch" d="M100 140 L660 165 L100 210 L670 236 L96 284 L670 304 L104 350 L670 372 L112 418 L660 446" fill="none" stroke="#2E64D8" stroke-width="44" stroke-linecap="round" stroke-linejoin="round" opacity=".8" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>
 </g></g>
 <rect x="120" y="512" width="520" height="22" rx="8" fill="url(#silverG)" stroke="${INK}" stroke-width="4"/>
</svg>`;
A.marker = (body, band, label, tip) => `<svg viewBox="0 0 120 420" width="120" height="420" style="overflow:visible">
 <rect x="30" y="0" width="60" height="300" rx="20" fill="${body}" stroke="${INK}" stroke-width="6"/>
 <rect x="30" y="34" width="60" height="56" fill="${band}" stroke="${INK}" stroke-width="4"/>
 <text transform="translate(66 250) rotate(-90)" font-family="Fredoka" font-weight="700" font-size="22" letter-spacing="1" fill="${band}">${label}</text>
 <path d="M30 296 L90 296 L76 360 L44 360 Z" fill="#dde2ea" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
 <path d="M47 358 L73 358 L66 404 L54 404 Z" fill="${tip}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
 <rect x="40" y="8" width="10" height="270" rx="5" fill="#fff" opacity=".35"/>
</svg>`;
A.eraser = () => `<svg viewBox="0 0 140 340" width="140" height="340" style="overflow:visible">
 <rect x="10" y="12" width="44" height="316" rx="14" fill="#4a4a52" stroke="${INK}" stroke-width="6"/>
 <rect x="36" y="0" width="100" height="340" rx="28" fill="${BLUE2}" stroke="${INK}" stroke-width="6"/>
 <rect x="74" y="24" width="24" height="292" rx="12" fill="url(#goldG)" stroke="#5a3d0c" stroke-width="2"/>
 <rect x="48" y="18" width="12" height="300" rx="6" fill="#fff" opacity=".25"/>
</svg>`;
A.bin = () => `<svg viewBox="0 0 260 330" width="260" height="330" style="overflow:visible">
 <ellipse cx="135" cy="318" rx="110" ry="14" fill="rgba(5,12,40,.35)"/>
 <path d="M34 86 L226 86 L204 312 L56 312 Z" fill="url(#silverG)" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
 <path d="M80 110 L88 292 M130 110 V292 M180 110 L172 292" stroke="#7d8698" stroke-width="7" stroke-linecap="round"/>
 <g class="binlid"><rect x="20" y="64" width="220" height="26" rx="12" fill="url(#silverG)" stroke="${INK}" stroke-width="6"/><rect x="108" y="44" width="44" height="24" rx="10" fill="url(#silverG)" stroke="${INK}" stroke-width="5"/></g>
</svg>`;
A.grab = () => `<svg viewBox="0 0 420 230" width="420" height="230" style="overflow:visible">
 <path d="M160 70 L430 46 L430 190 L160 176 Z" fill="#E9DCC0" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
 <path d="M220 66 L224 180 M280 60 L284 184 M340 54 L344 188" stroke="#9fb3d9" stroke-width="10"/>
 <rect x="146" y="62" width="34" height="122" rx="12" fill="#E9DCC0" stroke="${INK}" stroke-width="6"/>
 <g fill="${SKIN}" stroke="${INK}" stroke-width="5" stroke-linejoin="round">
  <path d="M150 74 Q96 66 78 100 Q66 146 96 168 Q130 182 152 170 Z"/>
  <rect x="34" y="84" width="76" height="24" rx="12"/><rect x="30" y="110" width="80" height="24" rx="12"/><rect x="34" y="136" width="76" height="24" rx="12"/><rect x="44" y="160" width="64" height="22" rx="11"/>
  <path d="M110 80 Q86 52 64 62 Q56 74 92 96 Z"/>
 </g>
</svg>`;
A.clock = () => `<svg viewBox="0 0 200 236" width="200" height="236" style="overflow:visible">
 <rect x="82" y="2" width="36" height="22" rx="6" fill="url(#silverG)" stroke="${INK}" stroke-width="5"/>
 <rect x="150" y="30" width="26" height="18" rx="5" transform="rotate(40 163 39)" fill="url(#silverG)" stroke="${INK}" stroke-width="4"/>
 <circle cx="100" cy="134" r="92" fill="url(#goldG)" stroke="${INK}" stroke-width="5"/>
 <circle cx="100" cy="134" r="76" fill="${CREAM}" stroke="#5a3d0c" stroke-width="3"/>
 ${Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2; return `<line x1="${f1(100 + 64 * Math.sin(a))}" y1="${f1(134 - 64 * Math.cos(a))}" x2="${f1(100 + 72 * Math.sin(a))}" y2="${f1(134 - 72 * Math.cos(a))}" stroke="${BLUE}" stroke-width="${i % 3 ? 3 : 6}" stroke-linecap="round"/>`; }).join('')}
 <path class="sweep" d="M100 134 L100 62 A72 72 0 0 1 100 62 Z" fill="${RED}" opacity=".25"/>
 <line class="hand" x1="100" y1="134" x2="100" y2="70" stroke="${RED}" stroke-width="7" stroke-linecap="round"/>
 <circle cx="100" cy="134" r="10" fill="${BLUE}" stroke="${INK}" stroke-width="3"/>
</svg>`;
A.lupa = (id, inner = '') => `<svg viewBox="0 0 780 780" width="780" height="780" style="overflow:visible">
 <defs><clipPath id="${id}"><circle cx="320" cy="320" r="270"/></clipPath></defs>
 <g transform="rotate(-42 320 320)"><rect x="294" y="612" width="52" height="170" rx="24" fill="#7A1F2B" stroke="${INK}" stroke-width="6"/><rect x="300" y="582" width="40" height="44" rx="8" fill="url(#goldG)" stroke="${INK}" stroke-width="5"/></g>
 <circle cx="328" cy="332" r="296" fill="rgba(5,12,40,.35)"/>
 <circle cx="320" cy="320" r="270" fill="${CREAM}"/>
 <g clip-path="url(#${id})" class="lens">${inner}</g>
 <circle cx="320" cy="320" r="286" fill="none" stroke="url(#goldG)" stroke-width="34"/>
 <circle cx="320" cy="320" r="286" fill="none" stroke="${INK}" stroke-width="3"/>
 <circle cx="320" cy="320" r="270" fill="none" stroke="${INK}" stroke-width="5"/>
 <path d="M140 200 A210 210 0 0 1 260 110" stroke="#fff" stroke-width="16" fill="none" opacity=".55" stroke-linecap="round"/>
</svg>`;
A.pencil = () => `<svg viewBox="0 0 470 80" width="470" height="80" style="overflow:visible">
 <path d="M30 26 L92 10 L92 70 L30 54 Z" fill="#EBC79E" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
 <path d="M2 40 L32 27 L32 53 Z" fill="#3c3c46" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
 <path d="M6 37 L20 31" stroke="#c9d0dc" stroke-width="3" stroke-linecap="round"/>
 <rect x="90" y="10" width="300" height="60" fill="#F5C542" stroke="${INK}" stroke-width="5"/>
 <path d="M90 30 H390 M90 50 H390" stroke="#d9a521" stroke-width="4"/>
 <text x="240" y="47" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="20" fill="#8a6420">HB · Nº 2</text>
 <rect x="388" y="8" width="38" height="64" fill="url(#silverG)" stroke="${INK}" stroke-width="5"/>
 <path d="M400 8 V72 M414 8 V72" stroke="#7d8698" stroke-width="3"/>
 <rect x="424" y="10" width="40" height="60" rx="14" fill="#E98394" stroke="${INK}" stroke-width="5"/>
</svg>`;
A.lock = () => `<svg viewBox="0 0 300 420" width="300" height="420" style="overflow:visible">
 <rect x="48" y="30" width="220" height="380" rx="70" fill="rgba(5,12,40,.3)"/>
 <rect x="40" y="20" width="220" height="380" rx="70" fill="url(#goldG)" stroke="${INK}" stroke-width="6"/>
 <rect x="58" y="38" width="184" height="344" rx="56" fill="none" stroke="#8a6420" stroke-width="4"/>
 <circle cx="150" cy="70" r="12" fill="url(#silverG)" stroke="${INK}" stroke-width="3"/><path d="M142 70 h16" stroke="${INK}" stroke-width="3"/>
 <circle cx="150" cy="350" r="12" fill="url(#silverG)" stroke="${INK}" stroke-width="3"/><path d="M142 350 h16" stroke="${INK}" stroke-width="3"/>
 <circle cx="150" cy="180" r="34" fill="#14141a"/><path d="M130 190 L170 190 L184 280 L116 280 Z" fill="#14141a"/>
</svg>`;
A.key = () => `<svg viewBox="0 0 160 330" width="160" height="330" style="overflow:visible">
 <path fill-rule="evenodd" d="M80 6 a64 64 0 1 1 -0.1 0 Z M80 46 a24 24 0 1 0 0.1 0 Z" fill="url(#goldG)" stroke="${INK}" stroke-width="6"/>
 <rect x="64" y="128" width="32" height="190" rx="8" fill="url(#goldG)" stroke="${INK}" stroke-width="5"/>
 <rect x="92" y="250" width="32" height="20" rx="4" fill="url(#goldG)" stroke="${INK}" stroke-width="4"/><rect x="92" y="282" width="24" height="20" rx="4" fill="url(#goldG)" stroke="${INK}" stroke-width="4"/>
 <path d="M40 40 a50 50 0 0 1 36 -20" stroke="#fff" stroke-width="6" fill="none" opacity=".6" stroke-linecap="round"/>
</svg>`;
A.shirt = (id) => `<svg viewBox="0 0 560 600" width="560" height="600" style="overflow:visible">
 <path d="M126 66 L204 32 Q280 62 356 32 L434 66 L540 176 L470 238 L430 198 L430 590 L130 590 L130 198 L90 238 L20 176 Z" fill="rgba(5,12,40,.3)" transform="translate(10 12)"/>
 <path d="M126 66 L204 32 Q280 62 356 32 L434 66 L540 176 L470 238 L430 198 L430 590 L130 590 L130 198 L90 238 L20 176 Z" fill="#FFFFFF" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
 <path d="M130 198 L130 590 L170 590 Q150 400 160 210 Z" fill="#E8ECF4"/>
 <path d="M90 238 L130 198 M470 238 L430 198" stroke="${INK}" stroke-width="5"/>
 <path d="M60 140 l40 30 M500 140 l-40 30" stroke="#d6dbe5" stroke-width="5" stroke-linecap="round"/>
 <path d="M280 108 V590" stroke="${INK}" stroke-width="4"/><path d="M300 120 V590" stroke="#d6dbe5" stroke-width="4"/>
 ${[170, 250, 330, 410, 490].map(y => `<circle cx="292" cy="${y}" r="8" fill="#E8ECF3" stroke="${INK}" stroke-width="3"/>`).join('')}
 <rect x="336" y="200" width="78" height="86" rx="8" fill="none" stroke="${INK}" stroke-width="4"/>
 <path d="M204 32 L280 112 L232 136 L188 62 Z" fill="#F4F6FA" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
 <path d="M356 32 L280 112 L328 136 L372 62 Z" fill="#F4F6FA" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
 <g class="stain" transform="translate(210 290)"><g class="stainIn"><path d="M-30 -6 Q-34 -30 -8 -32 Q6 -46 22 -30 Q40 -24 32 -2 Q42 18 20 26 Q6 40 -12 28 Q-36 26 -30 -6 Z" fill="${RED}"/><circle cx="44" cy="-26" r="7" fill="${RED}"/><circle cx="-40" cy="24" r="6" fill="${RED}"/><circle cx="34" cy="34" r="4.5" fill="${RED}"/><ellipse cx="-6" cy="-14" rx="10" ry="6" fill="#fff" opacity=".35"/></g></g>
</svg>`;
A.drop = (c = RED) => `<svg viewBox="0 0 60 84" width="60" height="84" style="overflow:visible"><path d="M30 2 Q52 40 52 56 A22 22 0 0 1 8 56 Q8 40 30 2 Z" fill="${c}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><ellipse cx="22" cy="54" rx="6" ry="9" fill="#fff" opacity=".5"/></svg>`;
A.tap = (handle, cls) => `<svg viewBox="0 0 300 470" width="300" height="470" style="overflow:visible">
 <rect x="226" y="168" width="22" height="300" rx="11" class="water ${cls}" fill="#86B8F2" stroke="#3f7fd0" stroke-width="3" opacity="0"/>
 <rect x="10" y="40" width="58" height="104" rx="14" fill="url(#silverG)" stroke="${INK}" stroke-width="5"/>
 <rect x="56" y="70" width="150" height="42" rx="16" fill="url(#silverG)" stroke="${INK}" stroke-width="5"/>
 <path d="M188 72 Q256 72 256 142 L256 170 L218 170 L218 148 Q218 114 188 114 Z" fill="url(#silverG)" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
 <rect x="118" y="40" width="22" height="34" fill="url(#silverG)" stroke="${INK}" stroke-width="4"/>
 <rect x="80" y="18" width="98" height="28" rx="14" fill="${handle}" stroke="${INK}" stroke-width="5"/>
 <circle cx="129" cy="32" r="9" fill="#fff" stroke="${INK}" stroke-width="3"/>
</svg>`;
A.snow = () => `<svg viewBox="-50 -50 100 100" width="100" height="100"><circle r="46" fill="#DCEBFF" stroke="${INK}" stroke-width="5"/><g stroke="#2E64D8" stroke-width="6" stroke-linecap="round">${[0, 60, 120].map(a => `<g transform="rotate(${a})"><path d="M0 -30 V30 M-9 -22 L0 -14 L9 -22 M-9 22 L0 14 L9 22"/></g>`).join('')}</g></svg>`;
A.flame = () => `<svg viewBox="-50 -50 100 100" width="100" height="100"><circle r="46" fill="#FFE2D6" stroke="${INK}" stroke-width="5"/><path d="M0 32 Q-24 28 -22 6 Q-20 -10 -6 -30 Q-4 -12 8 -8 Q6 -22 14 -28 Q26 -6 22 10 Q20 30 0 32 Z" fill="#F25244" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><path d="M0 28 Q-10 24 -8 12 Q-6 4 2 -4 Q4 8 10 10 Q12 26 0 28 Z" fill="#F2983E"/></svg>`;
A.padlock = () => `<svg viewBox="0 0 120 140" width="120" height="140" style="overflow:visible"><path d="M30 64 V40 a30 30 0 0 1 60 0 V64" fill="none" stroke="url(#silverG)" stroke-width="16"/><path d="M30 64 V40 a30 30 0 0 1 60 0 V64" fill="none" stroke="${INK}" stroke-width="4"/><rect x="12" y="60" width="96" height="76" rx="14" fill="url(#goldG)" stroke="${INK}" stroke-width="6"/><circle cx="60" cy="92" r="10" fill="${INK}"/><rect x="56" y="96" width="8" height="22" rx="3" fill="${INK}"/></svg>`;
A.check = (bg = '#2f9e5b') => `<svg viewBox="-50 -50 100 100" width="100" height="100"><circle r="44" fill="${bg}" stroke="${INK}" stroke-width="6"/><path d="M-20 0 L-5 16 L22 -16" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
A.cross = () => `<svg viewBox="-50 -50 100 100" width="100" height="100"><circle r="44" fill="${RED}" stroke="${INK}" stroke-width="6"/><path d="M-17 -17 L17 17 M17 -17 L-17 17" stroke="#fff" stroke-width="12" stroke-linecap="round"/></svg>`;
A.painting = (id) => {
  let dabs = ''; const D = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) { const x = 90 + (r % 2 ? 6 - c : c) * 77, y = 100 + r * 82; D.push([x, y]); dabs += `<circle class="dab" cx="${x}" cy="${y}" r="62" fill="#000" opacity="0"/>`; }
  A._dabs = D;
  return `<svg viewBox="0 0 640 520" width="640" height="520" style="overflow:visible">
 <defs><mask id="${id}m" maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="520"><rect x="0" y="0" width="640" height="520" fill="#fff"/>${dabs}</mask></defs>
 <rect x="12" y="16" width="640" height="520" rx="10" fill="rgba(5,12,40,.35)"/>
 <rect x="0" y="0" width="640" height="520" rx="10" fill="url(#goldG)" stroke="${INK}" stroke-width="6"/>
 <rect x="20" y="20" width="600" height="480" rx="6" fill="none" stroke="#8a6420" stroke-width="5"/>
 <rect x="34" y="34" width="572" height="452" fill="none" stroke="#FFF1C4" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round"/>
 ${[[24, 24], [616, 24], [24, 496], [616, 496]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="22" fill="url(#goldG)" stroke="${INK}" stroke-width="4"/><circle cx="${x}" cy="${y}" r="8" fill="#8a6420"/>`).join('')}
 <rect x="54" y="54" width="532" height="412" fill="url(#skyG)" stroke="${INK}" stroke-width="4"/>
 <circle cx="460" cy="150" r="44" fill="#F2B24E"/>
 <path d="M54 330 Q180 250 300 300 T586 270 L586 466 L54 466 Z" fill="#7aa36a"/>
 <path d="M54 380 Q220 330 360 372 T586 350 L586 466 L54 466 Z" fill="#D9B45C"/>
 <rect x="170" y="270" width="90" height="70" fill="${CREAM}" stroke="${INK}" stroke-width="3"/><path d="M160 274 L215 228 L270 274 Z" fill="#B42840" stroke="${INK}" stroke-width="3"/><rect x="204" y="300" width="22" height="40" fill="#7A1F2B"/>
 <path d="M420 330 v-50" stroke="#6b4a2a" stroke-width="12"/><circle cx="420" cy="262" r="38" fill="#4f7d4a"/>
 <path d="M100 120 q20 -14 40 0 q20 -14 40 0" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>
 <rect x="54" y="54" width="532" height="412" fill="#4a3112" opacity=".8" mask="url(#${id}m)"/>
</svg>`;
};
A.swab = () => `<svg viewBox="0 0 300 300" width="300" height="300" style="overflow:visible">
 <path d="M30 40 L210 220" stroke="#F4F0E6" stroke-width="12" stroke-linecap="round"/><path d="M30 40 L210 220" stroke="${INK}" stroke-width="3" opacity=".3"/>
 <ellipse cx="24" cy="34" rx="22" ry="15" transform="rotate(45 24 34)" fill="#fff" stroke="${INK}" stroke-width="4"/>
 <g transform="translate(150 150)"><rect x="40" y="30" width="96" height="70" rx="30" transform="rotate(45 88 65)" fill="#fff" stroke="${INK}" stroke-width="5"/><rect x="100" y="90" width="80" height="58" rx="10" transform="rotate(45 140 119)" fill="${BLUE2}" stroke="${INK}" stroke-width="5"/></g>
</svg>`;
A.spool = (c) => `<svg viewBox="0 0 120 150" width="120" height="150" style="overflow:visible"><rect x="16" y="26" width="88" height="100" fill="${c}" stroke="${INK}" stroke-width="5"/>${[40, 54, 68, 82, 96, 110].map(y => `<path d="M18 ${y} q42 8 84 -2" stroke="rgba(255,255,255,.35)" stroke-width="3" fill="none"/>`).join('')}<ellipse cx="60" cy="130" rx="56" ry="16" fill="#D9A86A" stroke="${INK}" stroke-width="5"/><ellipse cx="60" cy="22" rx="56" ry="16" fill="#E8BE84" stroke="${INK}" stroke-width="5"/><ellipse cx="60" cy="22" rx="12" ry="5" fill="#7a5a30"/></svg>`;
A.btn = (c, r = 40) => `<svg viewBox="-50 -50 100 100" width="${r * 2}" height="${r * 2}" style="overflow:visible"><circle r="44" fill="${c}" stroke="${INK}" stroke-width="6"/><circle r="32" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="4"/>${[[-10, -10], [10, -10], [-10, 10], [10, 10]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5.5" fill="${INK}"/>`).join('')}<path d="M-30 -18 a36 36 0 0 1 20 -18" stroke="#fff" stroke-width="5" opacity=".5" fill="none" stroke-linecap="round"/></svg>`;
A.thimble = () => `<svg viewBox="0 0 120 140" width="120" height="140" style="overflow:visible"><path d="M20 120 L28 40 Q60 0 92 40 L100 120 Z" fill="url(#silverG)" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><rect x="14" y="110" width="92" height="22" rx="10" fill="url(#silverG)" stroke="${INK}" stroke-width="5"/>${Array.from({ length: 18 }, (_, i) => `<circle cx="${36 + (i % 6) * 10 - (i % 2) * 3}" cy="${44 + Math.floor(i / 6) * 20}" r="3" fill="#7d8698"/>`).join('')}</svg>`;
A.cushion = () => `<svg viewBox="0 0 150 130" width="150" height="130" style="overflow:visible"><path d="M40 40 L30 6 M72 30 L76 0 M104 40 L122 10" stroke="#9aa3b2" stroke-width="4"/><circle cx="30" cy="6" r="8" fill="#F2D28B" stroke="${INK}" stroke-width="3"/><circle cx="76" cy="0" r="8" fill="#2E64D8" stroke="${INK}" stroke-width="3"/><circle cx="122" cy="10" r="8" fill="#fff" stroke="${INK}" stroke-width="3"/><ellipse cx="75" cy="78" rx="66" ry="46" fill="${RED}" stroke="${INK}" stroke-width="5"/><path d="M75 34 Q60 78 75 122 M75 34 Q30 70 26 100 M75 34 Q120 70 124 100" stroke="#8d0b21" stroke-width="4" fill="none"/><ellipse cx="50" cy="60" rx="14" ry="8" fill="#fff" opacity=".35"/></svg>`;
A.liner = () => `<svg viewBox="0 0 170 130" width="170" height="130" style="overflow:visible"><path d="M14 40 L156 40 L134 124 L36 124 Z" fill="#FFFDF7" stroke="#bfb39a" stroke-width="4" stroke-linejoin="round"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${24 + i * 15} 42 L${42 + i * 11.2} 122" stroke="#e2d8c4" stroke-width="3"/>`).join('')}<circle cx="62" cy="34" r="24" fill="#2E64D8" stroke="${INK}" stroke-width="4"/><circle cx="104" cy="30" r="22" fill="#F2D28B" stroke="${INK}" stroke-width="4"/><circle cx="84" cy="14" r="18" fill="${RED}" stroke="${INK}" stroke-width="4"/>${[[62, 34], [104, 30], [84, 14]].map(([x, y]) => `<circle cx="${x - 5}" cy="${y}" r="3" fill="${INK}"/><circle cx="${x + 5}" cy="${y}" r="3" fill="${INK}"/>`).join('')}</svg>`;
A.cookie = () => `<svg viewBox="-60 -60 120 120" width="120" height="120"><circle r="44" fill="#E8B96A" stroke="${INK}" stroke-width="5"/><circle r="32" fill="none" stroke="#c48f3c" stroke-width="4" stroke-dasharray="4 6"/>${[[-10, -8], [12, -4], [0, 14], [-14, 14], [16, 16]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="#fff"/>`).join('')}<circle r="54" fill="none" stroke="${RED}" stroke-width="10"/><path d="M-38 -38 L38 38" stroke="${RED}" stroke-width="10" stroke-linecap="round"/></svg>`;
A.layers = () => `<svg viewBox="0 0 560 70" width="560" height="70" style="overflow:visible"><path d="M40 6 L556 6 L520 64 L4 64 Z" fill="#5d6474" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>${Array.from({ length: 13 }, (_, i) => `<path transform="translate(${44 + i * 38} 35)" d="M-12 -14 L6 -14 L14 0 L6 14 L-12 14 L-20 0 Z" fill="none" stroke="#aab3c4" stroke-width="3"/>`).join('')}<path d="M44 12 L540 12" stroke="#fff" stroke-width="4" opacity=".45"/></svg>`;
