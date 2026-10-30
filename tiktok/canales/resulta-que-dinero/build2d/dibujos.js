// «Resulta que» del dinero — biblioteca de dibujos SVG (fondos ricos + objetos), contorno de tinta y degradados suaves.
// Todo devuelve cadenas SVG en el espacio 1080×1920.
const D = window.D = {};

// ───────── cielo, luz y clima
D.cielo = (c1, c2, c3) => `<rect width="1080" height="1920" fill="${grad(c1, c3 ? c2 : c2, 90)}"/>` + (c3 ? `<rect y="900" width="1080" height="1020" fill="${grad(c2, c3, 90)}"/>` : '');
D.estrellas = (n = 60, seed = 3) => { let s = '', r = seed; const R = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < n; i++) s += `<circle cx="${R() * 1080}" cy="${R() * 800}" r="${1 + R() * 2.5}" fill="#fff" opacity="${.3 + R() * .6}"/>`; return s };
D.copos = (id, n = 90, seed = 7) => { let s = `<g id="${id}">`, r = seed; const R = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  for (let k = 0; k < 2; k++) for (let i = 0; i < n; i++) s += `<circle cx="${R() * 1080}" cy="${R() * 1920 - k * 1920}" r="${2 + R() * 6}" fill="#fff" opacity="${.5 + R() * .5}"/>`;
  return s + '</g>' };
D.nieva = (q, lt, id = 'nieve', v = 120) => { const g = q(id); if (g) g.setAttribute('transform', `translate(${Math.sin(lt * .8) * 14},${(lt * v) % 1920})`) };
D.montes = (y, c, c2) => `<path d="M0 ${y} L140 ${y - 260} L260 ${y - 150} L420 ${y - 380} L600 ${y - 170} L760 ${y - 330} L920 ${y - 160} L1080 ${y - 290} V1920 H0Z" fill="${grad(c, c2, 90)}"/>
  <path d="M420 ${y - 380} L380 ${y - 320} L410 ${y - 330} L440 ${y - 300} L470 ${y - 340}Z M760 ${y - 330} L725 ${y - 280} L760 ${y - 295} L795 ${y - 275}Z" fill="#fff" opacity=".85"/>`;
D.pinos = (y, n, c = '#1d3b4a', seed = 5, esc = 1) => { let s = '', r = seed; const R = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < n; i++) { const x = R() * 1080, h = (120 + R() * 140) * esc, w = h * .42;
    s += `<path d="M${x} ${y - h} L${x - w} ${y} H${x + w}Z" fill="${c}"/><path d="M${x} ${y - h} L${x - w * .55} ${y - h * .45} q${w * .55} 14 ${w * 1.1} 0Z" fill="#fff" opacity=".8"/>` } return s };
D.suelo = (y, c1 = '#eef3fb', c2 = '#c9d6ea') => `<path d="M0 ${y} Q540 ${y - 40} 1080 ${y} V1920 H0Z" fill="${grad(c1, c2, 90)}"/>`;

// casas de pueblo de Vermont (madera, tejado nevado, ventanas encendidas)
D.casa = (x, y, w, h, c, techo = '#5a3a32', luz = true) => `<g>
  <rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${grad(c, shade(c, -30), 0)}" ${OL}/>
  ${[...Array(Math.floor(h / 28))].map((_, i) => `<path d="M${x} ${y - h + 28 * (i + 1)} h${w}" stroke="${shade(c, -35)}" stroke-width="3" opacity=".5"/>`).join('')}
  <path d="M${x - 24} ${y - h} L${x + w / 2} ${y - h - w * .45} L${x + w + 24} ${y - h}Z" fill="${techo}" ${OL}/>
  <path d="M${x - 24} ${y - h} L${x + w / 2} ${y - h - w * .45} L${x + w + 24} ${y - h} q-30 -14 -50 -2 q-40 -26 -80 -6 q-50 -30 -90 0Z" fill="#fff" ${OL}/>
  <rect x="${x + w * .18}" y="${y - h * .62}" width="${w * .22}" height="${h * .26}" fill="${luz ? '#ffd879' : '#3b4660'}" ${OL}/>
  <rect x="${x + w * .6}" y="${y - h * .62}" width="${w * .22}" height="${h * .26}" fill="${luz ? '#ffd879' : '#3b4660'}" ${OL}/>
  ${luz ? brillo(x + w * .29, y - h * .5, 70, '#ffcf6b', .35) + brillo(x + w * .71, y - h * .5, 70, '#ffcf6b', .35) : ''}
  <rect x="${x + w * .42}" y="${y - h * .32}" width="${w * .16}" height="${h * .32}" fill="#6b3d2a" ${OL}/></g>`;
