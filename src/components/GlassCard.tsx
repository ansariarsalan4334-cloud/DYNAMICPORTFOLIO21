import { useRef, type PointerEvent, type ReactNode } from 'react';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
};

/**
 * A glass panel that tilts toward the cursor in 3D (CSS perspective + rotateX/Y),
 * lifts slightly, and gains a soft glowing border on hover. Resets smoothly
 * on pointer leave. Skips the tilt transform for touch input.
 */
export function GlassCard({ children, className = '', tiltStrength = 10 }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${-py * tiltStrength}deg) rotateY(${
      px * tiltStrength
    }deg) translateY(-4px) translateZ(10px)`;
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) translateZ(0)';
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`glass-panel rounded-2xl transition-[transform,box-shadow] duration-300 ease-out will-change-transform hover:shadow-glow hover:border-signal-violet/40 ${className}`}
    >
      {children}
    </div>
  );
}
