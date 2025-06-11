const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class', // optional: enable dark mode
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          50: '#edf9f1',
          100: '#d2f0de',
          200: '#a8e6bc',
          300: '#7ddc9a',
          400: '#53d379',
          500: '#38b861',  // primary green
          600: '#2f9e52',
          700: '#267b41',
          800: '#1d5831',
          900: '#11311f',
        },
        surface: '#121212',   // deep black
        background: '#0d0d0d',// near-black
        text: '#e0f0e9',      // pale greenish-white
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
};
