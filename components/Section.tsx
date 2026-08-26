/** Envoltorio de sección: whitespace de marca + contenedor de 1430px. */
export default function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  tone = "light",
  tight = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  tone?: "light" | "cream" | "lilac" | "dark" | "mindscape";
  tight?: boolean;
}) {
  const toneClass = {
    light: "bg-white",
    cream: "bg-cream",
    lilac: "bg-purple-light",
    dark: "bg-ink text-white",
    mindscape: "fz-mindscape fz-mindscape--gradient",
  }[tone];

  return (
    <section
      id={id}
      className={`${tight ? "fz-section--tight" : "fz-section"} ${toneClass}`}
    >
      <div className="fz-container">
        {eyebrow && (
          <p className={tone === "dark" || tone === "mindscape" ? "fz-eyebrow fz-eyebrow--light" : "fz-eyebrow"}>
            {eyebrow}
          </p>
        )}
        {title && <h2>{title}</h2>}
        {lead && (
          <p className={`fz-lead mt-4 max-w-[65ch] ${tone === "dark" || tone === "mindscape" ? "fz-lead--light" : ""}`}>
            {lead}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
