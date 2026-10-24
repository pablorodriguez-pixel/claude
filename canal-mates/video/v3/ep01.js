// Episodio 1 · La botella envenenada (historia → juego de adivinar → catador = pregunta → binario)
const HG = { x0: 214, y0: 470, cw: 16.35, ch: 24 };
const cellXY = i => [HG.x0 + (i % 40) * HG.cw + HG.cw / 2, HG.y0 + Math.floor(i / 40) * HG.ch];
const POISON = 488;                       // botella nº 489
const grid = (alphaFn, colorFn) => bottleGrid(1000, 40, HG.x0, HG.y0, HG.cw, HG.ch, alphaFn, colorFn);
const sickSet = n => { const a = []; for (let k = 1; k <= 10; k++) if (((n - 1) >> (k - 1)) & 1) a.push(k); return a; };
const BX = i => 390 + i * 150;

// Zoom-out con desenfoque: de UNA botella enorme a la rejilla de 1.000 (como el arranque de los reels)
const Z0 = 14.5, ZC = [HG.x0 + 19 * HG.cw + HG.cw / 2, HG.y0 + 12 * HG.ch + HG.ch * .85 / 2];
function latticeBottle(i, Z, col, alpha, lw) {
  const c = i % 40, r = Math.floor(i / 40), bw = HG.cw * .5 * Z, bh = HG.ch * .85 * Z;
  const x = ZC[0] + (c - 19) * HG.cw * Z, y = ZC[1] + (r - 12) * HG.ch * Z - bh / 2;
  if (x < -bw || x > W + bw || y < -bh || y > H + bh) return;
  ctx.save(); ctx.globalAlpha *= alpha; bottle(x, y, bw, bh, col, lw); ctx.restore();
}
function zoomAt(t, t0, t1) {            // exponencial con un pequeño rebote final
  const u = easeIO(seg(t, t0, t1)), z = Z0 * Math.pow(1 / Z0, u), over = Math.sin(clamp((t - t1) / .35) * Math.PI) * .05 * (t > t1 ? 1 : 0);
  return z * (1 - over * 0);
}
function sceneHook(t, lt, s) {
  const T = w => wt('hook', w), tFi = T('fiesta'), tMil = T('mil'), tEnv = T('envenenada'), tSor = T('sorbo'), tMue = T('muerto'), tHora = T('hora'), tDia = T('dia'), tCu = T('cuantos'), tCat = T('catadores');
  const z0 = tMil - .25, z1 = tMil + 2.1, Z = zoomAt(t, z0, z1), run = seg(t, z0, z1);
  const poisonOn = t >= tEnv - .1, dimQ = lerp(1, .35, seg(t, tCu, tCu + .4));
  // contador: cuántas botellas caben en pantalla a este zoom (como en el reel)
  const cols = Math.min(40, Math.floor(W / (HG.cw * Z)) + 1), rows = Math.min(25, Math.floor(1000 / (HG.ch * Z * 1.0)) + 1);
  const n = t < z0 ? 1 : (run >= 1 ? 1000 : Math.max(1, Math.min(1000, cols * Math.min(rows, 25))));
  hud('R', 'BOTELLAS', fmt(n), { size: 76 });
  if (t < z0) {                                    // una botella enorme con corcho, desde el primer fotograma
    const pulse = 1 + .05 * seg(t, 0, z0) + .012 * Math.sin(t * 5); ctx.save(); ctx.translate(ZC[0], ZC[1]); ctx.scale(pulse, pulse); ctx.translate(-ZC[0], -ZC[1]);
    latticeBottle(19 + 12 * 40, Z0, C.line, 1, 5); txt('VINO', ZC[0], ZC[1] + 40, 38, C.label, { weight: 700, ls: 6 }); ctx.restore();
  } else {
    const SUB = 8, shutter = .09 * clamp(Math.sin(run * Math.PI) * 3, 0, 1) * (1 - seg(run, .72, .93));        // desenfoque proporcional a la velocidad
    for (let i = 0; i < 1000; i++) {
      const c = i % 40, r = Math.floor(i / 40), d = Math.max(Math.abs(c - 19) / 20, Math.abs(r - 12) / 12.5);   // revelado rectangular, como el recorte de pantalla del reel
      const appear = i === 19 + 12 * 40 ? 1 : easeOut(seg(run, d * .62, d * .62 + .18));
      if (appear <= .01) continue;
      const col = (i === POISON && poisonOn) ? C.accent : C.line, a = (i === POISON ? 1 : dimQ) * appear;
      if (shutter > .004 && run < 1) { for (let k = 0; k < SUB; k++) { const tt = t - shutter * (k / (SUB - 1)); latticeBottle(i, zoomAt(tt, z0, z1), col, a * .22 * (1 - seg(run, .5, .82)), Math.max(1.4, 2 * Z0 / Math.max(Z, 1) * .12)); } }
      latticeBottle(i, Z, col, a * (shutter > .004 && run < 1 ? lerp(.55, .9, seg(run, .5, .82)) : 1), Math.max(1.4, Math.min(5, 1.4 * Math.sqrt(Z))));
    }
  }
  // titular que escribe la información clave
  const h1 = 1 - seg(t, tCu - .15, tCu + .05);
  const t1 = tMil + 1.7; if (t > t1) { const n1 = Math.floor((t - t1) * 38); txt('1.000 botellas.'.slice(0, n1), 90, 250, 64, C.line, { align: 'left', weight: 800, alpha: h1 }); }
  if (t > tEnv - .2) { const n2 = Math.floor((t - tEnv + .2) * 38); txt('1 envenenada.'.slice(0, n2), 90, 250 + 74, 64, C.accent, { align: 'left', weight: 800, alpha: h1 }); }
  headline('¿Cuántos', 'catadores?', tCu, t, { cps: 30 });
  bunting(150, 930, 415, tFi, t);
  const [px, py] = cellXY(POISON), ring = easeBack(seg(t, tEnv - .1, tEnv + .4));
  if (ring > 0 && run >= 1) { circle(px, py + 10, 22 * ring, { stroke: C.accent, w: 3 }); const ph = ((t - tEnv) * .9) % 1; ctx.save(); ctx.globalAlpha *= (1 - ph) * .6; circle(px, py + 10, 22 + ph * 60, { stroke: C.accent, w: 2 }); ctx.restore();
    line(px, py - 14, px, py - 52, C.accent, 3); skull(px, py - 90, 34, C.accent, 3); }
  const pa = easeOut(seg(t, tSor - .25, tSor + .15)), sick = t >= tMue;
  if (pa > 0) { ctx.save(); ctx.globalAlpha *= pa; person(300, 1300, 130, sick ? C.mint : C.line, sick ? 'rgba(126,240,200,.45)' : null, 3);
    if (sick) zzz(300, 1300, 130, t);
    const up = easeIO(seg(t, tSor, tSor + .5)) * (1 - seg(t, tMue, tMue + .3)); glass(300 + lerp(78, 30, up), 1215 + lerp(30, -2, up), 40, C.line, 'rgba(255,143,107,.55)', 3);
    txt(sick ? '¡enfermo!' : '1 sorbo', 300, 1355, 24, sick ? C.mint : C.label, { weight: sick ? 700 : 600, ls: 2 }); ctx.restore(); }
  const ca = easeBack(seg(t, tHora - .2, tHora + .3));
  if (ca > 0) { ctx.save(); ctx.translate(720, 1230); ctx.scale(ca, ca); clock(0, 0, 68, easeIO(seg(t, tHora, tHora + 1.3)) * Math.PI * 2); ctx.restore(); txt('1 SORBO = 1 HORA', 720, 1335, 26, C.accent, { weight: 800, ls: 3, alpha: seg(t, tHora + .1, tHora + .5) }); }
  const dd = easeBack(seg(t, tDia - .1, tDia + .35)); if (dd > 0 && t < tCu) txt('TIENES 1 DÍA', W / 2, 1120, 46, C.accent, { weight: 800, ls: 3, scale: dd });
  const q = seg(t, tCat - .1, tCat + .3); if (q > 0) txt('?', 300, 1175 + Math.sin(t * 6) * 6, 80, C.accent, { weight: 800, alpha: q });
}

