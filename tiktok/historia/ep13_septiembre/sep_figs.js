/* Ep. 13 · Septiembre significa séptimo — tiempos clave + figuras nuevas en el estilo de grabado recortado */

/* ---------- tiempos clave (todo por texto, nunca absolutos) ---------- */
const fw = (ph, from = 0) => find(ph, from);
const ws = i => W[i].s, wE = i => W[i].e;
const K = {};
{
  const i0 = fw('septiembre significa septimo');
  K.sept = ws(i0); K.signif = ws(i0 + 1); K.septimo = ws(i0 + 2);
  const im = fw('es el mes nueve'); K.mes = ws(im + 2); K.nueve = ws(im + 3);
  K.cuenta = ws(fw('cuentalos')); K.L0e = wE(fw('cuentalos'));
  const io = fw('octubre octavo'); K.oct = ws(io); K.octavo = ws(io + 1); K.nov = ws(io + 2); K.noveno = ws(io + 3); K.dic = ws(io + 4); K.decimo = ws(io + 5); K.todos = ws(io + 6); K.mal = ws(io + 7);
  const iy = fw('y no es un error'); K.yno = ws(iy); K.error = ws(iy + 4); K.alguien = ws(iy + 5); K.movio = ws(iy + 6); K.calend = ws(iy + 8); K.L1e = wE(iy + 8);
  const ie = fw('el primer calendario romano'); K.L2 = ws(ie); K.romano = ws(ie + 3); K.empezaba = ws(ie + 4); K.marzo = ws(ie + 6);
  const imu = fw('marzo uno'); K.marzo2 = ws(imu); K.uno = ws(imu + 1); K.abril = ws(imu + 2); K.dos = ws(imu + 3); K.dosE = wE(imu + 3);
  const is = fw('y septiembre el siete'); K.ysep = ws(is); K.sep2 = ws(is + 1); K.siete = ws(is + 3); K.cuadraba = ws(is + 4); K.perfecto = ws(is + 5); K.L2e = wE(is + 5);
  const il = fw('luego anadieron enero y febrero'); K.L3 = ws(il); K.anadieron = ws(il + 1); K.enero = ws(il + 2); K.febrero = ws(il + 4);
  const ia = fw('y al final el ano'); K.alfinal = ws(ia); K.ano = ws(ia + 4);
  const iee = fw('empezar en enero'); K.empezar = ws(iee); K.enero2 = ws(iee + 2); K.enero2e = wE(iee + 2);
  const it = fw('todos los meses se corrieron dos puestos'); K.todos2 = ws(it); K.meses = ws(it + 2); K.corrieron = ws(it + 4); K.dosP = ws(it + 5); K.puestos = ws(it + 6); K.L3e = wE(it + 6);
  const ip = fw('pero nadie les cambio el nombre'); K.L4 = ws(ip); K.nadie = ws(ip + 1); K.cambio = ws(ip + 3); K.nombre = ws(ip + 5); K.L4e = wE(ip + 5);
  const ih = fw('y hay mas julio y agosto'); K.L5 = ws(ih); K.mas = ws(ih + 2); K.julio = ws(ih + 3); K.agosto = ws(ih + 5); K.llamaban = ws(ih + 7); K.quinto = ws(ih + 8); K.sexto = ws(ih + 10);
  const ir = fw('los rebautizaron en honor'); K.los = ws(ir); K.rebau = ws(ir + 1); K.honor = ws(ir + 3);
  const ij = fw('julio cesar'); K.julioC = ws(ij); K.cesar = ws(ij + 1);
  const ia2 = fw('y a augusto'); K.augusto = ws(ia2 + 2); K.L5e = wE(ia2 + 2);
  const ioj = fw('ojo dicen que augusto'); K.ojo = ws(ioj); K.dicen = ws(ioj + 1); K.augusto2 = ws(ioj + 3); K.quito = ws(ioj + 5); K.dia = ws(ioj + 7); K.febrero2 = ws(ioj + 9);
  const ipq = fw('para que su mes no fuera mas corto'); K.para = ws(ipq); K.sumes = ws(ipq + 2); K.fuera = ws(ipq + 5); K.corto = ws(ipq + 7);
  const ib = fw('es un bulo'); K.es = ws(ib); K.bulo = ws(ib + 2);
  const inp = fw('no hay ninguna prueba'); K.nohay = ws(inp); K.ninguna = ws(inp + 2); K.prueba = ws(inp + 3); K.L6e = wE(inp + 3);
  const ios = fw('o sea llevas toda la vida llamando septimo al mes nueve'); K.L7 = ws(ios); K.osea = ws(ios + 1); K.llevas = ws(ios + 2); K.vida = ws(ios + 5); K.llamando = ws(ios + 6); K.septimo2 = ws(ios + 7); K.al = ws(ios + 8); K.mes2 = ws(ios + 9); K.nueve2 = ws(ios + 10);
  const ite = fw('te habias dado cuenta'); K.te = ws(ite); K.cuenta2 = ws(ite + 3);
  const isn = fw('si o no', ite); K.si = ws(isn); K.noB = ws(isn + 2); K.L7e = wE(isn + 2);
  const isoy = fw('soy tu vecino'); K.soy = ws(isoy); K.vecino = ws(isoy + 2); K.isoy = isoy;
  const iye = fw('y esto no venia en el libro', isoy); K.iye = iye; K.esto = ws(iye + 1); K.enL = ws(iye + 4); K.libro = ws(iye + 6); K.END = wE(iye + 6);
}
/* cortes de escena */
const S = {
  A: [-1, K.cuenta - 0.08], A2: [K.cuenta - 0.08, K.oct - 0.14],
  B1: [K.oct - 0.14, K.yno - 0.12], B2: [K.yno - 0.12, K.L2 - 0.12],
  C1: [K.L2 - 0.12, K.marzo2 - 0.06], GR: [K.marzo2 - 0.06, K.L4 - 0.1], HITN: [K.L4 - 0.1, K.L5 - 0.08],
  E1: [K.L5 - 0.08, K.los - 0.1], E2: [K.los - 0.1, K.ojo - 0.08],
  F1: [K.ojo - 0.08, K.para - 0.08], F2: [K.para - 0.08, K.es - 0.1], F3: [K.es - 0.1, K.L7 - 0.08],
  HIT2: [K.L7 - 0.08, K.te + 0.25], CTA: [K.te + 0.25, K.soy - 0.1],
  C: [K.soy - 0.1, K.enL - 0.04], L2: [K.enL - 0.04, 999],
};
const DUR = K.END + 0.6, LOOP = DUR - 0.4;

