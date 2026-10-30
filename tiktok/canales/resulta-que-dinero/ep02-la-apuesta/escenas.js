// EP02 — «La apuesta» (Warren Buffett contra los fondos de Wall Street, 2008-2017). Explica: comisiones y fondos indexados.
const T = (w, n = 1) => vt(w, n);
const BUF = (o) => persona(Object.assign({ ropa: '#56688f', canas: '#f2f2f2', gafas: true, cara: 'sonrisa', traje: true, corbata: '#b8323a' }, o));
const GES = (o) => persona(Object.assign({ ropa: '#1f2633', pelo: '#2a1c14', cara: 'serio', traje: true, corbata: '#3a5ba0', peinado: 'tupe' }, o));
const calle = (noche = false) => D.cielo(noche ? '#14203d' : '#bcd9f2', noche ? '#3a4a78' : '#f3e6cf') + D.rascacielos(1350, 13, noche) + `<rect y="1350" width="1080" height="570" fill="${grad('#9aa3b2', '#5a6272', 90)}"/><path d="M0 1500 h1080" stroke="#fff" stroke-width="10" stroke-dasharray="60 50" opacity=".6"/>`;
// el gráfico de la carrera: fondo indexado (S&P 500) contra la media de los fondos elegidos, en % acumulado
const SP = [0, -37, -20.4, -8.4, -6.5, 8.4, 43.4, 63, 65.7, 85.4, 125.8], EX = [0, -24, -11, -7, -12, -6, 4, 8, 6, 17, 36];
const X0 = 110, X1 = 980, Y0 = 1150, ESC = 3.2;   // y del 0 %, píxeles por punto %
const px = i => X0 + (X1 - X0) * i / 10, py = v => Y0 - v * ESC;
function linea(serie, u, c) { const n = Math.floor(u), f = u - n, pts = serie.slice(0, n + 1).map((v, i) => [px(i), py(v)]);
  if (n < 10) pts.push([px(n + f), py(lerp(serie[n], serie[n + 1], f))]);
  const [lx, ly] = pts.at(-1); return `<path d="M${pts.map(q => q.join(' ')).join(' L')}" stroke="${c}" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${lx}" cy="${ly}" r="22" fill="${c}" ${OL}/>` }
function carrera(u) { const n = Math.min(10, u), i = Math.min(10, Math.round(n));
  const v = k => { const a = Math.floor(n), f = n - a; return a >= 10 ? k[10] : lerp(k[a], k[a + 1], f) };
  return D.ejes(X0 - 20, py(0) + 260, X1 - X0 + 40, 900) + `<path d="M${X0} ${py(0)} H${X1}" stroke="#fff" stroke-width="5" stroke-dasharray="14 14" opacity=".6"/>`
    + linea(EX, n, '#9aa6b8') + linea(SP, n, '#ffcf3d')
    + `<text x="540" y="430" font-family="Figtree" font-weight="800" font-size="110" text-anchor="middle" fill="#fff" stroke="${TINTA}" stroke-width="14" paint-order="stroke">${2007 + i}</text>`
    + `<g font-family="Figtree" font-weight="800" font-size="54" stroke="${TINTA}" stroke-width="10" paint-order="stroke"><text x="110" y="560" fill="#ffcf3d">FONDO QUE NO HACE NADA ${v(SP) >= 0 ? '+' : ''}${Math.round(v(SP))} %</text>
       <text x="110" y="630" fill="#c9d2e0">EXPERTOS ${v(EX) >= 0 ? '+' : ''}${Math.round(v(EX))} %</text></g>` }

// 1 · «En 2007, el inversor más famoso del mundo apostó un millón de dólares contra los mejores gestores de Wall Street»
plano({ t0: 0, fondo: calle() + D.cartelWS(860, 1170), frente: `<g id="b1">${BUF({ x: 360, y: 1760, s: 1.05, brazo: 'delante' })}</g><g id="m1"></g>`,
  cam: [[0, 540, 1150, 1.25], [5.7, 540, 1250, 1.05]], desenfoque: 3,
  anim: (lt, q, t) => { const k = p(t, T('millon') - .1, .5); q('m1').innerHTML = k > 0 ? `<g transform="translate(0,${-(1 - eo(k)) * 700})">${D.millon(760, 1760, .55)}</g>` : '' } });
