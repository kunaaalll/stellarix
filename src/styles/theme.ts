/**
 * Design tokens — Dark theme (Stellarix / Elaris).
 * These are the canonical single source of truth for brand colours.
 * Prefer CSS variables in globals.css for runtime usage; use these tokens
 * for any JS/TS contexts (e.g. canvas drawing, Three.js materials).
 */

export const fonts = {
  display: '"Cormorant Garamond", ui-serif, Georgia, serif',
  body: '"Rajdhani", ui-sans-serif, system-ui, sans-serif',
} as const;

export const radius = {
  DEFAULT: "6px",
  card: "12px",
  button: "6px",
} as const;

export const colors = {
  // Backgrounds
  bgPrimary: "#111111",
  bgSecondary: "#0E0E0E",
  bgTertiary: "#161616",
  bgElevated: "#1C1C1C",

  // Text
  textPrimary: "#E8E8E8",
  textSecondary: "#AAAAAA",
  textMuted: "#666666",

  // Borders
  borderLight: "#2A2A2A",
  borderMedium: "#333333",

  // Accent
  accent: "#E8E8E8",
  accentHover: "#AAAAAA",
} as const;
