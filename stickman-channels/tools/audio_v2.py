# v2: varias voces por episodio (narrador, megafonía, susurro), una sola petición de TTS por voz,
# efectos de voz (sala, radio, susurro), reverb, SFX más ricos y colchón ambiental continuo.
# Uso: python3 tools/audio_v2.py specs/v2/regla0-v2-n1.json [--edge]
import sys, os, json, hashlib, re, base64, urllib.request, subprocess
import numpy as np
from scipy.signal import fftconvolve
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import audio as A
from audio import SR, t_, env, noise, lp, hp, bp, sine, sweep

TAG = re.compile(r'\[[^\]]*\]\s*')

def eleven_group(text, voice_id, out):
    k = os.environ['API_KEY_ELEVENLABS']
    body = {"text": text, "model_id": "eleven_v3", "language_code": "es",
            "voice_settings": {"stability": 0.0, "similarity_boost": 0.8, "style": 0.6, "use_speaker_boost": True}}
    r = urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}/with-timestamps?output_format=mp3_44100_128",
                               data=json.dumps(body).encode(), headers={'xi-api-key': k, 'Content-Type': 'application/json'})
    d = json.loads(urllib.request.urlopen(r, timeout=600).read())
    open(out, 'wb').write(base64.b64decode(d['audio_base64']))
    al = d['alignment']
    return list(zip(al['characters'], al['character_start_times_seconds'], al['character_end_times_seconds']))

def reverb(x, secs=1.6, wet=.25, damp=3000):
    n = int(secs * SR); ir = A.RNG.standard_normal(n) * np.exp(-np.arange(n) / SR * 6.9 / secs); ir = lp(ir, damp)
    ir /= np.sqrt((ir ** 2).sum()); y = fftconvolve(x, ir)[:len(x) + n]
    out = np.zeros(len(y)); out[:len(x)] += x * (1 - wet * .5); out += y * wet
    return out

def voice_fx(a, fx):
    if fx == 'room': return reverb(hp(a, 80), .5, .07)
    if fx == 'radio':
        b = bp(a, 380, 3600, 3); b = np.tanh(b * 2.2) / 1.6
        return reverb(b, 2.4, .35, 4500)
    if fx == 'whisper':
        b = hp(a, 180) * 1.6; d = np.zeros(len(b) + int(.037 * SR)); d[:len(b)] += b; d[int(.037 * SR):] += b * .35
        return reverb(d, 2.8, .45, 5000)
    if fx == 'car':  # altavoz del coche: banda estrecha, algo de saturación, cabina pequeña
        b = bp(a, 320, 5200, 2); b = np.tanh(b * 1.6) / 1.3
        return reverb(b, .35, .12, 6000)
    if fx == 'near': return reverb(hp(a, 90), .6, .1)
    return a

