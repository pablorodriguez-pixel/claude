// «Sticky tiene 10 segundos» · ep. 3: el coche se cala en el paso a nivel
const RY = 770, CARX = 300, CARS = 1.25; // vía, coche

function duskSky() {
  ctx.fillStyle = lin(0, 0, 0, RY, [[0, '#3b2a6b'], [.55, '#c8577a'], [1, '#ffb36b']]); ctx.fillRect(-60, -60, W + 120, RY + 60);
  ctx.fillStyle = '#5a3d6e'; ctx.beginPath(); ctx.moveTo(-60, 620); ctx.lineTo(120, 540); ctx.lineTo(260, 600); ctx.lineTo(420, 520); ctx.lineTo(600, 590); ctx.lineTo(W + 60, 540); ctx.lineTo(W + 60, 700); ctx.lineTo(-60, 700); ctx.fill();
  ctx.fillStyle = '#3d5a3a'; ctx.fillRect(-60, 690, W + 120, 90);
}
function track(gt) {
  ctx.fillStyle = '#7a7068'; ctx.fillRect(-60, RY - 14, W + 120, 40);
  for (let x = -60; x < W + 60; x += 46) fillRR(x, RY - 6, 30, 16, 3, '#5a3a24');
  seg([[-60, RY - 8], [W + 60, RY - 8]], 8, '#c9ccd1'); seg([[-60, RY + 10], [W + 60, RY + 10]], 8, '#c9ccd1');
  ctx.fillStyle = '#4a6b3e'; ctx.fillRect(-60, RY + 26, W + 120, H);
  // carretera que cruza hacia cámara
  ctx.fillStyle = '#55585e'; ctx.beginPath(); ctx.moveTo(CARX - 170, RY + 26); ctx.lineTo(CARX + 170, RY + 26); ctx.lineTo(CARX + 380, H + 60); ctx.lineTo(CARX - 380, H + 60); ctx.fill();
  for (let i = 0; i < 4; i++) fillRR(CARX - 8 - i * 2, RY + 70 + i * 120, 16 + i * 4, 60 + i * 10, 4, 'rgba(255,255,255,.6)');
}
function crossingSignal(gt, on) {
  seg([[70, RY + 20], [70, 470]], 12, '#111'); seg([[70, RY + 20], [70, 470]], 6, '#ddd');
  ctx.save(); ctx.translate(70, 450); ctx.rotate(.6); fillRR(-60, -10, 120, 20, 4, '#fff'); ctx.rotate(-1.2); fillRR(-60, -10, 120, 20, 4, '#fff'); ctx.restore();
  fillRR(20, 490, 100, 44, 22, '#111'); const ph = Math.floor(gt * 2) % 2;
  for (const [x, k] of [[45, 0], [95, 1]]) { const lit = on && ph === k; circle(x, 512, 16, lit ? '#ff2a2a' : '#4a1414'); if (lit) glow(x, 512, 70, 'rgba(255,40,40,.5)'); }
  // barrera bajada
  seg([[86, 600], [CARX - 200, 600]], 16, '#111'); for (let x = 90; x < CARX - 200; x += 40) seg([[x, 600], [Math.min(x + 20, CARX - 200), 600]], 10, '#e5383b');
}
function train(tx, gt) {
  if (tx > W + 40) { const k = cl(1 - (tx - W) / 1400); glow(W + 20, RY - 200, 200 + 500 * k, `rgba(255,250,210,${.3 + .5 * k})`); return; }
  ctx.save(); ctx.translate(tx, 0); ctx.lineJoin = 'round';
  // cono de luz del faro
  ctx.fillStyle = lin(0, 0, -500, 0, [[0, 'rgba(255,250,210,.55)'], [1, 'rgba(255,250,210,0)']]); ctx.beginPath(); ctx.moveTo(20, RY - 210); ctx.lineTo(-520, RY - 320); ctx.lineTo(-520, RY + 40); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(0, RY - 30); ctx.lineTo(0, RY - 220); ctx.lineTo(70, RY - 330); ctx.lineTo(1600, RY - 330); ctx.lineTo(1600, RY - 30); ctx.closePath();
  ctx.fillStyle = '#f2c230'; ctx.fill(); ctx.lineWidth = 10; ctx.strokeStyle = '#111'; ctx.stroke();
  fillRR(0, RY - 130, 1600, 34, 0, '#e5383b'); ctx.beginPath(); ctx.moveTo(40, RY - 300); ctx.lineTo(80, RY - 310); ctx.lineTo(200, RY - 310); ctx.lineTo(200, RY - 230); ctx.lineTo(24, RY - 230); ctx.closePath(); ctx.fillStyle = '#29343f'; ctx.fill(); ctx.lineWidth = 7; ctx.stroke();
  for (let x = 300; x < 1600; x += 170) { fillRR(x, RY - 290, 110, 70, 8, '#29343f'); ctx.lineWidth = 6; rr(x, RY - 290, 110, 70, 8); ctx.stroke(); }
  circle(24, RY - 200, 18, '#fffbe0'); glow(24, RY - 200, 120, 'rgba(255,250,210,.8)');
  for (let x = 120; x < 1600; x += 260) { circle(x, RY - 22, 30, '#111'); circle(x, RY - 22, 12, '#9aa3ad'); }
  ctx.restore();
}
function innerSticky(gt, crank) { return () => { ctx.save(); ctx.beginPath(); ctx.moveTo(-60, -66); ctx.lineTo(-36, -100); ctx.lineTo(0, -100); ctx.lineTo(0, -66); ctx.closePath(); ctx.clip(); sticky({ x: -28, y: -36, s: .45, pose: 'sitpanic', t: gt, face: 1, expr: 'scared' }); ctx.restore(); if (crank) { const k = Math.sin(gt * 20) * .3; seg([[2, -70], [10 + k * 10, -60]], 4, '#111'); } }; }
function arrowBig(x0, y0, x1, y1, col, label, a, pulse, lb) {
  if (a <= 0) return; const ang = Math.atan2(y1 - y0, x1 - x0), len = Math.hypot(x1 - x0, y1 - y0) * a;
  ctx.save(); ctx.translate(x0, y0); ctx.rotate(ang); const s = 1 + pulse * .06;
  ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, -18); ctx.lineTo(len - 50, -18); ctx.lineTo(len - 50, -44); ctx.lineTo(len, 0); ctx.lineTo(len - 50, 44); ctx.lineTo(len - 50, 18); ctx.lineTo(0, 18); ctx.closePath();
  ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = '#111'; ctx.stroke(); ctx.restore();
  if (a >= 1 && label) { const w = measure(label, 40, 'Anton', 400, 2) + 50, lx = cl(lb ? lb[0] : x1, w / 2 + 16, W - w / 2 - 16), ly = lb ? lb[1] : y1 + 80; fillRR(lx - w / 2, ly - 34, w, 68, 22, '#111'); text(label, lx, ly + 2, { size: 40, fam: 'Anton', w: 400, color: col, ls: 2 }); }
}

