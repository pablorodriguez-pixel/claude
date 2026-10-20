// Motor de render: utilidades, stickman, HUD, subtítulos y overlays.
const W = 720, H = 1280;
const cv = document.getElementById('c');
const ctx = cv.getContext('2d');
const PI = Math.PI, TAU = PI * 2;
const cl = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, t) => a + (b - a) * t;
const E = {
  out: x => 1 - Math.pow(1 - cl(x), 3),
  inout: x => { x = cl(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; },
  back: x => { x = cl(x); const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); },
};
function hash(n) { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }
function noise1(x) { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return lerp(hash(i), hash(i + 1), u); }

// ---------- dibujo básico ----------
function rr(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
function fillRR(x, y, w, h, r, c) { rr(x, y, w, h, r); ctx.fillStyle = c; ctx.fill(); }
function circle(x, y, r, c) { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = c; ctx.fill(); }
function lin(x0, y0, x1, y1, stops) { const g = ctx.createLinearGradient(x0, y0, x1, y1); stops.forEach(([o, c]) => g.addColorStop(o, c)); return g; }
function rad(x, y, r0, r1, stops) { const g = ctx.createRadialGradient(x, y, r0, x, y, r1); stops.forEach(([o, c]) => g.addColorStop(o, c)); return g; }
function vignette(a = .6, inner = .35) { ctx.fillStyle = rad(W / 2, H / 2, H * inner, H * .8, [[0, 'rgba(0,0,0,0)'], [1, `rgba(0,0,0,${a})`]]); ctx.fillRect(0, 0, W, H); }
function glow(x, y, r, c) { ctx.fillStyle = rad(x, y, 0, r, [[0, c], [1, 'rgba(0,0,0,0)']]); ctx.fillRect(x - r, y - r, r * 2, r * 2); }
function font(px, fam = 'Montserrat', w = 800) { ctx.font = `${w} ${px}px ${fam}`; }
function text(s, x, y, o = {}) {
  ctx.save(); font(o.size || 30, o.fam || 'Montserrat', o.w || 800);
  ctx.textAlign = o.align || 'center'; ctx.textBaseline = o.base || 'middle';
  ctx.letterSpacing = (o.ls || 0) + 'px';
  if (o.stroke) { ctx.lineJoin = 'round'; ctx.lineWidth = o.sw || 8; ctx.strokeStyle = o.stroke; ctx.strokeText(s, x, y); }
  if (o.shadow) { ctx.shadowColor = o.shadow; ctx.shadowBlur = o.blur || 20; }
  ctx.fillStyle = o.color || '#fff'; ctx.fillText(s, x, y); ctx.restore();
}
function measure(s, size, fam = 'Montserrat', w = 800, ls = 0) { ctx.save(); font(size, fam, w); ctx.letterSpacing = ls + 'px'; const m = ctx.measureText(s).width; ctx.restore(); return m; }
function wrap(s, size, maxW, fam, w, ls = 0) {
  const words = s.split(' '), lines = []; let cur = '';
  for (const wd of words) { const t = cur ? cur + ' ' + wd : wd; if (measure(t, size, fam, w, ls) > maxW && cur) { lines.push(cur); cur = wd; } else cur = t; }
  if (cur) lines.push(cur); return lines;
}
function particles(n, seed, fn) { for (let i = 0; i < n; i++) fn(hash(seed + i * 1.37), hash(seed + i * 2.71), hash(seed + i * 4.13), i); }

// ---------- stickman ----------
const L = { th: 31, sh: 31, to: 50, ua: 27, la: 26, hr: 17 };
const POSES = {
  stand: t => ({ lt: -.07, rt: .07, la1: -.12, la2: .12, ra1: .12, ra2: .15, bob: Math.sin(t * 2) * .6 }),
  walk: t => { const p = t * 6.5, s = Math.sin(p); return { lt: s * .45, rt: -s * .45, ls: Math.max(0, -Math.cos(p)) * .7, rs: Math.max(0, Math.cos(p)) * .7, la1: -s * .45, la2: .3, ra1: s * .45, ra2: .3, tor: .06, bob: -Math.abs(Math.cos(p)) * 3 }; },
  run: t => { const p = t * 10, s = Math.sin(p); return { lt: s * .8, rt: -s * .8, ls: Math.max(0, -Math.cos(p)) * 1.4, rs: Math.max(0, Math.cos(p)) * 1.4, la1: -s * .9, la2: 1.3, ra1: s * .9, ra2: 1.3, tor: .3, bob: -Math.abs(Math.cos(p)) * 6 }; },
  sit: t => ({ hipH: 31, lt: 1.45, ls: 1.45, rt: 1.6, rs: 1.6, la1: .35, la2: .9, ra1: .45, ra2: .9, bob: Math.sin(t * 2) * .5 }),
  sitdown: t => ({ hipH: 31, lt: 1.45, ls: 1.45, rt: 1.6, rs: 1.6, la1: .5, la2: 1.0, ra1: .55, ra2: 1.0, tor: .18, head: .35 }),
  sittype: t => ({ hipH: 31, lt: 1.45, ls: 1.45, rt: 1.6, rs: 1.6, la1: .9 + Math.sin(t * 14) * .05, la2: .7, ra1: 1 + Math.sin(t * 13 + 1) * .05, ra2: .6, tor: .12, head: .1 }),
  sitwrite: t => ({ hipH: 31, lt: 1.45, ls: 1.45, rt: 1.6, rs: 1.6, la1: .9, la2: .8, ra1: 1.0 + Math.sin(t * 9) * .06, ra2: .9 + Math.sin(t * 11) * .1, tor: .35, head: .3 }),
  sitpanic: t => ({ hipH: 31, lt: 1.45, ls: 1.45, rt: 1.6, rs: 1.6, la1: 2.75, la2: 2.3, ra1: 2.8, ra2: 2.3, tor: .05 + Math.sin(t * 30) * .01 }),
  sitcollapse: t => ({ hipH: 31, lt: 1.45, ls: 1.45, rt: 1.6, rs: 1.6, la1: 1.5, la2: .2, ra1: 1.55, ra2: .2, tor: 1.05, head: .5 }),
  sitrelax: t => ({ hipH: 31, lt: 1.3, ls: 1.1, rt: 1.5, rs: 1.3, la1: 2.6, la2: 2.5, ra1: .7, ra2: 1.9, tor: -.18, head: -.1 }),
  sitmug: t => ({ hipH: 31, lt: 1.45, ls: 1.45, rt: 1.6, rs: 1.6, la1: .35, la2: .9, ra1: .5, ra2: 1.9, bob: Math.sin(t * 2) * .5 }),
  scared: t => { const j = Math.sin(t * 40) * .03; return { lt: -.3, ls: .5, rt: .35, rs: .6, la1: 2.2 + j, la2: 1.3, ra1: 2.4 - j, ra2: 1.2, tor: -.1, hipH: 56 }; },
  point: t => ({ lt: -.07, rt: .07, la1: -.1, la2: .1, ra1: 1.45, ra2: .05 }),
  wave: t => ({ lt: -.07, rt: .07, la1: -.12, la2: .1, ra1: 2.7 + Math.sin(t * 8) * .25, ra2: .4 }),
  phone: t => ({ lt: -.07, rt: .07, la1: -.1, la2: .1, ra1: .55, ra2: 2.0, head: .25 }),
  mug: t => ({ lt: -.07, rt: .07, la1: -.12, la2: .12, ra1: .4, ra2: 1.9 }),
  walkmug: t => { const p = POSES.walk(t); return { ...p, ra1: .4, ra2: 1.9 }; },
  cross: t => ({ lt: -.1, rt: .1, la1: .5, la2: 2.3, ra1: .45, ra2: 2.35, bob: Math.sin(t * 2) * .5 }),
  thumbs: t => ({ lt: -.1, rt: .1, la1: -.1, la2: .1, ra1: 1.2, ra2: 1.5 }),
  shield: t => { const p = POSES.walk(t * .7); return { ...p, la1: 2.6, la2: 2.2, ra1: 2.7, ra2: 2.2, tor: .15 }; },
  look: t => ({ lt: -.07, rt: .07, la1: -.1, la2: .1, ra1: .1, ra2: .1, head: -.25 }),
  lie: t => ({ lt: .05, rt: -.05, la1: .1, la2: 0, ra1: .2, ra2: .2, bob: Math.sin(t * 1.5) * .4 }),
  huddle: t => ({ hipH: 26, lt: 2.2, ls: 2.6, rt: 2.3, rs: 2.7, la1: 1.6, la2: 1.6, ra1: 1.7, ra2: 1.6, tor: .5, head: .4 }),
};
const dir = a => [Math.sin(a), Math.cos(a)];
function seg(pts, w, col) { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.lineWidth = w; ctx.strokeStyle = col; ctx.stroke(); }
// o: {x,y,s,pose,t,face,body,line,acc:[],expr,look,faceless,alpha}
function stick(o) {
  const s = o.s || 1, f = o.face || 1, t = o.t || 0;
  const P = Object.assign({ lt: 0, rt: 0, ls: 0, rs: 0, la1: 0, la2: 0, ra1: 0, ra2: 0, tor: 0, bob: 0, head: 0 }, POSES[o.pose || 'stand'](t), o.over || {});
  const body = o.body || '#e9e9ee', line = o.line || '#15151b', acc = o.acc || [];
  ctx.save(); ctx.translate(o.x, o.y); if (o.rot) ctx.rotate(o.rot); ctx.scale(s * f, s);
  if (o.alpha != null) ctx.globalAlpha = o.alpha;
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const hip = [0, -(P.hipH ?? (L.th + L.sh)) + P.bob];
  const up = [Math.sin(P.tor), -Math.cos(P.tor)];
  const neck = [hip[0] + up[0] * L.to, hip[1] + up[1] * L.to];
  const sh = [neck[0] - up[0] * 6, neck[1] - up[1] * 6];
  const leg = (a, b) => { const k = [hip[0] + dir(a)[0] * L.th, hip[1] + dir(a)[1] * L.th]; const ft = [k[0] + dir(a - b)[0] * L.sh, k[1] + dir(a - b)[1] * L.sh]; return [hip, k, ft]; };
  const arm = (a, b) => { const aa = a + P.tor; const e = [sh[0] + dir(aa)[0] * L.ua, sh[1] + dir(aa)[1] * L.ua]; const h = [e[0] + dir(aa + b)[0] * L.la, e[1] + dir(aa + b)[1] * L.la]; return [sh, e, h]; };
  const LL = leg(P.lt, P.ls), RL = leg(P.rt, P.rs), LA = arm(P.la1, P.la2), RA = arm(P.ra1, P.ra2);
  const OW = 14, IW = 9;
  const coat = acc.includes('raincoat') ? (o.coat || '#f5c518') : null;
  const back = shade(body, -.18);
  // extremidades traseras
  seg(LL, OW, line); seg(LL, IW, back);
  seg(LA, OW, line); seg(LA.slice(0, 2), IW, coat ? shade(coat, -.2) : back); seg(LA.slice(1), IW, back);
  // torso
  if (coat) {
    ctx.beginPath(); const hw = 9, bw = 17; const n = neck, hp = hip;
    const px = -up[1], py = up[0];
    ctx.moveTo(n[0] - px * hw, n[1] - py * hw); ctx.lineTo(n[0] + px * hw, n[1] + py * hw);
    ctx.lineTo(hp[0] + px * bw - up[0] * 10, hp[1] + py * bw - up[1] * 10 + 0); ctx.lineTo(hp[0] - px * bw - up[0] * 10, hp[1] - py * bw - up[1] * 10);
    ctx.closePath(); ctx.fillStyle = coat; ctx.fill(); ctx.lineWidth = 3.5; ctx.strokeStyle = line; ctx.stroke();
  } else { seg([hip, neck], OW + 1, line); seg([hip, neck], IW + 1, body); }
  if (acc.includes('tie')) { seg([[neck[0], neck[1] + 4], [neck[0] + up[0] * -22 + 1, neck[1] + 24]], 5, o.tie || '#e2483d'); }
  if (acc.includes('lanyard')) {
    ctx.lineWidth = 2.5; ctx.strokeStyle = '#6a5cff'; ctx.beginPath(); ctx.moveTo(neck[0] - 5, neck[1] + 2); ctx.lineTo(neck[0] + 2, neck[1] + 22); ctx.lineTo(neck[0] + 7, neck[1] + 2); ctx.stroke();
    fillRR(neck[0] - 4, neck[1] + 20, 13, 10, 2, '#fff'); ctx.lineWidth = 1.5; ctx.strokeStyle = line; ctx.stroke();
  }
  // pierna y brazo delanteros
  seg(RL, OW, line); seg(RL, IW, body);
  if (acc.includes('scarf')) {
    const wv = Math.sin(t * 6) * 4;
    ctx.beginPath(); ctx.moveTo(neck[0] - 3, neck[1] + 2); ctx.quadraticCurveTo(neck[0] - 18, neck[1] + 6 + wv, neck[0] - 30, neck[1] + 2 + wv * 1.6);
    ctx.lineWidth = 8; ctx.strokeStyle = '#c8392b'; ctx.stroke();
    seg([[neck[0] - 9, neck[1] + 1], [neck[0] + 9, neck[1] + 1]], 9, '#c8392b');
  }
  seg(RA, OW, line); seg(RA.slice(0, 2), IW, coat || body); seg(RA.slice(1), IW, body);
  const hand = RA[2];
  if (acc.includes('mug')) {
    ctx.save(); ctx.translate(hand[0] + 3, hand[1] - 4); fillRR(-8, -12, 16, 20, 3, '#fff'); ctx.lineWidth = 2.5; ctx.strokeStyle = line; ctx.stroke();
    ctx.beginPath(); ctx.arc(9, -2, 5, -PI / 2, PI / 2); ctx.stroke(); fillRR(-8, -12, 16, 5, 2, '#7a4a2a');
    ctx.globalAlpha *= .5; for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.moveTo(-3 + i * 6, -16); ctx.bezierCurveTo(-7 + i * 6, -22 - Math.sin(t * 3 + i) * 3, 1 + i * 6, -26, -3 + i * 6, -32); ctx.lineWidth = 2; ctx.strokeStyle = '#999'; ctx.stroke(); }
    ctx.restore();
  }
  if (acc.includes('phone')) { ctx.save(); ctx.translate(hand[0], hand[1]); ctx.rotate(-.3); fillRR(-6, -14, 12, 22, 2, '#111'); fillRR(-4.5, -12, 9, 17, 1, o.phoneGlow || '#9fd3ff'); ctx.restore(); if (o.phoneGlow !== 'none') { ctx.save(); ctx.globalAlpha *= .5; glow(hand[0], hand[1], 40, 'rgba(160,210,255,.5)'); ctx.restore(); } }
  if (acc.includes('torch')) { seg([hand, [hand[0] + 6, hand[1] - 22]], 4, '#5a3a20'); const fl = 1 + Math.sin(t * 20 + o.x) * .15; circle(hand[0] + 6, hand[1] - 26, 6 * fl, '#ffb347'); circle(hand[0] + 6, hand[1] - 27, 3 * fl, '#fff3c4'); ctx.save(); glow(hand[0] + 6, hand[1] - 26, 60, 'rgba(255,160,60,.35)'); ctx.restore(); }
  // cabeza
  const hc = [neck[0] + up[0] * (L.hr + 2) + Math.sin(P.head) * 4, neck[1] + up[1] * (L.hr + 2) + Math.max(0, P.head) * 3];
  if (coat && !o.nohood) { circle(hc[0] - 2, hc[1] - 1, L.hr + 6, line); circle(hc[0] - 2, hc[1] - 1, L.hr + 3.5, coat); }
  if (acc.includes('bun')) { circle(hc[0] - 14, hc[1] - 10, 10, line); circle(hc[0] - 14, hc[1] - 10, 7, o.hair || '#4a2c1d'); }
  circle(hc[0], hc[1], L.hr + 2.5, line); circle(hc[0], hc[1], L.hr, o.faceless ? (o.headCol || '#0c0c10') : body);
  if (acc.includes('hair')) { ctx.save(); ctx.beginPath(); ctx.arc(hc[0], hc[1], L.hr, PI * 1.05, PI * 1.95); ctx.lineTo(hc[0], hc[1] - 4); ctx.closePath(); ctx.fillStyle = o.hair || '#4a2c1d'; ctx.fill(); ctx.restore(); }
  if (acc.includes('pillow')) { ctx.save(); ctx.translate(hc[0], hc[1] - L.hr - 4); ctx.rotate(-.1); fillRR(-24, -10, 48, 18, 9, '#f4efe2'); ctx.lineWidth = 2.5; ctx.strokeStyle = line; ctx.stroke(); seg([[-3, 6], [-6, 22]], 3, '#a1846a'); seg([[3, 6], [6, 22]], 3, '#a1846a'); ctx.restore(); }
  if (!o.faceless) face(hc, o.expr || 'neutral', o.look ?? 1, t, line, acc);
  else if (o.eyes) { circle(hc[0] + 5, hc[1] - 2, 2.2, '#fff'); circle(hc[0] - 3, hc[1] - 2, 2.2, '#fff'); }
  ctx.restore();
  return { hand: RA[2], head: hc, neck };
}
function face(hc, expr, look, t, line, acc) {
  const [x, y] = hc, lx = look * 4;
  const blink = (t % 3.7) > 3.58 ? .2 : 1;
  if (acc.includes('glasses')) { ctx.lineWidth = 2; ctx.strokeStyle = line; ctx.beginPath(); ctx.arc(x + 9, y - 2, 5.5, 0, TAU); ctx.moveTo(x + 1.5, y - 2); ctx.arc(x - 2, y - 2, 5.5, 0, TAU); ctx.stroke(); }
  if (expr === 'scared') {
    for (const ex of [x - 2 + lx * .4, x + 9 + lx * .4]) { ctx.beginPath(); ctx.ellipse(ex, y - 3, 4.6, 5.6, 0, 0, TAU); ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = 1.8; ctx.strokeStyle = line; ctx.stroke(); circle(ex + lx * .3, y - 2, 1.9, line); }
    ctx.beginPath(); ctx.ellipse(x + 4 + lx * .4, y + 8, 2.6, 3.4, 0, 0, TAU); ctx.fillStyle = line; ctx.fill();
    return;
  }
  if (expr === 'closed' || expr === 'tired') { ctx.lineWidth = 2.2; ctx.strokeStyle = line; ctx.beginPath(); ctx.moveTo(x - 5 + lx, y - 1); ctx.lineTo(x + 1 + lx, y - 1); ctx.moveTo(x + 6 + lx, y - 1); ctx.lineTo(x + 12 + lx, y - 1); ctx.stroke(); if (expr === 'tired') { ctx.beginPath(); ctx.moveTo(x + 1 + lx, y + 8); ctx.lineTo(x + 8 + lx, y + 8); ctx.stroke(); } return; }
  if (expr === 'happy') { ctx.lineWidth = 2.2; ctx.strokeStyle = line; ctx.beginPath(); ctx.arc(x - 1 + lx, y, 3, PI, 0); ctx.moveTo(x + 12 + lx, y); ctx.arc(x + 9 + lx, y, 3, PI, 0); ctx.stroke(); ctx.beginPath(); ctx.arc(x + 4 + lx, y + 5, 5, .2, PI - .2); ctx.stroke(); return; }
  ctx.save(); ctx.translate(0, y - 2); ctx.scale(1, blink); circle(x - 1 + lx, 0, 2.3, line); circle(x + 8 + lx, 0, 2.3, line); ctx.restore();
  ctx.lineWidth = 2; ctx.strokeStyle = line; ctx.beginPath();
  if (expr === 'worried') { ctx.moveTo(x - 4 + lx, y - 9); ctx.lineTo(x + 1 + lx, y - 11); ctx.moveTo(x + 6 + lx, y - 11); ctx.lineTo(x + 11 + lx, y - 9); ctx.moveTo(x + 1 + lx, y + 9); ctx.quadraticCurveTo(x + 4 + lx, y + 6, x + 8 + lx, y + 9); }
  else if (expr === 'smirk') { ctx.moveTo(x + 1 + lx, y + 8); ctx.quadraticCurveTo(x + 6 + lx, y + 10, x + 10 + lx, y + 6); }
  else if (expr === 'angry') { ctx.moveTo(x - 4 + lx, y - 10); ctx.lineTo(x + 2 + lx, y - 7); ctx.moveTo(x + 5 + lx, y - 7); ctx.lineTo(x + 11 + lx, y - 10); ctx.moveTo(x + 1 + lx, y + 8); ctx.lineTo(x + 8 + lx, y + 8); }
  else { ctx.moveTo(x + 2 + lx, y + 8); ctx.lineTo(x + 7 + lx, y + 8); }
  ctx.stroke();
}
function shade(hex, a) {
  const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = n >> 8 & 255, b = n & 255;
  const f = v => Math.round(a < 0 ? v * (1 + a) : v + (255 - v) * a);
  return `rgb(${f(r)},${f(g)},${f(b)})`;
}

