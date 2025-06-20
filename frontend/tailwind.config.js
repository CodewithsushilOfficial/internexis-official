/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'ping': 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
      colors: {
        primary: {
          50: '#EEF4FF',
          100: '#D9E5FF',
          200: '#B3C9FF',
          300: '#8DAFFF',
          400: '#6690FF',
          500: '#3563E9',
          600: '#2E4FBA',
          700: '#263B8C',
          800: '#1F285D',
          900: '#17142F',
        },
        secondary: {
          50: '#F9F1FF',
          100: '#F4E5FF',
          200: '#E5C5FF',
          300: '#D5A6FF',
          400: '#B880FF',
          500: '#8C30F5',
          600: '#7026C4',
          700: '#551D93',
          800: '#391362',
          900: '#1E0A31',
        },
        accent: {
          50: '#FFF3F0',
          100: '#FFE6DF',
          200: '#FFD1C2',
          300: '#FFB8A4',
          400: '#FF9478',
          500: '#FF6B35',
          600: '#FF4F0E',
          700: '#E53D00',
          800: '#B83000',
          900: '#8B2400',
        },
        gray: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        dark: {
          background: '#0A0A0A',
          card: '#1E1E1E',
          border: '#2E2E2E',
          muted: '#3E3E3E',
          text: '#FAFAFA',
        },
        blue: {
          50: '#EEF4FF',
          100: '#D9E5FF',
          200: '#B3C9FF',
          300: '#8DAFFF',
          400: '#6690FF',
          500: '#3563E9',
          600: '#2E4FBA',
          700: '#263B8C',
          800: '#1F285D',
          900: '#17142F',
        },
        purple: {
          50: '#F9F1FF',
          100: '#F4E5FF',
          200: '#E5C5FF',
          300: '#D5A6FF',
          400: '#B880FF',
          500: '#8C30F5',
          600: '#7026C4',
          700: '#551D93',
          800: '#391362',
          900: '#1E0A31',
        },
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(53, 99, 233, 0.2)',
        'glow-secondary': '0 0 20px rgba(140, 48, 245, 0.2)',
        'glow-accent': '0 0 20px rgba(255, 107, 53, 0.2)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "url('/patterns/hero-pattern.svg')",
      },
      boxShadow: {
        'xl': '0 15px 50px -10px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.animation-delay-2000': {
          'animation-delay': '2s',
        },
        '.animation-delay-4000': {
          'animation-delay': '4s',
        },
      }
      addUtilities(newUtilities)
    },
  ],
};