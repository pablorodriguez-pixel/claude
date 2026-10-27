# Vídeo: "Estás quemando tus ahorros" (cuentas remuneradas)

Primer vídeo del canal de finanzas, en el formato de explainer animado (ver `../finanzas-formato/FORMATO.md`).

- **Duración:** 57,8 s · 9:16 · 1080×1920
- **Producción 100 % local, sin APIs externas:** guion, datos, animación (HTML/SVG + Playwright) y montaje hechos con Claude. Voces con **Piper TTS** (modelo abierto `es_ES-davefx-medium`, corre en local) — Ricardo con el tono bajado, Dani con el tono subido. Sin música: añade un audio en tendencia desde la app al publicar.
- **Archivo final:** `cuenta-remunerada.mp4`

## Portada
```
ESTÁS QUEMANDO
TUS AHORROS        ← "AHORROS" en amarillo
```
Ricardo en el centro sujetando un billete en llamas.

## Caption sugerido
> Tu cuenta de siempre te paga un 0,16 %. Hay cuentas remuneradas al 3 %, con el mismo Fondo de Garantía hasta 100.000 €. Con 20.000 € ahorrados son 400–600 € al año que te dejas. Y si encima te cobran mantenimiento sin avisarte, reclama. Sígueme para saber dónde sacarle más a tu dinero 👇
>
> Contenido educativo, no asesoramiento financiero. Cifras brutas; los intereses tributan. Revisa las condiciones (muchas ofertas son promocionales).
>
> #finanzaspersonales #ahorro #cuentaremunerada #dinero #educacionfinanciera

## Datos y fuentes (verificados el 27-oct-2026)
| Dato | Valor | Fuente |
|---|---|---|
| Remuneración media de las cuentas a la vista | 0,16 % | Banco de España (vía prensa, oct. 2026) |
| Mejores cuentas remuneradas | 3–3,5 % TAE (varias promocionales, con límites) | Rankia, HelpMyCash, oct. 2026 |
| Garantía de depósitos | 100.000 € por titular y entidad | FGD (y equivalentes en la UE) |
| Depósitos de los hogares | ≈1,1 billones € | Banco de España, 2026 |
| IPC septiembre 2026 | 4,9 % | INE |
| Comisión de mantenimiento | Legal si está en el contrato; una subida exige preaviso de 2 meses. Si no, se puede reclamar al banco y después al Banco de España | Banco de España / HelpMyCash |

Cálculos (20.000 €, brutos): 0,16 % → 32 €/año · 2 % → 400 € · 3 % → 600 €. A 10 años con interés compuesto la diferencia es de +4.060 € (al 2 %) a +6.560 € (al 3 %). 
**Ojo:** con el IPC al 4,9 %, ni siquiera un 3 % gana a la inflación ahora mismo; lo que hace es reducir la pérdida. El vídeo no dice que ganes a la inflación.

## Cómo regenerarlo
```bash
pip install piper-tts faster-whisper
# modelo: huggingface.co/rhasspy/piper-voices → es/es_ES/davefx/medium/es_ES-davefx-medium.onnx (+ .onnx.json)
python3 tts.py ruta/es_ES-davefx-medium.onnx   # voces + tiempos por palabra (whisper local)
python3 timeline.py                             # voice.wav + build/subs.json
cd build && python3 -c "import json;print('window.DATA='+json.dumps(json.load(open('subs.json')),ensure_ascii=False)+';')" > subs.js
cp template.html video.html && node render.js video 57.8 && cd ..
ffmpeg -i build/video_noaudio.mp4 -i voice.wav -filter_complex "[1:a]loudnorm=I=-14:TP=-1.5,aresample=44100,apad[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -t 57.8 cuenta-remunerada.mp4
```

## Versión con imágenes IA (Higgsfield)
Las escenas actuales están dibujadas en SVG. Para acercarse al estilo del referente, genera estas imágenes 9:16 y sustitúyelas como fondo:

Prompt base de estilo:
```
2D cartoon in the style of an adult animated sitcom, thick black outlines, flat colors, soft shading,
vertical 9:16, leave empty space in the top third for captions.
CHARACTER A "Don Ricardo": confident 55-year-old Spanish businessman, navy suit, red tie, slicked-back brown hair, thin glasses, smug half-lidded eyes.
CHARACTER B "Dani": nervous 22-year-old intern, dark green hoodie, blue lanyard with white badge "BECARIO", messy blond hair, big round eyes.
```
| Escena | Prompt de escena |
|---|---|
| 1. Hook | Dani proudly showing a piggy bank labelled "20.000 €" to Ricardo in a luxurious wood-panelled Madrid office; Ricardo unimpressed |
| 2. Quemando | Close-up: banknotes in a piggy bank slowly catching fire, Dani horrified |
| 3. Comparativa | Ricardo pointing at a wall screen with a tiny red bar "0,16 %" next to a tall green bar "3 %" |
| 4. Qué es | Ricardo calmly sliding money into a glass vault that has an open door and a little plant growing coins |
| 5. Quiebra | Dani sweating, imagining a classical bank building cracking; Ricardo holding a big purple shield "100.000 €" |
| 6. 10 años | Two piles of coins growing over 10 calendars; one pile much taller |
| 7. Comisión | Dani staring at his phone, a bank statement line "COMISIÓN −15 €" flying out of it like a bill |
| 8. Migajas | Fat banker eating a whole cake labelled "TU DINERO", throwing crumbs to Dani |
| 9. Reclamar | Ricardo handing Dani a formal complaint letter, bank clerk looking nervous |
| 10. Cierre | Ricardo on a Mediterranean terrace pointing at the camera, smug smile |
