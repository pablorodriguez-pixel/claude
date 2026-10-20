// Piezas SVG de la identidad «No mires atrás»
const C = { night: '#07090e', asphalt: '#1a1d26', amber: '#ffc24d', red: '#e5383b', ecg: '#3dff8a', gps: '#3d8bff', bone: '#ecebe6' };
// retrovisor con algo asomando: el plano firma de la serie
const mirror = (id) => `
<defs>
 <radialGradient id="${id}bg" cx="50%" cy="42%" r="62%"><stop offset="0" stop-color="#1c2232"/><stop offset="1" stop-color="#040508"/></radialGradient>
 <linearGradient id="${id}gl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3558"/><stop offset=".55" stop-color="#121a2a"/><stop offset="1" stop-color="#06070b"/></linearGradient>
 <radialGradient id="${id}lan" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff3c4"/><stop offset=".25" stop-color="${C.amber}" stop-opacity=".9"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/></radialGradient>
 <radialGradient id="${id}hl" cx="50%" cy="100%" r="70%"><stop offset="0" stop-color="${C.amber}" stop-opacity=".22"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/></radialGradient>
 <clipPath id="${id}cg"><rect x="182" y="330" width="660" height="290" rx="100"/></clipPath>
</defs>
<g transform="rotate(-5 512 480)">
 <rect x="490" y="150" width="44" height="170" rx="16" fill="#0d0f14"/>
 <rect x="150" y="300" width="724" height="350" rx="128" fill="#0b0d12" stroke="#2c303b" stroke-width="12"/>
 <rect x="182" y="330" width="660" height="290" rx="100" fill="url(#${id}gl)"/>
 <g clip-path="url(#${id}cg)">
  <path d="M182 470 L842 470 L842 620 L182 620Z" fill="#0a0c11"/>
  <path d="M440 620 L500 470 L524 470 L584 620Z" fill="#161922"/>
  <path d="M507 480 L517 480 L519 500 L505 500Z M503 515 L521 515 L524 545 L500 545Z" fill="${C.amber}" opacity=".7"/>
  <path d="M182 470 L230 400 L262 470 Z M250 470 L300 380 L345 470Z M330 470 L372 410 L410 470Z M610 470 L655 395 L700 470Z M680 470 L735 375 L790 470Z M770 470 L815 410 L842 450 L842 470Z" fill="#05070a"/>
  <circle cx="626" cy="455" r="70" fill="url(#${id}lan)"/>
  <circle cx="626" cy="455" r="9" fill="#fff6d8"/>
  <path d="M621 466 L621 492 M631 466 L631 492 M626 440 L626 466" stroke="#05070a" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="512" cy="700" rx="230" ry="170" fill="${C.bone}"/>
  <ellipse cx="430" cy="585" rx="58" ry="40" fill="#fff" stroke="#111" stroke-width="9"/>
  <ellipse cx="594" cy="585" rx="58" ry="40" fill="#fff" stroke="#111" stroke-width="9"/>
  <circle cx="448" cy="590" r="19" fill="#111"/><circle cx="612" cy="590" r="19" fill="#111"/>
  <rect x="182" y="330" width="660" height="70" fill="#fff" opacity=".05"/>
 </g>
</g>`;
const avatar = (ring = true) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
<circle cx="512" cy="512" r="512" fill="#05060a"/>
${mirror('a').replace('<g transform="rotate', '<circle cx="512" cy="512" r="512" fill="url(#abg)"/><circle cx="512" cy="512" r="512" fill="url(#ahl)"/><g transform="translate(512 540) scale(1.16) translate(-512 -480)"><g transform="rotate')}</g>
${ring ? `<circle cx="512" cy="512" r="494" fill="none" stroke="${C.amber}" stroke-width="12" opacity=".85"/>` : ''}
</svg>`;
// logotipo: el acento de la Á es la luz del farol
const wordmark = (w = 1600, h = 520, tag = true, col = '#fff') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 520" width="${w}" height="${h}">
<defs><filter id="wg" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10"/></filter></defs>
<text x="800" y="300" text-anchor="middle" font-family="Anton" font-size="230" letter-spacing="6" textLength="1440" lengthAdjust="spacingAndGlyphs" fill="${col}">NO MIRES ATR<tspan fill="${C.amber}">Á</tspan>S</text>
<path d="M170 380 L640 380 L668 340 L700 408 L732 330 L758 380 L1430 380" fill="none" stroke="${C.amber}" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"/>
${tag ? `<text x="800" y="470" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="40" letter-spacing="10" fill="${col}" opacity=".75">HISTORIAS DONDE TÚ ERES EL PROTAGONISTA</text>` : ''}
</svg>`;
module.exports = { C, avatar, wordmark, mirror };
