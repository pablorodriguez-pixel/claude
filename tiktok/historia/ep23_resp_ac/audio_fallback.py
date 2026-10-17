"""Envoltorio de ../engine/audio.py SIN tocar el motor.
En este contenedor faltan engine/el_sfx/*.wav y engine/el_music/*.wav (los *.wav están en .gitignore y no se restauraron).
Si faltan, usa la librería de efectos y la música procedurales que el propio audio.py trae (lib() y music()).
La mezcla y el QA (voz -16 LUFS, música 20 LU debajo + ducking, final -14 LUFS, voz >= 20 dB sobre la música) son los de audio.py.
uso: python3 -I audio_fallback.py <dir> ragtime"""
import os, sys, importlib.util
ENG = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'engine', 'audio.py')
spec = importlib.util.spec_from_file_location('audio_engine', ENG); A = importlib.util.module_from_spec(spec); spec.loader.exec_module(A)
ed = os.path.dirname(os.path.realpath(ENG))
if not os.path.isdir(os.path.join(ed, 'el_sfx')):
    print('AVISO: falta engine/el_sfx -> efectos procedurales de audio.py')
    _L = A.lib(); _L.update({'msg_in': _L['ping'], 'msg_out': _L['pop2'], 'typing': _L['type'], 'scratch': _L['squish']})
    A.el_lib = lambda: _L
if not os.path.isdir(os.path.join(ed, 'el_music')):
    print('AVISO: falta engine/el_music -> música procedural de audio.py')
    A.el_music = lambda style, dur: A.music(style, dur)
A.main()
