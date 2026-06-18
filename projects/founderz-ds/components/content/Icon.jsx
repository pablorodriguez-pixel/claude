import React from "react";

/*
 * Founderz icon set — clean 24px outline icons, 1.8 stroke, rounded joins,
 * matching the brand's geometric line style. Paints with currentColor.
 * (Lucide-style outlines; see ICONOGRAPHY in the README.)
 */
const PATHS = {
  check: <polyline points="20 6 9 17 4 12" />,
  "arrow-right": <><line x1="4" y1="12" x2="20" y2="12" /><polyline points="14 6 20 12 14 18" /></>,
  "arrow-up-right": <><line x1="7" y1="17" x2="17" y2="7" /><polyline points="8 7 17 7 17 16" /></>,
  "chevron-down": <polyline points="6 9 12 15 18 9" />,
  "chevron-right": <polyline points="9 6 15 12 9 18" />,
  sparkles: <><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" /></>,
  wand: <><path d="M15 4V2" /><path d="M15 10V8" /><path d="M12.5 6.5h-2" /><path d="M19.5 6.5h-2" /><path d="M18 9l-1.5-1.5" /><path d="M18 4l-1.5 1.5" /><path d="M3 21l9-9" /><path d="M12.5 7.5l4 4" /></>,
  play: <polygon points="6 4 20 12 6 20 6 4" />,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" /></>,
  chart: <><line x1="4" y1="20" x2="20" y2="20" /><rect x="6" y="11" width="3" height="6" /><rect x="11" y="7" width="3" height="10" /><rect x="16" y="13" width="3" height="4" /></>,
  users: <><path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" /><circle cx="9" cy="7" r="3" /><path d="M22 19v-1a4 4 0 0 0-3-3.85" /><path d="M16 4.13A3 3 0 0 1 16 10" /></>,
  school: <><path d="M3 9l9-5 9 5-9 5-9-5z" /><path d="M7 11v5c0 1 2 2.5 5 2.5S17 17 17 16v-5" /><line x1="21" y1="9" x2="21" y2="14" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="3" y1="12" x2="21" y2="12" /></>,
  cpu: <><rect x="5" y="5" width="14" height="14" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="2" x2="9" y2="5" /><line x1="15" y1="2" x2="15" y2="5" /><line x1="9" y1="19" x2="9" y2="22" /><line x1="15" y1="19" x2="15" y2="22" /><line x1="2" y1="9" x2="5" y2="9" /><line x1="2" y1="15" x2="5" y2="15" /><line x1="19" y1="9" x2="22" y2="9" /><line x1="19" y1="15" x2="22" y2="15" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></>,
  star: <polygon points="12 2 15 9 22 9.5 17 14.5 18.5 21.5 12 17.5 5.5 21.5 7 14.5 2 9.5 9 9" />,
  globe: <><circle cx="12" cy="12" r="9" /><line x1="3" y1="12" x2="21" y2="12" /><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" /></>,
  award: <><circle cx="12" cy="9" r="6" /><path d="M9 14l-1.5 7L12 18l4.5 3L15 14" /></>,
  rocket: <><path d="M5 16c-1.5 1.5-2 5-2 5s3.5-.5 5-2c.8-.8.8-2 0-2.8s-2-.8-3 .8z" /><path d="M9 15l-3-3c1-4 4-9 11-9 0 7-5 10-9 11z" /><circle cx="14" cy="10" r="1.5" /></>,
  plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
  x: <><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></>,
  menu: <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>,
};

export function Icon({ name, size = 24, strokeWidth = 1.8, className = "", style = {}, ...rest }) {
  return (
    <svg
      className={`fz-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
      {...rest}
    >
      {PATHS[name] || null}
    </svg>
  );
}

export default Icon;
