/* Ep. 8 · La muralla invisible — figuras nuevas en estilo grabado (SVG strings) */
const SKY = '#1F1A2B', OCEAN = '#B7CCCB', SAND = '#D9C49A', STONE = '#9DA3A6', SUIT = '#EEE8DA';

/* ---------------- ASTRONAUTA (busto) viewBox 0 0 360 460 ---------------- */
function astroInner(o = {}) {
  const id = uid('as');
  let s = bustInner({ uniform: 'farmer', seed: o.seed || 9 });
  const suit = 'M28,460 C32,384 80,338 140,328 L220,328 C280,338 328,384 332,460 Z';
  s += D(suit, SUIT, 3) + clipG(id + 's', suit, `<rect x="236" y="320" width="130" height="150" fill="url(#hA)"/><rect x="20" y="432" width="330" height="40" fill="url(#hB)"/><path d="M40,330 L40,470" stroke="none"/>`);
  s += `<path d="M78,392 Q106,404 112,460 M282,392 Q254,404 248,460 M44,430 Q180,412 316,430" stroke="${INK}" stroke-width="2.2" fill="none" opacity=".7"/>`;
  s += `<path d="M64,412 l10,4 M70,440 l10,3 M290,412 l-10,4 M286,440 l-10,3" stroke="${INK}" stroke-width="2"/>`;
  // caja de controles del pecho
  s += `<rect x="146" y="376" width="68" height="48" rx="7" fill="#d9cfb8" stroke="${INK}" stroke-width="3"/><rect x="146" y="376" width="68" height="48" rx="7" fill="url(#hF)" opacity=".5"/>`;
  s += `<circle cx="164" cy="400" r="7" fill="${RED}" stroke="${INK}" stroke-width="2.5"/><circle cx="182" cy="400" r="7" fill="${YEL}" stroke="${INK}" stroke-width="2.5"/><circle cx="200" cy="400" r="7" fill="${FIG}" stroke="${INK}" stroke-width="2.5"/>`;
  s += `<path d="M150,436 Q120,446 100,470 M210,436 Q240,446 262,470" stroke="${INK}" stroke-width="4" fill="none"/>`;
  if (o.flag) s += `<rect x="250" y="368" width="46" height="30" fill="${RED}" stroke="${INK}" stroke-width="2.5"/><path d="M259,374 l2.6,5.2 5.6,.6 -4.2,3.8 1.2,5.6 -5.2,-2.8 -5.2,2.8 1.2,-5.6 -4.2,-3.8 5.6,-.6 Z" fill="${YEL}"/>`;
  // anillo del cuello
  s += `<ellipse cx="180" cy="334" rx="70" ry="17" fill="${BRASS}" stroke="${INK}" stroke-width="3.5"/><ellipse cx="180" cy="334" rx="70" ry="17" fill="url(#hA)" opacity=".5"/>`;
  for (let k = 0; k < 8; k++) { const a = Math.PI * (0.1 + k * 0.8 / 7); s += `<circle cx="${f1(180 - Math.cos(a) * 62)}" cy="${f1(336 + Math.sin(a) * 9)}" r="3.2" fill="${INK}"/>`; }
  if (o.hair) {
    const hair = 'M114,206 C104,146 136,120 180,118 C224,120 256,146 246,206 C242,180 226,162 204,158 C190,166 168,166 152,158 C132,164 118,180 114,206 Z';
    s += D(hair, '#2a2018', 3) + `<path d="${hair}" fill="url(#hD)" opacity=".5"/><path d="M140,140 q30,-14 70,-6 M150,128 q30,-8 60,0" stroke="#7a6a58" stroke-width="2" fill="none"/>`;
  }
  if (o.bowl) {
    s += `<circle cx="180" cy="212" r="132" fill="rgba(190,214,226,.22)" stroke="${INK}" stroke-width="6"/>`;
    s += `<path d="M86,150 A112,112 0 0,1 168,96" stroke="#fff" stroke-width="12" stroke-linecap="round" fill="none" opacity=".75"/><path d="M84,186 A112,112 0 0,1 88,166" stroke="#fff" stroke-width="10" stroke-linecap="round" fill="none" opacity=".7"/>`;
    s += `<path d="M262,276 A110,110 0 0,1 230,310" stroke="${INK}" stroke-width="3" fill="none" opacity=".5"/>`;
  }
  if (o.binos) {
    const t1 = limb(156, 206, 112, 292, 20, 25), t2 = limb(204, 206, 172, 300, 20, 25);
    s += `<g class="binos">${cut(P(t1) + P(t2), 5, 6)}${D(t1, '#3a2f26')}${HF(t1, 'hD')}${D(t2, '#3a2f26')}${HF(t2, 'hA')}`;
    s += `<path d="M166,244 L192,250" stroke="${INK}" stroke-width="12"/><ellipse cx="112" cy="294" rx="26" ry="12" transform="rotate(-30 112 294)" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><ellipse cx="172" cy="302" rx="26" ry="12" transform="rotate(-22 172 302)" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>`;
    s += `<ellipse cx="112" cy="296" rx="16" ry="7" transform="rotate(-30 112 296)" fill="#160f0a"/><ellipse cx="172" cy="304" rx="16" ry="7" transform="rotate(-22 172 304)" fill="#160f0a"/>`;
    s += gloveHand(118, 318, -24, 0.8) + gloveHand(196, 322, 18, 0.8) + `</g>`;
  }
  return s;
}

