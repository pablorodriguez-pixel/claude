/* Ep. 11 · escenas L0–L5 — TODOS los tiempos se derivan del texto con find() */
const F = (ph, from = 0) => find(ph, from);
const S = (ph, from = 0) => W[find(ph, from)].s;
const Se = (ph, from = 0) => W[find(ph, from)].e;
const LS = n => LINES[n].s, LE = n => LINES[n].e;
const K = {
  email: S('email'), servia: S('servia'), pesar: S('pesar trigo'), trigo: S('trigo'), trigoE: Se('trigo'),
  hablo: S('hablo'), arroba1: S('arroba', F('hablo')), yEs: S('y es espanola'), espanola: S('espanola'), espE: Se('espanola'),
  arroba3: S('arroba era'), medida: S('medida de peso'), peso: S('peso'), unos: S('unos once'), once: S('once kilos'), medio: S('medio'), medioE: Se('medio'),
  viene: S('viene del arabe'), arabe: S('arabe'), significa: S('significa'), cuarta: S('cuarta parte'), parteE: Se('parte'),
  mercaderes: S('mercaderes'), rapido: S('mas rapido'), abrev: S('abreviaban'), asi: S('asi'), una: S('una a con'), a: S('a con un rabito'), rabito: S('rabito'), alrededor: S('alrededor'), alrE: Se('alrededor'),
  registro: S('el registro'), antiguo: S('mas antiguo'), conoce: S('conoce'), espana5: S('espana es de'), mil1: S('mil cuatrocientos'), ochoE: Se('ocho'), en5: S('en aragon'), aragon: S('aragon'),
  arrobasT: S('arrobas de trigo'), trigo5: S('trigo', F('arrobas de trigo')), trigo5E: Se('trigo', F('arrobas de trigo')),
  sobrevivio: S('sobrevivio'), comercio: S('comercio'), llego: S('llego'), teclado: S('teclado'), maquinas: S('maquinas'), escribir: S('escribir'), escribirE: Se('escribir'),
  mil3: S('mil novecientos'), unoE: Se('uno ray'), ray: S('ray'), mando: S('mando'), primer: S('primer correo'), electE: Se('electronico'),
  necesitaba: S('necesitaba'), unSimb: S('un simbolo que nadie'), nadie: S('nadie'), usara: S('usara'), nombres: S('nombres'), yEligio: S('y eligio'), eligio: S('eligio'), arroba8: S('arroba', F('eligio')), arroba8E: Se('arroba', F('eligio')),
  ojo: S('ojo'), origen: S('origen'), discute: S('discute'), pero: S('pero en espana'), espana9: S('espana', F('pero en espana')), siglo: S('siglo quince'), quince: S('quince'), arroba9: S('arroba ya'), ya: S('ya pesaba'), pesaba: S('pesaba'), trigo9: S('trigo', F('pesaba')), trigo9E: Se('trigo', F('pesaba')),
  osea: S('o sea'), tu: S('tu correo'), correo10: S('correo lleva'), lleva: S('lleva dentro'), saco: S('saco'), once2: S('once', F('saco')), kilos2: S('kilos', F('saco')), kilos2E: Se('kilos', F('saco')),
  lo: S('lo sabias'), sabias: S('sabias'), si: S('si o no'), no: S('no', F('si o no') + 1), noE: Se('no', F('si o no') + 1),
  soy: S('soy tu vecino'), vecino: S('vecino'), yEsto: S('y esto no venia'), libro: S('libro'), libroE: Se('libro'),
};
// cortes de escena
const B = {
  A1: LS(2) - 0.12, D1: K.viene - 0.05, E1: LS(3) - 0.15, F1: K.abrev - 0.06, G1: LS(4) - 0.1,
  H1: K.mil1 - 0.12, I1: K.arrobasT - 0.06, J1: LS(5) - 0.06, M1: K.llego - 0.1,
  N1: LS(6) - 0.08, O1: K.necesitaba - 0.15, P1: K.yEligio - 0.05, Q1: LS(7) - 0.05, R1: K.pero - 0.08, S1: LS(8) - 0.1,
  T1: K.lleva - 0.08, U1: LS(9) - 0.08, W1: K.yEsto - 0.05,
};
B.B1 = B.A1; B.L1 = B.J1;
const DUR = W[W.length - 1].e + 0.6, LOOP0 = DUR - 0.4;

