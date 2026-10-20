const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const pg = await b.newPage({ viewport: { width: 512, height: 512 } });
  const F = '../engine/fonts';
  for (const n of ['regla0', 'lunes', 'historia']) {
    const svg = fs.readFileSync(path.join(__dirname, n + '.svg'), 'utf8');
    const tmp = path.join(__dirname, '_tmp.html'); fs.writeFileSync(tmp, `<style>@font-face{font-family:Montserrat;font-weight:900;src:url(${F}/montserrat-latin-900-normal.woff2)}@font-face{font-family:'Bebas Neue';src:url(${F}/bebas-neue-latin-400-normal.woff2)}html,body{margin:0;background:transparent}svg{width:512px;height:512px;display:block}</style>${svg}`); await pg.goto('file://' + tmp);
    await pg.evaluate(async () => { await document.fonts.load('900 10px Montserrat'); await document.fonts.load('10px "Bebas Neue"'); });
    await pg.waitForTimeout(200);
    await pg.screenshot({ path: path.join(__dirname, n + '.png'), omitBackground: true });
  }
  fs.unlinkSync(path.join(__dirname, '_tmp.html')); await b.close();
})();
