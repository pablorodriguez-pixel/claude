/* @ds-bundle: {"format":3,"namespace":"FounderzDesignSystem_47078d","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Accordion","sourcePath":"components/cards/Accordion.jsx"},{"name":"EventCard","sourcePath":"components/cards/EventCard.jsx"},{"name":"FeatureCard","sourcePath":"components/cards/FeatureCard.jsx"},{"name":"PostCard","sourcePath":"components/cards/PostCard.jsx"},{"name":"ProgramCard","sourcePath":"components/cards/ProgramCard.jsx"},{"name":"StatCard","sourcePath":"components/cards/StatCard.jsx"},{"name":"Testimonial","sourcePath":"components/cards/Testimonial.jsx"},{"name":"Avatar","sourcePath":"components/content/Avatar.jsx"},{"name":"Icon","sourcePath":"components/content/Icon.jsx"},{"name":"LinkArrow","sourcePath":"components/content/LinkArrow.jsx"},{"name":"Pill","sourcePath":"components/content/Pill.jsx"},{"name":"SectionHeading","sourcePath":"components/content/SectionHeading.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"Header","sourcePath":"components/navigation/Header.jsx"},{"name":"Banner","sourcePath":"components/sections/Banner.jsx"},{"name":"BannerCTA","sourcePath":"components/sections/BannerCTA.jsx"},{"name":"LogoMarquee","sourcePath":"components/sections/LogoMarquee.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"8193cf402fb4","components/cards/Accordion.jsx":"e6ea1bc46557","components/cards/EventCard.jsx":"a8b1532cb30f","components/cards/FeatureCard.jsx":"ca0b2ae573e7","components/cards/PostCard.jsx":"37b4c9798670","components/cards/ProgramCard.jsx":"6d680cbf9101","components/cards/StatCard.jsx":"4e2912b8e4e1","components/cards/Testimonial.jsx":"607e5737250f","components/content/Avatar.jsx":"7ad50c1cd69f","components/content/Icon.jsx":"7a3012d942bf","components/content/LinkArrow.jsx":"2480faf046f9","components/content/Pill.jsx":"fdb77e59b89f","components/content/SectionHeading.jsx":"911028a010ea","components/forms/Button.jsx":"1f7a8480f89e","components/forms/Field.jsx":"495ffd578365","components/forms/Input.jsx":"44d9d7308005","components/navigation/Footer.jsx":"0850b7411ca7","components/navigation/Header.jsx":"2e11ff29b2bd","components/sections/Banner.jsx":"0dcfa470e8ed","components/sections/BannerCTA.jsx":"6b1f5f48f668","components/sections/LogoMarquee.jsx":"82e1d7e3b38d","maii-lp/lp.js":"a44729c6f97e","maii-lp/tweaks-app.jsx":"303853ce360f","maii-lp/tweaks-panel.jsx":"6591467622ed","ui_kits/website/BakerClon.jsx":"8583723d599d","ui_kits/website/Empresas.jsx":"c7d77c34013c","ui_kits/website/Home.jsx":"121ffb336716","ui_kits/website/Pricing.jsx":"aecfa05b876e","ui_kits/website/ProgramLP.jsx":"4b51189fb578","ui_kits/website/SiteChrome.jsx":"5ce01557c56b","ui_kits/website/Webinar.jsx":"5dcc6f35c781","ui_kits/website/baker-data.js":"581c417c9e8a","ui_kits/website/data.js":"115f29399847","webinar-ia-lp/lp.js":"a44729c6f97e","webinar-ia-lp/tweaks-app.jsx":"a77d37f5c390","webinar-ia-lp/tweaks-panel.jsx":"6591467622ed","webinar-ia-lp/webinar.js":"bd4eea568b29"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FounderzDesignSystem_47078d = window.FounderzDesignSystem_47078d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/*
 * Founderz logo. Two lockups:
 *  - "wordmark" → the full "Founderz" logotype (default)
 *  - "mark"     → just the geometric F symbol
 * Paints with currentColor, so set color for white-on-dark or purple.
 */
function Logo({
  variant = "wordmark",
  height = 28,
  color = "currentColor",
  className = "",
  style = {},
  title = "Founderz",
  ...rest
}) {
  const common = {
    fill: color,
    role: "img",
    "aria-label": title,
    className: `fz-logo ${className}`,
    style: {
      display: "block",
      height,
      width: "auto",
      ...style
    },
    ...rest
  };
  if (variant === "mark") {
    return /*#__PURE__*/React.createElement("svg", _extends({
      viewBox: "0 0 23.454 35.33"
    }, common), /*#__PURE__*/React.createElement("g", {
      transform: "translate(0,0)"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M 0 3.862 C 0 5.969 1.878 7.775 4.165 7.775 C 6.451 7.775 8.323 5.969 8.323 3.862 C 8.323 1.754 6.446 0 4.165 0 C 1.884 0 0 1.806 0 3.862 Z",
      fillRule: "nonzero"
    })), /*#__PURE__*/React.createElement("g", {
      transform: "translate(10.816,0.193)"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M 12.638 6.328 L 12.638 0 L 0.052 0 L 0 0.103 C 0.714 1.806 0.714 4.471 0 6.174 L 0.052 6.322 L 12.638 6.322 L 12.638 6.328 Z",
      fillRule: "nonzero"
    })), /*#__PURE__*/React.createElement("g", {
      transform: "translate(0.962,10.389)"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M 21.382 3.884 L 6.4 3.884 L 6.4 0.046 L 6.296 0 C 4.574 0.706 1.884 0.706 0.156 0 L 0 0.046 L 0 24.936 L 6.394 24.936 L 6.394 10.207 L 21.376 10.207 L 21.376 3.884 L 21.382 3.884 Z",
      fillRule: "nonzero"
    })));
  }
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 201 37"
  }, common), /*#__PURE__*/React.createElement("g", {
    transform: "translate(0,1.17)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 3.862 C 0 5.969 1.878 7.775 4.165 7.775 C 6.451 7.775 8.323 5.969 8.323 3.862 C 8.323 1.754 6.446 0 4.165 0 C 1.884 0 0 1.806 0 3.862 Z",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("g", {
    transform: "translate(10.816,1.363)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 12.638 6.328 L 12.638 0 L 0.052 0 L 0 0.103 C 0.714 1.806 0.714 4.471 0 6.174 L 0.052 6.322 L 12.638 6.322 L 12.638 6.328 Z",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("g", {
    transform: "translate(0.962,11.559)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 21.382 3.884 L 6.4 3.884 L 6.4 0.046 L 6.296 0 C 4.574 0.706 1.884 0.706 0.156 0 L 0 0.046 L 0 24.936 L 6.394 24.936 L 6.394 10.207 L 21.376 10.207 L 21.376 3.884 L 21.382 3.884 Z",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("g", {
    transform: "translate(25.066,11.331)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 13.197 19.924 C 9.291 19.924 6.4 16.814 6.4 12.947 C 6.4 9.079 9.245 5.969 13.197 5.969 C 17.148 5.969 19.993 9.079 19.993 12.947 C 19.993 16.814 17.05 19.924 13.197 19.924 Z M 13.197 0 C 5.737 0 0 5.719 0 12.947 C 0 20.175 5.737 25.893 13.197 25.893 C 20.656 25.893 26.341 20.175 26.341 12.947 C 26.341 5.719 20.604 0 13.197 0 Z",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("g", {
    transform: "translate(53.43,12.134)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 9.078 24.993 C 12.119 24.993 15.27 23.586 16.843 20.374 L 16.843 24.338 L 23.035 24.338 L 23.035 0 L 16.693 0 L 16.693 13.55 C 16.693 16.911 14.458 19.07 11.417 19.07 C 8.375 19.07 6.394 17.013 6.394 13.698 L 6.394 0 L 0 0 L 0 16.011 C 0 21.28 3.957 24.993 9.084 24.993",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("g", {
    transform: "translate(80.371,11.479)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.011 6.123 L 0.011 24.993 L 6.405 24.993 L 6.405 11.397 C 6.405 8.037 8.738 5.924 11.785 5.924 C 15.034 5.924 16.958 7.98 16.958 11.244 L 16.958 24.993 L 23.352 24.993 L 23.352 8.885 C 23.352 3.714 19.394 0 14.06 0 C 10.915 0 7.822 1.504 6.244 4.42 L 6.244 0.655 L 0 0.655 L 0 6.129 L 0.011 6.123 Z",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("g", {
    transform: "translate(105.746,0.993)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 13.145 30.211 C 9.285 30.211 6.394 27.146 6.394 23.284 C 6.394 19.423 9.187 16.41 13.145 16.41 C 17.102 16.41 19.947 19.474 19.947 23.284 C 19.947 27.095 17.102 30.211 13.145 30.211 Z M 19.792 0 L 19.792 14.655 C 18.07 11.995 14.821 10.594 11.722 10.594 C 4.718 10.594 0 16.216 0 23.29 C 0 30.364 4.718 36.037 11.722 36.037 C 14.867 36.037 18.265 34.579 19.942 31.72 L 19.993 35.485 L 26.186 35.485 L 26.186 0 L 19.792 0 Z",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("g", {
    transform: "translate(134.017,11.382)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6.348 9.985 C 7.159 7.074 9.389 5.263 12.487 5.263 C 15.789 5.263 17.971 7.069 18.732 9.985 L 6.353 9.985 L 6.348 9.985 Z M 12.534 0 C 5.276 0 0 5.77 0 12.895 C 0 20.021 5.328 25.842 12.89 25.842 C 18.017 25.842 22.429 23.632 24.612 18.916 L 24.612 18.768 C 22.937 18.819 20.402 17.611 19.383 16.307 L 19.278 16.307 C 18.467 18.563 16.237 20.425 13.035 20.425 C 9.532 20.425 6.843 18.369 6.134 14.855 L 24.762 14.855 C 25.88 6.624 20.858 0 12.534 0 Z",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("g", {
    transform: "translate(161.163,11.69)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.011 7.319 L 0.011 24.783 L 6.406 24.783 L 6.406 14.342 C 6.406 10.224 7.673 6.516 11.682 6.516 C 12.851 6.516 13.917 6.818 14.469 7.268 L 14.619 7.222 C 14.723 5.462 16.192 2.905 17.615 1.954 L 17.615 1.806 C 16.601 0.649 14.924 0 12.689 0 C 9.545 0 7.362 1.908 6.244 4.568 L 6.244 0.45 L 0 0.45 L 0 7.325 L 0.011 7.319 Z",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("g", {
    transform: "translate(179.85,12.134)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 24.338 L 20.962 24.338 L 20.962 18.665 L 8.83 18.665 L 8.83 18.415 L 20.708 4.921 L 20.708 0 L 0.455 0 L 0.455 5.673 L 11.923 5.673 L 11.923 5.872 L 0 19.371 L 0 24.338 Z",
    fillRule: "nonzero"
  })));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/cards/Accordion.jsx
try { (() => {
/**
 * Founderz accordion (card-d). FAQ / syllabus item.
 * White surface → hover #f8f7ff, 10px radius, chevron rotates 180° on open.
 * Smooth open via grid-template-rows 0fr → 1fr (interactions.css).
 * Controlled if `open`/`onToggle` provided, else self-managed.
 */
function Accordion({
  question,
  children,
  defaultOpen = false,
  open,
  onToggle,
  className = "",
  style = {}
}) {
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = open !== undefined ? open : internal;
  const toggle = () => onToggle ? onToggle(!isOpen) : setInternal(v => !v);
  return /*#__PURE__*/React.createElement("div", {
    className: `fz-accordion__item ${className}`,
    "data-open": isOpen ? "true" : "false",
    style: {
      background: "var(--fz-white)",
      border: "1px solid var(--fz-border)",
      borderRadius: "var(--radius-faq)",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: toggle,
    "aria-expanded": isOpen,
    style: {
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
      font: "inherit"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "18px",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-primary)",
      lineHeight: 1.4
    }
  }, question), /*#__PURE__*/React.createElement("svg", {
    className: "fz-accordion__chevron",
    width: "16",
    height: "9",
    viewBox: "0 0 14 8",
    fill: "none",
    "aria-hidden": "true",
    style: {
      flexShrink: 0,
      color: "var(--fz-purple)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6 6-6",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "fz-accordion__panel"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 24px 24px",
      fontSize: "18px",
      lineHeight: "var(--lh-body)",
      color: "var(--text-secondary)"
    }
  }, children))));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/cards/EventCard.jsx
try { (() => {
/**
 * Founderz event card (card-j): horizontal row with a lilac date block
 * (day 56/600 + month), a purple label, title (26px), speaker (muted) and
 * an arrow on the right.
 */
function EventCard({
  day,
  month,
  label,
  title,
  speaker,
  href = "#",
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    className: `fz-event ${className}`,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "24px",
      padding: "20px",
      background: "var(--fz-white)",
      border: "1px solid var(--fz-border)",
      borderRadius: "var(--radius-card-inner)",
      textDecoration: "none",
      color: "var(--text-primary)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      width: 88,
      height: 88,
      borderRadius: "var(--radius-input)",
      background: "var(--fz-lilac)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--fz-purple)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "40px",
      fontWeight: "var(--fw-semibold)",
      lineHeight: 1
    }
  }, day), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "18px",
      fontWeight: "var(--fw-medium)"
    }
  }, month)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "6px"
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    className: "fz-section-label"
  }, label) : null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: "24px",
      fontWeight: "var(--fw-medium)",
      lineHeight: 1.2
    }
  }, title), speaker ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "16px",
      color: "var(--text-secondary)"
    }
  }, speaker) : null), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "20",
    viewBox: "0 0 5.219 9.494",
    fill: "none",
    "aria-hidden": "true",
    style: {
      flexShrink: 0,
      color: "var(--fz-purple)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.856 4.75 L 0.181 1.075 C 0.056 0.95 -0.004 0.802 0 0.631 C 0.004 0.46 0.069 0.313 0.194 0.188 C 0.319 0.063 0.467 0 0.638 0 C 0.809 0 0.956 0.063 1.081 0.188 L 4.919 4.037 C 5.094 4.212 5.219 4.475 5.219 4.75 C 5.219 5.025 5.094 5.288 4.919 5.463 L 1.069 9.313 C 0.944 9.438 0.798 9.498 0.631 9.494 C 0.319 9.487 0.006 9.169 0.006 8.856 C 0.006 8.685 0.069 8.538 0.194 8.413 L 3.856 4.75 Z",
    fill: "currentColor"
  })));
}
Object.assign(__ds_scope, { EventCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/EventCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/FeatureCard.jsx
try { (() => {
/**
 * Founderz feature card (card-e / card-f).
 *  - icon (32px) + title (body/600) + text (details, muted)
 *  - surface: "white" | "grey" | "lilac"
 *  - bordered: hairline lilac border (card-f)
 *  - image: optional, pinned to the bottom (margin-top:auto)
 */
function FeatureCard({
  icon,
  title,
  children,
  surface = "white",
  bordered = false,
  image,
  className = "",
  style = {}
}) {
  const surfaces = {
    white: "var(--fz-white)",
    grey: "var(--fz-grey)",
    lilac: "var(--fz-lilac)"
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `fz-feature ${className}`,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      padding: "32px",
      borderRadius: "var(--radius-feature)",
      background: surfaces[surface],
      border: bordered ? "1px solid var(--fz-lilac)" : "1px solid var(--fz-border)",
      height: "100%",
      boxSizing: "border-box",
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      width: 32,
      height: 32,
      color: "var(--fz-purple)",
      display: "flex"
    }
  }, icon) : null, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: "20px",
      fontWeight: "var(--fw-semibold)",
      color: "var(--fz-purple)",
      lineHeight: 1.3
    }
  }, title) : null, children ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "18px",
      lineHeight: "var(--lh-body)",
      color: "var(--text-secondary)"
    }
  }, children) : null, image ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: "16px"
    }
  }, image) : null);
}
Object.assign(__ds_scope, { FeatureCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/FeatureCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/StatCard.jsx
try { (() => {
/**
 * Founderz stat card (card-i): big animated-looking number + supporting copy.
 * Use on stats bars. surface "purple" | "grey" | "lilac" | "white".
 */
function StatCard({
  value,
  label,
  surface = "purple",
  className = "",
  style = {}
}) {
  const surfaces = {
    purple: {
      background: "var(--fz-purple)",
      color: "var(--fz-white)",
      sub: "var(--fz-white-70)"
    },
    grey: {
      background: "var(--fz-grey)",
      color: "var(--fz-black)",
      sub: "var(--text-secondary)"
    },
    lilac: {
      background: "var(--fz-lilac)",
      color: "var(--fz-black)",
      sub: "var(--text-secondary)"
    },
    white: {
      background: "var(--fz-white)",
      color: "var(--fz-black)",
      sub: "var(--text-secondary)"
    }
  };
  const s = surfaces[surface];
  return /*#__PURE__*/React.createElement("div", {
    className: `fz-stat ${className}`,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      padding: "32px",
      borderRadius: "var(--radius-card-inner)",
      background: s.background,
      color: s.color,
      border: surface === "white" ? "1px solid var(--fz-border)" : "none",
      height: "100%",
      boxSizing: "border-box",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "56px",
      fontWeight: "var(--fw-semibold)",
      lineHeight: 1,
      letterSpacing: "-0.01em"
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "18px",
      lineHeight: "var(--lh-body)",
      color: s.sub
    }
  }, label));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/content/Avatar.jsx
try { (() => {
/**
 * Founderz avatar (avatar-a): circular 48px photo + name (small/500/purple)
 * + role (small/400, muted). Used in testimonials and author rows.
 */
function Avatar({
  src,
  name,
  role,
  size = 48,
  onDark = false,
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `fz-avatar ${className}`,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      objectFit: "cover",
      flexShrink: 0,
      background: "var(--fz-grey)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "2px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "16px",
      fontWeight: "var(--fw-medium)",
      color: "var(--fz-purple)",
      lineHeight: 1.3
    }
  }, name), role ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "16px",
      color: onDark ? "var(--fz-white-70)" : "var(--text-secondary)",
      lineHeight: 1.3
    }
  }, role) : null));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/cards/Testimonial.jsx
try { (() => {
/**
 * Founderz testimonial (testimonial-a): grey card, 24px radius,
 * quote in details size + avatar row at the bottom.
 */
function Testimonial({
  quote,
  name,
  role,
  avatar,
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("figure", {
    className: `fz-testimonial ${className}`,
    style: {
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
      ...style
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontSize: "18px",
      lineHeight: "var(--lh-body)",
      color: "var(--text-primary)"
    }
  }, quote), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    src: avatar,
    name: name,
    role: role
  })));
}
Object.assign(__ds_scope, { Testimonial });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Testimonial.jsx", error: String((e && e.message) || e) }); }

// components/content/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/*
 * Founderz icon set — clean 24px outline icons, 1.8 stroke, rounded joins,
 * matching the brand's geometric line style. Paints with currentColor.
 * (Lucide-style outlines; see ICONOGRAPHY in the README.)
 */
const PATHS = {
  check: /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }),
  "arrow-right": /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "12",
    x2: "20",
    y2: "12"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "14 6 20 12 14 18"
  })),
  "arrow-up-right": /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "7",
    y1: "17",
    x2: "17",
    y2: "7"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "8 7 17 7 17 16"
  })),
  "chevron-down": /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  }),
  "chevron-right": /*#__PURE__*/React.createElement("polyline", {
    points: "9 6 15 12 9 18"
  }),
  sparkles: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"
  })),
  wand: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M15 4V2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 10V8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12.5 6.5h-2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.5 6.5h-2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 9l-1.5-1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 4l-1.5 1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 21l9-9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12.5 7.5l4 4"
  })),
  play: /*#__PURE__*/React.createElement("polygon", {
    points: "6 4 20 12 6 20 6 4"
  }),
  calendar: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "9",
    x2: "21",
    y2: "9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "2",
    x2: "8",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "2",
    x2: "16",
    y2: "6"
  })),
  chart: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "20",
    x2: "20",
    y2: "20"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "11",
    width: "3",
    height: "6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "7",
    width: "3",
    height: "10"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "16",
    y: "13",
    width: "3",
    height: "4"
  })),
  users: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 19v-1a4 4 0 0 0-3-3.85"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 4.13A3 3 0 0 1 16 10"
  })),
  school: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 9l9-5 9 5-9 5-9-5z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 11v5c0 1 2 2.5 5 2.5S17 17 17 16v-5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "9",
    x2: "21",
    y2: "14"
  })),
  briefcase: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "7",
    width: "18",
    height: "13",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "21",
    y2: "12"
  })),
  cpu: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "5",
    y: "5",
    width: "14",
    height: "14",
    rx: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "9",
    width: "6",
    height: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "9",
    y1: "2",
    x2: "9",
    y2: "5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "2",
    x2: "15",
    y2: "5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "9",
    y1: "19",
    x2: "9",
    y2: "22"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "19",
    x2: "15",
    y2: "22"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "2",
    y1: "9",
    x2: "5",
    y2: "9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "2",
    y1: "15",
    x2: "5",
    y2: "15"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "19",
    y1: "9",
    x2: "22",
    y2: "9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "19",
    y1: "15",
    x2: "22",
    y2: "15"
  })),
  clock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 7 12 12 15 14"
  })),
  star: /*#__PURE__*/React.createElement("polygon", {
    points: "12 2 15 9 22 9.5 17 14.5 18.5 21.5 12 17.5 5.5 21.5 7 14.5 2 9.5 9 9"
  }),
  globe: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"
  })),
  award: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "9",
    r: "6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 14l-1.5 7L12 18l4.5 3L15 14"
  })),
  rocket: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M5 16c-1.5 1.5-2 5-2 5s3.5-.5 5-2c.8-.8.8-2 0-2.8s-2-.8-3 .8z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 15l-3-3c1-4 4-9 11-9 0 7-5 10-9 11z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "14",
    cy: "10",
    r: "1.5"
  })),
  plus: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  })),
  x: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  })),
  menu: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "6",
    x2: "21",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "18",
    x2: "21",
    y2: "18"
  }))
};
function Icon({
  name,
  size = 24,
  strokeWidth = 1.8,
  className = "",
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    className: `fz-icon ${className}`,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: style
  }, rest), PATHS[name] || null);
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Icon.jsx", error: String((e && e.message) || e) }); }

