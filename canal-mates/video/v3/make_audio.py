"""Voz procesada (cuerpo + presencia + compresión) y efectos sincronizados. Sin música de fondo (como los reels de referencia)."""
import json, sys, os, subprocess, wave
import numpy as np

B = sys.argv[1]
SR = 44100
ev = json.load(open(os.path.join(B, "events.json")))
total = json.loads(open(os.path.join(B, "timeline.js")).read()[len("const TL = "):-1])["total"]
N = int(total * SR)
rng = np.random.default_rng(7)

# ── voz: graves con cuerpo, presencia en 3 kHz, compresión y volumen estándar ──
fx = os.path.join(B, "voice_fx.wav")
subprocess.check_call(["ffmpeg", "-y", "-v", "error", "-i", os.path.join(B, "voice.wav"), "-af",
    "highpass=f=70,equalizer=f=130:t=q:w=1.0:g=3,equalizer=f=3200:t=q:w=1.0:g=2.5,equalizer=f=7500:t=q:w=1.2:g=1.5,"
    "acompressor=threshold=-22dB:ratio=3.2:attack=6:release=90:makeup=4,alimiter=limit=0.9,loudnorm=I=-15:TP=-1.5:LRA=6,aresample=44100", "-ac", "1", fx])


def env(n, a=0.005, r=0.2):
    e = np.ones(n); na = max(1, int(a * SR)); e[:na] = np.linspace(0, 1, na); nr = max(1, min(n, int(r * SR))); e[-nr:] *= np.linspace(1, 0, nr); return e


def tone(f, d, vol=1.0, a=0.005, r=None, harm=(1,)):
    n = int(d * SR); t = np.arange(n) / SR
    return sum(np.sin(2 * np.pi * f * (k + 1) * t) / (k + 1) for k in harm) * env(n, a, r if r is not None else d * 0.8) * vol


def place(buf, sig, at):
    i = int(at * SR)
    if i >= len(buf) or i + len(sig) <= 0: return
    if i < 0: sig = sig[-i:]; i = 0
    j = min(len(buf), i + len(sig)); buf[i:j] += sig[: j - i]


sfx = np.zeros(N)
for e in ev:
    t0, ty = e["t"], e["type"]
    if ty == "whoosh":
        n = int(0.26 * SR); k = np.cumsum(rng.normal(0, 1, n)); k -= np.convolve(k, np.ones(400) / 400, "same"); place(sfx, k / (np.abs(k).max() + 1e-9) * np.hanning(n) * 0.16, t0 - 0.1)
    elif ty == "zoom":                       # riser: chirp ascendente + ruido + tics del contador cada vez más rápidos
        d = 2.35; n = int(d * SR); t = np.arange(n) / SR; u = t / d
        f = 140 * (28 ** u); ph = 2 * np.pi * np.cumsum(f) / SR
        riser = (np.sin(ph) * .5 + np.sin(ph * 2) * .15) * (u ** 1.6) * (1 - np.clip((u - .94) / .06, 0, 1))
        noise = rng.normal(0, 1, n); noise = noise - np.convolve(noise, np.ones(30) / 30, "same"); riser += noise * (u ** 2.2) * .12
        place(sfx, riser * 0.34, t0)
        tt = 0.0; step = 0.16
        while tt < d - .15:
            m = int(0.02 * SR); place(sfx, rng.normal(0, 1, m) * np.linspace(1, 0, m) ** 2 * 0.2, t0 + tt); tt += step; step = max(.03, step * .9)
    elif ty == "boom":
        n = int(1.1 * SR); t = np.arange(n) / SR; f = 38 + 60 * np.exp(-t * 9)
        place(sfx, np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 3.2) * 0.8, t0)
        m = int(0.12 * SR); place(sfx, rng.normal(0, 1, m) * np.linspace(1, 0, m) ** 3 * 0.3, t0)
    elif ty == "pop":
        n = int(0.12 * SR); t = np.arange(n) / SR; place(sfx, np.sin(2 * np.pi * (520 + 700 * np.exp(-t * 40)) * t) * np.exp(-t * 30) * 0.28, t0)
    elif ty == "tick":
        n = int(0.03 * SR); place(sfx, rng.normal(0, 1, n) * np.linspace(1, 0, n) ** 2 * 0.1, t0)
    elif ty == "swipe":
        n = int(0.22 * SR); t = np.arange(n) / SR; place(sfx, np.sin(2 * np.pi * (1400 - 1000 * t / 0.22) * t) * np.hanning(n) * 0.14, t0 - 0.2)
    elif ty == "ding":
        for f, v in ((880, .24), (1318.5, .17), (1760, .09)): place(sfx, tone(f, 1.0, v, a=0.003, r=0.9), t0)
    elif ty == "buzz":
        place(sfx, tone(140, 0.3, 0.26, a=0.003, r=0.25, harm=(1, 2, 3)), t0)
    elif ty in ("hit", "wall"):
        n = int(0.05 * SR); t = np.arange(n) / SR; f = 1100 if ty == "hit" else 520
        place(sfx, (np.sin(2 * np.pi * f * t) * 0.7 + rng.normal(0, .3, n)) * np.exp(-t * 70) * 0.42, t0)
    elif ty == "roll":
        n = int(0.012 * SR); place(sfx, rng.normal(0, 1, n) * np.linspace(1, 0, n) ** 2 * 0.05, t0)
    elif ty == "click":
        n = int(0.04 * SR); place(sfx, rng.normal(0, 1, n) * np.linspace(1, 0, n) ** 2 * 0.4, t0)

with wave.open(fx) as w:
    voice = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768.0
voice = np.pad(voice, (0, max(0, N - len(voice))))[:N]
vlev = np.convolve(np.abs(voice), np.ones(int(.1 * SR)) / int(.1 * SR), "same")
duck = 1 - 0.6 * np.clip(vlev / 0.06, 0, 1)            # los efectos bajan cuando habla la voz
mix = voice + sfx * (0.55 + 0.45 * duck)
mix = np.tanh(mix * 1.05) * 0.93
with wave.open(os.path.join(B, "mix.wav"), "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
print("audio ok", round(total, 2), "s")
