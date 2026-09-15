import { useEffect, useRef } from 'react';

/**
 * Tracks normalized mouse position in the range [-1, 1] on both axes,
 * with the origin at the center of the viewport. Read via a ref so
 * consumers (e.g. R3F useFrame loops) can poll it without triggering
 * React re-renders on every mouse move.
 */
export function useMousePosition() {
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      position.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return position;
}
