// «La mayoría dijo» · Fuego en el 5ºB — escenas del incendio y Toby, el perro
// ---------- Toby ----------
function dog(o) {
  const s = o.s || 1, f = o.face || 1, t = o.t || 0, run = o.run ? Math.sin(t * 14) : 0;
  const fur = '#d9a066', dark = '#a8703f', line = '#15151b';
  ctx.save(); ctx.translate(o.x, o.y); if (o.rot) ctx.rotate(o.rot); ctx.scale(s * f, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const shiver = o.scared ? Math.sin(t * 50) * 1.2 : 0; ctx.translate(shiver, 0);
  // cola
  const wag = o.scared ? -.6 : Math.sin(t * (o.wag ? 18 : 3)) * (o.wag ? .5 : .15);
  ctx.save(); ctx.translate(-32, -40); ctx.rotate(-.9 + wag); seg([[0, 0], [-6, -14], [-4, -28]], 9, line); seg([[0, 0], [-6, -14], [-4, -28]], 5, fur); ctx.restore();
  // patas
  const legs = o.sit ? [[-20, 0, 0], [-8, 0, 0], [20, 0, 0], [28, 0, 0]] : [[-22, 0, run], [-12, 0, -run], [16, 0, -run], [26, 0, run]];
  legs.forEach(([x, , k], i) => { const top = o.sit && i < 2 ? -18 : -26; seg([[x, top], [x + k * 8, -2]], 10, line); seg([[x, top], [x + k * 8, -2]], 6, i % 2 ? dark : fur); });
  // cuerpo
  ctx.beginPath(); ctx.ellipse(0, o.sit ? -30 : -36, 36, 18, o.sit ? -.35 : 0, 0, TAU); ctx.fillStyle = fur; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = line; ctx.stroke();
  // collar
  seg([[24, -52], [30, -38]], 6, '#e5383b');
  // cabeza
  const hy = o.sit ? -66 : -58, hx = 38;
  circle(hx, hy, 19, line); circle(hx, hy, 15.5, fur);
  ctx.beginPath(); ctx.ellipse(hx + 15, hy + 6, 12, 8, .1, 0, TAU); ctx.fillStyle = '#e8c08f'; ctx.fill(); ctx.lineWidth = 3; ctx.stroke();
  circle(hx + 25, hy + 3, 4, line);
  // oreja caída
  ctx.save(); ctx.translate(hx - 6, hy - 12); ctx.rotate(o.scared ? .9 : .4 + Math.sin(t * 3) * .05); ctx.beginPath(); ctx.ellipse(0, 10, 7, 14, 0, 0, TAU); ctx.fillStyle = dark; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = line; ctx.stroke(); ctx.restore();
  // ojo
  if (o.scared) { circle(hx + 6, hy - 3, 5.5, '#fff'); ctx.lineWidth = 2; ctx.strokeStyle = line; ctx.stroke(); circle(hx + 7, hy - 2, 3, line); }
  else circle(hx + 6, hy - 3, 3.4, line);
  if (o.bark) { ctx.beginPath(); ctx.ellipse(hx + 18, hy + 13, 6, 3 + o.bark * 4, 0, 0, TAU); ctx.fillStyle = '#5a1e1e'; ctx.fill(); }
  ctx.restore();
}

// ---------- llamas y humo ----------
function flame(x, y, w, h, gt, seed) {
  for (let k = 0; k < 3; k++) {
    const col = ['#ff5a1f', '#ff9a1f', '#ffe08a'][k], sc = 1 - k * .28;
    ctx.beginPath(); ctx.moveTo(x - w / 2 * sc, y);
    const n = 5; for (let i = 0; i <= n; i++) { const u = i / n; const px = x - w / 2 * sc + u * w * sc; const tip = Math.sin(u * PI) * h * sc * (.7 + .3 * noise1(gt * 3 + seed + i * 1.7)); ctx.lineTo(px, y - tip); }
    ctx.lineTo(x + w / 2 * sc, y); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  }
}
function smokeLayer(y1, a, gt, dark = '#2a2a30') {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a;
  ctx.fillStyle = lin(0, 0, 0, y1 + 80, [[0, dark], [.8, dark], [1, 'rgba(40,40,46,0)']]); ctx.fillRect(-100, -100, W + 200, y1 + 180);
  for (let i = 0; i < 14; i++) { const x = ((hash(i) * W + gt * 20 * (hash(i + 3) - .3)) % (W + 200)) - 100; const y = y1 - 20 + Math.sin(gt + i) * 18; circle(x, y, 60 + hash(i * 2) * 60, dark); }
  ctx.restore();
}
const YOU_F = { acc: [], body: '#e9e9ee' };
const youF = o => stick(Object.assign({}, S.you, o));

// ---------- 1. fachada ardiendo ----------
SCENES.street = (t, p, b, gt) => {
  ctx.fillStyle = lin(0, 0, 0, H, [[0, '#0c1024'], [.6, '#2a1420'], [1, '#120a0c']]); ctx.fillRect(-60, -60, W + 120, H + 120);
  glow(360, 260, 620, 'rgba(255,110,40,.35)');
  // edificio
  const bx = 110, bw = 500; fillRR(bx, 160, bw, 960, 6, '#3b3440'); ctx.lineWidth = 4; ctx.strokeStyle = '#15151b'; rr(bx, 160, bw, 960, 6); ctx.stroke();
  for (let f = 0; f < 6; f++) {
    const y = 950 - f * 150; seg([[bx, y + 120], [bx + bw, y + 120]], 4, 'rgba(0,0,0,.25)');
    for (let c = 0; c < 3; c++) {
      const x = 160 + c * 150; if (f === 0 && c === 1) continue;
      const burning = f === 5 && c !== 1, dogWin = f === 5 && c === 1, warm = f >= 4;
      fillRR(x, y + 6, 100, 96, 6, burning ? '#ffb347' : dogWin ? '#ffcf7a' : warm ? '#3a2a2a' : '#1a2236'); ctx.lineWidth = 4; ctx.strokeStyle = '#15151b'; rr(x, y + 6, 100, 96, 6); ctx.stroke();
      if (!burning && !dogWin) seg([[x + 50, y + 6], [x + 50, y + 102]], 4, '#15151b');
      if (burning) { glow(x + 50, y + 50, 160, 'rgba(255,120,30,.45)'); flame(x + 50, y + 20, 110, 150 + Math.sin(gt * 7 + c) * 20, gt, c * 9); }
      if (dogWin) {
        ctx.save(); rr(x, y + 6, 100, 96, 6); ctx.clip(); smokeLayer(y + 40, .7, gt, '#4a3a3a');
        dog({ x: x + 40, y: y + 100, s: .9, face: 1, t: gt, sit: true, scared: true, bark: Math.max(0, Math.sin(gt * 9)) * (p.bark ? 1 : 0) }); ctx.restore();
      }
    }
  }
  // portal
  fillRR(310, 960, 100, 160, 8, '#1a1418'); ctx.lineWidth = 4; ctx.strokeStyle = '#15151b'; ctx.stroke(); glow(360, 1040, 120, 'rgba(255,140,60,.25)');
  // humo
  for (let i = 0; i < 9; i++) { const k = (gt * .25 + hash(i)) % 1; circle(200 + hash(i * 3) * 320 + k * 60, 180 - k * 300, 60 + k * 90, `rgba(30,26,32,${.75 * (1 - k)})`); }
  // calle y tú
  fillRR(-60, 1120, W + 120, 220, 0, '#1b1a20'); seg([[-60, 1122], [W + 60, 1122]], 6, '#0c0c10');
  const fl = Math.floor(gt * 3) % 2; if (p.truck) { ctx.fillStyle = fl ? 'rgba(60,120,255,.18)' : 'rgba(255,40,40,.14)'; ctx.fillRect(-60, -60, W + 120, H + 120); }
  const rx = p.run ? lerp(560, 380, E.inout(cl(t / 2))) : 560;
  youF({ x: rx, y: 1215, s: 1.35, pose: p.run ? 'run' : 'look', t: gt, face: -1, expr: 'scared', over: p.run ? {} : { head: -.45, ra1: 2.6, ra2: .3 } });
  // chispas
  particles(30, 4, (x, y, r) => circle(160 + x * 400 + Math.sin(gt * 2 + r * 9) * 20, 600 - ((y * 900 + gt * 160 * (r + .4)) % 900), 1.5 + r * 2.5, `rgba(255,${150 + r * 80},60,${.8 - r * .4})`));
  vignette(.45, .4);
};

// ---------- 2. escalera llena de humo ----------
SCENES.stairs = (t, p, b, gt) => {
  ctx.fillStyle = '#2b2a30'; ctx.fillRect(-60, -60, W + 120, H + 120);
  for (let i = 0; i < 8; i++) seg([[-60, i * 180 + 40], [W + 60, i * 180 + 40]], 2, 'rgba(255,255,255,.03)');
  // número de planta pintado en la pared
  text(String(p.floor || 1) + 'º', 560, 330, { size: 220, fam: 'Anton', w: 400, color: 'rgba(255,255,255,.12)' });
  // señal de salida
  fillRR(70, 210, 150, 60, 8, '#0f8f4c'); text('SALIDA', 145, 241, { size: 26, w: 900 }); glow(145, 240, 120, 'rgba(40,255,140,.16)');
  // tramo de escalera
  ctx.fillStyle = '#4a4650'; ctx.beginPath(); ctx.moveTo(-60, 1180); for (let i = 0; i < 12; i++) { ctx.lineTo(i * 64 - 20, 1180 - i * 44); ctx.lineTo(i * 64 + 44, 1180 - i * 44); } ctx.lineTo(W + 60, 640); ctx.lineTo(W + 60, H + 60); ctx.lineTo(-60, H + 60); ctx.fill();
  ctx.strokeStyle = '#15151b'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-60, 1180); for (let i = 0; i < 12; i++) { ctx.lineTo(i * 64 - 20, 1180 - i * 44); ctx.lineTo(i * 64 + 44, 1180 - i * 44); } ctx.stroke();
  seg([[-40, 1080], [W + 40, 560]], 6, '#7a7380'); // barandilla
  for (let i = 0; i < 12; i++) seg([[i * 64, 1080 - i * 44 + 30 - 30], [i * 64, 1170 - i * 44]], 4, '#5b5662');
  // tú subiendo
  const k = cl(t / Math.max(1, b.end - b.start)); const x = lerp(140, 520, k), y = 1180 - (x + 20) / 64 * 44 + 6;
  youF({ x, y, s: 1.45, pose: p.crawl ? 'crawl' : p.low ? 'crouchrun' : 'run', t: gt * (p.crawl ? .8 : 1), face: 1, expr: 'scared' });
  // humo que baja planta a planta
  smokeLayer(lerp(300, 820, p.smoke || 0), .92, gt);
  // luz parpadeante
  if (hash(Math.floor(gt * 8)) > .85) { ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-60, -60, W + 120, H + 120); }
  glow(360, 1280, 700, 'rgba(255,120,40,.18)');
  vignette(.55, .35);
};

