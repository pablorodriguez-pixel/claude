/**
 * Capa de tracking — spec oficial de Pablo (20/08/2026).
 * Ver memory/01-reglas-obligatorias.md § "Spec de tracking de webinars".
 *
 * Requisito de dominio: para que `user_id` y `hubspot_id` existan, la LP debe
 * servirse desde un subdominio de founderz.com (hereda `hubspotutk` y
 * `founderz_ga4_user_id`). En un *.vercel.app ambos valen "notset".
 */

export const NOTSET = "notset";

type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

export function readCookie(name: string): string {
  if (typeof document === "undefined") return NOTSET;
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`),
  );
  return match?.[1] ? decodeURIComponent(match[1]) : NOTSET;
}

export function push(event: DataLayerEvent): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);
}

/** Se dispara en TODA carga de página. */
export function trackPageLoad(): void {
  push({
    event: "page_load_controlled",
    user_id: readCookie("founderz_ga4_user_id"),
    hubspot_id: readCookie("hubspotutk"),
  });
}

export type LeadEventInput = {
  /** ID del form de HubSpot que ha convertido. */
  formId: string;
  /** Email enviado. Obligatorio: es la clave de deduplicación. */
  email: string;
  /** Sobrescribe solo si la LP vende un programa concreto (ver regla #8). */
  program?: {
    program_id?: string;
    program_name?: string;
    program_edition?: string;
    program_lang?: string;
    price?: string;
    currency?: string;
  };
  ctaPosition?: string;
};

/** Se dispara SOLO en submit con éxito. Nunca en el render del form. */
export function trackGenerateLead({
  formId,
  email,
  program,
  ctaPosition = NOTSET,
}: LeadEventInput): void {
  push({
    event: "generate_lead",
    program_id: program?.program_id ?? NOTSET,
    program_name: program?.program_name ?? NOTSET,
    program_edition: program?.program_edition ?? NOTSET,
    program_lang: program?.program_lang ?? NOTSET,
    price: program?.price ?? NOTSET,
    currency: program?.currency ?? NOTSET,
    lead_source: "form_lead",
    lead_type: "form_lead",
    form_id: formId,
    form_location:
      typeof window === "undefined" ? NOTSET : window.location.pathname,
    form_email: email,
    cta_position: ctaPosition,
  });
}

/** Recoge los utm_* de la URL para adjuntarlos al registro de webinar. */
export function readUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ]) {
    const v = params.get(key);
    if (v) out[key] = v;
  }
  return out;
}
