# UI/UX Improvements Plan
**Project:** Stellarix / Elaris Precision Optics
**Audited:** April 2026
**Stack:** Next.js 16 · React 19 · Tailwind CSS v4 · TypeScript · Three.js / R3F

---

## How to Use This File
Open this file in Cursor and ask Claude to implement each fix one at a time.
Each fix has the exact file, the exact problem, and the exact solution. Just say:
> "Fix #1 — mobile hamburger menu"
and Claude will know what to do.

---

## 🔴 CRITICAL FIXES (Do These First)

---

### Fix #1 — Mobile Hamburger Menu
**File:** `src/components/layout/Header.tsx`
**Problem:** Nav links are always visible in a `flex` row — on screens < 768px they overflow or stack badly. No hamburger menu exists.

**What to build:**
1. Add a `useState` for `menuOpen: boolean`
2. Hide the nav `<ul>` on mobile with `hidden md:flex`, show it when `menuOpen = true` as a full-screen or dropdown overlay
3. Add a hamburger button (3 lines → X icon on open) that only shows on mobile (`md:hidden`)
4. Close menu on nav link click or Escape key
5. Trap focus inside open menu (a11y)

**Exact code structure:**
```tsx
"use client";
// Add: const [menuOpen, setMenuOpen] = useState(false);

// Hamburger button — only on mobile:
<button
  className="flex md:hidden ..."
  onClick={() => setMenuOpen(!menuOpen)}
  aria-label={menuOpen ? "Close menu" : "Open menu"}
  aria-expanded={menuOpen}
>
  {menuOpen ? <XIcon /> : <MenuIcon />}
</button>

// Nav list — hidden on mobile, revealed when open:
<ul className={`
  ${menuOpen ? "flex" : "hidden"} md:flex
  flex-col md:flex-row
  absolute md:static top-16 left-0 right-0
  bg-background-elevated md:bg-transparent
  p-6 md:p-0 gap-6 md:gap-8
  border-b border-border md:border-0
  ...
`}>
  {/* nav links — add onClick={() => setMenuOpen(false)} to each */}
</ul>
```

**Checklist:**
- [ ] Hamburger icon (3 lines) shown on mobile only
- [ ] X icon shown when menu open
- [ ] Nav links hidden on mobile by default
- [ ] Nav links visible when menu open
- [ ] Menu closes on nav link click
- [ ] Menu closes on Escape key press
- [ ] ThemeToggle button still visible on mobile (move inside mobile menu or keep in header row)
- [ ] Header height stays consistent

---

### Fix #2 — Color Contrast (WCAG AA)
**File:** `src/styles/globals.css`
**Problem:** `--color-text-muted: #999999` on `#FAFAFA` background = ~2.5:1 contrast ratio. WCAG AA requires 4.5:1 for normal text, 3:1 for large text (18px+).

**Fix:**
```css
/* In :root (light theme): */
--color-text-muted: #767676;   /* was #999999 — now 4.54:1 on #FAFAFA ✅ */

/* In .dark: */
--color-text-muted: #9A9A9A;   /* already fine on #111111 (~4.7:1) ✅ */
```

