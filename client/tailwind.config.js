/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface: '#171717',
        'surface-hover': '#262626',
        border: '#2a2a2a',
        accent: '#ff4500',
        accent2: '#dc2626',
        accent3: '#8b0000',
        strong: '#10b981',
        good: '#3b82f6',
      },
      fontFamily: {
        sans: ['Space Mono', 'monospace'],
        heading: ['Syne', 'sans-serif'],
      },
      animation: {
        'bg-drift': 'bg-drift 20s linear infinite',
        'float': 'float 6s ease-in-out infinite alternate',
        'pulse-glow': 'pulse-glow 2s infinite alternate',
        'shimmer': 'shimmer 4s linear infinite',
        'fade-up': 'fade-up 0.8s cubic-bezier(.16,1,.3,1) forwards',
        'scan': 'scan 2.5s linear infinite',
        'blink': 'blink 1s infinite alternate',
      },
      keyframes: {
        'bg-drift': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' },
        },
        'float': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-30px)' },
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 10px rgba(123, 92, 255, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 255, 200, 0.6)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scan': {
          '0%': { top: '-2px', opacity: '0' },
          '10%': { opacity: '0.7' },
          '90%': { opacity: '0.7' },
          '100%': { top: '100%', opacity: '0' },
        },
        'blink': {
          '0%': { opacity: '0.3' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
