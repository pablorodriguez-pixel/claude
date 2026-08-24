# Concepto B — Webinar «IA para séniors»

Variante para test A/B frente a
`founderz.com/es/webinar/convierte-experiencia-en-ventaja-con-ia/`.

## Hipótesis

Demostrar la tesis del webinar antes de pedir el registro convierte mejor que
afirmarla y pedir el registro en paralelo.

La original dedica un H3 de la segunda sección a su mejor idea —«Junior vs
senior. Mismo uso, diferentes resultados»— y pide los datos sin haber
demostrado nada. Aquí esa idea es el hero y es jugable: tres rondas de dos
prompts, un toque cada una, y al final el CTA se reescribe con el resultado del
visitante.

## Métricas

- **Primaria:** registros / visitantes únicos.
- **Secundarias:** % que empieza el juego, % que lo termina, correlación entre
  aciertos y registro, scroll depth.
- **Corte:** 50/50, mínimo dos semanas o 400 registros por rama.

Riesgo a vigilar: si demasiada gente acierta las tres, el argumento se cae
—le estás diciendo «ya lo distingues» justo antes de pedirle que aprenda—. Hay
un mensaje distinto para ese caso, pero si más del 30% saca 3/3 hay que
endurecer los pares.

## Cómo está hecho

Estático, sin dependencias ni build. `index.html` con el CSS en la propia
página y RundDisplay servida desde `fonts/`.

Los tokens no salen de la guía en prosa sino de
`reference/founderz-maqueta/css/main.css`, que es lo que corre en producción:
`.button` con `gap:8px`, `line-height:1` y `letter-spacing:.01em`; radios
1.875rem desktop y 1.375rem bajo 579px; purple `#5045c8` con hover `#2f2976`;
gris de contraste `#5a5a5a`; borde de formulario `#b6b6b6`; sombra flotante
`0 10px 40px rgba(0,0,0,.08)`. El hero es de dos columnas —copy a la izquierda,
card a la derecha— igual que `/maic`.

Incluye la cara `Rund Fallback` con `size-adjust: 75.6%` que pide el dossier
para evitar el salto de texto al cargar la fuente, y que no estaba aplicada en
ningún otro sitio del sistema.

## Estado

Cumple las reglas #4 (país y prefijo), #5 (TyC enlazados) y #6
(`appearance:none` con chevron propio), y el objetivo táctil de 44px.

**Falta antes de mandarle tráfico real:**

1. `noindex, nofollow` (regla #1) — no está puesto.
2. GTM `GTM-5B9S6LB` (regla #2) y el script de HubSpot (regla #3).
3. Cablear el formulario a un endpoint real y al `hs_form_id` que corresponda,
   con las propiedades de programa de la regla #8. Hoy el submit es una
   simulación en cliente.
4. Confirmar la fecha: el hero de la página original dice 17 de septiembre y su
   sección de reserva dice 8 y 9. Aquí se ha usado el 17 en todas partes.

## QA

`qa-390.png` — partida completa a 390px. Sin overflow horizontal
(`scrollWidth` 390 = `clientWidth`), un solo `h1`, imágenes con `alt`, inputs y
botones a 48px.
