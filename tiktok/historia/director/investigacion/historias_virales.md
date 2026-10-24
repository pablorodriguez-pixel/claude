# Historias con viralidad demostrada para «Esto no venía en el libro»

Investigación del 23-10-2026. Todas las cifras se han extraído hoy salvo que se indique otra cosa.

---

## 0. Nota de método (qué se pudo sacar y cómo)

- **tikwm está bloqueado**: `tikwm.com/api/...` devuelve un reto de Cloudflare («Just a moment…»), tanto con curl como con un navegador headless. No se pudo usar.
- **Alternativa que sí funcionó** (mismas métricas):
  1. `https://www.tiktok.com/embed/@<usuario>` devuelve los IDs de los vídeos de la cuenta.
  2. `https://www.tiktok.com/@<usuario>/video/<id>` trae en `__UNIVERSAL_DATA_FOR_REHYDRATION__` las cifras exactas de `playCount`, `diggCount`, `shareCount`, `commentCount`, `collectCount` y la duración.
  - Límite: el embed solo enseña unos 10 vídeos (los recientes y los fijados). Con @llegendes_catalanes da igual, porque solo tiene 6.
- **La API JSON de Reddit está bloqueada (403)** y old.reddit pide iniciar sesión. Los «top de todos los tiempos» y las búsquedas se han sacado renderizando reddit.com con Playwright (atributo `score` de cada post).
- **Zack D. Films**: en TikTok es **@zackdfilms92** (8M seguidores y 335M de likes). Su catálogo de YouTube Shorts (4.074 vídeos con vistas) se ha listado entero con yt-dlp.
- Scripts y datos en bruto: `/tmp/claude-0/-home-user/3ae96a45-f9f7-56e8-8071-0e91fc6aa454/scratchpad/scripts/` y `/tmp/claude-0/-home-user/3ae96a45-f9f7-56e8-8071-0e91fc6aa454/scratchpad/dl/`.

---

## 1. @llegendes_catalanes: ranking y qué tiene en común lo que funciona

**Ficha de la cuenta:** 6.996 seguidores, 66,9k likes y **6 vídeos**. **Se abrió el 16-10-2026**, así que tiene una semana. En la bio enlaza a su cuenta hermana en castellano, **@leyendas.espanolas** (5.793 seguidores, 68,6k likes, 4 vídeos, abierta el 17-10-2026). Las dos tienen el mismo formato: leyendas animadas «con muñequitos».

### Ranking @llegendes_catalanes (ordenado por vistas)

| # | Historia | Vistas | Likes (% de las vistas) | Compartidos (%) | Coment. | Guardados | Duración | Publicado | URL |
|---|---|---|---|---|---|---|---|---|---|
| 1 | El Pont del Diable (Martorell) | **169.400** | 23.000 (13,6%) | 3.414 (**2,0%**) | 126 | 2.697 | 90 s | 16-10 | https://www.tiktok.com/@llegendes_catalanes/video/7697248923630439702 |
| 2 | La Moreneta era blanca (Montserrat) | 101.400 | 13.200 (13,0%) | 1.413 (1,4%) | 58 | 1.212 | 82 s | 17-10 | https://www.tiktok.com/@llegendes_catalanes/video/7697554692879961366 |
| 3 | El Timbaler del Bruc | 64.200 | 8.933 (13,9%) | 910 (1,4%) | 51 | 708 | 77 s | 19-10 | https://www.tiktok.com/@llegendes_catalanes/video/7698357232152497430 |
| 4 | Por qué el Pedraforca tiene esa forma | 63.200 | 7.455 (11,8%) | 983 (1,6%) | 53 | 666 | 76 s | 18-10 | https://www.tiktok.com/@llegendes_catalanes/video/7697924221594242326 |
| 5 | La senyera nació en una batalla | 25.200* | 2.976 (11,8%) | 242 (1,0%) | 20 | 241 | 78 s | 23-10 (hoy) | https://www.tiktok.com/@llegendes_catalanes/video/7699858754027703574 |
| 6 | El Comte Arnau (galope en noches de tormenta) | 18.900 | 2.278 (12,1%) | 221 (1,2%) | 23 | 189 | 86 s | 20-10 | https://www.tiktok.com/@llegendes_catalanes/video/7698796869912202518 |

\*Publicado hoy, así que su cifra aún no está madura.

### Ranking de la cuenta hermana @leyendas.espanolas (en castellano)

| # | Historia | Vistas | Likes (%) | Compartidos (%) | Guardados | Duración | URL |
|---|---|---|---|---|---|---|---|
| 1 | La Santa Compaña («si hueles a cera en un bosque de Galicia… no te des la vuelta») | **299.200** | 38.800 (13,0%) | 4.950 (1,65%) | 4.543 | 78 s | https://www.tiktok.com/@leyendas.espanolas/video/7697600256124521750 |
| 2 | ¿Y si el Hombre del Saco existió de verdad? (Gádor, Almería) | 145.700 | 18.400 (12,6%) | 1.407 (1,0%) | 1.811 | 86 s | https://www.tiktok.com/@leyendas.espanolas/video/7697916439465889046 |
| 3 | El Monte de las Ánimas (Soria) | 53.700 | 7.038 (13,1%) | 839 (1,6%) | 803 | 85 s | https://www.tiktok.com/@leyendas.espanolas/video/7698795194455477526 |
| 4 | 36 reyes huyen de Valencia… de un muerto (el Cid) | 38.200 | 4.330 (11,3%) | 215 (0,6%) | 421 | 87 s | https://www.tiktok.com/@leyendas.espanolas/video/7698358436144237846 |

