"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

const SCENERY_IMAGE =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=75";

export function OpticalLensSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const clearLensRef = useRef<HTMLDivElement>(null);
  const lensRimRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !clearLensRef.current || !lensRimRef.current || !textRef.current)
        return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        clearLensRef.current.style.clipPath = "none";
        lensRimRef.current.style.opacity = "1";
        lensRimRef.current.style.transform = "none";
        textRef.current.style.opacity = "1";
        textRef.current.style.filter = "none";
        return;
      }

      let cancelled = false;
      let cleanup: (() => void) | undefined;

      Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
        .then(([gsapModule, stModule]) => {
          if (cancelled) return;
          if (!sectionRef.current || !clearLensRef.current || !lensRimRef.current || !textRef.current) return;

          const gsap = (gsapModule as { default: unknown }).default as typeof import("gsap").default;
          const ScrollTrigger = (stModule as { ScrollTrigger: unknown }).ScrollTrigger as typeof import("gsap/ScrollTrigger").ScrollTrigger;

          gsap.registerPlugin(ScrollTrigger);

          const tl = gsap.timeline();
          const st = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: () => {
              const header = document.querySelector("header");
              const headerH = header?.getBoundingClientRect().height ?? 64;
              return `top top+=${Math.round(headerH)}`;
            },
            end: "+=100%",
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            animation: tl,
          });

          // Grow the "clear" circle (clip-path) — lens reveals sharp view; size matches rim (85vmin = 42.5vmin radius)
          tl.fromTo(
            clearLensRef.current!,
            { clipPath: "circle(0vmin at 50% 50%)" },
            {
              clipPath: "circle(42.5vmin at 50% 50%)",
              duration: 1,
              ease: "power2.out",
            },
            0
          )
            // Lens rim scales with the reveal
            .fromTo(
              lensRimRef.current!,
              { scale: 0.25, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
              },
              0
            )
            // Text fades in once lens is visible
            .fromTo(
              textRef.current!,
              { opacity: 0, filter: "blur(8px)" },
              {
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "power2.out",
              },
              0.35
            );

          ScrollTrigger.refresh();
          cleanup = () => {
            st.kill();
            tl.kill();
          };
        })
        .catch(() => {});

      return () => {
        cancelled = true;
        cleanup?.();
      };
    },
    { dependencies: [], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="optical"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background-secondary"
      aria-label="Optical lens"
    >
      {/* Layer 1: Blurred background — how you see without glasses */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 scale-105" style={{ filter: "blur(20px)" }}>
          <Image
            src={SCENERY_IMAGE}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            fetchPriority="low"
          />
        </div>
        <div
          className="absolute inset-0 bg-background/60"
          aria-hidden
        />
      </div>

      {/* Layer 2: Same image, sharp — only visible inside the growing circle (the lens) */}
      <div
        ref={clearLensRef}
        className="absolute inset-0 z-10 overflow-hidden"
        style={{ clipPath: "circle(0vmin at 50% 50%)" }}
      >
        <Image
          src={SCENERY_IMAGE}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          fetchPriority="low"
        />
        <div
          className="absolute inset-0 bg-background/30"
          aria-hidden
        />
      </div>

      {/* Layer 3: Lens rim (circle frame) so the lens reads clearly */}
      <div
        ref={lensRimRef}
        className="absolute z-20 flex h-[75vmin] w-[75vmin] max-h-[720px] max-w-[720px] items-center justify-center rounded-full pointer-events-none sm:h-[85vmin] sm:w-[85vmin]"
        style={{
          border: "2px solid var(--color-accent)",
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)",
        }}
        aria-hidden
      >
        {/* Text sits inside the lens rim */}
        <div
          ref={textRef}
          className="relative z-10 max-w-[75%] text-center will-change-transform"
        >
          <h2
            className="font-display font-light tracking-tight text-foreground md:text-5xl"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            Superior clarity &amp; light transmission
          </h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-foreground-secondary md:text-xl">
            High-transmission anti-reflective coatings for exceptional visual
            clarity and reduced glare — so you see exactly what matters.
          </p>
        </div>
      </div>
    </section>
  );
}
