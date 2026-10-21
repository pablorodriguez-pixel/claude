// «Sticky man» · Qué hacer si… — episodios sueltos, de día y con colores vivos
const sticky = o => stick(Object.assign({ acc: ['cap', 'scarf'], body: '#ffffff' }, o));
function sky(top = '#7fc8ff', bot = '#d8f0ff') { ctx.fillStyle = lin(0, 0, 0, H, [[0, top], [1, bot]]); ctx.fillRect(-60, -60, W + 120, H + 120); }
function stamp(kind, label, t) {
  const a = E.back(cl((t - .15) / .3)); if (a <= 0) return;
  const ok = kind === 'ok', col = ok ? '#22c55e' : '#ff3b5c';
  ctx.save(); ctx.translate(W / 2, 330); ctx.rotate(ok ? -.06 : .08); ctx.scale(a * (1.6 - .6 * a), a * (1.6 - .6 * a));
  ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 24; circle(-210, 0, 62, col); ctx.shadowBlur = 0;
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath();
  if (ok) { ctx.moveTo(-238, 2); ctx.lineTo(-218, 24); ctx.lineTo(-180, -22); } else { ctx.moveTo(-232, -22); ctx.lineTo(-188, 22); ctx.moveTo(-188, -22); ctx.lineTo(-232, 22); } ctx.stroke();
  let fz = 52; while (measure(label, fz, 'Anton', 400, 1) > 380) fz -= 2;
  fillRR(-140, -48, Math.max(330, measure(label, fz, 'Anton', 400, 1) + 50), 96, 22, '#111'); text(label, -115, 2, { size: fz, fam: 'Anton', w: 400, align: 'left', color: ok ? '#7ef0a8' : '#ff8fa3', ls: 1 });
  ctx.restore();
}
// coche rojo de lado, morro a la derecha
function carSide(x, y, s, rot, inner) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot || 0); ctx.scale(s, s); ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-150, 0); ctx.lineTo(-150, -50); ctx.lineTo(-110, -60); ctx.lineTo(-70, -110); ctx.lineTo(60, -110); ctx.lineTo(110, -62); ctx.lineTo(150, -55); ctx.lineTo(155, 0); ctx.closePath();
  ctx.fillStyle = '#e5383b'; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = '#111'; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-60, -66); ctx.lineTo(-36, -100); ctx.lineTo(0, -100); ctx.lineTo(0, -66); ctx.closePath(); ctx.fillStyle = '#bfe6ff'; ctx.fill(); ctx.lineWidth = 5; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(10, -66); ctx.lineTo(10, -100); ctx.lineTo(54, -100); ctx.lineTo(90, -66); ctx.closePath(); ctx.fillStyle = '#bfe6ff'; ctx.fill(); ctx.stroke();
  if (inner) inner();
  for (const wx of [-95, 95]) { circle(wx, 0, 32, '#111'); circle(wx, 0, 15, '#9aa3ad'); }
  ctx.restore();
}

