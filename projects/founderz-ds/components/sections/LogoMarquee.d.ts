import * as React from "react";

/** Founderz infinite logo marquee (banner-c). Pass image URLs or nodes. */
export interface LogoMarqueeProps {
  /** Logo image URLs or React nodes. */
  logos?: (string | React.ReactNode)[];
  surface?: "lilac" | "grey" | "none";
  className?: string;
  style?: React.CSSProperties;
}

export function LogoMarquee(props: LogoMarqueeProps): JSX.Element;
export default LogoMarquee;
