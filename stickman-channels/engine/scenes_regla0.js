// Escenas de REGLA 0 — Temporada 1: "Línea 0"
function focus(cx, cy, s) { ctx.translate(W / 2, H * .46); ctx.scale(s, s); ctx.translate(-cx, -cy); }
function tubeLight(x, y, w, on = 1) {
  fillRR(x, y, w, 10, 5, on > .5 ? '#f4f8ff' : '#3a3f48');
  if (on > .5) { ctx.save(); ctx.globalAlpha = .35 * on; glow(x + w / 2, y + 5, w * .9, 'rgba(200,225,255,.6)'); ctx.restore(); }
}
function flickerOn(gt, start, seed = 1) { if (gt < start) return 1; const k = Math.floor((gt - start) * 22); return hash(k * 3.1 + seed) > .45 ? 1 : .15; }

function platformBase(t, p, gt, opts = {}) {
  // techo
  ctx.fillStyle = lin(0, 0, 0, 280, [[0, '#07080b'], [1, '#12151c']]); ctx.fillRect(0, 0, W, 280);
  const on = p.flicker ? flickerOn(t, p.flicker) : 1;
  for (let i = 0; i < 3; i++) tubeLight(40 + i * 250, 226, 150, on);
  // pared del fondo (al otro lado de las vías)
  ctx.fillStyle = lin(0, 280, 0, 780, [[0, '#1a2431'], [1, '#121922']]); ctx.fillRect(0, 280, W, 500);
  ctx.strokeStyle = 'rgba(255,255,255,.035)'; ctx.lineWidth = 1.5;
  for (let y = 300; y < 780; y += 34) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  for (let y = 300, r = 0; y < 780; y += 34, r++) for (let x = (r % 2) * 30; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 34); ctx.stroke(); }
  ctx.fillStyle = '#9c7a2c'; ctx.fillRect(0, 520, W, 16); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(0, 536, W, 4);
  fillRR(70, 400, 330, 70, 8, '#1d4e89'); ctx.lineWidth = 3; ctx.strokeStyle = '#e8eef7'; ctx.stroke();
  text('ESTACIÓN CENTRAL', 235, 436, { size: 26, fam: 'Oswald', w: 700, ls: 2 });
  // reloj
  clockFace(560, 420, 62, opts.clockMin ?? 58, gt);
  // vías
  ctx.fillStyle = '#060709'; ctx.fillRect(0, 780, W, 130);
  for (let x = -40; x < W + 40; x += 46) { ctx.fillStyle = '#16120e'; ctx.fillRect(x, 850, 28, 40); }
  ctx.fillStyle = '#6d727c'; ctx.fillRect(0, 852, W, 6); ctx.fillRect(0, 884, W, 6);
  // andén
  ctx.fillStyle = lin(0, 905, 0, H, [[0, '#2a2d35'], [1, '#14161b']]); ctx.fillRect(0, 905, W, H - 905);
  ctx.fillStyle = '#e0b021'; ctx.fillRect(0, 912, W, 22);
  ctx.fillStyle = 'rgba(0,0,0,.25)'; for (let x = 6; x < W; x += 18) { circle(x, 918, 2.4, 'rgba(0,0,0,.25)'); circle(x + 9, 928, 2.4, 'rgba(0,0,0,.25)'); }
  // reflejo de luces en el suelo
  ctx.save(); ctx.globalAlpha = .08 * on; for (let i = 0; i < 3; i++) { ctx.fillStyle = '#cfe2ff'; ctx.fillRect(40 + i * 250, 1000, 150, 200); } ctx.restore();
}
function clockFace(x, y, r, min, gt) {
  circle(x, y, r + 6, '#0b0c0f'); circle(x, y, r, '#f2f2ee');
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; seg([[x + Math.sin(a) * r * .8, y - Math.cos(a) * r * .8], [x + Math.sin(a) * r * .92, y - Math.cos(a) * r * .92]], i % 3 ? 2 : 4, '#111'); }
  const hA = ((23 + min / 60) % 12) / 12 * TAU, mA = min / 60 * TAU, sA = Math.floor(gt) / 60 * TAU * 7;
  ctx.lineCap = 'round';
  seg([[x, y], [x + Math.sin(hA) * r * .5, y - Math.cos(hA) * r * .5]], 6, '#111');
  seg([[x, y], [x + Math.sin(mA) * r * .78, y - Math.cos(mA) * r * .78]], 4, '#111');
  seg([[x, y], [x + Math.sin(sA) * r * .82, y - Math.cos(sA) * r * .82]], 2, '#d62828'); circle(x, y, 4, '#d62828');
}
function ledPanel(x, y, w, h, msg, col, gt, flick = 0) {
  seg([[x + 40, y - 60], [x + 40, y]], 4, '#2a2d33'); seg([[x + w - 40, y - 60], [x + w - 40, y]], 4, '#2a2d33');
  fillRR(x, y, w, h, 8, '#050505'); ctx.lineWidth = 4; ctx.strokeStyle = '#2b2e35'; ctx.stroke();
  if (flick && hash(Math.floor(gt * 25)) < .5) return;
  ctx.save(); ctx.beginPath(); ctx.rect(x + 6, y + 6, w - 12, h - 12); ctx.clip();
  let fz = h * .5; while (measure(msg, fz, 'Oswald', 700, 4) > w - 40) fz -= 1;
  text(msg, x + w / 2, y + h / 2 + 2, { size: fz, fam: 'Oswald', w: 700, color: col, shadow: col, blur: 18, ls: 4 });
  // rejilla de LEDs
  ctx.fillStyle = 'rgba(0,0,0,.55)'; for (let i = x; i < x + w; i += 5) ctx.fillRect(i, y, 1.6, h); for (let j = y; j < y + h; j += 5) ctx.fillRect(x, j, w, 1.6);
  ctx.restore();
}

