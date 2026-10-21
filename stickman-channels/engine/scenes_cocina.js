// «Sticky tiene 10 segundos» · ep. 2: la sartén se prende
const FL = 900, CT = 730, PX = 530, PY = 712; // suelo, encimera, sartén

function kitchenBg(gt, p) {
  ctx.fillStyle = '#f3ead8'; ctx.fillRect(-60, -60, W + 120, FL + 60);
  // azulejos detrás de la encimera
  ctx.fillStyle = '#e4f1f2'; ctx.fillRect(-60, 420, W + 120, CT - 420);
  ctx.strokeStyle = 'rgba(0,0,0,.08)'; ctx.lineWidth = 3; for (let x = -60; x < W + 60; x += 60) { ctx.beginPath(); ctx.moveTo(x, 420); ctx.lineTo(x, CT); ctx.stroke(); } for (let y = 420; y < CT; y += 60) { ctx.beginPath(); ctx.moveTo(-60, y); ctx.lineTo(W + 60, y); ctx.stroke(); }
  // ventana
  fillRR(70, 460, 190, 170, 10, '#9fd8ff'); ctx.lineWidth = 8; ctx.strokeStyle = '#111'; rr(70, 460, 190, 170, 10); ctx.stroke(); seg([[165, 460], [165, 630]], 6, '#111'); seg([[70, 545], [260, 545]], 6, '#111');
  // muebles altos y campana
  for (const [x, w] of [[30, 180], [215, 180], [655, 120]]) { fillRR(x, 190, w, 200, 8, '#c98b4f'); ctx.lineWidth = 7; ctx.strokeStyle = '#111'; rr(x, 190, w, 200, 8); ctx.stroke(); fillRR(x + w / 2 - 30, 360, 60, 10, 5, '#111'); }
  ctx.beginPath(); ctx.moveTo(430, 190); ctx.lineTo(630, 190); ctx.lineTo(630, 330); ctx.lineTo(660, 420); ctx.lineTo(400, 420); ctx.lineTo(430, 330); ctx.closePath(); ctx.fillStyle = '#b9c2cc'; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = '#111'; ctx.stroke();
  if (p.scorch) { ctx.save(); ctx.globalAlpha = .85; ctx.fillStyle = '#1d1d22'; for (let i = 0; i < 12; i++) circle(120 + i * 50 + Math.sin(i * 3) * 20, 120 + hash(i) * 120, 70 + hash(i + 2) * 50, '#1d1d22'); ctx.restore(); }
  // encimera y muebles bajos
  fillRR(-60, CT, W + 120, 26, 0, '#e8e8ea'); ctx.lineWidth = 7; ctx.strokeStyle = '#111'; rr(-60, CT, W + 120, 26, 0); ctx.stroke();
  fillRR(-60, CT + 26, W + 120, FL - CT - 26, 0, '#d9a36a'); ctx.strokeStyle = '#111'; rr(-60, CT + 26, W + 120, FL - CT - 26, 0); ctx.stroke();
  for (const x of [0, 240, 480]) { ctx.lineWidth = 5; rr(x + 10, CT + 44, 220, FL - CT - 62, 8); ctx.stroke(); fillRR(x + 100, CT + 60, 40, 9, 4, '#111'); }
  // vitro
  fillRR(440, CT - 6, 190, 10, 4, '#111');
  // suelo
  ctx.fillStyle = '#7d8794'; ctx.fillRect(-60, FL, W + 120, H); for (let x = -60; x < W + 60; x += 90) seg([[x, FL], [x - 120, H + 60]], 3, 'rgba(0,0,0,.18)');
}
function pan(x, y, fire, gt, o = {}) {
  ctx.save(); ctx.translate(x, y); if (o.flip) ctx.scale(-1, 1); ctx.lineJoin = 'round';
  seg([[-60, 6], [-150, 0]], 16, '#111'); seg([[-60, 6], [-150, 0]], 9, '#3a3a40');
  ctx.beginPath(); ctx.moveTo(-70, -6); ctx.lineTo(70, -6); ctx.lineTo(58, 18); ctx.lineTo(-58, 18); ctx.closePath(); ctx.fillStyle = '#2c2c32'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = '#111'; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -6, 70, 9, 0, 0, TAU); ctx.fillStyle = o.oil === false ? '#2c2c32' : '#e0a21f'; ctx.fill(); ctx.stroke();
  if (o.fries) for (let i = 0; i < 7; i++) { ctx.save(); ctx.translate(-48 + i * 16, -10); ctx.rotate((hash(i) - .5) * .9); fillRR(-4, -14, 8, 26, 3, o.burnt ? '#2a1a10' : '#ffd35a'); ctx.lineWidth = 2.5; ctx.strokeStyle = '#111'; ctx.stroke(); ctx.restore(); }
  if (o.bub) for (let i = 0; i < 6; i++) { const k = (gt * 2 + hash(i)) % 1; circle(-50 + hash(i + 7) * 100, -10 - k * 14, 4 * (1 - k), 'rgba(255,255,255,.9)'); }
  ctx.restore();
  if (fire > 0) { glow(x, y - 60 - fire * 120, 120 + fire * 260, `rgba(255,150,40,${.35 + fire * .25})`); flame(x, y - 8, 110 + fire * 150, 50 + fire * 320, gt, 3); }
  if (o.lid != null) { // tapa: o.lid = [lx, ly] posición del centro
    const [lx, ly] = o.lid; ctx.save(); ctx.translate(lx, ly); ctx.beginPath(); ctx.ellipse(0, 0, 78, 34, 0, PI, TAU); ctx.closePath(); ctx.fillStyle = '#c9d1d9'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = '#111'; ctx.stroke(); fillRR(-14, -46, 28, 14, 6, '#111'); ctx.restore();
  }
}
function smokeWisps(x, y, a, gt, dark = 'rgba(70,70,78,') {
  for (let i = 0; i < 8; i++) { const k = (gt * .5 + i / 8) % 1; circle(x + Math.sin(gt * 2 + i) * 30 * k, y - k * 300, 18 + k * 50, dark + (a * (1 - k) * .7) + ')'); }
}
function dangerFx(gt, a = 1) {
  const ph = (gt * 2) % 1, pulse = Math.max(Math.exp(-ph * 10), .6 * Math.exp(-Math.max(0, ph - .15) * 10) * (ph > .15 ? 1 : 0));
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = rad(W / 2, H / 2, H * .25, H * .75, [[0, 'rgba(255,0,40,0)'], [1, `rgba(255,0,40,${.28 + .3 * pulse})`]]); ctx.fillRect(-60, -60, W + 120, H + 120); ctx.restore();
}
function glassAt(x, y, tilt) { ctx.save(); ctx.translate(x, y); ctx.rotate(tilt); ctx.beginPath(); ctx.moveTo(-14, -22); ctx.lineTo(14, -22); ctx.lineTo(10, 20); ctx.lineTo(-10, 20); ctx.closePath(); ctx.fillStyle = 'rgba(190,230,255,.85)'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = '#111'; ctx.stroke(); ctx.restore(); }
function fireball(t) {
  const k = cl(t / .7);
  glow(PX, 300, 900 * E.out(k), 'rgba(255,170,60,.7)');
  for (let i = 0; i < 46; i++) {
    const a = hash(i) * TAU, sp = hash(i + 9), d = E.out(cl((t - sp * .15) / .6));
    const tx = PX + Math.cos(a) * (200 + sp * 420), ty = 140 + Math.sin(a) * 130 * sp + (i % 5) * 30;
    const x = lerp(PX, tx, d), y = lerp(PY - 40, ty, d), r = (40 + 90 * d) * (1 + sp * .5);
    const col = ['#fff1a8', '#ffb020', '#ff6a1a', '#e5383b', '#ffd35a'][i % 5];
    circle(x, y, r, col); if (i % 7 === 0 && d > .5) circle(x, y - r * .6, r * .5, `rgba(50,40,40,${.55 * d})`);
  }
  for (let i = 0; i < 10; i++) { const d = E.out(k); circle(PX + (hash(i + 30) - .5) * 160, lerp(PY, 200, d) + i * 40 * d, 60 + 40 * d, i % 2 ? '#ffd35a' : '#fff6cf'); }
}
function floorFire(x0, x1, a, gt) { for (let x = x0; x < x1; x += 50) flame(x, FL + 4, 60 * a, (60 + 40 * noise1(x * .1 + gt)) * a, gt, x); }

