"""QA en texto de un episodio: comprueba las reglas v3 sin mirar imágenes (barato en tokens).
uso: python3 -I qa.py <dir> [--whisper]   -> imprime ≤ 15 líneas: OK/FALLO por regla y, con --whisper, solo las palabras que no cuadran."""
import sys, json, os, re, unicodedata, difflib

d = sys.argv[1].rstrip('/')
L = json.load(open(d + '/lines.json'))
def norm(s):
    """minúsculas, sin acentos, sin etiquetas [excited] ni puntuación"""
    s = unicodedata.normalize('NFD', re.sub(r'\[[^\]]*\]', '', s).lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'\s+', ' ', re.sub(r'[^a-z0-9 ]', ' ', s)).strip()
fallos, avisos = [], []
dur = lambda l: l['e'] - l['s']
total = L[-1]['e'] + 0.6

first = norm(L[0]['text']).split()[0]
if first in ('oye', 'que', 'lo', 'mira', 'hola'): fallos.append(f'P3 primera palabra «{first}»: tiene que ser el tema')
if dur(L[0]) > 3.5: fallos.append(f'P3 gancho {dur(L[0]):.1f} s (máx 3,5)')
for l in L:
    t = norm(l['text'])
    if t.startswith('ojo') and dur(l) > 6: fallos.append(f'«Ojo» L{l["line"]} {dur(l):.1f} s (máx 6)')
    if dur(l) < 1.5: fallos.append(f'L{l["line"]} dura {dur(l):.1f} s: no se puede leer (mín 1,5)')
    if dur(l) > 9: avisos.append(f'L{l["line"]} {dur(l):.1f} s: necesita ≥ 3 planos')
    if re.search(r'\b(1[0-9]{3}|[0-9]+[.,][0-9]+)\b', l['text']): avisos.append(f'L{l["line"]} lleva cifras escritas: ElevenLabs puede leerlas mal, mejor en letra')
if 'no venia en el libro' not in norm(L[-1]['text']): fallos.append('Falta la marca al final («…y esto no venía en el libro»)')
if 'os leo' not in norm(L[-2]['text']): fallos.append('La penúltima línea no acaba en «Os leo»')
if 'si o no' in norm(' '.join(l['text'] for l in L)): fallos.append('Cierre «Sí o no»: tiene que ser pregunta abierta y personal')
if L[0]['s'] > 0.35: fallos.append(f'La voz arranca tarde ({L[0]["s"]:.2f} s)')
if not 50 <= total <= 90: fallos.append(f'Duración {total:.1f} s (55–90)')
# la promesa del gancho se paga antes del s 30: la línea «Uno:» tiene que empezar antes
uno = next((l for l in L if norm(l['text']).startswith(('uno', 'una '))), None)
if uno and uno['s'] > 30: fallos.append(f'«Uno» empieza en {uno["s"]:.1f} s: la promesa llega tarde (máx 30)')

if '--whisper' in sys.argv:
    from faster_whisper import WhisperModel
    import numpy as np, subprocess
    a = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', d + '/voice_final.wav', '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], capture_output=True).stdout, np.int16).astype(np.float32) / 32768
    segs, _ = WhisperModel('small', device='cpu', compute_type='int8').transcribe(a, language='es')
    oido = norm(' '.join(s.text for s in segs)).split()
    guion = norm(' '.join(l['text'] for l in L)).split()
    sm = difflib.SequenceMatcher(None, guion, oido)
    ratio = sm.ratio()
    malas = [(' '.join(guion[i1:i2]), ' '.join(oido[j1:j2])) for op, i1, i2, j1, j2 in sm.get_opcodes() if op != 'equal' and not all(x.isdigit() for x in oido[j1:j2] or ['x'])]
    (fallos if ratio < 0.93 else avisos).append(f'Whisper: {ratio:.0%} de coincidencia')
    for g, o in malas[:6]: avisos.append(f'  guion «{g}» → se oye «{o}»')

print(f'{os.path.basename(d)} · {total:.1f} s · {len(L)} líneas · ' + ('QA OK' if not fallos else f'{len(fallos)} FALLOS'))
for f in fallos: print('✗', f)
for a in avisos[:10]: print('·', a)
sys.exit(1 if fallos else 0)