def sfx2(name):
    if name == 'train':
        d = 5.0; t = t_(d); swell = np.minimum(1, t / 1.4) * np.exp(-np.maximum(0, t - 2.2) / 1.1)
        rum = 0.9 * lp(noise(d), 110, 4) * swell
        clk = np.zeros(len(t)); k = 0.0; per = .16
        while k < 3.0:
            s = int(k * SR); c = 0.5 * sweep(140, 60, .07) * env(.07, .001, .02); clk[s:s + len(c)] += c[:len(clk) - s]; k += per; per *= 1.09
        scr = bp(noise(d), 2400, 2900, 4) * np.clip((t - 1.5) / .3, 0, 1) * np.exp(-np.maximum(0, t - 2.3) / .4) * (0.6 + 0.4 * np.sin(2 * np.pi * 7 * t)) * 1.4
        hiss = hp(noise(d), 3000) * np.clip((t - 3.0) / .05, 0, 1) * np.exp(-np.maximum(0, t - 3.0) / .5) * .3
        return rum + clk * swell + scr + hiss
    if name == 'doors':
        d = 1.4; t = t_(d); hiss = hp(noise(d), 2500) * np.exp(-t / .35) * .35
        thunk = 0.7 * sweep(120, 50, .25) * env(.25, .002, .06); out = hiss.copy(); s = int(.55 * SR); out[s:s + len(thunk)] += thunk; return out
    if name == 'chime':
        d = 2.6; o = np.zeros(int(d * SR))
        for f, at in ((659.3, 0), (523.3, .55)):
            n_ = (sine(f, 1.8) + .5 * sine(f * 2.76, 1.8) + .25 * sine(f * 5.4, 1.8)) * env(1.8, .003, .5) * .22; s = int(at * SR); o[s:s + len(n_)] += n_
        return o
    if name == 'creak':
        d = 1.8; t = t_(d); f = 70 + 60 * np.sin(2 * np.pi * .7 * t) ** 2 + 30 * noise(d) * .02
        ph = np.cumsum(f) / SR; saw = 2 * (ph % 1) - 1; e = np.sin(np.pi * t / d)
        return 0.35 * bp(saw, 300, 2500) * e
    if name == 'glitch':
        d = .9; o = np.zeros(int(d * SR))
        for i in range(9):
            s = int(A.RNG.random() * (d - .08) * SR); L = int((.02 + A.RNG.random() * .06) * SR)
            seg = np.sign(np.sin(2 * np.pi * (200 + A.RNG.random() * 1800) * np.arange(L) / SR)) * .25 + A.RNG.standard_normal(L) * .2; o[s:s + L] += seg
        return o
    if name == 'gps':  # carillón de navegación
        d = 1.0; o = np.zeros(int(d * SR))
        for f, at in ((880, 0), (1318.5, .12)):
            n_ = (sine(f, .6) + .3 * sine(f * 2, .6)) * env(.6, .002, .12) * .18; s = int(at * SR); o[s:s + len(n_)] += n_
        return o
    if name == 'breath':
        d = 4.2; t = t_(d); e = np.maximum(0, np.sin(2 * np.pi * t / 2.1)) ** 2
        return .32 * bp(noise(d), 300, 2200) * e
    if name == 'ecg':
        d = 3.2; o = np.zeros(int(d * SR))
        for i in range(4):
            n_ = sine(1000, .11) * env(.11, .002, .05) * .3; s = int(i * .78 * SR); o[s:s + len(n_)] += n_
        return o
    if name == 'flat':
        d = 2.6; t = t_(d); return sine(1000, d) * .16 * np.minimum(1, t / .02) * np.minimum(1, (d - t) / .6)
    return A.sfx(name)

def amb2(name, d):
    t = t_(d); n = noise(d)
    if name == 'car':  # motor + rodadura + lluvia + limpiaparabrisas
        eng = (sine(46, d) + .5 * sine(92, d) + .25 * sine(138, d)) * (.8 + .2 * np.sin(2 * np.pi * .3 * t)) * .05
        road = lp(n, 260, 3) * .16 + bp(n, 600, 1800) * .03
        rain = hp(n, 3500) * (A.RNG.random(len(n)) > .992) * .5 + hp(n, 5000) * .015
        wip = np.zeros(len(t))
        for k in np.arange(1.2, d, 2.6):
            s = int(k * SR); w_ = bp(noise(.5), 500, 3000) * np.sin(np.pi * np.linspace(0, 1, int(.5 * SR))) * .06; wip[s:s + len(w_)] += w_[:len(wip) - s]
        return eng + road + rain + wip
    if name == 'monitor':
        o = A.ambience('tunnel', d) * .5
        for k in np.arange(.3, d, .8):
            n_ = sine(1000, .1) * env(.1, .002, .05) * .2; s = int(k * SR); o[s:s + len(n_)] += n_[:len(o) - s]
        return o
    if name == 'siren':
        f = 650 + 350 * np.sin(2 * np.pi * .35 * t); ph = np.cumsum(f) / SR
        sir = lp(np.sin(2 * np.pi * ph), 1800) * .06
        o = sir + lp(n, 200, 3) * .14
        for k in np.arange(.2, d, .75):
            n_ = sine(1000, .1) * env(.1, .002, .05) * .16; s = int(k * SR); o[s:s + len(n_)] += n_[:len(o) - s]
        return o
    return A.ambience(name, d)