function sceneObvio(t, lt, s) {
  const T = w => wt('obvio', w), tBo = T('botella'), tMil = T('mil'), tTr = T('truco'), tDi = T('diez'), tJu = T('jugando');
  headline('Un catador', 'por botella…', s.start + .1, t, { alpha: 1 - seg(t, tTr, tTr + .3) });
  headline('Solo', 'diez.', tTr + .05, t, { cps: 26, alpha: seg(t, tTr + .05, tTr + .25) });
  grid(() => .32);
  const crowd = easeOut(seg(t, tBo - .1, tBo + 1.3)), gone = 1 - seg(t, tTr, tTr + .6);
  if (crowd > 0 && gone > 0) for (let i = 0; i < 1000; i++) { const a = easeOut(seg(crowd * 1.4, i / 1000, i / 1000 + .3)) * gone; if (a <= .01) continue; const [x, y] = cellXY(i);
    ctx.save(); ctx.globalAlpha *= a * .9; person(x, y + 21, 22, C.accent, null, 1.3); ctx.restore(); }
  const c = tTr > t ? Math.round(1000 * crowd) : 1000;
  hud('R', 'CATADORES', t >= tDi - .05 ? '10' : fmt(c), { color: t >= tDi - .05 ? C.accent : C.line, alpha: seg(t, tBo - .1, tBo + .2), size: 76 });
  const red = easeOut(seg(t, tMil + .5, tMil + .8)) * (t < tDi - .05 ? 1 : 0);
  if (red > 0) { ctx.save(); ctx.strokeStyle = C.red; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(W - 330, 345); ctx.lineTo(W - 330 + 230 * red, 300 + 45 * (1 - red)); ctx.stroke(); ctx.restore(); }
  peopleRow(10, 135, 90, 1250, 90, tDi, { t, step: .08, color: () => C.accent });
  const j = easeBack(seg(t, tJu - .05, tJu + .35)); if (j > 0) txt('VAMOS A JUGAR', W / 2, 1110, 58, C.accent, { weight: 800, scale: j, ls: 3 });
}

