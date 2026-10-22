// Personajes vectoriales con rig: Álex (actual) y Marco Aurelio. Pies en (0,0), altura ~780.
// Cada personaje se dibuja de nuevo en cada fotograma a partir de una pose (sencillo y determinista).
const INK = '#1d1f2a';
const OL = `stroke="${INK}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"`;
const rad = d => d * Math.PI / 180;
const pt = (x, y, len, ang) => [x + Math.sin(rad(ang)) * len, y + Math.cos(rad(ang)) * len];

// extremidad de dos segmentos (ángulos en grados: 0 = hacia abajo, positivo = hacia delante/derecha)
function limb(x, y, l1, l2, a1, a2, w, col, end) {
  const [kx, ky] = pt(x, y, l1, a1), [fx, fy] = pt(kx, ky, l2, a1 + a2);
  const path = `M${x} ${y} L${kx} ${ky} L${fx} ${fy}`;
  return { svg: `<path d="${path}" fill="none" stroke="${INK}" stroke-width="${w + 9}" stroke-linecap="round" stroke-linejoin="round"/><path d="${path}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>` + (end ? end(fx, fy, a1 + a2) : ''), end: [fx, fy] };
}

// boca: visema por apertura y emoción
function mouth(cx, cy, open, emo) {
  const c = emo === 'smile' ? 9 : emo === 'sad' ? -8 : emo === 'surprise' ? 0 : 0;
  if (open < 0.07) {
    const w = emo === 'smile' ? 22 : 17;
    return `<path d="M${cx - w} ${cy} Q${cx} ${cy + c} ${cx + w} ${cy}" fill="none" ${OL}/>`;
  }
  const h = 6 + open * 26, w = 14 + open * 6 + (emo === 'smile' ? 5 : 0);
  return `<path d="M${cx - w} ${cy} Q${cx} ${cy - 3 + c * .4} ${cx + w} ${cy} Q${cx} ${cy + h + c * .3} ${cx - w} ${cy}Z" fill="#6e2a28" ${OL}/>` +
    (open > .35 ? `<path d="M${cx - w * .55} ${cy + 1.5} h${w * 1.1}" stroke="#fff" stroke-width="5" stroke-linecap="round"/>` : '') +
    (open > .5 ? `<ellipse cx="${cx}" cy="${cy + h * .62}" rx="${w * .45}" ry="${h * .18}" fill="#c4615a"/>` : '');
}

function eyes(o, ex, ey, sp, rx, ry, skin) {
  const [lx, ly] = o.look || [0, 0];
  const b = Math.max(0, Math.min(1, o.blink || 0)), open = 1 - b;
  let s = '';
  for (const k of [-1, 1]) {
    const x = ex + k * sp;
    s += `<ellipse cx="${x}" cy="${ey}" rx="${rx}" ry="${ry}" fill="#fff" ${OL}/>`;
    s += `<circle cx="${x + lx}" cy="${ey + ly}" r="${rx * .52}" fill="${INK}"/><circle cx="${x + lx + 3}" cy="${ey + ly - 4}" r="2.6" fill="#fff"/>`;
    // párpado superior (cubre según parpadeo o expresión «cansado»)
    const lid = Math.max(b, o.sleepy || 0);
    if (lid > 0.02) s += `<path d="M${x - rx - 3} ${ey - ry - 3} H${x + rx + 3} V${ey - ry + lid * 2 * ry} Q${x} ${ey - ry + lid * 2 * ry + 5} ${x - rx - 3} ${ey - ry + lid * 2 * ry}Z" fill="${skin}" ${OL}/>`;
  }
  return s;
}

function brows(o, ex, ey, sp, col, thick) {
  const m = { n: [0, 0], up: [-9, -8], down: [5, 12], sad: [-4, -14], angry: [6, 16], soft: [-3, -4] }[o.brow || 'n'];
  let s = '';
  for (const k of [-1, 1]) {
    const x = ex + k * sp, r = m[1] * k;
    s += `<path d="M${x - 17} ${ey + m[0]} Q${x} ${ey + m[0] - 7} ${x + 17} ${ey + m[0]}" transform="rotate(${r} ${x} ${ey})" fill="none" stroke="${col}" stroke-width="${thick}" stroke-linecap="round"/>`;
  }
  return s;
}

