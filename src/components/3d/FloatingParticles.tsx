"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useThemeColors } from "@/context/ThemeContext";

const RADIUS = 3.5;
const DRIFT = 0.08;

export function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const colors = useThemeColors();
  const [count, setCount] = useState(80);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCount(prefersReduced ? 0 : 80);
  }, []);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2 * RADIUS;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2 * RADIUS;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2 * RADIUS;
      speeds[i * 3] = (Math.random() - 0.5) * DRIFT;
      speeds[i * 3 + 1] = (Math.random() - 0.5) * DRIFT;
      speeds[i * 3 + 2] = (Math.random() - 0.5) * DRIFT;
    }
    return { positions, speeds };
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    if (count === 0) return;
    const pos = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
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
    count === 0 ? null : (
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
    )
  );
}
