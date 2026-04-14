# Light / Dark Theme Implementation Guide
**Project:** Stellarix / Elaris Precision Optics
**Stack:** Next.js 16 · React 19 · Tailwind CSS v4 · TypeScript · Three.js / R3F

---

## Overview

Add a light/dark theme toggle to the application. The toggle lives in the header. The system respects `prefers-color-scheme` by default and persists the user's choice in `localStorage`. Every section, component, 3D scene, SVG, and cursor must respond correctly to both themes.

---

## Architecture

| Concern | Solution |
|---|---|
| Theme switching | `.dark` class on `<html>` + CSS variable swap |
| FOUC prevention | Inline `<script>` before first render reads `localStorage` + system pref |
| React state | Lightweight `ThemeContext` (~60 lines, no extra deps) |
| 3D / WebGL / SVG colors | `useThemeColors()` hook — returns resolved JS color object |
| Tailwind dark variant | `@custom-variant dark (&:where(.dark, .dark *))` in `globals.css` |

---

## Step 1 — `src/styles/globals.css` ✅ ALREADY DONE

This file is already updated. It now has:
- `@custom-variant dark (...)` directive
- `:root` set to **light theme** values
- `.dark { ... }` block with all dark values
- All semantic extra tokens (`--color-overlay-gradient-rgb`, `--color-dot-active`, etc.)
- Dual cursor SVGs (dark cursor for light bg, light cursor for dark bg)
- `transition: background-color 0.3s, color 0.3s` on body

**No further changes needed to this file.**

---

## Step 2 — `src/styles/theme.ts` ✅ ALREADY DONE

This file is already updated with:
- `lightColors` export
- `darkColors` export
- `getThemeColors(theme)` function returning 3D-specific values per theme
- `ThemeColors3D` type export

**No further changes needed to this file.**

---

## Step 3 — Create `src/context/ThemeContext.tsx` 🆕 NEW FILE

Create this file from scratch:

```tsx
"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getThemeColors, type Theme, type ThemeColors3D } from "@/styles/theme";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Read initial theme from html class (set by FOUC script)
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("stellarix-theme", next);
      // Update meta theme-color
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", next === "dark" ? "#111111" : "#FAFAFA");
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeColors(): ThemeColors3D {
  const { theme } = useTheme();
  return getThemeColors(theme);
}
```

---

## Step 4 — Create `src/components/ui/ThemeToggle.tsx` 🆕 NEW FILE

```tsx
"use client";

import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border-light)] text-[var(--color-text-muted)] transition-colors duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-primary)]"
    >
      {theme === "dark" ? (
        /* Sun icon — click to go light */
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        /* Moon icon — click to go dark */
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}
```

---

## Step 5 — Update `app/layout.tsx`

### Add FOUC prevention script
Inside `<body>` as the **first child**, before `{children}`, add this inline script:

