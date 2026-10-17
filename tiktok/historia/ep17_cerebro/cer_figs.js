/* Ep. 17 · No usas solo el 10 % de tu cerebro — tiempos y figuras nuevas (grabado recortado) */

/* ---------- tiempos clave (todo por texto) ---------- */
const fw = (ph, from = 0) => find(ph, from);
const ws = i => W[i].s, wE = i => W[i].e;
const K = {};
{
  K.no = ws(0);
  const id = fw('diez por ciento'); K.diez = ws(id); K.ciento0 = ws(id + 2); K.cerebro0 = ws(fw('de tu cerebro') + 2);
  const il = fw('lo usas casi todo'); K.lo0 = ws(il); K.usas0 = ws(il + 1); K.casi0 = ws(il + 2); K.todo0 = ws(il + 3); K.L0e = wE(il + 3);
  const i1 = fw('y aunque te lo'); K.L1 = ws(i1); K.dicho = ws(fw('dicho', i1));
  K.peliculas = ws(fw('peliculas')); K.profes = ws(fw('profesores')); K.profesE = wE(fw('profesores'));
  const in1 = fw('nadie ha demostrado nunca'); K.nadie1 = ws(in1); K.demostrado = ws(in1 + 2); K.nunca1 = ws(in1 + 3); K.contrario = ws(in1 + 5); K.L1e = wE(in1 + 5);
  const i2 = fw('si te escanean'); K.L2 = ws(i2); K.escanean = ws(i2 + 2); K.cerebro2 = ws(i2 + 4);
  const idd = fw('un dia entero'); K.dia = ws(idd + 1); K.entero2 = ws(idd + 2);
  const ise = fw('se van encendiendo'); K.se2 = ws(ise); K.encend = ws(ise + 2); K.practic = ws(ise + 3);
  const izo = fw('todas las zonas'); K.todas = ws(izo); K.zonas = ws(izo + 2);
  const iun = fw('unas para ver'); K.unas = ws(iun); K.ver = ws(iun + 2);
  const imv = fw('otras para moverte'); K.otras1 = ws(imv); K.moverte = ws(imv + 2);
  const irc = fw('otras para recordar'); K.otras2 = ws(irc); K.recordar = ws(irc + 2); K.L2e = wE(irc + 2);
  const i3 = fw('y una prueba mas facil'); K.L3 = ws(i3); K.prueba = ws(i3 + 2); K.facil = ws(i3 + 4);
  const isi = fw('si tuvieras'); K.si3 = ws(isi); K.noventa = ws(fw('noventa', isi)); K.sinusar = ws(fw('sin usar', isi)); K.usar = ws(fw('sin usar', isi) + 1);
  const ile = fw('una lesion pequena'); K.una3 = ws(ile); K.lesion = ws(ile + 1); K.pequena = ws(ile + 2);
  const ina = fw('no te haria nada'); K.nohar = ws(ina); K.nada = ws(ina + 3); K.nadaE = wE(ina + 3);
  const iyn = fw('y no es asi'); K.yno = ws(iyn); K.noes = ws(iyn + 1); K.asi = ws(iyn + 3);
  const ica = fw('casi cualquier dano se nota'); K.casi3 = ws(ica); K.cualq = ws(ica + 1); K.dano = ws(ica + 2); K.se3 = ws(ica + 3); K.nota = ws(ica + 4); K.L3e = wE(ica + 4);
  const i4 = fw('ademas el cerebro pesa'); K.L4 = ws(i4); K.cerebro4 = ws(i4 + 2); K.pesa = ws(i4 + 3);
  const idos = fw('dos por ciento'); K.dos = ws(idos); K.cuerpo = ws(fw('de tu cuerpo', idos) + 2);
  const ill = fw('y se lleva'); K.lleva = ws(ill + 2); K.cerca = ws(ill + 3);
  const ive = fw('veinte por ciento'); K.veinte = ws(ive); K.energia = ws(fw('de tu energia', ive) + 2);
  const ing = fw('nadie gastaria tanto'); K.nadie4 = ws(ing); K.gastaria = ws(ing + 1); K.tanto = ws(ing + 2);
  const ius = fw('en algo que no usa', ing); K.algo = ws(ius + 1); K.nousa = ws(ius + 3); K.usa = ws(ius + 4); K.L4e = wE(ius + 4);
  const io = fw('ojo nadie sabe'); K.ojo = ws(io); K.nadie5 = ws(io + 1); K.sabe = ws(io + 2);
  const idn = fw('de donde salio el mito'); K.donde = ws(idn + 1); K.salio = ws(idn + 2); K.mito = ws(idn + 4);
  const iat = fw('se le atribuye a einstein'); K.se5 = ws(iat); K.atribuye = ws(iat + 2); K.einstein = ws(iat + 4);
  const inp = fw('y no hay ninguna prueba'); K.ynohay = ws(inp); K.nohay = ws(inp + 1); K.ninguna = ws(inp + 3); K.prueba5 = ws(inp + 4);
  const idj = fw('de que lo dijera', inp); K.dijera = ws(idj + 3); K.L5e = wE(idj + 3);
  const i6 = fw('o sea tu cerebro'); K.L6 = ws(i6); K.osea = ws(i6 + 1); K.tu6 = ws(i6 + 2); K.cerebro6 = ws(i6 + 3); K.trabaja = ws(i6 + 4); K.entero6 = ws(i6 + 5); K.entero6E = wE(i6 + 5);
  const iha = fw('hasta cuando estas'); K.hasta = ws(iha); K.sofa = ws(fw('sofa', iha)); K.sofaE = wE(fw('sofa', iha));
  const ite = fw('te lo creias'); K.te = ws(ite); K.creias = ws(ite + 2);
  const isn = fw('si o no', ite); K.si = ws(isn); K.o = ws(isn + 1); K.noB = ws(isn + 2); K.L6e = wE(isn + 2);
  const is = fw('soy tu vecino'); K.soy = ws(is); K.vecino = ws(is + 2); K.isoy = is;
  const iye = fw('y esto no venia en el libro', is); K.iye = iye; K.L7 = ws(iye); K.esto = ws(iye + 1); K.noV = ws(iye + 2); K.enL = ws(iye + 4); K.libro = ws(iye + 6); K.END = wE(iye + 6);
}
/* cortes de escena */
const S = {
  A: [-1, K.L1 - 0.1],
  B: [K.L1 - 0.1, K.L2 - 0.1],
  C1: [K.L2 - 0.1, K.se2 - 0.08], C2: [K.se2 - 0.08, K.L3 - 0.1],
  D1: [K.L3 - 0.1, K.una3 - 0.08], D2: [K.una3 - 0.08, K.yno - 0.1], D3: [K.yno - 0.1, K.casi3 - 0.08], HIT1: [K.casi3 - 0.08, K.L4 - 0.1],
  E1: [K.L4 - 0.1, K.nadie4 - 0.1], E2: [K.nadie4 - 0.1, K.ojo - 0.08],
  F1: [K.ojo - 0.08, K.se5 - 0.08], F2: [K.se5 - 0.08, K.L6 - 0.1],
  G: [K.L6 - 0.1, K.soy - 0.1],
  C: [K.soy - 0.1, K.enL - 0.04], L2: [K.enL - 0.04, 999],
};
const DUR = K.END + 0.6, LOOP = DUR - 0.4;

