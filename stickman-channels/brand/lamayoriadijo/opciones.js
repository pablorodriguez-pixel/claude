// Tres propuestas de foto de perfil para elegir: node opciones.js
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const P = require('./parts'); const { C } = P; const F = '../../engine/fonts';
const bg = `<defs><radialGradient id="bg" cx="50%" cy="40%" r="65%"><stop offset="0" stop-color="#1c2232"/><stop offset="1" stop-color="#040508"/></radialGradient></defs><circle cx="512" cy="512" r="512" fill="url(#bg)"/>`;
const ring = `<circle cx="512" cy="512" r="494" fill="none" stroke="${C.amber}" stroke-width="12" opacity=".5"/>`;
const eyes = (x, y, k = 1, look = 16) => `<ellipse cx="${x - 76 * k}" cy="${y}" rx="${62 * k}" ry="${50 * k}" fill="#fff" stroke="#111" stroke-width="${12 * k}"/><ellipse cx="${x + 76 * k}" cy="${y}" rx="${62 * k}" ry="${50 * k}" fill="#fff" stroke="#111" stroke-width="${12 * k}"/><circle cx="${x - 76 * k + look * k}" cy="${y + 14 * k}" r="${23 * k}" fill="#111"/><circle cx="${x + 76 * k + look * k}" cy="${y + 14 * k}" r="${23 * k}" fill="#111"/>`;
// 2. la mayoría: todos de espaldas menos uno, que te mira
const crowd = () => {
  const heads = [[180, 640, 120], [345, 600, 135], [679, 600, 135], [844, 640, 120], [262, 790, 140], [762, 790, 140]];
  let s = heads.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#3a3f4c" stroke="#111" stroke-width="12"/><rect x="${x - r * .9}" y="${y + r * .7}" width="${r * 1.8}" height="400" rx="${r * .6}" fill="#2a2e38"/>`).join('');
  s += `<circle cx="512" cy="560" r="185" fill="${C.amber}" opacity=".18"/><rect x="372" y="680" width="280" height="500" rx="110" fill="#d9d8d2"/><circle cx="512" cy="540" r="160" fill="${C.bone}" stroke="#111" stroke-width="14"/>${eyes(512, 530, .78, 0)}`;
  s += [[262, 790, 140], [762, 790, 140]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#454b5a" stroke="#111" stroke-width="12"/><rect x="${x - r * .9}" y="${y + r * .7}" width="${r * 1.8}" height="400" rx="${r * .6}" fill="#30343f"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">${bg}<clipPath id="cc"><circle cx="512" cy="512" r="500"/></clipPath><g clip-path="url(#cc)">${s}</g>${ring}</svg>`;
};
// 3. dos opciones: la cabeza partida en las dos decisiones
const split = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">${bg}
<clipPath id="l"><rect x="0" y="0" width="512" height="1024"/></clipPath><clipPath id="r"><rect x="512" y="0" width="512" height="1024"/></clipPath>
<circle cx="512" cy="500" r="300" fill="${C.amber}" clip-path="url(#l)"/><circle cx="512" cy="500" r="300" fill="${C.ecg}" clip-path="url(#r)"/>
<circle cx="512" cy="500" r="300" fill="none" stroke="#111" stroke-width="18"/><path d="M512 200 V800" stroke="#111" stroke-width="14" stroke-dasharray="34 22"/>
${eyes(512, 470, 1.15, 0)}
<path d="M440 640 Q512 610 584 640" fill="none" stroke="#111" stroke-width="14" stroke-linecap="round"/>
<text x="350" y="910" text-anchor="middle" font-family="Anton" font-size="76" fill="${C.amber}">A</text><text x="674" y="910" text-anchor="middle" font-family="Anton" font-size="76" fill="${C.ecg}">B</text>
${ring}</svg>`;
const opts = { '1-asomado': P.bubble(true), '2-la-mayoria': crowd(), '3-dos-opciones': split() };
const css = `<meta charset="utf-8"><style>@font-face{font-family:Anton;src:url(${F}/anton-latin-400-normal.woff2)}@font-face{font-family:Montserrat;font-weight:900;src:url(${F}/montserrat-latin-900-normal.woff2)}html,body{margin:0;background:transparent}svg{display:block}</style>`;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const tmp = path.join(__dirname, '_tmp.html');
  for (const [n, svg] of Object.entries(opts)) {
    const pg = await b.newPage({ viewport: { width: 1024, height: 1024 } }); fs.writeFileSync(tmp, css + svg); await pg.goto('file://' + tmp);
    await pg.evaluate(async () => { await document.fonts.load('10px Anton'); }); await pg.waitForTimeout(100);
    await pg.screenshot({ path: path.join(__dirname, 'opciones', n + '.png'), omitBackground: true }); await pg.close();
  }
  // hoja comparativa: grande + como se ve en el móvil
  const names = [['1', 'ASOMADO', 'El protagonista espera vuestra decisión'], ['2', 'LA MAYORÍA', 'Todos de espaldas… menos uno'], ['3', 'DOS OPCIONES', 'Cada historia acaba en A o B']];
  const img = n => 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'opciones', n + '.png')).toString('base64');
  const html = css + `<div style="width:1800px;height:900px;background:#0b0d12;display:flex;justify-content:space-around;align-items:center;font-family:Montserrat;color:#fff">` +
    Object.keys(opts).map((k, i) => `<div style="text-align:center"><img src="${img(k)}" width="460" height="460"><div style="font-family:Anton;font-size:64px;letter-spacing:3px;margin-top:24px">${names[i][0]} · ${names[i][1]}</div><div style="font-weight:900;font-size:22px;opacity:.7;margin-top:6px">${names[i][2]}</div><div style="margin-top:26px;display:flex;align-items:center;justify-content:center;gap:14px"><img src="${img(k)}" width="64" height="64"><span style="font-weight:900;font-size:22px">lamayoriadijo</span></div></div>`).join('') + `</div>`;
  const pg = await b.newPage({ viewport: { width: 1800, height: 900 } }); fs.writeFileSync(tmp, html); await pg.goto('file://' + tmp);
  await pg.evaluate(async () => { await document.fonts.load('10px Anton'); await document.fonts.load('900 10px Montserrat'); }); await pg.waitForTimeout(200);
  await pg.screenshot({ path: path.join(__dirname, 'opciones', 'comparativa.png') });
  fs.unlinkSync(tmp); await b.close();
})();
