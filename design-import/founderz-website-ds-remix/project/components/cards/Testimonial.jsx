import React from "react";
import { Avatar } from "../content/Avatar.jsx";

/**
 * Founderz testimonial (testimonial-a): grey card, 24px radius,
 * quote in details size + avatar row at the bottom.
 */
export function Testimonial({ quote, name, role, avatar, className = "", style = {} }) {
  return (
    <figure
      className={`fz-testimonial ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "32px",
        margin: 0,
        padding: "32px",
        background: "var(--fz-grey)",
        borderRadius: "var(--radius-card)",
        height: "100%",
        boxSizing: "border-box",
        ...style,
      }}
    >
      <blockquote style={{ margin: 0, fontSize: "18px", lineHeight: "var(--lh-body)", color: "var(--text-primary)" }}>
        {quote}
      </blockquote>
      <figcaption>
        <Avatar src={avatar} name={name} role={role} />
      </figcaption>
    </figure>
  );
}

export default Testimonial;
