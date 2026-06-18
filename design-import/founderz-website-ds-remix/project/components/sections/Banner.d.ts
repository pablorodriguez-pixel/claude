import * as React from "react";

/** Founderz partnership banner (banner-b): lilac box, text + logo/aside. */
export interface BannerProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Right-hand visual, e.g. a partner logo. */
  aside?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Banner(props: BannerProps): JSX.Element;
export default Banner;
