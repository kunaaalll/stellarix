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
      {/* Reduced ambient — dark theme: soft grey fill, no harsh white */}
      <ambientLight intensity={0.35} color="#888888" />
      <directionalLight
        position={[3, 4, 5]}
        intensity={0.9}
        color="#AAAAAA"
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <directionalLight position={[-2, 2, 3]} intensity={0.35} color="#666666" />
      <directionalLight position={[0, -1, 2]} intensity={0.2} color="#888888" />
      <group ref={groupRef} position={[0, 0, 0]}>
        <GlassesModel />
      </group>
      <FloatingParticles />
    </>
  );
}
