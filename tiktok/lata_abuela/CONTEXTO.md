# CONTEXTO — Canal «La lata de la abuela» (trucos con la abuela Carmen) — cuenta real @consejos.de.abuela.tv («Consejos de la abuela»)

Documento de traspaso para continuar el canal en una sesión nueva. Léelo entero antes de hacer nada.

## Preferencias del usuario (obligatorias)
- Hablar SIEMPRE en español.
- Herramientas: solo ElevenLabs (voz, música, efectos; clave en `$API_KEY_ELEVENLABS`) y Claude (todo lo demás es código).
- La voz siempre muy por encima de la música (`engine/audio.py` lo garantiza y falla si no). Gancho con energía.
- Feedback del usuario: no enseñar tanto la lata por dentro (se hacía pesado), vídeos más breves, crear FOMO para quedarse hasta el final,
  trucos que de verdad sorprendan (no solo limpieza: súper, cocina, ahorro, etiquetas…).
- Entregar SIEMPRE los vídeos en .mp4 aquí en el chat (SendUserFile) en cuanto estén revisados, para que el usuario los descargue y suba; la portada es el fotograma 0.

## Identidad
- La lata azul de galletas (que nunca tiene galletas) con dorados repujados; la abuela Carmen en un medallón dorado (lip-sync, guiño, señala).
- Logo: `logo_avatar.png`. Usuario real: @consejos.de.abuela.tv, nombre «Consejos de la abuela» (el usuario eligió este en lugar de @lalatadelaabuela). Bio: «En la lata azul no hay galletas: hay trucos 🍪 La abuela Carmen te cuenta lo que nadie te explica. Uno nuevo cada día.»
- Voz: ElevenLabs `X1uEdaNgEu64cdmPhwUX` («Abuela Carmen»), stability 0.5, tempo 0.85 (≈170–180 ppm, ritmo de vídeo de trucos). Música: `abuela`.
- Código de referencia: `lt02_super/` (art.js, art2.js, main.js). Brief técnico: `engine/BRIEF.md`.

## Estructura vigente (desde 19/10/2026: formato «2 consejos útiles», 35–40 s)
Feedback del usuario sobre ep. 5–6 (huevo, pasta): «son curiosidades, se puede vivir sin ellas». Lo que se GUARDA y hace SEGUIR es lo útil:
dos consejos accionables por vídeo + final con «chuleta» (lista de los consejos) + «Guárdalo» (icono marcador) + botón «Seguir» → «Siguiendo»
y la promesa «cada día te traigo dos más». El gancho y el resto de reglas de abajo siguen igual. Plantilla: `lt07_nevera/main.js`.

### Reglas del gancho y ritmo (formato «1 secreto», 18/10/2026; siguen vigentes)
Datos que lo motivan (formato antiguo de 3 trucos, 58–66 s): 152 / 661 / 632 visualizaciones, 99,6 % «Para ti» (TikTok SÍ los repartía);
la curva cae del 100 % al ~25 % en los primeros 5–6 s y luego queda plana (~15 %) hasta el final → el problema es el GANCHO y el coste
de compromiso (barra 1·2·3 = «esto va para largo»), no el contenido del medio.
1. Un solo secreto por vídeo, de un objeto cotidiano que todo el mundo tiene en casa (línea editorial: «lo que nadie te explica»).
2. Fotograma 0 = el OBJETO en primer plano con el detalle misterioso marcado (aro dorado/flecha) + pregunta corta arriba («¿Sabes leer esto?»).
   El título del fotograma 0 va dentro de la escena (no en HEADS) para que el bucle final vuelva exactamente a él.
3. La voz arranca en 0,12 s y dice el beneficio/curiosidad en < 3 s. Segunda frase = bucle abierto («y uno no te va a gustar», «pues es mentira»).
4. Nada de barra de progreso, ni promesa de «tres», ni golpes de lata, ni presentación ni despedida de la abuela (le quitaba ~5 s al final).
5. Desarrollo en tarjetas que cambian cada 1–2 s; la revelación fuerte hacia el 65–70 %; luego un dato extra corto.
6. Cierre = pregunta que obliga a comentar/comprobar («Ve a la nevera: ¿qué número tienen los tuyos?») con 3 comentarios de ejemplo, y bucle
   inmediato al fotograma 0 (tail 0,75 s). Abuela: medallón pequeño abajo-izquierda reaccionando todo el vídeo.
7. Voz tempo 0,92 (≈170–185 ppm). Subtítulos en y=1420. Chips «ejemplo» en datos inventados; sin marcas reales; nada de counter().
8. Datos verificados antes de escribir (seguridad alimentaria: criterio AESAN; nada de consejos de salud dudosos).
Plantilla de código: `lt05_huevo/main.js` (utilidades card/badge/comment/hen + escenas) y `lt06_pasta/main.js`.

## Estado
- Formato antiguo (3 trucos) publicado en @consejos.de.abuela.tv: nº1 súper 152 vis., nº2 fechas 661, nº3 pollo 632 (datos 18/10/2026).
- Formato nuevo listos: `lt05_huevo/final.mp4` «El número del huevo» (32 s, gancho curiosidad) y `lt06_pasta/final.mp4` «La rayita de la
  pasta de dientes» (33 s, gancho mito/bulo). Textos en PUBLICAR.txt. Son un test A/B de tipo de gancho: comparar retención a 3 s y % que ve entero.
- Formato «2 útiles»: `lt07_nevera/final.mp4` «Tu nevera, bien puesta» (37 s): nevera a 4 °C con el truco del vaso + termómetro; crudo abajo y puerta para bebidas/salsas.
- Ideas siguientes en formato «2 útiles» (verificar cada dato con fuente oficial: AESAN, IDAE, OCU): congelar bien (plano en bolsa + descongelar en la nevera), manchas (sangre con agua fría; grasa con lavavajillas), lavadora (dónde va el detergente + programa eco), luz (horno sin abrir + standby), compra (precio por kilo + mirar abajo en la estantería).
- Ideas antiguas tipo curiosidad (menos prioridad): flecha del icono de gasolina (lado del depósito), agujero de la tapa del boli, símbolo del tarro
  abierto «12M» en cremas, estrellas del congelador (★ a ★★★★), cajetín de la lavadora (I, II, flor), lado brillante del papel de aluminio (mito),
  pegatina de la fruta, botón «eco» del lavavajillas.
- Recursos de audio regenerados con ElevenLabs y guardados en git: `engine/el_sfx/*.wav` (19 efectos) y `engine/el_music/abuela.wav`.

## Cómo se produce un episodio (desde `tiktok/lata_abuela/`)
1. Carpeta `ltNN_tema/` con `lines_in.json` ({"voices":{"ABUELA":["X1uEdaNgEu64cdmPhwUX",0.5,0.85]},"gap":0.2,"inner_cap":0.3,"lines":[...]}),
   `base.css`, symlink `fonts -> ../engine/fonts`; copiar art.js/art2.js/main.js de `lt02_super/`.
2. Voz: `python3 -I ../engine/gen_lines.py .`; comprobar con `python3 -I ../engine/tr.py voice_final.wav`.
3. `bash ../engine/sheet.sh $PWD 1`, `node ../engine/render.js $PWD video` (si se cae: `engine/render_all.sh` / `engine/render_resumible.js`), `python3 -I ../engine/audio.py $PWD abuela`.
- Créditos ElevenLabs compartidos con los otros canales (~25.000 caracteres al traspaso). No más de 3–4 renders a la vez.