// ---------- 3. la puerta: tocar antes de abrir ----------
SCENES.door = (t, p, b, gt) => {
  ctx.fillStyle = '#2a2830'; ctx.fillRect(-60, -60, W + 120, H + 120);
  const open = p.open ? E.inout(cl((t - .3) / 1.0)) : 0;
  // marco y hueco
  fillRR(96, 120, 528, 1110, 10, '#15151b'); fillRR(110, 134, 500, 1096, 6, '#3a2420');
  if (open > 0) { ctx.save(); rr(110, 134, 500, 1096, 6); ctx.clip(); ctx.fillStyle = '#4a3d3a'; ctx.fillRect(110, 134, 500, 1096); smokeLayer(520, .85, gt, '#3a3036'); glow(360, 700, 400, 'rgba(255,170,90,.2)'); ctx.restore(); }
  ctx.save(); ctx.translate(110, 0); ctx.scale(1 - open * .82, 1);
  fillRR(0, 134, 500, 1096, 6, '#8a5a3a'); ctx.lineWidth = 5; ctx.strokeStyle = '#15151b'; rr(0, 134, 500, 1096, 6); ctx.stroke();
  for (const [x, y, w, h] of [[50, 190, 400, 380], [50, 640, 400, 520]]) { rr(x, y, w, h, 10); ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.stroke(); }
  fillRR(190, 420, 120, 70, 10, '#e9d6a8'); text('5ºB', 250, 456, { size: 40, fam: 'Anton', w: 400, color: '#15151b' });
  circle(410, 700, 22, '#e1b24a'); ctx.lineWidth = 4; ctx.strokeStyle = '#15151b'; ctx.stroke(); fillRR(410, 690, 70, 20, 10, '#e1b24a'); ctx.stroke();
  ctx.restore();
  // humo que se cuela por arriba
  smokeLayer(240, .6, gt);
  // calor o frío según lo que notas
  if (p.cold) { const a = E.out(cl((t - .8) / .4)); ctx.save(); ctx.globalAlpha = a; glow(330, 560, 200, 'rgba(120,200,255,.35)'); ctx.restore(); }
  // mano: dorso contra la puerta
  if (!p.open) {
    const k = E.out(cl(t / .8)); const hx = lerp(760, 330, k), hy = lerp(1000, 560, k);
    seg([[800, 1300], [hx + 40, hy + 60], [hx, hy]], 40, '#15151b'); seg([[800, 1300], [hx + 40, hy + 60], [hx, hy]], 30, '#e9e9ee');
    ctx.save(); ctx.translate(hx, hy); ctx.rotate(-.5); fillRR(-36, -50, 72, 96, 32, '#15151b'); fillRR(-30, -44, 60, 84, 28, '#e9e9ee'); ctx.restore();
    if (k >= 1) { ctx.save(); ctx.globalAlpha = .6 + .4 * Math.sin(gt * 6); ctx.strokeStyle = p.cold ? '#7fd4ff' : '#ffb347'; ctx.lineWidth = 5; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(hx, hy, 70 + i * 26 + (gt * 40) % 26, 0, TAU); ctx.stroke(); } ctx.restore(); }
  }
  vignette(.5, .35);
};

