import { useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import { HeroScene } from '../three/HeroScene';
import { MagneticButton } from '../components/MagneticButton';
import { personal } from '../data/portfolio';

type HeroProps = {
  scrollProgress: MutableRefObject<number>;
};

export function Hero({ scrollProgress }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-reveal="brand"]', { y: 24, opacity: 0, duration: 0.7 })
        .from('[data-reveal="greeting"]', { y: 24, opacity: 0, duration: 0.7 }, '-=0.45')
        .from('[data-reveal="role"]', { y: 24, opacity: 0, duration: 0.7 }, '-=0.45')
        .from('[data-reveal="description"]', { y: 16, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('[data-reveal="cta"]', { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.35')
        .from('[data-reveal="badge"]', { opacity: 0, duration: 0.6 }, '-=0.5');
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const scrollToWork = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <HeroScene scrollProgress={scrollProgress} />

      {/* Gradient scrim so text stays readable over the 3D scene */}
      <div className="absolute inset-0 bg-gradient-to-b from-base-950/20 via-transparent to-base-950 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <span
          data-reveal="brand"
          className="text-xs tracking-[0.3em] text-signal-cyan/80 font-medium mb-6"
        >
          {personal.brand}
        </span>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
          <span data-reveal="greeting" className="block">
            {personal.heroGreeting}
          </span>
          <span data-reveal="role" className="block mt-1 bg-gradient-to-r from-signal-violet to-signal-cyan bg-clip-text text-transparent">
            {personal.heroRole}
          </span>
        </h1>

        <p data-reveal="description" className="mt-6 max-w-xl text-white/60 text-base md:text-lg leading-relaxed">
          {personal.heroDescription}
        </p>

        <div data-reveal="cta" className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton onClick={scrollToWork}>View My Work</MagneticButton>
          <MagneticButton onClick={scrollToContact} variant="ghost">
            Let's Connect
          </MagneticButton>
        </div>

        {personal.availableForProjects && (
          <div
            data-reveal="badge"
            className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs text-white/80"
          >
            <span className="w-2 h-2 rounded-full bg-signal-cyan animate-pulseSlow" />
            Available for Projects
          </div>
        )}
      </div>

      <button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to About section"
        className="absolute bottom-8 z-10 text-white/40 hover:text-white/70 transition-colors animate-bounce"
      >
        <ChevronDown size={22} />
      </button>
    </section>
  );
}
