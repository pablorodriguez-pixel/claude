import * as React from "react";

/** Founderz inline arrow link (link-a) — small/bold/purple with a chevron. */
export interface LinkArrowProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href?: string;
  /** Override text + arrow color (e.g. white on dark surfaces). */
  color?: string;
}

export function LinkArrow(props: LinkArrowProps): JSX.Element;
export default LinkArrow;
