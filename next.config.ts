import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Todas las LPs son estáticas: se prerenderizan en build (objetivo PSI >= 98).
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Las imágenes se sirven locales desde public/<slug>/. Nada de hotlink a WP.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Regla obligatoria #1: noindex en todo el dominio, también a nivel cabecera.
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
