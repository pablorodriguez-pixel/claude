import React from "react";

/**
 * Founderz feature card (card-e / card-f).
 *  - icon (32px) + title (body/600) + text (details, muted)
 *  - surface: "white" | "grey" | "lilac"
 *  - bordered: hairline lilac border (card-f)
 *  - image: optional, pinned to the bottom (margin-top:auto)
 */
export function FeatureCard({
  icon,
  title,
  children,
  surface = "white",
  bordered = false,
  image,
  className = "",
  style = {},
}) {
  const surfaces = {
    white: "var(--fz-white)",
    grey: "var(--fz-grey)",
    lilac: "var(--fz-lilac)",
  };
  return (
    <div
      className={`fz-feature ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "32px",
        borderRadius: "var(--radius-feature)",
        background: surfaces[surface],
        border: bordered ? "1px solid var(--fz-lilac)" : "1px solid var(--fz-border)",
        height: "100%",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {icon ? (
        <div aria-hidden="true" style={{ width: 32, height: 32, color: "var(--fz-purple)", display: "flex" }}>
          {icon}
        </div>
      ) : null}
      {title ? (
        <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "var(--fw-semibold)", color: "var(--fz-purple)", lineHeight: 1.3 }}>
          {title}
        </h3>
      ) : null}
      {children ? (
        <p style={{ margin: 0, fontSize: "18px", lineHeight: "var(--lh-body)", color: "var(--text-secondary)" }}>
          {children}
        </p>
      ) : null}
      {image ? <div style={{ marginTop: "auto", paddingTop: "16px" }}>{image}</div> : null}
    </div>
  );
}

export default FeatureCard;
