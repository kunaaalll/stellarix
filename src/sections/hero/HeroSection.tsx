"use client";

import dynamic from "next/dynamic";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Canvas } from "@/lib/canvas";

const SceneLazy = dynamic(
  () => import("@/components/3d/Scene").then((m) => ({ default: m.Scene })),
  { ssr: false }
);

function SceneFallback() {
  return null;
}

const DEFER_HEAVY_MS = 2000;

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [allowHeavy, setAllowHeavy] = useState(false);
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
      setShowScene(true);
    }, 100);
    return () => window.clearTimeout(id);
  }, [allowHeavy]);

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-16"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
      aria-label="Hero"
    >
      {/* Background layers deferred to reduce main-thread work */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {/* Subtle glow behind 3D glasses to create contrast on dark background */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 45% 40% at 50% 38%, rgba(80,80,80,0.18) 0%, rgba(40,40,40,0.10) 50%, transparent 100%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(17,17,17,0.75) 0%, rgba(17,17,17,0.3) 70%, transparent 100%)",
          }}
          aria-hidden
        />
      </div>
      {/* 3D canvas deferred until after idle to improve LCP/TBT and reduce unused JS on initial load */}
      <div
        className={[
          "absolute inset-0 z-0 h-full w-full transition-opacity duration-1000",
          showScene ? "opacity-100" : "opacity-0",
        ].join(" ")}
        aria-hidden={!showScene}
      >
        {showScene && (
          <Canvas
            camera={{ position: [0, 0, 4], fov: 45 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
            className="absolute inset-0 h-full w-full"
          >
            <Suspense fallback={<SceneFallback />}>
              <SceneLazy />
            </Suspense>
          </Canvas>
        )}
      </div>
      <div
        className="relative z-10 flex flex-col items-center gap-6 px-6 text-center"
        style={{ textShadow: "0 2px 16px rgba(0,0,0,0.45), 0 1px 4px rgba(0,0,0,0.3)" }}
      >
        <p
          className="text-[0.7rem] font-body font-medium tracking-[0.4em] text-[#E8E8E8]"
          style={{ letterSpacing: "0.4em" }}
        >
          Precision Optics
        </p>
        <h1
          className="font-display font-light text-white tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(4rem, 10vw, 8rem)",
            lineHeight: 1.1,
          }}
        >
          <span className="italic text-[#CCCCCC]">/</span>Elaris
        </h1>
        <p
          className="max-w-md text-[0.95rem] font-medium leading-relaxed text-[#D0D0D0] md:text-base"
          style={{ fontFamily: "var(--font-body)", lineHeight: 1.8 }}
        >
          Refined vision, perfected through 60 years of optical mastery.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#elaris-series"
            className="inline-flex min-h-11 items-center justify-center rounded-[4px] bg-[#E8E8E8] px-7 py-3.5 text-sm font-medium tracking-[0.18em] text-[#111111] transition-colors duration-300 hover:bg-[#D0D0D0] focus:outline-none focus:ring-2 focus:ring-[#E8E8E8] focus:ring-offset-2 focus:ring-offset-[#111111]"
            style={{ textShadow: "none" }}
          >
            Elaris Series
          </a>
          <a
            href="#technology"
            className="inline-flex min-h-11 items-center justify-center rounded-[4px] border border-[#555555] px-7 py-3.5 text-sm font-medium tracking-[0.18em] text-[#D0D0D0] transition-colors duration-300 hover:border-[#E8E8E8] focus:outline-none focus:ring-2 focus:ring-[#E8E8E8] focus:ring-offset-2 focus:ring-offset-[#111111]"
          >
            Technology
          </a>
        </div>
      </div>
    </section>
  );
}
