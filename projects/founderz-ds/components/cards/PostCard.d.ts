import * as React from "react";

/**
 * Founderz post card (card-h): tall image + floating box, hover turns purple.
 * @startingPoint section="Components" subtitle="Blog / resource post card" viewport="400x440"
 */
export interface PostCardProps {
  image?: string;
  category?: React.ReactNode;
  title: React.ReactNode;
  href?: string;
  linkLabel?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function PostCard(props: PostCardProps): JSX.Element;
export default PostCard;
