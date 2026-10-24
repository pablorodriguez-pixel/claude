const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const COVERS = {
  ep15: `background();
    idCard(540, 980, 860, '12345678', '?', { rot: -.04, letterCol: C.accent, letterK: 1.3 });
    band('¿POR QUÉ TU DNI', 100, C.line, 1, 400); band('TIENE UNA LETRA?', 100, C.accent, 1, 560); stamp('NO ES AL AZAR', 540, 1380, 66, C.mint, 1); brand(1560);`,
  ep16: `background();
    bars(0, 1, { pct: true });
    band('¿TE INVENTAS', 110, C.line, 1, 400); band('UNA FACTURA?', 110, C.accent, 1, 560); stamp('LAS MATES TE DELATAN', 540, 1360, 54, C.red, 1); brand(1560);`,
  ep17: `background();
    for (let i = 0; i < 4; i++) tank(200 + i * 230, 1050, 210, 100 + i * 7);
    band('¿CUÁNTOS TANQUES', 100, C.line, 1, 400); band('TENÍA HITLER?', 100, C.accent, 1, 560); stamp('LO ADIVINARON CON MATES', 540, 1330, 52, C.mint, 1); brand(1560);`,
  ep14: `background();
    for (let i = 0; i < 3; i++) drawDoor(i, 0, { y: 820 }); for (let i = 0; i < 3; i++) txt(String(i + 1) + '?', DXS[i], 1330, 80, C.accent, { weight: 800 });
    band('¿QUÉ PUERTA', 124, C.line, 1, 400); band('ABRIRÍAS?', 124, C.accent, 1, 570); stamp('CASI TODOS FALLAN', 540, 1480, 56, C.accent, 1); brand(1650);`,
  ep11: `background();
    line(GX0 - 80, 1250, GX1 + 80, 1250, C.soft, 6); pylon(GX0, 1250, 300, 'AL LADO', '1,82', C.line); pylon(GX1, 1250, 300, 'LEJOS', '1,77', C.mint); txt('← 12 km →', 540, 1330, 60, C.accent, { weight: 800 });
    band('¿TE COMPENSA', 116, C.line, 1, 400); band('IR MÁS LEJOS?', 116, C.accent, 1, 570); stamp('NO ES LO QUE CREES', 540, 1500, 54, C.accent, 1); brand(1650);`,
  ep12: `background();
    tag(290, 880, '3x2', C.mint, 1, -.06); tag(790, 880, '2ª −50%', C.accent, 1, .06);
    for (let i = 0; i < 3; i++) product(170 + i * 115, 1260, 200, {}); for (let i = 0; i < 2; i++) product(700 + i * 150, 1260, 200, {});
    band('¿CUÁL ES', 120, C.line, 1, 400); band('MEJOR OFERTA?', 110, C.accent, 1, 570); stamp('LA MAYORÍA ELIGE MAL', 540, 1420, 50, C.red, 1); brand(1600);`,
  ep13: `background();
    decimo(540, 980, 760, 0, { num: '48271', rot: -.04 });
    band('20 € DE LOTERÍA', 100, '#ffd166', 1, 400); band('¿CUÁNTO RECUPERAS?', 82, C.line, 1, 560); stamp('NO ES LO QUE CREES', 540, 1360, 58, C.accent, 1); brand(1560);`,
  ep07: `background();
    shout('99 DE 100', 380, 150, C.mint); shout('SALEN LIBRES', 530, 110, C.line);
    line100(0, k => ({ num: k + 1, hat: HATS[k], state: k > 0 ? 'free' : null, hl: k === 0 }));
    { const [x, y, sz] = HEAD(0); txt('?', x + sz * .5, y - sz * .55, 90, C.accent, { weight: 800 }); }
    stamp('¿CÓMO?', 700, 1480, 70, C.accent, 1, -.06); brand(1640);`,
  ep08: `background();
    shout('10 AÑOS', 380, 170, C.accent); shout('MIRANDO EL MÓVIL', 530, 84, C.line);
    years(0, { sleep: 0, work: 0, phone: 10 });
    legend(1290, C.accent, 'MÓVIL 4 h/día', '10 AÑOS', 1); brand(1600);`,
  ep09: `background();
    road(0); lane(OT, 0, 0, 120); me();
    band('¿TE CAMBIAS', 120, C.accent, 1, 430); band('DE CARRIL?', 120, C.accent, 1, 600);
    
    stamp('CASI NUNCA SIRVE', 540, 1380, 58, C.line, 1); brand(1560);`,
  ep10: `background();
    shout('+1 METRO', 380, 150, C.accent); shout('¿CUÁNTO SE SEPARA?', 520, 76, C.line);
    globe(0, 300, 540, 960); circle(540, 960, 314, { stroke: C.accent, w: 8 });
    stamp('¡PASA UN GATO!', 540, 1380, 62, C.accent, 1); brand(1580);`,
  ep04: `background();
    shout('ESTE FOLIO', 360, 120, C.line); shout('LLEGA A LA LUNA', 500, 92, C.accent);
    ctx.save(); ctx.translate(0, 170); drawFold(41.6); ctx.restore();
    circle(830, 700, 95, { fill: 'rgba(230,255,247,.14)', stroke: C.line, w: 4 }); circle(800, 675, 18, { stroke: C.faint, w: 3 }); circle(865, 735, 13, { stroke: C.faint, w: 3 }); txt('LUNA', 830, 830, 34, C.line, { weight: 800, ls: 3 });
    { ctx.save(); ctx.translate(540, 1000); ctx.rotate(-.08); rrect(-300, -66, 600, 132, 24); ctx.fillStyle = 'rgba(5,32,42,.94)'; ctx.fill(); ctx.strokeStyle = C.accent; ctx.lineWidth = 6; ctx.stroke(); txt('42 DOBLECES', 0, 5, 72, C.accent, { weight: 800, ls: 2 }); ctx.restore(); }
    brand(1560);`,
  ep05: `background();
    shout('ESTE ORDEN', 380, 124, C.line); shout('NUNCA HA EXISTIDO', 520, 84, C.accent);
    fan(0, 540, 1420, 640, -1.0, 1.0, 112, 164);
    { ctx.save(); ctx.translate(540, 1030); ctx.rotate(-.14); rrect(-240, -82, 480, 164, 26); ctx.fillStyle = 'rgba(5,32,42,.92)'; ctx.fill(); ctx.strokeStyle = C.accent; ctx.lineWidth = 7; ctx.stroke(); txt('ÚNICO', 0, 6, 110, C.accent, { weight: 800, ls: 8 }); ctx.restore(); }
    brand(1600);`,
  ep06: `background();
    shout('2 CUMPLEAÑOS', 380, 112, C.line); shout('EL MISMO DÍA', 520, 112, C.accent);
    ctx.save(); ctx.translate(0, 130); pitch(); players(0, { hl: true });
    { const [ax, ay] = playerXY(MATCH[0], 0), [bx, by] = playerXY(MATCH[1], 0); ctx.save(); ctx.setLineDash([12, 10]); line(ax, ay - 20, bx, by - 20, C.accent, 4); ctx.restore(); cake(ax, ay - 70, 64); cake(bx, by - 70, 64); }
    ctx.restore();
    shout('EN 1 DE CADA 2 PARTIDOS', 1460, 52, C.line); brand(1600);`,
  ep01: `background();
    shout('1 BOTELLA', 400, 132, C.line); shout('ENVENENADA', 545, 132, C.accent); shout('ENTRE 1.000', 680, 104, C.line);
    bottleGrid(1000, 40, 214, 800, 16.35, 18, () => .9, i => i === POISON ? C.accent : C.line);
    { const x = 214 + (POISON % 40) * 16.35 + 8, y = 800 + Math.floor(POISON / 40) * 18 + 7; circle(x, y, 24, { stroke: C.accent, w: 4 }); circle(x, y, 44, { stroke: 'rgba(255,143,107,.5)', w: 3 }); line(x, y - 26, x, y - 62, C.accent, 4); skull(x, y - 104, 40, C.accent, 4); }
    shout('¿CUÁNTOS CATADORES', 1385, 62, C.line); shout('NECESITAS?', 1465, 80, C.accent); brand();`,
  ep02: `background();
    shout('¿CUÁNTAS VECES', 410, 106, C.line); shout('CHOCAN?', 560, 160, C.accent);
    txt('π', 830, 920, 330, 'rgba(255,143,107,.9)', { weight: 800 });
    ctx.save(); ctx.translate(0, 190); drawWorld(simulate(100), 1.08); ctx.restore();
    shout('ESCONDEN LOS DÍGITOS DE π', 1420, 50, C.line); brand();`,
  ep03: `background();
    shout('¿CAMBIAS', 400, 150, C.line); shout('DE PUERTA?', 560, 150, C.accent);
    for (let i = 0; i < 3; i++) drawDoor(i, i === 2 ? 1 : 0, { y: 760, chosen: i === 0, col: i === 0 ? C.accent : C.line });
    circle(DXS[0], 760 + DH / 2, DW / 2 + 22, { stroke: C.accent, w: 4 }); txt('TU ELECCIÓN', DXS[0], 1250, 30, C.accent, { weight: 800, ls: 3 });
    shout('CASI TODOS FALLAN', 1400, 64, C.accent); brand();`,
};
(async () => {
  const b = await chromium.launch();
  for (const [ep, code] of Object.entries(COVERS)) {
    const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
    p.on('pageerror', e => { console.error(ep, 'PAGEERROR', e.message); });
    await p.goto('file://' + path.resolve(__dirname, 'cover.html'));
    await p.addScriptTag({ path: path.resolve(__dirname, ep + '.js') });
    await p.addScriptTag({ path: path.resolve(__dirname, 'cover_common.js') });
    await p.evaluate(() => document.fonts.load("800 40px 'JetBrains Mono'"));
    const b64 = await p.evaluate(c => { (new Function(c))(); return document.getElementById('c').toDataURL('image/png').split(',')[1]; }, code);
    fs.writeFileSync(path.resolve(__dirname, 'covers', `portada-${ep}.png`), Buffer.from(b64, 'base64')); console.log('ok', ep);
  }
  await b.close();
})();
