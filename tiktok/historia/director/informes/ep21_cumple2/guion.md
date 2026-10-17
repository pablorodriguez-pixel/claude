# ep21 Cumpleaños feliz v2 («Hazlo ahora») — VEREDICTO: ARREGLAR  (69/100 tal cual → ~81 con el guion de abajo: APROBADO PARA VOZ si se pega la versión final)

Exposición estimada: banda B (se parece a Semana y Hora: todo el mundo la canta y ahora lo comprueba con su propia voz). Techo en A si el «Te he oído» se comparte como broma. Sin el experimento, se quedaba en C, como el ep20.

Puertas (guion; P4 y P7 se miden en VÍDEO):
- P1 ✅ Muy conocido en inglés, mucho menos en español.
- P2 ✅ 4,5/5. (a) ✅ (b) ✅ «crees que es de cumpleaños y nació para dar los buenos días» (c) ✅ la canta por dentro (d) ✅ (e) ✅ «¿cómo se canta en tu casa?» abre Mañanitas y versiones de cada familia.
- P3 ❌ por poco. «la que cantas en cada tarta» lleva el gancho a ~3,6–3,8 s (18 sílabas a 0,96). El máximo es 3,5 s.
- P5 ✅ La empresa y el cobro llegan a ~22–27 s.
- P6 ❌ Dos fallos:
  1. «desde dos mil dieciséis, es de todos» solo vale para EE. UU. (acuerdo judicial de 2016). En la UE, incluida España, pasó a dominio público el 1/1/2017 (Patty Hill murió en 1946, +70 años). A verificar, pero es lo que se publicó en su día. Tal como está, es falso para medio público.
  2. «una empresa se quedó los derechos» y «tenía dueño», dicho a secas. El juez dictaminó en 2015 que la empresa (Warner/Chappell, antes Summy) nunca tuvo un copyright válido sobre la letra. Cobró durante décadas, pero no era suya. Arreglo: «dijo que era suya», y que el remate lo resuelva («un dueño… que no lo era»). Así el gancho es una provocación que se paga, no un error.
- Experimento ❌ (no es puerta, pero mata la idea): «Buenos días a todos» NO encaja en la melodía. Tiene 7 sílabas para 6 notas y el acento cae en «TO-dos», cuando la última nota es larga y aguda («fe-LIZ», «to YOU»). El espectador la canta, nota que cojea, y el «¿Encaja, eh?» le parece mentira. La letra original es «Good morning to you» → «Buenos días a TI»: 6 sílabas, con acentos en las notas 3 y 6, igual que «Cumpleaños feLIZ». Encaja de verdad y además es la traducción literal.
- Experimento ❌ (timing): «Te he oído» llega 0,3 s después de la consigna. Nadie ha tenido tiempo de cantar, así que la broma cae en el vacío. Hace falta un hueco de ~2,6 s con karaoke y la melodía antes del «Te he oído».

Puntuación (versión tal cual): Tema 20/25 · Gancho+portada 13/20 · Retención 11/20 · Conversación 11/15 · Chispa 11/15 · Factura 3/5 = **69**
Puntuación (versión final de abajo, estimada): Tema 21 · Gancho 16 · Retención 15 · Conversación 12 · Chispa 13 · Factura 4 = **~81**
(Por encima de Semana, 76: aquí hay prueba en casa y broma con el espectador. Por debajo de Napoleón, 88: no le dice que algo SUYO esté mal, sino algo que canta.)

Abogado del diablo: si el karaoke no deja tiempo o la melodía no suena, el espectador no canta. Entonces «Te he oído» es solo una frase rara y volvemos al ep20: historia de una empresa americana. El experimento entero depende de los 2,6 s de hueco con melodía y bolita.

