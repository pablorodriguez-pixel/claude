/* Ep. 37 · Violet Jessop v4 (guion v4 del director independiente) — tiempos clave, TODO clavado por texto con find()/w() */
const ws = i => W[i].s, wE = i => W[i].e;
const EP_TAG = 'Ep. 37 · Violet Jessop';
const K = {};
{
  // L0 gancho
  K.titanic0 = ws(0); const i0 = find('para ti fue una tragedia'); K.para0 = ws(i0); K.ti0 = ws(i0 + 1); K.tragedia = ws(i0 + 4);
  const i0b = find('para esta mujer', i0); K.para2 = ws(i0b); K.mujer = ws(i0b + 2); K.solo0 = ws(i0b + 3); K.segundo = ws(i0b + 5); K.susto = ws(i0b + 6); K.L0e = wE(i0b + 6);
  // L1 contexto
  const i1 = find('se llamaba violet', i0b); K.se1 = ws(i1); K.violet = ws(i1 + 2); K.jessop = ws(i1 + 3);
  const ic = find('era camarera de barco', i1); K.era = ws(ic); K.camarera = ws(ic + 1);
  const iv = find('y trabajo en el titanic', ic); K.trabajo = ws(iv + 1); K.titanic1 = ws(iv + 4);
  const ig = find('y en sus dos barcos gemelos', iv); K.dos1 = ws(ig + 3); K.gemelos = ws(ig + 5);
  const ia = find('y en los tres hubo un accidente', ig); K.y1b = ws(ia); K.tres1 = ws(ia + 3); K.hubo = ws(ia + 4); K.accidente = ws(ia + 6);
  const ib1 = find('con ella a bordo', ia); K.con1 = ws(ib1); K.ella1 = ws(ib1 + 1); K.bordo1 = ws(ib1 + 3); K.L1e = wE(ib1 + 3);
  // L2 marca
  const ib = find('soy tu vecino', ib1); K.soy = ws(ib); K.vecino = ws(ib + 2); K.isoy = ib;
  const ie = find('y esto no venia en el libro', ib); K.iye = ie; K.yesto2 = ws(ie); K.esto2 = ws(ie + 1);
  // L3 pregunta + bucle numerado
  const i3 = find('y como se sale viva de los tres', ie); K.y3 = ws(i3); K.como = ws(i3 + 1); K.viva3 = ws(i3 + 4); K.tres3 = ws(i3 + 7);
  const i3b = find('te lo cuento barco a barco', i3); K.te3 = ws(i3b); K.cuento = ws(i3b + 2); K.barco3 = ws(i3b + 3); K.barco3b = ws(i3b + 5);
  // L4 · 1 Olympic
  const i4 = find('uno el olympic', i3b); K.uno = ws(i4); K.olympic = ws(i4 + 2);
  const iy = find('en mil novecientos once', i4); K.mil = ws(iy + 1);
  const ich = find('choco contra un buque de guerra', iy); K.choco1 = ws(ich); K.buque = ws(ich + 3);
  const inh = find('pero no se hundio', ich); K.pero4 = ws(inh); K.nohundio = ws(inh + 1);
  const ib4 = find('y ella bajo sin un rasguno', inh); K.ella4 = ws(ib4 + 1); K.bajo = ws(ib4 + 2); K.sin = ws(ib4 + 3); K.rasguno = ws(ib4 + 5); K.L4e = wE(ib4 + 5);
  // L5 · 2 Titanic
  const i5 = find('dos el titanic', ib4); K.dos = ws(i5); K.titanic5 = ws(i5 + 2);
  const ias = find('al ano siguiente', i5); K.ano = ws(ias + 1);
  const imh = find('mientras se hundia', ias); K.mientras5 = ws(imh); K.hundia5 = ws(imh + 2);
  const isv = find('la subieron a un bote salvavidas', imh); K.subieron = ws(isv); K.bote5 = ws(isv + 4);
  const isc = find('segun conto ella', isv); K.y5 = ws(isc - 1); K.segun = ws(isc);
  const ibb = find('le pusieron un bebe en los brazos', isc); K.pusieron = ws(ibb + 1); K.bebe = ws(ibb + 3); K.brazos = ws(ibb + 6); K.L5e = wE(ibb + 6);
  // L6 · 3 Britannic
  const i6 = find('y tres el britannic', ibb); K.y6 = ws(i6); K.tres6 = ws(i6 + 1); K.britannic = ws(i6 + 3);
  const ipg = find('en plena guerra', i6); K.plena = ws(ipg + 1);
  const ih = find('convertido en barco hospital', ipg); K.convertido = ws(ih); K.hospital = ws(ih + 3);
  const icr = find('y ella a bordo con la cruz roja', ih); K.y6b = ws(icr); K.bordo6 = ws(icr + 3); K.cruz = ws(icr + 6);
  const im = find('choco con una mina', icr); K.choco6 = ws(im); K.mina = ws(im + 3); K.minaE = wE(im + 3);
  const imh6 = find('y mientras se hundia', im); K.y6c = ws(imh6); K.hundia6 = ws(imh6 + 3);
  const ivc = find('volvio a su camarote', imh6); K.volvio = ws(ivc); K.camarote = ws(ivc + 3);
  const ico = find('a por una sola cosa', ivc); K.apor = ws(ico); K.sola = ws(ico + 3); K.cosa = ws(ico + 4);
  const iad = find('ahora te digo cual', ico); K.ahora = ws(iad); K.cual = ws(iad + 3); K.L6e = wE(iad + 3);
  // L7 clímax (sigue el paso 3)
  const i7 = find('y entonces vino lo peor', iad); K.y7 = ws(i7); K.entonces = ws(i7 + 1); K.peor = ws(i7 + 4);
  const ibt = find('su bote acabo arrastrado', i7); K.su7 = ws(ibt); K.bote7 = ws(ibt + 1); K.arrastrado = ws(ibt + 3);
  const ihl = find('hacia las helices', ibt); K.hacia = ws(ihl); K.helices = ws(ihl + 2);
  K.seguian = ws(find('seguian girando', ihl)); K.girando = ws(find('girando', ihl));
  const isa = find('asi que salto al agua', ihl); K.asi = ws(isa); K.salto = ws(isa + 2); K.agua = ws(isa + 4);
  const igo = find('se golpeo la cabeza', isa); K.se7 = ws(igo); K.golpeo = ws(igo + 1); K.cabeza = ws(igo + 3);
  const iso = find('y aun asi salio viva', igo); K.y7b = ws(iso); K.aun = ws(iso + 1); K.salio = ws(iso + 3); K.viva7 = ws(iso + 4); K.L7e = wE(iso + 4);
  // L8 Ojo (≤ 6 s)
  const i8 = find('ojo lo del bebe', iso); K.ojo = ws(i8); K.bebe8 = ws(i8 + 3);
  const imm = find('en sus memorias', i8); K.memorias = ws(imm + 2);
  const inq = find('y nunca se supo de quien era', imm); K.y8 = ws(inq); K.nunca = ws(inq + 1); K.quien = ws(inq + 5); K.L8e = wE(inq + 6);
  // L9 O sea: el remate (el cepillo)
  const i9 = find('o sea se le hundieron dos barcos encima', inq); K.osea = ws(i9); K.hundieron = ws(i9 + 4); K.dos9 = ws(i9 + 5); K.encima = ws(i9 + 7);
  const iun = find('y lo unico que volvio a buscar al camarote fue', i9); K.y9 = ws(iun); K.unico = ws(iun + 2); K.buscar9 = ws(iun + 6); K.camarote9 = ws(iun + 8); K.fue = ws(iun + 9);
  const icp = find('su cepillo de dientes', iun); K.su9 = ws(icp); K.cepillo = ws(icp + 1); K.dientes = ws(icp + 3);
  const ipq = find('porque despues del titanic', icp); K.porque = ws(ipq); K.despues = ws(ipq + 1); K.titanic9 = ws(ipq + 3);
  const iem = find('era lo que mas habia echado de menos', ipq); K.era9 = ws(iem); K.echado = ws(iem + 5); K.menos = ws(iem + 7); K.L9e = wE(iem + 7);
  // L10 pregunta + Os leo
  const i10 = find('y tu si se hunde tu barco', iem); K.y10 = ws(i10); K.tu10 = ws(i10 + 1); K.si10 = ws(i10 + 2); K.hunde10 = ws(i10 + 4); K.barco10 = ws(i10 + 6);
  const iq = find('que vuelves a buscar al camarote', i10); K.que10 = ws(iq); K.vuelves = ws(iq + 1); K.buscar10 = ws(iq + 3); K.camarote10 = ws(iq + 5);
  const iol = find('os leo', iq); K.os = ws(iol); K.leo = ws(iol + 1);
  // L11 cierre
  const i11 = find('y esto no venia en el libro', iol); K.i11 = i11; K.y11 = ws(i11); K.esto11 = ws(i11 + 1); K.no11 = ws(i11 + 2); K.libro = ws(i11 + 6); K.END = wE(i11 + 6);
}
/* cortes de escena: un plano nuevo cada 1,5–2,5 s; ningún dato en pantalla menos de 1,5 s */
const S = {
  A: [-1, K.para2 - 0.04],                    // portada: Titanic + Violet en un bote + ¿SALIÓ VIVA DE LOS 3 BARCOS?
  A2: [K.para2 - 0.04, K.se1 - 0.1],           // «Para esta mujer… solo el segundo susto»
  B1: [K.se1 - 0.1, K.era - 0.1],              // nombre a máquina
  B2: [K.era - 0.1, K.era + 1.4],              // camarera de barco
  H1: [K.era + 1.4, K.y1b - 0.06],             // el Titanic y sus dos gemelos
  H2: [K.y1b - 0.06, K.soy - 0.1],             // en los tres hubo un accidente, con ella a bordo
  BAL: [K.soy - 0.1, K.y3 - 0.1],              // marca (balcón)
  Q: [K.y3 - 0.1, K.te3 - 0.1],                // ¿Y cómo se sale viva de los tres?
  M: [K.te3 - 0.1, K.uno - 0.1],               // te lo cuento barco a barco
  O1: [K.uno - 0.1, K.mil - 0.12],             // 1 · Olympic
  O2: [K.mil - 0.12, K.pero4 - 0.06],          // 1911: chocó contra un buque de guerra
  O3: [K.pero4 - 0.06, K.dos - 0.08],          // pero no se hundió… sin un rasguño
  T1: [K.dos - 0.08, K.mientras5 - 0.08],      // 2 · Titanic, al año siguiente
  T2: [K.mientras5 - 0.08, K.hundia5 + 0.45],  // mientras se hundía
  T3: [K.hundia5 + 0.45, K.y5 - 0.06],         // la subieron a un bote salvavidas
  T4: [K.y5 - 0.06, K.y6 - 0.08],              // según contó ella… un bebé en los brazos
  B1x: [K.y6 - 0.08, K.convertido - 0.05],     // 3 · Britannic en plena guerra
  B2x: [K.convertido - 0.05, K.y6b - 0.06],    // barco hospital
  B4x: [K.y6b - 0.06, K.choco6 - 0.06],        // ella a bordo con la Cruz Roja
  B3x: [K.choco6 - 0.06, K.volvio - 0.06],     // mina… y mientras se hundía
  C1: [K.volvio - 0.06, K.ahora - 0.08],       // volvió a su camarote a por una sola cosa…
  C2: [K.ahora - 0.08, K.y7 - 0.08],           // …ahora te digo cuál (camarote con «?»)
  P0: [K.y7 - 0.08, K.peor + 0.55],             // y entonces vino lo peor
  P1: [K.peor + 0.55, K.hacia - 0.03],          // su bote, arrastrado
  P2: [K.hacia - 0.03, K.asi - 0.08],          // hacia las hélices que seguían girando
  P3: [K.asi - 0.08, K.cabeza - 0.15],         // ¡SALTÓ!
  P4: [K.cabeza - 0.15, K.y7b - 0.04],         // golpe en la cabeza
  P5: [K.y7b - 0.04, K.ojo - 0.06],            // y aun así salió viva
  J1: [K.ojo - 0.06, K.memorias - 0.06],       // ¡OJO! lo del bebé…
  J2: [K.memorias - 0.06, K.osea - 0.08],      // …en sus memorias; nunca se supo de quién era
  R1: [K.osea - 0.08, K.y9 - 0.06],            // se le hundieron dos barcos encima
  R2: [K.y9 - 0.06, K.su9 - 0.08],             // lo único que volvió a buscar al camarote fue…
  R3: [K.su9 - 0.08, K.porque + 0.6],          // ¡EL CEPILLO! (plano grande ≥ 2 s)
  R4: [K.porque + 0.6, K.y10 - 0.08],          // después del Titanic, lo que más echó de menos
  CTA: [K.y10 - 0.08, K.y11 - 0.1],            // Y tú, si se hunde tu barco… Os leo
  BAL2: [K.y11 - 0.1, K.no11 - 0.04],          // Y esto…
  BK: [K.no11 - 0.04, 999],                    // …no venía en el libro
};
const DUR = K.END + 0.6, LOOP = DUR - 0.4;
const SCX = [];
const STEPS = [
  { n: 1, name: 'Olympic', year: '1911', t0: S.O1[0], t1: S.T1[0], tN: K.uno, tName: K.olympic, tYear: K.mil, tDone: K.rasguno + 0.45 },
  { n: 2, name: 'Titanic', year: '1912', t0: S.T1[0], t1: S.B1x[0], tN: K.dos, tName: K.titanic5, tYear: K.ano, tDone: K.brazos + 0.4 },
  { n: 3, name: 'Britannic', year: '1916', t0: S.B1x[0], t1: S.J1[0], tN: K.tres6, tName: K.britannic, tYear: K.plena, tDone: K.salio },
];