/* ---------------- TIERRA viewBox 0 0 400 400 ---------------- */
function earthInner(o = {}) {
  const id = uid('ea'), r = rng(o.seed || 41);
  const blob = (cx, cy, rx, ry, n = 14, j = 0.35) => { const pts = []; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, rr = 1 + (r() - .5) * j * 2; pts.push([cx + Math.cos(a) * rx * rr, cy + Math.sin(a) * ry * rr]); } return smooth(pts); };
  const conts = [blob(150, 140, 92, 64, 16), blob(110, 270, 50, 80, 12), blob(282, 214, 70, 98, 14), blob(300, 92, 46, 26, 10)];
  let inner = `<rect x="0" y="0" width="400" height="400" fill="${OCEAN}"/><rect x="0" y="0" width="400" height="400" fill="url(#hW)" opacity=".35"/>`;
  conts.forEach(c => inner += `<path d="${c}" fill="${SAND}" stroke="${INK}" stroke-width="3"/><path d="${c}" fill="url(#hP)"/>`);
  if (o.wall) inner += `<path class="ewall" d="M110,128 q18,-8 30,2 t34,-4 t30,6" stroke="${INK}" stroke-width="${o.wall}" fill="none" stroke-linecap="round"/>`;
  // nubes
  let cl = ''; for (let k = 0; k < 7; k++) { const x = 40 + r() * 320, y = 40 + r() * 320, w = 40 + r() * 70; cl += `M${f1(x)},${f1(y)} q${f1(w * .25)},-14 ${f1(w * .5)},0 q${f1(w * .25)},12 ${f1(w * .5)},-2`; }
  inner += `<path class="clouds" d="${cl}" stroke="#fff" stroke-width="9" stroke-linecap="round" fill="none" opacity=".95"/><path d="${cl}" stroke="${INK}" stroke-width="1.5" fill="none" opacity=".35"/>`;
  inner += `<ellipse cx="320" cy="300" rx="190" ry="230" fill="url(#hD)" opacity=".55"/>`;
  let s = cut('<circle cx="200" cy="200" r="190"/>', 8, 10) + clipG(id, 'M10,200a190,190 0 1,0 380,0a190,190 0 1,0 -380,0', inner);
  s += `<circle cx="200" cy="200" r="190" fill="none" stroke="${INK}" stroke-width="5"/><path d="M60,110 A160,160 0 0,1 150,36" stroke="#fff" stroke-width="7" fill="none" opacity=".6" stroke-linecap="round"/>`;
  return s;
}

