import React from "react";
import { Button } from "../forms/Button.jsx";

/**
 * Founderz CTA banner. A full-width purple (or dark) call-to-action block with
 * a heading, optional copy and one or two buttons.
 */
export function BannerCTA({ title, description, primary, secondary, surface = "purple", className = "", style = {} }) {
  const dark = surface === "purple" || surface === "dark";
  return (
    <section
      className={`fz-banner-cta ${className}`}
      style={{
        background: surface === "purple" ? "var(--fz-purple)" : surface === "dark" ? "var(--fz-black)" : "var(--fz-lilac)",
        color: dark ? "var(--fz-white)" : "var(--text-primary)",
        ...style,
      }}
    >
      <div className="fz-container" style={{ paddingBlock: "80px", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", textAlign: "center" }}>
        <h2 className="fz-h2" style={{ color: "inherit", maxWidth: "760px" }}>{title}</h2>
        {description ? (
          <p className="fz-body" style={{ color: dark ? "var(--fz-white-70)" : "var(--text-secondary)", maxWidth: "620px" }}>{description}</p>
        ) : null}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", marginTop: "8px" }}>
          {primary ? <Button variant={dark ? "second" : "primary"}>{primary}</Button> : null}
          {secondary ? <Button variant={dark ? "second-outlined" : "third-outlined"}>{secondary}</Button> : null}
        </div>
      </div>
    </section>
  );
}

export default BannerCTA;
