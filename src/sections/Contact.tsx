import { useState, type FormEvent } from 'react';
import { Github, Linkedin, Mail, Instagram, Send } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { MagneticButton } from '../components/MagneticButton';
import { socialLinks } from '../data/portfolio';

const ICONS: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  instagram: Instagram,
};

type FormStatus = 'idle' | 'not-configured';

export function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [values, setValues] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // No backend/email service is wired up yet. This intentionally does not
    // pretend to send anything — see the README for how to connect one
    // (e.g. Formspree, Resend, or your own API route) and replace this handler.
    setStatus('not-configured');
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
          Let's Build Something Amazing
        </h2>
        <p className="mt-4 text-white/55 max-w-xl">
          Have an idea, project or opportunity? Let's turn it into something real.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-6">
          <GlassCard className="p-7 md:col-span-3" tiltStrength={2}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div>
                <label htmlFor="name" className="text-xs text-white/50">
                  Name
                </label>
                <input
                  id="name"
                  required
                  value={values.name}
                  onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                  className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-signal-cyan/60 outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-xs text-white/50">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={values.email}
                  onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                  className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-signal-cyan/60 outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-xs text-white/50">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={values.message}
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                  className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-signal-cyan/60 outline-none transition-colors resize-none"
                  placeholder="Tell me about your idea or opportunity"
                />
              </div>

              <MagneticButton className="mt-2 self-start">
                <span className="inline-flex items-center gap-2">
                  Send Message <Send size={15} />
                </span>
              </MagneticButton>

              {status === 'not-configured' && (
                <p role="status" className="text-xs text-white/45 mt-1">
                  This form isn't connected to an email service yet — see the README for setup
                  instructions (e.g. Formspree or Resend), or reach out directly using the links.
                </p>
              )}
            </form>
          </GlassCard>

          <div className="md:col-span-2 flex flex-col gap-3">
            {socialLinks.map((link) => {
              const Icon = ICONS[link.id] ?? Mail;
              return (
                <a
                  key={link.id}
                  href={link.url ?? undefined}
                  target={link.id === 'email' ? undefined : '_blank'}
                  rel="noreferrer"
                  aria-disabled={!link.url}
                  className={`glass-panel rounded-xl px-5 py-4 flex items-center gap-3 text-sm transition-colors ${
                    link.url ? 'text-white/80 hover:text-white hover:border-signal-violet/40' : 'text-white/30 pointer-events-none'
                  }`}
                >
                  <Icon size={18} />
                  {link.label}
                  {!link.url && <span className="ml-auto text-[11px] text-white/25">Add link</span>}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
