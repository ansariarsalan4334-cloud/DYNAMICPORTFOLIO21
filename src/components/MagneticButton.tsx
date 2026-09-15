import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';

type MagneticButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'ghost';
  className?: string;
  ariaLabel?: string;
};

export function MagneticButton({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ('ontouchstart' in window) return;

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out' });
    };
    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    };

    el.addEventListener('pointermove', handleMove);
    el.addEventListener('pointerleave', handleLeave);
    return () => {
      el.removeEventListener('pointermove', handleMove);
      el.removeEventListener('pointerleave', handleLeave);
    };
  }, []);

  const styles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-signal-violet to-signal-cyan text-base-950 font-medium shadow-glow'
      : 'glass-panel text-white';

  const classes = `inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm transition-shadow duration-300 ${styles} ${className}`;

  if (href) {
    return (
      <a ref={ref as any} href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button ref={ref as any} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
