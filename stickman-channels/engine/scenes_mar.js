// «Sticky tiene 60 segundos» · ep. 1: el flamenco hinchable se lo lleva mar adentro
const SEA_Y = 760; // línea de flotación de lo que está cerca de cámara

// flamenco hinchable de lado, cabeza a la derecha
function flamingo(x, y, s, rot, gt) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot || 0); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // cuello y cabeza
  ctx.beginPath(); ctx.moveTo(80, -14); ctx.bezierCurveTo(150, -40, 60, -110, 110, -170); ctx.lineWidth = 44; ctx.strokeStyle = '#111'; ctx.stroke(); ctx.lineWidth = 32; ctx.strokeStyle = '#ff7eb6'; ctx.stroke();
  circle(118, -180, 30, '#111'); circle(118, -180, 24, '#ff7eb6');
  ctx.beginPath(); ctx.moveTo(136, -192); ctx.lineTo(178, -172); ctx.lineTo(160, -150); ctx.lineTo(134, -168); ctx.closePath(); ctx.fillStyle = '#fff2f7'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = '#111'; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(166, -178); ctx.lineTo(178, -172); ctx.lineTo(160, -150); ctx.closePath(); ctx.fillStyle = '#111'; ctx.fill();
  circle(122, -186, 5, '#111');
  // aro
  ctx.beginPath(); ctx.ellipse(0, 0, 125, 38, 0, 0, TAU); ctx.fillStyle = '#ff7eb6'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = '#111'; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(-10, -12, 80, 10, 0, PI * 1.1, PI * 1.9); ctx.lineWidth = 7; ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.stroke();
  // cola
  ctx.beginPath(); ctx.moveTo(-118, -10); ctx.lineTo(-160, -40); ctx.lineTo(-150, 6); ctx.closePath(); ctx.fillStyle = '#ff7eb6'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = '#111'; ctx.stroke();
  ctx.restore();
}
// agua por delante: tapa la parte sumergida
function frontWater(y, gt, a = .8) {
  ctx.beginPath(); ctx.moveTo(-60, y); for (let x = -60; x <= W + 60; x += 20) ctx.lineTo(x, y + Math.sin(x * .025 + gt * 2.6) * 9); ctx.lineTo(W + 60, H + 60); ctx.lineTo(-60, H + 60); ctx.closePath();
  ctx.fillStyle = `rgba(22,128,214,${a})`; ctx.fill();
  ctx.beginPath(); for (let x = -60; x <= W + 60; x += 20) ctx.lineTo(x, y + Math.sin(x * .025 + gt * 2.6) * 9); ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.stroke();
}
function vhs(gt, label = 'REBOBINA') {
  for (let i = 0; i < 6; i++) { const y = hash(i + Math.floor(gt * 20)) * H; ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(-60, y, W + 120, 6 + hash(i) * 14); }
  ctx.save(); ctx.globalAlpha = .92; fillRR(W / 2 - 230, 520, 460, 120, 24, '#111'); ctx.fillStyle = '#ffd400';
  for (const ox of [-190, -150]) { ctx.beginPath(); ctx.moveTo(W / 2 + ox + 40, 555); ctx.lineTo(W / 2 + ox, 580); ctx.lineTo(W / 2 + ox + 40, 605); ctx.fill(); }
  text(label, W / 2 + 40, 582, { size: 64, fam: 'Anton', w: 400, color: '#ffd400', ls: 3 }); ctx.restore();
}
function pedalo(x, y, gt, aboard) {
  const bob = Math.sin(gt * 2.2) * 5; ctx.save(); ctx.translate(x, y + bob); ctx.lineJoin = 'round';
  // pasajeros detrás del casco
  stick({ x: -40, y: -40, s: 1.25, pose: 'sit', t: gt, face: 1, expr: 'happy', acc: ['flatcap', 'mustache'], body: '#f1e3c8' });
  stick({ x: 40, y: -40, s: 1.25, pose: 'wave', t: gt, face: 1, expr: 'happy', acc: ['bun', 'glasses'], body: '#f6d5e5', hair: '#cfcfd6', over: { hipH: 31, lt: 1.45, ls: 1.45, rt: 1.6, rs: 1.6 } });
  if (aboard) sticky({ x: 115, y: -40, s: 1.25, pose: 'sit', t: gt, face: 1, expr: 'happy', over: { la1: .5, la2: 1.9 } });
  // casco de cisne
  ctx.beginPath(); ctx.moveTo(-190, -40); ctx.lineTo(150, -40); ctx.quadraticCurveTo(200, -30, 190, 10); ctx.quadraticCurveTo(0, 40, -180, 10); ctx.quadraticCurveTo(-200, -10, -190, -40); ctx.closePath();
  ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = '#111'; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(150, -40); ctx.bezierCurveTo(230, -60, 150, -160, 205, -200); ctx.lineWidth = 34; ctx.strokeStyle = '#111'; ctx.stroke(); ctx.lineWidth = 24; ctx.strokeStyle = '#fff'; ctx.stroke();
  circle(212, -206, 22, '#111'); circle(212, -206, 17, '#fff'); ctx.beginPath(); ctx.moveTo(226, -212); ctx.lineTo(256, -200); ctx.lineTo(226, -196); ctx.closePath(); ctx.fillStyle = '#ff8a00'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = '#111'; ctx.stroke(); circle(214, -210, 3.5, '#111');
  fillRR(-150, -18, 300, 14, 7, '#3d8bff');
  ctx.restore();
}
function rescueBoat(x, y, gt) {
  const bob = Math.sin(gt * 2.6) * 5; ctx.save(); ctx.translate(x, y + bob);
  stick({ x: 0, y: -36, s: 1.25, pose: 'point', t: gt, face: 1, expr: 'neutral', body: '#ffd400', acc: ['cap'], capCol: '#e5383b', over: { hipH: 31, lt: 1.45, ls: 1.45, rt: 1.6, rs: 1.6 } });
  fillRR(-150, -46, 300, 62, 31, '#e5383b'); ctx.lineWidth = 8; ctx.strokeStyle = '#111'; rr(-150, -46, 300, 62, 31); ctx.stroke();
  text('SOCORRISMO', 0, -14, { size: 30, fam: 'Anton', w: 400, color: '#fff', ls: 2 });
  ctx.restore();
}

