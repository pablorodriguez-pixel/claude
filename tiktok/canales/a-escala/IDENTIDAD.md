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
| Pregunta | «¿Cuánto es?» | **«¿Qué le pasa a ese dinero?»**: inflación, comisiones, interés compuesto |
| Firma visual | Etiquetas sueltas | **Cota dorada** que acota todo lo que se mide; pérdidas en rojo |
| Cierre | Loop | El cierre del creador sobre la torre, que enlaza con el primer fotograma |

## 0. Cómo se hace: el método del kit «Videos-virales-3d»
El canal sigue el método y las guías del kit del creador (guion, formatos, dibujo, looks, subtítulos, sonido):
- **El guion manda** y se escribe para el ojo: cada frase se ve pasar; comparaciones con cosas de casa.
- **Hook:** de qué va el vídeo con su nombre, nunca una cifra delante; espectacular desde el fotograma 0.
- **Formatos** que mejor le van a las finanzas: `escala` (cifras enormes), `mito` («el banco es lo más seguro»),
  `comparacion` (oro contra bolsa), `pregunta`, `dentro` (cómo funciona un fondo indexado), `historia` (burbujas).
- **Cada plano empieza en su palabra** de la voz; la cámara solo se mueve cuando la voz lo pide.
- **Sonido:** solo los efectos aprobados del kit (`build/sonidos/`), sin huecos de más de 2 s, por debajo de la voz.
- **Pantalla:** nada importante por encima de y 270, por debajo de y 1440 ni a la derecha de x 950 desde y 1050.

### La marca (equivalente a `marca.json`)
| Ajuste | Valor |
|---|---|
| idioma | `es` |
| look | `espacio`/noche con oro (look propio del canal: noche azul, la torre y las cifras en oro, el rojo solo para pérdidas) |
| subtitulos | `palabra`, `abajo` (Figtree ExtraBold, contorno negro, velo suave); la clave de cada frase, en oro y más grande |
| voz | Jaime (`43h7ymOnaaYdWr3dRbsS`), `eleven_v3` |
| firma | `A ESCALA`, abajo (y 1400) — cambiar por el @ del canal |
| cierre | Serie de trucos: «Y este es solo el truco #N para poner tu dinero a trabajar. Sígueme para el siguiente.» (EP01 usó «Envíaselo a ese amigo…») |
| duración | 40-60 s |
| efectos | sí |

## 1. Marca
- **Nombre:** `A ESCALA` · logotipo: la palabra en Unbounded 800 (la firma de los vídeos va en Figtree).
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
- **Figtree ExtraBold** (la letra del kit, OFL): subtítulos `palabra`, pastillas y cotas.
- **Unbounded 800**: solo el logotipo.

## 4. Lenguaje visual
1. **Escalera de escalas:** mesa (mm) → calle (m) → cielo (km) → órbita (miles de km). Cortes secos entre escalas.
2. **Medidas reales:** billete 140 × 77 mm, 0,1 mm de grosor por billete. La torre usa una anchura mínima en píxeles para seguir viéndose como un hilo dorado a cualquier distancia.
3. **Cota dorada** (raya con flechas y la cifra) en cada plano que mide algo; **pastillas** oscuras con la cifra en oro, ancladas a objetos 3D.
4. **Rojo = pérdida**: el tramo que desaparece se vuelve rojo y se deshace en partículas.
5. **El cierre enlaza con el hook:** el último plano vuelve a la imagen del primero, para que se vea dos veces sin notarlo.

## 4b. Ritmo (de la referencia del creador)
- La cámara **no para**: rutas continuas que arrancan y frenan en las palabras; un cambio de encuadre cada 0,5-1,5 s.
- **Objetos grandes y cerca**: la cosa llena media pantalla o más; nada pequeño en un fondo vacío.
- **Pocos cortes** (4-5 por vídeo), solo entre mundos (mesa ↔ ciudad ↔ espacio).
- Cifras en **pastillas fijas** arriba-centro (y ≈ 560), dentro de la zona segura.

## 5. Estructura
La del formato elegido (ver `guia/formatos.md` del kit). Para `escala`, el del EP01:
hook (la cosa con su nombre) → la cifra y la promesa de verla → la unidad de casa (un billete) → la regla de casa
(un fajo, 1 cm) → crece pasando por cosas conocidas → el tamaño final → lo que le pasa (inflación) → remate → cierre.

## 6. Voz
- ElevenLabs `eleven_v3`, voz **Jaime** (`43h7ymOnaaYdWr3dRbsS`), peninsular, cálida y segura. Etiquetas `[calm]`, `[excited]`, `[serious]`.
- Tuteo, frases cortas, cifras redondeadas en voz y exactas en pantalla. Cada cifra con fuente y fecha.

## 7. Pipeline
```
<episodio>/script.txt → tts.py → voice_raw.mp3 → stt.py → stt.json
build/build.py <episodio>   → <episodio>/build/video.html (overlay + scenes.js del episodio)
build/render.js <ep>/build video <dur>   (three.js por WebGL/SwiftShader en Playwright → video_noaudio.mp4)
build/mezcla.py <episodio>   (sonidos.py del episodio + voz → mezcla.wav)
ffmpeg mux → <episodio>.mp4
```
- `build/lib.js`: texturas procedurales (billete estilizado, madera, ventanas, nubes), fajo, torre, corchete y etiquetas.
- `build/tex/`: Tierra día/noche de NASA (dominio público, Wikimedia Commons).
