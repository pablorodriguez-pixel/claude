#!/usr/bin/env node
/**
 * Andamiador de landing pages Founderz.
 *
 *   npm run new -- --slug webinar-copilot --tipo webinar --titulo "Webinar Copilot"
 *
 * Crea app/<slug>/{layout.tsx,page.tsx,<slug>.css} a partir del arquetipo
 * correspondiente (memory/02-arquetipos-lp.md) con las reglas obligatorias ya
 * cableadas: noindex, form con país + prefijo + TyC, sticky CTA, imágenes con
 * dimensiones.
 *
 * El andamiaje NO es la LP terminada: es el esqueleto correcto sobre el que el
 * agente escribe copy y secciones reales.
 */
import fs from "node:fs";
import path from "node:path";

const TIPOS = ["master", "webinar", "leadmagnet", "b2b", "vsl", "gracias"];

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith("--")) continue;
    const key = argv[i].slice(2);
    const next = argv[i + 1];
    if (next && !next.startsWith("--")) {
      out[key] = next;
      i++;
    } else {
      out[key] = true;
    }
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
const slug = args.slug;
const tipo = args.tipo;
const titulo = args.titulo ?? slug;

function die(msg) {
  console.error(`\n✗ ${msg}\n`);
  console.error(
    "Uso: npm run new -- --slug <slug> --tipo <" +
      TIPOS.join("|") +
      '> [--titulo "Título"]\n',
  );
  process.exit(1);
}

if (!slug) die("Falta --slug.");
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)?$/.test(slug)) {
  die(`Slug inválido: "${slug}". Solo minúsculas, números y guiones.`);
}
if (!tipo) die("Falta --tipo.");
if (!TIPOS.includes(tipo)) die(`Tipo desconocido: "${tipo}".`);

const dir = path.join("app", slug);
if (fs.existsSync(dir)) die(`Ya existe ${dir}. Elige otro slug o bórralo antes.`);

// No pisar una ruta que ya está viva en producción por accidente.
const prod = JSON.parse(fs.readFileSync("refs/production-routes.json", "utf8"));
if (prod.pages.includes(`/${slug}`)) {
  console.warn(
    `\n⚠  /${slug} YA está en producción en ${prod.productionDomain}.\n` +
      "   Vas a crear una versión nueva en este repo. Confirma con Pablo que la\n" +
      "   intención es reemplazarla y no duplicarla.\n",
  );
}

const cssFile = slug.split("/").pop();

const layout = `import type { Metadata } from "next";

// Regla obligatoria #1: noindex en cada LP, sin excepción.
export const metadata: Metadata = {
  title: "${titulo}",
  description: "TODO: 150-160 caracteres, con el beneficio y un número concreto.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
`;

const css = `/* Estilos propios de /${slug}.
   Los tokens y componentes de marca viven en styles/founderz.css: no los
   redefinas aquí. Esta hoja es solo para lo específico de esta LP. */

.${cssFile}-hero {
  display: grid;
  gap: 2.5rem;
}

@media (min-width: 900px) {
  .${cssFile}-hero {
    grid-template-columns: 1.2fr 1fr;
    align-items: center;
  }
}
`;

const HEAD = (comment) => `import type { Metadata } from "next";
import Section from "@/components/Section";
import Accordion from "@/components/Accordion";
import StickyCta from "@/components/StickyCta";
import LeadForm from "@/components/LeadForm";
import "./${cssFile}.css";

/**
 * /${slug} — arquetipo: ${tipo}
 * ${comment}
 *
 * Antes de entregar: npm run qa -- --slug ${slug}
 */
`;

const FORM_BLOCK = `            <LeadForm
              action="/api/${cssFile}-lead"
              formId="TODO-hubspot-form-id"
              cta="TODO: CTA en imperativo"
              ctaPosition="hero"
            />`;

const FAQ_BLOCK = `      <Section
        eyebrow="Dudas"
        title="TODO: ¿Tienes dudas?"
        tone="light"
      >
        <Accordion
          name="faq"
          items={[
            { q: "TODO: ¿Esto tiene algún coste?", a: <p>TODO.</p> },
            { q: "TODO: ¿Necesito experiencia previa?", a: <p>TODO.</p> },
            { q: "TODO: ¿Qué pasa si no puedo asistir?", a: <p>TODO.</p> },
          ]}
        />
      </Section>
`;

const HERO = (extra) => `      <section className="fz-section fz-mindscape fz-mindscape--gradient">
        <div className="fz-container ${cssFile}-hero">
          <div>
            <p className="fz-eyebrow fz-eyebrow--light">TODO: EYEBROW</p>
            <h1>TODO: headline con el diferenciador concreto, nunca vago.</h1>
            <p className="fz-lead fz-lead--light mt-6 max-w-[52ch]">
              TODO: el &quot;cómo&quot; en 2-3 líneas. Dolor → transformación.
            </p>
${extra}
          </div>
          <div className="fz-card fz-card--float">
${FORM_BLOCK}
          </div>
        </div>
      </section>
`;