/* ---------- HOJA DE MES (tarjeta de calendario con anillas) ---------- */
// devuelve { wrap, paper, numA, numB, nameE }  — numA = número antiguo, numB = número nuevo (para el salto +2)
function monthTile(pa, x, y, w, h, name, o = {}) {
  const wrap = box(pa, x, y, w, h, { zIndex: o.z || 10 });
  const paper = box(wrap, 0, 16, w, h - 16, { background: o.bg || '#FBF6EA', border: `5px solid ${INK}`, borderRadius: '14px', boxShadow: `8px 9px 0 ${SH}`, overflow: 'hidden' });
  box(paper, 0, 0, w - 10, h - 26, { backgroundImage: 'repeating-linear-gradient(45deg, rgba(43,33,24,.06) 0 2px, transparent 2px 10px)' });
  const hdH = o.hdH || Math.round(h * 0.25);
  const hd = box(paper, 0, 0, w - 10, hdH, { background: o.hd || RED, borderBottom: `5px solid ${INK}` });
  const fs = o.nameSize || Math.min(o.maxName || 40, (w - 34) / (name.length * 0.66));
  const nameE = el('div', hd, { left: '0', top: '0', width: px(w - 10), height: px(hdH - 5), lineHeight: px(hdH - 5), textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: px(fs), color: o.nameCol || '#fff', whiteSpace: 'nowrap', letterSpacing: '0.02em' }, name);
  const nsz = o.numSize || Math.round((h - hdH) * 0.62);
  const mkN = (txt, col) => el('div', paper, { left: '0', top: px(hdH + (h - 26 - hdH - nsz * 1.05) / 2), width: px(w - 10), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(nsz), lineHeight: 1.05, color: col, zIndex: 3 }, txt);
  const numA = mkN(o.num == null ? '' : String(o.num), o.numCol || INK);
  const numB = mkN(o.num2 == null ? '' : String(o.num2), o.num2Col || INK); numB.style.visibility = 'hidden';
  // anillas
  const rg = box(wrap, 0, 0, w, 40, { zIndex: 5 });
  rg.innerHTML = `<svg width="${w}" height="40" style="overflow:visible">${[0.28, 0.72].map(k => `<rect x="${f1(w * k - 9)}" y="0" width="18" height="34" rx="9" fill="${BRASS}" stroke="${INK}" stroke-width="4"/>`).join('')}</svg>`;
  return { wrap, paper, numA, numB, nameE, hd };
}
// salto de número viejo → nuevo en t0
function numSwap(m, t, t0) {
  const on = t >= t0;
  m.numA.style.visibility = on ? 'hidden' : 'visible';
  m.numB.style.visibility = on ? 'visible' : 'hidden';
  if (on) set(m.numB, { s: lerp(1.6, 1, p(t, t0, 0.22, E.outBack)), o: 1 });
}

