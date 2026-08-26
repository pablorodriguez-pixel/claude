"use client";

import { useState } from "react";
import { COUNTRIES, DEFAULT_COUNTRY, prefixFor } from "@/lib/countries";

type Props = {
  /** Nombre del campo de teléfono que llega al backend, ya con prefijo. */
  name?: string;
  countryName?: string;
  required?: boolean;
};

/**
 * Reglas obligatorias #5 y #7: país + prefijo siempre, y `appearance: none` con
 * chevron propio porque iOS Safari pierde la flecha nativa al aplicar CSS custom.
 *
 * `min-w-0` en el grid y en los campos evita el overflow horizontal a 390px que
 * la regla #11 obliga a verificar.
 */
export default function CountryPhoneField({
  name = "phone",
  countryName = "country_lead",
  required = true,
}: Props) {
  const [iso, setIso] = useState(DEFAULT_COUNTRY);

  return (
    <div className="grid min-w-0 grid-cols-[1fr_1.4fr] gap-3">
      <div className="min-w-0">
        <label className="fz-label" htmlFor="fz-country">
          País
        </label>
        <div className="fz-select-wrap">
          <select
            id="fz-country"
            name={countryName}
            className="fz-field fz-select"
            value={iso}
            onChange={(e) => setIso(e.target.value)}
            required={required}
          >
            {COUNTRIES.map((c) => (
              <option key={c.iso} value={c.iso}>
                {c.name}
              </option>
            ))}
          </select>
          <svg className="fz-select-chevron" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M5 8l5 5 5-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="min-w-0">
        <label className="fz-label" htmlFor="fz-phone">
          Teléfono
        </label>
        <div className="fz-phone">
          <span className="fz-phone__prefix" aria-hidden="true">
            {prefixFor(iso)}
          </span>
          <input
            id="fz-phone"
            className="fz-field fz-phone__input"
            type="tel"
            name={name}
            inputMode="tel"
            autoComplete="tel"
            required={required}
            placeholder="600 000 000"
          />
          <input type="hidden" name="phone_prefix" value={prefixFor(iso)} />
        </div>
      </div>
    </div>
  );
}
