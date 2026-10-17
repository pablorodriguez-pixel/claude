/* Ep. 12 · «SOS no significa nada» — figuras nuevas en el estilo de grabado recortado de la serie */
const SEA = '#AFC0B6', SEA2 = '#C9D3C6', BUFF = '#D9A441', HULL = '#2B2118', BAIZE = '#6F8A62';

/* ---------- anclas de tiempo por TEXTO (se recalculan solas si cambia la locución) ---------- */
const A = {}; let _cur = 0;
function K(name, ph) { const i = find(ph, _cur); A[name] = i; _cur = i + 1; }
const S = n => W[A[n]].s, SE = n => W[A[n]].e;
[
  ['lo', 'lo siento'], ['sos0', 'sos'], ['save0', 'save'], ['our0', 'our'], ['souls0', 'souls'], ['no1', 'no significa'], ['nada0', 'nada'],
  ['titanic1', 'titanic'], ['hundia', 'hundia'], ['empezo1', 'empezo'], ['ayuda', 'ayuda'], ['otra', 'otra senal'],
  ['soy', 'soy tu vecino'], ['esto2', 'esto'], ['no2', 'no'], ['venia2', 'venia'], ['en2', 'en'], ['el2', 'el'], ['libro2', 'libro'],
  ['siglo', 'siglo'], ['barcos', 'barcos'], ['hablaban', 'hablaban'], ['telegrafo', 'telegrafo'], ['puntos3', 'puntos'], ['rayas3', 'rayas'],
  ['cada', 'cada uno'], ['socorro3', 'socorro'], ['manera', 'manera'], ['compania', 'compania'], ['marconi', 'marconi'], ['ejemplo', 'ejemplo'], ['usaba', 'usaba'], ['cqd3', 'cqd'],
  ['mil4', 'mil'], ['seis', 'seis'], ['berlin', 'berlin'], ['acordo', 'acordo'], ['senal4', 'senal'], ['todos', 'todos'], ['sos4', 'sos'],
  ['porque5', 'por que'], ['letras', 'letras'], ['como', 'como suenan'], ['suenan', 'suenan'],
  ['tresA', 'tres'], ['pA', 'puntos'], ['tresB', 'tres'], ['rB', 'rayas'], ['tresC', 'tres'], ['pC', 'puntos'],
  ['imposible', 'imposible'], ['confundir', 'confundir'], ['aunque', 'aunque'], ['muerto', 'muerto'], ['miedo', 'miedo'],
  ['lode', 'lo de'], ['save6', 'save'], ['souls6', 'souls'], ['salvad', 'salvad'], ['almas', 'almas'], ['selo', 'se lo'], ['invento', 'invento'], ['gente', 'gente'], ['despues', 'despues'],
  ['para6', 'para que'], ['sentido', 'sentido'],
  ['mil7', 'mil'], ['doce', 'doce'], ['titanic7', 'titanic'], ['radio', 'radiotelegrafista'], ['empezo7', 'empezo'], ['cqd7', 'cqd'], ['luego', 'luego'], ['consejo', 'consejo'], ['companero', 'companero'], ['tambien', 'tambien'], ['sos7', 'sos'],
  ['ojo', 'ojo'], ['primer', 'primer'], ['sos8', 'sos'], ['historia', 'historia'], ['pero8', 'pero'], ['titanic8', 'titanic'], ['famoso8', 'famoso'], ['todo', 'todo el mundo'], ['mundo', 'mundo'],
  ['osea', 'o sea'], ['llamada', 'llamada'], ['auxilio', 'auxilio'], ['famosa9', 'famosa'], ['planeta', 'planeta'], ['eligieron', 'eligieron'], ['porque9', 'porque'], ['sonaba', 'sonaba'], ['bien', 'bien'],
  ['te', 'te lo'], ['creido', 'creido'], ['dime', 'dime'], ['si', 'si'], ['oNo', 'o no'],
  ['y11', 'y esto'], ['esto11', 'esto'], ['no11', 'no venia'], ['libro11', 'libro'],
].forEach(q => K(q[0], q[1]));
A.no10 = A.oNo + 1;
const T_END = SE('libro11') + 0.22; // tarjeta final