Fugas de retención (versión tal cual, estimada a 0,96 ≈ 5,0 síl/s):
- 0,1–3,8 s — gancho largo (18 sílabas). — Arreglo: «la de tus tartas» (14 sílabas, ~2,8–3,2 s).
- 4,0–10,2 s — L1: consigna y «Te he oído» pegados. No hay tiempo para cantar y la letra no encaja. — Arreglo: partir en consigna + hueco con karaoke de 2,6 s + reacción.
- 10,4–19,9 s — L2 dura ~9,5 s de contexto (siglo XIX + hermanas + clase), a ~1,2 pts/s ≈ −11 pts. — Arreglo: quitar el siglo y dejar ≤ 6,5 s.
- 25,9–35,6 s — L4 dura ~9,7 s en una línea (película + anuncio + restaurantes). — Arreglo: partirla en dos líneas/planos.
- 35,9–42,0 s — L5 con dos fechas (2015 y 2016), la segunda falsa en Europa. — Arreglo: una sola fecha y «Hoy es de todos».
- 48,5–54,9 s — el remate repite el gancho literal («tenía dueño») sin giro. — Arreglo: «un dueño… que no lo era» (giro + precisión).

Edición propuesta (ordenada por impacto/coste):
  1. [texto] «Buenos días a todos» → «Buenos días a ti». Es el centro del experimento: tiene que encajar de verdad.
  2. [voz] Partir L1 en consigna + `gap_after: 2.6` + reacción («¿Encaja, eh? Te he oído... y desafinas un poquito.»). La pulla cariñosa es chispa pura.
  3. [visual] Hueco de 2,6 s: partitura con «Bue-nos dí-as a ti» y una bolita de karaoke que salta nota a nota; el Vecino con la mano en la oreja. Debajo suena la melodía en caja de música (6 notas: Sol Sol La Sol Do Si), generada por código y no por SFX, para que la melodía salga exacta. Va ANTES del «Te he oído» y nunca encima de la voz, así no toca el QA de `audio.py`. La melodía es de dominio público.
  4. [texto] P6: «un juez de Estados Unidos» + «Hoy es de todos» (sin 2016) y «una empresa dijo que era suya».
  5. [voz] Gancho: «la de tus tartas». Si en `words_table.txt` pasa de 3,5 s, regenerar solo esa línea.
  6. [voz] Partir «Resultado…» en dos líneas: peli/anuncio + caja registradora | camareros cantando otra cosa.
  7. [visual] Portada: «¿Cumpleaños feliz tenía dueño?» (4 palabras, por debajo de y≈260), tarta gigante con candado o etiqueta de precio, velas ya en movimiento. El sello «DE PAGO» o «DUEÑO» solo en L4/L5, nunca en el gancho.
  8. [visual] Emú soplando las velas en el «Ojo» (se reutiliza del ep20).

Versión final (pegar en lines_in.json, ~811 caracteres, ~58 s estimados a 0,96):
```json
{
 "voices": {
  "VECINO": [
   "851ejYcv2BoNPjrkw93G",
   0.0,
   0.96
  ]
 },
 "gap": 0.24,
 "inner_cap": 0.35,
 "lines": [
  {"who": "VECINO", "text": "¡Cumpleaños feliz, la de tus tartas, tenía dueño!"},
  {"who": "VECINO", "text": "Haz la prueba: cántala por dentro con esta letra: «Buenos días a ti».", "gap_after": 2.6},
  {"who": "VECINO", "text": "¿Encaja, eh? Te he oído... y desafinas un poquito."},
  {"who": "VECINO", "text": "Porque así nació: dos hermanas de Estados Unidos la compusieron para dar los buenos días en clase."},
  {"who": "VECINO", "text": "Luego alguien le puso la letra del cumpleaños... y una empresa dijo que era suya."},
  {"who": "VECINO", "text": "Resultado: ¿salía en una peli o en un anuncio? A pagar."},
  {"who": "VECINO", "text": "Y hubo restaurantes que se inventaron otra canción para no soltar ni un dólar."},
  {"who": "VECINO", "text": "Hasta que en dos mil quince un juez de Estados Unidos dijo: esos derechos no valen. Hoy es de todos."},
  {"who": "VECINO", "text": "Ojo: en tu casa siempre fue gratis. Nadie te manda la factura de tus seis años."},
  {"who": "VECINO", "text": "O sea: la canción que más has cantado tenía un dueño... que no lo era. ¿Y en tu casa, cómo se canta? Os leo."},
  {"who": "VECINO", "text": "Soy tu vecino... y esto no venía en el libro."}
 ]
}
```
Tiempos estimados (0,96): L0 0,1–3,0 · L1 3,2–7,2 · karaoke 7,2–9,8 · L2 9,8–13,6 · L3 13,8–20,2 · L4 20,4–25,9 · L5 26,1–30,0 · L6 30,2–35,4 · L7 35,6–42,0 · L8 (Ojo) 42,2–47,2 · L9 47,4–54,4 · L10 54,6–57,7 (+ tail 0,6 s). Ninguna línea pasa de 7 s y el «Ojo» dura ~5 s.
Si L9 sale de más de 7,5 s, quitar «¿Y en tu casa, cómo se canta?» de la voz y dejarlo solo en pantalla y en el fijado.