/* ---------------- montañas (cordillera) ---------------- */
function ridge(seed, y0, amp, n, fill, w = 1080) {
  const r = rng(seed); let d = `M-40,${y0 + 400} L-40,${y0}`; const pts = [];
  for (let i = 0; i <= n; i++) { const x = -40 + (w + 80) * i / n, y = y0 - (i % 2 ? amp * (0.6 + r() * 0.5) : amp * r() * 0.25); pts.push([x, y]); d += ` L${f1(x)},${f1(y)}`; }
  d += ` L${w + 40},${y0 + 400} Z`;
  let sh = ''; for (let i = 1; i < pts.length; i += 2) { const [x, y] = pts[i], nx = pts[i + 1] || [x + 60, y0]; sh += `<path d="M${f1(x)},${f1(y)} L${f1(nx[0])},${f1(nx[1])} L${f1(nx[0])},${y0 + 400} L${f1(x)},${y0 + 400} Z" fill="url(#hA)" opacity=".7"/>`; }
  return `<path d="${d}" fill="${fill}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>` + clipG(uid('rd'), d, sh + `<rect x="-40" y="${y0 - amp * 2}" width="${w + 80}" height="${amp * 3 + 400}" fill="url(#hP)"/>`);
}
/* tramo de muralla dibujado a lo largo de un path (grosor w) */
function wallStroke(d, w, col = STONE, cls = '') {
  return `<g class="${cls}"><path d="${d}" stroke="#fff" stroke-width="${w + 12}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path class="wo" d="${d}" stroke="${INK}" stroke-width="${w + 5}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path class="wf" d="${d}" stroke="${col}" stroke-width="${w - 1}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path class="wd" d="${d}" stroke="${INK}" stroke-width="${Math.max(2, w * 0.38)}" stroke-dasharray="${f1(w * .35)} ${f1(w * .45)}" fill="none" transform="translate(0,${f1(-w * .32)})"/></g>`;
}
function towerSvg(x, y, s, col = STONE) {
  const w = 34 * s, h = 40 * s;
  return `<g class="tw"><rect x="${f1(x - w / 2)}" y="${f1(y - h)}" width="${f1(w)}" height="${f1(h)}" fill="${col}" stroke="${INK}" stroke-width="${f1(3 * Math.max(.6, s))}"/><rect x="${f1(x - w / 2)}" y="${f1(y - h)}" width="${f1(w)}" height="${f1(h)}" fill="url(#hA)" opacity=".5"/>` +
    `<path d="M${f1(x - w / 2)},${f1(y - h)} v${f1(-8 * s)} h${f1(w / 5)} v${f1(8 * s)} h${f1(w / 5)} v${f1(-8 * s)} h${f1(w / 5)} v${f1(8 * s)} h${f1(w / 5)} v${f1(-8 * s)} h${f1(w / 5)} v${f1(8 * s)}" fill="${col}" stroke="${INK}" stroke-width="${f1(2.5 * Math.max(.6, s))}"/>` +
    `<rect x="${f1(x - 5 * s)}" y="${f1(y - h * .6)}" width="${f1(10 * s)}" height="${f1(14 * s)}" rx="${f1(5 * s)}" fill="#160f0a"/></g>`;
}

/* ---------------- personita (silueta de grabado) ---------------- */
function personSvg(x, y, h, seed = 1) {
  const r = rng(seed), k = h / 100, hd = 9 * k;
  const body = `M${f1(x - 12 * k)},${f1(y - 30 * k)} L${f1(x - 10 * k)},${f1(y - 70 * k)} Q${f1(x)},${f1(y - 80 * k)} ${f1(x + 10 * k)},${f1(y - 70 * k)} L${f1(x + 12 * k)},${f1(y - 30 * k)} Z`;
  const lg = `M${f1(x - 6 * k)},${f1(y - 32 * k)} L${f1(x - 8 * k - r() * 4 * k)},${f1(y)} M${f1(x + 6 * k)},${f1(y - 32 * k)} L${f1(x + 8 * k + r() * 4 * k)},${f1(y)}`;
  return `<path d="${lg}" stroke="${INK}" stroke-width="${f1(5 * k)}" stroke-linecap="round"/><path d="${body}" fill="${r() > .5 ? RED : FIG}" stroke="${INK}" stroke-width="${f1(2.5 * k)}"/><circle cx="${x}" cy="${f1(y - 80 * k - hd)}" r="${f1(hd)}" fill="${FIG}" stroke="${INK}" stroke-width="${f1(2.5 * k)}"/>`;
}