function sceneJuego(t, lt, s) {
  const T = (w, n = 0) => wt('juego', w, n), tNum = T('numero'), tDi = T('diez'), tQ1 = T('quinientos'), tS1 = T('si', 0), tQ2 = T('setecientos'), tN2 = T('no', 0), tMi = T('mitad');
  headline('Adivina', 'mi número', s.start + .1, t);
  const stage = t >= tN2 ? 3 : t >= tQ2 - .05 ? 2 : t >= tS1 ? 1 : t >= tQ1 - .05 ? 0.5 : 0;
  const remaining = i => stage >= 3 ? (i >= 500 && i < 750) : stage >= 1 && stage < 2 ? i >= 500 : stage >= 2 ? (i >= 500) : true;
  const dimA = (stage >= 1 ? 1 : 0), eAns1 = easeOut(seg(t, tS1, tS1 + .35)), eAns2 = easeOut(seg(t, tN2, tN2 + .35));
  grid(i => { let a = easeOut(seg(lt, .05 + i / 1000 * .8, .35 + i / 1000 * .8)); const k1 = (i >= 500) ? 1 : lerp(1, .12, eAns1); let k2 = 1; if (t >= tQ2) k2 = (i < 750) ? 1 : lerp(1, .12, eAns2); return a * k1 * (i >= 500 ? k2 : 1); },
       i => (stage >= 1 && ((stage < 3 && i >= 500) || (stage >= 3 && i >= 500 && i < 750))) ? C.accent : C.line);
  // divisores
  const dv = (idx, a) => { if (a <= 0) return; const y = HG.y0 + Math.floor(idx / 40) * HG.ch, x = HG.x0 + (idx % 40) * HG.cw; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.accent; ctx.lineWidth = 3; ctx.setLineDash([10, 8]);
    ctx.beginPath(); ctx.moveTo(HG.x0 - 20, y); ctx.lineTo(x, y); ctx.lineTo(x, y + HG.ch); ctx.lineTo(HG.x0 + 40 * HG.cw + 20, y + HG.ch); ctx.stroke(); ctx.restore(); };
  dv(500, seg(t, tQ1 - .1, tQ1 + .2) * (stage >= 2 ? 0 : 1)); dv(750, seg(t, tQ2 - .1, tQ2 + .2) * (stage >= 3 ? 0 : 1));
  const poss = stage >= 3 ? 250 : stage >= 1 ? 500 : 1000;
  hud('R', 'POSIBLES', fmt(poss), { color: stage >= 1 ? C.accent : C.line, alpha: seg(lt, .1, .4), size: 76 });
  if (t >= tDi - .05 && t < tMi - .1) txt('10 PREGUNTAS DE SÍ O NO', W / 2, 410, 34, C.accent, { weight: 800, ls: 3, alpha: seg(t, tDi - .05, tDi + .3) });
  const bq = (txtq, t0, col) => bubble(540, 1170, 640, 100, txtq, col, { alpha: seg(t, t0 - .1, t0 + .25), scale: .92 + .08 * easeBack(seg(t, t0 - .1, t0 + .3)), size: 40 });
  if (t < tS1 + 1.2 && t >= tQ1 - .15) bq('¿ES MAYOR QUE 500?', tQ1, C.line);
  if (t >= tQ2 - .15 && t < tMi + .6) bq('¿MAYOR QUE 750?', tQ2, C.line);
  const chip = (word, t0, col, x) => { const a = easeBack(seg(t, t0, t0 + .3)); if (a > 0) txt(word, x, 1280, 90, col, { weight: 800, scale: a }); };
  if (t >= tS1 && t < tQ2 - .15) chip('SÍ', tS1, C.mint, 540); if (t >= tN2) chip('NO', tN2, C.red, 540);
  const m = easeBack(seg(t, tMi - .1, tMi + .3)); if (m > 0 && t >= tMi - .1) { txt('CADA RESPUESTA = MITAD', W / 2, 410, 36, C.accent, { weight: 800, scale: m, ls: 3 }); }
}