SCENES.kitchen = (t, p, b, gt) => {
  const bd = Math.max(.5, b.end - b.start), g = p.freeze ? b.start + .15 : gt;
  kitchenBg(g, p);
  let fire = p.f0 != null ? lerp(p.f0, p.f1 ?? p.f0, E.inout(cl(t / bd))) : (p.fire || 0);
  const charred = p.after || (p.fireball && t > .18);
  const body = charred ? '#3b3b40' : '#ffffff';
  // la sartén, salvo cuando Sticky la lleva en la mano
  let lid = null;
  if (p.lid) { const k = E.inout(cl((t - .35) / .7)); lid = [lerp(410, PX, k), lerp(600, PY - 8, k)]; if (k >= 1) fire *= 1 - E.out(cl((t - 1.05) / .35)); }
  if (p.lidOn) { lid = [PX, PY - 8]; fire = 0; }
  if (p.mirror) { const ig = p.ignite ? (p.igAt ?? b.vdur ?? bd - .6) : 99; smokeWisps(PX, PY - 20, cl(t / bd) + .2, g, p.ignite && t > ig ? 'rgba(40,40,46,' : 'rgba(110,110,118,'); if (t > ig) fire = .5 * E.out(cl((t - ig) / .2)); }
  if (!p.carry && !p.spill) pan(PX, PY, p.fireball && t < .9 ? 0 : fire, g, { fries: p.fries || p.mirror, bub: p.fries, burnt: p.burnt, lid });
  if (p.lid && t > 1.1) { const k = cl((t - 1.1) / 1.2); circle(PX, PY - 60 - k * 200, 40 + k * 90, `rgba(120,120,128,${.6 * (1 - k)})`); }
  if (p.lidOn) smokeWisps(PX, PY - 40, .25, g, 'rgba(230,230,235,');
  if (p.cab) { const a = p.cab; for (const [x, y] of [[440, 420], [520, 420], [600, 420], [300, 392], [160, 392]]) flame(x, y, 90 * a, (110 + 30 * noise1(x + g)) * a, g, x); smokeLayer(220, .75 * a, g); }
  // Sticky
  const S0 = { s: 2.0, t: g, acc: ['cap', 'scarf'], body, capCol: charred ? '#2a2a2e' : undefined };
  if (p.fry) { const r = stick({ ...S0, x: 330, y: FL, pose: 'stand', face: 1, expr: 'happy', over: { ra1: 1.35, ra2: .35, la1: -.3, la2: .5, bob: Math.abs(Math.sin(g * 6)) * -6, head: Math.sin(g * 6) * .15 } }); const hx = 330 + r.hand[0] * 2, hy = FL + r.hand[1] * 2; seg([[hx, hy], [PX - 20, PY - 20]], 7, '#111'); fillRR(PX - 40, PY - 34, 40, 20, 4, '#111'); }
  if (p.mirror) {
    const ig = p.ignite ? (p.igAt ?? b.vdur ?? bd - .6) : 99, turn = p.ignite && t > ig - .9;
    ctx.save(); ctx.beginPath(); ctx.ellipse(60, 560, 48, 70, 0, 0, TAU); ctx.fillStyle = '#d9f2ff'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = '#111'; ctx.stroke(); ctx.restore();
    stick({ ...S0, x: 170, y: FL, pose: 'stand', face: turn ? 1 : -1, expr: turn ? (t > ig ? 'scared' : 'worried') : 'smirk', over: turn ? {} : { ra1: 2.9 + Math.sin(g * 5) * .2, ra2: 1.6, head: -.1 } });
    if (t > ig) { const a = E.back(cl((t - ig) / .25)); ctx.save(); ctx.translate(250, 520); ctx.scale(a, a); text('!!', 0, 0, { size: 110, fam: 'Anton', w: 400, color: '#ff3b5c', stroke: '#111', sw: 14 }); ctx.restore(); }
  }
  if (p.panic) { stick({ ...S0, x: 300 + Math.sin(g * 30) * 4, y: FL, pose: 'scared', face: 1, expr: 'scared' }); const a = .6 + .4 * Math.sin(g * 12); text('!!', 190, 520, { size: 100, fam: 'Anton', w: 400, color: `rgba(255,59,92,${a})`, stroke: '#111', sw: 12 }); }
  if (p.blow) {
    const r = stick({ ...S0, x: 380, y: FL, pose: 'stand', face: 1, expr: 'neutral', over: { tor: .45, head: .1, ra1: .4, ra2: .3, la1: .2, la2: .3, lt: -.3, rt: .25 } });
    const hx = 380 + r.head[0] * 2 + 30, hy = FL + r.head[1] * 2 + 16; circle(hx - 4, hy, 12, '#111');
    for (let i = 0; i < 4; i++) { const k = (g * 3 + i / 4) % 1; seg([[hx + 20 + k * 90, hy - 20 + i * 14], [hx + 60 + k * 90, hy - 20 + i * 14]], 5, `rgba(120,170,220,${1 - k})`); }
  }
  if (p.carry || p.spill) {
    const k = p.spill ? 1 : E.inout(cl(t / bd)), x = lerp(420, 170, k);
    const r = stick({ ...S0, x, y: FL, pose: p.spill ? 'scared' : 'carryrun', t: g * 1.3, face: -1, expr: 'scared' });
    const hx = x - r.hand[0] * 2, hy = FL + r.hand[1] * 2;
    pan(hx - 130, hy + 4, p.spill ? .55 : .7, g, { flip: 1 });
    for (let i = 0; i < 6; i++) { const q = (g * 2 + i / 6) % 1; circle(hx - 130 + (i - 3) * 14, hy + 20 + q * (FL - hy - 20), 6, '#ffb020'); }
    floorFire(p.spill ? 140 : x + 40, p.spill ? 560 : 520, p.spill ? 1 : k, g);
  }
  if (p.throw || p.fireball) {
    const sx = p.fireball ? lerp(340, 190, E.out(cl(t / .35))) : 340, rot = p.fireball ? -.35 * E.out(cl(t / .35)) : 0;
    const r = stick({ ...S0, x: sx, y: FL, pose: p.fireball ? 'scared' : 'stand', face: 1, expr: 'scared', rot, over: p.fireball ? {} : { ra1: 1.95, ra2: .25, la1: 1.8, la2: .35, tor: .2 } });
    if (p.throw) { const hx = sx + r.hand[0] * 2, hy = FL + r.hand[1] * 2; glassAt(hx + 10, hy - 6, 1.1);
      const q = p.freeze ? .55 : cl(t / .5); for (let i = 0; i < 9; i++) { const u = cl(q - i * .04); if (u <= 0) continue; const x = lerp(hx + 24, PX, u), y = hy - 10 - Math.sin(u * PI) * 70 + u * (PY - hy); circle(x, y, 11 - i * .6, '#4fb3ff'); ctx.lineWidth = 2.5; ctx.strokeStyle = '#1d5fa8'; ctx.stroke(); } }
  }
  if (p.after) {
    stick({ ...S0, x: 230, y: FL, pose: 'stand', face: 1, expr: 'tired', over: { la1: -.2, ra1: .2 } });
    smokeWisps(240, 600, .7, g, 'rgba(60,60,66,');
    if (t > .5 && p.cough) { const a = E.back(cl((t - .5) / .3)); ctx.save(); ctx.translate(120, 520); ctx.scale(a, a); text('*COF*', 0, 0, { size: 54, fam: 'Anton', w: 400, color: '#fff', stroke: '#111', sw: 10 }); ctx.restore(); }
  }
  if (p.knob || p.lid || p.wait) {
    const pose = p.wait ? 'cross' : 'point', x = p.wait ? 250 : 320;
    stick({ ...S0, x, y: FL, pose, face: 1, expr: 'neutral', over: p.knob ? { ra1: 1.1, ra2: .2 } : p.lid ? { ra1: 1.6, ra2: .1 } : {} });
  }
  // mando de la vitro
  { const on = !(p.knob && t > .5) && !p.lid && !p.lidOn && !p.wait; ctx.save(); ctx.translate(470, CT + 13); circle(0, 0, 13, '#111'); circle(0, 0, 9, on ? '#ff3b5c' : '#5a5a60'); ctx.restore();
    if (p.knob) { const a = E.back(cl((t - .5) / .3)); if (a > 0) { ctx.save(); ctx.translate(470, CT + 70); ctx.scale(a, a); fillRR(-60, -24, 120, 48, 24, '#111'); text('OFF', 0, 2, { size: 34, fam: 'Anton', w: 400, color: '#7ef0a8', ls: 2 }); ctx.restore(); } } }
  if (p.exit) {
    fillRR(-20, 470, 170, FL - 470, 0, '#3d2a1c'); ctx.lineWidth = 8; ctx.strokeStyle = '#111'; rr(-20, 470, 170, FL - 470, 0); ctx.stroke();
    const k = E.inout(cl((t - .2) / 1.2)); stick({ ...S0, x: lerp(300, 70, k), y: FL, pose: k < 1 ? 'walk' : 'phone', face: -1, expr: 'worried', acc: ['cap', 'scarf', 'phone'] });
    if (k >= 1) { const a = E.back(cl((t - 1.4) / .3)); ctx.save(); ctx.translate(230, 560); ctx.scale(a, a); fillRR(-80, -40, 160, 80, 24, '#e5383b'); text('112', 0, 3, { size: 56, fam: 'Anton', w: 400, color: '#fff', ls: 3 }); ctx.restore(); }
  }
  if (p.danger) dangerFx(gt, p.danger);
  if (p.freeze) { ctx.save(); ctx.fillStyle = 'rgba(20,40,80,.25)'; ctx.fillRect(-60, -60, W + 120, H + 120); ctx.restore();
    const pu = .5 + .5 * Math.sin(gt * 8); ctx.lineWidth = 10; ctx.strokeStyle = `rgba(255,255,255,${.5 + .5 * pu})`; ctx.beginPath(); ctx.arc(PX - 70, PY - 70, 120, 0, TAU); ctx.stroke();
    text('II', 640, 230, { size: 60, fam: 'Anton', w: 400, color: '#fff', stroke: '#111', sw: 8 }); }
  if (p.fireball) { fireball(t); if (t < .14) { ctx.fillStyle = `rgba(255,255,240,${1 - t / .14})`; ctx.fillRect(-60, -60, W + 120, H + 120); } }
  if (p.flash && t < .12) { ctx.fillStyle = `rgba(255,255,255,${(1 - t / .12) * .9})`; ctx.fillRect(-60, -60, W + 120, H + 120); }
  if (p.rewind) vhs(gt, p.rlabel || 'REBOBINA');
  if (p.stamp) stamp(p.stamp, p.label || '', t);
};