SCENES.platform = (t, p, b, gt) => {
  ctx.save();
  if (p.view === 'clock') { const k = E.inout((t - 1.6) / 2.4); focus(lerp(560, 360, k), lerp(420, 720, k), lerp(2.7, 1, k)); }
  else if (p.view === 'sign') focus(360, 420, 1.35);
  platformBase(t, p, gt, { clockMin: p.view === 'sign' ? 59 : 58 });
  const flipped = p.flip === 0 || (p.flip && t > p.flip + .5);
  const flick = p.flip && t > p.flip && t < p.flip + .5;
  ledPanel(130, 270, 460, 96, flipped ? 'L0 · 00:00 · ÚLTIMO TREN' : 'SERVICIO FINALIZADO', flipped ? '#ff4b3a' : '#ffb347', gt, flick);
  if (flipped) { ctx.save(); ctx.globalAlpha = .25 + .1 * Math.sin(gt * 6); glow(360, 320, 360, 'rgba(255,60,40,.5)'); ctx.restore(); }
  you({ x: 230, y: 1170, s: 2.4, pose: p.view === 'sign' ? 'look' : 'stand', t: gt, expr: flipped ? 'worried' : 'neutral', look: p.view === 'sign' ? .6 : 1 });
  ctx.restore();
  vignette(.75);
};

