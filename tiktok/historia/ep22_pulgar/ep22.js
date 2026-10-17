/* Ep. 22 · ¿Pulgar abajo = «mátalo»? (experimento 2 «Te he pillado») — TODO clavado por texto (find) a words.js */
const fw = (ph, from = 0) => find(ph, from);
const ws = i => W[i].s, wE = i => W[i].e;
const L = {
  gancho: fw('pulgar abajo ningun romano'),
  eh: fw('eh no deslices'),
  gesto: fw('el gesto existia'),
  abajo: fw('lo de hacia abajo lo hizo'),
  tienes: fw('a que tienes el pulgar'),
  ojo: fw('ojo nadie sabe'),
  osea: fw('o sea tu like'),
};
const at = (li, k, d = 0) => ws(li + k) + d, atE = (li, k, d = 0) => wE(li + k) + d;
const K = {};
{
  const is = fw('soy tu vecino', L.osea); K.isoy = is; K.soy = ws(is); K.vecino = ws(is + 2); K.vecinoE = wE(is + 2);
  const iy = fw('y esto no venia en el libro', is); K.noV = ws(iy + 2); K.libro = ws(iy + 6); K.END = wE(iy + 6);
}
const S = {
  B1: at(L.eh, 0, -0.06), B2: at(L.eh, 3, -0.06), C1: at(L.gesto, 0, -0.07), C2: at(L.gesto, 11, -0.07),
  D1: at(L.abajo, 0, -0.07), D2: at(L.abajo, 8, -0.1), D3: at(L.abajo, 15, -0.04),
  E1: at(L.tienes, 0, -0.07), E2: at(L.tienes, 11, -0.05), F1: at(L.ojo, 0, -0.06), F2: at(L.ojo, 6, -0.08), F3: at(L.ojo, 12, -0.06),
  G1: at(L.osea, 0, -0.07), G2: at(L.osea, 12, -0.1), bal: K.soy - 0.1, book: K.vecinoE + 0.12,
};
const DUR = K.END + 0.6, LOOP = DUR - 0.4;
{ // símbolos para avatares
  const dfs = defsSvg.querySelector('defs');
  dfs.insertAdjacentHTML('beforeend', `<symbol id="gladM" viewBox="0 0 300 560" overflow="visible">${gladInner({ type: 'murm', seed: 3 })}</symbol><symbol id="romS" viewBox="0 0 360 460" overflow="visible">${romanInner({ purple: true })}</symbol>`);
}
AV.GLADM = ['gladM', '96 18 110 110', 300, 560]; AV.ROM = ['romS', '90 70 180 180', 360, 460];
const WALL = { background: '#6E2A26', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.12) 0 3px, transparent 3px 46px), radial-gradient(circle at 50% 50%, rgba(255,200,150,.18), rgba(0,0,0,.35) 80%)' };
const WHITE_HL = { color: '#fff', shadow: `4px 4px 0 ${INK}` };

