/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary: Warm terracotta/burnt orange
        primary: {
          50: '#FFF8DC',
          100: '#FFE4B5',
          200: '#FFDAB9',
          300: '#CD853F',
          400: '#D2691E',
          500: '#CD853F',
          600: '#A0522D',
          700: '#8B4513',
          800: '#654321',
          900: '#3E2723',
        },
        // Secondary: Deep cream/vanilla
        secondary: {
          50: '#FFFEFE',
          100: '#FEFEFE',
          200: '#F9F9F9',
          300: '#F5F5DC',
          400: '#FFF8DC',
          500: '#F5F5DC',
          600: '#F0E68C',
          700: '#EEE8AA',
          800: '#DAA520',
          900: '#B8860B',
        },
        // Accent: Rich chocolate brown
        accent: {
          50: '#FDF2E9',
          100: '#FAD7A0',
          200: '#F8C471',
          300: '#A0522D',
          400: '#8B4513',
          500: '#654321',
          600: '#5D4037',
          700: '#4E342E',
          800: '#3E2723',
          900: '#2E1A1A',
        },
        // Background: Soft off-white
        background: {
          50: '#FFFFFF',
          100: '#FEFEFE',
          200: '#F9F9F9',
          300: '#F5F5F5',
          400: '#F0F0F0',
          500: '#E8E8E8',
        },
        // Text: Charcoal
        text: {
          50: '#F5F5F5',
          100: '#E0E0E0',
          200: '#BDBDBD',
          300: '#9E9E9E',
          400: '#757575',
          500: '#666666',
          600: '#424242',
          700: '#333333',
          800: '#212121',
          900: '#000000',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'script': ['Dancing Script', 'cursive'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

