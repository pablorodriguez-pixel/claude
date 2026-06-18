import React from "react";

/**
 * Founderz heading block (heading-a): purple UPPERCASE label →
 * h2 (600) → details (muted) → optional action. Center by default.
 */
export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  onDark = false,
  action = null,
  className = "",
  style = {},
}) {
  return (
    <div
      className={`fz-heading ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align,
        maxWidth: align === "center" ? "760px" : "none",
        marginInline: align === "center" ? "auto" : "0",
        marginBottom: "32px",
        ...style,
      }}
    >
      {label ? <p className="fz-section-label">{label}</p> : null}
      <h2
        className="fz-h2"
        style={{ color: onDark ? "var(--fz-white)" : "var(--text-primary)" }}
      >
        {title}
      </h2>
      {description ? (
        <p
          className="fz-body"
          style={{ color: onDark ? "var(--fz-white-70)" : "var(--text-secondary)", maxWidth: "640px" }}
        >
          {description}
        </p>
      ) : null}
      {action ? <div style={{ marginTop: "8px" }}>{action}</div> : null}
    </div>
  );
}

export default SectionHeading;
