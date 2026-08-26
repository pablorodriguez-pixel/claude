/**
 * Regla obligatoria #5: selector de país + prefijo telefónico en TODOS los forms.
 * `iso` alimenta la propiedad `country_lead` de HubSpot (ISO-3166 alpha-2).
 * Orden: primero los mercados de Founderz, después el resto alfabético.
 */
export type Country = { iso: string; name: string; prefix: string };

export const PRIORITY_MARKETS: Country[] = [
  { iso: "ES", name: "España", prefix: "+34" },
  { iso: "MX", name: "México", prefix: "+52" },
  { iso: "CO", name: "Colombia", prefix: "+57" },
  { iso: "AR", name: "Argentina", prefix: "+54" },
  { iso: "CL", name: "Chile", prefix: "+56" },
  { iso: "PE", name: "Perú", prefix: "+51" },
];

export const OTHER_COUNTRIES: Country[] = [
  { iso: "BO", name: "Bolivia", prefix: "+591" },
  { iso: "BR", name: "Brasil", prefix: "+55" },
  { iso: "CA", name: "Canadá", prefix: "+1" },
  { iso: "CR", name: "Costa Rica", prefix: "+506" },
  { iso: "CU", name: "Cuba", prefix: "+53" },
  { iso: "DO", name: "República Dominicana", prefix: "+1" },
  { iso: "EC", name: "Ecuador", prefix: "+593" },
  { iso: "SV", name: "El Salvador", prefix: "+503" },
  { iso: "US", name: "Estados Unidos", prefix: "+1" },
  { iso: "FR", name: "Francia", prefix: "+33" },
  { iso: "GT", name: "Guatemala", prefix: "+502" },
  { iso: "GQ", name: "Guinea Ecuatorial", prefix: "+240" },
  { iso: "HN", name: "Honduras", prefix: "+504" },
  { iso: "IT", name: "Italia", prefix: "+39" },
  { iso: "MA", name: "Marruecos", prefix: "+212" },
  { iso: "NI", name: "Nicaragua", prefix: "+505" },
  { iso: "PA", name: "Panamá", prefix: "+507" },
  { iso: "PY", name: "Paraguay", prefix: "+595" },
  { iso: "PT", name: "Portugal", prefix: "+351" },
  { iso: "GB", name: "Reino Unido", prefix: "+44" },
  { iso: "DE", name: "Alemania", prefix: "+49" },
  { iso: "UY", name: "Uruguay", prefix: "+598" },
  { iso: "VE", name: "Venezuela", prefix: "+58" },
];

export const COUNTRIES: Country[] = [...PRIORITY_MARKETS, ...OTHER_COUNTRIES];

export const DEFAULT_COUNTRY = "ES";

export function prefixFor(iso: string): string {
  return COUNTRIES.find((c) => c.iso === iso)?.prefix ?? "+34";
}
