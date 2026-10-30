"""Voz + música + efectos para el motor 2D. Uso: python3 mezcla.py ../<ep>
Efectos: un barrido («aire») en cada plano con entrada 'barrido', un golpe en cada 'zoom', y los de <ep>/sonidos.py
(efectos(vt) → [(sonido, t, db)]). Música (<ep>/musica.mp3) a -22 dB bajo la voz y con compresión cuando habla."""
import json, os, re, subprocess, sys, unicodedata, importlib.util
ep = os.path.abspath(sys.argv[1]); here = os.path.dirname(os.path.abspath(__file__))
SON = os.path.join(here, '..', '..', 'a-escala', 'build', 'sonidos')
subs = [w for w in json.load(open(os.path.join(ep, 'stt.json')))['words'] if w['type'] == 'word']
norm = lambda s: re.sub(r'\W', '', unicodedata.normalize('NFD', s).encode('ascii', 'ignore').decode()).lower()
def vt(w, n=1):
    k = 0
    for x in subs:
        if norm(x['text']) == norm(w):
            k += 1
            if k == n: return x['start']
    raise KeyError(w)
planos = json.load(open(os.path.join(ep, 'build', 'planos.json')))
fx = [('aire', t0 - .08, -14) for t0, e in planos if e == 'barrido'] + [('golpe', t0, -14) for t0, e in planos if e == 'zoom']
spec = importlib.util.spec_from_file_location('s', os.path.join(ep, 'sonidos.py')); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
fx += m.efectos(vt)
voz = os.path.join(ep, 'voice_raw.mp3'); dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', voz])) + 1.0
pico = lambda f: float(re.search(r'max_volume: ([-\d.]+)', subprocess.run(['ffmpeg', '-hide_banner', '-i', f, '-af', 'volumedetect', '-f', 'null', '-'], capture_output=True, text=True).stderr).group(1))
pv = pico(voz); ins = ['-i', voz]; fil = []; lab = ['[v]']
mus = os.path.join(ep, 'musica.mp3')
if os.path.exists(mus):
    ins += ['-i', mus]; fil.append(f"[1:a]aformat=channel_layouts=stereo,volume={pv - pico(mus) - 22:.1f}dB,afade=t=out:st={dur - 1.5}:d=1.5[m]"); lab.append('[m]')
b = len(ins) // 2
for i, (n, t, db) in enumerate(fx):
    f = next(os.path.join(SON, x) for x in os.listdir(SON) if x.rsplit('.', 1)[0] == n)
    ins += ['-i', f]; j = b + i; t0 = max(0, t)
    fil.append(f"[{j}:a]aformat=channel_layouts=stereo,volume={pv - pico(f) + db:.1f}dB,adelay={int(t0 * 1000)}|{int(t0 * 1000)}[e{i}]"); lab.append(f'[e{i}]')
fil.insert(0, f"[0:a]aformat=channel_layouts=stereo,apad=whole_dur={dur}[v]")
fil.append(''.join(lab) + f"amix=inputs={len(lab)}:normalize=0:duration=first,alimiter=limit=0.95[out]")
out = os.path.join(ep, 'build', 'mezcla.wav')
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *ins, '-filter_complex', ';'.join(fil), '-map', '[out]', '-t', str(dur), out], check=True)
print(len(fx), 'efectos ·', out)
