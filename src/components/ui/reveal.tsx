"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds — handy for sequencing sibling reveals. */
  delay?: number;
  /** Vertical offset (px) the content travels in from. */
  offset?: number;
};

/**
 * Fades + slides content up once it scrolls into view. Wraps a single
 * block-level child; runs once (`viewport.once`) so it never re-triggers
 * on scroll-up.
 */
export function Reveal({ children, className, delay = 0, offset = 24 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