/* ---------- colores propios ---------- */
const BRAIN = '#F2C4BC', BRAIN_D = '#D99A92', ORANGE = '#FF9E2C', MINT = '#7FD1AE';
const ZCOL = [YEL, '#FF7FC0', ORANGE, YEL, '#FFD23F'];

/* ======================================================================
   EL CEREBRO (personaje de grabado, viewBox 0 0 600 500)
   ====================================================================== */
function brainInner(o = {}) {
  const r = rng(o.seed || 17), id = uid('br');
  const cx = 300, cy = 200, rx = 238, ry = 160, N = 34, pts = [];
  for (let i = 0; i < N; i++) {
    const a = Math.PI * 2 * i / N, bump = i % 2 ? 1.04 : 0.972, sa = Math.sin(a);
    pts.push([cx + Math.cos(a) * rx * bump, cy + sa * ry * bump * (sa > 0 ? 0.9 : 1)]);
  }
  const bp = smooth(pts);
  const cb = 'M84,300 C70,350 120,390 190,388 C250,386 280,360 272,322 C250,300 120,290 84,300 Z';
  const stem = 'M236,330 C246,380 250,420 244,476 L292,476 C290,420 294,380 306,336 Z';
  let s = cut(P(bp) + P(cb) + P(stem), 9, 11);
  // tronco y cerebelo (detrás)
  s += D(stem, BRAIN_D, 4) + HF(stem, 'hB');
  let fol = ''; for (let k = 0; k < 9; k++) fol += `<path d="M70,${306 + k * 10} Q180,${296 + k * 12} 290,${318 + k * 6}" stroke="${INK}" stroke-width="2.4" fill="none"/>`;
  s += D(cb, BRAIN_D, 4) + clipG(id + 'c', cb, fol + `<rect x="60" y="330" width="240" height="80" fill="url(#hA)" opacity=".5"/>`);
  // cuerpo
  s += D(bp, BRAIN, 5);
  // zonas que se encienden
  const Z = [[115, 200, 105, 120], [300, 62, 88, 100], [330, 300, 150, 58], [485, 175, 110, 125], [200, 92, 96, 76]];
  s += clipG(id + 'z', bp, Z.map((z, k) => `<g class="zn" style="opacity:0"><ellipse cx="${z[0]}" cy="${z[1]}" rx="${z[2] + 18}" ry="${z[3] + 18}" fill="${ZCOL[k]}" opacity=".55"/><ellipse cx="${z[0]}" cy="${z[1]}" rx="${z[2]}" ry="${z[3]}" fill="${ZCOL[k]}"/></g>`).join('') +
    `<g class="dead" style="opacity:0"><rect x="0" y="0" width="600" height="500" fill="#9b8f86"/><rect x="0" y="0" width="600" height="500" fill="url(#hF)" opacity=".5"/></g>` +
    `<ellipse cx="215" cy="300" rx="270" ry="105" fill="url(#hA)" opacity=".42"/><ellipse cx="380" cy="70" rx="130" ry="40" fill="#fff" opacity=".35"/>`);
  // circunvoluciones
  let g = '';
  for (let k = 0; k < 30; k++) {
    let a = r() * Math.PI * 2, rr = Math.sqrt(r()) * 0.82;
    let x = cx + Math.cos(a) * rx * rr, y = cy + Math.sin(a) * ry * rr * 0.92;
    let dir = r() * Math.PI * 2, d = `M${f1(x)},${f1(y)}`;
    const nseg = 2 + Math.floor(r() * 3);
    for (let j = 0; j < nseg; j++) {
      const L = 30 + r() * 34; dir += (r() - 0.5) * 2.4;
      const mx = x + Math.cos(dir) * L * 0.5 + Math.cos(dir + 1.57) * (r() - 0.5) * 40, my = y + Math.sin(dir) * L * 0.5 + Math.sin(dir + 1.57) * (r() - 0.5) * 40;
      x += Math.cos(dir) * L; y += Math.sin(dir) * L; d += `Q${f1(mx)},${f1(my)} ${f1(x)},${f1(y)}`;
    }
    g += `<path d="${d}" stroke="${INK}" stroke-width="${f1(3 + r() * 1.6)}" fill="none" stroke-linecap="round"/>`;
  }
  s += `<mask id="${id}m" maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="500"><rect x="0" y="0" width="600" height="500" fill="#fff"/><ellipse cx="${385 + (o.fx || 0)}" cy="192" rx="118" ry="92" fill="#000"/></mask>`;
  s += clipG(id + 'g', bp, `<g mask="url(#${id}m)">` + g + `<path d="M120,300 C220,286 330,300 470,282" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M300,40 C284,90 300,120 286,160" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/></g>`);
  s += `<path d="${bp}" fill="none" stroke="${INK}" stroke-width="5"/>`;
  // cara
  const fx = o.fx || 0;
  const eye = (x) => `<ellipse cx="${x}" cy="168" rx="34" ry="38" fill="#fff" stroke="${INK}" stroke-width="5"/><g class="pup"><circle cx="${x}" cy="174" r="14" fill="${INK}"/><circle cx="${x - 5}" cy="168" r="4.5" fill="#fff"/></g>`;
  const lidC = x => `<ellipse cx="${x}" cy="168" rx="36" ry="40" fill="${BRAIN}" stroke="${INK}" stroke-width="5"/><path d="M${x - 26},172 Q${x},190 ${x + 26},172" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  const lidH = x => `<path d="M${x - 37},168 A36,40 0 0 1 ${x + 37},168 Z" fill="${BRAIN}" stroke="${INK}" stroke-width="5"/>`;
  s += `<g transform="translate(${fx},0)">`;
  s += `<g class="chk" style="opacity:.0"><ellipse cx="318" cy="222" rx="22" ry="11" fill="${PINK}" opacity=".45"/><ellipse cx="452" cy="222" rx="22" ry="11" fill="${PINK}" opacity=".45"/></g>`;
  s += eye(340) + eye(430);
  s += `<g class="lidH" style="opacity:0">${lidH(340)}${lidH(430)}</g><g class="lidC" style="opacity:0">${lidC(340)}${lidC(430)}</g>`;
  s += `<g class="browL"><path d="M308,118 Q338,100 366,114" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/></g><g class="browR"><path d="M404,114 Q432,100 462,118" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/></g>`;
  // bocas
  s += `<g class="mS"><path d="M352,224 Q385,258 418,224" stroke="${INK}" stroke-width="6" fill="#7a2a2a" stroke-linecap="round" stroke-linejoin="round"/><path d="M366,236 Q385,246 404,236" stroke="${PINK}" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
  s += `<g class="mO" style="opacity:0"><ellipse cx="385" cy="238" rx="18" ry="22" fill="#7a2a2a" stroke="${INK}" stroke-width="5"/></g>`;
  s += `<g class="mZ" style="opacity:0"><path d="M352,236 q8,-12 16,0 t16,0 t16,0 t16,0" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  s += `<g class="mC" style="opacity:0"><path d="M340,214 Q385,300 430,214 Z" fill="#7a2a2a" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M350,216 l8,12 l8,-11 l8,12 l8,-12 l8,12 l8,-12 l8,12 l8,-12" fill="#fff" stroke="${INK}" stroke-width="2.5"/></g>`;
  s += `<g class="mF" style="opacity:0"><path d="M360,236 H410" stroke="${INK}" stroke-width="6" stroke-linecap="round"/></g>`;
  s += `</g>`;
  // extras: tirita, sudor
  s += `<g class="band" style="opacity:0"><g transform="rotate(-24 196 96)"><rect x="126" y="76" width="140" height="42" rx="20" fill="#E9C59A" stroke="${INK}" stroke-width="4"/><rect x="176" y="80" width="40" height="34" rx="6" fill="#F6E2C6" stroke="${INK}" stroke-width="2.5"/><circle cx="146" cy="92" r="2.5" fill="${INK}"/><circle cx="154" cy="104" r="2.5" fill="${INK}"/><circle cx="238" cy="92" r="2.5" fill="${INK}"/><circle cx="246" cy="104" r="2.5" fill="${INK}"/></g><g transform="rotate(40 196 96)"><rect x="140" y="78" width="112" height="38" rx="18" fill="#E9C59A" stroke="${INK}" stroke-width="4"/></g></g>`;
  s += `<g class="sweat" style="opacity:0"><path d="M520,96 Q500,130 520,144 Q540,130 520,96 Z" fill="#fff" stroke="${INK}" stroke-width="4"/></g>`;
  return s;
}
function mkBrain(pa, b, o = {}) {
  const f = mk(pa, b, brainInner(o), '0 0 600 500', 'brain'); const q = s => f.d.querySelector(s);
  f.zn = [...f.d.querySelectorAll('.zn')]; f.dead = q('.dead');
  f.m = { s: q('.mS'), o: q('.mO'), z: q('.mZ'), c: q('.mC'), f: q('.mF') };
  f.band = q('.band'); f.sweat2 = q('.sweat'); f.chk = q('.chk');
  return f;
}
function brainFace(f, t, o = {}) {
  face(f, t, o);
  const m = o.mouth || 's'; for (const k in f.m) f.m[k].style.opacity = k === m ? 1 : 0;
  if (m === 'c') f.m.c.setAttribute('transform', `translate(385 214) scale(1 ${f1(0.25 + 0.75 * (o.chomp == null ? 1 : o.chomp))}) translate(-385 -214)`);
  const z = o.zones || [0, 0, 0, 0, 0]; f.zn.forEach((e, i) => e.style.opacity = z[i] || 0);
  f.dead.style.opacity = o.dead || 0;
  f.band.style.opacity = o.band ? 1 : 0; f.sweat2.style.opacity = o.sweat ? 1 : 0; f.chk.style.opacity = o.blush ? 1 : 0;
}
const ALLZ = [1, 1, 1, 1, 1];
const zonesUntil = (t, ts) => ts.map(t0 => clamp((t - t0) / 0.18));

