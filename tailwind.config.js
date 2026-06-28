/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#FFD6E0',
        lavender: '#E6E6FA',
        pearl: '#FFFFFF',
        gold: '#F7D794',
        velvet: '#180A1A',
        wine: '#3B102F',
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        display: ['"Playfair Display"', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(247, 215, 148, 0.34)',
        blush: '0 24px 80px rgba(255, 214, 224, 0.2)',
      },
      animation: {
        floaty: 'floaty 7s ease-in-out infinite',
        shimmer: 'shimmer 3.5s linear infinite',
        pulseGlow: 'pulseGlow 2.6s ease-in-out infinite',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -16px, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 28px rgba(247, 215, 148, 0.38)' },
          '50%': { boxShadow: '0 0 58px rgba(255, 214, 224, 0.7)' },
        },
      },
    },
  },
  plugins: [],
};
