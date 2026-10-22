// Renderiza cada .frame de fN.html a PNG y monta la hoja horizontal con ffmpeg.
// Uso: node render.js [1 2 3 4]
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const path = require('path');
const dir = __dirname;
const out = path.resolve(dir, '..');
(async () => {
  const which = process.argv.slice(2).length ? process.argv.slice(2) : ['1', '2', '3', '4'];
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  for (const n of which) {
    await page.goto('file://' + path.join(dir, `f${n}.html`));
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    const frames = await page.$$('.frame');
    const pngs = [];
    for (let i = 0; i < frames.length; i++) {
      const p = path.join(dir, 'png', `f${n}-${i + 1}.png`);
      await frames[i].screenshot({ path: p });
      pngs.push(p);
    }
    const args = ['-loglevel', 'error', '-y'];
    pngs.forEach(p => args.push('-i', p));
    const sc = pngs.map((_, i) => `[${i}:v]scale=540:960:flags=lanczos[s${i}]`).join(';');
    const ins = pngs.map((_, i) => `[s${i}]`).join('');
    args.push('-filter_complex', `${sc};${ins}hstack=inputs=${pngs.length}`, '-q:v', '2', path.join(out, `formato-${n}.jpg`));
    execFileSync('ffmpeg', args);
    console.log('ok formato', n, pngs.length, 'frames');
  }
  await browser.close();
})();
