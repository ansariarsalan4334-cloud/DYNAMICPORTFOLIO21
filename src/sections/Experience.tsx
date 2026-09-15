import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timeline } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const TYPE_LABEL: Record<string, string> = {
  education: 'Education',
  internship: 'Internship',
  certification: 'Certification',
  achievement: 'Achievement',
  hackathon: 'Hackathon',
};

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-reveal="timeline-node"]', {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
      gsap.from('[data-reveal="timeline-line"]', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-28 md:py-36 px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">Experience</h2>
        <p className="mt-4 text-white/55">Education, certifications and milestones, in order.</p>

        <div className="relative mt-14 pl-8">
          <div
            data-reveal="timeline-line"
            className="absolute left-[7px] top-1 bottom-1 w-px bg-gradient-to-b from-signal-violet via-signal-cyan to-transparent"
          />
          <ol className="space-y-10">
            {timeline.map((entry) => (
              <li key={entry.id} data-reveal="timeline-node" className="relative">
                <span className="absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full bg-signal-cyan shadow-glow" />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-lg font-medium text-white">{entry.title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50">
                    {TYPE_LABEL[entry.type]}
                  </span>
                </div>
                <p className="text-sm text-white/50 mt-1">
                  {entry.organization}, {entry.period}
                </p>
                {entry.description && (
                  <p className="mt-2 text-sm text-white/60 leading-relaxed max-w-xl">{entry.description}</p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
