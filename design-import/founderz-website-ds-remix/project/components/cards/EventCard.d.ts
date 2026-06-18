import * as React from "react";

/** Founderz event card (card-j): lilac date block + label + title + speaker. */
export interface EventCardProps {
  day: React.ReactNode;
  month: React.ReactNode;
  label?: React.ReactNode;
  title: React.ReactNode;
  speaker?: React.ReactNode;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function EventCard(props: EventCardProps): JSX.Element;
export default EventCard;