/* ---------------- LIBRO DE TEXTO ABIERTO viewBox 0 0 900 620 ---------------- */
function textbookInner() {
  const L = 'M40,70 Q240,30 450,70 L450,600 Q240,560 40,600 Z', R = 'M450,70 Q660,30 860,70 L860,600 Q660,560 450,600 Z', cov = 'M20,80 Q240,40 450,84 Q660,40 880,80 L880,620 Q660,580 450,624 Q240,580 20,620 Z';
  let s = cut(P(cov)) + D(cov, '#2f5d8a', 5) + `<path d="${cov}" fill="url(#hD)" opacity=".35"/>`;
  s += D(L, '#FBF6EA', 3) + D(R, '#FBF6EA', 3) + `<path d="M450,70 V600" stroke="${INK}" stroke-width="4"/><path d="M420,72 Q440,330 420,598" stroke="rgba(43,33,24,.2)" stroke-width="30" fill="none"/>`;
  let ln = ''; for (let i = 0; i < 9; i++) ln += `M500,${f1(330 + i * 26)} H${i % 3 === 2 ? 700 : 810}`;
  let ln2 = ''; for (let i = 0; i < 6; i++) ln2 += `M80,${f1(440 + i * 24)} H${i % 3 === 2 ? 260 : 400}`;
  s += `<path d="${ln}${ln2}" stroke="${INK}" stroke-width="5" opacity=".35"/>`;
  s += `<text x="90" y="150" font-family="Playfair" font-weight="900" font-size="40" fill="${INK}">GEOGRAFÍA</text><text x="92" y="186" font-family="SpecialElite" font-size="24" fill="${INK}">Lección 7 · Asia</text>`;
  // grabado de la muralla en la página izquierda
  s += `<rect x="80" y="210" width="330" height="200" fill="#efe4c9" stroke="${INK}" stroke-width="3"/>` + clipG(uid('tb'), 'M80,210 h330 v200 h-330 Z', '<g transform="translate(80,0)">' + ridge(5, 380, 90, 8, '#d9c8a3', 330) + '</g>' + wallStroke('M70,400 Q150,330 230,350 T420,270', 14, STONE));
  s += `<text x="500" y="160" font-family="SpecialElite" font-size="30" fill="${INK}">¿Sabías que…?</text>`;
  s += `<text x="500" y="214" font-family="Playfair" font-style="italic" font-weight="700" font-size="34" fill="${INK}">La Gran Muralla se ve</text><text x="500" y="256" font-family="Playfair" font-style="italic" font-weight="700" font-size="34" fill="${INK}">desde el espacio.</text>`;
  s += `<path class="strike" d="M490,206 Q660,196 840,212 M490,250 Q620,244 760,252" stroke="${RED}" stroke-width="9" stroke-linecap="round" fill="none"/>`;
  return s;
}