// ---------- mar abierto, de lado ----------
SCENES.sea = (t, p, b, gt) => {
  const bd = Math.max(1, b.end - b.start);
  sky('#5fbcf5', '#d6f1ff'); circle(570, 170, 56, '#fff6b0'); glow(570, 170, 200, 'rgba(255,245,170,.5)');
  const hz = 470;
  ctx.fillStyle = lin(0, hz, 0, H, [[0, '#4fb3ec'], [1, '#1663b8']]); ctx.fillRect(-60, hz, W + 120, H);
  // la playa, lejos, en el horizonte
  const far = p.far ?? 0, bw = lerp(150, 420, far), bh = lerp(14, 40, far);
  ctx.fillStyle = '#f4d58d'; ctx.beginPath(); ctx.moveTo(-60, hz); ctx.lineTo(bw, hz); ctx.quadraticCurveTo(bw + 20, hz + bh * .5, bw - 10, hz + bh); ctx.lineTo(-60, hz + bh); ctx.fill();
  for (let i = 0; i < 5; i++) { const ux = 10 + i * bw / 5, us = lerp(.35, 1, far); ctx.fillStyle = ['#e5383b', '#ffd400', '#3d8bff', '#22c55e', '#ff7eb6'][i]; ctx.beginPath(); ctx.moveTo(ux - 14 * us, hz + 2); ctx.quadraticCurveTo(ux, hz - 14 * us, ux + 14 * us, hz + 2); ctx.fill(); }
  // oleaje: rayas que se van hacia la derecha (la corriente)
  const drift = p.calm ? 20 : 70;
  for (let i = 0; i < 12; i++) { const y = hz + 30 + i * 62, sp = drift * (1 + i * .15); const x = ((i * 170 + gt * sp) % (W + 260)) - 130; seg([[x, y], [x + 60 + i * 6, y]], 5, 'rgba(255,255,255,.3)'); }
  if (p.arrows) for (let i = 0; i < 3; i++) { const x = ((gt * 160 + i * 260) % (W + 200)) - 100, y = 880 + i * 70; ctx.save(); ctx.globalAlpha = .85; ctx.fillStyle = '#ffd400'; ctx.beginPath(); ctx.moveTo(x, y - 20); ctx.lineTo(x + 46, y); ctx.lineTo(x, y + 20); ctx.lineTo(x + 12, y); ctx.closePath(); ctx.fill(); ctx.restore(); }
  const bob = Math.sin(gt * 2.2) * 6, rk = Math.sin(gt * 1.7) * .04;
  // lo que hay en el agua
  if (p.sleep) { flamingo(360, SEA_Y + bob, 1.1, rk, gt); sticky({ x: 360 - 10, y: SEA_Y - 36 + bob, s: 1.6, pose: 'lie', t: gt, face: 1, expr: 'closed', rot: -PI / 2 });
    for (let i = 0; i < 3; i++) { const k = ((gt * .7 + i / 3) % 1); text('Z', 300 + k * 60, 600 - k * 140, { size: 30 + k * 30, fam: 'Anton', w: 400, color: `rgba(17,17,17,${1 - k})` }); } }
  if (p.wake || p.hold || p.signal || p.rewind) {
    flamingo(360, SEA_Y + bob, 1.1, rk, gt);
    const pose = p.signal ? 'wave' : p.hold ? 'sit' : 'sitpanic';
    sticky({ x: 330, y: SEA_Y - 8 + bob, s: 1.6, pose, t: gt, face: -1, expr: p.hold || p.signal ? 'neutral' : 'scared', over: p.hold ? { la1: 1.2, la2: .9, ra1: 1.1, ra2: .9 } : p.signal ? { hipH: 31, lt: 1.45, ls: 1.45, rt: 1.6, rs: 1.6 } : {} });
    if (p.wake && !p.rewind) { const a = E.back(cl((t - .3) / .3)); ctx.save(); ctx.translate(200, 540); ctx.scale(a, a); text('?!', 0, 0, { size: 110, fam: 'Anton', w: 400, color: '#ffd400', stroke: '#111', sw: 14 }); ctx.restore(); }
    if (p.signal) { const a = E.back(cl((t - .4) / .3)); ctx.save(); ctx.translate(530, 430); ctx.scale(a, a); fillRR(-130, -46, 260, 92, 30, '#fff'); ctx.lineWidth = 6; ctx.strokeStyle = '#111'; rr(-130, -46, 260, 92, 30); ctx.stroke(); text('¡AYUDA!', 0, 3, { size: 52, fam: 'Anton', w: 400, color: '#e5383b', ls: 2 }); ctx.restore();
      const k = E.out(cl((t - 1.4) / 2.2)); if (k > 0) rescueBoat(lerp(-200, 170, k), SEA_Y + 20, gt); }
  }
  if (p.swimin) {
    // nada hacia la playa (izquierda) pero la corriente lo devuelve a la derecha
    const back = E.inout(cl(t / bd)); flamingo(lerp(560, 640, back), SEA_Y - 30 + bob, .8, rk, gt);
    const x = lerp(330, 400, back) + Math.sin(gt * 9) * 6;
    sticky({ x, y: SEA_Y + 34, s: 1.6, pose: 'swim', t: gt * 1.8, face: 1, expr: 'worried', rot: -PI / 2 + .15 });
    for (let i = 0; i < 4; i++) { const k = (gt * 3 + i / 4) % 1; circle(x - 150 + k * 40, SEA_Y + 20 - Math.sin(k * PI) * 40, 9, 'rgba(255,255,255,.85)'); }
    for (let i = 0; i < 2; i++) { const k = (gt * 1.5 + i * .5) % 1; ctx.save(); ctx.globalAlpha = 1 - k; ctx.fillStyle = '#9fe0ff'; ctx.beginPath(); ctx.ellipse(x - 140 + i * 30, SEA_Y - 70 + k * 30, 6, 10, 0, 0, TAU); ctx.fill(); ctx.restore(); }
  }
  if (p.letgo) {
    // el viento se lleva el flamenco; él se queda a flote como puede
    const k = E.inout(cl(t / bd)); flamingo(lerp(560, 760, k), SEA_Y - lerp(30, 120, k) + bob, lerp(.8, .45, k), rk + k * .3, gt);
    sticky({ x: 330, y: SEA_Y + 110, s: 1.6, pose: 'point', t: gt, face: 1, expr: 'scared', over: { ra1: 1.9, ra2: .1, la1: -.8, la2: .3 } });
  }
  if (p.panic) {
    const dip = Math.max(0, Math.sin(gt * 3)) * 30;
    sticky({ x: 340, y: SEA_Y + 120 + dip, s: 1.6, pose: 'scared', t: gt, face: 1, expr: 'scared', over: { la1: 2.6 + Math.sin(gt * 18) * .6, ra1: 2.6 - Math.sin(gt * 18) * .6 } });
    for (let i = 0; i < 10; i++) { const k = (gt * 2.4 + hash(i)) % 1, a = -PI / 2 + (hash(i + 3) - .5) * 2.4; circle(340 + Math.cos(a) * k * 170, SEA_Y + Math.sin(a) * k * 150 + k * k * 120, 10 * (1 - k) + 3, 'rgba(255,255,255,.9)'); }
  }
  if (p.pedalo) {
    const k = p.aboard ? 1 : E.out(cl(t / 1.8)); const px = lerp(-320, 330, k), on = p.aboard || k > .97;
    if (!on) sticky({ x: 470, y: SEA_Y + 120, s: 1.6, pose: 'scared', t: gt, face: -1, expr: k > .8 ? 'happy' : 'scared', over: { la1: 2.6, ra1: 2.6 } });
    pedalo(px, SEA_Y + 40, gt, on);
    if (!p.aboard) { const r = E.back(cl((t - .2) / .3)); if (r > 0 && t < 1.6) { ctx.save(); ctx.translate(px + 60, 420); ctx.scale(r, r); text('¡RING RING!', 0, 0, { size: 50, fam: 'Anton', w: 400, color: '#fff', stroke: '#111', sw: 10, ls: 2 }); ctx.restore(); } }
  }
  frontWater(SEA_Y + 28, gt, p.panic || p.letgo ? .72 : .8);
  if (p.rewind) vhs(gt);
  if (p.stamp) stamp(p.stamp, p.label || '', t);
};

