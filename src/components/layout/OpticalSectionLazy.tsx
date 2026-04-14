"use client";

import dynamic from "next/dynamic";
import { LazyWhenInView } from "./LazyWhenInView";

const OpticalLensSection = dynamic(
  () => import("@/sections/optical-lens").then((m) => ({ default: m.OpticalLensSection })),
  { ssr: false, loading: () => <section className="min-h-screen bg-background-secondary" aria-hidden /> }
);

export function OpticalSectionLazy() {
  return (
    <LazyWhenInView fallback={<section className="min-h-screen bg-background-secondary" aria-hidden />}>
      <OpticalLensSection />
    </LazyWhenInView>
  );
}