/* ---------- TITANIC de perfil (viewBox 0 0 900 380) ---------- */
function titanicInner(o = {}) {
  const id = uid('ti');
  const hull = 'M30,196 L880,178 L846,312 L112,312 Q60,306 30,250 Z';
  const sup1 = 'M150,150 L770,150 L772,190 L150,194 Z', sup2 = 'M210,122 L700,122 L700,150 L210,150 Z';
  let sil = P(hull) + P(sup1) + P(sup2), fun = '';
  [250, 375, 500, 625].forEach((x, i) => {
    const f = `M${x},124 L${x + 18},10 L${x + 70},10 L${x + 54},124 Z`; sil += P(f);
    fun += D(f, BUFF, 4) + clipG(id + 'f' + i, f, `<rect x="${x}" y="10" width="80" height="34" fill="${INK}"/><rect x="${x + 40}" y="40" width="40" height="90" fill="url(#hA)"/>`);
  });
  let s = cut(sil + `<path d="M120,150 L134,-40 L142,-40 L136,150 Z M790,150 L806,-30 L814,-30 L800,150 Z"/>`);
  s += `<path d="M138,-36 L810,-26" stroke="${INK}" stroke-width="2.5"/><path d="M120,150 L134,-40 L142,-40 L136,150 Z M790,150 L806,-30 L814,-30 L800,150 Z" fill="${INK}"/>`;
  if (o.waves) s += `<g class="waves">${[1, 2, 3].map(k => `<path class="wv${k}" d="M${474 - k * 34},${-36 - k * 26} Q474,${-62 - k * 40} ${474 + k * 34},${-36 - k * 26}" stroke="${PINK}" stroke-width="9" fill="none" stroke-linecap="round"/>`).join('')}</g>`;
  s += fun + D(sup2, '#FBF6EA', 4) + D(sup1, '#FBF6EA', 4) + clipG(id + 's', sup1, `<rect x="150" y="174" width="630" height="20" fill="url(#hF)" opacity=".7"/>`);
  let win = ''; for (let x = 170; x < 760; x += 22) win += `<rect x="${x}" y="160" width="10" height="12" fill="${INK}"/>`; for (let x = 226; x < 690; x += 26) win += `<rect x="${x}" y="130" width="10" height="11" fill="${INK}"/>`;
  s += win + D(hull, HULL, 4) + clipG(id + 'h', hull, `<rect x="0" y="282" width="900" height="40" fill="${RED}"/><rect x="0" y="282" width="900" height="40" fill="url(#hA)"/><path d="M40,206 L874,188" stroke="#FBF6EA" stroke-width="5"/>`);
  let ph = ''; for (let x = 140; x < 830; x += 26) ph += `<circle cx="${x}" cy="${f1(232 - (x - 140) * 0.02)}" r="4.5" fill="#FBF6EA"/>`; for (let x = 160; x < 800; x += 34) ph += `<circle cx="${x}" cy="${f1(256 - (x - 160) * 0.02)}" r="3.5" fill="#FBF6EA" opacity=".8"/>`;
  s += ph;
  return s;
}

/* ---------- MAR DE GRABADO (capa ancha) ---------- */
function seaSvg(w, y0, h, seed = 3, col = SEA) {
  const r = rng(seed); let ln = '';
  for (let y = y0 + 18; y < y0 + h; y += 22) { let d = `M-40,${y}`; for (let x = -40; x < w + 40; x += 60) d += ` q15,${f1(-8 - r() * 6)} 30,0 t30,0`; ln += `<path d="${d}" stroke="${INK}" stroke-width="${f1(1.6 + (y - y0) / h * 2)}" fill="none" opacity=".75"/>`; }
  let top = `M-40,${y0}`; for (let x = -40; x < w + 40; x += 80) top += ` q20,-22 40,0 t40,0`;
  return `<path d="${top} V${y0 + h} H-40 Z" fill="${col}" stroke="${INK}" stroke-width="5"/>${ln}`;
}

