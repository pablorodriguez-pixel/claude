import React from "react";

/**
 * Founderz avatar (avatar-a): circular 48px photo + name (small/500/purple)
 * + role (small/400, muted). Used in testimonials and author rows.
 */
export function Avatar({ src, name, role, size = 48, onDark = false, className = "", style = {} }) {
  return (
    <div
      className={`fz-avatar ${className}`}
      style={{ display: "flex", alignItems: "center", gap: "12px", ...style }}
    >
      <img
        src={src}
        alt={name}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
          background: "var(--fz-grey)",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <span style={{ fontSize: "16px", fontWeight: "var(--fw-medium)", color: "var(--fz-purple)", lineHeight: 1.3 }}>
          {name}
        </span>
        {role ? (
          <span style={{ fontSize: "16px", color: onDark ? "var(--fz-white-70)" : "var(--text-secondary)", lineHeight: 1.3 }}>
            {role}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default Avatar;
