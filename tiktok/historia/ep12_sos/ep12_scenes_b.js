/* Ep. 12 · escenas L5–L11 + tarjeta final */
const tri = (n, k) => S(n) + (SE(n) - S(n)) * (k + 0.15) / 3; // 3 golpes repartidos dentro de la palabra
function cabinBg(c) {
  sceneBg(c, { background: '#B98B5A', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.35) 0 4px, transparent 4px 150px), repeating-linear-gradient(90deg, rgba(43,33,24,.12) 0 2px, transparent 2px 13px)' });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 35%, rgba(255,230,170,.45), rgba(40,20,0,.25) 75%)' });
}
function porthole(pa, x, y, sz, tilt = 0) {
  const d = box(pa, x, y, sz, sz, { zIndex: 2 });
  const inner = box(d, sz * 0.14, sz * 0.14, sz * 0.72, sz * 0.72, { borderRadius: '50%', overflow: 'hidden', background: '#d9e2dc' });
  const sea = box(inner, -sz * 0.4, sz * 0.36, sz * 1.6, sz, { background: SEA, borderTop: `5px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 12px, rgba(43,33,24,.45) 12px 14px)' });
  sea.style.transform = `rotate(${tilt}deg)`;
  const fr = box(d, 0, 0, sz, sz); fr.innerHTML = `<svg viewBox="0 0 200 200" width="${sz}" height="${sz}" style="overflow:visible">${cut('<circle cx="100" cy="100" r="96"/>', 5, 7).replace(/fill="#fff"/, 'fill="none"')}<circle cx="100" cy="100" r="86" fill="none" stroke="${INK}" stroke-width="26"/><circle cx="100" cy="100" r="86" fill="none" stroke="${BRASS}" stroke-width="18"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(k => `<circle cx="${f1(100 + Math.cos(k * 0.785) * 86)}" cy="${f1(100 + Math.sin(k * 0.785) * 86)}" r="5" fill="${INK}"/>`).join('')}</svg>`;
  return { d, sea };
}

/* ======================================================================
   G1 · ¿POR QUÉ ESAS LETRAS? POR CÓMO SUENAN (T_G1 – tres)  L5a
   ====================================================================== */
headline(T_G1, S('como') - 0.25, '¿Por qué *esas letras*?', { size: 88 });
headline(S('como') - 0.25, T_G2, 'Por cómo *suenan*', { size: 110, hlT: S('suenan') });
{
  const c = scene(T_G1, T_G2, t => {
    const ku = p(t, S('como') - 0.2, 0.4, E.inOutCubic);
    LT.forEach((l, i) => { const t0 = T_G1 + 0.05 + i * 0.12; set(l, { s: pop(t, t0, 0.4) * lerp(1, 0.55, ku), y: -ku * 120 + wobble(t, 0.7, 6, i * 0.3), x: (i - 1) * -ku * 120, r: [-6, 3, 7][i] + (t < S('como') ? Math.sin(t * 6 + i) * 3 : 0), o: t < t0 ? 0 : 1 }); });
    QS.forEach((q, i) => { const t0 = S('letras') + i * 0.12; set(q, { s: pop(t, t0, 0.3) * (1 - ku), r: Math.sin(t * 5 + i) * 10, o: t < t0 ? 0 : 1 }); });
    const ko = p(t, S('como') - 0.1, 0.45, E.outBack); set(op.d, { y: (1 - ko) * 700 + wobble(t, 0.6, 3), o: t < S('como') - 0.1 ? 0 : 1 });
    face(op, t, { look: [5, -3], closed: t > S('suenan') && t < S('suenan') + 0.5, brow: t > S('suenan') ? -6 : 0, seed: 1.1 });
    WV.forEach((w, i) => { const ph = ((t - S('como')) * 1.8 - i * 0.22); const k = ph - Math.floor(ph); w.style.opacity = t > S('como') && ph > 0 ? 1 - k : 0; set(w, { s: 0.6 + k * 0.7 }); });
    BP.forEach((b, i) => popA(b, t, S('suenan') + i * 0.22, { r: [-8, 6][i] }));
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  const LT = ['S', 'O', 'S'].map((ch, i) => miniSort(c, 150 + i * 280, 500, ch, { w: 220, h: 300, fs: 210, z: 10 }));
  LT.forEach(l => (l.style.lineHeight = '270px'));
  const QS = [qMark(c, 90, 400, 130), qMark(c, 860, 420, 150, YEL), qMark(c, 480, 860, 120)];
  const op = mk(c, [300, 720, 440, 562], operatorInner(71), '0 0 360 460', 'bust'); op.d.style.zIndex = 12;
  const WV = [0, 1, 2].map(i => { const w = box(c, 720, 690, 260, 300, { zIndex: 13, transformOrigin: '0% 50%' }); w.innerHTML = `<svg width="260" height="300" style="overflow:visible"><path d="M20,40 Q120,150 20,260" stroke="${INK}" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M20,40 Q120,150 20,260" stroke="${PINK}" stroke-width="9" fill="none" stroke-linecap="round"/></svg>`; return w; });
  const BP = [bubble(c, 700, 600, '¡bip!', { size: 66, z: 14 }), bubble(c, 120, 640, '¡biiip!', { size: 66, z: 14, rad: '44px 44px 10px 44px' })];
}

/* ======================================================================
   G2 · ··· −−− ··· GIGANTE AL RITMO DE LA VOZ (T_G2 – imposible)  L5b
   ====================================================================== */
headline(T_G2, T_G3, 'Tres *puntos*, tres *rayas*, tres *puntos*', { size: 74, color: '#FBF6EA', hlc: RED });
const MORSE_T = [0, 1, 2].map(k => tri('pA', k)).concat([0, 1, 2].map(k => tri('rB', k)), [0, 1, 2].map(k => tri('pC', k)));
{
  const c = scene(T_G2, T_G3, t => {
    tp.syms.forEach((s, i) => { const t0 = MORSE_T[i]; set(s, { s: t < t0 ? 0 : lerp(1.7, 1, p(t, t0, 0.14, E.outCubic)), o: t < t0 ? 0 : 1 }); s.style.background = t >= t0 && t < t0 + 0.18 ? YEL : RED; });
    LB.forEach((l, i) => { const t0 = MORSE_T[i * 3 + 2] + 0.06; set(l, { s: pop(t, t0, 0.35), o: t < t0 ? 0 : 1, r: [-5, 3, 6][i] }); });
    set(tp.wrap, { s: 1 + 0.03 * Math.sin(t * 4) });
    set(lamp, { o: MORSE_T.some((t0, i) => t >= t0 && t < t0 + (i >= 3 && i < 6 ? 0.22 : 0.1)) ? 1 : 0.15 });
  }, { cut: true });
  sceneBg(c, { background: '#2B2118', backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,.04) 0 2px, transparent 2px 18px)' });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 42%, rgba(255,230,0,.18), rgba(0,0,0,0) 55%)' });
  const lamp = box(c, 470, 470, 140, 140, { borderRadius: '50%', background: YEL, border: `8px solid ${BRASS}`, boxShadow: `0 0 60px 20px rgba(255,230,0,.6)`, zIndex: 3 });
  const tp = tape(c, 50, 690, '··· −−− ···', { u: 40, h: 120, w: 980, z: 6, bg: '#FBF6EA' });
  // centrar los grupos en la cinta
  const LB = ['S', 'O', 'S'].map((ch, i) => el('div', c, { left: px([118, 492, 868][i] - 60), top: '830px', width: '120px', textAlign: 'center', fontFamily: 'Rye', fontSize: '170px', lineHeight: 1, color: YEL, textShadow: `6px 6px 0 #000`, zIndex: 8 }, ch));
  ['S = ···', 'O = −−−', 'S = ···'].forEach((s, i) => { const e = chip(c, [50, 400, 760][i], 560, s, { size: 44, bg: '#FBF6EA', color: INK, z: 9 }); e.style.fontFamily = 'InterV'; e.style.fontWeight = 900; LB.push(e); });
}