```tsx
<script
  dangerouslySetInnerHTML={{
    __html: `(function(){try{var t=localStorage.getItem('stellarix-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`,
  }}
/>
```

### Wrap children with ThemeProvider
```tsx
import { ThemeProvider } from "@/context/ThemeContext";

// In RootLayout:
<ThemeProvider>
  {children}
</ThemeProvider>
```

### Update viewport themeColor to support both modes
```tsx
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};
```

---

## Step 6 — Update `src/components/layout/Header.tsx`

### Import additions
```tsx
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
```

Since Header is a server component, convert it to a client component or extract the logo into a client sub-component for the filter. Easiest: add `"use client"` at top.

### Replace all hardcoded colors with CSS variable Tailwind classes

| Old class | New class |
|---|---|
| `bg-[#161616]` | `bg-background-elevated` |
| `border-[#2A2A2A]` | `border-border` |
| `text-[#666666]` | `text-foreground-muted` |
| `hover:text-[#E8E8E8]` | `hover:text-foreground` |
| `focus:text-[#E8E8E8]` | `focus:text-foreground` |
| `focus:ring-[#E8E8E8]` | `focus:ring-accent` |
| `focus:ring-offset-[#111111]` | `focus:ring-offset-background` |

### Logo — conditional filter
```tsx
const { theme } = useTheme();
// On the Image:
style={{ filter: theme === "dark" ? "invert(1) brightness(2)" : "none" }}
```

### Add ThemeToggle to nav
```tsx
<ul className="flex gap-8 ...">
  {/* nav links */}
</ul>
<ThemeToggle />
```

---

## Step 7 — Update `src/components/layout/Footer.tsx`

Same pattern as Header:
- Add `"use client"`
- Import `useTheme`
- Replace hardcoded hex → semantic Tailwind classes (same mapping table as Header)
- Conditional logo filter

| Old class | New class |
|---|---|
| `bg-[#0E0E0E]` | `bg-background-secondary` |
| `border-[#2E2E2E]` | `border-border` |
| `text-[#666666]` | `text-foreground-muted` |
| `text-[#555555]` | `text-foreground-muted` |
| `hover:text-[#E8E8E8]` | `hover:text-foreground` |
| `focus:ring-offset-[#111111]` | `focus:ring-offset-background` |

---

## Step 8 — Update `app/page.tsx`

Find the section loading div (used as Suspense fallback background):
```tsx
// Change:
className="... bg-[#111111] ..."
// To:
className="... bg-background ..."
```

---

## Step 9 — Update `app/error.tsx`

Replace all hardcoded hex values:

| Old | New |
|---|---|
| `bg-[#111111]` | `bg-background` |
| `text-[#E8E8E8]` | `text-foreground` |
| `text-[#AAAAAA]` | `text-foreground-secondary` |
| `border-[#E8E8E8]` | `border-accent` |
| `hover:bg-[#E8E8E8]` | `hover:bg-accent` |
| `hover:text-[#111111]` | `hover:text-[var(--color-text-on-accent)]` |
| `focus:ring-[#E8E8E8]` | `focus:ring-accent` |
| `focus:ring-offset-[#111111]` | `focus:ring-offset-background` |

---

## Step 10 — Update `app/not-found.tsx`

Same pattern as error.tsx. Additionally:
- `text-[#666666]` → `text-foreground-muted`
- `bg-[#2A2A2A]` (decorative line) → `bg-border`

---

## Step 11 — Update `src/sections/contact/ContactSection.tsx`

| Old | New |
|---|---|
| `bg-[#111111]` | `bg-background` |
| `text-[#E8E8E8]` | `text-foreground` |
| `text-[#999999]` | `text-foreground-secondary` |
| `text-[#666666]` | `text-foreground-muted` |
| `text-[#AAAAAA]` | `text-foreground-secondary` |
| `hover:text-[#E8E8E8]` | `hover:text-foreground` |

---

## Step 12 — Update `src/sections/about/AboutSection.tsx`

| Old | New |
|---|---|
| `bg-[#111111]` | `bg-background` |
| `text-[#666666]` | `text-foreground-muted` |
| `text-[#E8E8E8]` | `text-foreground` |
| `text-[#AAAAAA]` | `text-foreground-secondary` |
| `text-[#999999]` | `text-foreground-secondary` |
| `border-[#2A2A2A]` | `border-border` |
| `bg-[#161616]` | `bg-background-elevated` |

---

## Step 13 — Update `src/sections/technology/TechnologySection.tsx`

| Old | New |
|---|---|
| `bg-[#161616]` | `bg-background-elevated` |
| `text-[#E8E8E8]` | `text-foreground` |
| `text-[#999999]` | `text-foreground-secondary` |
| `border-[#2A2A2A]` | `border-border` |
| `hover:border-[#333333]` | `hover:border-border-medium` |
| `hover:bg-[#111111]` | `hover:bg-background` |

### BLI+ highlight card (inverted box)
Replace hardcoded colors with CSS variable inline styles:
```tsx
// Section container:
style={{ background: "var(--color-highlight-bg)", color: "var(--color-highlight-text)" }}
// Body text inside:
style={{ color: "var(--color-highlight-body)" }}
```
The `bg-[#3B82F6]` badge stays unchanged — brand blue is same in both themes.

---

## Step 14 — Update `src/sections/optical-lens/OpticalLensSection.tsx`

| Old | New |
|---|---|
| `bg-[#0E0E0E]` | `bg-background-secondary` |
| `bg-[#111111]/60` | `bg-background/60` |
| `bg-[#111111]/30` | `bg-background/30` |
| `text-[#E8E8E8]` | `text-foreground` |
| `text-[#AAAAAA]` | `text-foreground-secondary` |

For the lens rim inline border style:
```tsx
// Change:
border: "2px solid #E8E8E8"
// To:
border: "2px solid var(--color-accent)"
```

---

## Step 15 — Update `src/sections/hero/HeroSection.tsx`

Add `"use client"` if not already present. Import `useTheme`.

| Old | New |
|---|---|
| `bg-[#111111]` | `bg-background` |
| `text-[#AAAAAA]` | `text-foreground-secondary` |
| `text-[#E8E8E8]` | `text-foreground` |
| `bg-[#E8E8E8]` | `bg-accent` |
| `text-[#111111]` (on button) | `text-[var(--color-text-on-accent)]` |
| `hover:bg-[#D0D0D0]` | `hover:bg-accent-hover` |
| `border-[#333333]` | `border-border-medium` |
| `hover:border-[#E8E8E8]` | `hover:border-accent` |
| `focus:ring-[#E8E8E8]` | `focus:ring-accent` |
| `focus:ring-offset-[#111111]` | `focus:ring-offset-background` |

### RippleGrid gridColor — theme-aware
```tsx
const { theme } = useTheme();
// ...
<RippleGridLazy
  gridColor={theme === "dark" ? "#666666" : "#CCCCCC"}
  // ... other props unchanged
/>
```

### Radial gradients — use RGB variable
```tsx
// Change rgba(17,17,17,...) → rgba(var(--color-bg-primary-rgb), ...)
// Change rgba(80,80,80,...) → rgba(80,80,80,...)  ← keep as-is (it's a glow, not theme-specific)

// Outer dark vignette:
background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(var(--color-bg-primary-rgb),0.75) 0%, rgba(var(--color-bg-primary-rgb),0.3) 70%, transparent 100%)"

// Glow behind glasses: keep the grey rgba values — they work on both themes
```

---

## Step 16 — Update `src/sections/products/CollectionsLensSection.tsx` ⚠️ MOST COMPLEX

Add `"use client"` + `import { useTheme } from "@/context/ThemeContext"`.

### Section-level classes
| Old | New |
|---|---|
| `bg-[#0E0E0E]` | `bg-background-secondary` |
| `text-[#E8E8E8]` | `text-foreground` |
| `text-[#999999]` | `text-foreground-secondary` |
| `text-[#555555]` | `text-foreground-muted` |

### Navigation arrow buttons
```tsx
// Replace inline borderColor/color with CSS vars:
style={{
  border: "0.5px solid var(--color-border-light)",
  color: "var(--color-text-primary)",
}}
// hover:bg-[#E8E8E8] hover:text-[#111111] → hover:bg-accent hover:text-[var(--color-text-on-accent)]
```

### Lens card data — add light accent bars
Each card in the data array needs a `accentBarLight` field:
```ts
const lensCards = [
  { ...elarisCard,   accentBar: "#333333", accentBarLight: "#C0C0C0" },
  { ...clearCard,    accentBar: "#888888", accentBarLight: "#888888" },
  { ...driveCard,    accentBar: "#444444", accentBarLight: "#BBBBBB" },
  { ...fusionCard,   accentBar: "#E8E8E8", accentBarLight: "#1A1A1A" },
];
```
Then in the render:
```tsx
const { theme } = useTheme();
// Use:
backgroundColor: theme === "dark" ? card.accentBar : card.accentBarLight
```

### Card border (active/inactive)
```tsx
borderColor: isActive
  ? "var(--color-accent)"
  : "var(--color-border-light)"
```

### Card front face
> ⚠️ **CRITICAL**: Text on the front face sits on a darkened photo gradient. The white / semi-transparent-white text colours MUST stay white in BOTH themes — they always render against the dark gradient.

Only change:
1. The gradient base RGB:
```tsx
background: `linear-gradient(to top, rgba(var(--color-overlay-gradient-rgb),0.92) 0%, rgba(var(--color-overlay-gradient-rgb),0.55) 45%, transparent 75%)`
```
2. Card background (shown before image loads):
```tsx
background: "var(--color-bg-card-front)"
```
3. Card border already handled above.

**Leave all front-face text colors (`rgba(255,255,255,...)`, `"#FFFFFF"`) unchanged.**

### Card back face — replace all inline colors
```tsx
// Back card container:
background: "var(--color-bg-card-back)"
border: "0.5px solid var(--color-border-light)"

// Title:
color: "var(--color-text-primary)"

// SVG nav arrow stroke:
stroke: "var(--color-text-muted)"

// Divider line:
background: "var(--color-divider)"

// Feature checkmark SVG stroke:
stroke: "var(--color-feature-check)"

// Feature text:
color: "var(--color-feature-text)"

// Footnote border:
borderTop: "0.5px solid var(--color-border-light)"

// Footnote text:
color: "var(--color-text-secondary)"
```

### Dot indicators
```tsx
backgroundColor: activeIndex === index
  ? "var(--color-dot-active)"
  : "var(--color-dot-inactive)"
```

---

## Step 17 — Update `src/components/ui/LensSVG.tsx`

Add `"use client"`. Import `useThemeColors`.

```tsx
import { useThemeColors } from "@/context/ThemeContext";

export function LensSVG({ className = "", size = 400 }: LensSVGProps) {
  const colors = useThemeColors();

  // Replace module-level constants with:
  const RIM_STROKE = colors.rimStroke;
  const INNER_RINGS = colors.innerRings;
  const GLASS_FILL = colors.glassFill;
  const CROSSHAIR = colors.crosshair;

  // ... rest of JSX unchanged
}
```

---

## Step 18 — Update `src/components/3d/Scene.tsx`

Import `useThemeColors`:
```tsx
import { useThemeColors } from "@/context/ThemeContext";

export function Scene() {
  const colors = useThemeColors();

  return (
    <>
      <ambientLight intensity={colors.ambientLight.intensity} color={colors.ambientLight.color} />
      <directionalLight
        position={[3, 4, 5]}
        intensity={colors.keyLight.intensity}
        color={colors.keyLight.color}
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <directionalLight position={[-2, 2, 3]} intensity={colors.fillLight1.intensity} color={colors.fillLight1.color} />
      <directionalLight position={[0, -1, 2]} intensity={colors.fillLight2.intensity} color={colors.fillLight2.color} />
      {/* ... group/model/particles unchanged */}
    </>
  );
}
```

---

## Step 19 — Update `src/components/3d/GlassesModel.tsx`

```tsx
import { useThemeColors } from "@/context/ThemeContext";

export function GlassesModel() {
  const colors = useThemeColors();

  // Replace module-level constants:
  const FRAME_COLOR = colors.frameColor;
  const ACCENT_COLOR = colors.accentColor;
  const LENS_COLOR = colors.lensColor;

  // ... rest of JSX unchanged
}
```

---

## Step 20 — Update `src/components/3d/FloatingParticles.tsx`

```tsx
import { useThemeColors } from "@/context/ThemeContext";

export function FloatingParticles() {
  const colors = useThemeColors();

  // ... existing useMemo/useFrame logic unchanged

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={colors.particleColor}
        transparent
        opacity={colors.particleOpacity}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
```

---

## Verification Checklist

After completing all steps, verify:

- [ ] Toggle button appears in header (sun/moon icon)
- [ ] Clicking toggle smoothly switches all backgrounds and text
- [ ] Refresh page — theme persists from localStorage
- [ ] Clear localStorage + set OS to dark → site loads dark by default
- [ ] No flash of wrong theme on hard refresh
- [ ] Header logo is visible in both themes (dark logo on light, inverted on dark)
- [ ] 3D rotating glasses visible in both themes
- [ ] Floating particles visible in both themes
- [ ] Ripple grid color adapts per theme
- [ ] Flip cards: front face photo text stays white in both themes
- [ ] Flip cards: back face (features list) adapts to theme
- [ ] BLI+ highlight card inverts correctly in light mode
- [ ] All section text is readable (sufficient contrast)
- [ ] 404 page and error page both themed correctly
- [ ] Focus rings visible in both themes
- [ ] `npm run build` passes with zero TypeScript errors

---

## Color Reference Quick-Map

| Hardcoded hex | Tailwind class | CSS var |
|---|---|---|
| `#111111` bg | `bg-background` | `--color-bg-primary` |
| `#0E0E0E` bg | `bg-background-secondary` | `--color-bg-secondary` |
| `#161616` bg | `bg-background-elevated` | `--color-bg-elevated` |
| `#E8E8E8` text | `text-foreground` | `--color-text-primary` |
| `#AAAAAA` text | `text-foreground-secondary` | `--color-text-secondary` |
| `#666666` text | `text-foreground-muted` | `--color-text-muted` |
| `#999999` text | `text-foreground-secondary` | `--color-text-secondary` |
| `#2A2A2A` border | `border-border` | `--color-border-light` |
| `#333333` border | `border-border-medium` | `--color-border-medium` |
| `#E8E8E8` accent | `bg-accent` / `border-accent` | `--color-accent` |
| `#D0D0D0` hover | `bg-accent-hover` | `--color-accent-hover` |
| `#111111` on button | `text-[var(--color-text-on-accent)]` | `--color-text-on-accent` |

---

## Notes for Cursor / AI Assistance

- `globals.css` and `theme.ts` are **already done** — do not overwrite them
- `ThemeContext.tsx` and `ThemeToggle.tsx` are **new files** — create them fresh
- When migrating sections, do **one file at a time** and test locally before moving to next
- The `CollectionsLensSection.tsx` is the most complex — work carefully through each inline color
- Never change the white/semi-white text colors on the flip card **front face** — they must stay white
- Run `npm run dev` on port 3001 (3000 may be in use)
- Run `npm run build` at the end to catch TypeScript errors
