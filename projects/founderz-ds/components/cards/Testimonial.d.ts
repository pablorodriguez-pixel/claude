import * as React from "react";

/**
 * Founderz testimonial card (testimonial-a): grey card + quote + avatar.
 * @startingPoint section="Components" subtitle="Testimonial card" viewport="420x320"
 */
export interface TestimonialProps {
  quote: React.ReactNode;
  name: React.ReactNode;
  role?: React.ReactNode;
  avatar: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Testimonial(props: TestimonialProps): JSX.Element;
export default Testimonial;
