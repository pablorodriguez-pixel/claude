import type { MetadataRoute } from "next";

/** Regla obligatoria #1: el dominio entero fuera de los índices. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