function sceneCatador(t, lt, s) {
  const T = (w, n = 0) => wt('catador', w, n), tP1 = T('pregunta', 1), tG0 = T('grupo', 0), tDi = T('distinto'), tVez = T('vez'), tE0 = T('enferma'), tSi = T('si', 1), tNo = T('no', 1), tDz = T('diez');
  headline('Cada catador', '= una pregunta', s.start + .1, t);
  const k = t < tG0 - .1 ? 0 : t < tDi ? 1 : t < tDi + 1.15 ? 2 : t < tVez ? 3 : t < tDz ? 1 : 0;       // grupo de botellas que prueba el catador k
  const sick = t >= tE0 && t < tNo, outside = t >= tNo && t < tDz;
  const base = k ? .3 : 1;
  grid(i => easeOut(seg(lt, .05 + i / 1000 * .6, .3 + i / 1000 * .6)) * (t >= tDz ? .5 : 1) * (outside && k ? 1 : (sick && k ? .3 : base)),
       i => (k && !outside && ((i >> (k - 1)) & 1)) ? C.accent : (outside && k && !((i >> (k - 1)) & 1)) ? C.mint : C.line);
  if (k && !(t >= tDz)) grid(i => ((((i >> (k - 1)) & 1) && !outside) ? 1 : 0) * (sick ? 1 : (outside ? 0 : 1)), () => C.accent);
  const big = 1 - easeOut(seg(t, tDz - .1, tDz + .4));
  if (big > 0) { ctx.save(); ctx.globalAlpha *= big; person(200, 1330, 210, sick ? C.mint : C.line, sick ? 'rgba(126,240,200,.40)' : null, 4); if (sick) zzz(200, 1330, 210, t);
    if (k) txt(`CATADOR ${k}`, 200, 1190, 26, k ? C.accent : C.label, { weight: 800, ls: 3 }); ctx.restore(); }
  const bq = seg(t, tP1 - .1, tP1 + .3) * big * (1 - seg(t, tVez - .2, tVez - .05)); if (bq > 0) bubble(660, 1215, 700, 100, '¿ESTÁ LA MALA EN MI GRUPO?', C.line, { alpha: bq, scale: .93 + .07 * easeBack(seg(t, tP1 - .1, tP1 + .3)), size: 34 });
  if (t >= tE0 && t < tNo) { const a = easeBack(seg(t, tSi, tSi + .3)); txt('SÍ → ESTÁ EN SU GRUPO', 640, 1250, 44, C.mint, { weight: 800, scale: a, alpha: big }); }
  if (t >= tNo && t < tDz) { const a = easeBack(seg(t, tNo, tNo + .3)); txt('NO → ESTÁ FUERA', 640, 1250, 44, C.line, { weight: 800, scale: a, alpha: big }); }
  const vz = easeBack(seg(t, tVez - .1, tVez + .35)); if (vz > 0 && t < tE0 - .3) txt('TODOS A LA VEZ', 640, 1250, 48, C.accent, { weight: 800, scale: vz, ls: 3 });
  const row = easeOut(seg(t, tDz - .1, tDz + .3)); if (row > 0) { txt('10 CATADORES = 10 PREGUNTAS', W / 2, 1150, 38, C.accent, { weight: 800, ls: 2, alpha: row }); peopleRow(10, 135, 90, 1300, 100, tDz, { t, step: .08, color: () => C.accent, label: i => 'P' + (i + 1) }); }
}

