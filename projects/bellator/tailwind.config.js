const baseConfig = require('@spektra/config/tailwind/base');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
    "../../packages/core/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      ...baseConfig.theme.extend,
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        lexend: ['Lexend', 'system-ui', 'sans-serif'],
        roboto: ['Roboto', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      colors: {
        ...baseConfig.theme.extend.colors,
        primary: {
          DEFAULT: '#FFB100',
          50: '#FFF8E6',
          100: '#FFEDCC',
          200: '#FFDB99',
          300: '#FFC966',
          400: '#FFB733',
          500: '#FFB100',
          600: '#CC8E00',
          700: '#996A00',
          800: '#664700',
          900: '#332300',
        },
        gym: {
          yellow: '#FFB100',
          black: '#000000',
          white: '#FFFFFF',
        }
      },
    },
  },
  plugins: baseConfig.plugins,
};
