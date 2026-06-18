/* Shared layout helpers for the Founderz website UI kit. */
const { Header, Footer } = window.FounderzDesignSystem_47078d;

/** Full-bleed section with a background variant + standard container. */
function Section({ bg = "white", pad = "standard", children, style = {}, containerStyle = {} }) {
  const padMap = {
    hero: "var(--section-pad-hero)",
    standard: "var(--section-pad-standard)",
    secondary: "var(--section-pad-secondary)",
    compact: "var(--section-pad-compact)",
  };
  const bgMap = {
    white: { background: "var(--fz-white)", color: "var(--text-primary)" },
    grey: { background: "var(--fz-grey)", color: "var(--text-primary)" },
    lilac: { background: "var(--fz-lilac)", color: "var(--text-primary)" },
    dark: { background: "var(--fz-black)", color: "var(--fz-white)" },
    purple: { background: "var(--fz-purple)", color: "var(--fz-white)" },
  };
  return (
    <section style={{ ...bgMap[bg], paddingBlock: padMap[pad], ...style }}>
      <div className="container" style={containerStyle}>{children}</div>
    </section>
  );
}

/** The shared site header used at the top of every screen. */
function SiteHeader(props) {
  return (
    <div style={{ paddingTop: "16px", background: "var(--fz-white)" }}>
      <div className="fz-container">
        <Header {...props} />
      </div>
    </div>
  );
}

function SiteFooter() {
  return <Footer />;
}

/** Transparent header for placing over a dark hero. */
function SiteHeaderTransparent(props) {
  return <Header transparent {...props} />;
}

Object.assign(window, { Section, SiteHeader, SiteFooter, SiteHeaderTransparent });