/* ---------- batería ---------- */
function battery(pa, x, y, w, h, o = {}) {
  const d = box(pa, x, y, w + 40, h, { zIndex: o.z || 20, filter: `drop-shadow(8px 10px 0 ${SH})` });
  box(d, w - 4, h * 0.3, 40, h * 0.4, { background: INK, borderRadius: '0 14px 14px 0' });
  const body = box(d, 0, 0, w, h, { background: '#fff', border: `10px solid ${INK}`, borderRadius: '30px', outline: '8px solid #fff' });
  const fill = box(body, 8, 8, w - 36, h - 36, { background: RED, borderRadius: '12px', transformOrigin: '0 50%' });
  const seg = box(body, 8, 8, w - 36, h - 36, { backgroundImage: `repeating-linear-gradient(90deg, transparent 0 ${(w - 36) / 10 - 6}px, #fff ${(w - 36) / 10 - 6}px ${(w - 36) / 10}px)`, borderRadius: '12px' });
  const lbl = el('div', body, { left: '0', top: '0', width: px(w - 20), height: px(h - 20), lineHeight: px(h - 20), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(o.fs || h * 0.62), color: INK, whiteSpace: 'nowrap', textShadow: '3px 3px 0 #fff, -3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff' }, o.label || '10 %');
  return { d, body, fill, seg, lbl };
}

