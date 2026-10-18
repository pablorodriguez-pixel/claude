# ep39 Siesta v3 (vuelta 4) — VEREDICTO: ARREGLAR  (79/100)
Tercera revisión del director independiente. No he leído informe.md. He ejecutado medir.py, he mirado los fotogramas cada 0,5 s (0–59,5 s) y a resolución completa en 48,0 / 49,8 / 51,0 s. También he medido final.mp4 (ebur128 con pico real y astats) y he pasado Whisper (tr.py) al gancho.

Le falta UN punto, y el arreglo es gratis: el titular «la décima» sale 1,4 s ANTES de que lo diga la voz y se carga la pausa del remate. Es un fallo de código, no de guion. No hay que gastar voz.

Exposición estimada: banda B (se parece a Semana/Hora: algo cotidiano e hispano que se comprueba con el reloj, pero el espectador lo acepta sin pelearse; no tiene el «me lo dices a MÍ» de OK o Napoleón).

Puertas: P1 ✅ P2 ✅ (4/5, justo) P3 ✅ P4 ✅ P5 ✅ P6 ✅ P7 ✅ P8 ✅ P9 ✅ P10 ✅ P11 ✅
- No suspende ninguna.
- P7: arreglado. final.mp4 tiene un pico real de −2,2 dBTP y un pico de muestra de −2,6 dBFS, a −14,1 LUFS (LRA 4,3). El QA da 27,7 dB de voz sobre la música. El gancho (0–3,5 s) suena a −10,8 LUFS: tiene energía y no va susurrado.
- P3: «¡Siesta es un número! Y te la echas casi todos los días.» dura 3,32 s y ya no tropieza con «te LO echas». Aviso: Whisper oye «Si esta es un número» porque «Siesta» se dice en 0,33 s. El titular de portada lo deja claro, así que no suspende. Pero si alguna vez se regenera L0, pide más peso en «Sies-».
- P8: «es la décima» (49,37 s) sigue siendo el dato más fuerte. Ahora además tiene la tira I…X con la X en rojo (49,4 s) y el sello X sobre «La tuya 15:30». PERO el titular lo destripa (fuga 1, abajo).

Lo que pedía independiente2.md:
1. Pico del mp4: HECHO (−2,2 dBTP).
2. Ojo en ≤ 5,5 s: HECHO. L7 dura 4,07 s («la primera hora iba de seis a siete, así que la sexta acababa a las doce»), con dos planos: I/II/III con «6:00–7», y la tira I–VI con el sello «VI → 12:00» en 42,4 s.
3. L0 «te la echas»: HECHO.
4. Reloj de la pregunta final a tamaño completo: HECHO (54,0 s, sin plano vacío).
5. Tira I…X bajo «La tuya 15:30»: HECHO. Es pequeña (casillas de unos 50 px), pero se lee y se puede contar.

STORYTELLING Y RITMO: aprueba. Son 11 frases completas con conectores, 175 ppm, y ninguna pasa en menos de 1,5 s (L9 dura 2,23 s). Cada paso tiene su titular fijo y el plano cambia cada 1,5–2 s. La plantilla Napoleón se cumple entera. El vídeo dura 59,7 s.

Puntuación: Tema 17/25 · Gancho+portada 16/20 · Retención 17/20 · Conversación 13/15 · Chispa 12/15 · Factura 4/5 = 79
- Retención +1: el Ojo baja de 6,6 a 4,1 s y desaparece el plano vacío del cierre.
- Conversación +1: con la tira I…X cualquiera cuenta «yo a las 4… la undécima».
- Factura +1: el pico ya está bien.
- No llega a 5 por el destripe de «la décima» y por el subrayado rosa de «tuya», que en el móvil parece un tachado.
- El techo sigue siendo el Tema, con 17/25. El vídeo calibrado más cercano es Semana (≈ 76) y este queda un poco por encima porque la factura y el remate están mejor.

Abogado del diablo: es una etimología con una clase de horas en medio. Quien ya sabía lo de «sexta» se va en el s 4–7. Al resto se le paga en el s 7 y luego tiene 30 s de mecánica (15–44 s) antes del único dato que le toca a ÉL. Si encima el titular le chiva «la décima» antes de oírla, se pierde el único «¡anda!» del vídeo.

Fugas de retención:
- 4,0–7,6 s — L1 paga la promesa enseguida y quien lo sabía se va — no se toca (es la plantilla); lo sostiene el bucle de L3 (11,5–14,9 s).
- 8,06–11,17 s — marca de 3,1 s, a 2,4–3,2 pts/s — no alargar.
- 15,4–23,4 s — L4, 8,0 s de contexto (~1,2 pts/s) — aguanta, porque tiene 4 planos (templo, reloj tachado de noche, amanecer, reloj de sol I-II-III).
- 30,1–39,2 s — L6 dura 9,0 s, pero en 5 planos (sol y termómetro, pan, reloj de sol VI con zzz, SEXTA→SIESTA, hamaca) — aguanta.
- 48,0–49,4 s — FUGA 1: la voz dice «eso ya no es la sexta…» y el titular ya pone «Para un romano… la décima». El suspense de la pausa está muerto. Causa: en headline() la palabra «la» de *la décima* casa con el «la» de «la sexta» (en 48,0 s) y no con el de «la décima» (49,3 s). Arreglo abajo, gratis.
- 54,1–56,3 s — pregunta final (~2 pts/s) — normal.

Edición propuesta (ordenada por impacto/coste):
  1. [visual] En si_scenes_b.js, línea 318, partir el titular en dos para que «la décima» aparezca con la voz (49,37 s):
     headline(S.R1b[0], K.decima - 0.12, 'Para un romano…', { size: 88 });
     headline(K.decima - 0.12, S.R1b[1], 'Para un romano… *la décima*', { size: 88, hlT: K.decima });
     Comprueba en los fotogramas 48,0 / 48,5 / 49,0 que solo pone «Para un romano…» y que en 49,5 ya pone «la décima» subrayada. Si «Para un romano…» parpadea en el cambio, en el segundo titular hay que forzar que esas palabras salgan ya visibles. Sube Retención/Chispa +1. Gratis.
  2. [visual] «La tuya» (líneas 311 y 338): cambiar hlSpan('tuya', …, PINK) por YEL, como «La de verdad». El rosa sobre la tarjeta gris, a tamaño de móvil, parece un tachado («la tuya no»), y eso contradice lo que quieres decir. Gratis, +0,5 de factura.
  3. [voz, opcional, NO para esta vuelta] Si algún día se regenera L0, pide más peso en «Sies-» para que Whisper no oiga «Si esta».
Con el 1 llega a 80. Con 1+2, a 80–81. No hace falta voz ni otra revisión completa: después del render basta con que yo vea los fotogramas 47,5–50,0 s (cada 0,25 s) y vuelva a medir el pico de final.mp4.

Chispa (para las respuestas a comentarios):
- «¿A las cuatro? Eso es la undécima. Tú no duermes la siesta: duermes la once.»
- «Los romanos se la echaban con reloj de sol. Tú tienes despertador… y aun así llegas tarde.»
- «Cada vez que dices "me echo la siesta" estás diciendo "me echo la sexta". En latín, pero lo dices.»

Publicación (para cuando se apruebe el arreglo 1):
- Post: «Tu siesta es un número romano… y casi seguro que te la echas tarde. ¿A qué hora es la tuya? #siesta #historia #curiosidades #latin»
- Comentario fijado: «Sé sincero: ¿a qué hora te echas tú la siesta? Te digo qué hora romana te toca 👇»
