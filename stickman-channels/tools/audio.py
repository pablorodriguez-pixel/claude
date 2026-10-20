# Voz (edge-tts o ElevenLabs) + timeline palabra a palabra + SFX/música sintetizados + mezcla final.
# Uso: python3 tools/audio.py specs/regla0-ep1.json [--eleven]
import sys, os, json, asyncio, subprocess, hashlib, re, base64, urllib.request
import numpy as np
from scipy.signal import butter, sosfilt

SR = 48000
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BUILD = os.path.join(ROOT, 'build')
os.makedirs(BUILD, exist_ok=True)
RNG = np.random.default_rng(7)

# ---------- TTS ----------
def tts_edge(text, voice, rate, pitch, out):
    import certifi
    if os.path.exists('/root/.ccr/ca-bundle.crt'):
        certifi.where = lambda: '/root/.ccr/ca-bundle.crt'
    import edge_tts
    async def run():
        c = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch, boundary='WordBoundary')
        words, audio = [], bytearray()
        async for ch in c.stream():
            if ch['type'] == 'audio': audio += ch['data']
            elif ch['type'] == 'WordBoundary':
                words.append({'w': ch['text'], 's': ch['offset'] / 1e7, 'e': (ch['offset'] + ch['duration']) / 1e7})
        open(out, 'wb').write(audio)
        return words
    return asyncio.run(run())

def tts_eleven(text, voice_id, out):
    k = os.environ['API_KEY_ELEVENLABS']
    body = {"text": text, "model_id": "eleven_multilingual_v2", "language_code": "es",
            "voice_settings": {"stability": 0.4, "similarity_boost": 0.8, "style": 0.4}}
    r = urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}/with-timestamps?output_format=mp3_44100_128",
                               data=json.dumps(body).encode(), headers={'xi-api-key': k, 'Content-Type': 'application/json'})
    d = json.loads(urllib.request.urlopen(r, timeout=300).read())
    open(out, 'wb').write(base64.b64decode(d['audio_base64']))
    al = d['alignment']; words, cur = [], None
    for c, s, e in zip(al['characters'], al['character_start_times_seconds'], al['character_end_times_seconds']):
        if c.isspace():
            if cur: words.append(cur); cur = None
        elif cur is None: cur = {'w': c, 's': s, 'e': e}
        else: cur['w'] += c; cur['e'] = e
    if cur: words.append(cur)
    return words

def decode(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).copy()

PUNCT = '.,:;?!…»"'
def attach_punct(text, words):
    """Las palabras de la voz vienen sin puntuación: la recuperamos del texto original."""
    out, cur = [], 0
    for w in words:
        i = text.find(w['w'], cur)
        if i < 0: out.append(dict(w)); continue
        j = i + len(w['w']); pre = ''
        k = i - 1
        while k >= 0 and text[k] in '¿¡«': pre = text[k] + pre; k -= 1
        while j < len(text) and text[j] in PUNCT: j += 1
        out.append({**w, 'w': pre + text[i:j]}); cur = j
    return out

# ---------- síntesis ----------
def t_(d): return np.arange(int(d * SR)) / SR
def env(d, a=0.005, r=0.3):
    t = t_(d); return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / r)
def noise(d): return RNG.standard_normal(int(d * SR)).astype(np.float32)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def bp(x, a, b, o=2): return sosfilt(butter(o, [a, b], 'band', fs=SR, output='sos'), x)
def sine(f, d, ph=0): t = t_(d); return np.sin(2 * np.pi * f * t + ph)
def sweep(f0, f1, d):
    t = t_(d); f = f0 * (f1 / f0) ** (t / d); return np.sin(2 * np.pi * np.cumsum(f) / SR)