function miniBase(t, tB, o = {}) {
  const hi = o.hi ?? -1;
  for (let i = 0; i < 4; i++) {
    const a = easeOut(seg(t, tB + i * .12, tB + .3 + i * .12)); if (a <= 0) continue;
    ctx.save(); ctx.globalAlpha *= a; const on = i === hi;
    if (on) { ctx.fillStyle = 'rgba(255,143,107,.15)'; ctx.fillRect(BX(i) - 60, 470, 120, 640); }
    bottle(BX(i), 520, 62, 128, on ? C.accent : C.line, 3); txt(String(i + 1), BX(i), 700, 34, on ? C.accent : C.label, { weight: 800 });
    ctx.restore();
  }
}
function toggles(t, tA, tB, fills, o = {}) {
  [['ANA', 880, tA], ['BETO', 1030, tB]].forEach(([name, y, t0], r) => {
    const a = easeOut(seg(t, t0, t0 + .35)); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a; const sick = o.sick && o.sick[r];
    person(185, y + 52, 110, sick ? C.mint : C.line, sick ? 'rgba(126,240,200,.45)' : null, 3); if (sick) zzz(185, y + 52, 110, t);
    txt(name, 250, y + 20, 24, sick ? C.mint : C.label, { align: 'left', weight: 700, ls: 2 });
    for (let i = 0; i < 4; i++) { circle(BX(i), y, 30, { stroke: C.line, w: 3 }); const f = fills[r][i]; if (f > 0) { circle(BX(i), y, 16 * f, { fill: C.accent, stroke: null }); } }
    ctx.restore();
  });
}
function sceneMini(t, lt, s) {
  const T = (w, n = 0) => wt('mini', w, n), tB = T('cuatro', 0), tAn = T('ana', 0), tBe = T('beto', 0), tDos = T('dos', 1), tC1 = T('cuatro', 1), tTres = T('tres'), tC2 = T('cuatro', 2);
  headline('Un caso', 'pequeño', s.start + .1, t);
  miniBase(t, tB);
  const f = e => easeBack(seg(t, e, e + .3));
  toggles(t, tAn, tBe, [[0, f(tDos), 0, f(tC1)], [0, 0, f(tTres), f(tC2)]]);
  const lg = seg(t, tDos, tDos + .4); if (lg > 0) { circle(190, 1230, 14, { fill: C.accent, stroke: null }); txt('= BEBE DE ESA BOTELLA', 225, 1230, 26, C.label, { align: 'left', weight: 600, ls: 2, alpha: lg }); }
}
function sceneLecturas(t, lt, s) {
  const T = (w, n = 0) => wt('lecturas', w, n);
  const A = [[T('nadie'), T('uno')], [T('ana', 0), T('dos', 0)], [T('beto', 0), T('tres')], [T('enferman'), T('cuatro', 0)]], tPer = T('personas');
  let k = -1, res = false; A.forEach(([a, r], i) => { if (t >= a - .05) { k = i; res = t >= r - .05; } });
  const sick = k < 0 ? [0, 0] : [k & 1, (k >> 1) & 1];
  headline('Leemos', 'el resultado', s.start + .1, t);
  miniBase(t, s.start - 5, { hi: res ? k : -1 });
  toggles(t, s.start - 5, s.start - 5, [0, 1].map(r => [0, 1, 2, 3].map(i => ((i >> r) & 1) ? 1 : 0)), { sick });
  const rows = [['NADIE ENFERMA', '1'], ['SOLO ANA', '2'], ['SOLO BETO', '3'], ['ENFERMAN LOS DOS', '4']];
  rows.forEach(([lab, n], i) => { const seen = t >= A[i][0] - .05, act = k === i && t < tPer - .1, y = 1130 + i * 56; if (!seen) return; const a = easeOut(seg(t, A[i][0] - .05, A[i][0] + .25));
    ctx.save(); ctx.globalAlpha *= a * (act ? 1 : .5); if (act) { ctx.fillStyle = 'rgba(255,143,107,.14)'; rrect(150, y - 26, 780, 52, 14); ctx.fill(); }
    txt(lab, 190, y, 32, act ? C.mint : C.line, { align: 'left', weight: 800, ls: 1 }); txt('→  BOTELLA ' + n, 890, y, 36, act ? C.accent : C.line, { align: 'right', weight: 800 }); ctx.restore(); });
  const e = easeBack(seg(t, tPer - .05, tPer + .35)); if (e > 0) { ctx.save(); ctx.fillStyle = 'rgba(5,32,42,.94)'; rrect(110, 1100, 860, 230, 30); ctx.fill(); ctx.strokeStyle = C.accent; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); txt('2 PERSONAS', W / 2, 1170, 60, C.line, { weight: 800, scale: e }); txt('= 4 BOTELLAS', W / 2, 1255, 60, C.accent, { weight: 800, scale: e }); }
}

