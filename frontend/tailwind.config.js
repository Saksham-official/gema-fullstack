/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: {
            DEFAULT: '#FF6B35',
            light: '#FF885E',
            dark: '#E04D18',
            bg: '#FFF0EB'
          },
          yellow: {
            DEFAULT: '#FFB800',
            light: '#FFC83B',
            dark: '#D69B00',
            bg: '#FFFDF0'
          },
          purple: {
            DEFAULT: '#6366F1',
            light: '#818CF8',
            dark: '#4F46E5',
            bg: '#EEF2FF'
          },
          teal: {
            DEFAULT: '#0D9488',
            light: '#14B8A6',
            dark: '#0F766E',
            bg: '#F0FDFA'
          },
          dark: '#0F172A',
          light: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [],
}
