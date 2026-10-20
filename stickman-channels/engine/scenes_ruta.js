// NO MIRES ATRÁS — "Ruta alternativa". Escenas: aéreo, conductor, GPS, ventanilla, retrovisor, asiento trasero, ambulancia.
const GRANDPA = { acc: ['raincoat', 'flatcap', 'mustache', 'lantern'], coat: '#7a5a3a', nohood: true, body: '#ecebe6', expr: 'happy' };
const gpOver = gt => ({ ra1: .45, ra2: .35, la1: 2.75 + Math.sin(gt * 7) * .28, la2: .35 });
const roadX = y => 360 + 90 * Math.sin(y * .004 + .5);

// ---------- plano aéreo del gancho ----------
SCENES.aerial = (t, p, b, gt) => {
  ctx.fillStyle = '#050b09'; ctx.fillRect(0, 0, W, H);
  // copas de árboles
  for (let i = 0; i < 420; i++) {
    const x = hash(i * 1.7) * (W + 80) - 40, y = hash(i * 3.1) * (H + 80) - 40; if (Math.abs(x - roadX(y)) < 60) continue;
    const r = 18 + hash(i * 5.3) * 26; const g = 18 + hash(i) * 22;
    circle(x, y, r, `rgb(${8 + g * .2},${g},${14 + g * .3})`); circle(x - r * .25, y - r * .25, r * .55, `rgba(120,160,190,${.05 + hash(i * 9) * .06})`);
  }
  // carretera
  ctx.lineCap = 'round'; ctx.beginPath(); for (let y = -40; y <= H + 40; y += 8) { const x = roadX(y); y === -40 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
  ctx.lineWidth = 64; ctx.strokeStyle = '#15171c'; ctx.stroke(); ctx.lineWidth = 56; ctx.strokeStyle = '#1e2127'; ctx.stroke();
  ctx.setLineDash([16, 22]); ctx.lineDashOffset = -gt * 30; ctx.lineWidth = 2.5; ctx.strokeStyle = 'rgba(230,200,120,.45)'; ctx.stroke(); ctx.setLineDash([]);
  // hospital al fondo (presagio)
  fillRR(roadX(40) + 40, 18, 90, 60, 4, '#1c2230'); ctx.fillStyle = 'rgba(255,230,180,.7)'; for (let i = 0; i < 6; i++) ctx.fillRect(roadX(40) + 50 + (i % 3) * 26, 30 + Math.floor(i / 3) * 20, 12, 10);
  const pulse = .6 + .4 * Math.sin(gt * 3); fillRR(roadX(40) + 77, 2, 16, 34, 2, `rgba(255,60,60,${pulse})`); fillRR(roadX(40) + 68, 11, 34, 16, 2, `rgba(255,60,60,${pulse})`); glow(roadX(40) + 85, 19, 70, `rgba(255,60,60,${.3 * pulse})`);
  // coche
  const k = E.out(cl(t / 3.2)); const cy = lerp(900, 742, k), cx = roadX(cy); const ang = Math.atan2(roadX(cy - 5) - roadX(cy + 5), -10);
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(-ang - PI / 2 + PI / 2);
  const dx = roadX(cy - 10) - roadX(cy); ctx.rotate(Math.atan2(dx, 10) * -1 * -1);
  ctx.fillStyle = rad(0, -40, 0, 170, [[0, 'rgba(255,240,200,.45)'], [1, 'rgba(255,240,200,0)']]); ctx.beginPath(); ctx.moveTo(-8, -22); ctx.lineTo(-60, -190); ctx.lineTo(60, -190); ctx.lineTo(8, -22); ctx.fill();
  fillRR(-12, -22, 24, 44, 7, '#2b3446'); fillRR(-9, -12, 18, 14, 3, '#6d86a8'); circle(-8, 21, 2.5, '#ff3b30'); circle(8, 21, 2.5, '#ff3b30'); glow(0, 24, 26, 'rgba(255,40,40,.35)');
  ctx.restore();
  // niebla
  particles(10, 3, (x, y, r) => { ctx.fillStyle = 'rgba(160,180,200,.05)'; ctx.beginPath(); ctx.ellipse((x * W + gt * 12 * (r + .3)) % (W + 300) - 150, y * H, 180, 60, 0, 0, TAU); ctx.fill(); });
  // marcador
  const pa = cl((t - 1.6) / .5); if (pa > 0) { ctx.save(); ctx.globalAlpha = pa; seg([[cx, cy - 34], [cx, cy - 26]], 1.5, S.accent); const lab = 'TÚ · 02:14'; const lw = measure(lab, 9, 'Montserrat', 900, 1.5) + 16; fillRR(cx - lw / 2, cy - 50, lw, 16, 8, 'rgba(0,0,0,.75)'); ctx.lineWidth = 1; ctx.strokeStyle = S.accent; ctx.stroke(); text(lab, cx, cy - 42, { size: 9, w: 900, color: S.accent, ls: 1.5 }); ctx.restore(); }
  vignette(.65, .35);
};

// ---------- vista del conductor ----------
const VX = 360, VY = 430;
function project(xw, z) { return [VX + xw / z * 420, VY + 330 / z]; }
function drawOutside(t, p, gt) {
  const spd = (p.speed ? 1 : .8) * 11; const travel = gt * spd;
  ctx.fillStyle = lin(0, 0, 0, VY + 30, [[0, '#04060c'], [1, '#0e1726']]); ctx.fillRect(0, 0, W, 800);
  glow(560, 170, 160, 'rgba(170,190,230,.10)'); circle(560, 170, 18, 'rgba(220,228,240,.5)');
  // linea de árboles lejana
  ctx.fillStyle = '#060a0c'; ctx.beginPath(); ctx.moveTo(0, VY + 4); for (let x = 0; x <= W; x += 12) ctx.lineTo(x, VY - 20 - hash(Math.floor(x / 12) + 3) * (p.forest ? 120 : 60)); ctx.lineTo(W, VY + 4); ctx.fill();
  // carretera
  ctx.fillStyle = '#121418'; ctx.beginPath(); ctx.moveTo(VX - 6, VY); ctx.lineTo(VX + 6, VY); ctx.lineTo(W + 520, 800); ctx.lineTo(-520, 800); ctx.fill();
  ctx.fillStyle = rad(VX, 820, 20, 520, [[0, 'rgba(255,236,200,.35)'], [1, 'rgba(255,236,200,0)']]); ctx.beginPath(); ctx.moveTo(VX - 6, VY); ctx.lineTo(VX + 6, VY); ctx.lineTo(W + 520, 800); ctx.lineTo(-520, 800); ctx.fill();
  // líneas laterales y discontinua central
  for (const side of [-1, 1]) { const a = project(side * 3.6, 30), c = project(side * 3.6, .8); seg([a, c], 3, 'rgba(230,230,230,.5)'); }
  for (let i = 0; i < 16; i++) { const z0 = ((i * 2.2 - travel) % 35 + 35) % 35 + .7, z1 = z0 + 1.0; const a = project(0, z1), c = project(0, z0); if (c[1] > 800) continue; ctx.lineWidth = Math.max(1, 14 / z0); ctx.strokeStyle = 'rgba(240,210,120,.75)'; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(c[0], c[1]); ctx.stroke(); }
  // árboles cercanos y postes que pasan
  for (let i = 0; i < 26; i++) { const side = i % 2 ? 1 : -1; const z = ((i * 1.9 + hash(i) * 2 - travel * .9) % 46 + 46) % 46 + .6; const off = side * (5.4 + hash(i * 3) * (p.forest ? 2 : 5)); const [x, y] = project(off, z); const s = 1 / z;
    const h = (220 + hash(i * 7) * 160) * s * 2.2, w = (70 + hash(i) * 40) * s * 2.2; ctx.fillStyle = `rgba(${6 + 30 / z},${12 + 40 / z},${14 + 40 / z},1)`; ctx.beginPath(); ctx.moveTo(x - w, y); ctx.lineTo(x, y - h); ctx.lineTo(x + w, y); ctx.fill(); ctx.fillRect(x - w * .08, y - 2, w * .16, 10 * s * 4); }
  for (let i = 0; i < 10; i++) { const side = i % 2 ? 1 : -1; const z = ((i * 4 - travel) % 40 + 40) % 40 + .6; const [x, y] = project(side * 4.4, z); const s = 1 / z; fillRR(x - 3 * s * 6, y - 60 * s * 4, 6 * s * 6, 60 * s * 4, 2, 'rgba(220,220,220,.7)'); circle(x, y - 54 * s * 4, 5 * s * 5, 'rgba(255,140,40,.9)'); }
  // figura en el arcén
  if (p.figure != null) {
    const k = p.figure + t * (p.ghost ? .006 : .045); const z = lerp(30, .9, Math.min(1, k)); if (k < 1.05) { const [x, y] = project(p.figX ?? 5.0, z); const s = 3.2 / z;
      ctx.save(); if (p.ghost) ctx.globalAlpha = .62 + .15 * Math.sin(gt * 2); glow(x, y - 60 * s, 160 * s, 'rgba(255,200,110,.25)');
      if (p.figX === 0) glow(x, y - 60 * s, 260 * s, 'rgba(255,245,220,.25)');
      const ov = p.raise ? { ra1: 2.85, ra2: .2, la1: .15, la2: .2 } : gpOver(gt);
      stick(Object.assign({}, GRANDPA, { x, y, s: Math.min(s, 6), pose: 'stand', t: gt, face: -1, expr: p.figX < 3 ? 'neutral' : 'happy', over: ov })); ctx.restore(); } }
  if (p.km) { const z = lerp(16, .7, cl(t / 2.4)); const [x, y] = project(4.6, z); const s = 3 / z; if (z > .75) { seg([[x, y], [x, y - 70 * s]], Math.max(2, 4 * s), '#9aa0a8'); fillRR(x - 34 * s, y - 104 * s, 68 * s, 40 * s, 4 * s, '#0b7a46'); ctx.lineWidth = Math.max(1, 1.5 * s); ctx.strokeStyle = '#fff'; rr(x - 32 * s, y - 102 * s, 64 * s, 36 * s, 3 * s); ctx.stroke(); text('KM ' + p.km, x, y - 84 * s, { size: Math.max(6, 16 * s), fam: 'Oswald', w: 700, color: '#fff' }); } }
  // niebla en el horizonte
  ctx.fillStyle = lin(0, VY - 60, 0, VY + 80, [[0, 'rgba(120,140,160,0)'], [.5, `rgba(120,140,160,${p.forest ? .22 : .12})`], [1, 'rgba(120,140,160,0)']]); ctx.fillRect(0, VY - 60, W, 140);
}
function rainGlass(gt, x0, y0, w, h, wiper = true) {
  const ph = (gt - 1.2) % 2.6; const wipeA = wiper && ph > 0 && ph < .5 ? ph / .5 : -1;
  for (let i = 0; i < 90; i++) { const x = x0 + hash(i * 2.3) * w, y = y0 + hash(i * 4.1) * h; const born = hash(i * 7.7) * 2.6; const age = ((ph - born) % 2.6 + 2.6) % 2.6; const a = cl(age / .4) * .55;
    const r = 1.5 + hash(i) * 3; ctx.fillStyle = `rgba(200,220,255,${a * .5})`; ctx.beginPath(); ctx.ellipse(x, y + age * 4, r * .8, r, 0, 0, TAU); ctx.fill(); circle(x - r * .3, y + age * 4 - r * .3, r * .35, `rgba(255,255,255,${a})`); }
  if (wipeA >= 0) { const ang = lerp(-1.2, .9, Math.sin(wipeA * PI) ); ctx.save(); ctx.translate(x0 + 120, y0 + h + 20); ctx.rotate(ang); seg([[0, 0], [0, -h * 1.05]], 8, '#050506'); seg([[0, -60], [0, -h * 1.05]], 4, '#1a1a1e'); ctx.restore(); }
}
function dashboard(t, p, gt) {
  // pilares y techo
  ctx.fillStyle = '#07080b'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(120, 0); ctx.lineTo(0, 600); ctx.fill(); ctx.beginPath(); ctx.moveTo(W, 0); ctx.lineTo(W - 120, 0); ctx.lineTo(W, 600); ctx.fill();
  ctx.fillRect(0, 0, W, 34);
  // retrovisor
  seg([[360, 30], [360, 60]], 10, '#0b0c10'); fillRR(250, 54, 220, 74, 18, '#0b0c10'); fillRR(258, 61, 204, 60, 13, '#141824'); ctx.save(); rr(258, 61, 204, 60, 13); ctx.clip(); ctx.fillStyle = 'rgba(255,60,40,.12)'; ctx.fillRect(258, 90, 204, 31); ctx.restore();
  // salpicadero
  ctx.fillStyle = lin(0, 740, 0, H, [[0, '#1a1b22'], [1, '#08090c']]); ctx.beginPath(); ctx.moveTo(-20, 800); ctx.quadraticCurveTo(360, 700, W + 20, 790); ctx.lineTo(W + 20, H); ctx.lineTo(-20, H); ctx.fill();
  ctx.strokeStyle = 'rgba(255,190,110,.18)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-20, 800); ctx.quadraticCurveTo(360, 700, W + 20, 790); ctx.stroke();
  fillRR(130, 820, 240, 210, 40, '#0b0c10');
  for (const vx2 of [420, 470]) fillRR(vx2, 1010, 36, 16, 6, '#0d0e12');
  // velocímetro
  const v = p.speed ? lerp(78, 86, E.inout(cl(t / 4))) : 80 + Math.sin(gt) * 1.5;
  ctx.save(); ctx.translate(250, 930); circle(0, 0, 104, '#06070a'); ctx.strokeStyle = 'rgba(255,190,90,.25)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, 96, PI * .75, PI * 2.25); ctx.stroke();
  for (let i = 0; i <= 20; i++) { const a = PI * .75 + i / 20 * PI * 1.5; seg([[Math.cos(a) * 84, Math.sin(a) * 84], [Math.cos(a) * (i % 2 ? 92 : 96), Math.sin(a) * (i % 2 ? 92 : 96)]], i % 2 ? 2 : 3, i >= 8 && i <= 9 ? '#ff5a3c' : 'rgba(255,200,120,.8)'); if (i % 4 === 0) text(String(i * 10), Math.cos(a) * 66, Math.sin(a) * 66, { size: 13, w: 700, color: 'rgba(255,210,140,.75)' }); }
  const na = PI * .75 + v / 200 * PI * 1.5; ctx.shadowColor = '#ff5a3c'; ctx.shadowBlur = 10; seg([[0, 0], [Math.cos(na) * 88, Math.sin(na) * 88]], 4, '#ff5a3c'); ctx.shadowBlur = 0; circle(0, 0, 8, '#222');
  text(String(Math.round(v)), 0, 46, { size: 30, fam: 'Oswald', w: 700, color: '#ffd9a0' }); text('km/h', 0, 72, { size: 12, w: 700, color: 'rgba(255,210,140,.6)' });
  ctx.restore(); glow(250, 930, 160, 'rgba(255,170,80,.08)');
  // móvil en el soporte con GPS
  ctx.save(); ctx.translate(560, 880); ctx.rotate(.06); fillRR(-82, -150, 164, 290, 22, '#08090b'); ctx.save(); rr(-74, -142, 148, 274, 16); ctx.clip(); ctx.translate(-74, -142); ctx.scale(148 / 600, 274 / 1060); gpsScreen(t, p, gt, true); ctx.restore(); ctx.restore();
  glow(560, 880, 200, 'rgba(80,150,255,.12)');
  // volante y manos
  const tense = p.grip ? Math.sin(gt * 30) * 1.2 : 0; const steer = Math.sin(gt * .5) * .04;
  ctx.save(); ctx.translate(300, 1260); ctx.rotate(steer);
  ctx.lineWidth = 46; ctx.strokeStyle = '#050507'; ctx.beginPath(); ctx.arc(0, 0, 250, PI * 1.02, PI * 1.98); ctx.stroke();
  ctx.lineWidth = 34; ctx.strokeStyle = '#1b1c22'; ctx.beginPath(); ctx.arc(0, 0, 250, PI * 1.02, PI * 1.98); ctx.stroke();
  ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(255,190,110,.35)'; ctx.beginPath(); ctx.arc(0, 0, 262, PI * 1.25, PI * 1.75); ctx.stroke();
  fillRR(-70, -150, 140, 120, 30, '#121318'); circle(0, -92, 18, '#26272e');
  for (const sd of [-1, 1]) { const a = PI * 1.5 + sd * .7; const hx = Math.cos(a) * 250, hy = Math.sin(a) * 250 + tense;
    seg([[sd * 250, 200], [hx + sd * 10, hy + 30]], 44, '#15151b'); seg([[sd * 250, 200], [hx + sd * 10, hy + 30]], 32, '#d9d9e0'); circle(hx, hy, 30, '#15151b'); circle(hx, hy, 23, '#e6e6ec'); seg([[hx - sd * 12, hy - 14], [hx - sd * 12, hy + 14]], 3, 'rgba(0,0,0,.35)'); }
  ctx.restore();
}
SCENES.car_pov = (t, p, b, gt) => {
  ctx.save(); ctx.translate(0, Math.sin(gt * 13) * .8 + (noise1(gt * 3) - .5) * 2);
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 800); ctx.clip(); drawOutside(t, p, gt); rainGlass(gt, 0, 34, W, 720); ctx.restore();
  dashboard(t, p, gt);
  ctx.restore();
  if (p.ghost) { ctx.fillStyle = 'rgba(20,40,70,.25)'; ctx.fillRect(0, 0, W, H); }
  vignette(.55, .4);
};

