# Upgrade de edición y comunicación — «Esto no venía en el libro»

**Editor jefe · 23/10/2026.** Hemos comparado dos referencias de @llegendes_catalanes (El Pont del Diable, 150 mil; Les quatre barres) con el OK (ep07, 91 mil), Botones (ep82, 6,4 mil), Ceniceros (ep90, 1,1 mil) y Relojes (ep91).

**Cómo se ha medido.** Fotogramas a 2 fps de los seis vídeos enteros, con hojas de 10 s. El fotograma 0 se ha mirado a tamaño completo. Los cortes se han detectado con `ffmpeg scdet`. Las referencias se han transcrito con faster_whisper `small` y marcas de tiempo por palabra; para nuestros vídeos se han usado sus `words.json`. Sobre el audio se han medido las pausas, el nivel de la música en los huecos y el espectrograma. El material de trabajo está en `scratchpad/an/`.

---

## 0. Resumen en 6 líneas

1. La referencia no corta más que nosotros. **Corta menos, pero mueve más**: monta **un solo decorado** por vídeo y la cámara lo recorre. Un plano dura de media unos 8 s, con un movimiento de cámara cada 2,5–3 s. Nosotros cortamos cada 4,5 s, entre diapositivas casi quietas, y cada una tiene fondo distinto.
2. La referencia **cuenta una historia con personaje, deseo, trato y trampa**, y después hace un giro de registro a «la verdad» (fechas y documentos). Es exactamente la promesa de nuestro canal, «lo que no venía en el libro», pero ellos la cumplen y nosotros la enumeramos.
3. **Fotograma 0.** Lo suyo es acción en marcha: el diablo con los ojos encendidos, o una flecha disparada a la que la cámara persigue. Lo nuestro es un icono plano quieto bajo un «¿Por qué…?», idéntico durante 2,3–3,3 s. Es justo el fallo n.º 1 de nuestra propia guía.
4. **Voz.** Hablan a la misma velocidad que nosotros (171–174 ppm frente a 165–173), pero **respiran el doble**. Su pausa media es de 0,58 s y la de final de frase, de 0,65–0,95 s. La nuestra media 0,32 s y nunca pasa de 0,47 s, porque `gap 0.35` + `inner_cap 0.45` la recortan.
5. **Sonido.** En las pausas, su música queda **12,5–14 dB bajo la voz**, suena continua y cambia de color en los giros (dron con la riada, lluvia). La nuestra queda a **21–23 dB** en ep82 y ep90, con silencios secos entre líneas y entre 53 y 84 efectos por vídeo. Ellos usan muy pocos y todos diegéticos.
6. El motor **ya tiene casi todo** lo necesario: `MUNDO`, `camara` con claves y `'corte'`, `cielo`, `transTela`, `transPapel`, `ETIQUETA`, `ROTULO`, `LLUVIA`, `NUBES`, `mus_baja/sube/silencio` y el modo `leyenda`. Lo usamos en ep84–ep89 como réplica del formato, pero ep90 y ep91 volvieron a la plantilla de diapositivas. El upgrade consiste en llevar esas piezas al formato principal del canal sin perder al Vecino, y en añadir 8 funciones que faltan (§3).

---

## 1. Qué hace técnicamente la referencia

### 1.1 Números

| | Pont del Diable | Quatre barres | ep07 OK | ep82 Botones | ep90 Ceniceros | ep91 Relojes |
|---|---|---|---|---|---|---|
| Duración | 90,8 s | 78,3 s | 74,0 s | 78,2 s | 67,5 s | 65,6 s |
| Ppm de la voz | 174 | 171 | 161 | 165 | 173 | 167 |
| Pausas > 0,25 s | 37 | 35 | 15 | 19 | 19 | 18 |
| Pausa media / máxima | 0,58 / 0,96 s | 0,59 / 1,02 s | 0,31 / 0,47 | 0,34 / 0,45 | 0,32 / 0,44 | 0,32 / 0,44 |
| Pausas ≥ 0,6 s (final de frase) | 17 | 15 | 0 | 0 | 0 | 0 |
| Música en las pausas, bajo la voz | −12,5 dB | −13,8 dB | −16,4 dB | −21,4 dB | −22,9 dB | −18,3 dB |
| Cortes y cortinillas | ~9 | ~9 | ~19 | 16 | 14 | ~15 |
| Duración media de plano | ~8 s | ~8,5 s | ~3,7 s | ~4,6 s | ~4,5 s | ~4,3 s |
| Movimiento dentro del plano | cámara cada 2,5–3 s | cámara cada 2–3 s | micro-cambios cada 0,5–1 s | casi nulo | casi nulo | casi nulo |
| Decorados distintos | 1 (pueblo + puente) | 2 (campamento/tienda + pergamino) | ~8 | ~13 fondos | ~10 | ~10 |
| Efectos de sonido | pocos, diegéticos (lluvia, puf, piedras) | pocos (flecha, tela, papel) | 90 | 84 | 53 | 68 |

Lectura: **la sensación de ritmo nace del movimiento y de los cambios de estado dentro de la escena, no de los cortes**. Nosotros cortamos el doble y aun así parecemos más lentos, porque cada plano es una diapositiva que espera.

### 1.2 Cámara: un mundo que se recorre

- **Empuje y retirada continuos.** El Pont del Diable abre con el diablo en primer plano y la cámara se retira hasta el puente entero (0,0–2,0 s): primero el personaje, luego el lugar. Hace empujes a 9,5 s (la viejecita), 37,5 s (los dos pensando), 50,8 s (el diablo frotándose las manos) y 84,5 s (el gato), y retiradas a 31 s y 65 s. Quatre barres: 4,5 s, 37,5 s (empuje a dos), 40,5 s (retirada), 45,5 s (empuje a las manos que pintan), 48 s (retirada) y 51–54,8 s (gran retirada hasta la senyera).
- **Travellings laterales siguiendo a alguien o algo.** De 10 a 15 s la cámara acompaña a la viejecita hasta el puente de madera. De 10 a 14 s (ref3) barre los barcos y para en el emperador; de 19 a 21 s recorre los escudos de los caballeros.
- **Seguir al objeto, con desenfoque de movimiento.** Ref3 0,5–1,5 s y 27–28,5 s: la cámara persigue la flecha con un barrido borroso y aterriza en Guifré justo cuando le da. En «La veritat» (57,5–70 s) **la flecha es el ancla**: vuela por la línea de tiempo y la cámara va con ella de fecha en fecha (840 → 897 → 1150 → 1550).
- **El tiempo pasa sin cortar**, con cielo y luz. Llega la lluvia y oscurece en 17,2 s, de noche a 39,4 s, amanece entre 48,5 y 49,5 s (ref2). Atardece con hoguera entre 30 y 31,5 s (ref3). Es nuestro `cielo()` tal cual.

