const baseConfig = require('@spektra/config/tailwind/base');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../engine/packages/core/**/*.{jsx,tsx}",
  ],
  theme: {
    extend: {
      ...baseConfig.theme.extend,
    },
  },
  plugins: baseConfig.plugins,
};
