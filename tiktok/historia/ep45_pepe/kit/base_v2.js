/* ======================= base (adaptado de v1) ======================= */
const STAGE = document.getElementById('stage');
const defsSvg = document.createElementNS(NS, 'svg');
defsSvg.setAttribute('width', '0'); defsSvg.setAttribute('height', '0'); defsSvg.style.position = 'absolute';
defsSvg.innerHTML = `<defs>${globalDefs()}
<symbol id="emuS" viewBox="0 0 400 600" overflow="visible">${emuInner({ seed: 21, fe: 110 })}</symbol>
<symbol id="emuA" viewBox="0 0 400 600" overflow="visible">${emuInner({ seed: 22, fe: 90, pose: 'A' })}</symbol>
<symbol id="emuB" viewBox="0 0 400 600" overflow="visible">${emuInner({ seed: 22, fe: 90, pose: 'B' })}</symbol>
<symbol id="emuK" viewBox="0 0 400 600" overflow="visible">${emuInner({ seed: 23, fe: 90, neck: -88 })}</symbol>
<symbol id="emuG" viewBox="0 0 400 600" overflow="visible">${emuInner({ seed: 24, fe: 110, neck: 10 })}</symbol>
<symbol id="merS" viewBox="0 0 360 460" overflow="visible">${bustInner({ hat: 'cap', uniform: 'officer', moustache: true, binos: true, seed: 3 })}</symbol>
<symbol id="solS" viewBox="0 0 360 460" overflow="visible">${bustInner({ hat: 'slouch', uniform: 'soldier', seed: 8 })}</symbol>
<symbol id="farS" viewBox="0 0 360 460" overflow="visible">${bustInner({ hat: 'brodie', uniform: 'farmer', beard: true, seed: 6 })}</symbol>
<symbol id="minS" viewBox="0 0 360 460" overflow="visible">${ministerInner()}</symbol>
<symbol id="vecS" viewBox="0 0 420 520" overflow="visible">${vecinaInner({ seed: 4 })}</symbol>
<symbol id="gunS" viewBox="0 0 460 210" overflow="visible">${gunInner()}</symbol>
<symbol id="wheat" viewBox="0 0 60 260" overflow="visible">${wheatSym()}</symbol>
<symbol id="bush" viewBox="0 0 260 170" overflow="visible">${bushSym()}</symbol>
</defs>`;
STAGE.appendChild(defsSvg);
const bg = el('div', null, { left: 0, top: 0, width: '1080px', height: '1920px', zIndex: 0 }, paperBG());
const world = el('div', null, { left: 0, top: 0, width: '1080px', height: '1920px', zIndex: 1 });

