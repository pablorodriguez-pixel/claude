import React from "react";

/**
 * Founderz inline text link with arrow (link-a). small / bold / purple.
 * Arrow nudges right on hover (handled in interactions.css).
 */
export function LinkArrow({ children, href = "#", color = "var(--fz-purple)", className = "", style = {}, ...rest }) {
  return (
    <a
      href={href}
      className={`fz-link ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "var(--font-display)",
        fontSize: "16px",
        fontWeight: "var(--fw-semibold)",
        lineHeight: 1.3,
        color,
        textDecoration: "none",
        ...style,
      }}
      {...rest}
    >
      <span>{children}</span>
      <svg
        className="fz-link__arrow"
        width="6"
        height="11"
        viewBox="0 0 5.219 9.494"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M 3.856 4.75 L 0.181 1.075 C 0.056 0.95 -0.004 0.802 0 0.631 C 0.004 0.46 0.069 0.313 0.194 0.188 C 0.319 0.063 0.467 0 0.638 0 C 0.809 0 0.956 0.063 1.081 0.188 L 4.919 4.037 C 5.019 4.137 5.094 4.25 5.144 4.375 C 5.194 4.5 5.219 4.625 5.219 4.75 C 5.219 4.875 5.194 5 5.144 5.125 C 5.094 5.25 5.019 5.363 4.919 5.463 L 1.069 9.313 C 0.944 9.438 0.798 9.498 0.631 9.494 C 0.465 9.49 0.319 9.425 0.194 9.3 C 0.069 9.175 0.006 9.027 0.006 8.856 C 0.006 8.685 0.069 8.538 0.194 8.413 L 3.856 4.75 Z"
          fill="currentColor"
          fillRule="nonzero"
        />
      </svg>
    </a>
  );
}

export default LinkArrow;