// ---------- el coche cae del puente ----------
SCENES.bridge = (t, p, b, gt) => {
  sky(); circle(590, 180, 60, '#fff2a8'); glow(590, 180, 200, 'rgba(255,240,160,.5)');
  ctx.fillStyle = '#7cc46a'; ctx.beginPath(); ctx.moveTo(-60, 760); ctx.quadraticCurveTo(200, 640, 420, 740); ctx.quadraticCurveTo(600, 690, W + 60, 760); ctx.lineTo(W + 60, 820); ctx.lineTo(-60, 820); ctx.fill();
  // río
  ctx.fillStyle = lin(0, 800, 0, H, [[0, '#3aa0e6'], [1, '#1d5fa8']]); ctx.fillRect(-60, 800, W + 120, H);
  for (let i = 0; i < 9; i++) seg([[((i * 130 + gt * 40) % (W + 200)) - 100, 860 + i * 45], [((i * 130 + gt * 40) % (W + 200)) - 30, 860 + i * 45]], 5, 'rgba(255,255,255,.35)');
  // puente
  fillRR(-60, 500, 470, 40, 0, '#8a8f99'); ctx.lineWidth = 6; ctx.strokeStyle = '#111'; rr(-60, 500, 470, 40, 0); ctx.stroke();
  for (let i = 0; i < 7; i++) seg([[-40 + i * 60, 500], [-40 + i * 60, 450]], 6, '#111'); seg([[-60, 450], [330, 450]], 7, '#111');
  seg([[330, 450], [380, 420]], 7, '#111'); seg([[350, 500], [360, 470]], 6, '#111'); // barandilla rota
  fillRR(120, 540, 60, 300, 0, '#7a7f88'); ctx.strokeStyle = '#111'; rr(120, 540, 60, 300, 0); ctx.stroke();
  // trayectoria del coche
  const k = cl(t / 1.15), hit = t > 1.15;
  const cx = hit ? 520 : lerp(300, 520, k), cy = hit ? 860 + Math.sin(gt * 2) * 4 : lerp(470, 860, k * k), rot = hit ? .5 : lerp(0, .7, k);
  carSide(cx, cy, 1, rot, () => { ctx.save(); ctx.beginPath(); ctx.moveTo(-60, -66); ctx.lineTo(-36, -100); ctx.lineTo(0, -100); ctx.lineTo(0, -66); ctx.closePath(); ctx.clip(); sticky({ x: -28, y: -40, s: .42, pose: 'sitpanic', t: gt, face: 1, expr: 'scared' }); ctx.restore(); });
  if (hit) {
    const sk = t - 1.15; fillRR(-60, 860, W + 120, 500, 0, 'rgba(29,95,168,.55)');
    for (let i = 0; i < 16; i++) { const a = -PI / 2 + (hash(i) - .5) * 2.2, v = 300 + hash(i + 4) * 500; const px = 520 + Math.cos(a) * v * sk, py = 860 + Math.sin(a) * v * sk + 900 * sk * sk; if (sk < 1.2) circle(px, py, 10 + hash(i) * 10, '#ffffff'); }
    if (sk < .6) { ctx.save(); ctx.globalAlpha = 1 - sk / .6; ctx.strokeStyle = '#fff'; ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(520, 870, 120 + sk * 300, 30 + sk * 60, 0, 0, TAU); ctx.stroke(); ctx.restore(); }
  }
};

