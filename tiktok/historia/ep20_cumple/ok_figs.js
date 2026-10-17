/* Ep. 7 · El origen de OK — figuras nuevas en el estilo de grabado recortado de la serie */
const METAL = '#CFC8B8', METAL2 = '#A39A88', METAL3 = '#E8E2D4', BRICK = '#D9B391', BRICK2 = '#E2C3A8';

/* ---------- TIPO DE IMPRENTA con cara (viewBox 0 0 300 470) ---------- */
function sortInner(ch, o = {}) {
  const id = uid('so');
  const front = 'M40,160 L250,160 L250,450 L40,450 Z', side = 'M250,160 L284,132 L284,422 L250,450 Z', top = 'M40,160 L74,132 L284,132 L250,160 Z';
  const fs = o.fs || 250;
  const glyph = a => `<text x="162" y="146" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="${fs}" ${a || ''}>${ch}</text>`;
  const armL = limb(46, 262, 2, 336, 12, 9), armR = limb(246, 262, 290, 336, 12, 9);
  let s = '';
  s += `<g class="armL">${cut(P(armL), 4, 6)}${D(armL, METAL2, 3.5)}${gloveHand(2, 342, 200, 0.62)}</g>`;
  s += `<g class="armR">${cut(P(armR), 4, 6)}${D(armR, METAL2, 3.5)}${gloveHand(290, 342, 160, 0.62)}</g>`;
  s += cut(P(front) + P(side) + P(top) + '<ellipse cx="100" cy="456" rx="40" ry="15"/><ellipse cx="196" cy="456" rx="40" ry="15"/>');
  s += `<ellipse cx="100" cy="456" rx="40" ry="15" fill="${INK}"/><ellipse cx="196" cy="456" rx="40" ry="15" fill="${INK}"/>`;
  s += D(side, METAL2, 4) + HF(side, 'hD') + D(top, METAL3, 4) + D(front, METAL, 4);
  s += clipG(id + 'f', front, `<rect x="196" y="150" width="70" height="310" fill="url(#hB)"/><rect x="30" y="398" width="240" height="60" fill="url(#hA)"/>`);
  s += `<path d="M40,404 H250 M40,418 H250" stroke="${INK}" stroke-width="3"/><path d="M58,178 V388" stroke="#fff" stroke-width="6" opacity=".5" stroke-linecap="round"/>`;
  // letra en relieve
  s += `<g transform="translate(7,9)" fill="${SH}">${glyph()}</g><g fill="#fff" stroke="#fff" stroke-width="18" stroke-linejoin="round">${glyph()}</g>`;
  s += glyph(`fill="${METAL3}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"`) + glyph(`fill="url(#hA)" opacity=".55"`);
  // cara
  s += `<ellipse cx="112" cy="262" rx="21" ry="25" fill="#fff" stroke="${INK}" stroke-width="3.5"/><ellipse cx="182" cy="262" rx="21" ry="25" fill="#fff" stroke="${INK}" stroke-width="3.5"/>`;
  s += `<g class="pup"><circle cx="114" cy="266" r="10" fill="${INK}"/><circle cx="180" cy="266" r="10" fill="${INK}"/><circle cx="110" cy="261" r="3.2" fill="#fff"/><circle cx="176" cy="261" r="3.2" fill="#fff"/></g>`;
  s += `<g class="lidC" style="opacity:0"><ellipse cx="112" cy="262" rx="22" ry="26" fill="${METAL}" stroke="${INK}" stroke-width="3.5"/><ellipse cx="182" cy="262" rx="22" ry="26" fill="${METAL}" stroke="${INK}" stroke-width="3.5"/><path d="M92,264 q20,12 40,0 M162,264 q20,12 40,0" stroke="${INK}" stroke-width="4.5" fill="none" stroke-linecap="round"/></g>`;
  s += `<path class="browL" d="M88,222 q24,-14 46,-2" stroke="${INK}" stroke-width="7" stroke-linecap="round" fill="none"/><path class="browR" d="M160,220 q24,-12 46,2" stroke="${INK}" stroke-width="7" stroke-linecap="round" fill="none"/>`;
  s += `<ellipse cx="80" cy="306" rx="16" ry="9" fill="${PINK}" opacity=".4"/><ellipse cx="214" cy="306" rx="16" ry="9" fill="${PINK}" opacity=".4"/>`;
  s += `<path class="smile" d="M118,314 Q147,340 176,314" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  s += `<g class="mOpen" style="opacity:0"><path d="M112,312 Q147,306 182,312 Q178,358 147,360 Q116,358 112,312 Z" fill="#160f0a" stroke="${INK}" stroke-width="4"/><ellipse cx="147" cy="347" rx="17" ry="7" fill="#7a1e2a"/><path d="M120,313 h54 v8 h-54 Z" fill="#fff"/></g>`;
  // gorro de papel de periódico
  const hat = 'M52,-10 L170,-150 L278,-10 Z';
  let hl = ''; for (let k = 0; k < 6; k++) hl += `M${110 + k * 6},${-30 - k * 16}h${80 - k * 12}`;
  s += `<g class="hat" style="opacity:0">${cut(P(hat), 5, 6)}${D(hat, '#F4ECDA', 4)}<path d="${hl}" stroke="${INK}" stroke-width="4" opacity=".45"/><path d="M52,-10 L278,-10" stroke="${INK}" stroke-width="7"/><text x="165" y="-20" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="22" fill="${INK}">NEWS</text></g>`;
  return s;
}
function mkSort(pa, b, ch, o = {}) {
  const f = mk(pa, b, sortInner(ch, o), '0 0 300 470', 'sort'); const q = s => f.d.querySelector(s);
  f.smile = q('.smile'); f.mOpen = q('.mOpen'); f.armL = q('.armL'); f.armR = q('.armR'); f.hat = q('.hat'); return f;
}
function sortFace(f, t, o = {}) {
  face(f, t, o);
  const k = clamp(o.open || 0);
  f.mOpen.style.opacity = k > 0.05 ? 1 : 0; f.smile.style.opacity = k > 0.05 ? 0 : 1;
  f.mOpen.setAttribute('transform', `translate(0,312) scale(1,${f1(Math.max(0.1, k) * 100) / 100}) translate(0,-312)`);
  f.armL.setAttribute('transform', `rotate(${f1(o.aL || 0)} 46 262)`); f.armR.setAttribute('transform', `rotate(${f1(-(o.aR || 0))} 246 262)`);
  f.hat.style.opacity = o.hat ? 1 : 0;
}
/* tipo pequeño (HTML) para el componedor */
function miniSort(pa, x, y, ch, o = {}) {
  const w = o.w || 72, h = o.h || 104;
  return el('div', pa, { left: px(x), top: px(y), width: px(w), height: px(h), background: METAL, border: `4px solid ${INK}`, borderRadius: '8px', boxShadow: `5px 6px 0 ${SH}`,
    backgroundImage: `linear-gradient(90deg, transparent 72%, rgba(43,33,24,.22) 72%), repeating-linear-gradient(0deg, transparent 0 ${h - 26}px, ${INK} ${h - 26}px ${h - 23}px, transparent ${h - 23}px ${h}px)`,
    fontFamily: 'Playfair', fontWeight: 900, fontSize: px(o.fs || 66), lineHeight: px(h - 18), textAlign: 'center', color: INK, zIndex: o.z || 10 }, ch);
}

/* ---------- PERIÓDICO de 1839 (viewBox 0 0 600 760) ---------- */
function newsInner(o = {}) {
  const r = rng(o.seed || 5), id = uid('np');
  const pg = 'M8,10 L592,4 L596,752 L4,756 Z';
  let s = cut(P(pg)) + D(pg, '#F4ECDA', 4) + `<path d="${pg}" fill="url(#hP)" opacity=".3"/>`;
  s += `<text x="300" y="84" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="${o.mfs || 50}" fill="${INK}">${o.title || 'THE DAILY NEWS'}</text>`;
  s += `<path d="M30,104 H570 M30,112 H570" stroke="${INK}" stroke-width="3"/><text x="300" y="138" text-anchor="middle" font-family="SpecialElite" font-size="22" fill="${INK}">${o.date || 'BOSTON · 1839'}</text><path d="M30,152 H570" stroke="${INK}" stroke-width="2"/>`;
  // grabado de la portada: barco en el puerto
  const gb = 'M212,166 H570 V366 H212 Z';
  s += D(gb, FIG, 3) + clipG(id + 'g', gb, `<rect x="212" y="166" width="358" height="120" fill="url(#hF)" opacity=".6"/><rect x="212" y="300" width="358" height="70" fill="url(#hB)"/>
    <path d="M300,300 L460,300 L440,330 L320,330 Z" fill="${INK}"/><path d="M380,300 V196 M420,300 V214 M340,300 V220" stroke="${INK}" stroke-width="4"/>
    <path d="M384,200 L384,280 L440,272 Z M424,218 L424,284 L470,280 Z M344,224 L344,284 L304,280 Z" fill="${FIG}" stroke="${INK}" stroke-width="2.5"/><path d="M230,250 q20,-14 40,0 M500,236 q16,-10 32,0" stroke="${INK}" stroke-width="2" fill="none"/>`);
  let ln = '';
  [[30, 196, 166], [212, 388, 382], [404, 570, 382]].forEach(([x0, x1, y0]) => {
    for (let y = y0 + 6; y < 740; y += 15) {
      if (o.okY && x0 === 30 && Math.abs(y - o.okY) < 26) continue;
      const e = x1 - (r() < 0.16 ? 20 + r() * 50 : 0); ln += `M${x0},${y}H${f1(e)}`;
    }
  });
  s += `<path d="${ln}" stroke="${INK}" stroke-width="5" opacity=".4"/><path d="M204,160 V744 M396,376 V744" stroke="${INK}" stroke-width="1.5"/>`;
  if (o.okY) s += `<rect class="okHL" x="24" y="${o.okY - 26}" width="0" height="38" rx="4" fill="${YEL}"/><text x="113" y="${o.okY + 4}" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="36" fill="${INK}">… O.K. …</text>`;
  return s;
}

/* ---------- CALLE DE BOSTON (capa 1080x1920) ---------- */
function streetSvg() {
  let s = '';
  // torre lejana
  s += `<path d="M640,560 V420 L668,330 L696,420 V560 Z" fill="${FIG}" stroke="${INK}" stroke-width="4"/><path d="M640,440 H696 M650,470 v30 M686,470 v30" stroke="${INK}" stroke-width="3"/><path d="M640,420 L668,330 L696,420 Z" fill="url(#hA)"/>`;
  [[10, 600, 270], [270, 540, 250], [510, 620, 260], [760, 560, 300]].forEach(([x, y, w], i) => {
    const h = 1200 - y, fac = `M${x},${y} H${x + w} V1200 H${x} Z`;
    s += cut(P(fac), 6, 8) + D(fac, i % 2 ? BRICK2 : BRICK, 4) + clipG(uid('st'), fac, `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#hP)"/><rect x="${x + w - 46}" y="${y}" width="46" height="${h}" fill="url(#hA)" opacity=".7"/>`);
    let bl = ''; for (let yy = y + 22; yy < 1200; yy += 22) bl += `M${x},${yy}H${x + w}`; s += `<path d="${bl}" stroke="${INK}" stroke-width="1.2" opacity=".22"/>`;
    s += `<rect x="${x - 8}" y="${y - 18}" width="${w + 16}" height="24" fill="${INK}"/><rect x="${x - 4}" y="${y + 6}" width="${w + 8}" height="8" fill="${FIG}" stroke="${INK}" stroke-width="2"/>`;
    for (let yy = y + 50; yy < 1010; yy += 130) for (let k = 0; k < 3; k++) {
      const ww = (w - 44) / 3 - 16, wx = x + 22 + k * (w - 44) / 3 + 8;
      s += `<rect x="${f1(wx)}" y="${yy}" width="${f1(ww)}" height="90" fill="#3a2a1e" stroke="${INK}" stroke-width="3"/><rect x="${f1(wx + 5)}" y="${yy + 5}" width="${f1(ww - 10)}" height="80" fill="${FIG}" stroke="${INK}" stroke-width="2"/><rect x="${f1(wx + 5)}" y="${yy + 5}" width="${f1(ww - 10)}" height="40" fill="url(#hB)" opacity=".7"/><path d="M${f1(wx + ww / 2)},${yy + 5}V${yy + 85}M${f1(wx + 5)},${yy + 45}H${f1(wx + ww - 5)}" stroke="${INK}" stroke-width="3"/><rect x="${f1(wx - 6)}" y="${yy - 10}" width="${f1(ww + 12)}" height="10" fill="${FIG}" stroke="${INK}" stroke-width="2"/>`;
    }
    const dx = x + w / 2 - 36;
    s += `<path d="M${f1(dx)},1200 V1082 Q${f1(dx + 36)},1040 ${f1(dx + 72)},1082 V1200 Z" fill="#3a2a1e" stroke="${INK}" stroke-width="3"/><path d="M${f1(dx)},1200 V1082 Q${f1(dx + 36)},1040 ${f1(dx + 72)},1082 V1200 Z" fill="url(#hW)" opacity=".3"/><rect x="${f1(dx - 12)}" y="1194" width="96" height="12" fill="${FIG}" stroke="${INK}" stroke-width="2"/>`;
  });
  let cb = ''; for (let yy = 1258, row = 0; yy < 1440; yy += 26, row++) for (let xx = (row % 2) * 22 - 20; xx < 1100; xx += 44) cb += `<ellipse cx="${xx}" cy="${yy}" rx="19" ry="10" fill="${FIG}" stroke="${INK}" stroke-width="2"/>`;
  s += `<rect x="0" y="1240" width="1080" height="220" fill="#d9c7a6"/>${cb}<rect x="-10" y="1200" width="1100" height="42" fill="#cdb48a" stroke="${INK}" stroke-width="4"/>`;
  // farola de gas
  s += `<path d="M528,1200 V740" stroke="${INK}" stroke-width="14"/><path d="M528,1200 V740" stroke="${FIG}" stroke-width="5"/><rect x="510" y="1170" width="36" height="30" fill="${INK}"/><path d="M498,740 H558 L548,660 H508 Z" fill="${YEL}" stroke="${INK}" stroke-width="4" opacity=".95"/><path d="M528,660 V740 M503,700 H553" stroke="${INK}" stroke-width="2.5"/><path d="M500,660 L528,636 L556,660 Z" fill="${INK}"/>`;
  return `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0">${s}</svg>`;
}

