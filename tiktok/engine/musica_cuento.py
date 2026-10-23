"""Música de CUENTO (formato leyenda) y efectos de transición, generados por código (sin gastar ElevenLabs).
Escribe engine/el_music/cuento.wav (64 s en bucle) y engine/el_sfx/{harpa,tela,papel_w,riser}.wav.
Estilo: arpa y laúd punteados (Karplus-Strong), bajo pizzicato, colchón de cuerdas, pandero suave y flauta con vibrato;
Re dórico a 84 bpm, con reverberación corta. Uso: python3 -I engine/musica_cuento.py"""
import os, wave
import numpy as np

SR = 44100
rng = np.random.default_rng(7)
D = os.path.dirname(os.path.abspath(__file__))
NOTE = {n: i for i, n in enumerate(['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'])}
hz = lambda n, o: 440 * 2 ** ((NOTE[n] - 9) / 12 + (o - 4))

def ks(f, dur, bright=0.5, decay=0.996):
    """Cuerda pulsada (Karplus-Strong): arpa / laúd / pizzicato."""
    n = int(dur * SR); p = max(2, int(SR / f)); buf = rng.uniform(-1, 1, p)
    buf = np.convolve(buf, np.ones(3) / 3, 'same') * (0.6 + 0.4 * bright); out = np.zeros(n)
    for i in range(n):
        out[i] = buf[i % p]; j = (i + 1) % p
        buf[i % p] = decay * (bright * buf[i % p] + (1 - bright) * buf[j])
    env = np.minimum(1, np.arange(n) / (0.002 * SR)); return out * env

def pad(f, dur):
    t = np.arange(int(dur * SR)) / SR
    x = sum(np.sin(2 * np.pi * f * d * t + ph) for d, ph in [(1, 0), (1.003, 1), (0.997, 2), (2, 0.5)]) / 4
    a = np.minimum(1, t / 0.8) * np.minimum(1, (dur - t) / 0.8); return x * a

def flauta(f, dur):
    t = np.arange(int(dur * SR)) / SR; vib = 1 + 0.006 * np.sin(2 * np.pi * 5.2 * t) * np.minimum(1, t / 0.3)
    ph = 2 * np.pi * np.cumsum(f * vib) / SR; x = np.sin(ph) + 0.25 * np.sin(2 * ph) + 0.08 * np.sin(3 * ph)
    x += 0.03 * rng.standard_normal(len(t)) * np.minimum(1, t / 0.05)
    a = np.minimum(1, t / 0.06) * np.minimum(1, (dur - t) / 0.12); return x * a

def tambor(dur=0.35, f=95):
    t = np.arange(int(dur * SR)) / SR; fr = f * (1 + 0.6 * np.exp(-t * 30))
    x = np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 12) + 0.15 * rng.standard_normal(len(t)) * np.exp(-t * 60); return x

def reverb(x, secs=1.1, mix=0.22):
    n = int(secs * SR); ir = rng.standard_normal(n) * np.exp(-np.arange(n) / SR * 5.5); ir = np.convolve(ir, np.ones(40) / 40, 'same')
    w = np.fft.irfft(np.fft.rfft(x, len(x) + n) * np.fft.rfft(ir, len(x) + n))[: len(x)]; w /= (np.max(np.abs(w)) or 1)
    return x * (1 - mix) + w * mix * np.max(np.abs(x))

def chord(root, kind):
    iv = {'m': [0, 3, 7], 'maj': [0, 4, 7]}[kind]; r = NOTE[root]
    return [440 * 2 ** ((r + i - 9) / 12) for i in iv]

def put(out, x, t, g):
    i = int(t * SR)
    if i >= len(out): return
    x = x[: len(out) - i]; out[i:i + len(x)] += x * g

