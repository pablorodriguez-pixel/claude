"""Música de fondo + efectos de sonido sintetizados, mezclados con la voz."""
import json, sys, os, subprocess
import numpy as np
import wave

B = sys.argv[1]
SR = 44100
ev = json.load(open(os.path.join(B, "events.json")))
total = json.loads(open(os.path.join(B, "timeline.js")).read()[len("const TL = "):-1])["total"]
N = int(total * SR)
rng = np.random.default_rng(7)
t_all = np.arange(N) / SR


def env(n, a=0.005, r=0.2):
    e = np.ones(n)
    na = max(1, int(a * SR)); e[:na] = np.linspace(0, 1, na)
    nr = max(1, min(n, int(r * SR))); e[-nr:] *= np.linspace(1, 0, nr)
    return e


def tone(f, d, vol=1.0, a=0.005, r=None, harm=(1,)):
    n = int(d * SR); t = np.arange(n) / SR
    s = sum(np.sin(2 * np.pi * f * (k + 1) * t) / (k + 1) for k in harm)
    return s * env(n, a, r if r is not None else d * 0.8) * vol


def place(buf, sig, at):
    i = int(at * SR)
    if i < 0 or i >= len(buf): return
    j = min(len(buf), i + len(sig)); buf[i:j] += sig[: j - i]


# ── música: pad lento Am–F–C–G + pulso suave ──
music = np.zeros(N)
chords = [(220.0, 261.63, 329.63), (174.61, 220.0, 261.63), (261.63, 329.63, 392.0), (196.0, 246.94, 293.66)]
bar = 4.0
for b in range(int(total / bar) + 1):
    for f in chords[b % 4]:
        place(music, tone(f, bar + 0.8, 0.05, a=1.2, r=1.6, harm=(1, 2)), b * bar)
    place(music, tone(chords[b % 4][0] / 2, bar + 0.4, 0.07, a=0.8, r=1.0), b * bar)
beat = 0.5
for k in range(int(total / beat)):
    amp = 0.035 if k % 2 == 0 else 0.018
    n = int(0.05 * SR); place(music, rng.normal(0, 1, n) * np.linspace(1, 0, n) ** 3 * amp, k * beat + 0.25)
    if k % 4 == 0:
        place(music, tone(60, 0.25, 0.10, a=0.002, r=0.22, harm=(1,)), k * beat)
music *= np.clip(np.minimum(t_all / 1.0, (total - t_all) / 1.5), 0, 1)

# ── efectos ──
sfx = np.zeros(N)
for e in ev:
    t0, ty = e["t"], e["type"]
    if ty == "whoosh":
        n = int(0.28 * SR); x = rng.normal(0, 1, n)
        k = np.cumsum(x); k -= np.convolve(k, np.ones(400) / 400, "same")
        sw = k / (np.abs(k).max() + 1e-9) * np.hanning(n)
        place(sfx, sw * 0.28, t0 - 0.12)
    elif ty == "pop":
        n = int(0.12 * SR); t = np.arange(n) / SR
        place(sfx, np.sin(2 * np.pi * (520 + 700 * np.exp(-t * 40)) * t) * np.exp(-t * 30) * 0.35, t0)
    elif ty == "tick":
        n = int(0.03 * SR); place(sfx, rng.normal(0, 1, n) * np.linspace(1, 0, n) ** 2 * 0.12, t0)
    elif ty == "thud":
        place(sfx, tone(55, 0.7, 0.9, a=0.002, r=0.65), t0)
        place(sfx, tone(110, 0.4, 0.4, a=0.002, r=0.35), t0)
    elif ty == "swipe":
        n = int(0.22 * SR); t = np.arange(n) / SR
        place(sfx, np.sin(2 * np.pi * (1400 - 1000 * t / 0.22) * t) * np.hanning(n) * 0.18, t0 - 0.2)
    elif ty == "ding":
        for f, v in ((880, .30), (1318.5, .22), (1760, .12)):
            place(sfx, tone(f, 1.1, v, a=0.003, r=1.0), t0)
    elif ty == "buzz":
        place(sfx, tone(140, 0.3, 0.30, a=0.003, r=0.25, harm=(1, 2, 3)), t0)
    elif ty in ("hit", "wall"):
        n = int(0.05 * SR); t = np.arange(n) / SR; f = 1100 if ty == "hit" else 520
        place(sfx, (np.sin(2 * np.pi * f * t) * 0.7 + rng.normal(0, .3, n)) * np.exp(-t * 70) * 0.5, t0)
    elif ty == "roll":
        n = int(0.012 * SR); place(sfx, rng.normal(0, 1, n) * np.linspace(1, 0, n) ** 2 * 0.07, t0)
    elif ty == "click":
        n = int(0.04 * SR); place(sfx, rng.normal(0, 1, n) * np.linspace(1, 0, n) ** 2 * 0.5, t0)
    if ty == "pop" and "pitch" in e:  # escala ascendente en el cierre
        place(sfx, tone(440 * 2 ** (e["pitch"] / 12 * 1.5), 0.15, 0.2, a=0.003, r=0.14), t0)

# ── mezcla: voz delante, música baja con ducking ──
with wave.open(os.path.join(B, "voice.wav")) as w:
    assert w.getnchannels() == 1 and w.getsampwidth() == 2 and w.getframerate() == SR
    voice = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768.0
voice = np.pad(voice, (0, max(0, N - len(voice))))[:N]
vl = np.abs(voice)
win = int(0.12 * SR)
vlev = np.convolve(vl, np.ones(win) / win, "same")
duck = 1 - 0.55 * np.clip(vlev / 0.05, 0, 1)
mix = voice * 1.0 + music * 0.45 * duck + sfx * 0.6
mix = np.tanh(mix * 1.1) * 0.92
with wave.open(os.path.join(B, "mix.wav"), "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype(np.int16).tobytes())
print("audio ok", round(total, 2), "s")
