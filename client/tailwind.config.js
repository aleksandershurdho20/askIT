// const colors = require("tailwindcss/colors");

// module.exports = {
//   purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],

//   content: [],
//   theme: {
//     extend: {
//       spacing: {
//         70: '17.5rem',
//         160: '40rem',
//       },

//     },

//   },
//   plugins: [],
// }



module.exports = {
  mode: "jit",
  purge: ["./**/*.tsx", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {},
  plugins: []
};
