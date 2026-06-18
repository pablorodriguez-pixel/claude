import * as React from "react";

/** Labelled form field: small label over an <Input> (or custom children). */
export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  htmlFor?: string;
  /** Provide a custom control instead of the default Input. */
  children?: React.ReactNode;
}

export function Field(props: FieldProps): JSX.Element;
export default Field;
