/* Ep. 34 · Garbo v3 (plantilla Napoleón) — tiempos clave, TODO clavado por texto con find() */
const ws = i => W[i].s, wE = i => W[i].e;
const K = {};
{
  K.hitler0 = ws(0); K.medalla0 = ws(4); K.espanol0 = ws(6); K.engano0 = ws(9);
  const i1 = find('se llamaba juan pujol'); K.se1 = ws(i1); K.juan = ws(i1 + 2); K.pujol1 = ws(i1 + 3); K.barcelona = ws(i1 + 6); K.y1 = ws(i1 + 7); K.nunca1 = ws(i1 + 8); K.espia1 = ws(i1 + 11);
  const is = find('soy tu vecino', i1); K.isoy = is; K.soy = ws(is); K.vecino = ws(is + 2); K.iye = is + 3; K.esto2 = ws(is + 4); K.libro2 = ws(is + 9);
  const i3 = find('como engana a hitler', is); K.como = ws(i3); K.hitler3 = ws(i3 + 3); K.senor = ws(i3 + 5); K.noera = ws(i3 + 7); K.espia3 = ws(i3 + 9); K.en3 = ws(i3 + 10); K.tres3 = ws(i3 + 11); K.pasos = ws(i3 + 12);
  const i4 = find('uno quiso espiar', i3); K.uno = ws(i4); K.quiso = ws(i4 + 1); K.ingleses4 = ws(i4 + 5); K.pero4 = ws(i4 + 6); K.no4 = ws(i4 + 7); K.quisieron = ws(i4 + 9);
  K.asi = ws(i4 + 10); K.ofrecio = ws(i4 + 13); K.alemanes4 = ws(i4 + 17); K.para4 = ws(i4 + 18); K.enganarlos = ws(i4 + 19); K.espia4 = ws(i4 + 14); K.ingleses4b = ws(i4 + 23); K.fin4 = ws(i4 + 25); K.dentro = ws(i4 + 28);
  const i5 = find('dos los alemanes le mandaron', i4); K.dos = ws(i5); K.alemanes5 = ws(i5 + 2); K.mandaron = ws(i5 + 4); K.londres = ws(i5 + 6); K.pero5 = ws(i5 + 7); K.quedo = ws(i5 + 10);
  K.lisboa = ws(i5 + 12); K.inventandose = ws(i5 + 13); K.informes = ws(i5 + 15); K.guia = ws(i5 + 18); K.turismo = ws(i5 + 20); K.mapa = ws(i5 + 23);
  const i6 = find('y tres como', i5); K.y6 = ws(i6); K.tres6 = ws(i6 + 1); K.espia6 = ws(i6 + 4); K.solo = ws(i6 + 5); K.tanto = ws(i6 + 9); K.se6 = ws(i6 + 10); K.invento = ws(i6 + 11); K.otros = ws(i6 + 13); K.espias6 = ws(i6 + 14); K.trabajaban = ws(i6 + 16);
  K.ninguno = ws(i6 + 19); K.existia = ws(i6 + 20); K.y6b = ws(i6 + 21); K.alemanes6 = ws(i6 + 23); K.pagaban = ws(i6 + 25); K.sueldo = ws(i6 + 27); K.todos = ws(i6 + 29);
  const i7 = find('y entonces los ingleses', i6); K.al = ws(i7); K.ingleses7 = ws(i7 + 3); K.vieron = ws(i7 + 4); K.lo7 = ws(i7 + 5); K.bueno = ws(i7 + 6); K.ficharon = ws(i7 + 11);
  K.juntos = ws(i7 + 12); K.inflaron = ws(i7 + 13); K.red7 = ws(i7 + 15); K.v27 = ws(i7 + 17); K.espias7 = ws(i7 + 18); K.inventados7 = ws(i7 + 19);
  K.y7 = ws(i7 + 20); K.llego7 = ws(i7 + 21); K.gran = ws(i7 + 23); K.dia = ws(i7 + 24); K.desembarco = ws(i7 + 26); K.normandia = ws(i7 + 28);
  const i8 = find('pujol aviso a hitler', i7); K.pujol8 = ws(i8); K.aviso = ws(i8 + 1); K.hitler8 = ws(i8 + 3); K.normandia8 = ws(i8 + 6); K.trampa = ws(i8 + 10); K.trampaE = wE(i8 + 10); K.y8 = ws(i8 + 11); K.ataque = ws(i8 + 15); K.verdad = ws(i8 + 17); K.calais = ws(i8 + 20);
  K.y8b = ws(i8 + 21); K.hitler8b = ws(i8 + 22); K.creyo = ws(i8 + 25); K.dejo = ws(i8 + 26); K.miles = ws(i8 + 28); K.soldados = ws(i8 + 30); K.esperando = ws(i8 + 31); K.ataque2 = ws(i8 + 33); K.nunca8 = ws(i8 + 35); K.llego8 = ws(i8 + 36);
  const i10 = find('o sea los nazis', i8); K.o10 = ws(i10); K.sea = ws(i10 + 1); K.nazis = ws(i10 + 3); K.cruz = ws(i10 + 7); K.hierro = ws(i10 + 9); K.y10 = ws(i10 + 10); K.ingleses10 = ws(i10 + 12); K.otra = ws(i10 + 13); K.medalla = ws(i10 + 14); K.por = ws(i10 + 15); K.mismo = ws(i10 + 17); K.engano = ws(i10 + 18); K.dosm = ws(i10 + 19); K.mentira = ws(i10 + 23); K.ni = ws(i10 + 24); K.excusa = ws(i10 + 27); K.lejos = ws(i10 + 31);
  const i9 = find('y ojo que aun hay mas', i10); K.y9 = ws(i9); K.ojo = ws(i9 + 1); K.mas9 = ws(i9 + 5); K.anos = ws(i9 + 6); K.fingio = ws(i9 + 8); K.muerte = ws(i9 + 11); K.africa = ws(i9 + 13); K.y9b = ws(i9 + 14); K.vivir = ws(i9 + 18); K.tranquilo = ws(i9 + 20); K.venezuela = ws(i9 + 22);
  const i11 = find('que es lo mas gordo', i9); K.que11 = ws(i11); K.gordo = ws(i11 + 4); K.inventado = ws(i11 + 8); K.tu = ws(i11 + 9); K.librarte = ws(i11 + 11); K.algo = ws(i11 + 13); K.os = ws(i11 + 14); K.leo = ws(i11 + 15);
  const i12 = find('y esto no venia en el libro', i11); K.y12 = ws(i12); K.esto12 = ws(i12 + 1); K.enL = ws(i12 + 4); K.libro = ws(i12 + 6); K.END = wE(i12 + 6);
}
/* planos: uno nuevo cada 1,5–2,5 s; ningún dato en pantalla menos de 1,5 s */
const S = {
  A: [-1, K.juan + 0.04],
  B: [K.juan + 0.04, K.y1 - 0.06], C: [K.y1 - 0.06, K.soy - 0.12],
  BAL: [K.soy - 0.12, K.como - 0.1],
  Q: [K.como - 0.1, K.en3 - 0.1], T3: [K.en3 - 0.1, K.uno - 0.1],
  // PASO 1
  P1a: [K.uno - 0.1, K.pero4 - 0.1], P1b: [K.pero4 - 0.1, K.asi + 0.75], P1c: [K.asi + 0.75, K.enganarlos + 0.13], P1d: [K.enganarlos + 0.13, K.dos - 0.1],
  // PASO 2
  P2a: [K.dos - 0.1, K.informes + 0.2], P2c: [K.informes + 0.2, K.y6 - 0.1],
  // PASO 3
  P3a: [K.y6 - 0.1, K.se6 - 0.05], P3b: [K.se6 - 0.05, K.al - 0.1],
  // fichaje (2 planos) · la red de 27 · Día D · la trampa
  F1: [K.al - 0.1, K.lo7 - 0.06], F1b: [K.lo7 - 0.06, K.inflaron - 0.06], R27: [K.inflaron - 0.06, K.y7 - 0.06], F2: [K.y7 - 0.06, K.pujol8 - 0.06],
  T1: [K.pujol8 - 0.06, K.y8], T2: [K.y8, K.dejo - 0.06], T3b: [K.dejo - 0.06, K.sea],
  // O sea: las dos medallas (remate) — llega hasta «que aún hay más»
  M: [K.sea, K.ojo - 0.06],
  // Ojo (último giro)
  O0: [K.ojo - 0.06, K.anos - 0.06], O1: [K.anos - 0.06, K.y9b - 0.06], O2: [K.y9b - 0.06, K.que11 - 0.05],
  Q2: [K.que11 - 0.05, K.y12 - 0.1],
  BK: [K.y12 - 0.1, 999],
};
const DUR = K.END + 0.6, LOOP = DUR - 0.4;
/* titulares grandes por paso (aguantan TODO el paso) */
const STEPS = [
  { t0: S.P1a[0], t1: S.P1d[1], badge: '1', title: 'Le dicen *que no*', size: 84 },
  { t0: S.P2a[0], t1: S.P2c[1], badge: '2', title: 'Espía desde *Lisboa*', size: 80 },
  { t0: S.P3a[0], t1: S.P3b[1], badge: '3', title: 'Espías *inventados*', size: 84 },
  { t0: S.F1[0], t1: S.F1b[1], badge: '★', title: 'Le fichan *los ingleses*', size: 74 },
  { t0: S.R27[0], t1: S.R27[1], badge: '★', title: 'Una red *de mentira*', size: 80 },
  { t0: S.F2[0], t1: S.F2[1], badge: '★', title: 'El gran día: *Normandía*', size: 72 },
  { t0: S.T1[0], t1: S.T3b[1], badge: '★', title: 'La gran *trampa*', size: 84 },
  { t0: S.M[0], t1: S.M[1], badge: '★', title: 'El *premio*', size: 92 },
  { t0: S.O1[0], t1: S.O2[1], badge: '!', title: '¡Ojo!', size: 96, red: true },
];
