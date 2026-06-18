import React from "react";

/**
 * Founderz text input. White fill, 8px radius, hairline border.
 * Pair with a small/400 label via <Field>.
 */
export function Input({ as = "input", className = "", style = {}, ...rest }) {
  const Tag = as;
  return (
    <Tag
      className={`fz-input ${className}`}
      style={{
        width: "100%",
        fontFamily: "var(--font-display)",
        fontSize: "16px",
        lineHeight: "var(--lh-body)",
        color: "var(--text-primary)",
        background: "var(--fz-white)",
        border: "1px solid var(--fz-border)",
        borderRadius: "var(--radius-input)",
        padding: as === "textarea" ? "12px 16px" : "12px 16px",
        outline: "none",
        boxSizing: "border-box",
        transition: "border-color var(--dur) var(--ease-out)",
        ...style,
      }}
      {...rest}
    />
  );
}

export default Input;
