"""Mezcla final: voz + efectos + música (todo generado con ElevenLabs). Las funciones procedurales antiguas no se usan.
uso: python3 audio.py <dir> <estilo_musica>   (estilos: detective, ambient, telenovela, ragtime)
Lee <dir>/voice_final.wav, <dir>/sfx.json, <dir>/video_noaudio.mp4 -> <dir>/final.mp4"""
import sys, json, wave, subprocess, numpy as np

SR = 44100
rng = np.random.default_rng(7)

def env(n, a=0.005, d=0.2):
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / max(d, 1e-4))
    return e

def tone(f, dur, a=0.005, d=0.2, harm=(1,), shape='sine'):
    n = int(dur * SR); t = np.arange(n) / SR
    f = np.broadcast_to(np.asarray(f, dtype=float), (n,)) if np.ndim(f) else np.full(n, float(f))
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = sum((1 / (k + 1)) * np.sin(ph * h) for k, h in enumerate(harm))
    return s * env(n, a, d)

def noise(dur, a=0.002, d=0.1, lp=None, hp=None):
    n = int(dur * SR); x = rng.standard_normal(n)
    if lp: x = onepole(x, lp)
    if hp: x = x - onepole(x, hp)
    return x * env(n, a, d)

def onepole(x, fc):
    k = np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); acc = 0.0
    for i in range(len(x)):
        acc = (1 - k) * x[i] + k * acc; y[i] = acc
    return y

def sweep(f0, f1, dur, d=None, a=0.003):
    n = int(dur * SR); f = np.geomspace(f0, f1, n)
    return tone(f, dur, a, d or dur)

def M(*xs):
    n = max(len(x) for x in xs); return sum(np.pad(x, (0, n - len(x))) for x in xs)

def norm(x, peak=0.9):
    m = np.max(np.abs(x)) or 1; return x / m * peak

