/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spark-primary': '#FF6B35',     // Vibrant orange
        'spark-secondary': '#F7C35C',   // Golden yellow
        'spark-dark': '#1A1A2E',        // Deep dark blue
        'spark-darker': '#0F0F1A',      // Darker background
        'spark-light': '#F8F9FA',       // Light gray
        'spark-accent': '#4ECDC4',      // Teal accent
        'spark-gradient-start': '#FF6B35',
        'spark-gradient-end': '#F7C35C',
        'spark-card': 'rgba(255, 255, 255, 0.05)',
        'spark-border': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'spark-gradient': 'linear-gradient(135deg, #FF6B35 0%, #F7C35C 100%)',
        'spark-glow': 'radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}