D.pueblo = (y, noche = false) => D.casa(-40, y, 260, 230, '#c0453a', '#4a2e28', noche) + D.casa(270, y + 10, 220, 200, '#e8d9b8', '#4a3a32', noche)
  + D.casa(540, y - 6, 240, 250, '#3f6e8c', '#3a2e2e', noche) + D.casa(830, y + 6, 260, 220, '#d9b04a', '#4a2e28', noche);

// ───────── objetos
D.coche = (x, y, s = 1, c = '#8a5a3c') => `<g transform="translate(${x},${y}) scale(${s})">
  <ellipse cx="0" cy="8" rx="250" ry="22" fill="#000" opacity=".25"/>
  <path d="M-240 -10 v-70 q0 -20 20 -24 l80 -10 l50 -70 q10 -14 30 -14 h190 q20 0 32 14 l50 64 q60 6 60 40 v70 z" fill="${grad(c, shade(c, -40), 90)}" ${OL}/>
  <path d="M-100 -110 l40 -56 h80 v56z M40 -110 v-56 h90 l42 56z" fill="${grad('#bfe0ef', '#7fa9c2', 90)}" ${OL}/>
  <path d="M-240 -46 h480" stroke="#e8d6a8" stroke-width="10"/>
  <circle cx="-150" cy="-6" r="46" fill="#222" ${OL}/><circle cx="-150" cy="-6" r="20" fill="#9aa"/>
  <circle cx="150" cy="-6" r="46" fill="#222" ${OL}/><circle cx="150" cy="-6" r="20" fill="#9aa"/>
  <rect x="200" y="-70" width="34" height="20" rx="6" fill="#ffe9a8" ${OL}/>
  <path d="M-60 -60 l14 -4 l8 10" stroke="#5a3a28" stroke-width="5" fill="none"/><circle cx="20" cy="-36" r="9" fill="#6b3a24" opacity=".7"/><circle cx="-180" cy="-60" r="12" fill="#6b3a24" opacity=".6"/></g>`;
D.humo = (id, x, y) => `<g id="${id}" transform="translate(${x},${y})">${[0, 1, 2, 3].map(i => `<circle class="h" cx="${-i * 40}" cy="${-i * 12}" r="${16 + i * 10}" fill="#dfe6ee" opacity="${.7 - i * .15}"/>`).join('')}</g>`;
D.parquimetro = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-10" y="-300" width="20" height="300" fill="#556" ${OL}/>
  <path d="M-60 -300 v-120 q0 -60 60 -60 q60 0 60 60 v120 z" fill="${grad('#c9ced6', '#7d8590', 0)}" ${OL}/>
  <path d="M-38 -400 q0 -40 38 -40 q38 0 38 40 v30 h-76z" fill="#fff8d6" ${OL}/><path d="M0 -410 l20 -18" ${OL}/><text x="0" y="-330" font-family="Figtree" font-weight="800" font-size="30" text-anchor="middle" fill="${TINTA}">25¢</text>
  <rect x="-30" y="-350" width="60" height="10" rx="5" fill="${TINTA}"/></g>`;
D.imperdible = (x, y, s = 1, rot = 0, abierto = 0) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
  <path d="M-110 0 q-30 0 -30 -26 q0 -26 30 -26 h200" fill="none" stroke="${grad('#f4f6f8', '#8d97a3', 90)}" stroke-width="16" stroke-linecap="round"/>
  <path d="M-110 0 h${190 - abierto * 40}" transform="rotate(${-abierto * 18} -110 0)" fill="none" stroke="#c4ccd6" stroke-width="16" stroke-linecap="round"/>
  <path d="M60 -70 h60 q26 0 26 30 v20 q0 30 -26 30 h-60z" fill="${grad('#f6f7f9', '#9aa4b0', 90)}" ${OL}/>
  <path d="M-110 0 q-30 0 -30 -26 q0 -26 30 -26 h200" fill="none" stroke="${TINTA}" stroke-width="4" opacity=".4"/></g>`;
