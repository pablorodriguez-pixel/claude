import * as React from "react";

/** Founderz stat card (card-i): oversized number + supporting label. */
export interface StatCardProps {
  value: React.ReactNode;
  label: React.ReactNode;
  surface?: "purple" | "grey" | "lilac" | "white";
  className?: string;
  style?: React.CSSProperties;
}

export function StatCard(props: StatCardProps): JSX.Element;
export default StatCard;
