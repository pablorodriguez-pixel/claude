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
function circle(x, y, r, o = {}) { r = Math.max(0, r); ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); if (o.fill) { ctx.fillStyle = o.fill; ctx.fill(); } if (o.stroke !== null) { ctx.lineWidth = o.w || 3; ctx.strokeStyle = o.stroke || C.line; ctx.stroke(); } }
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


// ── dibujos originales extra ──
function skull(x, y, s, color = C.red, lw = 3) {        // calavera con huesos cruzados
  ctx.save(); ctx.translate(x, y); ctx.lineWidth = lw; ctx.strokeStyle = color; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-s * .85, s * .55); ctx.lineTo(s * .85, s * 1.05); ctx.moveTo(s * .85, s * .55); ctx.lineTo(-s * .85, s * 1.05); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, s * .62, Math.PI * .85, Math.PI * 2.15); ctx.lineTo(s * .36, s * .62); ctx.lineTo(-s * .36, s * .62); ctx.closePath(); ctx.fillStyle = 'rgba(5,32,42,.85)'; ctx.fill(); ctx.stroke();
  circle(-s * .24, -s * .02, s * .15, { fill: color, stroke: null }); circle(s * .24, -s * .02, s * .15, { fill: color, stroke: null });
  line(-s * .12, s * .4, -s * .12, s * .62, color, lw); line(s * .12, s * .4, s * .12, s * .62, color, lw); ctx.restore();
}
function glass(x, y, s, color = C.line, fill = null, lw = 3) {   // copa (x centro, y borde superior)
  ctx.save(); ctx.translate(x, y); ctx.lineWidth = lw; ctx.strokeStyle = color; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-s * .45, 0); ctx.quadraticCurveTo(-s * .5, s * .75, 0, s * .8); ctx.quadraticCurveTo(s * .5, s * .75, s * .45, 0); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); } ctx.stroke();
  line(0, s * .8, 0, s * 1.35, color, lw); line(-s * .3, s * 1.38, s * .3, s * 1.38, color, lw); ctx.restore();
}
function truck(x, y, s, color = C.line, lw = 3) {   // camión de línea (x centro, y suelo)
  ctx.save(); ctx.translate(x, y); ctx.lineWidth = lw; ctx.strokeStyle = color; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.rect(-s * .9, -s * .85, s * 1.15, s * .7); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(s * .3, -s * .65); ctx.lineTo(s * .7, -s * .65); ctx.lineTo(s * .95, -s * .35); ctx.lineTo(s * .95, -s * .15); ctx.lineTo(s * .3, -s * .15); ctx.closePath(); ctx.stroke();
  circle(-s * .5, -s * .1, s * .15, { fill: 'rgba(5,32,42,.9)', stroke: color, w: lw }); circle(s * .6, -s * .1, s * .15, { fill: 'rgba(5,32,42,.9)', stroke: color, w: lw }); ctx.restore();
}
function ball(x, y, r, color = C.line, lw = 3) {   // pelota
  circle(x, y, r, { w: lw, stroke: color });
  ctx.save(); ctx.beginPath(); ctx.arc(x - r * 1.05, y, r * .95, -.9, .9); ctx.strokeStyle = color; ctx.lineWidth = lw * .7; ctx.stroke();
  ctx.beginPath(); ctx.arc(x + r * 1.05, y, r * .95, Math.PI - .9, Math.PI + .9); ctx.stroke(); ctx.restore();
}
function bunting(x1, x2, y, t0, t) {   // banderines de fiesta
  const n = 9, cols = [C.accent, C.mint, C.line];
  if (t < t0 - .05) return;
  ctx.save(); ctx.beginPath(); for (let i = 0; i <= 60; i++) { const f = i / 60, xx = lerp(x1, x2, f), yy = y + Math.sin(f * Math.PI) * 34; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
  ctx.strokeStyle = C.soft; ctx.lineWidth = 2; ctx.stroke();
  for (let i = 0; i < n; i++) { const f = (i + .5) / n, a = easeBack(seg(t, t0 + i * .06, t0 + i * .06 + .3)); if (a <= 0) continue;
    const xx = lerp(x1, x2, f), yy = y + Math.sin(f * Math.PI) * 34; ctx.save(); ctx.translate(xx, yy); ctx.scale(a, a); ctx.beginPath(); ctx.moveTo(-16, 0); ctx.lineTo(16, 0); ctx.lineTo(0, 34); ctx.closePath(); ctx.fillStyle = cols[i % 3]; ctx.globalAlpha *= .85; ctx.fill(); ctx.restore(); }
  ctx.restore();
}
function bubble(x, y, w, h, text, color = C.line, o = {}) {   // bocadillo de diálogo (cola abajo-izquierda)
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.translate(x, y); if (o.scale) ctx.scale(o.scale, o.scale);
  rrect(-w / 2, -h / 2, w, h, 26); ctx.fillStyle = 'rgba(5,32,42,.92)'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = color; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-w / 2 + 50, h / 2 - 2); ctx.lineTo(-w / 2 + 30, h / 2 + 34); ctx.lineTo(-w / 2 + 90, h / 2 - 2); ctx.fillStyle = 'rgba(5,32,42,.92)'; ctx.fill(); ctx.strokeStyle = color; ctx.stroke();
  txt(text, 0, 0, o.size || 40, color, { weight: 800 }); ctx.restore();
}
// titular fijo arriba con efecto de escritura (como en los reels de referencia)
function headline(l1, l2, t0, t, o = {}) {
  const per = o.cps || 38, n1 = Math.floor((t - t0) * per), n2 = Math.floor((t - t0 - l1.length / per - .1) * per);
  const a = o.alpha ?? 1; if (n1 <= 0) return;
  txt(l1.slice(0, n1), 90, o.y || 250, o.size || 64, C.line, { align: 'left', weight: 800, alpha: a });
  if (l2 && n2 > 0) txt(l2.slice(0, n2), 90, (o.y || 250) + (o.size || 64) * 1.15, o.size || 64, o.color2 || C.accent, { align: 'left', weight: 800, alpha: a });
}

