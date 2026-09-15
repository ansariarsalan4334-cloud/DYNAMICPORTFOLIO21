/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#050507',
          900: '#0a0a10',
          800: '#12121a',
          700: '#1b1b26',
        },
        signal: {
          violet: '#7c6cff',
          cyan: '#4cd9d0',
          amber: '#ffb454',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.45)',
        glow: '0 0 40px rgba(124,108,255,0.35)',
      },
      keyframes: {
        pulseSlow: {
          '0%,100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        pulseSlow: 'pulseSlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
