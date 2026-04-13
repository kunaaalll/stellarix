"use client";

import dynamic from "next/dynamic";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Canvas } from "@/lib/canvas";

const SceneLazy = dynamic(
  () => import("@/components/3d/Scene").then((m) => ({ default: m.Scene })),
  { ssr: false }
);

const RippleGridLazy = dynamic(
  () => import("@/components/ui").then((m) => ({ default: m.RippleGrid })),
  { ssr: false }
);

function SceneFallback() {
  return null;
}

const DEFER_HEAVY_MS = 5500;

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [allowHeavy, setAllowHeavy] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const [showScene, setShowScene] = useState(false);

  useEffect(() => setMounted(true), []);

  const enableHeavy = useCallback(() => {
    setAllowHeavy(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const t = window.setTimeout(enableHeavy, DEFER_HEAVY_MS);
    const onScroll = () => {
      enableHeavy();
      window.removeEventListener("scroll", onScroll, { capture: true });
    };
    const onClick = () => {
      enableHeavy();
      window.removeEventListener("click", onClick, { capture: true });
    };
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("click", onClick, { capture: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("click", onClick, { capture: true });
    };
  }, [mounted, enableHeavy]);

  useEffect(() => {
    if (!allowHeavy) return;
    const id = window.setTimeout(() => {
      setShowRipple(true);
      setShowScene(true);
    }, 100);
    return () => window.clearTimeout(id);
  }, [allowHeavy]);

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#111111] pt-16"
      aria-label="Hero"
    >
      {/* Reserve space for canvas to avoid CLS; background layers deferred to reduce main-thread work */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {showRipple && (
          <RippleGridLazy
            enableRainbow={false}
            gridColor="#666666"
            rippleIntensity={0.01}
            gridSize={15}
            gridThickness={30}
            mouseInteraction={true}
            mouseInteractionRadius={1.2}
            opacity={0.20}
          />
        )}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.4) 70%, transparent 100%)",
          }}
          aria-hidden
        />
      </div>
      {/* 3D canvas deferred until after idle to improve LCP/TBT and reduce unused JS on initial load */}
      {showScene && (
        <Canvas
          camera={{ position: [0, 0, 4], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
          className="absolute inset-0 z-0 h-full w-full"
        >
          <Suspense fallback={<SceneFallback />}>
            <SceneLazy />
          </Suspense>
        </Canvas>
      )}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <p
          className="text-[0.7rem] font-body font-medium tracking-[0.4em] text-[#AAAAAA]"
          style={{ letterSpacing: "0.4em", textShadow: "0 1px 2px rgba(0,0,0,0.06)" }}
        >
          Precision Optics
        </p>
        <h1
          className="font-display font-light text-[#E8E8E8] tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(4rem, 10vw, 8rem)",
            lineHeight: 1.1,
          }}
        >
          <span className="italic text-[#AAAAAA]">/</span>Elaris
        </h1>
        <p
          className="max-w-md text-[0.95rem] font-medium leading-relaxed text-[#AAAAAA] md:text-base"
          style={{ fontFamily: "var(--font-body)", lineHeight: 1.8, textShadow: "0 1px 2px rgba(0,0,0,0.06)" }}
        >
          Refined vision, perfected through 60 years of optical mastery.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#elaris-series"
            className="inline-block rounded-[4px] bg-[#E8E8E8] px-6 py-3 text-[0.8rem] font-medium tracking-[0.18em] text-[#111111] transition-colors duration-300 hover:bg-[#D0D0D0] focus:outline-none focus:ring-2 focus:ring-[#E8E8E8] focus:ring-offset-2 focus:ring-offset-[#111111]"
          >
            Elaris Series
          </a>
          <a
            href="#technology"
            className="inline-block rounded-[4px] border border-[#333333] px-6 py-3 text-[0.8rem] font-medium tracking-[0.18em] text-[#AAAAAA] transition-colors duration-300 hover:border-[#E8E8E8] focus:outline-none focus:ring-2 focus:ring-[#E8E8E8] focus:ring-offset-2"
          >
            Technology
          </a>
        </div>
      </div>
    </section>
  );
}