def piano(f, d=3.0):
    t = t_(d); x = sum(np.sin(2 * np.pi * f * k * t) / k ** 1.6 for k in range(1, 7)); return x * np.exp(-t / 1.1) * np.minimum(1, t / .004)

def music2(ch, d):
    if ch == 'ruta':
        t = t_(d); lfo = .6 + .4 * np.sin(2 * np.pi * .06 * t)
        pad = (sine(55, d) + .6 * sine(82.4, d) + .3 * sine(110, d) + .2 * sine(130.8, d)) * lfo * .07
        out = np.zeros(len(t)); chords = [[220, 261.6, 329.6], [174.6, 220, 261.6], [196, 246.9, 293.7], [164.8, 207.7, 246.9]]
        k, i = 3.0, 0
        while k < d - 3:
            for f in chords[i % 4]:
                n_ = piano(f) * .045; s = int(k * SR); out[s:s + len(n_)] += n_[:len(out) - s]
            k += 4.2; i += 1
        return pad + reverb(out, 3.2, .55)[:len(t)]
    base = A.music(ch, d)
    if ch != 'regla0': return base
    out = np.zeros(len(base)); motif = [146.8, 174.6, 220, 277.2, 220, 174.6]; k, i = 2.0, 0
    while k < d - 3:
        n_ = piano(motif[i % len(motif)]) * .07; s = int(k * SR); out[s:s + len(n_)] += n_[:len(out) - s]; k += 3.4 + (i % 3) * .6; i += 1
    return base * .8 + reverb(out, 3.0, .5)[:len(base)]

