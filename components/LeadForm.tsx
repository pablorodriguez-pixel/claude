"use client";

import { useState } from "react";
import CountryPhoneField from "./CountryPhoneField";
import ConsentCheckbox from "./ConsentCheckbox";
import { trackGenerateLead, readUtmParams } from "@/lib/tracking";

type Props = {
  /** Endpoint propio en app/api/<slug>/route.ts */
  action: string;
  /** ID del form de HubSpot, para el evento generate_lead. */
  formId: string;
  cta?: string;
  ctaPosition?: string;
  /** Regla #8: preguntar SIEMPRE a Pablo antes de rellenar esto. */
  program?: Parameters<typeof trackGenerateLead>[0]["program"];
  /** "inverse" cuando el form va directamente sobre fondo oscuro o Mindscape.
   *  Ojo: si el form está dentro de una card blanca, aunque la sección sea
   *  oscura, sigue siendo "light". */
  tone?: "light" | "inverse";
  /** Campos extra específicos de la LP (empresa, sector, nº empleados…). */
  children?: React.ReactNode;
};

export default function LeadForm({
  action,
  formId,
  cta = "Quiero mi plaza",
  ctaPosition,
  program,
  tone = "light",
  children,
}: Props) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const payload = { ...data, ...readUtmParams() };

    try {
      const res = await fetch(action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // generate_lead SOLO en submit con éxito.
      trackGenerateLead({
        formId,
        email: data.email ?? "",
        program,
        ctaPosition,
      });
      setState("ok");
      form.reset();
    } catch (err) {
      setState("error");
      setError(
        err instanceof Error
          ? "No hemos podido registrarte. Inténtalo de nuevo en un momento."
          : "Error inesperado.",
      );
    }
  }

  if (state === "ok") {
    return (
      <div
        className={`fz-form-ok${tone === "inverse" ? " fz-form--inverse" : ""}`}
        role="status"
      >
        <p className="text-h4 font-semibold">Listo, ya estás dentro.</p>
        <p className="fz-lead mt-2">
          Te hemos enviado un email con todos los detalles. Revisa también la
          carpeta de promociones.
        </p>
      </div>
    );
  }

  return (
    <form
      className={`fz-form${tone === "inverse" ? " fz-form--inverse" : ""}`}
      onSubmit={onSubmit}
    >
      <div className="min-w-0">
        <label className="fz-label" htmlFor="fz-name">
          Nombre
        </label>
        <input
          id="fz-name"
          className="fz-field"
          name="firstname"
          autoComplete="given-name"
          required
          placeholder="Tu nombre"
        />
      </div>

      <div className="min-w-0">
        <label className="fz-label" htmlFor="fz-lastname">
          Apellidos
        </label>
        <input
          id="fz-lastname"
          className="fz-field"
          name="lastname"
          autoComplete="family-name"
          required
          placeholder="Tus apellidos"
        />
      </div>

      <div className="min-w-0">
        <label className="fz-label" htmlFor="fz-email">
          Email
        </label>
        <input
          id="fz-email"
          className="fz-field"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="tu@email.com"
        />
      </div>

      <CountryPhoneField />
      {children}
      <ConsentCheckbox />

      <button
        className="fz-btn fz-btn--primary fz-btn--block"
        type="submit"
        disabled={state === "sending"}
      >
        {state === "sending" ? "Enviando…" : cta}
      </button>

      {error && (
        <p className="fz-form-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
