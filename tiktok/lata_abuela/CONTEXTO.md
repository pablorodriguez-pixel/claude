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

## Estructura vigente
1. Gancho: primera palabra = tema, afirmación que contradice («¡El súper te está tomando el pelo!»). Fotograma 0 = pregunta en movimiento.
2. Promesa: «Te cuento tres… y el último te va a cabrear/sorprender».
3. BARRA DE PROGRESO fija arriba: 1 · 2 · 3 + casilla «?»; el 3 con candado y carita desde el gancho; «Y espera, que el tres es el bueno» → candado tiembla y revienta;
   la «?» se convierte en un REGALO (truco extra al final).
4. Entre trucos solo un golpe de tapa de 0,5 s con el número; nada de inventario de la lata.
5. Encuesta final «¿Cuál…? ¿El uno, el dos o el tres?».
6. Sin presentación al principio; última frase: "Aquí la abuela Carmen. Sígueme, que en esta lata hay muchos más... y yo me los sé todos."
   (medallón en la tapa, + SEGUIR, compartimentos con «?», tapa que se cierra con «Ep. N · título»).
7. Sin tarjeta final: tail 0,6 s y bucle al fotograma 0. 55–65 s. Precios/fechas inventados SIEMPRE con chip «ejemplo»; sin marcas reales; nada de counter().
8. Datos verificados antes de escribir (seguridad alimentaria: criterio AESAN; nada de consejos de salud dudosos).

## Estado
- 17/10/2026: los 3 vídeos subidos (a la vez) a @consejos.de.abuela.tv → 0 visualizaciones en los tres. Diagnóstico pendiente (¿en revisión?, ¿cuenta sin calentar?, ¿mismos archivos subidos antes en otra cuenta?). Listos (versión de lanzamiento): `lt02_super/final.mp4` nº1 «El súper te engaña» (58 s), `lt03_fechas/final.mp4` nº2 «La fecha que te hace tirar comida» (66 s),
  `lt04_cocina/final.mp4` nº3 «Lo que haces mal en la cocina» (59 s). Descripciones en `PUBLICAR.txt`. Uno al día, en orden.
  (`final.mp4` en la raíz de esta carpeta = piloto antiguo de limpieza, descartado.)
- Próximo paso: analizar visualizaciones (48 h) y curvas de retención cuando el usuario las pase; preparar nº4, 5, 6…
  Ideas (verificar): trucos para ahorrar en la factura de la luz, cosas que no sabías del lavavajillas/lavadora, trucos de nevera (qué va en cada balda),
  errores al congelar, trucos de la compra online, cómo leer la etiqueta nutricional en 5 segundos.

## Cómo se produce un episodio (desde `tiktok/lata_abuela/`)
1. Carpeta `ltNN_tema/` con `lines_in.json` ({"voices":{"ABUELA":["X1uEdaNgEu64cdmPhwUX",0.5,0.85]},"gap":0.2,"inner_cap":0.3,"lines":[...]}),
   `base.css`, symlink `fonts -> ../engine/fonts`; copiar art.js/art2.js/main.js de `lt02_super/`.
2. Voz: `python3 -I ../engine/gen_lines.py .`; comprobar con `python3 -I ../engine/tr.py voice_final.wav`.
3. `bash ../engine/sheet.sh $PWD 1`, `node ../engine/render.js $PWD video` (si se cae: `engine/render_all.sh` / `engine/render_resumible.js`), `python3 -I ../engine/audio.py $PWD abuela`.
- Créditos ElevenLabs compartidos con los otros canales (~25.000 caracteres al traspaso). No más de 3–4 renders a la vez.