/* ---------------- COHETE viewBox 0 0 200 420 ---------------- */
function rocketInner() {
  const body = 'M100,10 C150,60 160,150 150,320 L50,320 C40,150 50,60 100,10 Z', fl = 'M50,240 L10,340 L52,316 Z', fr = 'M150,240 L190,340 L148,316 Z', noz = 'M64,318 L136,318 L126,348 L74,348 Z';
  let s = cut([body, fl, fr, noz].map(P).join(''));
  s += D(fl, RED) + HF(fl, 'hD') + D(fr, RED) + HF(fr, 'hA') + D(noz, '#5a4a3a') + D(body, FIG, 4) + clipG(uid('rk'), body, `<rect x="110" y="0" width="60" height="330" fill="url(#hA)"/><path d="M40,80 Q100,64 160,80 L160,96 Q100,80 40,96 Z" fill="${RED}" stroke="${INK}" stroke-width="3"/>`);
  s += `<circle cx="100" cy="160" r="26" fill="${OCEAN}" stroke="${INK}" stroke-width="5"/><circle cx="100" cy="160" r="18" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/>`;
  s += `<path d="M54,260 H146" stroke="${INK}" stroke-width="2" stroke-dasharray="4 5"/>`;
  s += `<g class="flame"><path d="M76,350 Q100,440 124,350 Q112,380 100,372 Q88,380 76,350 Z" fill="${YEL}" stroke="${INK}" stroke-width="3"/><path d="M88,352 Q100,400 112,352 Z" fill="${PINK}"/></g>`;
  return s;
}

/* ---------------- CÁPSULA + PARACAÍDAS viewBox 0 0 400 640 ---------------- */
function capsuleInner() {
  const cap = 'M150,470 L250,470 L300,600 Q200,624 100,600 Z', dome = 'M30,180 Q30,20 200,20 Q370,20 370,180 Q330,160 290,180 Q250,160 200,180 Q150,160 110,180 Q70,160 30,180 Z';
  let s = `<path d="M40,178 L170,470 M120,176 L185,470 M200,180 L200,470 M280,176 L215,470 M360,178 L230,470" stroke="${INK}" stroke-width="2.5"/>`;
  s += cut(P(dome)) + D(dome, '#fff', 4) + clipG(uid('pc'), dome, `<path d="M30,0 L110,180 L150,0 Z M190,0 L200,180 L250,0 Z M290,0 L290,180 L370,40 Z" fill="${RED}"/><rect x="200" y="0" width="200" height="200" fill="url(#hA)" opacity=".5"/>`) + `<path d="${dome}" fill="none" stroke="${INK}" stroke-width="4"/>`;
  s += cut(P(cap)) + D(cap, '#cfc3a8', 4) + clipG(uid('cp'), cap, `<rect x="210" y="460" width="100" height="170" fill="url(#hA)"/><path d="M100,596 Q200,612 300,596 L300,640 L100,640 Z" fill="#3a2a1e"/>`);
  s += `<circle cx="200" cy="530" r="18" fill="${OCEAN}" stroke="${INK}" stroke-width="4"/><path d="M118,560 Q200,572 282,560" stroke="${INK}" stroke-width="2" fill="none"/>`;
  return s;
}

/* ---------------- MICRÓFONO viewBox 0 0 80 300 ---------------- */
function micSvg(col) {
  return `<svg viewBox="0 0 80 300" width="100%" height="100%" style="overflow:visible"><path d="M34,90 L30,300 L50,300 L46,90 Z" fill="#3a2f26" stroke="${INK}" stroke-width="3"/><rect x="16" y="78" width="48" height="30" rx="6" fill="${col}" stroke="${INK}" stroke-width="3"/><ellipse cx="40" cy="44" rx="30" ry="42" fill="#5a4a3a" stroke="${INK}" stroke-width="4"/><ellipse cx="40" cy="44" rx="30" ry="42" fill="url(#hW)" opacity=".5"/><path d="M18,24 Q40,8 62,24" stroke="#fff" stroke-width="3" fill="none" opacity=".4"/></svg>`;
}

