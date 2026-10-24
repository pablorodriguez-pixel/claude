// Librería común: estilo "plano técnico" en turquesa con acento coral.
// Todo se dibuja a partir de t (segundos) → render determinista, sin estado.
const W = 1080, H = 1920;
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const seg = (t, a, b) => clamp((t - a) / (b - a));
const easeOut = x => 1 - Math.pow(1 - clamp(x), 3);
const easeIO = x => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const easeBack = x => { x = clamp(x); if (x <= 0) return 0; if (x >= 1) return 1; const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;

const C = { line: '#e6fff7', soft: 'rgba(230,255,247,.55)', faint: 'rgba(230,255,247,.22)', label: '#8fd3c4',
            accent: '#ff8f6b', mint: '#7ef0c8', red: '#ff5d73', ink: '#06232a' };
const MONO = "'JetBrains Mono', 'DejaVu Sans Mono', monospace";
const fmt = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
const SC = {}; TL.scenes.forEach(s => SC[s.name] = s);
function wt(scene, word, nth = 0) {   // instante absoluto en que se dice la n-ésima aparición de una palabra
  const s = SC[scene]; let k = 0;
  for (const w of s.words) if (norm(w.w) === norm(word)) { if (k++ === nth) return s.start + w.t; }
  throw new Error('palabra no encontrada: ' + scene + ':' + word + '#' + nth);
}

function txt(s, x, y, size, color, o = {}) {
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.translate(x, y); if (o.scale) ctx.scale(o.scale, o.scale);
  ctx.font = `${o.weight || 700} ${size}px ${MONO}`; ctx.textAlign = o.align || 'center'; ctx.textBaseline = o.base || 'middle';
  ctx.letterSpacing = (o.ls || 0) + 'px'; ctx.fillStyle = color; ctx.fillText(s, 0, 0); ctx.restore();
}
function line(x1, y1, x2, y2, color = C.line, w = 3) { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineWidth = w; ctx.strokeStyle = color; ctx.stroke(); }
function circle(x, y, r, o = {}) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); if (o.fill) { ctx.fillStyle = o.fill; ctx.fill(); } if (o.stroke !== null) { ctx.lineWidth = o.w || 3; ctx.strokeStyle = o.stroke || C.line; ctx.stroke(); } }
function rrect(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }

function bottle(x, y, w, h, color = C.line, lw = 2, fill = null) {
  const nw = w * .32, sh = h * .34;
  ctx.beginPath(); ctx.moveTo(x - nw / 2, y); ctx.lineTo(x - nw / 2, y + sh * .7); ctx.quadraticCurveTo(x - w / 2, y + sh, x - w / 2, y + sh * 1.5);
  ctx.lineTo(x - w / 2, y + h - 2); ctx.quadraticCurveTo(x - w / 2, y + h, x - w / 2 + 2, y + h); ctx.lineTo(x + w / 2 - 2, y + h);
  ctx.quadraticCurveTo(x + w / 2, y + h, x + w / 2, y + h - 2); ctx.lineTo(x + w / 2, y + sh * 1.5); ctx.quadraticCurveTo(x + w / 2, y + sh, x + nw / 2, y + sh * .7);
  ctx.lineTo(x + nw / 2, y); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); } ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.strokeStyle = color; ctx.stroke();
}
function person(x, y, s, color = C.line, fill = null, lw = 3) {   // (x = centro, y = pies, s = alto)
  const P = [[-.20, -.26], [-.31, -.14], [-.33, .08], [-.25, .08], [-.22, -.10], [-.14, -.10], [-.14, .5], [-.02, .5], [-.02, .12], [.02, .12], [.02, .5], [.14, .5], [.14, -.10], [.22, -.10], [.25, .08], [.33, .08], [.31, -.14], [.20, -.26]];
  ctx.save(); ctx.translate(x, y - s * .5); ctx.beginPath();
  P.forEach(([a, b], i) => i ? ctx.lineTo(a * s, b * s) : ctx.moveTo(a * s, b * s)); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); } ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.strokeStyle = color; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, -.42 * s, .13 * s, 0, Math.PI * 2); if (fill) ctx.fill(); ctx.stroke(); ctx.restore();
}
function zzz(x, y, s, t) { txt('z', x + s * .26, y - s * (.95 + .04 * Math.sin(t * 5)), s * .2, C.mint, { weight: 800 }); txt('z', x + s * .38, y - s * (1.1 + .04 * Math.sin(t * 5 + 1)), s * .27, C.mint, { weight: 800 }); }
function clock(cx, cy, R, ang) {
  circle(cx, cy, R, { w: 4 });
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; line(cx + Math.sin(a) * (R - 22), cy - Math.cos(a) * (R - 22), cx + Math.sin(a) * (R - 8), cy - Math.cos(a) * (R - 8), C.line, 3); }
  line(cx, cy, cx + Math.sin(ang) * (R - 40), cy - Math.cos(ang) * (R - 40), C.accent, 5); circle(cx, cy, 8, { fill: C.line, stroke: null });
}

