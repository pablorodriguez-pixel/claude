# EL BECARIO — formato (render 3D con IA + historia tipo X)

**Referencias del usuario**
- Historia: vídeo de X (@BrunoF566, «animation explainer»): un becario le pregunta a un millonario en su jet privado.
- Acabado: reel de @sanmunoz.ia («Claude… ¿mi jefe?»): personajes 3D estilizados, rasgos facetados, luz de cine,
  generado con IA de vídeo (no Blender).

## Cómo está construida la historia de X (transcrita, 56 s)
| s | Quién | Función | Ejemplo de X |
|---|---|---|---|
| 0 | Novato | **Pregunta-gancho** que choca con lo que todos creen | «¿Por qué los milmillonarios tienen 20 tarjetas… eso no es deuda?» |
| 5 | Mentor | **Respuesta al revés**, en una frase | «Para ellos no es deuda. Es una máquina de imprimir dinero.» |
| 9 | Novato | «¿Qué? ¿Cómo?» (el espectador pregunta con él) | |
| 10 | Mentor | **El mecanismo**, simple, con un plano que lo enseña | 30 días con el dinero en cuenta remunerada |
| 22 | Novato | «¿Cuánto es eso?» | |
| 23 | Mentor | **La cifra** | 1 M al mes al 5 % → 4.000 $/mes |
| 30 | Novato | **La objeción** | «¿Y la factura?» |
| 31 | Mentor | La regla + **«y aquí viene lo bueno»** + el contraste con la gente normal | la pagan entera; los demás pagan un 28 % |
| 48 | Novato | **El golpe**: se da cuenta de que va por él | «Espera… ¿tenemos la misma tarjeta?» |
| 49 | Mentor | **Remate** que implica al espectador | «El banco apuesta a que te despistes. Tú no estás jugando bien.» |
Planos: casi todo en el jet (dos sillones, frente a frente) + **un plano de apoyo por concepto** (cámara acorazada,
calendario día 1 → día 30, contador 0 → 1.000.000, la persona ahogada en cartas del banco). Subtítulos palabra a palabra.

## Elenco
- **El mentor — Arturo**, 62. Empezó de botones en un hotel y hoy tiene fondos y hoteles. Traje azul marino, pelo canoso
  peinado hacia atrás, barba corta blanca, reloj discreto. Tranquilo, nunca presume; habla bajo y con cifras. Voz: Jaime.
- **El becario — Dani**, 23. Primer sueldo (1.400 €). Sudadera gris con capucha, acreditación «BECARIO», zapatillas
  blancas, pelo despeinado. Pregunta lo que pregunta todo el mundo. Voz: joven, otra voz de ElevenLabs.
- Secundarios por episodio (la azafata, el del banco, «la gente normal»).

## Estilo de render (prompt base para el generador)
> Stylized 3D animated film still, characters with sculpted faceted planes on the face (low-poly sculpt look),
> soft subsurface skin, cinematic soft key light and warm practicals, shallow depth of field, rich materials
> (leather, wood, brushed metal), muted palette with warm amber accents, vertical 9:16 composition.

## Producción (cuando haya créditos de generación de imagen y vídeo)
1. Hojas de personaje de Arturo y Dani (3-4 variantes) → aprobar → guardar como referencia fija.
2. Por episodio, 8-12 planos de 3-5 s generados con las referencias (Seedance / Kling) → voces ElevenLabs → montaje con
   subtítulos, cifras y efectos (pipeline de `../a-escala/build/`).
3. Datos: cada cifra con fuente en el `guion.md` del episodio. Aviso: «Contenido educativo · no es asesoramiento financiero»
   y la etiqueta de contenido generado con IA de TikTok/Instagram.
