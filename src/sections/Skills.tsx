import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassCard } from '../components/GlassCard';
import { skillCategories } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-reveal="skill-card"]', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-28 md:py-36 px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">Skills</h2>
        <p className="mt-4 max-w-xl text-white/55">
          Tools and technologies I use to design, build and reason about software.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category) => (
            <GlassCard key={category.id} className="p-6" tiltStrength={6}>
              <div data-reveal="skill-card">
                <h3 className="font-display text-base font-medium text-signal-cyan">{category.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="px-3 py-1.5 rounded-full text-xs text-white/75 bg-white/5 border border-white/10 hover:border-signal-violet/50 hover:text-white transition-colors"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
