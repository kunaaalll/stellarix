"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { GlassesModel } from "./GlassesModel";
import { FloatingParticles } from "./FloatingParticles";

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

  const { pointer } = useThree();

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
      <ambientLight intensity={0.6} color="#BBBBBB" />
      <directionalLight
        position={[3, 4, 5]}
        intensity={1.3}
        color="#E8E8E8"
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <directionalLight position={[-2, 2, 3]} intensity={0.5} color="#AAAAAA" />
      <directionalLight position={[0, -1, 2]} intensity={0.3} color="#999999" />
      <group ref={groupRef} position={[0, 0, 0]}>
        <GlassesModel />
      </group>
      <FloatingParticles />
    </>
  );
}
