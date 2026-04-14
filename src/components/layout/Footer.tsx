"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { useTheme } from "@/context/ThemeContext";

export function Footer() {
  const { theme } = useTheme();
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="border-t border-border bg-background-secondary py-12">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link
            href="/"
            className="flex items-center rounded transition-opacity duration-300 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Stellarix – Home"
          >
            {logoError ? (
              <span className="font-display text-base tracking-[0.18em] text-foreground">
                Stellarix
              </span>
            ) : (
              <span className="relative block h-7 w-[120px] overflow-hidden">
                <Image
                  src="/stellarix-logo.png"
                  alt="Stellarix"
                  fill
                  sizes="120px"
                  className="object-contain"
                  style={{
                    objectPosition: "left center",
                    ...(theme === "dark"
                      ? {
                          filter: "invert(1) brightness(1.25) contrast(1)",
                          mixBlendMode: "screen",
                        }
                      : { filter: "none" }),
                  }}
                  loading="lazy"
                  unoptimized
                  onError={() => setLogoError(true)}
                />
              </span>
            )}
          </Link>
          <ul className="flex gap-6 text-sm text-foreground-muted" role="list">
            <li>
              <Link
                href="#elaris-series"
                className="block rounded px-2 py-2 transition-colors duration-300 hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background md:px-0 md:py-0"
              >
                Elaris Series
              </Link>
            </li>
            <li>
              <Link
                href="#technology"
                className="block rounded px-2 py-2 transition-colors duration-300 hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background md:px-0 md:py-0"
              >
                Technology
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                className="block rounded px-2 py-2 transition-colors duration-300 hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background md:px-0 md:py-0"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="block rounded px-2 py-2 transition-colors duration-300 hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background md:px-0 md:py-0"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <p
          className="mt-8 text-center text-sm text-foreground-muted"
          suppressHydrationWarning
        >
          &copy; {new Date().getFullYear()} Stellarix &mdash; Elaris Precision Optics.
        </p>
      </Container>
    </footer>
  );
}
