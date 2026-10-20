// Escenas de SOBREVIVE AL LUNES — oficina, luz de día, estilo plano
const BOSS = { acc: ['raincoat', 'glasses', 'bun'], coat: '#2f3a56', nohood: true, body: '#f4f4f6', hair: '#3b2416' };
function officeWall() {
  ctx.fillStyle = lin(0, 0, 0, H, [[0, '#fbf1de'], [.75, '#f1e2c6'], [1, '#e6d2ad']]); ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#e9d6b4'; ctx.fillRect(0, 1000, W, H - 1000); ctx.fillStyle = '#d6bf96'; ctx.fillRect(0, 1000, W, 8);
  // ventana con ciudad
  fillRR(400, 250, 270, 330, 14, '#ffffff'); ctx.save(); rr(414, 264, 242, 302, 8); ctx.clip();
  ctx.fillStyle = lin(0, 264, 0, 566, [[0, '#8fd0ff'], [1, '#d9f0ff']]); ctx.fillRect(414, 264, 242, 302);
  for (let i = 0; i < 7; i++) { const bh = 90 + hash(i + 3) * 160; ctx.fillStyle = i % 2 ? '#a9c4dc' : '#93b2cf'; ctx.fillRect(414 + i * 36, 566 - bh, 32, bh); for (let j = 0; j < 6; j++) { ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(420 + i * 36, 566 - bh + 10 + j * 22, 8, 10); ctx.fillRect(432 + i * 36, 566 - bh + 10 + j * 22, 8, 10); } }
  ctx.restore(); for (let y = 270; y < 566; y += 26) { ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(414, y, 242, 5); }
  // planta
  fillRR(40, 900, 90, 100, 12, '#ff7a1a'); for (let i = 0; i < 7; i++) { ctx.save(); ctx.translate(85, 905); ctx.rotate(-1.2 + i * .4 + Math.sin(i) * .1); ctx.beginPath(); ctx.ellipse(0, -70, 18, 60, 0, 0, TAU); ctx.fillStyle = i % 2 ? '#3aa36b' : '#2f8f5b'; ctx.fill(); ctx.restore(); }
}
function wallClock(x, y, r, hh, mm) {
  circle(x, y, r + 8, '#1a191d'); circle(x, y, r, '#fff');
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; seg([[x + Math.sin(a) * r * .78, y - Math.cos(a) * r * .78], [x + Math.sin(a) * r * .9, y - Math.cos(a) * r * .9]], i % 3 ? 3 : 6, '#1a191d'); }
  const hA = ((hh % 12) + mm / 60) / 12 * TAU, mA = mm / 60 * TAU; ctx.lineCap = 'round';
  seg([[x, y], [x + Math.sin(hA) * r * .5, y - Math.cos(hA) * r * .5]], r * .07, '#1a191d');
  seg([[x, y], [x + Math.sin(mA) * r * .78, y - Math.cos(mA) * r * .78]], r * .045, '#ff7a1a'); circle(x, y, r * .06, '#1a191d');
}
function desk(x, y, w) {
  fillRR(x, y, w, 26, 8, '#c98b5a'); ctx.fillStyle = '#a86f43'; ctx.fillRect(x + 10, y + 26, w - 20, 170); ctx.fillStyle = '#b97c4e'; ctx.fillRect(x + 24, y + 40, w - 48, 140);
  fillRR(x + w * .5 - 40, y + 90, 80, 14, 7, '#8d5a35');
}
function laptopBack(x, y, s = 1, glowCol) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (glowCol) { ctx.save(); ctx.globalAlpha = .5; glow(0, -60, 160, glowCol); ctx.restore(); }
  ctx.beginPath(); ctx.moveTo(-80, 0); ctx.lineTo(80, 0); ctx.lineTo(70, -110); ctx.lineTo(-70, -110); ctx.closePath(); ctx.fillStyle = '#c9ccd3'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = '#1a191d'; ctx.stroke();
  circle(0, -58, 12, '#e9ebef'); fillRR(-95, -4, 190, 10, 4, '#9ea2ab'); ctx.restore();
}
function bubble(x, y, msg, t, side = 1) {
  const a = E.back(cl(t / .3)); if (a <= 0) return;
  const lines = wrap(msg, 32, 300, 'Montserrat', 800); const w = Math.max(...lines.map(l => measure(l, 32, 'Montserrat', 800))) + 50, h = lines.length * 40 + 34;
  ctx.save(); ctx.translate(x, y); ctx.scale(a, a); ctx.shadowColor = 'rgba(0,0,0,.18)'; ctx.shadowBlur = 20;
  fillRR(-w / 2, -h, w, h, 26, '#fff'); ctx.shadowBlur = 0;
  ctx.beginPath(); ctx.moveTo(side * 20, -2); ctx.lineTo(side * 50, 30); ctx.lineTo(side * 60, -2); ctx.fillStyle = '#fff'; ctx.fill();
  lines.forEach((l, i) => text(l, 0, -h + 37 + i * 40, { size: 32, w: 800, color: '#1a191d' }));
  ctx.restore();
}
SCENES.office = (t, p, b, gt) => {
  officeWall();
  const hm = (b._hud.time || '09:00').split(':').map(Number); wallClock(170, 380, 80, hm[0], hm[1]);
  if (p.enter && !p.sit) {
    desk(150, 930, 420); laptopBack(420, 930, .8);
    const k = cl(t / 2.6); const x = lerp(-80, 300, E.out(k));
    you({ x, y: 1170, s: 2.3, pose: k < 1 ? 'walkmug' : 'mug', t: gt, acc: ['mug'], expr: 'tired' });
  } else {
    // tú sentado detrás de la mesa
    const pose = p.relax ? 'sitrelax' : 'sitmug';
    const expr = p.relax ? 'happy' : p.boss ? 'worried' : 'neutral';
    you({ x: 270, y: 1011, s: 2.3, pose, t: gt, acc: p.relax ? [] : ['mug'], expr, look: p.boss ? 1 : .5 });
    desk(90, 930, 460); laptopBack(450, 930, .8);
    if (p.relax) { ctx.save(); ctx.translate(150, 928); fillRR(-12, -26, 24, 28, 4, '#fff'); ctx.lineWidth = 3; ctx.strokeStyle = '#1a191d'; ctx.stroke(); ctx.restore(); }
  }
  if (p.boss) {
    const k = p.bossIn ? E.out(cl(t / .6)) : 1; const x = lerp(W + 100, 600, k);
    const pose = p.thumbs ? 'thumbs' : p.point ? 'point' : 'cross';
    stick(Object.assign({}, BOSS, { x, y: 1200, s: 2.3, face: -1, pose, t: gt, expr: p.thumbs ? 'happy' : p.point ? 'angry' : 'smirk' }));
    if (p.bubble) bubble(450, 790, p.bubble, t - (p.bossIn ? .5 : .15), 1);
  }
};
SCENES.docs = (t, p, b, gt) => {
  officeWall();
  you({ x: 360, y: 1011, s: 2.3, pose: p.calm ? 'sitmug' : 'sitpanic', t: gt, acc: p.calm ? ['mug'] : [], expr: p.calm ? 'neutral' : 'scared' });
  desk(60, 930, 600);
  // montaña de papeles
  for (let i = 0; i < 26; i++) { const y = 918 - i * 13; const dx = Math.sin(i * 1.7) * 8; fillRR(80 + dx, y, 170, 14, 2, i % 5 ? '#ffffff' : '#fff3c4'); ctx.lineWidth = 1.5; ctx.strokeStyle = '#c9c2b0'; ctx.stroke(); }
  text('40 PÁG.', 165, 570, { size: 28, fam: 'Bebas Neue', w: 400, color: '#e2483d', ls: 2 });
  // monitor con 3 excels
  fillRR(440, 650, 250, 180, 12, '#1a191d'); fillRR(510, 830, 110, 20, 4, '#1a191d'); fillRR(480, 850, 170, 80, 6, 'rgba(0,0,0,0)');
  for (let k = 0; k < 3; k++) { const x = 452 + k * 20, y = 662 + k * 26; fillRR(x, y, 190, 120, 6, '#fff'); ctx.fillStyle = '#21a366'; ctx.fillRect(x, y, 190, 18);
    ctx.strokeStyle = '#d9dde3'; ctx.lineWidth = 1; for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(x, y + 18 + i * 17); ctx.lineTo(x + 190, y + 18 + i * 17); ctx.stroke(); } for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(x + i * 38, y + 18); ctx.lineTo(x + i * 38, y + 120); ctx.stroke(); } }
  if (!p.calm) { const k = (gt * 1.3) % 1; ctx.save(); ctx.globalAlpha = 1 - k; ctx.beginPath(); ctx.ellipse(410, 640 + k * 50, 8, 12, 0, 0, TAU); ctx.fillStyle = '#7cc7ff'; ctx.fill(); ctx.restore(); }
};
SCENES.clock = (t, p, b, gt) => {
  ctx.fillStyle = '#fbf1de'; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.globalAlpha = .5; for (let i = 0; i < 12; i++) { ctx.fillStyle = i % 2 ? '#f6e7cb' : '#fbf1de'; ctx.beginPath(); ctx.moveTo(360, 640); ctx.arc(360, 640, 900, i / 12 * TAU + gt * .2, (i + 1) / 12 * TAU + gt * .2); ctx.fill(); } ctx.restore();
  const [h0, m0] = p.from.split(':').map(Number), [h1, m1] = p.to.split(':').map(Number);
  const k = E.inout(t / Math.min(2.6, (b.end - b.start) * .8)); const mm = lerp(h0 * 60 + m0, h1 * 60 + m1, k);
  wallClock(360, 640, 230, Math.floor(mm / 60), mm % 60);
  text(String(Math.floor(mm / 60)).padStart(2, '0') + ':' + String(Math.floor(mm % 60)).padStart(2, '0'), 360, 950, { size: 90, fam: 'Bebas Neue', w: 400, color: '#e2483d', ls: 4 });
};
SCENES.split = (t, p, b, gt) => {
  const m = p.mode;
  // izquierda: a mano
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 360, H); ctx.clip();
  ctx.fillStyle = lin(0, 0, 0, H, [[0, '#f3e6cf'], [1, '#e4cfa9']]); ctx.fillRect(0, 0, 360, H);
  const late = m === 'manual' || m === 'result';
  const tl = late ? lerp(9 * 60 + 15, 12 * 60 + 40, E.inout(t / 3)) : 9 * 60 + 15;
  wallClock(180, 420, 70, Math.floor(tl / 60), tl % 60);
  you({ x: 180, y: 994, s: 1.75, pose: late && t > 2.4 || m === 'result' ? 'sitcollapse' : 'sitwrite', t: gt, expr: late ? 'tired' : 'worried', look: .4 });
  desk(30, 930, 300);
  for (let i = 0; i < 12; i++) fillRR(60 + Math.sin(i) * 6, 922 - i * 9, 110, 10, 2, '#fff');
  if (late && (t > 2.4 || m === 'result')) text('Zz', 250, 700 - (gt * 20 % 30), { size: 44, fam: 'Bebas Neue', w: 400, color: '#8a8794' });
  ctx.restore();
  // derecha: con IA
  ctx.save(); ctx.beginPath(); ctx.rect(360, 0, 360, H); ctx.clip();
  ctx.fillStyle = lin(0, 0, 0, H, [[0, '#ebe7ff'], [1, '#d4ccff']]); ctx.fillRect(360, 0, 360, H);
  const done = m === 'result'; wallClock(540, 420, 70, done ? 10 : 9, done ? 5 : 15);
  you({ x: 540, y: 994, s: 1.75, pose: done ? 'sitrelax' : 'sittype', t: gt, expr: done ? 'happy' : 'neutral', look: .4 });
  desk(390, 930, 300); laptopBack(620, 930, .6, 'rgba(120,100,255,.7)');
  if (done) { circle(640, 620, 34, '#2fbf71'); ctx.strokeStyle = '#fff'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(626, 620); ctx.lineTo(637, 632); ctx.lineTo(656, 608); ctx.stroke(); }
  ctx.restore();
  if (m === 'manual') { ctx.fillStyle = 'rgba(30,25,60,.45)'; ctx.fillRect(360, 0, 360, H); }
  seg([[360, 0], [360, H]], 6, '#1a191d');
  const pill = (s, x, c) => { const w = measure(s, 30, 'Bebas Neue', 400, 2) + 44; fillRR(x - w / 2, 250, w, 50, 25, c); text(s, x, 277, { size: 30, fam: 'Bebas Neue', w: 400, color: '#fff', ls: 2 }); };
  pill('A MANO', 180, '#e2483d'); pill('CON IA', 540, '#6a5cff');
  if (late) text(m === 'result' ? '12:40' : '', 180, 560, { size: 50, fam: 'Bebas Neue', w: 400, color: '#e2483d' });
  if (done) text('10:05', 540, 560, { size: 50, fam: 'Bebas Neue', w: 400, color: '#2fbf71' });
};
SCENES.laptop = (t, p, b, gt) => {
  ctx.fillStyle = lin(0, 0, 0, H, [[0, '#2a2560'], [1, '#141230']]); ctx.fillRect(0, 0, W, H);
  glow(360, 620, 600, 'rgba(120,100,255,.35)');
  fillRR(40, 250, 640, 690, 30, '#1a191d'); fillRR(60, 270, 600, 640, 18, '#f7f6fb');
  ctx.beginPath(); ctx.moveTo(0, 940); ctx.lineTo(W, 940); ctx.lineTo(W + 40, 1010); ctx.lineTo(-40, 1010); ctx.fillStyle = '#c9ccd3'; ctx.fill();
  ctx.save(); rr(60, 270, 600, 640, 18); ctx.clip();
  // barra superior
  ctx.fillStyle = '#ece9f7'; ctx.fillRect(60, 270, 600, 54); [['#ff5f57', 90], ['#febc2e', 114], ['#28c840', 138]].forEach(([c, x]) => circle(x, 297, 7, c));
  if (p.rec) {
    text('Reunión semanal · grabación', 360, 298, { size: 18, w: 700, color: '#5b5870' });
    fillRR(90, 350, 540, 300, 14, '#1f1f24'); for (let i = 0; i < 6; i++) { const x = 110 + (i % 3) * 172, y = 368 + Math.floor(i / 3) * 136; fillRR(x, y, 160, 124, 10, ['#3b3f5c', '#4b3b5c', '#2f4d4a', '#5c4a3b', '#3b4f5c', '#4a3b3b'][i]); circle(x + 80, y + 52, 26, '#f4f4f6'); }
    const rb = Math.floor(gt * 2) % 2; circle(116, 680, 10, rb ? '#e2483d' : '#7a2620'); text('REC 29:41', 136, 681, { size: 22, w: 900, color: '#e2483d', align: 'left' });
    for (let i = 0; i < 46; i++) { const hgt = 10 + Math.abs(Math.sin(i * .7 + gt * 6)) * 50 * hash(i); fillRR(100 + i * 11.5, 760 - hgt / 2, 6, hgt, 3, '#6a5cff'); }
    fillRR(90, 820, 540, 62, 31, '#fff'); ctx.lineWidth = 2; ctx.strokeStyle = '#d6d2ea'; ctx.stroke();
    text('Dame decisiones, responsables y fechas', 116, 852, { size: 21, w: 600, color: '#1a191d', align: 'left' });
  } else {
    const st = p.step;
    ['PASO 1', 'PASO 2', 'PASO 3'].forEach((s, i) => { const on = i + 1 <= st; fillRR(160 + i * 140, 284, 120, 28, 14, on ? (i + 1 === st ? '#6a5cff' : '#bdb6ff') : '#dcd9e8'); text(s, 220 + i * 140, 299, { size: 14, w: 900, color: '#fff', ls: 2 }); });
    // tus mensajes
    fillRR(300, 350, 330, 70, 22, '#6a5cff');
    text(st === 1 ? '5 cifras clave, porfa' : st === 2 ? 'Busca lo que no cuadra' : 'Redáctalo, lo reviso yo', 465, 386, { size: 22, w: 700, color: '#fff' });
    if (st === 1) {
      ['Informe_Q3.pdf', 'ventas.xlsx', 'costes.xlsx'].forEach((f, i) => { const a = E.back(cl((t - .2 - i * .25) / .3)); ctx.save(); ctx.translate(200 + i * 0, 470 + i * 64); ctx.scale(a, a); fillRR(-110, -26, 300, 52, 12, '#fff'); ctx.lineWidth = 2; ctx.strokeStyle = '#d6d2ea'; ctx.stroke(); fillRR(-98, -16, 26, 32, 4, i ? '#21a366' : '#e2483d'); text(f, -60, 1, { size: 20, w: 700, color: '#1a191d', align: 'left' }); ctx.restore(); });
      const k = cl((t - 1.4) / 1.2); ['Ingresos', 'Margen', 'Clientes', 'Coste/cliente', 'Churn'].forEach((s, i) => { const a = cl(k * 5 - i); text(s, 100, 700 + i * 40, { size: 20, w: 700, color: `rgba(26,25,29,${a})`, align: 'left' }); fillRR(260, 690 + i * 40, 320 * a * (.4 + hash(i) * .6), 18, 9, '#bdb6ff'); });
    } else if (st === 2) {
      fillRR(90, 450, 540, 300, 14, '#fff'); ctx.lineWidth = 2; ctx.strokeStyle = '#e6e3f2'; ctx.stroke();
      const pts = [...Array(12)].map((_, i) => [120 + i * 44, 680 - (60 + Math.sin(i * .8) * 40 + i * 10 + (i === 7 ? 120 : 0) - (i === 4 ? 70 : 0))]);
      ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.lineWidth = 5; ctx.strokeStyle = '#6a5cff'; ctx.stroke();
      [4, 7].forEach((i, k) => { const a = E.back(cl((t - .8 - k * .6) / .3)); const [x, y] = pts[i]; ctx.save(); ctx.translate(x, y); ctx.scale(a, a); ctx.lineWidth = 4; ctx.strokeStyle = '#e2483d'; ctx.beginPath(); ctx.arc(0, 0, 22, 0, TAU); ctx.stroke(); fillRR(-60, 30, 120, 34, 17, '#e2483d'); text('NO CUADRA', 0, 47, { size: 15, w: 900, color: '#fff', ls: 1 }); ctx.restore(); });
      text('2 anomalías encontradas', 360, 800, { size: 24, w: 800, color: '#1a191d' });
    } else {
      fillRR(90, 450, 540, 380, 14, '#fff'); ctx.lineWidth = 2; ctx.strokeStyle = '#e6e3f2'; ctx.stroke();
      text('INFORME Q3 — BORRADOR', 120, 490, { size: 22, w: 900, color: '#1a191d', align: 'left', ls: 1 });
      for (let i = 0; i < 6; i++) fillRR(120, 530 + i * 34, 480 * (.6 + hash(i + 2) * .4), 14, 7, '#e6e3f2');
      ['Cifras verificadas', 'Anomalías explicadas', 'Revisado por ti'].forEach((s, i) => { const a = cl((t - .4 - i * .5) / .3); circle(134, 760 + i * 0 + 0, 0, '#fff'); if (a > 0) { fillRR(120 + i * 170, 744, 160, 40, 20, `rgba(47,191,113,${a})`); text('✓ ' + s.split(' ')[0], 200 + i * 170, 765, { size: 17, w: 900, color: '#fff' }); } });
    }
  }
  ctx.restore();
  if (p.blur) { ctx.fillStyle = 'rgba(20,18,48,.55)'; ctx.fillRect(0, 0, W, H); }
};
const PEOPLE = ['Marta', 'Jorge', 'Lucía', 'Iván', 'Carla', 'Dani', 'Sofía', 'TÚ', 'Álex', 'Nerea', 'Pablo', 'Rocío'];
const TILE_BG = ['#3b3f5c', '#4b3b5c', '#2f4d4a', '#5c4a3b', '#3b4f5c', '#4a3b3b', '#3f5c3b', '#222', '#5c3b52', '#3b5c58', '#4d4d2f', '#2f3b4d'];
SCENES.meeting = (t, p, b, gt) => {
  ctx.fillStyle = '#16161a'; ctx.fillRect(0, 0, W, H);
  fillRR(30, 225, 660, 50, 25, '#24242a'); circle(60, 250, 8, '#e2483d'); text('Reunión semanal (sin agenda)', 80, 251, { size: 20, w: 700, color: '#e9e9ee', align: 'left' }); text('12 personas', 670, 251, { size: 16, w: 700, color: '#8a8794', align: 'right' });
  let gx = 30, gy = 295, tw = 212, th = 175, gap = 12; const share = p.share;
  if (share) {
    fillRR(30, 295, 660, 420, 16, '#fff'); text('PLAN_Q4_v27_FINAL_final(2).pptx', 360, 330, { size: 20, w: 800, color: '#1a191d' });
    [140, 210, 120, 260, 300].forEach((h, i) => fillRR(110 + i * 105, 680 - h, 70, h, 8, i === 4 ? '#ff7a1a' : '#c9c4ea'));
    text('(diapositiva 4 de 61)', 360, 700, { size: 16, w: 700, color: '#8a8794' });
    gy = 730; tw = 100; th = 90; gap = 10;
  }
  const cols = share ? 6 : 3;
  for (let i = 0; i < 12; i++) {
    const x = gx + (i % cols) * (tw + gap), y = gy + Math.floor(i / cols) * (th + gap);
    ctx.save(); rr(x, y, tw, th, 14); ctx.clip(); ctx.fillStyle = TILE_BG[i]; ctx.fillRect(x, y, tw, th);
    const me = i === 7;
    if (me && p.camoff) { circle(x + tw / 2, y + th / 2 - 8, th * .22, '#6a5cff'); text('TÚ', x + tw / 2, y + th / 2 - 7, { size: th * .16, w: 900, color: '#fff' }); }
    else {
      const sc = th / 175 * 1.9; const expr = p.groan ? 'tired' : i === 4 && p.speak ? 'smirk' : ['neutral', 'tired', 'neutral', 'worried'][i % 4];
      stick({ x: x + tw / 2 - 6 * sc, y: y + th + 62 * sc, s: sc, pose: 'stand', t: gt + i, expr, look: (i % 3) - 1, acc: me ? ['lanyard', 'tie'] : i % 3 === 0 ? ['glasses'] : i % 3 === 1 ? ['hair'] : [], hair: ['#3b2416', '#7a4a2a', '#1a191d'][i % 3], body: '#f4f4f6' });
    }
    ctx.restore();
    const speaking = (p.speak === i) || (p.mic && me);
    if (speaking) { ctx.lineWidth = 4; ctx.strokeStyle = me ? '#e2483d' : '#2fbf71'; rr(x, y, tw, th, 14); ctx.stroke(); }
    if (!share) { fillRR(x + 8, y + th - 30, measure(PEOPLE[i], 15, 'Montserrat', 700) + 16, 22, 11, 'rgba(0,0,0,.55)'); text(PEOPLE[i], x + 16, y + th - 19, { size: 15, w: 700, color: '#fff', align: 'left' }); }
    if (me && p.mic) { const s = 1 + Math.sin(gt * 12) * .12; ctx.save(); ctx.translate(x + tw - 30, y + 30); ctx.scale(s, s); circle(0, 0, 18, '#e2483d'); fillRR(-5, -10, 10, 16, 5, '#fff'); ctx.restore(); }
  }
  if (p.mic) { const a = cl((t - .3) / .2); ctx.save(); ctx.globalAlpha = a; ctx.translate(410, 630); ctx.rotate(-.12); text('*CRUNCH CRUNCH*', 0, 0, { size: 40, fam: 'Bebas Neue', w: 400, color: '#ffcf33', stroke: '#1a191d', sw: 8, ls: 2 }); ctx.restore(); }
  if (p.groan) { const a = cl((t - .4) / .3); ctx.save(); ctx.globalAlpha = a; fillRR(250, 470, 230, 54, 27, '#fff'); text('¿Alguna duda?', 365, 498, { size: 24, w: 800, color: '#1a191d' }); ctx.restore(); }
  // barra inferior
  fillRR(170, 1180, 380, 64, 32, '#24242a'); [['#3a3a42', 230], ['#3a3a42', 310], ['#3a3a42', 390], ['#e2483d', 480]].forEach(([c, x]) => circle(x, 1212, 22, c));
};
