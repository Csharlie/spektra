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
    },
  },
  plugins: baseConfig.plugins,
};
