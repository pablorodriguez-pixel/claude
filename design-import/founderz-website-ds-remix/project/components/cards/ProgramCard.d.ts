import * as React from "react";

/**
 * Founderz interactive program card (card-g): cover image + overlay, expands
 * when `active` to reveal pills, price and a circular arrow button.
 * @startingPoint section="Components" subtitle="Interactive program card" viewport="520x440"
 */
export interface ProgramCardProps {
  image?: string;
  type?: React.ReactNode;
  duration?: React.ReactNode;
  title: React.ReactNode;
  categories?: React.ReactNode[];
  description?: React.ReactNode;
  /** New price, e.g. "2.400 €". */
  price?: React.ReactNode;
  /** Struck-through original price. */
  priceOld?: React.ReactNode;
  /** Expanded state (wider column in a grid). */
  active?: boolean;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ProgramCard(props: ProgramCardProps): JSX.Element;
export default ProgramCard;
