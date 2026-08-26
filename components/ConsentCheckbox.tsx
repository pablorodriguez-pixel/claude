/**
 * Regla obligatoria #6: checkbox de TyC `required` con enlace a la política de
 * privacidad, en todos los forms y por defecto.
 * `/webinar-maic` lo incumple hoy en producción — no repetirlo.
 */
export default function ConsentCheckbox({
  name = "legal_consent",
}: {
  name?: string;
}) {
  return (
    <label className="fz-consent">
      <input type="checkbox" name={name} required className="fz-consent__box" />
      <span>
        Acepto la{" "}
        <a
          href="https://founderz.com/es/privacidad"
          target="_blank"
          rel="noopener noreferrer"
        >
          política de privacidad
        </a>{" "}
        y los{" "}
        <a
          href="https://founderz.com/es/terminos-y-condiciones"
          target="_blank"
          rel="noopener noreferrer"
        >
          términos y condiciones
        </a>
        .
      </span>
    </label>
  );
}
