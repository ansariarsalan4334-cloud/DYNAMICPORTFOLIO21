import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Award,
  BadgeCheck,
  Building2,
  Calendar,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { certifications, type Certification } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All Credentials',
  'ai-ml': 'AI & Machine Learning',
  web: 'Web Development',
  database: 'Databases & SQL',
  programming: 'Programming',
};

export function Certifications() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Derive unique categories present in the certifications list
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    certifications.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return ['all', ...Array.from(set)];
  }, []);

  const filteredCertifications = useMemo(() => {
    if (selectedCategory === 'all') return certifications;
    return certifications.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  // ScrollTrigger entrance animation
  useEffect(() => {
    if (certifications.length === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-reveal="cert-card"]', {
        opacity: 0,
        y: 28,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  const handleCopyId = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'ai-ml':
        return {
          badge: 'text-signal-cyan bg-signal-cyan/10 border-signal-cyan/20',
          iconBg: 'bg-signal-cyan/15 text-signal-cyan border-signal-cyan/30',
        };
      case 'web':
        return {
          badge: 'text-signal-violet bg-signal-violet/10 border-signal-violet/20',
          iconBg: 'bg-signal-violet/15 text-signal-violet border-signal-violet/30',
        };
      case 'database':
        return {
          badge: 'text-signal-amber bg-signal-amber/10 border-signal-amber/20',
          iconBg: 'bg-signal-amber/15 text-signal-amber border-signal-amber/30',
        };
      default:
        return {
          badge: 'text-white/70 bg-white/5 border-white/15',
          iconBg: 'bg-white/10 text-white/80 border-white/20',
        };
    }
  };

  if (certifications.length === 0) {
    return (
      <section id="certifications" className="relative py-24 md:py-32 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 mb-4 text-signal-cyan">
            <Award size={24} />
          </div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">Certifications & Credentials</h2>
          <p className="mt-2 text-sm text-white/50">
            Professional certifications and verified credentials will be listed here soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" ref={sectionRef} className="relative py-28 md:py-36 px-6">
      {/* Subtle atmospheric ambient glow in background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 right-1/4 w-96 h-96 bg-signal-violet/10 rounded-full blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/4 w-96 h-96 bg-signal-cyan/10 rounded-full blur-[110px]"
      />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-signal-cyan bg-signal-cyan/10 border border-signal-cyan/25 mb-4">
              <Sparkles size={13} className="text-signal-cyan animate-pulse" />
              <span>Verified Qualifications</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white">
              Certifications & Credentials
            </h2>
            <p className="mt-3 max-w-xl text-white/60 text-sm md:text-base">
              Accredited courses, specialized professional training, and validated technical proficiencies
              in AI/ML, full-stack systems, and software engineering.
            </p>
          </div>

          {/* Credential Counter Pill */}
          <div className="self-start md:self-auto px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-signal-cyan animate-ping" />
            <span className="text-xs font-mono text-white/75">
              <strong className="text-white font-semibold text-sm">{certifications.length}</strong> Credentials Issued
            </span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        {availableCategories.length > 2 && (
          <div className="mt-10 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {availableCategories.map((catKey) => {
              const isActive = selectedCategory === catKey;
              const count =
                catKey === 'all'
                  ? certifications.length
                  : certifications.filter((c) => c.category === catKey).length;

              return (
                <button
                  key={catKey}
                  onClick={() => setSelectedCategory(catKey)}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-signal-cyan/20 text-white border border-signal-cyan/40 shadow-glow'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <span>{CATEGORY_LABELS[catKey] || catKey}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-signal-cyan text-base-950 font-bold' : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Certifications Grid */}
        <div
          ref={gridRef}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          {filteredCertifications.map((cert) => {
            const colors = getCategoryColor(cert.category);

            return (
              <div
                key={cert.id}
                data-reveal="cert-card"
                className="h-full flex flex-col"
              >
                <GlassCard
                  className="p-6 h-full flex flex-col justify-between group relative overflow-hidden"
                  tiltStrength={6}
                >
                  {/* Subtle hover accent corner glow */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-signal-cyan/10 blur-2xl group-hover:bg-signal-cyan/20 transition-all duration-500 pointer-events-none"
                  />

                  {/* Top Row: Icon + Date + Status */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105 ${colors.iconBg}`}
                      >
                        <Award size={22} />
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Date pill */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono text-white/60 bg-white/5 border border-white/10">
                          <Calendar size={12} className="text-white/40" />
                          <span>{cert.date}</span>
                        </div>

                        {/* Verified badge */}
                        <div
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-signal-cyan bg-signal-cyan/10 border border-signal-cyan/20"
                          title="Verified Credential"
                        >
                          <BadgeCheck size={13} className="text-signal-cyan" />
                          <span className="hidden sm:inline">Verified</span>
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg font-semibold text-white group-hover:text-signal-cyan transition-colors leading-snug">
                      {cert.title}
                    </h3>

                    {/* Organization */}
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-white/55 font-medium">
                      <Building2 size={13} className="text-signal-violet shrink-0" />
                      <span className="truncate">{cert.organization}</span>
                    </div>

                    {/* Description */}
                    {cert.description && (
                      <p className="mt-3 text-sm text-white/65 leading-relaxed line-clamp-3">
                        {cert.description}
                      </p>
                    )}

                    {/* Skills Covered */}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-white/5">
                        <p className="text-[11px] uppercase tracking-wider text-white/40 font-mono mb-2">
                          Competencies Verified
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {cert.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 rounded text-[11px] font-medium text-white/70 bg-white/5 border border-white/10 hover:border-signal-cyan/30 hover:text-white transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Credential ID + External Verification Link */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
                    {cert.credentialId ? (
                      <button
                        onClick={(e) => handleCopyId(e, cert.credentialId!)}
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] text-white/50 hover:text-white/90 bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-colors group/copy"
                        title="Click to copy credential ID"
                      >
                        {copiedId === cert.credentialId ? (
                          <>
                            <Check size={12} className="text-signal-cyan" />
                            <span className="text-signal-cyan font-sans font-medium">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={11} className="text-white/40 group-hover/copy:text-white/70" />
                            <span className="truncate max-w-[110px]">{cert.credentialId}</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <span className="text-[11px] text-white/40 font-mono">Issued Credential</span>
                    )}

                    {cert.certificateUrl && (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-signal-cyan hover:text-white transition-colors group/link ml-auto"
                      >
                        <span>Verify</span>
                        <ExternalLink
                          size={12}
                          className="transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                        />
                      </a>
                    )}
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
