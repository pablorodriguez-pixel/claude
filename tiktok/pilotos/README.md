# Pilotos de TikTok

Cada carpeta es un vídeo: `index.html` (animación determinista), guion, tiempos por palabra y el `.mp4` final.
Motor compartido en `engine/` (render con Chromium headless, subtítulos karaoke, voces/música/SFX de ElevenLabs).

## Regla de audio (obligatoria)
La voz tiene que oírse siempre clara por encima de la música. La mezcla la hace `engine/audio.py` y es RELATIVA a la voz:
- voz normalizada a **-16 LUFS**;
- música **20 LU por debajo** de la voz, con hueco de ecualización en 1–4 kHz y **ducking de -9 dB** mientras se habla;
- efectos referenciados al pico de la voz;
- volumen final **-14 LUFS**, pico **< -1 dBFS**.

`audio.py` tiene un control de calidad que **falla** si la voz no queda al menos **20 dB por encima de la música durante el habla**,
si el volumen final se desvía más de 1 LU o si hay picos por encima de -1 dBFS. Un vídeo que no pasa ese control no se entrega.
Cada mezcla deja su informe en `mix_report.json`.

## Regla del gancho (obligatoria)
Los primeros 3 segundos se locutan con energía y a volumen pleno. Nunca susurrado ni en tono ASMR: en el feed no se oye y no para el dedo.
El susurro solo como recurso a mitad del vídeo o en el cierre.
