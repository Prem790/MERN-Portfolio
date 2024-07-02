/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary": "#1F2833",
        "secondary":"#66FCF1",
        "tertiary":"#45A29E",
      }
    },
    screens: {

      'lg': {'max': '2023px'},
      // => @media (max-width: 1023px) { ... }

     //'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '1000px'},
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [],
}
// for resposiveness we will use tailwind break points
