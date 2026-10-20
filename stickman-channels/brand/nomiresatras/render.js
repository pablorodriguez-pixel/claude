// node render.js → PNG de la identidad en esta carpeta
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const P = require('./parts'); const { C } = P; const F = '../../engine/fonts';
const css = `<style>@font-face{font-family:Anton;src:url(${F}/anton-latin-400-normal.woff2)}@font-face{font-family:Montserrat;font-weight:800;src:url(${F}/montserrat-latin-800-normal.woff2)}@font-face{font-family:Montserrat;font-weight:900;src:url(${F}/montserrat-latin-900-normal.woff2)}html,body{margin:0;background:transparent}svg{display:block}</style>`;
const pieces = {
  'avatar': [1024, 1024, P.avatar(true)],
  'avatar-sin-aro': [1024, 1024, P.avatar(false)],
  'logo': [1600, 520, P.wordmark()],
  'logo-negro': [1600, 520, P.wordmark(1600, 520, true, '#111115')],
  'banner-youtube': [2560, 1440, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2560 1440" width="2560" height="1440">
    <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b0f1a"/><stop offset="1" stop-color="#030406"/></linearGradient>
    <radialGradient id="lg" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff3c4"/><stop offset=".2" stop-color="${C.amber}" stop-opacity=".8"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/></radialGradient></defs>
    <rect width="2560" height="1440" fill="url(#sky)"/>
    <path d="M0 860 L2560 860 L2560 1440 L0 1440Z" fill="#07080c"/>
    <path d="M1100 1440 L1262 860 L1298 860 L1460 1440Z" fill="#12141b"/>
    ${[0,1,2,3,4].map(i => `<path d="M${1275-i*4} ${880+i*i*28+i*40} l${8+i*8} 0 l${2+i*3} ${18+i*14} l${-(12+i*14)} 0z" fill="${C.amber}" opacity=".55"/>`).join('')}
    ${Array.from({length: 26}, (_, i) => { const x = i < 13 ? i * 92 : 1500 + (i - 13) * 85; const h = 120 + ((i * 53) % 110); return `<path d="M${x} 862 L${x + 46} ${862 - h} L${x + 92} 862Z" fill="#030406"/>`; }).join('')}
    <circle cx="2180" cy="850" r="95" fill="url(#lg)"/><circle cx="2180" cy="850" r="9" fill="#fff6d8"/>
    <g transform="translate(507 520) scale(.97)">${P.wordmark(1600, 520).replace(/<svg[^>]*>/, '').replace('</svg>', '')}</g>
    <text x="1280" y="1060" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="38" letter-spacing="8" fill="#fff" opacity=".85">NUEVA PARTE · LUN · MIÉ · VIE · 21:00</text>
    </svg>`],
};
const hl = [['PARTES', 'play'], ['VOTA', 'vote'], ['FINALES', 'fork'], ['REGLAS', 'eye']];
const icon = k => ({
  play: `<path d="M-40 -60 L70 0 L-40 60Z" fill="${C.amber}"/>`,
  vote: `<rect x="-70" y="-60" width="140" height="100" rx="24" fill="none" stroke="${C.amber}" stroke-width="16"/><path d="M-40 40 L-60 80 L0 40" fill="${C.amber}"/>`,
  fork: `<path d="M0 80 L0 10 L-55 -50 M0 10 L55 -50" fill="none" stroke="${C.amber}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/><path d="M-80 -45 L-55 -75 L-35 -40Z M80 -45 L55 -75 L35 -40Z" fill="${C.amber}"/>`,
  eye: `<ellipse cx="0" cy="0" rx="80" ry="48" fill="none" stroke="${C.amber}" stroke-width="16"/><circle r="22" fill="${C.amber}"/><path d="M-85 70 L85 -70" stroke="${C.amber}" stroke-width="16" stroke-linecap="round"/>`,
})[k];
for (const [t, k] of hl) pieces['destacado-' + t.toLowerCase()] = [1080, 1080, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080"><rect width="1080" height="1080" fill="#07090e"/><circle cx="540" cy="540" r="330" fill="#11141d"/><g transform="translate(540 480) scale(1.6)">${icon(k)}</g><text x="540" y="760" text-anchor="middle" font-family="Anton" font-size="88" letter-spacing="6" fill="#fff">${t}</text></svg>`];
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  for (const [name, [w, h, svg]] of Object.entries(pieces)) {
    const pg = await b.newPage({ viewport: { width: w, height: h } });
    const tmp = path.join(__dirname, '_tmp.html'); fs.writeFileSync(tmp, css + svg); await pg.goto('file://' + tmp);
    await pg.evaluate(async () => { await document.fonts.load('10px Anton'); await document.fonts.load('800 10px Montserrat'); await document.fonts.load('900 10px Montserrat'); });
    await pg.waitForTimeout(150); await pg.screenshot({ path: path.join(__dirname, name + '.png'), omitBackground: true });
    if (!name.startsWith('destacado') && !name.startsWith('banner')) fs.writeFileSync(path.join(__dirname, name + '.svg'), svg);
    await pg.close();
  }
  fs.unlinkSync(path.join(__dirname, '_tmp.html')); await b.close();
})();
