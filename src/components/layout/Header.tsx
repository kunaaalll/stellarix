"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

export function Header() {
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const menuId = useId();
  const menuRef = useRef<HTMLUListElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key !== "Tab") return;
      const root = menuRef.current;
      if (!root) return;

      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && (active === first || active === null)) {
        e.preventDefault();
        last.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    const raf = window.requestAnimationFrame(() => {
      const firstLink = menuRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      firstLink?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.cancelAnimationFrame(raf);
    };
  }, [menuOpen]);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 border-b bg-background-elevated border-border"
      style={{ borderBottomWidth: "0.5px" }}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between" aria-label="Main">
          <Link
            href="/"
            className="flex items-center transition-opacity duration-300 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Stellarix – Home"
          >
            {logoError ? (
              <span className="font-display text-lg tracking-[0.18em] text-foreground">
                Stellarix
              </span>
            ) : (
              <span className="relative block h-8 w-[140px] overflow-hidden">
                <Image
                  src="/stellarix-logo.png"
                  alt="Stellarix"
                  fill
                  sizes="140px"
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
                  priority
                  unoptimized
                  onError={() => setLogoError(true)}
                />
              </span>
            )}
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 text-[0.8rem] font-body font-medium tracking-[0.2em] text-foreground-secondary md:flex">
            <li>
              <Link
                href="#elaris-series"
                className="rounded transition-colors duration-200 hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
              >
                Elaris Series
              </Link>
            </li>
            <li>
              <Link
                href="#technology"
                className="rounded transition-colors duration-200 hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
              >
                Technology
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                className="rounded transition-colors duration-200 hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="rounded transition-colors duration-200 hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              ref={menuButtonRef}
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-200 hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls={menuId}
            >
              {menuOpen ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <ul
          id={menuId}
          ref={menuRef}
          className={[
            menuOpen ? "flex" : "hidden",
            "md:hidden",
            "flex-col",
            "absolute left-0 right-0 top-16",
            "bg-background-elevated",
            "p-6 gap-6",
            "border-b border-border",
            "text-[0.9rem] font-body font-medium tracking-[0.2em] text-foreground-secondary",
          ].join(" ")}
          role="list"
        >
          <li>
            <Link
              href="#elaris-series"
              onClick={() => setMenuOpen(false)}
              className="block rounded px-2 py-2 transition-colors duration-200 hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            >
              Elaris Series
            </Link>
          </li>
          <li>
            <Link
              href="#technology"
              onClick={() => setMenuOpen(false)}
              className="block rounded px-2 py-2 transition-colors duration-200 hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            >
              Technology
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              onClick={() => setMenuOpen(false)}
              className="block rounded px-2 py-2 transition-colors duration-200 hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="block rounded px-2 py-2 transition-colors duration-200 hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            >
              Contact
            </Link>
          </li>
        </ul>
      </Container>
    </header>
  );
}
