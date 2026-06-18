/* MAII LP — panel de Tweaks: ajustes de conversión. */
const { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakColor } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroBg": "Oscuro",
  "countdown": true,
  "offerbar": true,
  "urgency": "#5045c8"
}/*EDITMODE-END*/;

const BG_MAP = { "Oscuro": "dark", "Lila": "lilac" };

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

  return (
    <TweaksPanel>
      <TweakSection label="Hero" />
      <TweakRadio label="Fondo" value={t.heroBg} options={["Oscuro", "Lila"]}
        onChange={(v) => setTweak("heroBg", v)} />
      <TweakSection label="Conversión" />
      <TweakToggle label="Barra de oferta" value={t.offerbar}
        onChange={(v) => setTweak("offerbar", v)} />
      <TweakToggle label="Mostrar countdown" value={t.countdown}
        onChange={(v) => setTweak("countdown", v)} />
      <TweakColor label="Color de acento" value={t.urgency}
        options={["#5045c8", "#2f2976", "#1a191d"]}
        onChange={(v) => setTweak("urgency", v)} />
    </TweaksPanel>
  );
}

const mount = document.createElement("div");
document.body.appendChild(mount);
ReactDOM.createRoot(mount).render(<TweaksApp />);