// ---------- dentro del coche, de lado: el agua sube ----------
SCENES.carin = (t, p, b, gt) => {
  sky('#5fb4f0', '#bfe3ff');
  const bd = Math.max(1, b.end - b.start);
  const w0 = p.w0 ?? .2, w1 = p.w1 ?? w0, wl = p.rewind ? lerp(w1, w0, E.inout(cl(t / bd))) : lerp(w0, w1, cl(t / bd));
  const lvl = lerp(1040, 360, wl);
  // carrocería grande
  ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-40, 1060); ctx.lineTo(-40, 640); ctx.lineTo(120, 600); ctx.lineTo(240, 380); ctx.lineTo(620, 380); ctx.lineTo(760, 600); ctx.lineTo(760, 1060); ctx.closePath();
  ctx.fillStyle = '#e5383b'; ctx.fill(); ctx.lineWidth = 10; ctx.strokeStyle = '#111'; ctx.stroke();
  seg([[60, 760], [690, 760]], 6, 'rgba(0,0,0,.3)'); fillRR(470, 700, 90, 22, 11, '#111');
  // ventanilla del conductor: lo que ves dentro
  const winTop = 420, winBot = 640, glassDown = p.win ? E.inout(cl((t - .3) / 1.6)) : p.open ? 1 : 0;
  ctx.save(); ctx.beginPath(); ctx.moveTo(150, winBot); ctx.lineTo(262, winTop); ctx.lineTo(600, winTop); ctx.lineTo(600, winBot); ctx.closePath(); ctx.fillStyle = '#29343f'; ctx.fill(); ctx.clip();
  const inLvl = Math.max(lvl + 120, 470);
  // asiento y volante
  fillRR(250, 470, 70, 200, 20, '#3c4652'); seg([[520, 560], [470, 640]], 12, '#111'); circle(530, 560, 44, 'rgba(0,0,0,0)'); ctx.lineWidth = 12; ctx.strokeStyle = '#111'; ctx.beginPath(); ctx.ellipse(530, 560, 18, 46, .3, 0, TAU); ctx.stroke();
  // Sticky
  const exit = p.exit ? E.inout(cl((t - .2) / 1.4)) : 0;
  if (exit < 1) {
    const pose = p.phone ? 'phone' : p.door ? 'push' : p.exit ? 'swim' : p.belt ? 'sit' : 'sitpanic';
    if (p.kid) { const out = cl((t - 1.0) / 1.2); stick({ x: lerp(300, 290, out), y: lerp(720, 440, out), s: 1.4, pose: out > 0 ? 'swim' : 'sitpanic', t: gt, face: 1, expr: 'scared', acc: ['bun'], body: '#ffe6c7', hair: '#7a4a2a' }); }
    if (exit <= 0) sticky({ x: p.kid ? 440 : 380, y: pose.startsWith('sit') ? 720 : 790, s: 2.0, pose, t: gt, face: 1, expr: p.calm ? 'neutral' : 'scared', acc: p.phone ? ['cap', 'scarf', 'phone'] : ['cap', 'scarf'], over: p.phone ? { ra1: 2.2, ra2: 1.9, head: .1 } : {} });
    // cinturón
    const belt = p.belt ? 1 - E.inout(cl((t - .3) / .6)) : p.nobelt ? 0 : 1;
    if (belt > 0 && exit <= 0) { ctx.save(); ctx.globalAlpha = belt; seg([[300, 520], [lerp(300, 420, belt), lerp(520, 660, belt)]], 14, '#111'); seg([[300, 520], [lerp(300, 420, belt), lerp(520, 660, belt)]], 8, '#f2b134'); ctx.restore(); }
  }
  // agua dentro, más baja que fuera
  ctx.fillStyle = 'rgba(40,140,220,.55)'; ctx.fillRect(150, inLvl, 460, 400);
  ctx.restore();
  // cristal: se baja o se rompe
  if (!p.broken) {
    const gy = lerp(0, winBot - winTop, glassDown);
    ctx.save(); ctx.beginPath(); ctx.moveTo(150, winBot); ctx.lineTo(262, winTop); ctx.lineTo(600, winTop); ctx.lineTo(600, winBot); ctx.closePath(); ctx.clip();
    ctx.fillStyle = 'rgba(200,235,255,.28)'; ctx.fillRect(150, winTop + gy, 460, winBot - winTop); seg([[300, winTop + gy + 20], [380, winTop + gy + 90]], 10, 'rgba(255,255,255,.45)');
    if (p.brk) { const k = cl((t - .9) / .3); if (k > 0) { ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 3; for (let i = 0; i < 10; i++) { const a = i / 10 * TAU; ctx.beginPath(); ctx.moveTo(580, 470); ctx.lineTo(580 + Math.cos(a) * 300 * k, 470 + Math.sin(a) * 300 * k); ctx.stroke(); } } }
    ctx.restore();
  }
  ctx.lineWidth = 10; ctx.strokeStyle = '#111'; ctx.beginPath(); ctx.moveTo(150, winBot); ctx.lineTo(262, winTop); ctx.lineTo(600, winTop); ctx.lineTo(600, winBot); ctx.closePath(); ctx.stroke();
  if (exit > 0) sticky({ x: lerp(380, 320, exit), y: lerp(720, 500, exit), s: 2.0, pose: 'swim', t: gt, face: 1, expr: 'worried', rot: lerp(0, -.5, exit) });
  // rompecristales golpeando la esquina
  if (p.brk) { const k = t < .9 ? E.out(cl(t / .9)) : 1; const hx = lerp(700, 586, k), hy = lerp(360, 476, k); ctx.save(); ctx.translate(hx, hy); ctx.rotate(-.7); fillRR(-14, -10, 110, 28, 10, '#ff8a00'); ctx.lineWidth = 5; ctx.strokeStyle = '#111'; ctx.stroke(); fillRR(-30, -6, 26, 20, 4, '#9aa3ad'); ctx.stroke(); ctx.restore();
    if (t > .9 && t < 1.4) for (let i = 0; i < 14; i++) { const a = hash(i) * TAU, v = (t - .9) * 500; fillRR(580 + Math.cos(a) * v, 470 + Math.sin(a) * v + (t - .9) * (t - .9) * 800, 14, 10, 2, 'rgba(220,240,255,.9)'); } }
  // presión del agua contra la puerta
  if (p.door) { const a = E.out(cl((t - .3) / .4)); ctx.save(); ctx.globalAlpha = a; for (let i = 0; i < 4; i++) { const y = 780 + i * 60, x = -40 + ((gt * 120 + i * 40) % 80); ctx.fillStyle = '#1d5fa8'; ctx.beginPath(); ctx.moveTo(x, y - 18); ctx.lineTo(x + 70, y); ctx.lineTo(x, y + 18); ctx.fill(); }
    ctx.restore(); }
  // agua por fuera
  ctx.fillStyle = 'rgba(18,118,214,.8)'; ctx.fillRect(-60, lvl, W + 120, H);
  ctx.beginPath(); ctx.moveTo(-60, lvl); for (let x = -60; x <= W + 60; x += 20) ctx.lineTo(x, lvl + Math.sin(x * .03 + gt * 3) * 8); ctx.lineTo(W + 60, lvl + 30); ctx.lineTo(-60, lvl + 30); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fill();
  particles(18, 7, (x, y, r) => circle(x * W, lvl + 40 + ((1 - y) * 600 - gt * 120 * (r + .3)) % 600 + (gt * 120 * (r + .3) > 0 ? 0 : 0), 4 + r * 8, 'rgba(255,255,255,.5)'));
  if (p.door) { const a = E.out(cl((t - .3) / .4)); ctx.save(); ctx.globalAlpha = a; fillRR(110, 1090, 470, 80, 20, '#111'); text('CIENTOS DE KILOS', 345, 1131, { size: 44, fam: 'Anton', w: 400, color: '#ffd400', ls: 2 }); ctx.restore(); }
  if (p.dark) { ctx.fillStyle = `rgba(0,10,30,${.6 * cl(t / 2)})`; ctx.fillRect(-60, -60, W + 120, H + 120); }
  if (p.rewind) { for (let i = 0; i < 6; i++) { const y = (hash(i + Math.floor(gt * 20)) * H); ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(-60, y, W + 120, 6 + hash(i) * 14); }
    ctx.save(); ctx.globalAlpha = .9; fillRR(W / 2 - 230, 560, 460, 120, 24, '#111'); ctx.fillStyle = '#ffd400'; for (const ox of [-190, -150]) { ctx.beginPath(); ctx.moveTo(W / 2 + ox + 40, 595); ctx.lineTo(W / 2 + ox, 620); ctx.lineTo(W / 2 + ox + 40, 645); ctx.fill(); } text('REBOBINA', W / 2 + 40, 622, { size: 64, fam: 'Anton', w: 400, color: '#ffd400', ls: 3 }); ctx.restore(); }
  if (p.stamp) stamp(p.stamp, p.label || '', t);
};

