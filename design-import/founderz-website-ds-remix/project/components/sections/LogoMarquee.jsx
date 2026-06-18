import React from "react";

/**
 * Founderz logo marquee (banner-c): infinite horizontal scroll of partner /
 * company logos. Logos render at ~140×50 max, slightly desaturated, with a
 * lilac (or grey) strip and fades at the edges.
 */
export function LogoMarquee({ logos = [], surface = "lilac", className = "", style = {} }) {
  const bg = surface === "lilac" ? "var(--fz-lilac)" : surface === "grey" ? "var(--fz-grey)" : "transparent";
  const row = [...logos, ...logos];
  return (
    <div
      className={`fz-logomarquee ${className}`}
      style={{
        background: bg,
        borderRadius: "var(--radius-banner)",
        padding: "24px 0",
        overflow: "hidden",
        position: "relative",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        ...style,
      }}
    >
      <div className="fz-marquee__track" style={{ gap: "64px", alignItems: "center" }}>
        {row.map((logo, i) => (
          <div key={i} style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", height: "50px" }}>
            {typeof logo === "string" ? (
              <img src={logo} alt="" style={{ maxHeight: "50px", maxWidth: "140px", objectFit: "contain", filter: "grayscale(0.25)", opacity: 0.85 }} />
            ) : (
              <div style={{ filter: "grayscale(0.25)", opacity: 0.85, display: "flex", alignItems: "center" }}>{logo}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoMarquee;
