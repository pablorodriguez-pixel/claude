/* Ep. 21 · escenas L0–L4 (gancho, prueba, KARAOKE, reacción, hermanas, letra, empresa) — todo por texto (K) y por la caja de música (MEL) */
function bubble(pa, x, y, txt, o = {}) {
  return el('div', pa, { left: px(x), top: px(y), background: '#fff', border: `5px solid ${INK}`, borderRadius: o.rad || '44px 44px 44px 10px', boxShadow: `7px 8px 0 ${SH}`, padding: o.pad || '6px 30px 12px', fontFamily: 'Playfair', fontStyle: o.it ? 'italic' : 'normal', fontWeight: 900, fontSize: px(o.size || 64), lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: o.z || 30 }, txt);
}
const handBox = (pa, x, y, sz = 130, rot = 0, z = 30) => { const d = box(pa, x, y, sz, sz, { zIndex: z }); d.innerHTML = `<svg viewBox="-60 -70 120 120" width="${sz}" height="${sz}" style="overflow:visible">${gloveHand(0, 0, rot, 1.15)}</svg>`; return d; };
function riseNotes(pa, n, x0, y0, spread, seed, o = {}) {
  const r = rng(seed); const L = [];
  for (let i = 0; i < n; i++) { const sz = (o.sz || 90) * (0.75 + r() * 0.5); L.push({ e: noteBox(pa, x0 + (r() - 0.5) * spread, y0, sz, i % 2, o.col ? o.col[i % o.col.length] : INK, o.z || 25), ph: i / n + r() * 0.08, sw: 30 + r() * 40, sp: 0.4 + r() * 0.25 }); }
  return L;
}
function updNotes(L, t, h = 600, on = 1) { L.forEach((q, i) => { const ph = (t * q.sp + q.ph) % 1; set(q.e, { x: Math.sin(ph * 7 + i) * q.sw, y: -ph * h, s: (0.6 + 0.5 * ph) * on, r: Math.sin(t * 3 + i) * 16, o: on * Math.min(1, ph * 6, (1 - ph) * 4) }); }); }

