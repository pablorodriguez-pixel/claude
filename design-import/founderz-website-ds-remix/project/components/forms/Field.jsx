import React from "react";
import { Input } from "./Input.jsx";

/**
 * Labelled form field (fieldset-a): small/400 label stacked over an input.
 */
export function Field({ label, htmlFor, children, className = "", style = {}, ...inputProps }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`fz-field ${className}`}
      style={{ display: "flex", flexDirection: "column", gap: "8px", ...style }}
    >
      {label ? (
        <span style={{ fontSize: "16px", fontWeight: "var(--fw-regular)", color: "var(--text-primary)" }}>
          {label}
        </span>
      ) : null}
      {children ? children : <Input id={htmlFor} {...inputProps} />}
    </label>
  );
}

export default Field;