/* ---------- CALENDARIO DE PARED (grabado) — hoja con «MES Nº» y número gigante ---------- */
function calPage(pa, x, y, w, h, num, o = {}) {
  const pg = box(pa, x, y, w, h, { zIndex: o.z || 4 });
  const torn = o.torn ? `M0,14 ${Array.from({ length: 24 }, (_, i) => `L${f1((i + 1) * w / 24)},${(i % 2) ? 0 : 16}`).join(' ')} L${w},${h} L0,${h} Z` : `M0,0 H${w} V${h} H0 Z`;
  let grid = ''; const gx = 40, gw = w - 80, gy = h - 250, cw = gw / 7, ch = 40; let d = 1;
  if (o.grid !== false) for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) { const xx = gx + c * cw, yy = gy + r * ch; grid += `<rect x="${f1(xx)}" y="${f1(yy)}" width="${f1(cw)}" height="${ch}" fill="none" stroke="${INK}" stroke-width="2" opacity=".5"/>`; if (d <= 30 && (r > 0 || c >= 2)) { grid += `<text x="${f1(xx + 8)}" y="${f1(yy + 27)}" font-family="SpecialElite" font-size="22" fill="${c === 6 ? RED : INK}" opacity=".75">${d}</text>`; d++; } }
  pg.innerHTML = `<svg width="${w}" height="${h}" style="overflow:visible;position:absolute;left:0;top:0">
    <path d="${torn}" fill="#FBF6EA" stroke="${INK}" stroke-width="5"/><path d="${torn}" fill="url(#hP)" opacity=".35"/>
    <rect x="0" y="${o.torn ? 14 : 0}" width="${w}" height="${110 - (o.torn ? 14 : 0)}" fill="${INK}"/>
    <text x="${w / 2}" y="82" text-anchor="middle" font-family="Rye" font-size="62" fill="${YEL}" letter-spacing="4">MES Nº</text>
    ${grid}</svg>`;
  const n = el('div', pg, { left: '0', top: '96px', width: px(w), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(o.nsz || 400), lineHeight: 1, color: o.numCol || INK, zIndex: 2 }, String(num));
  return { pg, n };
}
function wallCal(pa, x, y, w, h, num, o = {}) {
  const wrap = box(pa, x, y, w, h, { zIndex: o.z || 4, transformOrigin: `${w / 2}px -120px` });
  const bk = box(wrap, 0, 0, w, h);
  bk.innerHTML = `<svg width="${w}" height="${h}" style="overflow:visible">
    <path d="M${w * 0.18},40 L${w / 2},-120 L${w * 0.82},40" stroke="${INK}" stroke-width="6" fill="none"/>
    <circle cx="${w / 2}" cy="-122" r="16" fill="${BRASS}" stroke="${INK}" stroke-width="5"/>
    ${cut(`<rect x="0" y="20" width="${w}" height="${h - 20}" rx="18"/>`)}
    <rect x="0" y="20" width="${w}" height="${h - 20}" rx="18" fill="${LEATHER}" stroke="${INK}" stroke-width="6"/><rect x="0" y="20" width="${w}" height="${h - 20}" rx="18" fill="url(#hW)" opacity=".35"/>
    ${[0, 1, 2, 3].map(k => `<rect x="${24 + k * 3}" y="${h - 60 + k * 6}" width="${w - 48 - k * 6}" height="12" fill="#EFE6D2" stroke="${INK}" stroke-width="2.5"/>`).join('')}</svg>`;
  const page = calPage(wrap, 24, 64, w - 48, h - 124, num, { nsz: o.nsz, z: 3, grid: o.grid });
  const rg = box(wrap, 0, 0, w, 90, { zIndex: 6 });
  let rings = ''; const n = 8; for (let k = 0; k < n; k++) { const xx = 70 + k * (w - 140) / (n - 1); rings += `<rect x="${f1(xx - 10)}" y="36" width="20" height="50" rx="10" fill="${BRASS}" stroke="${INK}" stroke-width="4.5"/><circle cx="${f1(xx)}" cy="80" r="8" fill="${INK}"/>`; }
  rg.innerHTML = `<svg width="${w}" height="90" style="overflow:visible">${rings}</svg>`;
  return { wrap, page };
}

