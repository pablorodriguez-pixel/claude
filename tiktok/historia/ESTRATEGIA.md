# Estrategia para volver a crecer — «Esto no venía en el libro»

Basada en: la investigación de fuentes (informe «Mejorar canal TikTok curiosidades»), la auditoría del agente editor (`.claude/agents/editor-video.md`), el análisis de las cuentas @llegendes_catalanes y @leyendas.espanolas, la búsqueda de historias con viralidad demostrada y las pruebas de voz con ElevenLabs.

## 1. Diagnóstico en tres frases
1. **Los temas ya no impactan.** Los éxitos (Napoleón, OK, Ñ, bolsillo) desmontaban algo que TÚ crees o usas. Los fracasos eran datos o leyendas sobre los que nadie tenía una idea previa.
2. **Explicábamos en vez de contar.** Listas («tres cosas»), diapositivas que cambian cada 4 s y una cola de 10-28 s («Sígueme», «Ojo», «O sea», «Confiesa», «Os leo») cuando la historia ya había acabado.
3. **No es un castigo de TikTok.** Los éxitos pasados no cuentan: cada vídeo gana su alcance solo, y lo decide el primer segundo y si la gente acaba el vídeo.

## 2. El cambio: «Cuentos del rellano»
Lo que se **mantiene**: el Vecino (voz pícara), el humor, el estilo de dibujo y «Y esto… no venía en el libro».
Lo que **cambia de raíz**:

| Antes | Ahora |
|---|---|
| Un dato y tres razones | **Un cuento**: protagonista → problema → PERO → ASÍ QUE → giro → remate que vuelve al principio |
| 10-13 fondos distintos, corte cada 4 s | **Un mundo por acto**; la cámara lo recorre (sigue a los personajes); solo 2 cortes duros: el giro y el salto al presente |
| Portada quieta con «¿Por qué…?» | **Fotograma 0 en marcha**: el momento más fuerte ya pasando y el título encima |
| «Sígueme» a mitad + cola de 4 remates | **Nada a mitad**; al final, una pregunta concreta con «Os leo» pegado y la firma |
| Sellos, chips y titulares a la vez | **Máximo 3 capas**: decorado + personaje + subtítulo (un rótulo solo cuando hace falta) |
| El Vecino fijo en el óvalo | El Vecino **aparece con intención** (remate o aparte), no todo el vídeo |
| Música de ragtime muy baja, un «whoosh» por plano | **Música de cuento** (ElevenLabs) a −15 LU que **sigue la tensión** (baja, silencio, sube); un efecto por golpe, no por plano |
| Voz «leída» | **Voz interpretada**: MAYÚSCULAS para énfasis, «…» para pausas, etiquetas a mitad de frase, estabilidad 0,5, pausas de 0,55-0,9 s |

## 3. Qué temas (filtro de 4 preguntas; si falla una, fuera)
1. ¿El espectador lo **usa, lo dice o lo cree** hoy, o la historia tiene un **protagonista con una trampa ingeniosa**?
2. ¿Hay un **giro** que nadie espera?
3. ¿Se entiende en **1 segundo** el gancho?
4. ¿Provoca un «a mí me decían…», «en mi pueblo…» o «¡no me lo creo!»?

**Cola de producción** (historias con viralidad demostrada en otras plataformas; ver `director/investigacion/historias_virales.md`):
1. Estar como una cabra (hecho, ep92) · 2. Síndrome K (hecho, ep93) · 3. Sodeto: todo el pueblo ganó el Gordo menos uno (publicar en diciembre) · 4. Leo Reuss, el actor judío al que aplaudieron los nazis · 5. «Pidieron munición y les mandaron caramelos» (Tootsie Rolls) · 6. Williamina Fleming («¡mi criada lo haría mejor!») · 7. El brazo del Laocoonte · 8. Nintendo humilla a Sony y nace la PlayStation · 9. Ecce Homo de Borja · 10. Esperar 2 horas para bañarse (mito) · 11. «Ojalá» · 12. El chicle de 7 años (mito) · 13. Henry «Box» Brown · 14. La carta de Jourdon Anderson · 15. El futbolín.

