// Configuración leída de variables de entorno (en Vercel: Settings → Environment Variables).

function requerida(nombre: string): string {
  const valor = process.env[nombre];
  if (!valor) throw new Error(`Falta la variable de entorno ${nombre}`);
  return valor;
}

export const config = {
  imap: {
    get host() { return process.env.IONOS_IMAP_HOST || "imap.ionos.es"; },
    get port() { return Number(process.env.IONOS_IMAP_PORT || 993); },
    get secure() { return process.env.IONOS_IMAP_SECURE !== "false"; },
    get usuario() { return requerida("IONOS_EMAIL"); },
    get password() { return requerida("IONOS_PASSWORD"); },
  },
  auth: {
    /** Contraseña que se pide al conectar el conector en Claude. */
    get password() {
      const p = requerida("CONNECTOR_PASSWORD");
      if (p.length < 12) throw new Error("CONNECTOR_PASSWORD debe tener al menos 12 caracteres");
      return p;
    },
    /** Secreto aleatorio para firmar los tokens. */
    get secreto() {
      const s = requerida("TOKEN_SECRET");
      if (s.length < 32) throw new Error("TOKEN_SECRET debe tener al menos 32 caracteres");
      return s;
    },
    /** Redirecciones OAuth extra permitidas, separadas por comas. */
    get redireccionesExtra() {
      return (process.env.EXTRA_REDIRECT_URIS || "").split(",").map(s => s.trim()).filter(Boolean);
    },
  },
  drive: {
    get url() { return requerida("DRIVE_WEBAPP_URL"); },
    get secreto() { return requerida("DRIVE_SECRET"); },
  },
  get cronSecret() { return process.env.CRON_SECRET; },
  get zonaHoraria() { return process.env.ZONA_HORARIA || "Europe/Madrid"; },
};