// components/content/LinkArrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Founderz inline text link with arrow (link-a). small / bold / purple.
 * Arrow nudges right on hover (handled in interactions.css).
 */
function LinkArrow({
  children,
  href = "#",
  color = "var(--fz-purple)",
  className = "",
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    className: `fz-link ${className}`,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      fontFamily: "var(--font-display)",
      fontSize: "16px",
      fontWeight: "var(--fw-semibold)",
      lineHeight: 1.3,
      color,
      textDecoration: "none",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", null, children), /*#__PURE__*/React.createElement("svg", {
    className: "fz-link__arrow",
    width: "6",
    height: "11",
    viewBox: "0 0 5.219 9.494",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.856 4.75 L 0.181 1.075 C 0.056 0.95 -0.004 0.802 0 0.631 C 0.004 0.46 0.069 0.313 0.194 0.188 C 0.319 0.063 0.467 0 0.638 0 C 0.809 0 0.956 0.063 1.081 0.188 L 4.919 4.037 C 5.019 4.137 5.094 4.25 5.144 4.375 C 5.194 4.5 5.219 4.625 5.219 4.75 C 5.219 4.875 5.194 5 5.144 5.125 C 5.094 5.25 5.019 5.363 4.919 5.463 L 1.069 9.313 C 0.944 9.438 0.798 9.498 0.631 9.494 C 0.465 9.49 0.319 9.425 0.194 9.3 C 0.069 9.175 0.006 9.027 0.006 8.856 C 0.006 8.685 0.069 8.538 0.194 8.413 L 3.856 4.75 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
}
Object.assign(__ds_scope, { LinkArrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/LinkArrow.jsx", error: String((e && e.message) || e) }); }

// components/cards/PostCard.jsx
try { (() => {
/**
 * Founderz post card (card-h): tall image card (~417px) with a floating grey
 * box at the bottom holding the title + a LinkArrow. On hover the box turns
 * purple and its text goes white (interactions.css).
 */
function PostCard({
  image,
  category,
  title,
  href = "#",
  linkLabel = "Leer más",
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    className: `fz-postcard ${className}`,
    style: {
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
      ...style
    }
  }, category ? /*#__PURE__*/React.createElement("span", {
    style: {
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
      borderRadius: "var(--radius-pill)"
    }
  }, category) : null, /*#__PURE__*/React.createElement("div", {
    className: "fz-postcard__box",
    style: {
      position: "absolute",
      left: "16px",
      right: "16px",
      bottom: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      padding: "24px",
      background: "var(--fz-grey)",
      borderRadius: "var(--radius-card-inner)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: "20px",
      fontWeight: "var(--fw-medium)",
      lineHeight: 1.3,
      color: "var(--text-primary)"
    }
  }, title), /*#__PURE__*/React.createElement(__ds_scope.LinkArrow, {
    href: href,
    style: {
      color: "inherit"
    }
  }, linkLabel)));
}
Object.assign(__ds_scope, { PostCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/PostCard.jsx", error: String((e && e.message) || e) }); }

// components/content/Pill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Founderz pill / badge (pill-a). Rounded 100px, 16px / 500.
 *  - default → lilac bg, purple text
 *  - second  → outline black (on light)
 *  - third   → outline white (on dark)
 * Use UPPERCASE only for category pills (set uppercase).
 */
function Pill({
  children,
  variant = "default",
  uppercase = false,
  className = "",
  style = {},
  ...rest
}) {
  const variants = {
    default: {
      background: "var(--fz-lilac)",
      color: "var(--fz-purple)",
      border: "1px solid transparent"
    },
    second: {
      background: "transparent",
      color: "var(--fz-black)",
      border: "1px solid var(--fz-black)"
    },
    third: {
      background: "transparent",
      color: "var(--fz-white)",
      border: "1px solid var(--fz-white)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `fz-pill ${className}`,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      fontFamily: "var(--font-display)",
      fontSize: "16px",
      fontWeight: "var(--fw-medium)",
      lineHeight: 1.2,
      letterSpacing: uppercase ? "0.06em" : "var(--tracking-default)",
      textTransform: uppercase ? "uppercase" : "none",
      borderRadius: "var(--radius-pill)",
      padding: "6px 16px",
      whiteSpace: "nowrap",
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Pill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Pill.jsx", error: String((e && e.message) || e) }); }

// components/cards/ProgramCard.jsx
try { (() => {
/**
 * Founderz program card (card-g): 400px tall, full-cover image + dark overlay,
 * white text. Collapsed shows type + duration (top-left) and a 22px title.
 * When `active`, expands to show category pills, an h2, a 3-line description,
 * price (new / struck-through) and a circular arrow button.
 */
function ProgramCard({
  image,
  type,
  duration,
  title,
  categories = [],
  description,
  price,
  priceOld,
  active = false,
  href = "#",
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    className: `fz-program ${className}`,
    style: {
      position: "relative",
      display: "block",
      height: "400px",
      borderRadius: "var(--radius-card)",
      overflow: "hidden",
      textDecoration: "none",
      color: "var(--fz-white)",
      backgroundColor: "var(--fz-black)",
      backgroundImage: image ? `url(${image})` : "none",
      backgroundSize: "cover",
      backgroundPosition: "center",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(26,25,29,0.5)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "24px",
      left: "24px",
      right: "24px",
      display: "flex",
      justifyContent: "space-between",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap"
    }
  }, type ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "14px",
      fontWeight: "var(--fw-medium)"
    }
  }, type) : null, duration ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "14px",
      color: "var(--fz-white-70)"
    }
  }, "\xB7 ", duration) : null)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "24px",
      right: "24px",
      bottom: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "16px"
    }
  }, active && categories.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap"
    }
  }, categories.map((c, i) => /*#__PURE__*/React.createElement(__ds_scope.Pill, {
    key: i,
    variant: "third",
    uppercase: true
  }, c))) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: active ? "32px" : "22px",
      fontWeight: "var(--fw-semibold)",
      lineHeight: 1.15
    }
  }, title), active && description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "16px",
      lineHeight: "var(--lh-body)",
      color: "var(--fz-white-70)",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden"
    }
  }, description) : null, active && price ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "10px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "24px",
      fontWeight: "var(--fw-semibold)"
    }
  }, price), priceOld ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "16px",
      color: "var(--fz-white-60)",
      textDecoration: "line-through"
    }
  }, priceOld) : null) : null), active ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      flexShrink: 0,
      width: 48,
      height: 48,
      borderRadius: "50%",
      background: "var(--fz-purple)",
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "16",
    viewBox: "0 0 5.219 9.494",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 3.856 4.75 L 0.181 1.075 C 0.056 0.95 -0.004 0.802 0 0.631 C 0.004 0.46 0.069 0.313 0.194 0.188 C 0.319 0.063 0.467 0 0.638 0 C 0.809 0 0.956 0.063 1.081 0.188 L 4.919 4.037 C 5.094 4.212 5.219 4.475 5.219 4.75 C 5.219 5.025 5.094 5.288 4.919 5.463 L 1.069 9.313 C 0.944 9.438 0.798 9.498 0.631 9.494 C 0.319 9.487 0.006 9.169 0.006 8.856 C 0.006 8.685 0.069 8.538 0.194 8.413 L 3.856 4.75 Z",
    fill: "#fff"
  }))) : null)));
}
Object.assign(__ds_scope, { ProgramCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ProgramCard.jsx", error: String((e && e.message) || e) }); }

// components/content/SectionHeading.jsx
try { (() => {
/**
 * Founderz heading block (heading-a): purple UPPERCASE label →
 * h2 (600) → details (muted) → optional action. Center by default.
 */
function SectionHeading({
  label,
  title,
  description,
  align = "center",
  onDark = false,
  action = null,
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `fz-heading ${className}`,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      alignItems: align === "center" ? "center" : "flex-start",
      textAlign: align,
      maxWidth: align === "center" ? "760px" : "none",
      marginInline: align === "center" ? "auto" : "0",
      marginBottom: "32px",
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("p", {
    className: "fz-section-label"
  }, label) : null, /*#__PURE__*/React.createElement("h2", {
    className: "fz-h2",
    style: {
      color: onDark ? "var(--fz-white)" : "var(--text-primary)"
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    className: "fz-body",
    style: {
      color: onDark ? "var(--fz-white-70)" : "var(--text-secondary)",
      maxWidth: "640px"
    }
  }, description) : null, action ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "8px"
    }
  }, action) : null);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Founderz primary action. Always a pill (100px radius), RundDisplay Medium,
 * sentence case (never UPPERCASE). Choose the variant by surface:
 *  - on white            → "primary" (purple)
 *  - on dark / purple    → "second" (white) or "second-outlined"
 *  - secondary action    → "third" (black) or "third-outlined"
 */
function Button({
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
    WebkitTapHighlightColor: "transparent"
  };
  const sizes = {
    sm: {
      fontSize: "14px",
      padding: "6px 18px"
    },
    md: {
      fontSize: "16px",
      padding: "10px 24px"
    },
    lg: {
      fontSize: "18px",
      padding: "14px 32px"
    }
  };
  const variants = {
    primary: {
      background: "var(--fz-purple)",
      color: "var(--fz-white)"
    },
    second: {
      background: "var(--fz-white)",
      color: "var(--fz-black)"
    },
    "second-outlined": {
      background: "transparent",
      color: "var(--fz-white)",
      borderColor: "var(--fz-white)"
    },
    third: {
      background: "var(--fz-black)",
      color: "var(--fz-white)"
    },
    "third-outlined": {
      background: "transparent",
      color: "var(--fz-black)",
      borderColor: "var(--fz-black)"
    }
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: `fz-button fz-button--${variant} ${className}`,
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "inline-flex"
    }
  }, icon) : null, /*#__PURE__*/React.createElement("span", null, children), iconRight ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "inline-flex"
    }
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Founderz text input. White fill, 8px radius, hairline border.
 * Pair with a small/400 label via <Field>.
 */
function Input({
  as = "input",
  className = "",
  style = {},
  ...rest
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: `fz-input ${className}`,
    style: {
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
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Labelled form field (fieldset-a): small/400 label stacked over an input.
 */
function Field({
  label,
  htmlFor,
  children,
  className = "",
  style = {},
  ...inputProps
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    className: `fz-field ${className}`,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "16px",
      fontWeight: "var(--fw-regular)",
      color: "var(--text-primary)"
    }
  }, label) : null, children ? children : /*#__PURE__*/React.createElement(__ds_scope.Input, _extends({
    id: htmlFor
  }, inputProps)));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
/**
 * Founderz footer (footer-a). Purple surface, F mark, link columns, legal row.
 */
function Footer({
  columns,
  legal,
  address,
  phone,
  className = "",
  style = {}
}) {
  const cols = columns || [{
    title: "Programas",
    links: ["IA e Innovación 2026", "IA generativa para Creativos", "IA en Finanzas", "IA en la Salud", "Productividad con Copilot"]
  }, {
    title: "Nosotros",
    links: ["Instagram", "Facebook", "Linkedin", "Tiktok", "Youtube", "Newsletter"]
  }, {
    title: "Empresas",
    links: ["Formación para equipos", "Casos de éxito", "Fundae"]
  }, {
    title: "Financiación",
    links: ["Aplazame", "BBVA", "Becas"]
  }];
  return /*#__PURE__*/React.createElement("footer", {
    className: `fz-footer ${className}`,
    style: {
      background: "var(--fz-purple)",
      color: "var(--fz-white)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fz-container",
    style: {
      paddingBlock: "56px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "48px",
      flexWrap: "wrap",
      alignItems: "flex-start",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    variant: "mark",
    height: 44
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "48px",
      flexWrap: "wrap"
    }
  }, cols.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      minWidth: "160px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "16px",
      fontWeight: "var(--fw-semibold)"
    }
  }, c.title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, c.links.map((l, j) => /*#__PURE__*/React.createElement("li", {
    key: j
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "var(--fz-white-70)",
      textDecoration: "none",
      fontSize: "18px"
    }
  }, l)))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "48px",
      paddingTop: "24px",
      borderTop: "1px solid var(--fz-white-10)",
      display: "flex",
      gap: "24px",
      flexWrap: "wrap",
      justifyContent: "space-between",
      color: "var(--fz-white-70)",
      fontSize: "16px"
    }
  }, /*#__PURE__*/React.createElement("span", null, legal || "Términos y condiciones | Política de Cookies | Política de Privacidad | Promociones vigentes"), /*#__PURE__*/React.createElement("span", null, address || "Castellana 79, 7, 28046, Madrid", phone ? ` · ${phone}` : " · +34 936 297 310"))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Header.jsx
