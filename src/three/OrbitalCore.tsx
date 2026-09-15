import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MutableRefObject } from 'react';

type OrbitalCoreProps = {
  mouse: MutableRefObject<{ x: number; y: number }>;
  scrollProgress: MutableRefObject<number>;
  reduceEffects?: boolean;
};

const NODE_COUNT = 8;

export function OrbitalCore({ mouse, scrollProgress, reduceEffects = false }: OrbitalCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringOuterRef = useRef<THREE.Mesh>(null);
  const ringInnerRef = useRef<THREE.Mesh>(null);

  const nodePositions = useMemo(() => {
    return new Array(NODE_COUNT).fill(0).map((_, i) => {
      const angle = (i / NODE_COUNT) * Math.PI * 2;
      const radius = 2.6;
      return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle * 1.3) * 0.6, Math.sin(angle) * radius);
    });
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.12;
      coreRef.current.rotation.x = Math.sin(t * 0.15) * 0.08;
      // Gentle floating motion.
      coreRef.current.position.y = Math.sin(t * 0.6) * 0.12;
    }

    if (ringOuterRef.current) {
      ringOuterRef.current.rotation.z += delta * 0.05;
      ringOuterRef.current.rotation.x = 1.1 + mouse.current.y * 0.15;
    }
    if (ringInnerRef.current) {
      ringInnerRef.current.rotation.z -= delta * 0.08;
      ringInnerRef.current.rotation.y = mouse.current.x * 0.2;
    }

    if (groupRef.current) {
      // Camera-parallax feel: whole assembly tilts subtly toward cursor.
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.current.x * 0.25,
        0.04
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.current.y * 0.15,
        0.04
      );
      // Scroll pulls the whole core back and fades it slightly.
      const scroll = scrollProgress.current;
      groupRef.current.position.z = THREE.MathUtils.lerp(0, -3, scroll);
      const scale = THREE.MathUtils.lerp(1, 0.82, scroll);
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central glass core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshPhysicalMaterial
          color="#7c6cff"
          transmission={reduceEffects ? 0.2 : 0.85}
          roughness={0.15}
          metalness={0.1}
          thickness={1.2}
          ior={1.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive="#4a3ff0"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Orbital rings */}
      <mesh ref={ringOuterRef} rotation={[1.1, 0, 0]}>
        <torusGeometry args={[2.4, 0.015, 16, 100]} />
        <meshStandardMaterial color="#4cd9d0" emissive="#4cd9d0" emissiveIntensity={0.8} roughness={0.3} />
      </mesh>
      <mesh ref={ringInnerRef} rotation={[0.6, 0.4, 0]}>
        <torusGeometry args={[1.9, 0.01, 16, 100]} />
        <meshStandardMaterial color="#ffb454" emissive="#ffb454" emissiveIntensity={0.6} roughness={0.3} />
      </mesh>

      {/* Floating technology nodes */}
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.14, 0.14, 0.14]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#4cd9d0' : '#7c6cff'}
            emissive={i % 2 === 0 ? '#4cd9d0' : '#7c6cff'}
            emissiveIntensity={0.5}
            roughness={0.4}
          />
        </mesh>
      ))}

      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 4]} intensity={1.2} color="#7c6cff" />
      <pointLight position={[-4, -2, -3]} intensity={0.8} color="#4cd9d0" />
    </group>
  );
}
