# ElevenLabs: voz más real para «el Vecino» + efectos/ambientes (notas, 23-oct-2026)

## 0. Lo más importante (resumen)

1. **Eleven v3 ya no es el modelo actual.** El 28-sep-2026 salió **Eleven v4** (`eleven_v4`), y la doc oficial
   «strongly recommend[s] switching to v4». Cuesta lo mismo que v3 ($0.08/1k car. en API) y **sí admite request stitching**
   (`previous_text`/`next_text`/`previous_request_ids`), cosa que v3 NO admite. Ojo: v4 reproduce la voz de forma más fiel y
   «may sound substantially different from Eleven v3». Hay que escucharla antes de cambiar. No la he probado (límite de 3 pruebas).
2. **Los guiones están bien encaminados, pero les falta «partitura».** Lo que más cambió en las mediciones fue el TEXTO
   (mayúsculas, «...», etiqueta en mitad de la frase), no la stability.
3. **`use_speaker_boost` no hace nada en v3** (`GET /v1/models` → `can_use_speaker_boost: false` para `eleven_v3` y `eleven_v4`).
4. **Generar en bloque sí es posible con v3**: `POST /v1/text-to-dialogue/with-timestamps` con UNA sola voz y una entrada por línea
   devuelve `voice_segments[].dialogue_input_index` + alineación por carácter. Así se obtiene la continuidad de una toma única
   y se pueden seguir cortando las líneas como ahora. Un episodio (1.049–1.233 car.) cabe en el límite de 2.000 car.
5. **Bug latente en gen_lines.py**: la caché es `clips/NN.json`. Si se edita el texto de una línea, NO se regenera.

## 1. Estado actual del generador (gen_lines.py)

- `model_id: eleven_v3`, `language_code: es`, voz `851ejYcv2BoNPjrkw93G`.
- `stability` sale de `cfg["voices"][who][1]`; en ep90/ep82 es **0.0 (= Creative)**. `similarity_boost` 0.8, `use_speaker_boost` True.
- Una petición `/with-timestamps` por línea (3 en paralelo, sin contexto entre líneas). Después recorta cada clip por energía,
  aplica `atempo`, limita las pausas internas a `inner_cap` (0.45 s) y une con `gap` 0.35 s / `gap_after` 0.3 s.
- Los guiones usan pocas etiquetas: solo 3 o 4 líneas de 14 llevan una. Las líneas son cortas (39–140 car.).

## 2. Mejores prácticas oficiales v3/v4 (2025-2026)

Fuente principal: https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices (secciones «Prompting Eleven v4»
y «Prompting Eleven v3»: «The prompting techniques in Prompting Eleven v4 also apply to Eleven v3»).

### 2.1 Etiquetas de audio documentadas (van entre corchetes y en inglés)
- **Voz / emoción:** `[laughs]` `[laughs harder]` `[starts laughing]` `[wheezing]` `[whispers]` `[sighs]` `[exhales]`
  `[sarcastic]` `[curious]` `[excited]` `[crying]` `[snorts]` `[mischievously]`
- **Del prompt «Enhance» oficial** (lista no cerrada): `[happy]` `[sad]` `[angry]` `[annoyed]` `[appalled]` `[thoughtful]`
  `[surprised]` `[whisper]` · no verbales: `[laughing]` `[chuckles]` `[sighs]` `[clears throat]` `[short pause]` `[long pause]`
  `[exhales sharply]` `[inhales deeply]`
- **Dirección / ritmo** (ejemplos oficiales): `[shouts]` `[dismissive]` `[deadpan]` `[dramatically]` `[pause]` `[pauses]`
  `[interrupting]` `[overlapping]` `[jumping in]` `[stifling laughter]` `[cracking up]` `[sheepishly]`, y en v4 descripciones
  libres como `[Low, steady voice, restrained urgency]`, `[Quick, light, playful pace]` o `[Gentle laugh, then sincere]`.
- **Efectos dentro de la voz:** `[gunshot]` `[applause]` `[clapping]` `[explosion]` `[swallows]` `[gulps]` (mejor no usarlos:
  los efectos van en la mezcla).