function background() {
  const g = ctx.createRadialGradient(W / 2, H * .38, 80, W / 2, H * .45, 1300);
  g.addColorStop(0, '#0f5560'); g.addColorStop(.6, '#0a3d47'); g.addColorStop(1, '#05202a');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 60) { ctx.strokeStyle = (x % 180 === 0) ? 'rgba(150,235,215,.15)' : 'rgba(150,235,215,.065)'; ctx.beginPath(); ctx.moveTo(x + .5, 0); ctx.lineTo(x + .5, H); ctx.stroke(); }
  for (let y = 0; y <= H; y += 60) { ctx.strokeStyle = (y % 180 === 0) ? 'rgba(150,235,215,.15)' : 'rgba(150,235,215,.065)'; ctx.beginPath(); ctx.moveTo(0, y + .5); ctx.lineTo(W, y + .5); ctx.stroke(); }
}

function hud(side, label, value, o = {}) {
  const x = side === 'L' ? 100 : W - 100, al = side === 'L' ? 'left' : 'right', a = o.alpha ?? 1;
  txt(label, x, 252, 24, C.label, { align: al, weight: 500, ls: 3, alpha: a });
  let ux = 0;
  if (o.unit) { ctx.save(); ctx.font = `600 24px ${MONO}`; ctx.letterSpacing = '2px'; ux = ctx.measureText(o.unit).width + 14; ctx.restore(); }
  txt(value, side === 'R' ? x - ux : x, 322, o.size || 84, o.color || C.line, { align: al, weight: 800, alpha: a });
  if (o.unit) { ctx.save(); ctx.font = `800 ${o.size || 84}px ${MONO}`; const w = ctx.measureText(value).width; ctx.restore();
    txt(o.unit, side === 'L' ? x + w + 14 : x, 336, 24, C.line, { align: al, weight: 600, ls: 2, alpha: a }); }
}

// subtítulos por palabra (la actual en acento)
const CHUNKS = [];
TL.scenes.forEach(s => {
  let cur = [], len = 0;
  s.words.forEach((w, i) => {
    cur.push({ ...w, abs: s.start + w.t }); len += w.w.length + 1;
    const stop = /[.,:;?!…]$/.test(w.w) && cur.length >= 2;
    if (len > 22 || cur.length >= 4 || stop || i === s.words.length - 1) { CHUNKS.push({ words: cur, scene: s }); cur = []; len = 0; }
  });
});
function captions(t) {
  let ch = null;
  for (let i = 0; i < CHUNKS.length; i++) {
    const c = CHUNKS[i], st = c.words[0].abs;
    const en = i + 1 < CHUNKS.length && CHUNKS[i + 1].scene === c.scene ? CHUNKS[i + 1].words[0].abs : c.scene.start + c.scene.dur + .15;
    if (t >= st - .02 && t < en) { ch = c; break; }
  }
  if (!ch) return;
  const size = 64; ctx.font = `800 ${size}px ${MONO}`; ctx.letterSpacing = '0px';
  const sp = ctx.measureText(' ').width, full = [[]]; let wl = 0;
  ch.words.forEach(w => { const ww = ctx.measureText(w.w).width; if (wl + ww > 780 && full[full.length - 1].length) { full.push([]); wl = 0; } full[full.length - 1].push(w); wl += ww + sp; });
  full.forEach((ln, li) => {
    const widths = ln.map(w => ctx.measureText(w.w).width), tot = widths.reduce((a, b) => a + b, 0) + sp * (ln.length - 1);
    let x = W / 2 - tot / 2;
    ln.forEach((w, i) => {
      if (t >= w.abs - .02) {
        const act = t < w.abs + Math.max(w.d, .22), a = easeOut(seg(t, w.abs - .02, w.abs + .08));
        txt(w.w, x, 1400 + li * 80 + (1 - a) * 8, size, act ? C.accent : C.line, { align: 'left', weight: 800, alpha: a });
      }
      x += widths[i] + sp;
    });
  });
}

