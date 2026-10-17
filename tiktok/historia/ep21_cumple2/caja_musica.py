"""Ep. 21 · Caja de música GENERADA POR CÓDIGO (numpy, sin bancos de sonido) para el hueco de karaoke tras la L1.

Qué hace:
  1. Guarda la locución limpia en voice_solo.wav (la que sale de gen_lines.py) y nunca la pisa.
  2. Sintetiza la primera frase de «Cumpleaños feliz» / «Good morning to you» en caja de música:
     Sol Sol La Sol Do Si (G5 G5 A5 G5 C6 B5), ritmo 3/4 de la canción: corchea con puntillo, semicorchea, negra, negra, negra, blanca.
  3. La coloca DENTRO del hueco entre el final de la L1 y el inicio de la L2 (lines.json), con márgenes,
     comprueba que no se solapa con la voz y escribe voice_final.wav = voz + caja de música.
  4. Escribe melody.js (window.MELODY) con los tiempos exactos de cada nota → la bolita de karaoke salta con el sonido.
uso: python3 -I caja_musica.py <dir_episodio>      (volver a ejecutarlo tras regenerar la voz: es idempotente)
Después, audio.py trata la caja de música como parte de la voz: la música de fondo se aparta (ducking) y el QA mide todo."""
import sys, os, json, wave, hashlib
import numpy as np

SR = 44100
d = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else '.')
VF, VS, MJ = f'{d}/voice_final.wav', f'{d}/voice_solo.wav', f'{d}/melody.json'

def rd(p):
    w = wave.open(p); assert w.getframerate() == SR and w.getnchannels() == 1
    return np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float64) / 32768
def wr(p, x):
    o = wave.open(p, 'wb'); o.setnchannels(1); o.setsampwidth(2); o.setframerate(SR)
    o.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes()); o.close()
def h(p): return hashlib.md5(open(p, 'rb').read()).hexdigest()

# 1) locución limpia: si voice_final.wav no es la mezcla que escribimos nosotros, es una voz nueva de gen_lines.py
prev = json.load(open(MJ)) if os.path.exists(MJ) else {}
if not os.path.exists(VS) or prev.get('md5_mix') != h(VF):
    wr(VS, rd(VF)); print('voz limpia guardada en voice_solo.wav')
v = rd(VS)

# 2) hueco tras la L1 (línea 1) hasta la L2
L = json.load(open(f'{d}/lines.json'))
g0, g1 = L[1]['e'], L[2]['s']
# final REAL de la voz por energía (por si la cola de la L1 suena más allá de su marca)
hop = SR // 100; nb = len(v) // hop; e = np.sqrt(np.mean(v[:nb * hop].reshape(nb, hop) ** 2, axis=1) + 1e-12)
ref = np.percentile(e[e > 1e-5], 95); act = 20 * np.log10(e / ref) > -45
i = int(L[1]['s'] * 100)
last = max(k for k in range(i, int(g1 * 100)) if act[k])          # último bloque con voz antes de la L2
first2 = min(k for k in range(int(g0 * 100), nb) if act[k])         # primer bloque con voz de la L2
voz_fin, voz_ini = (last + 1) / 100, first2 / 100
T0 = max(g0, voz_fin) + 0.10       # arranca 0,1 s después de que calle la voz
TEND = voz_ini - 0.12              # silencio total 0,12 s antes de que vuelva a hablar
# ritmo 3/4 de la 1.ª frase: duraciones en negras
DUR = [0.75, 0.25, 1.0, 1.0, 1.0, 2.0]
ONS = np.concatenate([[0], np.cumsum(DUR[:-1])])                    # 0, .75, 1, 2, 3, 4
RING = 1.6                                                          # la última nota suena 1,6 negras y se apaga
beat = min(0.58, (TEND - T0) / (ONS[-1] + RING))
NOTES = [('Sol', 'G', 5, 'Bue'), ('Sol', 'G', 5, 'nos'), ('La', 'A', 5, 'dí'), ('Sol', 'G', 5, 'as'), ('Do', 'C', 6, 'a'), ('Si', 'B', 5, 'ti')]
SEMI = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}
hz = lambda n, o: 440 * 2 ** ((SEMI[n] - 9) / 12 + (o - 4))

