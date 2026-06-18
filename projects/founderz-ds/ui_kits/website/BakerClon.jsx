/* Founderz — "Baker clon" LP (Máster MAIC). Replica de go.founderz.com/maic-mql. */
function BakerClon() {
  const B = window.BAKER;
  const {
    Button, Pill, SectionHeading, Icon, Field, Logo, FeatureCard, Accordion, Testimonial, Avatar,
  } = window.FounderzDesignSystem_47078d;

  const [openMod, setOpenMod] = React.useState(0);
  const [openFaq, setOpenFaq] = React.useState(0);
  const formRef = React.useRef(null);
  const twWords = ["motion designers.","arquitectos.","directores creativos.","diseñadores de moda.","diseñadores gráficos.","directores de arte.","publicistas.","cineastas.","fotógrafos.","ilustradores."];
  const [twIdx, setTwIdx] = React.useState(0);
  const [twText, setTwText] = React.useState("motion designers.");
  const [twDel, setTwDel] = React.useState(false);
  React.useEffect(() => {
    const full = twWords[twIdx];
    const id = setTimeout(() => {
      if (!twDel) {
        if (twText.length < full.length) setTwText(full.slice(0, twText.length + 1));
        else setTimeout(() => setTwDel(true), 1600);
      } else {
        if (twText.length > 0) setTwText(twText.slice(0, -1));
        else { setTwDel(false); setTwIdx((c) => (c + 1) % twWords.length); }
      }
    }, twDel ? 55 : 85);
    return () => clearTimeout(id);
  }, [twText, twDel, twIdx]);
  React.useEffect(() => {
    const el = document.getElementById('bk-specs-carousel');
    if (!el) return;
    let isDown = false, startX = 0, scrollLeft = 0;
    const down = (e) => { isDown = true; el.classList.add('is-dragging'); startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; };
    const up   = () => { isDown = false; el.classList.remove('is-dragging'); };
    const move = (e) => { if (!isDown) return; e.preventDefault(); el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX); };
    el.addEventListener('mousedown', down);
    el.addEventListener('mouseleave', up);
    el.addEventListener('mouseup', up);
    el.addEventListener('mousemove', move, { passive: false });
    return () => { el.removeEventListener('mousedown', down); el.removeEventListener('mouseleave', up); el.removeEventListener('mouseup', up); el.removeEventListener('mousemove', move); };
  }, []);
  const [showBtt, setShowBtt] = React.useState(false);
  React.useEffect(() => {
    const handle = () => {
      const nearFooter = window.scrollY + window.innerHeight > document.body.scrollHeight - 160;
      setShowBtt(window.scrollY > 400 && !nearFooter);
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const goToForm = () => {
    if (formRef.current) window.scrollTo({ top: formRef.current.getBoundingClientRect().top + window.scrollY - 40, behavior: "smooth" });
  };

  const Stars = ({ light }) => (
    <span style={{ display: "inline-flex", gap: "2px", color: "#00b67a" }}>
      {[0,1,2,3,4].map((i) => <Icon key={i} name="star" size={16} style={{ fill: "#00b67a", color: "#00b67a" }} />)}
    </span>
  );

  const DossierForm = ({ inner }) => (
    <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <Field label="Nombre" placeholder="Tu nombre" />
        <Field label="Apellido" placeholder="Tus apellidos" />
      </div>
      <Field label="Correo" type="email" placeholder="tucorreo@empresa.com" />
      <Field label="Número de teléfono" placeholder="+34 600 000 000" />
      <Field label="País"><select className="fz-input"><option>España</option><option>México</option><option>Colombia</option><option>Argentina</option><option>Otro</option></select></Field>
      <label style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "13px", color: "var(--text-secondary)" }}>
        <input type="checkbox" style={{ marginTop: "3px" }} />
        <span>He leído y acepto los términos y condiciones y la política de privacidad.</span>
      </label>
      <Button variant="primary" type="submit" style={{ width: "100%" }} iconRight={<Icon name="arrow-right" size={18} />}>{inner.cta}</Button>
      <p className="fz-small fz-muted" style={{ margin: 0, textAlign: "center" }}>{inner.note || inner.formNote}</p>
    </form>
  );

  const specImages = {
    "Ilustración": "1522202176078-f59c65cbf5b9",
    "Diseño Gráfico": "1558618742-fad45fb81b34",
    "Comunicación y RRSS": "1522071820081-009f0129c71c",
    "Cine y Audiovisual": "1536440136628-849c177e76a1",
    "Moda": "1469334031218-e382a71b716b",
    "Fotografía": "1506905925346-21bda4d32df4",
    "Publicidad": "1557804506-46fc631ba2a2",
    "Arquitectura": "1600585154340-be6161a56a0c",
  };

  const VideoReel = ({ label, ratio = "9 / 16", bgColor }) => (
    <div style={{ position: "relative", borderRadius: "var(--radius-card)", overflow: "hidden", aspectRatio: ratio, background: bgColor || "var(--fz-white-05)", border: bgColor ? "none" : "1px solid var(--fz-white-10)" }}>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
        <span style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "grid", placeItems: "center", color: "var(--fz-black)" }}>
          <Icon name="play" size={22} style={{ fill: "var(--fz-black)" }} />
        </span>
      </div>
      {label ? <span style={{ position: "absolute", left: 12, right: 12, bottom: 12, fontSize: "13px", color: "var(--fz-white-70)", textAlign: "center" }}>{label}</span> : null}
    </div>
  );

  return (
    <div>
      {/* ===== HERO ===== */}
      <div style={{ position: "relative", background: "var(--fz-black)", color: "var(--fz-white)", overflow: "clip" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", paddingTop: "24px", flexWrap: "wrap" }}>
          <Logo height={24} color="var(--fz-white)" />
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "15px", color: "var(--fz-white-70)" }}>
            <Stars /> <strong style={{ color: "var(--fz-white)", fontWeight: 600 }}>{B.hero.ratingPre}</strong>
          </span>
        </div>

        <div className="container bk-hero" style={{ paddingBlock: "48px" }}>
          {/* reel */}
          <div className="bk-hero__reel">
            <VideoReel label={B.hero.reelLabel} />
          </div>
          {/* content + form (apilados) */}
          <div className="bk-hero__main">
            <Pill variant="third" uppercase style={{ alignSelf: "flex-start" }}>{B.hero.microsoft}</Pill>
            <h1 className="fz-h1 bk-hero__title" style={{ color: "var(--fz-white)", fontWeight: 700 }}>Domina la IA que está<br />transformando el sector de los<br /><span className="bk-hero__typewriter">{twText}</span></h1>
            <p className="fz-body" style={{ color: "var(--fz-white-70)" }}>{B.hero.meta}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <p className="fz-small" style={{ color: "var(--fz-white)", fontWeight: 600, margin: 0 }}>{B.hero.bulletsTitle}</p>
              {B.hero.bullets.map((b, i) => (
                <span key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "16px", color: "var(--fz-white-70)" }}>
                  <Icon name="check" size={18} style={{ color: "var(--fz-lilac)", flexShrink: 0, marginTop: "3px" }} />{b}
                </span>
              ))}
            </div>
            {/* form — debajo del title y el listado */}
            <div className="bk-hero__form" ref={formRef}>
              <div style={{ background: "var(--fz-white)", color: "var(--text-primary)", borderRadius: "var(--radius-card)", padding: "28px", boxShadow: "0 20px 60px rgba(26,25,29,0.35)" }}>
                <p className="fz-section-label">{B.hero.formLabel}</p>
                <h2 style={{ margin: "6px 0 4px", fontSize: "24px", fontWeight: "var(--fw-semibold)" }}>{B.hero.formTitle}</h2>
                <p className="fz-small fz-muted" style={{ margin: "0 0 16px" }}>{B.hero.formSub}</p>
                <DossierForm inner={B.hero} />
              </div>
            </div>
          </div>
        </div>

        {/* trust */}
        <div className="container" style={{ paddingBottom: "48px" }}>
          <p className="fz-small" style={{ textAlign: "center", color: "var(--fz-white-70)", marginBottom: "16px" }}>{B.trust.title}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap", opacity: 0.8 }}>
            {B.trust.logos.map((l) => <span key={l} style={{ fontSize: "18px", fontWeight: 600, color: "var(--fz-white)" }}>{l}</span>)}
          </div>
        </div>
      </div>

      {/* ===== QUOTES "¿Te suena?" ===== */}
      <window.Section bg="grey">
        <SectionHeading title={B.quotes.title} />
        <div className="bk-grid-3">
          {B.quotes.items.map((q, i) => (
            <div key={i} style={{ background: "var(--fz-white)", border: "1px solid var(--fz-border)", borderRadius: "var(--radius-card)", padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
              <img src={B.photo(q.img, 600)} alt="" style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover" }} />
              <p style={{ margin: 0, fontSize: "18px", lineHeight: 1.5, color: "var(--text-primary)" }}>“{q.text}”</p>
              <p style={{ margin: 0, fontSize: "15px", color: "var(--fz-purple)", fontStyle: "italic", marginTop: "auto" }}>{q.after}</p>
            </div>
          ))}
        </div>
      </window.Section>

      {/* ===== SHOWCASE ===== */}
      <window.Section bg="dark">
        <SectionHeading onDark label={<span style={{ color: "rgba(255,255,255,0.65)" }}>{B.showcase.label}</span>} title={B.showcase.title} />
        <div className="bk-showcase">
          {B.showcase.items.map((it, i) => (
            <div key={i} className={`bk-showcase__item bk-showcase__item--${i}`} style={{ position: "relative", borderRadius: "var(--radius-card)", overflow: "hidden", minHeight: "240px" }}>
              <img src={B.photo(it.img, 1000)} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,25,29,0.1), rgba(26,25,29,0.75))" }} />
              {it.video ? (
                <span style={{ position: "absolute", top: 16, right: 16, fontSize: "13px", color: "#fff", background: "rgba(0,0,0,0.4)", padding: "6px 12px", borderRadius: "100px", display: "inline-flex", gap: "6px", alignItems: "center" }}><Icon name="play" size={14} style={{ fill: "#fff" }} />Ver con sonido</span>
              ) : null}
              <div style={{ position: "absolute", left: 20, right: 20, bottom: 20, color: "#fff" }}>
                <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>{it.title}</h3>
                <p style={{ margin: "4px 0 0", fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>{it.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
          <Button variant="second" onClick={goToForm} iconRight={<Icon name="arrow-right" size={18} />}>{B.showcase.cta}</Button>
        </div>
      </window.Section>

      {/* ===== PROGRAM ===== */}
      <window.Section bg="white">
        <SectionHeading label={B.program.label} title={B.program.title} description={B.program.sub} />
        <div className="bk-grid-4" style={{ marginBottom: "40px" }}>
          {B.program.stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "24px", background: "var(--fz-grey)", borderRadius: "var(--radius-card-inner)" }}>
              <div style={{ fontSize: "32px", fontWeight: "var(--fw-semibold)", color: "var(--fz-purple)" }}>{s.value}</div>
              <div className="fz-small fz-muted">{s.label}</div>
            </div>
          ))}
        </div>

        <p className="fz-body" style={{ textAlign: "center", fontWeight: 500, marginBottom: "20px" }}>{B.program.specTitle}</p>
        <div className="bk-specs-carousel" id="bk-specs-carousel" style={{ marginBottom: "40px" }}>
          <div className="bk-specs-track">
            {B.program.specs.map((sp, i) => (
              <div key={i} className="bk-spec-item">
                <img src={B.photo(specImages[sp.name] || "1522202176078-f59c65cbf5b9", 400)} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,25,29,0) 40%, rgba(26,25,29,0.75))" }} />
                <span className="bk-spec-item__name">{sp.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bk-two-col" style={{ alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {B.program.includes.map((it) => (
              <span key={it} style={{ display: "flex", gap: "12px", alignItems: "center", fontSize: "17px" }}>
                <Icon name="check" size={20} style={{ color: "var(--fz-purple)", flexShrink: 0 }} />{it}
              </span>
            ))}
          </div>
          <div>
            <p className="fz-section-label" style={{ marginBottom: "12px" }}>{B.program.learnTitle}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
              {B.program.learn.map((l) => <Pill key={l}>{l}</Pill>)}
            </div>
            <p className="fz-section-label" style={{ marginBottom: "12px" }}>{B.program.toolsTitle}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {B.program.tools.map((t) => (
                <span key={t} style={{ fontSize: "15px", fontWeight: 500, padding: "8px 16px", borderRadius: "100px", border: "1px solid var(--fz-border)", background: "var(--fz-white)" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </window.Section>

      {/* ===== SYLLABUS ===== */}
      <window.Section bg="grey">
        <SectionHeading title={B.syllabus.title} />
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>
          {B.syllabus.modules.map((m, i) => (
            <Accordion key={i} open={openMod === i} onToggle={(n) => setOpenMod(n ? i : -1)}
              question={<span style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
                <span style={{ width: 28, height: 28, borderRadius: "8px", background: "var(--fz-lilac)", color: "var(--fz-purple)", display: "grid", placeItems: "center", fontSize: "14px", fontWeight: 600, flexShrink: 0 }}>{m.n}</span>
                {m.title}{m.tag ? <Pill style={{ fontSize: "12px", padding: "2px 10px" }}>{m.tag}</Pill> : null}
              </span>}>
              <ul style={{ margin: "0 0 16px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {m.lessons.map((l, j) => <li key={j}>{l}</li>)}
              </ul>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                {m.teachers.map((t) => <span key={t} style={{ fontSize: "14px", color: "var(--text-secondary)" }}>· {t}</span>)}
              </div>
            </Accordion>
          ))}
          <div style={{ textAlign: "center", padding: "32px", background: "var(--fz-white)", border: "1px dashed var(--fz-border)", borderRadius: "var(--radius-card-inner)", marginTop: "8px" }}>
            <span style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--fz-lilac)", color: "var(--fz-purple)", display: "inline-grid", placeItems: "center", marginBottom: "12px" }}><Icon name="award" size={22} /></span>
            <h3 style={{ margin: "0 0 6px", fontSize: "20px", fontWeight: 600 }}>{B.syllabus.lockedTitle}</h3>
            <p className="fz-small fz-muted" style={{ margin: "0 0 16px" }}>{B.syllabus.lockedSub}</p>
            <Button variant="primary" onClick={goToForm}>{B.syllabus.lockedCta}</Button>
            <p className="fz-small fz-muted" style={{ margin: "12px 0 0" }}>{B.syllabus.lockedNote}</p>
          </div>
        </div>
      </window.Section>

      {/* ===== METHOD ===== */}
      <window.Section bg="white">
        <SectionHeading label={B.method.label} title={B.method.title} />
        <div className="bk-two-col" style={{ alignItems: "center", maxWidth: "920px", marginInline: "auto", gap: "32px" }}>
          <div style={{ maxWidth: "320px", marginInline: "auto", width: "100%" }}>
            <VideoReel label={`${B.method.videoTitle} · ${B.method.videoSub}`} bgColor="linear-gradient(135deg, #5045c8 0%, #2f2976 55%, #1a191d 100%)" />
          </div>
          <div>
            <p className="fz-body" style={{ marginBottom: "24px" }}>{B.method.intro}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {B.method.items.map((it) => (
                <div key={it.title} style={{ display: "flex", gap: "16px" }}>
                  <span style={{ color: "var(--fz-purple)", flexShrink: 0 }}><Icon name={it.icon} size={24} /></span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>{it.title}</h3>
                    <p className="fz-details fz-muted" style={{ margin: "4px 0 0" }}>{it.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </window.Section>

      {/* ===== TESTIMONIALS ===== */}
      <window.Section bg="grey">
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)" }}><Stars /> {B.testimonials.ratingPre}</span>
        </div>
        <SectionHeading title={B.testimonials.title} />
        <div className="bk-feat-testi">
          <div style={{ background: "var(--fz-black)", color: "var(--fz-white)", borderRadius: "var(--radius-card)", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr", minHeight: "280px" }}>
            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr" }} className="bk-feat-testi__inner">
              <div style={{ position: "relative", background: "var(--fz-white-05)", overflow: "hidden" }}>
                <img src={B.photo(B.testimonials.featured.img, 800)} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "grid", placeItems: "center", color: "var(--fz-black)" }}><Icon name="play" size={22} style={{ fill: "var(--fz-black)" }} /></span>
              </div>
              <div style={{ padding: "32px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "16px" }}>
                <p style={{ margin: 0, fontSize: "18px", lineHeight: 1.5 }}>“{B.testimonials.featured.text}”</p>
                <div><div style={{ fontWeight: 600 }}>{B.testimonials.featured.name}</div><div style={{ color: "var(--fz-white-70)", fontSize: "14px" }}>{B.testimonials.featured.role}</div></div>
              </div>
            </div>
          </div>
          <div className="bk-grid-3" style={{ marginTop: "16px" }}>
            {B.testimonials.items.map((t, i) => (
              <div key={i} style={{ background: "var(--fz-white)", borderRadius: "var(--radius-card)", padding: "28px", display: "flex", flexDirection: "column", gap: "16px", height: "100%", boxSizing: "border-box", border: "1px solid var(--fz-border)" }}>
                <Stars />
                <blockquote style={{ margin: 0, flex: 1, fontSize: "17px", lineHeight: 1.5, color: "var(--text-primary)" }}>"{t.text}"</blockquote>
                <Avatar src={t.avatar} name={t.name} role={t.role} />
              </div>
            ))}
          </div>
        </div>
      </window.Section>

      {/* ===== TEACHERS (slider) ===== */}
      <window.Section bg="dark">
        <div className="bk-teachers__head">
          <SectionHeading onDark align="left" label={<span style={{ color: "var(--fz-lilac)" }}>{B.teachers.label}</span>} title={B.teachers.title} description={B.teachers.sub} style={{ marginBottom: 0 }} />
          <div className="bk-teachers__nav">
            <button type="button" aria-label="Anterior" className="bk-teachers__arrow" onClick={() => { const el = document.getElementById('bk-teachers-track'); if (el) el.scrollBy({ left: -260, behavior: 'smooth' }); }}>
              <Icon name="chevron-right" size={20} style={{ transform: "rotate(180deg)" }} />
            </button>
            <button type="button" aria-label="Siguiente" className="bk-teachers__arrow" onClick={() => { const el = document.getElementById('bk-teachers-track'); if (el) el.scrollBy({ left: 260, behavior: 'smooth' }); }}>
              <Icon name="chevron-right" size={20} />
            </button>
          </div>
        </div>
        <div className="bk-teachers__track" id="bk-teachers-track">
          {B.teachers.items.map((t, i) => (
            <div key={i} className="bk-teachers__slide">
              <img src={`https://i.pravatar.cc/400?img=${t.img}`} alt={t.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,25,29,0) 30%, rgba(26,25,29,0.96))" }} />
              <div style={{ position: "absolute", left: 16, right: 16, bottom: 16, color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
                <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 600 }}>{t.name}</h3>
                <p style={{ margin: "2px 0 0", fontSize: "13px", color: "rgba(255,255,255,0.85)" }}>{t.role}</p>
                {t.company ? <p style={{ margin: "6px 0 0", fontSize: "12px", color: "var(--fz-lilac)", fontWeight: 600 }}>{t.company}</p> : null}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
          <Button variant="second" onClick={goToForm} iconRight={<Icon name="arrow-right" size={18} />}>{B.teachers.cta}</Button>
        </div>
      </window.Section>

      {/* ===== AWARDS ===== */}
      <window.Section bg="white" pad="secondary">
        <p className="fz-section-label" style={{ textAlign: "center", marginBottom: "24px" }}>{B.awards.label}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap", alignItems: "center", opacity: 0.6 }}>
          {B.awards.logos.map((l) => <span key={l} style={{ fontSize: "16px", fontWeight: 600, color: "var(--fz-black)" }}>{l}</span>)}
        </div>
      </window.Section>

      {/* ===== FAQ ===== */}
      <window.Section bg="grey" pad="secondary">
        <SectionHeading label="FAQ" title={B.faqs.title} />
        <div style={{ maxWidth: "820px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>
          {B.faqs.items.map((f, i) => <Accordion key={i} question={f.q} open={openFaq === i} onToggle={(n) => setOpenFaq(n ? i : -1)}>{f.a}</Accordion>)}
        </div>
      </window.Section>

      {/* ===== FINAL CTA ===== */}
      <section style={{ background: "var(--fz-purple)", color: "var(--fz-white)" }}>
        <div className="container bk-final" style={{ paddingBlock: "80px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <p className="fz-section-label" style={{ color: "var(--fz-lilac)" }}>{B.finalCta.label}</p>
            <h2 className="fz-h2" style={{ color: "var(--fz-white)" }}>{B.finalCta.title}</h2>
            <p className="fz-body" style={{ color: "var(--fz-white-70)" }}>{B.finalCta.sub}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
              {B.finalCta.checks.map((c) => (
                <span key={c} style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "16px" }}><Icon name="check" size={18} style={{ color: "var(--fz-lilac)" }} />{c}</span>
              ))}
            </div>
          </div>
          <div style={{ background: "var(--fz-white)", color: "var(--text-primary)", borderRadius: "var(--radius-card)", padding: "28px" }}>
            <h3 style={{ margin: "0 0 4px", fontSize: "22px", fontWeight: "var(--fw-semibold)" }}>{B.finalCta.formTitle}</h3>
            <p className="fz-small fz-muted" style={{ margin: "0 0 16px" }}>{B.finalCta.formSub}</p>
            <DossierForm inner={B.finalCta} />
          </div>
        </div>
      </section>

      <window.SiteFooter />

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Volver arriba"
        style={{
          position: 'fixed', bottom: 32, right: 32, zIndex: 200,
          width: 48, height: 48, borderRadius: '50%',
          background: 'var(--fz-purple)', color: '#fff',
          border: 'none', cursor: 'pointer',
          display: 'grid', placeItems: 'center',
          boxShadow: '0 4px 16px rgba(80,69,200,0.4)',
          opacity: showBtt ? 1 : 0,
          pointerEvents: showBtt ? 'auto' : 'none',
          transform: showBtt ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity .25s, transform .25s',
        }}
      >
        <Icon name="chevron-right" size={22} style={{ transform: 'rotate(-90deg)' }} />
      </button>
    </div>
  );
}

window.BakerClon = BakerClon;
