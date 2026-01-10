const baseConfig = require('../packages/config/tailwind/base.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../packages/core/**/*.{ts,tsx,js,jsx}',
    '../packages/core/stories/**/*.{ts,tsx,js,jsx}',
    '../packages/themes/**/*.{ts,tsx,js,jsx}',
    '../packages/themes/stories/**/*.{ts,tsx,js,jsx}',
    './**/*.{ts,tsx,js,jsx}',
  ],
  theme: baseConfig.theme,
  plugins: baseConfig.plugins,
};