def build(path, edge=False):
    spec = json.load(open(path)); vid = spec['id']; V = spec['voices']
    d = os.path.join(A.BUILD, vid); os.makedirs(d, exist_ok=True)
    beats = spec['beats']
    # 1) voz: una petición por voz, luego se corta por frases
    clips = {}
    for who, vc in V.items():
        idx = [i for i, b in enumerate(beats) if b.get('who') == who and b['say']]
        if not idx: continue
        if edge:
            for i in idx:
                mp3 = os.path.join(d, f'e{i:02d}.mp3'); words = A.tts_edge(TAG.sub('', beats[i]['say']), vc['edge'], vc['rate'], vc['pitch'], mp3)
                clips[i] = (voice_fx(A.decode(mp3), vc.get('fx')), A.attach_punct(TAG.sub('', beats[i]['say']), words))
            continue
        spans, txt = [], ''
        for i in idx:
            if txt: txt += ' '
            spans.append((i, len(txt), len(txt) + len(beats[i]['say']))); txt += beats[i]['say']
        key = hashlib.md5((txt + vc['eleven']).encode()).hexdigest()[:10]; mp3 = os.path.join(d, f'g_{who}_{key}.mp3'); aj = mp3 + '.json'
        if not os.path.exists(aj): json.dump(eleven_group(txt, vc['eleven'], mp3), open(aj, 'w'))
        al = json.load(open(aj)); audio = A.decode(mp3); dur = len(audio) / SR
        for n, (i, a, b) in enumerate(spans):
            chars = al[a:b]; real = [(c, s, e) for c, s, e in chars if not c.isspace()]
            st = real[0][1]; en = real[-1][2]
            nxt = al[spans[n + 1][1]][1] if n + 1 < len(spans) else dur
            cut0 = max(0, st - .04); cut1 = min(dur, en + min(.25, (nxt - en) * .6))
            seg = audio[int(cut0 * SR):int(cut1 * SR)]
            # palabras sin etiquetas [whispers]
            clean = TAG.sub('', beats[i]['say']); words, cur = [], None; pos = 0; inside = False
            for c, s, e in chars:
                if c == '[': inside = True; continue
                if inside:
                    if c == ']': inside = False
                    continue
                if c.isspace():
                    if cur: words.append(cur); cur = None
                elif cur is None: cur = {'w': c, 's': s - cut0, 'e': e - cut0}
                else: cur['w'] += c; cur['e'] = e - cut0
            if cur: words.append(cur)
            words = [w for w in words if re.search(r'\w', w['w'])]
            clips[i] = (voice_fx(seg, vc.get('fx')), words)
    # 2) timeline
    tl_beats, cur, tracks = [], 0.0, []
    for i, b in enumerate(beats):
        a, words = clips.get(i, (np.zeros(0), []))
        nz = np.where(np.abs(a) > 0.012)[0]; vdur = (nz[-1] / SR + .05) if len(nz) else 0
        length = max(vdur, .4) + b.get('pause', .22) + b.get('hold', 0)
        tl_beats.append({**b, 'say': TAG.sub('', b['say']), 'start': cur, 'end': cur + length, 'vdur': vdur,
                         'words': [{'w': w['w'], 's': cur + w['s'], 'e': cur + w['e']} for w in words]})
        if len(a): tracks.append((cur, a, b.get('who')))
        cur += length
    total = cur; N = int(total * SR) + SR
    voice = np.zeros(N); fx = np.zeros(N); amb = np.zeros(N)
    for s, a, who in tracks: x = a[:N - int(s * SR)]; voice[int(s * SR):int(s * SR) + len(x)] += x * (1.15 if who == 'w' else 1)
    for b in tl_beats:
        for name, at in b.get('sfx', []):
            x = sfx2(name); s = int((b['start'] + at) * SR); x = x[:N - s]; fx[s:s + len(x)] += x
        if b.get('ov', {}).get('t') == 'rule':
            x = sfx2('hit') * .45; s = int(b['start'] * SR); fx[s:s + len(x)] += x[:N - s]
        if b.get('amb'):
            L = b['end'] - b['start'] + .4; x = amb2(b['amb'], L); fade = np.minimum(1, np.minimum(t_(L) / .3, (L - t_(L)) / .3))
            s = int(b['start'] * SR); amb[s:s + len(x)] += (x * fade)[:N - s]
    bed = A.ambience('tunnel', N / SR)[:N] * (.8 if spec['ch'] == 'regla0' else .35)
    fx = reverb(fx, 1.4, .22)[:N]
    mus = np.pad(music2(spec['ch'], N / SR), (0, N))[:N]
    envv = np.convolve(np.abs(voice), np.ones(4800) / 4800, 'same')[:N]; duck = 1 - .5 * np.clip(envv * 12, 0, 1)
    # voz a nivel constante y efectos sin picos de subgraves que roben margen
    vr = np.sqrt(np.mean(voice[np.abs(voice) > .01] ** 2)) if np.any(np.abs(voice) > .01) else 1
    voice = voice * (.16 / vr)
    fx = hp(fx, 45, 2); fx = np.tanh(fx * 1.4) / 1.4
    mix = voice + fx * .55 + (amb + bed) * duck + mus * duck * .9
    mix = hp(mix, 30, 2)
    mix = mix[:int(total * SR)]; pk = np.max(np.abs(mix)); mix = mix / pk * .89 if pk > .89 else mix
    pcm = (np.clip(mix, -1, 1) * 32767).astype('<i2')
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-', os.path.join(d, 'mix.wav')], input=pcm.tobytes(), check=True)
    tl = {k: v for k, v in spec.items() if k not in ('beats', 'voices')}; tl['beats'] = tl_beats; tl['duration'] = total
    json.dump(tl, open(os.path.join(d, 'timeline.json'), 'w'), ensure_ascii=False)
    print(vid, f'{total:.1f}s', len(tl_beats), 'beats')

if __name__ == '__main__':
    for p in [a for a in sys.argv[1:] if not a.startswith('--')]: build(p, '--edge' in sys.argv)
