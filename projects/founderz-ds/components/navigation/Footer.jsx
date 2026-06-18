import React from "react";
import { Logo } from "../brand/Logo.jsx";

/**
 * Founderz footer (footer-a). Purple surface, F mark, link columns, legal row.
 */
export function Footer({ columns, legal, address, phone, className = "", style = {} }) {
  const cols = columns || [
    { title: "Programas", links: ["IA e Innovación 2026", "IA generativa para Creativos", "IA en Finanzas", "IA en la Salud", "Productividad con Copilot"] },
    { title: "Nosotros", links: ["Instagram", "Facebook", "Linkedin", "Tiktok", "Youtube", "Newsletter"] },
    { title: "Empresas", links: ["Formación para equipos", "Casos de éxito", "Fundae"] },
    { title: "Financiación", links: ["Aplazame", "BBVA", "Becas"] },
  ];
  return (
    <footer
      className={`fz-footer ${className}`}
      style={{ background: "var(--fz-purple)", color: "var(--fz-white)", ...style }}
    >
      <div className="fz-container" style={{ paddingBlock: "56px" }}>
        <div style={{ display: "flex", gap: "48px", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between" }}>
          <Logo variant="mark" height={44} />
          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
            {cols.map((c, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "160px" }}>
                <span style={{ fontSize: "16px", fontWeight: "var(--fw-semibold)" }}>{c.title}</span>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  {c.links.map((l, j) => (
                    <li key={j}>
                      <a href="#" style={{ color: "var(--fz-white-70)", textDecoration: "none", fontSize: "18px" }}>{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid var(--fz-white-10)", display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "space-between", color: "var(--fz-white-70)", fontSize: "16px" }}>
          <span>{legal || "Términos y condiciones | Política de Cookies | Política de Privacidad | Promociones vigentes"}</span>
          <span>{address || "Castellana 79, 7, 28046, Madrid"}{phone ? ` · ${phone}` : " · +34 936 297 310"}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
