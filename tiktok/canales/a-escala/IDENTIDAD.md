# A ESCALA — Identidad de canal (finanzas para saber invertir)

> **Qué es:** canal vertical de educación financiera e inversión donde **el dinero se ve a tamaño real**.
> Nada de infografías: cada cifra se convierte en billetes físicos en un mundo 3D que la cámara recorre.
> **Promesa:** «El dinero, a tamaño real.»

Referencia de partida: vídeo de forex apilado hasta el espacio (dólares, inglés, noche azul).
Lo que hace propio a A ESCALA:

| | Referencia | A ESCALA |
|---|---|---|
| Moneda / mercado | Dólar, EE. UU. | **Euro (billete de 50 €)**, hogar español |
| Ancla geográfica | Genérica | La torre **nace en Madrid**; hitos españoles (Torre de Cristal, 249 m) |
| Pregunta | «¿Cuánto es?» | **«¿Qué significa para tu dinero?»**: siempre bajamos a *tu cuenta* |
| Firma visual | Etiquetas sueltas | **Corchete de medida dorado** que acota todo lo que se mide |
| Cierre | Loop | Fajo «TU CUENTA» en la mesa y llamada a seguir |

## 1. Marca
- **Nombre:** `A ESCALA` · logotipo: corchete de medida dorado `⌶` + palabra en Unbounded 800.
- **Tagline:** «El dinero, a tamaño real.»
- **Aviso fijo** (cierre y descripción): «Contenido educativo · no es asesoramiento financiero». Nunca recomendaciones personalizadas (sin licencia CNMV).

## 2. Paleta
| Token | Hex | Uso |
|---|---|---|
| `--night` | `#0B1026` | Cielo/espacio, fondos |
| `--gold` | `#F5B841` | Corchetes, contadores, palabras-cifra del subtítulo, faja del fajo |
| `--euro` | `#E8833A` | El billete de 50 € (protagonista) |
| `--loss` | `#FF4B3E` | **Solo pérdidas**: inflación, comisiones, lo que desaparece |
| Madera | `#5a3418` | La mesa: el mundo «a escala humana» |

## 3. Tipografía
- **Unbounded 800**: subtítulos y titulares. Subtítulo **una palabra cada vez**, centrado (y ≈ 1160), blanco; las cifras en oro.
- **JetBrains Mono 700**: etiquetas, cotas, contadores, fuentes.

## 4. Lenguaje visual
1. **Escalera de escalas:** mesa (mm) → calle (m) → cielo (km) → órbita (miles de km). Cortes secos entre escalas.
2. **Medidas reales:** billete 140 × 77 mm, 0,1 mm de grosor por billete. La torre usa una anchura mínima en píxeles para seguir viéndose como un hilo dorado a cualquier distancia.
3. **Corchete dorado** en cada plano que mide algo; etiquetas pill ancladas a objetos 3D.
4. **Rojo = pérdida**: el tramo que desaparece se vuelve rojo y se deshace en partículas.
5. **Vuelta a casa:** cada vídeo termina en la mesa con el fajo «TU CUENTA».

## 5. Estructura (45–60 s)
| Bloque | Contenido |
|---|---|
| Hook (0–6 s) | Cifra enorme sobre la Tierra + contador en oro |
| «No significa nada hasta que lo apilas» | Corte a la mesa: 1 billete → 1 fajo con cota |
| Escalada | La torre sube por la ciudad, nubes, Everest, atmósfera, órbita |
| Giro | Lo que le pasa a ese dinero (inflación, comisiones, interés compuesto) en rojo/oro |
| Tu cuenta | Vuelta a la mesa: la lección aplicada a ti |
| Cierre | Tarjeta A ESCALA + «Sígueme» + aviso educativo |

## 6. Voz
- ElevenLabs `eleven_v3`, voz **Jaime** (`43h7ymOnaaYdWr3dRbsS`), peninsular, cálida y segura. Etiquetas `[calm]`, `[excited]`, `[serious]`.
- Tuteo, frases cortas, cifras redondeadas en voz y exactas en pantalla. Cada cifra con fuente y fecha.

## 7. Pipeline
```
<episodio>/script.txt → tts.py → voice_raw.mp3 → stt.py → stt.json
build/build.py <episodio>   → <episodio>/build/video.html (overlay + scenes.js del episodio)
build/render.js <ep>/build video <dur>   (three.js por WebGL/SwiftShader en Playwright → video_noaudio.mp4)
ffmpeg mux → <episodio>.mp4
```
- `build/lib.js`: texturas procedurales (billete estilizado, madera, ventanas, nubes), fajo, torre, corchete y etiquetas.
- `build/tex/`: Tierra día/noche de NASA (dominio público, Wikimedia Commons).