D.abrigoTela = (c = '#7a5236') => `<rect width="1080" height="1920" fill="${grad(c, shade(c, -50), 20)}"/>
  ${[...Array(40)].map((_, i) => `<path d="M${i * 30 - 200} 0 l600 1920" stroke="${shade(c, -25)}" stroke-width="6" opacity=".25"/>`).join('')}
  <path d="M520 -20 q-40 600 30 1960" stroke="${shade(c, -60)}" stroke-width="16" fill="none" opacity=".7"/>
  <path d="M560 -20 q-30 600 40 1960 L1100 1960 V-20Z" fill="${shade(c, 10)}" opacity=".35"/>`;
D.boton = (x, y, r = 40, c = '#3a2a1e') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${grad(shade(c, 30), c, 90)}" ${OL}/><circle cx="${x - 10}" cy="${y - 8}" r="5" fill="${TINTA}"/><circle cx="${x + 10}" cy="${y - 8}" r="5" fill="${TINTA}"/><circle cx="${x - 10}" cy="${y + 8}" r="5" fill="${TINTA}"/><circle cx="${x + 10}" cy="${y + 8}" r="5" fill="${TINTA}"/>`;
D.papel = (x, y, w, h, rot = 0, c = '#fbf3df') => `<g transform="translate(${x},${y}) rotate(${rot})"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="8" fill="${grad(c, shade(c, -18), 90)}" ${OL}/>
  ${[...Array(Math.floor(h / 40) - 2)].map((_, i) => `<path d="M${-w / 2 + 40} ${-h / 2 + 70 + i * 40} h${w - 80 - (i % 3) * 60}" stroke="#a89a7c" stroke-width="6" stroke-linecap="round"/>`).join('')}</g>`;
D.sello = (x, y, txt, c = '#c0392b', rot = -12, s = 1) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><rect x="-230" y="-70" width="460" height="140" rx="20" fill="none" stroke="${c}" stroke-width="12"/>
  <text x="0" y="24" font-family="Figtree" font-weight="800" font-size="78" text-anchor="middle" fill="${c}">${txt}</text></g>`;
D.surtidor = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-80" y="-420" width="160" height="420" rx="30" fill="${grad('#e04a3a', '#9e2a20', 0)}" ${OL}/>
  <circle cx="0" cy="-470" r="66" fill="#fff6d8" ${OL}/><text x="0" y="-452" font-family="Figtree" font-weight="800" font-size="44" text-anchor="middle" fill="#c0392b">GAS</text>
  <rect x="-50" y="-360" width="100" height="90" rx="10" fill="#fff6d8" ${OL}/><path d="M-30 -330 h60 M-30 -300 h40" stroke="${TINTA}" stroke-width="5"/>
  <path d="M80 -250 q70 0 70 90 v100" stroke="${TINTA}" stroke-width="16" fill="none"/></g>`;
D.reloj = (id, x, y, r = 90) => `<g transform="translate(${x},${y})"><circle r="${r}" fill="#fff8e6" ${OL}/>${[...Array(12)].map((_, i) => `<path d="M0 ${-r + 12} v14" transform="rotate(${i * 30})" ${OL}/>`).join('')}
  <path id="${id}h" d="M0 0 v${-r * .5}" ${OL} stroke-width="9"/><path id="${id}m" d="M0 0 v${-r * .78}" ${OL}/><circle r="8" fill="${TINTA}"/></g>`;
