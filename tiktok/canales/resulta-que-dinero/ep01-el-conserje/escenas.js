// EP01 — «El conserje de los 8 millones» (Ronald Read). Cada plano empieza en su palabra de la narración.
const T = (w, n = 1) => Array.isArray(w) ? vt(...w) : vt(w, n);
const RON = (o) => persona(Object.assign({ ropa: '#7a5236', gorra: '#5b6b4a', canas: '#e8e8e8', cara: 'sonrisa' }, o));
const RONjoven = (o) => persona(Object.assign({ ropa: '#3f6e8c', gorra: '#c0453a', cara: 'sonrisa' }, o));
const nocheInvierno = () => D.cielo('#0e1a3a', '#2b3f73', '#5a6ea8') + D.estrellas(70) + D.montes(980, '#3a4f80', '#24345c') + D.pinos(1060, 14, '#1b2f45', 4, .9);
const diaInvierno = () => D.cielo('#9cc7ec', '#dcecf8') + D.montes(1000, '#9fb3cf', '#c9d6e8') + D.pinos(1080, 12, '#2c5a4a', 9, .9);

// 1 · «Iba al trabajo en un coche viejo» — carretera nevada, el coche cruza
plano({ t0: 0, fondo: diaInvierno() + D.pueblo(1240) + D.suelo(1240) + D.copos('n1', 70), frente: `<g id="car">${D.coche(0, 1330, 1.25, '#8a5a3c')}${D.humo('humo', -330, 1250)}</g>`,
  cam: [[0, 540, 1100, 1.25], [1.7, 600, 1060, 1.12]], desenfoque: 3,
  anim: (lt, q) => { q('car').setAttribute('transform', `translate(${lerp(-140, 820, lt / 1.7)},${Math.sin(lt * 30) * 3})`); D.nieva(q, lt, 'n1');
    q('humo').querySelectorAll('.h').forEach((c, i) => c.setAttribute('transform', `translate(${-lt * 60 * (i + 1) % 80},${-lt * 20})`)) } });

// 2 · «se cerraba el abrigo con imperdibles» — primerísimo plano: el imperdible se cierra
plano({ t0: T('se') - .05, entrada: 'barrido', fondo: D.abrigoTela('#7a5236'), frente: `<g id="pin">${D.imperdible(560, 900, 2.6, -12, 1)}</g>${D.boton(560, 1520, 60)}`,
  cam: [[0, 560, 960, 1.15], [2, 560, 940, 1.3]], desenfoque: 0,
  anim: (lt, q) => { const k = p(lt + T('se'), T('imperdibles') - .1, .3); q('pin').innerHTML = D.imperdible(560, 900, 2.6, -12, 1 - eo(k)) } });

// 3 · «y aparcaba lejos para no pagar el parquímetro» — el parquímetro en primer plano; él pasa de largo
plano({ t0: T('y') - .05, fondo: diaInvierno() + D.pueblo(1300) + D.suelo(1300, '#e9eef6', '#b9c6da') + `<rect x="0" y="1300" width="1080" height="80" fill="#8b93a3"/>` + D.copos('n3', 60, 11),
  frente: D.parquimetro(250, 1700, 1.5) + `<g id="ron3">${RON({ x: 0, y: 1360, s: .6, mira: 1 })}</g>`,
  cam: [[0, 380, 1300, 1.25], [2.1, 520, 1180, 1.08]], desenfoque: 2.5,
  anim: (lt, q) => { q('ron3').setAttribute('transform', `translate(${lerp(560, 1000, lt / 2.1)},${-Math.abs(Math.sin(lt * 9)) * 10})`); D.nieva(q, lt, 'n3', 90) } });

// 4 · «Cuando murió, dejó ocho millones de dólares» — el testamento y el sello
plano({ t0: T('cuando') - .05, entrada: 'zoom', fondo: `<rect width="1080" height="1920" fill="${radial('#3b2a1e', '#120c08')}"/>` + brillo(540, 900, 700, '#ffcf8a', .35),
  frente: D.papel(540, 940, 700, 900, -3) + `<text x="540" y="640" font-family="Figtree" font-weight="800" font-size="56" text-anchor="middle" fill="${TINTA}" transform="rotate(-3 540 940)">TESTAMENTO</text><g id="sello4"></g>`,
  cam: [[0, 540, 940, 1.05], [2.5, 540, 1000, 1.22]], desenfoque: 0,
  anim: (lt, q, t) => { const k = p(t, T('ocho') - .05, .25); q('sello4').innerHTML = k > 0 ? D.sello(540, 1060, '$8.000.000', '#2e8b57', -8, 1.7 - .7 * rebote(k)) : '' } });

