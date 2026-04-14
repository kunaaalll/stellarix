"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { GlassesModel } from "./GlassesModel";
import { FloatingParticles } from "./FloatingParticles";
import { useThemeColors } from "@/context/ThemeContext";

const AUTO_ROTATE_SPEED = 0.22;
const MOUSE_INFLUENCE = 0.28;
const LERP = 0.12;

/**
 * Hero scene: 3D glasses — smooth auto spin (Y) with gentle mouse tilt (X/Y).
 * Light grey background, cool directional lights.
 */
export function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const autoY = useRef(0);
  const colors = useThemeColors();

  const { pointer, size } = useThree();
  const modelScale = size.width < 640 ? 0.60 : size.width < 1024 ? 0.85 : 1;

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    autoY.current += delta * AUTO_ROTATE_SPEED;
    targetRotation.current.x = pointer.y * MOUSE_INFLUENCE;
    targetRotation.current.y = pointer.x * MOUSE_INFLUENCE + autoY.current;

    currentRotation.current.x +=
      (targetRotation.current.x - currentRotation.current.x) * LERP;
    currentRotation.current.y +=
      (targetRotation.current.y - currentRotation.current.y) * LERP;

    groupRef.current.rotation.x = currentRotation.current.x;
    groupRef.current.rotation.y = currentRotation.current.y;
  });

  return (
    <>
      {/* Balanced lighting for dark theme — specs visible against dark background */}
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
      <group ref={groupRef} position={[0, 0, 0]} scale={modelScale}>
        <GlassesModel />
      </group>
      <FloatingParticles />
    </>
  );
}
