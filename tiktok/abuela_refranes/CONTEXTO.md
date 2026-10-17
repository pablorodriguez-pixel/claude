# CONTEXTO — Canal «Por algo se dice» (refranes con la abuela Remedios) — cuenta nueva @poralgosedice

Documento de traspaso para continuar el canal en una sesión nueva. Léelo entero antes de hacer nada.

## Preferencias del usuario (obligatorias)
- Hablar SIEMPRE en español.
- Herramientas: solo ElevenLabs (voz, música, efectos; clave en `$API_KEY_ELEVENLABS`) y Claude (todo lo demás es código).
- La voz siempre muy por encima de la música (`engine/audio.py` lo garantiza y falla si no). Gancho con energía.
- El usuario pidió: voz dinámica y no «abuelística», NO repetir «corazón/cariño» (máximo una vez por vídeo), edición dinámica.
- Entregar vídeos con SendUserFile en cuanto estén revisados; la portada es el fotograma 0.

## Identidad
- Nombre del canal: «Por algo se dice» (antes «Ya lo decía la abuela»). Usuario @poralgosedice. Bio: «Los refranes que dices… y de dónde vienen de verdad 🧵 Un refrán nuevo cada día con la abuela Remedios.»
- Estética: TODO punto de cruz sobre tela Aida (kit en `kit/`, doc `kit/KIT.md`; logo `kit/logo_avatar.png`, maqueta de perfil `kit/perfil.png`).
- Abuela Remedios: busto bordado en bastidor de madera; gesto firma «tirar del hilo» rojo (unravel).
- Voz: ElevenLabs `X1uEdaNgEu64cdmPhwUX` («Abuela Carmen», la misma voz que La lata, elegida por el usuario), stability 0.5, tempo 0.85–0.9 (≈165 ppm).
- Música: `abuela`. Biblia: `SERIE_ABUELA.md` (las secciones «CAMBIOS v2» mandan). Brief técnico: `engine/BRIEF.md`.

## Mecánicas para que sigan la cuenta
- Etiqueta «REFRÁN Nº N» fija arriba-izquierda.
- Dechado «COLECCIÓN DE LA ABUELA» 4x3 al final: casillas anteriores bordadas, la de este episodio se borda, el resto «?» + «SÍGUEME PARA COMPLETARLA».
  Iconos: Nº1 silla (Sevilla), Nº2 manga verde (Mangas verdes), Nº3 montaña con corona (Babia).
- Botón «+ SEGUIR» bordado.

## Estructura vigente (aprendida de los datos del canal de historia)
1. Primera palabra = el refrán / el tema; sin «Oye». Fotograma 0 = pregunta (refrán bordado + «?»), ya en movimiento; el sello cae cuando lo dice la voz.
2. Sin presentación al principio. Última frase: "Aquí la abuela Remedios. Sígueme, cariño, que cada día te cuento otro... porque por algo se dice."
   (bastidor grande + «ABUELA REMEDIOS» → + SEGUIR → dechado → logo «POR ALGO SE DICE» bordado y deshecho con el hilo).
3. Penúltima: pregunta de cero esfuerzo «¿…? Dime sí o no» con botones SÍ / NO bordados gigantes (o «etiquétalo»).
4. Sin tarjeta final: tail 0,6 s y bucle al fotograma 0. 55–70 s. Cortes ~1 s, punch-ins 1→1,12.
5. NUNCA counter() en años/cifras. Lo que es leyenda se dice en el «Ojo».

## Estado
- Cuenta aún sin publicar. Listos (versión de lanzamiento): `ab01_sevilla/final.mp4` (69 s), `ab02_mangas/final.mp4` (57 s), `ab03_babia/final.mp4` (57 s).
  Descripciones en `PUBLICAR.txt`. Publicar uno al día, en orden.
- Próximo paso: cuando el usuario pase visualizaciones (48 h) y curvas de retención, analizarlas (pts/s por frase) y ajustar; preparar refranes nº 4, 5, 6…
  Buenos candidatos (verificar datos antes): «Se armó la de San Quintín», «Más se perdió en Cuba», «Irse por los cerros de Úbeda», «Hacer la pelota»,
  «Tirar la casa por la ventana», «Quedarse en blanco», «Poner las peras a cuarto», «De perdidos, al río». Priorizar los que la gente dice MAL o cuyo origen sorprende.

## Cómo se produce un episodio (desde `tiktok/abuela_refranes/`)
1. Carpeta `ab0N_tema/` con `lines_in.json` ({"voices":{"ABUELA":["X1uEdaNgEu64cdmPhwUX",0.5,0.88]},"gap":0.22,"inner_cap":0.3,"lines":[{"who":"ABUELA","text":...}]}),
   `base.css`, symlink `fonts -> ../engine/fonts`. El kit se carga como `../abuela_kit/…` (symlink a `kit/`).
2. Voz: `python3 -I ../engine/gen_lines.py .`; comprobar con `python3 -I ../engine/tr.py voice_final.wav`. Etiquetas v3 ([laughs], [chuckles]) al FINAL de frase, nunca
   delante de la primera palabra (se la come).
3. Animación reutilizando `ab02_mangas/index.html` como plantilla. Todo por texto con `find()`/`w()`.
4. `bash ../engine/sheet.sh $PWD 1` (revisar todas), `node ../engine/render.js $PWD video` (si se cae: `engine/render_resumible.js`), `python3 -I ../engine/audio.py $PWD abuela`.
- Entorno: `pip install faster-whisper` (para `tr.py`). Los episodios llevan symlink `fonts -> ../engine/fonts`. `ab02_mangas/words.js` se reconstruyó
  desde `final.mp4` con `rebuild_words.py` (whisper + `lines.json`; error medio ~55 ms validado con ab01). Úsalo si falta el `words.js` de un episodio.
- Créditos ElevenLabs compartidos con los otros canales (~25.000 caracteres al traspaso). No más de 3–4 renders a la vez.
