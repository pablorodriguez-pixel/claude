/* Ep. 6 · ¿Por qué la semana tiene 7 días? — escenas, óvalo del Vecino, cameo del emú, frame y sfx */
function hl(t0, t1, str, o = {}) { headline(t0, t1, str, o); const h = HLS[HLS.length - 1]; if (o.at != null) h.spans.forEach(s => s.t = o.at); return h; }
const HLY = 196;
function wordRow(parent, top, text, size, o = {}) {
  const d = el('div', parent, { left: px(o.left || 40), top: px(top), width: px(o.width || 1000), textAlign: o.align || 'center', fontFamily: o.font || 'Playfair', fontWeight: o.weight || 900, fontStyle: o.italic ? 'italic' : 'normal', fontSize: px(size), lineHeight: 1, color: o.color || INK, whiteSpace: 'nowrap', zIndex: o.z || 10, letterSpacing: o.ls || '0.01em', textShadow: o.shadow || 'none' });
  const L = [];
  [...text].forEach(ch => {
    const sp = document.createElement('span'); sp.style.display = 'inline-block'; sp.style.position = 'relative'; sp.style.zIndex = 0;
    if (ch === ' ') sp.innerHTML = '&nbsp;';
    else sp.innerHTML = `<span style="position:absolute;left:-2px;right:-2px;bottom:${o.hb || 6}%;height:${o.hh || 44}%;background:${o.hlc || YEL};z-index:-1;transform-origin:left center;transform:scaleX(0)"></span>${ch}`;
    d.appendChild(sp); L.push({ sp, hl: ch === ' ' ? null : sp.firstChild, ch });
  });
  return { d, L };
}
const fitSize = (txt, maxW, maxS, k = 0.8) => Math.min(maxS, maxW / (txt.length * k));
function lettersIn(row, t, t0, dur, o = {}) { const n = row.L.length; row.L.forEach((q, i) => { const ti = t0 + (n > 1 ? i / (n - 1) : 0) * dur; const k = p(t, ti, 0.3, E.outBack); set(q.sp, { y: (1 - k) * (o.dy || -70), s: 0.6 + 0.4 * clamp(k), r: (1 - clamp(k)) * (i % 2 ? 14 : -14), o: t < ti ? 0 : clamp(k * 2) }); }); }
function paintIdx(row, idx, t, t0, step = 0.06) { idx.forEach((i, k) => { const e = row.L[i] && row.L[i].hl; if (e) e.style.transform = `scaleX(${f1(p(t, t0 + k * step, 0.22, E.outCubic) * 1000) / 1000})`; }); }
function starsSvg(w, h, n, seed, col = '#F4ECDB') { const r = rng(seed); let s = ''; for (let i = 0; i < n; i++) { const x = r() * w, y = r() * h, z = 2 + r() * 5; s += `<path d="M${f1(x)},${f1(y - z * 2)} L${f1(x + z * 0.5)},${f1(y - z * 0.5)} L${f1(x + z * 2)},${f1(y)} L${f1(x + z * 0.5)},${f1(y + z * 0.5)} L${f1(x)},${f1(y + z * 2)} L${f1(x - z * 0.5)},${f1(y + z * 0.5)} L${f1(x - z * 2)},${f1(y)} L${f1(x - z * 0.5)},${f1(y - z * 0.5)} Z" fill="${col}" opacity="${f1(0.5 + r() * 0.5)}"/>`; } return s; }
function nightPanel(parent, x, y, w, h, seed = 11) {
  const pp = paperPiece(parent, x, y, w, h, { seed, bg: NIGHT, plain: true });
  box(pp.inner, 0, 0, w - 18, h - 18, { background: 'radial-gradient(circle at 50% 30%, rgba(120,100,170,.35), rgba(0,0,0,0) 70%)' });
  box(pp.inner, 0, 0, w - 18, h - 18, { backgroundImage: 'repeating-linear-gradient(38deg, rgba(255,255,255,.04) 0 2px, transparent 2px 7px)' });
  return pp;
}
function avatarAstro(parent, x, y, sz, kind) { const d = box(parent, x, y, sz, sz, { borderRadius: '50%', overflow: 'hidden', background: '#F7F0E0', border: `4px solid ${INK}`, boxShadow: `4px 4px 0 ${SH}`, zIndex: 5 }); const a = mkAstro(d, -sz * 0.12, -sz * 0.06, sz * 1.24, kind); return { d, a }; }
const VT = who => talkW(who, 'VECINO');