def cuento(dur=64.0):
    bpm = 84; beat = 60 / bpm; bar = beat * 4
    prog = [('D', 'm'), ('C', 'maj'), ('A#', 'maj'), ('A', 'm')] * 2 + [('D', 'm'), ('F', 'maj'), ('C', 'maj'), ('A', 'm')] * 2
    mel = ['A', 'C', 'D', 'E', 'D', 'C', 'A', 'G', 'F', 'G', 'A', 'C', 'A', 'G', 'E', 'D']
    out = np.zeros(int((dur + 3) * SR)); t = 0.0; k = 0
    while t < dur:
        root, kind = prog[k % len(prog)]; ch = chord(root, kind)
        put(out, pad(ch[0] / 2, bar * 1.05), t, 0.05); put(out, pad(ch[2] / 2, bar * 1.05), t, 0.035)   # colchón de cuerdas
        b = hz(root, 2)
        for i, o in enumerate([0, 2]): put(out, ks(b, beat * 1.6, 0.4, 0.995), t + o * beat, 0.42)           # bajo pizzicato
        arp = [ch[0], ch[1], ch[2], ch[0] * 2, ch[2], ch[1], ch[0] * 2, ch[1] * 2]
        for i, f in enumerate(arp): put(out, ks(f * 2, beat * 1.4, 0.55, 0.997), t + i * beat / 2 + (0.012 if i % 2 else 0), 0.16)  # arpa
        put(out, tambor(), t, 0.22); put(out, tambor(0.2, 140) * 0.6, t + beat * 2.5, 0.16)                  # pandero
        if k % 4 in (1, 3):                                                                                  # flauta cada dos compases
            for j in range(4):
                n = mel[(k * 2 + j) % len(mel)]; put(out, flauta(hz(n, 5), beat * 0.95), t + j * beat, 0.05)
        t += bar; k += 1
    out = reverb(out[: int(dur * SR)])
    # bucle sin costura: fundido cruzado de 1 s entre final y principio
    f = int(1.0 * SR); out[:f] = out[:f] * np.linspace(0, 1, f) + out[-f:] * np.linspace(1, 0, f); out = out[:-f]
    return out / np.max(np.abs(out)) * 0.8

def harpa():  # glissando de arpa hacia arriba (para transiciones)
    sc = ['D', 'E', 'F', 'G', 'A', 'C']; out = np.zeros(int(1.6 * SR))
    for i in range(14):
        n = sc[i % 6]; o = 4 + (i // 6); put(out, ks(hz(n, o), 1.3, 0.6, 0.997), i * 0.035, 0.5)
    return reverb(out, 1.0, 0.3)

def ruido_banda(dur, lo, hi):
    n = int(dur * SR); x = rng.standard_normal(n); X = np.fft.rfft(x); f = np.fft.rfftfreq(n, 1 / SR); X[(f < lo) | (f > hi)] = 0; return np.fft.irfft(X, n)

def tela():  # lona / cortina que barre
    t = np.arange(int(0.7 * SR)) / SR; return ruido_banda(0.7, 300, 3500) * np.sin(np.pi * t / 0.7) ** 2 * (1 + 0.3 * np.sin(2 * np.pi * 9 * t))

def papel_w():  # hoja de papel que entra deslizando
    t = np.arange(int(0.5 * SR)) / SR; return ruido_banda(0.5, 1500, 9000) * np.sin(np.pi * t / 0.5) ** 1.5

def riser():  # subida de tensión (1,2 s)
    t = np.arange(int(1.2 * SR)) / SR; x = ruido_banda(1.2, 400, 6000) * (t / 1.2) ** 2
    return x + 0.4 * np.sin(2 * np.pi * np.cumsum(200 + 600 * (t / 1.2) ** 2) / SR) * (t / 1.2) ** 2

def wav(p, x):
    x = np.clip(x / (np.max(np.abs(x)) or 1) * 0.9, -1, 1); w = wave.open(p, 'w'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((x * 32767).astype(np.int16).tobytes()); w.close()

if __name__ == '__main__':
    wav(os.path.join(D, 'el_music', 'cuento.wav'), cuento())
    for n, fn in [('harpa', harpa), ('tela', tela), ('papel_w', papel_w), ('riser', riser)]: wav(os.path.join(D, 'el_sfx', n + '.wav'), fn())
    print('ok: el_music/cuento.wav + el_sfx/{harpa,tela,papel_w,riser}.wav')