D.gira = (q, id, ang, x, y) => { const e = q(id); if (e) e.setAttribute('transform', `rotate(${ang})`) };
D.fregona = (x, y, rot = 0) => `<g transform="translate(${x},${y}) rotate(${rot})"><path d="M0 0 v-380" stroke="#c49a5a" stroke-width="16" stroke-linecap="round"/><path d="M-50 0 q50 -40 100 0 l10 50 q-60 20 -120 0z" fill="#e9e2cf" ${OL}/></g>`;
D.cubo = (x, y) => `<g transform="translate(${x},${y})"><path d="M-60 -120 h120 l-14 120 h-92z" fill="${grad('#f2c94c', '#c99a1c', 0)}" ${OL}/><path d="M-60 -120 q60 -70 120 0" fill="none" ${OL}/></g>`;
D.taza = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-50 -90 h100 l-10 90 h-80z" fill="#fff" ${OL}/><path d="M50 -70 q36 0 30 30 q-6 24 -36 20" fill="none" ${OL}/><ellipse cx="0" cy="-90" rx="50" ry="10" fill="#6b4226" ${OL}/>
  <path d="M-14 -110 q-12 -24 6 -44 M14 -110 q-12 -24 6 -44" stroke="#ccc" stroke-width="6" fill="none" opacity=".8"/></g>`;
D.tronco = (x, y, partido = 0) => `<g transform="translate(${x},${y})"><rect x="-150" y="-60" width="300" height="80" rx="20" fill="#7a5130" ${OL}/>
  <g transform="translate(${-partido * 60},${-partido * 30}) rotate(${-partido * 20})"><path d="M-70 -60 v-150 h65 v150z" fill="#c9965c" ${OL}/><ellipse cx="-37" cy="-210" rx="33" ry="12" fill="#e6c08a" ${OL}/></g>
  <g transform="translate(${partido * 60},${-partido * 30}) rotate(${partido * 20})"><path d="M5 -60 v-150 h65 v150z" fill="#c9965c" ${OL}/><ellipse cx="37" cy="-210" rx="33" ry="12" fill="#e6c08a" ${OL}/></g></g>`;
D.hacha = (id, x, y, rot) => `<g id="${id}" transform="translate(${x},${y}) rotate(${rot})"><path d="M0 0 v-300" stroke="#8a5a2c" stroke-width="22" stroke-linecap="round"/><path d="M-10 -300 h-80 q-20 40 0 90 h80z" fill="${grad('#dfe4ea', '#8a95a3', 0)}" ${OL}/></g>`;
D.cofre = (x, y) => `<g transform="translate(${x},${y})"><rect x="-120" y="-90" width="240" height="140" rx="16" fill="#8a5a2c" ${OL}/><path d="M-120 -90 q120 -100 240 0" fill="#a8703a" ${OL}/><rect x="-20" y="-40" width="40" height="50" rx="6" fill="#f5c542" ${OL}/></g>`;
D.boleto = (x, y) => `<g transform="translate(${x},${y}) rotate(-8)"><rect x="-150" y="-80" width="300" height="160" rx="14" fill="#7fd1ae" ${OL}/><text x="0" y="-20" font-family="Figtree" font-weight="800" font-size="40" text-anchor="middle" fill="${TINTA}">LOTERÍA</text>
  <text x="0" y="40" font-family="Figtree" font-weight="800" font-size="44" text-anchor="middle" fill="${TINTA}">0 7 3 1 9</text></g>`;
D.nomina = (x, y) => `<g transform="translate(${x},${y}) rotate(6)"><rect x="-120" y="-150" width="240" height="300" rx="12" fill="#fff" ${OL}/><text x="0" y="-90" font-family="Figtree" font-weight="800" font-size="34" text-anchor="middle" fill="${TINTA}">NÓMINA</text>
  <path d="M-80 -40 h160 M-80 0 h120 M-80 40 h140" stroke="#bbb" stroke-width="10" stroke-linecap="round"/><text x="60" y="110" font-family="Figtree" font-weight="800" font-size="44" text-anchor="middle" fill="#c0392b">$</text></g>`;
D.tachon = (id, x, y, s = 1) => `<g id="${id}" transform="translate(${x},${y}) scale(${s})"><path d="M-150 -150 L150 150 M150 -150 L-150 150" stroke="#e23b2e" stroke-width="40" stroke-linecap="round"/><path d="M-150 -150 L150 150 M150 -150 L-150 150" stroke="${TINTA}" stroke-width="52" stroke-linecap="round" opacity=".25"/></g>`;
D.sillon = (x, y, c = '#8c3b3b') => `<g transform="translate(${x},${y})"><rect x="-200" y="-420" width="400" height="300" rx="80" fill="${grad(c, shade(c, -40), 0)}" ${OL}/>
  <rect x="-240" y="-200" width="90" height="200" rx="40" fill="${shade(c, -10)}" ${OL}/><rect x="150" y="-200" width="90" height="200" rx="40" fill="${shade(c, -10)}" ${OL}/>
  <rect x="-160" y="-170" width="320" height="120" rx="30" fill="${shade(c, 15)}" ${OL}/><path d="M-160 -50 v60 M160 -50 v60" ${OL} stroke-width="14"/></g>`;
D.ventana = (x, y, w, h, noche = true) => `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${noche ? grad('#1c2a4d', '#3c4f7a', 90) : grad('#bfe0ff', '#eaf6ff', 90)}" ${OL}/>
  <path d="M${x + w / 2} ${y} v${h} M${x} ${y + h / 2} h${w}" stroke="#6b4a30" stroke-width="16"/><rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 28}" fill="none" stroke="#6b4a30" stroke-width="22"/></g>`;