/* ---------------- CÁMARA ANTIGUA + TELEOBJETIVO (lente en clase .lens) viewBox 0 0 520 320 ---------------- */
function cameraInner() {
  const bodyC = 'M30,90 L250,90 L250,280 L30,280 Z', top = 'M70,60 L150,60 L160,90 L60,90 Z';
  let s = cut(P(bodyC) + P(top)) + D(top, '#3a2f26') + D(bodyC, '#4a3a2c', 4) + clipG(uid('cb'), bodyC, `<rect x="30" y="90" width="220" height="190" fill="url(#hW)" opacity=".35"/><rect x="30" y="130" width="220" height="40" fill="url(#hD)"/>`);
  s += `<rect x="40" y="100" width="200" height="16" fill="${BRASS}" stroke="${INK}" stroke-width="2"/><circle cx="80" cy="220" r="26" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><circle cx="80" cy="220" r="12" fill="${INK}"/>`;
  s += `<rect x="186" y="40" width="40" height="22" rx="5" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>`;
  s += `<g class="flashG" style="opacity:0"><path d="M206,40 L180,-20 L204,-6 L210,-60 L226,-4 L252,-24 L226,40 Z" fill="${YEL}" stroke="${INK}" stroke-width="3"/></g>`;
  return s;
}
function lensSvg() {
  // tubo del teleobjetivo, ancho 100% (se estira con scaleX)
  return `<svg viewBox="0 0 400 160" width="100%" height="100%" preserveAspectRatio="none" style="overflow:visible"><path d="M0,30 L400,0 L400,160 L0,130 Z" fill="${FIG}" stroke="${INK}" stroke-width="5" vector-effect="non-scaling-stroke"/><path d="M0,90 L400,100 L400,160 L0,130 Z" fill="url(#hA)"/><rect x="60" y="20" width="22" height="122" fill="${INK}"/><rect x="200" y="10" width="16" height="140" fill="${BRASS}" stroke="${INK}" stroke-width="3" vector-effect="non-scaling-stroke"/><rect x="300" y="4" width="22" height="152" fill="${INK}"/></svg>`;
}

