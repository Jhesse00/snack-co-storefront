/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        snack: {
          cream: '#FFFDF7',
          warm: '#F7F2E8',
          sand: '#EFE8D8',
          dark: '#1C2833',
          navy: '#0E2A38',
          yellow: {
            light: '#FEF9C3',
            DEFAULT: '#FDE047',
            deep: '#EAB308',
            accent: '#CA8A04'
          },
          peach: {
            light: '#FFEDD5',
            DEFAULT: '#FED7AA',
            deep: '#FB923C',
            accent: '#EA580C'
          },
          mint: {
            light: '#F0FDF4',
            DEFAULT: '#CCFBF1',
            deep: '#2DD4BF',
            accent: '#0D9488'
          },
          lilac: {
            light: '#F3E8FF',
            DEFAULT: '#E9D5FF',
            deep: '#C084FC',
            accent: '#9333EA'
          }
        }
      },
      fontFamily: {
        display: ['Fredoka', 'system-ui', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        badge: ['Outfit', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'playful': '0 8px 0px 0px rgba(0, 0, 0, 0.08)',
        'playful-lg': '0 12px 0px 0px rgba(0, 0, 0, 0.07)',
        'playful-sm': '0 4px 0px 0px rgba(0, 0, 0, 0.07)',
        'float': '0 20px 35px -10px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(12px) rotate(-2deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