const normW = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');
const px = v => v + 'px';
function box(parent, x, y, w, h, css = {}, html) { return el('div', parent, Object.assign({ left: px(x), top: px(y), width: px(w), height: px(h) }, css), html); }
function svgW(inner, vb) { return `<svg viewBox="${vb}" width="100%" height="100%" style="overflow:visible;display:block">${inner}</svg>`; }
function mk(parent, b, inner, vb, kind) {
  const d = box(parent, b[0], b[1], b[2], b[3]); d.innerHTML = svgW(inner, vb); const q = s => d.querySelector(s);
  return { d, kind, jaw: q('.jaw'), pup: [...d.querySelectorAll('.pup')], lidH: q('.lidH'), lidC: q('.lidC'), wing: q('.wing'), neck: q('.neckg'), legL: q('.legL'), legR: q('.legR'), flash: q('.flash'), brow: q('.brow'), browL: q('.browL'), browR: q('.browR'), fan: q('.fan'), cup: q('.cup'), hMouth: q('.hMouth'), hEyes: q('.hEyes'), steam: q('.steam'), medals: [...d.querySelectorAll('.medal')], wheels: [...d.querySelectorAll('.wheel,.twheel')], track: q('.track') };
}
const mkEmu = (pa, b, o = {}) => mk(pa, b, emuInner(o), '0 0 400 600', 'emu');
const mkBust = (pa, b, o = {}) => mk(pa, b, bustInner(o), '0 0 360 460', 'bust');
const mkMer = (pa, b, medals) => mk(pa, b, bustInner({ hat: 'cap', uniform: 'officer', moustache: true, binos: !medals, seed: 3 }) + (medals ? medalsSvg() : ''), '0 0 360 460', 'bust');
const mkSol = (pa, b, seed = 8) => mkBust(pa, b, { hat: 'slouch', uniform: 'soldier', seed });
const mkFar = (pa, b) => mkBust(pa, b, { hat: 'brodie', uniform: 'farmer', beard: true, seed: 6 });
const mkGun = (pa, b) => mk(pa, b, gunInner(), '0 0 460 210', 'gun');
const mkVec = (pa, b) => mk(pa, b, vecinaInner({ seed: 4 }), '0 0 420 520', 'vec');
const mkEmuF = (pa, b) => mk(pa, b, emuFrontInner(), '0 0 400 600', 'emuF');
function face(f, t, o = {}) {
  const j = o.jaw || 0;
  if (f.jaw) f.jaw.setAttribute('transform', f.kind === 'emu' ? `rotate(${f1(-j * 34)} 103 103)` : `translate(0 ${f1(j * (f.kind === 'emuF' ? 40 : 32))})`);
  const lk = o.look || [0, 0]; f.pup.forEach(q => q.setAttribute('transform', `translate(${f1(lk[0])} ${f1(lk[1])})`));
  const bl = o.blink !== false && (((t + (o.seed || 0)) % 3.3) < 0.13);
  if (f.lidC) f.lidC.style.opacity = (bl || o.closed) ? 1 : 0;
  if (f.lidH) f.lidH.style.opacity = (!bl && !o.closed && o.half) ? 1 : 0;
  if (f.wing) f.wing.setAttribute('transform', `rotate(${f1(o.wing || 0)} 270 304)`);
  if (f.neck) f.neck.setAttribute('transform', `rotate(${f1(o.neck || 0)} 172 286)`);
  if (f.legL) { f.legL.setAttribute('transform', `rotate(${f1(o.legL || 0)} 200 392)`); f.legR.setAttribute('transform', `rotate(${f1(o.legR || 0)} 262 384)`); }
  if (f.brow) f.brow.setAttribute('transform', `translate(0 ${f1(o.brow || 0)})`);
  if (f.browL) f.browL.setAttribute('transform', `translate(0 ${f1(-(o.bL || 0))})`);
  if (f.browR) f.browR.setAttribute('transform', `translate(0 ${f1(-(o.bR || 0))})`);
}
// La Vecina
function vecFace(f, t, o = {}) {
  face(f, t, o);
  f.jaw.setAttribute('transform', `translate(0 ${f1((o.jaw || 0) * 30)})`);
  f.fan.setAttribute('transform', `rotate(${f1(o.fan || 0)} 340 480)`); f.fan.style.opacity = o.noFan ? 0 : 1;
  const c = o.cup || 0; f.cup.setAttribute('transform', `translate(${f1(96 + 108 * c)},${f1(468 - 170 * c)}) rotate(${f1(-16 * c)})`); f.cup.style.opacity = (o.noCup || o.hm) ? 0 : 1;
  f.hMouth.style.opacity = o.hm ? 1 : 0; f.hEyes.style.opacity = o.he ? 1 : 0;
  if (f.steam) f.steam.setAttribute('transform', `translate(0 ${f1(-((t * 22) % 14))})`);
}
function run(f, t, sp = 16, amp = 32) { const k = Math.sin(t * sp); return { legL: k * amp, legR: -k * amp }; }
const WHO = {}; W.forEach(x => (WHO[x.who] = WHO[x.who] || []).push(x));
function talkW(t, who, amp = 0.8) { for (const x of WHO[who] || []) { if (t >= x.s && t <= x.e) { const n = Math.max(1, Math.round((x.e - x.s) / 0.17)); return Math.abs(Math.sin((t - x.s) / (x.e - x.s) * Math.PI * n)) * amp; } } return 0; }
function svgLayer(parent, z = 1) { const d = el('div', parent, { left: 0, top: 0, width: '1080px', height: '1920px', zIndex: z }); d.innerHTML = `<svg width="1080" height="1920" viewBox="0 0 1080 1920" style="overflow:visible;position:absolute;left:0;top:0"></svg>`; return d.firstChild; }
function use(svg, href, w, h) { const u = document.createElementNS(NS, 'use'); u.setAttribute('href', href); u.setAttribute('width', w); u.setAttribute('height', h); svg.appendChild(u); return u; }
function placeU(u, x, y, w, o = {}) { let tr = `translate(${f1(x)},${f1(y)})`; if (o.r) tr += ` rotate(${f1(o.r)} ${f1(w / 2)} ${f1(w * 0.75)})`; if (o.flip) tr += ` translate(${f1(w)},0) scale(-1,1)`; if (o.s != null && o.s !== 1) tr += ` translate(${f1(w / 2)},${f1(w * 1.5)}) scale(${f1(o.s * 100) / 100}) translate(${f1(-w / 2)},${f1(-w * 1.5)})`; u.setAttribute('transform', tr); u.style.opacity = o.o == null ? 1 : o.o; }
function jag(seed, amt = 1.2, n = 10) { const r = rng(seed); const pts = []; for (let i = 0; i <= n; i++) pts.push([i / n * 100, r() * amt]); for (let i = 1; i <= n; i++) pts.push([100 - r() * amt, i / n * 100]); for (let i = n - 1; i >= 0; i--) pts.push([i / n * 100, 100 - r() * amt]); for (let i = n - 1; i >= 1; i--) pts.push([r() * amt, i / n * 100]); return 'polygon(' + pts.map(q => q[0].toFixed(2) + '% ' + q[1].toFixed(2) + '%').join(',') + ')'; }
function paperPiece(parent, x, y, w, h, o = {}) {
  const wrap = box(parent, x, y, w, h, { filter: `drop-shadow(9px 11px 0 ${SH})` });
  box(wrap, 0, 0, w, h, { background: '#fff', clipPath: jag(o.seed || 3, 1.4, 12) });
  const inner = box(wrap, 9, 9, w - 18, h - 18, { background: o.bg || '#F7F0E0', clipPath: jag((o.seed || 3) + 50, 0.8, 12), overflow: 'hidden' });
  if (!o.plain) box(inner, 0, 0, w - 18, h - 18, { background: 'radial-gradient(circle at 70% 30%, rgba(160,110,40,.0) 40%, rgba(160,110,40,.18) 100%)' });
  return { wrap, inner };
}
function chip(parent, x, y, html, o = {}) { return el('div', parent, { left: px(x), top: px(y), background: o.bg || PINK, color: o.color || '#fff', fontFamily: 'Bricolage', fontWeight: 800, fontSize: px(o.size || 36), padding: '8px 26px 10px', borderRadius: '100px', border: `4px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, whiteSpace: 'nowrap', lineHeight: 1.1, zIndex: o.z || 20 }, html); }
function stamp(parent, x, y, html, o = {}) { return el('div', parent, { left: px(x), top: px(y), border: `${o.bw || 9}px solid ${o.col || RED}`, color: o.col || RED, fontFamily: o.font || 'Rye', fontSize: px(o.size || 64), padding: '4px 26px 8px', borderRadius: '14px', whiteSpace: 'nowrap', mixBlendMode: o.blend || 'multiply', lineHeight: 1.05, letterSpacing: '0.04em', background: o.bg || 'rgba(200,16,46,.04)', zIndex: o.z || 30 }, html); }
function stampA(e, t, t0, r = -10, base = 1) { const k = p(t, t0, 0.18, E.outCubic); set(e, { s: t < t0 ? 0 : lerp(2.3, 1, k) * base, r, o: t < t0 ? 0 : clamp(k * 2) * 0.95 }); }
function popA(e, t, t0, o = {}) { const k = pop(t, t0, o.d || 0.42); set(e, { x: o.x || 0, y: (o.y || 0) + (o.rise ? (1 - clamp(k)) * o.rise : 0), s: k * (o.s || 1), r: o.r || 0, o: t < t0 ? 0 : (o.o == null ? 1 : o.o) }); }
const XSVG = `<svg viewBox="0 0 100 100" width="100%" height="100%" style="overflow:visible"><path d="M14,16 Q50,50 88,86 M86,12 Q50,50 14,88" stroke="#fff" stroke-width="24" stroke-linecap="round" fill="none"/><path d="M14,16 Q50,50 88,86 M86,12 Q50,50 14,88" stroke="${RED}" stroke-width="14" stroke-linecap="round" fill="none"/></svg>`;
const CHECK = `<svg viewBox="0 0 100 100" width="100%" height="100%" style="overflow:visible"><path d="M12,54 L40,82 L92,14" stroke="${INK}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
function hlSpan(txt, cls = 'hlb', col = YEL) { return `<span style="position:relative;display:inline-block;z-index:0"><span class="${cls}" style="position:absolute;left:-8px;right:-8px;bottom:4%;height:44%;background:${col};z-index:-1;transform-origin:left center;transform:scaleX(0);border-radius:4px 12px 6px 14px"></span>${txt}</span>`; }
function paint(e, t, t0, d = 0.35) { if (e) e.style.transform = `scaleX(${f1(p(t, t0, d, E.outCubic) * 1000) / 1000}) rotate(-1.2deg)`; }
function arrowSvg(d, col = PINK, w = 9) { return `<svg width="100%" height="100%" style="overflow:visible"><path d="${d}" stroke="${INK}" stroke-width="${w + 7}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`; }
function cropUse(sym, vb, w = 400, h = 600) { return `<svg viewBox="${vb}" width="100%" height="100%" style="overflow:hidden"><use href="#${sym}" width="${w}" height="${h}"/></svg>`; }
const AV = { MEREDITH: ['merS', '70 70 220 220', 360, 460], MINISTRO: ['minS', '60 30 240 240', 360, 460], VECINA: ['vecS', '100 30 220 260', 420, 520], EMU: ['emuS', '50 30 150 110', 400, 600], FAR: ['farS', '70 70 220 220', 360, 460], SOL: ['solS', '70 70 220 220', 360, 460] };
function avatar(parent, x, y, sz, who, o = {}) { const a = AV[who]; const d = box(parent, x, y, sz, sz, { borderRadius: '50%', overflow: 'hidden', background: o.bg || FIG, border: `${o.bw || 4}px solid ${INK}`, boxShadow: `4px 4px 0 ${SH}`, zIndex: o.z || 5 }); d.innerHTML = cropUse(a[0], a[1], a[2], a[3]); return d; }
function ground(parent, y = 1180) { const g = box(parent, 0, y, 1080, 30); g.innerHTML = `<svg width="1080" height="40"><path d="M0,8 Q270,0 540,10 T1080,6" stroke="${INK}" stroke-width="5" fill="none"/><path d="M0,14 H1080" stroke="${INK}" stroke-width="2" stroke-dasharray="3 9"/></svg>`; return g; }
function rays(parent, x, y, sz, n, c1, c2, z = 1) { const d = box(parent, x, y, sz, sz, { zIndex: z }); let s = ''; const h = sz / 2; for (let i = 0; i < n; i++) { const a0 = i / n * Math.PI * 2, a1 = (i + 0.5) / n * Math.PI * 2; s += `<path d="M${h},${h} L${f1(h + sz * Math.cos(a0))},${f1(h + sz * Math.sin(a0))} L${f1(h + sz * Math.cos(a1))},${f1(h + sz * Math.sin(a1))} Z" fill="${c1}"/>`; } d.innerHTML = `<svg viewBox="0 0 ${sz} ${sz}" width="${sz}" height="${sz}" style="overflow:visible"><rect x="${-sz}" y="${-sz}" width="${sz * 3}" height="${sz * 3}" fill="${c2}"/>${s}</svg>`; return d; }
const halftone = (parent, col = 'rgba(0,0,0,.13)', z = 1) => box(parent, 0, 0, 1080, 1920, { backgroundImage: `radial-gradient(${col} 3px, transparent 3.6px)`, backgroundSize: '22px 22px', zIndex: z });
const SHAKES = []; const shakeAt = (t0, d = 0.35, a = 14) => SHAKES.push([t0, d, a]);
const bulletSvg = (w = 26, h = 56) => `<svg width="${w}" height="${h}" viewBox="0 0 26 56"><path d="M4,22 Q13,-4 22,22 Z" fill="#c9a24a" stroke="${INK}" stroke-width="3"/><rect x="4" y="22" width="18" height="30" fill="${FIG}" stroke="${INK}" stroke-width="3"/><rect x="4" y="22" width="18" height="30" fill="url(#hA)"/></svg>`;
const casingSvg = (w = 30, h = 60) => `<svg width="${w}" height="${h}" viewBox="0 0 26 52" style="overflow:visible"><rect x="5" y="4" width="16" height="44" rx="3" fill="#e0b54e" stroke="${INK}" stroke-width="3"/><rect x="3" y="44" width="20" height="6" rx="2" fill="#c9a24a" stroke="${INK}" stroke-width="2.5"/><path d="M9,8 v34" stroke="#fff" stroke-width="3" opacity=".6"/></svg>`;

/* ---------- titulares ---------- */
const HLS = [];
function headline(t0, t1, str, o = {}) {
  const b = el('div', world, { left: '50px', top: px(o.y || 236), width: '980px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 800, fontSize: px(o.size || 78), lineHeight: 1.08, color: o.color || INK, zIndex: 500, letterSpacing: '-0.005em', textShadow: o.shadow || 'none' });
  const toks = []; const re = /\*([^*]+)\*|(\S+)/g; let m;
  while ((m = re.exec(str))) toks.push(m[1] ? { txt: m[1], key: true } : { txt: m[2], key: false });
  let cur = 0; while (cur < W.length && W[cur].e < t0 - 0.05) cur++;
  let prevT = t0 + 0.02; const spans = [], hls = [];
  toks.forEach(tk => {
    let tt = null;
    for (const wd of tk.txt.split(' ')) { const nw = normW(wd); if (!nw) continue; for (let j = cur; j < Math.min(W.length, cur + 12); j++) if (normW(W[j].w) === nw) { if (tt == null) tt = W[j].s; cur = j + 1; break; } }
    if (tt == null || tt > t1) tt = prevT + 0.07; tt = Math.max(tt, prevT); prevT = tt;
    const sp = document.createElement('span'); sp.style.display = 'inline-block'; sp.style.margin = '0 0.11em'; sp.style.position = 'relative';
    if (tk.key) { sp.style.fontStyle = 'italic'; sp.style.zIndex = 0; sp.innerHTML = `<span style="position:absolute;left:-10px;right:-10px;bottom:6%;height:42%;background:${o.hlc || YEL};z-index:-1;transform-origin:left center;border-radius:4px 12px 6px 14px"></span>${tk.txt}`; hls.push({ e: sp.firstChild, t: o.hlT != null ? o.hlT : tt }); if (o.keyColor) sp.style.color = o.keyColor; }
    else sp.textContent = tk.txt;
    b.appendChild(sp); spans.push({ e: sp, t: tt });
  });
  HLS.push({ b, t0, t1, spans, hls });
}

/* ---------- escenas ---------- */
const SC = [];
function scene(t0, t1, fn, o = {}) { const c = el('div', world, { left: 0, top: 0, width: '1080px', height: '1920px', zIndex: o.z || 10, overflow: o.clip ? 'hidden' : 'visible' }); SC.push({ c, t0, t1, fn, dir: o.dir || 1, cut: o.cut, exit: o.exit }); return c; }
function sceneBg(c, css) { return box(c, 0, 0, 1080, 1920, Object.assign({ zIndex: 0 }, css)); }
// golpe de color (página entera)
function colorHit(t0, t1, col, build) { const c = scene(t0, t1, null, { z: 700, cut: true }); sceneBg(c, { background: col }); halftone(c, 'rgba(0,0,0,.10)', 1); const fn = build(c); SC[SC.length - 1].fn = fn; return c; }
const SIL = 'brightness(0)';
