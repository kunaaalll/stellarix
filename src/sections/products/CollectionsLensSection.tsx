"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/layout";
import { useTheme } from "@/context/ThemeContext";

interface LensFeature {
  label: string;
  footnote?: string;
}

interface LensCard {
  id: string;
  name: string;
  tagline: string;
  tier: string;
  accentBar: string;
  accentBarLight: string;
  image: string;
  features: LensFeature[];
}

const LENS_SERIES: LensCard[] = [
  {
    id: "elaris",
    name: "Elaris",
    tier: "01 — Essential",
    tagline: "The essential foundation of precision optics.",
    accentBar: "#333333",
    accentBarLight: "#C0C0C0",
    image: "/lenses/elaris.png",
    features: [
      { label: "Super Hydrophobic & Oleophobic Shield" },
      { label: "Double Aspheric Lens Design" },
      { label: "BLI+\u2122 Blue Light Filtering Technology" },
    ],
  },
  {
    id: "clear",
    name: "Elaris Clear",
    tier: "02 — Clarity",
    tagline: "Ultra-transparent optics with camera-ready clarity.",
    accentBar: "#888888",
    accentBarLight: "#888888",
    image: "/lenses/elaris-clear.png",
    features: [
      { label: "Super Hydrophobic & Oleophobic Shield" },
      { label: "Double Aspheric Lens Design" },
      { label: "BLI+\u2122 Blue Light Filtering Technology" },
      { label: "Ultra-High Transparency Lens" },
      {
        label:
          "Camera-Ready Anti-Glare \u2014 eliminates reflective glare on lenses during photography, video calls, and on-screen appearances",
      },
    ],
  },
  {
    id: "drive",
    name: "Elaris Drive",
    tier: "03 — Performance",
    tagline: "Engineered for confident night-time driving.",
    accentBar: "#444444",
    accentBarLight: "#BBBBBB",
    image: "/lenses/elaris-drive.png",
    features: [
      { label: "Super Hydrophobic & Oleophobic Shield" },
      { label: "Double Aspheric Lens Design" },
      { label: "BLI+\u2122 Blue Light Filtering Technology" },
      { label: "Ultra-High Transparency Lens" },
      {
        label:
          "Camera-Ready Anti-Glare \u2014 eliminates reflective glare on lenses during photography, video calls, and on-screen appearances",
      },
      {
        label:
          "NightDrive Coating\u00b9 \u2014 proprietary drive-optimised coating that reduces headlight and streetlight glare by up to 65%, enhancing night-time visibility and comfort",
        footnote: "\u00b9 65% glare reduction measured under controlled test conditions.",
      },
    ],
  },
  {
    id: "fusion",
    name: "Elaris Fusion",
    tier: "04 — Premium",
    tagline: "Maximum durability meets optical excellence.",
    accentBar: "#E8E8E8",
    accentBarLight: "#1A1A1A",
    image: "/lenses/elaris-fusion.png",
    features: [
      { label: "Super Hydrophobic & Oleophobic Shield" },
      { label: "Double Aspheric Lens Design" },
      { label: "BLI+\u2122 Blue Light Filtering Technology" },
      { label: "Ultra-High Transparency Lens" },
      {
        label:
          "Camera-Ready Anti-Glare \u2014 eliminates reflective glare on lenses during photography, video calls, and on-screen appearances",
      },
      {
        label:
          "Extreme Scratch Shield\u00b9 \u2014 up to 75% more scratch-resistant than standard lenses, extending durability, longevity, and long-term vision clarity",
        footnote: "\u00b9 75% scratch resistance measured under controlled test conditions.",
      },
    ],
  },
];

const CARD_HEIGHT = 420;