def lib():
    L = {}
    L['pop'] = norm(sweep(380, 900, 0.09, 0.05))
    L['pop2'] = norm(sweep(700, 1600, 0.08, 0.04))
    L['click'] = norm(noise(0.03, 0.0005, 0.006, hp=2000))
    L['tick'] = norm(tone(2400, 0.04, 0.0005, 0.01) + 0.3 * noise(0.04, 0.0005, 0.005, hp=3000)) * 0.6
    L['whoosh'] = norm(noise(0.45, 0.18, 0.12, lp=2500, hp=300)) * 0.7
    L['swoosh_up'] = norm(noise(0.35, 0.25, 0.06, lp=4000, hp=800) + 0.2 * sweep(300, 1400, 0.35, 0.2)) * 0.7
    L['stamp'] = norm(M(tone(70, 0.35, 0.001, 0.09), 0.7 * noise(0.2, 0.0005, 0.04, lp=1800)))
    L['thud'] = norm(M(tone(55, 0.4, 0.001, 0.12), 0.3 * noise(0.1, 0.0005, 0.02, lp=600)))
    L['ding'] = norm(tone(1320, 1.2, 0.002, 0.45, harm=(1, 2.76, 5.4)))
    L['bell'] = norm(tone(880, 1.6, 0.002, 0.6, harm=(1, 2.0, 3.0, 4.2)))
    L['ping'] = norm(tone(1760, 0.9, 0.001, 0.3, harm=(1, 3.1)) + 0.4 * tone(2637, 0.9, 0.001, 0.2))
    L['cash'] = norm(np.concatenate([tone(2093, 0.12, 0.001, 0.05), tone(2637, 0.6, 0.001, 0.25, harm=(1, 2.4))]) + 0.4 * np.pad(noise(0.25, 0.001, 0.08, hp=4000), (0, int(0.47 * SR))))
    L['error'] = norm(tone(150, 0.32, 0.005, 1.0, harm=(1, 3, 5)) * (np.arange(int(0.32 * SR)) < 0.3 * SR)) * 0.6
    L['type'] = norm(noise(0.035, 0.0005, 0.008, lp=6000, hp=900) + 0.5 * tone(180, 0.035, 0.0005, 0.01)) * 0.7
    L['paper'] = norm(noise(0.3, 0.01, 0.1, lp=6000, hp=1500)) * 0.6
    L['boing'] = norm(tone(180 + 90 * np.sin(np.linspace(0, 40, int(0.5 * SR))) * np.exp(-np.linspace(0, 5, int(0.5 * SR))), 0.5, 0.002, 0.25))
    L['burst'] = norm(np.concatenate([np.pad(noise(0.06, 0.0005, 0.02, lp=3000) + 0.6 * tone(90, 0.06, 0.0005, 0.02), (0, int(0.03 * SR))) for _ in range(6)])) * 0.7
    L['sparkle'] = norm(sum(np.pad(tone(f, 0.25, 0.001, 0.1), (int(i * 0.05 * SR), int((4 - i) * 0.05 * SR))) for i, f in enumerate([1568, 2093, 2637, 3136, 4186])))
    L['glitch'] = norm(np.concatenate([noise(0.03, 0.0005, 0.02, hp=1000) * (rng.random() > .3) for _ in range(8)])) * 0.5
    L['squish'] = norm(sweep(500, 140, 0.22, 0.12) + 0.3 * noise(0.22, 0.01, 0.06, lp=1200)) * 0.8
    L['gulp'] = norm(sweep(220, 520, 0.12, 0.06) + 0.5 * sweep(260, 600, 0.12, 0.06)) * 0.7
    L['heart'] = norm(np.concatenate([tone(60, 0.12, 0.002, 0.05), np.zeros(int(0.08 * SR)), tone(55, 0.15, 0.002, 0.06)]))
    L['tada'] = norm(sum(np.pad(tone(f, 0.9, 0.003, 0.35, harm=(1, 2, 3)), (int(i * 0.07 * SR), int((2 - i) * 0.07 * SR))) for i, f in enumerate([523, 659, 784])))
    L['sad'] = norm(np.concatenate([tone(392, 0.28, 0.01, 0.4, harm=(1, 2)), tone(370, 0.28, 0.01, 0.4, harm=(1, 2)), tone(349, 0.28, 0.01, 0.4, harm=(1, 2)), tone(330, 0.9, 0.01, 0.5, harm=(1, 2))])) * 0.7
    L['drumroll'] = norm(np.concatenate([noise(0.045, 0.001, 0.02, lp=2500, hp=200) * (0.4 + 0.6 * k / 30) for k in range(30)])) * 0.6
    L['emu'] = norm(tone(110 + 20 * np.sin(np.linspace(0, 60, int(0.5 * SR))), 0.5, 0.05, 0.3, harm=(1, 2, 3))) * 0.7  # 'bum' grave de emú
    return L

# ---------------- música ----------------
NOTE = {n: i for i, n in enumerate(['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'])}
def hz(n, o): return 440 * 2 ** ((NOTE[n] - 9) / 12 + (o - 4))
def chord(root, o, kind):
    iv = {'maj7': [0, 4, 7, 11], 'm7': [0, 3, 7, 10], '7': [0, 4, 7, 10], 'maj': [0, 4, 7], 'm': [0, 3, 7], 'm9': [0, 3, 7, 10, 14]}[kind]
    b = hz(root, o); return [b * 2 ** (i / 12) for i in iv]

def kick(): n = int(0.35 * SR); f = 50 + 90 * np.exp(-np.arange(n) / SR * 30); return tone(f, 0.35, 0.001, 0.12) * 1.0
def snare(): return M(noise(0.2, 0.001, 0.06, lp=5000, hp=400) * 0.5, tone(190, 0.12, 0.001, 0.04) * 0.3)
def hat(o=False): return noise(0.12 if o else 0.04, 0.0005, 0.04 if o else 0.012, hp=6000) * 0.35
def rim(): return (tone(1700, 0.03, 0.0005, 0.01) + noise(0.03, 0.0005, 0.008, hp=2000) * 0.4) * 0.4