### Qué tienen en común los que más pegan

1. **Parten de algo que todo el mundo conoce** y le dan la vuelta. Todos han visto el Pont del Diable, la Moreneta o el Pedraforca, y todos han oído hablar del Hombre del Saco. El gancho es «¿sabías por qué…?» o «¿sabías que en realidad…?». Lo que menos funciona es lo que hay que explicar antes de contarlo: el Comte Arnau, la senyera como heráldica o el Cid como leyenda militar.
2. **Un protagonista contra un antagonista claro**, a menudo sobrenatural: el diablo que pide un alma, la procesión de muertos, el hombre que se lleva niños. Es un cuento con trato, problema y trampa.
3. **El giro es una trampa ingeniosa o un «resulta que…»**. En el Pont del Diable, el diablo construye el puente a cambio del primer alma que lo cruce y lo engañan haciendo pasar un gato. En la Moreneta, «era blanca». En el Hombre del Saco, «existió de verdad».
4. **Emoción dominante: miedo o inquietud con un final ingenioso.** El terror cercano (Galicia, Almería, Soria) multiplica: la Santa Compaña es el vídeo más visto de las dos cuentas. Lo épico y patriótico (senyera, Cid) es lo que menos rinde y lo que menos se comparte (0,6-1,0%).
5. **La primera frase pone al espectador dentro de la historia**: «Si una noche hueles a cera… no te des la vuelta». Va en segunda persona, con una amenaza y una instrucción.
6. **Duración**: todos duran entre 76 y 90 s. La duración **no** distingue a los buenos de los malos, y el más largo (90 s) es el mejor. Si la historia engancha, 75-90 s no penaliza.
7. **El like ratio es altísimo y casi constante (11-14%)**: el formato animado gusta siempre, y lo que cambia las vistas es el tema. Esto confirma el diagnóstico del canal: el problema es el tema, no la producción.
8. **Trucos de interacción**: un caracol 🐌 escondido en cada vídeo («¿Has visto el caracol?») para que se vuelva a ver y se comente, y «Escríbeme la próxima leyenda en comentarios».
9. **Hay que tener en cuenta el efecto estreno**: en las dos cuentas, el vídeo más visto es el primero y los siguientes van a menos. Parte de la ventaja es el empujón que TikTok da a una cuenta nueva, así que la muestra (10 vídeos en 7 días) es pequeña.

### Otras cuentas grandes comprobadas (existen, con cifras)

| Cuenta | Seguidores / likes | Vídeos | Lo que se ve |
|---|---|---|---|
| **@historiaparatontos** (México) | 7,9M / 134,1M | 1.189 | Su top fijado: **39,3M vistas**, «Día de la Tierra» (59 s) — https://www.tiktok.com/@historiaparatontos/video/6954102708014009605. Después, «¡Los españoles NO trajeron civilización!» con 8,2M (469 s) — https://www.tiktok.com/@historiaparatontos/video/7516763949870648584. Lo reciente son vídeos largos (4-10 min) de polémica política mexicana que no encajan en nuestro formato. Conclusión: la polémica identitaria dispara las vistas, pero el público es mexicano. |
| **@zackdfilms92** (Zack D. Films, EE UU) | 8,0M / 335M | 3.182 | En TikTok, sus vídeos recientes hacen 60k-720k. Donde explota es en **YouTube Shorts**: 4.074 shorts, con el top en 255M. Más abajo están sus historias de historia. |
| **@elrobotdeplaton** (ES) | 770k / 13,1M | 855 | Ciencia y humor, no historia narrada. |
| **@memoriasdepez** (ES) | 54,2k / 226k | 130 | «Historia en un minuto», pero lo reciente es geopolítica y apenas pasa de 3k-31k vistas. Es un contraejemplo: la actualidad explicada no engancha. |
| **@academiaplay** (ES) | 31,9k / 385k | 198 | Una cuenta de YouTube trasladada a TikTok, con poca tracción. |

**Los shorts de historia de Zack D. Films con más vistas** (YouTube; son la mejor prueba de qué historias funcionan en vertical):

| Vistas | Título | URL |
|---|---|---|
| 124M | Tootsie Rolls Used In War? | https://www.youtube.com/shorts/dOn3rgeW1Jg |
| 97M | Why George Washington Never Smiled | https://www.youtube.com/shorts/aF5mx3sFXmw |
| 91M | The Boy With The Empty Pot (leyenda china) | https://www.youtube.com/shorts/iFCaw7dfyaI |
| 68M | Teddy Roosevelt Saved By A Speech | https://www.youtube.com/shorts/YsjqPWKCIoI |
| 66M | The Assassination That Started World War I | https://www.youtube.com/shorts/pIZUyyun3eg |
| 57M | The Man Who Was Both A Dwarf And A Giant | https://www.youtube.com/shorts/Y1hvC4lUKOU |
| 56M | The Hero War Dog | https://www.youtube.com/shorts/uLBiwIPkp_U |
| 54M | The Great Escape Of Henry "Box" Brown | https://www.youtube.com/shorts/NMJBachmagQ |
| 49M | The Warrior Who Fought Without Hands | https://www.youtube.com/shorts/NSmY5cVTBB4 |
| 48M | She Found A 1500 Year Old Sword In A Lake | https://www.youtube.com/shorts/ck97ejftbJE |
| 47M | Drunk Man Survives The Titanic (Charles Joughin) | https://www.youtube.com/shorts/7HS2II8hpFg |
| 34M | The Headless Chicken That Lived | https://www.youtube.com/shorts/MXxjjBxjYy8 |
| 25M | The Dancing Plague Of 1518 | https://www.youtube.com/shorts/0AV2_VLY7I8 |