Precisión (comprobado con lo que sé; lo dudoso, marcado):
- ✅ Melodía de «Good Morning to All», de Mildred J. Hill (música) y Patty Smith Hill (letra), dos hermanas de Louisville (EE. UU.). Publicada en 1893 en *Song Stories for the Kindergarten*. La primera línea es «Good morning to you».
- ⚠️ A verificar (no se dice en voz): hay canciones anteriores con una melodía parecida, y el juicio lo comentó. «La compusieron» es la atribución estándar.
- ✅ La letra del cumpleaños aparece impresa hacia 1911–1912 y su autor es desconocido: «alguien» es exacto.
- ✅ Summy registró arreglos en 1935. Warner/Chappell compró la empresa en 1988 y cobró licencias (se cita ~2 M$/año) por cine, TV y anuncios.
- ⚠️ Los restaurantes con canción propia (cadenas de EE. UU.) son un hecho muy citado. Que lo hicieran por los derechos es el motivo habitual, pero no está probado en todos los casos; lo dice en tono de broma («ni un dólar»). Aceptable.
- ✅ El 22/9/2015, el juez federal George H. King (Los Ángeles) dictaminó que Warner no tenía un copyright válido sobre la letra. En 2016 se aprobó el acuerdo: dominio público en EE. UU. y 14 M$ devueltos.
- ⚠️ A verificar: en la UE, dominio público desde el 1/1/2017. Por eso se quitó 2016 de la voz; «Hoy es de todos» es cierto en ambos lados.
- ✅ Cantarla en privado nunca necesitó licencia: los derechos cubren la ejecución pública.
- Fuera: «hermanas americanas» → «de Estados Unidos», mejor para el público latino.

Chispa:
- «Te he oído... y desafinas un poquito.»
- «Nadie te manda la factura de tus seis años.»
- «La canción que más has cantado tenía un dueño… que no lo era.» (la frase para el bar)

Publicación:
- Post (141 caracteres): «Cumpleaños feliz tenía dueño 🎂 Cántala con «Buenos días a ti»… ¿encaja? ¿Cómo se canta en tu casa? #curiosidades #sabiasque #musica #historia»
- Comentario fijado: «¿En tu casa es Cumpleaños feliz, Las mañanitas… o una versión que solo canta tu familia? 👇 (Y confiesa: ¿la cantaste por dentro? 🎩)»

Siguiente paso: pegar la versión final, generar la voz, revisar en `words_table.txt` que L0 dure ≤ 3,5 s y L9 ≤ 7,5 s, y volver a pasar por VÍDEO. Mide el experimento a 48 h: retención en 7–10 s (el karaoke) frente a la curva de Semana. Esa es la única variante nueva de este vídeo.
