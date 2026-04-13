"use client";

import dynamic from "next/dynamic";

/**
 * R3F Canvas for Next.js: loaded only on client to avoid SSR/Three.js issues.
 * Use for any 3D scene; wrap children in Suspense with a fallback.
 */
export const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => ({ default: mod.Canvas })),
  { ssr: false }
);
