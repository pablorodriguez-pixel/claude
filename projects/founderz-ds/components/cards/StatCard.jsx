import React from "react";

/**
 * Founderz stat card (card-i): big animated-looking number + supporting copy.
 * Use on stats bars. surface "purple" | "grey" | "lilac" | "white".
 */
export function StatCard({ value, label, surface = "purple", className = "", style = {} }) {
  const surfaces = {
    purple: { background: "var(--fz-purple)", color: "var(--fz-white)", sub: "var(--fz-white-70)" },
    grey: { background: "var(--fz-grey)", color: "var(--fz-black)", sub: "var(--text-secondary)" },
    lilac: { background: "var(--fz-lilac)", color: "var(--fz-black)", sub: "var(--text-secondary)" },
    white: { background: "var(--fz-white)", color: "var(--fz-black)", sub: "var(--text-secondary)" },
  };
  const s = surfaces[surface];
  return (
    <div
      className={`fz-stat ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "32px",
        borderRadius: "var(--radius-card-inner)",
        background: s.background,
        color: s.color,
        border: surface === "white" ? "1px solid var(--fz-border)" : "none",
        height: "100%",
        boxSizing: "border-box",
        ...style,
      }}
    >
      <span style={{ fontSize: "56px", fontWeight: "var(--fw-semibold)", lineHeight: 1, letterSpacing: "-0.01em" }}>
        {value}
      </span>
      <span style={{ fontSize: "18px", lineHeight: "var(--lh-body)", color: s.sub }}>{label}</span>
    </div>
  );
}

export default StatCard;
