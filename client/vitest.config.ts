import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/__test__/setup.ts'],
    include: ['src/__test__/**/*.test.{ts,tsx}'],
  },
});