try { (() => {
/**
 * Founderz site header (header-a). White rounded bar, logo centred-left,
 * nav items, and two actions on the right. Can sit fixed/transparent over a
 * dark hero (set transparent).
 */
function Header({
  items = ["Programas", "Empresas", "Financiación", "Nosotros"],
  primaryLabel = "Inscríbete",
  secondaryLabel = "Hablemos",
  transparent = false,
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: `fz-header ${className}`,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "24px",
      padding: "20px 40px",
      background: transparent ? "transparent" : "var(--fz-white)",
      border: transparent ? "none" : "1px solid var(--fz-border)",
      borderRadius: "var(--radius-card-inner)",
      color: transparent ? "var(--fz-white)" : "var(--text-primary)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    "aria-label": "Founderz",
    style: {
      display: "flex",
      color: "inherit"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    height: 26
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "28px"
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    style: {
      fontSize: "16px",
      color: "inherit",
      textDecoration: "none",
      opacity: 0.9
    }
  }, it))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: transparent ? "second-outlined" : "third-outlined",
    size: "sm"
  }, secondaryLabel), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "sm"
  }, primaryLabel)));
}
Object.assign(__ds_scope, { Header });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Header.jsx", error: String((e && e.message) || e) }); }

// components/sections/Banner.jsx
try { (() => {
/**
 * Founderz partnership banner (banner-b): lilac box, 24px radius. Text left
 * (h2/600 + body), logo/visual right.
 */
function Banner({
  title,
  description,
  aside,
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `fz-banner ${className}`,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "40px",
      flexWrap: "wrap",
      padding: "40px 48px",
      background: "var(--fz-lilac)",
      borderRadius: "var(--radius-card)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      maxWidth: "640px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "fz-h2",
    style: {
      fontSize: "32px"
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    className: "fz-body",
    style: {
      color: "var(--text-secondary)"
    }
  }, description) : null), aside ? /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0
    }
  }, aside) : null);
}
Object.assign(__ds_scope, { Banner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/Banner.jsx", error: String((e && e.message) || e) }); }

// components/sections/BannerCTA.jsx
try { (() => {
/**
 * Founderz CTA banner. A full-width purple (or dark) call-to-action block with
 * a heading, optional copy and one or two buttons.
 */
function BannerCTA({
  title,
  description,
  primary,
  secondary,
  surface = "purple",
  className = "",
  style = {}
}) {
  const dark = surface === "purple" || surface === "dark";
  return /*#__PURE__*/React.createElement("section", {
    className: `fz-banner-cta ${className}`,
    style: {
      background: surface === "purple" ? "var(--fz-purple)" : surface === "dark" ? "var(--fz-black)" : "var(--fz-lilac)",
      color: dark ? "var(--fz-white)" : "var(--text-primary)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fz-container",
    style: {
      paddingBlock: "80px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "24px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "fz-h2",
    style: {
      color: "inherit",
      maxWidth: "760px"
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    className: "fz-body",
    style: {
      color: dark ? "var(--fz-white-70)" : "var(--text-secondary)",
      maxWidth: "620px"
    }
  }, description) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: "8px"
    }
  }, primary ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: dark ? "second" : "primary"
  }, primary) : null, secondary ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: dark ? "second-outlined" : "third-outlined"
  }, secondary) : null)));
}
Object.assign(__ds_scope, { BannerCTA });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/BannerCTA.jsx", error: String((e && e.message) || e) }); }

// components/sections/LogoMarquee.jsx
try { (() => {
/**
 * Founderz logo marquee (banner-c): infinite horizontal scroll of partner /
 * company logos. Logos render at ~140×50 max, slightly desaturated, with a
 * lilac (or grey) strip and fades at the edges.
 */
function LogoMarquee({
  logos = [],
  surface = "lilac",
  className = "",
  style = {}
}) {
  const bg = surface === "lilac" ? "var(--fz-lilac)" : surface === "grey" ? "var(--fz-grey)" : "transparent";
  const row = [...logos, ...logos];
  return /*#__PURE__*/React.createElement("div", {
    className: `fz-logomarquee ${className}`,
    style: {
      background: bg,
      borderRadius: "var(--radius-banner)",
      padding: "24px 0",
      overflow: "hidden",
      position: "relative",
      WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fz-marquee__track",
    style: {
      gap: "64px",
      alignItems: "center"
    }
  }, row.map((logo, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "50px"
    }
  }, typeof logo === "string" ? /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "",
    style: {
      maxHeight: "50px",
      maxWidth: "140px",
      objectFit: "contain",
      filter: "grayscale(0.25)",
      opacity: 0.85
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      filter: "grayscale(0.25)",
      opacity: 0.85,
      display: "flex",
      alignItems: "center"
    }
  }, logo)))));
}
Object.assign(__ds_scope, { LogoMarquee });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/LogoMarquee.jsx", error: String((e && e.message) || e) }); }

// maii-lp/lp.js
try { (() => {
/* ============================================================
   MAII LP — comportamiento (vanilla)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Countdown ---------- */
  // Objetivo: fin de la cohorte. Si ya pasó, reinicia a +7 días para que
  // el contador siempre muestre urgencia activa en la demo.
  function getTarget() {
    var stored = window.__MAII_DEADLINE;
    var t = stored ? new Date(stored).getTime() : new Date("2026-06-30T23:59:59").getTime();
    var now = Date.now();
    if (t <= now) t = now + 6 * 864e5 + 8 * 36e5 + 28 * 6e4; // ~6d 8h 28m
    return t;
  }
  var TARGET = getTarget();
  function pad(n) {
    return String(n).padStart(2, "0");
  }
  function tick() {
    var diff = Math.max(0, TARGET - Date.now());
    var s = Math.floor(diff / 1000);
    var d = Math.floor(s / 86400);
    s -= d * 86400;
    var h = Math.floor(s / 3600);
    s -= h * 3600;
    var m = Math.floor(s / 60);
    s -= m * 60;
    var parts = {
      d: d,
      h: h,
      m: m,
      s: s
    };

    // Cajas de dígitos
    document.querySelectorAll("[data-cd]").forEach(function (el) {
      var k = el.getAttribute("data-cd");
      if (parts[k] != null) el.textContent = pad(parts[k]);
    });
    // Texto compacto dd:hh:mm:ss
    document.querySelectorAll("[data-cd-compact]").forEach(function (el) {
      el.textContent = pad(d) + ":" + pad(h) + ":" + pad(m) + ":" + pad(s);
    });
  }
  tick();
  setInterval(tick, 1000);
  window.__maiiRetarget = function (iso) {
    window.__MAII_DEADLINE = iso;
    TARGET = getTarget();
    tick();
  };

  /* ---------- Acordeones (FAQ + temario) ---------- */
  document.addEventListener("click", function (e) {
    var q = e.target.closest(".acc__q");
    if (!q) return;
    var item = q.closest(".acc__item");
    var group = item.closest(".acc");
    var isOpen = item.getAttribute("data-open") === "true";
    if (group && group.hasAttribute("data-single")) {
      group.querySelectorAll(".acc__item").forEach(function (it) {
        it.setAttribute("data-open", "false");
      });
    }
    item.setAttribute("data-open", isOpen ? "false" : "true");
  });

  /* ---------- Carrusel faculty ---------- */
  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    var track = root.querySelector(".carousel__track");
    var step = 282;
    root.querySelectorAll("[data-car-prev]").forEach(function (b) {
      b.addEventListener("click", function () {
        track.scrollBy({
          left: -step * 2,
          behavior: "smooth"
        });
      });
    });
    root.querySelectorAll("[data-car-next]").forEach(function (b) {
      b.addEventListener("click", function () {
        track.scrollBy({
          left: step * 2,
          behavior: "smooth"
        });
      });
    });
  });

  /* ---------- CTA sticky inferior ---------- */
  var sticky = document.querySelector(".sticky-cta");
  var hero = document.querySelector(".hero");
  if (sticky && hero) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        sticky.classList.toggle("is-visible", !en.isIntersecting);
      });
    }, {
      rootMargin: "0px 0px -85% 0px"
    });
    io.observe(hero);
  }

  /* ---------- Formulario de captación (objetivo) ---------- */
  document.querySelectorAll("[data-lead-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (field) {
        var valid = field.value && field.value.trim() !== "" && (field.type !== "email" || /.+@.+\..+/.test(field.value));
        field.classList.toggle("is-invalid", !valid);
        if (!valid && ok) {
          field.focus();
          ok = false;
        }
      });
      if (!ok) return;
      var card = form.closest(".form-card") || form.parentNode;
      var done = card.querySelector(".lead-done");
      var emailVal = (form.querySelector('[name="email"]') || {}).value || "";
      var emailOut = card.querySelector("[data-done-email]");
      if (emailOut && emailVal) emailOut.textContent = emailVal;
      card.classList.add("is-sent");
      if (done) done.removeAttribute("hidden");

      // Marca conversión para todas las copias del formulario (demo)
      window.__maiiLead = {
        ok: true,
        email: emailVal
      };
    });

    // Limpia el estado de error al escribir
    form.addEventListener("input", function (e) {
      if (e.target.classList) e.target.classList.remove("is-invalid");
    });
  });

  /* ---------- CTAs que llevan al formulario ---------- */
  document.querySelectorAll("[data-goform]").forEach(function (a) {
    a.addEventListener("click", function () {
      // Enfoca el primer campo visible del formulario tras el scroll
      setTimeout(function () {
        var target = document.querySelector("#form .lead-form:not([hidden]) .lf-input");
        if (target) try {
          target.focus({
            preventScroll: true
          });
        } catch (err) {
          target.focus();
        }
      }, 520);
    });
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "maii-lp/lp.js", error: String((e && e.message) || e) }); }

// maii-lp/tweaks-app.jsx
try { (() => {
/* MAII LP — panel de Tweaks: ajustes de conversión. */
const {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRadio,
  TweakToggle,
  TweakColor
} = window;
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroBg": "Oscuro",
  "countdown": true,
  "offerbar": true,
  "urgency": "#5045c8"
} /*EDITMODE-END*/;
const BG_MAP = {
  "Oscuro": "dark",
  "Lila": "lilac"
};
function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => {
    const root = document.documentElement;
    root.dataset.herobg = BG_MAP[t.heroBg] || "dark";
    root.dataset.countdown = t.countdown ? "on" : "off";
    root.style.setProperty("--lp-urgency", t.urgency || "#5045c8");
    const bar = document.querySelector(".offerbar");
    if (bar) bar.style.display = t.offerbar ? "" : "none";
  }, [t.heroBg, t.countdown, t.offerbar, t.urgency]);
  return /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Hero"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Fondo",
    value: t.heroBg,
    options: ["Oscuro", "Lila"],
    onChange: v => setTweak("heroBg", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Conversi\xF3n"
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Barra de oferta",
    value: t.offerbar,
    onChange: v => setTweak("offerbar", v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Mostrar countdown",
    value: t.countdown,
    onChange: v => setTweak("countdown", v)
  }), /*#__PURE__*/React.createElement(TweakColor, {
    label: "Color de acento",
    value: t.urgency,
    options: ["#5045c8", "#2f2976", "#1a191d"],
    onChange: v => setTweak("urgency", v)
  }));
}
const mount = document.createElement("div");
document.body.appendChild(mount);
ReactDOM.createRoot(mount).render(/*#__PURE__*/React.createElement(TweaksApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "maii-lp/tweaks-app.jsx", error: String((e && e.message) || e) }); }

