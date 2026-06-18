/* Founderz Pricing page. */
function Pricing() {
  const D = window.FZ;
  const { Button, Pill, SectionHeading, Icon, Accordion, BannerCTA } = window.FounderzDesignSystem_47078d;
  const [openFin, setOpenFin] = React.useState(0);

  const masters = [
    ["IA e Innovación 2026", "Máster", "2.400 €", "12x sin intereses", "Microsoft", "12 sem.", "Online en directo"],
    ["IA generativa para Creativos", "Máster", "2.200 €", "12x sin intereses", "Microsoft", "10 sem.", "Online en directo"],
    ["Dirección Estratégica de la IA", "Máster", "2.800 €", "12x sin intereses", "Microsoft", "14 sem.", "Online en directo"],
  ];
  const courses = [
    ["Productividad con Copilot", "Curso", "900 €", "6x sin intereses", "6 sem."],
    ["IA en Finanzas", "Curso", "1.200 €", "6x sin intereses", "8 sem."],
    ["Alfabetización en IA", "Curso", "600 €", "3x sin intereses", "4 sem."],
  ];

  const th = { textAlign: "left", padding: "16px 20px", fontSize: "16px", fontWeight: "var(--fw-semibold)" };
  const td = { padding: "18px 20px", fontSize: "16px", borderTop: "1px solid var(--fz-border)" };

  return (
    <div>
      <window.SiteHeader />

      {/* HERO simple */}
      <window.Section bg="white" pad="hero" style={{ paddingBottom: "40px" }}>
        <div style={{ maxWidth: "760px" }}>
          <Pill uppercase>Precios</Pill>
          <h1 className="fz-h1" style={{ marginTop: "20px" }}>Invierte en tu futuro con la IA</h1>
          <p className="fz-body fz-muted" style={{ marginTop: "20px" }}>
            Programas con financiación sin intereses y opciones bonificables para empresas. Sin sorpresas.
          </p>
        </div>
      </window.Section>

      {/* MASTERS TABLE */}
      <window.Section bg="white" pad="secondary">
        <SectionHeading align="left" label="Másters" title="Programas largos y certificados" />
        <div style={{ border: "1px solid var(--fz-border)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ background: "var(--fz-grey)" }}>
              {["Programa", "Tipo", "Precio", "Financiación", "Certificación", "Duración", "Modalidad"].map((h) => <th key={h} style={th}>{h}</th>)}
            </tr></thead>
            <tbody>
              {masters.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j} style={{ ...td, fontWeight: j === 0 ? "var(--fw-medium)" : "var(--fw-regular)", color: j === 2 ? "var(--fz-purple)" : "var(--text-primary)" }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </window.Section>

      {/* COURSES TABLE (purple header) */}
      <window.Section bg="white" pad="secondary" style={{ paddingTop: 0 }}>
        <SectionHeading align="left" label="Cursos especializados" title="Formaciones cortas y prácticas" />
        <div style={{ border: "1px solid var(--fz-border)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ background: "var(--fz-purple)", color: "var(--fz-white)" }}>
              {["Programa", "Tipo", "Precio", "Financiación", "Duración"].map((h) => <th key={h} style={th}>{h}</th>)}
            </tr></thead>
            <tbody>
              {courses.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j} style={{ ...td, fontWeight: j === 0 ? "var(--fw-medium)" : "var(--fw-regular)", color: j === 2 ? "var(--fz-purple)" : "var(--text-primary)" }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </window.Section>

      {/* WHAT'S INCLUDED */}
      <window.Section bg="grey">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "center" }}>
          <div>
            <SectionHeading align="left" label="Qué incluye" title="Todo lo que necesitas para aprender de verdad" />
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {["Clases en directo + grabaciones", "Proyecto final con feedback de expertos", "Certificación oficial Microsoft", "Acceso a la comunidad de +250K profesionales", "Materiales y plantillas descargables"].map((t) => (
                <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: "12px", fontSize: "18px" }}>
                  <Icon name="check" size={20} style={{ color: "var(--fz-purple)" }} />{t}
                </span>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: "var(--radius-card)", overflow: "hidden", aspectRatio: "4/3" }}>
            <img src={D.img.class} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </window.Section>

      {/* FINANCING */}
      <window.Section bg="lilac" pad="secondary">
        <SectionHeading title="Preguntas frecuentes sobre el precio" />
        <div style={{ maxWidth: "820px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            { q: "¿Puedo pagar a plazos?", a: "Sí, ofrecemos financiación de hasta 12 meses sin intereses con Aplazame y BBVA." },
            { q: "¿El precio incluye la certificación?", a: "Sí, todos los programas incluyen la certificación oficial sin coste adicional." },
            { q: "¿Hay descuentos para empresas?", a: "Sí, contamos con tarifas especiales y formación bonificable por Fundae." },
          ].map((f, i) => (
            <Accordion key={i} question={f.q} open={openFin === i} onToggle={(n) => setOpenFin(n ? i : -1)}>{f.a}</Accordion>
          ))}
        </div>
      </window.Section>

      <BannerCTA title="Empieza hoy, paga cómodamente" description="Financiación sin intereses disponible en todos los programas." primary="Ver programas" secondary="Hablar con asesor" />
      <window.SiteFooter />

      {/* STICKY BAR */}
      <div style={{ position: "sticky", bottom: 0, background: "var(--fz-purple)", color: "var(--fz-white)", zIndex: 40 }}>
        <div className="fz-container" style={{ paddingBlock: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
            <span style={{ fontSize: "28px", fontWeight: "var(--fw-semibold)" }}>2.400 €</span>
            <span style={{ fontSize: "18px", color: "var(--fz-white-60)", textDecoration: "line-through" }}>3.000 €</span>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <Button variant="second">Inscríbete hoy</Button>
            <Button variant="second-outlined">Solicita información</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Pricing = Pricing;