/* ---------- reloj de un día (sin cifras): sol arriba, luna abajo ---------- */
function clockSvg(sz) {
  let ticks = ''; for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2, r0 = k % 6 ? 0.8 : 0.72; ticks += `<path d="M${f1(100 + Math.cos(a) * 88 * r0)},${f1(100 + Math.sin(a) * 88 * r0)} L${f1(100 + Math.cos(a) * 84)},${f1(100 + Math.sin(a) * 84)}" stroke="${INK}" stroke-width="${k % 6 ? 3 : 6}" stroke-linecap="round"/>`; }
  const sun = `<g transform="translate(100,46)"><circle r="15" fill="${YEL}" stroke="${INK}" stroke-width="3.5"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(k => `<path d="M${f1(Math.cos(k * 0.785) * 20)},${f1(Math.sin(k * 0.785) * 20)} L${f1(Math.cos(k * 0.785) * 27)},${f1(Math.sin(k * 0.785) * 27)}" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`).join('')}</g>`;
  const moon = `<g transform="translate(100,154)"><path d="M6,-17 A18,18 0 1 0 6,17 A13,13 0 1 1 6,-17 Z" fill="#B8C7E8" stroke="${INK}" stroke-width="3.5"/></g>`;
  return `<svg viewBox="0 0 200 200" width="${sz}" height="${sz}" style="overflow:visible">${cut('<circle cx="100" cy="100" r="96"/>', 6, 8)}<circle cx="100" cy="100" r="96" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><circle cx="100" cy="100" r="86" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/><path d="M14,100 A86,86 0 0 0 186,100 Z" fill="#2f3a5a" opacity=".22"/>${ticks}${sun}${moon}</svg>`;
}
const handSvg = sz => `<svg viewBox="0 0 200 200" width="${sz}" height="${sz}" style="overflow:visible"><path d="M100,108 L100,26" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M100,108 L100,26" stroke="${RED}" stroke-width="5" stroke-linecap="round"/><circle cx="100" cy="100" r="11" fill="${INK}"/><circle cx="100" cy="100" r="5" fill="${BRASS}"/></svg>`;

