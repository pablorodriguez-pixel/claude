/* Ep. 13 · escenas L5–L8 (julio/agosto, ojo, remate, CTA, balcón, libro) */

/* ======================================================================
   E1 · Y HAY MÁS: JULIO Y AGOSTO SE LLAMABAN «QUINTO» Y «SEXTO» — hojas que se dan la vuelta
   ====================================================================== */
headline(S.E1[0], K.julio - 0.06, 'Y hay *más*', { size: 120, hlT: K.mas });
headline(K.julio - 0.06, K.llamaban - 0.06, '*Julio* y *agosto*…', { size: 104 });
headline(K.llamaban - 0.06, S.E1[1], '…se llamaban *quinto* y *sexto*', { size: 80 });
{
  const CD = [];
  const c = scene(S.E1[0], S.E1[1], t => {
    CD.forEach((q, i) => {
      const tf = [K.quinto, K.sexto][i] - 0.22;
      const k = p(t, tf, 0.3, E.inOutCubic), sx = Math.max(0.02, Math.abs(1 - 2 * k));
      q.f.wrap.style.visibility = k < 0.5 ? 'visible' : 'hidden'; q.b.wrap.style.visibility = k >= 0.5 ? 'visible' : 'hidden';
      const t0 = S.E1[0] + 0.05 + i * 0.12;
      set(q.w, { sx, s: pop(t, t0, 0.4), r: [-4, 4][i] + wobble(t, 0.5, 1, i), y: Math.sin(k * Math.PI) * -40, o: t < t0 ? 0 : 1 });
      popA(q.lb, t, tf + 0.3, { r: [-6, 6][i] });
    });
    set(qm, { s: pop(t, K.llamaban, 0.3), r: Math.sin(t * 5) * 8, o: t < K.llamaban ? 0 : 1 - p(t, K.quinto - 0.2, 0.15) });
  });
  sceneBg(c, { background: '#EFE1C6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  [['JULIO', 'QUINTO', 5, 90], ['AGOSTO', 'SEXTO', 6, 610]].forEach(([fN, bN, n, x], i) => {
    const w = box(c, x, 430, 380, 520, { zIndex: 8 });
    const f = monthTile(w, 0, 0, 380, 520, fN, { hd: INK, nameCol: YEL, hdH: 96, maxName: 64 });
    { let g = ''; for (let r = 0; r < 5; r++) for (let cc = 0; cc < 6; cc++) g += `<rect x="${24 + cc * 54}" y="${130 + r * 52}" width="48" height="46" rx="6" fill="none" stroke="${INK}" stroke-width="3" opacity=".45"/>`; box(f.paper, 0, 0, 370, 500).innerHTML = `<svg width="370" height="500">${g}</svg>`; }
    const b = monthTile(w, 0, 0, 380, 520, bN, { hd: BRASS, nameCol: INK, hdH: 96, maxName: 64, num: n, numSize: 300, bg: '#F3EEE2' });
    b.wrap.style.visibility = 'hidden';
    const lb = chip(c, x + [60, 90][i], 990, ['antes: «quinto»', 'antes: «sexto»'][i], { size: 40, bg: PINK, z: 20 });
    CD.push({ w, f, b, lb });
  });
  const qm = qMark(c, 470, 560, 170);
}

/* ======================================================================
   E2 · LOS REBAUTIZARON: JULIO CÉSAR Y AUGUSTO — dos bustos con placas
   ====================================================================== */
