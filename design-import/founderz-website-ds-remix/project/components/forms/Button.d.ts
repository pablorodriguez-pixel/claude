import * as React from "react";

export type ButtonVariant =
  | "primary"
  | "second"
  | "second-outlined"
  | "third"
  | "third-outlined";

export type ButtonSize = "sm" | "md" | "lg";

/**
 * Founderz pill button (button-a). Sentence case, never UPPERCASE.
 *
 * @startingPoint section="Components" subtitle="Pill button — 5 brand variants" viewport="700x180"
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /** Visual style. primary=purple (on white), second=white (on dark), third=black. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Optional leading icon node. */
  icon?: React.ReactNode;
  /** Optional trailing icon node. */
  iconRight?: React.ReactNode;
  /** Render as another element, e.g. "a". */
  as?: keyof JSX.IntrinsicElements;
}

export function Button(props: ButtonProps): JSX.Element;
export default Button;
