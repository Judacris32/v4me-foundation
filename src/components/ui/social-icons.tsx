import type { SVGProps } from "react";

/**
 * Small brand marks for the footer's social row. lucide-react's current
 * version ships no brand/social icons, so these are minimal hand-drawn
 * SVGs (standard, widely-used glyphs for each platform) sized to match
 * lucide's 24x24 viewBox convention.
 */

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.7h2.6l.4-3h-3V8.4c0-.9.24-1.5 1.56-1.5H16.6V4.14C16.3 4.1 15.3 4 14.1 4c-2.4 0-4 1.47-4 4.16v2.14H7.5v3h2.6V21h3.4Z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.9 10.6 20.3 3h-2.1l-5.4 6.2L8.3 3H3l6.7 9.6L3 21h2.1l5.7-6.6L15.7 21H21l-7.1-10.4Zm-2 2.9-.7-1L5.9 4.6h2l4.3 6.1.7 1 5.6 8h-2l-4.6-6.6Z" />
    </svg>
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.94 8.5H3.56V21h3.38V8.5ZM5.25 3a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM21 21v-6.94c0-3.71-1.98-5.44-4.62-5.44a3.98 3.98 0 0 0-3.61 1.99V8.5H9.4c.04.96 0 12.5 0 12.5h3.37v-6.98c0-.37.03-.75.14-1.02.3-.75 1-1.53 2.16-1.53 1.52 0 2.13 1.16 2.13 2.86V21H21Z" />
    </svg>
  );
}

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.6 7.7a3 3 0 0 0-2.1-2.1C17.8 5 12 5 12 5s-5.8 0-7.5.6a3 3 0 0 0-2.1 2.1C2 9.4 2 12 2 12s0 2.6.4 4.3a3 3 0 0 0 2.1 2.1C6.2 19 12 19 12 19s5.8 0 7.5-.6a3 3 0 0 0 2.1-2.1c.4-1.7.4-4.3.4-4.3s0-2.6-.4-4.3ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z" />
    </svg>
  );
}