// 2 · «Y apostó por algo que no hace nada» — la cesta con TODA LA BOLSA, dormida
plano({ t0: T('y') - .05, entrada: 'zoom', fondo: `<rect width="1080" height="1920" fill="${grad('#ffe7b0', '#f2b46a', 90)}"/>` + brillo(540, 1000, 700, '#fff6d8', .6),
  frente: D.cesta(540, 1400, 1.7, false) + `<g id="z2"></g>`, cam: [[0, 540, 1150, 1.0], [1.6, 540, 1100, 1.15]],
  anim: (lt, q, t) => { const k = p(t, T('nada') - .05, .3); q('z2').innerHTML = k > 0 ? `<text x="780" y="${720 - lt * 30}" font-family="Figtree" font-weight="800" font-size="${120 * eo(k)}" fill="#9fc2ff" stroke="${TINTA}" stroke-width="10" paint-order="stroke">z z z</text>` : '' } });
// 3 · «Se llamaba Warren Buffett»
plano({ t0: T('se') - .05, entrada: 'barrido', fondo: `<rect width="1080" height="1920" fill="${grad('#6d1f2b', '#2a0c12', 90)}"/>` + D.estanteria(0, 300, 1080, 900, 23) + brillo(540, 700, 600, '#ffd28a', .35),
  frente: BUF({ x: 540, y: 1760, s: 1.35 }) + `<g id="n3"><rect x="200" y="1330" width="680" height="110" rx="55" fill="#fff" ${OL}/><text x="540" y="1405" font-family="Figtree" font-weight="800" font-size="60" text-anchor="middle" fill="${TINTA}">WARREN BUFFETT</text></g>`,
  cam: [[0, 540, 1050, 1.12], [1.4, 540, 1000, 1.2]], desenfoque: 6,
  anim: (lt, q, t) => { const k = p(t, T('warren') - .05, .25); q('n3').setAttribute('opacity', eo(k)); q('n3').setAttribute('transform', `translate(0,${(1 - eo(k)) * 40})`) } });
// 4 · «Dijo: en diez años, un fondo que compra toda la bolsa… ganará a los profesionales que elijáis»
plano({ t0: T('dijo') - .05, entrada: 'barrido', fondo: calle() , frente: BUF({ x: 300, y: 1800, s: 1.05, cara: 'feliz', brazo: 'arriba' }) + `<g id="bu4"></g>`,
  cam: [[0, 420, 1300, 1.15], [6.6, 540, 1150, 1.05]], desenfoque: 4,
  anim: (lt, q, t) => { const k1 = p(t, T('diez') - .05, .25), k2 = p(t, T('fondo') - .05, .3), k3 = p(t, T('profesionales') - .05, .3);
    q('bu4').innerHTML = `<g opacity="${eo(k1)}"><path d="M560 380 h440 q40 0 40 40 v700 q0 40 -40 40 h-300 l-90 100 l10 -100 h-60 q-40 0 -40 -40 v-700 q0 -40 40 -40z" fill="#fff" ${OL}/>
      <text x="780" y="520" font-family="Figtree" font-weight="800" font-size="90" text-anchor="middle" fill="${TINTA}">10 AÑOS</text></g>`
      + (k2 > 0 ? `<g opacity="${eo(k2)}">${D.cesta(780, 900, .7, false)}</g>` : '')
      + (k3 > 0 ? `<g opacity="${eo(k3)}"><text x="780" y="1010" font-family="Figtree" font-weight="800" font-size="80" text-anchor="middle" fill="#2e8b57">&gt;</text>${[0, 1, 2].map(i => GES({ x: 690 + i * 90, y: 1130, s: .22 })).join('')}</g>` : '') } });
// 5 · «Casi nadie se atrevió. Hasta que un gestor de Nueva York aceptó»
plano({ t0: T('casi') - .05, entrada: 'barrido', dir: -1, fondo: calle() + `<rect y="0" width="1080" height="1920" fill="#000" opacity=".15"/>`,
  frente: `<g id="g5"></g>`, cam: [[0, 540, 1300, 1.05], [2.8, 540, 1250, 1.2]], desenfoque: 4,
  anim: (lt, q, t) => { const acepta = t >= T('acepto') - .15;
    q('g5').innerHTML = [0, 1, 2, 3].map(i => GES({ x: 170 + i * 250, y: 1800 + (i % 2) * 40, s: .85, cara: i === 2 && acepta ? 'feliz' : 'serio', mira: i === 2 ? 0 : (i < 2 ? -1 : 1), brazo: i === 2 && acepta ? 'arriba' : '', pelo: ['#2a1c14', '#555', '#7a4a2a', '#1a1a1a'][i] })).join('')
      + (acepta ? `<text x="${670}" y="${800}" font-family="Figtree" font-weight="800" font-size="110" text-anchor="middle" fill="#ffd75e" stroke="${TINTA}" stroke-width="14" paint-order="stroke" transform="rotate(-6 670 800)">¡ACEPTO!</text>` : '') } });
