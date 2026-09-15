import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MutableRefObject } from 'react';

type ParticleFieldProps = {
  count: number;
  mouse: MutableRefObject<{ x: number; y: number }>;
  radius?: number;
};

/**
 * A single Points cloud driven by one BufferGeometry — never spawns
 * individual React/mesh instances per particle, so it stays cheap even
 * at high counts.
 */
export function ParticleField({ count, mouse, radius = 9 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = radius * (0.4 + Math.random() * 0.6);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      seeds[i] = Math.random() * Math.PI * 2;
    }
    return { positions, seeds };
  }, [count, radius]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;

    // Gentle overall rotation, plus a slight tilt toward the cursor.
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      mouse.current.y * 0.08,
      0.05
    );
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(
      pointsRef.current.rotation.y,
      pointsRef.current.rotation.y + mouse.current.x * 0.02,
      0.05
    );

    // Subtle per-particle breathing using the position attribute directly,
    // avoiding any React state updates inside the animation loop.
    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const seed = seeds[i];
      const scale = 1 + Math.sin(t * 0.5 + seed) * 0.01;
      posAttr.setXYZ(
        i,
        positions[i * 3] * scale,
        positions[i * 3 + 1] * scale,
        positions[i * 3 + 2] * scale
      );
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#7c6cff"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