Also check:
- `--color-text-secondary: #555555` on light bg (#FAFAFA) → 7.4:1 ✅ fine
- `--color-feature-check: #555555` in dark → update if used as small text

**Checklist:**
- [ ] `--color-text-muted` updated to `#767676` in `:root`
- [ ] Dark theme muted text verified still passes

---

## 🟠 HIGH PRIORITY FIXES

---

### Fix #3 — prefers-reduced-motion Support
**Files:** `src/styles/globals.css`, `src/sections/optical-lens/OpticalLensSection.tsx`
**Problem:** All animations run regardless of user's OS accessibility setting. Users with vestibular disorders experience disorienting motion.

**Fix A — globals.css** (add at bottom of file):
```css
@media (prefers-reduced-motion: reduce) {
  /* Disable card wiggle */
  .card-wiggle {
    animation: none;
  }

  /* Disable all transitions and animations */
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  /* Keep body transition for theme switch but make it instant */
  body {
    transition: none;
  }
}
```

**Fix B — OpticalLensSection.tsx** (wrap GSAP animations):
```tsx
// At top of useEffect where GSAP is initialized:
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReduced) {
  // Skip animation, just show element immediately
  element.style.opacity = "1";
  element.style.clipPath = "none";
  return;
}
// ... existing GSAP code
```

**Fix C — HeroSection.tsx** (floating particles):
```tsx
// In FloatingParticles — reduce COUNT when reduced motion:
const prefersReduced = typeof window !== "undefined"
  && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const COUNT = prefersReduced ? 0 : 80; // hide particles for reduced motion
```

**Checklist:**
- [ ] `@media (prefers-reduced-motion)` block added to globals.css
- [ ] Card wiggle disabled under reduced motion
- [ ] GSAP animations skipped in OpticalLensSection
- [ ] Floating particles reduced/hidden under reduced motion
- [ ] 3D auto-rotation could be slowed or stopped (optional)

---

### Fix #4 — Button Touch Targets (44×44px minimum)
**File:** `src/sections/hero/HeroSection.tsx`
**Problem:** CTA buttons use `py-3` (~12px padding = ~27px button height). WCAG 2.5.5 requires 44px minimum touch target.

**Fix:**
```tsx
// Primary CTA button — change py-3 to py-3.5 and ensure text-sm minimum:
className="... px-7 py-3.5 text-sm ..."

// Secondary CTA button:
className="... px-7 py-3.5 text-sm ..."
```

Also fix in: `Header.tsx` nav links, `Footer.tsx` nav links, all other CTA buttons across sections.

**Minimum touch target rule:** Any clickable/tappable element should be at least `h-11` (44px) on mobile.

**Checklist:**
- [ ] Hero primary CTA button ≥ 44px height
- [ ] Hero secondary CTA button ≥ 44px height
- [ ] Header nav links have adequate tap area
- [ ] Footer nav links have adequate tap area
- [ ] Carousel arrow buttons ≥ 44px
- [ ] Flip card interaction area is large enough

---

### Fix #5 — "Tap to explore" → Context-Aware Text
**File:** `src/sections/products/CollectionsLensSection.tsx` (line ~233)
**Problem:** "Tap to explore" is mobile-specific language. Desktop users see incorrect phrasing.

**Fix:**
```tsx
// Add a hook or CSS-based approach:

// Option A — CSS approach (simplest, no JS needed):
<span className="hidden md:inline">Click to explore</span>
<span className="md:hidden">Tap to explore</span>

// Option B — useEffect with pointer detection:
const [isTouchDevice, setIsTouchDevice] = useState(false);
useEffect(() => {
  setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
}, []);
// Then: {isTouchDevice ? "Tap to explore" : "Click to explore"}
```

**Recommended:** Option A (CSS) — no hydration issues, instant, no JS.

**Checklist:**
- [ ] "Tap" shows only on mobile/touch devices
- [ ] "Click" shows on desktop/pointer devices
- [ ] No hydration mismatch errors

---

## 🟡 MEDIUM PRIORITY FIXES

---

### Fix #6 — Responsive Grid Gaps
**Files:** `src/sections/about/AboutSection.tsx`, `src/sections/technology/TechnologySection.tsx`
**Problem:** `gap-8` on mobile is too large — wastes vertical space and looks unbalanced.

**Fix — AboutSection.tsx:**
```tsx
// Stats grid:
// Change: grid-cols-2 gap-8 md:grid-cols-4
// To:
className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8"

// Pillars grid:
// Change: gap-6 md:grid-cols-3
// To:
className="grid gap-4 md:grid-cols-3 md:gap-6"
```

**Fix — TechnologySection.tsx:**
```tsx
// Feature cards grid:
// Change: gap-6 md:grid-cols-2 lg:grid-cols-3
// To:
className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
```

**Checklist:**
- [ ] AboutSection stats grid: `gap-4 md:gap-8`
- [ ] AboutSection pillars grid: `gap-4 md:gap-6`
- [ ] TechnologySection feature grid: `gap-4 md:gap-6`

---

### Fix #7 — Flip Card Min-Width on Very Small Screens
**File:** `src/sections/products/CollectionsLensSection.tsx` (line ~126)
**Problem:** `min-w-[290px]` will overflow on 320px-wide devices. 290px + container padding = overflow.

**Fix:**
```tsx
// Change:
className="... min-w-[290px] w-[80vw] max-w-[380px] ..."

// To:
className="... min-w-[85vw] sm:min-w-[290px] w-[85vw] sm:w-[80vw] max-w-[380px] ..."
```

**Checklist:**
- [ ] Cards fit on 320px screens
- [ ] Cards still look good on 375px (iPhone SE)
- [ ] Cards still look good on 414px (iPhone Plus)
- [ ] Cards still look good on desktop

---

### Fix #8 — Keyboard Navigation for Carousel
**File:** `src/sections/products/CollectionsLensSection.tsx`
**Problem:** Carousel only responds to mouse clicks on arrows or touch scroll. Keyboard users can't navigate between cards.

**Fix:**
```tsx
// On the carousel container div, add keydown handler:
<div
  role="region"
  aria-label="Elaris lens series"
  onKeyDown={(e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, lensCards.length - 1));
      scrollToCard(activeIndex + 1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      scrollToCard(activeIndex - 1);
    }
  }}
  tabIndex={0}
  ...
>
```

Also add `aria-live="polite"` to announce active card to screen readers:
```tsx
<div aria-live="polite" className="sr-only">
  {lensCards[activeIndex].name} — card {activeIndex + 1} of {lensCards.length}
</div>
```

**Checklist:**
- [ ] Left/Right arrow keys navigate carousel
- [ ] Carousel container is focusable (`tabIndex={0}`)
- [ ] `role="region"` and `aria-label` added
- [ ] `aria-live` announces active card
- [ ] Focus visible on carousel container

---

### Fix #9 — Swipe Support for Mobile Carousel
**File:** `src/sections/products/CollectionsLensSection.tsx`
**Problem:** Mobile users can finger-scroll the carousel but there's no snap-to-card on swipe, and the UX feels unpolished without gesture support.

**Fix — add touch swipe handlers:**
```tsx
const touchStartX = useRef<number>(0);
const touchEndX = useRef<number>(0);

const handleTouchStart = (e: React.TouchEvent) => {
  touchStartX.current = e.touches[0].clientX;
};

const handleTouchEnd = (e: React.TouchEvent) => {
  touchEndX.current = e.changedTouches[0].clientX;
  const diff = touchStartX.current - touchEndX.current;
  if (Math.abs(diff) > 50) { // 50px threshold
    if (diff > 0) {
      // swipe left → next card
      setActiveIndex((i) => Math.min(i + 1, lensCards.length - 1));
    } else {
      // swipe right → prev card
      setActiveIndex((i) => Math.max(i - 1, 0));
    }
  }
};

// Add to carousel container:
onTouchStart={handleTouchStart}
onTouchEnd={handleTouchEnd}
```

**Checklist:**
- [ ] Swipe left goes to next card
- [ ] Swipe right goes to previous card
- [ ] Minimum 50px swipe threshold to prevent accidental swipes
- [ ] Dot indicators update on swipe
- [ ] Works alongside existing scroll-snap behavior

---

## 🟢 LOW PRIORITY / NICE-TO-HAVE

---

### Fix #10 — Reduce 3D Scene Defer Time
**File:** `src/sections/hero/HeroSection.tsx` (line ~21)
**Problem:** `DEFER_HEAVY_MS = 5500` — users see empty hero for 5.5 seconds on slow connections.

**Fix:**
```tsx
// Change:
const DEFER_HEAVY_MS = 5500;
// To:
const DEFER_HEAVY_MS = 2000; // 2 seconds is enough for LCP to complete
```

**Also:** Add a subtle fade-in animation when the 3D scene appears so it doesn't pop in abruptly:
```tsx
// On the Canvas wrapper:
<Canvas
  ...
  className="absolute inset-0 z-0 h-full w-full opacity-0 transition-opacity duration-1000"
  style={{ opacity: showScene ? 1 : 0 }}
>
```

**Checklist:**
- [ ] Defer time reduced to 2000ms
- [ ] 3D scene fades in smoothly when loaded

---

### Fix #11 — Lazy Load GSAP in OpticalLensSection
**File:** `src/sections/optical-lens/OpticalLensSection.tsx`
**Problem:** GSAP (~100KB) is imported at the top level, loading on page startup even though it's used below the fold.

**Fix:**
```tsx
// Remove top-level import:
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// Replace useEffect with:
useEffect(() => {
  let cleanup: (() => void) | undefined;

  import("gsap").then(({ default: gsap }) => {
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      // ... existing animation code
      cleanup = () => ScrollTrigger.getAll().forEach(t => t.kill());
    });
  });

  return () => cleanup?.();
}, []);
```

**Checklist:**
- [ ] GSAP no longer in initial bundle
- [ ] Animation still works after lazy load
- [ ] No flash/jump when GSAP loads

---

### Fix #12 — Optical Lens Section Mobile Size
**File:** `src/sections/optical-lens/OpticalLensSection.tsx` (line ~120)
**Problem:** `h-[85vmin] w-[85vmin]` can be very large on some mobile viewports.

**Fix:**
```tsx
// Change:
className="... h-[85vmin] w-[85vmin] max-h-[720px] max-w-[720px] ..."

// To:
className="... h-[75vmin] w-[75vmin] sm:h-[85vmin] sm:w-[85vmin] max-h-[720px] max-w-[720px] ..."
```

**Checklist:**
- [ ] Lens circle looks good on iPhone SE (375px)
- [ ] Lens circle looks good on iPad (768px)
- [ ] Lens circle looks good on desktop (1280px+)

---

### Fix #13 — Contact Form
**File:** `src/sections/contact/ContactSection.tsx`
**Problem:** Contact section only shows display cards (Headquarters, Email, Brand). No actual way to send a message.

**What to build:**
Add a simple contact form below the info cards:
```tsx
<form
  onSubmit={handleSubmit}
  className="mt-12 grid gap-4 max-w-lg mx-auto"
>
  <input
    type="text"
    name="name"
    placeholder="Your name"
    required
    aria-label="Your name"
    className="w-full bg-background-elevated border border-border rounded-[6px] px-4 py-3 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent"
  />
  <input
    type="email"
    name="email"
    placeholder="Your email"
    required
    aria-label="Your email"
    className="... same as above ..."
  />
  <textarea
    name="message"
    placeholder="Your message"
    rows={4}
    required
    aria-label="Your message"
    className="... same as above ... resize-none"
  />
  <button
    type="submit"
    className="w-full bg-accent text-[var(--color-text-on-accent)] rounded-[6px] px-6 py-3.5 text-sm tracking-[0.18em] transition-colors hover:bg-accent-hover"
  >
    Send Message
  </button>
</form>
```

For submissions, use a free service like **Formspree** (`https://formspree.io`) — no backend needed:
```tsx
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Checklist:**
- [ ] Name, email, message fields with labels
- [ ] Required field validation
- [ ] Submit button with loading state
- [ ] Success message after send
- [ ] Form works with Formspree or similar service
- [ ] Styled consistently with dark/light theme

---

## Summary — All 13 Fixes

| # | Fix | File | Priority | Effort |
|---|---|---|---|---|
| 1 | Mobile hamburger menu | Header.tsx | 🔴 Critical | 2-3 hrs |
| 2 | Color contrast fix | globals.css | 🔴 Critical | 5 min |
| 3 | prefers-reduced-motion | globals.css + OpticalLens | 🟠 High | 30 min |
| 4 | Button touch targets 44px | HeroSection + all CTAs | 🟠 High | 15 min |
| 5 | "Tap" vs "Click" text | CollectionsLensSection | 🟠 High | 5 min |
| 6 | Responsive grid gaps | About + Technology | 🟡 Medium | 10 min |
| 7 | Flip card min-width | CollectionsLensSection | 🟡 Medium | 5 min |
| 8 | Keyboard carousel nav | CollectionsLensSection | 🟡 Medium | 30 min |
| 9 | Swipe gesture carousel | CollectionsLensSection | 🟡 Medium | 30 min |
| 10 | Reduce 3D defer time | HeroSection | 🟢 Low | 5 min |
| 11 | Lazy load GSAP | OpticalLensSection | 🟢 Low | 30 min |
| 12 | Optical lens mobile size | OpticalLensSection | 🟢 Low | 5 min |
| 13 | Contact form | ContactSection | 🟢 Low | 1-2 hrs |

---

## Notes for Claude / Cursor

- Always run `npm run build` after completing each fix to catch TypeScript errors
- Test each fix at 375px (iPhone SE), 768px (iPad), and 1280px (desktop)
- The hamburger menu (Fix #1) is the most important — start here
- Fixes #2–5 are all small changes, do them together in one pass
- Fixes #8 and #9 (carousel keyboard + swipe) can be done together since they're in the same file
- The contact form (Fix #13) requires a Formspree account — ask the user for their email
