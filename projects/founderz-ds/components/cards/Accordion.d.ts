import * as React from "react";

/**
 * Founderz accordion (card-d) — FAQ / syllabus disclosure.
 * @startingPoint section="Components" subtitle="FAQ / syllabus accordion" viewport="700x200"
 */
export interface AccordionProps {
  question: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  /** Controlled open state (omit for self-managed). */
  open?: boolean;
  onToggle?: (next: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function Accordion(props: AccordionProps): JSX.Element;
export default Accordion;
