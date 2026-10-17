/* Ep. 26 · ¿ALADINO, UN COLADO? (Especial 1.000) — tiempos clave (todo por texto) + figuras en estilo grabado recortado */

/* ---------- tiempos clave ---------- */
const ws = i => W[i].s, wE = i => W[i].e;
const K = {};
{
  K.aladino0 = ws(0); K.te0 = ws(1); K.colaron = ws(3); K.las0 = ws(5); K.noches0 = ws(9); K.L0e = wE(9);
  const i1 = find('en el original no sale'); K.L1 = ws(i1); K.original = ws(i1 + 2); K.no1 = ws(i1 + 3); K.sale = ws(i1 + 4); K.y1 = ws(i1 + 5); K.se1 = ws(i1 + 6); K.quien = ws(i1 + 7); K.colo1 = ws(i1 + 9);
  const i2 = find('son los cuentos de sherezade'); K.L2 = ws(i2); K.cuentos2 = ws(i2 + 2); K.sherezade = ws(i2 + 4); K.uno2 = ws(i2 + 5); K.cada = ws(i2 + 6); K.noche2 = ws(i2 + 7); K.para2 = ws(i2 + 8); K.rey = ws(i2 + 11); K.no2 = ws(i2 + 12); K.mate = ws(i2 + 14);
  const i3 = find('en mil setecientos cuatro'); K.L3 = ws(i3); K.cuatro = ws(i3 + 3); K.traduce = ws(i3 + 5); K.frances = ws(i3 + 7); K.galland3 = ws(i3 + 8); K.exitazo = ws(i3 + 9);
  const i4 = find('pero su manuscrito'); K.L4 = ws(i4); K.manuscrito = ws(i4 + 2); K.acaba = ws(i4 + 3); K.noche4 = ws(i4 + 6); K.doscientas = ws(i4 + 7); K.ochenta = ws(i4 + 8); K.dos4 = ws(i4 + 10); K.dos4e = wE(i4 + 10);
  K.le4 = ws(i4 + 11); K.faltan = ws(i4 + 12); K.mas4 = ws(i4 + 13); K.setecientas = ws(i4 + 15); K.L4e = wE(i4 + 15);
  const i5 = find('en mil setecientos nueve'); K.L5 = ws(i5); K.nueve = ws(i5 + 3); K.chaval = ws(i5 + 5); K.sirio = ws(i5 + 6); K.hanna5 = ws(i5 + 7); K.diyab = ws(i5 + 8); K.cuenta = ws(i5 + 10); K.uno5 = ws(i5 + 11); K.aladino5 = ws(i5 + 12);
  const i6 = find('galland lo mete'); K.L6 = ws(i6); K.mete = ws(i6 + 2); K.libro6 = ws(i6 + 5); K.tal = ws(i6 + 6); K.cual = ws(i6 + 7);
  const i7 = find('y mira donde pasa'); K.L7 = ws(i7); K.donde = ws(i7 + 2); K.pasa = ws(i7 + 3); K.en7 = ws(i7 + 4); K.ciudad = ws(i7 + 6); K.de7 = ws(i7 + 7); K.china = ws(i7 + 8); K.si7 = ws(i7 + 9); K.aladino7 = ws(i7 + 10); K.era7 = ws(i7 + 11); K.chino = ws(i7 + 12);
  const i8 = find('pero lo mas bestia'); K.L8 = ws(i8); K.bestia = ws(i8 + 3); K.que8 = ws(i8 + 4); K.especial = ws(i8 + 9); K.mil8 = ws(i8 + 12);
  const i9 = find('ese mismo mes'); K.L9 = ws(i9); K.mismo = ws(i9 + 1); K.mes = ws(i9 + 2); K.hanna9 = ws(i9 + 3); K.conto9 = ws(i9 + 5); K.otro = ws(i9 + 6); K.ali = ws(i9 + 7); K.baba = ws(i9 + 8);
  K.cuarenta = ws(i9 + 11); K.ladrones = ws(i9 + 12); K.tampoco = ws(i9 + 13); K.estaba = ws(i9 + 14);
  const i10 = find('los dos cuentos mas famosos'); K.L10 = ws(i10); K.dos10 = ws(i10 + 1); K.famosos = ws(i10 + 4); K.libro10 = ws(i10 + 6); K.conto10 = ws(i10 + 8); K.el10 = ws(i10 + 9);
  K.y10 = ws(i10 + 10); K.libro10b = ws(i10 + 12); K.ni = ws(i10 + 13); K.nombra = ws(i10 + 15); K.L10e = wE(i10 + 15);
  const i11 = find('el proximo lo elegis'); K.L11 = ws(i11); K.elegis = ws(i11 + 3); K.alejandro = ws(i11 + 4); K.cero = ws(i11 + 6); K.napoleon = ws(i11 + 9); K.A11 = ws(i11 + 10); K.B11 = ws(i11 + 11); K.C11 = ws(i11 + 13);
  const i12 = find('mil gracias'); K.mil12 = ws(i12); K.gracias = ws(i12 + 1); K.vecinos12 = ws(i12 + 2);
  const is = find('soy tu vecino', i12); K.isoy = is; K.soy = ws(is); K.vecino = ws(is + 2);
  const iye = find('y esto no venia en el libro', is); K.iye = iye; K.esto = ws(iye + 1); K.enL = ws(iye + 4); K.libro = ws(iye + 6); K.END = wE(iye + 6);
}
/* cortes de escena (un plano por idea; nada parado más de 2 s) */
const S = {
  A: [-1, K.L1 - 0.08],
  B: [K.L1 - 0.08, K.y1 - 0.1], C: [K.y1 - 0.1, K.L2 - 0.08],
  D: [K.L2 - 0.08, K.uno2 - 0.06], E: [K.uno2 - 0.06, K.para2 - 0.06], F: [K.para2 - 0.06, K.L3 - 0.08],
  G1: [K.L3 - 0.08, K.frances - 0.08], G2: [K.frances - 0.08, K.exitazo - 0.06], G3: [K.exitazo - 0.06, K.L4 - 0.08],
  H: [K.L4 - 0.08, K.L5 - 0.08],
  I1: [K.L5 - 0.08, K.chaval - 0.08], I2: [K.chaval - 0.08, K.aladino5 - 0.08], I3: [K.aladino5 - 0.08, K.L6 - 0.08],
  J: [K.L6 - 0.08, K.L7 - 0.08],
  L: [K.L7 - 0.08, K.L8 - 0.08],
  M: [K.L8 - 0.08, K.que8 - 0.06], N: [K.que8 - 0.06, K.L9 - 0.08],
  O: [K.L9 - 0.08, K.ali - 0.1], P: [K.ali - 0.1, K.tampoco - 0.08], Q: [K.tampoco - 0.08, K.L10 - 0.08],
  R: [K.L10 - 0.08, K.L11 + 0.35],
  T: [K.L11 + 0.35, K.mil12 - 0.08],
  BAL: [K.mil12 - 0.08, K.enL - 0.04], BK: [K.enL - 0.04, 999],
};
const TAIL = 1.0, DUR = K.END + TAIL, LOOP = DUR - 0.4;
const T_EMU = K.exitazo + 0.22; // cameo único del emú (0,6 s)