// 6 · «Eligió cinco fondos que a su vez invertían en más de cien de los mejores fondos del mundo»
plano({ t0: T('eligio') - .05, entrada: 'zoom', fondo: `<rect width="1080" height="1920" fill="${grad('#1c2440', '#0e1224', 90)}"/>` + brillo(540, 900, 700, '#7fa0ff', .2) + `<g id="multi6"></g>`,
  frente: `<g id="cinco6"></g>`, cam: [[0, 540, 1250, 1.1], [4.3, 540, 1050, 1.0]], desenfoque: 1,
  anim: (lt, q, t) => { q('cinco6').innerHTML = [0, 1, 2, 3, 4].map(i => { const k = p(t, T('cinco') + i * .12 - .05, .25); return k > 0 ? `<g transform="translate(0,${(1 - eo(k)) * 200})" opacity="${eo(k)}">${GES({ x: 140 + i * 200, y: 1720 - (i % 2) * 60, s: .6, cara: 'serio', pelo: ['#2a1c14', '#555', '#7a4a2a', '#1a1a1a', '#aa8844'][i] })}${D.maletin(200 + i * 200, 1700 - (i % 2) * 60, .7)}</g>` : '' }).join('');
    const k2 = p(t, T('cien') - .1, .6), n = Math.floor(eo(k2) * 120); let s = '';
    for (let i = 0; i < n; i++) s += GES({ x: 60 + (i % 12) * 88, y: 360 + Math.floor(i / 12) * 90, s: .12, cara: 'serio' }); q('multi6').innerHTML = s } });
// 7 · «Cientos de expertos contra algo que no piensa»
plano({ t0: T('cientos') - .05, entrada: 'barrido', fondo: `<rect width="1080" height="1920" fill="${grad('#1c2440', '#0e1224', 90)}"/>` + `<rect x="540" width="540" height="1920" fill="${grad('#ffe7b0', '#f2b46a', 90)}"/>`,
  frente: (() => { let s = ''; for (let i = 0; i < 20; i++) s += GES({ x: 70 + (i % 4) * 125, y: 900 + Math.floor(i / 4) * 190, s: .3, cara: ['serio', 'feliz'][i % 2] }); return s })() + D.cesta(810, 1300, .9) +
    `<circle cx="540" cy="1050" r="90" fill="#111" stroke="#fff" stroke-width="8"/><text x="540" y="1078" font-family="Figtree" font-weight="800" font-size="80" text-anchor="middle" fill="#fff">VS</text>`,
  cam: [[0, 540, 1100, 1.15], [2.4, 540, 1050, 1.0]] });
// 8 · «Y el primer año llegó la crisis de 2008. La bolsa se hundió un 37 %. Los expertos perdieron bastante menos. Buffett iba perdiendo»
plano({ t0: T('y', 3) - .05, entrada: 'zoom', fondo: `<rect width="1080" height="1920" fill="${grad('#3a0f14', '#120507', 90)}"/>`, frente: `<g id="c8"></g><g id="bf8"></g>`,
  cam: [[0, 540, 960, 1.05], [8.3, 540, 1000, 1.0]],
  anim: (lt, q, t) => { q('c8').innerHTML = carrera(eo(p(t, T('crisis'), 2.2)));
    const k = p(t, T('buffett', 2) - .1, .3); q('bf8').innerHTML = k > 0 ? `<g transform="translate(0,${(1 - eo(k)) * 400})">${BUF({ x: 820, y: 1960, s: .9, cara: 'preocupado', fx: 'sudor', brazo: 'cabeza' })}</g>` : '' } });
// 9 · «Pero la apuesta era a diez años. Poco a poco, el fondo aburrido los alcanzó. Y luego los dejó atrás… el gestor lo dio por perdido»
plano({ t0: T('pero') - .05, fondo: `<rect width="1080" height="1920" fill="${grad('#10324a', '#081624', 90)}"/>`, frente: `<g id="c9"></g><g id="fl9"></g>`,
  cam: [[0, 540, 1000, 1.0], [7.7, 540, 960, 1.06]],
  anim: (lt, q, t) => { q('c9').innerHTML = carrera(1 + 9 * eio(p(t, T('poco') - .2, T('perdido') - T('poco')))); const k = p(t, T('perdido') - .2, .3);
    q('fl9').innerHTML = k > 0 ? `<g transform="translate(0,${(1 - eo(k)) * 500})">${GES({ x: 230, y: 1960, s: .9, cara: 'triste', fx: 'sudor' })}<path d="M300 1250 v-300" stroke="#8a5a2c" stroke-width="14"/><path d="M300 950 h170 l-30 60 l30 60 h-170z" fill="#fff" ${OL}/></g>` : '' } });
