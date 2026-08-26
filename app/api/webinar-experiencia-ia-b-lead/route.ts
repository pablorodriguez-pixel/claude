import { NextResponse } from "next/server";

/**
 * Recibe el submit de la LP y lo manda a HubSpot.
 *
 * Va por servidor y no por cliente a propósito: así la cookie hubspotutk se lee
 * de la cabecera en vez de fiarse de JS, y el registro en el evento de
 * marketing se hace sin exponer nada al navegador.
 *
 * El formulario es ES_MAII_WEBINAR (NEW), verificado contra el portal 25912905:
 * exige firstname, lastname, email y phone; country_lead es un select de
 * códigos ISO-2 y admite los seis campos utm_*.
 */

const PORTAL_ID = "25912905";
const FORM_GUID = "508dcd4b-09b8-44bc-88a3-3c9184218c97";
const HS_SUBMIT = `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`;

/** Literal exacto que exige el formulario en HubSpot. No reescribirlo. */
const COMMUNICATION_TYPE_ID = 141476705;
const CONSENT_TEXT =
  'He leído y acepto los <a href="https://founderz.com/es/terminos-y-condiciones/" target="_blank" rel="nofollow noopener noreferrer">Términos y condiciones</a> y la <a href="https://founderz.com/es/privacidad/" target="_blank" rel="nofollow noopener noreferrer">Política de privacidad</a>';

/** Del <main> de la página original en WordPress. */
const EVENTO = {
  id: "WS20260908MAII",
  nombre: "Convierte tu experiencia en ventaja competitiva con IA",
  marketingEventId: "1320681880812",
};

const WP_WEBINAR_HOOK =
  "https://founderz.com/wp-json/fz/v1/hubspot/webinar-registration";

/** Solo estos campos existen en el formulario. Cualquier otro lo rechaza HubSpot. */
const CAMPOS_HUBSPOT = [
  "firstname",
  "lastname",
  "email",
  "phone",
  "country_lead",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "landing",
  "click_id",
  "li_fat_id",
] as const;

function leerCookie(cookieHeader: string | null, nombre: string): string {
  if (!cookieHeader) return "";
  for (const trozo of cookieHeader.split(";")) {
    const [k, ...v] = trozo.trim().split("=");
    if (k === nombre) return decodeURIComponent(v.join("="));
  }
  return "";
}

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo no válido" }, { status: 400 });
  }

  // El país llega como ISO-2 desde CountryPhoneField; HubSpot lo espera así.
  if (body.country && !body.country_lead) body.country_lead = body.country;
  // El teléfono viaja con prefijo para que sea utilizable desde el CRM.
  if (body.phone && body.phone_prefix && !body.phone.startsWith("+")) {
    body.phone = `${body.phone_prefix} ${body.phone}`;
  }
  body.landing = body.landing || "/webinar-experiencia-ia-b";

  for (const obligatorio of ["firstname", "lastname", "email", "phone"]) {
    if (!body[obligatorio]?.trim()) {
      return NextResponse.json(
        { error: `Falta ${obligatorio}` },
        { status: 400 },
      );
    }
  }

  const cookies = req.headers.get("cookie");
  const hutk = leerCookie(cookies, "hubspotutk");

  const fields = CAMPOS_HUBSPOT.filter((n) => body[n]?.trim()).map((name) => ({
    objectTypeId: "0-1",
    name,
    value: body[name].trim(),
  }));

  const payload = {
    fields,
    context: {
      ...(hutk ? { hutk } : {}),
      pageUri: body.pageUri || "https://ia.founderz.com/webinar-experiencia-ia-b",
      pageName: EVENTO.nombre,
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: CONSENT_TEXT,
        communications: [
          {
            value: true,
            subscriptionTypeId: COMMUNICATION_TYPE_ID,
            text: CONSENT_TEXT,
          },
        ],
      },
    },
  };

  const hs = await fetch(HS_SUBMIT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!hs.ok) {
    // El detalle de HubSpot se queda en el log: al visitante no le sirve de nada.
    console.error("HubSpot rechazó el submit", hs.status, await hs.text());
    return NextResponse.json(
      { error: "No hemos podido registrarte" },
      { status: 502 },
    );
  }

  // Registro en el evento de marketing. Es lo que cuenta la asistencia, así que
  // un fallo aquí no debe tumbar el alta: el contacto ya está creado arriba.
  try {
    const minuto = new Date().toISOString().slice(0, 16);
    await fetch(WP_WEBINAR_HOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: body.email.trim(),
        event_id: EVENTO.id,
        event_name: EVENTO.nombre,
        marketing_event_id: EVENTO.marketingEventId,
        hs_page_url: payload.context.pageUri,
        hs_page_title: EVENTO.nombre,
        hs_page_referrer: body.referrer || "",
        utk: hutk,
        idempotency_key: `${body.email.trim()}|${EVENTO.id}|${minuto}`,
        utm_source: body.utm_source || "",
        utm_medium: body.utm_medium || "",
        utm_campaign: body.utm_campaign || "",
        utm_content: body.utm_content || "",
        utm_term: body.utm_term || "",
      }),
    });
  } catch (err) {
    console.error("Falló el registro en el evento de marketing", err);
  }

  return NextResponse.json({ ok: true });
}