// ---------- GPS ----------
const routeA = k => [[300, 1060], [300, 860], [310, 740], [360, 640], [320, 520], [250, 420], [260, 300], [360, 180], [380, 60]];
const routeB = k => [[300, 1060], [300, 860], [310, 740], [200, 650], [150, 520], [210, 400], [420, 330], [520, 200], [540, 60]];
function gpsScreen(t, p, gt, mini) {
  ctx.fillStyle = '#0d1620'; ctx.fillRect(0, 0, 600, 1060);
  // mapa
  ctx.save(); ctx.translate(0, (gt * 14) % 120);
  for (let i = 0; i < 18; i++) { ctx.fillStyle = 'rgba(40,90,60,.35)'; ctx.beginPath(); ctx.ellipse(hash(i) * 600, hash(i + 5) * 1200 - 120, 60 + hash(i * 3) * 90, 40 + hash(i * 4) * 70, hash(i) * 3, 0, TAU); ctx.fill(); }
  ctx.strokeStyle = 'rgba(160,180,200,.18)'; ctx.lineWidth = 6; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(-20, i * 140 - 120); ctx.bezierCurveTo(200, i * 140 - 60, 400, i * 140 - 180, 620, i * 140 - 100); ctx.stroke(); }
  ctx.restore();
  const changed = p.recalc != null && (p.recalc < 0 || t > p.recalc + 1.0); const mk = p.recalc > 0 ? E.inout(cl((t - p.recalc - 1.0) / .8)) : (changed ? 1 : 0);
  const ecg = p.ecg ? E.inout(cl((t - .2) / 1.4)) : 0;
  const A0 = routeA(), B0 = routeB(); let pts = A0.map((q, i) => [lerp(q[0], B0[i][0], p.dest ? 1 : mk), lerp(q[1], B0[i][1], p.dest ? 1 : mk)]);
  if (ecg > 0) pts = pts.map((q, i) => [lerp(q[0], 20 + i * 70, ecg), lerp(q[1], 560, ecg)]);
  if (ecg > 0) { ctx.fillStyle = `rgba(0,0,0,${ecg * .92})`; ctx.fillRect(0, 0, 600, 1060); }
  // ruta
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const col = ecg > .6 ? '#3dff8a' : '#3d8bff';
  ctx.shadowColor = col; ctx.shadowBlur = 24; ctx.strokeStyle = col; ctx.lineWidth = 22 - ecg * 14; ctx.beginPath();
  if (ecg >= 1) { const sp = (t - 1.6) * 260; for (let x = 0; x <= 600; x += 3) { const ph = ((x - sp) % 220 + 220) % 220; let y = 560; if (ph > 90 && ph < 100) y -= (ph - 90) * 8; else if (ph >= 100 && ph < 112) y = 480 + (ph - 100) * 22; else if (ph >= 112 && ph < 120) y = 744 - (ph - 112) * 23; x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } }
  else { pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); }
  ctx.stroke(); ctx.shadowBlur = 0;
  if (ecg >= 1) { text('♥ 80', 470, 380, { size: 64, fam: 'Oswald', w: 700, color: '#3dff8a', shadow: '#3dff8a', blur: 20 }); return; }
  if (p.voicenote != null && (p.voicenote < 0 || t > p.voicenote)) {
    const a = p.voicenote < 0 ? 1 : E.back(cl((t - p.voicenote) / .35)); ctx.save(); ctx.translate(300, 560); ctx.scale(a, a);
    ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; fillRR(-270, -170, 540, 340, 36, 'rgba(28,32,44,.97)'); ctx.shadowBlur = 0;
    circle(-196, -96, 44, '#6b5a44'); text('A', -196, -94, { size: 40, w: 900 });
    text('Abuelo', -130, -116, { size: 40, w: 900, align: 'left' }); text('Nota de voz · 0:14', -130, -72, { size: 26, w: 600, align: 'left', color: 'rgba(255,255,255,.7)' });
    circle(-200, 40, 40, '#3d8bff'); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(-212, 18); ctx.lineTo(-212, 62); ctx.lineTo(-178, 40); ctx.fill();
    for (let i = 0; i < 26; i++) { const h = 10 + Math.abs(Math.sin(i * 1.7)) * 46 * hash(i + 2); fillRR(-140 + i * 15, 40 - h / 2, 8, h, 4, 'rgba(255,255,255,.75)'); }
    circle(-236, 128, 7, '#ff3b30'); text('Enviada hace 6 años · No escuchada', -220, 129, { size: 24, w: 700, align: 'left', color: '#ff8a80' });
    ctx.restore();
  }
  // flecha de posición
  ctx.save(); ctx.translate(300, 900); circle(0, 0, 46, 'rgba(61,139,255,.25)'); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(22, 22); ctx.lineTo(0, 10); ctx.lineTo(-22, 22); ctx.closePath(); ctx.fill(); ctx.restore();
  // barra superior
  const recalcing = p.recalc > 0 && t > p.recalc && t < p.recalc + 1.0;
  fillRR(24, 24, 552, 170, 26, recalcing ? '#3a3f4a' : '#0b8a52');
  if (recalcing) { ctx.save(); ctx.translate(90, 109); ctx.rotate(gt * 8); ctx.lineWidth = 8; ctx.strokeStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, 26, 0, PI * 1.4); ctx.stroke(); ctx.restore(); text('Recalculando…', 150, 110, { size: 44, w: 800, align: 'left' }); }
  else { navIcon(92, 109, 40, 'turn'); text(changed || p.dest ? '1,2 km' : '300 m', 160, 80, { size: 60, w: 900, align: 'left' }); text(changed || p.dest ? 'Camino forestal' : 'Gire a la izquierda', 162, 148, { size: 30, w: 600, align: 'left', color: 'rgba(255,255,255,.9)' }); }
  // tarjeta inferior
  fillRR(24, 860, 552, 176, 26, 'rgba(14,18,26,.94)');
  const eta = p.eta ? '2 min' : (changed || p.dest ? '14 min' : '18 min');
  text(eta, 54, 920, { size: 62, w: 900, align: 'left', color: p.eta ? '#ff5a3c' : '#3ddc84' });
  text(changed || p.dest ? '02:28 · 9,4 km' : '02:32 · 15 km', 56, 976, { size: 24, w: 600, align: 'left', color: 'rgba(255,255,255,.6)' });
  if (changed || p.dest) { fillRR(330, 896, 40, 40, 8, '#ff3b30'); fillRR(345, 902, 10, 28, 2, '#fff'); fillRR(336, 911, 28, 10, 2, '#fff'); text('Hospital', 384, 906, { size: 26, w: 800, align: 'left' }); text('San Rafael', 384, 938, { size: 26, w: 800, align: 'left' }); if (p.dest && !mini) { ctx.save(); ctx.globalAlpha = .4 + .4 * Math.sin(gt * 5); ctx.lineWidth = 4; ctx.strokeStyle = '#ff3b30'; rr(316, 884, 248, 70, 14); ctx.stroke(); ctx.restore(); } }
  else { text('Casa', 384, 922, { size: 30, w: 800, align: 'left' }); }
}
SCENES.gps = (t, p, b, gt) => {
  ctx.fillStyle = '#05060a'; ctx.fillRect(0, 0, W, H); glow(360, 640, 640, 'rgba(70,130,255,.16)');
  ctx.save(); ctx.translate(360, 640); ctx.rotate(.02 + Math.sin(gt * .7) * .005);
  fillRR(-322, -560, 644, 1120, 70, '#0a0a0c'); ctx.lineWidth = 3; ctx.strokeStyle = '#2a2b31'; ctx.stroke();
  ctx.save(); rr(-300, -530, 600, 1060, 52); ctx.clip(); ctx.translate(-300, -530); gpsScreen(t, p, gt, false);
  if (p.glitch) { const f = Math.floor(gt * 14); for (let i = 0; i < 7; i++) { const y = hash(i + f) * 1060; ctx.fillStyle = i % 2 ? 'rgba(255,0,70,.18)' : 'rgba(0,220,255,.16)'; ctx.fillRect((hash(i * 3 + f) - .5) * 80, y, 600, 6 + hash(i * 5 + f) * 26); } }
  ctx.restore(); fillRR(-70, -548, 140, 30, 15, '#000');
  ctx.restore();
  // soporte del coche
  fillRR(250, 1170, 220, 110, 20, '#0d0e12');
  vignette(.55, .4);
};