// 10 · «El fondo que no hace nada ganó un 126 %. Los expertos, un 36»
plano({ t0: T('fondo', 3) - .15, entrada: 'barrido', fondo: `<rect width="1080" height="1920" fill="${grad('#ffe7b0', '#f2b46a', 90)}"/>` + brillo(540, 900, 700, '#fff', .5), frente: `<g id="r10"></g>`,
  cam: [[0, 540, 1100, 1.05], [5, 540, 1000, 1.0]],
  anim: (lt, q, t) => { const k1 = eo(p(t, T('126') - .2, .7)), k2 = eo(p(t, T('36') - .2, .5)), base = 1650;
    q('r10').innerHTML = `<rect x="160" y="${base - 1000 * k1}" width="320" height="${1000 * k1}" rx="20" fill="${grad('#ffe08a', '#d39a1c', 0)}" ${OL}/>`
      + (k1 > 0 ? `<text x="320" y="${base - 1000 * k1 - 40}" font-family="Figtree" font-weight="800" font-size="110" text-anchor="middle" fill="${TINTA}">+126 %</text>` : '')
      + `<rect x="600" y="${base - 286 * k2}" width="320" height="${286 * k2}" rx="20" fill="${grad('#c9d2e0', '#7d8796', 0)}" ${OL}/>`
      + (k2 > 0 ? `<text x="760" y="${base - 286 * k2 - 40}" font-family="Figtree" font-weight="800" font-size="110" text-anchor="middle" fill="${TINTA}">+36 %</text>` : '')
      + (k2 >= 1 ? BUF({ x: 320, y: 1910, s: .36, cara: 'feliz', fx: 'brillo', brazo: 'arriba' }) + GES({ x: 760, y: 1910, s: .36, cara: 'triste', fx: 'sudor' }) : D.cesta(320, 1830, .55, false) + [0, 1, 2].map(i => GES({ x: 680 + i * 80, y: 1840, s: .25 })).join('')) } });
// 11 · «¿Cómo pierden cientos de expertos contra algo que no piensa?»
plano({ t0: T('como') - .05, entrada: 'zoom', fondo: `<rect width="1080" height="1920" fill="#0a0a12"/>` + brillo(540, 1500, 500, '#fff6d0', .25),
  frente: (() => { let s = ''; for (let i = 0; i < 15; i++) s += GES({ x: 140 + (i % 5) * 200, y: 1300 + Math.floor(i / 5) * 230, s: .4, cara: 'sorpresa', fx: i % 3 ? '' : '!', brazo: i % 4 ? 'abajo' : 'cabeza' }); return s })() + `<text id="q11" x="540" y="800" font-family="Figtree" font-weight="800" font-size="420" text-anchor="middle" fill="#ffd75e" stroke="${TINTA}" stroke-width="16" paint-order="stroke">?</text>`,
  cam: [[0, 540, 1200, 1.15], [2.8, 540, 1100, 1.0]], anim: (lt, q) => q('q11').setAttribute('transform', `translate(540,800) scale(${rebote(p(lt, .1, .35))}) translate(-540,-800)`) });
