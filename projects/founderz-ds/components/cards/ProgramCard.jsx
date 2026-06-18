import React from "react";
import { Pill } from "../content/Pill.jsx";

/**
 * Founderz program card (card-g): 400px tall, full-cover image + dark overlay,
 * white text. Collapsed shows type + duration (top-left) and a 22px title.
 * When `active`, expands to show category pills, an h2, a 3-line description,
 * price (new / struck-through) and a circular arrow button.
 */
export function ProgramCard({
  image,
  type,
  duration,
  title,
  categories = [],
  description,
  price,
  priceOld,
  active = false,
  href = "#",
  className = "",
  style = {},
}) {
  return (
    <a
      href={href}
      className={`fz-program ${className}`}
      style={{
        position: "relative",
        display: "block",
        height: "400px",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        textDecoration: "none",
        color: "var(--fz-white)",
        backgroundColor: "var(--fz-black)",
        backgroundImage: image ? `url(${image})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style,
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "rgba(26,25,29,0.5)" }} />
      {/* top row */}
      <div style={{ position: "absolute", top: "24px", left: "24px", right: "24px", display: "flex", justifyContent: "space-between", gap: "12px" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {type ? <span style={{ fontSize: "14px", fontWeight: "var(--fw-medium)" }}>{type}</span> : null}
          {duration ? <span style={{ fontSize: "14px", color: "var(--fz-white-70)" }}>· {duration}</span> : null}
        </div>
      </div>

      {/* bottom content */}
      <div style={{ position: "absolute", left: "24px", right: "24px", bottom: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {active && categories.length ? (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {categories.map((c, i) => (
              <Pill key={i} variant="third" uppercase>{c}</Pill>
            ))}
          </div>
        ) : null}

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h3 style={{ margin: 0, fontSize: active ? "32px" : "22px", fontWeight: "var(--fw-semibold)", lineHeight: 1.15 }}>
              {title}
            </h3>
            {active && description ? (
              <p style={{ margin: 0, fontSize: "16px", lineHeight: "var(--lh-body)", color: "var(--fz-white-70)",
                display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {description}
              </p>
            ) : null}
            {active && price ? (
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                <span style={{ fontSize: "24px", fontWeight: "var(--fw-semibold)" }}>{price}</span>
                {priceOld ? <span style={{ fontSize: "16px", color: "var(--fz-white-60)", textDecoration: "line-through" }}>{priceOld}</span> : null}
              </div>
            ) : null}
          </div>
          {active ? (
            <span aria-hidden="true" style={{ flexShrink: 0, width: 48, height: 48, borderRadius: "50%", background: "var(--fz-purple)", display: "grid", placeItems: "center" }}>
              <svg width="9" height="16" viewBox="0 0 5.219 9.494" fill="none"><path d="M 3.856 4.75 L 0.181 1.075 C 0.056 0.95 -0.004 0.802 0 0.631 C 0.004 0.46 0.069 0.313 0.194 0.188 C 0.319 0.063 0.467 0 0.638 0 C 0.809 0 0.956 0.063 1.081 0.188 L 4.919 4.037 C 5.094 4.212 5.219 4.475 5.219 4.75 C 5.219 5.025 5.094 5.288 4.919 5.463 L 1.069 9.313 C 0.944 9.438 0.798 9.498 0.631 9.494 C 0.319 9.487 0.006 9.169 0.006 8.856 C 0.006 8.685 0.069 8.538 0.194 8.413 L 3.856 4.75 Z" fill="#fff" /></svg>
            </span>
          ) : null}
        </div>
      </div>
    </a>
  );
}

export default ProgramCard;