function bottleGrid(n, cols, x0, y0, cw, ch, alphaFn, colorFn) {
  const bw = cw * .5, bh = ch * .85;
  for (let i = 0; i < n; i++) {
    const a = alphaFn(i); if (a <= 0.01) continue;
    const col = i % cols, row = Math.floor(i / cols);
    ctx.save(); ctx.globalAlpha *= a; bottle(x0 + col * cw + cw / 2, y0 + row * ch, bw, bh, colorFn ? colorFn(i) : C.line, 1.4); ctx.restore();
  }
}
function peopleRow(n, x0, dx, y, s, t0, o = {}) {
  for (let i = 0; i < n; i++) {
    const a = easeOut(seg(o.t, t0 + i * (o.step ?? .12), t0 + i * (o.step ?? .12) + .3)); if (a <= 0) continue;
    const col = o.color ? o.color(i) : C.line;
    ctx.save(); ctx.globalAlpha *= a; person(x0 + i * dx, y, s, col, null, o.lw || 3);
    txt(o.label ? o.label(i) : String(i + 1), x0 + i * dx, y + 34, 24, col === C.line ? C.label : col, { weight: 700 }); ctx.restore();
  }
}

// ── render(t): fondo + escena (barrido de escaneo al entrar) + subtítulos ──
function render(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;
  background();
  const s = TL.scenes.find(s => t >= s.start - .02 && t < s.end + .2);
  if (!s) return;
  const lt = t - s.start, aIn = easeOut(seg(lt, 0, .25)), aOut = 1 - easeOut(seg(lt, s.dur + .02, s.dur + .25));
  const sweep = easeOut(seg(lt, 0, .55));
  ctx.save();
  ctx.globalAlpha = clamp(aIn * aOut);
  const z = 1 + .03 * (lt / s.dur);
  ctx.translate(W / 2, 760); ctx.scale(z, z); ctx.translate(-W / 2, -760);
  ctx.beginPath(); ctx.rect(-40, -40, W + 80, lerp(0, 1500, sweep)); ctx.clip();
  DRAW[s.name](t, lt, s);
  ctx.restore();
  if (sweep < 1) { ctx.save(); ctx.globalAlpha = (1 - sweep) * .9; line(0, lerp(0, 1500, sweep), W, lerp(0, 1500, sweep), C.accent, 3); ctx.restore(); }
  ctx.save(); ctx.globalAlpha = clamp(aOut); captions(t); ctx.restore();
}
window.render = render;
window.getFrame = (t, q) => { render(t); return cv.toDataURL('image/jpeg', q || .92).split(',')[1]; };

function drawCta(t, lt, tS) {   // cierre común: marca + botón seguir
  const p = easeBack(seg(lt, 0, .5));
  ctx.save(); ctx.translate(W / 2, 600); ctx.scale(1.1 * p, 1.1 * p); ctx.translate(-170, -170);
  rrect(0, 0, 340, 340, 84); ctx.fillStyle = 'rgba(5,32,42,.92)'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.line; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(124, 170, 58, 84, 0, 0, Math.PI * 2); ctx.lineWidth = 30; ctx.strokeStyle = C.accent; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(232, 112); ctx.lineTo(262, 90); ctx.lineTo(262, 250); ctx.lineWidth = 30; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#fff'; ctx.stroke();
  ctx.restore();
  txt('CERO Y UNO', W / 2, 900, 76, C.line, { alpha: seg(lt, .15, .5), weight: 800, ls: 4 });
  txt('ACERTIJOS DE MATEMÁTICAS', W / 2, 980, 28, C.label, { alpha: seg(lt, .3, .7), weight: 500, ls: 5 });
  const bp = easeBack(seg(lt, .5, 1)), pressed = seg(t, tS + .05, tS + .35) > .5, pulse = 1 + (pressed ? 0 : .04 * Math.sin(t * 6));
  ctx.save(); ctx.translate(W / 2, 1170); const sc = bp * pulse * (pressed ? .95 : 1); ctx.scale(sc, sc);
  rrect(-270, -70, 540, 140, 70); ctx.fillStyle = pressed ? C.mint : C.accent; ctx.fill();
  txt(pressed ? '✓ SIGUIENDO' : '+ SEGUIR', 0, 4, 54, C.ink, { weight: 800, ls: 3 }); ctx.restore();
  const cx = lerp(W / 2 + 330, W / 2 + 110, easeOut(seg(t, tS - .5, tS + .05))), cy = lerp(1400, 1205, easeOut(seg(t, tS - .5, tS + .05)));
  if (t > tS - .6) { ctx.save(); ctx.translate(cx, cy + (pressed ? 8 : 0)); ctx.fillStyle = '#fff'; ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 92); ctx.lineTo(24, 70); ctx.lineTo(44, 112); ctx.lineTo(64, 102); ctx.lineTo(44, 62); ctx.lineTo(78, 60); ctx.closePath(); ctx.stroke(); ctx.fill(); ctx.restore(); }
}