// 5 · «Se llamaba Ronald Read» — retrato
plano({ t0: T('se', 2) - .05, entrada: 'barrido', fondo: D.cielo('#f3d9a6', '#e7b77a') + brillo(540, 700, 600, '#fff2c8', .7) + D.estanteria(0, 300, 1080, 900),
  frente: RON({ x: 540, y: 1700, s: 1.6, cara: 'sonrisa' }) + `<g id="nom5"><rect x="250" y="1330" width="580" height="110" rx="55" fill="#fff" ${OL}/><text x="540" y="1405" font-family="Figtree" font-weight="800" font-size="62" text-anchor="middle" fill="${TINTA}">RONALD READ</text></g>`,
  cam: [[0, 540, 1050, 1.1], [1.5, 540, 1000, 1.18]], desenfoque: 7,
  anim: (lt, q, t) => { const k = p(t, T('ronald') - .05, .25); q('nom5').setAttribute('opacity', eo(k)); q('nom5').setAttribute('transform', `translate(0,${(1 - eo(k)) * 40})`) } });

// 6 · «Durante veinticinco años echó gasolina en un pueblo de Vermont» — gasolinera de los 50, el reloj gira
plano({ t0: T('durante') - .05, entrada: 'barrido', fondo: diaInvierno() + D.casa(560, 1250, 460, 330, '#e8d9b8', '#3a4a5a', false) + `<rect x="600" y="1000" width="380" height="70" fill="#c0392b" ${OL}/><text x="790" y="1050" font-family="Figtree" font-weight="800" font-size="46" text-anchor="middle" fill="#fff">GARAJE</text>` + D.suelo(1250) + D.reloj('rel6', 820, 760, 80) + D.copos('n6', 60, 21),
  frente: D.surtidor(330, 1560, 1.1) + RONjoven({ x: 640, y: 1640, s: .95, mira: -1, brazo: 'delante' }) + D.coche(980, 1720, .9, '#3a7a5a'),
  cam: [[0, 520, 1250, 1.15], [3, 560, 1150, 1.05]], desenfoque: 2.5,
  anim: (lt, q) => { D.nieva(q, lt, 'n6', 80); D.gira(q, 'rel6h', lt * 400); D.gira(q, 'rel6m', lt * 2400) } });

// 7 · «Luego fue conserje en unos grandes almacenes, otros diecisiete» — de noche, fregando
plano({ t0: T('luego') - .05, entrada: 'barrido', dir: -1,
  fondo: `<rect width="1080" height="1920" fill="${grad('#1d2240', '#3a3f6a', 90)}"/>` + [0, 1, 2, 3].map(i => `<rect x="${60 + i * 270}" y="300" width="60" height="1000" fill="${grad('#4a5080', '#2a2e52', 0)}"/>` + brillo(90 + i * 270, 300, 160, '#bfc8ff', .35)).join('')
    + [180, 450, 720].map((x, i) => persona({ x, y: 1240, s: .55, ropa: ['#c0453a', '#d9b04a', '#3f8c5a'][i], cara: 'normal', piel: '#e6e6ea' })).join('')
    + `<rect x="0" y="1240" width="1080" height="680" fill="${grad('#5a5f8a', '#2a2d4a', 90)}"/><path d="M0 1400 L1080 1360" stroke="#fff" stroke-width="40" opacity=".08"/>` + D.reloj('rel7', 900, 500, 70),
  frente: `<g id="ron7">${persona({ x: 540, y: 1660, s: 1, ropa: '#5d6b7a', gorra: '#2f3a4a', cara: 'cansado', canas: '#bbb' })}${D.fregona(660, 1660, 18)}</g>` + D.cubo(300, 1680)
    + `<ellipse cx="560" cy="1690" rx="300" ry="40" fill="#cfe2ff" opacity=".25"/>`,
  cam: [[0, 540, 1300, 1.1], [3.2, 560, 1200, 1.2]], desenfoque: 4,
  anim: (lt, q) => { q('ron7').setAttribute('transform', `translate(${Math.sin(lt * 5) * 30},0)`); D.gira(q, 'rel7h', lt * 300); D.gira(q, 'rel7m', lt * 1800) } });

