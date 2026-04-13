"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 80;
const COLOR = "#555555";
const OPACITY = 0.4;
const RADIUS = 3.5;
const DRIFT = 0.08;

export function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2 * RADIUS;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2 * RADIUS;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2 * RADIUS;
      speeds[i * 3] = (Math.random() - 0.5) * DRIFT;
      speeds[i * 3 + 1] = (Math.random() - 0.5) * DRIFT;
      speeds[i * 3 + 2] = (Math.random() - 0.5) * DRIFT;
    }
    return { positions, speeds };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] += speeds[i * 3];
      pos[i * 3 + 1] += speeds[i * 3 + 1];
      pos[i * 3 + 2] += speeds[i * 3 + 2];
      if (Math.abs(pos[i * 3]) > RADIUS) speeds[i * 3] *= -1;
      if (Math.abs(pos[i * 3 + 1]) > RADIUS) speeds[i * 3 + 1] *= -1;
      if (Math.abs(pos[i * 3 + 2]) > RADIUS) speeds[i * 3 + 2] *= -1;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={COLOR}
        transparent
        opacity={OPACITY}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
