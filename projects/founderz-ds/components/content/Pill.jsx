import React from "react";

/**
 * Founderz pill / badge (pill-a). Rounded 100px, 16px / 500.
 *  - default → lilac bg, purple text
 *  - second  → outline black (on light)
 *  - third   → outline white (on dark)
 * Use UPPERCASE only for category pills (set uppercase).
 */
export function Pill({
  children,
  variant = "default",
  uppercase = false,
  className = "",
  style = {},
  ...rest
}) {
  const variants = {
    default: { background: "var(--fz-lilac)", color: "var(--fz-purple)", border: "1px solid transparent" },
    second: { background: "transparent", color: "var(--fz-black)", border: "1px solid var(--fz-black)" },
    third: { background: "transparent", color: "var(--fz-white)", border: "1px solid var(--fz-white)" },
  };
  return (
    <span
      className={`fz-pill ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "var(--font-display)",
        fontSize: "16px",
        fontWeight: "var(--fw-medium)",
        lineHeight: 1.2,
        letterSpacing: uppercase ? "0.06em" : "var(--tracking-default)",
        textTransform: uppercase ? "uppercase" : "none",
        borderRadius: "var(--radius-pill)",
        padding: "6px 16px",
        whiteSpace: "nowrap",
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}

export default Pill;
