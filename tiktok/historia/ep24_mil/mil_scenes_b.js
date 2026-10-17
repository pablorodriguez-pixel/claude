/* Ep. 24 · escenas L5–L12 (mil romano, ↀ → D, ∞, comunidad, votación, marca) */

/* ======================================================================
   ROM · «Y CUATRO: EL MIL ROMANO NO ERA UNA M. ERA ESTE GARABATO. PÁRTELO… SALE LA D DE 500»
   una losa romana; planos: M fantasma tachada → cincel graba la ↀ → sierra → la mitad derecha es la D
   ====================================================================== */
headline(S.ROM[0], K.era - 0.06, 'Tres: el *mil romano*', { size: 84, hlT: K.mil5, y: 262 });
headline(K.era - 0.06, K.partelo - 0.06, 'Era *este garabato*', { size: 110, hlT: K.garabato, y: 262 });
headline(K.partelo - 0.06, K.sale - 0.06, 'Pártelo *por la mitad*…', { size: 84, hlT: K.mitad6, y: 262 });
headline(K.sale - 0.06, S.ROM[1], '…y sale *la D*', { size: 120, hlT: K.D, y: 262 });
{
  const TCH0 = K.era + 0.1, TCH1 = K.garabatoE - 0.05; // cincelado del círculo + barra
  const TSAW0 = K.partelo, TSAW1 = K.mitad6e;
  const TSL = K.sale - 0.15;
  const c = scene(S.ROM[0], S.ROM[1], t => {
    // cámara
    let cs = 1, cy = 0;
    if (t < K.era - 0.06) cs = lerp(1.0, 1.05, p(t, S.ROM[0], 3, E.linear));
    else if (t < K.partelo - 0.06) { cs = 1.12; cy = 40; }
    else if (t < K.sale - 0.06) { cs = 1.0; cy = 0; }
    else { cs = lerp(1.0, 1.04, p(t, K.sale - 0.06, 2, E.linear)); }
    set(cam, { s: cs, y: cy });
    // M fantasma (aún no hay garabato)
    const showM = t < K.era - 0.03;
    set(ghostM, { s: pop(t, S.ROM[0] + 0.2, 0.4) * (1 + 0.03 * Math.sin(t * 4)), o: showM && t > S.ROM[0] + 0.2 ? 0.9 : 0, r: -2 });
    set(mx, { s: pop(t, K.M5 + 0.12, 0.25), o: showM && t > K.M5 + 0.12 ? 1 : 0 });
    popA(rc, t, S.ROM[0] + 0.25, { r: -3 });
    set(rc, { s: pop(t, S.ROM[0] + 0.25, 0.4), r: -3, o: t > S.ROM[0] + 0.25 && showM ? 1 : 0 });
    // cincel
    const kc = clamp((t - TCH0) / (TCH1 - TCH0 - 0.35)), kb = clamp((t - (TCH1 - 0.35)) / 0.35);
    const Lc = Math.PI * GLY_R; // cada media circunferencia
    [gl.Cc, gl.Dc].forEach(g => g.forEach(e => { e.style.strokeDasharray = `${f1(Lc + 2)} ${f1(Lc + 2)}`; e.style.strokeDashoffset = f1(Lc * (1 - kc)); }));
    gl.Bc.forEach(e => { e.style.strokeDasharray = `${f1(GLY_R * 2 + 2)} ${f1(GLY_R * 2 + 2)}`; e.style.strokeDashoffset = f1(GLY_R * 2 * (1 - kb)); });
        const chOn = t > TCH0 - 0.1 && t < TCH1 + 0.15;
    const tipX = kc < 1 ? 250 - GLY_R * Math.sin(Math.PI * kc) : 250, tipY = kc < 1 ? 250 - GLY_R * Math.cos(Math.PI * kc) : 250 - GLY_R + GLY_R * 2 * kb;
    set(chis, { x: tipX * GS - 60 + Math.sin(t * 40) * 4, y: tipY * GS - 330 + Math.cos(t * 40) * 4, o: chOn ? 1 : 0, r: 0 });
    DU.forEach((d, i) => { const ph = ((t * 3 + i * 0.37) % 1); set(d, { x: tipX * GS + (i - 2) * 22 * ph, y: tipY * GS + 40 * ph, o: chOn ? 1 - ph : 0, s: 1 - ph * 0.5 }); });
    set(eq, { s: pop(t, K.garabato, 0.4), r: 3, o: t > K.garabato && t < TSAW0 ? 1 : 0 });
    // sierra (corta por la izquierda de la barra)
    const ks = p(t, TSAW0, TSAW1 - TSAW0, E.inOutCubic);
    const sawOn = t > TSAW0 - 0.1 && t < TSAW1 + 0.2;
    set(saw, { x: Math.sin(t * 34) * 26, y: lerp(-80, 470, ks), o: sawOn ? 1 : 0 });
    cutL.style.transform = `scaleY(${f1(ks * 1000) / 1000})`; cutL.style.opacity = t > TSAW0 && t < TSL + 0.3 ? 1 : 0;
    // separar: la mitad derecha (IƆ) se desliza → D
    const kd = p(t, TSL, 0.45, E.outBack);
    set(gR, { x: kd * 70, y: -kd * 10, r: kd * 3 });
    set(gL, { x: -kd * 70, o: 1 - 0.55 * kd, r: -kd * 4 });
    set(gw, { s: lerp(1, 0.8, kd), o: t > TCH0 - 0.02 ? 1 : 0 });
    hiD.style.opacity = t > K.D ? 1 : 0;
    popA(dl, t, K.D, { r: -4 });
    set(dl, { s: pop(t, K.D, 0.35), r: -4, o: t > K.D ? 1 : 0 });
    stampA(q5, t, K.quinientos, -8, 1);
    set(ciL, { o: t > K.sale ? 1 : 0, s: pop(t, K.sale, 0.35) });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 820px' });
  sceneBg(cam, { background: '#B9AE98', backgroundImage: 'linear-gradient(180deg, #CFC5B0 0%, #9C9078 100%)' });
  // columnas romanas de fondo
  box(cam, 0, 0, 1080, 1920, { zIndex: 1 }).innerHTML = `<svg width="1080" height="1920">${[0, 1].map(k => { const x = k ? 960 : 0; return `<rect x="${x}" y="360" width="120" height="1100" fill="#E2DACA" stroke="${INK}" stroke-width="5"/><rect x="${x}" y="360" width="120" height="1100" fill="url(#hW)" opacity=".3"/><rect x="${x - 14}" y="340" width="148" height="40" fill="#E2DACA" stroke="${INK}" stroke-width="5"/>`; }).join('')}</svg>`;
  romanSlab(cam, 90, 420, 900, 860, { z: 3, seed: 33 });
  const GS = 1.5, GX = 540 - 250 * GS, GY = 850 - 250 * GS;
  const ghostM = el('div', cam, { left: '0', top: '520px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '560px', lineHeight: '600px', color: 'rgba(43,33,24,.18)', WebkitTextStroke: `6px ${INK}`, zIndex: 5 }, 'M');
  const mx = box(cam, 290, 600, 500, 500, { zIndex: 6 }); mx.innerHTML = XSVG;
  const rc = chip(cam, 400, 1170, 'mil romano = ¿M?', { size: 52, bg: INK, color: YEL, z: 20 });
  // el garabato ↀ como dos mitades
  const gw = box(cam, GX, GY, 500 * GS, 500 * GS, { zIndex: 7 });
  gw.innerHTML = `<svg viewBox="0 0 500 500" width="${500 * GS}" height="${500 * GS}" style="overflow:visible"><g class="gL">${chisel(gC, 'gc')}</g><g class="gR"><path class="hiD" d="${gD} Z" fill="${YEL}" opacity=".9" style="opacity:0"/>${chisel(gD, 'gd')}${chisel(gBar, 'gb')}</g>
    <path class="cutL" d="M232,40 L232,470" stroke="${RED}" stroke-width="7" stroke-dasharray="16 12" style="transform-origin:232px 40px"/></svg>`;
  const gl = { Cc: [...gw.querySelectorAll('.gc path')], Dc: [...gw.querySelectorAll('.gd path')], Bc: [...gw.querySelectorAll('.gb path')] };
  const gL = gw.querySelector('.gL'), gR = gw.querySelector('.gR'), hiD = gw.querySelector('.hiD'), cutL = gw.querySelector('.cutL');
  gL.style.transformBox = 'view-box'; gR.style.transformBox = 'view-box';
  // cincel + martillo
  const chis = box(cam, GX, GY, 120, 360, { zIndex: 9 });
  chis.innerHTML = `<svg viewBox="0 0 120 360" width="120" height="360" style="overflow:visible">${cut('<path d="M40,0 L80,0 L84,250 L60,330 L36,250 Z"/>', 4, 6)}<path d="M40,0 L80,0 L84,250 L60,330 L36,250 Z" fill="${METAL}" stroke="${INK}" stroke-width="5"/><path d="M60,0 L60,320" stroke="#fff" stroke-width="4" opacity=".6"/><rect x="34" y="0" width="52" height="110" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="34" y="0" width="52" height="110" fill="url(#hW)" opacity=".4"/></svg>`;
  const DU = [0, 1, 2, 3, 4].map(() => box(cam, GX, GY, 16, 16, { borderRadius: '50%', background: '#E2DACA', border: `3px solid ${INK}`, zIndex: 8 }));
  DU.forEach(d => { d.style.left = '0px'; d.style.top = '0px'; d.style.marginLeft = GX + 'px'; d.style.marginTop = GY + 'px'; });
  chis.style.left = GX + 'px'; chis.style.top = GY + 'px';
  const eq = chip(cam, 560, 1190, '= 1.000', { size: 80, bg: PINK, z: 20 });
  // sierra
  const saw = box(cam, GX + 232 * GS - 300, GY, 600, 160, { zIndex: 10 });
  saw.innerHTML = `<svg viewBox="0 0 600 160" width="600" height="160" style="overflow:visible">${cut('<path d="M60,40 L560,40 L560,110 L60,110 Z"/><rect x="0" y="20" width="90" height="110" rx="30"/>')}<path d="M60,40 L560,40 L560,100 ${Array.from({ length: 20 }, (_, i) => `L${560 - i * 25 - 12},116 L${560 - (i + 1) * 25},100`).join(' ')} Z" fill="${METAL}" stroke="${INK}" stroke-width="4"/><path d="M80,56 H540" stroke="#fff" stroke-width="4" opacity=".6"/><rect x="0" y="20" width="90" height="110" rx="30" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="22" y="48" width="44" height="54" rx="18" fill="#B9AE98" stroke="${INK}" stroke-width="4"/></svg>`;
  const dl = el('div', cam, { left: '760px', top: '520px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '170px', color: INK, background: YEL, border: `6px solid ${INK}`, borderRadius: '20px', padding: '0 30px', lineHeight: '190px', boxShadow: `8px 8px 0 ${INK}`, zIndex: 20 }, 'D');
  const q5 = stamp(cam, 600, 1040, '500', { size: 150, bw: 16, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const ciL = el('div', cam, { left: '400px', top: '1230px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '70px', color: '#fff', background: INK, padding: '2px 26px 8px', borderRadius: '14px', zIndex: 21, whiteSpace: 'nowrap' }, `C I <span style="display:inline-block;transform:scaleX(-1);color:${YEL}">C</span>`);
}

/* ======================================================================
   N · «LA M GANÓ LUEGO, POR "MILLE"» — la M con corona de laurel y cinta MILLE
   ====================================================================== */
headline(S.N[0], S.N[1], 'La *M* ganó luego', { size: 120, hlT: K.M6, y: 262 });
{
  const c = scene(S.N[0], S.N[1], t => {
    set(bigM, { s: pop(t, K.M6 - 0.05, 0.4), y: wobble(t, 0.6, 5), r: -2, o: t < K.M6 - 0.05 ? 0 : 1 });
    const kc = p(t, K.gano - 0.05, 0.35, E.outBounce);
    set(crown, { y: lerp(-500, 0, kc), r: -8 + Math.sin(t * 3) * 3, o: t > K.gano - 0.05 ? 1 : 0 });
    const kr = p(t, K.mille - 0.05, 0.35, E.outBack);
    set(rib, { s: kr, r: -5, o: t > K.mille - 0.05 ? 1 : 0 });
    set(sm, { s: pop(t, S.N[0] + 0.2, 0.4) * 0.9, r: 4, o: t > S.N[0] + 0.2 ? 0.95 : 0 });
    SP.forEach((s2, i) => { const a = t * 3 + i * 2.1; set(s2, { x: Math.cos(a) * 80, y: Math.sin(a) * 30, r: t * 160, o: t > K.gano ? 1 : 0 }); });
  }, { clip: true });
  sceneBg(c, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.10) 0 3px, transparent 3px 58px)' });
  rays(c, -160, 200, 1400, 24, 'rgba(255,255,255,.25)', 'rgba(0,0,0,0)', 0);
  const sm = box(c, 680, 980, 280, 280, { zIndex: 5 });
  sm.innerHTML = `<svg viewBox="0 0 500 500" width="280" height="280" style="overflow:visible;opacity:.55">${chisel(gC, 'x1')}${chisel(gD, 'x2')}${chisel(gBar, 'x3')}<path d="M80,80 L420,420 M420,80 L80,420" stroke="${RED}" stroke-width="30" stroke-linecap="round"/></svg>`;
  const bigM = el('div', c, { left: '0', top: '430px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '600px', lineHeight: '640px', color: '#E2DACA', textShadow: `14px 14px 0 ${INK}, -6px -6px 0 ${INK}, 6px -6px 0 ${INK}, -6px 6px 0 ${INK}`, zIndex: 10 }, 'M');
  const crown = box(c, 330, 380, 420, 180, { zIndex: 12 });
  { let lv = ''; for (let k = 0; k < 11; k++) { const a = Math.PI * (1.08 + k / 10 * 0.84), x = 210 + Math.cos(a) * 190, y = 190 + Math.sin(a) * 150, rot = a * 180 / Math.PI + 90; lv += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="34" ry="14" fill="#7a9a52" stroke="${INK}" stroke-width="3.5" transform="rotate(${f1(rot + (k % 2 ? 28 : -28))} ${f1(x)} ${f1(y)})"/>`; } crown.innerHTML = `<svg viewBox="0 0 420 200" width="420" height="200" style="overflow:visible"><path d="M20,190 Q210,0 400,190" stroke="${INK}" stroke-width="8" fill="none"/>${lv}</svg>`; }
  const rib = el('div', c, { left: '170px', top: '1080px', width: '740px', textAlign: 'center', background: RED, color: '#fff', fontFamily: 'Rye', fontSize: '110px', padding: '4px 0 12px', border: `6px solid ${INK}`, boxShadow: `8px 9px 0 ${SH}`, zIndex: 14, whiteSpace: 'nowrap', clipPath: 'polygon(0 0,100% 0,96% 50%,100% 100%,0 100%,4% 50%)' }, '«MILLE»');
  const SP = [0, 1, 2].map(i => el('div', c, { left: px(400 + i * 120), top: px(470), fontSize: '64px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 13 }, '✦'));
}

/* ======================================================================
   P · «MIL VECINOS: PARA MÍ, CASI INFINITO. Y OS CONOZCO.» — el ∞ se vuelve 1.000; el Vecino, emocionado
   ====================================================================== */
{
  const c = scene(S.P[0], S.P[1], t => {
    // plano 1 (general) → plano 2 en «casi» (cartel, cerca) → plano 3 en «Y os conozco» (primer plano del Vecino)
    const sh2 = t >= K.casi - 0.04, sh3 = t >= K.y8 - 0.05;
    if (sh3) set(cam, { s: 1.3 + 0.04 * p(t, K.y8, 1.2, E.linear), y: 70 });
    else if (sh2) set(cam, { s: 1.22 + 0.04 * p(t, K.casi, 1, E.linear), y: 200, x: 0 });
    else set(cam, { s: 1.0 + 0.04 * p(t, S.P[0], 2, E.linear), y: 0 });
    set(sInf, { o: 0 }); set(s1000, { o: 1, s: lerp(1.5, 1, p(t, K.mil8 - 0.06, 0.25, E.outBack)) });
    s1000.style.textShadow = (glitch(t, K.infinito8, 0.2) ? glitch(t, K.infinito8, 0.2) + ', ' : '') + `0 0 26px rgba(255,230,0,.7), 6px 6px 0 #000`;
    set(ci, { s: pop(t, K.infinito8, 0.35), r: -3, o: t > K.infinito8 && t < K.y8 - 0.05 ? 1 : 0 });
    const tears = t > K.casi && t < K.y8;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > K.y8 ? [0, 0] : [0, -4], bL: t > K.y8 ? 4 : 12, bR: t > K.y8 ? 18 : 12, fan: tears ? Math.sin(t * 24) * 16 : wobble(t, 0.8, 6), seed: 0.6, half: t > K.y8 });
    set(vec.d, { y: wobble(t, 0.5, 3) });
    TE.forEach((d, i) => { const ph = ((t - K.casi) * 1.6 + i * 0.5) % 1; set(d, { y: ph * 120, o: tears ? 1 - ph : 0 }); });
    HE.forEach((h, i) => { const ph = ((t * 0.5 + i * 0.23) % 1); set(h, { y: -ph * 600, x: Math.sin(t * 2 + i) * 30, o: Math.sin(ph * Math.PI) * 0.9, r: Math.sin(t * 3 + i) * 15 }); });
    popA(oc, t, K.conozco, { r: -3 });
    set(oc, { s: pop(t, K.conozco, 0.35), r: -3, o: t > K.conozco ? 1 : 0 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 640px' });
  sceneBg(cam, { background: '#F4CFDA', backgroundImage: 'repeating-linear-gradient(90deg, #F4CFDA 0 22px, #F9E3EA 22px 44px)' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,.55), rgba(120,40,60,.25) 85%)' });
  const HE = []; { const r = rng(5); for (let i = 0; i < 9; i++) HE.push(box(cam, 60 + r() * 900, 1300 + r() * 200, 70, 63, { zIndex: 2 }, heartSvg(i % 2 ? PINK : '#fff'))); }
  const sign = box(cam, 140, 330, 800, 300, { zIndex: 8 });
  sign.innerHTML = `<svg width="800" height="300" style="position:absolute;left:0;top:0;overflow:visible">${cut('<rect x="0" y="0" width="800" height="300" rx="30"/>')}<rect x="0" y="0" width="800" height="300" rx="30" fill="${INK}" stroke="${BRASS}" stroke-width="10"/>${Array.from({ length: 22 }, (_, i) => `<circle cx="${f1(30 + i * 34.5)}" cy="20" r="8" fill="${YEL}" stroke="${INK}" stroke-width="2"/><circle cx="${f1(30 + i * 34.5)}" cy="280" r="8" fill="${YEL}" stroke="${INK}" stroke-width="2"/>`).join('')}</svg>`;
  const sInf = box(sign, 250, 30, 300, 240, {}); sInf.innerHTML = `<svg viewBox="0 0 500 500" width="300" height="300" style="overflow:visible;margin-top:-30px"><path d="${gInf}" stroke="${YEL}" stroke-width="44" fill="none"/></svg>`;
  const s1000 = el('div', sign, { left: '0', top: '20px', width: '800px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '230px', lineHeight: '260px', color: YEL, textShadow: `0 0 26px rgba(255,230,0,.7), 6px 6px 0 #000` }, '1.000');
  const ci = chip(cam, 300, 600, 'casi infinito', { size: 60, bg: PINK, z: 20 });
  const vec = mkVec(cam, [190, 640, 700, 867]); vec.d.style.zIndex = 6;
  const TE = [0, 1].map(i => el('div', cam, { left: px(i ? 640 : 430), top: px(880), fontSize: '44px', zIndex: 7 }, '💧'));
  const oc = chip(c, 560, 1180, 'os conozco 👀', { size: 66, bg: YEL, color: INK, z: 22 });
}

/* ======================================================================
   SJ · GOLPE ROSA: «Y NO: NO SOY TU VECINO JOSÉ» — se arranca la etiqueta
   ====================================================================== */
colorHit(S.SJ[0], S.SJ[1], PINK, c => {
  const cd = commentCard(c, 70, 300, 'tu no eres mi vecino jose', { size: 80, h: 300, seed: 78, z: 20 });
  const vec = mkVec(c, [250, 640, 580, 718]); vec.d.style.zIndex = 8;
  const tag = el('div', c, { left: '400px', top: '1110px', width: '300px', zIndex: 12, background: '#fff', border: `5px solid ${RED}`, borderRadius: '16px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, boxShadow: `5px 5px 0 ${SH}` }, `<div style="background:${RED};color:#fff;font-size:34px;padding:4px 0">HOLA, SOY</div><div style="font-family:SpecialElite;font-size:62px;color:${INK};padding:6px 0 8px">José</div>`);
  const tx = box(c, 450, 1150, 200, 200, { zIndex: 13 }); tx.innerHTML = XSVG;
  return t => {
    set(cd.wrap, { s: pop(t, S.SJ[0], 0.3), r: -2, y: wobble(t, 0.6, 4) });
    const kr = p(t, K.no10, 0.35, E.outCubic), kf = p(t, K.soy10, 0.6, E.inCubic);
    set(tag, { x: kr * 80 - kf * 330, y: -kr * 40 + kf * 140, r: kr * 20 - kf * 40 });
    set(tx, { s: pop(t, K.jose, 0.25), o: t > K.jose ? 1 : 0, x: 0, y: 0 });
    tx.style.visibility = t > K.jose && t < K.soy10 ? 'visible' : 'hidden';
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: [0, 0], bL: 16, bR: 4, fan: Math.sin(t * 22) * 12, seed: 0.2 });
    set(vec.d, { r: t > K.no10 && t < K.no10 + 0.4 ? Math.sin(t * 40) * 3 : 0 });
  };
});
// la X de José se pinta sobre la etiqueta mientras cae: la reposicionamos con ella
{
  const sc = SC[SC.length - 1]; const f0 = sc.fn; const tag = sc.c.children[sc.c.children.length - 2], tx = sc.c.children[sc.c.children.length - 1];
  sc.fn = t => { f0(t); tx.style.transform = tag.style.transform; tx.style.visibility = t > K.jose ? 'visible' : 'hidden'; tx.style.opacity = 1; };
}

/* ======================================================================
   T · VOTACIÓN «EL PRÓXIMO LO ELEGÍS: A, B o C»
   ====================================================================== */
headline(S.T[0], K.alejandro - 0.06, 'El próximo *lo elegís*', { size: 100, hlT: K.elegis, y: 262 });
headline(K.alejandro - 0.06, S.T[1], 'Elige: *A, B o C*', { size: 110, hlT: K.vota, y: 262 });
{
  const CT = [K.alejandro, K.cero, K.revancha], LT = [K.A11, K.B11, K.C11];
  const CDS = [];
  const c = scene(S.T[0], S.T[1], t => {
    CDS.forEach((q, i) => {
      const t0 = S.T[0] + 0.05 + i * 0.1, kin = p(t, t0, 0.4, E.outCubic);
      const kf = p(t, CT[i] - 0.1, 0.35, E.inOutCubic), sx = Math.cos(kf * Math.PI);
      q.flip.style.transform = `scaleX(${f1(Math.max(0.02, Math.abs(sx)) * 1000) / 1000})`;
      q.front.style.display = sx < 0 ? '' : 'none'; q.back.style.display = sx < 0 ? 'none' : '';
      const act = t > CT[i] && (i === 2 ? t < K.vota : t < CT[i + 1]);
      const vb = t > LT[i] && t < LT[i] + 0.5 ? Math.sin((t - LT[i]) / 0.5 * Math.PI) : 0;
      set(q.e, { y: (1 - kin) * 1200 - (act ? 20 : 0) - vb * 40, s: ((act ? 1.06 : 1) + vb * 0.08) * 0.93, r: q.r + wobble(t, 0.4, 0.8, i) });
      q.glow.style.opacity = act || vb > 0 ? 1 : 0;
    });
    // B: las letras O y K; C: Napoleón y el tallímetro
    [bo, bk].forEach((f, i) => { set(f.d, { y: wobble(t, 0.7, 4, i), r: [-5, 5][i] }); sortFace(f, t, { look: [0, -2], open: t > K.cero && t < K.ok11 + 0.4 ? 0.4 : 0, bL: 10, bR: 10, aL: 20, aR: 20, seed: i }); });
    nface(nap, t, { look: [-4, 0], seed: 0.5, angry: t > K.revancha ? 0.6 : 0, mouth: t > K.revancha ? 'S' : 'N' });
    set(alx.d, { y: wobble(t, 0.5, 3) }); face(alx, t, { look: [3, 0], seed: 0.9 });
    R.setH(1.68);
    const kv = p(t, K.vota - 0.05, 0.35, E.outBack);
    set(vt, { s: kv, o: t > K.vota - 0.05 ? 1 : 0, r: -2 });
    set(hand, { o: t > K.vota ? 1 : 0, y: Math.sin(t * 6) * 12, s: pop(t, K.vota, 0.3) });
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.05) 0 3px, transparent 3px 60px)' });
  halftone(c, 'rgba(43,33,24,.05)', 0);
  const NAMES = ['Alejandro<br>Magno', 'el mito de los<br>«cero muertos»', 'Napoleón,<br>la revancha'];
  [[60, -3], [370, 2], [680, -2]].forEach(([x, r], i) => {
    const e = box(c, x, 440, 290, 640, { zIndex: 10 + i });
    const glow = box(e, -16, -16, 322, 672, { borderRadius: '40px', background: YEL, opacity: 0, border: `5px solid ${INK}` });
    const flip = box(e, 0, 0, 290, 640, { transformOrigin: '145px 320px' });
    const back = box(flip, 0, 0, 290, 640, { background: '#3a2a1e', border: `6px solid ${INK}`, borderRadius: '28px', boxShadow: `9px 11px 0 ${SH}`, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,.07) 0 10px, transparent 10px 24px)' });
    el('div', back, { left: '0', top: '200px', width: '278px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '200px', lineHeight: '220px', color: YEL, textShadow: `5px 5px 0 ${INK}` }, '?');
    const front = box(flip, 0, 0, 290, 640, { background: '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '28px', boxShadow: `9px 11px 0 ${SH}`, overflow: 'hidden' });
    el('div', front, { left: '0', top: '500px', width: '278px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '36px', lineHeight: 1.08, color: INK }, NAMES[i]);
    [back, front].forEach(f => el('div', f, { left: '14px', top: '12px', width: '84px', height: '84px', borderRadius: '50%', background: [PINK, YEL, '#7ac08a'][i], border: `5px solid ${INK}`, fontFamily: 'Playfair', fontWeight: 900, fontSize: '58px', lineHeight: '74px', textAlign: 'center', color: INK, zIndex: 5 }, 'ABC'[i]));
    CDS.push({ e, flip, back, front, glow, r });
  });
  const alx = mk(CDS[0].front, [-5, 96, 300, 383], alexInner(), '0 0 360 460', 'bust');
  const bo = mkSort(CDS[1].front, [20, 150, 130, 204], 'O'), bk = mkSort(CDS[1].front, [140, 160, 130, 204], 'K');
  el('div', CDS[1].front, { left: '0', top: '380px', width: '278px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '40px', color: RED }, '«0 killed»');
  const NW = box(CDS[2].front, 10, 40, 400, 470, { transformOrigin: '0 0', transform: 'scale(0.8)' });
  const R = mkRuler(NW, 0, 440, 210, { arm: 90, top: 1.9, slZ: 2, z: 3, tagSize: 40 }); R.tag.innerHTML = '1,68';
  const nap = mkMan(NW, 260, 440, 1.68, 210, { seed: 1 }); nap.d.style.zIndex = 4;
  const vt = el('div', c, { left: '120px', top: '1088px', width: '820px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '80px', lineHeight: 1.15, color: '#fff', background: INK, borderRadius: '28px', padding: '4px 0 10px', boxShadow: `8px 8px 0 ${PINK}`, zIndex: 30, whiteSpace: 'nowrap' }, `VOTA <span style="color:${YEL}">A, B o C</span> 👇`);
  const hand = box(c, 790, 1130, 130, 130, { zIndex: 31 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="130" height="130" style="overflow:visible">${gloveHand(0, 0, 90, 1.15)}</svg>`;
}

/* ======================================================================
   BAL · «MIL GRACIAS. SOY TU VECINO… Y ESTO NO VENÍA…» — balcón + confeti de papel (del Ep. 23)
   ====================================================================== */
{
  const T0 = S.BAL[0], T1 = S.BAL[1];
  const c = scene(T0, T1, t => {
    const ex = p(t, T1 - 0.2, 0.2, E.inCubic);
    set(cam, { s: lerp(1.04 + 0.04 * p(t, T0, T1 - T0, E.linear), 0.3, ex), x: ex * -330, y: ex * 380, o: 1 - ex * 0.6 });
    const lean = p(t, K.esto - 0.3, 0.4, E.inOutCubic);
    set(vec.d, { s: 1 + lean * 0.07, y: wobble(t, 0.5, 3) - lean * 20 });
    const thr = t > K.mil12 && t < K.soy;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > K.vecino + 0.5 && t < K.esto ? [0, -5] : t > K.esto ? [-4, 3] : [0, 0], bL: thr ? 10 : t > K.esto ? 6 : 0, bR: thr ? 10 : t > K.esto ? 12 : 0, fan: thr ? Math.sin(t * 22) * 18 : wobble(t, 0.9, 6), seed: 0.3 });
    popA(tag, t, K.vecino, { r: -5 });
    set(mg, { s: pop(t, K.mil12 - 0.05, 0.35), y: t > K.soy - 0.1 ? -p(t, K.soy - 0.1, 0.2) * 500 : 0, r: -3, o: t > K.mil12 - 0.05 ? 1 : 0 });
    const ks = p(t, K.soy - 0.05, 0.55, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: Math.sin(t * 2.4) * 1.5 * (1 - p(t, K.soy, 2)) + (1 - ks) * 8, o: t < K.soy - 0.07 ? 0 : 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    paint(sHL, t, K.vecino, 0.3);
    pots.forEach((pt, i) => set(pt, { r: wobble(t, 0.7, 1.5, i) }));
    updConf(CF, t, K.mil12 + 0.1);
  }, { clip: true, cut: true });
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
  const CF = paperConfetti(cam, 40, 63, [PINK, YEL, '#fff', RED, '#8a6a4a'], { z: 45, vy: 1000, x0: 140, xw: 800, y0: 500, spread: 120, dd: 1.2 });
  const tag = chip(cam, 640, 610, 'tu vecino', { size: 44, bg: PINK });
  const mg = el('div', cam, { left: '0', top: '200px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '140px', color: '#fff', textShadow: `8px 8px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}`, zIndex: 41, whiteSpace: 'nowrap' }, '¡Mil gracias!');
  const sign = box(cam, 120, 150, 840, 270, { zIndex: 40 });
  sign.innerHTML = `<svg width="840" height="270" style="position:absolute;left:0;top:0;overflow:visible"><path d="M160,0 L200,40 M680,0 L640,40" stroke="${INK}" stroke-width="5"/>${cut('<rect x="20" y="40" width="800" height="226" rx="22"/>')}<rect x="20" y="40" width="800" height="226" rx="22" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="36" y="56" width="768" height="194" rx="14" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
  const sl1 = el('div', sign, { left: '0', top: '62px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '76px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sl2 = el('div', sign, { left: '0', top: '146px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '90px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sw = [];
  [['Soy', K.isoy], ['tu', K.isoy + 1], ['vecino…', K.isoy + 2], ['y', K.iye], ['esto', K.iye + 1], ['no', K.iye + 2], ['venía…', K.iye + 3]].forEach(([wd, wi], k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.innerHTML = wd === 'vecino…' ? hlSpan('vecino…', 'shl') : wd; (k < 3 ? sl1 : sl2).appendChild(s); s.style.position = 'relative'; sw.push({ e: s, t: W[wi].s }); });
  const sHL = sign.querySelector('.shl');
}

/* ======================================================================
   BK · …EN EL LIBRO — el libro HISTORIA se cierra (un milpiés encima: guiño al bucle)
   ====================================================================== */
headline(S.BK[0], LOOP, '…en el *libro.*', { size: 96, hlT: K.libro, y: 150 });
{
  const TC = K.libro - 0.22;
  const c = scene(S.BK[0], LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    mini.wrap.style.display = sx > 0.25 ? '' : 'none';
    mini.update(u => [880 - u * 300, 600 + Math.sin(u * 6 - t * 4) * 12], t, { speed: 14, look: [4, -2], seed: 5 });
    set(bookW, { x: 210 * 1.25 * p(t, TC + 0.2, 0.25, E.outCubic), s: 1.25 * pop(t, S.BK[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    puffs.forEach((f, i) => { const kf = p(t, TC + 0.3, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 150 * kf, y: -kf * 120, s: 0.5 + kf, o: closed ? 1 - kf : 0 }); });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="58" fill="${INK}">MILES</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="34" fill="${INK}">que te han colado</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const mini = mkMilli(bookW, { n: 12, rx: 12, ry: 22, legL: 30, lw: 3.5, sw: 2.5, col: '#B0703F', z: 2 });
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '500px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const epl = el('div', c, { left: '0', top: '1150px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:40px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 24 · Especial 1.000</span>`);
  const _fe = SC[SC.length - 1].fn; SC[SC.length - 1].fn = t => { _fe(t); popA(epl, t, TC + 0.3, { r: -1 }); };
  const puffs = [0, 1, 2, 3].map(() => box(bookW, 480, 600, 120, 80, { borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}`, zIndex: 3 }));
  // Aladino (la silueta del golpe rosa) se queda FUERA del libro: asoma por detrás de la tapa, con la lámpara
  const sil = mk(bookW, [390, 400, 150, 266], aladInner(), '0 0 260 460', 'bust'); sil.d.style.filter = SIL; sil.d.style.zIndex = 0; sil.d.style.transformOrigin = '50% 100%';
  const slp = box(bookW, 320, 520, 120, 68, { zIndex: 0, filter: SIL, transformOrigin: '80% 50%' }); slp.innerHTML = svgW(lampInner(), '0 0 300 170');
  const _fe2 = SC[SC.length - 1].fn;
  SC[SC.length - 1].fn = t => {
    _fe2(t);
    const ka = p(t, TC + 0.32, 0.4, E.outBack), on = t > TC + 0.3;
    set(sil.d, { y: (1 - ka) * 260, r: on ? -6 + Math.sin(t * 5) * 3 : 0, o: on ? 1 : 0 });
    set(slp, { y: (1 - ka) * 260, x: 0, r: -14 + Math.sin(t * 6) * 6, o: on ? 1 : 0 });
  };
}

/* ======================================================================
   CARTA «4 ?» — boca abajo durante la votación; en «Y el cuarto, el gordo» va al centro y se da la vuelta en «Las…»
   ====================================================================== */
{
  const T0 = S.T[0], TF = K.las - 0.12, TE = K.las + 0.08; // giro: TF → TE (a mitad del giro se convierte en el libro)
  const card = box(null, 340, 560, 400, 330, {});
  const c = scene(T0, TE, t => {
    const kg = p(t, S.BOOK[0], 0.4, E.inOutCubic);           // de la esquina al centro
    const kin = pop(t, T0 + 0.35, 0.4);
    const sm = lerp(0.47, 1.05, kg) * (t < S.BOOK[0] ? kin : 1);
    const kf = p(t, TF, TE - TF, E.inCubic);
    set(cw, { x: lerp(-365, 0, kg), y: lerp(578, 0, kg) + wobble(t, 0.5, 4), s: sm, r: lerp(-6, 0, kg) + wobble(t, 0.4, 1.5) });
    cw.style.opacity = t < T0 + 0.35 ? 0 : 1;
    inner.style.transform = `scaleX(${f1(Math.max(0.02, 1 - kf) * 1000) / 1000})`;
    set(qm, { r: Math.sin(t * 5) * 10, s: 1 + 0.08 * Math.sin(t * 6) });
    stampA(gs, t, K.gordo, -8, 1);
    gs.style.visibility = t > K.gordo && t < TF ? 'visible' : 'hidden';
    set(lab, { o: t < S.BOOK[0] - 0.1 ? 1 : 0 });
  }, { z: 650, cut: true });
  const cw = box(c, 340, 560, 400, 330, { zIndex: 1 });
  const inner = box(cw, 0, 0, 400, 330, { background: '#3a2a1e', border: `6px solid ${INK}`, borderRadius: '30px', boxShadow: `10px 12px 0 ${SH}`, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,.07) 0 10px, transparent 10px 24px)' });
  el('div', inner, { left: '18px', top: '10px', width: '78px', height: '78px', borderRadius: '50%', background: YEL, border: `5px solid ${INK}`, fontFamily: 'Playfair', fontWeight: 900, fontSize: '50px', lineHeight: '68px', textAlign: 'center', color: INK }, '4');
  const qm = el('div', inner, { left: '0', top: '50px', width: '388px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '200px', lineHeight: '220px', color: YEL, textShadow: `5px 5px 0 ${INK}` }, '?');
  const lab = el('div', cw, { left: '420px', top: '110px', width: '760px', textAlign: 'left', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '76px', color: INK, whiteSpace: 'nowrap', textShadow: '3px 3px 0 #fff' }, 'el gordo, al final');
  const gs = stamp(c, 330, 860, 'EL GORDO', { size: 110, bw: 15, z: 5, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  card.remove();
}
