/**
 * Analiza el corpus de LPs reales de ia.founderz.com (refs/lps/*.html)
 * y extrae señales de estructura, diseño y CRO.
 * Salida: refs/lp-corpus.json  +  informe por consola.
 */
import fs from "node:fs";

const DIR = "refs/lps";
const dec = (s) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&[a-z]+;/g, " ");
const txt = (s) => dec(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

const all = [];
for (const f of fs.readdirSync(DIR).sort()) {
  if (!f.endsWith(".html")) continue;
  const slug = f.replace(/\.html$/, "");
  const html = fs.readFileSync(`${DIR}/${f}`, "utf8");
  // El HTML viene como string JSON escapado dentro del campo text
  const h = html.replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\\//g, "/");

  const styles = [...h.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
  const cssBytes = styles.reduce((a, s) => a + s.length, 0);
  const body = h
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<script[\s\S]*?<\/script>/g, "");

  const grab = (re) => (h.match(re) || [])[1] ?? null;
  const count = (re) => (h.match(re) || []).length;

  const h1s = [...body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => txt(m[1]));
  const h2s = [...body.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => txt(m[1]));
  const h3s = [...body.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => txt(m[1]));
  const ctas = [
    ...body.matchAll(/<(?:button|a)\b[^>]*>([\s\S]{0,120}?)<\/(?:button|a)>/g),
  ]
    .map((m) => txt(m[1]))
    .filter((t) => t && t.length > 2 && t.length < 60);

  const imgs = [...body.matchAll(/<img\b[^>]*>/g)];
  const colors = [...new Set((h.match(/#[0-9a-fA-F]{6}\b/g) || []).map((c) => c.toLowerCase()))];
  const bodyText = txt(body);

  const rec = {
    slug,
    route: "/" + slug.replace(/--/g, "/").replace(/^root$/, ""),
    title: grab(/<title>([^<]*)<\/title>/),
    description: grab(/<meta name="description" content="([^"]*)"/),
    robots: grab(/<meta name="robots" content="([^"]*)"/),
    h1: h1s,
    h2: h2s,
    h3count: h3s.length,
    h3sample: h3s.slice(0, 8),
    words: bodyText.split(/\s+/).length,
    cssKb: Math.round(cssBytes / 1024),
    htmlKb: Math.round(h.length / 1024),
    sections: count(/<section\b/g),
    landmarks: {
      header: count(/<header\b/g),
      nav: count(/<nav\b/g),
      main: count(/<main\b/g),
      footer: count(/<footer\b/g),
    },
    form: {
      forms: count(/<form\b/g),
      inputs: count(/<input\b/g),
      selects: count(/<select\b/g),
      textareas: count(/<textarea\b/g),
      checkbox: count(/type="checkbox"/g),
      countrySelect: /pa[íi]s|country/i.test(body) && count(/<select\b/g) > 0,
      phonePrefix: /\+\d{1,3}|prefijo/i.test(body),
      tycLink: /politica-de-privacidad|pol[íi]tica de privacidad/i.test(h),
      appearanceNone: /appearance:\s*none/i.test(h),
      hubspotEmbed: /hsforms|hs-form|js\.hsforms/i.test(h),
    },
    media: {
      images: imgs.length,
      imgMissingAlt: imgs.filter((m) => !/\balt=/.test(m[0])).length,
      imgMissingDims: imgs.filter((m) => !/\bwidth=/.test(m[0])).length,
      iframes: count(/<iframe\b/g),
      video: count(/<video\b/g),
      youtube: /youtube|ytimg|vimeo/i.test(h),
    },
    ui: {
      details: count(/<details\b/g),
      countdown: /countdown|contador|quedan|termina en/i.test(bodyText),
      sticky: /position:\s*(sticky|fixed)/i.test(h),
      marquee: /marquee|animate-scroll|logos/i.test(h),
      priceShown: /\d[\d.]*\s*€|€\s*\d/.test(bodyText),
      strikePrice: /line-through/i.test(h),
      testimonials: /testimoni|alumni|opini/i.test(bodyText),
      faq: /preguntas frecuentes|faq/i.test(bodyText),
      progressBar: /progress|paso \d|step/i.test(bodyText),
    },
    tracking: {
      gtm: /GTM-5B9S6LB/.test(h),
      hubspot: /hs-scripts\.com\/25912905/.test(h),
      ga4Cookie: /founderz_ga4_user_id/.test(h),
      pageLoadControlled: /page_load_controlled/.test(h),
      generateLead: /generate_lead/.test(h),
    },
    brand: {
      rundPreload: count(/RundDisplay-[A-Za-z]+\.woff2/g),
      purpleWeb: colors.includes("#5045c8"),
      purpleHover: colors.includes("#2f2976"),
      inkOfficial: colors.includes("#111115"),
      colors: colors.slice(0, 14),
    },
    ctaSample: [...new Set(ctas)].slice(0, 10),
  };
  all.push(rec);
}

fs.writeFileSync("refs/lp-corpus.json", JSON.stringify(all, null, 2));

// ---------- informe ----------
const pad = (s, n) => String(s ?? "").slice(0, n).padEnd(n);
console.log(
  pad("ROUTE", 26) + pad("SEC", 4) + pad("WORDS", 6) + pad("CSSkb", 6) +
  pad("IMG", 5) + pad("FORM", 5) + pad("SEL", 4) + pad("DET", 4) +
  pad("€", 3) + pad("GTM", 4) + pad("HS", 3) + pad("ROBOTS", 22)
);
console.log("-".repeat(100));
for (const r of all) {
  console.log(
    pad(r.route, 26) + pad(r.sections, 4) + pad(r.words, 6) + pad(r.cssKb, 6) +
    pad(r.media.images, 5) + pad(r.form.inputs, 5) + pad(r.form.selects, 4) +
    pad(r.ui.details, 4) + pad(r.ui.priceShown ? "Y" : "-", 3) +
    pad(r.tracking.gtm ? "Y" : "-", 4) + pad(r.tracking.hubspot ? "Y" : "-", 3) +
    pad(r.robots ?? "(none)", 22)
  );
}
console.log("\nTotal LPs:", all.length);