### 1.3 Transiciones, con su segundo exacto

| Ref | Segundo | Tipo | Para qué |
|---|---|---|---|
| 2 | 6,5–7,3 | **Hoja de papel en diagonal** (= `transPapel`) | Del gancho («dicen que…») al cuento («Hace muchos años, en Martorell») |
| 2 | 17,2–18 | Cambio de clima (lluvia + cielo) | Llega el problema (la riada) |
| 2 | 25,5 | Puf de humo blanco | Aparece el diablo (entra un personaje) |
| 2 | 28,0 / 31,0 | Corte seco a contrapicado / vuelta al general | Revelar los cuernos (gag) y volver |
| 2 | 39,4–40,3 | Fundido de cielo a noche | Elipsis: empieza la noche de trabajo |
| 2 | 46,5 / 48,5–49,5 | Corte al gallo / amanecer | Fin de plazo |
| 2 | 65,0 | Corte + nube de azufre | El diablo desaparece |
| 2 | 76,8 / 79,5 | El puente explota en piedras / las piedras vuelven | 1939: lo vuelan · 1961–62: se reconstruye |
| 3 | 0,5–1,5 | **Barrido siguiendo la flecha** | Arranque en acción |
| 3 | 2,43 | Corte (salto al clímax) | El gancho enseña el final sin explicarlo |
| 3 | 6,4–7,2 | Hoja de papel | Gancho → cuento |
| 3 | 14,0 | Soldados que pasan en primer término (cortinilla diegética) | Del emperador a Guifré |
| 3 | 27–28,5 | Barrido con la flecha (otra vez) | El clímax que prometía el gancho |
| 3 | 32,0 | **Lona de tienda a rayas** (= `transTela`) | Entrar en la tienda |
| 3 | 50,0–50,5 | **Corte por forma**: el escudo crece hasta llenar el cuadro y es ya la senyera | Pago visual |
| 3 | 55,0–55,6 | Hoja de papel | Cuento → «La veritat» (cambio de registro) |
| 3 | 71,0–71,5 | Hoja de papel de vuelta | Verdad → cierre poético en la tienda |

Las cortinillas «firma» (papel, tela) **solo marcan cambios de registro**: gancho → cuento → verdad → cierre. Hay 2–4 por vídeo y siempre en el mismo sitio de la estructura. Cada vez que el espectador ve el papel sabe que «empieza otra parte».

### 1.4 Texto en pantalla

- **Subtítulos**: tira de papel rasgado, con letra manuscrita en negro, a lo ancho (~85 %) y abajo. La frase se va **acumulando** palabra a palabra, hasta 7–9 palabras en una o dos líneas. No hay pastilla negra ni palabra que salta. **La palabra clave sale en rojo de forma fija**: *senyera, fletxa, sang, Pilós, fos!, gat?!, 1150, oneja*. Los diálogos van entre comillas latinas y en cursiva.
- **Título dentro de la escena**: «EL PONT DEL DIABLE / una llegenda de Martorell» se teclea entre 0,5 y 1,5 s sobre la imagen del gancho y se va hacia los 6 s. No es una portada aparte: es el cartel de la película.
- **Mapa de situación**: tarjeta de papel con el mapa de Cataluña y el punto («Martorell», «Barcelona») a 8,5 s y 7,5 s. Vuelve a 71 s en la parte de «verdad».
- **Etiquetas de personaje** con línea fina: «LLUÍS EL PIADÓS / emperador dels francs» (13 s) y «GUIFRÉ EL PILÓS / comte de Barcelona» (15,5 s). Son nuestro `ETIQUETA`.
- **Carteles de dato**, tarjetas de papel arriba a la izquierda que se apilan: «1 NIT per fer el pont» (33 s) y después «1 ÀNIMA la del primer que hi passi» (34,5 s). **La primera se encoge** (36 s) cuando entra la segunda. En la parte de verdad: «+2.000 ANYS» (74 s), «1939 el volen…» (75,5 s), «1961-62 el reconstrueixen…» (79,5 s).
- **Reloj en time-lapse**: «LA NIT 00:08 → 06:00» corre arriba a la derecha entre 40 y 48 s y termina en «CLAREJA! 06:00» en naranja. Es la única cifra que corre, y no es un dato: es tiempo que pasa.
- **Un único grito en pantalla en todo el vídeo**: «L'ÀNIMA D'UN GAT?!» a 61,5 s, en el giro. No hay sellos en ningún otro momento.

### 1.5 Música y efectos