// indicador de capítulos (dónde estás en el vídeo): activo en acento, hechos en menta, pendientes atenuados
function stepper(labels, active, y = 178) {
  ctx.save(); ctx.font = `700 22px ${MONO}`; ctx.letterSpacing = '1px';
  const pad = 22, gap = 12, ws = labels.map(s => ctx.measureText(s).width + pad * 2); let x = 90;
  labels.forEach((s, i) => { const w = ws[i], on = i === active, done = i < active; rrect(x, y - 21, w, 42, 21);
    if (on) { ctx.fillStyle = C.accent; ctx.fill(); } else { ctx.strokeStyle = done ? C.mint : C.faint; ctx.lineWidth = 2; ctx.stroke(); }
    ctx.fillStyle = on ? C.ink : (done ? C.mint : 'rgba(230,255,247,.45)'); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(s, x + pad, y + 1); x += w + gap; });
  ctx.restore();
}

// ── render(t): fondo + escena (barrido de escaneo al entrar) + subtítulos ──
function render(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;
  background();
  const s = TL.scenes.find(s => t >= s.start - .02 && t < s.end + .2) || (t < TL.scenes[0].start ? TL.scenes[0] : null);   // antes de la primera palabra ya se ve la primera escena
  if (!s) return;
  const first = s === TL.scenes[0];   // el primer fotograma ya tiene que impactar: sin fundido ni barrido
  const lt = t - s.start, aIn = first ? 1 : easeOut(seg(lt, 0, .25)), aOut = 1 - easeOut(seg(lt, s.dur + .02, s.dur + .25));
  const sweep = first ? 1 : easeOut(seg(lt, 0, .55));
  ctx.save();
  ctx.globalAlpha = clamp(aIn * aOut);
  const z = 1 + .03 * (lt / s.dur);
  ctx.translate(W / 2, 760); ctx.scale(z, z); ctx.translate(-W / 2, -760);
  ctx.beginPath(); ctx.rect(-40, -40, W + 80, lerp(0, 1500, sweep)); ctx.clip();
  DRAW[s.name](t, lt, s);
  ctx.restore();
  if (sweep < 1) { ctx.save(); ctx.globalAlpha = (1 - sweep) * .9; line(0, lerp(0, 1500, sweep), W, lerp(0, 1500, sweep), C.accent, 3); ctx.restore(); }
  if (window.CHAPTERS && CHAPTERS.map[s.name] >= 0) { ctx.save(); ctx.globalAlpha = clamp(aOut); stepper(CHAPTERS.labels, CHAPTERS.map[s.name]); ctx.restore(); }
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
  ctx.save(); ctx.globalAlpha *= seg(lt, .15, .5); ctx.font = `800 96px ${MONO}`; ctx.letterSpacing = '0px'; ctx.textBaseline = 'middle'; const wc = ctx.measureText('cero').width, wu = ctx.measureText('uno').width;
  ctx.textAlign = 'left'; ctx.fillStyle = C.line; ctx.fillText('cero', W / 2 - (wc + wu) / 2, 900); ctx.fillStyle = C.accent; ctx.fillText('uno', W / 2 - (wc + wu) / 2 + wc, 900); ctx.restore();
  txt('@cerouno.tv', W / 2, 985, 34, C.label, { alpha: seg(lt, .3, .7), weight: 600, ls: 3 });
  const bp = easeBack(seg(lt, .5, 1)), pressed = seg(t, tS + .05, tS + .35) > .5, pulse = 1 + (pressed ? 0 : .04 * Math.sin(t * 6));
  ctx.save(); ctx.translate(W / 2, 1170); const sc = bp * pulse * (pressed ? .95 : 1); ctx.scale(sc, sc);
  rrect(-270, -70, 540, 140, 70); ctx.fillStyle = pressed ? C.mint : C.accent; ctx.fill();
  txt(pressed ? '✓ SIGUIENDO' : '+ SEGUIR', 0, 4, 54, C.ink, { weight: 800, ls: 3 }); ctx.restore();
  const cx = lerp(W / 2 + 330, W / 2 + 110, easeOut(seg(t, tS - .5, tS + .05))), cy = lerp(1400, 1205, easeOut(seg(t, tS - .5, tS + .05)));
  if (t > tS - .6) { ctx.save(); ctx.translate(cx, cy + (pressed ? 8 : 0)); ctx.fillStyle = '#fff'; ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 92); ctx.lineTo(24, 70); ctx.lineTo(44, 112); ctx.lineTo(64, 102); ctx.lineTo(44, 62); ctx.lineTo(78, 60); ctx.closePath(); ctx.stroke(); ctx.fill(); ctx.restore(); }
}