// ---------- 4. el piso: Toby debajo de la cama ----------
SCENES.room = (t, p, b, gt) => {
  ctx.fillStyle = '#5a4c4a'; ctx.fillRect(-60, -60, W + 120, H + 120);
  fillRR(-60, 1060, W + 120, 300, 0, '#3a2e2c'); // suelo
  // ventana con resplandor naranja
  fillRR(440, 240, 210, 260, 8, '#ff9a4a'); ctx.lineWidth = 6; ctx.strokeStyle = '#15151b'; rr(440, 240, 210, 260, 8); ctx.stroke(); seg([[545, 240], [545, 500]], 6, '#15151b'); seg([[440, 370], [650, 370]], 6, '#15151b');
  glow(545, 370, 300, 'rgba(255,140,60,.35)');
  // cama
  fillRR(150, 860, 540, 130, 18, '#c9cbd6'); ctx.lineWidth = 5; ctx.strokeStyle = '#15151b'; ctx.stroke(); fillRR(150, 980, 540, 30, 8, '#6b4a3a'); ctx.stroke();
  fillRR(170, 1010, 500, 60, 0, '#0b0809'); fillRR(160, 780, 150, 90, 30, '#eef0f6'); ctx.stroke(); seg([[160, 1010], [160, 1070]], 10, '#6b4a3a'); seg([[680, 1010], [680, 1070]], 10, '#6b4a3a');
  // Toby: ojos bajo la cama, luego sale
  const come = p.come ? E.inout(cl((t - .2) / 1.4)) : 0;
  if (p.eyes && !come && !p.hug) { const bl = (gt % 3) < .12; if (!bl) { circle(470, 1040, 7, '#fff2c0'); circle(500, 1040, 7, '#fff2c0'); glow(485, 1040, 40, 'rgba(255,240,180,.4)'); } }
  if (come > 0 && !p.hug) dog({ x: lerp(520, 300, come), y: 1080, s: 1.3, face: -1, t: gt, run: come < 1, wag: come >= 1 });
  // tú
  if (p.hug) {
    youF({ x: 300, y: 1160, s: 1.8, pose: 'carry', t: gt, face: 1, expr: 'happy' });
    dog({ x: 356, y: 990, s: 1.1, face: -1, t: gt, wag: true, rot: -.15 });
  } else youF({ x: 130, y: 1150, s: 1.8, pose: 'kneel', t: gt, face: 1, expr: p.call ? 'neutral' : 'worried', over: p.call ? { ra1: 1.5, ra2: .05 } : {} });
  smokeLayer(lerp(380, 520, cl(t / 6)), .85, gt, '#3a3438');
  vignette(.5, .35);
};

