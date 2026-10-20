import sys, os, json; sys.path.insert(0, 'tools')
import audio_v2 as V, audio as A, numpy as np, subprocess
TXT = "Imagina que vuelves a casa a las dos y catorce de la madrugada. [pause] Carretera vacía. [whispers] Bosque a los dos lados."
VO = [("Carmelo", "5egO01tkUjEzu7xSSE8M", "Maduro, misterioso · España"),
      ("Gabo", "o0SveC0zgHFuCsEO3vHR", "Grave, evocador · España"),
      ("Martín Osborne", "W5JElH3dK1UYYAiHH7uh", "Íntimo, casi susurro · España"),
      ("Arconte", "QtPMrakdgePQIUwOX7Ut", "Profundo, elegante · España"),
      ("Mario", "OjrdP8Z2fWjVyt0scrL7", "Cálido, evocador · España"),
      ("Alejandro Durán", "sKgg4MPUDBy69X7iv3fA", "Grave y ronco · Latino"),
      ("Eva Dorado", "RgXx32WYOGrd7gFNifSf", "Narradora suave · España")]
segs = []
# referencia: la voz actual (Damian), recortada del vídeo 1
cur = A.decode('build/ruta2/g_n_62694a9a30.mp3')
segs.append(("Damián (actual)", "La voz que ya tienes", cur[:int(7.2 * A.SR)]))
for name, vid, desc in VO:
    mp3 = f'build/voces/{vid}.mp3'
    if not os.path.exists(mp3): V.eleven_group(TXT, vid, mp3)
    segs.append((name, desc, A.decode(mp3)))
out, cards, t = [], [], 0.0
bed_gap = np.zeros(int(.9 * A.SR))
for i, (name, desc, a) in enumerate(segs):
    a = V.voice_fx(a, 'room'); a = a / (np.sqrt(np.mean(a[np.abs(a) > .01] ** 2)) + 1e-9) * .16
    x = np.concatenate([np.zeros(int(.6 * A.SR)), a, bed_gap])
    amb = V.amb2('car', len(x) / A.SR)[:len(x)] * .6
    out.append(x + amb); cards.append((t, t + len(x) / A.SR, f"{i}. {name}" if i else name, desc)); t += len(x) / A.SR
mix = np.tanh(np.concatenate(out) * 1.6) / 1.6
pcm = (np.clip(mix, -1, 1) * 32767).astype(np.int16)
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 's16le', '-ar', str(A.SR), '-ac', '1', '-i', '-', 'build/voces/mix.wav'], input=pcm.tobytes(), check=True)
json.dump(cards, open('build/voces/cards.json', 'w'), ensure_ascii=False)
print(t)