/* ---------- sombreros / extras para bustos (viewBox 360x460) ---------- */
const capOver = () => {
  const crown = 'M106,182 C98,128 140,102 186,102 C238,104 264,132 256,182 Z', brim = 'M100,176 Q60,182 66,200 Q130,198 196,184 Z';
  return cut(P(crown) + P(brim), 4, 5) + D(crown, '#8b7a62') + HF(crown, 'hB') + `<path d="M150,108 Q156,140 140,180 M200,104 Q210,150 196,182" stroke="${INK}" stroke-width="2" fill="none"/><circle cx="182" cy="106" r="7" fill="${INK}"/>` + D(brim, '#5a4a3a') + HF(brim, 'hD');
};
const visorOver = () => {
  const band = 'M112,170 Q180,150 248,170 L250,186 Q180,166 110,186 Z', visor = 'M104,182 Q180,160 256,182 L272,212 Q180,186 88,212 Z';
  return cut(P(visor), 3, 4) + D(band, INK) + D(visor, '#6f8a6a') + HF(visor, 'hA') + `<path d="M232,240 L292,196" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M232,240 L292,196" stroke="${YEL}" stroke-width="5" stroke-linecap="round"/><path d="M288,199 l8,-6" stroke="${INK}" stroke-width="5"/>`;
};
const coatOver = (col = '#3a2a1e') => {
  const coat = 'M28,460 C32,384 80,338 140,328 L220,328 C280,338 328,384 332,460 Z';
  return `<path d="${coat}" fill="${col}" stroke="${INK}" stroke-width="3"/><path d="${coat}" fill="url(#hW)" opacity=".18"/><path d="M146,330 L180,430 L214,330 Z" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M146,330 L118,460 M214,330 L242,460" stroke="${FIG}" stroke-width="2.5" opacity=".55"/><path d="M146,330 L112,392 L136,400 L160,340 M214,330 L248,392 L224,400 L200,340" fill="${col}" stroke="${INK}" stroke-width="3"/>`;
};
const specsOver = () => `<circle cx="156" cy="204" r="22" fill="rgba(255,255,255,.3)" stroke="${INK}" stroke-width="5"/><circle cx="204" cy="204" r="22" fill="rgba(255,255,255,.3)" stroke="${INK}" stroke-width="5"/><path d="M178,202 q2,-6 4,0 M134,200 L118,196 M226,200 L242,196" stroke="${INK}" stroke-width="4" fill="none"/>`;
function journalistInner(seed, v = 0) {
  return bustInner({ uniform: 'soldier', moustache: v === 0, beard: v === 2, seed }) + coatOver(['#4a3a2c', '#3a2f26', '#5a4632'][v]) + `<path d="M162,338 l18,12 l18,-12 l0,16 l-18,-6 l-18,6 Z" fill="${INK}"/>` + visorOver();
}
/* MARTIN VAN BUREN — grabado de político con patillas */
function vbInner() {
  let s = bustInner({ uniform: 'soldier', seed: 31 });
  s += coatOver('#2f241c');
  s += `<path d="M146,326 Q180,346 214,326 L222,352 Q180,372 138,352 Z" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M180,352 L146,334 L150,376 Z M180,352 L214,334 L210,376 Z" fill="${INK}"/><circle cx="180" cy="354" r="9" fill="${INK}"/>`;
  // patillas pobladas
  const pl = 'M114,188 C96,232 102,292 150,318 C156,296 146,262 148,226 C140,212 128,198 114,188 Z';
  const ps = `<path d="${pl}" fill="#e9e1cf" stroke="${INK}" stroke-width="3"/><path d="${pl}" fill="url(#hA)" opacity=".7"/><path d="M118,210 q10,6 6,16 M112,240 q12,4 8,16 M122,270 q12,4 10,16 M136,292 q10,2 10,14 M132,226 q8,6 6,14 M138,256 q8,4 6,14" stroke="${INK}" stroke-width="2.2" fill="none"/>`;
  s += ps + `<g transform="translate(360,0) scale(-1,1)">${ps}</g>`;
  // pelo rizado a los lados, frente despejada
  let cur = ''; [[118, 168], [128, 150], [112, 186], [242, 168], [232, 150], [248, 186]].forEach(([x, y]) => cur += `<circle cx="${x}" cy="${y}" r="15" fill="#e9e1cf" stroke="${INK}" stroke-width="3"/><path d="M${x - 7},${y} q7,-9 14,0" stroke="${INK}" stroke-width="2" fill="none"/>`);
  s += cur + `<path d="M150,150 q30,-12 60,0" stroke="${INK}" stroke-width="2" fill="none" opacity=".6"/>`;
  return s;
}
function lingInner() {
  return bustInner({ uniform: 'soldier', beard: true, seed: 51 }) + coatOver('#4a3a2c') + `<path d="M160,336 l20,24 l20,-24" stroke="${INK}" stroke-width="5" fill="none"/>` + specsOver();
}
function newsboyInner() { return bustInner({ uniform: 'farmer', seed: 9 }) + capOver(); }
function fanInner(seed, hat, col) {
  let s = bustInner({ uniform: 'soldier', hat: hat === 'cap' ? undefined : hat, moustache: seed % 2 === 0, beard: seed % 3 === 0, seed });
  s += coatOver(col); if (hat === 'cap') s += capOver();
  return s;
}