def sfx(name):
    if name == 'hit':
        d = 1.6; return 0.9 * sweep(90, 35, d) * env(d, .002, .45) + 0.5 * lp(noise(d), 900) * env(d, .001, .12)
    if name == 'boom':
        d = 3.5; return 1.2 * lp(noise(d), 160, 4) * env(d, .05, 1.2) + 0.6 * sweep(60, 28, d) * env(d, .01, 1.0)
    if name == 'thud':
        d = .8; return 0.8 * sweep(70, 40, d) * env(d, .002, .18)
    if name == 'whoosh':
        d = .8; t = t_(d); e = np.sin(np.pi * t / d) ** 2; return 0.6 * bp(noise(d), 300, 3000) * e
    if name == 'riser':
        d = 1.3; t = t_(d); e = (t / d) ** 2
        return 0.35 * bp(noise(d), 500, 6000) * e + 0.25 * sweep(200, 900, d) * e
    if name == 'ding':
        d = 1.4; return 0.25 * (sine(880, d) + 0.6 * sine(1320, d) + 0.3 * sine(1760, d)) * env(d, .002, .35)
    if name == 'pop':
        d = .25; return 0.4 * sweep(500, 1300, d) * env(d, .001, .05)
    if name == 'beep':
        d = 1.6; t = t_(d); g = ((t % .4) < .2).astype(float); return 0.18 * np.sign(sine(990, d)) * g
    if name == 'buzz':
        d = 1.4; t = t_(d); g = ((t % .5) < .3).astype(float); return 0.5 * lp(np.sign(sine(160, d)), 400) * g
    if name == 'flicker':
        d = 1.2; t = t_(d); g = (RNG.random(len(t)) < .002).astype(float); g = lp(g, 3000) * 40
        return 0.25 * (sine(100, d) * 0.5 + bp(noise(d), 2000, 6000)) * np.clip(np.convolve(g, np.ones(800) / 800, 'same') * 8, 0, 1)
    if name == 'whisper':
        d = 1.6; t = t_(d); e = np.sin(np.pi * t / d) * (0.6 + 0.4 * np.sin(2 * np.pi * 7 * t))
        return 0.35 * bp(noise(d), 1500, 7000) * e
    if name == 'train':
        d = 4.0; t = t_(d); e = np.minimum(1, t / 0.6) * np.exp(-np.maximum(0, t - 1.2) / 1.0)
        return 0.7 * lp(noise(d), 300, 3) * e + 0.15 * bp(noise(d), 2500, 4000) * e * (np.sin(2 * np.pi * 3 * t) > .6)
    if name == 'doors':
        d = 1.0; return 0.4 * bp(noise(d), 400, 2500) * env(d, .05, .3) + 0.3 * sweep(300, 120, d) * env(d, .01, .2)
    if name == 'brake':
        d = 2.5; t = t_(d); e = np.sin(np.pi * t / d); return 0.12 * sweep(2800, 1900, d) * e + 0.3 * lp(noise(d), 400) * e
    if name == 'steps':
        out = np.zeros(int(3.2 * SR))
        for i in range(6):
            s = int((i * .55) * SR); st = 0.6 * sweep(110, 50, .25) * env(.25, .001, .06) * (0.5 + i * .1)
            out[s:s + len(st)] += st
        return out
    if name == 'heart':
        out = np.zeros(int(3.2 * SR))
        for i in range(4):
            for k, dl in ((0, 1), (.18, .7)):
                s = int((i * .8 + k) * SR); st = dl * 0.9 * sweep(60, 40, .2) * env(.2, .002, .07); out[s:s + len(st)] += st
        return out
    if name == 'drip':
        out = np.zeros(int(2.5 * SR))
        for i in range(4):
            s = int(i * .6 * SR); st = 0.3 * sweep(1200, 2200, .08) * env(.08, .001, .02); out[s:s + len(st)] += st
        return out
    if name == 'tick':
        out = np.zeros(int(2.4 * SR))
        for i in range(12):
            s = int(i * .2 * SR); st = 0.25 * hp(noise(.02), 3000) * env(.02, .0005, .004); out[s:s + len(st)] += st
        return out
    if name == 'type':
        out = np.zeros(int(2.0 * SR))
        for i in range(16):
            s = int((i * .11 + RNG.random() * .04) * SR); st = 0.2 * bp(noise(.03), 1500, 6000) * env(.03, .0005, .006)
            out[s:s + len(st)] += st
        return out
    if name == 'paper':
        d = .9; return 0.25 * bp(noise(d), 1500, 7000) * env(d, .01, .25) * (0.5 + 0.5 * (RNG.random(int(d * SR)) > .5))
    if name == 'crunch':
        out = np.zeros(int(1.6 * SR))
        for i in range(5):
            s = int(i * .28 * SR); st = 0.35 * bp(noise(.12), 800, 5000) * env(.12, .002, .04); out[s:s + len(st)] += st
        return out
    if name == 'crack':
        d = 1.5; return 0.6 * hp(noise(d), 800) * env(d, .001, .08) + 0.7 * lp(noise(d), 200) * env(d, .02, .5)
    if name == 'bell':
        d = 3.0; return 0.25 * (sine(392, d) + .5 * sine(784.7, d) + .3 * sine(1174, d)) * env(d, .002, 1.0)
    if name == 'wave':
        d = 4.0; t = t_(d); e = np.sin(np.pi * np.minimum(1, t / 3)) ** 1.5
        return 0.9 * lp(noise(d), 700, 3) * e
    raise ValueError(name)

