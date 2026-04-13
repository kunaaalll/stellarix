"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main"
      className="flex min-h-screen flex-col items-center justify-center bg-[#111111] px-4"
      role="main"
    >
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-light text-[#E8E8E8] md:text-3xl">
          Something went wrong
        </h1>
        <p className="mt-3 text-[#AAAAAA]">
          We couldn’t load this page. Please try again.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="rounded-[6px] border border-[#E8E8E8] bg-transparent px-5 py-2.5 text-sm font-medium text-[#E8E8E8] transition-colors hover:bg-[#E8E8E8] hover:text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#E8E8E8] focus:ring-offset-2"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-[6px] bg-[#E8E8E8] px-5 py-2.5 text-sm font-medium text-[#111111] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#E8E8E8] focus:ring-offset-2"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