/* ======================================================================
   G3 · IMPOSIBLE DE CONFUNDIR (T_G3 – aunque)  L5c
   ====================================================================== */
headline(T_G3, T_G4, 'Imposible de *confundir*', { size: 100, hlT: S('confundir') });
{
  const ROWS = [];
  const c = scene(T_G3, T_G4, t => {
    ROWS.forEach((r, i) => { const t0 = T_G3 + 0.05 + i * 0.1; set(r.tp.wrap, { x: (1 - p(t, t0, 0.3, E.outBack)) * (i % 2 ? 900 : -900), o: r.ok ? 1 : 1 - 0.5 * p(t, S('confundir'), 0.3) }); if (r.m) popA(r.m, t, r.ok ? S('confundir') + 0.1 : S('imposible') + 0.15 + i * 0.15, { r: -6 }); });
    stampA(st, t, S('confundir') + 0.55, -6);
    set(okRow, { s: 1 + (t > S('confundir') + 0.1 ? 0.06 * Math.abs(Math.sin(t * 6)) : 0) });
  });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  [['−·−· ·−− ·', 440], ['·−−· −· −·', 590], ['··· −−− ···', 740, true], ['−−·· ·−· −', 890]].forEach(([code, y, ok], i) => {
    const tp = tape(c, ok ? 160 : 200, y, code, { u: 28, z: 6, bg: ok ? YEL : '#FBF6EA' });
    const m = box(c, 860, y - 10, 110, 110, { zIndex: 10 }); m.innerHTML = ok ? CHECK : XSVG;
    ROWS.push({ tp, m, ok });
  });
  const okRow = ROWS[2].tp.wrap;
  const st = stamp(c, 150, 600, '¡INCONFUNDIBLE!', { size: 72, bw: 11, z: 30, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
}

/* ======================================================================
   G4 · AUNQUE ESTÉS MUERTO DE MIEDO (T_G4 – lo de)  L5d
   ====================================================================== */
headline(T_G4, T_I, 'aunque estés *muerto de miedo*', { size: 86, hlT: S('muerto') });
{
  const c = scene(T_G4, T_I, t => {
    const fear = p(t, T_G4, 0.4);
    const tr = Math.sin(t * 47) * 6 * fear;
    set(cam, { r: Math.sin(t * 1.6) * 3, s: 1.03 });
    ph.sea.style.transform = `rotate(${f1(-14 + Math.sin(t * 1.6) * 8)}deg)`;
    set(op.d, { x: tr * 0.6, y: wobble(t, 0.5, 2) });
    face(op, t, { look: t > S('muerto') ? [0, 0] : [-4, 3], jaw: 0.15 + Math.abs(Math.sin(t * 30)) * 0.25, brow: t > S('muerto') ? -12 : -6, blink: false, seed: 2 });
    DR.forEach((d, i) => { const ph2 = ((t - T_G4) * 1.4 + i * 0.33) % 1; set(d, { y: ph2 * 140, o: t > T_G4 + 0.1 ? 1 - ph2 : 0, s: 0.8 + ph2 * 0.4 }); });
    // mano temblorosa que pulsa ··· −−− ···
    let down = 0; tp.syms.forEach((s, i) => { const t0 = T_G4 + 0.25 + i * 0.16; set(s, { o: t >= t0 ? 1 : 0 }); if (t >= t0 && t < t0 + 0.08) down = 1; });
    key.lever.setAttribute('transform', `rotate(${down ? -4 : 0} ${KEY_PIV[0]} ${KEY_PIV[1]})`);
    set(hand, { x: tr, y: (down ? 16 : 0) + Math.cos(t * 41) * 4 * fear, r: Math.sin(t * 39) * 4 });
    popA(okc, t, T_G4 + 0.25 + 9 * 0.16, { r: -4 });
    set(fearT, { s: pop(t, S('miedo'), 0.3), o: t < S('miedo') ? 0 : 1, r: -6 + Math.sin(t * 40) * 2 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  cabinBg(cam);
  const ph = porthole(cam, 80, 430, 250, -14);
  const op = mk(cam, [440, 470, 420, 537], operatorInner(72), '0 0 360 460', 'bust'); op.d.style.zIndex = 4;
  const DR = [[540, 600], [790, 590], [560, 720]].map(q => box(cam, q[0], q[1], 40, 60, { zIndex: 6 }, DROP));
  const desk = box(cam, 0, 0, 1080, 1920, { zIndex: 5 }); desk.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${cut('<rect x="0" y="1020" width="1080" height="260"/>')}<rect x="-10" y="1020" width="1100" height="260" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><rect x="-10" y="1020" width="1100" height="260" fill="url(#hW)" opacity=".35"/><rect x="-10" y="1020" width="1100" height="26" fill="#8b5a3a" stroke="${INK}" stroke-width="4"/></svg>`;
  const key = mk(cam, [360, 860, 560, 280], keyInner(), '0 0 640 320', 'key'); key.d.style.zIndex = 7; key.lever = key.d.querySelector('.lever');
  const hand = box(cam, 362, 760, 180, 220, { zIndex: 8 }); hand.innerHTML = `<svg width="180" height="220" style="overflow:visible">${gloveHand(70, 150, 170, 1.2)}</svg>`;
  const tp = tape(cam, 330, 1150, '··· −−− ···', { u: 24, z: 9 });
  const okc = chip(cam, 680, 1170, 'sale igual ✓', { size: 36, bg: PINK, z: 10 });
  const fearT = el('div', cam, { left: '760px', top: '470px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '80px', color: PINK, textShadow: `4px 4px 0 ${INK}`, zIndex: 9 }, '¡glups!');
}

/* ======================================================================
   H1 · «SAVE OUR SOULS» + PARCHE «SALVAD NUESTRAS ALMAS» (T_H1 – se lo)  L6a
   ====================================================================== */
headline(T_H1, S('salvad') - 0.1, 'Lo de *Save Our Souls*', { size: 92, hlT: S('save6') });
headline(S('salvad') - 0.1, T_H2, 'salvad nuestras *almas*', { size: 96, hlT: S('almas') });
function sosCard(c) {
  const pp = paperPiece(c, 160, 450, 760, 520, { seed: 41, bg: '#FBF6EA' });
  el('div', pp.inner, { left: '0', top: '30px', width: '742px', textAlign: 'center', fontFamily: 'Rye', fontSize: '250px', lineHeight: 1, color: INK }, 'SOS');
  el('div', pp.inner, { left: '0', top: '330px', width: '742px', textAlign: 'center', fontFamily: 'InterV', fontWeight: 900, fontSize: '76px', letterSpacing: '6px', color: RED }, '··· −−− ···');
  const patch = box(c, 190, 640, 700, 200, { zIndex: 20 });
  patch.innerHTML = `<div style="position:absolute;left:0;top:0;width:700px;height:200px;background:#FFF7C2;border:5px solid ${INK};box-shadow:8px 9px 0 ${SH};font-family:Playfair;font-style:italic;font-weight:900;font-size:66px;line-height:1.05;color:${INK};text-align:center;padding-top:24px">SALVAD<br>NUESTRAS ALMAS</div>
   <div style="position:absolute;left:-40px;top:-14px;width:150px;height:46px;background:rgba(240,230,190,.82);border:2px solid rgba(43,33,24,.3);transform:rotate(-28deg)"></div>
   <div style="position:absolute;left:600px;top:150px;width:150px;height:46px;background:rgba(240,230,190,.82);border:2px solid rgba(43,33,24,.3);transform:rotate(-28deg)"></div>
   <div style="position:absolute;left:590px;top:-16px;width:150px;height:46px;background:rgba(240,230,190,.82);border:2px solid rgba(43,33,24,.3);transform:rotate(24deg)"></div>`;
  return { pp, patch };
}
{
  const c = scene(T_H1, T_H2, t => {
    set(cd.pp.wrap, { r: -1.5 + wobble(t, 0.4, 0.5), s: 1 });
    const sv = p(t, S('save6') - 0.1, 0.3, E.outBack); set(sos, { y: (1 - sv) * 60, o: clamp(sv * 1.5) });
    ini.forEach((e, i) => paint(e, t, S(['save6', 'save6', 'souls6'][i]) + [0, 0.18, 0][i], 0.2));
    const kp = p(t, S('salvad') - 0.05, 0.25, E.outBack);
    set(cd.patch, { s: t < S('salvad') - 0.05 ? 0 : lerp(1.4, 1, kp), r: -4, o: t < S('salvad') - 0.05 ? 0 : 1, y: 120 });
  });
  sceneBg(c, { background: '#E2D5BA' });
  const cd = sosCard(c);
  const sos = el('div', c, { left: '250px', top: '1010px', width: '740px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '84px', color: INK, whiteSpace: 'nowrap', zIndex: 12 });
  sos.innerHTML = ['Save', 'Our', 'Souls'].map((wd, i) => `<span style="display:inline-block;margin:0 .1em">${hlSpan(wd[0], 'in' + i)}${wd.slice(1)}</span>`).join('');
  const ini = [0, 1, 2].map(i => sos.querySelector('.in' + i));
}

/* ======================================================================
   H2 · GOLPE DE COLOR ROSA: SE LO INVENTÓ LA GENTE DESPUÉS (T_H2 – para que)  L6b
   ====================================================================== */
colorHit(T_H2, T_H3, PINK, c => {
  const l1 = el('div', c, { left: 0, top: '260px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '110px', color: INK, zIndex: 5 }, 'Se lo inventó');
  const l2 = el('div', c, { left: 0, top: '400px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', color: '#fff', textShadow: `8px 8px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}`, zIndex: 5 }, 'la gente');
  const st = stamp(c, 220, 620, 'DESPUÉS', { size: 150, bw: 16, z: 6, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
  const crowd = [[-20, 900, 0, 81], [210, 880, 1, 82], [440, 900, 2, 83], [670, 880, 4, 84]].map(q => { const f = mk(c, [q[0], q[1], 330, 422], delegateInner(q[3], q[2]), '0 0 360 460', 'bust'); f.d.style.filter = SIL; f.d.style.zIndex = 4; return f; });
  const bub = [bubble(c, 120, 820, '¡ah, claro!', { size: 54, z: 7 }), bubble(c, 600, 800, '«Save Our Souls»', { size: 48, z: 7, rad: '44px 44px 10px 44px' })];
  return t => {
    popA(l1, t, S('selo'), { rise: 30 });
    set(l2, { s: pop(t, S('gente') - 0.05, 0.35), o: t < S('gente') - 0.05 ? 0 : 1, r: -2 });
    const k = p(t, S('despues'), 0.17, E.outCubic); set(st, { s: t < S('despues') ? 0 : lerp(2.2, 1, k), r: -6, o: t < S('despues') ? 0 : 1 }); st.style.textShadow = glitch(t, S('despues'), 0.25);
    crowd.forEach((f, i) => set(f.d, { y: -Math.abs(Math.sin(t * 7 + i)) * 20, r: Math.sin(t * 5 + i) * 3 }));
    bub.forEach((b, i) => popA(b, t, S('selo') + 0.3 + i * 0.35, { r: i ? 4 : -4 }));
  };
});

/* ======================================================================
   H3 · PARA QUE TUVIERA SENTIDO (T_H3 – mil novecientos doce)  L6c
   ====================================================================== */
headline(T_H3, T_J, 'Para que *tuviera sentido*', { size: 96 });
{
  const c = scene(T_H3, T_J, t => {
    set(cd.pp.wrap, { r: -1.5 });
    set(cd.patch, { y: 120, r: -4 + wobble(t, 0.5, 0.6), s: 1 });
    stampA(inv, t, T_H3 + 0.25, -8);
    const kb = pop(t, S('sentido'), 0.35); set(bulb, { s: kb, o: t < S('sentido') ? 0 : 1, y: wobble(t, 0.8, 6) });
    set(glow, { o: t > S('sentido') ? 0.7 + 0.3 * Math.sin(t * 12) : 0 });
  }, { cut: true });
  sceneBg(c, { background: '#E2D5BA' });
  const cd = sosCard(c);
  const inv = stamp(c, 330, 990, 'INVENTADO<br>DESPUÉS', { size: 72, bw: 11, z: 30, bg: 'rgba(255,255,255,.93)', blend: 'normal' }); inv.style.textAlign = 'center';
  const glow = box(c, -50, 300, 380, 380, { borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,230,0,.85), rgba(255,230,0,0) 65%)', zIndex: 24 });
  const bulb = box(c, 50, 380, 180, 240, { zIndex: 25 });
  bulb.innerHTML = `<svg width="180" height="240" viewBox="0 0 180 240" style="overflow:visible">${cut('<circle cx="90" cy="86" r="76"/><rect x="56" y="150" width="68" height="60"/>', 5, 7)}<circle cx="90" cy="86" r="76" fill="${YEL}" stroke="${INK}" stroke-width="6"/><path d="M66,140 Q70,100 90,96 Q110,100 114,140" stroke="${INK}" stroke-width="5" fill="none"/><rect x="56" y="150" width="68" height="60" rx="8" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><path d="M56,170 h68 M56,190 h68" stroke="${INK}" stroke-width="4"/><path d="M48,56 q14,-30 44,-34" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round"/></svg>`;
}

/* ======================================================================
   I · 1912, CABINA DE RADIO DEL TITANIC: CQD… y SOS (T_I – ojo)  L7
   ====================================================================== */
headline(S('radio') - 0.12, S('luego') - 0.25, 'El radiotelegrafista manda *CQD*…', { size: 78, hlT: S('cqd7') });
headline(S('luego') - 0.25, S('tambien') - 0.1, '…por consejo de su *compañero*', { size: 82, hlT: S('companero') });
headline(S('tambien') - 0.1, T_H1, '…y también *SOS*', { size: 110, hlT: S('sos7') });
{
  const tC = S('cqd7'), tS = S('sos7');
  const c = scene(T_I, T_H1, t => {
    set(cam, { s: 1 + 0.05 * p(t, T_I, T_H1 - T_I, E.linear) });
        { const t0 = S('doce') - 0.05, k = p(t, t0, 0.18, E.outCubic); set(yr, { s: t < t0 ? 0 : lerp(2.2, 1, k), r: -4, o: t < t0 ? 0 : 1 - p(t, S('radio') - 0.2, 0.2) }); }
    popA(yc, t, S('radio') - 0.1, { r: -4 });
    stampA(bu.d, t, S('titanic7'), 6);
    ph.sea.style.transform = `rotate(${f1(Math.sin(t * 1.3) * 6)}deg)`;
    // operador 1
    set(op1.d, { y: wobble(t, 0.6, 2), r: t > S('luego') && t < S('luego') + 0.35 ? -6 * Math.sin(p(t, S('luego'), 0.35) * Math.PI) : 0 });
    face(op1, t, { look: t > S('consejo') && t < S('tambien') ? [6, -2] : [-3, 4], brow: t > S('consejo') && t < S('tambien') ? -8 : 0, jaw: t > S('tambien') && t < S('tambien') + 0.3 ? 0.4 : 0, seed: 0.4 });
    popA(rt, t, S('radio') + 0.1, { r: 3, o: 1 - p(t, S('cqd7') + 0.3, 0.2) });
    // compañero
    const kc = p(t, S('luego') - 0.15, 0.4, E.outBack); set(op2.d, { x: (1 - kc) * 600 - (t > S('luego') && t < S('luego') + 0.35 ? 40 * Math.sin(p(t, S('luego'), 0.35) * Math.PI) : 0), y: wobble(t, 0.6, 3, 0.4), o: t < S('luego') - 0.15 ? 0 : 1 });
    face(op2, t, { look: [-6, 2], jaw: t > S('consejo') && t < SE('companero') ? talkW(t, 'VECINO') * 0.6 : 0, brow: -4, seed: 1.7 });
    set(nudge, { s: pop(t, S('luego'), 0.25), o: t > S('luego') && t < S('luego') + 0.7 ? 1 : 0, r: -8 });
    popA(adv, t, S('consejo'), { r: 3 });
    if (t > S('tambien') + 0.3) adv.style.opacity = 1 - p(t, S('tambien') + 0.3, 0.2);
    // pulsaciones de las dos cintas
    let down = 0;
    t1.syms.forEach((s, i) => { const t0 = tC + i * 0.12; set(s, { o: t >= t0 ? 1 : 0 }); if (t >= t0 && t < t0 + 0.07) down = 1; });
    t2.syms.forEach((s, i) => { const t0 = tS - 0.05 + i * 0.07; set(s, { o: t >= t0 ? 1 : 0 }); if (t >= t0 && t < t0 + 0.05) down = 1; });
    key.lever.setAttribute('transform', `rotate(${down ? -4 : 0} ${KEY_PIV[0]} ${KEY_PIV[1]})`);
    set(hand, { y: down ? 16 : 0 });
    popA(t1.wrap, t, tC - 0.1, { r: -2 }); popA(l1, t, tC + 0.3, { r: -4 });
    popA(t2.wrap, t, tS - 0.15, { r: 1.5 }); popA(l2, t, tS + 0.4, { r: 4 });
    stampA(sosSt, t, tS + 0.35, -8);
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  cabinBg(cam);
  const ph = porthole(cam, 100, 420, 230, 0);
  const bu = mk(cam, [760, 400, 240, 240], buoyInner('TITANIC', { off: '50%' }), '0 0 300 300', 'buoy'); bu.d.style.zIndex = 3;
  const op1 = mk(cam, [250, 540, 400, 511], operatorInner(73), '0 0 360 460', 'bust'); op1.d.style.zIndex = 4;
  const op2 = mk(cam, [590, 520, 400, 511], operatorInner(74, { cap: true, moustache: true, col: '#3a2f26' }), '0 0 360 460', 'bust'); op2.d.style.zIndex = 4;
  const desk = box(cam, 0, 0, 1080, 1920, { zIndex: 5 }); desk.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${cut('<rect x="0" y="980" width="1080" height="300"/>')}<rect x="-10" y="980" width="1100" height="300" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><rect x="-10" y="980" width="1100" height="300" fill="url(#hW)" opacity=".35"/><rect x="-10" y="980" width="1100" height="26" fill="#8b5a3a" stroke="${INK}" stroke-width="4"/></svg>`;
  const key = mk(cam, [300, 840, 480, 240], keyInner(), '0 0 640 320', 'key'); key.d.style.zIndex = 7; key.lever = key.d.querySelector('.lever');
  const hand = box(cam, 287, 750, 180, 220, { zIndex: 8 }); hand.innerHTML = `<svg width="180" height="220" style="overflow:visible">${gloveHand(70, 150, 170, 1.05)}</svg>`;
  const t1 = tape(cam, 330, 1060, '−·−· −−·− −··', { u: 22, z: 9 });
  const t2 = tape(cam, 330, 1170, '··· −−− ···', { u: 22, z: 9, bg: YEL });
  const l1 = chip(cam, 830, 1060, 'CQD', { size: 34, bg: INK, color: '#fff', z: 10 });
  const l2 = chip(cam, 760, 1170, 'SOS', { size: 34, bg: RED, color: '#fff', z: 10 });
  const yr = el('div', c, { left: '0', top: '230px', width: '1080px', textAlign: 'center', fontFamily: 'Rye', fontSize: '190px', lineHeight: '200px', color: YEL, textShadow: `8px 8px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`, zIndex: 30 }, '1912');
  const yc = chip(c, 560, 1250, '1912 · Titanic', { size: 40, bg: INK, color: YEL, z: 30 });
  const rt = chip(cam, 250, 520, 'radiotelegrafista', { size: 34, bg: PINK, z: 12 });
  const nudge = el('div', cam, { left: '560px', top: '640px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '64px', color: PINK, textShadow: `3px 3px 0 ${INK}`, zIndex: 12 }, '¡psst!');
  const adv = bubble(cam, 470, 470, '¡Manda SOS!', { size: 62, z: 13, rad: '44px 44px 10px 44px' });
  const sosSt = stamp(c, 370, 430, 'SOS', { size: 130, bw: 14, z: 40, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
}

/* ======================================================================
   J1 · ¡OJO! NO FUE EL PRIMER SOS (T_J – pero)  L8a
   ====================================================================== */
headline(S('ojo') + 0.35, T_J2, 'No fue el *primer SOS*', { size: 100, hlT: S('primer') });
{
  const c = scene(T_J, T_J2, t => {
    const ko = p(t, S('ojo'), 0.18, E.outCubic), kk = p(t, S('ojo') + 0.4, 0.3, E.inOutCubic);
    set(ojo, { s: t < S('ojo') ? 0 : lerp(2.4, 1, ko) * lerp(1, 0.6, kk), y: kk * -40, r: -8, o: t < S('ojo') ? 0 : 1 - kk });
    popA(med.wrap, t, S('ojo') + 0.45, { r: -3 });
    set(sh.d, { y: wobble(t, 0.5, 4) });
    const kx = p(t, S('primer') + 0.1, 0.2, E.outBack); set(x, { s: t < S('primer') + 0.1 ? 0 : lerp(1.5, 1, kx), o: t < S('primer') + 0.1 ? 0 : 1 });
    popA(hc, t, S('historia'), { r: -4 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const med = paperPiece(c, 180, 460, 720, 520, { seed: 66, bg: '#FBF6EA' });
  const sh = mk(med.inner, [40, 20, 620, 262], titanicInner(), '0 0 900 380', 'ship');
  const rib = box(med.inner, 190, 280, 330, 210); rib.innerHTML = `<svg width="330" height="210" style="overflow:visible"><path d="M120,90 L80,210 L120,186 L150,210 L160,96 Z M210,90 L250,210 L210,186 L180,210 L170,96 Z" fill="${RED}" stroke="${INK}" stroke-width="5"/><circle cx="165" cy="80" r="76" fill="${BRASS}" stroke="${INK}" stroke-width="6"/><circle cx="165" cy="80" r="60" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="6 6"/><text x="165" y="76" text-anchor="middle" font-family="Rye" font-size="40" fill="${INK}">1.er</text><text x="165" y="116" text-anchor="middle" font-family="Rye" font-size="38" fill="${INK}">SOS</text></svg>`;
  const x = box(c, 340, 640, 400, 400, { zIndex: 20 }); x.innerHTML = XSVG;
  const hc = chip(c, 560, 1060, 'de la historia', { size: 44, bg: PINK, z: 25 });
  const ojo = stamp(c, 300, 560, '¡OJO!', { size: 190, bw: 18, z: 60, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
}

/* ======================================================================
   J2 · EL TITANIC LO HIZO FAMOSO EN TODO EL MUNDO (T_J2 – o sea)  L8b
   ====================================================================== */
headline(T_J2, T_K, 'El Titanic lo hizo *famoso*', { size: 96, hlT: S('famoso8') });
{
  const NP = [];
  const c = scene(T_J2, T_K, t => {
    set(ry, { r: t * 14, o: p(t, S('titanic8'), 0.4) });
    set(sh.d, { s: lerp(0.85, 1, p(t, T_J2, 0.5, E.outBack)), y: wobble(t, 0.5, 6), r: wobble(t, 0.4, 1) });
    NP.forEach(n => { const k = p(t, n.t, 0.5, E.outCubic); set(n.e, { x: (1 - k) * n.dx, y: (1 - k) * n.dy + wobble(t, 0.6, 5, n.t), r: n.r + (1 - k) * 200, s: lerp(0.3, 1, k), o: t < n.t ? 0 : 1 }); });
    const kg = pop(t, S('todo'), 0.45); set(gl.d, { s: kg, o: t < S('todo') ? 0 : 1 });
    gsp.innerHTML = svgW(globeInner(t * 1.6), '0 0 400 400');
    SB.forEach((b, i) => { const a = t * 1.6 + i * 2.09; set(b, { x: Math.cos(a) * 230, y: Math.sin(a) * 90, s: pop(t, S('todo') + 0.15 + i * 0.1, 0.3), o: t < S('todo') + 0.15 + i * 0.1 ? 0 : 1 }); });
    popA(fam, t, S('famoso8'), { r: -5 });
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC' });
  const ry = rays(c, -170, -150, 1420, 26, 'rgba(255,230,0,.5)', 'rgba(0,0,0,0)', 0);
  const sh = mk(c, [90, 460, 900, 380], titanicInner({ waves: true }), '0 0 900 380', 'ship'); sh.d.style.zIndex = 3;
  [[60, 760, -600, -300, -10, 'TITANIC', 'S'], [600, 800, 700, -200, 8, '¡S.O.S.!', 'P'], [380, 900, 0, 700, -3, 'EXTRA!', 'E']].forEach((q, i) => {
    const e = mk(c, [q[0], q[1], 260, 330], newsInner({ title: q[5], mfs: 84, date: '1912', seed: 11 + i }), '0 0 600 760', 'np'); e.d.style.zIndex = 5 + i;
    NP.push({ e: e.d, dx: q[2], dy: q[3], r: q[4], t: S('titanic8') + 0.15 + i * 0.25 });
  });
  const gl = { d: box(c, 340, 820, 400, 400, { zIndex: 10 }) }; const gsp = box(gl.d, 0, 0, 400, 400);
  const SB = [0, 1, 2].map(i => el('div', gl.d, { left: '150px', top: '170px', fontFamily: 'Rye', fontSize: '40px', color: '#fff', background: RED, border: `4px solid ${INK}`, borderRadius: '30px', padding: '2px 16px', zIndex: 3 }, 'SOS'));
  const fam = chip(c, 640, 880, '¡famoso!', { size: 50, bg: PINK, z: 20 });
}

/* ======================================================================
   K · GOLPE DE COLOR AMARILLO — REMATE CITABLE (T_K – ¿te lo…?)  L9
   ====================================================================== */
colorHit(T_K, T_BAL, YEL, c => {
  const tE = S('eligieron') - 0.1;
  const os = el('div', c, { left: 0, top: '620px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '230px', color: INK, zIndex: 5 }, 'O sea…');
  const a1 = el('div', c, { left: 0, top: '250px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '84px', lineHeight: 1.05, color: INK, zIndex: 5 }, 'La llamada de auxilio');
  const a2 = el('div', c, { left: 0, top: '360px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: 1, color: INK, zIndex: 5 }, 'más famosa');
  const a3 = el('div', c, { left: 0, top: '530px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '90px', color: INK, zIndex: 5 }, 'del planeta…');
  const gl = box(c, 290, 680, 500, 500, { zIndex: 3 }); gl.innerHTML = svgW(globeInner(0.5), '0 0 400 400');
  const b1 = el('div', c, { left: 0, top: '290px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '92px', color: INK, zIndex: 6 }, 'la eligieron porque');
  const b2 = el('div', c, { left: 0, top: '420px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '180px', lineHeight: 0.95, color: '#fff', zIndex: 7 }, 'SONABA<br>BIEN');
  const tp = tape(c, 50, 880, '··· −−− ···', { u: 40, h: 120, w: 980, z: 6, bg: '#fff' });
  const notes = [[110, 1060, '♪'], [860, 1040, '♫'], [480, 1070, '♪']].map(q => el('div', c, { left: px(q[0]), top: px(q[1]), fontSize: '110px', color: INK, zIndex: 8 }, q[2]));
  // CTA en la misma escena: ¿Te lo habías creído? SÍ / NO
  const tQ = S('te') - 0.12;
  const qq = el('div', c, { left: 0, top: '640px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '96px', color: INK, zIndex: 9 }, '¿Te lo habías creído?');
  const btn = (x, txt, bg, col) => el('div', c, { left: px(x), top: '800px', width: '400px', height: '220px', background: bg, color: col, border: `8px solid ${INK}`, borderRadius: '50px', boxShadow: `12px 14px 0 ${INK}`, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '150px', lineHeight: '196px', textAlign: 'center', zIndex: 30 }, txt);
  const bS = btn(80, 'SÍ', '#7BC67E', INK), bN = btn(530, 'NO', RED, '#fff');
  const cur = el('div', c, { left: '330px', top: '950px', zIndex: 35 }, `<svg width="80" height="110" viewBox="0 0 80 110"><path d="M8,6 L8,86 L28,68 L42,100 L56,94 L42,62 L68,62 Z" fill="#fff" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/></svg>`);
  const CM = [['FAR', '@lucia_navega', 'SÍ 😳', S('si')], ['SOL', '@toni.morse', 'No, ya lo sabía', S('no10')]].map((m, i) => {
    const e = box(c, 120 + i * 40, 1080 + i * 112, 640, 100, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 40 });
    avatar(e, 10, 8, 78, m[0], { bw: 3 });
    el('div', e, { left: '104px', top: '8px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '24px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]);
    el('div', e, { left: '104px', top: '38px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '38px', color: INK, whiteSpace: 'nowrap' }, m[2]);
    return { e, t: m[3] };
  });
  return t => {
    const kq = p(t, tQ, 0.3, E.inOutCubic);
    const out = p(t, tE - 0.15, 0.15);
    set(os, { s: pop(t, S('osea') - 0.05, 0.35) * (1 - p(t, S('llamada') - 0.3, 0.2)), r: -4, o: t < S('osea') - 0.05 ? 0 : 1 });
    popA(a1, t, S('llamada') - 0.35, { rise: 30, o: 1 - out });
    set(a2, { s: pop(t, S('famosa9') - 0.1, 0.35) * (1 - out), r: -2, o: t < S('famosa9') - 0.1 ? 0 : 1 });
    popA(a3, t, S('planeta'), { rise: 30, o: 1 - out });
    set(gl, { s: pop(t, S('famosa9'), 0.4) * (1 - out), r: wobble(t, 0.3, 6), o: t < S('famosa9') ? 0 : 1 }); if (Math.floor(t * 30) % 2 === 0) gl.innerHTML = svgW(globeInner(t * 1.4), '0 0 400 400');
    popA(b1, t, tE, { rise: 30, o: 1 - kq });
    const kb = p(t, S('sonaba') - 0.05, 0.22, E.outBack); set(b2, { s: (t < S('sonaba') - 0.05 ? 0 : lerp(1.6, 1, kb)) * lerp(1, 0.62, kq), y: -kq * 210, r: -3, o: t < S('sonaba') - 0.05 ? 0 : 1 });
    b2.style.textShadow = (glitch(t, S('sonaba'), 0.3) ? glitch(t, S('sonaba'), 0.3) + ', ' : '') + `12px 12px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`;
    const tt = S('porque9');
    set(tp.wrap, { o: t > tt - 0.1 ? 1 - kq : 0, y: (1 - p(t, tt - 0.1, 0.3, E.outBack)) * 80 });
    tp.syms.forEach((s, i) => set(s, { s: pop(t, tt + i * 0.07, 0.25), o: t < tt + i * 0.07 ? 0 : 1 }));
    notes.forEach((n, i) => set(n, { y: -Math.abs(Math.sin(t * 5 + i)) * 30, r: Math.sin(t * 4 + i) * 12, o: t > S('bien') ? 1 - kq : 0 }));
    popA(qq, t, tQ + 0.05, { rise: 30 });
    const pS = t > S('si') && t < S('si') + 0.35 ? 1 + 0.12 * Math.sin(p(t, S('si'), 0.35) * Math.PI) : 1;
    const pN = t > S('no10') && t < S('no10') + 0.35 ? 1 + 0.12 * Math.sin(p(t, S('no10'), 0.35) * Math.PI) : 1;
    set(bS, { s: pop(t, tQ + 0.2, 0.4) * pS, r: -3, o: t < tQ + 0.2 ? 0 : 1 }); set(bN, { s: pop(t, tQ + 0.32, 0.4) * pN, r: 3, o: t < tQ + 0.32 ? 0 : 1 });
    set(cur, { x: t > S('no10') ? 450 : 0, y: Math.abs(Math.sin(t * 9)) * -10, o: t > S('si') - 0.15 ? 1 : 0 });
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
  };
});