function sceneDobla(t, lt, s) {
  const T = w => wt('dobla', w), t3 = T('tres'), t4 = T('cuatro'), tD = T('diez'), tMil = T('mil'), tDup = T('duplican');
  headline('Cada catador', 'duplica', s.start + .1, t, { alpha: 1 - seg(t, tD - .1, tD + .1) });
  const stage = t >= t4 ? 4 : t >= t3 ? 3 : 2, n = 1 << stage, stT = stage === 4 ? t4 : stage === 3 ? t3 : s.start;
  const pre = 1 - seg(t, tD - .1, tD + .2);
  if (pre > 0) { ctx.save(); ctx.globalAlpha *= pre;
    hud('R', 'CATADORES', String(stage), { size: 76 });
    const dx = 110, y0 = 540, dy = 190, x0 = W / 2 - (Math.min(n, 8) - 1) * dx / 2;
    for (let i = 0; i < n; i++) { const nw = i >= (n >> 1) && stage > 2, born = nw ? stT : s.start - 1, d = (i - (n >> 1)) * .05;
      const a = i < 4 ? easeOut(seg(lt, .1 + i * .08, .5 + i * .08)) : easeOut(seg(t, born + .05 + d, born + .4 + d));
      ctx.save(); ctx.globalAlpha *= a; bottle(x0 + (i % 8) * dx, y0 + Math.floor(i / 8) * dy, 56, 118, nw && t < born + 1.2 ? C.accent : C.line, 3); ctx.restore(); }
    txt(`${n} BOTELLAS`, W / 2, 1000, 60, C.accent, { weight: 800, ls: 3 }); if (t >= tDup) txt('×2', W / 2, 1100, 90, C.accent, { weight: 800, scale: 1 + .08 * Math.sin(Math.max(0, t - stT) * 3) * Math.exp(-(t - stT)) });
    peopleRow(stage, W / 2 - (stage - 1) * 50, 100, 1250, 80, s.start, { t, step: 0, color: i => i === stage - 1 && stage > 2 ? C.accent : C.line });
    ctx.restore(); }
  const post = easeOut(seg(t, tD, tD + .4));
  if (post > 0) { ctx.save(); ctx.globalAlpha *= post;
    hud('R', 'CATADORES', '10', { color: C.accent, size: 76 });
    const steps = Math.min(6, Math.floor((t - tD) / .22)), v = 16 * Math.pow(2, Math.max(0, steps)), shown = t >= tMil ? 1024 : v;
    txt(fmt(shown), W / 2, 760, 230, t >= tMil ? C.accent : C.line, { weight: 800 });
    txt('BOTELLAS QUE PUEDES COMPROBAR', W / 2, 910, 32, C.label, { weight: 600, ls: 3 });
    peopleRow(10, 135, 90, 1150, 90, tD, { t, step: .05, color: () => C.accent });
    ctx.restore(); }
}