## 4. Cómo se publica
- **1 vídeo al día como máximo** (mejor 4-5 por semana con temas filtrados que 3 al día). Hora: 20:00 (sábados 18:00).
- **Texto del post**: la frase que la gente buscaría («de dónde viene estar como una cabra») + 3-5 hashtags.
- **Cada episodio sale con `portada.jpg` (fotograma del gancho, sin subtítulos, lo genera `hacer.sh video`) y `descripcion.txt` (descripción + hashtags + comentario fijado).**
- **Comentario fijado**: la fuente o una segunda curiosidad.
- **Responder con vídeo** a los mejores comentarios (función oficial de TikTok).
- Revisar en **TikTok Studio** si algún vídeo sale «no apto para recomendación» o con etiqueta de IA.

## 5. Cómo medimos (después de 48-72 h)
| Señal | Meta |
|---|---|
| Retención a los 3 s («vistos vs deslizados») | > 70 % |
| % que ve el vídeo entero | sube respecto a los últimos 15 |
| Compartidos / vistas | > 1 % |
| Vistas | > 10k en uno de los dos primeros = el formato funciona |
Se cambia **una variable cada vez**. Si los dos primeros superan claramente la media de los últimos 15 (≈2k), seguimos con la cola; si no, probamos la variante B (sketch de dos voces con Text to Dialogue).

## 6. Siguiente upgrade técnico (por orden)
1. **ElevenLabs v4** (mismo precio, encadena mejor las frases) y **toma única del vídeo entero** con Text to Dialogue (suena seguido, sin cortes entre líneas). Arreglar la caché de `gen_lines.py` (hoy solo mira el número de línea).
2. Subtítulos que acumulan la frase, con la palabra clave en otro color.
3. Ambientes en bucle (calle, viento, hospital) generados una vez con ElevenLabs y reutilizados.
4. Transiciones «firma» planificadas en el guion: objeto que la cámara sigue, zoom que atraviesa, corte por forma.

**Créditos ElevenLabs**: quedan ≈1.000-1.800. Cada vídeo de 65 s ≈ 870 caracteres. Hay que recargar para mantener 4-5 vídeos por semana.

## 7. Estado de publicación
- **Subidos:** ep94 hora de Hitler (viral), ep96 Madrid por la izquierda (viral), ep98 autovías, ep99 reloj de las uvas.
- **En la recámara:** ep100 Gran Vía (al usuario le parece aburrido: es una lista de nombres sin nada que el espectador use a diario).
- **Lo que funciona:** algo que haces cada día y que no siempre fue así, con un culpable o un giro, y un remate que puedes comprobar tú mismo (el Metro, el reloj).

## 8. Lección del récord: autovías (756.000 vistas, 34.400 me gusta, 11.500 compartidos, 7.500 guardados en 1 día)
Lo que hizo que se parara el dedo, y que se aplica a TODOS los vídeos desde ahora:
1. **El fotograma 0 es la idea entera en una imagen**, y mezcla dos cosas conocidas que no pegan juntas (el mapa de España + un reloj). No entiendes por qué están juntas → te quedas a verlo.
2. **El título es la afirmación sorprendente, no una pregunta**: «LAS AUTOVÍAS VAN COMO LAS AGUJAS DEL RELOJ». Grande, dos líneas, arriba.
3. **Algo reconocible al instante y nuestro**: el mapa de España se lee en medio segundo. Mejor un mapa, un objeto o un sitio que todo el mundo conoce que un personaje genérico.
4. **Se guarda y se comparte porque sirve**: los guardados (1 %) y los compartidos (1,5 %) dicen «esto lo voy a usar / se lo mando a alguien». Siempre que se pueda, un remate práctico o comprobable.
Checklist de portada antes de renderizar: ¿se entiende el tema sin sonido? ¿hay dos cosas que no deberían estar juntas? ¿el título afirma algo?