// ---------- ventanilla: el abuelo ----------
SCENES.window = (t, p, b, gt) => {
  ctx.fillStyle = '#07080b'; ctx.fillRect(0, 0, W, H);
  const x0 = 40, y0 = 330, w = 640, h = 560;
  ctx.save(); ctx.beginPath(); ctx.moveTo(x0 + 80, y0); ctx.lineTo(x0 + w, y0); ctx.lineTo(x0 + w, y0 + h); ctx.lineTo(x0, y0 + h); ctx.lineTo(x0, y0 + 140); ctx.closePath(); ctx.clip();
  ctx.fillStyle = lin(0, y0, 0, y0 + h, [[0, '#0a1220'], [1, '#141c26']]); ctx.fillRect(x0, y0, w, h);
  // árboles en barrido
  for (let i = 0; i < 14; i++) { const x = ((hash(i) * 1400 - gt * (p.hold ? 260 : 900)) % 1400 + 1400) % 1400 - 300; ctx.fillStyle = 'rgba(8,14,16,.9)'; ctx.fillRect(x, y0, 40 + hash(i * 3) * 50, h); }
  // suelo iluminado
  ctx.fillStyle = 'rgba(255,220,170,.10)'; ctx.fillRect(x0, y0 + h - 140, w, 140);
  const k = p.hold ? .5 + t * .02 : E.inout(cl(t / 2.2)) * .55; const gx = lerp(x0 + w + 120, x0 + w * .45, k / .55);
  glow(gx, y0 + 330, 300, 'rgba(255,200,110,.32)');
  stick(Object.assign({}, GRANDPA, { x: gx, y: y0 + h + 210, s: 4.1, pose: 'stand', t: gt, face: -1, expr: 'happy', over: gpOver(gt * (p.hold ? .5 : 1)) }));
  // estelas de velocidad
  ctx.save(); ctx.globalAlpha = p.hold ? .15 : .35; for (let i = 0; i < 20; i++) { ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(((hash(i * 5) * 900 - gt * 1600) % 900 + 900) % 900 - 100, y0 + hash(i) * h, 120, 2); } ctx.restore();
  rainGlass(gt * .6, x0, y0, w, h, false);
  ctx.fillStyle = 'rgba(255,255,255,.04)'; ctx.beginPath(); ctx.moveTo(x0 + 200, y0); ctx.lineTo(x0 + 360, y0); ctx.lineTo(x0 + 120, y0 + h); ctx.lineTo(x0 - 40, y0 + h); ctx.fill();
  ctx.restore();
  // marco de la puerta
  ctx.lineWidth = 26; ctx.strokeStyle = '#111217'; ctx.beginPath(); ctx.moveTo(x0 + 80, y0); ctx.lineTo(x0 + w, y0); ctx.lineTo(x0 + w, y0 + h); ctx.lineTo(x0, y0 + h); ctx.lineTo(x0, y0 + 140); ctx.closePath(); ctx.stroke();
  ctx.fillStyle = '#0c0d11'; ctx.fillRect(0, y0 + h + 13, W, H);
  vignette(.6, .35);
};