// ---------- fuera: nadar hacia arriba ----------
SCENES.swimup = (t, p, b, gt) => {
  const surf = p.surface ? E.out(cl(t / .8)) : 0;
  ctx.fillStyle = lin(0, 0, 0, H, [[0, '#3aa0e6'], [1, '#0b2a55']]); ctx.fillRect(-60, -60, W + 120, H + 120);
  for (let i = 0; i < 6; i++) { ctx.save(); ctx.globalAlpha = .12; ctx.fillStyle = '#fff'; ctx.beginPath(); const x = 60 + i * 120 + Math.sin(gt + i) * 20; ctx.moveTo(x, 0); ctx.lineTo(x + 50, 0); ctx.lineTo(x - 40, H); ctx.lineTo(x - 90, H); ctx.fill(); ctx.restore(); }
  const surfY = lerp(220, 640, surf);
  // superficie y cielo
  ctx.fillStyle = lin(0, -60, 0, surfY, [[0, '#7fc8ff'], [1, '#d8f0ff']]); ctx.fillRect(-60, -60, W + 120, surfY + 60);
  ctx.beginPath(); ctx.moveTo(-60, surfY); for (let x = -60; x <= W + 60; x += 20) ctx.lineTo(x, surfY + Math.sin(x * .03 + gt * 3) * 10); ctx.lineTo(W + 60, surfY + 40); ctx.lineTo(-60, surfY + 40); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fill();
  // coche hundiéndose abajo
  carSide(420, 1180 + t * 40, .9, .4);
  // Sticky subiendo
  const up = E.inout(cl(t / Math.max(1, b.end - b.start)));
  const y = p.surface ? surfY + 160 : lerp(1000, 420, up);
  sticky({ x: 330, y: y + (p.surface ? 80 : 0), s: 2.0, pose: p.surface ? 'wave' : 'swim', t: gt, face: 1, expr: p.surface ? 'happy' : 'worried' });
  particles(22, 3, (x, yy, r) => circle(300 + x * 120, (y - 200) - ((yy * 500 + gt * 200 * (r + .3)) % 500), 4 + r * 7, 'rgba(255,255,255,.55)'));
  if (p.surface) { for (let i = 0; i < 12; i++) { const a = -PI / 2 + (hash(i) - .5) * 2, v = 380 * t; if (t < 1) circle(330 + Math.cos(a) * v, surfY + Math.sin(a) * v + 500 * t * t, 9, '#fff'); }
    const a = E.back(cl((t - .3) / .35)); ctx.save(); ctx.translate(W / 2, 300); ctx.scale(a, a); ctx.rotate(-.06); text('¡VIVO!', 0, 0, { size: 150, fam: 'Anton', w: 400, color: '#ffd400', stroke: '#111', sw: 18, ls: 4 }); ctx.restore(); }
};