function trainBody(x0, gt, doorOpen, inner = '#fff1cf') {
  // tren con puertas cada 380px; x0 = borde delantero
  const y = 520, h = 370, len = 1900;
  ctx.fillStyle = lin(0, y, 0, y + h, [[0, '#3b414e'], [.5, '#2a2f39'], [1, '#1b1e25']]); rr(x0, y, len, h, [60, 10, 10, 10]); ctx.fill();
  ctx.fillStyle = '#c62d2d'; ctx.fillRect(x0, y + 290, len, 16);
  for (let i = 0; i < 5; i++) {
    const dx = x0 + 170 + i * 380;
    // ventanas
    fillRR(dx + 100, y + 60, 170, 120, 10, inner);
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(dx + 100, y + 150, 170, 30);
    // puerta doble
    const o = doorOpen * 62;
    fillRR(dx - 65, y + 40, 130, h - 60, 6, inner);
    ctx.save(); ctx.beginPath(); ctx.rect(dx - 65, y + 40, 130, h - 60); ctx.clip();
    ctx.fillStyle = '#4a5160'; ctx.fillRect(dx - 65 - o, y + 40, 65, h - 60); ctx.fillRect(dx + o, y + 40, 65, h - 60);
    fillRR(dx - 55 - o, y + 70, 45, 120, 6, inner); fillRR(dx + 10 + o, y + 70, 45, 120, 6, inner);
    if (i === 1) { ctx.save(); ctx.translate(dx + 32 + o, y + 130); ctx.rotate(.06); fillRR(-14, -18, 28, 36, 2, '#f6f0dc'); ctx.restore(); }
    ctx.restore();
  }
  // faro
  glow(x0 + 20, y + 260, 160, 'rgba(255,250,220,.55)'); circle(x0 + 26, y + 260, 12, '#fffbe6');
}
SCENES.train_arrive = (t, p, b, gt) => {
  platformBase(t, p, gt, { clockMin: 0 });
  const k = E.out(t / 2.3); const x0 = lerp(W + 40, -400, k);
  const open = E.inout((t - 2.5) / .7);
  trainBody(x0, gt, open);
  // estelas de velocidad
  if (k < .95) { ctx.save(); ctx.globalAlpha = (1 - k) * .5; for (let i = 0; i < 18; i++) { const yy = 540 + hash(i) * 330; ctx.fillStyle = '#fff'; ctx.fillRect(((hash(i + 9) * W) - gt * 2500) % W + W, yy, 120, 2); ctx.fillRect(hash(i + 3) * W, yy, 80 * (1 - k), 2); } ctx.restore(); }
  if (open > 0) { ctx.save(); ctx.globalAlpha = open * .5; glow(-400 + 170 + 380, 700, 260, 'rgba(255,235,190,.6)'); ctx.restore(); }
  ledPanel(130, 270, 460, 96, 'L0 · 00:00 · ÚLTIMO TREN', '#ff4b3a', gt);
  you({ x: 470, y: 1180, s: 2.4, pose: 'stand', t: gt, face: -1, expr: t > 2.6 ? 'worried' : 'neutral' });
  vignette(.7);
};
SCENES.note = (t, p, b, gt) => {
  const dark = p.dark ? .25 : 1;
  ctx.fillStyle = p.dark ? '#0d0f14' : lin(0, 0, 0, H, [[0, '#d9c9a6'], [1, '#8f7d5d']]); ctx.fillRect(0, 0, W, H);
  if (!p.dark) { ctx.save(); ctx.globalAlpha = .35; for (let i = 0; i < 6; i++) fillRR(-40 + i * 150, 560 + (i % 2) * 40, 110, 300, 20, '#4b5f86'); ctx.restore(); }
  // marco de la puerta / cristal
  ctx.fillStyle = '#3a404c'; ctx.fillRect(0, 0, 70, H); ctx.fillRect(W - 70, 0, 70, H);
  ctx.save(); ctx.globalAlpha = .12; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(90, 0); ctx.lineTo(300, 0); ctx.lineTo(120, H); ctx.lineTo(70, H); ctx.fill(); ctx.restore();
  // papel
  ctx.save(); ctx.translate(360, 820 + Math.sin(gt * 1.3) * 2); ctx.rotate(-.04);
  ctx.shadowColor = 'rgba(0,0,0,.4)'; ctx.shadowBlur = 30; ctx.fillStyle = p.dark ? '#5d5848' : '#f5efdc'; ctx.fillRect(-210, -260, 420, 520); ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(230,220,160,.7)'; ctx.save(); ctx.rotate(-.3); ctx.fillRect(-230, -230, 90, 30); ctx.restore(); ctx.save(); ctx.translate(200, -250); ctx.rotate(.4); ctx.fillRect(-45, -15, 90, 30); ctx.restore();
  text('REGLAS', 0, -205, { size: 44, fam: 'Anton', w: 400, color: '#1b1b1b', ls: 6 });
  const R = ['1. NO TE SIENTES EN EL ÚLTIMO VAGÓN', '2. SI LAS LUCES PARPADEAN, NO MIRES', '3. SI DICEN TU NOMBRE, NO CONTESTES', '4. NO BAJES HASTA QUE ARRANQUE', '5. CIERRA LOS OJOS Y CUENTA HASTA 0'];
  const n = p.line || 1;
  R.forEach((r, i) => {
    const y = -130 + i * 78; const vis = i < n - (p.line === 5 ? 1 : 0) || i === n - 1;
    if (i === 4 && n < 5) { ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-170, y); ctx.lineTo(170, y); ctx.stroke(); return; }
    if (i === 3 && n < 4) { ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-170, y); ctx.lineTo(170, y); ctx.stroke(); return; }
    const lines = wrap(r, 22, 340, 'Oswald', 500);
    lines.forEach((l, j) => text(l, -175, y + j * 26, { size: 22, fam: 'Oswald', w: 500, color: i === n - 1 ? '#a01818' : 'rgba(20,20,20,.8)', align: 'left', ls: 1 }));
    if (i === n - 1) { ctx.strokeStyle = 'rgba(180,20,20,.7)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, y + 12, 205, 34, 0, 0, TAU); ctx.stroke(); }
  });
  ctx.restore();
  if (p.dark) { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = rad(360, 820, 60, 520, [[0, '#fff'], [1, '#050505']]); ctx.fillRect(0, 0, W, H); ctx.restore(); }
  vignette(.7);
};
function interior(t, p, gt, outside = 'tunnel') {
  const on = p.dark ? .2 : (p.flicker ? flickerOn(t, p.flicker, 4) : 1);
  const sway = Math.sin(gt * 2.1) * 2;
  ctx.save(); ctx.translate(0, sway);
  ctx.fillStyle = lin(0, 0, 0, H, [[0, shade('#c9ccd3', on - 1)], [.6, shade('#9aa0aa', on - 1)], [1, shade('#3a3e46', on - 1)]]); ctx.fillRect(0, -10, W, H + 20);
  ctx.fillStyle = shade('#e8eaef', on - 1); ctx.fillRect(0, 0, W, 250);
  fillRR(40, 200, W - 80, 16, 8, on > .5 ? '#ffffff' : '#555');
  if (on > .5) { ctx.save(); ctx.globalAlpha = .4; glow(360, 210, 420, 'rgba(255,255,255,.5)'); ctx.restore(); }
  // ventanas
  for (let i = 0; i < 3; i++) {
    const x = -60 + i * 290, y = 330, w = 240, h = 290;
    fillRR(x - 8, y - 8, w + 16, h + 16, 30, shade('#7c828d', on - 1));
    ctx.save(); rr(x, y, w, h, 24); ctx.clip();
    if (outside === 'tunnel') {
      ctx.fillStyle = '#020203'; ctx.fillRect(x, y, w, h);
      for (let k = 0; k < 4; k++) { const lx = ((hash(k * 7) * 900 - gt * 1800) % 900 + 900) % 900 - 100; ctx.fillStyle = 'rgba(255,200,120,.8)'; ctx.fillRect(lx, y + 60 + k * 50, 160, 3); }
    } else stationOutside(x, y, w, h, gt, p._off || 0);
    ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.beginPath(); ctx.moveTo(x + 30, y); ctx.lineTo(x + 90, y); ctx.lineTo(x + 20, y + h); ctx.lineTo(x - 40, y + h); ctx.fill();
    ctx.restore();
  }
  // cara que pasa por fuera
  if (p.face && t > p.face) { const k = (t - p.face) / 1.1; if (k < 1) { const fx = lerp(W + 120, -200, k); ctx.save(); rr(-60, 330, W + 120, 290, 24); ctx.clip(); ctx.beginPath(); ctx.ellipse(fx, 470, 70, 95, 0, 0, TAU); ctx.fillStyle = 'rgba(235,235,235,.85)'; ctx.fill(); circle(fx - 22, 450, 12, '#000'); circle(fx + 22, 450, 12, '#000'); ctx.beginPath(); ctx.ellipse(fx, 520, 14, 22, 0, 0, TAU); ctx.fillStyle = '#000'; ctx.fill(); ctx.restore(); } }
  // asiento
  fillRR(-20, 700, W + 40, 60, 14, shade('#2e4f86', on - 1)); fillRR(-20, 755, W + 40, 90, 10, shade('#24406e', on - 1));
  ctx.fillStyle = shade('#2c3038', on - 1); ctx.fillRect(0, 845, W, 30);
  ctx.fillStyle = lin(0, 875, 0, H, [[0, shade('#4a4e57', on - 1)], [1, '#16171b']]); ctx.fillRect(0, 875, W, H);
  for (const x of [110, 610]) { seg([[x, 0], [x, 875]], 14, shade('#d7dbe2', on - 1)); }
  ctx.restore();
  return on;
}
function stationOutside(x, y, w, h, gt, off) {
  ctx.fillStyle = '#42563f'; ctx.fillRect(x, y, w, h);
  const base = x - off;
  ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1.5; for (let yy = y; yy < y + h; yy += 26) { ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + w, yy); ctx.stroke(); }
  for (let k = -2; k < 6; k++) { const px = base + k * 260 - x * 0; if (px > x - 260 && px < x + w + 260) { fillRR(px + 40, y + 70, 150, 64, 6, '#e9e4c8'); text('ESTACIÓN 0', px + 115, y + 103, { size: 22, fam: 'Oswald', w: 700, color: '#1d1d1d', ls: 1 }); } }
  ctx.fillStyle = 'rgba(255,255,200,.08)'; ctx.fillRect(x, y, w, h);
}
SCENES.train_interior = (t, p, b, gt) => {
  const on = interior(t, p, gt);
  const pose = p.down ? 'sitdown' : 'sit';
  you({ x: 360, y: 875, s: 2.3, pose, t: gt, expr: p.down ? 'worried' : 'neutral', look: p.down ? .3 : 1, over: p.dark ? {} : {} });
  if (on < .5 || p.dark) { ctx.fillStyle = 'rgba(0,4,20,.55)'; ctx.fillRect(0, 0, W, H); }
  vignette(.65);
};
SCENES.station0_arrive = (t, p, b, gt) => {
  const k = E.out(t / 3); p._off = (1 - k) * 1600 - 70;
  const on = interior(t, p, gt, 'station');
  you({ x: 360, y: 875, s: 2.3, pose: 'sit', t: gt, expr: 'worried', look: -1, face: 1 });
  vignette(.6);
};
SCENES.car_end = (t, p, b, gt) => {
  const vx = 360, vy = 560; const dk = p.dark ? .35 : 1;
  ctx.fillStyle = shade('#b9bec7', dk - 1); ctx.fillRect(0, 0, W, H);
  const dw = 170, dh = 330; const dx = vx - dw / 2, dy = vy - dh / 2 + 40;
  // techo y suelo en perspectiva
  ctx.fillStyle = shade('#e3e5ea', dk - 1); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(dx + dw + 40, dy - 20); ctx.lineTo(dx - 40, dy - 20); ctx.fill();
  ctx.fillStyle = shade('#3c4049', dk - 1); ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(W, H); ctx.lineTo(dx + dw + 40, dy + dh); ctx.lineTo(dx - 40, dy + dh); ctx.fill();
  // asientos laterales
  ctx.fillStyle = shade('#2e4f86', dk - 1);
  ctx.beginPath(); ctx.moveTo(0, 820); ctx.lineTo(dx - 40, dy + dh - 70); ctx.lineTo(dx - 40, dy + dh - 30); ctx.lineTo(0, 1000); ctx.fill();
  ctx.beginPath(); ctx.moveTo(W, 820); ctx.lineTo(dx + dw + 40, dy + dh - 70); ctx.lineTo(dx + dw + 40, dy + dh - 30); ctx.lineTo(W, 1000); ctx.fill();
  // ventanas laterales
  ctx.fillStyle = '#050608';
  for (let i = 0; i < 3; i++) { const a = i / 3, bq = (i + .7) / 3; const xa = lerp(0, dx - 40, a), xb = lerp(0, dx - 40, bq);
    ctx.beginPath(); ctx.moveTo(xa, lerp(330, dy + 20, a)); ctx.lineTo(xb, lerp(330, dy + 20, bq)); ctx.lineTo(xb, lerp(700, dy + dh - 90, bq)); ctx.lineTo(xa, lerp(700, dy + dh - 90, a)); ctx.fill();
    const xa2 = W - xa, xb2 = W - xb; ctx.beginPath(); ctx.moveTo(xa2, lerp(330, dy + 20, a)); ctx.lineTo(xb2, lerp(330, dy + 20, bq)); ctx.lineTo(xb2, lerp(700, dy + dh - 90, bq)); ctx.lineTo(xa2, lerp(700, dy + dh - 90, a)); ctx.fill(); }
  // luz del techo en perspectiva
  ctx.strokeStyle = dk > .5 ? '#fff' : '#444'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(vx, 0); ctx.lineTo(vx, dy - 24); ctx.stroke();
  // barras
  seg([[150, 0], [150, H]], 22, shade('#d7dbe2', dk - 1)); seg([[570, 0], [570, H]], 22, shade('#d7dbe2', dk - 1));
  // puerta del fondo
  fillRR(dx, dy, dw, dh, 8, shade('#59606e', dk - 1));
  const wx = dx + 35, wy = dy + 40, ww = dw - 70, wh = 130;
  ctx.save(); rr(wx, wy, ww, wh, 8); ctx.clip(); ctx.fillStyle = '#020203'; ctx.fillRect(wx, wy, ww, wh);
  if (p.figure) {
    const g = p.approach ? 1 + E.inout(t / 4) * .8 : 1; const fx = vx + Math.sin(gt * .7) * 3, fy = wy + wh + 10;
    ctx.save(); ctx.translate(fx, fy); ctx.scale(g, g);
    ctx.fillStyle = '#0d0d12'; ctx.beginPath(); ctx.ellipse(0, -62, 22, 26, 0, 0, TAU); ctx.fill(); ctx.fillRect(-36, -40, 72, 60);
    ctx.strokeStyle = 'rgba(245,197,24,.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(0, -62, 26, 30, 0, PI * 1.1, PI * 1.9); ctx.stroke();
    if (p.eyes) { circle(-8, -64, 3, '#fff'); circle(8, -64, 3, '#fff'); }
    ctx.restore();
  }
  ctx.restore();
  ctx.lineWidth = 4; ctx.strokeStyle = '#2b2f37'; rr(wx, wy, ww, wh, 8); ctx.stroke();
  if (dk < .5) { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = rad(vx, vy, 40, 700, [[0, '#9aa'], [1, '#000']]); ctx.fillRect(0, 0, W, H); ctx.restore(); }
  vignette(.8, .2);
};
function station0Out(x, y, w, h, gt, t, p) {
  const off = p.leave ? Math.pow(Math.max(0, t - .6), 2) * 260 : 0;
  ctx.fillStyle = lin(0, y, 0, y + h, [[0, '#2f4430'], [1, '#1a261b']]); ctx.fillRect(x, y, w, h);
  ctx.save(); ctx.translate(-off, 0);
  ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1.5; for (let yy = y; yy < y + h; yy += 30) { ctx.beginPath(); ctx.moveTo(x - 2000, yy); ctx.lineTo(x + w + 2000, yy); ctx.stroke(); }
  fillRR(x + 70, y + 70, 220, 80, 6, '#d9d4b6'); text('ESTACIÓN 0', x + 180, y + 111, { size: 30, fam: 'Oswald', w: 700, color: '#1d1d1d', ls: 1 });
  fillRR(x - 200, y + 70, 220, 80, 6, '#d9d4b6');
  ctx.fillStyle = 'rgba(200,255,200,.12)'; ctx.fillRect(x + 380, y, 6, h);
  // suelo del andén
  ctx.fillStyle = '#121a13'; ctx.fillRect(x - 2000, y + h - 120, w + 4000, 120);
  ctx.fillStyle = '#b89a2a'; ctx.fillRect(x - 2000, y + h - 120, w + 4000, 10);
  // figura
  const fs = p.close ? lerp(2.1, 2.6, E.inout(t / 3)) : 2.1;
  const pose = p.wave != null && t > p.wave ? 'wave' : 'stand';
  stick({ x: x + 400, y: y + h - 40, s: fs, pose, t: gt, face: -1, acc: ['raincoat'], faceless: true, eyes: !!p.dark, body: '#c9c9c9' });
  ctx.restore();
  // luz enfermiza parpadeante
  ctx.save(); ctx.globalAlpha = .18 + .08 * Math.sin(gt * 13) * (hash(Math.floor(gt * 8)) > .7 ? 1 : 0); ctx.fillStyle = '#bfffbf'; ctx.fillRect(x, y, w, h); ctx.restore();
}
SCENES.station0_window = (t, p, b, gt) => {
  ctx.fillStyle = p.dark ? '#090a0d' : '#5c626d'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = p.dark ? '#0d0f13' : '#8a909b'; ctx.fillRect(0, 0, W, 200); ctx.fillRect(0, 1060, W, H);
  const x = 50, y = 300, w = 620, h = 720;
  fillRR(x - 18, y - 18, w + 36, h + 36, 50, p.dark ? '#16181d' : '#3b404a');
  ctx.save(); rr(x, y, w, h, 40); ctx.clip(); station0Out(x, y, w, h, gt, t, p);
  // reflejo tuyo en el cristal
  ctx.save(); ctx.globalAlpha = .07; stick({ x: x + 140, y: y + h + 60, s: 3, pose: 'stand', t: gt, acc: ['raincoat'], body: '#ffffff' }); ctx.restore();
  if (p.scrawl) {
    ctx.save(); ctx.translate(x + 330, y + 300); ctx.rotate(-.08); const k = cl(t / 1.2);
    ctx.beginPath(); ctx.rect(-260, -60, 520 * k, 120); ctx.clip();
    text('NO BAJES', 0, 0, { size: 92, fam: 'Anton', w: 400, color: 'rgba(240,240,240,.55)', ls: 4 }); ctx.restore();
  }
  ctx.fillStyle = 'rgba(255,255,255,.05)'; ctx.beginPath(); ctx.moveTo(x + 60, y); ctx.lineTo(x + 200, y); ctx.lineTo(x + 40, y + h); ctx.lineTo(x - 100, y + h); ctx.fill();
  ctx.restore();
  if (p.dark) { ctx.fillStyle = 'rgba(0,0,10,.45)'; ctx.fillRect(0, 0, W, H); }
  vignette(.7);
};
SCENES.doors_closing = (t, p, b, gt) => {
  ctx.fillStyle = '#7d838e'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#a3a8b2'; ctx.fillRect(0, 0, W, 240);
  const k = cl((p.start || 0) + (1 - (p.start || 0)) * E.inout(t / ((b.end - b.start) * 1.05)));
  const gap = lerp(330, 8, k); const cx = 360, top = 260, bot = 1080;
  ctx.save(); ctx.beginPath(); ctx.rect(cx - gap / 2, top, gap, bot - top); ctx.clip(); station0Out(cx - 310, top, 620, bot - top, gt, t, {}); ctx.restore();
  for (const sgn of [-1, 1]) {
    const x = sgn < 0 ? cx - gap / 2 - 200 : cx + gap / 2;
    fillRR(x, top, 200, bot - top, 6, '#4b5262'); ctx.lineWidth = 4; ctx.strokeStyle = '#2b2f38'; ctx.stroke();
    ctx.save(); rr(x + 30, top + 60, 140, 300, 14); ctx.clip(); station0Out(x + 30 - (sgn < 0 ? 0 : 300) , top + 60, 450, 300, gt, t, {}); ctx.restore();
    fillRR(sgn < 0 ? x + 186 : x, top, 14, bot - top, 4, '#1e2128');
  }
  const blink = Math.floor(gt * 2.5) % 2 === 0; circle(cx, 212, 18, blink ? '#ff3030' : '#4a1010'); if (blink) glow(cx, 212, 120, 'rgba(255,40,40,.4)');
  ctx.fillStyle = '#2a2d33'; ctx.fillRect(0, 1080, W, H);
  vignette(.7);
};
SCENES.tunnel_dark = (t, p, b, gt) => {
  ctx.fillStyle = '#010102'; ctx.fillRect(0, 0, W, H);
  const k = (gt * .7) % 1; ctx.save(); ctx.globalAlpha = .5 * Math.sin(k * PI); ctx.fillStyle = 'rgba(255,190,110,.4)'; ctx.fillRect(lerp(W + 100, -300, k), 300, 220, 400); ctx.restore();
  ctx.save(); ctx.globalAlpha = .12; interior(t, { dark: 1 }, gt); ctx.restore();
  ctx.save(); ctx.globalAlpha = .9; circle(334, 760, 5, '#fff'); circle(386, 760, 5, '#fff'); ctx.restore();
  ctx.save(); ctx.globalAlpha = .08; you({ x: 360, y: 875, s: 2.3, pose: 'sit', t: gt }); ctx.restore();
};
SCENES.eyes_closed = (t, p, b, gt) => {
  const beat = Math.pow(Math.max(0, Math.sin(gt * TAU * 1.25)), 8);
  ctx.fillStyle = rad(360, 640, 30, 800, [[0, `rgb(${70 + beat * 50},6,8)`], [1, '#050000']]); ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(120,10,10,.35)'; ctx.lineWidth = 2;
  for (let i = 0; i < 14; i++) { ctx.beginPath(); let x = 360, y = 640; ctx.moveTo(x, y); for (let j = 0; j < 8; j++) { x += (hash(i * 9 + j) - .5) * 160 + Math.cos(i) * 40; y += (hash(i * 5 + j * 3) - .5) * 160 + Math.sin(i) * 40; ctx.lineTo(x, y); } ctx.stroke(); }
};
SCENES.bedroom = (t, p, b, gt) => {
  ctx.fillStyle = lin(0, 0, 0, H, [[0, '#121a2c'], [1, '#0a0e18']]); ctx.fillRect(0, 0, W, H);
  // ventana
  fillRR(60, 230, 280, 300, 8, '#1d2740'); ctx.save(); rr(76, 246, 248, 268, 4); ctx.clip();
  ctx.fillStyle = lin(0, 276, 0, 604, [[0, '#0b1430'], [1, '#26315a']]); ctx.fillRect(76, 276, 248, 328);
  circle(260, 340, 26, '#f2efd8'); glow(260, 340, 90, 'rgba(240,240,210,.25)');
  for (let i = 0; i < 9; i++) { const bx = 76 + i * 30, bh = 60 + hash(i) * 140; ctx.fillStyle = '#0a0f1f'; ctx.fillRect(bx, 604 - bh, 26, bh); for (let j = 0; j < 5; j++) if (hash(i * 13 + j) > .6) { ctx.fillStyle = '#f5d27a'; ctx.fillRect(bx + 8, 604 - bh + 12 + j * 22, 6, 8); } }
  ctx.restore(); seg([[200, 276], [200, 604]], 8, '#1d2740'); seg([[76, 440], [324, 440]], 8, '#1d2740');
  // luz de luna en el suelo
  ctx.save(); ctx.globalAlpha = .12; ctx.fillStyle = '#c9d6ff'; ctx.beginPath(); ctx.moveTo(76, 604); ctx.lineTo(324, 604); ctx.lineTo(520, 1100); ctx.lineTo(180, 1100); ctx.fill(); ctx.restore();
  ctx.save(); ctx.translate(0, -190);
  // mesilla con reloj
  fillRR(470, 820, 190, 150, 8, '#2a2118'); fillRR(500, 770, 130, 56, 8, '#0b0b0b'); text('23:58', 565, 800, { size: 40, fam: 'Oswald', w: 700, color: '#ff3b30', shadow: '#ff3b30', blur: 18, ls: 2 });
  // cama
  fillRR(30, 930, 520, 90, 14, '#3b2a1e'); fillRR(40, 880, 500, 80, 30, '#2f3e66'); fillRR(30, 860, 120, 60, 25, '#d9dce6');
  you({ x: 360, y: 900, s: 2.0, pose: 'lie', t: gt, rot: -PI / 2, expr: 'scared', look: -1, acc: [] , nohood: true, over: {} });
  ctx.fillStyle = '#2f3e66'; rr(160, 878, 380, 64, 28); ctx.fill();
  if (p.coat) {
    // silla con chubasquero empapado
    fillRR(580, 980, 18, 200, 4, '#3b2a1e'); fillRR(690, 980, 18, 200, 4, '#3b2a1e'); fillRR(570, 960, 150, 24, 6, '#4a3626'); fillRR(690, 780, 18, 200, 4, '#3b2a1e');
    ctx.fillStyle = '#e3b414'; ctx.beginPath(); ctx.moveTo(600, 790); ctx.quadraticCurveTo(690, 760, 705, 800); ctx.lineTo(720, 1040); ctx.lineTo(590, 1050); ctx.closePath(); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = '#111'; ctx.stroke();
    for (let i = 0; i < 4; i++) { const k = ((gt * 1.6 + i * .25) % 1); circle(605 + i * 32, 1050 + k * 140, 4, 'rgba(160,200,255,.8)'); }
    ctx.save(); ctx.globalAlpha = .5; ctx.beginPath(); ctx.ellipse(650, 1205, 110, 18, 0, 0, TAU); ctx.fillStyle = '#5b7bb5'; ctx.fill(); ctx.restore();
  }
  ctx.restore();
  vignette(.75);
};
SCENES.phone = (t, p, b, gt) => {
  ctx.fillStyle = lin(0, 0, 0, H, [[0, '#0b0e16'], [1, '#05060a']]); ctx.fillRect(0, 0, W, H);
  const buzz = (b.sfx || []).some(([n, at]) => n === 'buzz' && t - at > 0 && t - at < 1.2) ? Math.sin(gt * 120) * 4 : 0;
  ctx.save(); ctx.translate(buzz, 0);
  glow(360, 720, 560, 'rgba(120,170,255,.32)');
  // mano/brazo
  ctx.lineCap = 'round'; seg([[760, 1400], [520, 1060]], 64, '#15151b'); seg([[760, 1400], [520, 1060]], 50, '#d8d8de');
  fillRR(140, 300, 440, 820, 54, '#0a0a0a'); fillRR(156, 316, 408, 788, 42, '#1b1d24');
  fillRR(300, 330, 120, 26, 13, '#000');
  // cabecera del chat
  circle(360, 420, 34, '#3a3d46'); text(p.from || 'YO', 360, 422, { size: 22, w: 900, color: '#fff' });
  text('Tu número', 360, 476, { size: 15, w: 600, color: 'rgba(255,255,255,.5)' });
  ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(156, 500, 408, 2);
  let y = 560;
  (p.msgs || []).forEach(([m, at]) => {
    if (at >= 0 && t < at) { if (t > at - .9) { fillRR(180, y - 24, 90, 50, 25, '#2c2c30'); for (let i = 0; i < 3; i++) circle(205 + i * 20, y + 1, 5 + Math.sin(gt * 9 + i) * 1.5, '#8e8e93'); } return; }
    const a = at < 0 ? 1 : E.back(cl((t - at) / .3)); const big = /Regla 0/i.test(m);
    const fz = big ? 40 : 30; const mw = measure(m, fz, 'Montserrat', 700) + 44;
    ctx.save(); ctx.translate(180, y); ctx.scale(a, a); fillRR(0, -32, mw, 64, 28, big ? '#b3261e' : '#2c2c30'); text(m, 22, 1, { size: fz, w: 700, color: '#fff', align: 'left' }); ctx.restore();
    y += 86;
  });
  ctx.restore();
  vignette(.6);
};
SCENES.phone_final = (t, p, b, gt) => SCENES.phone(9, { from: 'YO', msgs: [['Regla 0:', -1], ['Nunca te bajaste.', -1]] }, { sfx: [] }, gt);