// maii-lp/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "maii-lp/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/BakerClon.jsx
try { (() => {
/* Founderz — "Baker clon" LP (Máster MAIC). Replica de go.founderz.com/maic-mql. */
function BakerClon() {
  const B = window.BAKER;
  const {
    Button,
    Pill,
    SectionHeading,
    Icon,
    Field,
    Logo,
    FeatureCard,
    Accordion,
    Testimonial,
    Avatar
  } = window.FounderzDesignSystem_47078d;
  const [openMod, setOpenMod] = React.useState(0);
  const [openFaq, setOpenFaq] = React.useState(0);
  const formRef = React.useRef(null);
  const twWords = ["motion designers.", "arquitectos.", "directores creativos.", "diseñadores de moda.", "diseñadores gráficos.", "directores de arte.", "publicistas.", "cineastas.", "fotógrafos.", "ilustradores."];
  const [twIdx, setTwIdx] = React.useState(0);
  const [twText, setTwText] = React.useState("motion designers.");
  const [twDel, setTwDel] = React.useState(false);
  React.useEffect(() => {
    const full = twWords[twIdx];
    const id = setTimeout(() => {
      if (!twDel) {
        if (twText.length < full.length) setTwText(full.slice(0, twText.length + 1));else setTimeout(() => setTwDel(true), 1600);
      } else {
        if (twText.length > 0) setTwText(twText.slice(0, -1));else {
          setTwDel(false);
          setTwIdx(c => (c + 1) % twWords.length);
        }
      }
    }, twDel ? 55 : 85);
    return () => clearTimeout(id);
  }, [twText, twDel, twIdx]);
  React.useEffect(() => {
    const el = document.getElementById('bk-specs-carousel');
    if (!el) return;
    let isDown = false,
      startX = 0,
      scrollLeft = 0;
    const down = e => {
      isDown = true;
      el.classList.add('is-dragging');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const up = () => {
      isDown = false;
      el.classList.remove('is-dragging');
    };
    const move = e => {
      if (!isDown) return;
      e.preventDefault();
      el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX);
    };
    el.addEventListener('mousedown', down);
    el.addEventListener('mouseleave', up);
    el.addEventListener('mouseup', up);
    el.addEventListener('mousemove', move, {
      passive: false
    });
    return () => {
      el.removeEventListener('mousedown', down);
      el.removeEventListener('mouseleave', up);
      el.removeEventListener('mouseup', up);
      el.removeEventListener('mousemove', move);
    };
  }, []);
  const [showBtt, setShowBtt] = React.useState(false);
  React.useEffect(() => {
    const handle = () => {
      const nearFooter = window.scrollY + window.innerHeight > document.body.scrollHeight - 160;
      setShowBtt(window.scrollY > 400 && !nearFooter);
    };
    window.addEventListener('scroll', handle, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handle);
  }, []);
  const goToForm = () => {
    if (formRef.current) window.scrollTo({
      top: formRef.current.getBoundingClientRect().top + window.scrollY - 40,
      behavior: "smooth"
    });
  };
  const Stars = ({
    light
  }) => /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: "2px",
      color: "#00b67a"
    }
  }, [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement(Icon, {
    key: i,
    name: "star",
    size: 16,
    style: {
      fill: "#00b67a",
      color: "#00b67a"
    }
  })));
  const DossierForm = ({
    inner
  }) => /*#__PURE__*/React.createElement("form", {
    onSubmit: e => e.preventDefault(),
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Nombre",
    placeholder: "Tu nombre"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Apellido",
    placeholder: "Tus apellidos"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Correo",
    type: "email",
    placeholder: "tucorreo@empresa.com"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "N\xFAmero de tel\xE9fono",
    placeholder: "+34 600 000 000"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Pa\xEDs"
  }, /*#__PURE__*/React.createElement("select", {
    className: "fz-input"
  }, /*#__PURE__*/React.createElement("option", null, "Espa\xF1a"), /*#__PURE__*/React.createElement("option", null, "M\xE9xico"), /*#__PURE__*/React.createElement("option", null, "Colombia"), /*#__PURE__*/React.createElement("option", null, "Argentina"), /*#__PURE__*/React.createElement("option", null, "Otro"))), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      gap: "10px",
      alignItems: "flex-start",
      fontSize: "13px",
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    style: {
      marginTop: "3px"
    }
  }), /*#__PURE__*/React.createElement("span", null, "He le\xEDdo y acepto los t\xE9rminos y condiciones y la pol\xEDtica de privacidad.")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    type: "submit",
    style: {
      width: "100%"
    },
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    })
  }, inner.cta), /*#__PURE__*/React.createElement("p", {
    className: "fz-small fz-muted",
    style: {
      margin: 0,
      textAlign: "center"
    }
  }, inner.note || inner.formNote));
  const specImages = {
    "Ilustración": "1522202176078-f59c65cbf5b9",
    "Diseño Gráfico": "1558618742-fad45fb81b34",
    "Comunicación y RRSS": "1522071820081-009f0129c71c",
    "Cine y Audiovisual": "1536440136628-849c177e76a1",
    "Moda": "1469334031218-e382a71b716b",
    "Fotografía": "1506905925346-21bda4d32df4",
    "Publicidad": "1557804506-46fc631ba2a2",
    "Arquitectura": "1600585154340-be6161a56a0c"
  };
  const VideoReel = ({
    label,
    ratio = "9 / 16",
    bgColor
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      borderRadius: "var(--radius-card)",
      overflow: "hidden",
      aspectRatio: ratio,
      background: bgColor || "var(--fz-white-05)",
      border: bgColor ? "none" : "1px solid var(--fz-white-10)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.9)",
      display: "grid",
      placeItems: "center",
      color: "var(--fz-black)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 22,
    style: {
      fill: "var(--fz-black)"
    }
  }))), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 12,
      right: 12,
      bottom: 12,
      fontSize: "13px",
      color: "var(--fz-white-70)",
      textAlign: "center"
    }
  }, label) : null);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "var(--fz-black)",
      color: "var(--fz-white)",
      overflow: "clip"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "16px",
      paddingTop: "24px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    height: 24,
    color: "var(--fz-white)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "15px",
      color: "var(--fz-white-70)"
    }
  }, /*#__PURE__*/React.createElement(Stars, null), " ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--fz-white)",
      fontWeight: 600
    }
  }, B.hero.ratingPre))), /*#__PURE__*/React.createElement("div", {
    className: "container bk-hero",
    style: {
      paddingBlock: "48px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-hero__reel"
  }, /*#__PURE__*/React.createElement(VideoReel, {
    label: B.hero.reelLabel
  })), /*#__PURE__*/React.createElement("div", {
    className: "bk-hero__main"
  }, /*#__PURE__*/React.createElement(Pill, {
    variant: "third",
    uppercase: true,
    style: {
      alignSelf: "flex-start"
    }
  }, B.hero.microsoft), /*#__PURE__*/React.createElement("h1", {
    className: "fz-h1 bk-hero__title",
    style: {
      color: "var(--fz-white)",
      fontWeight: 700
    }
  }, "Domina la IA que est\xE1", /*#__PURE__*/React.createElement("br", null), "transformando el sector de los", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "bk-hero__typewriter"
  }, twText)), /*#__PURE__*/React.createElement("p", {
    className: "fz-body",
    style: {
      color: "var(--fz-white-70)"
    }
  }, B.hero.meta), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "fz-small",
    style: {
      color: "var(--fz-white)",
      fontWeight: 600,
      margin: 0
    }
  }, B.hero.bulletsTitle), B.hero.bullets.map((b, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: "flex",
      gap: "10px",
      alignItems: "flex-start",
      fontSize: "16px",
      color: "var(--fz-white-70)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 18,
    style: {
      color: "var(--fz-lilac)",
      flexShrink: 0,
      marginTop: "3px"
    }
  }), b))), /*#__PURE__*/React.createElement("div", {
    className: "bk-hero__form",
    ref: formRef
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--fz-white)",
      color: "var(--text-primary)",
      borderRadius: "var(--radius-card)",
      padding: "28px",
      boxShadow: "0 20px 60px rgba(26,25,29,0.35)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "fz-section-label"
  }, B.hero.formLabel), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "6px 0 4px",
      fontSize: "24px",
      fontWeight: "var(--fw-semibold)"
    }
  }, B.hero.formTitle), /*#__PURE__*/React.createElement("p", {
    className: "fz-small fz-muted",
    style: {
      margin: "0 0 16px"
    }
  }, B.hero.formSub), /*#__PURE__*/React.createElement(DossierForm, {
    inner: B.hero
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      paddingBottom: "48px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "fz-small",
    style: {
      textAlign: "center",
      color: "var(--fz-white-70)",
      marginBottom: "16px"
    }
  }, B.trust.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: "40px",
      flexWrap: "wrap",
      opacity: 0.8
    }
  }, B.trust.logos.map(l => /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      fontSize: "18px",
      fontWeight: 600,
      color: "var(--fz-white)"
    }
  }, l))))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "grey"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: B.quotes.title
  }), /*#__PURE__*/React.createElement("div", {
    className: "bk-grid-3"
  }, B.quotes.items.map((q, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: "var(--fz-white)",
      border: "1px solid var(--fz-border)",
      borderRadius: "var(--radius-card)",
      padding: "28px",
      display: "flex",
      flexDirection: "column",
      gap: "20px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: B.photo(q.img, 600),
    alt: "",
    style: {
      width: 56,
      height: 56,
      borderRadius: "50%",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "18px",
      lineHeight: 1.5,
      color: "var(--text-primary)"
    }
  }, "\u201C", q.text, "\u201D"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "15px",
      color: "var(--fz-purple)",
      fontStyle: "italic",
      marginTop: "auto"
    }
  }, q.after))))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "dark"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    onDark: true,
    label: /*#__PURE__*/React.createElement("span", {
      style: {
        color: "rgba(255,255,255,0.65)"
      }
    }, B.showcase.label),
    title: B.showcase.title
  }), /*#__PURE__*/React.createElement("div", {
    className: "bk-showcase"
  }, B.showcase.items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `bk-showcase__item bk-showcase__item--${i}`,
    style: {
      position: "relative",
      borderRadius: "var(--radius-card)",
      overflow: "hidden",
      minHeight: "240px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: B.photo(it.img, 1000),
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(26,25,29,0.1), rgba(26,25,29,0.75))"
    }
  }), it.video ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 16,
      right: 16,
      fontSize: "13px",
      color: "#fff",
      background: "rgba(0,0,0,0.4)",
      padding: "6px 12px",
      borderRadius: "100px",
      display: "inline-flex",
      gap: "6px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 14,
    style: {
      fill: "#fff"
    }
  }), "Ver con sonido") : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 20,
      right: 20,
      bottom: 20,
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: "20px",
      fontWeight: 600
    }
  }, it.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      fontSize: "14px",
      color: "rgba(255,255,255,0.8)"
    }
  }, it.sub))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginTop: "32px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "second",
    onClick: goToForm,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    })
  }, B.showcase.cta))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "white"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: B.program.label,
    title: B.program.title,
    description: B.program.sub
  }), /*#__PURE__*/React.createElement("div", {
    className: "bk-grid-4",
    style: {
      marginBottom: "40px"
    }
  }, B.program.stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      textAlign: "center",
      padding: "24px",
      background: "var(--fz-grey)",
      borderRadius: "var(--radius-card-inner)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "32px",
      fontWeight: "var(--fw-semibold)",
      color: "var(--fz-purple)"
    }
  }, s.value), /*#__PURE__*/React.createElement("div", {
    className: "fz-small fz-muted"
  }, s.label)))), /*#__PURE__*/React.createElement("p", {
    className: "fz-body",
    style: {
      textAlign: "center",
      fontWeight: 500,
      marginBottom: "20px"
    }
  }, B.program.specTitle), /*#__PURE__*/React.createElement("div", {
    className: "bk-specs-carousel",
    id: "bk-specs-carousel",
    style: {
      marginBottom: "40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-specs-track"
  }, B.program.specs.map((sp, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "bk-spec-item"
  }, /*#__PURE__*/React.createElement("img", {
    src: B.photo(specImages[sp.name] || "1522202176078-f59c65cbf5b9", 400),
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(26,25,29,0) 40%, rgba(26,25,29,0.75))"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "bk-spec-item__name"
  }, sp.name))))), /*#__PURE__*/React.createElement("div", {
    className: "bk-two-col",
    style: {
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, B.program.includes.map(it => /*#__PURE__*/React.createElement("span", {
    key: it,
    style: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
      fontSize: "17px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 20,
    style: {
      color: "var(--fz-purple)",
      flexShrink: 0
    }
  }), it))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "fz-section-label",
    style: {
      marginBottom: "12px"
    }
  }, B.program.learnTitle), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginBottom: "28px"
    }
  }, B.program.learn.map(l => /*#__PURE__*/React.createElement(Pill, {
    key: l
  }, l))), /*#__PURE__*/React.createElement("p", {
    className: "fz-section-label",
    style: {
      marginBottom: "12px"
    }
  }, B.program.toolsTitle), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px"
    }
  }, B.program.tools.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      fontSize: "15px",
      fontWeight: 500,
      padding: "8px 16px",
      borderRadius: "100px",
      border: "1px solid var(--fz-border)",
      background: "var(--fz-white)"
    }
  }, t)))))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "grey"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: B.syllabus.title
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "900px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, B.syllabus.modules.map((m, i) => /*#__PURE__*/React.createElement(Accordion, {
    key: i,
    open: openMod === i,
    onToggle: n => setOpenMod(n ? i : -1),
    question: /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "12px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 28,
        height: 28,
        borderRadius: "8px",
        background: "var(--fz-lilac)",
        color: "var(--fz-purple)",
        display: "grid",
        placeItems: "center",
        fontSize: "14px",
        fontWeight: 600,
        flexShrink: 0
      }
    }, m.n), m.title, m.tag ? /*#__PURE__*/React.createElement(Pill, {
      style: {
        fontSize: "12px",
        padding: "2px 10px"
      }
    }, m.tag) : null)
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: "0 0 16px",
      paddingLeft: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }
  }, m.lessons.map((l, j) => /*#__PURE__*/React.createElement("li", {
    key: j
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "16px",
      flexWrap: "wrap"
    }
  }, m.teachers.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      fontSize: "14px",
      color: "var(--text-secondary)"
    }
  }, "\xB7 ", t))))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "32px",
      background: "var(--fz-white)",
      border: "1px dashed var(--fz-border)",
      borderRadius: "var(--radius-card-inner)",
      marginTop: "8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: "50%",
      background: "var(--fz-lilac)",
      color: "var(--fz-purple)",
      display: "inline-grid",
      placeItems: "center",
      marginBottom: "12px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "award",
    size: 22
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 6px",
      fontSize: "20px",
      fontWeight: 600
    }
  }, B.syllabus.lockedTitle), /*#__PURE__*/React.createElement("p", {
    className: "fz-small fz-muted",
    style: {
      margin: "0 0 16px"
    }
  }, B.syllabus.lockedSub), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: goToForm
  }, B.syllabus.lockedCta), /*#__PURE__*/React.createElement("p", {
    className: "fz-small fz-muted",
    style: {
      margin: "12px 0 0"
    }
  }, B.syllabus.lockedNote)))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "white"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: B.method.label,
    title: B.method.title
  }), /*#__PURE__*/React.createElement("div", {
    className: "bk-two-col",
    style: {
      alignItems: "center",
      maxWidth: "920px",
      marginInline: "auto",
      gap: "32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "320px",
      marginInline: "auto",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(VideoReel, {
    label: `${B.method.videoTitle} · ${B.method.videoSub}`,
    bgColor: "linear-gradient(135deg, #5045c8 0%, #2f2976 55%, #1a191d 100%)"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "fz-body",
    style: {
      marginBottom: "24px"
    }
  }, B.method.intro), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "20px"
    }
  }, B.method.items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.title,
    style: {
      display: "flex",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fz-purple)",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: 24
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: "18px",
      fontWeight: 600
    }
  }, it.title), /*#__PURE__*/React.createElement("p", {
    className: "fz-details fz-muted",
    style: {
      margin: "4px 0 0"
    }
  }, it.text)))))))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "grey"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: "16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement(Stars, null), " ", B.testimonials.ratingPre)), /*#__PURE__*/React.createElement(SectionHeading, {
    title: B.testimonials.title
  }), /*#__PURE__*/React.createElement("div", {
    className: "bk-feat-testi"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--fz-black)",
      color: "var(--fz-white)",
      borderRadius: "var(--radius-card)",
      overflow: "hidden",
      display: "grid",
      gridTemplateColumns: "1fr",
      minHeight: "280px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "1fr 1fr"
    },
    className: "bk-feat-testi__inner"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "var(--fz-white-05)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: B.photo(B.testimonials.featured.img, 800),
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.92)",
      display: "grid",
      placeItems: "center",
      color: "var(--fz-black)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 22,
    style: {
      fill: "var(--fz-black)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "32px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "18px",
      lineHeight: 1.5
    }
  }, "\u201C", B.testimonials.featured.text, "\u201D"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600
    }
  }, B.testimonials.featured.name), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fz-white-70)",
      fontSize: "14px"
    }
  }, B.testimonials.featured.role))))), /*#__PURE__*/React.createElement("div", {
    className: "bk-grid-3",
    style: {
      marginTop: "16px"
    }
  }, B.testimonials.items.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: "var(--fz-white)",
      borderRadius: "var(--radius-card)",
      padding: "28px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      height: "100%",
      boxSizing: "border-box",
      border: "1px solid var(--fz-border)"
    }
  }, /*#__PURE__*/React.createElement(Stars, null), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      flex: 1,
      fontSize: "17px",
      lineHeight: 1.5,
      color: "var(--text-primary)"
    }
  }, "\"", t.text, "\""), /*#__PURE__*/React.createElement(Avatar, {
    src: t.avatar,
    name: t.name,
    role: t.role
  })))))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "dark"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-teachers__head"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    onDark: true,
    align: "left",
    label: /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fz-lilac)"
      }
    }, B.teachers.label),
    title: B.teachers.title,
    description: B.teachers.sub,
    style: {
      marginBottom: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "bk-teachers__nav"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Anterior",
    className: "bk-teachers__arrow",
    onClick: () => {
      const el = document.getElementById('bk-teachers-track');
      if (el) el.scrollBy({
        left: -260,
        behavior: 'smooth'
      });
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 20,
    style: {
      transform: "rotate(180deg)"
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Siguiente",
    className: "bk-teachers__arrow",
    onClick: () => {
      const el = document.getElementById('bk-teachers-track');
      if (el) el.scrollBy({
        left: 260,
        behavior: 'smooth'
      });
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 20
  })))), /*#__PURE__*/React.createElement("div", {
    className: "bk-teachers__track",
    id: "bk-teachers-track"
  }, B.teachers.items.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "bk-teachers__slide"
  }, /*#__PURE__*/React.createElement("img", {
    src: `https://i.pravatar.cc/400?img=${t.img}`,
    alt: t.name,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(26,25,29,0) 30%, rgba(26,25,29,0.96))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 16,
      right: 16,
      bottom: 16,
      color: "#fff",
      textShadow: "0 1px 4px rgba(0,0,0,0.6)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: "17px",
      fontWeight: 600
    }
  }, t.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "2px 0 0",
      fontSize: "13px",
      color: "rgba(255,255,255,0.85)"
    }
  }, t.role), t.company ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontSize: "12px",
      color: "var(--fz-lilac)",
      fontWeight: 600
    }
  }, t.company) : null)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginTop: "32px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "second",
    onClick: goToForm,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    })
  }, B.teachers.cta))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "white",
    pad: "secondary"
  }, /*#__PURE__*/React.createElement("p", {
    className: "fz-section-label",
    style: {
      textAlign: "center",
      marginBottom: "24px"
    }
  }, B.awards.label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: "40px",
      flexWrap: "wrap",
      alignItems: "center",
      opacity: 0.6
    }
  }, B.awards.logos.map(l => /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      fontSize: "16px",
      fontWeight: 600,
      color: "var(--fz-black)"
    }
  }, l)))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "grey",
    pad: "secondary"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "FAQ",
    title: B.faqs.title
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "820px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, B.faqs.items.map((f, i) => /*#__PURE__*/React.createElement(Accordion, {
    key: i,
    question: f.q,
    open: openFaq === i,
    onToggle: n => setOpenFaq(n ? i : -1)
  }, f.a)))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--fz-purple)",
      color: "var(--fz-white)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container bk-final",
    style: {
      paddingBlock: "80px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "20px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "fz-section-label",
    style: {
      color: "var(--fz-lilac)"
    }
  }, B.finalCta.label), /*#__PURE__*/React.createElement("h2", {
    className: "fz-h2",
    style: {
      color: "var(--fz-white)"
    }
  }, B.finalCta.title), /*#__PURE__*/React.createElement("p", {
    className: "fz-body",
    style: {
      color: "var(--fz-white-70)"
    }
  }, B.finalCta.sub), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      marginTop: "8px"
    }
  }, B.finalCta.checks.map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      fontSize: "16px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 18,
    style: {
      color: "var(--fz-lilac)"
    }
  }), c)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--fz-white)",
      color: "var(--text-primary)",
      borderRadius: "var(--radius-card)",
      padding: "28px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 4px",
      fontSize: "22px",
      fontWeight: "var(--fw-semibold)"
    }
  }, B.finalCta.formTitle), /*#__PURE__*/React.createElement("p", {
    className: "fz-small fz-muted",
    style: {
      margin: "0 0 16px"
    }
  }, B.finalCta.formSub), /*#__PURE__*/React.createElement(DossierForm, {
    inner: B.finalCta
  })))), /*#__PURE__*/React.createElement(window.SiteFooter, null), /*#__PURE__*/React.createElement("button", {
    onClick: () => window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }),
    "aria-label": "Volver arriba",
    style: {
      position: 'fixed',
      bottom: 32,
      right: 32,
      zIndex: 200,
      width: 48,
      height: 48,
      borderRadius: '50%',
      background: 'var(--fz-purple)',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      display: 'grid',
      placeItems: 'center',
      boxShadow: '0 4px 16px rgba(80,69,200,0.4)',
      opacity: showBtt ? 1 : 0,
      pointerEvents: showBtt ? 'auto' : 'none',
      transform: showBtt ? 'translateY(0)' : 'translateY(12px)',
      transition: 'opacity .25s, transform .25s'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 22,
    style: {
      transform: 'rotate(-90deg)'
    }
  })));
}
window.BakerClon = BakerClon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/BakerClon.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Empresas.jsx
try { (() => {
/* Founderz Empresas (B2B) landing page. */
function Empresas() {
  const D = window.FZ;
  const {
    Button,
    Pill,
    SectionHeading,
    Icon,
    Field,
    FeatureCard,
    Accordion,
    Testimonial,
    Banner,
    BannerCTA
  } = window.FounderzDesignSystem_47078d;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "var(--fz-black)",
      color: "var(--fz-white)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: D.img.heroEmpresas,
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: 0.22
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fz-container"
  }, /*#__PURE__*/React.createElement(window.SiteHeaderTransparent, {
    primaryLabel: "Solicita una demo"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "fz-container",
    style: {
      paddingBlock: "80px",
      display: "grid",
      gridTemplateColumns: "1.1fr 460px",
      gap: "56px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "24px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "fz-section-label",
    style: {
      color: "var(--fz-lilac)"
    }
  }, "Founderz para empresas"), /*#__PURE__*/React.createElement("h1", {
    className: "fz-h1 fz-h1--light",
    style: {
      color: "var(--fz-white)",
      fontSize: "60px"
    }
  }, "Forma a tu equipo en IA y multiplica su impacto"), /*#__PURE__*/React.createElement("p", {
    className: "fz-body",
    style: {
      color: "var(--fz-white-70)",
      maxWidth: "520px"
    }
  }, "Programas a medida para que tu organizaci\xF3n adopte la inteligencia artificial con criterio y resultados."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "second"
  }, "Solicita una demo"), /*#__PURE__*/React.createElement(Button, {
    variant: "second-outlined"
  }, "Descarga el dossier"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--fz-white)",
      color: "var(--text-primary)",
      borderRadius: "var(--radius-card)",
      padding: "32px",
      display: "flex",
      flexDirection: "column",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: "24px",
      fontWeight: "var(--fw-semibold)"
    }
  }, "Habla con nuestro equipo"), /*#__PURE__*/React.createElement(Field, {
    label: "Empresa",
    placeholder: "Nombre de la empresa"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Email corporativo",
    placeholder: "nombre@empresa.com"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "N\xBA de empleados a formar",
    as: "select"
  }, /*#__PURE__*/React.createElement("select", {
    className: "fz-input"
  }, /*#__PURE__*/React.createElement("option", null, "1 - 10"), /*#__PURE__*/React.createElement("option", null, "11 - 50"), /*#__PURE__*/React.createElement("option", null, "51 - 200"), /*#__PURE__*/React.createElement("option", null, "+200"))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    style: {
      width: "100%"
    }
  }, "Solicitar propuesta"))))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "white"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--fz-black)",
      color: "var(--fz-white)",
      borderRadius: "var(--radius-card)",
      padding: "56px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "48px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "20px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "fz-h2",
    style: {
      color: "var(--fz-white)"
    }
  }, "Eleva el talento de tu equipo o lo har\xE1 la competencia"), /*#__PURE__*/React.createElement("p", {
    className: "fz-body",
    style: {
      color: "var(--fz-white-70)"
    }
  }, "M\xE1s de 1.400 empresas ya forman a sus equipos con Founderz."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "second"
  }, "Empieza ahora"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "12px"
    }
  }, D.partners.slice(0, 9).map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: "var(--fz-white-05)",
      border: "1px solid var(--fz-white-10)",
      borderRadius: "var(--radius-input)",
      height: "72px",
      display: "grid",
      placeItems: "center",
      fontWeight: 600,
      color: "var(--fz-white-70)"
    }
  }, p))))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "grey"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "Ventajas",
    title: "Una formaci\xF3n que se nota en los resultados"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "16px"
    }
  }, D.features.map((f, i) => /*#__PURE__*/React.createElement(FeatureCard, {
    key: i,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: f.icon
    }),
    title: f.title,
    bordered: true
  }, f.text)))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "white"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--fz-purple)",
      color: "var(--fz-white)",
      borderRadius: "var(--radius-card)",
      padding: "48px 56px",
      display: "flex",
      gap: "40px",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "640px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "fz-h2",
    style: {
      color: "var(--fz-white)",
      fontSize: "32px"
    }
  }, "Formaci\xF3n 100% bonificable con Fundae"), /*#__PURE__*/React.createElement("p", {
    className: "fz-body",
    style: {
      color: "var(--fz-white-70)",
      marginTop: "12px"
    }
  }, "Gestionamos los cr\xE9ditos formativos por ti para que tu inversi\xF3n sea m\xEDnima.")), /*#__PURE__*/React.createElement(Button, {
    variant: "second"
  }, "Calcular mi cr\xE9dito"))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "grey"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Empresas que ya lideran con IA"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "16px"
    }
  }, D.testimonials.map((t, i) => /*#__PURE__*/React.createElement(Testimonial, {
    key: i,
    quote: t.quote,
    name: t.name,
    role: t.role,
    avatar: t.avatar
  })))), /*#__PURE__*/React.createElement(BannerCTA, {
    surface: "dark",
    title: "\xBFPreparado para integrar la IA en tu organizaci\xF3n?",
    description: "Dise\xF1amos un plan de formaci\xF3n a medida para tu equipo.",
    primary: "Solicita una demo",
    secondary: "Descarga el dossier"
  }), /*#__PURE__*/React.createElement(window.SiteFooter, null));
}
window.Empresas = Empresas;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Empresas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
/* Founderz homepage. */
const FZDS = window.FounderzDesignSystem_47078d;
function Home() {
  const D = window.FZ;
  const {
    Button,
    Pill,
    SectionHeading,
    LinkArrow,
    Icon,
    FeatureCard,
    StatCard,
    Accordion,
    Testimonial,
    ProgramCard,
    PostCard,
    EventCard,
    Banner,
    LogoMarquee,
    BannerCTA
  } = FZDS;
  const [openFaq, setOpenFaq] = React.useState(0);
  const [activeProgram, setActiveProgram] = React.useState(0);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.SiteHeader, null), /*#__PURE__*/React.createElement(window.Section, {
    bg: "white",
    pad: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.1fr 1fr",
      gap: "56px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "24px"
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    uppercase: true
  }, "Escuela de IA y negocio"), /*#__PURE__*/React.createElement("h1", {
    className: "fz-h1 fz-h1--light",
    style: {
      fontSize: "64px"
    }
  }, "Domina la IA y lidera el futuro de tu profesi\xF3n."), /*#__PURE__*/React.createElement("p", {
    className: "fz-body fz-muted",
    style: {
      maxWidth: "520px"
    }
  }, "Programas pr\xE1cticos de inteligencia artificial dise\xF1ados para profesionales, en directo y con expertos que la aplican cada d\xEDa."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      marginTop: "8px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    })
  }, "Ver programas"), /*#__PURE__*/React.createElement(Button, {
    variant: "third-outlined"
  }, "Hablemos")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "24px",
      marginTop: "8px",
      flexWrap: "wrap"
    }
  }, ["Clases en directo", "Certificación oficial", "Financiación disponible"].map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      color: "var(--text-secondary)",
      fontSize: "16px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 18,
    style: {
      color: "var(--fz-purple)"
    }
  }), t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-card)",
      overflow: "hidden",
      aspectRatio: "4/3",
      background: "var(--fz-grey)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: D.img.heroHome,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "white",
    pad: "compact"
  }, /*#__PURE__*/React.createElement("p", {
    className: "fz-small fz-muted",
    style: {
      textAlign: "center",
      marginBottom: "24px"
    }
  }, "Profesionales de las mejores empresas conf\xEDan en Founderz"), /*#__PURE__*/React.createElement(LogoMarquee, {
    logos: D.partners.map(p => /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "24px",
        fontWeight: 600,
        color: "var(--fz-black)"
      }
    }, p))
  })), /*#__PURE__*/React.createElement(window.Section, {
    bg: "grey"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "Programas",
    title: "Formaci\xF3n interactiva para cada objetivo",
    description: "Elige el programa que encaja con tu momento profesional."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: activeProgram === 0 ? "1.4fr 1fr 1fr" : activeProgram === 1 ? "1fr 1.4fr 1fr" : "1fr 1fr 1.4fr",
      gap: "16px",
      transition: "grid-template-columns .3s var(--ease-out)"
    }
  }, D.programs.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onMouseEnter: () => setActiveProgram(i)
  }, /*#__PURE__*/React.createElement(ProgramCard, {
    active: activeProgram === i,
    image: [D.img.meeting, D.img.creative, D.img.laptop][i],
    type: p.type,
    duration: p.duration,
    title: p.title,
    categories: p.categories,
    description: p.desc,
    price: p.price,
    priceOld: p.priceOld
  }))))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "white"
  }, /*#__PURE__*/React.createElement(Banner, {
    title: "Microsoft + Founderz. La uni\xF3n hace la fuerza.",
    description: "Contenido co-creado y certificaciones oficiales de Microsoft en todos nuestros programas.",
    aside: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "28px",
        fontWeight: 600,
        color: "var(--fz-purple)"
      }
    }, "Microsoft")
  })), /*#__PURE__*/React.createElement(window.Section, {
    bg: "white",
    pad: "secondary"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "Founderz en cifras",
    title: "Resultados que hablan por s\xED solos"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "16px"
    }
  }, D.stats.map((s, i) => /*#__PURE__*/React.createElement(StatCard, {
    key: i,
    value: s.value,
    label: s.label,
    surface: s.surface
  })))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "grey"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "Por qu\xE9 Founderz",
    title: "No solo es lo que aprendes. Es c\xF3mo lo aprendes."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "16px"
    }
  }, D.features.map((f, i) => /*#__PURE__*/React.createElement(FeatureCard, {
    key: i,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: f.icon
    }),
    title: f.title
  }, f.text)))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "white",
    pad: "secondary"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "left",
    label: "Agenda",
    title: "Pr\xF3ximas sesiones en directo"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, D.events.map((e, i) => /*#__PURE__*/React.createElement(EventCard, {
    key: i,
    day: e.day,
    month: e.month,
    label: e.label,
    title: e.title,
    speaker: e.speaker
  })))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "grey"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "left",
    label: "Testimonios",
    title: "Founderz seg\xFAn sus protagonistas"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "16px"
    }
  }, D.testimonials.map((t, i) => /*#__PURE__*/React.createElement(Testimonial, {
    key: i,
    quote: t.quote,
    name: t.name,
    role: t.role,
    avatar: t.avatar
  })))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "grey",
    pad: "secondary",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "\xBFTienes dudas? Tenemos respuestas."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "820px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, D.faqs.map((f, i) => /*#__PURE__*/React.createElement(Accordion, {
    key: i,
    question: f.q,
    open: openFaq === i,
    onToggle: n => setOpenFaq(n ? i : -1)
  }, f.a)))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "white"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "left",
    label: "Recursos",
    title: "Aprende algo nuevo cada semana",
    action: /*#__PURE__*/React.createElement(LinkArrow, {
      href: "#"
    }, "Ver todos los art\xEDculos")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "16px"
    }
  }, D.posts.map((p, i) => /*#__PURE__*/React.createElement(PostCard, {
    key: i,
    image: D.photo(p.img),
    category: p.category,
    title: p.title
  })))), /*#__PURE__*/React.createElement(BannerCTA, {
    title: "\xBFListo para dominar la IA?",
    description: "\xDAnete a m\xE1s de 250.000 profesionales que ya est\xE1n liderando el cambio.",
    primary: "Empieza hoy",
    secondary: "Solicita informaci\xF3n"
  }), /*#__PURE__*/React.createElement(window.SiteFooter, null));
}
window.Home = Home;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Pricing.jsx
try { (() => {
/* Founderz Pricing page. */
function Pricing() {
  const D = window.FZ;
  const {
    Button,
    Pill,
    SectionHeading,
    Icon,
    Accordion,
    BannerCTA
  } = window.FounderzDesignSystem_47078d;
  const [openFin, setOpenFin] = React.useState(0);
  const masters = [["IA e Innovación 2026", "Máster", "2.400 €", "12x sin intereses", "Microsoft", "12 sem.", "Online en directo"], ["IA generativa para Creativos", "Máster", "2.200 €", "12x sin intereses", "Microsoft", "10 sem.", "Online en directo"], ["Dirección Estratégica de la IA", "Máster", "2.800 €", "12x sin intereses", "Microsoft", "14 sem.", "Online en directo"]];
  const courses = [["Productividad con Copilot", "Curso", "900 €", "6x sin intereses", "6 sem."], ["IA en Finanzas", "Curso", "1.200 €", "6x sin intereses", "8 sem."], ["Alfabetización en IA", "Curso", "600 €", "3x sin intereses", "4 sem."]];
  const th = {
    textAlign: "left",
    padding: "16px 20px",
    fontSize: "16px",
    fontWeight: "var(--fw-semibold)"
  };
  const td = {
    padding: "18px 20px",
    fontSize: "16px",
    borderTop: "1px solid var(--fz-border)"
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.SiteHeader, null), /*#__PURE__*/React.createElement(window.Section, {
    bg: "white",
    pad: "hero",
    style: {
      paddingBottom: "40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "760px"
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    uppercase: true
  }, "Precios"), /*#__PURE__*/React.createElement("h1", {
    className: "fz-h1",
    style: {
      marginTop: "20px"
    }
  }, "Invierte en tu futuro con la IA"), /*#__PURE__*/React.createElement("p", {
    className: "fz-body fz-muted",
    style: {
      marginTop: "20px"
    }
  }, "Programas con financiaci\xF3n sin intereses y opciones bonificables para empresas. Sin sorpresas."))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "white",
    pad: "secondary"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "left",
    label: "M\xE1sters",
    title: "Programas largos y certificados"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--fz-border)",
      borderRadius: "var(--radius-card)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "var(--fz-grey)"
    }
  }, ["Programa", "Tipo", "Precio", "Financiación", "Certificación", "Duración", "Modalidad"].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: th
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, masters.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, r.map((c, j) => /*#__PURE__*/React.createElement("td", {
    key: j,
    style: {
      ...td,
      fontWeight: j === 0 ? "var(--fw-medium)" : "var(--fw-regular)",
      color: j === 2 ? "var(--fz-purple)" : "var(--text-primary)"
    }
  }, c)))))))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "white",
    pad: "secondary",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "left",
    label: "Cursos especializados",
    title: "Formaciones cortas y pr\xE1cticas"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--fz-border)",
      borderRadius: "var(--radius-card)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "var(--fz-purple)",
      color: "var(--fz-white)"
    }
  }, ["Programa", "Tipo", "Precio", "Financiación", "Duración"].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: th
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, courses.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, r.map((c, j) => /*#__PURE__*/React.createElement("td", {
    key: j,
    style: {
      ...td,
      fontWeight: j === 0 ? "var(--fw-medium)" : "var(--fw-regular)",
      color: j === 2 ? "var(--fz-purple)" : "var(--text-primary)"
    }
  }, c)))))))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "grey"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "56px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "left",
    label: "Qu\xE9 incluye",
    title: "Todo lo que necesitas para aprender de verdad"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "14px"
    }
  }, ["Clases en directo + grabaciones", "Proyecto final con feedback de expertos", "Certificación oficial Microsoft", "Acceso a la comunidad de +250K profesionales", "Materiales y plantillas descargables"].map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "12px",
      fontSize: "18px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 20,
    style: {
      color: "var(--fz-purple)"
    }
  }), t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-card)",
      overflow: "hidden",
      aspectRatio: "4/3"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: D.img.class,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "lilac",
    pad: "secondary"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Preguntas frecuentes sobre el precio"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "820px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, [{
    q: "¿Puedo pagar a plazos?",
    a: "Sí, ofrecemos financiación de hasta 12 meses sin intereses con Aplazame y BBVA."
  }, {
    q: "¿El precio incluye la certificación?",
    a: "Sí, todos los programas incluyen la certificación oficial sin coste adicional."
  }, {
    q: "¿Hay descuentos para empresas?",
    a: "Sí, contamos con tarifas especiales y formación bonificable por Fundae."
  }].map((f, i) => /*#__PURE__*/React.createElement(Accordion, {
    key: i,
    question: f.q,
    open: openFin === i,
    onToggle: n => setOpenFin(n ? i : -1)
  }, f.a)))), /*#__PURE__*/React.createElement(BannerCTA, {
    title: "Empieza hoy, paga c\xF3modamente",
    description: "Financiaci\xF3n sin intereses disponible en todos los programas.",
    primary: "Ver programas",
    secondary: "Hablar con asesor"
  }), /*#__PURE__*/React.createElement(window.SiteFooter, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      bottom: 0,
      background: "var(--fz-purple)",
      color: "var(--fz-white)",
      zIndex: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fz-container",
    style: {
      paddingBlock: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "24px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "28px",
      fontWeight: "var(--fw-semibold)"
    }
  }, "2.400 \u20AC"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "18px",
      color: "var(--fz-white-60)",
      textDecoration: "line-through"
    }
  }, "3.000 \u20AC")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "second"
  }, "Inscr\xEDbete hoy"), /*#__PURE__*/React.createElement(Button, {
    variant: "second-outlined"
  }, "Solicita informaci\xF3n")))));
}
window.Pricing = Pricing;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Pricing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ProgramLP.jsx
try { (() => {
/* Founderz program landing page (LP Programa). */
function ProgramLP() {
  const D = window.FZ;
  const {
    Button,
    Pill,
    SectionHeading,
    LinkArrow,
    Icon,
    Field,
    FeatureCard,
    StatCard,
    Accordion,
    Testimonial,
    BannerCTA
  } = window.FounderzDesignSystem_47078d;
  const [openSyl, setOpenSyl] = React.useState(0);
  const syllabus = [{
    q: "Módulo 1 · Fundamentos de IA",
    a: "Qué es la IA generativa, cómo funciona y cómo encaja en tu trabajo."
  }, {
    q: "Módulo 2 · Herramientas y prompting",
    a: "Domina ChatGPT, Copilot y las herramientas clave del mercado."
  }, {
    q: "Módulo 3 · IA aplicada a tu sector",
    a: "Casos de uso reales y proyectos prácticos adaptados a tu perfil."
  }, {
    q: "Módulo 4 · Estrategia e implementación",
    a: "Lleva la IA a tu equipo y mide el impacto en tu organización."
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "var(--fz-black)",
      color: "var(--fz-white)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: D.img.heroProgram,
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: 0.28
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fz-container"
  }, /*#__PURE__*/React.createElement(window.SiteHeaderTransparent, null))), /*#__PURE__*/React.createElement("div", {
    className: "fz-container",
    style: {
      paddingBlock: "80px",
      display: "grid",
      gridTemplateColumns: "1.1fr 460px",
      gap: "56px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "24px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "fz-section-label",
    style: {
      color: "var(--fz-lilac)"
    }
  }, "M\xE1ster \xB7 Edici\xF3n 2026"), /*#__PURE__*/React.createElement("h1", {
    className: "fz-h1 fz-h1--light",
    style: {
      color: "var(--fz-white)",
      fontSize: "60px"
    }
  }, "IA e Innovaci\xF3n para profesionales"), /*#__PURE__*/React.createElement("p", {
    className: "fz-body",
    style: {
      color: "var(--fz-white-70)",
      maxWidth: "520px"
    }
  }, "12 semanas para dominar la inteligencia artificial y liderar la transformaci\xF3n de tu organizaci\xF3n."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      marginTop: "8px"
    }
  }, ["Clases en directo con expertos", "Proyecto final aplicado a tu empresa", "Certificación oficial Microsoft"].map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      fontSize: "18px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 20,
    style: {
      color: "var(--fz-lilac)"
    }
  }), t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--fz-white)",
      color: "var(--text-primary)",
      borderRadius: "var(--radius-card)",
      padding: "32px",
      display: "flex",
      flexDirection: "column",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: "24px",
      fontWeight: "var(--fw-semibold)"
    }
  }, "Solicita informaci\xF3n"), /*#__PURE__*/React.createElement("p", {
    className: "fz-small fz-muted",
    style: {
      marginTop: "6px"
    }
  }, "Te llamamos en menos de 24h.")), /*#__PURE__*/React.createElement(Field, {
    label: "Nombre y apellidos",
    placeholder: "Tu nombre"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    placeholder: "tucorreo@empresa.com"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Tel\xE9fono",
    placeholder: "+34 600 000 000"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    style: {
      width: "100%"
    }
  }, "Quiero m\xE1s informaci\xF3n"), /*#__PURE__*/React.createElement("p", {
    className: "fz-small fz-muted",
    style: {
      textAlign: "center"
    }
  }, "o ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "var(--fz-purple)",
      fontWeight: 500
    }
  }, "descarga el temario")))))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "white",
    pad: "secondary"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    value: "12",
    label: "semanas de formaci\xF3n",
    surface: "lilac"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: "+40h",
    label: "de contenido en directo",
    surface: "grey"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: "98%",
    label: "de satisfacci\xF3n",
    surface: "purple"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: "+50",
    label: "expertos del sector",
    surface: "white"
  }))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "grey"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1.2fr",
      gap: "56px",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: "90px"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "left",
    label: "Temario",
    title: "Un programa pensado para aplicar desde el d\xEDa uno",
    description: "Cada m\xF3dulo combina teor\xEDa, herramientas y un proyecto pr\xE1ctico."
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Descargar temario completo")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, syllabus.map((s, i) => /*#__PURE__*/React.createElement(Accordion, {
    key: i,
    question: s.q,
    open: openSyl === i,
    onToggle: n => setOpenSyl(n ? i : -1)
  }, s.a))))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "dark"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "left",
    onDark: true,
    label: "Profesores",
    title: "Aprende de quienes aplican IA cada d\xEDa"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "16px"
    }
  }, D.testimonials.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: "var(--fz-white-05)",
      border: "1px solid var(--fz-white-10)",
      borderRadius: "var(--radius-card)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: [D.img.woman, D.img.meeting, D.img.data][i],
    alt: "",
    style: {
      width: "100%",
      height: "220px",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "20px",
      fontWeight: 600
    }
  }, t.name), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fz-white-70)",
      marginTop: "4px"
    }
  }, t.role)))))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "grey"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Lo que dicen nuestros alumnos"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "16px"
    }
  }, D.testimonials.map((t, i) => /*#__PURE__*/React.createElement(Testimonial, {
    key: i,
    quote: t.quote,
    name: t.name,
    role: t.role,
    avatar: t.avatar
  })))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "lilac",
    pad: "secondary"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Financiaci\xF3n a tu medida",
    description: "Empieza hoy y paga c\xF3modamente, sin intereses."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
      maxWidth: "900px",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Accordion, {
    question: "Financiaci\xF3n en hasta 12 meses sin intereses",
    defaultOpen: true
  }, "A trav\xE9s de Aplazame y BBVA, fracciona el pago sin coste adicional."), /*#__PURE__*/React.createElement(Accordion, {
    question: "Bonificable para empresas (Fundae)"
  }, "Si tu empresa te inscribe, el programa puede ser bonificable a trav\xE9s de Fundae."))), /*#__PURE__*/React.createElement(BannerCTA, {
    title: "Reserva tu plaza en la edici\xF3n 2026",
    description: "Plazas limitadas. Asegura la tuya hoy.",
    primary: "Inscr\xEDbete ahora",
    secondary: "Solicita informaci\xF3n"
  }), /*#__PURE__*/React.createElement(window.SiteFooter, null));
}
window.ProgramLP = ProgramLP;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ProgramLP.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SiteChrome.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Shared layout helpers for the Founderz website UI kit. */
const {
  Header,
  Footer
} = window.FounderzDesignSystem_47078d;

