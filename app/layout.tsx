import type { Metadata, Viewport } from "next";
import DeferredScripts from "@/components/DeferredScripts";
import "../styles/founderz.css";

/**
 * Layout raíz. Concentra las tres reglas de dominio (memory/01):
 *   #1 noindex, nofollow      #2 GTM GTM-5B9S6LB      #3 HubSpot 25912905
 * Las dos últimas van diferidas dentro de <DeferredScripts>.
 */
export const metadata: Metadata = {
  title: {
    default: "Founderz",
    template: "%s | Founderz",
  },
  robots: { index: false, follow: false },
  metadataBase: new URL("https://ia.founderz.com"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const PRELOAD_FONTS = [
  "RundDisplay-Regular",
  "RundDisplay-Medium",
  "RundDisplay-SemiBold",
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        {PRELOAD_FONTS.map((f) => (
          <link
            key={f}
            rel="preload"
            href={`/fonts/${f}.woff2`}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
        <link rel="preconnect" href="https://js-eu1.hs-scripts.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body>
        <a className="fz-skip" href="#main">
          Saltar al contenido
        </a>
        {children}
        <DeferredScripts />
      </body>
    </html>
  );
}