// 8 · «En el pueblo, más de uno le invitaba a café porque pensaban que no le llegaba» — la cafetería
plano({ t0: T('en', 4) - .05, entrada: 'barrido',
  fondo: `<rect width="1080" height="1920" fill="${grad('#f2d7a8', '#d9a56a', 90)}"/>` + D.ventana(80, 380, 420, 520, false) + D.ventana(580, 380, 420, 520, false) + D.copos('n8', 40, 33)
    + `<rect x="0" y="1150" width="1080" height="770" fill="${grad('#9a5a34', '#5a321c', 90)}"/><rect x="0" y="1130" width="1080" height="50" fill="#c0453a" ${OL}/>`,
  frente: `<g id="vec8">${persona({ x: 300, y: 1720, s: .95, ropa: '#2f4a7a', pelo: '#3a2a1e', cara: 'triste', mira: 1, brazo: 'delante' })}</g>` + RON({ x: 800, y: 1720, s: .95, mira: -1, cara: 'sonrisa' }) + `<g id="taza8">${D.taza(460, 1420, 1)}</g>`,
  cam: [[0, 540, 1350, 1.05], [2.2, 520, 1300, 1.18], [4, 600, 1280, 1.22]], desenfoque: 4,
  anim: (lt, q, t) => { const k = p(t, T('cafe') - .1, .5); q('taza8').setAttribute('transform', `translate(${eo(k) * 160},${-Math.sin(eo(k) * Math.PI) * 40})`); D.nieva(q, lt, 'n8', 60) } });

// 9 · «Comía en la misma cafetería, con la misma gorra, y partía su propia leña»
plano({ t0: T('comia') - .05, fondo: `<rect width="1080" height="1920" fill="${grad('#f2d7a8', '#d9a56a', 90)}"/>` + D.ventana(320, 300, 440, 560, false) + `<rect x="0" y="1150" width="1080" height="770" fill="${grad('#9a5a34', '#5a321c', 90)}"/>`,
  frente: RON({ x: 540, y: 1760, s: 1.3, cara: 'sonrisa' }) + D.taza(820, 1460, 1.1) + `<g id="cal9"></g>`,
  cam: [[0, 540, 900, 1.5], [1.3, 540, 1000, 1.3], [2.3, 540, 1100, 1.15]], desenfoque: 6,
  anim: (lt, q) => { const n = Math.floor(lt * 6); q('cal9').innerHTML = `<g transform="translate(180,520) rotate(-6)"><rect x="-110" y="-120" width="220" height="240" rx="12" fill="#fff" ${OL}/><rect x="-110" y="-120" width="220" height="70" rx="12" fill="#c0453a" ${OL}/><text x="0" y="60" font-family="Figtree" font-weight="800" font-size="110" text-anchor="middle" fill="${TINTA}">${1 + n % 28}</text></g>` } });
plano({ t0: T('partia') - .1, entrada: 'barrido', fondo: diaInvierno() + D.casa(620, 1240, 400, 300, '#c0453a', '#4a2e28', false) + D.suelo(1240) + D.copos('n9b', 70, 17),
  frente: `<g id="tr9">${D.tronco(470, 1680, 0)}</g>` + `<g id="ron9">${RON({ x: 700, y: 1700, s: 1, mira: -1 })}</g>` + `<g id="hacha9">${D.hacha('hx', 560, 1300, 30)}</g>`,
  cam: [[0, 560, 1350, 1.15], [1.3, 540, 1300, 1.25]], desenfoque: 2,
  anim: (lt, q, t) => { const g = p(t, T('lena') - .25, .2); q('hacha9').innerHTML = D.hacha('hx', 560, 1300 + eo(g) * 150, lerp(30, -60, eo(g)));
    q('tr9').innerHTML = D.tronco(470, 1680, eo(p(t, T('lena') - .05, .3))); D.nieva(q, lt, 'n9b', 70) } });

// 10 · «Nunca heredó nada, nunca le tocó la lotería, nunca tuvo un sueldo alto»
plano({ t0: T('nunca') - .05, entrada: 'zoom', fondo: `<rect width="1080" height="1920" fill="${grad('#2b2e5a', '#5a2e5a', 90)}"/>` + brillo(540, 960, 800, '#ff9ad5', .25),
  frente: D.cofre(540, 600) + D.tachon('x1', 540, 560, .8) + D.boleto(540, 1000) + D.tachon('x2', 540, 1000, .8) + D.nomina(540, 1420) + D.tachon('x3', 540, 1420, .8),
  cam: [[0, 540, 600, 1.35], [T('nunca', 2) - T('nunca'), 540, 1000, 1.35], [T('nunca', 3) - T('nunca'), 540, 1420, 1.35], [3.8, 540, 1000, 1]],
  anim: (lt, q, t) => [['x1', 'heredo'], ['x2', 'loteria'], ['x3', 'alto']].forEach(([id, w]) => { const k = p(t, T(w) - .05, .2);
    q(id).setAttribute('opacity', k > 0 ? 1 : 0); q(id).style.transformBox = 'fill-box'; q(id).style.transformOrigin = 'center'; q(id).style.transform = `scale(${1.6 - .6 * eo(k)})` }) });

