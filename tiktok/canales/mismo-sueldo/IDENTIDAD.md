# MISMO SUELDO — identidad del canal (finanzas personales con personajes)

> **Qué es:** un canal vertical donde **personajes con el mismo sueldo toman decisiones distintas con su dinero** y ves
> a dónde lleva cada camino. Historias de contraste, cortas, con números reales.
> **Promesa:** «Mismo sueldo. Distinto final.»

Sustituye a A ESCALA / «Dinero que trabaja» (noche, monedas y tarros abstractos): ~800 vistas por vídeo, nadie con quien
identificarse. Aquí cada vídeo es **una persona como tú** y una pregunta: **«¿tú quién eres?»**.

## 1. Marca
| | |
|---|---|
| Nombre | **Mismo Sueldo** · @mismosueldo (comprobar que está libre; alternativas: @mismosueldo.es, @mismo.sueldo) |
| Lema | «Mismo sueldo. Distinto final.» |
| Logo | un **«=»** (mismo sueldo) cuya raya de abajo se escapa hacia arriba (distinto final). `marca/logo.py` |
| Bio | ver §8 |
| Aviso fijo | «Contenido educativo · no es asesoramiento financiero». Sin recomendaciones personalizadas (sin licencia CNMV). |

## 2. Paleta (clara y viva: lo contrario de la noche anterior)
| Token | Hex | Uso |
|---|---|---|
| `--crema` | `#FFF4E6` | Fondo base, estudio |
| `--amarillo` | `#FFC93C` | Marca, el sueldo, tarima, pastillas |
| `--tinta` | `#1D1B2F` | Texto, contornos |
| `--coral` | `#FF6B57` | Lucía · el camino de siempre · pérdidas |
| `--verde` | `#19C37D` | Marcos · el camino que crece · ganancias |
| `--lila` | `#8E7CC3` | Carmen |
| `--azul` | `#2F80ED` | Toni |
Regla: **coral = lo que se pierde, verde = lo que se gana**. Nunca rojo/verde como únicos portadores de la información:
siempre con cifra y símbolo (−/+), por accesibilidad.

## 3. Elenco (`build/blender/personajes.py`)
Estilo **juguete 3D**: cabeza grande, cuerpo de cápsula, colores planos, caras que cambian de ánimo (boca y cabeza).
| Personaje | Quién es | Rol en las historias |
|---|---|---|
| **Lucía** (coral) | 29, enfermera. Ordenada, ahorra… en la cuenta del banco. | Hace «lo normal». No es tonta: hace lo que le enseñaron. El espectador se ve en ella. |
| **Marcos** (verde) | 29, mismo sueldo que Lucía. | Hace lo mismo con **una decisión distinta**. No es un gurú ni un rico: amable, constante. |
| **Carmen** (lila) | 72, la abuela de Lucía. Gafas, moño. | La memoria: «en mi época el pan costaba…». Inflación, historia, sentido común. |
| **Toni** (azul) | 35, el cuñado. Gorra, gafas de sol, cadena. | El consejo malo que suena bien: cripto milagro, «esto no falla», trading. El contraste cómico. |
Reglas: Marcos **no siempre gana** (a veces Lucía acierta y Toni pierde) → credibilidad. Nadie se ríe de nadie.

## 4. Formato de cada vídeo (25-35 s)
1. **Fotograma 0 = el final**: los dos resultados con «¿?» + premisa en pantalla («MISMO SUELDO · 1.800 €»).
2. **La bifurcación** (2-3 s): la decisión de cada uno, en una frase.
3. **El tiempo pasa**: contador (edad, meses o años) y las cifras se separan.
4. **El golpe**: la cifra final grande + el giro (inflación, comisiones, lo que no se ve).
5. **La lección en una línea** (sin sermón).
6. **Cierre**: «¿Tú eres Lucía o Marcos?» (comentarios) + «Guárdalo» (guardados).
Ritmo: un cambio de plano cada 1-2 s; voz Jaime con energía (`[excited]` al principio y al final); subtítulos por frases.

## 5. Tipografía
- **Fredoka** (OFL, `fuentes/`): titulares, cifras, logo. Redonda y amable, va con los personajes.
- **Figtree ExtraBold**: subtítulos por frases (contorno tinta).

## 6. Voz
Jaime (ElevenLabs `43h7ymOnaaYdWr3dRbsS`, `eleven_v3`), atempo ≈1,1, pausas recortadas. Tuteo, frases cortas.

## 7. Producción
- 3D en **Blender** (estudio crema, tarima amarilla, focos suaves): `build/blender/`. En la nube solo Cycles por CPU (lento);
  en el Mac M4 con EEVEE (GPU), minutos por vídeo.
- Capa de textos HTML + voz + efectos: el pipeline de `../a-escala/build/` (subtítulos por frases, barra de progreso, mezcla).
- Cada cifra con su cálculo en `idea.md` del episodio; supuestos visibles en pantalla («8 %/año, media histórica, no garantizada»).

## 8. Bio (TikTok, ≤80 caracteres)
> Mismo sueldo. Distinto final. 💸 Historias de dinero para elegir bien 👇

Alternativa: «Lucía y Marcos cobran lo mismo. Uno acaba mucho mejor. ¿Tú quién eres?»

## 9. Primeros episodios
1. **Banco vs fondo indexado** — 200 €/mes de los 25 a los 65 (piloto hecho: 96.000 € vs 698.202 €).
2. **Pagar el alquiler vs comprar** — mismo sueldo, Lucía compra a los 30 y Marcos alquila e invierte la diferencia (con honestidad: depende).
3. **El coche nuevo** — Lucía se compra uno de 30.000 € a plazos; Marcos uno usado de 9.000 € e invierte la diferencia.
4. **El café de cada día** — 3 €/día durante 30 años (y por qué no es lo importante: la abuela Carmen lo explica).
5. **Toni y la cripto milagro** — Toni mete 5.000 € «en la que va a subir»; Marcos, en el índice mundial.
6. **La subida de sueldo** — los dos ganan +300 €/mes: Lucía sube su nivel de vida; Marcos invierte la mitad.
7. **El fondo de emergencia** — se rompe la caldera: Lucía tira de tarjeta al 20 %; Marcos tiene 3 meses guardados.
8. **Las comisiones** — fondo del banco al 2 % vs indexado al 0,2 %: mismo dinero, 30 años, cuánto se queda el banco.
9. **La abuela Carmen y la inflación** — lo que compraban 100 € en 1990, 2010 y hoy.
10. **Empezar a los 25 vs a los 35** — el coste de esperar diez años.