// ---------- resumen: los cuatro pasos ----------
SCENES.recap = (t, p, b, gt) => {
  ctx.fillStyle = '#ffd400'; ctx.fillRect(-60, -60, W + 120, H + 120);
  for (let i = 0; i < 12; i++) seg([[-60, i * 120 - (gt * 30) % 120], [W + 60, i * 120 - 240 - (gt * 30) % 120]], 30, 'rgba(255,255,255,.18)');
  text('APRÉNDETELO', W / 2, 250, { size: 70, fam: 'Anton', w: 400, color: '#111', ls: 4 });
  const steps = p.steps || [];
  const bd = Math.max(1, b.end - b.start);
  steps.forEach((s, i) => {
    const on = t > .2 + i * (bd - .6) / steps.length; const a = E.back(cl((t - .2 - i * (bd - .6) / steps.length) / .3));
    const y = 340 + i * 130; ctx.save(); ctx.translate(W / 2, y + 50); ctx.scale(.9 + .1 * a, .9 + .1 * a); ctx.translate(-W / 2, -(y + 50));
    fillRR(70, y, 580, 104, 26, on ? '#111' : 'rgba(0,0,0,.12)');
    circle(140, y + 52, 36, on ? '#ffd400' : 'rgba(0,0,0,.2)'); text(String(i + 1), 140, y + 54, { size: 44, fam: 'Anton', w: 400, color: '#111' });
    text(s, 200, y + 54, { size: 50, fam: 'Anton', w: 400, align: 'left', color: on ? '#fff' : 'rgba(0,0,0,.35)', ls: 2 });
    ctx.restore();
  });
  sticky({ x: 600, y: 1190, s: 1.6, pose: 'point', t: gt, face: -1, expr: 'happy', over: { ra1: 2.3, ra2: .2 } });
};

