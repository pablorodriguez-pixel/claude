/**
 * Acordeón sobre <details>/<summary> nativos: accesible sin JS y sin coste de
 * hidratación. Es el patrón que usan /compliance y /fundae en producción.
 */
export type AccordionItem = {
  q: string;
  a: React.ReactNode;
};

export default function Accordion({
  items,
  name,
}: {
  items: AccordionItem[];
  /** Mismo `name` en todos los items = solo uno abierto a la vez. */
  name?: string;
}) {
  return (
    <div className="fz-accordion">
      {items.map((item, i) => (
        <details key={i} className="fz-accordion__item" name={name}>
          <summary className="fz-accordion__trigger">
            <span>{item.q}</span>
            <svg className="fz-accordion__icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 5v14M5 12h14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </summary>
          <div className="fz-accordion__panel">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
