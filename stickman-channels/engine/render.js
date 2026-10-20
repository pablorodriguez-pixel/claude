// node engine/render.js <id> [sheet t1 t2 ...] | [video] | [cover]
const { chromium } = require('playwright'); const { spawn } = require('child_process'); const fs = require('fs'); const path = require('path');
const ROOT = path.resolve(__dirname, '..');
(async () => {
  const [id, mode = 'video', ...rest] = process.argv.slice(2);
  const bdir = path.join(ROOT, 'build', id); const tl = JSON.parse(fs.readFileSync(path.join(bdir, 'timeline.json')));
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }).catch(() => chromium.launch());
  const pg = await b.newPage({ viewport: { width: 720, height: 1280 } });
  pg.on('console', m => console.log('[page]', m.text())); pg.on('pageerror', e => { console.error('[pageerror]', e.message); process.exitCode = 1; });
  await pg.goto('file://' + path.join(__dirname, 'render.html')); await pg.evaluate(() => window.ready);
  await pg.evaluate(tl => setup(tl), tl);
  const grab = async (t, q) => Buffer.from((await pg.evaluate(([t, q]) => frame(t, q), [t, q])).split(',')[1], 'base64');
  if (mode === 'sheet') {
    const ts = rest.length ? rest.map(Number) : tl.beats.map(x => x.start + Math.min(2.2, (x.end - x.start) * .7));
    fs.mkdirSync(path.join(bdir, 'sheet'), { recursive: true });
    for (const [i, t] of ts.entries()) fs.writeFileSync(path.join(bdir, 'sheet', `s${String(i).padStart(2, '0')}.jpg`), await grab(t, .8));
  } else if (mode === 'cover') {
    const c = tl.cover; const buf = Buffer.from((await pg.evaluate(c => coverFrame(c), c)).split(',')[1], 'base64');
    fs.mkdirSync(path.join(ROOT, 'output', 'covers'), { recursive: true }); fs.writeFileSync(path.join(ROOT, 'output', 'covers', id + '.jpg'), buf);
  } else {
    const FPS = 30, N = Math.ceil(tl.duration * FPS); fs.mkdirSync(path.join(ROOT, 'output'), { recursive: true });
    const out = path.join(ROOT, 'output', id + '.mp4');
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-i', path.join(bdir, 'mix.wav'),
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '23', '-pix_fmt', 'yuv420p', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '48000', '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    const t0 = Date.now();
    for (let i = 0; i < N; i++) { const buf = await grab(i / FPS, .92); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); if (i % 300 === 0) console.log(id, i, '/', N, ((Date.now() - t0) / 1000).toFixed(0) + 's'); }
    ff.stdin.end(); await new Promise(r => ff.on('close', r)); console.log('done', out);
  }
  await b.close();
})();
