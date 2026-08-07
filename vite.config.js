import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        day: resolve(__dirname, 'day.html'),
      },
    },
  },
  server: {
    port: 3000,
  },
});
