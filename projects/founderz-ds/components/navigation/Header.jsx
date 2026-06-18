import React from "react";
import { Logo } from "../brand/Logo.jsx";
import { Button } from "../forms/Button.jsx";

/**
 * Founderz site header (header-a). White rounded bar, logo centred-left,
 * nav items, and two actions on the right. Can sit fixed/transparent over a
 * dark hero (set transparent).
 */
export function Header({
  items = ["Programas", "Empresas", "Financiación", "Nosotros"],
  primaryLabel = "Inscríbete",
  secondaryLabel = "Hablemos",
  transparent = false,
  className = "",
  style = {},
}) {
  return (
    <header
      className={`fz-header ${className}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px",
        padding: "20px 40px",
        background: transparent ? "transparent" : "var(--fz-white)",
        border: transparent ? "none" : "1px solid var(--fz-border)",
        borderRadius: "var(--radius-card-inner)",
        color: transparent ? "var(--fz-white)" : "var(--text-primary)",
        ...style,
      }}
    >
      <a href="#" aria-label="Founderz" style={{ display: "flex", color: "inherit" }}>
        <Logo height={26} />
      </a>
      <nav style={{ display: "flex", gap: "28px" }}>
        {items.map((it, i) => (
          <a
            key={i}
            href="#"
            style={{ fontSize: "16px", color: "inherit", textDecoration: "none", opacity: 0.9 }}
          >
            {it}
          </a>
        ))}
      </nav>
      <div style={{ display: "flex", gap: "12px" }}>
        <Button variant={transparent ? "second-outlined" : "third-outlined"} size="sm">{secondaryLabel}</Button>
        <Button variant="primary" size="sm">{primaryLabel}</Button>
      </div>
    </header>
  );
}

export default Header;