(Se descartan por repetidos o fuera de tema: «Why Did People Put Bells On Graves?», 108M, que es lo de la campana; «Stacking Humans To Build Great Wall», 60M, que es la muralla China; y «Why Is The Mona Lisa So Famous?».)

Patrón de Zack: **un título de 4-6 palabras con un protagonista y una situación extrema** («The Man Who…», «Saved By…», «Survives…») y **un objeto cotidiano metido en una situación épica** (caramelos en una guerra, un discurso que para una bala).

---

## 2. Viralidad fuera de TikTok: Reddit, top de todos los tiempos

r/todayilearned, posts con historia que se puede contar como cuento (puntos = upvotes):

| Upvotes | Post | URL |
|---|---|---|
| 169,7k | Gengis Kan casaba a sus hijas con reyes aliados, mandaba al yerno a la guerra y la hija gobernaba | https://www.reddit.com/r/todayilearned/comments/lgl7ag/ |
| 162,2k | Coronel Shaw: su padre pidió que lo dejaran en la fosa común con sus soldados negros | https://www.reddit.com/r/todayilearned/comments/7pbzcb/ |
| 146,9k | Camarera a la que dejan un boleto de lotería de propina: gana 10M y la demandan todos | https://www.reddit.com/r/todayilearned/comments/g54jd6/ |
| 134,2k | «¡Mi criada escocesa lo haría mejor!» (Williamina Fleming) | https://www.reddit.com/r/todayilearned/comments/aqbmrh/ |
| 132,0k | Síndrome K: la enfermedad falsa que salvó a judíos | https://www.reddit.com/r/todayilearned/comments/9z4ujr/ |
| 130,7k | Sober Sue, la chica a la que nadie podía hacer reír | https://www.reddit.com/r/todayilearned/comments/a2v3fv/ |
| 129,7k | Esclavo acusado de traición: «no soy ciudadano, no puedo traicionar» | https://www.reddit.com/r/todayilearned/comments/a16vla/ |
| 124,5k | Actor judío que se disfrazó de campesino «ario» (Leo Reuss) | https://www.reddit.com/r/todayilearned/comments/9yr8ru/ |
| 93,7k | Super Mario se llama así por el casero de Nintendo | https://www.reddit.com/r/todayilearned/comments/eengwy/ |
| 93,5k | Carta del exesclavo Jourdon Anderson a su antiguo amo | https://www.reddit.com/r/todayilearned/comments/c1pxmc/ |
| 92,6k | El brazo perdido del Laocoonte | https://www.reddit.com/r/todayilearned/comments/jg9501/ |
| 92,4k | La PlayStation iba a ser un accesorio de Nintendo | https://www.reddit.com/r/todayilearned/comments/e9o1fv/ |
| 67k | Witold Pilecki se dejó encerrar en Auschwitz a propósito | https://www.reddit.com/r/todayilearned/comments/7tewpp/ |
| 40k | Chiune Sugihara firmó visados 18-20 h al día | https://www.reddit.com/r/todayilearned/comments/85mezm/ |
| 39k | Robert Liston amputó una pierna en 2,5 min… y los dedos de su ayudante | https://www.reddit.com/r/todayilearned/comments/5010fe/ |
| 34k / 17k / 16k | Timothy Dexter (libro sin puntuación / finge su funeral) | https://www.reddit.com/r/todayilearned/comments/k7xytn/ |
| 24k | Ching Shih, la pirata más poderosa | https://www.reddit.com/r/todayilearned/comments/fut47v/ |
| 23k | Juliane Koepcke cae 3 km desde un avión y sobrevive | https://www.reddit.com/r/todayilearned/comments/b443fq/ |
| 22k | **Sodeto: todo el pueblo ganó el Gordo menos uno** | https://www.reddit.com/r/todayilearned/comments/1ml153y/ |
| 16k | Frank Hayes, el jinete que ganó una carrera muerto | https://www.reddit.com/r/todayilearned/comments/6ldsvu/ |
| 14k | El Ecce Homo de Borja: el fresco destrozado llenó el pueblo de turistas | https://www.reddit.com/r/todayilearned/comments/87m5mq/ |
| 13k / 10k | Charles Joughin, el panadero borracho que sobrevivió al Titanic | https://www.reddit.com/r/todayilearned/comments/1c62mp9/ |