// ---------- estilos de canal ----------
const CH = {
  regla0: { accent: '#ffc83d', accent2: '#e5383b', capFam: 'Montserrat', capW: 900, head: 'Anton', handle: '@regla0', you: { acc: ['raincoat'], body: '#e6e6ea' }, hudBg: null, hudInk: '#fff', pillBg: 'rgba(10,10,14,.75)' },
  lunes: { accent: '#ff7a1a', accent2: '#e2483d', capFam: 'Montserrat', capW: 900, head: 'Bebas Neue', capY: .835, handle: '@sobrevivealunes', you: { acc: ['lanyard', 'tie'], body: '#f4f4f6' }, hudBg: 'rgba(255,255,255,.92)', hudInk: '#1a191d', pillBg: '#1a191d' },
  historia: { accent: '#ff9b42', accent2: '#c8392b', capFam: 'Montserrat', capW: 900, head: 'Cinzel', handle: '@sobrevivirias', you: { acc: ['scarf'], body: '#efe6d6' }, hudBg: 'rgba(30,20,12,.72)', hudInk: '#f3e6cc', pillBg: 'rgba(30,20,12,.8)' },
};
let TL = null, S = null;
function you(o) { return stick(Object.assign({}, S.you, o, { acc: [...(S.you.acc || []), ...(o.acc || [])] })); }