const BODIES = {
  master: `${HEAD("Ticket alto, ciclo largo. Precio visible con tachado y ahorro en €.")}
export default function Page() {
  return (
    <main id="main">
${HERO(`            <ul className="fz-list mt-8">
              <li className="text-white">TODO: beneficio + número</li>
              <li className="text-white">TODO: beneficio + número</li>
              <li className="text-white">TODO: beneficio + número</li>
            </ul>`)}
      <Section eyebrow="Programa" title="TODO: Estructura del programa">
        <Accordion
          name="modulos"
          items={[{ q: "TODO: Módulo 1", a: <p>TODO: una línea de impacto.</p> }]}
        />
      </Section>

      <Section eyebrow="Certificación" title="TODO: Tu nueva insignia profesional." tone="cream" />
      <Section eyebrow="Claustro" title="TODO: Profesores con mucha profesión." />
      <Section eyebrow="Alumni" title="TODO: Empezaron donde estás tú." tone="lilac" />
      <Section eyebrow="Precio" title="TODO: precio, financiación y garantía" />
${FAQ_BLOCK}
      <StickyCta label="TODO: Inscribirme" href="#form" note="TODO: 925 € · desde 71 €/mes" />
    </main>
  );
}
`,
  webinar: `${HEAD("Form en el hero Y repetido al final. Urgencia real: fecha, no countdown falso.")}
export default function Page() {
  return (
    <main id="main">
${HERO(`            <p className="fz-badge fz-badge--light mt-8">
              TODO: fecha y hora reales · 45 min · gratis
            </p>`)}
      <Section eyebrow="Por qué ahora" title="TODO: no es algo que viene, ya te aplica." />
      <Section eyebrow="Qué te llevas" title="TODO: lo concreto que sales sabiendo" tone="cream" />
      <Section eyebrow="Ponentes" title="TODO: quién lo da y por qué le crees" />
      <Section eyebrow="Prueba social" title="TODO: quién ya ha pasado por aquí" tone="lilac" />

      <Section id="form" eyebrow="Tu plaza" title="TODO: cierre con coste de oportunidad" tone="dark">
${FORM_BLOCK.replace('ctaPosition="hero"', 'ctaPosition="footer"\n              tone="inverse"')}
      </Section>
${FAQ_BLOCK}
      <StickyCta label="TODO: Reservar plaza" href="#form" />
    </main>
  );
}
`,
  leadmagnet: `${HEAD("Quiz/calculadora. Máx. 8 preguntas, barra de progreso, gate de email ANTES del resultado.")}
export default function Page() {
  return (
    <main id="main">
      <Section eyebrow="TODO: 2 minutos" title={<>TODO: promesa del resultado</>}>
        <p className="fz-lead max-w-[55ch]">
          TODO: qué sabrás al terminar, en una frase.
        </p>
        {/* El componente interactivo va aquí, como cliente:
            - una pregunta por pantalla, barra de progreso
            - gate de email antes de mostrar el resultado
            - resultado específico y accionable + CTA al programa que toque */}
        <div className="fz-card mt-8 max-w-[42rem]">
${FORM_BLOCK}
        </div>
      </Section>
    </main>
  );
}
`,
  b2b: `${HEAD("Form largo aceptable: el lead vale más. Incluye numemployees y company_industry.")}
export default function Page() {
  return (
    <main id="main">
${HERO("")}
      <Section eyebrow="Confianza" title="TODO: +1.700 empresas y +700.000 profesionales" tone="cream" />
      <Section eyebrow="Riesgo" title="TODO: el coste de no actuar">
        <p className="fz-lead max-w-[60ch]">
          TODO: la sección más efectiva del corpus B2B. Cuantifica la inacción.
        </p>
      </Section>
      <Section eyebrow="Formación" title="TODO: qué aprenderá tu equipo" tone="lilac" />
      <Section eyebrow="Temario" title="TODO: temario del curso · N horas" />
${FAQ_BLOCK}
      <Section id="form" eyebrow="Hablemos" title="TODO: hablemos de cómo formar a tu equipo" tone="dark">
${FORM_BLOCK.replace('ctaPosition="hero"', 'ctaPosition="footer"\n              tone="inverse"')}
      </Section>
      <StickyCta label="TODO: Hablar con un asesor" href="#form" />
    </main>
  );
}
`,
  vsl: `${HEAD("Página mínima deliberada: promesa + reproductor + un solo CTA. Nada que compita con el play.")}
export default function Page() {
  return (
    <main id="main">
      <Section eyebrow="TODO: acceso exclusivo" title={<>TODO: la promesa en una línea</>} tone="dark">
        {/* Reproductor con altura reservada: skeleton anti-CLS */}
        <div className="mx-auto aspect-video w-full max-w-[64rem] overflow-hidden rounded-[var(--fz-radius)] bg-black" />
        <div className="mt-8 flex justify-center">
          <a className="fz-btn fz-btn--inverse" href="#siguiente">
            TODO: único CTA
          </a>
        </div>
      </Section>
    </main>
  );
}
`,
  gracias: `${HEAD("Confirmación + entrega + UN único siguiente paso. Nunca reabrir la venta entera.")}
export default function Page() {
  return (
    <main id="main">
      <Section eyebrow="Listo" title={<>TODO: confirmación de lo que acaba de pasar</>}>
        <p className="fz-lead max-w-[55ch]">
          TODO: qué recibe, dónde y cuándo.
        </p>
        <div className="mt-8">
          <a className="fz-btn fz-btn--primary" href="#">
            TODO: el único siguiente paso
          </a>
        </div>
      </Section>
    </main>
  );
}
`,
};

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, "layout.tsx"), layout);
fs.writeFileSync(path.join(dir, "page.tsx"), BODIES[tipo]);
fs.writeFileSync(path.join(dir, `${cssFile}.css`), css);
fs.mkdirSync(path.join("public", slug), { recursive: true });

console.log(`
✓ /${slug} creada como arquetipo "${tipo}"

  ${dir}/layout.tsx      metadata + noindex
  ${dir}/page.tsx        secciones del arquetipo
  ${dir}/${cssFile}.css  estilos propios
  public/${slug}/        assets locales de esta LP

Siguiente:
  1. Sustituye todos los TODO por copy real (memory/05-cro-playbook.md).
  2. Descarga las imágenes a public/${slug}/ con width y height explícitos.
  3. Si el form genera deal, pregunta a Pablo las propiedades de programa (regla #8).
  4. npm run qa -- --slug ${slug}
`);
