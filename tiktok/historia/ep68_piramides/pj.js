/* Personajes genéricos con cara (vb 0 0 300 340). Cara = CARAC + conFace (engine/escenario.js).
   PJ(c, x, y, w, { piel, ropa, pelo, barba, tocado: 'nemes'|'gorro'|'chistera'|'birrete'|'laurel'|'banda', collar, cinta }) */
const pjInner = (o = {}) => {
  const piel = o.piel || '#e8b48a', ropa = o.ropa || '#f3efe6';
  let s = FIGP('M46,340 C52,262 94,222 150,222 C206,222 248,262 254,340 Z', ropa, 6, .25);
  if (o.toga) s += `<path d="M92,236 L214,340" stroke="${INK}" stroke-width="5" opacity=".45"/><path d="M60,300 Q150,280 240,300" stroke="${INK}" stroke-width="4" opacity=".3" fill="none"/>`;
  if (o.collar) s += `<path d="M96,236 Q150,292 204,236" stroke="${o.collar}" stroke-width="24" fill="none"/><path d="M96,236 Q150,292 204,236" stroke="${INK}" stroke-width="4" fill="none"/><path d="M84,232 Q150,316 216,232" stroke="${INK}" stroke-width="4" fill="none"/>`;
  if (o.nemes) s += `<path d="M84,140 L64,262 L112,250 L116,150 Z M216,140 L236,262 L188,250 L184,150 Z" fill="${GOLD}" stroke="${INK}" stroke-width="5"/><path d="M80,170 L106,166 M76,200 L110,194 M72,230 L112,222 M220,170 L194,166 M224,200 L190,194 M228,230 L188,222" stroke="#2b4a8c" stroke-width="9"/>`;
  s += `<rect x="130" y="192" width="40" height="40" fill="${piel}" stroke="${INK}" stroke-width="5"/><circle cx="88" cy="156" r="14" fill="${piel}" stroke="${INK}" stroke-width="5"/><circle cx="212" cy="156" r="14" fill="${piel}" stroke="${INK}" stroke-width="5"/>`;
  s += `<circle cx="150" cy="150" r="64" fill="${piel}" stroke="${INK}" stroke-width="6"/><circle cx="114" cy="172" r="10" fill="#e07a6a" opacity=".45"/><circle cx="186" cy="172" r="10" fill="#e07a6a" opacity=".45"/>`;
  if (o.pelo) s += `<path d="M86,146 C80,66 220,66 214,146 C206,116 186,104 150,104 C114,104 94,116 86,146 Z" fill="${o.pelo}" stroke="${INK}" stroke-width="5"/>`;
  if (o.melena) s += `<path d="M86,130 C70,180 80,220 100,230 L104,150 Z M214,130 C230,180 220,220 200,230 L196,150 Z" fill="${o.melena}" stroke="${INK}" stroke-width="5"/>`;
  if (o.barba) s += `<path d="M92,168 C96,256 204,256 208,168 C196,206 104,206 92,168 Z" fill="${o.barba}" stroke="${INK}" stroke-width="5"/>`;
  const t = o.tocado;
  if (t === 'nemes') s += `<path d="M84,150 C80,62 220,62 216,150 L204,112 Q150,86 96,112 Z" fill="${GOLD}" stroke="${INK}" stroke-width="5"/><path d="M110,92 L114,108 M150,80 V100 M190,92 L186,108" stroke="#2b4a8c" stroke-width="9"/><path d="M150,70 q-10,-20 0,-34 q10,14 0,34" fill="${GOLD}" stroke="${INK}" stroke-width="4"/>`;
  if (t === 'gorro') s += `<path d="M84,118 C84,58 216,58 216,118 Z" fill="${o.gcol || '#b3262a'}" stroke="${INK}" stroke-width="5"/><rect x="78" y="110" width="144" height="18" rx="8" fill="${o.gcol || '#b3262a'}" stroke="${INK}" stroke-width="5"/>`;
  if (t === 'chistera') s += `<rect x="102" y="10" width="96" height="94" rx="6" fill="#2b2118" stroke="${INK}" stroke-width="5"/><rect x="102" y="76" width="96" height="16" fill="#8a2a2a"/><rect x="78" y="98" width="144" height="16" rx="8" fill="#2b2118" stroke="${INK}" stroke-width="5"/>`;
  if (t === 'birrete') s += `<path d="M92,112 L208,112 L200,70 L100,70 Z" fill="#2b2118" stroke="${INK}" stroke-width="5"/><path d="M70,74 L150,46 L230,74 L150,98 Z" fill="#2b2118" stroke="${INK}" stroke-width="5"/><path d="M200,72 V120" stroke="${GOLD}" stroke-width="5"/><circle cx="200" cy="124" r="7" fill="${GOLD}"/>`;
  if (t === 'laurel') s += [...Array(5)].map((_, i) => `<ellipse cx="${100 + i * 25}" cy="${96 - Math.sin(i / 4 * Math.PI) * 14}" rx="16" ry="8" transform="rotate(${-30 + i * 15} ${100 + i * 25} ${96 - Math.sin(i / 4 * Math.PI) * 14})" fill="#6aa84f" stroke="${INK}" stroke-width="3"/>`).join('');
  if (t === 'banda') s += `<rect x="86" y="104" width="128" height="18" rx="6" fill="${o.gcol || '#c8102e'}" stroke="${INK}" stroke-width="4"/>`;
  return s + CARAC;
};
const PJ = (c, x, y, w, o = {}) => figura(c, x, y, w, w * 340 / 300, pjInner(o), '0 0 300 340', Object.assign({ z: 9, origin: '50% 100%' }, { z: o.z, origin: o.origin }));
const EGIPCIO = { piel: '#b0703f', ropa: '#f3efe6', pelo: '#1d1410', collar: '#2e8a8a' };