// ---------- retrovisor ----------
SCENES.mirror = (t, p, b, gt) => {
  ctx.fillStyle = lin(0, 0, 0, H, [[0, '#06080d'], [1, '#0c1018']]); ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.beginPath(); ctx.rect(0, 700, W, 600); ctx.clip(); drawOutside(t, { speed: 1, forest: 1 }, gt); ctx.restore();
  ctx.fillStyle = 'rgba(6,8,13,.55)'; ctx.fillRect(0, 700, W, 600);
  const tilt = p.look ? E.out(cl(t / .25)) * .09 : 0;
  ctx.save(); ctx.translate(360, 560); ctx.rotate(tilt);
  seg([[0, -560], [0, -150]], 22, '#0b0c10');
  fillRR(-320, -150, 640, 300, 60, '#0b0c10'); ctx.save(); rr(-300, -132, 600, 264, 46); ctx.clip();
  // reflejo: luna trasera
  ctx.fillStyle = '#0a0e17'; ctx.fillRect(-300, -132, 600, 264);
  fillRR(-250, -110, 500, 140, 30, '#101a2a'); ctx.save(); rr(-250, -110, 500, 140, 30); ctx.clip();
  ctx.fillStyle = 'rgba(255,40,30,.12)'; ctx.fillRect(-250, -20, 500, 50);
  for (let i = 0; i < 8; i++) { const x = ((hash(i) * 600 + gt * 120) % 600) - 300; ctx.fillStyle = 'rgba(6,10,12,.9)'; ctx.beginPath(); ctx.moveTo(x - 30, 30); ctx.lineTo(x, -80 - hash(i) * 40); ctx.lineTo(x + 30, 30); ctx.fill(); }
  if (p.grandpa) { const s = lerp(1.6, .5, E.out(cl(t / 5))); const gx = lerp(60, 20, cl(t / 5)); glow(gx, 20, 60 * s, 'rgba(255,200,110,.4)'); stick(Object.assign({}, GRANDPA, { x: gx, y: 28, s, pose: 'stand', t: gt, face: -1, over: gpOver(gt) })); }
  ctx.restore();
  // asientos traseros
  fillRR(-290, 20, 270, 140, 30, '#191c25'); fillRR(20, 20, 270, 140, 30, '#191c25');
  if (p.breath && !p.look) { const br = Math.max(0, Math.sin(gt * TAU / 2.1)) * 6; ctx.fillStyle = '#2a2f3d'; ctx.beginPath(); ctx.ellipse(-60, 92 - br, 210, 46 + br, 0, PI, TAU); ctx.fill(); ctx.fillRect(-270, 90, 420, 50); }
  if (p.look) { you({ x: 120, y: 110, s: .95, pose: 'lie', t: gt, rot: -PI / 2, expr: 'closed', acc: ['bandage'], body: '#c9d3e6' }); }
  // tus ojos
  if (p.eyes || p.look) { ctx.save(); ctx.beginPath(); ctx.rect(-300, -132, 600, 92); ctx.clip(); circle(-120, 40, 150, '#e9e9ee'); const sc = p.look ? 1.5 : 1; const lx = Math.sin(gt * 1.3) * 8;
    for (const ex of [-175, -75]) { ctx.beginPath(); ctx.ellipse(ex, -70, 22 * sc, 15 * sc, 0, 0, TAU); ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = '#15151b'; ctx.stroke(); circle(ex + lx, -68, 8, '#15151b'); }
    seg([[-200, -98], [-150, -104]], 5, '#15151b'); seg([[-100, -104], [-50, -98]], 5, '#15151b'); ctx.restore(); }
  ctx.restore(); ctx.restore();
  if (p.look) { const f = 1 - cl(t / .3); ctx.fillStyle = `rgba(255,255,255,${f * .35})`; ctx.fillRect(0, 0, W, H); }
  vignette(.6, .3);
};

