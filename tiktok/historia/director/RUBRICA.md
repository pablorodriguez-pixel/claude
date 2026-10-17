# RÚBRICA DEL DIRECTOR CREATIVO — «Esto no venía en el libro»

Sirve para juzgar ideas, guiones y vídeos terminados con el mismo criterio. Está calibrada con los datos reales del canal.
Ser exigente significa esto: si no llega al listón, no se publica. Un vídeo flojo hace más daño que un día sin publicar,
porque enseña al algoritmo que la cuenta aburre.

## 1. Calibración (datos reales, 17/10/2026)
| Banda | Visualizaciones | Vídeos del canal | Qué tenían en común |
|---|---|---|---|
| **A** | ≥ 20 mil | Napoleón 64 mil, OK 44,7 mil | Le dice al espectador que algo SUYO es falso (su altura de referencia, su palabra diaria). Debate inmediato («1,68 es bajito»), dudas en comentarios, pregunta final abierta + «Os leo». |
| **B** | 5–20 mil | Semana 12,2 mil, Einstein 11,4 mil, Hora ~11 mil | Algo cotidiano o personal (días, suspensos, la hora en España), pero con menos pelea: lo aceptas y ya. |
| **C** | 1–5 mil | Cleopatra 1,2 mil, Vikingos 1,2 mil, SOS 1 mil | «Historia de otros», mito ya desmontado mil veces, o hay que hacer cuentas. |
| **D** | < 1 mil | Colón 699, Muralla 522, Emú 180 | Mito quemado (todo el mundo ya lo sabe) o tema que no le importa a nadie. |

(La @, con 440, era demasiado reciente para clasificarla.)

La estimación de exposición es una BANDA, no una cifra. Se razona comparando con el vídeo calibrado más parecido.
TikTok tiene mucha varianza: un vídeo de banda B puede dar la campanada, pero uno de banda D casi nunca.

## 2. Puertas eliminatorias (si falla una → no se publica tal cual)
- **P1 · Mito quemado.** Si la «verdad» que contamos ya es de dominio popular (vikingos sin cuernos, Muralla desde el espacio, Colón y la Tierra plana,
  …), se descarta, por bien hecho que esté. Prueba: si casi todos tus amigos dirían «ya lo sabía», está quemado.
- **P2 · Filtro de tema ≥ 4/5:** (a) toca su vida diaria, (b) le dice que está equivocado, (c) lo puede comprobar en el momento (contar, mirar el teclado, decirlo en voz alta),
  (d) funciona en España Y en Latinoamérica (parte del público es latino), (e) genera debate o respuesta personal.
- **P3 · Gancho:** la primera palabra es el tema; dura ≤ 3,5 s; es una afirmación que contradice y apela a «tú»; no da la respuesta.
- **P4 · Portada (fotograma 0):** se entiende en la miniatura del perfil (≈150 px de ancho): ≤ 6 palabras grandes, un objeto icónico gigante, planteada como pregunta, y ya en movimiento.
- **P5 · Promesa pagada antes del segundo 30.**
- **P6 · Precisión:** ningún dato dudoso fuera del «Ojo». Si hay una cifra discutible en pantalla, no se publica.
- **P7 · Audio:** el QA de `engine/audio.py` tiene que dar OK (voz ≥ 20 dB sobre la música y el gancho dicho con energía).

## 3. Puntuación (100 puntos)
| Bloque | Peso | 10/10 es… | 0–3/10 es… |
|---|---|---|---|
| **Tema** | 25 | «Me lo dices a MÍ, y lo compruebo ya» (OK, Napoleón) | Curiosidad de enciclopedia sobre otros |
| **Gancho + portada** | 20 | Miniatura que se entiende sin leer; 3 s que te obligan a quedarte | Texto pequeño, escena compleja, respuesta destripada |
| **Retención** | 20 | Algo nuevo cada 1–2 s; contexto en una frase; ninguna línea > 7 s sin cambio de plano; «Ojo» ≤ 6 s; 55–65 s | Bloques de fechas y nombres; planos de más de 2,5 s parados |
| **Conversación** | 15 | Debate incorporado + pregunta final que pide una respuesta personal (su mes, su palabra, su país) + comentario fijado | «¿Lo sabías? Sí o no» y nada más |
| **Chispa** | 15 | El Vecino tiene opinión: ironía cariñosa, ≥ 2 frases citables, un remate que darías por capturado, gag del emú | Locución de documental, sin personalidad |
| **Factura** | 5 | Grabado limpio, sellos a tiempo, nada cortado ni fuera de las zonas seguras | Errores visibles |

**Veredicto:**
- **≥ 80 → PUBLICAR** (con el texto y el comentario fijado que proponga el director).
- **70–79 → ARREGLAR**: solo se publica si los arreglos son baratos (visuales o de texto) y suben la nota a ≥ 80. Si hace falta rehacer la voz, se justifica por qué compensa.
- **< 70 o cualquier puerta suspendida sin arreglo → DESCARTAR** (o reconvertir el tema en otro formato, por ejemplo un vídeo-respuesta).

Referencias de nota (para no inflar): Napoleón ≈ 88 · OK ≈ 87 · Semana ≈ 76 · Einstein ≈ 74 · Cleopatra ≈ 58 · Vikingos ≈ 52.

## 4. Lo que NO es negociable en la chispa
- El Vecino es un vecino cotilla y culto que te cuenta el chisme histórico en el rellano, no un profesor.
- Tutea y se mete un poco contigo, con cariño («te lo han colado», «no es culpa tuya»).
- Cada vídeo deja una frase para repetir en el bar.
- Nunca es borde, nunca es político ni toma partido en temas de identidad o patria (ojo con Himno).
