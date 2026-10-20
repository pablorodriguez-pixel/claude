# Cómo está editado Napoleón (ep04, 99,6 mil) — checklist obligatorio de edición

Regla del usuario (20/10): «Todo es interesante si se cuenta bien. Edita bien.» Referencia: ep04_napoleon/nap_scenes.js.

## Lo que hace Napoleón y los últimos no
| Napoleón | Últimos (flojos) |
|---|---|
| Un **objeto-metáfora vivo** por idea: el medidor sube de 0,60 a 1,68 con rebote elástico, se pasa a 1,88 y vuelve | El dato aparece como chip o número |
| **Cambio visual cada 1–2 s**, cortado a la palabra (escenas de 1,1–3 s) | Escenas de 4–7 s con un solo elemento |
| **Personajes que actúan**: miran, levantan cejas, cambian la boca según lo que se dice | Bustos quietos o emojis botando |
| **Transformaciones**: caricatura → hombre real (escala + fundido) | Aparecer / desaparecer |
| **Titular fijo arriba** con la palabra clave pintada en amarillo (`headline('… *palabra*')`) | Texto suelto por escena |
| **Tachar el mito** en directo (línea roja que se dibuja) + sello NO/MITO que luego encoge a una esquina y se queda | Sello que aparece y ya |
| **Comparaciones físicas**: rueda de reconocimiento, gente entrando desde los lados con rebote escalonado | Dos chips |
| **Golpe de color** de ~1 s con texto que vibra (glitch) para cada remate | Un golpe al final |
| **Cámara**: zoom lento continuo (1,04 → 1,08) y salida con zoom/barrido hacia la escena siguiente | Corte seco |
| **Micro-movimiento siempre** (wobble, vapor, rayos que giran) y **gags** (la silla que entra volando «¡siéntate!») | Fondo plano quieto |
| Emojis: **cero** | Muchos |

## Cómo contarlo bien (guion)
1. Protagonista con cara (alguien a quien le pasa algo), no «un dato».
2. El gancho promete y **no** resuelve; la respuesta llega al final (bucle abierto).
3. Cada 8–10 s: un giro **y** un gag visual.
4. Lo que se dice se ve **a la vez y de forma física** (medir, pesar, contar, tachar, romper).

## Antes de renderizar (comprobar en hoja.jpg)
- [ ] ¿Algún fotograma de la hoja es igual al anterior? → falta movimiento.
- [ ] ¿Hay algún emoji? → sustituir por figura.
- [ ] ¿Cada escena dura ≤ 3 s o tiene dentro un cambio cada ≤ 2 s?
- [ ] ¿Hay una transformación o un objeto-metáfora por dato?

## Lo que tenía el OK (ep07) y se perdió con la plantilla rápida — OBLIGATORIO desde el ep64
1. **El Vecino en su óvalo todo el vídeo**, hablando con la voz y reaccionando: `Story.run({ ovalo:[[a,b]], vecino:{ risa:[[a,b]], sorpresa:[[a,b]], golpes:[t,…] } })`. Óvalo abajo a la izquierda (x<300, y 1040–1360): no poner nada importante ahí.
2. **Textura de papel + viñeta + borde quemado** encima de todo: `Story.run({ textura: true })`.
3. **Portada con movimiento**: fotograma 0 completo (título + escena), y desde ahí todo se mueve: el personaje habla con la voz (`talkW`), guiña, los objetos del fondo bailan, los rayos giran, «¡ja!» y sello en la palabra clave.
4. **Escenarios que llenan la pantalla** (botica con estanterías, mar con olas y gaviotas, cocina con azulejos, cementerio de noche), nunca un objeto suelto sobre fondo liso.
5. **Objetos con cara** que actúan (botella `botFace`, tomate `tomFace`) y gente que reacciona (clientes, marinero, boticario).
6. **Cero segundos muertos**: si una escena dura >2 s, algo cambia (puerta que se abre, candado, periódico que entra girando).
7. **Sonido denso**: un sfx en cada aparición (helper `sp(t, 'pop')`) y un temblor en cada remate.
