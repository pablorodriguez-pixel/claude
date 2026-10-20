// REGLA 0 v2 — escenas nuevas del piloto rehecho (gancho en sección, móvil, megafonía)
SCENES.station_section = (t, p, b, gt) => {
  // ciudad de noche
  ctx.fillStyle = lin(0, 0, 0, 250, [[0, '#05060c'], [1, '#1a1830']]); ctx.fillRect(0, 0, W, 250);
  for (let i = 0; i < 14; i++) { const bx = i * 54 - 10, bh = 60 + hash(i + 2) * 150; ctx.fillStyle = '#0b0c14'; ctx.fillRect(bx, 250 - bh, 50, bh); for (let j = 0; j < 8; j++) if (hash(i * 11 + j) > .62) { ctx.fillStyle = 'rgba(255,214,140,.8)'; ctx.fillRect(bx + 8 + (j % 3) * 13, 250 - bh + 10 + Math.floor(j / 3) * 18, 6, 8); } }
  ctx.fillStyle = '#2a2a33'; ctx.fillRect(0, 244, W, 8);
  // boca de metro
  fillRR(470, 196, 120, 50, 6, '#1b1c24'); circle(530, 180, 22, '#e5383b'); text('0', 530, 182, { size: 26, fam: 'Anton', w: 400 });
  // estratos
  const strata = ['#2b2420', '#251f1b', '#211c19', '#1c1816', '#181513', '#141210'];
  strata.forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(0, 252 + i * 140); for (let x = 0; x <= W; x += 40) ctx.lineTo(x, 252 + i * 140 + Math.sin(x * .01 + i) * 10); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill(); });
  particles(60, 4, (x, y, r) => circle(x * W, 260 + y * 1000, 1 + r * 3, 'rgba(0,0,0,.25)'));
  // regla de profundidad
  ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(40, 252); ctx.lineTo(40, 1100); ctx.stroke();
  [[252, '0 M'], [464, '-10 M'], [676, '-20 M'], [888, '-30 M'], [1100, '-40 M']].forEach(([y, l], i) => { seg([[32, y], [48, y]], 2, 'rgba(255,255,255,.5)'); text(l, 58, y, { size: 15, w: 800, align: 'left', color: i === 4 ? S.accent : 'rgba(255,255,255,.55)', ls: 1 }); });
  ctx.restore();
  // túneles de escaleras mecánicas
  const shaft = (x0, y0, x1, y1) => { ctx.save(); ctx.lineCap = 'round'; seg([[x0, y0], [x1, y1]], 46, '#0d0e12'); seg([[x0, y0], [x1, y1]], 36, '#3b3d46'); ctx.setLineDash([3, 9]); seg([[x0, y0], [x1, y1]], 30, 'rgba(255,240,200,.35)'); ctx.restore(); };
  shaft(530, 250, 330, 560); shaft(280, 640, 470, 980);
  fillRR(160, 560, 420, 80, 12, '#0d0e12'); fillRR(168, 568, 404, 64, 8, '#3a3324'); glow(370, 600, 200, 'rgba(255,200,120,.25)'); text('VESTÍBULO', 370, 602, { size: 14, w: 900, ls: 4, color: 'rgba(255,255,255,.5)' });
  // andén
  ctx.save(); rr(70, 960, 640, 200, 90); ctx.fillStyle = '#0d0e12'; ctx.fill(); rr(80, 970, 620, 180, 82); ctx.clip();
  ctx.fillStyle = lin(0, 970, 0, 1150, [[0, '#1a2431'], [1, '#121922']]); ctx.fillRect(80, 970, 620, 180);
  for (let y = 980; y < 1100; y += 14) seg([[80, y], [700, y]], 1, 'rgba(255,255,255,.04)');
  const on = hash(Math.floor(gt * 9)) > .06 ? 1 : .3; for (let i = 0; i < 4; i++) { fillRR(150 + i * 140, 990, 80, 5, 2, on > .5 ? '#f4f8ff' : '#444'); ctx.save(); ctx.globalAlpha = .25 * on; glow(190 + i * 140, 994, 90, 'rgba(200,225,255,.6)'); ctx.restore(); }
  ctx.fillStyle = '#23262e'; ctx.fillRect(80, 1100, 620, 50); ctx.fillStyle = '#e0b021'; ctx.fillRect(80, 1100, 620, 6); ctx.fillStyle = '#050608'; ctx.fillRect(80, 1112, 620, 40);
  ctx.restore();
  // tú, diminuto
  you({ x: 400, y: 1100, s: .62, pose: 'phone', t: gt, acc: ['phone'], expr: 'worried' });
  // marcador
  const pa = cl((gt - 3.4) / .5); if (pa > 0) { ctx.save(); ctx.globalAlpha = pa; seg([[400, 1022], [400, 1052]], 2, S.accent); circle(400, 1056, 4, S.accent);
    const lab = 'TÚ · ANDÉN 0 · -40 M', lw = measure(lab, 15, 'Montserrat', 900, 2) + 26; fillRR(400 - lw / 2, 994, lw, 28, 14, 'rgba(0,0,0,.75)'); ctx.lineWidth = 1.5; ctx.strokeStyle = S.accent; ctx.stroke(); text(lab, 400, 1009, { size: 15, w: 900, color: S.accent, ls: 2 }); ctx.restore(); }
  vignette(.55, .4);
};
SCENES.phone_lock = (t, p, b, gt) => {
  ctx.fillStyle = '#05060a'; ctx.fillRect(0, 0, W, H);
  glow(360, 640, 600, 'rgba(110,140,255,.18)');
  ctx.save(); ctx.translate(360, 640); ctx.rotate(-.03);
  seg([[260, 760], [130, 520]], 70, '#15151b'); seg([[260, 760], [130, 520]], 56, '#d8d8de');
  fillRR(-230, -470, 460, 920, 62, '#0b0b0d'); ctx.save(); rr(-216, -456, 432, 892, 50); ctx.clip();
  ctx.fillStyle = lin(0, -456, 0, 436, [[0, '#1d2350'], [.55, '#3b1d4a'], [1, '#0d0d18']]); ctx.fillRect(-216, -456, 432, 892);
  fillRR(-60, -444, 120, 30, 15, '#000');
  text('SIN SERVICIO', -180, -400, { size: 15, w: 700, color: 'rgba(255,255,255,.8)', align: 'left' });
  fillRR(132, -410, 40, 18, 5, 'rgba(255,255,255,.25)'); fillRR(134, -408, 6, 14, 3, '#ff3b30'); text('4%', 122, -400, { size: 15, w: 800, color: '#ff3b30', align: 'right' });
  text('23:58', 0, -270, { size: 128, fam: 'Oswald', w: 500, color: 'rgba(255,255,255,.95)' });
  const N = [['METRO', 'Servicio finalizado. Último tren: 23:41.', '#e5383b', .2], ['Mamá', '¿Ya vienes? Avísame al salir.', '#34c759', .9], ['Batería baja', 'Queda un 4 % de batería.', '#ff9f0a', 2.6]];
  N.forEach(([h, m, c, at], i) => { const a = E.back(cl((t - at) / .35)); if (a <= 0) return; const y = -110 + i * 108; ctx.save(); ctx.translate(0, y + (1 - a) * 40); ctx.globalAlpha = cl(a);
    fillRR(-196, -44, 392, 92, 22, 'rgba(255,255,255,.16)'); fillRR(-180, -28, 40, 40, 10, c); text(h, -128, -16, { size: 18, w: 800, color: '#fff', align: 'left' }); text(m, -128, 14, { size: 15, w: 600, color: 'rgba(255,255,255,.85)', align: 'left' }); text('ahora', 180, -16, { size: 13, w: 600, color: 'rgba(255,255,255,.6)', align: 'right' }); ctx.restore(); });
  fillRR(-70, 410, 140, 6, 3, 'rgba(255,255,255,.7)');
  ctx.restore(); ctx.restore();
  vignette(.6);
};
SCENES.pa_speaker = (t, p, b, gt) => {
  ctx.fillStyle = lin(0, 0, 0, H, [[0, '#1a2431'], [1, '#0d131b']]); ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(255,255,255,.04)'; ctx.lineWidth = 2; for (let y = 0; y < H; y += 46) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } for (let y = 0, r = 0; y < H; y += 46, r++) for (let x = (r % 2) * 40; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 46); ctx.stroke(); }
  ctx.fillStyle = '#9c7a2c'; ctx.fillRect(0, 880, W, 22);
  // soporte y altavoz
  fillRR(330, 300, 60, 140, 8, '#2a2d34');
  const talking = t < (b.vdur || 0); const amp = talking ? .5 + .5 * Math.abs(Math.sin(gt * 17)) : 0;
  ctx.save(); ctx.translate(360, 560); ctx.scale(1 + amp * .015, 1 + amp * .015);
  circle(0, 0, 170, '#14161b'); circle(0, 0, 150, '#5b616d'); circle(0, 0, 136, '#2b2f37');
  for (let r = 20; r < 130; r += 16) { ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.lineWidth = 6; ctx.strokeStyle = '#3b404a'; ctx.stroke(); }
  circle(0, 0, 18, '#1b1e24'); ctx.restore();
  const led = Math.floor(gt * 2) % 2 === 0 || talking; circle(500, 420, 9, led ? '#ff3b30' : '#4a1010'); if (led) glow(500, 420, 60, 'rgba(255,40,40,.35)');
  if (talking) for (let i = 0; i < 3; i++) { const k = ((gt * 1.6 + i / 3) % 1); ctx.save(); ctx.globalAlpha = (1 - k) * .5; ctx.strokeStyle = S.accent; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(360, 560, 180 + k * 160, -.6, .6); ctx.stroke(); ctx.beginPath(); ctx.arc(360, 560, 180 + k * 160, PI - .6, PI + .6); ctx.stroke(); ctx.restore(); }
  fillRR(210, 960, 300, 70, 8, '#1d4e89'); ctx.lineWidth = 3; ctx.strokeStyle = '#e8eef7'; ctx.stroke(); text('ANDÉN 0', 360, 996, { size: 34, fam: 'Oswald', w: 700, ls: 4 });
  particles(40, 8, (x, y, r) => circle((x * W + gt * 8 * r) % W, (y * H - gt * 6 * r + H) % H, 1 + r * 1.8, 'rgba(255,255,255,.12)'));
  vignette(.7);
};
