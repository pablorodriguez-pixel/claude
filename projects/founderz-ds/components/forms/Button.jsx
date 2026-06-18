import React from "react";

/**
 * Founderz primary action. Always a pill (100px radius), RundDisplay Medium,
 * sentence case (never UPPERCASE). Choose the variant by surface:
 *  - on white            → "primary" (purple)
 *  - on dark / purple    → "second" (white) or "second-outlined"
 *  - secondary action    → "third" (black) or "third-outlined"
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  icon = null,
  iconRight = null,
  as = "button",
  className = "",
  style = {},
  ...rest
}) {
  const Tag = as;

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "var(--font-display)",
    fontWeight: "var(--fw-medium)",
    lineHeight: "var(--lh-body)",
    letterSpacing: "var(--tracking-default)",
    borderRadius: "var(--radius-pill)",
    border: "1px solid transparent",
    cursor: "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "background-color var(--dur) var(--ease-out), color var(--dur) var(--ease-out), border-color var(--dur) var(--ease-out)",
    WebkitTapHighlightColor: "transparent",
  };

  const sizes = {
    sm: { fontSize: "14px", padding: "6px 18px" },
    md: { fontSize: "16px", padding: "10px 24px" },
    lg: { fontSize: "18px", padding: "14px 32px" },
  };

  const variants = {
    primary: {
      background: "var(--fz-purple)",
      color: "var(--fz-white)",
    },
    second: {
      background: "var(--fz-white)",
      color: "var(--fz-black)",
    },
    "second-outlined": {
      background: "transparent",
      color: "var(--fz-white)",
      borderColor: "var(--fz-white)",
    },
    third: {
      background: "var(--fz-black)",
      color: "var(--fz-white)",
    },
    "third-outlined": {
      background: "transparent",
      color: "var(--fz-black)",
      borderColor: "var(--fz-black)",
    },
  };

  return (
    <Tag
      className={`fz-button fz-button--${variant} ${className}`}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      {...rest}
    >
      {icon ? <span aria-hidden="true" style={{ display: "inline-flex" }}>{icon}</span> : null}
      <span>{children}</span>
      {iconRight ? <span aria-hidden="true" style={{ display: "inline-flex" }}>{iconRight}</span> : null}
    </Tag>
  );
}

export default Button;