// ---------- 5. la escalera se derrumba ----------
SCENES.stairfall = (t, p, b, gt) => {
  ctx.fillStyle = '#231e22'; ctx.fillRect(-60, -60, W + 120, H + 120);
  glow(360, 1200, 800, 'rgba(255,110,30,.55)');
  // rellano donde estás
  fillRR(-60, 560, 380, 40, 4, '#55505a'); ctx.lineWidth = 4; ctx.strokeStyle = '#15151b'; ctx.stroke();
  // tramos que caen
  const k = cl((t - .2) / 1.8);
  for (let i = 0; i < 7; i++) {
    const fall = Math.max(0, k * 2.2 - i * .2), y = 600 + i * 60 + fall * fall * 600, x = 330 + i * 52, r = fall * (i % 2 ? .9 : -.7);
    ctx.save(); ctx.translate(x, y); ctx.rotate(r); fillRR(-30, -14, 60, 28, 4, '#6a6470'); ctx.lineWidth = 4; ctx.strokeStyle = '#15151b'; ctx.stroke(); ctx.restore();
  }
  for (let i = 0; i < 6; i++) flame(120 + i * 110, 1290, 160, 300 + Math.sin(gt * 6 + i) * 60, gt, i * 4);
  particles(40, 9, (x, y, r) => circle(x * W, 1280 - ((y * 1100 + gt * 260 * (r + .3)) % 1100), 1.5 + r * 3, `rgba(255,${140 + r * 90},60,.85)`));
  // tú con Toby, echándote atrás
  youF({ x: 200, y: 560, s: 1.6, pose: 'carry', t: gt, face: 1, expr: 'scared', over: { tor: -.25 } });
  dog({ x: 250, y: 420, s: .9, face: 1, t: gt, scared: true, rot: -.1 });
  smokeLayer(180, .7, gt, '#2c262a');
  vignette(.45, .35);
};