// ---------- HUD ----------
function hud(b, t, gt) {
  const h = b._hud;
  if (TL.ch === 'regla0') {
    text('● ' + TL.day, 46, 112, { size: 17, w: 800, color: '#ff4b4b', align: 'left', ls: 2 });
    text(h.time, 44, 152, { size: 52, fam: 'Anton', w: 400, color: '#fff', align: 'left', ls: 1, shadow: 'rgba(0,0,0,.6)' });
    text(h.place || '', 46, 192, { size: 15, w: 700, color: 'rgba(255,255,255,.6)', align: 'left', ls: 3 });
  } else if (TL.ch === 'lunes') {
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.15)'; ctx.shadowBlur = 18; fillRR(30, 92, 230, 122, 22, S.hudBg); ctx.restore();
    fillRR(48, 106, 86, 26, 13, S.accent); text(TL.day, 91, 120, { size: 15, w: 900, color: '#fff', ls: 2 });
    text(h.place || '', 146, 120, { size: 12, w: 800, color: '#8a8794', align: 'left', ls: 1.5 });
    text(h.time, 48, 160, { size: 44, fam: 'Bebas Neue', w: 400, color: S.hudInk, align: 'left', ls: 1 });
    // barra de café
    const v = cl((h.cafe ?? 50) / 100); const col = v > .6 ? '#2fbf71' : v > .3 ? '#ffb020' : '#e2483d';
    text('CAFÉ', 48, 196, { size: 12, w: 900, color: '#8a8794', align: 'left', ls: 1.5 });
    fillRR(92, 189, 150, 14, 7, '#ece9e2'); fillRR(92, 189, Math.max(14, 150 * v), 14, 7, col);
    text(Math.round(v * 100) + '%', 168, 196, { size: 11, w: 900, color: '#1a191d' });
  } else {
    ctx.save(); fillRR(30, 92, 250, 116, 18, S.hudBg); ctx.strokeStyle = 'rgba(243,230,204,.25)'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
    // reloj de arena
    const p = gt / TL.duration; ctx.save(); ctx.translate(62, 150); ctx.strokeStyle = '#f3e6cc'; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(-12, -24); ctx.lineTo(12, -24); ctx.lineTo(0, 0); ctx.lineTo(12, 24); ctx.lineTo(-12, 24); ctx.lineTo(0, 0); ctx.closePath(); ctx.stroke();
    ctx.fillStyle = S.accent; ctx.beginPath(); const a = 1 - p; ctx.moveTo(-10 * a, -2 - 20 * a); ctx.lineTo(10 * a, -2 - 20 * a); ctx.lineTo(0, -2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-10 * p, 22); ctx.lineTo(10 * p, 22); ctx.lineTo(0, 22 - 20 * p); ctx.fill(); ctx.restore();
    text(TL.day, 92, 118, { size: 15, w: 900, color: S.accent, align: 'left', ls: 2.5 });
    text(h.time, 90, 156, { size: 40, fam: 'Cinzel', w: 700, color: S.hudInk, align: 'left' });
    text(h.place || '', 92, 190, { size: 13, w: 800, color: 'rgba(243,230,204,.7)', align: 'left', ls: 2.5 });
  }
  // píldora de serie + handle
  const a = TL.series, bb = TL.ep; const fa = 15, wa = measure(a, fa, 'Montserrat', 900, 2) + 28, wb = measure(bb, fa, 'Montserrat', 900, 2) + 26;
  const x0 = W / 2 - (wa + wb) / 2;
  fillRR(x0, 36, wa + wb, 34, 17, S.pillBg); fillRR(x0 + wa, 36, wb, 34, 17, S.accent2);
  text(a, x0 + wa / 2, 54, { size: fa, w: 900, color: '#fff', ls: 2 }); text(bb, x0 + wa + wb / 2, 54, { size: fa, w: 900, color: '#fff', ls: 2 });
  text(S.handle, W - 36, 112, { size: 14, w: 800, color: TL.ch === 'lunes' ? 'rgba(26,25,29,.45)' : 'rgba(255,255,255,.4)', align: 'right', ls: 1 });
}