## 9. Lección del reel de @resultaaquee (mismo canal: 60.000 vs 10,5 millones)
Tres reglas, y las tres se cumplen antes de escribir el guion:
1. **De qué hablas: de algo que el espectador vive cada día (o tiene en la cabeza) pero en lo que nunca se había fijado.** No hace falta que lo tenga en la mano: vale cualquier cosa de su día a día. La reacción que buscamos es «lo veo todos los días y nunca había caído». El AirTag (no todo el mundo tiene uno) se quedó en 60.000; la pantalla del móvil llegó a 10,5 M. Ejemplos del canal: las autovías y el reloj, Madrid por la izquierda, la hora de Hitler.
2. **El primer segundo se mueve y sorprende.** Nada de un objeto quieto: un dedo gigante tocando la pantalla. En el fotograma 0 ya está pasando algo, en primerísimo plano.
3. **No lo cuentes: enséñalo.** Si la voz explica un mecanismo, la imagen lo hace a la vez (la electricidad sale hacia el dedo y un número baja de 100 a 62). Menos rótulos que repiten la voz; más proceso animado, con números que cambian y cosas que se mueven.
Estilo que funciona: primer plano macro, fondo oscuro y limpio, una sola idea por plano, subtítulo pequeño arriba con la palabra clave resaltada.
Antes de renderizar: ¿es algo de su día a día en lo que nunca se había fijado? ¿el fotograma 0 se mueve? ¿hay algún plano donde la voz cuenta algo que la imagen no enseña?

## 10. Datos reales (perfil a 9.550 seguidores)
| Vídeo | Vistas | Lectura |
|---|---|---|
| Autovías como un reloj | 772.600 | Algo que usas + imagen-idea (España = reloj) |
| «OK» falta de ortografía | 132.500 | Palabra que dices cada día + giro |
| Napoleón no era bajito | 118.700 | Mito que todos «saben» + se desmonta |
| Ventanilla o aire | 3.560 | Consejo ya muy oído: no sorprende |
| Reto bostezo | 2.728 | Truco de reto: no aporta nada que contar |
| El muerto de Huelva | 254 | Historia de guerra, ajena: el protagonista no eres tú |
Regla que sale de aquí: **el protagonista es el espectador** (su cena, su carretera, su palabra). Hitler funcionó porque iba de TU hora de cenar, no de Hitler. Historias ajenas (guerra, espías) y consejos conocidos, fuera. Lo que funciona además se comparte para «hacerse el listo»: un dato que puedes soltar en una cena.
**Filtro anti-obvio, frase a frase (no solo el tema):** cada dato del guion pasa la pregunta «¿esto lo sabe ya casi todo el mundo?». Si la respuesta es sí, se quita aunque el tema sea bueno. Ejemplo: en las matrículas, «cuanto más lejos de la B, más nuevo el coche» lo sabe cualquiera y bajó el final. El remate tiene que ser siempre el dato más sorprendente del vídeo, nunca uno de relleno.

## 11. Zonas que tapa la interfaz de TikTok (1080×1920)
- **Arriba, y 140–250:** pestañas «Siguiendo / Para ti» y la lupa. Los títulos empiezan en **y ≥ 280**.
- **Derecha, x > 935 entre y 740 y 1650:** botones (perfil, me gusta, comentarios, guardar, compartir). Nada importante pegado a la derecha.
- **Abajo, y > 1600:** usuario, descripción y barra de progreso. Los rótulos inferiores van en **y ≈ 1475** (justo bajo los subtítulos, que están en 1380).
La hoja de contactos (`hacer.sh hoja`) pinta estas zonas en rojo: si un texto cae en rojo, se mueve antes de renderizar.
