/* Ep. 18 · escenas L5–L8 */

/* ======================================================================
   Y1 · 2007: SE INTENTÓ OTRA VEZ — sello «2007», pluma que escribe
   ====================================================================== */
{
  const c = scene(S.Y1[0], S.Y1[1], t => {
    { const k = p(t, K.dos, 0.18, E.outCubic); set(yr, { s: t < K.dos ? 0 : lerp(1.8, 1, k), r: -3, o: t < K.dos ? 0 : 1 }); }
    set(pp.wrap, { y: (1 - p(t, S.Y1[0] + 0.05, 0.45, E.outBack)) * 1000, r: 3 + wobble(t, 0.4, 0.6) });
    const kw = p(t, K.intento, 1.0, E.linear);
    LN.forEach((l, i) => { const k = clamp(kw * LN.length - i); l.style.clipPath = `inset(-10px ${f1((1 - k) * 100)}% -10px -10px)`; });
    set(quill, { x: lerp(0, 300, (kw * LN.length) % 1), y: Math.floor(Math.min(kw * LN.length, LN.length - 0.01)) * 52 + Math.sin(t * 30) * 4, r: -20 + Math.sin(t * 25) * 6, o: t < K.intento - 0.1 ? 0 : 1 });
    const ko = pop(t, K.otra, 0.4); set(arr, { s: ko, r: t * -160, o: t < K.otra ? 0 : 1 });
    popA(ov, t, K.otra + 0.1, { r: -4 });
  }, { cut: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  rays(c, -170, 160, 1420, 24, 'rgba(255,62,165,.12)', 'rgba(0,0,0,0)', 0);
  const yr = el('div', c, { left: 0, top: '190px', width: '1080px', textAlign: 'center', fontFamily: 'Rye', fontSize: '250px', lineHeight: '270px', color: YEL, textShadow: `10px 10px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}`, zIndex: 30 }, '2007');
  const pp = paperPiece(c, 300, 560, 480, 560, { seed: 61, bg: '#FBF6EA' }); pp.wrap.style.zIndex = 4;
  el('div', pp.inner, { left: '0', top: '16px', width: '462px', textAlign: 'center', fontFamily: 'Rye', fontSize: '44px', color: RED, whiteSpace: 'nowrap' }, 'LETRA');
  box(pp.inner, 24, 74, 414, 4, { background: INK });
  const LN = []; for (let k = 0; k < 7; k++) { const d = box(pp.inner, 0, 100 + k * 52, 462, 50); d.innerHTML = `<svg width="462" height="50" style="overflow:visible"><path d="${scribble(30, 430 - (k % 3) * 50, 34, 90 + k, 9)}" stroke="${INK}" stroke-width="3.4" fill="none" stroke-linecap="round"/></svg>`; LN.push(d); }
  const quill = box(pp.wrap, 40, 40, 200, 240, { zIndex: 8, transformOrigin: '20px 220px' });
  quill.innerHTML = `<svg viewBox="0 0 200 240" width="200" height="240" style="overflow:visible">${cut('<path d="M20,220 C40,150 90,60 190,0 C170,70 120,150 30,226 Z"/>', 4, 5)}<path d="M20,220 C40,150 90,60 190,0 C170,70 120,150 30,226 Z" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M24,222 L170,22" stroke="${INK}" stroke-width="2.5"/><path d="M60,170 l26,-6 M80,140 l28,-6 M100,110 l30,-8 M124,80 l30,-8" stroke="${INK}" stroke-width="2"/><path d="M14,232 L26,214" stroke="${INK}" stroke-width="6" stroke-linecap="round"/></svg>`;
  const arr = box(c, 740, 900, 200, 200, { zIndex: 20 });
  arr.innerHTML = `<svg viewBox="-100 -100 200 200" width="200" height="200" style="overflow:visible"><path d="M-62,-30 A70,70 0 1,1 -40,52" stroke="${INK}" stroke-width="34" fill="none" stroke-linecap="round"/><path d="M-62,-30 A70,70 0 1,1 -40,52" stroke="${PINK}" stroke-width="20" fill="none" stroke-linecap="round"/><path d="M-96,-40 L-56,-74 L-34,-22 Z" fill="${PINK}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/></svg>`;
  const ov = chip(c, 380, 1170, 'otra vez', { size: 56, bg: PINK, z: 30 });
}

/* ======================================================================
   Y2 · UNA LETRA NUEVA… RETIRADA EN POCOS DÍAS POR LAS CRÍTICAS
   ====================================================================== */
headline(S.Y2[0], K.y5 - 0.06, 'Una *letra nueva*…', { size: 100, hlT: K.letraN });
headline(K.y5 - 0.06, S.Y2[1], '…y se *retiró* en pocos días', { size: 76, hlT: K.retiro, hlc: '#ff9aa8' });
{
  const TF = K.dias + 0.12; // la hoja sale volando
  const c = scene(S.Y2[0], S.Y2[1], t => {
    const kin = p(t, S.Y2[0] + 0.02, 0.45, E.outBack), kf = clamp((t - TF) / 0.55);
    set(sh.wrap, { y: (1 - kin) * 900 - kf * kf * 1400, x: kf * kf * -500, r: -3 + wobble(t, 0.4, 0.8) - kf * 60, s: 1 + 0.04 * p(t, S.Y2[0], 2, E.linear) });
    set(glow, { r: t * 14, o: t < TF ? 1 - p(t, K.retiro, 0.2) : 0 });
    SP.forEach((s, i) => { const t0 = K.presento + i * 0.1; set(s, { s: pop(t, t0, 0.3) * (0.8 + 0.2 * Math.sin(t * 9 + i)), r: t * 120, o: t < t0 || t > K.retiro ? 0 : 1 }); });
    popA(nw, t, K.nueva, { r: -6 }); nw.style.opacity = t < K.nueva ? 0 : (t > K.retiro ? 0 : 1);
    stampA(ret, t, K.retiro, -10, 1);
    // calendario de taco: las hojas «día» se arrancan deprisa
    set(cal, { s: pop(t, K.y5, 0.4), r: 4, o: t < K.y5 ? 0 : 1 });
    CP.forEach((pg, i) => { const t0 = K.pocos + i * 0.17, k = clamp((t - t0) / 0.5); set(pg, { x: k * (i % 2 ? 260 : -200), y: k * k * 700 - k * 60, r: k * (i % 2 ? 70 : -60), o: t < t0 ? 1 : 1 - k }); });
    popA(pd, t, K.dias, { r: -4 });
    // críticas
    CR.forEach((f, i) => { const t0 = K.criticas - 0.25 + i * 0.1; set(f.d, { s: pop(t, t0, 0.4), y: wobble(t, 0.8, 3, i), o: t < t0 ? 0 : 1 }); face(f, t, { look: [[6, -4], [0, -6], [-6, -4]][i], jaw: t > K.criticas ? Math.abs(Math.sin(t * 13 + i)) * 0.5 : 0, brow: 6, seed: i }); });
    CB.forEach((b, i) => { const t0 = K.criticas + i * 0.14; set(b, { s: pop(t, t0, 0.3), r: [-8, 5, -4][i] + Math.sin(t * 7 + i) * 3, o: t < t0 ? 0 : 1 }); });
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6' });
  const glow = rays(c, 120, 300, 840, 20, 'rgba(255,230,0,.45)', 'rgba(0,0,0,0)', 1);
  const sh = lyricSheet(c, 290, 420, 500, 600, { seed: 71, title: 'LETRA NUEVA', tsz: 44, lh: 48 }); sh.wrap.style.zIndex = 6;
  const SP = [[230, 440], [800, 470], [830, 820], [210, 860]].map(([x, y]) => el('div', c, { left: px(x), top: px(y), fontSize: '64px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 30 }, '✦'));
  const nw = chip(c, 640, 980, '¡nueva!', { size: 52, bg: PINK, z: 30 });
  const ret = stamp(sh.wrap, -70, 200, 'RETIRADA', { size: 130, bw: 16, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const cal = box(c, 690, 520, 250, 300, { zIndex: 8 });
  box(cal, 0, 0, 250, 300, { background: '#fff', border: `5px solid ${INK}`, boxShadow: `8px 9px 0 ${SH}` });
  el('div', cal, { left: '0', top: '0', width: '250px', height: '70px', background: RED, borderBottom: `5px solid ${INK}`, fontFamily: 'Rye', fontSize: '40px', lineHeight: '70px', textAlign: 'center', color: '#fff' }, 'DÍAS');
  const CP = []; for (let i = 4; i >= 0; i--) CP.unshift(calPage(cal, 12, 82, 226, 206, 2 + (4 - i)));
  CP.reverse();
  [60, 180].forEach(x => box(cal, x, -18, 16, 40, { background: INK, borderRadius: '8px', zIndex: 20 }));
  const pd = chip(c, 690, 860, 'pocos días', { size: 44, bg: INK, color: YEL, z: 30 });
  const CR = [mkFan(c, [370, 940, 240, 307], 81, { coat: '#3a2f26', c1: '#5a7aa8' }), mkFan(c, [560, 920, 250, 320], 82, { moustache: true, coat: '#5a4632', c1: YEL, c2: INK }), mkFan(c, [750, 950, 230, 294], 83, { beard: true, cap: true, coat: '#4a3a2c' })];
  CR.forEach(f => f.d.style.zIndex = 12);
  const CB = [[360, 900, '¡NO!'], [560, 940, '¡bah!'], [800, 990, '¡¿?!']].map(([x, y, s]) => el('div', c, { left: px(x), top: px(y), fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '54px', color: RED, background: '#fff', border: `4px solid ${INK}`, borderRadius: '30px', padding: '0 22px 6px', boxShadow: `4px 5px 0 ${SH}`, zIndex: 30, whiteSpace: 'nowrap' }, s));
}

/* ======================================================================
   O1 · ¡OJO! SIN LETRA OFICIAL ≠ NADIE LA CANTE
   ====================================================================== */
{
  const c = scene(S.O1[0], S.O1[1], t => {
    const kt = p(t, K.ojo + 0.6, 0.3, E.inOutCubic), k0 = p(t, K.ojo, 0.18, E.outCubic);
    set(ojo, { s: t < K.ojo ? 0 : lerp(lerp(2.4, 1, k0), 0.45, kt), x: kt * 340, y: kt * -500, r: -10, o: t < K.ojo ? 0 : 1 });
    set(c1, { s: pop(t, K.tenga - 0.1, 0.4), r: -2, o: t < K.tenga - 0.1 ? 0 : 1 });
    set(ck1, { s: pop(t, K.oficial6 + 0.15, 0.3), r: -8, o: t < K.oficial6 + 0.15 ? 0 : 1 });
    { const k = p(t, K.no6, 0.2, E.outBack); set(neq, { s: t < K.no6 ? 0 : k * (1 + 0.06 * Math.sin(t * 8)), r: -4, o: t < K.no6 ? 0 : 1 }); }
    set(c2, { s: pop(t, K.nadie - 0.05, 0.4), r: 2, o: t < K.nadie - 0.05 ? 0 : 1 });
    { const k = p(t, K.cante, 0.14); set(x2, { s: t < K.cante ? 0 : lerp(1.7, 1, k), o: t < K.cante ? 0 : 1 }); }
    G.forEach((f, i) => { const t0 = K.cante + 0.05 + i * 0.1; set(f.d, { s: pop(t, t0, 0.4), y: wobble(t, 0.8, 3, i), r: [6, -6][i], o: t < t0 ? 0 : 1 }); fanFace(f, t, { jaw: 0.3 + Math.abs(Math.sin(t * 9 + i)) * 0.5, closed: true, seed: i }); });
    LL.forEach((l, i) => { const t0 = K.cante + 0.2 + i * 0.12; set(l, { s: pop(t, t0, 0.3), y: Math.sin(t * 5 + i) * 8, r: [-8, 6][i], o: t < t0 ? 0 : 1 }); });
  });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const card = (y, txt, bg) => { const d = box(c, 120, y, 840, 200, { background: bg, border: `7px solid ${INK}`, borderRadius: '26px', boxShadow: `10px 12px 0 ${SH}`, zIndex: 10 }); el('div', d, { left: '0', top: '0', width: '826px', height: '186px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '84px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' }, txt); return d; };
  const c1 = card(420, 'Sin letra oficial', '#FBF6EA');
  const ck1 = box(c1, 750, 60, 120, 120, { zIndex: 5 }); ck1.innerHTML = CHECK;
  const neq = box(c, 410, 640, 260, 210, { zIndex: 12 });
  neq.innerHTML = `<svg viewBox="0 0 260 210" width="260" height="210" style="overflow:visible">${cut('<rect x="20" y="50" width="220" height="36" rx="12"/><rect x="20" y="124" width="220" height="36" rx="12"/><path d="M170,4 L200,20 L92,206 L62,190 Z"/>', 8, 9)}<rect x="20" y="50" width="220" height="36" rx="12" fill="${PINK}" stroke="${INK}" stroke-width="6"/><rect x="20" y="124" width="220" height="36" rx="12" fill="${PINK}" stroke="${INK}" stroke-width="6"/><path d="M170,4 L200,20 L92,206 L62,190 Z" fill="${PINK}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/></svg>`;
  const c2 = card(840, 'Nadie la canta', '#fff');
  const x2 = box(c2, 740, -70, 150, 150, { zIndex: 5 }); x2.innerHTML = XSVG;
  const G = [mkFan(c, [150, 1060, 220, 281], 91, { cap: true, coat: '#5a4632', c1: YEL, c2: RED }), mkFan(c, [700, 1060, 220, 281], 92, { moustache: true, coat: '#3a2f26', c1: '#5a7aa8' })];
  G.forEach(f => f.d.style.zIndex = 14);
  const LL = [[350, 1110, 'la-la-la ♪'], [480, 1210, '♪ lo-lo-lo']].map(([x, y, s]) => el('div', c, { left: px(x), top: px(y), fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '46px', color: INK, background: '#fff', border: `4px solid ${INK}`, borderRadius: '30px', padding: '0 20px 6px', boxShadow: `4px 5px 0 ${SH}`, zIndex: 30, whiteSpace: 'nowrap' }, s));
  const ojo = stamp(c, 200, 640, '¡OJO!', { size: 200, bw: 18, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   O2 · MUCHA GENTE TARAREA… O SE INVENTA LA SUYA — la grada (+ cameo del emú)
   ====================================================================== */
headline(S.O2[0], K.o6 - 0.06, 'Mucha gente *tararea*…', { size: 96, hlT: K.tararea });
headline(K.o6 - 0.06, S.O2[1], '…o se *inventa* la suya', { size: 96, hlT: K.inventa });
{
  const EL = K.tararea + 0.75; // el emú mira a cámara 0,6 s
  const c = scene(S.O2[0], S.O2[1], t => {
    set(std, { y: Math.sin(t * 2) * 3 });
    BACK.forEach((f, i) => { set(f.d, { y: wobble(t, 1.4, 4, i * 0.3), r: Math.sin(t * 3.2 + i) * 4 }); fanFace(f, t, { jaw: t > K.tararea - 0.1 ? 0.2 + Math.abs(Math.sin(t * 10 + i)) * 0.4 : 0, closed: t > K.tararea && i % 2 === 0, seed: i * 0.4 }); });
    FR.forEach((f, i) => {
      const inv = i === 2 && t > K.inventa - 0.1;
      set(f.d, { y: wobble(t, 1.2, 5, i * 0.5) - (inv ? 20 * p(t, K.inventa - 0.1, 0.25, E.outBack) : 0), r: inv ? 3 : Math.sin(t * 3 + i * 2) * 4 });
      fanFace(f, t, { jaw: inv ? 0.4 + Math.abs(Math.sin(t * 12)) * 0.5 : (t > K.tararea - 0.1 ? 0.25 + Math.abs(Math.sin(t * 9 + i)) * 0.4 : 0), closed: !inv && t > K.tararea, look: inv ? [-4, -4] : [0, 0], bL: inv ? 10 : 0, bR: inv ? 14 : 0, seed: i });
    });
    const look = t > EL && t < EL + 0.6;
    face(emu, t, { look: look ? [0, 0] : [-12, 4], half: !look, bL: look ? 18 : 0, bR: look ? 26 : 0, jaw: look ? 0 : (t > K.tararea ? Math.abs(Math.sin(t * 8)) * 0.35 : 0), blink: false });
    set(emu.d, { y: look ? -26 * p(t, EL, 0.12, E.outBack) : wobble(t, 1.4, 4), r: look ? 0 : Math.sin(t * 3) * 4 });
    LB.forEach((b, i) => { const t0 = K.tararea + i * 0.13; set(b, { s: pop(t, t0, 0.3) * (t > K.inventa ? 0.85 : 1), y: Math.sin(t * 5 + i) * 8, r: [-6, 5, -4, 6, -5][i], o: t < t0 ? 0 : (t > K.inventa ? 0.45 : 1) }); });
    set(gag, { s: pop(t, K.inventa, 0.4), r: -2 + Math.sin(t * 4) * 1.5, o: t < K.inventa ? 0 : 1 });
    popA(own, t, K.suya, { r: 5 });
    notes(t, 1);
  }, { clip: true });
  sceneBg(c, { background: '#EADFC8' });
  const std = box(c, 0, 0, 1080, 1920, { zIndex: 1 }); std.innerHTML = stadiumSvg({ top: 440, bot: 1100, rows: 7, noPitch: true, noLights: true, seed: 12 });
  const BACK = [[-10, 650, 0x51, { coat: '#4a3a2c', c1: '#5a7aa8' }], [250, 630, 0x52, { moustache: true, c1: YEL, c2: INK }], [790, 650, 0x54, { beard: true, cap: true, c1: RED }]].map(([x, y, s, o]) => { const f = mkFan(c, [x, y, 250, 320], s, o); f.d.style.zIndex = 3; return f; });
  const emu = mkEmuF(c, [520, 500, 280, 420]); emu.d.style.zIndex = 3;
  const FR = [[20, 860, 61, { moustache: true, coat: '#5a4632', c1: RED, cap: true }], [370, 880, 62, { coat: '#3a2f26', c1: '#5a7aa8', hair: '#3a2a1e' }], [700, 860, 63, { beard: true, coat: '#4a3a2c', c1: YEL, c2: RED }]].map(([x, y, s, o]) => { const f = mkFan(c, [x, y, 340, 435], s, o); f.d.style.zIndex = 6; return f; });
  const LB = [[40, 560, 'lo-lo-lo ♪'], [330, 520, '♪ la-la-la'], [760, 560, 'lo-lo ♪'], [60, 800, '♪ la-lo-la'], [400, 820, 'lo-lo-lo ♪']].map(([x, y, s]) => el('div', c, { left: px(x), top: px(y), fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '44px', color: INK, background: '#fff', border: `4px solid ${INK}`, borderRadius: '30px', padding: '0 20px 6px', boxShadow: `4px 5px 0 ${SH}`, zIndex: 20, whiteSpace: 'nowrap' }, s));
  const gag = singBubble(c, 200, 420, 740, 230, { tail: 'br', z: 40, sw: 6, html: '♪ …¡y las croquetas<br>de mi abuela! ♪', italic: true, fw: 900, size: 58, wrap: true });
  const own = chip(c, 620, 1250, 'su propia letra', { size: 44, bg: PINK, z: 45 });
  const notes = noteStream(c, 4, 160, 1000, { sz: 60, dx: -100, dy: 380, per: 2.2, z: 15 });
}

/* ======================================================================
   HIT · GOLPE AMARILLO: SI NO SABES QUÉ CANTAR… NO ES CULPA TUYA → ¿LO SABÍAS? SÍ / NO
   ====================================================================== */
colorHit(S.HIT[0], S.HIT[1], YEL, c => {
  const top = el('div', c, { left: 0, top: '220px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '96px', lineHeight: 1.05, color: INK, zIndex: 8 });
  const TW = []; const iq = find('no sabes que cantar');
  [['¿No', 0], ['sabes', 1], ['qué', 2], ['cantar?', 3]].forEach(([s, k]) => { const sp = document.createElement('span'); sp.style.display = 'inline-block'; sp.style.margin = '0 0.12em'; sp.textContent = s; top.appendChild(sp); TW.push({ e: sp, t: W[iq + k].s }); });
  const osea = el('div', c, { left: 0, top: '230px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', color: INK, zIndex: 8 }, 'O sea:');
  const big = el('div', c, { left: 0, top: '400px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '160px', color: '#fff', textShadow: `10px 10px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`, zIndex: 9 }, 'NO ES<br>CULPA TUYA');
  const sil = mkFan(c, [300, 760, 480, 614], 41, { moustache: true, cap: true }); sil.d.style.filter = SIL; sil.d.style.zIndex = 4;
  const horn = box(c, 680, 600, 280, 280, { zIndex: 5 }); horn.innerHTML = hornSvg(INK);
  const NT = [0, 1, 2, 3].map(i => noteEl(c, 640, 640, 80, i % 2, INK, 6));
  const QM = [qMark(c, 230, 760, 150, '#fff'), qMark(c, 760, 800, 120, '#fff')];
  const sab = el('div', c, { left: 0, top: '520px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '130px', lineHeight: 1, color: INK, zIndex: 10 }, '¿Lo sabías?');
  const btn = (x, txt, bg, col) => el('div', c, { left: px(x), top: '960px', width: '380px', height: '220px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '160px', lineHeight: '206px', color: col, background: bg, border: `9px solid ${INK}`, borderRadius: '44px', boxShadow: `12px 14px 0 ${INK}`, zIndex: 30 }, txt);
  const bS = btn(110, 'SÍ', '#fff', INK), bN = btn(580, 'NO', INK, '#fff');
  const hand = box(c, 330, 1110, 160, 200, { zIndex: 40 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="160" height="160" style="overflow:visible">${gloveHand(0, 0, 160, 1.2)}</svg>`;
  const CM = [['FAR', '@marta_bcn', 'SÍ 😳', K.sabias - 0.1, 60], ['SOL', '@javi.92', 'No, ya lo sabía', K.sabias + 0.35, 560]].map(([who, u, txt, t0, x]) => {
    const e = box(c, x, 700, 440, 112, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 40 });
    avatar(e, 10, 10, 84, who, { bw: 3 });
    el('div', e, { left: '108px', top: '8px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '26px', color: '#7a6a58', whiteSpace: 'nowrap' }, u);
    el('div', e, { left: '108px', top: '40px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '38px', color: INK, whiteSpace: 'nowrap' }, txt);
    return { e, t: t0 };
  });
  return t => {
    const q = p(t, K.lo - 0.08, 0.3, E.inOutCubic); // pasa a la pregunta
    set(osea, { s: pop(t, S.HIT[0] + 0.05, 0.3), o: t < K.cuando ? 1 : 1 - p(t, K.nosabes - 0.15, 0.12) });
    TW.forEach(w => set(w.e, { s: pop(t, w.t - 0.04, 0.3), o: t < w.t - 0.04 ? 0 : 1 }));
    set(top, { o: t < K.nosabes - 0.1 ? 0 : 1 - q, y: -q * 80 });
    const kb = p(t, K.noes - 0.02, 0.2, E.outBack);
    set(big, { s: t < K.noes - 0.02 ? 0 : lerp(1.6, 1, kb) * lerp(1, 0.55, q), y: -q * 230, r: -3, o: t < K.noes - 0.02 ? 0 : 1 });
    const gl = glitch(t, K.noes, 0.3); big.style.textShadow = (gl ? gl + ', ' : '') + `10px 10px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`;
    const relief = t > K.noes;
    set(sil.d, { y: (relief ? -Math.abs(Math.sin(t * 7)) * 18 : wobble(t, 0.6, 3)) + q * 1400, x: relief ? 0 : Math.sin(t * 2) * 6 });
    face(sil, t, { jaw: t > K.suena && t < K.noes ? 0.5 : 0 });
    set(horn, { s: pop(t, K.suena - 0.15, 0.35) * (1 + 0.05 * Math.sin(t * 20)), r: -8, o: t < K.suena - 0.15 || t > K.noes ? 0 : 1 });
    NT.forEach((n, i) => { const ph = ((t * 0.7 + i / 4) % 1); set(n, { x: -ph * 380, y: -ph * 220 + Math.sin(t * 5 + i) * 20, r: Math.sin(t * 4 + i) * 20, s: 0.6 + 0.5 * Math.sin(ph * Math.PI), o: t > K.suena && t < K.noes ? Math.sin(ph * Math.PI) : 0 }); });
    QM.forEach((m, i) => set(m, { s: pop(t, K.nosabes + i * 0.15, 0.3), y: Math.sin(t * 6 + i) * 10, r: [-10, 12][i], o: t < K.nosabes + i * 0.15 || t > K.noes ? 0 : 1 }));
    set(sab, { s: pop(t, K.lo - 0.05, 0.4) * 1, y: -q * 0, o: t < K.lo - 0.05 ? 0 : 1 });
    [[bS, K.si], [bN, K.noB]].forEach(([b, t0], i) => { const ta = K.lo + 0.15 + i * 0.12, press = t > t0 + 0.3 && t < t0 + 0.45; set(b, { s: pop(t, ta, 0.4) * (press ? 0.9 : 1 + 0.06 * Math.max(0, Math.sin((t - t0) * 9)) * (t > t0 ? 1 : 0)), r: [-3, 3][i], o: t < ta ? 0 : 1 }); });
    set(hand, { o: t > K.si ? 1 : 0, y: (t > K.si + 0.3 && t < K.si + 0.45 ? 14 : 0) + Math.sin(t * 5) * 6, s: pop(t, K.si, 0.3) });
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
  };
});

/* ======================================================================
   C · MARCA (ÚLTIMA FRASE): EL VECINO EN SU BALCÓN, RÁPIDO
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
   L · …NO VENÍA EN EL LIBRO — el libro HISTORIA se cierra de golpe
   ====================================================================== */
headline(S.L2[0], LOOP, '…no venía en el *libro.*', { size: 96, hlT: K.libro });
{
  const TC = K.libro - 0.05;
  const c = scene(S.L2[0], LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    stand.d.style.display = sx > 0.25 ? '' : 'none';
    fanFace(stand, t, { look: t > TC - 0.2 ? [6, -6] : [-3, 2], bL: 12, bR: 12, sweat: t > TC - 0.2, jaw: t < TC - 0.2 ? 0.3 + Math.abs(Math.sin(t * 10)) * 0.4 : 0, seed: 1 }); set(stand.d, { y: wobble(t, 1, 3) });
    set(bookW, { s: 1.25 * pop(t, S.L2[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    puffs.forEach((f, i) => { const kf = p(t, TC + 0.3, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 150 * kf, y: -kf * 120, s: 0.5 + kf, o: closed ? 1 - kf : 0 }); });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 3; i++) for (let l = 0; l < 5; l++) lines2 += `<path d="M580,${720 + i * 150 + l * 12} H900" stroke="${INK}" stroke-width="2.5" opacity=".6"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="48" fill="${INK}">HIMNOS</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="36" fill="${INK}">del mundo</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const stand = mkFan(bookW, [620, 420, 250, 320], 41, { moustache: true, cap: true }); stand.d.style.zIndex = 2;
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '500px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const epl = el('div', c, { left: '0', top: '1150px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:38px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 18 · El himno de España no tiene letra</span>`);
  const _fe = SC[SC.length - 1].fn; SC[SC.length - 1].fn = t => { _fe(t); popA(epl, t, TC + 0.3, { r: -1 }); };
  const puffs = [0, 1, 2, 3].map(() => box(bookW, 480, 600, 120, 80, { borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}`, zIndex: 3 }));
}
