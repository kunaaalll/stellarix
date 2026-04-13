import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Stellarix",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#111111] px-6 text-center">
      {/* Eyebrow */}
      <p className="mb-4 font-body text-xs tracking-[0.35em] text-[#666666] uppercase">
        404 — Not Found
      </p>

      {/* Heading */}
      <h1 className="font-display text-5xl font-light leading-tight text-[#E8E8E8] md:text-7xl">
        Lost in the lens.
      </h1>

      {/* Sub-copy */}
      <p className="mt-6 max-w-md font-body text-sm leading-relaxed tracking-wide text-[#AAAAAA]">
        This page doesn&apos;t exist — but precision does. Return to Elaris and find what you&apos;re looking for.
      </p>

      {/* CTA */}
      <Link
        href="/"
        className="mt-10 inline-block rounded-[6px] border border-[#E8E8E8] px-7 py-3 font-body text-xs tracking-[0.2em] text-[#E8E8E8] uppercase transition-colors duration-300 hover:bg-[#E8E8E8] hover:text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#E8E8E8] focus:ring-offset-2 focus:ring-offset-[#111111]"
      >
        Return to Elaris
      </Link>

      {/* Decorative line */}
      <div className="mt-16 h-px w-24 bg-[#2A2A2A]" />
    </main>
  );
}
