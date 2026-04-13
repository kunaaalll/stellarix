"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";

export type ScrollRevealOptions = {
  y?: number;
  opacity?: number;
  duration?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
};

/**
 * Reveal animation on scroll using GSAP ScrollTrigger.
 * Use in a client component with a ref on the element to animate.
 */
export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);
  const {
    y = 48,
    opacity = 0,
    duration = 0.8,
    start = "top 85%",
    end = "top 20%",
    scrub = true,
  } = options;

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { y, opacity },
        {
          y: 0,
          opacity: 1,
          duration,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            end,
            scrub: typeof scrub === "number" ? scrub : 1,
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { dependencies: [start, end] }
  );

  return ref;
}
