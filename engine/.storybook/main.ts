import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const config: StorybookConfig = {
  stories: [
    '../packages/core/stories/**/*.stories.@(ts|tsx)',
    '../packages/themes/stories/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {},
  async viteFinal(config) {
    return mergeConfig(config, {
      css: {
        postcss: {
          plugins: [
            tailwindcss(path.resolve(__dirname, 'tailwind.config.js')),
            autoprefixer(),
          ],
        },
      },
      resolve: {
        alias: {
          '@spektra/core': path.resolve(__dirname, '../packages/core'),
        },
      },
    });
  },
};

export default config;
