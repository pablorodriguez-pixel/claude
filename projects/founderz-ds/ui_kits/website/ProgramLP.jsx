/* Founderz program landing page (LP Programa). */
function ProgramLP() {
  const D = window.FZ;
  const {
    Button, Pill, SectionHeading, LinkArrow, Icon, Field,
    FeatureCard, StatCard, Accordion, Testimonial, BannerCTA,
  } = window.FounderzDesignSystem_47078d;
  const [openSyl, setOpenSyl] = React.useState(0);

  const syllabus = [
    { q: "Módulo 1 · Fundamentos de IA", a: "Qué es la IA generativa, cómo funciona y cómo encaja en tu trabajo." },
    { q: "Módulo 2 · Herramientas y prompting", a: "Domina ChatGPT, Copilot y las herramientas clave del mercado." },
    { q: "Módulo 3 · IA aplicada a tu sector", a: "Casos de uso reales y proyectos prácticos adaptados a tu perfil." },
    { q: "Módulo 4 · Estrategia e implementación", a: "Lleva la IA a tu equipo y mide el impacto en tu organización." },
  ];

  return (
    <div>
      {/* DARK HERO with form */}
      <div style={{ position: "relative", background: "var(--fz-black)", color: "var(--fz-white)", overflow: "hidden" }}>
        <img src={D.img.heroProgram} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.28 }} />
        <div style={{ position: "relative" }}>
          <div style={{ paddingTop: "16px" }}>
            <div className="fz-container"><window.SiteHeaderTransparent /></div>
          </div>
          <div className="fz-container" style={{ paddingBlock: "80px", display: "grid", gridTemplateColumns: "1.1fr 460px", gap: "56px", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <span className="fz-section-label" style={{ color: "var(--fz-lilac)" }}>Máster · Edición 2026</span>
              <h1 className="fz-h1 fz-h1--light" style={{ color: "var(--fz-white)", fontSize: "60px" }}>IA e Innovación para profesionales</h1>
              <p className="fz-body" style={{ color: "var(--fz-white-70)", maxWidth: "520px" }}>
                12 semanas para dominar la inteligencia artificial y liderar la transformación de tu organización.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
                {["Clases en directo con expertos", "Proyecto final aplicado a tu empresa", "Certificación oficial Microsoft"].map((t) => (
                  <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "18px" }}>
                    <Icon name="check" size={20} style={{ color: "var(--fz-lilac)" }} />{t}
                  </span>
                ))}
              </div>
            </div>
            {/* Form card */}
            <div style={{ background: "var(--fz-white)", color: "var(--text-primary)", borderRadius: "var(--radius-card)", padding: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "24px", fontWeight: "var(--fw-semibold)" }}>Solicita información</h3>
                <p className="fz-small fz-muted" style={{ marginTop: "6px" }}>Te llamamos en menos de 24h.</p>
              </div>
              <Field label="Nombre y apellidos" placeholder="Tu nombre" />
              <Field label="Email" placeholder="tucorreo@empresa.com" />
              <Field label="Teléfono" placeholder="+34 600 000 000" />
              <Button variant="primary" style={{ width: "100%" }}>Quiero más información</Button>
              <p className="fz-small fz-muted" style={{ textAlign: "center" }}>o <a href="#" style={{ color: "var(--fz-purple)", fontWeight: 500 }}>descarga el temario</a></p>
            </div>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <window.Section bg="white" pad="secondary">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          <StatCard value="12" label="semanas de formación" surface="lilac" />
          <StatCard value="+40h" label="de contenido en directo" surface="grey" />
          <StatCard value="98%" label="de satisfacción" surface="purple" />
          <StatCard value="+50" label="expertos del sector" surface="white" />
        </div>
      </window.Section>

      {/* SYLLABUS */}
      <window.Section bg="grey">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "56px", alignItems: "start" }}>
          <div style={{ position: "sticky", top: "90px" }}>
            <SectionHeading align="left" label="Temario" title="Un programa pensado para aplicar desde el día uno"
              description="Cada módulo combina teoría, herramientas y un proyecto práctico." />
            <Button variant="primary">Descargar temario completo</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {syllabus.map((s, i) => (
              <Accordion key={i} question={s.q} open={openSyl === i} onToggle={(n) => setOpenSyl(n ? i : -1)}>{s.a}</Accordion>
            ))}
          </div>
        </div>
      </window.Section>

      {/* PROFESSORS (dark) */}
      <window.Section bg="dark">
        <SectionHeading align="left" onDark label="Profesores" title="Aprende de quienes aplican IA cada día" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {D.testimonials.map((t, i) => (
            <div key={i} style={{ background: "var(--fz-white-05)", border: "1px solid var(--fz-white-10)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
              <img src={[D.img.woman, D.img.meeting, D.img.data][i]} alt="" style={{ width: "100%", height: "220px", objectFit: "cover" }} />
              <div style={{ padding: "24px" }}>
                <div style={{ fontSize: "20px", fontWeight: 600 }}>{t.name}</div>
                <div style={{ color: "var(--fz-white-70)", marginTop: "4px" }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </window.Section>

      {/* TESTIMONIALS */}
      <window.Section bg="grey">
        <SectionHeading title="Lo que dicen nuestros alumnos" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {D.testimonials.map((t, i) => <Testimonial key={i} quote={t.quote} name={t.name} role={t.role} avatar={t.avatar} />)}
        </div>
      </window.Section>

      {/* FINANCING (lilac) */}
      <window.Section bg="lilac" pad="secondary">
        <SectionHeading title="Financiación a tu medida" description="Empieza hoy y paga cómodamente, sin intereses." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", maxWidth: "900px", margin: "0 auto" }}>
          <Accordion question="Financiación en hasta 12 meses sin intereses" defaultOpen>A través de Aplazame y BBVA, fracciona el pago sin coste adicional.</Accordion>
          <Accordion question="Bonificable para empresas (Fundae)">Si tu empresa te inscribe, el programa puede ser bonificable a través de Fundae.</Accordion>
        </div>
      </window.Section>

      <BannerCTA title="Reserva tu plaza en la edición 2026" description="Plazas limitadas. Asegura la tuya hoy." primary="Inscríbete ahora" secondary="Solicita información" />
      <window.SiteFooter />
    </div>
  );
}

window.ProgramLP = ProgramLP;