/* ---------- claqueta ---------- */
function clapper(pa, x, y, w = 420) {
  const h = w * 0.82;
  const d = box(pa, x, y, w, h, { zIndex: 6 });
  const bodyP = `M10,${h * 0.26} H${w - 10} V${h - 10} H10 Z`;
  let rows = ''; for (let k = 0; k < 3; k++) rows += `<path d="M30,${f1(h * 0.5 + k * h * 0.15)} H${w - 30}" stroke="#fff" stroke-width="3" opacity=".7"/>`;
  d.innerHTML = `<svg width="${w}" height="${h}" style="overflow:visible">${cut(P(bodyP))}<path d="${bodyP}" fill="#2a2522" stroke="${INK}" stroke-width="6"/><path d="${bodyP}" fill="url(#hA)" opacity=".35"/>${rows}<text x="34" y="${f1(h * 0.44)}" font-family="SpecialElite" font-size="${f1(w * 0.075)}" fill="#fff">TOMA 1 · ESCENA 10</text></svg>`;
  const arm = box(d, 0, 0, w, h * 0.3, { zIndex: 2, transformOrigin: `16px ${f1(h * 0.24)}px` });
  let st = ''; for (let k = -1; k < 8; k++) st += `<path d="M${k * w / 6 + 20},${f1(h * 0.08)} l${f1(w / 12)},0 l${f1(-w / 14)},${f1(h * 0.14)} l${f1(-w / 12)},0 Z" fill="#fff"/>`;
  arm.innerHTML = `<svg width="${w}" height="${f1(h * 0.3)}" style="overflow:visible"><g><rect x="8" y="${f1(h * 0.06)}" width="${w - 16}" height="${f1(h * 0.17)}" rx="6" fill="#2a2522" stroke="${INK}" stroke-width="6"/><clipPath id="clpA"><rect x="8" y="${f1(h * 0.06)}" width="${w - 16}" height="${f1(h * 0.17)}" rx="6"/></clipPath><g clip-path="url(#clpA)">${st}</g><rect x="8" y="${f1(h * 0.06)}" width="${w - 16}" height="${f1(h * 0.17)}" rx="6" fill="none" stroke="${INK}" stroke-width="6"/><circle cx="18" cy="${f1(h * 0.22)}" r="10" fill="${BRASS}" stroke="${INK}" stroke-width="3"/></g></svg>`;
  return { d, arm };
}

