import React from "react";

/**
 * Founderz accordion (card-d). FAQ / syllabus item.
 * White surface → hover #f8f7ff, 10px radius, chevron rotates 180° on open.
 * Smooth open via grid-template-rows 0fr → 1fr (interactions.css).
 * Controlled if `open`/`onToggle` provided, else self-managed.
 */
export function Accordion({ question, children, defaultOpen = false, open, onToggle, className = "", style = {} }) {
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = open !== undefined ? open : internal;
  const toggle = () => (onToggle ? onToggle(!isOpen) : setInternal((v) => !v));

  return (
    <div
      className={`fz-accordion__item ${className}`}
      data-open={isOpen ? "true" : "false"}
      style={{
        background: "var(--fz-white)",
        border: "1px solid var(--fz-border)",
        borderRadius: "var(--radius-faq)",
        overflow: "hidden",
        ...style,
      }}
    >
      <button
        onClick={toggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          padding: "24px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          font: "inherit",
        }}
      >
        <span style={{ fontSize: "18px", fontWeight: "var(--fw-medium)", color: "var(--text-primary)", lineHeight: 1.4 }}>
          {question}
        </span>
        <svg className="fz-accordion__chevron" width="16" height="9" viewBox="0 0 14 8" fill="none" aria-hidden="true" style={{ flexShrink: 0, color: "var(--fz-purple)" }}>
          <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="fz-accordion__panel">
        <div>
          <div style={{ padding: "0 24px 24px", fontSize: "18px", lineHeight: "var(--lh-body)", color: "var(--text-secondary)" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
