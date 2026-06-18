import * as React from "react";

/**
 * Founderz site header (header-a): logo, nav items, two CTAs.
 * @startingPoint section="Navigation" subtitle="Site header / nav bar" viewport="1360x100"
 */
export interface HeaderProps {
  items?: React.ReactNode[];
  primaryLabel?: React.ReactNode;
  secondaryLabel?: React.ReactNode;
  /** Transparent white-text variant for sitting over a dark hero. */
  transparent?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function Header(props: HeaderProps): JSX.Element;
export default Header;