// ---------------- ÁLEX ----------------
function drawAlex(o) {
  const SK = '#eab68f', SKD = '#d49b76', HO = '#2f7a72', HOD = '#245f59', JE = '#2c3a5c', JED = '#222d48', HA = '#3b2a20';
  const sit = !!o.sit, walk = o.walk || 0, ph = o.phase || 0;
  let g = '';
  const hipY = sit ? -163 : -318, hipX = 0;
  const bob = walk ? Math.abs(Math.sin(ph)) * -10 * walk : 0;
  const lean = o.lean || 0;
  // ---- piernas
  const shoe = (x, y, a) => `<g transform="translate(${x},${y}) rotate(${-a * .3}) scale(1.25)"><path d="M-14 -6 Q-16 -22 4 -22 L30 -18 Q46 -14 46 0 L46 6 H-16Z" fill="#f2efe8" ${OL}/><path d="M-16 6 H46" stroke="${INK}" stroke-width="7"/></g>`;
  const legs = [];
  for (const k of [-1, 1]) {
    let a1, a2;
    if (sit) { a1 = k * 12; a2 = -k * 12; }
    else if (walk) { a1 = Math.sin(ph + (k > 0 ? 0 : Math.PI)) * 26 * walk; a2 = Math.max(0, -Math.sin(ph + (k > 0 ? 0 : Math.PI) + .9)) * -40 * walk; }
    else { a1 = k * 3; a2 = 0; }
    const col = k > 0 ? JE : JED;
    legs.push(limb(hipX + k * 30, hipY + bob, sit ? 70 : 150, sit ? 150 : 150, a1, a2, 50, col, shoe));
  }
  if (!sit) g += legs[0].svg + legs[1].svg;
  // ---- torso (sudadera)
  const tY = hipY + bob;
  g += `<g transform="rotate(${lean} 0 ${tY})">`;
  const sh = tY - 270; // altura de hombros
  // brazo trasero
  const arm = (k, a1, a2) => limb(k * 70, sh + 24, 118, 112, a1, a2, 36, k > 0 ? HO : HOD, (x, y) => `<circle cx="${x}" cy="${y}" r="21" fill="${SK}" ${OL}/>`);
  const aL = arm(-1, o.armL ?? -8, o.elbowL ?? 0), aR = arm(1, o.armR ?? 8, o.elbowR ?? 0);
  g += aL.svg;
  g += `<path d="M-78 ${sh + 8} Q-92 ${sh + 140} -80 ${tY + 18} H80 Q92 ${sh + 140} 78 ${sh + 8} Q0 ${sh - 26} -78 ${sh + 8}Z" fill="${HO}" ${OL}/>`;
  g += `<path d="M20 ${sh + 10} Q60 ${sh + 140} 52 ${tY + 16} H80 Q92 ${sh + 140} 78 ${sh + 8}Z" fill="${HOD}" opacity=".55"/>`; // sombra
  g += `<path d="M-46 ${sh - 2} Q0 ${sh + 56} 46 ${sh - 2}" fill="none" stroke="${HOD}" stroke-width="12"/>`; // capucha
  g += `<path d="M-14 ${sh + 18} v66 M14 ${sh + 18} v58" stroke="#efe6d2" stroke-width="5" stroke-linecap="round"/>`;
  g += `<path d="M-52 ${tY - 110} h104 l-8 58 h-88z" fill="${HOD}" ${OL}/>`; // bolsillo
  g += `<path d="M-80 ${tY + 4} H80" stroke="${HOD}" stroke-width="16"/>`;
  g += `</g>`;
  // ---- cabeza
  const hx = 0, hy = sh - 98;
  g += `<g transform="rotate(${lean + (o.tilt || 0)} 0 ${sh}) translate(0,${o.nod || 0})">`;
  g += `<path d="M-22 ${sh - 28} h44 v32 h-44z" fill="${SKD}" ${OL}/>`;
  g += `<ellipse cx="${hx - 72}" cy="${hy + 6}" rx="13" ry="20" fill="${SKD}" ${OL}/><ellipse cx="${hx + 72}" cy="${hy + 6}" rx="13" ry="20" fill="${SKD}" ${OL}/>`;
  g += `<path d="M${hx - 70} ${hy - 20} Q${hx - 72} ${hy + 70} ${hx} ${hy + 84} Q${hx + 72} ${hy + 70} ${hx + 70} ${hy - 20} Q${hx} ${hy - 96} ${hx - 70} ${hy - 20}Z" fill="${SK}" ${OL}/>`;
  g += `<path d="M${hx + 30} ${hy + 60} Q${hx + 60} ${hy + 40} ${hx + 66} ${hy}" fill="none" stroke="${SKD}" stroke-width="8" opacity=".6"/>`;
  // pelo
  g += `<path d="M${hx - 76} ${hy - 4} Q${hx - 88} ${hy - 96} ${hx - 10} ${hy - 104} Q${hx + 70} ${hy - 110} ${hx + 80} ${hy - 20} Q${hx + 66} ${hy - 58} ${hx + 36} ${hy - 62} Q${hx + 20} ${hy - 40} ${hx - 6} ${hy - 58} Q${hx - 30} ${hy - 40} ${hx - 48} ${hy - 56} Q${hx - 66} ${hy - 40} ${hx - 76} ${hy - 4}Z" fill="${HA}" ${OL}/>`;
  g += `<path d="M${hx - 30} ${hy - 92} Q${hx + 10} ${hy - 100} ${hx + 40} ${hy - 86}" fill="none" stroke="#5a4232" stroke-width="7" stroke-linecap="round"/>`;
  g += eyes(o, hx, hy - 2, 30, 15, 19, SK);
  g += brows(o, hx, hy - 34, 30, HA, 8);
  g += `<path d="M${hx - 2} ${hy + 10} q12 18 -4 22" fill="none" stroke="${SKD}" stroke-width="5" stroke-linecap="round"/>`;
  g += `<ellipse cx="${hx - 44}" cy="${hy + 30}" rx="13" ry="7" fill="#e88f7a" opacity=".45"/><ellipse cx="${hx + 44}" cy="${hy + 30}" rx="13" ry="7" fill="#e88f7a" opacity=".45"/>`;
  g += mouth(hx, hy + 50, o.mouth || 0, o.emo);
  g += `</g>`;
  // brazo delantero (encima del cuerpo) + accesorio
  g += `<g transform="rotate(${lean} 0 ${tY})">${aR.svg}`;
  if (o.phone) { const [px, py] = aR.end; g += `<ellipse cx="${px}" cy="${py - 30}" rx="120" ry="100" fill="#9fd0ff" opacity=".18"/><g transform="translate(${px - 6},${py - 40}) rotate(-12)"><rect x="-20" y="-36" width="40" height="72" rx="8" fill="#11131a" ${OL}/><rect x="-14" y="-29" width="28" height="56" rx="4" fill="#8ec6ff"/></g>`; }
  g += `</g>`;
  return `<g transform="translate(${o.x},${o.y}) scale(${(o.flip ? -1 : 1) * (o.s || 1)},${o.s || 1})" opacity="${o.op ?? 1}">${g}</g>`;
}

