const colors = require("tailwindcss/colors");

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],

  content: [],
  theme: {
    extend: {
      spacing: {
        70: '17.5rem',
        160: '40rem',
      },
    },
    // colors: {
    //   red: {
    //     50: '#fef2f2',

    //     100: '#fee2e2',
    //     200: '#fecaca',
    //     300: '#fca5a5',
    //     400: '#f87171',
    //     500: '#ef4444',
    //     600: '#dc2626',
    //     700: '#b91c1c',
    //     800: '#991b1b',
    //     900: '#7f1d1d',
    //   },

    // },
  },
  plugins: [],
}
