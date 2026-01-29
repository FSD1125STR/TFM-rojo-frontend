/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // FootMind Design System
        primary: {
          DEFAULT: '#5C6F68',
          dark: '#4a5a54',
        },
        secondary: {
          DEFAULT: '#8AA39B',
          dark: '#728a82',
        },
        surface: {
          DEFAULT: '#95D9C3',
          light: '#a8e0cf',
        },
        hover: {
          DEFAULT: '#A4F9C8',
        },
        background: {
          DEFAULT: '#EBFFFD',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
