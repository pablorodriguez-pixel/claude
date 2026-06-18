import * as React from "react";

/**
 * Founderz section header (heading-a): label + h2 + details + optional action.
 * @startingPoint section="Components" subtitle="Section heading block" viewport="700x260"
 */
export interface SectionHeadingProps {
  /** Purple UPPERCASE eyebrow label. */
  label?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  /** White text for dark/purple surfaces. */
  onDark?: boolean;
  /** Optional CTA / nav rendered under the description. */
  action?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function SectionHeading(props: SectionHeadingProps): JSX.Element;
export default SectionHeading;