// ---------- asiento trasero: la revelación ----------
SCENES.backseat = (t, p, b, gt) => {
  ctx.fillStyle = lin(0, 0, 0, H, [[0, '#0a0e18'], [1, '#05070c']]); ctx.fillRect(0, 0, W, H);
  fillRR(60, 260, 600, 300, 60, '#121a2a'); ctx.save(); rr(60, 260, 600, 300, 60); ctx.clip(); ctx.fillStyle = 'rgba(255,40,30,.1)'; ctx.fillRect(60, 420, 600, 140); ctx.restore();
  const sweep = ((gt * .45) % 1); ctx.save(); ctx.globalAlpha = .35 * Math.sin(sweep * PI); ctx.fillStyle = 'rgba(255,230,190,.4)'; ctx.beginPath(); ctx.moveTo(lerp(-300, 900, sweep), 260); ctx.lineTo(lerp(-200, 1000, sweep), 260); ctx.lineTo(lerp(-500, 700, sweep), H); ctx.lineTo(lerp(-650, 550, sweep), H); ctx.fill(); ctx.restore();
  fillRR(30, 560, 660, 300, 50, '#1c2232'); fillRR(30, 800, 660, 160, 40, '#161b28');
  you({ x: 560, y: 760, s: 2.6, pose: 'lie', t: gt * .2, rot: -PI / 2, expr: 'closed', acc: ['bandage'], body: '#c4cfe4' });
  seg([[120, 580], [600, 860]], 14, '#0c0e14'); seg([[120, 580], [600, 860]], 8, '#2b3142');
  ctx.save(); ctx.globalAlpha = .45; ctx.fillStyle = '#2a2f3d'; ctx.beginPath(); ctx.moveTo(420, 640); ctx.quadraticCurveTo(640, 600, 690, 900); ctx.lineTo(430, 900); ctx.fill(); ctx.restore();
  ctx.fillStyle = 'rgba(40,80,160,.12)'; ctx.fillRect(0, 0, W, H);
  vignette(.7, .3);
};