headline(S.E2[0], K.honor - 0.06, 'Los *rebautizaron*', { size: 104, hlT: K.rebau });
headline(K.honor - 0.06, S.E2[1], 'En honor a *Julio César* y a *Augusto*', { size: 70 });
{
  const c = scene(S.E2[0], S.E2[1], t => {
    set(ry, { r: t * 10 });
    [[ces, K.julioC, 0], [aug, K.augusto, 1]].forEach(([f, tn, i]) => {
      const t0 = S.E2[0] + 0.02 + i * 0.16;
      const proud = t > tn && t < tn + 0.9;
      set(f.d, { y: (1 - p(t, t0, 0.45, E.outBack)) * 800 + wobble(t, 0.5, 3, i) - (proud ? 16 * p(t, tn, 0.2, E.outBack) : 0), s: 1 + (proud ? 0.05 : 0) });
      face(f, t, { look: proud ? [0, -3] : [i ? -8 : 8, 0], closed: proud && t > tn + 0.15 && t < tn + 0.6, brow: proud ? -6 : 0, seed: i * 1.3 });
    });
    popA(nC, t, K.julioC, { r: -4 }); popA(nA, t, K.augusto, { r: 4 });
    popA(plC, t, K.cesar + 0.05, { r: -2, rise: 40 }); popA(plA, t, K.augusto + 0.2, { r: 2, rise: 40 });
    popA(rb, t, K.rebau + 0.05, { r: -5 }); rb.style.opacity = t < K.rebau + 0.05 ? 0 : 1 - p(t, K.julioC - 0.2, 0.2);
  }, { clip: true });
  sceneBg(c, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.10) 0 3px, transparent 3px 58px)' });
  const ry = rays(c, -170, 380, 1420, 22, 'rgba(255,230,0,.22)', 'rgba(0,0,0,0)', 0);
  const ces = mkRoman(c, [30, 470, 500, 639], { seed: 71, hair: 'thin', gold: true, stripe: '#6b2a7a' }); ces.d.style.zIndex = 4;
  const aug = mkRoman(c, [550, 470, 500, 639], { seed: 72, hair: 'curly', stripe: '#7a2a3a' }); aug.d.style.zIndex = 4;
  const nC = chip(c, 90, 430, 'JULIO CÉSAR', { size: 44, bg: INK, color: YEL, z: 20 });
  const nA = chip(c, 680, 430, 'AUGUSTO', { size: 44, bg: INK, color: YEL, z: 20 });
  const plC = plaque(c, 40, 1110, 480, 'QUINTO → <b style="color:#C8102E">JULIO</b>', { size: 40 });
  const plA = plaque(c, 560, 1110, 480, 'SEXTO → <b style="color:#C8102E">AGOSTO</b>', { size: 40 });
  const rb = stamp(c, 260, 900, 'REBAUTIZADOS', { size: 80, bw: 11, z: 30, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
}

/* ======================================================================
   F1 · ¡OJO! DICEN QUE AUGUSTO LE QUITÓ UN DÍA A FEBRERO — día robado, Augusto sospechoso
   ====================================================================== */
headline(K.dicen - 0.1, K.quito - 0.06, 'Dicen que *Augusto*…', { size: 100, hlT: K.augusto2 });
headline(K.quito - 0.06, S.F1[1], '…le quitó un *día* a febrero', { size: 84, hlT: K.dia });
{
  const HOLE = [3, 4];
  const c = scene(S.F1[0], S.F1[1], t => {
    const kt = p(t, K.ojo + 0.6, 0.3, E.inOutCubic), k0 = p(t, K.ojo, 0.18, E.outCubic);
    set(ojo, { s: t < K.ojo ? 0 : lerp(lerp(2.4, 1, k0), 0.4, kt), x: kt * 330, y: kt * -300, r: -10, o: t < K.ojo ? 0 : 1 });
    set(fb.wrap, { s: pop(t, K.dicen - 0.05, 0.4), r: -4 + wobble(t, 0.5, 1), o: t < K.dicen - 0.05 ? 0 : 1 });
    set(aug.d, { x: (1 - p(t, K.augusto2 - 0.15, 0.4, E.outBack)) * 700, y: wobble(t, 0.6, 3) });
    const shifty = t > K.quito;
    face(aug, t, { look: shifty ? [Math.sin(t * 7) > 0 ? -10 : 10, 2] : [-8, 0], half: shifty, blink: !shifty, brow: shifty ? 4 : 0, seed: 0.4 });
    // el día viaja de febrero a Augusto
    const kd = p(t, K.quito, 0.6, E.inOutCubic);
    const a = [330, 765], b = [700, 990];
    set(day, { x: lerp(0, b[0] - a[0], kd), y: lerp(0, b[1] - a[1], kd) - Math.sin(kd * Math.PI) * 200, r: kd * 380, s: 1 + Math.sin(kd * Math.PI) * 0.6, o: t < K.dicen - 0.05 ? 0 : 1 });
    hole.style.opacity = t > K.quito ? 1 : 0;
    popA(m1, t, K.dia + 0.05, { r: -6 });
    set(sw, { o: shifty ? 1 : 0, y: shifty ? ((t * 90) % 40) : 0 });
    popA(an, t, K.augusto2, { r: 5 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const fb = monthTile(c, 70, 460, 400, 480, 'FEBRERO', { hd: PINK, nameCol: '#fff', hdH: 96, maxName: 56 }); fb.wrap.style.zIndex = 6;
  for (let r = 0; r < 5; r++) for (let cc = 0; cc < 6; cc++) { if (r === HOLE[0] && cc === HOLE[1]) continue; if (r === 4 && cc > HOLE[1]) continue; box(fb.paper, 26 + cc * 56, 116 + r * 56, 48, 48, { border: `3px solid rgba(43,33,24,.5)`, borderRadius: '6px', background: '#fff' }); }
  const hole = box(fb.paper, 26 + HOLE[1] * 56, 116 + HOLE[0] * 56, 48, 48, { border: `4px dashed ${RED}`, borderRadius: '6px', background: 'rgba(200,16,46,.12)', zIndex: 3 });
  const day = dayBox(c, 70 + 26 + HOLE[1] * 56 + 5, 460 + 16 + 116 + HOLE[0] * 56 + 5, 48, '', { z: 40 });
  day.style.background = YEL;
  const aug = mkRoman(c, [470, 470, 560, 716], { seed: 72, hair: 'curly', stripe: '#7a2a3a' }); aug.d.style.zIndex = 4;
  const sw = el('div', c, { left: '890px', top: '600px', fontSize: '64px', color: '#fff', textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 20 }, '💧');
  const an = chip(c, 640, 1190, 'Augusto', { size: 44, bg: INK, color: YEL, z: 20 });
  const m1 = chip(c, 140, 720, '−1 día', { size: 54, bg: RED, color: '#fff', z: 30 });
  const ojo = stamp(c, 230, 620, '¡OJO!', { size: 210, bw: 18, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   F2 · «PARA QUE SU MES NO FUERA MÁS CORTO» — JULIO vs AGOSTO, el día se coloca encima
   ====================================================================== */
headline(S.F2[0], K.fuera - 0.06, 'Para que *su mes*…', { size: 100, hlT: K.sumes });
headline(K.fuera - 0.06, S.F2[1], '…no fuera más *corto*', { size: 100, hlT: K.corto });
{
  const c = scene(S.F2[0], S.F2[1], t => {
    set(ju.wrap, { s: pop(t, S.F2[0] + 0.02, 0.35), o: 1 });
    set(ag.wrap, { s: pop(t, S.F2[0] + 0.12, 0.35), o: 1 });
    const kg = pop(t, K.corto, 0.3);
    set(agIn, { o: 1 });
    const kd = p(t, K.sumes, 0.5, E.outBounce);
    set(day, { y: (1 - kd) * -700, r: (1 - kd) * 40, s: 1 + 0.1 * (kg > 0 ? Math.sin(Math.min(1, (t - K.corto) / 0.3) * Math.PI) : 0), o: t < K.sumes ? 0 : 1 });
    ln.style.opacity = t > K.fuera ? 1 : 0;
    set(au.d, { y: wobble(t, 0.7, 4), x: Math.sin(t * 3) * 6 });
    face(au, t, { look: [-8, -4], half: true, blink: false, brow: 4 });
    popA(eq, t, K.corto + 0.2, { r: -6 });
  });
  sceneBg(c, { background: '#EFE1C6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const ju = monthTile(c, 150, 480, 340, 560, 'JULIO', { hd: INK, nameCol: YEL, hdH: 90, maxName: 60 }); ju.wrap.style.transformOrigin = '50% 100%';
  const agIn = box(c, 590, 600, 340, 440, { zIndex: 8, transformOrigin: '50% 100%' });
  const ag = monthTile(agIn, 0, 0, 340, 440, 'AGOSTO', { hd: RED, nameCol: '#fff', hdH: 90, maxName: 60 });
  const day = dayBox(c, 690, 496, 120, '+1 día', { z: 30, bg: YEL }); day.style.fontSize = '34px'; day.style.lineHeight = '106px';
  const ln = box(c, 120, 490, 840, 8, { borderTop: `6px dashed ${RED}`, zIndex: 20 });
  const au = mkRoman(c, [760, 1000, 260, 332], { seed: 72, hair: 'curly', stripe: '#7a2a3a' }); au.d.style.zIndex = 12;
  const eq = chip(c, 300, 1080, 'dicen…', { size: 48, bg: PINK, z: 30 });
}

/* ======================================================================
   F3 · ES UN BULO. NO HAY NINGUNA PRUEBA.
   ====================================================================== */
headline(S.F3[0], K.nohay - 0.06, 'Es un *bulo*', { size: 120, hlT: K.bulo, hlc: '#ff9aa8' });
headline(K.nohay - 0.06, S.F3[1], 'No hay ninguna *prueba*', { size: 84, hlT: K.prueba });
{
  const c = scene(S.F3[0], S.F3[1], t => {
    set(aug.d, { y: wobble(t, 0.6, 3), s: 1 + 0.03 * p(t, S.F3[0], 2.6, E.linear) });
    const cl = t > K.bulo + 0.1 && t < K.nohay;
    face(aug, t, { look: t > K.nohay ? [8, 2] : [0, 0], closed: cl, brow: t > K.bulo ? -8 : 0, seed: 0.9 });
    const ks = p(t, K.bulo, 0.17, E.outCubic), kb2 = p(t, K.nohay - 0.15, 0.3, E.inOutCubic); set(bl, { s: t < K.bulo ? 0 : lerp(lerp(2.4, 1, ks), 0.5, kb2), x: kb2 * -170, y: kb2 * -250, r: -12, o: t < K.bulo ? 0 : 1 });
    bl.style.textShadow = glitch(t, K.bulo, 0.25);
    set(fold, { s: pop(t, K.nohay - 0.1, 0.4), r: 4 + wobble(t, 0.5, 1), o: t < K.nohay - 0.1 ? 0 : 1 });
    const kl = pop(t, K.ninguna - 0.1, 0.35);
    set(lens, { s: kl * 0.62, x: Math.sin(t * 6) * 40, y: Math.cos(t * 5) * 20, r: -8, o: t < K.ninguna - 0.1 ? 0 : 1 });
    stampA(sp, t, K.prueba + 0.05, -6, 1);
  });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const aug = mkRoman(c, [130, 520, 460, 588], { seed: 72, hair: 'curly', stripe: '#7a2a3a' }); aug.d.style.zIndex = 4;
  const fold = box(c, 620, 560, 380, 330, { zIndex: 8 });
  fold.innerHTML = `<svg width="380" height="330" style="overflow:visible">${cut('<path d="M10,40 H140 L170,10 H370 V320 H10 Z"/>')}<path d="M10,40 H140 L170,10 H370 V320 H10 Z" fill="#D9B98A" stroke="${INK}" stroke-width="6"/><path d="M10,40 H140 L170,10 H370 V320 H10 Z" fill="url(#hA)" opacity=".25"/><rect x="40" y="80" width="300" height="210" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/><text x="190" y="140" text-anchor="middle" font-family="Rye" font-size="44" fill="${INK}">PRUEBAS</text><path d="M80,170 H300" stroke="${INK}" stroke-width="4"/><text x="190" y="252" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="90" fill="${RED}">—</text></svg>`;
  const lens = box(c, 640, 560, 300, 300, { zIndex: 12 }); lens.innerHTML = LUPA(`<text x="150" y="196" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="130" fill="${PINK}" stroke="${INK}" stroke-width="3">?</text>`);
  const bl = stamp(c, 150, 600, 'BULO', { size: 230, bw: 20, z: 60, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
  const sp = stamp(c, 390, 960, 'SIN PRUEBAS', { size: 78, bw: 12, z: 61, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
}

/* ======================================================================
   HIT 2 · GOLPE ROSA (citable): TODA LA VIDA LLAMANDO «SÉPTIMO» AL MES NUEVE
   ====================================================================== */
colorHit(S.HIT2[0], S.HIT2[1], PINK, c => {
  const os = el('div', c, { left: 0, top: '190px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '76px', color: INK, zIndex: 6 }, 'O sea:');
  const l1 = el('div', c, { left: 0, top: '290px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '84px', color: INK, zIndex: 6, whiteSpace: 'nowrap' }, 'Toda la vida llamando');
  const big = el('div', c, { left: 0, top: '390px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '220px', color: '#fff', textShadow: OUTL(INK, 12), zIndex: 8, whiteSpace: 'nowrap' }, '«SÉPTIMO»');
  const al = el('div', c, { left: '70px', top: '720px', width: '480px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '120px', lineHeight: 1, color: INK, zIndex: 6 }, 'al mes');
  const cal = box(c, 560, 640, 440, 560, { zIndex: 5 });
  let rings = ''; for (let k = 0; k < 5; k++) rings += `<rect x="${70 + k * 75}" y="0" width="22" height="70" rx="11" fill="${INK}" stroke="${PINK}" stroke-width="4"/>`;
  cal.innerHTML = `<svg width="440" height="560" style="overflow:visible"><rect x="0" y="40" width="440" height="520" rx="22" fill="${INK}"/>${rings}<rect x="30" y="100" width="380" height="20" fill="${PINK}" opacity=".6"/></svg>`;
  const n9 = el('div', cal, { left: '0', top: '130px', width: '440px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '400px', lineHeight: 1, color: YEL, zIndex: 3 }, '9');
  const sil = mkVec(c, [60, 860, 380, 470]); sil.d.style.filter = SIL; sil.d.style.zIndex = 4;
  return t => {
    popA(os, t, K.osea, { rise: 30 });
    popA(l1, t, K.llevas, { rise: 30 });
    const kb = p(t, K.septimo2 - 0.04, 0.2, E.outBack); set(big, { s: t < K.septimo2 - 0.04 ? 0 : lerp(1.6, 1, kb), r: -3, o: t < K.septimo2 - 0.04 ? 0 : 1 });
    big.style.textShadow = (glitch(t, K.septimo2, 0.3) ? glitch(t, K.septimo2, 0.3) + ', ' : '') + OUTL(INK, 12);
    popA(al, t, K.al, { rise: 40, r: -3 });
    set(cal, { s: pop(t, K.mes2 - 0.05, 0.35), r: 6 + wobble(t, 0.5, 1.5), o: t < K.mes2 - 0.05 ? 0 : 1 });
    { const k = p(t, K.nueve2, 0.18); set(n9, { s: t < K.nueve2 ? 0 : lerp(1.9, 1, k), o: t < K.nueve2 ? 0 : 1 }); }
    n9.style.textShadow = glitch(t, K.nueve2, 0.3);
    set(sil.d, { y: wobble(t, 0.8, 4) + (1 - p(t, S.HIT2[0] + 0.1, 0.4, E.outBack)) * 600 });
    vecFace(sil, t, { jaw: talkW(t, 'VECINO') * 0.6, fan: Math.sin(t * 18) * 14, noCup: true });
  };
});

/* ======================================================================
   CTA · ¿TE HABÍAS DADO CUENTA? SÍ O NO — botones gigantes
   ====================================================================== */
headline(S.CTA[0], K.si - 0.06, '¿Te habías dado *cuenta?*', { size: 84, hlT: K.cuenta2 });
headline(K.si - 0.06, S.CTA[1], '*¿Sí o no?*', { size: 120, hlT: K.si });
{
  const CM = [];
  const c = scene(S.CTA[0], S.CTA[1], t => {
    set(vec.d, { y: wobble(t, 0.5, 3), s: 1 + 0.03 * p(t, S.CTA[0], 2.8, E.linear) });
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t < K.si ? [0, 0] : [-4, 6], bL: t > K.cuenta2 - 0.2 && t < K.si ? 12 : 2, bR: t > K.cuenta2 - 0.2 && t < K.si ? 16 : 6, noCup: true, fan: wobble(t, 0.8, 5), seed: 2 });
    [[bS, K.si], [bN, K.noB]].forEach(([b, t0], i) => { const press = t > t0 + 0.35 && t < t0 + 0.5; set(b, { s: pop(t, S.CTA[0] + 0.2 + i * 0.12, 0.4) * (press ? 0.9 : 1 + 0.06 * Math.max(0, Math.sin((t - t0) * 9)) * (t > t0 ? 1 : 0)), r: [-3, 3][i], o: t < S.CTA[0] + 0.2 + i * 0.12 ? 0 : 1 }); });
    set(hand, { o: t > K.si ? 1 : 0, y: (t > K.si + 0.3 && t < K.si + 0.5 ? 14 : 0) + Math.sin(t * 5) * 6, s: pop(t, K.si, 0.3) });
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
  }, { clip: true });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, #F4CFDA 0 30px, #F9E3EA 30px 60px)` });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,.4), rgba(120,40,60,.3) 85%)' });
  const vec = mkVec(c, [470, 420, 440, 545]);
  const btn = (x, txt, bg, col) => el('div', c, { left: px(x), top: '1020px', width: '380px', height: '210px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '196px', color: col, background: bg, border: `8px solid ${INK}`, borderRadius: '40px', boxShadow: `10px 12px 0 ${INK}`, zIndex: 30 }, txt);
  const bS = btn(120, 'SÍ', YEL, INK), bN = btn(560, 'NO', '#fff', RED);
  const hand = box(c, 320, 1150, 160, 200, { zIndex: 40 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="160" height="160" style="overflow:visible">${gloveHand(0, 0, 160, 1.2)}</svg>`;
  const cms = [['FAR', '@marta_cal', 'SÍ 😳', K.te + 0.35], ['SOL', '@jon.bcn', 'No, ya lo sabía', K.te + 0.75], ['MEREDITH', '@lu_92', '¡Ahora lo veo!', K.cuenta2]];
  cms.forEach((m, i) => {
    const e = box(c, 40, [480, 630, 780][i], 430, 112, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 40 });
    avatar(e, 10, 10, 84, m[0], { bw: 3 });
    el('div', e, { left: '108px', top: '8px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '26px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]);
    el('div', e, { left: '108px', top: '40px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '36px', color: INK, whiteSpace: 'nowrap' }, m[2]);
    CM.push({ e, t: m[3] });
  });
}

/* ======================================================================
   C · MARCA (ÚLTIMA FRASE): EL VECINO EN SU BALCÓN — rápido
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
  [[130, 1040], [760, 1040]].forEach(q => {
    const d = box(cam, q[0], q[1], 200, 160); let fl = '';
    [[40, 40], [80, 20], [120, 34], [160, 48], [70, 60], [130, 64]].forEach((f, j) => { fl += `<g><path d="M${f[0]},${f[1] + 30} L100,120" stroke="#3c5a2a" stroke-width="5"/><circle cx="${f[0]}" cy="${f[1]}" r="24" fill="${j % 2 ? RED : PINK}" stroke="${INK}" stroke-width="3.5"/><circle cx="${f[0] - 8}" cy="${f[1] - 6}" r="9" fill="#fff" opacity=".45"/><circle cx="${f[0]}" cy="${f[1]}" r="5" fill="${YEL}" stroke="${INK}" stroke-width="2"/></g>`; });
    [[30, 96], [170, 96], [60, 110], [140, 110]].forEach(l => fl += `<ellipse cx="${l[0]}" cy="${l[1]}" rx="30" ry="14" fill="#7a9a52" stroke="${INK}" stroke-width="3" transform="rotate(${l[0] < 100 ? -20 : 20} ${l[0]} ${l[1]})"/>`);
    d.innerHTML = `<svg viewBox="0 0 200 160" width="200" height="160" style="overflow:visible">${fl}${cut('<path d="M30,110 L170,110 L156,160 L44,160 Z"/>', 5, 6)}<path d="M30,110 L170,110 L156,160 L44,160 Z" fill="#C1663A" stroke="${INK}" stroke-width="4"/><path d="M30,110 L170,110 L156,160 L44,160 Z" fill="url(#hA)" opacity=".5"/><rect x="24" y="104" width="152" height="16" rx="4" fill="#C1663A" stroke="${INK}" stroke-width="4"/></svg>`;
    pots.push(d);
  });
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
   L · …EN EL LIBRO — el libro HISTORIA se cierra de golpe (Ep. 13 pequeño) → bucle
   ====================================================================== */
headline(S.L2[0], LOOP, '…en el *libro.*', { size: 96, hlT: K.libro });
{
  const TC = K.libro - 0.05;
  const c = scene(S.L2[0], LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    set(bookW, { s: 1.25 * pop(t, S.L2[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    set(mini, { y: wobble(t, 1, 3), r: -6, o: sx > 0.25 ? 1 : 0 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    puffs.forEach((f, i) => { const kf = p(t, TC + 0.3, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 150 * kf, y: -kf * 120, s: 0.5 + kf, o: closed ? 1 - kf : 0 }); });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="48" fill="${INK}">EL AÑO</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="36" fill="${INK}">y sus meses</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const mini = monthTile(bookW, 640, 700, 220, 240, 'SEPTIEMBRE', { num: 9, hd: RED, nameCol: '#fff', maxName: 34, numCol: RED }).wrap; mini.style.zIndex = 2;
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '500px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const epl = el('div', c, { left: '0', top: '1150px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:38px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 13 · Septiembre significa séptimo</span>`);
  const _fe = SC[SC.length - 1].fn; SC[SC.length - 1].fn = t => { _fe(t); popA(epl, t, TC + 0.3, { r: -1 }); };
  const puffs = [0, 1, 2, 3].map(() => box(bookW, 480, 600, 120, 80, { borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}`, zIndex: 3 }));
}