def ambience(name, d):
    n = noise(d)
    if name in ('rumble',): t = t_(d); return 0.22 * lp(n, 140, 3) * (0.8 + 0.2 * np.sin(2 * np.pi * 1.7 * t))
    if name == 'tunnel': return 0.08 * lp(n, 250, 2)
    if name == 'office': return 0.035 * bp(n, 200, 1200)
    if name == 'wind': t = t_(d); return 0.07 * bp(n, 200, 900) * (0.6 + 0.4 * np.sin(2 * np.pi * .23 * t))
    if name == 'hail': return 0.06 * hp(n, 3000) * (RNG.random(len(n)) > .985) * 6 + 0.05 * lp(n, 300)
    if name == 'sea': t = t_(d); return 0.12 * lp(n, 500, 2) * (0.5 + 0.5 * np.sin(2 * np.pi * .15 * t) ** 2)
    if name == 'fire': return 0.06 * lp(n, 400) + 0.05 * hp(n, 2000) * (RNG.random(len(n)) > .993) * 8
    if name == 'quake': t = t_(d); return 0.35 * lp(n, 90, 4) * (0.7 + 0.3 * np.sin(2 * np.pi * 3 * t))
    if name == 'crowd': return 0.05 * bp(n, 300, 2500)
    if name == 'choir': t = t_(d); return 0.05 * (sine(220, d) + sine(277.2, d) + sine(329.6, d)) * (0.7 + .3 * np.sin(2 * np.pi * .3 * t))
    return np.zeros(len(n))

