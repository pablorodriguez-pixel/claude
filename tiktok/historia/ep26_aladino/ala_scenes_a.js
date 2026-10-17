/* Ep. 26 · escenas L0–L4 (portada, original, Sherezade, Galland, la regla 1→1.001) */
const bigTxt = (pa, x, y, w, html, o = {}) => el('div', pa, Object.assign({ left: px(x), top: px(y), width: px(w), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(o.size || 200), lineHeight: 1, color: o.color || '#fff', textShadow: o.sh || `10px 10px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`, zIndex: o.z || 10, whiteSpace: 'nowrap' }, o.css || {}), html);
const strip = c => { const s = paperPiece(c, -20, 244, 1120, 140, { seed: 88, bg: '#F6ECD4' }).wrap; s.style.zIndex = 30; return s; };
function nightSky(pa, seed = 23, moon = true) {
  const sky = box(pa, 0, 0, 1080, 1920, { zIndex: 1 }); const r = rng(seed); let s = '';
  for (let k = 0; k < 46; k++) s += `<path d="M${f1(r() * 1080)},${f1(300 + r() * 1200)} l5,12 l12,4 l-12,4 l-5,12 l-5,-12 l-12,-4 l12,-4 Z" fill="${YEL}" opacity="${f1(0.3 + r() * 0.6)}"/>`;
  if (moon) s += `<path d="M880,430 a90,90 0 1,0 60,150 a74,74 0 1,1 -60,-150 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="5"/>`;
  sky.innerHTML = `<svg width="1080" height="1920">${s}</svg>`; return sky;
}
const nightBg = c => sceneBg(c, { background: '#2f2a4a', backgroundImage: 'radial-gradient(circle at 50% 52%, #4a3f6a 0%, #2f2a4a 60%, #1e1a30 100%)' });

