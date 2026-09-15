import { useEffect, useState } from 'react';
import { personal } from '../data/portfolio';

const MESSAGES = ['INITIALIZING EXPERIENCE', 'ENTERING DIGITAL SPACE'];

type LoadingScreenProps = {
  onComplete: () => void;
};

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setMessageIndex((i) => Math.min(i + 1, MESSAGES.length - 1));
    }, 650);

    const exitTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 500); // matches exit transition duration below
    }, 1600);

    return () => {
      clearInterval(messageTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-base-950 transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <button
        onClick={() => {
          setVisible(false);
          onComplete();
        }}
        className="absolute bottom-8 text-xs text-white/40 hover:text-white/70 underline underline-offset-4"
      >
        Skip
      </button>

      <span className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-white animate-pulseSlow">
        {personal.brand}
      </span>
      <span className="mt-4 text-xs tracking-[0.2em] text-signal-cyan/80 uppercase h-4">
        {MESSAGES[messageIndex]}...
      </span>
      <div className="mt-6 w-40 h-px bg-white/10 overflow-hidden rounded-full">
        <div className="h-full bg-gradient-to-r from-signal-violet to-signal-cyan animate-[loadbar_1.6s_ease-in-out_forwards]" />
      </div>
      <style>{`
        @keyframes loadbar {
          from { transform: translateX(-100%); }
          to { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
}
