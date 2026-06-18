/* Founderz Empresas (B2B) landing page. */
function Empresas() {
  const D = window.FZ;
  const {
    Button, Pill, SectionHeading, Icon, Field,
    FeatureCard, Accordion, Testimonial, Banner, BannerCTA,
  } = window.FounderzDesignSystem_47078d;

  return (
    <div>
      {/* DARK HERO with form */}
      <div style={{ position: "relative", background: "var(--fz-black)", color: "var(--fz-white)", overflow: "hidden" }}>
        <img src={D.img.heroEmpresas} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.22 }} />
        <div style={{ position: "relative" }}>
          <div style={{ paddingTop: "16px" }}><div className="fz-container"><window.SiteHeaderTransparent primaryLabel="Solicita una demo" /></div></div>
          <div className="fz-container" style={{ paddingBlock: "80px", display: "grid", gridTemplateColumns: "1.1fr 460px", gap: "56px", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <span className="fz-section-label" style={{ color: "var(--fz-lilac)" }}>Founderz para empresas</span>
              <h1 className="fz-h1 fz-h1--light" style={{ color: "var(--fz-white)", fontSize: "60px" }}>Forma a tu equipo en IA y multiplica su impacto</h1>
              <p className="fz-body" style={{ color: "var(--fz-white-70)", maxWidth: "520px" }}>
                Programas a medida para que tu organización adopte la inteligencia artificial con criterio y resultados.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Button variant="second">Solicita una demo</Button>
                <Button variant="second-outlined">Descarga el dossier</Button>
              </div>
            </div>
            <div style={{ background: "var(--fz-white)", color: "var(--text-primary)", borderRadius: "var(--radius-card)", padding: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "24px", fontWeight: "var(--fw-semibold)" }}>Habla con nuestro equipo</h3>
              <Field label="Empresa" placeholder="Nombre de la empresa" />
              <Field label="Email corporativo" placeholder="nombre@empresa.com" />
              <Field label="Nº de empleados a formar" as="select">
                <select className="fz-input"><option>1 - 10</option><option>11 - 50</option><option>51 - 200</option><option>+200</option></select>
              </Field>
              <Button variant="primary" style={{ width: "100%" }}>Solicitar propuesta</Button>
            </div>
          </div>
        </div>
      </div>

      {/* COMPANIES black box */}
      <window.Section bg="white">
        <div style={{ background: "var(--fz-black)", color: "var(--fz-white)", borderRadius: "var(--radius-card)", padding: "56px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2 className="fz-h2" style={{ color: "var(--fz-white)" }}>Eleva el talento de tu equipo o lo hará la competencia</h2>
            <p className="fz-body" style={{ color: "var(--fz-white-70)" }}>Más de 1.400 empresas ya forman a sus equipos con Founderz.</p>
            <div><Button variant="second">Empieza ahora</Button></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {D.partners.slice(0, 9).map((p, i) => (
              <div key={i} style={{ background: "var(--fz-white-05)", border: "1px solid var(--fz-white-10)", borderRadius: "var(--radius-input)", height: "72px", display: "grid", placeItems: "center", fontWeight: 600, color: "var(--fz-white-70)" }}>{p}</div>
            ))}
          </div>
        </div>
      </window.Section>

      {/* ADVANTAGES */}
      <window.Section bg="grey">
        <SectionHeading label="Ventajas" title="Una formación que se nota en los resultados" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {D.features.map((f, i) => <FeatureCard key={i} icon={<Icon name={f.icon} />} title={f.title} bordered>{f.text}</FeatureCard>)}
        </div>
      </window.Section>

      {/* FUNDAE purple banner */}
      <window.Section bg="white">
        <div style={{ background: "var(--fz-purple)", color: "var(--fz-white)", borderRadius: "var(--radius-card)", padding: "48px 56px", display: "flex", gap: "40px", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div style={{ maxWidth: "640px" }}>
            <h2 className="fz-h2" style={{ color: "var(--fz-white)", fontSize: "32px" }}>Formación 100% bonificable con Fundae</h2>
            <p className="fz-body" style={{ color: "var(--fz-white-70)", marginTop: "12px" }}>Gestionamos los créditos formativos por ti para que tu inversión sea mínima.</p>
          </div>
          <Button variant="second">Calcular mi crédito</Button>
        </div>
      </window.Section>

      {/* TESTIMONIALS */}
      <window.Section bg="grey">
        <SectionHeading title="Empresas que ya lideran con IA" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {D.testimonials.map((t, i) => <Testimonial key={i} quote={t.quote} name={t.name} role={t.role} avatar={t.avatar} />)}
        </div>
      </window.Section>

      <BannerCTA surface="dark" title="¿Preparado para integrar la IA en tu organización?"
        description="Diseñamos un plan de formación a medida para tu equipo." primary="Solicita una demo" secondary="Descarga el dossier" />
      <window.SiteFooter />
    </div>
  );
}

window.Empresas = Empresas;
