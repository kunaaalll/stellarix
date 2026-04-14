"use client";

/**
 * Geometric eyeglass frame: two rims, bridge, two arms.
 * Light theme: charcoal frame #2A2A2A, cool grey-blue lens, grey accents.
 */
import { useThemeColors } from "@/context/ThemeContext";

const RIM_RADIUS = 0.8;
const RIM_TUBE = 0.035;
const BRIDGE_WIDTH = 0.32;
const ARM_LENGTH = 0.64;
const LENS_OFFSET = RIM_RADIUS * 0.5 + BRIDGE_WIDTH / 2;

export function GlassesModel() {
  const colors = useThemeColors();
  const FRAME_COLOR = colors.frameColor;
  const ACCENT_COLOR = colors.accentColor;

  return (
    <group rotation={[0, 0, 0]} position={[0, 0, 0]} scale={0.95}>
      {/* Left lens rim */}
      <mesh position={[-LENS_OFFSET, 0, 0]}>
        <torusGeometry args={[RIM_RADIUS / 2, RIM_TUBE, 20, 36]} />
        <meshStandardMaterial
          color={FRAME_COLOR}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      {/* Right lens rim */}
      <mesh position={[LENS_OFFSET, 0, 0]}>
        <torusGeometry args={[RIM_RADIUS / 2, RIM_TUBE, 20, 36]} />
        <meshStandardMaterial
          color={FRAME_COLOR}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      {/* Bridge */}
      <mesh position={[0, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[BRIDGE_WIDTH, RIM_TUBE * 1.4, RIM_TUBE * 2.2]} />
        <meshStandardMaterial
          color={ACCENT_COLOR}
          metalness={0.5}
          roughness={0.25}
        />
      </mesh>
      {/* Left temple */}
      <mesh
        position={[-LENS_OFFSET - RIM_RADIUS / 2 - ARM_LENGTH / 2, -0.02, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <boxGeometry args={[ARM_LENGTH, RIM_TUBE * 0.9, RIM_TUBE * 1.3]} />
        <meshStandardMaterial
          color={FRAME_COLOR}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      {/* Right temple */}
      <mesh
        position={[LENS_OFFSET + RIM_RADIUS / 2 + ARM_LENGTH / 2, -0.02, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <boxGeometry args={[ARM_LENGTH, RIM_TUBE * 0.9, RIM_TUBE * 1.3]} />
        <meshStandardMaterial
          color={FRAME_COLOR}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}