// ---------- ambulancia ----------
SCENES.ambulance = (t, p, b, gt) => {
  const fl = Math.floor(gt * 3) % 2; ctx.fillStyle = lin(0, 0, 0, H, [[0, '#c9d3d8'], [1, '#8e9aa2']]); ctx.fillRect(0, 0, W, H);
  // armarios y ventana trasera con destellos
  for (let i = 0; i < 4; i++) fillRR(30 + i * 170, 120, 150, 120, 8, '#e4eaed');
  fillRR(40, 300, 200, 200, 16, '#16202c'); ctx.save(); rr(40, 300, 200, 200, 16); ctx.clip(); ctx.fillStyle = fl ? 'rgba(60,120,255,.8)' : 'rgba(255,50,50,.6)'; ctx.fillRect(40, 300, 200, 200); ctx.restore();
  // monitor
  const hr = p.hr ? Math.round(lerp(52, 81, E.inout(cl(t / 3)))) : 47 + Math.round(Math.sin(gt) * 2);
  fillRR(430, 380, 260, 220, 14, '#1b1f24'); fillRR(444, 394, 232, 192, 8, '#020604');
  ctx.save(); rr(444, 394, 232, 192, 8); ctx.clip(); ctx.strokeStyle = '#3dff8a'; ctx.lineWidth = 3; ctx.beginPath(); const sp = gt * 140; for (let x = 0; x <= 232; x += 2) { const ph = ((x + sp) % 90 + 90) % 90; let y = 470; if (ph > 40 && ph < 44) y -= 40; else if (ph >= 44 && ph < 48) y += 22; x === 0 ? ctx.moveTo(444 + x, y) : ctx.lineTo(444 + x, y); } ctx.stroke(); ctx.restore();
  const low = hr < 80; text('FC', 460, 540, { size: 18, w: 900, color: '#3dff8a', align: 'left' }); text(String(hr), 500, 545, { size: 44, fam: 'Oswald', w: 700, color: low ? (fl ? '#ff3b30' : '#ff8a80') : '#3dff8a', align: 'left' });
  if (p.hr) text('> 80', 600, 545, { size: 22, w: 900, color: '#ffc24d', align: 'left' });
  if (p.timer) { fillRR(444, 610, 232, 60, 10, '#020604'); text('SIN RESPUESTA  14:00', 560, 641, { size: 18, w: 900, color: '#ff5a3c', ls: 1 }); }
  const push = Math.max(0, Math.sin(gt * TAU * 1.8)) * 6;
  stick({ x: 140, y: 1010 + push * .5, s: 2.4, pose: 'stand', t: gt, face: 1, acc: ['raincoat', 'bun'], coat: '#2f6b4f', nohood: true, body: '#f1ece6', hair: '#3b2416', expr: 'worried', over: { tor: .42 + push * .006, la1: .95, la2: .25, ra1: 1.05, ra2: .2, head: .25 } });
  // camilla y tú
  fillRR(60, 820, 520, 40, 12, '#e9eef0'); seg([[100, 860], [100, 1000]], 10, '#9aa4ab'); seg([[540, 860], [540, 1000]], 10, '#9aa4ab');
  you({ x: 520, y: 822, s: 2.3, pose: 'lie', t: gt * .2, rot: -PI / 2, expr: 'closed', acc: ['mask', 'bandage'] });
  // baño de luz de emergencia
  ctx.fillStyle = fl ? 'rgba(60,120,255,.14)' : 'rgba(255,50,50,.10)'; ctx.fillRect(0, 0, W, H);
  vignette(.5, .4);
};

