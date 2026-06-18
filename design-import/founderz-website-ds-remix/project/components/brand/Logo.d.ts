import * as React from "react";

/**
 * Founderz logo — full wordmark or the standalone F mark. Inherits currentColor.
 * @startingPoint section="Components" subtitle="Founderz logo (wordmark + mark)" viewport="700x140"
 */
export interface LogoProps extends React.SVGAttributes<SVGElement> {
  variant?: "wordmark" | "mark";
  /** Rendered height in px (width scales). */
  height?: number;
  color?: string;
  title?: string;
}

export function Logo(props: LogoProps): JSX.Element;
export default Logo;
