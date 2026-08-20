"use client";

import { useEffect, useState } from "react";

/**
 * CTA fijo en mobile. Regla del pulgar: 48px de alto real.
 * Se oculta a partir de 580px (breakpoint oficial Founderz).
 *
 * Aparece solo cuando el usuario ha pasado el hero: si estuviera visible desde
 * el principio taparía el form del hero, que es el CTA primario, y competiría
 * con él. Una barra fija de 72px sobre el botón de submit cuesta conversiones.
 */
export default function StickyCta({
  label,
  href,
  note,
  /** Píxeles de scroll a partir de los que aparece. Por defecto, ~un viewport. */
  revealAfter,
}: {
  label: string;
  href: string;
  note?: string;
  revealAfter?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const threshold = revealAfter ?? Math.round(window.innerHeight * 0.9);
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [revealAfter]);

  return (
    <div className="fz-sticky-cta" data-visible={visible ? "true" : "false"}>
      {note && <span className="fz-sticky-cta__note">{note}</span>}
      <a className="fz-btn fz-btn--primary" href={href}>
        {label}
      </a>
    </div>
  );
}
