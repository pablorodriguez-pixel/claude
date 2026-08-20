# Arquetipos de LP Founderz

Extraído del corpus real de `ia.founderz.com` (25 rutas en producción, análisis
de 2026-08-20). Cada arquetipo define objetivo, secciones obligatorias, form y
métrica. **El agente debe empezar clasificando la petición en uno de estos seis.**

Datos crudos: `refs/lp-corpus.json` · HTML original: `refs/lps/*.html`

---

## A. Captación de máster (alto ticket, ciclo largo)

**Ejemplos reales:** `/maic` (13 secciones, 1.497 palabras), `/maic-dossier`, `/creativos`, `/creativos2`
**Objetivo:** solicitud de información o descarga de dossier → deal en HubSpot.
**KPI:** leads cualificados / coste por lead.

Secciones (orden canónico):
1. Nav flotante + CTA
2. Hero con **pricing card** (precio, financiación, 4-6 bullets, doble CTA)
3. Social proof inmediato (logos Microsoft / Freepik / nº alumnos)
4. Value prop + vídeo
5. Temario / estructura del programa (acordeón de módulos)
6. Especialización por industria (chips)
7. Certificación / insignia
8. Profesores (grid)
9. Testimonios de alumni
10. Precio + financiación + garantía de devolución
11. FAQs
12. Bloque B2B ("¿Tu empresa también quiere dar el salto?")

Reglas propias: precio siempre visible con tachado + ahorro en €. Módulos con
descripción de **máx. 1 línea**. "Qué aprenderás" en 3 bloques temáticos con
iconos, **nunca** una ristra de tags.

---

## B. Captación de webinar / masterclass en directo

**Ejemplos reales:** `/webinaraiact` (el mejor ejecutado), `/webinar-maic`, `/en-septiembre-despega`
**Objetivo:** registro al evento.
**KPI:** registros, y ratio registro → asistencia.

Secciones:
1. Hero con fecha/hora + form de registro **above the fold** (no CTA a otra página)
2. "Por qué esto te aplica ahora" (urgencia real: ley, plazo, edición)
3. Qué te llevas (bullets concretos)
4. Ponentes con credenciales
5. Prueba social
6. Cierre con repetición del form
7. Letra pequeña ("Antes de apuntarte")

Reglas propias: el form va en el hero **y** repetido al final. Urgencia honesta
(fecha real, no countdown falso). `/en-septiembre-despega` es la única del corpus
con countdown, y lo justifica con tres fechas reales de emisión.

---

## C. Lead magnet interactivo (test, diagnóstico, calculadora)

**Ejemplos reales:** `/diagnostico-ia`, `/diagnostico-ia-diseno`, `/diagnostico-ia-experiencia`,
`/diagnostico-ia-finanzas`, `/diagnostico-ai-act`, `/test-ia-act`, `/ai-act-assessment`,
`/calculadora-horas-ia`, `/calculadora-salarial-ia`, `/puede-la-ia-hacer-tu-trabajo`,
`/lleva-la-ia-a-tu-empresa`
**Objetivo:** email a cambio de un resultado personalizado.
**KPI:** inicio → finalización → email capturado.

Patrón: React de cliente. El HTML servido es un shell (~95 palabras) y toda la
experiencia es interactiva. Flujo canónico:
1. Portada corta: promesa del resultado + tiempo estimado ("2 minutos")
2. Preguntas de una en una, con barra de progreso
3. **Gate de email antes del resultado** (aquí está la conversión)
4. Resultado personalizado + CTA al programa que corresponda
5. API route propia en `app/api/<slug>/` que crea el contacto

Reglas propias: nunca más de 8 preguntas. Barra de progreso siempre. El
resultado debe ser específico y accionable, no un genérico "tienes potencial".

---

## D. B2B / empresas

**Ejemplos reales:** `/compliance` y `/fundae` (gemelas: 97% de vocabulario común,
mismo componente con `variant="fundae"`)
**Objetivo:** solicitud de reunión comercial.
**KPI:** reuniones agendadas.

Secciones:
1. Hero con dolor regulatorio o de negocio concreto
2. Prueba social agregada ("+1.700 empresas, +700.000 profesionales")
3. **El coste de no actuar** (sección propia — muy efectiva)
4. Qué aprenderá tu equipo
5. Por qué Founderz
6. Testimonios
7. Temario con horas
8. Form de contacto comercial extenso

