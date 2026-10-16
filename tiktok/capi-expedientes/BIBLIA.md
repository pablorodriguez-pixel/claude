# CAPI EXPEDIENTES — Biblia del canal

**Formato:** TikTok / Reels / Shorts · 9:16 · 30–45 s
**Presentador:** Inspector Capi, un capibara detective de cine negro (gabardina beige, sombrero fedora, lupa y libreta)
**Promesa:** "La historia es mucho más rara de lo que te contaron." Cada vídeo abre un *expediente*: un caso real, absurdo y poco conocido de la historia.

## Por qué puede hacerse viral
- **El capibara** es uno de los animales más virales de internet, y el chihuahua ya está muy visto.
- **El cine negro** da una estética reconocible al instante: lluvia, neón, blanco y negro con un solo color de acento, y sello rojo de "CASO CERRADO / ABIERTO".
- **El formato es una serie:** "Expediente nº X" crea hábito, y los comentarios piden casos ("Capi, investiga…").
- **El gancho llega en el segundo 1:** una fecha y un dato imposible. **El loop final:** "Sígueme para el próximo expediente".
- **Cierre propio:** sello animado de "CASO ABIERTO". Es un elemento reconocible para que el público lo recuerde y lo comparta.

## Estilo visual
- **Fondos:** ilustraciones de época, pintadas, dramáticas, con algo de grano.
- **Capi** aparece en primer plano, abajo a la derecha, como el perro de la referencia, y va cambiando de gesto: lupa, libreta, café o señalando.
- **Subtítulos:** palabra a palabra en mayúsculas, blancos con borde negro, y la palabra clave en amarillo.
- **Música:** jazz noir de contrabajo y escobillas. **Efectos:** máquina de escribir y sello.

## Voz (ElevenLabs vía Magnific)
- **Voz:** Gonzalo Bermúdez (id 888), un narrador irónico de documental con humor. Alternativa: Rodrigo Salcedo (id 1087), más misterioso.
- **Modelo:** `eleven_v3`, stability 0.4.

---

## EPISODIO 1 — "La plaga del baile" (Estrasburgo, 1518)

### Guion (unos 40 s, con etiquetas para eleven_v3)
```
[serious] Expediente número uno. Estrasburgo, julio de 1518. Una mujer sale a la calle... y empieza a bailar. Sin música. Sin parar. Una semana después... ya son treinta. [whispers] Un mes más tarde, cuatrocientas personas bailan sin control. Y algunas, dicen las crónicas... no volvieron a levantarse. [sarcastic] ¿La solución de las autoridades? Contratar MÁS músicos. Para que se les pasara... bailando. [pause] Spoiler: no funcionó. Hoy sospechamos de histeria colectiva... o de un hongo del pan. Pero el caso sigue abierto. [chuckles] Soy el Inspector Capi... y la historia es mucho más rara de lo que te contaron. Sígueme para el próximo expediente.
```

### Planos
| # | s | Visual | Texto clave |
|---|---|---|---|
| 1 | 0–5 | Callejón medieval de Estrasburgo de noche, con niebla. Capi aparece con la lupa. Sello "EXPEDIENTE Nº1". | EXPEDIENTE |
| 2 | 5–11 | Una mujer sola bailando en trance en una plaza empedrada, al estilo de un grabado antiguo coloreado. | SIN MÚSICA |
| 3 | 11–18 | Una multitud bailando frenética y la gente agotada en el suelo. Capi se baja el sombrero. | 400 PERSONAS |
| 4 | 18–26 | Músicos con laúdes y tambores tocando sobre un escenario. Capi se pone la pata en la cara. | MÁS MÚSICOS |
| 5 | 26–33 | Un primer plano de pan de centeno con el hongo cornezuelo, como si fuera una prueba en la mesa del detective. | ¿UN HONGO? |
| 6 | 33–40 | El despacho noir de Capi: lluvia en la ventana, sello rojo de "CASO ABIERTO". | CASO ABIERTO |

### Prompts
**Personaje (hoja de referencia):**
> Photorealistic capybara standing upright like a person, wearing a beige 1940s trench coat, brown fedora hat and small round glasses, holding a brass magnifying glass, serious detective expression, full body, cut-out on plain neutral background, soft studio light, 9:16

**Planos (usando el personaje como referencia):**
1. `Foggy medieval alley in Strasbourg 1518 at night, lantern light, painted illustration style, the capybara detective in the bottom right foreground holding a magnifying glass, looking at camera, 9:16`
2. `A lone woman in 16th-century peasant clothes dancing in a trance in an empty cobblestone square, hand-colored old engraving style, dramatic light, 9:16`
3. `Huge crowd of 16th-century townspeople dancing frantically, some collapsed exhausted on the ground, chaotic painted illustration, the capybara detective in the foreground tipping his fedora in disbelief, 9:16`
4. `Medieval musicians with lutes, drums and pipes playing on a wooden stage in a town square while people dance wildly, painted illustration, the capybara detective facepalming in the foreground, 9:16`
5. `Close-up of a rye bread loaf with dark ergot fungus on a detective's desk, evidence tag, magnifying glass, moody noir lighting, 9:16`
6. `1940s noir detective office, rain on the window, desk lamp, the capybara detective sitting behind the desk, red rubber stamp reading CASO ABIERTO, 9:16`

**Animación (de imagen a vídeo, unos 6 s por plano):** movimientos de cámara lentos (dolly in o parallax), niebla y partículas, Capi parpadeando y moviendo levemente la cabeza. Sin audio en el modelo: la locución se mezcla al final.

---

## 10 próximos expedientes
1. **La Guerra del Emú (Australia, 1932):** el ejército perdió contra unos pájaros.
2. **Los gatos momificados de Egipto:** 300.000 momias usadas como fertilizante en Inglaterra.
3. **El tsunami de melaza (Boston, 1919):** una ola de 8 m de caramelo.
4. **El hombre que vendió la Torre Eiffel… dos veces** (Victor Lustig).
5. **El juicio a las ratas de Autun (1522):** las ratas tuvieron abogado.
6. **El Gran Hedor de Londres (1858):** el olor que obligó a construir las cloacas.
7. **El gato espía de la CIA** (Acoustic Kitty, 1960s).
8. **La batalla de Karánsebes (1788):** un ejército que se atacó a sí mismo.
9. **El día que un papa juzgó a un cadáver** (el Sínodo del Cadáver, 897).
10. **La isla de las muñecas (México)**, con el tono de un caso de misterio.

## Plan de lanzamiento
- **Ritmo:** 3 vídeos por semana durante las primeras 4 semanas, para encontrar el caso que funciona y doblar ese tipo de historia.
- **Primer comentario fijado:** "¿Qué caso investigo después? 🔍". Responder a comentarios con vídeo genera los siguientes episodios.
- **Bio:** "Inspector Capi 🕵️ Casos reales que la historia prefirió olvidar."
- **Variante A/B del gancho:** empezar por la fecha ("Estrasburgo, 1518…") o por el dato ("400 personas bailaron hasta…").
