import { Suspense, useState, useEffect } from 'react';
import type { MutableRefObject } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { OrbitalCore } from './OrbitalCore';
import { ParticleField } from './ParticleField';
import { useMousePosition } from '../hooks/useMousePosition';
import { useDeviceCapability } from '../hooks/useDeviceCapability';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { theme } from '../data/portfolio';

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

type HeroSceneProps = {
  scrollProgress: MutableRefObject<number>;
};

export function HeroScene({ scrollProgress }: HeroSceneProps) {
  const mouse = useMousePosition();
  const deviceTier = useDeviceCapability();
  const reducedMotion = useReducedMotion();
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    setWebglOk(supportsWebGL());
  }, []);

  if (!webglOk) {
    // Graceful CSS-only fallback: a soft radial glow instead of the 3D scene.
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(124,108,255,0.35), rgba(76,217,208,0.08) 45%, transparent 70%)',
        }}
      />
    );
  }

  const isLowTier = deviceTier === 'low';
  const particleCount = isLowTier ? theme.three.particleCount.mobile : theme.three.particleCount.desktop;
  const enablePostFx = theme.three.enablePostProcessing && !isLowTier && !reducedMotion;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={isLowTier ? 1 : [1, 1.8]}
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: !isLowTier, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={[theme.colors.background]} />
          <OrbitalCore mouse={mouse} scrollProgress={scrollProgress} reduceEffects={isLowTier || reducedMotion} />
          {!reducedMotion && <ParticleField count={particleCount} mouse={mouse} />}
          {enablePostFx && (
            <EffectComposer multisampling={0}>
              <Bloom intensity={0.6} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
              <Vignette eskil={false} offset={0.2} darkness={0.7} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