- **Experimentales:** `[strong X accent]` (p. ej. `[strong Andalusian accent]`; son poco consistentes), `[sings]` `[woo]`.
- **Reglas:**
  - La etiqueta debe describir algo **audible** («These tags MUST describe something auditory»). Nada de `[grinning]` ni `[standing]`.
  - Para no confundirla con un efecto, conviene describir la cualidad de la voz: `[low, gravelly voice]`.
  - Las etiquetas se combinan (`[mischievously][whispers]`).
  - Se colocan justo antes o justo después del trozo al que afectan, también **en mitad de la frase**.
  - «Match tags to your voice's character»: una voz seria no responde bien a `[giggles]`/`[mischievously]`.
  - Las etiquetas de pausa SSML `<break>` **no funcionan** en v3/v4. Hay que usar `...`, guiones y `[short pause]`.
- Help center: https://elevenlabs.io/docs/help-center/product/core-capabilities/text-to-speech/how-do-audio-tags-work-with-eleven-v3-and-v4

### 2.2 Cómo escribir el texto
- **«Ellipses (...) add pauses and weight»**. Las **MAYÚSCULAS aumentan el énfasis**. La puntuación normal marca el ritmo.
  «Text structure strongly influences output». Los guiones (— o -) sirven para cortes e interrupciones.
- La emoción también sale del contexto narrativo, pero «explicit tags yield more predictable results».
- **Longitud:** la guía antigua de v3 (alpha) recomendaba **más de 250 caracteres**, porque los prompts muy cortos dan
  resultados inconsistentes. La guía actual ya no lo menciona. Aun así, la idea sigue siendo válida: casi todas las líneas
  del Vecino tienen menos de 120 car. y se generan sin contexto. Esa es la causa principal de que suenen «a frase suelta».
  (Ref. secundaria: https://help.scenario.com/articles/1509584251-elevenlabs-music-speech-sound-effects-the-essentials)
- Los números conviene escribirlos con letras, como ya se hace («mil novecientos setenta y tres»).

### 2.3 Stability en v3
- En la UI de v3 hay **tres valores**: **Creative = 0.0** (más expresiva y la que más responde a las etiquetas, pero con más
  alucinaciones: palabras cambiadas o ruidos), **Natural = 0.5** (la más cercana a la voz original y equilibrada) y
  **Robust = 1.0** (muy estable, pero «less responsive to directional prompts»). La guía de entonces aconsejaba Creative o Natural
  para las etiquetas. Fuente: guía «Prompting Eleven v3 (alpha)», https://elevenlabs.io/docs/best-practices/prompting
  (la página antigua ahora redirige a la guía nueva).
- v4 usa una stability continua de 0 a 1. No tiene Style ni Speed. Fuente: https://elevenlabs.io/docs/overview/capabilities/text-to-speech/eleven-v4
- **Medición propia** (más abajo): con 0.5 las etiquetas siguieron funcionando (susurro −12 dB, énfasis en MÁS). No hace falta
  ir a 0.0 para tener expresividad.

### 2.4 Línea a línea o en bloque
- Línea a línea y sin contexto, cada frase arranca «en frío»: cambian la energía y el tono de un clip a otro, y las etiquetas
  de una línea no afectan a la siguiente.
- **Request stitching (`previous_text`, `next_text`, `previous_request_ids`) NO está disponible en `eleven_v3`**:
  https://elevenlabs.io/docs/eleven-api/guides/how-to/text-to-speech/request-stitching («Request stitching is not available for
  the eleven_v3 model»). En v4 sí (el ejemplo de esa página usa `eleven_v4`).
- **Alternativa con v3: Text to Dialogue con una sola voz** (se explica en la sección 3). Hace una toma continua con contexto
  completo y sigue dando los cortes por línea.

## 3. Text to Dialogue (sketches de dos personajes y bloques de una voz)

- Endpoint: `POST https://api.elevenlabs.io/v1/text-to-dialogue/with-timestamps` (también `/v1/text-to-dialogue` y `/stream`).
  Ref.: https://elevenlabs.io/docs/api-reference/text-to-dialogue/convert-with-timestamps ·
  https://elevenlabs.io/docs/overview/capabilities/text-to-dialogue
