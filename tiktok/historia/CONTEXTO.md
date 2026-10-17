# CONTEXTO — Canal «Esto no venía en el libro» (TikTok @no.venia.en.los.libros)

Documento de traspaso para continuar el canal en una sesión nueva. Léelo entero antes de hacer nada.

## Preferencias del usuario (obligatorias)
- Hablar SIEMPRE en español.
- Herramientas: solo ElevenLabs (voz, música, efectos; clave en `$API_KEY_ELEVENLABS`) y Claude (todo lo demás es código).
- La voz siempre muy por encima de la música (`engine/audio.py` lo garantiza y falla si no). El gancho con energía, nunca susurrado.
- Entregar los vídeos con SendUserFile en cuanto estén revisados; decir siempre en qué segundo está la portada (fotograma 0).

## Identidad
- El Vecino: busto de grabado con bombín, bigote y abanico; vive en un óvalo dorado abajo-izquierda; balcón para la marca.
- Estética: collage de grabados antiguos (sepia #2B2118, papel #EADFC8), acentos amarillo #FFE600, rosa #FF3EA5, rojo sellos #C8102E.
- Voz: ElevenLabs `851ejYcv2BoNPjrkw93G`, stability 0.0, tempo 0.94–1.0 (≈160–170 ppm). Música: `ragtime`.
- Cameo del emú (una vez por vídeo). Biblia completa: `SERIE_HISTORIA.md`. Brief técnico: `engine/BRIEF.md`.

## Datos reales del canal (lo aprendido)
| Vídeo | Visualizaciones | Por qué |
|---|---|---|
| Napoleón no era bajito | 64 mil (17/10) | Toca al espectador (su altura), contradice, debate |
| OK es una falta de ortografía | 44,7 mil (17/10) | Palabra que usa a diario, hueco de curiosidad («Hablo de OK») |
| Hora equivocada / Semana | 11–12 mil | Día a día en España |
| Einstein | 11,4 mil (17/10) | Algo personal (suspensos) |
| SOS, Vikingos, Muralla, Colón | < 750 | «Historia de otros», mitos ya muy desmontados |
| @ (trigo) | 440 (recién subido, medir a 48 h) | — |
| Cleopatra / Emú | 1,2 mil / 180 | Hay que hacer cuentas / tema desconocido |

Curvas de retención medidas (OK y Semana): el 40 % se va en 5 s; la marca en el s 7–10 perdía 2,4–3,2 pts/s; el contexto (fechas, nombres)
~1,2 pts/s; el dato raro y comprobable 0,3–0,5; la pregunta final ~2 pts/s; solo el 2–4 % veía la tarjeta final.

## Reglas vigentes (v3)
1. TEMA: cosas del día a día del espectador con historia oculta (palabras, letras, calendario, costumbres, su cuerpo, España). Filtro: toca su vida,
   le dice que está equivocado, lo puede comprobar en el momento, ángulo español, genera debate (≥4 de 5).
2. Primera palabra = el tema (sin «Oye», «Que no», «Lo siento»). Gancho = afirmación que contradice + «tú», sin dar la respuesta.
3. Fotograma 0 = PREGUNTA (objeto grande + planteamiento) y ya en movimiento; el sello/veredicto cae cuando lo dice la voz.
4. Sin marca al principio. Última frase: "Soy tu vecino... y esto no venía en el libro." (balcón rápido + libro HISTORIA que se cierra con «Ep. N · título»).
5. Sin tarjeta final: tail 0,6 s y bucle al fotograma 0.
6. Contexto en UNA frase; la promesa del gancho se paga antes del s 30; «Ojo» ≤ 6 s; remate + pregunta «¿…? Sí o no» en UNA frase. 55–65 s.
7. NUNCA counter() en años/cantidades: el valor final aparece directo con sello (si no, se ven cifras falsas).
8. Precisión: solo datos del guion; lo dudoso va en el «Ojo».

## Estado
- 17/10 DIRECTOR (informes en `director/informes/`): ningún pendiente llega a 80. Septiembre 71 (ARREGLAR, ~81 con L6+L7 nuevas), Cumpleaños 61 (reconvertir, ~78–82),
  Uvas 59 (rehacer para diciembre), Ñ 58 (remontaje v2, ~74–78), Pez 57, Cerebro 54 (prueba ciega: coincide con el usuario), Gladiadores 53 (corte de 33 s), Himno 49 (fuera).
  Toro 63 (ya entregado). COLA DE PUBLICACIÓN VACÍA hasta nuevas versiones aprobadas.
- Fallos sistemáticos de la plantilla v3 (corregir en TODOS los guiones nuevos): el gancho da la respuesta y no dice «tú»; sello/veredicto antes de que se forme la pregunta;
  2 líneas seguidas de contexto (~14 s); «Ojo» > 6 s; cierre «Sí o no» (volver a pregunta abierta y personal + «Os leo», como Napoleón y OK);
  título de portada por encima de y≈260 → se corta en la miniatura 3:4 del perfil (recorte y 240–1680).
- Publicados: Emú, Cleopatra, Hora, Napoleón, Semana, OK, Einstein, SOS, Vikingos, Muralla, Colón, @ (ep11).
- Entregados al usuario el 17/10 para subir: ep13 Septiembre, ep15 Toro, ep14 Ñ (sustituye a Cerebro).
- DESCARTADO: ep17 Cerebro — al usuario le parece flojo y poco interesante (mito del 10 % muy desmontado, nada que comprobar en el momento). Evitar temas así.
- Pendientes de publicar (en este orden, uno al día; textos en `PUBLICAR_pendientes.txt`): ep20 Cumpleaños, ep19 Pez, ep18 Himno, ep16 Uvas (Navidad), ep09 Gladiadores.
- Próximo paso: cuando el usuario pase visualizaciones a 48 h y curvas de retención de los nuevos, medir (pts/s por frase) y ajustar.
  Si los temas cotidianos funcionan, probar UNA variante de estructura cada vez.
- Comunidad: ver `COMUNIDAD.md` (respuestas, comentarios fijados, vídeos-respuesta).
- Ideas de temas pendientes: buscar en Wikipedia «List of common misconceptions», r/todayilearned (top), autocompletar de TikTok, comentarios.

## Cómo se produce un episodio (desde `tiktok/historia/`)
0. DIRECTOR CREATIVO (obligatorio, `.claude/agents/director-creativo.md` + `director/RUBRICA.md`): aprueba la IDEA y el GUION antes de gastar
   créditos de voz, y el VÍDEO antes de entregarlo. Sin PUBLICAR (≥ 80/100 y todas las puertas) no se entrega nada al usuario.
   Si el tipo de agente no está cargado en la sesión, lanza un agente general con «actúa según .claude/agents/director-creativo.md».
   Informes en `director/informes/<ep>/informe.md`. Cada 48 h, con los datos reales, recalibrar la tabla de bandas de la rúbrica.
1. Carpeta `epNN_tema/` con `lines_in.json` ({"voices":{"VECINO":["851ejYcv2BoNPjrkw93G",0.0,0.98]},"gap":0.24,"inner_cap":0.35,"lines":[{"who":"VECINO","text":...}]}),
   copiar `base.css`, symlink `fonts -> ../engine/fonts`, copiar `ep07_ok/kit` a `kit/`.
2. Voz: `cd epNN && python3 -I ../engine/gen_lines.py .` → voice_final.wav, words.js, words_table.txt. Comprobar con `python3 -I ../engine/tr.py voice_final.wav` (Whisper).
   Si se come la primera palabra, añadir una palabra delante o regenerar esa línea (borrar `clips/NN.*`). Ajustar tempo (3.º valor de la voz) sin gastar créditos.
3. Animación: `index.html` + .js (reutilizar `ep10_einstein/` como plantilla v2/v3). Todo clavado por texto con `find()`/`w()`.
4. Revisión: `bash ../engine/sheet.sh $PWD 1` y mirar todas las hojas. Render: `node ../engine/render.js $PWD video` (si se cae por carga, `engine/render_resumible.js`).
5. Audio: `python3 -I ../engine/audio.py $PWD ragtime` (debe pasar el QA). Entregar `final.mp4`; si pesa >95 MB, re-encodificar crf 20 antes de subir al repo.
- Créditos ElevenLabs: quedaban ~25.000 caracteres (≈ 30 episodios de 850 caracteres). Comprobar con la API /v1/user/subscription.
- Cada episodio necesita `kit/` (copia de `ep07_ok/kit`) y `fonts -> ../engine/fonts`; ep10–ep20 ya los tienen (se restauraron al dividir la sesión).
- No lances más de 3–4 renders a la vez (la máquina tiene 4 núcleos).
