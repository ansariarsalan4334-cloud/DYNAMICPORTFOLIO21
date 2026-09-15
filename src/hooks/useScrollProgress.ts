import { useEffect, useRef } from 'react';

/**
 * Tracks scroll progress through the first viewport height (0 → 1),
 * used to pull the hero's 3D core back and fade it as the user scrolls
 * into the About section. Read via ref to avoid re-rendering React on
 * every scroll event — the 3D scene polls this inside its own frame loop.
 */
export function useScrollProgress() {
  const progress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      progress.current = Math.min(Math.max(window.scrollY / vh, 0), 1);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}