/* ---------- lámpara de aceite (viewBox 0 0 300 170) ---------- */
function lampInner() {
  const body = 'M60,110 C40,70 120,52 170,60 C200,64 230,70 290,40 C270,70 250,100 200,118 C170,130 90,132 60,110 Z';
  const foot = 'M110,124 L180,124 L190,152 L100,152 Z', lid = 'M118,62 C120,36 160,34 164,60 Z', handle = 'M64,96 C10,90 10,40 52,46 C36,58 40,80 70,86 Z';
  return cut(P(body) + P(foot) + P(lid) + P(handle), 5, 6) + D(handle, BRASS, 4) + D(foot, BRASS, 4) + HF(foot, 'hD') + D(body, BRASS, 4) + HF('M80,112 C120,128 170,126 200,116 C160,110 110,108 80,112 Z', 'hD')
    + `<path d="M70,104 C110,118 170,116 210,100" stroke="${INK}" stroke-width="2" fill="none"/><path d="M90,78 C130,70 160,72 186,78" stroke="#fff" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/>`
    + D(lid, BRASS, 4) + `<circle cx="141" cy="34" r="8" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>`;
}
/* ---------- ALADINO (cuerpo entero, viewBox 0 0 260 460) ---------- */
function aladInner() {
  const id = uid('al');
  const legs = 'M84,270 C60,330 66,380 70,408 L118,408 C118,370 124,330 130,300 C136,330 142,370 142,408 L190,408 C194,380 200,330 176,270 Z';
  const shoeL = 'M64,404 L120,404 L120,424 C100,430 70,432 40,418 C30,410 36,400 46,408 Z', shoeR = 'M140,404 L196,404 L214,408 C224,400 230,410 220,418 C190,432 160,430 140,424 Z';
  const torso = 'M88,170 C92,150 112,140 130,140 C148,140 168,150 172,170 L180,276 L80,276 Z';
  const vestL = 'M88,170 C92,150 110,142 120,142 L112,276 L80,276 Z', vestR = 'M172,170 C168,150 150,142 140,142 L148,276 L180,276 Z';
  const sash = 'M80,250 L180,250 L182,280 L78,280 Z';
  const head = 'M96,96 C96,66 112,52 130,52 C148,52 164,66 164,96 C164,124 150,140 130,140 C110,140 96,124 96,96 Z';
  const hair = 'M94,92 C88,58 112,40 132,42 C156,42 172,60 166,92 C160,76 150,68 140,72 C128,62 112,66 100,80 Z';
  const fez = 'M104,58 L110,20 L152,20 L158,58 Z';
  const armL = limb(92, 176, 56, 236, 13, 11), armR = limb(168, 176, 206, 216, 13, 11);
  let s = cut(P(legs) + P(shoeL) + P(shoeR) + P(torso) + P(head) + P(fez) + P(armL) + P(armR) + '<circle cx="54" cy="244" r="15"/><circle cx="210" cy="214" r="15"/>');
  s += D(legs, '#F4ECDB') + clipG(id + 'l', legs, `<rect x="130" y="260" width="80" height="160" fill="url(#hA)"/><path d="M80,300 Q100,320 90,380 M170,300 Q160,330 172,380" stroke="${INK}" stroke-width="2" fill="none"/>`);
  s += D(shoeL, RED) + D(shoeR, RED);
  s += D(armL, '#E2B98F') + D(armR, '#E2B98F') + `<circle cx="54" cy="244" r="15" fill="#E2B98F" stroke="${INK}" stroke-width="3"/><circle cx="210" cy="214" r="15" fill="#E2B98F" stroke="${INK}" stroke-width="3"/>`;
  s += D(torso, '#E2B98F') + HF('M150,150 L172,170 L180,276 L150,276 Z', 'hA') + D(vestL, '#6a3f8a') + D(vestR, '#6a3f8a') + HF(vestR, 'hD') + D(sash, RED) + HF(sash, 'hB');
  s += D('M118,128 L142,128 L140,146 L120,146 Z', '#E2B98F');
  s += D(head, '#E2B98F') + clipG(id + 'h', head, `<ellipse cx="166" cy="104" rx="26" ry="40" fill="url(#hA)"/>`) + D(hair, INK);
  s += `<ellipse cx="116" cy="96" rx="9" ry="7" fill="#fff" stroke="${INK}" stroke-width="2.2"/><ellipse cx="144" cy="96" rx="9" ry="7" fill="#fff" stroke="${INK}" stroke-width="2.2"/>`;
  s += `<g class="pup"><circle cx="118" cy="97" r="4" fill="${INK}"/><circle cx="146" cy="97" r="4" fill="${INK}"/></g>`;
  s += `<g class="lidC" style="opacity:0"><ellipse cx="116" cy="96" rx="10" ry="8" fill="#E2B98F" stroke="${INK}" stroke-width="2.2"/><ellipse cx="144" cy="96" rx="10" ry="8" fill="#E2B98F" stroke="${INK}" stroke-width="2.2"/></g>`;
  s += `<path class="brow" d="M106,84 q10,-6 20,-1 M136,83 q10,-5 20,1" stroke="${INK}" stroke-width="4" stroke-linecap="round" fill="none"/>`;
  s += `<path d="M130,100 q-4,12 2,14" stroke="${INK}" stroke-width="2.4" fill="none"/><path d="M118,122 q12,8 26,0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  s += D(fez, RED) + HF(fez, 'hD') + `<path d="M152,22 C176,26 182,46 176,64" stroke="${INK}" stroke-width="3" fill="none"/><circle cx="176" cy="66" r="6" fill="${YEL}" stroke="${INK}" stroke-width="2"/>`;
  return s;
}
/* ---------- bustos nuevos (viewBox 0 0 360 460, base bustInner) ---------- */
const wigOver = () => {
  let c = ''; const cur = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#F4F1EA" stroke="${INK}" stroke-width="2.6"/><path d="M${x - r * 0.5},${y} a${r * 0.5},${r * 0.5} 0 1,1 ${r},0" stroke="${INK}" stroke-width="1.6" fill="none"/>`;
  [[110, 170], [100, 205], [98, 240], [100, 275], [106, 308], [250, 170], [260, 205], [262, 240], [260, 275], [254, 308]].forEach(q => c += cur(q[0], q[1], 22));
  const top = 'M112,176 C108,120 140,104 180,104 C220,104 252,120 248,176 C236,150 212,138 180,140 C148,138 124,150 112,176 Z';
  return cut(P(top), 3, 4) + D(top, '#F4F1EA') + HF(top, 'hF') + c + `<path d="M180,104 L174,90 L186,90 Z" fill="${INK}"/>`;
};
const jabotOver = () => `<path d="M160,332 C150,360 160,380 180,392 C200,380 210,360 200,332 Z" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M168,344 q12,8 24,0 M166,360 q14,8 28,0" stroke="${INK}" stroke-width="1.6" fill="none"/>`;
function gallandInner() { return bustInner({ uniform: 'soldier', seed: 14 }) + coatOver('#4a3050') + jabotOver() + wigOver(); }
const curlsOver = () => {
  let c = ''; const r = rng(77);
  for (let k = 0; k < 15; k++) { const a = Math.PI * (1.02 + k / 14 * 0.96), x = 180 + Math.cos(a) * 78, y = 206 + Math.sin(a) * 86; c += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(18 + r() * 5)}" fill="#8a5a2a" stroke="${INK}" stroke-width="2.6"/><path d="M${f1(x - 8)},${f1(y)} a8,8 0 1,1 16,0" stroke="${INK}" stroke-width="1.6" fill="none"/>`; }
  let lv = ''; for (let k = 0; k < 9; k++) { const a = Math.PI * (1.12 + k / 8 * 0.76), x = 180 + Math.cos(a) * 82, y = 196 + Math.sin(a) * 74, rot = a * 180 / Math.PI + 90; lv += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="16" ry="7" fill="#7a9a52" stroke="${INK}" stroke-width="2.4" transform="rotate(${f1(rot + (k % 2 ? 30 : -30))} ${f1(x)} ${f1(y)})"/>`; }
  return c + lv;
};
const cloakOver = () => {
  const cl = 'M28,460 C32,384 80,338 140,328 L220,328 C280,338 328,384 332,460 Z';
  return `<path d="${cl}" fill="#8a2f3a" stroke="${INK}" stroke-width="3"/><path d="${cl}" fill="url(#hA)" opacity=".35"/><path d="M140,330 L120,460 M220,330 L250,460" stroke="${INK}" stroke-width="2.5"/><path d="M120,340 L240,340 L230,372 L130,372 Z" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><circle cx="180" cy="356" r="10" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>`;
};
function alexInner() { return bustInner({ uniform: 'soldier', seed: 12 }) + cloakOver() + curlsOver(); }

/* ---------- gorro de fiesta + matasuegras para el emú frontal (coordenadas de su viewBox 400x600) ---------- */
function partyOver() {
  const cone = 'M160,128 L232,-60 L284,148 Z';
  let st = ''; for (let k = 0; k < 4; k++) st += `<path d="M${f1(172 + k * 28)},${f1(124 - k * 3)} L${f1(214 + k * 12)},${f1(-10 - k * 8)}" stroke="${PINK}" stroke-width="12"/>`;
  return `<g>${cut(P(cone), 4, 5)}${D(cone, YEL, 4)}<clipPath id="pcone"><path d="${cone}"/></clipPath><g clip-path="url(#pcone)">${st}</g><path d="M160,128 L284,148" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><circle cx="232" cy="-62" r="18" fill="${PINK}" stroke="${INK}" stroke-width="4"/></g>
   <g class="blow"><path d="M240,300 L330,300" stroke="${INK}" stroke-width="30" stroke-linecap="round"/><path d="M240,300 L330,300" stroke="${PINK}" stroke-width="20" stroke-linecap="round"/><path d="M240,300 L330,300" stroke="${YEL}" stroke-width="6" stroke-dasharray="10 12"/><path d="M330,300 q40,0 40,-30 q0,-26 -26,-24" stroke="${INK}" stroke-width="22" fill="none" stroke-linecap="round" class="blowTip"/><path d="M330,300 q40,0 40,-30 q0,-26 -26,-24" stroke="${PINK}" stroke-width="13" fill="none" stroke-linecap="round"/></g>`;
}
/* confeti de papel recortado (HTML) */
function paperConfetti(pa, n, seed, cols, o = {}) {
  const r = rng(seed), out = [];
  for (let i = 0; i < n; i++) {
    const w = 18 + r() * 22, h = 10 + r() * 14;
    const e = box(pa, 0, 0, w, h, { background: cols[i % cols.length], border: `2px solid ${INK}`, zIndex: o.z || 30, clipPath: jag(seed + i, 6, 3) });
    out.push({ e, x: (o.x0 || 40) + r() * (o.xw || 1000), y0: (o.y0 == null ? -80 : o.y0) - r() * (o.spread || 200), d: r() * (o.dd || 0.6), rs: (r() - 0.5) * 900, sw: 20 + r() * 40, vy: (o.vy || 900) * (0.7 + r() * 0.6) });
  }
  return out;
}
function updConf(C, t, t0, on = true) {
  C.forEach(q => { const tt = t - t0 - q.d; if (!on || tt < 0) { q.e.style.visibility = 'hidden'; return; } q.e.style.visibility = 'visible'; set(q.e, { x: q.x + Math.sin(tt * 4 + q.d * 9) * q.sw, y: q.y0 + q.vy * tt, r: q.rs * tt }); });
}
/* barra de la lista 1·2·3·4 (arriba, global) */

/* ======================================================================
   FIGURAS NUEVAS (viewBox de busto 0 0 360 460 salvo que se diga)
   ====================================================================== */
// Hanna Diyab: chaval de Alepo con fez y chaqueta
const fezOver = () => {
  const fz = 'M124,162 L138,92 L222,92 L236,162 Z';
  return cut(P(fz), 3, 4) + D(fz, RED) + HF(fz, 'hD') + `<path d="M126,150 Q180,140 234,150" stroke="${INK}" stroke-width="3" fill="none"/><path d="M180,94 C214,96 226,120 222,150" stroke="${INK}" stroke-width="3" fill="none"/><circle cx="222" cy="154" r="8" fill="${YEL}" stroke="${INK}" stroke-width="2.5"/>`;
};
const vestOver = (col = '#7a3b2a') => {
  const L = 'M28,460 C32,384 80,338 140,328 L164,460 Z', R = 'M332,460 C328,384 280,338 220,328 L196,460 Z';
  return `<path d="M140,328 L220,328 L210,460 L150,460 Z" fill="#F4ECDB" stroke="${INK}" stroke-width="3"/><path d="M150,336 v120 M210,336 v120" stroke="${INK}" stroke-width="1.5" opacity=".5"/>` + D(L, col) + HF(L, 'hA') + D(R, col) + HF(R, 'hD') + `<path d="M60,410 Q100,396 140,404 M300,410 Q260,396 220,404" stroke="${YEL}" stroke-width="5" fill="none"/>`;
};
function hannaInner() { return bustInner({ uniform: 'farmer', seed: 21 }) + vestOver() + fezOver(); }
// Sherezade: velo, joya y pendientes
const veilOver = () => {
  const outer = 'M94,262 C82,150 124,80 180,78 C236,80 278,150 266,262 C278,332 312,382 332,460 L28,460 C48,382 82,332 94,262 Z';
  const hole = 'M126,250 C120,172 142,130 180,128 C218,130 240,172 234,250 C234,300 214,328 180,328 C146,328 126,300 126,250 Z';
  return `<path d="${outer} ${hole}" fill-rule="evenodd" fill="#7a3f9a" stroke="${INK}" stroke-width="4"/><path d="${outer} ${hole}" fill-rule="evenodd" fill="url(#hA)" opacity=".35"/>
   <path d="${hole}" fill="none" stroke="${BRASS}" stroke-width="7"/><path d="${hole}" fill="none" stroke="${INK}" stroke-width="2"/>
   <path d="M160,150 Q180,138 200,150 L180,176 Z" fill="${RED}" stroke="${INK}" stroke-width="3"/><circle cx="180" cy="158" r="6" fill="${YEL}" stroke="${INK}" stroke-width="2"/>
   <circle cx="148" cy="238" r="12" fill="${PINK}" opacity=".35"/><circle cx="212" cy="238" r="12" fill="${PINK}" opacity=".35"/>
   <path d="M142,196 l-8,-7 M150,193 l-4,-9 M218,196 l8,-7 M210,193 l4,-9" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
   <path d="M60,420 Q180,380 300,420" stroke="${BRASS}" stroke-width="6" fill="none"/>`;
};
function sheraInner() { return bustInner({ uniform: 'soldier', seed: 33 }) + veilOver(); }
// el rey (Shahriar): turbante con joya y pluma, capa
const turbanOver = () => {
  const tb = 'M92,182 C76,112 128,66 180,68 C232,66 284,112 268,182 C232,160 128,160 92,182 Z';
  let wr = ''; for (let k = 0; k < 5; k++) wr += `<path d="M${100 + k * 6},${170 - k * 18} Q180,${150 - k * 26} ${260 - k * 6},${170 - k * 18}" stroke="${INK}" stroke-width="2.4" fill="none" opacity=".7"/>`;
  return cut(P(tb), 4, 5) + D(tb, '#F4F1EA') + HF(tb, 'hF') + wr + `<path d="M180,108 C170,60 196,30 214,20 C206,50 200,80 188,110 Z" fill="${PINK}" stroke="${INK}" stroke-width="3"/><circle cx="180" cy="122" r="16" fill="${RED}" stroke="${INK}" stroke-width="3.5"/><circle cx="175" cy="117" r="5" fill="#fff" opacity=".7"/>`;
};
function kingInner() { return bustInner({ uniform: 'officer', beard: true, moustache: true, seed: 41 }) + cloakOver() + turbanOver(); }
// lector parisino con peluca (como Galland, otros colores)
function readerInner(seed, col) { return bustInner({ uniform: 'soldier', seed, moustache: seed % 2 === 0 }) + coatOver(col) + jabotOver() + wigOver(); }
// emú con peluca empolvada (viewBox 400x600)
function emuWigInner() { return emuFrontInner() + `<g transform="translate(-115,-150) scale(1.75)">${wigOver()}</g>`; }
/* ---------- cimitarra (viewBox 0 0 120 420, empuñadura abajo) ---------- */
function scimInner() {
  const bl = 'M54,330 C20,250 10,140 40,20 C70,90 90,200 70,330 Z';
  return cut(P(bl) + '<rect x="30" y="326" width="60" height="18" rx="6"/><rect x="50" y="340" width="20" height="70" rx="8"/>', 4, 6)
    + D(bl, '#E8E2D4', 4) + `<path d="M56,320 C34,240 28,150 44,46" stroke="#fff" stroke-width="5" fill="none" opacity=".8"/><path d="${bl}" fill="url(#hF)" opacity=".35"/>`
    + `<rect x="30" y="326" width="60" height="18" rx="6" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><rect x="50" y="340" width="20" height="70" rx="8" fill="#5a1f2a" stroke="${INK}" stroke-width="4"/><circle cx="60" cy="412" r="11" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>`;
}
/* ---------- reloj de arena (viewBox 0 0 200 320). Devuelve html con clases .sTop .sBot .sStr ---------- */
function hourInner() {
  return cut('<rect x="10" y="0" width="180" height="26" rx="8"/><rect x="10" y="294" width="180" height="26" rx="8"/><path d="M36,26 C36,120 92,140 92,160 C92,180 36,200 36,294 L164,294 C164,200 108,180 108,160 C108,140 164,120 164,26 Z"/>', 5, 6)
    + `<path d="M36,26 C36,120 92,140 92,160 C92,180 36,200 36,294 L164,294 C164,200 108,180 108,160 C108,140 164,120 164,26 Z" fill="rgba(255,255,255,.55)" stroke="${INK}" stroke-width="4"/>
    <clipPath id="hgT"><path d="M36,26 C36,120 92,140 92,160 L108,160 C108,140 164,120 164,26 Z"/></clipPath><clipPath id="hgB"><path d="M92,160 C92,180 36,200 36,294 L164,294 C164,200 108,180 108,160 Z"/></clipPath>
    <g clip-path="url(#hgT)"><rect class="sTop" x="20" y="60" width="160" height="110" fill="#E9C75C"/></g><g clip-path="url(#hgB)"><rect class="sBot" x="20" y="240" width="160" height="60" fill="#E9C75C"/></g>
    <path class="sStr" d="M100,160 V292" stroke="#E9C75C" stroke-width="5"/>
    <rect x="10" y="0" width="180" height="26" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><rect x="10" y="294" width="180" height="26" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><path d="M14,26 V294 M186,26 V294" stroke="${INK}" stroke-width="7"/>`;
}
/* ---------- luna creciente (viewBox -50 -50 100 100) ---------- */
const moonSvg = (col = '#FBF6EA') => `<svg viewBox="-50 -50 100 100" width="100%" height="100%" style="overflow:visible"><circle cx="0" cy="0" r="42" fill="${col}" stroke="${INK}" stroke-width="5"/><circle cx="22" cy="-14" r="36" fill="#3a3358"/><circle cx="-14" cy="14" r="6" fill="${INK}" opacity=".18"/></svg>`;
/* ---------- garabatos de escritura árabe (línea de derecha a izquierda) ---------- */
function arabLine(x0, x1, y, seed, sw = 3.4) {
  const r = rng(seed); let d = `M${x1},${y}`, dots = '';
  for (let x = x1; x > x0; x -= 22) { const h = 6 + r() * 10; d += ` q-6,${f1(-h)} -11,0 q-5,${f1(4 + r() * 6)} -11,0`; if (r() > 0.55) dots += `<circle cx="${f1(x - 10)}" cy="${f1(y - 18 - r() * 8)}" r="3.2" fill="${INK}"/>`; if (r() > 0.8) d += ` m0,0 l0,${f1(-22 - r() * 10)} m0,${f1(22 + r() * 10)} l0,0`; }
  return `<path d="${d}" stroke="${INK}" stroke-width="${sw}" fill="none" stroke-linecap="round" opacity=".75"/>${dots}`;
}
/* ---------- aguja con hilo (viewBox 0 0 60 220, punta abajo) ---------- */
const needleSvg = () => `<svg viewBox="0 0 60 220" width="60" height="220" style="overflow:visible"><path d="M30,214 L22,40 Q30,20 38,40 Z" fill="${METAL}" stroke="${INK}" stroke-width="4"/><ellipse cx="30" cy="46" rx="4" ry="10" fill="#fff" stroke="${INK}" stroke-width="2.5"/><path d="M30,214 L26,60" stroke="#fff" stroke-width="2" opacity=".7"/><path d="M30,40 C10,10 50,-10 60,-40" stroke="${RED}" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`;
/* ---------- pluma (viewBox 0 0 120 240, punta abajo-izquierda en 60,236) ---------- */
const quillSvg = (w = 140, h = 280) => `<svg viewBox="0 0 120 240" width="${w}" height="${h}" style="overflow:visible">${cut('<path d="M60,236 L52,150 C10,110 20,30 100,4 C96,60 90,120 68,150 Z"/>', 4, 6)}<path d="M60,236 L52,150 C10,110 20,30 100,4 C96,60 90,120 68,150 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/><path d="M60,232 C64,150 80,70 98,8" stroke="${INK}" stroke-width="3" fill="none"/><path d="M40,120 l16,6 M36,96 l20,6 M40,70 l18,6" stroke="${INK}" stroke-width="2"/></svg>`;
/* ---------- ladrón en silueta (viewBox 0 0 70 135) ---------- */
const thiefSil = (k = 0) => `<svg viewBox="0 0 70 135" width="100%" height="100%" style="overflow:visible"><g fill="#120c08"><path d="M18,30 C14,10 56,10 52,30 C60,24 62,14 50,8 C40,2 26,2 18,8 C8,14 10,24 18,30 Z"/><circle cx="35" cy="34" r="13"/><path d="M14,52 C18,44 52,44 56,52 L62,104 L50,104 L48,135 L22,135 L20,104 L8,104 Z"/>
 <path d="M${k % 2 ? 58 : 12},60 C${k % 2 ? 78 : -8},40 ${k % 2 ? 76 : -6},14 ${k % 2 ? 62 : 8},4" stroke="#120c08" stroke-width="6" fill="none" stroke-linecap="round"/><rect x="${k % 2 ? 50 : 6}" y="56" width="14" height="8" rx="3"/></g></svg>`;
/* ---------- parche cosido: papel con borde dentado; devuelve {wrap, inner, stitch(t0,t1,t), path} ---------- */
function mkPatch(pa, x, y, w, h, o = {}) {
  const wrap = box(pa, x, y, w, h, { zIndex: o.z || 20, transformOrigin: '50% 50%' });
  const pc = paperPiece(wrap, 0, 0, w, h, { seed: o.seed || 61, bg: o.bg || '#F6E7B8' });
  const inner = pc.inner;
  const sv = box(wrap, 0, 0, w, h, { zIndex: 5 });
  const m = 16, per = `M${m},${m} H${w - m} V${h - m} H${m} Z`, id = uid('pm');
  sv.innerHTML = `<svg width="${w}" height="${h}" style="overflow:visible"><defs><mask id="${id}" maskUnits="userSpaceOnUse" x="-20" y="-20" width="${w + 40}" height="${h + 40}"><path class="mk" d="${per}" pathLength="1" stroke="#fff" stroke-width="30" fill="none" stroke-dasharray="1 1" stroke-dashoffset="1"/></mask></defs>
    <g mask="url(#${id})"><path d="${per}" stroke="${o.thread || RED}" stroke-width="7" fill="none" stroke-dasharray="18 12" stroke-linecap="round"/></g><path class="pth" d="${per}" fill="none" stroke="none"/></svg>`;
  const mkp = sv.querySelector('.mk'), pth = sv.querySelector('.pth'); const L = pth.getTotalLength();
  const ndl = box(wrap, 0, 0, 60, 220, { zIndex: 6, transformOrigin: '30px 214px' }); ndl.innerHTML = needleSvg();
  const stitch = (t, t0, t1) => {
    const k = clamp((t - t0) / (t1 - t0)); mkp.setAttribute('stroke-dashoffset', f1((1 - k) * 1000) / 1000);
    const q = pth.getPointAtLength(L * k); const on = t > t0 - 0.1 && t < t1 + 0.15;
    set(ndl, { x: q.x - 30, y: q.y - 214 - Math.abs(Math.sin(t * 26)) * 26, r: 18 + Math.sin(t * 26) * 8, o: on ? 1 : 0 });
  };
  return { wrap, inner, stitch };
}
/* ---------- libro abierto ancho (pág. izq. con garabatos árabes o líneas; pág. dcha. con hueco con forma de Aladino) ---------- */
function openBook(pa, o = {}) {
  const lay = box(pa, 0, 0, 1080, 1920, { zIndex: o.z || 4, transformOrigin: '540px 900px' });
  const y0 = o.y || 640, h = o.h || 600;
  const lines = (x0, x1, n, seed) => { let s = ''; for (let i = 0; i < n; i++) s += o.arab ? arabLine(x0, x1, y0 + 120 + i * 38, seed + i, 3) : `<path d="M${x0},${y0 + 110 + i * 34} H${i % 4 === 3 ? (x0 + x1) / 2 : x1}" stroke="${INK}" stroke-width="4" opacity=".5"/>`; return s; };
  lay.innerHTML = `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0">
   ${cut(`<rect x="100" y="${y0}" width="880" height="${h}" rx="16"/>`)}<rect x="100" y="${y0}" width="880" height="${h}" rx="16" fill="${o.cover || '#5a1f2a'}" stroke="${INK}" stroke-width="6"/>
   <path d="M122,${y0 + 14} H530 Q540,${y0 + 26} 550,${y0 + 14} H958 V${y0 + h - 14} H550 Q540,${y0 + h - 2} 530,${y0 + h - 14} H122 Z" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/>
   <rect x="122" y="${y0 + 14}" width="836" height="${h - 28}" fill="url(#hP)" opacity=".45"/>
   <path d="M540,${y0 + 20} V${y0 + h - 8}" stroke="${INK}" stroke-width="5"/><rect x="500" y="${y0 + 14}" width="40" height="${h - 28}" fill="url(#hA)" opacity=".25"/><rect x="540" y="${y0 + 14}" width="40" height="${h - 28}" fill="url(#hB)" opacity=".2"/>
   <path d="M160,${y0 + 44} h340 v44 h-340 Z" fill="none" stroke="${BRASS}" stroke-width="4"/>${lines(170, 500, o.nl || 12, 11)}
   ${o.noRight ? '' : `<path d="M580,${y0 + 44} h340 v44 h-340 Z" fill="none" stroke="${BRASS}" stroke-width="4"/>${o.holeR ? '' : lines(590, 920, o.nl || 12, 31)}`}</svg>`;
  return lay;
}
/* hueco con forma de Aladino (silueta oscura con borde de papel rasgado) en (x,y,w) */
function aladHole(pa, x, y, w, z = 5) {
  const h = w * 460 / 260;
  const wrap = box(pa, x, y, w, h, { zIndex: z });
  const edge = mk(wrap, [-6, -6, w + 12, h + 12], aladInner(), '0 0 260 460', 'bust'); edge.d.style.filter = 'brightness(0) invert(1)';
  const hole = mk(wrap, [0, 0, w, h], aladInner(), '0 0 260 460', 'bust'); hole.d.style.filter = 'brightness(0)'; hole.d.style.opacity = 0.88;
  return wrap;
}
/* ---------- decorados: palacio de cúpulas en el desierto / ciudad con pagodas (1080x1920, horizonte ~1180) ---------- */
function palaceSvg() {
  let s = `<rect width="1080" height="1920" fill="#F2B45A"/><rect width="1080" height="1920" fill="url(#hP)" opacity=".25"/><circle cx="800" cy="560" r="130" fill="#FFE9A8" stroke="${INK}" stroke-width="5"/>`;
  const dome = (cx, by, r, col) => `<path d="M${cx - r},${by} C${cx - r},${by - r * 1.3} ${cx - 8},${by - r * 1.5} ${cx},${by - r * 2.1} C${cx + 8},${by - r * 1.5} ${cx + r},${by - r * 1.3} ${cx + r},${by} Z" fill="${col}" stroke="${INK}" stroke-width="5"/><path d="M${cx - r},${by} C${cx - r},${by - r * 1.3} ${cx - 8},${by - r * 1.5} ${cx},${by - r * 2.1}" fill="none" stroke="#fff" stroke-width="4" opacity=".5"/><circle cx="${cx}" cy="${by - r * 2.2}" r="8" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>`;
  const mina = (x, by, h) => `<rect x="${x - 22}" y="${by - h}" width="44" height="${h}" fill="#FBF0DC" stroke="${INK}" stroke-width="5"/><rect x="${x - 30}" y="${by - h * 0.7}" width="60" height="14" fill="${BRASS}" stroke="${INK}" stroke-width="4"/>` + dome(x, by - h, 26, '#3f7a8a');
  s += mina(170, 1060, 420) + mina(910, 1060, 420);
  s += `<rect x="250" y="760" width="580" height="300" fill="#FBF0DC" stroke="${INK}" stroke-width="6"/><rect x="250" y="760" width="580" height="300" fill="url(#hA)" opacity=".2"/>`;
  [330, 450, 630, 750].forEach(x => s += `<path d="M${x - 34},1060 V900 Q${x},840 ${x + 34},900 V1060 Z" fill="#3a2a1e" stroke="${INK}" stroke-width="4"/>`);
  s += `<path d="M500,1060 V860 Q540,800 580,860 V1060 Z" fill="#3a2a1e" stroke="${INK}" stroke-width="5"/>`;
  s += dome(540, 770, 170, '#3f7a8a') + dome(330, 770, 60, '#3f7a8a') + dome(750, 770, 60, '#3f7a8a');
  s += `<path d="M0,1100 Q200,1040 420,1090 Q640,1140 820,1080 Q960,1040 1080,1080 L1080,1920 L0,1920 Z" fill="#E7A24C" stroke="${INK}" stroke-width="5"/><path d="M0,1180 Q300,1120 560,1170 Q820,1220 1080,1160 L1080,1920 L0,1920 Z" fill="#D88E3C" stroke="${INK}" stroke-width="5"/><rect y="1100" width="1080" height="820" fill="url(#hB)" opacity=".18"/>`;
  return `<svg width="1080" height="1920" style="position:absolute;left:0;top:0">${s}</svg>`;
}
function chinaSvg() {
  let s = `<rect width="1080" height="1920" fill="#E9D9B8"/><rect width="1080" height="1920" fill="url(#hP)" opacity=".25"/><circle cx="820" cy="540" r="120" fill="${RED}" stroke="${INK}" stroke-width="5" opacity=".85"/>`;
  s += `<path d="M0,820 Q180,700 340,800 Q480,690 640,790 Q820,680 1080,800 L1080,1200 L0,1200 Z" fill="#9FB59A" stroke="${INK}" stroke-width="5"/><rect y="760" width="1080" height="440" fill="url(#hA)" opacity=".18"/>`;
  const roof = (cx, y, w) => `<path d="M${cx - w / 2 - 30},${y + 6} Q${cx - w / 2},${y + 10} ${cx - w / 2 + 20},${y - 26} L${cx + w / 2 - 20},${y - 26} Q${cx + w / 2},${y + 10} ${cx + w / 2 + 30},${y + 6} Q${cx},${y - 6} ${cx - w / 2 - 30},${y + 6} Z" fill="#3a2a1e" stroke="${INK}" stroke-width="4"/><path d="M${cx - w / 2 + 20},${y - 26} L${cx + w / 2 - 20},${y - 26}" stroke="${BRASS}" stroke-width="4"/>`;
  const pag = (cx, by, tiers, w0) => { let o = ''; for (let k = 0; k < tiers; k++) { const w = w0 - k * 22, y = by - k * 92; o += `<rect x="${cx - w / 2 + 14}" y="${y - 92}" width="${w - 28}" height="92" fill="${k % 2 ? '#C8102E' : '#B23A48'}" stroke="${INK}" stroke-width="4"/><path d="M${cx - 18},${y} V${y - 60} H${cx + 18} V${y} Z" fill="#3a2a1e" stroke="${INK}" stroke-width="3"/>` + roof(cx, y - 92, w); } return o + `<path d="M${cx},${by - tiers * 92 - 26} V${by - tiers * 92 - 100}" stroke="${INK}" stroke-width="6"/><circle cx="${cx}" cy="${by - tiers * 92 - 104}" r="10" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>`; };
  s += pag(200, 1110, 4, 220) + pag(880, 1110, 4, 220) + pag(540, 1110, 5, 300);
  s += `<path d="M300,1110 V960 H780 V1110" fill="none" stroke="${INK}" stroke-width="0"/>`;
  s += `<path d="M0,1110 H1080 V1920 H0 Z" fill="#CDB48A" stroke="${INK}" stroke-width="5"/><rect y="1110" width="1080" height="810" fill="url(#hB)" opacity=".2"/>`;
  s += `<path d="M60,700 Q540,800 1020,700" stroke="${INK}" stroke-width="4" fill="none"/>`;
  return `<svg width="1080" height="1920" style="position:absolute;left:0;top:0">${s}</svg>`;
}
/* farolillo chino (HTML box 70x110) */
const lanternSvg = () => `<svg viewBox="0 0 70 110" width="70" height="110" style="overflow:visible"><path d="M35,0 V14" stroke="${INK}" stroke-width="4"/><rect x="18" y="12" width="34" height="10" rx="3" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><ellipse cx="35" cy="52" rx="32" ry="32" fill="${RED}" stroke="${INK}" stroke-width="4"/><path d="M35,20 V84 M18,26 Q8,52 18,78 M52,26 Q62,52 52,78" stroke="${INK}" stroke-width="2.4" fill="none"/><ellipse cx="24" cy="44" rx="6" ry="12" fill="#fff" opacity=".35"/><rect x="18" y="82" width="34" height="10" rx="3" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><path d="M35,92 V110" stroke="${YEL}" stroke-width="5"/></svg>`;
/* ---------- carta boca abajo (HTML) ---------- */
function cardBack(pa, x, y, w, h, o = {}) {
  const e = box(pa, x, y, w, h, { zIndex: o.z || 10, background: '#3a2a1e', border: `7px solid ${INK}`, borderRadius: '34px', boxShadow: `12px 14px 0 ${SH}`, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,.07) 0 12px, transparent 12px 28px)' });
  box(e, 22, 22, w - 58, h - 58, { border: `4px dashed ${BRASS}`, borderRadius: '22px' });
  const qm = el('div', e, { left: '0', top: px(h / 2 - 150), width: px(w - 14), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(o.q || 260), lineHeight: '300px', color: YEL, textShadow: `6px 6px 0 ${INK}` }, '?');
  return { e, qm };
}
