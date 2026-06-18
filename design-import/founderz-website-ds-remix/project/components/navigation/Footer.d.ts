import * as React from "react";

export interface FooterColumn {
  title: React.ReactNode;
  links: React.ReactNode[];
}

/** Founderz footer (footer-a): purple surface, F mark, link columns, legal row. */
export interface FooterProps {
  columns?: FooterColumn[];
  legal?: React.ReactNode;
  address?: React.ReactNode;
  phone?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Footer(props: FooterProps): JSX.Element;
export default Footer;