// ---------- 6. la ventana: balcón del vecino a dos metros ----------
SCENES.ledge = (t, p, b, gt) => {
  // de noche, vista desde dentro del piso
  ctx.fillStyle = '#4a3e3c'; ctx.fillRect(-60, -60, W + 120, H + 120);
  // puerta a la izquierda con humo colándose por debajo
  fillRR(-20, 420, 200, 700, 6, '#8a5a3a'); ctx.lineWidth = 5; ctx.strokeStyle = '#15151b'; ctx.stroke();
  if (p.smoke) { for (let i = 0; i < 7; i++) { const k = (gt * .5 + hash(i)) % 1; circle(60 + k * 260 + hash(i) * 40, 1110 - k * 120, 30 + k * 60, `rgba(50,46,52,${.8 * (1 - k)})`); } }
  if (p.towel) { fillRR(-10, 1080, 210, 36, 14, '#5aa2d8'); ctx.lineWidth = 4; ctx.strokeStyle = '#15151b'; ctx.stroke(); }
  // ventana abierta
  fillRR(250, 220, 440, 620, 10, '#15151b');
  ctx.save(); rr(262, 232, 416, 596, 6); ctx.clip();
  ctx.fillStyle = lin(0, 232, 0, 828, [[0, '#0d1230'], [1, '#2a1830']]); ctx.fillRect(262, 232, 416, 596);
  // edificio de enfrente con balcón
  fillRR(560, 232, 200, 600, 0, '#2f2a36'); fillRR(540, 600, 140, 26, 4, '#6a6470'); for (let i = 0; i < 6; i++) seg([[548 + i * 24, 600], [548 + i * 24, 540]], 5, '#6a6470'); seg([[540, 540], [680, 540]], 6, '#6a6470');
  fillRR(590, 420, 70, 110, 4, '#ffd27a');
  // calle muy abajo y camión de bomberos lejos
  fillRR(262, 760, 300, 70, 0, '#141218'); const fl = Math.floor(gt * 3) % 2; fillRR(300, 790, 70, 24, 4, '#c8262b'); circle(320, 786, 5, fl ? '#4d8bff' : '#ff3b30'); circle(350, 786, 5, fl ? '#ff3b30' : '#4d8bff');
  glow(335, 790, 60, fl ? 'rgba(80,140,255,.4)' : 'rgba(255,60,60,.4)');
  ctx.restore();
  fillRR(240, 830, 460, 30, 6, '#d8d2c8'); ctx.lineWidth = 4; ctx.strokeStyle = '#15151b'; ctx.stroke();
  if (p.gap) { const a = E.out(cl((t - .4) / .5)); ctx.save(); ctx.globalAlpha = a; ctx.setLineDash([16, 12]); ctx.lineWidth = 6; ctx.strokeStyle = '#ffc24d'; ctx.beginPath(); ctx.moveTo(440, 600); ctx.quadraticCurveTo(500, 520, 570, 590); ctx.stroke(); ctx.setLineDash([]); fillRR(440, 470, 110, 54, 14, '#ffc24d'); text('2 M', 495, 498, { size: 32, fam: 'Anton', w: 400, color: '#15151b' }); ctx.restore(); }
  // tú junto a la ventana con Toby
  youF({ x: 360, y: 1180, s: 1.9, pose: 'carry', t: gt, face: 1, expr: 'worried' });
  dog({ x: 420, y: 1000, s: 1.15, face: 1, t: gt, scared: true, rot: -.12 });
  smokeLayer(lerp(200, 330, cl(t / 5)), .8, gt, '#3a3438');
  vignette(.5, .35);
};