function sceneDiez(t, lt, s) {
  const T = w => wt('diez', w), tDi = T('diez'), tRo = T('ronda'), tMa = T('mala'), tVe = T('veinte'), tMi = T('millon');
  const p = 1 - seg(t, tVe - .15, tVe + .15);
  if (p > 0) { ctx.save(); ctx.globalAlpha *= p;
    headline('Una sola', 'ronda', s.start + .1, t);
    const per = Math.min(.24, (tMa - tRo - .15) / 10), kk = t >= tRo ? Math.min(10, Math.floor((t - tRo) / per) + 1) : 0, done = t >= tMa - .05, sick = sickSet(POISON + 1);
    grid(i => easeOut(seg(lt, .05 + i / 1000 * .5, .3 + i / 1000 * .5)) * (done ? (i === POISON ? 1 : .3) : (kk ? .4 : 1)), i => (done && i === POISON) ? C.accent : C.line);
    if (kk && !done) grid(i => ((i >> (kk - 1)) & 1) ? 1 : 0, () => C.accent);
    peopleRow(10, 135, 90, 1230, 90, tDi, { t, step: .07, color: i => done ? (sick.includes(i + 1) ? C.mint : C.line) : (i + 1 === kk ? C.accent : C.line) });
    if (done) { for (const k of sick) zzz(135 + (k - 1) * 90, 1230, 90, t);
      const [px, py] = cellXY(POISON), r = easeBack(seg(t, tMa, tMa + .4)); circle(px, py + 10, 22 * r, { stroke: C.accent, w: 3 }); skull(px, py - 60, 28, C.accent, 3);
      txt('ENFERMAN 4, 6, 7, 8 y 9', W / 2, 1130, 36, C.mint, { weight: 800, ls: 2, alpha: seg(t, tMa, tMa + .3) });
      txt('→ BOTELLA 489', W / 2, 1185 - 0, 46, C.accent, { weight: 800, alpha: seg(t, tMa + .2, tMa + .5) }); }
    ctx.restore(); }
  const q = easeOut(seg(t, tVe, tVe + .5)); if (q <= 0) return;
  ctx.save(); ctx.globalAlpha *= q;
  const e = easeIO(seg(t, tVe, tVe + 1.6)), n = Math.round(lerp(10, 20, easeOut(seg(t, tVe, tVe + .8))));
  hud('L', 'BOTELLAS', fmt(lerp(1024, 1048576, e)), { color: C.accent, size: 70 }); hud('R', 'CATADORES', String(n), { size: 70 });
  ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(280, 430, 520, 600); ctx.strokeStyle = C.soft; ctx.lineWidth = 3; ctx.strokeRect(280, 430, 520, 600);
  ctx.beginPath(); for (let x = 280; x <= 800; x += 13) { ctx.moveTo(x, 430); ctx.lineTo(x, 1030); } for (let y = 430; y <= 1030; y += 15) { ctx.moveTo(280, y); ctx.lineTo(800, y); }
  ctx.strokeStyle = 'rgba(230,255,247,.16)'; ctx.lineWidth = 1; ctx.stroke();
  const r = easeBack(seg(t, tVe + 1.2, tVe + 1.7)); circle(731, 800, 14 * r, { stroke: C.accent, w: 3 }); circle(731, 800, 4, { fill: C.accent, stroke: null });
  for (let i = 0; i < n; i++) { const aa = i > 9 ? easeOut(seg(t, tVe + (i - 10) * .05, tVe + .3 + (i - 10) * .05)) : 1; ctx.save(); ctx.globalAlpha *= clamp(aa); person(84 + i * 48, 1180, 56, i > 9 ? C.accent : C.line, null, 2.4); ctx.restore(); }
  if (t >= tMi - .1) txt('MÁS DE UN MILLÓN', W / 2, 1290, 44, C.accent, { weight: 800, ls: 3, alpha: seg(t, tMi - .1, tMi + .3) });
  ctx.restore();
}
function sceneCta(t, lt, s) { drawCta(t, lt, wt('cta', 'sigue')); }
const DRAW = { hook: sceneHook, obvio: sceneObvio, juego: sceneJuego, catador: sceneCatador, mini: sceneMini, lecturas: sceneLecturas, dobla: sceneDobla, diez: sceneDiez, cta: sceneCta };

