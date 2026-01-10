import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['packages/**/test/**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', 'projects/**'],
    setupFiles: ['./vitest.setup.ts'],
  },
});