// 12 · «Por lo que cobran… un 2 % de todo tu dinero, ganaras o perdieras. Y además, un 20 %… Un mordisco cada año, durante diez años»
plano({ t0: T('por', 4) - .05, entrada: 'barrido', fondo: `<rect width="1080" height="1920" fill="${grad('#2b1240', '#120818', 90)}"/>` + brillo(540, 1100, 700, '#ff7ab0', .2), frente: `<g id="m12"></g>`,
  cam: [[0, 540, 1100, 1.05], [10, 540, 1000, 1.0]],
  anim: (lt, q, t) => { const anyos = Math.min(10, Math.max(0, (t - T('mordisco') + .2) * 7)), muerde = (anyos % 1), n = Math.floor(anyos);
    const montón = Math.max(14, 40 - n * 2.6 - (t > T('20') ? 2 : 0) - (t > T('2') ? 1 : 0));
    let s = ''; for (let i = 0; i < montón; i++) s += D.moneda(380 + (i % 6) * 64 + (Math.floor(i / 6) % 2) * 32, 1640 - Math.floor(i / 6) * 60, 44);
    const k2 = p(t, T('2') - .1, .3), k20 = p(t, T('20') - .1, .3);
    s += k2 > 0 ? `<text x="540" y="520" font-family="Figtree" font-weight="800" font-size="${120 * rebote(k2)}" text-anchor="middle" fill="#ff6b57" stroke="${TINTA}" stroke-width="14" paint-order="stroke">2 % CADA AÑO</text>` : '';
    s += k20 > 0 ? `<text x="540" y="680" font-family="Figtree" font-weight="800" font-size="${96 * rebote(k20)}" text-anchor="middle" fill="#ffd75e" stroke="${TINTA}" stroke-width="14" paint-order="stroke">+ 20 % DE LO GANADO</text>` : '';
    if (t > T('mordisco') - .2) { s += D.boca('bo', 540 + Math.sin(n * 2.1) * 80, 1150, 1.7, Math.abs(Math.cos(muerde * Math.PI)));
      s += `<text x="540" y="1960" font-family="Figtree" font-weight="800" font-size="90" text-anchor="middle" fill="#fff" stroke="${TINTA}" stroke-width="12" paint-order="stroke" transform="translate(0,-120)">AÑO ${Math.min(10, n + 1)}</text>` }
    q('m12').innerHTML = s } });
// 13 · «El fondo de Buffett no cobraba casi nada: comprar todo, y esperar»
plano({ t0: T('fondo', 4) - .15, entrada: 'barrido', fondo: `<rect width="1080" height="1920" fill="${grad('#ffe7b0', '#f2b46a', 90)}"/>` + brillo(540, 1000, 700, '#fff', .5),
  frente: `<g id="ra13"></g>` + D.cesta(540, 1500, 1.4) + `<g id="c13"></g>`, cam: [[0, 540, 1150, 1.0], [3.7, 540, 1100, 1.15]],
  anim: (lt, q, t) => { q('ra13').innerHTML = rafaga(540, 1350, '#fff', lt * 14, .3); const k = p(t, T('casi', 2) - .1, .3); q('c13').innerHTML = k > 0 ? `<text x="540" y="560" font-family="Figtree" font-weight="800" font-size="${130 * rebote(k)}" text-anchor="middle" fill="#2e8b57" stroke="${TINTA}" stroke-width="14" paint-order="stroke">≈ 0 %</text>` : '' } });
// 14 · «Buffett donó el premio, más de dos millones, a una asociación de niñas de su ciudad»
plano({ t0: T('buffett', 4) - .05, entrada: 'barrido', fondo: D.cielo('#bfe0ff', '#fff2d8') + D.casa(80, 1350, 920, 520, '#e8d9b8', '#7a4a3a', false) + `<rect y="1350" width="1080" height="570" fill="${grad('#9bd18a', '#5a9a4a', 90)}"/>`,
  frente: BUF({ x: 230, y: 1780, s: .9, cara: 'feliz' }) + [0, 1, 2].map(i => persona({ x: 560 + i * 170, y: 1800, s: .55, ropa: ['#ff6b8a', '#7a4ac4', '#ffb03a'][i], pelo: ['#3a2a1e', '#1a1a1a', '#7a4a2a'][i], cara: 'feliz', brazo: 'arriba', bi: 'arriba', peinado: ['coleta', 'largo', 'moño'][i] })).join('') + D.cheque('ch14', 540, 900, '$2.200.000', .01),
  cam: [[0, 540, 1300, 1.05], [4, 540, 1200, 1.12]], desenfoque: 2,
  anim: (lt, q, t) => { const k = p(t, T('dos', 1) - .1, .3); q('ch14').setAttribute('transform', `translate(540,900) scale(${Math.max(.01, rebote(k) * .95)})`) } });
// 15 · «No ganó porque supiera más. Ganó porque pagaba menos.»
plano({ t0: T('supiera') - .4, entrada: 'zoom', fondo: `<rect width="1080" height="1920" fill="${grad('#6d1f2b', '#2a0c12', 90)}"/>` + D.estanteria(0, 300, 1080, 900, 23) + brillo(540, 800, 600, '#ffd28a', .35),
  frente: `<g id="ra15"></g>` + BUF({ x: 380, y: 1780, s: 1.15, cara: 'sonrisa', fx: 'brillo', brazo: 'pecho' }) + D.cesta(820, 1720, .7), cam: [[0, 540, 1150, 1.05], [3, 540, 1100, 1.2]], desenfoque: 6,
  anim: (lt, q) => { q('ra15').innerHTML = rafaga(380, 1150, '#ffd28a', lt * 12, .18) } });