// 11 · «En 2014 murió con noventa y dos años» — el sillón vacío, la gorra
plano({ t0: T('2014') - .3, fondo: `<rect width="1080" height="1920" fill="${grad('#3a3550', '#1c1a2a', 90)}"/>` + D.ventana(300, 300, 480, 600, true) + D.copos('n11', 50, 41) + brillo(540, 600, 500, '#9fb4ff', .25),
  frente: D.sillon(540, 1600, '#7a3b3b') + `<g transform="translate(540,1330) rotate(-8)"><path d="M-90 0 q10 -70 90 -72 q80 2 90 72z" fill="#5b6b4a" ${OL}/><path d="M-96 0 q80 -18 190 0 q-20 18 -190 0z" fill="#3e4a32" ${OL}/></g>`,
  cam: [[0, 540, 1150, 1.05], [2.2, 540, 1200, 1.2]], desenfoque: 3, anim: (lt, q) => D.nieva(q, lt, 'n11', 40) });

// 12 · «cuando abrieron su caja fuerte del banco, encontraron un taco de papeles de cinco centímetros…»
plano({ t0: T('cuando', 2) - .05, entrada: 'barrido', fondo: `<rect width="1080" height="1920" fill="${grad('#8d97a8', '#4a5262', 90)}"/>` + D.cajas(6, 11, 30, 120, 170, 120) + brillo(540, 500, 600, '#fff', .25),
  frente: `<rect x="0" y="1460" width="1080" height="460" fill="${grad('#6a5a4a', '#3a2e24', 90)}"/><g id="pila12"></g><g id="reg12"></g><g id="fan12"></g>`,
  cam: [[0, 540, 800, 1.1], [T('encontraron') - T('cuando', 2), 540, 1150, 1.05], [T('acciones') - T('cuando', 2), 540, 1250, 1.25], [6, 540, 1200, 1.15]], desenfoque: 2,
  anim: (lt, q, t) => { const n = Math.round(eo(p(t, T('taco') - .1, .9)) * 55); q('pila12').innerHTML = n ? D.pilaCert(540, 1560, n) : '';
    const kr = p(t, T('cinco') - .1, .3); q('reg12').innerHTML = kr > 0 ? `<g opacity="${eo(kr)}">${D.regla(760, 1560, 500)}<text x="900" y="1330" font-family="Figtree" font-weight="800" font-size="64" fill="#fff" stroke="${TINTA}" stroke-width="10" paint-order="stroke">5 cm</text></g>` : '';
    const kf = p(t, T('acciones') - .1, .5); q('fan12').innerHTML = kf > 0 ? ['P&G', 'J&J', 'BANK', 'PEPSI', 'CVS'].map((c, i) => D.certificado(540 + (i - 2) * 150 * eo(kf), 1000 - Math.abs(i - 2) * 30 * eo(kf), .75, (i - 2) * 12 * eo(kf), c, ['#2f7d5b', '#c0392b', '#2f4a7a', '#2f80ed', '#c0392b'][i])).join('') : '' } });

// 13 · «Dejó casi cinco millones a la biblioteca del pueblo y más de uno al hospital»
plano({ t0: T('dejo', 2) - .05, entrada: 'barrido', fondo: diaInvierno() + D.biblioteca(540, 1300) + D.suelo(1300) + D.copos('n13', 50, 51),
  frente: D.cheque('ch13', 540, 1560, '$4.800.000', .01), cam: [[0, 540, 1100, 1], [1.8, 540, 1300, 1.12]], desenfoque: 2,
  anim: (lt, q, t) => { const k = p(t, T('cinco', 2) - .05, .3); q('ch13').setAttribute('transform', `translate(540,1560) scale(${Math.max(.01, rebote(k))}) rotate(${(1 - k) * -12})`); D.nieva(q, lt, 'n13', 60) } });
