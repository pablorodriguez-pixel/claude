/* Ep. 23 · Vídeo-respuesta «¿Bien escrito sería A.C.?» — tiempos clave + figuras nuevas (estilo grabado recortado) */

/* ---------- tiempos clave (todo por texto, nunca absolutos) ---------- */
const fw = (ph, from = 0) => find(ph, from);
const ws = i => W[i].s, wE = i => W[i].e;
const K = {};
{
  K.bien = ws(0); K.A1 = ws(3); K.C1 = ws(4); K.si = ws(5); K.daniela = ws(6);
  const iy = fw('y es aun mas absurdo'); K.y0 = ws(iy); K.aun = ws(iy + 2); K.mas = ws(iy + 3); K.absurdo = ws(iy + 4); K.L0e = wE(iy + 4);
  const i1 = fw('ok viene de oll korrect'); K.L1 = ws(i1); K.ok1 = ws(i1); K.oll = ws(i1 + 3); K.korrect = ws(i1 + 4); K.all = ws(i1 + 5); K.correct = ws(i1 + 6);
  K.escrito = ws(i1 + 7); K.mal = ws(i1 + 8); K.proposito = ws(i1 + 10);
  const ib = fw('bien escrito seria a c', i1); K.bien2 = ws(ib); K.seria2 = ws(ib + 2); K.A2 = ws(ib + 3); K.C2 = ws(ib + 4); K.L1e = wE(ib + 4);
  const i2 = fw('y no era la unica'); K.yno = ws(i2); K.unica = ws(i2 + 4); K.tambien = ws(i2 + 5); K.escribian = ws(i2 + 6); K.OW = ws(i2 + 7); K.oll2 = ws(i2 + 8); K.wright = ws(i2 + 9);
  K.era = ws(i2 + 10); K.ola = ws(i2 + 12); K.kk = ws(i2 + 13); K.ase = ws(i2 + 14); K.epoca = ws(i2 + 17); K.L2e = wE(i2 + 17);
  const i3 = fw('y por que sobrevivio'); K.ypq = ws(i3); K.sobrevivio = ws(i3 + 3); K.ok2 = ws(i3 + 4); K.por = ws(i3 + 5); K.campana = ws(i3 + 7); K.van = ws(i3 + 9); K.buren = ws(i3 + 10);
  K.le = ws(i3 + 11); K.apodaban = ws(i3 + 12); K.old = ws(i3 + 13); K.kinder = ws(i3 + 14); K.ok3 = ws(i3 + 15); K.otra = ws(i3 + 16); K.vez = ws(i3 + 17); K.L3e = wE(i3 + 17);
  const i4 = fw('si lo hubieran escrito bien'); K.si4 = ws(i4); K.bien4 = ws(i4 + 4); K.hoy = ws(i4 + 5); K.contestarias = ws(i4 + 6); K.A4 = ws(i4 + 7); K.C4 = ws(i4 + 8); K.C4e = wE(i4 + 8);
  K.que = ws(i4 + 9); K.palabra = ws(i4 + 10); K.huele = ws(i4 + 12); K.rara = ws(i4 + 13); K.ti = ws(i4 + 15); K.os = ws(i4 + 16); K.leo = ws(i4 + 17); K.L4e = wE(i4 + 17);
  const is = fw('soy tu vecino'); K.soy = ws(is); K.vecino = ws(is + 2); K.isoy = is;
  const iye = fw('y esto no venia en el libro', is); K.iye = iye; K.esto = ws(iye + 1); K.enL = ws(iye + 4); K.libro = ws(iye + 6); K.END = wE(iye + 6);
}
/* cortes de escena */
const S = {
  A: [-1, K.y0 - 0.08], B: [K.y0 - 0.08, K.L1 - 0.1],
  C: [K.L1 - 0.1, K.all - 0.1], D: [K.all - 0.1, K.bien2 - 0.08], E: [K.bien2 - 0.08, K.unica - 0.12],
  F: [K.unica - 0.12, K.OW - 0.1], G: [K.OW - 0.1, K.era - 0.1], H: [K.era - 0.1, K.ypq - 0.08],
  I: [K.ypq - 0.08, K.por - 0.06], J: [K.por - 0.06, K.le - 0.08], KB: [K.le - 0.08, K.ok3 - 0.1], L: [K.ok3 - 0.1, K.si4 - 0.08],
  M: [K.si4 - 0.08, K.que - 0.1], N: [K.que - 0.1, K.soy - 0.1],
  BAL: [K.soy - 0.1, K.enL - 0.04], BK: [K.enL - 0.04, 999],
};
const DUR = K.END + 0.6, LOOP = DUR - 0.4;