/* ---------------- OJO GRANDE viewBox 0 0 400 240 ---------------- */
function eyeInner() {
  const lid = 'M10,120 Q200,-30 390,120 Q200,270 10,120 Z';
  let s = cut(P(lid)) + D(lid, '#fff', 5) + clipG(uid('ey'), lid, `<g class="iris"><circle cx="200" cy="120" r="74" fill="#8a6a3e" stroke="${INK}" stroke-width="4"/><circle cx="200" cy="120" r="74" fill="url(#hB)" opacity=".6"/><circle cx="200" cy="120" r="34" fill="#160f0a"/><circle cx="178" cy="98" r="12" fill="#fff"/></g><path d="M10,120 Q200,30 390,120" stroke="none" fill="url(#hA)" opacity=".25"/>`);
  s += `<path d="${lid}" fill="none" stroke="${INK}" stroke-width="6"/>`;
  let ls = ''; for (let k = 0; k < 11; k++) { const u = 0.12 + k * 0.076, x = (1 - u) * (1 - u) * 10 + 2 * (1 - u) * u * 200 + u * u * 390, y = (1 - u) * (1 - u) * 120 + 2 * (1 - u) * u * -30 + u * u * 120; ls += `M${f1(x)},${f1(y)} l${f1((u - .5) * 30)},-26`; }
  s += `<path d="${ls}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M60,40 Q200,-40 340,40" stroke="${INK}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
  return s;
}

/* ---------------- CAMALEÓN viewBox 0 0 300 200 (cuerpo en .cb) ---------------- */
function chamInner() {
  const body = 'M60,120 C60,70 120,50 180,60 C220,66 250,90 262,110 L290,122 L258,130 C240,150 200,160 160,156 C120,152 90,150 60,120 Z';
  let s = cut(P(body) + '<path d="M60,120 C20,120 10,170 50,172 C80,172 80,140 60,140"/>');
  s += `<path d="M66,124 C24,122 14,168 50,170 C76,170 76,144 58,144" stroke="${INK}" stroke-width="16" fill="none" stroke-linecap="round"/><path class="cbt" d="M66,124 C24,122 14,168 50,170 C76,170 76,144 58,144" stroke="${SAND}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M110,150 l-10,40 M180,150 l10,40" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>`;
  s += `<path class="cb" d="${body}" fill="${SAND}" stroke="${INK}" stroke-width="4"/>` + clipG(uid('ch'), body, `<rect x="40" y="110" width="260" height="60" fill="url(#hA)" opacity=".6"/><path d="M90,80 q20,20 40,0 q20,20 40,0 q20,20 40,0" stroke="${INK}" stroke-width="2" fill="none" opacity=".5"/>`);
  s += `<circle cx="226" cy="96" r="18" fill="#fff" stroke="${INK}" stroke-width="4"/><g class="pup"><circle cx="230" cy="96" r="7" fill="${INK}"/></g><path d="M246,122 q14,4 26,2" stroke="${INK}" stroke-width="3" fill="none"/>`;
  return s;
}

/* ---------------- LUPA viewBox 0 0 300 420 (lente centrada en 130,130 r 110) ---------------- */
function lupaFrame() {
  return `<svg viewBox="0 0 300 420" width="100%" height="100%" style="overflow:visible"><path d="${limb(200, 210, 286, 400, 18, 22)}" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><path d="${limb(200, 210, 286, 400, 18, 22)}" fill="url(#hD)" opacity=".5"/><circle cx="130" cy="130" r="112" fill="none" stroke="#fff" stroke-width="34"/><circle cx="130" cy="130" r="112" fill="none" stroke="${INK}" stroke-width="22"/><circle cx="130" cy="130" r="112" fill="none" stroke="${BRASS}" stroke-width="15"/><path d="M60,80 A84,84 0 0,1 120,48" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".8"/></svg>`;
}

/* ---------------- LUNA (superficie) ---------------- */
function moonSurface(y0) {
  const r = rng(303);
  let d = `M-40,1960 L-40,${y0 + 40}`; for (let x = -40; x <= 1120; x += 60) d += ` L${x},${f1(y0 + Math.sin(x * 0.006) * 40 + r() * 16)}`; d += ' L1120,1960 Z';
  let s = `<path d="${d}" fill="#CFCBC2" stroke="${INK}" stroke-width="5"/>` + clipG(uid('mn'), d, `<rect x="-40" y="${y0 - 60}" width="1200" height="1000" fill="url(#hP)"/><rect x="-40" y="${y0 + 160}" width="1200" height="800" fill="url(#hA)" opacity=".5"/>`);
  for (let k = 0; k < 9; k++) { const x = 40 + r() * 1000, y = y0 + 90 + r() * 260, w = 50 + r() * 90; s += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(w)}" ry="${f1(w * .28)}" fill="#b9b4aa" stroke="${INK}" stroke-width="3.5"/><path d="M${f1(x - w)},${f1(y)} A${f1(w)},${f1(w * .28)} 0 0,1 ${f1(x + w)},${f1(y)}" stroke="${INK}" stroke-width="6" fill="none" opacity=".6"/>`; }
  return s;
}
function starsSvg(seed, n = 90) { const r = rng(seed); let s = ''; for (let k = 0; k < n; k++) { const x = r() * 1080, y = r() * 1920, z = 1 + r() * 3; s += k % 9 ? `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(z)}" fill="#F4ECDB" opacity="${f1(.4 + r() * .6)}"/>` : `<path d="M${f1(x)},${f1(y - 10)} L${f1(x + 2.5)},${f1(y - 2.5)} L${f1(x + 10)},${f1(y)} L${f1(x + 2.5)},${f1(y + 2.5)} L${f1(x)},${f1(y + 10)} L${f1(x - 2.5)},${f1(y + 2.5)} L${f1(x - 10)},${f1(y)} L${f1(x - 2.5)},${f1(y - 2.5)} Z" fill="${YEL}"/>`; } return `<svg width="1080" height="1920" style="overflow:visible">${s}</svg>`; }

/* colores */
function hexMix(a, b, k) { const pa = [1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16)), pb = [1, 3, 5].map(i => parseInt(b.slice(i, i + 2), 16)); return '#' + pa.map((v, i) => Math.round(v + (pb[i] - v) * k).toString(16).padStart(2, '0')).join(''); }