/** Full-bleed section with a background variant + standard container. */
function Section({
  bg = "white",
  pad = "standard",
  children,
  style = {},
  containerStyle = {}
}) {
  const padMap = {
    hero: "var(--section-pad-hero)",
    standard: "var(--section-pad-standard)",
    secondary: "var(--section-pad-secondary)",
    compact: "var(--section-pad-compact)"
  };
  const bgMap = {
    white: {
      background: "var(--fz-white)",
      color: "var(--text-primary)"
    },
    grey: {
      background: "var(--fz-grey)",
      color: "var(--text-primary)"
    },
    lilac: {
      background: "var(--fz-lilac)",
      color: "var(--text-primary)"
    },
    dark: {
      background: "var(--fz-black)",
      color: "var(--fz-white)"
    },
    purple: {
      background: "var(--fz-purple)",
      color: "var(--fz-white)"
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...bgMap[bg],
      paddingBlock: padMap[pad],
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: containerStyle
  }, children));
}

/** The shared site header used at the top of every screen. */
function SiteHeader(props) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: "16px",
      background: "var(--fz-white)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fz-container"
  }, /*#__PURE__*/React.createElement(Header, props)));
}
function SiteFooter() {
  return /*#__PURE__*/React.createElement(Footer, null);
}

/** Transparent header for placing over a dark hero. */
function SiteHeaderTransparent(props) {
  return /*#__PURE__*/React.createElement(Header, _extends({
    transparent: true
  }, props));
}
Object.assign(window, {
  Section,
  SiteHeader,
  SiteFooter,
  SiteHeaderTransparent
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SiteChrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Webinar.jsx
try { (() => {
/* Founderz — Webinar registration landing page (conversion-focused). */
function Webinar() {
  const D = window.FZ;
  const {
    Button,
    Pill,
    SectionHeading,
    Icon,
    Field,
    Logo,
    FeatureCard,
    Accordion,
    Testimonial,
    Avatar,
    LinkArrow
  } = window.FounderzDesignSystem_47078d;

  // --- Webinar data ---
  const WB = {
    title: "IA generativa para profesionales: de cero a tu primer proyecto",
    subtitle: "Una masterclass en directo para empezar a usar la IA en tu trabajo hoy, sin conocimientos previos.",
    durationMin: 75,
    speaker: {
      name: "Anna Pérez",
      role: "Lead AI Educator · Founderz",
      avatar: D.avatars.anna,
      bio: "Ha formado a más de 40.000 profesionales en inteligencia artificial aplicada. Ex-Microsoft, diseña los programas de IA de Founderz."
    },
    learn: [{
      icon: "wand",
      title: "Tus primeros prompts profesionales",
      text: "Aprende a hablar con la IA para obtener resultados útiles desde el minuto uno."
    }, {
      icon: "cpu",
      title: "Las herramientas que importan",
      text: "ChatGPT, Copilot y Gemini: cuándo usar cada una y cómo combinarlas."
    }, {
      icon: "rocket",
      title: "Tu primer proyecto con IA",
      text: "Construye en directo un flujo de trabajo real que podrás aplicar mañana."
    }],
    agenda: [{
      t: "00:00",
      h: "Bienvenida y panorama de la IA en 2026",
      d: "Qué ha cambiado y por qué te afecta a ti."
    }, {
      t: "00:15",
      h: "Fundamentos del prompting eficaz",
      d: "El método para pedirle a la IA exactamente lo que necesitas."
    }, {
      t: "00:40",
      h: "Demo en directo: de la idea al resultado",
      d: "Creamos juntos un proyecto paso a paso."
    }, {
      t: "01:05",
      h: "Preguntas y respuestas",
      d: "Resolvemos tus dudas en directo."
    }],
    audience: ["Profesionales que quieren ahorrar horas con IA", "Mandos y equipos que lideran proyectos", "Emprendedores y autónomos", "Cualquiera que parta de cero"],
    faqs: [{
      q: "¿El webinar es gratuito?",
      a: "Sí, la inscripción es 100% gratuita. Solo necesitas registrarte con tu email."
    }, {
      q: "¿Habrá grabación si no puedo asistir en directo?",
      a: "Sí. Todas las personas inscritas reciben el acceso a la grabación durante 7 días."
    }, {
      q: "¿Necesito conocimientos previos?",
      a: "Ninguno. Empezamos desde cero y avanzamos paso a paso."
    }, {
      q: "¿Recibiré algún material?",
      a: "Sí, te enviaremos una guía de prompts y los recursos usados en la sesión."
    }]
  };

  // --- Countdown (always live: target = now + 4d 6h) ---
  const [target] = React.useState(() => Date.now() + (4 * 24 + 6) * 3600 * 1000);
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const cd = {
    d: Math.floor(diff / 86400000),
    h: Math.floor(diff % 86400000 / 3600000),
    m: Math.floor(diff % 3600000 / 60000),
    s: Math.floor(diff % 60000 / 1000)
  };
  const dateObj = new Date(target);
  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const dateLabel = `${dias[dateObj.getDay()]} ${dateObj.getDate()} de ${meses[dateObj.getMonth()]}`;
  const timeLabel = `${String(dateObj.getHours()).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}h (CEST)`;

  // --- Form ---
  const [form, setForm] = React.useState({
    nombre: "",
    email: "",
    empresa: ""
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [err, setErr] = React.useState("");
  const formRef = React.useRef(null);
  const set = k => e => setForm(f => ({
    ...f,
    [k]: e.target.value
  }));
  const submit = e => {
    e.preventDefault();
    if (!form.nombre.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setErr("Introduce tu nombre y un email válido para reservar tu plaza.");
      return;
    }
    setErr("");
    setSubmitted(true);
  };
  const goToForm = () => {
    if (formRef.current) window.scrollTo({
      top: formRef.current.getBoundingClientRect().top + window.scrollY - 90,
      behavior: "smooth"
    });
  };
  const Countdown = ({
    light
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px"
    }
  }, [["d", "días"], ["h", "horas"], ["m", "min"], ["s", "seg"]].map(([k, lbl]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      flex: 1,
      textAlign: "center",
      padding: "10px 4px",
      borderRadius: "12px",
      background: light ? "var(--fz-white)" : "rgba(255,255,255,0.08)",
      border: light ? "1px solid var(--fz-border)" : "1px solid var(--fz-white-10)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "28px",
      fontWeight: "var(--fw-semibold)",
      lineHeight: 1,
      color: light ? "var(--fz-purple)" : "var(--fz-white)",
      fontVariantNumeric: "tabular-nums"
    }
  }, String(cd[k]).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "12px",
      marginTop: "4px",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      color: light ? "var(--text-secondary)" : "var(--fz-white-70)"
    }
  }, lbl))));
  const FormCard = () => /*#__PURE__*/React.createElement("div", {
    ref: formRef,
    style: {
      background: "var(--fz-white)",
      color: "var(--text-primary)",
      borderRadius: "var(--radius-card)",
      padding: "28px",
      boxShadow: "0 20px 60px rgba(26,25,29,0.35)"
    }
  }, submitted ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      alignItems: "center",
      textAlign: "center",
      padding: "12px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: "50%",
      background: "var(--fz-lilac)",
      display: "grid",
      placeItems: "center",
      color: "var(--fz-purple)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 32
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: "26px",
      fontWeight: "var(--fw-semibold)"
    }
  }, "\xA1Est\xE1s dentro, ", form.nombre.split(" ")[0], "!"), /*#__PURE__*/React.createElement("p", {
    className: "fz-details fz-muted",
    style: {
      margin: 0
    }
  }, "Hemos enviado tu acceso a ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--text-primary)"
    }
  }, form.email), ". Te esperamos el ", dateLabel, " a las ", timeLabel, "."), /*#__PURE__*/React.createElement(Button, {
    variant: "third-outlined",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 18
    }),
    style: {
      width: "100%"
    }
  }, "A\xF1adir a mi calendario"), /*#__PURE__*/React.createElement("p", {
    className: "fz-small fz-muted",
    style: {
      margin: 0
    }
  }, "Recibir\xE1s la grabaci\xF3n aunque no puedas asistir.")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "4px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "fz-section-label"
  }, "Reserva gratuita"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: "24px",
      fontWeight: "var(--fw-semibold)"
    }
  }, "Guarda tu plaza")), /*#__PURE__*/React.createElement(Countdown, {
    light: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Nombre y apellidos",
    placeholder: "Tu nombre",
    value: form.nombre,
    onChange: set("nombre")
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    type: "email",
    placeholder: "tucorreo@empresa.com",
    value: form.email,
    onChange: set("email")
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Empresa (opcional)",
    placeholder: "D\xF3nde trabajas",
    value: form.empresa,
    onChange: set("empresa")
  }), err ? /*#__PURE__*/React.createElement("p", {
    className: "fz-small",
    style: {
      margin: 0,
      color: "#c0392b"
    }
  }, err) : null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    type: "submit",
    style: {
      width: "100%"
    },
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    })
  }, "Reserva tu plaza gratis"), /*#__PURE__*/React.createElement("p", {
    className: "fz-small fz-muted",
    style: {
      margin: 0,
      textAlign: "center"
    }
  }, "Plazas limitadas \xB7 100% gratis \xB7 Incluye grabaci\xF3n")));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "var(--fz-black)",
      color: "var(--fz-white)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: D.img.heroProgram,
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: 0.22
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fz-container wb-hero-top",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: "24px"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    height: 24,
    color: "var(--fz-white)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "16px",
      color: "var(--fz-white-70)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 18,
    style: {
      color: "var(--fz-lilac)"
    }
  }), dateLabel)), /*#__PURE__*/React.createElement("div", {
    className: "fz-container wb-hero"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    variant: "third",
    uppercase: true
  }, "Webinar gratuito"), /*#__PURE__*/React.createElement(Pill, {
    variant: "third",
    uppercase: true
  }, "En directo")), /*#__PURE__*/React.createElement("h1", {
    className: "fz-h1 fz-h1--light wb-hero__title",
    style: {
      color: "var(--fz-white)"
    }
  }, WB.title), /*#__PURE__*/React.createElement("p", {
    className: "fz-body",
    style: {
      color: "var(--fz-white-70)",
      maxWidth: "560px"
    }
  }, WB.subtitle), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "24px",
      flexWrap: "wrap"
    }
  }, [["calendar", dateLabel], ["clock", `${timeLabel} · ${WB.durationMin} min`]].map(([ic, tx]) => /*#__PURE__*/React.createElement("span", {
    key: tx,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      fontSize: "18px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 20,
    style: {
      color: "var(--fz-lilac)"
    }
  }), tx))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginTop: "8px",
      paddingTop: "24px",
      borderTop: "1px solid var(--fz-white-10)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, [D.avatars.pau, D.avatars.anna, D.avatars.marc, D.avatars.lucia].map((a, i) => /*#__PURE__*/React.createElement("img", {
    key: i,
    src: a,
    alt: "",
    style: {
      width: 40,
      height: 40,
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid var(--fz-black)",
      marginLeft: i ? -12 : 0
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "16px",
      color: "var(--fz-white-70)"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--fz-white)"
    }
  }, "+250.000 profesionales"), " ya se han formado con Founderz"))), /*#__PURE__*/React.createElement(FormCard, null)))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "grey",
    pad: "compact"
  }, /*#__PURE__*/React.createElement("p", {
    className: "fz-small fz-muted",
    style: {
      textAlign: "center",
      marginBottom: "24px"
    }
  }, "Profesionales de las mejores empresas asisten a nuestros webinars"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: "48px",
      flexWrap: "wrap",
      alignItems: "center",
      opacity: 0.75
    }
  }, D.partners.slice(0, 6).map(p => /*#__PURE__*/React.createElement("span", {
    key: p,
    style: {
      fontSize: "22px",
      fontWeight: 600,
      color: "var(--fz-black)"
    }
  }, p)))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "white"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "Qu\xE9 vas a aprender",
    title: "Sales del webinar sabiendo usar la IA, no solo oyendo hablar de ella"
  }), /*#__PURE__*/React.createElement("div", {
    className: "wb-grid-3"
  }, WB.learn.map((f, i) => /*#__PURE__*/React.createElement(FeatureCard, {
    key: i,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: f.icon
    }),
    title: f.title
  }, f.text)))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "lilac"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wb-two-col"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "left",
    label: "Agenda",
    title: "75 minutos, todo aplicable",
    description: "Una sesi\xF3n pr\xE1ctica, sin relleno, pensada para que salgas con algo que usar."
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: goToForm,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    })
  }, "Reserva tu plaza")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, WB.agenda.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: "20px",
      padding: "20px 0",
      borderTop: i ? "1px solid rgba(80,69,200,0.18)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      fontSize: "16px",
      fontWeight: "var(--fw-semibold)",
      color: "var(--fz-purple)",
      width: "56px",
      fontVariantNumeric: "tabular-nums"
    }
  }, a.t), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: "20px",
      fontWeight: "var(--fw-medium)"
    }
  }, a.h), /*#__PURE__*/React.createElement("p", {
    className: "fz-details fz-muted",
    style: {
      margin: "6px 0 0"
    }
  }, a.d))))))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "dark"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wb-speaker"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wb-speaker__media",
    style: {
      borderRadius: "var(--radius-card)",
      overflow: "hidden",
      aspectRatio: "1",
      background: "var(--fz-white-05)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: D.img.woman,
    alt: WB.speaker.name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "20px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "fz-section-label",
    style: {
      color: "var(--fz-lilac)"
    }
  }, "Tu ponente"), /*#__PURE__*/React.createElement("h2", {
    className: "fz-h2",
    style: {
      color: "var(--fz-white)"
    }
  }, WB.speaker.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "18px",
      color: "var(--fz-lilac)"
    }
  }, WB.speaker.role), /*#__PURE__*/React.createElement("p", {
    className: "fz-body",
    style: {
      color: "var(--fz-white-70)",
      maxWidth: "560px"
    }
  }, WB.speaker.bio)))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "white",
    pad: "secondary"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "\xBFEs para ti?",
    description: "Este webinar est\xE1 pensado para ti si eres\u2026"
  }), /*#__PURE__*/React.createElement("div", {
    className: "wb-grid-2"
  }, WB.audience.map(a => /*#__PURE__*/React.createElement("div", {
    key: a,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      padding: "20px 24px",
      background: "var(--fz-grey)",
      borderRadius: "var(--radius-card-inner)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 22,
    style: {
      color: "var(--fz-purple)",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "18px"
    }
  }, a))))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "grey"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Lo que dicen quienes ya han asistido"
  }), /*#__PURE__*/React.createElement("div", {
    className: "wb-grid-3"
  }, D.testimonials.map((t, i) => /*#__PURE__*/React.createElement(Testimonial, {
    key: i,
    quote: t.quote,
    name: t.name,
    role: t.role,
    avatar: t.avatar
  })))), /*#__PURE__*/React.createElement(window.Section, {
    bg: "white",
    pad: "secondary"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Preguntas frecuentes"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "820px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, WB.faqs.map((f, i) => /*#__PURE__*/React.createElement(Accordion, {
    key: i,
    question: f.q,
    defaultOpen: i === 0
  }, f.a)))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--fz-purple)",
      color: "var(--fz-white)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fz-container",
    style: {
      paddingBlock: "80px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "24px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "fz-section-label",
    style: {
      color: "var(--fz-lilac)"
    }
  }, "Plazas limitadas"), /*#__PURE__*/React.createElement("h2", {
    className: "fz-h2",
    style: {
      color: "var(--fz-white)",
      maxWidth: "720px"
    }
  }, "Reserva tu plaza antes de que se agoten"), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "440px",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(Countdown, null)), /*#__PURE__*/React.createElement(Button, {
    variant: "second",
    onClick: goToForm,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    })
  }, "Reserva tu plaza gratis"))), /*#__PURE__*/React.createElement(window.SiteFooter, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      bottom: 0,
      background: "var(--fz-black)",
      color: "var(--fz-white)",
      zIndex: 40,
      borderTop: "1px solid var(--fz-white-10)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fz-container",
    style: {
      paddingBlock: "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "18px",
      fontWeight: "var(--fw-medium)"
    }
  }, "Webinar gratuito \xB7 ", dateLabel), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "16px",
      color: "var(--fz-white-70)",
      fontVariantNumeric: "tabular-nums"
    }
  }, "Empieza en ", String(cd.d), "d ", String(cd.h).padStart(2, "0"), ":", String(cd.m).padStart(2, "0"), ":", String(cd.s).padStart(2, "0"))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: goToForm
  }, "Reserva tu plaza gratis"))));
}
window.Webinar = Webinar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Webinar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/baker-data.js
try { (() => {
/* Contenido de la LP "Baker clon" (Máster MAIC) — copy real de go.founderz.com/maic-mql. */
window.BAKER = function () {
  const u = (id, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=72&auto=format&fit=crop`;
  return {
    photo: u,
    hero: {
      ratingPre: "4.8 en Trustpilot · 5.000+ reseñas",
      microsoft: "Certificado por Microsoft",
      title: "Domina la IA que está transformando el sector de los publicistas.",
      meta: "Máster Online · 3-4 meses",
      reelLabel: "30 segundos. Mira lo que vas a poder crear.",
      bulletsTitle: "Lo que vas a descubrir:",
      bullets: ["Temario completo: 6 módulos, de imagen a vídeo, audio y 3D", "Especialización para tu sector: publicidad, cine, moda, arquitectura, ilustración…", "Precios exactos, financiación al 0% y opciones Fundae", "Casos reales: qué crean los alumnos después del máster"],
      formLabel: "Descubre el temario completo",
      formTitle: "Descarga el dossier",
      formSub: "Todo lo que necesitas para decidir, gratis y sin compromiso.",
      formNote: "Sin compromiso · Recíbelo al instante · Sin spam",
      cta: "Descargar dossier"
    },
    trust: {
      title: "Confían en nosotros",
      logos: ["BBVA", "EY", "Atlético de Madrid", "Mapfre", "Prosegur"]
    },
    quotes: {
      title: "¿Te suena?",
      items: [{
        text: "Llevo 20 años en esto. Y de repente, un júnior con Midjourney entrega en 2 horas lo que a mí me costaba una semana.",
        after: "3 meses después, lidera proyectos con IA en su estudio.",
        img: "1531123897727-8f129e1688ce"
      }, {
        text: "Mis clientes ya piden piezas generadas con IA y yo sigo haciendo todo a mano. Me da miedo que elijan a alguien más rápido y más barato.",
        after: "3 meses después, integra IA en su proceso creativo y entrega el doble de proyectos.",
        img: "1544717305-2782549b5136"
      }, {
        text: "Ya uso Midjourney y Runway a diario. Lo que encuentro online es siempre nivel principiante. Necesito profundidad real.",
        after: "3 meses después, workflows de producción profesional + el marco legal que nadie más enseña.",
        img: "1507003211169-0a1dd7228f2d"
      }]
    },
    showcase: {
      label: "Creado por alumnos del master",
      title: "Empezaron exactamente donde estás tú. Mira lo que crean hoy.",
      cta: "Quiero aprender a crear así",
      items: [{
        title: "Mother Dough — Teaser surrealista",
        sub: "Creado por alumno con Runway + Midjourney",
        video: true,
        img: "1536440136628-849c177e76a1"
      }, {
        title: "Desert Mystery — Cortometraje experimental",
        sub: "Creado por alumno con Sora + Kling",
        video: true,
        img: "1469474968028-56623f02e42e"
      }, {
        title: "Leona 3D estilizada",
        sub: "Midjourney + Magnific",
        img: "1557800636-894a64c1696f"
      }, {
        title: "Fotografía de producto",
        sub: "Perfume de lujo con IA",
        img: "1592945403244-b3fbafd7f539"
      }, {
        title: "Render arquitectónico",
        sub: "Villa moderna con IA",
        img: "1600585154340-be6161a56a0c"
      }]
    },
    program: {
      label: "El programa",
      title: "Imagen, vídeo, audio, motion, 3D. Con criterio profesional.",
      sub: "Aprende a usar las herramientas de IA que ya están transformando cada sector creativo. Sin base técnica necesaria.",
      stats: [{
        value: "9",
        label: "módulos"
      }, {
        value: "+20",
        label: "profesores en activo"
      }, {
        value: "5-15 min",
        label: "por clase"
      }, {
        value: "Microsoft",
        label: "certificación incluida"
      }],
      specTitle: "Elige tu especialización y aprende con casos de tu profesión",
      specs: [{
        name: "Ilustración",
        icon: "wand"
      }, {
        name: "Diseño Gráfico",
        icon: "sparkles"
      }, {
        name: "Comunicación y RRSS",
        icon: "users"
      }, {
        name: "Cine y Audiovisual",
        icon: "play"
      }, {
        name: "Moda",
        icon: "star"
      }, {
        name: "Fotografía",
        icon: "cpu"
      }, {
        name: "Publicidad",
        icon: "globe"
      }, {
        name: "Arquitectura",
        icon: "briefcase"
      }],
      includes: ["Certificación dual: Founderz + Microsoft", "12 meses de acceso y actualizaciones", "Masterclasses en directo con expertos", "Biblioteca de prompts creativos", "GPTs personalizados para imagen y vídeo", "Módulo legal especializado"],
      learnTitle: "¿Qué aprenderás?",
      learn: ["Prompting avanzado", "Generación de imagen", "Generación de vídeo", "Edición de imagen", "Edición de vídeo", "Música con IA", "Voz sintética", "GPTs personalizados", "Workflows creativos", "Automatización", "Marca personal", "Portfolios", "Marco jurídico", "Avatares digitales"],
      toolsTitle: "Herramientas que dominarás",
      tools: ["Midjourney", "Adobe Firefly", "Runway", "Kling", "ElevenLabs", "HeyGen", "Recraft", "DaVinci Resolve", "Freepik AI", "Flora", "Weavy"]
    },
    syllabus: {
      title: "Temario completo",
      modules: [{
        n: "1",
        title: "Transformación del proceso creativo",
        lessons: ["Método y criterio profesional para trabajar con IA", "Pensar antes de producir: la IA como colaborador estratégico", "Errores más comunes al integrar IA en el proceso creativo", "Casos reales de transformación en estudios y agencias"],
        teachers: ["Fabiana Aguilar", "Anna Cejudo"]
      }, {
        n: "2",
        title: "Preproducción y control creativo",
        lessons: ["Prompting diferenciado para texto, imagen y vídeo", "Creación de asistentes y GPTs personalizados", "Criterio visual antes de generar: moodboards y referencias con IA", "Comunicación profesional con modelos generativos"],
        teachers: ["Paco Chavinet", "Javier de la Chica"]
      }, {
        n: "3",
        title: "Producción y postproducción de imagen con IA",
        lessons: ["Generación de imágenes profesionales con las mejores herramientas", "Técnicas avanzadas de edición: inpainting, outpainting, upscaling", "Optimización de flujo de trabajo y créditos", "Vectorización y preparación para uso comercial"],
        teachers: ["Jaime Sanjuan", "Joss López", "Koldo Huici"]
      }, {
        n: "4",
        title: "Producción y postproducción de vídeo con IA",
        tag: "Nuevo",
        lessons: ["Generación de vídeos profesionales con herramientas punteras", "Organización de proyectos creativos complejos", "Edición avanzada y postproducción con IA", "Técnicas de mejora y transformación de vídeo"],
        teachers: ["Hilario Abad", "Nekodificador", "Eduard Puig"]
      }, {
        n: "5",
        title: "Diseño de voz, sonido y música con IA",
        tag: "Nuevo",
        lessons: ["Generación de voces profesionales y clonación de voz", "Creación de bandas sonoras y música original con IA", "Acabado sonoro profesional para proyectos creativos", "Herramientas de audio: ElevenLabs, Suno y más"],
        teachers: ["Alby Ojeda"]
      }, {
        n: "6",
        title: "Construcción de flujos de trabajo creativos",
        tag: "Nuevo",
        lessons: ["De herramientas sueltas a sistemas de producción escalables", "Diseño de workflows visuales con IA", "Automatización de procesos repetitivos", "Creación de herramientas creativas propias sin programar"],
        teachers: ["Alex Caracuel", "Ramón Iborra"]
      }],
      lockedTitle: "3 módulos más te esperan",
      lockedSub: "Descarga el dossier para ver el temario completo.",
      lockedCta: "Desbloquear temario completo",
      lockedNote: "Sin coste · Acceso inmediato"
    },
    method: {
      label: "Así se aprende",
      title: "Clases cortas. Herramientas reales. Resultados inmediatos.",
      videoTitle: "Generación de vídeo con IA",
      videoSub: "Tutorial paso a paso",
      intro: "Nada de vídeos de una hora que abandonas a los 10 minutos. Aquí cada clase dura 5-15 minutos, va directa al grano y te deja con algo que puedes aplicar hoy.",
      items: [{
        icon: "clock",
        title: "Microclases de 5-15 min",
        text: "Un concepto, una herramienta, un resultado. Sin relleno. Diseñadas para que aprendas en ratos sueltos, no en maratones."
      }, {
        icon: "rocket",
        title: "Contenido que no caduca en 2 semanas",
        text: "Las herramientas de IA cambian cada semana. El temario se actualiza constantemente para que lo que aprendes hoy siga siendo útil mañana."
      }, {
        icon: "calendar",
        title: "Masterclasses quincenales en directo",
        text: "Sesiones live con profesionales que están aplicando IA en agencias, productoras y estudios reales. Preguntas en directo, casos del momento."
      }, {
        icon: "users",
        title: "+20 profesores en activo, no teóricos",
        text: "Directores de arte, cineastas, diseñadores, juristas. Gente que usa IA todos los días en proyectos reales — no académicos que leen papers."
      }, {
        icon: "globe",
        title: "100% online, a tu ritmo",
        text: "Sin horarios fijos. Desde cualquier sitio. 1-2 horas al día cuando tú quieras. Compatible con tu trabajo."
      }]
    },
    testimonials: {
      ratingPre: "4.8 en Trustpilot",
      title: "Más de 5.000 alumnos verificados ya lo dicen.",
      featured: {
        text: "La parte del máster que más me ha gustado es la de aplicaciones al mundo del marketing y ventas, donde he podido ver un potencial de optimizar procesos, hacer presentaciones, editar productos o hacer campañas de cualquier tipo.",
        name: "Fredy Civit",
        role: "Head of eCommerce de Nestlé Spain",
        img: "1507003211169-0a1dd7228f2d"
      },
      items: [{
        text: "Me apasiona la fotografía y el diseño y al entrar en este mundo de la IA, observo los increíbles resultados que se pueden lograr luego de aprender a usarla adecuadamente.",
        name: "Fiorella Ortegon",
        role: "Reseña verificada en Trustpilot",
        avatar: "https://i.pravatar.cc/96?img=31"
      }, {
        text: "Me parece un contenido muy ameno y fácil de consumir, en cuanto al formato de vídeos cortos e información de calidad transmitida.",
        name: "Slow — Visual Narratives",
        role: "Reseña verificada en Trustpilot",
        avatar: "https://i.pravatar.cc/96?img=14"
      }, {
        text: "Soy director de arte con 15 años de experiencia. Tenía miedo de que la IA me dejase obsoleto. Ahora es mi herramienta más potente.",
        name: "Juan Hernández",
        role: "Reseña verificada en Trustpilot",
        avatar: "https://i.pravatar.cc/96?img=68"
      }]
    },
    teachers: {
      label: "Equipo docente",
      title: "Quién te va a enseñar",
      sub: "Profesionales en activo aplicando IA en estudios, agencias y productoras. Más expertos de Microsoft que llevan años en el frente.",
      cta: "Quiero aprender con ellos",
      items: [{
        name: "Fabiana Aguilar",
        role: "Directora del programa",
        company: "Founderz",
        img: 47
      }, {
        name: "Hilario Abad",
        role: "Cineasta especializado en IA",
        company: "Hilario Abad",
        img: 12
      }, {
        name: "Nekodificador",
        role: "Creativo audiovisual y Creador de Contenido",
        company: "",
        img: 33
      }, {
        name: "Magda Teruel",
        role: "Copilot Partner Solutions Architect",
        company: "Microsoft",
        img: 45
      }, {
        name: "Javier de la Chica",
        role: "Director Creativo",
        company: "Contanimation",
        img: 51
      }, {
        name: "Anna Cejudo",
        role: "Cofundadora & Co-CEO",
        company: "Founderz",
        img: 26
      }, {
        name: "Jaime Sanjuan",
        role: "Director de Arte Digital e Instructor",
        company: "",
        img: 60
      }, {
        name: "Paco Chavinet",
        role: "Artista visual y Director Creativo",
        company: "Milkshakes",
        img: 13
      }, {
        name: "Alex Caracuel",
        role: "Project Manager | Creative AI & Media",
        company: "Wimeik AI Studio",
        img: 15
      }, {
        name: "Pau Garcia-Milà",
        role: "Cofundador & Co-CEO",
        company: "Founderz",
        img: 8
      }, {
        name: "Ramón Iborra",
        role: "CEO",
        company: "Artilabs",
        img: 52
      }, {
        name: "María Montes",
        role: "Jurista tecnológica",
        company: "",
        img: 24
      }]
    },
    awards: {
      label: "Reconocimientos",
      logos: ["Forbes", "ASU+GSV", "GESAwards", "EdTech Digest", "EdTech", "Excellence", "Global Innovation"]
    },
    faqs: {
      title: "Todo lo que necesitas saber.",
      items: [{
        q: "¿Cuánto cuesta el Máster?",
        a: "Descarga el dossier gratuito y recibirás los precios exactos, las opciones de financiación al 0% y las ayudas Fundae disponibles."
      }, {
        q: "¿Necesito saber programar?",
        a: "No. El máster está diseñado para perfiles creativos sin base técnica: partimos de cero y avanzamos paso a paso."
      }, {
        q: "¿Qué certificación recibiré?",
        a: "Una certificación dual Founderz + Microsoft al completar el programa."
      }, {
        q: "¿Cuánto tiempo necesito al día?",
        a: "Con 1-2 horas al día es suficiente. Las clases duran 5-15 minutos y el ritmo lo marcas tú."
      }, {
        q: "¿Y si no me convence?",
        a: "Tienes una garantía de 15 días sin preguntas: si no es para ti, te devolvemos el importe."
      }, {
        q: "¿Qué herramientas aprendo?",
        a: "Midjourney, Adobe Firefly, Runway, Kling, ElevenLabs, HeyGen, Recraft, DaVinci Resolve, Freepik AI y más."
      }]
    },
    finalCta: {
      label: "Sin compromiso",
      title: "Descubre el programa completo y habla con un asesor hoy.",
      sub: "Temario completo, las 7 especializaciones, metodología, precios y casos reales de alumnos creativos.",
      checks: ["Sin presión: te informamos, decides tú", "Certificación Founderz + Microsoft incluida", "Garantía de 15 días sin preguntas"],
      formTitle: "Descarga el dossier gratuito",
      formSub: "Rellena el formulario y recíbelo al instante.",
      cta: "Descargar dossier",
      note: "Sin compromiso · Recíbelo al instante · Sin spam"
    }
  };
}();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/baker-data.js", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
/* Shared content for the Founderz website UI kit (fake but realistic, ES copy). */
window.FZ = function () {
  const u = (id, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=72&auto=format&fit=crop`;
  return {
    photo: u,
    img: {
      heroHome: u("1522071820081-009f0129c71c", 1400),
      heroProgram: u("1600880292203-757bb62b4baf", 1400),
      heroEmpresas: u("1497366754035-f200968a6e72", 1400),
      meeting: u("1556761175-5973dc0f32e7"),
      class: u("1543269865-cbf427effbad"),
      laptop: u("1517245386807-bb43f82c33c4"),
      woman: u("1573496359142-b8d87734a5a2"),
      data: u("1551288049-bebda4e38f71"),
      creative: u("1499750310107-5fef28a66643")
    },
    avatars: {
      anna: "https://i.pravatar.cc/120?img=47",
      pau: "https://i.pravatar.cc/120?img=12",
      marc: "https://i.pravatar.cc/120?img=33",
      lucia: "https://i.pravatar.cc/120?img=45"
    },
    partners: ["IESE", "Microsoft", "BBVA", "Telefónica", "Santander", "Repsol", "Inditex", "Mapfre"],
    programs: [{
      type: "Máster",
      duration: "12 semanas",
      title: "IA e Innovación 2026",
      categories: ["IA", "Estrategia"],
      desc: "Lidera la transformación con IA en tu organización: de la teoría a proyectos reales.",
      price: "2.400 €",
      priceOld: "3.000 €"
    }, {
      type: "Curso",
      duration: "8 semanas",
      title: "IA generativa para Creativos",
      categories: ["IA", "Creatividad"],
      desc: "Domina las herramientas generativas para diseño, contenido y producto.",
      price: "1.200 €",
      priceOld: "1.600 €"
    }, {
      type: "Curso",
      duration: "6 semanas",
      title: "Productividad con Copilot",
      categories: ["IA", "Productividad"],
      desc: "Multiplica tu eficiencia con Microsoft Copilot en el día a día.",
      price: "900 €",
      priceOld: "1.200 €"
    }],
    features: [{
      icon: "wand",
      title: "Aprendizaje práctico",
      text: "Proyectos reales desde la primera semana, no solo teoría."
    }, {
      icon: "users",
      title: "Expertos del sector",
      text: "Aprende de profesionales que aplican IA en grandes empresas."
    }, {
      icon: "cpu",
      title: "Herramientas punteras",
      text: "Trabaja con las últimas herramientas de IA generativa."
    }, {
      icon: "calendar",
      title: "Clases en directo",
      text: "Sesiones en vivo con acceso a todas las grabaciones."
    }, {
      icon: "award",
      title: "Certificación oficial",
      text: "Avalada por Microsoft y reconocida en el sector."
    }, {
      icon: "globe",
      title: "Comunidad global",
      text: "Forma parte de una red de +250.000 profesionales."
    }],
    stats: [{
      value: "+250K",
      label: "Alumnos formados en IA y negocio",
      surface: "purple"
    }, {
      value: "+50",
      label: "Expertos y profesores en activo",
      surface: "lilac"
    }, {
      value: "4,8/5",
      label: "Valoración media de los programas",
      surface: "grey"
    }, {
      value: "+1.400",
      label: "Empresas que confían en Founderz",
      surface: "white"
    }],
    testimonials: [{
      quote: "El mejor programa de IA aplicada que he hecho. Práctico desde el primer día y con un nivel altísimo.",
      name: "Pau Ramírez",
      role: "Product Lead, Glovo",
      avatar: "https://i.pravatar.cc/120?img=12"
    }, {
      quote: "Pasé de no usar IA a integrarla en todos mis procesos. El cambio ha sido brutal.",
      name: "Anna Pérez",
      role: "Marketing Director, Cabify",
      avatar: "https://i.pravatar.cc/120?img=47"
    }, {
      quote: "Founderz me dio las herramientas y la confianza para liderar la estrategia de IA de mi equipo.",
      name: "Marc Soler",
      role: "CTO, Factorial",
      avatar: "https://i.pravatar.cc/120?img=33"
    }],
    faqs: [{
      q: "¿Necesito conocimientos previos?",
      a: "No. Los programas parten de cero y avanzan progresivamente hasta un nivel avanzado."
    }, {
      q: "¿Las clases son en directo?",
      a: "Sí, las sesiones son en directo y tendrás acceso a todas las grabaciones cuando quieras."
    }, {
      q: "¿Obtengo una certificación?",
      a: "Sí, al completar el programa recibes una certificación oficial avalada por Microsoft."
    }, {
      q: "¿Puedo financiar el programa?",
      a: "Ofrecemos financiación sin intereses a través de Aplazame y BBVA, y opciones bonificables por Fundae para empresas."
    }],
    posts: [{
      category: "Blog",
      title: "Cómo aplicar IA generativa en tu equipo este 2026",
      img: "1499750310107-5fef28a66643"
    }, {
      category: "Guía",
      title: "10 herramientas de IA que todo profesional debería conocer",
      img: "1551288049-bebda4e38f71"
    }, {
      category: "Caso",
      title: "Así integró Telefónica la IA en su área de personas",
      img: "1573496359142-b8d87734a5a2"
    }],
    events: [{
      day: "26",
      month: "Jun",
      label: "Webinar",
      title: "IA generativa aplicada a finanzas",
      speaker: "Con Anna Pérez · Cabify"
    }, {
      day: "03",
      month: "Jul",
      label: "Masterclass",
      title: "Liderazgo en la era de la IA",
      speaker: "Con Marc Soler · Factorial"
    }]
  };
}();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

// webinar-ia-lp/lp.js
try { (() => {
/* ============================================================
   MAII LP — comportamiento (vanilla)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Countdown ---------- */
  // Objetivo: fin de la cohorte. Si ya pasó, reinicia a +7 días para que
  // el contador siempre muestre urgencia activa en la demo.
  function getTarget() {
    var stored = window.__MAII_DEADLINE;
    var t = stored ? new Date(stored).getTime() : new Date("2026-06-30T23:59:59").getTime();
    var now = Date.now();
    if (t <= now) t = now + 6 * 864e5 + 8 * 36e5 + 28 * 6e4; // ~6d 8h 28m
    return t;
  }
  var TARGET = getTarget();
  function pad(n) {
    return String(n).padStart(2, "0");
  }
  function tick() {
    var diff = Math.max(0, TARGET - Date.now());
    var s = Math.floor(diff / 1000);
    var d = Math.floor(s / 86400);
    s -= d * 86400;
    var h = Math.floor(s / 3600);
    s -= h * 3600;
    var m = Math.floor(s / 60);
    s -= m * 60;
    var parts = {
      d: d,
      h: h,
      m: m,
      s: s
    };

    // Cajas de dígitos
    document.querySelectorAll("[data-cd]").forEach(function (el) {
      var k = el.getAttribute("data-cd");
      if (parts[k] != null) el.textContent = pad(parts[k]);
    });
    // Texto compacto dd:hh:mm:ss
    document.querySelectorAll("[data-cd-compact]").forEach(function (el) {
      el.textContent = pad(d) + ":" + pad(h) + ":" + pad(m) + ":" + pad(s);
    });
  }
  tick();
  setInterval(tick, 1000);
  window.__maiiRetarget = function (iso) {
    window.__MAII_DEADLINE = iso;
    TARGET = getTarget();
    tick();
  };

  /* ---------- Acordeones (FAQ + temario) ---------- */
  document.addEventListener("click", function (e) {
    var q = e.target.closest(".acc__q");
    if (!q) return;
    var item = q.closest(".acc__item");
    var group = item.closest(".acc");
    var isOpen = item.getAttribute("data-open") === "true";
    if (group && group.hasAttribute("data-single")) {
      group.querySelectorAll(".acc__item").forEach(function (it) {
        it.setAttribute("data-open", "false");
      });
    }
    item.setAttribute("data-open", isOpen ? "false" : "true");
  });

  /* ---------- Carrusel faculty ---------- */
  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    var track = root.querySelector(".carousel__track");
    var step = 282;
    root.querySelectorAll("[data-car-prev]").forEach(function (b) {
      b.addEventListener("click", function () {
        track.scrollBy({
          left: -step * 2,
          behavior: "smooth"
        });
      });
    });
    root.querySelectorAll("[data-car-next]").forEach(function (b) {
      b.addEventListener("click", function () {
        track.scrollBy({
          left: step * 2,
          behavior: "smooth"
        });
      });
    });
  });

  /* ---------- CTA sticky inferior ---------- */
  var sticky = document.querySelector(".sticky-cta");
  var hero = document.querySelector(".hero");
  if (sticky && hero) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        sticky.classList.toggle("is-visible", !en.isIntersecting);
      });
    }, {
      rootMargin: "0px 0px -85% 0px"
    });
    io.observe(hero);
  }

  /* ---------- Formulario de captación (objetivo) ---------- */
  document.querySelectorAll("[data-lead-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (field) {
        var valid = field.value && field.value.trim() !== "" && (field.type !== "email" || /.+@.+\..+/.test(field.value));
        field.classList.toggle("is-invalid", !valid);
        if (!valid && ok) {
          field.focus();
          ok = false;
        }
      });
      if (!ok) return;
      var card = form.closest(".form-card") || form.parentNode;
      var done = card.querySelector(".lead-done");
      var emailVal = (form.querySelector('[name="email"]') || {}).value || "";
      var emailOut = card.querySelector("[data-done-email]");
      if (emailOut && emailVal) emailOut.textContent = emailVal;
      card.classList.add("is-sent");
      if (done) done.removeAttribute("hidden");

      // Marca conversión para todas las copias del formulario (demo)
      window.__maiiLead = {
        ok: true,
        email: emailVal
      };
    });

    // Limpia el estado de error al escribir
    form.addEventListener("input", function (e) {
      if (e.target.classList) e.target.classList.remove("is-invalid");
    });
  });

  /* ---------- CTAs que llevan al formulario ---------- */
  document.querySelectorAll("[data-goform]").forEach(function (a) {
    a.addEventListener("click", function () {
      // Enfoca el primer campo visible del formulario tras el scroll
      setTimeout(function () {
        var target = document.querySelector("#form .lead-form:not([hidden]) .lf-input");
        if (target) try {
          target.focus({
            preventScroll: true
          });
        } catch (err) {
          target.focus();
        }
      }, 520);
    });
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "webinar-ia-lp/lp.js", error: String((e && e.message) || e) }); }