- Cuerpo:
  ```json
  {"model_id":"eleven_v3","language_code":"es",
   "inputs":[{"text":"[mischievously] ...","voice_id":"851ejYcv2BoNPjrkw93G"},
             {"text":"[surprised] ¿En serio?","voice_id":"<VOZ_2>"}],
   "settings":{"stability":0.5}, "seed":1234}
  ```
  - Admite hasta 10 voces distintas.
  - **El texto total debe quedarse en 2.000 car. o menos** («for reliable generation»).
  - También acepta `previous_text`/`future_text` (100 car. como máximo, «not supported by every model»),
    `previous_request_ids`/`next_request_ids`, `apply_text_normalization` y `audio_effects`.
- La respuesta trae `audio_base64`, `alignment`, `normalized_alignment` y **`voice_segments[]`** con `start_time_seconds`,
  `end_time_seconds`, `character_start_index`, `character_end_index` y **`dialogue_input_index`**. Con eso se corta cada línea
  y `words.json` sigue funcionando igual.
- Consejos oficiales:
  - Un guion `—` al final de una entrada y el comienzo de la siguiente con `—` producen interrupciones o solapes.
  - Funcionan etiquetas como `[interrupting]`, `[overlapping]` y `[jumping in]`.
  - Es una salida no determinista: conviene generar varias tomas y quedarse con la mejor.
