# Proceso rápido (19/10) — producir sin quemar tokens

**Lee SOLO esto** para producir. CONTEXTO.md, RUBRICA.md, SERIE_HISTORIA.md y BRIEF.md son de consulta: abre la sección que necesites
con `grep -n`, nunca enteros. (Antes cada episodio leía ~60 KB de documentos, y cada director independiente los volvía a leer.)

## Lo que gasta y cómo se evita
| Antes | Ahora |
|---|---|
| 1 agente animador por vídeo + 2–3 directores independientes, cada uno releyendo todo | **0 subagentes.** Una sesión, un director en texto sobre la ficha/guion |
| Escribir ~1.500 líneas de JS a mano por episodio, con índices de palabra fijos (`K.x = ws(i+13)`) | Copiar el episodio más parecido y cambiar solo textos y figuras; tiempos con `find('frase')` |
| Mirar 4–6 hojas de 18 fotogramas por ronda, 2+ rondas, más f_*.jpg sueltos | **1 imagen**: `hoja.jpg` (20 fotogramas cada 3 s). Solo se mira otra si la QA marca algo |
| Leer logs de render, ffmpeg y Whisper enteros | `engine/hacer.sh` lo manda todo a `<ep>/logs/` y devuelve ≤ 10 líneas |
| Versiones v1→v4 por fallos de reglas | `engine/qa.py` comprueba las reglas en texto ANTES de renderizar |
| Leer transcripciones de otras sesiones | El traspaso es este archivo + la sección «Estado» de CONTEXTO.md |

## Pasos (por episodio)
1. **Ficha de 4 líneas** (gancho, portada, pregunta de bar, remate) → «sí» del usuario. Fichas actuales: `director/FICHAS_19-10.md`.
2. **Guion** (`lines_in.json`) con la plantilla de `director/GUIONES_V3.md`. Director en texto, una pasada, con las puertas de abajo.
   Cifras en letra. Línea 0 ≤ 3,5 s, «Ojo» ≤ 6 s, penúltima «¿…? Os leo.», última «Y esto... no venía en el libro.»
3. `bash ../engine/hacer.sh epNN_tema voz` → si la QA falla, arreglar solo esa línea (borrar `clips/NN.*`) y repetir.
4. Animación: `cp -r` del episodio más parecido (ep39_siesta3 = plantilla Napoleón v3), cambiar textos/figuras.
5. `bash ../engine/hacer.sh epNN_tema hoja` → mirar `hoja.jpg` UNA vez. Arreglar y, solo si hubo cambios grandes, repetir.
6. `bash ../engine/hacer.sh epNN_tema video` en segundo plano → entregar `final.mp4` con SendUserFile (portada = fotograma 0).
7. Commit y push a esta rama (sin vídeos de más de 95 MB).

## Puertas que el director comprueba (resumen de RUBRICA.md)
P1 no es un mito quemado · P2 toca su vida, le dice que se equivoca, lo comprueba ya, vale para España y Latinoamérica, da debate (≥ 4/5)
· P3 gancho = tema + «tú» + contradice, ≤ 3,5 s · P4 portada legible a 150 px, ≤ 6 palabras, pregunta · P5 promesa pagada antes del s 30
· P6 lo dudoso solo en el «Ojo» · P8 lo más fuerte al final · P9 un solo guiño a cámara · P10 prueba del bar · P11 de corrido, frases completas.
Nada de «historia de otros» (Garbo/Jessop/Petrov no funcionaron), ni votaciones, ni «Sí o no».

## Audio del motor
Resuelto el 19/10: 25 efectos en `engine/el_sfx/` (19 de `canal-lata-de-la-abuela` + 6 regenerados) y `engine/el_music/ragtime.wav` (30 s, en bucle). Ojo: .gitignore los ignora; para subirlos hace falta `git add -f`.
