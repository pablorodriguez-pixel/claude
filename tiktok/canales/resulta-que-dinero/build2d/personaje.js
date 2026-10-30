// Personaje v2: cabezón expresivo con cejas, ojos con brillo, cuerpo con hombros, piernas, manos y poses.
// Misma API que v1 (x, y = pies, s, ropa, ropa2, pelo, gorra, canas, gafas, piel, cara, mira, brazo, id, extra, cuerpo)
// y además: bi (pose brazo izquierdo), peinado ('corto'|'tupe'|'largo'|'moño'|'coleta'|'calvo'), pant, traje, corbata,
//   barba, fx ('sudor'|'brillo'|'?'|'!'|'enfado'|'zzz'|'corazon'), caras nuevas 'enfado' | 'preocupado' | 'dolar'.
// Todos respiran, parpadean y mueven la cabeza solos (vida(t), llamada desde render).
(() => {
  const POSE = {   // [codo, mano] del brazo derecho; el izquierdo es su espejo
    abajo: [[84, -245], [80, -165]], arriba: [[118, -405], [104, -500]], delante: [[122, -268], [182, -300]],
    jarras: [[128, -248], [60, -182]], cabeza: [[132, -400], [98, -478]], señala: [[132, -352], [206, -420]],
    pecho: [[96, -236], [18, -282]], cruzados: [[84, -250], [-36, -262]], ofrece: [[110, -230], [170, -250]],
  };
  const brazo = (lado, pose, ropa, piel) => {
    const [[ex, ey], [hx, hy]] = POSE[pose] || POSE.abajo, sx = 64 * lado, d = `M${sx} -326 Q${ex * lado} ${ey} ${hx * lado} ${hy}`;
    return `<path d="${d}" stroke="${TINTA}" stroke-width="42" stroke-linecap="round" fill="none"/><path d="${d}" stroke="${ropa}" stroke-width="30" stroke-linecap="round" fill="none"/>
      <path d="M${sx} -326 Q${ex * lado} ${ey} ${hx * lado} ${hy}" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".14" transform="translate(${-6 * lado},-4)"/>
      <circle cx="${hx * lado}" cy="${hy}" r="19" fill="${piel}" ${OL}/>${pose === 'señala' ? `<path d="M${hx * lado} ${hy} l${22 * lado} -18" stroke="${TINTA}" stroke-width="16" stroke-linecap="round"/><path d="M${hx * lado} ${hy} l${22 * lado} -18" stroke="${piel}" stroke-width="7" stroke-linecap="round"/>` : ''}`;
  };
  const CEJA = {   // [y, inclinación interior (+ = interior más bajo)] por expresión
    normal: [-46, 0], sonrisa: [-48, -2], feliz: [-54, -4], triste: [-42, -12], sorpresa: [-62, -2], cansado: [-36, 0],
    serio: [-40, 10], enfado: [-38, 16], preocupado: [-44, -14], dolar: [-56, -4],
  };
  const ojoAbierto = (x, ex, ey, r = 1) => `<ellipse cx="${x}" cy="-6" rx="${15 * r}" ry="${18 * r}" fill="#fff" stroke="${TINTA}" stroke-width="4.5"/>
      <circle cx="${x + ex}" cy="${-4 + ey}" r="${9 * r}" fill="${TINTA}"/><circle cx="${x + ex + 3}" cy="${-8 + ey}" r="${3.2 * r}" fill="#fff"/>`;

  window.persona = (o) => {
    const s = (o.s || 1) * 1.35, ropa = o.ropa || '#4f6bd8', ropa2 = o.ropa2 || shade(ropa, -28), piel = o.piel || '#fbe9dc';
    const mira = o.mira || 0, cara = o.cara || 'normal', ex = mira * 6, pant = o.pant || shade(ropa, -55), pe = o.peinado || (o.pelo ? 'corto' : 'calvo');
    const sd = ((o.x * 7.13 + o.y * 3.7) % 10 + 10) % 10;   // semilla de la animación de reposo
    // ojos
    let ojos = '', blink = true;
    if (cara === 'feliz') { ojos = `<path d="M${-40 + ex} -2 q14 -20 28 0 M${12 + ex} -2 q14 -20 28 0" ${OL} fill="none"/>`; blink = false }
    else if (cara === 'cansado') { ojos = `<path d="M${-40 + ex} -4 h28 M${12 + ex} -4 h28" ${OL}/><path d="M${-38 + ex} 8 q12 6 24 0 M${14 + ex} 8 q12 6 24 0" stroke="${TINTA}" stroke-width="3" fill="none" opacity=".45"/>`; blink = false }
    else if (cara === 'dolar') { ojos = [-26, 26].map(x => `<text x="${x + ex}" y="12" font-family="Figtree" font-weight="800" font-size="50" text-anchor="middle" fill="#2e9b5a" stroke="${TINTA}" stroke-width="3" paint-order="stroke">$</text>`).join(''); blink = false }
    else if (cara === 'sorpresa') ojos = ojoAbierto(-26 + ex, ex * .4, 0, 1.25) + ojoAbierto(26 + ex, ex * .4, 0, 1.25);
    else { const ey = cara === 'triste' || cara === 'preocupado' ? 4 : 0; ojos = ojoAbierto(-26 + ex, ex * .5, ey) + ojoAbierto(26 + ex, ex * .5, ey);
      if (cara === 'serio' || cara === 'enfado') ojos += `<path d="M${-44 + ex} -22 h34 M${10 + ex} -22 h34" stroke="${piel}" stroke-width="14"/>` }   // párpado caído
    const [cy, ci] = CEJA[cara] || CEJA.normal;
    const cejas = `<path d="M${-44 + ex} ${cy - ci * .5} Q${-30 + ex} ${cy - 8 - ci * .2} ${-12 + ex} ${cy + ci * .6} M${44 + ex} ${cy - ci * .5} Q${30 + ex} ${cy - 8 - ci * .2} ${12 + ex} ${cy + ci * .6}" stroke="${o.cejas || (o.canas && !o.pelo ? '#9a9a9a' : TINTA)}" stroke-width="7" stroke-linecap="round" fill="none"/>`;
    const boca = {
      normal: `<path d="M${-12 + ex} 40 q12 6 24 0" ${OL} fill="none"/>`, serio: `<path d="M${-14 + ex} 42 h28" ${OL}/>`,
      feliz: `<path d="M${-26 + ex} 30 q26 36 52 0 z" fill="#8a2b2b" ${OL}/><path d="M${-14 + ex} 50 q14 8 28 0" stroke="#ff8a8a" stroke-width="6" fill="none"/>`,
      sonrisa: `<path d="M${-20 + ex} 34 q20 20 40 0" ${OL} fill="none"/>`, dolar: `<path d="M${-26 + ex} 30 q26 36 52 0 z" fill="#8a2b2b" ${OL}/>`,
      triste: `<path d="M${-16 + ex} 48 q16 -14 32 0" ${OL} fill="none"/>`, preocupado: `<path d="M${-16 + ex} 46 q8 -8 16 0 q8 8 16 0" ${OL} fill="none"/>`,
      sorpresa: `<ellipse cx="${ex}" cy="46" rx="13" ry="17" fill="#8a2b2b" ${OL}/>`, enfado: `<path d="M${-18 + ex} 48 q18 -12 36 0" ${OL} fill="none"/>`,
      cansado: `<path d="M${-12 + ex} 44 q12 -6 24 0" ${OL} fill="none"/>`,
    }[cara] || '';
    const nariz = `<path d="M${-2 + ex * 1.3} 14 q8 6 0 12" stroke="${shade(piel, -70)}" stroke-width="4" stroke-linecap="round" fill="none"/>`;
    // pelo
    const pc = o.pelo || '#2a1c14';
    const detras = pe === 'largo' ? `<path d="M-92 -10 Q-104 -104 0 -106 Q104 -104 92 -10 L98 120 Q70 140 40 110 L-40 110 Q-70 140 -98 120 Z" fill="${pc}" ${OL}/>`
      : pe === 'coleta' ? `<path d="M70 -60 q70 10 60 110 q-6 40 -30 30 q20 -60 -40 -100z" fill="${pc}" ${OL}/>` : '';
    let pelo = '';
    if (pe !== 'calvo') {
      pelo = `<path d="M-88 -4 Q-96 -98 0 -100 Q96 -98 88 -4 Q78 -46 40 -58 Q10 -44 -24 -56 Q-60 -54 -88 -4Z" fill="${pc}" ${OL}/>`;
      if (pe === 'tupe') pelo += `<path d="M-40 -90 q30 -40 90 -14 q-20 2 -30 18z" fill="${pc}" ${OL}/>`;
      if (pe === 'moño') pelo += `<circle cx="0" cy="-104" r="30" fill="${pc}" ${OL}/>`;
      pelo += `<path d="M-50 -82 q30 -14 60 -10" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".22"/>`;
    }
    const canas = o.canas ? `<path d="M-78 -36 q-26 22 -8 58 q-6 -34 14 -40 M78 -36 q26 22 8 58 q6 -34 -14 -40" fill="${o.canas}" ${OL}/>
      ${o.pelo ? '' : `<path d="M-40 -78 q20 -22 46 -14 q22 -14 34 6 q-30 -6 -40 6 q-20 -10 -40 2z" fill="${o.canas}" ${OL}/>`}` : '';
    const gorra = o.gorra ? `<path d="M-84 -26 q6 -80 84 -82 q78 2 84 82 z" fill="${o.gorra}" ${OL}/><path d="M-88 -26 q50 -18 140 -6 q30 6 50 20 q-76 -4 -190 -14z" fill="${shade(o.gorra, -30)}" ${OL}/>` : '';
    const barba = o.barba ? `<path d="M-74 10 q4 90 74 92 q70 -2 74 -92 q-20 30 -40 30 q-34 -14 -68 0 q-20 0 -40 -30z" fill="${o.barba}" ${OL}/>` : '';
    const gafas = o.gafas ? `<g fill="none" stroke="${TINTA}" stroke-width="5"><rect x="${-50 + ex}" y="-30" width="46" height="40" rx="14" fill="#fff" fill-opacity=".18"/><rect x="${4 + ex}" y="-30" width="46" height="40" rx="14" fill="#fff" fill-opacity=".18"/><path d="M${-4 + ex} -14 h8 M-50 -16 l-30 -4 M50 -16 l30 -4"/></g>` : '';
    const fx = {
      sudor: `<path d="M86 -70 q14 22 0 30 q-14 -8 0 -30z" fill="#7cc8ff" ${OL}/>`,
      enfado: `<path d="M50 -88 l10 14 l14 -10 M66 -98 l4 18 l16 2" stroke="#e23b3b" stroke-width="8" stroke-linecap="round" fill="none"/>`,
      '?': `<text x="96" y="-90" font-family="Figtree" font-weight="800" font-size="90" fill="#fff" stroke="${TINTA}" stroke-width="6" paint-order="stroke">?</text>`,
      '!': `<text x="92" y="-90" font-family="Figtree" font-weight="800" font-size="100" fill="#ffd23a" stroke="${TINTA}" stroke-width="6" paint-order="stroke">!</text>`,
      brillo: [[-110, -80, 1], [110, -100, .8], [100, 30, .6]].map(([x, y, k]) => `<path d="M${x} ${y - 22 * k} q4 18 22 ${22 * k} q-18 4 -22 ${22 * k} q-4 -18 -22 ${-22 * k} q18 -4 22 ${-22 * k}z" fill="#ffd23a" stroke="${TINTA}" stroke-width="3"/>`).join(''),
      zzz: `<text x="80" y="-90" font-family="Figtree" font-weight="800" font-size="56" fill="#fff" stroke="${TINTA}" stroke-width="5" paint-order="stroke">z<tspan font-size="40" dy="-30">z</tspan></text>`,
      corazon: `<path d="M100 -80 c-30 -30 -60 10 0 40 c60 -30 30 -70 0 -40z" fill="#ff5a7a" ${OL}/>`,
    }[o.fx] || '';
    // cuerpo
    const cuello = `<rect x="-20" y="-386" width="40" height="44" fill="${shade(piel, -14)}" ${OL}/>`;
    const torso = `<path d="M-60 -136 L-70 -300 Q-72 -352 -26 -354 L26 -354 Q72 -352 70 -300 L60 -136 Q0 -124 -60 -136Z" fill="${grad(ropa, ropa2, 0)}" ${OL}/>
      <path d="M34 -350 Q70 -348 70 -300 L60 -138 Q48 -134 40 -134 Q52 -240 34 -350Z" fill="#000" opacity=".13"/>`;
    const cuelloRopa = o.traje ? `<path d="M-26 -354 L0 -272 L26 -354Z" fill="#f4f4f4" ${OL}/><path d="M-7 -344 h14 l6 54 l-13 18 l-13 -18z" fill="${o.corbata || '#b8323a'}" stroke="${TINTA}" stroke-width="4"/>
      <path d="M-30 -352 L-4 -262 L-24 -250 M30 -352 L4 -262 L24 -250" stroke="${TINTA}" stroke-width="5" fill="none" stroke-linejoin="round"/>`
      : `<path d="M-26 -354 q26 26 52 0" fill="${shade(ropa, 30)}" ${OL}/>`;
    const piernas = `<rect x="-48" y="-152" width="42" height="140" rx="16" fill="${pant}" ${OL}/><rect x="6" y="-152" width="42" height="140" rx="16" fill="${pant}" ${OL}/>
      <ellipse cx="${-30 + mira * 8}" cy="-12" rx="34" ry="16" fill="#2a2420" ${OL}/><ellipse cx="${30 + mira * 8}" cy="-12" rx="34" ry="16" fill="#2a2420" ${OL}/>`;
    const bi = o.bi || (o.brazo === 'cruzados' ? 'cruzados' : 'abajo');
    const cabeza = `<g class="pjh" data-y="-440" transform="translate(0,-440)">${detras}
      <circle cx="-84" cy="4" r="18" fill="${piel}" ${OL}/><circle cx="84" cy="4" r="18" fill="${piel}" ${OL}/>
      <circle r="86" fill="${radial(piel, shade(piel, -12))}" ${OL}/>${barba}${pelo}${canas}${gorra}
      <ellipse cx="-50" cy="24" rx="14" ry="8" fill="#f28c8c" opacity=".45"/><ellipse cx="50" cy="24" rx="14" ry="8" fill="#f28c8c" opacity=".45"/>
      <g class="cara"><g ${blink ? 'class="pjo"' : ''}>${ojos}</g>${cejas}${nariz}${boca}</g>${gafas}${fx}</g>`;
    return `<g ${o.id ? `id="${o.id}"` : ''} class="pj" data-k="${sd.toFixed(2)}" transform="translate(${o.x},${o.y}) scale(${s})">
      <ellipse cx="0" cy="0" rx="86" ry="16" fill="#000" opacity=".22"/>
      <g class="pjb">${piernas}${brazo(-1, bi, ropa, piel)}${cuello}${torso}${cuelloRopa}${o.cuerpo || ''}${brazo(1, o.brazo || 'abajo', ropa, piel)}${cabeza}${o.brazo === 'cabeza' ? `<circle cx="98" cy="-478" r="19" fill="${piel}" ${OL}/>` : ''}</g>${o.extra || ''}</g>`;
  };

  // ráfaga de rayos de cómic detrás de un momento clave (a = giro en grados)
  window.rafaga = (cx, cy, c = '#fff', a = 0, o = .22, n = 18) => `<g transform="translate(${cx},${cy}) rotate(${a})" opacity="${o}">${Array.from({ length: n }, (_, i) =>
    `<path d="M0 0 L-90 -1600 L90 -1600Z" fill="${c}" transform="rotate(${i * 360 / n})"/>`).join('')}</g>`;
  // vida: respiración, balanceo de cabeza y parpadeo, deterministas en t
  window.vida = (t, raiz) => {
    for (const e of raiz.querySelectorAll('.pj')) {
      const k = +e.dataset.k, b = e.querySelector('.pjb'), h = e.querySelector('.pjh'), o = e.querySelector('.pjo');
      b.setAttribute('transform', `scale(${1 - .006 * Math.sin(t * 2.4 + k)},${1 + .014 * Math.sin(t * 2.4 + k)})`);
      h.setAttribute('transform', `translate(0,${-440 + 3 * Math.sin(t * 2.4 + k + .6)}) rotate(${2.4 * Math.sin(t * 1.3 + k * 1.7)})`);
      if (o) { const per = 3.2 + k * .15, u = ((t + k * .37) % per) / .16, c = u < 1 ? 1 - .9 * Math.sin(Math.PI * u) : 1;
        o.setAttribute('transform', `translate(0,-6) scale(1,${c.toFixed(3)}) translate(0,6)`) }
    }
  };
})();
