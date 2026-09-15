import { useState, type FormEvent } from 'react';
import { Github, Linkedin, Mail, Instagram, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { MagneticButton } from '../components/MagneticButton';
import { personal, socialLinks } from '../data/portfolio';

const ICONS: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  instagram: Instagram,
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [values, setValues] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all fields before sending.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(personal.email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          _subject: `New Portfolio Message from ${values.name.trim()}`,
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
        setStatus('success');
        setValues({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(
        err?.message && !err.message.includes('object')
          ? err.message
          : 'Could not send message automatically. Please reach out directly at ' + personal.email
      );
    }
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
            {status === 'success' ? (
              <div className="flex flex-col items-center text-center py-8 gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Message Sent!</h3>
                  <p className="text-sm text-white/60 mt-1 max-w-sm">
                    Thank you for reaching out. I've received your message and will get back to you as soon as possible.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-xs text-signal-cyan hover:underline transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="name" className="text-xs text-white/50">
                    Name
                  </label>
                  <input
                    id="name"
                    required
                    disabled={status === 'submitting'}
                    value={values.name}
                    onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                    className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-signal-cyan/60 outline-none transition-colors disabled:opacity-50"
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
                    disabled={status === 'submitting'}
                    value={values.email}
                    onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                    className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-signal-cyan/60 outline-none transition-colors disabled:opacity-50"
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
                    disabled={status === 'submitting'}
                    value={values.message}
                    onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                    className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-signal-cyan/60 outline-none transition-colors resize-none disabled:opacity-50"
                    placeholder="Tell me about your idea or opportunity"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  disabled={status === 'submitting'}
                  className="mt-2 self-start"
                >
                  <span className="inline-flex items-center gap-2">
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={15} className="animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={15} />
                      </>
                    )}
                  </span>
                </MagneticButton>

                {status === 'error' && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs mt-1">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <p>{errorMessage}</p>
                  </div>
                )}
              </form>
            )}
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