Reglas propias: form largo aceptable (10 inputs, 6 selects) porque el lead vale
más. Aquí van `numemployees`, `company_industry`, `country_lead` ISO.
Patrón de reutilización: **una sola página con `variant`**, no dos copias.

---

## E. VSL / gate de vídeo

**Ejemplos reales:** `/` (45 palabras), `/creativos/video`
**Objetivo:** ver el vídeo, y desde ahí convertir.
**KPI:** play rate y retención.

Página mínima deliberada: promesa + reproductor + un solo CTA. Sin nav, sin
footer pesado, sin nada que compita con el play. `/` usa sesión de servidor
(`/api/get-vsl-session`) para controlar el acceso.

---

## F. Post-conversión (gracias / asesoría)

**Ejemplos reales:** `/maic-dossier/gracias`, `/maic-dossier/asesoria` (56 palabras)
**Objetivo:** siguiente paso inmediato tras convertir.
**KPI:** ratio de avance al paso siguiente.

Confirmación + entrega de lo prometido + **un único** siguiente paso (agendar
asesoría, unirse a comunidad). Nunca reabrir la venta entera aquí.

---

## Veredicto de calidad del corpus (2026-08-20)

Evaluado sobre el HTML de producción: estructura, copy, mecánica CRO,
accesibilidad y fidelidad de marca. **No he podido ver píxeles** — el host está
fuera de la política de egress de la sesión, así que no hay screenshots.

**Referencias a imitar:**

| LP | Por qué |
|---|---|
| `/webinaraiact` | La más limpia técnicamente: 31 imágenes **todas** con `width`/`height` (cero CLS), form completo con país + prefijo + TyC + `appearance:none`. Copy con la mejor línea del corpus: "Esta consulta, en un despacho, se factura por horas." |
| `/maic-dossier` | Mejor arquitectura de persuasión: abre con resultados de alumni ("Empezaron exactamente donde estás tú. Mira lo que crean hoy.") antes de hablar de temario. Prueba antes que promesa. |
| `/compliance` + `/fundae` | Mejor ingeniería: acordeón con `<details>` nativo (accesible sin JS), 0 imágenes sin `alt`, 0 sin dimensiones, y una sola página con `variant`. La sección "El coste de no adaptarse" es la pieza CRO más fuerte del corpus. |
| `/registro` | Mejor economía de medios: 0 imágenes, 808 palabras, y cierra con "Dentro de 15 días habrá gente que sabrá más IA que hoy. Decide estar en ese grupo." |
| `/maic` | La más completa (13 secciones): el mapa de referencia para cualquier LP de máster. |
| `/creativos2` vs `/creativos` | El test A/B mejor planteado. El H1 de la 2 ("La IA no va a reemplazarte. Va a reemplazar al creativo que no sabe usarla.") es netamente superior. |

**Deuda detectada (arreglar, y no repetir en LPs nuevas):**

1. **`/webinar-maic` no enlaza los TyC en su form** → incumple la regla obligatoria #5. Es además la más fina del grupo (2 H2, 194 palabras).
2. **Riesgo de CLS por imágenes sin dimensiones**, en contra del objetivo PSI ≥98: `/maic-dossier` 65 de 66, `/maic` 49 de 72, `/creativos` 31 de 33, `/creativos2` 30 de 30, `/webinar-maic` 22 de 23. Las que lo hacen bien: `/webinaraiact`, `/compliance`, `/fundae`, `/en-septiembre-despega`.
3. **Deriva del negro de marca**: el oficial es `#111115` y solo lo usan `/creativos` y `/registro`. El resto usa `#1a191d` o `#03001d`. El púrpura sí es consistente (`#5045c8` + `#2f2976` en las 25).
4. `/compliance` y `/fundae` comparten el 97% del texto: cualquier cambio de copy hay que hacerlo en el componente, no en una de las dos.

**Bien en las 25, sin excepción:** `noindex, nofollow`, GTM `GTM-5B9S6LB`, HubSpot 25912905, exactamente un `<h1>`, y 6 preloads de RundDisplay.