// ---------- subtítulos palabra a palabra ----------
function buildChunks(b) {
  const ws = []; b.words.forEach(w => { const parts = w.w.split(' '); const d = (w.e - w.s) / parts.length; parts.forEach((p, i) => ws.push({ w: p, s: w.s + d * i, e: w.s + d * (i + 1) })); });
  const chunks = []; let cur = [];
  ws.forEach((w, i) => {
    cur.push(w); const txt = cur.map(x => x.w).join(' ');
    const brk = /[.,:;?!…]$/.test(w.w) || cur.length >= (b.big ? 1 : 3) || txt.length > 15;
    if (brk || i === ws.length - 1) { chunks.push(cur); cur = []; }
  });
  chunks.forEach((c, i) => { c.s = c[0].s; c.e = i < chunks.length - 1 ? chunks[i + 1][0].s : b.end; });
  return chunks;
}
function captions(b, gt) {
  if (!b._chunks) b._chunks = buildChunks(b);
  const c = b._chunks.find(c => gt >= c.s - .02 && gt < c.e); if (!c) return;
  const big = !!b.big; const size0 = big ? 120 : 50; const y = big ? H * .5 : H * (S.capY || .69);
  const words = c.map(w => w.w.toUpperCase());
  let size = size0; const gap = () => size * .28;
  const tw = () => words.reduce((a, w) => a + measure(w, size, S.capFam, S.capW, 1), 0) + gap() * (words.length - 1);
  while (tw() > W - 70) size -= 2;
  let x = W / 2 - tw() / 2; const pop = E.back(cl((gt - c.s) / .18));
  ctx.save(); ctx.translate(W / 2, y); ctx.scale(.85 + .15 * pop, .85 + .15 * pop); ctx.translate(-W / 2, -y);
  c.forEach((w, i) => {
    const s = words[i], mw = measure(s, size, S.capFam, S.capW, 1); const active = gt >= w.s - .03;
    const col = active && (i === c.length - 1 || gt < c[i + 1].s) ? S.accent : '#fff';
    text(s, x + mw / 2, y, { size, fam: S.capFam, w: S.capW, color: active ? col : 'rgba(255,255,255,.95)', stroke: '#111', sw: size * .2, ls: 1 });
    x += mw + gap();
  });
  ctx.restore();
}

