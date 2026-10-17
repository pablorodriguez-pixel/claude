/* Ep. 5 v2 · tiempos clave — TODO por texto (find/w), nunca absolutos */
const fw = (ph, from = 0) => find(ph, from);
const ws = i => W[i].s, wE = i => W[i].e;
const K = {};
{
  K.L0 = ws(fw('los vikingos nunca'));
  const ic = fw('y la culpa'); K.L1 = ws(ic); K.operaE = wE(fw('es de una opera', ic) + 3);
  const ik = fw('casco vikingo casi'); K.casco = ws(ik);
  K.tiene = ws(fw('y tiene sentido'));
  K.entonces = ws(fw('entonces de donde salen'));
  K.disen = ws(fw('y el disenador de vestuario'));
  K.funciono = ws(fw('funciono tan bien'));
  K.todosE = wE(fw('todos con cuernos') + 2);
  const io = fw('ojo cascos con cuernos'); K.ojo = ws(io);
  const ie = fw('escandinavia', io); K.escand = ws(ie); K.escandE = wE(ie);
  const ip = fw('pero dos mil anos antes', io); K.pero = ws(ip); K.dos = ws(ip + 1); K.mil = ws(ip + 2); K.anos = ws(ip + 3); K.antes = ws(ip + 4); K.vikL7 = ws(ip + 7); K.vikL7e = wE(ip + 7);
  const iy = fw('y eran ceremoniales', ip); K.yeran = ws(iy); K.cerem = ws(iy + 2); K.ceremE = wE(iy + 2);
  const is = fw('o sea la imagen', iy); K.osea = ws(is); K.sea = ws(is + 1); K.imagen = ws(is + 3); K.tienes = ws(is + 5);
  const iv = fw('un vikingo', is); K.vik9 = ws(iv + 1);
  const id = fw('la diseno un senor para un teatro', iv); K.idis = id; K.disenoP = ws(id); K.senor = ws(id + 3); K.para = ws(id + 4); K.teatro = ws(id + 6); K.teatroE = wE(id + 6);
  const it = fw('te lo creias', id); K.te = ws(it); K.creias = ws(it + 2);
  const isn = fw('si o no', it); K.si = ws(isn); K.oNo = ws(isn + 1); K.no = ws(isn + 2); K.noE = wE(isn + 2);
  const iv2 = fw('soy tu vecino', isn); K.soy = ws(iv2); K.tu = ws(iv2 + 1); K.vecino = ws(iv2 + 2); K.vecinoE = wE(iv2 + 2);
  const iy2 = fw('y esto no venia en el libro', iv2); K.yesto = ws(iy2); K.esto = ws(iy2 + 1); K.noV = ws(iy2 + 2); K.libro = ws(iy2 + 6); K.END = wE(iy2 + 6);
}
const DUR = K.END + 0.6, LOOP = DUR - 0.4;

/* ---------- escenas heredadas de v1 (gancho → «¡OJO!»): sus tiempos internos están en segundos de la voz v1
   y se re-clavan a la voz nueva con anclas de TEXTO (cada par: [segundo v1, palabra encontrada con find()]). ---------- */
const RA = [
  [-1, -1], [0.16, K.L0], [4.42, K.L1], [7.31, K.operaE],
  [7.75, K.casco - 0.1], [11.05, K.casco - 0.09], [11.15, K.casco],     // la marca de v1 (7,75–11,05) ya no existe
  [21.12, K.tiene], [25.83, K.entonces], [35.72, K.disen], [43.41, K.funciono], [49.14, K.todosE],
  [49.42, K.ojo], [52.28, K.escand], [52.93, K.escandE], [53.02, K.pero - 0.06], [999, 999],
];
function R(t1) { for (let i = 0; i < RA.length - 1; i++) { const a = RA[i], b = RA[i + 1]; if (t1 <= b[0]) return a[1] + (t1 - a[0]) * (b[1] - a[1]) / (b[0] - a[0]); } return t1; }
function RI(t2) { for (let i = 0; i < RA.length - 1; i++) { const a = RA[i], b = RA[i + 1]; if (t2 <= b[1]) return a[0] + (t2 - a[1]) * (b[0] - a[0]) / (b[1] - a[1]); } return t2; }
function scene1(t0, t1, fn, o) { return scene(R(t0), R(t1), fn ? (t => fn(RI(t))) : fn, o); }
function headline1(t0, t1, str, o = {}) { if (o.hlT != null) o = Object.assign({}, o, { hlT: R(o.hlT) }); return headline(R(t0), R(t1), str, o); }
function colorHit1(t0, t1, col, build) { return colorHit(R(t0), R(t1), col, c => { const f = build(c); return t => f(RI(t)); }); }
