import React from "react";

/**
 * Founderz event card (card-j): horizontal row with a lilac date block
 * (day 56/600 + month), a purple label, title (26px), speaker (muted) and
 * an arrow on the right.
 */
export function EventCard({ day, month, label, title, speaker, href = "#", className = "", style = {} }) {
  return (
    <a
      href={href}
      className={`fz-event ${className}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "24px",
        padding: "20px",
        background: "var(--fz-white)",
        border: "1px solid var(--fz-border)",
        borderRadius: "var(--radius-card-inner)",
        textDecoration: "none",
        color: "var(--text-primary)",
        ...style,
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 88,
          height: 88,
          borderRadius: "var(--radius-input)",
          background: "var(--fz-lilac)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--fz-purple)",
        }}
      >
        <span style={{ fontSize: "40px", fontWeight: "var(--fw-semibold)", lineHeight: 1 }}>{day}</span>
        <span style={{ fontSize: "18px", fontWeight: "var(--fw-medium)" }}>{month}</span>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
        {label ? <span className="fz-section-label">{label}</span> : null}
        <h3 style={{ margin: 0, fontSize: "24px", fontWeight: "var(--fw-medium)", lineHeight: 1.2 }}>{title}</h3>
        {speaker ? <span style={{ fontSize: "16px", color: "var(--text-secondary)" }}>{speaker}</span> : null}
      </div>
      <svg width="11" height="20" viewBox="0 0 5.219 9.494" fill="none" aria-hidden="true" style={{ flexShrink: 0, color: "var(--fz-purple)" }}>
        <path d="M 3.856 4.75 L 0.181 1.075 C 0.056 0.95 -0.004 0.802 0 0.631 C 0.004 0.46 0.069 0.313 0.194 0.188 C 0.319 0.063 0.467 0 0.638 0 C 0.809 0 0.956 0.063 1.081 0.188 L 4.919 4.037 C 5.094 4.212 5.219 4.475 5.219 4.75 C 5.219 5.025 5.094 5.288 4.919 5.463 L 1.069 9.313 C 0.944 9.438 0.798 9.498 0.631 9.494 C 0.319 9.487 0.006 9.169 0.006 8.856 C 0.006 8.685 0.069 8.538 0.194 8.413 L 3.856 4.75 Z" fill="currentColor" />
      </svg>
    </a>
  );
}

export default EventCard;