/* ---------- ROMANOS (busto con toga y laurel) viewBox 0 0 360 460 ---------- */
function romanInner(o = {}) {
  const r = rng(o.seed || 44);
  let s = bustInner({ seed: o.seed || 44, uniform: 'none' });
  // pelo
  if (o.hair === 'curly') {
    let c = ''; for (let k = 0; k < 13; k++) { const a = Math.PI * (1.05 + k * 0.9 / 12), xx = 180 + Math.cos(a) * 64, yy = 196 + Math.sin(a) * 58; c += `<circle cx="${f1(xx)}" cy="${f1(yy)}" r="${f1(15 + r() * 4)}"/>`; }
    for (let k = 0; k < 5; k++) c += `<circle cx="${f1(140 + k * 20)}" cy="${f1(156 + (k % 2) * 6)}" r="14"/>`;
    s += `<g fill="#5a4030" stroke="${INK}" stroke-width="3">${c}</g><g fill="url(#hA)" opacity=".6">${c}</g>`;
  } else {
    let st = ''; for (let k = 0; k < 9; k++) { const xx = 132 + k * 12; st += `M${xx},${146 + Math.abs(k - 4) * 3} q${4},${18} ${-2},${30}`; }
    s += `<path d="M124,190 C122,150 150,136 180,136 C210,136 238,150 236,190 C222,168 200,160 180,160 C160,160 138,168 124,190 Z" fill="#cfc4ad" stroke="${INK}" stroke-width="3"/><path d="${st}" stroke="${INK}" stroke-width="2.4" fill="none"/>`;
  }
  // laurel
  let lv = ''; const lc = o.gold ? BRASS : '#7d9a4e';
  for (const side of [-1, 1]) for (let k = 0; k < 7; k++) {
    const a = Math.PI * (side < 0 ? 1.0 + k * 0.07 : 2.0 - k * 0.07), xx = 180 + Math.cos(a) * 74, yy = 200 + Math.sin(a) * 66, rot = (a * 180 / Math.PI) + 90 + side * 25;
    lv += `<ellipse cx="${f1(xx)}" cy="${f1(yy)}" rx="16" ry="7" transform="rotate(${f1(rot)} ${f1(xx)} ${f1(yy)})" fill="${lc}" stroke="${INK}" stroke-width="2.6"/>`;
  }
  s += `<path d="M112,200 Q118,150 160,140 M248,200 Q242,150 200,140" stroke="${INK}" stroke-width="3" fill="none"/>${lv}`;
  // toga
  const torso = 'M28,460 C32,384 80,338 140,328 L220,328 C280,338 328,384 332,460 Z';
  const sash = 'M70,360 C120,330 160,336 190,350 L330,452 L332,460 L250,460 L60,392 Z';
  s += D(torso, '#F3EEE2', 4) + clipG(uid('tg'), torso, `<rect x="230" y="320" width="140" height="150" fill="url(#hA)"/><path d="M90,400 q30,40 20,70 M130,380 q30,50 20,90 M300,400 q-20,30 -10,60" stroke="${INK}" stroke-width="2.4" fill="none"/>`);
  s += D(sash, '#E8DFC9', 4) + clipG(uid('ts'), sash, `<rect x="60" y="330" width="280" height="140" fill="url(#hB)" opacity=".7"/><path d="M80,370 L300,456" stroke="${o.stripe || '#7a2a3a'}" stroke-width="12"/>`) + `<path d="M110,352 q60,10 110,50 M150,346 q50,20 100,60" stroke="${INK}" stroke-width="2.4" fill="none"/>`;
  s += `<path d="M146,330 Q180,352 214,330" stroke="${INK}" stroke-width="4" fill="none"/>`;
  return s;
}
const mkRoman = (pa, b, o = {}) => { const f = mk(pa, b, romanInner(o), '0 0 360 460', 'bust'); return f; };

