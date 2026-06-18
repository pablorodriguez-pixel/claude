import * as React from "react";

/** Founderz form input — white fill, 8px radius, hairline border. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Render as "input", "textarea", or "select". */
  as?: "input" | "textarea" | "select";
}

export function Input(props: InputProps): JSX.Element;
export default Input;
