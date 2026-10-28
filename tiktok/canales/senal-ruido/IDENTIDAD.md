# SEÑAL/RUIDO — Identidad de canal

> **Qué es:** canal vertical (TikTok / Reels / Shorts) de explainers de tecnología e IA.
> Cada vídeo coge un titular viral (**el ruido**) y lo contrasta con el dato verificable (**la señal**).
> **Promesa:** «Lo que importa de la tecnología, sin el ruido.»

Hermano de *Voto por correo* (`tiktok/voto-correo/`), pero con una identidad opuesta a propósito:

| | Voto por correo | SEÑAL/RUIDO |
|---|---|---|
| Fondo | Oscuro `#101114`, fotos dramáticas | Claro papel `#EFECE4`, gráfico limpio |
| Tono | Urgente, investigación | Calmado, escéptico, con ironía leve |
| Tipo | Archivo condensada 900 | Bricolage Grotesque (wdth 75) 800 + JetBrains Mono |
| Acento | Amarillo `#FFE14D` + rojo `#FF2D55` | Naranja señal `#FF4F1A` + gris ruido |
| Voz | David Martin (masculina, intensa) | Aitana (femenina, peninsular, serena) |

---

## 1. Nombre y marca

- **Nombre:** `SEÑAL/RUIDO` — siempre en mayúsculas, barra sin espacios.
- **Marca mínima (avatar / watermark):** la barra `/` en naranja sobre papel, o el monograma `S/R`.
- **Tagline:** «Lo que importa de la tecnología, sin el ruido.»
- **Handle sugerido:** `@senalruido` (comprobar disponibilidad antes de registrar).

## 2. Paleta

| Token | Hex | Uso |
|---|---|---|
| `--papel` | `#EFECE4` | Fondo base de todas las escenas |
| `--tinta` | `#121217` | Texto, cards oscuras, subtítulos |
| `--senal` | `#FF4F1A` | **Solo** para lo verificado: dato clave, sello SEÑAL, palabra activa del subtítulo |
| `--ruido` | `#9A978E` | Hype, rumor, cifra dudosa. Siempre con textura de grano |
| `--azul` | `#2E5BFF` | Segunda serie en comparaciones |
| `--card` | `#FFFFFF` | Cards de dato sobre papel |

Regla de oro: **el naranja es un sello de verdad.** Si algo no está verificado, no va en naranja.

## 3. Tipografía

- **Titulares:** Bricolage Grotesque, `font-stretch: 75%`, peso 800, `line-height: .92`, tracking `-0.01em`.
- **Cuerpo / subtítulos:** Bricolage Grotesque 700, `font-stretch: 85%`.
- **Datos, fuentes, etiquetas:** JetBrains Mono 500–700, mayúsculas, tracking `0.08em`.
- Fuentes embebidas en `build/` (`bricolage.woff2`, `jetbrainsmono.woff2`, SIL OFL).

## 4. Motivos visuales

1. **Grano de ruido:** todo lo que sea «ruido» (titular viral, rumor) aparece con textura de estática gris y leve vibración.
2. **Limpieza = señal:** al revelar el dato, el grano se disuelve y queda tipografía limpia sobre papel.
3. **Sello de veredicto:** al final de cada vídeo, sello `SEÑAL`, `RUIDO` o `MATIZ` (rotado −6°).
4. **Barra de progreso tipo onda:** arriba, una línea de tinta que se rellena en naranja.
5. **Fuente siempre visible:** etiqueta mono abajo del dato (`FUENTE · …`). Sin fuente no hay dato.

## 5. Estructura de vídeo (35–50 s)

| # | Bloque | Duración | Contenido |
|---|---|---|---|
| 1 | **Hook (ruido)** | 0–4 s | El titular viral tal cual, con grano. Pregunta implícita: «¿es verdad?» |
| 2 | **Contexto** | 4–12 s | De dónde sale la cifra y quién la difundió |
| 3 | **Señal** | 12–28 s | El dato verificable: gráfico/comparación, fuente visible |
| 4 | **Matiz** | 28–38 s | Lo que el titular no cuenta |
| 5 | **Veredicto** | 38–42 s | Sello SEÑAL / RUIDO / MATIZ |
| 6 | **Pregunta CTA** | últimos 4 s | Pregunta cerrada para comentarios + loop al hook |

## 6. Voz y guion

- **Tuteo**, frases cortas, una idea por frase.
- **Calma escéptica**: no grita, desmonta. Ironía leve permitida, burla no.
- Muletillas de canal: abrir con «Seguro que lo has visto:» y cerrar con «Señal o ruido. Tú decides.».
- Números siempre redondeados en voz («cien millones»), exactos en pantalla.
- **Nunca** afirmar sin fuente. Si el dato es una estimación, se dice «estimación».
- TTS: ElevenLabs `eleven_v3`, voz **Aitana** (`AxFLn9byyiDbMn5fmyqu`), etiquetas `[calm]`, `[curious]`, `[serious]`.

## 7. Safe areas (1080×1920)

- Margen lateral 70 px; columna derecha de UI de TikTok: no poner texto clave en x > 940.
- Subtítulos entre y = 1180 y 1420. Nada importante por debajo de y = 1500 (caption + botones).
- Marca `SEÑAL/RUIDO` arriba a la izquierda (y = 120).

## 8. Pipeline

```
canales/senal-ruido/<episodio>/script.txt
  → tts.py              (voz ElevenLabs → voice_raw.mp3)
  → stt.py              (timestamps palabra a palabra → stt.json → build/subs.json)
  → build/template.html (+ escenas del episodio) → video.html
  → render.js video D   (Playwright → video_noaudio.mp4)
  → ffmpeg mux          (→ <episodio>.mp4)
```
