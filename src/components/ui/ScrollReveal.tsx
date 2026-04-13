"use client";

import { type ReactNode } from "react";
import { useScrollReveal, type ScrollRevealOptions } from "@/hooks";

interface ScrollRevealProps extends ScrollRevealOptions {
  children: ReactNode;
  as?: "div" | "section" | "article";
  className?: string;
}

/**
 * Wrapper that reveals children on scroll via GSAP ScrollTrigger.
 */
export function ScrollReveal({
  children,
  as: Tag = "div",
  className = "",
  ...options
}: ScrollRevealProps) {
  const ref = useScrollReveal<HTMLElement>(options);
  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={className}>
      {children}
    </Tag>
  );
}
