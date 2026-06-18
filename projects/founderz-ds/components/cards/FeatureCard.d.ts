import * as React from "react";

/**
 * Founderz feature card (card-e / card-f): icon + title + text.
 * @startingPoint section="Components" subtitle="Feature / benefit card" viewport="380x260"
 */
export interface FeatureCardProps {
  /** 32px icon node (inherits purple via currentColor). */
  icon?: React.ReactNode;
  title?: React.ReactNode;
  children?: React.ReactNode;
  surface?: "white" | "grey" | "lilac";
  /** Lilac hairline border (card-f) for grids on dark backgrounds. */
  bordered?: boolean;
  /** Optional image pinned to the bottom of the card. */
  image?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function FeatureCard(props: FeatureCardProps): JSX.Element;
export default FeatureCard;