window.getEvents = () => {
  const E = [], P = (s, w, n = 0, ty = 'pop') => E.push({ t: wt(s, w, n), type: ty });
  TL.scenes.forEach(s => E.push({ t: s.start, type: 'whoosh' }));
  E.push({ t: wt('hook', 'mil') - .25, type: 'zoom' }); E.push({ t: wt('hook', 'mil') + 2.1, type: 'boom' }); P('hook', 'fiesta'); P('hook', 'envenenada', 0, 'boom'); P('hook', 'sorbo'); P('hook', 'muerto', 0, 'buzz'); P('hook', 'hora'); P('hook', 'dia'); P('hook', 'cuantos', 0, 'ding');
  P('obvio', 'botella'); P('obvio', 'truco', 0, 'swipe'); P('obvio', 'diez', 0, 'ding'); P('obvio', 'jugando');
  P('juego', 'quinientos'); P('juego', 'si', 0, 'ding'); P('juego', 'setecientos'); P('juego', 'no', 0, 'buzz'); P('juego', 'mitad');
  P('catador', 'pregunta', 1); P('catador', 'grupo', 0); P('catador', 'distinto'); P('catador', 'vez', 0, 'ding'); P('catador', 'enferma', 0, 'buzz'); P('catador', 'no', 1); P('catador', 'diez', 0, 'ding');
  P('mini', 'dos', 1); P('mini', 'cuatro', 1); P('mini', 'tres'); P('mini', 'cuatro', 2);
  ['uno', 'tres'].forEach(w => P('lecturas', w, 0, 'ding')); P('lecturas', 'dos', 0, 'ding'); P('lecturas', 'cuatro', 0, 'ding'); P('lecturas', 'personas', 0, 'ding');
  P('dobla', 'duplican'); P('dobla', 'tres'); P('dobla', 'cuatro'); P('dobla', 'diez', 0, 'ding'); P('dobla', 'mil', 0, 'ding');
  P('diez', 'ronda'); P('diez', 'mala', 0, 'ding'); P('diez', 'veinte'); P('diez', 'millon', 0, 'ding');
  P('cta', 'sigue', 0, 'click'); E.push({ t: wt('cta', 'sigue') + .1, type: 'ding' });
  return E;
};