def music(ch, d):
    t = t_(d)
    if ch == 'regla0':
        lfo = 0.6 + 0.4 * np.sin(2 * np.pi * 0.07 * t)
        m = (sine(55, d) + 0.7 * sine(55.6, d) + 0.35 * sine(82.4, d) + 0.15 * sine(116.5, d)) * lfo
        return 0.10 * m + 0.03 * lp(noise(d), 500)
    if ch == 'historia':
        lfo = 0.6 + 0.4 * np.sin(2 * np.pi * 0.05 * t)
        m = (sine(73.4, d) + 0.6 * sine(110, d) + 0.25 * sine(146.8, d * 1) * (0.5 + 0.5 * np.sin(2 * np.pi * .11 * t))) * lfo
        out = 0.08 * m
        for i in range(int(d)):  # reloj de bolsillo
            s = int(i * SR); st = 0.06 * hp(noise(.015), 4000) * env(.015, .0003, .003); out[s:s + len(st)] += st
        return out
    if ch == 'lunes':  # loop marimba pentatónico
        bpm = 112; beat = 60 / bpm; out = np.zeros(len(t))
        seq = [523.3, 659.3, 784, 659.3, 587.3, 784, 880, 784, 523.3, 587.3, 659.3, 784, 880, 784, 659.3, 587.3]
        bass = [130.8, 130.8, 174.6, 196, ]
        i = 0; k = 0.0
        while k < d:
            f = seq[i % len(seq)]; nd = 0.5
            n_ = 0.10 * (sine(f, nd) + 0.25 * sine(f * 4, nd)) * env(nd, .002, .12)
            s = int(k * SR); out[s:s + len(n_)] += n_[:len(out) - s]
            if i % 4 == 0:
                b = 0.16 * sine(bass[(i // 4) % 4], 1.0) * env(1.0, .005, .35); out[s:s + len(b)] += b[:len(out) - s]
            if i % 2 == 1:
                h = 0.04 * hp(noise(.04), 6000) * env(.04, .0005, .01); out[s:s + len(h)] += h[:len(out) - s]
            i += 1; k += beat / 2
        return out
    return np.zeros(len(t))

# ---------- build ----------
def build(spec_path, eleven=False):
    spec = json.load(open(spec_path))
    if 'branches' in spec:  # episodio con dos aperturas: una por cada resultado del voto
        for k, pre in spec['branches'].items():
            build_spec({**{x: y for x, y in spec.items() if x != 'branches'}, 'id': spec['id'] + k, 'beats': pre + spec['beats']}, eleven)
    else: build_spec(spec, eleven)

def build_spec(spec, eleven=False):
    vid = spec['id']
    d = os.path.join(BUILD, vid); os.makedirs(d, exist_ok=True)
    beats, cursor, voice_tracks = [], 0.35, []
    for i, b in enumerate(spec['beats']):
        key = hashlib.md5((b['say'] + spec['voice'] + spec['rate'] + spec['pitch'] + str(eleven)).encode()).hexdigest()[:10]
        mp3 = os.path.join(d, f'v{i:02d}_{key}.mp3'); wj = mp3 + '.json'
        if not os.path.exists(wj):
            words = tts_eleven(b['say'], spec['eleven'], mp3) if eleven else tts_edge(b['say'], spec['voice'], spec['rate'], spec['pitch'], mp3)
            json.dump(words, open(wj, 'w'))
        words = attach_punct(b['say'], json.load(open(wj)))
        a = decode(mp3)
        # recorta silencio final
        nz = np.where(np.abs(a) > 0.01)[0]; a = a[:nz[-1] + int(0.05 * SR)] if len(nz) else a
        dur = len(a) / SR
        length = dur + b.get('pause', 0.28) + b.get('hold', 0)
        beats.append({**b, 'start': cursor, 'end': cursor + length, 'vdur': dur,
                      'words': [{'w': w['w'], 's': cursor + w['s'], 'e': cursor + w['e']} for w in words]})
        voice_tracks.append((cursor, a)); cursor += length
    total = cursor + 0.2
    N = int(total * SR) + SR
    voice = np.zeros(N); fx = np.zeros(N); amb = np.zeros(N)
    for s, a in voice_tracks: voice[int(s * SR):int(s * SR) + len(a)] += a
    for b in beats:
        for name, at in b.get('sfx', []):
            x = sfx(name); s = int((b['start'] + at) * SR); x = x[:N - s]; fx[s:s + len(x)] += x
        ov = b.get('ov', {})
        if ov.get('t') == 'rule':
            x = sfx('hit') * 0.55; s = int(b['start'] * SR); fx[s:s + len(x)] += x[:N - s]
        if b.get('amb'):
            L = b['end'] - b['start'] + 0.4; x = ambience(b['amb'], L)
            fade = np.minimum(1, np.minimum(t_(L) / .25, (L - t_(L)) / .25)); s = int(b['start'] * SR)
            amb[s:s + len(x)] += (x * fade)[:N - s]
    mus = np.pad(music(spec['ch'], N / SR), (0, N))[:N]
    # ducking suave bajo la voz
    envv = np.convolve(np.abs(voice), np.ones(4800) / 4800, 'same')[:N]; duck = 1 - 0.45 * np.clip(envv * 12, 0, 1)
    mix = voice * 1.0 + fx * 0.8 + amb * 0.9 + mus * duck
    mix = mix[:int(total * SR)]
    pk = np.max(np.abs(mix)); mix = mix / pk * 0.89 if pk > 0.89 else mix
    pcm = (np.clip(mix, -1, 1) * 32767).astype('<i2')
    wav = os.path.join(d, 'mix.wav')
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-', wav], input=pcm.tobytes(), check=True)
    tl = {k: v for k, v in spec.items() if k != 'beats'}; tl['beats'] = beats; tl['duration'] = total
    json.dump(tl, open(os.path.join(d, 'timeline.json'), 'w'), ensure_ascii=False)
    print(vid, f'{total:.1f}s', len(beats), 'beats')

if __name__ == '__main__':
    eleven = '--eleven' in sys.argv
    for p in [a for a in sys.argv[1:] if not a.startswith('--')]: build(p, eleven)