/* ---------- SALVAVIDAS (viewBox 0 0 300 300) ---------- */
function buoyInner(txt = '', o = {}) {
  const id = uid('bu'), R = 112;
  let s = cut(`<circle cx="150" cy="150" r="${R + 34}"/>`, 7, 9);
  s += `<circle cx="150" cy="150" r="${R}" fill="none" stroke="${INK}" stroke-width="76"/><circle cx="150" cy="150" r="${R}" fill="none" stroke="#FBF6EA" stroke-width="64"/>`;
  const C = 2 * Math.PI * R;
  s += `<circle cx="150" cy="150" r="${R}" fill="none" stroke="${RED}" stroke-width="64" stroke-dasharray="${f1(C / 8)} ${f1(C / 8)}" transform="rotate(-22 150 150)"/>`;
  s += `<circle cx="150" cy="150" r="${R}" fill="none" stroke="url(#hA)" stroke-width="64" opacity=".45"/>`;
  s += `<circle cx="150" cy="150" r="${R + 32}" fill="none" stroke="${INK}" stroke-width="4"/><circle cx="150" cy="150" r="${R - 32}" fill="${o.hole || 'none'}" stroke="${INK}" stroke-width="4"/>`;
  // cuerda
  s += `<circle cx="150" cy="150" r="${R + 36}" fill="none" stroke="${WOOD}" stroke-width="7" stroke-dasharray="40 20"/><circle cx="150" cy="150" r="${R + 36}" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="40 20"/>`;
  if (txt) s += `<path id="${id}" d="M150,${150 + R - 4} A${R - 4},${R - 4} 0 1,1 150.1,${150 + R - 4}" fill="none"/><text font-family="Rye" font-size="34" fill="${INK}" letter-spacing="2"><textPath href="#${id}" startOffset="${o.off || '38%'}" text-anchor="middle">${txt}</textPath></text>`;
  return s;
}

/* ---------- MANIPULADOR DE TELÉGRAFO (viewBox 0 0 640 320) ---------- */
function keyInner() {
  const base = 'M20,236 L620,236 L600,300 L40,300 Z';
  let s = cut(P(base));
  s += D(base, WOOD, 5) + HF(base, 'hW') + `<path d="M40,300 L600,300" stroke="${INK}" stroke-width="5"/>`;
  s += `<rect x="440" y="176" width="50" height="62" rx="6" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><rect x="440" y="176" width="50" height="62" fill="url(#hD)" opacity=".5"/>`;
  s += `<rect x="150" y="214" width="40" height="24" rx="4" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><circle cx="560" cy="226" r="12" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><circle cx="90" cy="226" r="12" fill="${BRASS}" stroke="${INK}" stroke-width="4"/>`;
  s += `<path d="M560,226 C600,200 640,240 700,214 M90,226 C40,190 0,260 -60,230" stroke="${INK}" stroke-width="6" fill="none"/>`;
  s += `<g class="lever">${D('M150,174 L520,174 L520,192 L150,196 Z', BRASS, 4)}<path d="M150,180 L520,180" stroke="#fff" stroke-width="3" opacity=".6"/>
    <circle cx="465" cy="186" r="16" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><circle cx="465" cy="186" r="5" fill="${INK}"/>
    <rect x="160" y="190" width="18" height="24" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>
    <ellipse cx="170" cy="150" rx="66" ry="30" fill="${INK}"/><ellipse cx="170" cy="140" rx="66" ry="28" fill="#3a2a1e" stroke="${INK}" stroke-width="4"/><ellipse cx="150" cy="132" rx="26" ry="9" fill="#fff" opacity=".25"/><rect x="160" y="160" width="20" height="18" fill="${INK}"/></g>`;
  return s;
}
const KEY_PIV = [465, 186];