# 3) síntesis de una púa de caja de música: parciales casi armónicos + parcial metálico de la lámina + clic de la púa
rng = np.random.default_rng(21)
def tine(f, dur, damp=None):
    n = int(dur * SR); t = np.arange(n) / SR
    parts = [(1.0, 1.0, 0.75), (2.0, 0.22, 0.30), (3.01, 0.07, 0.15), (5.93, 0.16, 0.05), (1.0035, 0.30, 0.55)]  # (ratio, amp, tau s)
    x = sum(a * np.sin(2 * np.pi * f * r * t + (0.0 if r < 1.01 else rng.uniform(0, 6.28))) * np.exp(-t / tau) for r, a, tau in parts)  # fundamental y parcial 1.0035 en fase: el batido no cancela el ataque
    x *= np.minimum(1, t / 0.002)                                      # ataque de 2 ms
    k = int(0.004 * SR); cl = rng.standard_normal(k) * np.exp(-np.arange(k) / (0.0008 * SR)); cl -= np.convolve(cl, np.ones(8) / 8, 'same')
    x[:k] += 0.25 * cl                                                 # clic de la púa (ruido agudo de 4 ms)
    if damp is not None:                                               # al sonar la nota siguiente, esta se apaga deprisa (melodía nítida)
        x *= np.where(t < damp, 1, 0.06 + 0.94 * np.exp(-np.maximum(0, t - damp) / 0.06))
    return x

n = len(v); mel = np.zeros(n); notes_out = []
for k, (nom, nn, oc, syl) in enumerate(NOTES):
    s = T0 + ONS[k] * beat
    e_ = s + DUR[k] * beat if k < len(NOTES) - 1 else s + RING * beat
    x = tine(hz(nn, oc), TEND - s, (ONS[k + 1] - ONS[k]) * beat if k < len(NOTES) - 1 else None)                                     # cada púa suena libre hasta el final del hueco
    a = int(s * SR); mel[a:a + len(x)] += x[: n - a]
    notes_out.append({'s': round(s, 3), 'e': round(e_, 3), 'syl': syl, 'nota': nom, 'hz': round(hz(nn, oc), 1)})
# reverberación corta de «cajita de madera» (ecos tempranos)
rev = np.zeros(n)
for dl, gn in [(0.023, 0.32), (0.037, 0.24), (0.053, 0.18), (0.079, 0.12), (0.113, 0.08)]:
    m = int(dl * SR); rev[m:] += mel[:-m] * gn
mel = mel + rev
# apagado: fundido de 0,25 s que termina exactamente en TEND, y cero absoluto fuera del hueco
fo0 = TEND - 0.25 * 1.0
tt = np.arange(n) / SR
mel *= np.clip((TEND - tt) / (TEND - fo0), 0, 1) * (tt >= T0 - 0.001)

# nivel: RMS de la caja ≈ 5 dB por debajo del RMS de la voz hablada
vs = np.repeat(act, hop)[:n]; vs = np.pad(vs, (0, n - len(vs)))
vr = np.sqrt(np.mean(v[vs > 0] ** 2)); mz = (tt >= T0) & (tt < T0 + (ONS[-1] + 1) * beat)
mel *= vr * 10 ** (-5 / 20) / np.sqrt(np.mean(mel[mz] ** 2))
if np.max(np.abs(mel)) > 0.5: mel *= 0.5 / np.max(np.abs(mel))

# 4) comprobación: la caja suena SOLO en el hueco y la voz está callada allí
nz = np.nonzero(np.abs(mel) > 1e-6)[0]; m0, m1 = nz[0] / SR, nz[-1] / SR
assert m0 >= voz_fin + 0.05 and m1 <= voz_ini - 0.08, (m0, m1, voz_fin, voz_ini)
vz = v[int(m0 * SR):int(m1 * SR)]
vdb = 20 * np.log10(np.sqrt(np.mean(vz ** 2)) / vr + 1e-12)
assert vdb < -40, f'hay voz dentro del hueco ({vdb:.1f} dB)'
out = v + mel
wr(VF, out); wr(f'{d}/caja_musica.wav', mel)
info = {'hueco_lines': [g0, g1], 'voz_calla': round(voz_fin, 3), 'voz_vuelve': round(voz_ini, 3), 'caja_desde': round(m0, 3), 'caja_hasta': round(m1, 3),
        'negra_s': round(beat, 3), 'bpm': round(60 / beat, 1), 'voz_en_hueco_dB': round(float(vdb), 1), 'notas': notes_out, 'md5_mix': h(VF)}
json.dump(info, open(MJ, 'w'), ensure_ascii=False, indent=1)
open(f'{d}/melody.js', 'w').write('window.MELODY=' + json.dumps({k: info[k] for k in ('caja_desde', 'caja_hasta', 'negra_s', 'notas')}, ensure_ascii=False) + ';')
print(json.dumps({k: v_ for k, v_ in info.items() if k != 'notas'}, ensure_ascii=False))
for q in notes_out: print(q)