/* ---------- placa de mármol (QUINTO → JULIO) ---------- */
function plaque(pa, x, y, w, html, o = {}) {
  return el('div', pa, { left: px(x), top: px(y), width: px(w), textAlign: 'center', background: '#EFEAE0', backgroundImage: 'repeating-linear-gradient(120deg, rgba(43,33,24,.07) 0 2px, transparent 2px 14px)', color: INK, fontFamily: 'Rye', fontSize: px(o.size || 40), padding: '10px 0 14px', border: `5px solid ${INK}`, borderRadius: '8px', boxShadow: `7px 8px 0 ${SH}`, zIndex: o.z || 20, whiteSpace: 'nowrap', lineHeight: 1.1 }, html);
}
// casilla de día (para «un día» robado)
function dayBox(pa, x, y, sz, txt, o = {}) {
  return el('div', pa, { left: px(x), top: px(y), width: px(sz), height: px(sz), background: o.bg || '#fff', border: `5px solid ${INK}`, borderRadius: '8px', boxShadow: `5px 6px 0 ${SH}`, fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz * 0.5), lineHeight: px(sz - 10), textAlign: 'center', color: o.col || INK, zIndex: o.z || 20 }, txt);
}
const LUPA = (q = '') => `<svg width="300" height="380" style="overflow:visible"><path d="M240,240 L330,350" stroke="${INK}" stroke-width="40" stroke-linecap="round"/><path d="M240,240 L330,350" stroke="${WOOD}" stroke-width="26" stroke-linecap="round"/><circle cx="150" cy="150" r="120" fill="rgba(255,255,255,.22)"/><circle cx="150" cy="150" r="138" fill="none" stroke="${INK}" stroke-width="22"/><circle cx="150" cy="150" r="137" fill="none" stroke="${BRASS}" stroke-width="13"/><circle cx="150" cy="150" r="126" fill="none" stroke="${INK}" stroke-width="4"/><path d="M80,100 q30,-40 80,-44" stroke="#fff" stroke-width="12" stroke-linecap="round" fill="none" opacity=".8"/>${q}</svg>`;
function headlineN(t0, t1, str, o = {}) { headline(t0, t1, str, o); }