// webinar-ia-lp/tweaks-app.jsx
try { (() => {
/* Webinar IA LP — panel de Tweaks: ajustes de conversión. */
const {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRadio,
  TweakToggle,
  TweakColor
} = window;
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroBg": "Oscuro",
  "offerbar": true,
  "countdown": true,
  "seatbar": true,
  "accent": "#5045c8"
} /*EDITMODE-END*/;
const BG_MAP = {
  "Oscuro": "dark",
  "Lila": "lilac"
};
function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => {
    const root = document.documentElement;
    root.dataset.herobg = BG_MAP[t.heroBg] || "dark";
    root.dataset.countdown = t.countdown ? "on" : "off";
    root.style.setProperty("--lp-urgency", t.accent || "#5045c8");
    const bar = document.querySelector(".offerbar");
    if (bar) bar.style.display = t.offerbar ? "" : "none";
    document.querySelectorAll("[data-seatbar]").forEach(s => {
      s.style.display = t.seatbar ? "" : "none";
    });
  }, [t.heroBg, t.countdown, t.offerbar, t.seatbar, t.accent]);
  return /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Hero"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Fondo",
    value: t.heroBg,
    options: ["Oscuro", "Lila"],
    onChange: v => setTweak("heroBg", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Conversi\xF3n"
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Barra superior",
    value: t.offerbar,
    onChange: v => setTweak("offerbar", v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Cuenta atr\xE1s",
    value: t.countdown,
    onChange: v => setTweak("countdown", v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Barra de plazas",
    value: t.seatbar,
    onChange: v => setTweak("seatbar", v)
  }), /*#__PURE__*/React.createElement(TweakColor, {
    label: "Color de acento",
    value: t.accent,
    options: ["#5045c8", "#2f2976", "#1a191d"],
    onChange: v => setTweak("accent", v)
  }));
}
const mount = document.createElement("div");
document.body.appendChild(mount);
ReactDOM.createRoot(mount).render(/*#__PURE__*/React.createElement(TweaksApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "webinar-ia-lp/tweaks-app.jsx", error: String((e && e.message) || e) }); }

