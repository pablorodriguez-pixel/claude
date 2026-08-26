"use client";

import { useEffect } from "react";
import { trackPageLoad } from "@/lib/tracking";

const GTM_ID = "GTM-5B9S6LB";
const HUBSPOT_PORTAL = "25912905";

/**
 * Reglas obligatorias #2 y #3: GTM y HubSpot en el layout raíz, diferidos a la
 * primera interacción (wheel/click/touch/key) o a un timeout de 30 s.
 * Diferirlos es lo que mantiene el PSI >= 98.
 *
 * `page_load_controlled` se dispara en cuanto el dataLayer existe, sin esperar a
 * la interacción: el evento debe registrarse en TODA carga.
 */
export default function DeferredScripts() {
  useEffect(() => {
    window.dataLayer = window.dataLayer ?? [];
    trackPageLoad();

    let loaded = false;
    const events = ["wheel", "click", "touchstart", "keydown"] as const;

    const load = () => {
      if (loaded) return;
      loaded = true;
      cleanup();

      const gtm = document.createElement("script");
      gtm.async = true;
      gtm.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(gtm);
      window.dataLayer!.push({
        event: "gtm.js",
        "gtm.start": Date.now(),
      } as never);

      const hs = document.createElement("script");
      hs.async = true;
      hs.defer = true;
      hs.id = "hs-script-loader";
      hs.src = `https://js-eu1.hs-scripts.com/${HUBSPOT_PORTAL}.js`;
      document.head.appendChild(hs);
    };

    const timer = window.setTimeout(load, 30_000);
    const cleanup = () => {
      window.clearTimeout(timer);
      for (const e of events) window.removeEventListener(e, load);
    };
    for (const e of events) {
      window.addEventListener(e, load, { once: true, passive: true });
    }

    return cleanup;
  }, []);

  return null;
}
