import * as React from "react";

/**
 * Founderz full-width CTA banner (purple / dark / lilac).
 * @startingPoint section="Sections" subtitle="Closing CTA banner" viewport="1360x360"
 */
export interface BannerCTAProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
  surface?: "purple" | "dark" | "lilac";
  className?: string;
  style?: React.CSSProperties;
}

export function BannerCTA(props: BannerCTAProps): JSX.Element;
export default BannerCTA;
