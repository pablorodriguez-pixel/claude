import React from "react";

/**
 * Founderz partnership banner (banner-b): lilac box, 24px radius. Text left
 * (h2/600 + body), logo/visual right.
 */
export function Banner({ title, description, aside, className = "", style = {} }) {
  return (
    <div
      className={`fz-banner ${className}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "40px",
        flexWrap: "wrap",
        padding: "40px 48px",
        background: "var(--fz-lilac)",
        borderRadius: "var(--radius-card)",
        ...style,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "640px" }}>
        <h2 className="fz-h2" style={{ fontSize: "32px" }}>{title}</h2>
        {description ? <p className="fz-body" style={{ color: "var(--text-secondary)" }}>{description}</p> : null}
      </div>
      {aside ? <div style={{ flexShrink: 0 }}>{aside}</div> : null}
    </div>
  );
}

export default Banner;