function FlipCard({ lens, isActive, wiggleDelay }: { lens: LensCard; isActive: boolean; wiggleDelay: number }) {
  const [flipped, setFlipped] = useState(false);
  const [wiggling, setWiggling] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (hasInteracted) return;
    if (!isActive) return;

    const timeout = window.setTimeout(() => {
      setWiggling(true);
    }, 120);

    return () => window.clearTimeout(timeout);
  }, [isActive, hasInteracted]);

  useEffect(() => {
    if (hasInteracted) return;
    const timeout = window.setTimeout(() => {
      setWiggling(true);
    }, wiggleDelay);
    return () => window.clearTimeout(timeout);
  }, [wiggleDelay, hasInteracted]);

  return (
    <div
      className="min-w-[85vw] w-[85vw] max-w-[380px] flex-shrink-0 snap-start cursor-pointer select-none sm:min-w-[290px] sm:w-[80vw]"
      style={{ perspective: "1200px", height: CARD_HEIGHT }}
      onClick={() => { setFlipped((f) => !f); setHasInteracted(true); setWiggling(false); }}
      role="button"
      aria-label={`${lens.name} — ${flipped ? "tap to see front" : "tap to see features"}`}
    >
      <div
        className={wiggling ? "card-wiggle" : ""}
        onAnimationEnd={() => setWiggling(false)}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: wiggling ? undefined : "transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: 12,
            borderWidth: "0.5px",
            borderStyle: "solid",
            borderColor: isActive ? "var(--color-accent)" : "var(--color-border-light)",
            background: "var(--color-bg-card-front)",
            overflow: "hidden",
          }}
        >
          {/* Full-bleed photo (hide if missing) */}
          {!imageError && (
            <Image
              src={lens.image}
              alt={lens.name}
              fill
              className="object-cover object-center"
              sizes="380px"
              onError={() => setImageError(true)}
            />
          )}
          {imageError && (
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 90% at 50% 35%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 45%, rgba(0,0,0,0.10) 100%)",
              }}
            />
          )}

          {/* Gradient overlay — bottom two-thirds */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(var(--color-overlay-gradient-rgb),0.92) 0%, rgba(var(--color-overlay-gradient-rgb),0.55) 45%, transparent 75%)",
              borderRadius: 12,
            }}
          />

          {/* Tier accent bar at top */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: theme === "dark" ? lens.accentBar : lens.accentBarLight,
              borderRadius: "12px 12px 0 0",
            }}
          />

          {/* Text content pinned to bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "0 24px 24px",
            }}
          >
            <p
              className="font-body"
              style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.45)", marginBottom: 8 }}
            >
              {lens.tier}
            </p>
            <h3
              className="font-display"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "1.7rem",
                lineHeight: 1.1,
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
              }}
            >
              {lens.name}
            </h3>
            <p
              className="font-body"
              style={{ marginTop: 6, fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}
            >
              {lens.tagline}
            </p>
            <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p className="font-body" style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>
                {lens.features.length} features
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div
                  className="font-body"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: "0.75rem",
                    letterSpacing: "0.18em",
                    color: "rgba(255,255,255,0.72)",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 22,
                      padding: "0 10px",
                      borderRadius: 999,
                      border: "0.5px solid rgba(255,255,255,0.22)",
                      background: "rgba(0,0,0,0.18)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.78)",
                      flexShrink: 0,
                    }}
                  >
                    Flip
                  </span>
                  <span className="hidden md:inline">Click to flip</span>
                  <span className="md:hidden">Tap to flip</span>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.72)" strokeWidth="1.5" aria-hidden>
                    <path d="M2 7h10M7 2l5 5-5 5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: 12,
            border: "0.5px solid var(--color-border-light)",
            background: "var(--color-bg-elevated)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Subtle top bar matching tier */}
          <div
            style={{
              height: 3,
              background: theme === "dark" ? lens.accentBar : lens.accentBarLight,
              borderRadius: "12px 12px 0 0",
            }}
          />

          <div style={{ padding: "22px 26px 20px", display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
            {/* Back header */}
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18 }}>
              <h3
                className="font-display"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: "1.1rem",
                  color: "var(--color-text-primary)",
                  letterSpacing: "-0.01em",
                }}
              >
                {lens.name}
              </h3>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="var(--color-text-muted)"
                strokeWidth="1.5"
                style={{ flexShrink: 0 }}
              >
                <path d="M12 7H2M7 12L2 7l5-5" />
              </svg>
            </div>

            {/* Divider */}
            <div style={{ height: "0.5px", background: "var(--color-divider)", marginBottom: 16 }} />

            {/* Features list */}
            <ul style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, overflowY: "auto" }}>
              {lens.features.map((feature) => (
                <li key={feature.label} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="var(--color-feature-check)"
                    strokeWidth="1.5"
                    style={{ flexShrink: 0, marginTop: 2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7.5L5.5 10.5L11.5 4" />
                  </svg>
                  <span
                    className="font-body"
                    style={{ fontSize: "0.85rem", color: "var(--color-text-primary)", lineHeight: 1.7 }}
                  >
                    {feature.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* Footnotes */}
            {lens.features.some((f) => f.footnote) && (
              <div style={{ marginTop: 12, paddingTop: 10, borderTop: "0.5px solid var(--color-border-light)" }}>
                {lens.features
                  .filter((f) => f.footnote)
                  .map((f) => (
                    <p
                      key={f.footnote}
                      className="font-body"
                      style={{ fontSize: "0.7rem", color: "var(--color-text-secondary)", lineHeight: 1.65 }}
                    >
                      {f.footnote}
                    </p>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CollectionsLensSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number>(0);

  const scrollTo = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.children[index] as HTMLElement | undefined;
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
    setActiveIndex(index);
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth } = scrollRef.current;
    const index = Math.round((scrollLeft / scrollWidth) * LENS_SERIES.length);
    setActiveIndex(Math.min(Math.max(index, 0), LENS_SERIES.length - 1));
  }, []);

  return (
    <section
      id="elaris-series"
      className="py-24 md:py-32 bg-background-secondary"
      aria-label="Elaris Series"
    >
      <Container className="relative z-10">
        <div aria-live="polite" className="sr-only">
          {LENS_SERIES[activeIndex]?.name} — card {activeIndex + 1} of {LENS_SERIES.length}
        </div>
        {/* Header row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              className="font-display font-light text-foreground tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
              }}
            >
              Elaris Series
            </h2>
            <p className="mt-4 max-w-xl text-foreground-secondary font-body text-[0.95rem] leading-relaxed">
              Four tiers of precision optics — each building on the last.{" "}
              <span className="text-foreground-muted">Tap a card to explore its features.</span>
            </p>
          </div>

          {/* Arrow controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 hover:bg-accent hover:border-accent hover:text-[var(--color-text-on-accent)] disabled:pointer-events-none disabled:opacity-25"
              style={{ border: "0.5px solid var(--color-border-light)", color: "var(--color-text-primary)" }}
              aria-label="Previous"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 2L4 7L9 12" />
              </svg>
            </button>
            <button
              onClick={() => scrollTo(Math.min(LENS_SERIES.length - 1, activeIndex + 1))}
              disabled={activeIndex === LENS_SERIES.length - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 hover:bg-accent hover:border-accent hover:text-[var(--color-text-on-accent)] disabled:pointer-events-none disabled:opacity-25"
              style={{ border: "0.5px solid var(--color-border-light)", color: "var(--color-text-primary)" }}
              aria-label="Next"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 2L10 7L5 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          role="region"
          aria-label="Elaris lens series"
          tabIndex={0}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? 0;
          }}
          onTouchEnd={(e) => {
            const endX = e.changedTouches[0]?.clientX ?? 0;
            const diff = touchStartX.current - endX;
            if (Math.abs(diff) <= 50) return;
            if (diff > 0) {
              scrollTo(Math.min(LENS_SERIES.length - 1, activeIndex + 1));
            } else {
              scrollTo(Math.max(0, activeIndex - 1));
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              scrollTo(Math.min(LENS_SERIES.length - 1, activeIndex + 1));
            }
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              scrollTo(Math.max(0, activeIndex - 1));
            }
          }}
          className="mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {LENS_SERIES.map((lens, index) => (
            <FlipCard key={lens.id} lens={lens} isActive={activeIndex === index} wiggleDelay={1200 + index * 180} />
          ))}
        </div>

        {/* Dot indicators */}
        <div className="mt-7 flex items-center justify-center gap-2.5">
          {LENS_SERIES.map((lens, index) => (
            <button
              key={lens.id}
              onClick={() => scrollTo(index)}
              className="h-[3px] rounded-full transition-all duration-300"
              style={{
                width: activeIndex === index ? 28 : 8,
                backgroundColor: activeIndex === index ? "var(--color-dot-active)" : "var(--color-dot-inactive)",
              }}
              aria-label={`Go to ${lens.name}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
