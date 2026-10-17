"""Ep. 21 · Mezcla final con engine/audio.py SIN TOCARLO (mismas reglas y mismo QA: voz -16 LUFS, música -20 LU con EQ y ducking,
final -14 LUFS, pico < -1 dBFS, voz >= 20 dB sobre la música durante el habla).

Por qué existe: en este contenedor faltan engine/el_sfx/*.wav y engine/el_music/*.wav (el .gitignore excluye *.wav y no viajan con el repo).
- Si esas carpetas EXISTEN, este script no cambia nada: usa los efectos y la música de ElevenLabs como siempre.
- Si NO existen, usa los generadores por código que ya trae audio.py (lib() y music('ragtime')), más dos efectos que lib() no tiene
  (scratch y msg_in), también sintetizados aquí con numpy. Todo es código: ni bancos de sonido ni créditos.
uso: python3 -I mezcla.py <dir> ragtime     (la caja de música ya va dentro de voice_final.wav: ver caja_musica.py)"""
import sys, os, importlib.util
import numpy as np

ENG = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'engine')
spec = importlib.util.spec_from_file_location('audio_engine', os.path.join(ENG, 'audio.py'))
A = importlib.util.module_from_spec(spec); spec.loader.exec_module(A)

have_sfx = os.path.isdir(os.path.join(ENG, 'el_sfx')) and any(f.endswith('.wav') for f in os.listdir(os.path.join(ENG, 'el_sfx')))
have_mus = lambda st: os.path.exists(os.path.join(ENG, 'el_music', st + '.wav'))
SR = A.SR

def extra():
    L = {}
    # rayado de disco: barrido de ruido filtrado hacia arriba y hacia abajo
    n = int(0.42 * SR); t = np.arange(n) / SR
    f = 600 + 1800 * np.abs(np.sin(t / 0.42 * np.pi * 2.0))
    car = np.sin(2 * np.pi * np.cumsum(f) / SR)
    nz = A.noise(0.42, 0.003, 0.3, lp=4000, hp=500)
    L['scratch'] = A.norm(car * nz * 2 + 0.3 * nz) * 0.7
    # mensaje recibido: dos notas cortas tipo «tu-tún»
    L['msg_in'] = A.norm(np.concatenate([A.tone(1318, 0.07, 0.002, 0.04, harm=(1, 2)), A.tone(1760, 0.22, 0.002, 0.09, harm=(1, 2))])) * 0.8
    return L

if not have_sfx:
    print('AVISO: no hay engine/el_sfx → efectos generados por código (audio.lib + scratch/msg_in)')
    def _lib():
        L = A.lib(); L.update(extra()); return L
    A.el_lib = _lib
style = sys.argv[2] if len(sys.argv) > 2 else 'ragtime'
if not have_mus(style):
    print(f'AVISO: no hay engine/el_music/{style}.wav → música generada por código (audio.music("{style}"))')
    A.el_music = lambda st, dur: A.music(st, dur)
A.main()
