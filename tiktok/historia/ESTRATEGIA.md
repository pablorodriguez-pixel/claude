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
