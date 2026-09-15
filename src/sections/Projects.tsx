import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { projects } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const STATUS_LABEL: Record<string, string> = {
  'in-progress': 'In progress',
  complete: 'Complete',
  planned: 'Planned',
};

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-reveal="project-card"]', {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative py-28 md:py-36 px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">Projects</h2>
        <p className="mt-4 max-w-xl text-white/55">
          A selection of things I've built and am currently building. Edit these in{' '}
          <code className="text-signal-cyan/90">src/data/portfolio.ts</code>.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <GlassCard key={project.id} className="p-7 flex flex-col" tiltStrength={5}>
              <div data-reveal="project-card" className="flex flex-col h-full">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-medium text-white">{project.title}</h3>
                  {project.status && (
                    <span className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                      {STATUS_LABEL[project.status]}
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm text-white/60 leading-relaxed flex-1">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-signal-violet/10 text-signal-violet border border-signal-violet/20">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="view"
                      className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white"
                    >
                      <Github size={16} /> GitHub
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-sm text-white/30 cursor-not-allowed">
                      <Github size={16} /> GitHub link pending
                    </span>
                  )}

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="view"
                      className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-sm text-white/30 cursor-not-allowed">
                      <ExternalLink size={16} /> Demo pending
                    </span>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
