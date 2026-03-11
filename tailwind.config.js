/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#e11d48', // Professional Rose Red
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },
        accent: {
          light: '#ffffff',
          DEFAULT: '#ffffff',
          dark: '#f8fafc',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        'progress': 'progress 2s ease-out',
        'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