// ---------------- MARCO AURELIO ----------------
function drawMarco(o) {
  const SK = '#e5c3a0', SKD = '#cfa683', TO = '#f1e8d6', TOD = '#d8ccb4', PU = '#6a2f50', HA = '#8a7760', HAD = '#6f5f4b';
  let g = '';
  const fl = o.float || 0;
  const sh = -640 + fl;
  // aura
  if (o.aura) g += `<ellipse cx="0" cy="${-400 + fl}" rx="330" ry="560" fill="url(#aura)" opacity="${o.aura}"/>`;
  // sandalias
  for (const k of [-1, 1]) g += `<path d="M${k * 30 - 26} -2 Q${k * 30} -22 ${k * 30 + 28} -2Z" fill="#8a6a45" ${OL}/>`;
  // brazo trasero
  const arm = (k, a1, a2) => limb(k * 84, sh + 30, 130, 118, a1, a2, 40, k > 0 ? TO : TOD, (x, y) => `<circle cx="${x}" cy="${y}" r="21" fill="${SK}" ${OL}/>`);
  const aL = arm(-1, o.armL ?? -6, o.elbowL ?? 0), aR = arm(1, o.armR ?? 6, o.elbowR ?? 0);
  g += aL.svg;
  // toga
  g += `<path d="M-92 ${sh + 10} Q-120 ${sh + 330} -112 -14 Q0 6 112 -14 Q120 ${sh + 330} 92 ${sh + 10} Q0 ${sh - 30} -92 ${sh + 10}Z" fill="${TO}" ${OL}/>`;
  g += `<path d="M30 ${sh} Q90 ${sh + 300} 70 -10 Q100 -12 112 -14 Q120 ${sh + 330} 92 ${sh + 10}Z" fill="${TOD}" opacity=".7"/>`;
  g += `<path d="M-70 ${sh + 4} Q40 ${sh + 280} 96 -14" fill="none" stroke="${PU}" stroke-width="26"/><path d="M-70 ${sh + 4} Q40 ${sh + 280} 96 -14" fill="none" stroke="${INK}" stroke-width="3" opacity=".5"/>`;
  g += `<path d="M-40 ${sh + 200} Q-30 ${sh + 400} -60 -10 M-80 ${sh + 260} Q-70 ${sh + 420} -90 -12 M10 ${sh + 360} Q20 ${sh + 480} 0 -8" fill="none" stroke="${TOD}" stroke-width="7" stroke-linecap="round"/>`;
  // cabeza
  const hx = 0, hy = sh - 100;
  g += `<g transform="rotate(${o.tilt || 0} 0 ${sh}) translate(0,${o.nod || 0})">`;
  g += `<path d="M-24 ${sh - 30} h48 v36 h-48z" fill="${SKD}" ${OL}/>`;
  g += `<ellipse cx="${hx - 70}" cy="${hy + 4}" rx="13" ry="20" fill="${SKD}" ${OL}/><ellipse cx="${hx + 70}" cy="${hy + 4}" rx="13" ry="20" fill="${SKD}" ${OL}/>`;
  g += `<path d="M${hx - 68} ${hy - 20} Q${hx - 70} ${hy + 70} ${hx} ${hy + 84} Q${hx + 70} ${hy + 70} ${hx + 68} ${hy - 20} Q${hx} ${hy - 96} ${hx - 68} ${hy - 20}Z" fill="${SK}" ${OL}/>`;
  // pelo rizado
  const curls = [[-64, -44], [-40, -74], [-8, -86], [26, -82], [56, -64], [74, -34], [-78, -12], [80, -6]];
  g += `<g fill="${HA}" ${OL}>` + curls.map(([x, y]) => `<circle cx="${hx + x}" cy="${hy + y}" r="${24}"/>`).join('') + `</g>`;
  g += curls.map(([x, y]) => `<path d="M${hx + x - 8} ${hy + y - 4} q8 -8 14 2" fill="none" stroke="${HAD}" stroke-width="4" stroke-linecap="round"/>`).join('');
  // laurel
  if (o.laurel !== false) g += [[-60, -64, -40], [-34, -86, -18], [-4, -94, 0], [28, -90, 16], [56, -72, 38], [-80, -40, -62], [82, -36, 62]].map(([x, y, r]) => `<ellipse cx="${hx + x}" cy="${hy + y}" rx="21" ry="8.5" fill="#8aa35a" transform="rotate(${r} ${hx + x} ${hy + y})" ${OL}/>`).join('');
  // barba
  g += `<path d="M${hx - 70} ${hy + 6} Q${hx - 78} ${hy + 112} ${hx} ${hy + 124} Q${hx + 78} ${hy + 112} ${hx + 70} ${hy + 6} Q${hx + 50} ${hy + 46} ${hx + 24} ${hy + 40} Q${hx} ${hy + 30} ${hx - 24} ${hy + 40} Q${hx - 50} ${hy + 46} ${hx - 70} ${hy + 6}Z" fill="${HA}" ${OL}/>`;
  g += [[-40, 70], [-14, 92], [14, 92], [40, 70], [-56, 40], [56, 40]].map(([x, y]) => `<path d="M${hx + x - 8} ${hy + y} q8 8 14 -2" fill="none" stroke="${HAD}" stroke-width="4" stroke-linecap="round"/>`).join('');
  g += eyes(o, hx, hy - 6, 28, 14, 16, SK);
  g += `<path d="M${hx - 42} ${hy + 14} q14 6 26 0 M${hx + 16} ${hy + 14} q14 6 26 0" fill="none" stroke="${SKD}" stroke-width="3.5" stroke-linecap="round"/>`;
  g += brows(o, hx, hy - 34, 28, '#6a5a48', 10);
  g += `<path d="M${hx - 2} ${hy + 6} q14 20 -4 26" fill="none" stroke="${SKD}" stroke-width="5" stroke-linecap="round"/>`;
  g += `<path d="M${hx - 30} ${hy + 46} Q${hx} ${hy + 36} ${hx + 30} ${hy + 46}" fill="none" stroke="${HAD}" stroke-width="12" stroke-linecap="round"/>`; // bigote
  g += mouth(hx, hy + 58, o.mouth || 0, o.emo);
  g += `</g>`;
  g += aR.svg;
  if (o.tablet) { const [px, py] = aR.end; g += `<g transform="translate(${px - 40},${py - 20}) rotate(-10)"><rect x="-70" y="-50" width="140" height="100" rx="6" fill="#8a6a45" ${OL}/><rect x="-58" y="-38" width="116" height="76" fill="#3d2f22"/><path d="M-48 -20 h96 M-48 0 h80 M-48 20 h60" stroke="#e3c27a" stroke-width="4" stroke-dasharray="300" stroke-dashoffset="${300 * (1 - (o.write || 0))}"/></g>`; }
  return `<g transform="translate(${o.x},${o.y}) scale(${(o.flip ? -1 : 1) * (o.s || 1)},${o.s || 1})" opacity="${o.op ?? 1}">${g}</g>`;
}
if (typeof module !== 'undefined') module.exports = { drawAlex, drawMarco };