plano({ t0: T('y', 5) - .05, fondo: D.cielo('#a9d4f5', '#e8f4ff') + D.hospital(540, 1300) + D.suelo(1300, '#eef3fb', '#d6e0ee'),
  frente: D.cheque('ch13b', 540, 1560, '$1.200.000', .01), cam: [[0, 540, 1150, 1.05], [1.2, 540, 1250, 1.15]], desenfoque: 2,
  anim: (lt, q, t) => { const k = p(t, T('hospital') - .05, .3); q('ch13b').setAttribute('transform', `translate(540,1560) scale(${Math.max(.01, rebote(k))})`) } });

// 14 · «El abogado tuvo que leerlo dos veces»
plano({ t0: T('el', 4) - .05, entrada: 'zoom', fondo: `<rect width="1080" height="1920" fill="${grad('#4a3a2a', '#2a2018', 90)}"/>` + D.estanteria(40, 200, 1000, 1000, 77) + brillo(540, 900, 600, '#ffd28a', .3),
  frente: `<g id="abo14"></g>` + D.mesa(1450, '#6b4226') + D.papel(540, 1420, 360, 260, -6),
  cam: [[0, 540, 1150, 1.1], [1.9, 540, 1080, 1.3]], desenfoque: 5,
  anim: (lt, q, t) => { const sorp = t >= T('dos', 2) - .1; q('abo14').innerHTML = persona({ x: 540, y: 1520, s: 1.15, ropa: '#2a2a3a', pelo: '#777', gafas: !sorp, cara: sorp ? 'sorpresa' : 'serio', brazo: sorp ? 'arriba' : '' }) } });

// 15 · «¿Cómo lo hizo un conserje?» — foco en la oscuridad
plano({ t0: T('como') - .05, entrada: 'zoom', fondo: `<rect width="1080" height="1920" fill="#08080e"/>` + `<path d="M440 0 L640 0 L900 1800 L180 1800Z" fill="${grad('#fff6d0', '#fff6d0', 90)}" opacity=".12"/>` + brillo(540, 1700, 420, '#fff6d0', .35),
  frente: persona({ x: 540, y: 1720, s: 1, ropa: '#5d6b7a', gorra: '#2f3a4a', canas: '#bbb', cara: 'normal' }) + D.fregona(660, 1720, 14) + `<text id="q15" x="540" y="700" font-family="Figtree" font-weight="800" font-size="420" text-anchor="middle" fill="#ffd75e" stroke="${TINTA}" stroke-width="16" paint-order="stroke">?</text>`,
  cam: [[0, 540, 1300, 1.2], [1.1, 540, 1150, 1.05]],
  anim: (lt, q) => { q('q15').setAttribute('transform', `translate(540,700) scale(${rebote(p(lt, .1, .35))}) translate(-540,-700)`) } });

// 16 · «Cada mes guardaba un poco» — el tarro en la mesa, caen monedas
plano({ t0: T('cada') - .05, entrada: 'barrido', fondo: `<rect width="1080" height="1920" fill="${grad('#f6e3c0', '#e0b98a', 90)}"/>` + D.ventana(320, 380, 440, 520, false),
  frente: D.mesa(1500, '#8a5a3c') + `<g id="tar16"></g><g id="mon16"></g>`, cam: [[0, 540, 1250, 1.15], [1.3, 540, 1300, 1.25]], desenfoque: 5,
  anim: (lt, q) => { q('tar16').innerHTML = D.tarro(540, 1560, .15 + lt * .12, 1.3); const f = (lt * 3) % 1; q('mon16').innerHTML = D.moneda(540, lerp(700, 1250, ei(f)), 44) } });

// 17 · «compraba acciones de empresas grandes y aburridas: pasta de dientes, medicamentos, el banco de la esquina»
plano({ t0: T('con', 4) - .05, entrada: 'barrido', fondo: `<rect width="1080" height="1920" fill="${grad('#2d6a8c', '#1b3f5a', 90)}"/>` + brillo(540, 900, 800, '#7fd1ff', .25),
  frente: `<g id="emp17"></g>`, cam: [[0, 540, 960, 1.08], [6, 540, 1000, 1]],
  anim: (lt, q, t) => { const it = [['pasta', 300, 'pasta'], ['medicamentos', 960, 'frasco'], [['banco', 2], 1560, 'banco']];
    q('emp17').innerHTML = it.map(([w, y, f]) => { const k = p(t, T(w) - .1, .3); if (k <= 0) return '';
      return `<g transform="translate(0,${(1 - eo(k)) * 120})" opacity="${eo(k)}">${f === 'pasta' ? D.pasta(400, y, 1.6) : f === 'frasco' ? D.frasco(400, y + 150, 1.6) : D.banco(400, y + 170, 1.1)}${D.certificado(860, y, .7 * rebote(p(t, T(w) + .1, .3)), 8)}</g>` }).join('')
      + (t < T('pasta') - .1 ? `<g opacity="${eo(p(lt, 0, .3))}">${D.certificado(540, 960, 1.4, -4, 'ACCIONES')}</g>` : '') } });