/* ---------- carpeta «PRUEBAS» ---------- */
function folder(pa, x, y, w, h) {
  const d = box(pa, x, y, w, h, { zIndex: 8 });
  d.innerHTML = `<svg width="${w}" height="${h}" style="overflow:visible">${cut(`<path d="M10,40 H${w * 0.36} L${w * 0.42},10 H${w - 10} V${h - 10} H10 Z"/>`)}<path d="M10,40 H${w * 0.36} L${w * 0.42},10 H${w - 10} V${h - 10} H10 Z" fill="#C9A26A" stroke="${INK}" stroke-width="6"/><path d="M10,40 H${w - 10} V${h - 10} H10 Z" fill="url(#hP)" opacity=".6"/><rect x="40" y="70" width="${w - 80}" height="${h - 110}" fill="#3a2a1e" opacity=".85"/><path d="M60,${h - 60} H${w - 60}" stroke="${INK}" stroke-width="3" stroke-dasharray="8 8" opacity=".6"/></svg>`;
  const flap = box(d, 0, 50, w, h - 50, { zIndex: 3, transformOrigin: '50% 100%' });
  flap.innerHTML = `<svg width="${w}" height="${h - 50}" style="overflow:visible"><path d="M6,0 H${w - 6} L${w - 22},${h - 60} H22 Z" fill="#E0BE86" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M6,0 H${w - 6} L${w - 22},${h - 60} H22 Z" fill="url(#hP)" opacity=".5"/><rect x="${w / 2 - 170}" y="${(h - 50) / 2 - 56}" width="340" height="100" rx="8" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/><text x="${w / 2}" y="${(h - 50) / 2 + 12}" text-anchor="middle" font-family="Rye" font-size="54" fill="${INK}">PRUEBAS</text><text x="${w / 2}" y="${(h - 50) / 2 + 100}" text-anchor="middle" font-family="SpecialElite" font-size="34" fill="${INK}">del «10 %»</text></svg>`;
  return { d, flap };
}
const mothSvg = () => `<svg viewBox="-60 -40 120 80" width="100%" height="100%" style="overflow:visible"><g class="wl"><path d="M-4,0 C-40,-40 -60,-10 -50,10 C-40,26 -14,14 -4,4 Z" fill="#D8CBB0" stroke="${INK}" stroke-width="3"/><path d="M-12,-2 C-30,-14 -40,-4 -36,6" stroke="${INK}" stroke-width="2" fill="none"/></g><g class="wr"><path d="M4,0 C40,-40 60,-10 50,10 C40,26 14,14 4,4 Z" fill="#D8CBB0" stroke="${INK}" stroke-width="3"/><path d="M12,-2 C30,-14 40,-4 36,6" stroke="${INK}" stroke-width="2" fill="none"/></g><ellipse cx="0" cy="4" rx="6" ry="16" fill="#8a7a64" stroke="${INK}" stroke-width="3"/><path d="M-2,-10 q-6,-12 -14,-14 M2,-10 q6,-12 14,-14" stroke="${INK}" stroke-width="2.5" fill="none"/></svg>`;