- **`audio_effects`** (en TTS y en Dialogue; «Effects don't change the cost»). Catálogo disponible en
  `GET /v1/audio-effects/catalog` (consultado hoy):
  - filtros: `old_radio`, `robot`, `cheap_microphone`, `phone`, `low_quality_phone`, `bright_phone`
  - entornos de reverb: `small_room`, `big_room`, `hall`, `tunnel`, `street`, `valley`, `forest`
  - fondos: `call_center`, `cafe`, `city`, `keyboard`
  - También `distance` (0–1) y `pan`.
  - Útil para un «flashback» con `old_radio` o para una llamada con `phone`. **No conviene para el fondo de toda la voz**,
    porque queda pegado a la pista de voz y ya no se puede controlar en la mezcla. El ambiente va mejor aparte (sección 5).

## 4. Pruebas reales (3 peticiones, 84 créditos en total)

Las 3 pruebas usaron la misma voz, `similarity_boost` 0.8, `/with-timestamps` y la línea 2 de ep90. Cada petición costó entre
26 y 29 créditos, según la cabecera `character-cost`. El contador de la cuenta pasó de 158.838 a 158.922.
Los archivos están en `/tmp/claude-0/-home-user/3ae96a45-f9f7-56e8-8071-0e91fc6aa454/scratchpad/voz_pruebas/`:

| Archivo | Texto | Modelo | Stab |
|---|---|---|---|
| A_actual_v3_s0.mp3 | `[mischievously] Sí, aunque no se puede fumar desde hace más de veinte años. Fíjate la próxima vez en la puerta del baño.` | v3 | 0.0 |
| B_reescrito_v3_s0.mp3 | `[mischievously] Sí, sí... aunque no se puede fumar desde hace MÁS de veinte años. [whispers] Fíjate en la puerta del baño. [chuckles]` | v3 | 0.0 |
| C_reescrito_v3_s05.mp3 | igual que B | v3 | 0.5 |

Métricas con numpy (scripts en `.../scratchpad/scripts/analiza.py` y `analiza2.py`). La F0 se calcula por autocorrelación
con ventanas de 40 ms. La «parte normal» es todo lo anterior a «Fíjate».

| Métrica | A actual s0 | B reescrito s0 | C reescrito s0.5 |
|---|---|---|---|
| Duración del habla | 5,68 s | 7,62 s | 7,38 s |
| Velocidad (letras/s) | 14,3 | 9,3 | 9,6 |
| F0 mediana | 138 Hz | 119 Hz | 125 Hz |
| Variación de F0 en la parte normal (sd robusta) | 2,73 st | 3,38 st (+24 %) | 5,21 st* |
| Rango de energía p95–p10 | 17,2 dB | 26,1 dB | 25,8 dB |
| Caída de energía en «Fíjate…» frente a lo anterior | −1,5 dB | **−11,3 dB** | **−12,0 dB** |
| Duración del «más»/«MÁS» | 0,12 s | **0,44 s** (×3,7) | **0,56 s** |
| F0 del «más» frente a la mediana del resto | +1,0 st | **+4,9 st** | +0,9 st (lo marca con duración) |
| Pausas internas de más de 150 ms | 1 (0,68 s) | 3 (1,37 s) | 2 (1,05 s) |
| Audio después de la última palabra | 0 | 0,64 s (0,14 s activos: risita floja) | 0,40 s (0,24 s activos) |

\* Es probable que haya algún error de octava del detector. Hay que tomarlo como «igual de variada o más», no como un dato exacto.

**Conclusiones** (n=1 por condición, así que son indicios y no estadística):
- El **texto reescrito** produce mucho más contraste:
  - +9 dB de rango dinámico;
  - el susurro se mide de verdad (−11/−12 dB y menos sonoridad: 0,53/0,36 frente a 0,72/0,78);
  - **las MAYÚSCULAS funcionan**: «MÁS» dura de 3,7 a 4,7 veces más y en B sube +4,9 semitonos;
  - «Sí, sí...» mete una pausa de unos 0,5 s.
- **Coste:** la toma es un 30–34 % más lenta (9,3 letras/s frente a 14,3). Para TikTok hay que compensarlo con `inner_cap`
  (ya en 0,45 s; quita la pausa de 1,4 s antes del susurro) y con `tempo` de 1,08 a 1,15 por línea. Si no, el episodio se alarga.
- **Stability 0.5 frente a 0.0:** no hubo pérdida de expresividad medible (mismo rango dinámico, mismo susurro, énfasis más
  largo). Como 0.0 es la opción con más alucinaciones según la doc, **conviene pasar a 0.5 por defecto** y dejar 0.0 para el
  gancho y el remate.
- `[chuckles]` al final de la línea dio una risa muy corta (0,14–0,24 s activos). Las risas funcionan mejor **dentro** de la
  frase («Pero los botones... [laughs] siguen igual») o con `[laughs]` o `[starts laughing]`.

## 5. Efectos de sonido y música con ElevenLabs

### 5.1 Sound effects — `POST https://api.elevenlabs.io/v1/sound-generation`
- Ref.: https://elevenlabs.io/docs/api-reference/text-to-sound-effects/convert · https://elevenlabs.io/docs/overview/capabilities/sound-effects
- Cuerpo:
  - `text` (obligatorio);
  - `duration_seconds` (de 0,5 a 30; null = lo decide el modelo);
  - `prompt_influence` (de 0 a 1, por defecto 0,3; más alto = más literal y menos variado);
  - `loop` (true = bucle sin costura);
  - `model_id`: `eleven_text_to_sound_v2` (por defecto) o **`eleven_text_to_sound_v3`**.
  - El query `output_format` admite `wav_44100` y `wav_48000`, pero los WAV de 44,1 kHz exigen plan Pro según la doc.
    Con pago por uso, mejor pedir `mp3_44100_128` y convertir con ffmpeg, que es lo que espera `audio.py` (SR 44100).
- **Coste:**
  - Docs: «**40 credits per second when duration is specified**». Un efecto de 2 s cuesta unos 80 créditos y un ambiente
    de 20 s, unos 800.
  - Tarifa API en USD: $0.12/min (https://elevenlabs.io/pricing/api).
  - «The cost is not influenced by the text input».
  - Duración máxima: **30 s** por generación. Para algo más largo, usar `loop:true` y repetirlo en bucle en la mezcla.
- **Prompts que funcionan:**
  - Simples y concretos: «Glass shattering on concrete».
  - Con más detalle: «high-quality, professionally recorded footsteps on grass, sound effects foley».
  - Usar el vocabulario de audio: *impact, whoosh, ambience, one-shot, loop, braam, glitch, drone*.
  - Para secuencias, la doc recomienda generar cada parte por separado y montarlas en la mezcla.
  - Fuente: https://elevenlabs.io/docs/help-center/product/core-capabilities/sound-effects/how-do-i-prompt-for-sound-effects
- Ideas para efectos cartoon (en inglés funcionan mejor; `prompt_influence` de 0,5 a 0,7 y `duration_seconds` corta para
  controlar el coste):
  - «cartoon slide whistle going up, comedic, one-shot, dry, no reverb» (1,2 s)
  - «cartoon bonk on the head, wooden mallet, comedic impact, one-shot» (0,8 s)
  - «quick comedic record scratch, one-shot» (0,8 s)
  - «sneaky pizzicato tiptoe steps, cartoon, short» (2 s)
  - «airplane cabin chime, ding-dong seatbelt sign, one-shot» (1,5 s)
  - «lighter flick and cigarette inhale, close-mic foley» (2 s)
  - «toilet flush in small airplane lavatory, foley» (3 s)
- **¿Ambientes debajo de la voz? Sí, pero discretos y en una pista aparte**:
  - Sirven para situar la historia en 1–2 s (cabina de avión, calle, multitud) y dar «aire» entre frases.
  - Mezcla: un ambiente en bucle a unos −28/−30 LU por debajo de la voz (más bajo que `MUSIC_BED_LU` = −20), con el mismo
    ducking que la música, con filtro paso alto (unos 150 Hz) y paso bajo (unos 6–8 kHz) para no tapar la voz, y solo en las
    escenas que lo piden: entra con un fundido de 0,3 s y se va con la escena.
  - Prompts:
    - «airplane cabin ambience, steady jet engine hum, muffled, no voices, loopable»
    - «busy city street ambience, distant traffic, no horns, loopable»
    - «indistinct crowd murmur in a large hall, no clear words, loopable»
  - Pedir «no voices» o «no clear words» siempre: una multitud con palabras inteligibles compite con el narrador.
  - Generar 10–15 s con `loop:true` (400–600 créditos) **una vez** y guardarlo como `engine/el_amb/<nombre>.wav`, reutilizable
    en muchos episodios. No regenerarlo en cada episodio.
- Cuidado: las etiquetas de efecto dentro del TTS (`[applause]`, `[explosion]`) quedan pegadas a la voz y no se controlan.
  Mejor dejarlas fuera.

### 5.2 Música — `POST https://api.elevenlabs.io/v1/music`
- Ref.: https://elevenlabs.io/docs/api-reference/music/compose · https://elevenlabs.io/docs/overview/capabilities/music ·
  guía de prompts: https://elevenlabs.io/docs/overview/capabilities/music/best-practices
- Cuerpo: `prompt` **o** `composition_plan`, `music_length_ms` (de 3.000 a 600.000), `model_id` (`music_v1` por defecto en
  API; disponibles **`music_v2`** y **`music_v2_5`**, este el mejor), `force_instrumental: true` (imprescindible bajo la voz) y `seed`.
- Coste: $0.15/min en API. 30 s cuestan unos $0.075. En créditos, el coste depende de la duración (la UI lo muestra antes de
  generar).
- Prompting:
  - Responder a las cinco preguntas: género, ánimo, instrumentos, tempo y época de producción.
  - Para bucles, decir qué se excluye: «no melody — just drums».
  - Ejemplo para el Vecino: «sneaky cartoon pizzicato, 100 BPM, bassoon and plucked strings, playful mischievous mood,
    dry close-mic'd, instrumental only, no vocals, 4 bars loop».
- Ahora mismo `audio.py` repite `el_music/<estilo>.wav` en bucle. Conviene pedir pistas de 30–45 s con estructura de bucle
  (mismo tempo y tonalidad, sin final) para que el corte no se note.

## 6. Cambios propuestos a gen_lines.py (no aplicados)

1. **Caché con huella.** Guardar `clips/NN.<sha1(text+model+stab+seed)[:8]>.json`, o un `clips/NN.meta.json` con los
   parámetros y regenerar si no coinciden. Hoy, si se edita el texto, se reutiliza el audio viejo sin avisar.
2. **Quitar `use_speaker_boost`** (v3/v4 lo ignoran) y añadir `seed` fija por línea (`"seed": 1000+n`) para poder repetir
   tomas. Si una línea no gusta, se cambia solo su seed (`"seed"` en la línea).
3. **Stability por línea** (`L.get("stab", stab)`) y valor por defecto **0.5** (Natural) en `voices`. Para 0.0 (gancho y
   remate) generar 2 tomas con dos seeds y elegir. En v3 limitar los valores a {0.0, 0.5, 1.0}.
4. **`model` configurable** en `lines_in.json` (`cfg.get("model","eleven_v3")`), para hacer una prueba A/B con `eleven_v4`
   sin tocar código. Con v4 se puede añadir directamente:
   ```python
   if model!="eleven_v3":
       body["previous_text"]=" ".join(x["text"] for x in lines[max(0,n-2):n])
       body["next_text"]=lines[n+1]["text"] if n+1<len(lines) else None
   ```
   (Con `previous_request_ids` la generación tendría que ser secuencial, no con 3 hilos. `previous_text` permite mantener el
   paralelismo.)
5. **Modo bloque para v3** (`"mode":"block"` en `lines_in.json`):
   - una sola llamada a `/v1/text-to-dialogue/with-timestamps` con
     `inputs=[{"text":L["text"],"voice_id":voices[L["who"]][0]} for L in lines]` y `settings.stability`;
   - con `voice_segments[i]` (índice `dialogue_input_index`) se corta el mp3 por línea y se reparte la `alignment` usando
     `character_start_index/character_end_index`;
   - cada trozo se guarda como `clips/NN.mp3` + `clips/NN.json` con tiempos relativos, de modo que todo el código posterior
     (recorte por energía, `tempo`, `slot`, `pausas`, `inner_cap`, gaps, words.json) sigue igual;
   - si un episodio pasa de 2.000 car., partirlo en 2 bloques por un corte natural (después de «Sígueme...»).
   - Ventajas:
     - continuidad de tono y energía entre frases;
     - las etiquetas afectan con contexto;
     - y, sobre todo, **habilita sketches de dos voces** (VECINO + VECINA) con interrupciones (`—`) y `[overlapping]`.
   - Riesgo: si sale mal una línea, hay que repetir el bloque, o regenerar esa línea suelta con `/text-to-speech` como hoy.
6. **Compensar la lentitud de la toma expresiva.** Un `tempo` global en `voices` de 1,08 a 1,12 cuando se usen guiones
   «partitura», y mantener `inner_cap` en 0,45 s. Opcional: un aviso si `letras/s < 11` en la tabla final.
7. **Cola de la línea.** Si la línea termina en etiqueta no verbal (`[laughs]`, `[chuckles]`, `[sighs]`), poner
   `a1 = min(len, ws[-1].e + 0.8)` antes del recorte por energía, para no cortar la risa. El umbral de −38 dB puede
   comérsela, porque es suave.

## 7. Chuleta de escritura de guiones para v3/v4 en español (el Vecino)

1. **Una etiqueta por cambio de intención**, no por línea, y también **en mitad de la frase**: `... [whispers] Fíjate en...`.
   Unas 2–4 etiquetas por cada 100 caracteres como máximo.
2. Etiquetas en inglés y que se puedan oír: `[mischievously]` `[whispers]` `[excited]` `[surprised]` `[curious]`
   `[sarcastic]` `[deadpan]` `[dramatically]` `[laughs]` `[chuckles]` `[starts laughing]` `[sighs]` `[exhales]`
   `[clears throat]` `[short pause]` `[long pause]`. Para v4, descripciones libres: `[conspiratorial, lower voice]`,
   `[quick, playful pace]`.
3. **MAYÚSCULAS en UNA palabra clave por frase** (la que lleva el chiste o el dato): «MÁS de veinte años», «en el BAÑO».
   Medido: alarga la palabra unas 4 veces y la sube hasta 5 semitonos. Más de una por frase pierde el efecto.
4. **«...» = pausa con intención** (suspense antes del dato). Usarlos con moderación: cada uno añade unos 0,3–0,6 s.
   **«—» = corte o interrupción**. Para cerrar las frases, el punto mejor que la coma.
5. **Muletillas y repeticiones de habla real**: «Sí, sí...», «A ver...», «Ojo, ¿eh?», «Fíjate tú». Dan naturalidad al
   personaje pícaro y anclan la emoción.
6. **Preguntas retóricas para el giro**: «¿Y sabes dónde empezó el fuego? ... En el BAÑO.» La entonación interrogativa le da
   variación de tono sin depender de la etiqueta.
7. **Contexto: líneas de 120–250 caracteres** o modo bloque. Las frases sueltas de menos de 60 caracteres (gancho,
   despedida) suenan planas. Mejor unir gancho y frase 2 en una misma línea.
8. **Las risas dentro de la frase**, no al final: «Pero los botones... [laughs] siguen igual».
9. Números y siglas escritos como se dicen. Nada de `<break>` ni SSML.
10. Nada de efectos en la etiqueta (`[applause]`, `[explosion]`): van en la mezcla.
11. Probar cada etiqueta nueva con esta voz una vez antes de usarla en serie («Some experimental tags may be less consistent
    across different voices»).

### Dos líneas de ep90 reescritas

**Línea 0 + 1 (gancho; unirlas para dar contexto):**
- Actual:
  - `[excited] Los aviones tienen ceniceros.`
  - `[mischievously] Sí, aunque no se puede fumar desde hace más de veinte años. Fíjate la próxima vez en la puerta del baño.`
- Propuesta (una sola línea, 168 car.):
  `[excited] Los aviones... ¡TIENEN ceniceros! [mischievously] Sí, sí... aunque no se puede fumar desde hace MÁS de veinte años. [whispers] Fíjate la próxima vez en la puerta del baño.`

**Línea 8 (el dato serio; ahora va entero en susurro y pierde fuerza):**
- Actual:
  `[whispers] En mil novecientos setenta y tres, un avión acabó estrellándose cerca de París por un fuego que empezó en un baño.`
- Propuesta:
  `[serious, lower voice] En mil novecientos setenta y tres... un avión acabó estrellándose cerca de París. [whispers] ¿Y sabes dónde empezó el fuego? [short pause] En un BAÑO.`
  (Dato: es el vuelo 820 de Varig, de julio de 1973, cerca de Orly. El fuego empezó en un lavabo trasero; la hipótesis más
  aceptada es un cigarrillo tirado a la papelera. Así queda el orden dato → pregunta susurrada → remate con énfasis.)

Extra (remate de la línea 11):
- Actual: `O sea: el cenicero no es para que fumes. Es para cuando la lías.`
- Propuesta: `[deadpan] O sea... el cenicero NO es para que fumes. [mischievously] Es para cuando la lías. [chuckles]`

## 8. Siguiente prueba recomendada (unos 30 créditos)

Repetir la toma B con `eleven_v4` y stability 0.5, usando `scripts/tts_test.py`:

`python3 -I scripts/tts_test.py voz_pruebas/D_v4_s05 eleven_v4 0.5 "<texto B>"`

Después medir con `analiza.py` y, sobre todo, **escucharla**: v4 cambia el timbre de las voces de Voice Library. Si a Pablo
le gusta, v4 resuelve además la continuidad entre líneas con `previous_text`.

## Fuentes
- Best practices / Prompting v4 y v3: https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices
- Eleven v4: https://elevenlabs.io/docs/overview/capabilities/text-to-speech/eleven-v4 · noticia: https://unite.ai/elevenlabs-launches-eleven-v4-with-low-latency-turbo-variant
- Modelos: https://elevenlabs.io/docs/overview/models (y `GET /v1/models`, consultado hoy)
- TTS API (previous_text, seed, audio_effects): https://elevenlabs.io/docs/api-reference/text-to-speech/convert
- Request stitching (no en v3): https://elevenlabs.io/docs/eleven-api/guides/how-to/text-to-speech/request-stitching
- Text to Dialogue: https://elevenlabs.io/docs/overview/capabilities/text-to-dialogue · https://elevenlabs.io/docs/api-reference/text-to-dialogue/convert-with-timestamps
- Audio tags help: https://elevenlabs.io/docs/help-center/product/core-capabilities/text-to-speech/how-do-audio-tags-work-with-eleven-v3-and-v4
- Guía v3 (alpha), stability Creative/Natural/Robust: https://elevenlabs.io/docs/best-practices/prompting
- Sound effects: https://elevenlabs.io/docs/overview/capabilities/sound-effects · https://elevenlabs.io/docs/api-reference/text-to-sound-effects/convert · https://elevenlabs.io/docs/help-center/product/core-capabilities/sound-effects/how-do-i-prompt-for-sound-effects
- Música: https://elevenlabs.io/docs/overview/capabilities/music · https://elevenlabs.io/docs/overview/capabilities/music/best-practices · https://elevenlabs.io/docs/api-reference/music/compose
- Precios API: https://elevenlabs.io/pricing/api