// ---------- por qué el agua lo empeora ----------
SCENES.steam = (t, p, b, gt) => {
  const bd = Math.max(1, b.end - b.start), u = t / bd * 5; // tiempos escritos para 5 s
  ctx.fillStyle = '#14141a'; ctx.fillRect(-60, -60, W + 120, H + 120);
  const cx = W / 2, cy = 590, R = 300;
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.clip();
  ctx.fillStyle = '#2a2f3a'; ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
  // sartén en corte
  const oilTop = cy + 40;
  ctx.fillStyle = '#e0a21f'; ctx.fillRect(cx - R, oilTop, R * 2, 140); ctx.fillStyle = '#2c2c32'; ctx.fillRect(cx - R, oilTop + 140, R * 2, 200);
  if (u < 3.3) flame(cx, oilTop, 420, 160 + 30 * Math.sin(gt * 3), gt, 1);
  // la gota de agua cae y se hunde
  const dy = u < .9 ? lerp(cy - R, oilTop - 10, E.inout(u / .9)) : u < 1.8 ? lerp(oilTop - 10, oilTop + 120, E.inout((u - .9) / .9)) : oilTop + 120;
  if (u < 2.2) { ctx.beginPath(); ctx.moveTo(cx, dy - 34); ctx.quadraticCurveTo(cx + 26, dy, cx + 22, dy + 10); ctx.arc(cx, dy + 10, 22, 0, PI); ctx.quadraticCurveTo(cx - 26, dy, cx, dy - 34); ctx.fillStyle = '#4fb3ff'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = '#fff'; ctx.stroke(); }
  // se convierte en vapor de golpe
  if (u > 2.2) { const k = E.out(cl((u - 2.2) / .5)); circle(cx, oilTop + 120 - k * 200, 22 + k * 260, `rgba(240,245,255,${.9 - .3 * k})`); }
  // y lanza el aceite ardiendo hacia arriba
  if (u > 2.6) { const k = cl((u - 2.6) / 1.2); for (let i = 0; i < 26; i++) { const a = -PI / 2 + (hash(i) - .5) * 1.8, v = 300 + hash(i + 5) * 500; const x = cx + Math.cos(a) * v * k, y = oilTop + Math.sin(a) * v * k + 300 * k * k; circle(x, y, 16 + hash(i) * 14, i % 2 ? '#ff6a1a' : '#ffd35a'); }
    glow(cx, cy - 100, 500 * k, 'rgba(255,140,40,.6)'); }
  ctx.restore();
  ctx.lineWidth = 12; ctx.strokeStyle = '#fff'; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();
  // rótulos
  const l1 = E.back(cl((u - .3) / .3)); if (l1 > 0) { ctx.save(); ctx.translate(170, cy - R + 20); ctx.scale(l1, l1); fillRR(-90, -34, 180, 68, 20, '#4fb3ff'); text('AGUA', 0, 3, { size: 46, fam: 'Anton', w: 400, color: '#111', ls: 2 }); ctx.restore(); }
  const l2 = E.back(cl((u - 1.0) / .3)); if (l2 > 0) { ctx.save(); ctx.translate(560, oilTop + 70); ctx.scale(l2, l2); fillRR(-100, -34, 200, 68, 20, '#e0a21f'); text('ACEITE', 0, 3, { size: 46, fam: 'Anton', w: 400, color: '#111', ls: 2 }); ctx.restore(); }
  const l3 = E.back(cl((u - 2.3) / .3)); if (l3 > 0) { ctx.save(); ctx.translate(cx, cy - 130); ctx.rotate(-.05); ctx.scale(l3, l3); fillRR(-230, -60, 460, 120, 26, '#fff'); text('VAPOR ×1.700', 0, 4, { size: 72, fam: 'Anton', w: 400, color: '#e5383b', ls: 2 }); ctx.restore(); }
  if (p.stamp) stamp(p.stamp, p.label || '', t);
};

