/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#111110',
          900: '#181715',
          800: '#23211E',
          700: '#322F2B',
          600: '#46423D',
        },
        cream: {
          50: '#FDFBF7',
          100: '#F7F3EA',
          200: '#EDE5D5',
          300: '#DFD3BC',
        },
        brick: {
          500: '#C44536',
          600: '#A93528',
          700: '#8D2A1E',
          800: '#722118',
        },
        amber: {
          400: '#E29E38',
          500: '#C98422',
        }
      },
      fontFamily: {
        display: ['"Oswald"', '"Impact"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Lora"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