def music(style, dur):
    out = np.zeros(int((dur + 2) * SR))
    def put(x, t, g=1.0):
        i = int(t * SR)
        if i >= len(out): return
        x = x[: len(out) - i]; out[i:i + len(x)] += x * g
    if style == 'detective':
        bpm, prog = 88, [('A', 'm7'), ('D', 'm7'), ('E', '7'), ('A', 'm7')]
    elif style == 'ambient':
        bpm, prog = 72, [('F', 'maj7'), ('A', 'm7'), ('D', 'm9'), ('C', 'maj7')]
    elif style == 'telenovela':
        bpm, prog = 100, [('C', 'maj'), ('A', 'm'), ('F', 'maj'), ('G', '7')]
    else:  # ragtime
        bpm, prog = 116, [('G', 'maj'), ('E', '7'), ('A', '7'), ('D', '7')]
    beat = 60 / bpm; bar = beat * 4; t = 0.0; k = 0
    while t < dur + 1:
        root, kind = prog[k % len(prog)]; ch = chord(root, 3 if style != 'ambient' else 3, kind); b = hz(root, 2)
        if style == 'detective':
            for i in range(4):
                put(tone(b * (1 if i % 2 == 0 else 1.5), beat * 0.9, 0.005, 0.18, harm=(1, 2)), t + i * beat, 0.55)  # bajo pizz
                put(rim() if i % 2 else kick() * 0.5, t + i * beat, 0.6)
                put(hat(), t + i * beat + beat / 2, 0.5)
            for j, f in enumerate(ch):  # rhodes
                put(tone(f * 2, bar * 0.95, 0.02, 0.9, harm=(1, 2)) * (1 + 0.15 * np.sin(np.arange(int(bar * 0.95 * SR)) / SR * 2 * np.pi * 5)), t + beat * 0.5 + j * 0.02, 0.09)
        elif style == 'ambient':
            for j, f in enumerate(ch):
                n = int(bar * 1.1 * SR); tt = np.arange(n) / SR
                pad = (np.sin(2 * np.pi * f * 2 * tt) + 0.5 * np.sin(2 * np.pi * f * 2.003 * tt)) * np.minimum(1, tt / 1.0) * np.minimum(1, (bar * 1.1 - tt) / 0.6)
                put(pad, t, 0.05)
            put(kick() * 0.5, t, 0.5); put(kick() * 0.3, t + beat * 2.5, 0.5)
            for i in range(8):  # arpegio suave
                put(tone(ch[i % len(ch)] * 4, 0.5, 0.003, 0.25), t + i * beat / 2, 0.06)
                put(hat() * 0.5, t + i * beat / 2 + beat / 4, 0.35)
        elif style == 'telenovela':
            for i in range(4):
                put(tone(b * (1, 1.5, 2, 1.5)[i], beat * 0.8, 0.003, 0.15, harm=(1, 2)), t + i * beat, 0.5)
                put(kick() if i % 2 == 0 else snare(), t + i * beat, 0.45)
                put(hat(), t + i * beat + beat / 2, 0.45)
            for i in range(8):  # marimba
                f = ch[(i * 2) % len(ch)] * 4
                put(tone(f, 0.3, 0.001, 0.09, harm=(1, 4)), t + i * beat / 2, 0.12)
        else:
            for i in range(4):  # oom-pah
                if i % 2 == 0: put(tone(b, beat * 0.5, 0.002, 0.12, harm=(1, 2)), t + i * beat, 0.6); put(kick() * 0.6, t + i * beat, 0.5)
                else:
                    for f in ch: put(tone(f * 2, beat * 0.3, 0.002, 0.07, harm=(1, 2, 3)), t + i * beat, 0.1)
                    put(snare() * 0.6, t + i * beat, 0.4)
            for i in range(8):
                put(tone(ch[(i * 3) % len(ch)] * 4, 0.15, 0.001, 0.05, harm=(1, 2)), t + i * beat / 2 + (0.03 if i % 2 else 0), 0.07)
        t += bar; k += 1
    out = out[: int(dur * SR)]
    fade = int(1.5 * SR); out[-fade:] *= np.linspace(1, 0, fade)
    return out

def readwav(p):
    w = wave.open(p); a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
    if w.getnchannels() == 2: a = a.reshape(-1, 2).mean(1)
    assert w.getframerate() == SR, w.getframerate(); return a

def el_lib():
    """Efectos generados con ElevenLabs (engine/el_sfx/*.wav), recortando el silencio inicial."""
    import glob, os
    L = {}
    for f in glob.glob(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'el_sfx', '*.wav')):
        x = readwav(f); thr = 0.02 * (np.max(np.abs(x)) or 1); i = int(np.argmax(np.abs(x) > thr))
        x = x[max(0, i - 80):]; x = x / (np.max(np.abs(x)) or 1) * 0.9
        L[os.path.basename(f)[:-4]] = x
    return L