r/history (top de todos los tiempos): lo más votado son hallazgos arqueológicos y documentos, no cuentos. Lo único con forma de historia es «Alemania ganó a Gran Bretaña un partido de fútbol con los dos equipos presos en Irlanda» (19,8k, https://www.reddit.com/r/history/comments/8ceqy3/). r/AskHistorians: son preguntas, no relatos, y no aporta temas.

Hilos de X en español: la búsqueda no encontró hilos virales identificables con cifras fiables, así que no se usan como prueba. Las historias españolas de la lista (Sodeto, Borja) se apoyan en Reddit y en la repercusión internacional en prensa.

---

## 3. Las 15 historias, de más a menos potencial

★ = mis 3 favoritas. Todas están comprobadas contra la lista de temas ya hechos y ninguna se repite.

### 1. ★ «La enfermedad que no existía y salvó vidas» (Síndrome K)
- **Viralidad**: **132.000 upvotes** en r/todayilearned (https://www.reddit.com/r/todayilearned/comments/9z4ujr/) y otro post con 12.000 (https://www.reddit.com/r/todayilearned/comments/e7zldb/).
- **Beats**:
  1. *Protagonista*: el doctor Giovanni Borromeo, del hospital Fatebenefratelli, en una isla del Tíber (Roma), 1943.
  2. *Problema*: el 16 de octubre los nazis hacen una redada en el gueto judío y varias familias se esconden en su hospital.
  3. *Pero*: las SS van a registrar las salas y no hay dónde esconder a tanta gente.
  4. *Así que*: con el médico judío Vittorio Sacerdoti, que trabaja allí con papeles falsos, y Adriano Ossicini, inventan una enfermedad, el «Síndrome K»: contagiosísima, mortal y neurológica. A los «enfermos» los aíslan en una sala y les piden que tosan fuerte si entra un alemán.
  5. *Giro*: los soldados oyen las toses, leen «Síndrome K» y salen corriendo sin revisar a nadie.
  6. *Remate*: la enfermedad nunca existió. En la ficha, «Síndrome K» significaba «aquí hay un judío», y la K era un guiño a Kesselring o Kappler, los jefes nazis de Roma. Borromeo fue reconocido como Justo entre las Naciones.
- **Verificación**: https://en.wikipedia.org/wiki/Syndrome_K · https://history.co.uk/article/syndrome-k-the-fake-ww2-disease-that-saved-jews-from-the-nazis · https://iflscience.com/health-and-medicine/how-the-ficticious-syndrome-k-saved-dozens-of-jews-from-the-nazis. No hay que inflar la cifra: las fuentes dicen «decenas», y algunas, «hasta unos cientos».
- **Por qué impacta**: es una trampa ingeniosa contra un villano absoluto, igual que el gato del Pont del Diable pero real. Hay suspense (la tos) y alivio, y deja un orgullo moral que da ganas de compartir.

### 2. ★ «Todo el pueblo ganó el Gordo… menos uno» (Sodeto, Huesca, 2011)
- **Viralidad**: **22.000 upvotes** en r/todayilearned (https://www.reddit.com/r/todayilearned/comments/1ml153y/) y 1.700 en otro (https://www.reddit.com/r/todayilearned/comments/36eo9c/). Salió en prensa de todo el mundo (ABC News, prensa griega).
- **Beats**:
  1. *Protagonista*: Costis Mitsotakis, un cineasta griego que se fue a vivir a Sodeto (unos 250 vecinos) por amor.
  2. *Problema*: en plena crisis y con sequía, la Asociación de Amas de Casa vende puerta a puerta participaciones de un mismo número de la Lotería de Navidad.
  3. *Pero*: a su casa, a las afueras, no llegan, y él no compra.
  4. *Así que*: el 22 de diciembre de 2011 el Gordo cae en Sodeto. Todas las familias son millonarias.
  5. *Giro*: todas menos una, la suya.
  6. *Remate*: el hombre más desafortunado del pueblo más afortunado no se hunde: coge la cámara y rueda un documental sobre lo que el dinero hace a sus vecinos. «El único que no ganó es el que cuenta la historia.»
- **Verificación**: https://abcnews.go.com/blogs/entertainment/2012/04/only-man-left-out-of-towns-lotto-win-plans-documentary · https://greekreporter.com/2014/12/22/worlds-unluckiest-man-makes-documentary-on-luckiest-spanish-village/. Las cifras del premio varían según la fuente, así que mejor no dar un número exacto.
- **Por qué impacta**: es español, todo el mundo juega a la Lotería de Navidad y se identifica al instante («¿y si fuera yo?»). Da envidia, pena y humor a la vez. **Calendario**: publicarlo entre el 1 y el 20 de diciembre, antes del sorteo del 22, puede ser el vídeo del año.

### 3. ★ «El actor judío al que los nazis aplaudieron» (Leo Reuss)
- **Viralidad**: **124.500 upvotes** en r/todayilearned (https://www.reddit.com/r/todayilearned/comments/9yr8ru/).
- **Beats**:
  1. *Protagonista*: Leo Reuss, actor de éxito en Berlín.
  2. *Problema*: con los nazis en el poder, lo echan de los escenarios por ser judío.
  3. *Pero*: actuar es lo único que sabe hacer.
  4. *Así que*: desaparece en los Alpes, se deja barba, se aclara el pelo con agua oxigenada, aprende el habla de los campesinos, consigue papeles nuevos y en 1936 se presenta en Viena como «Kaspar Brandhofer», un pastor tirolés que nunca ha pisado un teatro.
  5. *Giro*: la crítica, incluida la prensa antisemita, lo aclama como el gran «talento natural del campo».
  6. *Remate*: él mismo revela quién es, se monta un escándalo y emigra a Hollywood, donde hace unas 40 películas como Lionel Royce. Los que lo despreciaban habían aplaudido al judío que creían odiar.
- **Verificación**: https://en.wikipedia.org/wiki/Lionel_Royce · https://www.smithsonianmag.com/history/when-nazis-seized-power-this-jewish-actor-took-on-role-life-180985228/
- **Por qué impacta**: el disfraz y la humillación del villano dan una satisfacción enorme. Es el mismo esquema que el Timbaler del Bruc («el ejército más poderoso huyó… de un niño»), que rindió bien, pero sin repetir tema.

### 4. «Pidieron munición y les mandaron caramelos» (Tootsie Rolls en Chosin, 1950)
- **Viralidad**: **124 millones de vistas**, short de Zack D. Films (https://www.youtube.com/shorts/dOn3rgeW1Jg).
- **Beats**:
  1. *Protagonistas*: unos 15.000 marines rodeados en el embalse de Chosin (Corea), a unos −30 °C.
  2. *Problema*: se quedan sin proyectiles de mortero, que en su clave de radio se llamaban «Tootsie Rolls».
  3. *Pero*: quien recibe el pedido no conoce la clave.
  4. *Así que*: les lanzan en paracaídas toneladas de caramelos Tootsie Roll de verdad.
  5. *Giro*: los caramelos los salvan. Son calorías que no se congelan del todo y, masticados, sirven de masilla que el frío endurece para tapar agujeros de bala en depósitos y conductos de combustible.
  6. *Remate*: los supervivientes se hacen llamar «The Chosin Few» y la marca les siguió enviando caramelos a sus reuniones.
- **Verificación**: https://www.smithsonianmag.com/smart-news/how-tootsie-rolls-saved-marines-chosin-reservoir-180961215/ · https://en.wikipedia.org/wiki/Tootsie_Roll
- **Por qué impacta**: el error absurdo se convierte en milagro, con un objeto cotidiano en una situación extrema (la fórmula de Zack). Un adaptador: «Imagina pedir balas y que te manden chuches».

### 5. «"¡Mi criada lo haría mejor!" Y la contrató» (Williamina Fleming)
- **Viralidad**: **134.200 upvotes** en r/todayilearned (https://www.reddit.com/r/todayilearned/comments/aqbmrh/) y 10.000 en otro (https://www.reddit.com/r/todayilearned/comments/5epmvi/).
- **Beats**:
  1. *Protagonista*: Williamina Fleming, escocesa abandonada por su marido estando embarazada, que trabaja de criada en Boston.
  2. *Problema*: su jefe, Edward Pickering, director del Observatorio de Harvard, está harto de sus ayudantes y grita: «¡Mi criada escocesa lo haría mejor!».
  3. *Pero*: lo dice en serio.
  4. *Así que*: en 1881 la contrata para clasificar estrellas en placas fotográficas.
  5. *Giro*: clasifica más de 10.000 estrellas y descubre la Nebulosa Cabeza de Caballo, decenas de nebulosas, cientos de estrellas variables y 10 novas.
  6. *Remate*: Pickering contrata a un equipo entero de mujeres, las «computadoras de Harvard». Un remate agridulce: en parte lo hizo porque les pagaba mucho menos que a los hombres.
- **Verificación**: https://es.wikipedia.org/wiki/Williamina_Fleming
- **Por qué impacta**: una desvalorizada que se lleva la revancha, un insulto que se vuelve profecía, y orgullo con un punto de rabia.

### 6. «Miguel Ángel tenía razón… 400 años después» (el brazo del Laocoonte)
- **Viralidad**: **92.600 upvotes** en r/todayilearned (https://www.reddit.com/r/todayilearned/comments/jg9501/).
- **Beats**:
  1. *Protagonista*: Miguel Ángel, llamado por el Papa en 1506 para ver una estatua antigua que acaba de aparecer en una viña de Roma, el Laocoonte.
  2. *Problema*: falta el brazo derecho del protagonista.
  3. *Pero*: los artistas no se ponen de acuerdo. Miguel Ángel dice que iba doblado hacia atrás y la mayoría lo imagina estirado y heroico.
  4. *Así que*: le ponen un brazo estirado, y así se queda durante siglos.
  5. *Giro*: en 1906 el arqueólogo Ludwig Pollak encuentra en un almacén de materiales de Roma un brazo de mármol doblado. Era el original.
  6. *Remate*: lo dona al Vaticano, se queda olvidado medio siglo en un almacén y en los años 50 se coloca. Encaja y está doblado, como decía Miguel Ángel.
- **Verificación**: https://en.wikipedia.org/wiki/Laoco%C3%B6n_and_His_Sons · https://www.mentalfloss.com/article/92168/why-laocoon-sculpture-had-wrong-arm-four-centuries. Marcar como «según la tradición» la idea de que hubo un concurso para el brazo con Rafael de juez. El concurso documentado fue el de copias en cera.
- **Por qué impacta**: el genio al que no hacen caso y al que el tiempo da la razón. Es un «resulta que…» de libro, con objeto perdido y hallazgo casual.

### 7. «El hombre más tonto que se hizo rico por accidente» (Timothy Dexter)
- **Viralidad**: r/todayilearned con **34.000** (https://www.reddit.com/r/todayilearned/comments/k7xytn/), **17.000** (https://www.reddit.com/r/todayilearned/comments/1se9ufq/), **16.000** (https://www.reddit.com/r/todayilearned/comments/3jczn0/) y 6.600 upvotes.
- **Beats**:
  1. *Protagonista*: Timothy Dexter, Massachusetts, siglo XVIII, sin estudios.
  2. *Problema*: los comerciantes ricos se burlan de él y, según la versión popular, le dan consejos absurdos para arruinarlo.
  3. *Pero*: le sale todo bien. Manda calentadores de cama al Caribe y los venden como cucharones para la melaza. Manda carbón a Newcastle, la capital del carbón, y llega en plena huelga minera.
  4. *Así que*: se hace aún más rico, se nombra «Lord» y escribe un libro sin un solo signo de puntuación. En la segunda edición añade una página entera de comas y puntos «para que cada uno los ponga donde quiera».
  5. *Giro*: finge su propia muerte para ver su funeral, y van unas 3.000 personas.
  6. *Remate*: como su mujer no lloró lo suficiente, aparece vivo en la cocina y le da de bastonazos.
- **Verificación**: https://en.wikipedia.org/wiki/Timothy_Dexter. Hay que decir «según contaba él» en lo de los consejos para arruinarle: la fuente es su propio libro.
- **Por qué impacta**: es comedia pura con escalada (cada éxito es más absurdo) y un remate surrealista, dos giros en un vídeo.

### 8. «Nintendo le humilló en público… y nació la PlayStation»
- **Viralidad**: **92.400 upvotes** en r/todayilearned (https://www.reddit.com/r/todayilearned/comments/e9o1fv/).
- **Beats**:
  1. *Protagonista*: Ken Kutaragi, ingeniero de Sony.
  2. *Problema*: Sony y Nintendo preparan juntos un lector de CD para la Super Nintendo, la «Play Station», y Sony lo anuncia a lo grande en el CES de 1991.
  3. *Pero*: al día siguiente Nintendo sale al escenario y anuncia que se va con Philips. Es una traición pública.
  4. *Así que*: Sony, humillada, decide hacer su propia consola.
  5. *Giro*: la PlayStation (1994) vende más de 100 millones y destrona a Nintendo.
  6. *Remate*: lo de Philips acabó en los Zelda del CD-i, considerados de los peores juegos de la historia. En 2020 un prototipo de la «Nintendo PlayStation» se subastó por unos 360.000 dólares.
- **Verificación**: https://en.wikipedia.org/wiki/Nintendo_PlayStation
- **Por qué impacta**: es una historia de venganza y karma, con nostalgia gamer para un público de 18-40 años.

### 9. «La señora que arruinó un cuadro… y salvó a su pueblo» (Ecce Homo de Borja)
- **Viralidad**: **14.000 upvotes** en r/todayilearned (https://www.reddit.com/r/todayilearned/comments/87m5mq/) y fue un meme mundial en 2012 («Ecce Mono», «Potato Jesus»).
- **Beats**:
  1. *Protagonista*: Cecilia Giménez, 81 años, vecina de Borja (Zaragoza) y pintora aficionada.
  2. *Problema*: el Ecce Homo de su santuario se está cayendo a trozos por la humedad.
  3. *Pero*: nadie lo arregla.
  4. *Así que*: lo intenta ella.
  5. *Giro*: en agosto de 2012 el resultado da la vuelta al mundo y todo el planeta se ríe.
  6. *Remate*: entre agosto y diciembre de 2012 lo visitan 45.824 personas (antes, unas 5.000 al año), la entrada se cobra y el dinero va a la residencia de ancianos. Cecilia murió en diciembre de 2025, a los 94 años.
- **Verificación**: https://es.wikipedia.org/wiki/Ecce_Homo_(El%C3%ADas_Garc%C3%ADa_Mart%C3%ADnez) · https://aleteia.org/2019/01/06/local-anger-at-horribly-restored-ecce-homo-subsides-as-tourism-thrives
- **Por qué impacta**: la gente reconoce el meme en el primer segundo, es español y el giro («el desastre fue la salvación») emociona. Ojo con el tono: es más fuerte si se cuenta con cariño hacia Cecilia y no como burla.

### 10. «Le dispararon en el pecho… y siguió dando el mitin» (Theodore Roosevelt, 1912)
- **Viralidad**: **68 millones de vistas**, short de Zack D. Films (https://www.youtube.com/shorts/YsjqPWKCIoI).
- **Beats**:
  1. *Protagonista*: Theodore Roosevelt, expresidente de EE UU, en campaña en Milwaukee.
  2. *Problema*: un hombre le dispara a quemarropa en el pecho.
  3. *Pero*: la bala atraviesa su discurso de 50 páginas, doblado en el bolsillo, y la funda metálica de sus gafas, que la frenan.
  4. *Así que*: como no tose sangre, decide que no le ha llegado al pulmón y sube al estrado.
  5. *Giro*: «No sé si saben que me acaban de disparar, pero hace falta más que eso para matar a un alce» (Bull Moose era el apodo de su partido). Enseña el papel agujereado y habla durante más de una hora.
  6. *Remate*: los médicos no pudieron sacarle la bala, y la llevó en el pecho el resto de su vida.
- **Verificación**: https://en.wikipedia.org/wiki/Theodore_Roosevelt_assassination_attempt
- **Por qué impacta**: es una salvación por un objeto cotidiano y una frase legendaria.

### 11. «Se envió a sí mismo por correo para ser libre» (Henry «Box» Brown)
- **Viralidad**: **54 millones de vistas**, short de Zack D. Films (https://www.youtube.com/shorts/NMJBachmagQ).
- **Beats**:
  1. *Protagonista*: Henry Brown, esclavo en Richmond (Virginia).
  2. *Problema*: venden a su mujer embarazada y a sus hijos, y él ve cómo se los llevan.
  3. *Pero*: huir a pie hacia el norte es casi un suicidio.
  4. *Así que*: en 1849 se mete en una caja de madera de menos de un metro y se manda por correo a unos abolicionistas de Filadelfia.
  5. *Giro*: 27 horas de viaje, a ratos boca abajo. Abren la caja, sale y dice: «¿Cómo están, caballeros?».
  6. *Remate*: adopta para siempre el nombre «Box» (caja) y acaba de conferenciante y showman en Inglaterra.
- **Verificación**: https://es.wikipedia.org/wiki/Henry_Box_Brown · https://en.wikipedia.org/wiki/Henry_Box_Brown
- **Por qué impacta**: el ingenio desesperado da claustrofobia y suspense, y el final es luminoso.

### 12. «Super Mario se llama así por un casero cabreado» (Mario Segale)
- **Viralidad**: **93.700 upvotes** en r/todayilearned (https://www.reddit.com/r/todayilearned/comments/eengwy/) y 10.000 en otro (https://www.reddit.com/r/todayilearned/comments/9idbwf/).
- **Beats**:
  1. *Protagonistas*: la pequeña filial de Nintendo en EE UU, 1981, en un almacén alquilado cerca de Seattle.
  2. *Problema*: su último juego es un fracaso y no pagan el alquiler.
  3. *Pero*: el casero, Mario Segale, entra hecho una furia a reclamarlo delante de todos.
  4. *Así que*: le prometen pagar, y están a punto de lanzar un juego cuyo héroe se llama de momento «Jumpman».
  5. *Giro*: le ponen el nombre del casero, Mario.
  6. *Remate*: Segale nunca quiso hablar del tema. Solo dijo una vez, en 1993: «Todavía estoy esperando mis royalties».
- **Verificación**: https://en.wikipedia.org/wiki/Mario_Segale · https://www.cpr.org/2018/11/02/mario-segale-inspiration-for-nintendos-hero-plumber-has-died/ (NPR). Hay que marcar la bronca como «según se cuenta»: lo confirmado es el origen del nombre (Miyamoto, 2015).
- **Por qué impacta**: el personaje más famoso del mundo tiene un origen ridículo y cotidiano.

### 13. «La chica a la que nadie podía hacer reír» (Sober Sue, Nueva York, 1907)
- **Viralidad**: r/todayilearned con **130.700** (https://www.reddit.com/r/todayilearned/comments/a2v3fv/), **43.000** (https://www.reddit.com/r/todayilearned/comments/b8xs7n/) y **25.000 upvotes** (https://www.reddit.com/r/todayilearned/comments/1eg939a/). Ha triunfado tres veces con años de diferencia.
- **Beats**:
  1. *Protagonista*: «Sober Sue», presentada por el empresario Willie Hammerstein.
  2. *Problema*: el reto. Hay un premio para quien consiga hacerla reír: 100 dólares según el anuncio original y 1.000 según la leyenda.
  3. *Pero*: desfilan los mejores cómicos de Broadway y no hay manera.
  4. *Así que*: el teatro se llena noche tras noche.
  5. *Giro*: según contó después la prensa, Sue tenía los músculos de la cara paralizados y no podía sonreír.
  6. *Remate*: a ella le pagaban unos 20 dólares a la semana mientras el teatro hacía caja.
- **Verificación**: https://hoaxes.org/archive/permalink/sober_sue · https://www.mentalfloss.com/sober-sue-vaudeville-performer-refused-to-laugh. **Atención**: el giro de la parálisis es la versión popular y no hay fuente médica. Hay que contarlo con «dicen que…».
- **Por qué impacta**: el planteamiento es un reto de juego, el giro es triste y el remate injusto. Es muy comentable («yo la habría hecho reír…»).

### 14. «El niño de la maceta vacía» (LEYENDA china, marcada como tal)
- **Viralidad**: **91 millones de vistas**, short de Zack D. Films (https://www.youtube.com/shorts/iFCaw7dfyaI).
- **Beats**:
  1. *Protagonista*: Ping, un niño con un don para las plantas.
  2. *Problema*: el emperador, sin heredero, reparte una semilla a cada niño del reino. Quien cultive la flor más bonita en un año será emperador.
  3. *Pero*: la semilla de Ping no brota por más que la cuida.
  4. *Así que*: el día señalado todos llevan flores espectaculares y él, avergonzado, su maceta vacía.
  5. *Giro*: el emperador sonríe al verla, porque había cocido todas las semillas y ninguna podía germinar.
  6. *Remate*: el único que no hizo trampa es el nuevo emperador.
- **Verificación**: es el cuento popular chino publicado por Demi en *The Empty Pot* (1990, Henry Holt): https://www.goodreads.com/book/show/332575 · https://ils.unc.edu/~sturm/storytelling/cuecards/Empty%20Pot.html. No consta una fuente histórica, así que va como **leyenda**.
- **Por qué impacta**: es una prueba con trampa oculta y con moraleja, la misma estructura que el Pont del Diable. Encaja perfecto en el formato «leyenda».

### 15. «La carta con la que un exesclavo humilló a su amo» (Jourdon Anderson, 1865)
- **Viralidad**: **93.500 upvotes** en r/todayilearned (https://www.reddit.com/r/todayilearned/comments/c1pxmc/).
- **Beats**:
  1. *Protagonista*: Jourdon Anderson, libre al acabar la Guerra de Secesión y trabajando con un sueldo en Ohio.
  2. *Problema*: su antiguo amo le escribe pidiéndole que vuelva a la plantación con promesas de buen trato.
  3. *Pero*: Jourdon no se enfada.
  4. *Así que*: contesta con una educación exquisita. Volverá encantado si antes le pagan los sueldos atrasados: 32 años suyos y 20 de su mujer, que calcula en 11.680 dólares más intereses.
  5. *Giro*: con la misma cortesía añade: «Salude a George Carter y dele las gracias por quitarle la pistola cuando usted me estaba disparando».
  6. *Remate*: el amo nunca respondió, y la carta se sigue leyendo 160 años después.
- **Verificación**: https://en.wikipedia.org/wiki/Jourdon_Anderson
- **Por qué impacta**: es una venganza elegante, con la frase final como golpe. Funciona muy bien con voz en off y la carta en pantalla.

---

## 4. Reserva (por si alguna no convence)

| Historia | Viralidad | Nota |
|---|---|---|
| Charles Joughin, el panadero que sobrevivió al Titanic borracho | Zack 47M (https://www.youtube.com/shorts/7HS2II8hpFg); TIL 13k + 10k | Muy buena, pero es Titanic otra vez, como Violet Jessop. Mejor no seguidas. |
| Frank Hayes, el jinete que ganó una carrera estando muerto | TIL 16k (https://www.reddit.com/r/todayilearned/comments/6ldsvu/) | Corta y con remate brutal. Fuente: https://en.wikipedia.org/wiki/Frank_Hayes_(jockey) |
| Witold Pilecki, que se dejó encerrar en Auschwitz | TIL 67k | Muy dura, con final trágico. |
| Victor Lustig, que «vendió» la Torre Eiffel dos veces | TIL 1,5k; muy conocida | https://es.wikipedia.org/wiki/Victor_Lustig |
| Juliane Koepcke, que cayó 3 km y sobrevivió en la selva | TIL 23k | https://es.wikipedia.org/wiki/Juliane_Koepcke |
| Sitio de Baler, «los últimos de Filipinas» | Equivalente español de Onoda (TIL 490); película de 2016 | Española y épica, pero sin prueba de viralidad fuerte. Ojo: lo épico rindió poco en las cuentas analizadas. |
| Ángel Sanz Briz, el «Schindler español» | TIL 277 | Española, con poca prueba viral. |
| La guerra del emú (Australia pierde contra unas aves) | TIL 2k; meme clásico | https://es.wikipedia.org/wiki/Guerra_del_Em%C3%BA |
| Unsinkable Sam, el gato que sobrevivió a tres hundimientos | TIL 5,2k | Hay dudas sobre su veracidad, así que se contaría como «se dice». |
| Robert Liston, la operación con un 300% de mortalidad | TIL 39k + 6,7k | Humor negro. |
| La epidemia de baile de 1518 | Zack 25M; TIL 6,2k | https://es.wikipedia.org/wiki/Epidemia_de_baile_de_1518 |
| Mike, el pollo que vivió 18 meses sin cabeza | Zack 34M | https://es.wikipedia.org/wiki/Mike_el_pollo_sin_cabeza |

---

## 5. Recomendaciones de formato (sacadas de los datos)

- **Gancho en segunda persona con amenaza o pregunta** en el primer segundo. Por ejemplo: «Si alguna vez ves "Síndrome K" en un papel… es que alguien te salvó la vida»; «Imagina que tu pueblo entero gana el Gordo… y tú no».
- **Antagonista o prueba claros** (nazis, casero, emperador, amo, diablo) y **una trampa o un objeto cotidiano que decide la historia** (una tos, una semilla cocida, caramelos, un discurso en el bolsillo).
- **El remate, en una frase citable al final**, porque es lo que se comparte.
- **Duración de 70-90 s**: los datos no la penalizan cuando la historia engancha.
- **Copiar el truco del objeto escondido** (su caracol) con un elemento propio del canal, y pedir la siguiente historia en comentarios.
- Evitar lo épico y patriótico y lo de «hay que explicar el contexto primero», que es lo que menos rinde (Cid, senyera).
