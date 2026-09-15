import { personal } from '../data/portfolio';

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
        <span>
          © {new Date().getFullYear()} {personal.name}. Built as {personal.brand}.
        </span>
        <span>{personal.tagline}</span>
      </div>
    </footer>
  );
}
