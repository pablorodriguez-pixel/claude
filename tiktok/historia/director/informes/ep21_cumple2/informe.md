# ep21 Cumpleaños feliz v2 («Hazlo ahora») — VEREDICTO: PUBLICAR, por los pelos (80/100). Que pase el director independiente antes de entregarlo.

Exposición estimada: banda B. Se parece a Semana y Hora: todo el mundo canta la canción, y aquí además la comprueba con su propia voz. Puede llegar a A si el «Te he oído… y desafinas un poquito» se comparte como broma. No veo nada que le diga que algo SUYO esté mal, como pasaba con Napoleón, así que no lo pongo en A.

Vídeo medido: `ep21_cumple2/final.mp4`, 62,1 s, 1080x1920, h264 + aac, 39,3 MB. La portada es el fotograma 0 (0,0 s) y el bucle vuelve a él.

## Puertas
- P1 ✅ En español es poco conocido.
- P2 ✅ 4,5/5. La comprobación en el momento existe de verdad: hay un hueco de 2,6 s con karaoke y melodía.
- P3 ✅ El gancho dura 3,41 s (de 0,12 a 3,53). Primero estaba en 4,24 s y se corrigió con tempo 1,20 solo en L0, sin gastar créditos. La primera palabra es «Cumpleaños». Apela a «tus tartas» y no da la respuesta.
- P4 ✅ En la miniatura del perfil se lee «¿Cumpleaños feliz tenía dueño?», con la tarta gigante y la etiqueta «¿?» columpiándose. Son 4 palabras y el título empieza en y=300. El candado cae en «dueño» (2,9 s), no antes. No hay ningún sello en el gancho.
- P5 ✅ «una empresa dijo que era suya» llega a los 26 s, con el sello DUEÑO y «A pagar» / DE PAGO a los 30 s.
- P6 ✅ En pantalla solo salen datos del guion: 2015, «juez de EE. UU.», «Hoy… es DE TODOS» sin 2016, y «autor: ¿?» para «alguien». Los comentarios de ejemplo no afirman nada. ⚠️ Sigue «a verificar» lo mismo que en el guion: el motivo de los restaurantes, que se dice en tono de broma, y la fecha de la UE, que no sale.
- P7 ✅ El QA de audio.py da OK: voz −16 LUFS, música −20 LU con ducking −9 dB, SNR 27,9 dB, final −14,1 LUFS y pico −2,6 dBFS. La caja de música no se solapa con la voz: suena de 9,82 a 12,25 s, la voz calla a los 9,68 s y vuelve a los 12,37 s. En el hueco no hay ningún SFX.

## Puntuación
Tema 21/25 · Gancho+portada 16/20 · Retención 14/20 · Conversación 12/15 · Chispa 13/15 · Factura 4/5 = **80**

Queda por encima de Semana (76) porque aquí hay prueba en casa y broma con el espectador. Queda lejos de Napoleón (88) porque no le dice que algo suyo esté mal.

## Abogado del diablo
El experimento depende de que la melodía se oiga como «Cumpleaños feliz» en 2,4 s. Va a 143 negras por minuto, que es más rápido de lo que se canta en una fiesta: las 6 notas tienen que caber en el hueco aprobado de 2,6 s. Si el espectador no la reconoce o no le da tiempo a seguirla, «Te he oído» no tiene gracia y el vídeo vuelve a ser la historia de una empresa americana, como el ep20. Las notas y los tiempos los he comprobado por FFT (786/883/1044/990 Hz, en su sitio), pero NO he podido escucharlo. Hay que escucharlo antes de publicar.

## Fugas de retención (medidas)
- 9,7–12,3 s: el karaoke son 2,6 s sin voz. Es la apuesta del episodio y no es un fallo, pero si la melodía no engancha, aquí se va gente. Hay movimiento continuo: bolita, notas que se encienden, el Vecino con la mano en la oreja y el chip «♪ canta por dentro ♪».
- 5,9–9,7 s: la partitura con «Buenos días a ti» es el plano más quieto del vídeo, unos 3,8 s. La letra entra palabra a palabra y hay pluma, zoom lento y la niña cantando, pero la cabecera desaparece a los 7,5 s.
- 48,7–57,7 s: L9 dura 8,96 s. El director había dejado escrito que, si pasaba de 7,5 s, se quitara «¿Y en tu casa, cómo se canta?» de la voz. NO lo he aplicado: la pregunta abierta + «Os leo» es lo que da conversación (como en Napoleón y OK), y la línea ya va en dos planos (golpe amarillo de 6,2 s con cambios cada ~1 s, y luego la pantalla de comentarios). Si el director independiente prefiere aplicarlo, cuesta ~110 caracteres.
- 35,4–42,3 s: L7 dura 6,9 s, pero son dos planos (juez y golpe rosa «Hoy es de todos»).
- El «Ojo» dura 5,94 s, por debajo del máximo de 6. Se hizo con tempo 1,01 solo en L8, sin créditos.

## Lo que se arregló en las dos rondas de revisión
La etiqueta «¿?» se leía girada y ahora está recta. Se agrandó la tarta de la portada. La cinta «RESULTADO» se montaba sobre la cabecera y ahora sale. El sello DE PAGO y el de «QUE NO LO ERA» se salían del encuadre. Los titulares ya no se encadenan sucios (el anterior se va cuando entra el nuevo). El paso del golpe de color a la escena siguiente dejaba ver el papel durante un instante y ahora es un corte limpio. Se agrandaron los comentarios del CTA. El óvalo del Vecino tapaba al niño de la factura.

## Edición pendiente (opcional, barata)
1. [audio] Escuchar el hueco de 9,7 a 12,4 s. Si la caja de música suena flojita o rara, se ajusta en `caja_musica.py` (nivel −5 dB respecto a la voz, timbre y tempo) y se vuelve a pasar audio.py. No hace falta volver a renderizar.
2. [voz] Solo si el director independiente lo pide: L9 sin la pregunta en voz (la pregunta queda en pantalla y en el fijado).

## Chispa
- «Te he oído... y desafinas un poquito.» (con la trompetilla y el «¡ay!»)
- «Nadie te manda la factura de tus seis años.» (el matasuegras tumba la factura)
- «La canción que más has cantado tenía un dueño... que no lo era.» (DUEÑO tachado y el sello QUE NO LO ERA)
- El emú sopla las velas en el «Ojo».

## Publicación
- Post: «Cumpleaños feliz tenía dueño 🎂 Cántala con «Buenos días a ti»… ¿encaja? ¿Cómo se canta en tu casa? #curiosidades #sabiasque #musica #historia»
- Comentario fijado: «¿En tu casa es Cumpleaños feliz, Las mañanitas… o una versión que solo canta tu familia? 👇 (Y confiesa: ¿la cantaste por dentro? 🎩)»