// ---------- la cita llega ----------
SCENES.date = (t, p, b, gt) => {
  ctx.fillStyle = '#efe3cf'; ctx.fillRect(-60, -60, W + 120, H + 120);
  ctx.fillStyle = '#7d8794'; ctx.fillRect(-60, FL, W + 120, H);
  // puerta abierta
  fillRR(330, 300, 300, FL - 300, 0, '#8fd0ff'); ctx.lineWidth = 10; ctx.strokeStyle = '#111'; rr(330, 300, 300, FL - 300, 0); ctx.stroke();
  ctx.save(); ctx.beginPath(); ctx.moveTo(630, 300); ctx.lineTo(700, 270); ctx.lineTo(700, FL + 30); ctx.lineTo(630, FL); ctx.closePath(); ctx.fillStyle = '#c98b4f'; ctx.fill(); ctx.lineWidth = 8; ctx.stroke(); ctx.restore();
  // la cita, fuera
  stick({ x: 500, y: FL, s: 2.0, pose: t > 1.2 ? 'cross' : 'wave', t: gt, face: -1, expr: t > 1.6 ? 'happy' : 'neutral', acc: ['bun'], body: '#ffd1e3', hair: '#5a3220' });
  // Sticky con las patatas carbonizadas
  const r = sticky({ x: 230, y: FL, s: 2.0, pose: 'carry', t: gt, face: 1, expr: 'happy' });
  const hx = 230 + r.hand[0] * 2, hy = FL + r.hand[1] * 2;
  ctx.save(); ctx.translate(hx + 10, hy - 6); ctx.beginPath(); ctx.ellipse(0, 0, 70, 16, 0, 0, TAU); ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = '#111'; ctx.stroke();
  for (let i = 0; i < 6; i++) { ctx.save(); ctx.translate(-40 + i * 16, -10); ctx.rotate((hash(i) - .5) * .8); fillRR(-4, -14, 8, 24, 3, '#1c140e'); ctx.restore(); } ctx.restore();
  smokeWisps(hx + 10, hy - 30, .3, gt, 'rgba(80,80,86,');
  if (t < 1.2) { const a = E.back(cl(t / .3)); ctx.save(); ctx.translate(560, 220); ctx.scale(a, a); text('DING DONG', 0, 0, { size: 54, fam: 'Anton', w: 400, color: '#ffd400', stroke: '#111', sw: 10, ls: 2 }); ctx.restore(); }
};