// ── piezas extra para los episodios 7-10 ──
function hat(x, y, s, white) {                 // chistera sobre la cabeza de person(x, y, s)
  const top = y - 1.05 * s; ctx.save(); ctx.lineWidth = Math.max(2, s * .03); ctx.strokeStyle = white ? C.line : C.line;
  ctx.fillStyle = white ? '#f4fffb' : '#071a1f';
  ctx.beginPath(); ctx.rect(x - s * .15, top - s * .2, s * .3, s * .2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.rect(x - s * .24, top - s * .015, s * .48, s * .05); ctx.fill(); ctx.stroke(); ctx.restore();
}
function check(x, y, s, col = C.mint) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = s * .18; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s * .4, y); ctx.lineTo(x - s * .1, y + s * .3); ctx.lineTo(x + s * .45, y - s * .35); ctx.stroke(); ctx.restore(); }
function stamp(text, x, y, size, col, k, rot = -.08, pad = 40) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.font = `800 ${size}px ${MONO}`; ctx.letterSpacing = '3px'; const w = ctx.measureText(text).width + pad * 2;
  rrect(-w / 2, -size * .85, w, size * 1.7, 22); ctx.fillStyle = 'rgba(5,32,42,.93)'; ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.stroke(); ctx.restore(); txt(text, x, y + 4, size, col, { weight: 800, ls: 3, scale: k }); }

// ── piezas para los vídeos de decisiones (¿te compensa?) ──
function band(text, size, col, a, y = 470, sc = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = 'rgba(5,32,42,.84)'; ctx.fillRect(0, y - size * .9, W, size * 1.8); ctx.restore(); txt(text, 540, y + 4, size, col, { weight: 800, alpha: a, scale: sc }); }
function choice2(t, a, labA, labB, picked = -1, y = 690) { if (a <= 0) return; const p = (i, x, lab, col) => { const on = picked === i, sc = a * (picked < 0 ? 1 + .04 * Math.sin(t * 6 + i * 2) : (on ? 1.06 : .94));
    ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); rrect(-215, -58, 430, 116, 58); ctx.fillStyle = on ? col : 'rgba(5,32,42,.92)'; ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.stroke(); txt(lab, 0, 4, 46, on ? C.ink : col, { weight: 800, ls: 2 }); ctx.restore(); };
  p(0, 300, labA, C.mint); p(1, 780, labB, C.accent); }
const eur = (v, d = 2) => (v < 0 ? '−' : '') + Math.abs(v).toFixed(d).replace('.', ',') + ' €';
function bigNum(text, y, size, col, k = 1) { if (k > 0) txt(text, 540, y, size, col, { weight: 800, scale: k }); }