// ---------- pedal ----------
SCENES.pedal = (t, p, b, gt) => {
  ctx.fillStyle = lin(0, 0, 0, H, [[0, '#0d0e12'], [1, '#050507']]); ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(255,170,80,.08)'; ctx.fillRect(0, 0, W, 220);
  fillRR(40, 980, 640, 260, 30, '#101116'); for (let i = 0; i < 9; i++) seg([[80 + i * 70, 1000], [60 + i * 72, 1220]], 3, 'rgba(255,255,255,.03)');
  const k = E.inout(cl((t - .3) / 1.6)); const vib = Math.sin(gt * 40) * 1.2;
  // freno
  ctx.save(); ctx.translate(250, 760); fillRR(-60, 0, 120, 90, 14, '#1d1e24'); seg([[0, 0], [0, -260]], 14, '#16171c'); ctx.restore();
  // acelerador que se hunde
  ctx.save(); ctx.translate(470, 700); ctx.rotate(k * .35); seg([[0, -300], [0, 0]], 12, '#16171c'); fillRR(-46, 0, 92, 220, 16, '#24262d'); for (let i = 0; i < 6; i++) seg([[-30, 30 + i * 32], [30, 30 + i * 32]], 4, '#15161a'); ctx.restore();
  // pierna y zapatilla
  const fx = 470 + k * 60, fy = 820 + k * 70 + vib;
  seg([[260, -40], [380, 420], [fx - 10, fy - 40]], 64, '#15151b'); seg([[260, -40], [380, 420], [fx - 10, fy - 40]], 50, '#2e3a55');
  ctx.save(); ctx.translate(fx, fy); ctx.rotate(.95 + k * .3); fillRR(-60, -36, 190, 80, 36, '#e8e8ee'); fillRR(-60, 22, 190, 22, 11, '#b9bcc7'); ctx.lineWidth = 5; ctx.strokeStyle = '#15151b'; rr(-60, -36, 190, 80, 36); ctx.stroke(); ctx.restore();
  // líneas de tensión
  ctx.save(); ctx.globalAlpha = k * .6; for (let i = 0; i < 4; i++) seg([[600 + i * 14, 640 + i * 40], [650 + i * 14, 610 + i * 40]], 4, '#ffc24d'); ctx.restore();
  glow(470, 760, 260, 'rgba(255,170,80,.10)');
  vignette(.65, .3);
};
// ---------- el abuelo en mitad de la carretera, hablando ----------
SCENES.grandpa_close = (t, p, b, gt) => {
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.clip(); drawOutside(t, { speed: .3, forest: 1 }, gt); ctx.restore();
  ctx.fillStyle = lin(0, 600, 0, H, [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,.6)']]); ctx.fillRect(0, 600, W, H);
  glow(360, 620, 520, 'rgba(255,245,220,.28)');
  const talking = b.words.some(w => gt >= w.s - .02 && gt <= w.e + .02); const mouth = talking ? .5 + .5 * Math.abs(Math.sin(gt * 19)) : 0;
  stick(Object.assign({}, GRANDPA, { x: 360, y: 1270, s: 5.4, pose: 'stand', t: gt, face: -1, expr: 'worried', mouth, over: { ra1: 2.35, ra2: .3, la1: .5, la2: 1.2, head: .05 } }));
  particles(50, 6, (x, y, r) => circle((x * W + gt * 20 * r) % W, (y * H + gt * 60 * (r + .3)) % H, 1 + r * 2, 'rgba(220,230,255,.35)'));
  rainGlass(gt, 0, 0, W, H, true);
  vignette(.6, .35);
};
// ---------- elección en pantalla partida ----------
SCENES.split = (t, p, b, gt) => {
  const side = p.side; const la = side === 'b' ? .35 : 1, ra = side === 'a' ? .35 : 1;
  // izquierda: el abuelo (cálido)
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 360, H); ctx.clip(); ctx.translate(-180, 0);
  drawOutside(t, { speed: .2, forest: 1 }, gt); glow(360, 700, 420, 'rgba(255,190,100,.35)');
  stick(Object.assign({}, GRANDPA, { x: 360, y: 1080, s: 3.6, pose: 'stand', t: gt, face: -1, expr: 'happy', over: { ra1: 2.85, ra2: .2, la1: .2, la2: .2 } }));
  ctx.restore(); ctx.fillStyle = `rgba(0,0,0,${1 - la})`; ctx.fillRect(0, 0, 360, H);
  // derecha: la ambulancia (fría)
  ctx.save(); ctx.beginPath(); ctx.rect(360, 0, 360, H); ctx.clip(); ctx.translate(60, 0);
  SCENES.ambulance(t, { hr: 0 }, b, gt); ctx.restore(); ctx.fillStyle = `rgba(0,0,0,${1 - ra})`; ctx.fillRect(360, 0, 360, H);
  ctx.fillStyle = 'rgba(40,90,160,.18)'; ctx.fillRect(360, 0, 360, H);
  seg([[360, 0], [360, H]], 4, 'rgba(255,255,255,.7)'); glow(360, 640, 200, 'rgba(255,255,255,.12)');
  const pill = (txt, x, c, a) => { ctx.save(); ctx.globalAlpha = a; const w = measure(txt, 26, 'Anton', 400, 2) + 40; fillRR(x - w / 2, 300, w, 50, 25, c); text(txt, x, 326, { size: 26, fam: 'Anton', w: 400, ls: 2 }); ctx.restore(); };
  if (!b.ov) { pill('FRENAR', 180, '#c97a1e', la); pill('SEGUIR', 540, '#1f7a52', ra); }
  vignette(.5, .4);
};