// ---------- pregunta final ----------
SCENES.sincero = (t, p, b, gt) => {
  kitchenBg(gt, {}); pan(PX, PY, 0, gt, { lid: [PX, PY - 8] });
  ctx.fillStyle = 'rgba(10,10,16,.55)'; ctx.fillRect(-60, -60, W + 120, H + 120);
  const a = E.back(cl((t - .05) / .4)); ctx.save(); ctx.translate(W / 2, 360); ctx.scale(a, a); ctx.rotate(-.02);
  ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 30; fillRR(-310, -170, 620, 340, 40, '#fff'); ctx.shadowBlur = 0; ctx.lineWidth = 8; ctx.strokeStyle = '#111'; rr(-310, -170, 620, 340, 40); ctx.stroke();
  text('SÉ SINCERO', 0, -110, { size: 44, fam: 'Anton', w: 400, color: '#ff3b5c', ls: 4 });
  text('¿TÚ LE HABRÍAS', 0, -30, { size: 78, fam: 'Anton', w: 400, color: '#111', ls: 2 }); text('ECHADO AGUA?', 0, 62, { size: 78, fam: 'Anton', w: 400, color: '#111', ls: 2 }); ctx.restore();
  const opt = (lab, x, col, k) => { const s = E.back(cl((t - .6 - k * .15) / .3)); if (s <= 0) return; const pu = 1 + Math.sin(gt * 5 + k * 2) * .03; ctx.save(); ctx.translate(x, 640); ctx.scale(s * pu, s * pu); fillRR(-120, -50, 240, 100, 50, col); ctx.lineWidth = 6; ctx.strokeStyle = '#111'; rr(-120, -50, 240, 100, 50); ctx.stroke(); text(lab, 0, 4, { size: 60, fam: 'Anton', w: 400, color: '#111', ls: 3 }); ctx.restore(); };
  opt('SÍ', 210, '#4fb3ff', 0); opt('NO', 510, '#7ef0a8', 1);
  const s = E.back(cl((t - 1.1) / .3)), pu = 1 + Math.sin(gt * 6) * .04; if (s > 0) { ctx.save(); ctx.translate(W / 2, 780); ctx.scale(s * pu, s * pu); fillRR(-190, -38, 380, 76, 38, '#ff3b5c'); text('COMENTA', -20, 2, { size: 40, fam: 'Anton', w: 400, ls: 3 }); ctx.strokeStyle = '#fff'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(130, -14); ctx.lineTo(130, 16); ctx.moveTo(118, 4); ctx.lineTo(130, 17); ctx.lineTo(142, 4); ctx.stroke(); ctx.restore(); }
  sticky({ x: 600, y: 1240, s: 1.6, pose: 'point', t: gt, face: -1, expr: 'smirk', over: { ra1: 2.3, ra2: .2 } });
};