// ---------- overlays ----------
function overlay(b, t, gt) {
  const o = b.ov; if (!o) return;
  if (o.t === 'rule') {
    const a = E.back(cl(t / .3)), a2 = E.out(cl((t - .12) / .35));
    ctx.save(); ctx.fillStyle = lin(0, 220, 0, 640, [[0, 'rgba(0,0,0,.55)'], [1, 'rgba(0,0,0,0)']]); ctx.globalAlpha = a2; ctx.fillRect(0, 220, W, 420); ctx.restore();
    const lab = (TL.ch === 'historia' ? 'REGLA ' : 'REGLA #') + o.n; const lw = measure(lab, 26, 'Montserrat', 900, 3) + 40;
    ctx.save(); ctx.translate(W / 2, 300); ctx.scale(a, a); fillRR(-lw / 2, -24, lw, 48, TL.ch === 'lunes' ? 24 : 6, S.accent2); text(lab, 0, 1, { size: 26, w: 900, ls: 3 }); ctx.restore();
    const fam = TL.ch === 'historia' ? 'Cinzel' : S.head; const fw = TL.ch === 'historia' ? 900 : 400;
    let size = TL.ch === 'historia' ? 50 : 66; let lines = wrap(o.text, size, W - 90, fam, fw, 1);
    while (lines.length > 3) { size -= 4; lines = wrap(o.text, size, W - 90, fam, fw, 1); }
    ctx.save(); ctx.globalAlpha = a2; ctx.translate(0, (1 - a2) * 20);
    lines.forEach((l, i) => text(l, W / 2, 370 + i * size * 1.08, { size, fam, w: fw, color: '#fff', stroke: '#0d0d10', sw: 9, ls: 1 }));
    const yy = 370 + (lines.length - 1) * size * 1.08 + size * .62; fillRR(W / 2 - 60 * a2, yy, 120 * a2, 5, 3, S.accent2);
    ctx.restore();
  }
  if (o.t === 'major') {
    const a = E.out(cl(t / .4)), g = E.back(cl((t - .25) / .4));
    ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(0,0,0,.62)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    text(o.label, W / 2, 330, { size: 26, w: 900, ls: 6, color: 'rgba(255,255,255,' + a + ')' });
    ctx.save(); ctx.translate(W / 2, 430); ctx.scale(g, g);
    let size = 112; while (measure(o.word, size, S.head, TL.ch === 'historia' ? 900 : 400, 2) > W - 80) size -= 4;
    text(o.word, 0, 0, { size, fam: TL.ch === 'historia' ? 'Cinzel' : S.head, w: TL.ch === 'historia' ? 900 : 400, color: S.accent, shadow: S.accent, blur: 40, ls: 2 });
    ctx.restore();
    const p = cl((t - .5) / 1.2) * o.pct / 100;
    fillRR(W / 2 - 200, 515, 400, 18, 9, 'rgba(255,255,255,.18)'); fillRR(W / 2 - 200, 515, Math.max(18, 400 * p), 18, 9, S.accent);
    text(Math.round(p * 100) + '% DE LOS VOTOS', W / 2, 562, { size: 18, w: 800, ls: 3, color: 'rgba(255,255,255,.85)' });
  }
  if (o.t === 'choice') {
    const a = E.out(cl(t / .35));
    ctx.save(); ctx.globalAlpha = a * .55; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); ctx.restore();
    const fam = TL.ch === 'historia' ? 'Cinzel' : S.head, fw = TL.ch === 'historia' ? 900 : 400;
    let size = TL.ch === 'historia' ? 62 : 84; let lines = wrap(o.q, size, W - 80, fam, fw, 1);
    while (lines.length > 2) { size -= 4; lines = wrap(o.q, size, W - 80, fam, fw, 1); }
    const y0 = 360; ctx.save(); ctx.globalAlpha = a;
    lines.forEach((l, i) => text(l, W / 2, y0 + i * size * 1.05, { size, fam, w: fw, color: '#fff', stroke: '#0d0d10', sw: 8, ls: 1 }));
    const by = y0 + (lines.length - 1) * size * 1.05 + 110;
    const btn = (label, x, col, k) => {
      const s = E.back(cl((t - .3 - k * .12) / .35)); const pulse = 1 + Math.sin(gt * 5 + k * 2) * .025;
      let fz = 26; while (measure(label, fz, 'Montserrat', 900, 1) > 270) fz -= 1;
      const bw = Math.min(300, measure(label, fz, 'Montserrat', 900, 1) + 56);
      ctx.save(); ctx.translate(x, by); ctx.scale(s * pulse, s * pulse);
      fillRR(-bw / 2, -32, bw, 64, 32, 'rgba(0,0,0,.55)'); ctx.lineWidth = 3.5; ctx.strokeStyle = col; ctx.stroke();
      text(label, 0, 1, { size: fz, w: 900, color: col, ls: 1 }); ctx.restore();
    };
    btn(o.a, W / 2 - 165, '#3ddc84', 0); btn(o.b, W / 2 + 165, '#ff5a5a', 1);
    if (o.mid) {
      const p = cl(t / Math.max(1, (b.end - b.start) - .2)); fillRR(W / 2 - 150, by + 70, 300, 8, 4, 'rgba(255,255,255,.2)'); fillRR(W / 2 - 150, by + 70, 300 * (1 - p), 8, 4, S.accent);
      text('PIÉNSALO', W / 2, by + 104, { size: 16, w: 800, ls: 5, color: 'rgba(255,255,255,.75)' });
    } else {
      const ar = Math.sin(gt * 6) * 5;
      text(o.foot, W / 2, by + 92, { size: 19, w: 800, ls: 4, color: 'rgba(255,255,255,.85)' });
      ctx.save(); ctx.translate(W / 2, by + 128 + ar); ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 3.5; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(0, -12); ctx.lineTo(0, 10); ctx.moveTo(-9, 2); ctx.lineTo(0, 11); ctx.lineTo(9, 2); ctx.stroke(); ctx.restore();
      if (o.next) { const nw = measure(o.next, 17, 'Montserrat', 900, 2) + 40; fillRR(W / 2 - nw / 2, 1140, nw, 40, 20, S.accent2); text(o.next, W / 2, 1161, { size: 17, w: 900, ls: 2 }); }
    }
    ctx.restore();
  }
  if (o.t === 'prompt') {
    const a = E.back(cl(t / .45)); ctx.save(); ctx.translate(W / 2, 520); ctx.scale(a, a);
    ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 40; fillRR(-300, -210, 600, 420, 28, '#fff'); ctx.shadowBlur = 0;
    fillRR(-300, -210, 600, 70, [28, 28, 0, 0], '#1a191d');
    [['#ff5f57', -262], ['#febc2e', -238], ['#28c840', -214]].forEach(([c, x]) => circle(x, -175, 7, c));
    text(o.title, 0, -174, { size: 30, fam: 'Bebas Neue', w: 400, color: '#fff', ls: 3 });
    fillRR(150, -192, 124, 36, 18, S.accent); text('HAZ CAPTURA', 212, -173, { size: 14, w: 900, ls: 1 });
    const lines = wrap(o.text, 29, 520, 'Montserrat', 700); const shown = Math.floor(cl((t - .3) / 1.6) * o.text.length); let n = 0;
    lines.forEach((l, i) => { const vis = l.slice(0, Math.max(0, shown - n)); n += l.length + 1; text(vis, -262, -96 + i * 44, { size: 29, w: 700, color: '#1a191d', align: 'left' }); });
    ctx.restore();
  }
  if (o.t === 'list') {
    o.items.forEach((it, i) => {
      const w0 = b.words[i] ? b.words[i].s - b.start : i * .8; const a = E.back(cl((t - w0) / .35));
      ctx.save(); ctx.translate(W / 2, 330 + i * 120); ctx.scale(a, a); ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 24;
      fillRR(-260, -46, 520, 92, 46, '#fff'); ctx.shadowBlur = 0; circle(-210, 0, 28, '#2fbf71');
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-222, 0); ctx.lineTo(-212, 11); ctx.lineTo(-195, -10); ctx.stroke();
      text(it, -160, 3, { size: 46, fam: 'Bebas Neue', w: 400, color: '#1a191d', align: 'left', ls: 2 }); ctx.restore();
    });
  }
}

