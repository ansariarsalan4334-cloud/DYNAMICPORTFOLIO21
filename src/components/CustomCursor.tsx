import { useEffect, useRef, useState } from 'react';

/**
 * Premium custom cursor: a small dot plus a lagging outer ring.
 * Automatically hides on touch devices via the .custom-cursor CSS rule
 * in index.css, and is skipped entirely if the OS prefers reduced motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [variant, setVariant] = useState<'default' | 'button' | 'view'>('default');

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let targetX = ringX;
    let targetY = ringY;
    let rafId: number;

    const handleMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }

      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="view"]')) setVariant('view');
      else if (target.closest('a, button, [role="button"]')) setVariant('button');
      else setVariant('default');
    };

    const animate = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      cancelAnimationFrame(rafId);
    };
  }, [isTouch]);

  if (isTouch) return null;

  const ringSize = variant === 'default' ? 32 : variant === 'button' ? 52 : 64;

  return (
    <div className="custom-cursor pointer-events-none fixed inset-0 z-[100] hidden md:block" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-signal-cyan"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-signal-violet/70 flex items-center justify-center transition-[width,height] duration-200 ease-out"
        style={{ width: ringSize, height: ringSize, willChange: 'transform' }}
      >
        {variant === 'view' && <span className="text-[10px] tracking-wide text-white">VIEW</span>}
      </div>
    </div>
  );
}
