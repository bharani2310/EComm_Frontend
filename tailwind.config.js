/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#1e1e1e",
        secondary:"#11f2eb"
      }
    },
  },
  plugins: [],
}