/* ======================================================================
   A · GANCHO / PORTADA — «¿Cumpleaños feliz tenía dueño?» + tarta gigante con etiqueta y candado
   ====================================================================== */
{
  const c = scene(S.A[0], S.A[1], t => {
    const kz = p(t, K.la0 - 0.05, 0.6, E.inOutCubic);
    set(cam, { s: 1.0 + 0.04 * p(t, 0, 4, E.linear) + 0.06 * kz, y: -kz * 30 });
    set(cake.d, { y: wobble(t, 0.6, 4), r: wobble(t, 0.4, 0.8) });
    flick(cake, t);
    updNotes(NT, t, 360);
    // etiqueta «¿?» columpiándose desde el fotograma 0
    set(tg, { r: -8 + Math.sin(t * 3.2) * 10 + (t > K.dueno ? shake(t, K.dueno, 0.4, 10) : 0) });
    // candado: cae y se cierra en «dueño»
    const kl = p(t, K.dueno - 0.18, 0.22, E.outBounce);
    set(lk, { y: (1 - kl) * -720, r: -8 + (t > K.dueno ? Math.sin((t - K.dueno) * 30) * 6 * Math.exp(-(t - K.dueno) * 4) : 0), o: t < K.dueno - 0.18 ? 0 : 1 });
    shk.setAttribute('transform', `translate(0 ${f1(-26 * (1 - p(t, K.dueno + 0.02, 0.12, E.inCubic)))})`);
    // «tus tartas»: mano que te señala
    set(hd, { s: pop(t, K.tartas - 0.1, 0.35), x: Math.sin(t * 6) * 6, r: 0, o: t < K.tartas - 0.1 ? 0 : 1 });
    set(ttl, { y: wobble(t, 0.5, 3) });
    set(qm, { s: 1 + 0.08 * Math.sin(t * 5), r: -4 + Math.sin(t * 3) * 3 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 1000px' });
  sceneBg(cam, { background: '#EFE1C6' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 66%, rgba(255,230,0,.38), rgba(255,230,0,0) 55%)' });
  rays(cam, -200, 520, 1480, 26, 'rgba(255,62,165,.12)', 'rgba(0,0,0,0)', 0);
  const cake = mkCake(cam, [110, 590, 780, 832]); cake.d.style.zIndex = 4;
  const NT = riseNotes(cam, 7, 500, 780, 640, 11, { sz: 96, col: [INK, RED, INK, '#5b8bd6'] });
  // cordel + etiqueta
  const tg = box(cam, 740, 660, 260, 330, { zIndex: 9, transformOrigin: '30px 0px' });
  tg.innerHTML = `<svg width="260" height="330" style="overflow:visible"><path d="M30,0 C34,60 40,110 46,176" stroke="${INK}" stroke-width="5" fill="none"/></svg>`;
  const tgI = box(tg, 0, 140, 250, 142); tgI.innerHTML = tagSvg('¿?');
  const lk = box(cam, 400, 1060, 220, 264, { zIndex: 12 }); lk.innerHTML = lockSvg(); const shk = lk.querySelector('.shk');
  const hd = handBox(cam, 60, 1110, 250, 200, 30);
  // portada: la pregunta (sin respuesta), por debajo de y≈300
  const ttl = el('div', cam, { left: '30px', top: '300px', width: '1020px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, color: INK, zIndex: 50, lineHeight: 1 });
  ttl.innerHTML = `<div style="font-size:112px;line-height:124px">${hlSpan('<i>¿Cumpleaños feliz</i>', 'th')}</div>`;
  ttl.querySelector('.th').style.transform = 'scaleX(1) rotate(-1.2deg)';
  const qm = el('div', ttl, { position: 'relative', display: 'inline-block', left: 'auto', top: 'auto', marginTop: '12px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '112px', lineHeight: '128px', color: '#fff', background: PINK, padding: '0 34px 10px', border: `6px solid ${INK}`, borderRadius: '22px', boxShadow: `8px 8px 0 ${INK}` }, 'tenía dueño?');
}

/* ======================================================================
   B1 · «HAZ LA PRUEBA: CÁNTALA POR DENTRO» — cartel que te señala → cabeza con notas dentro
   ====================================================================== */
headline(S.B1[0], K.cantala - 0.08, 'Haz la *prueba:*', { size: 110, hlT: K.prueba });
headline(K.cantala - 0.08, S.B1[1], 'Cántala *por dentro*', { size: 104, hlT: K.dentro });
{
  const c = scene(S.B1[0], S.B1[1], t => {
    const sw = p(t, K.cantala - 0.12, 0.25, E.inOutCubic);
    set(sign, { s: pop(t, S.B1[0] + 0.02, 0.4) * (1 - 0.3 * sw), y: -sw * 900, r: -4 + wobble(t, 0.6, 1.5) });
    set(pt, { s: pop(t, K.prueba, 0.35), x: Math.sin(t * 7) * 10, y: -sw * 900, o: t < K.prueba ? 0 : 1 - sw });
    set(hp, { y: (1 - sw) * 1100 + wobble(t, 0.5, 4), r: -2, o: sw > 0 ? 1 : 0 });
    updNotes(NT, t, 230, t > K.cantala ? 1 : 0);
    set(shh, { s: pop(t, K.dentro - 0.05, 0.3), r: -12, o: t < K.dentro - 0.05 ? 0 : 1 });
    popA(ch, t, K.dentro + 0.1, { r: -4 });
  }, { clip: true });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, #F4CFDA 0 30px, #F9E3EA 30px 60px)` });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,.45), rgba(120,40,60,.25) 85%)' });
  const sign = box(c, 120, 560, 840, 470, { zIndex: 10 });
  sign.innerHTML = `<svg width="840" height="470" style="overflow:visible">${cut('<rect x="0" y="0" width="840" height="460" rx="30"/>')}<rect x="0" y="0" width="840" height="460" rx="30" fill="${YEL}" stroke="${INK}" stroke-width="8"/><rect x="22" y="22" width="796" height="416" rx="18" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="10 8"/></svg>`;
  el('div', sign, { left: '0', top: '60px', width: '840px', textAlign: 'center', fontFamily: 'Rye', fontSize: '120px', lineHeight: '150px', color: INK }, '¡HAZ LA<br>PRUEBA!');
  const pt = handBox(c, 420, 1010, 240, 180, 30);
  const hp = box(c, 230, 520, 620, 680, { zIndex: 8 }); hp.innerHTML = headProfileSvg();
  const NT = riseNotes(hp, 5, 330, 300, 230, 7, { sz: 70, col: [INK, RED, '#5b8bd6'], z: 3 });
  const shh = box(c, 120, 690, 200, 200, { zIndex: 20 }); shh.innerHTML = `<svg viewBox="-60 -70 120 120" width="200" height="200" style="overflow:visible">${gloveHand(0, 0, -90, 1.15)}</svg>`;
  const ch = chip(c, 300, 1220, 'sin hacer ruido 🤫', { size: 54, bg: INK, color: YEL, z: 30 });
}

/* ======================================================================
   B2 · «CON ESTA LETRA: BUENOS DÍAS A TI» — la letra se escribe en la partitura
   ====================================================================== */
headline(S.B2[0], K.buenos - 0.1, 'Con esta *letra:*', { size: 110, hlT: K.letra });
{
  const TW = [];
  const c = scene(S.B2[0], S.B2[1], t => {
    set(sc.wrap, { y: (1 - p(t, S.B2[0], 0.4, E.outBack)) * 900, r: -2 + wobble(t, 0.4, 0.6), s: 1 + 0.05 * p(t, S.B2[0], S.B2[1] - S.B2[0], E.linear) });
    TW.forEach(q => set(q.e, { s: t < q.t - 0.04 ? 0 : lerp(1.6, 1, p(t, q.t - 0.04, 0.22, E.outBack)), r: q.r, o: t < q.t - 0.04 ? 0 : 1 }));
    const kq = clamp((t - K.buenos + 0.3) / (K.L1e - K.buenos + 0.3));
    set(quill, { x: lerp(60, 640, kq) + Math.sin(t * 18) * 6, y: -150 + Math.cos(t * 18) * 5, r: 18 + Math.sin(t * 9) * 4, o: t > K.letra - 0.1 && t < K.L1e + 0.15 ? 1 : 0 });
    set(sm.d, { s: pop(t, S.B2[0] + 0.2, 0.4), y: wobble(t, 0.6, 3) });
    face(sm, t, { look: [8, -6], jaw: t > K.buenos && t < K.L1e ? 0.3 + 0.25 * Math.sin(t * 13) : 0, seed: 3, bL: t > K.buenos ? 8 : 2, bR: t > K.buenos ? 8 : 2 });
    popA(ch, t, K.ti + 0.1, { r: 4 });
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const sc = scoreSheet(c, 90, 470, 900, 620, { seed: 19, top: 330 });
  const l1 = el('div', sc.inner, { left: '0', top: '40px', width: '882px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '120px', lineHeight: '130px', color: INK, whiteSpace: 'nowrap', zIndex: 5 });
  const l2 = el('div', sc.inner, { left: '0', top: '170px', width: '882px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '120px', lineHeight: '130px', color: INK, whiteSpace: 'nowrap', zIndex: 5 });
  [['«Buenos', l1, -3], ['días', l1, 2], ['a', l2, -2], [hlSpan('ti»', 'tih', PINK), l2, 3]].forEach((q, k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.innerHTML = q[0]; q[1].appendChild(s); TW.push({ e: s, t: W[K.ib + k].s, r: q[2] }); });
  l2.querySelector('.tih').style.transform = 'scaleX(1) rotate(-1.2deg)';
  const quill = box(sc.inner, 0, 0, 120, 240, { zIndex: 8 });
  quill.innerHTML = `<svg viewBox="0 0 120 240" width="120" height="240" style="overflow:visible">${cut('<path d="M60,236 L52,150 C10,110 20,30 100,4 C96,60 90,120 68,150 Z"/>', 4, 6)}<path d="M60,236 L52,150 C10,110 20,30 100,4 C96,60 90,120 68,150 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/><path d="M60,232 C64,150 80,70 98,8" stroke="${INK}" stroke-width="3" fill="none"/></svg>`;
  const sm = mkB(c, [620, 1010, 300, 383], kidInner(90, true, '#a87d8f') + PARTYHAT(YEL)); sm.d.style.zIndex = 9;
  const ch = chip(c, 140, 1140, 'misma melodía ♪', { size: 54, bg: PINK, z: 30 });
}

/* ======================================================================
   KAR · HUECO DE 2,6 s: KARAOKE — 6 notas (Sol Sol La Sol Do Si) + bolita que salta sílaba a sílaba
          (sincronizada con la caja de música de caja_musica.py) → «¿Encaja, eh?» ✔
   ====================================================================== */
headline(S.KAR[0], K.L2 - 0.06, '♪ ¡Ahora *tú!* ♪', { size: 120, hlT: S.KAR[0] + 0.05 });
headline(K.L2 - 0.06, S.KAR[1], '*¿Encaja,* eh?', { size: 120, hlT: K.L2 + 0.05 });
{
  const NX = [150, 290, 420, 560, 700, 850];          // x de cada nota/sílaba
  const STEP = { G: 0, A: 1, B: 2, C: 3 };              // escalones en el pentagrama (Sol, La, Si, Do)
  const PITCH = ['G', 'G', 'A', 'G', 'C', 'B'];
  const SYL = ['Bue-', 'nos', 'dí-', 'as', 'a', 'ti'];
  const Y0 = 360, LS = 30;                               // Sol en la 2.ª línea; cada escalón = media línea
  const ny = k => Y0 - STEP[PITCH[k]] * LS / 2 - 4 * LS / 2 + 30;
  const c = scene(S.KAR[0], S.KAR[1], t => {
    set(paper.wrap, { s: lerp(1.08, 1, p(t, S.KAR[0], 0.3, E.outCubic)), r: -1.5 + wobble(t, 0.4, 0.4) });
    // nota activa = la última que ha sonado
    let a = -1; NOTE_T.forEach((s, k) => { if (t >= s - 0.01) a = k; });
    HEAD.forEach((h, k) => { const on = k === a && t < MEL.caja_hasta; const hit = k <= a ? pop(t, NOTE_T[k], 0.25) : 0; set(h.e, { s: k <= a ? 0.85 + 0.25 * hit : 0.85, o: 1 }); h.fill.setAttribute('fill', on ? YEL : (k <= a ? PINK : INK)); });
    SY.forEach((s, k) => { const on = k === a && t < MEL.caja_hasta + 0.3; set(s, { s: on ? 1.22 : 1, y: on ? -8 : 0, o: 1 }); s.style.color = on ? RED : (k < a ? '#7a6a58' : INK); });
    // bolita: salta de sílaba en sílaba; cae justo en el ataque de cada nota
    let bx, by;
    if (t < NOTE_T[0]) { const k = p(t, S.KAR[0], NOTE_T[0] - S.KAR[0], E.linear); bx = lerp(20, NX[0], k); by = lerp(320, 0, k) - Math.sin(k * Math.PI) * 120; }
    else {
      let k = 0; while (k < 5 && t >= NOTE_T[k + 1]) k++;
      if (k < 5) { const u = clamp((t - NOTE_T[k]) / (NOTE_T[k + 1] - NOTE_T[k])); bx = lerp(NX[k], NX[k + 1], u); by = -Math.sin(u * Math.PI) * (60 + 140 * (NOTE_T[k + 1] - NOTE_T[k])); }
      else { const u = clamp((t - NOTE_T[5]) / 0.5); bx = NX[5]; by = -Math.abs(Math.sin(u * Math.PI * 2)) * 30 * (1 - u); }
    }
    const land = NOTE_T.some(s => t >= s && t < s + 0.07);
    set(ball, { x: bx - 32, y: by, sx: land ? 1.25 : 1, sy: land ? 0.75 : 1, o: t < S.KAR[0] + 0.02 ? 0 : 1 });
    // el Vecino escucha con la mano en la oreja (y pone cara de «mmm» al final)
    set(vec.d, { y: wobble(t, 0.5, 3), s: 1 });
    vecFace(vec, t, { jaw: talkW(t, 'VECINO') * 0.9, look: t < K.L2 ? [-6, -4] : [0, 0], closed: t > NOTE_T[0] && t < K.L2 - 0.1, bL: t < K.L2 ? 10 : 4, bR: t < K.L2 ? 10 : 14, noCup: true, noFan: true, seed: 2 });
    set(ear, { s: pop(t, S.KAR[0] + 0.05, 0.3), r: -20 + Math.sin(t * 5) * 4, o: 1 });
    MN.forEach((m, i) => { const t0 = NOTE_T[i] || 99; const k = clamp((t - t0) / 0.9); set(m, { x: -k * 90 - i * 6, y: -k * 160, r: -20 + k * 40, s: k > 0 ? 1 - 0.3 * k : 0, o: k > 0 && k < 1 ? 1 - k * 0.7 : 0 }); });
    // «¿Encaja, eh?» → sello verde ENCAJA
    stampA(ok, t, K.L2 + 0.05, -8, 1);
    set(chk, { s: t < K.eh ? 0 : lerp(1.8, 1, p(t, K.eh, 0.18)), r: -6, o: t < K.eh ? 0 : 1 });
    set(chipA, { s: pop(t, S.KAR[0] + 0.15, 0.35), r: -3, o: t < K.L2 ? 1 : 1 - p(t, K.L2, 0.15) });
  }, { clip: true });
  sceneBg(c, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.10) 0 3px, transparent 3px 58px)' });
  rays(c, -200, 300, 1480, 26, 'rgba(255,230,0,.16)', 'rgba(0,0,0,0)', 0);
  const paper = paperPiece(c, 40, 420, 1000, 560, { seed: 27, bg: '#FBF6EA' }); paper.wrap.style.zIndex = 4;
  let st = ''; for (let k = 0; k < 5; k++) st += `<path d="M30,${Y0 - k * LS} H952" stroke="${INK}" stroke-width="3.2" opacity=".85"/>`;
  const yy = Y0 - 4 * LS;
  st += `<path d="M62,${yy + 112} C40,${yy + 96} 56,${yy + 70} 74,${yy + 82} C92,${yy + 98} 72,${yy + 128} 48,${yy + 114} C26,${yy + 96} 42,${yy + 54} 68,${yy + 30} C84,${yy + 14} 78,${yy - 12} 66,${yy - 2} C54,${yy + 10} 62,${yy + 70} 70,${yy + 146} C72,${yy + 166} 50,${yy + 166} 52,${yy + 150}" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  st += `<text x="104" y="${Y0 - 30}" font-family="Playfair" font-weight="900" font-size="64" fill="${INK}">3</text><text x="104" y="${Y0 + 6}" font-family="Playfair" font-weight="900" font-size="64" fill="${INK}">4</text>`;
  const stf = box(paper.inner, 0, 0, 982, 542); stf.innerHTML = `<svg width="982" height="542" style="overflow:visible">${st}</svg>`;
  const HEAD = PITCH.map((pc, k) => {
    const cy = ny(k), x = NX[k] + 40;
    const e = box(paper.inner, x - 40, cy - 150, 80, 180, { zIndex: 6, transformOrigin: '40px 150px' });
    const long = k === 5, dotted = k === 0;
    e.innerHTML = `<svg width="80" height="180" style="overflow:visible"><ellipse class="nf" cx="40" cy="150" rx="${long ? 26 : 24}" ry="18" transform="rotate(-20 40 150)" fill="${INK}" stroke="${INK}" stroke-width="5"/>${long ? `<ellipse cx="40" cy="150" rx="12" ry="7" transform="rotate(-20 40 150)" fill="#FBF6EA"/>` : ''}<path d="M62,146 V30" stroke="${INK}" stroke-width="5"/>${k === 1 ? `<path d="M62,30 q30,24 18,60 M62,52 q30,24 18,60" stroke="${INK}" stroke-width="6" fill="none"/>` : ''}${dotted ? `<path d="M62,30 q30,24 18,60" stroke="${INK}" stroke-width="6" fill="none"/><circle cx="84" cy="146" r="7" fill="${INK}"/>` : ''}</svg>`;
    return { e, fill: e.querySelector('.nf') };
  });
  // líneas adicionales para el Do agudo
  const SY = SYL.map((s, k) => el('div', paper.inner, { left: px(NX[k] - 30), top: '400px', width: '140px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '70px', color: INK, whiteSpace: 'nowrap', zIndex: 7, transformOrigin: '70px 40px' }, s));
  const ball = box(paper.inner, 0, 330, 64, 64, { zIndex: 9, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, #fff 0 12%, ${PINK} 14% 70%, #c21f7a 100%)`, border: `5px solid ${INK}`, boxShadow: `4px 6px 0 ${SH}` });
  const vec = mkVec(c, [-30, 980, 420, 520]); vec.d.style.zIndex = 12;
  const ear = handBox(c, 250, 1000, 170, 200, 14);
  const MN = [0, 1, 2, 3, 4, 5].map(i => noteBox(c, 330, 1060, 70, i % 2, [RED, INK, '#5b8bd6'][i % 3], 13));
  const chipA = chip(c, 470, 1080, '♪ canta por dentro ♪', { size: 50, bg: INK, color: YEL, z: 30 });
  const ok = stamp(c, 440, 1050, '¡ENCAJA!', { size: 110, bw: 14, z: 60, col: '#2f7a46', bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const chk = box(c, 820, 900, 170, 170, { zIndex: 61 }); chk.innerHTML = `<svg viewBox="0 0 100 100" width="170" height="170" style="overflow:visible"><circle cx="52" cy="54" r="46" fill="${SH}"/><circle cx="50" cy="50" r="46" fill="#7ac08a" stroke="${INK}" stroke-width="5"/><path d="M26,52 L44,70 L76,32" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
}

/* ======================================================================
   R2 · «TE HE OÍDO... Y DESAFINAS UN POQUITO» — el Vecino con trompetilla
   ====================================================================== */
headline(S.R2[0], K.desaf - 0.08, 'Te he *oído*…', { size: 120, hlT: K.oido });
headline(K.desaf - 0.08, S.R2[1], '…y *desafinas* un poquito', { size: 92, hlT: K.desaf, hlc: '#ff9aa8' });
{
  const c = scene(S.R2[0], S.R2[1], t => {
    const kz = p(t, K.desaf - 0.1, 0.3, E.inOutCubic);
    set(cam, { s: 1 + 0.03 * p(t, S.R2[0], 3, E.linear) + 0.08 * kz, x: -kz * 40 });
    set(vec.d, { y: wobble(t, 0.5, 3) + (1 - p(t, S.R2[0], 0.35, E.outBack)) * 600 });
    const wince = t > K.desaf;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: wince ? [-6, 4] : [-8, -2], bL: wince ? 4 : 12, bR: wince ? 20 : 12, half: wince, noCup: true, fan: wince ? Math.sin(t * 22) * 16 : wobble(t, 0.8, 5), seed: 1 });
    set(tr, { x: (1 - p(t, S.R2[0] + 0.1, 0.35, E.outBack)) * 700, r: -6 + Math.sin(t * 4) * 3, o: 1 });
    // ondas de sonido que llegan a la trompetilla
    WV.forEach((wv, i) => { const ph = (t * 1.6 + i / 3) % 1; set(wv, { x: -ph * -220, s: 0.6 + ph * 0.6, o: t < K.oido ? 0 : (1 - ph) }); });
    // notas desafinadas: entran torcidas, vibran y se quiebran
    BN.forEach((b, i) => { const t0 = K.desaf + i * 0.12; const k = clamp((t - t0) / 1.0); set(b, { x: -k * 260 - i * 30, y: -80 * Math.sin(k * 3) + i * 40, r: Math.sin(t * 30 + i) * 22, s: pop(t, t0, 0.3), o: t < t0 ? 0 : 1 }); });
    set(cr, { s: pop(t, K.desaf + 0.05, 0.3), r: -10, o: t < K.desaf ? 0 : 1 });
    popA(pq, t, K.poquito, { r: -5 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '600px 900px' });
  sceneBg(cam, { background: `repeating-linear-gradient(90deg, #F4CFDA 0 30px, #F9E3EA 30px 60px)` });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,.45), rgba(120,40,60,.28) 85%)' });
  const vec = mkVec(cam, [80, 470, 600, 743]); vec.d.style.zIndex = 5;
  const tr = box(cam, 560, 640, 420, 280, { zIndex: 8 }); tr.innerHTML = trumpetSvg();
  const WV = [0, 1, 2].map(i => { const d = box(cam, 980, 690, 80, 180, { zIndex: 7 }); d.innerHTML = `<svg width="80" height="180" style="overflow:visible"><path d="M60,10 Q10,90 60,170" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/></svg>`; return d; });
  const BN = [0, 1, 2].map(i => { const d = box(cam, 880, 560, 110, 138, { zIndex: 9 }); d.innerHTML = noteSvg(i % 2, [RED, '#5b8bd6', INK][i]); return d; });
  const cr = el('div', cam, { left: '760px', top: '470px', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '110px', color: RED, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 #fff`, zIndex: 12 }, '¡ay!');
  const pq = chip(cam, 520, 1210, 'un poquito 🤏', { size: 60, bg: INK, color: YEL, z: 30 });
}

/* ======================================================================
   C2 · «ASÍ NACIÓ: DOS HERMANAS DE ESTADOS UNIDOS LA COMPUSIERON»
   ====================================================================== */
headline(S.C2[0], K.dosH - 0.1, 'Porque así *nació:*', { size: 100, hlT: K.nacio });
headline(K.dosH - 0.1, S.C2[1], 'Dos *hermanas* de Estados Unidos', { size: 78, hlT: K.hermanas });
{
  const c = scene(S.C2[0], S.C2[1], t => {
    FR.forEach((f, i) => { const t0 = S.C2[0] + 0.05 + i * 0.15; set(f.w, { s: pop(t, t0, 0.45), r: [-4, 4][i] + wobble(t, 0.5, 1, i), y: wobble(t, 0.6, 4, i), o: t < t0 ? 0 : 1 }); face(f.f, t, { look: [[8, 0], [-8, 0]][i], seed: i * 1.3, jaw: t > K.compus && t < K.compus + 0.5 ? 0.3 : 0 }); });
    popA(ch1, t, K.dosH, { r: -4 });
    popA(ch2, t, K.eeuu, { r: 4 });
    set(sc.wrap, { s: pop(t, K.compus - 0.15, 0.4), r: 3 + wobble(t, 0.4, 0.6), o: t < K.compus - 0.15 ? 0 : 1 });
    const kq = clamp((t - K.compus) / 0.9);
    sc.notes.forEach((g, i) => { g.style.opacity = i / sc.notes.length < kq ? 1 : 0; });
    set(quill, { x: kq * 220 + Math.sin(t * 18) * 5, y: Math.cos(t * 18) * 4, r: 18, o: t > K.compus - 0.1 && kq < 1 ? 1 : 0 });
    ST.forEach((s, i) => set(s, { s: pop(t, K.eeuu + 0.1 + i * 0.08, 0.3), r: t * 90 + i * 30, o: t < K.eeuu + 0.1 + i * 0.08 ? 0 : 1 }));
    set(bb, { s: pop(t, K.nacio, 0.4), r: Math.sin(t * 4) * 8, o: t < K.nacio ? 0 : (t > K.dosH ? 1 - p(t, K.dosH, 0.2) : 1) });
  });
  sceneBg(c, { background: '#EFE1C6' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const FR = [[90, 470, '#5a3a24', '#3f5a72'], [610, 470, '#2f241c', '#7a3f4a']].map(([x, y, hair, dress], i) => {
    const w = box(c, x, y, 380, 500, { zIndex: 5 });
    box(w, 0, 0, 380, 500, { background: BRASS, border: `6px solid ${INK}`, borderRadius: '50%', boxShadow: `9px 11px 0 ${SH}` });
    const inn = box(w, 22, 22, 336, 456, { borderRadius: '50%', overflow: 'hidden', background: `repeating-linear-gradient(90deg, #F4CFDA 0 16px, #F9E3EA 16px 32px)`, border: `4px solid ${INK}` });
    const f = mkB(inn, [-10, 40, 356, 455], ladyInner(80 + i, hair, dress, { specs: i === 1 }));
    return { w, f };
  });
  const sc = scoreSheet(c, 410, 820, 260, 300, { seed: 41, top: 70, tsz: 30 }); sc.wrap.style.zIndex = 8;
  const quill = box(sc.inner, 0, -90, 80, 160, { zIndex: 9 });
  quill.innerHTML = `<svg viewBox="0 0 120 240" width="80" height="160" style="overflow:visible"><path d="M60,236 L52,150 C10,110 20,30 100,4 C96,60 90,120 68,150 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="5"/><path d="M60,232 C64,150 80,70 98,8" stroke="${INK}" stroke-width="3" fill="none"/></svg>`;
  const ch1 = chip(c, 380, 1000 + 170, 'dos hermanas', { size: 58, bg: PINK, z: 30 });
  const ch2 = chip(c, 560, 1080 + 170, 'de EE. UU. ★', { size: 54, bg: INK, color: '#fff', z: 30 });
  const ST = [[470, 420], [500, 1180], [960, 900]].map(([x, y]) => el('div', c, { left: px(x), top: px(y), fontSize: '64px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 31 }, '★'));
  const bb = box(c, 460, 640, 160, 200, { zIndex: 9 }); bb.innerHTML = noteSvg(0, RED);
}

/* ======================================================================
   C3 · «PARA DAR LOS BUENOS DÍAS EN CLASE» — pizarra + niños cantando
   ====================================================================== */
headline(S.C3[0], S.C3[1], 'Para dar los *buenos días* en clase', { size: 80, hlT: K.buenos3 });
{
  const c = scene(S.C3[0], S.C3[1], t => {
    set(sc.wrap, { s: pop(t, S.C3[0] + 0.05, 0.4), r: -2 + wobble(t, 0.4, 0.6), o: 1 });
    popA(t1, t, K.buenos3 - 0.05, { rise: 20 });
    T2.forEach((f, i) => { set(f.d, { y: wobble(t, 0.6, 3, i), r: [4, -4][i] }); face(f, t, { look: [[10, 2], [-10, 2]][i], seed: i + 3, jaw: t > K.buenos3 ? 0.3 + 0.2 * Math.sin(t * 12 + i) : 0 }); });
    KD.forEach((f, i) => { const t0 = S.C3[0] + 0.1 + i * 0.1; set(f.d, { s: pop(t, t0, 0.4), y: (t > K.buenos3 ? -Math.abs(Math.sin(t * 6 + i)) * 12 : 0), o: t < t0 ? 0 : 1 }); face(f, t, { jaw: t > K.buenos3 ? 0.35 + 0.25 * Math.sin(t * 13 + i * 2) : 0, look: [0, -4], seed: i * 0.7 }); });
    updNotes(NT, t, 360, t > K.buenos3 ? 1 : 0);
    popA(cl, t, K.clase, { r: -4 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  chalkboard(c, 40, 430, 1000, 520, 1);
  const sc = scoreSheet(c, 270, 460, 540, 440, { seed: 23, top: 170, tsz: 52 }); sc.wrap.style.zIndex = 3;
  const t1 = sc.T('«Buenos días a ti»', { top: '40px', fontSize: '54px' });
  const T2 = [mkB(c, [30, 560, 260, 332], ladyInner(80, '#5a3a24', '#3f5a72')), mkB(c, [790, 560, 240, 307], ladyInner(81, '#2f241c', '#7a3f4a', { specs: true }))];
  T2.forEach(f => f.d.style.zIndex = 4);
  const KD = [[400, 930, false, '#7d8fa8'], [580, 920, true, '#a87d8f'], [760, 930, false, '#8fa87d']].map(([x, y, g, col], i) => { const f = mkB(c, [x, y, 200, 256], kidInner(90 + i, g, col)); f.d.style.zIndex = 6; return f; });
  box(c, 380, 1150, 620, 60, { zIndex: 8, background: WOOD, border: `5px solid ${INK}`, borderRadius: '10px', boxShadow: `6px 8px 0 ${SH}`, backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.18) 0 2px, transparent 2px 12px)' });
  const NT = riseNotes(c, 6, 680, 960, 420, 31, { sz: 70, col: [INK, RED, '#5b8bd6'], z: 7 });
  const cl = chip(c, 600, 1240, 'canción de clase', { size: 46, bg: PINK, z: 30 });
}

/* ======================================================================
   D1 · «LUEGO ALGUIEN LE PUSO LA LETRA DEL CUMPLEAÑOS…»
   ====================================================================== */
headline(S.D1[0], K.letra4 - 0.1, 'Luego *alguien*…', { size: 112, hlT: K.alguien });
headline(K.letra4 - 0.1, S.D1[1], '…le puso la letra del *cumpleaños*', { size: 80, hlT: K.cumple4 });
{
  const c = scene(S.D1[0], S.D1[1], t => {
    set(sc.wrap, { y: (1 - p(t, S.D1[0], 0.35, E.outBack)) * 900, r: 2 + wobble(t, 0.4, 0.6) });
    const ks = p(t, K.letra4, 0.35, E.inOutCubic);
    strike.style.transform = `scaleX(${f1(ks * 1000) / 1000})`;
    set(old, { o: 1 - 0.55 * p(t, K.cumple4, 0.3), y: p(t, K.cumple4, 0.3) * 20, s: 1 - 0.1 * p(t, K.cumple4, 0.3) });
    set(neu, { s: t < K.cumple4 ? 0 : lerp(1.7, 1, p(t, K.cumple4, 0.2, E.outCubic)), r: -4, o: t < K.cumple4 ? 0 : 1 });
    paint(nHL, t, K.cumple4 + 0.15, 0.35);
    // «alguien»: silueta anónima con interrogación
    set(an.d, { s: pop(t, K.alguien - 0.05, 0.4), y: wobble(t, 0.6, 3), r: 4, o: t < K.alguien - 0.05 ? 0 : 1 });
    set(qq, { s: pop(t, K.alguien + 0.15, 0.3) * (1 + 0.1 * Math.sin(t * 6)), r: Math.sin(t * 4) * 10, o: t < K.alguien + 0.15 ? 0 : 1 });
    popA(anc, t, K.alguien + 0.25, { r: -4 });
    set(pen, { x: lerp(-200, 0, p(t, K.puso, 0.3, E.outBack)) + Math.sin(t * 16) * 6, y: Math.cos(t * 16) * 4, r: -20, o: t < K.puso ? 0 : (t > K.cumple4 + 0.4 ? 0 : 1) });
    PP.forEach((f, i) => { const t0 = K.cumple4 + 0.2 + i * 0.12; set(f.d, { s: pop(t, t0, 0.45), y: wobble(t, 0.6, 3, i) - Math.abs(Math.sin(t * 7 + i)) * 12, o: t < t0 ? 0 : 1, r: [6, -4][i] }); face(f, t, { jaw: 0.35 + 0.25 * Math.sin(t * 12 + i), look: [-8, -4], closed: true, seed: i }); });
    updNotes(NT, t, 380, t > K.cumple4 ? 1 : 0);
    set(cf.d, { y: (1 - p(t, K.cumple4 + 0.3, 0.35, E.outBack)) * 700, o: t < K.cumple4 + 0.3 ? 0 : 1 }); flick(cf, t);
  });
  sceneBg(c, { background: '#EFE1C6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const sc = scoreSheet(c, 360, 440, 620, 560, { seed: 29, top: 240 });
  const old = el('div', sc.inner, { left: '0', top: '126px', width: '602px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '54px', color: INK, whiteSpace: 'nowrap', zIndex: 5 });
  old.innerHTML = `<span style="position:relative;display:inline-block">«Buenos días a ti»<span class="stk" style="position:absolute;left:-10px;right:-10px;top:52%;height:12px;background:${RED};border-radius:6px;transform-origin:left center;transform:scaleX(0)"></span></span>`;
  const strike = old.querySelector('.stk');
  const neu = el('div', sc.inner, { left: '0', top: '22px', width: '602px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '70px', color: INK, whiteSpace: 'nowrap', zIndex: 6 }, hlSpan('«Cumpleaños feliz»', 'nhl', PINK));
  const nHL = neu.querySelector('.nhl');
  const an = mkB(c, [40, 470, 330, 422], bustInner({ uniform: 'soldier', seed: 72 }) + coatOver('#3a2f26')); an.d.style.filter = SIL; an.d.style.zIndex = 8;
  const qq = el('div', c, { left: '160px', top: '480px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '170px', color: YEL, textShadow: `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`, zIndex: 9 }, '?');
  const anc = chip(c, 70, 880, 'autor: ¿?', { size: 50, bg: INK, color: YEL, z: 30 });
  const pen = box(sc.inner, 380, 40, 90, 180, { zIndex: 9 });
  pen.innerHTML = `<svg viewBox="0 0 120 240" width="90" height="180" style="overflow:visible"><path d="M60,236 L52,150 C10,110 20,30 100,4 C96,60 90,120 68,150 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="5"/><path d="M60,232 C64,150 80,70 98,8" stroke="${INK}" stroke-width="3" fill="none"/></svg>`;
  const PP = [mkB(c, [420, 900, 260, 332], kidInner(95, true, '#a87d8f') + PARTYHAT(YEL)), mkB(c, [700, 920, 260, 332], bustInner({ uniform: 'soldier', moustache: true, seed: 73 }) + coatOver('#3a2f26') + PARTYHAT(PINK))];
  PP.forEach(f => f.d.style.zIndex = 8);
  const NT = riseNotes(c, 5, 680, 940, 420, 41, { sz: 74, col: [INK, RED, '#5b8bd6'], z: 9 });
  const cf = mkCake(c, [560, 1040, 220, 235]); cf.d.style.zIndex = 10;
}

/* ======================================================================
   D2 · «…Y UNA EMPRESA DIJO QUE ERA SUYA» — señor del maletín + sello DUEÑO
   ====================================================================== */
headline(S.D2[0], S.D2[1], 'Una *empresa* dijo que era suya', { size: 80, hlT: K.empresa });
{
  const c = scene(S.D2[0], S.D2[1], t => {
    set(sc.wrap, { r: -3 + wobble(t, 0.4, 0.6), x: -p(t, K.dijo, 0.3, E.inOutCubic) * 40 });
    const kw = p(t, S.D2[0], 0.45, E.outCubic);
    set(man.d, { x: (1 - kw) * 700, y: wobble(t, 0.6, 3) - (kw < 1 ? Math.abs(Math.sin(t * 12)) * 16 : 0) });
    face(man, t, { look: [-8, 2], half: t > K.dijo, blink: false, seed: 2, bL: 4, bR: 12, jaw: t > K.dijo && t < K.suya + 0.3 ? 0.3 + 0.2 * Math.sin(t * 14) : 0 });
    set(cs, { x: (1 - kw) * 700, r: -6 + (kw < 1 ? Math.sin(t * 12) * 6 : wobble(t, 0.6, 2)), y: wobble(t, 0.5, 3, 1) });
    popA(emp, t, K.empresa, { r: -4 });
    set(bm, { s: pop(t, K.dijo, 0.3), r: -3 + Math.sin(t * 5) * 2, o: t < K.dijo ? 0 : 1 });
    const kp = p(t, K.dijo, 0.25, E.outBack);
    set(pt, { x: (1 - kp) * 300, o: t < K.dijo ? 0 : 1, r: -90 + Math.sin(t * 8) * 4 });
    stampA(dz, t, K.suya, -10, 1);
    set(cp, { s: t < K.suya + 0.1 ? 0 : lerp(2, 1, p(t, K.suya + 0.1, 0.2, E.outCubic)), r: -12, o: t < K.suya + 0.1 ? 0 : 1 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const sc = scoreSheet(c, 70, 450, 460, 540, { seed: 33, top: 170 });
  sc.T('«Cumpleaños feliz»', { fontSize: '50px', top: '40px' });
  const man = mkB(c, [500, 470, 440, 562], suitInner(41)); man.d.style.zIndex = 6;
  const cs = box(c, 640, 960, 280, 215, { zIndex: 9 }); cs.innerHTML = caseSvg();
  const emp = chip(c, 560, 1190, 'una empresa', { size: 54, bg: INK, color: YEL, z: 30 });
  const bm = bubble(c, 470, 400, '¡Es mía!', { size: 76, it: true, z: 32, rad: '44px 44px 10px 44px' });
  const pt = handBox(c, 420, 640, 150, 0, 20);
  const dz = stamp(c, 120, 760, 'DUEÑO', { size: 140, bw: 16, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const cp = el('div', c, { left: '380px', top: '920px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '170px', lineHeight: 1, color: RED, textShadow: `5px 5px 0 ${INK}, -3px -3px 0 #fff`, zIndex: 42 }, '©');
}
