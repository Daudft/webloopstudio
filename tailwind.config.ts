import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  // hover: styles only apply on devices that can hover, so they don't stick after a tap on phones and tablets.
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        navy: '#0A1F44',
        /** Soft near-black for the dark sections below the hero. Pair with `bg-grain`. */
        ink: '#131315',
        ice: '#eaf2ff',
        sky: '#a9c8ea',
        steel: '#52627a',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sora)', 'system-ui', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        sora: ['var(--font-sora)', 'system-ui', 'sans-serif'],
        commissioner: ['var(--font-commissioner)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