// 18 · el bucle: empresas → trocito de beneficios → más acciones → más trocitos (cada vuelta, más rápido)
plano({ t0: T('esas') - .05, entrada: 'zoom', fondo: `<rect width="1080" height="1920" fill="${grad('#1f4d3a', '#0f2a20', 90)}"/>` + brillo(540, 960, 800, '#7fffb0', .18),
  frente: `<g id="b18"></g>`, cam: [[0, 540, 960, 1.05], [7.6, 540, 1000, .95]],
  anim: (lt, q, t) => { const v = 1 + Math.max(0, t - T('compraba', 2)) * .55, fase = (lt * .9 * v) % 1, vuelta = Math.floor(lt * .9 * v);
    const n = Math.min(60, 4 + Math.floor(Math.pow(lt, 1.6) * 2.2));
    const emp = `${D.banco(270, 640, .55)}${D.pasta(800, 560, .7)}${D.frasco(560, 640, .55)}`;
    const mon = [0, 1, 2].map(i => D.moneda(lerp([270, 560, 800][i], 540, eio(fase)), lerp(680, 1260, eio(fase)), 34)).join('');
    q('b18').innerHTML = emp + D.flecha(540, 760, 540, 1180, '#7fffb0') + mon + D.tarro(540, 1500, .2 + .6 * ((fase * 1.2) % 1), 1)
      + D.flecha(700, 1360, 900, 900, '#ffd75e') + D.flecha(380, 1360, 180, 900, '#ffd75e') + D.pilaCert(540, 1800, n, 'p18')
      + `<text x="540" y="380" font-family="Figtree" font-weight="800" font-size="64" text-anchor="middle" fill="#ffd75e" stroke="${TINTA}" stroke-width="12" paint-order="stroke">${n} ACCIONES</text>` } });

// 19 · «Y no vendía, ni cuando la bolsa caía, ni cuando todos se asustaban, durante más de sesenta años»
plano({ t0: T('y', 8) - .05, entrada: 'barrido', fondo: `<rect width="1080" height="1920" fill="${grad('#3a0f14', '#120507', 90)}"/>` + `<g id="gr19"></g>` + `<g id="an19"></g>`,
  frente: D.sillon(540, 1760, '#5b6b4a') + RON({ x: 540, y: 1620, s: .95, cara: 'sonrisa' }) + D.periodico(540, 1380, 'PÁNICO', .9),
  cam: [[0, 540, 1100, 1.1], [4.8, 540, 1150, 1.2]], desenfoque: 1,
  anim: (lt, q, t) => { const pts = [[0, 300], [180, 380], [300, 340], [420, 760], [560, 560], [700, 900], [860, 700], [1080, 1050]], k = eo(p(lt, 0, 2.5));
    q('gr19').innerHTML = D.grafico('g19', pts.map(([x, y]) => [x * k, y]).filter(([x]) => x <= 1080 * k + 1), '#ff4b3e');
    const an = t < T('ni') ? '1987' : t < T('ni', 2) ? '2000' : '2008'; q('an19').innerHTML = `<text x="900" y="240" font-family="Figtree" font-weight="800" font-size="90" text-anchor="middle" fill="#ff4b3e">${an}</text>` } });

// 20 · «No ganó mucho dinero. Le dio mucho tiempo al que tenía.» — el abrigo con imperdibles en la biblioteca
plano({ t0: T('no', 4) - .1, entrada: 'barrido', fondo: `<rect width="1080" height="1920" fill="${grad('#e9d9b8', '#b89a6a', 90)}"/>` + D.estanteria(-20, 150, 1120, 1300, 91) + brillo(540, 700, 700, '#fff2c8', .45),
  frente: D.percha(540, 520) + D.abrigo(540, 600, 1.05) + D.placa(540, 1560, 'Ronald Read · 1921-2014'),
  cam: [[0, 540, 1100, 1.05], [4.5, 540, 1000, 1.25]], desenfoque: 6 });
