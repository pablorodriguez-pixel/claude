// Escenas de ¿SOBREVIVIRÍAS? — sepia, brasas, hechos reales
const INK = '#2a1d14';
function sky(top, mid, bot, y1 = 950) { ctx.fillStyle = lin(0, 0, 0, y1, [[0, top], [.6, mid], [1, bot]]); ctx.fillRect(0, 0, W, H); }
function stars(n = 90, a = 1) { particles(n, 3, (x, y, r) => { const tw = .5 + .5 * Math.sin(r * 50 + performance.now() * 0); circle(x * W, y * 560, .6 + r * 1.6, `rgba(255,250,235,${(.3 + r * .7) * a})`); }); }
function romanCity(y, col) {
  ctx.fillStyle = col;
  const B = [[0, 120, 160], [150, 90, 140], [250, 150, 120], [400, 100, 170], [560, 130, 160]];
  B.forEach(([x, h, w]) => { ctx.fillRect(x, y - h, w, h + 400); ctx.beginPath(); ctx.moveTo(x - 10, y - h); ctx.lineTo(x + w / 2, y - h - 40); ctx.lineTo(x + w + 10, y - h); ctx.fill(); });
  for (let i = 0; i < 6; i++) ctx.fillRect(300 + i * 26, y - 210, 12, 210);
  ctx.fillRect(290, y - 225, 170, 18); ctx.beginPath(); ctx.moveTo(285, y - 225); ctx.lineTo(375, y - 270); ctx.lineTo(465, y - 225); ctx.fill();
}
function column(t, x, y, hgt, col = '#6e5e57') {
  for (let i = 0; i < 26; i++) {
    const k = i / 25, yy = y - k * hgt, r = 30 + k * 60 + Math.sin(i * 1.3 + t * .8) * 8;
    circle(x + Math.sin(i * 2.1 + t * .5) * 18 * k, yy, r, shade(col, -.1 + hash(i) * .2));
  }
  for (let i = 0; i < 9; i++) { const a = (i / 8 - .5) * 2.4; circle(x + Math.sin(a) * 170, y - hgt - 30 + Math.abs(a) * 25, 80 + hash(i + 4) * 30, shade(col, -.05 + hash(i + 9) * .15)); }
}
SCENES.title = (t, p, b, gt) => {
  ctx.fillStyle = lin(0, 0, W, H, [[0, '#f1e4c6'], [1, '#d4bb8e']]); ctx.fillRect(0, 0, W, H);
  particles(40, 11, (x, y, r) => { ctx.fillStyle = `rgba(120,80,40,${.03 + r * .05})`; ctx.beginPath(); ctx.ellipse(x * W, y * H, 40 + r * 120, 30 + r * 80, r * 3, 0, TAU); ctx.fill(); });
  ctx.strokeStyle = 'rgba(42,29,20,.5)'; ctx.lineWidth = 2; ctx.strokeRect(36, 236, W - 72, 880); ctx.strokeRect(46, 246, W - 92, 860);
  const k = E.out(t / 1.2);
  ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * 30);
  let fz = 128; while (measure(p.title, fz, 'Cinzel', 900, 6) > W - 120) fz -= 4;
  text(p.title, W / 2, 520, { size: fz, fam: 'Cinzel', w: 900, color: INK, ls: 6 });
  fillRR(W / 2 - 120, 600, 240, 3, 2, '#8a3b1f');
  text(p.sub, W / 2, 650, { size: 30, fam: 'Cinzel', w: 700, color: '#8a3b1f', ls: 3 });
  ctx.restore();
  // emblema
  ctx.save(); ctx.translate(W / 2, 860); ctx.globalAlpha = E.out((t - .5) / 1); ctx.strokeStyle = INK; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(0, 0, 90, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, 80, 0, TAU); ctx.stroke();
  const m = p.motif;
  if (m === 'ember') { ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-60, 40); ctx.lineTo(-12, -30); ctx.lineTo(12, -30); ctx.lineTo(60, 40); ctx.fill(); ctx.fillStyle = '#c8392b'; for (let i = 0; i < 5; i++) circle(-10 + i * 5, -40 - i * 8 - Math.sin(gt * 3 + i) * 3, 6 - i * .6, '#c8392b'); }
  if (m === 'sea') { ctx.fillStyle = INK; ctx.fillRect(-60, 0, 120, 16); for (let i = 0; i < 4; i++) ctx.fillRect(-36 + i * 22, -30, 12, 30); ctx.beginPath(); for (let x = -70; x <= 70; x += 5) ctx.lineTo(x, 34 + Math.sin(x * .2 + gt * 3) * 5); ctx.stroke(); }
  if (m === 'dust') { ctx.fillStyle = INK; ctx.fillRect(-14, -50, 28, 90); ctx.beginPath(); ctx.moveTo(-24, -50); ctx.lineTo(0, -75); ctx.lineTo(24, -50); ctx.fill(); ctx.fillRect(-60, 0, 30, 40); ctx.fillRect(30, -10, 30, 50); seg([[-5, -30], [6, -10], [-3, 10]], 2, '#f1e4c6'); }
  ctx.restore();
  if (p.motif === 'ember') particles(40, 5, (x, y, r) => { const yy = ((y * H - gt * (40 + r * 60)) % H + H) % H; circle(x * W + Math.sin(gt + r * 9) * 10, yy, 1.5 + r * 2.5, `rgba(226,85,43,${.4 + r * .5})`); });
  vignette(.35);
};
SCENES.vesuvius = (t, p, b, gt) => {
  const late = p.late;
  sky(late ? '#120c0a' : '#3d2a26', late ? '#3b2218' : '#a4573a', late ? '#6b3320' : '#e9a05a');
  const hgt = late ? 640 : lerp(160, 620, E.out(t / 4.5));
  column(gt, 380, 640, hgt, late ? '#3b302c' : '#7a6a62');
  glow(380, 640, 160, 'rgba(255,120,40,.6)');
  ctx.fillStyle = '#3b2b26'; ctx.beginPath(); ctx.moveTo(-60, 940); ctx.lineTo(250, 660); ctx.lineTo(330, 630); ctx.lineTo(430, 630); ctx.lineTo(520, 670); ctx.lineTo(800, 940); ctx.fill();
  romanCity(1000, '#22160f'); ctx.fillStyle = '#1a110b'; ctx.fillRect(0, 1000, W, H);
  if (late) particles(140, 8, (x, y, r) => { const yy = ((y * H + gt * (90 + r * 90)) % H); circle((x * W + gt * 20) % W, yy, 1 + r * 2, 'rgba(160,150,140,.5)'); });
  you({ x: 190, y: 1190, s: 2.4, pose: 'stand', t: gt, expr: t > 1 ? 'scared' : 'neutral', look: 1 });
  vignette(.6);
};
function pumiceFall(gt, n = 160, k = 1) { particles(n, 21, (x, y, r) => { const sp = 260 + r * 300; const yy = ((y * H * 1.2 + gt * sp) % (H * 1.1)) - 60; const xx = (x * W * 1.2 - gt * 40 * r) % W; circle((xx + W) % W, yy, (2 + r * 4) * k, r > .5 ? '#cfc6b8' : '#8f857a'); }); }
SCENES.pumice = (t, p, b, gt) => {
  sky('#1e1614', '#4a3226', p.dark ? '#3b2418' : '#7b4a33');
  column(gt, 560, 620, 600, '#4a3d38');
  romanCity(980, '#20150f');
  const acc = (p.accum || .15) * 130 + t * 3;
  ctx.fillStyle = '#18100b'; ctx.fillRect(0, 980, W, H);
  ctx.fillStyle = '#9a9086'; ctx.beginPath(); ctx.moveTo(0, H); for (let x = 0; x <= W; x += 20) ctx.lineTo(x, 1200 - acc + Math.sin(x * .05) * 6 + hash(x) * 6); ctx.lineTo(W, H); ctx.fill();
  pumiceFall(gt);
  you({ x: 360 + Math.sin(gt * .5) * 10, y: 1200 - acc + 6, s: 2.4, pose: 'shield', t: gt, expr: 'worried', acc: p.pillow ? ['pillow'] : [] });
  if (p.dark) { ctx.fillStyle = 'rgba(10,5,2,.45)'; ctx.fillRect(0, 0, W, H); }
  vignette(.6);
};
SCENES.roof = (t, p, b, gt) => {
  sky('#1e1614', '#4a3226', '#7b4a33');
  const crack = ((b.sfx || []).find(s => s[0] === 'crack') || [0, 3])[1]; const k = cl((t - crack) / 1.2);
  ctx.fillStyle = '#18100b'; ctx.fillRect(0, 1060, W, H);
  // casa en sección
  fillRR(110, 640, 500, 420, 4, '#c9a27a'); ctx.fillStyle = '#8f6d4f'; ctx.fillRect(140, 680, 440, 380);
  ctx.fillStyle = '#3a2a1e'; ctx.fillRect(330, 900, 70, 160);
  // tejado que cede
  const sag = E.out(cl((t - crack + 1.5) / 1.5)) * 30 + E.inout(k) * 400;
  ctx.save(); ctx.translate(0, k * 60);
  ctx.fillStyle = '#a4492f'; ctx.beginPath(); ctx.moveTo(80, 650 + k * 200); ctx.quadraticCurveTo(360, 470 + sag, 640, 650 + k * 200); ctx.lineTo(640, 670 + k * 200); ctx.quadraticCurveTo(360, 500 + sag, 80, 670 + k * 200); ctx.fill();
  ctx.fillStyle = '#a29a8f'; ctx.beginPath(); ctx.moveTo(90, 648 + k * 200); ctx.quadraticCurveTo(360, 420 + sag - (1 - k) * 40 - t * 6, 630, 648 + k * 200); ctx.quadraticCurveTo(360, 470 + sag, 90, 648 + k * 200); ctx.fill();
  ctx.restore();
  if (k > 0) { ctx.save(); ctx.globalAlpha = (1 - k) * .8; for (let i = 0; i < 8; i++) circle(160 + i * 60, 900 - k * 120 + hash(i) * 60, 60 + k * 60, 'rgba(180,170,160,.6)'); ctx.restore(); }
  pumiceFall(gt, 120);
  you({ x: 640, y: 1190, s: 2.0, pose: k > 0 ? 'run' : 'scared', t: gt, face: 1, expr: 'scared' });
  vignette(.6);
};
SCENES.crossroads = (t, p, b, gt) => {
  sky('#140d0b', '#3a2219', '#7a3c22', 900);
  column(gt, 120, 640, 520, '#3e322e'); glow(120, 640, 200, 'rgba(255,90,30,.35)');
  // mar y barcos a la derecha
  ctx.fillStyle = '#16222b'; ctx.fillRect(360, 820, 400, 200);
  for (let i = 0; i < 3; i++) { const x = 470 + i * 90, y = 850 + Math.sin(gt + i) * 3; ctx.fillStyle = '#0b0807'; ctx.beginPath(); ctx.moveTo(x - 30, y); ctx.lineTo(x + 30, y); ctx.lineTo(x + 20, y + 14); ctx.lineTo(x - 20, y + 14); ctx.fill(); seg([[x, y], [x, y - 50]], 3, '#0b0807'); }
  ctx.fillStyle = '#2a1a12'; ctx.beginPath(); ctx.moveTo(-40, 900); ctx.lineTo(200, 760); ctx.lineTo(360, 820); ctx.lineTo(360, 900); ctx.fill();
  ctx.fillStyle = '#1a110b'; ctx.fillRect(0, 900, W, H);
  // caminos
  ctx.fillStyle = '#5a4434'; ctx.beginPath(); ctx.moveTo(300, H); ctx.lineTo(420, H); ctx.lineTo(380, 1000); ctx.lineTo(120, 900); ctx.lineTo(90, 915); ctx.lineTo(330, 1010); ctx.fill();
  ctx.beginPath(); ctx.moveTo(380, 1000); ctx.lineTo(600, 905); ctx.lineTo(640, 915); ctx.lineTo(420, 1010); ctx.fill();
  // poste con flechas
  seg([[360, 1240], [360, 700]], 12, '#3b2a1e');
  const arrow = (y, d, s, c) => { ctx.save(); ctx.translate(360, y); ctx.scale(d, 1); ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(0, -26); ctx.lineTo(190, -26); ctx.lineTo(220, 0); ctx.lineTo(190, 26); ctx.lineTo(0, 26); ctx.fill(); ctx.restore(); text(s, 360 + d * 105, y + 2, { size: 26, fam: 'Cinzel', w: 900, color: '#f3e6cc', ls: 2 }); };
  arrow(740, -1, 'A PIE', '#6b3a22'); arrow(810, 1, 'PUERTO', '#2c4a5a');
  const lk = Math.sin(gt * 1.6) > 0 ? 1 : -1;
  you({ x: 300, y: 1210, s: 2.2, pose: 'stand', t: gt, face: lk, expr: 'worried' });
  pumiceFall(gt, 70, .8);
  vignette(.65);
};
function arches(dark) {
  ctx.fillStyle = '#4a3a2e'; ctx.fillRect(0, 640, W, 420);
  for (let i = 0; i < 4; i++) { const x = 30 + i * 175; ctx.fillStyle = '#0d0907'; ctx.beginPath(); ctx.moveTo(x, 1060); ctx.lineTo(x, 760); ctx.arc(x + 70, 760, 70, PI, 0); ctx.lineTo(x + 140, 1060); ctx.fill();
    for (let j = 0; j < 3; j++) { const bc = dark ? '#4a4038' : '#6b5d50'; stick({ x: x + 35 + j * 35, y: 1056, s: .95, pose: 'sitdown', t: j * 2, face: j % 2 ? 1 : -1, body: bc, line: '#0d0907', faceless: true, headCol: bc }); } }
  ctx.fillStyle = '#3a2c22'; ctx.fillRect(0, 620, W, 30);
}
SCENES.boathouses = (t, p, b, gt) => {
  sky('#07080c', '#1a1414', '#4a2018', 640);
  const ck = p.cloud ? E.inout(t / 4.5) : 0;
  glow(-60 + ck * 200, 560, 400 + ck * 500, 'rgba(255,80,30,.5)');
  if (p.cloud) for (let i = 0; i < 18; i++) circle(-200 + ck * 600 + hash(i) * 300, 420 + hash(i + 3) * 260, 80 + hash(i + 5) * 80, `rgba(${120 + hash(i) * 80},${50 + hash(i) * 30},30,.85)`);
  arches(!!p.cloud);
  ctx.fillStyle = '#c2a77f'; ctx.fillRect(0, 1060, W, 70);
  ctx.fillStyle = lin(0, 1120, 0, H, [[0, '#1d2a33'], [1, '#0a1015']]); ctx.fillRect(0, 1120, W, H);
  for (let i = 0; i < 6; i++) { ctx.strokeStyle = 'rgba(200,220,230,.15)'; ctx.lineWidth = 2; ctx.beginPath(); for (let x = 0; x <= W; x += 10) ctx.lineTo(x, 1150 + i * 22 + Math.sin(x * .03 + gt * 2 + i) * 4); ctx.stroke(); }
  if (p.cloud) { ctx.fillStyle = `rgba(30,10,5,${ck * .55})`; ctx.fillRect(0, 0, W, H); }
  vignette(.7);
};
SCENES.road = (t, p, b, gt) => {
  sky('#2a2422', '#6b5a4c', '#c9a27a');
  column(gt, 620, 700, 400, '#5a4f4a');
  ctx.fillStyle = '#3b2f26'; ctx.fillRect(0, 900, W, H);
  ctx.fillStyle = '#6b5644'; ctx.beginPath(); ctx.moveTo(200, H); ctx.lineTo(560, H); ctx.lineTo(380, 900); ctx.lineTo(340, 900); ctx.fill();
  for (let i = 0; i < 14; i++) { const k = hash(i * 3), d = .25 + k * .6; const y = 920 + d * 320, x = 360 + (hash(i + 7) - .5) * 300 * d - ((gt * 12 * d) % 40);
    stick({ x, y, s: d * 1.6, pose: 'walk', t: gt + i, face: -1, body: '#5a4a3e', line: '#1a120c', acc: i % 4 === 0 ? ['torch'] : [], faceless: true, headCol: '#5a4a3e' }); }
  you({ x: 300, y: 1230, s: 2.3, pose: 'walk', t: gt, face: -1, expr: 'worried' });
  vignette(.55);
};
// ---------- Titanic ----------
function sea(y0, gt, col = '#060b14') {
  ctx.fillStyle = lin(0, y0, 0, H, [[0, col], [1, '#020407']]); ctx.fillRect(0, y0, W, H - y0);
  for (let i = 0; i < 14; i++) { ctx.strokeStyle = `rgba(160,190,220,${.05 + i * .006})`; ctx.lineWidth = 1.5; ctx.beginPath(); const yy = y0 + 10 + i * i * 2.6; for (let x = 0; x <= W; x += 12) ctx.lineTo(x, yy + Math.sin(x * .02 + gt * 1.2 + i) * (1 + i * .3)); ctx.stroke(); }
}
function titanic(x, y, s, gt, lights = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 4; i++) { const fx = 120 + i * 95; ctx.fillStyle = '#c9a45c'; ctx.beginPath(); ctx.moveTo(fx, -10); ctx.lineTo(fx + 42, -10); ctx.lineTo(fx + 48, -120); ctx.lineTo(fx + 8, -120); ctx.fill(); ctx.fillStyle = '#111'; ctx.fillRect(fx + 6, -130, 44, 26); }
  seg([[40, -10], [40, -200]], 3, '#222'); seg([[520, -10], [520, -190]], 3, '#222'); seg([[40, -195], [520, -185]], 1, '#333');
  ctx.fillStyle = '#e9e5da'; ctx.fillRect(70, -36, 440, 28); ctx.fillStyle = '#0b0d11'; ctx.beginPath(); ctx.moveTo(-20, -10); ctx.lineTo(600, -10); ctx.lineTo(580, 70); ctx.lineTo(20, 70); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#8a1f1f'; ctx.fillRect(18, 58, 562, 12);
  for (let r = 0; r < 3; r++) for (let i = 0; i < 40; i++) if (hash(i * 7 + r) > .25) { const on = lights * (hash(i + r * 40 + Math.floor(gt * 2) * .001) > .1 ? 1 : 0); circle(30 + i * 14, 4 + r * 16, 2.2, on ? '#ffe7a8' : '#222'); }
  for (let i = 0; i < 18; i++) circle(80 + i * 24, -22, 2, lights ? '#ffe7a8' : '#333');
  ctx.restore();
}
function iceberg(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#dfe9f2'; ctx.beginPath(); ctx.moveTo(-160, 0); ctx.lineTo(-110, -150); ctx.lineTo(-60, -120); ctx.lineTo(-20, -260); ctx.lineTo(40, -180); ctx.lineTo(90, -210); ctx.lineTo(160, 0); ctx.fill(); ctx.fillStyle = '#a9bfd3'; ctx.beginPath(); ctx.moveTo(-20, -260); ctx.lineTo(40, -180); ctx.lineTo(10, 0); ctx.lineTo(-40, 0); ctx.fill(); ctx.restore(); }
SCENES.ship = (t, p, b, gt) => {
  sky('#02040a', '#071122', '#0d1b30', 760); stars(120);
  sea(760, gt);
  ctx.save(); if (p.zoomIce) focus(260, 720, lerp(1, 1.4, E.inout(t / 3)));
  iceberg(170, 772, 1.05);
  const hk = p.hit > 0 ? cl((t - p.hit) / .4) : 1;
  titanic(lerp(330, 230, E.out(cl(t / 3))) , 740, .95, gt);
  if (p.hit && t > Math.max(0, p.hit)) particles(14, 2, (x, y, r) => { const k = cl((t - Math.max(0, p.hit)) * .9 - r * .3); if (k > 0 && k < 1) circle(210 + x * 60, 700 + k * 90 + y * 20, 4 + r * 6, '#dfe9f2'); });
  ctx.restore();
  vignette(.6);
};
SCENES.deck = (t, p, b, gt) => {
  ctx.save(); if (p.tilt) { ctx.translate(W / 2, H / 2); ctx.rotate(.07 + Math.sin(gt) * .005); ctx.translate(-W / 2, -H / 2); }
  sky('#02040a', '#08142a', '#0e2038', 900); stars(80);
  sea(900, gt);
  // borda y pescantes
  ctx.fillStyle = '#2b2118'; ctx.fillRect(-60, 980, W + 120, H);
  for (let x = -60; x < W + 60; x += 40) seg([[x, 980], [x + 40, 980]], 2, '#4a3a2a');
  seg([[-60, 900], [W + 60, 900]], 6, '#d9d2c2'); for (let x = -40; x < W + 60; x += 60) seg([[x, 900], [x, 980]], 4, '#d9d2c2');
  const lk = p.lower ? E.inout(t / 4.5) * (p.lower) : 0; const by = lerp(760, 1060, lk);
  seg([[440, 980], [440, 640], [520, 620]], 8, '#d9d2c2'); seg([[660, 980], [660, 640], [600, 620]], 8, '#d9d2c2');
  seg([[520, 620], [500, by - 30]], 2, '#ccc'); seg([[600, 620], [620, by - 30]], 2, '#ccc');
  if (by < 1060) {
    for (let i = 0; i < 4; i++) stick({ x: 500 + i * 34, y: by - 10, s: .9, pose: 'stand', t: gt + i, face: i % 2 ? 1 : -1, body: '#cfc8bb', acc: [] });
    ctx.fillStyle = '#f2efe8'; ctx.beginPath(); ctx.moveTo(460, by - 30); ctx.lineTo(670, by - 30); ctx.quadraticCurveTo(650, by + 20, 600, by + 24); ctx.lineTo(520, by + 24); ctx.quadraticCurveTo(470, by + 20, 460, by - 30); ctx.fill();
    text('7', 565, by - 4, { size: 22, fam: 'Cinzel', w: 900, color: INK });
  }
  if (p.crowd) for (let i = 0; i < 6; i++) stick({ x: 60 + i * 60, y: 1110, s: 1.3, pose: i % 2 ? 'cross' : 'stand', t: gt + i, face: 1, body: '#bfb6a6', expr: 'neutral', acc: i % 3 === 0 ? ['hair'] : [] });
  you({ x: 300, y: 1230, s: 2.3, pose: 'stand', t: gt, face: 1, expr: 'worried' });
  // aliento
  ctx.save(); ctx.globalAlpha = .25 * (.5 + .5 * Math.sin(gt * 2)); circle(360, 970, 14 + (gt * 10 % 10), '#fff'); ctx.restore();
  ctx.restore();
  vignette(.6);
};
SCENES.count = (t, p, b, gt) => {
  ctx.fillStyle = lin(0, 0, 0, H, [[0, '#0b1424'], [1, '#050912']]); ctx.fillRect(0, 0, W, H);
  const nb = Math.min(20, Math.floor(t / .09) + (p.fill ? 20 : 0));
  for (let i = 0; i < 20; i++) { const x = 92 + (i % 10) * 60, y = 600 + Math.floor(i / 10) * 50; ctx.save(); ctx.globalAlpha = i < nb ? 1 : .15; ctx.fillStyle = '#f2efe8'; ctx.beginPath(); ctx.moveTo(x - 22, y - 8); ctx.lineTo(x + 22, y - 8); ctx.quadraticCurveTo(x + 18, y + 10, x + 8, y + 10); ctx.lineTo(x - 8, y + 10); ctx.quadraticCurveTo(x - 18, y + 10, x - 22, y - 8); ctx.fill(); ctx.restore(); }
  text('20 BOTES', W / 2, 715, { size: 26, fam: 'Cinzel', w: 900, color: '#f3e6cc', ls: 3 });
  const cols = 58, cs = 10.6, x0 = (W - cols * cs) / 2 + cs / 2, y0 = 760; const fk = p.fill ? E.out(t / 1.6) : 0;
  for (let i = 0; i < 2224; i++) { const x = x0 + (i % cols) * cs, y = y0 + Math.floor(i / cols) * cs; const saved = i < 1178 * fk; ctx.fillStyle = saved ? '#ff9b42' : 'rgba(220,225,235,.35)'; ctx.fillRect(x - 3, y - 3, 6, 6); }
  text(p.fill ? '1.178 PLAZAS' : '2.224 PERSONAS', W / 2, 1200, { size: 30, fam: 'Cinzel', w: 900, color: p.fill ? '#ff9b42' : '#f3e6cc', ls: 2 });
};
SCENES.cold = (t, p, b, gt) => {
  ctx.fillStyle = lin(0, 0, 0, H, [[0, '#02050b'], [.45, '#0b1e33'], [1, '#02060c']]); ctx.fillRect(0, 0, W, H);
  stars(60, .6);
  ctx.fillStyle = 'rgba(40,90,140,.35)'; ctx.fillRect(0, 640, W, H);
  ctx.strokeStyle = 'rgba(200,230,255,.5)'; ctx.lineWidth = 3; ctx.beginPath(); for (let x = 0; x <= W; x += 10) ctx.lineTo(x, 640 + Math.sin(x * .03 + gt * 2) * 6); ctx.stroke();
  for (let i = 0; i < 5; i++) { const x = 60 + i * 150, y = 634 + Math.sin(gt + i) * 4; ctx.fillStyle = '#dfe9f2'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 40, y - 18); ctx.lineTo(x + 80, y); ctx.lineTo(x + 60, y + 16); ctx.lineTo(x + 10, y + 14); ctx.fill(); }
  // termómetro
  ctx.save(); ctx.translate(520, 960); fillRR(-26, -300, 52, 300, 26, '#f2efe8'); circle(0, 20, 46, '#f2efe8'); fillRR(-12, -280 + 240 * (1 - E.out(t / 2) * .2), 24, 280, 12, '#4aa3df'); circle(0, 20, 32, '#4aa3df'); ctx.restore();
  text('-2 °C', 290, 760, { size: 120, fam: 'Cinzel', w: 900, color: '#bfe3ff', shadow: '#4aa3df', blur: 30 });
  particles(30, 7, (x, y, r) => { const yy = H - ((gt * 40 * (r + .3) + y * H) % (H - 640)); circle(x * W, yy, 2 + r * 3, 'rgba(200,230,255,.35)'); });
  vignette(.6);
};
SCENES.sinking = (t, p, b, gt) => {
  sky('#010205', '#050a16', '#09142a', 860); stars(120);
  const k = E.inout(t / 5);
  ctx.save(); ctx.translate(400, 800 + k * 110); ctx.rotate(-.3 - k * .3); titanic(-260, -30, 1, gt, t < 1.8 ? (hash(Math.floor(gt * 10)) > .3 ? 1 : 0) : 0); ctx.restore();
  ctx.fillStyle = lin(0, 860, 0, H, [[0, '#060b14'], [1, '#020407']]); ctx.fillRect(0, 860, W, H);
  sea(860, gt);
  for (let i = 0; i < 3; i++) { const x = 120 + i * 230, y = 1120 + i * 30; ctx.fillStyle = '#d9d2c2'; ctx.beginPath(); ctx.ellipse(x, y, 60, 12, 0, 0, TAU); ctx.fill(); circle(x + 30, y - 20, 5, '#ffd27a'); glow(x + 30, y - 20, 30, 'rgba(255,200,100,.4)'); }
  vignette(.65);
};
SCENES.boats = (t, p, b, gt) => {
  sky('#010205', '#061024', '#0b1a33', 780); stars(140);
  sea(780, gt);
  for (let i = 0; i < 4; i++) { const x = 90 + i * 190, y = 860 + (i % 2) * 30 + Math.sin(gt + i) * 4; ctx.fillStyle = '#cfc8bb'; ctx.beginPath(); ctx.moveTo(x - 60, y); ctx.lineTo(x + 60, y); ctx.lineTo(x + 45, y + 18); ctx.lineTo(x - 45, y + 18); ctx.fill(); circle(x + 50, y - 26, 4, '#ffd27a'); glow(x + 50, y - 26, 26, 'rgba(255,200,100,.4)'); for (let j = 0; j < 2; j++) stick({ x: x - 30 + j * 40, y: y + 2, s: .6, pose: 'stand', t: gt + j, body: '#a9a196' }); }
  // tu bote en primer plano
  const y = 1150 + Math.sin(gt * 1.1) * 6;
  you({ x: 300, y: y - 6, s: 2.1, pose: 'sit', t: gt, face: -1, expr: 'worried' });
  ctx.fillStyle = '#e9e3d6'; ctx.beginPath(); ctx.moveTo(60, y - 40); ctx.lineTo(660, y - 40); ctx.quadraticCurveTo(620, y + 40, 520, y + 50); ctx.lineTo(200, y + 50); ctx.quadraticCurveTo(100, y + 40, 60, y - 40); ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,.15)'; ctx.fillRect(60, y - 40, 600, 12);
  text('7', 560, y, { size: 30, fam: 'Cinzel', w: 900, color: INK });
  vignette(.6);
};
// ---------- Lisboa ----------
SCENES.church = (t, p, b, gt) => {
  ctx.fillStyle = lin(0, 0, 0, H, [[0, '#1b120c'], [1, '#0b0705']]); ctx.fillRect(0, 0, W, H);
  // vidriera
  ctx.save(); ctx.beginPath(); ctx.moveTo(250, 640); ctx.lineTo(250, 380); ctx.arc(360, 380, 110, PI, 0); ctx.lineTo(470, 640); ctx.closePath(); ctx.clip();
  const cols = ['#c8392b', '#2c5aa0', '#d9a62e', '#3c8a5a', '#7a3c8a']; for (let i = 0; i < 40; i++) { ctx.fillStyle = cols[i % 5]; ctx.globalAlpha = .55; ctx.fillRect(250 + (i % 5) * 44, 270 + Math.floor(i / 5) * 46, 44, 46); }
  ctx.restore(); ctx.globalAlpha = 1; glow(360, 470, 300, 'rgba(255,220,160,.15)');
  // arcos
  ctx.strokeStyle = '#3b2a1e'; ctx.lineWidth = 26; for (const x of [60, 660]) { ctx.beginPath(); ctx.moveTo(x, H); ctx.lineTo(x, 400); ctx.stroke(); }
  ctx.beginPath(); ctx.arc(360, 420, 300, PI, 0); ctx.stroke();
  // altar con velas
  fillRR(160, 720, 400, 90, 6, '#3b2a1e');
  for (let i = 0; i < 24; i++) { const x = 170 + (i % 12) * 34, y = 720 - Math.floor(i / 12) * 40 - (i % 12 % 2) * 10; const fall = p.shake ? cl((t - 1.5 - hash(i) * 2) / .5) : 0;
    ctx.save(); ctx.translate(x, y); ctx.rotate(fall * (hash(i + 3) > .5 ? 1.4 : -1.4)); fillRR(-5, -30, 10, 30, 2, '#efe6d0');
    const fl = 1 + Math.sin(gt * 18 + i) * .2; ctx.beginPath(); ctx.ellipse(0, -38, 4 * fl, 9 * fl, 0, 0, TAU); ctx.fillStyle = '#ffb347'; ctx.fill(); ctx.restore(); glow(x, y - 38, 34, 'rgba(255,170,70,.35)');
    if (fall >= 1) { glow(x, 790, 60 + Math.sin(gt * 9 + i) * 8, 'rgba(255,110,30,.5)'); } }
  // bancos con gente
  for (let r = 0; r < 3; r++) { for (let i = 0; i < 6; i++) if (!(r === 2 && i === 3)) stick({ x: 80 + i * 112, y: 960 + r * 110, s: 1.1 + r * .2, pose: p.shake && t > 1 ? 'scared' : 'sit', t: gt + i * r, face: 1, body: '#5a4a3e', line: '#120c08', faceless: true, headCol: '#5a4a3e' }); fillRR(30, 930 + r * 110, 660, 26, 6, '#2a1c12'); }
  you({ x: 416, y: 1180, s: 1.5, pose: p.shake && t > 1 ? 'scared' : 'sit', t: gt, face: 1, expr: p.shake ? 'scared' : 'neutral' });
  if (p.shake) { particles(30, 4, (x, y, r) => { const k = ((gt * (.5 + r) + y) % 1); circle(x * W, k * H, 3 + r * 6, 'rgba(140,120,100,.7)'); }); ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(120, 300); ctx.lineTo(160, 380 * cl(t / 2) + 300); ctx.lineTo(130, 520 * cl(t / 2)); ctx.stroke(); }
  vignette(.6);
};
SCENES.collapse = (t, p, b, gt) => {
  sky('#4a3a30', '#8a6a52', '#c9a27a', 900);
  for (let i = 0; i < 4; i++) { const x = -20 + i * 190, h = 380 + hash(i) * 120; ctx.fillStyle = ['#d8c3a0', '#c9a27a', '#e0cfa8', '#bfa07a'][i]; ctx.fillRect(x, 1000 - h, 180, h); for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) { ctx.fillStyle = '#3b2a1e'; ctx.fillRect(x + 22 + c * 52, 1000 - h + 30 + r * 80, 26, 44); } }
  particles(26, 6, (x, y, r, i) => { const st = r * 2.5, k = cl((t - st) / 1.2); if (k <= 0) return; ctx.save(); ctx.translate(40 + x * 640, 500 + y * 200 + k * k * 600); ctx.rotate(k * (r - .5) * 6); ctx.fillStyle = r > .5 ? '#bfa07a' : '#8f7458'; ctx.fillRect(-16 - r * 12, -10, 32 + r * 24, 20 + r * 10); ctx.restore(); });
  ctx.fillStyle = '#3b2f26'; ctx.fillRect(0, 1000, W, H);
  for (let i = 0; i < 10; i++) circle(hash(i) * W, 1000 - hash(i + 2) * 120, 80 + hash(i + 4) * 70 + t * 10, 'rgba(190,170,150,.45)');
  glow(600, 700, 260, 'rgba(255,110,30,.35)');
  you({ x: lerp(120, 480, E.inout(t / 5)), y: 1200, s: 2.3, pose: 'run', t: gt, face: 1, expr: 'scared' });
  vignette(.55);
};
SCENES.plaza = (t, p, b, gt) => {
  sky('#5c6a74', '#a7b2b4', '#d8d2c2', 640);
  // colinas
  ctx.fillStyle = '#7a6a56'; ctx.beginPath(); ctx.moveTo(-40, 700); ctx.quadraticCurveTo(120, 430, 260, 640); ctx.lineTo(260, 700); ctx.fill();
  ctx.beginPath(); ctx.moveTo(480, 660); ctx.quadraticCurveTo(640, 420, 780, 640); ctx.lineTo(780, 700); ctx.fill();
  if (p.hills) for (let i = 0; i < 8; i++) { const k = (gt * .05 + i / 8) % 1; stick({ x: 40 + k * 150, y: 690 - k * 200, s: .45, pose: 'walk', t: gt + i, face: 1, body: '#efe6d6', faceless: true }); }
  const rec = p.recede ? (p.already ? 1 : E.inout(t / 4)) : 0; const wav = p.wave ? E.inout(t / 5.5) : 0;
  const wl = 650 + rec * 170;
  // lecho del río al descubierto
  ctx.fillStyle = '#6b5640'; ctx.fillRect(0, 650, W, 180);
  if (rec > .3) { ctx.save(); ctx.globalAlpha = cl((rec - .3) * 2); for (let i = 0; i < 5; i++) { const x = 60 + i * 140; ctx.fillStyle = '#3b2a1e'; ctx.beginPath(); ctx.moveTo(x, 760); ctx.lineTo(x + 70, 770); ctx.lineTo(x + 50, 790); ctx.lineTo(x + 10, 790); ctx.fill(); } for (let i = 0; i < 6; i++) circle(100 + i * 100, 800 + hash(i) * 10, 5, '#c9d6dc'); ctx.restore(); }
  ctx.fillStyle = '#4c6a7a'; ctx.fillRect(0, wl, W, 830 - wl);
  for (let i = 0; i < 4; i++) { const x = 90 + i * 170, y = Math.min(wl, 760) - 10; ctx.save(); ctx.translate(x, y + rec * 30); ctx.rotate(rec * (i % 2 ? .3 : -.25)); ctx.fillStyle = '#2a1c12'; ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(40, 0); ctx.lineTo(28, 20); ctx.lineTo(-28, 20); ctx.fill(); seg([[0, 0], [0, -90]], 4, '#2a1c12'); ctx.fillStyle = '#e9e3d6'; ctx.fillRect(4, -84, 30, 40); ctx.restore(); }
  // plaza
  ctx.fillStyle = '#cbbfa6'; ctx.fillRect(0, 830, W, H); for (let i = 0; i < 12; i++) seg([[i * 70 - 100, H], [360 + (i - 6) * 20, 830]], 1.5, 'rgba(0,0,0,.08)');
  particles(26, 9, (x, y, r, i) => { const bc = ['#7a6a5c', '#6b4a3a', '#4f5a66', '#8a7a5c'][i % 4]; stick({ x: x * W, y: 870 + y * 230, s: .55 + y * .5, pose: rec > .5 && !p.wave ? (i % 3 ? 'point' : 'look') : 'stand', t: gt + i, face: r > .5 ? 1 : -1, body: bc, line: '#2a1d14', faceless: true, headCol: bc }); });
  you({ x: 360, y: 1220, s: 2.2, pose: p.wave ? 'run' : 'stand', t: gt, face: p.wave ? -1 : 1, expr: rec > .5 ? 'worried' : 'neutral', look: 1 });
  if (p.wave) {
    const top = lerp(620, -200, wav); const g = ctx.createLinearGradient(0, top, 0, H); g.addColorStop(0, '#e9f2f5'); g.addColorStop(.06, '#3d6476'); g.addColorStop(1, '#13262f');
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-50, H + 50); for (let x = -50; x <= W + 50; x += 20) ctx.lineTo(x, top + Math.sin(x * .02 + gt * 3) * 30 + Math.sin(x * .007) * 60); ctx.lineTo(W + 50, H + 50); ctx.fill();
  }
  vignette(.45);
};
SCENES.fire = (t, p, b, gt) => {
  sky('#0b0503', '#2a0f06', '#6b2a10', 820);
  for (let i = 0; i < 9; i++) { const x = i * 85 - 20, h = 180 + hash(i) * 200; ctx.fillStyle = '#120904'; ctx.fillRect(x, 900 - h, 80, h + 400); if (i % 2) { ctx.beginPath(); ctx.moveTo(x, 900 - h); ctx.lineTo(x + 40, 900 - h - 40); ctx.lineTo(x + 80, 900 - h); ctx.fill(); } }
  for (let i = 0; i < 16; i++) { const x = hash(i) * W, y = 900 - hash(i + 1) * 300; const s = 30 + hash(i + 2) * 50;
    glow(x, y, s * 3, 'rgba(255,100,20,.35)');
    for (let k = 0; k < 4; k++) { const fh = s * (1 + .3 * Math.sin(gt * 9 + i + k)); ctx.fillStyle = ['#ff5a1f', '#ff8a2a', '#ffc04a', '#fff0b0'][k]; ctx.beginPath(); ctx.moveTo(x - s * (.5 - k * .1), y); ctx.quadraticCurveTo(x - s * .2, y - fh * (1 - k * .15), x + Math.sin(gt * 5 + i) * 6, y - fh * (1.3 - k * .2)); ctx.quadraticCurveTo(x + s * .2, y - fh * .7, x + s * (.5 - k * .1), y); ctx.fill(); } }
  for (let i = 0; i < 12; i++) circle(hash(i + 5) * W, 400 - ((gt * 20 + i * 40) % 400), 60 + hash(i) * 60, 'rgba(40,25,20,.35)');
  ctx.fillStyle = '#0b0603'; ctx.fillRect(0, 900, W, H);
  particles(50, 13, (x, y, r) => { const yy = ((y * H - gt * (60 + r * 80)) % H + H) % H; circle(x * W, yy, 1.5 + r * 2, `rgba(255,${120 + r * 80},40,${.5 + r * .5})`); });
  you({ x: 360, y: 1210, s: 2.3, pose: 'stand', t: gt, face: -1, expr: 'scared' });
  vignette(.55);
};
SCENES.rebuild = (t, p, b, gt) => {
  ctx.fillStyle = '#10243f'; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(160,200,255,.12)'; ctx.lineWidth = 1; for (let x = 0; x < W; x += 24) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = 0; y < H; y += 24) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  const k = E.inout(t / 4);
  ctx.strokeStyle = '#d9ecff'; ctx.lineWidth = 3;
  for (let i = 0; i < 6; i++) { const y = 290 + i * 50; ctx.beginPath(); ctx.moveTo(80, y); ctx.lineTo(80 + 560 * cl(k * 1.4 - i * .08), y); ctx.stroke(); }
  for (let i = 0; i < 8; i++) { const x = 80 + i * 80; ctx.beginPath(); ctx.moveTo(x, 290); ctx.lineTo(x, 290 + 250 * cl(k * 1.4 - i * .06)); ctx.stroke(); }
  text('BAIXA POMBALINA', W / 2, 600, { size: 28, fam: 'Cinzel', w: 900, color: '#d9ecff', ls: 4 });
  // jaula de madera antisísmica
  ctx.save(); ctx.translate(360, 740); ctx.globalAlpha = cl((t - 1) / 1); ctx.strokeStyle = '#ffcf8a'; ctx.lineWidth = 4;
  ctx.strokeRect(-150, -110, 300, 220); for (let i = 0; i < 3; i++) { const x = -150 + i * 100; ctx.beginPath(); ctx.moveTo(x, -110); ctx.lineTo(x + 100, 110); ctx.moveTo(x + 100, -110); ctx.lineTo(x, 110); ctx.stroke(); }
  text('ESTRUCTURA ANTISÍSMICA', 0, -132, { size: 18, w: 800, color: '#ffcf8a', ls: 3 }); ctx.restore();
  vignette(.5);
};