def el_music(style, dur):
    """Música generada con ElevenLabs (engine/el_music/<estilo>.wav), en bucle si hace falta, con fundido final."""
    import os
    x = readwav(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'el_music', style + '.wav'))
    n = int(dur * SR)
    while len(x) < n: x = np.concatenate([x, x])
    x = x[:n].copy(); fade = int(1.5 * SR); x[-fade:] *= np.linspace(1, 0, fade)
    return x

# ---------------- MEZCLA ----------------
# Reglas fijas (no tocar sin motivo): la voz manda. Todo se calcula RELATIVO a la voz.
VOICE_LUFS = -16.0      # la voz se normaliza aquí antes de mezclar
MUSIC_BED_LU = -20.0    # música sin voz: 20 LU por debajo de la voz
MUSIC_DUCK_DB = -9.0    # mientras hay voz, la música baja 9 dB más
MIN_SNR_DB = 20.0       # QA: voz vs música DURANTE el habla, mínimo exigido
FINAL_LUFS = -14.0

def lufs(x):
    """Sonoridad integrada (LUFS, EBU R128) medida con ffmpeg."""
    import tempfile, os, re
    f = tempfile.NamedTemporaryFile(suffix='.wav', delete=False).name
    o = wave.open(f, 'wb'); o.setnchannels(1); o.setsampwidth(2); o.setframerate(SR); o.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes()); o.close()
    r = subprocess.run(['ffmpeg', '-nostats', '-i', f, '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr
    os.remove(f)
    return float(re.findall(r'I:\s+(-?[\d.]+) LUFS', r)[-1])

def true_peak(f):
    """Pico real (dBTP) del audio de un archivo ya codificado."""
    import re
    r = subprocess.run(['ffmpeg', '-nostats', '-i', f, '-map', '0:a', '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
    return float(re.findall(r'Peak:\s+(-?[\d.]+) dBFS', r)[-1])

def eq_music(x):
    """Hueco de frecuencias para la voz: baja 1–4 kHz y graves sucios en la música."""
    import tempfile, os
    fi = tempfile.NamedTemporaryFile(suffix='.wav', delete=False).name; fo = fi[:-4] + '_eq.wav'
    o = wave.open(fi, 'wb'); o.setnchannels(1); o.setsampwidth(2); o.setframerate(SR); o.writeframes((np.clip(x * 0.5, -1, 1) * 32767).astype(np.int16).tobytes()); o.close()
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', fi, '-af', 'highpass=f=70,equalizer=f=2500:t=o:w=1.6:g=-6,equalizer=f=1000:t=o:w=1:g=-3', fo], check=True)
    y = readwav(fo); os.remove(fi); os.remove(fo); return y[:len(x)]

def speech_mask(v, thr_db=-38.0):
    """Actividad de voz a 100 Hz (1 = hablando)."""
    hop = SR // 100; n = len(v) // hop
    rms = np.sqrt(np.mean(v[: n * hop].reshape(n, hop) ** 2, axis=1) + 1e-12)
    ref = np.percentile(rms[rms > 1e-5], 95) if np.any(rms > 1e-5) else 1
    act = (20 * np.log10(rms / ref) > thr_db).astype(float)
    # rellena micro-huecos entre palabras (<250 ms) para que la música no "bombee"
    k = 25; act = np.convolve(act, np.ones(k) / k, mode='same') > 0.01
    return act.astype(float), hop

def duck_curve(act, hop, n, depth_db):
    """Curva de ducking: ataque 60 ms, relajación 450 ms, a 100 Hz e interpolada."""
    g = np.ones(len(act)); low = 10 ** (depth_db / 20); cur = 1.0
    a_att = 1 - np.exp(-1 / 6); a_rel = 1 - np.exp(-1 / 45)
    for i, s in enumerate(act):
        tgt = low if s else 1.0
        cur += (tgt - cur) * (a_att if tgt < cur else a_rel); g[i] = cur
    return np.interp(np.arange(n), np.arange(len(g)) * hop, g)

def main():
    d, style = sys.argv[1], sys.argv[2]
    voice = readwav(d + '/voice_final.wav')
    dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', d + '/video_noaudio.mp4']))
    n = int(dur * SR); v = np.zeros(n); v[: min(n, len(voice))] = voice[:n]
    v *= 10 ** ((VOICE_LUFS - lufs(v)) / 20)
    act, hop = speech_mask(v)
    # efectos: relativos a la voz (pico de efecto ≈ 10 dB bajo el pico de voz)
    L = el_lib(); fx = np.zeros(n); vpk = np.percentile(np.abs(v), 99.9)
    for c in json.load(open(d + '/sfx.json')):
        x = L.get(c['name'])
        if x is None: print('sfx desconocido', c['name']); continue
        i = int(c['t'] * SR); x = x[: max(0, n - i)]; fx[i:i + len(x)] += x / 0.9 * vpk * 0.32 * c.get('gain', 1)
    m = eq_music(el_music(style, dur))
    bed = MUSIC_BED_LU
    for _ in range(6):  # QA en bucle: si la voz no destaca lo suficiente, baja la música y repite
        mm = m * 10 ** ((VOICE_LUFS + bed - lufs(m)) / 20) * duck_curve(act, hop, n, MUSIC_DUCK_DB)
        sp = np.repeat(act, hop)[:n] > 0; sp = np.pad(sp, (0, n - len(sp)))
        snr = 10 * np.log10(np.mean(v[sp] ** 2) / (np.mean(mm[sp] ** 2) + 1e-12))
        if snr >= MIN_SNR_DB: break
        bed -= 2.0
    out = v + fx + mm
    # volumen final: ganancia exacta hasta FINAL_LUFS + limitador suave de picos (sin bombeo de loudnorm).
    # Se comprueba el pico REAL (dBTP) del final.mp4 ya en AAC: si pasa de -1, se baja el techo y se repite.
    base = out; thr, ceil = 0.6, 0.8   # techo ≈ -2 dBFS para que el AAC no sature
    for _intento in range(8):
        out = base
        for _ in range(3):
            out = out * 10 ** ((FINAL_LUFS - lufs(out)) / 20)
            a = np.abs(out); over = a > thr
            out[over] = np.sign(out[over]) * (thr + (ceil - thr) * np.tanh((a[over] - thr) / (ceil - thr)))
        o = wave.open(d + '/mix.wav', 'wb'); o.setnchannels(1); o.setsampwidth(2); o.setframerate(SR); o.writeframes((np.clip(out, -1, 1) * 32767).astype(np.int16).tobytes()); o.close()
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', d + '/video_noaudio.mp4', '-i', d + '/mix.wav', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '44100', '-shortest', d + '/final.mp4'], check=True)
        tp = true_peak(d + '/final.mp4')
        if tp <= -1.0: break
        thr, ceil = thr * 0.93, ceil * 0.93
    final_lufs = lufs(out)
    rep = {'final_LUFS': round(final_lufs, 1), 'voz_LUFS': VOICE_LUFS, 'musica_bajo_voz_LU': bed, 'ducking_dB': MUSIC_DUCK_DB, 'SNR_voz_musica_dB': round(float(snr), 1)}
    json.dump(rep, open(d + '/mix_report.json', 'w'))
    if abs(final_lufs - FINAL_LUFS) > 1.0: raise SystemExit(f'QA FALLIDA: volumen final {final_lufs:.1f} LUFS (objetivo {FINAL_LUFS})')
    pk_db = 20 * np.log10(np.max(np.abs(out)) + 1e-12)
    rep['pico_dBFS'] = round(float(pk_db), 1); rep['pico_real_final_dBTP'] = round(tp, 1)
    json.dump(rep, open(d + '/mix_report.json', 'w'))
    if pk_db > -1.0: raise SystemExit(f'QA FALLIDA: pico {pk_db:.1f} dBFS')
    if tp > -1.0: raise SystemExit(f'QA FALLIDA: pico real del final.mp4 {tp:.1f} dBTP (máximo -1)')
    if snr < MIN_SNR_DB: raise SystemExit(f'QA FALLIDA: la voz solo está {snr:.1f} dB sobre la música (mínimo {MIN_SNR_DB})')
    print('ok', d + '/final.mp4', rep)

if __name__ == '__main__':
    main()
