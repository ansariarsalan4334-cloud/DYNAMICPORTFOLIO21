import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassCard } from '../components/GlassCard';
import { aboutText } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-reveal="pillar"]', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
      gsap.from('[data-reveal="about-text"]', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-28 md:py-36 px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
          {aboutText.title}
        </h2>

        <div data-reveal="about-text" className="mt-8 max-w-2xl space-y-4 text-white/65 leading-relaxed">
          {aboutText.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {aboutText.pillars.map((pillar) => (
            <GlassCard key={pillar.id} className="p-6">
              <div data-reveal="pillar">
                <h3 className="font-display text-lg font-medium text-white">{pillar.title}</h3>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">{pillar.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
