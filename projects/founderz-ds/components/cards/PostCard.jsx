import React from "react";
import { LinkArrow } from "../content/LinkArrow.jsx";

/**
 * Founderz post card (card-h): tall image card (~417px) with a floating grey
 * box at the bottom holding the title + a LinkArrow. On hover the box turns
 * purple and its text goes white (interactions.css).
 */
export function PostCard({ image, category, title, href = "#", linkLabel = "Leer más", className = "", style = {} }) {
  return (
    <a
      href={href}
      className={`fz-postcard ${className}`}
      style={{
        position: "relative",
        display: "block",
        height: "417px",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        textDecoration: "none",
        backgroundColor: "var(--fz-grey)",
        backgroundImage: image ? `url(${image})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style,
      }}
    >
      {category ? (
        <span
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            fontSize: "14px",
            fontWeight: "var(--fw-medium)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--fz-white)",
            background: "rgba(26,25,29,0.45)",
            backdropFilter: "blur(4px)",
            padding: "6px 14px",
            borderRadius: "var(--radius-pill)",
          }}
        >
          {category}
        </span>
      ) : null}
      <div
        className="fz-postcard__box"
        style={{
          position: "absolute",
          left: "16px",
          right: "16px",
          bottom: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "24px",
          background: "var(--fz-grey)",
          borderRadius: "var(--radius-card-inner)",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "var(--fw-medium)", lineHeight: 1.3, color: "var(--text-primary)" }}>
          {title}
        </h3>
        <LinkArrow href={href} style={{ color: "inherit" }}>{linkLabel}</LinkArrow>
      </div>
    </a>
  );
}

export default PostCard;
