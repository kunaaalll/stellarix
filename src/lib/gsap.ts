/**
 * GSAP + ScrollTrigger setup for Next.js (client-only).
 * Register ScrollTrigger once so it's available everywhere.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
