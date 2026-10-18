# ep38 Petrov v3 (tercera revisión) — VEREDICTO: ARREGLAR  (79/100; ~81 con un único cambio sin gastar créditos)
Exposición estimada: banda C con techo en B. Se parece a Einstein y Semana en claridad y factura, pero el tema sigue siendo «historia de otros», como SOS. Lo que puede sacarlo de la C es el «wow» que se comparte («estás vivo gracias a…», «y tú, hasta hoy»), no el debate.
Director independiente. No he leído informe.md. He ejecutado medir.py, he mirado los fotogramas del gancho, la hoja y los fotogramas cada 0,5 s de 44–48 s y 54–78,5 s, y he pasado Whisper por el Ojo (55,3–61,8 s) y por L6.

## Qué se ha arreglado desde independiente2 (comprobado en imagen y audio)
- L10: «¿Tú qué habrías hecho en su silla: creerte la pantalla, o creerte a ti? Os leo.» Ya no hay ambigüedad con «colgar», y el titular no pisa el monitor. ✅
- L9: «… y tú, hasta hoy.» Cierra el bucle del segundo 0. Es la frase de bar que faltaba. ✅
- L8 (Ojo): dura 6,06 s. Está en el límite y se acepta.
- El sello «FALSA ALARMA» entra entero (46,0–46,5 s). ✅
- La tarjeta de «Y tres» ya no se queda vacía: «La verdad» entra en 47,0 s, el check en 47,5 s y «¡TENÍA RAZÓN!» con la voz (48,0 s). ✅

## El Ojo a tempo 1,15: NO suena atropellado
- Va a 5,6 sílabas/s de media (6,95 contando solo el habla). Es lo mismo que L1 (5,8) y menos que el gancho (6,4). Whisper lo transcribe perfecto aunque suene la música.
- La segunda frase («le cayó una bronca por el papeleo de esa noche», 59,5–61,6 s) va rápida, a unas 7,8 sílabas/s, pero se entiende y los subtítulos aguantan. No se toca.

## Lo que SÍ suena atropellado: L6, el clímax
- «Así que cogió el teléfono y les dijo a sus jefes» va de 42,93 a 44,57 s: unas 14 sílabas en 1,64 s, o sea, 8,5 sílabas/s. Es la frase más rápida del vídeo y es la decisión de Petrov.
- «Es una falsa alarma» dura 1,0 s (45,53–46,53) y a los 0,5 s ya está «Y tres». El sello «FALSA ALARMA» se ve unos 1,2 s (de ~45,8 a 47,0). La rúbrica pide ≥ 1,5 s de plano y 0,6–0,9 s de respiro tras cada dato clave. Aquí no se cumple justo en el dato que da sentido al título.

Puertas: P1 ✅ · P2 ⚠️ (dispensada: la cola de «historias con drama» la aprobó el usuario; le pone techo al Tema) · P3 ✅ (3,0 s, «tú», no destripa) · P4 ✅ («¿TE SALVÓ LA VIDA?» + MISIL gigante; se lee en la miniatura de 150 px) · P5 ✅ (6,8–10,0 s) · P6 ✅ con matiz (ver Precisión) · P7 ✅ (SNR 28 dB, -14,0 LUFS, pico real -1,7 dBTP) · P8 ✅ · P9 ✅ · P10 ✅ («¿Un tío salvó el mundo y nadie lo sabe?») · P11 ✅
- Ninguna puerta suspendida.

Puntuación: Tema 14/25 · Gancho+portada 17/20 · Retención 17/20 · Conversación 13/15 · Chispa 13/15 · Factura 5/5 → 79

Storytelling y ritmo: se cuenta de corrido, con conectores y en orden causal, y sigue la plantilla Napoleón entera. La chispa ha subido: «sin levantarse de la silla», «la bronca por el papeleo» y «y tú, hasta hoy» son tres frases que se pueden citar. Se queda un punto por debajo del listón por el ritmo de L6: el momento que tendría que respirar es el que más corre.

