import * as React from "react";

export type IconName =
  | "check" | "arrow-right" | "arrow-up-right" | "chevron-down" | "chevron-right"
  | "sparkles" | "wand" | "play" | "calendar" | "chart" | "users" | "school"
  | "briefcase" | "cpu" | "clock" | "star" | "globe" | "award" | "rocket"
  | "plus" | "x" | "menu";

/** Founderz outline icon — 24px, 1.8 stroke, currentColor. */
export interface IconProps extends React.SVGAttributes<SVGElement> {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}

export function Icon(props: IconProps): JSX.Element;
export default Icon;