const jaT = (pa, x, y, txt = '¡JA!', sz = 84) => el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: px(sz), color: PINK, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}`, whiteSpace: 'nowrap', zIndex: 40 }, txt);
function bubble(pa, x, y, txt, o = {}) {
  return el('div', pa, { left: px(x), top: px(y), background: o.bg || '#fff', border: `5px solid ${INK}`, borderRadius: o.rad || '44px 44px 44px 10px', boxShadow: `7px 8px 0 ${SH}`, padding: o.pad || '6px 34px 12px', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(o.size || 72), lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: o.z || 30 }, txt);
}
const bigYear = (pa, y, from) => { const e = el('div', pa, { left: 0, top: px(y), width: '1080px', textAlign: 'center', fontFamily: 'Rye', fontSize: '190px', lineHeight: '200px', color: YEL, textShadow: `9px 9px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`, zIndex: 40 }, '' + from); e.dataset.v = from; return e; };
// el año se muestra directamente (sin contar: nunca enseña años que no dice el guion)
function setYear(e, t, t0, d, a, b) { if (+e.dataset.v !== b) { e.textContent = b; e.dataset.v = b; } }
const yearPop = (t, t0) => t < t0 ? 0 : lerp(1.9, 1, p(t, t0, 0.2, E.outCubic));
const sweat = (pa, x, y) => el('div', pa, { left: px(x), top: px(y), width: '26px', height: '38px', background: '#9ad0ff', border: `4px solid ${INK}`, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', zIndex: 30 });
const SPAIN_RIB = (pa, x, y, w, txt) => { const r = el('div', pa, { left: px(x), top: px(y), width: px(w), textAlign: 'center', background: `linear-gradient(${RED} 0 25%, ${YEL} 25% 75%, ${RED} 75%)`, color: INK, fontFamily: 'Rye', fontSize: '84px', lineHeight: '150px', height: '150px', border: `6px solid ${INK}`, boxShadow: `9px 10px 0 ${SH}`, zIndex: 45, whiteSpace: 'nowrap' }, txt); return r; };

/* ======================================================================
   A · GANCHO + REVELACIÓN (–1 → B.A1)  L0–L1
   portada desde el fotograma 1: símbolo misterioso borroso sobre la balanza vs. trigo, rótulo enorme + sello
   ====================================================================== */
headline(K.servia - 0.06, K.hablo - 0.1, '…servía para *pesar trigo*', { size: 92, hlT: K.pesar, y: 214 });
headline(K.hablo - 0.1, K.yEs - 0.08, 'Hablo de la *arroba*', { size: 104, hlT: K.arroba1, y: 214 });
headline(K.yEs - 0.08, B.A1, 'Y es *española*', { size: 112, hlT: K.espanola, y: 214 });
{
  const REV = K.arroba1;
  const c = scene(-1, B.A1, t => {
    set(cam, { s: 1.0 + 0.05 * p(t, 0, REV, E.linear) });
    set(ry, { r: t * 8 });
    // título de portada (fotograma 1) → sale cuando entra el titular normal
    const kt = p(t, K.servia - 0.3, 0.2, E.inCubic);
    set(title, { o: 1 - kt, y: -kt * 40, s: 1 + wobble(t, 0.6, 0.01) });
    // balanza: inclinada al trigo, al decir «pesar» se equilibra
    const a = t < K.pesar ? 7 + wobble(t, 0.5, 1.2) : damp(t, K.pesar, 7, 0, 1.6, 2.4);
    BAL.setA(a);
    const out = p(t, REV - 0.08, 0.3, E.inCubic);
    set(BAL.root, { y: out * 900, o: 1 - out });
    // símbolo borroso
    const blur = 9 + Math.sin(t * 5) * 2;
    atM.style.filter = `blur(${f1(blur)}px)`;
    set(atM, { y: wobble(t, 0.8, 4), r: wobble(t, 0.5, 3) });
    set(qm, { s: 1 + 0.08 * Math.abs(Math.sin(t * 4)), r: 8 + wobble(t, 0.7, 4), o: 1 - out });
    // sobre del email
    set(env, { s: t < K.email ? 0 : pop(t, K.email, 0.4), r: -12 + wobble(t, 0.8, 4), y: wobble(t, 0.9, 6), o: t < K.email ? 0 : 1 - out });
    // sello de portada: visible desde el fotograma 1, re-golpe en «trigo»
    const kS = t < K.trigo ? 1 : lerp(1.5, 1, p(t, K.trigo, 0.18, E.outCubic));
    set(stp, { s: kS * (1 - p(t, REV - 0.2, 0.2, E.inCubic)), r: -7, o: 1 - p(t, REV - 0.2, 0.2) });
    // revelación
    const kr = p(t, REV, 0.45, E.outBack);
    set(at, { s: t < REV ? 0 : lerp(0.3, 1, kr) + wobble(t, 0.6, 0.015), r: lerp(-30, -4, kr) + wobble(t, 0.4, 2), o: t < REV ? 0 : 1 });
    set(flash, { o: t > REV - 0.02 && t < REV + 0.3 ? 1 - p(t, REV, 0.3) : 0 });
    set(rib, { s: pop(t, K.yEs, 0.4), r: -3, o: t < K.yEs ? 0 : 1 });
    stampA(dr, t, K.espanola + 0.15, -8);
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: '#F1E5CB' });
  const ry = rays(cam, -170, 70, 1420, 26, 'rgba(255,230,0,.45)', 'rgba(0,0,0,0)', 0);
  const title = el('div', c, { left: '40px', top: '170px', width: '1000px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '104px', lineHeight: 1.0, color: INK, zIndex: 60, textShadow: `5px 5px 0 #fff` }, 'El símbolo<br>de tu <i style="position:relative;z-index:0">email…<span style="position:absolute;left:-8px;right:-8px;bottom:6%;height:40%;background:' + YEL + ';z-index:-1;border-radius:4px 12px 6px 14px"></span></i>');
  const BAL = mkBalance(cam, 540, 600, 640, { drop: 250, wP: 300, postH: 470, z: 5 });
  const atM = box(BAL.L.cont, -40, -400, 380, 418, { zIndex: 3 });
  atM.innerHTML = `<svg viewBox="0 0 400 440" width="100%" height="100%" style="overflow:visible">${atGlyph(200, 330, 400, { fill: '#fff' })}</svg>`;
  const qm = el('div', BAL.L.cont, { left: '210px', top: '-400px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '170px', color: PINK, textShadow: `6px 6px 0 ${INK}, -3px -3px 0 ${INK}`, zIndex: 5 }, '?');
  const s1 = mkSack(BAL.R.cont, [-6, -232, 190, 222]), s2 = mkSack(BAL.R.cont, [130, -246, 200, 233]);
  s1.d.style.zIndex = 2; s2.d.style.zIndex = 3;
  const env = box(cam, 70, 470, 210, 140, { zIndex: 20 }); env.innerHTML = svgW(envInner(), '0 0 300 200');
  const stp = stamp(c, 110, 1110, '= TRIGO', { size: 170, bw: 16, z: 70, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
  const at = bigAt(c, 250, 370, 580, { z: 50, fill: '#fff', hatch: 0.35 });
  const rib = SPAIN_RIB(c, 120, 990, 840, '¡ESPAÑOLA!');
  const dr = stamp(c, 200, 1160, 'DATO REAL', { size: 120, bw: 15, z: 80, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const flash = box(c, 0, 0, 1080, 1920, { background: '#fff', zIndex: 90 });
}

/* ======================================================================
   D · MEDIDA DE PESO: BÁSCULA (B.B1 → B.D1)  L3a
   ====================================================================== */
headline(B.B1, K.unos - 0.08, 'La arroba era una *medida de peso*', { size: 80, hlT: K.medida });
headline(K.unos - 0.08, B.D1, 'Unos *once kilos y medio*', { size: 92, hlT: K.once });
{
  const c = scene(B.B1, B.D1, t => {
    set(cam, { s: 1 + 0.05 * p(t, B.B1, B.D1 - B.B1, E.linear) });
    const kd = p(t, K.arroba3, 0.4, E.outBounce);
    set(sk.d, { y: lerp(-900, 0, kd), r: lerp(-14, 0, kd) + (t > K.arroba3 + 0.4 ? wobble(t, 0.5, 1) : 0), o: t < K.arroba3 - 0.05 ? 0 : 1 });
    const squash = t > K.arroba3 + 0.25 ? 1 - 0.06 * Math.exp(-(t - K.arroba3 - 0.25) * 8) * Math.cos((t - K.arroba3 - 0.25) * 30) : 1;
    set(scl.d, { sy: squash });
    let v = 0;
    if (t > K.arroba3 + 0.3) { const dt = t - K.arroba3 - 0.3; v = 6 - 6 * Math.exp(-dt * 5) * Math.cos(dt * 8); }
    if (t > K.unos) v = lerp(v, 11.5, E.outBack(clamp((t - K.unos) / 0.9)));
    needle.setAttribute('transform', `rotate(${f1(-135 + v / 20 * 270)} 300 300)`);
    cnt.textContent = '≈ ' + fmt(11.5, 1) + ' kg';
    set(cntW, { s: yearPop(t, K.once) * (1 + (t > K.medio + 0.2 ? 0.12 * (1 - p(t, K.medio + 0.2, 0.35)) : 0)), r: -3, o: t < K.once ? 0 : 1 });
    cntW.style.background = t > K.medio + 0.2 ? YEL : '#fff';
    popA(ch1, t, K.peso, { r: -4 });
    set(arr, { o: t > K.medio + 0.2 ? 1 : 0 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '640px 900px' });
  sceneBg(cam, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  halftone(cam, 'rgba(43,33,24,.06)', 0);
  const scl = mk(cam, [400, 430, 560, 840], scaleInner(), '0 0 600 900', 'scale'); scl.d.style.zIndex = 3; scl.d.style.transformOrigin = '280px 840px';
  const needle = scl.d.querySelector('.needle');
  const sk = mkSack(cam, [545, 900, 270, 315], '1 @', { fs: 58 }); sk.d.style.zIndex = 5;
  const cntW = box(c, 60, 470, 420, 150, { background: '#fff', border: `6px solid ${INK}`, borderRadius: '24px', boxShadow: `9px 10px 0 ${INK}`, zIndex: 30 });
  const cnt = el('div', cntW, { left: 0, top: '14px', width: '408px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '92px', lineHeight: 1.1, color: INK, whiteSpace: 'nowrap' }, '≈ 0 kg');
  const arr = box(c, 0, 0, 1080, 1920, { zIndex: 29 }); arr.innerHTML = arrowSvg('M380,640 Q470,720 560,690', PINK, 10);
  const ch1 = chip(c, 70, 860, 'medida de peso', { size: 46, bg: INK, color: YEL, z: 30 });
}

/* ======================================================================
   E · DEL ÁRABE: «LA CUARTA PARTE» (B.D1 → B.E1)  L3b
   ====================================================================== */
headline(B.D1, K.significa - 0.12, 'Viene del *árabe*', { size: 104, hlT: K.arabe });
headline(K.significa - 0.12, B.E1, 'Significa *la cuarta parte*', { size: 92, hlT: K.cuarta });
{
  const c = scene(B.D1, B.E1, t => {
    set(card.wrap, { y: (1 - p(t, B.D1 + 0.02, 0.4, E.outBack)) * -600, r: -1.5 + wobble(t, 0.4, 0.4) });
    popA(w1, t, K.arabe, { r: -3 });
    set(ar1, { o: t > K.significa ? 1 : 0, sx: p(t, K.significa, 0.25), x: 0 });
    popA(w2, t, K.significa + 0.15, { r: 2 });
    set(pie.d, { s: pop(t, K.viene + 0.3, 0.5), r: t * 6, o: t < K.viene + 0.3 ? 0 : 1 });
    const kq = p(t, K.cuarta, 0.35, E.outBack);
    q0.setAttribute('transform', `translate(${f1(kq * 46)},${f1(-kq * 46)})`);
    q0f.setAttribute('fill', t > K.cuarta ? YEL : SACK);
    set(frac, { s: pop(t, K.cuarta + 0.15, 0.4), r: 8 + wobble(t, 0.7, 3), o: t < K.cuarta + 0.15 ? 0 : 1 });
    const others = t > K.cuarta ? 0.55 : 1; [1, 2, 3].forEach(i => qs[i].style.opacity = others);
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const card = paperPiece(c, 90, 420, 900, 240, { seed: 41, bg: '#FBF6EA' });
  const w1 = el('div', card.inner, { left: '30px', top: '58px', fontFamily: 'Rye', fontSize: '76px', color: INK, whiteSpace: 'nowrap' }, 'árabe');
  const ar1 = el('div', card.inner, { left: '262px', top: '40px', fontFamily: 'InterV', fontWeight: 800, fontSize: '96px', color: PINK, textShadow: `3px 3px 0 ${INK}`, transformOrigin: 'left center' }, '→');
  const w2 = el('div', card.inner, { left: '370px', top: '58px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '60px', color: INK, whiteSpace: 'nowrap' }, '«la cuarta parte»');
  const pie = mk(c, [380, 730, 500, 500], pieInner(), '0 0 500 500', 'pie'); pie.d.style.zIndex = 5;
  const qs = [0, 1, 2, 3].map(i => pie.d.querySelector('.qt' + i));
  const q0 = qs[0], q0f = q0.querySelector('.qf');
  const frac = el('div', c, { left: '760px', top: '640px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '120px', lineHeight: 1, color: '#fff', background: PINK, border: `6px solid ${INK}`, borderRadius: '30px', padding: '6px 26px 14px', boxShadow: `8px 8px 0 ${INK}`, zIndex: 20 }, '¼');
}

/* ======================================================================
   F · LOS MERCADERES ESCRIBEN DEPRISA (B.E1 → B.F1)  L4a
   ====================================================================== */
headline(B.E1, K.rapido - 0.3, 'Los *mercaderes*…', { size: 108, hlT: K.mercaderes });
headline(K.rapido - 0.3, B.F1, '…para ir *más rápido*', { size: 100, hlT: K.rapido });
{
  const LN = ['arroba de trigo', 'arroba de trigo', 'arroba de vino'];
  const c = scene(B.E1, B.F1, t => {
    const fast = t > K.rapido;
    const sp = fast ? 22 : 12;
    LT.forEach((e, i) => { const t0 = K.mercaderes + i * 0.48 * (fast ? 0.8 : 1); const n = clamp((t - t0) / 0.42) * LN[i].length | 0; e.textContent = LN[i].slice(0, n); });
    // pluma sobre la línea activa
    const li = clamp(Math.floor((t - K.mercaderes) / 0.45), 0, 2), lk = clamp(((t - K.mercaderes) % 0.45) / 0.42);
    set(qw, { x: lk * 380 + Math.sin(t * sp * 3) * 8, y: li * 76 + Math.cos(t * sp * 3) * 10, r: Math.sin(t * sp * 2) * 8, o: t < K.mercaderes - 0.1 ? 0 : 1 });
    face(m, t, { look: [-6, 7], brow: fast ? -8 : 0, jaw: 0, seed: 0.4 });
    set(m.d, { y: wobble(t, 0.7, 3) + (fast ? Math.sin(t * 30) * 3 : 0), r: fast ? Math.sin(t * 24) * 1.5 : 0, s: pop(t, B.E1, 0.4), o: 1 });
    sw1.forEach((s, i) => { const t0 = K.rapido + i * 0.18; set(s, { y: p(t, t0, 0.6) * 60, o: t > t0 ? 1 - p(t, t0 + 0.3, 0.3) : 0 }); });
    SL.forEach((s, i) => set(s, { o: fast ? 0.8 : 0, x: -((t * 900 + i * 160) % 300) }));
    popA(clk, t, K.rapido + 0.05, { r: -8 + Math.sin(t * 30) * 4 });
  });
  sceneBg(c, { background: '#E3D2AE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.07) 0 3px, transparent 3px 48px)' });
  const m = mk(c, [500, 400, 470, 600], merchantInner(13, 'hood'), '0 0 360 460', 'bust'); m.d.style.zIndex = 3;
  const led = paperPiece(c, 230, 880, 760, 330, { seed: 61, bg: '#FBF6EA' }); led.wrap.style.zIndex = 6; set(led.wrap, { r: -2 });
  el('div', led.inner, { left: '30px', top: '12px', fontFamily: 'Rye', fontSize: '36px', color: RED, whiteSpace: 'nowrap' }, 'LIBRO DE CUENTAS');
  const LT = LN.map((s, i) => el('div', led.inner, { left: '40px', top: px(66 + i * 76), fontFamily: 'Instrument', fontStyle: 'italic', fontSize: '68px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' }, ''));
  const qw = box(c, 300, 760, 120, 420, { zIndex: 8 }); qw.innerHTML = svgW(quillInner(), '0 0 120 420');
  const sw1 = [sweat(c, 590, 600), sweat(c, 900, 620), sweat(c, 620, 700)];
  const SL = [0, 1, 2, 3].map(i => box(c, 720 + i * 80, 960 + (i % 2) * 40, 160, 8, { background: INK, borderRadius: '4px', zIndex: 9 }));
  const clk = chip(c, 90, 520, '¡deprisa!', { size: 50, bg: PINK, z: 20 });
}

/* ======================================================================
   G · LA «a» CON RABITO → @ (B.F1 → B.G1)  L4b — el momento visual clave
   ====================================================================== */
headline(B.F1, K.una - 0.1, 'La *abreviaban* así:', { size: 96, hlT: K.abrev });
headline(K.una - 0.1, B.G1, 'Una *a* con un *rabito*', { size: 104, hlT: K.rabito });
{
  const AP = 'M372,244 C352,206 298,200 268,232 C234,268 240,338 280,352 C318,366 356,330 368,286 M376,214 L364,330 C360,360 384,374 412,358';
  const TP = 'M412,358 C468,322 486,236 444,176 C396,108 290,94 214,140 C136,188 120,300 162,370 C206,444 302,466 392,434 C424,422 446,404 458,390';
  const tA0 = K.a - 0.05, tA1 = K.a + 0.38, tT0 = K.rabito - 0.15, tT1 = K.alrE - 0.08;
  const DS = 1.2, LET = ['a', 'r', 'r', 'o', 'b', 'a'], ADV = [0.47, 0.37, 0.37, 0.47, 0.48, 0.47], FS = 220;
  const c = scene(B.F1, B.G1, t => {
    // palabra «arroba» escrita y luego abreviada
    LE_.forEach((q, i) => {
      const kw = p(t, B.F1 + 0.05 + i * 0.07, 0.15);
      if (i === 0) {
        const km = p(t, K.asi, 0.5, E.inOutCubic);
        set(q.e, { x: km * (540 - q.cx), y: km * 70, s: lerp(1, 1.95, km), o: kw * (1 - p(t, tA0 + 0.25, 0.15)) });
      } else {
        const kf = p(t, K.asi - 0.12 + i * 0.03, 0.55, E.inCubic);
        set(q.e, { x: kf * q.dx, y: kf * q.dy, r: kf * q.dr, o: kw * (1 - kf) });
      }
    });
    // trazo
    const ka = p(t, tA0, tA1 - tA0, E.inOutCubic), kt = p(t, tT0, tT1 - tT0, E.inOutCubic);
    [aP, aP2].forEach(e => e.style.strokeDashoffset = f1((1 - ka) * 1000) / 1000);
    [tP, tP2].forEach(e => e.style.strokeDashoffset = f1((1 - kt) * 1000) / 1000);
    // plumín sobre la punta
    let pt = null;
    if (t >= tA0 - 0.3 && t < tA1) pt = SA[Math.round(ka * (SA.length - 1))];
    else if (t >= tA1 && t < tT0) pt = SA[SA.length - 1];
    else if (t >= tT0 && t < tT1 + 0.25) pt = ST[Math.round(kt * (ST.length - 1))];
    if (pt) set(qw, { x: 540 + (pt[0] - 300) * DS - 18, y: 770 + (pt[1] - 300) * DS - 410, r: -8 + Math.sin(t * 20) * 3, o: 1 }); else set(qw, { o: 0 });
    const done = t > tT1;
    const kd = pop(t, tT1, 0.45);
    set(drawn, { s: DS * (done ? 1 + 0.08 * (kd > 0 ? Math.sin(clamp(kd) * Math.PI) : 0) : 1) });
    stars.forEach((s, i) => { const a = i / 6 * Math.PI * 2 + t; const k = p(t, tT1, 0.5); set(s, { x: Math.cos(a) * 330 * k, y: Math.sin(a) * 300 * k, s: k * (1 - p(t, tT1 + 0.5, 0.3)), r: t * 200, o: done ? 1 : 0 }); });
    popA(lblA, t, tA1 - 0.05, { r: -6 });
    popA(lblR, t, K.rabito + 0.1, { r: 5 });
    popA(eq, t, tT1 + 0.12, { r: -3 });
  }, { clip: true });
  sceneBg(c, { background: '#D9C7A6' });
  const parch = paperPiece(c, 50, 400, 980, 930, { seed: 77, bg: '#F4ECDA' });
  box(parch.inner, 0, 0, 962, 912, { backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 88px, rgba(43,33,24,.12) 88px 91px)' });
  let x = 540 - ADV.reduce((a, b) => a + b, 0) * FS / 2; const r = rng(91);
  const LE_ = LET.map((ch, i) => {
    const w = ADV[i] * FS, e = el('div', c, { left: px(x), top: '520px', width: px(w), textAlign: 'center', fontFamily: 'Instrument', fontStyle: 'italic', fontSize: px(FS), lineHeight: 1, color: INK, zIndex: 6 }, ch);
    const q = { e, cx: x + w / 2, dx: 200 + r() * 500, dy: -300 - r() * 400, dr: (r() - 0.5) * 300 }; x += w; return q;
  });
  const drawn = box(c, 240, 470, 600, 600, { zIndex: 8, transformOrigin: '300px 300px' });
  drawn.innerHTML = `<svg width="600" height="600" viewBox="0 0 600 600" style="overflow:visible">
   <g transform="translate(8,10)" opacity=".35"><path class="a2" d="${AP}" pathLength="1" stroke="${SH}" stroke-width="40" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 1"/><path class="t2" d="${TP}" pathLength="1" stroke="${SH}" stroke-width="40" fill="none" stroke-linecap="round" stroke-dasharray="1 1"/></g>
   <path class="a1" d="${AP}" pathLength="1" stroke="#2B1A10" stroke-width="34" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 1"/>
   <path class="t1" d="${TP}" pathLength="1" stroke="#2B1A10" stroke-width="34" fill="none" stroke-linecap="round" stroke-dasharray="1 1"/></svg>`;
  const aP = drawn.querySelector('.a1'), tP = drawn.querySelector('.t1'), aP2 = drawn.querySelector('.a2'), tP2 = drawn.querySelector('.t2');
  const samp = d => { const ps = document.createElementNS(NS, 'path'); ps.setAttribute('d', d); defsSvg.appendChild(ps); const L = ps.getTotalLength(), out = []; for (let i = 0; i <= 120; i++) { const q = ps.getPointAtLength(L * i / 120); out.push([q.x, q.y]); } return out; };
  // muestras del trazo en cada subtrayecto (para el plumín)
  const SA = samp(AP), ST = samp(TP);
  const qw = box(c, 0, 0, 120, 420, { zIndex: 12 }); qw.innerHTML = svgW(quillInner(), '0 0 120 420'); qw.style.transformOrigin = '18px 410px';
  const stars = []; for (let i = 0; i < 6; i++) stars.push(el('div', c, { left: '515px', top: '730px', fontSize: '64px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 14 }, '✦'));
  const lblA = chip(c, 110, 560, 'una «a»', { size: 50, bg: INK, color: YEL, z: 20 });
  const lblR = chip(c, 690, 1150, '+ rabito', { size: 50, bg: PINK, z: 20 });
  const eq = el('div', c, { left: '120px', top: '1100px', fontFamily: 'Rye', fontSize: '130px', color: RED, zIndex: 20, whiteSpace: 'nowrap', textShadow: '4px 4px 0 #fff' }, '= @');
}

/* ======================================================================
   H · EL REGISTRO MÁS ANTIGUO (B.G1 → B.H1)  L5a
   ====================================================================== */
headline(B.G1, K.conoce - 0.2, 'El registro *más antiguo*', { size: 84, hlT: K.antiguo });
headline(K.conoce - 0.2, B.H1, 'que se conoce en *España*', { size: 84, hlT: K.espana5 });
{
  const c = scene(B.G1, B.H1, t => {
    const kp = p(t, K.registro + 0.1, 0.5, E.outBack);
    set(doc.wrap, { x: lerp(260, 0, kp), y: lerp(-120, 0, kp), s: lerp(0.3, 1, kp), r: lerp(20, -3, kp), o: t < K.registro ? 0 : 1 });
    popA(med, t, K.antiguo + 0.1, { r: -10 + wobble(t, 0.8, 4) });
    popA(chE, t, K.espana5, { r: 3 });
    set(lens, { x: Math.sin(t * 2.2) * 90, y: Math.cos(t * 1.7) * 50, s: pop(t, K.antiguo - 0.2, 0.4), r: -6, o: t < K.antiguo - 0.2 ? 0 : 1 });
  });
  sceneBg(c, { background: '#DCCBA8' });
  const sh = box(c, 0, 0, 1080, 1920, { zIndex: 1 }); {
    let s = ''; const r = rng(31);
    for (let row = 0; row < 5; row++) for (let col = 0; col < 5; col++) {
      const x = 90 + col * 180, y = 400 + row * 150;
      s += `<rect x="${x}" y="${y}" width="170" height="140" fill="#5a4030" stroke="${INK}" stroke-width="5"/>`;
      for (let k = 0; k < 3; k++) { const cx = x + 40 + k * 46 + (r() - 0.5) * 8, cy = y + 90 - (k % 2) * 30; s += `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(22 + r() * 6)}" fill="#F4ECDA" stroke="${INK}" stroke-width="3"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="7" fill="none" stroke="${INK}" stroke-width="2"/>`; }
    }
    sh.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><rect x="70" y="460" width="940" height="740" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><rect x="70" y="460" width="940" height="740" fill="url(#hW)" opacity=".3"/>${s}</svg>`;
  }
  box(c, 0, 0, 1080, 1920, { background: 'rgba(43,33,24,.35)', zIndex: 2 });
  const doc = paperPiece(c, 330, 520, 560, 620, { seed: 13, bg: '#F4E7C8' }); doc.wrap.style.zIndex = 5;
  el('div', doc.inner, { left: 0, top: '30px', width: '542px', textAlign: 'center', fontFamily: 'Rye', fontSize: '44px', color: INK }, 'REGISTRO');
  { let l = ''; const r = rng(5); for (let y = 110; y < 580; y += 46) l += `<path d="M40,${y} q${f1(80 + r() * 40)},-10 ${f1(200 + r() * 80)},0 t${f1(140 + r() * 40)},0" stroke="${INK}" stroke-width="5" fill="none" opacity=".45"/>`; box(doc.inner, 0, 0, 542, 602).innerHTML = `<svg width="542" height="602">${l}</svg>`; }
  const med = el('div', c, { left: '640px', top: '470px', width: '260px', height: '260px', borderRadius: '50%', background: RED, border: `7px solid ${INK}`, boxShadow: `8px 8px 0 ${INK}`, textAlign: 'center', fontFamily: 'Rye', fontSize: '42px', lineHeight: '1.05', color: '#fff', paddingTop: '62px', zIndex: 20 }, 'EL MÁS<br>ANTIGUO');
  const chE = chip(c, 380, 1170, 'en España', { size: 54, bg: INK, color: YEL, z: 30 });
  const lens = box(c, 420, 700, 300, 300, { zIndex: 15 });
  lens.innerHTML = `<svg width="300" height="400" style="overflow:visible;position:absolute;left:0;top:0"><path d="M246,246 L330,350" stroke="${INK}" stroke-width="36" stroke-linecap="round"/><path d="M246,246 L330,350" stroke="${WOOD}" stroke-width="24" stroke-linecap="round"/><circle cx="150" cy="150" r="146" fill="${INK}"/><circle cx="150" cy="150" r="138" fill="${BRASS}"/><circle cx="150" cy="150" r="124" fill="rgba(255,255,255,.25)" stroke="${INK}" stroke-width="4"/><ellipse cx="100" cy="90" rx="44" ry="20" fill="#fff" opacity=".55" transform="rotate(-30 100 90)"/></svg>`;
}

/* ======================================================================
   I · 1448 · ARAGÓN (B.H1 → B.I1)  L5b
   ====================================================================== */
headline(K.en5 - 0.05, B.I1, 'en *Aragón*', { size: 120, hlT: K.aragon, y: 200 });
{
  const c = scene(B.H1, B.I1, t => {
    setYear(yr, t, K.mil1, K.ochoE - K.mil1, 1400, 1448);
    const up = p(t, K.en5 - 0.15, 0.3, E.inOutCubic);
    set(yr, { s: yearPop(t, K.mil1) * lerp(1, 0.62, up) * (1 + (t > K.ochoE ? 0.14 * (1 - p(t, K.ochoE, 0.3)) : 0)), x: up * -300, y: up * 60, o: t < K.mil1 ? 0 : 1 });
    yr.style.color = t > K.ochoE ? YEL : '#fff';
    set(map.d, { s: lerp(0.9, 1, p(t, B.H1, 0.5, E.outBack)), y: wobble(t, 0.4, 3), r: -2 });
    const ka = p(t, K.aragon, 0.3);
    ara.style.fillOpacity = ka; ara.style.strokeOpacity = 0.2 + ka * 0.8;
    set(pin, { s: pop(t, K.aragon + 0.05, 0.4), y: (1 - p(t, K.aragon + 0.05, 0.3, E.outBounce)) * -120, o: t < K.aragon ? 0 : 1 });
    popA(chA, t, K.aragon + 0.2, { r: -4 });
  });
  sceneBg(c, { background: '#9FC3CC', backgroundImage: 'repeating-linear-gradient(170deg, rgba(43,33,24,.10) 0 3px, transparent 3px 34px)' });
  const map = mk(c, [110, 600, 900, 685], spainInner(), '0 0 920 700', 'map'); map.d.style.zIndex = 3;
  const ara = map.d.querySelector('.ara');
  const yr = bigYear(c, 380, 1400);
  const [ax, ay] = esPj(-0.6, 41.5); const pxA = 110 + ax * 900 / 920, pyA = 600 + ay * 685 / 700;
  const pin = el('div', c, { left: px(pxA - 34), top: px(pyA - 96), width: '68px', height: '96px', zIndex: 20 }, `<svg viewBox="0 0 68 96" width="68" height="96" style="overflow:visible"><path d="M34,94 C10,60 2,44 2,32 A32,32 0 1,1 66,32 C66,44 58,60 34,94 Z" fill="${RED}" stroke="${INK}" stroke-width="5"/><circle cx="34" cy="32" r="12" fill="#fff" stroke="${INK}" stroke-width="4"/></svg>`);
  const chA = chip(c, pxA - 420, pyA - 170, 'Aragón · 1448', { size: 46, bg: INK, color: YEL, z: 25 });
}
