import "./globals.css";

export const metadata = {
  title: "Asistente RRHH · Founderz",
  description: "Resuelve dudas de RRHH al instante, con respuestas basadas en la documentación interna de Founderz.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