SCENES.xing = (t, p, b, gt) => {
  const bd = Math.max(.5, b.end - b.start), g = p.freeze ? b.start + .1 : gt;
  duskSky(); track(g); crossingSignal(g, true);
  let tx = p.tx0 != null ? lerp(p.tx0, p.tx1 ?? p.tx0, cl(t / bd)) : (p.tx ?? 2000);
  // el choque
  let carX = CARX, carY = RY - 30, carR = 0, hitK = 0;
  if (p.hit) { hitK = t; tx = lerp(CARX + 194, -1700, cl(t / 3.2)); const k = cl(t / 1.6); carX = lerp(CARX, -900, k); carY = RY - 30 - Math.sin(cl(t / 1.0) * PI) * 160; carR = -k * 6; }
  if (p.wreck) { carX = -40; carY = RY + 10; carR = PI * .92; tx = -2500; }
  if (!p.gone) carSide(carX, carY, CARS, carR, p.inside ? innerSticky(g, p.crank) : null);
  if (p.wreck) { smokeWisps(-10, RY - 40, .8, g, 'rgba(50,50,56,'); flame(-10, RY - 20, 120, 120, g, 2); }
  // Sticky fuera del coche
  if (p.runA) { const k = cl(t / bd); sticky({ x: lerp(250, 40, k), y: RY + 30, s: 1.5, pose: 'run', t: g, face: -1, expr: 'scared' }); }
  if (p.hit && p.runner === 'A') sticky({ x: 40, y: RY + 30, s: 1.5, pose: 'scared', t: g, face: 1, expr: 'scared' });
  if (p.exit) { const k = E.inout(cl((t - .2) / (bd - .3))); sticky({ x: lerp(CARX + 60, 560, k), y: lerp(RY + 20, 1010, k), s: lerp(1.4, 2.0, k), pose: k > 0 && k < 1 ? 'run' : 'stand', t: g, face: 1, expr: 'scared' }); }
  if (p.hit && p.runner === 'B') sticky({ x: 580, y: 1030, s: 2.1, pose: 'huddle', t: g, face: -1, expr: 'scared' });
  if (p.after) sticky({ x: 560, y: 1030, s: 2.1, pose: p.sad ? 'sitdown' : 'phone', t: g, face: -1, expr: p.sad ? 'tired' : 'worried', acc: p.sad ? ['cap', 'scarf'] : ['cap', 'scarf', 'phone'] });
  if (p.after && !p.sad) { const a = E.back(cl((t - .4) / .3)); ctx.save(); ctx.translate(560, 640); ctx.scale(a, a); fillRR(-80, -40, 160, 80, 24, '#e5383b'); text('112', 0, 3, { size: 56, fam: 'Anton', w: 400, color: '#fff', ls: 3 }); ctx.restore(); }
  train(tx, g);
  // restos que salen hacia delante (hacia la izquierda)
  if (p.hit) { for (let i = 0; i < 22; i++) { const v = 400 + hash(i) * 700, a = PI + (hash(i + 4) - .5) * 1.1; const k = t * 1.2; if (k > 1.6) continue; fillRR(CARX + Math.cos(a) * v * k, RY - 80 + Math.sin(a) * v * k + 500 * k * k, 14 + hash(i) * 20, 10 + hash(i + 2) * 14, 3, i % 3 ? '#e5383b' : '#bfe6ff'); }
    if (t < .12) { ctx.fillStyle = `rgba(255,255,240,${1 - t / .12})`; ctx.fillRect(-60, -60, W + 120, H + 120); } }
  if (p.choice) {
    const a1 = E.out(cl((t - .2) / .35)), a2 = E.out(cl((t - .5) / .35)), pu = Math.sin(gt * 8) * .5 + .5;
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-60, -60, W + 120, H + 120);
    arrowBig(CARX - 60, RY - 190, 50, RY - 300, p.badA ? '#ff3b5c' : '#ffd400', 'A · LEJOS DEL TREN', a1, p.badA ? pu : 0, [220, RY - 390]);
    arrowBig(CARX + 120, RY + 40, 560, 1010, '#4fe3ff', 'B · HACIA EL TREN', a2, 0, [460, 1080]);
    if (p.badA) { const s = E.back(cl((t - .3) / .3)); ctx.save(); ctx.translate(60, RY - 390); ctx.scale(s, s); circle(0, 0, 44, '#ff3b5c'); ctx.strokeStyle = '#fff'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-20, -20); ctx.lineTo(20, 20); ctx.moveTo(20, -20); ctx.lineTo(-20, 20); ctx.stroke(); ctx.restore(); }
  }
  if (p.danger) dangerFx(gt, p.danger);
  if (p.freeze) { ctx.fillStyle = 'rgba(20,30,70,.2)'; ctx.fillRect(-60, -60, W + 120, H + 120); }
  if (p.cut && t > p.cut) { ctx.fillStyle = '#000'; ctx.fillRect(-60, -60, W + 120, H + 120); const s = E.back(cl((t - p.cut) / .2)); ctx.save(); ctx.translate(W / 2 + Math.sin(gt * 60) * 6, 560); ctx.scale(s, s); ctx.rotate(-.06); text('¡CRASH!', 0, 0, { size: 170, fam: 'Anton', w: 400, color: '#ff3b5c', stroke: '#fff', sw: 10, ls: 4 }); ctx.restore(); }
  if (p.rewind) vhs(gt, p.rlabel || 'REBOBINA');
  if (p.stamp) stamp(p.stamp, p.label || '', t);
};

