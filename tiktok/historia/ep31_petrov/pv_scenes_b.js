/* Ep. 31 · escenas L6–L13 (todo clavado por texto vía K) */

/* ======================================================================
   G1 · «UN ATAQUE DE VERDAD SERÍAN CIENTOS, NO CINCO.» — dos paneles: DE VERDAD (cientos) | LA PANTALLA (5)
   ====================================================================== */
headline(S.G1[0], K.no6 - 0.06, 'De verdad serían *cientos*', { size: 88, hlT: K.cientos, y: 196, color: '#fff', hlc: RED });
headline(K.no6 - 0.06, S.G1[1], 'no *cinco*', { size: 124, hlT: K.cinco6, y: 186, color: '#fff', hlc: RED });
{
  const RK = [], R5 = [];
  const c = scene(S.G1[0], S.G1[1], t => {
    popA(pL, t, S.G1[0] + 0.02, { r: -1.5 }); popA(pR, t, S.G1[0] + 0.15, { r: 1.5 });
    RK.forEach(q => set(q.e, { s: pop(t, q.t, 0.2) * q.s, r: q.r, o: t < q.t ? 0 : 1, y: t > q.t ? -(t - q.t) * 30 : 0 }));
    R5.forEach(q => set(q.e, { s: pop(t, q.t, 0.25) * 1.3, r: q.r, o: t < q.t ? 0 : 1, y: t > q.t ? -(t - q.t) * 20 : 0 }));
    popA(lC, t, K.cientos + 0.1, { r: -5 });
    stampA(st5, t, K.cinco6, -8, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#3a2c20' });
  const panel = (x, lab, bg) => { const d = box(c, x, 400, 460, 860, { zIndex: 2 }); d.innerHTML = `<svg width="460" height="860" style="overflow:visible">${cut('<rect x="0" y="0" width="460" height="860" rx="26"/>')}<rect x="0" y="0" width="460" height="860" rx="26" fill="${bg}" stroke="${INK}" stroke-width="7"/><rect x="0" y="0" width="460" height="860" rx="26" fill="url(#hP)" opacity=".4"/><path d="M30,760 Q120,720 230,750 T430,740 L430,830 L30,830 Z" fill="#B9C79A" stroke="${INK}" stroke-width="5"/></svg>`; el('div', d, { left: 0, top: '22px', width: '460px', textAlign: 'center', fontFamily: 'Rye', fontSize: '46px', color: INK, zIndex: 3 }, lab); return d; };
  const pL = panel(60, 'DE VERDAD', '#C9D3D8'), pR = panel(560, 'LA PANTALLA', '#E9C6BE');
  const r = rng(31);
  for (let i = 0; i < 64; i++) { const e = box(pL, 20 + r() * 400, 100 + r() * 600, 30, 80, { zIndex: 4 }); e.innerHTML = rocketSvg(); RK.push({ e, t: K.cientos - 0.15 + r() * 0.55, s: 0.6 + r() * 0.5, r: (r() - 0.5) * 30 }); }
  [[140, 380], [300, 300], [210, 520], [90, 600], [330, 560]].forEach((q, i) => { const e = box(pR, q[0], q[1], 36, 96, { zIndex: 4 }); e.innerHTML = rocketSvg(); R5.push({ e, t: S.G1[0] + 0.3 + i * 0.07, r: (i - 2) * 6 }); });
  const lC = stamp(pL, 40, 380, 'CIENTOS', { size: 74, bw: 10, z: 20, bg: 'rgba(255,255,255,.94)', blend: 'normal', col: INK });
  const st5 = stamp(pR, 150, 640, '5', { size: 150, bw: 13, z: 20, bg: YEL, col: INK, blend: 'normal', font: 'Playfair' }); st5.style.fontWeight = 900;
}

/* ======================================================================
   G2 · «Y EL SISTEMA ERA NUEVO.» — la máquina con su etiqueta de «NUEVO» todavía colgando
   ====================================================================== */
headline(S.G2[0], S.G2[1], 'Y el sistema era *nuevo*', { size: 100, hlT: K.nuevo });
{
  const c = scene(S.G2[0], S.G2[1], t => {
    set(crt.d, { s: pop(t, S.G2[0] + 0.02, 0.35), r: 2 + (t > K.nuevo + 0.2 ? Math.sin(t * 60) * 0.8 : 0), o: 1 });
    crtState(crt, t, 'red');
    const kt = p(t, K.nuevo - 0.08, 0.5, E.outElastic);
    set(tag, { s: 1.35, y: (1 - clamp(kt)) * -500, r: Math.sin((t - K.nuevo) * 6) * 14 * Math.exp(-Math.max(0, t - K.nuevo) * 1.5), o: t < K.nuevo - 0.08 ? 0 : 1 });
    popA(chS, t, K.sistema, { r: -4 });
    SP.forEach((s, i) => { const t0 = K.nuevo + 0.25 + i * 0.12; set(s, { s: pop(t, t0, 0.2), o: t > t0 && t < t0 + 0.5 ? 1 : 0, r: t * 300 }); });
    set(dr, { o: t > K.nuevo + 0.3 ? 1 : 0, y: (t - K.nuevo - 0.3) * 80 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const crt = mkCRT(c, 370, 560, 560, 460, { z: 4, size: 110 });
  const eyes = el('div', crt.scr, { left: '0', top: '230px', width: '470px', textAlign: 'center', fontSize: '0', zIndex: 6 }, `<svg width="200" height="70" style="overflow:visible"><ellipse cx="50" cy="35" rx="26" ry="30" fill="#fff" stroke="${INK}" stroke-width="5"/><ellipse cx="150" cy="35" rx="26" ry="30" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="58" cy="44" r="11" fill="${INK}"/><circle cx="142" cy="44" r="11" fill="${INK}"/></svg>`);
  void eyes;
  const tag = box(c, 680, 1000, 220, 300, { zIndex: 8, transformOrigin: '30px 0px' });
  tag.innerHTML = `<svg width="220" height="300" style="overflow:visible"><path d="M30,0 Q20,60 60,90" stroke="${INK}" stroke-width="4" fill="none"/>${cut('<path d="M40,80 L170,80 L170,250 L40,250 L20,165 Z"/>', 4, 6)}<path d="M40,80 L170,80 L170,250 L40,250 L20,165 Z" fill="${YEL}" stroke="${INK}" stroke-width="5"/><circle cx="44" cy="165" r="9" fill="#fff" stroke="${INK}" stroke-width="3"/></svg>`;
  el('div', tag, { left: '30px', top: '118px', width: '150px', textAlign: 'center', fontFamily: 'Rye', fontSize: '38px', color: INK, transform: 'rotate(-90deg) translate(-40px,0)' }, '');
  el('div', tag, { left: '50px', top: '128px', width: '120px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '36px', lineHeight: 1.05, color: INK }, '¡NUEVO!<br><span style="font-family:SpecialElite;font-size:24px;font-weight:400">a estrenar</span>');
  const chS = chip(c, 420, 1070, 'el sistema', { size: 50, bg: INK, color: YEL, z: 20 });
  const SP = [0, 1, 2].map(i => el('div', c, { left: px(400 + i * 180), top: px(520 - (i % 2) * 40), fontSize: '64px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 9 }, '✦'));
  const dr = el('div', c, { left: '880px', top: '600px', zIndex: 9 }, `<svg width="40" height="60" style="overflow:visible"><path d="M20,0 C30,20 40,34 40,44 A20,20 0 0,1 0,44 C0,34 10,20 20,0 Z" fill="#9fd3f0" stroke="${INK}" stroke-width="4"/></svg>`);
}

/* ======================================================================
   H1 · GOLPE AMARILLO: «¡ACERTÓ!»
   ====================================================================== */
colorHit(S.H1[0], S.H1[1], YEL, c => {
  const big = el('div', c, { left: 0, top: '330px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '172px', lineHeight: 1, color: '#fff', textShadow: OUTL(INK, 10), zIndex: 10 }, '¡ACERTÓ!');
  const sl = mk(c, [300, 640, 480, 614], silPhoneInner(), '0 0 360 460', 'bust'); sl.d.style.zIndex = 5; sl.d.style.filter = SIL;
  const ck = box(c, 640, 560, 260, 260, { zIndex: 12 }); ck.innerHTML = `<svg viewBox="0 0 100 100" width="260" height="260" style="overflow:visible"><path d="M12,54 L40,82 L92,14" stroke="${INK}" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M12,54 L40,82 L92,14" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
  return t => {
    const kb = p(t, S.H1[0], 0.2, E.outBack);
    set(big, { s: lerp(1.6, 1, kb), r: -3, o: 1 });
    set(sl.d, { y: (1 - p(t, S.H1[0], 0.3, E.outCubic)) * 300 });
    set(ck, { s: pop(t, S.H1[0] + 0.15, 0.3), r: -8, o: t < S.H1[0] + 0.15 ? 0 : 1 });
  };
});

/* ======================================================================
   H2 · «ERA EL SOL, REFLEJADO EN NUBES ALTAS.» — el sol guiña; el rayo rebota en la nube y sube al satélite
   ====================================================================== */
headline(S.H2[0], K.reflejado - 0.06, 'Era *el sol…*', { size: 120, hlT: K.sol, y: 196, color: '#fff', hlc: '#C9A24A' });
headline(K.reflejado - 0.06, S.H2[1], 'reflejado en *nubes altas*', { size: 88, hlT: K.altas, y: 200, color: '#fff', hlc: '#C9A24A' });
{
  const c = scene(S.H2[0], S.H2[1], t => {
    set(sun.d, { s: pop(t, S.H2[0] + 0.02, 0.4), r: t * 8, o: 1 });
    const wk = t > K.sol && t < K.sol + 0.45;
    sun.d.querySelector('.eyeR').style.opacity = wk ? 0 : 1; sun.d.querySelector('.wink').style.opacity = wk ? 1 : 0;
    set(cl, { x: Math.sin(t * 0.8) * 10 });
    const k1 = p(t, K.reflejado - 0.05, 0.45, E.inOutCubic), k2 = p(t, K.altas + 0.15, 0.5, E.inOutCubic);
    ray1.style.strokeDashoffset = f1(1000 * (1 - k1)); ray2.style.strokeDashoffset = f1(1000 * (1 - k2));
    set(gl, { s: t > K.nubes - 0.05 ? (1 + 0.25 * Math.sin(t * 14)) * pop(t, K.nubes - 0.05, 0.3) : 0, r: t * 140, o: t > K.nubes - 0.05 ? 1 : 0 });
    popA(chN, t, K.altas, { r: -3 });
    set(sat.d, { x: Math.sin(t * 1.4) * 8, y: Math.cos(t * 1.2) * 6, r: -6, s: pop(t, S.H2[0] + 0.15, 0.4) });
    face(sat, t, { look: t > K.altas + 0.4 ? [-6, 8] : [-4, 2], seed: 0.6 });
    set(alt, { o: k1 > 0.95 ? 1 : 0 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #2f3550 0%, #6b7aa0 38%, #C9C3B8 62%, #8a9a8a 100%)' });
  STARS(c);
  const sun = mk(c, [60, 380, 340, 340], sunInner(), '0 0 360 360', 'sun'); sun.d.style.zIndex = 4;
  const cl = box(c, 0, 0, 1080, 1920, { zIndex: 5 }); cl.innerHTML = cloudSvg(1080, 1920, 260, 1060, 1.3) + cloudSvg(1080, 1920, 600, 1000, 1.5) + cloudSvg(1080, 1920, 880, 1090, 1.0);
  const alt = el('div', c, { left: '90px', top: '880px', fontFamily: 'SpecialElite', fontSize: '34px', color: '#fff', zIndex: 6, textShadow: `2px 2px 0 ${INK}` }, '↕ muy, muy arriba');
  const rl = box(c, 0, 0, 1080, 1920, { zIndex: 7 });
  rl.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" class="r1" d="M260,640 L560,980" stroke="${YEL}" stroke-width="18" stroke-linecap="round"/><path pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" class="r2" d="M560,980 L740,640" stroke="${YEL}" stroke-width="18" stroke-linecap="round"/></svg>`;
  const ray1 = rl.querySelector('.r1'), ray2 = rl.querySelector('.r2');
  const gl = el('div', c, { left: '510px', top: '920px', fontSize: '120px', lineHeight: 1, color: '#fff', textShadow: `0 0 20px ${YEL}, 3px 3px 0 ${INK}`, zIndex: 8 }, '✦');
  const chN = chip(c, 420, 1150, 'nubes altas', { size: 50, bg: '#fff', color: INK, z: 20 });
  const sat = mk(c, [560, 420, 380, 219], satInner(), '0 0 520 300', 'sat'); sat.d.style.zIndex = 9;
}
function STARS(c) { const r = rng(7); let s = ''; for (let i = 0; i < 40; i++) s += `<circle cx="${f1(r() * 1080)}" cy="${f1(180 + r() * 520)}" r="${f1(1.5 + r() * 2.5)}" fill="#fff" opacity="${f1(0.4 + r() * 0.5)}"/>`; box(c, 0, 0, 1080, 1920, { zIndex: 1 }).innerHTML = `<svg width="1080" height="1920">${s}</svg>`; }

/* ======================================================================
   H3 · «EL SATÉLITE LO TOMÓ POR UN COHETE.» — en la cabeza del satélite, el destello se convierte en cohete
   ====================================================================== */
headline(S.H3[0], S.H3[1], 'Lo tomó por *un cohete*', { size: 92, hlT: K.cohete, y: 196, color: '#fff', hlc: RED });
{
  const c = scene(S.H3[0], S.H3[1], t => {
    set(sat.d, { s: pop(t, S.H3[0] + 0.02, 0.35), y: wobble(t, 0.6, 5), r: -3 });
    const sure = t > K.cohete - 0.05;
    face(sat, t, { look: [6, -10], brow: sure ? -10 : t > K.tomo ? -4 : 0, seed: 0.2, blink: false });
    set(th, { s: pop(t, S.H3[0] + 0.25, 0.35), o: t < S.H3[0] + 0.25 ? 0 : 1, r: -2 });
    const km = p(t, K.cohete - 0.1, 0.25, E.outBack);
    set(gs, { s: (1 - clamp(km)) * (1 + 0.2 * Math.sin(t * 12)), r: t * 120 });
    set(rk, { s: km, r: 12 + Math.sin(t * 9) * 3, y: Math.sin(t * 16) * 3 });
    set(qq, { s: pop(t, K.tomo, 0.3), o: t > K.tomo && t < K.cohete - 0.1 ? 1 : 0 });
    stampA(stC, t, K.cohete + 0.08, -6, 1);
    popA(cA, t, K.cohete + 0.25, { r: -2 }); popA(cB, t, K.cohete + 0.35, { r: 2 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #2f3550 0%, #4a5578 100%)' });
  STARS(c);
  const sat = mk(c, [150, 640, 780, 450], satInner(), '0 0 520 300', 'sat'); sat.d.style.zIndex = 4;
  const th = box(c, 360, 330, 520, 320, { zIndex: 6 });
  th.innerHTML = `<svg width="520" height="320" style="overflow:visible"><circle cx="40" cy="300" r="14" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="90" cy="260" r="22" fill="#fff" stroke="${INK}" stroke-width="5"/>${cut('<ellipse cx="300" cy="140" rx="210" ry="130"/>')}<ellipse cx="300" cy="140" rx="210" ry="130" fill="#fff" stroke="${INK}" stroke-width="6"/></svg>`;
  const gs = el('div', th, { left: '240px', top: '70px', fontSize: '130px', lineHeight: 1, color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦');
  const rk = box(th, 260, 30, 80, 220, { zIndex: 4 }); rk.innerHTML = rocketSvg();
  const qq = el('div', th, { left: '400px', top: '40px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '90px', color: PINK, textShadow: OUTL(INK, 4), zIndex: 5 }, '?');
  const stC = stamp(c, 560, 560, '¡COHETE!', { size: 70, bw: 10, z: 30, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
  const card = (x, lab, inner, col) => { const d = box(c, x, 1120, 380, 170, { zIndex: 20 }); d.innerHTML = `<svg width="380" height="170" style="overflow:visible">${cut('<rect x="0" y="0" width="380" height="170" rx="20"/>', 4, 6)}<rect x="0" y="0" width="380" height="170" rx="20" fill="${col}" stroke="${INK}" stroke-width="5"/></svg>`; el('div', d, { left: '16px', top: '16px', width: '220px', fontFamily: 'Rye', fontSize: '34px', lineHeight: 1.05, color: INK }, lab); const ic = box(d, 250, 10, 120, 150, { zIndex: 2 }); ic.innerHTML = inner; return d; };
  const cA = card(90, 'LO QUE<br>VIO:', rocketSvg(), '#fff');
  const cB = card(500, 'LO QUE<br>ERA:', `<svg viewBox="0 0 120 150" width="120" height="150" style="overflow:visible"><circle cx="60" cy="50" r="34" fill="${YEL}" stroke="${INK}" stroke-width="5"/><path d="${cloudPath(70, 140, 0.55)}" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/></svg>`, YEL);
}

/* ======================================================================
   I1 · «¿Y SU PREMIO?» — la medalla baja del cielo
   ====================================================================== */
headline(S.I1[0], S.I1[1], '¿Y su *premio?*', { size: 130, hlT: K.premio });
{
  const c = scene(S.I1[0], S.I1[1], t => {
    const k = p(t, S.I1[0], 0.5, E.outBack);
    set(md.d, { y: (1 - k) * -900 + Math.sin(t * 3) * 8, r: Math.sin(t * 2.4) * 6 });
    SP.forEach((s, i) => set(s, { s: 0.6 + 0.4 * Math.sin(t * 9 + i), o: t > K.premio ? 1 : 0, r: t * 120 + i * 40 }));
    set(ry, { r: t * 12 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E9C6BE' });
  const ry = rays(c, -160, 220, 1400, 26, 'rgba(255,230,0,.35)', 'rgba(0,0,0,0)', 1);
  const md = mk(c, [340, 480, 400, 600], medalInner(), '0 0 200 300', 'medal'); md.d.style.zIndex = 4;
  const SP = [[260, 640], [780, 600], [250, 1000], [800, 1040]].map(q => el('div', c, { left: px(q[0]), top: px(q[1]), fontSize: '80px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 6 }, '✦'));
}

/* ======================================================================
   I2 · «OJO, QUE ESTO LO CUENTA ÉL:» — sello ¡OJO! + «SEGÚN ÉL»
   ====================================================================== */
{
  const c = scene(S.I2[0], S.I2[1], t => {
    stampA(ojo, t, K.ojo, -8, 1);
    set(pv.d, { s: pop(t, S.I2[0] + 0.05, 0.4), y: wobble(t, 0.6, 3), o: t < S.I2[0] + 0.05 ? 0 : 1 });
    face(pv, t, { look: [-8, -2], bL: 6, bR: 12, jaw: t > K.cuenta - 0.05 ? talkW(t, 'VECINO') * 0.6 : 0, seed: 1.7 });
    popA(se, t, K.cuenta, { r: -5 });
    set(bb, { s: pop(t, K.el8 - 0.05, 0.3), r: 3, o: t < K.el8 - 0.05 ? 0 : 1 });
    bt.textContent = t > K.el8 ? (Math.floor(t * 4) % 2 ? '…' : '…!') : '…';
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const ojo = stamp(c, 300, 330, '¡OJO!', { size: 140, bw: 14, z: 60, bg: YEL, blend: 'normal', col: INK });
  const pv = mk(c, [440, 640, 500, 639], petrovInner(), '0 0 360 460', 'bust'); pv.d.style.zIndex = 4;
  const se = stamp(c, 380, 560, 'SEGÚN ÉL', { size: 70, bw: 10, z: 50, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
  const bb = bubble(c, 420, 1150, '', { size: 70, tail: 'r', z: 40 }); const bt = document.createElement('span'); bt.textContent = '…'; bb.insertBefore(bt, bb.lastChild);
}

/* ======================================================================
   I3 · «UNA BRONCA.» — el jefe le grita
   ====================================================================== */
{
  const c = scene(S.I3[0], S.I3[1], t => {
    const sh = t > K.bronca ? Math.sin(t * 50) * 6 : 0;
    set(bs.d, { s: pop(t, S.I3[0], 0.3), x: sh, r: -3 });
    face(bs, t, { jaw: t > K.bronca - 0.05 ? 0.9 + 0.2 * Math.sin(t * 30) : 0.2, look: [10, 4], bL: -6, bR: -6, blink: false });
    set(pv.d, { y: wobble(t, 0.3, 2) + 20, r: 6, x: t > K.bronca ? -Math.min(1, (t - K.bronca) * 4) * 30 : 0 });
    face(pv, t, { closed: t > K.bronca, bL: 10, bR: 10 });
    SL.forEach((s, i) => set(s, { o: t > K.bronca - 0.05 ? (Math.floor(t * 10 + i) % 2 ? 1 : 0.4) : 0, s: 1 + 0.1 * Math.sin(t * 20 + i) }));
    stampA(stB, t, K.bronca + 0.05, -8, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E9C6BE' });
  rays(c, -300, 200, 1400, 24, 'rgba(200,16,46,.14)', 'rgba(0,0,0,0)', 1);
  const bs = mk(c, [40, 520, 600, 767], bossInner(), '0 0 360 460', 'bust'); bs.d.style.zIndex = 4;
  const pv = mk(c, [640, 880, 300, 383], petrovInner(), '0 0 360 460', 'bust'); pv.d.style.zIndex = 3;
  const SL = [0, 1, 2].map(i => { const e = box(c, 560, 760 + i * 70, 160, 60, { zIndex: 6 }); e.innerHTML = `<svg width="160" height="60" style="overflow:visible"><path d="M0,30 L${120 + i * 20},${10 + i * 20}" stroke="${INK}" stroke-width="10" stroke-linecap="round"/></svg>`; return e; });
  const stB = stamp(c, 230, 330, '¡BRONCA!', { size: 130, bw: 14, z: 60, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
}

/* ======================================================================
   I4 · «POR EL PAPELEO.» — la pila de papeles crece y el emú (con gafas) pone el sello  ← CAMEO DEL EMÚ
   ====================================================================== */
headline(S.I4[0], S.I4[1], 'Por *el papeleo*', { size: 120, hlT: K.papeleo });
const T_EMU = K.papeleo - 0.3;
{
  const c = scene(S.I4[0], S.I4[1], t => {
    PP.forEach((e, i) => { const t0 = S.I4[0] + 0.02 + i * 0.045; set(e, { y: (1 - p(t, t0, 0.2, E.outBack)) * -300, o: t < t0 ? 0 : 1 }); });
    const ke = p(t, S.I4[0] + 0.15, 0.3, E.outBack);
    set(emu.d, { y: (1 - ke) * 500 });
    set(gls, { y: (1 - ke) * 500 });
    const cam0 = t > T_EMU && t < T_EMU + 0.7;
    face(emu, t, { look: cam0 ? [0, 0] : [-10, 10], blink: false, bL: cam0 ? 16 : 10, bR: cam0 ? 22 : 2, half: !cam0 });
    // el sello baja en «papeleo»
    const kd = p(t, K.papeleo - 0.15, 0.15, E.inCubic), ku = p(t, K.papeleo + 0.12, 0.25, E.outCubic);
    set(tool, { y: kd * 260 - ku * 260, r: -10 + kd * 10 - ku * 10, o: ke > 0.5 ? 1 : 0 });
    stampA(stP, t, K.papeleo, -6, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 44px)' });
  const emuW = box(c, 560, 470, 420, 640, { overflow: 'hidden', zIndex: 3 });
  const emu = mkEmuF(emuW, [10, 10, 400, 600]);
  const gls = box(emuW, 10, 10, 400, 600, { zIndex: 2 }); gls.innerHTML = svgW(glassesOver(), '0 0 400 600');
  const tag = el('div', c, { left: '600px', top: '1060px', fontFamily: 'SpecialElite', fontSize: '30px', color: INK, background: '#FBF6EA', border: `3px solid ${INK}`, padding: '2px 12px', zIndex: 6 }, 'funcionario');
  void tag;
  const pile = box(c, 120, 760, 520, 560, { zIndex: 5 }); pile.innerHTML = papersSvg(16, 9);
  const PP = [...pile.querySelectorAll('.pp')];
  const tool = box(c, 380, 440, 160, 240, { zIndex: 7 }); tool.innerHTML = stampToolSvg();
  const stP = stamp(c, 150, 840, 'PAPELEO', { size: 96, bw: 12, z: 8, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
}

/* ======================================================================
   J1 · «Y EL MUNDO NO LO SUPO…» — el planeta dormido
   ====================================================================== */
headline(S.J1[0], S.J1[1], 'El mundo *no lo supo*', { size: 104, hlT: K.supo9, color: '#fff', hlc: RED });
{
  const c = scene(S.J1[0], S.J1[1], t => {
    set(gb, { s: pop(t, S.J1[0], 0.4), r: t * 6, y: Math.sin(t * 2.2) * 10 });
    ZZ.forEach((z, i) => { const ph = ((t - S.J1[0]) * 0.9 + i / 3) % 1; set(z, { x: ph * 60, y: -ph * 200, o: 1 - ph, s: 0.6 + ph * 0.8 }); });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#2f3550' }); STARS(c);
  const gb = box(c, 270, 560, 540, 540, { zIndex: 4 }); gb.innerHTML = globeSvg();
  const ZZ = [0, 1, 2].map(() => el('div', c, { left: '720px', top: '560px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '90px', color: '#fff', textShadow: `3px 3px 0 ${INK}`, zIndex: 6 }, 'z'));
}

/* ======================================================================
   J2 · «…EN QUINCE AÑOS.» — 1983 → 1998 de golpe + «15 AÑOS SIN SABERSE»
   ====================================================================== */
{
  const c = scene(S.J2[0], S.J2[1], t => {
    const kf = p(t, K.quince - 0.1, 0.22, E.inOutCubic);
    const sy = Math.abs(Math.cos(kf * Math.PI));
    set(c1, { sy: Math.max(0.02, sy), o: kf < 0.5 ? 1 : 0 });
    set(c2, { sy: Math.max(0.02, sy), o: kf >= 0.5 ? 1 : 0 });
    set(arr, { o: kf >= 0.5 ? 1 : 0, x: Math.sin(t * 8) * 6 });
    set(old, { s: pop(t, K.quince + 0.05, 0.3) * 0.62, r: -8, o: t < K.quince + 0.05 ? 0 : 1 });
    stampA(st15, t, K.anos9, -5, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const c1 = calPage(560, 560, 'AÑO', '1983', { bigSize: 190 }); c.appendChild(c1); c1.style.left = '260px'; c1.style.top = '300px'; c1.style.zIndex = 4;
  const c2 = calPage(560, 560, 'AÑO', '1998', { bigSize: 190, band: INK }); c.appendChild(c2); c2.style.left = '260px'; c2.style.top = '300px'; c2.style.zIndex = 4;
  const old = calPage(560, 560, 'AÑO', '1983', { bigSize: 190 }); c.appendChild(old); old.style.left = '-10px'; old.style.top = '250px'; old.style.zIndex = 3;
  const arr = box(c, 150, 760, 180, 120, { zIndex: 5 }); arr.innerHTML = arrowSvg('M10,60 H160 M120,24 L164,60 L120,96', PINK, 12);
  const st15 = stamp(c, 170, 930, '15 AÑOS<br>SIN SABERSE', { size: 92, bw: 15, z: 40, bg: 'rgba(255,255,255,.95)', blend: 'normal' }); st15.style.textAlign = 'center';
}

/* ======================================================================
   K1 · «MURIÓ EN DOS MIL DIECISIETE…» — el retrato de Petrov mayor, con lazo de luto
   ====================================================================== */
{
  const c = scene(S.K1[0], S.K1[1], t => {
    set(pw, { s: 1 + 0.05 * p(t, S.K1[0], 2.7, E.linear) });
    face(po, t, { look: [0, 2], seed: 2.2 });
    popA(m1, t, K.murio, { rise: 30 });
    stampA(y17, t, K.diecisiete, -4, 1);
    set(rib, { s: pop(t, K.diecisiete + 0.25, 0.35), o: t < K.diecisiete + 0.25 ? 0 : 1 });
    set(fl, { sy: 1 + 0.12 * Math.sin(t * 13), sx: 1 + 0.06 * Math.sin(t * 17), r: Math.sin(t * 7) * 4 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#3a3530' });
  box(c, 0, 0, 1080, 1920, { zIndex: 1, background: 'radial-gradient(circle at 50% 55%, rgba(255,214,150,.35), rgba(0,0,0,0) 60%)' });
  const pw = box(c, 0, 0, 1080, 1920, { zIndex: 2, transformOrigin: '540px 860px' });
  const fr = box(pw, 220, 520, 640, 700, { zIndex: 2 });
  fr.innerHTML = `<svg width="640" height="700" style="overflow:visible">${cut('<rect x="0" y="0" width="640" height="700" rx="20"/>')}<rect x="0" y="0" width="640" height="700" rx="20" fill="#5a3a22" stroke="${INK}" stroke-width="8"/><rect x="34" y="34" width="572" height="632" rx="10" fill="#E7D9BC" stroke="${INK}" stroke-width="5"/><rect x="34" y="34" width="572" height="632" fill="url(#hP)" opacity=".6"/></svg>`;
  const po = mk(pw, [280, 600, 520, 622], petrovOldInner(), '0 0 360 460', 'bust'); po.d.style.zIndex = 3;
  const rib = box(pw, 700, 470, 200, 220, { zIndex: 5 }); rib.innerHTML = `<svg viewBox="0 0 200 220" width="200" height="220" style="overflow:visible"><path d="M100,60 L50,210 L80,190 L100,220 L110,70 Z M100,60 L150,210 L120,190 L100,220 Z" fill="#1e1a17" stroke="#F4ECDB" stroke-width="3"/><path d="M100,60 C60,0 10,20 30,60 C46,90 80,80 100,60 Z M100,60 C140,0 190,20 170,60 C154,90 120,80 100,60 Z" fill="#1e1a17" stroke="#F4ECDB" stroke-width="3"/><circle cx="100" cy="62" r="16" fill="#1e1a17" stroke="#F4ECDB" stroke-width="3"/></svg>`;
  const cnd = box(pw, 120, 1050, 80, 200, { zIndex: 6 }); cnd.innerHTML = `<svg width="80" height="200" style="overflow:visible"><rect x="22" y="70" width="36" height="130" fill="#F4ECDB" stroke="${INK}" stroke-width="5"/></svg>`;
  const fl = el('div', cnd, { left: '24px', top: '12px', width: '32px', height: '58px', zIndex: 2, transformOrigin: '16px 58px' }, `<svg width="32" height="58" style="overflow:visible"><path d="M16,0 C30,24 32,40 28,48 A14,12 0 0,1 4,48 C0,40 2,24 16,0 Z" fill="${YEL}" stroke="${INK}" stroke-width="3"/><path d="M16,22 C22,34 22,42 16,48 C10,42 10,34 16,22 Z" fill="#F2983E"/></svg>`);
  const m1 = el('div', c, { left: 0, top: '250px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '96px', color: '#F4ECDB', zIndex: 40 }, 'Murió en…');
  const y17 = stamp(c, 330, 360, '2017', { size: 150, bw: 13, z: 41, bg: 'rgba(244,236,219,.95)', blend: 'normal', col: INK, font: 'Playfair' }); y17.style.fontWeight = 900;
}

/* ======================================================================
   K2 · «…Y TAMPOCO SE SUPO HASTA CUATRO MESES DESPUÉS.» — el periódico llega tarde
   ====================================================================== */
headline(S.K2[0], S.K2[1], 'Tampoco *se supo…*', { size: 108, hlT: K.supo10, y: 196 });
{
  const c = scene(S.K2[0], S.K2[1], t => {
    const kn = p(t, K.tampoco - 0.1, 0.7, E.outCubic);
    set(np, { s: lerp(0.05, 1, kn), r: lerp(720, -4, kn) + (kn >= 1 ? wobble(t, 0.5, 1) : 0), o: t < K.tampoco - 0.1 ? 0 : 1 });
    stampA(st4, t, K.cuatro, -7, 1);
    set(sn, { x: (t - S.K2[0]) * 40, o: 1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E9DFC6' });
  rays(c, -160, 220, 1400, 24, 'rgba(43,33,24,.06)', 'rgba(0,0,0,0)', 0);
  const np = box(c, 360, 420, 560, 680, { zIndex: 4 }); np.innerHTML = newsInner(560, 680);
  el('div', np, { left: 0, top: '150px', width: '560px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', color: INK, zIndex: 2 }, 'PETROV');
  const st4 = stamp(c, 310, 1000, '4 MESES<br>DESPUÉS', { size: 100, bw: 13, z: 40, bg: 'rgba(255,255,255,.95)', blend: 'normal' }); st4.style.textAlign = 'center';
  const sn = el('div', c, { left: '420px', top: '1250px', zIndex: 5 }, `<svg width="120" height="80" style="overflow:visible"><path d="M10,70 L110,70 Q118,60 104,58 L40,58 Z" fill="#B9C79A" stroke="${INK}" stroke-width="4"/><circle cx="70" cy="40" r="30" fill="#C1663A" stroke="${INK}" stroke-width="4"/><path d="M70,40 m-14,0 a14,14 0 1,1 14,14" stroke="${INK}" stroke-width="3" fill="none"/><path d="M104,58 L112,30 M110,58 L124,34" stroke="${INK}" stroke-width="3"/></svg>`);
}

/* ======================================================================
   L1 · GOLPE ROSA: «O SEA: TE SALVÓ LA VIDA…»
   ====================================================================== */
colorHit(S.L1[0], S.L1[1], PINK, c => {
  const l0 = el('div', c, { left: 0, top: '250px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '84px', color: INK, zIndex: 10 }, 'O sea:');
  const big = el('div', c, { left: 0, top: '350px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: 1.0, color: '#fff', textShadow: OUTL(INK, 10), zIndex: 10, whiteSpace: 'nowrap' });
  const WS = []; [['TE', K.te11], ['SALVÓ', K.salvo], ['<br>', null], ['LA', K.vida - 0.1], ['VIDA', K.vida]].forEach(([s, tt]) => { if (!tt) { big.appendChild(document.createElement('br')); return; } const e = document.createElement('span'); e.style.display = 'inline-block'; e.style.margin = '0 0.12em'; e.textContent = s; big.appendChild(e); WS.push({ e, t: tt }); });
  const yu = mk(c, [330, 760, 420, 537], youInner(), '0 0 360 460', 'bust'); yu.d.style.zIndex = 5; yu.d.style.filter = SIL;
  const phn = box(c, 500, 1070, 80, 120, { zIndex: 6, background: '#BFE3FF', border: `6px solid ${INK}`, borderRadius: '14px' });
  const hr = el('div', c, { left: '700px', top: '700px', fontSize: '110px', zIndex: 8, color: RED, textShadow: OUTL(INK, 4) }, '♥');
  return t => {
    popA(l0, t, K.osea, { rise: 30 });
    WS.forEach(w => set(w.e, { s: pop(t, w.t - 0.03, 0.3), o: t < w.t - 0.03 ? 0 : 1 }));
    set(yu.d, { y: wobble(t, 0.5, 3) }); set(phn, { r: -8 + wobble(t, 0.4, 2) });
    set(hr, { s: t > K.vida ? 1 + 0.15 * Math.abs(Math.sin(t * 7)) : 0, o: t > K.vida ? 1 : 0 });
  };
});

/* ======================================================================
   L2 · «…Y NO TE ENTERASTE.» — tú, con los cascos, mirando el móvil
   ====================================================================== */
headline(S.L2[0], S.L2[1], 'y *no te enteraste*', { size: 110, hlT: K.enteraste });
{
  const c = scene(S.L2[0], S.L2[1], t => {
    set(yu.d, { y: wobble(t, 0.7, 4), r: Math.sin(t * 3) * 2 });
    face(yu, t, { look: [4, 12], half: true, seed: 1 });
    NT.forEach((n, i) => { const ph = ((t - S.L2[0]) * 1.2 + i / 3) % 1; set(n, { x: (i % 2 ? 1 : -1) * ph * 60, y: -ph * 160, o: 1 - ph }); });
    set(scr, { y: -((t * 300) % 80) });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#CFE0E6' });
  const yu = mk(c, [240, 560, 600, 767], bustInner({ uniform: 'farmer', seed: 50 }) + `<path d="M116,206 C104,140 140,112 184,112 C232,112 260,142 246,206 C238,170 214,150 182,150 C150,150 126,168 116,206 Z" fill="#3a2a1e"/><path d="M104,214 C100,120 260,120 256,214" stroke="${INK}" stroke-width="12" fill="none"/><rect x="88" y="196" width="34" height="52" rx="12" fill="${PINK}" stroke="${INK}" stroke-width="4"/><rect x="238" y="196" width="34" height="52" rx="12" fill="${PINK}" stroke="${INK}" stroke-width="4"/>`, '0 0 360 460', 'bust'); yu.d.style.zIndex = 4;
  const ph = box(c, 450, 1110, 180, 230, { zIndex: 6, background: INK, borderRadius: '30px', border: `6px solid ${INK}`, overflow: 'hidden' });
  const scr = box(ph, 10, 10, 188, 560, { background: 'repeating-linear-gradient(180deg, #fff 0 60px, #BFE3FF 60px 80px)' });
  const NT = [0, 1, 2].map(i => el('div', c, { left: px(i % 2 ? 820 : 180), top: '640px', fontSize: '80px', color: INK, zIndex: 6 }, i % 2 ? '♪' : '♫'));
}

/* ======================================================================
   L3 · «DOS VECES.» — vuelve la portada, apagada; caen dos sellos: 1983 y 2017
   ====================================================================== */
{
  const c = scene(S.L3[0], S.L3[1], t => {
    crtState(crt, t, 'dim');
    sil.d.style.filter = 'brightness(0)';
    stampA(sA, t, K.dos11, -8, 1); stampA(sB, t, K.veces, 6, 1);
    popA(dv, t, K.dos11 - 0.03, { rise: 30, r: -2 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: BUNK });
  const crt = mkCRT(c, 90, 640, 680, 540, { z: 6, size: 150 });
  const sil = mk(c, [600, 820, 380, 486], silPhoneInner(), '0 0 360 460', 'bust'); sil.d.style.zIndex = 9;
  vignette(c, 12, 0.75);
  const dv = el('div', c, { left: 0, top: '310px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '140px', color: '#fff', textShadow: `7px 7px 0 ${RED}`, zIndex: 40 }, 'DOS VECES.');
  const sA = stamp(c, 120, 720, '1983', { size: 170, bw: 16, z: 50, bg: 'rgba(255,255,255,.95)', blend: 'normal', font: 'Playfair' }); sA.style.fontWeight = 900;
  const sB = stamp(c, 420, 980, '2017', { size: 170, bw: 16, z: 51, bg: 'rgba(255,255,255,.95)', blend: 'normal', font: 'Playfair' }); sB.style.fontWeight = 900;
}

/* ======================================================================
   M · CTA: «¿TÚ QUÉ HABRÍAS HECHO EN SU SILLA? OS LEO.» — la silla vacía ante la pantalla roja
   ====================================================================== */
headline(S.M[0], S.M[1], '¿Tú qué *habrías hecho*', { size: 92, hlT: K.habrias, y: 200, color: '#fff', hlc: RED });
{
  const c = scene(S.M[0], S.M[1], t => {
    crtState(crt, t, 'red');
    set(ch.d, { s: pop(t, S.M[0] + 0.05, 0.35), r: wobble(t, 0.5, 1) });
    set(spot, { o: t > K.silla - 0.05 ? 1 : 0.35 });
    set(l2, { s: pop(t, K.en12, 0.3), o: t < (K.en12) ? 0 : 1 });
    paint(sHL, t, K.silla, 0.3);
    popA(ol, t, K.os, { r: -4 });
    set(hand, { o: t > K.os ? 1 : 0, y: Math.sin(t * 6) * 12, s: pop(t, K.os, 0.3) });
    set(rc, { r: t > S.M[0] ? Math.sin(t * 40) * (Math.floor(t * 2) % 2 ? 4 : 0) : 0 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: BUNK });
  const crt = mkCRT(c, 300, 420, 560, 440, { z: 3, size: 120 });
  const spot = box(c, 0, 0, 1080, 1920, { zIndex: 4, background: 'radial-gradient(ellipse at 62% 64%, rgba(255,240,200,.45), rgba(0,0,0,0) 30%)' });
  const ch = mk(c, [430, 880, 360, 480], chairInner(), '0 0 300 400', 'chair'); ch.d.style.zIndex = 5;
  const rc = box(c, 0, 0, 1, 1);
  vignette(c, 7, 0.6);
  const l2 = el('div', c, { left: 0, top: '300px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 800, fontSize: '92px', color: '#fff', zIndex: 501 }, `en su ${hlSpan('<span style="font-style:italic">silla?</span>', 'shl2', RED)}`);
  const sHL = l2.querySelector('.shl2');
  const ol = chip(c, 530, 1180, 'Os leo 👇', { size: 64, bg: PINK, z: 40 });
  const hand = box(c, 400, 1180, 130, 130, { zIndex: 41 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="130" height="130" style="overflow:visible">${gloveHand(0, 0, 180, 1.0)}</svg>`;
}