/* ---------- objetos ---------- */
function basketInner() { // viewBox 0 0 260 300
  const b = 'M18,46 L242,46 L212,296 L48,296 Z';
  let s = cut(P(b) + '<ellipse cx="130" cy="46" rx="114" ry="22"/>');
  s += `<ellipse cx="130" cy="46" rx="112" ry="20" fill="#3a2a1e" stroke="${INK}" stroke-width="4"/>`;
  s += `<g class="bkIn"></g>`;
  s += D(b, '#C9A46A', 4) + clipG(uid('bk'), b, `<rect x="0" y="40" width="260" height="260" fill="url(#hA)" opacity=".8"/><rect x="0" y="40" width="260" height="260" fill="url(#hB)" opacity=".8"/>`);
  s += `<path d="M24,96 H236 M30,150 H230 M36,204 H224 M42,258 H218" stroke="${INK}" stroke-width="5"/><ellipse cx="130" cy="50" rx="114" ry="18" fill="none" stroke="${INK}" stroke-width="8"/><ellipse cx="130" cy="50" rx="114" ry="18" fill="none" stroke="#C9A46A" stroke-width="3"/>`;
  return s;
}
function ballInner() { // viewBox 0 0 200 200
  const r = rng(77); const pts = []; for (let i = 0; i < 22; i++) { const a = i / 22 * Math.PI * 2, rr = 78 + (i % 2 ? -16 : 6) + r() * 10; pts.push([100 + Math.cos(a) * rr, 100 + Math.sin(a) * rr]); }
  const d = 'M' + pts.map(q => f1(q[0]) + ',' + f1(q[1])).join('L') + 'Z';
  let cr = ''; for (let i = 0; i < 14; i++) { const a = r() * 6.28, l = 20 + r() * 50; cr += `M${f1(100 + Math.cos(a) * 10)},${f1(100 + Math.sin(a) * 10)}l${f1(Math.cos(a + 0.4) * l)},${f1(Math.sin(a + 0.4) * l)}`; }
  return cut(P(d), 5, 7) + D(d, '#F4ECDA', 4) + `<path d="${d}" fill="url(#hP)" opacity=".5"/><path d="${cr}" stroke="${INK}" stroke-width="2.5" fill="none"/><path d="M50,80 h40 M60,120 h50 M110,70 h30" stroke="${INK}" stroke-width="5" opacity=".35"/><text x="104" y="114" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="34" fill="${INK}" transform="rotate(-14 104 104)">O.K.</text>`;
}
function phoneOldInner() { // teléfono de candelabro, viewBox 0 0 200 360
  const base = 'M30,330 Q100,290 170,330 L170,350 L30,350 Z', stem = limb(100, 320, 100, 120, 13, 10), mouth = 'M66,92 Q100,60 134,92 L122,124 L78,124 Z';
  const ear = 'M150,150 Q186,150 188,190 L172,236 Q160,250 150,236 Z';
  let s = cut(P(base) + P(stem) + P(mouth) + P(ear));
  s += D(base, INK) + `<path d="M40,334 Q100,304 160,334" stroke="${BRASS}" stroke-width="3" fill="none"/>` + D(stem, BRASS) + HF(stem, 'hD') + D(mouth, INK) + `<ellipse cx="100" cy="88" rx="30" ry="9" fill="#3a2a1e" stroke="${BRASS}" stroke-width="3"/>`;
  s += `<path d="M112,170 L150,170" stroke="${INK}" stroke-width="8"/><path d="M100,330 Q20,300 40,240 Q60,200 150,232" stroke="${INK}" stroke-width="4" fill="none"/>` + D(ear, INK) + `<path d="M154,160 Q178,164 180,190" stroke="${BRASS}" stroke-width="3" fill="none"/>`;
  return s;
}
function buntingSvg(w, y0, n) {
  let s = ''; const sw = w / n;
  for (let i = 0; i < n; i++) {
    const x = i * sw, d = `M${f1(x)},${y0} Q${f1(x + sw / 2)},${y0 + 70} ${f1(x + sw)},${y0} L${f1(x + sw)},${y0 + 8} Q${f1(x + sw / 2)},${y0 + 96} ${f1(x)},${y0 + 8} Z`;
    s += `<path d="${d}" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M${f1(x)},${y0 + 4} Q${f1(x + sw / 2)},${y0 + 52} ${f1(x + sw)},${y0 + 4} L${f1(x + sw)},${y0 + 22} Q${f1(x + sw / 2)},${y0 + 70} ${f1(x)},${y0 + 22} Z" fill="${RED}" stroke="${INK}" stroke-width="2"/><path d="M${f1(x)},${y0 + 30} Q${f1(x + sw / 2)},${y0 + 80} ${f1(x + sw)},${y0 + 30} L${f1(x + sw)},${y0 + 44} Q${f1(x + sw / 2)},${y0 + 92} ${f1(x)},${y0 + 44} Z" fill="${RED}" stroke="${INK}" stroke-width="2"/>`;
    s += `<circle cx="${f1(x)}" cy="${y0}" r="12" fill="${INK}"/><text x="${f1(x)}" y="${y0 + 8}" text-anchor="middle" font-size="18" fill="#fff">★</text>`;
  }
  return `<path d="M0,${y0} H${w}" stroke="${INK}" stroke-width="4"/>` + s;
}
function villageSvg() {
  let s = `<path d="M-20,1060 Q240,960 540,1010 T1100,990 L1100,1240 L-20,1240 Z" fill="#E3D2AE" stroke="${INK}" stroke-width="5"/><path d="M-20,1060 Q240,960 540,1010 T1100,990 L1100,1240 L-20,1240 Z" fill="url(#hP)"/>`;
  [[80, 900, 150, 'r'], [250, 930, 120, 'c'], [700, 900, 160, 'r'], [870, 940, 70, 't']].forEach(([x, y, w, k]) => {
    const h = 1000 - y + 40, wall = `M${x},${y} H${x + w} V${y + h} H${x} Z`, roof = `M${x - 14},${y} L${x + w / 2},${y - w * 0.55} L${x + w + 14},${y} Z`;
    s += cut(P(wall) + P(roof), 5, 6) + D(wall, FIG, 4) + `<path d="${wall}" fill="url(#hB)" opacity=".4"/>` + D(roof, '#8b5a3a', 4) + HF(roof, 'hA');
    s += `<rect x="${x + w * 0.2}" y="${y + 20}" width="${w * 0.22}" height="${w * 0.22}" fill="#3a2a1e" stroke="${INK}" stroke-width="2.5"/><rect x="${x + w * 0.58}" y="${y + 20}" width="${w * 0.22}" height="${w * 0.22}" fill="#3a2a1e" stroke="${INK}" stroke-width="2.5"/>`;
    if (k === 'c') s += `<path d="M${x + w / 2},${y - w * 0.55} V${y - w * 0.95} M${x + w / 2 - 14},${y - w * 0.8} H${x + w / 2 + 14}" stroke="${INK}" stroke-width="5"/>`;
  });
  // árboles
  [[440, 980], [600, 960], [990, 960]].forEach(([x, y]) => { s += `<path d="M${x},${y + 60} V${y}" stroke="${INK}" stroke-width="8"/>` + cut(`<circle cx="${x}" cy="${y - 30}" r="48"/>`, 5, 6) + `<circle cx="${x}" cy="${y - 30}" r="48" fill="#a9b07a" stroke="${INK}" stroke-width="4"/><circle cx="${x + 10}" cy="${y - 20}" r="40" fill="url(#hA)"/>`; });
  return `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0">${s}</svg>`;
}
/* mapa de EE. UU. (contorno aproximado, 48 estados) */
const USA = [[-124.7, 48.4], [-123, 49], [-95.2, 49], [-94.8, 49.4], [-89.6, 48], [-84.8, 46.5], [-82.5, 45.3], [-82.4, 43], [-79, 43.3], [-76.5, 44.2], [-75, 45], [-71.5, 45], [-70, 46.7], [-68, 47.4], [-67, 45], [-70.2, 43.6], [-70.6, 42.7], [-70, 41.8], [-71.5, 41.4], [-73.9, 40.6], [-74, 39.7], [-75.5, 38.5], [-76.3, 37.2], [-75.7, 35.5], [-77, 34.6], [-79, 33.5], [-81, 31.8], [-81.4, 30.4], [-80.1, 26.8], [-80.4, 25.2], [-81.2, 25.4], [-82.6, 27.8], [-82.8, 29.2], [-84.3, 30], [-86.5, 30.4], [-88.5, 30.4], [-89.6, 30.2], [-89.4, 29.2], [-90.4, 29.1], [-92.3, 29.6], [-94, 29.7], [-95, 29.2], [-97.2, 27.7], [-97.4, 26], [-99.1, 26.5], [-100.4, 28.3], [-101.4, 29.8], [-103, 29], [-104.5, 29.6], [-106.5, 31.8], [-108.2, 31.8], [-108.2, 31.3], [-111, 31.3], [-114.8, 32.5], [-117.1, 32.5], [-118.5, 34], [-120.6, 34.6], [-121.9, 36.6], [-122.5, 37.8], [-123.7, 39], [-124.2, 40.4], [-124.2, 42], [-124, 46.2]];
const usPj = (lo, la) => [f1((lo + 125) * 15.6), f1((50 - la) * 19)];
function usPath() { return 'M' + USA.map(q => usPj(q[0], q[1]).join(',')).join('L') + 'Z'; }