D.cajas = (cols, filas, x0, y0, w, h) => { let s = ''; for (let i = 0; i < cols; i++) for (let j = 0; j < filas; j++) {
  const x = x0 + i * w, y = y0 + j * h; s += `<rect x="${x}" y="${y}" width="${w - 8}" height="${h - 8}" rx="6" fill="${grad('#d8dde4', '#9aa3ae', 90)}" ${OL}/><circle cx="${x + w - 30}" cy="${y + h / 2 - 4}" r="9" fill="#5a6270"/><rect x="${x + 16}" y="${y + h / 2 - 12}" width="${w * .35}" height="16" rx="4" fill="#fff" opacity=".6"/>` } return s };
D.certificado = (x, y, s = 1, rot = 0, txt = 'ACCIONES', c = '#2f7d5b') => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><rect x="-170" y="-110" width="340" height="220" rx="10" fill="#fbf4dc" ${OL}/>
  <rect x="-150" y="-90" width="300" height="180" rx="6" fill="none" stroke="${c}" stroke-width="8"/><text x="0" y="-30" font-family="Figtree" font-weight="800" font-size="36" text-anchor="middle" fill="${c}">${txt}</text>
  <path d="M-100 10 h200 M-80 40 h160" stroke="${c}" stroke-width="6" opacity=".5"/><circle cx="110" cy="62" r="24" fill="#d9b04a" ${OL}/></g>`;
D.pilaCert = (x, y, n, id = 'pila') => `<g id="${id}" transform="translate(${x},${y})">${[...Array(n)].map((_, i) => `<g class="c" transform="translate(${(i % 3 - 1) * 4},${-i * 9})"><rect x="-170" y="-14" width="340" height="16" rx="3" fill="${i % 2 ? '#fbf4dc' : '#efe4c2'}" ${OL} stroke-width="3"/></g>`).join('')}</g>`;
D.regla = (x, y, h) => `<g transform="translate(${x},${y})"><rect x="0" y="${-h}" width="60" height="${h}" fill="#f5d36b" ${OL}/>${[...Array(Math.floor(h / 20))].map((_, i) => `<path d="M0 ${-i * 20} h${i % 5 ? 18 : 34}" stroke="${TINTA}" stroke-width="4"/>`).join('')}</g>`;
D.biblioteca = (x, y) => `<g transform="translate(${x},${y})"><rect x="-420" y="-520" width="840" height="520" fill="${grad('#efe2c8', '#c9b48e', 90)}" ${OL}/>
  <path d="M-460 -520 L0 -760 L460 -520Z" fill="${grad('#d9c7a2', '#a9936b', 90)}" ${OL}/>${[-300, -150, 0, 150, 300].map(c => `<rect x="${c - 30}" y="-500" width="60" height="460" fill="${grad('#fffaf0', '#d6c7a6', 0)}" ${OL}/>`).join('')}
  <rect x="-470" y="-40" width="940" height="60" fill="#bfa982" ${OL}/><text x="0" y="-560" font-family="Figtree" font-weight="800" font-size="46" text-anchor="middle" fill="${TINTA}">BIBLIOTECA</text></g>`;
D.hospital = (x, y) => `<g transform="translate(${x},${y})"><rect x="-360" y="-560" width="720" height="560" fill="${grad('#f4f7fb', '#c6d2e2', 90)}" ${OL}/>
  ${[0, 1, 2, 3].map(r => [0, 1, 2, 3, 4].map(c => `<rect x="${-300 + c * 125}" y="${-500 + r * 110}" width="80" height="70" fill="#9fd0f0" ${OL}/>`).join('')).join('')}
  <rect x="-70" y="-700" width="140" height="140" rx="14" fill="#fff" ${OL}/><path d="M0 -680 v100 M-50 -630 h100" stroke="#e23b2e" stroke-width="34"/></g>`;
D.cheque = (id, x, y, txt, s = 1) => `<g id="${id}" transform="translate(${x},${y}) scale(${s})"><rect x="-330" y="-120" width="660" height="240" rx="18" fill="${grad('#e9fff1', '#bfe8cf', 90)}" ${OL}/>
  <text x="-290" y="-60" font-family="Figtree" font-weight="800" font-size="30" fill="#2f6b4b">PÁGUESE A</text><text x="0" y="40" font-family="Figtree" font-weight="800" font-size="96" text-anchor="middle" fill="${TINTA}">${txt}</text>
  <path d="M120 90 q40 -30 80 0 t80 0" stroke="${TINTA}" stroke-width="5" fill="none"/></g>`;
D.mesa = (y, c = '#8a5a3c') => `<rect x="-20" y="${y}" width="1120" height="${1940 - y}" fill="${grad(c, shade(c, -50), 90)}"/><path d="M-20 ${y} h1120" stroke="${shade(c, 30)}" stroke-width="10"/>`;
D.tarro = (x, y, nivel = .3, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-120" y="-300" width="240" height="300" rx="40" fill="#cfe9f5" opacity=".55" ${OL}/>
  <rect x="-108" y="${-288 * nivel}" width="216" height="${288 * nivel - 12}" rx="30" fill="${grad('#ffd75e', '#c98f1c', 90)}"/>
  <rect x="-130" y="-330" width="260" height="40" rx="12" fill="#b88a3a" ${OL}/><path d="M-90 -260 v200" stroke="#fff" stroke-width="14" opacity=".55" stroke-linecap="round"/></g>`;
