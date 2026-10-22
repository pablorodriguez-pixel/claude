// «Mañana»: el personaje recurrente del formato 1 (tu yo de mañana).
// Devuelve un <svg> (viewBox 0 0 400 500) listo para insertar.
// opts: mood 'sleepy'|'angry'|'sad', pose 'phone'|'reach'|'chal', look 'down'|'right'|'up'
const INK = '#141414', BODY = '#A493FF', SHADE = '#8C77F2', FEET = '#7D67E6',
  CAP = '#FF6A4D', CUFF = '#FFF1DC', CHEEK = '#FF8FB3';

function manana(o = {}) {
  const mood = o.mood || 'sleepy', pose = o.pose || 'phone', look = o.look || 'down';
  const id = 'm' + Math.random().toString(36).slice(2, 7);
  const bean = 'M200 60 C 300 60 352 150 352 265 C 352 380 295 440 200 440 C 105 440 48 380 48 265 C 48 150 100 60 200 60 Z';
  const arm = (d, w = 30) => `<path d="${d}" stroke="${INK}" stroke-width="${w + 16}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${BODY}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
  // ojos
  const pup = { down: [[158, 232], [248, 232]], right: [[168, 220], [258, 220]], up: [[160, 204], [250, 204]] }[look];
  let brows = '', mouth = '';
  const lidFill = (pts) => o.blink ? `<polygon points="100,150 300,150 300,252 100,252" fill="${BODY}"/><path d="M124 222 Q155 236 186 222 M214 222 Q245 236 276 222" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/>` : `<polygon points="${pts}" fill="${BODY}"/>`;
  if (mood === 'sleepy') {
    brows = `<path d="M124 213 Q155 224 186 213" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M214 213 Q245 224 276 213" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    mouth = `<ellipse cx="200" cy="298" rx="15" ry="11" fill="${INK}"/><ellipse cx="200" cy="302" rx="8" ry="4" fill="#FF7B8F"/>`;
  } else if (mood === 'angry') {
    brows = `<path d="M122 197 L186 222" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M214 222 L278 197" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
      <path d="M118 170 L188 196" stroke="${INK}" stroke-width="15" stroke-linecap="round"/><path d="M212 196 L282 170" stroke="${INK}" stroke-width="15" stroke-linecap="round"/>`;
    mouth = `<path d="M176 306 Q200 284 224 306" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  } else { // sad
    brows = `<path d="M122 214 L186 199" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M214 199 L278 214" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
      <path d="M126 176 L184 160" stroke="${INK}" stroke-width="13" stroke-linecap="round"/><path d="M216 160 L274 176" stroke="${INK}" stroke-width="13" stroke-linecap="round"/>`;
    mouth = `<path d="M176 304 Q188 292 200 300 Q212 308 224 296" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  }
  const eye = (cx, i) => `<g clip-path="url(#${id}e${i})"><ellipse cx="${cx}" cy="215" rx="31" ry="35" fill="#fff"/><circle cx="${pup[i][0]}" cy="${pup[i][1]}" r="12" fill="${INK}"/><circle cx="${pup[i][0] + 4}" cy="${pup[i][1] - 4}" r="4" fill="#fff"/></g>`;
  const eyes = `<defs><clipPath id="${id}e0"><ellipse cx="155" cy="215" rx="31" ry="35"/></clipPath><clipPath id="${id}e1"><ellipse cx="245" cy="215" rx="31" ry="35"/></clipPath>
    <clipPath id="${id}b"><path d="${bean}"/></clipPath>
    <pattern id="${id}st" width="44" height="44" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)"><rect width="44" height="44" fill="${CAP}"/><rect width="44" height="14" y="0" fill="${CUFF}"/><rect width="44" height="5" y="22" fill="#B83A22"/></pattern></defs>
    ${eye(155, 0)}${eye(245, 1)}
    <g clip-path="url(#${id}e0)">${lidFill('110,150 200,150 200,' + (mood === 'sleepy' ? '214 110,214' : mood === 'angry' ? '226 110,196' : '198 110,214'))}</g>
    <g clip-path="url(#${id}e1)">${lidFill('200,150 290,150 290,' + (mood === 'sleepy' ? '214 200,214' : mood === 'angry' ? '196 200,226' : '214 200,198'))}</g>
    <ellipse cx="155" cy="215" rx="31" ry="35" fill="none" stroke="${INK}" stroke-width="7"/><ellipse cx="245" cy="215" rx="31" ry="35" fill="none" stroke="${INK}" stroke-width="7"/>
    ${brows}`;

  // brazos / props segun pose
  let back = '', front = '';
  if (pose === 'phone') {
    front = arm('M78 300 Q110 352 168 352') + arm('M322 300 Q290 352 232 352') +
      `<g transform="rotate(-6 200 350)"><rect x="158" y="292" width="84" height="124" rx="16" fill="#1C1C24" stroke="${INK}" stroke-width="7"/>
       <rect x="167" y="302" width="66" height="104" rx="9" fill="#B9F0FF"/><rect x="175" y="314" width="50" height="10" rx="5" fill="#fff" opacity=".9"/><rect x="175" y="332" width="34" height="10" rx="5" fill="#fff" opacity=".7"/><circle cx="217" cy="384" r="10" fill="${CAP}"/></g>
       <circle cx="168" cy="352" r="20" fill="${BODY}" stroke="${INK}" stroke-width="7"/><circle cx="232" cy="352" r="20" fill="${BODY}" stroke="${INK}" stroke-width="7"/>`;
  } else if (pose === 'reach') {
    back = arm('M86 310 Q70 380 96 410');
    front = arm('M318 292 Q420 250 520 236', 30) + `<circle cx="524" cy="236" r="21" fill="${BODY}" stroke="${INK}" stroke-width="7"/>`;
  } else if (pose === 'chal') {
    front = `<path d="M44 318 C 120 352 280 352 356 318 C 372 370 360 410 334 446 L 66 446 C 40 410 28 370 44 318 Z" fill="url(#${id}st)" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M44 318 C 120 352 280 352 356 318" fill="none" stroke="${INK}" stroke-width="8"/>
      <path d="M262 340 C 250 380 236 400 214 420 L 248 432 C 268 410 284 380 290 344 Z" fill="${CAP}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      ${Array.from({ length: 13 }, (_, i) => `<path d="M${84 + i * 19.5} 446 l -3 26" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`).join('')}`;
  }
  const cap = `<path d="M90 146 C 96 66 166 14 244 22 C 324 30 376 96 378 182 C 356 132 328 108 304 124 L 310 146 Z" fill="${CAP}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
    <path d="M150 52 C 200 40 250 44 290 62" stroke="#E04E33" stroke-width="10" fill="none" stroke-linecap="round" opacity=".7"/>
    <path d="M80 156 C 120 112 280 112 320 156 L 316 186 C 276 146 124 146 84 186 Z" fill="${CUFF}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
    <circle cx="378" cy="190" r="27" fill="${CUFF}" stroke="${INK}" stroke-width="8"/>`;
  return `<svg viewBox="0 0 400 500" width="${o.w || 400}" height="${(o.w || 400) * 1.25}" style="position:absolute;left:${o.x || 0}px;top:${o.y || 0}px;overflow:visible;${o.flip ? 'transform:scaleX(-1)' : ''}">
    ${back}
    <ellipse cx="148" cy="442" rx="48" ry="21" fill="${FEET}" stroke="${INK}" stroke-width="8"/><ellipse cx="252" cy="442" rx="48" ry="21" fill="${FEET}" stroke="${INK}" stroke-width="8"/>
    <path d="${bean}" fill="${BODY}"/>
    <g clip-path="url(#${id}b)"><path d="M300 80 C 380 200 360 380 250 450 L 420 460 L 420 60 Z" fill="${SHADE}" opacity=".55"/><ellipse cx="120" cy="150" rx="40" ry="60" fill="#fff" opacity=".16" transform="rotate(25 120 150)"/></g>
    <path d="${bean}" fill="none" stroke="${INK}" stroke-width="9"/>
    ${eyes}
    <ellipse cx="112" cy="272" rx="24" ry="13" fill="${CHEEK}" opacity=".6"/><ellipse cx="288" cy="272" rx="24" ry="13" fill="${CHEEK}" opacity=".6"/>
    ${mouth}
    ${cap}
    ${front}
  </svg>`;
}
