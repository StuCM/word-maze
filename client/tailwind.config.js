/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0081A7',
        seconday: '#00AFB9',
        textPrim: '#FDFCDC',
        letterBg: '#FFFFF2',
        textSec: '#005E79'
      }
    },
  },
  plugins: [],
}