D.moneda = (x, y, r = 40, id = '') => `<g ${id ? `id="${id}"` : ''} transform="translate(${x},${y})"><circle r="${r}" fill="${grad('#ffe08a', '#d39a1c', 90)}" ${OL}/><circle r="${r * .7}" fill="none" stroke="#b07a12" stroke-width="5"/><text y="${r * .32}" font-family="Figtree" font-weight="800" font-size="${r}" text-anchor="middle" fill="#a06a0a">$</text></g>`;
D.pasta = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-160 -50 h280 l40 20 v60 l-40 20 h-280 q-20 -50 0 -100z" fill="${grad('#ffffff', '#cfd8e2', 90)}" ${OL}/><path d="M-120 -30 h200" stroke="#2f80ed" stroke-width="22"/><path d="M-120 10 h140" stroke="#e23b2e" stroke-width="16"/><rect x="160" y="-24" width="50" height="48" rx="8" fill="#2f80ed" ${OL}/></g>`;
D.frasco = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-90" y="-200" width="180" height="200" rx="26" fill="${grad('#e48a3a', '#a85a1a', 0)}" opacity=".95" ${OL}/><rect x="-100" y="-250" width="200" height="56" rx="12" fill="#fff" ${OL}/><rect x="-70" y="-150" width="140" height="90" rx="8" fill="#fff" ${OL}/><path d="M0 -136 v62 M-31 -105 h62" stroke="#e23b2e" stroke-width="18"/></g>`;
D.banco = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-200" y="-260" width="400" height="260" fill="${grad('#eef1f6', '#b6c0cf', 90)}" ${OL}/><path d="M-230 -260 L0 -380 L230 -260Z" fill="#cfd6e2" ${OL}/>
  ${[-130, -45, 45, 130].map(c => `<rect x="${c - 20}" y="-240" width="40" height="220" fill="#fff" ${OL}/>`).join('')}<text x="0" y="-290" font-family="Figtree" font-weight="800" font-size="40" text-anchor="middle" fill="${TINTA}">BANK</text></g>`;
D.flecha = (x1, y1, x2, y2, c = '#fff', id = '') => `<g ${id ? `id="${id}"` : ''}><path d="M${x1} ${y1} Q${(x1 + x2) / 2 + (y2 - y1) * .3} ${(y1 + y2) / 2 - (x2 - x1) * .3} ${x2} ${y2}" stroke="${c}" stroke-width="14" fill="none" stroke-linecap="round" stroke-dasharray="4 26"/>
  <circle cx="${x2}" cy="${y2}" r="16" fill="${c}"/></g>`;
D.grafico = (id, pts, c = '#e23b2e') => `<path id="${id}" d="M${pts.map(([x, y]) => `${x} ${y}`).join(' L')}" stroke="${c}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
D.periodico = (x, y, txt, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-200" y="-140" width="400" height="280" fill="#f3efe4" ${OL}/><text x="0" y="-80" font-family="Figtree" font-weight="800" font-size="44" text-anchor="middle" fill="${TINTA}">${txt}</text>
  <path d="M-170 -40 h340 M-170 -10 h300 M-170 20 h340 M-170 50 h260 M-170 80 h320" stroke="#b5ad9a" stroke-width="10"/></g>`;
D.percha = (x, y) => `<g transform="translate(${x},${y})"><path d="M0 -40 q0 -40 30 -40 q30 0 30 30" fill="none" ${OL}/><path d="M-200 60 L0 -20 L200 60" fill="none" ${OL} stroke-width="10"/></g>`;
D.abrigo = (x, y, s = 1, c = '#7a5236') => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-200 0 q-40 300 -60 760 h520 q-20 -460 -60 -760 q-80 -30 -200 -30 q-120 0 -200 30z" fill="${grad(c, shade(c, -40), 0)}" ${OL}/>
  <path d="M0 -30 v790" stroke="${shade(c, -50)}" stroke-width="10"/><path d="M-200 0 q-140 160 -150 460 l70 10 q10 -260 100 -380 M200 0 q140 160 150 460 l-70 10 q-10 -260 -100 -380" fill="${shade(c, -15)}" ${OL}/>
  <path d="M-110 -26 l110 140 l110 -140" fill="${shade(c, -30)}" ${OL}/>${[160, 330, 500].map(yy => D.imperdible(10, yy, .5, 0)).join('')}</g>`;
D.placa = (x, y, txt) => `<g transform="translate(${x},${y})"><rect x="-240" y="-60" width="480" height="120" rx="12" fill="${grad('#f2d27a', '#b88a2a', 90)}" ${OL}/><text x="0" y="16" font-family="Figtree" font-weight="800" font-size="40" text-anchor="middle" fill="#4a3410">${txt}</text></g>`;
D.estanteria = (x, y, w, h, seed = 11) => { let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#5a3a24" ${OL}/>`, r = seed; const R = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  const cs = ['#c0453a', '#2f6b8c', '#d9b04a', '#3f8c5a', '#7a4a8c', '#e07a3a'];
  for (let f = 0; f < Math.floor(h / 140); f++) { let bx = x + 14; const by = y + 20 + f * 140;
    while (bx < x + w - 40) { const bw = 22 + R() * 26, bh = 90 + R() * 30; s += `<rect x="${bx}" y="${by + 110 - bh}" width="${bw}" height="${bh}" fill="${cs[Math.floor(R() * cs.length)]}" stroke="${TINTA}" stroke-width="3"/>`; bx += bw + 3 }
    s += `<rect x="${x}" y="${by + 110}" width="${w}" height="16" fill="#3e2716"/>` } return s };