// ---------- pregunta final: qué situación hago mañana ----------
SCENES.nextpick = (t, p, b, gt) => {
  sky('#7fc8ff', '#eaf6ff');
  const opts = p.opts || [];
  opts.forEach((o, i) => {
    const a = E.back(cl((t - .2 - i * .35) / .35)); if (a <= 0) return; const x = [190, 520, 360][i % 3], y = [330, 420, 560][i % 3], fl = Math.sin(gt * 2 + i) * 8;
    ctx.save(); ctx.translate(x, y + fl); ctx.scale(a, a); const w = measure(o, 40, 'Anton', 400, 2) + 60;
    ctx.shadowColor = 'rgba(0,0,0,.2)'; ctx.shadowBlur = 20; fillRR(-w / 2, -44, w, 88, 30, '#fff'); ctx.shadowBlur = 0; ctx.lineWidth = 6; ctx.strokeStyle = '#111'; rr(-w / 2, -44, w, 88, 30); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(-20, 40); ctx.lineTo(-36, 74); ctx.lineTo(10, 42); ctx.fill(); ctx.stroke();
    text(o, 0, 2, { size: 40, fam: 'Anton', w: 400, color: '#111', ls: 2 }); ctx.restore();
  });
  sticky({ x: 360, y: 1270, s: 1.6, pose: 'wave', t: gt, face: 1, expr: 'happy' });
  const pu = 1 + Math.sin(gt * 6) * .04; ctx.save(); ctx.translate(W / 2, 1080 - 330); ctx.scale(pu, pu); fillRR(-190, -36, 380, 72, 36, '#ff3b5c'); text('COMENTA', -20, 2, { size: 36, fam: 'Anton', w: 400, ls: 3 }); ctx.strokeStyle = '#fff'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(120, -14); ctx.lineTo(120, 16); ctx.moveTo(108, 4); ctx.lineTo(120, 17); ctx.lineTo(132, 4); ctx.stroke(); ctx.restore();
};

// ---------- cierre del canal ----------
OVX.sticky_end = (b, t, o) => {
  ctx.fillStyle = '#111'; ctx.fillRect(0, 0, W, H);
  const a = E.back(cl(t / .4));
  ctx.save(); ctx.translate(W / 2, 470); ctx.scale(a, a);
  text('STICKY', 0, -70, { size: 170, fam: 'Anton', w: 400, color: '#fff', ls: 6 }); text('MAN', 0, 90, { size: 170, fam: 'Anton', w: 400, color: '#ffd400', ls: 10 }); ctx.restore();
  text(o.sub || 'QUÉ HACER SI…', W / 2, 700, { size: 30, w: 900, ls: 6, color: 'rgba(255,255,255,.75)' });
  sticky({ x: W / 2, y: 1100, s: 1.7, pose: 'wave', t: t, face: 1, expr: 'happy' });
  const pu = 1 + Math.sin(t * 6) * .04; ctx.save(); ctx.translate(W / 2, 790); ctx.scale(pu, pu); const w = measure(o.cta, 24, 'Montserrat', 900, 2) + 60; fillRR(-w / 2, -30, w, 60, 30, '#ff3b5c'); text(o.cta, 0, 1, { size: 24, w: 900, ls: 2 }); ctx.restore();
};
