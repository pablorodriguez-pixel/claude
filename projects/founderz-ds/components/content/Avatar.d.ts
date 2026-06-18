import * as React from "react";

/** Founderz avatar row (avatar-a): photo + name (purple) + role (muted). */
export interface AvatarProps {
  src: string;
  name: React.ReactNode;
  role?: React.ReactNode;
  /** Photo diameter in px (default 48). */
  size?: number;
  onDark?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function Avatar(props: AvatarProps): JSX.Element;
export default Avatar;