/* =================== EL VECINO en su óvalo =================== */
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
const OVM = { n: [0, 0, 1, 0], c: [-41, 45, 0.75, 0], big: [300, -230, 1.12, -3], end: [335, -585, 0.95, 0] };
const OVS = [[11.05, 15.75, 'n'], [23.12, 36.08, 'c'], [36.08, 51.2, 'c'], [51.2, 52.3, 'big'], [52.3, 61.12, 'c'], [63.22, 65.35, 'c'], [76.25, 999, 'end']];
function ovalState(t) {
  const i = OVS.findIndex(s => t >= s[0] && t < s[1]); if (i < 0) return null;
  const s = OVS[i], m = OVM[s[2]], prev = i > 0 && Math.abs(OVS[i - 1][1] - s[0]) < 0.01 ? OVM[OVS[i - 1][2]] : null;
  const next = OVS[i + 1] && Math.abs(OVS[i + 1][0] - s[1]) < 0.01;
  let x = m[0], y = m[1], sc = m[2], r = m[3];
  if (prev) { const k = p(t, s[0], 0.35, E.inOutCubic); x = lerp(prev[0], m[0], k); y = lerp(prev[1], m[1], k); sc = lerp(prev[2], m[2], k); r = lerp(prev[3], m[3], k); }
  else sc *= lerp(0.55, 1, p(t, s[0], 0.4, E.outBack));
  if (!next) sc *= 1 - 0.9 * p(t, s[1] - 0.15, 0.15, E.inCubic);
  return [x, y, sc, r];
}
const LAUGH = [[60.74, 61.12]];
const FANFAST = [[52.7, 53.6], [64.15, 64.9]];
function updOval(t, lookOn) {
  const st = ovalState(t);
  if (!st || lookOn) { ovalW.style.visibility = 'hidden'; return; }
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st[0], y: st[1] + shk + wobble(t, 0.5, 2), s: st[2], r: st[3] + (inL ? Math.sin(t * 20) * 2 : 0), o: 1 });
  const o = { jaw: VT(t), look: [5, -3], bL: 2, bR: 4, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (t < 15.75) o.look = [2, -6];
  if (t > 51.2 && t < 52.3) { o.bL = 14; o.bR = 16; o.look = [0, 0]; }
  if (FANFAST.some(f => t > f[0] && t < f[1])) { o.fan = Math.sin(t * 26) * 22 - 10; o.bL = 14; o.bR = 14; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  if (t > 76.25) { o.look = [0, 0]; o.bR = Math.sin(t * 3) > 0.6 ? 10 : 0; }
  vecFace(vecO, t, o);
}

/* =================== CAMEO: el emú mira a cámara (bostezo) =================== */
const LOOKS = [[40.98, 0.72, 'yawn']];
const lookW = box(world, 0, 0, 1080, 1920, { zIndex: 800, overflow: 'hidden' });
sceneBg(lookW, { background: PAPER });
box(lookW, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 42%, rgba(255,240,200,.0) 25%, rgba(60,35,10,.55) 80%)', zIndex: 5 });
const lookCam = box(lookW, 0, 0, 1080, 1920, { zIndex: 2, transformOrigin: '540px 560px' });
const lookProf = mkEmu(lookCam, [70, 250, 1300, 1950], { seed: 91 });
const lookFront = mkEmuF(lookCam, [140, 300, 800, 1200]);
const lookTag = el('div', lookW, { left: '70px', top: '1210px', fontFamily: 'SpecialElite', fontSize: '34px', color: PAPER, background: INK, padding: '6px 18px', zIndex: 6, whiteSpace: 'nowrap' }, '● REC');
const lookZz = el('div', lookCam, { left: '600px', top: '330px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '90px', color: INK, zIndex: 3, whiteSpace: 'nowrap' }, 'aaaaah…');
function updLook(t) {
  let cur = null; LOOKS.forEach(L => { if (t >= L[0] && t < L[0] + L[1]) cur = L; });
  lookW.style.display = cur ? '' : 'none'; if (!cur) return false;
  const k = t - cur[0], turn = clamp((k - 0.1) / 0.14);
  set(lookProf.d, { sx: Math.max(0.001, 1 - turn * 2), o: turn < 0.5 ? 1 : 0 });
  set(lookFront.d, { sx: Math.max(0.001, (turn - 0.5) * 2), o: turn >= 0.5 ? 1 : 0 });
  face(lookProf, t, { half: true, look: [-2, 1], blink: false });
  const yawn = Math.sin(clamp((k - 0.28) / 0.42) * Math.PI);
  face(lookFront, t, { half: yawn < 0.4, closed: yawn > 0.4, blink: false, bR: k > 0.3 ? 22 * p(t, cur[0] + 0.3, 0.12, E.outBack) : 0, bL: yawn * 10, jaw: yawn * 1.6 });
  set(lookCam, { s: 1 + 0.12 * p(t, cur[0] + 0.24, 0.45, E.outCubic) });
  lookZz.style.visibility = yawn > 0.3 ? 'visible' : 'hidden'; set(lookZz, { y: -yawn * 30, s: 0.8 + yawn * 0.3 });
  lookTag.style.opacity = Math.sin(t * 9) > 0 ? 1 : 0.4;
  return true;
}

/* ======================================================================
   A · GANCHO (0 – 3.75)  L0
   ====================================================================== */
hl(-1, 1.88, '¿Por qué la semana tiene *7 días*?', { size: 96, y: 180, at: -0.3, hlT: 1.28 });
hl(1.88, 3.29, 'No hay nada *natural* en eso', { size: 92, y: 190, hlT: 2.38 });
hl(3.29, 3.78, 'Es por los *planetas*', { size: 100, y: 200, hlT: 3.72 });
{
  const A = [];
  const c = scene(-1, 3.78, t => {
    set(cam, { s: 1 + 0.05 * p(t, 0, 3.7, E.linear) });
    set(ry, { r: t * 4 });
    A.forEach((a, i) => {
      const t0 = -0.3 + i * 0.15, k = p(t, t0, 0.45, E.outBack);
      const jump = t > 3.4 ? Math.abs(Math.sin((t - 3.4 - i * 0.03) * 9)) * 50 : 0;
      set(a.d, { y: (1 - clamp(k)) * -260 - jump + wobble(t, 0.7, 4, i * 0.3), s: 0.4 + 0.6 * k, r: (1 - clamp(k)) * 30 + wobble(t, 0.5, 3, i), o: t < t0 ? 0 : 1 });
      const sh = t > 1.9 && t < 3.3;
      astroFace(a, t, { look: sh ? [i < 3 ? 6 : -6, 0] : [0, 4], brow: sh ? 8 : 0, smile: t > 3.4 || (t < 1.9 && t > t0 + 0.2), oh: t > 2.86 && t < 3.3, seed: i * 0.37 });
    });
    popA(nat, t, 2.38, { r: -4 });
    const kx = p(t, 2.86, 0.2, E.outCubic); set(xx, { s: t < 2.86 ? 0 : lerp(2, 1, kx), o: t < 2.86 ? 0 : 1, r: -6 });
    set(cal.wrap, { y: shake(t, 2.86, 0.3, 8) });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const ry = rays(cam, -420, 0, 1920, 24, 'rgba(43,33,24,.06)', 'rgba(0,0,0,0)', 0);
  const cal = mkCal(cam, 60, 720, 880, 7, { title: 'LA SEMANA', labels: ['L', 'M', 'X', 'J', 'V', 'S', 'D'], ch: 450, numSize: 110, numTop: 170 });
  WEEK.forEach((k, i) => A.push(mkAstro(cam, cal.cells[i].cx - 105, 470 + (i % 2) * 44, 210, k)));
  A.forEach((a, i) => a.d.style.zIndex = 20 + (i % 2));
  const nat = chip(cam, 300, 1170, '🌿 ¿natural?', { size: 54, bg: '#fff', color: INK, z: 40 });
  const xx = box(cam, 420, 1120, 220, 220, { zIndex: 41 }); xx.innerHTML = XSVG;
}
colorHit(3.78, 4.62, YEL, c => {
  const S = WEEK.map((k, i) => { const a = mkAstro(c, (i < 4 ? 170 + i * 220 : 320 + (i - 4) * 220) - 100, i < 4 ? 640 : 900, 200, k); a.d.style.filter = SIL; a.d.style.zIndex = 3; return a; });
  const t1 = el('div', c, { left: '0', top: '300px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '150px', lineHeight: 1, color: INK, zIndex: 4 }, '¡LOS<br>PLANETAS!');
  return t => {
    S.forEach((a, i) => set(a.d, { y: -Math.abs(Math.sin((t - 3.78) * 9 + i * 0.6)) * 50, s: pop(t, 3.78 + i * 0.03, 0.3), r: Math.sin(t * 8 + i) * 6, o: 1 }));
    set(t1, { s: lerp(1.4, 1, p(t, 3.78, 0.2)), o: 1 }); t1.style.textShadow = glitch(t, 3.78, 0.3);
  };
});

/* ======================================================================
   B · INTENTARON CAMBIARLA… FRACASÓ (4.62 – 8.15)  L1  + sello DATO REAL
   ====================================================================== */
hl(4.62, 7.0, 'Y cuando alguien intentó *cambiarla*…', { size: 84, hlT: 5.87 });
hl(7.0, 8.15, '*Fracasó*.', { size: 130, hlT: 7.04, hlc: PINK });
{
  const c = scene(4.62, 8.15, t => {
    const kf = p(t, 7.04, 0.35, E.outBack);
    set(cal.wrap, { y: kf * 40 + shake(t, 7.04, 0.4, 16), r: -kf * 5 });
    cal.cells.forEach((q, i) => { const t0 = 5.35 + i * 0.15; popA(q.e, t, t0, { d: 0.3 }); });
    const n = Math.round(counter(t, 5.35, 1.4, 7, 10, E.linear)); cnt.textContent = `${n} días`;
    set(cnt, { s: 1 + 0.15 * (t > 5.35 && t < 6.9 ? Math.abs(Math.sin(t * 12)) : 0), r: -kf * 4, o: 1, y: kf * 30 });
    const kx = p(t, 7.04, 0.22, E.outCubic); set(xx, { s: t < 7.04 ? 0 : lerp(2.2, 1, kx), o: t < 7.04 ? 0 : 1 });
    stampA(st, t, 7.4, -8);
  }, { clip: true });
  const cal = mkCal(c, 60, 470, 880, 10, { title: '¿SEMANA NUEVA?', titleSize: 48, ch: 300, numSize: 58, numTop: 110 });
  const cnt = el('div', c, { left: '0', top: '900px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: 1, color: INK, textShadow: `8px 8px 0 ${YEL}`, zIndex: 8 }, '7 días');
  const xx = box(c, 190, 400, 700, 700, { zIndex: 30 }); xx.innerHTML = XSVG;
  const st = stamp(c, 175, 1100, 'DATO REAL', { size: 130, bw: 14, z: 60, bg: 'rgba(255,255,255,.88)', blend: 'normal' });
}

/* ======================================================================
   C · MARCA: EL VECINO EN SU BALCÓN (8.15 – 11.05)  L2
   ====================================================================== */
{
  const c = scene(8.15, 11.05, t => {
    const ex = p(t, 10.85, 0.2, E.inCubic);
    set(cam, { s: lerp(1.04 + 0.04 * p(t, 8.15, 2.7, E.linear), 0.3, ex), x: ex * -330, y: ex * 380, o: 1 - ex * 0.6 });
    set(vec.d, { y: wobble(t, 0.5, 3) });
    const fanFast = t > 8.4 && t < 9.1;
    vecFace(vec, t, { jaw: VT(t), look: t > 9.4 && t < 10.2 ? [0, -5] : [0, 0], bL: fanFast ? 8 : 2, bR: fanFast ? 8 : 6, fan: fanFast ? Math.sin(t * 22) * 14 : wobble(t, 0.9, 6), seed: 0.3 });
    popA(tag, t, 8.54, { r: -5 });
    const ks = p(t, 9.3, 0.55, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: (1 - ks) * 8, o: t < 9.28 ? 0 : 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    paint(sHL, t, 10.44, 0.3);
    pots.forEach((pt, i) => set(pt, { r: wobble(t, 0.7, 1.5, i) }));
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
  const tag = chip(cam, 640, 610, 'tu vecino', { size: 44, bg: PINK });
  const sign = box(cam, 120, 150, 840, 270, { zIndex: 40 });
  sign.innerHTML = `<svg width="840" height="270" style="position:absolute;left:0;top:0;overflow:visible"><path d="M160,0 L200,40 M680,0 L640,40" stroke="${INK}" stroke-width="5"/>${cut('<rect x="20" y="40" width="800" height="226" rx="22"/>')}<rect x="20" y="40" width="800" height="226" rx="22" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="36" y="56" width="768" height="194" rx="14" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
  const sl1 = el('div', sign, { left: '0', top: '62px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '76px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sl2 = el('div', sign, { left: '0', top: '146px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '90px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sw = [];
  [['esto', 27, sl1], ['no', 28, sl1], ['venía', 29, sl1], ['en', 30, sl2], ['el', 31, sl2], ['libro', 32, sl2]].forEach(q => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.style.position = 'relative'; s.innerHTML = q[0] === 'libro' ? hlSpan('libro', 'shl') : q[0]; q[2].appendChild(s); sw.push({ e: s, t: W[q[1]].s }); });
  const sHL = sign.querySelector('.shl');
}

/* ======================================================================
   D · EL ASTRÓNOMO Y EL CIELO (11.05 – 15.75)  L3a
   ====================================================================== */
hl(11.05, 12.45, 'Los antiguos miraban al *cielo*', { size: 80, hlT: 12.14 });
hl(12.45, 13.6, 'y veían *siete* cuerpos', { size: 88, hlT: 12.91 });
hl(13.6, 15.75, 'que se movían *distinto*', { size: 88, hlT: 14.05 });
const BODIES = [
  { k: 'sol', col: SUNC, r: 24, y0: 70, x0: 110, v: 38, L: 0, f: 1 },
  { k: 'luna', col: MOONC, r: 19, y0: 140, x0: 640, v: -62, L: 0, f: 1 },
  { k: 'marte', col: RED, r: 12, y0: 215, x0: 250, v: 34, L: 64, f: 1.7 },
  { k: 'mercurio', col: '#d6d0c2', r: 10, y0: 285, x0: 430, v: 10, L: 92, f: 2.6 },
  { k: 'jupiter', col: '#E3C08E', r: 17, y0: 355, x0: 700, v: -26, L: 40, f: 1.3 },
  { k: 'venus', col: '#FFD6EC', r: 14, y0: 425, x0: 170, v: 44, L: 52, f: 2.1 },
  { k: 'saturno', col: BRASS, r: 14, y0: 495, x0: 540, v: 16, L: 30, f: 1.5 },
];
const bodyPos = (b, t) => { const tau = t - 11.05; return [b.x0 + b.v * tau + b.L * Math.sin(b.f * tau), b.y0 + 22 * Math.sin(1.3 * tau + b.y0)]; };
{
  const SW = 862, SH2 = 582;
  const c = scene(11.05, 15.75, t => {
    set(cam, { s: 1 + 0.04 * p(t, 11.05, 4.7, E.linear) });
    starG.setAttribute('transform', `rotate(${f1((t - 11.05) * 2.2)} 431 -300)`);
    BODIES.forEach((b, i) => {
      const [x, y] = bodyPos(b, t); bg_[i].setAttribute('transform', `translate(${f1(x)},${f1(y)})`);
      let d = ''; for (let k = 0; k <= 26; k++) { const q = bodyPos(b, t - 1.6 + k * 0.06); d += (k ? 'L' : 'M') + f1(q[0]) + ',' + f1(q[1]); } trails[i].setAttribute('d', d);
      const tn = 12.95 + i * 0.08; const kn = pop(t, tn, 0.3); set(nums[i], { x: x + 14, y: y - 52, s: kn, o: t < tn ? 0 : 1 });
    });
    face(ast, t, { look: [-3, -6], seed: 0.4, jaw: VT(t) * 0 });
    set(ast.d, { y: wobble(t, 0.5, 3) });
    lab.querySelector('.rete').setAttribute('transform', `rotate(${f1((t - 11) * 40)} 130 150)`);
    lab.querySelector('.alid').setAttribute('transform', `rotate(${f1(-20 + Math.sin(t * 1.4) * 25)} 130 170)`);
    set(labW, { r: -8 + wobble(t, 0.6, 3), y: wobble(t, 0.6, 4) });
    popA(c7, t, 13.16, { r: -6 }); popA(cA, t, 14.05, { r: 3 }); popA(cS, t, 14.67, { r: -3 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 700px' });
  const sky = nightPanel(cam, 60, 400, 880, 600, 11);
  const sv = box(sky.inner, 0, 0, SW, SH2);
  let bodiesS = '';
  BODIES.forEach(b => {
    b.r = Math.round(b.r * 1.45); let g = `<circle r="${b.r + 10}" fill="${b.col}" opacity=".25"/><circle r="${b.r}" fill="${b.col}" stroke="${INK}" stroke-width="3"/>`;
    if (b.k === 'saturno') g += `<ellipse rx="${b.r * 2}" ry="${b.r * 0.6}" fill="none" stroke="${b.col}" stroke-width="4" transform="rotate(-18)"/>`;
    if (b.k === 'sol') { let r = ''; for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2; r += `M${f1(Math.cos(a) * (b.r + 6))},${f1(Math.sin(a) * (b.r + 6))}L${f1(Math.cos(a) * (b.r + 18))},${f1(Math.sin(a) * (b.r + 18))}`; } g += `<path d="${r}" stroke="${SUNC}" stroke-width="5" stroke-linecap="round"/>`; }
    bodiesS += `<path class="trail" fill="none" stroke="${b.col}" stroke-width="${Math.max(4, b.r * 0.5)}" stroke-linecap="round" stroke-dasharray="2 9" opacity=".75"/><g class="bod">${g}</g>`;
  });
  sv.innerHTML = `<svg width="${SW}" height="${SH2}" style="overflow:visible"><g class="starG">${starsSvg(1600, 1400, 140, 66).replace('<path', '<path')}</g>${bodiesS}</svg>`;
  const starG = sv.querySelector('.starG'); starG.firstChild && null;
  sv.querySelector('.starG').innerHTML = `<g transform="translate(-370,-420)">${starsSvg(1600, 1400, 150, 66)}</g>`;
  const trails = [...sv.querySelectorAll('.trail')], bg_ = [...sv.querySelectorAll('.bod')];
  const nums = BODIES.map((b, i) => el('div', sv, { left: 0, top: 0, width: '44px', height: '44px', borderRadius: '50%', background: YEL, border: `3px solid ${INK}`, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '28px', lineHeight: '38px', textAlign: 'center', color: INK, zIndex: 5 }, String(i + 1)));
  const ast = mk(cam, [560, 830, 380, 486], astronomerInner(), '0 0 360 460', 'bust'); ast.d.style.zIndex = 6;
  const labW = box(cam, 400, 960, 230, 266, { zIndex: 7, transformOrigin: '115px 40px' });
  labW.innerHTML = svgW(astrolabeInner() + gloveHand(130, 20, 180, 0.9), '0 0 260 300');
  const lab = labW;
  const c7 = chip(cam, 90, 440, '¡7 cuerpos!', { size: 44, bg: YEL, color: INK, z: 30 });
  const cA = chip(cam, 420, 930, 'cada uno a su aire', { size: 38, bg: PINK, z: 30 });
  const cS = chip(cam, 610, 440, 'estrellas: todas a una', { size: 30, bg: '#fff', color: INK, z: 30 });
}

/* ======================================================================
   E · LOS SIETE, NOMBRADOS + UN DÍA A CADA UNO (15.75 – 23.12)  L3b + L4
   ====================================================================== */
hl(15.75, 21.05, 'Los *siete* del cielo', { size: 100, hlT: 16.0 });
hl(21.05, 23.12, 'Y le dieron *un día* a cada uno', { size: 76, y: 190, hlT: 21.68 });
const NAMED = [['sol', 50], ['luna', 52], ['marte', 53], ['mercurio', 54], ['jupiter', 55], ['venus', 56], ['saturno', 58]];
{
  const G = {}, SZ = 176;
  const gpos = i => i < 4 ? [170 + i * 220, 470] : [320 + (i - 4) * 220, 730];
  const c = scene(15.75, 23.12, t => {
    set(sky.wrap, { o: 1 - p(t, 21.0, 0.3) * 0.0 });
    starL.style.transform = `translate(${f1(Math.sin(t * 0.3) * 8)}px,0)`;
    const kc = p(t, 21.05, 0.45, E.outBack); set(cal.wrap, { y: (1 - kc) * 700, o: t < 21.05 ? 0 : 1 });
    NAMED.forEach(([k, wi], i) => {
      const a = G[k], tn = W[wi].s - 0.05, j = WEEK.indexOf(k), [gx, gy] = gpos(i);
      const tf = 21.7 + j * 0.14, kf = p(t, tf, 0.4, E.inOutCubic);
      const cell = cal.cells[j], tx = cell.cx, ty = cell.cy + 22;
      const x = lerp(gx, tx, kf), y = lerp(gy, ty, kf) - Math.sin(kf * Math.PI) * 160, s = lerp(1, 0.6, kf);
      const land = t > tf + 0.4 ? 1 - E.outElastic(clamp((t - tf - 0.4) / 0.5)) : 0;
      const kp = pop(t, tn, 0.45);
      const named = t >= tn && t < W[wi].e + 0.35;
      set(a.d, { x: x - SZ / 2, y: y - SZ / 2 + (kf < 0.01 ? wobble(t, 0.6, 5, i) - (named ? Math.abs(Math.sin((t - tn) * 10)) * 20 : 0) : 0), s: s * kp, sy: 1 - land * 0.3, sx: 1 + land * 0.2, r: kf > 0 && kf < 1 ? Math.sin(kf * Math.PI) * 20 : wobble(t, 0.5, 3, i), o: t < tn ? 0 : 1 });
      astroFace(a, t, { smile: named || t > tf + 0.4, look: kf > 0 && kf < 1 ? [0, 5] : [0, 0], brow: named ? 6 : 0, seed: i * 0.41 });
      const ln = names[i]; set(ln, { x: gx - 130, y: gy + 92 + (1 - clamp(kp)) * 20, o: t < tn ? 0 : 1 - p(t, 21.05, 0.25) });
    });
  }, { clip: true, cut: true });
  const sky = nightPanel(c, 40, 360, 900, 620, 12);
  const starL = box(sky.inner, 0, 0, 900, 620); starL.innerHTML = `<svg width="900" height="620">${starsSvg(900, 620, 90, 77)}</svg>`;
  const cal = mkCal(c, 60, 1000, 880, 7, { title: 'SEMANA', titleSize: 40, hh: 64, labels: ABBR, ch: 214, nums: false, labSize: 28 });
  const names = [];
  NAMED.forEach(([k], i) => { G[k] = mkAstro(c, 0, 0, SZ, k); G[k].d.style.zIndex = 20; names.push(el('div', c, { left: 0, top: 0, width: '260px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '46px', color: YEL, textShadow: `3px 3px 0 ${INK}`, zIndex: 21, whiteSpace: 'nowrap' }, ASTRO_NAMES[k])); });
}

/* ======================================================================
   F · EL ESPAÑOL: LUNes ← LUNa … (23.12 – 36.08)  L5  — GRAN MOMENTO
   ====================================================================== */
hl(23.12, 24.45, 'Fíjate en el *español*', { size: 110, y: 560, hlT: 23.8 });
{
  const c = scene(23.12, 24.5, t => { popA(cd.wrap, t, 23.35, { r: -3 }); ws.forEach((q, i) => set(q, { o: t > 23.55 + i * 0.12 ? 1 : 0, x: (1 - p(t, 23.55 + i * 0.12, 0.25, E.outBack)) * 40 })); }, { cut: true });
  const cd = paperPiece(c, 290, 790, 560, 400, { seed: 23, bg: '#FBF6EA' });
  box(cd.inner, 0, 0, 542, 382, { backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.16) 0 2px, transparent 2px 62px)', backgroundPosition: '0 40px' });
  const ws = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'].map((x, i) => el('div', cd.inner, { left: '40px', top: px(14 + i * 62), fontFamily: 'SpecialElite', fontSize: '50px', color: INK }, x + ' …'));
}
const BEATS = [
  { day: 'LUNES', d: 71, pre: 'de la ', name: 'LUNA', de: 72, n: 74, k: 'luna', hd: [0, 1, 2], hn: [0, 1, 2] },
  { day: 'MARTES', d: 75, pre: 'de ', name: 'MARTE', de: 76, n: 77, k: 'marte', hd: [0, 1, 2, 3], hn: [0, 1, 2, 3] },
  { day: 'MIÉRCOLES', d: 78, pre: 'de ', name: 'MERCURIO', de: 79, n: 80, k: 'mercurio', hd: [0, 2, 3, 4], hn: [0, 1, 2, 3] },
  { day: 'JUEVES', d: 81, pre: 'de ', name: 'JÚPITER', de: 82, n: 83, k: 'jupiter', hd: [0, 1], hn: [0, 1] },
  { day: 'VIERNES', d: 84, pre: 'de ', name: 'VENUS', de: 85, n: 86, k: 'venus', hd: [0, 2, 4], hn: [0, 1, 2] },
];
{ // tira de la semana arriba
  const M = [];
  const c = scene(23.12, 36.08, t => {
    let cur = -1; BEATS.forEach((b, j) => { if (t >= W[b.d].s - 0.25) cur = j; });
    M.forEach((m, i) => {
      const kin = p(t, 23.2 + i * 0.06, 0.4, E.outBack);
      const on = i === cur, done = i < cur;
      m.cell.style.background = on ? YEL : done ? '#F2E3B3' : '#fff';
      set(m.cell, { y: (1 - kin) * -260 + (on ? 8 : 0), s: on ? 1.12 : 1, o: 1 });
      astroFace(m.a, t, { smile: on || done, seed: i * 0.3 });
      m.ck.style.visibility = done ? 'visible' : 'hidden';
    });
  }, { cut: true });
  ABBR.forEach((ab, i) => {
    const cell = box(c, 66 + i * 124, 170, 112, 150, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '12px', boxShadow: `5px 6px 0 ${SH}`, zIndex: 50 });
    el('div', cell, { left: 0, top: '4px', width: '104px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '26px', color: INK }, ab);
    const a = mkAstro(cell, 12, 38, 82, WEEK[i]);
    const ck = el('div', cell, { left: '70px', top: '100px', width: '40px', height: '40px', zIndex: 3 }, CHECK);
    M.push({ cell, a, ck });
  });
}
BEATS.forEach((b, j) => {
  const tb = W[b.d].s - 0.25, te = j < 4 ? W[BEATS[j + 1].d].s - 0.25 : 36.08;
  const ws = W[b.d].s, wd = Math.min(0.6, W[b.d].e - ws), tn = W[b.n].s;
  const c = scene(tb, te, t => {
    const ka = pop(t, tb + 0.05, 0.45);
    const named = t >= tn - 0.05 && t < W[b.n].e + 0.6;
    set(a.d, { s: ka, y: wobble(t, 0.6, 6) - (named ? Math.abs(Math.sin((t - tn) * 9)) * 30 * (1 - p(t, tn, 0.8)) : 0), r: wobble(t, 0.45, 3), o: 1 });
    astroFace(a, t, { smile: t >= tn - 0.05, look: t < tn ? [0, 6] : [0, 0], brow: named ? 10 : 0, seed: j * 0.5 });
    lettersIn(day, t, ws, wd);
    set(pre, { o: t >= W[b.de].s - 0.05 ? 1 : 0, y: (1 - p(t, W[b.de].s - 0.05, 0.25, E.outBack)) * 30 });
    lettersIn(nm, t, tn, Math.min(0.3, W[b.n].e - tn), { dy: 40 });
    paintIdx(day, b.hd, t, tn + 0.12, 0.07); paintIdx(nm, b.hn, t, tn + 0.12, 0.07);
    sparks.forEach((s, i) => { const k = p(t, tn, 0.6, E.outCubic); const ang = i / sparks.length * Math.PI * 2; set(s, { x: Math.cos(ang) * 230 * k, y: Math.sin(ang) * 200 * k, s: 1 - k * 0.5, r: t * 300, o: t >= tn && k < 1 ? 1 - k : 0 }); });
  }, { clip: true, dir: j % 2 ? -1 : 1 });
  const halo = box(c, 330, 370, 420, 420, { borderRadius: '50%', background: `radial-gradient(circle, rgba(255,230,0,.45), rgba(255,230,0,0) 68%)`, zIndex: 1 });
  const a = mkAstro(c, 345, 375, 390, b.k); a.d.style.zIndex = 3;
  const sparks = []; for (let i = 0; i < 8; i++) sparks.push(el('div', c, { left: '520px', top: '520px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 4 }, '✦'));
  const fs = fitSize(b.day, 800, 200, 0.8);
  const day = wordRow(c, 790 + (200 - fs) * 0.5, b.day, fs, { z: 10 });
  const line = el('div', c, { left: '40px', top: '1000px', width: '1000px', textAlign: 'center', whiteSpace: 'nowrap', zIndex: 10 });
  const pre = el('span', line, { position: 'relative', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 700, fontSize: '70px', color: INK }, b.pre.replace(/ $/, '&nbsp;'));
  pre.style.position = 'relative'; pre.style.display = 'inline-block';
  const nm = wordRow(c, 0, b.name, 86, { z: 10 }); nm.d.style.position = 'relative'; nm.d.style.display = 'inline-block'; nm.d.style.left = '0'; nm.d.style.top = '0'; nm.d.style.width = 'auto'; line.appendChild(nm.d);
});

/* ======================================================================
   G · FIN DE SEMANA: aquí cambia · sábado (sabbat) · domingo (latín) (36.08 – 44.8)  L6
   ====================================================================== */
hl(36.08, 38.33, '¿Y el *fin de semana*?', { size: 100, hlT: 36.41 });
{
  const c = scene(36.08, 38.33, t => {
    cal.cells.forEach((q, i) => {
      if (i < 5) { const k = pop(t, 36.3 + i * 0.1, 0.3); set(cks[i], { s: k, o: t < 36.3 + i * 0.1 ? 0 : 1 }); }
      else { const on = t > 37.19; q.e.style.background = on ? '#FFD1E8' : '#fff'; set(q.e, { s: on ? 1 + 0.08 * Math.abs(Math.sin((t - 37.19) * 6)) : 1, r: on ? Math.sin(t * 20) * 2 * (1 - p(t, 37.19, 0.8)) : 0 }); set(qm[i - 5], { s: pop(t, 36.6 + (i - 5) * 0.12, 0.3), o: t > 36.6 ? 1 : 0, r: wobble(t, 1.2, 8, i) }); }
    });
    AS.forEach((a, i) => { set(a.d, { y: wobble(t, 0.6, 3, i) + (i >= 5 && t > 37.19 ? shake(t, 37.19, 0.5, 10) : 0) }); astroFace(a, t, { smile: i < 5, oh: i >= 5 && t > 37.19, brow: i >= 5 && t > 36.6 ? 10 : 0, look: i >= 5 ? [0, -4] : [0, 0], seed: i * 0.3 }); });
    popA(ch, t, 37.19, { r: -4 }); set(arr, { o: t > 37.25 ? 1 : 0, y: Math.sin(t * 8) * 8 });
  }, { clip: true });
  const cal = mkCal(c, 60, 480, 880, 7, { title: 'SEMANA', titleSize: 44, hh: 70, labels: ABBR, ch: 330, nums: false, labSize: 28 });
  const AS = WEEK.map((k, i) => { const a = mkAstro(c, cal.cells[i].cx - 56, cal.cells[i].cy - 40, 112, k); a.d.style.zIndex = 10; return a; });
  const cks = [], qm = [];
  cal.cells.forEach((q, i) => { if (i < 5) { const e = box(c, q.cx - 30, q.cy + 70, 60, 60, { zIndex: 12, background: YEL, borderRadius: '50%', border: `3px solid ${INK}`, padding: '8px' }); e.innerHTML = CHECK; cks.push(e); } else qm.push(el('div', c, { left: px(q.cx - 24), top: px(q.cy + 50), fontFamily: 'Playfair', fontWeight: 900, fontSize: '80px', color: RED, zIndex: 12, textShadow: `3px 3px 0 #fff` }, '?')); });
  const ch = chip(c, 440, 1060, '¡aquí cambia!', { size: 56, bg: PINK, z: 30 });
  const arr = box(c, 740, 945, 120, 110, { zIndex: 30 }); arr.innerHTML = arrowSvg('M60,100 Q70,50 60,6 M40,30 L60,4 L82,30');
}
{ // SÁBADO
  const c = scene(38.33, 41.8, t => {
    lettersIn(day, t, 38.39, 0.55);
    stampA(stp, t, 39.57, -5); paintIdx(day, [0, 1, 2], t, 39.75, 0.07); paintIdx(sab, [0, 1, 2], t, 39.75, 0.07);
    popA(heb, t, 40.02, { r: 3 });
    set(hm, { r: Math.sin(t * 1.6) * 3 });
    face(emu, t, { closed: true, blink: false, neck: -20 + Math.sin(t * 1.6) * 3, seed: 1 });
    popA(rest, t, 40.77, { r: -3 });
    zz.forEach((z, i) => { const ph = ((t * 0.7 + i / 3) % 1); set(z, { x: ph * 40, y: -ph * 120, o: Math.sin(ph * Math.PI), s: 0.6 + ph * 0.6 }); });
  }, { clip: true });
  const day = wordRow(c, 210, 'SÁBADO', fitSize('SÁBADO', 820, 190, 0.78));
  const stp = stamp(c, 150, 430, '', { size: 100, bw: 11, z: 30, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  stp.style.textAlign = 'center';
  const sab = wordRow(stp, 0, 'SABBAT', 112, { font: 'Rye', weight: 400, color: RED }); sab.d.style.position = 'relative'; sab.d.style.left = '0'; sab.d.style.width = 'auto';
  const heb = el('div', c, { left: '640px', top: '600px', fontFamily: 'SpecialElite', fontSize: '44px', color: '#fff', background: INK, padding: '6px 18px', zIndex: 31, whiteSpace: 'nowrap', transform: 'rotate(3deg)' }, '(hebreo)');
  const hm = box(c, 300, 760, 640, 420, { zIndex: 5, transformOrigin: '320px 60px' });
  const hb = box(hm, 0, 0, 640, 420); hb.innerHTML = svgW(hammockBack(), '0 0 640 400');
  const emu = mkEmu(hm, [146, -8, 300, 450], { seed: 44 }); emu.d.style.zIndex = 2;
  const hf = box(hm, 0, 0, 640, 420, { zIndex: 3 }); hf.innerHTML = svgW(hammockFront(), '0 0 640 400');
  const zz = [0, 1, 2].map(i => el('div', hm, { left: '120px', top: '40px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '56px', color: INK, zIndex: 4 }, 'z'));
  const rest = chip(c, 330, 1190, 'día de descanso', { size: 46, bg: PINK, z: 30 });
}
{ // DOMINGO
  const c = scene(41.8, 44.8, t => {
    lettersIn(day, t, 42.14, 0.5);
    popA(plq, t, 42.9, { r: -2 }); popA(lat, t, 42.95, { r: 6 });
    paintIdx(day, [0, 1, 2, 3, 4], t, 43.1, 0.06); paintIdx(dies, [5, 6, 7, 8, 9], t, 43.1, 0.06);
    popA(tr, t, 43.76, { rise: 40 }); paint(trHL, t, 44.19, 0.3);
    set(bell, { r: t > 44.19 ? Math.sin((t - 44.19) * 12) * 18 * (1 - p(t, 44.19, 0.6)) : wobble(t, 0.6, 2), s: pop(t, 43.76, 0.4), o: t > 43.76 ? 1 : 0 });
  }, { clip: true, dir: -1 });
  const day = wordRow(c, 210, 'DOMINGO', fitSize('DOMINGO', 820, 180, 0.78));
  const plq = box(c, 110, 450, 860, 270, { zIndex: 5 });
  plq.innerHTML = `<svg width="860" height="270" style="overflow:visible">${cut('<rect x="10" y="10" width="840" height="250" rx="16"/>')}<rect x="10" y="10" width="840" height="250" rx="16" fill="#D9D2C2" stroke="${INK}" stroke-width="6"/><rect x="10" y="10" width="840" height="250" rx="16" fill="url(#hP)"/><rect x="30" y="30" width="800" height="210" rx="8" fill="none" stroke="${INK}" stroke-width="3"/><circle cx="52" cy="52" r="8" fill="${BRASS}" stroke="${INK}" stroke-width="2"/><circle cx="808" cy="52" r="8" fill="${BRASS}" stroke="${INK}" stroke-width="2"/><circle cx="52" cy="218" r="8" fill="${BRASS}" stroke="${INK}" stroke-width="2"/><circle cx="808" cy="218" r="8" fill="${BRASS}" stroke="${INK}" stroke-width="2"/></svg>`;
  const dies = wordRow(plq, 78, 'DIES DOMINICVS', 72, { left: 0, width: 860, ls: '0.06em' });
  const lat = chip(c, 700, 420, 'latín', { size: 40, bg: INK, color: YEL, z: 20 });
  const tr = el('div', c, { left: '0', top: '780px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '96px', color: INK, zIndex: 10, whiteSpace: 'nowrap' }, `= día del ${hlSpan('Señor', 'trhl')}`);
  const trHL = tr.querySelector('.trhl');
  const bell = box(c, 560, 920, 260, 300, { zIndex: 6, transformOrigin: '130px 20px' });
  bell.innerHTML = svgW(`${cut('<path d="M130,40 C70,40 60,120 56,190 C54,220 30,236 26,252 L234,252 C230,236 206,220 204,190 C200,120 190,40 130,40 Z"/><circle cx="130" cy="272" r="22"/>')}<path d="M130,40 C70,40 60,120 56,190 C54,220 30,236 26,252 L234,252 C230,236 206,220 204,190 C200,120 190,40 130,40 Z" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><path d="M130,40 C190,40 200,120 204,190 C206,220 230,236 234,252 L170,252 C176,200 170,100 130,40 Z" fill="url(#hA)"/><path d="M40,236 H220" stroke="${INK}" stroke-width="4"/><circle cx="130" cy="272" r="20" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><path d="M130,40 V8" stroke="${INK}" stroke-width="10"/><path d="M90,90 Q100,70 120,64" stroke="#fff" stroke-width="5" opacity=".6" fill="none"/>`, '0 0 260 300');
}

/* ======================================================================
   H · EN INGLÉS: SATURday · SUNday (44.8 – 51.2)  L7
   ====================================================================== */
hl(44.8, 51.2, 'En inglés se ve mejor el *origen*', { size: 80, hlT: 45.87 });
{
  const c = scene(44.8, 51.2, t => {
    const kst = pop(t, 45.0, 0.4); set(en, { s: kst * (1 - p(t, 46.45, 0.2, E.inCubic)), r: -6 + wobble(t, 1, 2), o: t > 45.0 && t < 46.65 ? 1 : 0 });
    [[c1, 46.6], [c2, 48.55]].forEach(([cd, t0]) => { const k = p(t, t0, 0.4, E.outBack); set(cd.w.wrap, { x: (1 - k) * 900, r: (1 - k) * 8, o: t < t0 ? 0 : 1 }); });
    lettersIn(c1.word, t, 46.7, 0.5); lettersIn(c2.word, t, 48.83, 0.38);
    set(c1.sub.d, { o: t > 47.8 ? 1 : 0 }); set(c2.sub.d, { o: t > 49.6 ? 1 : 0 });
    paintIdx(c1.word, [0, 1, 2, 3, 4], t, 47.95, 0.06); paintIdx(c1.sub, [7, 8, 9, 10, 11], t, 47.95, 0.06);
    paintIdx(c2.word, [0, 1, 2], t, 49.99, 0.07); paintIdx(c2.sub, [0, 1, 2], t, 49.99, 0.07);
    astroFace(c1.a, t, { smile: t > 47.85, brow: t > 47.85 && t < 48.5 ? 10 : 0, seed: 0.2 }); set(c1.a.d, { y: wobble(t, 0.6, 4) - (t > 47.85 && t < 48.5 ? Math.abs(Math.sin((t - 47.85) * 9)) * 20 : 0) });
    astroFace(c2.a, t, { smile: t > 49.99, brow: t > 49.99 && t < 50.8 ? 10 : 0, seed: 0.7 }); set(c2.a.d, { y: wobble(t, 0.6, 4, 1) - (t > 49.99 && t < 50.8 ? Math.abs(Math.sin((t - 49.99) * 9)) * 20 : 0), r: t > 49.99 ? (t - 49.99) * 30 : 0 });
  }, { clip: true });
  const en = stamp(c, 240, 620, 'EN INGLÉS', { size: 110, bw: 12, col: INK, z: 30, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  function card(y, k, word, sub) {
    const w = paperPiece(c, 60, y, 880, 300, { seed: y, bg: '#FBF6EA' });
    const a = mkAstro(w.wrap, 22, 24, 250, k);
    const fs = fitSize(word, 560, 130, 0.78);
    const wd = wordRow(w.wrap, 60 + (130 - fs) * 0.4, word, fs, { left: 290, width: 570, align: 'left' });
    const sb = wordRow(w.wrap, 200, sub, 54, { left: 294, width: 570, align: 'left', italic: true, weight: 700 });
    return { w, a, word: wd, sub: sb };
  }
  const c1 = card(430, 'saturno', 'SATURDAY', 'día de SATURNO');
  const c2 = card(770, 'sol', 'SUNDAY', 'SUN = Sol');
}

/* ======================================================================
   I · ¡OJO! LA REVOLUCIÓN FRANCESA: SEMANA DE 10 DÍAS (51.2 – 59.15)  L8
   ====================================================================== */
hl(51.2, 52.3, 'Ojo, que viene lo *bueno*', { size: 84, hlT: 51.92 });
{
  const c = scene(51.2, 52.3, t => { set(ry, { r: t * 30 }); stampA(st, t, 51.3, -9, 1); set(st, { y: shake(t, 51.3, 0.4, 10) }); }, { clip: true, cut: true });
  const ry = rays(c, -420, -40, 1920, 26, '#F3D9A0', PAPER, 0);
  const st = stamp(c, 300, 420, '¡OJO!', { size: 200, bw: 18, z: 30, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
}
hl(52.3, 54.15, 'En la *Revolución* Francesa', { size: 86, hlT: 52.76 });
{
  const c = scene(52.3, 54.15, t => {
    const k = pop(t, 52.4, 0.5); set(cap, { s: k, r: wobble(t, 0.8, 5), y: wobble(t, 1.1, 8), o: 1 });
    popA(ch, t, 52.9, { r: -3 });
    scraps.forEach(s => { const kk = clamp((t - 52.5 - s.d) / 1.6); set(s.e, { x: s.x + Math.sin(t * 3 + s.d * 9) * 40, y: -100 + kk * 1300, r: s.r * kk * 6, o: t > 52.5 + s.d ? 1 : 0 }); });
  }, { clip: true });
  const cap = box(c, 230, 430, 620, 561, { zIndex: 5 }); cap.innerHTML = svgW(phrygianBig(), '0 0 420 380');
  const ch = chip(c, 320, 1040, 'Revolución Francesa', { size: 54, bg: INK, color: YEL, z: 20 });
  const scraps = []; { const r = rng(17); for (let i = 0; i < 22; i++) scraps.push({ e: box(c, 0, 0, 30 + r() * 20, 18 + r() * 14, { background: [RED, '#fff', INK][i % 3], border: `3px solid ${INK}`, zIndex: 3 }), x: 60 + r() * 880, d: r() * 0.9, r: r() * 120 - 60 }); }
}
hl(54.15, 56.15, 'Semanas de *diez* días', { size: 92, hlT: 55.18 });
hl(56.15, 57.15, 'Más *racional*.', { size: 120, hlT: 56.57 });
hl(57.15, 59.15, 'Un día de *descanso* cada diez', { size: 80, hlT: 57.95 });
{
  const WK = [];
  const c = scene(54.15, 59.15, t => {
    cal.cells.forEach((q, i) => { const t0 = 54.68 + i * 0.1; popA(q.e, t, t0, { d: 0.3 }); const work = t > 57.35 + i * 0.05 && i < 9; q.fill.style.background = i === 9 && t > 57.95 ? YEL : work ? 'repeating-linear-gradient(45deg, rgba(43,33,24,.22) 0 3px, transparent 3px 10px)' : 'transparent'; tags[i].style.opacity = (i === 9 ? t > 57.95 : work) ? 1 : 0; });
    const n = Math.round(counter(t, 55.18, 0.5, 7, 10, E.linear)); big.textContent = String(n);
    const kb = p(t, 54.7, 0.4, E.outBack), ko = p(t, 56.1, 0.2, E.inCubic);
    set(big, { s: kb * (1 - ko) * (1 + 0.2 * (t > 55.18 ? 1 - p(t, 55.7, 0.3) : 0)), o: t < 54.7 || ko >= 1 ? 0 : 1 }); set(bigL, { s: kb * (1 - ko), o: t < 54.7 || ko >= 1 ? 0 : 1 });
    const kc = p(t, 56.2, 0.45, E.outBack), kco = p(t, 57.1, 0.2, E.inCubic); set(comp, { s: kc * (1 - kco), r: -20 + Math.sin((t - 56.2) * 5) * 18, o: t < 56.2 || kco >= 1 ? 0 : 1 });
    stampA(rac, t, 56.57, -7); if (t > 57.15) rac.style.visibility = 'hidden';
    WK.forEach((wk, i) => { const t0 = 57.25 + i * 0.12; popA(wk.d, t, t0, { rise: 80 }); set(wk.d, { y: (1 - clamp(pop(t, t0, 0.45))) * 80 + Math.abs(Math.sin(t * 2 + i)) * 4, s: pop(t, t0, 0.45), o: t < t0 ? 0 : 1, r: wobble(t, 0.4, 2, i) }); face(wk, t, { closed: false, seed: i * 0.7 }); wk.drop.setAttribute('transform', `translate(0 ${f1(((t * 1.2 + i * 0.3) % 1) * 40)})`); });
    popA(ch, t, 58.41, { r: -3 });
  }, { clip: true });
  const cal = mkCal(c, 60, 420, 880, 10, { title: 'SEMANA NUEVA', titleSize: 46, ch: 250, numSize: 56, numTop: 70 });
  const tags = cal.cells.map((q, i) => el('div', q.e, { left: 0, top: px(q.h - 70), width: px(q.w - 8), textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: i === 9 ? '17px' : '18px', color: i === 9 ? INK : '#5a3d22', opacity: 0 }, i === 9 ? 'descanso' : 'trabajo'));
  const big = el('div', c, { left: '240px', top: '860px', width: '400px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '330px', lineHeight: 1, color: INK, textShadow: `12px 12px 0 ${YEL}, 16px 16px 0 ${INK}`, zIndex: 10 }, '7');
  const bigL = el('div', c, { left: '620px', top: '1010px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '110px', color: INK, zIndex: 10 }, 'días');
  const comp = box(c, 380, 860, 300, 360, { zIndex: 12, transformOrigin: '150px 40px' }); comp.innerHTML = svgW(compassInner(), '0 0 300 360');
  const rac = stamp(c, 300, 1010, 'MÁS RACIONAL', { size: 80, bw: 10, col: INK, z: 20, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  [[300, 31], [495, 32], [690, 33]].forEach(([x, s], i) => { const wk = mkWorker(c, [x, 850, 250, 320], s, { moustache: i === 1, beard: i === 2 }); wk.d.style.zIndex = 8; WK.push(wk); });
  const ch = chip(c, 300, 1190, '1 día de descanso cada 10', { size: 40, bg: PINK, z: 30 });
}

/* ======================================================================
   J · A LA GENTE LE ENCANTÓ… NO · 12 AÑOS · NAPOLEÓN (59.15 – 65.35)  L9
   ====================================================================== */
hl(59.15, 60.7, 'A la gente le *encantó*…', { size: 90, hlT: 59.77 });
hl(60.7, 61.14, '*No*.', { size: 160, y: 180, hlT: 60.72, hlc: PINK });
{
  const c = scene(59.15, 61.14, t => {
    const cry = t > 60.72;
    set(wk.d, { s: pop(t, 59.2, 0.4) * (1 + (cry ? 0.04 * Math.sin(t * 30) : 0)), y: cry ? shake(t, 60.72, 0.4, 14) : wobble(t, 0.6, 4), o: 1 });
    face(wk, t, { seed: 0.2, brow: cry ? 8 : -4, look: cry ? [0, 2] : [0, 0] });
    wk.fakeM.style.opacity = !cry && t > 59.46 ? 1 : 0; wk.sadM.style.opacity = cry ? 1 : 0; wk.tears.style.opacity = cry ? 1 : 0;
    wk.tears.setAttribute('transform', cry ? `translate(0 ${f1(Math.sin(t * 14) * 3)})` : '');
    hearts.forEach((h, i) => { const t0 = 59.8 + i * 0.12; const k = p(t, t0, 0.5, E.outBack); set(h, { s: k * (cry ? 1 - p(t, 60.72, 0.15) : 1), y: -k * 40 + wobble(t, 1, 6, i), o: t > t0 ? 1 : 0, r: (i % 2 ? 1 : -1) * 12 }); });
    drops.forEach((d, i) => { const ph = ((t - 60.72) * 1.6 + i / drops.length) % 1; set(d, { x: (i % 2 ? 1 : -1) * (40 + ph * 160), y: ph * 420 + ph * ph * 200, o: cry ? 1 - ph : 0 }); });
    popA(nb, t, 60.75, { r: 6 });
  }, { clip: true });
  const wk = mkWorker(c, [250, 420, 580, 741], 34, { moustache: true }); wk.d.style.zIndex = 5;
  const hearts = [[200, 520], [820, 470], [780, 760], [180, 820]].map(q => el('div', c, { left: px(q[0]), top: px(q[1]), fontSize: '110px', color: RED, textShadow: `4px 4px 0 ${INK}`, zIndex: 8, lineHeight: 1 }, '♥'));
  const drops = []; for (let i = 0; i < 8; i++) drops.push(el('div', c, { left: '520px', top: '660px', width: '26px', height: '36px', background: '#BFE3F5', border: `3px solid ${INK}`, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', zIndex: 9 }));
  const nb = chip(c, 640, 1180, 'ni un poquito', { size: 44, bg: '#fff', color: INK, z: 20 });
}
colorHit(61.14, 63.22, PINK, c => {
  const sheets = []; const r = rng(8);
  for (let i = 0; i < 12; i++) { const e = box(c, 470, 1300, 140, 170, { background: INK, borderRadius: '10px', zIndex: 2, color: PINK, fontFamily: 'Playfair', fontWeight: 900, fontSize: '70px', textAlign: 'center', lineHeight: '170px' }, '10'); sheets.push({ e, vx: (r() - 0.5) * 900, vy: -700 - r() * 500, vr: (r() - 0.5) * 300 }); }
  const t1 = el('div', c, { left: '0', top: '240px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '110px', lineHeight: 1, color: INK, zIndex: 4 }, 'duró unos');
  const n = el('div', c, { left: '0', top: '390px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '420px', lineHeight: 1, color: '#fff', textShadow: `10px 10px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}`, zIndex: 5 }, '0');
  const t2 = el('div', c, { left: '0', top: '830px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '150px', lineHeight: 1, color: INK, zIndex: 4 }, 'años');
  return t => {
    const v = Math.round(counter(t, 61.3, 1.17, 0, 12, E.outCubic)); n.textContent = String(v);
    set(n, { s: 1 + 0.12 * Math.abs(Math.sin(t * 14)) * (t < 62.47 ? 1 : 0), o: 1 }); n.style.textShadow = glitch(t, 62.47, 0.25) || `10px 10px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}`;
    set(t1, { s: lerp(1.3, 1, p(t, 61.14, 0.2)), o: 1 }); popA(t2, t, 62.56, { r: -3 });
    sheets.forEach((s, i) => { const t0 = 61.3 + i * 0.095; const k = clamp((t - t0) / 1.4); set(s.e, { x: s.vx * k, y: s.vy * k + k * k * 900, r: s.vr * k, o: t > t0 ? 1 : 0, s: 0.8 }); });
  };
});
hl(63.22, 65.35, 'Y *Napoleón* acabó con ella', { size: 84, hlT: 63.58 });
{
  const c = scene(63.22, 65.35, t => {
    const tt = 64.18, k = p(t, tt, 0.6, E.outCubic);
    set(L.wrap, { x: -k * 260, y: k * 180 + k * k * 200, r: -k * 18, o: 1 - p(t, 64.9, 0.3) });
    set(R.wrap, { x: k * 260, y: k * 220 + k * k * 200, r: k * 22, o: 1 - p(t, 64.9, 0.3) });
    set(napW, { x: (1 - p(t, 63.5, 0.4, E.outBack)) * 600, y: wobble(t, 0.6, 3) + (t > tt ? -Math.abs(Math.sin((t - tt) * 8)) * 20 * (1 - p(t, tt, 0.8)) : 0), r: t > tt ? 4 : 0 });
    face(nap, t, { look: t > tt ? [-6, 2] : [-5, -2], seed: 0.6 });
    nap.d.querySelector('.angry').style.opacity = t > 63.9 ? 1 : 0;
    scraps.forEach(s => { const kk = p(t, tt, 0.9, E.outCubic); set(s.e, { x: s.vx * kk, y: s.vy * kk + kk * kk * 300, r: s.vr * kk, o: t > tt ? 1 - p(t, 64.95, 0.3) : 0 }); });
    popA(nm, t, 63.62, { r: -4 });
  }, { clip: true });
  const mkHalf = (side) => { const cal = mkCal(c, 60, 420, 880, 10, { title: 'SEMANA DE 10 DÍAS', titleSize: 42, ch: 240, numSize: 52, numTop: 70 }); const z = []; for (let i = 0; i <= 10; i++) z.push([50 + (i % 2 ? 2.5 : -2.5), i * 10]); cal.wrap.style.clipPath = side < 0 ? `polygon(-5% -10%, ${z.map(q => q[0] + '% ' + (q[1] * 1.2 - 10) + '%').join(',')}, -5% 120%)` : `polygon(105% -10%, ${z.map(q => q[0] + '% ' + (q[1] * 1.2 - 10) + '%').join(',')}, 105% 120%)`; return cal; };
  const L = mkHalf(-1), R = mkHalf(1);
  const napW = box(c, 500, 790, 420, 537, { zIndex: 8 }); const nap = mk(napW, [0, 0, 420, 537], napoleonInner(), '0 0 360 460', 'bust');
  const nm = chip(c, 300, 1250, 'Napoleón', { size: 50, bg: INK, color: YEL, z: 20 });
  const scraps = []; { const r = rng(64); for (let i = 0; i < 18; i++) scraps.push({ e: box(c, 480 + (r() - 0.5) * 60, 450 + r() * 300, 26 + r() * 30, 18 + r() * 20, { background: i % 2 ? '#FBF6EA' : '#fff', border: `3px solid ${INK}`, zIndex: 6 }), vx: (r() - 0.5) * 700, vy: -200 - r() * 300, vr: (r() - 0.5) * 400 }); }
}

/* ======================================================================
   K · FRASE-RESUMEN: LUNES ← LUNA (65.35 – 70.05)  L10
   ====================================================================== */
hl(65.35, 68.15, 'Cada vez que dices *lunes*…', { size: 84, color: PAPER, hlc: PINK, hlT: 67.33 });
hl(68.15, 70.05, '…estás nombrando a la *Luna*', { size: 80, color: PAPER, hlc: PINK, hlT: 69.53 });
{
  const c = scene(65.35, 70.05, t => {
    const ka = pop(t, 65.45, 0.6); set(moon.d, { s: ka, y: wobble(t, 0.4, 10), r: wobble(t, 0.3, 4), o: 1 });
    astroFace(moon, t, { smile: t > 67.33, wink: t > 69.53, look: t > 67.33 && t < 69.5 ? [0, 6] : [0, 0], brow: t > 69.53 ? 10 : 0, blink: t < 69.4, seed: 0.1 });
    lettersIn(lun, t, 67.33, 0.5);
    lun.L.forEach((q, i) => { q.sp.style.color = i < 3 && t > 67.9 ? YEL : PAPER; });
    paintIdx(lun, [0, 1, 2], t, 67.95, 0.07);
    set(luna.d, { o: t > 69.53 ? 1 : 0, y: (1 - p(t, 69.53, 0.3, E.outBack)) * 40 });
    luna.L.forEach((q, i) => { q.sp.style.color = i >= 2 && i < 5 ? YEL : PAPER; });
    stars.style.transform = `rotate(${f1(t * 1.5)}deg)`;
    set(glint, { s: t > 69.6 ? pop(t, 69.6, 0.3) * (1 - p(t, 69.95, 0.1)) : 0, r: t * 200, o: t > 69.6 ? 1 : 0 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: NIGHT });
  const stars = box(c, -420, 0, 1920, 1920, { zIndex: 1 }); stars.innerHTML = `<svg width="1920" height="1920">${starsSvg(1920, 1920, 260, 99)}</svg>`;
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 30%, rgba(255,230,160,.25), rgba(0,0,0,0) 50%)', zIndex: 1 });
  const moon = mkAstro(c, 300, 360, 480, 'luna'); moon.d.style.zIndex = 3;
  const lun = wordRow(c, 880, 'LUNES', fitSize('LUNES', 820, 230, 0.78), { color: PAPER, z: 5, shadow: `8px 8px 0 #000`, hb: -8, hh: 9 });
  const luna = wordRow(c, 1180, '= LUNA', 110, { color: PAPER, z: 5, italic: true });
  const glint = el('div', c, { left: '640px', top: '470px', fontSize: '90px', color: YEL, zIndex: 6 }, '✦');
}

/* ======================================================================
   L · CTA: COMENTARIOS (70.05 – 74.2)  L11
   ====================================================================== */
hl(70.05, 71.8, '¿Tu día *favorito* de la semana?', { size: 76, hlT: 70.72 });
hl(71.8, 74.2, 'Y no vale decir *viernes*', { size: 86, hlT: 72.68 });
{
  const CM = [];
  const c = scene(70.05, 74.2, t => {
    set(vec.d, { y: wobble(t, 0.5, 3), s: 1 + 0.03 * p(t, 70.05, 4, E.linear) });
    vecFace(vec, t, { jaw: VT(t), look: t < 72.0 ? [3, 0] : [5, -4], bL: t > 72.6 && t < 73.3 ? 12 : 2, bR: t > 72.6 && t < 73.3 ? 16 : 6, noCup: true, fan: t > 72.68 && t < 73.2 ? Math.sin(t * 24) * 18 : wobble(t, 0.9, 6), seed: 2 });
    popA(vc.wrap, t, 71.9, { r: 4 });
    const kx = p(t, 72.68, 0.2, E.outCubic); set(vx, { s: t < 72.68 ? 0 : lerp(2, 1, kx), o: t < 72.68 ? 0 : 1 });
    astroFace(vcA, t, { oh: t > 72.68, brow: t > 72.68 ? 12 : 0, seed: 0.9 });
    CM.forEach(m => { popA(m.e, t, m.t, { rise: 40 }); astroFace(m.av.a, t, { smile: true, seed: m.t }); });
  }, { clip: true });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, #F4CFDA 0 30px, #F9E3EA 30px 60px)` });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,.4), rgba(120,40,60,.3) 85%)' });
  const vec = mkVec(c, [-40, 400, 640, 793]);
  const vc = paperPiece(c, 600, 420, 330, 380, { seed: 9, bg: '#FBF6EA' });
  const vcA = mkAstro(vc.wrap, 50, 20, 230, 'venus');
  el('div', vc.wrap, { left: 0, top: '262px', width: '330px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '62px', color: INK }, 'VIERNES');
  const vx = box(vc.wrap, 20, 30, 290, 300, { zIndex: 5 }); vx.innerHTML = XSVG;
  const cms = [['venus', '@finde_ya', '¿El viernes no cuenta? 😤', 72.95], ['luna', '@odio_madrugar', 'El lunes debería estar prohibido', 73.45], ['saturno', '@siesta_total', 'Yo, el sábado. Con hamaca 🛌', 73.9]];
  cms.forEach((m, i) => {
    const e = box(c, 240 + (i % 2) * 16, 900 + i * 118, 660, 100, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 40 });
    const av = avatarAstro(e, 10, 8, 80, m[0]);
    el('div', e, { left: '104px', top: '8px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '24px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]);
    el('div', e, { left: '104px', top: '38px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '30px', color: INK, whiteSpace: 'nowrap' }, m[2]);
    CM.push({ e, t: m[3], av });
  });
}

/* ======================================================================
   M · Y ESTO… (74.2 – 75.17)  ·  N · …NO VENÍA EN EL LIBRO (75.17 – 76.25)  L12
   ====================================================================== */
hl(74.2, 75.17, 'Y esto…', { size: 120, color: YEL, y: 200, shadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}` });
hl(75.17, 76.25, '…no venía en el *libro*.', { size: 84, hlT: 75.81 });
{
  const c = scene(74.2, 75.17, t => {
    const k = p(t, 74.2, 0.9, E.inOutCubic);
    set(vec.d, { s: 1 + 0.22 * k, y: k * 30, r: -k * 4 });
    vecFace(vec, t, { jaw: VT(t) * 0.6, look: [0, 1], bL: 10, bR: 14, fan: -30, half: true, blink: false });
    vec.hMouth.setAttribute('transform', 'translate(64,-34) rotate(-20 206 318)'); vec.hMouth.style.opacity = 1; vec.cup.style.opacity = 0;
  }, { cut: true, clip: true });
  sceneBg(c, { background: INK });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(ellipse at 50% 46%, rgba(255,230,180,.35), rgba(0,0,0,0) 55%)', zIndex: 1 });
  const vec = mkVec(c, [-30, 300, 1140, 1411]); vec.d.style.zIndex = 2; vec.d.style.transformOrigin = '540px 650px';
}
{
  const c = scene(75.17, 76.25, t => {
    const k = p(t, 75.5, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > 75.8;
    set(bookW, { s: 1.25 * pop(t, 75.18, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, 75.81, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    pages.forEach((f, i) => { const kf = p(t, 75.81, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 140 * kf, y: -kf * 240 + kf * kf * 160, r: Math.sin(t * 4 + i) * 40, o: closed ? 1 : 0 }); });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="44" fill="${INK}">LA SEMANA</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="36" fill="${INK}">capítulo 7</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '500px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const pages = []; for (let i = 0; i < 4; i++) { pages.push(box(bookW, 320, 590, 70, 86, { background: '#FBF6EA', border: `3px solid ${INK}`, borderRadius: '6px', zIndex: 3, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '22px', textAlign: 'center', lineHeight: '86px', color: INK }, ABBR[i * 2] || 'DOM')); }
}

/* ======================================================================
   TARJETA FINAL (76.25 – fin)
   ====================================================================== */
{
  const c = scene(76.25, 999, t => {
    set(sun.d, { x: (1 - p(t, 76.6, 0.45, E.outBack)) * -400, r: -10 + wobble(t, 0.5, 3), o: 1 });
    set(moon.d, { x: (1 - p(t, 76.75, 0.45, E.outBack)) * 400, r: 10 + wobble(t, 0.6, 3), o: 1 });
    astroFace(sun, t, { smile: true, look: [4, 0], seed: 0.3 }); astroFace(moon, t, { smile: true, wink: t > 78.0 && t < 78.6, look: [-4, 0], seed: 0.8 });
    set(lt, { s: pop(t, 76.45, 0.45), o: t < 76.45 ? 0 : 1 }); paint(lhl, t, 76.8, 0.4);
    popA(ttl, t, 76.95, { r: -1 }); popA(src, t, 77.2, { rise: 30 });
  });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, rgba(244,207,218,.55) 0 30px, rgba(249,227,234,.55) 30px 60px)` });
  const sun = mkAstro(c, 40, 420, 230, 'sol'); sun.d.style.zIndex = 2;
  const moon = mkAstro(c, 790, 430, 220, 'luna'); moon.d.style.zIndex = 2;
  const lt = box(c, 40, 830, 1000, 240, { textAlign: 'center', zIndex: 3 });
  lt.innerHTML = `<div style="font-family:Playfair;font-style:italic;font-weight:800;font-size:92px;line-height:1;color:${INK}">esto no venía</div><div style="font-family:Playfair;font-weight:900;font-size:104px;line-height:1.1;color:${INK}">en el ${hlSpan('libro', 'lhl')}</div>`;
  const lhl = lt.querySelector('.lhl');
  const ttl = el('div', c, { left: '90px', top: '1080px', width: '900px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 800, fontSize: '56px', color: '#fff', background: INK, padding: '14px 10px 18px', borderRadius: '14px', boxShadow: `7px 7px 0 ${PINK}`, zIndex: 3 }, 'Ep. 6 · La semana de 7 días');
  const src = el('div', c, { left: '90px', top: '1200px', width: '900px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '29px', lineHeight: 1.3, color: INK, zIndex: 3 }, 'Fuentes: semana planetaria romana · calendario republicano francés (1793–1805)');
}

/* =================== frame =================== */
const SHK = [[2.86, .3, 8], [7.04, .4, 16], [7.4, .35, 12], [37.19, .3, 6], [39.57, .3, 8], [51.3, .4, 14], [56.57, .3, 8], [60.72, .4, 12], [62.47, .3, 10], [64.18, .5, 18], [75.81, .5, 22]];
window.frame = t => {
  const lookOn = updLook(t);
  SC.forEach(s => {
    const vis = t >= s.t0 && t < s.t1; s.c.style.display = vis ? '' : 'none'; if (!vis) return;
    if (s.cut) set(s.c, { o: 1 });
    else { const kin = p(t, s.t0, 0.22, E.outCubic), kout = p(t, s.t1 - 0.12, 0.12, E.inCubic); set(s.c, { x: (1 - kin) * 160 * s.dir - kout * 150 * s.dir, o: Math.min(clamp(kin * 1.8), 1 - kout) }); }
    if (s.fn) s.fn(t);
  });
  HLS.forEach(h => {
    const vis = t >= h.t0 - 0.02 && t < h.t1; h.b.style.display = vis ? '' : 'none'; if (!vis) return;
    h.b.style.opacity = 1 - p(t, h.t1 - 0.12, 0.12, E.inCubic);
    h.spans.forEach(s => { const k = p(t, s.t - 0.14, 0.26, E.outBack); set(s.e, { y: (1 - k) * 42, o: clamp(k * 1.5) }); });
    h.hls.forEach(s => { s.e.style.transform = `scaleX(${f1(p(t, s.t, 0.36, E.outCubic) * 1000) / 1000}) rotate(-1.2deg)`; });
  });
  const inHit = (t >= 3.78 && t < 4.62) || (t >= 61.14 && t < 63.22);
  updOval(inHit ? -1 : t, lookOn);
  let sh = 0; SHK.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};

/* =================== efectos de sonido =================== */
[
  [0.0, 'swoosh_up', .6], [0.0, 'pop', .6], [0.3, 'pop', .5], [0.45, 'pop2', .5], [0.6, 'pop', .5], [0.75, 'pop2', .5], [1.28, 'ding', .6],
  [2.38, 'pop', .7], [2.86, 'error', .6], [3.45, 'boing', .7], [3.78, 'burst', .9], [3.8, 'glitch', .6],
  [4.62, 'whoosh', .6], [5.35, 'tick', .5], [5.65, 'tick', .5], [5.95, 'tick', .5], [6.25, 'tick', .5], [6.55, 'tick', .5], [6.85, 'tick', .5], [7.04, 'scratch', .9], [7.05, 'thud', 1], [7.4, 'stamp', 1.1],
  [8.15, 'whoosh', .6], [8.54, 'pop2', .7], [9.32, 'swoosh_up', .6], [10.44, 'ding', .6], [10.85, 'whoosh', .8],
  [11.2, 'sparkle', .5], [12.95, 'tick', .6], [13.11, 'tick', .6], [13.27, 'tick', .6], [13.43, 'tick', .6], [13.16, 'pop', .7], [14.05, 'pop2', .6], [14.67, 'pop', .6],
  [15.75, 'whoosh', .6], [16.0, 'pop', .7], [16.68, 'pop2', .7], [17.31, 'pop', .7], [17.92, 'pop2', .7], [18.82, 'pop', .7], [19.58, 'pop2', .7], [20.24, 'pop', .7],
  [21.05, 'swoosh_up', .6], [21.95, 'squish', .5], [22.35, 'squish', .5], [22.75, 'squish', .5], [23.0, 'ding', .5],
  [23.15, 'whoosh', .6], [23.8, 'pop', .5],
  [24.55, 'type', .6], [26.11, 'sparkle', .7], [26.4, 'whoosh', .5], [26.63, 'type', .6], [28.23, 'sparkle', .7], [28.65, 'whoosh', .5], [28.9, 'type', .6], [30.51, 'sparkle', .7], [31.2, 'whoosh', .5], [31.46, 'type', .6], [32.95, 'sparkle', .7], [33.55, 'whoosh', .5], [33.79, 'type', .6], [35.31, 'tada', .7],
  [36.08, 'whoosh', .6], [36.3, 'tick', .5], [36.5, 'tick', .5], [36.7, 'tick', .5], [37.19, 'boing', .8],
  [38.33, 'whoosh', .6], [38.4, 'type', .5], [39.57, 'stamp', 1], [40.02, 'pop', .6], [40.77, 'pop2', .6], [40.98, 'emu', .9],
  [41.8, 'whoosh', .6], [42.9, 'thud', .7], [43.1, 'sparkle', .5], [43.76, 'pop', .6], [44.19, 'bell', .7],
  [44.8, 'whoosh', .5], [45.0, 'stamp', .8], [46.6, 'swoosh_up', .6], [47.95, 'ding', .6], [48.55, 'swoosh_up', .6], [49.99, 'ding', .7],
  [51.2, 'whoosh', .6], [51.3, 'stamp', 1.1],
  [52.3, 'whoosh', .6], [52.4, 'boing', .6], [52.9, 'pop', .6],
  [54.15, 'whoosh', .6], [54.7, 'tick', .5], [54.9, 'tick', .5], [55.1, 'tick', .5], [55.3, 'tick', .5], [55.5, 'tick', .5], [55.68, 'ding', .8],
  [56.2, 'swoosh_up', .5], [56.57, 'stamp', .9], [57.25, 'pop', .6], [57.37, 'pop2', .6], [57.49, 'pop', .6], [57.95, 'ding', .6], [58.41, 'pop', .6],
  [59.2, 'pop', .6], [59.8, 'heart', .6], [60.72, 'sad', .8], [60.75, 'glitch', .5],
  [61.14, 'burst', .9], [61.4, 'clockfast', .6], [62.47, 'cash', .7],
  [63.22, 'whoosh', .6], [63.5, 'swoosh_up', .6], [64.18, 'paper', 1], [64.2, 'thud', .9],
  [65.4, 'whoosh', .5], [65.5, 'sparkle', .5], [67.33, 'pop', .6], [67.95, 'swoosh_up', .5], [69.55, 'ping', .8], [69.6, 'sparkle', .7],
  [70.05, 'whoosh', .6], [71.9, 'pop', .6], [72.68, 'error', .7], [72.95, 'msg_in', .8], [73.45, 'msg_in', .8], [73.9, 'msg_in', .8],
  [74.2, 'whoosh', .5], [75.17, 'whoosh', .5], [75.81, 'thud', 1.4], [75.84, 'stamp', .6], [76.45, 'tada', .8], [76.95, 'pop', .6],
].forEach(s => sfx(s[1], s[0], s[2]));
