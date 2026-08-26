import Section from "@/components/Section";
import Accordion from "@/components/Accordion";
import StickyCta from "@/components/StickyCta";
import LeadForm from "@/components/LeadForm";
import PromptGame from "./PromptGame";
import "./webinar-experiencia-ia-b.css";

/**
 * /webinar-experiencia-ia-b — arquetipo: webinar. Variante B para test A/B
 * frente a founderz.com/es/webinar/convierte-experiencia-en-ventaja-con-ia/
 *
 * Hipótesis: demostrar la tesis del webinar antes de pedir el registro
 * convierte mejor que afirmarla y pedir el registro en paralelo. La original
 * entierra su mejor idea —«Junior vs senior, mismo uso, diferentes
 * resultados»— en un H3 de la segunda sección. Aquí esa idea es el hero, y es
 * jugable.
 *
 * El formulario no espera al final: vive en la card del hero, que es el patrón
 * de /maic, y se repite al cierre.
 *
 * Datos del evento tomados del <main> de la página original:
 *   data-event-id="WS20260908MAII" · marketing-event-id="1320681880812"
 * De ahí sale la fecha: el 17 de septiembre que aparece en el hero de
 * producción contradice a su propia sección de reserva y al event_id.
 */

const EVENTO = {
  id: "WS20260908MAII",
  nombre: "Convierte tu experiencia en ventaja competitiva con IA",
  marketingEventId: "1320681880812",
  fecha: "8 y 9 de septiembre",
  hora: "19:00 h",
  duracion: "60 min por sesión",
};

/** ES_MAII_WEBINAR (NEW). Verificado contra el portal 25912905. */
const FORM_ID = "508dcd4b-09b8-44bc-88a3-3c9184218c97";
const ENDPOINT = "/api/webinar-experiencia-ia-b-lead";