// ---------- mapa desde arriba: corriente de resaca y salida en paralelo ----------
function topSticky(x, y, gt, ring) {
  if (ring) { ctx.lineWidth = 22; ctx.strokeStyle = '#111'; ctx.beginPath(); ctx.ellipse(x, y, 52, 40, 0, 0, TAU); ctx.stroke(); ctx.lineWidth = 15; ctx.strokeStyle = '#ff7eb6'; ctx.stroke(); }
  const sw = Math.sin(gt * 6) * 8;
  seg([[x - 26, y + sw], [x - 40, y - 26 + sw]], 12, '#111'); seg([[x + 26, y - sw], [x + 40, y - 26 - sw]], 12, '#111');
  circle(x, y, 24, '#111'); circle(x, y, 19, '#fff'); ctx.beginPath(); ctx.arc(x, y - 2, 19, PI, TAU); ctx.fillStyle = '#b8262b'; ctx.fill(); fillRR(x - 9, y - 30, 18, 12, 4, '#b8262b');
}
function arrowHead(x, y, ang, col, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(20, 0); ctx.lineTo(-12, -16); ctx.lineTo(-4, 0); ctx.lineTo(-12, 16); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
SCENES.ripmap = (t, p, b, gt) => {
  const bd = Math.max(1, b.end - b.start);
  ctx.fillStyle = lin(0, 0, 0, 900, [[0, '#1663b8'], [1, '#4fc0ee']]); ctx.fillRect(-60, -60, W + 120, 1000);
  // olas rompiendo hacia la orilla, salvo en el canal de la corriente
  for (let i = 0; i < 9; i++) { const y = 300 + ((i * 70 + gt * 40) % 630); ctx.lineWidth = 7; ctx.strokeStyle = 'rgba(255,255,255,.55)';
    ctx.beginPath(); ctx.moveTo(-60, y); ctx.quadraticCurveTo(120, y - 10, 270, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(450, y); ctx.quadraticCurveTo(600, y - 10, W + 60, y); ctx.stroke(); }
  ctx.fillStyle = 'rgba(8,40,90,.45)'; ctx.beginPath(); ctx.moveTo(280, 900); ctx.lineTo(440, 900); ctx.lineTo(470, 260); ctx.quadraticCurveTo(360, 200, 250, 260); ctx.closePath(); ctx.fill();
  for (let i = 0; i < 5; i++) { const y = 860 - ((i * 130 + gt * 120) % 620); arrowHead(360, y, -PI / 2, 'rgba(255,212,0,.9)', 1.3); }
  // arena
  ctx.fillStyle = '#f4d58d'; ctx.beginPath(); ctx.moveTo(-60, 905); for (let x = -60; x <= W + 60; x += 30) ctx.lineTo(x, 905 + Math.sin(x * .02 + gt) * 8); ctx.lineTo(W + 60, H + 60); ctx.lineTo(-60, H + 60); ctx.fill();
  fillRR(250, 836, 220, 60, 30, '#111'); text('CORRIENTE', 360, 868, { size: 34, fam: 'Anton', w: 400, color: '#ffd400', ls: 3 });
  // recorrido: de lado hasta salir del canal y luego a la orilla con las olas
  const k1 = E.inout(cl((t - .4) / (bd * .45))), k2 = E.inout(cl((t - .4 - bd * .45) / (bd * .4)));
  ctx.save(); ctx.setLineDash([16, 14]); ctx.lineWidth = 7; ctx.strokeStyle = '#fff'; ctx.beginPath(); ctx.moveTo(360, 470); ctx.lineTo(590, 470); ctx.quadraticCurveTo(610, 640, 590, 860); ctx.stroke(); ctx.restore();
  arrowHead(590, 860, PI / 2, '#fff', 1.2);
  const x = k2 > 0 ? lerp(590, 590, k2) : lerp(360, 590, k1), y = k2 > 0 ? lerp(470, 840, k2) : 470;
  topSticky(x, y, gt, p.ring);
  // el error, tachado: recto contra la corriente
  ctx.save(); ctx.globalAlpha = .9; ctx.setLineDash([12, 12]); ctx.lineWidth = 6; ctx.strokeStyle = '#ff3b5c'; ctx.beginPath(); ctx.moveTo(330, 520); ctx.lineTo(330, 820); ctx.stroke(); ctx.restore();
  ctx.strokeStyle = '#ff3b5c'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(305, 650); ctx.lineTo(355, 700); ctx.moveTo(355, 650); ctx.lineTo(305, 700); ctx.stroke();
  if (p.stamp) stamp(p.stamp, p.label || '', t);
};

// ---------- pregunta final al público ----------
SCENES.askyou = (t, p, b, gt) => {
  sky('#5fbcf5', '#d6f1ff');
  ctx.fillStyle = lin(0, 700, 0, H, [[0, '#4fb3ec'], [1, '#1663b8']]); ctx.fillRect(-60, 700, W + 120, H);
  const bob = Math.sin(gt * 2.2) * 6;
  flamingo(380, 1010 + bob, 1.0, Math.sin(gt * 1.7) * .04, gt);
  sticky({ x: 350, y: 1004 + bob, s: 1.5, pose: 'point', t: gt, face: 1, expr: 'happy', over: { hipH: 31, lt: 1.45, ls: 1.45, rt: 1.6, rs: 1.6, ra1: 2.3, ra2: .2 } });
  frontWater(1036, gt);
  const a = E.back(cl((t - .1) / .4)); ctx.save(); ctx.translate(W / 2, 330); ctx.scale(a, a); ctx.rotate(-.02);
  ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 30; fillRR(-300, -150, 600, 300, 40, '#fff'); ctx.shadowBlur = 0; ctx.lineWidth = 8; ctx.strokeStyle = '#111'; rr(-300, -150, 600, 300, 40); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(-30, 146); ctx.lineTo(-60, 210); ctx.lineTo(30, 148); ctx.fill(); ctx.stroke();
  text('¿Y TÚ CÓMO', 0, -80, { size: 74, fam: 'Anton', w: 400, color: '#111', ls: 2 }); text('HABRÍAS SALIDO?', 0, 10, { size: 74, fam: 'Anton', w: 400, color: '#111', ls: 2 });
  text('(SIN PEDALO)', 0, 92, { size: 40, fam: 'Anton', w: 400, color: '#ff3b5c', ls: 3 }); ctx.restore();
  const s = E.back(cl((t - .8) / .35)), pu = 1 + Math.sin(gt * 6) * .04; ctx.save(); ctx.translate(W / 2, 610); ctx.scale(s * pu, s * pu);
  fillRR(-190, -38, 380, 76, 38, '#ff3b5c'); text('COMENTA', -20, 2, { size: 40, fam: 'Anton', w: 400, ls: 3 });
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(130, -14); ctx.lineTo(130, 16); ctx.moveTo(118, 4); ctx.lineTo(130, 17); ctx.lineTo(142, 4); ctx.stroke(); ctx.restore();
};

// rótulo del gancho: va fuera de la cámara para que el zoom no lo recorte
OVX.secs = (b, t, o) => { const a = E.back(cl((t - .05) / .35)); ctx.save(); ctx.translate(W / 2, 300); ctx.rotate(-.04); ctx.scale(a, a);
  fillRR(-300, -66, 600, 132, 26, '#111'); text(o.text || '60 SEGUNDOS', 0, 4, { size: 100, fam: 'Anton', w: 400, color: '#ffd400', ls: 4 }); ctx.restore(); };