// webinar-ia-lp/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "webinar-ia-lp/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// webinar-ia-lp/webinar.js
try { (() => {
/* ============================================================
   Webinar IA — comportamiento específico
   (se carga después de lp.js, que ya gestiona countdown,
   acordeones, carrusel, sticky CTA y formularios de lead)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Countdown apuntando a la fecha del webinar ---------- */
  // Jue 26 jun, 18:00h. Si ya pasó, lp.js lo reinicia a +unos días.
  if (typeof window.__maiiRetarget === "function") {
    window.__maiiRetarget("2026-06-26T18:00:00");
  }

  /* ---------- Barra de plazas (urgencia social) ---------- */
  // Anima la barra al 79% (≈105 plazas libres de 500) al entrar en viewport.
  var TOTAL = 500;
  var TAKEN = 395; // plazas ocupadas → 105 libres
  var left = TOTAL - TAKEN;
  function fillSeat(bar) {
    var fill = bar.querySelector("[data-seat-fill]");
    var lbl = bar.querySelector("[data-seat-left]");
    if (lbl) lbl.textContent = left;
    if (fill) requestAnimationFrame(function () {
      fill.style.width = Math.round(TAKEN / TOTAL * 100) + "%";
    });
  }
  var bars = document.querySelectorAll("[data-seatbar]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          fillSeat(en.target);
          obs.unobserve(en.target);
        }
      });
    }, {
      threshold: 0.4
    });
    bars.forEach(function (b) {
      io.observe(b);
    });
  } else {
    bars.forEach(fillSeat);
  }

  /* ---------- Enfocar el formulario tras pulsar un CTA ---------- */
  document.querySelectorAll("[data-goform]").forEach(function (a) {
    a.addEventListener("click", function () {
      setTimeout(function () {
        var t = document.querySelector("#reservar .lead-form:not([hidden]) .lf-input");
        if (t) try {
          t.focus({
            preventScroll: true
          });
        } catch (e) {
          t.focus();
        }
      }, 540);
    });
  });

  /* ---------- Añadir al calendario (.ics) tras registrarse ---------- */
  function icsHref() {
    var dt = "20260626T160000Z"; // 18:00 CET = 16:00 UTC
    var end = "20260626T170000Z";
    var lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Founderz//Webinar//ES", "BEGIN:VEVENT", "UID:webinar-ia-oficina@founderz.com", "DTSTAMP:" + dt, "DTSTART:" + dt, "DTEND:" + end, "SUMMARY:Webinar gratis · IA en la oficina (Founderz)", "DESCRIPTION:Te enviaremos el enlace de acceso por email.", "END:VEVENT", "END:VCALENDAR"];
    return "data:text/calendar;charset=utf-8," + encodeURIComponent(lines.join("\r\n"));
  }
  document.querySelectorAll(".wb-cal").forEach(function (a) {
    a.setAttribute("href", icsHref());
    a.setAttribute("download", "webinar-ia-founderz.ics");
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "webinar-ia-lp/webinar.js", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.EventCard = __ds_scope.EventCard;

__ds_ns.FeatureCard = __ds_scope.FeatureCard;

__ds_ns.PostCard = __ds_scope.PostCard;

__ds_ns.ProgramCard = __ds_scope.ProgramCard;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Testimonial = __ds_scope.Testimonial;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.LinkArrow = __ds_scope.LinkArrow;

__ds_ns.Pill = __ds_scope.Pill;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Header = __ds_scope.Header;

__ds_ns.Banner = __ds_scope.Banner;

__ds_ns.BannerCTA = __ds_scope.BannerCTA;

__ds_ns.LogoMarquee = __ds_scope.LogoMarquee;

})();
