/* Ep. 37 · Violet Jessop (rehecho, guion v3) — tiempos clave, TODO clavado por texto con find()/w() */
const ws = i => W[i].s, wE = i => W[i].e;
const EP_TAG = 'Ep. 37 · Violet Jessop';
const K = {};
{
  // L0 gancho
  K.esta = ws(0); K.mujer = ws(find('mujer')); K.sobrevivio0 = ws(find('sobrevivio al titanic')); K.titanic0 = ws(find('titanic'));
  const i0 = find('y no fue lo mas raro'); K.y0 = ws(i0); K.no0 = ws(i0 + 1); K.raro = ws(i0 + 5); K.vida = ws(i0 + 8); K.L0e = wE(i0 + 8);
  // L1 contexto
  const i1 = find('se llamaba violet'); K.se1 = ws(i1); K.violet = ws(i1 + 2); K.jessop = ws(i1 + 3);
  const ic = find('era camarera de barcos', i1); K.era = ws(ic); K.camarera = ws(ic + 1); K.barcos1 = ws(ic + 3);
  const iv = find('y viajo en los tres', ic); K.viajo = ws(iv + 1); K.tres1 = ws(iv + 4); K.hermanos = ws(iv + 5); K.gemelos = ws(iv + 6); K.del1 = ws(iv + 7); K.titanic1 = ws(iv + 8);
  const ia = find('los tres tuvieron un accidente', iv); K.los1 = ws(ia); K.tres1b = ws(ia + 1); K.tuvieron = ws(ia + 2); K.accidente = ws(ia + 4); K.L1e = wE(ia + 4);
  // L2 marca
  const ib = find('soy tu vecino', ia); K.soy = ws(ib); K.vecino = ws(ib + 2); K.isoy = ib;
  const ie = find('y esto no venia en el libro', ib); K.iye = ie; K.yesto2 = ws(ie); K.esto2 = ws(ie + 1); K.libro2 = ws(ie + 6); K.L2e = wE(ie + 6);
  // L3 bucle numerado
  const i3 = find('te los cuento uno a uno', ie); K.te3 = ws(i3); K.cuento = ws(i3 + 2); K.uno3 = ws(i3 + 3); K.uno3b = ws(i3 + 5);
  // L4 · 1 Olympic
  const i4 = find('uno el olympic', i3); K.uno = ws(i4); K.olympic = ws(i4 + 2);
  const iy = find('en mil novecientos once', i4); K.en1911 = ws(iy); K.mil = ws(iy + 1); K.choco1 = ws(iy + 4); K.contra = ws(iy + 5); K.buque = ws(iy + 7); K.guerra1 = ws(iy + 9);
  const ib4 = find('ella iba a bordo', iy); K.ella4 = ws(ib4); K.bordo = ws(ib4 + 3); K.salio = ws(ib4 + 5); K.sin = ws(ib4 + 6); K.rasguno = ws(ib4 + 8); K.L4e = wE(ib4 + 8);
  // L5 · 2 Titanic
  const i5 = find('dos el titanic', ib4); K.dos = ws(i5); K.titanic5 = ws(i5 + 2);
  const ias = find('al ano siguiente', i5); K.al5 = ws(ias); K.ano = ws(ias + 1); K.siguiente = ws(ias + 2);
  const isv = find('ella se salvo', ias); K.ella5 = ws(isv); K.salvo = ws(isv + 2); K.bote5 = ws(isv + 5); K.salvavidas5 = ws(isv + 6);
  const ibb = find('con un bebe', isv); K.con5 = ws(ibb); K.bebe = ws(ibb + 2); K.pusieron = ws(ibb + 5); K.brazos = ws(ibb + 8); K.subir5 = ws(ibb + 10); K.L5e = wE(ibb + 10);
  // L6 · 3 Britannic
  const i6 = find('y tres el britannic', ibb); K.y6 = ws(i6); K.tres6 = ws(i6 + 1); K.britannic = ws(i6 + 3);
  const ipg = find('en plena guerra', i6); K.plena = ws(ipg + 1); K.guerra6 = ws(ipg + 2);
  const ih = find('convertido en barco hospital', ipg); K.convertido = ws(ih); K.barco6 = ws(ih + 2); K.hospital = ws(ih + 3);
  const im = find('choco con una mina', ih); K.choco6 = ws(im); K.mina = ws(im + 3); K.minaE = wE(im + 3); K.hundio = ws(im + 6);
  const ien = find('ella iba de enfermera', im); K.ella6 = ws(ien); K.enfermera = ws(ien + 3); K.L6e = wE(ien + 3);
  // L7 clímax (sigue el paso 3)
  const i7 = find('su bote salvavidas acabo', ien); K.su7 = ws(i7); K.bote7 = ws(i7 + 1); K.acabo = ws(i7 + 3); K.arrastrado = ws(i7 + 4); K.hacia = ws(i7 + 5); K.helices = ws(i7 + 7);
  K.que7 = ws(i7 + 8); K.seguian = ws(i7 + 9); K.girando = ws(i7 + 10);
  const isa = find('asi que salto al agua', i7); K.asi = ws(isa); K.salto = ws(isa + 2); K.agua = ws(isa + 4);
  const igo = find('se golpeo la cabeza', isa); K.golpeo = ws(igo + 1); K.cabeza = ws(igo + 3);
  const iso = find('y sobrevivio otra vez', igo); K.y7 = ws(iso); K.sobrevivio7 = ws(iso + 1); K.otra = ws(iso + 2); K.vez = ws(iso + 3); K.L7e = wE(iso + 3);
  // L8 Ojo
  const i8 = find('ojo antes de abandonar', iso); K.ojo = ws(i8); K.antes = ws(i8 + 1); K.abandonar = ws(i8 + 3); K.barco8 = ws(i8 + 5);
  const ivc = find('volvio a su camarote', i8); K.volvio = ws(ivc); K.camarote = ws(ivc + 3);
  const ico = find('a por una cosa', ivc); K.apor = ws(ico); K.cosa = ws(ico + 3);
  const icp = find('su cepillo de dientes', ico); K.su8 = ws(icp); K.cepillo = ws(icp + 1); K.dientes = ws(icp + 3);
  const iem = find('era lo que mas habia echado de menos', icp); K.era8 = ws(iem); K.mas8 = ws(iem + 3); K.echado = ws(iem + 5); K.menos = ws(iem + 7);
  const idt = find('despues del titanic', iem); K.despues = ws(idt); K.titanic8 = ws(idt + 2); K.L8e = wE(idt + 2);
  // L9 O sea
  const i9 = find('o sea tres naufragios', idt); K.osea = ws(i9); K.tres9 = ws(i9 + 2); K.naufragios = ws(i9 + 3); K.naufragiosE = wE(i9 + 3);
  const ist = find('y siguio trabajando en barcos', i9); K.y9 = ws(ist); K.siguio = ws(ist + 1); K.trabajando = ws(ist + 2); K.barcos9 = ws(ist + 4);
  const ica = find('casi cuarenta anos mas', ist); K.casi = ws(ica); K.cuarenta = ws(ica + 1); K.anos = ws(ica + 2); K.mas9 = ws(ica + 3);
  const ill = find('la llamaban', ica); K.la9 = ws(ill); K.llamaban = ws(ill + 1); K.miss = ws(ill + 2); K.insumergible = ws(ill + 3); K.L9e = wE(ill + 3);
  // L10 pregunta + Os leo
  const i10 = find('tu te habrias vuelto', ill); K.tu10 = ws(i10); K.te10 = ws(i10 + 1); K.habrias = ws(i10 + 2); K.vuelto = ws(i10 + 3); K.a10 = ws(i10 + 4); K.subir10 = ws(i10 + 5); K.un10 = ws(i10 + 7); K.barco10 = ws(i10 + 8);
  const iol = find('os leo', i10); K.os = ws(iol); K.leo = ws(iol + 1);
  // L11 cierre
  const i11 = find('y esto no venia en el libro', iol); K.i11 = i11; K.y11 = ws(i11); K.esto11 = ws(i11 + 1); K.no11 = ws(i11 + 2); K.libro = ws(i11 + 6); K.END = wE(i11 + 6);
}
/* cortes de escena: un plano nuevo cada 1,5–2,5 s; ningún dato en pantalla menos de 1,5 s */
const S = {
  A: [-1, K.y0 - 0.04],                    // portada: Titanic + ¿SOBREVIVIÓ A 3 NAUFRAGIOS?
  A2: [K.y0 - 0.04, K.se1 - 0.1],           // «…y no fue lo más raro de su vida»
  B1: [K.se1 - 0.1, K.era - 0.1],           // nombre a máquina
  B2: [K.era - 0.1, K.viajo - 0.1],         // camarera de barcos
  H1: [K.viajo - 0.1, K.los1 - 0.06],       // los tres gemelos
  H2: [K.los1 - 0.06, K.soy - 0.1],         // los tres tuvieron un accidente
  BAL: [K.soy - 0.1, K.te3 - 0.12],         // marca (balcón)
  M: [K.te3 - 0.12, K.uno - 0.1],           // te los cuento uno a uno
  O1: [K.uno - 0.1, K.en1911 - 0.05],       // 1 · Olympic
  O2: [K.en1911 - 0.05, K.ella4 - 0.08],    // chocó contra un buque de guerra
  O3: [K.ella4 - 0.08, K.dos - 0.08],       // salió sin un rasguño
  T1: [K.dos - 0.08, K.dos - 0.08 + 1.55],  // 2 · Titanic (perfil)
  T2: [K.dos - 0.08 + 1.55, K.ella5 - 0.05],// al año siguiente (proa de noche)
  T3: [K.ella5 - 0.05, K.con5 - 0.05],      // bote salvavidas
  T4: [K.con5 - 0.05, K.y6 - 0.08],         // el bebé en los brazos
  B1x: [K.y6 - 0.08, K.convertido - 0.05],  // 3 · Britannic en plena guerra
  B2x: [K.convertido - 0.05, K.choco6 - 0.08], // barco hospital
  B3x: [K.choco6 - 0.08, K.ella6 - 0.08],   // mina y se hundió
  B4x: [K.ella6 - 0.08, K.su7 - 0.08],      // de enfermera
  P1: [K.su7 - 0.08, K.hacia - 0.03],       // el bote arrastrado
  P2: [K.hacia - 0.03, K.asi - 0.08],       // hacia las hélices que seguían girando
  P3: [K.asi - 0.08, K.golpeo - 0.07],      // ¡SALTÓ!
  P4: [K.golpeo - 0.07, K.y7 - 0.04],       // golpe en la cabeza
  P5: [K.y7 - 0.04, K.ojo - 0.06],          // y sobrevivió otra vez
  J1: [K.ojo - 0.06, K.volvio - 0.06],      // ¡OJO! antes de abandonar el barco
  J2: [K.volvio - 0.06, K.apor - 0.04],     // volvió a su camarote
  J3: [K.apor - 0.04, K.su8 - 0.06],        // a por una cosa
  J4: [K.su8 - 0.06, K.era8 - 0.06],        // su cepillo de dientes
  J5: [K.era8 - 0.06, K.osea - 0.08],       // lo que más echó de menos
  R1: [K.osea - 0.08, K.y9 - 0.06],         // O sea: tres naufragios
  R2: [K.y9 - 0.06, K.casi - 0.08],         // siguió trabajando en barcos
  R3: [K.casi - 0.08, K.la9 - 0.06],        // casi 40 años más
  R4: [K.la9 - 0.06, K.tu10 - 0.08],        // «Miss Insumergible»
  CTA: [K.tu10 - 0.08, K.y11 - 0.1],        // ¿Tú te habrías vuelto a subir? Os leo
  BAL2: [K.y11 - 0.1, K.no11 - 0.04],       // Y esto…
  BK: [K.no11 - 0.04, 999],                 // …no venía en el libro (libro que se cierra)
};
const DUR = K.END + 0.6, LOOP = DUR - 0.4;
const SCX = []; // ganchos extra por fotograma
/* pasos numerados (titular grande que aguanta todo el paso) */
const STEPS = [
  { n: 1, name: 'Olympic', year: '1911', t0: S.O1[0], t1: S.T1[0], tN: K.uno, tName: K.olympic, tYear: K.mil, tDone: K.rasguno + 0.45 },
  { n: 2, name: 'Titanic', year: '1912', t0: S.T1[0], t1: S.B1x[0], tN: K.dos, tName: K.titanic5, tYear: K.ano, tDone: K.subir5 + 0.3 },
  { n: 3, name: 'Britannic', year: '1916', t0: S.B1x[0], t1: S.J1[0], tN: K.tres6, tName: K.britannic, tYear: K.plena, tDone: K.otra },
];
