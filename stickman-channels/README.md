# Fábrica de series stickman — 3 canales

Tres canales de historias animadas con stickman, inspirados en el boom de "stickman survival" (cuentas que pasan de 0 a 400K seguidores en una semana), pero con identidad propia y en español.

| Canal | Handle | Género | Voz (TTS) | Personaje firma |
|---|---|---|---|---|
| **REGLA 0** | `@regla0` | Terror de supervivencia en POV, con reglas y voto | es-MX Jorge | Chubasquero amarillo |
| **SOBREVIVE AL LUNES** | `@sobrevivealunes` | Oficina + IA: dilema, reglas en clave de humor, truco real | es-ES Elvira | Acreditación morada y corbata roja |
| **¿SOBREVIVIRÍAS?** | `@sobrevivirias` | Edutainment: POV en desastres históricos reales | es-ES Álvaro | Bufanda roja |

## Qué hay aquí

```
specs/        guiones de los 9 episodios (JSON: frase, escena, HUD, overlays, SFX)
tools/audio.py  voz + sincronía palabra a palabra + SFX/música sintetizados + mezcla
engine/       motor de animación en Canvas (personaje, escenas, HUD, subtítulos)
brand/        logos (SVG + PNG)
output/       los 9 vídeos MP4 (720×1280, 30 fps) y sus portadas
```

## Cómo generar un episodio

```bash
pip install edge-tts scipy numpy           # una vez
python3 tools/audio.py specs/regla0-ep1.json            # voz gratuita (edge-tts)
python3 tools/audio.py specs/regla0-ep1.json --eleven   # voz ElevenLabs (usa API_KEY_ELEVENLABS)
NODE_PATH=$(npm root -g) node engine/render.js regla0-ep1 sheet   # hoja de contactos para revisar
NODE_PATH=$(npm root -g) node engine/render.js regla0-ep1 video   # MP4 final en output/
NODE_PATH=$(npm root -g) node engine/render.js regla0-ep1 cover   # portada en output/covers/
```

Para escribir un episodio nuevo, copia un JSON de `specs/`, cambia las frases y reutiliza escenas. Las palabras de los subtítulos se sincronizan solas con la voz.

## Plan de crecimiento

Ver la página de presentación publicada (enlace en la conversación). Resumen:

1. **Semana 0:** reservar los handles en TikTok, Instagram y YouTube y tener 10 episodios por canal en la recámara antes de publicar el primero.
2. **Días 1–30, encontrar el gancho:** 1–2 vídeos al día por canal en TikTok, Reels y Shorts. Probar 3 ganchos de primer segundo por episodio y medir retención a 3 s, comentarios por cada 1.000 views y seguidores por cada 1.000 views.
3. **Días 31–60, bucle de comunidad:** el voto decide de verdad el siguiente episodio, se fija el comentario con el resultado, se responde con vídeo y se anima cada semana una regla propuesta en comentarios.
4. **Días 61–90, escalar y monetizar:** película de temporada en YouTube, Patreon (Regla 0), lead magnet → masterclass (Lunes), colaboraciones educativas (Historia).