/* ======================================================================
   A · PORTADA / GANCHO — libro gigante con un HUECO con forma de Aladino; Aladino entra de puntillas. «¿ALADINO, UN COLADO?»
   ====================================================================== */
{
  const TIN = 1.05; // llega al hueco
  const c = scene(S.A[0], S.A[1], t => {
    set(cam, { s: 1.0 + 0.04 * p(t, 0, 2.9, E.linear) });
    set(ttl1, { y: wobble(t, 0.5, 4), r: -2 + wobble(t, 0.4, 0.6) });
    set(ttl2, { y: wobble(t, 0.45, 4, 1), r: 1.5 + wobble(t, 0.4, 0.6, 2) });
    const ka = p(t, -0.55, TIN + 0.55, E.inOutCubic);
    const tip = t < TIN ? Math.abs(Math.sin(t * 11)) : 0;
    set(al.d, { x: (1 - ka) * 420, y: -tip * 26, r: t < TIN ? -6 + Math.sin(t * 11) * 4 : 0 });
    face(al, t, { look: t < TIN ? [-5, 0] : [0, 0], seed: 0.3, closed: t > K.noches0 && t < K.noches0 + 0.35, brow: t > TIN && t < K.colaron ? -4 : 0 });
    // al entrar en el hueco, la silueta deja de verse detrás
    hole.style.opacity = t > TIN + 0.05 ? 0 : 1;
    set(lamp, { y: Math.sin(t * 4) * 6, r: -6 + Math.sin(t * 3) * 3 });
    puffs.forEach((q, i) => { const ph = ((t * 0.9 + i / puffs.length) % 1); set(q, { x: ph * 120 + Math.sin(t * 3 + i) * 16, y: -ph * 360, s: 0.5 + ph * 1.3, o: (1 - ph) * 0.85 }); });
    stampA(st, t, K.colaron, -8, 1);
    paint(tHL, t, -1, 0.1);
    set(rib, { r: -1 + wobble(t, 0.6, 0.8) });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 960px' });
  nightBg(cam); nightSky(cam, 23, false);
  rays(cam, -160, 340, 1400, 26, 'rgba(255,230,0,.07)', 'rgba(0,0,0,0)', 1);
  openBook(cam, { y: 690, h: 560, arab: true, holeR: true, z: 4 });
  const rib = el('div', cam, { left: '200px', top: '640px', width: '680px', textAlign: 'center', fontFamily: 'Rye', fontSize: '46px', color: '#FBF6EA', background: RED, border: `5px solid ${INK}`, borderRadius: '12px', padding: '4px 0 8px', boxShadow: `6px 6px 0 ${INK}`, zIndex: 9, whiteSpace: 'nowrap' }, 'LAS MIL Y UNA NOCHES');
  const hole = aladHole(cam, 640, 760, 230, 6);
  const al = mk(cam, [640, 760, 230, 407], aladInner(), '0 0 260 460', 'bust'); al.d.style.zIndex = 7; al.d.style.transformOrigin = '50% 95%';
  const lamp = box(cam, 70, 1090, 320, 181, { zIndex: 8 }); lamp.innerHTML = svgW(lampInner(), '0 0 300 170');
  const puffs = [0, 1, 2, 3, 4].map(i => box(cam, 360, 1080, 70, 56, { zIndex: 7, borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}` }));
  const T1 = { fontFamily: 'Playfair', fontWeight: 900, lineHeight: 1, color: '#fff', textAlign: 'center', zIndex: 20, whiteSpace: 'nowrap', textShadow: `9px 9px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}` };
  const ttl1 = el('div', cam, Object.assign({ left: '0', top: '306px', width: '1080px', fontSize: '150px' }, T1), '¿ALADINO,');
  const ttl2 = el('div', cam, Object.assign({ left: '0', top: '462px', width: '1080px', fontSize: '138px' }, T1), `UN ${hlSpan('<span style="color:#fff">COLADO</span>', 'thl')}?`);
  const tHL = ttl2.querySelector('.thl'); tHL.style.background = PINK;
  const st = stamp(cam, 250, 1000, 'COLADO', { size: 124, bw: 16, z: 30, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   B · «EN EL ORIGINAL NO SALE» — índice del manuscrito árabe; un dedo baja… y en el hueco, X roja
   ====================================================================== */
headline(S.B[0], S.B[1], 'En el original *no sale*', { size: 96, hlT: K.no1, y: 262 });
{
  const RY = [540, 618, 696, 774, 852], SLOT = 940;
  const c = scene(S.B[0], S.B[1], t => {
    set(cam, { s: lerp(1.0, 1.05, p(t, S.B[0], 1.6, E.linear)) });
    const kf = p(t, S.B[0] + 0.1, K.no1 - S.B[0] - 0.15, E.inOutCubic);
    const fy = lerp(RY[0], SLOT, kf);
    set(hand, { y: fy - 520 + Math.sin(t * 9) * 4, x: Math.sin(t * 5) * 6 });
    rows.forEach((r, i) => { r.style.background = Math.abs(fy - RY[i]) < 40 ? 'rgba(255,230,0,.55)' : 'transparent'; });
    set(xx, { s: pop(t, K.no1, 0.3), r: -6, o: t > K.no1 ? 1 : 0 });
    stampA(st, t, K.no1 + 0.18, -5, 1);
    set(qq, { o: t > K.sale ? 1 : 0, s: pop(t, K.sale, 0.3), r: Math.sin(t * 5) * 8 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '600px 760px' });
  sceneBg(cam, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 52px)' });
  const pg = paperPiece(cam, 300, 400, 640, 660, { seed: 12, bg: '#F3E6C4' }); pg.wrap.style.zIndex = 4;
  const inn = pg.inner;
  el('div', inn, { left: '24px', top: '18px', fontFamily: 'SpecialElite', fontSize: '34px', color: '#fff', background: INK, padding: '2px 16px', borderRadius: '8px', whiteSpace: 'nowrap' }, 'manuscrito árabe');
  const deco = box(inn, 0, 0, 622, 642); deco.innerHTML = `<svg width="622" height="642"><path d="M30,90 H592" stroke="${BRASS}" stroke-width="5"/><path d="M290,84 q21,-28 42,0 q-21,28 -42,0 Z" fill="${RED}" opacity=".6" stroke="${INK}" stroke-width="2"/></svg>`;
  const rows = RY.map((y, i) => { const r = box(inn, 20, y - 400 - 30, 582, 60, { borderRadius: '10px' }); r.innerHTML = `<svg width="582" height="60" style="overflow:visible">${arabLine(250, 560, 40, 70 + i, 3.6)}<path d="M90,40 H240" stroke="${INK}" stroke-width="3" stroke-dasharray="3 9"/>${arabLine(30, 80, 40, 90 + i, 3.6)}</svg>`; return r; });
  box(inn, 40, SLOT - 400 - 40, 540, 80, { border: `5px dashed ${RED}`, borderRadius: '14px', background: 'rgba(200,16,46,.05)' });
  const hand = box(cam, 830, 520, 160, 160, { zIndex: 12 }); hand.innerHTML = `<svg viewBox="-80 -80 160 160" width="160" height="160" style="overflow:visible">${gloveHand(0, 0, -90, 1.3)}</svg>`;
  const xx = box(cam, 560, SLOT - 90, 180, 180, { zIndex: 14 }); xx.innerHTML = XSVG;
  const qq = el('div', cam, { left: '420px', top: px(SLOT - 70), fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', color: INK, zIndex: 13, opacity: 0 }, '?');
  const st = stamp(cam, 330, 1078, 'ALADINO: NO', { size: 76, bw: 12, z: 30, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   C · «Y SÉ QUIÉN LO COLÓ» — foco; sombra de una mano con pluma + «?» amarillo
   ====================================================================== */
headline(S.C[0], S.C[1], 'Y sé *quién* lo coló', { size: 104, hlT: K.quien, y: 262 });
{
  const c = scene(S.C[0], S.C[1], t => {
    set(cam, { s: lerp(1.02, 1.1, p(t, S.C[0], 1.8, E.linear)) });
    const kl = p(t, S.C[0] + 0.05, 0.3, E.outCubic);
    cone.style.opacity = kl;
    set(sh, { y: wobble(t, 0.6, 4), r: wobble(t, 0.5, 1.5), o: kl }); set(shq, { r: -20 + Math.sin(t * 16) * 10, o: kl });
    set(qm, { s: pop(t, K.quien, 0.4) * (1 + 0.06 * Math.sin(t * 7)), r: 8 + Math.sin(t * 4) * 6, o: t > K.quien ? 1 : 0 });
    set(ink, { o: t > K.colo1 ? 1 : 0, s: pop(t, K.colo1, 0.3) });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: '#1e1a30', backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,.03) 0 4px, transparent 4px 90px)' });
  strip(c);
  const cone = box(cam, 0, 0, 1080, 1920, { zIndex: 2 }); cone.innerHTML = `<svg width="1080" height="1920"><path d="M470,380 L610,380 L940,1260 L140,1260 Z" fill="rgba(255,236,160,.28)"/><ellipse cx="540" cy="1260" rx="400" ry="60" fill="rgba(255,236,160,.35)"/><rect x="455" y="372" width="170" height="40" rx="10" fill="${METAL2}" stroke="${INK}" stroke-width="5"/></svg>`;
  const sh = box(cam, 290, 620, 500, 640, { zIndex: 4, filter: SIL, transformOrigin: '50% 100%' });
  sh.innerHTML = svgW(hannaInner(), '0 0 360 460');
  const shq = box(cam, 640, 900, 140, 280, { zIndex: 5, transformOrigin: '30% 100%' }); shq.innerHTML = quillSvg(); shq.style.filter = SIL;
  const qm = el('div', cam, { left: '620px', top: '430px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '300px', lineHeight: 1, color: YEL, textShadow: `8px 8px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}`, zIndex: 20 }, '?');
  const ink = box(cam, 640, 1160, 160, 40, { zIndex: 5, borderRadius: '50%', background: '#000', opacity: 0 });
}

/* ======================================================================
   D · «SON LOS CUENTOS DE SHEREZADE» — Sherezade cuenta; el bocadillo cambia de cuento
   ====================================================================== */
headline(S.D[0], S.D[1], 'Los cuentos de *Sherezade*', { size: 72, hlT: K.sherezade, y: 262 });
{
  const c = scene(S.D[0], S.D[1], t => {
    set(cam, { s: lerp(1.0, 1.06, p(t, S.D[0], 1.7, E.linear)) });
    set(sh.d, { y: wobble(t, 0.5, 4), r: wobble(t, 0.4, 1) });
    face(sh, t, { jaw: talkW(t, 'VECINO', 0.45), look: [4, -2], seed: 0.6 });
    set(bub, { s: pop(t, S.D[0] + 0.15, 0.4), r: 2 + wobble(t, 0.5, 1.5) });
    const k = Math.floor(clamp((t - S.D[0] - 0.2) / 0.42, 0, 9)) % ICO.length;
    ICO.forEach((e, i) => { e.style.opacity = i === k ? 1 : 0; set(e, { s: i === k ? 1 + 0.06 * Math.sin(t * 8) : 1, r: Math.sin(t * 4 + i) * 5 }); });
    popA(nm, t, K.sherezade, { r: -3 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '400px 900px' });
  sceneBg(cam, { background: '#8a2f3a', backgroundImage: `repeating-linear-gradient(45deg, rgba(233,199,92,.22) 0 6px, transparent 6px 46px), repeating-linear-gradient(-45deg, rgba(233,199,92,.22) 0 6px, transparent 6px 46px)` });
  halftone(cam, 'rgba(0,0,0,.12)', 1);
  strip(c);
  const sh = mk(cam, [40, 600, 560, 716], sheraInner(), '0 0 360 460', 'bust'); sh.d.style.zIndex = 5;
  const bub = box(cam, 540, 420, 420, 400, { zIndex: 8 });
  bub.innerHTML = `<svg width="420" height="400" style="overflow:visible"><path d="M40,330 L10,400 L120,350 Z" fill="#fff" stroke="${INK}" stroke-width="6"/><ellipse cx="210" cy="190" rx="200" ry="170" fill="#fff" stroke="${INK}" stroke-width="7"/><path d="M40,330 L10,400 L120,350" fill="#fff"/></svg>`;
  const ICOS = [
    `<path d="M40,150 L240,150 L210,200 L70,200 Z" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><path d="M140,150 V30 L220,130 Z" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M135,150 V40 L70,130 Z" fill="${PINK}" stroke="${INK}" stroke-width="5"/><path d="M20,220 q30,-16 60,0 t60,0 t60,0 t60,0" stroke="#3f7a8a" stroke-width="7" fill="none"/>`,
    `<path d="M60,200 V120 H220 V200 Z" fill="#FBF0DC" stroke="${INK}" stroke-width="5"/><path d="M80,120 C80,60 130,40 140,10 C150,40 200,60 200,120 Z" fill="#3f7a8a" stroke="${INK}" stroke-width="5"/><path d="M125,200 V160 Q140,140 155,160 V200 Z" fill="#3a2a1e"/>`,
    `<path d="M40,130 C90,60 190,60 230,130 C190,200 90,200 40,130 Z" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><path d="M230,130 L270,90 L270,170 Z" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><circle cx="90" cy="120" r="10" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="92" cy="120" r="4" fill="${INK}"/><path d="M120,100 q20,30 0,60 M150,96 q20,34 0,68" stroke="${INK}" stroke-width="3" fill="none"/>`,
  ];
  const ICO = ICOS.map(s => { const e = box(bub, 70, 70, 280, 240); e.innerHTML = `<svg viewBox="0 0 280 240" width="280" height="240" style="overflow:visible">${s}</svg>`; return e; });
  const nm = chip(cam, 120, 1200, 'Sherezade', { size: 50, bg: YEL, color: INK, z: 20 });
}

/* ======================================================================
   E · «UNO CADA NOCHE» — lunas que se apilan, una por noche → «1.001 NOCHES»
   ====================================================================== */
headline(S.E[0], S.E[1], '*Uno* cada noche', { size: 112, hlT: K.uno2, y: 262 });
{
  const MO = [];
  const c = scene(S.E[0], S.E[1], t => {
    MO.forEach((m, i) => { const t0 = S.E[0] + 0.02 + i * 0.016; set(m, { s: pop(t, t0, 0.22), r: -20 + (i % 5) * 9, o: t < t0 ? 0 : 1 }); });
    stampA(st, t, K.noche2, -6, 1);
  }, { clip: true });
  nightBg(c); nightSky(c, 77, false); strip(c);
  for (let r = 0; r < 5; r++) for (let q = 0; q < 6; q++) { const m = box(c, 140 + q * 132 + (r % 2) * 26, 430 + r * 150, 116, 116, { zIndex: 5 }); m.innerHTML = moonSvg(r * 6 + q < 29 ? '#FBF6EA' : YEL); MO.push(m); }
  const st = stamp(c, 175, 690, '1.001 NOCHES', { size: 98, bw: 15, z: 30, bg: 'rgba(255,255,255,.95)', blend: 'normal' });
}

/* ======================================================================
   F · «PARA QUE EL REY NO LA MATE» — el rey con la cimitarra y el reloj de arena
   ====================================================================== */
headline(S.F[0], S.F[1], 'para que el rey *no la mate*', { size: 70, hlT: K.no2, y: 262 });
{
  const c = scene(S.F[0], S.F[1], t => {
    set(cam, { s: lerp(1.0, 1.08, p(t, S.F[0], 1.5, E.linear)) });
    set(kg.d, { y: wobble(t, 0.5, 3) });
    face(kg, t, { look: [-4, 2], seed: 1.1, brow: 6 });
    const ks = p(t, K.mate - 0.1, 0.25, E.outBack);
    set(sc, { r: lerp(-8, 32, ks) + Math.sin(t * 3) * 3, y: -ks * 30 });
    const kh = p(t, S.F[0], S.F[1] - S.F[0], E.linear);
    sTop.setAttribute('y', f1(60 + kh * 90)); sBot.setAttribute('y', f1(240 - kh * 60)); sStr.style.opacity = t < S.F[1] - 0.05 ? 1 : 0;
    set(hg, { r: -4 + Math.sin(t * 2) * 2 });
    popA(rc, t, K.rey, { r: -3 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 760px' });
  sceneBg(cam, { background: '#5a1f2a', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.18) 0 40px, rgba(255,255,255,.04) 40px 80px)' });
  halftone(cam, 'rgba(0,0,0,.14)', 1); strip(c);
  const kg = mk(cam, [190, 560, 660, 843], kingInner(), '0 0 360 460', 'bust'); kg.d.style.zIndex = 5;
  const sc = box(cam, 760, 380, 150, 525, { zIndex: 6, transformOrigin: '50% 95%' }); sc.innerHTML = svgW(scimInner(), '0 0 120 420');
  const hg = box(cam, 60, 760, 200, 320, { zIndex: 7 }); hg.innerHTML = svgW(hourInner(), '0 0 200 320');
  const sTop = hg.querySelector('.sTop'), sBot = hg.querySelector('.sBot'), sStr = hg.querySelector('.sStr');
  const rc = chip(cam, 360, 1180, 'el rey', { size: 50, bg: INK, color: YEL, z: 20 });
}

/* ======================================================================
   G1 · «EN 1704 LOS TRADUCE…» — manuscrito árabe → libro francés; sello 1704
   ====================================================================== */
headline(S.G1[0], S.G1[1], 'Los *traduce…*', { size: 116, hlT: K.traduce, y: 262 });
{
  const c = scene(S.G1[0], S.G1[1], t => {
    set(cam, { s: lerp(1.0, 1.05, p(t, S.G1[0], 1.9, E.linear)) });
    set(ms.wrap, { r: -5 + wobble(t, 0.6, 1.5), y: wobble(t, 0.5, 5) });
    stampA(yr, t, K.cuatro, -6, 1);
    ar.style.clipPath = `inset(0 ${f1((1 - p(t, K.cuatro + 0.3, 0.35, E.outCubic)) * 100)}% 0 0)`;
    set(fr, { s: pop(t, K.cuatro + 0.5, 0.4), r: 4 + wobble(t, 0.5, 1), o: t > K.cuatro + 0.5 ? 1 : 0 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: '#EFE1C6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.05) 0 3px, transparent 3px 64px)' });
  const ms = paperPiece(cam, 90, 470, 400, 520, { seed: 41, bg: '#F3E6C4' }); ms.wrap.style.zIndex = 5;
  { const d = box(ms.inner, 0, 0, 382, 502); let s = ''; for (let i = 0; i < 10; i++) s += arabLine(30, 350, 70 + i * 42, 200 + i, 3.4); d.innerHTML = `<svg width="382" height="502">${s}</svg>`; }
  el('div', ms.inner, { left: '20px', top: '446px', fontFamily: 'SpecialElite', fontSize: '28px', color: '#fff', background: INK, padding: '2px 12px', borderRadius: '8px' }, 'árabe');
  const ar = box(cam, 470, 640, 180, 120, { zIndex: 6 }); ar.innerHTML = arrowSvg('M10,60 L150,60 M110,20 L160,60 L110,100', PINK, 14);
  const fr = box(cam, 630, 470, 320, 500, { zIndex: 7, background: '#3f2a5a', border: `6px solid ${INK}`, borderRadius: '14px', boxShadow: `10px 12px 0 ${SH}` });
  box(fr, 18, 18, 272, 452, { border: `4px solid #e9c75c`, borderRadius: '8px' });
  el('div', fr, { left: '0', top: '90px', width: '308px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '50px', lineHeight: 1.08, color: '#e9c75c' }, 'LES<br>MILLE<br>ET UNE<br>NUITS');
  el('div', fr, { left: '0', top: '400px', width: '308px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '28px', color: '#fff' }, 'en francés');
  const yr = stamp(cam, 300, 1040, '1704', { size: 170, bw: 17, z: 30, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   G2 · «UN FRANCÉS, GALLAND» — Antoine Galland con peluca y pluma
   ====================================================================== */
headline(S.G2[0], S.G2[1], 'Un *francés:* Galland', { size: 104, hlT: K.frances, y: 262 });
{
  const c = scene(S.G2[0], S.G2[1], t => {
    set(cam, { s: lerp(1.04, 1.0, p(t, S.G2[0], 1.5, E.outCubic)) });
    set(gal.d, { y: wobble(t, 0.5, 4), r: wobble(t, 0.4, 1) });
    face(gal, t, { look: [5, -2], seed: 1.7 });
    set(ql, { r: -20 + Math.sin(t * 18) * 8, x: Math.sin(t * 18) * 8 });
    popA(nm, t, K.galland3, { r: -2 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#E9DFC6' });
  rays(cam, -160, 260, 1400, 24, 'rgba(255,62,165,.09)', 'rgba(0,0,0,0)', 1);
  const gal = mk(cam, [180, 430, 700, 894], gallandInner(), '0 0 360 460', 'bust'); gal.d.style.zIndex = 5;
  const ql = box(cam, 760, 760, 140, 280, { zIndex: 6, transformOrigin: '50% 100%' }); ql.innerHTML = quillSvg();
  const nm = chip(cam, 160, 1186, 'Antoine Galland · traductor francés', { size: 36, bg: INK, color: YEL, z: 20 });
}

/* ======================================================================
   G3 · «¡EXITAZO!» — lectores de París con peluca se arrancan los libros (cameo del emú)
   ====================================================================== */
headline(S.G3[0], S.G3[1], '*¡Exitazo!*', { size: 130, hlT: K.exitazo, y: 262 });
{
  const RD = [];
  const c = scene(S.G3[0], S.G3[1], t => {
    RD.forEach((q, i) => { set(q.f.d, { y: Math.abs(Math.sin(t * 9 + i * 1.3)) * -16, r: Math.sin(t * 7 + i) * 3 }); face(q.f, t, { look: [i < 2 ? 4 : -4, -4], seed: i * 0.7, brow: -3 }); });
    BK.forEach((b, i) => { const a = t * 6 + i * 2; set(b, { x: Math.sin(a) * 30, y: -Math.abs(Math.sin(a * 1.3)) * 50, r: Math.sin(a) * 24 }); });
    stampA(st, t, K.exitazo + 0.02, -7, 1);
    const ke = p(t, T_EMU, 0.18, E.outBack), kd = p(t, T_EMU + 0.42, 0.18, E.inCubic);
    set(emu.d, { y: (1 - ke) * 520 + kd * 520, r: -4 });
    emuW.style.visibility = ke > 0.001 && kd < 0.999 ? 'visible' : 'hidden';
    face(emu, t, { look: [0, 0], blink: false, bL: 16, bR: 22, jaw: 0 });
  }, { clip: true });
  sceneBg(c, { background: '#F1C8D2', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 70px)' });
  rays(c, -160, 300, 1400, 26, 'rgba(255,255,255,.35)', 'rgba(0,0,0,0)', 1);
  const emuW = box(c, 380, 620, 330, 500, { overflow: 'hidden', zIndex: 4 });
  const emu = mk(emuW, [0, 0, 330, 495], emuWigInner(), '0 -70 400 670', 'emuF');
  const COLS = ['#2f4a6a', '#5a1f2a', '#3a5a3a', '#4a3050', '#6a4a2a'];
  [[-20, 860, 13], [190, 900, 16], [400, 930, 18], [610, 900, 15], [820, 860, 22]].forEach(([x, y, sd], i) => { const f = mk(c, [x, y, 280, 358], readerInner(sd, COLS[i]), '0 0 360 460', 'bust'); f.d.style.zIndex = 6 + (i === 2 ? 2 : 0); RD.push({ f }); });
  const BK = [[90, 760], [250, 700], [730, 720], [860, 780]].map(([x, y], i) => { const b = box(c, x, y, 120, 150, { zIndex: 9, background: ['#3f2a5a', '#5a1f2a', '#2f4a6a', '#3f2a5a'][i], border: `5px solid ${INK}`, borderRadius: '8px', boxShadow: `5px 6px 0 ${SH}` }); box(b, 10, 10, 90, 120, { border: `3px solid #e9c75c`, borderRadius: '4px' }); return b; });
  const st = stamp(c, 190, 470, 'EXITAZO', { size: 132, bw: 17, z: 30, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   H · «PERO SU MANUSCRITO ACABA EN LA NOCHE 282. ¡LE FALTAN MÁS DE 700!»
   la REGLA 1 → 1.001 noches: se llena hasta la 282, el papel se rasga, el resto queda gris «+700 SIN CUENTO»
   ====================================================================== */
headline(S.H[0], K.noche4 - 0.06, 'Su manuscrito *acaba…*', { size: 80, hlT: K.acaba, y: 262 });
headline(K.noche4 - 0.06, K.le4 - 0.06, '…en la *noche*', { size: 110, hlT: K.noche4, y: 262 });
headline(K.le4 - 0.06, S.H[1], '¡Le *faltan…!*', { size: 116, hlT: K.faltan, y: 262 });
{
  const RX0 = 100, RX1 = 860, RW = RX1 - RX0, X282 = RX0 + RW * 282 / 1001, RY = 770;
  const TPULL = K.acaba - 0.05, TF0 = K.acaba + 0.15, TF1 = K.dos4 - 0.04, TRIP = K.dos4e + 0.05;
  const c = scene(S.H[0], S.H[1], t => {
    // cámara: primer plano del manuscrito (páginas pasando) → plano general con la regla
    const kp = p(t, TPULL, 0.55, E.inOutCubic);
    set(bookL, { s: lerp(1.0, 0.42, kp), y: lerp(0, -330, kp) });
    set(cam, { s: 1 + 0.03 * p(t, TPULL, 6, E.linear) });
    // páginas que pasan hasta «acaba»
    const fl = clamp((t - S.H[0] - 0.05) / 0.3); const nfl = Math.floor(fl < 1 ? 0 : 0);
    void nfl;
    const ph = ((t - S.H[0]) / 0.32) % 1, flipping = t < TPULL - 0.05;
    const sx = Math.cos(ph * Math.PI);
    flap.style.display = flipping ? '' : 'none';
    flap.style.transform = `scaleX(${f1(sx * 1000) / 1000})`;
    flapIn.style.background = sx > 0 ? '#F7F0E0' : '#EFE4CC';
    // regla
    const kr = p(t, TPULL + 0.25, 0.4, E.outBack);
    set(rul, { s: kr, o: t > TPULL + 0.25 ? 1 : 0 });
    const kf = p(t, TF0, TF1 - TF0, E.inOutCubic);
    fill.setAttribute('width', f1((X282 - RX0) * kf));
    set(pin, { x: (X282 - RX0) * kf, o: t > TF0 ? 1 : 0 });
    stampA(s282, t, K.dos4, -5, 1);
    // rasgón: el resto de la regla se queda gris y discontinuo
    const kt = p(t, TRIP, 0.35, E.outCubic);
    gray.style.opacity = kt; tear.style.opacity = t > TRIP ? 1 : 0;
    set(torn, { x: kt * 160, y: kt * kt * 700, r: kt * 34, o: t > TRIP ? 1 - p(t, TRIP + 0.5, 0.3) : 0 });
    holeP.style.opacity = t > TRIP ? 1 : 0;
    set(rest, { x: t > TRIP ? Math.sin((t - TRIP) * 40) * 6 * (1 - kt) : 0 });
    stampA(s700, t, K.setecientas, 4, 1);
    // lectores llamando a la puerta
    const kd = p(t, K.faltan - 0.2, 0.4, E.outBack);
    RDR.forEach((f, i) => { set(f.d, { o: t > K.faltan - 0.2 ? 1 : 0, x: (1 - kd) * 500, y: t > K.setecientas + 0.3 ? -Math.abs(Math.sin(t * 14 + i)) * 12 : 0 }); face(f, t, { look: [5, -2], seed: i, brow: -4 }); });
    set(door, { o: t > K.faltan - 0.2 ? 1 : 0, x: (1 - kd) * 500, r: t > K.setecientas + 0.4 ? Math.sin(t * 30) * 1.2 : 0 });
    set(ask, { s: pop(t, K.setecientas + 0.45, 0.35), r: -3, o: t > K.setecientas + 0.45 ? 1 : 0 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: '#E9DFC6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 46px)' });
  // manuscrito (libro abierto árabe)
  const bookL = box(cam, 0, 0, 1080, 1920, { zIndex: 4, transformOrigin: '540px 900px' });
  openBook(bookL, { y: 560, h: 520, arab: true, nl: 10, z: 1 });
  el('div', bookL, { left: '140px', top: '500px', fontFamily: 'SpecialElite', fontSize: '40px', color: '#fff', background: INK, padding: '4px 18px', borderRadius: '8px', zIndex: 3 }, 'su manuscrito');
  const holeP = box(bookL, 582, 600, 360, 440, { zIndex: 2, background: '#3a2a1e', clipPath: jag(5, 3, 10), opacity: 0 });
  const torn = box(bookL, 580, 574, 378, 492, { zIndex: 3, transformOrigin: '0 0', opacity: 0 });
  { let s = ''; for (let i = 0; i < 10; i++) s += arabLine(30, 340, 80 + i * 38, 400 + i, 3); torn.innerHTML = `<svg width="378" height="492"><path d="M0,0 H378 V492 H0 L14,440 L0,380 L18,300 L0,240 L16,170 L0,100 Z" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/>${s}</svg>`; }
  const flap = box(bookL, 540, 574, 418, 492, { zIndex: 4, transformOrigin: '0 50%' });
  const flapIn = box(flap, 0, 0, 418, 492, { background: '#F7F0E0', border: `4px solid ${INK}`, borderRadius: '0 8px 8px 0' });
  { const d = box(flapIn, 0, 0, 410, 484); let s = ''; for (let i = 0; i < 10; i++) s += arabLine(40, 370, 70 + i * 38, 600 + i, 3); d.innerHTML = `<svg width="410" height="484">${s}</svg>`; }
  // regla 1 → 1.001
  const rul = box(cam, 0, 0, 1080, 1920, { zIndex: 6, transformOrigin: '480px 800px' });
  let tk = ''; for (let x = RX0; x <= RX1 + 0.1; x += RW / 26) tk += `<path d="M${f1(x)},${RY + 6} v${RY + 64 - RY - 6}" stroke="${INK}" stroke-width="2" opacity=".35"/>`;
  rul.innerHTML = `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0">
    <rect x="${RX0 - 8}" y="${RY - 8}" width="${RW + 16}" height="86" rx="20" fill="#fff"/>
    <rect x="${RX0}" y="${RY}" width="${RW}" height="70" rx="14" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/>
    <rect class="fill" x="${RX0}" y="${RY}" width="0" height="70" rx="14" fill="#E9C75C"/>
    <g class="gray" opacity="0"><rect x="${X282}" y="${RY}" width="${RX1 - X282}" height="70" fill="#B8B0A2"/><path d="M${X282 + 10},${RY + 35} H${RX1 - 10}" stroke="#fff" stroke-width="8" stroke-dasharray="20 16"/></g>
    ${tk}<rect x="${RX0}" y="${RY}" width="${RW}" height="70" rx="14" fill="none" stroke="${INK}" stroke-width="6"/>
    <path class="tear" opacity="0" d="M${X282},${RY - 14} l-10,16 l12,14 l-12,16 l12,16 l-10,14 l8,16" stroke="${INK}" stroke-width="7" fill="none" stroke-linejoin="round"/>
    <text x="${RX0}" y="${RY - 22}" font-family="Playfair" font-weight="900" font-size="46" fill="${INK}">1</text>
    <text x="${RX1}" y="${RY - 22}" text-anchor="end" font-family="Playfair" font-weight="900" font-size="46" fill="${INK}">1.001 noches</text></svg>`;
  const fill = rul.querySelector('.fill'), gray = rul.querySelector('.gray'), tear = rul.querySelector('.tear');
  const rest = box(rul, 0, 0, 10, 10);
  const pin = box(rul, RX0 - 26, RY - 70, 52, 66, { zIndex: 3 }); pin.innerHTML = `<svg width="52" height="66" style="overflow:visible"><path d="M26,66 L2,24 A26,26 0 1,1 50,24 Z" fill="${RED}" stroke="${INK}" stroke-width="4"/><circle cx="26" cy="24" r="9" fill="#fff"/></svg>`;
  const s282 = stamp(cam, 110, 858, '282', { size: 112, bw: 16, z: 30, bg: 'rgba(255,255,255,.95)', blend: 'normal' });
  const s700 = stamp(cam, 516, 862, '+700<br>SIN CUENTO', { size: 46, bw: 11, z: 30, col: INK, bg: 'rgba(235,230,220,.96)', blend: 'normal', font: 'Rye' });
  s700.style.textAlign = 'center';
  const door = box(cam, 770, 1060, 170, 280, { zIndex: 7 }); door.innerHTML = `<svg width="170" height="300" style="overflow:visible">${cut('<rect x="0" y="0" width="170" height="300" rx="10"/>')}<rect x="0" y="0" width="170" height="300" rx="10" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="18" y="20" width="134" height="110" fill="none" stroke="${INK}" stroke-width="3"/><rect x="18" y="150" width="134" height="130" fill="none" stroke="${INK}" stroke-width="3"/><circle cx="30" cy="150" r="9" fill="${BRASS}" stroke="${INK}" stroke-width="3"/></svg>`;
  const RDR = [[470, 1110, 13, '#2f4a6a'], [610, 1130, 16, '#5a1f2a']].map(([x, y, sd, col]) => { const f = mk(cam, [x, y, 190, 243], readerInner(sd, col), '0 0 360 460', 'bust'); f.d.style.zIndex = 8; return f; });
  const ask = chip(cam, 380, 1060, '¿Y LA 283?', { size: 52, bg: '#fff', color: INK, z: 21 });
}