export default function Page() {
  return (
    <main
      id="main"
      data-event-id={EVENTO.id}
      data-event-name={EVENTO.nombre}
      data-marketing-event-id={EVENTO.marketingEventId}
    >
      <p className="wb-topbar">
        Webinar gratuito en directo · <b>{EVENTO.fecha}</b>, {EVENTO.hora} ·{" "}
        {EVENTO.duracion} · Queda grabado
      </p>

      {/* ── HERO: copy + juego a la izquierda, formulario a la derecha ── */}
      <section className="wb-hero">
        <div className="fz-container wb-hero-inner">
          <div className="wb-hero-left">
            <p className="fz-eyebrow">Para profesionales con oficio</p>
            <h1 className="wb-h1">
              ¿Distingues un prompt de júnior <em>de uno de sénior?</em>
            </h1>
            <p className="fz-lead wb-hero-lead">
              Dos prompts, uno al lado del otro. Uno lo escribió alguien que
              domina la herramienta; el otro, alguien que lleva quince años
              decidiendo. Tres rondas, un toque cada una.
            </p>

            <PromptGame />
          </div>

          <aside className="wb-hero-right">
            <div className="fz-card fz-card--float wb-card">
              <p className="fz-badge fz-badge--purple">Plazas gratuitas</p>
              <h2 className="wb-card-title">Deja tus datos y entras</h2>
              <p className="wb-card-sub">
                Te mandamos el enlace del directo, la grabación y la guía «Cómo
                conseguir que tu empresa te permita trabajar con IA».
              </p>

              <dl className="wb-when">
                <div>
                  <dt>Cuándo</dt>
                  <dd>{EVENTO.fecha}</dd>
                </div>
                <div>
                  <dt>Hora</dt>
                  <dd>{EVENTO.hora}</dd>
                </div>
                <div>
                  <dt>Precio</dt>
                  <dd>0 €</dd>
                </div>
              </dl>

              <LeadForm
                action={ENDPOINT}
                formId={FORM_ID}
                cta="Reservar mi plaza"
                ctaPosition="hero"
              />
              <p className="wb-proof">+4.500 profesionales ya registrados</p>
            </div>
          </aside>
        </div>
      </section>

      <Section
        eyebrow="Lo que acabas de ver"
        title={
          <>
            La diferencia no está en la herramienta.
            <br />
            Está en el criterio.
          </>
        }
        lead="Saber qué pedir, para quién, con qué límites y con qué criterio para juzgar lo que sale. Eso no se aprende leyendo la documentación de una herramienta: se aprende viendo trabajar a alguien que lleva quince años decidiendo."
        tone="cream"
      >
        <div className="wb-grid">
          <div className="wb-tile">
            <span className="wb-n">01</span>
            <h3>Un prompt, dos resultados</h3>
            <p>
              El mismo texto escrito por un perfil júnior y por uno sénior, en
              directo y lado a lado. Lo que cambia no es la herramienta.
            </p>
          </div>
          <div className="wb-tile">
            <span className="wb-n">02</span>
            <h3>Delega la ejecución, quédate el criterio</h3>
            <p>
              Cómo montar un sistema donde la IA ejecuta y tú decides. Sin
              escribir una línea de código.
            </p>
          </div>
          <div className="wb-tile">
            <span className="wb-n">03</span>
            <h3>La herramienta es lo de menos</h3>
            <p>
              Cada semana sale una nueva. La pregunta útil nunca fue «¿cuál es
              mejor?», sino «¿qué quiero conseguir?».
            </p>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Quién lo da"
        title="Gente que decide, no que explica herramientas"
      >
        <div className="wb-people">
          <span className="fz-chip">
            <b>Pau Garcia-Milà</b>
            <span>Cofounder &amp; Co-CEO — Founderz</span>
          </span>
          <span className="fz-chip">
            <b>Ramón Iborra</b>
            <span>CEO — Artilabs</span>
          </span>
        </div>
        <blockquote className="wb-quote">
          «No buscaba otro tutorial genérico, sino contacto directo con expertos
          y ejemplos aplicables a mi día a día. Fue exactamente eso.»
          <footer>Geraldine Vela · Customer Success Manager</footer>
        </blockquote>
      </Section>

      <Section
        id="form"
        eyebrow="Tu plaza"
        title="El directo es gratis. No volver a mirar un prompt igual, también."
        tone="dark"
      >
        <div className="wb-form-footer">
          <LeadForm
            action={ENDPOINT}
            formId={FORM_ID}
            cta="Reservar mi plaza"
            ctaPosition="footer"
            tone="inverse"
          />
        </div>
      </Section>

      <Section eyebrow="Dudas" title="Lo que suelen preguntar">
        <Accordion
          name="faq"
          items={[
            {
              q: "¿Para quién es exactamente?",
              a: (
                <p>
                  Para profesionales con recorrido que ya usan IA y notan que le
                  sacan menos partido del que deberían. No hace falta perfil
                  técnico ni titulación.
                </p>
              ),
            },
            {
              q: "¿Es gratis de verdad?",
              a: (
                <p>
                  Sí, 0 €. Si te gusta cómo enseñamos, ya conocerás nuestros
                  programas. Y si no, te quedas la guía y la grabación.
                </p>
              ),
            },
            {
              q: `No puedo el ${EVENTO.fecha} a las ${EVENTO.hora}.`,
              a: (
                <p>
                  Regístrate igual. Enviamos la grabación completa al terminar, a
                  todos los inscritos.
                </p>
              ),
            },
            {
              q: "¿Me dais certificado?",
              a: (
                <p>
                  No. Es una sesión en directo, no una formación reglada. Para
                  certificarte están los programas de Founderz.
                </p>
              ),
            },
          ]}
        />
      </Section>

      <StickyCta
        label="Reservar mi plaza gratis"
        href="#form"
        note={`${EVENTO.fecha} · ${EVENTO.hora}`}
      />
    </main>
  );
}
