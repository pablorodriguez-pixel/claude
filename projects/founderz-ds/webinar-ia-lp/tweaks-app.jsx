/* Webinar IA LP — panel de Tweaks: ajustes de conversión. */
const { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakColor } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroBg": "Oscuro",
  "offerbar": true,
  "countdown": true,
  "seatbar": true,
  "accent": "#5045c8"
}/*EDITMODE-END*/;

const BG_MAP = { "Oscuro": "dark", "Lila": "lilac" };

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const root = document.documentElement;
    root.dataset.herobg = BG_MAP[t.heroBg] || "dark";
    root.dataset.countdown = t.countdown ? "on" : "off";
    root.style.setProperty("--lp-urgency", t.accent || "#5045c8");
    const bar = document.querySelector(".offerbar");
    if (bar) bar.style.display = t.offerbar ? "" : "none";
    document.querySelectorAll("[data-seatbar]").forEach((s) => {
      s.style.display = t.seatbar ? "" : "none";
    });
  }, [t.heroBg, t.countdown, t.offerbar, t.seatbar, t.accent]);

  return (
    <TweaksPanel>
      <TweakSection label="Hero" />
      <TweakRadio label="Fondo" value={t.heroBg} options={["Oscuro", "Lila"]}
        onChange={(v) => setTweak("heroBg", v)} />
      <TweakSection label="Conversión" />
      <TweakToggle label="Barra superior" value={t.offerbar}
        onChange={(v) => setTweak("offerbar", v)} />
      <TweakToggle label="Cuenta atrás" value={t.countdown}
        onChange={(v) => setTweak("countdown", v)} />
      <TweakToggle label="Barra de plazas" value={t.seatbar}
        onChange={(v) => setTweak("seatbar", v)} />
      <TweakColor label="Color de acento" value={t.accent}
        options={["#5045c8", "#2f2976", "#1a191d"]}
        onChange={(v) => setTweak("accent", v)} />
    </TweaksPanel>
  );
}

const mount = document.createElement("div");
document.body.appendChild(mount);
ReactDOM.createRoot(mount).render(<TweaksApp />);