/* ---------- CINTA DE PAPEL con puntos y rayas (HTML) ---------- */
// code: '··· −−− ···' -> devuelve {wrap, syms:[{e,i}]}
function tape(parent, x, y, code, o = {}) {
  const u = o.u || 40, h = o.h || u * 2.2;
  const items = []; let cx = u * 0.9;
  for (const ch of code) {
    if (ch === ' ') { cx += u * 1.3; continue; }
    const dash = ch === '−' || ch === '-';
    items.push({ x: cx, w: dash ? u * 2.6 : u, dash }); cx += (dash ? u * 2.6 : u) + u * 0.7;
  }
  const w = o.w || cx + u * 0.4;
  const wrap = box(parent, x, y, w, h, { zIndex: o.z || 20 });
  box(wrap, 6, 8, w, h, { background: SH });
  const strip = box(wrap, 0, 0, w, h, { background: o.bg || '#FBF6EA', border: `4px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 38px, rgba(43,33,24,.08) 38px 40px)' });
  const syms = items.map((it, i) => box(strip, it.x - 4, h / 2 - u / 2 - 4, it.w, u, { background: o.col || INK, borderRadius: px(u / 2), zIndex: 2 }));
  return { wrap, strip, syms, w, h };
}

/* ---------- sombreros / extras para bustos (viewBox 360x460) ---------- */
const bowlerOver = (col = '#2f2620') => {
  const crown = 'M120,150 C112,92 146,74 180,74 C216,74 250,92 240,150 Z', brim = 'M78,154 Q180,126 282,154 Q290,174 266,172 Q180,150 94,172 Q70,174 78,154 Z';
  return cut(P(crown) + P(brim), 4, 5) + D(crown, col) + HF(crown, 'hA') + `<path d="M122,138 Q180,124 238,138 L238,150 Q180,138 122,150 Z" fill="${INK}"/><path d="M150,88 Q140,110 142,136" stroke="#fff" stroke-width="4" opacity=".35" fill="none"/>` + D(brim, col) + HF(brim, 'hD');
};
const phonesOver = () => `<path d="M108,214 C96,82 264,82 252,214" stroke="${INK}" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M108,214 C96,82 264,82 252,214" stroke="${BRASS}" stroke-width="7" fill="none" stroke-linecap="round"/>
  <ellipse cx="108" cy="218" rx="22" ry="32" fill="${INK}"/><ellipse cx="104" cy="216" rx="14" ry="22" fill="#5a4632"/><ellipse cx="252" cy="218" rx="22" ry="32" fill="${INK}"/><ellipse cx="256" cy="216" rx="14" ry="22" fill="#5a4632"/>`;
const sashOver = () => `<path d="M100,350 L300,460" stroke="${INK}" stroke-width="26"/><path d="M100,350 L300,460" stroke="${RED}" stroke-width="18"/>`;
function delegateInner(seed, v = 0) {
  const cols = ['#2f241c', '#3a2f26', '#4a3a2c', '#2a2a30', '#3b2a22'];
  let s = bustInner({ uniform: 'soldier', moustache: v % 2 === 0, beard: v === 3, seed }) + coatOver(cols[v % 5]);
  s += `<path d="M162,338 l18,12 l18,-12 l0,16 l-18,-6 l-18,6 Z" fill="${INK}"/>`;
  if (v === 1) s += specsOver(); if (v === 2) s += sashOver();
  s += bowlerOver(v === 4 ? '#5a4632' : '#2f2620');
  return s;
}
function operatorInner(seed, o = {}) {
  let s = bustInner({ uniform: 'soldier', moustache: !!o.moustache, seed }) + coatOver(o.col || '#2f2a36');
  s += `<path d="M146,330 L180,370 L214,330" stroke="${INK}" stroke-width="3" fill="#fff"/><path d="M164,336 l16,10 l16,-10 l0,14 l-16,-5 l-16,5 Z" fill="${INK}"/>`;
  if (o.cap) s += capOver(); else s += phonesOver();
  return s;
}

/* ---------- MAZO (viewBox 0 0 320 200) — pivote en el mango (60,170) ---------- */
function gavelInner() {
  const handle = limb(40, 176, 210, 70, 9, 11), head = 'M170,24 L262,-30 L300,36 L208,90 Z';
  let s = cut(P(handle) + P(head));
  s += D(handle, WOOD) + HF(handle, 'hW') + D(head, '#8b5a3a', 4) + HF(head, 'hA');
  s += `<path d="M186,50 L278,-4 M196,66 L288,12" stroke="${BRASS}" stroke-width="6"/>`;
  return s;
}

/* ---------- SELLO DE COMPAÑÍA (viewBox 0 0 400 400) ---------- */
function sealInner(top, mid, bot, col = RED) {
  const id = uid('se');
  let s = `<circle cx="200" cy="200" r="186" fill="rgba(255,255,255,.92)" stroke="${col}" stroke-width="14"/><circle cx="200" cy="200" r="150" fill="none" stroke="${col}" stroke-width="5"/><circle cx="200" cy="200" r="104" fill="none" stroke="${col}" stroke-width="3" stroke-dasharray="6 6"/>`;
  s += `<path id="${id}" d="M60,200 A140,140 0 0,1 340,200" fill="none"/><text font-family="Rye" font-size="38" fill="${col}" letter-spacing="3"><textPath href="#${id}" startOffset="50%" text-anchor="middle">${top}</textPath></text>`;
  s += `<path id="${id}b" d="M52,200 A148,148 0 0,0 348,200" fill="none"/><text font-family="Rye" font-size="32" fill="${col}" letter-spacing="3"><textPath href="#${id}b" startOffset="50%" text-anchor="middle">${bot}</textPath></text>`;
  s += `<text x="200" y="232" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="${mid.length > 4 ? 64 : 110}" fill="${col}">${mid}</text><text x="70" y="214" font-size="30" fill="${col}">★</text><text x="306" y="214" font-size="30" fill="${col}">★</text>`;
  return s;
}

/* ---------- MESA DE CONFERENCIA (capa) ---------- */
function tableSvg(y) {
  const top = `M40,${y} L1040,${y} L1000,${y + 70} L80,${y + 70} Z`, front = `M80,${y + 70} L1000,${y + 70} L1000,${y + 250} L80,${y + 250} Z`;
  let s = cut(P(top) + P(front));
  s += D(top, BAIZE, 5) + HF(top, 'hA') + D(front, WOOD, 5) + HF(front, 'hW');
  s += `<path d="M80,${y + 100} H1000 M80,${y + 236} H1000" stroke="${INK}" stroke-width="4"/>`;
  for (let x = 160; x < 1000; x += 210) s += `<rect x="${x}" y="${y + 120}" width="150" height="90" rx="8" fill="none" stroke="${INK}" stroke-width="3"/><circle cx="${x + 75}" cy="${y + 165}" r="8" fill="${BRASS}" stroke="${INK}" stroke-width="2"/>`;
  [[150, -4], [400, 3], [640, -2], [840, 4]].forEach(([x, r]) => s += `<rect x="${x}" y="${y + 14}" width="110" height="44" fill="#FBF6EA" stroke="${INK}" stroke-width="3" transform="rotate(${r} ${x + 55} ${y + 36})"/><path d="M${x + 12},${y + 28} h80 M${x + 12},${y + 40} h60" stroke="${INK}" stroke-width="3" opacity=".5" transform="rotate(${r} ${x + 55} ${y + 36})"/>`);
  return `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0">${s}</svg>`;
}

/* ---------- BANDERÍN / CARTELITO (HTML) ---------- */
function flagCard(parent, x, y, w, h, html, o = {}) {
  const d = box(parent, x, y, w, h, { zIndex: o.z || 10, transformOrigin: '50% 0%' });
  const card = box(d, 0, 0, w, h, { background: o.bg || '#FBF6EA', border: `5px solid ${INK}`, borderRadius: '10px', boxShadow: `7px 8px 0 ${SH}`, backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 22px, rgba(43,33,24,.06) 22px 24px)' });
  el('div', card, { left: 0, top: px(o.ty || 18), width: px(w - 10), textAlign: 'center', fontFamily: o.font || 'Rye', fontSize: px(o.size || 40), lineHeight: 1.05, color: o.color || INK, whiteSpace: 'nowrap' }, html);
  box(d, w / 2 - 16, -22, 32, 46, { background: WOOD, border: `4px solid ${INK}`, borderRadius: '6px', zIndex: 3 });
  return d;
}

/* ---------- GLOBO TERRÁQUEO (viewBox 0 0 400 400) ---------- */
function globeInner(phase = 0) {
  const id = uid('gl');
  let s = cut('<circle cx="200" cy="200" r="180"/>') + `<circle cx="200" cy="200" r="180" fill="${SEA2}" stroke="${INK}" stroke-width="6"/>`;
  let cont = '';
  [[-0.4, 120, 60, 50], [0.5, 150, 80, 70], [1.4, 240, 70, 46], [2.3, 160, 50, 80], [3.2, 260, 60, 40], [4.2, 130, 70, 60], [5.2, 230, 50, 50]].forEach(([a, cy, rx, ry]) => { const x = 200 + Math.sin(a + phase) * 150; if (Math.cos(a + phase) > -0.1) cont += `<ellipse cx="${f1(x)}" cy="${cy}" rx="${f1(rx * Math.max(0.2, Math.cos(a + phase)))}" ry="${ry}" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`; });
  s += clipG(id, 'M20,200 A180,180 0 1,0 380,200 A180,180 0 1,0 20,200 Z', cont + `<rect x="0" y="0" width="400" height="400" fill="url(#hP)"/><ellipse cx="250" cy="230" rx="170" ry="190" fill="url(#hA)" opacity=".5"/>`);
  s += `<ellipse cx="200" cy="200" rx="180" ry="56" fill="none" stroke="${INK}" stroke-width="2.5"/><ellipse cx="200" cy="200" rx="70" ry="180" fill="none" stroke="${INK}" stroke-width="2.5"/><path d="M20,200 H380 M200,20 V380" stroke="${INK}" stroke-width="2.5"/>`;
  return s;
}

/* ---------- BOTE SALVAVIDAS (viewBox 0 0 360 160) ---------- */
function boatInner() {
  const hull = 'M10,40 L350,40 Q330,140 250,150 L110,150 Q30,140 10,40 Z';
  let s = cut(P(hull)) + D(hull, '#FBF6EA', 5) + clipG(uid('bt'), hull, `<rect x="0" y="40" width="360" height="30" fill="${RED}"/><rect x="0" y="100" width="360" height="60" fill="url(#hA)"/>`);
  s += `<path d="M10,40 L350,40" stroke="${INK}" stroke-width="8"/><path d="M40,70 H330 M60,100 H300" stroke="${INK}" stroke-width="3"/><text x="180" y="132" text-anchor="middle" font-family="Rye" font-size="26" fill="${INK}">BOTE Nº 1</text>`;
  return s;
}

/* ---------- ¡PSST! codo ---------- */
const DROP = `<svg viewBox="0 0 40 60" width="100%" height="100%" style="overflow:visible"><path d="M20,2 C28,20 38,32 38,42 A18,18 0 0,1 2,42 C2,32 12,20 20,2 Z" fill="#9fd3f0" stroke="${INK}" stroke-width="4"/><path d="M12,40 q0,8 8,10" stroke="#fff" stroke-width="4" fill="none"/></svg>`;
