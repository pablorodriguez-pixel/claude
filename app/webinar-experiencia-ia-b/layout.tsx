import type { Metadata } from "next";

// Regla obligatoria #1: noindex en cada LP, sin excepción.
export const metadata: Metadata = {
  title: "¿Distingues un prompt de júnior de uno de sénior?",
  description:
    "Tres rondas, un toque cada una. Descubre qué separa a quien domina la herramienta de quien aplica criterio, y reserva plaza en el webinar gratuito del 8 y 9 de septiembre.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