// ---------- mapa desde arriba: hacia dónde salen los trozos ----------
SCENES.railmap = (t, p, b, gt) => {
  const bd = Math.max(1, b.end - b.start);
  ctx.fillStyle = '#5c8a4a'; ctx.fillRect(-60, -60, W + 120, H + 120);
  ctx.fillStyle = '#55585e'; ctx.fillRect(-60, 590, W + 120, 120); for (let x = -40; x < W; x += 90) fillRR(x, 646, 50, 8, 4, 'rgba(255,255,255,.7)');
  ctx.fillStyle = '#7a7068'; ctx.fillRect(300, -60, 120, H + 120); for (let y = -60; y < H + 60; y += 40) fillRR(306, y, 108, 14, 3, '#5a3a24');
  seg([[335, -60], [335, H + 60]], 8, '#c9ccd1'); seg([[385, -60], [385, H + 60]], 8, '#c9ccd1');
  // tren desde arriba
  const ty = lerp(180, 330, cl(t / bd)); fillRR(318, ty - 1200, 84, 1200, 14, '#f2c230'); ctx.lineWidth = 7; ctx.strokeStyle = '#111'; rr(318, ty - 1200, 84, 1200, 14); ctx.stroke(); glow(360, ty + 20, 120, 'rgba(255,250,210,.8)');
  fillRR(140, ty - 120, 120, 56, 28, '#111'); text('TREN', 200, ty - 92, { size: 32, fam: 'Anton', w: 400, color: '#f2c230', ls: 3 }); arrowHead(200, ty - 30, PI / 2, '#f2c230', 1.1);
  // zona de peligro: hacia donde va el tren
  const za = E.out(cl((t - .3) / .5));
  ctx.save(); ctx.globalAlpha = za * .6; ctx.fillStyle = '#ff3b5c'; ctx.beginPath(); ctx.moveTo(300, 700); ctx.lineTo(420, 700); ctx.lineTo(680, 1180); ctx.lineTo(40, 1180); ctx.closePath(); ctx.fill(); ctx.restore();
  if (za > .5) { fillRR(110, 1100, 500, 64, 20, '#111'); text('AQUÍ SALEN LOS TROZOS', 360, 1133, { size: 36, fam: 'Anton', w: 400, color: '#ff8fa3', ls: 2 }); }
  // coche en el cruce
  fillRR(290, 615, 140, 72, 14, '#e5383b'); ctx.lineWidth = 7; ctx.strokeStyle = '#111'; rr(290, 615, 140, 72, 14); ctx.stroke(); fillRR(330, 625, 50, 52, 8, '#29343f');
  // Sticky
  if (p.mode === 'bad') { const k = E.inout(cl((t - .4) / (bd * .5))); topSticky(lerp(300, 270, k), lerp(720, 840, k), gt);
    if (k >= 1) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(240, 810); ctx.lineTo(300, 870); ctx.moveTo(300, 810); ctx.lineTo(240, 870); ctx.stroke(); } }
  if (p.mode === 'good') { const k = E.inout(cl((t - .4) / (bd * .55)));
    ctx.save(); ctx.setLineDash([16, 14]); ctx.lineWidth = 8; ctx.strokeStyle = '#7ef0a8'; ctx.beginPath(); ctx.moveTo(440, 600); ctx.lineTo(610, 400); ctx.stroke(); ctx.restore(); arrowHead(610, 400, -0.86, '#7ef0a8', 1.3);
    ctx.save(); ctx.globalAlpha = .35; circle(620, 380, 90, '#7ef0a8'); ctx.restore(); topSticky(lerp(450, 610, k), lerp(590, 400, k), gt); }
  if (p.stamp) stamp(p.stamp, p.label || '', t);
};

