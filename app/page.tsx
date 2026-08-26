import type { Metadata } from "next";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

export const metadata: Metadata = {
  title: "Laboratorio de LPs",
  description: "Índice interno de las landing pages generadas en este repo.",
};

/** Rutas de LP presentes en app/, descubiertas en build. */
function findLandingPages(): string[] {
  const appDir = join(process.cwd(), "app");
  const skip = new Set(["api", "fonts"]);
  const out: string[] = [];

  const walk = (dir: string, prefix: string) => {
    for (const entry of readdirSync(dir)) {
      if (entry.startsWith("_") || entry.startsWith("(") || skip.has(entry)) continue;
      const full = join(dir, entry);
      if (!statSync(full).isDirectory()) continue;
      const route = `${prefix}/${entry}`;
      if (readdirSync(full).some((f) => f.startsWith("page."))) out.push(route);
      walk(full, route);
    }
  };
  walk(appDir, "");
  return out.sort();
}

export default function Home() {
  const pages = findLandingPages();

  return (
    <main id="main">
      <section className="fz-section">
        <div className="fz-container">
          <p className="fz-eyebrow">Founderz · interno</p>
          <h1>Laboratorio de landing pages</h1>
          <p className="fz-lead mt-4 max-w-[60ch]">
            Índice de las LPs generadas en este repositorio. Página interna, con
            <code> noindex, nofollow</code> como todo el dominio.
          </p>

          {pages.length === 0 ? (
            <div className="fz-card fz-card--lilac mt-10 max-w-[60ch]">
              <p>
                Todavía no hay ninguna LP. Créala con{" "}
                <code>npm run new -- --slug mi-lp --tipo webinar</code> o pide al
                agente <code>/founderz-lp</code> que la genere.
              </p>
            </div>
          ) : (
            <ul className="fz-list mt-10">
              {pages.map((p) => (
                <li key={p}>
                  <a className="fz-btn fz-btn--ghost" href={p}>
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
