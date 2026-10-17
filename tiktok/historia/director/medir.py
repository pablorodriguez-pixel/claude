#!/usr/bin/env python3
"""Mide un episodio para el director creativo.
uso: python3 -I director/medir.py <carpeta_episodio>  (desde tiktok/historia)
Lee lines.json (o lines_in.json si aún no hay voz) y el vídeo (final.mp4 o epNN*.mp4).
Escribe director/informes/<ep>/medidas.json, frames del gancho y una hoja de contactos cada 2 s."""
import json, os, re, subprocess, sys, glob, unicodedata

def norm(s):
    s = unicodedata.normalize('NFD', s.lower())
    return re.sub(r'[^a-zñ0-9 ]', ' ', ''.join(c for c in s if unicodedata.category(c) != 'Mn')).split()

TU = {'tu', 'tus', 'te', 'ti', 'tú', 'usas', 'llevas', 'sabias', 'sabes', 'crees', 'has', 'dices', 'escribes', 'cantas'}
MULETILLAS = {'oye', 'mira', 'lo', 'que', 'hola', 'bueno', 'sabias'}

def main(d):
    d = os.path.abspath(d); ep = os.path.basename(d)
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'informes', ep); os.makedirs(out, exist_ok=True)
    lj = os.path.join(d, 'lines.json'); timed = os.path.exists(lj)
    if timed:
        lines = json.load(open(lj))
    else:
        lines = [{'line': i, 'text': l['text'], 's': None, 'e': None} for i, l in enumerate(json.load(open(os.path.join(d, 'lines_in.json')))['lines'])]
    m = {'episodio': ep, 'con_tiempos': timed, 'lineas': []}
    for l in lines:
        dur = round(l['e'] - l['s'], 2) if timed else None
        nw = len(norm(l['text']))
        m['lineas'].append({'n': l['line'], 's': l['s'], 'e': l['e'], 'dur': dur, 'palabras': nw, 'texto': l['text']})
    g = m['lineas'][0]; gw = norm(g['texto'])
    m['primera_palabra'] = gw[0] if gw else ''
    m['primera_palabra_muletilla'] = m['primera_palabra'] in MULETILLAS
    m['gancho_dur'] = g['dur']; m['gancho_palabras'] = len(gw)
    m['gancho_apela_a_ti'] = bool(TU & set(gw))
    m['gancho_es_pregunta'] = g['texto'].strip().startswith('¿')
    marca = [l for l in m['lineas'] if 'soy tu vecino' in ' '.join(norm(l['texto']))]
    m['marca_linea'] = marca[0]['n'] if marca else None
    m['marca_es_ultima'] = bool(marca) and marca[0]['n'] == m['lineas'][-1]['n']
    m['marca_inicio_s'] = marca[0]['s'] if marca else None
    ojo = [l for l in m['lineas'] if norm(l['texto'])[:1] == ['ojo']]
    m['ojo_dur'] = ojo[0]['dur'] if ojo else None
    pen = m['lineas'][-2]['texto'] if len(m['lineas']) > 1 else ''
    pn = ' '.join(norm(pen))
    m['cta_tipo'] = 'si_o_no' if 'si o no' in pn else ('abierta' if '?' in pen else 'ninguna')
    m['cta_texto'] = pen
    m['n_lineas'] = len(m['lineas']); m['n_palabras'] = sum(l['palabras'] for l in m['lineas'])
    if timed:
        m['duracion_voz'] = round(m['lineas'][-1]['e'], 2)
        m['ppm'] = round(m['n_palabras'] / (m['duracion_voz'] / 60), 1)
        largas = sorted(m['lineas'], key=lambda l: -l['dur'])[:3]
        m['lineas_mas_largas'] = [(l['n'], l['dur'], l['texto'][:70]) for l in largas]
    vids = [p for p in [os.path.join(d, 'final.mp4')] + sorted(glob.glob(os.path.join(d, 'ep*.mp4'))) if os.path.exists(p)]
    m['video'] = vids[0] if vids else None
    if vids:
        v = vids[0]
        m['duracion_video'] = round(float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', v]).strip()), 2)
        for t in (0, 0.5, 1, 2, 3, 5):
            subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(t), '-i', v, '-frames:v', '1', '-vf', 'scale=540:-1', f'{out}/f_{t:04.1f}.jpg'])
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', v, '-vf', 'fps=0.5,scale=180:-1,tile=8x4', '-frames:v', '1', f'{out}/hoja.jpg'])
        # miniatura tal y como se ve en el perfil (recorte 3:4 centrado, pequeño)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', v, '-frames:v', '1', '-vf', 'crop=1080:1440:0:240,scale=150:-1', f'{out}/miniatura_perfil.jpg'])
    json.dump(m, open(f'{out}/medidas.json', 'w'), ensure_ascii=False, indent=1)
    print(json.dumps({k: v for k, v in m.items() if k != 'lineas'}, ensure_ascii=False, indent=1))
    for l in m['lineas']:
        print(f"L{l['n']:>2} {l['s'] if l['s'] is not None else '':>6}-{l['e'] if l['e'] is not None else '':>6} ({l['dur']}) {l['texto']}")
    print('frames en', out)

if __name__ == '__main__':
    main(sys.argv[1])
