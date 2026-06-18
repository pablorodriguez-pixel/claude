/* Founderz — Webinar registration landing page (conversion-focused). */
function Webinar() {
  const D = window.FZ;
  const {
    Button, Pill, SectionHeading, Icon, Field, Logo,
    FeatureCard, Accordion, Testimonial, Avatar, LinkArrow,
  } = window.FounderzDesignSystem_47078d;

  // --- Webinar data ---
  const WB = {
    title: "IA generativa para profesionales: de cero a tu primer proyecto",
    subtitle: "Una masterclass en directo para empezar a usar la IA en tu trabajo hoy, sin conocimientos previos.",
    durationMin: 75,
    speaker: { name: "Anna Pérez", role: "Lead AI Educator · Founderz", avatar: D.avatars.anna, bio: "Ha formado a más de 40.000 profesionales en inteligencia artificial aplicada. Ex-Microsoft, diseña los programas de IA de Founderz." },
    learn: [
      { icon: "wand", title: "Tus primeros prompts profesionales", text: "Aprende a hablar con la IA para obtener resultados útiles desde el minuto uno." },
      { icon: "cpu", title: "Las herramientas que importan", text: "ChatGPT, Copilot y Gemini: cuándo usar cada una y cómo combinarlas." },
      { icon: "rocket", title: "Tu primer proyecto con IA", text: "Construye en directo un flujo de trabajo real que podrás aplicar mañana." },
    ],
    agenda: [
      { t: "00:00", h: "Bienvenida y panorama de la IA en 2026", d: "Qué ha cambiado y por qué te afecta a ti." },
      { t: "00:15", h: "Fundamentos del prompting eficaz", d: "El método para pedirle a la IA exactamente lo que necesitas." },
      { t: "00:40", h: "Demo en directo: de la idea al resultado", d: "Creamos juntos un proyecto paso a paso." },
      { t: "01:05", h: "Preguntas y respuestas", d: "Resolvemos tus dudas en directo." },
    ],
    audience: ["Profesionales que quieren ahorrar horas con IA", "Mandos y equipos que lideran proyectos", "Emprendedores y autónomos", "Cualquiera que parta de cero"],
    faqs: [
      { q: "¿El webinar es gratuito?", a: "Sí, la inscripción es 100% gratuita. Solo necesitas registrarte con tu email." },
      { q: "¿Habrá grabación si no puedo asistir en directo?", a: "Sí. Todas las personas inscritas reciben el acceso a la grabación durante 7 días." },
      { q: "¿Necesito conocimientos previos?", a: "Ninguno. Empezamos desde cero y avanzamos paso a paso." },
      { q: "¿Recibiré algún material?", a: "Sí, te enviaremos una guía de prompts y los recursos usados en la sesión." },
    ],
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
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
  const dateObj = new Date(target);
  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const dateLabel = `${dias[dateObj.getDay()]} ${dateObj.getDate()} de ${meses[dateObj.getMonth()]}`;
  const timeLabel = `${String(dateObj.getHours()).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}h (CEST)`;

  // --- Form ---
  const [form, setForm] = React.useState({ nombre: "", email: "", empresa: "" });
  const [submitted, setSubmitted] = React.useState(false);
  const [err, setErr] = React.useState("");
  const formRef = React.useRef(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setErr("Introduce tu nombre y un email válido para reservar tu plaza.");
      return;
    }
    setErr("");
    setSubmitted(true);
  };
  const goToForm = () => {
    if (formRef.current) window.scrollTo({ top: formRef.current.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
  };

  const Countdown = ({ light }) => (
    <div style={{ display: "flex", gap: "8px" }}>
      {[["d", "días"], ["h", "horas"], ["m", "min"], ["s", "seg"]].map(([k, lbl]) => (
        <div key={k} style={{ flex: 1, textAlign: "center", padding: "10px 4px", borderRadius: "12px",
          background: light ? "var(--fz-white)" : "rgba(255,255,255,0.08)",
          border: light ? "1px solid var(--fz-border)" : "1px solid var(--fz-white-10)" }}>
          <div style={{ fontSize: "28px", fontWeight: "var(--fw-semibold)", lineHeight: 1, color: light ? "var(--fz-purple)" : "var(--fz-white)", fontVariantNumeric: "tabular-nums" }}>
            {String(cd[k]).padStart(2, "0")}
          </div>
          <div style={{ fontSize: "12px", marginTop: "4px", letterSpacing: "0.04em", textTransform: "uppercase", color: light ? "var(--text-secondary)" : "var(--fz-white-70)" }}>{lbl}</div>
        </div>
      ))}
    </div>
  );

  const FormCard = () => (
    <div ref={formRef} style={{ background: "var(--fz-white)", color: "var(--text-primary)", borderRadius: "var(--radius-card)", padding: "28px", boxShadow: "0 20px 60px rgba(26,25,29,0.35)" }}>
      {submitted ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", textAlign: "center", padding: "12px 0" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--fz-lilac)", display: "grid", placeItems: "center", color: "var(--fz-purple)" }}>
            <Icon name="check" size={32} />
          </div>
          <h3 style={{ margin: 0, fontSize: "26px", fontWeight: "var(--fw-semibold)" }}>¡Estás dentro, {form.nombre.split(" ")[0]}!</h3>
          <p className="fz-details fz-muted" style={{ margin: 0 }}>
            Hemos enviado tu acceso a <strong style={{ color: "var(--text-primary)" }}>{form.email}</strong>. Te esperamos el {dateLabel} a las {timeLabel}.
          </p>
          <Button variant="third-outlined" icon={<Icon name="calendar" size={18} />} style={{ width: "100%" }}>Añadir a mi calendario</Button>
          <p className="fz-small fz-muted" style={{ margin: 0 }}>Recibirás la grabación aunque no puedas asistir.</p>
        </div>
      ) : (
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span className="fz-section-label">Reserva gratuita</span>
            <h3 style={{ margin: 0, fontSize: "24px", fontWeight: "var(--fw-semibold)" }}>Guarda tu plaza</h3>
          </div>
          <Countdown light />
          <Field label="Nombre y apellidos" placeholder="Tu nombre" value={form.nombre} onChange={set("nombre")} />
          <Field label="Email" type="email" placeholder="tucorreo@empresa.com" value={form.email} onChange={set("email")} />
          <Field label="Empresa (opcional)" placeholder="Dónde trabajas" value={form.empresa} onChange={set("empresa")} />
          {err ? <p className="fz-small" style={{ margin: 0, color: "#c0392b" }}>{err}</p> : null}
          <Button variant="primary" type="submit" style={{ width: "100%" }} iconRight={<Icon name="arrow-right" size={18} />}>Reserva tu plaza gratis</Button>
          <p className="fz-small fz-muted" style={{ margin: 0, textAlign: "center" }}>Plazas limitadas · 100% gratis · Incluye grabación</p>
        </form>
      )}
    </div>
  );

  return (
    <div>
      {/* HERO */}
      <div style={{ position: "relative", background: "var(--fz-black)", color: "var(--fz-white)", overflow: "hidden" }}>
        <img src={D.img.heroProgram} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.22 }} />
        <div style={{ position: "relative" }}>
          {/* slim header */}
          <div className="fz-container wb-hero-top" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "24px" }}>
            <Logo height={24} color="var(--fz-white)" />
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "16px", color: "var(--fz-white-70)" }}>
              <Icon name="calendar" size={18} style={{ color: "var(--fz-lilac)" }} />{dateLabel}
            </span>
          </div>

          <div className="fz-container wb-hero">
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <Pill variant="third" uppercase>Webinar gratuito</Pill>
                <Pill variant="third" uppercase>En directo</Pill>
              </div>
              <h1 className="fz-h1 fz-h1--light wb-hero__title" style={{ color: "var(--fz-white)" }}>{WB.title}</h1>
              <p className="fz-body" style={{ color: "var(--fz-white-70)", maxWidth: "560px" }}>{WB.subtitle}</p>
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                {[["calendar", dateLabel], ["clock", `${timeLabel} · ${WB.durationMin} min`]].map(([ic, tx]) => (
                  <span key={tx} style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "18px" }}>
                    <Icon name={ic} size={20} style={{ color: "var(--fz-lilac)" }} />{tx}
                  </span>
                ))}
              </div>
              {/* social proof */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px", paddingTop: "24px", borderTop: "1px solid var(--fz-white-10)" }}>
                <div style={{ display: "flex" }}>
                  {[D.avatars.pau, D.avatars.anna, D.avatars.marc, D.avatars.lucia].map((a, i) => (
                    <img key={i} src={a} alt="" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--fz-black)", marginLeft: i ? -12 : 0 }} />
                  ))}
                </div>
                <span style={{ fontSize: "16px", color: "var(--fz-white-70)" }}>
                  <strong style={{ color: "var(--fz-white)" }}>+250.000 profesionales</strong> ya se han formado con Founderz
                </span>
              </div>
            </div>
            <FormCard />
          </div>
        </div>
      </div>

      {/* TRUST */}
      <window.Section bg="grey" pad="compact">
        <p className="fz-small fz-muted" style={{ textAlign: "center", marginBottom: "24px" }}>Profesionales de las mejores empresas asisten a nuestros webinars</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "48px", flexWrap: "wrap", alignItems: "center", opacity: 0.75 }}>
          {D.partners.slice(0, 6).map((p) => <span key={p} style={{ fontSize: "22px", fontWeight: 600, color: "var(--fz-black)" }}>{p}</span>)}
        </div>
      </window.Section>

      {/* WHAT YOU LEARN */}
      <window.Section bg="white">
        <SectionHeading label="Qué vas a aprender" title="Sales del webinar sabiendo usar la IA, no solo oyendo hablar de ella" />
        <div className="wb-grid-3">
          {WB.learn.map((f, i) => <FeatureCard key={i} icon={<Icon name={f.icon} />} title={f.title}>{f.text}</FeatureCard>)}
        </div>
      </window.Section>

      {/* AGENDA */}
      <window.Section bg="lilac">
        <div className="wb-two-col">
          <div>
            <SectionHeading align="left" label="Agenda" title="75 minutos, todo aplicable" description="Una sesión práctica, sin relleno, pensada para que salgas con algo que usar." />
            <Button variant="primary" onClick={goToForm} iconRight={<Icon name="arrow-right" size={18} />}>Reserva tu plaza</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {WB.agenda.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: "20px", padding: "20px 0", borderTop: i ? "1px solid rgba(80,69,200,0.18)" : "none" }}>
                <span style={{ flexShrink: 0, fontSize: "16px", fontWeight: "var(--fw-semibold)", color: "var(--fz-purple)", width: "56px", fontVariantNumeric: "tabular-nums" }}>{a.t}</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "var(--fw-medium)" }}>{a.h}</h3>
                  <p className="fz-details fz-muted" style={{ margin: "6px 0 0" }}>{a.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </window.Section>

      {/* SPEAKER */}
      <window.Section bg="dark">
        <div className="wb-speaker">
          <div className="wb-speaker__media" style={{ borderRadius: "var(--radius-card)", overflow: "hidden", aspectRatio: "1", background: "var(--fz-white-05)" }}>
            <img src={D.img.woman} alt={WB.speaker.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <span className="fz-section-label" style={{ color: "var(--fz-lilac)" }}>Tu ponente</span>
            <h2 className="fz-h2" style={{ color: "var(--fz-white)" }}>{WB.speaker.name}</h2>
            <p style={{ margin: 0, fontSize: "18px", color: "var(--fz-lilac)" }}>{WB.speaker.role}</p>
            <p className="fz-body" style={{ color: "var(--fz-white-70)", maxWidth: "560px" }}>{WB.speaker.bio}</p>
          </div>
        </div>
      </window.Section>

      {/* AUDIENCE */}
      <window.Section bg="white" pad="secondary">
        <SectionHeading title="¿Es para ti?" description="Este webinar está pensado para ti si eres…" />
        <div className="wb-grid-2">
          {WB.audience.map((a) => (
            <div key={a} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "20px 24px", background: "var(--fz-grey)", borderRadius: "var(--radius-card-inner)" }}>
              <Icon name="check" size={22} style={{ color: "var(--fz-purple)", flexShrink: 0 }} />
              <span style={{ fontSize: "18px" }}>{a}</span>
            </div>
          ))}
        </div>
      </window.Section>

      {/* TESTIMONIALS */}
      <window.Section bg="grey">
        <SectionHeading title="Lo que dicen quienes ya han asistido" />
        <div className="wb-grid-3">
          {D.testimonials.map((t, i) => <Testimonial key={i} quote={t.quote} name={t.name} role={t.role} avatar={t.avatar} />)}
        </div>
      </window.Section>

      {/* FAQ */}
      <window.Section bg="white" pad="secondary">
        <SectionHeading title="Preguntas frecuentes" />
        <div style={{ maxWidth: "820px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>
          {WB.faqs.map((f, i) => <Accordion key={i} question={f.q} defaultOpen={i === 0}>{f.a}</Accordion>)}
        </div>
      </window.Section>

      {/* FINAL CTA */}
      <section style={{ background: "var(--fz-purple)", color: "var(--fz-white)" }}>
        <div className="fz-container" style={{ paddingBlock: "80px", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", textAlign: "center" }}>
          <span className="fz-section-label" style={{ color: "var(--fz-lilac)" }}>Plazas limitadas</span>
          <h2 className="fz-h2" style={{ color: "var(--fz-white)", maxWidth: "720px" }}>Reserva tu plaza antes de que se agoten</h2>
          <div style={{ maxWidth: "440px", width: "100%" }}><Countdown /></div>
          <Button variant="second" onClick={goToForm} iconRight={<Icon name="arrow-right" size={18} />}>Reserva tu plaza gratis</Button>
        </div>
      </section>

      <window.SiteFooter />

      {/* STICKY BAR */}
      <div style={{ position: "sticky", bottom: 0, background: "var(--fz-black)", color: "var(--fz-white)", zIndex: 40, borderTop: "1px solid var(--fz-white-10)" }}>
        <div className="fz-container" style={{ paddingBlock: "14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "18px", fontWeight: "var(--fw-medium)" }}>Webinar gratuito · {dateLabel}</span>
            <span style={{ fontSize: "16px", color: "var(--fz-white-70)", fontVariantNumeric: "tabular-nums" }}>
              Empieza en {String(cd.d)}d {String(cd.h).padStart(2, "0")}:{String(cd.m).padStart(2, "0")}:{String(cd.s).padStart(2, "0")}
            </span>
          </div>
          <Button variant="primary" onClick={goToForm}>Reserva tu plaza gratis</Button>
        </div>
      </div>
    </div>
  );
}

window.Webinar = Webinar;
