/* =====================================================================
   Ep. 2 v2 · RE-CLAVADO POR TEXTO
   Las escenas heredadas de v1 se escribieron con los tiempos de la voz v1.
   Aquí se re-clavan palabra a palabra a la voz nueva: cada línea conservada
   se localiza en la voz nueva con find() (por texto) y cada palabra v1 se
   empareja con la misma palabra nueva. Con esas anclas:
     NT(T)  tiempo v1 → tiempo nuevo   (titulares, escenas, sfx, temblores)
     OTs(seg,t)  tiempo nuevo → tiempo v1 dentro de un tramo (lo que reciben
                 las funciones de escena heredadas, que comparan con tiempos v1)
   Tramos v1 eliminados (sin equivalente): marca del s. 10,6–13,85 (balcón)
   y «¿De dónde sale el mito?… Washington Irving» 49,7–57,45. Lo de v1 >73,0
   (CTA, «Y esto…», tarjeta final) se ha borrado del código.
   ===================================================================== */
const V1 = [ // [tramo, primeras palabras de la línea (se buscan en la voz NUEVA), inicios v1 de cada palabra]
  ['A', "¡Colón no demostró que la", [0.163, 0.568, 0.733, 1.235, 1.391, 1.504, 1.852, 2.086, 2.767, 3.179, 3.291, 3.426, 3.703, 3.937, 4.222, 4.469, 4.639, 4.852]],
  ['A', "Y lo mejor: los que", [6.057, 6.171, 6.299, 6.951, 7.632, 7.788, 7.887, 8.227, 8.440, 9.504, 9.930]],
  ['B', "En el siglo tercero antes", [13.976, 14.090, 14.189, 14.465, 14.798, 15.111, 15.210, 15.820, 15.976, 16.308, 16.643, 17.380, 17.749, 17.891, 18.280, 18.635, 19.763, 19.899, 20.132, 20.245]],
  ['B', "En la época de Colón,", [20.967, 21.080, 21.166, 21.421, 21.520, 22.201, 22.626, 22.975, 23.328, 23.626, 23.719, 23.860, 24.243, 24.413, 25.591, 25.699, 26.116, 26.311, 27.060, 27.293, 27.410]],
  ['B', "Colón calculó que Japón estaba", [28.127, 28.431, 28.850, 29.021, 29.379, 29.829, 29.965, 30.218, 30.553, 30.737, 31.233, 31.829, 32.255, 32.496, 32.595]],
  ['B', "En realidad, está a casi", [33.330, 33.462, 34.028, 34.522, 34.641, 34.806, 35.181]],
  ['B', "Los expertos que revisaron su", [35.807, 36.026, 36.424, 36.544, 37.055, 37.220, 37.453, 37.573, 38.360, 38.668, 39.112, 39.530, 40.190, 40.615, 40.956]],
  ['B', "Si no llega a haber", [41.691, 41.832, 41.980, 42.180, 42.215, 42.315, 42.432, 43.109, 43.279, 43.755, 44.138, 44.457, 45.648, 45.904, 45.975, 46.082, 46.741, 46.840, 47.172, 47.542, 47.794, 48.244, 48.478, 48.797, 48.981]],
  ['C', "Ojo: Colón tiene su mérito.", [57.541, 58.094, 58.604, 58.846, 58.959, 59.924, 60.378, 60.477, 61.009, 61.264, 61.519, 62.290, 63.299, 63.477, 63.697, 63.775, 63.867, 63.992]],
  ['C', "O sea: Colón no acertó", [65.166, 65.336, 65.847, 66.641, 66.924, 67.421, 67.578, 67.690, 68.003, 68.088, 68.201, 69.137, 69.464, 69.868, 69.988, 70.187, 71.591, 71.663, 71.783, 72.094, 72.272, 72.429]],
];
// rango v1 que cubre cada tramo (lo que cae fuera no existe en v2)
const SEG_OLD = { A: [-9, 10.6], B: [13.85, 49.7], C: [57.45, 73.0] };
const ANC = { A: [], B: [], C: [] }; // pares [nuevo, v1]
{
  let from = 0;
  V1.forEach(([sg, key, olds]) => {
    const i0 = find(key, from); from = i0 + olds.length;
    olds.forEach((o, k) => ANC[sg].push([W[i0 + k].s, o]));
  });
}
function interp(arr, x, a, b) { // arr ordenado por a; extrapola con pendiente 1
  if (x <= arr[0][a]) return arr[0][b] + (x - arr[0][a]);
  const L = arr[arr.length - 1]; if (x >= L[a]) return L[b] + (x - L[a]);
  for (let i = 1; i < arr.length; i++) if (x < arr[i][a]) { const q = arr[i - 1], r = arr[i]; return q[b] + (x - q[a]) / (r[a] - q[a]) * (r[b] - q[b]); }
}
const segOf = T => Object.keys(SEG_OLD).find(k => T >= SEG_OLD[k][0] - 1e-6 && T <= SEG_OLD[k][1] + 1e-6) || null;
const NTs = (sg, T) => interp(ANC[sg], T, 1, 0);
const OTs = (sg, t) => interp(ANC[sg], t, 0, 1);
const NT = T => { const sg = segOf(T); return sg ? NTs(sg, T) : null; };

/* ---------- claves de la voz nueva (todas por texto) ---------- */
const K = {
  te: w('te lo habian contado asi'), asi: w('asi si o no'), si: w('si o no'), noB: W[find('si o no') + 2].s,
  soy: w('soy tu vecino'), vecino: w('vecino y esto'), ye: w('y esto no venia'), esto: w('esto no venia en'),
  libro: w('libro'), END: W[W.length - 1].e,
};
const CUT_C = K.te - 0.14;              // fin de lo heredado (golpe SUERTE) → entra el SÍ / NO
const DUR = K.END + 0.6, LOOP = DUR - 0.4;

/* ---------- envoltorios: lo heredado (tiempos v1) pasa por NT ---------- */
let WARP = true;
{
  const _headline = headline, _scene = scene;
  headline = (t0, t1, str, o = {}) => {
    if (!WARP) return _headline(t0, t1, str, o);
    const sg = segOf(t0 < -0.5 ? 0 : t0); if (!sg) { console.warn('titular fuera de tramo', str); return; }
    const o2 = Object.assign({}, o); if (o.hlT != null) o2.hlT = NTs(sg, o.hlT);
    _headline(t0 < -0.5 ? t0 : NTs(sg, t0), Math.min(NTs(sg, t1), CUT_C), str, o2);
  };
  scene = (t0, t1, fn, o = {}) => {
    if (!WARP) return _scene(t0, t1, fn, o);
    const sg = segOf(t0 < -0.5 ? 0 : t0);
    const c = _scene(t0 < -0.5 ? t0 : NTs(sg, t0), Math.min(NTs(sg, t1), CUT_C), fn, o);
    SC[SC.length - 1].seg = sg; return c;
  };
}
