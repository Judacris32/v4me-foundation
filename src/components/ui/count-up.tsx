"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

type CountUpProps = {
  /** Final integer value to land on. */
  value: number;
  duration?: number;
  /** Text appended after the number once it settles (e.g. "+"). */
  suffix?: string;
  className?: string;
};

/**
 * Ticks a number up from 0 to `value` once it scrolls into view, then stays
 * put (viewport trigger runs once, same convention as <Reveal>).
 */
export function CountUp({ value, duration = 1.4, suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