/* ---------- rayo ---------- */
const boltSvg = (col = YEL) => `<svg viewBox="0 0 100 160" width="100%" height="100%" style="overflow:visible"><path d="M58,4 L14,92 L48,92 L32,156 L88,58 L54,58 L72,4 Z" fill="#fff" stroke="#fff" stroke-width="16" stroke-linejoin="round"/><path d="M58,4 L14,92 L48,92 L32,156 L88,58 L54,58 L72,4 Z" fill="${col}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/></svg>`;

/* ---------- barrita de energía ---------- */
function energyBar(pa, x, y, w, h) {
  const d = box(pa, x, y, w, h, { zIndex: 12 });
  const inner = box(d, 0, 0, w, h);
  inner.innerHTML = `<svg width="${w}" height="${h}" style="overflow:visible">${cut(`<rect x="0" y="0" width="${w}" height="${h}" rx="14"/>`, 6, 8)}<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="${PINK}" stroke="${INK}" stroke-width="6"/><path d="M${w - 50},0 l14,${h / 6} l-14,${h / 6} l14,${h / 6} l-14,${h / 6} l14,${h / 6} l-14,${h / 6}" stroke="${INK}" stroke-width="4" fill="none"/><rect x="40" y="${h * 0.22}" width="${w - 120}" height="${h * 0.56}" rx="8" fill="${YEL}" stroke="${INK}" stroke-width="4"/><text x="${(w - 40) / 2 + 20}" y="${h * 0.66}" text-anchor="middle" font-family="Rye" font-size="${h * 0.36}" fill="${INK}">ENERGÍA</text></svg>`;
  return { d, inner };
}

/* ---------- sofá (viewBox 0 0 760 380) ---------- */
function sofaSvg() {
  const back = 'M60,40 Q60,10 100,10 H660 Q700,10 700,40 V220 H60 Z';
  const seat = 'M40,200 H720 V290 H40 Z', armL = 'M0,120 Q0,90 40,90 Q80,90 80,120 V300 H0 Z', armR = 'M680,120 Q680,90 720,90 Q760,90 760,120 V300 H680 Z';
  let s = cut(P(back) + P(seat) + P(armL) + P(armR) + '<rect x="30" y="290" width="700" height="40"/>');
  s += D(back, '#B23A48', 5) + HF(back, 'hA');
  for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) s += `<circle cx="${130 + i * 100 + j * 50}" cy="${70 + j * 60}" r="7" fill="${BRASS}" stroke="${INK}" stroke-width="2.5"/>`;
  s += D(seat, '#C9485A', 5) + `<path d="M380,206 V286" stroke="${INK}" stroke-width="3"/>` + D(armL, '#B23A48', 5) + HF(armL, 'hB') + D(armR, '#B23A48', 5) + HF(armR, 'hB');
  s += `<rect x="30" y="290" width="700" height="34" rx="6" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><path d="M60,324 l-10,46 h26 l8,-46 Z M700,324 l10,46 h-26 l-8,-46 Z" fill="${WOOD}" stroke="${INK}" stroke-width="4"/>`;
  return s;
}

/* ---------- escáner de época (anillo) ---------- */
function scannerRing(w) {
  const h = w; let bolts = '';
  for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; bolts += `<circle cx="${f1(w / 2 + Math.cos(a) * w * 0.455)}" cy="${f1(h / 2 + Math.sin(a) * h * 0.455)}" r="8" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>`; }
  return `<svg width="${w}" height="${h}" style="overflow:visible"><circle cx="${w / 2 + 10}" cy="${h / 2 + 12}" r="${w * 0.45}" fill="none" stroke="${SH}" stroke-width="${w * 0.1}"/><circle cx="${w / 2}" cy="${h / 2}" r="${w * 0.45}" fill="none" stroke="#fff" stroke-width="${w * 0.12}"/><circle cx="${w / 2}" cy="${h / 2}" r="${w * 0.45}" fill="none" stroke="${INK}" stroke-width="${w * 0.1}"/><circle cx="${w / 2}" cy="${h / 2}" r="${w * 0.45}" fill="none" stroke="#9fb3b0" stroke-width="${w * 0.085}"/><circle cx="${w / 2}" cy="${h / 2}" r="${w * 0.45}" fill="none" stroke="url(#hA)" stroke-width="${w * 0.085}" opacity=".7"/>${bolts}</svg>`;
}