// ---------- bucle principal ----------
const SCENES = {};
function setup(tl) {
  TL = tl; S = CH[tl.ch];
  let hudState = {};
  tl.beats.forEach(b => { hudState = Object.assign({}, hudState, b.hud || {}); b._hud = hudState; b.p = b.p || {}; });
}
function renderAt(gt) {
  const i = Math.max(0, TL.beats.findIndex(b => gt < b.end)); const b = i < 0 ? TL.beats[TL.beats.length - 1] : TL.beats[i];
  const t = gt - b.start;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  ctx.save();
  // cámara: zoom lento + sacudida en impactos
  const z = (b.p.zoom || 1) * (1 + .05 * E.inout(t / Math.max(1, b.end - b.start)));
  let shx = 0, shy = 0; const hits = (b.sfx || []).filter(([n]) => ['hit', 'boom', 'thud', 'crack'].includes(n));
  hits.forEach(([n, at]) => { const k = t - at; if (k > 0 && k < .5) { const m = (1 - k / .5) * (n === 'boom' ? 18 : 10); shx += Math.sin(k * 90) * m; shy += Math.cos(k * 70) * m; } });
  if (b.p.shake) { shx += Math.sin(gt * 47) * 7; shy += Math.cos(gt * 39) * 7; }
  ctx.translate(W / 2 + shx, H / 2 + shy); ctx.scale(z, z); ctx.translate(-W / 2, -H / 2);
  (SCENES[b.scene] || SCENES.black)(t, b.p, b, gt);
  ctx.restore();
  // flash de corte
  if (t < .08 && i > 0) { ctx.fillStyle = `rgba(0,0,0,${1 - t / .08})`; ctx.fillRect(0, 0, W, H); }
  hud(b, t, gt); overlay(b, t, gt); captions(b, gt);
  // grano
  ctx.save(); ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = TL.ch === 'lunes' ? .06 : .12; ctx.drawImage(GRAIN, -100, -100); ctx.restore();
}
const GRAIN = document.createElement('canvas'); GRAIN.width = W + 200; GRAIN.height = H + 200;
{ const g = GRAIN.getContext('2d'), d = g.createImageData(GRAIN.width, GRAIN.height); for (let i = 0; i < d.data.length; i += 4) { const v = Math.random() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; } g.putImageData(d, 0, 0); }
SCENES.black = () => { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); };

