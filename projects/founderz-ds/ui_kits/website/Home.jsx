/* Founderz homepage. */
const FZDS = window.FounderzDesignSystem_47078d;

function Home() {
  const D = window.FZ;
  const {
    Button, Pill, SectionHeading, LinkArrow, Icon,
    FeatureCard, StatCard, Accordion, Testimonial, ProgramCard, PostCard, EventCard,
    Banner, LogoMarquee, BannerCTA,
  } = FZDS;
  const [openFaq, setOpenFaq] = React.useState(0);
  const [activeProgram, setActiveProgram] = React.useState(0);

  return (
    <div>
      <window.SiteHeader />

      {/* HERO */}
      <window.Section bg="white" pad="hero">
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "56px", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <Pill uppercase>Escuela de IA y negocio</Pill>
            <h1 className="fz-h1 fz-h1--light" style={{ fontSize: "64px" }}>
              Domina la IA y lidera el futuro de tu profesión.
            </h1>
            <p className="fz-body fz-muted" style={{ maxWidth: "520px" }}>
              Programas prácticos de inteligencia artificial diseñados para profesionales,
              en directo y con expertos que la aplican cada día.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "8px" }}>
              <Button variant="primary" iconRight={<Icon name="arrow-right" size={18} />}>Ver programas</Button>
              <Button variant="third-outlined">Hablemos</Button>
            </div>
            <div style={{ display: "flex", gap: "24px", marginTop: "8px", flexWrap: "wrap" }}>
              {["Clases en directo", "Certificación oficial", "Financiación disponible"].map((t) => (
                <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)", fontSize: "16px" }}>
                  <Icon name="check" size={18} style={{ color: "var(--fz-purple)" }} />{t}
                </span>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: "var(--radius-card)", overflow: "hidden", aspectRatio: "4/3", background: "var(--fz-grey)" }}>
            <img src={D.img.heroHome} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </window.Section>

      {/* PARTNER MARQUEE */}
      <window.Section bg="white" pad="compact">
        <p className="fz-small fz-muted" style={{ textAlign: "center", marginBottom: "24px" }}>
          Profesionales de las mejores empresas confían en Founderz
        </p>
        <LogoMarquee logos={D.partners.map((p) => (
          <span style={{ fontSize: "24px", fontWeight: 600, color: "var(--fz-black)" }}>{p}</span>
        ))} />
      </window.Section>

      {/* PROGRAMS */}
      <window.Section bg="grey">
        <SectionHeading label="Programas" title="Formación interactiva para cada objetivo"
          description="Elige el programa que encaja con tu momento profesional." />
        <div style={{ display: "grid", gridTemplateColumns: activeProgram === 0 ? "1.4fr 1fr 1fr" : activeProgram === 1 ? "1fr 1.4fr 1fr" : "1fr 1fr 1.4fr", gap: "16px", transition: "grid-template-columns .3s var(--ease-out)" }}>
          {D.programs.map((p, i) => (
            <div key={i} onMouseEnter={() => setActiveProgram(i)}>
              <ProgramCard active={activeProgram === i} image={[D.img.meeting, D.img.creative, D.img.laptop][i]}
                type={p.type} duration={p.duration} title={p.title} categories={p.categories}
                description={p.desc} price={p.price} priceOld={p.priceOld} />
            </div>
          ))}
        </div>
      </window.Section>

      {/* MICROSOFT BANNER */}
      <window.Section bg="white">
        <Banner title="Microsoft + Founderz. La unión hace la fuerza."
          description="Contenido co-creado y certificaciones oficiales de Microsoft en todos nuestros programas."
          aside={<span style={{ fontSize: "28px", fontWeight: 600, color: "var(--fz-purple)" }}>Microsoft</span>} />
      </window.Section>

      {/* STATS */}
      <window.Section bg="white" pad="secondary">
        <SectionHeading label="Founderz en cifras" title="Resultados que hablan por sí solos" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {D.stats.map((s, i) => <StatCard key={i} value={s.value} label={s.label} surface={s.surface} />)}
        </div>
      </window.Section>

      {/* FEATURES */}
      <window.Section bg="grey">
        <SectionHeading label="Por qué Founderz" title="No solo es lo que aprendes. Es cómo lo aprendes." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {D.features.map((f, i) => (
            <FeatureCard key={i} icon={<Icon name={f.icon} />} title={f.title}>{f.text}</FeatureCard>
          ))}
        </div>
      </window.Section>

      {/* AGENDA */}
      <window.Section bg="white" pad="secondary">
        <SectionHeading align="left" label="Agenda" title="Próximas sesiones en directo" />
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {D.events.map((e, i) => (
            <EventCard key={i} day={e.day} month={e.month} label={e.label} title={e.title} speaker={e.speaker} />
          ))}
        </div>
      </window.Section>

      {/* TESTIMONIALS */}
      <window.Section bg="grey">
        <SectionHeading align="left" label="Testimonios" title="Founderz según sus protagonistas" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {D.testimonials.map((t, i) => (
            <Testimonial key={i} quote={t.quote} name={t.name} role={t.role} avatar={t.avatar} />
          ))}
        </div>
      </window.Section>

      {/* FAQ */}
      <window.Section bg="grey" pad="secondary" style={{ paddingTop: 0 }}>
        <SectionHeading title="¿Tienes dudas? Tenemos respuestas." />
        <div style={{ maxWidth: "820px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>
          {D.faqs.map((f, i) => (
            <Accordion key={i} question={f.q} open={openFaq === i} onToggle={(n) => setOpenFaq(n ? i : -1)}>{f.a}</Accordion>
          ))}
        </div>
      </window.Section>

      {/* BLOG */}
      <window.Section bg="white">
        <SectionHeading align="left" label="Recursos" title="Aprende algo nuevo cada semana"
          action={<LinkArrow href="#">Ver todos los artículos</LinkArrow>} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {D.posts.map((p, i) => (
            <PostCard key={i} image={D.photo(p.img)} category={p.category} title={p.title} />
          ))}
        </div>
      </window.Section>

      <BannerCTA title="¿Listo para dominar la IA?"
        description="Únete a más de 250.000 profesionales que ya están liderando el cambio."
        primary="Empieza hoy" secondary="Solicita información" />

      <window.SiteFooter />
    </div>
  );
}

window.Home = Home;