/* ======================================================================
   A · PORTADA / GANCHO (L0): puño gigante con el pulgar abajo + «¿Pulgar abajo = "mátalo"?»   -1 … B1
   ====================================================================== */
{
  const T_SW = atE(L.gancho, 8, -0.16);           // empieza el «deslizar» del espectador
  const c = scene(-1, S.B1 + 0.2, t => {
    const sw = p(t, T_SW, S.B1 - T_SW + 0.02, E.inCubic);
    set(all, { y: -sw * 420 });
    set(cam, { s: 1.0 + 0.05 * p(t, 0, 3.6, E.linear) });
    // mano gigante: ya bajando en el fotograma 0
    const land = p(t, -0.35, 0.8, E.outBack);
    const jab = Math.sin(t * 5.2) * 6, slam = t > at(L.gancho, 8) ? 30 * Math.sin(clamp((t - at(L.gancho, 8)) / 0.3) * Math.PI) : 0;
    const rot = Math.sin(t * 3.1 + 0.6) * 14 + (t > at(L.gancho, 2) && t < at(L.gancho, 4) ? Math.sin((t - at(L.gancho, 2)) * 18) * 18 : 0);
    set(hand.d, { y: lerp(-160, 0, land) + jab + slam, r: Math.sin(t * 1.6) * 1.5 });
    hand.fist.setAttribute('transform', `rotate(${f1(rot)} 200 730)`);
    set(emo, { s: 1 + 0.08 * Math.sin(t * 6), r: -8 + Math.sin(t * 3) * 6, y: Math.sin(t * 4) * 6 });
    // romano que niega
    const kr = pop(t, at(L.gancho, 2, -0.02), 0.4);
    set(rom.d, { s: kr, o: t < at(L.gancho, 2, -0.02) ? 0 : 1, y: wobble(t, 0.5, 3) });
    face(rom, t, { look: [-5, -2], brow: -4, seed: 0.4 });
    rom.headg.setAttribute('transform', t > at(L.gancho, 2) && t < atE(L.gancho, 5) ? `rotate(${f1(Math.sin((t - at(L.gancho, 2)) * 16) * 7)} 180 300)` : '');
    popA(nr, t, at(L.gancho, 3), { r: -4 });
    // gladiadores
    const scared = t > at(L.gancho, 8);
    gface(gm, t, { look: [2, -4], oh: scared, sweat: scared, brow: scared ? -5 : 0, aR: -10 + wobble(t, 0.5, 3), seed: 0.3 });
    gface(gr, t, { look: [2, -4], oh: scared, brow: scared ? -5 : 0, aR: wobble(t, 0.6, 3), seed: 1.7 });
    set(gm.d, { y: wobble(t, 0.5, 3) - (scared ? 10 : 0) }); set(gr.d, { y: wobble(t, 0.55, 3, 0.3) - (scared ? 10 : 0), sx: -1 });
    qs.forEach((q, i) => { const tq = at(L.gancho, 4) + i * 0.22; set(q, { s: pop(t, tq, 0.35), y: -(t - tq) * 26, r: Math.sin(t * 4 + i) * 12, o: t < tq ? 0 : 1 }); });
    // título-portada (la pregunta) — ya vivo en el fotograma 0
    set(ttl, { y: wobble(t, 0.45, 4), r: wobble(t, 0.3, 0.6) });
    set(qmk, { s: 1 + 0.1 * Math.sin(t * 5), r: 8 + Math.sin(t * 3) * 6 });
    set(mataW, { s: 1 + 0.16 * Math.sin(clamp((t - at(L.gancho, 8)) / 0.32) * Math.PI) });
    stampA(mito, t, at(L.gancho, 8, 0.05), -12);
    // gesto de deslizar (dedo del espectador)
    set(swp, { o: t > T_SW - 0.05 ? 1 : 0, y: -sw * 300, s: 1 });
  }, { clip: true, cut: true });
  sceneBg(c, WALL);
  const all = box(c, 0, 0, 1080, 1920, { zIndex: 1 });
  const cam = box(all, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  box(cam, 0, 0, 1080, 1920).innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${coliseumSvg({ top: 560, seed: 5 })}</svg>`;
  const gm = mkGlad(cam, [70, 760, 330, 616], { type: 'murm', seed: 2 });
  const gr = mkGlad(cam, [680, 760, 330, 616], { type: 'ret', seed: 5 });
  box(cam, 0, 0, 1080, 1920).innerHTML = `<svg width="1080" height="1920"><ellipse cx="235" cy="1356" rx="150" ry="24" fill="${SH}"/><ellipse cx="845" cy="1356" rx="150" ry="24" fill="${SH}"/></svg>`;
  const hand = mk(cam, [250, -60, 580, 1305], thumbHandInner(), '0 0 400 900', 'hand'); hand.fist = hand.d.querySelector('.fist'); hand.d.style.zIndex = 5;
  const rom = mk(cam, [700, 860, 300, 383], romanInner({ purple: true, laurel: BRASS }), '0 0 360 460', 'rom'); rom.headg = rom.d.querySelector('.headg'); rom.d.style.zIndex = 6;
  const nr = chip(cam, 640, 1200, 'ningún romano', { size: 40, bg: INK, color: YEL, z: 9 });
  const qs = [[150, 700], [860, 690], [700, 620]].map(q => el('div', cam, { left: px(q[0]), top: px(q[1]), fontFamily: 'Playfair', fontWeight: 900, fontSize: '120px', color: PINK, textShadow: `5px 5px 0 ${INK}`, zIndex: 7, lineHeight: 1 }, '?'));
  const emo = el('div', cam, { left: '120px', top: '660px', background: '#fff', border: `5px solid ${INK}`, borderRadius: '40px 40px 40px 8px', boxShadow: `6px 6px 0 ${SH}`, padding: '0 22px 6px', fontSize: '96px', lineHeight: '120px', zIndex: 8 }, '👎');
  // título-portada: borde superior en y = 300 (recorte del perfil 240–1680)
  const ttl = box(cam, 60, 300, 960, 300, { zIndex: 40 });
  box(ttl, 0, 0, 960, 300, { background: '#FBF6EA', border: `7px solid ${INK}`, borderRadius: '24px', boxShadow: `10px 12px 0 ${SH}` });
  el('div', ttl, { left: 0, top: '22px', width: '960px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '108px', lineHeight: 1, color: INK }, '¿Pulgar abajo');
  const l2 = el('div', ttl, { left: 0, top: '140px', width: '960px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '118px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' }, `= <span class="mw" style="display:inline-block;font-style:italic">«${hlSpan('mátalo', 'mhl')}»</span>`);
  const mataW = l2.querySelector('.mw'); l2.querySelector('.mhl').style.transform = 'scaleX(1) rotate(-1.2deg)';
  const qmk = el('div', ttl, { left: '832px', top: '120px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: 1, color: '#fff', background: RED, border: `6px solid ${INK}`, borderRadius: '22px', padding: '0 22px 8px', boxShadow: `7px 7px 0 ${INK}`, zIndex: 3 }, '?');
  const mito = stamp(cam, 300, 760, 'MITO', { size: 200, bw: 18, z: 60, bg: 'rgba(255,255,255,.88)', blend: 'normal' });
  const swp = box(c, 470, 1180, 140, 300, { zIndex: 80 });
  swp.innerHTML = `<svg width="140" height="300" style="overflow:visible"><path d="M70,280 V40" stroke="#fff" stroke-width="10" stroke-dasharray="4 18" stroke-linecap="round" opacity=".8"/><path d="M30,80 L70,30 L110,80" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="70" cy="250" r="44" fill="rgba(255,255,255,.55)" stroke="#fff" stroke-width="6"/></svg>`;
}

/* ======================================================================
   B1 · RUPTURA 1: «¡EH, NO DESLICES!» — el Vecino GRANDE mirando a cámara y señalando   B1 … B2
   ====================================================================== */
{
  const c = scene(S.B1, S.B2, t => {
    const kin = p(t, S.B1, 0.22, E.outBack);
    set(V.cam, { y: (1 - kin) * 1300, s: 1 + 0.05 * p(t, S.B1, 1.6, E.linear) + 0.05 * Math.sin(clamp((t - at(L.eh, 2)) / 0.3) * Math.PI) });
    set(V.ry, { r: t * 14 });
    vecFace(V.v, t, { jaw: talkW(t, 'VECINO'), look: [0, 1], bL: t < at(L.eh, 2) ? 16 : 8, bR: t < at(L.eh, 2) ? 16 : 12, noFan: true, noCup: true, blink: false, seed: 2 });
    const jab = Math.max(0, Math.sin(clamp((t - at(L.eh, 0)) / 0.3) * Math.PI)) + Math.max(0, Math.sin(clamp((t - at(L.eh, 2)) / 0.3) * Math.PI));
    set(V.hand, { s: 1 + 0.16 * jab + 0.02 * Math.sin(t * 9), r: Math.sin(t * 4) * 2 });
    set(V.zl, { s: 1 + 0.1 * jab, o: 0.5 + 0.5 * jab });
    const kb = pop(t, at(L.eh, 0, 0.02), 0.35);
    set(bub, { s: kb, r: -3 + Math.sin(t * 3) * 1.2, o: t < at(L.eh, 0, 0.02) ? 0 : 1 });
    set(w2, { o: t < at(L.eh, 1, -0.02) ? 0 : 1 }); set(w3, { o: t < at(L.eh, 2, -0.04) ? 0 : 1, s: 1 + 0.12 * Math.sin(clamp((t - at(L.eh, 2)) / 0.3) * Math.PI) });
    paint(bhl, t, at(L.eh, 2, 0.05), 0.3);
    w3.style.textShadow = glitch(t, at(L.eh, 2), 0.25);
  }, { clip: true, cut: true, z: 20 });
  const V = vecCloseUp(c);
  const bub = box(c, 520, 186, 470, 330, { zIndex: 30, transformOrigin: '60px 300px' });
  bub.innerHTML = `<svg width="470" height="360" style="overflow:visible;position:absolute;left:0;top:0">${cut('<path d="M20,10 H450 Q466,10 466,26 V280 Q466,296 450,296 H140 L40,380 L80,296 H20 Q4,296 4,280 V26 Q4,10 20,10 Z"/>', 8, 10)}<path d="M20,10 H450 Q466,10 466,26 V280 Q466,296 450,296 H140 L40,380 L80,296 H20 Q4,296 4,280 V26 Q4,10 20,10 Z" fill="#fff" stroke="${INK}" stroke-width="7"/></svg>`;
  const bt = el('div', bub, { left: 0, top: '20px', width: '470px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, lineHeight: 1.05, color: INK });
  bt.innerHTML = `<div style="font-size:100px"><span class="w1" style="display:inline-block">¡Eh,</span> <span class="w2" style="display:inline-block;color:${RED}">no</span></div><div class="w3" style="font-size:96px;font-style:italic;display:inline-block">${hlSpan('deslices!', 'bhl')}</div>`;
  const w2 = bt.querySelector('.w2'), w3 = bt.querySelector('.w3'), bhl = bt.querySelector('.bhl');
}

/* ======================================================================
   B2 · «QUE ESE GESTO TE LO COLÓ UN CUADRO, NO UN ROMANO»   B2 … C1
   ====================================================================== */
headline(S.B2, at(L.eh, 11, -0.04), 'Te lo coló *un cuadro*', { size: 86, hlT: at(L.eh, 10), ...WHITE_HL });
headline(at(L.eh, 11, -0.04), S.C1, '…no un *romano*', { size: 96, hlT: at(L.eh, 13), ...WHITE_HL });
{
  const FI = { x: 170, y: 430, w: 740, h: 640 }, FC = [540, 750];
  const c = scene(S.B2, S.C1, t => {
    set(fq, { s: pop(t, at(L.eh, 5, -0.05), 0.45), r: Math.sin(t * 3) * 6, o: t < at(L.eh, 5, -0.05) ? 0 : 1, y: Math.sin(t * 5) * 8 });
    const k = p(t, at(L.eh, 8, -0.04), 0.55, E.inOutCubic), fs = lerp(2.4, 1, k);
    set(frm, { s: fs, o: t < at(L.eh, 8, -0.04) ? 0 : 1 });
    const it = FC[1] - FI.h / 2 * fs, il = FC[0] - FI.w / 2 * fs, ir = 1080 - (FC[0] + FI.w / 2 * fs), ib = 1920 - (FC[1] + FI.h / 2 * fs);
    pc.style.clipPath = t < at(L.eh, 8, -0.04) ? 'none' : `inset(${f1(Math.max(0, it))}px ${f1(Math.max(0, ir))}px ${f1(Math.max(0, ib))}px ${f1(Math.max(0, il))}px)`;
    popA(plq, t, at(L.eh, 10), { r: 0 });
    const kr = p(t, at(L.eh, 11, 0.02), 0.35, E.outBack);
    set(rom.d, { x: (1 - kr) * 500, o: t < at(L.eh, 11) ? 0 : 1, y: wobble(t, 0.5, 3) });
    face(rom, t, { look: [-5, -2], brow: -3, seed: 0.9 });
    rom.headg.setAttribute('transform', t > at(L.eh, 13) && t < atE(L.eh, 13, 0.2) ? `rotate(${f1(Math.sin((t - at(L.eh, 13)) * 16) * 7)} 180 300)` : '');
    popA(rb, t, at(L.eh, 13, 0.08), { r: 3 });
  }, { clip: true, cut: true });
  sceneBg(c, WALL);
  const pc = box(c, 0, 0, 1080, 1920, { overflow: 'hidden', zIndex: 1 });
  box(pc, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 40%, #E9D7B0, #B48C5C 85%)' });
  box(pc, 0, 0, 1080, 1920, { backgroundImage: 'repeating-linear-gradient(38deg, rgba(43,33,24,.12) 0 2px, transparent 2px 9px)' });
  const fq = box(pc, 330, 430, 410, 600, { zIndex: 3 }); fq.innerHTML = fistSvg(600);
  const frm = box(c, FI.x - 46, FI.y - 46, FI.w + 92, FI.h + 92, { zIndex: 30 }); frm.innerHTML = goldFrame(FI.w, FI.h, 46);
  const plq = el('div', c, { left: '360px', top: '1112px', width: '360px', textAlign: 'center', background: BRASS, border: `4px solid ${INK}`, borderRadius: '8px', fontFamily: 'Rye', fontSize: '40px', color: INK, padding: '6px 0', boxShadow: `5px 5px 0 ${SH}`, zIndex: 31 }, 'UN CUADRO');
  const rom = mk(c, [690, 820, 330, 422], romanInner({ purple: true, laurel: BRASS }), '0 0 360 460', 'rom'); rom.headg = rom.d.querySelector('.headg'); rom.d.style.zIndex = 40;
  const rb = el('div', c, { left: '560px', top: '700px', background: '#fff', border: `5px solid ${INK}`, borderRadius: '40px 40px 8px 40px', boxShadow: `6px 6px 0 ${SH}`, padding: '4px 28px 10px', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '62px', color: INK, zIndex: 41, whiteSpace: 'nowrap' }, '¿Yo? No.');
}

/* ======================================================================
   C1 · POLLICE VERSO = PULGAR GIRADO, PARA PEDIR LA MUERTE   C1 … C2
   ====================================================================== */
headline(S.C1, at(L.gesto, 3, -0.04), 'El gesto *existía*', { size: 96, hlT: at(L.gesto, 2) });
headline(at(L.gesto, 3, -0.04), at(L.gesto, 7, -0.06), '«Pulgar *girado*»', { size: 96, hlT: at(L.gesto, 6) });
headline(at(L.gesto, 7, -0.06), S.C2, 'Para pedir la *muerte*', { size: 92, hlT: at(L.gesto, 10), hlc: PINK });
{
  const c = scene(S.C1, S.C2, t => {
    set(scr, { s: pop(t, S.C1 + 0.06, 0.5), r: -1.5 + wobble(t, 0.4, 0.6), o: t < S.C1 + 0.06 ? 0 : 1, y: t > at(L.gesto, 10) ? shake(t, at(L.gesto, 10), 0.4, 10) : 0 });
    const un = p(t, S.C1 + 0.1, 0.6, E.outCubic); paperIn.style.clipPath = `inset(0 ${f1((1 - un) * 50)}% 0 ${f1((1 - un) * 50)}%)`;
    set(rollL, { x: (1 - un) * 380 }); set(rollR, { x: -(1 - un) * 380 });
    stampA(juv, t, at(L.gesto, 2, 0.05), -6);
    popA(w1, t, at(L.gesto, 3), { r: -2 }); popA(w2, t, at(L.gesto, 4), { r: 2 }); paint(pvHL, t, atE(L.gesto, 4, -0.2), 0.35);
    set(arr, { o: t < at(L.gesto, 5) ? 0 : 1, sy: p(t, at(L.gesto, 5), 0.3, E.outBack) });
    popA(tr, t, at(L.gesto, 5, 0.04), { r: -2 });
    // el puño gira en «girado» y sigue girando
    const kg = p(t, at(L.gesto, 6), 0.6, E.inOutCubic);
    set(fq, { s: pop(t, at(L.gesto, 5, 0.1), 0.4), r: kg * 360 + (t > at(L.gesto, 6, 0.6) ? Math.sin(t * 5) * 14 : 0), o: t < at(L.gesto, 5, 0.1) ? 0 : 1 });
    stampA(dead, t, at(L.gesto, 10, 0.02), -8);
    set(red, { o: 0.55 * p(t, at(L.gesto, 10), 0.2) });
  }, { clip: true });
  sceneBg(c, { background: PAPER });
  const red = box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 60%, rgba(200,16,46,.0), rgba(200,16,46,.55) 85%)', zIndex: 1, opacity: 0 });
  const scr = box(c, 70, 400, 940, 420, { zIndex: 3 });
  const paperIn = box(scr, 40, 20, 860, 380, { background: '#F3E3BC', border: `5px solid ${INK}`, boxShadow: `8px 10px 0 ${SH}` });
  { let ln = ''; const r = rng(31); for (let y = 40; y < 360; y += 34) { if (y > 120 && y < 280) continue; let x = 30; while (x < 820) { const w = 30 + r() * 80; ln += `M${f1(x)},${y} h${f1(Math.min(w, 830 - x))} `; x += w + 16; } }
    box(paperIn, 0, 0, 860, 380).innerHTML = `<svg width="860" height="380"><rect width="860" height="380" fill="url(#hP)" opacity=".7"/><path d="${ln}" stroke="${INK}" stroke-width="7" opacity=".38" stroke-linecap="round"/><path d="M0,0 H860 V380 H0 Z" fill="none" stroke="#b08850" stroke-width="18" opacity=".35"/></svg>`; }
  const rollSvg = `<svg width="70" height="440" viewBox="0 0 70 440" style="overflow:visible">${cut('<rect x="6" y="10" width="58" height="420" rx="29"/>', 6, 8)}<rect x="6" y="10" width="58" height="420" rx="29" fill="#E8D3A2" stroke="${INK}" stroke-width="5"/><rect x="6" y="10" width="58" height="420" rx="29" fill="url(#hA)" opacity=".5"/><rect x="14" y="-8" width="42" height="26" rx="6" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><rect x="14" y="422" width="42" height="26" rx="6" fill="${WOOD}" stroke="${INK}" stroke-width="4"/></svg>`;
  const rollL = box(scr, 0, -10, 70, 440); rollL.innerHTML = rollSvg;
  const rollR = box(scr, 870, -10, 70, 440); rollR.innerHTML = rollSvg;
  const pv = el('div', paperIn, { left: 0, top: '140px', width: '860px', textAlign: 'center', fontFamily: 'Rye', fontSize: '96px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  pv.innerHTML = `<span class="w1" style="display:inline-block">POLLICE</span> <span class="w2" style="display:inline-block">${hlSpan('VERSO', 'pvh')}</span>`;
  const w1 = pv.querySelector('.w1'), w2 = pv.querySelector('.w2'), pvHL = pv.querySelector('.pvh');
  const juv = stamp(c, 560, 360, 'JUVENAL · s. II', { size: 46, bw: 7, z: 9, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  const arr = box(c, 520, 822, 40, 60, { zIndex: 4, transformOrigin: '20px 0' }); arr.innerHTML = `<svg width="40" height="60"><path d="M20,0 V44 M6,30 L20,50 L34,30" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/></svg>`;
  const tr = el('div', c, { left: '200px', top: '880px', width: '680px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '78px', color: INK, background: '#fff', border: `5px solid ${INK}`, borderRadius: '16px', boxShadow: `7px 7px 0 ${PINK}`, padding: '4px 0 12px', zIndex: 5 }, '= «pulgar girado»');
  const fq = box(c, 640, 1010, 180, 260, { zIndex: 6 }); fq.innerHTML = fistSvg(260);
  const dead = stamp(c, 420, 1060, '¡MUERTE!', { size: 80, bw: 10, z: 9, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
}

/* ======================================================================
   C2 · «PERO NADIE ESCRIBIÓ HACIA DÓNDE» — el puño gira: ¿arriba? ¿abajo?   C2 … D1
   ====================================================================== */
headline(S.C2, S.D1, 'Nadie escribió hacia *dónde*', { size: 82, hlT: at(L.gesto, 15), ...WHITE_HL, y: 250 });
{
  const c = scene(S.C2, S.D1, t => {
    set(cam, { s: 1 + 0.06 * p(t, S.C2, 2.2, E.linear) });
    const sp = t - S.C2; const rot = 180 + Math.sin(sp * 3.6) * 100 + (t > at(L.gesto, 14) ? Math.sin(sp * 9) * 24 : 0);
    set(fb, { s: pop(t, S.C2 + 0.04, 0.4), r: rot, o: t < S.C2 + 0.04 ? 0 : 1 });
    popA(up, t, at(L.gesto, 14), { r: -6 }); popA(dn, t, at(L.gesto, 14, 0.12), { r: 5 });
    set(up, { s: t < at(L.gesto, 14) ? 0 : 1 + 0.1 * Math.max(0, Math.sin(sp * 7)), r: -6, o: t < at(L.gesto, 14) ? 0 : 1 });
    set(dn, { s: t < at(L.gesto, 14, 0.12) ? 0 : 1 + 0.1 * Math.max(0, -Math.sin(sp * 7)), r: 5, o: t < at(L.gesto, 14, 0.12) ? 0 : 1 });
    const kq = p(t, at(L.gesto, 11, 0.05), 1.2, E.inOutCubic); qP.setAttribute('stroke-dashoffset', f1(qLen * (1 - kq))); qP0.setAttribute('stroke-dashoffset', f1(qLen * (1 - kq)));
    set(qD, { s: pop(t, at(L.gesto, 15), 0.35), o: t < at(L.gesto, 15) ? 0 : 1 });
    set(quill, { x: Math.sin(t * 7) * 10, y: Math.cos(t * 5) * 8, r: -20 + Math.sin(t * 6) * 6, o: 1 });
    popA(blank, t, at(L.gesto, 13, -0.02), { r: -3 });
  }, { clip: true });
  sceneBg(c, { background: '#2E241C', backgroundImage: 'repeating-linear-gradient(45deg, rgba(234,223,200,.05) 0 2px, transparent 2px 9px)' });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 820px' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 46%, rgba(255,230,0,.22), rgba(0,0,0,0) 45%)' });
  const qW = box(cam, 590, 470, 380, 500, { zIndex: 2 });
  qW.innerHTML = `<svg viewBox="0 0 300 400" width="380" height="506" style="overflow:visible"><path class="qp" d="M60,130 C56,40 244,30 240,130 C238,196 150,196 150,262 L150,286" stroke="${INK}" stroke-width="44" fill="none" stroke-linecap="round"/><path class="qp2" d="M60,130 C56,40 244,30 240,130 C238,196 150,196 150,262 L150,286" stroke="${PINK}" stroke-width="28" fill="none" stroke-linecap="round"/><g class="qd"><circle cx="150" cy="350" r="28" fill="${PINK}" stroke="${INK}" stroke-width="8"/></g></svg>`;
  const qP = qW.querySelector('.qp2'), qP0 = qW.querySelector('.qp'), qLen = qP.getTotalLength(), qD = qW.querySelector('.qd');
  qP.setAttribute('stroke-dasharray', f1(qLen)); qP0.setAttribute('stroke-dasharray', f1(qLen)); qD.style.transformBox = 'fill-box'; qD.style.transformOrigin = 'center';
  const fb = box(cam, 170, 470, 420, 620, { zIndex: 4 }); fb.innerHTML = fistSvg(620);
  const up = chip(cam, 130, 420, '↑ ¿arriba?', { size: 60, bg: '#fff', color: INK, z: 8 });
  const dn = chip(cam, 360, 1110, '↓ ¿abajo?', { size: 60, bg: '#fff', color: INK, z: 8 });
  const blank = el('div', cam, { left: '650px', top: '1150px', width: '290px', height: '170px', background: '#F3E3BC', border: `5px solid ${INK}`, boxShadow: `7px 7px 0 ${SH}`, zIndex: 5, fontFamily: 'SpecialElite', fontSize: '30px', color: INK, textAlign: 'center', paddingTop: '22px' }, 'hacia: ______<br><br>(sin escribir)');
  const quill = box(cam, 840, 1060, 110, 220, { zIndex: 6 }); quill.innerHTML = `<svg width="110" height="220" viewBox="0 0 110 220" style="overflow:visible"><path d="M60,0 C110,40 100,120 46,190 L40,184 C70,120 70,60 60,0 Z" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M58,10 C70,70 60,130 44,186" stroke="${INK}" stroke-width="2.5" fill="none"/><path d="M44,186 L34,218" stroke="${INK}" stroke-width="6" stroke-linecap="round"/></svg>`;
}

/* ======================================================================
   D1 · «LO DE "HACIA ABAJO"…» — flecha gigante + puño que baja   D1 … D2
   ====================================================================== */
headline(S.D1, S.D2, 'Lo de «hacia *abajo*»…', { size: 92, hlT: at(L.abajo, 3) });
{
  const c = scene(S.D1, S.D2, t => {
    set(ry, { r: t * 10 });
    const ka = p(t, at(L.abajo, 2, -0.05), 0.4, E.outBack);
    set(arw, { y: (1 - ka) * -500 + Math.sin(t * 8) * 10 * ka, o: t < at(L.abajo, 2, -0.05) ? 0 : 1 });
    const kd = p(t, at(L.abajo, 3), 0.35, E.outBack);
    set(fd, { s: pop(t, S.D1 + 0.05, 0.4), r: lerp(160, 0, kd) + Math.sin(t * 5) * 6, y: kd * 40 + Math.sin(t * 6) * 6, o: t < S.D1 + 0.05 ? 0 : 1 });
    popA(fam, t, at(L.abajo, 6, -0.02), { r: -6 });
    FL.forEach(q => { const k = clamp((t - q.t) / 0.35); set(q.e, { s: Math.sin(k * Math.PI) * 1.5, r: t * 200, o: t > q.t && k < 1 ? 1 : 0 }); });
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6' });
  const ry = rays(c, -200, 300, 1480, 26, 'rgba(255,62,165,.13)', 'transparent', 0);
  const arw = box(c, 600, 380, 340, 820, { zIndex: 3 }); arw.innerHTML = arrowSvg('M170,20 V700 M50,560 L170,740 L290,560', PINK, 46);
  const fd = box(c, 150, 420, 420, 620, { zIndex: 4 }); fd.innerHTML = fistSvg(620);
  const fam = chip(c, 330, 1150, '★ lo hizo famoso…', { size: 56, bg: YEL, color: INK, z: 8 });
  const FL = [[170, 520], [820, 460], [520, 1100]].map((q, i) => ({ e: el('div', c, { left: px(q[0]), top: px(q[1]), fontSize: '110px', color: '#fff', textShadow: `0 0 20px ${YEL}, 3px 3px 0 ${INK}`, zIndex: 9, lineHeight: 1 }, '✦'), t: at(L.abajo, 6, -0.02) + i * 0.12 }));
}

/* ======================================================================
   D2 · EL CUADRO DE GÉRÔME A PANTALLA COMPLETA + «1872»   D2 … D3
   ====================================================================== */
headline(S.D2, S.D3, 'Lo hizo famoso *un cuadro*', { size: 80, hlT: at(L.abajo, 8), ...WHITE_HL, y: 196 });
{
  const PI = { x: 40, y: 330, w: 1000, h: 683 };
  const c = scene(S.D2, S.D3, t => {
    set(art, { s: lerp(1.25, 1, p(t, S.D2, 0.35, E.outCubic)), o: 1 });
    set(pcam, { s: 1.2195 * (1 + 0.07 * p(t, S.D2, 2.6, E.linear)) });
    TH.forEach(q => { const k = pop(t, q.t, 0.3); set(q.e, { s: k * (1 + 0.06 * Math.sin(t * 9 + q.ph)), y: Math.sin(t * 6 + q.ph) * 3, r: Math.sin(t * 5 + q.ph) * 8, o: t < q.t ? 0 : 1 }); });
    gface(pm, t, { look: [-3, -4], aR: -150 + wobble(t, 0.5, 4), seed: 2 });
    gface(pr, t, { closed: true, blink: false, sweat: true, seed: 4 });
    face(emp, t, { look: [3, 2], brow: -3, seed: 0.7 }); emp.headg.setAttribute('transform', `rotate(${f1(Math.sin(t * 1.4) * 3)} 180 300)`);
    { const T = at(L.abajo, 10), k = p(t, T, 0.18, E.outCubic); set(yr, { s: t < T ? 0 : lerp(2.3, 1, k), o: t < T ? 0 : clamp(k * 2), r: -4 }); }
    paint(yHL, t, atE(L.abajo, 14, -0.3), 0.3);
    popA(who, t, at(L.abajo, 13), { r: -2 });
    popA(ttl, t, S.D2 + 0.25, { r: 0 });
  }, { clip: true, cut: true });
  sceneBg(c, WALL);
  const art = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 670px', zIndex: 2 });
  const canvas = box(art, PI.x, PI.y, PI.w, PI.h, { overflow: 'hidden', background: '#E9D7B0' });
  const pcam = box(canvas, 0, 0, 820, 560, { transformOrigin: '0 0' });
  box(pcam, 0, 0, 820, 560).innerHTML = `<svg viewBox="0 330 1080 736" width="820" height="560" preserveAspectRatio="xMidYMid slice">${coliseumSvg({ top: 380, seed: 12, sky: '#EED9AE' })}</svg>`;
  const box0 = box(pcam, 30, 120, 250, 230); box0.innerHTML = `<svg width="250" height="230" style="overflow:visible">${cut('<rect x="10" y="40" width="230" height="190"/>', 5, 6)}<rect x="10" y="40" width="230" height="190" fill="#3a2a1e" stroke="${INK}" stroke-width="4"/>
   <path d="M0,10 L250,10 L240,52 L10,52 Z" fill="${RED}" stroke="${INK}" stroke-width="4"/>${[0, 1, 2, 3, 4].map(k => `<path d="M${22 + k * 46},10 L${10 + k * 46 + 30},52" stroke="#fff" stroke-width="10" opacity=".7"/>`).join('')}</svg>`;
  const emp = mk(box0, [40, 50, 170, 217], romanInner({ purple: true, laurel: BRASS }), '0 0 360 460', 'rom'); emp.headg = emp.d.querySelector('.headg');
  { const fr = box(box0, 0, 180, 250, 50, { background: BRASS, border: `4px solid ${INK}`, zIndex: 2 }); fr.style.backgroundImage = 'repeating-linear-gradient(45deg, rgba(43,33,24,.25) 0 2px, transparent 2px 7px)'; }
  const TH = []; [[320, 40], [440, 70], [560, 36], [680, 66], [300, 190], [420, 214], [660, 200], [750, 150]].forEach((q, i) => { const e = box(pcam, q[0], q[1], 76, 110, { zIndex: 3 }); e.innerHTML = `<div style="position:absolute;left:-14px;top:-6px;width:104px;height:104px;border-radius:50%;background:${PINK};border:4px solid ${INK};opacity:.9"></div><div style="position:absolute;left:4px;top:-2px">${fistSvg(100)}</div>`; TH.push({ e, t: S.D2 + 0.12 + i * 0.08, ph: i * 1.7 }); });
  const pr = mkGlad(pcam, [120, 330, 190, 355], { type: 'ret', seed: 9 }); pr.d.style.transform = 'rotate(-78deg)'; pr.d.style.zIndex = 4; pr.d.style.left = '180px'; pr.d.style.top = '270px';
  const pm = mkGlad(pcam, [430, 205, 200, 373], { type: 'murm', seed: 3 }); pm.d.style.zIndex = 5;
  box(canvas, 0, 0, PI.w, PI.h, { background: 'radial-gradient(ellipse at 50% 40%, rgba(255,220,150,.10), rgba(90,50,10,.42) 95%)', zIndex: 8 });
  const frm = box(art, PI.x - 36, PI.y - 36, PI.w + 72, PI.h + 72, { zIndex: 9 }); frm.innerHTML = goldFrame(PI.w, PI.h, 36);
  const ttl = el('div', art, { left: '340px', top: '1036px', width: '400px', textAlign: 'center', background: BRASS, border: `4px solid ${INK}`, borderRadius: '8px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '34px', color: INK, padding: '4px 0 8px', boxShadow: `5px 5px 0 ${SH}`, zIndex: 10 }, '«Pollice Verso»');
  const yr = el('div', c, { left: '230px', top: '1094px', width: '620px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: 1, color: '#fff', textShadow: `7px 7px 0 ${INK}`, zIndex: 12 }, '<span>1872</span>');
  const yHLw = box(yr, 120, 96, 380, 40, { zIndex: -1 }); const yHL = box(yHLw, 0, 0, 380, 40, { background: PINK, transformOrigin: 'left center', borderRadius: '6px 16px 8px 18px' });
  const who = chip(c, 300, 1250, 'Jean-Léon Gérôme · 1872', { size: 40, bg: INK, color: YEL, z: 13 });
}

/* ======================================================================
   D3 · «Y EL CINE LO COPIÓ»   D3 … E1
   ====================================================================== */
headline(S.D3, S.E1, 'Y el *cine* lo copió', { size: 96, hlT: at(L.abajo, 17), ...WHITE_HL });
{
  const T0 = S.D3;
  const c = scene(S.D3, S.E1, t => {
    set(cm.d, { s: pop(t, T0 + 0.04, 0.45), r: -3 + Math.sin(t * 30) * 0.4, o: t < T0 + 0.04 ? 0 : 1 });
    const a = (t - T0) * 400; cm.rA.setAttribute('transform', `rotate(${f1(a)} 130 130)`); cm.rB.setAttribute('transform', `rotate(${f1(a)} 268 130)`); cm.cr.setAttribute('transform', `rotate(${f1(a * 0.8)} 60 300)`);
    const ks = p(t, at(L.abajo, 17, -0.05), 0.6, E.outCubic); strip.style.clipPath = `inset(0 ${f1((1 - ks) * 100)}% 0 0)`;
    set(film, { x: -(((t - T0) * 300) % 200) });
    set(beam, { o: t > at(L.abajo, 17, -0.05) ? 0.45 + Math.sin(t * 40) * 0.05 : 0, sx: ks });
    set(cl.d, { s: pop(t, at(L.abajo, 18, -0.1), 0.4), r: 6, o: t < at(L.abajo, 18, -0.1) ? 0 : 1 });
    const kc = p(t, at(L.abajo, 19, -0.02), 0.12, E.inCubic); cl.clap.setAttribute('transform', `rotate(${f1(-26 * (1 - kc))} 18 78)`);
    stampA(cop, t, at(L.abajo, 19, 0.02), -8);
  }, { clip: true });
  sceneBg(c, { background: '#2E241C', backgroundImage: 'repeating-linear-gradient(45deg, rgba(234,223,200,.05) 0 2px, transparent 2px 9px)' });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 55% 45%, rgba(255,230,0,.16), rgba(0,0,0,.5) 75%)' });
  const beam = box(c, 440, 520, 640, 380, { transformOrigin: '0 50%', zIndex: 2 }); beam.innerHTML = `<svg width="640" height="380"><path d="M0,170 L640,0 L640,380 L0,210 Z" fill="${YEL}" opacity=".35"/></svg>`;
  const strip = box(c, 460, 570, 620, 250, { zIndex: 3, overflow: 'hidden' });
  const film = box(strip, 0, 0, 1000, 250, {});
  { let s = `<rect x="0" y="0" width="1000" height="250" fill="#1d1712"/>`; for (let x = 8; x < 1000; x += 40) s += `<rect x="${x}" y="10" width="22" height="18" rx="4" fill="#F3E3BC"/><rect x="${x}" y="222" width="22" height="18" rx="4" fill="#F3E3BC"/>`;
    for (let k = 0; k < 5; k++) s += `<rect x="${k * 200 + 14}" y="40" width="172" height="170" fill="#E9D7B0" stroke="#F3E3BC" stroke-width="4"/>`;
    film.innerHTML = `<svg width="1000" height="250">${s}</svg>`;
    for (let k = 0; k < 5; k++) { const f = box(film, k * 200 + 60, 52, 82, 120); f.innerHTML = fistSvg(140); } }
  const cm = mk(c, [60, 470, 420, 493], cameraInner(), '0 0 460 540', 'cam'); cm.rA = cm.d.querySelector('.reelA'); cm.rB = cm.d.querySelector('.reelB'); cm.cr = cm.d.querySelector('.crank'); cm.d.style.zIndex = 4;
  const cl = mk(c, [560, 860, 360, 293], clapInner('TOMA 2'), '0 0 320 260', 'clap'); cl.clap = cl.d.querySelector('.clap'); cl.d.style.zIndex = 5;
  const cop = stamp(c, 340, 640, 'COPIADO', { size: 76, bw: 10, z: 9, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
}

/* ======================================================================
   E · RUPTURA 2: «¿A QUE TIENES EL PULGAR EN LA PANTALLA…? TE HE PILLADO»
   ====================================================================== */
function buildPhone(pa, x, y, sc, z) {
  const ph = box(pa, x, y, 500, 960, { zIndex: z, transformOrigin: '0 0' });
  ph.innerHTML = phoneBodySvg();
  const scr = box(ph, 24, 70, 452, 820, { overflow: 'hidden', borderRadius: '30px', background: '#6E2A26' });
  const feed = box(scr, 0, 0, 452, 1640);
  // vídeo 1: este mismo vídeo (portada en miniatura)
  const v1 = box(feed, 0, 0, 452, 820, WALL);
  box(v1, 0, 0, 452, 820).innerHTML = `<svg viewBox="0 300 1080 1960" width="452" height="820" preserveAspectRatio="xMidYMid slice">${coliseumSvg({ top: 560, seed: 5 })}</svg>`;
  const mf = box(v1, 120, 250, 190, 280); mf.innerHTML = fistSvg(280);
  el('div', v1, { left: '20px', top: '70px', width: '412px', textAlign: 'center', background: '#FBF6EA', border: `4px solid ${INK}`, borderRadius: '14px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '46px', lineHeight: 1.05, color: INK, padding: '8px 0 12px' }, '¿Pulgar abajo<br>= <i>«mátalo»</i>?');
  // columna de iconos tipo red social (dibujados)
  const col = box(v1, 372, 430, 70, 330);
  col.innerHTML = `<svg width="70" height="330" style="overflow:visible"><path d="M35,62 C10,44 2,28 12,16 C22,4 32,10 35,20 C38,10 48,4 58,16 C68,28 60,44 35,62 Z" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M10,120 h50 a8,8 0 0 1 8,8 v28 a8,8 0 0 1 -8,8 h-30 l-14,12 v-12 h-6 a8,8 0 0 1 -8,-8 v-28 a8,8 0 0 1 8,-8 Z" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M10,250 L60,226 L48,280 L36,256 Z" fill="#fff" stroke="${INK}" stroke-width="3"/></svg>`;
  el('div', v1, { left: '20px', top: '760px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '24px', color: '#fff', textShadow: `2px 2px 0 ${INK}`, whiteSpace: 'nowrap' }, '@no.venia.en.los.libros');
  // vídeo 2 (el siguiente, que asoma al deslizar)
  const v2 = box(feed, 0, 820, 452, 820, { background: '#2E241C' });
  el('div', v2, { left: 0, top: '320px', width: '452px', textAlign: 'center', fontSize: '110px' }, '❓');
  const hand = box(ph, 0, 0, 500, 960, { zIndex: 5 });
  hand.innerHTML = `<svg viewBox="0 0 500 960" width="500" height="960" style="overflow:visible;position:absolute;left:0;top:0">${holdHandInner()}</svg>`;
  const thumb = hand.querySelector('.thumb');
  const rip = box(ph, 250, 610, 120, 120, { borderRadius: '50%', border: `8px solid #fff`, zIndex: 4 });
  set(ph, { s: sc });
  return { ph, feed, thumb, rip, sc };
}
function updPhone(P, t, o) {
  // o.press: instante del toque; o.swipe: inicio del deslizamiento; o.freeze: instante en que se congela
  const tt = o.freeze != null ? Math.min(t, o.freeze) : t;
  const hov = Math.sin(tt * 5) * 4;
  const ks = o.swipe != null ? p(tt, o.swipe, 0.9, E.inOutCubic) : 0;
  const kp = o.press != null ? Math.sin(clamp((tt - o.press) / 0.25) * Math.PI) : 0;
  P.thumb.setAttribute('transform', `rotate(${f1(-ks * 16 + hov * 0.3)} 470 900) translate(${f1(kp * 6)} ${f1(kp * 10 - ks * 40)})`);
  set(P.feed, { y: -ks * 260 });
  const kr = o.press != null ? clamp((tt - o.press) / 0.45) : 1;
  set(P.rip, { s: 0.3 + kr * 1.3, o: o.press != null && tt > o.press && kr < 1 ? 1 - kr : 0 });
}
headline(S.E1, at(L.tienes, 7, -0.05), '¿Tienes el *pulgar* en la pantalla?', { size: 74, hlT: at(L.tienes, 4), y: 200 });
headline(at(L.tienes, 7, -0.05), S.E2, '…listo para *deslizar*?', { size: 86, hlT: at(L.tienes, 10), y: 210 });
{
  const c = scene(S.E1, S.E2, t => {
    set(ry, { r: t * 8 });
    const kin = p(t, S.E1, 0.4, E.outBack);
    set(wrap, { y: (1 - kin) * 900 });
    updPhone(PH, t, { press: at(L.tienes, 7, -0.05), swipe: at(L.tienes, 10, -0.05) });
    popA(lbl, t, at(L.tienes, 4, 0.05), { r: -6 });
    set(au, { o: t < at(L.tienes, 10) ? 0 : 1, y: -((t - at(L.tienes, 10)) * 220 % 120) });
    popA(dz, t, at(L.tienes, 9, 0.05), { r: 4 });
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6' });
  const ry = rays(c, -200, 300, 1480, 26, 'rgba(255,230,0,.25)', 'transparent', 0);
  const wrap = box(c, 0, 0, 1080, 1920, { zIndex: 3 });
  const PH = buildPhone(wrap, 330, 400, 0.84, 3);
  const lbl = chip(wrap, 90, 640, 'tu pulgar 👉', { size: 54, bg: PINK, z: 10 });
  const au = box(wrap, 130, 840, 120, 200, { zIndex: 10 }); au.innerHTML = arrowSvg('M60,180 V30 M20,70 L60,20 L100,70', YEL, 22);
  const dz = chip(wrap, 60, 1080, '¡a punto de deslizar!', { size: 46, bg: INK, color: YEL, z: 10 });
}
{
  const c = scene(S.E2, S.F1, t => {
    const kin = p(t, S.E2, 0.2, E.outBack);
    set(V.cam, { y: (1 - kin) * 1300, s: 1 + 0.05 * Math.sin(clamp((t - at(L.tienes, 13)) / 0.3) * Math.PI) });
    set(V.ry, { r: t * 14 });
    vecFace(V.v, t, { jaw: talkW(t, 'VECINO'), look: [0, 1], bL: 14, bR: 8, noFan: true, noCup: true, blink: false, seed: 2 });
    const jab = Math.max(0, Math.sin(clamp((t - at(L.tienes, 13)) / 0.3) * Math.PI));
    set(V.hand, { s: 1 + 0.18 * jab + 0.02 * Math.sin(t * 9) });
    set(V.zl, { s: 1 + 0.1 * jab, o: 0.5 + 0.5 * jab });
    const kp = p(t, S.E2 + 0.05, 0.35, E.outBack);
    set(PH.ph, { s: PH.sc * kp, o: t < S.E2 + 0.05 ? 0 : 1, r: 8 + Math.sin(t * 3) * 1.5 });
    updPhone(PH, t, { press: S.E2 - 1.4, swipe: S.E2 - 0.9, freeze: S.E2 - 0.05 });
    stampA(pill, t, at(L.tienes, 13, 0.02), -9);
  }, { clip: true, cut: true, z: 20 });
  const V = vecCloseUp(c);
  const PH = buildPhone(c, 690, 220, 0.44, 30);
  const pill = stamp(c, 90, 1070, '¡TE HE PILLADO!', { size: 84, bw: 12, z: 40, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
}

/* ======================================================================
   F1 · ¡OJO! NADIE SABE EL GESTO EXACTO   F1 … F2
   ====================================================================== */
headline(at(L.ojo, 1, -0.04), S.F2, 'Nadie sabe el gesto *exacto*', { size: 80, hlT: at(L.ojo, 5), ...WHITE_HL, y: 250 });
{
  const c = scene(S.F1, S.F2, t => {
    const ko = p(t, atE(L.ojo, 0, 0.02), 0.35, E.inOutCubic);
    set(ojo, { s: lerp(1, 0.42, ko) * (t < at(L.ojo, 0) ? 0 : lerp(2.3, 1, p(t, at(L.ojo, 0), 0.18))), x: ko * 330, y: ko * -230, r: -8, o: t < at(L.ojo, 0) ? 0 : 0.97 });
    G3.forEach((g, i) => { const t0 = at(L.ojo, 1, 0.05) + i * 0.16; set(g.e, { s: pop(t, t0, 0.4), r: g.r + Math.sin(t * 4 + i) * 8, o: t < t0 ? 0 : 1, y: Math.sin(t * 5 + i * 2) * 8 }); set(g.q, { s: pop(t, at(L.ojo, 4) + i * 0.1, 0.35), o: t < at(L.ojo, 4) + i * 0.1 ? 0 : 1, r: Math.sin(t * 6 + i) * 10 }); });
    stampA(ns, t, at(L.ojo, 1, 0.02), -6);
    set(spot, { o: 0.9 + Math.sin(t * 3) * 0.05 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#2a2018' });
  const colz = box(c, 0, 0, 1080, 1920, { opacity: 0.38 }); colz.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${coliseumSvg({ top: 380, seed: 33, sky: '#4a3a2a' })}</svg>`;
  const spot = box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(ellipse at 50% 55%, rgba(255,230,180,.25), rgba(0,0,0,.55) 70%)', zIndex: 1 });
  const ojo = stamp(c, 330, 640, '¡OJO!', { size: 160, bw: 14, z: 40, bg: 'rgba(255,255,255,.85)', blend: 'normal' });
  const G3 = [[90, 560, 0], [400, 520, 180], [700, 560, 90]].map(([x, y, r]) => {
    const e = box(c, x, y, 300, 420, { zIndex: 3 }); e.innerHTML = `<div style="position:absolute;left:0;top:20px;width:290px;height:380px;background:#F3E3BC;border:5px solid ${INK};border-radius:18px;box-shadow:7px 7px 0 ${SH}"></div><div style="position:absolute;left:20px;top:40px">${fistRot(250, r)}</div>`;
    const q = el('div', e, { left: '190px', top: '-30px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '130px', color: PINK, textShadow: `5px 5px 0 ${INK}`, lineHeight: 1 }, '?');
    return { e, q, r: [-5, 3, 6][x > 600 ? 2 : x > 300 ? 1 : 0] };
  });
  const ns = stamp(c, 390, 1050, 'NADIE LO SABE', { size: 60, bw: 9, z: 9, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
}

/* ======================================================================
   F2 · «ALGUNOS HISTORIADORES CREEN QUE "MÁTALO" ERA…»   F2 … F3
   ====================================================================== */
headline(S.F2, at(L.ojo, 10, -0.05), 'Algunos *historiadores* creen…', { size: 76, hlT: at(L.ojo, 7) });
headline(at(L.ojo, 10, -0.05), S.F3, '…que «mátalo» *era*…', { size: 92, hlT: at(L.ojo, 11), hlc: PINK });
{
  const c = scene(S.F2, S.F3, t => {
    HB.forEach((h, i) => { const t0 = S.F2 + 0.05 + i * 0.12; set(h.d, { s: pop(t, t0, 0.4), o: t < t0 ? 0 : 1, y: wobble(t, 0.5, 3, i) }); face(h, t, { look: t > at(L.ojo, 10) ? [0, -5] : [[4, 0], [0, 2], [-4, 0]][i], brow: t > at(L.ojo, 10) ? -5 : 0, seed: i * 0.7 }); });
    popA(hc, t, at(L.ojo, 7), { r: -3 });
    popA(teo, t, at(L.ojo, 8, 0.05), { r: 4 });
    const kb = pop(t, at(L.ojo, 10, -0.02), 0.4);
    set(thb, { s: kb, o: t < at(L.ojo, 10, -0.02) ? 0 : 1 });
    // suspense: el puño gira despacio en «era…»
    const kr = p(t, at(L.ojo, 11), atE(L.ojo, 11) - at(L.ojo, 11) + 0.1, E.inOutCubic);
    set(ft, { r: lerp(0, 150, kr) + Math.sin(t * 20) * 3 * kr, s: 1 + 0.05 * kr });
    DOTS.forEach((d, i) => set(d, { o: t > at(L.ojo, 11, 0.15 + i * 0.15) ? 1 : 0 }));
  }, { clip: true });
  sceneBg(c, { background: '#E7D3B0' });
  rays(c, -180, 160, 1440, 26, 'rgba(255,230,0,.22)', 'transparent', 0);
  const HB = [[300, 'brodie', true, false, 31], [500, null, false, true, 32], [700, 'slouch', true, true, 33]].map(([x, hat, beard, mous, seed], i) => {
    const h = mk(c, [x, 740 + (i === 1 ? -50 : 0), 310, 396], bustInner({ hat, beard, moustache: mous, uniform: 'farmer', seed }) + specs, '0 0 360 460', 'bust'); h.d.style.zIndex = i === 1 ? 2 : 3; return h;
  });
  box(c, 280, 1110, 760, 54, { background: WOOD, border: `5px solid ${INK}`, zIndex: 4, backgroundImage: 'repeating-linear-gradient(92deg, rgba(43,33,24,.16) 0 2px, transparent 2px 15px)' });
  const hc = chip(c, 60, 360, 'algunos historiadores', { size: 50, bg: INK, color: YEL, z: 8 });
  const teo = chip(c, 60, 450, '(una teoría)', { size: 40, bg: '#fff', color: INK, z: 8 });
  const thb = box(c, 380, 420, 420, 300, { zIndex: 6 });
  thb.innerHTML = `<svg width="420" height="300" style="overflow:visible;position:absolute;left:0;top:0">${cut('<ellipse cx="210" cy="130" rx="200" ry="120"/>', 6, 8)}<ellipse cx="210" cy="130" rx="200" ry="120" fill="#fff" stroke="${INK}" stroke-width="6"/><circle cx="120" cy="270" r="18" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="90" cy="300" r="10" fill="#fff" stroke="${INK}" stroke-width="4"/></svg>`;
  el('div', thb, { left: '30px', top: '60px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '56px', color: INK, whiteSpace: 'nowrap' }, '«mátalo» =');
  const ft = box(thb, 262, 22, 130, 220, { zIndex: 2 }); ft.innerHTML = fistRot(220, 0);
  const DOTS = [0, 1, 2].map(i => el('div', thb, { left: px(300 + i * 30), top: '200px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '70px', color: RED, lineHeight: 1 }, '.'));
}

/* ======================================================================
   F3 · «…PULGAR ARRIBA» — 👍 gigante + cameo del emú   F3 … G1
   ====================================================================== */
headline(S.F3, S.G1, '¡Pulgar *arriba*!', { size: 110, hlT: at(L.ojo, 13), y: 220 });
const T_EMU = at(L.ojo, 13, 0.1);
{
  const c = scene(S.F3, S.G1, t => {
    set(ry, { r: t * 30 });
    const kf = p(t, S.F3 + 0.02, 0.3, E.outBack);
    set(fu, { y: (1 - kf) * -900 + Math.sin(t * 6) * 8, r: Math.sin(t * 4) * 5, s: 1 + 0.1 * Math.sin(clamp((t - at(L.ojo, 13)) / 0.3) * Math.PI) });
    stampA(sup, t, at(L.ojo, 13, 0.04), -8);
    const ke = p(t, T_EMU, 0.3, E.outBack);
    set(emu.d, { y: (1 - ke) * 420, o: t < T_EMU ? 0 : 1, r: -4 });
    face(emu, t, { look: [-5, -2], wing: -80 - Math.sin(t * 16) * 8, half: false, blink: false, jaw: t > T_EMU + 0.2 && t < T_EMU + 0.5 ? 0.5 : 0 });
    set(eth, { s: pop(t, T_EMU + 0.12, 0.3), o: t < T_EMU + 0.12 ? 0 : 1, r: Math.sin(t * 10) * 10 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: YEL });
  const ry = rays(c, -200, 0, 1480, 30, 'rgba(255,255,255,.45)', 'transparent', 0);
  halftone(c, 'rgba(0,0,0,.08)', 1);
  const fu = box(c, 270, 380, 540, 540, { zIndex: 4 }); fu.innerHTML = fistRot(540, 180);
  const sup = stamp(c, 110, 920, '¿PULGAR ARRIBA?', { size: 80, bw: 11, z: 9, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
  const emuClip = box(c, 600, 980, 340, 420, { overflow: 'hidden', zIndex: 6 });
  const emu = mkEmu(emuClip, [30, 30, 280, 420], { seed: 61 });
  const eth = box(emuClip, 210, 60, 110, 110, { zIndex: 3 }); eth.innerHTML = fistRot(110, 180);
}

/* ======================================================================
   G1 · GOLPE ROSA CITABLE: «Tu like, en Roma… ¿una sentencia?»   G1 … G2
   ====================================================================== */
colorHit(S.G1, S.G2, PINK, c => {
  const col = box(c, 0, 0, 1080, 1920, { zIndex: 2, opacity: 0 }); col.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><g style="filter:brightness(0)" opacity=".85">${coliseumSvg({ top: 900, seed: 7 })}</g></svg>`;
  col.style.filter = 'brightness(0)';
  const t1 = el('div', c, { left: 0, top: '230px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: 1, color: INK, zIndex: 5 }, `Tu <i>${hlSpan('like', 'lhl', YEL)}</i>…`);
  const lhl = t1.querySelector('.lhl');
  const t2 = el('div', c, { left: 0, top: '420px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '84px', lineHeight: 1, color: '#fff', textShadow: `4px 4px 0 ${INK}`, zIndex: 5 }, 'en Roma…');
  const lk = box(c, 270, 560, 540, 540, { zIndex: 4 }); lk.innerHTML = likeSvg(540);
  const lau = box(c, 250, 520, 580, 300, { zIndex: 5 });
  { let lf = ''; for (let k = 0; k < 9; k++) { const a = Math.PI * (1.0 + k * 0.1), x = 290 + Math.cos(a) * 270, y = 290 + Math.sin(a) * 250; lf += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="36" ry="15" transform="rotate(${f1(a * 180 / Math.PI + 60)} ${f1(x)} ${f1(y)})" fill="#7a9a52" stroke="${INK}" stroke-width="4"/>`; const x2 = 580 - x; lf += `<ellipse cx="${f1(x2)}" cy="${f1(y)}" rx="36" ry="15" transform="rotate(${f1(-(a * 180 / Math.PI + 60))} ${f1(x2)} ${f1(y)})" fill="#7a9a52" stroke="${INK}" stroke-width="4"/>`; }
    lau.innerHTML = `<svg width="580" height="300" style="overflow:visible">${lf}</svg>`; }
  const t3 = el('div', c, { left: 0, top: '1120px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: 1, color: INK, zIndex: 6 }, `…¿una <i>${hlSpan('sentencia', 'shl', YEL)}</i>?`);
  const shl = t3.querySelector('.shl');
  const sen = stamp(c, 300, 760, 'SENTENCIA', { size: 104, bw: 13, z: 8, col: INK, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  return t => {
    set(t1, { s: lerp(1.3, 1, p(t, S.G1, 0.2)), o: 1 }); t1.style.textShadow = glitch(t, at(L.osea, 3), 0.25); paint(lhl, t, at(L.osea, 3), 0.3);
    popA(t2, t, at(L.osea, 5, -0.02), { r: -2 });
    set(lk, { s: pop(t, S.G1 + 0.08, 0.45) * (1 + 0.06 * Math.sin(t * 7)), r: Math.sin(t * 3) * 4, o: t < S.G1 + 0.08 ? 0 : 1 });
    set(lau, { s: pop(t, at(L.osea, 5), 0.4), o: t < at(L.osea, 5) ? 0 : 1 });
    set(col, { o: 0.25 * p(t, at(L.osea, 5), 0.3), y: (1 - p(t, at(L.osea, 5), 0.5, E.outCubic)) * 200 });
    popA(t3, t, at(L.osea, 6, -0.02), { rise: 30 }); paint(shl, t, at(L.osea, 11), 0.35); t3.style.textShadow = glitch(t, at(L.osea, 11), 0.25);
    stampA(sen, t, at(L.osea, 11, 0.06), -10);
  };
});

/* ======================================================================
   G2 · PREGUNTA ABIERTA + COMENTARIOS «¿A quién se lo has dado hoy? Os leo.»   G2 … bal
   ====================================================================== */
headline(S.G2, S.bal, '¿A quién se lo has *dado* hoy?', { size: 84, hlT: at(L.osea, 17) });
{
  const c = scene(S.G2, S.bal, t => {
    set(lk, { s: pop(t, S.G2 + 0.05, 0.4) * (1 + 0.08 * Math.max(0, Math.sin(t * 8))), r: -8 + Math.sin(t * 3) * 4, o: t < S.G2 + 0.05 ? 0 : 1 });
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
    popA(ol, t, at(L.osea, 19, -0.02), { r: -4 });
    set(arr, { o: t < at(L.osea, 19) ? 0 : 1, y: Math.abs(Math.sin(t * 6)) * 20 });
  }, { clip: true });
  sceneBg(c, { background: PAPER });
  const pan = box(c, 50, 430, 980, 700, { background: '#fff', border: `5px solid ${INK}`, borderRadius: '36px', boxShadow: `10px 12px 0 ${SH}`, zIndex: 2 });
  el('div', pan, { left: '40px', top: '24px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '38px', color: INK }, 'Comentarios');
  box(pan, 40, 84, 900, 4, { background: INK, opacity: 0.15 });
  const CM = [];
  [['VECINA', '@marta_del_quinto', 'A mi jefe… y sin leer el correo 😬'], ['GLADM', '@tribuno_paco', 'Al vídeo de mi ex. Sentencia firme 💀'], ['EMU', '@emu_oficial', 'Yo solo doy alas 🪶']].forEach((m, i) => {
    const e = box(pan, 30, 110 + i * 180, 920, 160, { zIndex: 3 });
    avatar(e, 0, 14, 120, m[0], { bw: 4 });
    el('div', e, { left: '140px', top: '14px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '30px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]);
    el('div', e, { left: '140px', top: '56px', width: '760px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '40px', lineHeight: 1.15, color: INK }, m[2]);
    CM.push({ e, t: at(L.osea, 13) + i * 0.45 });
  });
  const lk = box(c, 760, 1020, 220, 220, { zIndex: 6 }); lk.innerHTML = likeSvg(220, YEL);
  const ol = chip(c, 300, 1180, 'OS LEO', { size: 72, bg: INK, color: YEL, z: 8 });
  const arr = el('div', c, { left: '590px', top: '1180px', fontSize: '80px', zIndex: 8 }, '👇');
}

/* ======================================================================
   H · MARCA AL FINAL: EL VECINO EN SU BALCÓN (rápido)  bal … book
   ====================================================================== */
{
  const T0 = S.bal, T1 = S.book;
  const c = scene(T0, T1, t => {
    const ex = p(t, T1 - 0.2, 0.2, E.inCubic);
    set(cam, { s: lerp(1.04 + 0.05 * p(t, T0, T1 - T0, E.linear), 0.3, ex), x: ex * -330, y: ex * 380, o: 1 - ex * 0.6 });
    const lean = p(t, K.vecino - 0.1, 0.35, E.inOutCubic);
    set(vec.d, { s: 1 + lean * 0.07, y: wobble(t, 0.5, 3) - lean * 20 });
    const fanFast = t > T0 + 0.15 && t < K.vecino;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > K.vecino + 0.3 ? [0, -5] : [0, 0], bL: fanFast ? 8 : 6, bR: fanFast ? 8 : 12, fan: fanFast ? Math.sin(t * 22) * 14 : wobble(t, 0.9, 6), noCup: true, seed: 0.3 });
    popA(tag, t, K.vecino, { r: -5 });
    const ks = p(t, T0 + 0.02, 0.5, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: Math.sin(t * 2.4) * 1.5 * (1 - p(t, T0, 2)) + (1 - ks) * 8, o: t < T0 + 0.01 ? 0 : 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    paint(sHL, t, K.vecino + 0.1, 0.3);
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
    d.innerHTML = `<svg viewBox="0 0 200 160" width="200" height="160" style="overflow:visible">${fl}${cut('<path d="M30,110 L170,110 L156,160 L44,160 Z"/>', 5, 6)}<path d="M30,110 L170,110 L156,160 L44,160 Z" fill="#C1663A" stroke="${INK}" stroke-width="4"/><path d="M30,110 L170,110 L156,160 L44,160 Z" fill="url(#hA)" opacity=".5"/><rect x="24" y="104" width="152" height="16" rx="4" fill="#C1663A" stroke="${INK}" stroke-width="4"/></svg>`;
    pots.push(d);
  });
  const tag = chip(cam, 640, 610, 'tu vecino', { size: 44, bg: PINK });
  const sign = box(cam, 120, 150, 840, 270, { zIndex: 40 });
  sign.innerHTML = `<svg width="840" height="270" style="position:absolute;left:0;top:0;overflow:visible"><path d="M160,0 L200,40 M680,0 L640,40" stroke="${INK}" stroke-width="5"/>${cut('<rect x="20" y="40" width="800" height="226" rx="22"/>')}<rect x="20" y="40" width="800" height="226" rx="22" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="36" y="56" width="768" height="194" rx="14" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
  const sl1 = el('div', sign, { left: '0', top: '62px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '76px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sl2 = el('div', sign, { left: '0', top: '146px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sw = [];
  [['Soy', K.isoy], ['tu', K.isoy + 1], ['vecino…', K.isoy + 2]].forEach(([wd, wi], k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.style.position = 'relative'; s.innerHTML = wd === 'vecino…' ? hlSpan('vecino…', 'shl') : wd; (k < 2 ? sl1 : sl2).appendChild(s); sw.push({ e: s, t: W[wi].s }); });
  const sHL = sign.querySelector('.shl');
}

/* ======================================================================
   I · …Y ESTO NO VENÍA EN EL LIBRO — el libro HISTORIA se cierra de golpe  book … LOOP
   ====================================================================== */
headline(S.book, K.noV - 0.06, 'Y esto…', { size: 120, color: YEL, y: 220, shadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}` });
headline(K.noV - 0.06, LOOP, '…no venía en el *libro*.', { size: 84, hlT: K.libro });
{
  const TC = K.libro - 0.05;
  const c = scene(S.book, LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    fq.style.display = sx > 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    stand.d.style.display = sx > 0.25 ? '' : 'none'; trap.style.display = sx <= 0.25 ? '' : 'none';
    const panic = t > TC - 0.35;
    gface(stand, t, { look: panic ? [4, -5] : [-3, 2], oh: panic, sweat: panic, aR: panic ? -60 : 0, seed: 1 }); set(stand.d, { y: wobble(t, 1, 3) - (panic ? Math.abs(Math.sin(t * 14)) * 10 : 0) });
    set(bookW, { s: 1.25 * pop(t, S.book + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    puffs.forEach((f, i) => { const kf = p(t, TC + 0.3, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 150 * kf, y: -kf * 120, s: 0.5 + kf, o: closed ? 1 - kf : 0 }); });
    set(fq, { r: Math.sin(t * 3) * 6 });
    popA(epl, t, TC + 0.3, { r: -1 });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 6; i++) lines += `<path d="M170,${990 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <g class="trap"><use href="#gladM" x="250" y="470" width="250" height="467"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="720" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="44" fill="${INK}">ROMA</text><text x="335" y="762" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="32" fill="${INK}">cap. «pulgar abajo»</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF'), trap = bs.querySelector('.trap');
  const fq = box(bookW, 280, 790, 120, 175, { zIndex: 1 }); fq.innerHTML = fistSvg(175);
  const stand = mkGlad(bookW, [640, 520, 230, 429], { type: 'murm', seed: 81 }); stand.d.style.zIndex = 2;
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '360px', top: '470px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const puffs = [0, 1, 2, 3].map(() => box(bookW, 480, 600, 120, 80, { borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}`, zIndex: 3 }));
  const epl = el('div', c, { left: '0', top: '1150px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:38px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 22 · ¿Pulgar abajo = «mátalo»?</span>`);
}

/* =================== EL VECINO en su marco ovalado =================== */
const OV = { x: 40, y: 962, w: 330, h: 362 };
const ovalW = box(world, OV.x, OV.y, OV.w, OV.h, { zIndex: 850 });
const ovIn = box(ovalW, 16, 16, OV.w - 32, OV.h - 32, { borderRadius: '50%', overflow: 'hidden', background: `repeating-linear-gradient(90deg, #F4CFDA 0 16px, #F9E3EA 16px 32px)` });
box(ovIn, 0, 0, OV.w - 32, OV.h - 32, { background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,.5), rgba(120,40,60,.25) 90%)' });
const vecO = mkVec(ovIn, [-48, -18, 396, 490]);
const ovFrame = box(ovalW, -20, -36, OV.w + 40, OV.h + 80);
{
  const cx = (OV.w + 40) / 2, cy = 36 + OV.h / 2, rx = OV.w / 2 - 4, ry = OV.h / 2 - 4;
  let beads = ''; for (let k = 0; k < 40; k++) { const a = k / 40 * Math.PI * 2; beads += `<circle cx="${f1(cx + Math.cos(a) * (rx + 2))}" cy="${f1(cy + Math.sin(a) * (ry + 2))}" r="4.5" fill="#f3d27a" stroke="${INK}" stroke-width="1.5"/>`; }
  ovFrame.innerHTML = `<svg width="${OV.w + 40}" height="${OV.h + 80}" style="overflow:visible">
  <ellipse cx="${cx + 8}" cy="${cy + 10}" rx="${rx + 14}" ry="${ry + 14}" fill="none" stroke="${SH}" stroke-width="26"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 14}" ry="${ry + 14}" fill="none" stroke="#fff" stroke-width="34"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="${INK}" stroke-width="24"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="${BRASS}" stroke-width="17"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="url(#hA)" stroke-width="17" opacity=".6"/>${beads}
  <ellipse cx="${cx}" cy="${cy}" rx="${rx - 8}" ry="${ry - 8}" fill="none" stroke="${INK}" stroke-width="3"/>
  <g transform="translate(${cx},24)"><path d="M-46,22 C-40,-6 -14,-12 0,-24 C14,-12 40,-6 46,22 Z" fill="${BRASS}" stroke="${INK}" stroke-width="3.5"/><circle cx="0" cy="2" r="9" fill="${PINK}" stroke="${INK}" stroke-width="3"/><path d="M-30,16 q30,-14 60,0" stroke="${INK}" stroke-width="2" fill="none"/></g>
  <g transform="translate(${cx},${OV.h + 60})"><rect x="-104" y="-26" width="208" height="46" rx="10" fill="${INK}" stroke="${BRASS}" stroke-width="4"/><text x="0" y="8" text-anchor="middle" font-family="Rye" font-size="25" fill="${YEL}">EL VECINO</text></g></svg>`;
}
const CX = -41, CY = 45, CS = 0.75;
const OV_VIS = [[S.B2, S.E1], [S.F1, S.F3]];
function ovalState(t) {
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 };
  }
  return null;
}
const IN = (t, a, b) => t > a && t < b;
const LAUGH = [[at(L.eh, 13, 0.1), at(L.eh, 13, 0.75)]];
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  const inL = LAUGH.find(r => t >= r[0] && t < r[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (inL ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3, noCup: true };
  if (IN(t, at(L.gesto, 10, -0.05), atE(L.gesto, 10, 0.2))) { o.bL = 14; o.bR = 14; o.fan = Math.sin(t * 26) * 22 - 10; }
  if (IN(t, at(L.gesto, 11), atE(L.gesto, 15))) { o.look = [6, 2]; o.bL = 4; o.bR = 14; }
  if (IN(t, at(L.abajo, 10, -0.05), atE(L.abajo, 14))) { o.bL = 10; o.bR = 10; o.look = [3, -4]; }
  if (IN(t, at(L.ojo, 0, -0.06), atE(L.ojo, 1, -0.1))) { o.bL = 16; o.bR = 16; o.jaw = Math.max(o.jaw, 0.7); }
  if (IN(t, at(L.ojo, 11), at(L.ojo, 12))) { o.look = [4, -5]; o.bL = 10; o.bR = 10; }
  if (IN(t, at(L.ojo, 12), S.G1)) { o.fan = Math.sin(t * 26) * 22 - 10; o.bL = 16; o.bR = 16; o.look = [0, 0]; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  vecFace(vecO, t, o);
}

/* ---------- precarga de fuentes ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '0', zIndex: 0, whiteSpace: 'nowrap' });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:900;font-style:italic', 'Playfair;font-weight:800', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ «mátalo» 1872 © ✔ ★ ✦ … ↑ ↓</span>`).join('') + '<span>👎👍👉👇😬💀🪶❓</span>';
  ['900 40px Playfair', 'italic 800 40px Playfair', 'italic 900 40px Playfair', '800 40px Playfair', '40px Rye', '40px SpecialElite', '800 40px Bricolage', '600 40px Bricolage'].forEach(f => { try { document.fonts.load(f); } catch (e) { } });
}

/* =================== frame =================== */
window.frame = t => {
  SC.forEach(s => {
    const vis = t >= s.t0 && t < s.t1; s.c.style.display = vis ? '' : 'none'; if (!vis) return;
    if (s.cut) set(s.c, { o: 1 });
    else { const kin = p(t, s.t0, 0.22, E.outCubic), kout = p(t, s.t1 - 0.12, 0.12, E.inCubic); set(s.c, { x: (1 - kin) * 160 * s.dir - kout * 150, o: Math.min(clamp(kin * 1.8), 1 - kout) }); }
    if (s.fn) s.fn(t);
  });
  HLS.forEach(h => {
    const vis = t >= h.t0 - 0.02 && t < h.t1; h.b.style.display = vis ? '' : 'none'; if (!vis) return;
    h.b.style.opacity = 1 - p(t, h.t1 - 0.12, 0.12, E.inCubic);
    h.spans.forEach(s => { const k = p(t, s.t - 0.14, 0.26, E.outBack); set(s.e, { y: (1 - k) * 42, o: clamp(k * 1.5) }); });
    h.hls.forEach(s => { s.e.style.transform = `scaleX(${f1(p(t, s.t, 0.36, E.outCubic) * 1000) / 1000}) rotate(-1.2deg)`; });
  });
  updOval(t);
  let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};
[[at(L.gancho, 8, 0.05), .35, 14], [S.B1 + 0.05, .3, 16], [at(L.eh, 2), .3, 12], [at(L.eh, 8), .3, 8], [at(L.eh, 13, 0.08), .25, 8], [at(L.gesto, 2, 0.05), .25, 8], [at(L.gesto, 10, 0.02), .35, 12],
 [at(L.abajo, 3), .3, 10], [S.D2, .3, 10], [at(L.abajo, 10), .3, 12], [at(L.abajo, 19, 0.02), .3, 10], [at(L.tienes, 7, -0.05), .2, 6], [S.E2 + 0.05, .3, 16], [at(L.tienes, 13, 0.02), .4, 18],
 [at(L.ojo, 0), .4, 16], [at(L.ojo, 1, 0.02), .3, 10], [S.F3 + 0.2, .4, 18], [at(L.osea, 3), .3, 10], [at(L.osea, 11, 0.06), .4, 16], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
[
  [0.02, 'whoosh', .5], [at(L.gancho, 1, 0.05), 'thud', .7], [at(L.gancho, 2), 'pop', .6], [at(L.gancho, 3), 'pop2', .5], [at(L.gancho, 4), 'boing', .5], [at(L.gancho, 8), 'burst', .7], [at(L.gancho, 8, 0.05), 'stamp', 1.0],
  [atE(L.gancho, 8, -0.1), 'swoosh_up', .7], [S.B1, 'scratch', .8], [S.B1 + 0.05, 'thud', 1.0], [at(L.eh, 2), 'glitch', .6], [at(L.eh, 2, 0.02), 'boing', .6],
  [S.B2, 'whoosh', .6], [at(L.eh, 5, -0.05), 'pop', .7], [at(L.eh, 8, -0.04), 'whoosh', .6], [at(L.eh, 8, 0.5), 'thud', .7], [at(L.eh, 10), 'ding', .6], [at(L.eh, 11, 0.02), 'swoosh_up', .5], [at(L.eh, 13, 0.08), 'pop2', .7],
  [S.C1 + 0.05, 'paper', .7], [at(L.gesto, 2, 0.05), 'stamp', .8], [at(L.gesto, 3), 'pop', .6], [at(L.gesto, 4), 'pop', .6], [at(L.gesto, 5, 0.04), 'pop2', .6], [at(L.gesto, 6), 'swoosh_up', .5], [at(L.gesto, 10, 0.02), 'stamp', 1.0], [at(L.gesto, 10, 0.05), 'thud', .7],
  [S.C2, 'whoosh', .6], [at(L.gesto, 11, 0.05), 'swoosh_up', .4], [at(L.gesto, 13), 'type', .5], [at(L.gesto, 14), 'ping', .6], [at(L.gesto, 14, 0.12), 'ping', .6], [at(L.gesto, 15), 'boing', .6],
  [S.D1, 'whoosh', .6], [at(L.abajo, 2, -0.05), 'swoosh_up', .5], [at(L.abajo, 3), 'thud', .8], [at(L.abajo, 6, -0.02), 'sparkle', .7],
  [S.D2, 'burst', .6], [S.D2 + 0.12, 'pop2', .4], [at(L.abajo, 10), 'stamp', 1.0], [atE(L.abajo, 14, -0.3), 'ding', .7], [at(L.abajo, 13), 'pop', .6],
  [S.D3, 'whoosh', .6], [at(L.abajo, 17, -0.05), 'clockfast', .35], [at(L.abajo, 18, -0.1), 'pop2', .6], [at(L.abajo, 19, 0.0), 'click', 1.0], [at(L.abajo, 19, 0.02), 'stamp', .9],
  [S.E1, 'swoosh_up', .7], [at(L.tienes, 4, 0.05), 'pop', .6], [at(L.tienes, 7, -0.05), 'tick', .9], [at(L.tienes, 9, 0.05), 'pop2', .5], [at(L.tienes, 10, -0.05), 'swoosh_up', .6],
  [S.E2, 'scratch', .9], [S.E2 + 0.05, 'thud', 1.0], [at(L.tienes, 13, 0.02), 'stamp', 1.1], [at(L.tienes, 13, 0.06), 'gulp', .6],
  [at(L.ojo, 0), 'stamp', 1.0], [at(L.ojo, 1, 0.02), 'thud', .7], [at(L.ojo, 1, 0.05), 'pop', .5], [at(L.ojo, 1, 0.21), 'pop', .5], [at(L.ojo, 1, 0.37), 'pop', .5], [at(L.ojo, 4), 'boing', .5],
  [S.F2, 'whoosh', .5], [at(L.ojo, 7), 'pop2', .6], [at(L.ojo, 8, 0.05), 'pop', .5], [at(L.ojo, 10, -0.02), 'pop', .6], [at(L.ojo, 11), 'drumroll', .6],
  [S.F3, 'burst', .9], [at(L.ojo, 13, 0.04), 'stamp', 1.0], [T_EMU, 'emu', .9], [T_EMU + 0.12, 'pop2', .6],
  [S.G1, 'burst', .8], [at(L.osea, 3), 'glitch', .5], [at(L.osea, 3, 0.05), 'heart', .7], [at(L.osea, 5), 'sparkle', .6], [at(L.osea, 6), 'swoosh_up', .5], [at(L.osea, 11, 0.06), 'stamp', 1.0], [at(L.osea, 11, 0.1), 'thud', .8],
  [S.G2, 'whoosh', .6], [at(L.osea, 13), 'msg_in', .7], [at(L.osea, 13, 0.45), 'msg_in', .7], [at(L.osea, 13, 0.9), 'msg_in', .7], [at(L.osea, 19, -0.02), 'pop', .7],
  [S.bal + 0.02, 'whoosh', .7], [K.soy, 'swoosh_up', .6], [K.vecino, 'pop', .6], [S.book, 'whoosh', .5], [K.libro + 0.25, 'thud', 1.4], [K.libro + 0.3, 'stamp', .5], [LOOP, 'whoosh', .6],
].forEach(s => sfx(s[1], s[0], s[2]));

/* ---------- bucle: los últimos 0,4 s enlazan con la portada (fotograma 0) ---------- */
{
  const f0 = window.frame;
  window.frame = t => {
    if (t < LOOP) return f0(t);
    f0(0);
    const k = p(t, LOOP, 0.22, E.outCubic);
    set(world, { x: (1 - k) * 1080 });
  };
}