Abogado del diablo: es «historia de otros», y el que no se engancha con «estás vivo» en 3 s no vuelve. Al que se queda, el clímax («cogió el teléfono… falsa alarma») le pasa a 8,5 sílabas/s y en 1,2 s de sello. La emoción que tiene que sostener el «te salvó la vida» se escapa justo ahí.

Fugas de retención:
- 10,5–16,8 s: la marca (3,1 s) y el bucle (2,8 s) no traen nada nuevo. Es la mayor fuga (2,4–3,2 pts/s), pero es lo que pide la plantilla y va después de pagar la promesa. No se toca.
- 17,1–30,7 s: L4 dura 13,6 s. El contexto (militar, satélites) pierde ~1,2 pts/s. Lo sostienen los planos que cambian cada ~1,5 s y el «¡CINCO!». No hay arreglo barato.
- 42,9–47,0 s: L6, el clímax, va atropellado y se pisa con «Y tres». Arreglo: el 1 de abajo.
- 70,4–75,2 s: la pregunta final (~2 pts/s). Es inevitable y ahora está bien planteada.

Edición propuesta (ordenada por impacto/coste):
  1. [voz, 0 créditos: solo cambia el tempo] En lines_in.json, L6 («Así que cogió el teléfono y les dijo a sus jefes: «Es una falsa alarma».»): añade "tempo": 0,92 y sube "gap_after" de 0,5 a 0,8. Vuelve a generar SIN borrar clips/06.* (se reaprovecha el clip). Luego words.js, render y audio.py.
     Así L6 pasa de 3,6 s a ~3,9 s, con ~6,9 sílabas/s en la primera mitad, y el sello «FALSA ALARMA» aguanta ~1,8 s antes de «Y tres». Todo va anclado con find(), así que el resto se desplaza solo. Comprueba con la hoja que «¡TENÍA RAZÓN!» sigue entrando con la voz.
     Si gen_lines.py no acepta tempo < 1 por línea, como mínimo deja el gap_after en 0,9: con eso el sello ya aguanta ≥ 1,5 s.
  2. [visual, gratis, opcional] Del 54,6 al 55,2 s, la píldora «¡Ojo!» cae encima del centro de la medalla antes de subir a la cabecera. Que entre directamente en la cabecera.
  Con el 1: Retención 18 → 80–81. PUBLICAR.

Chispa (alternativas del Vecino, para las respuestas a comentarios):
  - «Salvó el mundo y le riñeron por el papeleo. Funcionarios: iguales en todas partes. 🎩»
  - «La próxima vez que te quejes de tu jefe, acuérdate de los de Petrov. 🎩»
  - «Cinco misiles en pantalla y él, tan tranquilo. Yo con un correo de “¿tienes un minuto?” ya sudo. 🎩»

Publicación (para cuando esté aplicado el 1):
  Post: «Una pantalla dijo MISIL cinco veces y un señor no se la creyó. Así evitó una respuesta nuclear. Y tú, sin saberlo.» #historia #guerrafria #curiosidades #nolosabias
  Comentario fijado: «Pantalla en rojo, cinco misiles y minutos para decidir. ¿Tú te habrías fiado de la máquina o de tu instinto? Os leo 🎩👇»

Precisión (a verificar antes de publicar):
- «A medianoche»: fue poco después de las 00:00 del 26/09/1983, hora de Moscú. Vale.
- «Era el sol, reflejado en las nubes»: es la explicación aceptada. Vale.
- «Quince años después»: se supo en 1998. Vale.
- «No le dieron ni una medalla»: en su momento, no. Pero años después recibió premios internacionales, entre ellos uno en Dresde en 2013 (a verificar). Va dentro del Ojo y con «según contó él» para la bronca, así que no suspende P6. Ten preparada la respuesta: «En su día, ni una. Los premios le llegaron décadas después, desde fuera. 🎩»
- «Paró una guerra nuclear» (L1 y el rótulo «Paró»): es el relato habitual, pero en la cadena de mando había más gente. Como gancho se acepta. En el post y en las respuestas, «evitó una respuesta nuclear».