/* ---------- figuras nuevas ---------- */
// corazón de «me gusta» (viewBox 0 0 100 90)
const heartSvg = (fill = '#fff', st = INK) => `<svg viewBox="0 0 100 90" width="100%" height="100%" style="overflow:visible"><path d="M50,86 C20,64 4,46 4,28 C4,12 16,2 30,2 C40,2 46,8 50,16 C54,8 60,2 70,2 C84,2 96,12 96,28 C96,46 80,64 50,86 Z" fill="${fill}" stroke="${st}" stroke-width="7" stroke-linejoin="round"/></svg>`;
// avatar genérico (silueta neutra, sin cara: no inventamos la foto de nadie)
const genAvatar = (bg = '#D9D2C4', fg = '#9A9182') => `<svg viewBox="0 0 100 100" width="100%" height="100%"><rect width="100" height="100" fill="${bg}"/><circle cx="50" cy="40" r="19" fill="${fg}"/><path d="M14,100 C16,72 32,62 50,62 C68,62 84,72 86,100 Z" fill="${fg}"/></svg>`;
// lápida (viewBox 0 0 260 300)
function tombInner(txt, o = {}) {
  const sh = 'M20,296 L20,110 C20,40 70,8 130,8 C190,8 240,40 240,110 L240,296 Z';
  return `${cut(P(sh), 7, 8)}${D(sh, '#C9C2B2', 5)}<path d="${sh}" fill="url(#hP)" opacity=".5"/><path d="M200,40 C230,70 236,110 236,296 L210,296 Z" fill="url(#hA)" opacity=".6"/>
  <path d="M60,250 l20,-30 M180,110 l14,-18 l6,14" stroke="${INK}" stroke-width="3" fill="none" opacity=".5"/>
  <text x="130" y="${o.ty || 120}" text-anchor="middle" font-family="Rye" font-size="${o.rs || 34}" fill="${INK}">R.I.P.</text>
  <text x="130" y="${o.y2 || 205}" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="${o.fs || 76}" fill="${INK}">${txt}</text>
  <path d="M0,296 Q60,280 130,292 T260,290 L260,300 L0,300 Z" fill="#7a9a52" stroke="${INK}" stroke-width="3"/>
  <path d="M30,290 l6,-18 l4,16 M210,292 l4,-16 l6,14 M110,292 l4,-14 l5,12" stroke="#3c5a2a" stroke-width="4" fill="none"/>`;
}
// móvil moderno (HTML), devuelve {ph, scr}
function modernPhone(pa, x, y, w, h, o = {}) {
  const ph = box(pa, x, y, w, h, { zIndex: o.z || 5 });
  ph.innerHTML = `<svg width="${w}" height="${h}" style="overflow:visible;position:absolute;left:0;top:0">${cut(`<rect x="0" y="0" width="${w}" height="${h}" rx="60"/>`)}<rect x="0" y="0" width="${w}" height="${h}" rx="60" fill="#2f2924" stroke="${INK}" stroke-width="6"/><rect x="0" y="0" width="${w}" height="${h}" rx="60" fill="url(#hD)" opacity=".4"/><rect x="22" y="22" width="${w - 44}" height="${h - 44}" rx="42" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/><rect x="${w / 2 - 50}" y="34" width="100" height="22" rx="11" fill="${INK}"/></svg>`;
  const hd = box(ph, 22, 22, w - 44, 104, { background: INK, borderRadius: '42px 42px 0 0', zIndex: 2 });
  const scr = box(ph, 22, 126, w - 44, h - 170, { overflow: 'hidden', zIndex: 1 });
  return { ph, hd, scr };
}
function msgB(pa, me, y, html, o = {}) {
  return el('div', pa, { left: me ? 'auto' : '18px', right: me ? '18px' : 'auto', top: px(y), background: me ? (o.bg || '#FFE9A8') : '#fff', border: `4px solid ${INK}`, borderRadius: me ? '30px 30px 8px 30px' : '30px 30px 30px 8px', padding: o.pad || '8px 26px 10px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: px(o.size || 46), color: INK, whiteSpace: 'nowrap', boxShadow: `4px 4px 0 ${SH}`, lineHeight: 1.1, zIndex: 3 }, html);
}
// chapa electoral (viewBox 0 0 500 640)
function badgeInner() {
  let s = '';
  s += cut('<path d="M150,380 L90,630 L170,590 L210,640 L250,400 Z M350,380 L410,630 L330,590 L290,640 L250,400 Z"/>', 6, 8);
  s += `<path d="M150,380 L90,630 L170,590 L210,640 L250,400 Z" fill="${RED}" stroke="${INK}" stroke-width="5"/><path d="M350,380 L410,630 L330,590 L290,640 L250,400 Z" fill="#3f5a8a" stroke="${INK}" stroke-width="5"/>`;
  s += `<path d="M150,380 L90,630 L170,590 L210,640 L250,400 Z" fill="url(#hA)" opacity=".35"/><path d="M350,380 L410,630 L330,590 L290,640 L250,400 Z" fill="url(#hA)" opacity=".35"/>`;
  s += cut('<circle cx="250" cy="250" r="238"/>', 8, 10);
  let rim = ''; for (let k = 0; k < 36; k++) { const a = k / 36 * Math.PI * 2; rim += `<circle cx="${f1(250 + Math.cos(a) * 222)}" cy="${f1(250 + Math.sin(a) * 222)}" r="7" fill="#fff" stroke="${INK}" stroke-width="2"/>`; }
  s += `<circle cx="250" cy="250" r="238" fill="${BRASS}" stroke="${INK}" stroke-width="6"/><circle cx="250" cy="250" r="238" fill="url(#hD)" opacity=".25"/>${rim}<circle cx="250" cy="250" r="198" fill="#FBF6EA" stroke="${INK}" stroke-width="5"/><circle cx="250" cy="250" r="182" fill="none" stroke="${RED}" stroke-width="4" stroke-dasharray="10 8"/>`;
  return s;
}