// ---------- portada (miniatura del grid) ----------
function coverFrame(c) {
  const b = { scene: c.scene, p: Object.assign({}, c.p || {}), _hud: TL.beats[0]._hud, sfx: [], start: 0, end: 12, words: [] };
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  ctx.save(); (SCENES[b.scene] || SCENES.black)(c.t || 2, b.p, b, c.t || 2); ctx.restore();
  ctx.fillStyle = lin(0, 300, 0, 900, [[0, 'rgba(0,0,0,.65)'], [.6, 'rgba(0,0,0,.35)'], [1, 'rgba(0,0,0,0)']]); ctx.fillRect(0, 0, W, 900);
  const lab = c.top; const lw = measure(lab, 22, 'Montserrat', 900, 3) + 40; fillRR(W / 2 - lw / 2, 300, lw, 44, 22, S.accent2); text(lab, W / 2, 323, { size: 22, w: 900, ls: 3 });
  const fam = TL.ch === 'historia' ? 'Cinzel' : S.head, fw = TL.ch === 'historia' ? 900 : 400;
  let size = TL.ch === 'historia' ? 110 : 128; let lines = wrap(c.title, size, W - 70, fam, fw, 2);
  while (lines.length > 2 || lines.some(l => measure(l, size, fam, fw, 2) > W - 70)) { size -= 4; lines = wrap(c.title, size, W - 70, fam, fw, 2); }
  lines.forEach((l, i) => text(l, W / 2, 440 + i * size * 1.02, { size, fam, w: fw, color: i === lines.length - 1 ? S.accent : '#fff', stroke: '#0d0d10', sw: 12, ls: 2 }));
  if (c.sub) text(c.sub, W / 2, 440 + lines.length * size * 1.02 + 10, { size: 44, fam, w: fw, color: '#fff', stroke: '#0d0d10', sw: 8, ls: 4 });
  text(S.handle, W / 2, 1210, { size: 22, w: 800, color: 'rgba(255,255,255,.75)', ls: 2, stroke: 'rgba(0,0,0,.6)', sw: 6 });
  ctx.save(); ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = .25; ctx.drawImage(GRAIN, 0, 0); ctx.restore();
  return cv.toDataURL('image/jpeg', .9);
}
