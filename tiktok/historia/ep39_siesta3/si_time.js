/* Ep. 39 · ¿Siesta es un número? (v3, plantilla Napoleón) — tiempos clave, TODO clavado por texto con find()/w() */
const ws = i => W[i].s, wE = i => W[i].e;
const K = {};
{
  K.siesta0 = ws(0); K.numero0 = ws(find('numero')); const i0 = find('y te lo echas'); K.y0 = ws(i0); K.echas0 = ws(i0 + 3); K.casi0 = ws(i0 + 4); K.todos0 = ws(i0 + 5); K.dias0 = ws(i0 + 7); K.L0e = wE(i0 + 7);
  const i1 = find('viene del latin', i0); K.viene = ws(i1); K.latin1 = ws(i1 + 2); K.sexta1 = ws(i1 + 3); K.la1 = ws(i1 + 4); K.hora1 = ws(i1 + 5); K.sexta1b = ws(i1 + 6); K.romanos1 = ws(i1 + 9); K.L1e = wE(i1 + 9);
  const is = find('soy tu vecino', i1); K.isoy = is; K.soy = ws(is); K.vecino = ws(is + 2); K.y2 = ws(is + 3); K.esto2 = ws(is + 4); K.libro2 = ws(is + 9); K.L2e = wE(is + 9);
  const i3 = find('y por que una hora', is); K.i3 = i3; K.y3 = ws(i3); K.hora3 = ws(i3 + 4); K.llamaba = ws(i3 + 6); K.sexta3 = ws(i3 + 7); K.en3 = ws(i3 + 8); K.tres3 = ws(i3 + 9); K.pasos = ws(i3 + 10);
  const i4 = find('uno los romanos', i3); K.uno = ws(i4); K.romanos4 = ws(i4 + 2); K.no4 = ws(i4 + 3); K.contaban = ws(i4 + 4); K.horas4 = ws(i4 + 6); K.medianoche = ws(i4 + 8);
  K.sino = ws(i4 + 9); K.salia = ws(i4 + 12); K.sol4 = ws(i4 + 14); K.primera = ws(find('primera', i4)); K.segunda = ws(find('segunda', i4)); K.tercera = ws(find('tercera', i4)); K.L4e = wE(find('tercera', i4));
  const i5 = find('dos si el sol sale', i4); K.dos = ws(i5); K.si5 = ws(i5 + 1); K.sol5 = ws(i5 + 3); K.sale5 = ws(i5 + 4); K.seis = ws(i5 + 7); K.manana = ws(i5 + 10);
  K.hora5 = ws(i5 + 12); K.sexta5 = ws(i5 + 13); K.cae = ws(i5 + 14); K.justo = ws(i5 + 15); K.doce5 = ws(i5 + 18); K.mediodia = ws(i5 + 20); K.L5e = wE(i5 + 20);
  const i6 = find('y tres a esa hora', i5); K.y6 = ws(i6); K.tres6 = ws(i6 + 1); K.esa = ws(i6 + 3); K.calor = ws(i6 + 7); K.se6 = ws(i6 + 8); K.paraba = ws(i6 + 9); K.comer = ws(i6 + 11); K.descansar6 = ws(i6 + 14);
  const i6b = find('y descansar en la sexta', i6); K.y6b = ws(i6b); K.descansar6b = ws(i6b + 1); K.sexta6 = ws(i6b + 4); K.acabo = ws(i6b + 5); K.echar = ws(i6b + 7); K.siesta6 = ws(i6b + 9); K.L6e = wE(i6b + 9);
  const i7 = find('ojo no es una teoria', i6b); K.ojo = ws(i7); K.no7 = ws(i7 + 1); K.teoria = ws(i7 + 4); K.bar = ws(i7 + 6); K.lo7 = ws(i7 + 7); K.dice7 = ws(i7 + 8); K.diccionario = ws(i7 + 10); K.real = ws(i7 + 13); K.academia = ws(i7 + 14); K.L7e = wE(i7 + 14);
  const i8 = find('o sea la siesta de verdad', i7); K.osea = ws(i8); K.la8 = ws(i8 + 2); K.siesta8 = ws(i8 + 3); K.verdad = ws(i8 + 5); K.doce8 = ws(i8 + 9);
  const i8b = find('asi que si te la echas', i8); K.asi = ws(i8b); K.echas8 = ws(i8b + 5); K.tres8 = ws(i8b + 8); K.media = ws(i8b + 10); K.llegas = ws(i8b + 11); K.tarde = ws(i8b + 12); K.hasta = ws(i8b + 13); K.siesta8b = ws(i8b + 16);
  const i9 = find('a que hora te la echas tu', i8b); K.i13 = i9; K.aq = ws(i9); K.echas13 = ws(i9 + 5); K.tu13 = ws(i9 + 6); K.os = ws(i9 + 7); K.leo = ws(i9 + 8);
  const iye = find('y esto no venia en el libro', i9 + 1); K.iye = iye; K.yF = ws(iye); K.esto = ws(iye + 1); K.noF = ws(iye + 2); K.enL = ws(iye + 4); K.libro = ws(iye + 6); K.END = wE(iye + 6);
}
/* cortes de escena: un plano nuevo cada 1,5–2,5 s; ningún dato < 1,5 s en pantalla */
const S = {
  A: [-1, K.y0 - 0.05], A2: [K.y0 - 0.05, K.viene - 0.1],
  B1: [K.viene - 0.1, K.la1 - 0.06], B2: [K.la1 - 0.06, K.soy - 0.08],
  BAL: [K.soy - 0.08, K.y3 - 0.12],
  Q: [K.y3 - 0.12, K.en3 - 0.12], N3: [K.en3 - 0.12, K.uno - 0.12],
  // PASO 1
  P1a: [K.uno - 0.12, K.no4 - 0.06], P1b: [K.no4 - 0.06, K.sino - 0.06], P1c: [K.sino - 0.06, K.primera - 0.12], P1d: [K.primera - 0.12, K.dos - 0.08],
  // PASO 2
  P2a: [K.dos - 0.08, K.seis - 0.12], P2b: [K.seis - 0.12, K.doce5 - 0.1], P2c: [K.doce5 - 0.1, K.y6 + 0.06],
  // PASO 3
  P3a: [K.y6 + 0.06, K.se6 - 0.08], P3b: [K.se6 - 0.08, K.y6b - 0.08], P3c: [K.y6b - 0.08, K.acabo - 0.08], P3d: [K.acabo - 0.08, K.ojo - 0.1],
  O1: [K.ojo - 0.1, K.lo7 - 0.08], O2: [K.lo7 - 0.08, K.la8 - 0.08],
  R1: [K.la8 - 0.08, K.tarde - 0.08], R2: [K.tarde - 0.08, K.aq - 0.08],
  T: [K.aq - 0.08, K.yF - 0.08], BK: [K.yF - 0.08, 999],
};
const STEPS = [[S.P1a[0], S.P1d[1]], [S.P2a[0], S.P2c[1]], [S.P3a[0], S.P3d[1]]];
const DUR = K.END + 0.6, LOOP = DUR - 0.4;
