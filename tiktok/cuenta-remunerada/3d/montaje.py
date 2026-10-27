# Monta el vídeo 3D: fotogramas (12 fps) -> 1080x1920 a 24 fps + subtítulos + CTA + voz.
#   python3 montaje.py            -> ../cuenta-remunerada-3d.mp4
import json, os, subprocess, re
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, '..')
D = json.load(open(os.path.join(ROOT, 'build', 'subs.json')))
W, SC = D['words'], D['scenes']
DUR = 57.8

def ts(t):
    t = max(0, t); h = int(t // 3600); m = int(t % 3600 // 60); s = t % 60
    return f'{h}:{m:02d}:{s:05.2f}'

def T(word, after):
    norm = lambda w: ''.join(c for c in w.lower() if c.isalnum() or c in 'áéíóúüñ')
    return next(w['s'] for w in W if w['s'] >= after - 0.01 and norm(w['w']).startswith(word))

# grupos de 1-3 palabras, como en el referente
G, cur = [], []
for i, w in enumerate(W):
    cur.append(w)
    nxt = W[i + 1] if i + 1 < len(W) else None
    if re.search(r'[.,!?¿¡…:]$', w['w']) or len(cur) >= 3 or not nxt or nxt['who'] != w['who']:
        G.append(cur); cur = []
clean = lambda w: re.sub(r'^[¿¡]+', '', w).rstrip('.,;:')
lines = []
for i, g in enumerate(G):
    s = g[0]['s']; e = min(G[i + 1][0]['s'], g[-1]['e'] + 0.4) if i + 1 < len(G) else g[-1]['e'] + 0.5
    txt = ' '.join(clean(w['w']) for w in g)
    lines.append(f'Dialogue: 0,{ts(s)},{ts(e)},Sub,,0,0,0,,{{\\an8\\pos(540,560)\\fscx88\\fscy88\\t(0,140,\\fscx100\\fscy100)}}{txt}')
sg = T('sígueme', SC[16]['s'])
lines.append(f'Dialogue: 1,{ts(sg)},{ts(DUR)},Cta,,0,0,0,,{{\\an5\\pos(540,1660)\\fscx70\\fscy70\\t(0,200,\\fscx100\\fscy100)}}  + Sígueme  ')
lines.append(f'Dialogue: 1,{ts(SC[16]["s"])},{ts(DUR)},Disc,,0,0,0,,{{\\an2\\pos(540,1890)}}Contenido educativo, no asesoramiento financiero.')
ass = f"""[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Sub,Poppins,68,&H00FFFFFF,&H00FFFFFF,&H00171A1D,&H64000000,-1,0,0,0,100,100,0,0,1,8,3,8,60,60,0,1
Style: Cta,Poppins,56,&H00FFFFFF,&H00FFFFFF,&H009E5150,&H009E5150,-1,0,0,0,100,100,0,0,3,18,0,5,0,0,0,1
Style: Disc,Poppins,26,&H00FFFFFF,&H00FFFFFF,&H00000000,&H80000000,0,0,0,0,100,100,0,0,1,2,1,2,0,0,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
""" + '\n'.join(lines) + '\n'
open(os.path.join(HERE, 'subs.ass'), 'w').write(ass)

out = os.path.join(ROOT, 'cuenta-remunerada-3d.mp4')
fonts = os.path.join(ROOT, 'build')
vf = (f"scale=1080:1920:flags=lanczos,fps=24,"
      f"subtitles={os.path.join(HERE, 'subs.ass')}:fontsdir={fonts}")
cmd = ['ffmpeg', '-v', 'error', '-y', '-framerate', '12', '-start_number', '0', '-i', os.path.join(HERE, 'frames', 'f_%04d.png'),
       '-i', os.path.join(ROOT, 'voice.wav'),
       '-filter_complex', f"[0:v]{vf}[v];[1:a]loudnorm=I=-14:TP=-1.5,aresample=44100,apad[a]",
       '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p',
       '-c:a', 'aac', '-b:a', '192k', '-t', str(DUR), out]
subprocess.run(cmd, check=True)
print('OK', out)
