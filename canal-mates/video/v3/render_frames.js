// Uso: node render_frames.js <ep> <workers> [frames sueltos]   (ep01 → ep01.html + build/ep01)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const EP = process.argv[2], B = path.resolve(__dirname, 'build', EP);
const FPS = 30, WORKERS = +process.argv[3] || 4;
const only = process.argv[4] ? process.argv[4].split(',').map(Number) : null;
(async () => {
  const browser = await chromium.launch();
  const url = 'file://' + path.resolve(__dirname, EP + '.html');
  const open = async () => { const p = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
    p.on('pageerror', e => { console.error('PAGEERROR', e.message); process.exit(1); });
    await p.goto(url); await p.evaluate(() => document.fonts.load("800 40px 'JetBrains Mono'")); await p.evaluate(() => document.fonts.ready); return p; };
  const first = await open();
  const total = await first.evaluate(() => TL.total);
  fs.writeFileSync(path.join(B, 'events.json'), JSON.stringify(await first.evaluate(() => getEvents())));
  const frames = only || Array.from({ length: Math.ceil(total * FPS) }, (_, i) => i);
  fs.mkdirSync(path.join(B, 'frames'), { recursive: true });
  const pages = [first]; for (let i = 1; i < WORKERS; i++) pages.push(await open());
  let next = 0, done = 0;
  await Promise.all(pages.map(async p => { for (;;) { const k = next++; if (k >= frames.length) break; const f = frames[k];
    const b64 = await p.evaluate(t => getFrame(t, .93), f / FPS);
    fs.writeFileSync(path.join(B, 'frames', `f${String(f).padStart(5, '0')}.jpg`), Buffer.from(b64, 'base64'));
    if (++done % 300 === 0) console.log(done + '/' + frames.length); } }));
  console.log('frames', frames.length, 'total', total); await browser.close();
})();
