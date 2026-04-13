"use client";

const RIM_STROKE = "#E8E8E8";
const INNER_RINGS = "#AAAAAA";
const GLASS_FILL = "rgba(160,180,200,0.06)";
const CROSSHAIR = "#555555";

interface LensSVGProps {
  className?: string;
  size?: number;
}

/**
 * Optical lens SVG — dark theme: light grey (#E8E8E8) rim, mid-grey (#AAAAAA) inner rings,
 * crosshairs (#555555), frosted glass fill, mount screws, temple stubs.
 */
export function LensSVG({ className = "", size = 400 }: LensSVGProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <defs>
        <circle id="lens-glass" cx="50" cy="50" r="49" />
        <clipPath id="lens-clip">
          <circle cx="50" cy="50" r="49" />
        </clipPath>
      </defs>

      <use href="#lens-glass" fill={GLASS_FILL} />

      <circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        stroke={INNER_RINGS}
        strokeWidth="0.5"
        strokeDasharray="4 8"
        opacity="0.3"
      />
      <circle
        cx="50"
        cy="50"
        r="32"
        fill="none"
        stroke={INNER_RINGS}
        strokeWidth="0.5"
        strokeDasharray="4 8"
        opacity="0.3"
      />

      <line x1="50" y1="4" x2="50" y2="10" stroke={CROSSHAIR} strokeWidth="0.8" />
      <line x1="50" y1="90" x2="50" y2="96" stroke={CROSSHAIR} strokeWidth="0.8" />
      <line x1="4" y1="50" x2="10" y2="50" stroke={CROSSHAIR} strokeWidth="0.8" />
      <line x1="90" y1="50" x2="96" y2="50" stroke={CROSSHAIR} strokeWidth="0.8" />

      <circle
        cx="50"
        cy="50"
        r="49"
        fill="none"
        stroke={RIM_STROKE}
        strokeWidth="1.5"
      />

      <circle cx="99" cy="50" r="1.5" fill={RIM_STROKE} />
      <circle cx="1" cy="50" r="1.5" fill={RIM_STROKE} />

      <line x1="99" y1="50" x2="100" y2="50" stroke={RIM_STROKE} strokeWidth="1.5" />
      <line x1="0" y1="50" x2="1" y2="50" stroke={RIM_STROKE} strokeWidth="1.5" />
    </svg>
  );
}