- **La música suena desde el fotograma 0 y no para.** En el espectrograma se ve una alfombra continua en graves y medios. A 16 s, con la riada, entra un **dron sostenido** y por encima, desde 17 s, el siseo de la lluvia. La emoción la lleva la música, no los efectos.
- **Efectos escasos y del mundo**: lluvia, agua, el puf de humo, piedras que caen, la flecha, la tela. No hay alfombra de pops ni un whoosh en cada cambio.
- **Silencios**: 0,8–1,0 s antes de cada revelación (6,66 s; 62,18 s «L'ànima d'un gat?»; 68,9 s «I el pont s'hi va quedar»; 39,7 s «El meu és buit»). La música baja y la frase cae sola.

### 1.6 Cómo cuenta: estructura beat a beat

**El Pont del Diable (90,8 s)**

| s | % | Beat | Frase (resumen) | Imagen |
|---|---|---|---|---|
| 0,0–4,1 | 0 | Afirmación que choca | «Dicen que este puente lo construyó el diablo, en una sola noche» | Diablo en el puente, de noche, ojos encendidos; la cámara se retira |
| 4,7–6,7 | 5 | **Bucle abierto** | «Y que la cosa no le salió muy bien» | Ojos que brillan bajo el puente |
| 6,5–7,3 | 7 | Cortinilla de papel | — | — |
| 7,5–15,8 | 8–17 | Lugar + protagonista + necesidad | «Hace muchos años, en Martorell, una viejecita tenía que cruzar el río cada día… por un puente de madera que daba más miedo que gusto» | Mapa, etiqueta, travelling que la sigue |
| 16,5–23,3 | 18–26 | Problema y deseo | «Hasta que una riada se lo llevó… "Por un puente nuevo, daría lo que fuera"» | Lluvia, cielo oscuro, la riada |
| 24,0–39,5 | 26–43 | Llega el antagonista y el trato | «…un caballero muy elegante, con unos cuernos un poco sospechosos» / «1 noche · 1 alma» | Puf, contrapicado, el sombrero que deja ver los cuernos, carteles |
| 40,3–50,1 | 44–55 | Montaje | «Piedra a piedra, arco a arco… justo cuando cantaba el gallo» | Noche, reloj en time-lapse, el puente que se levanta, amanecer |
| 50,8–60,8 | 56–67 | La trampa | «Ella llegó con un saco… y salió un gato negro» | Saco, gato que cruza corriendo |
| 61,3–68,9 | 68–76 | **Giro y pago** | «¿El alma de un gato?» — el diablo, furioso, desaparece | Grito en pantalla, el diablo rojo, humo de azufre |
| 69,9–83,0 | 77–91 | **«Y existe de verdad»** (cambio de registro) | Romanos, más de 2.000 años, 1939, 1961–62… «esta vez, sin diablo» | Mapa, etiquetas, carteles, explosión y reconstrucción, el diablo que asoma (gag) |
| 83,7–87,5 | 92–96 | Remate que manda a la vida del espectador | «Así que, si alguna vez pasas, deja que pase primero el gato» | El gato sentado mira a cámara y le brillan los ojos |
| 88–90,8 | — | Marca + **bucle** | LLEGENDES CATALANES | Gato sobre el puente ≈ diablo sobre el puente del fotograma 0 |

**Les quatre barres (78,3 s)**: «La senyera la pintó una flecha.» (0–1,8 s) → «Bueno: una flecha, un emperador y cuatro dedos de sangre» (2,5–6,4 s: **tres ingredientes concretos que prometen**) → cortinilla → normandos, emperador, Guifré con etiqueta y gag («y no era por la cabeza») → el escudo dorado y liso (el «problema») → la flecha (27–29 s, el clímax prometido) → la tienda (tela) → «Todo el mundo lleva una señal. La mía está vacía» → el emperador moja cuatro dedos (46 s) → corte por forma a la senyera (50 s, 64 %) → **«La verdad:»** (55 s, 70 %), con la línea de tiempo que la flecha atraviesa → vuelta a la tienda: «Las heridas se curan. Esta todavía ondea» (71–74,8 s).

**Patrones que se repiten:**

1. La primera frase es una afirmación imposible sobre algo conocido, y la segunda abre el bucle sin resolverlo («no le salió muy bien»; «una flecha, un emperador y cuatro dedos de sangre»).
2. El fotograma 0 es **el momento más visual del clímax** (salto adelante) y la cámara ya se mueve.
3. Hay un protagonista con un deseo, un antagonista o un obstáculo, y **reglas que se ven** (carteles 1 NOCHE / 1 ALMA).
4. Los gags de imagen caen siempre sobre una ironía del texto: el sombrero que deja ver los cuernos, el petirrojo en la cabeza mientras le buscan la herida, el normando peinándose en el escudo, Guifré bebé en la cuna, el diablo que asoma en «sin diablo».
5. El pago llega entre el 64 % y el 76 %. La «verdad» va después del pago, entre el 70 % y el 91 %, con fechas, carteles y la misma estética.
6. El cierre es una frase corta y poética o práctica que **vuelve a la imagen del principio**.
7. El narrador es calmado y de cuentacuentos, con frases de 6–8 palabras y silencios largos. La energía sube solo en el giro.

---

## 2. Diagnóstico de nuestros vídeos

### Notas (1–10)

| | Gancho | Narrativa | Ritmo | Limpieza | Sonido | Voz | Media |
|---|---|---|---|---|---|---|---|
| ep07 OK (91 mil) | 9 | 7 | 9 | 6 | 7 | 7 | **7,5** |
| ep82 Botones (6,4 mil) | 6 | 7 | 5 | 6 | 5 | 6 | **5,8** |
| ep90 Ceniceros (1,1 mil) | 4 | 5 | 4 | 6 | 5 | 5 | **4,8** |
| ep91 Relojes | 4 | 3 | 4 | 7 | 5 | 5 | **4,7** |
| *Ref. Pont del Diable* | *9* | *10* | *9* | *9* | *9* | *9* | *9,2* |

### ep07 OK — por qué funcionó

- **0,0 s.** Dos personajes con cara (las letras O y K) y una **afirmación**, no una pregunta: «¡FALTA DE ORTOGRAFÍA!». Desde 2,5 s se mueven: guiñan, «¡JA!», y el círculo rojo sobre la K a 4,0 s.
- **0,5–30 s.** Pasa algo cada 0,5–1 s: titular que se escribe palabra a palabra, casillas que se marcan, letras que caen, la pizarra. No hay corte que no traiga un cambio de estado.
- Tiene protagonista colectivo (los periodistas de Boston) y un giro con conector: «Debería haber muerto en una semana. **Pero** al año siguiente…» a 33,1 s.
- Fallos:
  - Marca a 7,1–10,0 s, regla ya retirada.
  - El contador de años 1811→1839, entre 10,5 y 12,5 s, enseña cifras falsas.
  - L4 dura 10,4 s y L8 («Ojo»), 10,8 s.
  - Hasta 4–5 capas a la vez: titular, lista, personajes, óvalo y subtítulo.
  - Pausas de 0,31 s de media.

### ep82 Botones (6,4 mil) — buena historia mal filmada

- **0,0–2,3 s: fotograma quieto.** Las cinco imágenes de 0,0 a 2,0 s son idénticas. Hay **cuatro capas**: pregunta, chips ÉL/ELLA, flechas y sello «¡AL REVÉS!». El sello ya da la respuesta antes de que se forme la pregunta (falla la regla v3-3).
- **Estética.** Muñecos planos de vector (ÉL/ELLA, la criada, el hombre del bigote) en lugar del grabado y collage del canal. La identidad se diluye.
- **2,3–7,0 s.** Hombre + camisa + bocadillo «¿pero esto cómo va?» quietos durante 4,7 s; solo cae una gota de sudor.
- **7,0–10,0 s.** Marco «Hace 4 siglos» con lupa; es pura deixis.
- **10,0–14,7 s.** Un botón solo, girando, sobre rayos: 4,7 s para un dato.
- **14,8–23,5 s (L3, 8,7 s).** «Los señores se vestían solos… pero las señoras no. A ellas las vestía la criada. **De frente.**» Es la mejor frase del vídeo y **no se ve a la criada vistiendo a nadie**: hay tres planos sueltos (él con espejo, ella sola, camisa).
- **37,2–39,8 s.** Sígueme a mitad de historia (línea 6 de 14, el 48 %). Rompe el hilo con una diapositiva rosa. El proceso dice «antepenúltima línea».
- **57,3–60,7 s.** «Ojo: no está demostrado del todo» justo **antes** del remate: desinfla el pago.
- **Sonido.** 84 efectos (20 whoosh, 14 pop, 10 tick). La música queda 21,4 dB bajo la voz y entre líneas hay silencio seco.
- **Voz.** 0,34 s de pausa media; L1 empalma tres frases en 7,4 s.

### ep90 Ceniceros (1,1 mil) — la historia buena estaba escondida

- **0,0–2,3 s.** Icono de puerta de váter con cenicero sobre rayos y «¿Por qué el avión… tiene CENICERO?». Quieto y sin personaje. **Es lo que la guía llama «portada quieta con una pregunta».**
- **2,3–7,9 s.** Cabina vacía con chip «sin fumar: 20+ años», 5,6 s sin cambio. La lupa del baño (7,0–7,9 s) llega tarde.
- **Tema.** «Los aviones tienen ceniceros» toca poco la vida diaria y no se puede comprobar en el momento (puerta P2 floja).
- **35,5–42,8 s (L8).** **El drama del vídeo** («en 1973 un avión acabó estrellándose cerca de París por un fuego que empezó en un baño»; Varig 820, Orly, a verificar) se cuenta con **un recorte de periódico estático** sobre azul marino y un avión pequeño. Sin humo, sin pasajeros, sin cabina llenándose. Era el clímax y está filmado como una nota a pie de página.
- **25,9–28,5 s.** Sígueme al 38 %.
- **47,2–52,2 s.** «Ojo: la multa de miles de euros» no sirve a la historia: es una fuga.
- **Voz.** Ni una pausa de 0,6 s en 67 s. El «¿Por qué?» de 22,5 s va pegado a la respuesta.

### ep91 Relojes — una lista, no una historia

- **0,0–3,3 s.** Reloj quieto con dos destellos, 3,3 s idénticos. Peor que ep90.
- **3,4–8,8 s.** Rejilla de seis relojes estática y el sello «PSICOLOGÍA» a 8 s.
- **9,1–25,2 s.** «**Primero… Segundo… Tercero…**»: enumeración pura. Tres diapositivas con «1 ·», «2 ·», «3 ·» arriba. No hay protagonista ni conflicto, solo razones paralelas de la misma intensidad (falla la puerta P12, escalada).
- **30,0–32,6 s.** Sígueme al 46 %.
- **~33 s.** Cuadro casi vacío (rayas + óvalo) mientras entra la relojería.
- **51,1–54,8 s.** «Te está ligando» es buen remate, pero llega sin historia que lo cargue.

### Fallos comunes (los 5 que más retención cuestan)

1. **Fotograma 0 quieto de 2,3–3,3 s** en los tres recientes, cuando el 40 % se va en 5 s.
2. **Diapositivas en vez de mundo**: 10–13 fondos por vídeo y casi nada moviéndose dentro.
3. **Sin protagonista ni escena**: la frase con imagen («la criada la vestía de frente», «fuego en el baño en 1973») se cuenta con iconos.
4. **Voz sin aire y música ausente**: pausas de 0,32 s, cama a −21/−23 dB y un pop cada 0,9 s.
5. **Sígueme entre el 38 % y el 48 %** y un «Ojo» que desinfla el pago justo antes del remate.

---

## 3. Plan de upgrade priorizado

Orden: impacto / coste. Las técnicas **P0** no cuestan créditos y se pueden aplicar ya a vídeos existentes; para reeditar un vídeo publicado basta con `ep.js` + `hacer.sh <ep> video` y regenerar el montaje de voz.

### P0-1 · Voz con aire: pausas según la puntuación (0 créditos)

- **Qué es.** Silencio de 0,65–0,9 s tras cada punto, 0,5–0,7 s tras los «…» y 0,2–0,3 s tras las comas. Hoy `inner_cap 0.45` aplasta todas las pausas por igual y `gap 0.35` junta las líneas.
- **Cuándo usarla.** Siempre. Antes de una revelación, 0,9–1,0 s (regla 8 del editor: 0,3–0,6 s **mínimo**).
- **Cómo implementarla.** En `gen_lines.py`, sustituir el tope único `cap=cfg.get("inner_cap",9)` (línea 63) por un tope según el signo que cierra la palabra anterior:
  ```python
  PZ = cfg.get("pausas", {".": 0.75, "?": 0.75, "!": 0.7, "…": 0.6, ":": 0.5, ",": 0.28})
  # en el bucle de cortes: hueco = s_sig - e_prev; objetivo = PZ.get(ult_signo(txt_prev), 0.12)
  # si hueco > objetivo → recortar a objetivo; si hueco < objetivo y signo en '.?!…' → AÑADIR silencio hasta objetivo
  ```
  En `lines_in.json`: `"gap": 0.7` y `"gap_after": 1.0` en la línea anterior al giro. El tempo, a **0,94–0,95** (la regla 00 de CONTEXTO ya lo pide; ep82–91 iban a 1,0). Como los `clips/*.mp3` ya existen, es reensamblar sin gastar créditos. Los tiempos de `ep.js` se mueven solos porque van por `Q()`/`L()`.
- **Impacto.** Comprensión y «tono de cuento». La duración sube unos 6–8 s en 60 s: hay que recortar una línea de relleno (el «Ojo» que no aporta) para seguir en 55–65 s. Se espera menos caída en las frases de contexto, que hoy pierden ~1,2 pts/s.

### P0-2 · Música presente y con dramaturgia (0 créditos)

- **Qué es.** La cama de música a −13/−15 dB bajo la voz en los huecos (hoy −21/−23), sonando desde el fotograma 0, con **tres cambios** por vídeo: baja en la tensión, silencio de 0,5 s antes del giro y sube en el pago.
- **Cómo implementarla.**
  - En `audio.py`: `MUSIC_BED_LU = -15.0`, `MUSIC_DUCK_DB = -7.0`, `MIN_SNR_DB = 16.0`. La QA sigue garantizando que la voz manda; la referencia está en ~13 dB en los huecos.
  - En `ep.js`, tres marcas: `sfx('mus_baja', Q('frase de tensión'))`, `sfx('mus_silencio', tGiro - 0.6)`, `sfx('mus_sube', tGiro + 0.3)`. Ya las lee `mus_auto()`.
  - Usar `el_music/cuento.wav` en los vídeos con historia y `ragtime` en los de dato rápido: `python3 -I ../engine/audio.py $PWD cuento`.
- **Impacto.** Desaparecen los «agujeros» que se ven en el espectrograma entre líneas. Es la diferencia más audible con la referencia.

### P0-3 · Menos efectos y con sentido (0 créditos)

- **Qué es.** Pasar de 53–84 efectos a **20–30**: uno por **acción física** (algo cae, se rompe, entra, se cierra) y nada en los cambios de plano normales.
- **Cómo implementarla.**
  - En `story.js → plano()`, cambiar el valor por defecto: `if (o.sfx) sfx(o.sfx, t0 + 0.03, 0.5);`. Hoy cada `plano` mete un `whoosh`, y por eso hay 14–20 por vídeo.
  - `aparece()` sin sonido por defecto (`o.sfx` explícito).
  - `qa.py` avisa si hay más de 30 efectos por minuto o más de 2 «pop» en 3 s.
- **Impacto.** Limpieza sonora. El efecto vuelve a significar algo y el silencio previo a la revelación funciona.

### P0-4 · Sígueme dentro del mundo y en su sitio (0 créditos)

- **Qué es.** El CTA **no cambia de decorado**: el Vecino crece desde su óvalo y señala el «+» mientras la escena sigue detrás. Se coloca **después del pago** (antepenúltima línea, como dice PROCESO_RAPIDO), no al 38–48 %.
- **Cómo implementarla.** Nueva función `siguemeMundo(line)` en `story.js`: no crea `plano()`. Anima `ovalW` (escala de 0,75 a 1,15, `x` +60) y reutiliza `gloveHand`, el `+` y el chip de `sigueme()`, colgados de `world` con `zIndex 860`. `qa.py` falla si la línea «Sígueme» no está entre las tres últimas antes de la pregunta.
- **Impacto.** Se quita la mayor fuga a mitad de vídeo: un cambio de registro sin historia en el peor momento.

### P1-1 · Fotograma 0 = la escena más fuerte, ya en movimiento

- **Qué es.**
  - **Salto adelante**: el fotograma 0 enseña el clímax (la criada abrochando a la señora de frente; el pasajero fumando en el baño con humo saliendo por la rendija).
  - Personaje con cara **actuando**, y la cámara empujando de 1,00 a 1,08 en los dos primeros segundos.
  - El «¿POR QUÉ…?» se mantiene (la recalibración del 20/10 dice que la pregunta funciona en el perfil), pero **escrito dentro de la escena**, como el título de la referencia. Sin chips ni sello hasta que la voz lo diga.
- **Cómo implementarla.**
  - `MUNDO(c, w, h)` + `camara(M, t, [[0, cx, cy, 1.18], [1.8, cx, cy+40, 1.0], …])`: una retirada que revela el lugar, como el Pont del Diable de 0 a 2 s.
  - Nueva `tituloEscena(c, y, l1, l2, t0, o)`:
    ```js
    function tituloEscena(c, y, l1, l2, t0, o = {}) { // tecleado sobre la escena (estilo cartel de película), sale en o.t1
      const a = texto(c, y, '', { size: o.size || 96 }), b = l2 ? texto(c, y + (o.size || 96) * 1.08, '', { size: o.size2 || 104, italic: true }) : null;
      FX.fns.push(t => { a.innerHTML = typeText(l1, t, t0, o.cps || 26); if (b) b.innerHTML = typeText(l2, t, t0 + l1.length / (o.cps || 26), o.cps || 26);
        const out = o.t1 ? p(t, o.t1, 0.3) : 0; set(a, { o: 1 - out }); if (b) set(b, { o: 1 - out }); });
    }
    ```
    En el fotograma 0 tiene que verse ya la pregunta completa para el perfil. Opción: `typeText` con `t0 = -1` para que esté entera en t = 0, y en su lugar animar un subrayado (`paint`) y un pequeño balanceo.
  - QA: `director/medir.py` compara el fotograma 0 con el de 1,0 s. Si la diferencia media de píxeles es menor del 3 %, **falla**.
- **Cuándo usarla.** En todos los vídeos.
- **Impacto.** Retención en s 3 y s 5, donde hoy perdemos el 40 %.

### P1-2 · Un decorado por vídeo y una cámara que lo recorre

- **Qué es.** El 70 % del vídeo pasa en **un solo mundo** (la casa del siglo XVII con la criada y la señora; la cabina del avión con el baño al fondo). La cámara lo recorre con claves cada 2–3 s: empujes en las frases clave, travellings siguiendo a alguien y retiradas para revelar. **Cortes secos solo en los giros** (clave `'corte'`). Los golpes de color quedan para un único remate.
- **Cómo implementarla.**
  - Ya existen `MUNDO`, `camara(M, t, keys, par)`, `cielo`, `pies`, `PERSm`, `camino` y `ETIQUETA`/`etiquetaA` (ver ep84 y ep89).
  - Falta un **helper de claves por frase** para escribir menos:
    ```js
    // shot(Q('frase'), 'empuje'|'retira'|'sigue'|'corte', [x, y, s]) → devuelve claves para camara()
    const SHOTS = []; function shot(t, tipo, xy) { const [x, y, s] = xy; if (tipo === 'corte') SHOTS.push([t, x, y, s, 'corte']);
      else if (tipo === 'empuje') SHOTS.push([t - 0.2, x, y, s * 0.92], [t + 1.4, x, y, s]); else SHOTS.push([t, x, y, s]); return SHOTS; }
    ```
  - Regla de `qa.py`: ningún tramo de más de 2,5 s sin clave de cámara, sin `aparece()` y sin cambio de estado de un personaje (mirar en `FX` y en `SHOTS`).
- **Cuándo usarla.** En todo vídeo con escena humana. Los de «dato puro» (ep91) se convierten primero en historia (P1-5).
- **Impacto.** Ritmo sin fatiga, inmersión y menos capas a la vez. Es el cambio estructural más grande.

### P1-3 · Desenfoque de movimiento y «seguir al objeto»

- **Qué es.** Barrido rápido de cámara (0,4–0,8 s) siguiendo a un objeto que viaja: la flecha en la referencia; en lo nuestro, un botón que salta de la camisa del hombre a la de la mujer, la colilla que cae a la papelera o la aguja del reloj. Se ve con desenfoque horizontal y aterriza en la escena siguiente sin corte.
- **Cómo implementarla.** En `camara()` (mundo.js), medir la velocidad con la clave de 1/30 s antes y aplicar un desenfoque SVG direccional:
  ```js
  // una vez: <svg width=0 height=0><filter id="mb"><feGaussianBlur id="mbB" stdDeviation="0 0"/></filter></svg>
  const camara = (M, t, keys, par = 0.45, o = {}) => { const [cx, cy, s] = camVal(keys, t);
    if (o.blur) { const [px0, py0] = camVal(keys, t - 1 / 30), vx = Math.abs(cx - px0) * s, vy = Math.abs(cy - py0) * s;
      const bx = Math.min(vx / 6, 18), by = Math.min(vy / 6, 18); document.getElementById('mbB').setAttribute('stdDeviation', f1(bx) + ' ' + f1(by));
      M.vp.style.filter = bx + by > 0.5 ? 'url(#mb)' : ''; }
    /* …resto igual… */ };
  // seguir: claves sacadas del camino del objeto, con 80 px de adelanto
  const sigue = (pts, t0, t1, s = 1) => pts.map((q, i) => [t0 + (t1 - t0) * i / (pts.length - 1), q[0] + 80, q[1], s]);
  ```
  Sonido: un solo `whoosh` largo, más el impacto cuando llega (`thud`/`stamp`).
- **Cuándo usarla.** Una o dos veces por vídeo como transición «firma»: en el gancho y en el giro, como hace ref3 en 0,5 s y 27 s.
- **Impacto.** Energía en el gancho y continuidad. El objeto se convierte en la metáfora del vídeo.

### P1-4 · Cortinillas solo para cambiar de registro

- **Qué es.** `transPapel` al pasar del gancho al cuento y del cuento a «lo que no venía en el libro» (la verdad o el Ojo). `transTela` para entrar en un interior. `cielo` para el paso del tiempo. Máximo tres por vídeo.
- **Cómo implementarla.** Ya existen. Usarlas siempre en el mismo sitio de la escaleta (§4), con sus sonidos `papel_w`/`tela`, y no añadir `whoosh`.
  - **Corte por forma** (nuevo): `matchCut(t0, el, o)` escala un elemento del plano saliente hasta tapar la pantalla en 0,35 s (`E.inCubic`). El plano siguiente arranca con un objeto de **la misma forma y color** que se aleja con `camara` (escudo → senyera).
    ```js
    function matchCut(t0, el, o = {}) { const s1 = o.s || 9; FX.fns.push(t => { if (t < t0 - 0.35 || t > t0 + 0.05) return; set(el, { s: lerp(1, s1, p(t, t0 - 0.35, 0.35, E.inCubic)) }); }); sfx(o.sfx || 'swoosh_up', t0 - 0.3, 0.6); }
    ```
    Ejemplos: el botón crece y es ya el escudo de un retrato del siglo XVII; el cenicero crece y es ya la puerta del baño en 1973; la esfera del reloj crece y es ya la cara del vendedor.
- **Impacto.** El espectador entiende la estructura sin que se la expliquen, y el cambio de registro se nota.

### P1-5 · Guion: historia con protagonista, nunca lista

- **Qué es.** Cada tema se cuenta como una escena: **una persona en un lugar y una fecha**, con un deseo o un problema, un «pero», una trampa o ironía y el pago. Las enumeraciones «Primero/Segundo/Tercero» quedan prohibidas. Si hay tres razones, se elige **una** y las otras dos van en una frase dentro del Ojo.
- **Cómo implementarla.**
  - `qa.py` falla con `^(Primero|Segundo|Tercero)[:,]` en `lines_in.json` y con tres líneas seguidas sin conector (`pero|así que|hasta que|y entonces|justo`).
  - Plantilla en §4. Ejemplos de reconversión:
    - **Botones**: «Francia, 1600 y pico. Madame no se abrocha sola: la abrocha su criada, de frente…».
    - **Ceniceros**: «París, 1973. Un pasajero se encierra en el baño con un cigarro…» (Varig 820, a verificar), y la normativa como consecuencia.
    - **Relojes**: «Un fotógrafo de catálogo prueba la foto a las ocho y veinte… y el reloj parece triste» (a verificar si hay un caso real; si no, se presenta como escena ilustrativa sin fecha).
- **Impacto.** Narrativa: es la mayor diferencia de nota entre ep82/90/91 y la referencia.

### P1-6 · Subtítulos «tira de papel» con palabra clave fija

- **Qué es.** Tira de papel rasgado crema (`#efe6d2`) con letra Patrick y tinta INK. La **frase se acumula** palabra a palabra, hasta 7–8 palabras y 2 líneas, cortando por la puntuación. La palabra clave va en **rojo `#C8102E` fija** y los diálogos en cursiva. Sustituye a la pastilla negra con palabra amarilla saltando.
- **Cómo implementarla.**
  - En `engine.js → Captions`, nueva opción `modo: 'tira'`. Los grupos se cortan solo en `[.?!:;…]` o al llegar a `maxWords: 8`. Cada `span` se pone con `opacity: t >= W[wi].s - 0.03 ? 1 : 0` (acumula, no resalta) y `color: CLAVE.has(i) ? '#C8102E' : INK`. Fondo de la tira: SVG con borde irregular (sacar `edge()` de dentro de `textura()` a una función global y reutilizarla).
  - En `lines_in.json`, la clave se marca con `*palabra*`. `gen_lines.py` quita los asteriscos antes de mandar el texto a ElevenLabs y guarda `key: true` en `words.json`.
  - El modo `leyenda` de `Story.run` ya trae la fuente y los colores: añadirle `modo: 'tira'`. **Posición `y: 1380`** (la referencia la pone a ~1600, donde la tapa la interfaz de TikTok; nosotros respetamos la zona segura).
- **Impacto.** Legibilidad sin sonido, menos ruido visual y la palabra clave «se queda».

### P1-7 · Carteles de dato apilables y un único grito

- **Qué es.**
  - Las cifras y reglas van en **tarjetas de papel** arriba a la izquierda (y≥200, fuera de la zona del perfil). Cuando entra una segunda, la primera se encoge al 55 %.
  - Un solo «grito» en pantalla por vídeo, en el giro (como «L'ÀNIMA D'UN GAT?!»). Sustituye a los sellos repartidos (ep82 tenía 8 «stamp»).
- **Cómo implementarla.**
  ```js
  const CARTELES = [];
  function cartel(c, l1, l2, t0, t1 = 1e9, o = {}) { const d = ROTULO(c, o.x || 60, o.y || 220, l1, l2, { w: o.w || 330, size: o.size || 64 });
    CARTELES.push({ d, t0, t1 }); FX.fns.push(t => { const next = CARTELES.find(q => q.t0 > t0 && t >= q.t0);
      rotuloA(d, t, t0, t1); if (next) set(d, { s: 0.55, x: -40, y: -40, o: 1 }); }); sfx('paper', t0, 0.5); return d; }
  function grito(t0, t1, html) { /* ROTULO grande centrado y≈260, color RED, rotado -3°, entra con outBack; mus_silencio 0,6 s antes */ }
  ```
  Reloj en time-lapse para elipsis: `relojRapido(c, t0, t1, '00:00', '06:00')` con `clockfast.wav`. Es tiempo que pasa, no un dato, así que no rompe la regla 7.
- **Impacto.** Limpieza (máximo 3 capas) y datos que se recuerdan.

### P2-1 · Gags de reacción ligados a la ironía

- **Qué es.** Cada 8–12 s, un gag de imagen que **ilustra la ironía de la frase**, no un pop decorativo. Ejemplos: el sombrero que se levanta y deja ver los cuernos; la criada que suspira mientras abrocha; el humo que sale por la rendija del baño; el reloj que se pone triste a las 8:20.
- **Cómo implementarla.** Con lo que ya hay: `caraF`/`CARAS` (cara a cualquier objeto), `sudor`, `lagrima`, `NUBES`+`nubeA` (humo), `ESTRELLA` y el emú como cameo. Regla: un gag por re-gancho, marcado en la escaleta con su frase.
- **Impacto.** Chispa del Vecino y re-ganchos.

### P2-2 · El Vecino como narrador, no como sello fijo

- **Qué es.** Se mantiene el óvalo (identidad), pero **reacciona solo en 3–4 momentos** (`vecino: { sorpresa, risa, golpes }`) y **se encoge al 0,6** durante los travellings, para que el mundo llene la pantalla. Vuelve a escala 0,75 en el Ojo/verdad y en el cierre. El balcón y el «Y esto… no venía en el libro» con el libro que se cierra no se tocan.
- **Cómo implementarla.** `updOval` ya acepta tramos en `ovalo: [[a, b]]`. Añadir `OV_CFG.escala: [[t, s], …]` interpolado con `interp()` (mundo.js).
- **Impacto.** Más cuadro para la historia sin perder la marca.

### P2-3 · Ambiente sonoro por mundo (coste único de créditos, cuando el usuario lo apruebe)

- **Qué es.** Camas en bucle de 10–20 s por decorado (lluvia, cabina de avión, sala con reloj, mercado), a −28 dB, como la lluvia de la referencia desde 17 s.
- **Cómo implementarla.** En `audio.py`, que un efecto con `"until"` se repita en bucle hasta ese segundo con fundidos de 0,4 s: `{"name": "amb_cabina", "t": 2.3, "until": 40, "gain": 0.4}`. **Generar la biblioteca una sola vez** (6–8 ambientes) con ElevenLabs. No se hace ahora: el encargo pide no gastar créditos.
- **Impacto.** Profundidad. Es lo que más separa «vídeo hecho con diapositivas» de «cuento».

### P2-4 · Bucle visual

- **Qué es.** El último plano repite la **composición** del fotograma 0 (gato sobre el puente ≈ diablo sobre el puente) para que el bucle no se note. Hoy el cierre (libro) no se parece a la portada.
- **Cómo implementarla.** Tras `cierre()`, de LOOP − 0,6 a LOOP, la `camara` vuelve a la clave del fotograma 0. El libro que se cierra se mantiene; se trata de que la última clave de cámara sea la primera.
- **Impacto.** Más visualizaciones repetidas.

### Lo que NO se cambia

El Vecino (busto con bombín, óvalo y balcón), el tono pícaro y cotilla, el amarillo de la portada, la paleta sepia/papel, el cierre «Soy tu vecino… y esto no venía en el libro» con el libro HISTORIA, el emú una vez y la pregunta final personal + «Os leo».

---

## 4. Plantilla de guion-escaleta (45–70 s)

Columnas: segundos para un vídeo de **60 s** (en 45 s, multiplicar por 0,75; en 70 s, por 1,17), qué se dice, qué se ve (cámara/transición) y qué se oye.

| # | s (60 s) | % | Beat | Voz (ejemplo Botones) | Imagen / cámara | Sonido |
|---|---|---|---|---|---|---|
| 0 | 0,0–2,8 | 0–5 | **Afirmación que choca** (primera palabra = tema, «tú») | «[excited] Las camisas de mujer se abrochan al revés… y la culpa no es tuya.» | **Fotograma 0 = clímax adelantado**: la criada abrochando de frente a la señora, cara de fastidio. Pregunta de portada escrita en la escena. Retirada de cámara de 1,18 a 1,0 | Música desde 0; sin efecto en t = 0 |
| 1 | 2,8–6,0 | 5–10 | **Bucle abierto con 3 ingredientes** (sin dar la respuesta) | «Es culpa de una señora rica… su criada… y una espada.» | Tres cosas que aparecen *en la escena* (la señora, la criada, la espada en la pared), una por palabra, con un empuje cada una | 1 «pop» suave en la tercera, no en las tres |
| — | 6,0–6,8 | — | **`transPapel`** (gancho → cuento) | (pausa 0,7 s) | Hoja en diagonal | `papel_w` |
| 2 | 6,8–13 | 11–22 | **Lugar y fecha en UNA frase + protagonista** | «París, mil seiscientos y pico. Los botones costaban como joyas.» | `MUNDO` del salón; `cartel('1600', 'botón = joya')`; `ETIQUETA` «MADAME / la que paga»; travelling hasta ella | Cama de cuento; ambiente |
| 3 | 13–22 | 22–37 | **Problema + regla** («pero», «así que») | «Pero Madame no se vestía sola. La vestía su criada… de frente. Así que el botón se puso donde le venía bien a la criada.» | Empuje a las manos de la criada; **gag** (Madame posando como estatua); cartel 2 y el 1 se encoge | Silencio de 0,8 s tras «de frente» |
| 4 | 22–30 | 37–50 | **Contraste / segundo personaje** | «Mientras, el caballero se vestía solo… y necesitaba sacar la espada con la derecha sin engancharse.» | **Seguir al objeto**: la espada sale y la cámara barre, con desenfoque, hasta el caballero | `whoosh` largo + `thud` |
| 5 | 30–38 | 50–63 | **Escalada / re-gancho fuerte** | «Pasaron cuatro siglos. Se fueron las criadas. Se fueron las espadas…» | `cielo` (el tiempo pasa) + **corte por forma**: botón → camisa de hoy en un escaparate | `mus_baja` |
| 6 | 38–44 | 63–73 | **Giro / pago** (lo más fuerte; un único `grito`) | «…y los botones se quedaron donde estaban. Tú te abrochas cada mañana pensando en la comodidad de una criada de 1600.» | `mus_silencio` 0,6 s antes; `grito('¡Por una CRIADA!')`; reacción del Vecino (`golpes`) | `mus_sube` en el pago |
| — | 44–45 | — | **`transPapel`** (cuento → lo que no venía en el libro) | (pausa) | Hoja | `papel_w` |
| 7 | 45–50 | 75–83 | **Ojo / la verdad** (≤ 6 s, lo dudoso aquí y solo aquí) | «Ojo: es la teoría más aceptada, no la única.» | Mismo mundo en «pergamino» (estética de verdad), carteles con fechas, Vecino a escala 0,75 | Música baja |
| 8 | 50–53,5 | 83–89 | **Remate de bar** (frase para repetir) | «O sea: si te peleas con su camisa, la culpa es de la criada.» | Vuelta al salón; gag final | — |
| 9 | 53,5–55,5 | 89–92 | **Sígueme dentro del mundo** (≤ 3 s) | «Sígueme, que esto en clase no te lo cuentan.» (clip reutilizado `ep55_azteca/clips/05.*`) | `siguemeMundo()`: el Vecino crece y señala el «+», sin cambiar de decorado | `ding` |
| 10 | 55,5–58 | 92–97 | **Pregunta personal + Os leo** | «Confiesa: ¿a quién le has desabrochado tú una camisa? Os leo.» | `preguntaFinal()` | — |
| 11 | 58–60 | 97–100 | **Marca + bucle** | «Y esto… no venía en el libro.» (clip `ep55_azteca/clips/11.*`) | `cierre()` (libro) y la cámara vuelve a la composición del fotograma 0 | `thud` del libro |

**Reglas de la escaleta (comprobables en `qa.py`):**

- Línea 0 ≤ 3,5 s. Ninguna línea > 8 s; si la hay, se parte en dos con una clave de cámara en medio.
- Pago entre el 60 % y el 75 %. Ojo ≤ 6 s y **después** del pago, nunca justo antes del remate. Sígueme entre las tres últimas líneas.
- Como máximo 3 cortinillas (`transPapel`/`transTela`/`matchCut`), 1 barrido siguiendo al objeto, 1 `grito` y 0 «Primero/Segundo/Tercero».
- Una clave de cámara o un cambio de estado cada ≤ 2,5 s. Como máximo 3 capas de información (personaje + texto + objeto).
- Pausa ≥ 0,7 s tras cada punto y ≥ 0,9 s antes del giro. Música a −13/−15 dB en los huecos con tres cambios (baja, silencio, sube). Entre 20 y 30 efectos.
- Fotograma 0 ≠ fotograma de 1,0 s (diferencia ≥ 3 %).

**Variante 45 s:** se fusionan los beats 3 y 4 (un solo contraste), se elimina la cortinilla de la verdad (el Ojo va en una frase dentro del beat 7) y el Sígueme puede caer.

**Variante 70 s:** un re-gancho más entre los beats 4 y 5 («Y aquí viene lo mejor…»), con su gag, y el beat 7 de verdad con dos carteles (como el +2.000 AÑOS / 1939 de la referencia).

---

## 5. Orden de ejecución propuesto

1. **Hoy, sin créditos:**
   - P0-1 (pausas), P0-2 (música), P0-3 (efectos) y P0-4 (Sígueme), tocando `gen_lines.py`, `audio.py` y `story.js`.
   - Reensamblar ep82 Botones con pausas, música y efectos nuevos, mover el Sígueme y quitar el Ojo antes del remate. Es la prueba A/B más barata: misma imagen, otro montaje sonoro y de voz.
2. **Siguiente episodio:**
   - P1-1 (fotograma 0 vivo) + P1-2 (un mundo y `shot()`) + P1-5 (historia, no lista) + P1-6 (tira de subtítulos).
   - Se mide la retención en s 3, s 5, a mitad de vídeo y en el pago, y se compara con ep82.
3. **Después:**
   - P1-3 (desenfoque y seguir al objeto), P1-4 (corte por forma), P1-7 (carteles y grito) y P2.
   - Ambientes (P2-3) cuando el usuario apruebe gastar créditos en la biblioteca.

*Datos históricos citados como ejemplo (Varig 820 en 1973; origen de los botones al revés) marcados «a verificar»: no se afirman como nuevos.*
