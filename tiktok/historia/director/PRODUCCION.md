# Encargo de producción (para un agente animador)

Trabajas en /home/user/claude/tiktok/historia. Antes de nada lee ENTEROS: CONTEXTO.md, SERIE_HISTORIA.md, ../engine/BRIEF.md,
director/RUBRICA.md, .claude/agents/director-creativo.md (en /home/user/claude/.claude/agents/) y el guion.md del director para tu episodio
(director/informes/<ep>/guion.md: sus notas visuales son OBLIGATORIAS).

Pasos:
1. Prepara la carpeta: copia base.css de ep13_septiembre, `cp -r ep07_ok/kit <ep>/kit`, `ln -s ../engine/fonts <ep>/fonts`. No toques lines_in.json salvo
   para arreglar pronunciación (cuenta los caracteres que gastas; regenerar una línea = borrar clips/NN.*).
2. Voz: `cd <ep> && python3 -I ../engine/gen_lines.py .` y comprueba con `python3 -I ../engine/tr.py voice_final.wav`. Si se come o pronuncia mal una palabra, arréglalo.
3. Animación: index.html + tus .js (plantilla: ep13_septiembre/ y ep20_cumple/ — reutiliza sus figuras y escenas). Todo clavado por texto con find()/w().
   Reglas v3 + fallos sistemáticos de CONTEXTO.md: título de portada con borde superior ≥ 300 px (recorte del perfil), pregunta en el fotograma 0 y en movimiento,
   el sello cae cuando lo dice la voz, nada de counter() en cifras, un plano nuevo cada 1–2 s, cameo del emú, cierre con balcón + libro «Ep. N · título», tail 0,6 s y bucle.
4. Revisión propia: `bash ../engine/sheet.sh $PWD 1` y mira TODAS las hojas; itera mínimo 2 rondas.
5. Render: `node ../engine/render.js $PWD video` (en background, espera). Audio: `python3 -I ../engine/audio.py $PWD ragtime` (debe pasar el QA).
6. DIRECTOR modo VÍDEO: sigue tú mismo .claude/agents/director-creativo.md sobre tu final.mp4 con ojos de director exigente, sin autocomplacencia
   (ejecuta director/medir.py y mira los fotogramas). Escribe director/informes/<ep>/informe.md. Si la nota es < 80 o falla una puerta,
   aplica la edición propuesta y repite 5–6 (máximo 2 vueltas más). Sé honesto con la nota final.
6b. Tu autoevaluación NO basta: después, el coordinador lanza un DIRECTOR INDEPENDIENTE que no ve tu nota. Sin su PUBLICAR no se entrega.
7. No hagas commits. Devuelve: ruta de final.mp4, duración, nota final del director con el desglose, caracteres gastados, texto del post y comentario fijado,
   y cualquier dato que siga «a verificar».
RENDER EN COLA: lanza SIEMPRE el render completo con `flock /tmp/claude-0/render.lock node ../engine/render.js $PWD video` (así los animadores no renderizan a la vez y no se ahoga la máquina). Las hojas/capturas sueltas (sheet) no necesitan cola.
