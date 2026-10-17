/* Ep. 9 v2 · tiempos clave — TODO clavado por texto (find) a words.js, nunca absolutos */
const fw = (ph, from = 0) => find(ph, from);
const ws = i => W[i].s, wE = i => W[i].e;
// inicio de cada línea del guion (índice de su primera palabra)
const L = {
  gancho: fw('el pulgar hacia abajo no significaba matalo'),
  gesto: fw('ese gesto te lo enseno un cuadro'),
  pollice: fw('los textos romanos hablan de pollice verso'),
  imagen: fw('la imagen del pulgar hacia abajo la hizo famosa'),
  mas: fw('y hay mas muchos combates'),
  caro: fw('un gladiador era carisimo'),
  clem: fw('el que perdia podia pedir clemencia'),
  augusto: fw('incluso el emperador augusto'),
  ojo: fw('ojo morian gladiadores'),
  osea: fw('o sea los gladiadores se parecian'),
  vecino: fw('soy tu vecino'),
};
// at(línea, nº de palabra dentro de la línea, desfase) → inicio; atE → fin
const at = (li, k, d = 0) => ws(li + k) + d, atE = (li, k, d = 0) => wE(li + k) + d;
const K = {};
{
  const it = fw('te lo creias', L.osea); K.te = ws(it); K.creias = ws(it + 2); K.creiasE = wE(it + 2);
  const isn = fw('si o no', it); K.si = ws(isn); K.o = ws(isn + 1); K.noB = ws(isn + 2); K.noBE = wE(isn + 2);
  const is = fw('soy tu vecino', isn); K.isoy = is; K.soy = ws(is); K.vecino = ws(is + 2); K.vecinoE = wE(is + 2);
  const iy = fw('y esto no venia en el libro', is); K.iy = iy; K.y = ws(iy); K.esto = ws(iy + 1); K.noV = ws(iy + 2); K.enL = ws(iy + 4); K.libro = ws(iy + 6); K.END = wE(iy + 6);
}
const S = {
  pol0: at(L.pollice, 0, -0.07),          // fin del gancho → pollice verso
  hit2: at(L.osea, 12, 0.02),             // golpe rosa «…que a carne de cañón» + SÍ/NO
  bal: K.soy - 0.1,                        // balcón del Vecino (rápido)
  book: K.vecinoE + 0.12,                  // libro HISTORIA que se cierra
};
const DUR = K.END + 0.6, LOOP = DUR - 0.4;
