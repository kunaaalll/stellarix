/**
 * Design tokens — Stellarix / Elaris.
 * CSS variables in globals.css are the runtime source of truth.
 * These JS exports are for contexts where CSS vars aren't accessible
 * (Three.js materials, WebGL shaders, canvas drawing).
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

export const lightColors = {
  bgPrimary: "#FAFAFA",
  bgSecondary: "#F0F0F0",
  bgTertiary: "#F5F5F5",
  bgElevated: "#FFFFFF",
  textPrimary: "#1A1A1A",
  textSecondary: "#555555",
  textMuted: "#999999",
  borderLight: "#E0E0E0",
  borderMedium: "#C0C0C0",
  accent: "#1A1A1A",
  accentHover: "#333333",
} as const;

export const darkColors = {
  bgPrimary: "#111111",
  bgSecondary: "#0E0E0E",
  bgTertiary: "#1E1E1E",
  bgElevated: "#161616",
  textPrimary: "#E8E8E8",
  textSecondary: "#AAAAAA",
  textMuted: "#666666",
  borderLight: "#2A2A2A",
  borderMedium: "#333333",
  accent: "#E8E8E8",
  accentHover: "#D0D0D0",
} as const;

/** 3D-specific color values keyed by theme */
const themeColors3D = {
  light: {
    frameColor: "#C0C0C0",
    accentColor: "#999999",
    lensColor: "#aabbcc",
    particleColor: "#CCCCCC",
    particleOpacity: 0.25,
    ambientLight: { color: "#888888", intensity: 0.5 },
    keyLight: { color: "#555555", intensity: 1.0 },
    fillLight1: { color: "#666666", intensity: 0.4 },
    fillLight2: { color: "#777777", intensity: 0.25 },
    gridColor: "#CCCCCC",
    rimStroke: "#1A1A1A",
    innerRings: "#555555",
    glassFill: "rgba(100,120,140,0.08)",
    crosshair: "#999999",
  },
  dark: {
    frameColor: "#2A2A2A",
    accentColor: "#888888",
    lensColor: "#aabbcc",
    particleColor: "#555555",
    particleOpacity: 0.4,
    ambientLight: { color: "#BBBBBB", intensity: 0.6 },
    keyLight: { color: "#E8E8E8", intensity: 1.3 },
    fillLight1: { color: "#AAAAAA", intensity: 0.5 },
    fillLight2: { color: "#999999", intensity: 0.3 },
    gridColor: "#666666",
    rimStroke: "#E8E8E8",
    innerRings: "#AAAAAA",
    glassFill: "rgba(160,180,200,0.06)",
    crosshair: "#555555",
  },
} as const;

export type Theme = "light" | "dark";
export type ThemeColors3D = (typeof themeColors3D)[Theme];

export function getThemeColors(theme: Theme): ThemeColors3D {
  return themeColors3D[theme];
}

/** Backward-compatible default export (dark) */
export const colors = darkColors;