// ---------- 7. pantalla partida: saltar o esperar ----------
SCENES.fsplit = (t, p, b, gt) => {
  const side = p.side, la = side === 'b' ? .35 : 1, ra = side === 'a' ? .35 : 1;
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 360, H); ctx.clip(); ctx.translate(-170, 0);
  SCENES.ledge(t, { gap: 1 }, b, gt); ctx.restore(); ctx.fillStyle = `rgba(0,0,0,${1 - la})`; ctx.fillRect(0, 0, 360, H);
  ctx.save(); ctx.beginPath(); ctx.rect(360, 0, 360, H); ctx.clip(); ctx.translate(340, 0);
  SCENES.ledge(t, { smoke: 1, towel: 1 }, b, gt); ctx.restore(); ctx.fillStyle = `rgba(0,0,0,${1 - ra})`; ctx.fillRect(360, 0, 360, H);
  ctx.fillStyle = 'rgba(40,90,160,.16)'; ctx.fillRect(360, 0, 360, H);
  seg([[360, 0], [360, H]], 4, 'rgba(255,255,255,.7)');
  const pill = (txt, x, c, a) => { ctx.save(); ctx.globalAlpha = a; const w = measure(txt, 30, 'Anton', 400, 2) + 44; fillRR(x - w / 2, 300, w, 56, 28, c); text(txt, x, 329, { size: 30, fam: 'Anton', w: 400, ls: 2 }); ctx.restore(); };
  if (!b.ov) { pill('SALTAR', 180, '#c97a1e', la); pill('ESPERAR', 540, '#1f7a52', ra); }
  vignette(.5, .4);
};

// aviso temprano de que habrá votación
OVX.chip = (b, t, o) => {
  const a = E.back(cl((t - (o.at || 0)) / .35)) * (1 - E.inout(cl((t - (o.at || 0) - (o.dur || 2.6)) / .3))); if (a <= 0) return;
  const w = measure(o.text, 24, 'Montserrat', 900, 3) + 80;
  ctx.save(); ctx.translate(W / 2, o.y || 300); ctx.scale(a, a); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 20;
  fillRR(-w / 2, -30, w, 60, 30, S.accent2); ctx.shadowBlur = 0; text(o.text, -14, 1, { size: 24, w: 900, ls: 3 });
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 4; ctx.lineCap = 'round'; const ay = Math.sin(t * 8) * 4; ctx.beginPath(); ctx.moveTo(w / 2 - 34, -10 + ay); ctx.lineTo(w / 2 - 34, 10 + ay); ctx.moveTo(w / 2 - 42, 3 + ay); ctx.lineTo(w / 2 - 34, 11 + ay); ctx.lineTo(w / 2 - 26, 3 + ay); ctx.stroke();
  ctx.restore();
};