// ---------- pregunta final ----------
SCENES.abask = (t, p, b, gt) => {
  duskSky(); track(gt); carSide(-40, RY + 10, CARS, PI * .92); smokeWisps(-10, RY - 40, .6, gt, 'rgba(50,50,56,');
  ctx.fillStyle = 'rgba(10,10,20,.5)'; ctx.fillRect(-60, -60, W + 120, H + 120);
  const a = E.back(cl((t - .05) / .4)); ctx.save(); ctx.translate(W / 2, 360); ctx.scale(a, a); ctx.rotate(-.02);
  ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 30; fillRR(-310, -150, 620, 300, 40, '#fff'); ctx.shadowBlur = 0; ctx.lineWidth = 8; ctx.strokeStyle = '#111'; rr(-310, -150, 620, 300, 40); ctx.stroke();
  text('SÉ SINCERO', 0, -92, { size: 44, fam: 'Anton', w: 400, color: '#ff3b5c', ls: 4 });
  text('¿HACIA DÓNDE', 0, -12, { size: 76, fam: 'Anton', w: 400, color: '#111', ls: 2 }); text('HABRÍAS CORRIDO?', 0, 76, { size: 70, fam: 'Anton', w: 400, color: '#111', ls: 2 }); ctx.restore();
  const opt = (lab, y, col, k) => { const s = E.back(cl((t - .6 - k * .15) / .3)); if (s <= 0) return; ctx.save(); ctx.translate(W / 2, y); ctx.scale(s, s); const w = measure(lab, 50, 'Anton', 400, 2) + 70; fillRR(-w / 2, -44, w, 88, 44, col); ctx.lineWidth = 6; ctx.strokeStyle = '#111'; rr(-w / 2, -44, w, 88, 44); ctx.stroke(); text(lab, 0, 4, { size: 50, fam: 'Anton', w: 400, color: '#111', ls: 2 }); ctx.restore(); };
  opt('A · LEJOS DEL TREN', 610, '#ffd400', 0); opt('B · HACIA EL TREN', 720, '#4fe3ff', 1);
  const s = E.back(cl((t - 1.1) / .3)), pu = 1 + Math.sin(gt * 6) * .04; if (s > 0) { ctx.save(); ctx.translate(W / 2, 840); ctx.scale(s * pu, s * pu); fillRR(-190, -38, 380, 76, 38, '#ff3b5c'); text('COMENTA', -20, 2, { size: 40, fam: 'Anton', w: 400, ls: 3 }); ctx.strokeStyle = '#fff'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(130, -14); ctx.lineTo(130, 16); ctx.moveTo(118, 4); ctx.lineTo(130, 17); ctx.lineTo(142, 4); ctx.stroke(); ctx.restore(); }
};
