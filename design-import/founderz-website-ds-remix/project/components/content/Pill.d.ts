import * as React from "react";

/**
 * Founderz pill / badge (pill-a).
 * @startingPoint section="Components" subtitle="Pills & category badges" viewport="700x140"
 */
export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  /** default=lilac/purple, second=outline black, third=outline white (on dark). */
  variant?: "default" | "second" | "third";
  /** UPPERCASE + wider tracking — for category pills only. */
  uppercase?: boolean;
}

export function Pill(props: PillProps): JSX.Element;
export default Pill;
