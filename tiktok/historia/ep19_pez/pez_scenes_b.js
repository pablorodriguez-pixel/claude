/* Ep. 19 · escenas L4 (remate) – L7 + cierre */
const OUTL = (n = 5, sh = 12) => `${sh}px ${sh}px 0 ${INK}, -${n}px -${n}px 0 ${INK}, ${n}px -${n}px 0 ${INK}, -${n}px ${n}px 0 ${INK}`;

/* ======================================================================
   HIT 1 · GOLPE AMARILLO: ESO ES MEMORIA
   ====================================================================== */
colorHit(S.HIT1[0], S.HIT1[1], YEL, c => {
  const top = el('div', c, { left: 0, top: '260px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '120px', lineHeight: 1, color: INK, zIndex: 8 }, 'Eso es');
  const big = el('div', c, { left: 0, top: '400px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '196px', lineHeight: '250px', color: '#fff', textShadow: OUTL(), zIndex: 9 }, 'MEMORIA');
  const sil = mkFish(c, [180, 760, 600, 420]); sil.d.style.filter = SIL; sil.d.style.zIndex = 4;
  const th = box(c, 620, 600, 300, 230, { zIndex: 6, transformOrigin: '20% 90%' });
  th.innerHTML = `<svg viewBox="0 0 300 230" width="300" height="230" style="overflow:visible"><circle cx="40" cy="214" r="12" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="70" cy="186" r="18" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M90,150 C40,140 50,70 100,74 C110,20 190,14 210,56 C270,40 300,110 262,140 C270,180 200,190 180,164 C150,190 100,184 90,150 Z" fill="#fff" stroke="${INK}" stroke-width="5"/></svg>`;
  const hb = heartBox(th, 120, 60, 80, 8); const ck = box(th, 190, 70, 70, 70, { zIndex: 8 }); ck.innerHTML = CHECK;
  const SP = [[200, 760], [860, 700], [180, 1100], [880, 1080]].map(([x, y]) => el('div', c, { left: px(x), top: px(y), fontSize: '70px', color: '#fff', textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 7 }, '✦'));
  return t => {
    popA(top, t, S.HIT1[0] + 0.02, { rise: 30 });
    const kb = p(t, K.memoria2 - 0.02, 0.2, E.outBack); set(big, { s: t < K.memoria2 - 0.02 ? 0 : lerp(1.6, 1, kb), r: -4, o: t < K.memoria2 - 0.02 ? 0 : 1 });
    const g = glitch(t, K.memoria2, 0.3); big.style.textShadow = (g ? g + ', ' : '') + OUTL();
    set(sil.d, { y: Math.abs(Math.sin(t * 6)) * -16, r: Math.sin(t * 5) * 3, s: pop(t, S.HIT1[0] + 0.05, 0.4) });
    fishFace(sil, t, { smile: true, wag: 2, tf: 14 });
    set(th, { s: 1.4 * pop(t, K.memoria2 + 0.15, 0.4), o: t < K.memoria2 + 0.15 ? 0 : 1, r: wobble(t, 0.6, 3) });
    SP.forEach((s, i) => set(s, { s: pop(t, K.memoria2 + i * 0.08, 0.3) * (0.8 + 0.2 * Math.sin(t * 9 + i)), r: t * 120, o: t < K.memoria2 ? 0 : 1 }));
  };
});

/* ======================================================================
   F1 · ¡OJO! — NADIE SABE DE DÓNDE SALIÓ — EXPEDIENTE «ORIGEN DESCONOCIDO»
   ====================================================================== */
headline(K.nadie - 0.12, K.tres2 - 0.1, 'Nadie sabe de *dónde* salió…', { size: 82, hlT: K.donde });
headline(K.tres2 - 0.1, S.F1[1], '…lo de los *3 segundos*', { size: 90, hlT: K.seg2 });
{
  const c = scene(S.F1[0], S.F1[1], t => {
    const kt = p(t, K.ojo + 0.5, 0.3, E.inOutCubic), k0 = p(t, K.ojo, 0.18, E.outCubic);
    set(ojo, { s: t < K.ojo ? 0 : lerp(lerp(2.4, 1, k0), 0.4, kt), x: kt * 330, y: kt * -390, r: -10, o: t < K.ojo ? 0 : 1 });
    G.forEach((f, i) => { const t0 = K.nadie + i * 0.12; const shrug = Math.max(0, Math.sin((t - t0) * 7)) * 10; set(f.d, { s: pop(t, t0, 0.4), y: wobble(t, 0.8, 3, i) - shrug, r: [8, 0, -8][i] + Math.sin(t * 3 + i) * 3, o: t < t0 ? 0 : 1 }); face(f, t, { look: [[8, -4], [0, -6], [-8, -4]][i], seed: i, jaw: t > K.nadie && t < K.sabe + 0.4 ? 0.15 : 0 }); });
    QM.forEach((q, i) => { const t0 = K.nadie + 0.1 + i * 0.12; set(q, { s: pop(t, t0, 0.35), y: Math.sin(t * 4 + i) * 12, r: [-14, 10, -6][i], o: t < t0 ? 0 : 1 }); });
    set(fold, { y: (1 - p(t, K.donde - 0.1, 0.45, E.outBack)) * 1100, r: -3 + wobble(t, 0.5, 1), o: t < K.donde - 0.1 ? 0 : 1 });
    stampA(od, t, K.salio + 0.05, -9, 1);
    set(sw.d, { s: pop(t, K.tres2 - 0.05, 0.4), r: 12 + wobble(t, 0.6, 3), o: t < K.tres2 - 0.05 ? 0 : 1 });
    watchHand(sw, t, 200);
    set(lens, { s: pop(t, K.donde + 0.2, 0.4), x: Math.sin(t * 3) * 40, y: Math.cos(t * 2.4) * 20, r: -8, o: t < K.donde + 0.2 ? 0 : 1 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const G = [mk(c, [100, 530, 290, 370], fanInner(71, 'slouch', '#5a4632'), '0 0 360 460', 'bust'), mk(c, [395, 500, 300, 383], journalistInner(72, 1), '0 0 360 460', 'bust'), mk(c, [690, 530, 290, 370], fanInner(74, 'cap', '#3a2f26'), '0 0 360 460', 'bust')];
  const QM = [qMark(c, 110, 470, 110), qMark(c, 520, 430, 120), qMark(c, 640, 500, 110)];
  const fold = box(c, 330, 760, 600, 450, { zIndex: 20 }); fold.innerHTML = folderSvg();
  const od = stamp(fold, 14, 318, 'ORIGEN DESCONOCIDO', { size: 44, bw: 9, z: 30, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
  const sw = mkWatch(fold, 470, -90, 160, '3 s'); sw.d.style.zIndex = 31;
  const lens = box(c, 700, 780, 200, 200, { zIndex: 40 });
  lens.innerHTML = `<svg width="200" height="260" style="overflow:visible"><path d="M160,160 L230,250" stroke="${INK}" stroke-width="30" stroke-linecap="round"/><path d="M160,160 L230,250" stroke="${WOOD}" stroke-width="18" stroke-linecap="round"/><circle cx="100" cy="100" r="96" fill="${INK}"/><circle cx="100" cy="100" r="88" fill="${BRASS}"/><circle cx="100" cy="100" r="76" fill="rgba(255,255,255,.55)" stroke="${INK}" stroke-width="4"/><text x="100" y="135" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="100" fill="${PINK}" stroke="${INK}" stroke-width="3">?</text></svg>`;
  const ojo = stamp(c, 200, 700, '¡OJO!', { size: 210, bw: 18, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   F2 · SE REPITIÓ TANTO QUE PARECÍA VERDAD — bocadillos «3 segundos»
   ====================================================================== */
headline(S.F2[0], K.tanto - 0.08, 'Simplemente se *repitió*…', { size: 90, hlT: K.repitio });
headline(K.tanto - 0.08, S.F2[1], '…tanto que parecía *verdad*', { size: 78, hlT: K.verdad });
{
  const BB = [];
  const c = scene(S.F2[0], S.F2[1], t => {
    G.forEach((f, i) => { set(f.d, { s: pop(t, S.F2[0] + 0.05 + i * 0.1, 0.4), y: wobble(t, 0.7, 3, i), r: [6, -2, -6][i], o: 1 }); face(f, t, { look: [[6, -6], [0, -6], [-6, -6]][i], seed: i + 2, jaw: Math.abs(Math.sin(t * 12 + i * 2)) * 0.4 }); });
    BB.forEach(b => { const k2 = pop(t, b.t, 0.32); set(b.e, { s: k2 * (t > K.parecia ? 1 - 0.25 * p(t, K.parecia, 0.3) : 1), r: b.r + Math.sin(t * 4 + b.r) * 2, o: t < b.t ? 0 : (t > K.parecia ? 1 - 0.55 * p(t, K.parecia, 0.3) : 1) }); });
    const kv = p(t, K.parecia, 0.2, E.outBack); set(sign, { s: t < K.parecia ? 0 : lerp(1.7, 1, kv), r: -5 + wobble(t, 0.5, 1.5), o: t < K.parecia ? 0 : 1 });
    crack.style.strokeDashoffset = f1(400 * (1 - p(t, K.verdad + 0.15, 0.3)));
    popA(pr, t, K.verdad + 0.05, { r: 6 });
  });
  sceneBg(c, { background: '#EFE1C6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 58px)' });
  const G = [mk(c, [330, 930, 230, 294], fanInner(75, 'slouch', '#4a3a2c'), '0 0 360 460', 'bust'), mk(c, [540, 900, 240, 306], journalistInner(76, 2), '0 0 360 460', 'bust'), mk(c, [740, 930, 230, 294], fanInner(78, 'cap', '#5a4632'), '0 0 360 460', 'bust')];
  const TX = ['¡3 segundos!', '3 segundos', '¡solo 3 s!', '¡3 segundos!', '3 segundos…', '¡3 s!', '¡3 segundos!', '3 segundos', '¡3 segundos!'];
  const POS = [[110, 430, -6], [560, 420, 5], [330, 560, 3], [640, 570, -5], [80, 690, 4], [420, 700, -3], [640, 790, 6], [150, 830, -4], [470, 840, 3]];
  const t0 = S.F2[0] + 0.12, t1 = K.parecia - 0.2;
  POS.forEach((q, i) => { const e = el('div', c, { left: px(q[0]), top: px(q[1]), background: '#fff', border: `5px solid ${INK}`, borderRadius: i % 2 ? '40px 40px 10px 40px' : '40px 40px 40px 10px', boxShadow: `6px 7px 0 ${SH}`, padding: '4px 26px 10px', fontFamily: 'Playfair', fontStyle: i % 3 ? 'normal' : 'italic', fontWeight: 900, fontSize: px(i % 3 === 0 ? 62 : 50), color: INK, whiteSpace: 'nowrap', zIndex: 30 + i }, TX[i]); BB.push({ e, t: lerp(t0, t1, i / (POS.length - 1)), r: q[2] }); });
  const sign = box(c, 150, 560, 780, 300, { zIndex: 60 });
  sign.innerHTML = `<svg width="780" height="300" style="overflow:visible">${cut('<rect x="0" y="0" width="780" height="300" rx="20"/>')}<rect x="0" y="0" width="780" height="300" rx="20" fill="#D9B77A" stroke="${INK}" stroke-width="7"/><rect x="0" y="0" width="780" height="300" rx="20" fill="url(#hP)"/><path class="crk" d="M420,0 L392,70 L436,120 L380,190 L420,240 L400,300" stroke="${INK}" stroke-width="8" fill="none" stroke-dasharray="400" stroke-dashoffset="400" stroke-linejoin="round"/></svg>`;
  el('div', sign, { left: 0, top: '42px', width: '780px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '200px', color: '#fff', textShadow: OUTL(5, 10), whiteSpace: 'nowrap' }, '«VERDAD»');
  const crack = sign.querySelector('.crk');
  const pr = chip(c, 560, 830, '…parecía', { size: 54, bg: PINK, z: 70 });
}

/* ======================================================================
   HIT 2 · GOLPE ROSA: TU PEZ SABE QUIÉN LE DA DE COMER → ¿SÍ o NO?
   ====================================================================== */
headline(K.te - 0.08, S.HIT2[1], '¿Te lo *creías*?', { size: 110, hlT: K.creias });
{
  const CM = [];
  const TQ = Math.min(K.te - 0.25, K.comer6e + 0.08);
  const c = scene(S.HIT2[0], S.HIT2[1], t => {
    const out = p(t, TQ, 0.25, E.inCubic);
    popA(os, t, S.HIT2[0] + 0.02, { rise: 30 }); if (t > TQ) os.style.opacity = 1 - out;
    set(l1, { s: pop(t, K.tu6, 0.35) * (1 - out), o: t < K.tu6 ? 0 : 1 - out, y: -out * 300 });
    const kb = p(t, K.sabe6 - 0.02, 0.2, E.outBack); set(big, { s: (t < K.sabe6 - 0.02 ? 0 : lerp(1.7, 1, kb)) * (1 - out), r: -4, o: t < K.sabe6 - 0.02 ? 0 : 1 - out, y: -out * 300 });
    const g = glitch(t, K.sabe6, 0.3); big.style.textShadow = (g ? g + ', ' : '') + OUTL();
    set(l3, { s: pop(t, K.quien, 0.35) * (1 - out), o: t < K.quien ? 0 : 1 - out, y: -out * 300 });
    // el pez protagonista: centro → arriba derecha cuando llega la pregunta
    const kq = p(t, TQ, 0.4, E.inOutCubic);
    set(fish.d, { x: lerp(0, 230, kq), y: lerp(0, -380, kq) + Math.abs(Math.sin(t * 7)) * -14, s: pop(t, S.HIT2[0] + 0.04, 0.45) * lerp(1, 0.8, kq), r: Math.sin(t * 5) * 4, o: t < S.HIT2[0] + 0.04 ? 0 : 1 });
    fishFFace(fish, t, { smile: t < TQ || t > K.si, look: t > TQ && t < K.si ? [-10, 8] : [0, 0], bL: 10, bR: 10, ff: 18, blink: false });
    { const kh = pop(t, K.comer6 - 0.05, 0.4); set(ht, { s: kh * (1 + 0.12 * Math.max(0, Math.sin(t * 14))) * (1 - out), o: t < K.comer6 - 0.05 ? 0 : 1 - out, r: 10 }); }
    // botones gigantes
    [[bS, K.si], [bN, K.noB]].forEach(([b, t0], i) => { const ta = TQ + 0.2 + i * 0.12; const press = t > t0 + 0.12 && t < t0 + 0.3; set(b, { s: pop(t, ta, 0.4) * (press ? 0.9 : 1 + 0.06 * Math.max(0, Math.sin((t - t0) * 9)) * (t > t0 ? 1 : 0)), r: [-3, 3][i], o: t < ta ? 0 : 1 }); });
    set(hand, { o: t > K.si - 0.15 ? 1 : 0, y: (t > K.si + 0.1 && t < K.si + 0.3 ? 14 : 0) + Math.sin(t * 5) * 6, s: pop(t, K.si - 0.15, 0.3) });
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
  }, { z: 400, cut: true, clip: true });
  sceneBg(c, { background: PINK });
  halftone(c, 'rgba(0,0,0,.10)', 1);
  const os = el('div', c, { left: 0, top: '220px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '100px', lineHeight: 1, color: INK, zIndex: 8 }, 'O sea:');
  const l1 = el('div', c, { left: 0, top: '350px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '120px', lineHeight: 1, color: INK, zIndex: 8 }, 'Tu pez');
  const big = el('div', c, { left: 0, top: '470px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '230px', lineHeight: '260px', color: YEL, textShadow: OUTL(), zIndex: 9 }, 'SABE');
  const l3 = el('div', c, { left: 0, top: '750px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '84px', lineHeight: 1, color: '#fff', textShadow: OUTL(4, 7), zIndex: 9 }, 'quién le da de comer');
  const fish = mkFishF(c, [345, 860, 390, 390]); fish.d.style.zIndex = 6;
  const ht = heartBox(c, 690, 860, 150, 10);
  const btn = (x, txt, bg, col) => el('div', c, { left: px(x), top: '1030px', width: '380px', height: '210px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '196px', color: col, background: bg, border: `8px solid ${INK}`, borderRadius: '40px', boxShadow: `10px 12px 0 ${INK}`, zIndex: 30 }, txt);
  const bS = btn(110, 'SÍ', YEL, INK), bN = btn(560, 'NO', '#fff', RED);
  const hand = box(c, 300, 1160, 160, 200, { zIndex: 40 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="160" height="160" style="overflow:visible">${gloveHand(0, 0, 160, 1.2)}</svg>`;
  const cms = [['FAR', '@lucia_acuario', 'SÍ 😳', K.te + 0.55], ['SOL', '@pablo.peces', 'No, ya lo sabía', K.te + 1.15], ['MEREDITH', '@ana_bcn', 'Sí, toda la vida…', K.te + 1.75]];
  cms.forEach((m, i) => {
    const e = box(c, 40, [440, 590, 740][i], 520, 112, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 40 });
    avatar(e, 10, 10, 84, m[0], { bw: 3 });
    el('div', e, { left: '108px', top: '8px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '26px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]);
    el('div', e, { left: '108px', top: '40px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '38px', color: INK, whiteSpace: 'nowrap' }, m[2]);
    CM.push({ e, t: m[3] });
  });
}

/* ======================================================================
   C · MARCA: EL VECINO EN SU BALCÓN (última frase, rápido)
   ====================================================================== */
{
  const T0 = S.C[0], T1 = S.C[1];
  const c = scene(T0, T1, t => {
    const ex = p(t, T1 - 0.2, 0.2, E.inCubic);
    set(cam, { s: lerp(1.04 + 0.04 * p(t, T0, T1 - T0, E.linear), 0.3, ex), x: ex * -330, y: ex * 380, o: 1 - ex * 0.6 });
    const lean = p(t, K.esto - 0.3, 0.4, E.inOutCubic);
    set(vec.d, { s: 1 + lean * 0.07, y: wobble(t, 0.5, 3) - lean * 20 });
    const fanFast = t > T0 + 0.3 && t < T0 + 0.9;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > K.vecino + 0.5 && t < K.esto ? [0, -5] : t > K.esto ? [-4, 3] : [0, 0], bL: fanFast ? 8 : t > K.esto ? 6 : 0, bR: fanFast ? 8 : t > K.esto ? 12 : 0, fan: fanFast ? Math.sin(t * 22) * 14 : wobble(t, 0.9, 6), seed: 0.3 });
    popA(tag, t, K.vecino, { r: -5 });
    const ks = p(t, K.soy - 0.05, 0.55, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: Math.sin(t * 2.4) * 1.5 * (1 - p(t, K.soy, 2)) + (1 - ks) * 8, o: t < K.soy - 0.07 ? 0 : 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    paint(sHL, t, K.vecino, 0.3);
    pots.forEach((pt, i) => set(pt, { r: wobble(t, 0.7, 1.5, i) }));
    bwB.upd(t); set(bwB.wrap, { r: wobble(t, 0.6, 2) }); fishFace(fB, t, { look: [-6, -4], seed: 0.7 }); set(fB.d, { x: Math.sin(t * 2) * 14 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.13) 0 3px, transparent 3px 58px), repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 3px, transparent 3px 116px)' });
  const win = box(cam, 0, 0, 1080, 1920); {
    const arch = 'M160,1300 L160,640 Q160,450 540,440 Q920,450 920,640 L920,1300 Z';
    let lace = ''; for (let y = 560; y < 1250; y += 26) lace += `<path d="M${f1(176 + Math.sin(y * 0.05) * 6)},${y} q22,13 0,26" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".6"/><path d="M${f1(904 - Math.sin(y * 0.05) * 6)},${y} q-22,13 0,26" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".6"/>`;
    win.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">
    <rect x="12" y="520" width="140" height="760" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="928" y="520" width="140" height="760" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(k => `<path d="M24,${560 + k * 50} h116 M940,${560 + k * 50} h116" stroke="${INK}" stroke-width="3"/>`).join('')}
    <path d="${arch}" fill="#fff" stroke="#fff" stroke-width="40"/><path d="${arch}" fill="#3a2a1e" stroke="${INK}" stroke-width="8"/><path d="${arch}" fill="url(#hW)" opacity=".25"/>
    <path d="M168,600 C230,700 230,1100 200,1290 L168,1290 Z M912,600 C850,700 850,1100 880,1290 L912,1290 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="3"/>${lace}</svg>`;
  }
  const vec = mkVec(cam, [190, 430, 700, 867]);
  const rail = box(cam, 0, 0, 1080, 1920); {
    let bars = ''; for (let x = 140; x <= 940; x += 40) bars += `<path d="M${x},1206 V1330" stroke="${INK}" stroke-width="9"/><circle cx="${x}" cy="1268" r="9" fill="none" stroke="${INK}" stroke-width="4"/>`;
    rail.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><rect x="110" y="1180" width="860" height="30" rx="8" fill="${INK}"/>${bars}<rect x="110" y="1322" width="860" height="40" fill="${INK}"/><rect x="80" y="1352" width="920" height="40" fill="#cdb48a" stroke="${INK}" stroke-width="5"/></svg>`;
  }
  const pots = [];
  [[130, 1040]].forEach(q => {
    const d = box(cam, q[0], q[1], 200, 160); let fl = '';
    [[40, 40], [80, 20], [120, 34], [160, 48], [70, 60], [130, 64]].forEach((f, j) => { fl += `<g><path d="M${f[0]},${f[1] + 30} L100,120" stroke="#3c5a2a" stroke-width="5"/><circle cx="${f[0]}" cy="${f[1]}" r="24" fill="${j % 2 ? RED : PINK}" stroke="${INK}" stroke-width="3.5"/><circle cx="${f[0] - 8}" cy="${f[1] - 6}" r="9" fill="#fff" opacity=".45"/><circle cx="${f[0]}" cy="${f[1]}" r="5" fill="${YEL}" stroke="${INK}" stroke-width="2"/></g>`; });
    [[30, 96], [170, 96], [60, 110], [140, 110]].forEach(l => fl += `<ellipse cx="${l[0]}" cy="${l[1]}" rx="30" ry="14" fill="#7a9a52" stroke="${INK}" stroke-width="3" transform="rotate(${l[0] < 100 ? -20 : 20} ${l[0]} ${l[1]})"/>`);
    d.innerHTML = `<svg viewBox="0 0 200 160" width="200" height="160" style="overflow:visible">${fl}${cut('<path d="M30,110 L170,110 L156,160 L44,160 Z"/>', 5, 6)}<path d="M30,110 L170,110 L156,160 L44,160 Z" fill="#C1663A" stroke="${INK}" stroke-width="4"/><path d="M30,110 L170,110 L156,160 L44,160 Z" fill="url(#hA)" opacity=".5"/><rect x="24" y="104" width="152" height="16" rx="4" fill="#C1663A" stroke="${INK}" stroke-width="4"/></svg>`;
    pots.push(d);
  });
  // la pecera también está en el balcón
  const bwB = mkBowl(cam, 730, 1000, 230, { seed: 51, nb: 4, z: 6 });
  const fB = mkFish(bwB.mid, [60, 90, 120, 84]); fB.d.style.zIndex = 5;
  const tag = chip(cam, 640, 610, 'tu vecino', { size: 44, bg: PINK });
  const sign = box(cam, 120, 150, 840, 270, { zIndex: 40 });
  sign.innerHTML = `<svg width="840" height="270" style="position:absolute;left:0;top:0;overflow:visible"><path d="M160,0 L200,40 M680,0 L640,40" stroke="${INK}" stroke-width="5"/>${cut('<rect x="20" y="40" width="800" height="226" rx="22"/>')}<rect x="20" y="40" width="800" height="226" rx="22" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="36" y="56" width="768" height="194" rx="14" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
  const sl1 = el('div', sign, { left: '0', top: '62px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '76px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sl2 = el('div', sign, { left: '0', top: '146px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '90px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sw = [];
  [['Soy', K.isoy], ['tu', K.isoy + 1], ['vecino…', K.isoy + 2], ['y', K.iye], ['esto', K.iye + 1], ['no', K.iye + 2], ['venía…', K.iye + 3]].forEach(([wd, wi], k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.innerHTML = wd === 'vecino…' ? hlSpan('vecino…', 'shl') : wd; (k < 3 ? sl1 : sl2).appendChild(s); s.style.position = 'relative'; sw.push({ e: s, t: W[wi].s }); });
  const sHL = sign.querySelector('.shl');
}

/* ======================================================================
   L · …EN EL LIBRO — el libro HISTORIA se cierra de golpe
   ====================================================================== */
headline(S.L2[0], LOOP, '…en el *libro.*', { size: 96, hlT: K.libro });
{
  const TC = K.libro - 0.05;
  const c = scene(S.L2[0], LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    stand.d.style.display = sx > 0.25 ? '' : 'none';
    fishFFace(stand, t, { look: t > TC - 0.2 ? [8, -8] : [-3, 2], bL: 12, bR: 12, blink: false, mouth: t > TC - 0.2 ? 1.2 : null }); set(stand.d, { y: wobble(t, 1, 3) });
    set(bookW, { s: 1.25 * pop(t, S.L2[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    puffs.forEach((f, i) => { const kf = p(t, TC + 0.3, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 150 * kf, y: -kf * 120, s: 0.5 + kf, o: closed ? 1 - kf : 0 }); });
    popA(epl, t, TC + 0.3, { r: -1 });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="48" fill="${INK}">PECES</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="36" fill="${INK}">de colores</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const stand = mkFishF(bookW, [620, 470, 240, 240]); stand.d.style.zIndex = 2;
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '500px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const epl = el('div', c, { left: '0', top: '1150px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:34px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 19 · Tu pez no tiene memoria de 3 segundos</span>`);
  const puffs = [0, 1, 2, 3].map(() => box(bookW, 480, 600, 120, 80, { borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}`, zIndex: 3 }));
}
