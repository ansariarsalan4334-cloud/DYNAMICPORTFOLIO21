import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks, personal } from '../data/portfolio';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-base-950/60 border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 md:px-10 h-16 flex items-center justify-between" aria-label="Primary">
        <button
          onClick={() => handleNavigate('home')}
          className="font-display font-semibold tracking-tight text-lg text-white"
        >
          {personal.brand}
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNavigate(link.id)}
                aria-current={activeId === link.id ? 'page' : undefined}
                className={`relative px-4 py-2 text-sm rounded-full transition-colors ${
                  activeId === link.id ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {activeId === link.id && (
                  <span className="absolute inset-0 rounded-full bg-white/8 border border-white/10" />
                )}
                <span className="relative">{link.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-white p-2 -mr-2"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden glass-panel mx-4 mb-4 rounded-2xl p-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavigate(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm ${
                    activeId === link.id ? 'bg-white/10 text-white' : 'text-white/70'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
